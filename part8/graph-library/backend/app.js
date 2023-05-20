const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')
const { v1: uuid } = require('uuid')
const Book = require('./services/schemas/Book')
const { GraphQLError } = require('graphql')
const Author = require('./services/schemas/Author')
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
        return await Book.find({genres: [args.genre]})
        }
      return await Book.find({})
      },
    allAuthors: async () => await Author.find({})
  },
  Mutation: {
    addBook: async (root, args) => {
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
    editBorn: async (root, args) => {
      const toModify = await Author.findOne({name: args.name})
      toModify.born = args.born
      try{
        await toModify.save()
      } catch(error){
          new GraphQLError('Edit author failed', {
            code: 'BAD_USER_INPUT',
            error
          })
        }
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
    if(auth && auth.startsWith('Bearer ')){
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id).populate('friends')
      return { currentUser }
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})