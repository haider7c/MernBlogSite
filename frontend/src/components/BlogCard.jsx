import React from 'react'
import { Link } from 'react-router-dom'

const BlogCard = ({post}) => {
    let date = new Date(post.dateCreated)
    let stringDate = date.toString()
  return (
    <Link to={`/readblog/${post._id}`} className='post'> 
     <h1>{post.title}</h1>
    <h2>{post.description}</h2>
    <p>{stringDate.slice(4,15)}</p>
    </Link>
  )
}

export default BlogCard