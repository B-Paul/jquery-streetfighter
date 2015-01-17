var doc = $(document);
doc.ready(function () {
  var ryu, ready, cool, throwing, hadouken, sound;

  // The order of .ryu elements in the document determines priority.
  // The first one with class 'active' is the one that is displayed.
  ryu = $('.ryu');

  ready = $('#ryu-ready');
  cool = $('#ryu-cool');
  throwing = $('#ryu-throwing');
  hadouken = $('#hadouken');
  sound = $('#hadouken-sound').get(0);

  sound.load();

  doc
    // if x pressed, ryu should act cool as long as he is not throwing a
    // hadouken
    .on('keydown', keydown)
    // if x released, no longer act cool
    .on('keyup', keyup);

  ryu
    // ryu should throw a hadouken for at least half a second
    .on('mousedown', click)
    // no longer throw a hadouken
    .on('mouseup', release)
    // ryu should act ready as long as he is not throwing a hadouken or acting
    // cool
    .on('mouseenter', hover)
    // no longer act ready
    .on('mouseleave', leave);

  function keydown(event) {
    if (event.keyCode === 88) {
      activate(cool);
    }
  }

  function keyup(event) {
    if (event.keyCode == 88) {
      deactivate(cool);
    }
  }

  function click() {
    var refFun = refresh;
    activate(throwing);
    throwHadouken();

    // For 500ms after a click, new events will not cause ryu to change pose.
    refresh = noop;
    setTimeout(function () {
      refresh = refresh === noop ? refFun : refresh;
      // When the timeout ends, respond to changes that occured in that time.
      refresh();
    }, 500);
  }

  function release() {
    deactivate(throwing);
  }

  function hover() {
    activate(ready);
  }

  function leave() {
    deactivate(ready);
  }

  function activate(jq) {
    jq.addClass('active');
    refresh();
  }

  function deactivate(jq) {
    jq.removeClass('active');
    refresh();
  }

  function refresh() {
    ryu.addClass('hidden').filter('.active').first().removeClass('hidden');
  }

  function noop() {}

  function throwHadouken() {
    sound.fastSeek(0);
    sound.play();
    hadouken.clone()
      .removeAttr('id')
      .removeClass('hidden')
      .insertAfter(hadouken)
      .addClass('active')
      .on('webkitAnimationEnd oanimationend msAnimationEnd animationend',
        function () { $(this).remove(); });
  }

});