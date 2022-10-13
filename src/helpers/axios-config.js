import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: 'https://instaya-back.herokuapp.com'
})

export{
    axiosConfig
}