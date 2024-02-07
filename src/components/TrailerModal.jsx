import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function TrailerModal({ trailerUrl, showModal, setShowModal }) {
  const trailerComponent = trailerUrl ? (
    <>
      <Button variant="secondary" onClick={() => setShowModal(false)}>
        Close
      </Button>
      <iframe
        src={trailerUrl}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>{' '}
    </>
  ) : (
    ''
  );

  return (
    <>
      <Modal
        className="movie-modal"
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        dialogClassName="modal-90w"
        animation={false}
        keyboard={false}
      >
        <Modal.Body>{trailerComponent}</Modal.Body>
      </Modal>
    </>
  );
}
export default TrailerModal;
