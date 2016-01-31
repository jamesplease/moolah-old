import React from 'react';

const Layout = ({children}) => (
  <div>
    <header>
      <div className="container">
        <h1>
          Finance App
        </h1>
      </div>
    </header>
    <main>
      <div className="container">
        {children}
      </div>
    </main>
    <footer>
      <div className="container">
        Created by Jmeas. Source code available on <a href="https://github.com/jmeas/finance-app">GitHub</a>.
      </div>
    </footer>
  </div>
);

export default Layout;
