import { getAllPostIds, getPostData } from "@/lib/post";
import Layout from "../../components/Layout";
import utilStyles from "../../styles/utils.module.css";
import Head from "next/head";

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
}

export default function Post({ postData }) {
  return (
    <div>
      <Layout>
        <Head>
          <title>
            {postData.title}
          </title>
        </Head>
        <article>
          <h1 className={utilStyles.headingX1}>{postData.title}</h1>
          <div className={utilStyles.lightText}>{postData.date}</div>
          <div dangerouslySetInnerHTML={{ __html: postData.blogContentHTML }}/>
        </article>
      </Layout>
    </div>
  );
}
