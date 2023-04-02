import Ip from "./Ip";
import axios from "axios";
import CurrentUser from "../components/consts/CurrentUser";
const sighnup = async (name, email, password, phone, address, address2,age,gender, confirm) => {
  console.log(age,gender);
  return fetch(`${Ip.ip}/API/Auth/signup.php`, {
    method: "POST",
    //mode: "no-cors",
    header: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
      phone: phone, 
      address: address,
      address_2: address2,
      confirm: confirm,
      age:age,
      gender:gender
    }),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      login(email, password);
    })
    
    .catch((error) => {
      //alert("This email already exist.");
      console.log(error.json());
      throw new Error(error.json());
    });
};

const login = async (email, password) => {
  return await fetch(`${Ip.ip}/API/Auth/Login.php`, {
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
      if (responseJson.status == "failed") {
        throw new Error("This email not exist");
      } else {
        CurrentUser.user = responseJson;
      }
    })
    .catch((error) => {
      alert("This email not exist");
      console.log(error);
      throw new Error("This email not exist");
    });
};
const logout = async () => {

  axios.get(`${Ip.ip}/API/Auth/Logout.php`).then((response) => {
    CurrentUser.user = response.data;
    console.log(response.data);

  }).catch((err) => {
    console.log(err);
  });

}
const getCurrentUser = async () => {

  const res = await axios.get(`${Ip.ip}/API/Auth/Login.php`);
  if (res.data != "") {
    CurrentUser.user = res.data;
    //console.log(res.data);
    return res.data;
  } else {
    return null;
  }

}
export { sighnup, login, logout, getCurrentUser };
