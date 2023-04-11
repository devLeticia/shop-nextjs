import Link from 'next/link'
import { ImageContainer, SuccessContainer } from '../styles/pages/success'

export default function Success() {
  return (
    <SuccessContainer>
      <h1>Thank you for your purchase!</h1>
      <ImageContainer></ImageContainer>
      <p>
        Uhuu! <strong>Letícia,</strong> Your order has been processed. Your{' '}
        <strong>Tshirt SomethinNow</strong> is on the way
      </p>
      <Link href='/'></Link>
    </SuccessContainer>
  )
}
