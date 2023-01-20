
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { GraphQLError } from 'graphql'
import mongoose from 'mongoose'
import { v1 as uuid } from 'uuid'
import Person from './services/schemas/Person'

const MONGODB_URI = process.env.MOGODB_URI

mongoose.connect(MONGODB_URI).then(() => {
  console.log('connected to mongodb')
}).catch((error) => {
  console.log('error connection to mongodb: ', error.message)
})

let persons = [
  {
    name: "Arto Hellas",
    phone: "040-123543",
    street: "Tapiolankatu 5 A",
    city: "Espoo",
    id: "3d594650-3436-11e9-bc57-8b80ba54c431"
  },
  {
    name: "Matti Luukkainen",
    phone: "040-432342",
    street: "Malminkaari 10 A",
    city: "Helsinki",
    id: '3d599470-3436-11e9-bc57-8b80ba54c431'
  },
  {
    name: "Venla Ruuska",
    street: "Nallemäentie 22 C",
    city: "Helsinki",
    id: '3d599471-3436-11e9-bc57-8b80ba54c431'
  },
]

mongoose.connect(process.env.MOGODB_URI).then(() => {
    console.log('connected to mongodb')
  }).catch((error) => {
    console.log('error connection to mongodb: ', error.message)
  })

const typeDefs = ` 
  enum YesNo {
    YES
    NO
  }
  
  type Address {
    street: String!,
    city: String!
  }


  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
  }

  type Mutation {
    addPerson(
      name: String!
      street: String!
      city: String!
      phone: String
    ): Person
    editNumber(
      name: String!
      phone: String!
    ): Person
  }
 

`

const resolvers = {
  Query: {
    personCount: async () => Person.collection.countDocuments(),
    allPersons: async (root, args) => {
      if(!args.phone){
        return Person.find({})
      }
      return Person.find({phone : { $exists: args.phone === 'YES'}})
      }},
    findPerson: async (root, args) => Person.findOne({name: args.name}),
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city
      }
    }
  },
  Mutation: {
    addPerson: (root, args) => {
      const person = new Person({ ...args })
      return person.save()
    },
    editNumber: async (root, args) => {
      const person = Person.findOne({name: args.name})
      person.phone = args.phone
      return person.save()
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

// TODO: This is a update for the class that it needs standalone server
const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => ({listen: { port: 4000 }})
})

console.log(`Server ready at ${url}`)