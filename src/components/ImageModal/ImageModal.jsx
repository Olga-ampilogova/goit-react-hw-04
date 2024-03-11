import Modal from "react-modal";

export const ImageModal = ({ isOpen, onRequestClose, imageUrl, style }) => {
  const handleClose = () => {
    onRequestClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={style}
      contentLabel="Image Modal"
    >
      <div>
        <img
          src={imageUrl}
          alt="Regular Image"
          // className={css.imageModalContent}
        />
      </div>
    </Modal>
  );
};
