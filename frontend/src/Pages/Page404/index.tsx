import "./style.css";
import {Link} from "react-router-dom";

export const Page404 = () => {
  return (
      <div className="container-page">
        <h1>Pagina não encontrada!</h1>
          <br />
          <Link to={"/"}>Voltar</Link>
      </div>
  )
}