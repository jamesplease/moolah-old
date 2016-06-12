import React from 'react';
import {Link} from 'react-router';
import {
  formatDate, getNextMonth, getPrevMonth,
  splitDate, ensureLeadingZero
} from '../../services/format-date';

export default function DateMenu({date}) {
  const formattedDate = formatDate(date);

  const {year, month} = splitDate(date);
  const dateObj = new Date(year, month - 1, 1);
  const prevMonthObj = getPrevMonth(dateObj);
  const nextMonthObj = getNextMonth(dateObj);
  const prevMonthString = ensureLeadingZero(prevMonthObj.month);
  const nextMonthString = ensureLeadingZero(nextMonthObj.month);
  const prevMonthLinkTo = `/transactions/${prevMonthObj.year}-${prevMonthString}`;
  const nextMonthLinkTo = `/transactions/${nextMonthObj.year}-${nextMonthString}`;

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
      <Link className="date-menu-next" to={nextMonthLinkTo}>
        Next
        {" "}
        <i className="zmdi zmdi-caret-right"/>
      </Link>
    </div>
  );
}
