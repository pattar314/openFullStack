import axios from "axios"
import { useEffect, useState } from "react"

 


 export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect( () => {
    const grabCountry = async () => {
      const request = await axios.get(`http://restcountries.com/v3.1/name/${country}/fullText=true`)
      console.log('request: ', request)
    }
    grabCountry(name)
    

  },[name])

  return country
}