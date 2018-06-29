const { InnernetConnection } = require('./innernet_connection')

class FakeConnection extends InnernetConnection {
  constructor(id, cost) {
    super(id, cost);
    this.messages = [];
  }

  sendMessage(msg) {
    this.messages.push(msg);
  }
}

export {FakeConnection};
