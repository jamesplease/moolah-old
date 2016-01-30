import React from 'react';

const Layout = ({children}) => (
  <div>
    <header>
      Finance App
    </header>
    <main>
      {children}
    </main>
    <footer>
      Created by Jmeas. Source code available on GitHub.
    </footer>
  </div>
);

export default Layout;
