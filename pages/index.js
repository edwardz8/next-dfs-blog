import Head from 'next/head'
import Link from 'next/link'
import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
    return {
      props: {
        allPostsData
      }
    }
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <div className={utilStyles.flex}>
        <Link href="/players">
        <button className="button button5">Player Profiles</button>
        </Link>
        <Link href="/newsletter">
        <button className="button button5">Newsletter</button>
        </Link>
      </div>
       <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Welcome to rosterbox, the next exciting thing in betting and daily fantasy sports.</p>
         <p>We feature player profiles and articles on your favorite teams.</p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>New Articles</h2>

        <div className={utilStyles.list}>
          {allPostsData.map(({ id, date, title, thumbnail }) => (
            <Link href="/posts/[id]" as={`/posts/${id}`}>
            <div className={utilStyles.listItem} key={id}>
               <img src={thumbnail} className={utilStyles.listImg} />
               <div>
                  <a>{title}</a>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
               </div>
            </div>
            </Link>
          ))}
        </div>

      </section>
    </Layout>
  )
}
