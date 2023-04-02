import { HomeContainer, Product } from './../styles/pages/home'
import Image from 'next/image'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import { stripe } from '../lib/stripe'
import { GetStaticProps } from 'next'
import Stripe from 'stripe'

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
              <span>{product.price}</span>
            </footer>
          </Product>
        )
      })}
    </HomeContainer>
  )
}

// export const getServerSideProps: GetServerSideProps = async () => {
// getStaticProps does not work on dev enviroment
// this will run only when we build the app in production to generate static pages in cache
export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    // we format the currency here, rather in the html for two reasons?
    // 1. The price doesnt change according to rendering
    // 2. The fomratter will execute only one time (when caching) rather than everytime when rendering the html
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      url: product.url,
      price: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price.unit_amount / 100),
    }
  })
  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
