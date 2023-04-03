import { useRouter } from 'next/router'
import {
  ProductContainer,
  ImageContainer,
  ProductDetails,
} from './../../styles/pages/product'

export default function Product() {
  const { query } = useRouter()
  return (
    <ProductContainer>
      <ImageContainer></ImageContainer>
      <ProductDetails>
        <h1>Camiseta X</h1>
        <span>R$ 79,90</span>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium
          error adipisci voluptas fugit quibusdam quae pariatur doloremque ex
          voluptate. Voluptatum corrupti perspiciatis tenetur facere ipsam error
          id explicabo. Culpa, quos.
        </p>
        <button>Buy now</button>
      </ProductDetails>
    </ProductContainer>
  )
}
