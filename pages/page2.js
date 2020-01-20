import react, { useState, useEffect } from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import Head from 'next/head';

const Index = ({ ssr }) => {
  const [type,setType] = useState(0)
  return <div>
    <Head>
        <title>第二頁</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" type="text/css" href="/mycss.css" />
        <link rel="stylesheet" type="text/css" href="/mycss2.css" />
      </Head>
    <h1>你來到第二頁了</h1>
    <Link href="/" >
      <a>回上一頁</a>
    </Link>
    <button onClick={()=>setType(type+1)}>change</button>
    {
      type%3 === 0 ? <div>切至1</div>:''
    }
    {
      type%3 === 1 ? <div>切至2</div>:''
    }
    {
      type%3 === 2 ? <div>切至3</div>:''
    }
  </div>
}

Index.getInitialProps = async function () {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
  const data = await res.json();
  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    ssr: {
      list: data.map(entry => entry.show)
    }
  };
};

export default Index;