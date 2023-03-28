import Doctor from "../components/consts/Doctor";
import axios from "axios";
import Ip from "./Ip";
const getDoctors = async () => {
  await axios({
    method: "get",
    url: `${Ip.ip}/API/doctors/select.php`,
    header: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
  }).then((response) => {
    Doctor.doctors = response.data;
    //console.log(Doctor.doctors);
  });
  // Invoking get method to perform a GET request

  axios.get(`${Ip.ip}/API/doctors/select.php`).then((response) => {

    Doctor.doctors = response.data;
  });
};
export { getDoctors };
