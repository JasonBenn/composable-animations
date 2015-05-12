$(document).ready({

  var animations = {
    'sign-up': sequence(revealCard, wipeGlare),
    'use-card': sequence(
                  // parallel(moveCardToTopOfScreen, startTypingPurchases),
                  // cardSwipesDown, 
                  // playVideo,
                  // parallel(moveCardToTopOfScreen, nextBackgroundPhoto)
                ),
    'news-feed': cycleTreats
  };

  var resetAnimations = {
    'sign-up': parallel(hideCard, cancelWipeGlare),
    'use-card': stopTypingPurchases,
    'news-feed': cancelCycleTreats,
  };

  function moveCardToTopOfScreen(done) {
    $('.card').animate({
      left: '-18em', // TODO: make this work on any desktop screen size
      top: '-24em' // TODO: make this work on any desktop screen size
    }, 500, done); // TODO: tune this timing
  }

  // can choose to ignore done, or use it.
  // parallel: should ignore done, just trigger animation, return resolved promise.
  // sequence: should use done, return unresolved promise, done is promise.resolve.

  function cardSwipesDown(done) {
    $('.card').animate({
      left: '-18em', // TODO: make this work on any desktop screen size
      top: '60em' // TODO: make this work on any desktop screen size
    }, 500, done)
  }

  function playVideo() {}

  function nextBackgroundPhoto() {}

  // Animation functions

  // `parallel` takes a list of functions with the same signature and
  // returns a function with that signature. When called, it invokes
  // each of its functions simultaneously with the passed arguments.
  function parallel(/* funcs */) {
    var funcs = _.toArray(arguments);
    return function(/* args */) {
      var args = _.toArray(arguments);
      _.each(funcs, function(func) {
        func.apply(this, args);
      })
    }
  }

  // `sequence` takes a list of functions with the same signature and a
  // callback (i.e: evt, $panel, callback) and returns a function with
  // that signature (evt, $panel). Each passed function will invoke the
  // next as its callback, from left to right.
  function sequence(/* funcs */) {
    var funs = _.toArray(arguments);

    return function(/* args */) {
      var args = _.toArray(arguments);
      args.unshift(this);

      var originalFuns = funs;

      var boundFuns = originalFuns.map(function(fun) {
        return fun.bind.apply(fun, args)
      });

      var sequencedFun = function() {}

      while (boundFuns.length) {
        var nextToLastAnimation = boundFuns.pop();
        var longerSequencedFun = nextToLastAnimation.bind(this, sequencedFun);
        sequencedFun = longerSequencedFun;
      }

      sequencedFun()
    }
  }

  $('body').on('panelsnap:activate', function(evt, $section) {
    parallel(triggerAnimation, resetAllOtherAnimations)(evt, $section);
  });

});
