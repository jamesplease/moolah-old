// A catch-all error
function generateGenericError() {
  return {
    title: "Server Error",
    description: "There was an error while processing your request."
  };
}

// Generates an error for a 404 resource
function generateNotFoundError() {
  return {
    title: "Not Found",
    detail: "Resource not found."
  };
}

module.exports = {
  generateNotFoundError,
  generateGenericError
};
