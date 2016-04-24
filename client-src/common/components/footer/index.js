import yo from 'yo-yo';

export default function() {
  return yo`
    <footer>
      <nav>
        <ul>
          <li>
            <a href="/transactions">
              Transactions
            </a>
          </li>
          <li>
            <a href="/analytics">
              Analytics
            </a>
          </li>
          <li>
            <a href="/profile">
              Profile
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  `;
}
