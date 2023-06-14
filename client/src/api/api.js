import axios from 'axios';


const api = axios.create({baseURL: "http://localhost:5000"});


export const getProfile = (userName) => api.get(`/profile/${userName}`)
export const updateProfile = (userName) => api.post(`/profile/${userName}`)
export const getRanking = () => api.get('/ranking')