import styles from "./Form.module.css";
import { useEffect, useState} from "react"
import { useNavigate } from "react-router-dom";
import { useContexts } from "../Hooks/mainContext";

const LoginForm = () => {
  
  const navigate = useNavigate()

  const {mainState, changeContext} = useContexts()

  const [userName, setUserName] = useState("")
  const [passWord, setPassWord] = useState("")
  const [erro, setErro] = useState("")

  useEffect( () => {
    if(mainState.auth !== ""){
      navigate("/home")
    }
  })

  const handleSubmit = (e) => {
    setErro("");
    e.preventDefault()

    const login = {
      userName: userName,
      passWord: passWord,
    }
  
    fetch("https://dhodonto.ctdprojetos.com.br/auth",
    {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(login)
    }).then( res => {
      if(res.status === 200) {
        return res.json()
      }else{
        throw Error("Nome ou Senha stá incorretas")
      }
    }).then(res => {changeContext({
      state: "auth",
      auth: res.token
    })
    navigate("/home")
  }).catch(erro => setErro(erro.toString()))
  }

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div
        className={(mainState.theme === "dark") ? `text-center card container ${styles.card} ${styles.cardDark}` : `text-center card container ${styles.card}`}
      >
        <div className={`card-body ${styles.CardBody}`}>
          <form onSubmit={handleSubmit}>
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Login"
              name="login"
              value={userName}
              onChange={(event) => {setUserName(event.target.value)}}
              required
            />
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Password"
              name="password"
              type="password"
              value={passWord}
              onChange={(event) => {setPassWord(event.target.value)}}
              required
            />
            <span>{erro}</span>
            <button className="btn btn-primary" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
