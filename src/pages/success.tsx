import { GetServerSideProps } from 'next';
import Link from 'next/link'
import Stripe from 'stripe';
import { ImageContainer, SuccessContainer } from '../styles/pages/success'
import { stripe } from './../lib/stripe';
import Image from 'next/image';

interface SuccessProps {
  customerName: string,
  product: {
    name: string,
    imageUrl: string,
  }
}
export default function Success({customerName, product}: SuccessProps) {
  return (
    <SuccessContainer>
      <h1>Thank you for your purchase!</h1>
      <ImageContainer>
        <Image src={product.imageUrl} width={120} height={110} alt=""/>
      </ImageContainer>
      <p>
        Uhuu! <strong>{customerName},</strong> Your order has been processed. Your{' '}
        <strong>{product.name}</strong> is on the way
      </p>
      <Link href='/'></Link>
    </SuccessContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query, params }) => {
  if (!query.session_id) {
    return {
      // this a a prop from next
      //notFound: true
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const sessionId = String(query.session_id);


  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  console.log(session.line_items.data)
  const customerName = session.customer_details.name;

  
const product = session.line_items.data[0].price.product as Stripe.Product

return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageURL: product.images[0]
      }
    }
  }
}
// FETCH CAN BE OF 3 TYPES

// Client-side (useEffect) -> requisition by the client side and then fill the info, we will need a loding so page can load with the info 
// getServerSideProps -> 
// getStaticProps -> will generate a static page, used when we need performance - will be the same page for all. we cant use it if the page has different parameters for differente users