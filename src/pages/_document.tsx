import React from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          
          {/* Primary Meta Tags */}
          <meta name="title" content="One Minute Grace - Daily Christian Inspiration & Bible Verses" />
          <meta name="keywords" content="Christian, Jesus Christ, Bible verse, daily devotional, scripture, gospel, faith, prayer, worship, Holy Spirit, God's word, biblical teaching, spiritual growth, Christianity" />
          <meta name="author" content="One Minute Grace Ministry" />
          
          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="One Minute Grace" />
          
          {/* Twitter */}
          <meta property="twitter:card" content="summary_large_image" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument; 