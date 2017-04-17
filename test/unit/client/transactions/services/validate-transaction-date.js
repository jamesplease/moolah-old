import validateTransactionDate from '../../../../../client/transactions/services/validate-transaction-date';

describe('validateTransactionDate', function() {
  it('should return false for undefined and null', () => {
    expect(validateTransactionDate()).to.be.false;
    expect(validateTransactionDate(null)).to.be.false;
  });

  it('should return false for empty strings', () => {
    expect(validateTransactionDate('')).to.be.false;
  });

  it('should return false for strings with periods in them', () => {
    expect(validateTransactionDate('2016.05-10.15')).to.be.false;
    expect(validateTransactionDate('hello.pls')).to.be.false;
    expect(validateTransactionDate('2016.10')).to.be.false;
  });

  it('should return false for strings that are not dates', () => {
    expect(validateTransactionDate('asdf')).to.be.false;
    expect(validateTransactionDate('what-pls-ok')).to.be.false;
    expect(validateTransactionDate('2016-ok')).to.be.false;
  });

  it('should return false for strings of the wrong date format', () => {
    expect(validateTransactionDate('2015-10-12')).to.be.false;
    expect(validateTransactionDate('10-2015')).to.be.false;
    expect(validateTransactionDate('2015')).to.be.false;
    expect(validateTransactionDate('2015-50')).to.be.false;
    expect(validateTransactionDate('0-0')).to.be.false;
    expect(validateTransactionDate('31')).to.be.false;
    expect(validateTransactionDate('2015-1')).to.be.false;
    expect(validateTransactionDate('2015-0')).to.be.false;
    expect(validateTransactionDate('2015-00')).to.be.false;
  });

  it('should return false for years that are too far back in time', () => {
    expect(validateTransactionDate('1850-10')).to.be.false;
  });

  it('should return true for strings of the right format', () => {
    expect(validateTransactionDate('2050-01')).to.be.true;
    expect(validateTransactionDate('2015-10')).to.be.true;
    expect(validateTransactionDate('2000000-10')).to.be.true;
    expect(validateTransactionDate('2020-12')).to.be.true;
  });
});
