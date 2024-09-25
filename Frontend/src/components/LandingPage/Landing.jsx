import React from 'react'
import Nav from './Nav'
import Hero from './Hero'
import Cta from './Cta'
import Footer from './Footer'
import Cards from './Cards'
import './landing.css'

const Landing = () => {
    return (
        <div>
            <Nav />
            <Hero/>
            <Cta/>
            <Cards/>
            <Footer/>
        </div>
    )
}

export default Landing