import React from 'react';
import Header from '../header';
import Footer from '../footer';
import Alert from '../alert';
import MobileNav from '../mobile-nav';

export default function Layout({children}) {
  return (
    <div>
      <Header/>
      <MobileNav/>
      <Alert/>
      <div className="content-container">
        <main>
          <div className="container">
            {children}
          </div>
        </main>
        <Footer/>
      </div>
    </div>
  );
}
