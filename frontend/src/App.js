import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import ContactForm from "./components/ContactForm/ContactForm";
import About from "./components/aboutUs/About";
import ContactHeader from "./components/contactHeader/ContactHeader";
import Login from "./components/Register/Login";
import Register from "./components/Register/Register";
import Navigation from "./components/Navigation/Navigation";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import Ingredients from "./components/ingredients/Ingredients";
import Recipe from "./components/Recipe/Recipe";
import { slides } from "./assets/slideData";

function App() {
  return (
    <Router>
      <Navigation />

      <div className={"container"}>
        <main className={"main_container"}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home images={slides} />
                  <Ingredients />
                </>
              }
            />

            <Route
              path="/contactUs"
              element={
                <>
                  <ContactHeader />
                  <ContactForm />
                </>
              }
            />
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/register"
              element={<Register />}
            />
            <Route
              path="/aboutUs"
              element={<About />}
            />
            <Route
              path="/recipe"
              element={<Recipe />}
            />
          </Routes>

        </main>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
