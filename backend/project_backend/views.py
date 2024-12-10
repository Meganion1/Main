import base64
import os
from io import BytesIO
from PIL import Image
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import FunctionTransformer
from django.http import JsonResponse

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
csv_path = os.path.join(BASE_DIR, 'Dataset.csv')  # Path to your CSV file
images_folder = os.path.join(BASE_DIR, 'images')  # Path to your images folder

dataset = pd.read_csv(csv_path)

dataset['Cleaned_Ingredients'] = dataset['Cleaned_Ingredients'].astype(str)
dataset['Cleaned_Ingredients'] = dataset['Cleaned_Ingredients'].str.replace('[^a-zA-Z, ]', '', regex=True)  # Remove non-alphabetic characters
dataset['Cleaned_Ingredients'] = dataset['Cleaned_Ingredients'].str.lower()  # Convert to lowercase

# Initialize the TF-IDF vectorizer with better parameters
vectorizer = TfidfVectorizer(
    stop_words='english',  # Remove stop words like 'the', 'a', etc.
    ngram_range=(1, 2),    # Use unigrams and bigrams to capture more context
    max_features=1000,     
)

# Fit the TF-IDF vectorizer
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
        return None

def recommend_recipes(request):
    user_input = request.GET.get('ingredients', '')    
    if not user_input:
        return JsonResponse({'error': 'No ingredients provided'}, status=400)
    user_input_cleaned = user_input.lower().strip()
    # Transform the user input into a TF-IDF vector
    user_vector = vectorizer.transform([user_input_cleaned])   
    # Calculate cosine similarity between user input and the dataset
    cosine_similarities = cosine_similarity(user_vector, tfidf_matrix).flatten()
    # Get the indices of the top 5 most similar recipes
    top_indices = cosine_similarities.argsort()[-5:][::-1]  # Get top 5 recommendations
    # Prepare the recommendations
    recommendations = []
    for idx in top_indices:
        recipe = dataset.iloc[idx]
        image_path = os.path.join(images_folder, f"{recipe['Image_Name']}.jpg")  # Assuming images are named 'Image_Name.jpg'
        # Check if image exists and convert to base64 if available
        image_base64 = get_image_base64(image_path)
        # Prepare the recipe information
        recommendations.append({
            'title': recipe['Title'],
            'ingredients': recipe['Ingredients'],
            'instructions': recipe['Instructions'],
            'image_base64': image_base64  # Base64-encoded image if available
        })

    return JsonResponse({'recommendations': recommendations})
