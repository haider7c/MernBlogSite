import React from 'react'
import { useState } from 'react'
import { createPost } from '../api';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  async function handleSubmit(){
    let submitObject = {
      title: title,
      description: description,
      content:content,
      author: null,
      dateCreated: new Date()
    }
    await createPost(submitObject);
  }
  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="">Blog Post Title:</label>
      <input type="text" name='title' maxLength={100} required onChange={(e)=>{setTitle(e.target.value)}}/>
      <label htmlFor="">Blog Description:</label>
      <input type="text" name='description' maxLength={200} required onChange={(e)=>{setDescription(e.target.value)}}/>
      <label htmlFor="">Blog Content:</label>
      <textarea type="text" name='content'maxLength={5000} required onChange={(e)=>{setContent(e.target.value)}}/>
      <button type='submit'>Submit</button>
    </form>
  )
}

export default CreateBlog