import React, { FC } from 'react'

interface BlogCardProps {
  imgUrl: string
  title: string
}

const BlogCard:FC<BlogCardProps> = ( {imgUrl, title }) => {
  return (
    <div className={`w-full sm:max-w-[375px] overflow-hidden`}>
      <div className='rounded-[4px] overflow-hidden mb-4'>
        <img src={imgUrl} className='w-full h-full max-h-[210px] rounded-[4px] object-cover hover:scale-105 transition-all duration-300' />
      </div>
      <h4 className='text-[20px] font-medium pr-4'>
        {title}
      </h4>
    </div>
  )
}

const index = () => {
  return (
    <div className='py-8 px-6 md:px-0 w-full md:w-[90%] lg:w-[85%] 2xl:w-[55%] mx-auto'>
      <div className='w-full md:w-[80%] lg:w-[70%] 2xl:w-[55%] mb-8'>
        <h2 className='text-[44px] font-bold mb-2'>The Reh-A Blog</h2>
        <p className='text-[24px] font-extralight'>Get tips and advice on delivering exceptional customer service, engaging and delighting your customers, and building a customer-centric company.</p>
      </div>
      <div className='mb-8'>
      <h3 className='text-[32px] font-bold mb-2'>Most Recent Posts</h3>
      <div className='h-[1px] bg-[#ccc] w-full mb-8' />
        <div className='grid grid-rows-3 sm:grid-rows-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 '>
          <div className='sm:row-span-2 sm:col-span-2'>
            <div className={`w-full overflow-hidden`}>
              <div className='rounded-[4px] overflow-hidden mb-4'>
                <img src='/bg-hero-1.png' className='w-full rounded-[4px] object-cover hover:scale-105 transition-all duration-300' />
              </div>
              <h4 className='text-[20px] font-medium pr-4'>
              Want to Reduce Support Volume? Follow These 5 Steps
              </h4>
            </div>
          </div>
          <div>
          <BlogCard imgUrl='/bg-hero-1.png' title='Want to Reduce Support Volume? Follow These 5 Steps' />
          </div>
          <div>
          <BlogCard imgUrl='/bg-hero-1.png' title='Want to Reduce Support Volume? Follow These 5 Steps' />
          </div>
        </div>
      </div>

      <h3 className='text-[32px] font-bold mb-2'>All Posts</h3>
      <div className='h-[1px] bg-[#ccc] w-full mb-8' />
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 justify-center sm:justify-start'>
        <BlogCard imgUrl='/bg-hero-1.png' title='Want to Reduce Support Volume? Follow These 5 Steps' />
        <BlogCard imgUrl='/bg-hero-1.png' title='Want to Reduce Support Volume? Follow These 5 Steps' />
        <BlogCard imgUrl='/bg-hero-1.png' title='Want to Reduce Support Volume? Follow These 5 Steps' />
        <BlogCard imgUrl='/bg-hero-1.png' title='Want to Reduce Support Volume? Follow These 5 Steps' />
        
      </div>
    </div>
  )
}

export default index