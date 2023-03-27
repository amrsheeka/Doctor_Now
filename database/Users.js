import Ip from "./Ip"; 
import axios from "axios";
let user;
const sighnup = async(username, email, password) => {
  return fetch(`${Ip.ip}/API/Auth/signup.php`, {
    method: "POST",
    //mode: "no-cors",
    header: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name: username,
      email: email,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      login(email,password);
    })
    .catch((error) => {
      alert("This email already exist.");
      throw new Error("This email already exist.");
    });
};

const login = async(email, password) => {
  return fetch(`${Ip.ip}/API/Auth/Login.php`, {
    method: "POST",
    //mode: "no-cors",
    header: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      
      if(responseJson.status=="failed"){
        throw new Error("This email not exist");
      }else{
        user = responseJson;
        console.log(user);
      }
      
    })
    .catch((error) => {
      alert("This email not exist");
      throw new Error("This email not exist");
    });
};
const logout =async ()=>{

  axios.get(`${Ip.ip}/API/Auth/Logout.php`).then((response) => {
    console.log(response.data);
    
  }).catch((err)=>{
    console.log(err);
  });

}
export { sighnup,login };
