import React from 'react'
import Footer from '../Footer/Footer'
import BlogsNav from './BlogsNav/BlogsNav'

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
