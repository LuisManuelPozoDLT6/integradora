import React, { useState, useEffect } from "react";
import axios from "../../shared/plugins/axios";
import { CustomLoader } from "../../shared/components/CustomLoader";
import { Container, Row } from "react-bootstrap";
import Incidence from "./Incidence/Incidence";
import IncidenceForm from "./Incidence/IncidenceForm"
import { ButtonCircle } from "../../shared/components/ButtonCircle";

export const Incidences = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [incidence, setIncidence] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const getIncidences = () => {
    axios({ url: "/incidence/", method: "GET" })
      .then((response) => {
        setIncidence(response.data);
        setIsLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getIncidences();
  }, []);

  return (
    <>
      <IncidenceForm
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
      />
      <ButtonCircle
        type={"btn btn-success btn-circle"}
        onClickFunct={() => setIsOpen(true)}
        icon="plus"
        size={20}
      />
      <Container>
        <Row className="pt-5 m-auto">
          {incidence.map((incidence) => {
            return <Incidence incidence={incidence}></Incidence>;
          })}
        </Row>
      </Container>
    </>
  );
};
