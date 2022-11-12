const listHelper = require('../utilities/list_helper')
const blogs = require('../utilities/config').blogs
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/Blog')
const api = supertest(app)
const testDbData = require('../utilities/config').blogs
const mongoose = require('mongoose')


beforeAll( async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(testDbData)
})

const login = async (req, res, next) => {
  const testUser = {
    'username': 'pattar420',
    'password': '56171'
  }

  let loginAttempt = await api.post('/api/login').send(testUser)
  if (!(loginAttempt.status === 200)){
    console.log('login attempt failed')
  } else {
    console.log('login attempt: ', loginAttempt.body.token)
    return `Bearer ${loginAttempt.body.token}`
  }
  next()
}


describe('first section basic tests', () => {



  test('dummy returns one', () => {

    const result = listHelper.dummy()
    expect(result).toBe(1)
  })

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])

    expect(result).toBe(0)
  })

  test('when list only has one post the likes equal the likes of that post', () => {
    const result = listHelper.totalLikes([blogs[0]])

    expect(result).toBe(blogs[0].likes)
  })

  test('if a bigger list is calculated up', () => {
    const check = 36

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(check)
  })

  test('favorite blog is', async () => {
    const result = listHelper.favoriteBlog(blogs)
    const check = { 'author': 'Edsger W. Dijkstra', 'likes': 12, 'title': 'Canonical string reduction' }

    expect(result).toEqual(check)
  })
  /*
   test('most blogs are ', () => {
    const result = listHelper.mostBlogs(blogs)

    expect(result).toEqual('')
  }) */



}, 10000)

describe('api tests', () => {



  test('correct amount of blogs', async () => {
    const blogs = await api.get('/api/blogs')
    const count = blogs.body.length
    expect(count).toEqual(6)
  })

  test('id is correctly labeled', async () => {
    const blogs = await api.get('/api/blogs')
    const first = blogs.body[0]

    expect(first.id).toBeDefined()
  })

  test('POST operation completes successfully', async () => {
    let auth = await login()
    const count = (await api.get('/api/blogs').set({ 'Authorization': auth })).body.length

    const newBlog = {
      title: 'test',
      author: 'testy mctesterson',
      url: 'test.test',
      likes: 0,
      user: [
        { }
      ]
    }

    await api.post('/api/blogs').set({ 'Authorization': auth }).send(newBlog)


    const newBlogs = await api.get('/api/blogs')
    const length = newBlogs.body.length

    expect(length).toEqual(count + 1)
  })

  test('if new blog has no likes included it defaults to zero', async () => {
    let auth = await login()
    const newBlog = {
      title: 'test',
      author: 'testy mctesterson',
      url: 'test.test'
    }
    await api.post('/api/blogs').set({ 'Authorization': auth }).send(newBlog)
    const blogs = await api.get('/api/blogs')
    const length = blogs.body.length
    expect(blogs.body[length - 1].likes).toEqual(0)
  })

  test('if new blog is missing title or url properties a 400 status is returned', async () => {
    const newBlog = {
      author: 'testy mctesterson',
    }
    let auth = await login()
    const response = await api.post('/api/blogs').set({ 'Authorization': auth }).send(newBlog)

    expect(response.status).toEqual(400)
  })

  test('blog creation fails if no token or invalid token', async () => {
    const newBlog = {
      'title': 'squee the heroic sprout',
      'author': 'jubi dimbob',
      'url': 'test.tes',
      'likes': 0,
      'user': [
        '621c62eacf39373a04fe2d8b'
      ]
    }
    await login()
    const sendNewBlog = await api.post('/api/blogs').send(newBlog)
    expect(sendNewBlog.status).toEqual(401)

    const secondSend = await api.post('/api/blogs').send(newBlog).set({ 'Authorization': '87ohkljhgo9yoweirutho9ytfote89wyto8wyt7ytoy' })
    expect(secondSend.status).toEqual(401)
  })

  test('blog delete successfully', async () => {
    let auth = await login()
    const initialBlogs = await (await api.get('/api/blogs')).body

    await api.delete(`/api/blogs/${initialBlogs[0].id}`).set({ 'Authorization': auth })

    const modifiedBlogs = await (await api.get('/api/blogs')).body
    expect(modifiedBlogs.length).toEqual(initialBlogs.length -1)
    expect(modifiedBlogs).not.toContain('Go To Statement')

  })

})


afterAll( () => {
  mongoose.connection.close()
})
