import { Html, Head, Main, NextScript } from 'next/document'
import { getCssText } from '../styles'
//in Next everything is a component, incluind the html, add here only the code we want to be available in the whole project
//will be loaded in all pages of the app

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800&family=Roboto:wght@400;700&display=swap'
          rel='stylesheet'
        />
        <style
          id='stitches'
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      </Head>
      <body>
        {/* tell Next where the content must load */}
        <Main />
        {/* place to load the scripts in the app, always in the end of the <body> tag */}
        <NextScript />
      </body>
    </Html>
  )
}
