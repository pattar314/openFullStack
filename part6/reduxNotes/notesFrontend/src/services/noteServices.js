import { useSelector } from "react-redux"

const getAll = () => {
  const notes = useSelector(state => state.notes)
  return notes
}