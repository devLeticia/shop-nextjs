import { useRouter } from 'next/router'

export default function Teste() {
    const { query } = useRouter()
    return (
        <h1>Testando {JSON.stringify(query)}</h1>
    )
}