import { useQuery } from '@apollo/client';
import Persons from './components/Persons';
import { ALL_PERSONS } from './services/queries';



const App = () => {

  const result = useQuery(ALL_PERSONS)
  
  if(result.loading)
  return <h1>loading....</h1>
  console.log('result: ', result)


  return (
    <div className="App">
      <Persons persons={result.data.allPersons} />
    </div>
  );
}

export default App;
