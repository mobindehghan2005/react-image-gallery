
import { useEffect, useState } from "react";
import ImageGallery from "./components/ImageGallery";
import "./App.css";

function App() {
  const [images, setImages] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadImages() {
      try {
        const response = await fetch(
          "https://picsum.photos/v2/list"
        );

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        if (!ignore) {
          setImages(data);
          setError("");
        }
      } catch (err) {
        if (!ignore) {
          console.error("API Error:", err);
          setError("خطا در دریافت تصاویر");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadImages();

    return () => {
      ignore = true;
    };
  }, []);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  return (
    <div className="app">
      <h1>Image Gallery</h1>

      <ImageGallery
        images={images.slice(0, visibleCount)}
      />

      {loading && <p>Loading images...</p>}

      {error && <p className="error">{error}</p>}

      <button
        onClick={loadMore}
        disabled={loading || visibleCount >= images.length}
      >
        Load More
      </button>
    </div>
  );
}

export default App;
