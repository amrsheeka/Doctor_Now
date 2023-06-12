import axios from "axios";
import Ip from "./Ip";
const Pay = async (card_number,ammount,cvv,card_expiry) => {
    const res = await axios.post(`${Ip.ip}/API/Credits/pay.php`,{
        Card_Number:card_number,
        ammount:ammount,
        CVV:cvv,
        Card_Expiry:card_expiry
    });
    
    return res.data;
};
export{Pay}