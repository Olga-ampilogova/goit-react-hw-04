import css from "./LoadMore.module.css";

export const LoadMoreButton = ({ onClick }) => {
  const handleLoadMoreClick = () => {
    onClick();
  };

  return (
    <div>
      <button
        type="button"
        className={css.loadMoreButton}
        onClick={handleLoadMoreClick}
      >
        Load more
      </button>
    </div>
  );
};
