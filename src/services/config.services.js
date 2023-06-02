import axios from "axios";


const service = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
})

//! Indico a mi Front End que en las llamadas al backend deben buscar un token
service.interceptors.request.use((config) => {
    const tokenAuth = localStorage.getItem("tokenAuth");

    if(tokenAuth) {
        config.headers.authorization = `Bearer ${tokenAuth}`
    }

    return config
})

export default service;