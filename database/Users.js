import Ip from "./Ip"; 
let user;
const sighnup = (username, email, password) => {
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
      user = responseJson;
      console.log(user);
    })
    .catch((error) => {
      alert(error);
    });
};
export { sighnup };
