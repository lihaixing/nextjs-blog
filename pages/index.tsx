import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getList } from '../lib/getArticle'
import Date from '../components/date'
export default function Home({ allPostsData }) {
  // console.log('allPostsData', allPostsData)
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>前端工程师</p>
        <p>
          <Link href="#">简历还没写</Link>
        </p>
        <h2 className={utilStyles.headingLg}>文章</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => {
            return <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          })}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = await getList();
  return {
    props: {
      allPostsData
    },
    // revalidate: 10
  }
}