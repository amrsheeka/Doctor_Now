import axios from "axios";
import Ip from "./Ip";
const Pay = async () => {
    const res = await axios.get(`${Ip.ip}/API/doctors/select.php`);
    
    return res.data;
};