import Doctor from "../components/consts/Doctor";
import axios from "axios";
import Ip from "./Ip";
const getDoctors = async () => {
  const res = await axios.get(`${Ip.ip}/API/doctors/select.php`);
  Doctor.doctors = res.data;
  //console.log((await res).data);
  return res.data;
};
export { getDoctors };
