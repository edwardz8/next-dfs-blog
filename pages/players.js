import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPlayersData } from '../lib/players'

export async function getStaticProps() {
  const allPlayersData = getSortedPlayersData()
    return {
      props: {
        allPlayersData
      }
    }
}

export default function Players({ allPlayersData }) {
  return (
    <Layout>
       <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Player Profiles</h2>

        <div className={utilStyles.playerList}>
          {allPlayersData.map(({ id, thumbnail, name, preview }) => (
            <Link href="/players/[id]" as={`/players/${id}`}>
            <div className={utilStyles.playerItem} key={id}>
               <img src={thumbnail} className={utilStyles.listImg} />
               <div>
                  <a>{name}</a>
                  <p>{preview}</p>
              <br />
               </div>
            </div>
            </Link>
          ))}
        </div>

      </section>
    </Layout>
  )
}