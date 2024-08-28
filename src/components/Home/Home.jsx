import React from 'react'
import styles from "./Home.module.css"
import Feature from '../Feature/Feature'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import {Helmet} from "react-helmet";
export default function Home() {
  return (
    <>
    <MainSlider/>
    <CategorySlider/>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
    <Feature/>
    </>
  )
}
