import styles from './layout.module.css'
import Head from 'next/head'
import Link from 'next/link'
import utilStyles from '../styles/utils.module.css'

const name = 'rosterbox'
export const siteTitle = 'rosterbox fantasy sports app'

export default function Layout({ children, home }) {
return (
    <div className={styles.container}>
        <Head>
            <link rel="icon" href="../public/football_light_icon.svg" />
            <meta name="description" content="rosterbox fantasy sports app" />
            <meta name="og:title" content={siteTitle} />
        </Head>
        <header className={styles.header}>
            {home ? (
                <>
                <img src="/football_dark_icon.svg"
                     className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`} alt={name}
                />
                <h1 className={utilStyles.heading2XL}>{name}</h1>
                </>
            ) : (
                <>
                <Link href="/">
                    <a>
                        <img src="/football_dark_icon.svg" className={`${styles.headerImage} ${utilStyles.borderCircle}`} alt={name} />
                    </a>
                </Link>
                <h2 className={utilStyles.headingLg}>
                    <Link href="/">
                        <a className={utilStyles.colorInherit}>{name}</a>
                    </Link>
                </h2>
                </>
            )}
        </header>

            <main>{children}</main>
            {!home && (
                <div className={styles.backToHome}>
                <Link href="/">
                    <a>← Back to home</a>
                </Link>
                </div>
            )}
    </div>
)
}