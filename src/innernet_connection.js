class InnernetConnection {
  joinNetwork(network) {
    this.network = network;
  }

  receiveMessage(msg) {
    this.network.receiveMessage(msg);
  }
}

export {InnernetConnection};
