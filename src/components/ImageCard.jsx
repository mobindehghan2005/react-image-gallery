
function ImageCard({ image }) {
  return (
    <div className="image-card">
      <img
        src={image.download_url}
        alt={`Photo by ${image.author}`}
      />
      <p>{image.author}</p>
    </div>
  );
}

export default ImageCard;
