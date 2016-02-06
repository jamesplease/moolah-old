import pg from 'pg-promise';

const pgp = pg();

// Concatenates an array of objects or arrays of values, according to the template,
// to use with insert queries. Can be used either as a class type or as a function.
//
// template = formatting template string
// data = array of either objects or arrays of values
function Inserts(template, data) {
  if (!(this instanceof Inserts)) {
    return new Inserts(template, data);
  }
  this._rawDBType = true;
  this.formatDBType = function() {
    return data.map(d=>`(${pgp.as.format(template, d)})`).join(',');
  };
}

export default Inserts;
