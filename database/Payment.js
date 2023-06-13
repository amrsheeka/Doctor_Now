import axios from "axios";
import Ip from "./Ip";
const pay = async (doctor_id,card_number,appoints,ammount,cvv,card_expiry) => {
    console.log({doctor_id:doctor_id,
        appoints:appoints,
        Card_Number:card_number,
        ammount:ammount,
        CVV:cvv,
        Card_Expiry:card_expiry})
    const res = await axios.post(`${Ip.ip}/API/Credits/pay.php`,{
        doctor_id:doctor_id,
        appoints:appoints,
        Card_Number:card_number,
        ammount:ammount,
        CVV:cvv,
        Card_Expiry:card_expiry
    });
    
    return res.data;
};
export{pay}