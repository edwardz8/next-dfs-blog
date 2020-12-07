import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import React from "react";
import axios from 'axios'
import fileDownload from 'js-file-download'

// npm i js-file-download

export default function Download() {
   const handleDownload = (url, filename) => {
        axios.get(url, {
          method: 'GET',
          responseType: 'blob',
        })
        .then((res) => {
          fileDownload(res.data, filename)
        })
}

return (
    <Layout>
       <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Thank you for downloading the rosterbox editable fantasy hockey cheatsheet!</h2>
      </section>

      <main style={{display: 'none'}}>
       <button onClick={handleDownload('https://rosterbox.netlify.com/vue-typescript.pdf', 'vue-typescript.pdf')} 
        className="button button5">Download Rankings
        </button>
      </main>
    </Layout>
  )
}