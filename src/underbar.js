/*jshint eqnull:true, expr:true*/

var _ = {};

(function() {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    return n === undefined ? array[array.length-1] : array.slice(array.length-n>=0 ? array.length-n : 0, array.length)
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i=0;i<collection.length;i++){
        iterator(collection[i], i, collection);
      }
    } else {
        for (var i in collection){
          iterator(collection[i], i, collection);
        }
      }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });
    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var aArray = [];
    _.each(collection, function(x){
      if (test(x)){
        aArray.push(x);
      }
    })
    return aArray;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(x){
      return !test(x);
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var aArray = []
    _.each(array.sort(), function(x, i){
      if(array[i+1]!=x){
        aArray.push(x);
      }
    })
    return aArray;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var aArray = [];
      _.each(collection, function(x){
        aArray.push(iterator(x));
      }
    )
    return aArray;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Calls the method named by functionOrKey on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    /*
    //This is the first implementation
    var aArray = [];
    for(var i=0;i<collection.length;i++){
      aArray.push(functionOrKey.apply(collection[i]))
    };
    return aArray;
    */
    return typeof functionOrKey==="function" ? _.map(collection,function(x){
      return functionOrKey.apply(x);
    }) : _.map(collection,function(x){
      return x[functionOrKey]();
    })

  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  _.reduce = function(collection, iterator, accumulator) {
    var answer = accumulator != undefined ? accumulator : collection[0];
    _.each(collection, function(x){
      answer = iterator(answer, x);
    })
    return answer;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(total, number){
       if(number === target) {
        return total + 1;
      } else {
        return total + 0;
      }
     }, 0)!=0;
    

  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
      return _.reduce(collection, function(total, number){
        if(iterator != undefined ? iterator(number) : number) {
          return total + 1;
        } else {
          return total + 0;
        }
      }, 0)===collection.length;
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    var answer = 0;
    _.each(collection, function(x){
      if (_.every([x],iterator)){
        answer++;
      }
    })
    return answer!=0;
    
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    _.each(arguments, function(x){
      _.each(x, function(i,j){
        obj[j] = i;
      })
    })
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    _.each(arguments, function(x){
      _.each(x, function(i,j){
        obj[j] = obj[j] === undefined ? i : obj[j];
      })
    })
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.

    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var preArg;
    var result;

    return function() {
      if (preArg != arguments[0]) {
        preArg = arguments[0];
        result = func.apply(this, arguments);
      }
      return result;
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var arg = [];
    for (var i=2;i<arguments.length;i++){
      arg.push(arguments[i]);
    };

    setTimeout(function(){func.apply(this, arg)},wait);

  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var aArray = array.slice();
    _.each(aArray, function(x,i){
      var j = Math.floor((Math.random()*(aArray.length-i)))+i;
        var temp = aArray[i]; 
        aArray[i]= aArray[j];
        aArray[j]= temp;
    })
      return aArray;
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    var aArray = [];

    _.each(collection, function(x, i){
      if(i===0) {
          aArray[i] = x;
        } else {
            for (var j = 0, len = aArray.length; j<len; j++) {
              var ix = typeof iterator === "function" ? iterator(x) : x[iterator];
              var ij = typeof iterator === "function" ? iterator(aArray[j]) : aArray[j][iterator];
              if (ix < ij && ix != undefined){
                aArray.splice(j,0,x);
                break;
              } else if (ix === undefined){
                aArray.push(x);
                break;
              } else if (ij === undefined){
                aArray.splice(j,0,x);
                break;
              } else if (j===aArray.length-1) {
                aArray.push(x)
                break;
              } 
            }
          }
    })
    return aArray;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var length = 0;
    
    for (var i=0; i<arguments.length; i++) {
      length = length > arguments[i].length ? length : arguments[i].length;
    }    

    var aArray = new Array(length);

    for (var i=0; i<length; i++){
      aArray[i] = _.pluck(arguments, i);
    }

    return aArray;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    var answer = result || [];

      _.each(nestedArray, function(x){
        if(Array.isArray(x)) {
          _.flatten(x,answer);
        } else {
          answer.push(x);
        }
      })

    return answer;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var answer = [];
    var list = _.uniq(_.flatten(arguments,[]));
    var oArg = arguments;

    _.each(list, function(x){
      var isContained = true;
      _.each(oArg, function(y){
        if(!_.contains(y,x)){
          isContained = false;
        }
      })
      if(isContained) {
        answer.push(x);
      }
    })

    return answer;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var answer = [];
    var list = _.uniq(arguments[0]);
    var oArg = arguments;

    _.each(list, function(x){
      var isContained = false;
      _.each(oArg, function(y,i){
        if(_.contains(y,x) && i!=0){
          isContained = true;
        }
      })
      if(!isContained) {
        answer.push(x);
      }
    })

    return answer;
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
    
    var alreadyCalled = false;
    var result;

    return function(){
      if(!alreadyCalled){
        result = func.apply(this,arguments);
        alreadyCalled = true;
        setTimeout(function(){
            alreadyCalled = false;
          },wait)
      } else {
        _.delay(function(){
          result = func.apply(this.arguments);
          alreadyCalled = true;
          return result;
        },wait)
      }
      return result;
    }
  
  };


}).call(this);
