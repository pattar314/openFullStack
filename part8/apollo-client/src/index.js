import ReactDOM from 'react-dom/client'
import App from './App'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'


//TODO: modify this part when editing class from 
//  link: new HttpLink({
//  uri: 'http://localhost:4000'
//  to v


const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:4000'
})


ReactDOM.createRoot(document.getElementById('root')).render(
   <ApolloProvider client={client}><App /></ApolloProvider> 
)