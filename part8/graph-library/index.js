import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { graphql, GraphQLError, isConstValueNode } from 'graphql'
import { v4 as UUIDv4 } from 'uuid'



let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conección con el libro
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = `

  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
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
      published: Int!
      author: String!
      id: ID
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`



const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      if(args){
        let toReturn = [ ...books ]
        if('author' in args){
            const authorFilter = toReturn.filter(b => {
              if(b.author === args.author){
                return b
              }
            })
            toReturn = authorFilter
        }
        if('genre' in args){
          console.log('genre was in args: ', args.genre)
          toReturn = toReturn.filter(b => b.genres.includes(args.genre))
          console.log('toReturn step three: ', toReturn)
        }
       return toReturn
      } else {
        console.log('no args')
        return books
      }
    },
    allAuthors: () => {
      const proccessedAuthors = authors.map(a => {
      const filteredBooks = books.filter(b => b.author === a.name)
        return {...a, bookCount: filteredBooks.length}
      })
      console.log('proccessed authors: ', proccessedAuthors)
      return proccessedAuthors
    } 
  },
  Mutation: {
    addBook: (root, args) => {
      if(books.find(b => {
        return b.title === args.title
      })){
        throw new GraphQLError('Book must be unique', {
          invalidArgs: args.name,
        })
      }
      const book = {...args, id: UUIDv4()}
      books = books.concat(book)
      return book
    },
    editAuthor: (root, args) => {
      console.log('args: ', args)
      let toReturn = {}
      if(args.setBornTo){
        const chosenAuthor = authors.filter(a => a.name === args.name)
        toReturn = { ...chosenAuthor[0], born: args.setBornTo}
        authors = authors.map(a => a.name === args.name ? toReturn : a)
      }
      return toReturn
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

 const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => ({listen: { port: 4000 }})
})

console.log('server started at localhost:4000')