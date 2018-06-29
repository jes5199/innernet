const { InnernetConnection } = require('./innernet_connection')

class FunctionConnection extends InnernetConnection {
  constructor(id, cost, sendFunction) {
    super(id, cost);
    this.sendMessage = (m) => {sendFunction(m)};
  }
}

export {FunctionConnection};
