import React from 'react'
import About from './about/page'
import Hero from '@/components/layout/Hero'
import Projects from './projects/page'
import Achievments from './achievments/page'
import Blogs from './blogs/page'
import Contact from '@/components/layout/ContactForm'
const page = () => {
  return (
   <>
   <Hero/>
   <About/>
      <Projects />
      <Achievments />
      <Blogs />
      <Contact/>
   
   </>
  )
}

export default page