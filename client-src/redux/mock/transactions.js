import _ from 'lodash';

let currentId = 1;
const currentDate = new Date();

function cloneDate(date) {
  return new Date(date.getTime());
}

// Adds one month to `date`
function addMonth(date) {
  const newDate = cloneDate(date);
  newDate.setMonth(newDate.getMonth() + 1);
  return newDate;
}

function lastDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function formatDate(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function generateMonthlyRecurring({amount, startDate, description, categoryId}) {
  const today = cloneDate(currentDate);
  const oneMonthFromNow = addMonth(today);
  const lastDayNextMonth = lastDayOfMonth(oneMonthFromNow);

  const startDateObj = new Date(startDate);
  let startDateClone = cloneDate(startDateObj);

  const dates = [];
  while (startDateClone < lastDayNextMonth) {
    dates.push(cloneDate(startDateClone));
    startDateClone = addMonth(startDateClone);
  }

  return dates.map(date => {
    return {
      id: currentId++,
      amount, description,
      categoryId,
      date: formatDate(date),
      recurring: 'monthly'
    };
  });
}

export default _.concat(
  generateMonthlyRecurring({description: 'Gas', amount: '67.00', startDate: '2015-10-01', categoryId: 1}),
  generateMonthlyRecurring({description: 'Rent', amount: '2000.00', startDate: '2015-06-01', categoryId: 1}),
  generateMonthlyRecurring({description: 'Spotify', amount: '9.99', startDate: '2016-01-06', categoryId: 1}),
  generateMonthlyRecurring({description: 'Water', amount: '24.76', startDate: '2016-03-01', categoryId: 1}),
  generateMonthlyRecurring({description: 'Trash', amount: '21.10', startDate: '2015-07-01', categoryId: 1}),
  generateMonthlyRecurring({description: 'iCloud Storage', amount: '9.99', startDate: '2015-06-15', categoryId: 1}),
  generateMonthlyRecurring({description: "Renter's insurance", amount: '15.50', startDate: '2015-10-01', categoryId: 1}),
  generateMonthlyRecurring({description: 'Car insurance', amount: '23.87', startDate: '2016-04-04', categoryId: 1}),
  generateMonthlyRecurring({description: 'GitHub', amount: '7.00', startDate: '2015-10-01', categoryId: 1}),
);
