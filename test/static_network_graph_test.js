const assert = require('assert')

const { StaticNetworkGraph } = require('../src/static_network_graph')

describe('StaticNetworkGraph', () => {
  describe('.findPath()', () => {
    it('should find the empty path on the one-node graph', () => {
      let sng = new StaticNetworkGraph({
        'node': {} // one node, no neighbors
      })
      let path = sng.findPath('node', 'node');
      assert.deepEqual(path, []);
    })

    it('should find the trivial path on the two-node graph', () => {
      let sng = new StaticNetworkGraph({
        'start': {'end': 1},
        'end': {}
      })
      let path = sng.findPath('start', 'end');
      assert.deepEqual(path, ['end']);
    })

    it('should find a path on graph', () => {
      let sng = new StaticNetworkGraph({
        'start': {'a': 1, 'b': 1},
        'a': {'b': 1},
        'b': {'c': 1},
        'c': {'end': 1},
        'end': {}
      })
      let path = sng.findPath('start', 'end');
      assert.deepEqual(path, ['b', 'c', 'end']);
    })

    it('should return undefined if no a path can be found', () => {
      let sng = new StaticNetworkGraph({
        'start': {'a': 1, 'b': 1},
        'a': {'b': 1},
        'b': {'c': 1},
        'c': {'start': 1},
        'end': {}
      })
      let path = sng.findPath('start', 'end');
      assert.deepEqual(path, undefined);
    })

    it('should avoid an expensive path on graph', () => {
      let sng = new StaticNetworkGraph({
        'start': {'a': 1, 'b': 1},
        'a': {'b': 1, 'end': 100},
        'b': {'c': 1},
        'c': {'end': 1},
        'end': {}
      })
      let path = sng.findPath('start', 'end');
      assert.deepEqual(path, ['b', 'c', 'end']);
    })
  })

  describe('.addPath(origin, dest, cost)', () => {
    // TODO
  });
})
