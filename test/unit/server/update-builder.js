import updateBuilder from '../../../server/api/util/update-builder';

describe('updateBuilder', () => {
  it('should be a function', () => {
    expect(updateBuilder).to.be.a('function');
  });

  describe('when passing in a single attribute', () => {
    it('should return the correct result', () => {
      const options = {
        tableName: 'sandwiches',
        validValues: ['name', 'date', 'value'],
        values: {
          name: 'pasta'
        },
        id: 5
      };

      const result = updateBuilder(options);
      const expected = [
        'UPDATE sandwiches SET name = $<name> WHERE id = $<id>',
        { name: 'pasta', id: 5 }
      ];
      expect(result).to.deep.equal(expected);
    });
  });

  describe('when passing in a single valid attribute and some invalid attributes', () => {
    it('should return the correct result', () => {
      const options = {
        tableName: 'sandwiches',
        validValues: ['name', 'date', 'value'],
        values: {
          name: 'james',
          cake: 'yes pls',
          hungry: true
        },
        id: 10
      };

      const result = updateBuilder(options);
      const expected = [
        'UPDATE sandwiches SET name = $<name> WHERE id = $<id>',
        { name: 'james', id: 10 }
      ];
      expect(result).to.deep.equal(expected);
    });
  });

  // So here's the thing. This test only works when we assume a looping order
  // of Objects. This is fine in V8 (as of this moment), but it's subject to
  // change at any time. I know, I knoow! This might seem like a major issue,
  // but it's actually only a small-ish one. If this test works given **any**
  // looping order, then it means that the underlying method being tested works for
  // **all** looping orders. For this reason, the fix to this problem is NOT to change
  // the API of the `updateBuilder` method, but to instead add a more robust check of
  // validity in this test. Don't worry, I plan to do that. Here's the issue tracking it:
  // https://github.com/jmeas/finance-app/issues/114
  describe('when passing in multiple valid attributes', () => {
    it('should return the correct result', () => {
      const options = {
        tableName: 'sandwiches',
        validValues: ['name', 'date', 'value'],
        values: {
          name: 'james',
          date: '2015-10-10',
          value: '10.00'
        },
        id: 15
      };

      const result = updateBuilder(options);
      const expected = [
        'UPDATE sandwiches SET name = $<name>, date = $<date>, value = $<value> WHERE id = $<id>',
        {
          name: 'james',
          date: '2015-10-10',
          value: '10.00',
          id: 15
        }
      ];
      expect(result).to.deep.equal(expected);
    });
  });

  describe('when passing in multiple valid attributes and multiple invalid attributes', () => {
    it('should return the correct result', () => {
      const options = {
        tableName: 'sandwiches',
        validValues: ['name', 'date', 'value'],
        values: {
          name: 'james',
          date: '2015-10-10',
          value: '10.00',
          cake: true,
          cookies: true,
          pasta: 'whaaaaaaat'
        },
        id: 15
      };

      const result = updateBuilder(options);
      const expected = [
        'UPDATE sandwiches SET name = $<name>, date = $<date>, value = $<value> WHERE id = $<id>',
        {
          name: 'james',
          date: '2015-10-10',
          value: '10.00',
          id: 15
        }
      ];
      expect(result).to.deep.equal(expected);
    });
  });
});
