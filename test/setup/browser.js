var mochaGlobals = require('./.globals.json').globals;

window.mocha.setup('bdd');
window.onload = function() {
  window.mocha.checkLeaks();
  window.mocha.globals(Object.keys(mochaGlobals));
  var runner = window.mocha.run();
  require('./setup')(window);

  // This code is for alerting SauceLabs of our successes and failures
  var failedTests = [];
  runner.on('end', function() {
    window.mochaResults = runner.stats;
    window.mochaResults.reports = failedTests;
  });

  function logFailure(test, err) {
    var flattenTitles = function(test) {
      var titles = [];
      while (test.parent.title) {
        titles.push(test.parent.title);
        test = test.parent;
      }
      return titles.reverse();
    };

    failedTests.push({
      name: test.title,
      result: false,
      message: err.message,
      stack: err.stack,
      titles: flattenTitles(test)
    });
  }

  runner.on('fail', logFailure);
};
