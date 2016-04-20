import yo from 'yo-yo';

export default function() {
  return yo`
    <header className="app-header">
      <div className="container">
        <h1 className="app-logo">
          <a href="/" className="app-logo-link">
            Finance App
          </a>
        </h1>
      </div>
    </header>
  `;
}
