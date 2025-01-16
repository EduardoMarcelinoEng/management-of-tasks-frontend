import moment from "moment";

export default {
    isLogged: ()=>{
        const tokenExpiresAt = localStorage.getItem("token_expiresAt");
        if(!tokenExpiresAt) return false;
    
        return moment(tokenExpiresAt).format("YYYY-MM-DD HH:mm:ss") >= moment().format("YYYY-MM-DD HH:mm:ss");
    }
}