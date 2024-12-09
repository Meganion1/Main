import base64
from io import BytesIO
import os
from PIL import Image
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from django.http import JsonResponse
import logging

# Set up logging
logger = logging.getLogger(__name__)

# Load dataset and model on startup
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
csv_path = os.path.join(BASE_DIR, 'Dataset.csv')
images_folder = os.path.join(BASE_DIR, 'images')
dataset = pd.read_csv(csv_path)
dataset['Cleaned_Ingredients'] = dataset['Cleaned_Ingredients'].astype(str)

# Initialize the TF-IDF vectorizer
vectorizer = TfidfVectorizer(tokenizer=lambda x: x.split(', '), preprocessor=lambda x: x.lower())
tfidf_matrix = vectorizer.fit_transform(dataset['Cleaned_Ingredients'])

def get_image_base64(image_path):
    """Convert image to base64-encoded string."""
    try:
        image = Image.open(image_path)
        buffered = BytesIO()
        image.save(buffered, format="JPEG")
        img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
        return img_str
    except Exception as e:
        logger.error(f"Error converting image to base64: {e}")
        return None

def recommend_recipes(request):
    # Get user input from request (POST or GET)
    user_input = request.GET.get('ingredients', '')  # Expecting comma-separated ingredients in the query string
    if not user_input:
        return JsonResponse({'error': 'No ingredients provided'}, status=400)

    logger.info(f"User input ingredients: {user_input}")

    # Process input and calculate similarity
    user_vector = vectorizer.transform([user_input.lower()])
    cosine_similarities = cosine_similarity(user_vector, tfidf_matrix).flatten()
    
    logger.info(f"Cosine similarities: {cosine_similarities}")
    
    # Get top 5 similar recipes, handle case where there may be fewer than 5 valid results
    top_indices = cosine_similarities.argsort()[-5:][::-1]
    logger.info(f"Top recommended recipe indices: {top_indices}")

    recommendations = []
    for idx in top_indices:
        recipe = dataset.iloc[idx]
        image_path = os.path.join(images_folder, f"{recipe['Image_Name']}.jpg")  # Assuming images are named as 'Image_Name.jpg'

        # Check if image exists and convert to base64 if valid
        image_base64 = get_image_base64(image_path)

        # Prepare recipe data
        recipe_data = {
            'title': recipe['Title'],
            'ingredients': recipe['Ingredients'],
            'instructions': recipe['Instructions'],
            'image_base64': image_base64 or None  # If image is None, include None
        }

        recommendations.append(recipe_data)

    # Ensure at least 5 recommendations are provided
    if len(recommendations) < 5:
        logger.info(f"Insufficient recommendations ({len(recommendations)}), padding with similar recipes.")
        remaining_needed = 5 - len(recommendations)
        
        # Add more recipes by fetching the next most similar ones
        for idx in cosine_similarities.argsort()[-(5+remaining_needed):-5][::-1]:
            recipe = dataset.iloc[idx]
            image_path = os.path.join(images_folder, f"{recipe['Image_Name']}.jpg")
            image_base64 = get_image_base64(image_path)

            recipe_data = {
                'title': recipe['Title'],
                'ingredients': recipe['Ingredients'],
                'instructions': recipe['Instructions'],
                'image_base64': image_base64 or None
            }
            recommendations.append(recipe_data)
            
            if len(recommendations) >= 5:
                break

    if recommendations:
        return JsonResponse({'recommendations': recommendations})
    else:
        return JsonResponse({'error': 'No similar recipes found'}, status=404)
