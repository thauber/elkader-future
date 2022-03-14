import '../styles/globals.css'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <div className="flex px-4 pt-2 cursor-pointer">
        <Link href="/">
          <img className="max-w-2xs" src="/images/logo.png" />
        </Link>
      </div>
    <Component {...pageProps} />
    </div>
  )
}

export default MyApp
