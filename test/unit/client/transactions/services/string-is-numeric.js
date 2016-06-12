import stringIsNumeric from '../../../../../client-src/transactions/services/string-is-numeric';

describe('stringIsNumeric', function() {
  it('should return false for empty strings', () => {
    expect(stringIsNumeric('')).to.be.false;
  });

  it('should return false for a string containing words only', () => {
    expect(stringIsNumeric('asdf')).to.be.false;
  });

  it('should return false for a string containing words and numbers', () => {
    expect(stringIsNumeric('asdf1234')).to.be.false;
    expect(stringIsNumeric('1234asdf')).to.be.false;
    expect(stringIsNumeric('1a234')).to.be.false;
  });

  it('should return false for null and undefined', () => {
    expect(stringIsNumeric()).to.be.false;
    expect(stringIsNumeric(null)).to.be.false;
  });

  it('should return false for Objects and Arrays', () => {
    expect(stringIsNumeric({})).to.be.false;
    expect(stringIsNumeric([])).to.be.false;
  });

  it('should return true for numbers', () => {
    expect(stringIsNumeric(0)).to.be.true;
    expect(stringIsNumeric(100)).to.be.true;
  });

  it('should return true for numbers in strings', () => {
    expect(stringIsNumeric('0')).to.be.true;
    expect(stringIsNumeric('-100')).to.be.true;
    expect(stringIsNumeric('100')).to.be.true;
  });
});
