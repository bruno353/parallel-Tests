import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import FacebookPixel from '../components/FacebookPixel'
import MicrosoftClarity from '../components/MicrosoftClarity'
import AccountContextProvider from '../contexts/AccountContext'
import { ScalableLayout } from '../layouts/ScalableLayout'

import { ParallelProvider } from '@parallelmarkets/react'
import { loadParallel } from '@parallelmarkets/vanilla'

import '../styles/global.css'
import { GoogleTag } from '../components/GoogleTag'
import LinkedinInsight from '../components/Pixels/LinkedinInsigth'

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()

  const parallel = loadParallel({
    client_id: '123',
    environment: 'demo',
    flow_type: 'overlay',
  })

  return (
    <AccountContextProvider>
      <ParallelProvider parallel={parallel}>
        <FacebookPixel />
        <MicrosoftClarity />
        <GoogleTag />
        <LinkedinInsight />
        {pathname !== '/' &&
        pathname !== '/investidores' &&
        pathname !== '/building' ? (
          <ScalableLayout>
            <Component {...pageProps} />
          </ScalableLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </ParallelProvider>
    </AccountContextProvider>
  )
}
