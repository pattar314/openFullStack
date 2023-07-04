const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')
const { v1: uuid } = require('uuid')
const Book = require('./services/schemas/Book')
const { GraphQLError } = require('graphql')
const Author = require('./services/schemas/Author')
const User = require('./services/schemas/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()


mongoose.connect(process.env.MONGODB_URI)


const typeDefs = `


  type Author {
    name: String!
    born: Int
    id: ID!
  }

  type Book {
    title: String!
    author: String!
    published: Int
    id: ID!
    genres: [String!]!
  }
  
  
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type User {
    username: String!
    password: String
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int
      genres: [String!]!
    ): Book
    editBorn(
      name: String!
      born: Int!
    ): Author
    createUser(
      username: String!
      password: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments('Books') ,
    authorCount: async () => await Author.collection.countDocuments('Authors'),
    allBooks: async (root, args) => {
      if(args.author){
        return await Book.find({author: args.author})
      } 
      if (args.genre){
        return await Book.find({genres: { $all: [args.genre]}})
        }
      return await Book.find({})
      },
    allAuthors: async () => await Author.find({}),
    me: async (root, args, context) =>  {
      console.log('current user: ', context)
      if(context.currentUser){
        return context.currentUser
      }
      return null
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if(!context.currentUser){
        throw new GraphQLError('Not authenticated', {
          code: 'BAD_USER_INPUT'
        })
      }
      const newbook = new Book({...args})
      console.log('newbook: ', newbook)
      try {
        await newbook.save()
      } catch(error){
        new GraphQLError('Adding book failed', {
          code: 'BAD_USER_INPUT',
          error
        })
      }
      const newAuthor = new Author({name: args.author})
      try {
        await newAuthor.save()
      } catch(error){
        new GraphQLError('Adding author failed', {
          code: 'BAD_USER_INPUT',
          error
        })
      }
    },
    editBorn: async (root, args, context) => {
      if(!context.currentUser){
        throw new GraphQLError('Not authenticated', {
          code: 'BAD_USER_INPUT'
        })
      }
      const toModify = await Author.findOne({name: args.name})
      toModify.born = args.born
      try{
        await toModify.save()
      } catch(error){
          new GraphQLError('Edit author failed', {
            extensions: {
            code: 'BAD_USER_INPUT',
            error
          }
          })
        }
    },
    createUser: async (root, args, context) => {
      console.log('pass: ', args.password)
      const replacementPass =  await bcrypt.hash(args.password, 10)
      console.log('replacement: ', replacementPass)
      const newUser = new User({
        ...args,
        password: replacementPass
      })
      console.log('new user: ', newUser)
      try {
       return await newUser.save()
      } catch (error){
        throw new GraphQLError('Adding user failed', {
          extensions: {
            code: 'USER_ADD_FAILED',
            error
        }
        })
      }
    },
    login: async (root, args, context) => {
      const findUser = await User.findOne({username: args.username})   
      if(!findUser || bcrypt.compare(args.password, findUser.password, (err, result) => {
        if(err){
          console.log('there was an error: ', err)
        }
        return result
      })){
        throw new GraphQLError('Login failed', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      return { value: jwt.sign({username: findUser.username, id: findUser._id}, 'test')}
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({req, res}) => {
    const auth = req ? req.headers.authorization : null
    console.log('body: ', req.body)
    if(auth && auth.startsWith('Bearer ')){
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})