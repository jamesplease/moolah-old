import React from 'react';
import Header from '../header';
import Footer from '../footer';
import Alert from '../alert';
import MobileNav from '../mobile-nav';

export default function Layout({main, subheader}) {
  return (
    <div>
      <Header/>
      <MobileNav/>
      <Alert/>
      <div className="content-container">
        {subheader}
        <main>
          {main}
        </main>
        <Footer/>
      </div>
    </div>
  );
}
