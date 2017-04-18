import monthMap from './month-map';

export function getYearFromDate(date) {
  return date.split('-')[0];
}

export function getMonthFromDate(date) {
  return date.split('-')[1];
}

export function getDayFromDate(date) {
  return date.split('-')[2];
}

// "2016-10" => "October 2016"
export function formatDate(date) {
  const dateArr = date.split('-');
  const monthName = monthMap[Number(dateArr[1])];
  return `${monthName} ${dateArr[0]}`;
}

export function formatDateForTransactionList(date) {
  return `${getMonthFromDate(date)}/${getDayFromDate(date)}`;
}

// "2015-10" => {
//   year: 2015,
//   month: 10
// }
export function splitDate(dateString) {
  const dates = dateString
    .split('-')
    .map(n => Number(n));
  return {
    year: dates[0],
    month: dates[1]
  };
}

export function ensureLeadingZero(number) {
  return (`0${number}`).slice(-2);
}

// Returns a string of the form "2016-10" from a JS Date obj
export function getYearMonthStringFromDate(date) {
  const month = date.getMonth() + 1;
  const monthString = ensureLeadingZero(month);
  const year = date.getFullYear();
  return `${year}-${monthString}`;
}

export function getNextMonth(date) {
  let newDate;
  if (date.getMonth() === 11) {
    newDate = new Date(date.getFullYear() + 1, 0, 1);
  } else {
    newDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  }
  return {
    year: newDate.getFullYear(),
    month: newDate.getMonth() + 1
  };
}

export function getPrevMonth(date) {
  let newDate;
  if (date.getMonth() === 0) {
    newDate = new Date(date.getFullYear() - 1, 11, 1);
  } else {
    newDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  }
  return {
    year: newDate.getFullYear(),
    month: newDate.getMonth() + 1
  };
}
