(function () {
    var goog$global = this;
    var goog$getObjectByName = function (a) {
        for (var a = a.split("."), b = goog$global, c; (c = a.shift());) {
            if (b[c] != null) {
                b = b[c];
            } else {
                return null;
            }
        }
        return b;
    };
    var goog$addSingletonGetter = function (a) {
        a.getInstance = function () {
            return a.lk || (a.lk = new a());
        };
    };
    var goog$typeOf = function (a) {
        var b = typeof a;
        if (b == "object") {
            if (a) {
                if (a instanceof Array) {
                    return "array";
                }
                if (a instanceof Object) {
                    return b;
                }
                var c = Object.prototype.toString.call(a);
                if (c == "[object Window]") {
                    return "object";
                }
                if (
                    c == "[object Array]" ||
                    (typeof a.length == "number" &&
                        typeof a.splice != "undefined" &&
                        typeof a.propertyIsEnumerable != "undefined" &&
                        !a.propertyIsEnumerable("splice"))
                ) {
                    return "array";
                }
                if (
                    c == "[object Function]" ||
                    (typeof a.call != "undefined" &&
                        typeof a.propertyIsEnumerable != "undefined" &&
                        !a.propertyIsEnumerable("call"))
                ) {
                    return "function";
                }
            } else {
                return "null";
            }
        } else if (b == "function" && typeof a.call == "undefined") {
            return "object";
        }
        return b;
    };
    var goog$isDef = function (a) {
        return a !== undefined;
    };
    var goog$isArray = function (a) {
        return goog$typeOf(a) == "array";
    };
    var goog$isArrayLike = function (a) {
        var b = goog$typeOf(a);
        return b == "array" || (b == "object" && typeof a.length == "number");
    };
    var goog$isString = function (a) {
        return typeof a == "string";
    };
    var ea = function (a) {
        return goog$typeOf(a) == "function";
    };
    var goog$isObject = function (a) {
        var b = typeof a;
        return (b == "object" && a != null) || b == "function";
    };
    var goog$getUid = function (a) {
        return a[goog$UID_PROPERTY_] || (a[goog$UID_PROPERTY_] = ++goog$uidCounter_);
    };
    var goog$UID_PROPERTY_ = "closure_uid_" + Math.floor(Math.random() * 2147483648).toString(36);
    var goog$uidCounter_ = 0;
    var goog$bindNative_ = function (a, b, c) {
        return a.call.apply(a.bind, arguments);
    };
    var goog$bindJs_ = function (a, b, c) {
        if (!a) {
            throw Error();
        }
        if (arguments.length > 2) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function () {
                var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, d);
                return a.apply(b, c);
            };
        }
        return function () {
            return a.apply(b, arguments);
        };
    };
    var goog$bind = function (a, b, c) {
        goog$bind =
            Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1
                ? goog$bindNative_
                : goog$bindJs_;
        return goog$bind.apply(null, arguments);
    };
    var goog$partial = function (a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function () {
            var b = Array.prototype.slice.call(arguments);
            b.unshift.apply(b, c);
            return a.apply(this, b);
        };
    };
    var goog$now =
        Date.now ||
        function () {
            return +new Date();
        };
    var goog$exportSymbol = function (a, b) {
        var c = a.split(".");
        var d = goog$global;
        if (!(c[0] in d) && d.execScript) {
            d.execScript("var " + c[0]);
        }
        for (var e; c.length && (e = c.shift());) {
            if (!c.length && goog$isDef(b)) {
                d[e] = b;
            } else {
                d = d[e] ? d[e] : (d[e] = {});
            }
        }
    };
    var goog$inherits = function (a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.b = b.prototype;
        a.prototype = new c();
        a.prototype.constructor = a;
    };
    Function.prototype.bind =
        Function.prototype.bind ||
        function (a, b) {
            if (arguments.length > 1) {
                var c = Array.prototype.slice.call(arguments, 1);
                c.unshift(this, a);
                return goog$bind.apply(null, c);
            }
            return goog$bind(this, a);
        };
    var goog$debug$Error = function (a) {
        this.stack = Error().stack || "";
        if (a) {
            this.message = "" + a;
        }
    };
    goog$inherits(goog$debug$Error, Error);
    goog$debug$Error.prototype.name = "CustomError";
    var goog$string$subs = function (a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = ("" + arguments[c]).replace(/\$/g, "$$$$");
            var a = a.replace(/\%s/, d);
        }
        return a;
    };
    var goog$string$encodeUriRegExp_ = /^[a-zA-Z0-9\-_.!~*'()]*$/;
    var goog$string$urlEncode = function (a) {
        a = "" + a;
        if (!goog$string$encodeUriRegExp_.test(a)) {
            return encodeURIComponent(a);
        } else {
            return a;
        }
    };
    var goog$string$htmlEscape = function (a) {
        if (!goog$string$allRe_.test(a)) {
            return a;
        }
        if (a.indexOf("&") != -1) {
            a = a.replace(goog$string$amperRe_, "&amp;");
        }
        if (a.indexOf("<") != -1) {
            a = a.replace(goog$string$ltRe_, "&lt;");
        }
        if (a.indexOf(">") != -1) {
            a = a.replace(goog$string$gtRe_, "&gt;");
        }
        if (a.indexOf('"') != -1) {
            a = a.replace(goog$string$quotRe_, "&quot;");
        }
        return a;
    };
    var goog$string$amperRe_ = /&/g;
    var goog$string$ltRe_ = /</g;
    var goog$string$gtRe_ = />/g;
    var goog$string$quotRe_ = /\"/g;
    var goog$string$allRe_ = /[&<>\"]/;
    var goog$string$hashCode = function (a) {
        var b = 0;
        for (var c = 0; c < a.length; ++c) {
            b = b * 31 + a.charCodeAt(c);
            b %= 4294967296;
        }
        return b;
    };
    var goog$string$toCamelCaseCache_ = {};
    var goog$string$toCamelCase = function (a) {
        return (
            goog$string$toCamelCaseCache_[a] ||
            (goog$string$toCamelCaseCache_[a] = ("" + a).replace(/\-([a-z])/g, function (a, c) {
                return c.toUpperCase();
            }))
        );
    };
    var goog$asserts$AssertionError = function (a, b) {
        b.unshift(a);
        goog$debug$Error.call(this, goog$string$subs.apply(null, b));
        b.shift();
    };
    goog$inherits(goog$asserts$AssertionError, goog$debug$Error);
    goog$asserts$AssertionError.prototype.name = "AssertionError";
    var goog$asserts$assert = function (a, b, c) {
        if (!a) {
            var d = Array.prototype.slice.call(arguments, 2);
            var e = "Assertion failed";
            if (b) {
                var e = e + (": " + b);
                var f = d;
            }
            throw new goog$asserts$AssertionError("" + e, f || []);
        }
    };
    var goog$asserts$fail = function (a, b) {
        throw new goog$asserts$AssertionError(
            "Failure" + (a ? ": " + a : ""),
            Array.prototype.slice.call(arguments, 1)
        );
    };
    var goog$array$ARRAY_PROTOTYPE_ = Array.prototype;
    var goog$array$indexOf = goog$array$ARRAY_PROTOTYPE_.indexOf
        ? function (a, b, c) {
              goog$asserts$assert(a.length != null);
              return goog$array$ARRAY_PROTOTYPE_.indexOf.call(a, b, c);
          }
        : function (a, b, c) {
              c = c == null ? 0 : c < 0 ? Math.max(0, a.length + c) : c;
              if (goog$isString(a)) {
                  if (!goog$isString(b) || b.length != 1) {
                      return -1;
                  } else {
                      return a.indexOf(b, c);
                  }
              }
              for (; c < a.length; c++) {
                  if (c in a && a[c] === b) {
                      return c;
                  }
              }
              return -1;
          };
    var goog$array$forEach = goog$array$ARRAY_PROTOTYPE_.forEach
        ? function (a, b, c) {
              goog$asserts$assert(a.length != null);
              goog$array$ARRAY_PROTOTYPE_.forEach.call(a, b, c);
          }
        : function (a, b, c) {
              for (var d = a.length, e = goog$isString(a) ? a.split("") : a, f = 0; f < d; f++) {
                  if (f in e) {
                      b.call(c, e[f], f, a);
                  }
              }
          };
    var goog$array$filter = goog$array$ARRAY_PROTOTYPE_.filter
        ? function (a, b, c) {
              goog$asserts$assert(a.length != null);
              return goog$array$ARRAY_PROTOTYPE_.filter.call(a, b, c);
          }
        : function (a, b, c) {
              for (var d = a.length, e = [], f = 0, h = goog$isString(a) ? a.split("") : a, j = 0; j < d; j++) {
                  if (j in h) {
                      var m = h[j];
                      if (b.call(c, m, j, a)) {
                          e[f++] = m;
                      }
                  }
              }
              return e;
          };
    var goog$array$map = goog$array$ARRAY_PROTOTYPE_.map
        ? function (a, b, c) {
              goog$asserts$assert(a.length != null);
              return goog$array$ARRAY_PROTOTYPE_.map.call(a, b, c);
          }
        : function (a, b, c) {
              for (var d = a.length, e = Array(d), f = goog$isString(a) ? a.split("") : a, h = 0; h < d; h++) {
                  if (h in f) {
                      e[h] = b.call(c, f[h], h, a);
                  }
              }
              return e;
          };
    var goog$array$some = goog$array$ARRAY_PROTOTYPE_.some
        ? function (a, b, c) {
              goog$asserts$assert(a.length != null);
              return goog$array$ARRAY_PROTOTYPE_.some.call(a, b, c);
          }
        : function (a, b, c) {
              for (var d = a.length, e = goog$isString(a) ? a.split("") : a, f = 0; f < d; f++) {
                  if (f in e && b.call(c, e[f], f, a)) {
                      return true;
                  }
              }
              return false;
          };
    var Ia = goog$array$ARRAY_PROTOTYPE_.every
        ? function (a, b, c) {
              goog$asserts$assert(a.length != null);
              return goog$array$ARRAY_PROTOTYPE_.every.call(a, b, c);
          }
        : function (a, b, c) {
              for (var d = a.length, e = goog$isString(a) ? a.split("") : a, f = 0; f < d; f++) {
                  if (f in e && !b.call(c, e[f], f, a)) {
                      return false;
                  }
              }
              return true;
          };
    var goog$array$contains = function (a, b) {
        return goog$array$indexOf(a, b) >= 0;
    };
    var Ka = function (a, b) {
        var c = goog$array$indexOf(a, b);
        if (c >= 0) {
            goog$asserts$assert(a.length != null);
            goog$array$ARRAY_PROTOTYPE_.splice.call(a, c, 1);
        }
    };
    var goog$array$concat = function (a) {
        return goog$array$ARRAY_PROTOTYPE_.concat.apply(goog$array$ARRAY_PROTOTYPE_, arguments);
    };
    var goog$array$toArray = function (a) {
        if (goog$isArray(a)) {
            return goog$array$concat(a);
        }
        var b = [];
        for (var c = 0, d = a.length; c < d; c++) {
            b[c] = a[c];
        }
        return b;
    };
    var goog$array$clone = function (a) {
        if (goog$isArray(a)) {
            return goog$array$concat(a);
        } else {
            return goog$array$toArray(a);
        }
    };
    var goog$array$extend = function (a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            var e;
            if (goog$isArray(d) || ((e = goog$isArrayLike(d)) && d.hasOwnProperty("callee"))) {
                a.push.apply(a, d);
            } else if (e) {
                var f = a.length;
                for (var h = d.length, j = 0; j < h; j++) {
                    a[f + j] = d[j];
                }
            } else {
                a.push(d);
            }
        }
    };
    var goog$array$splice = function (a, b, c, d) {
        goog$asserts$assert(a.length != null);
        goog$array$ARRAY_PROTOTYPE_.splice.apply(a, goog$array$slice(arguments, 1));
    };
    var goog$array$slice = function (a, b, c) {
        goog$asserts$assert(a.length != null);
        if (arguments.length <= 2) {
            return goog$array$ARRAY_PROTOTYPE_.slice.call(a, b);
        } else {
            return goog$array$ARRAY_PROTOTYPE_.slice.call(a, b, c);
        }
    };
    var goog$dom$defaultDomHelper_;
    var goog$dom$classes$get = function (a) {
        a = a.className;
        return (goog$isString(a) && a.match(/\S+/g)) || [];
    };
    var goog$dom$classes$add = function (a, b) {
        var c = goog$dom$classes$get(a);
        var d = goog$array$slice(arguments, 1);
        var e = c.length + d.length;
        goog$dom$classes$add_(c, d);
        a.className = c.join(" ");
        return c.length == e;
    };
    var goog$dom$classes$remove = function (a, b) {
        var c = goog$dom$classes$get(a);
        var d = goog$array$slice(arguments, 1);
        var e = goog$dom$classes$getDifference_(c, d);
        a.className = e.join(" ");
        return e.length == c.length - d.length;
    };
    var goog$dom$classes$add_ = function (a, b) {
        for (var c = 0; c < b.length; c++) {
            if (!goog$array$contains(a, b[c])) {
                a.push(b[c]);
            }
        }
    };
    var goog$dom$classes$getDifference_ = function (a, b) {
        return goog$array$filter(a, function (a) {
            return !goog$array$contains(b, a);
        });
    };
    var goog$dom$classes$has = function (a, b) {
        return goog$array$contains(goog$dom$classes$get(a), b);
    };
    var goog$dom$classes$enable = function (a, b, c) {
        if (c) {
            goog$dom$classes$add(a, b);
        } else {
            goog$dom$classes$remove(a, b);
        }
    };
    var goog$dom$classes$toggle = function (a, b) {
        var c = !goog$dom$classes$has(a, b);
        goog$dom$classes$enable(a, b, c);
        return c;
    };
    var goog$math$Coordinate = function (a, b) {
        this.x = goog$isDef(a) ? a : 0;
        this.y = goog$isDef(b) ? b : 0;
    };
    goog$math$Coordinate.prototype.S = function () {
        return new goog$math$Coordinate(this.x, this.y);
    };
    goog$math$Coordinate.prototype.toString = function () {
        return "(" + this.x + ", " + this.y + ")";
    };
    var goog$math$Coordinate$difference = function (a, b) {
        return new goog$math$Coordinate(a.x - b.x, a.y - b.y);
    };
    var goog$math$Size = function (a, b) {
        this.width = a;
        this.height = b;
    };
    goog$math$Size.prototype.S = function () {
        return new goog$math$Size(this.width, this.height);
    };
    goog$math$Size.prototype.toString = function () {
        return "(" + this.width + " x " + this.height + ")";
    };
    goog$math$Size.prototype.ceil = function () {
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this;
    };
    goog$math$Size.prototype.floor = function () {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this;
    };
    goog$math$Size.prototype.round = function () {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this;
    };
    goog$math$Size.prototype.scale = function (a) {
        this.width *= a;
        this.height *= a;
        return this;
    };
    var goog$object$forEach = function (a, b) {
        for (var c in a) {
            b.call(undefined, a[c], c, a);
        }
    };
    var ab = function () {
        var a = yt$getConfig("GUIDED_HELP_FLOWS");
        var b;
        for (b in a) {
            return b;
        }
    };
    var goog$object$getAnyValue = function (a) {
        for (var b in a) {
            return a[b];
        }
    };
    var cb = function (a) {
        var b = [];
        var c = 0;
        var d;
        for (d in a) {
            b[c++] = a[d];
        }
        return b;
    };
    var goog$object$getKeys = function (a) {
        var b = [];
        var c = 0;
        var d;
        for (d in a) {
            b[c++] = d;
        }
        return b;
    };
    var goog$object$findKey = function (a, b, c) {
        for (var d in a) {
            if (b.call(c, a[d], d, a)) {
                return d;
            }
        }
    };
    var goog$object$findValue = function (a, b) {
        var c = goog$object$findKey(a, b, undefined);
        return c && a[c];
    };
    var gb = function (a, b, c) {
        if (b in a) {
            throw Error('The object already contains the key "' + b + '"');
        }
        a[b] = c;
    };
    var goog$object$clone = function (a) {
        var b = {};
        var c;
        for (c in a) {
            b[c] = a[c];
        }
        return b;
    };
    var goog$object$PROTOTYPE_FIELDS_ =
        "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
    var goog$object$extend = function (a, b) {
        var c;
        var d;
        for (var e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d) {
                a[c] = d[c];
            }
            for (var f = 0; f < goog$object$PROTOTYPE_FIELDS_.length; f++) {
                c = goog$object$PROTOTYPE_FIELDS_[f];
                if (Object.prototype.hasOwnProperty.call(d, c)) {
                    a[c] = d[c];
                }
            }
        }
    };
    var goog$userAgent$detectedOpera_;
    var goog$userAgent$detectedIe_;
    var goog$userAgent$detectedWebkit_;
    var goog$userAgent$detectedMobile_;
    var goog$userAgent$detectedGecko_;
    var qb;
    var rb;
    var goog$userAgent$getUserAgentString = function () {
        if (goog$global.navigator) {
            return goog$global.navigator.userAgent;
        } else {
            return null;
        }
    };
    var goog$userAgent$getNavigator = function () {
        return goog$global.navigator;
    };
    goog$userAgent$detectedGecko_ =
        goog$userAgent$detectedMobile_ =
        goog$userAgent$detectedWebkit_ =
        goog$userAgent$detectedIe_ =
        goog$userAgent$detectedOpera_ =
            false;
    var ub;
    if ((ub = goog$userAgent$getUserAgentString())) {
        var goog$userAgent$init_$navigator = goog$userAgent$getNavigator();
        goog$userAgent$detectedOpera_ = ub.indexOf("Opera") == 0;
        goog$userAgent$detectedIe_ = !goog$userAgent$detectedOpera_ && ub.indexOf("MSIE") != -1;
        goog$userAgent$detectedMobile_ =
            (goog$userAgent$detectedWebkit_ = !goog$userAgent$detectedOpera_ && ub.indexOf("WebKit") != -1) &&
            ub.indexOf("Mobile") != -1;
        goog$userAgent$detectedGecko_ =
            !goog$userAgent$detectedOpera_ &&
            !goog$userAgent$detectedWebkit_ &&
            goog$userAgent$init_$navigator.product == "Gecko";
    }
    var goog$userAgent$OPERA = goog$userAgent$detectedOpera_;
    var goog$userAgent$IE = goog$userAgent$detectedIe_;
    var goog$userAgent$GECKO = goog$userAgent$detectedGecko_;
    var goog$userAgent$WEBKIT = goog$userAgent$detectedWebkit_;
    var goog$userAgent$MOBILE = goog$userAgent$detectedMobile_;
    var goog$userAgent$determinePlatform_$navigator = goog$userAgent$getNavigator();
    var goog$userAgent$PLATFORM =
        (goog$userAgent$determinePlatform_$navigator && goog$userAgent$determinePlatform_$navigator.platform) || "";
    qb = goog$userAgent$PLATFORM.indexOf("Mac") != -1;
    rb = goog$userAgent$PLATFORM.indexOf("Win") != -1;
    var goog$userAgent$detectedX11_ =
        !!goog$userAgent$getNavigator() && (goog$userAgent$getNavigator().appVersion || "").indexOf("X11") != -1;
    var Cb;
    a: {
        var Db = "";
        var goog$userAgent$determineVersion_$re;
        if (goog$userAgent$OPERA && goog$global.opera) {
            var goog$userAgent$determineVersion_$operaVersion = goog$global.opera.version;
            var Db =
                typeof goog$userAgent$determineVersion_$operaVersion == "function"
                    ? goog$userAgent$determineVersion_$operaVersion()
                    : goog$userAgent$determineVersion_$operaVersion;
        } else {
            if (goog$userAgent$GECKO) {
                goog$userAgent$determineVersion_$re = /rv\:([^\);]+)(\)|;)/;
            } else if (goog$userAgent$IE) {
                goog$userAgent$determineVersion_$re = /MSIE\s+([^\);]+)(\)|;)/;
            } else if (goog$userAgent$WEBKIT) {
                goog$userAgent$determineVersion_$re = /WebKit\/(\S+)/;
            }
            if (goog$userAgent$determineVersion_$re) {
                var goog$userAgent$determineVersion_$arr = goog$userAgent$determineVersion_$re.exec(
                    goog$userAgent$getUserAgentString()
                );
                var Db = goog$userAgent$determineVersion_$arr ? goog$userAgent$determineVersion_$arr[1] : "";
            }
        }
        if (goog$userAgent$IE) {
            var Hb;
            var goog$userAgent$getDocumentMode_$doc = goog$global.document;
            Hb = goog$userAgent$getDocumentMode_$doc ? goog$userAgent$getDocumentMode_$doc.documentMode : undefined;
            if (Hb > parseFloat(Db)) {
                Cb = "" + Hb;
                break a;
            }
        }
        Cb = Db;
    }
    var Jb = Cb;
    var Kb = {};
    var goog$userAgent$isVersion = function (a) {
        var b;
        if (!(b = Kb[a])) {
            b = 0;
            var c = ("" + Jb).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split(".");
            var d = ("" + a).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split(".");
            for (var e = Math.max(c.length, d.length), f = 0; b == 0 && f < e; f++) {
                var h = c[f] || "";
                var j = d[f] || "";
                var m = RegExp("(\\d*)(\\D*)", "g");
                var p = RegExp("(\\d*)(\\D*)", "g");
                do {
                    var z = m.exec(h) || ["", "", ""];
                    var A = p.exec(j) || ["", "", ""];
                    if (z[0].length == 0 && A[0].length == 0) {
                        break;
                    }
                    b =
                        ((z[1].length == 0 ? 0 : parseInt(z[1], 10)) < (A[1].length == 0 ? 0 : parseInt(A[1], 10))
                            ? -1
                            : (z[1].length == 0 ? 0 : parseInt(z[1], 10)) > (A[1].length == 0 ? 0 : parseInt(A[1], 10))
                              ? 1
                              : 0) ||
                        ((z[2].length == 0) < (A[2].length == 0)
                            ? -1
                            : (z[2].length == 0) > (A[2].length == 0)
                              ? 1
                              : 0) ||
                        (z[2] < A[2] ? -1 : z[2] > A[2] ? 1 : 0);
                } while (b == 0);
            }
            b = Kb[a] = b >= 0;
        }
        return b;
    };
    var goog$userAgent$isDocumentModeCache_ = {};
    var goog$userAgent$isDocumentMode = function (a) {
        return (
            goog$userAgent$isDocumentModeCache_[a] ||
            (goog$userAgent$isDocumentModeCache_[a] =
                goog$userAgent$IE && !!document.documentMode && document.documentMode >= a)
        );
    };
    var goog$dom$BrowserFeature$CAN_ADD_NAME_OR_TYPE_ATTRIBUTES =
        !goog$userAgent$IE || goog$userAgent$isDocumentMode(9);
    var Ob =
        (!goog$userAgent$GECKO && !goog$userAgent$IE) ||
        (goog$userAgent$IE && goog$userAgent$isDocumentMode(9)) ||
        (goog$userAgent$GECKO && goog$userAgent$isVersion("1.9.1"));
    var goog$dom$BrowserFeature$CAN_USE_INNER_TEXT = goog$userAgent$IE && !goog$userAgent$isVersion("9");
    var goog$dom$getDomHelper = function (a) {
        if (a) {
            return new goog$dom$DomHelper(goog$dom$getOwnerDocument(a));
        } else {
            return goog$dom$defaultDomHelper_ || (goog$dom$defaultDomHelper_ = new goog$dom$DomHelper());
        }
    };
    var goog$dom$getElement = function (a) {
        if (goog$isString(a)) {
            return document.getElementById(a);
        } else {
            return a;
        }
    };
    var Tb = function (a, b, c) {
        return goog$dom$getElementsByTagNameAndClass(a, b, c);
    };
    var goog$dom$getElementsByClass = function (a, b) {
        var c = b || document;
        if (goog$dom$canUseQuerySelector_(c)) {
            return c.querySelectorAll("." + a);
        } else if (c.getElementsByClassName) {
            return c.getElementsByClassName(a);
        } else {
            return goog$dom$getElementsByTagNameAndClass("*", a, b);
        }
    };
    var goog$dom$getElementByClass = function (a, b) {
        var c = b || document;
        var d = null;
        return (
            (d = goog$dom$canUseQuerySelector_(c) ? c.querySelector("." + a) : goog$dom$getElementsByClass(a, b)[0]) ||
            null
        );
    };
    var goog$dom$canUseQuerySelector_ = function (a) {
        return (
            a.querySelectorAll &&
            a.querySelector &&
            (!goog$userAgent$WEBKIT || goog$dom$isCss1CompatMode_(document) || goog$userAgent$isVersion("528"))
        );
    };
    var goog$dom$getElementsByTagNameAndClass = function (a, b, c) {
        c = c || document;
        a = a && a != "*" ? a.toUpperCase() : "";
        if (goog$dom$canUseQuerySelector_(c) && (a || b)) {
            return c.querySelectorAll(a + (b ? "." + b : ""));
        }
        if (b && c.getElementsByClassName) {
            c = c.getElementsByClassName(b);
            if (a) {
                var d = {};
                var e = 0;
                for (var f = 0, h; (h = c[f]); f++) {
                    if (a == h.nodeName) {
                        d[e++] = h;
                    }
                }
                d.length = e;
                return d;
            }
            return c;
        }
        c = c.getElementsByTagName(a || "*");
        if (b) {
            d = {};
            for (f = e = 0; (h = c[f]); f++) {
                a = h.className;
                if (typeof a.split == "function" && goog$array$contains(a.split(/\s+/), b)) {
                    d[e++] = h;
                }
            }
            d.length = e;
            return d;
        }
        return c;
    };
    var goog$dom$setProperties = function (a, b) {
        goog$object$forEach(b, function (b, d) {
            if (d == "style") {
                a.style.cssText = b;
            } else if (d == "class") {
                a.className = b;
            } else if (d == "for") {
                a.htmlFor = b;
            } else if (d in goog$dom$DIRECT_ATTRIBUTE_MAP_) {
                a.setAttribute(goog$dom$DIRECT_ATTRIBUTE_MAP_[d], b);
            } else if (d.lastIndexOf("aria-", 0) == 0) {
                a.setAttribute(d, b);
            } else {
                a[d] = b;
            }
        });
    };
    var goog$dom$DIRECT_ATTRIBUTE_MAP_ = {
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        colspan: "colSpan",
        rowspan: "rowSpan",
        valign: "vAlign",
        height: "height",
        width: "width",
        usemap: "useMap",
        frameborder: "frameBorder",
        maxlength: "maxLength",
        type: "type"
    };
    var goog$dom$getViewportSize_ = function (a) {
        var b = a.document;
        if (goog$userAgent$WEBKIT && !goog$userAgent$isVersion("500") && !goog$userAgent$MOBILE) {
            if (typeof a.innerHeight == "undefined") {
                a = window;
            }
            var b = a.innerHeight;
            var c = a.document.documentElement.scrollHeight;
            if (a == a.top && c < b) {
                b -= 15;
            }
            return new goog$math$Size(a.innerWidth, b);
        }
        a = goog$dom$isCss1CompatMode_(b) ? b.documentElement : b.body;
        return new goog$math$Size(a.clientWidth, a.clientHeight);
    };
    var goog$dom$createDom = function (a, b, c) {
        return goog$dom$createDom_(document, arguments);
    };
    var goog$dom$createDom_ = function (a, b) {
        var c = b[0];
        var d = b[1];
        if (!goog$dom$BrowserFeature$CAN_ADD_NAME_OR_TYPE_ATTRIBUTES && d && (d.name || d.type)) {
            c = ["<", c];
            if (d.name) {
                c.push(' name="', goog$string$htmlEscape(d.name), '"');
            }
            if (d.type) {
                c.push(' type="', goog$string$htmlEscape(d.type), '"');
                var e = {};
                goog$object$extend(e, d);
                d = e;
                delete d.type;
            }
            c.push(">");
            c = c.join("");
        }
        c = a.createElement(c);
        if (d) {
            if (goog$isString(d)) {
                c.className = d;
            } else if (goog$isArray(d)) {
                goog$dom$classes$add.apply(null, [c].concat(d));
            } else {
                goog$dom$setProperties(c, d);
            }
        }
        if (b.length > 2) {
            goog$dom$append_(a, c, b, 2);
        }
        return c;
    };
    var goog$dom$append_ = function (a, b, c, d) {
        function e(c) {
            if (c) {
                b.appendChild(goog$isString(c) ? a.createTextNode(c) : c);
            }
        }
        for (; d < c.length; d++) {
            var f = c[d];
            if (goog$isArrayLike(f) && (!goog$isObject(f) || !(f.nodeType > 0))) {
                goog$array$forEach(goog$dom$isNodeList(f) ? goog$array$toArray(f) : f, e);
            } else {
                e(f);
            }
        }
    };
    var goog$dom$htmlToDocumentFragment = function (a) {
        var b = document;
        var c = b.createElement("div");
        if (goog$userAgent$IE) {
            c.innerHTML = "<br>" + a;
            c.removeChild(c.firstChild);
        } else {
            c.innerHTML = a;
        }
        if (c.childNodes.length == 1) {
            return c.removeChild(c.firstChild);
        }
        for (a = b.createDocumentFragment(); c.firstChild;) {
            a.appendChild(c.firstChild);
        }
        return a;
    };
    var goog$dom$isCss1CompatMode_ = function (a) {
        return a.compatMode == "CSS1Compat";
    };
    var goog$dom$append = function (a, b) {
        goog$dom$append_(goog$dom$getOwnerDocument(a), a, arguments, 1);
    };
    var goog$dom$removeChildren = function (a) {
        for (var b; (b = a.firstChild);) {
            a.removeChild(b);
        }
    };
    var goog$dom$removeNode = function (a) {
        if (a && a.parentNode) {
            return a.parentNode.removeChild(a);
        } else {
            return null;
        }
    };
    var gc = function (a) {
        if (Ob && a.children != undefined) {
            return a.children;
        } else {
            return goog$array$filter(a.childNodes, function (a) {
                return a.nodeType == 1;
            });
        }
    };
    var goog$dom$getFirstElementChild = function (a) {
        if (a.firstElementChild != undefined) {
            return a.firstElementChild;
        } else {
            return hc(a.firstChild, true);
        }
    };
    var hc = function (a, b) {
        while (a && a.nodeType != 1) {
            a = b ? a.nextSibling : a.previousSibling;
        }
        return a;
    };
    var goog$dom$contains = function (a, b) {
        if (a.contains && b.nodeType == 1) {
            return a == b || a.contains(b);
        }
        if (typeof a.compareDocumentPosition != "undefined") {
            return a == b || Boolean(a.compareDocumentPosition(b) & 16);
        }
        while (b && a != b) {
            b = b.parentNode;
        }
        return b == a;
    };
    var goog$dom$getOwnerDocument = function (a) {
        if (a.nodeType == 9) {
            return a;
        } else {
            return a.ownerDocument || a.document;
        }
    };
    var goog$dom$setTextContent = function (a, b) {
        if ("textContent" in a) {
            a.textContent = b;
        } else if (a.firstChild && a.firstChild.nodeType == 3) {
            while (a.lastChild != a.firstChild) {
                a.removeChild(a.lastChild);
            }
            a.firstChild.data = b;
        } else {
            goog$dom$removeChildren(a);
            a.appendChild(goog$dom$getOwnerDocument(a).createTextNode(b));
        }
    };
    var goog$dom$findNode = function (a, b) {
        var c = [];
        if (goog$dom$findNodes_(a, b, c, true)) {
            return c[0];
        } else {
            return undefined;
        }
    };
    var goog$dom$findNodes_ = function (a, b, c, d) {
        if (a != null) {
            for (a = a.firstChild; a;) {
                if ((b(a) && (c.push(a), d)) || goog$dom$findNodes_(a, b, c, d)) {
                    return true;
                }
                a = a.nextSibling;
            }
        }
        return false;
    };
    var goog$dom$TAGS_TO_IGNORE_ = {
        SCRIPT: 1,
        STYLE: 1,
        HEAD: 1,
        IFRAME: 1,
        OBJECT: 1
    };
    var goog$dom$PREDEFINED_TAG_VALUES_ = {
        IMG: " ",
        BR: "\n"
    };
    var pc = function (a) {
        var b = a.getAttributeNode("tabindex");
        if (b && b.specified) {
            a = a.tabIndex;
            return typeof a == "number" && a >= 0 && a < 32768;
        } else {
            return false;
        }
    };
    var goog$dom$getTextContent_ = function (a, b, c) {
        if (!(a.nodeName in goog$dom$TAGS_TO_IGNORE_)) {
            if (a.nodeType == 3) {
                if (c) {
                    b.push(("" + a.nodeValue).replace(/(\r\n|\r|\n)/g, ""));
                } else {
                    b.push(a.nodeValue);
                }
            } else if (a.nodeName in goog$dom$PREDEFINED_TAG_VALUES_) {
                b.push(goog$dom$PREDEFINED_TAG_VALUES_[a.nodeName]);
            } else {
                for (a = a.firstChild; a;) {
                    goog$dom$getTextContent_(a, b, c);
                    a = a.nextSibling;
                }
            }
        }
    };
    var goog$dom$isNodeList = function (a) {
        if (a && typeof a.length == "number") {
            if (goog$isObject(a)) {
                return typeof a.item == "function" || typeof a.item == "string";
            }
            if (ea(a)) {
                return typeof a.item == "function";
            }
        }
        return false;
    };
    var goog$dom$getAncestorByTagNameAndClass = function (a, b, c) {
        var d = b ? b.toUpperCase() : null;
        return goog$dom$getAncestor(
            a,
            function (a) {
                return (!d || a.nodeName == d) && (!c || goog$dom$classes$has(a, c));
            },
            true
        );
    };
    var tc = function (a, b) {
        return goog$dom$getAncestorByTagNameAndClass(a, null, b);
    };
    var goog$dom$getAncestor = function (a, b, c, d) {
        if (!c) {
            a = a.parentNode;
        }
        for (var c = d == null, e = 0; a && (c || e <= d);) {
            if (b(a)) {
                return a;
            }
            a = a.parentNode;
            e++;
        }
        return null;
    };
    var goog$dom$DomHelper = function (a) {
        this.k = a || goog$global.document || document;
    };
    goog$dom$DomHelper.prototype.da = goog$dom$getDomHelper;
    goog$dom$DomHelper.prototype.a = function (a) {
        if (goog$isString(a)) {
            return this.k.getElementById(a);
        } else {
            return a;
        }
    };
    goog$dom$DomHelper.prototype.f = function (a, b) {
        return goog$dom$getElementByClass(a, b || this.k);
    };
    goog$dom$DomHelper.prototype.K = function (a, b, c) {
        return goog$dom$createDom_(this.k, arguments);
    };
    goog$dom$DomHelper.prototype.createElement = function (a) {
        return this.k.createElement(a);
    };
    goog$dom$DomHelper.prototype.createTextNode = function (a) {
        return this.k.createTextNode(a);
    };
    goog$dom$DomHelper.prototype.ng = function (a, b, c) {
        var d = this.k;
        var e = !!c;
        var c = ["<tr>"];
        for (var f = 0; f < b; f++) {
            c.push(e ? "<td>&nbsp;</td>" : "<td></td>");
        }
        c.push("</tr>");
        c = c.join("");
        b = ["<table>"];
        for (f = 0; f < a; f++) {
            b.push(c);
        }
        b.push("</table>");
        a = d.createElement("DIV");
        a.innerHTML = b.join("");
        return a.removeChild(a.firstChild);
    };
    var goog$dom$DomHelper$isCss1CompatMode = function (a) {
        return goog$dom$isCss1CompatMode_(a.k);
    };
    var goog$dom$DomHelper$getDocumentScroll = function (a) {
        var b = a.k;
        var a = !goog$userAgent$WEBKIT && goog$dom$isCss1CompatMode_(b) ? b.documentElement : b.body;
        var b = b.parentWindow || b.defaultView;
        return new goog$math$Coordinate(b.pageXOffset || a.scrollLeft, b.pageYOffset || a.scrollTop);
    };
    goog$dom$DomHelper.prototype.appendChild = function (a, b) {
        a.appendChild(b);
    };
    goog$dom$DomHelper.prototype.removeNode = goog$dom$removeNode;
    goog$dom$DomHelper.prototype.contains = goog$dom$contains;
    var wc = function () {};
    wc.prototype.ke = false;
    wc.prototype.w = function () {
        if (!this.ke) {
            this.ke = true;
            this.e();
        }
    };
    wc.prototype.e = function () {
        if (this.jk) {
            xc.apply(null, this.jk);
        }
    };
    var yc = function (a) {
        if (a && typeof a.w == "function") {
            a.w();
        }
    };
    var xc = function (a) {
        for (var b = 0, c = arguments.length; b < c; ++b) {
            var d = arguments[b];
            if (goog$isArrayLike(d)) {
                xc.apply(null, d);
            } else {
                yc(d);
            }
        }
    };
    var zc = function (a, b) {
        this.type = a;
        this.currentTarget = this.target = b;
    };
    goog$inherits(zc, wc);
    zc.prototype.e = function () {
        delete this.type;
        delete this.target;
        delete this.currentTarget;
    };
    zc.prototype.Za = false;
    zc.prototype.ac = true;
    zc.prototype.stopPropagation = function () {
        this.Za = true;
    };
    zc.prototype.preventDefault = function () {
        this.ac = false;
    };
    var Ac = function (a) {
        a.preventDefault();
    };
    var Bc = function (a) {
        Bc[" "](a);
        return a;
    };
    Bc[" "] = function () {};
    var Cc = !goog$userAgent$IE || goog$userAgent$isDocumentMode(9);
    var Dc = !goog$userAgent$IE || goog$userAgent$isDocumentMode(9);
    var Ec = goog$userAgent$IE && !goog$userAgent$isVersion("8");
    if (goog$userAgent$WEBKIT) {
        goog$userAgent$isVersion("528");
    }
    if (
        (!goog$userAgent$GECKO || !goog$userAgent$isVersion("1.9b")) &&
        (!goog$userAgent$IE || !goog$userAgent$isVersion("8")) &&
        (!goog$userAgent$OPERA || !goog$userAgent$isVersion("9.5"))
    ) {
        if (goog$userAgent$WEBKIT) {
            goog$userAgent$isVersion("528");
        }
    }
    if (!goog$userAgent$GECKO || !!goog$userAgent$isVersion("8")) {
        if (goog$userAgent$IE) {
            goog$userAgent$isVersion("9");
        }
    }
    var Fc = function (a, b) {
        if (a) {
            this.U(a, b);
        }
    };
    goog$inherits(Fc, zc);
    var Gc = [1, 4, 2];
    Fc.prototype.target = null;
    Fc.prototype.relatedTarget = null;
    Fc.prototype.offsetX = 0;
    Fc.prototype.offsetY = 0;
    Fc.prototype.clientX = 0;
    Fc.prototype.clientY = 0;
    Fc.prototype.screenX = 0;
    Fc.prototype.screenY = 0;
    Fc.prototype.button = 0;
    Fc.prototype.keyCode = 0;
    Fc.prototype.charCode = 0;
    Fc.prototype.ctrlKey = false;
    Fc.prototype.altKey = false;
    Fc.prototype.shiftKey = false;
    Fc.prototype.metaKey = false;
    Fc.prototype.re = false;
    Fc.prototype.L = null;
    Fc.prototype.U = function (a, b) {
        var c = (this.type = a.type);
        zc.call(this, c);
        this.target = a.target || a.srcElement;
        this.currentTarget = b;
        var d = a.relatedTarget;
        if (d) {
            if (goog$userAgent$GECKO) {
                var e;
                a: {
                    try {
                        Bc(d.nodeName);
                        e = true;
                        break a;
                    } catch (f) {}
                    e = false;
                }
                if (!e) {
                    d = null;
                }
            }
        } else if (c == "mouseover") {
            d = a.fromElement;
        } else if (c == "mouseout") {
            d = a.toElement;
        }
        this.relatedTarget = d;
        this.offsetX = goog$userAgent$WEBKIT || a.offsetX !== undefined ? a.offsetX : a.layerX;
        this.offsetY = goog$userAgent$WEBKIT || a.offsetY !== undefined ? a.offsetY : a.layerY;
        this.clientX = a.clientX !== undefined ? a.clientX : a.pageX;
        this.clientY = a.clientY !== undefined ? a.clientY : a.pageY;
        this.screenX = a.screenX || 0;
        this.screenY = a.screenY || 0;
        this.button = a.button;
        this.keyCode = a.keyCode || 0;
        this.charCode = a.charCode || (c == "keypress" ? a.keyCode : 0);
        this.ctrlKey = a.ctrlKey;
        this.altKey = a.altKey;
        this.shiftKey = a.shiftKey;
        this.metaKey = a.metaKey;
        this.re = qb ? a.metaKey : a.ctrlKey;
        this.state = a.state;
        this.L = a;
        delete this.ac;
        delete this.Za;
    };
    var Hc = function (a) {
        return (
            (Cc ? a.L.button == 0 : a.type == "click" ? true : !!(a.L.button & Gc[0])) &&
            (!goog$userAgent$WEBKIT || !qb || !a.ctrlKey)
        );
    };
    Fc.prototype.stopPropagation = function () {
        Fc.b.stopPropagation.call(this);
        if (this.L.stopPropagation) {
            this.L.stopPropagation();
        } else {
            this.L.cancelBubble = true;
        }
    };
    Fc.prototype.preventDefault = function () {
        Fc.b.preventDefault.call(this);
        var a = this.L;
        if (a.preventDefault) {
            a.preventDefault();
        } else {
            a.returnValue = false;
            if (Ec) {
                try {
                    if (a.ctrlKey || (a.keyCode >= 112 && a.keyCode <= 123)) {
                        a.keyCode = -1;
                    }
                } catch (b) {}
            }
        }
    };
    Fc.prototype.gb = function () {
        return this.L;
    };
    Fc.prototype.e = function () {
        Fc.b.e.call(this);
        this.relatedTarget = this.currentTarget = this.target = this.L = null;
    };
    var Ic = function () {};
    var Jc = 0;
    Ic.prototype.key = 0;
    Ic.prototype.Xa = false;
    Ic.prototype.Ke = false;
    Ic.prototype.U = function (a, b, c, d, e, f) {
        if (ea(a)) {
            this.vg = true;
        } else if (a && a.handleEvent && ea(a.handleEvent)) {
            this.vg = false;
        } else {
            throw Error("Invalid listener argument");
        }
        this.Bb = a;
        this.Xf = b;
        this.src = c;
        this.type = d;
        this.capture = !!e;
        this.Kc = f;
        this.Ke = false;
        this.key = ++Jc;
        this.Xa = false;
    };
    Ic.prototype.handleEvent = function (a) {
        if (this.vg) {
            return this.Bb.call(this.Kc || this.src, a);
        } else {
            return this.Bb.handleEvent.call(this.Bb, a);
        }
    };
    var Kc = {};
    var Lc = {};
    var Mc = {};
    var Nc = {};
    var P = function (a, b, c, d, e) {
        if (b) {
            if (goog$isArray(b)) {
                for (var f = 0; f < b.length; f++) {
                    P(a, b[f], c, d, e);
                }
                return null;
            }
            var d = !!d;
            var h = Lc;
            if (!(b in h)) {
                h[b] = {
                    n: 0,
                    aa: 0
                };
            }
            h = h[b];
            if (!(d in h)) {
                h[d] = {
                    n: 0,
                    aa: 0
                };
                h.n++;
            }
            var h = h[d];
            var j = goog$getUid(a);
            var m;
            h.aa++;
            if (h[j]) {
                m = h[j];
                for (f = 0; f < m.length; f++) {
                    h = m[f];
                    if (h.Bb == c && h.Kc == e) {
                        if (h.Xa) {
                            break;
                        }
                        return m[f].key;
                    }
                }
            } else {
                m = h[j] = [];
                h.n++;
            }
            f = Oc();
            f.src = a;
            h = new Ic();
            h.U(c, f, a, b, d, e);
            c = h.key;
            f.key = c;
            m.push(h);
            Kc[c] = h;
            if (!Mc[j]) {
                Mc[j] = [];
            }
            Mc[j].push(h);
            if (a.addEventListener) {
                if (a == goog$global || !a.Uf) {
                    a.addEventListener(b, f, d);
                }
            } else {
                a.attachEvent(b in Nc ? Nc[b] : (Nc[b] = "on" + b), f);
            }
            return c;
        }
        throw Error("Invalid event type");
    };
    var Oc = function () {
        var a = Pc;
        var b = Dc
            ? function (c) {
                  return a.call(b.src, b.key, c);
              }
            : function (c) {
                  c = a.call(b.src, b.key, c);
                  if (!c) {
                      return c;
                  }
              };
        return b;
    };
    var Qc = function (a, b, c, d, e) {
        if (goog$isArray(b)) {
            for (var f = 0; f < b.length; f++) {
                Qc(a, b[f], c, d, e);
            }
            return null;
        }
        a = P(a, b, c, d, e);
        Kc[a].Ke = true;
        return a;
    };
    var Rc = function (a, b, c, d, e) {
        if (goog$isArray(b)) {
            for (var f = 0; f < b.length; f++) {
                Rc(a, b[f], c, d, e);
            }
        } else {
            d = !!d;
            if ((a = Sc(a, b, d))) {
                for (f = 0; f < a.length; f++) {
                    if (a[f].Bb == c && a[f].capture == d && a[f].Kc == e) {
                        Tc(a[f].key);
                        break;
                    }
                }
            }
        }
    };
    var Tc = function (a) {
        if (!Kc[a]) {
            return false;
        }
        var b = Kc[a];
        if (b.Xa) {
            return false;
        }
        var c = b.src;
        var d = b.type;
        var e = b.Xf;
        var f = b.capture;
        if (c.removeEventListener) {
            if (c == goog$global || !c.Uf) {
                c.removeEventListener(d, e, f);
            }
        } else if (c.detachEvent) {
            c.detachEvent(d in Nc ? Nc[d] : (Nc[d] = "on" + d), e);
        }
        c = goog$getUid(c);
        e = Lc[d][f][c];
        if (Mc[c]) {
            var h = Mc[c];
            Ka(h, b);
            if (h.length == 0) {
                delete Mc[c];
            }
        }
        b.Xa = true;
        e.fg = true;
        Uc(d, f, c, e);
        delete Kc[a];
        return true;
    };
    var Uc = function (a, b, c, d) {
        if (!d.Sc && d.fg) {
            for (var e = 0, f = 0; e < d.length; e++) {
                if (d[e].Xa) {
                    d[e].Xf.src = null;
                } else {
                    if (e != f) {
                        d[f] = d[e];
                    }
                    f++;
                }
            }
            d.length = f;
            d.fg = false;
            if (f == 0) {
                delete Lc[a][b][c];
                Lc[a][b].n--;
                if (Lc[a][b].n == 0) {
                    delete Lc[a][b];
                    Lc[a].n--;
                }
                if (Lc[a].n == 0) {
                    delete Lc[a];
                }
            }
        }
    };
    var Vc = function (a) {
        var b;
        var c = 0;
        var d = b == null;
        b = !!b;
        if (a == null) {
            goog$object$forEach(Mc, function (a) {
                for (var e = a.length - 1; e >= 0; e--) {
                    var f = a[e];
                    if (d || b == f.capture) {
                        Tc(f.key);
                        c++;
                    }
                }
            });
        } else {
            a = goog$getUid(a);
            if (Mc[a]) {
                var a = Mc[a];
                for (var e = a.length - 1; e >= 0; e--) {
                    var f = a[e];
                    if (d || b == f.capture) {
                        Tc(f.key);
                        c++;
                    }
                }
            }
        }
    };
    var Sc = function (a, b, c) {
        var d = Lc;
        if (b in d && ((d = d[b]), c in d && ((d = d[c]), (a = goog$getUid(a)), d[a]))) {
            return d[a];
        } else {
            return null;
        }
    };
    var Xc = function (a, b, c, d, e) {
        var f = 1;
        var b = goog$getUid(b);
        if (a[b]) {
            a.aa--;
            a = a[b];
            if (a.Sc) {
                a.Sc++;
            } else {
                a.Sc = 1;
            }
            try {
                for (var h = a.length, j = 0; j < h; j++) {
                    var m = a[j];
                    if (m && !m.Xa) {
                        f &= Wc(m, e) !== false;
                    }
                }
            } finally {
                a.Sc--;
                Uc(c, d, b, a);
            }
        }
        return Boolean(f);
    };
    var Wc = function (a, b) {
        var c = a.handleEvent(b);
        if (a.Ke) {
            Tc(a.key);
        }
        return c;
    };
    var Pc = function (a, b) {
        if (!Kc[a]) {
            return true;
        }
        var c = Kc[a];
        var d = c.type;
        var e = Lc;
        if (!(d in e)) {
            return true;
        }
        var e = e[d];
        var f;
        var h;
        if (!Dc) {
            f = b || goog$getObjectByName("window.event");
            var j = true in e;
            var m = false in e;
            if (j) {
                if (f.keyCode < 0 || f.returnValue != undefined) {
                    return true;
                }
                a: {
                    var p = false;
                    if (f.keyCode == 0) {
                        try {
                            f.keyCode = -1;
                            break a;
                        } catch (z) {
                            p = true;
                        }
                    }
                    if (p || f.returnValue == undefined) {
                        f.returnValue = true;
                    }
                }
            }
            p = new Fc();
            p.U(f, this);
            f = true;
            try {
                if (j) {
                    var A = [];
                    for (var H = p.currentTarget; H; H = H.parentNode) {
                        A.push(H);
                    }
                    h = e[true];
                    h.aa = h.n;
                    for (var L = A.length - 1; !p.Za && L >= 0 && h.aa; L--) {
                        p.currentTarget = A[L];
                        f &= Xc(h, A[L], d, true, p);
                    }
                    if (m) {
                        h = e[false];
                        h.aa = h.n;
                        for (L = 0; !p.Za && L < A.length && h.aa; L++) {
                            p.currentTarget = A[L];
                            f &= Xc(h, A[L], d, false, p);
                        }
                    }
                } else {
                    f = Wc(c, p);
                }
            } finally {
                if (A) {
                    A.length = 0;
                }
                p.w();
            }
            return f;
        }
        d = new Fc(b, this);
        try {
            f = Wc(c, d);
        } finally {
            d.w();
        }
        return f;
    };
    var yt$dom$datasets$set = function (a, b, c) {
        if (a.dataset) {
            a.dataset[yt$dom$datasets$toCamelCase_(b)] = c;
        } else {
            a.setAttribute("data-" + b, c);
        }
    };
    var yt$dom$datasets$get = function (a, b) {
        if (a.dataset) {
            return a.dataset[yt$dom$datasets$toCamelCase_(b)];
        } else {
            return a.getAttribute("data-" + b);
        }
    };
    var yt$dom$datasets$remove = function (a, b) {
        if (a.dataset) {
            delete a.dataset[yt$dom$datasets$toCamelCase_(b)];
        } else {
            a.removeAttribute("data-" + b);
        }
    };
    var yt$dom$datasets$camelCaseCache_ = {};
    var yt$dom$datasets$toCamelCase_ = function (a) {
        return (
            yt$dom$datasets$camelCaseCache_[a] ||
            (yt$dom$datasets$camelCaseCache_[a] = ("" + a).replace(/\-([a-z])/g, function (a, c) {
                return c.toUpperCase();
            }))
        );
    };
    var yt$events$Event = function (a) {
        if ((a = a || goog$getObjectByName("window.event"))) {
            this.type = a.type;
            var b = a.target || a.srcElement;
            if (b && b.nodeType == 3) {
                b = b.parentNode;
            }
            this.target = b;
            if ((b = a.relatedTarget)) {
                try {
                    b = b.nodeName && b;
                } catch (c) {
                    b = null;
                }
            } else if (this.type == "mouseover") {
                b = a.fromElement;
            } else if (this.type == "mouseout") {
                b = a.toElement;
            }
            this.relatedTarget = b;
            this.data = a.data;
            this.source = a.source;
            this.origin = a.origin;
            this.state = a.state;
            this.clientX = a.clientX !== undefined ? a.clientX : a.pageX;
            this.clientY = a.clientY !== undefined ? a.clientY : a.pageY;
            if (a.pageX || a.pageY) {
                this.pageX = a.pageX;
                this.pageY = a.pageY;
            } else if ((a.clientX || a.clientY) && document.body && document.documentElement) {
                this.pageX = a.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                this.pageY = a.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }
            this.keyCode = a.keyCode ? a.keyCode : a.which;
            this.charCode = a.charCode || (this.type == "keypress" ? this.keyCode : 0);
            if (this.type.indexOf("touch") == 0) {
                this.touches = a.touches;
                this.changedTouches = a.changedTouches;
            }
            if (this.type.indexOf("gesture") == 0) {
                this.scale = a.scale;
                this.rotation = a.rotation;
            }
            this.L = a;
        }
    };
    yt$events$Event.prototype.type = "";
    yt$events$Event.prototype.target = null;
    yt$events$Event.prototype.relatedTarget = null;
    yt$events$Event.prototype.currentTarget = null;
    yt$events$Event.prototype.data = null;
    yt$events$Event.prototype.source = null;
    yt$events$Event.prototype.origin = null;
    yt$events$Event.prototype.state = null;
    yt$events$Event.prototype.keyCode = 0;
    yt$events$Event.prototype.charCode = 0;
    yt$events$Event.prototype.L = null;
    yt$events$Event.prototype.clientX = 0;
    yt$events$Event.prototype.clientY = 0;
    yt$events$Event.prototype.pageX = 0;
    yt$events$Event.prototype.pageY = 0;
    yt$events$Event.prototype.touches = null;
    yt$events$Event.prototype.changedTouches = null;
    yt$events$Event.prototype.preventDefault = function () {
        this.L.returnValue = false;
        if (this.L.preventDefault) {
            this.L.preventDefault();
        }
    };
    yt$events$Event.prototype.stopPropagation = function () {
        this.L.cancelBubble = true;
        if (this.L.stopPropagation) {
            this.L.stopPropagation();
        }
    };
    var yt$dom$getUid = function (a) {
        var b = a.__yt_uid_key;
        if (!b) {
            b = yt$dom$getNextId_();
            a.__yt_uid_key = b;
        }
        return b;
    };
    var yt$dom$getNextId_ = goog$getObjectByName("yt.dom.getNextId_");
    if (!yt$dom$getNextId_) {
        yt$dom$getNextId_ = function () {
            return ++ed;
        };
        goog$exportSymbol("yt.dom.getNextId_", yt$dom$getNextId_);
        var ed = 0;
    }
    var yt$dom$getAncestorByClass = function (a, b) {
        return goog$dom$getAncestorByTagNameAndClass(a, null, b);
    };
    var yt$dom$getFirstElementByTagNameAndClass = function (a, b, c) {
        a = goog$dom$getElementsByTagNameAndClass(a, b, c);
        if (a.length) {
            return a[0];
        } else {
            return null;
        }
    };
    var gd = function (a) {
        var a = goog$dom$htmlToDocumentFragment(a);
        var b = document.createDocumentFragment();
        b.appendChild(a);
        return b;
    };
    var yt$dom$getFullScreenElement = function () {
        var a = document;
        if ("fullScreenElement" in a) {
            return a.fullScreenElement;
        }
        if ("mozFullScreenElement" in a) {
            return a.mozFullScreenElement;
        }
        if ("msFullScreenElement" in a) {
            return a.msFullScreenElement;
        }
        if ("oFullScreenElement" in a) {
            return a.oFullScreenElement;
        }
        if ("webkitFullScreenElement" in a) {
            return a.webkitFullScreenElement;
        }
    };
    var yt$events$listeners_ = goog$getObjectByName("yt.events.listeners_") || {};
    goog$exportSymbol("yt.events.listeners_", yt$events$listeners_);
    var yt$events$counter_ = goog$getObjectByName("yt.events.counter_") || {
        count: 0
    };
    goog$exportSymbol("yt.events.counter_", yt$events$counter_);
    var yt$events$findListenerKey_ = function (a, b, c, d) {
        return goog$object$findKey(yt$events$listeners_, function (e) {
            return e[0] == a && e[1] == b && e[2] == c && e[4] == !!d;
        });
    };
    var yt$events$listen = function (a, b, c, d) {
        if (!a || (!a.addEventListener && !a.attachEvent)) {
            return "";
        }
        var d = !!d;
        var e = yt$events$findListenerKey_(a, b, c, d);
        if (e) {
            return e;
        }
        var e = ++yt$events$counter_.count + "";
        var f = function (b) {
            b = new yt$events$Event(b);
            b.currentTarget = a;
            return c.call(a, b);
        };
        yt$events$listeners_[e] = [a, b, c, f, d];
        if (a.addEventListener) {
            a.addEventListener(b, f, d);
        } else {
            a.attachEvent("on" + b, f);
        }
        return e;
    };
    var md = function (a, b, c, d) {
        return yt$events$delegate(a, "click", b, function (a) {
            return a.nodeName.toLowerCase() === c.toLowerCase() && (!d || goog$dom$classes$has(a, d));
        });
    };
    var yt$events$delegateByClass = function (a, b, c, d) {
        return yt$events$delegate(a, b, c, function (a) {
            return goog$dom$classes$has(a, d);
        });
    };
    var yt$events$delegate = function (a, b, c, d) {
        var e = a || document;
        return yt$events$listen(e, b, function (a) {
            var b = goog$dom$getAncestor(
                a.target,
                function (a) {
                    return a === e || d(a);
                },
                true
            );
            if (b && b !== e) {
                a.currentTarget = b;
                c.call(b, a);
            }
        });
    };
    var od = function (a, b, c) {
        if ((a = yt$events$findListenerKey_(a, b, c, false))) {
            yt$events$unlistenByKey(a);
        }
    };
    var yt$events$unlistenByKey = function (a) {
        if (typeof a == "string") {
            a = [a];
        }
        goog$array$forEach(a, function (a) {
            if (a in yt$events$listeners_) {
                var c = yt$events$listeners_[a];
                var d = c[0];
                var e = c[1];
                var f = c[3];
                var c = c[4];
                if (d.removeEventListener) {
                    d.removeEventListener(e, f, c);
                } else {
                    d.detachEvent("on" + e, f);
                }
                delete yt$events$listeners_[a];
            }
        });
    };
    var yt$events$simulateClick = function (a) {
        if (document.createEvent) {
            var b = document.createEvent("HTMLEvents");
            b.initEvent("click", true, true);
            a.dispatchEvent(b);
        } else {
            b = document.createEventObject();
            a.fireEvent("onclick", b);
        }
    };
    var yt$config_ = (window.yt && window.yt.config_) || {};
    goog$exportSymbol("yt.config_", yt$config_);
    goog$exportSymbol("yt.globals_", (window.yt && window.yt.globals_) || {});
    var yt$msgs_ = (window.yt && window.yt.msgs_) || {};
    goog$exportSymbol("yt.msgs_", yt$msgs_);
    var yt$timeouts_ = (window.yt && window.yt.timeouts_) || [];
    goog$exportSymbol("yt.timeouts_", yt$timeouts_);
    var yt$intervals_ = (window.yt && window.yt.intervals_) || [];
    goog$exportSymbol("yt.intervals_", yt$intervals_);
    var ud = function (a) {
        var b = arguments;
        if (b.length > 1) {
            var c = b[0];
            yt$config_[c] = b[1];
        } else {
            b = b[0];
            for (c in b) {
                yt$config_[c] = b[c];
            }
        }
    };
    var yt$getConfig = function (a) {
        if (a in yt$config_) {
            return yt$config_[a];
        } else {
            return undefined;
        }
    };
    var yt$setTimeout = function (a, b) {
        var c = window.setTimeout(a, b);
        yt$timeouts_.push(c);
        return c;
    };
    var yt$setInterval = function (a, b) {
        var c = window.setInterval(a, b);
        yt$intervals_.push(c);
        return c;
    };
    var yt$getMsg = function (a, b, c) {
        var d = b || {};
        if ((a = a in yt$msgs_ ? yt$msgs_[a] : c)) {
            for (var e in d) {
                a = a.replace(RegExp("\\$" + e, "gi"), function () {
                    return d[e];
                });
            }
        }
        return a;
    };
    var yt$IS_JSCRIPT_ = !!eval("/*@cc_on!@*/false");
    var zd = {};
    var Ad = function (a) {
        if (yt$getConfig("EVENTS_TRACKER_INSTALLED")) {
            var b = zd.feed_item_expanded;
            if (!b) {
                var c = window._gaq._getAsyncTracker("eventsPageTracker");
                if (!c) {
                    return;
                }
                window._gaq.push(function () {
                    b = c._createEventTracker("feed_item_expanded");
                    zd.feed_item_expanded = b;
                });
            }
            window._gaq.push(function () {
                b._trackEvent(a, undefined, undefined);
            });
        }
    };
    var yt$net$ping$images_ = {};
    var yt$net$ping$counter_ = 0;
    var yt$net$ping$send = function (a, b) {
        var c = new Image();
        var d = "" + yt$net$ping$counter_++;
        yt$net$ping$images_[d] = c;
        c.onload = c.onerror = function () {
            if (b && yt$net$ping$images_[d]) {
                b();
            }
            delete yt$net$ping$images_[d];
        };
        c.src = a;
        c = eval("null");
    };
    var goog$uri$utils$buildFromEncodedParts = function (a, b, c, d, e, f, h) {
        var j = [];
        if (a) {
            j.push(a, ":");
        }
        if (c) {
            j.push("//");
            if (b) {
                j.push(b, "@");
            }
            j.push(c);
            if (d) {
                j.push(":", d);
            }
        }
        if (e) {
            j.push(e);
        }
        if (f) {
            j.push("?", f);
        }
        if (h) {
            j.push("#", h);
        }
        return j.join("");
    };
    var goog$uri$utils$splitRe_ = RegExp(
        "^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([\\w\\d\\-\\u0100-\\uffff.%]*)(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$"
    );
    var goog$uri$utils$split = function (a) {
        if (goog$uri$utils$needsPhishingProtection_) {
            goog$uri$utils$needsPhishingProtection_ = false;
            var b = goog$global.location;
            if (b) {
                var c = b.href;
                if (c && (c = (c = goog$uri$utils$split(c)[3] || null) && decodeURIComponent(c)) && c != b.hostname) {
                    goog$uri$utils$needsPhishingProtection_ = true;
                    throw Error();
                }
            }
        }
        return a.match(goog$uri$utils$splitRe_);
    };
    var goog$uri$utils$needsPhishingProtection_ = goog$userAgent$WEBKIT;
    var goog$uri$utils$getHost = function () {
        var a = goog$uri$utils$split(document.location.href);
        return goog$uri$utils$buildFromEncodedParts(a[1], a[2], a[3], a[4]);
    };
    var goog$uri$utils$getPathAndAfter = function (a) {
        a = goog$uri$utils$split(a);
        return goog$uri$utils$buildFromEncodedParts(null, null, null, null, a[5], a[6], a[7]);
    };
    var Kd = function (a) {
        if (a[1]) {
            var b = a[0];
            var c = b.indexOf("#");
            if (c >= 0) {
                a.push(b.substr(c));
                a[0] = b = b.substr(0, c);
            }
            c = b.indexOf("?");
            if (c < 0) {
                a[1] = "?";
            } else if (c == b.length - 1) {
                a[1] = undefined;
            }
        }
        return a.join("");
    };
    var goog$uri$utils$buildQueryDataBufferFromMap_ = function (a, b) {
        for (var c in b) {
            var d = c;
            var e = b[c];
            var f = a;
            if (goog$isArray(e)) {
                for (var h = 0; h < e.length; h++) {
                    f.push("&", d);
                    if (e[h] !== "") {
                        f.push("=", goog$string$urlEncode(e[h]));
                    }
                }
            } else if (e != null) {
                f.push("&", d);
                if (e !== "") {
                    f.push("=", goog$string$urlEncode(e));
                }
            }
        }
        return a;
    };
    var yt$uri$parseQueryData = function (a) {
        if (a.charAt(0) == "?") {
            a = a.substr(1);
        }
        var a = a.split("&");
        var b = {};
        for (var c = 0, d = a.length; c < d; c++) {
            var e = a[c].split("=");
            if ((e.length == 1 && e[0]) || e.length == 2) {
                var f = e[0];
                var e = decodeURIComponent((e[1] || "").replace(/\+/g, " "));
                if (f in b) {
                    if (goog$isArray(b[f])) {
                        goog$array$extend(b[f], e);
                    } else {
                        b[f] = [b[f], e];
                    }
                } else {
                    b[f] = e;
                }
            }
        }
        return b;
    };
    var yt$uri$buildQueryData = function (a) {
        a = goog$uri$utils$buildQueryDataBufferFromMap_([], a);
        a[0] = "";
        return a.join("");
    };
    var yt$uri$setQueryData = function (a, b) {
        var c = a.split("?", 2);
        var a = c[0];
        var c = yt$uri$parseQueryData(c[1] || "");
        var d;
        for (d in b) {
            c[d] = b[d];
        }
        return Kd(goog$uri$utils$buildQueryDataBufferFromMap_([a], c));
    };
    var yt$tracking$share = function (a, b, c, d) {
        a = Kd(
            goog$uri$utils$buildQueryDataBufferFromMap_(["/sharing_services"], {
                name: a,
                v: b,
                locale: c,
                feature: d
            })
        );
        yt$net$ping$send(a);
    };
    var goog$iter$StopIteration = "StopIteration" in goog$global ? goog$global.StopIteration : Error("StopIteration");
    var goog$iter$Iterator = function () {};
    goog$iter$Iterator.prototype.next = function () {
        throw goog$iter$StopIteration;
    };
    goog$iter$Iterator.prototype.ik = function () {
        return this;
    };
    var Sd = function (a) {
        if (typeof a.Ka == "function") {
            return a.Ka();
        }
        if (goog$isString(a)) {
            return a.split("");
        }
        if (goog$isArrayLike(a)) {
            var b = [];
            for (var c = a.length, d = 0; d < c; d++) {
                b.push(a[d]);
            }
            return b;
        }
        return cb(a);
    };
    var Td = function (a, b, c) {
        if (typeof a.forEach == "function") {
            a.forEach(b, c);
        } else if (goog$isArrayLike(a) || goog$isString(a)) {
            goog$array$forEach(a, b, c);
        } else {
            var d;
            if (typeof a.bb == "function") {
                d = a.bb();
            } else if (typeof a.Ka != "function") {
                if (goog$isArrayLike(a) || goog$isString(a)) {
                    d = [];
                    for (var e = a.length, f = 0; f < e; f++) {
                        d.push(f);
                    }
                } else {
                    d = goog$object$getKeys(a);
                }
            } else {
                d = undefined;
            }
            var e = Sd(a);
            for (var f = e.length, h = 0; h < f; h++) {
                b.call(c, e[h], d && d[h], a);
            }
        }
    };
    var goog$structs$Map = function (a, b) {
        this.ba = {};
        this.r = [];
        var c = arguments.length;
        if (c > 1) {
            if (c % 2) {
                throw Error("Uneven number of arguments");
            }
            for (var d = 0; d < c; d += 2) {
                this.set(arguments[d], arguments[d + 1]);
            }
        } else if (a) {
            if (a instanceof goog$structs$Map) {
                c = a.bb();
                d = a.Ka();
            } else {
                c = goog$object$getKeys(a);
                d = cb(a);
            }
            for (var e = 0; e < c.length; e++) {
                this.set(c[e], d[e]);
            }
        }
    };
    goog$structs$Map.prototype.n = 0;
    goog$structs$Map.prototype.bc = 0;
    goog$structs$Map.prototype.Ka = function () {
        goog$structs$Map$cleanupKeysArray_(this);
        var a = [];
        for (var b = 0; b < this.r.length; b++) {
            a.push(this.ba[this.r[b]]);
        }
        return a;
    };
    goog$structs$Map.prototype.bb = function () {
        goog$structs$Map$cleanupKeysArray_(this);
        return this.r.concat();
    };
    goog$structs$Map.prototype.xa = function (a) {
        return goog$structs$Map$hasKey_(this.ba, a);
    };
    goog$structs$Map.prototype.clear = function () {
        this.ba = {};
        this.bc = this.n = this.r.length = 0;
    };
    goog$structs$Map.prototype.remove = function (a) {
        if (goog$structs$Map$hasKey_(this.ba, a)) {
            delete this.ba[a];
            this.n--;
            this.bc++;
            if (this.r.length > this.n * 2) {
                goog$structs$Map$cleanupKeysArray_(this);
            }
            return true;
        } else {
            return false;
        }
    };
    var goog$structs$Map$cleanupKeysArray_ = function (a) {
        if (a.n != a.r.length) {
            for (var b = 0, c = 0; b < a.r.length;) {
                var d = a.r[b];
                if (goog$structs$Map$hasKey_(a.ba, d)) {
                    a.r[c++] = d;
                }
                b++;
            }
            a.r.length = c;
        }
        if (a.n != a.r.length) {
            var e = {};
            var c = (b = 0);
            for (; b < a.r.length;) {
                d = a.r[b];
                if (!goog$structs$Map$hasKey_(e, d)) {
                    a.r[c++] = d;
                    e[d] = 1;
                }
                b++;
            }
            a.r.length = c;
        }
    };
    goog$structs$Map.prototype.get = function (a, b) {
        if (goog$structs$Map$hasKey_(this.ba, a)) {
            return this.ba[a];
        } else {
            return b;
        }
    };
    goog$structs$Map.prototype.set = function (a, b) {
        if (!goog$structs$Map$hasKey_(this.ba, a)) {
            this.n++;
            this.r.push(a);
            this.bc++;
        }
        this.ba[a] = b;
    };
    goog$structs$Map.prototype.S = function () {
        return new goog$structs$Map(this);
    };
    var goog$structs$Map$toObject = function (a) {
        goog$structs$Map$cleanupKeysArray_(a);
        var b = {};
        for (var c = 0; c < a.r.length; c++) {
            var d = a.r[c];
            b[d] = a.ba[d];
        }
        return b;
    };
    goog$structs$Map.prototype.ik = function (a) {
        goog$structs$Map$cleanupKeysArray_(this);
        var b = 0;
        var c = this.r;
        var d = this.ba;
        var e = this.bc;
        var f = this;
        var h = new goog$iter$Iterator();
        h.next = function () {
            while (true) {
                if (e != f.bc) {
                    throw Error("The map has changed since the iterator was created");
                }
                if (b >= c.length) {
                    throw goog$iter$StopIteration;
                }
                var h = c[b++];
                if (a) {
                    return h;
                } else {
                    return d[h];
                }
            }
        };
        return h;
    };
    var goog$structs$Map$hasKey_ = function (a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    };
    var goog$dom$forms$getFormDataMap = function (a) {
        var b = new goog$structs$Map();
        goog$dom$forms$getFormDataHelper_(a, b, goog$dom$forms$addFormDataToMap_);
        return b;
    };
    var goog$dom$forms$getFormDataString = function (a) {
        var b = [];
        goog$dom$forms$getFormDataHelper_(a, b, goog$dom$forms$addFormDataToStringBuffer_);
        return b.join("&");
    };
    var goog$dom$forms$getFormDataHelper_ = function (a, b, c) {
        for (var d = a.elements, e, f = 0; (e = d[f]); f++) {
            if (!e.disabled && e.tagName.toLowerCase() != "fieldset") {
                var h = e.name;
                switch (e.type.toLowerCase()) {
                    case "file":
                    case "submit":
                    case "reset":
                    case "button":
                        break;
                    case "select-multiple":
                        e = goog$dom$forms$getValue(e);
                        if (e != null) {
                            for (var j, m = 0; (j = e[m]); m++) {
                                c(b, h, j);
                            }
                        }
                        break;
                    default:
                        j = goog$dom$forms$getValue(e);
                        if (j != null) {
                            c(b, h, j);
                        }
                }
            }
        }
        d = a.getElementsByTagName("input");
        for (f = 0; (e = d[f]); f++) {
            if (e.form == a && e.type.toLowerCase() == "image") {
                h = e.name;
                c(b, h, e.value);
                c(b, h + ".x", "0");
                c(b, h + ".y", "0");
            }
        }
    };
    var goog$dom$forms$addFormDataToMap_ = function (a, b, c) {
        var d = a.get(b);
        if (!d) {
            d = [];
            a.set(b, d);
        }
        d.push(c);
    };
    var goog$dom$forms$addFormDataToStringBuffer_ = function (a, b, c) {
        a.push(encodeURIComponent(b) + "=" + encodeURIComponent(c));
    };
    var goog$dom$forms$getValue = function (a) {
        var b = a.type;
        if (!goog$isDef(b)) {
            return null;
        }
        switch (b.toLowerCase()) {
            case "checkbox":
            case "radio":
                if (a.checked) {
                    return a.value;
                } else {
                    return null;
                }
            case "select-one":
                b = a.selectedIndex;
                if (b >= 0) {
                    return a.options[b].value;
                } else {
                    return null;
                }
            case "select-multiple":
                var b = [];
                for (var c, d = 0; (c = a.options[d]); d++) {
                    if (c.selected) {
                        b.push(c.value);
                    }
                }
                if (b.length) {
                    return b;
                } else {
                    return null;
                }
            default:
                if (goog$isDef(a.value)) {
                    return a.value;
                } else {
                    return null;
                }
        }
    };
    var goog$json$parse = function (a) {
        a = "" + a;
        if (
            /^\s*$/.test(a)
                ? 0
                : /^[\],:{}\s\u2028\u2029]*$/.test(
                      a
                          .replace(/\\["\\\/bfnrtu]/g, "@")
                          .replace(
                              /"[^"\\\n\r\u2028\u2029\x00-\x08\x10-\x1f\x80-\x9f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                              "]"
                          )
                          .replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, "")
                  )
        ) {
            try {
                return eval("(" + a + ")");
            } catch (b) {}
        }
        throw Error("Invalid JSON string: " + a);
    };
    var goog$json$unsafeParse = function (a) {
        return eval("(" + a + ")");
    };
    var fe = function () {
        this.nd = undefined;
    };
    var goog$json$Serializer$serialize_ = function (a, b, c) {
        switch (typeof b) {
            case "string":
                goog$json$Serializer$serializeString_(b, c);
                break;
            case "number":
                c.push(isFinite(b) && !isNaN(b) ? b : "null");
                break;
            case "boolean":
                c.push(b);
                break;
            case "undefined":
                c.push("null");
                break;
            case "object":
                if (b == null) {
                    c.push("null");
                    break;
                }
                if (goog$isArray(b)) {
                    var d = b.length;
                    c.push("[");
                    var e = "";
                    for (var f = 0; f < d; f++) {
                        c.push(e);
                        e = b[f];
                        goog$json$Serializer$serialize_(a, a.nd ? a.nd.call(b, "" + f, e) : e, c);
                        e = ",";
                    }
                    c.push("]");
                    break;
                }
                c.push("{");
                d = "";
                for (f in b) {
                    if (Object.prototype.hasOwnProperty.call(b, f)) {
                        e = b[f];
                        if (typeof e != "function") {
                            c.push(d);
                            goog$json$Serializer$serializeString_(f, c);
                            c.push(":");
                            goog$json$Serializer$serialize_(a, a.nd ? a.nd.call(b, f, e) : e, c);
                            d = ",";
                        }
                    }
                }
                c.push("}");
                break;
            case "function":
                break;
            default:
                throw Error("Unknown type: " + typeof b);
        }
    };
    var goog$json$Serializer$charToJsonCharCache_ = {
        '"': '\\"',
        "\\": "\\\\",
        "/": "\\/",
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "\t": "\\t",
        "": "\\u000b"
    };
    var goog$json$Serializer$charsToReplace_ = /\uffff/.test("￿")
        ? /[\\\"\x00-\x1f\x7f-\uffff]/g
        : /[\\\"\x00-\x1f\x7f-\xff]/g;
    var goog$json$Serializer$serializeString_ = function (a, b) {
        b.push(
            '"',
            a.replace(goog$json$Serializer$charsToReplace_, function (a) {
                if (a in goog$json$Serializer$charToJsonCharCache_) {
                    return goog$json$Serializer$charToJsonCharCache_[a];
                }
                var b = a.charCodeAt(0);
                var e = "\\u";
                if (b < 16) {
                    e += "000";
                } else if (b < 256) {
                    e += "00";
                } else if (b < 4096) {
                    e += "0";
                }
                return (goog$json$Serializer$charToJsonCharCache_[a] = e + b.toString(16));
            }),
            '"'
        );
    };
    var ke = null;
    if (typeof XMLHttpRequest != "undefined") {
        ke = function () {
            return new XMLHttpRequest();
        };
    } else if (typeof ActiveXObject != "undefined") {
        ke = function () {
            return new ActiveXObject("Microsoft.XMLHTTP");
        };
    }
    var le = function (a, b, c, d, e) {
        var f = ke && ke();
        if ("open" in f) {
            f.onreadystatechange = function () {
                if ((f && "readyState" in f ? f.readyState : 0) == 4 && b) {
                    b(f);
                }
            };
            c = (c || "GET").toUpperCase();
            d = d || "";
            f.open(c, a, true);
            a = c == "POST";
            if (e) {
                for (var h in e) {
                    f.setRequestHeader(h, e[h]);
                    if (h.toLowerCase() == "content-type") {
                        a = false;
                    }
                }
            }
            if (a) {
                f.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }
            f.send(d);
        }
    };
    var yt$net$ajax$send = function (a, b) {
        var c = b.format || "JSON";
        if (b.yi) {
            a = document.location.protocol + "//" + document.location.hostname + a;
        }
        var d = b.J;
        if (d) {
            a = yt$uri$setQueryData(a, d);
        }
        var e = b.of || "";
        if ((d = b.ea)) {
            e = yt$uri$parseQueryData(e);
            goog$object$extend(e, d);
            e = yt$uri$buildQueryData(e);
        }
        le(
            a,
            function (a) {
                var d;
                a: switch (a && "status" in a ? a.status : -1) {
                    case 0:
                    case 200:
                    case 204:
                    case 304:
                        d = true;
                        break a;
                    default:
                        d = false;
                }
                var e = null;
                if (d || (a.status >= 400 && a.status < 500)) {
                    e = yt$net$ajax$parseResponse_(c, a);
                }
                if (d) {
                    a: {
                        switch (c) {
                            case "XML":
                                d = parseInt(e && e.return_code, 10) == 0;
                                break a;
                            case "RAW":
                                d = true;
                                break a;
                        }
                        d = !!e;
                    }
                }
                var e = e || {};
                var m = b.T || goog$global;
                if (d) {
                    if (b.z) {
                        b.z.call(m, a, e);
                    }
                } else if (b.ka) {
                    b.ka.call(m, a, e);
                }
                if (b.ra) {
                    b.ra.call(m, a, e);
                }
            },
            b.method,
            e,
            b.headers
        );
    };
    var yt$net$ajax$parseResponse_ = function (a, b) {
        var c = null;
        switch (a) {
            case "JSON":
                var d = b.responseText;
                var e = b.getResponseHeader("Content-Type") || "";
                if (d && e.indexOf("json") >= 0) {
                    c = goog$json$unsafeParse(d);
                }
                break;
            case "XML":
                if ((d = (d = b.responseXML) ? yt$net$ajax$getRootNode(d) : null)) {
                    c = {};
                    goog$array$forEach(d.getElementsByTagName("*"), function (a) {
                        c[a.tagName] = yt$net$ajax$getTextContent_(a);
                    });
                }
        }
        return c;
    };
    var yt$net$ajax$getRootNode = function (a) {
        if (!a) {
            return null;
        } else if ((a = ("responseXML" in a ? a.responseXML : a).getElementsByTagName("root")) && a.length > 0) {
            return a[0];
        } else {
            return null;
        }
    };
    var yt$net$ajax$getTextContent_ = function (a) {
        var b = "";
        goog$array$forEach(a.childNodes, function (a) {
            b += a.nodeValue;
        });
        return b;
    };
    var yt$net$ajax$tokenMap_ = goog$getObjectByName("yt.net.ajax.tokenMap_") || {};
    goog$exportSymbol("yt.net.ajax.tokenMap_", yt$net$ajax$tokenMap_);
    var yt$net$delayed$registry_ = {};
    var yt$net$delayed$loaded_ = {};
    var yt$net$delayed$unregister = function (a, b) {
        var a = goog$dom$getElement(a);
        var c = b || goog$getUid(a);
        var d = yt$net$delayed$registry_[c];
        if (d) {
            yt$net$delayed$registry_[c] = goog$array$filter(d, function (b) {
                return b[0] != a;
            });
        }
    };
    var yt$net$delayed$load = function (a) {
        if (a in yt$net$delayed$registry_ && !yt$net$delayed$loaded_[a]) {
            goog$array$forEach(yt$net$delayed$registry_[a], function (a) {
                var c = a[0];
                var a = a[1];
                if (c && c.tagName == "IMG") {
                    c.onload = "";
                    c.src = a;
                }
            });
            yt$net$delayed$registry_[a] = [];
            yt$net$delayed$loaded_[a] = true;
        }
    };
    var goog$math$Box = function (a, b, c, d) {
        this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d;
    };
    goog$math$Box.prototype.S = function () {
        return new goog$math$Box(this.top, this.right, this.bottom, this.left);
    };
    goog$math$Box.prototype.toString = function () {
        return "(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)";
    };
    goog$math$Box.prototype.contains = function (a) {
        if (!this || !a) {
            return false;
        } else if (a instanceof goog$math$Box) {
            return a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom;
        } else {
            return a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom;
        }
    };
    var goog$math$Rect = function (a, b, c, d) {
        this.left = a;
        this.top = b;
        this.width = c;
        this.height = d;
    };
    goog$math$Rect.prototype.S = function () {
        return new goog$math$Rect(this.left, this.top, this.width, this.height);
    };
    goog$math$Rect.prototype.toString = function () {
        return "(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)";
    };
    goog$math$Rect.prototype.contains = function (a) {
        if (a instanceof goog$math$Rect) {
            return (
                this.left <= a.left &&
                this.left + this.width >= a.left + a.width &&
                this.top <= a.top &&
                this.top + this.height >= a.top + a.height
            );
        } else {
            return (
                a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height
            );
        }
    };
    goog$math$Rect.prototype.Zc = function () {
        return new goog$math$Size(this.width, this.height);
    };
    var xe = function (a, b, c) {
        if (goog$isString(b)) {
            goog$style$setStyle_(a, c, b);
        } else {
            goog$object$forEach(b, goog$partial(goog$style$setStyle_, a));
        }
    };
    var goog$style$setStyle_ = function (a, b, c) {
        a.style[goog$string$toCamelCase(c)] = b;
    };
    var goog$style$getComputedStyle = function (a, b) {
        var c = goog$dom$getOwnerDocument(a);
        if (c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(a, null))) {
            return c[b] || c.getPropertyValue(b);
        } else {
            return "";
        }
    };
    var goog$style$getCascadedStyle = function (a, b) {
        if (a.currentStyle) {
            return a.currentStyle[b];
        } else {
            return null;
        }
    };
    var goog$style$getStyle_ = function (a, b) {
        return goog$style$getComputedStyle(a, b) || goog$style$getCascadedStyle(a, b) || (a.style && a.style[b]);
    };
    var Ce = function (a, b, c) {
        var d;
        var e = goog$userAgent$GECKO && (qb || goog$userAgent$detectedX11_) && goog$userAgent$isVersion("1.9");
        if (b instanceof goog$math$Coordinate) {
            d = b.x;
            b = b.y;
        } else {
            d = b;
            b = c;
        }
        a.style.left = goog$style$getPixelStyleValue_(d, e);
        a.style.top = goog$style$getPixelStyleValue_(b, e);
    };
    var goog$style$getBoundingClientRect_ = function (a) {
        var b = a.getBoundingClientRect();
        if (goog$userAgent$IE) {
            a = a.ownerDocument;
            b.left -= a.documentElement.clientLeft + a.body.clientLeft;
            b.top -= a.documentElement.clientTop + a.body.clientTop;
        }
        return b;
    };
    var goog$style$getOffsetParent = function (a) {
        if (goog$userAgent$IE && !goog$userAgent$isDocumentMode(8)) {
            return a.offsetParent;
        }
        for (
            var b = goog$dom$getOwnerDocument(a),
                c = goog$style$getStyle_(a, "position"),
                d = c == "fixed" || c == "absolute",
                a = a.parentNode;
            a && a != b;
            a = a.parentNode
        ) {
            c = goog$style$getStyle_(a, "position");
            d = d && c == "static" && a != b.documentElement && a != b.body;
            if (
                !d &&
                (a.scrollWidth > a.clientWidth ||
                    a.scrollHeight > a.clientHeight ||
                    c == "fixed" ||
                    c == "absolute" ||
                    c == "relative")
            ) {
                return a;
            }
        }
        return null;
    };
    var goog$style$getVisibleRectForElement = function (a) {
        var b = new goog$math$Box(0, Infinity, Infinity, 0);
        var c = goog$dom$getDomHelper(a);
        var d = c.k.body;
        var e = c.k.documentElement;
        var f = !goog$userAgent$WEBKIT && goog$dom$isCss1CompatMode_(c.k) ? c.k.documentElement : c.k.body;
        for (; (a = goog$style$getOffsetParent(a));) {
            if (
                (!goog$userAgent$IE || a.clientWidth != 0) &&
                (!goog$userAgent$WEBKIT || a.clientHeight != 0 || a != d) &&
                a != d &&
                a != e &&
                goog$style$getStyle_(a, "overflow") != "visible"
            ) {
                var h = goog$style$getPageOffset(a);
                var j;
                j = a;
                if (goog$userAgent$GECKO && !goog$userAgent$isVersion("1.9")) {
                    var m = parseFloat(goog$style$getComputedStyle(j, "borderLeftWidth"));
                    if (goog$style$isRightToLeft(j)) {
                        var p =
                            j.offsetWidth -
                            j.clientWidth -
                            m -
                            parseFloat(goog$style$getComputedStyle(j, "borderRightWidth"));
                        var m = m + p;
                    }
                    j = new goog$math$Coordinate(m, parseFloat(goog$style$getComputedStyle(j, "borderTopWidth")));
                } else {
                    j = new goog$math$Coordinate(j.clientLeft, j.clientTop);
                }
                h.x += j.x;
                h.y += j.y;
                b.top = Math.max(b.top, h.y);
                b.right = Math.min(b.right, h.x + a.clientWidth);
                b.bottom = Math.min(b.bottom, h.y + a.clientHeight);
                b.left = Math.max(b.left, h.x);
            }
        }
        d = f.scrollLeft;
        f = f.scrollTop;
        b.left = Math.max(b.left, d);
        b.top = Math.max(b.top, f);
        c = goog$dom$getViewportSize_(c.k.parentWindow || c.k.defaultView || window);
        b.right = Math.min(b.right, d + c.width);
        b.bottom = Math.min(b.bottom, f + c.height);
        if (b.top >= 0 && b.left >= 0 && b.bottom > b.top && b.right > b.left) {
            return b;
        } else {
            return null;
        }
    };
    var goog$style$getPageOffset = function (a) {
        var b;
        var c = goog$dom$getOwnerDocument(a);
        var d = goog$style$getStyle_(a, "position");
        var e =
            goog$userAgent$GECKO &&
            c.getBoxObjectFor &&
            !a.getBoundingClientRect &&
            d == "absolute" &&
            (b = c.getBoxObjectFor(a)) &&
            (b.screenX < 0 || b.screenY < 0);
        var f = new goog$math$Coordinate(0, 0);
        var h;
        b = c ? (c.nodeType == 9 ? c : goog$dom$getOwnerDocument(c)) : document;
        h =
            goog$userAgent$IE &&
            !goog$userAgent$isDocumentMode(9) &&
            !goog$dom$DomHelper$isCss1CompatMode(goog$dom$getDomHelper(b))
                ? b.body
                : b.documentElement;
        if (a == h) {
            return f;
        }
        if (a.getBoundingClientRect) {
            b = goog$style$getBoundingClientRect_(a);
            a = goog$dom$DomHelper$getDocumentScroll(goog$dom$getDomHelper(c));
            f.x = b.left + a.x;
            f.y = b.top + a.y;
        } else if (c.getBoxObjectFor && !e) {
            b = c.getBoxObjectFor(a);
            a = c.getBoxObjectFor(h);
            f.x = b.screenX - a.screenX;
            f.y = b.screenY - a.screenY;
        } else {
            b = a;
            do {
                f.x += b.offsetLeft;
                f.y += b.offsetTop;
                if (b != a) {
                    f.x += b.clientLeft || 0;
                    f.y += b.clientTop || 0;
                }
                if (goog$userAgent$WEBKIT && goog$style$getStyle_(b, "position") == "fixed") {
                    f.x += c.body.scrollLeft;
                    f.y += c.body.scrollTop;
                    break;
                }
                b = b.offsetParent;
            } while (b && b != a);
            if (goog$userAgent$OPERA || (goog$userAgent$WEBKIT && d == "absolute")) {
                f.y -= c.body.offsetTop;
            }
            for (b = a; (b = goog$style$getOffsetParent(b)) && b != c.body && b != h;) {
                f.x -= b.scrollLeft;
                if (!goog$userAgent$OPERA || b.tagName != "TR") {
                    f.y -= b.scrollTop;
                }
            }
        }
        return f;
    };
    var goog$style$getClientPosition = function (a) {
        var b = new goog$math$Coordinate();
        if (a.nodeType == 1) {
            if (a.getBoundingClientRect) {
                a = goog$style$getBoundingClientRect_(a);
                b.x = a.left;
                b.y = a.top;
            } else {
                var c = goog$dom$DomHelper$getDocumentScroll(goog$dom$getDomHelper(a));
                var a = goog$style$getPageOffset(a);
                b.x = a.x - c.x;
                b.y = a.y - c.y;
            }
        } else {
            var c = ea(a.gb);
            var d = a;
            if (a.targetTouches) {
                d = a.targetTouches[0];
            } else if (c && a.gb().targetTouches) {
                d = a.gb().targetTouches[0];
            }
            b.x = d.clientX;
            b.y = d.clientY;
        }
        return b;
    };
    var Je = function (a, b) {
        var c;
        var d = goog$style$getPageOffset(a);
        if (b instanceof goog$math$Coordinate) {
            c = b.y;
            b = b.x;
        }
        Ce(a, a.offsetLeft + (b - d.x), a.offsetTop + (c - d.y));
    };
    var goog$style$getPixelStyleValue_ = function (a, b) {
        if (typeof a == "number") {
            a = (b ? Math.round(a) : a) + "px";
        }
        return a;
    };
    var goog$style$getSize = function (a) {
        if (goog$style$getStyle_(a, "display") != "none") {
            return goog$style$getSizeWithDisplay_(a);
        }
        var b = a.style;
        var c = b.display;
        var d = b.visibility;
        var e = b.position;
        b.visibility = "hidden";
        b.position = "absolute";
        b.display = "inline";
        a = goog$style$getSizeWithDisplay_(a);
        b.display = c;
        b.position = e;
        b.visibility = d;
        return a;
    };
    var goog$style$getSizeWithDisplay_ = function (a) {
        var b = a.offsetWidth;
        var c = a.offsetHeight;
        var d = goog$userAgent$WEBKIT && !b && !c;
        if ((!goog$isDef(b) || d) && a.getBoundingClientRect) {
            a = goog$style$getBoundingClientRect_(a);
            return new goog$math$Size(a.right - a.left, a.bottom - a.top);
        } else {
            return new goog$math$Size(b, c);
        }
    };
    var goog$style$getBounds = function (a) {
        var b = goog$style$getPageOffset(a);
        var a = goog$style$getSize(a);
        return new goog$math$Rect(b.x, b.y, a.width, a.height);
    };
    var Ne = function (a, b) {
        a.style.display = b ? "" : "none";
    };
    var goog$style$isRightToLeft = function (a) {
        return goog$style$getStyle_(a, "direction") == "rtl";
    };
    var Oe = goog$userAgent$GECKO ? "MozUserSelect" : goog$userAgent$WEBKIT ? "WebkitUserSelect" : null;
    var Pe = function (a, b, c) {
        c = !c ? a.getElementsByTagName("*") : null;
        if (Oe) {
            b = b ? "none" : "";
            a.style[Oe] = b;
            if (c) {
                for (var a = 0, d; (d = c[a]); a++) {
                    d.style[Oe] = b;
                }
            }
        } else if (goog$userAgent$IE || goog$userAgent$OPERA) {
            b = b ? "on" : "";
            a.setAttribute("unselectable", b);
            if (c) {
                for (a = 0; (d = c[a]); a++) {
                    d.setAttribute("unselectable", b);
                }
            }
        }
    };
    var goog$style$getIePixelValue_ = function (a, b) {
        if (/^\d+px?$/.test(b)) {
            return parseInt(b, 10);
        }
        var c = a.style.left;
        var d = a.runtimeStyle.left;
        a.runtimeStyle.left = a.currentStyle.left;
        a.style.left = b;
        var e = a.style.pixelLeft;
        a.style.left = c;
        a.runtimeStyle.left = d;
        return e;
    };
    var goog$style$ieBorderWidthKeywords_ = {
        thin: 2,
        medium: 4,
        thick: 6
    };
    var goog$style$getIePixelBorder_ = function (a, b) {
        if (goog$style$getCascadedStyle(a, b + "Style") == "none") {
            return 0;
        }
        var c = goog$style$getCascadedStyle(a, b + "Width");
        if (c in goog$style$ieBorderWidthKeywords_) {
            return goog$style$ieBorderWidthKeywords_[c];
        } else {
            return goog$style$getIePixelValue_(a, c);
        }
    };
    var yt$style$setDisplayed = function (a, b) {
        if ((a = goog$dom$getElement(a)) && a.style) {
            Ne(a, b);
            goog$dom$classes$enable(a, "hid", !b);
        }
    };
    var yt$style$isDisplayed = function (a) {
        a = goog$dom$getElement(a);
        if (!a) {
            return false;
        } else {
            return a.style.display != "none" && !goog$dom$classes$has(a, "hid");
        }
    };
    var Ve = function (a) {
        if ((a = goog$dom$getElement(a))) {
            if (yt$style$isDisplayed(a)) {
                Ne(a, false);
                goog$dom$classes$add(a, "hid");
            } else {
                Ne(a, true);
                goog$dom$classes$remove(a, "hid");
            }
        }
    };
    var yt$style$show = function (a) {
        goog$array$forEach(arguments, function (a) {
            yt$style$setDisplayed(a, true);
        });
    };
    var yt$style$hide = function (a) {
        goog$array$forEach(arguments, function (a) {
            yt$style$setDisplayed(a, false);
        });
    };
    var yt$www$thumbnaildelayload$loadImmediately = function (a) {
        yt$www$thumbnaildelayload$forEachThumb_(function (a, c) {
            var d = yt$dom$datasets$get(a, "group-key");
            if (d) {
                yt$net$delayed$unregister(a, d);
                yt$dom$datasets$remove(a, "group-key");
            }
            a.src = c;
        }, a);
    };
    var yt$www$thumbnaildelayload$forEachThumb_ = function (a, b) {
        var c = goog$dom$getElementsByTagNameAndClass("img", null, b);
        goog$array$forEach(c, function (b) {
            var c = yt$dom$datasets$get(b, "thumb");
            if (c) {
                a.call(goog$global, b, c);
            }
        });
    };
    var Ze = function (a, b) {
        yt$events$delegateByClass(a, "click", Ye, "feed-item-show-aggregate");
        if (b) {
            yt$events$delegateByClass(
                a,
                "click",
                function (a) {
                    a = tc(a.currentTarget, "feed-item") || a.currentTarget;
                    b.call(goog$global, a);
                    var d = tc(a, "feed-item-container");
                    if (d) {
                        goog$dom$removeNode(d);
                    } else {
                        goog$dom$removeNode(a);
                    }
                },
                "feed-item-remove"
            );
        }
    };
    var Ye = function (a) {
        var a = a.currentTarget;
        var b = tc(a, "feed-item");
        if (goog$dom$classes$toggle(b, "expanded")) {
            yt$www$thumbnaildelayload$loadImmediately(b);
            var b = yt$dom$datasets$get(a, "num-aggregated-actions") || 0;
            var c = yt$dom$datasets$get(a, "num-aggregated-users") || 0;
            var a = yt$dom$datasets$get(a, "num-aggregated-videos") || 0;
            var a = yt$uri$buildQueryData({
                actions: b,
                users: c,
                videos: a
            });
            Ad(a || "null");
            a = "a=feed_item_expanded" + (a ? "&" + a : "").replace(/\//g, "&");
            yt$net$ping$send("/gen_204?" + a, undefined);
        }
    };
    var af = function () {
        this.pg = goog$dom$getElement("activity-feeds-settings-button");
        if (!this.pg) {
            return null;
        }
        this.G = goog$dom$getElement("activity-feed-settings-form");
        if (!this.G) {
            return null;
        }
        this.lg = this.G.comment_mode;
        this.kg = {};
        $e(this);
        yt$events$listen(this.pg, "click", goog$bind(this.Fj, this));
        yt$events$delegateByClass(this.G, "click", goog$bind(this.mg, this), "cancel-edit-mode");
        yt$events$delegateByClass(this.G, "click", goog$bind(this.Ej, this), "apply-changes");
    };
    af.prototype.Ej = function (a) {
        a.preventDefault();
        var a = goog$structs$Map$toObject(goog$dom$forms$getFormDataMap(this.G));
        var b = this.G.getAttribute("action");
        goog$dom$classes$add(this.G, "busy");
        yt$net$ajax$send(b, {
            method: "POST",
            ea: a,
            z: goog$bind(this.mj, this)
        });
    };
    af.prototype.Fj = function (a) {
        a.preventDefault();
        if (yt$style$isDisplayed(this.G)) {
            this.mg();
        } else {
            yt$style$show(this.G);
        }
    };
    af.prototype.mj = function () {
        window.location.reload();
    };
    var $e = function (a) {
        goog$array$forEach(
            a.lg,
            function (a) {
                this.kg[goog$getUid(a)] = a.checked;
            },
            a
        );
    };
    var bf = function (a) {
        goog$array$forEach(
            a.lg,
            function (a) {
                a.checked = this.kg[goog$getUid(a)];
            },
            a
        );
    };
    af.prototype.mg = function () {
        yt$style$hide(this.G);
        bf(this);
    };
    var cf = function (a) {
        if (a) {
            this.c = a;
            this.Qc = goog$dom$getElementByClass("activity-feeds-container", a);
            this.cb = goog$dom$getElementByClass("add-bulletin-form", a);
            new af();
            Ze(this.Qc, goog$bind(this.Ui, this));
            yt$events$delegateByClass(this.Qc, "click", goog$bind(this.Vi, this), "remove-post");
            yt$events$delegateByClass(this.Qc, "click", goog$bind(this.Wi, this), "report-spam");
            yt$events$delegateByClass(this.Qc, "click", goog$bind(this.Si, this), "approve-comment");
            if (this.cb) {
                Qc(this.cb, "click", goog$bind(this.Ri, this));
                P(this.cb, "submit", goog$bind(this.Ti, this));
            }
        }
    };
    cf.prototype.Ri = function () {
        goog$dom$classes$add(this.cb, "activated");
    };
    cf.prototype.Ti = function (a) {
        a.preventDefault();
        a = goog$structs$Map$toObject(goog$dom$forms$getFormDataMap(this.cb));
        goog$dom$classes$add(this.cb, "loading");
        var b = {};
        b.SUCCESS = goog$bind(function () {
            window.location = yt$getConfig("RECENT_ACTIVITY_URL");
        }, this);
        b.ERROR = goog$bind(function () {
            goog$dom$classes$remove(this.cb, "loading");
        }, this);
        df(this, "add_bulletin", a, b);
    };
    cf.prototype.Ui = function (a) {
        df(
            this,
            "remove_post",
            {
                post_id: yt$dom$datasets$get(a, "external-id")
            },
            {}
        );
    };
    cf.prototype.Vi = function (a) {
        var b = tc(a.currentTarget, "post-item");
        df(
            this,
            "remove_post",
            {
                post_id: yt$dom$datasets$get(b, "post-id")
            },
            {
                SUCCESS: function () {
                    goog$dom$removeNode(b);
                }
            }
        );
    };
    cf.prototype.Wi = function (a) {
        var b = a.currentTarget;
        var a = goog$dom$getAncestorByTagNameAndClass(b, "li", "post-item");
        df(
            this,
            "report_spam",
            {
                post_id: yt$dom$datasets$get(a, "post-id")
            },
            {
                SUCCESS: function () {
                    goog$dom$classes$add(b, "yt-uix-button-toggled");
                }
            }
        );
    };
    cf.prototype.Si = function (a) {
        var a = goog$dom$getAncestorByTagNameAndClass(a.currentTarget, "li", "post-item");
        var b = goog$dom$getElementByClass("comment-pending-approval", a);
        df(
            this,
            "approve_comment",
            {
                post_id: yt$dom$datasets$get(a, "post-id")
            },
            {
                SUCCESS: function () {
                    goog$dom$removeNode(b);
                }
            }
        );
    };
    var df = function (a, b, c, d) {
        var e = {};
        e["action_" + b] = "1";
        c.channel_id = yt$getConfig("CHANNEL_ID");
        c.session_token = yt$net$ajax$tokenMap_.channel_ajax;
        c.module = yt$dom$datasets$get(a.c, "module-id");
        yt$net$ajax$send("/channel_ajax", {
            method: "POST",
            J: e,
            ea: c,
            z: function (a, b) {
                var c = goog$dom$getElement("recent-activity-alert-container");
                c.innerHTML = "";
                var e = d[b.code];
                if (e) {
                    e(b);
                }
                if (b.errors) {
                    e = goog$dom$getElement("recent-activity-alert-template").cloneNode(true);
                    ef(b.errors[0], e, c);
                }
            }
        });
    };
    var goog$pubsub$PubSub = function () {
        this.ha = [];
        this.ua = {};
    };
    goog$inherits(goog$pubsub$PubSub, wc);
    goog$pubsub$PubSub.prototype.wg = 1;
    goog$pubsub$PubSub.prototype.bd = 0;
    goog$pubsub$PubSub.prototype.Ig = function (a, b, c) {
        var d = this.ua[a];
        if (!d) {
            d = this.ua[a] = [];
        }
        var e = this.wg;
        this.ha[e] = a;
        this.ha[e + 1] = b;
        this.ha[e + 2] = c;
        this.wg = e + 3;
        d.push(e);
        return e;
    };
    goog$pubsub$PubSub.prototype.Je = function (a) {
        if (this.bd != 0) {
            if (!this.Vb) {
                this.Vb = [];
            }
            this.Vb.push(a);
            return false;
        }
        var b = this.ha[a];
        if (b) {
            var c = this.ua[b];
            if (c) {
                Ka(c, a);
            }
            delete this.ha[a];
            delete this.ha[a + 1];
            delete this.ha[a + 2];
        }
        return !!b;
    };
    goog$pubsub$PubSub.prototype.Hg = function (a, b) {
        var c = this.ua[a];
        if (c) {
            this.bd++;
            var d = goog$array$slice(arguments, 1);
            for (var e = 0, f = c.length; e < f; e++) {
                var h = c[e];
                this.ha[h + 1].apply(this.ha[h + 2], d);
            }
            this.bd--;
            if (this.Vb && this.bd == 0) {
                while ((c = this.Vb.pop())) {
                    this.Je(c);
                }
            }
            return e != 0;
        }
        return false;
    };
    goog$pubsub$PubSub.prototype.clear = function (a) {
        if (a) {
            var b = this.ua[a];
            if (b) {
                goog$array$forEach(b, this.Je, this);
                delete this.ua[a];
            }
        } else {
            this.ha.length = 0;
            this.ua = {};
        }
    };
    goog$pubsub$PubSub.prototype.e = function () {
        goog$pubsub$PubSub.b.e.call(this);
        delete this.ha;
        delete this.ua;
        delete this.Vb;
    };
    var yt$pubsub$instance_ = goog$getObjectByName("yt.pubsub.instance_") || new goog$pubsub$PubSub();
    goog$pubsub$PubSub.prototype.subscribe = goog$pubsub$PubSub.prototype.Ig;
    goog$pubsub$PubSub.prototype.unsubscribeByKey = goog$pubsub$PubSub.prototype.Je;
    goog$pubsub$PubSub.prototype.publish = goog$pubsub$PubSub.prototype.Hg;
    goog$pubsub$PubSub.prototype.clear = goog$pubsub$PubSub.prototype.clear;
    goog$exportSymbol("yt.pubsub.instance_", yt$pubsub$instance_);
    var hf = function (a, b, c) {
        var d = goog$getObjectByName("yt.pubsub.instance_");
        if (d) {
            d.subscribe(
                a,
                function () {
                    var a = arguments;
                    yt$setTimeout(function () {
                        b.apply(c || goog$global, a);
                    }, 0);
                },
                c
            );
        }
    };
    var jf = function (a, b) {
        var c = goog$getObjectByName("yt.pubsub.instance_");
        if (c) {
            c.publish.apply(c, arguments);
        }
    };
    var yt$tracking$conversion$getPingUrl_ = function (a, b) {
        if (a == "view" && b.convViewUrl) {
            return b.convViewUrl;
        }
        if (!b.baseUrl || !b.uid) {
            return null;
        }
        var c = b.rmktEnabled && b.vid;
        var d = b.focEnabled;
        if (!c && !d) {
            return null;
        }
        var e = {
            label: d ? "followon_" + a : "default"
        };
        if (c) {
            c = {
                utvid: b.vid,
                utuid: b.uid,
                type: a
            };
            if (b.eventLabel) {
                c.el = b.eventLabel;
            }
            if (b.pm) {
                c.ps = b.playerStyle;
            }
            var f = [];
            var h;
            for (h in c) {
                f.push(encodeURIComponent(h) + "=" + encodeURIComponent(c[h]));
            }
            e.data = f.join(";");
        }
        if (d) {
            e.foc_id = b.uid;
        }
        return Kd(goog$uri$utils$buildQueryDataBufferFromMap_([b.baseUrl], e));
    };
    var yt$tracking$conversion$ping = function (a) {
        var b = yt$getConfig("CONVERSION_CONFIG_DICT");
        if (b && (a = yt$tracking$conversion$getPingUrl_(a, b))) {
            yt$net$ping$send(a);
        }
    };
    var goog$positioning$positionAtAnchor = function (a, b, c, d, e, f, h) {
        var j;
        var m = c.offsetParent;
        if (m) {
            var p = m.tagName == "HTML" || m.tagName == "BODY";
            if (!p || goog$style$getStyle_(m, "position") != "static") {
                j = goog$style$getPageOffset(m);
                if (!p) {
                    j = goog$math$Coordinate$difference(j, new goog$math$Coordinate(m.scrollLeft, m.scrollTop));
                }
            }
        }
        m = goog$style$getBounds(a);
        if ((p = goog$style$getVisibleRectForElement(a))) {
            var z = new goog$math$Rect(p.left, p.top, p.right - p.left, p.bottom - p.top);
            var p = Math.max(m.left, z.left);
            var A = Math.min(m.left + m.width, z.left + z.width);
            if (p <= A) {
                var H = Math.max(m.top, z.top);
                var z = Math.min(m.top + m.height, z.top + z.height);
                if (H <= z) {
                    m.left = p;
                    m.top = H;
                    m.width = A - p;
                    m.height = z - H;
                }
            }
        }
        p = goog$dom$getDomHelper(a);
        H = goog$dom$getDomHelper(c);
        if (p.k != H.k) {
            var A = p.k.body;
            var H = H.k.parentWindow || H.k.defaultView;
            var z = new goog$math$Coordinate(0, 0);
            var L = goog$dom$getOwnerDocument(A)
                ? goog$dom$getOwnerDocument(A).parentWindow || goog$dom$getOwnerDocument(A).defaultView
                : window;
            var Ha = A;
            do {
                var pb = L == H ? goog$style$getPageOffset(Ha) : goog$style$getClientPosition(Ha);
                z.x += pb.x;
                z.y += pb.y;
            } while (L && L != H && (Ha = L.frameElement) && (L = L.parent));
            A = goog$math$Coordinate$difference(z, goog$style$getPageOffset(A));
            if (goog$userAgent$IE && !goog$dom$DomHelper$isCss1CompatMode(p)) {
                A = goog$math$Coordinate$difference(A, goog$dom$DomHelper$getDocumentScroll(p));
            }
            m.left += A.x;
            m.top += A.y;
        }
        a = (b & 4 && goog$style$isRightToLeft(a) ? b ^ 2 : b) & -5;
        b = new goog$math$Coordinate(a & 2 ? m.left + m.width : m.left, a & 1 ? m.top + m.height : m.top);
        if (j) {
            b = goog$math$Coordinate$difference(b, j);
        }
        if (e) {
            b.x += (a & 2 ? -1 : 1) * e.x;
            b.y += (a & 1 ? -1 : 1) * e.y;
        }
        var Na;
        if (h && (Na = goog$style$getVisibleRectForElement(c)) && j) {
            Na.top -= j.y;
            Na.right -= j.x;
            Na.bottom -= j.y;
            Na.left -= j.x;
        }
        return goog$positioning$positionAtCoordinate(b, c, d, f, Na, h, undefined);
    };
    var goog$positioning$positionAtCoordinate = function (a, b, c, d, e, f, h) {
        var a = a.S();
        var j = 0;
        var m = (c & 4 && goog$style$isRightToLeft(b) ? c ^ 2 : c) & -5;
        var c = goog$style$getSize(b);
        var h = h ? h.S() : c.S();
        if (d || m != 0) {
            if (m & 2) {
                a.x -= h.width + (d ? d.right : 0);
            } else if (d) {
                a.x += d.left;
            }
            if (m & 1) {
                a.y -= h.height + (d ? d.bottom : 0);
            } else if (d) {
                a.y += d.top;
            }
        }
        if (f) {
            if (e) {
                j = a;
                d = 0;
                if ((f & 65) == 65 && (j.x < e.left || j.x >= e.right)) {
                    f &= -2;
                }
                if ((f & 132) == 132 && (j.y < e.top || j.y >= e.bottom)) {
                    f &= -5;
                }
                if (j.x < e.left && f & 1) {
                    j.x = e.left;
                    d |= 1;
                }
                if (j.x < e.left && j.x + h.width > e.right && f & 16) {
                    h.width = Math.max(h.width - (j.x + h.width - e.right), 0);
                    d |= 4;
                }
                if (j.x + h.width > e.right && f & 1) {
                    j.x = Math.max(e.right - h.width, e.left);
                    d |= 1;
                }
                if (f & 2) {
                    d |= (j.x < e.left ? 16 : 0) | (j.x + h.width > e.right ? 32 : 0);
                }
                if (j.y < e.top && f & 4) {
                    j.y = e.top;
                    d |= 2;
                }
                if (j.y >= e.top && j.y + h.height > e.bottom && f & 32) {
                    h.height = Math.max(h.height - (j.y + h.height - e.bottom), 0);
                    d |= 8;
                }
                if (j.y + h.height > e.bottom && f & 4) {
                    j.y = Math.max(e.bottom - h.height, e.top);
                    d |= 2;
                }
                if (f & 8) {
                    d |= (j.y < e.top ? 64 : 0) | (j.y + h.height > e.bottom ? 128 : 0);
                }
                j = d;
            } else {
                j = 256;
            }
            if (j & 496) {
                return j;
            }
        }
        Ce(b, a);
        if (c != h && !(!c || !h ? 0 : c.width == h.width && c.height == h.height)) {
            e = goog$dom$DomHelper$isCss1CompatMode(goog$dom$getDomHelper(goog$dom$getOwnerDocument(b)));
            if (goog$userAgent$IE && (!e || !goog$userAgent$isVersion("8"))) {
                a = b.style;
                if (e) {
                    if (goog$userAgent$IE) {
                        e = goog$style$getIePixelValue_(b, goog$style$getCascadedStyle(b, "paddingLeft"));
                        c = goog$style$getIePixelValue_(b, goog$style$getCascadedStyle(b, "paddingRight"));
                        f = goog$style$getIePixelValue_(b, goog$style$getCascadedStyle(b, "paddingTop"));
                        d = goog$style$getIePixelValue_(b, goog$style$getCascadedStyle(b, "paddingBottom"));
                        e = new goog$math$Box(f, c, d, e);
                    } else {
                        e = goog$style$getComputedStyle(b, "paddingLeft");
                        c = goog$style$getComputedStyle(b, "paddingRight");
                        f = goog$style$getComputedStyle(b, "paddingTop");
                        d = goog$style$getComputedStyle(b, "paddingBottom");
                        e = new goog$math$Box(parseFloat(f), parseFloat(c), parseFloat(d), parseFloat(e));
                    }
                    if (goog$userAgent$IE) {
                        c = goog$style$getIePixelBorder_(b, "borderLeft");
                        f = goog$style$getIePixelBorder_(b, "borderRight");
                        d = goog$style$getIePixelBorder_(b, "borderTop");
                        b = goog$style$getIePixelBorder_(b, "borderBottom");
                        b = new goog$math$Box(d, f, b, c);
                    } else {
                        c = goog$style$getComputedStyle(b, "borderLeftWidth");
                        f = goog$style$getComputedStyle(b, "borderRightWidth");
                        d = goog$style$getComputedStyle(b, "borderTopWidth");
                        b = goog$style$getComputedStyle(b, "borderBottomWidth");
                        b = new goog$math$Box(parseFloat(d), parseFloat(f), parseFloat(b), parseFloat(c));
                    }
                    a.pixelWidth = h.width - b.left - e.left - e.right - b.right;
                    a.pixelHeight = h.height - b.top - e.top - e.bottom - b.bottom;
                } else {
                    a.pixelWidth = h.width;
                    a.pixelHeight = h.height;
                }
            } else {
                b = b.style;
                if (goog$userAgent$GECKO) {
                    b.MozBoxSizing = "border-box";
                } else if (goog$userAgent$WEBKIT) {
                    b.WebkitBoxSizing = "border-box";
                } else {
                    b.boxSizing = "border-box";
                }
                b.width = Math.max(h.width, 0) + "px";
                b.height = Math.max(h.height, 0) + "px";
            }
        }
        return j;
    };
    var yt$uix$eventPubSubs_ = {};
    var yt$uix$TOUCH_SUPPORTED_ = "ontouchstart" in document;
    var yt$uix$getMaxNumParents_ = function (a, b) {
        var c = yt$uix$eventPubSubs_[a].maxNumParents[b];
        var d;
        if (c > 0) {
            d = c;
        } else if (a.indexOf("mouse") != -1) {
            d = 2;
        }
        return d;
    };
    var yt$uix$findAncestorWithClass_ = function (a, b, c) {
        return (
            goog$dom$getAncestor(
                b,
                function (b) {
                    return goog$dom$classes$has(b, a);
                },
                true,
                c
            ) || null
        );
    };
    var yt$uix$dispatchEvent_ = function (a) {
        if (a.target.tagName != "HTML" && a.type in yt$uix$eventPubSubs_) {
            var b = yt$uix$eventPubSubs_[a.type];
            var c;
            for (c in b.ua) {
                var d = yt$uix$getMaxNumParents_(a.type, c);
                var e = yt$uix$findAncestorWithClass_(c, a.target, d);
                if (e) {
                    var f = true;
                    if (
                        b.checkRelatedTarget[c] &&
                        a.relatedTarget &&
                        goog$dom$getAncestor(
                            a.relatedTarget,
                            function (a) {
                                return a == e;
                            },
                            true,
                            d
                        )
                    ) {
                        f = false;
                    }
                    if (f) {
                        b.Hg(c, e, a.type, a);
                    }
                }
            }
        }
    };
    yt$events$listen(document, "blur", yt$uix$dispatchEvent_, true);
    yt$events$listen(document, "change", yt$uix$dispatchEvent_, true);
    yt$events$listen(document, "click", yt$uix$dispatchEvent_);
    yt$events$listen(document, "focus", yt$uix$dispatchEvent_, true);
    yt$events$listen(document, "mouseover", yt$uix$dispatchEvent_);
    yt$events$listen(document, "mouseout", yt$uix$dispatchEvent_);
    yt$events$listen(document, "keydown", yt$uix$dispatchEvent_);
    yt$events$listen(document, "keyup", yt$uix$dispatchEvent_);
    yt$events$listen(document, "keypress", yt$uix$dispatchEvent_);
    yt$events$listen(document, "cut", yt$uix$dispatchEvent_);
    yt$events$listen(document, "paste", yt$uix$dispatchEvent_);
    if (yt$uix$TOUCH_SUPPORTED_) {
        yt$events$listen(document, "touchstart", yt$uix$dispatchEvent_);
        yt$events$listen(document, "touchend", yt$uix$dispatchEvent_);
        yt$events$listen(document, "touchcancel", yt$uix$dispatchEvent_);
    }
    var yt$uix$widgets_ = (window.yt && window.yt.uix && window.yt.uix.widgets_) || {};
    goog$exportSymbol("yt.uix.widgets_", yt$uix$widgets_);
    var yt$uix$initWidget = function (a) {
        var a = a.getInstance();
        var b = yt$uix$BaseWidget$getCssClass(a);
        if (!(b in yt$uix$widgets_) && a.Pe()) {
            a.I();
            yt$uix$widgets_[b] = a;
        }
    };
    var uf = function () {
        this.Ma = {};
    };
    uf.prototype.Ng = !!eval("/*@cc_on!@*/false");
    uf.prototype.Pe = function () {
        return true;
    };
    uf.prototype.addBehavior = function (a, b, c, d, e) {
        var c = yt$uix$BaseWidget$getCssClass(this, c);
        var f = goog$bind(b, this);
        if (!(a in yt$uix$eventPubSubs_)) {
            yt$uix$eventPubSubs_[a] = new goog$pubsub$PubSub();
            yt$uix$eventPubSubs_[a].maxNumParents = {};
            yt$uix$eventPubSubs_[a].checkRelatedTarget = {};
        }
        a = yt$uix$eventPubSubs_[a];
        a.Ig(c, f);
        a.maxNumParents[c] = d;
        a.checkRelatedTarget[c] = e;
        this.Ma[b] = f;
    };
    uf.prototype.Lb = function (a, b, c) {
        var d = this.getData(a, b);
        if (d && (d = goog$getObjectByName(d))) {
            var e = goog$array$slice(arguments, 2);
            goog$array$splice(e, 0, 0, a);
            d.apply(null, e);
        }
    };
    uf.prototype.getData = function (a, b) {
        return yt$dom$datasets$get(a, b);
    };
    uf.prototype.setData = function (a, b, c) {
        yt$dom$datasets$set(a, b, c);
    };
    var yt$uix$BaseWidget$getCssClass = function (a, b) {
        return "yt-uix" + (a.La ? "-" + a.La : "") + (b ? "-" + b : "");
    };
    var vf = function () {
        this.Ma = {};
    };
    goog$inherits(vf, uf);
    vf.prototype.Pe = function () {
        if (this.Ng && Jb.indexOf("6") == 0) {
            return false;
        } else {
            return true;
        }
    };
    vf.prototype.show = function (a) {
        var b = yt$dom$getAncestorByClass(a, yt$uix$BaseWidget$getCssClass(this));
        if (b) {
            goog$dom$classes$add(b, yt$uix$BaseWidget$getCssClass(this, "active"));
            var c = yt$uix$Card$getCard_(this, a, b);
            if (c) {
                c.cardTargetNode = a;
                c.cardRootNode = b;
                yt$uix$Card$positionCard_(this, a, c);
                var d = yt$uix$BaseWidget$getCssClass(this, "card-visible");
                yt$setTimeout(function () {
                    yt$style$show(c);
                    goog$dom$classes$add(c, d);
                }, 10);
                this.Lb(b, "card-action", a);
            }
        }
    };
    var yt$uix$Card$getCard_ = function (a, b, c) {
        var d = yt$uix$BaseWidget$getCssClass(a, "card");
        var e = d + yt$dom$getUid(c);
        var f = goog$dom$getElement(e);
        if (f) {
            return f;
        }
        var h = a.ia(c);
        if (!h) {
            return null;
        }
        f = document.createElement("div");
        f.id = e;
        f.className = d;
        if ((c = yt$dom$datasets$get(c, "card-class"))) {
            goog$dom$classes$add(f, c);
        }
        c = document.createElement("div");
        c.className = yt$uix$BaseWidget$getCssClass(a, "card-border");
        b = a.getData(b, "orientation") || "horizontal";
        d = document.createElement("div");
        d.className = "yt-uix-card-border-arrow yt-uix-card-border-arrow-" + b;
        e = document.createElement("div");
        e.className = yt$uix$BaseWidget$getCssClass(a, "card-body");
        a = document.createElement("div");
        a.className = "yt-uix-card-body-arrow yt-uix-card-body-arrow-" + b;
        goog$dom$removeNode(h);
        e.appendChild(h);
        c.appendChild(a);
        c.appendChild(e);
        f.appendChild(d);
        f.appendChild(c);
        document.body.appendChild(f);
        return f;
    };
    var yt$uix$Card$positionCard_ = function (a, b, c) {
        var d = a.getData(b, "orientation") || "horizontal";
        var e = a.getData(b, "position");
        var f = !!a.getData(b, "force-position");
        var d = d == "horizontal";
        var h = e == "bottomright" || e == "bottomleft";
        var e = e == "topright" || e == "bottomright";
        var j;
        var m;
        if (e && h) {
            m = 7;
            j = 4;
        } else if (e && !h) {
            m = 6;
            j = 5;
        } else if (!e && h) {
            m = 5;
            j = 6;
        } else {
            m = 4;
            j = 7;
        }
        var p = goog$style$isRightToLeft(document.body);
        var z = goog$style$isRightToLeft(b);
        if (p != z) {
            m ^= 2;
        }
        var A;
        if (d) {
            z = b.offsetHeight / 2 - 24;
            A = new goog$math$Coordinate(-12, b.offsetHeight + 6);
        } else {
            z = b.offsetWidth / 2 - 12;
            A = new goog$math$Coordinate(b.offsetWidth + 6, -12);
        }
        var H = null;
        if (!f) {
            H = 10;
        }
        var L = yt$uix$BaseWidget$getCssClass(a, "card-flip");
        var a = yt$uix$BaseWidget$getCssClass(a, "card-reverse");
        goog$dom$classes$enable(c, L, e);
        goog$dom$classes$enable(c, a, h);
        H = goog$positioning$positionAtAnchor(b, m, c, j, A, null, H);
        if (!f && H) {
            if (H & 48) {
                e = !e;
                m ^= 2;
                j ^= 2;
            }
            if (H & 192) {
                h = !h;
                m ^= 1;
                j ^= 1;
            }
            goog$dom$classes$enable(c, L, e);
            goog$dom$classes$enable(c, a, h);
            goog$positioning$positionAtAnchor(b, m, c, j, A);
        }
        b = goog$dom$getElementByClass("yt-uix-card-body-arrow", c);
        f = goog$dom$getElementByClass("yt-uix-card-border-arrow", c);
        c = goog$style$getSize(c);
        z = Math.max(6, Math.min(z, (d ? c.height : c.width) - 24 - 6));
        c = d ? (h ? "top" : "bottom") : (!p && e) || (p && !e) ? "left" : "right";
        b.setAttribute("style", "");
        f.setAttribute("style", "");
        b.style[c] = z + "px";
        f.style[c] = z + "px";
    };
    vf.prototype.Gb = function (a) {
        var b = yt$dom$getAncestorByClass(a, yt$uix$BaseWidget$getCssClass(this));
        if (b && (a = yt$uix$Card$getCard_(this, a, b))) {
            goog$dom$classes$remove(b, yt$uix$BaseWidget$getCssClass(this, "active"));
            goog$dom$classes$remove(a, yt$uix$BaseWidget$getCssClass(this, "card-visible"));
            yt$style$hide(a);
            a.cardTargetNode = null;
            a.cardRootNode = null;
        }
    };
    vf.prototype.vc = function (a) {
        a = yt$dom$getAncestorByClass(a, yt$uix$BaseWidget$getCssClass(this));
        if (!a) {
            return false;
        } else {
            return goog$dom$classes$has(a, yt$uix$BaseWidget$getCssClass(this, "active"));
        }
    };
    vf.prototype.ia = function (a) {
        var b = a.cardContentNode;
        if (!b) {
            var c = yt$uix$BaseWidget$getCssClass(this, "content");
            var d = yt$uix$BaseWidget$getCssClass(this, "card-content");
            var e = (b = goog$dom$getElementByClass(c, a));
            var f = goog$dom$classes$get(e);
            if (goog$isString(c)) {
                Ka(f, c);
            } else if (goog$isArray(c)) {
                f = goog$dom$classes$getDifference_(f, c);
            }
            if (goog$isString(d) && !goog$array$contains(f, d)) {
                f.push(d);
            } else if (goog$isArray(d)) {
                goog$dom$classes$add_(f, d);
            }
            e.className = f.join(" ");
            a.cardContentNode = b;
        }
        return b;
    };
    vf.prototype.Dg = {
        Vj: 200,
        bk: 200
    };
    var yt$uix$Hovercard = function () {
        this.Ma = {};
    };
    goog$inherits(yt$uix$Hovercard, vf);
    goog$addSingletonGetter(yt$uix$Hovercard);
    yt$uix$Hovercard.prototype.La = "hovercard";
    yt$uix$Hovercard.prototype.I = function () {
        this.addBehavior("mouseover", this.$j, "target", 5, true);
        this.addBehavior("mouseout", this.Yj, "target", 5, true);
        this.addBehavior("mouseover", this.ak, "card", 100);
        this.addBehavior("mouseout", this.Zj, "card", 100);
    };
    yt$uix$Hovercard.prototype.$j = function (a) {
        if (zf != a) {
            if (zf) {
                this.Gb(zf);
                zf = null;
            }
            var b = goog$bind(this.show, this, a);
            var c = parseInt(this.getData(a, "delay-show"), 10);
            var b = yt$setTimeout(b, c > -1 ? c : this.Dg.Vj);
            this.setData(a, "card-timer", b.toString());
            zf = a;
            if (a.alt) {
                this.setData(a, "card-alt", a.alt);
                a.alt = "";
            }
            if (a.title) {
                this.setData(a, "card-title", a.title);
                a.title = "";
            }
        }
    };
    yt$uix$Hovercard.prototype.Yj = function (a) {
        var b = parseInt(this.getData(a, "card-timer"), 10);
        window.clearTimeout(b);
        yt$dom$getAncestorByClass(a, yt$uix$BaseWidget$getCssClass(this)).isCardHidable = true;
        b = parseInt(this.getData(a, "delay-hide"), 10);
        b = b > -1 ? b : this.Dg.bk;
        yt$setTimeout(goog$bind(this.dk, this, a), b);
        if ((b = this.getData(a, "card-alt"))) {
            a.alt = b;
        }
        if ((b = this.getData(a, "card-title"))) {
            a.title = b;
        }
    };
    yt$uix$Hovercard.prototype.dk = function (a) {
        if (yt$dom$getAncestorByClass(a, yt$uix$BaseWidget$getCssClass(this)).isCardHidable) {
            this.Gb(a);
            zf = null;
        }
    };
    yt$uix$Hovercard.prototype.ak = function (a) {
        if (a) {
            a.cardRootNode.isCardHidable = false;
        }
    };
    yt$uix$Hovercard.prototype.Zj = function (a, b, c) {
        if (a) {
            b = a.cardTargetNode;
            if (!goog$dom$contains(a, c.relatedTarget)) {
                this.Gb(b);
            }
        }
    };
    var zf = null;
    var yt$uix$Tooltip = function () {
        this.Ma = {};
    };
    goog$inherits(yt$uix$Tooltip, uf);
    goog$addSingletonGetter(yt$uix$Tooltip);
    yt$uix$Tooltip.prototype.La = "tooltip";
    yt$uix$Tooltip.prototype.md = 0;
    yt$uix$Tooltip.prototype.I = function () {
        this.addBehavior("mouseover", this.ed);
        this.addBehavior("mouseout", this.hc);
        this.addBehavior("click", this.hc);
        this.addBehavior("touchstart", this.Me);
        this.addBehavior("touchend", this.jd);
        this.addBehavior("touchcancel", this.jd);
    };
    yt$uix$Tooltip.prototype.Pe = function () {
        return !this.Ng || Jb.indexOf("6") != 0;
    };
    yt$uix$Tooltip.prototype.ed = function (a) {
        if (!this.md || !(goog$now() - this.md < 1000)) {
            var b = parseInt(this.getData(a, "tooltip-hide-timer"), 10);
            if (b) {
                yt$dom$datasets$remove(a, "tooltip-hide-timer");
                window.clearTimeout(b);
            }
            var b = goog$bind(function () {
                yt$uix$Tooltip$showTip_(this, a);
                yt$dom$datasets$remove(a, "tooltip-show-timer");
            }, this);
            var c = parseInt(this.getData(a, "tooltip-show-delay"), 10) || 0;
            var b = yt$setTimeout(b, c);
            this.setData(a, "tooltip-show-timer", b.toString());
            if (a.title) {
                this.setData(a, "tooltip-text", a.title);
                a.title = "";
            }
        }
    };
    yt$uix$Tooltip.prototype.hc = function (a) {
        var b = parseInt(this.getData(a, "tooltip-show-timer"), 10);
        if (b) {
            window.clearTimeout(b);
            yt$dom$datasets$remove(a, "tooltip-show-timer");
        }
        b = goog$bind(function () {
            yt$uix$Tooltip$hideTip_(this, a);
            yt$dom$datasets$remove(a, "tooltip-hide-timer");
        }, this);
        b = yt$setTimeout(b, 50);
        this.setData(a, "tooltip-hide-timer", b.toString());
        if ((b = this.getData(a, "tooltip-text"))) {
            a.title = b;
        }
    };
    yt$uix$Tooltip.prototype.Me = function (a, b, c) {
        this.md = 0;
        this.ed(
            yt$uix$findAncestorWithClass_(
                yt$uix$BaseWidget$getCssClass(this),
                c.changedTouches[0].target,
                yt$uix$getMaxNumParents_(b, yt$uix$BaseWidget$getCssClass(this))
            ),
            b
        );
    };
    yt$uix$Tooltip.prototype.jd = function (a, b, c) {
        this.md = goog$now();
        this.hc(
            yt$uix$findAncestorWithClass_(
                yt$uix$BaseWidget$getCssClass(this),
                c.changedTouches[0].target,
                yt$uix$getMaxNumParents_(b, yt$uix$BaseWidget$getCssClass(this))
            ),
            b
        );
    };
    var yt$uix$Tooltip$setTooltipText_ = function (a, b, c) {
        a.setData(b, "tooltip-text", c);
        a = a.getData(b, "content-id");
        if ((a = goog$dom$getElement(a))) {
            a.innerHTML = c;
        }
    };
    yt$uix$Tooltip.prototype.Gg = function (a) {
        return this.getData(a, "tooltip-text") || a.title;
    };
    var yt$uix$Tooltip$showTip_ = function (a, b) {
        if (b) {
            var c = a.Gg(b);
            if (c) {
                var d = goog$dom$getElement(yt$uix$Tooltip$getTipId_(a, b));
                if (!d) {
                    d = document.createElement("div");
                    d.id = yt$uix$Tooltip$getTipId_(a, b);
                    d.className = yt$uix$BaseWidget$getCssClass(a, "tip");
                    var e = document.createElement("div");
                    e.className = yt$uix$BaseWidget$getCssClass(a, "tip-body");
                    var f = document.createElement("div");
                    f.className = yt$uix$BaseWidget$getCssClass(a, "tip-arrow");
                    var h = document.createElement("div");
                    h.className = yt$uix$BaseWidget$getCssClass(a, "tip-content");
                    var j = a.ic(b);
                    var m = yt$uix$Tooltip$getTipId_(a, b, "content");
                    h.id = m;
                    a.setData(b, "content-id", m);
                    e.appendChild(h);
                    if (j) {
                        d.appendChild(j);
                    }
                    d.appendChild(e);
                    d.appendChild(f);
                    (yt$dom$getFullScreenElement() || document.body).appendChild(d);
                    yt$uix$Tooltip$setTooltipText_(a, b, c);
                    if ((c = parseInt(a.getData(b, "tooltip-max-width"), 10)) && e.offsetWidth > c) {
                        e.style.width = c + "px";
                        goog$dom$classes$add(h, yt$uix$BaseWidget$getCssClass(a, "normal-wrap"));
                    }
                    h = goog$dom$classes$has(b, yt$uix$BaseWidget$getCssClass(a, "reverse"));
                    if (!a.Te(b, d, e, j, f, h)) {
                        a.Te(b, d, e, j, f, !h);
                    }
                    var p = yt$uix$BaseWidget$getCssClass(a, "tip-visible");
                    yt$setTimeout(function () {
                        goog$dom$classes$add(d, p);
                    }, 0);
                }
            }
        }
    };
    yt$uix$Tooltip.prototype.Te = function (a, b, c, d, e, f) {
        goog$dom$classes$enable(b, yt$uix$BaseWidget$getCssClass(this, "tip-reverse"), f);
        var h = 0;
        if (f) {
            h = 1;
        }
        var e = goog$style$getSize(a);
        var f = new goog$math$Coordinate((e.width - 10) / 2, f ? e.height : 0);
        var j = goog$style$getPageOffset(a);
        goog$positioning$positionAtCoordinate(new goog$math$Coordinate(j.x + f.x, j.y + f.y), b, h);
        var h = goog$dom$getViewportSize_(window);
        var j = goog$style$getClientPosition(b);
        var b = goog$style$getSize(c);
        var m = b.width / 2;
        if (d) {
            d.style.left = "3px";
            d.style.height = b.height + "px";
            d.style.width = b.width + "px";
        }
        d = !!(h.height < j.y + e.height);
        e = !!(j.y < e.height);
        f = !!(j.x < m);
        h = !!(h.width < j.x + m);
        j = (b.width + 3) / -2 - -5;
        a = this.getData(a, "force-tooltip-direction");
        if (a == "left" || f) {
            j = -5;
        } else if (a == "right" || h) {
            j = 20 - b.width - 3;
        }
        c.style.left = j + "px";
        return !d && !e;
    };
    var yt$uix$Tooltip$hideTip_ = function (a, b) {
        if (b) {
            var c = goog$dom$getElement(yt$uix$Tooltip$getTipId_(a, b));
            if (c) {
                yt$uix$Tooltip$releaseSharedMask_(c);
                goog$dom$removeNode(c);
                yt$dom$datasets$remove(b, "content-id");
            }
        }
    };
    var yt$uix$Tooltip$getTipId_ = function (a, b, c) {
        a = yt$uix$BaseWidget$getCssClass(a) + yt$dom$getUid(b);
        if (c) {
            a += "-" + c;
        }
        return a;
    };
    yt$uix$Tooltip.prototype.ic = function (a) {
        var b = null;
        if (rb && goog$dom$classes$has(a, yt$uix$BaseWidget$getCssClass(this, "masked"))) {
            if ((b = goog$dom$getElement("yt-uix-tooltip-shared-mask"))) {
                b.parentNode.removeChild(b);
                yt$style$show(b);
            } else {
                b = document.createElement("iframe");
                b.src = 'javascript:""';
                b.id = "yt-uix-tooltip-shared-mask";
                b.className = yt$uix$BaseWidget$getCssClass(this, "tip-mask");
            }
        }
        return b;
    };
    var yt$uix$Tooltip$releaseSharedMask_ = function (a) {
        var b = goog$dom$getElement("yt-uix-tooltip-shared-mask");
        var c =
            b &&
            goog$dom$getAncestor(
                b,
                function (b) {
                    return b == a;
                },
                false,
                2
            );
        if (b && c) {
            b.parentNode.removeChild(b);
            yt$style$hide(b);
            document.body.appendChild(b);
        }
    };
    var Gf = function (a, b) {
        this.l = a;
        this.Fc = b || null;
        this.sb = yt$dom$datasets$get(a, "subscription-type") || "user";
        this.yc = yt$dom$datasets$get(a, "subscription-value") || "";
        this.Xi = !!yt$dom$datasets$get(a, "enable-tooltip");
        this.Dc = !!yt$dom$datasets$get(a, "enable-hovercard");
        this.Wa = false;
        this.ub();
    };
    var yt$www$subscriptions$SubscriptionButton$init = function (a, b) {
        var c = goog$dom$getElementsByClass("yt-subscription-button-js-default", a);
        goog$array$forEach(c, function (a) {
            if (!yt$dom$datasets$get(a, "subscription-initialized")) {
                new Gf(a, b);
                yt$dom$datasets$set(a, "subscription-initialized", "true");
            }
        });
    };
    Gf.prototype.getId = function () {
        return yt$dom$datasets$get(this.l, "subscription-id") || null;
    };
    Gf.prototype.qb = function (a) {
        if (a) {
            yt$dom$datasets$set(this.l, "subscription-id", a);
        } else {
            yt$dom$datasets$remove(this.l, "subscription-id");
        }
        yt$www$subscriptions$SubscriptionButton$updateUi_(this);
    };
    Gf.prototype.getValue = function () {
        return this.yc;
    };
    Gf.prototype.getType = function () {
        return this.sb;
    };
    var yt$www$subscriptions$SubscriptionButton$updateUi_ = function (a) {
        goog$dom$classes$enable(a.l, "subscribed", !!a.getId());
        var b = yt$uix$BaseWidget$getCssClass(yt$uix$Hovercard.getInstance(), "target");
        goog$dom$classes$enable(a.l, b, !!a.getId() && a.Dc);
        if (a.Xi) {
            b = (a.getId() ? "un" : "") + "subscribe-tooltip";
            b = yt$dom$datasets$get(a.l, b) || "";
            yt$uix$Tooltip$setTooltipText_(yt$uix$Tooltip.getInstance(), a.l, b);
        }
    };
    Gf.prototype.ub = function () {
        yt$events$listen(this.l, "click", goog$bind(this.Kd, this));
        hf("SUBSCRIBE", this.hg, this);
        hf("UNSUBSCRIBE", this.hg, this);
        if (this.Dc) {
            yt$events$listen(this.l, "mouseover", goog$bind(this.zj, this));
        }
        yt$www$subscriptions$SubscriptionButton$updateUi_(this);
    };
    Gf.prototype.hg = function (a, b, c, d) {
        if (c != this.getId() && this.getValue() == a && this.getType() == b) {
            this.qb(c);
        }
        if (d != this.l && this.Dc) {
            yt$uix$Hovercard.getInstance().Gb(this.l);
        }
    };
    Gf.prototype.Kd = function () {
        if (this.Wa) {
            return false;
        }
        yt$uix$Tooltip$hideTip_(yt$uix$Tooltip.getInstance(), this.l);
        if (this.getId()) {
            Jf(this);
        } else {
            this.jg();
        }
    };
    Gf.prototype.zj = function () {
        if (this.getId()) {
            yt$setTimeout(
                goog$bind(function () {
                    Kf(this);
                }, this),
                350
            );
        }
    };
    var Kf = function (a) {
        var b = yt$uix$Hovercard.getInstance();
        if (!a.xf && b.vc(a.l)) {
            a.xf = true;
            var c = {
                hovercard: 1
            };
            c["action_get_subscription_form_for_" + a.sb] = 1;
            var d = {
                session_token: yt$net$ajax$tokenMap_.subscription_ajax
            };
            d[yt$www$subscriptions$SubscriptionButton$getTypeParam_(a)] = a.yc;
            yt$net$ajax$send("/subscription_ajax", {
                method: "POST",
                J: c,
                ea: d,
                T: a,
                z: function (a, c) {
                    var d = this.l;
                    var j = c.response.html_content;
                    var m = yt$dom$getAncestorByClass(d, yt$uix$BaseWidget$getCssClass(b));
                    if (m) {
                        var p = b.ia(m);
                        if (p) {
                            p.innerHTML = j;
                            if (goog$dom$classes$has(m, yt$uix$BaseWidget$getCssClass(b, "active"))) {
                                j = yt$uix$Card$getCard_(b, d, m);
                                yt$uix$Card$positionCard_(b, d, j);
                            }
                        }
                    }
                    Mf(this);
                },
                ka: function () {
                    this.xf = false;
                }
            });
        }
    };
    var Mf = function (a) {
        var b = yt$uix$Hovercard.getInstance();
        var c = yt$dom$getAncestorByClass(a.l, yt$uix$BaseWidget$getCssClass(b));
        var d = b.ia(c);
        goog$array$forEach(
            d.getElementsByTagName("input"),
            function (a) {
                yt$events$listen(
                    a,
                    "change",
                    goog$bind(function () {
                        var a = d.getElementsByTagName("form")[0];
                        var b = a.action || document.location.href;
                        var c = a.method.toUpperCase() || "GET";
                        var a = goog$dom$forms$getFormDataString(a);
                        le(b, undefined, c, a, undefined);
                    }, this)
                );
            },
            a
        );
    };
    Gf.prototype.jg = function () {
        if (yt$getConfig("LOGGED_IN")) {
            var a = yt$www$subscriptions$SubscriptionButton$getTypeParam_(this);
            var b = {};
            b["action_create_subscription_to_" + this.sb] = 1;
            var c = yt$dom$datasets$get(this.l, "subscription-feature");
            if (c) {
                b.feature = c;
            }
            c = {
                session_token: Nf()
            };
            c[a] = this.yc;
            this.Wa = true;
            this.l.disabled = true;
            yt$net$ajax$send("/subscription_ajax", {
                method: "POST",
                T: this,
                J: b,
                ea: c,
                z: function (a, b) {
                    this.qb(b.response.id);
                    jf("SUBSCRIBE", this.getValue(), this.getType(), this.getId(), this.l);
                    if (this.Dc) {
                        yt$uix$Hovercard.getInstance().show(this.l);
                        Kf(this);
                    }
                    if (this.Fc) {
                        this.Fc(this.l, true);
                    }
                },
                ra: function () {
                    this.Wa = false;
                    this.l.disabled = false;
                }
            });
            yt$tracking$conversion$ping("subscribe");
        }
    };
    var Jf = function (a) {
        var b = {
            s: a.getId(),
            session_token: Nf()
        };
        var c = {
            action_remove_subscriptions: 1
        };
        var d = yt$dom$datasets$get(a.l, "subscription-feature");
        if (d) {
            c.feature = d;
        }
        a.Wa = true;
        a.l.disabled = true;
        yt$net$ajax$send("/subscription_ajax", {
            method: "POST",
            T: a,
            J: c,
            ea: b,
            z: function () {
                this.qb(null);
                jf("UNSUBSCRIBE", this.getValue(), this.getType(), null, null);
                if (this.Fc) {
                    this.Fc(this.l, false);
                }
            },
            ra: function () {
                this.Wa = false;
                this.l.disabled = false;
            }
        });
        yt$tracking$conversion$ping("unsubscribe");
    };
    var yt$www$subscriptions$SubscriptionButton$getTypeParam_ = function (a) {
        if (a.sb == "playlist") {
            return "p";
        } else if (a.sb == "blog") {
            return "b";
        } else if (a.sb == "topic") {
            return "l";
        } else {
            return "u";
        }
    };
    var Nf = function () {
        return yt$net$ajax$tokenMap_.subscription_ajax;
    };
    var yt$www$channels3$modules$SubscriptionButtonWithRecommendedChannels = function (a) {
        Gf.call(this, a);
    };
    goog$inherits(yt$www$channels3$modules$SubscriptionButtonWithRecommendedChannels, Gf);
    yt$www$channels3$modules$SubscriptionButtonWithRecommendedChannels.prototype.jg = function () {
        if (yt$getConfig("LOGGED_IN")) {
            var a = {
                session_token: Nf(),
                u: this.yc
            };
            this.Wa = true;
            this.l.disabled = true;
            yt$net$ajax$send("/subscription_ajax?action_create_subscription_to_user_channels3=1&feature=channels3", {
                method: "POST",
                T: this,
                ea: a,
                z: function (a, c) {
                    this.qb(c.response.id);
                    var d = c.response.html_content;
                    var e = goog$dom$getElement("recommended-channels-list");
                    if (e && d) {
                        e.innerHTML = d;
                        yt$www$subscriptions$SubscriptionButton$init();
                        yt$style$show(e.parentNode);
                    }
                },
                ra: function () {
                    this.Wa = false;
                    this.l.disabled = false;
                }
            });
        }
    };
    var Pf = function (a) {
        this.Ae = a;
        this.r = [];
    };
    goog$inherits(Pf, wc);
    var Qf = [];
    var Z = function (a, b, c, d, e, f) {
        if (!goog$isArray(c)) {
            Qf[0] = c;
            c = Qf;
        }
        for (var h = 0; h < c.length; h++) {
            a.r.push(P(b, c[h], d || a, e || false, f || a.Ae || a));
        }
        return a;
    };
    var Rf = function (a, b, c, d, e, f) {
        if (goog$isArray(c)) {
            for (var h = 0; h < c.length; h++) {
                Rf(a, b, c[h], d, e, f);
            }
        } else {
            a.r.push(Qc(b, c, d || a, e, f || a.Ae || a));
        }
    };
    var Sf = function (a, b, c, d, e, f) {
        if (goog$isArray(c)) {
            for (var h = 0; h < c.length; h++) {
                Sf(a, b, c[h], d, e, f);
            }
        } else {
            a: {
                d = d || a;
                f = f || a.Ae || a;
                e = !!e;
                if ((b = Sc(b, c, e))) {
                    for (c = 0; c < b.length; c++) {
                        if (!b[c].Xa && b[c].Bb == d && b[c].capture == e && b[c].Kc == f) {
                            b = b[c];
                            break a;
                        }
                    }
                }
                b = null;
            }
            if (b) {
                b = b.key;
                Tc(b);
                Ka(a.r, b);
            }
        }
    };
    var Tf = function (a) {
        goog$array$forEach(a.r, Tc);
        a.r.length = 0;
    };
    Pf.prototype.e = function () {
        Pf.b.e.call(this);
        Tf(this);
    };
    Pf.prototype.handleEvent = function () {
        throw Error("EventHandler.handleEvent not implemented");
    };
    var Uf = function () {};
    goog$inherits(Uf, wc);
    Uf.prototype.Uf = true;
    Uf.prototype.Ic = null;
    Uf.prototype.de = function (a) {
        this.Ic = a;
    };
    Uf.prototype.addEventListener = function (a, b, c, d) {
        P(this, a, b, c, d);
    };
    Uf.prototype.removeEventListener = function (a, b, c, d) {
        Rc(this, a, b, c, d);
    };
    Uf.prototype.dispatchEvent = function (a) {
        var b = a.type || a;
        var c = Lc;
        if (b in c) {
            if (goog$isString(a)) {
                a = new zc(a, this);
            } else if (a instanceof zc) {
                a.target = a.target || this;
            } else {
                var d = a;
                var a = new zc(b, this);
                goog$object$extend(a, d);
            }
            var d = 1;
            var e;
            var c = c[b];
            var b = true in c;
            var f;
            if (b) {
                e = [];
                for (f = this; f; f = f.Ic) {
                    e.push(f);
                }
                f = c[true];
                f.aa = f.n;
                for (var h = e.length - 1; !a.Za && h >= 0 && f.aa; h--) {
                    a.currentTarget = e[h];
                    d &= Xc(f, e[h], a.type, true, a) && a.ac != false;
                }
            }
            if (false in c) {
                f = c[false];
                f.aa = f.n;
                if (b) {
                    for (h = 0; !a.Za && h < e.length && f.aa; h++) {
                        a.currentTarget = e[h];
                        d &= Xc(f, e[h], a.type, false, a) && a.ac != false;
                    }
                } else {
                    for (e = this; !a.Za && e && f.aa; e = e.Ic) {
                        a.currentTarget = e;
                        d &= Xc(f, e, a.type, false, a) && a.ac != false;
                    }
                }
            }
            a = Boolean(d);
        } else {
            a = true;
        }
        return a;
    };
    Uf.prototype.e = function () {
        Uf.b.e.call(this);
        Vc(this);
        this.Ic = null;
    };
    var Vf = function () {};
    goog$addSingletonGetter(Vf);
    Vf.prototype.gg = 0;
    Vf.getInstance();
    var $ = function (a) {
        this.ya = a || goog$dom$getDomHelper();
        this.Nb = Wf;
    };
    goog$inherits($, Uf);
    $.prototype.Uj = Vf.getInstance();
    var Wf = null;
    var Xf = function (a, b) {
        switch (a) {
            case 1:
                if (b) {
                    return "disable";
                } else {
                    return "enable";
                }
            case 2:
                if (b) {
                    return "highlight";
                } else {
                    return "unhighlight";
                }
            case 4:
                if (b) {
                    return "activate";
                } else {
                    return "deactivate";
                }
            case 8:
                if (b) {
                    return "select";
                } else {
                    return "unselect";
                }
            case 16:
                if (b) {
                    return "check";
                } else {
                    return "uncheck";
                }
            case 32:
                if (b) {
                    return "focus";
                } else {
                    return "blur";
                }
            case 64:
                if (b) {
                    return "open";
                } else {
                    return "close";
                }
        }
        throw Error("Invalid component state");
    };
    $.prototype.Ha = null;
    $.prototype.H = false;
    $.prototype.c = null;
    $.prototype.Nb = null;
    $.prototype.D = null;
    $.prototype.M = null;
    $.prototype.O = null;
    $.prototype.$e = false;
    $.prototype.getId = function () {
        return this.Ha || (this.Ha = ":" + (this.Uj.gg++).toString(36));
    };
    $.prototype.qb = function (a) {
        if (this.D && this.D.O) {
            var b = this.D.O;
            var c = this.Ha;
            if (c in b) {
                delete b[c];
            }
            gb(this.D.O, a, this);
        }
        this.Ha = a;
    };
    $.prototype.a = function () {
        return this.c;
    };
    $.prototype.f = function (a) {
        if (this.c) {
            return this.ya.f(a, this.c);
        } else {
            return null;
        }
    };
    $.prototype.getHandler = function () {
        return this.pb || (this.pb = new Pf(this));
    };
    var Yf = function (a, b) {
        if (a == b) {
            throw Error("Unable to set parent component");
        }
        if (b && a.D && a.Ha && a.D.O && a.Ha && a.Ha in a.D.O && a.D.O[a.Ha] && a.D != b) {
            throw Error("Unable to set parent component");
        }
        a.D = b;
        $.b.de.call(a, b);
    };
    $.prototype.getParent = function () {
        return this.D;
    };
    $.prototype.de = function (a) {
        if (this.D && this.D != a) {
            throw Error("Method not supported");
        }
        $.b.de.call(this, a);
    };
    $.prototype.da = function () {
        return this.ya;
    };
    $.prototype.K = function () {
        this.c = this.ya.createElement("div");
    };
    $.prototype.Oa = function (a) {
        if (this.H) {
            throw Error("Component already rendered");
        }
        if (!this.c) {
            this.K();
        }
        if (a) {
            a.insertBefore(this.c, null);
        } else {
            this.ya.k.body.appendChild(this.c);
        }
        if (!this.D || this.D.H) {
            this.d();
        }
    };
    $.prototype.R = function (a) {
        if (this.H) {
            throw Error("Component already rendered");
        }
        if (a && this.vb(a)) {
            this.$e = true;
            if (!this.ya || this.ya.k != goog$dom$getOwnerDocument(a)) {
                this.ya = goog$dom$getDomHelper(a);
            }
            this.la(a);
            this.d();
        } else {
            throw Error("Invalid element to decorate");
        }
    };
    $.prototype.vb = function () {
        return true;
    };
    $.prototype.la = function (a) {
        this.c = a;
    };
    $.prototype.d = function () {
        this.H = true;
        Zf(this, function (a) {
            if (!a.H && a.a()) {
                a.d();
            }
        });
    };
    $.prototype.ja = function () {
        Zf(this, function (a) {
            if (a.H) {
                a.ja();
            }
        });
        if (this.pb) {
            Tf(this.pb);
        }
        this.H = false;
    };
    $.prototype.e = function () {
        $.b.e.call(this);
        if (this.H) {
            this.ja();
        }
        if (this.pb) {
            this.pb.w();
            delete this.pb;
        }
        Zf(this, function (a) {
            a.w();
        });
        if (!this.$e && this.c) {
            goog$dom$removeNode(this.c);
        }
        this.D = this.c = this.O = this.M = null;
    };
    $.prototype.ia = function () {
        return this.c;
    };
    $.prototype.Mb = function (a) {
        if (this.H) {
            throw Error("Component already rendered");
        }
        this.Nb = a;
    };
    var Zf = function (a, b) {
        if (a.M) {
            goog$array$forEach(a.M, b, undefined);
        }
    };
    $.prototype.removeChild = function (a, b) {
        if (a) {
            var c = goog$isString(a) ? a : a.getId();
            var a = this.O && c ? (c in this.O ? this.O[c] : undefined) || null : null;
            if (c && a) {
                var d = this.O;
                if (c in d) {
                    delete d[c];
                }
                Ka(this.M, a);
                if (b) {
                    a.ja();
                    if (a.c) {
                        goog$dom$removeNode(a.c);
                    }
                }
                Yf(a, null);
            }
        }
        if (!a) {
            throw Error("Child is not in parent component");
        }
        return a;
    };
    var $f = function (a) {
        $.call(this, null);
        this.type = a;
        this.A = [];
    };
    goog$inherits($f, $);
    var bg = function (a) {
        goog$dom$classes$add(ag(a), "edit-mode");
    };
    var ag = function (a) {
        return tc(a.a(), "channel-module");
    };
    $f.prototype.ja = function () {
        for (var a = this.A.length, b = 0; b < a; b++) {
            yt$events$unlistenByKey(this.A[b]);
        }
        $f.b.ja.call(this);
    };
    var cg = function () {
        this.ad = {};
        this.He = {};
        this.Ib = {};
    };
    goog$addSingletonGetter(cg);
    cg.prototype.I = function (a, b, c) {
        if (!(c in this.Ib)) {
            this.Ib[c] = {};
        }
        this.Ib[c][b] = a;
    };
    var eg = function (a) {
        var b = goog$dom$getElement("branded-page-body");
        if ("channel_page_modules" in a.ad) {
            throw "module_set_already_initialized";
        }
        b = goog$dom$getElementsByClass("channel-module", b);
        goog$array$forEach(
            b,
            function (a) {
                dg(this, 1, a);
                dg(this, 2, a);
                yt$dom$datasets$set(a, "module-loader-set-id", "channel_page_modules");
            },
            a
        );
    };
    var dg = function (a, b, c) {
        var d;
        switch (b) {
            case 2:
                d = c.getAttribute("data-view-module-class-id");
                break;
            case 1:
                d = c.getAttribute("data-editor-module-class-id");
        }
        d = d && b in a.Ib && d in a.Ib[b] ? a.Ib[b][d] : undefined;
        if (d) {
            d = new d(b);
            c = goog$dom$getElementByClass(d.og, c);
            d.R(c);
            if (!("channel_page_modules" in a.ad)) {
                a.ad.channel_page_modules = [];
            }
            a.ad.channel_page_modules.push(d);
            c = ag(d);
            if (!(b in a.He)) {
                a.He[b] = {};
            }
            var e = yt$dom$datasets$get(c, "module-loader-lookup-id");
            if (!e) {
                e = ":" + (Vf.getInstance().gg++).toString(36);
                yt$dom$datasets$set(c, "module-loader-lookup-id", e);
            }
            a.He[b][e] = d;
        }
    };
    var fg = function (a, b) {
        if (!b) {
            b = {};
        }
        var c = window;
        var d = typeof a.href != "undefined" ? a.href : "" + a;
        var e = b.target || a.target;
        var f = [];
        var h;
        for (h in b) {
            switch (h) {
                case "width":
                case "height":
                case "top":
                case "left":
                    f.push(h + "=" + b[h]);
                    break;
                case "target":
                case "noreferrer":
                    break;
                default:
                    f.push(h + "=" + (b[h] ? 1 : 0));
            }
        }
        f = f.join(",");
        if (b.noreferrer) {
            if ((c = c.open("", e, f))) {
                if (goog$userAgent$IE && d.indexOf(";") != -1) {
                    d = "'" + d.replace(/'/g, "%27") + "'";
                }
                c.opener = null;
                if (goog$userAgent$WEBKIT) {
                    c.location.href = d;
                } else {
                    d = goog$string$htmlEscape(d);
                    c.document.write('<META HTTP-EQUIV="refresh" content="0; url=' + d + '">');
                    c.document.close();
                }
            }
        } else {
            c = c.open(d, e, f);
        }
        return c;
    };
    var gg = function (a) {
        window.location = Kd(goog$uri$utils$buildQueryDataBufferFromMap_([a], {})) + "";
    };
    var yt$window$popup = function (a, b) {
        var c = b || {};
        c.target = c.target || a.target || "YouTube";
        c.width = c.width || 600;
        c.height = c.height || 600;
        c = fg(a, c);
        if (!c) {
            return true;
        }
        if (!c.opener) {
            c.opener = window;
        }
        c.focus();
        return false;
    };
    var goog$debug$RelativeTimeProvider = function () {
        this.Og = goog$now();
    };
    var goog$debug$RelativeTimeProvider$defaultInstance_ = new goog$debug$RelativeTimeProvider();
    goog$debug$RelativeTimeProvider.prototype.set = function (a) {
        this.Og = a;
    };
    goog$debug$RelativeTimeProvider.prototype.reset = function () {
        this.set(goog$now());
    };
    goog$debug$RelativeTimeProvider.prototype.get = function () {
        return this.Og;
    };
    var goog$debug$Formatter = function (a) {
        this.uj = a || "";
        this.vj = goog$debug$RelativeTimeProvider$defaultInstance_;
    };
    goog$debug$Formatter.prototype.dg = true;
    goog$debug$Formatter.prototype.xj = true;
    goog$debug$Formatter.prototype.wj = true;
    goog$debug$Formatter.prototype.eg = false;
    goog$debug$Formatter.prototype.yj = false;
    var goog$debug$Formatter$getTwoDigitString_ = function (a) {
        if (a < 10) {
            return "0" + a;
        } else {
            return "" + a;
        }
    };
    var goog$debug$Formatter$getRelativeTime_ = function (a, b) {
        var c = (a.bg - b) / 1000;
        var d = c.toFixed(3);
        var e = 0;
        if (c < 1) {
            e = 2;
        } else {
            while (c < 100) {
                e++;
                c *= 10;
            }
        }
        while (e-- > 0) {
            d = " " + d;
        }
        return d;
    };
    var goog$debug$TextFormatter = function (a) {
        goog$debug$Formatter.call(this, a);
    };
    goog$inherits(goog$debug$TextFormatter, goog$debug$Formatter);
    var goog$debug$getStacktrace = function (a) {
        return goog$debug$getStacktraceHelper_(a || arguments.callee.caller, []);
    };
    var goog$debug$getStacktraceHelper_ = function (a, b) {
        var c = [];
        if (goog$array$contains(b, a)) {
            c.push("[...circular reference...]");
        } else if (a && b.length < 50) {
            c.push(goog$debug$getFunctionName(a) + "(");
            for (var d = a.arguments, e = 0; e < d.length; e++) {
                if (e > 0) {
                    c.push(", ");
                }
                var f;
                f = d[e];
                switch (typeof f) {
                    case "object":
                        f = f ? "object" : "null";
                        break;
                    case "string":
                        break;
                    case "number":
                        f = "" + f;
                        break;
                    case "boolean":
                        f = f ? "true" : "false";
                        break;
                    case "function":
                        f = (f = goog$debug$getFunctionName(f)) ? f : "[fn]";
                        break;
                    default:
                        f = typeof f;
                }
                if (f.length > 40) {
                    f = f.substr(0, 40) + "...";
                }
                c.push(f);
            }
            b.push(a);
            c.push(")\n");
            try {
                c.push(goog$debug$getStacktraceHelper_(a.caller, b));
            } catch (h) {
                c.push("[exception trying to get caller]\n");
            }
        } else if (a) {
            c.push("[...long stack...]");
        } else {
            c.push("[end]");
        }
        return c.join("");
    };
    var goog$debug$getFunctionName = function (a) {
        if (goog$debug$fnNameCache_[a]) {
            return goog$debug$fnNameCache_[a];
        }
        a = "" + a;
        if (!goog$debug$fnNameCache_[a]) {
            var b = /function ([^\(]+)/.exec(a);
            goog$debug$fnNameCache_[a] = b ? b[1] : "[Anonymous]";
        }
        return goog$debug$fnNameCache_[a];
    };
    var goog$debug$fnNameCache_ = {};
    var goog$debug$LogRecord = function (a, b, c, d, e) {
        this.reset(a, b, c, d, e);
    };
    goog$debug$LogRecord.prototype.ue = null;
    goog$debug$LogRecord.prototype.te = null;
    var goog$debug$LogRecord$nextSequenceNumber_ = 0;
    goog$debug$LogRecord.prototype.reset = function (a, b, c, d, e) {
        if (typeof e != "number") {
            goog$debug$LogRecord$nextSequenceNumber_++;
        }
        this.bg = d || goog$now();
        this.hb = a;
        this.Mj = b;
        this.ag = c;
        delete this.ue;
        delete this.te;
    };
    goog$debug$LogRecord.prototype.getLevel = function () {
        return this.hb;
    };
    goog$debug$LogRecord.prototype.Xe = function (a) {
        this.hb = a;
    };
    goog$debug$LogRecord.prototype.getMessage = function () {
        return this.Mj;
    };
    var goog$debug$Logger = function (a) {
        this.Wj = a;
    };
    goog$debug$Logger.prototype.D = null;
    goog$debug$Logger.prototype.hb = null;
    goog$debug$Logger.prototype.M = null;
    goog$debug$Logger.prototype.jc = null;
    var goog$debug$Logger$Level = function (a, b) {
        this.name = a;
        this.value = b;
    };
    goog$debug$Logger$Level.prototype.toString = function () {
        return this.name;
    };
    var goog$debug$Logger$Level$SHOUT = new goog$debug$Logger$Level("SHOUT", 1200);
    var goog$debug$Logger$Level$SEVERE = new goog$debug$Logger$Level("SEVERE", 1000);
    var goog$debug$Logger$Level$WARNING = new goog$debug$Logger$Level("WARNING", 900);
    var goog$debug$Logger$Level$INFO = new goog$debug$Logger$Level("INFO", 800);
    var goog$debug$Logger$Level$CONFIG = new goog$debug$Logger$Level("CONFIG", 700);
    goog$debug$Logger.prototype.getParent = function () {
        return this.D;
    };
    goog$debug$Logger.prototype.Xe = function (a) {
        this.hb = a;
    };
    goog$debug$Logger.prototype.getLevel = function () {
        return this.hb;
    };
    var goog$debug$Logger$getEffectiveLevel = function (a) {
        if (a.hb) {
            return a.hb;
        }
        if (a.D) {
            return goog$debug$Logger$getEffectiveLevel(a.D);
        }
        goog$asserts$fail("Root logger has no level set.");
        return null;
    };
    goog$debug$Logger.prototype.log = function (a, b, c) {
        if (a.value >= goog$debug$Logger$getEffectiveLevel(this).value) {
            a = this.ck(a, b, c);
            b = "log:" + a.getMessage();
            if (goog$global.console) {
                if (goog$global.console.timeStamp) {
                    goog$global.console.timeStamp(b);
                } else if (goog$global.console.markTimeline) {
                    goog$global.console.markTimeline(b);
                }
            }
            if (goog$global.msWriteProfilerMark) {
                goog$global.msWriteProfilerMark(b);
            }
            for (b = this; b;) {
                var c = b;
                var d = a;
                if (c.jc) {
                    for (var e = 0, f = undefined; (f = c.jc[e]); e++) {
                        f(d);
                    }
                }
                b = b.getParent();
            }
        }
    };
    goog$debug$Logger.prototype.ck = function (a, b, c) {
        var d = new goog$debug$LogRecord(a, "" + b, this.Wj);
        if (c) {
            d.ue = c;
            var e;
            var f = arguments.callee.caller;
            try {
                var h;
                var j = goog$getObjectByName("window.location.href");
                if (goog$isString(c)) {
                    h = {
                        message: c,
                        name: "Unknown error",
                        lineNumber: "Not available",
                        fileName: j,
                        stack: "Not available"
                    };
                } else {
                    var m;
                    var p;
                    var z = false;
                    try {
                        m = c.lineNumber || c.qk || "Not available";
                    } catch (A) {
                        m = "Not available";
                        z = true;
                    }
                    try {
                        p = c.fileName || c.filename || c.sourceURL || j;
                    } catch (H) {
                        p = "Not available";
                        z = true;
                    }
                    h =
                        z || !c.lineNumber || !c.fileName || !c.stack
                            ? {
                                  message: c.message,
                                  name: c.name,
                                  lineNumber: m,
                                  fileName: p,
                                  stack: c.stack || "Not available"
                              }
                            : c;
                }
                e =
                    "Message: " +
                    goog$string$htmlEscape(h.message) +
                    '\nUrl: <a href="view-source:' +
                    h.fileName +
                    '" target="_new">' +
                    h.fileName +
                    "</a>\nLine: " +
                    h.lineNumber +
                    "\n\nBrowser stack:\n" +
                    goog$string$htmlEscape(h.stack + "-> ") +
                    "[end]\n\nJS stack traversal:\n" +
                    goog$string$htmlEscape(goog$debug$getStacktrace(f) + "-> ");
            } catch (L) {
                e = "Exception trying to expose exception! You win, we lose. " + L;
            }
            d.te = e;
        }
        return d;
    };
    var goog$debug$LogManager$loggers_ = {};
    var goog$debug$LogManager$rootLogger_ = null;
    var goog$debug$LogManager$initialize = function () {
        if (!goog$debug$LogManager$rootLogger_) {
            goog$debug$LogManager$rootLogger_ = new goog$debug$Logger("");
            goog$debug$LogManager$loggers_[""] = goog$debug$LogManager$rootLogger_;
            goog$debug$LogManager$rootLogger_.Xe(goog$debug$Logger$Level$CONFIG);
        }
    };
    var goog$debug$LogManager$getLogger = function (a) {
        goog$debug$LogManager$initialize();
        var b;
        if (!(b = goog$debug$LogManager$loggers_[a])) {
            b = new goog$debug$Logger(a);
            var c = a.lastIndexOf(".");
            var d = a.substr(c + 1);
            var c = goog$debug$LogManager$getLogger(a.substr(0, c));
            if (!c.M) {
                c.M = {};
            }
            c.M[d] = b;
            b.D = c;
            goog$debug$LogManager$loggers_[a] = b;
        }
        return b;
    };
    var goog$debug$Console = function () {
        this.Gj = goog$bind(this.Lj, this);
        this.we = new goog$debug$TextFormatter();
        this.we.dg = false;
        this.ug = this.we.eg = false;
        this.cg = "";
        this.jj = {};
    };
    goog$debug$Console.prototype.Lj = function (a) {
        if (!this.jj[a.ag]) {
            var b;
            b = this.we;
            var c = [];
            c.push(b.uj, " ");
            if (b.dg) {
                var d = new Date(a.bg);
                c.push(
                    "[",
                    goog$debug$Formatter$getTwoDigitString_(d.getFullYear() - 2000) +
                        goog$debug$Formatter$getTwoDigitString_(d.getMonth() + 1) +
                        goog$debug$Formatter$getTwoDigitString_(d.getDate()) +
                        " " +
                        goog$debug$Formatter$getTwoDigitString_(d.getHours()) +
                        ":" +
                        goog$debug$Formatter$getTwoDigitString_(d.getMinutes()) +
                        ":" +
                        goog$debug$Formatter$getTwoDigitString_(d.getSeconds()) +
                        "." +
                        goog$debug$Formatter$getTwoDigitString_(Math.floor(d.getMilliseconds() / 10)),
                    "] "
                );
            }
            if (b.xj) {
                c.push("[", goog$debug$Formatter$getRelativeTime_(a, b.vj.get()), "s] ");
            }
            if (b.wj) {
                c.push("[", a.ag, "] ");
            }
            if (b.yj) {
                c.push("[", a.getLevel().name, "] ");
            }
            c.push(a.getMessage(), "\n");
            if (b.eg && a.ue) {
                c.push(a.te, "\n");
            }
            b = c.join("");
            if (goog$debug$Console$console_ && goog$debug$Console$console_.firebug) {
                switch (a.getLevel()) {
                    case goog$debug$Logger$Level$SHOUT:
                        goog$debug$Console$console_.info(b);
                        break;
                    case goog$debug$Logger$Level$SEVERE:
                        goog$debug$Console$console_.error(b);
                        break;
                    case goog$debug$Logger$Level$WARNING:
                        goog$debug$Console$console_.warn(b);
                        break;
                    default:
                        goog$debug$Console$console_.debug(b);
                }
            } else if (goog$debug$Console$console_) {
                goog$debug$Console$console_.log(b);
            } else if (window.opera) {
                window.opera.postError(b);
            } else {
                this.cg += b;
            }
        }
    };
    var Ig = null;
    var goog$debug$Console$console_ = window.console;
    var Jg = function () {
        if (!Ig) {
            Ig = new goog$debug$Console();
        }
        if (window.location.href.indexOf("Debug=true") != -1) {
            var a = Ig;
            if (true != a.ug) {
                goog$debug$LogManager$initialize();
                var b = goog$debug$LogManager$rootLogger_;
                var c = a.Gj;
                if (!b.jc) {
                    b.jc = [];
                }
                b.jc.push(c);
                a.ug = true;
            }
        }
    };
    var goog$net$Cookies = function (a) {
        this.k = a;
    };
    var goog$net$Cookies$SPLIT_RE_ = /\s*;\s*/;
    goog$net$Cookies.prototype.isEnabled = function () {
        var a = navigator.cookieEnabled;
        if (a && goog$userAgent$WEBKIT) {
            var b = "COOKIES_TEST_" + goog$now();
            goog$net$cookies.set(b, "1");
            if (!this.get(b)) {
                return false;
            }
            this.remove(b);
        }
        return a;
    };
    goog$net$Cookies.prototype.set = function (a, b, c, d, e, f) {
        if (/[;=\s]/.test(a)) {
            throw Error('Invalid cookie name "' + a + '"');
        }
        if (/[;\r\n]/.test(b)) {
            throw Error('Invalid cookie value "' + b + '"');
        }
        if (!goog$isDef(c)) {
            c = -1;
        }
        e = e ? ";domain=" + e : "";
        d = d ? ";path=" + d : "";
        f = f ? ";secure" : "";
        c =
            c < 0
                ? ""
                : c == 0
                  ? ";expires=" + new Date(1970, 1, 1).toUTCString()
                  : ";expires=" + new Date(goog$now() + c * 1000).toUTCString();
        this.k.cookie = a + "=" + b + e + d + c + f;
    };
    goog$net$Cookies.prototype.get = function (a, b) {
        var c = a + "=";
        for (var d = (this.k.cookie || "").split(goog$net$Cookies$SPLIT_RE_), e = 0, f; (f = d[e]); e++) {
            if (f.indexOf(c) == 0) {
                return f.substr(c.length);
            }
        }
        return b;
    };
    goog$net$Cookies.prototype.remove = function (a, b, c) {
        var d = this.xa(a);
        this.set(a, "", 0, b, c);
        return d;
    };
    goog$net$Cookies.prototype.bb = function () {
        return goog$net$Cookies$getKeyValues_(this).keys;
    };
    goog$net$Cookies.prototype.Ka = function () {
        return goog$net$Cookies$getKeyValues_(this).Jj;
    };
    goog$net$Cookies.prototype.xa = function (a) {
        return goog$isDef(this.get(a));
    };
    goog$net$Cookies.prototype.clear = function () {
        var a = goog$net$Cookies$getKeyValues_(this).keys;
        for (var b = a.length - 1; b >= 0; b--) {
            this.remove(a[b]);
        }
    };
    var goog$net$Cookies$getKeyValues_ = function (a) {
        for (
            var a = (a.k.cookie || "").split(goog$net$Cookies$SPLIT_RE_), b = [], c = [], d, e, f = 0;
            (e = a[f]);
            f++
        ) {
            d = e.indexOf("=");
            if (d == -1) {
                b.push("");
                c.push(e);
            } else {
                b.push(e.substring(0, d));
                c.push(e.substring(d + 1));
            }
        }
        return {
            keys: b,
            Jj: c
        };
    };
    var goog$net$cookies = new goog$net$Cookies(document);
    goog$net$cookies.mm = 3950;
    var yt$net$cookies$set = function (a, b, c) {
        goog$net$cookies.set("" + a, b, c, "/", "youtube.com");
    };
    var yt$net$cookies$get = function (a) {
        return goog$net$cookies.get("" + a, undefined);
    };
    var yt$prefs$UserPrefs = function () {
        var a = yt$net$cookies$get(this.Kg);
        if (a) {
            for (var a = unescape(a).split("&"), b = 0; b < a.length; b++) {
                var c = a[b].split("=");
                var d = c[0];
                if ((c = c[1])) {
                    yt$prefs$UserPrefs$prefs_[d] = c.toString();
                }
            }
        }
    };
    goog$addSingletonGetter(yt$prefs$UserPrefs);
    var yt$prefs$UserPrefs$prefs_ = goog$getObjectByName("yt.prefs.UserPrefs.prefs_") || {};
    goog$exportSymbol("yt.prefs.UserPrefs.prefs_", yt$prefs$UserPrefs$prefs_);
    yt$prefs$UserPrefs.prototype.Kg = "PREF";
    var yt$prefs$UserPrefs$validateNotFlagName_ = function (a) {
        if (/^f([1-9][0-9]*)$/.test(a)) {
            throw "ExpectedRegexMatch: " + a;
        }
    };
    var yt$prefs$UserPrefs$validateName_ = function (a) {
        if (!/^\w+$/.test(a)) {
            throw "ExpectedRegexMismatch: " + a;
        }
    };
    var yt$prefs$UserPrefs$getFlagValue_ = function (a) {
        a = yt$prefs$UserPrefs$prefs_[a] !== undefined ? yt$prefs$UserPrefs$prefs_[a].toString() : null;
        if (a != null && /^[A-Fa-f0-9]+$/.test(a)) {
            return parseInt(a, 16);
        } else {
            return null;
        }
    };
    yt$prefs$UserPrefs.prototype.get = function (a, b) {
        yt$prefs$UserPrefs$validateName_(a);
        yt$prefs$UserPrefs$validateNotFlagName_(a);
        var c = yt$prefs$UserPrefs$prefs_[a] !== undefined ? yt$prefs$UserPrefs$prefs_[a].toString() : null;
        if (c != null) {
            return c;
        } else if (b) {
            return b;
        } else {
            return "";
        }
    };
    yt$prefs$UserPrefs.prototype.set = function (a, b) {
        yt$prefs$UserPrefs$validateName_(a);
        yt$prefs$UserPrefs$validateNotFlagName_(a);
        if (b == null) {
            throw "ExpectedNotNull";
        }
        yt$prefs$UserPrefs$prefs_[a] = b.toString();
    };
    var Vg = function (a) {
        return !!((yt$prefs$UserPrefs$getFlagValue_("f" + (Math.floor(a / 31) + 1)) || 0) & (1 << (a % 31)));
    };
    var yt$prefs$UserPrefs$setFlag = function (a, b) {
        var c = "f" + (Math.floor(a / 31) + 1);
        var d = 1 << (a % 31);
        var e = yt$prefs$UserPrefs$getFlagValue_(c) || 0;
        var e = b ? e | d : e & ~d;
        if (e == 0) {
            delete yt$prefs$UserPrefs$prefs_[c];
        } else {
            d = e.toString(16);
            yt$prefs$UserPrefs$prefs_[c] = d.toString();
        }
    };
    yt$prefs$UserPrefs.prototype.remove = function (a) {
        yt$prefs$UserPrefs$validateName_(a);
        yt$prefs$UserPrefs$validateNotFlagName_(a);
        delete yt$prefs$UserPrefs$prefs_[a];
    };
    yt$prefs$UserPrefs.prototype.save = function (a) {
        var a = (a || 7) * 86400;
        var b = this.Kg;
        var c = [];
        var d;
        for (d in yt$prefs$UserPrefs$prefs_) {
            c.push(d + "=" + escape(yt$prefs$UserPrefs$prefs_[d]));
        }
        yt$net$cookies$set(b, c.join("&"), a);
    };
    yt$prefs$UserPrefs.prototype.clear = function () {
        yt$prefs$UserPrefs$prefs_ = {};
    };
    var yt$player$Config = function (a) {
        a = a || {};
        this.url = a.url || this.url;
        this.urlV8 = a.url_v8 || this.urlV8;
        this.urlV9As2 = a.url_v9as2 || this.urlV9As2;
        this.minVersion = a.min_version || this.minVersion;
        this.args = a.args || goog$object$clone(yt$player$Config$DEFAULT_ARGS_);
        this.assets = a.assets || {};
        this.attrs = a.attrs || goog$object$clone(yt$player$Config$DEFAULT_ATTRS_);
        this.params = a.params || goog$object$clone(yt$player$Config$DEFAULT_PARAMS_);
        this.fallback = a.fallback || this.fallback;
        this.html5 = a.html5 || this.html5;
        this.disable = a.disable || {};
    };
    var yt$player$Config$DEFAULT_ARGS_ = {
        enablejsapi: 1
    };
    var yt$player$Config$DEFAULT_ATTRS_ = {
        width: "640",
        height: "385"
    };
    var yt$player$Config$DEFAULT_PARAMS_ = {
        allowscriptaccess: "always",
        allowfullscreen: "true",
        bgcolor: "#000000"
    };
    yt$player$Config.prototype.url = "";
    yt$player$Config.prototype.urlV8 = "";
    yt$player$Config.prototype.urlV9As2 = "";
    yt$player$Config.prototype.minVersion = "8.0.0";
    yt$player$Config.prototype.html5 = false;
    var yt$flash$FlashDetector = function () {
        this.dd = [];
        yt$flash$FlashDetector$detect_(this);
    };
    goog$addSingletonGetter(yt$flash$FlashDetector);
    yt$flash$FlashDetector.prototype.ca = 0;
    yt$flash$FlashDetector.prototype.Kb = 0;
    yt$flash$FlashDetector.prototype.rev = 0;
    yt$flash$FlashDetector.prototype.Be = "";
    yt$flash$FlashDetector.prototype.p = 0;
    yt$flash$FlashDetector.prototype.load = function (a) {
        if (this.p >= 3) {
            a(this);
        } else {
            this.dd.push(a);
        }
    };
    yt$flash$FlashDetector.prototype.setVersion = function (a) {
        this.ca = a[0];
        this.Kb = a[1];
        this.rev = a[2];
    };
    yt$flash$FlashDetector.prototype.isSupported = function (a, b, c) {
        a = typeof a == "string" ? a.split(".") : [a, b, c];
        a[0] = parseInt(a[0], 10) || 0;
        a[1] = parseInt(a[1], 10) || 0;
        a[2] = parseInt(a[2], 10) || 0;
        return (
            this.ca > a[0] ||
            (this.ca == a[0] && this.Kb > a[1]) ||
            (this.ca == a[0] && this.Kb == a[1] && this.rev >= a[2])
        );
    };
    var yt$flash$FlashDetector$detect_ = function (a) {
        if (a.p < 3) {
            if (a.p < 1) {
                var b = goog$getObjectByName("window.navigator.plugins");
                var c = goog$getObjectByName("window.navigator.mimeTypes");
                var b = b && b["Shockwave Flash"];
                var c = c && c["application/x-shockwave-flash"];
                var c = (b && c && c.enabledPlugin && b.description) || "";
                if ((b = c)) {
                    var d = b.indexOf("Shockwave Flash");
                    if (d >= 0) {
                        b = b.substr(d + 15);
                    }
                    var d = b.split(" ");
                    var e = "";
                    var b = "";
                    for (var f = 0, h = d.length; f < h; f++) {
                        if (e) {
                            if (b) {
                                break;
                            } else {
                                b = d[f];
                            }
                        } else {
                            e = d[f];
                        }
                    }
                    e = e.split(".");
                    d = parseInt(e[0], 10) || 0;
                    e = parseInt(e[1], 10) || 0;
                    f = 0;
                    if (b.charAt(0) == "r" || b.charAt(0) == "d") {
                        f = parseInt(b.substr(1), 10) || 0;
                    }
                    b = [d, e, f];
                } else {
                    b = [0, 0, 0];
                }
                a.Be = c;
                a.setVersion(b);
                a.p = 1;
                if (a.ca > 0) {
                    yt$flash$FlashDetector$fireCallbacks_(a);
                } else {
                    yt$flash$FlashDetector$detect_(a);
                }
            } else if (a.p < 2) {
                yt$flash$FlashDetector$detectWithPluginObject_(a);
            } else {
                yt$flash$FlashDetector$fireCallbacks_(a);
            }
        }
    };
    yt$flash$FlashDetector.prototype.Mg = function (a) {
        if (a) {
            a = a.split(" ")[1].split(",");
            a = [parseInt(a[0], 10) || 0, parseInt(a[1], 10) || 0, parseInt(a[2], 10) || 0];
        } else {
            a = [0, 0, 0];
        }
        this.setVersion(a);
        this.p = 2;
        if (this.ca > 0) {
            yt$flash$FlashDetector$fireCallbacks_(this);
        } else {
            yt$flash$FlashDetector$detect_(this);
        }
    };
    var yt$flash$FlashDetector$fireCallbacks_ = function (a) {
        if (a.p < 3) {
            a.p = 3;
            for (var b = 0, c = a.dd.length; b < c; b++) {
                a.dd[b](a);
            }
            a.dd = [];
        }
    };
    var yt$flash$FlashDetector$detectWithPluginObject_ = function (a) {
        var b;
        var c;
        var d;
        var e;
        if (yt$IS_JSCRIPT_) {
            try {
                b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
            } catch (f) {
                b = null;
            }
            if (!b) {
                a.Mg("");
            }
        } else {
            d = document.getElementsByTagName("body")[0];
            e = document.createElement("object");
            e.setAttribute("type", "application/x-shockwave-flash");
            b = d.appendChild(e);
        }
        var h = goog$bind(a.Mg, a);
        var j = 0;
        var m = function () {
            if (b && "GetVariable" in b) {
                try {
                    c = b.GetVariable("$version");
                } catch (a) {
                    c = "";
                }
            }
            if (c || j >= 10) {
                if (d && e) {
                    d.removeChild(e);
                }
                h(c || "");
            } else {
                j++;
                yt$setTimeout(m, 10);
            }
        };
        yt$setTimeout(m, 0);
    };
    var yt$flash$writeEmbedHtml_ = function (a, b, c) {
        if ((a = goog$dom$getElement(a)) && b && c) {
            if (!(c instanceof yt$player$Config)) {
                c = new yt$player$Config(c);
            }
            var d = goog$object$clone(c.attrs);
            var e = goog$object$clone(c.params);
            e.flashvars = yt$uri$buildQueryData(c.args);
            c = [];
            if (yt$IS_JSCRIPT_) {
                d.classid = "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000";
                e.movie = b;
                c.push("<object ");
                for (var f in d) {
                    c.push(f, '="', d[f], '"');
                }
                c.push(">");
                for (f in e) {
                    c.push('<param name="', f, '" value="', e[f], '">');
                }
                c.push("</object>");
            } else {
                d.type = "application/x-shockwave-flash";
                d.src = b;
                c.push("<embed ");
                for (f in d) {
                    c.push(f, '="', d[f], '"');
                }
                for (f in e) {
                    c.push(f, '="', e[f], '"');
                }
                c.push(" />");
            }
            a.innerHTML = c.join("");
        }
    };
    var yt$flash$embed = function (a, b) {
        a = goog$dom$getElement(a);
        if (!(b instanceof yt$player$Config)) {
            b = new yt$player$Config(b);
        }
        if (window != window.top) {
            var c = null;
            if (document.referrer) {
                c = document.referrer.substring(0, 128);
            }
            b.args.framer = c;
        }
        yt$flash$detectVersion_(function (c) {
            if (c.isSupported(b.minVersion) || yt$getConfig("IS_OPERA_MINI")) {
                c =
                    (((c.Be.indexOf("Gnash") > -1 && c.Be.indexOf("AVM2") == -1) ||
                    (c.ca == 9 && c.Kb == 1) ||
                    (c.ca == 9 && c.Kb == 0 && c.rev == 1)
                        ? false
                        : c.ca >= 9) &&
                        b.url) ||
                    ((navigator.userAgent.indexOf("Sony/COM2") > -1 && !c.isSupported(9, 1, 58) ? false : true) &&
                        b.urlV9As2) ||
                    b.urlV8 ||
                    b.url;
                yt$flash$writeEmbedHtml_(a, c, b);
            } else if (yt$IS_JSCRIPT_ && c.isSupported(6, 0, 65)) {
                c = new yt$player$Config({
                    url: "//s.ytimg.com/yt/swf/expressInstall-vflIE9HEf.swf",
                    args: {
                        MMredirectURL: window.location,
                        MMplayerType: "ActiveX",
                        MMdoctitle: document.title
                    }
                });
                yt$flash$writeEmbedHtml_(a, c.url, c);
            } else if (c.ca == 0 && b.fallback) {
                b.fallback();
            } else if (c.ca == 0 && b.fallbackMessage) {
                b.fallbackMessage();
            } else {
                a.innerHTML = '<div id="flash-upgrade">' + yt$getMsg("FLASH_UPGRADE") + "</div>";
            }
        });
    };
    var yt$flash$detectVersion_ = function (a) {
        yt$flash$FlashDetector.getInstance().load(function (b) {
            var c = yt$prefs$UserPrefs.getInstance();
            c.set("fv", [b.ca, b.Kb, b.rev].join("."));
            c.save();
            a(b);
        });
    };
    var yt$net$scriptloader$load = function (a, b) {
        var c = "scriptload-" + goog$string$hashCode(a);
        var d = document.getElementById(c);
        var e = d && yt$dom$datasets$get(d, "loaded");
        var f = d && !e;
        if (e) {
            if (b) {
                b();
            }
        } else if (f) {
            if (b) {
                hf(c, b);
            }
        } else {
            if (d) {
                c =
                    "scriptload-" +
                    (Math.floor(Math.random() * 2147483648).toString(36) +
                        Math.abs(Math.floor(Math.random() * 2147483648) ^ goog$now()).toString(36));
            }
            if (b) {
                hf(c, b);
            }
            var h = yt$net$scriptloader$createScript_(a, c, function () {
                if (!yt$dom$datasets$get(h, "loaded")) {
                    yt$dom$datasets$set(h, "loaded", "true");
                    jf(c);
                    var a = c;
                    var b = goog$getObjectByName("yt.pubsub.instance_");
                    if (b) {
                        b.clear(a);
                    }
                }
            });
        }
    };
    var yt$net$scriptloader$createScript_ = function (a, b, c) {
        var d = document.createElement("script");
        d.id = b;
        d.onload = c;
        d.onreadystatechange = function () {
            if (d.readyState == "loaded" || d.readyState == "complete") {
                d.onload();
            }
        };
        d.src = a;
        a = document.getElementsByTagName("head")[0];
        a.insertBefore(d, a.firstChild);
        return d;
    };
    var jh = function (a) {
        if ((a.altKey && !a.ctrlKey) || a.metaKey || (a.keyCode >= 112 && a.keyCode <= 123)) {
            return false;
        }
        switch (a.keyCode) {
            case 18:
            case 20:
            case 93:
            case 17:
            case 40:
            case 35:
            case 27:
            case 36:
            case 45:
            case 37:
            case 224:
            case 91:
            case 144:
            case 12:
            case 34:
            case 33:
            case 19:
            case 255:
            case 44:
            case 39:
            case 145:
            case 16:
            case 38:
            case 224:
            case 92:
                return false;
            case 0:
                return !goog$userAgent$GECKO;
            default:
                return a.keyCode < 166 || a.keyCode > 183;
        }
    };
    var lh = function (a, b, c, d, e) {
        if (!goog$userAgent$IE && (!goog$userAgent$WEBKIT || !goog$userAgent$isVersion("525"))) {
            return true;
        }
        if (qb && e) {
            return kh(a);
        }
        if ((e && !d) || (!c && (b == 17 || b == 18)) || (goog$userAgent$IE && d && b == a)) {
            return false;
        }
        switch (a) {
            case 13:
                return !goog$userAgent$IE || !goog$userAgent$isDocumentMode(9);
            case 27:
                return !goog$userAgent$WEBKIT;
        }
        return kh(a);
    };
    var kh = function (a) {
        if (
            (a >= 48 && a <= 57) ||
            (a >= 96 && a <= 106) ||
            (a >= 65 && a <= 90) ||
            (goog$userAgent$WEBKIT && a == 0)
        ) {
            return true;
        }
        switch (a) {
            case 32:
            case 63:
            case 107:
            case 109:
            case 110:
            case 111:
            case 186:
            case 59:
            case 189:
            case 187:
            case 61:
            case 188:
            case 190:
            case 191:
            case 192:
            case 222:
            case 219:
            case 220:
            case 221:
                return true;
            default:
                return false;
        }
    };
    var mh = function (a) {
        switch (a) {
            case 61:
                return 187;
            case 59:
                return 186;
            case 224:
                return 91;
            case 0:
                return 224;
            default:
                return a;
        }
    };
    var nh = function () {
        this.Ma = {};
    };
    goog$inherits(nh, uf);
    goog$addSingletonGetter(nh);
    nh.prototype.La = "button";
    nh.prototype.I = function () {
        this.addBehavior("click", this.Ue);
        this.addBehavior("keydown", this.Xj);
        this.addBehavior("keypress", this.Ve);
    };
    nh.prototype.Ue = function (a) {
        if (a && !a.disabled) {
            if (this.getData(a, "button-toggle")) {
                var b = yt$dom$getAncestorByClass(a, yt$uix$BaseWidget$getCssClass(this, "group"));
                if (b && this.getData(b, "button-toggle-group")) {
                    var b = goog$dom$getElementsByClass(yt$uix$BaseWidget$getCssClass(this), b);
                    var c = yt$uix$BaseWidget$getCssClass(this, "toggled");
                    goog$array$forEach(b, function (b) {
                        if (b != a) {
                            goog$dom$classes$remove(b, c);
                        } else {
                            goog$dom$classes$add(a, c);
                        }
                    });
                } else {
                    goog$dom$classes$toggle(a, yt$uix$BaseWidget$getCssClass(this, "toggled"));
                }
            }
            if (yt$uix$Button$getMenu_(this, a)) {
                ph(this, a);
                a.focus();
            }
            this.Lb(a, "button-action");
        }
    };
    nh.prototype.Xj = function (a, b, c) {
        if ((b = yt$uix$Button$getMenu_(this, a))) {
            var d = function (a) {
                var b = "";
                if (a.tagName) {
                    b = a.tagName.toLowerCase();
                }
                return b == "ul" || b == "table";
            };
            if ((d = d(b) ? b : goog$dom$findNode(b, d))) {
                var d = d.tagName.toLowerCase();
                var e;
                if (d == "ul") {
                    e = this.gk;
                } else if (d == "table") {
                    e = this.fk;
                }
                if (e) {
                    yt$uix$Button$handleMenuKeyDown_(this, a, b, c, goog$bind(e, this));
                }
            }
        }
    };
    var yt$uix$Button$handleMenuKeyDown_ = function (a, b, c, d, e) {
        var f = yt$style$isDisplayed(c);
        var h = d.keyCode == 9;
        if (h || d.keyCode == 32 || d.keyCode == 13) {
            if ((d = yt$uix$Button$clearMenuHighlight_(a, c))) {
                b = goog$dom$getFirstElementChild(d);
                if (b.tagName.toLowerCase() == "a") {
                    window.location = b.href;
                } else {
                    yt$events$simulateClick(b);
                }
            } else if (h) {
                yt$uix$Button$hideMenu_(a, b);
            }
        } else if (f) {
            if (d.keyCode == 27) {
                yt$uix$Button$clearMenuHighlight_(a, c);
                yt$uix$Button$hideMenu_(a, b);
            } else {
                e(b, c, d);
            }
        } else {
            a = goog$dom$classes$has(b, yt$uix$BaseWidget$getCssClass(a, "reverse")) ? 38 : 40;
            if (d.keyCode == a) {
                yt$events$simulateClick(b);
                d.preventDefault();
            }
        }
    };
    nh.prototype.Ve = function (a, b, c) {
        a = yt$uix$Button$getMenu_(this, a);
        if (yt$style$isDisplayed(a)) {
            c.preventDefault();
        }
    };
    var yt$uix$Button$clearMenuHighlight_ = function (a, b) {
        var c = yt$uix$BaseWidget$getCssClass(a, "menu-item-highlight");
        var d = goog$dom$getElementByClass(c, b);
        if (d) {
            goog$dom$classes$remove(d, c);
        }
        return d;
    };
    var yt$uix$Button$highlightMenuItem_ = function (a, b, c) {
        goog$dom$classes$add(c, yt$uix$BaseWidget$getCssClass(a, "menu-item-highlight"));
        b.setAttribute("aria-activedescendant", c.getAttribute("id"));
    };
    nh.prototype.fk = function (a, b, c) {
        var d = yt$uix$Button$clearMenuHighlight_(this, b);
        var b = yt$dom$getFirstElementByTagNameAndClass("table", null, b);
        var e = yt$dom$getFirstElementByTagNameAndClass("tr", null, b);
        var e = goog$dom$getElementsByTagNameAndClass("td", null, e).length;
        var b = goog$dom$getElementsByTagNameAndClass("td", null, b);
        var d = yt$uix$Button$getNextMenuIndex_(d, b, e, c);
        if (d != -1) {
            yt$uix$Button$highlightMenuItem_(this, a, b[d]);
            c.preventDefault();
        }
    };
    nh.prototype.gk = function (a, b, c) {
        if (c.keyCode == 40 || c.keyCode == 38) {
            var d = yt$uix$Button$clearMenuHighlight_(this, b);
            var b = goog$dom$getElementsByTagNameAndClass("li", null, b);
            var d = yt$uix$Button$getNextMenuIndex_(d, b, 1, c);
            yt$uix$Button$highlightMenuItem_(this, a, b[d]);
            c.preventDefault();
        }
    };
    var yt$uix$Button$getNextMenuIndex_ = function (a, b, c, d) {
        var e = b.length;
        var a = goog$array$indexOf(b, a);
        if (a == -1) {
            if (d.keyCode == 38) {
                a = e - c;
            } else if (d.keyCode == 37 || d.keyCode == 38 || d.keyCode == 40) {
                a = 0;
            }
        } else if (d.keyCode == 39) {
            if (a % c == c - 1) {
                a -= c;
            }
            a += 1;
        } else if (d.keyCode == 37) {
            if (a % c == 0) {
                a += c;
            }
            a -= 1;
        } else if (d.keyCode == 38) {
            if (a < c) {
                a += e;
            }
            a -= c;
        } else if (d.keyCode == 40) {
            if (a >= e - c) {
                a -= e;
            }
            a += c;
        }
        return a;
    };
    var ph = function (a, b) {
        var c = yt$uix$Button$getMenu_(a, b);
        var d = yt$dom$getAncestorByClass(c.activeButtonNode || c.parentNode, yt$uix$BaseWidget$getCssClass(a));
        if (d && d != b) {
            yt$uix$Button$hideMenu_(a, d);
            yt$setTimeout(goog$bind(a.Pg, a, b), 1);
        } else if (yt$style$isDisplayed(c)) {
            yt$uix$Button$hideMenu_(a, b);
        } else {
            a.Pg(b);
        }
    };
    nh.prototype.ic = function (a) {
        if (!rb || !goog$dom$classes$has(a, yt$uix$BaseWidget$getCssClass(this, "masked"))) {
            return null;
        }
        var b = a.iframeMask;
        if (!b) {
            b = document.createElement("iframe");
            b.src = 'javascript:""';
            b.className = yt$uix$BaseWidget$getCssClass(this, "menu-mask");
            a.iframeMask = b;
        }
        return b;
    };
    nh.prototype.Pg = function (a) {
        if (a) {
            var b = yt$uix$Button$getMenu_(this, a);
            if (b) {
                a.setAttribute("aria-pressed", "true");
                a.setAttribute("aria-expanded", "true");
                b.originalParentNode = b.parentNode;
                b.activeButtonNode = a;
                b.parentNode.removeChild(b);
                if (this.getData(a, "button-has-sibling-menu")) {
                    a.parentNode.appendChild(b);
                } else {
                    document.body.appendChild(b);
                }
                var c = yt$dom$getAncestorByClass(a, yt$uix$BaseWidget$getCssClass(this, "group"));
                var d = !!this.getData(a, "button-menu-ignore-group");
                b.style.minWidth = (c && !d ? c.offsetWidth - 2 : a.offsetWidth - 2) + "px";
                if ((d = this.ic(a))) {
                    document.body.appendChild(d);
                }
                var d = yt$dom$getAncestorByClass(a, yt$uix$BaseWidget$getCssClass(this, "group"));
                var e = !!this.getData(a, "button-menu-ignore-group");
                var d = d && !e ? d : a;
                var e = 5;
                var f = 4;
                if (goog$dom$classes$has(a, yt$uix$BaseWidget$getCssClass(this, "reverse"))) {
                    e = 4;
                    f = 5;
                }
                if (goog$dom$classes$has(a, "flip")) {
                    if (goog$dom$classes$has(a, yt$uix$BaseWidget$getCssClass(this, "reverse"))) {
                        e = 6;
                        f = 7;
                    } else {
                        e = 7;
                        f = 6;
                    }
                }
                var h;
                if (this.getData(a, "button-has-sibling-menu")) {
                    var j = goog$style$getOffsetParent(d);
                    if (goog$userAgent$IE && !goog$userAgent$isVersion("8")) {
                        j = null;
                    }
                    if (j) {
                        h = goog$style$getBounds(j);
                        h = new goog$math$Box(-h.top, h.left, h.top, -h.left);
                    }
                }
                var j = new goog$math$Coordinate(0, 1);
                var m = this.ic(a);
                if (m) {
                    var p = goog$style$getSize(b);
                    m.style.width = p.width + "px";
                    m.style.height = p.height + "px";
                    goog$positioning$positionAtAnchor(d, e, m, f, j, h);
                }
                goog$positioning$positionAtAnchor(d, e, b, f, j, h);
                yt$style$show(b);
                this.Lb(a, "button-menu-action", true);
                goog$dom$classes$add(a, yt$uix$BaseWidget$getCssClass(this, "active"));
                if (c) {
                    goog$dom$classes$add(c, yt$uix$BaseWidget$getCssClass(this, "group-active"));
                }
                c = goog$bind(this.Sj, this, a);
                b = yt$events$listen(document, "click", c);
                c = yt$events$listen(document, "contextmenu", c);
                this.setData(a, "button-listener", b);
                this.setData(a, "button-context-menu-listener", c);
            }
        }
    };
    var yt$uix$Button$hideMenu_ = function (a, b) {
        if (b) {
            var c = yt$uix$Button$getMenu_(a, b);
            if (c) {
                b.setAttribute("aria-pressed", "false");
                b.setAttribute("aria-expanded", "false");
                yt$style$hide(c);
                a.Lb(b, "button-menu-action", false);
                var d = a.ic(b);
                yt$setTimeout(function () {
                    if (d && d.parentNode) {
                        d.parentNode.removeChild(d);
                    }
                    if (c.originalParentNode) {
                        c.parentNode.removeChild(c);
                        c.originalParentNode.appendChild(c);
                        c.originalParentNode = null;
                        c.activeButtonNode = null;
                    }
                }, 1);
            }
            var e = yt$dom$getAncestorByClass(b, yt$uix$BaseWidget$getCssClass(a, "group"));
            goog$dom$classes$remove(b, yt$uix$BaseWidget$getCssClass(a, "active"));
            if (e) {
                goog$dom$classes$remove(e, yt$uix$BaseWidget$getCssClass(a, "group-active"));
            }
            if ((e = a.getData(b, "button-listener"))) {
                yt$events$unlistenByKey(e);
                yt$dom$datasets$remove(b, "button-listener");
            }
            if ((e = a.getData(b, "button-context-menu-listener"))) {
                yt$events$unlistenByKey(e);
                yt$dom$datasets$remove(b, "button-context-menu-listener");
            }
        }
    };
    nh.prototype.getContent = function (a) {
        return goog$dom$getElementByClass(yt$uix$BaseWidget$getCssClass(this, "content"), a);
    };
    nh.prototype.Sj = function (a, b) {
        var c;
        c = b || window.event;
        c = c.target || c.srcElement;
        if (c.nodeType == 3) {
            c = c.parentNode;
        }
        var d = yt$dom$getAncestorByClass(c, yt$uix$BaseWidget$getCssClass(this));
        if (d) {
            var d = yt$uix$Button$getMenu_(this, d);
            var e = yt$uix$Button$getMenu_(this, a);
            if (d == e) {
                return;
            }
        }
        if (
            !yt$dom$getAncestorByClass(c, yt$uix$BaseWidget$getCssClass(this, "menu")) ||
            goog$dom$classes$has(c, yt$uix$BaseWidget$getCssClass(this, "menu-item")) ||
            goog$dom$classes$has(c, yt$uix$BaseWidget$getCssClass(this, "menu-close"))
        ) {
            yt$uix$Button$hideMenu_(this, a);
            if (
                (d = yt$dom$getAncestorByClass(c, yt$uix$BaseWidget$getCssClass(this, "menu"))) &&
                this.getData(a, "button-menu-indicate-selected")
            ) {
                var e = goog$dom$getElementByClass(yt$uix$BaseWidget$getCssClass(this, "content"), a);
                var f;
                if (goog$dom$BrowserFeature$CAN_USE_INNER_TEXT && "innerText" in c) {
                    f = c.innerText.replace(/(\r\n|\r|\n)/g, "\n");
                } else {
                    f = [];
                    goog$dom$getTextContent_(c, f, true);
                    f = f.join("");
                }
                f = f.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
                f = f.replace(/\u200B/g, "");
                if (!goog$dom$BrowserFeature$CAN_USE_INNER_TEXT) {
                    f = f.replace(/ +/g, " ");
                }
                if (f != " ") {
                    f = f.replace(/^\s*/, "");
                }
                goog$dom$setTextContent(e, f);
                e = yt$uix$BaseWidget$getCssClass(this, "menu-item-selected");
                if ((d = goog$dom$getElementByClass(e, d))) {
                    goog$dom$classes$remove(d, e);
                }
                goog$dom$classes$add(c.parentNode, e);
            }
        }
    };
    var yt$uix$Button$getMenu_ = function (a, b) {
        if (!b.widgetMenu) {
            var c = a.getData(b, "button-menu-id");
            var c = c && goog$dom$getElement(c);
            var d = yt$uix$BaseWidget$getCssClass(a, "menu");
            if (c) {
                goog$dom$classes$add(c, d);
            } else {
                c = goog$dom$getElementByClass(d, b);
            }
            b.widgetMenu = c;
        }
        return b.widgetMenu;
    };
    var vh = function () {
        this.Ma = {};
    };
    goog$inherits(vh, uf);
    goog$addSingletonGetter(vh);
    vh.prototype.La = "expander";
    vh.prototype.I = function () {
        this.addBehavior("click", this.Ue, "head");
        this.addBehavior("keypress", this.Ve, "head");
    };
    vh.prototype.Ue = function (a) {
        this.od(a);
    };
    vh.prototype.Ve = function (a, b, c) {
        if (c && c.keyCode == 13) {
            this.od(a);
        }
    };
    vh.prototype.od = function (a) {
        if ((a = yt$dom$getAncestorByClass(a, yt$uix$BaseWidget$getCssClass(this)))) {
            goog$dom$classes$toggle(a, yt$uix$BaseWidget$getCssClass(this, "collapsed"));
            this.Lb(a, "expander-action");
        }
    };
    vh.prototype.collapse = function (a) {
        if ((a = yt$dom$getAncestorByClass(a, yt$uix$BaseWidget$getCssClass(this)))) {
            goog$dom$classes$add(a, yt$uix$BaseWidget$getCssClass(this, "collapsed"));
            this.Lb(a, "expander-action");
        }
    };
    var xh = function (a, b) {
        this.fb = a || 1;
        this.Ub = b || goog$Timer$defaultTimerObject;
        this.De = goog$bind(this.Ge, this);
        this.Ee = goog$now();
    };
    goog$inherits(xh, Uf);
    xh.prototype.enabled = false;
    var goog$Timer$defaultTimerObject = goog$global.window;
    xh.prototype.Q = null;
    xh.prototype.setInterval = function (a) {
        this.fb = a;
        if (this.Q && this.enabled) {
            this.stop();
            this.start();
        } else if (this.Q) {
            this.stop();
        }
    };
    xh.prototype.Ge = function () {
        if (this.enabled) {
            var a = goog$now() - this.Ee;
            if (a > 0 && a < this.fb * 0.8) {
                this.Q = this.Ub.setTimeout(this.De, this.fb - a);
            } else {
                this.dispatchEvent("tick");
                if (this.enabled) {
                    this.Q = this.Ub.setTimeout(this.De, this.fb);
                    this.Ee = goog$now();
                }
            }
        }
    };
    xh.prototype.start = function () {
        this.enabled = true;
        if (!this.Q) {
            this.Q = this.Ub.setTimeout(this.De, this.fb);
            this.Ee = goog$now();
        }
    };
    xh.prototype.stop = function () {
        this.enabled = false;
        if (this.Q) {
            this.Ub.clearTimeout(this.Q);
            this.Q = null;
        }
    };
    xh.prototype.e = function () {
        xh.b.e.call(this);
        this.stop();
        delete this.Ub;
    };
    var yh = function (a, b, c) {
        if (ea(a)) {
            if (c) {
                a = goog$bind(a, c);
            }
        } else if (a && typeof a.handleEvent == "function") {
            a = goog$bind(a.handleEvent, a);
        } else {
            throw Error("Invalid listener argument");
        }
        if (b > 2147483647) {
            return -1;
        } else {
            return goog$Timer$defaultTimerObject.setTimeout(a, b || 0);
        }
    };
    var zh = function () {
        this.Ma = {};
    };
    goog$inherits(zh, yt$uix$Tooltip);
    goog$addSingletonGetter(zh);
    zh.prototype.La = "range-tooltip";
    zh.prototype.gc = null;
    zh.prototype.format = null;
    zh.prototype.max = 0;
    zh.prototype.zg = 0;
    zh.prototype.yg = 0;
    zh.prototype.cd = null;
    zh.prototype.Gg = function () {
        return " ";
    };
    zh.prototype.Te = function (a, b) {
        this.gc = b;
        var c = this.getData(a, this.La + "-format");
        if (c) {
            this.format = goog$getObjectByName(c);
        }
        this.max = parseInt(this.getData(a, "range-max"), 10);
        this.zg = goog$style$getPageOffset(a).x;
        this.yg = goog$style$getSize(a).width;
    };
    zh.prototype.I = function () {
        yt$uix$Tooltip.prototype.I.call(this);
        this.addBehavior("mousemove", this.qg);
        this.addBehavior("touchmove", this.tg);
    };
    zh.prototype.ed = function (a, b) {
        if (!this.Cg) {
            yt$uix$Tooltip.prototype.ed.call(this, a, b);
            yt$events$listen(document, "mousemove", yt$uix$dispatchEvent_);
        }
    };
    zh.prototype.hc = function (a, b) {
        yt$uix$Tooltip.prototype.hc.call(this, a, b);
        od(document, "mousemove", yt$uix$dispatchEvent_);
    };
    zh.prototype.Me = function (a, b, c) {
        if (!this.cd) {
            this.cd = c.changedTouches[0].identifier;
            yt$uix$Tooltip.prototype.Me.call(this, a, b, c);
            yt$events$listen(document, "touchmove", yt$uix$dispatchEvent_);
            this.tg(0, b, c);
        }
    };
    zh.prototype.jd = function (a, b, c) {
        yt$uix$Tooltip.prototype.jd.call(this, a, b, c);
        od(document, "touchmove", yt$uix$dispatchEvent_);
        this.Cg = true;
        yh(
            function () {
                this.Cg = false;
            },
            200,
            this
        );
        this.cd = null;
    };
    zh.prototype.qg = function (a, b, c) {
        if (this.gc) {
            b = (c.pageX - this.zg) / this.yg;
            b = Math.min(Math.max(b, 0), 1);
            b *= this.max;
            if (this.format) {
                b = this.format(b);
            }
            yt$uix$Tooltip$setTooltipText_(this, a, b);
            var b = goog$dom$getElementByClass(yt$uix$BaseWidget$getCssClass(this, "tip-body"), this.gc);
            var d = this.gc;
            var e = new goog$math$Coordinate(-5, 0);
            var a = goog$style$getPageOffset(a);
            goog$positioning$positionAtCoordinate(new goog$math$Coordinate(c.pageX + e.x, a.y + e.y), d, 0);
            c = (goog$style$getSize(b).width + 3) / -2 - -5;
            b.style.left = c + "px";
        }
    };
    zh.prototype.tg = function (a, b, c) {
        if (this.gc) {
            for (a = 0; a < c.changedTouches.length; a++) {
                var d = c.changedTouches[a];
                if (d.identifier == this.cd) {
                    c.pageX = d.pageX;
                    c.pageY = d.pageY;
                    this.qg(
                        yt$uix$findAncestorWithClass_(
                            yt$uix$BaseWidget$getCssClass(this),
                            d.target,
                            yt$uix$getMaxNumParents_(b, yt$uix$BaseWidget$getCssClass(this))
                        ),
                        0,
                        c
                    );
                    break;
                }
            }
        }
    };
    var yt$prefs$BitFlags = {
        Il: 0,
        Ik: 1,
        uf: 2,
        ml: 3,
        Jk: 4,
        fm: 5,
        hm: 6,
        em: 7,
        cm: 8,
        dm: 9,
        gm: 10,
        bm: 11,
        Pl: 12,
        Ol: 13,
        Nl: 14,
        $k: 15,
        yl: 16,
        Bl: 17,
        Cl: 18,
        Al: 19,
        zl: 20,
        Ql: 21,
        Mk: 22,
        am: 23,
        Lk: 24,
        uk: 25,
        Nk: 26,
        Yk: 27,
        Ll: 28,
        Kk: 29,
        Kl: 30,
        Xl: 31,
        Wl: 32,
        Vk: 33,
        Ul: 34,
        Rl: 35,
        Sl: 36,
        Tl: 37,
        Vl: 38,
        nl: 39,
        Fl: 40,
        vk: 41,
        El: 42,
        xk: 43,
        tf: 44,
        Pk: 45,
        vl: 46,
        Yl: 47,
        im: 48,
        jm: 49,
        lm: 50,
        Ml: 51,
        Dk: 52,
        Fk: 53,
        wl: 54,
        il: 55,
        Ok: 56,
        Jl: 57,
        Gl: 58,
        Xk: 59,
        sl: 60,
        jl: 61,
        ol: 62,
        wk: 63,
        $l: 64,
        Ak: 65,
        zk: 66,
        pl: 67,
        Hk: 68,
        Rk: 69,
        al: 70,
        tl: 71,
        Zk: 72,
        Hl: 73,
        ql: 74,
        vf: 75,
        yk: 76,
        Dl: 77,
        Sk: 78,
        Zl: 79,
        kl: 80,
        Ek: 81,
        rl: 82,
        bl: 83,
        dl: 84,
        cl: 85,
        fl: 86,
        gl: 87,
        Bk: 88,
        tk: 89,
        Ck: 90,
        xl: 91,
        ul: 92,
        Gk: 93,
        km: 94,
        Uk: 95,
        Tk: 96,
        Wk: 97,
        ll: 98,
        Qk: 99
    };
    var Bh = function (a, b, c) {
        this.target = a;
        this.handle = b || a;
        this.Zf = c || new goog$math$Rect(NaN, NaN, NaN, NaN);
        this.k = goog$dom$getOwnerDocument(a);
        this.j = new Pf(this);
        P(this.handle, ["touchstart", "mousedown"], this.wd, false, this);
    };
    goog$inherits(Bh, Uf);
    var Ch = goog$userAgent$IE || (goog$userAgent$GECKO && goog$userAgent$isVersion("1.9.3"));
    Bh.prototype.clientX = 0;
    Bh.prototype.clientY = 0;
    Bh.prototype.screenX = 0;
    Bh.prototype.screenY = 0;
    Bh.prototype.Cf = 0;
    Bh.prototype.Df = 0;
    Bh.prototype.zb = 0;
    Bh.prototype.Ab = 0;
    Bh.prototype.Bf = true;
    Bh.prototype.Da = false;
    Bh.prototype.$d = 0;
    Bh.prototype.Vh = false;
    Bh.prototype.getHandler = function () {
        return this.j;
    };
    Bh.prototype.Of = function (a) {
        this.$d = Math.pow(a, 2);
    };
    Bh.prototype.e = function () {
        Bh.b.e.call(this);
        Rc(this.handle, ["touchstart", "mousedown"], this.wd, false, this);
        this.j.w();
        delete this.target;
        delete this.handle;
        delete this.j;
    };
    Bh.prototype.wd = function (a) {
        var b = a.type == "mousedown";
        if (this.Bf && !this.Da && (!b || Hc(a))) {
            Dh(a);
            if (this.$d == 0) {
                Eh(this, a);
                if (this.Da) {
                    a.preventDefault();
                } else {
                    return;
                }
            } else {
                a.preventDefault();
            }
            var b = this.k;
            var c = b.documentElement;
            var d = !Ch;
            Z(this.j, b, ["touchmove", "mousemove"], this.Uh, d);
            Z(this.j, b, ["touchend", "mouseup"], this.Jc, d);
            if (Ch) {
                c.setCapture(false);
                Z(this.j, c, "losecapture", this.Jc);
            } else {
                Z(this.j, b ? b.parentWindow || b.defaultView : window, "blur", this.Jc);
            }
            if (goog$userAgent$IE && this.Vh) {
                Z(this.j, b, "dragstart", Ac);
            }
            if (this.Wh) {
                Z(this.j, this.Wh, "scroll", this.xd, d);
            }
            this.clientX = this.Cf = a.clientX;
            this.clientY = this.Df = a.clientY;
            this.screenX = a.screenX;
            this.screenY = a.screenY;
            this.zb = this.target.offsetLeft;
            this.Ab = this.target.offsetTop;
            this.ae = goog$dom$DomHelper$getDocumentScroll(goog$dom$getDomHelper(this.k));
            goog$now();
        } else {
            this.dispatchEvent("earlycancel");
        }
    };
    var Eh = function (a, b) {
        if (a.dispatchEvent(new Fh("start", a, b.clientX, b.clientY, b)) !== false) {
            a.Da = true;
        }
    };
    Bh.prototype.Jc = function (a) {
        Tf(this.j);
        if (Ch) {
            this.k.releaseCapture();
        }
        var b = Gh(this, this.zb);
        var c = Hh(this, this.Ab);
        if (this.Da) {
            Dh(a);
            this.Da = false;
            this.dispatchEvent(new Fh("end", this, a.clientX, a.clientY, a, b, c));
        } else {
            this.dispatchEvent("earlycancel");
        }
        if (a.type == "touchend" || a.type == "touchcancel") {
            a.preventDefault();
        }
    };
    var Dh = function (a) {
        var b = a.type;
        if (b == "touchstart" || b == "touchmove") {
            a.U(a.gb().targetTouches[0], a.currentTarget);
        } else if (b == "touchend" || b == "touchcancel") {
            a.U(a.gb().changedTouches[0], a.currentTarget);
        }
    };
    Bh.prototype.Uh = function (a) {
        if (this.Bf) {
            Dh(a);
            var b = a.clientX - this.clientX;
            var c = a.clientY - this.clientY;
            this.clientX = a.clientX;
            this.clientY = a.clientY;
            this.screenX = a.screenX;
            this.screenY = a.screenY;
            if (!this.Da) {
                var d = this.Cf - this.clientX;
                var e = this.Df - this.clientY;
                if (d * d + e * e > this.$d && (Eh(this, a), !this.Da)) {
                    this.Jc(a);
                    return;
                }
            }
            c = Ih(this, b, c);
            b = c.x;
            c = c.y;
            if (this.Da && this.dispatchEvent(new Fh("beforedrag", this, a.clientX, a.clientY, a, b, c)) !== false) {
                Jh(this, a, b, c);
                a.preventDefault();
            }
        }
    };
    var Ih = function (a, b, c) {
        var d = goog$dom$DomHelper$getDocumentScroll(goog$dom$getDomHelper(a.k));
        var b = b + (d.x - a.ae.x);
        var c = c + (d.y - a.ae.y);
        a.ae = d;
        a.zb += b;
        a.Ab += c;
        b = Gh(a, a.zb);
        a = Hh(a, a.Ab);
        return new goog$math$Coordinate(b, a);
    };
    Bh.prototype.xd = function (a) {
        var b = Ih(this, 0, 0);
        a.clientX = this.clientX;
        a.clientY = this.clientY;
        Jh(this, a, b.x, b.y);
    };
    var Jh = function (a, b, c, d) {
        a.target.style.left = c + "px";
        a.target.style.top = d + "px";
        a.dispatchEvent(new Fh("drag", a, b.clientX, b.clientY, b, c, d));
    };
    var Gh = function (a, b) {
        var c = a.Zf;
        var d = !isNaN(c.left) ? c.left : null;
        var c = !isNaN(c.width) ? c.width : 0;
        return Math.min(d != null ? d + c : Infinity, Math.max(d != null ? d : -Infinity, b));
    };
    var Hh = function (a, b) {
        var c = a.Zf;
        var d = !isNaN(c.top) ? c.top : null;
        var c = !isNaN(c.height) ? c.height : 0;
        return Math.min(d != null ? d + c : Infinity, Math.max(d != null ? d : -Infinity, b));
    };
    var Fh = function (a, b, c, d, e, f, h) {
        zc.call(this, a);
        this.clientX = c;
        this.clientY = d;
        this.Ef = e;
        this.left = goog$isDef(f) ? f : b.zb;
        this.top = goog$isDef(h) ? h : b.Ab;
    };
    goog$inherits(Fh, zc);
    var Kh = function (a, b, c) {
        this.$b = a;
        this.Sb = new xh(50);
        this.j = new Pf(this);
        this.Db = new goog$math$Coordinate();
        this.je = goog$style$getBounds(a);
        this.Ei = b || 0;
        if (b) {
            a = this.je.S();
            if ((b = this.Ei)) {
                var d = Math.min(b, a.height * 0.25);
                a.top += d;
                a.height -= d * 2;
                b = Math.min(b, a.width * 0.25);
                a.top += b;
                a.height -= b * 2;
            }
        } else {
            a = this.je;
        }
        this.Mc = a;
        this.Sa(!!c);
    };
    goog$inherits(Kh, wc);
    Kh.prototype.Hj = false;
    Kh.prototype.Ij = true;
    Kh.prototype.Sa = function (a) {
        if (!a) {
            Z(this.j, goog$dom$getOwnerDocument(this.$b), "mousemove", this.sj);
        }
        Z(this.j, this.Sb, "tick", this.tj);
    };
    Kh.prototype.tj = function () {
        this.$b.scrollTop += this.Db.y;
        this.$b.scrollLeft += this.Db.x;
    };
    Kh.prototype.sj = function (a) {
        var b = this.Ij ? this.Fe(a.clientX, this.Mc.left, this.Mc.width) : 0;
        var c = this.Fe(a.clientY, this.Mc.top, this.Mc.height);
        this.Db.x = b;
        this.Db.y = c;
        if (!(b = !b && !c)) {
            if ((b = this.Hj)) {
                b = a.clientX;
                a = a.clientY;
                c = this.je;
                b = !(c.left <= b) || !(c.left + c.width >= b) || !(c.top <= a) || !(c.top + c.height >= a);
            }
        }
        if (b) {
            this.Sb.stop();
        } else if (!this.Sb.enabled) {
            this.Sb.start();
        }
    };
    Kh.prototype.Fe = function (a, b, c) {
        var d = 0;
        if (a < b) {
            d = -8;
        } else if (a > b + c) {
            d = 8;
        }
        return d;
    };
    Kh.prototype.e = function () {
        Kh.b.e.call(this);
        this.j.w();
        this.Sb.w();
    };
    new goog$pubsub$PubSub();
    var yt$templates$Template = function (a, b) {
        this.Jg = a;
        var c = b || null;
        if (!c) {
            c = yt$templates$extractPlaceholders_(this.Jg);
        }
        c = goog$string$subs("__%s__", "(" + c.join("|") + ")");
        this.ek = RegExp(c, "g");
    };
    var yt$templates$PLACEHOLDER_RE_ = /__([a-z]+(?:_[a-z]+)*)__/g;
    var yt$templates$fromElement = function (a, b) {
        var c = goog$dom$getElement(a).innerHTML;
        var c = c.replace(/^\s*(<\!--\s*)?/, "");
        var c = c.replace(/(\s*--\>)?\s*$/, "");
        return new yt$templates$Template(c, b);
    };
    var yt$templates$extractPlaceholders_ = function (a) {
        var b = [];
        var c = {};
        a.replace(yt$templates$PLACEHOLDER_RE_, function (a, e) {
            if (!(e in c)) {
                c[e] = true;
                b.push(e);
            }
        });
        return b;
    };
    yt$templates$Template.prototype.Oa = function (a, b, c) {
        return this.Jg.replace(
            this.ek,
            goog$bind(function (d, e) {
                if (b) {
                    e = b(e);
                }
                if (c) {
                    return a[e] || "";
                } else {
                    return goog$string$htmlEscape(a[e] || "");
                }
            }, this)
        );
    };
    var yt$sharing$EmailShare = function (a, b, c, d) {
        this.i = a;
        this.Ud = false;
        a = goog$uri$utils$getHost() + "/share_ajax";
        yt$net$ajax$send(a, {
            format: "JSON",
            J: {
                action_get_email: 1,
                video_id: c,
                list: d
            },
            z: function (a, c) {
                this.i.innerHTML = c.email_html;
                this.Sa();
                this.focus();
                var d = c.sharing_binary_url;
                if (d) {
                    yt$sharing$EmailShare$loadContactTools_(this, d, c.contacts, b);
                }
            },
            T: this
        });
    };
    yt$sharing$EmailShare.prototype.Sa = function () {
        this.G = this.i.getElementsByTagName("form")[0];
        yt$events$listen(this.G, "submit", goog$bind(this.Mi, this));
        goog$dom$getElementByClass("share-email-send", this.G);
        this.Wd = goog$dom$getElementByClass("share-email-success", this.i);
        this.Ni = goog$dom$getElementByClass("share-email-remail", this.Wd);
        yt$events$listen(
            this.Ni,
            "click",
            goog$bind(function () {
                yt$sharing$EmailShare$reset_(this);
                this.focus();
            }, this)
        );
        this.pe = goog$dom$getElementByClass("share-email-recipients", this.i);
        this.me = goog$dom$getElementByClass("share-email-note", this.i);
        this.Vf = goog$dom$getElementByClass("share-email-preview-note", this.i);
        yt$events$listen(this.me, "keyup", goog$bind(this.Li, this));
    };
    var yt$sharing$EmailShare$loadContactTools_ = function (a, b, c, d) {
        yt$net$scriptloader$load(
            b,
            goog$bind(function () {
                var a = goog$getObjectByName("yt.sharing.ContactTools");
                if (a) {
                    a.createContactTools(this.pe, null, c, d);
                }
            }, a)
        );
    };
    yt$sharing$EmailShare.prototype.Ra = function () {
        if (this.G) {
            if (this.Ud) {
                yt$sharing$EmailShare$reset_(this);
            }
            this.focus();
        }
    };
    yt$sharing$EmailShare.prototype.focus = function () {
        this.pe.focus();
    };
    var yt$sharing$EmailShare$reset_ = function (a) {
        a.Ud = false;
        a.pe.value = "";
        a.me.value = "";
        a.Vf.innerHTML = "";
        yt$style$hide(a.Wd);
        yt$style$show(a.G);
    };
    yt$sharing$EmailShare.prototype.Li = function () {
        var a = this.me.value;
        var a = a.substring(0, 300);
        var a = goog$string$htmlEscape(a);
        var a = a.replace(/\n/g, "<br>");
        this.Vf.innerHTML = a;
    };
    yt$sharing$EmailShare.prototype.Mi = function (a) {
        a.preventDefault();
        var b = goog$dom$getElementsByTagNameAndClass("button", null, this.G)[0];
        b.disabled = true;
        var c = goog$dom$getElementByClass("share-email-captcha", this.i);
        var d = goog$dom$getElementByClass("share-email-error", this.i);
        var e = goog$dom$getElementByClass("yt-alert-content", d);
        var a = goog$uri$utils$getHost() + goog$uri$utils$getPathAndAfter(this.G.action);
        yt$net$ajax$send(a, {
            format: "JSON",
            method: "POST",
            of: goog$dom$forms$getFormDataString(this.G),
            z: function () {
                this.Ud = true;
                yt$style$show(this.Wd);
                yt$style$hide(this.G);
                yt$style$hide(d);
                yt$style$hide(c);
            },
            ka: function (a, b) {
                if (b.captcha_html) {
                    c.innerHTML = b.captcha_html;
                    yt$style$show(c);
                }
                if (b.errors) {
                    e.innerHTML = b.errors.join("<br>");
                    yt$style$show(d);
                }
            },
            ra: function () {
                b.disabled = false;
            },
            T: this
        });
    };
    var Th = function (a, b, c) {
        this.i = a;
        a = goog$uri$utils$getHost() + "/share_ajax";
        yt$net$ajax$send(a, {
            format: "JSON",
            J: {
                action_get_embed: 1,
                video_id: b,
                list: c
            },
            z: function (a, b) {
                this.i.innerHTML = b.embed_html;
                this.zh = b.legacy_url;
                this.yh = b.legacy_code;
                this.xh = b.iframe_url;
                this.wh = b.iframe_code;
                this.Sa();
                var c = yt$prefs$UserPrefs.getInstance();
                if (this.Va) {
                    this.Va.checked = !Vg(yt$prefs$BitFlags.uf);
                }
                this.Bc.checked = Vg(yt$prefs$BitFlags.tf);
                if (this.Ua) {
                    this.Ua.checked = Vg(yt$prefs$BitFlags.vf);
                }
                c = c.get("ems");
                (c in this.oa ? this.oa[c] : goog$object$getAnyValue(this.oa)).select();
                yt$sharing$EmbedShare$updateEmbedCode_(this);
                this.Ra();
            },
            T: this
        });
    };
    Th.prototype.Sa = function () {
        this.Fb = goog$dom$getElementByClass("share-embed-code", this.i);
        yt$events$listen(this.Fb, "click", goog$bind(this.Cj, this));
        yt$sharing$EmbedShare$initSizes_(this);
        yt$sharing$EmbedShare$initOptions_(this);
    };
    var yt$sharing$EmbedShare$initSizes_ = function (a) {
        var b = goog$dom$getElementByClass("share-embed-size-list", a.i);
        var c = goog$dom$getElementsByClass("share-embed-size-radio", b);
        a.oa = {};
        goog$array$forEach(
            c,
            function (a) {
                if (!goog$dom$classes$has(a, "share-embed-size-radio-custom")) {
                    a = new yt$sharing$EmbedSize(a);
                    this.oa[a.name] = a;
                }
            },
            a
        );
        var c = goog$object$getAnyValue(a.oa).width / (goog$object$getAnyValue(a.oa).height - 30);
        var d = goog$dom$getElementByClass("share-embed-size-radio-custom", b);
        var c = new yt$sharing$CustomEmbedSize(d, c);
        a.oa[c.name] = c;
        a.nj = c;
        yt$events$delegateByClass(b, "click", goog$bind(a.oj, a), "share-embed-size");
        b = goog$dom$getElementByClass("share-embed-customize", b);
        yt$events$listen(b, "keyup", goog$bind(a.pj, a));
    };
    var yt$sharing$EmbedShare$initOptions_ = function (a) {
        var b = {};
        var c = goog$dom$getElementsByClass("share-embed-option", a.i);
        goog$array$forEach(c, function (a) {
            b[a.name] = a;
        });
        a.Va = b["show-related"];
        if (a.Va) {
            yt$events$listen(a.Va, "click", goog$bind(a.aj, a));
        }
        a.Bc = b["delayed-cookies"];
        yt$events$listen(a.Bc, "click", goog$bind(a.$i, a));
        a.Kf = b["use-https"];
        yt$events$listen(a.Kf, "click", goog$bind(a.cj, a));
        a.Ua = b["use-flash-code"] || null;
        if (a.Ua) {
            yt$events$listen(a.Ua, "click", goog$bind(a.bj, a));
        }
    };
    Th.prototype.Ra = function () {
        this.focus();
    };
    Th.prototype.focus = function () {
        if (this.Fb) {
            this.Fb.focus();
            this.Fb.select();
        }
    };
    var yt$sharing$EmbedShare$updateEmbedCode_ = function (a) {
        var b = a.wh;
        var c = a.xh;
        if (a.Ua && a.Ua.checked) {
            b = a.yh;
            c = a.zh;
        }
        if (a.Bc.checked) {
            c = c.replace("youtube.com", "youtube-nocookie.com");
        }
        if (a.Kf.checked) {
            c = c.split("//");
            c[0] = "https:";
            c = c.join("//");
        }
        var d = {};
        if (a.Va && !a.Va.checked) {
            d.rel = 0;
        }
        c = yt$uri$setQueryData(c, d);
        d = yt$sharing$EmbedShare$getSelectedSize_(a);
        if (!d.width || d.width < 200) {
            d = goog$object$getAnyValue(a.oa);
        }
        b = b.replace(/__url__/g, goog$string$htmlEscape(c));
        b = b.replace(/__width__/g, d.width + "");
        b = b.replace(/__height__/g, d.height + "");
        b = goog$string$htmlEscape(b);
        if (b != a.Fb.innerHTML) {
            a.Fb.innerHTML = b;
        }
    };
    var yt$sharing$EmbedShare$getSelectedSize_ = function (a) {
        return (
            goog$object$findValue(a.oa, function (a) {
                return a.ze();
            }) || null
        );
    };
    Th.prototype.aj = function () {
        var a = this.Va.checked;
        var b = yt$prefs$UserPrefs.getInstance();
        yt$prefs$UserPrefs$setFlag(yt$prefs$BitFlags.uf, !a);
        b.save();
        yt$sharing$EmbedShare$updateEmbedCode_(this);
    };
    Th.prototype.$i = function () {
        var a = this.Bc.checked;
        var b = yt$prefs$UserPrefs.getInstance();
        yt$prefs$UserPrefs$setFlag(yt$prefs$BitFlags.tf, a);
        b.save();
        yt$sharing$EmbedShare$updateEmbedCode_(this);
    };
    Th.prototype.cj = function () {
        yt$sharing$EmbedShare$updateEmbedCode_(this);
    };
    Th.prototype.bj = function () {
        var a = this.Ua.checked;
        var b = yt$prefs$UserPrefs.getInstance();
        yt$prefs$UserPrefs$setFlag(yt$prefs$BitFlags.vf, a);
        b.save();
        yt$sharing$EmbedShare$updateEmbedCode_(this);
    };
    Th.prototype.Cj = function () {
        this.focus();
    };
    Th.prototype.oj = function (a) {
        a = this.oa[goog$dom$getElementByClass("share-embed-size-radio", a.currentTarget).value];
        a.select();
        var b = yt$prefs$UserPrefs.getInstance();
        b.set("ems", a.name);
        b.save();
        yt$sharing$EmbedShare$updateEmbedCode_(this);
        if (a != this.nj) {
            this.focus();
        }
    };
    Th.prototype.pj = function () {
        yt$sharing$EmbedShare$updateEmbedCode_(this);
    };
    var yt$sharing$EmbedSize = function (a) {
        this.name = a.value;
        this.kc = a;
        this.width = parseInt(yt$dom$datasets$get(this.kc, "width"), 10);
        this.height = parseInt(yt$dom$datasets$get(this.kc, "height"), 10);
    };
    yt$sharing$EmbedSize.prototype.ze = function () {
        return this.kc.checked;
    };
    yt$sharing$EmbedSize.prototype.select = function () {
        this.kc.checked = true;
        var a = goog$dom$getAncestorByTagNameAndClass(this.kc, "li");
        var b = goog$dom$getAncestorByTagNameAndClass(a, "ul");
        var b = goog$dom$getElementsByTagNameAndClass("li", "selected", b);
        goog$array$forEach(b, function (a) {
            goog$dom$classes$remove(a, "selected");
        });
        goog$dom$classes$add(a, "selected");
    };
    var yt$sharing$CustomEmbedSize = function (a, b) {
        yt$sharing$EmbedSize.call(this, a);
        this.Bg = b;
        var c = goog$dom$getAncestorByTagNameAndClass(a, "li");
        this.Re = goog$dom$getElementByClass("share-embed-size-custom-width", c);
        this.Qe = goog$dom$getElementByClass("share-embed-size-custom-height", c);
        yt$events$listen(this.Re, "keyup", goog$bind(this.Rj, this));
        yt$events$listen(this.Qe, "keyup", goog$bind(this.Qj, this));
    };
    goog$inherits(yt$sharing$CustomEmbedSize, yt$sharing$EmbedSize);
    yt$sharing$CustomEmbedSize.prototype.Rj = function () {
        this.width = parseInt(this.Re.value, 10);
        this.height = (Math.floor(this.width / this.Bg) || 0) + 30;
        this.Qe.value = this.height + "";
    };
    yt$sharing$CustomEmbedSize.prototype.Qj = function () {
        this.height = parseInt(this.Qe.value, 10) - 30;
        this.width = Math.ceil(this.height * this.Bg) || 0;
        this.Re.value = this.width + "";
    };
    var Zh = function (a, b, c, d, e, f, h) {
        this.i = a;
        this.dj = b;
        this.Zi = c;
        this.Gc = d;
        this.$f = !isNaN(parseInt(e, 10));
        this.Ta = null;
        if (this.$f) {
            this.Ta = e;
        }
        this.Yi = f || {};
        this.Yf = !!h;
        window.__GOOGLEAPIS = window.__GOOGLEAPIS || {};
        window.__GOOGLEAPIS.gwidget = window.__GOOGLEAPIS.gwidget || {};
        window.__GOOGLEAPIS.gwidget.lang = this.Gc;
        if (this.$f) {
            window.__GOOGLEAPIS["googleapis.config"] = window.__GOOGLEAPIS["googleapis.config"] || {};
            window.__GOOGLEAPIS["googleapis.config"].sessionIndex = this.Ta;
        }
        this.le();
    };
    Zh.prototype.le = function () {
        yt$net$scriptloader$load("https://apis.google.com/js/plusone.js", goog$bind(this.nk, this));
    };
    Zh.prototype.nk = function () {
        var a = goog$getObjectByName("gapi.plusone.render");
        if (a) {
            var b = Math.floor(Math.random() * 10000);
            var c = "__PLUS_ONE_CALLBACK_" + b;
            var d = this.i.id;
            if (!d) {
                d = "plusone-button-" + b;
                this.i.id = d;
            }
            window[c] = goog$bind(this.Bj, this);
            b = {
                callbackName: c,
                count: "false",
                href: this.Zi,
                size: "medium",
                source: "google:youtube"
            };
            if (this.Yf) {
                b.db = 1;
            }
            goog$object$extend(b, this.Yi);
            yt$style$show(this.i);
            a(d, b);
        }
    };
    Zh.prototype.Bj = function (a) {
        if (a.state != "off") {
            yt$tracking$share("PLUS_ONE", this.dj + "");
            if (this.Yf) {
                yt$window$popup(
                    Kd(
                        goog$uri$utils$buildQueryDataBufferFromMap_(["https://plusone.google.com/_/+1/confirm"], {
                            url: a.url,
                            source: "google:youtube"
                        })
                    ),
                    {
                        width: 480,
                        height: 550
                    }
                );
            }
        }
    };
    var yt$sharing$SharePanel = function (a, b, c, d, e, f) {
        this.i = a;
        this.rb = b || null;
        this.Rb = c || null;
        this.Jh = e || null;
        this.Kh = f || false;
        this.le(d);
    };
    var yt$sharing$SharePanel$parseStartTime_ = function (a) {
        var b = ["h", "m", "s"];
        var c = goog$array$toArray(b);
        c.reverse();
        var d = {};
        var a = a.toLowerCase().match(/\d+\s*[hms]?/g) || [];
        var a = goog$array$filter(a, function (a) {
            var b = (a.match(/[hms]/) || [""])[0];
            if (b) {
                d[b] = parseInt(a.match(/\d+/)[0], 10);
                return false;
            } else {
                return true;
            }
        });
        for (a.reverse(); a.length && c.length;) {
            var e = c.shift();
            if (!(e in d)) {
                d[e] = parseInt(a.shift(), 10);
            }
        }
        if (a.length || d.s > 59 || d.m > 59 || d.h > 9) {
            return null;
        }
        var f = "";
        goog$array$forEach(b, function (a) {
            if (d[a]) {
                f += d[a] + a;
            }
        });
        return f || null;
    };
    yt$sharing$SharePanel.prototype.le = function (a) {
        var b = goog$uri$utils$getHost() + "/share_ajax";
        yt$net$ajax$send(b, {
            format: "JSON",
            J: {
                action_get_share_box: 1,
                video_id: this.rb,
                list: this.Rb,
                new_share_layout: true
            },
            z: function (b, d) {
                this.i.innerHTML = d.share_html;
                this.uh = d.url_short;
                this.pf = d.url_long;
                this.Gc = d.lang;
                this.Ta = null;
                if ("session_index" in d) {
                    this.Ta = d.session_index;
                }
                this.Sa();
                var e = goog$dom$getElementByClass("share-panel-services-dynamic", this.i);
                if (e) {
                    new Zh(e, (this.rb || this.Rb) + "", this.pf, this.Gc, this.Ta, this.Jh, this.Kh);
                }
                if (a) {
                    a();
                }
                this.Ra();
            },
            T: this
        });
    };
    yt$sharing$SharePanel.prototype.Sa = function () {
        var a = goog$dom$getElementByClass("share-panel-show-url-options");
        yt$events$listen(a, "click", goog$bind(this.fi, this));
        a = goog$dom$getElementByClass("share-panel-show-more");
        yt$events$listen(a, "click", goog$bind(this.ci, this));
        a = goog$dom$getElementByClass("share-panel-embed", this.i);
        yt$events$listen(a, "click", goog$bind(this.ai, this));
        a = goog$dom$getElementByClass("share-panel-email", this.i);
        yt$events$listen(a, "click", goog$bind(this.$h, this));
        if ((a = goog$dom$getElementByClass("share-panel-hangout", this.i))) {
            yt$events$listen(a, "click", goog$bind(this.bi, this));
        }
        this.V = goog$dom$getElementByClass("share-panel-url", this.i);
        yt$events$listen(this.V, "click", goog$bind(this.gi, this));
        yt$events$listen(
            this.V,
            "focus",
            goog$bind(function () {
                goog$dom$classes$add(this.V, "focused");
            }, this)
        );
        yt$events$listen(
            this.V,
            "blur",
            goog$bind(function () {
                goog$dom$classes$remove(this.V, "focused");
            }, this)
        );
        this.Th = goog$dom$getElementByClass("share-panel-long-url", this.i);
        this.Zd = goog$dom$getElementByClass("share-panel-start-at", this.i);
        this.va = goog$dom$getElementByClass("share-panel-start-at-time", this.i);
        yt$events$listen(this.va, "keyup", goog$bind(this.hi, this));
        yt$events$listen(this.va, "click", goog$bind(this.ei, this));
        yt$events$listen(
            this.va,
            "focus",
            goog$bind(function () {
                goog$dom$classes$add(this.va, "focused");
            }, this)
        );
        yt$events$listen(
            this.va,
            "blur",
            goog$bind(function () {
                goog$dom$classes$remove(this.va, "focused");
            }, this)
        );
        this.zf = goog$dom$getElementByClass("share-panel-hd", this.i);
        this.Af = goog$dom$getElementByClass("share-panel-include-list", this.i);
        this.Cc = goog$dom$getElementByClass("share-panel-url-options", this.i);
        yt$events$listen(this.Cc, "click", goog$bind(this.Hf, this));
        this.Nd = goog$dom$getElementByClass("share-panel-services", this.i);
        this.nf = goog$dom$getElementByClass("share-panel-buttons", this.i);
        a = goog$dom$getElementByClass("share-panel-show-more", this.i);
        yt$events$listen(a, "click", goog$bind(this.di, this));
    };
    yt$sharing$SharePanel.prototype.Ra = function () {
        if (this.V && !goog$dom$classes$has(this.V, "focused")) {
            this.V.focus();
            this.V.select();
        }
    };
    yt$sharing$SharePanel.prototype.Hf = function () {
        if (!goog$dom$classes$has(this.V, "focused")) {
            var a = this.uh;
            if (this.Th.checked) {
                a = this.pf;
            }
            var b = {};
            if (this.zf && this.zf.checked) {
                b.hd = 1;
            }
            if (this.Af && this.Af.checked) {
                b.list = this.Rb;
            }
            var c = this.Zd.checked && yt$sharing$SharePanel$parseStartTime_(this.va.value);
            if (c) {
                b.t = c;
            }
            a = Kd(goog$uri$utils$buildQueryDataBufferFromMap_([a], b));
            if (this.V.value != a) {
                this.V.value = a;
            }
        }
    };
    yt$sharing$SharePanel.prototype.hi = function () {
        this.Zd.checked = true;
        this.Hf();
    };
    yt$sharing$SharePanel.prototype.ei = function () {
        this.Zd.checked = true;
        if (!this.va.value.match(/[1-9]/)) {
            this.va.value = "";
        }
    };
    yt$sharing$SharePanel.prototype.gi = function () {
        this.V.select();
    };
    yt$sharing$SharePanel.prototype.$h = function () {
        var a = vh.getInstance();
        a.collapse(this.nf);
        a.collapse(this.Cc);
        a.collapse(this.Nd);
        if (this.X) {
            yt$style$hide(this.X);
        }
        if (!this.W) {
            this.W = goog$dom$getElementByClass("share-panel-email-container", this.i);
        }
        Ve(this.W);
        if (!yt$dom$datasets$get(this.W, "disabled") && yt$style$isDisplayed(this.W)) {
            if (this.If) {
                this.If.Ra();
            } else {
                this.If = new yt$sharing$EmailShare(this.W, this.Ta, this.rb, this.Rb);
            }
        }
    };
    yt$sharing$SharePanel.prototype.bi = function () {
        var a = yt$getConfig("PLAYER_REFERENCE");
        if (a && a.pauseVideo) {
            a.pauseVideo();
        }
        var a = Kd(
            goog$uri$utils$buildQueryDataBufferFromMap_(["https://talkgadget.google.com/hangouts"], {
                hl: this.Gc,
                authuser: this.Ta,
                gid: "youtube",
                gd: this.rb
            })
        );
        var b = window.screen.height;
        var c = Math.min(window.screen.width * 0.9, 1000);
        var b = Math.min(b * 0.9, 800);
        yt$tracking$share("HANGOUT", this.rb + "");
        yt$window$popup(a, {
            width: c,
            height: b
        });
    };
    yt$sharing$SharePanel.prototype.ai = function () {
        var a = vh.getInstance();
        a.collapse(this.nf);
        a.collapse(this.Cc);
        a.collapse(this.Nd);
        if (this.W) {
            yt$style$hide(this.W);
        }
        if (!this.X) {
            this.X = goog$dom$getElementByClass("share-panel-embed-container", this.i);
        }
        Ve(this.X);
        if (!yt$dom$datasets$get(this.X, "disabled") && yt$style$isDisplayed(this.X)) {
            if (this.Mf) {
                this.Mf.Ra();
            } else {
                this.Mf = new Th(this.X, this.rb, this.Rb);
            }
        }
    };
    yt$sharing$SharePanel.prototype.fi = function () {
        vh.getInstance().collapse(this.Nd);
        if (this.W) {
            yt$style$hide(this.W);
        }
        if (this.X) {
            yt$style$hide(this.X);
        }
    };
    yt$sharing$SharePanel.prototype.ci = function () {
        vh.getInstance().collapse(this.Cc);
        if (this.W) {
            yt$style$hide(this.W);
        }
        if (this.X) {
            yt$style$hide(this.X);
        }
    };
    yt$sharing$SharePanel.prototype.di = function () {
        if (this.W) {
            yt$style$hide(this.W);
        }
        if (this.X) {
            yt$style$hide(this.X);
        }
    };
    var yt$player$PlayerActions = function () {};
    yt$player$PlayerActions.prototype.Ag = false;
    yt$player$PlayerActions.prototype.dc = null;
    yt$player$PlayerActions.prototype.$c = null;
    yt$player$PlayerActions.prototype.U = function () {
        if (!this.Ag) {
            this.Ag = true;
            this.dc = goog$dom$getElementByClass("player-root", undefined);
            this.$c = goog$dom$getElementByClass("player-actions-container", this.dc);
            var a = goog$dom$getElementByClass("player-actions-close", this.$c);
            yt$events$listen(a, "click", goog$bind(this.Gb, this));
        }
    };
    yt$player$PlayerActions.prototype.Gb = function () {
        goog$dom$classes$enable(this.dc, "actions-mode", false);
    };
    yt$player$PlayerActions.prototype.Dj = function () {
        if (this.dc.clientWidth < 600) {
            goog$dom$classes$add(this.$c, "small-view");
        }
    };
    yt$player$PlayerActions.prototype.Ie = null;
    yt$player$PlayerActions.prototype.ok = function (a, b) {
        this.U();
        goog$dom$classes$enable(this.dc, "actions-mode", true);
        if (this.Ie) {
            this.Ie.Ra();
        } else {
            var c = goog$dom$getElementByClass("player-actions-share", this.$c);
            this.Ie = new yt$sharing$SharePanel(c, a, b, goog$bind(this.Dj, this), {
                db: 1
            });
        }
    };
    Jg();
    goog$debug$LogManager$getLogger("yt.player.logger").Xe(goog$debug$Logger$Level$INFO);
    var yt$player$canPlayHtml5_ = function () {
        if (navigator && navigator.userAgent && /android 2\.2/.test(navigator.userAgent.toLowerCase())) {
            return true;
        }
        var a = document.createElement("video");
        return (
            a &&
            a.canPlayType &&
            (a.canPlayType('video/mp4; codecs="avc1.42001E, mp4a.40.2"') ||
                a.canPlayType('video/webm; codecs="vp8.0, vorbis"'))
        );
    };
    var yt$playerConfig = goog$getObjectByName("yt.playerConfig") || {};
    goog$exportSymbol("yt.playerConfig", yt$playerConfig);
    var yt$player$playerReferences_ = goog$getObjectByName("yt.player.playerReferences_") || {};
    goog$exportSymbol("yt.player.playerReferences_", yt$player$playerReferences_);
    var li = function (a, b) {
        var c = goog$dom$getElement(a);
        if (c) {
            var d;
            d = b instanceof yt$player$Config ? b : new yt$player$Config(b);
            var e = !!d.disable.html5;
            var f = !!d.disable.flash;
            var h = yt$player$canPlayHtml5_() && (goog$getObjectByName("yt.player.VideoPlayer") || d.assets.js);
            if (!d.args.eurl) {
                d.args.eurl = yt$player$getEmbedReferrer_();
            }
            d.args.enablejsapi = "1";
            var j = false;
            if (d.html5) {
                j = true;
            }
            if (j && !h) {
                d.args.html5_unavailable = "1";
            }
            var m = {
                pubsub: new goog$pubsub$PubSub(),
                subscribedEvents: {}
            };
            var p = c;
            gi(c);
            var p = goog$dom$getElementByClass("player-container", c);
            var c = "player" + goog$getUid(p);
            var z = {
                target: p,
                playerId: c,
                playerapiid: d.args.playerapiid,
                jsapicallback: yt$player$resolveCallback_(d.args.jsapicallback),
                elementId: d.attrs.id,
                api: m,
                onReadyCalled: false,
                eventLabel: d.args.el,
                actions: new yt$player$PlayerActions()
            };
            d.args.playerapiid = c;
            d.args.jsapicallback = "ytPlayerOnYouTubePlayerReady";
            var A;
            var H;
            var m = yt$player$embedFlash_;
            if (j && h) {
                A = yt$player$embedHtml5_;
                if (!f) {
                    H = m;
                }
            } else {
                A = m;
                if (h && !e) {
                    H = yt$player$embedHtml5_;
                }
            }
            if (H) {
                d.fallback = function (a) {
                    a = a || d;
                    if (!(a instanceof yt$player$Config)) {
                        a = new yt$player$Config(a);
                    }
                    delete a.fallback;
                    if (j) {
                        a.args.autoplay = 1;
                    } else {
                        yt$net$ajax$send("/html5", {
                            yi: true,
                            method: "POST",
                            ea: {
                                prefer_html5: true,
                                session_token: yt$net$ajax$tokenMap_.html5_ajax
                            }
                        });
                    }
                    a.attrs.id = z.elementId;
                    H(p, a);
                };
            }
            d.fallbackMessage = yt$player$createFallbackMessage_(p);
            yt$player$playerReferences_[c] = z;
            yt$setTimeout(function () {
                A(p, d);
            }, 0);
        }
    };
    var yt$player$createFallbackMessage_ = function (a) {
        return function () {
            var b = yt$getMsg(
                "PLAYER_FALLBACK",
                undefined,
                'The Adobe Flash Player or an HTML5 supported browser is required for video playback. <br> <a href="http://get.adobe.com/flashplayer/">Get the latest Flash Player</a> <br> <a href="/html5">Learn more about upgrading to an HTML5 browser</a>'
            );
            var c = navigator.userAgent.match(/Version\/(\d).*Safari/);
            if (c && parseInt(c[1], 10) >= 5) {
                b = yt$getMsg(
                    "QUICKTIME_FALLBACK",
                    undefined,
                    'The Adobe Flash Player or QuickTime is required for video playback. <br> <a href="http://get.adobe.com/flashplayer/">Get the latest Flash Player</a> <br> <a href="http://www.apple.com/quicktime/download/">Get the latest version of QuickTime</a>'
                );
            }
            a.innerHTML = '<div class="fallback-message">' + b + "</div>";
        };
    };
    var gi = function (a) {
        goog$dom$classes$add(a, "player-root");
        xe(a, "overflow", "hidden");
        var b = goog$dom$createDom("div", "player-container");
        var c = goog$dom$createDom(
            "div",
            "player-actions-container",
            goog$dom$createDom("div", "player-actions-share"),
            goog$dom$createDom("div", "player-actions-close", goog$dom$createDom("div", "player-actions-close-button"))
        );
        goog$dom$append(a, b, c);
    };
    var yt$player$embedHtml5_ = function (a, b) {
        yt$player$clearContainer_(a);
        b.attrs.id += "-html5";
        var c = goog$getObjectByName("yt.player.VideoPlayer");
        if (c) {
            new c(a, b);
        } else {
            yt$net$scriptloader$load(b.assets.js, function () {
                new (goog$getObjectByName("yt.player.VideoPlayer"))(a, b);
            });
        }
    };
    var yt$player$embedFlash_ = function (a, b) {
        yt$player$clearContainer_(a);
        b.attrs.id += "-flash";
        yt$flash$embed(a, b);
    };
    var yt$player$clearContainer_ = function (a) {
        a = goog$dom$getElement(a);
        goog$dom$removeChildren(a);
    };
    var yt$player$getEmbedReferrer_ = function () {
        var a = "unknown";
        if (document.referrer) {
            a = document.referrer.substring(0, 128);
        }
        return a;
    };
    var ytPlayerOnYouTubePlayerReady = function (a) {
        var b = yt$player$playerReferences_[a];
        var c = goog$dom$getFirstElementChild(goog$dom$getElement(b.target));
        var a = c.getApiInterface();
        goog$array$forEach(a, function (a) {
            b.api[a] = goog$bind(c[a], c);
        });
        b.api.nativeAddEventListener = goog$bind(b.api.addEventListener, c);
        for (var d in b.api.subscribedEvents) {
            b.api.nativeAddEventListener(d, yt$player$exportEventCallback_(b.api, d));
        }
        b.api.addEventListener = yt$player$addEventListener_;
        if (b.eventLabel === "embedded") {
            b.api.addEventListener("SHARE_CLICKED", goog$bind(b.actions.ok, b.actions));
        }
        if (!b.onReadyCalled) {
            b.onReadyCalled = true;
            if (b.jsapicallback && (d = b.jsapicallback)) {
                d(b.playerapiid);
            }
            if (window.onYouTubePlayerReady) {
                onYouTubePlayerReady(b.playerapiid);
            }
        }
    };
    var yt$player$exportEventCallback_ = function (a, b) {
        var c = "ytPlayer" + (b + goog$getUid(a));
        var d = goog$bind(function (a) {
            this.pubsub.publish(b, a);
        }, a);
        goog$exportSymbol(c, d);
        return c;
    };
    var yt$player$addEventListener_ = function (a, b) {
        var c = yt$player$resolveCallback_(b);
        if (!this.subscribedEvents[a]) {
            this.nativeAddEventListener(a, yt$player$exportEventCallback_(this, a));
        }
        this.subscribedEvents[a] = 1;
        this.pubsub.subscribe(a, c);
    };
    var yt$player$resolveCallback_ = function (a) {
        var b = a;
        if (typeof a == "string") {
            b = function () {
                goog$getObjectByName(a).apply(window, arguments);
            };
        }
        if (!b) {
            b = goog$getObjectByName("onYouTubePlayerReady");
        }
        return b;
    };
    if (!goog$getObjectByName("ytPlayerOnYouTubePlayerReady")) {
        goog$exportSymbol("ytPlayerOnYouTubePlayerReady", ytPlayerOnYouTubePlayerReady);
    }
    goog$exportSymbol("yt.net.ajax.setToken", function (a, b) {
        yt$net$ajax$tokenMap_[a] = b;
    });
    goog$exportSymbol("yt.tracking.share", yt$tracking$share);
    goog$exportSymbol("yt.window.popup", yt$window$popup);
    yt$uix$initWidget(nh);
    yt$uix$initWidget(vh);
    yt$uix$initWidget(yt$uix$Tooltip);
    yt$uix$initWidget(zh);
    Jg();
    var qi = function (a) {
        $f.call(this, a);
    };
    goog$inherits(qi, $f);
    qi.prototype.og = "module-view";
    var ri = function (a) {
        $f.call(this, a);
    };
    goog$inherits(ri, qi);
    ri.prototype.d = function () {
        ri.b.d.call(this);
        si(this);
        var a;
        a = this.f("channels-video-player");
        if ((a = !a ? null : goog$json$parse(yt$dom$datasets$get(a, "swf-config")))) {
            li(this.f("channels-video-player"), a);
        }
    };
    var si = function (a) {
        a.A.push(
            yt$events$delegateByClass(
                a.a(),
                "click",
                goog$bind(function (a) {
                    a.preventDefault();
                    bg(this);
                }, a),
                "enable-edit-mode"
            )
        );
    };
    var ti = function (a) {
        $f.call(this, a);
    };
    goog$inherits(ti, ri);
    ti.prototype.d = function () {
        ti.b.d.call(this);
        ui(this);
    };
    var ui = function (a) {
        var b = goog$json$parse(yt$dom$datasets$get(ag(a), "live-event-polling-config"));
        if (b) {
            var c = b.eventId;
            var d = b.userId;
            var e = b.lastEventHash;
            var b = b.pollInterval;
            if (c && d && e && !(b <= 1000)) {
                yt$setInterval(
                    goog$bind(a.kk, a, d, c, function (a) {
                        if ((a = a.event_hash) && a != e) {
                            gg(window.location.href);
                        }
                    }),
                    b
                );
            }
        }
    };
    ti.prototype.kk = function (a, b, c) {
        yt$net$ajax$send("/livestreaming_ajax", {
            method: "GET",
            format: "XML",
            z: function (a, b) {
                c(goog$json$unsafeParse(b.html_content));
            },
            J: {
                action_get_event_state: 1,
                user_id: a,
                video_id: b
            }
        });
    };
    var vi = function (a) {
        this.fb = 1000 / a;
        this.kd = null;
        this.Jb = [];
    };
    var wi = new vi(24);
    vi.prototype.Ge = function () {
        var a = goog$now();
        for (var b = this.Jb.length - 1; b >= 0; b--) {
            if (xi(this.Jb[b], a)) {
                yi(this, b);
            }
        }
    };
    vi.prototype.add = function (a) {
        this.Jb.push(a);
        if (!this.kd) {
            this.kd = yt$setInterval(goog$bind(this.Ge, this), this.fb);
        }
    };
    vi.prototype.remove = function (a) {
        a = goog$array$indexOf(this.Jb, a);
        if (a >= 0) {
            yi(this, a);
        }
    };
    var yi = function (a, b) {
        var c = a.Jb;
        goog$asserts$assert(c.length != null);
        goog$array$ARRAY_PROTOTYPE_.splice.call(c, b, 1);
        if (!a.Jb.length) {
            window.clearInterval(a.kd);
            delete a.kd;
        }
    };
    var zi = function (a, b, c, d, e, f, h, j) {
        this.Hb = a;
        this.Wc = b;
        this.Uc = c;
        this.Xc = d;
        this.Vc = e;
        this.Yc = f;
        this.Tc = h;
        this.ye = j;
    };
    zi.prototype.S = function () {
        return new zi(this.Hb, this.Wc, this.Uc, this.Xc, this.Vc, this.Yc, this.Tc, this.ye);
    };
    var Ai = function (a, b) {
        if (b == 0) {
            return new goog$math$Coordinate(a.Hb, a.Wc);
        }
        if (b == 1) {
            return new goog$math$Coordinate(a.Tc, a.ye);
        }
        var c = a.Hb + b * (a.Uc - a.Hb);
        var d = a.Wc + b * (a.Xc - a.Wc);
        var e = a.Uc + b * (a.Vc - a.Uc);
        var f = a.Xc + b * (a.Yc - a.Xc);
        var h = a.Vc + b * (a.Tc - a.Vc);
        var j = a.Yc + b * (a.ye - a.Yc);
        var c = c + b * (e - c);
        var d = d + b * (f - d);
        return new goog$math$Coordinate(c + b * (e + b * (h - e) - c), d + b * (f + b * (j - f) - d));
    };
    var Bi = function (a, b) {
        var c = (b - a.Hb) / (a.Tc - a.Hb);
        if (c <= 0) {
            return 0;
        }
        if (c >= 1) {
            return 1;
        }
        var d = 0;
        var e = 1;
        for (var f = 0; f < 8; f++) {
            var h = Ai(a, c).x;
            var j = (Ai(a, c + 0.000001).x - h) / 0.000001;
            if (Math.abs(h - b) < 0.000001) {
                return c;
            }
            if (Math.abs(j) < 0.000001) {
                break;
            } else {
                if (h < b) {
                    d = c;
                } else {
                    e = c;
                }
                c -= (h - b) / j;
            }
        }
        for (f = 0; Math.abs(h - b) > 0.000001 && f < 8; f++) {
            if (h < b) {
                d = c;
                c = (c + e) / 2;
            } else {
                e = c;
                c = (c + d) / 2;
            }
            h = Ai(a, c).x;
        }
        return c;
    };
    var Ci = function (a, b) {
        this.Na = new zi(0, 0, a.x, a.y, b.x, b.y, 1, 1);
    };
    var Di = function (a) {
        return a;
    };
    var Ei = new Ci(
        {
            x: 0.25,
            y: 0.1
        },
        {
            x: 0.25,
            y: 1
        }
    );
    var Fi = function (a) {
        return Ai(Ei.Na, Bi(Ei.Na, a)).y;
    };
    var Gi = new Ci(
        {
            x: 0.42,
            y: 0
        },
        {
            x: 1,
            y: 1
        }
    );
    var Hi = function (a) {
        return Ai(Gi.Na, Bi(Gi.Na, a)).y;
    };
    var Ii = new Ci(
        {
            x: 0,
            y: 0
        },
        {
            x: 0.58,
            y: 1
        }
    );
    var Ji = function (a) {
        return Ai(Ii.Na, Bi(Ii.Na, a)).y;
    };
    var Ki = new Ci(
        {
            x: 0.42,
            y: 0
        },
        {
            x: 0.58,
            y: 1
        }
    );
    var Li = function (a) {
        return Ai(Ki.Na, Bi(Ki.Na, a)).y;
    };
    var Mi = function (a) {
        switch (a) {
            case "linear":
                return Di;
            case "ease-in":
                return Hi;
            case "ease-out":
                return Ji;
            case "ease-in-out":
                return Li;
            default:
                return Fi;
        }
    };
    var Ni = function (a, b) {
        var c = b || {};
        this.l = a;
        this.ej = c.duration || 0.25;
        this.ne = this.ej * 1000;
        this.Wf = c.ra || null;
        this.Qi = c.ih || "ease";
        this.ub(c);
        if (!c.pk) {
            this.play();
        }
    };
    Ni.prototype.ub = function () {};
    var Oi = function (a, b) {
        Ni.call(this, a, b);
    };
    goog$inherits(Oi, Ni);
    Oi.prototype.ub = function (a) {
        this.Rc = 0;
        this.Fg = a.loop || wi;
        this.hj = Mi(this.Qi);
    };
    Oi.prototype.play = function () {
        this.xe = goog$now();
        xi(this, this.xe);
        this.Fg.add(this);
    };
    Oi.prototype.pause = function () {
        this.Fg.remove(this);
    };
    var xi = function (a, b) {
        a.Rc = Math.min(a.Rc + (b - a.xe), a.ne);
        a.xe = b;
        var c = a.hj(a.Rc / a.ne);
        a.l.scrollTop = (a.Xh - a.Gf) * c + a.Gf;
        if ((c = a.Rc >= a.ne) && a.Wf) {
            yt$setTimeout(goog$bind(a.Wf, goog$global, a), 0);
        }
        return c;
    };
    var Pi = function (a, b) {
        Ni.call(this, a, b);
    };
    goog$inherits(Pi, Oi);
    Pi.prototype.ub = function (a) {
        Pi.b.ub.call(this, a);
        this.Gf = a.start;
        this.Xh = a.end;
    };
    var Qi = function (a) {
        $f.call(this, a);
    };
    goog$inherits(Qi, qi);
    Qi.prototype.tb = false;
    Qi.prototype.ld = false;
    Qi.prototype.d = function () {
        Qi.b.d.call(this);
        var a = this.f("legal-text");
        var b = {
            start: 0
        };
        b.end = a.scrollHeight - a.clientHeight;
        b.duration = b.end / 3;
        b.ih = "linear";
        this.Ec = new Pi(a, b);
        this.tb = true;
        Z(this.getHandler(), a, "click", this.Kd, false, this);
        Z(this.getHandler(), a, "mouseover", this.Ch, false, this);
        Z(this.getHandler(), a, "mouseout", this.Bh, false, this);
        Z(this.getHandler(), a, "scroll", this.xd, false, this);
    };
    Qi.prototype.xd = function () {
        if (!this.ld && !this.tb) {
            this.Ec.pause();
            this.ld = true;
        }
    };
    Qi.prototype.Kd = function () {
        this.Ec.pause();
        this.tb = false;
        this.ld = true;
    };
    Qi.prototype.Ch = function () {
        this.Ec.pause();
        this.tb = false;
    };
    Qi.prototype.Bh = function () {
        if (!this.tb && !this.ld) {
            this.Ec.play();
            this.tb = true;
        }
    };
    var Ri = function (a) {
        $f.call(this, a);
    };
    goog$inherits(Ri, qi);
    Ri.prototype.d = function () {
        Ri.b.d.call(this);
        this.A.push(yt$events$delegateByClass(this.a(), "click", goog$bind(this.zd, this), "expand-button"));
        this.A.push(yt$events$delegateByClass(this.a(), "click", goog$bind(this.yd, this), "collapse-button"));
    };
    Ri.prototype.zd = function () {
        var a = goog$dom$getElementByClass("expanded-content", this.a());
        var b = goog$dom$getElementByClass("collapsed-content", this.a());
        if (a && b) {
            goog$dom$classes$remove(a, "hid");
            goog$dom$classes$add(b, "hid");
        }
    };
    Ri.prototype.yd = function () {
        var a = goog$dom$getElementByClass("expanded-content", this.a());
        var b = goog$dom$getElementByClass("collapsed-content", this.a());
        if (a && b) {
            goog$dom$classes$remove(b, "hid");
            goog$dom$classes$add(a, "hid");
        }
    };
    var Si = function (a) {
        $f.call(this, a);
    };
    goog$inherits(Si, qi);
    Si.prototype.d = function () {
        Si.b.d.call(this);
        this.A.push(yt$events$delegateByClass(this.a(), "click", goog$bind(this.zd, this), "expand-button"));
        this.A.push(yt$events$delegateByClass(this.a(), "click", goog$bind(this.yd, this), "collapse-button"));
        this.sa = goog$dom$getElementByClass("add-comment-form", this.a());
        this.ef = goog$dom$getElementByClass("success", this.sa);
        this.td = goog$dom$getElementByClass("failure", this.sa);
        this.oc = goog$dom$getElementByClass("captcha", this.sa);
        if (this.sa) {
            Rf(this.getHandler(), this.sa, "click", this.Xg, false, this);
            Z(this.getHandler(), this.sa, "submit", this.Yg, false, this);
        }
    };
    Si.prototype.zd = function (a) {
        a = tc(a.currentTarget, "expander-container");
        goog$dom$classes$add(a, "expanded");
    };
    Si.prototype.yd = function (a) {
        a = tc(a.currentTarget, "expander-container");
        goog$dom$classes$remove(a, "expanded");
    };
    Si.prototype.Xg = function () {
        var a = goog$dom$getElementByClass("add-comment-form", this.a());
        goog$dom$classes$remove(a, "inactive");
    };
    var Ti = function () {
        var a = goog$dom$getElementByClass("add-comment-form");
        goog$dom$classes$remove(a, "loading");
    };
    Si.prototype.Yg = function (a) {
        a.preventDefault();
        yt$style$hide(this.ef);
        yt$style$hide(this.td);
        yt$style$hide(this.oc);
        goog$dom$classes$add(this.sa, "loading");
        a = {
            method: "POST",
            J: {
                action_add_comment: 1
            },
            of: goog$dom$forms$getFormDataString(this.sa),
            T: this,
            z: this.Fi
        };
        yt$net$ajax$send("/channel_ajax", a);
    };
    Si.prototype.Fi = function (a, b) {
        goog$dom$classes$remove(this.sa, "loading");
        if (b.code == "SUCCESS") {
            yt$style$show(this.ef);
            goog$dom$getElementByClass("add-channel-comment-input").value = "";
            Ti();
            goog$dom$removeChildren(this.oc);
        } else if (b.code == "CAPTCHA_REQUIRED") {
            this.oc.innerHTML = b.html;
            yt$style$show(this.oc);
        }
        if (b.errors) {
            goog$dom$setTextContent(this.td, b.errors[0]);
            yt$style$show(this.td);
            Ti();
        }
    };
    var Ui = function (a) {
        $f.call(this, a);
    };
    goog$inherits(Ui, qi);
    Ui.prototype.d = function () {
        Ui.b.d.call(this);
        this.A.push(yt$events$delegateByClass(this.a(), "click", goog$bind(this.hh, this), "more-videos"));
    };
    Ui.prototype.hh = function () {
        var a = this.f("more-videos");
        var b = a.value;
        var a = yt$dom$datasets$get(a, "list_id");
        var b = {
            method: "GET",
            J: {
                action_more_single_playlist_videos: 1,
                page: b,
                list_id: a
            },
            z: this.qi,
            ka: this.pi,
            T: this
        };
        Vi(this, true);
        yt$net$ajax$send("/channel_ajax", b);
    };
    var Vi = function (a, b) {
        a.f("more-videos").disabled = b;
        goog$dom$classes$enable(a.a(), "loading", b);
    };
    Ui.prototype.qi = function (a, b) {
        Vi(this, false);
        if (b.code == "SUCCESS") {
            var c = this.f("more-videos");
            var d = goog$dom$getAncestorByTagNameAndClass(c, "li");
            var c = d.parentNode;
            c.removeChild(d);
            d = gd(b.html);
            c.appendChild(d);
            for (c = Math.ceil(Math.max(0, 0) / 400); c >= 0; c--) {
                yt$net$delayed$load("thumb-group-" + c);
            }
        }
    };
    Ui.prototype.pi = function () {
        Vi(this, false);
    };
    var Wi = function (a, b) {
        a.setAttribute("role", b);
        a.qm = b;
    };
    var Xi = function (a, b) {
        $.call(this, b);
        this.na = a || "";
    };
    goog$inherits(Xi, $);
    Xi.prototype.Ca = null;
    var Yi = "placeholder" in document.createElement("input");
    Xi.prototype.Qb = false;
    Xi.prototype.K = function () {
        this.c = this.da().K("input", {
            type: "text"
        });
    };
    Xi.prototype.la = function (a) {
        Xi.b.la.call(this, a);
        if (!this.na) {
            this.na = a.getAttribute("label") || "";
        }
        var b;
        a: {
            var c = goog$dom$getOwnerDocument(a);
            try {
                b = c && c.activeElement;
                break a;
            } catch (d) {}
            b = null;
        }
        if (b == a) {
            this.Qb = true;
            goog$dom$classes$remove(this.a(), this.xc);
        }
        if (Yi) {
            this.a().placeholder = this.na;
        } else {
            this.a().setAttribute("aria-label", this.na);
        }
    };
    Xi.prototype.d = function () {
        Xi.b.d.call(this);
        var a = new Pf(this);
        Z(a, this.a(), "focus", this.jf);
        Z(a, this.a(), "blur", this.dh);
        if (Yi) {
            this.j = a;
        } else {
            if (goog$userAgent$GECKO) {
                Z(a, this.a(), ["keypress", "keydown", "keyup"], this.eh);
            }
            Z(
                a,
                goog$dom$getOwnerDocument(this.a())
                    ? goog$dom$getOwnerDocument(this.a()).parentWindow ||
                          goog$dom$getOwnerDocument(this.a()).defaultView
                    : window,
                "load",
                this.fh
            );
            this.j = a;
            Zi(this);
        }
        $i(this);
        this.a().Zg = this;
    };
    Xi.prototype.ja = function () {
        Xi.b.ja.call(this);
        aj(this);
        this.a().Zg = null;
    };
    var Zi = function (a) {
        if (!a.Lh && a.j && a.a().form) {
            Z(a.j, a.a().form, "submit", a.Mh);
            a.Lh = true;
        }
    };
    var aj = function (a) {
        if (a.j) {
            a.j.w();
            a.j = null;
        }
    };
    Xi.prototype.e = function () {
        Xi.b.e.call(this);
        aj(this);
    };
    Xi.prototype.xc = "label-input-label";
    Xi.prototype.jf = function () {
        this.Qb = true;
        goog$dom$classes$remove(this.a(), this.xc);
        if (!Yi && !bj(this) && !this.Oh) {
            var a = this;
            var b = function () {
                a.a().value = "";
            };
            if (goog$userAgent$IE) {
                yh(b, 10);
            } else {
                b();
            }
        }
    };
    Xi.prototype.dh = function () {
        if (!Yi) {
            Sf(this.j, this.a(), "click", this.jf);
            this.Ca = null;
        }
        this.Qb = false;
        $i(this);
    };
    Xi.prototype.eh = function (a) {
        if (a.keyCode == 27) {
            if (a.type == "keydown") {
                this.Ca = this.a().value;
            } else if (a.type == "keypress") {
                this.a().value = this.Ca;
            } else if (a.type == "keyup") {
                this.Ca = null;
            }
            a.preventDefault();
        }
    };
    Xi.prototype.Mh = function () {
        if (!bj(this)) {
            this.a().value = "";
            yh(this.ni, 10, this);
        }
    };
    Xi.prototype.ni = function () {
        if (!bj(this)) {
            this.a().value = this.na;
        }
    };
    Xi.prototype.fh = function () {
        $i(this);
    };
    var bj = function (a) {
        return !!a.a() && a.a().value != "" && a.a().value != a.na;
    };
    Xi.prototype.clear = function () {
        this.a().value = "";
        if (this.Ca != null) {
            this.Ca = "";
        }
    };
    Xi.prototype.reset = function () {
        if (bj(this)) {
            this.clear();
            $i(this);
        }
    };
    Xi.prototype.getValue = function () {
        if (this.Ca != null) {
            return this.Ca;
        } else if (bj(this)) {
            return this.a().value;
        } else {
            return "";
        }
    };
    var $i = function (a) {
        if (Yi) {
            if (a.a().placeholder != a.na) {
                a.a().placeholder = a.na;
            }
        } else {
            Zi(a);
            a.a().setAttribute("aria-label", a.na);
        }
        if (bj(a)) {
            goog$dom$classes$remove(a.a(), a.xc);
        } else {
            if (!a.Oh && !a.Qb) {
                goog$dom$classes$add(a.a(), a.xc);
            }
            if (!Yi) {
                yh(a.Sh, 10, a);
            }
        }
    };
    Xi.prototype.isEnabled = function () {
        return !this.a().disabled;
    };
    Xi.prototype.Sh = function () {
        if (this.a() && !bj(this) && !this.Qb) {
            this.a().value = this.na;
        }
    };
    var cj = function (a) {
        this.l = a;
        a = goog$dom$getElementByClass("search-field", this.l);
        new Xi(a.getAttribute("placeholder")).R(a);
    };
    var dj = function (a) {
        this.c = a;
        this.qj = goog$dom$getElementByClass("close", a);
        P(this.qj, "click", this.rj);
    };
    dj.prototype.rj = function (a) {
        a = tc(a.currentTarget, "subscription-menu-expandable");
        yt$style$hide(a);
    };
    var ej = function (a, b) {
        var c;
        if (a instanceof ej) {
            this.Eb(b == null ? a.pa : b);
            fj(this, a.Ga);
            gj(this, a.Zb);
            hj(this, a.$a);
            ij(this, a.Cb);
            this.setPath(a.getPath());
            jj(this, a.ga.S());
            kj(this, a.xb);
        } else if (a && (c = goog$uri$utils$split("" + a))) {
            this.Eb(!!b);
            fj(this, c[1] || "", true);
            gj(this, c[2] || "", true);
            hj(this, c[3] || "", true);
            ij(this, c[4]);
            this.setPath(c[5] || "", true);
            jj(this, c[6] || "", true);
            kj(this, c[7] || "", true);
        } else {
            this.Eb(!!b);
            this.ga = new lj(null, this, this.pa);
        }
    };
    ej.prototype.Ga = "";
    ej.prototype.Zb = "";
    ej.prototype.$a = "";
    ej.prototype.Cb = null;
    ej.prototype.ab = "";
    ej.prototype.xb = "";
    ej.prototype.mk = false;
    ej.prototype.pa = false;
    ej.prototype.toString = function () {
        if (this.$) {
            return this.$;
        }
        var a = [];
        if (this.Ga) {
            a.push(mj(this.Ga, nj), ":");
        }
        if (this.$a) {
            a.push("//");
            if (this.Zb) {
                a.push(mj(this.Zb, nj), "@");
            }
            a.push(goog$isString(this.$a) ? encodeURIComponent(this.$a) : null);
            if (this.Cb != null) {
                a.push(":", "" + this.Cb);
            }
        }
        if (this.ab) {
            if (this.$a && this.ab.charAt(0) != "/") {
                a.push("/");
            }
            a.push(mj(this.ab, this.ab.charAt(0) == "/" ? oj : pj));
        }
        var b = "" + this.ga;
        if (b) {
            a.push("?", b);
        }
        if (this.xb) {
            a.push("#", mj(this.xb, qj));
        }
        return (this.$ = a.join(""));
    };
    ej.prototype.S = function () {
        var a = this.Ga;
        var b = this.Zb;
        var c = this.$a;
        var d = this.Cb;
        var e = this.ab;
        var f = this.ga.S();
        var h = this.xb;
        var j = new ej(null, this.pa);
        if (a) {
            fj(j, a);
        }
        if (b) {
            gj(j, b);
        }
        if (c) {
            hj(j, c);
        }
        if (d) {
            ij(j, d);
        }
        if (e) {
            j.setPath(e);
        }
        if (f) {
            jj(j, f);
        }
        if (h) {
            kj(j, h);
        }
        return j;
    };
    var fj = function (a, b, c) {
        rj(a);
        delete a.$;
        a.Ga = c ? (b ? decodeURIComponent(b) : "") : b;
        if (a.Ga) {
            a.Ga = a.Ga.replace(/:$/, "");
        }
    };
    var gj = function (a, b, c) {
        rj(a);
        delete a.$;
        a.Zb = c ? (b ? decodeURIComponent(b) : "") : b;
    };
    var hj = function (a, b, c) {
        rj(a);
        delete a.$;
        a.$a = c ? (b ? decodeURIComponent(b) : "") : b;
    };
    var ij = function (a, b) {
        rj(a);
        delete a.$;
        if (b) {
            b = Number(b);
            if (isNaN(b) || b < 0) {
                throw Error("Bad port number " + b);
            }
            a.Cb = b;
        } else {
            a.Cb = null;
        }
    };
    ej.prototype.getPath = function () {
        return this.ab;
    };
    ej.prototype.setPath = function (a, b) {
        rj(this);
        delete this.$;
        this.ab = b ? (a ? decodeURIComponent(a) : "") : a;
        return this;
    };
    var jj = function (a, b, c) {
        rj(a);
        delete a.$;
        if (b instanceof lj) {
            a.ga = b;
            a.ga.ve = a;
            a.ga.Eb(a.pa);
        } else {
            if (!c) {
                b = mj(b, sj);
            }
            a.ga = new lj(b, a, a.pa);
        }
    };
    var kj = function (a, b, c) {
        rj(a);
        delete a.$;
        a.xb = c ? (b ? decodeURIComponent(b) : "") : b;
    };
    var rj = function (a) {
        if (a.mk) {
            throw Error("Tried to modify a read-only Uri");
        }
    };
    ej.prototype.Eb = function (a) {
        this.pa = a;
        if (this.ga) {
            this.ga.Eb(a);
        }
        return this;
    };
    var tj = /^[a-zA-Z0-9\-_.!~*'():\/;?]*$/;
    var mj = function (a, b) {
        var c = null;
        if (goog$isString(a)) {
            c = a;
            if (!tj.test(c)) {
                c = encodeURI(a);
            }
            if (c.search(b) >= 0) {
                c = c.replace(b, uj);
            }
        }
        return c;
    };
    var uj = function (a) {
        a = a.charCodeAt(0);
        return "%" + ((a >> 4) & 15).toString(16) + (a & 15).toString(16);
    };
    var nj = /[#\/\?@]/g;
    var pj = /[\#\?:]/g;
    var oj = /[\#\?]/g;
    var sj = /[\#\?@]/g;
    var qj = /#/g;
    var lj = function (a, b, c) {
        this.wa = a || null;
        this.ve = b || null;
        this.pa = !!c;
    };
    var wj = function (a) {
        if (!a.q && ((a.q = new goog$structs$Map()), (a.n = 0), a.wa)) {
            for (var b = a.wa.split("&"), c = 0; c < b.length; c++) {
                var d = b[c].indexOf("=");
                var e = null;
                var f = null;
                if (d >= 0) {
                    e = b[c].substring(0, d);
                    f = b[c].substring(d + 1);
                } else {
                    e = b[c];
                }
                e = decodeURIComponent(e.replace(/\+/g, " "));
                e = vj(a, e);
                a.add(e, f ? decodeURIComponent(f.replace(/\+/g, " ")) : "");
            }
        }
    };
    lj.prototype.q = null;
    lj.prototype.n = null;
    lj.prototype.add = function (a, b) {
        wj(this);
        xj(this);
        a = vj(this, a);
        if (this.xa(a)) {
            var c = this.q.get(a);
            if (goog$isArray(c)) {
                c.push(b);
            } else {
                this.q.set(a, [c, b]);
            }
        } else {
            this.q.set(a, b);
        }
        this.n++;
        return this;
    };
    lj.prototype.remove = function (a) {
        wj(this);
        a = vj(this, a);
        if (this.q.xa(a)) {
            xj(this);
            var b = this.q.get(a);
            if (goog$isArray(b)) {
                this.n -= b.length;
            } else {
                this.n--;
            }
            return this.q.remove(a);
        }
        return false;
    };
    lj.prototype.clear = function () {
        xj(this);
        if (this.q) {
            this.q.clear();
        }
        this.n = 0;
    };
    lj.prototype.xa = function (a) {
        wj(this);
        a = vj(this, a);
        return this.q.xa(a);
    };
    lj.prototype.bb = function () {
        wj(this);
        var a = this.q.Ka();
        for (var b = this.q.bb(), c = [], d = 0; d < b.length; d++) {
            var e = a[d];
            if (goog$isArray(e)) {
                for (var f = 0; f < e.length; f++) {
                    c.push(b[d]);
                }
            } else {
                c.push(b[d]);
            }
        }
        return c;
    };
    lj.prototype.Ka = function (a) {
        wj(this);
        if (a) {
            a = vj(this, a);
            if (this.xa(a)) {
                var b = this.q.get(a);
                if (goog$isArray(b)) {
                    return b;
                }
                a = [];
                a.push(b);
            } else {
                a = [];
            }
        } else {
            for (var b = this.q.Ka(), a = [], c = 0; c < b.length; c++) {
                var d = b[c];
                if (goog$isArray(d)) {
                    goog$array$extend(a, d);
                } else {
                    a.push(d);
                }
            }
        }
        return a;
    };
    lj.prototype.set = function (a, b) {
        wj(this);
        xj(this);
        a = vj(this, a);
        if (this.xa(a)) {
            var c = this.q.get(a);
            if (goog$isArray(c)) {
                this.n -= c.length;
            } else {
                this.n--;
            }
        }
        this.q.set(a, b);
        this.n++;
        return this;
    };
    lj.prototype.get = function (a, b) {
        wj(this);
        a = vj(this, a);
        if (this.xa(a)) {
            var c = this.q.get(a);
            if (goog$isArray(c)) {
                return c[0];
            } else {
                return c;
            }
        }
        return b;
    };
    lj.prototype.toString = function () {
        if (this.wa) {
            return this.wa;
        }
        if (!this.q) {
            return "";
        }
        var a = [];
        var b = 0;
        for (var c = this.q.bb(), d = 0; d < c.length; d++) {
            var e = c[d];
            var f = goog$string$urlEncode(e);
            var e = this.q.get(e);
            if (goog$isArray(e)) {
                for (var h = 0; h < e.length; h++) {
                    if (b > 0) {
                        a.push("&");
                    }
                    a.push(f);
                    if (e[h] !== "") {
                        a.push("=", goog$string$urlEncode(e[h]));
                    }
                    b++;
                }
            } else {
                if (b > 0) {
                    a.push("&");
                }
                a.push(f);
                if (e !== "") {
                    a.push("=", goog$string$urlEncode(e));
                }
                b++;
            }
        }
        return (this.wa = a.join(""));
    };
    var xj = function (a) {
        delete a.se;
        delete a.wa;
        if (a.ve) {
            delete a.ve.$;
        }
    };
    lj.prototype.S = function () {
        var a = new lj();
        if (this.se) {
            a.se = this.se;
        }
        if (this.wa) {
            a.wa = this.wa;
        }
        if (this.q) {
            a.q = this.q.S();
        }
        return a;
    };
    var vj = function (a, b) {
        var c = "" + b;
        if (a.pa) {
            c = c.toLowerCase();
        }
        return c;
    };
    lj.prototype.Eb = function (a) {
        if (a && !this.pa) {
            wj(this);
            xj(this);
            Td(
                this.q,
                function (a, c) {
                    var d = c.toLowerCase();
                    if (c != d) {
                        this.remove(c);
                        this.add(d, a);
                    }
                },
                this
            );
        }
        this.pa = a;
    };
    goog$addSingletonGetter(function () {});
    var Cj = function () {
        var a = new ej(window.location.href).xb.split("&")[0];
        var b = {
            length: 1,
            view: "",
            Le: "",
            ib: "",
            Kj: 0,
            eb: ""
        };
        if (!a || a == "") {
            return b;
        }
        var a = a.split("/");
        var c = a[0];
        if (c == "v") {
            b.eb = a[1] || "";
            return b;
        }
        c = yj(zj, c);
        if (c != "grid" && c != "play") {
            c = "";
            a.unshift(c);
        }
        b.view = c;
        b.length = a.length;
        if (b.length > 1) {
            b.Le = yj(Aj, a[1]);
        }
        switch (b.length) {
            case 2:
                if (a[1].length > 1) {
                    b = "";
                }
                break;
            case 3:
                if (b.Le == "live_streaming") {
                    b.eb = a[2];
                } else {
                    b.ib = yj(Bj, a[2]);
                }
                break;
            case 4:
                b.eb = a[3];
                break;
            case 5:
                b.ib = a[2];
                if (b.Le == "all") {
                    if (b.ib.indexOf("-all") < 0) {
                        b.ib += "-all";
                    }
                    b.ib = yj(Bj, b.ib);
                }
                b.Kj = a[3];
                b.eb = a[4];
                break;
            default:
                b = "";
        }
        return b;
    };
    var zj = {
        "-grid": "g",
        "-play": "p",
        "+p": "play",
        "+g": "grid"
    };
    var Aj = {
        "-all": "a",
        "+a": "all",
        "-favorites": "f",
        "+f": "favorites",
        "-uploads": "u",
        "+u": "uploads",
        "-playlists": "p",
        "+p": "playlists",
        "-user": "c",
        "+c": "user",
        "-topics": "t",
        "+t": "topics",
        "-recent": "r",
        "+r": "recent",
        "-live_streaming": "l",
        "+l": "live_streaming"
    };
    var Bj = {
        "-uploads-all": "u-all",
        "-favorites-all": "f-all",
        "+u-all": "uploads-all",
        "+f-all": "favorites-all"
    };
    var yj = function (a, b) {
        var c = a["+" + b];
        if (c) {
            return c;
        } else {
            return b;
        }
    };
    var ef = function (a, b, c) {
        if (c) {
            b.removeAttribute("id");
            goog$dom$classes$remove(b, "yt-alert-warn");
            goog$dom$classes$add(b, "yt-alert-error");
            goog$dom$getElementsByTagNameAndClass("DIV", "yt-alert-content", b)[0].innerHTML = a;
            c.appendChild(b);
            yt$style$show(b);
        }
    };
    var Ej = function (a, b) {
        if (!a) {
            throw Error("Invalid class name " + a);
        }
        if (!ea(b)) {
            throw Error("Invalid decorator function " + b);
        }
        Dj[a] = b;
    };
    var Fj = {};
    var Dj = {};
    var Gj = {
        aliceblue: "#f0f8ff",
        antiquewhite: "#faebd7",
        aqua: "#00ffff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        black: "#000000",
        blanchedalmond: "#ffebcd",
        blue: "#0000ff",
        blueviolet: "#8a2be2",
        brown: "#a52a2a",
        burlywood: "#deb887",
        cadetblue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",
        darkgreen: "#006400",
        darkgrey: "#a9a9a9",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkseagreen: "#8fbc8f",
        darkslateblue: "#483d8b",
        darkslategray: "#2f4f4f",
        darkslategrey: "#2f4f4f",
        darkturquoise: "#00ced1",
        darkviolet: "#9400d3",
        deeppink: "#ff1493",
        deepskyblue: "#00bfff",
        dimgray: "#696969",
        dimgrey: "#696969",
        dodgerblue: "#1e90ff",
        firebrick: "#b22222",
        floralwhite: "#fffaf0",
        forestgreen: "#228b22",
        fuchsia: "#ff00ff",
        gainsboro: "#dcdcdc",
        ghostwhite: "#f8f8ff",
        gold: "#ffd700",
        goldenrod: "#daa520",
        gray: "#808080",
        green: "#008000",
        greenyellow: "#adff2f",
        grey: "#808080",
        honeydew: "#f0fff0",
        hotpink: "#ff69b4",
        indianred: "#cd5c5c",
        indigo: "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        lavender: "#e6e6fa",
        lavenderblush: "#fff0f5",
        lawngreen: "#7cfc00",
        lemonchiffon: "#fffacd",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lightcyan: "#e0ffff",
        lightgoldenrodyellow: "#fafad2",
        lightgray: "#d3d3d3",
        lightgreen: "#90ee90",
        lightgrey: "#d3d3d3",
        lightpink: "#ffb6c1",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        lightskyblue: "#87cefa",
        lightslategray: "#778899",
        lightslategrey: "#778899",
        lightsteelblue: "#b0c4de",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        limegreen: "#32cd32",
        linen: "#faf0e6",
        magenta: "#ff00ff",
        maroon: "#800000",
        mediumaquamarine: "#66cdaa",
        mediumblue: "#0000cd",
        mediumorchid: "#ba55d3",
        mediumpurple: "#9370d8",
        mediumseagreen: "#3cb371",
        mediumslateblue: "#7b68ee",
        mediumspringgreen: "#00fa9a",
        mediumturquoise: "#48d1cc",
        mediumvioletred: "#c71585",
        midnightblue: "#191970",
        mintcream: "#f5fffa",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajowhite: "#ffdead",
        navy: "#000080",
        oldlace: "#fdf5e6",
        olive: "#808000",
        olivedrab: "#6b8e23",
        orange: "#ffa500",
        orangered: "#ff4500",
        orchid: "#da70d6",
        palegoldenrod: "#eee8aa",
        palegreen: "#98fb98",
        paleturquoise: "#afeeee",
        palevioletred: "#d87093",
        papayawhip: "#ffefd5",
        peachpuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderblue: "#b0e0e6",
        purple: "#800080",
        red: "#ff0000",
        rosybrown: "#bc8f8f",
        royalblue: "#4169e1",
        saddlebrown: "#8b4513",
        salmon: "#fa8072",
        sandybrown: "#f4a460",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        skyblue: "#87ceeb",
        slateblue: "#6a5acd",
        slategray: "#708090",
        slategrey: "#708090",
        snow: "#fffafa",
        springgreen: "#00ff7f",
        steelblue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        wheat: "#f5deb3",
        white: "#ffffff",
        whitesmoke: "#f5f5f5",
        yellow: "#ffff00",
        yellowgreen: "#9acd32"
    };
    var Lj = function (a) {
        var b = {};
        var a = "" + a;
        var c = a.charAt(0) == "#" ? a : "#" + a;
        if (Hj.test(c)) {
            b.We = Ij(c);
            b.type = "hex";
            return b;
        }
        a: {
            var d = a.match(Jj);
            if (d) {
                var c = Number(d[1]);
                var e = Number(d[2]);
                var d = Number(d[3]);
                if (c >= 0 && c <= 255 && e >= 0 && e <= 255 && d >= 0 && d <= 255) {
                    c = [c, e, d];
                    break a;
                }
            }
            c = [];
        }
        if (c.length) {
            e = c[0];
            a = c[1];
            c = c[2];
            e = Number(e);
            a = Number(a);
            c = Number(c);
            if (isNaN(e) || e < 0 || e > 255 || isNaN(a) || a < 0 || a > 255 || isNaN(c) || c < 0 || c > 255) {
                throw Error('"(' + e + "," + a + "," + c + '") is not a valid RGB color');
            }
            e = Kj(e.toString(16));
            a = Kj(a.toString(16));
            c = Kj(c.toString(16));
            b.We = "#" + e + a + c;
            b.type = "rgb";
            return b;
        }
        if (Gj && (c = Gj[a.toLowerCase()])) {
            b.We = c;
            b.type = "named";
            return b;
        }
        throw Error(a + " is not a valid color string");
    };
    var Mj = /#(.)(.)(.)/;
    var Ij = function (a) {
        if (!Hj.test(a)) {
            throw Error("'" + a + "' is not a valid hex color");
        }
        if (a.length == 4) {
            a = a.replace(Mj, "#$1$1$2$2$3$3");
        }
        return a.toLowerCase();
    };
    var Hj = /^#(?:[0-9a-f]{3}){1,2}$/i;
    var Jj = /^(?:rgb)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2})\)$/i;
    var Kj = function (a) {
        if (a.length == 1) {
            return "0" + a;
        } else {
            return a;
        }
    };
    var Oj = function (a, b) {
        if (a) {
            Nj(this, a, b);
        }
    };
    goog$inherits(Oj, Uf);
    Oj.prototype.c = null;
    Oj.prototype.Oc = null;
    Oj.prototype.oe = null;
    Oj.prototype.Pc = null;
    Oj.prototype.Ja = -1;
    Oj.prototype.Ia = -1;
    var Pj = {
        3: 13,
        12: 144,
        63232: 38,
        63233: 40,
        63234: 37,
        63235: 39,
        63236: 112,
        63237: 113,
        63238: 114,
        63239: 115,
        63240: 116,
        63241: 117,
        63242: 118,
        63243: 119,
        63244: 120,
        63245: 121,
        63246: 122,
        63247: 123,
        63248: 44,
        63272: 46,
        63273: 36,
        63275: 35,
        63276: 33,
        63277: 34,
        63289: 144,
        63302: 45
    };
    var Qj = {
        Up: 38,
        Down: 40,
        Left: 37,
        Right: 39,
        Enter: 13,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
        "U+007F": 46,
        Home: 36,
        End: 35,
        PageUp: 33,
        PageDown: 34,
        Insert: 45
    };
    var Rj = goog$userAgent$IE || (goog$userAgent$WEBKIT && goog$userAgent$isVersion("525"));
    Oj.prototype.fj = function (a) {
        if (goog$userAgent$WEBKIT && ((this.Ja == 17 && !a.ctrlKey) || (this.Ja == 18 && !a.altKey))) {
            this.Ia = this.Ja = -1;
        }
        if (Rj && !lh(a.keyCode, this.Ja, a.shiftKey, a.ctrlKey, a.altKey)) {
            this.handleEvent(a);
        } else {
            this.Ia = goog$userAgent$GECKO ? mh(a.keyCode) : a.keyCode;
        }
    };
    Oj.prototype.gj = function () {
        this.Ia = this.Ja = -1;
    };
    Oj.prototype.handleEvent = function (a) {
        var b = a.gb();
        var c;
        var d;
        if (goog$userAgent$IE && a.type == "keypress") {
            c = this.Ia;
            d = c != 13 && c != 27 ? b.keyCode : 0;
        } else if (goog$userAgent$WEBKIT && a.type == "keypress") {
            c = this.Ia;
            d = b.charCode >= 0 && b.charCode < 63232 && kh(c) ? b.charCode : 0;
        } else if (goog$userAgent$OPERA) {
            c = this.Ia;
            d = kh(c) ? b.keyCode : 0;
        } else {
            c = b.keyCode || this.Ia;
            d = b.charCode || 0;
            if (qb && d == 63 && c == 224) {
                c = 191;
            }
        }
        var e = c;
        var f = b.keyIdentifier;
        if (c) {
            if (c >= 63232 && c in Pj) {
                e = Pj[c];
            } else if (c == 25 && a.shiftKey) {
                e = 9;
            }
        } else if (f && f in Qj) {
            e = Qj[f];
        }
        a = e == this.Ja;
        this.Ja = e;
        b = new Sj(e, d, a, b);
        try {
            this.dispatchEvent(b);
        } finally {
            b.w();
        }
    };
    Oj.prototype.a = function () {
        return this.c;
    };
    var Nj = function (a, b, c) {
        if (a.Pc) {
            a.detach();
        }
        a.c = b;
        a.Oc = P(a.c, "keypress", a, c);
        a.oe = P(a.c, "keydown", a.fj, c, a);
        a.Pc = P(a.c, "keyup", a.gj, c, a);
    };
    Oj.prototype.detach = function () {
        if (this.Oc) {
            Tc(this.Oc);
            Tc(this.oe);
            Tc(this.Pc);
            this.Pc = this.oe = this.Oc = null;
        }
        this.c = null;
        this.Ia = this.Ja = -1;
    };
    Oj.prototype.e = function () {
        Oj.b.e.call(this);
        this.detach();
    };
    var Sj = function (a, b, c, d) {
        if (d) {
            this.U(d, undefined);
        }
        this.type = "key";
        this.keyCode = a;
        this.charCode = b;
        this.repeat = c;
    };
    goog$inherits(Sj, Fc);
    var Tj = function () {};
    var Uj;
    goog$addSingletonGetter(Tj);
    Tj.prototype.K = function (a) {
        var b = a.da().K("div", Vj(this, a).join(" "), a.getContent());
        Wj(a, b);
        return b;
    };
    Tj.prototype.ia = function (a) {
        return a;
    };
    Tj.prototype.Tb = function (a, b, c) {
        if ((a = a.a ? a.a() : a)) {
            if (goog$userAgent$IE && !goog$userAgent$isVersion("7")) {
                var d = Xj(goog$dom$classes$get(a), b);
                d.push(b);
                goog$partial(c ? goog$dom$classes$add : goog$dom$classes$remove, a).apply(null, d);
            } else {
                goog$dom$classes$enable(a, b, c);
            }
        }
    };
    Tj.prototype.vb = function () {
        return true;
    };
    Tj.prototype.R = function (a, b) {
        if (b.id) {
            a.qb(b.id);
        }
        var c = this.ia(b);
        if (c && c.firstChild) {
            a.ob(c.firstChild.nextSibling ? goog$array$toArray(c.childNodes) : c.firstChild);
        } else {
            a.ob(null);
        }
        var d = 0;
        var e = this.F();
        var f = this.F();
        var h = false;
        var j = false;
        var c = false;
        var m = goog$dom$classes$get(b);
        goog$array$forEach(
            m,
            function (a) {
                if (!h && a == e) {
                    h = true;
                    if (f == e) {
                        j = true;
                    }
                } else if (!j && a == f) {
                    j = true;
                } else {
                    var b = d;
                    if (!this.Qf) {
                        if (!this.Nc) {
                            Yj(this);
                        }
                        var c = this.Nc;
                        var m = {};
                        var p;
                        for (p in c) {
                            m[c[p]] = p;
                        }
                        this.Qf = m;
                    }
                    a = parseInt(this.Qf[a], 10);
                    d = b | (isNaN(a) ? 0 : a);
                }
            },
            this
        );
        a.p = d;
        if (!h) {
            m.push(e);
            if (f == e) {
                j = true;
            }
        }
        if (!j) {
            m.push(f);
        }
        var p = a.fa;
        if (p) {
            m.push.apply(m, p);
        }
        if (goog$userAgent$IE && !goog$userAgent$isVersion("7")) {
            var z = Xj(m);
            if (z.length > 0) {
                m.push.apply(m, z);
                c = true;
            }
        }
        if (!h || !j || p || c) {
            b.className = m.join(" ");
        }
        Wj(a, b);
        return b;
    };
    var Wj = function (a, b) {
        goog$asserts$assert(a);
        goog$asserts$assert(b);
        if (!a.isEnabled()) {
            Zj(b, 1, true);
        }
        if (a.ze()) {
            Zj(b, 8, true);
        }
        if (a.Y & 16) {
            Zj(b, 16, !!(a.p & 16));
        }
        if (a.Y & 64) {
            Zj(b, 64, !!(a.p & 64));
        }
    };
    Tj.prototype.uc = function (a, b) {
        Pe(a, !b, !goog$userAgent$IE && !goog$userAgent$OPERA);
    };
    Tj.prototype.Mb = function (a, b) {
        this.Tb(a, this.F() + "-rtl", b);
    };
    Tj.prototype.ig = function (a) {
        var b;
        if (a.Y & 32 && (b = a.kb())) {
            return pc(b);
        } else {
            return false;
        }
    };
    Tj.prototype.lc = function (a, b) {
        var c;
        if (a.Y & 32 && (c = a.kb())) {
            if (!b && a.p & 32) {
                try {
                    c.blur();
                } catch (d) {}
                if (a.p & 32) {
                    a.Ye();
                }
            }
            if (pc(c) != b) {
                if (b) {
                    c.tabIndex = 0;
                } else {
                    c.tabIndex = -1;
                    c.removeAttribute("tabIndex");
                }
            }
        }
    };
    Tj.prototype.setVisible = function (a, b) {
        Ne(a, b);
    };
    Tj.prototype.qa = function (a, b, c) {
        var d = a.a();
        if (d) {
            var e = $j(this, b);
            if (e) {
                this.Tb(a, e, c);
            }
            Zj(d, b, c);
        }
    };
    var Zj = function (a, b, c) {
        if (!Uj) {
            Uj = {
                1: "disabled",
                8: "selected",
                16: "checked",
                64: "expanded"
            };
        }
        if ((b = Uj[b])) {
            a.setAttribute("aria-" + b, c);
        }
    };
    Tj.prototype.setContent = function (a, b) {
        var c = this.ia(a);
        if (c && (goog$dom$removeChildren(c), b)) {
            if (goog$isString(b)) {
                goog$dom$setTextContent(c, b);
            } else {
                var d = function (a) {
                    if (a) {
                        var b = goog$dom$getOwnerDocument(c);
                        c.appendChild(goog$isString(a) ? b.createTextNode(a) : a);
                    }
                };
                if (goog$isArray(b)) {
                    goog$array$forEach(b, d);
                } else if (goog$isArrayLike(b) && !("nodeType" in b)) {
                    goog$array$forEach(goog$array$toArray(b), d);
                } else {
                    d(b);
                }
            }
        }
    };
    Tj.prototype.kb = function (a) {
        return a.a();
    };
    Tj.prototype.F = function () {
        return "goog-control";
    };
    var Vj = function (a, b) {
        var c = a.F();
        var d = [c];
        var e = a.F();
        if (e != c) {
            d.push(e);
        }
        c = b.p;
        for (e = []; c;) {
            var f = c & -c;
            e.push($j(a, f));
            c &= ~f;
        }
        d.push.apply(d, e);
        if ((c = b.fa)) {
            d.push.apply(d, c);
        }
        if (goog$userAgent$IE && !goog$userAgent$isVersion("7")) {
            d.push.apply(d, Xj(d));
        }
        return d;
    };
    var Xj = function (a, b) {
        var c = [];
        if (b) {
            a = a.concat([b]);
        }
        goog$array$forEach([], function (d) {
            if (Ia(d, goog$partial(goog$array$contains, a)) && (!b || goog$array$contains(d, b))) {
                c.push(d.join("_"));
            }
        });
        return c;
    };
    var $j = function (a, b) {
        if (!a.Nc) {
            Yj(a);
        }
        return a.Nc[b];
    };
    var Yj = function (a) {
        var b = a.F();
        a.Nc = {
            1: b + "-disabled",
            2: b + "-hover",
            4: b + "-active",
            8: b + "-selected",
            16: b + "-checked",
            32: b + "-focused",
            64: b + "-open"
        };
    };
    var ak = function (a, b, c) {
        $.call(this, c);
        if (!b) {
            for (var b = this.constructor, d; b;) {
                d = goog$getUid(b);
                if ((d = Fj[d])) {
                    break;
                }
                b = b.b ? b.b.constructor : null;
            }
            b = d ? (ea(d.getInstance) ? d.getInstance() : new d()) : null;
        }
        this.o = b;
        this.ob(a);
    };
    goog$inherits(ak, $);
    ak.prototype.Rd = null;
    ak.prototype.p = 0;
    ak.prototype.Y = 39;
    ak.prototype.Tj = 255;
    ak.prototype.Aj = 0;
    ak.prototype.wc = true;
    ak.prototype.fa = null;
    ak.prototype.Sg = true;
    ak.prototype.sc = false;
    ak.prototype.Ff = null;
    ak.prototype.kb = function () {
        return this.o.kb(this);
    };
    ak.prototype.Tb = function (a, b) {
        if (b) {
            if (a) {
                if (this.fa) {
                    if (!goog$array$contains(this.fa, a)) {
                        this.fa.push(a);
                    }
                } else {
                    this.fa = [a];
                }
                this.o.Tb(this, a, true);
            }
        } else if (a && this.fa) {
            Ka(this.fa, a);
            if (this.fa.length == 0) {
                this.fa = null;
            }
            this.o.Tb(this, a, false);
        }
    };
    ak.prototype.K = function () {
        var a = this.o.K(this);
        this.c = a;
        var b = this.Ff || undefined;
        if (b) {
            Wi(a, b);
        }
        if (!this.sc) {
            this.o.uc(a, false);
        }
        if (!this.isVisible()) {
            this.o.setVisible(a, false);
        }
    };
    ak.prototype.ia = function () {
        return this.o.ia(this.a());
    };
    ak.prototype.vb = function (a) {
        return this.o.vb(a);
    };
    ak.prototype.la = function (a) {
        this.c = a = this.o.R(this, a);
        var b = this.Ff || undefined;
        if (b) {
            Wi(a, b);
        }
        if (!this.sc) {
            this.o.uc(a, false);
        }
        this.wc = a.style.display != "none";
    };
    ak.prototype.d = function () {
        ak.b.d.call(this);
        var a = this.o;
        if (this.Nb == null) {
            this.Nb = goog$style$isRightToLeft(this.H ? this.c : this.ya.k.body);
        }
        if (this.Nb) {
            a.Mb(this.a(), true);
        }
        if (this.isEnabled()) {
            a.lc(this, this.isVisible());
        }
        if (this.Y & -2) {
            if (this.Sg) {
                var a = this.getHandler();
                var b = this.a();
                Z(
                    Z(Z(Z(a, b, "mouseover", this.rd), b, "mousedown", this.pd), b, "mouseup", this.Tg),
                    b,
                    "mouseout",
                    this.qd
                );
                if (goog$userAgent$IE) {
                    Z(a, b, "dblclick", this.Qg);
                }
            }
            if (this.Y & 32 && (a = this.kb())) {
                b = this.jb || (this.jb = new Oj());
                Nj(b, a);
                Z(Z(Z(this.getHandler(), b, "key", this.Ze), a, "focus", this.Rg), a, "blur", this.Ye);
            }
        }
    };
    ak.prototype.ja = function () {
        ak.b.ja.call(this);
        if (this.jb) {
            this.jb.detach();
        }
        if (this.isVisible() && this.isEnabled()) {
            this.o.lc(this, false);
        }
    };
    ak.prototype.e = function () {
        ak.b.e.call(this);
        if (this.jb) {
            this.jb.w();
            delete this.jb;
        }
        delete this.o;
        this.fa = this.Rd = null;
    };
    ak.prototype.getContent = function () {
        return this.Rd;
    };
    ak.prototype.setContent = function (a) {
        this.o.setContent(this.a(), a);
        this.ob(a);
    };
    ak.prototype.ob = function (a) {
        this.Rd = a;
    };
    ak.prototype.Mb = function (a) {
        ak.b.Mb.call(this, a);
        var b = this.a();
        if (b) {
            this.o.Mb(b, a);
        }
    };
    ak.prototype.uc = function (a) {
        this.sc = a;
        var b = this.a();
        if (b) {
            this.o.uc(b, a);
        }
    };
    ak.prototype.isVisible = function () {
        return this.wc;
    };
    ak.prototype.setVisible = function (a, b) {
        if (b || (this.wc != a && this.dispatchEvent(a ? "show" : "hide"))) {
            var c = this.a();
            if (c) {
                this.o.setVisible(c, a);
            }
            if (this.isEnabled()) {
                this.o.lc(this, a);
            }
            this.wc = a;
            return true;
        }
        return false;
    };
    ak.prototype.isEnabled = function () {
        return !(this.p & 1);
    };
    var ck = function (a, b) {
        if (bk(a, 2, b)) {
            a.qa(2, b);
        }
    };
    ak.prototype.vc = function () {
        return !!(this.p & 4);
    };
    ak.prototype.setActive = function (a) {
        if (bk(this, 4, a)) {
            this.qa(4, a);
        }
    };
    ak.prototype.ze = function () {
        return !!(this.p & 8);
    };
    ak.prototype.Ce = function (a) {
        if (bk(this, 8, a)) {
            this.qa(8, a);
        }
    };
    ak.prototype.qa = function (a, b) {
        if (this.Y & a && b != !!(this.p & a)) {
            this.o.qa(this, a, b);
            this.p = b ? this.p | a : this.p & ~a;
        }
    };
    var dk = function (a, b) {
        if (a.H && a.p & 32 && !b) {
            throw Error("Component already rendered");
        }
        if (!b && a.p & 32) {
            a.qa(32, false);
        }
        a.Y = b ? a.Y | 32 : a.Y & -33;
    };
    var ek = function (a, b) {
        return !!(a.Tj & b) && !!(a.Y & b);
    };
    var bk = function (a, b, c) {
        return !!(a.Y & b) && !!(a.p & b) != c && (!(a.Aj & b) || a.dispatchEvent(Xf(b, c))) && !a.ke;
    };
    ak.prototype.rd = function (a) {
        if (
            (!a.relatedTarget || !goog$dom$contains(this.a(), a.relatedTarget)) &&
            this.dispatchEvent("enter") &&
            this.isEnabled() &&
            ek(this, 2)
        ) {
            ck(this, true);
        }
    };
    ak.prototype.qd = function (a) {
        if ((!a.relatedTarget || !goog$dom$contains(this.a(), a.relatedTarget)) && this.dispatchEvent("leave")) {
            if (ek(this, 4)) {
                this.setActive(false);
            }
            if (ek(this, 2)) {
                ck(this, false);
            }
        }
    };
    ak.prototype.pd = function (a) {
        if (this.isEnabled()) {
            if (ek(this, 2)) {
                ck(this, true);
            }
            if (Hc(a)) {
                if (ek(this, 4)) {
                    this.setActive(true);
                }
                if (this.o.ig(this)) {
                    this.kb().focus();
                }
            }
        }
        if (!this.sc && Hc(a)) {
            a.preventDefault();
        }
    };
    ak.prototype.Tg = function (a) {
        if (this.isEnabled()) {
            if (ek(this, 2)) {
                ck(this, true);
            }
            if (this.vc() && this.fc(a) && ek(this, 4)) {
                this.setActive(false);
            }
        }
    };
    ak.prototype.Qg = function (a) {
        if (this.isEnabled()) {
            this.fc(a);
        }
    };
    ak.prototype.fc = function (a) {
        if (ek(this, 16)) {
            var b = !(this.p & 16);
            if (bk(this, 16, b)) {
                this.qa(16, b);
            }
        }
        if (ek(this, 8)) {
            this.Ce(true);
        }
        if (ek(this, 64)) {
            b = !(this.p & 64);
            if (bk(this, 64, b)) {
                this.qa(64, b);
            }
        }
        b = new zc("action", this);
        if (a) {
            b.altKey = a.altKey;
            b.ctrlKey = a.ctrlKey;
            b.metaKey = a.metaKey;
            b.shiftKey = a.shiftKey;
            b.re = a.re;
        }
        return this.dispatchEvent(b);
    };
    ak.prototype.Rg = function () {
        if (ek(this, 32) && bk(this, 32, true)) {
            this.qa(32, true);
        }
    };
    ak.prototype.Ye = function () {
        if (ek(this, 4)) {
            this.setActive(false);
        }
        if (ek(this, 32) && bk(this, 32, false)) {
            this.qa(32, false);
        }
    };
    ak.prototype.Ze = function (a) {
        if (this.isVisible() && this.isEnabled() && a.keyCode == 13 && this.fc(a)) {
            a.preventDefault();
            a.stopPropagation();
            return true;
        } else {
            return false;
        }
    };
    if (!ea(ak)) {
        throw Error("Invalid component class " + ak);
    }
    if (!ea(Tj)) {
        throw Error("Invalid renderer class " + Tj);
    }
    var fk = goog$getUid(ak);
    Fj[fk] = Tj;
    Ej("goog-control", function () {
        return new ak(null);
    });
    var gk = function () {};
    goog$inherits(gk, Tj);
    goog$addSingletonGetter(gk);
    var hk = 0;
    gk.prototype.K = function (a) {
        var b = Vj(this, a);
        return a.da().K("div", b ? b.join(" ") : null, ik(this, a.getContent(), a.Zc(), a.da()));
    };
    var ik = function (a, b, c, d) {
        var e = [];
        for (var f = 0, h = 0; f < c.height; f++) {
            var j = [];
            for (var m = 0; m < c.width; m++) {
                var p = b && b[h++];
                j.push(jk(a, p, d));
            }
            e.push(d.K("tr", a.F() + "-row", j));
        }
        return a.ng(e, d);
    };
    gk.prototype.ng = function (a, b) {
        var c = b.K("table", this.F() + "-table", b.K("tbody", this.F() + "-body", a));
        c.cellSpacing = 0;
        c.cellPadding = 0;
        Wi(c, "grid");
        return c;
    };
    var jk = function (a, b, c) {
        a = c.K(
            "td",
            {
                class: a.F() + "-cell",
                id: a.F() + "-cell-" + hk++
            },
            b
        );
        Wi(a, "gridcell");
        return a;
    };
    gk.prototype.vb = function () {
        return false;
    };
    gk.prototype.R = function () {
        return null;
    };
    gk.prototype.setContent = function (a, b) {
        if (a) {
            var c = goog$dom$getElementsByTagNameAndClass("tbody", this.F() + "-body", a)[0];
            if (c) {
                var d = 0;
                goog$array$forEach(c.rows, function (a) {
                    goog$array$forEach(a.cells, function (a) {
                        goog$dom$removeChildren(a);
                        if (b) {
                            var c = b[d++];
                            if (c) {
                                a.appendChild(c);
                            }
                        }
                    });
                });
                if (d < b.length) {
                    var e = [];
                    var f = goog$dom$getDomHelper(a);
                    var h = c.rows[0].cells.length;
                    for (; d < b.length;) {
                        var j = b[d++];
                        e.push(jk(this, j, f));
                        if (e.length == h) {
                            j = f.K("tr", this.F() + "-row", e);
                            c.appendChild(j);
                            e.length = 0;
                        }
                    }
                    if (e.length > 0) {
                        while (e.length < h) {
                            e.push(jk(this, "", f));
                        }
                        j = f.K("tr", this.F() + "-row", e);
                        c.appendChild(j);
                    }
                }
            }
            Pe(a, true, goog$userAgent$GECKO);
        }
    };
    var kk = function (a, b, c) {
        for (b = b.a(); c && c.nodeType == 1 && c != b;) {
            if (c.tagName == "TD" && goog$dom$classes$has(c, a.F() + "-cell")) {
                return c.firstChild;
            }
            c = c.parentNode;
        }
        return null;
    };
    var lk = function (a, b, c, d) {
        if (c) {
            c = c.parentNode;
            goog$dom$classes$enable(c, a.F() + "-cell-hover", d);
            b.a().firstChild.setAttribute("aria-activedescendent", c.id);
        }
    };
    gk.prototype.F = function () {
        return "goog-palette";
    };
    var nk = function (a) {
        this.Lc = [];
        mk(this, a);
    };
    goog$inherits(nk, Uf);
    nk.prototype.Fa = null;
    nk.prototype.fe = null;
    var mk = function (a, b) {
        if (b) {
            goog$array$forEach(
                b,
                function (a) {
                    this.Yb(a, false);
                },
                a
            );
            goog$array$extend(a.Lc, b);
        }
    };
    nk.prototype.Oe = function () {
        return this.Fa;
    };
    nk.prototype.Se = function (a) {
        if (a != this.Fa) {
            this.Yb(this.Fa, false);
            this.Fa = a;
            this.Yb(a, true);
        }
        this.dispatchEvent("select");
    };
    nk.prototype.cc = function () {
        if (this.Fa) {
            return goog$array$indexOf(this.Lc, this.Fa);
        } else {
            return -1;
        }
    };
    nk.prototype.clear = function () {
        var a = this.Lc;
        if (!goog$isArray(a)) {
            for (var b = a.length - 1; b >= 0; b--) {
                delete a[b];
            }
        }
        a.length = 0;
        this.Fa = null;
    };
    nk.prototype.e = function () {
        nk.b.e.call(this);
        delete this.Lc;
        this.Fa = null;
    };
    nk.prototype.Yb = function (a, b) {
        if (a) {
            if (typeof this.fe == "function") {
                this.fe(a, b);
            } else if (typeof a.Ce == "function") {
                a.Ce(b);
            }
        }
    };
    var ok = function (a, b, c) {
        ak.call(this, a, b || gk.getInstance(), c);
    };
    goog$inherits(ok, ak);
    ok.prototype.Z = null;
    ok.prototype.Ya = -1;
    ok.prototype.P = null;
    ok.prototype.e = function () {
        ok.b.e.call(this);
        if (this.P) {
            this.P.w();
            this.P = null;
        }
        this.Z = null;
    };
    ok.prototype.ob = function (a) {
        ok.b.ob.call(this, a);
        pk(this);
        if (this.P) {
            this.P.clear();
            mk(this.P, a);
        } else {
            this.P = new nk(a);
            this.P.fe = goog$bind(this.Yb, this);
            Z(this.getHandler(), this.P, "select", this.ti);
        }
        this.Ya = -1;
    };
    ok.prototype.rd = function (a) {
        ok.b.rd.call(this, a);
        var b = kk(this.o, this, a.target);
        if ((!b || !a.relatedTarget || !goog$dom$contains(b, a.relatedTarget)) && b != qk(this)) {
            a = this.getContent();
            rk(this, a ? goog$array$indexOf(a, b) : -1);
        }
    };
    ok.prototype.qd = function (a) {
        ok.b.qd.call(this, a);
        var b = kk(this.o, this, a.target);
        if ((!b || !a.relatedTarget || !goog$dom$contains(b, a.relatedTarget)) && b == qk(this)) {
            lk(this.o, this, b, false);
        }
    };
    ok.prototype.pd = function (a) {
        ok.b.pd.call(this, a);
        if (this.vc() && ((a = kk(this.o, this, a.target)), a != qk(this))) {
            var b = this.getContent();
            rk(this, b ? goog$array$indexOf(b, a) : -1);
        }
    };
    ok.prototype.fc = function () {
        var a = qk(this);
        if (a) {
            this.Se(a);
            return this.dispatchEvent("action");
        } else {
            return false;
        }
    };
    ok.prototype.Ze = function (a) {
        var b = this.getContent();
        var b = b ? b.length : 0;
        var c = this.Z.width;
        if (b == 0 || !this.isEnabled()) {
            return false;
        }
        if (a.keyCode == 13 || a.keyCode == 32) {
            return this.fc(a);
        }
        if (a.keyCode == 36) {
            rk(this, 0);
            return true;
        }
        if (a.keyCode == 35) {
            rk(this, b - 1);
            return true;
        }
        var d = this.Ya < 0 ? this.cc() : this.Ya;
        switch (a.keyCode) {
            case 37:
                if (d == -1) {
                    d = b;
                }
                if (d > 0) {
                    rk(this, d - 1);
                    a.preventDefault();
                    return true;
                }
                break;
            case 39:
                if (d < b - 1) {
                    rk(this, d + 1);
                    a.preventDefault();
                    return true;
                }
                break;
            case 38:
                if (d == -1) {
                    d = b + c - 1;
                }
                if (d >= c) {
                    rk(this, d - c);
                    a.preventDefault();
                    return true;
                }
                break;
            case 40:
                if (d == -1) {
                    d = -c;
                }
                if (d < b - c) {
                    rk(this, d + c);
                    a.preventDefault();
                    return true;
                }
        }
        return false;
    };
    ok.prototype.ti = function () {};
    ok.prototype.Zc = function () {
        return this.Z;
    };
    ok.prototype.setSize = function (a, b) {
        if (this.a()) {
            throw Error("Component already rendered");
        }
        this.Z = typeof a == "number" ? new goog$math$Size(a, b) : a;
        pk(this);
    };
    var qk = function (a) {
        var b = a.getContent();
        return b && b[a.Ya];
    };
    var rk = function (a, b) {
        if (b != a.Ya) {
            sk(a, a.Ya, false);
            a.Ya = b;
            sk(a, b, true);
        }
    };
    ok.prototype.cc = function () {
        if (this.P) {
            return this.P.cc();
        } else {
            return -1;
        }
    };
    ok.prototype.Oe = function () {
        if (this.P) {
            return this.P.Oe();
        } else {
            return null;
        }
    };
    ok.prototype.Se = function (a) {
        if (this.P) {
            this.P.Se(a);
        }
    };
    var sk = function (a, b, c) {
        if (a.a()) {
            var d = a.getContent();
            if (d && b >= 0 && b < d.length) {
                lk(a.o, a, d[b], c);
            }
        }
    };
    ok.prototype.Yb = function (a, b) {
        if (this.a() && a) {
            goog$dom$classes$enable(a.parentNode, this.o.F() + "-cell-selected", b);
        }
    };
    var pk = function (a) {
        var b = a.getContent();
        if (b) {
            if (a.Z && a.Z.width) {
                b = Math.ceil(b.length / a.Z.width);
                if (typeof a.Z.height != "number" || a.Z.height < b) {
                    a.Z.height = b;
                }
            } else {
                b = Math.ceil(Math.sqrt(b.length));
                a.Z = new goog$math$Size(b, b);
            }
        } else {
            a.Z = new goog$math$Size(0, 0);
        }
    };
    var tk = function (a, b, c) {
        this.qe = a || [];
        ok.call(this, null, b || gk.getInstance(), c);
        this.fd(this.qe);
    };
    goog$inherits(tk, ok);
    tk.prototype.fd = function (a) {
        this.qe = a;
        this.setContent(uk(this));
    };
    tk.prototype.Od = function () {
        var a = this.Oe();
        if (a) {
            var a = a.style[goog$string$toCamelCase("background-color")] || "";
            var b;
            a: {
                if (a) {
                    try {
                        b = Lj(a).We;
                        break a;
                    } catch (c) {}
                }
                b = null;
            }
            return b;
        }
        return null;
    };
    var uk = function (a) {
        return goog$array$map(
            a.qe,
            function (a) {
                var c = this.da().K("div", {
                    class: this.o.F() + "-colorswatch",
                    style: "background-color:" + a
                });
                if (a.charAt(0) == "#") {
                    a = Ij(a);
                    a =
                        "RGB (" +
                        [parseInt(a.substr(1, 2), 16), parseInt(a.substr(3, 2), 16), parseInt(a.substr(5, 2), 16)].join(
                            ", "
                        ) +
                        ")";
                }
                c.title = a;
                return c;
            },
            a
        );
    };
    var vk = function (a, b) {
        $.call(this, a);
        this.C = b || null;
        Z(this.getHandler(), this, "action", this.Pj);
    };
    goog$inherits(vk, $);
    vk.prototype.vd = true;
    vk.prototype.fd = function (a) {
        if (this.C) {
            this.C.fd(a);
        } else {
            wk(this, a);
        }
    };
    vk.prototype.setSize = function (a) {
        if (!this.C) {
            wk(this, []);
        }
        this.C.setSize(a);
    };
    vk.prototype.Zc = function () {
        if (this.C) {
            return this.C.Zc();
        } else {
            return null;
        }
    };
    vk.prototype.cc = function () {
        if (this.C) {
            return this.C.cc();
        } else {
            return -1;
        }
    };
    vk.prototype.Od = function () {
        if (this.C) {
            return this.C.Od();
        } else {
            return null;
        }
    };
    vk.prototype.ig = function () {
        return this.vd;
    };
    vk.prototype.lc = function (a) {
        this.vd = a;
        if (this.C) {
            dk(this.C, a);
        }
    };
    vk.prototype.vb = function () {
        return false;
    };
    vk.prototype.d = function () {
        vk.b.d.call(this);
        if (this.C) {
            this.C.Oa(this.a());
        }
        this.a().unselectable = "on";
    };
    vk.prototype.e = function () {
        vk.b.e.call(this);
        if (this.C) {
            this.C.w();
            this.C = null;
        }
    };
    vk.prototype.focus = function () {
        if (this.C) {
            this.C.a().focus();
        }
    };
    vk.prototype.Pj = function (a) {
        a.stopPropagation();
        this.dispatchEvent("change");
    };
    var wk = function (a, b) {
        var c = new tk(b, null, a.da());
        c.setSize(5);
        dk(c, a.vd);
        var d = a.M ? a.M.length : 0;
        if (c.H && !a.H) {
            throw Error("Component already rendered");
        }
        if (d < 0 || d > (a.M ? a.M.length : 0)) {
            throw Error("Child component index out of bounds");
        }
        if (!a.O || !a.M) {
            a.O = {};
            a.M = [];
        }
        if (c.getParent() == a) {
            var e = c.getId();
            a.O[e] = c;
            Ka(a.M, c);
        } else {
            gb(a.O, c.getId(), c);
        }
        Yf(c, a);
        goog$array$splice(a.M, d, 0, c);
        if (c.H && a.H && c.getParent() == a) {
            e = a.ia();
            e.insertBefore(c.a(), e.childNodes[d] || null);
        } else if (a.H && !c.H && c.c) {
            c.d();
        }
        a.C = c;
        if (a.H) {
            a.C.Oa(a.a());
        }
    };
    var yk = function () {
        var a = new vk(undefined);
        a.setSize(7);
        a.fd(xk);
        return a;
    };
    var xk =
        "#ffffff,#cccccc,#c0c0c0,#999999,#666666,#333333,#000000,#ffcccc,#ff6666,#ff0000,#cc0000,#990000,#660000,#330000,#ffcc99,#ff9966,#ff9900,#ff6600,#cc6600,#993300,#663300,#ffff99,#ffff66,#ffcc66,#ffcc33,#cc9933,#996633,#663333,#ffffcc,#ffff33,#ffff00,#ffcc00,#999900,#666600,#333300,#99ff99,#66ff99,#33ff33,#33cc00,#009900,#006600,#003300,#99ffff,#33ffff,#66cccc,#00cccc,#339999,#336666,#003333,#ccffff,#66ffff,#33ccff,#3366ff,#3333ff,#000099,#000066,#ccccff,#9999ff,#6666cc,#6633ff,#6600cc,#333399,#330099,#ffccff,#ff99ff,#cc66cc,#cc33cc,#993399,#663366,#330033".split(
            ","
        );
    var zk = function () {
        $.call(this);
    };
    goog$inherits(zk, $);
    zk.prototype.d = function () {
        zk.b.d.call(this);
        this.qc = this.f("background-color");
        Ak(this, this.qc.value);
        var a = this.getHandler();
        var b = this.f("color-pallete");
        this.rf = yk();
        this.rf.Oa(b);
        Z(a, this.rf, "change", function (a) {
            Bk(this, a.target.Od());
        });
        Z(a, this.qc, "keyup", function (a) {
            Bk(this, a.target.value);
        });
        b = this.f("clear-color-selection");
        Z(a, b, "click", this.Dh, false, this);
        b = this.f("cancel-color-picker");
        Z(a, b, "click", this.Fh, false, this);
        b = this.f("set-new-bg-color");
        Z(
            a,
            b,
            "click",
            function () {
                Ak(this, this.qc.value);
            },
            false,
            this
        );
    };
    zk.prototype.Dh = function () {
        this.Lg = "";
        Bk(this, "");
    };
    var Bk = function (a, b) {
        var c = goog$dom$getElementsByClass("color-display-box", a.a());
        goog$array$forEach(c, function (a) {
            xe(a, "background-color", b);
        });
        a.qc.value = b;
    };
    var Ak = function (a, b) {
        a.Lg = b;
        Bk(a, b);
    };
    zk.prototype.Fh = function () {
        Bk(this, this.Lg);
    };
    Ej("channels-color-picker", function () {
        return new zk();
    });
    var Ck = function (a) {
        this.c = a;
        this.Pf =
            goog$userAgent$IE || (goog$userAgent$WEBKIT && !goog$userAgent$isVersion("531") && a.tagName == "TEXTAREA");
        this.j = new Pf(this);
        Z(this.j, this.c, this.Pf ? ["keydown", "paste", "cut", "drop"] : "input", this);
    };
    goog$inherits(Ck, Uf);
    Ck.prototype.Q = null;
    Ck.prototype.handleEvent = function (a) {
        if (this.Pf) {
            if (a.type != "keydown" || jh(a)) {
                var b = a.type == "keydown" ? this.c.value : null;
                if (goog$userAgent$IE && a.keyCode == 229) {
                    b = null;
                }
                var c = Dk(a);
                Ek(this);
                this.Q = yh(
                    function () {
                        this.Q = null;
                        if (this.c.value != b) {
                            Fk(this, c);
                        }
                    },
                    0,
                    this
                );
            }
        } else if (!goog$userAgent$OPERA || this.c == goog$dom$getOwnerDocument(this.c).activeElement) {
            Fk(this, Dk(a));
        }
    };
    var Ek = function (a) {
        if (a.Q != null) {
            goog$Timer$defaultTimerObject.clearTimeout(a.Q);
            a.Q = null;
        }
    };
    var Dk = function (a) {
        a = new Fc(a.gb());
        a.type = "input";
        return a;
    };
    var Fk = function (a, b) {
        try {
            a.dispatchEvent(b);
        } finally {
            b.w();
        }
    };
    Ck.prototype.e = function () {
        Ck.b.e.call(this);
        this.j.w();
        Ek(this);
        delete this.c;
    };
    var Gk = function () {
        this.N = [];
        this.nb = [];
        this.sd = {};
        this.j = new Pf(this);
        this.Eh = this.Xb = false;
        this.Ld = true;
    };
    goog$inherits(Gk, Uf);
    Gk.prototype.Nf = 0;
    Gk.prototype.Of = function (a) {
        this.Nf = a;
    };
    var Hk = function (a, b, c) {
        goog$asserts$assert(!a.Xb);
        b.gf = c;
        b.Pa = undefined;
        a.N.push(b);
    };
    var Ik = function (a, b) {
        goog$asserts$assert(!a.Xb);
        a.Rf = b;
    };
    var Jk = function (a) {
        goog$asserts$assert(!a.Xb);
        a.Jf = "dragging";
    };
    Gk.prototype.U = function () {
        if (!this.Xb) {
            for (var a = 0, b = this.N.length; a < b; a++) {
                var c = gc(this.N[a]);
                for (var d = 0, e = c.length; d < e; ++d) {
                    var f = c[d];
                    var h = this.Rf(f);
                    this.sd[goog$getUid(h)] = f;
                    if (this.Tf) {
                        Z(this.j, f, "mouseover", this.Ci);
                        Z(this.j, f, "mouseout", this.Bi);
                    }
                    if (this.Sf) {
                        Z(this.j, h, "mouseover", this.Ai);
                        Z(this.j, h, "mouseout", this.zi);
                    }
                    this.nb.push(f);
                    Z(this.j, h, ["mousedown", "touchstart"], this.Di);
                }
            }
            this.Xb = true;
        }
    };
    Gk.prototype.e = function () {
        this.j.w();
        for (var a = 0, b = this.N.length; a < b; a++) {
            var c = this.N[a];
            c.gf = undefined;
            c.Pa = undefined;
        }
        this.N.length = 0;
        this.nb.length = 0;
        this.sd = null;
        Kk(this);
        Gk.b.e.call(this);
    };
    var Lk = function (a, b) {
        for (var c = 0, d = a.N.length; c < d; c++) {
            var e = a.N[c];
            e.wb = goog$style$getBounds(e);
        }
        c = 0;
        for (d = a.nb.length; c < d; c++) {
            e = a.nb[c];
            if (e != b) {
                e.wb = goog$style$getBounds(e);
            }
        }
    };
    Gk.prototype.Di = function (a) {
        this.g = this.sd[goog$getUid(a.currentTarget)];
        var b;
        a: {
            b = this.g;
            var c = b.cloneNode(true);
            switch (b.tagName.toLowerCase()) {
                case "tr":
                    b = goog$dom$createDom("table", null, goog$dom$createDom("tbody", null, c));
                    break a;
                case "td":
                case "th":
                    b = goog$dom$createDom(
                        "table",
                        null,
                        goog$dom$createDom("tbody", null, goog$dom$createDom("tr", null, c))
                    );
                    break a;
                default:
                    b = c;
            }
        }
        this.B = b;
        if (this.Jf) {
            goog$dom$classes$add(this.B, this.Jf);
        }
        this.B.style.margin = "0";
        this.B.style.position = "absolute";
        this.B.style.visibility = "hidden";
        goog$dom$getOwnerDocument(this.g).body.appendChild(this.B);
        b = goog$style$getPageOffset(this.g);
        Je(this.B, b);
        this.Ba = new Bh(this.B);
        this.Ba.Of(this.Nf);
        P(this.Ba, "start", this.xi, false, this);
        P(this.Ba, "end", this.wi, false, this);
        P(this.Ba, "earlycancel", this.Xd, false, this);
        this.Ba.wd(a);
    };
    Gk.prototype.xi = function (a) {
        if (this.dispatchEvent(new Mk("beforedragstart", this, a.Ef, this.g, null))) {
            this.Hc = this.g.parentNode;
            this.sf = this.Vd =
                this.g.nextElementSibling != undefined ? this.g.nextElementSibling : hc(this.g.nextSibling, true);
            this.Td = this.Hc;
            if (this.Yd) {
                goog$dom$classes$add.apply(null, goog$array$concat(this.g, this.Yd));
            } else {
                this.g.style.visibility = "hidden";
            }
            var b = goog$style$getSize(this.B);
            this.B.Ih = b.width / 2;
            this.B.Hh = b.height / 2;
            this.B.style.visibility = "";
            if (this.Ld) {
                this.g.style.display = "none";
            }
            Lk(this, this.g);
            this.g.style.display = "";
            P(this.Ba, "drag", this.mi, false, this);
            this.dispatchEvent(new Mk("dragstart", this, a.Ef, this.g, this.B));
        } else {
            a.preventDefault();
            this.Xd();
        }
    };
    Gk.prototype.mi = function (a) {
        var b = goog$style$getPageOffset(this.B);
        var b = new goog$math$Coordinate(b.x + this.B.Ih, b.y + this.B.Hh);
        var c;
        a: {
            c = null;
            if (this.g.style.display != "none") {
                c = this.g.parentNode;
                var d = goog$style$getBounds(c);
                if (Nk(b, d)) {
                    break a;
                }
            }
            for (var d = 0, e = this.N.length; d < e; d++) {
                var f = this.N[d];
                if (f != c && Nk(b, f.wb)) {
                    c = f;
                    break a;
                }
            }
            c = null;
        }
        var h;
        if (c) {
            if (c == null) {
                throw Error("getHoverNextItem_ called with null hoverList.");
            }
            var j;
            var m;
            var d = false;
            var e = undefined;
            switch (c.gf) {
                case 0:
                    h = b.y;
                    j = Ok;
                    m = Pk;
                    break;
                case 4:
                    d = true;
                case 2:
                    h = b.x;
                    j = Qk;
                    m = Pk;
                    break;
                case 5:
                    d = true;
                case 3:
                    h = b.x;
                    j = Rk;
                    m = Sk;
            }
            var f = null;
            var p;
            var z = gc(c);
            for (var A = 0, H = z.length; A < H; A++) {
                var L = z[A];
                if (L != this.g) {
                    var Ha = j(L.wb);
                    if (d) {
                        var pb = Tk(L, b);
                        if (!goog$isDef(e)) {
                            e = pb;
                        }
                        if (m(h, Ha) && (p == undefined || pb < e || (pb == e && (m(Ha, p) || Ha == p)))) {
                            f = L;
                            p = Ha;
                        }
                        if (pb < e) {
                            e = pb;
                        }
                    } else if (m(h, Ha) && (p == undefined || m(Ha, p))) {
                        f = L;
                        p = Ha;
                    }
                }
            }
            h = f !== null && Tk(f, b) > e ? null : f;
        } else {
            h = null;
        }
        if (!this.dispatchEvent(new Mk("beforedragmove", this, a, this.g, this.B))) {
            return false;
        }
        if (c) {
            if (this.Ld) {
                if (
                    this.g.parentNode != c ||
                    (this.g.nextElementSibling != undefined
                        ? this.g.nextElementSibling
                        : hc(this.g.nextSibling, true)) != h
                ) {
                    c.insertBefore(this.g, h);
                }
            } else if (h != null) {
                this.sf = h;
            }
            this.g.style.display = "";
            if (c.Pa) {
                goog$dom$classes$add(c, c.Pa);
            }
        } else {
            if (!this.Eh) {
                this.g.style.display = "none";
            }
            h = 0;
            for (j = this.N.length; h < j; h++) {
                m = this.N[h];
                if (m.Pa) {
                    goog$dom$classes$remove(m, m.Pa);
                }
            }
        }
        if (c != this.Td) {
            this.Td = c;
            Lk(this, this.g);
        }
        this.dispatchEvent(new Mk("dragmove", this, a, this.g, this.B));
        return false;
    };
    Gk.prototype.Xd = function () {
        Kk(this);
        delete this.g;
        delete this.Td;
        delete this.Hc;
        delete this.Vd;
        delete this.B;
        delete this.Ba;
        for (var a = 0, b = this.N.length; a < b; a++) {
            this.N[a].wb = null;
        }
        a = 0;
        for (b = this.nb.length; a < b; a++) {
            this.nb[a].wb = null;
        }
    };
    Gk.prototype.wi = function (a) {
        if (!this.dispatchEvent(new Mk("beforedragend", this, a, this.g, this.B))) {
            return false;
        }
        if (!this.Ld) {
            this.Hc.insertBefore(this.g, this.sf);
        }
        Kk(this);
        this.dispatchEvent(new Mk("dragend", this, a, this.g, this.B));
        this.Xd();
        return true;
    };
    var Kk = function (a) {
        yc(a.Ba);
        if (a.B) {
            goog$dom$removeNode(a.B);
        }
        if (a.g && a.g.style.display == "none") {
            a.Hc.insertBefore(a.g, a.Vd);
            a.g.style.display = "";
        }
        if (a.Yd && a.g) {
            goog$dom$classes$remove.apply(null, goog$array$concat(a.g, a.Yd));
        } else if (a.g) {
            a.g.style.visibility = "visible";
        }
        for (var b = 0, c = a.N.length; b < c; b++) {
            var d = a.N[b];
            if (d.Pa) {
                goog$dom$classes$remove(d, d.Pa);
            }
        }
    };
    Gk.prototype.Rf = function (a) {
        return a;
    };
    Gk.prototype.Ci = function (a) {
        goog$dom$classes$add.apply(null, goog$array$concat(a.currentTarget, this.Tf));
    };
    Gk.prototype.Bi = function (a) {
        goog$dom$classes$remove.apply(null, goog$array$concat(a.currentTarget, this.Tf));
    };
    Gk.prototype.Ai = function (a) {
        goog$dom$classes$add.apply(null, goog$array$concat(a.currentTarget, this.Sf));
    };
    Gk.prototype.zi = function (a) {
        goog$dom$classes$remove.apply(null, goog$array$concat(a.currentTarget, this.Sf));
    };
    var Nk = function (a, b) {
        return a.x > b.left && a.x < b.left + b.width && a.y > b.top && a.y < b.top + b.height;
    };
    var Tk = function (a, b) {
        var c = a.wb;
        return Math.abs(b.y - (c.top + (c.height - 1) / 2));
    };
    var Ok = function (a) {
        return a.top + a.height - 1;
    };
    var Qk = function (a) {
        return a.left + a.width - 1;
    };
    var Rk = function (a) {
        return a.left || 0;
    };
    var Pk = function (a, b) {
        return a < b;
    };
    var Sk = function (a, b) {
        return a > b;
    };
    var Mk = function (a, b, c, d, e) {
        zc.call(this, a);
        this.za = b;
        this.event = c;
        this.rg = d;
        this.sg = e;
    };
    goog$inherits(Mk, zc);
    var Uk = function () {
        $.call(this);
    };
    goog$inherits(Uk, $);
    Uk.prototype.d = function () {
        this.za = new Gk();
        Jk(this.za);
        Ik(this.za, function (a) {
            return goog$dom$getElementByClass("yt-drag-drop-list-handle", a);
        });
        var a = yt$dom$datasets$get(this.a(), "drag-drop-direction") || "down";
        Hk(this.za, this.a(), goog$style$isRightToLeft(this.a()) ? Vk[a] : Wk[a]);
        Z(this.getHandler(), this.za, "dragstart", goog$bind(this.Rh, this));
        Z(this.getHandler(), this.za, "dragend", goog$bind(this.Qh, this));
        this.za.U();
    };
    Uk.prototype.e = function () {
        delete this.za;
        Uk.b.e.call(this);
    };
    Uk.prototype.Rh = function (a) {
        a.sg.style.width = goog$style$getComputedStyle(a.rg, "width");
        a.sg.style.height = goog$style$getComputedStyle(a.rg, "height");
        if (this.Oj) {
            this.xg = new Kh(this.Oj);
            if (this.Db) {
                this.xg.Fe = Xk(this.Db);
            }
        }
    };
    Uk.prototype.Qh = function (a) {
        this.dispatchEvent(a);
        yc(this.xg);
    };
    var Xk = function (a) {
        return function (b, c, d) {
            var e = 0;
            if (b < c) {
                e = -a;
            } else if (b > c + d) {
                e = a;
            }
            return e;
        };
    };
    var Wk = {
        vertical: 0,
        horizontal: 2,
        "2D": 4
    };
    var Vk = {
        vertical: 0,
        horizontal: 3,
        "2D": 5
    };
    Ej("yt-drag-drop-list", function () {
        return new Uk();
    });
    var Yk = function () {
        $.call(this);
        this.A = [];
    };
    goog$inherits(Yk, $);
    Yk.prototype.e = function () {
        for (var a = this.A.length, b = 0; b < a; b++) {
            yt$events$unlistenByKey(this.A[b]);
        }
        Yk.b.e.call(this);
    };
    var Zk = function () {
        Yk.call(this);
    };
    goog$inherits(Zk, Yk);
    Zk.prototype.la = function (a) {
        Zk.b.la.call(this, a);
        a = this.f("custom-url-template");
        this.Nh = yt$templates$fromElement(a, ["URL", "TITLE", "TEXT", "FAVICON_DOMAIN"]);
        this.mb = this.f("url-input-box");
        this.nc = this.f("title-input-box");
        this.mc = this.f("add-custom-external-link");
    };
    Zk.prototype.d = function () {
        Zk.b.d.call(this);
        $k(this);
        this.A.push(yt$events$listen(this.mc, "click", goog$bind(this.Ug, this)));
        var a = new Ck(this.mb);
        this.A.push(yt$events$listen(a, "input", goog$bind(this.Wg, this)));
        this.A.push(yt$events$delegateByClass(this.a(), "click", goog$bind(this.Vg, this), "remove"));
        this.bf = new Xi(this.mb.getAttribute("placeholder"));
        this.bf.R(this.mb);
        this.af = new Xi(this.nc.getAttribute("placeholder"));
        this.af.R(this.nc);
        this.mc.disabled = true;
    };
    Zk.prototype.e = function () {
        Zk.b.e.call(this);
        this.bf.w();
        this.af.w();
        this.ta.w();
    };
    Zk.prototype.Ug = function () {
        var a = this.mb.value;
        var b = a.replace(/(https?:\/\/)?/, "").replace(/\/.*/, "");
        var c = this.nc.value;
        var d = c;
        if (!d) {
            d = a.replace(/(https?:\/\/)?(www\.)?/, "");
        }
        if (d.length > 26) {
            d = d.substring(0, 26) + "...";
        }
        a = this.Nh.Oa({
            URL: a,
            TITLE: c,
            TEXT: d,
            FAVICON_DOMAIN: b
        });
        this.f("custom-links-preview").appendChild(goog$dom$htmlToDocumentFragment(a));
        this.mb.value = "";
        this.nc.value = "";
        $k(this);
        this.mc.disabled = true;
    };
    Zk.prototype.Vg = function (a) {
        a = tc(a.currentTarget, "field-container");
        goog$dom$removeNode(a);
        $k(this);
    };
    Zk.prototype.Wg = function () {
        this.mc.disabled = this.mb.value.length == 0;
    };
    var $k = function (a) {
        if (a.ta) {
            a.ta.w();
        }
        a.ta = new Uk();
        a.ta.R(a.f("custom-links-preview"));
    };
    Ej("custom-links-section", function () {
        return new Zk();
    });
    var al = function () {
        Yk.call(this);
    };
    goog$inherits(al, Yk);
    al.prototype.d = function () {
        this.Qd = this.f("remove-error");
        this.gh = yt$dom$datasets$get(this.a(), "module-id");
        this.A.push(md(this.a(), goog$bind(this.Md, this), "button", "remove"));
    };
    al.prototype.Md = function (a) {
        a.preventDefault();
        a = {
            method: "POST",
            J: {
                channel_id: yt$getConfig("CHANNEL_ID"),
                session_token: yt$net$ajax$tokenMap_.channel_ajax,
                module_id: this.gh,
                action_remove_featured_player: 1
            },
            z: this.Pi,
            ka: this.Oi,
            T: this
        };
        this.be();
        yt$net$ajax$send("/channel_ajax", a);
    };
    al.prototype.Pi = function () {
        gg(window.location.href);
    };
    al.prototype.Oi = function (a, b) {
        var c = b.error;
        goog$dom$getElementByClass("yt-alert-content", this.Qd).innerHTML = c;
        yt$style$show(this.Qd);
    };
    al.prototype.be = function () {
        yt$style$hide(this.Qd);
    };
    Ej("remove-featured-player", function () {
        return new al();
    });
    var bl = function () {
        Yk.call(this);
    };
    goog$inherits(bl, Yk);
    bl.prototype.d = function () {
        var a = this.f("multi-channel-select-channel-template");
        this.th = yt$templates$fromElement(a, ["title", "subscriber_count", "name", "logo_url"]);
        goog$dom$removeNode(a);
        this.Pd = this.f("lookup-error");
        this.A.push(md(this.a(), goog$bind(this.qf, this), "button", "add"));
        this.A.push(
            yt$events$listen(
                this.f("channel-input"),
                "keydown",
                goog$bind(function (a) {
                    if (a.keyCode == 13) {
                        a.preventDefault();
                        this.qf.call(this, a);
                    }
                }, this)
            )
        );
        this.A.push(md(this.a(), goog$bind(this.Md, this), "button", "remove"));
    };
    bl.prototype.qf = function (a) {
        a.preventDefault();
        a = {
            method: "GET",
            J: {
                action_get_other_channel_item: 1,
                username: this.f("channel-input").value
            },
            z: this.li,
            ka: this.ki,
            T: this
        };
        this.be();
        yt$net$ajax$send("/channel_ajax", a);
    };
    bl.prototype.li = function (a, b) {
        var c = this.th.Oa(b);
        var c = goog$dom$htmlToDocumentFragment(c);
        if (cl(this, yt$dom$getFirstElementByTagNameAndClass("input", "other-channel-name-input", c).value)) {
            dl(this, "Sorry, this Channel is already featured.");
        } else {
            this.f("selected-list").appendChild(c);
            this.f("channel-input").value = "";
        }
    };
    var cl = function (a, b) {
        var c = Tb("input", "", a.f("selected-list"));
        return goog$array$some(c, function (a) {
            return a.value == b;
        });
    };
    bl.prototype.ki = function (a, b) {
        dl(this, b.error);
    };
    bl.prototype.be = function () {
        yt$style$hide(this.Pd);
    };
    var dl = function (a, b) {
        goog$dom$getElementByClass("yt-alert-content", a.Pd).innerHTML = b;
        yt$style$show(a.Pd);
    };
    bl.prototype.Md = function (a) {
        a.preventDefault();
        a = goog$dom$getAncestorByTagNameAndClass(a.target, null, "channel");
        goog$dom$removeNode(a);
    };
    Ej("multi-channel-selector", function () {
        return new bl();
    });
    var el = function () {
        $.call(this);
    };
    goog$inherits(el, $);
    el.prototype.d = function () {
        el.b.d.call(this);
        fl(this);
        var a = ["name", "description", "video_count", "full_list_id"];
        var b = this.f("selected-playlist-template");
        this.$g = yt$templates$fromElement(b, a);
        b = this.f("pool-item-template");
        this.bh = yt$templates$fromElement(b, a);
        md(this.a(), goog$bind(this.cf, this), "button", "add-selected");
        md(this.a(), goog$bind(this.df, this), "button", "remove");
        a = this.f("editor-dropdown-head");
        yt$events$listen(a, "click", goog$bind(this.ah, this));
    };
    el.prototype.e = function () {
        el.b.e.call(this);
        od(this.a(), "click", this.cf);
        od(this.a(), "click", this.df);
        this.ta.w();
    };
    el.prototype.cf = function (a) {
        a.preventDefault();
        a = Tb("label", "playlist", gl(this));
        goog$array$forEach(
            a,
            function (a) {
                if (goog$dom$getElementByClass("pool-item-checkbox", a).checked) {
                    var c = yt$dom$datasets$get(a, "featured-playlist");
                    var c = goog$json$parse(c);
                    var c = hl(this.$g, c);
                    goog$dom$getElementByClass("selected-playlists", this.a()).appendChild(c);
                    goog$dom$removeNode(a);
                }
            },
            this
        );
        fl(this);
    };
    var fl = function (a) {
        if (a.ta) {
            a.ta.w();
        }
        a.ta = new Uk();
        a.ta.R(goog$dom$getElementByClass("selected-playlists", a.a()));
    };
    el.prototype.df = function (a) {
        a.preventDefault();
        var a = goog$dom$getAncestorByTagNameAndClass(a.target, null, "playlist");
        var b = yt$dom$datasets$get(a, "featured-playlist");
        var b = goog$json$parse(b);
        var b = hl(this.bh, b);
        gl(this).appendChild(b);
        goog$dom$removeNode(a);
        fl(this);
    };
    el.prototype.ah = function () {
        var a = goog$dom$getElementsByClass("pool-item-checkbox", gl(this));
        goog$array$forEach(a, function (a) {
            a.checked = false;
        });
    };
    var hl = function (a, b) {
        var c = a.Oa(b);
        var c = gd(c);
        var c = goog$dom$getFirstElementChild(c);
        var d = [];
        goog$json$Serializer$serialize_(new fe(), b, d);
        yt$dom$datasets$set(c, "featured-playlist", d.join(""));
        return c;
    };
    var gl = function (a) {
        return goog$dom$getElementByClass("selection-list-container", a.a());
    };
    Ej("multi-playlist-select", function () {
        return new el();
    });
    var il = function () {
        $.call(this);
    };
    goog$inherits(il, $);
    il.prototype.pc = function () {
        goog$dom$classes$remove(this.a(), "has-results");
        goog$dom$classes$remove(this.Bd, "has-results");
        if (this.yb) {
            this.da().removeNode(this.yb);
            this.yb = null;
        }
        yt$setTimeout(
            goog$bind(function () {
                this.Ob.value = "";
            }, this),
            1
        );
    };
    il.prototype.setVisible = function (a) {
        if (!a) {
            this.pc();
        }
        yt$style$setDisplayed(this.a(), a);
    };
    il.prototype.la = function (a) {
        il.b.la.call(this, a);
        this.Ob = this.f("search-input");
        a = yt$dom$datasets$get(this.a(), "search-results-container-id");
        this.Bd = this.da().a(a);
        new Xi(this.Ob.getAttribute("placeholder")).R(this.Ob);
    };
    il.prototype.d = function () {
        il.b.d.call(this);
        Z(this.getHandler(), this.Ob, "keydown", this.Gh);
        var a = this.f("search-btn");
        Z(this.getHandler(), a, "click", this.wf);
        a = this.f("clear-search");
        Z(this.getHandler(), a, "click", this.pc);
    };
    il.prototype.Gh = function (a) {
        if (a.keyCode == 13) {
            a.preventDefault();
            this.wf();
        } else if (a.keyCode == 27) {
            this.pc();
        }
    };
    il.prototype.wf = function () {
        goog$dom$classes$add(this.a(), "loading");
        goog$dom$classes$remove(this.a(), "has-results");
        yt$net$ajax$send("/channel_ajax?action_featured_video_editor_search=1", {
            T: this,
            J: {
                playlist_id: this.kh,
                query: this.Ob.value
            },
            z: this.vh,
            ra: function () {
                goog$dom$classes$remove(this.a(), "loading");
            }
        });
    };
    il.prototype.vh = function (a, b) {
        if (this.yb) {
            this.da().removeNode(this.yb);
        }
        var c = b.html;
        var d = document.createElement("div");
        d.innerHTML = c;
        this.yb = goog$dom$getFirstElementChild(d);
        this.da().appendChild(this.Bd, this.yb);
        goog$dom$classes$add(this.a(), "has-results");
        goog$dom$classes$add(this.Bd, "has-results");
    };
    var jl = function () {
        Yk.call(this);
        this.Hd = {};
    };
    goog$inherits(jl, Yk);
    jl.prototype.la = function (a) {
        jl.b.la.call(this, a);
        this.rc = new il();
        this.rc.R(this.f("video-live-search"));
        this.Qa = this.f("playlist-selector");
        this.Aa = this.f("selection-list-container");
        this.Ac = this.f("selection-list");
    };
    jl.prototype.d = function () {
        if (this.Qa.options.length) {
            Z(this.getHandler(), this.Qa, "change", this.vi, false, this);
            this.A.push(yt$events$delegateByClass(this.Aa, "click", goog$bind(this.ui, this), "selection-list-item"));
            var a = this.f("feature-first-video-checkbox");
            this.A.push(yt$events$listen(a, "click", goog$bind(this.Lf, this)));
            for (var b = (a = 0); b < this.Qa.options.length; ++b) {
                if (this.Qa.options[b].selected) {
                    a = b;
                }
            }
            this.ge = yt$dom$getFirstElementByTagNameAndClass("li", "selected", this.Aa);
            this.Hd[this.Qa.options[a].value] = this.Ac;
            kl(this);
            this.Lf();
        }
    };
    jl.prototype.Lf = function () {
        var a = this.f("feature-first-video-checkbox");
        var b = goog$dom$getElementsByTagNameAndClass("input", null, a)[0].checked;
        yt$style$setDisplayed(this.Aa, !b);
        a = goog$dom$getElementsByClass("radio", this.Aa);
        goog$array$forEach(a, function (a) {
            a.disabled = b;
        });
    };
    var kl = function (a) {
        var b = a.Qa.options[a.Qa.selectedIndex];
        var c = b.value;
        var d = a.Hd[c];
        var e = yt$dom$datasets$get(b, "show-search") == "true";
        a.rc.pc();
        a.rc.setVisible(e);
        if (e) {
            a.rc.kh = c;
        }
        if (d) {
            ll(a, d);
        } else {
            c = {
                playlist_id: c,
                channel_id: yt$dom$datasets$get(a.a(), "channel-id")
            };
            d = {};
            d.SUCCESS = goog$bind(a.Ph, a, b.value);
            ml(c, d);
        }
    };
    jl.prototype.Ph = function (a, b) {
        this.Aa.appendChild(goog$dom$htmlToDocumentFragment(b.html));
        var c = this.Aa.lastElementChild != undefined ? this.Aa.lastElementChild : hc(this.Aa.lastChild, false);
        this.Hd[a] = c;
        ll(this, c);
    };
    var ml = function (a, b) {
        a.action_get_playlist_videos = "1";
        yt$net$ajax$send("/channel_ajax", {
            method: "GET",
            J: a,
            z: function (a, d) {
                var e = b[d.code];
                if (e) {
                    e(d);
                }
            }
        });
    };
    var ll = function (a, b) {
        if (a.Ac) {
            goog$dom$classes$remove(a.Ac, "selected");
        }
        goog$dom$classes$add(b, "selected");
        a.Ac = b;
    };
    jl.prototype.vi = function () {
        kl(this);
    };
    jl.prototype.ui = function (a) {
        a = a.currentTarget;
        if (this.ge) {
            goog$dom$classes$remove(this.ge, "selected");
        }
        goog$dom$classes$add(a, "selected");
        this.ge = a;
    };
    Ej("playlist-video-selector", function () {
        return new jl();
    });
    var nl = function (a) {
        $.call(this, a);
    };
    goog$inherits(nl, $);
    nl.prototype.d = function () {
        this.Jd = goog$dom$getElementByClass("selected", this.a());
        nl.b.d.call(this);
        md(this.a(), goog$bind(this.kf, this), "li");
    };
    nl.prototype.e = function () {
        nl.b.e.call(this);
        od(this.a(), "click", this.kf);
    };
    nl.prototype.kf = function (a) {
        a = a.currentTarget;
        if (this.Jd) {
            goog$dom$classes$remove(this.Jd, "selected");
        }
        goog$dom$classes$add(a, "selected");
        this.Jd = a;
        yt$dom$getFirstElementByTagNameAndClass("input", "", a).checked = true;
    };
    Ej("radio-list", function () {
        return new nl();
    });
    var ol = function () {
        Yk.call(this);
    };
    goog$inherits(ol, Yk);
    ol.prototype.d = function () {
        this.Sd = this.f("selected");
        this.A.push(yt$events$delegateByClass(this.a(), "click", goog$bind(this.Ah, this), "select-on-click"));
    };
    ol.prototype.Ah = function (a) {
        if (this.Sd) {
            goog$dom$classes$remove(this.Sd, "selected");
        }
        a = goog$dom$getAncestorByTagNameAndClass(a.target, null, "selection-list-item");
        goog$dom$classes$add(a, "selected");
        this.Sd = a;
        goog$dom$getElementsByTagNameAndClass("input", null, a)[0].checked = true;
    };
    Ej("single-playlist-selector", function () {
        return new ol();
    });
    var pl = function () {
        this.ec = {};
    };
    goog$addSingletonGetter(pl);
    var ql = function (a, b) {
        var c = goog$dom$getElementsByClass("custom-form-element", b);
        goog$array$forEach(
            c,
            function (a) {
                var b = goog$getUid(a);
                if (!this.ec[b]) {
                    var c = this.ec;
                    var h;
                    a: {
                        var j = goog$dom$classes$get(a);
                        for (var m = 0, p = j.length; m < p; m++) {
                            if ((h = j[m] in Dj ? Dj[j[m]]() : null)) {
                                break a;
                            }
                        }
                        h = null;
                    }
                    if (h) {
                        h.R(a);
                    }
                    c[b] = h;
                }
            },
            a
        );
    };
    var rl = function (a, b) {
        var c = goog$dom$getElementsByClass("custom-form-element", b);
        goog$array$forEach(
            c,
            function (a) {
                a = goog$getUid(a);
                if (a in this.ec) {
                    this.ec[a].w();
                    delete this.ec[a];
                }
            },
            a
        );
    };
    var sl = function (a) {
        $f.call(this, a);
    };
    goog$inherits(sl, $f);
    sl.prototype.jh = "enter-edit-mode";
    sl.prototype.ff = "cancel-edit-mode";
    sl.prototype.hk = "error-template";
    sl.prototype.ii = "message-container";
    sl.prototype.ji = "message-container-template";
    sl.prototype.og = "module-editor";
    sl.prototype.zc = "busy";
    sl.prototype.R = function (a) {
        sl.b.R.call(this, a);
        this.hf = this.a().innerHTML;
        this.Pb = pl.getInstance();
        ql(this.Pb, a);
    };
    sl.prototype.d = function () {
        sl.b.d.call(this);
        var a = this.getHandler();
        var b = this.a();
        this.lb = yt$dom$getFirstElementByTagNameAndClass("FORM", null, b);
        var c = goog$dom$getElementByClass(this.jh, ag(this));
        if (c) {
            Z(
                a,
                c,
                "click",
                function (a) {
                    a.preventDefault();
                    bg(this);
                },
                false,
                this
            );
        }
        b = goog$dom$getElementByClass(this.ff, b);
        Z(
            a,
            b,
            "click",
            function (a) {
                a.preventDefault();
                tl(this);
                goog$dom$classes$remove(ag(this), "edit-mode");
            },
            false,
            this
        );
        Z(
            a,
            this.lb,
            "submit",
            function (a) {
                a.preventDefault();
                this.Ed();
            },
            false,
            this
        );
    };
    var tl = function (a) {
        var b = a.a();
        a.ja();
        rl(a.Pb, b);
        b.innerHTML = a.hf;
        ql(a.Pb, b);
        a.d();
    };
    sl.prototype.e = function () {
        rl(this.Pb, this.a());
        delete this.Pb;
        delete this.hf;
        sl.b.e.call(this);
    };
    sl.prototype.Ed = function () {
        ul(this).innerHTML = "";
        var a = goog$structs$Map$toObject(goog$dom$forms$getFormDataMap(this.lb));
        var b = this.lb.getAttribute("action");
        goog$dom$classes$add(this.a(), this.zc);
        yt$net$ajax$send(b, {
            method: "POST",
            ea: a,
            z: goog$bind(this.Gd, this),
            ka: goog$bind(this.Fd, this),
            ra: goog$bind(function () {
                goog$dom$classes$remove(this.a(), this.zc);
            }, this)
        });
    };
    sl.prototype.Gd = function (a, b) {
        if (b.code == "SUCCESS") {
            window.location.reload();
        } else {
            var c = b.html;
            if (!c) {
                c = "errors" in b ? b.errors : [];
                if (!c.length) {
                    return;
                }
                c = goog$string$htmlEscape(c[0]);
            }
            vl(this, c);
        }
    };
    sl.prototype.Fd = function () {
        var a = yt$getMsg("GENERIC_EDITOR_ERROR");
        vl(this, goog$string$htmlEscape(a));
    };
    var vl = function (a, b) {
        var c = goog$dom$getElement(a.hk).cloneNode(true);
        var d = ul(a);
        ef(b, c, d);
    };
    var ul = function (a) {
        var b = a.a();
        var c = goog$dom$getElementsByClass(a.ii, b);
        if (c.length) {
            return c[0];
        }
        a = goog$dom$getElement(a.ji);
        if (!a) {
            return b;
        }
        a = a.cloneNode(true);
        b.insertBefore(a, b.childNodes[0] || null);
        return a;
    };
    var wl = function (a) {
        $f.call(this, a);
    };
    goog$inherits(wl, qi);
    wl.prototype.d = function () {
        wl.b.d.call(this);
        this.A.push(
            yt$events$delegateByClass(
                this.a(),
                "click",
                goog$bind(function (a) {
                    a.preventDefault();
                    bg(this);
                }, this),
                "placeholder-module-enable-edit-mode"
            )
        );
    };
    var xl = function () {
        this.Ma = {};
    };
    goog$inherits(xl, uf);
    goog$addSingletonGetter(xl);
    xl.prototype.La = "styleable-checkbox";
    xl.prototype.I = function () {
        this.addBehavior("click", this.od, "toggle");
    };
    xl.prototype.od = function (a) {
        var b = yt$dom$getAncestorByClass(a, yt$uix$BaseWidget$getCssClass(this));
        if (!b) {
            return false;
        }
        a = goog$dom$getElementByClass(yt$uix$BaseWidget$getCssClass(this, "checkbox"), b);
        if (!a) {
            return false;
        }
        b = goog$dom$classes$toggle(b, yt$uix$BaseWidget$getCssClass(this, "checked"));
        a.checked = b;
    };
    var yl = function () {};
    goog$addSingletonGetter(yl);
    yl.prototype.U = function () {
        if ((this.c = goog$dom$getElement("seymour-editor-container"))) {
            this.ie = goog$dom$getElementByClass("channel-editor-selected-tab", this.c);
            this.he = goog$dom$getElementByClass("channel-editor-selected-content", this.c);
            this.Ea = goog$dom$getElement("channels-page-editor-form");
            this.Yh = yt$dom$datasets$get(this.Ea, "channels-update-url");
            this.mf = goog$dom$getElement("channel-editor-preview");
            this.Id = goog$dom$getElement("channel-editor-iframe");
            this.oi = yt$dom$datasets$get(this.Ea, "channels-preview-url");
            this.ri = goog$dom$getElement("image-upload-form");
            this.Zh = goog$dom$getElement("image-upload-file-input");
            this.ee = goog$dom$getElement("image-upload-file-input-container");
            this.si = goog$dom$getElement("image-upload-type-input");
            this.ce = false;
            ql(pl.getInstance(), this.c);
            zl(this);
            this.Wb();
        }
    };
    var zl = function (a) {
        yt$events$delegateByClass(a.c, "click", goog$bind(a.Gi, a), "channel-editor-tab");
        var b = goog$dom$getElementByClass("apply-changes", a.c);
        P(
            b,
            "click",
            function (a) {
                a.preventDefault();
                this.Ea.action = this.Yh;
                this.Ea.target = "_self";
                this.Ea.submit();
            },
            false,
            a
        );
        yt$events$delegateByClass(a.c, "change", goog$bind(a.Wb, a), "preview-on-change");
        yt$events$delegateByClass(a.c, "click", goog$bind(a.Wb, a), "preview-on-click");
        yt$events$delegateByClass(a.c, "mouseover", goog$bind(a.Ji, a), "upload-button");
        yt$events$delegateByClass(a.c, "click", goog$bind(a.Hi, a), "delete-button");
        P(a.Zh, "change", a.Ii, false, a);
        if ((b = goog$dom$getElement("dapper-opt-out-button"))) {
            P(b, "click", a.Ki, false, a);
        }
    };
    yl.prototype.Gi = function (a) {
        a.preventDefault();
        if (this.ie) {
            goog$dom$classes$remove(this.ie, "channel-editor-selected-tab");
        }
        if (this.he) {
            goog$dom$classes$remove(this.he, "channel-editor-selected-content");
        }
        var a = a.currentTarget;
        var b = yt$dom$datasets$get(a, "editor-tab");
        var c = yt$dom$datasets$get(a, "element-id");
        var c = goog$dom$getElement(c);
        goog$dom$classes$add(a, "channel-editor-selected-tab");
        goog$dom$classes$add(c, "channel-editor-selected-content");
        this.ie = a;
        this.he = c;
        goog$dom$getElement("editor-tab-form-field").value = b;
    };
    yl.prototype.Wb = function () {
        goog$dom$classes$add(this.mf, "loading");
        window.clearInterval(this.yf);
        this.yf = yt$setInterval(goog$bind(this.Nj, this), 200);
        this.Ea.action = this.oi;
        this.Ea.target = this.Id.name;
        this.Ea.submit();
    };
    yl.prototype.Ki = function (a) {
        a.preventDefault();
        goog$dom$getElement("dapper-opt-out-form").submit();
    };
    yl.prototype.Nj = function () {
        var a = new goog$dom$DomHelper(this.Id.contentDocument || this.Id.contentWindow.document);
        var b = a.a("channels-preview-loaded");
        if (b) {
            goog$dom$classes$remove(this.mf, "loading");
            a.removeNode(b);
            window.clearInterval(this.yf);
        }
    };
    yl.prototype.Ji = function (a) {
        var b = tc(a.currentTarget, "image-upload-field");
        if (b) {
            this.Ne = b;
            this.si.value = yt$dom$datasets$get(b, "image-type");
            b = a.currentTarget;
            a = goog$style$getPageOffset(b);
            b = goog$style$getSize(b);
            Je(this.ee, a);
            var a = this.ee;
            var c;
            if (b instanceof goog$math$Size) {
                c = b.height;
                b = b.width;
            } else {
                throw Error("missing height argument");
            }
            a.style.width = goog$style$getPixelStyleValue_(b, true);
            a.style.height = goog$style$getPixelStyleValue_(c, true);
        }
    };
    yl.prototype.Hi = function (a) {
        if (!this.ce && (a = tc(a.currentTarget, "image-upload-field"))) {
            goog$dom$getElementByClass("image-id-input", a).value = "0";
            goog$dom$classes$remove(a, "uploaded");
            this.Wb();
        }
    };
    yl.prototype.Ii = function () {
        this.ce = true;
        xe(this.ee, "left", "-9000px");
        goog$dom$classes$add(this.Ne, "uploading");
        this.ri.submit();
    };
    var Al = 0;
    var Dl = function (a, b) {
        if (window.guidedhelp && window.guidedhelp.loaded) {
            Bl(a, b);
        } else {
            window.guidedhelp = window.guidedhelp || {};
            window.guidedhelp.onLoad = function () {
                var c = goog$getObjectByName("help.guide.init");
                if (c) {
                    c("http://www.google.com/support/youtube", yt$getConfig("GUIDED_HELP_LOCALE") || "en_US", "v2");
                    Bl(a, b);
                }
            };
            Cl();
        }
    };
    var El = function (a) {
        if (goog$net$cookies.get("GuidedHelpResume")) {
            Dl(a, true);
        }
    };
    var Cl = function () {
        var a = document.createElement("script");
        a.type = "text/javascript";
        a.src = "//ssl.gstatic.com/inproduct_help/guide/guide_inproduct.js";
        document.body.appendChild(a);
    };
    var Bl = function (a, b) {
        Al = a;
        goog$getObjectByName("guidedhelp").onFlowDismiss = function () {
            var b = Fl(a);
            yt$help$guide$dismissGuidedHelp();
            if ((b = b.dismiss_callback)) {
                b(a);
            }
        };
        if (b) {
            goog$getObjectByName("help.guide.optionallyResume")(a);
        } else {
            goog$getObjectByName("help.guide.loadFlow")(a);
        }
    };
    var yt$help$guide$dismissGuidedHelp = function (a) {
        a = a || Al || parseInt(ab(), 10);
        yt$style$hide(Fl(a).alert_id);
        if ((a = Fl(a).cookie_name)) {
            yt$net$cookies$set(a, "true", 7776000);
        }
    };
    var yt$help$guide$startGuidedHelp = function (a) {
        a = a || parseInt(ab(), 10);
        yt$style$hide(Fl(a).alert_id);
        Dl(a);
    };
    var yt$help$guide$addSettings = function (a, b) {
        var c = yt$getConfig("GUIDED_HELP_FLOWS");
        if (!c) {
            c = {};
        }
        c[a] = b;
        ud("GUIDED_HELP_FLOWS", c);
    };
    var Fl = function (a) {
        var b = yt$getConfig("GUIDED_HELP_FLOWS");
        return b && b[a];
    };
    goog$exportSymbol("yt.help.guide.dismissGuidedHelp", yt$help$guide$dismissGuidedHelp);
    goog$exportSymbol("yt.help.guide.startGuidedHelp", yt$help$guide$startGuidedHelp);
    goog$exportSymbol("yt.help.guide.resumeGuidedHelp", function () {
        El(parseInt(ab(), 10));
    });
    goog$exportSymbol("yt.help.guide.init", function () {
        goog$object$forEach(yt$getConfig("GUIDED_HELP_FLOWS"), function (a, b) {
            switch (a.status) {
                case "prompt":
                    yt$style$show(Fl(b).alert_id);
                    break;
                case "start":
                    yt$help$guide$startGuidedHelp(b);
                    break;
                case "hide":
                    yt$help$guide$dismissGuidedHelp(b);
                    break;
                default:
                    var c;
                    var d = Fl(b).cookie_name;
                    if (d) {
                        c = !!yt$net$cookies$get(d);
                    }
                    if (!c) {
                        yt$style$show(Fl(b).alert_id);
                    }
            }
        });
    });
    goog$exportSymbol("yt.help.guide.addSettings", yt$help$guide$addSettings);
    var Jl = function (a) {
        yt$net$ajax$send("/channel_ajax", {
            method: "POST",
            J: {
                action_dismiss_guided_help: "1"
            },
            ea: {
                session_token: yt$net$ajax$tokenMap_.channel_ajax,
                channel_id: yt$getConfig("CHANNEL_ID"),
                flow_id: a
            }
        });
    };
    var Kl = function (a) {
        if (
            !a.currentTarget.disabled &&
            (a = yt$dom$getAncestorByClass(a.currentTarget, "store-display-offer-container"))
        ) {
            if ((a = yt$dom$datasets$get(a, "buy-url"))) {
                fg(a);
            }
        }
    };
    var Ll = function (a) {
        var b = {
            size: "small",
            annotation: "bubble"
        };
        goog$array$forEach(a, function (a) {
            a.innerHTML = "";
            new Zh(
                a,
                yt$dom$datasets$get(a, "buy-url"),
                yt$dom$datasets$get(a, "buy-url"),
                yt$getConfig("FEEDBACK_LOCALE_LANGUAGE"),
                yt$getConfig("SESSION_INDEX"),
                b
            );
        });
    };
    var Ml = function (a) {
        $f.call(this, a);
    };
    goog$inherits(Ml, sl);
    Ml.prototype.lf = "publish-store";
    Ml.prototype.lh = "publish-store-link";
    Ml.prototype.ma = [];
    Ml.prototype.Cd = [];
    Ml.prototype.ud = 0;
    Ml.prototype.Eg = 0;
    Ml.prototype.tc = false;
    Ml.prototype.d = function () {
        Ml.b.d.call(this);
        this.lb = yt$dom$getFirstElementByTagNameAndClass("FORM", null, this.a());
        this.ud = goog$dom$getElement("store_category_id").value;
        var a = goog$dom$getElement("store_save_product_ids").value;
        this.Cd = this.ma = a = a.length > 0 ? a.split(",") : [];
        this.Dd();
    };
    Ml.prototype.Dd = function () {
        var a = this.getHandler();
        var b = this.a();
        var c = goog$dom$getElementByClass(this.lf, b);
        if (c) {
            Z(
                a,
                c,
                "click",
                function (a) {
                    a.preventDefault();
                    tl(this);
                    Nl(this);
                },
                false,
                this
            );
        }
        if ((c = goog$dom$getElementByClass(this.lh, null))) {
            Z(
                a,
                c,
                "click",
                function (a) {
                    a.preventDefault();
                    a = goog$structs$Map$toObject(goog$dom$forms$getFormDataMap(this.lb));
                    a.publish = true;
                    yt$net$ajax$send("/channel_ajax?action_publish_store=1", {
                        method: "POST",
                        ea: a,
                        z: goog$bind(this.Gd, this),
                        ka: goog$bind(this.Fd, this)
                    });
                },
                false,
                this
            );
        }
        b = goog$dom$getElementByClass(this.ff, b);
        Vc(b);
        Z(
            a,
            b,
            "click",
            function (a) {
                a.preventDefault();
                gg(yt$dom$datasets$get(a.currentTarget, "refresh-url"));
            },
            false,
            this
        );
        this.tc = false;
        yt$events$delegateByClass(
            goog$dom$getElement("store-editor"),
            "click",
            goog$bind(function () {
                this.tc = false;
            }, this),
            "apply-changes"
        );
        a = goog$dom$getElementByClass("store-setup-search-query-container", null);
        yt$events$delegateByClass(a, "click", goog$bind(this.ph, this), "search-button");
        a = goog$dom$getElementByClass("store-editor-actions-container", undefined);
        yt$events$delegateByClass(a, "click", goog$bind(this.nh, this), "category-edit-button");
        yt$events$delegateByClass(null, "click", goog$bind(this.mh, this), "vendor-menu-option");
        yt$events$delegateByClass(
            goog$dom$getElement("store-setup-search-results-container"),
            "click",
            goog$bind(this.sh, this),
            "store-search-result-add"
        );
        if ((a = goog$dom$getElement("store-offers-preview-container"))) {
            yt$events$delegateByClass(a, "click", goog$bind(this.rh, this), "store-display-offer-remove-button");
            yt$events$delegateByClass(a, "click", Kl, "store-display-offer-buy");
            yt$events$delegateByClass(a, "click", Kl, "store-display-offer-title");
            b = goog$array$clone(goog$dom$getElementsByClass("plus-one", a));
            Ll(b);
            yt$events$delegateByClass(a, "click", goog$bind(this.qh, this), "move-to-top-link");
        }
        window.onbeforeunload = goog$bind(this.oh, this);
    };
    var Nl = function (a) {
        ul(a).innerHTML = "";
        var b = goog$dom$getElementByClass(a.lf, a.a());
        var b = yt$dom$datasets$get(b, "published") == "True";
        var c = goog$structs$Map$toObject(goog$dom$forms$getFormDataMap(a.lb));
        c.publish = !b;
        goog$dom$classes$add(a.a(), a.zc);
        yt$net$ajax$send("/channel_ajax?action_publish_store=1", {
            method: "POST",
            ea: c,
            z: goog$bind(a.Gd, a),
            ka: goog$bind(a.Fd, a),
            ra: goog$bind(function () {
                goog$dom$classes$remove(this.a(), this.zc);
            }, a)
        });
    };
    Ml.prototype.Ed = function () {
        var a = goog$dom$getElement("store-description");
        var b = goog$dom$getElement("store_save_description");
        if (a && b) {
            b.value = a.value;
        }
        goog$dom$getElement("store_save_product_ids").value = this.ma.join(",");
        Ml.b.Ed.call(this);
    };
    Ml.prototype.mh = function (a) {
        goog$dom$classes$toggle(a.currentTarget, "selected");
        return false;
    };
    Ml.prototype.ph = function (a) {
        a.preventDefault();
        var b = [];
        var a = goog$dom$getElementsByClass("vendor-menu-option");
        goog$array$forEach(a, function (a) {
            if (goog$dom$classes$has(a, "selected")) {
                b.push(yt$dom$datasets$get(a, "id"));
            }
        });
        if (b.length == 0) {
            alert(yt$getMsg("NO_AFFILIATES_SELECTED_MSG"));
        } else {
            a = goog$dom$getElement("store-setup-search-results-container");
            goog$dom$classes$remove(a, "error");
            goog$dom$classes$add(a, "searching");
            a = goog$dom$getElement("store_search_term").value;
            goog$dom$getElement("store_save_search_term").value = a;
            goog$dom$getElement("store_save_vendor_ids").value = b.join(",");
            a = {
                method: "GET",
                J: {
                    action_lookup_offers: "1",
                    search_term: a,
                    vendor_ids: b.join(","),
                    category: this.ud
                },
                z: goog$bind(this.kj, this),
                ka: goog$bind(this.lj, this)
            };
            yt$net$ajax$send("/channel_ajax", a);
        }
    };
    Ml.prototype.kj = function (a, b) {
        var c = goog$dom$getElement("store-setup-search-results-container");
        goog$dom$classes$remove(c, "searching");
        if (b.success) {
            c.innerHTML = b.search_results_html;
            Ol(this);
        } else if (b.errors) {
            alert("errors: " + b.errors.join("<br>"));
        }
    };
    Ml.prototype.lj = function () {
        var a = goog$dom$getElement("store-setup-search-results-container");
        goog$dom$classes$remove(a, "searching");
        goog$dom$classes$add(a, "error");
    };
    Ml.prototype.nh = function (a) {
        window.location = yt$dom$datasets$get(a.currentTarget, "category-edit-url");
    };
    Ml.prototype.sh = function (a) {
        var b = yt$dom$getAncestorByClass(a.currentTarget, "store-search-list-row");
        if (b) {
            this.ma.push(yt$dom$datasets$get(b, "product-id"));
            Pl(a.currentTarget).innerHTML = yt$getConfig("LOADING_IMG");
            Ql(this);
        }
    };
    Ml.prototype.rh = function (a) {
        if ((a = yt$dom$getAncestorByClass(a.currentTarget, "store-display-offer-container"))) {
            a = yt$dom$datasets$get(a, "product-id");
            Ka(this.ma, a);
            Ql(this);
        }
    };
    Ml.prototype.ij = function (a, b) {
        if (b.success) {
            var c;
            c = Number(b.ts);
            if (c > this.Eg) {
                this.Eg = c;
                c = true;
            } else {
                c = false;
            }
            if (c) {
                goog$dom$getElement("store-offers-preview-container").innerHTML = b.offers_html;
                this.Cd = this.ma;
                c = goog$array$clone(goog$dom$getElementsByClass("plus-one"));
                Ll(c);
            }
        } else if (b.errors) {
            alert("errors: " + b.errors.join("<br>"));
            this.ma = this.Cd;
        }
        Ol(this);
    };
    var Ql = function (a) {
        a.tc = true;
        a = {
            method: "GET",
            J: {
                action_retrieve_offers: "1",
                product_ids: a.ma.join(","),
                channel_id: yt$getConfig("CHANNEL_ID"),
                category: a.ud
            },
            z: goog$bind(a.ij, a)
        };
        yt$net$ajax$send("/channel_ajax", a);
    };
    var Ol = function (a) {
        var b = goog$dom$getElementsByClass("store-search-result-add");
        var c = a.ma;
        goog$array$forEach(b, function (a) {
            var b = yt$dom$getAncestorByClass(a, "store-search-list-row");
            if (b) {
                var b = yt$dom$datasets$get(b, "product-id");
                var f = Pl(a);
                if (goog$array$contains(c, b)) {
                    a.disabled = true;
                    f.innerHTML = yt$getMsg("ADD_BUTTON_DISABLED");
                } else {
                    f.innerHTML = yt$getMsg("ADD_BUTTON_ENABLED");
                    a.disabled = false;
                }
            }
        });
    };
    var Pl = function (a) {
        var b = goog$dom$getElementByClass("yt-uix-button-content", a);
        if (!b) {
            b = a;
        }
        return b;
    };
    Ml.prototype.qh = function (a) {
        if ((a = yt$dom$getAncestorByClass(a.currentTarget, "store-display-offer-container"))) {
            a = yt$dom$datasets$get(a, "product-id");
            Ka(this.ma, a);
            goog$array$splice(this.ma, 0, 0, a);
            Ql(this);
        }
    };
    Ml.prototype.oh = function () {
        if (this.tc) {
            var a = yt$getMsg("UNSAVED_CHANGES_WARNING");
            if (a) {
                return a;
            }
        }
        return null;
    };
    var Rl = function (a) {
        $f.call(this, a);
    };
    goog$inherits(Rl, qi);
    Rl.prototype.d = function () {
        Rl.b.d.call(this);
        this.Dd();
    };
    Rl.prototype.Dd = function () {
        var a = goog$dom$getElementByClass("channel-store-filtered-content");
        yt$events$delegateByClass(a, "click", Kl, "store-display-offer-buy");
        yt$events$delegateByClass(a, "click", Kl, "store-display-offer-title");
        a = goog$array$clone(goog$dom$getElementsByClass("plus-one", a));
        Ll(a);
    };
    goog$exportSymbol("yt.www.channels3.channel.init", function () {
        var a = Cj();
        if (a && a.eb && a.eb != "") {
            var b = new ej(window.location.href);
            kj(b, "");
            a = a.eb;
            rj(b);
            delete b.$;
            b.ga.set("v", a);
            rj(b);
            delete b.$;
            b.ga.set("lr", "1");
            gg(b.toString());
        }
        if ((b = goog$dom$getElement("channel-search"))) {
            new cj(b);
        }
        new dj(goog$dom$getElementByClass("subscription-menu-expandable-channels3"));
        if ((b = goog$dom$getElementByClass("subscription-button-with-recommended-channels"))) {
            new yt$www$channels3$modules$SubscriptionButtonWithRecommendedChannels(b);
        }
        b = cg.getInstance();
        b.I(ti, "channels-featured-live-video", 2);
        b.I(ri, "channels-featured-video", 2);
        b.I(Qi, "legal-info-view", 2);
        b.I(Ri, "other-channels-view", 2);
        b.I(Si, "profile-view", 2);
        b.I(Ui, "single-playlist", 2);
        eg(b);
    });
    goog$exportSymbol("yt.www.channels3.feed.init", function () {
        new cf(goog$dom$getElementByClass("channel-activity-feeds"));
    });
    goog$exportSymbol("yt.www.channels3.channelEditing.init", function () {
        yt$uix$initWidget(xl);
        yl.getInstance().U();
        var a = cg.getInstance();
        a.I(sl, "general-editor", 1);
        a.I(wl, "placeholder", 2);
    });
    goog$exportSymbol("yt.www.channels3.storeSetup.init", function () {
        var a = cg.getInstance();
        a.I(Ml, "store-editor", 1);
        a.I(Rl, "store-view", 2);
        eg(a);
    });
    goog$exportSymbol("yt.www.channels3.constants.ChannelAjaxResult", {
        rk: "ACCOUNT_NOT_CONFIRMED",
        sk: "CAPTCHA_REQUIRED",
        ERROR: "ERROR",
        nm: "NOT_IMPLEMENTED",
        om: "SUCCESS"
    });
    goog$exportSymbol("yt.www.channels3.guidedHelp.init", function (a, b) {
        yt$help$guide$addSettings(a, {
            dismiss_callback: Jl
        });
        if (b) {
            El(a);
        } else {
            Dl(a);
        }
    });
    goog$exportSymbol(
        "yt.www.channels3.modules.SubscriptionButtonWithRecommendedChannels",
        yt$www$channels3$modules$SubscriptionButtonWithRecommendedChannels
    );
    goog$exportSymbol("yt.www.subscriptions.SubscriptionButton.init", yt$www$subscriptions$SubscriptionButton$init);
    goog$exportSymbol("yt.www.channels3.PageEditor.notifyImageUploadComplete", function (a) {
        var b = yl.getInstance();
        var c = b.Ne;
        b.Ne = null;
        b.ce = false;
        if (c) {
            goog$dom$classes$remove(c, "uploading");
            if (a.errors) {
                alert(a.errors);
            } else if (a.photo_id) {
                goog$dom$getElementByClass("image-id-input", c).value = "" + a.photo_id;
                goog$dom$classes$add(c, "uploaded");
                b.Wb();
            }
        }
    });
})();
