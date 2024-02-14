import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function TrailerModal({ trailerUrl, showModal, setShowModal }) {
  const trailerComponent = trailerUrl ? (
    <div className="youtube-container">
      <Button className="modal-close-btn" onClick={() => setShowModal(false)}>
        Close
      </Button>

      <iframe
        src={trailerUrl + '&autoplay=1'}
        allow="autoplay; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
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
        <Modal.Body>{trailerComponent}</Modal.Body>
      </Modal>
    </>
  );
}
export default TrailerModal;
