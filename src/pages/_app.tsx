import { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import logoImg from '../assets/logo.svg'
import { Container, Header } from './../styles/pages/app'
import Image from 'next/image'

globalStyles()

//works as a wrapper for the app pages - all pages will be loaded here as a component.
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoImg} alt='' />
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}
