import axios from "axios";

const baseURL = "https://grapple.onrender.com"

const http = axios.create({
    baseURL: baseURL,
    // headers:{
    // 'Authorization': `Bearer ${localstorage.getItem("access_token")}`
    // }
})

export default http;