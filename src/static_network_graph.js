const { NetworkGraph } = require('./network_graph')

class StaticNetworkGraph extends NetworkGraph {
  constructor(data) {
    super();
    this.data = data;
  }

  getNeighbors(addr) {
    return Object.keys(this.data[addr]);
  }

  getCost(originAddr, neighborAddr) {
    return this.data[originAddr][neighborAddr];
  }

  addPath(origin, dest, cost) {
    this.data[origin][dest] = cost;
  }
};

export {StaticNetworkGraph};
