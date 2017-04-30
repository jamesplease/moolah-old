import {
  createValidator,
  composeValidators,
  combineValidators,
  isRequired,
  isAlphaNumeric,
} from 'revalidate';
import validateTransactionDate from './validate-transaction-date';

export default combineValidators({
  description: composeValidators(
    isRequired,
    isAlphaNumeric,
  )('Description'),

  value: isRequired('Value'),

  date: composeValidators(
    isRequired,
    createValidator(
      message => value => {
        if (!validateTransactionDate(value, {includeDay: true})) {
          return message;
        }
      },
      field => `${field} must be of the form YYYY-MM-DD`
    )
  )('Date')
});
