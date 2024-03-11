import { ImageCard } from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
export const ImageGallery = ({ photos, onImageClick }) => {
  return (
    <ul className={css.list}>
      {photos.map((photo) => (
        <ImageCard key={photo.id} photo={photo} onImageClick={onImageClick} />
      ))}
    </ul>
  );
};
