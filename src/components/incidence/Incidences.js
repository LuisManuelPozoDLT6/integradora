import React, { useState, useEffect } from "react";
import axios from "../../shared/plugins/axios";
import { CustomLoader } from "../../shared/components/CustomLoader";
import { Container, Row } from "react-bootstrap";
import Incidence from "./Incidence/Incidence";
import { IncidenceForm } from "./Incidence/IncidenceForm";
import { ButtonCircle } from "../../shared/components/ButtonCircle";

export const Incidences = (props) => {
  const {user} = props;
  // console.log(user)
  const [isLoading, setIsLoading] = useState(false);
  const [incidence, setIncidence] = useState([]);
  const [userLogged, setUserLogged] = useState({});
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

  const getUserLogged = (email) => {
    axios({ url: "/user/email/"+email, method: "GET" })
      .then((response) => {
        setUserLogged({...response});
        console.log(userLogged);
        console.log("lol")
      })
      .catch((error) => {
        console.log(error);
      });
    
  };

  useEffect(() => {
    setIsLoading(true);
    getIncidences();
    getUserLogged(user.username);
  }, []);

  return (
    <>
      <Container>
        <IncidenceForm
          isOpen={isOpen}
          userLogged = {userLogged}
          setIncidence={setIncidence}
          handleClose={() => setIsOpen(false)}
        />
        <ButtonCircle
          type={"btn btn-success btn-circle"}
          onClickFunct={() => setIsOpen(true)}
          icon="plus"
          size={20}
        />
        <Row className="pt-5 m-auto">
          {incidence.map((incidence, index) => {
            return <Incidence key={incidence.id} incidence={incidence} index={index}></Incidence>;
          })}
        </Row>
      </Container>
    </>
  );
};
