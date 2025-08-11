import {API_URL} from '../util/constants'
import axios from 'axios';

export async function loginAPI(values){
  //console.log('Estos son los valores'+values.email)
  const url = `${API_URL}/auth/local`
  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values)
  }
  //c@gmail.com
  //123456
  try {
    console.log(params)
    console.log(url)
    const response = await fetch(url,params)
    
    const result = await response.json()
    
    console.log(result)
    //console.log(response)
    
    return result
  } catch (error) {
    console.log('Error desde aca')
    return null
  }
}



export function registroAPI(values){
    
const url = `${API_URL}/auth/local/register`
// Request API.
//navirasec1.0@gmail.com
//Fantasma000
//Fantom50
console.log(url)
console.log(values.email)
console.log(values.username)  
console.log(values.password)
const response = axios
  .post(url, {
      email: values.email ,
      username: values.username,
      password: values.password,

  })
  .then(response => {
    // Handle success.
    console.log('Well done!');
    console.log('User profile', response.data.user);
    console.log('User token', response.data.jwt);
  })
  .catch(error => {
    // Handle error.
    console.log('An error occurred:', error.response);
  });
    //console.log(response.email)
}