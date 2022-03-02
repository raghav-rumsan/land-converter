import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Converter from '../components/Converter'

const Home: NextPage = () => {

   function handleScroll() {
    window.scroll({
      top: document.body.offsetHeight,
      left: 0, 
      behavior: 'smooth',
    });
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Land Converter</title>
        <meta name="description" content="All in one nepali land converter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
        Nepali Land Converter
        </h1>
        <p className={styles.description}>
       all in one nepali land converter
        </p>
        <div className='scroll-down'>
          
           <Image className='scroll-button' onClick={handleScroll} src="/down-arrow.svg" alt="downarrow"  width={100} height={30} />
        </div>
      </main>

      <div>
        <Converter/>
      </div>

      <footer className={styles.footer}>
        <a
          href="https://raghavkattel.com.np/projects"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.logo}>
            View More Projects 
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
