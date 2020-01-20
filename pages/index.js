import react, { useState, useEffect } from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import Head from 'next/head';

const Index = ({ ssr }) => {
  const [list,setList] = useState(ssr.list)
  return <div>
    <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" type="text/css" href="/mycss.css" />
        <link rel="stylesheet" type="text/css" href="/mycss2.css" />
      </Head>
    <h1>Batman TV Shows</h1>
    <ul>
      {list.map(show => (
        <li key={show.id}>
          <Link href="/p/[id]" as={`/p/${show.id}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>
    <Link href="/page2" >
      <a>前往第二頁</a>
    </Link>
    <button onClick={()=>setList([])}>change</button>
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