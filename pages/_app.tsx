import type { AppProps } from 'next/app'
import Layout  from '../components/Layout';
import '../styles/globals.css';
import { StateContext } from '../context/StateContext'
import { AuthContextProvider } from '../context/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StateContext>
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
    </StateContext>
  )
}

export default MyApp
