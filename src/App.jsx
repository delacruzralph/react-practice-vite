import { useState, useEffect } from 'react'
import React from 'react';
import './App.css'
import bg from './assets/zorobg.png'
import bg2 from './assets/bg.jpg'
import charimg from './assets/zoro.png'
import charimg2 from './assets/lufy.png'
import { bgPaths } from './images.jsx'

import { motion as m, AnimatePresence } from 'framer-motion'

import luffybg0 from "./assets/luffy/bg/bg0.jpg"
import luffybg1 from "./assets/luffy/bg/bg1.jpg"

import luffypic0 from "./assets/luffy/pic/pic0.png"
import luffypic1 from "./assets/luffy/pic/pic1.png"

import zorobg0 from "./assets/zoro/bg/bg1.jpg"
import zorobg1 from "./assets/zoro/bg/bg0.jpg"

import zoropic0 from "./assets/zoro/pic/pic0.png"
import zoropic1 from "./assets/zoro/pic/pic1.png"

// button to tweet quote
// button to reroll quote
function MyButton({ onNewQuoteClick }) {
  return (
    <button id="new-quote" onClick={onNewQuoteClick}>
      New Quote
    </button>
  );
}

function TweetButton({ quote, author }) {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    quote + " - " + author
  )}`;

  const handleClick = () => {
    window.open(tweetUrl);
  };

  return <a href="" onClick={handleClick} id="tweet-quote">Tweet Quote</a>;
}

function Background({ bg }) {
  // quote => image, & color 
  return (
    <>
      <div className="bg-mid" style={{
        backgroundImage: `url(${bg})`
      }}></div>
    </>
  )
}

function Card() {
  // quote => quote, author, color
  return (
    <div>
      <p>Hello</p>
    </div>
  )
}

const MainImage = React.memo(({ mainimg, animateKey }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <>
    {isMounted && (
      <AnimatePresence key={animateKey}>
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <img className="char-img" src={mainimg}></img>
        </m.div>
      </AnimatePresence>
    )}
  </>
  );
});

function App() {

  const listOfCharQuotes = [
    {
      id: "luffy0",
      author: "Monkey D. Luffy",
      charImage: luffypic0, // randomly select pic based on author
      color: "#891515",
      quote: "I’ve set myself to become the King of the Pirates… and if I die trying… then at least I tried",
      bgImage: luffybg0 // randomly select pic based on quote
    },
    {
      id: "luffy1",
      author: "Monkey D. Luffy",
      charImage: luffypic1,
      color: "#891515",
      quote: "If I give up now, I'll regret it forever",
      bgImage: luffybg1
    },
    {
      id: "zoro0",
      author: "Roronoa Zoro",
      charImage: zoropic0,
      color: "green",
      quote: "When the world shoves you around, you just gotta stand up and shove back. It’s not like somebody’s gonna save you if you start babbling excuses.",
      bgImage: zorobg0
    },
    {
      id: "zoro1",
      author: "Roronoa Zoro",
      charImage: zoropic1,
      color: "green",
      quote: "Hmph. Aren't titles useless when it comes to fighting? The stronger one wins, that’s all.",
      bgImage: zorobg1
    }
  ]


  // state: list of quotes
  // state: {quote, author, id} color??? author object w color + pics/media?
  // BAD PRACTICE: Directly put the image files inside the object 
  // FIX: Put src in place of the image object => bg: require("../assets/image.jpg")
  // Another FIX: Put all images in separate file and import to this component. Perhaps multiple imageList(s) => const images = [img1, img2, img3]

  const [quote, setQuote] = useState("Nothing happened.");
  const [author, setAuthor] = useState("Roronoa Zoro");
  const [bgImg, setBgImg] = useState(bg);
  const [charImg, setCharImg] = useState(charimg);

  const [animateMainImage, setAnimateMainImage] = useState(false);

  useEffect(() => {
    // Trigger the animation after 3 seconds
    const timeout = setTimeout(() => {
      setAnimateMainImage(true);
    }, 3000);

    // Clear the timeout on unmount
    return () => clearTimeout(timeout);
  }, []);


  function setColor(color) {
    console.log(`Updating --color-main to: ${color}`);
    document.documentElement.style.setProperty('--color-main', color);
    document.body.style.backgroundColor = color;
  }

  function handleNewQuoteClick() {
    // remove current selected charQuote
    let randomNumber = Math.floor(Math.random() * 4);
    setQuote(listOfCharQuotes[randomNumber]['quote']);
    setAuthor(listOfCharQuotes[randomNumber]['author']);
    setBgImg(listOfCharQuotes[randomNumber]['bgImage']);
    setCharImg(listOfCharQuotes[randomNumber]['charImage']);

    setColor(listOfCharQuotes[randomNumber]['color']);
    setAnimateMainImage(listOfCharQuotes[randomNumber]['id']);
  }

  return (
    <div className="App">
      <Background bg={bgImg} />
      <div className='card' id='quote-box'>
        <h2>{quote}</h2>
        <p id="author">{author}</p>
        <br />
        <MyButton id="new-quote" onNewQuoteClick={() => handleNewQuoteClick()} />
        <TweetButton quote={quote} author={author} />
      </div>
      <MainImage mainimg={charImg} animateKey={animateMainImage} />

      <div className="TEST_THINGS_HERE">
        {/* {BgPics.map((media) => (
        <img
          src={bgPaths[media]}
          alt="Dynamic Images"
          height={150}
          width={150}
          key={media}
          style={{ margin: 10 }}
        />
      ))} */}
      </div>
    </div>
  )
}

export default App
