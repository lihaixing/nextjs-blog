import Layout from '../../components/layout'
import Head from 'next/head'
import { getAllPostIds, getPostData } from '../../lib/getArticle'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'


export default function Post({ postData }) {
  return <Layout>
    <Head>
      <title>{postData.title}</title>
    </Head>
    <article>
      <h1 className={utilStyles.headingXl}>{postData.title}</h1>
      <div className={utilStyles.lightText}>
        <Date dateString={postData.date} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
  </Layout>
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  // console.log('getStaticPaths context: ',context)
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: false
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  // console.log('getStaticProps context: ', context)
  const postData = await getPostData(context.params.id);
  return {
    props: {
      postData
    },
    // revalidate: 10
    // redirect: {
    //   destination: '/',
    //   permanent: false,
    // },

    // notFound: true,
  }
};