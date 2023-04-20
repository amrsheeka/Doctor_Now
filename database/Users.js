import Ip from "./Ip";
import axios from "axios";
import CurrentUser from "../components/consts/CurrentUser";
const sighnup = async (name, email, password, phone, address, address2, age, gender, confirm) => {
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
      age: age,
      gender: gender
    }),
  })
    .then((response) => response.json())
    .then((responseJson) => {

      if (responseJson.status == "sucees") {
        console.log("err");
        login(email, password);
      }
      return responseJson.status;
    })

    .catch((error) => {
      alert("This email already exist.");
      throw new Error(error);
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
      console.log(responseJson);
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
    return res.data;
  } else {
    return null;
  }
}

const getFavourite = async (users_id) => {

  return axios.post(`${Ip.ip}/API/favorate/get.php`, {
    users_id: users_id
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}
const getinFavourite = async (users_id, doctor_id) => {

  return axios.post(`${Ip.ip}/API/favorate/getinfav.php`, {
    users_id: users_id,
    doctor_id: doctor_id
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}
const insertFavourite = async (users_id, doctor_id) => {
  const res = await axios.post(`${Ip.ip}/API/favorate/insert.php`, {
    users_id: users_id,
    doctor_id: doctor_id
  })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
const deleteFavourite = async (users_id, doctor_id) => {
  const res = await axios.post(`${Ip.ip}/API/favorate/delete.php`, {
    users_id: users_id,
    doctor_id: doctor_id

  })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const insertAppointment = async (users_id, doctor_id, date, time, name_patient, age, gender, notes, doc_name, doc_image, specialization1) => {
  const res = await axios.post(`${Ip.ip}/API/doctors/InsertAppointment.php`, {
    users_id: users_id,
    doctor_id: doctor_id,
    date: date,
    time: time,
    name_patient: name_patient,
    age: age,
    gender: gender,
    notes: notes,
    doc_name: doc_name,
    doc_image: doc_image,
    specialization1: specialization1
  })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
const getAppointment = async (users_id) => {
  return axios.post(`${Ip.ip}/API/doctors/getAppointment.php`, {
    users_id: users_id
  })
    .then(function (response) {
      console.log(response.date)

      return response.data;

    })
    .catch(function (error) {
      console.log(error);
    });
}
const getAllAppointment = async () => {
  return axios.post(`${Ip.ip}/API/doctors/getAllAppointments.php`)
    .then(function (response) {
      console.log(response.date)

      return response.data;

    })
    .catch(function (error) {
      console.log(error);
    });
}
const getAppointment_by_doc_id = async (doctor_id, date) => {
  return axios.post(`${Ip.ip}/API/doctors/getAppointmentsby_doc_id.php`, {
    doctor_id: doctor_id,
    date: date
  })
    .then(function (response) {
      console.log(response.date)

      return response.data;

    })
    .catch(function (error) {
      console.log(error);
    });
}
const deleteAppointment = async (users_id, doctor_id) => {
  const res = await axios.post(`${Ip.ip}/API/doctors/del_appointment.php`, {
    users_id: users_id,
    doctor_id: doctor_id
  })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
export {
  sighnup,
  login,
  logout,
  getAppointment,
  getCurrentUser,
  insertFavourite,
  getFavourite,
  getinFavourite,
  deleteFavourite,
  insertAppointment,
  deleteAppointment,
  getAppointment_by_doc_id,
  getAllAppointment
};
