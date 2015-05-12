function makeThing(n) {
  return function(done) {
    setTimeout(function() {
      console.log('thing '+n+' done!')
      done()
    }, 150)
  }
}

var thing1 = makeThing(1)
var thing2 = makeThing(2)
var thing3 = makeThing(3)
var thing4 = makeThing(4)
var thing5 = makeThing(5)

function parallel1(function1) {
  return function() {
    var promise1 = new $.Deferred();
    function1(promise1.resolve)

    return $.when(promise1);
  }
}

function parallel2(function1, function2) {
  return function() {
    var promise1 = new $.Deferred();
    function1(promise1.resolve)

    var promise2 = new $.Deferred();
    function2(promise2.resolve)

    return $.when(promise1, promise2);
  }
}

function parallel3(function1, function2, function3) {
  return function() {
    var promise1 = new $.Deferred();
    function1(promise1.resolve)

    var promise2 = new $.Deferred();
    function2(promise2.resolve)

    var promise3 = new $.Deferred();
    function3(promise3.resolve)

    return $.when(promise1, promise2, promise3)
  }
}



function sequence1(function1) {
  return function() {
    var promise = new $.Deferred();
    function1(promise.resolve)

    return promise1
  }
}

function sequence2(function1, function2) {
  return function() {

    var promise1 = $.Deferred()
    var nothing = function1(promise1.resolve)
    var promise2 = $.Deferred()
    promise1.then(function2.bind(function2, promise2.resolve))
    return promise2;
  }
}

function sequence5(function1, function2, function3, function4, function5) {
  return function() {

    var promise1 = $.Deferred()
    var boundFunction1 = function1.bind(function1, promise1.resolve)

    var promise2 = $.Deferred()
    var boundFunction2 = function2.bind(function2, promise2.resolve)
    
    var promise3 = $.Deferred()
    var boundFunction3 = function3.bind(function3, promise3.resolve)

    var promise4 = $.Deferred()
    var boundFunction4 = function4.bind(function4, promise4.resolve)

    var promise5 = $.Deferred()
    var boundFunction5 = function5.bind(function5, promise5.resolve)

    // these functions need to return promises, which need to resolve later.
    // right now, they're just waiting for promise1 to resolve.
    // boundFunction1(boundFunction2(boundFunction3(boundFunction4(boundFunction5))))
    boundFunction5(boundFunction4(boundFunction3(boundFunction2(boundFunction1(noOp)))))
    // startChain()

    // return promise3;
  }
}

function noOp() {}

// function sequence4(function1, function2, function3) {
//   return function() {

//     var promise1 = $.Deferred()
//     var nothing = function1(promise1.resolve)
//     var promise2 = $.Deferred()
//     promise1.then(function2.bind(function2, promise2.resolve))
//     var promise3 = $.Deferred()
//     promise2.then(function3.bind(function3, promise3.resolve))
//     return promise3;
//   }
// }

// console.log(parallel2(thing1, thing2)())
// console.log(sequence2(thing1, thing2)())
console.log(sequence5(thing1, thing2, thing3, thing4, thing5)())
