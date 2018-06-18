class Innernet {
  constructor(local_id, graph, onmessage) {
    this.localId = local_id;
    this.networkGraph = graph;
    this.connections = {};
    this.onmessage = onmessage;
  }

  addConnection(conn) {
    let remote_id = conn.getRemoteId();
    this.networkGraph.addPath(this.localId, remote_id, conn.getCost());
    this.connections[remote_id] = conn;
  }

  sendMessage(dest_id, body) {
    let path = this.networkGraph.findPath(this.localId, dest_id);
    this.relayMessage(path, body);
  }

  relayMessage(path, body) {
    // TODO: error handling
    let hopConn = this.connections[path[0]];
    hopConn.sendMessage({
      route: path,
      body: body,
    });
  }

  receiveMessage(msg) {
    if( msg.route[0] == this.localId ) {
      if(msg.route.length == 1 ) {
        if(this.onmessage) { this.onmessage(msg.body); }
      } else {
        let path = msg.route.slice(1);
        this.relayMessage(path, msg.body);
      }
    }
  }
}

export {Innernet};
