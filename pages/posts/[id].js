import Layout from '../../components/layout'
import Head from 'next/head'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
             <title>{postData.title}</title>
            </Head>
            <article>
            <h1 className={utilStyles.headingXL}>{postData.title}</h1>
            <div className={utilStyles.lightText}>
                <Date dateString={postData.date} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        
        </Layout>
    )
}

export async function getStaticPaths() {
    // Returns a list of possible values for id
    // array of possible values for `id` must be value of the `paths` key of the returned object
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    // fetch necessary data for the blog post using pararms.id
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}
