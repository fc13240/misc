(function() {
  if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(fun /*, thisp*/ ) {
      var len = this.length >>> 0;
      if (typeof fun != "function")
        throw new TypeError();

      var thisp = arguments[1];
      for (var i = 0; i < len; i++) {
        if (i in this)
          fun.call(thisp, this[i], i, this);
      }
    };
  }
  if (!Array.prototype.filter) {
    Array.prototype.filter = function(fun /*, thisp*/ ) {
      var len = this.length >>> 0;
      if (typeof fun != "function")
        throw new TypeError();

      var res = [];
      var thisp = arguments[1];
      for (var i = 0; i < len; i++) {
        if (i in this) {
          var val = this[i]; // in case fun mutates this
          if (fun.call(thisp, val, i, this))
            res.push(val);
        }
      }

      return res;
    };
  }
  if (!Array.prototype.map) {
    Array.prototype.map = function(fun /*, thisp*/ ) {
      var len = this.length >>> 0;
      if (typeof fun != "function")
        throw new TypeError();

      var res = new Array(len);
      var thisp = arguments[1];
      for (var i = 0; i < len; i++) {
        if (i in this)
          res[i] = fun.call(thisp, this[i], i, this);
      }

      return res;
    };
  }
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(elt /*, from*/ ) {
      var len = this.length >>> 0;
      var from = Number(arguments[1]) || 0;
      from = (from < 0) ? Math.ceil(from) : Math.floor(from);
      if (from < 0)
        from += len;
      for (; from < len; from++) {
        if (from in this &&
          this[from] === elt)
          return from;
      }
      return -1;
    };
  }
  if (!Array.prototype.lastIndexOf) {
    Array.prototype.lastIndexOf = function(elt /*, from*/ ) {
      var len = this.length;

      var from = Number(arguments[1]);
      if (isNaN(from)) {
        from = len - 1;
      } else {
        from = (from < 0) ? Math.ceil(from) : Math.floor(from);
        if (from < 0)
          from += len;
        else if (from >= len)
          from = len - 1;
      }

      for (; from > -1; from--) {
        if (from in this &&
          this[from] === elt)
          return from;
      }
      return -1;
    };
  }
})();
(function() {
  if (!window.addEventListener) {
    if (window.attachEvent) {
      window.addEventListener = function(type, handler, isAdd) {
        window.attachEvent('on' + type, handler);
      }
    } else {
      window.addEventListener = function(type, handler, isAdd) {

      }
    }
  }
})();