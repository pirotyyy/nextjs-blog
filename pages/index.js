import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import Layout, { siteTitle } from "@/components/Layout";
import utilStyles from "../styles/utils.module.css";
import { getPostsData } from "../lib/post";

//SSGの場合
//getStaticPropsはHTMLのひな型に加え、外部のデータをプリレンダリングに用いるためのもの
export async function getStaticProps() {
  const allPostsData = getPostsData(); // id, title, date, thumbnail
  console.log(allPostsData);

  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>
          {siteTitle}
        </title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>私は情報系大学生です</p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>📝Pirotyのブログ・ポートフォリオ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`} legacyBehavior>
                <img
                  src={thumbnail}
                  className={styles.thumbnailImage}
                />
              </Link>
              <Link href={`/posts/${id}`} legacyBehavior>
                <a className={utilStyles.boldText}>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>{date}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
