import * as formatDate from '../../../../../client-src/transactions/services/format-date';

describe('formatDate', function() {
  describe('formatDate', () => {
    it('should format dates correctly', () => {
      expect(formatDate.formatDate('2016-10')).to.equal('October 2016');
      expect(formatDate.formatDate('2014-01')).to.equal('January 2014');
      expect(formatDate.formatDate('2050-12')).to.equal('December 2050');
    });
  });

  describe('splitDate', () => {
    it('should return the expected object', () => {
      expect(formatDate.splitDate('2015-10')).to.deep.equal({
        year: 2015,
        month: 10
      });

      expect(formatDate.splitDate('1-1')).to.deep.equal({
        year: 1,
        month: 1
      });
    });
  });

  describe('ensureLeadingZero', () => {
    it('should not add leading zeros to numbers that dont need them', () => {
      expect(formatDate.ensureLeadingZero('10')).to.equal('10');
      expect(formatDate.ensureLeadingZero('11')).to.equal('11');
      expect(formatDate.ensureLeadingZero('12')).to.equal('12');
    });

    it('should add leading zeros to numbers that need them', () => {
      expect(formatDate.ensureLeadingZero('1')).to.equal('01');
      expect(formatDate.ensureLeadingZero('5')).to.equal('05');
      expect(formatDate.ensureLeadingZero('9')).to.equal('09');
    });
  });

  describe('getYearMonthStringFromDate', () => {
    it('should return the right string given Oct 2015', () => {
      const date = new Date('2015-10-12');
      expect(formatDate.getYearMonthStringFromDate(date)).to.equal('2015-10');
    });

    it('should return the right string given Jan 2020', () => {
      const date = new Date('2020-01-12');
      expect(formatDate.getYearMonthStringFromDate(date)).to.equal('2020-01');
    });
  });

  describe('getNextMonth', () => {
    it('should return the next month when passed a date in January', () => {
      const date = new Date('2015-01-10');
      const nextMonth = formatDate.getNextMonth(date);
      expect(nextMonth).to.deep.equal({
        year: 2015,
        month: 2
      });
    });

    it('should return the next month when passed a date in December', () => {
      const date = new Date('2015-12-10');
      const nextMonth = formatDate.getNextMonth(date);
      expect(nextMonth).to.deep.equal({
        year: 2016,
        month: 1
      });
    });
  });

  describe('getPrevMonth', () => {
    it('should return the next month when passed a date in January', () => {
      const date = new Date('2015-01-10');
      const nextMonth = formatDate.getPrevMonth(date);
      expect(nextMonth).to.deep.equal({
        year: 2014,
        month: 12
      });
    });

    it('should return the next month when passed a date in December', () => {
      const date = new Date('2015-12-10');
      const nextMonth = formatDate.getPrevMonth(date);
      expect(nextMonth).to.deep.equal({
        year: 2015,
        month: 11
      });
    });
  });
});
