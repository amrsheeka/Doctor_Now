import Ip from "./Ip"; 
import axios from "axios";
let user;
const sighnup = async(username, email, password) => {
  const signupres = fetch(`${Ip.ip}/API/Auth/signup.php`, {
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
      alert(error);
    });
};

const login = async(email, password) => {
  const loginres = fetch(`${Ip.ip}/API/Auth/Login.php`, {
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
      user = responseJson;
      console.log(user);
    })
    .catch((error) => {
      alert(error);
    });
};
const logout =async ()=>{
  // await axios({
  //   method: "get",
  //   url: `${Ip.ip}/API/Auth/Logout.php`,
  //   header: {
  //     Accept: "application/json",
  //     "Content-type": "application/json",
  //   },
  // }).then((response) => {
  //   console.log(response);
  // });
  // Invoking get method to perform a GET request

  axios.get(`${Ip.ip}/API/Auth/Logout.php`).then((response) => {
    console.log(response.data);
    
  });

}
export { sighnup,login };
