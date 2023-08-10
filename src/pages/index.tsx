import Head from "next/head";
import Link from "next/link";
import LandingBody from "~/components/Landing";

export default function Home() {
  return (
    <>
      <Head>
        <title>Way to Website</title>
        <meta name="description" content="Short Link, Memorize, Share" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LandingBody />
    </>
  );
}
