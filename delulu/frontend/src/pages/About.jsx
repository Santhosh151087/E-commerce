import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'
const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
      <Title text1={'ABOUT'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Delulu is an online fashion and lifestyle store created for people who love trendy, stylish, and affordable products. We focus on bringing modern designs, quality collections, and a smooth shopping experience to customers who want to express their personality through fashion.</p>
          <p>At Delulu, our goal is to make online shopping simple, reliable, and enjoyable with carefully selected products, secure payments, and fast delivery services.</p>

          <b className='text-gray-800'>Our Mission </b>
          <p>At Delulu, our mission is to make fashion accessible, affordable, and enjoyable for everyone. We aim to deliver high-quality products, modern styles, and a seamless shopping experience while building trust, satisfaction, and confidence in every customer.
</p>
          </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
           <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'> 
              <b>Quality Assurance:</b>
              <p className='text-gray-600'>At Delulu, quality is our priority. Every product is carefully selected and checked to ensure it meets our standards for style, durability, and comfort.We are committed to providing reliable products and maintaining customer satisfaction through consistent quality and trusted service.</p>
          </div>
           <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'> 
              <b>Convenience:</b>
              <p className='text-gray-600'>At Delulu, we believe shopping should be simple and stress-free. Our platform is designed to provide a smooth browsing experience, secure payments, easy ordering, and fast delivery so customers can shop anytime and anywhere with convenience and confidence.</p>
          </div>
           <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'> 
              <b>Exceptional Customer Service:</b>
              <p className='text-gray-600'>At Delulu, customer satisfaction is at the heart of everything we do. We are committed to providing friendly support, quick responses, and reliable assistance to ensure every customer enjoys a smooth and satisfying shopping experience.</p>
          </div>
      </div>
      <NewsLetterBox/>
    </div>
  )
}

export default About
