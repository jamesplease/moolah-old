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

// When a field is missing
function missingAttribute(fieldName) {
  return {
    title: "Missing Attribute",
    detail: `The attribute "${fieldName}" is required.`
  };
}

module.exports = {
  notFoundError,
  genericError,
  missingAttribute
};
