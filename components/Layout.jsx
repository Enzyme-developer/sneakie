import React from 'react'

const Layout = ( { children } ) => {
  return (
    <div>
      <header></header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout