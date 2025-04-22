import React from 'react'
import { useState,useEffect } from 'react'
import { getPosts } from '../api'
import BlogCard from '../components/BlogCard';

const Home = () => {
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        async function loadAllPosts(){
            const data = await getPosts();
            data.sort((d1, d2)=> new Date(d2.dateCreated).getTime() - new Date(d1.dateCreated).getTime())
            setPosts(data)
        }
        loadAllPosts();
    },[])
  return (
    <div className='posts'>
        {
            posts.map((post)=>{
                return(
                    <div>
                  <BlogCard post={post}/>
                </div>
                )
            })
        }
    </div>
  )
}

export default Home