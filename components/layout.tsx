import React from 'react'
import Head from 'next/head'

export default function Layout({ children } : { children: React.ReactNode }) {
  return (
    <div>
      <Head>
      </Head>
      <main>
        {children}
      </main>
    </div>
  )
}
