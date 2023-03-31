import { styled } from '../styles'
import { HomeContainer, Product } from './../styles/pages/home'

import Image from 'next/image'

import shirt1 from '../assets/shirts/1.png'
import shirt2 from '../assets/shirts/2.png'
import shirt3 from '../assets/shirts/3.png'

const Button = styled('button', {
  backgroundColor: '$green300',
  borderRadius: 4,
  border: 0,
  padding: '4px 8px',
  color: 'white',
  span: {
    fontWeight: 'bold',
  },
  '&:hover': {
    filter: 'brightness(0.8)',
  },
})

export default function Home() {
  return (
    <HomeContainer>
      <Product>
        <Image src={shirt1} alt='' width={520} height={480} />
        <footer>
          <strong>Shirt X</strong>
          <span>US$ 99.99</span>
        </footer>
      </Product>
      <Product>
        <Image src={shirt2} alt='' width={520} height={480} />
        <footer>
          <strong>Shirt X</strong>
          <span>US$ 99.99</span>
        </footer>
      </Product>
    </HomeContainer>
  )
}
