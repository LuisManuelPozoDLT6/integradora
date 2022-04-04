import React from "react";
import "../../../assets/css/geinma.css";
import FeatherIcon from "feather-icons-react";

export const Incidence = (props) => {
  console.log(props);
  const { incidence } = props;
  const { status, client, technical } = incidence;
  let color = "";

  switch (status.description) {
    case "Activo":
      color = "bg-info";
      break;
    case "En ejecución":
      color = "bg-warning";
      break;
    case "Terminada":
      color = "bg-danger";
      break;
  }

  return (
    <div className="col-md-6 col-lg-4 pb-3">
      <div
        className="card card-custom bg-white border-white border-0"
        style={{ height: 350 }}
      >
        <div
          className={
            incidence.id % 2 == 0
              ? "card-custom-img bg-azul"
              : "card-custom-img bg-verde"
          }
        >
          <div
            className="text-white"
            style={{ marginLeft: 130, marginTop: 42, lineHeight: "100%" }}
          >
            <p>
              <FeatherIcon icon={"user"} size={18}></FeatherIcon>{" "}
              {client.person.name} {client.person.surname}{" "}
              {client.person.secondSurname}
            </p>
            <p>
              <FeatherIcon
                icon={"calendar"}
                size={18}
                backgroundColor={"red"}
              ></FeatherIcon>{" "}
              {incidence.dateRegistered}
            </p>
          </div>
        </div>
        <div className="card-custom-avatar">
          <img
            className="img-fluid"
            src="https://img.clasf.mx/2020/08/18/Laptop-Sony-Vaio-rosa-descompuesta-20200818084932.7086270015.jpg"
            alt="Avatar"
          />
        </div>
        <div className="card-body" style={{ overflowY: "auto" }}>
          <h5 className="card-title">
            <span className={"badge " + color}>{status.description}</span>
          </h5>
          <p className="card-text">{incidence.description}</p>
        </div>
        <div
          className="card-footer"
          style={{ background: "inherit", borderColor: "inherit" }}
        >
          <hr></hr>
          <p>
            <FeatherIcon icon={"tool"} size={15}></FeatherIcon>{" "}
            {!incidence.technical ? "Por asignar" : technical.person.name+" "+technical.person.surname}
            
            {status.description != "Terminada" 
                ? "" 
                : <button className="btn btn-outline-danger float-end">Terminar</button>
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Incidence;
