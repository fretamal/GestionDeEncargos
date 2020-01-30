import axios from 'axios';

const instance = axios.create({
   //baseURL: 'http://localhost:8080/',
     baseURL: 'https://pingeso-backend.herokuapp.com/',
    transformRequest: [function (data, headers) {
      const token = localStorage.getItem('token');
      if(token)
        headers['Authorization'] = `Bearer ${token}`
      return JSON.stringify(data)
    }],
    headers: {
        'Content-Type':'application/json;charset=UTF-8'
       
      }
});
// instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
export default instance;