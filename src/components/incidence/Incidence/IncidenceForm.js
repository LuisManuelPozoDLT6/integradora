import React from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import * as yup from "yup";
import { useFormik } from "formik";
import Alert, {
  msjConfirmacion,
  titleConfirmacion,
  titleError,
  msjError,
  titleExito,
  msjExito,
} from "../../../shared/plugins/alert";
import axios from "../../../shared/plugins/axios";

export const IncidenceForm = ({ isOpen, handleClose, setIndices }) => {
  
  const cancelRegistration = () => {
    handleClose();
  };

  return (
    <>
      <Modal 
      backdrop="static"
      keyboard={false}
      show={isOpen}
      onHide={cancelRegistration}>
      <Modal.Header closeButton>
        <Modal.Title>Registrar incidencia</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label className="form-label">Descripción</Form.Label>
            <Form.Control
              name="description"
              placeholder="Características del producto"
              as="textarea"
              rows={4}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="form-label">Imágenes</Form.Label>
            <Form.Control
              name="files"
              type="file"
              multiple
              accept="image/*"
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Row>
              <Col className="text-end">
                <Button
                  variant="danger"
                  type="button"
                  onClick={handleCloseForm}
                >
                  <FeatherIcon icon={"x"} />
                  &nbsp; Cerrar
                </Button>
                <Button
                  variant="success"
                  className="ms-3"
                  type="submit"
                >
                  <FeatherIcon icon={"check"} />
                  &nbsp; Guardar
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
    </>
    
  );
};
