const { InnernetConnection } = require('./innernet_connection')

class FakeConnection extends InnernetConnection {
  constructor(id, cost) {
    super();
    this.id = id;
    this.cost = cost;
    this.messages = [];
  }

  getRemoteId() {
    return this.id;
  }

  getCost() {
    return this.cost;
  }

  sendMessage(msg) {
    this.messages.push(msg);
  }
}

export {FakeConnection};
