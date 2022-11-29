import React from 'react'
import { Link } from 'react-router-dom'


const Blog = ({ blog }) => {

  //const [expanded, setExpanded] = useState(false)

  // const showBlog = { display: (expanded ? '' : 'none') }
  //const expandedStyles = ( expanded ? 'expandedTop' : 'block'  )



  /*
  const deleteButton = () => (
    <button onClick={() => deleteBlog(blog.id)}>delete</button>
  )
 */

  return(
    <>
      <div className='blog-wrapper'>
        <div className={'blog-content'}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} - {blog.author}
          </Link>
        </div>
        {/*  <div className="expandedBottom" style={showBlog}>
          <b>URL: </b><div className="url">{blog.url}</div>
          <div className="likes"><b>Likes: </b><span className='like-counter'>{blog.likes} </span> <button id='like-button' onClick={() => addLike(blog) }>Like</button></div>
        </div> */}
      </div>
    </>
  )
}

export default Blog