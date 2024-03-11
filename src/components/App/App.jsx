import { useEffect, useState } from "react";
import Modal from "react-modal";
import css from "./App.module.css";

import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { ImageModal } from "../ImageModal/ImageModal";
import { LoadMoreButton } from "../LoadMoreButton/LoadMoreButton";
import { Loader } from "../Loader/Loader";
import { SearchBar } from "../SearchBar/SearchBar";
import { fetchPhotosWithTopic } from "../../images-api";
import "./App.module.css";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: " rgba(0, 0, 0, 0.8)",
  },
};
export default function App() {
  const [searchquery, setSearchQuery] = useState("");
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [totalPages, setTotalpages] = useState(null);
  const [showBtn, setShowBtn] = useState(false);
  const [showNotFoundMessage, setShowNotFoundMessage] = useState(false);

  function openModal(imageUrl) {
    setSelectedImageUrl(imageUrl);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (searchquery === "") {
      return;
    }
    async function getData() {
      setLoading(true);
      try {
        const data = await fetchPhotosWithTopic(searchquery, page);
        setTotalpages(data.total_pages);
        setShowBtn(data.total_pages && data.total_pages !== page);
        setShowNotFoundMessage(data.total_pages === 0);
        setPhotos((prevPhotos) => {
          return [...prevPhotos, ...data.results];
        });
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [searchquery, page]);
  useEffect(() => {
    if (photos.length > 0) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [photos]);

  const handleMoreButton = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handleSearch = (newQuery) => {
    setSearchQuery(newQuery);
    setPage(1);
    setPhotos([]);
  };

  return (
    <>
      <div className={css.container}>
        <div className={css.searchBar}>
          <SearchBar onSearch={handleSearch} />
        </div>
        {showNotFoundMessage ? (
          <p className={css.errorMessage}>
            Sorry! The search item is not found!
          </p>
        ) : (
          <>
            {photos.length > 0 && (
              <ImageGallery photos={photos} onImageClick={openModal} />
            )}
            <div className={css.loaderContainer}>{loading && <Loader />}</div>
            {error && <ErrorMessage />}
            <ImageModal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              imageUrl={selectedImageUrl}
              style={customStyles}
            />
            {showBtn && <LoadMoreButton onClick={handleMoreButton} />}
          </>
        )}
      </div>
    </>
  );
}
