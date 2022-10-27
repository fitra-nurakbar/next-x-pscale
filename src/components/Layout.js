import Head from "next/head";
import React from "react";

export default function Layout({ children, title }) {
  const pageTitle = `${title} | NextJS X Pscale`;

  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </div>
  );
}
