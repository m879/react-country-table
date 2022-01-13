import axios from 'axios';

export const GetAllCountry=()=>{
    return axios.get(`https://restcountries.com/v3.1/region/Asia`)
    .then((res)=>{
         return res.data;
    })
    .catch((err)=>{
        console.log(err);
    })
}