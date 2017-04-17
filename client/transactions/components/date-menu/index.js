import React from 'react';
import {Link} from 'react-router';
import classNames from 'classnames';
import {
  formatDate, getNextMonth, getPrevMonth,
  splitDate, ensureLeadingZero, getYearMonthStringFromDate
} from '../../services/format-date';
import monthDiff from '../../services/month-diff';

export default function DateMenu({date}) {
  const formattedDate = formatDate(date);
  const currentDate = new Date();
  const currentDateString = getYearMonthStringFromDate(currentDate);
  const diff = monthDiff(currentDateString, date);

  const isNextMonth = diff === 1;

  const {year, month} = splitDate(date);
  const dateObj = new Date(year, month - 1, 1);
  const prevMonthObj = getPrevMonth(dateObj);
  const nextMonthObj = getNextMonth(dateObj);
  const prevMonthString = ensureLeadingZero(prevMonthObj.month);
  const nextMonthString = ensureLeadingZero(nextMonthObj.month);
  const prevMonthLinkTo = `/transactions/${prevMonthObj.year}-${prevMonthString}`;
  const nextMonthLinkTo = `/transactions/${nextMonthObj.year}-${nextMonthString}`;

  const nextMonthLinkClass = classNames('date-menu-next', {
    'date-menu-next-disabled': isNextMonth
  });

  return (
    <div className="date-menu container">
      <Link className="date-menu-prev" to={prevMonthLinkTo}>
        <i className="zmdi zmdi-caret-left"/>
        {" "}
        Prev
      </Link>
      <div className="date-menu-current-date">
        <i className="zmdi zmdi-calendar date-menu-icon-calendar"/>
        {" "}
        {formattedDate}
      </div>
      <Link className={nextMonthLinkClass} to={nextMonthLinkTo}>
        Next
        {" "}
        <i className="zmdi zmdi-caret-right"/>
      </Link>
    </div>
  );
}
