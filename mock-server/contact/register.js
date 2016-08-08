export default function register(server) {
  server.respondWith(
    'POST',
    '/help/messages',
    (req) => {
      req.respond(202);
    }
  );
}
