import { useEffect, useState } from "react";
import ScheduleFormModal from "./ScheduleFormModal";
import styles from "./DetailCard.module.css";
import { useMatch} from "react-router-dom"
import { useContexts } from "../Hooks/mainContext";

const DetailCard = () => {
  const {mainState} = useContexts()

  const  [dentist, setDentist] = useState({
    nome: null,
    sobrenome: null,
    usuario: {
      username: null,
    }
  })

  const idDentist = useMatch("/dentist/:idDentist").params.idDentist
  useEffect(() => {

    fetch(`https://dhodonto.ctdprojetos.com.br/dentista?matricula=${idDentist}`,
    {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "GET"
    })
    .then(res=>{
        if(res.status === 200){
          return res.json()
        }
        else{
          throw Error("Erro do servidor!");
        }
      })
    .then(res=>{
      setDentist(res);
    })
  }, [idDentist])


  return (
    <>
      <h1>Detail about Dentist {dentist.nome} </h1>
      <section className= {(mainState.theme === "dark") ? `card col-sm-12 col-lg-6 container ${styles.cardDark}` : "card col-sm-12 col-lg-6 container"}>
        {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
        <div className={`card-body row`}>
          <div className="col-sm-12 col-lg-6">
            <img
              className="card-img-top"
              src="/images/doctor.jpg"
              alt="doctor placeholder"
            />
          </div>
          <div className="col-sm-12 col-lg-6">
            <ul className="list-group">
              <li className={(mainState.theme === "dark") ? `list-group-item bg-dark text-white` : "list-group-item"}>Nome: {dentist.nome}</li>
              <li className={(mainState.theme === "dark") ? `list-group-item bg-dark text-white` : "list-group-item"}>
                Sobrenome: {dentist.sobrenome}
              </li>
              <li className={(mainState.theme === "dark") ? `list-group-item bg-dark text-white` : "list-group-item"}>
                Usuário: {dentist.usuario.username}
              </li>
            </ul>
            <div className="text-center">
              {/* //Na linha seguinte deverá ser feito um teste se a aplicação
              // está em dark mode e deverá utilizado o css correto */}
              <button
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className={`btn btn-${mainState.theme} ${styles.button
                  }`}
              >
                Marcar consulta
              </button>
            </div>
          </div>
        </div>
      </section>
      <ScheduleFormModal />
    </>
  );
};

export default DetailCard;
