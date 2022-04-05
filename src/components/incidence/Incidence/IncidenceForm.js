import React, {useEffect} from "react";
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

export const IncidenceForm = ({ isOpen, userLogged, setIncidence, handleClose }) => {
  
  const formik = useFormik({
    initialValues:{
      description:"",
      client: ...userLogged,
      status:{
        id:1
      },
      pictureIncidence:"100101010101"
    }, 
    validationSchema:yup.object().shape({
      description: 
        yup.string().required("Campo obligatorio!")
    }),
    onSubmit: (values) => {
      Alert.fire({
        title: titleConfirmacion,
        text: msjConfirmacion,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#198754",
        cancelButtonColor: "#dc3545",
        showCancelButton: true,
        reverseButtons: true,
        showLoaderOnConfirm: true,
        icon: "warning",
        preConfirm: () => {
          return axios({
            url: "/incidence/",
            method: "POST",
            data: JSON.stringify(values),
          })
            .then((response) => {
              console.log(response);
              if (!response.error) {
                setIncidence((incidence) => [...incidence, response.data]);
                handleCloseForm();
                Alert.fire({
                  title: titleExito,
                  text: msjExito,
                  icon: "success",
                  confirmButtonColor: "#198754",
                  confirmButtonText: "Aceptar",
                });
              }
              return response;
            })
            .catch((error) => {
              Alert.fire({
                title: titleError,
                text: msjError,
                confirmButtonColor: "#198754",
                icon: "error",
                confirmButtonText: "Aceptar",
              });
            });
        },
        backdrop: true,
        allowOutsideClick: !Alert.isLoading,
      });
    },
  });

  const handleCloseForm = () => {
    formik.resetForm();
    handleClose();
  };
  
  return (
    <>
      <Modal
      show={isOpen}
      onHide={handleCloseForm}
      >
      <Modal.Header closeButton>
        <Modal.Title>Registrar incidencia</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label className="form-label">Descripción</Form.Label>
            <Form.Control
              name="description"
              placeholder="Características del producto"
              as="textarea"
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            {formik.errors.description ? (
              <span className="error-text">{formik.errors.description}</span>
            ) : null}
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
                  disabled={!(formik.isValid && formik.dirty)}
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
