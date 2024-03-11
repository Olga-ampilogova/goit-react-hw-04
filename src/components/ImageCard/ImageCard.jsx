import css from "./Image.module.css";
export const ImageCard = ({ photo, onImageClick }) => {
  return (
    <li
      key={photo.id}
      className={css.item}
      onClick={() => onImageClick(photo.urls.regular)}
    >
      <img
        src={photo.urls.small}
        alt={photo.alt_description}
        width="400px"
        height="400px"
      />
      <div className={css.imageContainer}>
        <p className={css.text}>
          <span className={css.span}>Author: </span> {photo.user.name}
        </p>
        <p className={css.text}>
          <span className={css.span}>Likes: </span> {photo.likes}
        </p>
        <p>
          <span className={css.span}>Description:</span> {photo.alt_description}
        </p>
      </div>
    </li>
  );
};
