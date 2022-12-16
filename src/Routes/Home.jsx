import { useEffect } from "react";
import Card from "../Components/Card";
import { useState } from "react";

const Home = () => {
  
  const [dentista, setDentista] = useState([]);

  useEffect(() => {
    fetch("https://dhodonto.ctdprojetos.com.br/dentista")
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw Error("Servidor Error!");
        }
      }).then( res => {
        setDentista(res);
      });
  }, []);

  return (
    <>
      <h1>Home</h1>
      <div className="card-grid container">
        {dentista.map( dentista => <Card key={dentista.matricula} dados={dentista} /> )}
      </div>
    </>
  );
};

export default Home;
