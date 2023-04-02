import { styled } from '../styles'
import { HomeContainer, Product } from './../styles/pages/home'
import { useKeenSlider } from 'keen-slider/react'
import Image from 'next/image'

import shirt1 from '../assets/shirts/1.png'
import shirt2 from '../assets/shirts/2.png'
import shirt3 from '../assets/shirts/3.png'
import shirt4 from '../assets/shirts/4.png'

import 'keen-slider/keen-slider.min.css'
import { stripe } from '../lib/stripe'
import { GetServerSideProps } from 'next'
import Stripe from 'stripe'
import { Products } from './../../node_modules/stripe/esm/resources/Products'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    url: string
    price: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })
  return (
    <HomeContainer ref={sliderRef} className='keen-slider'>
      {/* <pre>{JSON.stringify(products)}</pre> */}
      {products.map((product) => {
        return (
          <Product key={product.id} className='keen-slider__slide'>
            <Image src={product.imageUrl} alt='' width={520} height={480} />
            <footer>
              <strong>{product.name}</strong>
              <span>US$ {product.price}</span>
            </footer>
          </Product>
        )
      })}
    </HomeContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })
  console.log('Aqui--->', response.data)
  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      url: product.url,
      price: price.unit_amount / 100,
    }
  })
  return {
    props: {
      products,
    },
  }
}
