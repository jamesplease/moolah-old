// A catch-all error
function genericError() {
  return {
    title: "Server Error",
    detail: "There was an error while processing your request."
  };
}

// Generates an error for a 404 resource
function notFoundError() {
  return {
    title: "Not Found",
    detail: "Resource not found."
  };
}

module.exports = {
  notFoundError,
  genericError
};
