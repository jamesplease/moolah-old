export default function register(server) {
  server.respondWith(
    'GET',
    '/api/v1/categories',
    [
      200,
      {'Content-Type': 'application/json'},
      '[{ "id": 12, "comment": "Hey there" }]'
    ]
  );
}
