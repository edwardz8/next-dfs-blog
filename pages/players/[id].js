import Layout from '../../components/layout'
import Head from 'next/head'
import { getAllPlayerIds, getPlayerData } from '../../lib/players'
import utilStyles from '../../styles/utils.module.css'

export default function Player({ playerData }) {
    return (
        <Layout>
            <Head>
             <title>{playerData.title}</title>
            </Head>
            <article className={utilStyles.profile_card}>
            <div className={utilStyles.playerFlex}>
                <img src={playerData.thumbnail} className={utilStyles.listImg} />
                <div>
                <h1 className={utilStyles.headingXL}>{playerData.name}</h1>
                <p className={utilStyles.lightText}>{playerData.profile}</p>
                <p>{playerData.position}</p>
                <p>Price: {playerData.salary}</p>
                </div>
                {/* <Date dateString={playerData.date} /> */}
            </div>
            </article>
        
            <div dangerouslySetInnerHTML={{ __html: playerData.contentHtml }} />
        </Layout>
    )
}

export async function getStaticPaths() {
    // Returns a list of possible values for id
    // array of possible values for `id` must be value of the `paths` key of the returned object
    const paths = getAllPlayerIds()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    // fetch necessary data for the blog post using params.id
    const playerData = await getPlayerData(params.id)
    return {
        props: {
            playerData
        }
    }
}
