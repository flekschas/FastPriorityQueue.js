/* This script expects node.js  and mocha */

'use strict';

describe('FastPriorityQueue', function() {
  var FastPriorityQueue = require('../FastPriorityQueue.js');
  var seed = 1;
  function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }
  it('example1', function() {
    var x = new FastPriorityQueue(function(a, b) {
      return a < b;
    });
    x.add(1);
    x.add(0);
    x.add(5);
    x.add(4);
    x.add(3);
    if (x.poll() != 0) throw 'bug';
    if (x.poll() != 1) throw 'bug';
    if (x.poll() != 3) throw 'bug';
    if (x.poll() != 4) throw 'bug';
    if (x.poll() != 5) throw 'bug';
  });

  it('example2', function() {
    var x = new FastPriorityQueue(function(a, b) {
      return a > b;
    });
    x.add(1);
    x.add(0);
    x.add(5);
    x.add(4);
    x.add(3);
    if (x.poll() != 5) throw 'bug5';
    if (x.poll() != 4) throw 'bug4';
    if (x.poll() != 3) throw 'bug3';
    if (x.poll() != 1) throw 'bug1';
    if (x.poll() != 0) throw 'bug0';
  });

  it('Random', function() {
    for (var ti = 0; ti < 100; ti++) {
      var b = new FastPriorityQueue(function(a, b) {
        return a < b;
      });
      var N = 1024 + ti;
      for (var i = 0; i < N; ++i) {
        b.add(Math.floor((random() * 1000000) + 1));
      }
      var v = 0;
      while (!b.isEmpty()) {
        var nv = b.poll();
        if (nv < v) throw 'bug';
        v = nv;
      }
    }
  });

  it('RandomArray', function() {
    for (var ti = 0; ti < 100; ti++) {
      var b = new FastPriorityQueue(function(a, b) {
        return a < b;
      });
      var array = new Array();
      var N = 1024 + ti;
      for (var i = 0; i < N; ++i) {
        var val  = Math.floor((random() * 1000000) + 1);
        b.add(val);
        array.push(val);
      }
      array.sort(function(a, b) {
        return b - a;
      });
      while (!b.isEmpty()) {
        var nv = b.poll();
        var nx = array.pop();
        if (nv != nx) throw 'bug';
      }
    }
  });

  it('RandomArrayEnDe', function() {
    for (var ti = 0; ti < 100; ti++) {
      var b = new FastPriorityQueue(function(a, b) {
        return a < b;
      });
      var array = new Array();
      var N = 16 + ti;
      for (var i = 0; i < N; ++i) {
        var val  = Math.floor((random() * 1000000) + 1);
        b.add(val);
        array.push(val);
      }
      array.sort(function(a, b) {
        return b - a;
      });
      for (var j = 0; j < 1000; ++j) {
        var nv = b.poll();
        var nx = array.pop();
        if (nv != nx) throw 'bug';
        var val  = Math.floor((random() * 1000000) + 1);
        b.add(val);
        array.push(val);
        array.sort(function(a, b) {
          return b - a;
        });
      }
    }
  });

  it('PollOtherValues', function() {
    var x = new FastPriorityQueue();

    x.heapify([1, 0, 5, 1, 4, 3]);

    // We need to traverse an array in inverse order if we want to remove
    // elements on it without causing "jumps"
    for (var i = x.size; --i;) {
      if (x.peek(i) === 1) x.poll(i);
    }

    if (x.poll() != 0) throw 'bug0';
    if (x.poll() != 3) throw 'bug3';
    if (x.poll() != 4) throw 'bug4';
    if (x.poll() != 5) throw 'bug5';
  });

});
