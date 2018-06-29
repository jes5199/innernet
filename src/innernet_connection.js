class InnernetConnection {
  constructor(id, cost) {
    this.id = id;
    this.cost = cost;
  }

  getRemoteId() {
    return this.id;
  }

  getCost() {
    return this.cost;
  }

  joinNetwork(network) {
    this.network = network;
  }

  receiveMessage(msg) {
    this.network.receiveMessage(msg);
  }
}

export {InnernetConnection};
