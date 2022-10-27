import axios from "axios"
import { useEffect, useState } from "react"

 


 export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect( () => {
    const grabCountry = async () => {
      const request = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      console.log('request: ', request.data[0])
      setCountry(request.data[0])
      return request.data[0]
    }
    grabCountry(name)
    

  },[name])

  return country
}