import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Stripe from 'stripe'
import { stripe } from '../../lib/stripe'
import Image from 'next/image'
import {
  ProductContainer,
  ImageContainer,
  ProductDetails,
} from './../../styles/pages/product'
import axios from 'axios'
import { useState } from 'react'

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    url: string
    price: string
    description: string
    defaultPriceId: string
  }
}

export default  function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSection, setIsCreatingCheckoutSection] = useState(false)
  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSection(true)
      // api and frontend are running on the same host, that's why we dont need to config axios
      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId
      })

      const { checkoutUrl } = response.data
      window.location.href = checkoutUrl
    }
    catch (err) {
      //connect with obervability tool (datadog/ sentry)
      setIsCreatingCheckoutSection(false)
      alert('Falha ao redirecionar ao checkout')
    }
  }
  const { isFallback } = useRouter()

  //isFallback
  if (isFallback) {
    return <p>Loading...</p>
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt={''} />
      </ImageContainer>
      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>
        <button disabled={isCreatingCheckoutSection} onClick={handleBuyProduct} >Buy now</button>
      </ProductDetails>
    </ProductContainer>
  )
}

// tell next what parameters we want next to cache
export const getStaticPaths: GetStaticPaths = (async) => {
  return {
    paths: [{ params: { id: 'prod_NdAPqWsshrZYVy' } }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  //genererate a page by product
  const productId = params.id

  //retrive product from stripe api
  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        url: product.url,
        price: new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
