import {createContext, useState} from 'react'



import React from 'react'
export const PostContext = createContext(null)

const Post = ({children}) => {
    const [postsDetails,setDetails] = useState(null)
  return (
    <PostContext.Provider  value={{postsDetails,setDetails}}>
        {children}
    </PostContext.Provider>

  )
}

export default Post

