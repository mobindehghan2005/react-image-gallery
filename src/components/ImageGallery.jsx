
import ImageCard from "./ImageCard";

function ImageGallery({ images }) {
  return (
    <div className="image-grid">
      {images.map((image) => (
        <ImageCard
          key={image.id}
          image={image}
        />
      ))}
    </div>
  );
}

export default ImageGallery;
