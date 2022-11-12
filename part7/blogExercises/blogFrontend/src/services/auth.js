import axios from 'axios'


const login = async (user) => {
  console.log('user is: ', user)
  const request = await axios.post('/api/login', user).catch((response) => {return response})
  if(request.status === 200){
    console.log('login succeeded')
    window.localStorage.setItem('blogUser', JSON.stringify( request.data ))
    return request.data
  }else {
    console.log('login failed')
  }

}


export { login }