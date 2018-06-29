class NetworkGraph {
  constructor() {
  }

  getNeighbors(addr) {
    return [];
  }

  addNode(node) {
  }

  /**
   * Find the lowest-cost path between originAddr and destAddr
   * Returns an array of addresses, or undefined if no path exists
   *
   * This is just Dijkstra's algorithm
   */
  findPath(originAddr, destAddr) {
    let costs = {};
    costs[originAddr] = 0;
    let paths = {};
    let current = originAddr;

    let visited = {};
    let unvisited = {};

    while(current && current != destAddr) {
      let neighbors = this.getNeighbors(current).sort((a,b) =>
        this.getCost(current, a) - this.getCost(current, b)
      );

      neighbors.forEach((neighbor) => {
        if(!visited[neighbor]) {
          unvisited[neighbor] = true;
        }
      });

      neighbors.forEach((neighbor) => {
        let newCost = costs[current] + this.getCost(current, neighbor);
        if(!costs[neighbor] || newCost < costs[neighbor]){
          costs[neighbor] = newCost;
          paths[neighbor] = current;
        }
      });
      visited[current] = true;
      delete unvisited[current];

      current = Object.keys(unvisited).sort((a,b) => costs[a] - costs[b])[0];
    }

    if(! current) {
      return undefined;
    }

    let path = [];
    while(current && current != originAddr) {
      path.unshift(current);
      current = paths[current];
    }
    return path;
  }
};

export {NetworkGraph};
