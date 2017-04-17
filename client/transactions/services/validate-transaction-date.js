import stringIsNumeric from './string-is-numeric';

// Returns true if `transactionDate` is of the form "2016-01", false
// otherwise.
//
// Some examples which return true:
// "2016-10", "201000-01", "1901-01", "1950-12"
//
// Some examples which return false:
// "pie", "asdf-fdsa", "2010-1", "2016-13", "2015-10.4", "1700-10"
export default function validateTransactionDate(transactionDate) {
  // It must be a string
  if (typeof transactionDate !== 'string') {
    return false;
  }

  // Integers only
  if (transactionDate.indexOf('.') !== -1) {
    return false;
  }

  // Only accept strings of the form "X-Y".
  const dateArray = transactionDate.split('-');
  if (dateArray.length !== 2) {
    return false;
  }

  const year = dateArray[0];
  const month = dateArray[1];

  // The month must be of the form "01", not "1".
  if (month.length !== 2) {
    return false;
  }

  // Ensure both the year and month are numeric
  const yearIsNumeric = stringIsNumeric(year);
  const monthIsNumeric = stringIsNumeric(month);
  if (!yearIsNumeric || !monthIsNumeric) {
    return false;
  }

  // (Generously) allow for users to input years as far back as 1900. Honestly,
  // this could probably be 2000 and nobody would care.
  const yearNumber = parseInt(year);
  if (yearNumber < 1900) {
    return false;
  }

  // Months can only be between 1 and 12
  const monthNumber = parseInt(month);
  if (monthNumber < 1 || monthNumber > 12) {
    return false;
  }

  return true;
}
