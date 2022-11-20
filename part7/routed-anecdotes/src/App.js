import { useState } from 'react'
import { Link, redirect, Route, Routes, useMatch, useNavigate } from 'react-router-dom'
import { useField } from './hooks/customHooks'

const Menu = () => {

  return (
    <>
      <div className='menu-links'>
        <Link to='/'>anecdotes</Link>
        <Link to='/create'>create new</Link>
        <Link to='/about'>about</Link>
      </div>
      
    </>

  )
}

const AnecdoteList = (props) => {

  const processedAnecdotes = props.anecdotes.map(anecdote => <li key={anecdote.id} ><a href={`/anecdotes/${anecdote.id}`} >{anecdote.content}</a></li>) 

  return (
    <div>
      { props.newAnecdote ? <h4>A new anecdote: {props.newAnecdote} created</h4> : null }
      <h2>Anecdotes</h2>
      <ul>
        { processedAnecdotes }
      </ul>
    </div>
  )
}


const Anecdote = ({anecdotes}) => {
  
  const id = useMatch('/anecdotes/:id').params.id
  
  console.log('id: ', id)

  console.log('anecdotes: ', anecdotes)
  const stepOne = anecdotes.filter((a) => a.id === Number(id))[0]


  return (
    <div className='anecdote-wrapper'>
      <h2><b>{stepOne.content}</b></h2>
      has {stepOne.votes} votes
      <br />
      For more info see <a href={stepOne.info}>{stepOne.info}</a>
      <br />
    </div>
  )

}


const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(`new: ${content.properties.value}, ${author.properties.value}, ${info.properties.value}`)
    props.addNew({
      content: content.properties.value,
      author: author.properties.value,
      info: info.properties.value,
      votes: 0
    })
  }

  const resetForm = () => {
    content.reset()
    author.reset()
    info.reset()
  }


  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.properties} />
        </div>
        <div>
          author
          <input {...author.properties} />
        </div>
        <div>
          url for more info
          <input {...info.properties} />
        </div>
        <button>create</button>
        <button type='button' onClick={() => resetForm()}>reset</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])


  const [message, setMessage] = useState(false)
  const navigate = useNavigate()

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    navigate('/')
    setMessage(anecdote.content)
    setTimeout(() => {
      setMessage(false)
    }, 5000)
    
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {message !== false ? <h4> A new anecdote : {message} has been created </h4>: null}
      <Routes>
        <Route path='/create' element={<CreateNew addNew={addNew} />} />
        <Route path='/about' element={<About />} />
        <Route path='/anecdotes/:id' element={ <Anecdote anecdotes={anecdotes} /> } />
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App








