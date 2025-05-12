
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import HeroSection from "./components/layout/HeroSection";
import MarqueeBrands from "./components/layout/MarqueeBrands";
import BikeList from "./components/layout/BikeList";
import BikeDetails from "./components/layout/BikeDetails";
import About from "./components/layout/About";
import Compare from "./components/layout/Compare"; // Add this import

function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <MarqueeBrands />
              <main style={{ padding: '2rem' }}>
                <BikeList />
              </main>
            </>
          }
        />
        <Route path="/bike/:id" element={<BikeDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/compare" element={<Compare />} /> {/* Add this route */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
