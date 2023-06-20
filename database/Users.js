import Ip from "./Ip";
import axios from "axios";
import CurrentUser from "../components/consts/CurrentUser";
const sighnup = async (
  name,
  email,
  password,
  phone,
  address,
  // address2,
  age,
  gender,
  confirm
) => {
  console.log(name,
    email,
    password,
    phone,
    address,
    // address2,
    age,
    gender,
    confirm);
  return await axios.post(`${Ip.ip}/API/Auth/Signup.php`, {
    name: name,
    email: email,
    password: password,
    phone: phone,
    address: address,
    address_2: "",
    confirm: confirm,
    age: age,
    gender: gender,
  }).then((response)=>{
    console.log("res: ",response.data);
    return response.data;
  }).catch((error)=>{
    console.log("err: ",error);
    alert("This email already exist.");
    throw new Error(error);
  })
}

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
      return responseJson;
    })
    .catch((error) => {
      alert("This email not exist");
      console.log(error);
      throw new Error("This email not exist");
    });
};
const logout = async () => {
  axios
    .get(`${Ip.ip}/API/Auth/Logout.php`)
    .then((response) => {
      CurrentUser.user = response.data;
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
const getCurrentUser = async () => {
  const res = await axios.get(`${Ip.ip}/API/Auth/Getuser.php`);
  if (res.data != "") {
    CurrentUser.user = res.data;
    return res.data;
  } else {
    return null;
  }
};

const editUser = async (user) => {
  return await axios
    .post(`${Ip.ip}/API/users/edit.php`, { ...user })
    .then(function (response) {
      console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const getFavourite = async (users_id) => {
  return axios
    .post(`${Ip.ip}/API/favorate/get.php`, {
      users_id: users_id,
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
const getinFavourite = async (users_id, doctor_id) => {
  return axios
    .post(`${Ip.ip}/API/favorate/getinfav.php`, {
      users_id: users_id,
      doctor_id: doctor_id,
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
const insertFavourite = async (users_id, doctor_id) => {
  const res = await axios
    .post(`${Ip.ip}/API/favorate/insert.php`, {
      users_id: users_id,
      doctor_id: doctor_id,
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
const deleteFavourite = async (users_id, doctor_id) => {
  const res = await axios
    .post(`${Ip.ip}/API/favorate/delete.php`, {
      users_id: users_id,
      doctor_id: doctor_id,
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const insertAppointment = async (
  users_id,
  doctor_id,
  date,
  time,
  name_patient,
  age,
  gender,
  phone_number,
  notes,
  patient_image,
  price,
  wating_time,
  title1,
  title,
  doc_name,
  doc_image,
  specialization1,
  address
) => {
  const res = await axios
    .post(`${Ip.ip}/API/doctors/InsertAppointment.php`, {
      users_id: users_id,
      doctor_id: doctor_id,
      date: date,
      time: time,
      name_patient: name_patient,
      age: age,
      gender: gender,
      phone_number: phone_number,
      notes: notes,
      patient_image: patient_image,
      price: price,
      wating_time: wating_time,
      title1: title1,
      title: title,
      doc_name: doc_name,
      doc_image: doc_image,
      specialization1: specialization1,
      address: address,
    })
    .then((response) => {

      console.log(response.data);
      return response.data.status;
    })
    .catch(function (error) {
      console.log(error);
    });
};
const insertAppointment_toHistory = async (
  users_id,
  doctor_id,
  date,
  time,
  name_patient,
  age,
  gender,
  phone_number,
  notes,
  diagnosis,
  therapeutic,
  patient_image,
  doc_name,
  doc_image,
  specialization1
) => {
  const res = await axios
    .post(`${Ip.ip}/API/doctors/insert_to_historty.php`, {
      users_id: users_id,
      doctor_id: doctor_id,
      date: date,
      time: time,
      name_patient: name_patient,
      age: age,
      gender: gender,
      phone_number: phone_number,
      notes: notes,
      diagnosis: diagnosis,
      therapeutic: therapeutic,
      patient_image: patient_image,
      doc_name: doc_name,
      doc_image: doc_image,
      specialization1: specialization1,
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
const getAppointment = async (users_id) => {
  return axios
    .post(`${Ip.ip}/API/doctors/getAppointment.php`, {
      users_id: users_id,
    })
    .then(function (response) {
      console.log(response.date);

      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const getAppointment_for_Doctor = async (doctor_id) => {
  return axios
    .post(`${Ip.ip}/API/doctors/getAppointment_For_doc.php`, {
      doctor_id: doctor_id,
    })
    .then(function (response) {
      console.log(response.date);

      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const get_History_Apps_for_Doctor = async (doctor_id, date) => {
  return axios
    .post(`${Ip.ip}/API/doctors/Get_History_apps_doc.php`, {
      doctor_id: doctor_id,
      date: date,
    })
    .then(function (response) {
      console.log(response.date);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
const get_History_Apps_for_Doctor_by_Number = async (
  doctor_id,
  phone_number
) => {
  return axios
    .post(`${Ip.ip}/API/doctors/Get_History_apps_doc_by_number.php`, {
      doctor_id: doctor_id,
      phone_number: phone_number,
    })
    .then(function (response) {
      console.log(response.date);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
const get_app_by_doc_id_user_id = async (
  doctor_id,
  users_id
) => {
  return axios
    .post(`${Ip.ip}/API/doctors/get_app_by_doc_id_user_id.php`, {
      doctor_id: doctor_id,
      users_id: users_id,
    })
    .then(function (response) {
      // console.log(response.date);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
const get_History_Apps_for_User_by_date = async (users_id, date) => {
  return axios
    .post(`${Ip.ip}/API/doctors/Get_History_apps_user_by_date.php`, {
      users_id: users_id,
      date: date,
    })
    .then(function (response) {
      console.log(response.date);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
const get_History_Apps_for_User_by_doctorName = async (users_id, doc_name) => {
  return axios
    .post(`${Ip.ip}/API/doctors/Get_History_apps_user_by_doctorName.php`, {
      users_id: users_id,
      doc_name: doc_name,
    })
    .then(function (response) {
      console.log(response.date);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
const getAllAppointment = async () => {
  return axios
    .post(`${Ip.ip}/API/doctors/getAllAppointments.php`)
    .then(function (response) {
      console.log(response.date);

      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
const getAllAppointment_from_history = async () => {
  return axios
    .post(`${Ip.ip}/API/doctors/getAllAppointments_fromHistory.php`)
    .then(function (response) {
      console.log(response.date);

      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
const getAppointment_by_doc_id = async (doctor_id, date) => {
  return axios
    .post(`${Ip.ip}/API/doctors/getAppointmentsby_doc_id.php`, {
      doctor_id: doctor_id,
      date: date,
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
const get_doc_by_email = async (email) => {
  return axios
    .post(`${Ip.ip}/API/doctors/get_doc_by_email.php`, {
      email: email,
    })
    .then(function (response) {
      //console.log(response.date)

      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
const deleteAppointment = async (users_id, doctor_id) => {
  const res = await axios
    .post(`${Ip.ip}/API/doctors/del_appointment.php`, {
      users_id: users_id,
      doctor_id: doctor_id,
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
const deleteAppointment_fromHistory = async (users_id, doctor_id) => {
  const res = await axios
    .post(`${Ip.ip}/API/doctors/del_app_history.php`, {
      users_id: users_id,
      doctor_id: doctor_id,
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
const Update_Appointment = async (
  users_id,
  doctor_id,
  date,
  time,
  name_patient,
  gender,
  notes,
  age
) => {
  const res = await axios
    .post(`${Ip.ip}/API/doctors/Update_Appointment.php`, {
      users_id: users_id,
      doctor_id: doctor_id,
      date: date,
      time: time,
      name_patient: name_patient,
      gender: gender,
      notes: notes,
      age: age,
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
const UpdateReviews = async (review) => {
  const res = await axios
    .post(`${Ip.ip}/API/reviews/update_rev.php`, {
      ...review
    })
    .then(function (response) {
      console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
const getReviews = async (doctor_id) => {
  return axios
    .post(`${Ip.ip}/API/reviews/get_rev.php`, {
      doctor_id: doctor_id,
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
const insertReviews = async (users_id, doctor_id, user_name, text, rate, date) => {
  const res = await axios
    .post(`${Ip.ip}/API/reviews/insert_rev.php`, {
      users_id: users_id,
      doctor_id: doctor_id,
      user_name: user_name,
      text: text,
      rate: rate,
      date, date,
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
const deleteReviews = async (users_id, doctor_id, user_name, text, rate, date) => {
  const res = await axios
    .post(`${Ip.ip}/API/reviews/insert_rev.php`, {
      users_id: users_id,
      doctor_id: doctor_id,
      user_name: user_name,
      text: text,
      rate: rate,
      date, date,
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
const UpdateDoctorRate = async (review) => {
  const res = await axios
    .post(`${Ip.ip}/API/reviews/update_doctor.php`, {
      ...review
    })
    .then(function (response) {
      console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const getRate = async (doctor_id) => {
  return axios
    .post(`${Ip.ip}/API/rate/get_rate.php`, {
      doctor_id: doctor_id,
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
const insertRate = async (users_id, doctor_id, rate_count) => {
  const res = await axios
    .post(`${Ip.ip}/API/rate/insert_rate.php`, {
      users_id: users_id,
      doctor_id: doctor_id,
      rate_count: rate_count,
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
const get_user_by_Id = async (id) => {
  return axios
    .post(`${Ip.ip}/API/users/get_user_by_Id.php`, {
      id: id,
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
const getUserHistory = async (id) => {
  return axios
    .post(`${Ip.ip}/API/doctors/getHistory_User.php`, {
      users_id: id,
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
const getDoctorHistory = async (id) => {
  return axios
    .post(`${Ip.ip}/API/doctors/getHistory_Doctor.php`, {
      id: id,
    })
    .then(function (response) {
      return response.data;
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
  getAllAppointment,
  Update_Appointment,
  editUser,
  getAppointment_for_Doctor,
  get_doc_by_email,
  get_History_Apps_for_Doctor,
  get_History_Apps_for_Doctor_by_Number,
  deleteAppointment_fromHistory,
  insertAppointment_toHistory,
  getAllAppointment_from_history,
  getReviews,
  insertReviews,
  UpdateReviews,
  getRate,
  insertRate,
  get_user_by_Id,
  get_History_Apps_for_User_by_date,
  get_History_Apps_for_User_by_doctorName,
  getUserHistory,
  getDoctorHistory,
  deleteReviews,
  UpdateDoctorRate,
  get_app_by_doc_id_user_id
};
