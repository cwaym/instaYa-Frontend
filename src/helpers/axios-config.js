import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: 'https://instaya-frontend.vercel.app/'
})

export{
    axiosConfig
}
