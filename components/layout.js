import styles from './layout.module.css'
import Head from 'next/head'
import Link from 'next/link'
import utilStyles from '../styles/utils.module.css'

const name = 'rosterbox'
export const siteTitle = 'rosterbox daily fantasy sports and betting'
export const description = 'rosterbox daily fantasy sports and betting and player profiles. tech articles with a sports focus.'

export default function Layout({ children, home }) {
return (
    <div className={styles.container}>
        <Head>
            <link rel="icon" href="../public/box-icon.svg" />
            <meta name="og:description" content={description} />
            <meta name="og:title" content={siteTitle} />
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-Y110STSVX9"></script>
            <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-Y110STSVX9', {
                      page_path: window.location.pathname,
                    });
                  `,
                }}
              />
        </Head>
        <header className={styles.header}>
            {home ? (
                <>
                <img src="/box-icon.svg"
                     className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`} alt={name}
                />
                <h1 className={utilStyles.heading2XL}>{name}</h1>
                </>
            ) : (
                <>
                <Link href="/">
                    <a>
                        <img src="/box-icon.svg" className={`${styles.headerImage} ${utilStyles.borderCircle}`} alt={name} />
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