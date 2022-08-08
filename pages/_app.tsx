import type { AppProps } from 'next/app'
import Layout  from '../components/Layout';
import '../styles/globals.css';
import { StateContextProvider } from '../context/StateContext'
import { AuthContextProvider } from '../context/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StateContextProvider>
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
    </StateContextProvider>
  )
}

export default MyApp
