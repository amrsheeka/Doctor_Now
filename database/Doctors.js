import Doctor from "../components/consts/Doctor";
import axios from "axios";
import Ip from "./Ip";
const getDoctors = async () => {
  const res = await axios.get(`${Ip.ip}/API/doctors/select.php`);
  Doctor.doctors = res.data;
  return res.data;
};
const deleteDoctor = async (id) => {
  console.log(id);
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
const editDoctor = async (id,lat,long) => {
  const res = await axios.post(`${Ip.ip}/API/doctors/updateLocation.php`, {
    id:id,
    x_coordnate:lat,
    y_coordnate:long
  })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const updateDoctor = async (doctor) => {
  const res = await axios.post(`${Ip.ip}/API/doctors/update_doctors.php`, {
   ...doctor
  })
    .then(function (response) {
      console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const addDoctor = async (doctor) => {

  return await axios.post(`${Ip.ip}/API/doctors/insert.php`, {...doctor})
    .then(function (response) {
      console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}
const getDocSchedule = async (doctor_id) => {
  return axios.post(`${Ip.ip}/API/doctors/schedule.php`, {
    doctor_id: doctor_id
  })
    .then(function (response) {
      //console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}
const updateSchedule = async (schedule) => {
  return axios.post(`${Ip.ip}/API/doctors/update_schedule.php`, {
    ...schedule
  })
    .then(function (response) {
      console.log(response.data,"\n",schedule);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}
export { 
  getDoctors,
  deleteDoctor,
  getDoc,
  editDoctor,
  addDoctor,
  getDocSchedule,
  updateDoctor,
  updateSchedule,

};
