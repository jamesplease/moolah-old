export default function monthDiff(dateStringOne, dateStringTwo) {
  const splitOne = dateStringOne.split('-');
  const yearOne = Number(splitOne[0]);
  const monthOne = Number(splitOne[1]);

  const splitTwo = dateStringTwo.split('-');
  const yearTwo = Number(splitTwo[0]);
  const monthTwo = Number(splitTwo[1]);

  const yearDiff = (yearTwo - yearOne) * 12;
  const monthDiff = monthTwo - monthOne;
  return yearDiff + monthDiff;
}
