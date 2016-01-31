import React from 'react';

import Header from '../header';
import Footer from '../footer';

const Layout = ({children}) => (
  <div>
    <Header/>
    <main>
      <div className="container">
        {children}
      </div>
    </main>
    <Footer/>
  </div>
);

export default Layout;
