import Doctor from "../components/consts/Doctor";
import axios from "axios";
import Ip from "./Ip";
const getDoctors = async () => {
  const res = await axios.get(`${Ip.ip}/API/doctors/select.php`);
  Doctor.doctors = res.data;
  //console.log((await res).data);
  return res.data;
};
const deleteDoctor = async (id) => {
  const res = await axios.post(`${Ip.ip}/API/doctors/delete.php`, {
    id:id
  })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
const getDoc = async (doctor_id) => {
  return axios.post(`${Ip.ip}/API/doctors/getdoc.php`, {
    id: doctor_id
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}
export { getDoctors, deleteDoctor,getDoc };
