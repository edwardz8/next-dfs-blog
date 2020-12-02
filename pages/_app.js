import '../styles/global.css'
import React from 'react'
import { useRouter, useEffect } from 'next/router'
import * as gtag from '../lib/gtag'

export default function App({ Component, pageProps }) {
    const router = useRouter()
    useEffect(() => {
        const handleRouteChange = () => {
            gtag.pageview(url)
        }
        router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router.events])
    return <Component {...pageProps} />
}