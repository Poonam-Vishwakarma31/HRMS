import { Children } from "react";
import Can from "../Guard/Can.jsx";

const Button = ({Permissions, Children, ...props}) =>{
  if(Permissions){
    return (
      <Can permission={Permissions}>
        <button {...props}>{Children}</button>
      </Can>
    );
  }  return <button {...props}>{Children}</button>;
}
