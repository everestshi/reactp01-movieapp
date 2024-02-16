import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function TrailerModal({ trailerUrl, showModal, setShowModal }) {
  const trailerComponent = trailerUrl ? (
    <iframe
      src={trailerUrl}
      allow="autoplay; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  ) : (
    ''
  );

  return (
    <>
      <Modal
        show={showModal}
        dialogClassName="movie-modal"
        onHide={() => setShowModal(false)}
        backdrop="static"
        animation={false}
        keyboard={false}
      >
        <Button className="modal-close-btn" onClick={() => setShowModal(false)}>
          Close
        </Button>
        <Modal.Body>{trailerComponent}</Modal.Body>
      </Modal>
    </>
  );
}
export default TrailerModal;
