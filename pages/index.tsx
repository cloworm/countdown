import Head from 'next/head'
import React, { ReactElement } from 'react'

import Countdown from '../components/Countdown'

const Home = (): ReactElement => {
  return (
    <div>
      <Head>
        <title>Countdown</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Red+Hat+Text:wght@700&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <main className="relative flex flex-col items-center justify-center bg-theme_veryDarkMostlyBlackBlue min-h-screen bg-stars">
        <h1 className="text-white text-2xl text-center font-bold tracking-widest pb-32">
          WE&apos;RE LAUNCHING SOON
        </h1>

        <Countdown />

        <div className="absolute bottom-0 left-0 right -0">
          <img src="/images/pattern-hills.svg" />
        </div>
      </main>

      <footer>
      </footer>
    </div>
  )
}

export default Home
