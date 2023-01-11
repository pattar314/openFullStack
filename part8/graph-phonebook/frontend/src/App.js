
import { gql, useQuery } from '@apollo/client';
import './App.css';
import Persons from './components/Persons'

const App = () => {

  
  const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
  `





  const result = useQuery(ALL_PERSONS)

  if(result.loading){
    return <div>loading...</div>
  }


  return (
    <div className="App">
      <Persons persons={result.data.allPersons} />
    </div>
  );
}

export default App;
