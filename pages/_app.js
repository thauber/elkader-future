import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <div className="flex px-4 pt-2">
        <a href="/">
          <img className="max-w-2xs" src="/images/logo.png" />
        </a>
      </div>
    <Component {...pageProps} />
    </div>
  )
}

export default MyApp
