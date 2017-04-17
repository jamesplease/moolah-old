import {truncateAt} from '../../../../../client/common/services/string-util';

describe('stringUtil', () => {
  describe('truncateAt', () => {
    it('should not truncate when the string is shorter than the length', () => {
      expect(truncateAt('hello', 10)).to.equal('hello');
    });

    it('should not truncate when the string is equal to the length', () => {
      expect(truncateAt('hello', 5)).to.equal('hello');
    });

    it('should truncate when the string is longer than the length', () => {
      expect(truncateAt('hello', 2)).to.equal('he…');
    });
  });
});
