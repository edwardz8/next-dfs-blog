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
       <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Welcome to Next Daily Fantasy Sports. We are a blog featuring articles on fantasy football and software development.</p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>New Articles</h2>

        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title, thumbnail }) => (
            <Link href="/posts/[id]" as={`/posts/${id}`}>
            <li className={utilStyles.listItem} key={id}>
               <img src={thumbnail} className={utilStyles.listImg} />
               <div>
                  <a>{title}</a>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
               </div>
            </li>
            </Link>
          ))}
        </ul>

      </section>
    </Layout>
  )
}
