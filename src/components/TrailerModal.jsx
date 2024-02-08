import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function TrailerModal({ trailerUrl, showModal, setShowModal }) {
  const trailerComponent = trailerUrl ? (
    <>
      <Button className="modal-close-btn" onClick={() => setShowModal(false)}>
        Close
      </Button>
      <iframe
        src={trailerUrl + "?autoplay=1"}
        allow="autoplay"
        allowFullScreen
      ></iframe>
    </>
  ) : (
    ""
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
