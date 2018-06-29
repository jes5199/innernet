const assert = require('assert')

const { Innernet } = require('../src/innernet')
const { StaticNetworkGraph } = require('../src/static_network_graph')
const { FakeConnection } = require('../src/fake_connection')
const { FunctionConnection } = require('../src/function_connection')

describe('Innernet', () => {
  // Innernet takes a network graph object as parameter.
  // Innernet.addConnection(conn) takes a connection object, and adds it to the graph
  describe('.addConnection(conn)', () => {
    it('should add the connection to the graph', () => {
      let sng = new StaticNetworkGraph({
        'node': {}
      });
      let innernet = new Innernet("node", sng);
      let conn = new FakeConnection("remote_id", 51);
      innernet.addConnection(conn);
      assert.deepEqual(sng.data, { 'node': {'remote_id': 51} });
    });
  });

  describe('.sendMessage(dest_id, msg)', () => {
    it('should relay a message towards the destination', () => {
      let sng = new StaticNetworkGraph({
        'node': {},
        'remote_id': {'distant_id': 10}
      });
      let innernet = new Innernet("node", sng);
      let conn = new FakeConnection("remote_id", 51);
      innernet.addConnection(conn);
      innernet.sendMessage("distant_id", ["something", {"message": true}]);

      assert.deepEqual(conn.messages, [
        {
          route: ["remote_id", "distant_id"],
          body: ["something", {"message": true}],
        }
      ]);
    });
  });

  describe('.receiveMessage', () => {
    it('should accept a message', () => {
      let msg;
      let hook = (m) => {msg = m};
      let sng = new StaticNetworkGraph({ 'node': {} });
      let innernet = new Innernet("node", sng, hook);
      innernet.receiveMessage({route: ["node"], body: {message: "yes"}});
      assert.deepEqual(msg, {message: "yes"});
    });

    it('should relay a message', () => {
      let msg;
      let hook = (m) => {msg = m};
      let sng = new StaticNetworkGraph({ 'node': {} });
      let innernet = new Innernet("node", sng, hook);
      let conn = new FakeConnection("next", 51);
      innernet.addConnection(conn);
      innernet.receiveMessage({route: ["node", "next"], body: {message: "yes"}});
      assert.deepEqual(msg, undefined);
      assert.deepEqual(conn.messages, [
        {
          route: ["next"],
          body: {"message": "yes"},
        }
      ]);
    });
  });

  describe('integration', () => {
    it('should receive messages that come in from connections', () => {
      let msg;
      let hook = (m) => {msg = m};
      let sng = new StaticNetworkGraph({
        'node': {}
      });
      let innernet = new Innernet("node", sng, hook);
      let conn = new FakeConnection("remote_id", 51);
      innernet.addConnection(conn);
      conn.receiveMessage({route: ["node"], body: {message: "yes"}});
      assert.deepEqual(msg, {message: "yes"});
    });

    it('should relay message the whole way', () => {
      let msg;
      let hook = (m) => {msg = m};
      let sng = new StaticNetworkGraph({
        // TODO: addNode
        start: {},
        middle: {},
        final: {}
      });

      let noop = (m) => {};

      // suddenly I grok the problem with this class name
      let innernet1 = new Innernet("start", sng, noop);
      let innernet2 = new Innernet("middle", sng, noop);
      let innernet3 = new Innernet("final", sng, hook);

      let conn1to2 = new FunctionConnection("middle", 1, (m) => {innernet2.receiveMessage(m)});
      innernet1.addConnection(conn1to2);

      let conn2to3 = new FunctionConnection("final", 1, (m) => {innernet3.receiveMessage(m)});
      innernet2.addConnection(conn2to3);

      innernet1.sendMessage("final", {message: "we did it"});

      assert.deepEqual(msg, {message: "we did it"});
    });
  });
});

