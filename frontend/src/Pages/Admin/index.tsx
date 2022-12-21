import "./style.css";
import {Menu} from "../../Components/Menu";

export const Admin = () => {
  return (
      <div className={"border"}>
          <Menu isLoginPage={false} isSitePage={false} />
      </div>
  )
}