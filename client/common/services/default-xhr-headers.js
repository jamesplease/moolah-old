import cookies from 'cookiesjs';

// Include these in all requests by default
export default {
  // This isn't used for GET requests, but to keep it simple we just send it
  // along anyway.
  'X-CSRF-Token': cookies('antiCsrfToken'),
  // Required for JSON API
  'Content-Type': 'application/vnd.api+json'
};
