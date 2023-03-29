import BlogsNav from 'components/general/Blogs/BlogsNav/BlogsNav'
import Footer from 'components/general/Footer/Footer'
import React from 'react'

function BlogsLayout(props: any) {
  return (
    <>
        <BlogsNav />
        {props.children}
        <Footer /> 
    </>
  )
}

export default BlogsLayout
