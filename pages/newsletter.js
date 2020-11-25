import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import React, { useState } from "react";

export default function Newsletter() {
  const [ status, setStatus ] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null }
  })

  const [ inputs, setInputs ] = useState({
    email: '',
    message: ''
  })

  const handleResponse = (status, msg) => {
    if (status === 200) {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: msg }
      })
      setInputs({
        email: '',
        message: ''
      })
    } else {
      setStatus({
        info: { error: true, msg: msg }
      })
    }
  }

  const handleOnChange = e => {
    e.persist()
    setInputs(prev => ({
      ...prev,
      [e.target.id]: e.target.value 
    }))
    setStatus({
      submitted: false,
      submitting: false,
      info: { 
        error: false, msg: null 
       }
    })
  }

  const handleOnSubmit = async e => {
    e.preventDefault()
    setStatus(prevStatus => ({ ...prevStatus, submitting: true }))
    const res = await fetch('/api/newsletter', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputs)
    })
    const text = await res.text()
    handleResponse(res.status, text)
  }

  return (
    <Layout>
       <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Sign Up</h2>
      </section>

      <main>
        <form onSubmit={handleOnSubmit}>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" onChange={handleOnChange} required value={inputs.email} />

              <label htmlFor="message">Message</label>
              <textarea id="message" onChange={handleOnSubmit} required value={inputs.message} />

              <button type="submit" disabled={status.submitting}>
                {!status.submitting ? !status.submitted ? 'Submit' : 'Submitted' : 'Submitting...'}
              </button>
        </form>
        {status.info.error && (
          <div className="error">Error: {status.info.msg}</div>
        )}
        {!status.info.error && status.info.msg && (
          <div className="success">{status.info.msg}</div>
        )}
      </main>
    </Layout>
  )
}