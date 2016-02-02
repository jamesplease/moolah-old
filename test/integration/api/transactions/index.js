import dbConnect from '../../../../server/api/db-connect';

const TABLE_NAME = 'transaction';

function getInsertQuery(values) {
  return {
    name: 'transactions_create_one',
    text: `INSERT INTO ${TABLE_NAME} (description, value, date) VALUES ($1, $2, $3)`,
    values: [values.description, values.value, values.date]
  };
}

describe('A mock test', () => {
  it('should pass', done => {
    const query = getInsertQuery({
      value: '10.20'
    });

    dbConnect(null, (client, finish) => {
      finish();
      client.query(query, (err, result) => {
        if (err) {
          console.log('uh oh', err);
        }
        client.query(`SELECT * FROM ${TABLE_NAME}`, (err, result) => {
          if (err) {
            console.log(':(');
          } else {
            expect(result.rows).to.have.length(1);
          }
          done();
        });
      });
    });
  });
});

describe('A mock test', () => {
  it('should pass', done => {
    const query = getInsertQuery({
      value: '10000.00',
      description: 'fuuuuck'
    });

    dbConnect(null, (client, finish) => {
      finish();
      client.query(query, (err, result) => {
        if (err) {
          console.log('uh oh', err);
        }
        client.query(`SELECT * FROM ${TABLE_NAME}`, (err, result) => {
          if (err) {
            console.log(':(');
          } else {
            expect(result.rows).to.have.length(1);
          }
          done();
        });
      });
    });
  });
});
