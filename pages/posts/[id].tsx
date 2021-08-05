import Layout from '../../components/layout'
import Head from 'next/head'
import { getAllPostIds, getPostData } from '../../lib/getArticle'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'

export default function Post({ postData }) {
  const router = useRouter();
  
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  // Render post...
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

export const getStaticPaths: GetStaticPaths = async () => {
  // eslint-disable-next-line no-undef
  // console.log('getStaticPaths context: ', context);
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: true
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  // console.log('getStaticProps context: ', context)
  const postData = await getPostData(context.params.id as string);


  if(!postData?.id){
    return {
      revalidate: 20,
      // redirect: {
      //   destination: '/post404',
      //   permanent: false,
      // },
  
      notFound: true,
    }
  }
  return {
    props: {
      postData
    },
    revalidate: 20
  }
};