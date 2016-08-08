/* global sinon */
import xhr from 'xhr';
import registerCategories from './categories/register';
import registerTransactions from './transactions/register';
import registerContact from './contact/register';

export default {
  start() {
    this.server = sinon.fakeServer.create();
    this.server.autoRespond = true;
    this.server.autoRespondAfter = 1500;
    registerCategories(this.server);
    registerTransactions(this.server);
    registerContact(this.server);
    xhr.XMLHttpRequest = XMLHttpRequest;
  },

  stop() {
    if (this.server) {
      this.server.restore();
      xhr.XMLHttpRequest = XMLHttpRequest;
    }
  }
};
