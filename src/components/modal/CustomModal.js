import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setShowModal } from "../../system/systemSlice";

export const CustomModal = ({ title, children }) => {
  const dispatch = useDispatch();

  const { showModal } = useSelector((state) => state.system);

  return (
    <>
      <Modal
        show={showModal}
        onHide={() => dispatch(setShowModal(false))}
        on
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{children}</p>
        </Modal.Body>
      </Modal>
    </>
  );
};
