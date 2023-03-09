import axios from "axios";

const baseURL = "https://grapple-production.up.railway.app"

const http = axios.create({
    baseURL: baseURL,
    // headers:{
    // 'Authorization': `Bearer ${localstorage.getItem("access_token")}`
    // }
})

export default http;