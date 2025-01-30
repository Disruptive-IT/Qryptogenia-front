import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

const mercadoPago = initMercadoPago(`${import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY}`)

export default mercadoPago
    