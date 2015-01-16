$(document).ready(function () {

  var STATES, setRyu

  STATES = {
    none: $('.ryu'),
    ready: $('<img src="images/ryu-ready-position.gif">'),
    throwing: $('<img src="images/ryu-throwing-hadouken.png">'),
    cool: $('<img src="images/ryu-cool.gif">')
  };

  setRyu = (function () {
    var activeRyu = STATES['none'];
    return function (newState) {
      var ryu = activeRyu;
      activeRyu = STATES[newState];
      ryu.replaceWith(activeRyu);
    }
  }());

  (function () {
    var loadCount = 0;
    $.each(STATES, function (k, v) {
      v.addClass('ryu');
      v.load(function () {
        if (++loadCount === 3) {
          readyListeners();
        }
      });
    });
  }());

  function readyListeners() {
    $('#frame').on('mouseenter', '.ryu', setRyu.bind(null, 'ready'));
    $('#frame').on('mouseleave', '.ryu', setRyu.bind(null, 'none'));
    $('#frame').on('mousedown', '.ryu', setRyu.bind(null, 'throwing'));
    $('#frame').on('mouseup', '.ryu', setRyu.bind(null, 'none'));
    $(document).on('keydown', function (event) {
      if (event.keyCode === 88) {
        setRyu('cool');
      }
    });
    $(document).on('keyup', function (event) {
      if (event.keyCode === 88) {
        setRyu('none');
      }
    });
  }
});