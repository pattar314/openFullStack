const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { graphql, GraphQLError } = require('graphql')
const { v1: uuid } = require('uuid')
const Person = require('./services/schemas/Person')
const { default: mongoose } = require('mongoose')
require('dotenv').config() 

const MONGODB_URI = process.env.MONGODB_URI 

mongoose.connect(MONGODB_URI).then(() =>
  console.log('connected to mongodb')
).catch((error) => {
  console.log('there was an error connecting to mongodb: ', error)
})

const typeDefs = `

  type User {
    username: String
    friends: [Person!]!
    id: ID!
  }

  type Token {
    value: String!
  }

  enum YesNo {
    YES
    NO
  }


  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  type Address {
    street: String!
    city: String!
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
    me: User
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
      ): Person
    editNumber(
      name: String!
      phone: String!
      ): Person
    createUser(
      username: String!
      password: String!
      ): Token
      addAsFriend(
        name: String!
      ): User
    }
    
    `
    
const resolvers = {
  Query: {
    personCount: () => Person.collection.countDocuments(),
    allPersons: async (root, args) => {
      if(!args.phone){
        return Person.find({})
      }
      return Person.find({phone: {$exists: args.phone === 'YES'}})
      },
   findPerson: async (root, args) => Person.findOne({name: args.name})
    },
    me: ( root, args, context) => {
      return context.currentUser
    },
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city
      }
    }
  },
  Mutation: {
    addPerson: async (root, args, context) => {
      const newPerson = new Person({...args})
      const currentUser = context.currentUser

      if(!currentUser){
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      try {
        await newPerson.save()
        currentUser.friends = currentUser.friends.concat(person)
        await currentUser.save()
      } catch(error){
        throw new GraphQLError('Saving person failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      
    },
    editNumber: async (root, args) => {
      const toUpdate = Person.findOne({name: args.name})
      toUpdate.phone = args.phone   
      try {
        toUpdate.save()
      } catch (error) {
        throw new GraphQLError('Saving number failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      
      return toUpdate
    },
    createUser: async (root, args) => {
      const user = new user({ username: args.username})

      return user.save().catch(error => {
        throw new GraphQLError('Creating user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }  
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({username: args.username})

      if ( !user || args.password !== 'secret'){
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET)}
    },
    addAsFriend: async (root, args, { currentUser }) => {
      const isFriend = (person) => currentUser.friends.map(f => f._id.toString()).includes(person._id.toString())
      if(!currentUser){
        throw new GraphQLError('wrong credentials', {
          extensions: {code: 'BAD_USER_INPUT'}
        })
      }
      
      const person = await Person.findOne({name: args.name})
      if ( !isFriend(person)){
        currentUser.friends = currentUser.friends.concat(person)
      }

      await currentUser.save()

      return currentUser
    }
  }
}

  const server = new ApolloServer({
    typeDefs,
    resolvers
  })
  
  startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.startsWith('Bearer ')){
        const decodedToken = jwt.verify(
          auth.substring(7), process.env.JWT_SECRET
        )
        const currentUser = await User.findById(decodedToken.id).populate(friends)
        return { currentUser }
      }
    }
  }).then(({url}) => {
    console.log(`Server ready at ${url}`)
  })