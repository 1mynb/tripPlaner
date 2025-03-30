import axios from 'axios'

const tpUrl = 'http://localhost:8000/api'
//const tpUrl = 'https://tripplannerback.zeaye.com/api'

// Create an Axios instance
const axiosInstance = axios.create({
   baseURL: tpUrl,
});

export { axiosInstance }