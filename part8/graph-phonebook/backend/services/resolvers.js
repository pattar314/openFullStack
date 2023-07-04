
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Person = require('./models/Person')
const bcrypt = require('bcrypt')
const UserModel = require('./models/User')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    personCount: () => Person.collection.countDocuments(),
    allPersons: async (root, args) => {
      if(!args.phone){
        return Person.find({}).populate('friendOf')
      }
      return Person.find({phone: {$exists: args.phone === 'YES'}}).populate('friendOf')
      },
   findPerson: async (root, args) => Person.findOne({name: args.name}),
       me: ( root, args, context) => {
      return context.currentUser
    }
    },
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city
      }
    },
    friendOf: async (root) => {
      const friends = await User.find({
        friends: {
          $in: [root._id]
        }
      })
      return friends
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
        currentUser.friends = currentUser.friends.concat(newPerson)
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

      pubsub.publish('PERSON_ADDED', {personAdded: person})

      return newPerson
      
    },
    editNumber: async (root, args) => {
      const toUpdate = await Person.findOne({name: args.name})
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
      args.password = await bcrypt.hash(args.password, 10)
      const user = new UserModel({ ...args })
      const savedUser = await user.save().catch(error => {
        throw new GraphQLError('Creating user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }  
        })
      })
      return savedUser.password
    },
    login: async (root, args) => {
      const user = await UserModel.findOne({username: args.username})
      if ( !user || !bcrypt.compare(args.password, user.password)){
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

      const toReturn = { value: jwt.sign(userForToken, process.env.JWT_SECRET)}

      return toReturn
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
  },
    Subscription: {
      personAdded: {
        subscribe: () => pubsub.asyncIterator('PERSON_ADDED')
      }
    }
}

module.exports = resolvers