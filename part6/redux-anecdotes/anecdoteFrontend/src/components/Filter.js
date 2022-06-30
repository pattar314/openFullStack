import { useDispatch } from "react-redux"
import { updateFilterText } from "../reducers/filterReducer"

const Filter = () => {

  const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch(updateFilterText(event.target.value.toLowerCase()))  
  }


  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter

// TODO make new action dispatchers
// TODO make new reducer