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
            return a.qu || (a.qu = new a());
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
    var ca = function (a) {
        return a === null;
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
    var w = function (a, b) {
        for (var c in b) {
            a[c] = b[c];
        }
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
        for (var f; c.length && (f = c.shift());) {
            if (!c.length && b !== undefined) {
                d[f] = b;
            } else {
                d = d[f] ? d[f] : (d[f] = {});
            }
        }
    };
    var goog$inherits = function (a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.j = b.prototype;
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
    var goog$string$trim = function (a) {
        return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
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
    var ya = function (a) {
        var b = Number(a);
        if (b == 0 && /^[\s\xa0]*$/.test(a)) {
            return NaN;
        } else {
            return b;
        }
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
    var goog$asserts$doAssertFailure_ = function (a, b, c, d) {
        var f = "Assertion failed";
        if (c) {
            var f = f + (": " + c);
            var g = d;
        } else if (a) {
            f += ": " + a;
            g = b;
        }
        throw new goog$asserts$AssertionError("" + f, g || []);
    };
    var goog$asserts$assert = function (a, b, c) {
        if (!a) {
            goog$asserts$doAssertFailure_("", null, b, Array.prototype.slice.call(arguments, 2));
        }
    };
    var goog$asserts$fail = function (a, b) {
        throw new goog$asserts$AssertionError(
            "Failure" + (a ? ": " + a : ""),
            Array.prototype.slice.call(arguments, 1)
        );
    };
    var goog$asserts$assertString = function (a, b, c) {
        if (!goog$isString(a)) {
            goog$asserts$doAssertFailure_(
                "Expected string but got %s: %s.",
                [goog$typeOf(a), a],
                b,
                Array.prototype.slice.call(arguments, 2)
            );
        }
        return a;
    };
    var Ga = function (a, b, c, d) {
        if (!(a instanceof b)) {
            goog$asserts$doAssertFailure_(
                "instanceof check failed.",
                null,
                c,
                Array.prototype.slice.call(arguments, 3)
            );
        }
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
              for (var d = a.length, f = goog$isString(a) ? a.split("") : a, g = 0; g < d; g++) {
                  if (g in f) {
                      b.call(c, f[g], g, a);
                  }
              }
          };
    var goog$array$filter = goog$array$ARRAY_PROTOTYPE_.filter
        ? function (a, b, c) {
              goog$asserts$assert(a.length != null);
              return goog$array$ARRAY_PROTOTYPE_.filter.call(a, b, c);
          }
        : function (a, b, c) {
              for (var d = a.length, f = [], g = 0, i = goog$isString(a) ? a.split("") : a, m = 0; m < d; m++) {
                  if (m in i) {
                      var p = i[m];
                      if (b.call(c, p, m, a)) {
                          f[g++] = p;
                      }
                  }
              }
              return f;
          };
    var goog$array$map = goog$array$ARRAY_PROTOTYPE_.map
        ? function (a, b, c) {
              goog$asserts$assert(a.length != null);
              return goog$array$ARRAY_PROTOTYPE_.map.call(a, b, c);
          }
        : function (a, b, c) {
              for (var d = a.length, f = Array(d), g = goog$isString(a) ? a.split("") : a, i = 0; i < d; i++) {
                  if (i in g) {
                      f[i] = b.call(c, g[i], i, a);
                  }
              }
              return f;
          };
    var goog$array$some = goog$array$ARRAY_PROTOTYPE_.some
        ? function (a, b, c) {
              goog$asserts$assert(a.length != null);
              return goog$array$ARRAY_PROTOTYPE_.some.call(a, b, c);
          }
        : function (a, b, c) {
              for (var d = a.length, f = goog$isString(a) ? a.split("") : a, g = 0; g < d; g++) {
                  if (g in f && b.call(c, f[g], g, a)) {
                      return true;
                  }
              }
              return false;
          };
    var La = function (a, b) {
        var c;
        a: {
            c = a.length;
            var d = goog$isString(a) ? a.split("") : a;
            for (var f = 0; f < c; f++) {
                if (f in d && b.call(undefined, d[f], f, a)) {
                    c = f;
                    break a;
                }
            }
            c = -1;
        }
        if (c < 0) {
            return null;
        } else if (goog$isString(a)) {
            return a.charAt(c);
        } else {
            return a[c];
        }
    };
    var goog$array$contains = function (a, b) {
        return goog$array$indexOf(a, b) >= 0;
    };
    var goog$array$clear = function (a) {
        if (!goog$isArray(a)) {
            for (var b = a.length - 1; b >= 0; b--) {
                delete a[b];
            }
        }
        a.length = 0;
    };
    var Oa = function (a, b) {
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
            var f;
            if (goog$isArray(d) || ((f = goog$isArrayLike(d)) && d.hasOwnProperty("callee"))) {
                a.push.apply(a, d);
            } else if (f) {
                var g = a.length;
                for (var i = d.length, m = 0; m < i; m++) {
                    a[g + m] = d[m];
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
    var goog$array$sort = function (a, b) {
        goog$asserts$assert(a.length != null);
        goog$array$ARRAY_PROTOTYPE_.sort.call(a, b || goog$array$defaultCompare);
    };
    var goog$array$defaultCompare = function (a, b) {
        if (a > b) {
            return 1;
        } else if (a < b) {
            return -1;
        } else {
            return 0;
        }
    };
    var goog$iter$StopIteration = "StopIteration" in goog$global ? goog$global.StopIteration : Error("StopIteration");
    var goog$iter$Iterator = function () {};
    goog$iter$Iterator.prototype.next = function () {
        throw goog$iter$StopIteration;
    };
    goog$iter$Iterator.prototype.md = function () {
        return this;
    };
    var goog$iter$toIterator = function (a) {
        if (a instanceof goog$iter$Iterator) {
            return a;
        }
        if (typeof a.md == "function") {
            return a.md(false);
        }
        if (goog$isArrayLike(a)) {
            var b = 0;
            var c = new goog$iter$Iterator();
            c.next = function () {
                while (true) {
                    if (b >= a.length) {
                        throw goog$iter$StopIteration;
                    }
                    if (b in a) {
                        return a[b++];
                    }
                    b++;
                }
            };
            return c;
        }
        throw Error("Not implemented");
    };
    var goog$iter$forEach = function (a, b) {
        if (goog$isArrayLike(a)) {
            try {
                goog$array$forEach(a, b, undefined);
            } catch (c) {
                if (c !== goog$iter$StopIteration) {
                    throw c;
                }
            }
        } else {
            a = goog$iter$toIterator(a);
            try {
                while (true) {
                    b.call(undefined, a.next(), undefined, a);
                }
            } catch (d) {
                if (d !== goog$iter$StopIteration) {
                    throw d;
                }
            }
        }
    };
    var goog$iter$toArray = function (a) {
        if (goog$isArrayLike(a)) {
            return goog$array$clone(a);
        }
        var a = goog$iter$toIterator(a);
        var b = [];
        goog$iter$forEach(a, function (a) {
            b.push(a);
        });
        return b;
    };
    var goog$object$forEach = function (a, b) {
        for (var c in a) {
            b.call(undefined, a[c], c, a);
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
    var eb = function (a) {
        var b = yt$events$listeners_;
        var c;
        for (c in b) {
            if (a.call(undefined, b[c], c, b)) {
                return c;
            }
        }
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
        for (var f = 1; f < arguments.length; f++) {
            d = arguments[f];
            for (c in d) {
                a[c] = d[c];
            }
            for (var g = 0; g < goog$object$PROTOTYPE_FIELDS_.length; g++) {
                c = goog$object$PROTOTYPE_FIELDS_[g];
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
    var nb;
    var ob;
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
    var rb;
    if ((rb = goog$userAgent$getUserAgentString())) {
        var goog$userAgent$init_$navigator = goog$userAgent$getNavigator();
        goog$userAgent$detectedOpera_ = rb.indexOf("Opera") == 0;
        goog$userAgent$detectedIe_ = !goog$userAgent$detectedOpera_ && rb.indexOf("MSIE") != -1;
        goog$userAgent$detectedMobile_ =
            (goog$userAgent$detectedWebkit_ = !goog$userAgent$detectedOpera_ && rb.indexOf("WebKit") != -1) &&
            rb.indexOf("Mobile") != -1;
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
    nb = goog$userAgent$PLATFORM.indexOf("Mac") != -1;
    ob = goog$userAgent$PLATFORM.indexOf("Win") != -1;
    var goog$userAgent$detectedX11_ =
        !!goog$userAgent$getNavigator() && (goog$userAgent$getNavigator().appVersion || "").indexOf("X11") != -1;
    var zb;
    a: {
        var Ab = "";
        var goog$userAgent$determineVersion_$re;
        if (goog$userAgent$OPERA && goog$global.opera) {
            var goog$userAgent$determineVersion_$operaVersion = goog$global.opera.version;
            var Ab =
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
                var Ab = goog$userAgent$determineVersion_$arr ? goog$userAgent$determineVersion_$arr[1] : "";
            }
        }
        if (goog$userAgent$IE) {
            var Eb;
            var goog$userAgent$getDocumentMode_$doc = goog$global.document;
            Eb = goog$userAgent$getDocumentMode_$doc ? goog$userAgent$getDocumentMode_$doc.documentMode : undefined;
            if (Eb > parseFloat(Ab)) {
                zb = "" + Eb;
                break a;
            }
        }
        zb = Ab;
    }
    var Gb = zb;
    var Hb = {};
    var goog$userAgent$isVersion = function (a) {
        var b;
        if (!(b = Hb[a])) {
            b = 0;
            var c = goog$string$trim("" + Gb).split(".");
            var d = goog$string$trim("" + a).split(".");
            for (var f = Math.max(c.length, d.length), g = 0; b == 0 && g < f; g++) {
                var i = c[g] || "";
                var m = d[g] || "";
                var p = RegExp("(\\d*)(\\D*)", "g");
                var s = RegExp("(\\d*)(\\D*)", "g");
                do {
                    var y = p.exec(i) || ["", "", ""];
                    var v = s.exec(m) || ["", "", ""];
                    if (y[0].length == 0 && v[0].length == 0) {
                        break;
                    }
                    b =
                        ((y[1].length == 0 ? 0 : parseInt(y[1], 10)) < (v[1].length == 0 ? 0 : parseInt(v[1], 10))
                            ? -1
                            : (y[1].length == 0 ? 0 : parseInt(y[1], 10)) > (v[1].length == 0 ? 0 : parseInt(v[1], 10))
                              ? 1
                              : 0) ||
                        ((y[2].length == 0) < (v[2].length == 0)
                            ? -1
                            : (y[2].length == 0) > (v[2].length == 0)
                              ? 1
                              : 0) ||
                        (y[2] < v[2] ? -1 : y[2] > v[2] ? 1 : 0);
                } while (b == 0);
            }
            b = Hb[a] = b >= 0;
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
    var goog$debug$getStacktrace = function (a) {
        return goog$debug$getStacktraceHelper_(a || arguments.callee.caller, []);
    };
    var goog$debug$getStacktraceHelper_ = function (a, b) {
        var c = [];
        if (goog$array$contains(b, a)) {
            c.push("[...circular reference...]");
        } else if (a && b.length < 50) {
            c.push(goog$debug$getFunctionName(a) + "(");
            for (var d = a.arguments, f = 0; f < d.length; f++) {
                if (f > 0) {
                    c.push(", ");
                }
                var g;
                g = d[f];
                switch (typeof g) {
                    case "object":
                        g = g ? "object" : "null";
                        break;
                    case "string":
                        break;
                    case "number":
                        g = "" + g;
                        break;
                    case "boolean":
                        g = g ? "true" : "false";
                        break;
                    case "function":
                        g = (g = goog$debug$getFunctionName(g)) ? g : "[fn]";
                        break;
                    default:
                        g = typeof g;
                }
                if (g.length > 40) {
                    g = g.substr(0, 40) + "...";
                }
                c.push(g);
            }
            b.push(a);
            c.push(")\n");
            try {
                c.push(goog$debug$getStacktraceHelper_(a.caller, b));
            } catch (i) {
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
    var goog$debug$LogRecord = function (a, b, c, d, f) {
        this.reset(a, b, c, d, f);
    };
    goog$debug$LogRecord.prototype.Ik = null;
    goog$debug$LogRecord.prototype.Hk = null;
    var goog$debug$LogRecord$nextSequenceNumber_ = 0;
    goog$debug$LogRecord.prototype.reset = function (a, b, c, d, f) {
        if (typeof f != "number") {
            goog$debug$LogRecord$nextSequenceNumber_++;
        }
        this.mo = d || goog$now();
        this.ia = a;
        this.Et = b;
        this.lo = c;
        delete this.Ik;
        delete this.Hk;
    };
    goog$debug$LogRecord.prototype.getLevel = function () {
        return this.ia;
    };
    goog$debug$LogRecord.prototype.Bi = function (a) {
        this.ia = a;
    };
    goog$debug$LogRecord.prototype.getMessage = function () {
        return this.Et;
    };
    var goog$debug$Logger = function (a) {
        this.ta = a;
    };
    goog$debug$Logger.prototype.za = null;
    goog$debug$Logger.prototype.ia = null;
    goog$debug$Logger.prototype.nc = null;
    goog$debug$Logger.prototype.bg = null;
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
    goog$debug$Logger.prototype.getName = function () {
        return this.ta;
    };
    goog$debug$Logger.prototype.getParent = function () {
        return this.za;
    };
    goog$debug$Logger.prototype.Bi = function (a) {
        this.ia = a;
    };
    goog$debug$Logger.prototype.getLevel = function () {
        return this.ia;
    };
    var goog$debug$Logger$getEffectiveLevel = function (a) {
        if (a.ia) {
            return a.ia;
        }
        if (a.za) {
            return goog$debug$Logger$getEffectiveLevel(a.za);
        }
        goog$asserts$fail("Root logger has no level set.");
        return null;
    };
    goog$debug$Logger.prototype.log = function (a, b, c) {
        if (a.value >= goog$debug$Logger$getEffectiveLevel(this).value) {
            a = this.du(a, b, c);
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
                if (c.bg) {
                    for (var f = 0, g = undefined; (g = c.bg[f]); f++) {
                        g(d);
                    }
                }
                b = b.getParent();
            }
        }
    };
    goog$debug$Logger.prototype.du = function (a, b, c) {
        var d = new goog$debug$LogRecord(a, "" + b, this.ta);
        if (c) {
            d.Ik = c;
            var f;
            var g = arguments.callee.caller;
            try {
                var i;
                var m = goog$getObjectByName("window.location.href");
                if (goog$isString(c)) {
                    i = {
                        message: c,
                        name: "Unknown error",
                        lineNumber: "Not available",
                        fileName: m,
                        stack: "Not available"
                    };
                } else {
                    var p;
                    var s;
                    var y = false;
                    try {
                        p = c.lineNumber || c.zu || "Not available";
                    } catch (v) {
                        p = "Not available";
                        y = true;
                    }
                    try {
                        s = c.fileName || c.filename || c.sourceURL || m;
                    } catch (z) {
                        s = "Not available";
                        y = true;
                    }
                    i =
                        y || !c.lineNumber || !c.fileName || !c.stack
                            ? {
                                  message: c.message,
                                  name: c.name,
                                  lineNumber: p,
                                  fileName: s,
                                  stack: c.stack || "Not available"
                              }
                            : c;
                }
                f =
                    "Message: " +
                    goog$string$htmlEscape(i.message) +
                    '\nUrl: <a href="view-source:' +
                    i.fileName +
                    '" target="_new">' +
                    i.fileName +
                    "</a>\nLine: " +
                    i.lineNumber +
                    "\n\nBrowser stack:\n" +
                    goog$string$htmlEscape(i.stack + "-> ") +
                    "[end]\n\nJS stack traversal:\n" +
                    goog$string$htmlEscape(goog$debug$getStacktrace(g) + "-> ");
            } catch (fa) {
                f = "Exception trying to expose exception! You win, we lose. " + fa;
            }
            d.Hk = f;
        }
        return d;
    };
    goog$debug$Logger.prototype.info = function (a, b) {
        this.log(goog$debug$Logger$Level$INFO, a, b);
    };
    var goog$debug$LogManager$loggers_ = {};
    var goog$debug$LogManager$rootLogger_ = null;
    var goog$debug$LogManager$initialize = function () {
        if (!goog$debug$LogManager$rootLogger_) {
            goog$debug$LogManager$rootLogger_ = new goog$debug$Logger("");
            goog$debug$LogManager$loggers_[""] = goog$debug$LogManager$rootLogger_;
            goog$debug$LogManager$rootLogger_.Bi(goog$debug$Logger$Level$CONFIG);
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
            if (!c.nc) {
                c.nc = {};
            }
            c.nc[d] = b;
            b.za = c;
            goog$debug$LogManager$loggers_[a] = b;
        }
        return b;
    };
    var goog$dom$defaultDomHelper_;
    var goog$dom$classes$get = function (a) {
        a = a.className;
        return (goog$isString(a) && a.match(/\S+/g)) || [];
    };
    var goog$dom$classes$add = function (a, b) {
        var c = goog$dom$classes$get(a);
        var d = goog$array$slice(arguments, 1);
        var f = c.length + d.length;
        goog$dom$classes$add_(c, d);
        a.className = c.join(" ");
        return c.length == f;
    };
    var goog$dom$classes$remove = function (a, b) {
        var c = goog$dom$classes$get(a);
        var d = goog$array$slice(arguments, 1);
        var c = goog$dom$classes$getDifference_(c, d);
        a.className = c.join(" ");
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
    var ec = function (a, b, c) {
        var d = goog$dom$classes$get(a);
        if (goog$isString(b)) {
            Oa(d, b);
        } else if (goog$isArray(b)) {
            d = goog$dom$classes$getDifference_(d, b);
        }
        if (goog$isString(c) && !goog$array$contains(d, c)) {
            d.push(c);
        } else if (goog$isArray(c)) {
            goog$dom$classes$add_(d, c);
        }
        a.className = d.join(" ");
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
    var gc = function (a, b) {
        var c = !goog$dom$classes$has(a, b);
        goog$dom$classes$enable(a, b, c);
    };
    var goog$math$Coordinate = function (a, b) {
        this.x = a !== undefined ? a : 0;
        this.y = b !== undefined ? b : 0;
    };
    goog$math$Coordinate.prototype.ga = function () {
        return new goog$math$Coordinate(this.x, this.y);
    };
    goog$math$Coordinate.prototype.toString = function () {
        return "(" + this.x + ", " + this.y + ")";
    };
    var hc = function (a, b) {
        var c = a.x - b.x;
        var d = a.y - b.y;
        return Math.sqrt(c * c + d * d);
    };
    var goog$math$Coordinate$difference = function (a, b) {
        return new goog$math$Coordinate(a.x - b.x, a.y - b.y);
    };
    var goog$math$Size = function (a, b) {
        this.width = a;
        this.height = b;
    };
    var jc = function (a, b) {
        if (a == b) {
            return true;
        } else if (!a || !b) {
            return false;
        } else {
            return a.width == b.width && a.height == b.height;
        }
    };
    goog$math$Size.prototype.ga = function () {
        return new goog$math$Size(this.width, this.height);
    };
    goog$math$Size.prototype.toString = function () {
        return "(" + this.width + " x " + this.height + ")";
    };
    goog$math$Size.prototype.isEmpty = function () {
        return !(this.width * this.height);
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
    var goog$dom$BrowserFeature$CAN_ADD_NAME_OR_TYPE_ATTRIBUTES =
        !goog$userAgent$IE || goog$userAgent$isDocumentMode(9);
    if ((!!goog$userAgent$GECKO || !!goog$userAgent$IE) && (!goog$userAgent$IE || !goog$userAgent$isDocumentMode(9))) {
        if (goog$userAgent$GECKO) {
            goog$userAgent$isVersion("1.9.1");
        }
    }
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
                var f = 0;
                for (var g = 0, i; (i = c[g]); g++) {
                    if (a == i.nodeName) {
                        d[f++] = i;
                    }
                }
                d.length = f;
                return d;
            }
            return c;
        }
        c = c.getElementsByTagName(a || "*");
        if (b) {
            d = {};
            for (g = f = 0; (i = c[g]); g++) {
                a = i.className;
                if (typeof a.split == "function" && goog$array$contains(a.split(/\s+/), b)) {
                    d[f++] = i;
                }
            }
            d.length = f;
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
                var f = {};
                goog$object$extend(f, d);
                d = f;
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
        function f(c) {
            if (c) {
                b.appendChild(goog$isString(c) ? a.createTextNode(c) : c);
            }
        }
        for (; d < c.length; d++) {
            var g = c[d];
            if (goog$isArrayLike(g) && (!goog$isObject(g) || !(g.nodeType > 0))) {
                goog$array$forEach(goog$dom$isNodeList(g) ? goog$array$toArray(g) : g, f);
            } else {
                f(g);
            }
        }
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
            a.parentNode.removeChild(a);
        }
    };
    var Cc = function (a, b) {
        var c = b.parentNode;
        if (c) {
            c.replaceChild(a, b);
        }
    };
    var goog$dom$getNextElementNode_ = function (a) {
        while (a && a.nodeType != 1) {
            a = a.nextSibling;
        }
        return a;
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
    var Lc = function (a, b) {
        if (!b) {
            return null;
        } else {
            return goog$dom$getAncestor(
                a,
                function (a) {
                    return !b || goog$dom$classes$has(a, b);
                },
                true
            );
        }
    };
    var goog$dom$getAncestor = function (a, b, c, d) {
        if (!c) {
            a = a.parentNode;
        }
        for (var c = d == null, f = 0; a && (c || f <= d);) {
            if (b(a)) {
                return a;
            }
            a = a.parentNode;
            f++;
        }
        return null;
    };
    var goog$dom$DomHelper = function (a) {
        this.Q = a || goog$global.document || document;
    };
    goog$dom$DomHelper.prototype.B = function (a) {
        if (goog$isString(a)) {
            return this.Q.getElementById(a);
        } else {
            return a;
        }
    };
    goog$dom$DomHelper.prototype.ce = function (a, b, c) {
        return goog$dom$createDom_(this.Q, arguments);
    };
    goog$dom$DomHelper.prototype.createElement = function (a) {
        return this.Q.createElement(a);
    };
    goog$dom$DomHelper.prototype.createTextNode = function (a) {
        return this.Q.createTextNode(a);
    };
    var goog$dom$DomHelper$isCss1CompatMode = function (a) {
        return goog$dom$isCss1CompatMode_(a.Q);
    };
    var goog$dom$DomHelper$getDocumentScroll = function (a) {
        var b = a.Q;
        var a = !goog$userAgent$WEBKIT && goog$dom$isCss1CompatMode_(b) ? b.documentElement : b.body;
        var b = b.parentWindow || b.defaultView;
        return new goog$math$Coordinate(b.pageXOffset || a.scrollLeft, b.pageYOffset || a.scrollTop);
    };
    goog$dom$DomHelper.prototype.appendChild = function (a, b) {
        a.appendChild(b);
    };
    goog$dom$DomHelper.prototype.append = goog$dom$append;
    goog$dom$DomHelper.prototype.contains = function (a, b) {
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
    var Oc = function (a, b, c) {
        return Math.min(Math.max(a, b), c);
    };
    var goog$math$Box = function (a, b, c, d) {
        this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d;
    };
    goog$math$Box.prototype.ga = function () {
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
    goog$math$Rect.prototype.ga = function () {
        return new goog$math$Rect(this.left, this.top, this.width, this.height);
    };
    goog$math$Rect.prototype.toString = function () {
        return "(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)";
    };
    var Rc = function (a, b) {
        var c = Math.max(a.left + a.width, b.left + b.width);
        var d = Math.max(a.top + a.height, b.top + b.height);
        a.left = Math.min(a.left, b.left);
        a.top = Math.min(a.top, b.top);
        a.width = c - a.left;
        a.height = d - a.top;
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
    var Sc = function () {};
    Sc.prototype.Tc = false;
    Sc.prototype.Fc = function () {
        if (!this.Tc) {
            this.Tc = true;
            this.r();
        }
    };
    Sc.prototype.r = function () {
        if (this.nu) {
            Tc.apply(null, this.nu);
        }
    };
    var Uc = function (a) {
        if (a && typeof a.Fc == "function") {
            a.Fc();
        }
    };
    var Tc = function (a) {
        for (var b = 0, c = arguments.length; b < c; ++b) {
            var d = arguments[b];
            if (goog$isArrayLike(d)) {
                Tc.apply(null, d);
            } else {
                Uc(d);
            }
        }
    };
    var goog$pubsub$PubSub = function () {
        this.Ra = [];
        this.Oa = {};
    };
    goog$inherits(goog$pubsub$PubSub, Sc);
    goog$pubsub$PubSub.prototype.Xf = 1;
    goog$pubsub$PubSub.prototype.li = 0;
    goog$pubsub$PubSub.prototype.e = function (a, b, c) {
        var d = this.Oa[a];
        if (!d) {
            d = this.Oa[a] = [];
        }
        var f = this.Xf;
        this.Ra[f] = a;
        this.Ra[f + 1] = b;
        this.Ra[f + 2] = c;
        this.Xf = f + 3;
        d.push(f);
        return f;
    };
    goog$pubsub$PubSub.prototype.H = function (a, b, c) {
        if ((a = this.Oa[a])) {
            var d = this.Ra;
            if (
                (a = La(a, function (a) {
                    return d[a + 1] == b && d[a + 2] == c;
                }))
            ) {
                return this.ji(a);
            }
        }
        return false;
    };
    goog$pubsub$PubSub.prototype.ji = function (a) {
        if (this.li != 0) {
            if (!this.Jf) {
                this.Jf = [];
            }
            this.Jf.push(a);
            return false;
        }
        var b = this.Ra[a];
        if (b) {
            var c = this.Oa[b];
            if (c) {
                Oa(c, a);
            }
            delete this.Ra[a];
            delete this.Ra[a + 1];
            delete this.Ra[a + 2];
        }
        return !!b;
    };
    goog$pubsub$PubSub.prototype.c = function (a, b) {
        var c = this.Oa[a];
        if (c) {
            this.li++;
            var d = goog$array$slice(arguments, 1);
            for (var f = 0, g = c.length; f < g; f++) {
                var i = c[f];
                this.Ra[i + 1].apply(this.Ra[i + 2], d);
            }
            this.li--;
            if (this.Jf && this.li == 0) {
                while ((c = this.Jf.pop())) {
                    this.ji(c);
                }
            }
            return f != 0;
        }
        return false;
    };
    goog$pubsub$PubSub.prototype.clear = function (a) {
        if (a) {
            var b = this.Oa[a];
            if (b) {
                goog$array$forEach(b, this.ji, this);
                delete this.Oa[a];
            }
        } else {
            this.Ra.length = 0;
            this.Oa = {};
        }
    };
    goog$pubsub$PubSub.prototype.te = function (a) {
        if (a) {
            var b = this.Oa[a];
            if (b) {
                return b.length;
            } else {
                return 0;
            }
        }
        a = 0;
        for (b in this.Oa) {
            a += this.te(b);
        }
        return a;
    };
    goog$pubsub$PubSub.prototype.r = function () {
        goog$pubsub$PubSub.j.r.call(this);
        delete this.Ra;
        delete this.Oa;
        delete this.Jf;
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
    var goog$style$getStyle_ = function (a, b) {
        return (
            goog$style$getComputedStyle(a, b) || (a.currentStyle ? a.currentStyle[b] : null) || (a.style && a.style[b])
        );
    };
    var Zc = function (a, b, c) {
        var d;
        var f = goog$userAgent$GECKO && (nb || goog$userAgent$detectedX11_) && goog$userAgent$isVersion("1.9");
        if (b instanceof goog$math$Coordinate) {
            d = b.x;
            b = b.y;
        } else {
            d = b;
            b = c;
        }
        a.style.left = goog$style$getPixelStyleValue_(d, f);
        a.style.top = goog$style$getPixelStyleValue_(b, f);
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
        var d = c.Q.body;
        var f = c.Q.documentElement;
        var g = !goog$userAgent$WEBKIT && goog$dom$isCss1CompatMode_(c.Q) ? c.Q.documentElement : c.Q.body;
        for (; (a = goog$style$getOffsetParent(a));) {
            if (
                (!goog$userAgent$IE || a.clientWidth != 0) &&
                (!goog$userAgent$WEBKIT || a.clientHeight != 0 || a != d) &&
                a != d &&
                a != f &&
                goog$style$getStyle_(a, "overflow") != "visible"
            ) {
                var i = goog$style$getPageOffset(a);
                var m;
                m = a;
                if (goog$userAgent$GECKO && !goog$userAgent$isVersion("1.9")) {
                    var p = parseFloat(goog$style$getComputedStyle(m, "borderLeftWidth"));
                    if (goog$style$isRightToLeft(m)) {
                        var s =
                            m.offsetWidth -
                            m.clientWidth -
                            p -
                            parseFloat(goog$style$getComputedStyle(m, "borderRightWidth"));
                        var p = p + s;
                    }
                    m = new goog$math$Coordinate(p, parseFloat(goog$style$getComputedStyle(m, "borderTopWidth")));
                } else {
                    m = new goog$math$Coordinate(m.clientLeft, m.clientTop);
                }
                i.x += m.x;
                i.y += m.y;
                b.top = Math.max(b.top, i.y);
                b.right = Math.min(b.right, i.x + a.clientWidth);
                b.bottom = Math.min(b.bottom, i.y + a.clientHeight);
                b.left = Math.max(b.left, i.x);
            }
        }
        d = g.scrollLeft;
        g = g.scrollTop;
        b.left = Math.max(b.left, d);
        b.top = Math.max(b.top, g);
        c = goog$dom$getViewportSize_(c.Q.parentWindow || c.Q.defaultView || window);
        b.right = Math.min(b.right, d + c.width);
        b.bottom = Math.min(b.bottom, g + c.height);
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
        var f =
            goog$userAgent$GECKO &&
            c.getBoxObjectFor &&
            !a.getBoundingClientRect &&
            d == "absolute" &&
            (b = c.getBoxObjectFor(a)) &&
            (b.screenX < 0 || b.screenY < 0);
        var g = new goog$math$Coordinate(0, 0);
        var i;
        b = c ? (c.nodeType == 9 ? c : goog$dom$getOwnerDocument(c)) : document;
        i =
            goog$userAgent$IE &&
            !goog$userAgent$isDocumentMode(9) &&
            !goog$dom$DomHelper$isCss1CompatMode(goog$dom$getDomHelper(b))
                ? b.body
                : b.documentElement;
        if (a == i) {
            return g;
        }
        if (a.getBoundingClientRect) {
            b = goog$style$getBoundingClientRect_(a);
            a = goog$dom$DomHelper$getDocumentScroll(goog$dom$getDomHelper(c));
            g.x = b.left + a.x;
            g.y = b.top + a.y;
        } else if (c.getBoxObjectFor && !f) {
            b = c.getBoxObjectFor(a);
            a = c.getBoxObjectFor(i);
            g.x = b.screenX - a.screenX;
            g.y = b.screenY - a.screenY;
        } else {
            b = a;
            do {
                g.x += b.offsetLeft;
                g.y += b.offsetTop;
                if (b != a) {
                    g.x += b.clientLeft || 0;
                    g.y += b.clientTop || 0;
                }
                if (goog$userAgent$WEBKIT && goog$style$getStyle_(b, "position") == "fixed") {
                    g.x += c.body.scrollLeft;
                    g.y += c.body.scrollTop;
                    break;
                }
                b = b.offsetParent;
            } while (b && b != a);
            if (goog$userAgent$OPERA || (goog$userAgent$WEBKIT && d == "absolute")) {
                g.y -= c.body.offsetTop;
            }
            for (b = a; (b = goog$style$getOffsetParent(b)) && b != c.body && b != i;) {
                g.x -= b.scrollLeft;
                if (!goog$userAgent$OPERA || b.tagName != "TR") {
                    g.y -= b.scrollTop;
                }
            }
        }
        return g;
    };
    var fd = function (a, b) {
        var c = ed(a);
        var d = ed(b);
        return new goog$math$Coordinate(c.x - d.x, c.y - d.y);
    };
    var ed = function (a) {
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
            var c = ea(a.xl);
            var d = a;
            if (a.targetTouches) {
                d = a.targetTouches[0];
            } else if (c && a.xl().targetTouches) {
                d = a.xl().targetTouches[0];
            }
            b.x = d.clientX;
            b.y = d.clientY;
        }
        return b;
    };
    var hd = function (a, b, c) {
        if (b instanceof goog$math$Size) {
            c = b.height;
            b = b.width;
        } else if (c == undefined) {
            throw Error("missing height argument");
        }
        gd(a, b);
        a.style.height = goog$style$getPixelStyleValue_(c, true);
    };
    var goog$style$getPixelStyleValue_ = function (a, b) {
        if (typeof a == "number") {
            a = (b ? Math.round(a) : a) + "px";
        }
        return a;
    };
    var gd = function (a, b) {
        a.style.width = goog$style$getPixelStyleValue_(b, true);
    };
    var goog$style$getSize = function (a) {
        if (goog$style$getStyle_(a, "display") != "none") {
            return goog$style$getSizeWithDisplay_(a);
        }
        var b = a.style;
        var c = b.display;
        var d = b.visibility;
        var f = b.position;
        b.visibility = "hidden";
        b.position = "absolute";
        b.display = "inline";
        a = goog$style$getSizeWithDisplay_(a);
        b.display = c;
        b.position = f;
        b.visibility = d;
        return a;
    };
    var goog$style$getSizeWithDisplay_ = function (a) {
        var b = a.offsetWidth;
        var c = a.offsetHeight;
        var d = goog$userAgent$WEBKIT && !b && !c;
        if ((b === undefined || d) && a.getBoundingClientRect) {
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
    var ld = function (a, b) {
        var c = a.style;
        if ("opacity" in c) {
            c.opacity = b;
        } else if ("MozOpacity" in c) {
            c.MozOpacity = b;
        } else if ("filter" in c) {
            c.filter = b === "" ? "" : "alpha(opacity=" + b * 100 + ")";
        }
    };
    var md = function (a, b) {
        a.style.display = b ? "" : "none";
    };
    var goog$style$isRightToLeft = function (a) {
        return goog$style$getStyle_(a, "direction") == "rtl";
    };
    var nd = function (a, b, c, d) {
        if (/^\d+px?$/.test(b)) {
            return parseInt(b, 10);
        }
        var f = a.style[c];
        var g = a.runtimeStyle[c];
        a.runtimeStyle[c] = a.currentStyle[c];
        a.style[c] = b;
        b = a.style[d];
        a.style[c] = f;
        a.runtimeStyle[c] = g;
        return b;
    };
    var od = function (a, b) {
        return nd(a, a.currentStyle ? a.currentStyle[b] : null, "left", "pixelLeft");
    };
    var pd = function (a) {
        if (goog$userAgent$IE) {
            var b = od(a, "paddingLeft");
            var c = od(a, "paddingRight");
            var d = od(a, "paddingTop");
            var a = od(a, "paddingBottom");
            return new goog$math$Box(d, c, a, b);
        }
        b = goog$style$getComputedStyle(a, "paddingLeft");
        c = goog$style$getComputedStyle(a, "paddingRight");
        d = goog$style$getComputedStyle(a, "paddingTop");
        a = goog$style$getComputedStyle(a, "paddingBottom");
        return new goog$math$Box(parseFloat(d), parseFloat(c), parseFloat(a), parseFloat(b));
    };
    var goog$style$ieBorderWidthKeywords_ = {
        thin: 2,
        medium: 4,
        thick: 6
    };
    var rd = function (a, b) {
        if ((a.currentStyle ? a.currentStyle[b + "Style"] : null) == "none") {
            return 0;
        }
        var c = a.currentStyle ? a.currentStyle[b + "Width"] : null;
        if (c in goog$style$ieBorderWidthKeywords_) {
            return goog$style$ieBorderWidthKeywords_[c];
        } else {
            return nd(a, c, "left", "pixelLeft");
        }
    };
    var sd = function (a) {
        if (goog$userAgent$IE) {
            var b = rd(a, "borderLeft");
            var c = rd(a, "borderRight");
            var d = rd(a, "borderTop");
            var a = rd(a, "borderBottom");
            return new goog$math$Box(d, c, a, b);
        }
        b = goog$style$getComputedStyle(a, "borderLeftWidth");
        c = goog$style$getComputedStyle(a, "borderRightWidth");
        d = goog$style$getComputedStyle(a, "borderTopWidth");
        a = goog$style$getComputedStyle(a, "borderBottomWidth");
        return new goog$math$Box(parseFloat(d), parseFloat(c), parseFloat(a), parseFloat(b));
    };
    var td = /[^\d]+$/;
    var ud = {
        cm: 1,
        in: 1,
        mm: 1,
        pc: 1,
        pt: 1
    };
    var vd = {
        em: 1,
        ex: 1
    };
    var wd = function (a) {
        var b = goog$style$getStyle_(a, "fontSize");
        var c;
        c = ((c = b.match(td)) && c[0]) || null;
        if (b && c == "px") {
            return parseInt(b, 10);
        }
        if (goog$userAgent$IE) {
            if (c in ud) {
                return nd(a, b, "left", "pixelLeft");
            }
            if (a.parentNode && a.parentNode.nodeType == 1 && c in vd) {
                a = a.parentNode;
                c = goog$style$getStyle_(a, "fontSize");
                return nd(a, b == c ? "1em" : b, "left", "pixelLeft");
            }
        }
        c = goog$dom$createDom("span", {
            style: "visibility:hidden;position:absolute;line-height:0;padding:0;margin:0;border:0;height:1em;"
        });
        a.appendChild(c);
        b = c.offsetHeight;
        goog$dom$removeNode(c);
        return b;
    };
    var xd = function (a) {
        xd[" "](a);
        return a;
    };
    xd[" "] = function () {};
    if (goog$userAgent$IE) {
        goog$userAgent$isDocumentMode(9);
    }
    var yd = !goog$userAgent$IE || goog$userAgent$isDocumentMode(9);
    var zd = goog$userAgent$IE && !goog$userAgent$isVersion("8");
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
    var Ad = function (a, b) {
        this.type = a;
        this.currentTarget = this.target = b;
    };
    goog$inherits(Ad, Sc);
    Ad.prototype.r = function () {
        delete this.type;
        delete this.target;
        delete this.currentTarget;
    };
    Ad.prototype.jd = false;
    Ad.prototype.Rf = true;
    Ad.prototype.stopPropagation = function () {
        this.jd = true;
    };
    Ad.prototype.preventDefault = function () {
        this.Rf = false;
    };
    var Bd = function (a, b) {
        if (a) {
            this.Vh(a, b);
        }
    };
    goog$inherits(Bd, Ad);
    Bd.prototype.target = null;
    Bd.prototype.relatedTarget = null;
    Bd.prototype.offsetX = 0;
    Bd.prototype.offsetY = 0;
    Bd.prototype.clientX = 0;
    Bd.prototype.clientY = 0;
    Bd.prototype.screenX = 0;
    Bd.prototype.screenY = 0;
    Bd.prototype.button = 0;
    Bd.prototype.keyCode = 0;
    Bd.prototype.charCode = 0;
    Bd.prototype.ctrlKey = false;
    Bd.prototype.altKey = false;
    Bd.prototype.shiftKey = false;
    Bd.prototype.metaKey = false;
    Bd.prototype.ca = null;
    Bd.prototype.Vh = function (a, b) {
        var c = (this.type = a.type);
        Ad.call(this, c);
        this.target = a.target || a.srcElement;
        this.currentTarget = b;
        var d = a.relatedTarget;
        if (d) {
            if (goog$userAgent$GECKO) {
                var f;
                a: {
                    try {
                        xd(d.nodeName);
                        f = true;
                        break a;
                    } catch (g) {}
                    f = false;
                }
                if (!f) {
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
        this.state = a.state;
        this.ca = a;
        delete this.Rf;
        delete this.jd;
    };
    Bd.prototype.stopPropagation = function () {
        Bd.j.stopPropagation.call(this);
        if (this.ca.stopPropagation) {
            this.ca.stopPropagation();
        } else {
            this.ca.cancelBubble = true;
        }
    };
    Bd.prototype.preventDefault = function () {
        Bd.j.preventDefault.call(this);
        var a = this.ca;
        if (a.preventDefault) {
            a.preventDefault();
        } else {
            a.returnValue = false;
            if (zd) {
                try {
                    if (a.ctrlKey || (a.keyCode >= 112 && a.keyCode <= 123)) {
                        a.keyCode = -1;
                    }
                } catch (b) {}
            }
        }
    };
    Bd.prototype.xl = function () {
        return this.ca;
    };
    Bd.prototype.r = function () {
        Bd.j.r.call(this);
        this.relatedTarget = this.currentTarget = this.target = this.ca = null;
    };
    var Cd = function () {};
    var Dd = 0;
    Cd.prototype.key = 0;
    Cd.prototype.gd = false;
    Cd.prototype.Xo = false;
    Cd.prototype.Vh = function (a, b, c, d, f, g) {
        if (ea(a)) {
            this.Uo = true;
        } else if (a && a.handleEvent && ea(a.handleEvent)) {
            this.Uo = false;
        } else {
            throw Error("Invalid listener argument");
        }
        this.me = a;
        this.no = b;
        this.src = c;
        this.type = d;
        this.capture = !!f;
        this.Sh = g;
        this.Xo = false;
        this.key = ++Dd;
        this.gd = false;
    };
    Cd.prototype.handleEvent = function (a) {
        if (this.Uo) {
            return this.me.call(this.Sh || this.src, a);
        } else {
            return this.me.handleEvent.call(this.me, a);
        }
    };
    var Ed = {};
    var Fd = {};
    var Gd = {};
    var Hd = {};
    var Id = function (a, b, c, d, f) {
        if (b) {
            if (goog$isArray(b)) {
                for (var g = 0; g < b.length; g++) {
                    Id(a, b[g], c, d, f);
                }
                return null;
            }
            var d = !!d;
            var i = Fd;
            if (!(b in i)) {
                i[b] = {
                    K: 0,
                    Sa: 0
                };
            }
            i = i[b];
            if (!(d in i)) {
                i[d] = {
                    K: 0,
                    Sa: 0
                };
                i.K++;
            }
            var i = i[d];
            var m = goog$getUid(a);
            var p;
            i.Sa++;
            if (i[m]) {
                p = i[m];
                for (g = 0; g < p.length; g++) {
                    i = p[g];
                    if (i.me == c && i.Sh == f) {
                        if (i.gd) {
                            break;
                        }
                        return p[g].key;
                    }
                }
            } else {
                p = i[m] = [];
                i.K++;
            }
            g = Jd();
            g.src = a;
            i = new Cd();
            i.Vh(c, g, a, b, d, f);
            c = i.key;
            g.key = c;
            p.push(i);
            Ed[c] = i;
            if (!Gd[m]) {
                Gd[m] = [];
            }
            Gd[m].push(i);
            if (a.addEventListener) {
                if (a == goog$global || !a.wk) {
                    a.addEventListener(b, g, d);
                }
            } else {
                a.attachEvent(b in Hd ? Hd[b] : (Hd[b] = "on" + b), g);
            }
            return c;
        }
        throw Error("Invalid event type");
    };
    var Jd = function () {
        var a = Kd;
        var b = yd
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
    var Ld = function (a, b, c, d, f) {
        if (goog$isArray(b)) {
            for (var g = 0; g < b.length; g++) {
                Ld(a, b[g], c, d, f);
            }
        } else {
            d = !!d;
            if ((a = Md(a, b, d))) {
                for (g = 0; g < a.length; g++) {
                    if (a[g].me == c && a[g].capture == d && a[g].Sh == f) {
                        Nd(a[g].key);
                        break;
                    }
                }
            }
        }
    };
    var Nd = function (a) {
        if (!Ed[a]) {
            return false;
        }
        var b = Ed[a];
        if (b.gd) {
            return false;
        }
        var c = b.src;
        var d = b.type;
        var f = b.no;
        var g = b.capture;
        if (c.removeEventListener) {
            if (c == goog$global || !c.wk) {
                c.removeEventListener(d, f, g);
            }
        } else if (c.detachEvent) {
            c.detachEvent(d in Hd ? Hd[d] : (Hd[d] = "on" + d), f);
        }
        c = goog$getUid(c);
        f = Fd[d][g][c];
        if (Gd[c]) {
            var i = Gd[c];
            Oa(i, b);
            if (i.length == 0) {
                delete Gd[c];
            }
        }
        b.gd = true;
        f.zo = true;
        Od(d, g, c, f);
        delete Ed[a];
        return true;
    };
    var Od = function (a, b, c, d) {
        if (!d.ub && d.zo) {
            for (var f = 0, g = 0; f < d.length; f++) {
                if (d[f].gd) {
                    d[f].no.src = null;
                } else {
                    if (f != g) {
                        d[g] = d[f];
                    }
                    g++;
                }
            }
            d.length = g;
            d.zo = false;
            if (g == 0) {
                delete Fd[a][b][c];
                Fd[a][b].K--;
                if (Fd[a][b].K == 0) {
                    delete Fd[a][b];
                    Fd[a].K--;
                }
                if (Fd[a].K == 0) {
                    delete Fd[a];
                }
            }
        }
    };
    var Pd = function (a) {
        var b;
        var c = 0;
        var d = b == null;
        b = !!b;
        if (a == null) {
            goog$object$forEach(Gd, function (a) {
                for (var f = a.length - 1; f >= 0; f--) {
                    var g = a[f];
                    if (d || b == g.capture) {
                        Nd(g.key);
                        c++;
                    }
                }
            });
        } else {
            a = goog$getUid(a);
            if (Gd[a]) {
                var a = Gd[a];
                for (var f = a.length - 1; f >= 0; f--) {
                    var g = a[f];
                    if (d || b == g.capture) {
                        Nd(g.key);
                        c++;
                    }
                }
            }
        }
    };
    var Md = function (a, b, c) {
        var d = Fd;
        if (b in d && ((d = d[b]), c in d && ((d = d[c]), (a = goog$getUid(a)), d[a]))) {
            return d[a];
        } else {
            return null;
        }
    };
    var Rd = function (a, b, c, d, f) {
        var g = 1;
        var b = goog$getUid(b);
        if (a[b]) {
            a.Sa--;
            a = a[b];
            if (a.ub) {
                a.ub++;
            } else {
                a.ub = 1;
            }
            try {
                for (var i = a.length, m = 0; m < i; m++) {
                    var p = a[m];
                    if (p && !p.gd) {
                        g &= Qd(p, f) !== false;
                    }
                }
            } finally {
                a.ub--;
                Od(c, d, b, a);
            }
        }
        return Boolean(g);
    };
    var Qd = function (a, b) {
        var c = a.handleEvent(b);
        if (a.Xo) {
            Nd(a.key);
        }
        return c;
    };
    var Kd = function (a, b) {
        if (!Ed[a]) {
            return true;
        }
        var c = Ed[a];
        var d = c.type;
        var f = Fd;
        if (!(d in f)) {
            return true;
        }
        var f = f[d];
        var g;
        var i;
        if (!yd) {
            g = b || goog$getObjectByName("window.event");
            var m = true in f;
            var p = false in f;
            if (m) {
                if (g.keyCode < 0 || g.returnValue != undefined) {
                    return true;
                }
                a: {
                    var s = false;
                    if (g.keyCode == 0) {
                        try {
                            g.keyCode = -1;
                            break a;
                        } catch (y) {
                            s = true;
                        }
                    }
                    if (s || g.returnValue == undefined) {
                        g.returnValue = true;
                    }
                }
            }
            s = new Bd();
            s.Vh(g, this);
            g = true;
            try {
                if (m) {
                    var v = [];
                    for (var z = s.currentTarget; z; z = z.parentNode) {
                        v.push(z);
                    }
                    i = f[true];
                    i.Sa = i.K;
                    for (var fa = v.length - 1; !s.jd && fa >= 0 && i.Sa; fa--) {
                        s.currentTarget = v[fa];
                        g &= Rd(i, v[fa], d, true, s);
                    }
                    if (p) {
                        i = f[false];
                        i.Sa = i.K;
                        for (fa = 0; !s.jd && fa < v.length && i.Sa; fa++) {
                            s.currentTarget = v[fa];
                            g &= Rd(i, v[fa], d, false, s);
                        }
                    }
                } else {
                    g = Qd(c, s);
                }
            } finally {
                if (v) {
                    v.length = 0;
                }
                s.Fc();
            }
            return g;
        }
        d = new Bd(b, this);
        try {
            g = Qd(c, d);
        } finally {
            d.Fc();
        }
        return g;
    };
    var Sd = function () {};
    goog$inherits(Sd, Sc);
    Sd.prototype.wk = true;
    Sd.prototype.Ih = null;
    Sd.prototype.Bk = function (a) {
        this.Ih = a;
    };
    Sd.prototype.addEventListener = function (a, b, c, d) {
        Id(this, a, b, c, d);
    };
    Sd.prototype.removeEventListener = function (a, b, c, d) {
        Ld(this, a, b, c, d);
    };
    Sd.prototype.dispatchEvent = function (a) {
        var b = a.type || a;
        var c = Fd;
        if (b in c) {
            if (goog$isString(a)) {
                a = new Ad(a, this);
            } else if (a instanceof Ad) {
                a.target = a.target || this;
            } else {
                var d = a;
                var a = new Ad(b, this);
                goog$object$extend(a, d);
            }
            var d = 1;
            var f;
            var c = c[b];
            var b = true in c;
            var g;
            if (b) {
                f = [];
                for (g = this; g; g = g.Ih) {
                    f.push(g);
                }
                g = c[true];
                g.Sa = g.K;
                for (var i = f.length - 1; !a.jd && i >= 0 && g.Sa; i--) {
                    a.currentTarget = f[i];
                    d &= Rd(g, f[i], a.type, true, a) && a.Rf != false;
                }
            }
            if (false in c) {
                g = c[false];
                g.Sa = g.K;
                if (b) {
                    for (i = 0; !a.jd && i < f.length && g.Sa; i++) {
                        a.currentTarget = f[i];
                        d &= Rd(g, f[i], a.type, false, a) && a.Rf != false;
                    }
                } else {
                    for (f = this; !a.jd && f && g.Sa; f = f.Ih) {
                        a.currentTarget = f;
                        d &= Rd(g, f, a.type, false, a) && a.Rf != false;
                    }
                }
            }
            a = Boolean(d);
        } else {
            a = true;
        }
        return a;
    };
    Sd.prototype.r = function () {
        Sd.j.r.call(this);
        Pd(this);
        this.Ih = null;
    };
    var Ud = function (a, b) {
        this.kd = a || 1;
        this.If = b || goog$Timer$defaultTimerObject;
        this.Vk = goog$bind(this.Mt, this);
        this.Wk = goog$now();
    };
    goog$inherits(Ud, Sd);
    Ud.prototype.enabled = false;
    var goog$Timer$defaultTimerObject = goog$global.window;
    Ud.prototype.ha = null;
    Ud.prototype.setInterval = function (a) {
        this.kd = a;
        if (this.ha && this.enabled) {
            this.stop();
            this.start();
        } else if (this.ha) {
            this.stop();
        }
    };
    Ud.prototype.Mt = function () {
        if (this.enabled) {
            var a = goog$now() - this.Wk;
            if (a > 0 && a < this.kd * 0.8) {
                this.ha = this.If.setTimeout(this.Vk, this.kd - a);
            } else {
                this.dispatchEvent("tick");
                if (this.enabled) {
                    this.ha = this.If.setTimeout(this.Vk, this.kd);
                    this.Wk = goog$now();
                }
            }
        }
    };
    Ud.prototype.start = function () {
        this.enabled = true;
        if (!this.ha) {
            this.ha = this.If.setTimeout(this.Vk, this.kd);
            this.Wk = goog$now();
        }
    };
    Ud.prototype.stop = function () {
        this.enabled = false;
        if (this.ha) {
            this.If.clearTimeout(this.ha);
            this.ha = null;
        }
    };
    Ud.prototype.r = function () {
        Ud.j.r.call(this);
        this.stop();
        delete this.If;
    };
    var Vd = function (a, b, c) {
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
    var goog$debug$RelativeTimeProvider = function () {
        this.vp = goog$now();
    };
    var goog$debug$RelativeTimeProvider$defaultInstance_ = new goog$debug$RelativeTimeProvider();
    goog$debug$RelativeTimeProvider.prototype.set = function (a) {
        this.vp = a;
    };
    goog$debug$RelativeTimeProvider.prototype.reset = function () {
        this.set(goog$now());
    };
    goog$debug$RelativeTimeProvider.prototype.get = function () {
        return this.vp;
    };
    var goog$debug$Formatter = function (a) {
        this.Xb = a || "";
        this.kt = goog$debug$RelativeTimeProvider$defaultInstance_;
    };
    goog$debug$Formatter.prototype.to = true;
    goog$debug$Formatter.prototype.nt = true;
    goog$debug$Formatter.prototype.lt = true;
    goog$debug$Formatter.prototype.Nk = false;
    goog$debug$Formatter.prototype.qt = false;
    var goog$debug$Formatter$getTwoDigitString_ = function (a) {
        if (a < 10) {
            return "0" + a;
        } else {
            return "" + a;
        }
    };
    var goog$debug$Formatter$getRelativeTime_ = function (a, b) {
        var c = (a.mo - b) / 1000;
        var d = c.toFixed(3);
        var f = 0;
        if (c < 1) {
            f = 2;
        } else {
            while (c < 100) {
                f++;
                c *= 10;
            }
        }
        while (f-- > 0) {
            d = " " + d;
        }
        return d;
    };
    var goog$debug$TextFormatter = function (a) {
        goog$debug$Formatter.call(this, a);
    };
    goog$inherits(goog$debug$TextFormatter, goog$debug$Formatter);
    var goog$debug$Console = function () {
        this.Ct = goog$bind(this.Jt, this);
        this.Yh = new goog$debug$TextFormatter();
        this.Yh.to = false;
        this.Ro = this.Yh.Nk = false;
        this.ro = "";
        this.Ws = {};
    };
    var goog$debug$Console$startCapturing_ = function () {
        var a = goog$debug$Console$instance;
        if (true != a.Ro) {
            goog$debug$LogManager$initialize();
            var b = goog$debug$LogManager$rootLogger_;
            var c = a.Ct;
            if (!b.bg) {
                b.bg = [];
            }
            b.bg.push(c);
            a.Ro = true;
        }
    };
    goog$debug$Console.prototype.Jt = function (a) {
        if (!this.Ws[a.lo]) {
            var b;
            b = this.Yh;
            var c = [];
            c.push(b.Xb, " ");
            if (b.to) {
                var d = new Date(a.mo);
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
            if (b.nt) {
                c.push("[", goog$debug$Formatter$getRelativeTime_(a, b.kt.get()), "s] ");
            }
            if (b.lt) {
                c.push("[", a.lo, "] ");
            }
            if (b.qt) {
                c.push("[", a.getLevel().name, "] ");
            }
            c.push(a.getMessage(), "\n");
            if (b.Nk && a.Ik) {
                c.push(a.Hk, "\n");
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
                this.ro += b;
            }
        }
    };
    var goog$debug$Console$instance = null;
    var goog$debug$Console$console_ = window.console;
    var goog$debug$Console$autoInstall = function () {
        if (!goog$debug$Console$instance) {
            goog$debug$Console$instance = new goog$debug$Console();
        }
        if (window.location.href.indexOf("Debug=true") != -1) {
            goog$debug$Console$startCapturing_();
        }
    };
    var ge = null;
    var R = function (a, b, c, d) {
        if (!ge) {
            goog$debug$Console$autoInstall();
            goog$debug$Console$startCapturing_();
            goog$debug$Console$instance.Yh.Nk = true;
            ge = goog$debug$LogManager$getLogger("yt.debug");
            ge.Bi(goog$debug$Logger$Level$INFO);
        }
        ge.log(a, b + ": " + c, d);
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
    var yt$dom$getNextId_ = goog$getObjectByName("yt.dom.getNextId_");
    if (!yt$dom$getNextId_) {
        yt$dom$getNextId_ = function () {
            return ++ne;
        };
        goog$exportSymbol("yt.dom.getNextId_", yt$dom$getNextId_);
        var ne = 0;
    }
    var yt$dom$cloneNode_ = function (a) {
        var b = a.cloneNode(false);
        if (b.tagName == "TR" || b.tagName == "SELECT") {
            goog$array$forEach(a.childNodes, function (a) {
                b.appendChild(yt$dom$cloneNode_(a));
            });
        } else {
            b.innerHTML = a.innerHTML;
        }
        return b;
    };
    var pe = function (a, b) {
        a = goog$dom$getElement(a);
        b = goog$dom$getElement(b);
        return !!goog$dom$getAncestor(
            a,
            function (a) {
                return a === b;
            },
            true,
            undefined
        );
    };
    var qe = function (a, b) {
        var c = goog$dom$getElementsByTagNameAndClass(a, null, b);
        if (c.length) {
            return c[0];
        } else {
            return null;
        }
    };
    var re = function (a, b) {
        return goog$dom$getElementByClass(a, b);
    };
    var se = function (a, b) {
        if (a in b) {
            return b[a];
        }
        var c = a.charAt(0).toUpperCase() + a.substr(1);
        if ("moz" + c in b) {
            return b["moz" + c];
        }
        if ("ms" + c in b) {
            return b["ms" + c];
        }
        if ("o" + c in b) {
            return b["o" + c];
        }
        if ("webkit" + c in b) {
            return b["webkit" + c];
        }
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
            this.altKey = a.altKey;
            this.ctrlKey = a.ctrlKey;
            this.shiftKey = a.shiftKey;
            if (this.type.indexOf("touch") == 0) {
                this.touches = a.touches;
                this.changedTouches = a.changedTouches;
            }
            if (this.type.indexOf("gesture") == 0) {
                this.scale = a.scale;
                this.rotation = a.rotation;
            }
            this.ca = a;
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
    yt$events$Event.prototype.altKey = false;
    yt$events$Event.prototype.ctrlKey = false;
    yt$events$Event.prototype.shiftKey = false;
    yt$events$Event.prototype.ca = null;
    yt$events$Event.prototype.clientX = 0;
    yt$events$Event.prototype.clientY = 0;
    yt$events$Event.prototype.pageX = 0;
    yt$events$Event.prototype.pageY = 0;
    yt$events$Event.prototype.touches = null;
    yt$events$Event.prototype.changedTouches = null;
    yt$events$Event.prototype.preventDefault = function () {
        this.ca.returnValue = false;
        if (this.ca.preventDefault) {
            this.ca.preventDefault();
        }
    };
    yt$events$Event.prototype.th = function () {
        if (this.ca.th) {
            this.ca.th();
        } else {
            this.preventDefault();
        }
    };
    yt$events$Event.prototype.stopPropagation = function () {
        this.ca.cancelBubble = true;
        if (this.ca.stopPropagation) {
            this.ca.stopPropagation();
        }
    };
    var yt$events$listeners_ = goog$getObjectByName("yt.events.listeners_") || {};
    goog$exportSymbol("yt.events.listeners_", yt$events$listeners_);
    var yt$events$counter_ = goog$getObjectByName("yt.events.counter_") || {
        count: 0
    };
    goog$exportSymbol("yt.events.counter_", yt$events$counter_);
    var yt$events$findListenerKey_ = function (a, b, c, d) {
        return eb(function (f) {
            return f[0] == a && f[1] == b && f[2] == c && f[4] == !!d;
        });
    };
    var yt$events$listen = function (a, b, c, d) {
        if (!a || (!a.addEventListener && !a.attachEvent)) {
            return "";
        }
        var d = !!d;
        var f = yt$events$findListenerKey_(a, b, c, d);
        if (f) {
            return f;
        }
        var f = ++yt$events$counter_.count + "";
        var g = function (b) {
            b = new yt$events$Event(b);
            b.currentTarget = a;
            return c.call(a, b);
        };
        yt$events$listeners_[f] = [a, b, c, g, d];
        if (a.addEventListener) {
            a.addEventListener(b, g, d);
        } else {
            a.attachEvent("on" + b, g);
        }
        return f;
    };
    var we = function (a, b, c) {
        if (se("pointerEnabled", window.navigator)) {
            b = b.charAt(0).toUpperCase() + b.substr(1).toLowerCase();
            return yt$events$listen(a, "MSPointer" + b, function (a) {
                c(a);
            });
        }
        var d = (b = b.toLowerCase());
        switch (b) {
            case "down":
                d = "start";
                break;
            case "up":
                d = "end";
                break;
            case "over":
                d = "enter";
                break;
            case "out":
                d = "leave";
        }
        var f = false;
        var g = 0;
        return [
            yt$events$listen(a, "touch" + d, function (a) {
                window.clearTimeout(g);
                f = true;
                goog$array$forEach(a.changedTouches, function (b) {
                    var d = new yt$events$Event(a);
                    w(d, b);
                    c(d);
                });
                g = window.setTimeout(function () {
                    f = false;
                }, 400);
            }),
            yt$events$listen(a, "mouse" + b, function (a) {
                if (!f) {
                    c(a);
                }
            })
        ];
    };
    var ye = function (a, b, c) {
        xe(a, b, function (a) {
            return goog$dom$classes$has(a, c);
        });
    };
    var xe = function (a, b, c) {
        var d = a || document;
        yt$events$listen(d, "click", function (a) {
            var g = goog$dom$getAncestor(
                a.target,
                function (a) {
                    return a === d || c(a);
                },
                true
            );
            if (g && g !== d) {
                a.currentTarget = g;
                b.call(g, a);
            }
        });
    };
    var Ae = function (a) {
        if ((a = yt$events$findListenerKey_(document, a, yt$uix$dispatchEvent_, false))) {
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
                var f = c[1];
                var g = c[3];
                var c = c[4];
                if (d.removeEventListener) {
                    d.removeEventListener(f, g, c);
                } else {
                    d.detachEvent("on" + f, g);
                }
                delete yt$events$listeners_[a];
            }
        });
    };
    var Be = function (a, b) {
        if (document.createEvent) {
            var c = document.createEvent("HTMLEvents");
            c.initEvent(b, true, true);
            a.dispatchEvent(c);
        } else {
            c = document.createEventObject();
            a.fireEvent("on" + b, c);
        }
    };
    var Ce = function (a) {
        var b = document;
        var c =
            "onfullscreenchange" in b
                ? "fullscreenchange"
                : "onmozfullscreenchange" in b
                  ? "mozfullscreenchange"
                  : "onmsfullscreenchange" in b
                    ? "msfullscreenchange"
                    : "onofullscreenchange" in b
                      ? "ofullscreenchange"
                      : "onwebkitfullscreenchange" in b
                        ? "webkitfullscreenchange"
                        : null;
        if (c) {
            yt$events$listen(b, c, a);
        }
    };
    var De = function () {
        var a = se("fullScreenEnabled", document);
        return a || (a == undefined && !goog$userAgent$GECKO && !!se("requestFullScreen", document.body));
    };
    var Fe = function (a, b, c) {
        var c = c || {};
        var d = c.Sc;
        if (!d) {
            d = document.createElement("style");
            document.getElementsByTagName("head")[0].appendChild(d);
            d = d.sheet || d.styleSheet;
        }
        if (c.reset) {
            Ee(d);
        }
        b = b instanceof Array ? b.join(";") : b;
        if (d.insertRule) {
            d.insertRule(a + "{" + b + "}", d.cssRules.length);
        } else {
            d.addRule(a, b, -1);
        }
        return d;
    };
    var Ee = function (a) {
        for (var b = (a.cssRules || a.rules).length; b > 0; b--) {
            var c = a;
            if (c.deleteRule) {
                c.deleteRule(0);
            } else {
                c.removeRule(0);
            }
        }
    };
    var Ge = function (a) {
        this.rl = a || window;
        this.od = [];
    };
    Ge.prototype.rl = null;
    Ge.prototype.od = null;
    Ge.prototype.G = function (a, b, c, d) {
        c = goog$bind(c, d || this.rl);
        a = yt$events$listen(a, b, c);
        this.od.push(a);
        return a;
    };
    var He = function (a, b, c) {
        var d = document;
        var c = goog$bind(c, a.rl);
        var b = we(d, b, c);
        a.od.push(b);
    };
    Ge.prototype.Gk = function (a) {
        yt$events$unlistenByKey(a);
        Oa(this.od, a);
    };
    Ge.prototype.Wa = function () {
        for (var a = 0; a < this.od.length; a++) {
            yt$events$unlistenByKey(this.od[a]);
        }
        this.od = [];
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
    var Oe = function () {
        this.Di = undefined;
    };
    var goog$json$Serializer$serialize = function (a, b) {
        var c = [];
        goog$json$Serializer$serialize_(a, b, c);
        return c.join("");
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
                    var f = "";
                    for (var g = 0; g < d; g++) {
                        c.push(f);
                        f = b[g];
                        goog$json$Serializer$serialize_(a, a.Di ? a.Di.call(b, "" + g, f) : f, c);
                        f = ",";
                    }
                    c.push("]");
                    break;
                }
                c.push("{");
                d = "";
                for (g in b) {
                    if (Object.prototype.hasOwnProperty.call(b, g)) {
                        f = b[g];
                        if (typeof f != "function") {
                            c.push(d);
                            goog$json$Serializer$serializeString_(g, c);
                            c.push(":");
                            goog$json$Serializer$serialize_(a, a.Di ? a.Di.call(b, g, f) : f, c);
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
                var f = "\\u";
                if (b < 16) {
                    f += "000";
                } else if (b < 256) {
                    f += "00";
                } else if (b < 4096) {
                    f += "0";
                }
                return (goog$json$Serializer$charToJsonCharCache_[a] = f + b.toString(16));
            }),
            '"'
        );
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
                if (c && (c = goog$uri$utils$getDomain(c)) && c != b.hostname) {
                    goog$uri$utils$needsPhishingProtection_ = true;
                    throw Error();
                }
            }
        }
        return a.match(goog$uri$utils$splitRe_);
    };
    var goog$uri$utils$needsPhishingProtection_ = goog$userAgent$WEBKIT;
    var goog$uri$utils$getDomain = function (a) {
        return (a = goog$uri$utils$split(a)[3] || null) && decodeURIComponent(a);
    };
    var goog$uri$utils$buildQueryDataBufferFromMap_ = function (a, b) {
        for (var c in b) {
            var d = c;
            var f = b[c];
            var g = a;
            if (goog$isArray(f)) {
                for (var i = 0; i < f.length; i++) {
                    g.push("&", d);
                    if (f[i] !== "") {
                        g.push("=", goog$string$urlEncode(f[i]));
                    }
                }
            } else if (f != null) {
                g.push("&", d);
                if (f !== "") {
                    g.push("=", goog$string$urlEncode(f));
                }
            }
        }
        return a;
    };
    var Ze = function (a, b) {
        var c = a.split(b);
        var d = {};
        for (var f = 0, g = c.length; f < g; f++) {
            var i = c[f].split("=");
            if ((i.length == 1 && i[0]) || i.length == 2) {
                var m = i[0];
                var i = decodeURIComponent((i[1] || "").replace(/\+/g, " "));
                if (m in d) {
                    if (goog$isArray(d[m])) {
                        goog$array$extend(d[m], i);
                    } else {
                        d[m] = [d[m], i];
                    }
                } else {
                    d[m] = i;
                }
            }
        }
        return d;
    };
    var $e = function (a) {
        var b = [];
        goog$object$forEach(a, function (a, d) {
            var f = goog$string$urlEncode(d);
            var g;
            g = goog$isArray(a) ? a : [a];
            goog$array$forEach(g, function (a) {
                if (a == "") {
                    b.push(f);
                } else {
                    b.push(f + "=" + goog$string$urlEncode(a));
                }
            });
        });
        return b.join(";");
    };
    var yt$uri$parseQueryData = function (a) {
        if (a.charAt(0) == "?") {
            a = a.substr(1);
        }
        return Ze(a, "&");
    };
    var yt$uri$getQueryData = function (a) {
        if (a.indexOf("?") != -1) {
            a = (a || "").split("#")[0];
            a = a.split("?", 2);
            return yt$uri$parseQueryData(a.length > 1 ? a[1] : a[0]);
        } else {
            return {};
        }
    };
    var yt$uri$buildQueryData = function (a) {
        a = goog$uri$utils$buildQueryDataBufferFromMap_([], a);
        a[0] = "";
        return a.join("");
    };
    var yt$uri$appendQueryData = function (a, b) {
        var c = goog$uri$utils$buildQueryDataBufferFromMap_([a], b);
        if (c[1]) {
            var d = c[0];
            var f = d.indexOf("#");
            if (f >= 0) {
                c.push(d.substr(f));
                c[0] = d = d.substr(0, f);
            }
            f = d.indexOf("?");
            if (f < 0) {
                c[1] = "?";
            } else if (f == d.length - 1) {
                c[1] = undefined;
            }
        }
        return c.join("");
    };
    var yt$uri$getDomain = goog$uri$utils$getDomain;
    var yt$uri$setQueryData = function (a, b) {
        var c = a.split("?", 2);
        var a = c[0];
        var c = yt$uri$parseQueryData(c[1] || "");
        var d;
        for (d in b) {
            c[d] = b[d];
        }
        return yt$uri$appendQueryData(a, c);
    };
    var ff = null;
    if (typeof XMLHttpRequest != "undefined") {
        ff = function () {
            return new XMLHttpRequest();
        };
    } else if (typeof ActiveXObject != "undefined") {
        ff = function () {
            return new ActiveXObject("Microsoft.XMLHTTP");
        };
    }
    var yt$net$ajax$isSuccess_ = function (a) {
        switch (a && "status" in a ? a.status : -1) {
            case 0:
            case 200:
            case 204:
            case 304:
                return true;
            default:
                return false;
        }
    };
    var yt$net$ajax$send_ = function (a, b, c, d, f) {
        var g = ff && ff();
        if ("open" in g) {
            g.onreadystatechange = function () {
                if ((g && "readyState" in g ? g.readyState : 0) == 4 && b) {
                    b(g);
                }
            };
            c = (c || "GET").toUpperCase();
            d = d || "";
            g.open(c, a, true);
            a = c == "POST";
            if (f) {
                for (var i in f) {
                    g.setRequestHeader(i, f[i]);
                    if (i.toLowerCase() == "content-type") {
                        a = false;
                    }
                }
            }
            if (a) {
                g.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }
            g.send(d);
        }
    };
    var yt$net$ajax$send = function (a, b) {
        var c = b.format || "JSON";
        if (b.jr) {
            a = document.location.protocol + "//" + document.location.hostname + a;
        }
        var d = b.Mg;
        if (d) {
            a = yt$uri$setQueryData(a, d);
        }
        var f = b.yu || "";
        if ((d = b.Ym)) {
            f = yt$uri$parseQueryData(f);
            goog$object$extend(f, d);
            f = yt$uri$buildQueryData(f);
        }
        yt$net$ajax$send_(
            a,
            function (a) {
                var d = yt$net$ajax$isSuccess_(a);
                var f = null;
                if (d || (a.status >= 400 && a.status < 500)) {
                    f = yt$net$ajax$parseResponse_(c, a);
                }
                if (d) {
                    a: {
                        switch (c) {
                            case "XML":
                                d = parseInt(f && f.return_code, 10) == 0;
                                break a;
                            case "RAW":
                                d = true;
                                break a;
                        }
                        d = !!f;
                    }
                }
                var f = f || {};
                var p = b.lf || goog$global;
                if (d) {
                    if (b.Rb) {
                        b.Rb.call(p, a, f);
                    }
                } else if (b.qf) {
                    b.qf.call(p, a, f);
                }
                if (b.nm) {
                    b.nm.call(p, a, f);
                }
            },
            b.method,
            f,
            b.headers
        );
    };
    var yt$net$ajax$parseResponse_ = function (a, b) {
        var c = null;
        switch (a) {
            case "JSON":
                var d = b.responseText;
                var f = b.getResponseHeader("Content-Type") || "";
                if (d && f.indexOf("json") >= 0) {
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
    var of = {};
    var pf = 0;
    var qf = function (a) {
        var b = new Image();
        var c = "" + pf++;
        of[c] = b;
        b.onload = b.onerror = function () {
            delete of[c];
        };
        b.src = a;
        b = eval("null");
    };
    var rf = function (a) {
        this.Ft = a;
        this.ia = 0;
        this.tc = this.gl(null);
    };
    rf.prototype.find = function (a, b) {
        var c = this.tc;
        for (var d = this.ia; d >= 0; d--) {
            while (c.links[d] && c.links[d].value < a) {
                c = c.links[d];
            }
            if (b) {
                b[d] = c;
            }
        }
        if ((c = c.Tb()) && c.value == a) {
            return c;
        } else {
            return null;
        }
    };
    var sf = function (a, b) {
        var c = [];
        var d = a.find(b, c);
        if (d) {
            return d.Tb();
        } else {
            return c[0].Tb();
        }
    };
    rf.prototype.Bf = function (a) {
        var b = [];
        var c = this.find(a, b);
        if (c) {
            return c;
        } else {
            return this.Zk(a, b);
        }
    };
    rf.prototype.Zk = function (a, b) {
        var c;
        for (c = 0; this.Ft() < 0.25 && c <= this.ia && c < 15;) {
            c++;
        }
        while (this.ia < c) {
            b[++this.ia] = this.tc;
        }
        var d = this.gl(a);
        for (var f = 0; f <= c; f++) {
            d.links[f] = b[f].links[f];
            b[f].links[f] = d;
        }
        return d;
    };
    rf.prototype.remove = function (a) {
        var b = [];
        if ((a = this.find(a, b))) {
            return this.Qf(a, b);
        } else {
            return a;
        }
    };
    rf.prototype.Qf = function (a, b) {
        for (var c = 0; c <= a.getLevel(); c++) {
            b[c].links[c] = a.links[c];
        }
        while (!this.tc.links[this.ia] && this.ia > 0) {
            this.ia--;
        }
        return a;
    };
    rf.prototype.gl = function (a) {
        return new tf(a);
    };
    rf.prototype.getLength = function () {
        var a = 0;
        for (var b = this.tc.Tb() || null; b != null; b = b.Tb()) {
            a++;
        }
        return a;
    };
    rf.prototype.toString = function (a) {
        for (var a = a || 0, b = "", c = this.tc; c.links[a];) {
            c = c.links[a];
            b = b.concat(b.length ? "," : "", c.toString());
        }
        return "[" + b + "]";
    };
    var tf = function (a) {
        this.value = a;
        this.links = [];
    };
    tf.prototype.getLevel = function () {
        return this.links.length - 1;
    };
    tf.prototype.Tb = function () {
        return this.links[0] || null;
    };
    tf.prototype.toString = function () {
        return "" + this.value;
    };
    var vf = function (a, b) {
        this.start = a;
        this.end = b;
        this.re = uf++;
    };
    var uf = 0;
    vf.prototype.contains = function (a, b) {
        return a >= this.start && a < this.end && (b == null || (a < b && b <= this.end));
    };
    var wf = function (a) {
        rf.call(this, a);
    };
    wf.prototype = new rf(Math.random);
    wf.prototype.constructor = wf;
    var xf = function (a, b) {
        var c = [];
        var d = a.tc;
        for (var f = a.ia; f >= 0; f--) {
            while (d.links[f] && d.links[f].value <= b) {
                d = d.links[f];
            }
            var g = c;
            var i = d.X[f];
            var m = undefined;
            for (m in i) {
                g.push(i[m * 1]);
            }
        }
        if (d.value == b) {
            for (var p in d.Kf) {
                f = d.Kf[p];
                if (f.start == f.end) {
                    c.push(f);
                }
            }
        }
        return c;
    };
    var yf = function (a, b, c) {
        var d = [];
        for (var b = sf(a, b), a = c == null ? null : sf(a, c); b && b != a;) {
            var c = d;
            var f = b.Kf;
            var g = undefined;
            for (g in f) {
                c.push(f[g * 1]);
            }
            b = b.Tb();
        }
        return d;
    };
    var Af = function (a, b) {
        var c = a.Bf(b.start);
        var d = a.Bf(b.end);
        c.Kf[b.re] = b;
        c.Zh++;
        d.Zh++;
        zf(b, c, d, function (a, c) {
            if (a.X[c] && a.X[c][b.re] == b) {
                throw Error("Interval already exists: " + b);
            }
            a.La(c, b);
        });
    };
    wf.prototype.Zk = function (a, b) {
        var c = rf.prototype.Zk.call(this, a, b);
        var d;
        var f;
        var g;
        var i = {};
        for (d = 0; d < c.getLevel() && c.links[d + 1]; d++) {
            for (f in i) {
                g = i[f];
                if (g.contains(c.value, c.links[d + 1].value)) {
                    Bf(g, c.links[d], c.links[d + 1], d);
                } else {
                    c.La(d, g);
                    delete i[f];
                }
            }
            for (f in b[d].X[d]) {
                g = b[d].X[d][f * 1];
                if (g.contains(c.value, c.links[d + 1].value)) {
                    Bf(g, c.links[d], c.links[d + 1], d);
                    i[f] = g;
                } else {
                    c.La(d, g);
                }
            }
        }
        for (f in i) {
            c.La(d, i[f]);
        }
        for (f in b[d].X[d]) {
            c.La(d, b[d].X[d][f * 1]);
        }
        i = {};
        for (d = 0; d < c.getLevel() && b[d + 1] != this.tc; d++) {
            for (f in i) {
                g = i[f];
                if (g.contains(b[d].value, c.value) && !g.contains(b[d + 1].value, c.value)) {
                    b[d].La(d, g);
                    delete i[f];
                } else {
                    Bf(g, b[d + 1], c, d);
                }
            }
            for (f in b[d].X[d]) {
                g = b[d].X[d][f * 1];
                if (g.contains(b[d + 1].value, c.value)) {
                    Bf(g, b[d + 1], c, d);
                    i[f] = g;
                }
            }
        }
        for (f in i) {
            b[d].La(d, i[f]);
        }
        return c;
    };
    var Cf = function (a, b) {
        var c = [];
        var d = a.find(b.start, c);
        var f = a.find(b.end);
        if (!d || !f) {
            throw Error("Interval not found: " + b);
        }
        zf(b, d, f, function (a, c) {
            if (!a.X[c] || a.X[c][b.re] != b) {
                throw Error("Interval not found: " + b);
            }
            a.nf(c, b);
        });
        delete d.Kf[b.re];
        if (--d.Zh == 0) {
            a.Qf(d, c);
        }
        f = a.find(b.end, c);
        if (--f.Zh == 0) {
            a.Qf(f, c);
        }
    };
    wf.prototype.Qf = function (a, b) {
        var c;
        var d;
        var f;
        var g = {};
        for (c = a.getLevel(); c >= 0; c--) {
            for (d in g) {
                var i = (f = g[d]);
                for (var m = b[c + 1], p = b[c], s = c; m && m != p;) {
                    m.La(s, i);
                    m = m.links[s];
                }
                if (a.links[c] && f.contains(b[c].value, a.links[c].value)) {
                    b[c].La(c, f);
                    delete g[d];
                }
            }
            for (d in b[c].X[c]) {
                f = b[c].X[c][d * 1];
                if (!a.links[c] || !f.contains(b[c].value, a.links[c].value)) {
                    b[c].nf(c, f);
                    g[d] = f;
                }
            }
        }
        g = {};
        for (c = a.getLevel(); c >= 0; c--) {
            for (d in g) {
                i = f = g[d];
                m = a.links[c];
                p = a.links[c + 1];
                for (s = c; m && m != p;) {
                    m.La(s, i);
                    m = m.links[s];
                }
                if (a.links[c] && f.contains(b[c].value, a.links[c].value)) {
                    delete g[d];
                }
            }
            for (d in a.X[c]) {
                f = a.X[c][d * 1];
                if (a.links[c] && (b[c] == this.tc || !f.contains(b[c].value, a.links[c].value))) {
                    g[d] = f;
                }
            }
        }
        return rf.prototype.Qf.call(this, a, b);
    };
    wf.prototype.gl = function (a) {
        return new Df(a);
    };
    var zf = function (a, b, c, d) {
        for (var f = 0; b.links[f] && a.contains(b.value, b.links[f].value);) {
            while (f < b.getLevel() && b.links[f + 1] && a.contains(b.value, b.links[f + 1].value)) {
                f++;
            }
            if (b.links[f]) {
                d(b, f);
                b = b.links[f];
            }
        }
        while (b != c) {
            while (f > 0 && (!b.links[f] || !a.contains(b.value, b.links[f].value))) {
                f--;
            }
            d(b, f);
            b = b.links[f];
        }
    };
    var Bf = function (a, b, c, d) {
        while (b && b != c) {
            b.nf(d, a);
            b = b.links[d];
        }
    };
    var Df = function (a) {
        tf.call(this, a);
        this.Kf = {};
        this.X = [];
        this.Zh = 0;
    };
    Df.prototype = new tf(Math.random);
    Df.prototype.constructor = Df;
    Df.prototype.La = function (a, b) {
        if (!this.X[a]) {
            this.X[a] = {};
        }
        this.X[a][b.re] = b;
    };
    Df.prototype.nf = function (a, b) {
        if (this.X[a]) {
            delete this.X[a][b.re];
        }
    };
    var Ef = function (a, b, c) {
        vf.call(this, a, b);
        a = c || {};
        this.oa = a.id;
        if (a.priority != undefined) {
            this.Sf = a.priority;
        }
        this.Mj = a.namespace || "";
        this.visible = a.visible || false;
        this.pubsub = new goog$pubsub$PubSub();
    };
    Ef.prototype = new vf(0, 0);
    Ef.prototype.constructor = Ef;
    Ef.prototype.oa = "";
    Ef.prototype.Sf = 10;
    Ef.prototype.Mo = false;
    Ef.prototype.Jg = true;
    Ef.prototype.visible = false;
    Ef.prototype.pubsub = null;
    Ef.prototype.Mj = "";
    Ef.prototype.getId = function () {
        return this.oa;
    };
    Ef.prototype.dd = function () {
        return this.Sf;
    };
    var Ff = function (a, b) {
        if (a.start == b.start) {
            if (a.dd() == b.dd()) {
                return 0;
            } else if (a.dd() < b.dd()) {
                return -1;
            } else {
                return 1;
            }
        } else if (a.start < b.start) {
            return -1;
        } else {
            return 1;
        }
    };
    var Gf = function (a, b, c) {
        this.Jb = a;
        this.fn = b;
        this.Wm = c;
        this.pubsub = new goog$pubsub$PubSub();
        this.fh = new Ud(250);
        this.fh.addEventListener("tick", goog$bind(this.eb, this));
        this.fb = [];
        this.wb = [];
        this.Sb = new wf(Math.random);
    };
    Gf.prototype.Uj = false;
    Gf.prototype.ub = false;
    Gf.prototype.bh = false;
    Gf.prototype.zt = false;
    Gf.prototype.Zj = false;
    Gf.prototype.Yj = false;
    Gf.prototype.rf = null;
    Gf.prototype.pubsub = null;
    Gf.prototype.addCueRange = function (a) {
        var b = goog$array$clone(arguments);
        this.eb();
        b.forEach(function (a) {
            this.fb.push(a);
            Af(this.Sb, a);
            this.pubsub.c("onAdd", a);
        }, this);
        this.Uj = true;
        this.eb();
    };
    Gf.prototype.removeCueRange = function (a) {
        goog$array$clone(arguments).forEach(function (a) {
            a = this.fb.indexOf(a);
            if (a >= 0) {
                Hf(this, a);
            }
        }, this);
        this.eb();
    };
    var Hf = function (a, b) {
        var c = a.fb.splice(b, 1)[0];
        Cf(a.Sb, c);
        b = a.wb.indexOf(c);
        if (b >= 0) {
            a.wb.splice(b, 1);
        }
        a.pubsub.c("onRemove", c);
    };
    Gf.prototype.Eg = function () {
        this.Y = this.Jb() * 1000;
        this.bh = true;
        this.eb();
    };
    Gf.prototype.reset = function () {
        this.bh = this.ub = false;
        If(this);
        this.Wd();
        this.Ud = null;
    };
    Gf.prototype.Wd = function () {
        for (var a = this.fb.length - 1; a >= 0; a--) {
            Hf(this, a);
        }
        this.eb();
    };
    var Jf = function (a, b) {
        var c = [];
        if (!b.length) {
            return c;
        }
        b.sort(Ff);
        for (var d = 0; d < b.length; d++) {
            var f = b[d];
            if (f.Jg && a.wb.indexOf(f) == -1 && (!f.Mo || a.zt)) {
                a.wb.push(f);
                if (f.Mo) {
                    a.ub = true;
                    if (!a.Ud) {
                        c.push(["onLockBlockEnter", f]);
                    }
                    c.push(["onEnter", f]);
                    a.Ud = f;
                    break;
                } else {
                    c.push(["onEnter", f]);
                }
            }
        }
        return c;
    };
    Gf.prototype.eb = function () {
        this.Yj = true;
        if (!this.Zj) {
            for (var a = 3; this.Yj && a;) {
                this.Yj = false;
                this.Zj = true;
                if (this.bh && !this.ub) {
                    If(this);
                    var b = this.Jb() * 1000;
                    var c = [];
                    for (var d = 0; d < this.wb.length; d++) {
                        var f = this.wb[d];
                        if (f.Jg && !f.contains(b)) {
                            c.push(["onExit", f]);
                            this.wb.splice(d--, 1);
                        }
                    }
                    d = undefined;
                    if (this.Y < b) {
                        d = yf(this.Sb, this.Y, b);
                        if (this.Uj) {
                            d = d.concat(xf(this.Sb, b));
                        }
                    } else {
                        d = xf(this.Sb, b);
                    }
                    c = c.concat(Jf(this, d));
                    this.Y = b;
                    this.Uj = false;
                    if (!this.ub && this.Ud) {
                        c.unshift(["onLockBlockExit", this.Ud]);
                        this.Ud = null;
                        if (this.fn().Jj) {
                            this.Y = 2147483647;
                        }
                    }
                    if (this.fn().pf && !this.Wm() && (b = sf(this.Sb, this.Y))) {
                        this.rf = Vd(goog$bind(this.eb, this), b.value - this.Y);
                    }
                    for (d = 0; d < c.length; d++) {
                        b = c[d];
                        f = b[1];
                        if (b[0] == "onLockBlockExit" || b[0] == "onLockBlockEnter") {
                            this.pubsub.c.apply(this.pubsub, b);
                        } else {
                            f.pubsub.c.apply(f.pubsub, b);
                        }
                    }
                }
                this.Zj = false;
                a--;
            }
        }
    };
    var If = function (a) {
        if (a.rf != null) {
            goog$Timer$defaultTimerObject.clearTimeout(a.rf);
            a.rf = null;
        }
    };
    var Kf = function () {
        this.Ob = {};
    };
    Kf.prototype.Ho = null;
    Kf.prototype.Xk = null;
    Kf.prototype.Go = 0;
    Kf.prototype.width = 0;
    Kf.prototype.height = 0;
    Kf.prototype.fa = 0;
    Kf.prototype.rows = 0;
    Kf.prototype.frames = 0;
    Kf.prototype.Yk = null;
    Kf.prototype.ae = function (a) {
        return !!this.Ob[a];
    };
    Kf.prototype.getUrl = function (a) {
        var b = this.Ho;
        var b = b.replace("$N", this.Xk);
        var b = b.replace("$L", this.Go.toString());
        var b = b.replace("$M", a.toString());
        if (this.Yk) {
            b = yt$uri$appendQueryData(b, {
                sigh: this.Yk
            });
        }
        return b;
    };
    Kf.prototype.kc = function (a) {
        var b = Math.floor(a / (this.fa * this.rows));
        var c = this.fa * this.rows;
        var d = a % c;
        var a = d % this.fa;
        var d = Math.floor(d / this.fa);
        var f = this.rows;
        var g = this.frames - c * b;
        if (g < c) {
            f = Math.ceil(g / this.fa);
        }
        return {
            url: this.getUrl(b),
            Kt: a,
            fa: this.fa,
            row: d,
            rows: f,
            $o: this.width * this.fa,
            Zo: this.height * f
        };
    };
    var Lf = function (a) {
        this.ve = [];
        this.ki = {};
        for (var a = a.split("|"), b = a[0], c = 1, d, f; c < a.length; c++) {
            d = a[c].split("#");
            f = new Kf();
            f.Go = c - 1;
            f.width = parseInt(d[0], 10);
            f.height = parseInt(d[1], 10);
            f.frames = parseInt(d[2], 10);
            f.fa = parseInt(d[3], 10);
            f.rows = parseInt(d[4], 10);
            f.Ho = b;
            f.Xk = d[6];
            f.Yk = d[7];
            this.ve.push(f);
        }
        if (this.ve.length > 1 && this.getLevel(0).Xk.indexOf("default") != -1) {
            this.ve.splice(0, 1);
        }
    };
    Lf.prototype.ve = null;
    Lf.prototype.ki = null;
    Lf.prototype.getUrl = function (a, b) {
        return this.getLevel(a).getUrl(b);
    };
    Lf.prototype.kc = function (a, b) {
        var c = this.getLevel(a);
        if (c.ae(Math.floor(b / (c.fa * c.rows)))) {
            return c.kc(b);
        } else {
            return null;
        }
    };
    Lf.prototype.getLevel = function (a) {
        return this.ve[a];
    };
    var Mf = function (a, b) {
        var c = a.ki[b];
        if (c) {
            return c;
        }
        for (var c = a.ve.length, d = 0; d < c; d++) {
            if (a.getLevel(d).width >= b) {
                return (a.ki[b] = d);
            }
        }
        a.ki[b] = c - 1;
        return c - 1;
    };
    var Nf = {
        0: "MONO",
        1: "LEFT_RIGHT",
        2: "RIGHT_LEFT",
        3: "TOP_BOTTOM",
        4: "BOTTOM_TOP"
    };
    var Of = ["corp.google.com", "youtube.com"];
    var Pf =
        "www.google.com/aclk,www.google.com/pagead/conversion,googleadservices.com/aclk,googleadservices.com/pagead/conversion,googleads.g.doubleclick.net/aclk,googleads.g.doubleclick.net/pagead/conversion".split(
            ","
        );
    var Qf = function (a, b) {
        return RegExp(
            "^https?://([a-z0-9-]{1,63}\\.)*(" + b.join("|").replace(/\./g, ".") + ")(:[0-9]+)?([/?#]|$)",
            "i"
        ).test(a);
    };
    var Rf = function () {
        this.ra = new goog$pubsub$PubSub();
    };
    goog$inherits(Rf, Sc);
    Rf.prototype.e = function (a, b, c) {
        if (this.Tc) {
            R(
                goog$debug$Logger$Level$SEVERE,
                "ObjectMixin",
                "Subscribing to " + a + " on a disposed object.",
                undefined
            );
        } else {
            this.ra.e(a, b, c);
        }
    };
    Rf.prototype.H = function (a, b, c) {
        if (this.Tc) {
            R(
                goog$debug$Logger$Level$SEVERE,
                "ObjectMixin",
                "Unsubscribing to " + a + " on a disposed object.",
                undefined
            );
        } else {
            this.ra.H(a, b, c);
        }
    };
    Rf.prototype.c = function (a, b) {
        if (this.Tc) {
            R(goog$debug$Logger$Level$SEVERE, "ObjectMixin", "Publishing " + a + " on a disposed object.", undefined);
        } else {
            this.ra.c.apply(this.ra, arguments);
        }
    };
    Rf.prototype.r = function () {
        Rf.j.r.call(this);
        Uc(this.ra);
    };
    var Sf = function (a, b) {
        this.state = a;
        this.Zm = b;
    };
    var Tf = function () {};
    Tf.prototype.Jj = false;
    Tf.prototype.yi = false;
    Tf.prototype.pf = false;
    Tf.prototype.Oj = false;
    var Uf = new Tf();
    Uf.Jj = true;
    Uf.pf = true;
    Uf.yi = true;
    var Vf = new Tf();
    Vf.yi = true;
    var Wf = new Tf();
    Wf.pf = true;
    var Xf = new Tf();
    var Yf = new Tf();
    Yf.Oj = true;
    var Zf = {
        Yv: "audio",
        $w: "play_pause",
        mx: "seek"
    };
    var $f = function (a, b) {
        this.Xf = a;
        this.op = b;
    };
    $f.prototype.getKey = function () {
        return this.Xf;
    };
    $f.prototype.getValue = function () {
        return this.op;
    };
    $f.prototype.ga = function () {
        return new $f(this.Xf, this.op);
    };
    var ag = function (a) {
        this.Cb = [];
        if (a) {
            a: {
                var b;
                var c;
                if (a instanceof ag) {
                    b = a.Ht();
                    c = a.It();
                    if (a.te() <= 0) {
                        var a = this.Cb;
                        for (var d = 0; d < b.length; d++) {
                            a.push(new $f(b[d], c[d]));
                        }
                        break a;
                    }
                } else {
                    b = [];
                    c = 0;
                    for (d in a) {
                        b[c++] = d;
                    }
                    c = cb(a);
                }
                for (d = 0; d < b.length; d++) {
                    this.Bf(b[d], c[d]);
                }
            }
        }
    };
    ag.prototype.Bf = function (a, b) {
        var c = this.Cb;
        c.push(new $f(a, b));
        for (var c = c.length - 1, d = this.Cb, f = d[c]; c > 0;) {
            var g = (c - 1) >> 1;
            if (d[g].getKey() > f.getKey()) {
                d[c] = d[g];
                c = g;
            } else {
                break;
            }
        }
        d[c] = f;
    };
    ag.prototype.remove = function () {
        var a = this.Cb;
        var b = a.length;
        var c = a[0];
        if (!(b <= 0)) {
            if (b == 1) {
                goog$array$clear(a);
            } else {
                a[0] = a.pop();
                for (var a = 0, b = this.Cb, d = b.length, f = b[a]; a < d >> 1;) {
                    var g = a * 2 + 1;
                    var i = a * 2 + 2;
                    var g = i < d && b[i].getKey() < b[g].getKey() ? i : g;
                    if (b[g].getKey() > f.getKey()) {
                        break;
                    }
                    b[a] = b[g];
                    a = g;
                }
                b[a] = f;
            }
            return c.getValue();
        }
    };
    ag.prototype.It = function () {
        var a = this.Cb;
        var b = [];
        for (var c = a.length, d = 0; d < c; d++) {
            b.push(a[d].getValue());
        }
        return b;
    };
    ag.prototype.Ht = function () {
        var a = this.Cb;
        var b = [];
        for (var c = a.length, d = 0; d < c; d++) {
            b.push(a[d].getKey());
        }
        return b;
    };
    ag.prototype.ga = function () {
        return new ag(this);
    };
    ag.prototype.te = function () {
        return this.Cb.length;
    };
    ag.prototype.isEmpty = function () {
        return this.Cb.length == 0;
    };
    ag.prototype.clear = function () {
        goog$array$clear(this.Cb);
    };
    var bg = function () {
        ag.call(this);
    };
    goog$inherits(bg, ag);
    var cg = function (a) {
        this.Wc = a;
        this.zk = new bg();
        this.Un = {};
        this.$ = new goog$pubsub$PubSub();
    };
    cg.prototype.zh = false;
    cg.prototype.Qm = "l";
    cg.prototype.kc = function (a, b) {
        for (var c = Mf(this.Wc, b), d; c >= 0; c--) {
            if ((d = this.Wc.kc(c, a))) {
                return d;
            }
        }
        return this.Wc.getLevel(0).kc(a);
    };
    var dg = function (a) {
        if (!a.zh) {
            if (a.zk.isEmpty()) {
                a.zh = false;
            } else {
                a.zh = true;
                var b = a.zk.remove();
                var c = new Image();
                c.src = a.Wc.getUrl(b.Zn, b.$n);
                c.onload = goog$bind(a.Lt, a, b.Zn, b.$n);
            }
        }
    };
    cg.prototype.Lt = function (a, b) {
        this.zh = false;
        var c = this.Wc.getLevel(a);
        c.Ob[b] = true;
        dg(this);
        var d;
        var f = c.fa * c.rows;
        d = b * f;
        c = Math.min(d + f, c.frames - 1);
        d = [d, c];
        this.$.c(this.Qm, d[0], d[1]);
    };
    goog$debug$Console$autoInstall();
    var yt$player$logger = goog$debug$LogManager$getLogger("yt.player.logger");
    yt$player$logger.Bi(goog$debug$Logger$Level$INFO);
    var hg = function (a, b, c, d, f) {
        this.ak = a;
        b = b.replace(/&quot;/g, '"');
        this.pi = unescape(b);
        a = fg[c].split("x");
        this.size = new goog$math$Size(parseInt(a[0], 10), parseInt(a[1], 10));
        this.Nc = gg[c];
        this.Hd = c;
        this.zc = d;
        this.Dt = !!f;
    };
    hg.prototype.ak = "";
    hg.prototype.pi = "";
    hg.prototype.Nc = "";
    hg.prototype.Hd = "";
    hg.prototype.size = null;
    hg.prototype.toString = function () {
        return this.Nc + ": " + this.pi;
    };
    var ig = function () {
        return navigator && navigator.userAgent && /android 2\.2/.test(navigator.userAgent.toLowerCase());
    };
    var jg = {
        'video/mp4; codecs="avc1.42001E, mp4a.40.2"': true
    };
    var kg = function () {
        if (ig()) {
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
    var fg = {
        light: "320x240",
        small: "320x240",
        medium: "640x360",
        large: "854x480",
        hd720: "1280x720",
        hd1080: "1920x1080",
        highres: "2048x1536"
    };
    var gg = {
        medium: "360p",
        large: "480p",
        hd720: "720p",
        hd1080: "1080p",
        highres: "Original"
    };
    var lg = function (a, b) {
        var c = [];
        for (var d = 0; d < a.length; ++d) {
            var f = a[d];
            if (f.Dt == b) {
                c.push(f);
            }
        }
        return c;
    };
    var mg = function (a, b) {
        var c = !!b;
        var d = [];
        for (var f = 0, g = a.length; f < g; ++f) {
            var i = a[f];
            d.push(new hg(i.url, i.type, i.quality, i.itag, i.stereo3d));
        }
        if (ig()) {
            c = [];
            f = 0;
            for (g = d.length; f < g; f++) {
                if (jg[d[f].pi]) {
                    c.push(d[f]);
                }
            }
            d = c;
        } else {
            f = lg(d, c);
            d = !f.length && c ? lg(d, false) : f;
            if (kg()) {
                c = [];
                f = [];
                g = document.createElement("video");
                for (i = 0; i < d.length; i++) {
                    var m = g.canPlayType(d[i].pi);
                    yt$player$logger.info("Entry in format map: " + d[i].toString() + " | CanPlay: " + m);
                    if (m && m != "no" && f.indexOf(d[i].Nc) == -1) {
                        f.push(d[i].Nc);
                        c.push(d[i]);
                        yt$player$logger.info("Adding " + d[i].toString() + " to supported formats.");
                    }
                }
                d = c;
            } else {
                d = [];
            }
        }
        return d;
    };
    var ng = function (a, b) {
        var c = 0;
        var d = 0;
        if (ca(a)) {
            yt$player$logger.info("The video container size was null");
        } else {
            c = a.width;
            d = a.height;
        }
        var f = 16 / 9;
        if (c > Math.round(f * d)) {
            c = Math.round(f * d);
        }
        for (
            var c = c * d, g = null, d = 0, f = b.length;
            d < f && !((g = b[d]), g.size.width * g.size.height * (g.Hd == "medium" ? 0.26 : 0.85) < c);
            d++
        );
        return g;
    };
    var og = function (a) {
        this.ra = new goog$pubsub$PubSub();
        this.Ae = [];
        this.Il = [];
        this.Be = {};
        this.yj = {};
        this.Id(a);
    };
    goog$inherits(og, Rf);
    var pg = {
        Pw: 1,
        Qw: 2,
        Rw: 3
    };
    var qg = /\/img\/watermark\/youtube_(hd_)?watermark(-vfl\S{6})?.png$/;
    og.prototype.Z = false;
    og.prototype.Gl = true;
    og.prototype.Jl = false;
    og.prototype.Kl = true;
    og.prototype.Hi = false;
    og.prototype.Gi = 1;
    og.prototype.Ul = false;
    og.prototype.Pl = false;
    og.prototype.Rl = 3;
    og.prototype.Ti = "";
    og.prototype.Vl = false;
    og.prototype.Cc = 0;
    og.prototype.lb = false;
    og.prototype.Dl = true;
    og.prototype.El = false;
    og.prototype.Ba = 0;
    og.prototype.wd = 0;
    og.prototype.Fl = false;
    og.prototype.Fd = false;
    og.prototype.fg = false;
    og.prototype.R = 0;
    og.prototype.Ag = false;
    og.prototype.Kc = false;
    og.prototype.Yi = 1;
    og.prototype.Id = function (a) {
        var b = a || {};
        this.Jl = b.iv_allow_external_links == "1";
        this.Kl = b.iv_new_window != "0";
        this.Hi = b.infringe == "1" || b.muted == "1";
        this.author = b.author;
        this.Pl = b.cc_asr == "1";
        this.Ti = b.ttsurl;
        this.gg = b.csi_page_type;
        this.Dg = b.sw;
        this.yl = b.t;
        this.Dl = b.no_get_video_log != "1";
        this.El = b.tmi == "1";
        this.Dp = b.iid == "1";
        this.Am = b.iurlmaxres;
        this.yq = b.oauth_token;
        this.ig = b.ptchn;
        this.Al = b.oid;
        this.Ac = b.ptk;
        this.Bl = b.pltype;
        this.pa = b.plid;
        this.Gb = b.hbid;
        this.Ib = b.list;
        this.$l = b.pyv_beacon_url;
        this.yp = b.sdetail;
        this.zp = b.sourceid;
        this.Bm = b.iurlsd;
        this.Mi = this.Mi || b.vq;
        this.Lp = b.approx_threed_layout || 0;
        this.Ag = b.threed_converted == "1";
        this.Cm = b.iurl;
        this.Fd = b.sendtmp == "1";
        this.fg = !!this.Dg || this.Fd;
        this.R = rg(this, b.start);
        this.Hb = b.subscribed;
        this.title = b.title;
        this.m = b.video_id;
        sg(this, b.watermark);
        this.hj = b.ypc_buy_url;
        this.Zl = b.ypc_cart_id;
        this.Pp = b.ypc_video_rental_bar_text;
        this.Wl = b.ypc_preview;
        this.Qp = b.ypc_price_string;
        if (b.ad3_module || b.ad_module) {
            if (b.allow_html5_ads == "1") {
                this.Z = true;
                if (b.ad_preroll == "1") {
                    this.Il.push("ad");
                }
            } else if (b.supported_without_ads != "1") {
                this.Vl = true;
            }
        }
        if (b.allow_embed) {
            this.Gl = b.allow_embed == "1";
        }
        if (b.cc_load_policy) {
            this.Rl = tg(b.cc_load_policy, 2);
        }
        if (b.idpj) {
            this.Cc = ya(b.idpj);
        }
        if (b.iv_load_policy) {
            this.hm = tg(b.iv_load_policy, this.hm);
        }
        if (b.url_encoded_fmt_stream_map) {
            this.Ae = ug(b.url_encoded_fmt_stream_map);
        }
        if (b.keywords) {
            this.yj = vg(b.keywords);
        }
        if (b.length_seconds) {
            this.Ba = ya(b.length_seconds);
        }
        if (b.ldpj) {
            this.wd = ya(b.ldpj);
        }
        if (b.loudness) {
            this.zj = b.loudness;
            this.Gi = this.zj > -15 && this.zj < 0 ? Math.pow(10, (-18 - this.zj) / 20) : 1;
        }
        if (b.pyv_billable_url && Qf(b.pyv_billable_url, Pf)) {
            this.Fi = b.pyv_billable_url;
        }
        if (b.pyv_conv_url && Qf(b.pyv_conv_url, Pf)) {
            this.am = b.pyv_conv_url;
        }
        if (b.rvs) {
            this.tq = ug(b.rvs);
        }
        if (b.storyboard_spec) {
            this.jj = new Lf(b.storyboard_spec);
            this.dm = new cg(this.jj);
        }
        if (b.threed_module && !b.threed_converted) {
            this.Pe = b.threed_module;
            this.Cg = 6;
        }
        if (b.track_embed == "1" || b.tk) {
            this.Fl = true;
        }
        if (b.watch_ajax_token) {
            yt$net$ajax$tokenMap_.watch_actions_ajax = b.watch_ajax_token;
        }
        this.gj = {};
        goog$array$forEach(
            "baseUrl,vid,uid,focEnabled,rmktEnabled,playerStyle,eventLabel,convViewUrl".split(","),
            function (a) {
                this.gj[a] = b[a];
            },
            this
        );
        this.gm = true;
        this.Be = b;
    };
    var wg = function (a) {
        var b = "";
        var c = {};
        if (a.format) {
            b = a.format.ak;
            if (a.Ac && a.ig) {
                c.ptk = a.Ac;
                c.oid = a.Al;
                c.ptchn = a.ig;
                c.pltype = a.Bl;
            }
        }
        return yt$uri$appendQueryData(b, c);
    };
    og.prototype.sg = function () {
        var a = {};
        if (this.format) {
            a.fmt = this.format.zc;
        }
        if (this.Pe) {
            a.threed = this.Cg;
        }
        a.plid = this.pa;
        a.list = this.Ib;
        if (this.m) {
            a.videoId = this.m;
        }
        if (this.Hi) {
            a.infringe = 1;
        }
        if (this.lb) {
            a.splay = 1;
        }
        if (this.Gb) {
            a.hbid = this.Gb;
        }
        return a;
    };
    var xg = function (a, b) {
        if (!goog$isString(a.yj[b])) {
            return null;
        } else {
            return a.yj[b];
        }
    };
    var yg = function (a, b) {
        yt$net$ajax$send(b, {
            format: "RAW",
            method: "GET",
            lf: a,
            Rb: a.Yt
        });
    };
    og.prototype.Yt = function (a) {
        a = yt$uri$parseQueryData(a.responseText);
        if (a.status == "fail") {
            this.c("onStatusFail", a);
        } else {
            this.Id(a);
            this.c("videoinfo", a);
        }
    };
    var tg = function (a, b) {
        var c = parseInt(a, 10);
        var d;
        a: {
            for (d in pg) {
                if (pg[d] == c) {
                    d = true;
                    break a;
                }
            }
            d = false;
        }
        if (d) {
            return c;
        } else {
            return b;
        }
    };
    var rg = function (a, b) {
        b = Number(b);
        if (isNaN(b)) {
            return a.R || 0;
        } else {
            return b;
        }
    };
    var ug = function (a) {
        a = a.split(",");
        return (a = a.map(function (a) {
            return yt$uri$parseQueryData(a);
        }));
    };
    var vg = function (a) {
        var a = Ze(a, ",");
        var b = {};
        var c;
        for (c in a) {
            b[c] = a[c] ? a[c] : true;
        }
        return b;
    };
    var sg = function (a, b) {
        if (b) {
            var c = b.split(",");
            if (c.length >= 2) {
                a.Bj = c[1];
                a.Fn = c[0];
            }
        }
    };
    var zg = function (a, b) {
        return !!a.Be[b];
    };
    var Ag = function (a, b) {
        this.type = a || "";
        this.id = b || "";
    };
    Ag.prototype.toString = function () {
        return this.type + this.id;
    };
    var Fg = function (a) {
        this.na = [];
        this.Vb = [];
        this.ba = Math.max(0, a.index || 0);
        this.loop = !!a.loop;
        this.R = a.startSeconds || 0;
        this.ao = a.mob == "1";
        if (a.video_id) {
            this.na[this.ba] = new og(a);
        }
        if (a.api) {
            if (typeof a.api == "string" && a.api.length == 16) {
                a.list = "PL" + a.api;
            } else {
                a.playlist = a.api;
            }
        }
        if (a.list) {
            switch (a.listType) {
                case "user_uploads":
                    Bg(this, a.list);
                    break;
                case "user_favorites":
                    Cg(this, a.list);
                    break;
                case "search":
                    Dg(this, a.list);
                    break;
                default:
                    this.Xd = new Ag(a.list.substr(0, 2), a.list.substr(2));
                    if (!this.Ya) {
                        Eg(this, "/list_ajax?style=json&action_get_list=1", {
                            list: this.Xd
                        });
                    }
            }
        } else if (a.playlist) {
            var b = a.playlist.toString().split(",");
            if (this.ba > 0) {
                this.na = [];
            }
            goog$array$forEach(
                b,
                function (a) {
                    if (a) {
                        this.na.push(
                            new og({
                                video_id: a
                            })
                        );
                    }
                },
                this
            );
            this.yk = this.na.length;
            this.Ob = true;
        }
        this.setShuffle(!!a.shuffle);
        if (a.suggestedQuality) {
            this.Rm = a.suggestedQuality;
        }
    };
    Fg.prototype.loop = false;
    Fg.prototype.R = 0;
    Fg.prototype.ap = false;
    Fg.prototype.ba = 0;
    Fg.prototype.yk = 0;
    Fg.prototype.ao = false;
    Fg.prototype.Ob = false;
    Fg.prototype.Ya = false;
    Fg.prototype.Tb = function () {
        if (++this.ba >= this.na.length) {
            if (this.loop) {
                this.ba = 0;
            } else {
                return null;
            }
        }
        Gg(this, this.ba);
        return Hg(this, this.ba);
    };
    var Ig = function (a) {
        if (--a.ba < 0) {
            if (a.loop) {
                a.ba = a.na.length - 1;
            } else {
                return null;
            }
        }
        Gg(a, a.ba);
        return Hg(a, a.ba);
    };
    var Hg = function (a, b) {
        var c = b != undefined ? b : a.ba;
        if (c in a.na) {
            return a.na[a.Vb[c]];
        } else {
            return null;
        }
    };
    Fg.prototype.setShuffle = function (a) {
        this.ap = a;
        this.Vb = [];
        for (a = 0; a < this.na.length; a++) {
            this.Vb.push(a);
        }
        if (this.ap) {
            for (a = 1; a < this.Vb.length; a++) {
                var b = Math.round(Math.random() * (this.Vb.length - 1));
                if (b != 0 && b != a) {
                    var c = this.Vb[a];
                    this.Vb[a] = this.Vb[b];
                    this.Vb[b] = c;
                }
            }
        }
    };
    var Gg = function (a, b) {
        a.ba = Oc(b, 0, a.na.length - 1);
        a.R = 0;
    };
    Fg.prototype.getLength = function () {
        return this.yk;
    };
    var Bg = function (a, b) {
        if (!a.Ya) {
            a.Xd = new Ag("UU", "PLAYER_" + b);
            Eg(a, "/list_ajax?style=json&action_get_user_uploads_by_user=1", {
                username: b
            });
        }
    };
    var Cg = function (a, b) {
        if (!a.Ya) {
            a.Xd = new Ag("FL", "PLAYER_" + b);
            Eg(a, "/list_ajax?style=json&action_get_favorited_by_user=1", {
                username: b
            });
        }
    };
    var Dg = function (a, b) {
        if (!a.Ya) {
            a.Xd = new Ag("SR", b);
            var c = {
                search_query: b
            };
            if (a.ao) {
                c.mob = "1";
            }
            Eg(a, "/search_ajax?style=json&embeddable=1", c);
        }
    };
    var Eg = function (a, b, c) {
        yt$net$ajax$send(yt$uri$appendQueryData(b, c), {
            format: "JSON",
            Rb: function (a, b) {
                if (b.video && b.video.length) {
                    this.na = [];
                    goog$array$forEach(
                        b.video,
                        function (a) {
                            if (a) {
                                a.video_id = a.encrypted_id;
                                this.na.push(new og(a));
                            }
                        },
                        this
                    );
                    this.yk = this.na.length;
                    this.setShuffle(false);
                    this.Ya = false;
                    this.Ob = true;
                    if (this.Xj) {
                        this.Xj();
                    }
                }
            },
            lf: a
        });
    };
    var goog$storage$mechanism$Mechanism = function () {};
    var goog$storage$mechanism$IterableMechanism = function () {};
    goog$inherits(goog$storage$mechanism$IterableMechanism, goog$storage$mechanism$Mechanism);
    goog$storage$mechanism$IterableMechanism.prototype.te = function () {
        var a = 0;
        goog$iter$forEach(this.md(true), function (b) {
            goog$asserts$assertString(b);
            a++;
        });
        return a;
    };
    goog$storage$mechanism$IterableMechanism.prototype.clear = function () {
        var a = goog$iter$toArray(this.md(true));
        var b = this;
        goog$array$forEach(a, function (a) {
            b.remove(a);
        });
    };
    var goog$storage$mechanism$HTML5WebStorage = function (a) {
        this.da = a;
    };
    goog$inherits(goog$storage$mechanism$HTML5WebStorage, goog$storage$mechanism$IterableMechanism);
    var Mg = function (a) {
        try {
            return !!a.da && !!a.da.getItem;
        } catch (b) {}
        return false;
    };
    goog$storage$mechanism$HTML5WebStorage.prototype.set = function (a, b) {
        try {
            this.da.setItem(a, b);
        } catch (c) {
            throw "Storage mechanism: Quota exceeded";
        }
    };
    goog$storage$mechanism$HTML5WebStorage.prototype.get = function (a) {
        a = this.da.getItem(a);
        if (goog$isString(a) || ca(a)) {
            return a;
        }
        throw "Storage mechanism: Invalid value was encountered";
    };
    goog$storage$mechanism$HTML5WebStorage.prototype.remove = function (a) {
        this.da.removeItem(a);
    };
    goog$storage$mechanism$HTML5WebStorage.prototype.te = function () {
        return this.da.length;
    };
    goog$storage$mechanism$HTML5WebStorage.prototype.md = function (a) {
        var b = 0;
        var c = new goog$iter$Iterator();
        var d = this;
        c.next = function () {
            if (b >= d.te()) {
                throw goog$iter$StopIteration;
            }
            var c = goog$asserts$assertString(d.da.key(b++));
            if (a) {
                return c;
            }
            c = d.da.getItem(c);
            if (goog$isString(c)) {
                return c;
            }
            throw "Storage mechanism: Invalid value was encountered";
        };
        return c;
    };
    goog$storage$mechanism$HTML5WebStorage.prototype.clear = function () {
        this.da.clear();
    };
    var goog$storage$mechanism$HTML5LocalStorage = function () {
        var a = null;
        try {
            a = window.localStorage || null;
        } catch (b) {}
        this.da = a;
    };
    goog$inherits(goog$storage$mechanism$HTML5LocalStorage, goog$storage$mechanism$HTML5WebStorage);
    var Og = function (a, b) {
        this.xe = a;
        this.Xb = b + "::";
    };
    goog$inherits(Og, goog$storage$mechanism$IterableMechanism);
    Og.prototype.xe = null;
    Og.prototype.Xb = "";
    Og.prototype.set = function (a, b) {
        this.xe.set(this.Xb + a, b);
    };
    Og.prototype.get = function (a) {
        return this.xe.get(this.Xb + a);
    };
    Og.prototype.remove = function (a) {
        this.xe.remove(this.Xb + a);
    };
    Og.prototype.md = function (a) {
        var b = this.xe.md(true);
        var c = new goog$iter$Iterator();
        var d = this;
        c.next = function () {
            for (var c = b.next(); c.substr(0, d.Xb.length) != d.Xb;) {
                c = b.next();
            }
            if (a) {
                return c.substr(d.Xb.length);
            } else {
                return d.xe.get(c);
            }
        };
        return c;
    };
    var Pg = function (a) {
        this.cg = a;
        this.np = new Oe();
    };
    Pg.prototype.cg = null;
    Pg.prototype.np = null;
    Pg.prototype.set = function (a, b) {
        if (b !== undefined) {
            this.cg.set(a, goog$json$Serializer$serialize(this.np, b));
        } else {
            this.cg.remove(a);
        }
    };
    Pg.prototype.get = function (a) {
        a = this.cg.get(a);
        if (!ca(a)) {
            try {
                return goog$json$parse(a);
            } catch (b) {
                throw "Storage: Invalid value was encountered";
            }
        }
    };
    Pg.prototype.remove = function (a) {
        this.cg.remove(a);
    };
    var V = function (a) {
        this.pubsub = new goog$pubsub$PubSub();
        this.s = a;
        if (this.yo) {
            var a = "yt-html5-player-modules::" + this.yo;
            var b = new goog$storage$mechanism$HTML5LocalStorage();
            if ((a = Mg(b) ? (a ? new Og(b, a) : b) : null)) {
                this.da = new Pg(a);
            }
        }
    };
    V.prototype.pubsub = null;
    V.prototype.W = "";
    V.prototype.le = "";
    V.prototype.loaded = false;
    V.prototype.addCueRange = function (a) {
        var b = goog$array$clone(arguments);
        var c = goog$bind(this.rb, this);
        var d = goog$bind(this.lc, this);
        b.forEach(function (a) {
            a.Mj = this.W;
            a.pubsub.e("onEnter", c);
            a.pubsub.e("onExit", d);
        }, this);
        this.pubsub.c("command_add_cuerange", b);
    };
    V.prototype.removeCueRange = function (a) {
        this.pubsub.c("command_remove_cuerange", goog$array$clone(arguments));
    };
    V.prototype.Wd = function () {
        this.pubsub.c("command_remove_cuerange_all", this.W);
    };
    var Qg = function (a) {
        a.pubsub.c("command_preroll_ready", a.W);
    };
    V.prototype.appendToVideoContent = function (a) {
        goog$dom$classes$add(a, this.W);
        this.s.appendToVideoContent(a);
    };
    V.prototype.appendAboveVideoControls = function (a) {
        goog$dom$classes$add(a, this.W);
        this.s.appendAboveVideoControls(a);
    };
    var Rg = function (a) {
        a.pubsub.c("command_show_dialog_area");
    };
    var Sg = function (a) {
        a.pubsub.c("command_hide_all_dialogs");
    };
    V.prototype.create = function () {
        goog$dom$classes$add(this.s.getRootNode(), this.W + "-created");
    };
    V.prototype.destroy = function () {
        goog$dom$classes$remove(this.s.getRootNode(), this.W + "-created");
    };
    V.prototype.load = function () {
        goog$dom$classes$add(this.s.getRootNode(), this.W + "-loaded");
    };
    V.prototype.unload = function () {
        goog$dom$classes$remove(this.s.getRootNode(), this.W + "-loaded");
    };
    V.prototype.rb = function () {};
    V.prototype.lc = function () {};
    V.prototype.kh = function () {};
    V.prototype.log = function (a) {
        this.pubsub.c("command_log", this.le, a);
    };
    var Tg = function (a, b, c) {
        var d = {};
        var f;
        for (f in b) {
            d[a.W + "_" + f] = b[f];
        }
        var b = {};
        var g;
        for (g in c) {
            b[a.W + "_" + g] = c[g];
        }
        a.pubsub.c("command_log_timing", d, b);
    };
    var Ug = function (a, b) {
        if (!a.da) {
            return null;
        }
        var c;
        try {
            c = a.da.get(b);
        } catch (d) {
            if (a.da) {
                a.da.remove(b);
            }
        }
        return c;
    };
    var Vg = function (a, b, c) {
        if (a.da) {
            try {
                a.da.set(b, c);
            } catch (d) {}
        }
    };
    var Wg = function (a) {
        a.pubsub.c("command_enable_controls", ["seek"]);
    };
    var Xg = function (a) {
        a.pubsub.c("command_stop_redirect_controls");
    };
    V.prototype.playVideo = function () {
        this.pubsub.c("command_play");
    };
    V.prototype.pauseVideo = function () {
        this.pubsub.c("command_pause");
    };
    var Yg = function (a, b) {
        a.pubsub.c("command_redirected_show_is_playing", b);
    };
    V.prototype.zb = function () {
        return false;
    };
    var Zg = function () {};
    var $g = new Zg();
    var ah = function () {
        var a = document.createElement("video");
        w(a, $g);
        yt$events$listen(a, "loadeddata", goog$bind(a.mu, a));
        return a;
    };
    Zg.prototype.hasSrc = function () {
        return !!this.getSrc();
    };
    Zg.prototype.getSrc = function () {
        return this.currentSrc;
    };
    Zg.prototype.activate = function (a) {
        a = a || "";
        if (!this.src || a != "") {
            if (a) {
                this.src = a;
            }
            this.load();
        }
    };
    Zg.prototype.seekTo = function (a) {
        if (this.readyState != 0) {
            this.currentTime = a;
        }
    };
    Zg.prototype.getType = function () {
        return this.type;
    };
    Zg.prototype.getDuration = function () {
        return this.duration || 0;
    };
    Zg.prototype.getCurrentTime = function () {
        return this.currentTime;
    };
    Zg.prototype.isPaused = function () {
        return this.paused || this.ended;
    };
    Zg.prototype.togglePlayPause = function () {
        if (this.isPaused()) {
            this.playVideo();
        } else {
            this.pauseVideo();
        }
    };
    Zg.prototype.playVideo = function () {
        if (this.ended) {
            this.currentTime = 0;
        }
        if (!this.currentSrc || !this.hasAttribute("src")) {
            this.setAttribute("src", this.ul || "");
            this.ul = null;
            this.load();
        }
        this.play();
    };
    Zg.prototype.pauseVideo = function () {
        this.pause();
    };
    Zg.prototype.stopVideo = function () {
        if (this.currentSrc) {
            this.ul = this.currentSrc;
            goog$dom$removeChildren(this);
            this.removeAttribute("src");
            this.load();
        }
    };
    Zg.prototype.setVolume = function (a, b) {
        this.volume = a / 100;
        this.muted = b;
    };
    Zg.prototype.getVolume = function () {
        return this.volume * 100;
    };
    Zg.prototype.isMuted = function () {
        return this.muted;
    };
    Zg.prototype.mute = function () {
        this.muted = true;
    };
    Zg.prototype.unMute = function () {
        this.muted = false;
    };
    Zg.prototype.setPlaybackRate = function (a) {
        this.playbackRate = this.defaultPlaybackRate = a;
    };
    Zg.prototype.getBufferedTimeRangeIndex = function () {
        for (var a = this.buffered, b = this.getCurrentTime(), c = 0; c < a.length; c++) {
            if (a.start(c) <= b && b <= a.end(c)) {
                return c;
            }
        }
        return 0;
    };
    Zg.prototype.inUnbufferedArea = function () {
        var a = this.buffered;
        if (!a || !a.length) {
            return true;
        }
        var b = this.getBufferedTimeRangeIndex();
        if (b > 0) {
            return false;
        }
        var c = this.getCurrentTime();
        return a.start(b) > c || a.end(b) < c;
    };
    Zg.prototype.mu = function () {
        if (this.hasAttribute("controls")) {
            this.setAttribute("controls", "true");
        }
    };
    var bh = {
        detailpage: {
            xg: true
        }
    };
    bh.embedded = {
        wg: se("fullScreenEnabled", document),
        Cj: true
    };
    var ch = function (a) {
        this.Mb = [];
        this.Id(a);
    };
    ch.prototype.vg = true;
    ch.prototype.wg = true;
    ch.prototype.Vi = false;
    ch.prototype.autoplay = false;
    ch.prototype.Db = "/";
    ch.prototype.Vj = 1;
    ch.prototype.Li = false;
    ch.prototype.Je = false;
    ch.prototype.Ed = false;
    ch.prototype.loop = false;
    ch.prototype.lg = false;
    ch.prototype.Sg = "";
    ch.prototype.nj = false;
    ch.prototype.Ge = false;
    ch.prototype.Ua = true;
    ch.prototype.hg = true;
    ch.prototype.Lj = true;
    ch.prototype.xg = false;
    ch.prototype.Cj = false;
    ch.prototype.Wi = false;
    ch.prototype.Wj = false;
    ch.prototype.Zb = false;
    ch.prototype.Fb = false;
    ch.prototype.Lb = null;
    ch.prototype.Gc = null;
    ch.prototype.Id = function (a) {
        this.eventLabel = a.el || "detailpage";
        var b = bh[this.eventLabel];
        if (b) {
            w(this, b);
        }
        this.vg = a.add_player_event_listeners != "0";
        b = W(this.wg, a.fs);
        this.wg = this.eventLabel == "detailpage" ? b : b && De();
        this.Vi = W(this.Vi, a.autohide == "3");
        this.autoplay = W(this.autoplay, a.autoplay);
        this.Xe = dh(this.Xe, a.content_v);
        this.Vj = a.controls == undefined ? this.Vj : a.controls;
        this.kb = dh(this.kb, a.eurl);
        this.yc = dh(this.yc, a.framer);
        this.Li = W(this.Li, a.fshd);
        this.Eb = dh(this.Eb, a.hl);
        this.Je = W(this.Je, a.is_html5_mobile_device);
        this.Ed = W(this.Ed, a.player_wide);
        this.loop = W(this.loop, a.loop);
        this.lg = W(this.lg, a.modestbranding);
        this.ng = dh(this.ng, a.vq);
        this.Sg = dh(this.Sg, a.playerapiid);
        this.Ta = dh(this.Ta, a.ps);
        this.nj = W(this.nj, a.playsinline);
        this.referrer = dh(this.referrer, a.referrer);
        this.Yb = dh(this.Yb, a.feature);
        this.region = dh(this.region, a.cr);
        this.Kg = dh(this.Kg, a.q);
        this.Ge = W(this.Ge, a.logwatch);
        this.hg = W(this.hg, a.showinfo);
        this.Lj = W(this.Lj, a.rel);
        this.xg = W(this.xg, a.enablesizebutton);
        this.Wi = W(this.Wi, a.ss);
        this.jg = dh(this.jg, a.theme);
        this.Zb = W(this.Zb, a.use_native_controls);
        this.Wj = W(this.Wj, a.ssl);
        this.Fb = W(this.Fb, a.use_tablet_controls);
        this.Ye = dh(this.Ye, a.attrib);
        this.pd = dh(this.pd, a.sk);
        this.protocol = this.Wj ? "https" : "http";
        this.Ua = this.Vj != 0;
        if ((b = a.BASE_YT_URL)) {
            if (Qf(b, Of)) {
                this.Db = b;
            } else {
                R(
                    goog$debug$Logger$Level$WARNING,
                    "yt.player.EnvironmentData",
                    "BASE_YT_URL untrusted: " + b,
                    undefined
                );
            }
        }
        eh(this, a.fexp);
        fh(this, a);
        if (this.eventLabel != "detailpage" && (a.list || a.api)) {
            this.o = new Fg(a);
        }
        this.Tl = a;
    };
    var fh = function (a, b) {
        a.Ge = W(a.Ge, b.logwatch);
        a.jf = b.user_age == undefined ? a.jf : b.user_age;
        a.kf = dh(a.kf, b.user_gender);
    };
    var W = function (a, b) {
        if (b == undefined) {
            return a;
        } else if (b == "1") {
            return true;
        } else {
            return false;
        }
    };
    var dh = function (a, b) {
        if (b == undefined) {
            return a;
        } else {
            return b;
        }
    };
    var eh = function (a, b) {
        if (b) {
            a.Mb = b.split(",");
            a.Mb.forEach(function () {});
        }
    };
    var gh = function (a) {
        return !!a.o && (!!a.o.loop || !!(a.o.ba + 1 < a.o.na.length));
    };
    var hh = function (a, b) {
        var c = {
            html5: "1",
            video_id: b.m,
            eurl: a.kb,
            ps: a.Ta,
            el: a.eventLabel,
            hl: a.Eb,
            list: b.Ib,
            access_token: b.yq
        };
        if (b.Wl) {
            c.ypc_preview = "1";
        }
        return yt$uri$appendQueryData(a.Db + "get_video_info", c);
    };
    var ih = function (a) {
        var b = {
            contact_type: "playbackissue",
            html5: 1,
            plid: a.pa,
            v: a.m
        };
        if (a.format) {
            b.fmt = a.format.zc;
        }
        return yt$uri$appendQueryData("//www.google.com/support/youtube/bin/request.py", b);
    };
    ch.prototype.td = function () {
        var a = this.z;
        if (!a) {
            R(
                goog$debug$Logger$Level$WARNING,
                "yt.player.EnvironmentData",
                "getPlayerSize called before videoPlayerElement_ was set.",
                undefined
            );
            return new goog$math$Size(Number.NaN, Number.NaN);
        } else {
            return new goog$math$Size(a.clientWidth, a.clientHeight);
        }
    };
    var jh = function (a) {
        if (!a.f) {
            R(
                goog$debug$Logger$Level$WARNING,
                "yt.player.EnvironmentData",
                "getVideoElementSize called before videoElement_ was set.",
                undefined
            );
            return new goog$math$Size(Number.NaN, Number.NaN);
        } else {
            return new goog$math$Size(a.f.clientWidth, a.f.clientHeight);
        }
    };
    var kh = {
        qx: "html5-stop-propagation",
        $v: "html5-autohide",
        Cw: "hide-controls",
        Sw: "modest-branding",
        Uw: "html5-native-controls",
        sx: "html5-tablet",
        rx: "html5-tablet-body",
        zx: "video-container",
        Ax: "video-content",
        Bx: "video-controls",
        Cx: "video-fallback",
        Ex: "video-fallback-content",
        Fx: "html5-storyboard",
        Gx: "html5-video-loader",
        Ix: "html5-watermark",
        fw: "html5-branded-watermark",
        rw: "html5-context-menu",
        xs: "html5-context-menu-copy-video-url",
        zs: "html5-context-menu-pop-out",
        ys: "html5-context-menu-copy-video-url-at-current-time",
        ws: "html5-context-menu-copy-embed-html",
        Cs: "html5-context-menu-stop-download",
        As: "html5-context-menu-report-playback-issue",
        vs: "html5-context-menu-copy-debug-info",
        Bs: "html5-context-menu-show-video-info",
        tw: "html5-show-video-info-template",
        Iw: "html5-info-bar",
        Jw: "html5-author",
        Kw: "html5-title",
        Dw: "html5-hide-share",
        Ew: "html5-hide-volume",
        Hx: "video-thumbnail",
        bw: "html5-bezel",
        ew: "html5-bezel-play",
        dw: "html5-bezel-pause",
        cw: "html5-bezel-fade",
        bx: "html5-popup-dialog",
        Wv: "html5-async-progress",
        Xv: "html5-async-success",
        Vv: "html5-async-error",
        kx: "html5-scalable-icon",
        Yw: "player-root",
        Xw: "player-container",
        Eu: "player-actions-container",
        Cu: "player-actions-close",
        Du: "player-actions-close-button",
        Fu: "player-actions-share",
        Gu: "small-view"
    };
    var lh = {
        "-1": "",
        0: "ended-mode",
        1: "playing-mode",
        2: "paused-mode",
        3: "buffering-mode",
        5: "cued-mode"
    };
    var yt$player$utils$Controls$formatTime = function (a) {
        var b = parseInt(a, 10);
        var a = parseInt(b / 3600, 10);
        var c = parseInt((b % 3600) / 60, 10);
        var b = parseInt(b % 60, 10);
        var d = "";
        if (a > 0) {
            d += a.toString() + ":";
            if (c < 10) {
                d += "0";
            }
        }
        d += c.toString() + ":";
        if (b < 10) {
            d += "0";
        }
        return (d += b.toString());
    };
    var nh = function () {
        this.Gg = new Ge(this);
        this.se = [];
        this.ue = [];
    };
    goog$addSingletonGetter(nh);
    var yt$player$utils$VideoTagPool$instance_ =
        goog$getObjectByName("yt.player.utils.VideoTagPool.instance_") || nh.getInstance();
    goog$exportSymbol("yt.player.utils.VideoTagPool.instance_", yt$player$utils$VideoTagPool$instance_);
    nh.prototype.k = function (a, b) {
        if (!b) {
            b = goog$debug$Logger$Level$WARNING;
        }
        yt$player$logger.log(b, a);
    };
    nh.prototype.ou = function (a) {
        if (!(this.se.length >= a)) {
            for (var a = a - this.se.length, b = 0; b < a; b++) {
                this.se.push(ph(this));
            }
        }
    };
    var ph = function (a) {
        var b = ah();
        b.activate();
        if (a.ue.length) {
            var c = a.ue[0];
            b.setVolume(c.getVolume(), c.isMuted());
        }
        a.ue.push(b);
        a.Gg.G(b, "volumechange", a.Ee);
        return b;
    };
    nh.prototype.Ee = function (a) {
        var a = a.target;
        var b = a.volume;
        var c = a.muted;
        this.ue.forEach(function (a) {
            a.volume = b;
            a.muted = c;
        }, this);
    };
    nh.prototype.getTag = function () {
        if (this.se.length) {
            return this.se.pop();
        }
        this.k("Ran out of video tags!");
        return ph(this);
    };
    nh.prototype.tu = function (a) {
        if (goog$array$contains(this.ue, a)) {
            a.stopVideo();
            a.ul = null;
            Oa(this.ue, a);
        }
    };
    nh.prototype.pu = function (a) {
        return this.se.length >= (a || 1);
    };
    nh.prototype.fillPool = nh.prototype.ou;
    nh.prototype.getTag = nh.prototype.getTag;
    nh.prototype.releaseTag = nh.prototype.tu;
    nh.prototype.hasTags = nh.prototype.pu;
    var rh = function (a, b, c, d, f, g) {
        var i;
        var m = c.offsetParent;
        if (m) {
            var p = m.tagName == "HTML" || m.tagName == "BODY";
            if (!p || goog$style$getStyle_(m, "position") != "static") {
                i = goog$style$getPageOffset(m);
                if (!p) {
                    p =
                        (p = goog$style$isRightToLeft(m)) && goog$userAgent$GECKO
                            ? -m.scrollLeft
                            : p && (!goog$userAgent$IE || !goog$userAgent$isVersion("8"))
                              ? m.scrollWidth - m.clientWidth - m.scrollLeft
                              : m.scrollLeft;
                    i = goog$math$Coordinate$difference(i, new goog$math$Coordinate(p, m.scrollTop));
                }
            }
        }
        m = goog$style$getBounds(a);
        if ((p = goog$style$getVisibleRectForElement(a))) {
            var s = new goog$math$Rect(p.left, p.top, p.right - p.left, p.bottom - p.top);
            var p = Math.max(m.left, s.left);
            var y = Math.min(m.left + m.width, s.left + s.width);
            if (p <= y) {
                var v = Math.max(m.top, s.top);
                var s = Math.min(m.top + m.height, s.top + s.height);
                if (v <= s) {
                    m.left = p;
                    m.top = v;
                    m.width = y - p;
                    m.height = s - v;
                }
            }
        }
        p = goog$dom$getDomHelper(a);
        v = goog$dom$getDomHelper(c);
        if (p.Q != v.Q) {
            var y = p.Q.body;
            var v = v.Q.parentWindow || v.Q.defaultView;
            var s = new goog$math$Coordinate(0, 0);
            var z = goog$dom$getOwnerDocument(y)
                ? goog$dom$getOwnerDocument(y).parentWindow || goog$dom$getOwnerDocument(y).defaultView
                : window;
            var fa = y;
            do {
                var wj = z == v ? goog$style$getPageOffset(fa) : ed(fa);
                s.x += wj.x;
                s.y += wj.y;
            } while (z && z != v && (fa = z.frameElement) && (z = z.parent));
            y = goog$math$Coordinate$difference(s, goog$style$getPageOffset(y));
            if (goog$userAgent$IE && !goog$dom$DomHelper$isCss1CompatMode(p)) {
                y = goog$math$Coordinate$difference(y, goog$dom$DomHelper$getDocumentScroll(p));
            }
            m.left += y.x;
            m.top += y.y;
        }
        a = (b & 4 && goog$style$isRightToLeft(a) ? b ^ 2 : b) & -5;
        b = new goog$math$Coordinate(a & 2 ? m.left + m.width : m.left, a & 1 ? m.top + m.height : m.top);
        if (i) {
            b = goog$math$Coordinate$difference(b, i);
        }
        if (f) {
            b.x += (a & 2 ? -1 : 1) * f.x;
            b.y += (a & 1 ? -1 : 1) * f.y;
        }
        qh(b, c, d, g, undefined, undefined, undefined);
    };
    var qh = function (a, b, c, d, f, g, i) {
        var a = a.ga();
        var m = (c & 4 && goog$style$isRightToLeft(b) ? c ^ 2 : c) & -5;
        var c = goog$style$getSize(b);
        var i = i ? i.ga() : c.ga();
        if (d || m != 0) {
            if (m & 2) {
                a.x -= i.width + (d ? d.right : 0);
            } else if (d) {
                a.x += d.left;
            }
            if (m & 1) {
                a.y -= i.height + (d ? d.bottom : 0);
            } else if (d) {
                a.y += d.top;
            }
        }
        if (g) {
            if (f) {
                d = a;
                m = 0;
                if ((g & 65) == 65 && (d.x < f.left || d.x >= f.right)) {
                    g &= -2;
                }
                if ((g & 132) == 132 && (d.y < f.top || d.y >= f.bottom)) {
                    g &= -5;
                }
                if (d.x < f.left && g & 1) {
                    d.x = f.left;
                    m |= 1;
                }
                if (d.x < f.left && d.x + i.width > f.right && g & 16) {
                    i.width = Math.max(i.width - (d.x + i.width - f.right), 0);
                    m |= 4;
                }
                if (d.x + i.width > f.right && g & 1) {
                    d.x = Math.max(f.right - i.width, f.left);
                    m |= 1;
                }
                if (g & 2) {
                    m |= (d.x < f.left ? 16 : 0) | (d.x + i.width > f.right ? 32 : 0);
                }
                if (d.y < f.top && g & 4) {
                    d.y = f.top;
                    m |= 2;
                }
                if (d.y >= f.top && d.y + i.height > f.bottom && g & 32) {
                    i.height = Math.max(i.height - (d.y + i.height - f.bottom), 0);
                    m |= 8;
                }
                if (d.y + i.height > f.bottom && g & 4) {
                    d.y = Math.max(f.bottom - i.height, f.top);
                    m |= 2;
                }
                if (g & 8) {
                    m |= (d.y < f.top ? 64 : 0) | (d.y + i.height > f.bottom ? 128 : 0);
                }
                f = m;
            } else {
                f = 256;
            }
            if (f & 496) {
                return;
            }
        }
        Zc(b, a);
        if (!jc(c, i)) {
            f = goog$dom$DomHelper$isCss1CompatMode(goog$dom$getDomHelper(goog$dom$getOwnerDocument(b)));
            if (goog$userAgent$IE && (!f || !goog$userAgent$isVersion("8"))) {
                a = b.style;
                if (f) {
                    f = pd(b);
                    b = sd(b);
                    a.pixelWidth = i.width - b.left - f.left - f.right - b.right;
                    a.pixelHeight = i.height - b.top - f.top - f.bottom - b.bottom;
                } else {
                    a.pixelWidth = i.width;
                    a.pixelHeight = i.height;
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
                b.width = Math.max(i.width, 0) + "px";
                b.height = Math.max(i.height, 0) + "px";
            }
        }
    };
    var yt$style$setDisplayed = function (a, b) {
        if ((a = goog$dom$getElement(a)) && a.style) {
            md(a, b);
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
    var yt$config_ = (window.yt && window.yt.config_) || {};
    goog$exportSymbol("yt.config_", yt$config_);
    goog$exportSymbol("yt.globals_", (window.yt && window.yt.globals_) || {});
    var yt$msgs_ = (window.yt && window.yt.msgs_) || {};
    goog$exportSymbol("yt.msgs_", yt$msgs_);
    var yt$timeouts_ = (window.yt && window.yt.timeouts_) || [];
    goog$exportSymbol("yt.timeouts_", yt$timeouts_);
    var yt$intervals_ = (window.yt && window.yt.intervals_) || [];
    goog$exportSymbol("yt.intervals_", yt$intervals_);
    var zh = function (a) {
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
    var yt$clearInterval = function (a) {
        window.clearInterval(a);
    };
    var yt$getMsg = function (a) {
        var b = {};
        if ((a = a in yt$msgs_ ? yt$msgs_[a] : undefined)) {
            for (var c in b) {
                a = a.replace(RegExp("\\$" + c, "gi"), function () {
                    return b[c];
                });
            }
        }
        return a;
    };
    eval("/*@cc_on!@*/false");
    var yt$uix$eventPubSubs_ = {};
    var Fh = "ontouchstart" in document;
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
            for (c in b.Oa) {
                var d = yt$uix$getMaxNumParents_(a.type, c);
                var f = yt$uix$findAncestorWithClass_(c, a.target, d);
                if (f) {
                    var g = true;
                    if (
                        b.checkRelatedTarget[c] &&
                        a.relatedTarget &&
                        goog$dom$getAncestor(
                            a.relatedTarget,
                            function (a) {
                                return a == f;
                            },
                            true,
                            d
                        )
                    ) {
                        g = false;
                    }
                    if (g) {
                        b.c(c, f, a.type, a);
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
    if (Fh) {
        yt$events$listen(document, "touchstart", yt$uix$dispatchEvent_);
        yt$events$listen(document, "touchend", yt$uix$dispatchEvent_);
        yt$events$listen(document, "touchcancel", yt$uix$dispatchEvent_);
    }
    var yt$uix$widgets_ = (window.yt && window.yt.uix && window.yt.uix.widgets_) || {};
    goog$exportSymbol("yt.uix.widgets_", yt$uix$widgets_);
    var yt$uix$initWidget = function (a) {
        var a = a.getInstance();
        var b = yt$uix$BaseWidget$getCssClass(a);
        if (!(b in yt$uix$widgets_) && a.pp()) {
            a.ag();
            yt$uix$widgets_[b] = a;
        }
    };
    var Kh = function () {
        this.Of = {};
    };
    Kh.prototype.ru = !!eval("/*@cc_on!@*/false");
    Kh.prototype.pp = function () {
        return true;
    };
    Kh.prototype.addBehavior = function (a, b, c, d, f) {
        var c = yt$uix$BaseWidget$getCssClass(this, c);
        var g = goog$bind(b, this);
        if (!(a in yt$uix$eventPubSubs_)) {
            yt$uix$eventPubSubs_[a] = new goog$pubsub$PubSub();
            yt$uix$eventPubSubs_[a].maxNumParents = {};
            yt$uix$eventPubSubs_[a].checkRelatedTarget = {};
        }
        a = yt$uix$eventPubSubs_[a];
        a.e(c, g);
        a.maxNumParents[c] = d;
        a.checkRelatedTarget[c] = f;
        this.Of[b] = g;
    };
    Kh.prototype.xi = function (a, b, c) {
        var d = this.getData(a, b);
        if (d && (d = goog$getObjectByName(d))) {
            var f = goog$array$slice(arguments, 2);
            goog$array$splice(f, 0, 0, a);
            d.apply(null, f);
        }
    };
    Kh.prototype.getData = function (a, b) {
        return yt$dom$datasets$get(a, b);
    };
    Kh.prototype.setData = function (a, b, c) {
        yt$dom$datasets$set(a, b, c);
    };
    var yt$uix$BaseWidget$getCssClass = function (a, b) {
        return "yt-uix" + (a.ye ? "-" + a.ye : "") + (b ? "-" + b : "");
    };
    var Lh = function () {
        this.Of = {};
    };
    goog$inherits(Lh, Kh);
    goog$addSingletonGetter(Lh);
    Lh.prototype.ye = "tooltip";
    Lh.prototype.zi = 0;
    Lh.prototype.ag = function () {
        this.addBehavior("mouseover", this.ti);
        this.addBehavior("mouseout", this.Zf);
        this.addBehavior("click", this.Zf);
        this.addBehavior("touchstart", this.kl);
        this.addBehavior("touchend", this.ui);
        this.addBehavior("touchcancel", this.ui);
    };
    Lh.prototype.pp = function () {
        return !this.ru || Gb.indexOf("6") != 0;
    };
    Lh.prototype.ti = function (a) {
        if (!this.zi || !(goog$now() - this.zi < 1000)) {
            var b = parseInt(this.getData(a, "tooltip-hide-timer"), 10);
            if (b) {
                yt$dom$datasets$remove(a, "tooltip-hide-timer");
                window.clearTimeout(b);
            }
            var b = goog$bind(function () {
                Mh(this, a);
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
    Lh.prototype.Zf = function (a) {
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
    Lh.prototype.kl = function (a, b, c) {
        this.zi = 0;
        this.ti(
            yt$uix$findAncestorWithClass_(
                yt$uix$BaseWidget$getCssClass(this),
                c.changedTouches[0].target,
                yt$uix$getMaxNumParents_(b, yt$uix$BaseWidget$getCssClass(this))
            ),
            b
        );
    };
    Lh.prototype.ui = function (a, b, c) {
        this.zi = goog$now();
        this.Zf(
            yt$uix$findAncestorWithClass_(
                yt$uix$BaseWidget$getCssClass(this),
                c.changedTouches[0].target,
                yt$uix$getMaxNumParents_(b, yt$uix$BaseWidget$getCssClass(this))
            ),
            b
        );
    };
    var Oh = function (a, b, c) {
        a.setData(b, "tooltip-text", c);
        a = a.getData(b, "content-id");
        if ((a = goog$dom$getElement(a))) {
            a.innerHTML = c;
        }
    };
    Lh.prototype.Ub = function (a) {
        return this.getData(a, "tooltip-text") || a.title;
    };
    var Mh = function (a, b) {
        if (b) {
            var c = a.Ub(b);
            if (c) {
                var d = goog$dom$getElement(yt$uix$Tooltip$getTipId_(a, b));
                if (!d) {
                    d = document.createElement("div");
                    d.id = yt$uix$Tooltip$getTipId_(a, b);
                    d.className = yt$uix$BaseWidget$getCssClass(a, "tip");
                    var f = document.createElement("div");
                    f.className = yt$uix$BaseWidget$getCssClass(a, "tip-body");
                    var g = document.createElement("div");
                    g.className = yt$uix$BaseWidget$getCssClass(a, "tip-arrow");
                    var i = document.createElement("div");
                    i.className = yt$uix$BaseWidget$getCssClass(a, "tip-content");
                    var m = a.Wf(b);
                    var p = yt$uix$Tooltip$getTipId_(a, b, "content");
                    i.id = p;
                    a.setData(b, "content-id", p);
                    f.appendChild(i);
                    if (m) {
                        d.appendChild(m);
                    }
                    d.appendChild(f);
                    d.appendChild(g);
                    (se("fullScreenElement", document) || document.body).appendChild(d);
                    Oh(a, b, c);
                    if ((c = parseInt(a.getData(b, "tooltip-max-width"), 10)) && f.offsetWidth > c) {
                        f.style.width = c + "px";
                        goog$dom$classes$add(i, yt$uix$BaseWidget$getCssClass(a, "normal-wrap"));
                    }
                    i = goog$dom$classes$has(b, yt$uix$BaseWidget$getCssClass(a, "reverse"));
                    if (!a.pl(b, d, f, m, g, i)) {
                        a.pl(b, d, f, m, g, !i);
                    }
                    var s = yt$uix$BaseWidget$getCssClass(a, "tip-visible");
                    yt$setTimeout(function () {
                        goog$dom$classes$add(d, s);
                    }, 0);
                }
            }
        }
    };
    Lh.prototype.pl = function (a, b, c, d, f, g) {
        goog$dom$classes$enable(b, yt$uix$BaseWidget$getCssClass(this, "tip-reverse"), g);
        var i = 0;
        if (g) {
            i = 1;
        }
        var f = goog$style$getSize(a);
        var g = new goog$math$Coordinate((f.width - 10) / 2, g ? f.height : 0);
        var m = goog$style$getPageOffset(a);
        qh(new goog$math$Coordinate(m.x + g.x, m.y + g.y), b, i);
        var i = goog$dom$getViewportSize_(window);
        var m = ed(b);
        var b = goog$style$getSize(c);
        var p = b.width / 2;
        if (d) {
            d.style.left = "3px";
            d.style.height = b.height + "px";
            d.style.width = b.width + "px";
        }
        d = !!(i.height < m.y + f.height);
        f = !!(m.y < f.height);
        g = !!(m.x < p);
        i = !!(i.width < m.x + p);
        m = (b.width + 3) / -2 - -5;
        a = this.getData(a, "force-tooltip-direction");
        if (a == "left" || g) {
            m = -5;
        } else if (a == "right" || i) {
            m = 20 - b.width - 3;
        }
        c.style.left = m + "px";
        return !d && !f;
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
        var a = yt$uix$BaseWidget$getCssClass(a);
        var d = b.__yt_uid_key;
        if (!d) {
            d = yt$dom$getNextId_();
            b.__yt_uid_key = d;
        }
        b = a + d;
        if (c) {
            b += "-" + c;
        }
        return b;
    };
    Lh.prototype.Wf = function (a) {
        var b = null;
        if (ob && goog$dom$classes$has(a, yt$uix$BaseWidget$getCssClass(this, "masked"))) {
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
    var Rh = function (a, b) {
        goog$dom$classes$remove(a, "html5-async-progress", "html5-async-success", "html5-async-error");
        if (b) {
            goog$dom$classes$add(a, b);
        }
        yt$uix$Tooltip$hideTip_(Lh.getInstance(), a);
    };
    var Sh = function (a, b) {
        Rh(a, "html5-async-error");
        if (b) {
            var c = Lh.getInstance();
            var d = c.Ub(a);
            Oh(c, a, b);
            Mh(c, a);
            c.setData(a, "tooltip-text", d);
        }
    };
    var Uh = function (a, b, c, d) {
        if ((this.$k = !!c)) {
            this.jl = Math.max(800, this.jl);
        }
        this.element = a;
        this.onclick = b;
        this.Io = d;
        if (Th) {
            a.ontouchstart = goog$bind(this.Wt, this);
        } else {
            a.onmousedown = goog$bind(this.Vt, this);
        }
        a.onclick = goog$bind(this.Jo, this);
    };
    var Th = "ontouchstart" in document;
    var Vh = [];
    var Wh = false;
    var Xh = function () {
        if (Th && !Wh) {
            Wh = true;
            document.addEventListener(
                "click",
                function (a) {
                    var b = new goog$math$Coordinate(a.clientX, a.clientY);
                    for (var c = 0, d; (d = Vh[c]); c++) {
                        if (hc(d, b) < 25) {
                            a.stopPropagation();
                            a.preventDefault();
                            Vh.splice(c, 1);
                            break;
                        }
                    }
                },
                true
            );
        }
    };
    var Yh = function (a) {
        Vh.push(a);
        window.setTimeout(function () {
            var b = Vh.indexOf(a);
            if (b != -1) {
                Vh.splice(b, 1);
            }
        }, 2500);
    };
    Uh.prototype.bu = 12;
    Uh.prototype.So = 100;
    Uh.prototype.jl = 500;
    Uh.prototype.Wt = function (a) {
        if (!(a.touches.length > 1) && !a._stop) {
            this.fi = a._stop = true;
            if (!this.$k) {
                this.element.ontouchend = goog$bind(this.Jo, this);
                document.body.addEventListener("touchend", Zh(this), false);
            }
            document.body.addEventListener("touchmove", $h(this), false);
            document.body.addEventListener("touchcancel", Zh(this), false);
            ai(this);
            if (this.So) {
                this.At = window.setTimeout(goog$bind(this.Tf, this, true), this.So);
            } else {
                this.Tf(true);
            }
            var b = a.touches[0];
            this.dl = new goog$math$Coordinate(b.clientX, b.clientY);
            if (!this.$k && (!this.Io || this.Io(a))) {
                Yh(this.dl);
            }
        }
    };
    Uh.prototype.Vt = function (a) {
        a.stopPropagation();
        this.fi = true;
        ai(this);
        this.Tf(true);
    };
    Uh.prototype.Jo = function (a) {
        if ((a.type != "touchend" || !!this.fi) && !a._stop) {
            a._stop = true;
            this.Tf(true);
            window.setTimeout(
                goog$bind(function () {
                    this.vi();
                    this.onclick(a);
                }, this),
                0
            );
        }
    };
    Uh.prototype.gu = function (a) {
        if (a.touches.length > 1) {
            this.vi();
        } else {
            a = a.touches[0];
            a = new goog$math$Coordinate(a.clientX, a.clientY);
            if (this.dl && hc(this.dl, a) > this.bu) {
                this.vi();
            }
        }
    };
    var $h = function (a) {
        if (!a.tp) {
            a.tp = goog$bind(a.gu, a);
        }
        return a.tp;
    };
    Uh.prototype.vi = function () {
        window.clearTimeout(this.At);
        window.clearTimeout(this.Ot);
        this.Tf(false);
        this.fi = false;
        document.body.removeEventListener("touchmove", $h(this), false);
        document.body.removeEventListener("touchend", Zh(this), false);
        document.body.removeEventListener("touchcancel", Zh(this), false);
    };
    var Zh = function (a) {
        if (!a.qp) {
            a.qp = goog$bind(a.vi, a);
        }
        return a.qp;
    };
    Uh.prototype.Tf = function (a) {
        if (this.un) {
            goog$dom$classes$enable(this.element, this.un, a);
        }
    };
    var ai = function (a) {
        if (a.$t) {
            a.Ot = window.setTimeout(
                goog$bind(function () {
                    this.fi = false;
                    this.$t();
                }, a),
                a.jl
            );
        }
    };
    var bi = function () {
        this.Of = {};
    };
    goog$inherits(bi, Kh);
    goog$addSingletonGetter(bi);
    bi.prototype.ye = "button";
    bi.prototype.Pd = null;
    bi.prototype.ag = function () {
        this.addBehavior("click", this.sl);
        this.addBehavior("keydown", this.cu);
        this.addBehavior("keypress", this.tl);
    };
    bi.prototype.sl = function (a) {
        if (a && !a.disabled) {
            if (this.getData(a, "button-toggle")) {
                var b = Lc(a, yt$uix$BaseWidget$getCssClass(this, "group"));
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
                    gc(a, yt$uix$BaseWidget$getCssClass(this, "toggled"));
                }
            }
            if (yt$uix$Button$getMenu_(this, a)) {
                di(this, a);
                a.focus();
            }
            this.xi(a, "button-action");
        }
    };
    bi.prototype.cu = function (a, b, c) {
        if (!c.altKey && !c.ctrlKey && !c.shiftKey && (b = yt$uix$Button$getMenu_(this, a))) {
            var d = function (a) {
                var b = "";
                if (a.tagName) {
                    b = a.tagName.toLowerCase();
                }
                return b == "ul" || b == "table";
            };
            if ((d = d(b) ? b : goog$dom$findNode(b, d))) {
                var d = d.tagName.toLowerCase();
                var f;
                if (d == "ul") {
                    f = this.iu;
                } else if (d == "table") {
                    f = this.hu;
                }
                if (f) {
                    ei(this, a, b, c, goog$bind(f, this));
                }
            }
        }
    };
    var ei = function (a, b, c, d, f) {
        var g = yt$style$isDisplayed(c);
        var i = d.keyCode == 9;
        if (i || d.keyCode == 32 || d.keyCode == 13) {
            if ((d = yt$uix$Button$clearMenuHighlight_(a, c))) {
                b = d.firstElementChild != undefined ? d.firstElementChild : goog$dom$getNextElementNode_(d.firstChild);
                if (b.tagName.toLowerCase() == "a") {
                    window.location = b.href;
                } else {
                    Be(b, "click");
                }
            } else if (i) {
                gi(a, b);
            }
        } else if (g) {
            if (d.keyCode == 27) {
                yt$uix$Button$clearMenuHighlight_(a, c);
                gi(a, b);
            } else {
                f(b, c, d);
            }
        } else {
            a = goog$dom$classes$has(b, yt$uix$BaseWidget$getCssClass(a, "reverse")) ? 38 : 40;
            if (d.keyCode == a) {
                Be(b, "click");
                d.preventDefault();
            }
        }
    };
    bi.prototype.tl = function (a, b, c) {
        if (!c.altKey && !c.ctrlKey && !c.shiftKey) {
            a = yt$uix$Button$getMenu_(this, a);
            if (yt$style$isDisplayed(a)) {
                c.preventDefault();
            }
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
    bi.prototype.hu = function (a, b, c) {
        var d = yt$uix$Button$clearMenuHighlight_(this, b);
        var b = qe("table", b);
        var f = qe("tr", b);
        var f = goog$dom$getElementsByTagNameAndClass("td", null, f).length;
        var b = goog$dom$getElementsByTagNameAndClass("td", null, b);
        var d = yt$uix$Button$getNextMenuIndex_(d, b, f, c);
        if (d != -1) {
            yt$uix$Button$highlightMenuItem_(this, a, b[d]);
            c.preventDefault();
        }
    };
    bi.prototype.iu = function (a, b, c) {
        if (c.keyCode == 40 || c.keyCode == 38) {
            var d = yt$uix$Button$clearMenuHighlight_(this, b);
            var b = goog$dom$getElementsByTagNameAndClass("li", null, b);
            var d = yt$uix$Button$getNextMenuIndex_(d, b, 1, c);
            yt$uix$Button$highlightMenuItem_(this, a, b[d]);
            c.preventDefault();
        }
    };
    var yt$uix$Button$getNextMenuIndex_ = function (a, b, c, d) {
        var f = b.length;
        var a = goog$array$indexOf(b, a);
        if (a == -1) {
            if (d.keyCode == 38) {
                a = f - c;
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
                a += f;
            }
            a -= c;
        } else if (d.keyCode == 40) {
            if (a >= f - c) {
                a -= f;
            }
            a += c;
        }
        return a;
    };
    var di = function (a, b) {
        var c = yt$uix$Button$getMenu_(a, b);
        var d = Lc(c.activeButtonNode || c.parentNode, yt$uix$BaseWidget$getCssClass(a));
        if (d && d != b) {
            gi(a, d);
            yt$setTimeout(goog$bind(a.wp, a, b), 1);
        } else if (yt$style$isDisplayed(c)) {
            gi(a, b);
        } else {
            a.wp(b);
        }
    };
    bi.prototype.Wf = function (a) {
        if (!ob || !goog$dom$classes$has(a, yt$uix$BaseWidget$getCssClass(this, "masked"))) {
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
    bi.prototype.wp = function (a) {
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
                var c = Lc(a, yt$uix$BaseWidget$getCssClass(this, "group"));
                var d = !!this.getData(a, "button-menu-ignore-group");
                b.style.minWidth = (c && !d ? c.offsetWidth - 2 : a.offsetWidth - 2) + "px";
                if ((d = this.Wf(a))) {
                    document.body.appendChild(d);
                }
                var d = Lc(a, yt$uix$BaseWidget$getCssClass(this, "group"));
                var f = !!this.getData(a, "button-menu-ignore-group");
                var d = d && !f ? d : a;
                var f = 5;
                var g = 4;
                if (goog$dom$classes$has(a, yt$uix$BaseWidget$getCssClass(this, "reverse"))) {
                    f = 4;
                    g = 5;
                }
                if (goog$dom$classes$has(a, "flip")) {
                    if (goog$dom$classes$has(a, yt$uix$BaseWidget$getCssClass(this, "reverse"))) {
                        f = 6;
                        g = 7;
                    } else {
                        f = 7;
                        g = 6;
                    }
                }
                var i;
                if (this.getData(a, "button-has-sibling-menu")) {
                    var m = goog$style$getOffsetParent(d);
                    if (goog$userAgent$IE && !goog$userAgent$isVersion("8")) {
                        m = null;
                    }
                    if (m) {
                        i = goog$style$getBounds(m);
                        i = new goog$math$Box(-i.top, i.left, i.top, -i.left);
                    }
                }
                var m = new goog$math$Coordinate(0, 1);
                var p = this.Wf(a);
                if (p) {
                    var s = goog$style$getSize(b);
                    p.style.width = s.width + "px";
                    p.style.height = s.height + "px";
                    rh(d, f, p, g, m, i);
                }
                rh(d, f, b, g, m, i);
                yt$style$show(b);
                this.xi(a, "button-menu-action", true);
                goog$dom$classes$add(a, yt$uix$BaseWidget$getCssClass(this, "active"));
                if (c) {
                    goog$dom$classes$add(c, yt$uix$BaseWidget$getCssClass(this, "group-active"));
                }
                c = goog$bind(this.Ut, this, a);
                b = yt$events$listen(document, "click", c);
                c = yt$events$listen(document, "contextmenu", c);
                this.setData(a, "button-listener", b);
                this.setData(a, "button-context-menu-listener", c);
                this.Pd = a;
            }
        }
    };
    var gi = function (a, b) {
        if (b) {
            var c = yt$uix$Button$getMenu_(a, b);
            if (c) {
                a.Pd = null;
                b.setAttribute("aria-pressed", "false");
                b.setAttribute("aria-expanded", "false");
                yt$style$hide(c);
                a.xi(b, "button-menu-action", false);
                var d = a.Wf(b);
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
            var f = Lc(b, yt$uix$BaseWidget$getCssClass(a, "group"));
            goog$dom$classes$remove(b, yt$uix$BaseWidget$getCssClass(a, "active"));
            if (f) {
                goog$dom$classes$remove(f, yt$uix$BaseWidget$getCssClass(a, "group-active"));
            }
            if ((f = a.getData(b, "button-listener"))) {
                yt$events$unlistenByKey(f);
                yt$dom$datasets$remove(b, "button-listener");
            }
            if ((f = a.getData(b, "button-context-menu-listener"))) {
                yt$events$unlistenByKey(f);
                yt$dom$datasets$remove(b, "button-context-menu-listener");
            }
        }
    };
    bi.prototype.getContent = function (a) {
        return goog$dom$getElementByClass(yt$uix$BaseWidget$getCssClass(this, "content"), a);
    };
    bi.prototype.Ut = function (a, b) {
        var c;
        c = b || window.event;
        c = c.target || c.srcElement;
        if (c.nodeType == 3) {
            c = c.parentNode;
        }
        var d = Lc(c, yt$uix$BaseWidget$getCssClass(this));
        if (d) {
            var d = yt$uix$Button$getMenu_(this, d);
            var f = yt$uix$Button$getMenu_(this, a);
            if (d == f) {
                return;
            }
        }
        if (
            !Lc(c, yt$uix$BaseWidget$getCssClass(this, "menu")) ||
            goog$dom$classes$has(c, yt$uix$BaseWidget$getCssClass(this, "menu-item")) ||
            goog$dom$classes$has(c, yt$uix$BaseWidget$getCssClass(this, "menu-close"))
        ) {
            gi(this, a);
            if (
                (d = Lc(c, yt$uix$BaseWidget$getCssClass(this, "menu"))) &&
                this.getData(a, "button-menu-indicate-selected")
            ) {
                var f = goog$dom$getElementByClass(yt$uix$BaseWidget$getCssClass(this, "content"), a);
                var g;
                if (goog$dom$BrowserFeature$CAN_USE_INNER_TEXT && "innerText" in c) {
                    g = c.innerText.replace(/(\r\n|\r|\n)/g, "\n");
                } else {
                    g = [];
                    goog$dom$getTextContent_(c, g, true);
                    g = g.join("");
                }
                g = g.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
                g = g.replace(/\u200B/g, "");
                if (!goog$dom$BrowserFeature$CAN_USE_INNER_TEXT) {
                    g = g.replace(/ +/g, " ");
                }
                if (g != " ") {
                    g = g.replace(/^\s*/, "");
                }
                goog$dom$setTextContent(f, g);
                f = yt$uix$BaseWidget$getCssClass(this, "menu-item-selected");
                if ((d = goog$dom$getElementByClass(f, d))) {
                    goog$dom$classes$remove(d, f);
                }
                goog$dom$classes$add(c.parentNode, f);
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
    var ji = function () {
        this.rr = true;
    };
    var ki = function (a) {
        this.nr = a || new ji();
        this.$f = {};
        this.uh = new Ge(this);
        this.sh = new Ge(this);
    };
    ki.prototype.C = null;
    ki.prototype.zf = null;
    ki.prototype.Ei = null;
    ki.prototype.Hl = null;
    ki.prototype.yd = null;
    ki.prototype.hf = null;
    ki.prototype.qn = null;
    ki.prototype.Jc = null;
    ki.prototype.mn = null;
    ki.prototype.Ql = 0;
    ki.prototype.Fe = 0;
    ki.prototype.Sl = null;
    ki.prototype.Tg = null;
    ki.prototype.uh = null;
    ki.prototype.de = null;
    ki.prototype.ic = null;
    ki.prototype.Pj = null;
    ki.prototype.tb = null;
    ki.prototype.Qj = null;
    ki.prototype.sh = null;
    ki.prototype.zd = null;
    ki.prototype.mf = null;
    ki.prototype.dg = null;
    ki.prototype.og = null;
    ki.prototype.Ui = null;
    ki.prototype.bk = null;
    ki.prototype.vd = null;
    ki.prototype.Se = null;
    ki.prototype.wn = null;
    ki.prototype.Dc = null;
    ki.prototype.pubsub = null;
    ki.prototype.Ki = false;
    ki.prototype.Uh = null;
    ki.prototype.ud = function (a) {
        this.C = a;
        this.pubsub = new goog$pubsub$PubSub();
        this.zf = goog$dom$getElementByClass("html5-play-button", a);
        new Uh(this.zf, goog$bind(this.Ar, this)).un = "html5-active";
        this.Ei = goog$dom$getElementByClass("current-time", a);
        this.Hl = goog$dom$getElementByClass("duration-time", a);
        this.yd = goog$dom$getElementByClass("html5-progress-bar", a);
        this.hf = goog$dom$getElementByClass("html5-progress-list", this.yd);
        yt$events$listen(this.yd, "click", goog$bind(this.tm, this));
        this.Jc = goog$dom$getElementByClass("html5-play-progress", this.hf);
        this.mn = goog$dom$getElementByClass("html5-load-progress", this.hf);
        this.qn = goog$dom$getElementByClass("html5-ad-progress-list", this.yd);
        this.Tg = goog$dom$getElementByClass("html5-scrubber-button", a);
        we(this.Tg, "down", goog$bind(this.tr, this));
        this.Sl = goog$dom$getElementByClass("html5-progress-screenreader", a);
        this.de = goog$dom$getElementByClass("html5-volume-control", a);
        yt$events$listen(this.de, "keydown", goog$bind(this.Br, this));
        this.ic = goog$dom$getElementByClass("html5-volume-button", this.de);
        yt$events$listen(this.ic, "click", goog$bind(this.vn, this));
        this.Pj = goog$dom$getElementByClass("html5-volume-panel", this.de);
        this.tb = goog$dom$getElementByClass("html5-volume-slider", this.de);
        we(this.tb, "down", goog$bind(this.xr, this));
        this.Qj = goog$dom$getElementByClass("html5-volume-slider-foreground", this.de);
        this.zd = goog$dom$getElementByClass("html5-speed-button", a);
        this.mf = goog$dom$getElementByClass("yt-uix-button-content", this.zd);
        var b = goog$dom$getElementByClass("html5-popup-menu", this.zd);
        ye(b, goog$bind(this.ur, this), "yt-uix-button-menu-item");
        this.bk = goog$dom$getElementByClass("html5-threed-popup-menu", a);
        this.Ui = goog$dom$getElementByClass("html5-small-player-button", a);
        yt$events$listen(this.Ui, "click", goog$bind(this.tn, this));
        this.og = goog$dom$getElementByClass("html5-large-player-button", a);
        yt$events$listen(this.og, "click", goog$bind(this.tn, this));
        this.dg = goog$dom$getElementByClass("html5-fullscreen-button", a);
        yt$events$listen(this.dg, "click", goog$bind(this.wr, this));
        this.vd = goog$dom$getElementByClass("html5-quality-button", a);
        this.Se = goog$dom$getElementByClass("html5-popup-menu", this.vd);
        ye(this.Se, goog$bind(this.sr, this), "yt-uix-button-menu-item");
        this.Dc = goog$dom$getElementByClass("html5-watch-later-button", a);
        yt$events$listen(this.Dc, "click", goog$bind(this.yr, this));
        this.wn = goog$dom$getElementByClass("html5-watch-on-youtube-button", a);
        yt$events$listen(this.wn, "click", goog$bind(this.zr, this));
        if (!this.nr.rr) {
            goog$dom$classes$remove(
                goog$dom$getElementByClass("yt-uix-range-tooltip", undefined),
                "yt-uix-range-tooltip"
            );
        }
    };
    ki.prototype.Kb = function (a) {
        return goog$dom$classes$has(this.C, "disabled-control-" + a);
    };
    ki.prototype.disable = function (a) {
        var b = "";
        a.forEach(function (a) {
            b += " disabled-control-" + a;
        }, this);
        this.C.className += b;
    };
    ki.prototype.enable = function (a) {
        var b = this.C.className.split(" ");
        a.forEach(function (a) {
            Oa(b, "disabled-control-" + a);
        }, this);
        this.C.className = b.join(" ");
    };
    ki.prototype.Hp = function (a, b) {
        if (this.Uh == a) {
            this.k("Already redirect controls to this target");
        }
        this.Ml();
        this.Uh = a;
        b.forEach(function (a) {
            goog$dom$classes$add(this.C, "redirected-control-" + a);
        }, this);
    };
    ki.prototype.Ml = function () {
        this.Uh = null;
        for (var a in Zf) {
            goog$dom$classes$remove(this.C, "redirected-control-" + Zf[a]);
        }
    };
    var li = function (a) {
        if (!goog$dom$classes$has(a.C, "redirected-control-play_pause")) {
            return null;
        } else {
            return a.Uh;
        }
    };
    var mi = function (a, b) {
        var c = goog$dom$getElementsByClass("yt-uix-button-menu-item", a.Se);
        goog$array$forEach(
            c,
            function (a) {
                a.style.display = "none";
                for (var c = 0, g = b.length; c < g; c++) {
                    if (yt$dom$datasets$get(a, "value") == b[c].Nc) {
                        a.style.display = "list-item";
                    }
                }
            },
            a
        );
    };
    ki.prototype.k = function (a) {
        yt$player$logger.info(a);
    };
    ki.prototype.Br = function (a) {
        var b = a.keyCode;
        if (b == 32 || b == 13) {
            this.vn();
            a.preventDefault();
        }
    };
    ki.prototype.setVolume = function (a, b) {
        this.k("Setting volume to: " + a + (b ? " (muted)" : ""));
        yt$dom$datasets$set(
            this.ic,
            "value",
            b || a == 0 ? "off" : a < 20 ? "min" : a < 40 ? "quiet" : a < 60 ? "normal" : a < 80 ? "loud" : "max"
        );
        yt$dom$datasets$set(this.ic, "volume", a);
        var c = this.tb.clientWidth - 6;
        var d = this.tb.style.backgroundPosition.split(" ");
        var d = d.length > 1 ? d[1] : "0px";
        if (b) {
            this.tb.style.backgroundPosition = "-" + c + "px " + d;
            this.Qj.style.left = "0px";
        } else {
            var f;
            if (a <= 0) {
                f = 0;
            } else if (a >= 100) {
                f = c;
            } else {
                f = ((c - 0) * a) / 100;
                f = f <= 0 ? 0 : f >= c ? c : 0 + Math.round(f);
            }
            this.Qj.style.left = f + "px";
            this.tb.style.backgroundPosition = "-" + (c - f) + "px " + d;
        }
        c = Math.round(a);
        d = c + "% " + yt$getMsg("HTML5_VOLUME_SETTING") + (b ? " " + yt$getMsg("HTML5_VOLUME_MUTED") : "");
        this.Pj.setAttribute("aria-valuenow", c);
        this.Pj.setAttribute("aria-valuetext", d);
        ni(this.ic, b);
        this.ic.setAttribute(
            "aria-label",
            (b ? yt$getMsg("HTML5_VOLUME_UNMUTE") : yt$getMsg("HTML5_VOLUME_MUTE")) +
                " " +
                yt$getMsg("HTML5_CONTROL_TOGGLE")
        );
    };
    ki.prototype.vn = function () {
        this.pubsub.c("mutetoggled");
    };
    var oi = function (a) {
        var b = Math.round(a.Fe * 1000) / 10;
        var c = Math.round(a.Ql * 1000) / 10;
        if (b > c) {
            c = b;
        }
        a.Jc.style.width = b + "%";
        a.mn.style.width = c + "%";
        a.Tg.style.left = b + "%";
    };
    ki.prototype.He = function (a) {
        if (a) {
            ec(this.zf, "html5-play-button", "html5-pause-button");
        } else {
            ec(this.zf, "html5-pause-button", "html5-play-button");
        }
        ni(this.zf, a);
    };
    ki.prototype.Ar = function () {
        this.pubsub.c("playpausetoggled");
    };
    ki.prototype.tr = function (a) {
        a.th();
        this.k("Scrubber pointer down");
        this.Ki = true;
        this.pubsub.c("beginseeking");
        He(this.uh, "move", this.tm);
        He(this.uh, "up", this.Pr);
    };
    ki.prototype.Pr = function () {
        this.k("Scrubber release");
        this.Ki = false;
        this.uh.Wa();
        this.pubsub.c("endseeking");
    };
    ki.prototype.tm = function (a) {
        a.th();
        this.k("Seek or Scrubber click/move:" + a.target.className);
        var b = goog$style$getPageOffset(this.hf);
        var b = Oc((a.clientX - b.x) / (this.hf.clientWidth - 1 - this.Tg.clientWidth / 2), 0, 1);
        this.k("seekTo " + b);
        this.Fe = b;
        oi(this);
        this.pubsub.c("seekto", b);
        a.preventDefault();
    };
    ki.prototype.xr = function (a) {
        this.k("volume pointerdown");
        this.pubsub.c("beginvolume");
        goog$dom$classes$add(this.ic, "changing");
        var b = this.tb.clientWidth;
        var a = fd(a, this.tb);
        this.k("relative pos: x: " + a.x + " and y: " + a.y);
        pi(this, (a.x / b) * 100);
        He(this.sh, "move", this.Ir);
        He(this.sh, "up", this.Jr);
    };
    ki.prototype.Ir = function (a) {
        this.k("volume pointerover");
        var b = this.tb.clientWidth;
        var c = fd(a, this.tb);
        this.k("relative pos: x: " + c.x + " and y: " + c.y);
        pi(this, (c.x / b) * 100);
        a.preventDefault();
    };
    var pi = function (a, b) {
        a.pubsub.c("volumechanged", {
            volume: Oc(b, 0, 100),
            muted: false
        });
    };
    ki.prototype.Jr = function () {
        this.k("volume pointerup");
        goog$dom$classes$remove(this.ic, "changing");
        this.sh.Wa();
        this.pubsub.c("endvolume");
    };
    ki.prototype.tn = function (a) {
        this.pubsub.c("sizechangerequested", a.currentTarget == this.og);
    };
    ki.prototype.sr = function (a) {
        this.pubsub.c("qualitychanged", yt$dom$datasets$get(a.currentTarget, "value"));
        gi(bi.getInstance(), this.vd);
    };
    ki.prototype.wr = function () {
        this.pubsub.c("fullscreentoggled");
    };
    ki.prototype.ur = function (a) {
        this.pubsub.c("speedchanged", yt$dom$datasets$get(a.currentTarget, "value"));
        if (a.target.innerHTML.indexOf("Normal") != -1) {
            this.mf.innerHTML = yt$getMsg("HTML5_SPEED_NORMAL");
            this.zd.setAttribute("aria-label", this.mf.innerHTML + " " + yt$getMsg("HTML5_SPEED_SETTING"));
        } else {
            this.mf.innerHTML = a.target.innerHTML;
            this.zd.setAttribute("aria-label", this.mf.innerHTML);
        }
    };
    var qi = function (a, b) {
        var c = goog$dom$getElementByClass("html5-threed-conversion-on", a.bk);
        var d = goog$dom$getElementByClass("html5-threed-conversion-off", a.bk);
        yt$style$setDisplayed(c, !b);
        yt$style$setDisplayed(d, b);
    };
    ki.prototype.yr = function () {
        if (!goog$dom$classes$has(this.Dc, "html5-async-progress")) {
            Rh(this.Dc, "html5-async-progress");
            this.pubsub.c("watchlater");
        }
    };
    ki.prototype.zr = function () {
        this.pubsub.c("watchonyoutube");
    };
    var ni = function (a, b) {
        var c = yt$dom$datasets$get(a, "default-title");
        var d = yt$dom$datasets$get(a, "alt-title");
        var f = yt$dom$datasets$get(a, "tooltip-title");
        if (!c) {
            c = f;
            yt$dom$datasets$set(a, "default-title", c);
        }
        c = b ? d : c;
        a.setAttribute("title", c);
        a.setAttribute("aria-label", c);
        yt$dom$datasets$set(a, "tooltip-title", c);
        yt$dom$datasets$set(a, "tooltip-text", c);
    };
    ki.prototype.La = function (a) {
        a = Oc(Math.round(a * 100), 0, 100);
        if (!this.$f[a]) {
            var b = document.createElement("div");
            b.style.left = a + "%";
            goog$dom$classes$add(b, "html5-ad-progress", "html5-progress-section");
            this.qn.appendChild(b);
            this.$f[a] = b;
        }
    };
    ki.prototype.nf = function (a) {
        a = Oc(Math.round(a * 100), 0, 100);
        if (this.$f[a]) {
            goog$dom$removeNode(this.$f[a]);
            delete this.$f[a];
        }
    };
    var ri = function (a) {
        if (a) {
            return a.toString().search(/(?:true|1)/i) != -1;
        } else {
            return false;
        }
    };
    var si = function (a, b) {
        if (!a) {
            return "";
        }
        var c = "getErrorCode" in a ? a.getErrorCode() : null;
        var d = "";
        if (!ca(c)) {
            return (b.error_code = c);
        }
        c = a.message;
        if (c.length > 50) {
            c = c.substring(0, 47) + "...";
        }
        d = c;
        return (b.error_message = d);
    };
    var ti = [4, 2];
    var ui = function (a) {
        var b = goog$getObjectByName("yt.www.watch.ads.handleMoveGutCompanion");
        if (b) {
            b(a == 1 ? true : false);
        }
    };
    var vi = function (a) {
        var b = goog$getObjectByName("showAfvCompanionAdDiv");
        if (b) {
            b(a == 1);
        }
    };
    var wi = function (a, b, c) {
        this.ta = b.name || null;
        this.qe = {};
        for (a = 0; a < c.length; a++) {
            b = c[a];
            this.qe[b.getTag()] = b;
        }
    };
    wi.prototype.getName = function () {
        return this.ta;
    };
    var xi = function (a) {
        a = cb(a.qe);
        goog$array$sort(a, function (a, c) {
            return a.getTag() - c.getTag();
        });
        return a;
    };
    var yi = function (a, b, c) {
        this.za = a;
        this.Ss = b;
        this.ta = c.name;
        this.Rn = !!c.pe;
        this.Sn = c.u;
    };
    yi.prototype.getTag = function () {
        return this.Ss;
    };
    yi.prototype.getName = function () {
        return this.ta;
    };
    var zi = function () {
        this.jb = {};
        this.Vf = this.constructor.Vf;
        this.qe = goog$object$clone(this.Vf.qe);
        this.Uf = this.Oo = null;
    };
    zi.prototype.Eo = function () {
        return this.Vf;
    };
    zi.prototype.get = function (a, b) {
        return Ai(this, a.getTag(), b);
    };
    zi.prototype.set = function (a, b) {
        var c = a.getTag();
        this.jb[c] = b;
        if (this.Uf) {
            this.Uf[c] = b;
        }
    };
    zi.prototype.add = function (a, b) {
        var c = a.getTag();
        if (!this.jb[c]) {
            this.jb[c] = [];
        }
        this.jb[c].push(b);
    };
    zi.prototype.clear = function (a) {
        delete this.jb[a.getTag()];
    };
    zi.prototype.ga = function () {
        var a = new this.constructor();
        for (var b = xi(a.Eo()), c = 0; c < b.length; c++) {
            var d = b[c];
            delete a.jb[d.getTag()];
            var f = d.getTag();
            if (f in this.jb && this.jb[f] !== undefined && this.jb[f] !== null) {
                f = d.Sn == 11 || d.Sn == 10;
                if (d.Rn) {
                    var g;
                    g = d.getTag();
                    g = Bi(this, this.qe[g]);
                    if (g != null) {
                        goog$isArray(g);
                    }
                    g = g || [];
                    for (var i = 0; i < g.length; i++) {
                        a.add(d, f ? g[i].ga() : g[i]);
                    }
                } else {
                    g = this.get(d);
                    a.set(d, f ? g.ga() : g);
                }
            }
        }
        return a;
    };
    var Bi = function (a, b) {
        var c = b.getTag();
        if ((!c) in a.jb) {
            return null;
        }
        var d = a.jb[c];
        if (d == null) {
            return null;
        }
        if (a.Oo) {
            if (!(c in a.Uf)) {
                d = a.Oo.Au(a, b, d);
                return (a.Uf[c] = d);
            } else {
                return a.Uf[c];
            }
        } else {
            return d;
        }
    };
    var Ai = function (a, b, c) {
        b = a.qe[b];
        a = Bi(a, b);
        if (b.Rn) {
            goog$isArray(a);
            return a[c || 0];
        }
        goog$isArray(a);
        return a;
    };
    var Ci = function (a, b) {
        var c = [];
        var d;
        var f;
        for (f in b) {
            if (b.hasOwnProperty(f)) {
                if (f == 0) {
                    d = b[0];
                } else {
                    c.push(new yi(a, f, b[f]));
                }
            }
        }
        a.Vf = new wi(0, d, c);
        a.Eo = function () {
            return a.Vf;
        };
    };
    var Di = {
        fv: 0,
        Nu: 1,
        bv: 2,
        ev: 3,
        qv: 4,
        Hu: 5,
        Xu: 6,
        Uu: 7,
        Vu: 8,
        Wu: 9,
        Su: 10,
        Tu: 11,
        sv: 12,
        rv: 13,
        dv: 14,
        Ku: 20,
        lv: 21,
        Ou: 22,
        Pu: 23,
        kv: 24,
        Yu: 25,
        nv: 30,
        ov: 31,
        mv: 32,
        pv: 33,
        Ru: 40,
        Qu: 41,
        tv: 42,
        uv: 43,
        Zu: 50,
        cv: 51,
        hv: 52,
        iv: 53,
        jv: 54,
        Ju: 55,
        Lu: 56,
        av: 60,
        $u: 61,
        Mu: 70,
        Iu: 80
    };
    var Ei = function () {
        zi.apply(this);
    };
    goog$inherits(Ei, zi);
    var Fi = function () {
        zi.apply(this);
    };
    goog$inherits(Fi, zi);
    var Gi = function () {
        zi.apply(this);
    };
    goog$inherits(Gi, zi);
    Gi.prototype.uo = function () {
        return Ai(this, 5);
    };
    Gi.prototype.Fk = function () {
        return Ai(this, 6);
    };
    var Hi = function () {
        zi.apply(this);
    };
    goog$inherits(Hi, zi);
    var Ii = function () {
        zi.apply(this);
    };
    goog$inherits(Ii, zi);
    Ci(Ei, {
        0: {
            name: "YtAdType",
            Ci: "video.YtAdType"
        },
        1: {
            name: "ad_namespace",
            required: true,
            u: 14,
            defaultValue: 0,
            type: {
                Tv: 0,
                xw: 1,
                Uv: 2,
                kw: 3,
                zw: 4,
                ox: 5,
                fx: 6,
                gw: 7,
                yw: 8,
                hw: 9,
                iw: 10,
                dx: 11,
                Zv: 12,
                Jx: 13
            }
        },
        2: {
            name: "ad_format",
            required: true,
            u: 14,
            defaultValue: 0,
            type: {
                Qv: 0,
                Mw: 1,
                Lw: 2,
                Tw: 3,
                yx: 4,
                Nw: 5
            }
        },
        3: {
            name: "ad_invideo",
            u: 14,
            defaultValue: 0,
            type: {
                Sv: 0,
                mw: 1,
                nw: 2,
                ow: 3,
                qw: 4,
                lw: 5,
                jw: 6
            }
        },
        4: {
            name: "invideo_autoplay",
            u: 14,
            defaultValue: 0,
            type: {
                aw: 0,
                cx: 1
            }
        },
        5: {
            name: "ad_instream",
            u: 14,
            defaultValue: 0,
            type: {
                Rv: 0,
                vx: 1
            }
        },
        6: {
            name: "ad_instream_long",
            u: 8,
            type: Boolean
        }
    });
    Ci(Fi, {
        0: {
            name: "YtAdEvent",
            Ci: "video.YtAdEvent"
        },
        1: {
            name: "ad_event_type",
            required: true,
            u: 14,
            defaultValue: 0,
            type: {
                Cv: 0,
                Jv: 1,
                Dv: 2,
                Mv: 3,
                Ev: 4,
                Fv: 5,
                zv: 6,
                yv: 7,
                xv: 8,
                vv: 9,
                Kv: 10,
                Lv: 11,
                wv: 12,
                Av: 13,
                Nv: 14,
                Bv: 15,
                Ov: 100,
                Pv: 101,
                Hv: 130,
                Gv: 131,
                Iv: 132
            }
        },
        2: {
            name: "wall_time",
            required: true,
            u: 2,
            type: Number
        },
        3: {
            name: "media_time",
            required: true,
            u: 2,
            type: Number
        },
        4: {
            name: "logentry_time_usec",
            required: true,
            u: 3,
            type: String
        },
        5: {
            name: "ad_error_type",
            u: 14,
            defaultValue: 0,
            type: Di
        }
    });
    Ci(Gi, {
        0: {
            name: "YtAdSlot",
            Ci: "video.YtAdSlot"
        },
        1: {
            name: "slot_time",
            required: true,
            u: 2,
            type: Number
        },
        2: {
            name: "ad_type",
            required: true,
            u: 11,
            type: Ei
        },
        3: {
            name: "ad_events",
            pe: true,
            u: 11,
            type: Fi
        },
        4: {
            name: "ad_video_duration",
            u: 2,
            type: Number
        },
        5: {
            name: "ad_id",
            u: 9,
            type: String
        },
        6: {
            name: "slot_index",
            u: 5,
            type: Number
        }
    });
    Ci(Hi, {
        0: {
            name: "YtVideoMetadata",
            Ci: "video.YtVideoMetadata"
        },
        1: {
            name: "content_owner_ids",
            pe: true,
            u: 9,
            type: String
        },
        2: {
            name: "video_duration_seconds",
            u: 2,
            type: Number
        },
        3: {
            name: "all_content_owner_ids",
            u: 9,
            type: String
        }
    });
    Ci(Ii, {
        0: {
            name: "YtWatchAdInfo",
            Ci: "video.YtWatchAdInfo"
        },
        1: {
            name: "video_id",
            required: true,
            u: 9,
            type: String
        },
        2: {
            name: "allowed_ads",
            pe: true,
            u: 11,
            type: Ei
        },
        3: {
            name: "ad_slots",
            pe: true,
            u: 11,
            type: Gi
        },
        4: {
            name: "ps",
            u: 9,
            type: String
        },
        5: {
            name: "el",
            u: 9,
            type: String
        },
        6: {
            name: "country",
            u: 9,
            type: String
        },
        7: {
            name: "feature",
            u: 9,
            type: String
        },
        8: {
            name: "blocked",
            u: 8,
            type: Boolean
        },
        9: {
            name: "plid",
            u: 9,
            type: String
        },
        10: {
            name: "video_metadata",
            u: 11,
            type: Hi
        },
        11: {
            name: "experiment_id",
            pe: true,
            u: 3,
            type: String
        },
        12: {
            name: "ad_flags",
            u: 4,
            type: String
        },
        13: {
            name: "all_experiment_ids",
            u: 9,
            type: String
        },
        14: {
            name: "no_ads_returned",
            u: 8,
            type: Boolean
        },
        15: {
            name: "ad_errors",
            pe: true,
            u: 14,
            defaultValue: 0,
            type: Di
        },
        16: {
            name: "ad_slot_with_event",
            u: 11,
            type: Gi
        }
    });
    var Ji = function (a) {
        this.V = a;
    };
    Ji.prototype.Aj = NaN;
    Ji.prototype.hc = function (a, b) {
        this.V.c("AD_LOGGING_EVENT", a, b);
    };
    Ji.prototype.sb = function (a, b) {
        var c = b || {};
        c.ad_error = a;
        this.hc(7, c);
    };
    Ji.prototype.ck = function (a) {
        var b = this.Xa();
        var c = goog$style$getPageOffset(a.target);
        b.ck_xy = a.pageX - c.x + "x" + (a.pageY - c.y);
        a = goog$style$getSize(a.target);
        b.ck_wh = a.width + "x" + a.height;
        this.hc(15, b);
    };
    Ji.prototype.Xa = function () {
        var a = {};
        var b = this.V.O;
        var c = this.V.Ka;
        if (b && b.getDuration() > 0) {
            a.ad_len = b.getDuration();
        }
        if (c && c.m) {
            a.ad_v = c.m;
        } else if (b.hasSrc()) {
            b = yt$uri$getDomain(b.getSrc());
            a.ad_dom = b;
        }
        a.at = this.V.getType();
        return a;
    };
    var Ki = function (a, b) {
        this.ra = new goog$pubsub$PubSub();
        this.i = a;
        this.T = b;
        this.i.e("control_toggle_play_pause", this.Bg, this);
        this.i.e("control_play", this.wm, this);
        this.i.e("control_pause", this.vm, this);
        this.L = new Ji(this);
    };
    goog$inherits(Ki, Rf);
    Ki.prototype.ni = null;
    Ki.prototype.show = function () {
        this.L.Aj = goog$now();
        var a = null;
        var b = "";
        try {
            a = this.T.getSelectedCreative();
            b = a.getMediaUrl("video/x-flv");
        } catch (c) {
            this.Pc(c);
            return;
        }
        a = b;
        if (!(b = ca(a))) {
            b = yt$uri$getDomain(a);
            b = ca(b) ? null : b.split(".").reverse();
            b = !(ca(b) ? 0 : b[0] == "com" && b[1].match(/^youtube(?:-nocookie)?$/));
        }
        if (b) {
            a = null;
        } else {
            a = yt$uri$getQueryData(a);
            a = a.v || a.video_id;
            a = ca(a)
                ? null
                : new og({
                      video_id: a
                  });
        }
        if ((this.Ka = a)) {
            this.Ka.e("onStatusFail", this.kn, this);
            this.Ka.e("videoinfo", this.ln, this);
            yg(this.Ka, hh(this.i.getEnvironmentData(), this.Ka));
        } else {
            Li(this);
        }
    };
    var Mi = function (a) {
        if (a.Ka) {
            a.Ka.H("onStatusFail", a.kn, a);
            a.Ka.H("videoinfo", a.ln, a);
        }
    };
    Ki.prototype.ln = function () {
        Mi(this);
        var a = null;
        if (this.Ka.Ae) {
            a = mg(this.Ka.Ae);
            a = ng(this.i.getEnvironmentData().Lb, a);
        }
        if (a) {
            this.T.getSelectedCreative().setMediaUrl(a.ak);
            Li(this);
        } else {
            this.Pc(Error(this.Ka.m + " does not have any supported video formats for this browser"));
        }
    };
    var Li = function (a) {
        ui(1);
        vi(1);
        var b = a.i.getRootNode();
        var c = goog$dom$getElementByClass("video-ads", b);
        a.Yg = b;
        a.Ga = new Ge(a);
        a.O = yt$player$utils$VideoTagPool$instance_.getTag();
        b = a.O;
        a.Ga.G(b, "play", a.Mr);
        a.Ga.G(b, "pause", a.Lr);
        a.Ga.G(b, "ended", a.Kr);
        a.Ga.G(b, "error", a.qj);
        a.Ga.G(b, "timeupdate", a.Nr);
        a.Qd = document.createElement("div");
        a.Ga.G(a.Qd, "click", a.Kj);
        a.Wg = goog$dom$getElementByClass("video-ad-time-left", c);
        var b = goog$dom$getElementByClass("html5-ad-progress-list", c);
        var d = document.createElement("div");
        goog$dom$classes$add(d, "html5-ad-progress", "html5-progress-section");
        b.appendChild(d);
        a.Jc = d;
        goog$dom$classes$add(a.Qd, "video-click-tracking", "ad-video");
        goog$dom$classes$add(a.O, "video-stream", "ad-video");
        c.appendChild(a.Qd);
        c.appendChild(a.O);
        goog$dom$classes$add(a.Yg, "ad-showing", "ad-interrupting");
        try {
            a.T.setClickTrackingElement(a.Qd);
            a.T.play(a.O);
        } catch (f) {
            a.Pc(f);
        }
    };
    Ki.prototype.Mr = function () {
        if (!this.or) {
            this.or = true;
            var a = this.L;
            var b = a.Xa();
            if (isNaN(a.Aj)) {
                R(
                    goog$debug$Logger$Level$SEVERE,
                    "InstreamAdDisplayStateLogger",
                    "The video player start time was not set.",
                    undefined
                );
            } else {
                var c = goog$now() - a.Aj;
                b.ad_stl = c;
            }
            a.hc(4, b);
        }
        Yg(this.i, true);
        this.c("adPlay", this);
    };
    Ki.prototype.Lr = function () {
        Yg(this.i, false);
    };
    Ki.prototype.Kr = function () {
        var a = this.L;
        var b = a.Xa();
        if (ca(a.V.O)) {
            R(
                goog$debug$Logger$Level$SEVERE,
                "InstreamAdDisplayStateLogger",
                "The video element was not set.",
                undefined
            );
        } else {
            b.ad_fmt = a.V.O.getType();
        }
        a.hc(5, b);
        this.c("adEnd", this);
    };
    Ki.prototype.qj = function () {
        this.Pc(
            Error(
                "Video ad playback failed. [" + this.O.error.code + ":" + this.O.networkState + ":" + this.O.readyState
            )
        );
    };
    Ki.prototype.Pc = function (a) {
        Mi(this);
        this.c("adError", a);
    };
    Ki.prototype.kn = function () {
        this.Pc(Error("Request to get video data failed."));
    };
    Ki.prototype.Kj = function (a) {
        this.L.ck(a);
        this.c("select");
    };
    Ki.prototype.Nr = function () {
        var a = this.O.getCurrentTime();
        this.Wg.innerHTML = yt$player$utils$Controls$formatTime(this.O.duration - a);
        if (ca(this.ni)) {
            this.ni = this.O.getDuration();
        }
        a = this.ni ? this.O.getCurrentTime() / this.ni : 0;
        this.Jc.style.width = Math.round(a * 1000) / 10 + "%";
    };
    Ki.prototype.r = function () {
        this.i.H("control_toggle_play_pause", this.Bg, this);
        this.i.H("control_play", this.wm, this);
        this.i.H("control_pause", this.vm, this);
        if (this.T) {
            this.T.unload();
            this.T = null;
        }
        goog$dom$removeNode(this.O);
        this.O = null;
        goog$dom$removeNode(this.Qd);
        this.Qd = null;
        if (this.Ga) {
            this.Ga.Wa();
        }
        Mi(this);
        if (this.Wg) {
            this.Wg.innerHTML = "";
            this.Wg = null;
        }
        if (this.Jc) {
            goog$dom$removeNode(this.Jc);
            this.Jc = null;
        }
        if (this.Yg) {
            goog$dom$classes$remove(this.Yg, "ad-showing", "ad-interrupting");
            this.Yg = null;
        }
        Ki.j.r.call(this);
    };
    Ki.prototype.getType = function () {
        return "1_2";
    };
    Ki.prototype.Bg = function () {
        if (this.O) {
            this.O.togglePlayPause();
        }
    };
    Ki.prototype.wm = function () {
        if (this.O) {
            this.O.play();
        }
    };
    Ki.prototype.vm = function () {
        if (this.O) {
            this.O.pause();
        }
    };
    var Ni = function (a, b) {
        Ki.call(this, a, b);
    };
    goog$inherits(Ni, Ki);
    Ni.prototype.getType = function () {
        return "2_2";
    };
    var Oi = function (a, b) {
        this.V = a;
        this.i = b;
        this.Lc = "InvideoAdDisplay (" + this.V.getType() + ")";
    };
    Oi.prototype.hc = function (a, b) {
        this.V.c("AD_LOGGING_EVENT", a, b);
    };
    Oi.prototype.ck = function () {
        this.Nb("Overlay ad clicked.");
        this.mk = goog$now();
        var a = this.Xa();
        if (this.Ak) {
            var b = goog$style$getBounds(this.i.getRootNode());
            var c = this.Ak.y - b.top;
            var c = Math.round(this.Ak.x - b.left) + "x" + Math.round(c);
            a.ck_xy = c;
            a.ck_wh = b.width + "x" + b.height;
        }
        this.hc(100, a);
    };
    Oi.prototype.Xa = function () {
        var a = {};
        if (this.qm && this.mk) {
            a.ot = this.mk - this.qm;
        }
        var b;
        b = this.i.isFullscreen() ? 2 : this.i.getEnvironmentData().Ed ? 1 : 0;
        a.ad_ps = b;
        a.at = this.V.getType();
        return a;
    };
    Oi.prototype.Nb = function (a) {
        R(goog$debug$Logger$Level$INFO, this.Lc, a, undefined);
    };
    var Pi = function (a, b) {
        this.ra = new goog$pubsub$PubSub();
        this.i = a;
        this.T = b;
        this.L = new Oi(this, a);
        this.Gg = new Ge(this);
    };
    goog$inherits(Pi, Rf);
    Pi.prototype.show = function () {
        this.i.e("onResize", this.mj, this);
        var a = this.i.getRootNode();
        goog$dom$classes$add(a, "ad-showing");
        a = goog$dom$getElementByClass("video-ads", a);
        this.$a = document.createElement("div");
        goog$dom$classes$add(this.$a, "ad-overlay");
        a.appendChild(this.$a);
        this.Gg.G(this.$a, "mouseup", this.Aq);
        try {
            this.T.addEventListener(google.ima.AdEvent.Type.USER_CLOSE, this.im, false, this);
            this.T.addEventListener(google.ima.AdEvent.Type.CLICK, this.Fg, false, this);
            this.mj();
            this.T.setHorizontalAlignment(google.ima.AdSlotAlignment.HorizontalAlignment.CENTER);
            this.T.setVerticalAlignment(google.ima.AdSlotAlignment.VerticalAlignment.BOTTOM);
            this.T.play(this.$a);
            var b = this.L;
            b.Nb("Overlay ad shown.");
            b.qm = goog$now();
            b.hc(3, b.Xa());
            this.c("adEnd", this);
        } catch (c) {
            this.qj(c);
        }
    };
    Pi.prototype.getType = function () {
        return "2_1";
    };
    Pi.prototype.r = function () {
        this.i.H("onResize", this.mj, this);
        var a = this.i.getRootNode();
        goog$dom$classes$remove(a, "ad-showing");
        if (this.T) {
            this.T.removeEventListener(google.ima.AdEvent.Type.USER_CLOSE, this.im, false, this);
            this.T.removeEventListener(google.ima.AdEvent.Type.CLICK, this.Fg, false, this);
            this.T.unload();
            this.T = null;
        }
        this.Gg.Wa();
        goog$dom$removeNode(this.$a);
        this.$a = null;
        Pi.j.r.call(this);
    };
    Pi.prototype.im = function () {
        var a = this.L;
        a.Nb("Overlay ad hidden.");
        a.mk = goog$now();
        a.hc(6, a.Xa());
    };
    Pi.prototype.Fg = function () {
        this.i.pauseVideo();
        this.L.ck();
    };
    Pi.prototype.Aq = function (a) {
        this.L.Ak = a.target == a.currentTarget ? null : new goog$math$Coordinate(a.pageX, a.pageY);
    };
    Pi.prototype.qj = function (a) {
        this.c("adError", a);
    };
    Pi.prototype.mj = function () {
        var a;
        a = this.$a;
        var b = goog$dom$getOwnerDocument(a);
        var c = goog$userAgent$IE && a.currentStyle;
        if (
            c &&
            goog$dom$DomHelper$isCss1CompatMode(goog$dom$getDomHelper(b)) &&
            c.width != "auto" &&
            c.height != "auto" &&
            !c.boxSizing
        ) {
            b = nd(a, c.width, "width", "pixelWidth");
            a = nd(a, c.height, "height", "pixelHeight");
            a = new goog$math$Size(b, a);
        } else {
            c = new goog$math$Size(a.offsetWidth, a.offsetHeight);
            b = pd(a);
            a = sd(a);
            a = new goog$math$Size(
                c.width - a.left - b.left - b.right - a.right,
                c.height - a.top - b.top - b.bottom - a.bottom
            );
        }
        this.T.setAdSlotWidth(a.width);
        this.T.setAdSlotHeight(a.height);
    };
    var Qi = function (a, b) {
        this.ra = new goog$pubsub$PubSub();
        this.Z = a;
        this.vb = b;
    };
    goog$inherits(Qi, Rf);
    Qi.prototype.show = function () {
        this.Nn();
        var a = {};
        a.ad_id = this.vb;
        a.at = this.getType();
        this.c("AD_LOGGING_EVENT", 3, a);
        this.c("adEnd", this);
    };
    var Ri = function (a) {
        Qi.call(this, a, NaN);
    };
    goog$inherits(Ri, Qi);
    Ri.prototype.Nn = function () {
        var a = goog$getObjectByName("afcAdCall");
        if (a) {
            a();
        }
    };
    Ri.prototype.getType = function () {
        return "2_3";
    };
    var Si = function (a) {
        this.po = a;
    };
    Si.prototype.getUrl = function () {
        return this.po;
    };
    var Ti = function (a, b) {
        this.P = a;
        this.i = b;
        this.Lc = "AdLoader (" + this.P.uk() + ")";
    };
    var Ui = function (a, b) {
        a.P.c("AD_TRACKING_EVENT", new Si(b));
    };
    Ti.prototype.Da = function () {
        var a = {};
        a.l_ns = this.P.uk();
        a.l_state = this.P.Ha;
        a.sst = this.P.ab;
        a.sidx = this.P.Fk();
        var b = this.P.Qb();
        if (b) {
            a.at = b.getType();
        }
        b = this.P.uo();
        if (!isNaN(b)) {
            a.ad_id = b;
        }
        return a;
    };
    Ti.prototype.Nb = function (a, b) {
        R(goog$debug$Logger$Level$INFO, this.Lc, a, b);
    };
    var yt$net$apiloader$API_URLS_ = {
        GOOGLE_IMA: "//www.google.com/jsapi",
        GOOGLE_MAPS_API: "//maps.google.com/maps/api/js?sensor=false",
        GOOGLE_LANGUAGE_API_VIRTUAL_KEYBOARD: "//www.google.com/jsapi?key=youtube-internal-vk",
        GOOGLE_LANGUAGE_API_INPUT_TOOLS: "//www.google.com/jsapi?key=youtube-internal-it"
    };
    var Wi = {};
    var Xi = {};
    var Yi = {};
    var $i = function () {
        goog$exportSymbol("yt.net.apiloader.onApiLoaded_GOOGLE_IMA", function () {
            Zi();
        });
    };
    var Zi = function () {
        Xi.GOOGLE_IMA = true;
        goog$array$forEach(Yi.GOOGLE_IMA, function (a) {
            a.call();
        });
        delete Yi.GOOGLE_IMA;
    };
    var aj = function () {
        this.ra = new goog$pubsub$PubSub();
        this.he = "unloaded";
    };
    goog$inherits(aj, Rf);
    goog$addSingletonGetter(aj);
    aj.prototype.load = function () {
        if (this.he == "unloaded") {
            this.he = "loading";
            this.Kn();
        } else if (this.he == "loaded") {
            this.c("googleAdSdkLoaded", this);
        } else if (this.he == "error") {
            this.ef();
        }
    };
    aj.prototype.Kn = function () {
        if (goog$getObjectByName("google.load")) {
            google.load("ima", "1", {
                callback: goog$bind(this.eh, this)
            });
        } else {
            var a = goog$bind(this.Kn, this);
            var b = yt$net$apiloader$API_URLS_.GOOGLE_IMA;
            if (b) {
                if (Xi.GOOGLE_IMA) {
                    a.call();
                } else {
                    if (!Yi.GOOGLE_IMA) {
                        Yi.GOOGLE_IMA = [];
                    }
                    Yi.GOOGLE_IMA.push(a);
                    if (!Wi.GOOGLE_IMA) {
                        $i();
                        b = yt$uri$appendQueryData(b, {
                            callback: "yt.net.apiloader.onApiLoaded_GOOGLE_IMA"
                        });
                        a = document.createElement("script");
                        a.src = b;
                        document.body.appendChild(a);
                        Wi.GOOGLE_IMA = true;
                    }
                }
            }
        }
    };
    aj.prototype.eh = function () {
        try {
            this.Hh = new google.ima.AdsLoader();
            this.Hh.addEventListener(google.ima.AdsLoadedEvent.Type.ADS_LOADED, this.Zr, false, this);
            this.Hh.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.Yr, false, this);
            this.he = "loaded";
        } catch (a) {
            this.Xr = a;
            this.ef();
            return;
        }
        this.c("googleAdSdkLoaded", this);
    };
    aj.prototype.ef = function () {
        R(goog$debug$Logger$Level$SEVERE, "GoogleAdsSdk", "SDK load failure", undefined);
        this.he = "error";
        this.c("googleAdSdkError", this.Xr);
    };
    aj.prototype.Zr = function (a) {
        var b = a.getAdsManager();
        var a = a.getUserRequestContext();
        this.c("adLoaded", b, a);
    };
    aj.prototype.Yr = function (a) {
        var b = a.getError();
        if (b.getType() == google.ima.AdError.Type.AD_LOAD) {
            a = a.getUserRequestContext();
            this.c("adError", b, a);
        }
    };
    aj.prototype.requestAds = function (a, b) {
        if (this.Hh) {
            this.Hh.requestAds(a, b);
        } else {
            R(
                goog$debug$Logger$Level$SEVERE,
                "GoogleAdsSdk",
                "You cannot call requestAds() without an IMA AdsLoader!",
                undefined
            );
        }
    };
    var bj = function (a, b, c, d, f) {
        this.ra = new goog$pubsub$PubSub();
        this.ab = a;
        this.Ns = b;
        this.Os = c;
        this.Z = d;
        this.Ha = f;
        this.L = new Ti(this, d);
    };
    goog$inherits(bj, Rf);
    bj.prototype.Od = null;
    bj.prototype.vb = NaN;
    bj.prototype.load = function () {
        var a = this.Z.td();
        var b = this.Ha == 1 ? 190 : 200;
        if (a.width < 200 || a.height < b) {
            b = this.L;
            R(goog$debug$Logger$Level$WARNING, b.Lc, "The player size is too small to show an ad.", undefined);
            var c = b.Da();
            c.ck_wh = a.width + "x" + a.height;
            b.i.sb(14, c);
            this.cf();
        } else {
            this.cb = aj.getInstance();
            this.cb.e("googleAdSdkLoaded", this.eh, this);
            this.cb.e("googleAdSdkError", this.ef, this);
            this.cb.load();
        }
    };
    bj.prototype.getSlotId = function () {
        return this.Ns;
    };
    bj.prototype.Fk = function () {
        return this.Os;
    };
    bj.prototype.uo = function () {
        return this.vb;
    };
    bj.prototype.eh = function () {
        cj(this);
        dj(this.Z, "sdk");
        var a = this.L;
        a.Nb("Making an ad request.");
        a.i.fc(9, a.Da());
        a = this.gn();
        switch (this.Ha) {
            case 1:
                a.adType = google.ima.SimpleAdsRequest.AdType.VIDEO;
                break;
            case 2:
            case 4:
                a.adType = google.ima.SimpleAdsRequest.AdType.OVERLAY;
        }
        var b = this.Ha;
        var c = goog$getObjectByName("yt.www.watch.ads.setGutSlotSizes");
        if (c) {
            var d = b == 1;
            var b = goog$array$contains(ti, b);
            c(d, b);
        }
        this.cb.e("adLoaded", this.of, this);
        this.cb.e("adError", this.dc, this);
        try {
            this.cb.requestAds(a, this);
        } catch (f) {
            this.dc(f, this);
        }
    };
    bj.prototype.ef = function (a) {
        cj(this);
        this.dc(a, this);
    };
    var cj = function (a) {
        if (a.cb) {
            a.cb.H("googleAdSdkLoaded", a.eh, a);
            a.cb.H("googleAdSdkError", a.ef, a);
            a.cb.H("adLoaded", a.of, a);
            a.cb.H("adError", a.dc, a);
        }
    };
    bj.prototype.of = function (a, b) {
        if (b === this) {
            var c = a.getType();
            var d = this.L;
            d.Nb("Ad request with a type of " + c + " loaded.");
            var f = d.Da();
            f.ad_man = c;
            d.i.fc(12, f);
            d = false;
            switch (c) {
                case google.ima.AdsManager.AdsManagerType.VIDEO:
                    d = this.dn(a);
                    break;
                case google.ima.AdsManager.AdsManagerType.OVERLAY:
                    d = this.en(a);
                    break;
                case google.ima.AdsManager.AdsManagerType.CUSTOM_CONTENT:
                    d = this.cn(a);
                    break;
                default:
                    c = this.L;
                    R(goog$debug$Logger$Level$WARNING, c.Lc, "The type of ad from the SDK is not supported", undefined);
                    c.i.sb(33);
            }
            if (d) {
                this.c("adLoaded", this);
            } else {
                this.cf();
            }
        }
    };
    bj.prototype.dc = function (a, b) {
        if (b === this) {
            var c = this.L;
            var d = c.Da();
            var f = "";
            if (a) {
                f = si(a, d);
            }
            R(goog$debug$Logger$Level$WARNING, c.Lc, "Problem loading ad from SDK. " + f, a);
            c.i.sb(32, d);
            this.cf();
        }
    };
    bj.prototype.cf = function () {
        this.c("adError", this);
    };
    bj.prototype.r = function () {
        cj(this);
        bj.j.r.call(this);
    };
    bj.prototype.Qb = function () {
        return this.Od;
    };
    var ej = function (a, b, c, d, f) {
        bj.call(this, a, b, c, d, f);
        if ((a = goog$getObjectByName("setAfvCompanionVars"))) {
            a(f == 1);
        }
    };
    goog$inherits(ej, bj);
    ej.prototype.uk = function () {
        return 2;
    };
    ej.prototype.gn = function () {
        var a = new google.ima.AdSenseAdsRequest();
        var b = this.Z.M;
        var c = re("video-container", this.Z.getRootNode());
        var c = goog$style$getSize(c);
        a.adSlotHeight = c.height;
        a.adSlotWidth = c.width;
        a.adTimePosition = this.ab == 0 || this.ab == -1 ? this.ab : this.ab * 1000;
        if (!isNaN(b.age)) {
            a.age = b.age;
        }
        switch (this.Ha) {
            case 1:
                a.channels = b.Tr;
                break;
            case 2:
                a.channels = b.Wr;
        }
        a.contentId = b.contentId;
        a.descriptionUrl = b.descriptionUrl;
        a.gender = b.gender;
        a.host = b.host;
        if (!isNaN(b.hostTierId)) {
            a.hostTierId = b.hostTierId;
        }
        a.language = this.Z.getEnvironmentData().Eb;
        a.maxTotalAdDuration = b.Vr;
        a.publisherId = b.publisherId;
        a.allowCompanionBeforeMaster = this.getSlotId() == 0;
        a.allowUnrelatedCompanion = true;
        a.allowSuperCampaigns = b.Ur;
        a.experimentId = b.Sr;
        a.previousSearchQuery = b.previousSearchQuery;
        a.previousWatchVideoId = b.previousWatchVideoId;
        return a;
    };
    ej.prototype.dn = function (a) {
        this.Od = new Ni(this.Z, a);
        return true;
    };
    ej.prototype.en = function (a) {
        if (!this.Z.M.Rr) {
            this.ab = 10;
            this.Z.fc(1);
        }
        vi(this.Ha);
        this.Od = new Pi(this.Z, a);
        return true;
    };
    ej.prototype.cn = function () {
        return false;
    };
    ej.prototype.cf = function () {
        if (this.Z.M.Xm || this.Ha == 2) {
            this.Od = new Ri(this.Z);
            this.c("adLoaded", this);
        } else {
            ej.j.cf.call(this);
        }
    };
    var fj = function (a) {
        if (typeof DOMParser != "undefined") {
            return new DOMParser().parseFromString(a, "application/xml");
        }
        if (typeof ActiveXObject != "undefined") {
            var b = new ActiveXObject("MSXML2.DOMDocument");
            if (b) {
                b.resolveExternals = false;
                b.validateOnParse = false;
                try {
                    b.setProperty("ProhibitDTD", true);
                    b.setProperty("MaxXMLSize", 2048);
                    b.setProperty("MaxElementDepth", 256);
                } catch (c) {}
            }
            b.loadXML(a);
            return b;
        }
        throw Error("Your browser does not support loading xml documents");
    };
    var gj = function (a, b, c) {
        this.vb = a;
        this.pr = b;
        this.qr = c;
    };
    var hj = function (a, b) {
        var c = a.getElementsByTagName(b);
        goog$asserts$assert(c.length == 1, "Expected to find 1 element with a tagName of " + b);
        c = c[0];
        Ga(c.firstChild, Text, "The " + b + " element should contain a text node.");
        return goog$string$trim(c.firstChild.data);
    };
    var ij = function (a) {
        if (a.co) {
            var b = (this.dp = a.co);
            var c = b.indexOf(";sz=");
            var a = Ze(b.substring(c), ";");
            var b = b.substring(0, c).split("pfadx");
            if (
                (a =
                    b.length != 2
                        ? null
                        : {
                              Nt: b[0],
                              Pt: b[1],
                              Qt: a
                          })
            ) {
                this.qo = a.Nt;
                this.so = a.Pt;
                this.Xs = a.Qt;
            }
        }
    };
    ij.prototype.dp = "";
    ij.prototype.qo = "";
    ij.prototype.Tk = "";
    ij.prototype.so = "";
    var jj = function (a, b) {
        var c = goog$object$clone(a.Xs);
        if (b.Xc && b.Xc.length) {
            c.sz = b.Xc.join(",");
        }
        if (b.Tj) {
            c.pos = b.Tj;
        }
        if (b.lh) {
            c.dc_seed = b.lh;
        }
        if (b.Zd) {
            c.tile = b.Zd.toString();
        }
        if (b.Jk) {
            c.kmyd = b.Jk;
        }
        var d;
        if (!(d = b.xu)) {
            if (!a.Tk) {
                a.Tk = Math.floor(Math.random() * 999999999).toString();
            }
            d = a.Tk;
        }
        c.ord = d;
        c = $e(c);
        return [a.qo, b.uf, a.so, ";", c, "?"].join("");
    };
    var kj = function (a, b, c) {
        Qi.call(this, a, b);
        this.su = c;
    };
    goog$inherits(kj, Qi);
    kj.prototype.Nn = function () {
        var a = this.su;
        var b = goog$getObjectByName("setCompanion");
        if (b) {
            b(a);
        }
    };
    kj.prototype.getType = function () {
        return "1_3";
    };
    var lj = function (a, b, c, d, f) {
        bj.call(this, a, b, c, d, f);
        this.Rj = new ij(this.Z.M);
    };
    goog$inherits(lj, bj);
    lj.prototype.uk = function () {
        return 1;
    };
    lj.prototype.gn = function () {
        var a = new google.ima.SimpleAdsRequest();
        var b;
        a: {
            b = this.Rj;
            var c = this.Fk();
            switch (this.Ha) {
                case 1:
                    b = jj(b, {
                        uf: "pfadx",
                        Xc: ["480x360"],
                        Tj: this.ab == 0 ? "pre" : this.ab == -1 ? "post" : "mid;pos=" + c,
                        Zd: c + 1,
                        Jk: "watch-longform-ad"
                    });
                    break a;
                case 4:
                    b = jj(b, {
                        uf: "pfadx",
                        Jk: "watch-longform-ad",
                        Xc: ["480x70"],
                        Zd: "1"
                    });
                    break a;
                default:
                    b = "";
            }
        }
        a.adTagUrl = b;
        return a;
    };
    lj.prototype.dn = function (a) {
        this.Od = new Ki(this.Z, a);
        return true;
    };
    lj.prototype.en = function () {
        return false;
    };
    lj.prototype.cn = function (a) {
        a = a.getAds()[0];
        try {
            var b;
            var c = a.getContent();
            var d = fj(c);
            var f = parseInt(hj(d, "adId"), 10);
            var g = hj(d, "trackImp");
            var i = hj(d, "rm") == "true";
            b = new gj(f, g, i);
        } catch (m) {
            b = this.L;
            b.Nb("Problem parsing custom content XML.", m);
            b.i.sb(20);
            return false;
        }
        if (isNaN(b.vb)) {
            c = this.L;
            R(goog$debug$Logger$Level$WARNING, c.Lc, "ID missing from ad", undefined);
            c.i.sb(41, c.Da());
        }
        this.vb = b.vb;
        c = this.Rj;
        d = this.vb;
        a: switch (this.Ha) {
            case 1:
                c = jj(c, {
                    Tj: this.ab == 0 ? "pre" : this.ab == -1 ? "post" : "mid;pos=" + d,
                    uf: "adi",
                    lh: d,
                    Xc: ["300x60"],
                    Zd: "1"
                });
                break a;
            case 4:
                c = jj(c, {
                    uf: "adi",
                    lh: d,
                    Xc: ["300x250"],
                    Zd: "1"
                });
                break a;
            default:
                c = null;
        }
        d = this.L;
        f = b.pr;
        if (ca(f) || !f.length) {
            d.i.sb(40, d.Da());
        } else {
            Ui(d, f);
            Ui(d, d.Da());
        }
        if (this.Ha == 4) {
            Ui(
                this.L,
                jj(this.Rj, {
                    uf: "adx",
                    lh: this.vb,
                    Xc: ["450x60"],
                    Zd: "1"
                })
            );
        }
        if (b.qr) {
            if (this.Ha != 1 && (b = goog$getObjectByName("closeInPageAdIFrame"))) {
                b();
            }
            if (!ca(c)) {
                Ui(this.L, c);
            }
            b = this.L;
            b.Nb("Showing remnant.");
            b.i.sb(21, b.Da());
            return false;
        }
        if (c && this.Ha == 4) {
            this.Od = new kj(this.Z, b.vb, c);
        } else if (c) {
            Ui(this.L, c);
        }
        b = this.L;
        b.Nb("Not showing remnant.");
        b.i.sb(24, b.Da());
        return true;
    };
    var mj = function (a, b, c) {
        this.ra = new goog$pubsub$PubSub();
        this.id = a;
        this.index = b || 0;
        this.jk = !!c;
        this.sf = [];
    };
    goog$inherits(mj, Rf);
    mj.prototype.jk = false;
    mj.prototype.In = false;
    mj.prototype.P = null;
    mj.prototype.V = null;
    mj.prototype.load = function () {
        if (this.P) {
            this.P.e("adLoaded", this.of, this);
            this.P.e("adError", this.dc, this);
            this.P.e("AD_TRACKING_EVENT", this.tf, this);
            this.P.load();
        } else {
            R(goog$debug$Logger$Level$SEVERE, "AdSlot", "No Ad Loader", undefined);
        }
    };
    mj.prototype.of = function () {
        nj(this);
        if (this.P.Qb()) {
            this.V = this.P.Qb();
            this.c("adLoaded", this, this.P.ab);
        } else {
            this.dc();
        }
    };
    mj.prototype.dc = function () {
        nj(this);
        this.c("adError", this);
    };
    mj.prototype.tf = function (a) {
        this.c("AD_TRACKING_EVENT", a);
    };
    var nj = function (a) {
        a.P.H("adLoaded", a.of, a);
        a.P.H("adError", a.dc, a);
        a.P.H("AD_TRACKING_EVENT", a.tf, a);
    };
    mj.prototype.Qb = function () {
        return this.V;
    };
    mj.prototype.show = function () {
        this.V.e("adPlay", this.es, this);
        this.V.e("adEnd", this.ds, this);
        this.V.e("adError", this.Pc, this);
        this.V.e("AD_LOGGING_EVENT", this.gs, this);
        this.V.e("select", this.Kj, this);
        this.V.show();
    };
    mj.prototype.es = function () {
        this.c("adPlay", this);
    };
    mj.prototype.ds = function () {
        this.c("adEnd", this);
    };
    mj.prototype.Kj = function () {
        this.In = true;
    };
    mj.prototype.gs = function (a, b) {
        this.c("AD_LOGGING_EVENT", a, b);
    };
    mj.prototype.Pc = function (a) {
        this.c("adError", this, a);
    };
    mj.prototype.r = function () {
        mj.j.r.call(this);
        Uc(this.P);
        Uc(this.V);
    };
    var oj = function (a, b) {
        this.ra = new goog$pubsub$PubSub();
        this.oa = b;
        this.i = a;
        this.ee = "unloaded";
        this.sa = [];
        this.hh = [];
        this.sf = [];
        this.nn = {};
        this.Mc = [];
    };
    goog$inherits(oj, Rf);
    oj.prototype.start = NaN;
    oj.prototype.hk = true;
    oj.prototype.Ze = false;
    oj.prototype.isVisible = true;
    oj.prototype.Yd = NaN;
    oj.prototype.Jn = false;
    oj.prototype.ei = NaN;
    oj.prototype.Ja = function () {
        if (!isNaN(this.start)) {
            if (this.start == 0) {
                return -2147483648;
            } else if (this.start == -1 || this.start == -2) {
                return 2147483647;
            } else {
                return this.start * 1000;
            }
        } else {
            return null;
        }
    };
    var pj = function (a, b) {
        a.sa.push(b);
    };
    oj.prototype.ae = function () {
        return this.ee == "loaded" || this.ee == "error";
    };
    var qj = function (a) {
        if (!a.ae) {
            throw Error("Preroll status is undefined before ad load.");
        }
        return a.start == 0 && a.Ze;
    };
    oj.prototype.Dh = function () {
        this.ee = "loading";
        var a = this.sa.length;
        var b = this.sf.shift();
        if (!b || a == 0) {
            this.ee = "error";
            goog$array$forEach(this.sa, Uc);
            this.sa = [];
            rj(this);
        } else {
            this.hh = [];
            goog$array$forEach(
                this.sa,
                function (a) {
                    if (!this.nn[a.id]) {
                        if (!a.jk) {
                            this.Jn = true;
                        }
                        var d;
                        a: {
                            d = this.start;
                            var f = a.id;
                            var g = a.index;
                            var i = this.i;
                            switch (b) {
                                case 1:
                                    d = new ej(d, f, g, i, 1);
                                    break a;
                                case 2:
                                    d = new ej(d, f, g, i, 2);
                                    break a;
                                case 3:
                                    d = new lj(d, f, g, i, 1);
                                    break a;
                                case 4:
                                    d = new lj(d, f, g, i, 4);
                                    break a;
                                default:
                                    d = null;
                            }
                        }
                        a.P = d;
                        this.hh.push(a);
                    }
                },
                this
            );
            if (this.start == 0) {
                dj(this.i, "nl");
            }
            sj(this);
        }
    };
    oj.prototype.getId = function () {
        return this.oa;
    };
    var sj = function (a) {
        if (a.hh.length) {
            var b = a.hh.shift();
            b.e("adLoaded", a.rn, a);
            b.e("adError", a.sn, a);
            b.e("AD_TRACKING_EVENT", a.tf, a);
            b.load();
        } else {
            tj(a);
        }
    };
    var uj = function (a, b) {
        b.H("adEnd", a.zn, a);
        b.H("adError", a.An, a);
        b.H("AD_LOGGING_EVENT", a.yn, a);
    };
    oj.prototype.sn = function (a) {
        this.ei = !this.ei ? a.id : Math.min(this.ei, a.id);
        Oa(this.sa, a);
        Uc(a);
        sj(this);
    };
    oj.prototype.tf = function (a) {
        this.Mc.push(a);
    };
    oj.prototype.rn = function (a, b) {
        this.start = b;
        a.H("adLoaded", this.rn, this);
        a.H("adError", this.sn, this);
        a.H("AD_TRACKING_EVENT", this.tf, this);
        this.nn[a.id] = true;
        if (this.oa == 0) {
            this.i.Gn.at = a.Qb().getType();
        }
        if (a.Qb() instanceof Ki) {
            this.Ze = true;
        } else if (a.Qb() instanceof Qi) {
            this.isVisible = false;
        }
        sj(this);
    };
    var tj = function (a) {
        if (
            a.Jn &&
            !goog$array$some(a.sa, function (a) {
                return a.Qb() && !a.jk;
            }) &&
            a.sf.length
        ) {
            pj(a, new mj(a.ei));
            a.Dh();
        } else {
            a.ee = "loaded";
            rj(a);
        }
    };
    var rj = function (a) {
        a.c("adBreakComplete", a);
    };
    oj.prototype.r = function () {
        oj.j.r.call(this);
        goog$array$forEach(this.sa, Uc);
        this.sa = [];
        this.sf = this.sa = null;
    };
    oj.prototype.show = function () {
        if (isNaN(this.Yd) && this.sa.length != 0) {
            this.Yd = 0;
            var a = this.sa[this.Yd];
            if (a.Qb() instanceof Ki) {
                dj(this.i, "bs");
            }
            a.e("adEnd", this.zn, this);
            a.e("adError", this.An, this);
            a.e("AD_LOGGING_EVENT", this.yn, this);
            a.show();
        }
    };
    oj.prototype.zn = function (a) {
        if (this.Ze) {
            uj(this, a);
            a = this.i;
            if ((a.s.getVideoData().Be || {}).shortform && !a.Hn) {
                qf(a.getEnvironmentData().Db + "mac_204?action_fcts=1");
                a.Hn = true;
            }
            if (this.sa[this.Yd].In) {
                this.hk = false;
            }
        }
        rj(this);
    };
    oj.prototype.An = function (a, b) {
        if (b) {
            var c = {};
            var d = si(b, c);
            R(goog$debug$Logger$Level$SEVERE, "AdBreak", "Error playing ad slot. " + d, undefined);
            c.sst = this.start;
            c.sidx = this.Yd;
            this.i.sb(32, c);
        }
        uj(this, a);
        rj(this);
    };
    oj.prototype.yn = function (a, b) {
        b.sst = this.start;
        b.sidx = this.Yd;
        this.i.fc(a, b);
    };
    var goog$json$Serializer = function (a) {
        this.br = a;
    };
    var xj = function (a) {
        try {
            var b = fj(a).getElementsByTagName("AdBreak");
            var c = goog$array$map(b, function (a) {
                a = a.getAttribute("time");
                return ya(a);
            });
            return new goog$json$Serializer(c);
        } catch (d) {
            return new goog$json$Serializer([0]);
        }
    };
    var yj = function (a) {
        return goog$array$contains(a.Mb, "908301");
    };
    var zj = function (a) {
        if (a.M.Yn) {
            var b = [];
            var c = a.M;
            if (c.Ck) {
                if (c.Qh) {
                    b.push(3);
                } else if (c.Tn) {
                    b.push(4);
                }
            }
            if (c.Oh && yj(a.getEnvironmentData())) {
                b.push(1);
            }
            if (c.Ph) {
                b.push(2);
            }
        } else {
            var b = [];
            var c = a.M;
            var d = c.Qh;
            if (c.Ck && d) {
                b.push(3);
            }
            if (c.Oh && yj(a.getEnvironmentData())) {
                b.push(1);
            }
        }
        return (a = b);
    };
    var Aj = function (a) {
        this.ra = new goog$pubsub$PubSub();
        this.i = a;
        this.Ia = [];
    };
    goog$inherits(Aj, Rf);
    Aj.prototype.Us = 0;
    Aj.prototype.Vs = 0;
    var Bj = function (a, b, c) {
        var d = new oj(a.i, a.Us++);
        d.start = b;
        for (b = 0; b < 1; b++) {
            var f = d;
            var g = new mj(a.Vs++, 0, false);
            pj(f, g);
        }
        d.sf = c;
        return d;
    };
    Aj.prototype.complete = function () {
        this.c("adBreaksComplete", this.Ia);
    };
    var Cj = function (a) {
        this.apply(a);
    };
    Cj.prototype.apply = function (a) {
        this.Om = a.ad_slots;
        this.Pm = a.ad_breaks;
        this.Er = a.ad_flags || 0;
        this.Sr = a.cafe_experiment_id;
        this.co = a.ad_tag;
        this.age = parseInt(a.cust_age, 10);
        this.contentId = (a.wl_cid ? "" : "yt_") + a.video_id;
        this.Fr = a.cid;
        this.descriptionUrl = a.ad_eurl;
        this.Or = a.excluded_ads;
        var b = parseInt(a.cust_gender, 10);
        if (!isNaN(b)) {
            this.gender = b;
        }
        this.host = a.ad_host;
        this.hostTierId = parseInt(a.ad_host_tier, 10);
        this.Gr = a.ad_logging_flag == 1;
        this.Oh = ri(a.aftv);
        this.Ph = ri(a.afv);
        this.Ck = ri(a.dclk);
        this.Hr = !!a.fqsf;
        this.Qh = ri(a.instream);
        this.Tn = ri(a.mpu);
        this.Yn = ri(a.sffb);
        this.Rr = a.wl_cid && a.wl_ad_slots;
        this.Ur = a.as_launched_in_country == "1";
        b = a.ad_channel_code_instream;
        this.Tr = goog$isString(b) ? b.split(",") : [];
        this.Dn = a.sf30;
        b = parseInt(a.afv_instream_max, 10);
        if (this.Dn) {
            b = 30000;
        } else if (isNaN(b)) {
            b = 15000;
        }
        this.Vr = b;
        b = a.ad_channel_code_overlay;
        this.Wr = goog$isString(b) ? b.split(",") : [];
        this.publisherId = a.ad_video_pub_id;
        this.previousWatchVideoId = a.p_w;
        this.Xm = this.Oh && this.Yn && !this.Ph;
        this.qs = this.Ph || this.Xm;
    };
    var Ej = function (a, b) {
        this.i = a;
        this.va = b;
        this.$r = goog$now();
        this.M = a.M;
        this.ke = {};
        this.On = 0;
        this.ke.allowed = Dj(this);
        var c = this.M.Or;
        if (c) {
            this.ke.ex_ads = c;
        }
        if ((c = this.M.Dn)) {
            this.ke.sf30 = c;
        }
    };
    Ej.prototype.Do = null;
    Ej.prototype.fc = function (a, b) {
        var c = b || {};
        var d = (goog$now() - this.$r) / 1000;
        c.art = d;
        d = this.i.getEnvironmentData();
        c.feature = d.Yb;
        c.ad_flags = this.M.Er;
        if ((d = this.M.Fr)) {
            c.cid = d;
        }
        c.mt = this.va.getCurrentTime();
        if ((d = this.va.getDuration())) {
            c.len = d;
        }
        if (this.M.Hr) {
            c.fqsf = 1;
        }
        c.ad_event = a;
        if (this.M.Gr) {
            var f;
            a: {
                var d = this.ke;
                var g = goog$object$clone(c);
                for (f in d) {
                    if (f in g) {
                        f = null;
                        break a;
                    }
                    g[f] = d[f];
                }
                f = g;
            }
            if (ca(f)) {
                this.i.log(this.ke);
            } else {
                c = f;
            }
            this.i.log(c);
            this.ke = {};
        }
    };
    var Dj = function (a) {
        if (a.Do) {
            return a.Do;
        }
        var b = [];
        if (a.M.Ck) {
            if (a.M.Qh) {
                b.push("1_2");
            }
            if (a.M.Tn) {
                b.push("1_3");
            }
        }
        if (a.M.Ph) {
            b.push("2_1");
        }
        if (a.M.Oh && a.M.Qh) {
            b.push("2_2");
        }
        if (a.M.qs) {
            b.push("2_3");
        }
        return b.join(",");
    };
    var Fj = function (a, b) {
        this.Ia = b;
        this.fe = [];
        this.oj = {};
        this.fb = {};
        this.i = a;
    };
    goog$inherits(Fj, Sc);
    Fj.prototype.Oc = null;
    Fj.prototype.Dh = function () {
        if (!this.fe.length) {
            goog$array$sort(this.Ia, function (a, c) {
                return a.getId() - c.getId();
            });
            this.fe = goog$array$filter(this.Ia, function (a) {
                return a.ee == "unloaded";
            });
            if (this.fe.length == 0) {
                R(goog$debug$Logger$Level$SEVERE, "AdPlaylist", "Could not find any ad breaks to load", undefined);
                Qg(this.i);
            } else {
                var a = La(this.fe, function (a) {
                    return a.start == 0;
                });
                if (ca(a)) {
                    Qg(this.i);
                }
                Gj(this);
            }
        }
    };
    var Gj = function (a) {
        if (a.fe.length) {
            var b = a.fe.shift();
            b.e("adBreakComplete", a.nk, a);
            b.Dh();
        }
    };
    Fj.prototype.nk = function (a) {
        a.H("adBreakComplete", this.nk, this);
        yt$setTimeout(goog$bind(this.Gt, this, a), 0);
    };
    Fj.prototype.Gt = function (a) {
        var b = goog$array$indexOf(this.Ia, a);
        var c = this.Ia[b + 1];
        var b = this.Ia[b - 1];
        var d = 2147483646;
        if (a.start == -2 || a.start == -1) {
            d = -2147483648;
        } else if (c && c.start != 2147483647) {
            d = c.Ja() - 1;
        }
        if (a.oa == 0) {
            dj(this.i, "bl");
            if (!qj(a)) {
                dj(this.i, "fb");
            }
        }
        if ((c = !a.ae() || !(a.sa.length > 0))) {
            if (b && b.ae()) {
                var f = b.Ja();
                if (f > d) {
                    d = f;
                }
                Hj(this, b);
                this.Fh(b, d);
            }
        } else {
            this.oj[a.getId()] = a;
            this.Fh(a, d);
        }
        Qg(this.i);
        if (c) {
            this.df(a);
        }
        Gj(this);
    };
    Fj.prototype.Fh = function (a, b) {
        var c = a.Ja();
        if (c) {
            var d = {};
            d.priority = a.start != -2 ? 1 : 2;
            d.id = a.getId();
            d.visible = a.isVisible;
            c = new Ef(c, b, d);
            this.fb[a.getId()] = c;
            this.i.addCueRange(c);
        }
    };
    var Hj = function (a, b) {
        if (a.fb[b.getId()]) {
            a.i.removeCueRange(a.fb[b.getId()]);
            delete a.fb[b.getId()];
        }
    };
    Fj.prototype.df = function (a) {
        a.H("adBreakComplete", this.nk, this);
        if (this.Oc && a == this.Oc) {
            this.Oc = null;
        }
        Hj(this, a);
        Oa(this.Ia, a);
        delete this.oj[a.getId()];
        Uc(a);
    };
    Fj.prototype.Nq = function (a) {
        this.Oc = null;
        if (a.Ze) {
            if (a.start != -1 && a.hk) {
                Ij(this.i);
            } else if (qj(a) && !a.hk) {
                Ij(this.i);
            } else {
                Xg(this.i);
                Wg(this.i);
                Yg(this.i, false);
            }
            this.df(a);
        } else if (a.isVisible) {
            Hj(this, a);
        } else {
            this.df(a);
        }
    };
    Fj.prototype.r = function () {
        goog$array$forEach(this.Ia, this.df, this);
        Fj.j.r.call(this);
    };
    var Jj = function (a, b) {
        this.Ia = b;
        this.i = a;
        goog$array$forEach(
            b,
            function (a) {
                a.e("adBreakComplete", this.Cn, this);
            },
            this
        );
        this.Mc = {};
    };
    goog$inherits(Jj, Sc);
    Jj.prototype.Cn = function (a) {
        if (!a.Tc) {
            this.Qn(a);
            if (a.start == 0) {
                goog$array$forEach(a.Mc, this.xm, this);
            } else {
                this.Fh(a);
            }
        }
    };
    Jj.prototype.Fh = function (a) {
        var b = a.Ja();
        if (b) {
            var c = "ADT_" + a.getId();
            var b = new Ef(b, 2147483647, {
                id: c,
                priority: 0
            });
            this.Mc[c] = a.Mc;
            this.i.addCueRange(b);
        }
    };
    Jj.prototype.Qn = function (a) {
        if (!a.Tc) {
            a.H("adBreakComplete", this.Cn, this);
        }
    };
    Jj.prototype.xm = function (a) {
        if (goog$isString(a.po)) {
            a = a.getUrl();
            R(goog$debug$Logger$Level$INFO, "AdTrackingPlaylist", "Ping sent to " + a + ".", undefined);
            qf(a);
        } else {
            a = a.getUrl();
            R(goog$debug$Logger$Level$INFO, "AdTrackingPlaylist", "Sending 204 impression.", undefined);
            this.i.fc(13, a);
        }
    };
    Jj.prototype.r = function () {
        Jj.j.r.call(this);
        goog$array$forEach(this.Ia, this.Qn, this);
    };
    var Kj = function (a) {
        V.call(this, a);
        this.Cd = {};
        this.Gn = {
            at: 0
        };
    };
    goog$inherits(Kj, V);
    Kj.prototype.W = "ad";
    Kj.prototype.le = "ad";
    Kj.prototype.Rd = null;
    Kj.prototype.Hn = false;
    Kj.prototype.zb = function (a) {
        return a.getVideoData().Z;
    };
    Kj.prototype.create = function () {
        Kj.j.create.call(this);
        this.loaded = true;
        dj(this, "i");
        this.M = new Cj(this.s.getVideoData().Be || {});
        this.Hj = new Ej(this, this.s);
        ui();
        this.Rd = new Aj(this);
        this.Rd.e("adBreaksComplete", this.Tm, this);
        var a = this.Rd;
        try {
            var b = a.i.M;
            var c;
            if (b.Pm) {
                c = xj(b.Pm);
            } else {
                var d;
                if (b.Om) {
                    var f = goog$array$map(b.Om.split(","), ya);
                    d = new goog$json$Serializer(f);
                } else {
                    d = new goog$json$Serializer([0]);
                }
                c = d;
            }
            for (var g = c.br, b = 0; b < g.length; b++) {
                a.Ia.push(Bj(a, g[b], zj(a.i)));
            }
            a.complete();
        } catch (i) {
            R(goog$debug$Logger$Level$SEVERE, "BaseAdBreakDefiner", "Break Definer Error", i);
            a.complete();
        }
        a = {};
        a.allowed = Dj(this.Hj);
        Tg(this, {}, a);
    };
    Kj.prototype.destroy = function () {
        this.loaded = false;
        Uc(this.Rd);
        this.Rd = null;
        Uc(this.ff);
        this.ff = null;
        Uc(this.Rg);
        this.Rg = null;
        Kj.j.destroy.call(this);
    };
    Kj.prototype.getVideoData = function () {
        return this.s.getVideoData();
    };
    Kj.prototype.getEnvironmentData = function () {
        return this.s.getEnvironmentData();
    };
    Kj.prototype.isFullscreen = function () {
        var a = this.getEnvironmentData().Ta == "leanback";
        return this.s.isFullscreen() || a;
    };
    Kj.prototype.e = function (a, b, c) {
        this.pubsub.e(a, b, c);
    };
    Kj.prototype.H = function (a, b, c) {
        this.pubsub.H(a, b, c);
    };
    Kj.prototype.c = function (a, b) {
        this.pubsub.c.apply(this.pubsub, arguments);
    };
    Kj.prototype.fc = function (a, b) {
        this.Hj.fc(a, b);
    };
    Kj.prototype.sb = function (a, b) {
        var c = b || {};
        c.ad_error = a;
        this.fc(7, c);
    };
    Kj.prototype.getRootNode = function () {
        return this.s.getRootNode();
    };
    Kj.prototype.td = function () {
        return goog$style$getSize(this.getRootNode());
    };
    Kj.prototype.Tm = function (a) {
        this.Rd.H("adBreaksComplete", this.Tm, this);
        dj(this, "bd");
        this.Rg = new Jj(this, a);
        this.ff = new Fj(this, a);
        this.ff.Dh();
    };
    var Ij = function (a) {
        Xg(a);
        Wg(a);
        a.playVideo();
        a.pubsub.c("command_ad_break_ended");
    };
    Kj.prototype.rb = function (a) {
        Kj.j.rb.call(this, a);
        var b = a.getId();
        var c;
        if ((c = this.Rg)) {
            c = a.getId();
            c = goog$isString(c) && c.lastIndexOf("ADT_", 0) == 0;
        }
        if (c) {
            a.Jg = false;
            c = this.Rg;
            var d = c.Mc[b];
            if (d) {
                delete c.Mc[b];
                goog$array$forEach(d, c.xm, c);
            }
            this.removeCueRange(a);
        } else if (this.ff && !isNaN(b)) {
            c = this.ff;
            if (b !== undefined) {
                if ((a = c.oj[b])) {
                    if (c.Oc) {
                        c.df(c.Oc);
                    }
                    c.Oc = a;
                    a.e("adBreakComplete", c.Nq, c);
                    if (a.Ze) {
                        b = c.i;
                        b.pubsub.c("command_redirect_controls", b, ["play_pause"]);
                        b.pubsub.c("command_disable_controls", ["seek"]);
                        b.pauseVideo();
                        b.pubsub.c("command_ad_break_started");
                    }
                    a.show();
                } else {
                    R(
                        goog$debug$Logger$Level$SEVERE,
                        "AdPlaylist",
                        "Could not find loaded ad break with an ID of " + b,
                        undefined
                    );
                }
            }
        }
    };
    var dj = function (a, b) {
        var c = b;
        if (b == "nl") {
            c = a.Hj;
            c.On++;
            c = c.On.toString();
        }
        a.Cd[c] = goog$now();
        if (c == "bs" || c == "fb") {
            Tg(a, a.Cd, a.Gn);
        }
    };
    Kj.prototype.kh = function (a) {
        this.pubsub.c(a);
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
        var f = {
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
            if (b.Ta) {
                c.ps = b.playerStyle;
            }
            var g = [];
            var i;
            for (i in c) {
                g.push(encodeURIComponent(i) + "=" + encodeURIComponent(c[i]));
            }
            f.data = g.join(";");
        }
        if (d) {
            f.foc_id = b.uid;
        }
        return yt$uri$appendQueryData(b.baseUrl, f);
    };
    var Mj = function (a, b) {
        var c = yt$tracking$conversion$getPingUrl_(a, b);
        if (c) {
            qf(c);
        }
    };
    var Nj = function (a, b) {
        this.$ = b;
        this.va = a;
        var c = a.getRootNode();
        this.di = goog$dom$getElementByClass("html5-endscreen-actionbar", c);
        this.it = goog$dom$getElementByClass("html5-replay-button", this.di);
        yt$events$listen(this.it, "click", goog$bind(this.gt, this));
        this.xo = goog$dom$getElementByClass("html5-like-button", this.di);
        yt$events$listen(this.xo, "click", goog$bind(this.ft, this));
        this.wo = goog$dom$getElementByClass("html5-dislike-button", this.di);
        yt$events$listen(this.wo, "click", goog$bind(this.dt, this));
        this.jt = goog$dom$getElementByClass("html5-share-button", this.di);
        yt$events$listen(this.jt, "click", goog$bind(this.ht, this));
    };
    Nj.prototype.$ = null;
    Nj.prototype.reset = function () {
        Rh(this.wo);
        Rh(this.xo);
    };
    var Oj = function (a, b, c) {
        if (!goog$dom$classes$has(c, "html5-async-progress")) {
            var d = a.va.getVideoData();
            Rh(c, "html5-async-progress");
            var f = d.m;
            var a = {
                pa: d.pa,
                Rb: goog$bind(a.js, a, c),
                qf: goog$bind(a.is, a, c)
            };
            var c = {};
            if (b) {
                c.action_like_video = 1;
            } else {
                c.action_dislike_video = 1;
            }
            a = a || {};
            c.video_id = f;
            c.plid = a.pa;
            f = {
                screen: yt$uri$buildQueryData({
                    h: screen.height,
                    w: screen.width,
                    d: screen.colorDepth
                }),
                session_token: yt$net$ajax$tokenMap_.watch_actions_ajax
            };
            if (a.ks) {
                f.station_id = a.ks;
            }
            yt$net$ajax$send("/watch_actions_ajax", {
                format: "XML",
                method: "POST",
                Mg: c,
                Ym: f,
                Rb: a.Rb,
                qf: a.qf
            });
            if ((f = zh("CONVERSION_CONFIG_DICT"))) {
                Mj(b ? "like" : "dislike", f);
            }
            if (!zh("CONVERSION_CONFIG_DICT")) {
                Mj(b ? "like" : "dislike", d.gj);
            }
        }
    };
    Nj.prototype.gt = function () {
        this.$.c("command_play");
    };
    Nj.prototype.ft = function (a) {
        Oj(this, true, a.currentTarget);
    };
    Nj.prototype.dt = function (a) {
        Oj(this, false, a.currentTarget);
    };
    Nj.prototype.ht = function () {
        this.$.c("command_share");
    };
    Nj.prototype.js = function (a) {
        Rh(a, "html5-async-success");
    };
    Nj.prototype.is = function (a, b, c) {
        Sh(a, c && c.error_message);
    };
    var Pj = function (a, b) {
        this.s = a;
        this.pubsub = b;
        this.Jh = re("html5-endscreen", this.s.getRootNode());
        goog$dom$classes$add(this.Jh, this.Ao);
        this.qc = re("html5-endscreen-content", this.s.getRootNode());
    };
    Pj.prototype.Ao = "base-endscreen";
    Pj.prototype.Jh = null;
    Pj.prototype.qc = null;
    Pj.prototype.pubsub = null;
    Pj.prototype.s = null;
    Pj.prototype.create = function () {};
    Pj.prototype.destroy = function () {};
    var Qj = window.location.protocol + "//i.ytimg.com/";
    var Rj = 4 / 3;
    var Tj = function (a, b, c) {
        if (!c) {
            c = a.clientHeight;
            a = a.clientWidth;
            if ((a > 900 || c > 600) && b.Am) {
                return b.Am;
            }
            if ((a > 430 || c > 320) && b.Bm) {
                return b.Bm;
            }
        }
        if (b.Cm) {
            return b.Cm;
        } else if (b.m) {
            return Sj(b.m);
        } else {
            return "";
        }
    };
    var Sj = function (a, b) {
        return (Qj + "vi/" + escape(a) + "/" + escape(b || "hqdefault.jpg")).replace(
            "i.",
            "i" + ((a.charCodeAt(0) % 4) + 1) + "."
        );
    };
    var yt$templates$Template = function (a, b) {
        this.sp = a;
        var c = b || null;
        if (!c) {
            c = yt$templates$extractPlaceholders_(this.sp);
        }
        c = goog$string$subs("__%s__", "(" + c.join("|") + ")");
        this.eu = RegExp(c, "g");
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
        a.replace(yt$templates$PLACEHOLDER_RE_, function (a, f) {
            if (!(f in c)) {
                c[f] = true;
                b.push(f);
            }
        });
        return b;
    };
    yt$templates$Template.prototype.Kd = function (a, b, c) {
        return this.sp.replace(
            this.eu,
            goog$bind(function (d, f) {
                if (b) {
                    f = b(f);
                }
                if (c) {
                    return a[f] || "";
                } else {
                    return goog$string$htmlEscape(a[f] || "");
                }
            }, this)
        );
    };
    var Yj = function () {
        this.Kk = this.Uk();
    };
    Yj.prototype.Kd = function (a) {
        var b = goog$object$clone(a);
        b.duration = yt$player$utils$Controls$formatTime(a.length_seconds);
        return this.Kk.Kd(b);
    };
    Yj.prototype.Uk = function () {
        var a = goog$dom$getElementByClass("videowall-info-template");
        return yt$templates$fromElement(a, ["title", "author", "duration", "view_count"]);
    };
    var Zj = function (a, b) {
        this.va = a;
        this.Ls = b ? "hqdefault.jpg" : "default.jpg";
        this.Ks = new Yj();
        this.Kk = this.Uk();
        var c = goog$dom$createDom("a", {
            tabindex: "0"
        });
        goog$dom$classes$add(c, "videowall-still");
        yt$events$listen(c, "click", goog$bind(this.Fg, this));
        yt$events$listen(c, "keypress", goog$bind(this.Fj, this));
        this.xb = c;
    };
    Zj.prototype.update = function (a) {
        if (this.oa != a.id) {
            this.hb = a;
            this.oa = a.id;
            this.xb.innerHTML = this.Kk.Kd(
                {
                    info: this.Ks.Kd(a),
                    thumbnail_url: Sj(this.oa, this.Ls)
                },
                undefined,
                true
            );
            goog$dom$classes$enable(this.xb, "videowall-still-featured", a.featured);
        }
    };
    Zj.prototype.B = function () {
        return this.xb;
    };
    Zj.prototype.Uk = function () {
        var a = goog$dom$getElementByClass("videowall-still-content-template");
        return yt$templates$fromElement(a, ["info", "thumbnail_url"]);
    };
    Zj.prototype.select = function () {
        var a = "endscreen";
        if (this.hb.featured) {
            switch (this.hb.feature_type) {
                case "fvwb":
                    a = "fvwpb";
                    break;
                default:
                    a = "fvwp";
            }
        } else if (this.hb.pinned) {
            a = "pinned";
        }
        this.va.watchVideoById(this.oa, a);
    };
    Zj.prototype.Fg = function () {
        this.select();
    };
    Zj.prototype.Fj = function (a) {
        switch (a.keyCode) {
            case 13:
            case 32:
                this.select();
                a.preventDefault();
        }
    };
    var $j = function (a, b) {
        Pj.call(this, a, b);
        this.qk = [];
        this.pubsub.e("onResize", goog$bind(this.pb, this));
    };
    goog$inherits($j, Pj);
    $j.prototype.Ao = "videowall-endscreen";
    $j.prototype.Lf = null;
    $j.prototype.hb = null;
    $j.prototype.qk = null;
    $j.prototype.fo = false;
    $j.prototype.Mf = 0;
    $j.prototype.create = function () {
        $j.j.create.call(this);
        this.hb = this.s.getVideoData().tq;
        this.be();
    };
    $j.prototype.destroy = function () {
        this.qc.innerHTML = "";
        delete this.hb;
        $j.j.destroy.call(this);
    };
    $j.prototype.be = function () {
        if (this.hb && this.hb.length) {
            goog$dom$classes$enable(this.Jh, "endscreen-enable-layout", true);
            this.qc.innerHTML = "";
            hd(this.qc, "", "");
            var a = goog$style$getSize(this.qc);
            a.height -= 30;
            var b = Math.floor(a.width / 158);
            var c = Math.floor(a.height / (158 / 1.45));
            if (c < 1 || b < 1) {
                this.Mf = 0;
            } else {
                var d = this.hb.length;
                var f = false;
                if (this.hb[0].featured && c > 2 && b > 2) {
                    f = true;
                    d += 3;
                }
                goog$dom$classes$enable(this.qc, "feature-video", f);
                for (var g = 0, i = 0, m = a.width / a.height, p = true; d >= 0 && (g < b || i < c);) {
                    var s = d >= i;
                    var y = d >= g;
                    if ((p && y) || (!s && y)) {
                        d -= g;
                        i++;
                    } else if (s) {
                        d -= i;
                        g++;
                    } else {
                        break;
                    }
                    p = (g / i) * 1.45 > m;
                }
                this.fo = p;
                b = new goog$math$Size(g, i);
                if (this.fo) {
                    c = 1 / b.width;
                    a = a.width * c;
                    c = a / 1.45;
                } else {
                    c = 1 / b.height;
                    c *= a.height;
                    a = c * 1.45;
                }
                a = new goog$math$Size(Math.floor(a), Math.floor(c));
                this.Mf = b.width * b.height;
                if (f) {
                    this.Mf -= 3;
                }
                if (this.Lf) {
                    Ee(this.Lf);
                }
                var f = ak(a);
                var c = {
                    Sc: this.Lf
                };
                var v;
                this.Lf = Fe(".videowall-still", f, c);
                f = ak(a.ga().scale(2));
                c.Sc = this.Lf;
                v = ".feature-video .videowall-still:first-child";
                Fe(v, f, c);
                hd(this.qc, a.width * b.width, a.height * b.height);
            }
            v = 0;
            for (f = this.Mf; v < f; v++) {
                this.qc.appendChild(bk(this, v).B());
            }
            goog$dom$classes$enable(this.Jh, "endscreen-enable-layout", false);
        }
    };
    var bk = function (a, b) {
        var c = a.qk[b];
        if (!c) {
            c = new Zj(a.s, b < 3);
            a.qk[b] = c;
        }
        c.update(a.hb[b]);
        return c;
    };
    var ak = function (a) {
        return ["width:" + a.width + "px", "height:" + a.height + "px"];
    };
    $j.prototype.pb = function () {
        this.be();
    };
    var ck = function (a) {
        V.call(this, a);
        this.Ek = a.getEnvironmentData().Lj ? new $j(this.s, this.pubsub) : new Pj(this.s, this.pubsub);
        this.Xn = new Nj(this.s, this.pubsub);
    };
    goog$inherits(ck, V);
    ck.prototype.W = "endscreen";
    ck.prototype.le = "end";
    ck.prototype.Xn = null;
    ck.prototype.Ek = null;
    ck.prototype.create = function () {
        ck.j.create.call(this);
        var a = Math.max((this.s.getVideoData().Ba - 10) * 1000, 0);
        var a = new Ef(a, 2147483646, {
            id: "preload"
        });
        var b = new Ef(2147483646, 2147483647, {
            id: "load",
            Ff: 9
        });
        this.addCueRange(a, b);
    };
    ck.prototype.destroy = function () {
        this.Wd();
        this.Xn.reset();
        ck.j.destroy.call(this);
    };
    ck.prototype.load = function () {
        ck.j.load.call(this);
        this.loaded = true;
    };
    ck.prototype.unload = function () {
        this.Ek.destroy();
        ck.j.unload.call(this);
        this.loaded = false;
    };
    ck.prototype.rb = function (a) {
        ck.j.rb.call(this, a);
        if (a.getId() == "preload") {
            this.Ek.create();
        } else if (!gh(this.s.getEnvironmentData())) {
            this.load();
        }
    };
    ck.prototype.lc = function (a) {
        if (a.getId() == "load") {
            this.unload();
        }
        ck.j.lc.call(this, a);
    };
    ck.prototype.zb = function () {
        return true;
    };
    var dk = function (a, b) {
        return b != null && !!b.match(a);
    };
    var ek = function (a, b) {
        for (var c in a) {
            if (a[c] == b) {
                return true;
            }
        }
        return false;
    };
    var hk = function (a, b, c, d) {
        var f = new fk();
        f.type = d;
        f.defaultValue = undefined;
        f.nd = goog$partial(dk, c);
        return gk(a[b], f);
    };
    var ik = function (a, b, c) {
        var d = new fk();
        d.type = "OPTIONAL";
        d.xc = function (a) {
            if (isNaN(parseInt(a, 0))) {
                return null;
            }
            a = parseInt(a, 0).toString(16);
            return "#" + "000000".substring(0, 6 - a.length) + a;
        };
        d.nd = function (a) {
            return !!a;
        };
        d.defaultValue = c;
        return gk(a[b], d);
    };
    var jk = function (a, b, c, d) {
        var f = new fk();
        f.type = c;
        f.defaultValue = d;
        return gk(a[b], f);
    };
    var kk = function (a, b, c, d, f) {
        var g = new fk();
        g.type = d;
        g.defaultValue = f;
        g.nd = goog$partial(ek, c);
        return gk(a[b], g);
    };
    var lk = function (a, b) {
        var c = new fk();
        c.type = "OPTIONAL";
        c.defaultValue = 0;
        c.xc = function (a) {
            return parseFloat(a);
        };
        return gk(a[b], c);
    };
    var mk = function (a) {
        var b = new fk();
        b.type = "OPTIONAL";
        b.defaultValue = 0;
        b.xc = function (a) {
            return parseInt(a, 10);
        };
        gk(a.d, b);
    };
    var nk = function (a, b, c, d, f, g, i) {
        var m = new fk();
        m.type = "OPTIONAL";
        m.xc = function (a) {
            a = c == 10 ? parseFloat(a) : parseInt(a, c);
            if (g && a != null && !isNaN(a)) {
                return Oc(a, d, f);
            } else {
                return a;
            }
        };
        m.defaultValue = i;
        m.nd = function (a) {
            return a != null && !isNaN(a) && a >= d && a <= f;
        };
        return gk(a[b], m);
    };
    var ok = function (a, b) {
        var c = new fk();
        c.type = "OPTIONAL";
        c.defaultValue = 0;
        c.xc = function (a) {
            a = a.match(/([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})(\.[0-9])/);
            if (!a) {
                return -1;
            } else {
                return parseFloat(a[1]) * 3600 + parseFloat(a[2]) * 60 + parseFloat(a[3]) + parseFloat(a[4]);
            }
        };
        return gk(a[b], c);
    };
    var pk = function (a, b) {
        if (b == null) {
            return null;
        }
        var c = new a();
        c.Na(b);
        return c;
    };
    var qk = function (a, b, c, d) {
        if (a == null || a[b] == null) {
            return null;
        }
        var f = new fk();
        f.type = d;
        f.defaultValue = undefined;
        f.nd = function (a) {
            return !!a;
        };
        f.xc = goog$partial(pk, c);
        return gk(a[b], f);
    };
    var rk = function (a) {
        function b(a) {
            return a != null && !isNaN(a);
        }
        if (
            (a = (a = a ? (!a.padding || !a.padding.length ? a.padding : a.padding[0]) : null)
                ? new goog$math$Box(parseFloat(a.top), parseFloat(a.right), parseFloat(a.bottom), parseFloat(a.left))
                : null) &&
            b(a.top) &&
            b(a.right) &&
            b(a.bottom) &&
            b(a.left)
        ) {
            return a;
        } else {
            return null;
        }
    };
    var gk = function (a, b) {
        var c;
        if (b.type == "OPTIONAL" || b.type == "REQUIRED") {
            c = a == null ? null : b.xc(goog$isArray(a) && a.length ? a[0] : a);
            if (!b.nd(c)) {
                if (b.type == "REQUIRED") {
                    throw "Required field missing.";
                }
                c = b.defaultValue == null ? null : b.defaultValue;
            }
        } else {
            c =
                b.type == "REPEATED"
                    ? a != null
                        ? sk(goog$isArray(a) ? a : [a], b)
                        : b.defaultValue != null
                          ? goog$isArray(b.defaultValue)
                              ? b.defaultValue
                              : [b.defaultValue]
                          : []
                    : b.type == "IDLIST"
                      ? tk(a, b)
                      : null;
        }
        return c;
    };
    var tk = function (a, b) {
        function c(a) {
            return goog$array$filter(a.split(/ +/), function (a) {
                return a != "";
            });
        }
        if (a != null) {
            return sk(c(a), b);
        } else if (b.defaultValue != null) {
            if (goog$isArray(b.defaultValue)) {
                return b.defaultValue;
            } else {
                return [b.defaultValue];
            }
        } else {
            return [];
        }
    };
    var sk = function (a, b) {
        var c = [];
        for (var d = 0; d < a.length; ++d) {
            var f = b.xc(a[d]);
            if (b.nd(f)) {
                c.push(f);
            }
        }
        if (c.length) {
            return c;
        } else if (b.defaultValue != null) {
            if (goog$isArray(b.defaultValue)) {
                return b.defaultValue;
            } else {
                return [b.defaultValue];
            }
        } else {
            return [];
        }
    };
    var fk = function () {};
    fk.prototype.type = "OPTIONAL";
    fk.prototype.xc = function (a) {
        if (a == null) {
            return null;
        } else {
            return a.toString();
        }
    };
    fk.prototype.nd = function (a) {
        return a != null;
    };
    fk.prototype.defaultValue = null;
    var uk = function () {};
    var vk = {
        CLICK: "click",
        Bw: "hidden",
        ix: "rollOut",
        jx: "rollOver",
        nx: "shown"
    };
    uk.prototype.state = null;
    uk.prototype.Na = function (a) {
        hk(a, "ref", /.+/, "OPTIONAL");
        this.state = kk(a, "state", vk, "OPTIONAL");
    };
    var wk = function () {};
    wk.prototype.Na = function (a) {
        qk(a, "condition", uk, "REPEATED");
    };
    var xk = function () {};
    var yk = {
        pw: "compose",
        Aw: "group",
        Hw: "hyperlink",
        Zw: "playlist",
        hx: "respUpload",
        lx: "search",
        xx: "userChannel",
        VIDEO: "video"
    };
    var zk = {
        uw: "current",
        Vw: "new"
    };
    xk.prototype.type = null;
    xk.prototype.value = null;
    xk.prototype.target = null;
    xk.prototype.Na = function (a) {
        this.type = kk(a, "type", yk, "OPTIONAL", "hyperlink");
        this.value = jk(a, "value", "OPTIONAL");
        this.target = kk(a, "target", zk, "OPTIONAL", "current");
    };
    var Ak = function (a) {
        if (!a.type || !a.value) {
            return null;
        }
        switch (a.type) {
            case "video":
                return "http://www.youtube.com/watch?v=" + a.value;
            case "userChannel":
                return "http://www.youtube.com/user/" + a.value;
            case "subscribe":
                return "http://www.youtube.com/subscription_center?add_user=" + a.value;
            case "group":
                return "http://www.youtube.com/group/" + a.value;
            case "search":
                return "http://www.youtube.com/results?search_query=" + a.value;
            case "playlist":
                return "http://www.youtube.com/view_play_list?p=" + a.value;
            case "compose":
                return "http://www.youtube.com/inbox?action_compose=1&to_users=" + a.value;
            case "friendInvite":
                return "http://www.youtube.com/peeps?action_invite&username=" + a.value;
            case "responseUpload":
                return "http://www.youtube.com/video_response_upload?v=" + a.value;
            case "externalExempted":
            case "internalExempted":
            case "hyperlink":
                return a.value;
        }
        return null;
    };
    var Bk = function () {};
    Bk.prototype.value = 0;
    Bk.prototype.Na = function (a) {
        this.value = ok(a, "value");
    };
    var Ck = function () {};
    var Dk = {
        Ww: "openUrl",
        lu: "pause"
    };
    Ck.prototype.type = null;
    Ck.prototype.trigger = null;
    Ck.prototype.url = null;
    Ck.prototype.duration = null;
    Ck.prototype.Na = function (a) {
        this.type = kk(a, "type", Dk, "OPTIONAL");
        this.trigger = kk(a, "trigger", vk, "OPTIONAL");
        this.url = qk(a, "url", xk, "OPTIONAL");
        this.duration = qk(a, "duration", Bk, "OPTIONAL");
    };
    var Ek = function () {
        this.cd = [];
    };
    Ek.prototype.fgColor = "#1A1A1A";
    Ek.prototype.bgColor = "#FFF";
    Ek.prototype.borderColor = "#000";
    Ek.prototype.borderWidth = 0;
    Ek.prototype.Jd = 0.8;
    Ek.prototype.Po = 0.2;
    Ek.prototype.Qo = 0;
    Ek.prototype.Dj = "#F2F2F2";
    Ek.prototype.xk = 3;
    Ek.prototype.Ej = 3.6107;
    Ek.prototype.fontWeight = "";
    Ek.prototype.padding = null;
    Ek.prototype.Na = function (a) {
        this.fgColor = ik(a, "fgColor", this.fgColor);
        this.bgColor = ik(a, "bgColor", this.bgColor);
        this.borderColor = ik(a, "borderColor", this.borderColor);
        this.borderWidth = nk(a, "borderWidth", 16, 1, 5, false, this.borderWidth);
        this.Jd = nk(a, "bgAlpha", 10, 0, 1, false, this.Jd);
        this.Po = nk(a, "borderAlpha", 10, 0, 1, false, this.Po);
        this.Qo = nk(a, "gloss", 16, 0, 255, false, this.Qo);
        this.Dj = ik(a, "highlightFontColor", this.Dj);
        this.xk = nk(a, "highlightWidth", 16, 1, 5, false, this.xk);
        this.Ej = nk(a, "textSize", 10, 3.3, 30.1, true, this.Ej);
        this.fontWeight = jk(a, "fontWeight", "OPTIONAL", this.fontWeight);
        this.padding = rk(a);
        this.cd = jk(a, "effects", "IDLIST");
    };
    var Fk = function () {};
    Fk.prototype.x = 0;
    Fk.prototype.y = 0;
    Fk.prototype.ci = 0;
    Fk.prototype.bi = 0;
    Fk.prototype.we = 0;
    Fk.prototype.Na = function (a) {
        this.x = lk(a, "x");
        this.y = lk(a, "y");
        this.ci = lk(a, "w");
        this.bi = lk(a, "h");
        this.we = ok(a, "t");
        mk(a);
    };
    var Gk = function () {};
    Gk.prototype.x = 0;
    Gk.prototype.y = 0;
    Gk.prototype.ci = 0;
    Gk.prototype.bi = 0;
    Gk.prototype.we = 0;
    Gk.prototype.Bo = 0;
    Gk.prototype.Co = 0;
    Gk.prototype.Na = function (a) {
        this.x = lk(a, "x");
        this.y = lk(a, "y");
        this.Bo = lk(a, "sx");
        this.Co = lk(a, "sy");
        this.ci = lk(a, "w");
        this.bi = lk(a, "h");
        this.we = ok(a, "t");
        mk(a);
    };
    var Hk = function () {};
    var Ik = {
        ku: "anchored",
        gx: "rect"
    };
    Hk.prototype.type = "rect";
    Hk.prototype.Sk = null;
    Hk.prototype.ai = null;
    Hk.prototype.Na = function (a) {
        this.type = kk(a, "type", Ik, "OPTIONAL", "rect");
        this.Sk = qk(a, "rectRegion", Fk, "REPEATED");
        this.ai = qk(a, "anchoredRegion", Gk, "REPEATED");
    };
    var Jk = function () {};
    Jk.prototype.gc = null;
    Jk.prototype.uc = null;
    Jk.prototype.Na = function (a) {
        hk(a, "timeRelative", /.+/, "OPTIONAL");
        this.gc = hk(a, "spaceRelative", /.+/, "OPTIONAL");
        this.uc = qk(a, "movingRegion", Hk, "REPEATED");
    };
    var Kk = function (a) {
        if (!a.uc) {
            return null;
        }
        a = a.uc[0].Sk || a.uc[0].ai;
        if (!a || a.length < 2) {
            return null;
        }
        var b = a.length - 1;
        if (a[0].we == 0 && a[b] == 0) {
            return null;
        } else {
            return {
                start: a[0].we,
                end: a[b].we
            };
        }
    };
    var Lk = function () {};
    var Mk = {
        ku: "anchored",
        ww: "donation",
        Gw: "highlightText",
        Ow: "label",
        ax: "popup",
        px: "speech",
        ux: "title"
    };
    var Nk = {
        Fw: "highlight",
        lu: "pause",
        Ug: "text",
        tx: "thumbnail"
    };
    Lk.prototype.Na = function (a) {
        this.id = hk(a, "id", /^a.*_.*$/, "REQUIRED");
        this.author = hk(a, "author", /.+/, "OPTIONAL");
        this.type = kk(a, "type", Nk, "REQUIRED");
        this.style = kk(a, "style", Mk, "OPTIONAL", "");
        this.Ug = jk(a, "TEXT", "OPTIONAL");
        this.ya = qk(a, "segment", Jk, "REQUIRED");
        this.action = qk(a, "action", Ck, "REPEATED");
        this.trigger = qk(a, "trigger", wk, "REPEATED");
        this.Pb = qk(a, "appearance", Ek, "OPTIONAL");
        if (!this.Pb) {
            this.Pb = new Ek();
        }
    };
    Lk.prototype.getUrl = function () {
        if (!this.action) {
            return null;
        }
        for (var a in this.action) {
            if (this.action[a].url) {
                return this.action[a].url;
            }
        }
        return null;
    };
    var Ok = function (a) {
        if (!a.action) {
            return false;
        } else {
            return a.action.some(function (a) {
                return a.trigger && a.trigger == "click";
            });
        }
    };
    var Pk = function (a) {
        if (!a.ya || !a.ya.uc) {
            return null;
        }
        a = a.ya.uc[0];
        a = a.Sk || a.ai;
        if (!a) {
            return null;
        } else {
            return new goog$math$Rect(a[0].x, a[0].y, a[0].ci, a[0].bi);
        }
    };
    var Qk = function (a) {
        if (!a.ya || !a.ya.uc) {
            return null;
        } else if ((a = a.ya.uc[0].ai)) {
            return new goog$math$Coordinate(a[0].Bo, a[0].Co);
        } else {
            return null;
        }
    };
    var Rk = function (a) {
        if (!a.action) {
            return null;
        } else if (
            (a = a.action.filter(function (a) {
                return a.type == "pause";
            }))
        ) {
            return a[0];
        } else {
            return null;
        }
    };
    var Sk = function () {
        this.ja = [];
        this.K = [];
        this.Wb = [];
    };
    Sk.prototype.oe = null;
    Sk.prototype.Bb = null;
    Sk.prototype.Wh = true;
    var Tk = [2, 2, 6, 6, 0];
    Sk.prototype.clear = function () {
        this.ja.length = 0;
        this.K.length = 0;
        this.Wb.length = 0;
        delete this.oe;
        delete this.Bb;
        delete this.Wh;
        return this;
    };
    Sk.prototype.moveTo = function (a, b) {
        if (this.ja[this.ja.length - 1] == 0) {
            this.Wb.length -= 2;
        } else {
            this.ja.push(0);
            this.K.push(1);
        }
        this.Wb.push(a, b);
        this.Bb = this.oe = [a, b];
        return this;
    };
    Sk.prototype.lineTo = function (a) {
        var b = this.ja[this.ja.length - 1];
        if (b == null) {
            throw Error("Path cannot start with lineTo");
        }
        if (b != 1) {
            this.ja.push(1);
            this.K.push(0);
        }
        for (b = 0; b < arguments.length; b += 2) {
            var c = arguments[b];
            var d = arguments[b + 1];
            this.Wb.push(c, d);
        }
        this.K[this.K.length - 1] += b / 2;
        this.Bb = [c, d];
        return this;
    };
    Sk.prototype.close = function () {
        var a = this.ja[this.ja.length - 1];
        if (a == null) {
            throw Error("Path cannot start with close");
        }
        if (a != 4) {
            this.ja.push(4);
            this.K.push(1);
            this.Bb = this.oe;
        }
        return this;
    };
    Sk.prototype.arcTo = function (a, b, c, d) {
        var f = this.Bb[0] - a * Math.cos((c * Math.PI) / 180) + a * Math.cos(((c + d) * Math.PI) / 180);
        var g = this.Bb[1] - b * Math.sin((c * Math.PI) / 180) + b * Math.sin(((c + d) * Math.PI) / 180);
        this.ja.push(3);
        this.K.push(1);
        this.Wb.push(a, b, c, d, f, g);
        this.Wh = false;
        this.Bb = [f, g];
        return this;
    };
    var Uk = function (a, b) {
        var c = a.Wb;
        var d = 0;
        for (var f = 0, g = a.ja.length; f < g; f++) {
            var i = a.ja[f];
            var m = Tk[i] * a.K[f];
            b(i, c.slice(d, d + m));
            d += m;
        }
    };
    Sk.prototype.ga = function () {
        var a = new this.constructor();
        a.ja = this.ja.concat();
        a.K = this.K.concat();
        a.Wb = this.Wb.concat();
        a.oe = this.oe && this.oe.concat();
        a.Bb = this.Bb && this.Bb.concat();
        a.Wh = this.Wh;
        return a;
    };
    Sk.prototype.isEmpty = function () {
        return this.ja.length == 0;
    };
    var Vk = function (a) {
        this.$c = a;
        this.oi = [];
    };
    goog$inherits(Vk, Sc);
    var Wk = [];
    Vk.prototype.G = function (a, b, c, d, f) {
        if (!goog$isArray(b)) {
            Wk[0] = b;
            b = Wk;
        }
        for (var g = 0; g < b.length; g++) {
            this.oi.push(Id(a, b[g], c || this, d || false, f || this.$c || this));
        }
        return this;
    };
    Vk.prototype.Gk = function (a, b, c, d, f) {
        if (goog$isArray(b)) {
            for (var g = 0; g < b.length; g++) {
                this.Gk(a, b[g], c, d, f);
            }
        } else {
            a: {
                c = c || this;
                f = f || this.$c || this;
                d = !!d;
                if ((a = Md(a, b, d))) {
                    for (b = 0; b < a.length; b++) {
                        if (!a[b].gd && a[b].me == c && a[b].capture == d && a[b].Sh == f) {
                            a = a[b];
                            break a;
                        }
                    }
                }
                a = null;
            }
            if (a) {
                a = a.key;
                Nd(a);
                Oa(this.oi, a);
            }
        }
        return this;
    };
    Vk.prototype.Wa = function () {
        goog$array$forEach(this.oi, Nd);
        this.oi.length = 0;
    };
    Vk.prototype.r = function () {
        Vk.j.r.call(this);
        this.Wa();
    };
    Vk.prototype.handleEvent = function () {
        throw Error("EventHandler.handleEvent not implemented");
    };
    var Xk = function () {};
    goog$addSingletonGetter(Xk);
    Xk.prototype.kp = 0;
    Xk.getInstance();
    var Yk = function (a) {
        this.hd = a || goog$dom$getDomHelper();
    };
    goog$inherits(Yk, Sd);
    Yk.prototype.Tt = Xk.getInstance();
    Yk.prototype.oa = null;
    Yk.prototype.Ma = false;
    Yk.prototype.C = null;
    Yk.prototype.za = null;
    Yk.prototype.nc = null;
    Yk.prototype.Af = null;
    Yk.prototype.xn = false;
    Yk.prototype.getId = function () {
        return this.oa || (this.oa = ":" + (this.Tt.kp++).toString(36));
    };
    Yk.prototype.B = function () {
        return this.C;
    };
    Yk.prototype.getParent = function () {
        return this.za;
    };
    Yk.prototype.Bk = function (a) {
        if (this.za && this.za != a) {
            throw Error("Method not supported");
        }
        Yk.j.Bk.call(this, a);
    };
    Yk.prototype.ce = function () {
        this.C = this.hd.createElement("div");
    };
    Yk.prototype.Kd = function (a) {
        this.il(a);
    };
    Yk.prototype.il = function (a, b) {
        if (this.Ma) {
            throw Error("Component already rendered");
        }
        if (!this.C) {
            this.ce();
        }
        if (a) {
            a.insertBefore(this.C, b || null);
        } else {
            this.hd.Q.body.appendChild(this.C);
        }
        if (!this.za || this.za.Ma) {
            this.vf();
        }
    };
    Yk.prototype.ud = function (a) {
        if (this.Ma) {
            throw Error("Component already rendered");
        }
        if (a) {
            this.xn = true;
            if (!this.hd || this.hd.Q != goog$dom$getOwnerDocument(a)) {
                this.hd = goog$dom$getDomHelper(a);
            }
            this.C = a;
            this.vf();
        } else {
            throw Error("Invalid element to decorate");
        }
    };
    Yk.prototype.vf = function () {
        this.Ma = true;
        Zk(this, function (a) {
            if (!a.Ma && a.B()) {
                a.vf();
            }
        });
    };
    Yk.prototype.yf = function () {
        Zk(this, function (a) {
            if (a.Ma) {
                a.yf();
            }
        });
        if (this.Bh) {
            this.Bh.Wa();
        }
        this.Ma = false;
    };
    Yk.prototype.r = function () {
        Yk.j.r.call(this);
        if (this.Ma) {
            this.yf();
        }
        if (this.Bh) {
            this.Bh.Fc();
            delete this.Bh;
        }
        Zk(this, function (a) {
            a.Fc();
        });
        if (!this.xn && this.C) {
            goog$dom$removeNode(this.C);
        }
        this.za = this.C = this.Af = this.nc = null;
    };
    var Zk = function (a, b) {
        if (a.nc) {
            goog$array$forEach(a.nc, b, undefined);
        }
    };
    Yk.prototype.removeChild = function (a, b) {
        if (a) {
            var c = goog$isString(a) ? a : a.getId();
            var a = this.Af && c ? (c in this.Af ? this.Af[c] : undefined) || null : null;
            if (c && a) {
                var d = this.Af;
                if (c in d) {
                    delete d[c];
                }
                Oa(this.nc, a);
                if (b) {
                    a.yf();
                    if (a.C) {
                        goog$dom$removeNode(a.C);
                    }
                }
                c = a;
                if (c == null) {
                    throw Error("Unable to set parent component");
                }
                c.za = null;
                Yk.j.Bk.call(c, null);
            }
        }
        if (!a) {
            throw Error("Child is not in parent component");
        }
        return a;
    };
    var $k = function (a, b, c, d, f) {
        this.hd = f || goog$dom$getDomHelper();
        this.width = a;
        this.height = b;
        this.ed = c || null;
        this.rk = d || null;
    };
    goog$inherits($k, Yk);
    $k.prototype.xf = null;
    $k.prototype.Lh = 0;
    $k.prototype.Mh = 0;
    $k.prototype.ge = function () {
        if (this.Ma) {
            return goog$style$getSize(this.B());
        } else if (typeof this.width == "number" && typeof this.height == "number") {
            return new goog$math$Size(this.width, this.height);
        } else {
            return null;
        }
    };
    var al = function (a) {
        var b = a.ge();
        if (b) {
            return b.width / (a.ed ? new goog$math$Size(a.ed, a.rk) : a.ge()).width;
        } else {
            return 0;
        }
    };
    var goog$Disposable = function () {};
    var cl = function (a, b) {
        this.vl = a;
        this.Ys = b || 1;
    };
    goog$inherits(cl, goog$Disposable);
    cl.prototype.Pk = function () {
        return this.vl;
    };
    var dl = function (a, b) {
        this.fu = a;
        this.vl = b;
    };
    dl.prototype.getWidth = function () {
        return this.fu;
    };
    dl.prototype.Pk = function () {
        return this.vl;
    };
    var el = function (a, b) {
        this.C = a;
        this.F = b;
        this.wk = false;
    };
    goog$inherits(el, Sd);
    el.prototype.F = null;
    el.prototype.C = null;
    el.prototype.B = function () {
        return this.C;
    };
    el.prototype.addEventListener = function (a, b, c, d) {
        Id(this.C, a, b, c, d);
    };
    el.prototype.removeEventListener = function (a, b, c, d) {
        Ld(this.C, a, b, c, d);
    };
    el.prototype.r = function () {
        el.j.r.call(this);
        Pd(this.C);
    };
    var fl = function (a, b, c, d) {
        el.call(this, a, b);
        a = this.F;
        b = this.B();
        if (c) {
            b.setAttribute("stroke", c.Pk());
            c = c.getWidth();
            if (goog$isString(c) && c.indexOf("px") != -1) {
                b.setAttribute("stroke-width", parseFloat(c) / al(a));
            } else {
                b.setAttribute("stroke-width", c);
            }
        } else {
            b.setAttribute("stroke", "none");
        }
        this.fill = d;
        c = this.B();
        if (d instanceof cl) {
            c.setAttribute("fill", d.Pk());
            c.setAttribute("fill-opacity", d.Ys);
        } else {
            c.setAttribute("fill", "none");
        }
    };
    goog$inherits(fl, el);
    fl.prototype.fill = null;
    var gl = function (a, b) {
        el.call(this, a, b);
    };
    goog$inherits(gl, el);
    var hl = function (a, b, c, d) {
        fl.call(this, a, b, c, d);
    };
    goog$inherits(hl, fl);
    var il = function (a, b) {
        el.call(this, a, b);
    };
    goog$inherits(il, gl);
    il.prototype.clear = function () {
        goog$dom$removeChildren(this.B());
    };
    il.prototype.setSize = function (a, b) {
        var c = this.B();
        var d = {
            width: a,
            height: b
        };
        var f;
        for (f in d) {
            c.setAttribute(f, d[f]);
        }
    };
    var jl = function (a, b, c, d) {
        fl.call(this, a, b, c, d);
    };
    goog$inherits(jl, hl);
    var kl = function (a, b, c, d, f) {
        $k.call(this, a, b, c, d, f);
        this.fd = {};
        this.$j = goog$userAgent$WEBKIT && !goog$userAgent$isVersion(526);
        this.$c = new Vk(this);
    };
    var ll;
    goog$inherits(kl, $k);
    var ml = 0;
    var nl = function (a, b, c) {
        a = a.hd.Q.createElementNS("http://www.w3.org/2000/svg", b);
        if (c) {
            for (var d in c) {
                a.setAttribute(d, c[d]);
            }
        }
        return a;
    };
    kl.prototype.ie = function (a, b) {
        (b || this.xf).B().appendChild(a.B());
    };
    kl.prototype.ce = function () {
        var a = nl(this, "svg", {
            width: this.width,
            height: this.height,
            overflow: "hidden"
        });
        var b = nl(this, "g");
        this.yh = nl(this, "defs");
        this.xf = new il(b, this);
        a.appendChild(this.yh);
        a.appendChild(b);
        this.C = a;
        if (this.ed || this.Lh || this.Mh) {
            this.B().setAttribute("preserveAspectRatio", "none");
            if (this.$j) {
                this.wh();
            } else {
                this.B().setAttribute(
                    "viewBox",
                    this.Lh + " " + this.Mh + " " + (this.ed ? this.ed + " " + this.rk : "")
                );
            }
        }
    };
    kl.prototype.wh = function () {
        if (this.Ma && (this.ed || this.Lh || !this.Mh)) {
            var a = this.ge();
            if (a.width == 0) {
                this.B().style.visibility = "hidden";
            } else {
                this.B().style.visibility = "";
                this.xf
                    .B()
                    .setAttribute(
                        "transform",
                        "scale(" +
                            a.width / this.ed +
                            " " +
                            a.height / this.rk +
                            ") translate(" +
                            -this.Lh +
                            " " +
                            -this.Mh +
                            ")"
                    );
            }
        }
    };
    kl.prototype.setSize = function (a, b) {
        hd(this.B(), a, b);
    };
    kl.prototype.ge = function () {
        if (!goog$userAgent$GECKO) {
            if (this.Ma) {
                return goog$style$getSize(this.B());
            } else {
                return kl.j.ge.call(this);
            }
        }
        var a = this.width;
        var b = this.height;
        var c = goog$isString(a) && a.indexOf("%") != -1;
        var d = goog$isString(b) && b.indexOf("%") != -1;
        if (!this.Ma && (c || d)) {
            return null;
        }
        var f;
        var g;
        if (c) {
            f = this.B().parentNode;
            g = goog$style$getSize(f);
            a = (parseFloat(a) * g.width) / 100;
        }
        if (d) {
            f = f || this.B().parentNode;
            g = g || goog$style$getSize(f);
            b = (parseFloat(b) * g.height) / 100;
        }
        return new goog$math$Size(a, b);
    };
    kl.prototype.clear = function () {
        this.xf.clear();
        goog$dom$removeChildren(this.yh);
        this.fd = {};
    };
    var pl = function (a, b, c, d) {
        b = nl(a, "path", {
            d: ol(b)
        });
        c = new jl(b, a, c, d);
        a.ie(c, undefined);
    };
    var ol = function (a) {
        var b = [];
        Uk(a, function (a, d) {
            switch (a) {
                case 0:
                    b.push("M");
                    Array.prototype.push.apply(b, d);
                    break;
                case 1:
                    b.push("L");
                    Array.prototype.push.apply(b, d);
                    break;
                case 2:
                    b.push("C");
                    Array.prototype.push.apply(b, d);
                    break;
                case 3:
                    var f = d[3];
                    b.push("A", d[0], d[1], 0, Math.abs(f) > 180 ? 1 : 0, f > 0 ? 1 : 0, d[4], d[5]);
                    break;
                case 4:
                    b.push("Z");
            }
        });
        return b.join(" ");
    };
    kl.prototype.vf = function () {
        var a = this.ge();
        kl.j.vf.call(this);
        if (!a) {
            this.dispatchEvent("resize");
        }
        if (this.$j) {
            var a = this.width;
            var b = this.height;
            if (typeof a == "string" && a.indexOf("%") != -1 && typeof b == "string" && b.indexOf("%") != -1) {
                this.$c.G(ql(), "tick", this.wh);
            }
            this.wh();
        }
    };
    kl.prototype.yf = function () {
        kl.j.yf.call(this);
        if (this.$j) {
            this.$c.Gk(ql(), "tick", this.wh);
        }
    };
    kl.prototype.r = function () {
        delete this.fd;
        delete this.yh;
        delete this.xf;
        kl.j.r.call(this);
    };
    var ql = function () {
        if (!ll) {
            ll = new Ud(400);
            ll.start();
        }
        return ll;
    };
    var rl = function (a, b, c, d) {
        this.fp = a;
        this.gp = b;
        this.ml = c;
        this.nl = d;
    };
    rl.prototype.ga = function () {
        return new rl(this.fp, this.gp, this.ml, this.nl);
    };
    var sl = function (a, b) {
        this.start = a < b ? a : b;
        this.end = a < b ? b : a;
    };
    sl.prototype.ga = function () {
        return new sl(this.start, this.end);
    };
    sl.prototype.toString = function () {
        return "[" + this.start + ", " + this.end + "]";
    };
    var tl = function (a, b, c) {
        var d = document.createElementNS("http://www.w3.org/2000/svg", a);
        if (b) {
            goog$object$forEach(b, function (a, b) {
                d.setAttribute(b, a);
            });
        }
        for (var f = 2; f < arguments.length; f++) {
            d.appendChild(arguments[f]);
        }
        return d;
    };
    var ul = function (a, b) {
        var c;
        c = ":" + (Xk.getInstance().kp++).toString(36);
        b.setAttribute("result", c);
        a.appendChild(b);
        return c;
    };
    var vl = function (a, b) {
        var c = ul(
            a,
            tl("feGaussianBlur", {
                in: b,
                stdDeviation: "1.8"
            })
        );
        var c = ul(
            a,
            tl(
                "feDiffuseLighting",
                {
                    in: c,
                    surfaceScale: "4",
                    diffuseConstant: "1"
                },
                tl("feDistantLight", {
                    azimuth: "270",
                    elevation: "15",
                    "lighting-color": "white"
                })
            )
        );
        var c = ul(
            a,
            tl("feComposite", {
                in: c,
                in2: b,
                operator: "in"
            })
        );
        return ul(
            a,
            tl("feComposite", {
                in2: c,
                in: b,
                operator: "arithmetic",
                k2: 1,
                k3: 0.5,
                k4: 0
            })
        );
    };
    var wl = function (a, b) {
        return b;
    };
    var xl = function (a) {
        var b = tl("filter");
        goog$array$forEach(a, function (a) {
            a: {
                switch (a) {
                    case "bevel":
                        a = vl;
                        break a;
                }
                a = wl;
            }
            a(b, "SourceGraphic");
        });
        return b;
    };
    var zl = function (a) {
        goog$array$sort(a, function (a, c) {
            return (a in yl ? yl[a] : 1000) - (c in yl ? yl[c] : 1000);
        });
    };
    var Al = function (a, b) {
        var c = "effects:" + (b ? b.join("|") : "");
        var d = c in a.fd ? a.fd[c] : null;
        if (d) {
            return d;
        }
        d = xl(b);
        if (d.childNodes.length > 0) {
            if (c in a.fd) {
                c = a.fd[c];
            } else {
                var f = "_svgdef_" + ml++;
                d.setAttribute("id", f);
                a.fd[c] = f;
                a.yh.appendChild(d);
                c = f;
            }
        } else {
            c = null;
        }
        return c;
    };
    var yl = {
        dropshadow: 1,
        bevel: 2,
        glow: 3
    };
    var Bl = {
        Pg: function (a, b) {
            return new goog$math$Rect(
                (a.width * b.left) / 100 + a.left,
                (a.height * b.top) / 100 + a.top,
                (a.width * b.width) / 100,
                (a.height * b.height) / 100
            );
        },
        bs: function (a, b) {
            return new goog$math$Coordinate((a.width * b.x) / 100 + a.left, (a.height * b.y) / 100 + a.top);
        }
    };
    var Cl = function () {};
    Cl.prototype.hasFocus = false;
    Cl.prototype.F = null;
    Cl.prototype.B = function () {
        if (this.F) {
            return this.F.B();
        } else {
            return null;
        }
    };
    Cl.prototype.refresh = function () {};
    var Dl = function (a) {
        this.Qa = a;
    };
    goog$inherits(Dl, Cl);
    Dl.prototype.refresh = function (a) {
        var b = El;
        var c = Bl.Pg(a, Pk(this.Qa));
        if (this.F) {
            this.F.setSize(c.width, c.height);
            this.F.clear();
        } else {
            this.F = new kl(c.width, c.height);
            this.F.ce();
        }
        var a = this.Qa.Pb || new Ek();
        var d = a.borderWidth;
        var f = this.hasFocus && Ok(this.Qa);
        var d = (d += f ? 1 : 0) ? new dl(d, f ? a.fgColor : a.borderColor) : null;
        var b = new cl(a.bgColor, b(this.hasFocus, a.Jd));
        Fl(this.F, new goog$math$Rect(0, 0, c.width, c.height), d, b);
        b = this.F.B();
        Gl(b, "annotation-shape");
        Gl(b, "annotation-popup-shape");
        Zc(b, c.left, c.top);
        hd(b, c.width, c.height);
        if (a.cd) {
            zl(a.cd);
            if (
                (c = La(b.childNodes, function (a) {
                    return a.tagName == "g";
                }))
            ) {
                Hl(c, Al(this.F, a.cd));
            }
        }
    };
    var Il = function (a) {
        this.Qa = a;
    };
    goog$inherits(Il, Cl);
    Il.prototype.refresh = function (a) {
        var b = El;
        var a = Bl.Pg(a, Pk(this.Qa));
        if (this.F) {
            this.F.setSize(a.width, a.height);
            this.F.clear();
        } else {
            this.F = new kl(a.width, a.height);
            this.F.ce();
        }
        var c = this.Qa.Pb || new Ek();
        Fl(this.F, new goog$math$Rect(0, 0, a.width, a.height), new dl(c.xk, c.bgColor), null);
        var d = this.F.B();
        Gl(d, "annotation-shape");
        d.style.opacity = b(this.hasFocus, c.Jd);
        Zc(d, a.left, a.top);
        hd(d, a.width, a.height);
    };
    var Jl = function (a) {
        this.Qa = a;
    };
    goog$inherits(Jl, Cl);
    var Kl = {
        TOP: "t",
        LEFT: "l",
        BOTTOM: "b",
        RIGHT: "r",
        Xt: "i",
        wx: ""
    };
    Jl.prototype.refresh = function (a) {
        var b = El;
        var c = this.Qa.Pb || new Ek();
        var d = c.borderWidth;
        var f = this.hasFocus && Ok(this.Qa);
        var d = (d += f ? 1 : 0) ? new dl(d, f ? c.fgColor : c.borderColor) : null;
        var f = new cl(c.bgColor, b(this.hasFocus, c.Jd));
        var g = Bl.Pg(a, Pk(this.Qa));
        var i = Bl.bs(a, Qk(this.Qa));
        var b = g.ga();
        Rc(b, new goog$math$Rect(i.x, i.y, 1, 1));
        if (this.F) {
            this.F.setSize(b.width, b.height);
            this.F.clear();
        } else {
            this.F = new kl(b.width, b.height);
            this.F.ce();
        }
        g = new goog$math$Rect(g.left < i.x ? 0 : g.left - i.x, g.top < i.y ? 0 : g.top - i.y, g.width, g.height);
        i = new goog$math$Coordinate(i.x - b.left, i.y - b.top);
        this.Pn = (a.height * 6) / 100;
        Ll(this, this.F, g, i, d, f);
        a = this.F.B();
        Gl(a, "annotation-shape");
        Gl(a, "annotation-speech-shape");
        Zc(a, b.left, b.top);
        hd(a, b.width, b.height);
        if (c.cd) {
            zl(c.cd);
            if (
                (a = La(a.childNodes, function (a) {
                    return a.tagName == "g";
                }))
            ) {
                Hl(a, Al(this.F, c.cd));
            }
        }
    };
    var Ll = function (a, b, c, d, f, g) {
        var i = f ? f.getWidth() / 2 : 0;
        var m = Ml(c, d);
        var a = a.up(c, d, m);
        var p = d.x;
        var d = d.y;
        var s = c.width;
        var y = c.height;
        var v = c.left;
        var c = c.top;
        var z = new Sk();
        z.moveTo(v + 5 + i, c + i);
        if (m == Kl.TOP) {
            z.lineTo(a.start, c + i);
            z.lineTo(p, d);
            z.lineTo(a.end, c + i);
        }
        z.lineTo(v + s - 5 - i, c + i);
        z.arcTo(5, 5, -90, 90);
        if (m == Kl.LEFT) {
            z.lineTo(v + s - i, a.start);
            z.lineTo(p, d);
            z.lineTo(v + s - i, a.end);
        }
        z.lineTo(v + s - i, c + y - 5 - i);
        z.arcTo(5, 5, 0, 90);
        if (m == Kl.BOTTOM) {
            z.lineTo(a.end, c + y - i);
            z.lineTo(p, d);
            z.lineTo(a.start, c + y - i);
        }
        z.lineTo(v + 5 + i, c + y - i);
        z.arcTo(5, 5, 90, 90);
        if (m == Kl.RIGHT) {
            z.lineTo(v + i, a.end);
            z.lineTo(p, d);
            z.lineTo(v + i, a.start);
        }
        z.lineTo(v + i, c + 5 + i);
        z.arcTo(5, 5, 180, 90);
        z.close();
        pl(b, z, f, g);
    };
    var Ml = function (a, b) {
        var c = function (a, b) {
            var c = (a.nl - a.gp) / (a.ml - a.fp + 0.00001);
            if (c * b.x + (a.nl - c * a.ml) >= b.y) {
                return false;
            } else {
                return true;
            }
        };
        var d = b.x;
        var f = b.y;
        var g = a.width;
        var i = a.height;
        var m = a.left;
        var p = a.top;
        var s = new rl(m, p, m + g, p + i);
        var y = new rl(m, p + i, m + g, p);
        if (d >= m && d <= m + g && f >= p && f <= p + i) {
            return Kl.Xt;
        } else if (c(s, b) && !c(y, b)) {
            return Kl.RIGHT;
        } else if (!c(s, b) && !c(y, b)) {
            return Kl.TOP;
        } else if (c(y, b) && !c(s, b)) {
            return Kl.LEFT;
        } else {
            return Kl.BOTTOM;
        }
    };
    Jl.prototype.up = function (a, b, c) {
        var d = this.Pn;
        var f = 0;
        var g = 0;
        if (c == Kl.TOP || c == Kl.BOTTOM) {
            if (a.width < d) {
                return new sl(0, a.width);
            }
            f = d;
            g = Oc(b.x - f / 2, 0, a.top + a.width - f);
        } else if (c == Kl.LEFT || c == Kl.RIGHT) {
            if (a.height < d) {
                return new sl(0, a.height);
            }
            f = d;
            g = Oc(b.y - f / 2, 0, a.left + a.height - f);
        }
        return new sl(g, g + f);
    };
    var Nl = function (a) {
        this.Qa = a;
    };
    goog$inherits(Nl, Jl);
    Nl.prototype.up = function (a, b, c) {
        var d = this.Pn;
        var f = 0;
        var g = 0;
        if (c == Kl.TOP || c == Kl.BOTTOM) {
            if (a.width < d) {
                return new sl(0, a.width);
            }
            f = d;
            g =
                b.x <= a.top + a.width / 2
                    ? Math.max(a.top + a.width / 4 - f / 2, 0)
                    : Math.min(a.top + (a.width * 3) / 4 - f / 2, a.top + a.width - f);
        } else if (c == Kl.LEFT || c == Kl.RIGHT) {
            if (a.height < d) {
                return new sl(0, a.height);
            }
            f = d;
            g =
                b.y <= a.left + a.height / 2
                    ? Math.max(a.left + a.height / 4 - f / 2, 0)
                    : Math.min(a.left + (a.height * 3) / 4 - f / 2, a.left + a.height - f);
        }
        return new sl(g, g + f);
    };
    var Fl = function (a, b, c, d) {
        var f = new Sk();
        var g = c ? c.getWidth() / 2 + 1 : 0;
        f.moveTo(b.left + 4 + g, b.top + g);
        f.lineTo(b.left + b.width - 4 - g, b.top + g);
        f.arcTo(4, 4, -90, 90);
        f.lineTo(b.left + b.width - g, b.top + b.height - 4 - g);
        f.arcTo(4, 4, 0, 90);
        f.lineTo(b.left + 4 + g, b.top + b.height - g);
        f.arcTo(4, 4, 90, 90);
        f.lineTo(b.left + g, b.top + 4 + g);
        f.arcTo(4, 4, 180, 90);
        f.close();
        pl(a, f, c, d);
    };
    var Gl = function (a, b) {
        var c = a.getAttribute("class");
        var c = c ? c.split(/\s+/) : [];
        if (c.indexOf(b) == -1) {
            c.push(b);
            a.setAttribute("class", c.join(" "));
        }
    };
    var Hl = function (a, b) {
        if (b) {
            a.setAttribute("filter", "url(#" + b + ")");
        }
    };
    var El = function (a, b) {
        if (a) {
            return Math.max(b, 0.9);
        } else {
            return b;
        }
    };
    var Ol = function (a, b, c) {
        this.ii = a;
        this.al = 0;
        this.Yo = b;
        if (c) {
            this.No = c;
        }
    };
    Ol.prototype.No = 70;
    Ol.prototype.bl = false;
    Ol.prototype.start = function (a) {
        this.Lo = goog$now();
        this.al = a;
        this.Ko = this.Lo + this.al;
        this.bl = true;
        var a = this.ii;
        var b = a.getAttribute("class");
        var b = b ? b.split(/\s+/) : [];
        var c = b.indexOf("hid");
        if (c != -1) {
            b.splice(c, 1);
            a.setAttribute("class", b.join(" "));
        }
        yt$clearInterval(this.fl);
        this.fl = yt$setInterval(goog$bind(this.il, this), this.No);
    };
    Ol.prototype.stop = function () {
        this.bl = false;
        Gl(this.ii, "hid");
        if (this.fl) {
            yt$clearInterval(this.fl);
        }
    };
    Ol.prototype.il = function () {
        if (this.bl) {
            var a = goog$now();
            var b;
            b = a >= this.Ko ? 0 : 1 - (a - this.Lo) / this.al;
            var c = goog$dom$getElementByClass("countdowntimer-diminishing-pieslice", this.ii);
            var d = parseInt(this.ii.getAttribute("width"), 10);
            var f = new Sk();
            var g = d / 2 - 5;
            f.moveTo(d / 2, d / 2);
            f.lineTo(d / 2, 5);
            f.arcTo(g, g, -90, -b * 360);
            f.lineTo(d / 2, d / 2);
            f.close();
            c.setAttribute("d", ol(f));
            if (a >= this.Ko) {
                this.stop();
                if (this.Yo) {
                    this.Yo();
                }
            }
        }
    };
    var Pl = function () {
        var a = new goog$storage$mechanism$HTML5LocalStorage();
        if (a && Mg(a)) {
            this.Bd = new Pg(a);
            this.Gd = new Pg(a);
        }
    };
    Pl.prototype.Gd = null;
    Pl.prototype.Bd = null;
    Pl.prototype.getVolume = function () {
        var a = {
            volume: 100,
            muted: false,
            nonNormalized: 100
        };
        if (this.Gd) {
            var b = {};
            try {
                b = this.Gd.get("yt-player-volume") || {};
            } catch (c) {
                this.Gd.remove("yt-player-volume");
            }
            a.volume = isNaN(b.volume) ? 100 : Oc(b.volume, 0, 100);
            a.nonNormalized = isNaN(b.nonNormalized) ? a.volume : b.nonNormalized;
            a.muted = b.muted == undefined ? false : b.muted;
        }
        return a;
    };
    var yt$timing = goog$getObjectByName("yt.timing") || {};
    goog$exportSymbol("yt.timing", yt$timing);
    yt$timing.Zt = 0;
    yt$timing.mp = 0;
    yt$timing.mb = function (a, b) {
        var c = yt$timing.timer || {};
        c[a] = b ? b : goog$now();
        yt$timing.timer = c;
    };
    yt$timing.info = function (a, b) {
        var c = yt$timing.info_args || {};
        c[a] = b;
        yt$timing.info_args = c;
    };
    yt$timing.ug = function () {
        var a = zh("TIMING_ACTION");
        var b = yt$timing.timer || {};
        var c = yt$timing.info_args || {};
        var d = b.start;
        var f = "";
        var g = [];
        var i = [];
        delete b.start;
        if (yt$timing.srt) {
            f = "&srt=" + yt$timing.srt;
        }
        if (b.aft && b.plev) {
            b.aft = Math.min(b.aft, b.plev);
        }
        for (var m in b) {
            g.push(m + "." + Math.round(b[m] - d));
        }
        for (m in c) {
            i.push(m + "=" + c[m]);
        }
        if (b.vr && b.gv) {
            g.push("vl." + Math.round(b.vr - b.gv));
        }
        if (!b.aft && b.vr && b.cl) {
            if (b.cl > b.vr) {
                g.push("aft." + Math.round(b.cl - d));
            } else {
                g.push("aft." + Math.round(b.vr - d));
            }
        } else if (!b.aft && b.vr) {
            g.push("aft." + Math.round(b.vr - d));
        } else if (!b.aft) {
            g.push("aft." + Math.round(b.ol - d));
        }
        qf(
            [
                window.location.protocol == "https:" ? "https://gg.google.com/csi" : "http://csi.gstatic.com/csi",
                "?v=2&s=youtube&action=",
                a,
                f,
                "&",
                i.join("&"),
                "&rt=",
                g.join(",")
            ].join("")
        );
    };
    yt$timing.au = function () {
        var a = zh("TIMING_ACTION");
        var b = yt$timing.timer || {};
        if (a && b.start) {
            if (yt$timing.wff && a.indexOf("ajax") != -1 && b.vr && b.cl) {
                yt$timing.ug();
            } else if (yt$timing.wff && a.indexOf("ajax") == -1 && b.vr) {
                yt$timing.ug();
            } else if (!yt$timing.wff && (b.ol || b.aft)) {
                yt$timing.ug();
            }
        }
    };
    yt$timing.Kx = function () {
        yt$timing.mb("ol");
        yt$timing.au();
    };
    yt$timing.Lx = function (a) {
        var b = ++yt$timing.Zt;
        if (typeof a != "undefined" && a < 4) {
            yt$timing.mp++;
        }
        if (yt$timing.mp == 4) {
            yt$timing.mb("tn_c4");
        }
        if (b == 1 || b == 5 || b == 10 || b == 20 || b == 30) {
            yt$timing.mb("tn" + b);
        }
    };
    var Ql = function (a, b) {
        if (!b) {
            b = {};
        }
        var c = window;
        var d = typeof a.href != "undefined" ? a.href : "" + a;
        var f = b.target || a.target;
        var g = [];
        var i;
        for (i in b) {
            switch (i) {
                case "width":
                case "height":
                case "top":
                case "left":
                    g.push(i + "=" + b[i]);
                    break;
                case "target":
                case "noreferrer":
                    break;
                default:
                    g.push(i + "=" + (b[i] ? 1 : 0));
            }
        }
        g = g.join(",");
        if (b.noreferrer) {
            if ((c = c.open("", f, g))) {
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
            c = c.open(d, f, g);
        }
        return c;
    };
    var yt$window$popup = function (a, b) {
        var c = b || {};
        c.target = c.target || a.target || "YouTube";
        c.width = c.width || 600;
        c.height = c.height || 600;
        c = Ql(a, c);
        if (!c) {
            return true;
        }
        if (!c.opener) {
            c.opener = window;
        }
        c.focus();
        return false;
    };
    var yt$prefs$UserPrefs$prefs_ = goog$getObjectByName("yt.prefs.UserPrefs.prefs_") || {};
    goog$exportSymbol("yt.prefs.UserPrefs.prefs_", yt$prefs$UserPrefs$prefs_);
    var yt$pubsub$instance_ = goog$getObjectByName("yt.pubsub.instance_") || new goog$pubsub$PubSub();
    goog$pubsub$PubSub.prototype.subscribe = goog$pubsub$PubSub.prototype.e;
    goog$pubsub$PubSub.prototype.unsubscribeByKey = goog$pubsub$PubSub.prototype.ji;
    goog$pubsub$PubSub.prototype.publish = goog$pubsub$PubSub.prototype.c;
    goog$pubsub$PubSub.prototype.clear = goog$pubsub$PubSub.prototype.clear;
    goog$exportSymbol("yt.pubsub.instance_", yt$pubsub$instance_);
    var Ul = function (a) {
        var b = goog$getObjectByName("yt.pubsub.instance_");
        if (b) {
            b.subscribe(
                "panelhidden",
                function () {
                    var b = arguments;
                    yt$setTimeout(function () {
                        a.apply(goog$global, b);
                    }, 0);
                },
                undefined
            );
        }
    };
    var Vl = function (a, b) {
        var c = goog$getObjectByName("yt.pubsub.instance_");
        if (c) {
            c.publish.apply(c, arguments);
        }
    };
    if (!goog$userAgent$IE) {
        if (goog$userAgent$GECKO) {
            goog$userAgent$isVersion("1.9.3");
        }
    }
    new goog$pubsub$PubSub();
    if (!document.getElementById && document.all) {
        document.getElementById = function (a) {
            return document.all[a];
        };
    }
    var Wl = function () {
        this.Of = {};
    };
    goog$inherits(Wl, Kh);
    goog$addSingletonGetter(Wl);
    Wl.prototype.ye = "expander";
    Wl.prototype.ag = function () {
        this.addBehavior("click", this.sl, "head");
        this.addBehavior("keypress", this.tl, "head");
    };
    Wl.prototype.sl = function (a) {
        Xl(this, a);
    };
    Wl.prototype.tl = function (a, b, c) {
        if (c && c.keyCode == 13) {
            Xl(this, a);
        }
    };
    var Xl = function (a, b) {
        var c = Lc(b, yt$uix$BaseWidget$getCssClass(a));
        if (c) {
            gc(c, yt$uix$BaseWidget$getCssClass(a, "collapsed"));
            a.xi(c, "expander-action");
        }
    };
    var yt$captions$TEXT_ALIGNMENTS_ = ["left", "right", "center"];
    var yt$captions$DEFAULT_WINDOW_PARAMS_ = {
        id: 0,
        Ff: 0,
        Ah: 7,
        Ch: 50,
        uu: 80,
        Eh: 95,
        jc: 15,
        ok: 100,
        isVisible: true,
        textAlign: yt$captions$TEXT_ALIGNMENTS_[2],
        Qc: 0,
        backgroundColor: "#080808",
        ph: "#fff",
        opacity: 0.8
    };
    var $l = {
        id: 99,
        Ff: 1,
        Ah: 0,
        Ch: 5,
        Eh: 7,
        jc: 2,
        ok: 32,
        textAlign: yt$captions$TEXT_ALIGNMENTS_[0]
    };
    var yt$captions$Event = function (a) {
        this.mi = a.kk;
        this.Sf = a.Ff;
        this.gb = a.gb || this.gb;
    };
    yt$captions$Event.prototype.mi = 0;
    yt$captions$Event.prototype.Sf = 0;
    yt$captions$Event.prototype.gb = 0;
    yt$captions$Event.prototype.Ja = function () {
        return this.mi;
    };
    yt$captions$Event.prototype.dd = function () {
        return this.Sf;
    };
    yt$captions$Event.prototype.toString = function () {
        return this.mi + ", " + this.gb;
    };
    var yt$captions$CaptionEvent = function (a) {
        yt$captions$Event.call(this, a);
        this.hi = a.text || this.hi;
        this.Zg = a.gk || this.Zg;
        this.ie = a.params.append || this.ie;
        this.Wo = a.params.row || this.Wo;
        this.Vo = a.params.tt || this.Vo;
    };
    goog$inherits(yt$captions$CaptionEvent, yt$captions$Event);
    yt$captions$CaptionEvent.prototype.hi = "";
    yt$captions$CaptionEvent.prototype.ie = false;
    yt$captions$CaptionEvent.prototype.Wo = 0;
    yt$captions$CaptionEvent.prototype.Vo = 0;
    yt$captions$CaptionEvent.prototype.Zg = 0;
    yt$captions$CaptionEvent.prototype.Ub = function () {
        return this.hi;
    };
    yt$captions$CaptionEvent.prototype.toString = function () {
        return this.mi + ", " + this.gb + ": " + this.hi;
    };
    var yt$captions$parseCaptionElement_ = function (a) {
        var b = (a.firstChild && a.firstChild.nodeValue) || "";
        var c = parseFloat(a.getAttribute("start") || 0) * 1000;
        if (a.getAttribute("t")) {
            c = parseInt(a.getAttribute("t"), 10);
        }
        var d = parseFloat(a.getAttribute("dur") || 0) * 1000;
        if (a.getAttribute("d")) {
            d = parseFloat(a.getAttribute("d"));
        }
        var f = parseInt(a.getAttribute("w"), 10) || 0;
        var b = {
            kk: c,
            gb: d,
            text: b,
            gk: f,
            Ff: 5,
            params: {}
        };
        if (a.getAttribute("r")) {
            b.params.row = parseInt(a.getAttribute("r"), 10);
        }
        if (a.getAttribute("c")) {
            b.params.tt = parseInt(a.getAttribute("c"), 10);
        }
        if (a.getAttribute("append")) {
            b.Ff = 6;
            b.params.append = true;
        }
        return new yt$captions$CaptionEvent(b);
    };
    var yt$captions$WindowEvent = function (a) {
        yt$captions$Event.call(this, a);
        this.id = a.gk || this.id;
        this.params = a.params;
    };
    goog$inherits(yt$captions$WindowEvent, yt$captions$Event);
    yt$captions$WindowEvent.prototype.id = 0;
    yt$captions$WindowEvent.prototype.params = null;
    yt$captions$WindowEvent.prototype.Rc = "";
    yt$captions$WindowEvent.prototype.dh = false;
    var yt$captions$createDefaultWindow_ = function () {
        return new yt$captions$WindowEvent({
            kk: -2147483648,
            gb: 4294967295,
            params: yt$captions$DEFAULT_WINDOW_PARAMS_
        });
    };
    var yt$captions$CaptionTrack = function (a) {
        this.mh = [];
        this.nh = [];
        this.Gf = {};
        if (a && (a = fj(a)) && a.firstChild) {
            this.ad = a;
            switch (this.ad.firstChild.tagName) {
                case "timedtext":
                    var a = this.ad.firstChild.childNodes;
                    for (var b = 0, c = a.length; b < c; b++) {
                        switch (a[b].tagName) {
                            case "window":
                                var d = a[b];
                                var f = parseInt(d.getAttribute("id"), 10);
                                var g = undefined;
                                a: {
                                    var i = this.Gf[f];
                                    if (!d.getAttribute("t") && !d.getAttribute("start")) {
                                        g = null;
                                    } else {
                                        g = parseInt(d.getAttribute("t"), 10);
                                        if (d.getAttribute("start")) {
                                            g = parseFloat(d.getAttribute("start")) * 1000;
                                        }
                                        if (i) {
                                            if (i.Ja() + i.gb >= g) {
                                                i.gb = g;
                                            } else {
                                                i = null;
                                            }
                                        }
                                        switch (d.getAttribute("op")) {
                                            case "kill":
                                                g = null;
                                                break a;
                                            case "define":
                                                i = null;
                                        }
                                        if (i) {
                                            i.vu = true;
                                        } else {
                                            i = yt$captions$createDefaultWindow_();
                                        }
                                        var m = {};
                                        w(m, i ? i.params : yt$captions$DEFAULT_WINDOW_PARAMS_);
                                        if (d.getAttribute("id")) {
                                            m.id = d.getAttribute("id");
                                        }
                                        if (d.getAttribute("op")) {
                                            m.wu = d.getAttribute("op");
                                        }
                                        if (d.getAttribute("rc")) {
                                            m.jc = parseInt(d.getAttribute("rc"), 10);
                                        }
                                        if (d.getAttribute("cc")) {
                                            m.ok = parseInt(d.getAttribute("cc"), 10);
                                        }
                                        if (d.getAttribute("ap")) {
                                            i = parseInt(d.getAttribute("ap"), 10);
                                            m.Ah = i < 0 || i > 8 ? 7 : i;
                                        }
                                        if (d.getAttribute("ah")) {
                                            m.Ch = parseInt(d.getAttribute("ah"), 10);
                                        }
                                        if (d.getAttribute("av")) {
                                            m.Eh = parseInt(d.getAttribute("av"), 10);
                                        }
                                        if (d.getAttribute("id")) {
                                            m.id = parseInt(d.getAttribute("id"), 10) || 0;
                                        }
                                        if (d.getAttribute("vs")) {
                                            m.isVisible = Boolean(d.getAttribute("vs"));
                                        }
                                        if (d.getAttribute("ju")) {
                                            m.textAlign =
                                                yt$captions$TEXT_ALIGNMENTS_[parseInt(d.getAttribute("ju"), 10)];
                                        }
                                        if (d.getAttribute("pd")) {
                                            m.Qc = 1;
                                            if (parseInt(d.getAttribute("pd"), 10) == 0) {
                                                m.Qc = 0;
                                            }
                                        }
                                        if (d.getAttribute("bc")) {
                                            m.backgroundColor = parseInt(d.getAttribute("bc"), 16);
                                        }
                                        if (d.getAttribute("bo")) {
                                            m.opacity = parseInt(d.getAttribute("bo"), 10) / 100;
                                        }
                                        if (d.getAttribute("fc")) {
                                            m.ph = parseInt(d.getAttribute("fc"), 16);
                                        }
                                        if (d.getAttribute("sd")) {
                                            m.Ij = parseInt(d.getAttribute("sd"), 10);
                                        }
                                        i =
                                            parseInt(d.getAttribute("d"), 10) ||
                                            parseFloat(d.getAttribute("dur")) * 1000 ||
                                            2147483647;
                                        d = {
                                            kk: g,
                                            gb: i,
                                            params: m,
                                            gk: parseInt(d.getAttribute("id"), 10)
                                        };
                                        g = new yt$captions$WindowEvent(d);
                                    }
                                }
                                this.Gf[f] = g;
                                this.nh.push(g);
                                break;
                            case "text":
                                f = yt$captions$parseCaptionElement_(a[b]);
                                this.mh.push(f);
                                d = f.Zg;
                                if (this.Gf[d]) {
                                    d = this.Gf[d];
                                    f = f.Ub();
                                    if (d.Rc != "") {
                                        d.dh = true;
                                    }
                                    d.Rc += f;
                                }
                        }
                    }
                    break;
                default:
                    this.nh.push(yt$captions$createDefaultWindow_());
                    a = this.ad.firstChild.childNodes;
                    b = 0;
                    for (c = a.length; b < c; b++) {
                        this.mh.push(yt$captions$parseCaptionElement_(a[b]));
                    }
            }
        }
    };
    yt$captions$CaptionTrack.prototype.mh = null;
    yt$captions$CaptionTrack.prototype.nh = null;
    yt$captions$CaptionTrack.prototype.Gf = null;
    var gm = function (a) {
        a = a || {};
        this.oo = a.format;
        this.Uc = a.languageCode || "";
        this.Gh = a.languageName;
        this.bb = a.kind;
        this.ta = a.name;
        this.oa = a.id;
        this.En = a.is_servable;
        this.Cf = a.is_default;
        this.pk = a.is_translateable;
    };
    gm.prototype.Gh = null;
    gm.prototype.bb = null;
    gm.prototype.ta = null;
    gm.prototype.oa = null;
    gm.prototype.En = false;
    gm.prototype.Cf = false;
    gm.prototype.pk = false;
    gm.prototype.oo = 1;
    gm.prototype.getName = function () {
        return this.ta;
    };
    gm.prototype.getFormat = function () {
        return this.oo;
    };
    var yt$captions$Track$getDisplayName_ = function (a) {
        var b = [a.Gh];
        if (a.bb) {
            var c = a.bb == "asr" ? yt$getMsg("HTML5_SUBS_TRANSCRIBED") : a.bb;
            b.push(" (", c, ")");
        }
        if (a.ta) {
            b.push(" - ", a.ta);
        }
        if (a.sc) {
            b.push(" >> ", a.sc.Xh);
        }
        return b.join("");
    };
    gm.prototype.toString = function () {
        var a = [this.Uc, ": ", this.ta, " (", this.bb, ")"];
        if (this.sc) {
            a.push(" >> ", this.sc.Xh);
        }
        return a.join("");
    };
    var im = function (a) {
        this.Ef = a.languageCode;
        this.Xh = a.languageName;
        this.cp = a.languageOriginal;
        this.id = a.id;
        this.Cf = a.is_default;
    };
    im.prototype.Ef = null;
    im.prototype.Xh = null;
    im.prototype.cp = null;
    im.prototype.id = null;
    im.prototype.Cf = false;
    var yt$captions$TrackList = function (a) {
        this.Rk = [];
        this.ll = [];
        this.gi = [];
        if (a && a.firstChild) {
            this.ad = a;
            var a = this.ad.getElementsByTagName("track");
            for (var b = a.length, c = 0; c < b; c++) {
                var d = parseInt(a[c].getAttribute("formats"), 10) || 1;
                var f = a[c].getAttribute("lang_code");
                var g = a[c].getAttribute("lang_translated");
                var i = a[c].getAttribute("name");
                var m = a[c].getAttribute("kind") || "";
                var p = a[c].getAttribute("id");
                var s = a[c].getAttribute("lang_default") == "true";
                var y = a[c].getAttribute("cantran") == "true";
                this.Df(
                    new gm({
                        format: d,
                        languageCode: f,
                        languageName: g,
                        name: i,
                        kind: m,
                        id: p,
                        is_servable: true,
                        is_default: s,
                        is_translateable: y
                    })
                );
            }
            a = this.ad.getElementsByTagName("target");
            b = a.length;
            for (c = 0; c < b; c++) {
                d = a[c].getAttribute("lang_code");
                f = a[c].getAttribute("lang_translated");
                g = a[c].getAttribute("lang_original");
                i = a[c].getAttribute("id");
                m = a[c].getAttribute("lang_default") == "true";
                this.ll.push(
                    new im({
                        languageCode: d,
                        languageName: f,
                        languageOriginal: g,
                        id: i,
                        is_default: m
                    })
                );
            }
        }
    };
    yt$captions$TrackList.prototype.ad = null;
    yt$captions$TrackList.prototype.Rk = null;
    yt$captions$TrackList.prototype.ll = null;
    yt$captions$TrackList.prototype.gi = null;
    yt$captions$TrackList.prototype.ri = -1;
    yt$captions$TrackList.prototype.Hf = function () {
        return this.gi;
    };
    yt$captions$TrackList.prototype.Kh = function () {
        return this.Rk;
    };
    yt$captions$TrackList.prototype.Nh = function () {
        return this.ri;
    };
    yt$captions$TrackList.prototype.xh = function () {
        return this.ll;
    };
    yt$captions$TrackList.prototype.Df = function (a) {
        switch (a.bb) {
            case "asr":
                this.Rk.push(a);
                break;
            default:
                if (a.Cf || this.ri < 0) {
                    this.ri = this.gi.length;
                }
                this.gi.push(a);
        }
    };
    var km = function (a, b, c, d) {
        this.vc = a;
        if (c) {
            this.vc = yt$uri$setQueryData(this.vc, {
                hl: c
            });
        } else {
            a = yt$uri$getQueryData(this.vc).hl || "";
            a = a.split("_").join("-");
            this.vc = yt$uri$setQueryData(this.vc, {
                hl: a
            });
        }
        this.Qk = b;
        this.bp = !!d;
    };
    km.prototype.vc = "";
    km.prototype.Qk = null;
    km.prototype.bp = false;
    km.prototype.ri = 0;
    km.prototype.wc = null;
    km.prototype.Hf = function () {
        return this.wc.Hf();
    };
    km.prototype.Kh = function () {
        return this.wc.Kh();
    };
    km.prototype.xh = function () {
        return this.wc.xh();
    };
    km.prototype.Nh = function () {
        return this.wc.Nh();
    };
    km.prototype.Df = function (a) {
        this.wc.Df(a);
    };
    var mm = function (a, b) {
        var c = a.wc.Nh();
        if (!(c < 0)) {
            yt$captions$CaptionsLoader$loadTrack_(a, a.wc.Hf()[c], b);
        }
    };
    var yt$captions$CaptionsLoader$loadTrack_ = function (a, b, c) {
        var d = a.vc;
        var f = {
            v: a.Qk,
            type: "track",
            lang: b.Uc,
            name: b.getName(),
            kind: b.bb,
            fmt: b.getFormat()
        };
        if (b.sc) {
            f.tlang = b.sc.Ef;
        }
        d = yt$uri$setQueryData(d, f);
        yt$player$logger.info("Loading caption track from: " + d);
        a = goog$bind(function (a) {
            a = new yt$captions$CaptionTrack(a.responseText);
            c(a, b);
        }, a);
        yt$net$ajax$send_(d, a);
    };
    var yt$captions$CaptionsLoader$loadTrackList_ = function (a, b) {
        var c = a.vc;
        var d = {
            type: "list",
            tlangs: 1,
            v: a.Qk,
            fmts: Number(true)
        };
        if (a.bp) {
            d.asrs = 1;
        }
        c = yt$uri$setQueryData(c, d);
        yt$player$logger.info("Getting track list from: " + c);
        d = goog$bind(function (a) {
            this.wc = new yt$captions$TrackList(a.responseXML);
            b();
        }, a);
        yt$net$ajax$send_(c, d);
    };
    new goog$pubsub$PubSub();
    var om = function (a) {
        if (!a) {
            return false;
        }
        var a = a.replace(/https?:\/\//g, "");
        var b = a.split("/", 1);
        if (!b || b.length < 1 || !b[0]) {
            return false;
        }
        b = b[0].toLowerCase().split(".").reverse();
        if (b.length < 2) {
            return false;
        } else {
            return (
                ((b[0] == "com" && b[1] == "youtube") || (b[0] == "be" && b[1] == "youtu")) &&
                a.indexOf("/redirect?") == -1
            );
        }
    };
    var pm = function (a, b) {
        if (a.target == "new") {
            return -1;
        }
        var c = Ak(a);
        if (!c) {
            return -1;
        }
        var c = c.replace(/https?:\/\//g, "");
        var d;
        if (!(d = !om(c))) {
            d = goog$uri$utils$split(c)[5] || null;
            d = ((d && decodeURIComponent(d)) || "").split("/");
            d = "/" + (d.length > 1 ? d[1] : "");
            d = d != "/watch";
        }
        if (d) {
            return -1;
        }
        d = yt$uri$getQueryData(c);
        if (!d || d.v != b.m || d.list || d.p) {
            return -1;
        }
        c = c.split("#", 2);
        if (!c || c.length < 2) {
            return -1;
        }
        if ((c = yt$uri$parseQueryData(c[1])) && c.t) {
            d = c.t;
            c = 0;
            if (d.indexOf("h") != -1) {
                d = d.split("h");
                c = d[0] * 3600;
                d = d[1];
            }
            if (d.indexOf("m") != -1) {
                d = d.split("m");
                c = d[0] * 60 + c;
                d = d[1];
            }
            if (d.indexOf("s") != -1) {
                d = d.split("s");
                c = d[0] * 1 + c;
            } else {
                c = d * 1 + c;
            }
        } else {
            c = -1;
        }
        return c;
    };
    var qm = function (a) {
        this.$ = a;
        this.an = {};
    };
    var sm = function (a, b) {
        var c = {};
        c["iv-event"] = b;
        c["a-id"] = a.id;
        c["a-type"] = rm(a);
        var d = a.getUrl();
        if (d) {
            c["l-type"] = d.type;
            c.link = escape(Ak(d));
        }
        return c;
    };
    var rm = function (a) {
        switch (a.type) {
            case "text":
                switch (a.style) {
                    case "popup":
                    case "donation":
                        return 1;
                    case "speech":
                        return 2;
                    case "title":
                        return 4;
                    default:
                        return 0;
                }
            case "highlight":
                return 3;
            case "thumbnail":
                return 5;
            default:
                return 0;
        }
    };
    qm.prototype.k = function (a) {
        this.$.c("command_log", "iv", a);
    };
    var tm = function (a, b, c, d) {
        this.n = a;
        this.rm = b;
        this.b = c;
        this.$ = d;
        this.om = null;
        this.Ve = new Ge();
        this.gc = this.U = this.A = null;
    };
    tm.prototype.n = null;
    tm.prototype.A = null;
    tm.prototype.qb = null;
    tm.prototype.ma = null;
    tm.prototype.b = null;
    tm.prototype.$ = null;
    tm.prototype.U = null;
    tm.prototype.gc = null;
    tm.prototype.Dq = function () {
        this.$.c("closed", this.n);
    };
    tm.prototype.Cq = function () {
        this.$.c("click", this.n);
    };
    tm.prototype.lj = function () {
        if (this.ma) {
            yt$style$show(this.ma);
        }
        if (this.qb) {
            ld(this.qb, 1);
        }
        if (this.U) {
            this.U.hasFocus = true;
            ld(this.A, um(this) ? 1 : 0);
            this.U.refresh(this.b.Gc);
        }
        this.$.c("mouseover", this.n);
    };
    tm.prototype.kj = function () {
        if (this.ma) {
            yt$style$hide(this.ma);
        }
        if (this.qb) {
            this.qb.style.opacity = 0.6;
        }
        if (this.U) {
            this.U.hasFocus = false;
            ld(this.A, um(this) ? 1 : 0);
            this.U.refresh(this.b.Gc);
        }
        this.$.c("mouseout", this.n);
    };
    var wm = function (a) {
        if (a.A || a.U) {
            var b;
            if (a.gc) {
                b = Pk(a.gc);
                var c = Pk(a.n);
                if (!b || !c) {
                    b = null;
                } else {
                    c.top += b.top;
                    c.left += b.left;
                    b = c;
                }
            } else {
                b = Pk(a.n);
            }
            if ((c = b)) {
                b = a.b.Gc;
                var d = jh(a.b);
                if (a.A) {
                    c = Bl.Pg(b, c);
                    hd(a.A, c.width, c.height);
                    Zc(a.A, c.left, c.top);
                    d = new goog$math$Box(
                        (vm(a).top * d.height) / 100,
                        (vm(a).right * d.width) / 100,
                        (vm(a).bottom * d.height) / 100,
                        (vm(a).left * d.width) / 100
                    );
                    if (a.qb) {
                        d.right += (b.height * 1.5) / 100;
                    }
                    a.A.style.padding = d.top + "px " + d.right + "px " + d.bottom + "px " + d.left + "px";
                    if (a.n.style == "label" && a.gf) {
                        a.gf.style.padding = a.A.style.padding;
                    }
                    if (a.qb) {
                        d = (b.height * 4.2) / 100;
                        d = new goog$math$Size(d, d);
                        hd(a.qb, d);
                        if (a.n.type == "highlight") {
                            var f = (b.height * 1.5) / 100;
                            var d = new goog$math$Coordinate(c.width - d.width - f, c.height - d.height - f);
                        } else {
                            d = new goog$math$Coordinate(
                                c.width - d.width - (b.height * 3) / 100,
                                (c.height - d.height) / 2
                            );
                        }
                        Zc(a.qb, d);
                    }
                    if (a.ma) {
                        var g = (b.height * 6) / 100;
                        hd(a.ma, new goog$math$Size(g, g));
                        var d = a.ma;
                        var f = goog$style$getSize(a.ma);
                        var g = g / 2;
                        var i = b.left + b.width - (c.left + c.width) >= g;
                        var m = c.top - b.top >= g;
                        Zc(
                            d,
                            i && m
                                ? new goog$math$Coordinate(c.width - g, -g)
                                : i
                                  ? new goog$math$Coordinate(
                                        c.width - g,
                                        c.height > g * 3 + f.height ? g : c.height - g
                                    )
                                  : m
                                    ? new goog$math$Coordinate(
                                          c.width > g * 3 + f.width ? c.width - g - f.width : -g,
                                          -g
                                      )
                                    : c.width / b.width > c.height / b.height
                                      ? new goog$math$Coordinate(
                                            c.width > g * 3 + f.width ? c.width - g - f.width : -g,
                                            c.height - g
                                        )
                                      : new goog$math$Coordinate(-g, c.height > g * 3 + f.height ? g : c.height - g)
                        );
                    }
                }
                if (a.U) {
                    a.U.refresh(b);
                }
                b = a.A;
                c = a.n.Pb || new Ek();
                d = a.b.Gc;
                b.style.color = a.n.style == "highlightText" ? c.Dj : c.fgColor;
                b.style.fontSize = (d.height * c.Ej) / 100 + "px";
                if (a.n.style == "title" || a.n.style == "highlightText") {
                    b.style.textAlign = "center";
                }
                if (c.fontWeight) {
                    b.style.fontWeight = c.fontWeight;
                }
                if (a.A) {
                    for (b = 10; a.A.scrollHeight > a.A.offsetHeight && b;) {
                        c = wd(a.A);
                        if (c < 5) {
                            break;
                        }
                        c--;
                        a.A.style.fontSize = c + "px";
                        b--;
                    }
                }
            }
        }
    };
    var vm = function (a) {
        var b = a.n.Pb;
        if (b.padding) {
            return b.padding;
        } else {
            return new goog$math$Box(
                a.n.style == "speech" ? 1.6 : 0.8,
                a.n.style == "speech" ? 1.6 : 0.8,
                a.n.style == "speech" ? 1.6 : 0.8,
                a.n.style == "speech" ? 1.6 : 0.8
            );
        }
    };
    tm.prototype.show = function () {
        if (this.b.Gc) {
            var a = this.n.Pb;
            if (
                (!a || a.Jd != 0) &&
                this.n.style != "title" &&
                this.n.style != "highlightText" &&
                this.n.type != "pause" &&
                !this.U
            ) {
                if ((a = this.b.Gc)) {
                    var b = null;
                    if (this.n.style == "popup") {
                        b = new Dl(this.n);
                    } else if (this.n.style == "anchored") {
                        b = new Jl(this.n);
                    } else if (this.n.style == "speech") {
                        b = new Nl(this.n);
                    } else if (this.n.style == "label" || this.n.type == "highlight") {
                        b = new Il(this.n);
                    }
                    if (b) {
                        b.refresh(a);
                        this.U = b;
                        a = b.B();
                        yt$style$hide(a);
                        this.rm(a);
                    }
                }
            }
            if (!this.A) {
                this.A = goog$dom$createDom("div", ["annotation", "hid"]);
                if (this.n.Ug) {
                    if (this.n.style == "label") {
                        a = this.n.Pb || new Ek();
                        this.gf = goog$dom$createDom("div", ["label-text"]);
                        this.gf.style.backgroundColor = a.bgColor;
                        goog$dom$setTextContent(this.gf, this.n.Ug);
                        this.A.appendChild(this.gf);
                    } else {
                        goog$dom$setTextContent(this.A, this.n.Ug);
                    }
                }
                yt$dom$datasets$set(this.A, "annotation_id", this.n.id);
                this.rm(this.A);
                this.Ve.G(this.A, "mouseover", goog$bind(this.lj, this));
                this.Ve.G(this.A, "mouseout", goog$bind(this.kj, this));
                this.Ve.G(this.A, "click", goog$bind(this.Cq, this));
                if (Ok(this.n)) {
                    if ((a = this.n.getUrl())) {
                        this.A.title = Ak(a);
                    }
                    this.qb = goog$dom$createDom("span", "annotation-link-icon");
                    this.A.appendChild(this.qb);
                }
                a = goog$dom$getElementByClass("annotation-close-button-container", undefined);
                a = yt$dom$cloneNode_(goog$dom$getElement(a));
                a.removeAttribute("id");
                this.ma = a;
                yt$dom$datasets$set(this.ma, "annotation_id", this.n.id);
                this.Ve.G(this.ma, "click", goog$bind(this.Dq, this));
                this.A.appendChild(this.ma);
            }
            yt$style$show(this.A);
            ld(this.A, um(this) ? 1 : 0);
            wm(this);
            if (this.U) {
                yt$style$show(this.U.B());
            }
        }
    };
    tm.prototype.wi = function () {
        yt$style$hide(this.A);
        if (this.U) {
            yt$style$hide(this.U.B());
        }
    };
    var um = function (a) {
        return a.n.style != "label" || a.U.hasFocus;
    };
    var ym = function (a) {
        V.call(this, a);
        this.b = a.getEnvironmentData();
        this.Za = {};
        this.Ic = {};
        this.ah = {};
        this.ej = {};
        this.Te = {};
        this.qg = new qm(this.pubsub);
        var a = a.getRootNode();
        var b = xm;
        this.om = goog$dom$getElementByClass(b.Vq, a);
        var c = goog$dom$getElementByClass(b.Wq, this.om);
        this.Xq = goog$dom$getElementByClass(b.Uq, a);
        yt$events$listen(this.Xq, "click", goog$bind(this.$q, this));
        this.pubsub.e("onResize", goog$bind(this.sj, this));
        this.pubsub.e("onStateChange", goog$bind(this.ar, this));
        this.pubsub.e("mouseover", goog$bind(this.lj, this));
        this.pubsub.e("mouseout", goog$bind(this.kj, this));
        this.pubsub.e("click", goog$bind(this.Yq, this));
        this.pubsub.e("closed", goog$bind(this.Zq, this));
        this.ij = new Ol(c, goog$bind(this.Qi, this));
    };
    goog$inherits(ym, V);
    var xm = {
        Uq: "html5-annotations-button",
        Vq: "video-annotations",
        Wq: "countdowntimer"
    };
    ym.prototype.W = "iv";
    ym.prototype.Sj = false;
    ym.prototype.bn = true;
    ym.prototype.loaded = false;
    ym.prototype.Ya = false;
    var zm = function (a) {
        if (a.getEnvironmentData().eventLabel == "leanback") {
            return false;
        } else {
            return zg(a.getVideoData(), "iv3_module");
        }
    };
    ym.prototype.zb = function () {
        return zm(this.s);
    };
    ym.prototype.create = function () {
        ym.j.create.call(this);
        this.a = this.s.getVideoData();
        if (this.lr()) {
            this.load();
        }
    };
    ym.prototype.destroy = function () {
        this.unload();
        ym.j.destroy.call(this);
    };
    ym.prototype.lr = function () {
        return this.a.hm == 1;
    };
    ym.prototype.$q = function () {
        if (this.loaded || this.Ya) {
            this.unload();
        } else {
            this.load();
        }
    };
    ym.prototype.sj = function () {
        for (var a in this.ah) {
            wm(this.ah[a]);
        }
    };
    ym.prototype.ar = function (a) {
        this.bn = a.state.pf ? true : false;
        if (a.Zm.yi && !a.state.yi) {
            this.ij.stop();
        }
    };
    ym.prototype.load = function () {
        ym.j.load.call(this);
        var a = {
            format: "XML",
            method: "GET",
            Mg: {
                video_id: this.a.m
            },
            nm: goog$bind(this.xq, this)
        };
        this.Ya = true;
        yt$net$ajax$send(this.b.Db + "annotations/read2", a);
    };
    ym.prototype.unload = function () {
        this.qg.k({
            "iv-event": 1
        });
        this.Qi();
        this.Wd();
        for (var a in this.Za) {
            delete this.Za[a];
        }
        for (a in this.Ic) {
            var b = this.Ic[a];
            b.Ve.Wa();
            if (b.A) {
                goog$dom$removeNode(b.A);
            }
            if (b.U && b.U.B()) {
                goog$dom$removeNode(b.U.B());
            }
            delete this.Ic[a];
        }
        this.loaded = this.Ya = false;
        this.ej = {};
        this.Te = {};
        this.Ic = {};
        this.Za = {};
        ym.j.unload.call(this);
    };
    var Am = function (a, b) {
        var c = {};
        for (var d = 0; d < b.attributes.length; d++) {
            var f = b.attributes[d];
            c[f.name] = f.nodeValue;
        }
        for (d = 0; d < b.childNodes.length; d++) {
            f = b.childNodes[d];
            if (f.tagName) {
                var g;
                if (c[f.tagName]) {
                    g = c[f.tagName];
                } else {
                    g = [];
                    c[f.tagName] = g;
                }
                if (f.childNodes && f.childNodes.length == 1 && f.childNodes[0].nodeType == 3) {
                    g.push(f.childNodes[0].nodeValue);
                } else {
                    g.push(Am(a, f));
                }
            }
        }
        return c;
    };
    ym.prototype.xq = function (a) {
        if (this.Ya && !this.loaded) {
            this.Ya = false;
            var b = a.responseXML ? a.responseXML.getElementsByTagName("annotations") : null;
            if (!yt$net$ajax$isSuccess_(a) || !b) {
                yt$player$logger.log(goog$debug$Logger$Level$SEVERE, "Could not obtain annotation JSON from server.");
            } else {
                a = b[0].getElementsByTagName("annotation");
                for (b = 0; b < a.length; b++) {
                    var c = Am(this, a[b]);
                    var d = new Lk();
                    try {
                        d.Na(c);
                    } catch (f) {
                        yt$player$logger.log(goog$debug$Logger$Level$SEVERE, "Could not parse object from server.");
                        continue;
                    }
                    this.Za[d.id] = d;
                }
                for (var g in this.Za) {
                    a = this.Za[g];
                    b = a;
                    c = undefined;
                    b: if (b.type == "highlight") {
                        c = true;
                    } else {
                        if (b.type == "text") {
                            c = undefined;
                            for (c in Mk) {
                                if (b.style == Mk[c]) {
                                    c = true;
                                    break b;
                                }
                            }
                        }
                        c = false;
                    }
                    if (c) {
                        c = new tm(b, goog$bind(this.appendToVideoContent, this), this.b, this.pubsub);
                        b = this.Ic[b.id] = c;
                    } else {
                        b = null;
                    }
                    if (b && a.ya && a.ya.gc) {
                        c = a.ya.gc;
                        if ((d = this.Za[c])) {
                            b.gc = d;
                        }
                        this.Te[c] = a.id;
                    }
                }
                goog$dom$classes$add(this.s.getRootNode(), this.W + "-loaded");
                this.loaded = true;
                g = [];
                for (var i in this.Za) {
                    a = this.Za[i];
                    if (a.ya && a.ya && Kk(a.ya)) {
                        b = Kk(a.ya);
                        a = b.start * 1000;
                        b = b.end * 1000;
                        if (a == 0) {
                            a++;
                            b++;
                        }
                        if (a == b) {
                            b++;
                        }
                        a = new Ef(a, b, {
                            id: i
                        });
                        g.push(a);
                    }
                }
                this.addCueRange.apply(this, g);
            }
        }
    };
    ym.prototype.rb = function (a) {
        ym.j.rb.call(this, a);
        a = a.getId();
        if (!this.ej[a]) {
            var b = this.Za[a];
            if (b.type == "pause") {
                if (this.bn && (a = Rk(b)) && a.duration && a.duration.value) {
                    this.Sj = true;
                    this.pubsub.c("command_pause");
                    this.ij.start(a.duration.value * 1000);
                }
            } else {
                Bm(this, a);
                b = this.qg;
                a = this.Za[a];
                if (!b.an[a.id] && a.getUrl()) {
                    b.an[a.id] = true;
                    b.k(sm(a, 2));
                }
            }
        }
    };
    ym.prototype.lc = function (a) {
        ym.j.lc.call(this, a);
        Cm(this, a.getId());
    };
    var Cm = function (a, b) {
        var c = a.Ic[b];
        if (c) {
            var d = a.Te[b];
            if (d) {
                Cm(a, d);
            }
            c.wi();
            delete a.ah[b];
        }
    };
    var Bm = function (a, b) {
        var c = a.Ic[b];
        if (c) {
            c.show();
            a.ah[b] = c;
        }
    };
    ym.prototype.Yq = function (a) {
        if (a && a.id) {
            var b = this.qg;
            if (a.getUrl()) {
                b.k(sm(a, 3));
            }
            if ((b = a.getUrl())) {
                var c = pm(b, this.a);
                if (c != -1) {
                    this.pubsub.c("command_seek", c);
                    this.Qi();
                } else {
                    var c = this.a;
                    var d = Ak(b);
                    if (d) {
                        if (om(d)) {
                            c = d.split("#", 2);
                            a =
                                yt$uri$setQueryData(c[0], {
                                    feature: "iv",
                                    annotation_id: a.id
                                }) + (c[1] ? "#" + c[1] : "");
                        } else {
                            a = c.Jl ? d : null;
                        }
                    } else {
                        a = null;
                    }
                    if (a) {
                        window.open(
                            a,
                            !this.a.Kl
                                ? "_top"
                                : this.b.eventLabel == "embedded"
                                  ? "_blank"
                                  : b.target
                                    ? b.target == "new"
                                        ? "_blank"
                                        : "_top"
                                    : om(Ak(b))
                                      ? "_top"
                                      : "_blank"
                        );
                    }
                }
            } else {
                yt$player$logger.log(goog$debug$Logger$Level$SEVERE, "Clicked on an annotation without a url.");
            }
        }
    };
    ym.prototype.lj = function (a) {
        if ((a = this.Te[a.id])) {
            Bm(this, a);
        }
    };
    ym.prototype.kj = function (a) {
        if ((a = this.Te[a.id])) {
            Cm(this, a);
        }
    };
    ym.prototype.Zq = function (a) {
        if (a || a.id) {
            this.ej[a.id] = true;
            Cm(this, a.id);
            if (a) {
                this.qg.k(sm(a, 4));
            }
        }
    };
    ym.prototype.Qi = function () {
        this.ij.stop();
        if (this.Sj) {
            this.Sj = false;
            this.pubsub.c("command_play");
        }
    };
    var Dm = RegExp(
        "^(ar|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Arab|Hebr|Thaa|Nkoo|Tfng))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)"
    );
    var Em = function (a) {
        a = a || yt$captions$DEFAULT_WINDOW_PARAMS_;
        w(this, a);
    };
    Em.prototype.Ah = 7;
    Em.prototype.Ch = 50;
    Em.prototype.Eh = 95;
    Em.prototype.uu = 80;
    Em.prototype.Qc = 0;
    Em.prototype.textAlign = "center";
    Em.prototype.backgroundColor = "#080808";
    Em.prototype.ph = "#fff";
    Em.prototype.opacity = 0.8;
    Em.prototype.jc = 15;
    Em.prototype.ok = 32;
    Em.prototype.isVisible = true;
    Em.prototype.fontFamily = '"Arial Unicode Ms", Arial';
    Em.prototype.fontSize = "100%";
    var Fm = function (a, b) {
        this.id = a;
        this.J = new Em(b);
        var c = "caption-window";
        if (this.id == 0) {
            c = "standard-caption-window";
        }
        this.D = goog$dom$createDom("div", {
            id: "caption-window-" + this.id,
            class: c
        });
        this.ne = goog$dom$createDom("span", {
            class: "captions-text",
            style: "visibility: hidden"
        });
        this.ne.innerHTML = "C";
        this.I = goog$dom$createDom("span", {
            class: "captions-text",
            tabindex: "4",
            "aria-live": "assertive"
        });
        c = goog$dom$createDom("div", {
            class: "caption-window-transform"
        });
        c.appendChild(this.I);
        this.D.appendChild(c);
    };
    Fm.prototype.id = 0;
    Fm.prototype.J = null;
    Fm.prototype.ih = "";
    Fm.prototype.ib = null;
    Fm.prototype.D = null;
    Fm.prototype.I = null;
    Fm.prototype.ne = null;
    Fm.prototype.type = 1;
    Fm.prototype.getType = function () {
        return this.type;
    };
    Fm.prototype.ek = function () {
        var a;
        this.ne.style.fontFamily = this.I.style.fontFamily;
        this.D.appendChild(this.ne);
        a = this.ne.offsetHeight;
        this.D.removeChild(this.ne);
        return a;
    };
    Fm.prototype.oh = function () {
        if (this.I) {
            if (this.id != 0) {
                gd(this.D, "100%");
                gd(this.D, this.I.offsetWidth);
            }
            Gm(this);
            yt$style$setDisplayed(this.D, this.J.isVisible);
        }
    };
    var Gm = function (a) {
        Zc(a.D, a.J.Ch + "%", a.J.Eh + "%");
        for (var b = 0; b <= 8; b++) {
            goog$dom$classes$remove(a.D, "anchor-point-" + b);
        }
        goog$dom$classes$add(a.D, "anchor-point-" + a.J.Ah);
    };
    Fm.prototype.Ln = function (a) {
        var b = [];
        a.forEach(function (a) {
            if (a.ie) {
                b[b.length - 1] += a.Ub();
            } else {
                b.push(a.Ub());
            }
        }, this);
        Hm(this, b.join("\n"));
        this.ib = a;
    };
    Fm.prototype.$d = function (a) {
        a = goog$string$htmlEscape(a);
        this.ih = a = Im(a);
        this.I.innerHTML = a;
        this.Lk();
        this.oh();
    };
    var Hm = function (a, b) {
        if (b) {
            var c = document.createElement("div");
            c.innerHTML = b;
            b = c.textContent || "";
            a.$d(b);
        }
    };
    Fm.prototype.Lk = function () {
        this.D.style.textAlign = this.J.textAlign;
        this.I.style.backgroundColor = this.J.backgroundColor;
        this.I.style.color = this.J.ph;
        this.I.style.opacity = this.J.opacity;
        this.I.style.fontFamily = this.J.fontFamily;
        this.I.style.fontSize = this.J.fontSize;
        if (this.J.Qc == 1) {
            this.I.setAttribute("dir", "rtl");
        } else {
            this.I.removeAttribute("dir");
        }
    };
    Fm.prototype.toString = function () {
        var a = "Caption window (" + this.id + "): " + this.ih;
        var b;
        for (b in this.J) {
            a += b + " " + this.J[b] + " | ";
        }
        return a;
    };
    var Im = function (a) {
        var a = a.split("\n");
        for (var b = 0, c = a.length; b < c; b++) {
            a[b] = a[b] ? "&nbsp;" + a[b] + "&nbsp;" : "";
        }
        return a.join("<br>");
    };
    Fm.prototype.Th = function () {
        this.ib = [];
        this.$d("");
    };
    var Jm = function (a, b) {
        Fm.call(this, a, b);
        this.I.style.display = "block";
        this.I.style.padding = "0";
        this.Pa = [];
    };
    goog$inherits(Jm, Fm);
    Jm.prototype.type = 0;
    Jm.prototype.Rc = "";
    Jm.prototype.Yc = false;
    Jm.prototype.mc = null;
    Jm.prototype.Pa = null;
    Jm.prototype.ek = function () {
        if (this.Pa[0]) {
            return this.Pa[0].offsetHeight;
        } else {
            return 0;
        }
    };
    var Km = function (a) {
        return a.Pa.reduce(function (a, c) {
            return Math.max(a, c.offsetWidth);
        }, 0);
    };
    Jm.prototype.oh = function () {
        if (this.id != 0) {
            this.Yc = true;
            gd(this.D, "100%");
            gd(this.D, this.Yc ? Km(this) : this.mc.width);
            this.Yc = false;
        }
        var a = Math.round(this.J.jc * this.ek());
        var b = this.D;
        if (goog$isString("max-height")) {
            goog$style$setStyle_(b, a + "px", "max-height");
        } else {
            goog$object$forEach("max-height", goog$partial(goog$style$setStyle_, b));
        }
        Gm(this);
        yt$style$setDisplayed(this.D, this.J.isVisible);
    };
    Jm.prototype.$d = function (a) {
        this.Th();
        a = goog$string$htmlEscape(a);
        a = Im(a);
        if (!this.Yc) {
            this.ih = a;
        }
        var a = a.split("<br>");
        for (var b = 0, c = a.length; b < c; b++) {
            if (a[b]) {
                var d = goog$dom$createDom("div", {
                    class: "caption-row-holder"
                });
                var f = goog$dom$createDom("span", {
                    class: "caption-row captions-text"
                });
                d.appendChild(f);
                f.innerHTML = a[b];
                if (!this.Yc) {
                    f.style.left = this.mc.hn[b];
                }
                this.I.appendChild(d);
                this.Pa.push(f);
            }
        }
        this.Lk();
        this.oh();
    };
    Jm.prototype.Th = function () {
        for (var a = 0, b = this.Pa.length; a < b; a++) {
            var c = Lc(this.Pa[a], "caption-row-holder");
            goog$dom$removeNode(c);
        }
        this.Pa = [];
    };
    Jm.prototype.Lk = function () {
        this.D.style.textAlign = this.J.textAlign;
        for (var a = 0, b = this.Pa.length; a < b; a++) {
            this.Pa[a].style.backgroundColor = this.J.backgroundColor;
        }
        this.I.style.color = this.J.ph;
        this.I.style.opacity = this.J.opacity;
        this.I.style.fontFamily = this.J.fontFamily;
        if (this.J.Qc == 1) {
            this.I.setAttribute("dir", "rtl");
        } else {
            this.I.removeAttribute("dir");
        }
    };
    var Lm = function (a, b) {
        Fm.call(this, a, b);
        this.ib = [];
        this.oc = [];
        this.ua = [];
        this.je = new Ud(433);
        this.je.stop();
        yt$events$listen(this.je, "tick", goog$bind(this.vt, this));
    };
    goog$inherits(Lm, Fm);
    Lm.prototype.type = 2;
    Lm.prototype.ua = null;
    Lm.prototype.rc = 0;
    Lm.prototype.oc = null;
    Lm.prototype.je = null;
    Lm.prototype.Ln = function (a) {
        var b = a.length;
        if (b <= 0) {
            this.Th();
        } else {
            for (var c = 0; c < b && this.ib.indexOf(a[c]) >= 0;) {
                c++;
            }
            this.ib = this.ib.concat(a.slice(c));
            Mm(this);
        }
    };
    Lm.prototype.Th = function () {
        this.ib = [];
        this.ua = [];
        this.rc = 0;
        this.ua = [];
        this.oc = [];
        this.be();
    };
    var Mm = function (a) {
        if (!Nm(a)) {
            if (a.rc >= a.ib.length) {
                a.be();
            } else {
                var b = a.ua.length - 1;
                if (b < 0) {
                    a.oc.push(0);
                    a.rc = 0;
                    a.ua.push("");
                    b = 0;
                }
                for (var c = a.ib.length, d = a.rc; d < c; d++) {
                    var f = a.ib[d];
                    if (f.Ub() == "\n") {
                        a.rc++;
                        a.oc[b]++;
                        break;
                    }
                    if (f.ie || a.ua[b].length == 0) {
                        a.ua[b] += f.Ub();
                        a.rc++;
                        a.oc[b]++;
                    } else {
                        break;
                    }
                }
                a.be();
                if (d < c && !Nm(a)) {
                    b = a.ek();
                    goog$dom$classes$add(a.I, "caption-rollup");
                    a.D.style.overflow = "hidden";
                    a.I.style.top = -b + "px";
                    a.je.start();
                }
            }
        }
    };
    var Nm = function (a) {
        return a.je.enabled || goog$dom$classes$has(a.I, "caption-rollup");
    };
    Lm.prototype.vt = function () {
        this.D.style.overflow = "visible";
        this.I.style.top = 0;
        this.je.stop();
        goog$dom$classes$remove(this.I, "caption-rollup");
        this.ua.push("");
        this.oc.push(0);
        Mm(this);
    };
    Lm.prototype.be = function () {
        if (!Nm(this)) {
            while (this.ua.length < this.J.jc) {
                this.ua.unshift("");
                this.oc.unshift(0);
            }
            while (this.ua.length > this.J.jc) {
                this.ua.shift();
                var a = this.oc.shift();
                if (a > 0) {
                    this.rc -= a;
                    this.ib.splice(0, a);
                }
            }
            this.$d(this.ua.join("\n"));
        }
    };
    var Om = function (a) {
        V.call(this, a);
        var b = a.getRootNode();
        this.b = a.getEnvironmentData();
        this.cc = [];
        this.aa = {};
        this.ac = {};
        this.$e = [];
        this.pj = goog$dom$getElementByClass("captions-translation-select", b);
        this.vj = goog$dom$getElementByClass("captions-translation-dialog", b);
        this.uj = goog$dom$getElementByClass("captions-transcribe-dialog", b);
        this.Ld = goog$dom$getElementByClass("captions-transcribe-menu-item", b);
        this.tj = goog$dom$getElementByClass("captions-settings-dialog", b);
        this.Vg = goog$dom$getElementByClass("html5-captions-button", b);
        yt$events$listen(this.Vg, "click", goog$bind(this.Fq, this));
        yt$events$listen(
            goog$dom$getElementByClass("captions-translation-confirm", b),
            "click",
            goog$bind(this.Lq, this)
        );
        yt$events$listen(
            goog$dom$getElementByClass("captions-translation-cancel", b),
            "click",
            goog$bind(this.lm, this)
        );
        yt$events$listen(
            goog$dom$getElementByClass("captions-transcribe-confirm", b),
            "click",
            goog$bind(this.Kq, this)
        );
        yt$events$listen(
            goog$dom$getElementByClass("captions-transcribe-cancel", b),
            "click",
            goog$bind(this.sm, this)
        );
        yt$events$listen(goog$dom$getElementByClass("captions-settings-bg", b), "click", goog$bind(this.Fm, this));
        yt$events$listen(
            goog$dom$getElementByClass("captions-settings-font-inc", b),
            "click",
            goog$bind(this.Em, this)
        );
        yt$events$listen(
            goog$dom$getElementByClass("captions-settings-font-dec", b),
            "click",
            goog$bind(this.Dm, this)
        );
        yt$events$listen(goog$dom$getElementByClass("captions-settings-confirm", b), "click", goog$bind(this.um, this));
        yt$events$listen(goog$dom$getElementByClass("captions-settings-cancel", b), "click", goog$bind(this.Jq, this));
        a = goog$dom$getElementByClass("captions-settings-dialog", b);
        ye(a, goog$bind(this.Gq, this), "html5-color-picker-button");
        this.rj = goog$dom$getElementByClass("html5-captions-tracks", this.Vg);
        this.dj = goog$dom$getElementByClass("html5-popup-menu", this.Vg);
        ye(this.dj, goog$bind(this.Eq, this), "yt-uix-button-menu-item");
        this.Md = new Ud();
        this.Md.stop();
        yt$events$listen(this.Md, "tick", goog$bind(this.wj, this));
        this.pubsub.e("onResize", goog$bind(this.sj, this));
        this.pubsub.e("onToggleBackground", goog$bind(this.Fm, this));
        this.pubsub.e("onFontSizeIncrease", goog$bind(this.Em, this));
        this.pubsub.e("onFontSizeDecrease", goog$bind(this.Dm, this));
        this.pubsub.e("showcontrols", goog$bind(this.Iq, this));
        this.pubsub.e("hidecontrols", goog$bind(this.Hq, this));
        if (
            this.b.eventLabel == "detailpage" &&
            (b = goog$dom$getElementByClass("captions-account-settings-link", b))
        ) {
            yt$style$show(b);
        }
        this.Ng = new Fm(99, $l);
        this.bf = new Ud(2000);
        this.bf.stop();
        yt$events$listen(this.bf, "tick", goog$bind(this.Mq, this));
    };
    goog$inherits(Om, V);
    Om.prototype.W = "cc";
    Om.prototype.le = "cc";
    Om.prototype.yo = "subtitlesModuleData";
    Om.prototype.a = null;
    Om.prototype.b = null;
    Om.prototype.Vg = null;
    Om.prototype.dj = null;
    Om.prototype.vj = null;
    Om.prototype.uj = null;
    Om.prototype.Ld = null;
    Om.prototype.tj = null;
    Om.prototype.rj = null;
    Om.prototype.$e = null;
    Om.prototype.cc = null;
    Om.prototype.aa = null;
    Om.prototype.ac = null;
    Om.prototype.Md = null;
    Om.prototype.Ng = null;
    Om.prototype.bf = null;
    Om.prototype.wa = null;
    Om.prototype.Dd = false;
    Om.prototype.Bn = 1;
    Om.prototype.N = {
        fontFamily: '"Arial Unicode Ms", Arial',
        fontSizeIncrement: 0,
        backgroundEnabled: true
    };
    Om.prototype.Qg = null;
    Om.prototype.Vm = false;
    Om.prototype.create = function () {
        Om.j.create.call(this);
        this.a = this.s.getVideoData();
        var a;
        if (this.b.Tl.cc_load_policy == 1 || this.a.Rl == 1 || xg(this.a, "yt:cc") == "alwayson") {
            a = true;
        } else {
            a = Ug(this, "module-enabled");
            a = a != null ? !!a : xg(this.a, "yt:cc") == "on";
        }
        if (a) {
            this.load();
        }
    };
    Om.prototype.destroy = function () {
        this.unload();
        Om.j.destroy.call(this);
    };
    Om.prototype.load = function () {
        Om.j.load.call(this);
        this.Dd = xg(this.a, "yt:cc") == "alwayson";
        goog$dom$classes$enable(this.dj, "captions-always-on", this.Dd);
        var a = this.a.Be.cc_lang_pref || this.b.Tl.cc_lang_pref || xg(this.a, "yt:cc_default_lang") || this.b.Eb;
        var a = a && a.split("_").join("-");
        this.wa = new km(this.a.Ti, this.a.m, a, this.a.Pl);
        yt$captions$CaptionsLoader$loadTrackList_(this.wa, goog$bind(this.uq, this));
        Vg(this, "module-enabled", true);
        this.N = Ug(this, "display-settings") || goog$object$clone(this.N);
        Pm(this);
        this.loaded = true;
    };
    Om.prototype.unload = function () {
        Qm(this);
        Sg(this);
        Vg(this, "module-enabled", false);
        this.loaded = false;
        Om.j.unload.call(this);
    };
    Om.prototype.k = function (a) {
        yt$player$logger.info(a);
    };
    var Rm = function (a, b) {
        goog$dom$removeChildren(a.pj);
        b.forEach(function (a) {
            var b = document.createElement("option");
            b.setAttribute("value", a.Ef);
            b.appendChild(document.createTextNode(a.Xh + " -- " + a.cp));
            this.pj.appendChild(b);
        }, a);
    };
    Om.prototype.uq = function () {
        mm(this.wa, goog$bind(this.Wn, this));
        goog$dom$removeChildren(this.rj.children[0]);
        Rm(this, this.wa.xh());
        var a = this.wa.Kh();
        if (a.length) {
            if (!this.Dd) {
                goog$dom$classes$remove(this.Ld, "disabled");
                yt$style$show(this.Ld);
            }
        } else {
            yt$style$hide(this.Ld);
        }
        var b = this.wa.Hf();
        if (b.length > 0) {
            this.k("Caption track list loaded, found " + b.length + " tracks.");
            var c = this.wa.Nh();
            b.forEach(function (a, b) {
                if (a.En) {
                    var g = a.toString();
                    var i = yt$captions$Track$getDisplayName_(a);
                    var m = false;
                    if (b == c) {
                        m = true;
                    }
                    Sm(this, g, i, m);
                }
            }, this);
        } else if (!a.length) {
            this.k("No captions found.");
            this.unload();
        }
    };
    Om.prototype.Wn = function (a, b) {
        var c = a.nh.concat(a.mh);
        this.k("Caption track loaded with " + c.length + " events.");
        Qm(this);
        this.$e = goog$array$toArray(c);
        this.Qg = b;
        this.Vm = Dm.test(b.Uc);
        var d = [];
        c.forEach(function (a, b) {
            var c = new Ef(a.Ja(), a.Ja() + a.gb, {
                id: b
            });
            d.push(c);
        }, this);
        this.addCueRange.apply(this, d);
        Tm(this, b);
        Hm(this.Ng, yt$captions$Track$getDisplayName_(b));
        this.appendToVideoContent(this.Ng.D);
        this.bf.start();
    };
    var Tm = function (a, b) {
        var c = {
            trackName: b.getName(),
            trackKind: b.bb
        };
        if (b.sc) {
            c.trackLangCode = b.sc.Ef;
            c.fromLangCode = b.Uc;
        } else {
            c.trackLangCode = b.Uc;
        }
        a.log(c);
    };
    Om.prototype.rb = function (a) {
        this.cc.push(this.$e[a.getId()]);
        this.Md.start();
    };
    Om.prototype.lc = function (a) {
        a = this.cc.indexOf(this.$e[a.getId()]);
        if (a >= 0) {
            this.cc.splice(a, 1);
        }
        this.Md.start();
    };
    var Um = function (a, b) {
        if (b instanceof yt$captions$WindowEvent) {
            var c = a.aa[b.id];
            w(b.params, a.N);
            if (c && c.getType() != (b.params.Ij ? 2 : b.dh ? 0 : 1)) {
                goog$dom$removeNode(c.D);
                delete a.aa[b.id];
            }
            if (!a.aa[b.id]) {
                var c = a.aa;
                var d = b.id;
                var f;
                a: {
                    f = b.id;
                    var g = b.params;
                    switch (b.params.Ij ? 2 : b.dh ? 0 : 1) {
                        case 0:
                            f = new Jm(f, g);
                            break a;
                        case 2:
                            f = new Lm(f, g);
                            break a;
                        default:
                            f = new Fm(f, g);
                    }
                }
                c[d] = f;
                c = a.aa[b.id].D;
                goog$dom$classes$enable(c, "captions-asr", a.Qg.bb == "asr");
                if (b.params.Qc != null) {
                    b.params.Qc = a.Vm ? 1 : 0;
                }
                if (a.aa[b.id].id == 0) {
                    a.appendAboveVideoControls(c);
                } else {
                    a.appendToVideoContent(c);
                }
            }
            w(a.aa[b.id].J, b.params);
            if ((b.params.Ij ? 2 : b.dh ? 0 : 1) == 0) {
                c = a.aa[b.id];
                c.Rc = b.Rc;
                c.mc = {};
                c.Yc = true;
                c.$d(c.Rc);
                c.mc.jc = c.Pa.length;
                c.mc.width = c.D.offsetWidth;
                c.mc.hn = [];
                for (d = 0; d < c.mc.jc; d++) {
                    c.mc.hn.push(c.Pa[d].offsetLeft);
                }
                c.Yc = false;
                c.$d(c.ih);
            }
        } else {
            c = b.Zg;
            if (!a.ac[c]) {
                a.ac[c] = [];
            }
            a.ac[c].push(b);
        }
    };
    Om.prototype.sj = function () {
        this.Bn = jh(this.b).height / 360;
        Vm(this);
        for (var a in this.aa) {
            this.aa[a].oh();
        }
    };
    Om.prototype.Mq = function () {
        this.bf.stop();
        goog$dom$removeNode(this.Ng.D);
    };
    Om.prototype.wj = function () {
        this.Md.stop();
        Vm(this);
        var a = this.cc.length;
        var b;
        for (b in this.ac) {
            delete this.ac[b];
        }
        this.cc.sort(function (a, b) {
            if (a.Ja() == b.Ja()) {
                return a.dd() - b.dd();
            } else {
                return a.Ja() - b.Ja();
            }
        });
        for (var c = 0; c < a; c++) {
            Um(this, this.cc[c]);
        }
        for (b in this.aa) {
            if (this.ac[b]) {
                this.aa[b].Ln(this.ac[b]);
            } else {
                goog$dom$removeNode(this.aa[b].D);
                delete this.aa[b];
            }
        }
        this.k("Refreshing caption display...");
    };
    Om.prototype.Fm = function () {
        this.N.backgroundEnabled = !this.N.backgroundEnabled;
        Vg(this, "display-settings", this.N);
        if (this.N.backgroundEnabled) {
            Ee(this.To);
        } else {
            this.To = Fe(
                ".captions-text, .caption-row",
                "background-color: transparent !important;text-shadow: #000 0 0 4px, #000 0 0 4px, #000 0 0 4px, #000 0 0 4px;",
                {
                    Sc: this.To,
                    reset: true
                }
            );
        }
    };
    Om.prototype.Iq = function () {
        var a = this.aa[0];
        if (a && a.D) {
            ec(a.D, "controls-hidden", "controls-visible");
        }
    };
    Om.prototype.Hq = function () {
        var a = this.aa[0];
        if (a && a.D) {
            var a = a.D;
            for (var b = goog$dom$classes$get(a), c = false, d = 0; d < b.length; d++) {
                if (b[d] == "controls-visible") {
                    goog$array$splice(b, d--, 1);
                    c = true;
                }
            }
            if (c) {
                b.push("controls-hidden");
                a.className = b.join(" ");
            }
        }
    };
    Om.prototype.Dm = function () {
        this.N.fontSizeIncrement -= 1;
        Vm(this);
    };
    Om.prototype.Em = function () {
        this.N.fontSizeIncrement += 1;
        Vm(this);
    };
    var Vm = function (a) {
        Vg(a, "display-settings", a.N);
        var b = "font-size: " + Math.round(((a.N.fontSizeIncrement || 0) + 16) * a.Bn) + "px;";
        a.Bt = Fe(".caption-window-transform", b, {
            Sc: a.Bt,
            reset: true
        });
    };
    var Qm = function (a) {
        a.Wd();
        a.cc = [];
        a.$e = [];
        a.Qg = null;
        a.wj();
    };
    var Wm = function (a, b) {
        yt$captions$CaptionsLoader$loadTrack_(a.wa, b, goog$bind(a.Wn, a));
    };
    Om.prototype.Fq = function () {
        if (!this.loaded) {
            this.load();
        }
    };
    Om.prototype.Eq = function (a) {
        var a = Lc(a.target, "yt-uix-button-menu-item");
        var b = yt$dom$datasets$get(a, "action");
        if (b) {
            switch (b) {
                case "translate":
                    if (!this.Dd) {
                        Sg(this);
                        Rg(this);
                        yt$style$show(this.vj);
                    }
                    break;
                case "transcribe":
                    if (!goog$dom$classes$has(this.Ld, "disabled")) {
                        Sg(this);
                        Rg(this);
                        yt$style$show(this.uj);
                    }
                    break;
                case "settings":
                    Sg(this);
                    Rg(this);
                    Xm(this);
                    yt$style$show(this.tj);
                    break;
                case "captions-off":
                    this.unload();
            }
        } else if ((a = yt$dom$datasets$get(a, "trackid"))) {
            b = this.wa.Hf();
            if (b.length > 0) {
                this.k("Caption track changed to " + a + ".");
                for (var c = 0; c < b.length; c++) {
                    var d = b[c];
                    if (d.toString() == a) {
                        Wm(this, d);
                    }
                }
            } else {
                this.k("Caption change failed for " + a);
            }
        } else {
            this.k("onCaptionTrackClicked_ empty, ignoring");
        }
    };
    Om.prototype.lm = function () {
        yt$style$hide(this.vj);
    };
    Om.prototype.Lq = function () {
        if (!this.Dd) {
            this.lm();
            var a;
            a: {
                a = this.wa.xh();
                for (var b = 0; b < a.length; b++) {
                    var c = a[b];
                    if (c.Ef == this.pj.value) {
                        a = c;
                        break a;
                    }
                }
                a = null;
            }
            if (a) {
                b = this.Qg;
                c = new gm();
                c.Uc = b.Uc;
                c.Gh = b.Gh;
                c.ta = b.ta;
                c.bb = b.bb;
                c.Cf = false;
                c.pk = b.pk;
                c.sc = a;
                this.wa.Df(c);
                Sm(this, c.toString(), yt$captions$Track$getDisplayName_(c), true);
                Wm(this, c);
            }
        }
    };
    Om.prototype.sm = function () {
        yt$style$hide(this.uj);
    };
    Om.prototype.Kq = function () {
        if (!this.Dd) {
            this.sm();
            goog$dom$classes$add(this.Ld, "disabled");
            var a = this.wa.Kh();
            if (a.length) {
                a = a[0];
                this.wa.Df(a);
                Sm(this, a.toString(), yt$captions$Track$getDisplayName_(a), true);
                Wm(this, a);
            }
        }
    };
    Om.prototype.um = function () {
        yt$style$hide(this.tj);
    };
    Om.prototype.Jq = function () {
        delete this.N;
        this.N = goog$object$clone(this.N);
        Vg(this, "display-settings", this.N);
        Pm(this);
        this.wj();
        this.um();
    };
    Om.prototype.Gq = function (a) {
        var b = goog$bind(function (b) {
            var d = yt$dom$datasets$get(a.currentTarget, b);
            if (d) {
                this.N[b] = d;
            }
        }, this);
        b("color");
        b("background");
        Pm(this);
        Vg(this, "display-settings", this.N);
    };
    var Xm = function (a) {
        var b = {
            Sc: a.qi
        };
        var c = a.N.color;
        var d = a.N.background;
        if (c) {
            a.qi = Fe('.html5-popup-dialog button[data-color="' + c + '"]', "border: 3px solid #992121;", b);
        }
        if (d) {
            a.qi = Fe('.html5-popup-dialog button[data-background="' + d + '"]', "border: 3px solid #992121;", b);
        }
    };
    var Pm = function (a) {
        var b = [];
        var c = goog$bind(function (a) {
            var c = this.N[a];
            if (c) {
                b.push(a + ": " + c + " !important");
            }
        }, a);
        c("color");
        c("background");
        a.qi = Fe(".captions-text", b, {
            Sc: a.qi,
            reset: true
        });
        Xm(a);
    };
    var Sm = function (a, b, c, d) {
        var a = a.rj.children[0];
        var f = document.createElement("li");
        f.setAttribute("class", "yt-uix-button-menu-item");
        f.setAttribute("data-trackid", b);
        var b = "caption-track-" + b;
        var g = document.createElement("input");
        g.setAttribute("type", "radio");
        g.setAttribute("name", "language");
        g.setAttribute("value", c);
        g.id = b;
        g.checked = d;
        goog$dom$classes$add(g, "yt-uix-button-menu-close");
        c = document.createTextNode(c);
        d = document.createElement("label");
        d.setAttribute("for", b);
        f.appendChild(g);
        d.appendChild(c);
        f.appendChild(d);
        a.appendChild(f);
    };
    Om.prototype.zb = function (a) {
        return !!a.getVideoData().Ti;
    };
    var Ym = function () {
        var a;
        if ((a = kg())) {
            a: {
                if (navigator.plugins && navigator.plugins.length > 0) {
                    for (a = 0; a < navigator.plugins.length; a++) {
                        if (navigator.plugins[a].name.indexOf("NVIDIA 3D Vision") >= 0) {
                            a = true;
                            break a;
                        }
                    }
                }
                a = false;
            }
            if (a) {
                a: {
                    var b = navigator.userAgent.match(/Firefox[\/\s](\d+\.\d+)/);
                    if (b && b.length > 1 && b[1] >= 4) {
                        b = document.createElement("embed");
                        b.setAttribute("id", "NvImageDetectionFFID");
                        b.setAttribute("style", "visibility: hidden");
                        b.setAttribute("width", 25);
                        b.setAttribute("height", 25);
                        b.setAttribute("type", "image/jps");
                        goog$dom$append(document.documentElement, b);
                        b = goog$dom$getElement("NvImageDetectionFFID");
                        try {
                            if (b != null) {
                                a = b.NvGetDriverVersion() >= 27527;
                                break a;
                            }
                        } catch (c) {}
                    }
                    a = false;
                }
            }
        }
        return a;
    };
    var an = function (a) {
        V.call(this, a);
        var b = a.getVideoData();
        if (b.Pe) {
            Zm(this);
        }
        $m(this, "html5-threed-conversion-on", goog$bind(this.us, this));
        $m(this, "html5-threed-conversion-off", goog$bind(this.ts, this));
        var c = this.s.getRootNode();
        var a = goog$dom$getElementByClass("html5-threed-popup-menu-change-mode-link", c);
        var c = goog$dom$getElementByClass("html5-threed-dialog-change-mode-button", c);
        var b = "/select_3d_mode?video_id=" + b.m;
        a.setAttribute("href", b);
        c.setAttribute("href", b);
    };
    goog$inherits(an, V);
    an.prototype.ld = null;
    var $m = function (a, b, c) {
        a = a.s.getRootNode();
        b = goog$dom$getElementByClass(b, a);
        yt$events$listen(b, "click", c);
    };
    an.prototype.W = "threed";
    an.prototype.le = "threed";
    an.prototype.create = function () {
        this.s.preparePlayerThreeD();
        an.j.create.call(this);
    };
    an.prototype.destroy = function () {
        this.s.preparePlayerThreeD(true);
        this.unload();
        an.j.destroy.call(this);
    };
    an.prototype.zb = function (a) {
        a = a.getVideoData();
        return !!a.Pe || !!a.Ag;
    };
    an.prototype.us = function () {
        bn(this, true);
    };
    an.prototype.ts = function () {
        bn(this, false);
    };
    var bn = function (a, b) {
        var c = a.s.getVideoData();
        if (c.Ag && c.Kc != b) {
            a.s.toggleThreeD();
            if (b) {
                Zm(a);
            } else {
                Sg(a);
            }
        }
    };
    var Zm = function (a) {
        if (!Ug(a, "warning-shown") && !Ym()) {
            var b = a.s.getRootNode();
            a.ld = goog$dom$getElementByClass("threed-html5-warning-dialog", b);
            yt$style$show(a.ld);
            yt$setTimeout(
                goog$bind(function () {
                    cn(this);
                }, a),
                0
            );
            yt$events$listen(
                a.ld,
                "mouseover",
                goog$bind(function () {
                    goog$dom$classes$remove(this.ld, "hide-dialog");
                }, a)
            );
            yt$events$listen(
                a.ld,
                "mouseout",
                goog$bind(function () {
                    cn(this);
                }, a)
            );
            $m(a, "threed-html5-warning-close", goog$bind(a.Fo, a));
        }
    };
    var cn = function (a) {
        goog$dom$classes$add(a.ld, "hide-dialog");
        yt$setTimeout(
            goog$bind(function () {
                if (goog$dom$classes$has(this.ld, "hide-dialog")) {
                    this.Fo();
                }
            }, a),
            9000
        );
    };
    an.prototype.Fo = function () {
        Vg(this, "warning-shown", true);
        Sg(this);
    };
    var dn = function (a, b) {
        var c = goog$dom$getElementByClass("html5-ypc-module", a.getRootNode());
        this.$a = goog$dom$getElementByClass("html5-ypc-overlay", c);
        this.Zs = goog$dom$getElementByClass("html5-ypc-message", c);
        this.Ok = goog$dom$getElementByClass("html5-ypc-purchase", c);
        this.ma = goog$dom$getElementByClass("html5-module-close", c);
        this.$h = goog$dom$getElementByClass("html5-module-recall", c);
        a.appendAboveVideoControls(c);
        this.$ = b;
        yt$events$listen(this.Ok, "click", goog$bind(this.ct, this));
        yt$events$listen(this.ma, "click", goog$bind(this.$s, this));
        yt$events$listen(this.$h, "click", goog$bind(this.vo, this));
    };
    dn.prototype.$a = null;
    dn.prototype.Ok = null;
    dn.prototype.ma = null;
    dn.prototype.$h = null;
    dn.prototype.$ = null;
    dn.prototype.update = function (a, b) {
        goog$dom$setTextContent(this.Zs, a);
        goog$dom$setTextContent(this.Ok, b);
        this.vo();
    };
    dn.prototype.ct = function () {
        this.$.c("ypcContentRequest");
    };
    dn.prototype.vo = function () {
        Cc(this.$a, this.$h);
    };
    dn.prototype.$s = function () {
        Cc(this.$h, this.$a);
    };
    var en = function (a) {
        V.call(this, a);
        this.pubsub.e("ypcContentRequest", this.Ms, this);
        this.zm = new dn(a, this.pubsub);
        this.ym = new Ef(0, 2147483646, {
            priority: 1
        });
    };
    goog$inherits(en, V);
    en.prototype.W = "ypc";
    en.prototype.le = "ypc";
    en.prototype.zm = null;
    en.prototype.ym = null;
    en.prototype.zb = function () {
        return zg(this.s.getVideoData(), "ypc_module");
    };
    en.prototype.create = function () {
        en.j.create.call(this);
        this.a = this.s.getVideoData();
        if (this.a.Wl) {
            this.zm.update(this.a.Pp, this.a.Qp);
            this.addCueRange(this.ym);
        } else {
            this.s.loadVideoByPlayerVars({
                force_data_reload: true,
                video_id: this.a.m,
                ypc_preview: 1
            });
        }
    };
    en.prototype.destroy = function () {
        this.Wd();
    };
    en.prototype.rb = function (a) {
        en.j.rb.call(this, a);
        this.load();
    };
    en.prototype.lc = function (a) {
        this.unload();
        en.j.lc.call(this, a);
    };
    en.prototype.Ms = function () {
        if (this.a.hj) {
            if (this.s.getEnvironmentData().eventLabel == "embedded") {
                Ql(this.a.hj);
            } else {
                window.location = yt$uri$appendQueryData(this.a.hj, {}) + "";
            }
        } else if (this.a.Zl) {
            var a = goog$getObjectByName("yt.www.watch.player.handleEndPreview");
            if (a) {
                a(this.a.Zl);
            }
        }
    };
    var fn = function () {
        this.Vc = [];
        this.vk = {};
        this.Ri = {};
        this.Cd = {};
    };
    fn.prototype.Vc = null;
    fn.prototype.vk = null;
    fn.prototype.Pi = null;
    fn.prototype.Ri = null;
    fn.prototype.Cd = null;
    fn.prototype.va = null;
    var hn = function (a) {
        gn.forEach(function (a) {
            var c;
            var d = goog$getUid(a);
            c = this.vk[d];
            if (!c && (c = a(this.va))) {
                var a = (this.vk[d] = c);
                var f;
                for (f in this.Pi) {
                    a.pubsub.e(f, this.Pi[f]);
                }
                a.pubsub.e("command_log_timing", this.cs, this);
            }
            if (c && c.zb(this.va)) {
                c.create();
                this.Vc.push(c);
            }
        }, a);
    };
    var jn = function (a) {
        a.Vc.forEach(function (a) {
            a.destroy();
        });
        a.Vc = [];
    };
    fn.prototype.gq = function (a) {
        this.Vc.forEach(function (b) {
            if (b.W == a) {
                b.load();
            }
        });
    };
    fn.prototype.lq = function (a) {
        this.Vc.forEach(function (b) {
            if (b.W == a) {
                b.unload();
            }
        });
    };
    var kn = function (a, b, c) {
        goog$array$forEach(a.Vc, function (a) {
            a.pubsub.c(b, c);
        });
    };
    fn.prototype.cs = function (a, b) {
        w(this.Cd, a || null);
        w(this.Ri, b || null);
    };
    var ln = function (a, b, c) {
        this.xt = a;
        this.kd = b;
        this.$c = c;
        this.wt = goog$bind(this.St, this);
    };
    goog$inherits(ln, Sc);
    ln.prototype.Rh = false;
    ln.prototype.Dk = 0;
    ln.prototype.ha = null;
    ln.prototype.stop = function () {
        if (this.ha) {
            goog$Timer$defaultTimerObject.clearTimeout(this.ha);
            this.ha = null;
            this.Rh = false;
        }
    };
    ln.prototype.pause = function () {
        this.Dk++;
    };
    ln.prototype.r = function () {
        ln.j.r.call(this);
        this.stop();
    };
    ln.prototype.St = function () {
        this.ha = null;
        if (this.Rh && !this.Dk) {
            this.Rh = false;
            mn(this);
        }
    };
    var mn = function (a) {
        a.ha = Vd(a.wt, a.kd);
        a.xt.call(a.$c);
    };
    var nn = function (a) {
        this.va = a;
        this.Cr = new ln(this.ls, 250, this);
        a.pubsub.e("videoready", this.ms, this);
        a.pubsub.e("seekto", this.os, this);
        a.pubsub.e("onResize", this.pb, this);
    };
    nn.prototype.jh = false;
    nn.prototype.Zc = 0;
    nn.prototype.ik = 0;
    nn.prototype.lk = 0;
    nn.prototype.rs = 10;
    nn.prototype.xa = 0;
    nn.prototype.gh = 0;
    nn.prototype.ho = 0.5625;
    nn.prototype.Vn = 0;
    nn.prototype.ms = function () {
        if (this.dk) {
            goog$dom$removeChildren(this.yb);
        }
        goog$dom$classes$remove(this.xb, "enabled");
        this.Vd = this.Sd = null;
        var a = this.va.getVideoData();
        if (!a.jj || !a.dm) {
            this.jh = false;
        } else {
            this.jh = true;
            goog$dom$classes$add(this.xb, "enabled");
            this.Sd = a.jj;
            var a = (this.Vd = a.dm);
            var b = goog$bind(this.on, this);
            a.$.e(a.Qm, b);
            on(this);
            var a = this.yb.cloneNode(true);
            for (var b = this.Sd.getLevel(0).frames, c, d, f = 0; f < b; f++) {
                d = this.dk.cloneNode(false);
                c = this.Vd.kc(f, this.xa);
                pn(d, c, this.xa, this.gh);
                a.appendChild(d);
            }
            Cc(a, this.yb);
            this.yb = a;
        }
    };
    nn.prototype.ud = function (a) {
        this.xb = a;
        this.yb = goog$dom$getElementByClass("html5-storyboard-filmstrip", this.xb);
        this.bo = goog$dom$getElementByClass("html5-storyboard-lens", this.xb);
        this.as = goog$dom$getElementByClass("html5-storyboard-lens-inner", this.xb);
        this.dk = goog$dom$getElementByClass("html5-storyboard-thumbnail", this.yb);
        goog$dom$removeNode(this.dk);
    };
    nn.prototype.on = function (a, b) {
        md(this.yb, false);
        var c;
        var d;
        for (var f = a; f <= b; f++) {
            if ((d = this.yb.children[f])) {
                c = this.Vd.kc(f, this.xa);
                pn(d, c, this.xa, this.gh);
            }
        }
        md(this.yb, true);
    };
    var pn = function (a, b, c, d) {
        var f = Math.min(c / (b.$o / b.fa), d / (b.Zo / b.rows));
        var g = b.$o * f;
        var f = b.Zo * f;
        var g = Math.floor(g / b.fa) * b.fa;
        var f = Math.floor(f / b.rows) * b.rows;
        var i = g / b.fa;
        var m = f / b.rows;
        var p = Math.floor((c - i) / 2);
        var c = Math.ceil((c - i) / 2);
        var d = Math.floor((d - m) / 2);
        var b = {
            width: i + "px",
            height: m + "px",
            "margin-top": d + "px",
            "margin-bottom": d + "px",
            "margin-left": p + "px",
            "margin-right": c + "px",
            "background-image": "url(" + b.url + ")",
            "background-position": b.Kt * -1 * i + "px " + b.row * -1 * m + "px",
            "background-size": g + "px " + f + "px"
        };
        if (goog$isString(b)) {
            goog$style$setStyle_(a, undefined, b);
        } else {
            goog$object$forEach(b, goog$partial(goog$style$setStyle_, a));
        }
    };
    nn.prototype.os = function (a) {
        if (this.jh) {
            this.ik = this.lk * a - this.Zc / 2;
            Zc(this.yb, this.ik * -1);
            var b = this.Sd.getLevel(0).frames;
            var a = Math.round(b * a);
            var b = (a = Oc(a, 0, b - 1));
            if (b != this.Vn) {
                pn(this.as, this.Vd.kc(b, this.xa * 2), Math.round(this.xa * 2), Math.round(this.gh * 2));
                this.Vn = b;
            }
            b = this.Cr;
            if (!b.ha && !b.Dk) {
                mn(b);
            } else {
                b.Rh = true;
            }
        }
    };
    nn.prototype.ls = function () {
        for (
            var a = this.ik,
                b = Math.max(Math.floor(a / this.xa), 0),
                a = Math.min(Math.ceil((a + this.Zc) / this.xa), this.Sd.getLevel(0).frames - 1);
            b <= a;
            b++
        ) {
            var c = this.Vd;
            var d = b;
            for (var f = Mf(c.Wc, this.xa * 2), g = undefined, i = undefined; f >= 0; f--) {
                g = c.Wc.getLevel(f);
                i = Math.floor(d / (g.fa * g.rows));
                if (!g.ae(i)) {
                    var g = c;
                    var m = f;
                    var p = m + "-" + i;
                    if (!g.Un[p]) {
                        g.Un[p] = true;
                        g.zk.Bf(m, {
                            Zn: m,
                            $n: i
                        });
                    }
                }
            }
            dg(c);
        }
    };
    nn.prototype.pb = function () {
        if (this.jh) {
            on(this, true);
        }
    };
    var on = function (a, b) {
        var c = a.va.getEnvironmentData().td();
        if (c.width !== a.Zc) {
            a.Zc = c.width;
            gd(a.xb, a.Zc);
            c = a.Sd.getLevel(0).frames;
            a.xa = Math.floor(a.Zc / a.rs);
            a.gh = a.xa * a.ho;
            a.lk = a.xa * c;
            gd(a.yb, a.lk);
            c = Math.round(a.xa * 2);
            hd(a.bo, c, c * a.ho);
            Zc(a.bo, (a.Zc - c) / 2);
            if (b) {
                a.on(0, a.Sd.getLevel(0).frames - 1);
            }
        }
    };
    var qn = function (a, b) {
        var c;
        var d;
        if (!d) {
            d = 0;
        }
        if (!c) {
            c = goog$style$getVisibleRectForElement(document.body);
        }
        qh(new goog$math$Coordinate(b.pageX, b.pageY), a, d, null, c, 5);
    };
    var rn = function (a, b, c) {
        this.De = [];
        this.Ii = [];
        this.Mb = [];
        this.Rq = "//s.youtube.com/s";
        c = c || {};
        this.Gm = c.nbe;
        this.Hm = c.bc;
        this.Im = c.bd;
        this.Oq = c.bt;
        this.Jm = c.fs;
        this.Km = c.mos;
        this.source = c.sourceid;
        this.Qq = c.sd;
        this.webkitAudioDecodedByteCount = c.hmewadbc;
        this.webkitDecodedFrameCount = c.hmewdfc;
        this.webkitDroppedFrameCount = c.hmewdrop;
        this.webkitVideoDecodedByteCount = c.hmewvdbc;
        this.mozDecodedFrames = c.hmemdf;
        this.mozPaintDelay = c.hmempaintdelay;
        this.mozPaintedFrames = c.hmempainted;
        this.mozParsedFrames = c.hmempf;
        this.mozPresentedFrames = c.hmempresented;
        this.Pq = c.volume;
        this.autoplay = b.autoplay;
        this.Xe = b.Xe;
        this.kb = b.kb;
        this.eventLabel = b.eventLabel;
        this.Mb = b.Mb;
        this.yc = b.yc;
        this.Eb = b.Eb;
        this.Lm = b.td();
        this.Ta = b.Ta;
        this.referrer = b.referrer;
        this.region = b.region;
        this.Yb = b.Yb;
        this.Mm = new goog$math$Size(window.screen.width, window.screen.height);
        this.Kg = b.Kg;
        this.jf = b.jf;
        this.kf = b.kf;
        var d;
        var c = goog$getObjectByName("yt.www.watch.activity.getTimeSinceActive");
        if (b.eventLabel == "detailpage" && c) {
            d = c();
        }
        this.Sq = d;
        this.Nm = jh(b);
        this.Ye = b.Ye;
        this.pd = b.pd;
        if (!a.format || !a.Oe) {
            R(
                goog$debug$Logger$Level$WARNING,
                "yt.tracking.VideoStatsPing",
                "Attempted to construct a VideoStatsPing for a video that has no format or videoSize.",
                undefined
            );
        } else {
            this.Dg = a.Dg;
            this.format = a.format;
            this.lb = a.lb;
            this.Cc = a.Cc;
            this.wd = a.wd;
            this.pa = a.pa;
            this.Gb = a.Gb;
            this.Ib = a.Ib;
            this.Fd = a.Fd;
            this.Hb = a.Hb;
            this.Cg = a.Cg;
            this.m = a.m;
            this.Oe = a.Oe;
            this.gg = a.gg;
        }
    };
    rn.prototype.autoplay = false;
    rn.prototype.Jm = false;
    rn.prototype.Ji = false;
    rn.prototype.Km = false;
    rn.prototype.lb = false;
    rn.prototype.Tq = "yt";
    rn.prototype.Fd = false;
    rn.prototype.Um = false;
    rn.prototype.send = function () {
        if (this.Um) {
            R(
                goog$debug$Logger$Level$WARNING,
                "yt.tracking.VideoStatsPing",
                "send should be called only once for a given ping object.",
                undefined
            );
        } else {
            var a = {
                html5: "1",
                ns: this.Tq,
                ps: this.Ta,
                el: this.eventLabel,
                hl: this.Eb,
                cr: this.region,
                docid: this.m,
                sd: this.Qq,
                sourceid: this.source,
                referrer: this.referrer,
                q: this.Kg,
                plid: this.pa,
                fmt: this.format ? this.format.zc : 0,
                fs: this.Jm ? "1" : "0",
                screenw: this.Mm.width,
                screenh: this.Mm.height,
                w: this.Nm.width,
                h: this.Nm.height,
                vw: this.Oe.width,
                vh: this.Oe.height,
                playerw: this.Lm.width,
                playerh: this.Lm.height,
                vid: this.pd,
                hbid: this.Gb,
                rt: this.$g(this.Mp),
                mos: this.Km,
                volume: this.Pq,
                csipt: this.gg,
                subscribed: this.Hb,
                sw: this.Dg,
                list: this.Ib,
                eurl: this.kb,
                framer: this.yc,
                feature: this.Yb,
                threed: this.Cg,
                lact: this.Sq
            };
            if (this.Ji) {
                a.playback = "1";
            }
            if (this.autoplay) {
                a.autoplay = "1";
            }
            if (this.lb) {
                a.splay = "1";
            }
            if (this.Fd && !this.Ji) {
                a.vtmp = "1";
            }
            if (this.Xe) {
                a.content_v = this.Xe;
            }
            if (this.jf != undefined && this.kf) {
                a.uga = this.kf + this.jf;
            }
            if (this.Xl != undefined) {
                a.len = this.$g(this.Xl);
            }
            if (this.Mb.length > 0) {
                a.fexp = this.Mb.toString();
            }
            if (this.Cc > 0) {
                a.idpj = this.Cc;
            }
            if (this.wd > 0) {
                a.ldpj = this.wd;
            }
            if (this.Ye != undefined) {
                a.attrib = this.Ye;
            }
            if (this.Hm) {
                a.bc = this.Hm;
            }
            if (this.Im) {
                a.bd = this.Im;
                a.bt = this.Oq;
            }
            if (this.Gm > 0) {
                a.nbe = this.Gm;
            }
            if (this.webkitDecodedFrameCount != undefined) {
                a.hmewdfc = this.webkitDecodedFrameCount;
                a.hmewdrop = this.webkitDroppedFrameCount;
                a.hmewvdbc = this.webkitVideoDecodedByteCount;
                a.hmewadbc = this.webkitAudioDecodedByteCount;
            }
            if (this.mozParsedFrames != undefined) {
                a.hmempf = this.mozParsedFrames;
                a.hmemdf = this.mozDecodedFrames;
                a.hmempresented = this.mozPresentedFrames;
                a.hmempainted = this.mozPaintedFrames;
                a.hmempaintdelay = this.mozPaintDelay;
            }
            if (this.De.length > 0) {
                a.st = this.De.map(this.$g).join(",");
                a.et = this.Ii.map(this.$g).join(",");
            }
            a = yt$uri$appendQueryData(this.Rq, a);
            qf(a);
            this.Um = true;
        }
    };
    rn.prototype.$g = function (a) {
        return (a.toFixed(3) * 1).toString();
    };
    var sn = function () {};
    goog$inherits(sn, Sc);
    sn.prototype.xj = [10, 10, 10, 40];
    sn.prototype.ql = 0;
    sn.prototype.pn = 0;
    sn.prototype.Xa = null;
    sn.prototype.Jb = null;
    sn.prototype.Ll = "";
    sn.prototype.pm = false;
    sn.prototype.Y = 0;
    sn.prototype.Si = 0;
    sn.prototype.Le = 0;
    sn.prototype.wf = 0;
    sn.prototype.qh = [];
    sn.prototype.Me = 0;
    sn.prototype.rh = [];
    sn.prototype.bj = function (a, b, c, d, f, g) {
        this.a = b;
        this.b = c;
        this.Ll = this.b.Db + "get_video";
        this.Xa = d;
        this.zq = f;
        this.Jb = g;
        this.Ce = false;
        if (this.a.fg) {
            sn.prototype.xj = [10 + this.a.Cc, 10, 10, 40 + this.a.wd - this.a.Cc, 40];
            if (this.Og != undefined) {
                yt$clearInterval(this.Og);
            }
            this.Og = yt$setInterval(goog$bind(this.Bq, this), 100);
        }
        if (this.a.Dp) {
            this.pm = true;
        }
    };
    sn.prototype.Nl = function () {
        tn(this);
        this.ql = Math.min(this.ql + 1, this.xj.length - 1);
        var a = this.xj[this.ql];
        un(this);
        this.tg = yt$setInterval(goog$bind(this.Nl, this), a * 1000);
    };
    var un = function (a) {
        if (a.tg != undefined) {
            yt$clearInterval(a.tg);
        }
    };
    sn.prototype.Bq = function () {
        var a = this.Jb();
        var b = (goog$now() - this.Le) / 1000;
        var c = a - this.Y;
        if (c != 0) {
            var d = b - this.Si;
            if (c < 0 || c > d + 0.2) {
                vn(this);
                this.Me = a;
            }
            this.Si = b;
        }
        this.Y = a;
    };
    var vn = function (a) {
        if (a.pn > 400 && !a.pm) {
            un(a);
        } else if (a.Y - a.Me > 3) {
            a.rh[a.wf] = a.Me;
            a.qh[a.wf] = a.Y;
            a.wf++;
            a.Me = a.Y;
        }
    };
    var wn = function (a) {
        var b = {};
        var c = a.Xa();
        w(b, c);
        b = new rn(a.a, a.b, b);
        b.Mp = (goog$now() - a.Le) / 1000;
        b.Xl = a.zq();
        return b;
    };
    sn.prototype.Da = function () {
        var a = this.b;
        var b = this.a;
        var c = {
            ns: "yt",
            html5: "1",
            el: a.eventLabel,
            ps: a.Ta,
            fexp: a.Mb.join(",") || undefined,
            list: b.Ib
        };
        if (a.autoplay) {
            c.autoplay = "1";
        }
        if (b.Hb) {
            c.subscribed = b.Hb;
        }
        return c;
    };
    sn.prototype.Eg = function () {
        this.Le = goog$now();
    };
    var tn = function (a) {
        vn(a);
        if (a.wf > 0 && a.a.fg) {
            var b = wn(a);
            if (a.rh.length && a.qh.length) {
                b.De = a.rh;
                b.Ii = a.qh;
            }
            b.send();
            a.rh = [];
            a.qh = [];
            a.pn++;
        }
        a.wf = 0;
    };
    sn.prototype.Ec = function (a) {
        a.rt = (goog$now() - this.Le) / 1000;
        var b = this.Xa();
        w(a, b);
        if (a.event == "streamingerror") {
            b = "//s.youtube.com/stream_204";
            if (a.videoId) {
                delete a.videoId;
            }
        } else {
            b = this.b.Db + "player_204";
        }
        b = yt$uri$appendQueryData(b, this.Da());
        b = yt$uri$appendQueryData(b, a);
        qf(b);
    };
    sn.prototype.k = function (a, b) {
        if (!b) {
            b = goog$debug$Logger$Level$INFO;
        }
        yt$player$logger.log(b, a);
    };
    sn.prototype.r = function () {
        sn.j.r.call(this);
        un(this);
        if (this.Og != undefined) {
            yt$clearInterval(this.Og);
        }
    };
    var xn = function (a) {
        this.Ab = goog$dom$getElementByClass("html5-modal-panel", a);
        this.ko = goog$dom$getElementByClass("html5-modal-panel-close-button", this.Ab);
        this.jo = goog$dom$getElementByClass("html5-modal-panel-clipboard-substitute-content", this.Ab);
        this.Nf = qe("input", this.jo);
        this.jm = goog$dom$getElementByClass("html5-modal-panel-infobox-content", this.Ab);
        this.Aa = new Ge();
        this.Aa.G(document, "keydown", goog$bind(this.Rs, this));
        this.Aa.G(this.ko, "click", goog$bind(this.Ps, this));
        this.Aa.G(this.Ab, "contextmenu", goog$bind(this.Qs, this));
        yt$events$listen(this.Nf, "click", goog$bind(this.io, this));
    };
    xn.prototype.Aa = null;
    xn.prototype.jo = null;
    xn.prototype.Nf = null;
    xn.prototype.ko = null;
    xn.prototype.Ai = null;
    xn.prototype.jm = null;
    xn.prototype.Ab = null;
    xn.prototype.Ps = function () {
        this.wi();
    };
    xn.prototype.Qs = function (a) {
        a.preventDefault();
        a.stopPropagation();
    };
    xn.prototype.wi = function () {
        yt$style$hide(this.Ab);
        Vl("panelhidden");
    };
    xn.prototype.Rs = function (a) {
        if (a.keyCode == 27) {
            this.wi();
        }
    };
    xn.prototype.io = function () {
        this.Nf.select();
    };
    var yn = function (a, b) {
        if (a.Ai) {
            goog$dom$classes$remove(a.Ab, a.Ai);
        }
        a.Ai = b;
        goog$dom$classes$add(a.Ab, a.Ai);
        a.show();
    };
    xn.prototype.show = function () {
        yt$style$show(this.Ab);
    };
    var zn = function () {
        this.Of = {};
    };
    goog$inherits(zn, Lh);
    goog$addSingletonGetter(zn);
    zn.prototype.ye = "range-tooltip";
    zn.prototype.Yf = null;
    zn.prototype.format = null;
    zn.prototype.max = 0;
    zn.prototype.jp = 0;
    zn.prototype.ip = 0;
    zn.prototype.si = null;
    zn.prototype.Ub = function () {
        return " ";
    };
    zn.prototype.pl = function (a, b) {
        this.Yf = b;
        var c = this.getData(a, this.ye + "-format");
        if (c) {
            this.format = goog$getObjectByName(c);
        }
        this.max = parseInt(this.getData(a, "range-max"), 10);
        this.jp = goog$style$getPageOffset(a).x;
        this.ip = goog$style$getSize(a).width;
    };
    zn.prototype.ag = function () {
        Lh.prototype.ag.call(this);
        this.addBehavior("mousemove", this.ep);
        this.addBehavior("touchmove", this.hp);
    };
    zn.prototype.ti = function (a, b) {
        if (!this.lp) {
            Lh.prototype.ti.call(this, a, b);
            yt$events$listen(document, "mousemove", yt$uix$dispatchEvent_);
        }
    };
    zn.prototype.Zf = function (a, b) {
        Lh.prototype.Zf.call(this, a, b);
        Ae("mousemove");
    };
    zn.prototype.kl = function (a, b, c) {
        if (!this.si) {
            this.si = c.changedTouches[0].identifier;
            Lh.prototype.kl.call(this, a, b, c);
            yt$events$listen(document, "touchmove", yt$uix$dispatchEvent_);
            this.hp(0, b, c);
        }
    };
    zn.prototype.ui = function (a, b, c) {
        Lh.prototype.ui.call(this, a, b, c);
        Ae("touchmove");
        this.lp = true;
        Vd(
            function () {
                this.lp = false;
            },
            200,
            this
        );
        this.si = null;
    };
    zn.prototype.ep = function (a, b, c) {
        if (this.Yf) {
            b = (c.pageX - this.jp) / this.ip;
            b = Oc(b, 0, 1);
            b *= this.max;
            if (this.format) {
                b = this.format(b);
            }
            Oh(this, a, b);
            var b = goog$dom$getElementByClass(yt$uix$BaseWidget$getCssClass(this, "tip-body"), this.Yf);
            var d = this.Yf;
            var f = new goog$math$Coordinate(-5, 0);
            var a = goog$style$getPageOffset(a);
            qh(new goog$math$Coordinate(c.pageX + f.x, a.y + f.y), d, 0);
            c = (goog$style$getSize(b).width + 3) / -2 - -5;
            b.style.left = c + "px";
        }
    };
    zn.prototype.hp = function (a, b, c) {
        if (this.Yf) {
            for (a = 0; a < c.changedTouches.length; a++) {
                var d = c.changedTouches[a];
                if (d.identifier == this.si) {
                    c.pageX = d.pageX;
                    c.pageY = d.pageY;
                    this.ep(
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
    var yt$playerConfig = goog$getObjectByName("yt.playerConfig") || {};
    goog$exportSymbol("yt.playerConfig", yt$playerConfig);
    var yt$player$playerReferences_ = goog$getObjectByName("yt.player.playerReferences_") || {};
    goog$exportSymbol("yt.player.playerReferences_", yt$player$playerReferences_);
    var ytPlayerOnYouTubePlayerReady = function (a) {
        var b = yt$player$playerReferences_[a];
        var c =
            goog$dom$getElement(b.target).firstElementChild != undefined
                ? goog$dom$getElement(b.target).firstElementChild
                : goog$dom$getNextElementNode_(goog$dom$getElement(b.target).firstChild);
        var d = c.getApiInterface();
        goog$array$forEach(d, function (a) {
            b.api[a] = goog$bind(c[a], c);
        });
        b.api.ju = goog$bind(b.api.destroy, c);
        b.api.destroy = goog$bind(function () {
            this.ju();
            delete yt$player$playerReferences_[a];
        }, b.api);
        b.api.nativeAddEventListener = goog$bind(b.api.addEventListener, c);
        for (var f in b.api.subscribedEvents) {
            b.api.nativeAddEventListener(f, yt$player$exportEventCallback_(b.api, f));
        }
        b.api.addEventListener = yt$player$addEventListener_;
        if (b.eventLabel === "embedded") {
            b.api.addEventListener("SHARE_CLICKED", goog$bind(b.actions.Bu, b.actions));
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
    goog$exportSymbol("yt.tracking.share", function (a, b, c, d) {
        a = yt$uri$appendQueryData("/sharing_services", {
            name: a,
            v: b,
            locale: c,
            feature: d
        });
        qf(a);
    });
    goog$exportSymbol("yt.window.popup", yt$window$popup);
    yt$uix$initWidget(bi);
    yt$uix$initWidget(Wl);
    yt$uix$initWidget(Lh);
    yt$uix$initWidget(zn);
    goog$debug$Console$autoInstall();
    var gn = [
        function (a) {
            if (!re("video-annotations", a.getRootNode()) || !zm(a)) {
                return null;
            } else {
                return new ym(a);
            }
        },
        function (a) {
            if (a.getEnvironmentData().eventLabel != "leanback") {
                return new ck(a);
            } else {
                return null;
            }
        },
        function (a) {
            if (!Om.prototype.zb(a)) {
                return null;
            } else {
                return new Om(a);
            }
        },
        function (a) {
            if (!Kj.prototype.zb(a)) {
                return null;
            } else {
                return new Kj(a);
            }
        },
        function (a) {
            if (an.prototype.zb(a)) {
                return new an(a);
            } else {
                return null;
            }
        },
        function (a) {
            if (!zg(a.getVideoData(), "ypc_module")) {
                return null;
            } else {
                return new en(a);
            }
        }
    ];
    var yt$player$VideoPlayer = function (a, b) {
        this.aj = {};
        this.Ne = [];
        this.Va = [];
        this.Lg = a;
        this.pubsub = new goog$pubsub$PubSub();
        this.pubsub.e("nothtml5servable", goog$bind(this.oq, this));
        this.pubsub.e("unabletoplay", goog$bind(this.rq, this));
        this.pubsub.e("openingpage", goog$bind(this.pq, this));
        this.pubsub.e("initializingmode", goog$bind(this.nq, this));
        this.pubsub.e("internalstatechange", goog$bind(this.qq, this));
        this.pubsub.e("internalenvironmentdatachange", goog$bind(this.mq, this));
        this.pubsub.e("internalvideodatachange", goog$bind(this.sq, this));
        this.pubsub.e("internalvolumechange", goog$bind(this.Ee, this));
        var c = b;
        if (!(c instanceof yt$player$Config)) {
            c = new yt$player$Config(c);
        }
        this.la = c;
        c = this.la.args;
        this.k("Setting environment data");
        this.b = new ch(c);
        this.pubsub.c("internalenvironmentdatachange", "newdata");
        if (this.b.Fb) {
            this.b.jg = "dark";
        }
        this.bj();
        Gn(this, goog$dom$getElement(this.Lg));
        if (this.z || document.readyState == "complete") {
            this.km();
        } else {
            yt$events$listen(document, "DOMContentLoaded", goog$bind(this.km, this));
        }
    };
    var Hn;
    yt$player$VideoPlayer.prototype.Oi = null;
    yt$player$VideoPlayer.prototype.We = null;
    yt$player$VideoPlayer.prototype.Ga = null;
    yt$player$VideoPlayer.prototype.Nd = null;
    yt$player$VideoPlayer.prototype.af = null;
    yt$player$VideoPlayer.prototype.Lg = null;
    yt$player$VideoPlayer.prototype.list = null;
    yt$player$VideoPlayer.prototype.Ke = null;
    yt$player$VideoPlayer.prototype.g = null;
    yt$player$VideoPlayer.prototype.yg = null;
    yt$player$VideoPlayer.prototype.cj = null;
    yt$player$VideoPlayer.prototype.Ue = null;
    yt$player$VideoPlayer.prototype.rd = null;
    yt$player$VideoPlayer.prototype.zl = null;
    yt$player$VideoPlayer.prototype.eg = null;
    yt$player$VideoPlayer.prototype.Zi = 0;
    yt$player$VideoPlayer.prototype.Hg = false;
    yt$player$VideoPlayer.prototype.Ap = false;
    yt$player$VideoPlayer.prototype.ea = false;
    yt$player$VideoPlayer.prototype.Ca = null;
    yt$player$VideoPlayer.prototype.ob = true;
    yt$player$VideoPlayer.prototype.Td = false;
    yt$player$VideoPlayer.prototype.Gj = 0;
    yt$player$VideoPlayer.prototype.qd = false;
    yt$player$VideoPlayer.prototype.rg = 0;
    yt$player$VideoPlayer.prototype.Bc = 0;
    yt$player$VideoPlayer.prototype.Ol = false;
    yt$player$VideoPlayer.prototype.ze = 0;
    yt$player$VideoPlayer.prototype.Aa = null;
    yt$player$VideoPlayer.prototype.pubsub = null;
    yt$player$VideoPlayer.prototype.qa = null;
    yt$player$VideoPlayer.prototype.la = null;
    yt$player$VideoPlayer.prototype.nb = -1;
    yt$player$VideoPlayer.prototype.Hc = Xf;
    yt$player$VideoPlayer.prototype.xd = null;
    yt$player$VideoPlayer.prototype.S = null;
    yt$player$VideoPlayer.prototype.$b = 0;
    yt$player$VideoPlayer.prototype.zg = 0;
    yt$player$VideoPlayer.prototype.$i = 0;
    yt$player$VideoPlayer.prototype.Ni = true;
    yt$player$VideoPlayer.prototype.Cl = 0;
    yt$player$VideoPlayer.prototype.mg = null;
    yt$player$VideoPlayer.prototype.wl = 0;
    yt$player$VideoPlayer.prototype.fk = null;
    var Jn = function (a, b, c) {
        a.f = b;
        a.Ga.Wa();
        In(a);
        goog$dom$classes$add(a.f, "video-stream");
        if (a.b.Zb && a.b.Ua) {
            a.f.setAttribute("controls", true);
        }
        if (a.b.loop) {
            a.f.setAttribute("loop", true);
        }
        if (a.b.nj) {
            a.f.setAttribute("webkit-playsinline", true);
        }
        a.f.setAttribute("x-webkit-airplay", "allow");
        a.f.setVolume(a.S.volume, a.S.muted);
        if (c != false && !a.f.parentNode) {
            a.pg.appendChild(a.f);
        }
        a.b.f = a.f;
    };
    var Gn = function (a, b) {
        if (b) {
            a.z = b;
            a.b.z = b;
        } else {
            R(
                goog$debug$Logger$Level$WARNING,
                "yt.player.VideoPlayer",
                "Attempted to set videoPlayerElement_ to null.",
                undefined
            );
        }
    };
    var Qn = function (a) {
        a.Ne = goog$array$toArray(a.a.Il);
        a.Va = Kn(a);
        var b = a.a.Mi || a.b.ng;
        if (b) {
            Ln(a, b);
        }
        if (!Mn(a)) {
            Nn(a);
        }
        if (a.g) {
            mi(a.g, a.Va);
        }
        On(a);
        Pn(a);
        a.pubsub.c("videoready");
        hn(a.Ca);
    };
    var Pn = function (a) {
        var b = goog$dom$getElementByClass("html5-watermark", a.Ke);
        goog$dom$classes$remove(b, "html5-branded-watermark");
        if (a.b.Cj && a.a && a.a.Bj && !qg.test(a.a.Bj)) {
            b.src = a.a.Bj;
            goog$dom$classes$add(b, "html5-branded-watermark");
            yt$style$show(b);
        } else if (a.b.Cj && a.b.Zb) {
            yt$style$show(b);
        } else if (!a.b.hg && a.b.lg) {
            yt$style$show(b);
        } else {
            yt$style$hide(b);
        }
    };
    var Rn = function (a, b) {
        a.k("Setting video data");
        a.a = new og(b);
        a.a.e("videoinfo", a.Np, a);
        a.a.e("onStatusFail", a.Op, a);
        a.pubsub.c("internalvideodatachange", "newdata");
        if (a.ka) {
            a.ka.Fc();
            delete a.ka;
        }
        a.ka = new sn();
        if (a.la) {
            a.ka.bj("yt", a.a, a.b, goog$bind(a.sg, a), goog$bind(a.getDuration, a), goog$bind(a.getCurrentTime, a));
        }
        if (a.qa) {
            a.qa.reset();
        }
        a.aj = {};
        var c = goog$dom$getElementByClass("html5-context-menu-copy-embed-html", a.Ea);
        yt$style$setDisplayed(c, a.a.Gl);
    };
    yt$player$VideoPlayer.prototype.getVideoData = function () {
        return this.a;
    };
    yt$player$VideoPlayer.prototype.getEnvironmentData = function () {
        return this.b;
    };
    yt$player$VideoPlayer.prototype.k = function (a, b) {
        if (!b) {
            b = goog$debug$Logger$Level$INFO;
        }
        yt$player$logger.log(b, a);
    };
    yt$player$VideoPlayer.prototype.nq = function () {
        yt$clearInterval(this.Bc);
        this.Ee(this.S);
        md(this.yg, false);
    };
    yt$player$VideoPlayer.prototype.bj = function () {
        this.k("Initializing the player");
        this.Ga = new Ge(this);
        this.Nd = new Ge(this);
        this.qa = new Gf(goog$bind(this.getCurrentTime, this), goog$bind(this.kg, this), goog$bind(this.Mn, this));
        this.Ca = new fn();
        var a;
        if ((a = this.la.assets.css)) {
            a = goog$dom$createDom("div", {
                class: "html5-player-css-loaded"
            });
            document.body.appendChild(a);
            var b = goog$style$getComputedStyle(a, "z-index") == 300;
            goog$dom$removeNode(a);
            a = !b;
        }
        if (a) {
            a = {
                rel: "stylesheet",
                type: "text/css",
                href: this.la.assets.css
            };
            b = document.getElementById("www-player-css");
            a.id = "www-player-css";
            var c = b || document.createElement("link");
            goog$dom$setProperties(c, a);
            if (!b) {
                document.getElementsByTagName("head")[0].appendChild(c);
            }
        }
        this.xd = new Pl();
    };
    yt$player$VideoPlayer.prototype.sg = function () {
        var a = {};
        var a = this.a.sg();
        if (this.f.webkitDecodedFrameCount) {
            a.hmewdfc = this.f.webkitDecodedFrameCount;
            a.hmewdrop = this.f.webkitDroppedFrameCount;
            a.hmewvdbc = this.f.webkitVideoDecodedByteCount;
            a.hmewadbc = this.f.webkitAudioDecodedByteCount;
        }
        if (this.f.mozParsedFrames) {
            a.hmempf = this.f.mozParsedFrames;
            a.hmemdf = this.f.mozDecodedFrames;
            a.hmempresented = this.f.mozPresentedFrames;
            a.hmempainted = this.f.mozPaintedFrames;
            a.hmempaintdelay = this.f.mozPaintDelay;
        }
        a.volume = this.getVolume();
        a.mos = this.isMuted() ? 1 : 0;
        return a;
    };
    var Sn = function (a, b) {
        if (b.video_id == a.a.m && !b.force_data_reload) {
            a.a.Id(b);
        } else {
            Rn(a, b);
        }
    };
    yt$player$VideoPlayer.prototype.km = function () {
        yt$timing.mb("fs");
        var a = goog$dom$getElement(this.Lg);
        if (goog$dom$classes$has(a, "html5-video-player")) {
            Gn(this, a);
        } else {
            a = goog$dom$getElement("video-player") || Hn;
            if (!a) {
                yt$net$ajax$send(this.la.assets.html, {
                    format: "RAW",
                    method: "GET",
                    lf: this,
                    Rb: this.ut
                });
                a = undefined;
            }
            if (!a) {
                return;
            }
            Tn(this, a);
        }
        Un(this);
    };
    yt$player$VideoPlayer.prototype.ut = function (a) {
        if (a.responseText) {
            var b = document.createElement("div");
            b.innerHTML = a.responseText;
            Hn = goog$dom$getElementByClass("html5-video-player", b);
            Tn(this, Hn);
            Un(this);
        } else {
            this.pubsub.c("nothtml5servable");
        }
    };
    var Tn = function (a, b) {
        var c = goog$dom$getElement(a.Lg);
        Gn(a, b.cloneNode(true));
        a.z.setAttribute("id", a.la.attrs.id || "video-player");
        c.appendChild(a.z);
    };
    var Un = function (a) {
        a.ud(a.z);
        a.S = a.xd.getVolume();
        Jn(a, ah(), false);
        Rn(a, a.la.args);
        if (a.b.eventLabel == "detailpage") {
            var b;
            a: {
                var c = a.xd;
                b = a.a.m;
                if (c.Bd && (c = c.Bd.get("yt-player-restore-playhead"))) {
                    b = c[b];
                    break a;
                }
                b = undefined;
            }
            if (b) {
                a.a.R = b;
            }
        }
        b = a.xd;
        if (b.Bd) {
            b.Bd.remove("yt-player-restore-playhead");
        }
        Vn(a);
        Wn(a, a.z);
        b = a.Ca;
        c = {};
        c.command_ad_break_started = goog$bind(a.Gp, a);
        c.command_ad_break_ended = goog$bind(a.Fp, a);
        c.command_pause = Xn(a.pauseVideo, a);
        c.command_play = Xn(a.playVideo, a);
        c.command_seek = Xn(a.seekTo, a);
        c.command_disable_controls = goog$bind(a.g.disable, a.g);
        c.command_enable_controls = goog$bind(a.g.enable, a.g);
        c.command_redirect_controls = goog$bind(a.g.Hp, a.g);
        c.command_stop_redirect_controls = goog$bind(a.g.Ml, a.g);
        c.command_redirected_show_is_playing = goog$bind(a.g.He, a.g);
        c.command_add_cuerange = goog$bind(a.Bp, a);
        c.command_remove_cuerange = goog$bind(a.Ip, a);
        c.command_remove_cuerange_all = goog$bind(a.Jp, a);
        c.command_preroll_ready = goog$bind(a.Ep, a);
        c.command_hide_all_dialogs = goog$bind(a.Cp, a);
        c.command_share = goog$bind(a.Kp, a);
        c.command_log = goog$bind(a.Ec, a);
        b.Pi = c;
        b.va = a.Oi;
        if (kg()) {
            if (a.b.autoplay || (a.b.eventLabel == "detailpage" && !a.b.Fb && !a.b.Zb)) {
                Yn(a);
            } else if (a.b.eventLabel != "leanback") {
                Zn(a);
            }
        } else {
            a.pubsub.c("nothtml5servable");
        }
    };
    var Zn = function (a) {
        a.pubsub.c("initializingmode");
        a.k("Creating thumbnail element");
        $n(a);
        var b = a.Fa;
        var c = a.a;
        var d = a.b.Je;
        var f = document.body;
        if (
            f.style.backgroundSize != undefined ||
            f.style.MozBackgroundSize != undefined ||
            f.style.WebkitBackgroundSize != undefined ||
            f.style.MsBackgroundSize != undefined ||
            f.style.OBackgroundSize != undefined
        ) {
            f = document.createElement("div");
            f.style.backgroundImage = "url(" + Tj(b, c, d) + ")";
        } else {
            f = document.createElement("img");
            f.src = Tj(b, c, d);
            c = f;
            if (b.clientWidth / b.clientHeight < Rj) {
                c.style.height = "100%";
                c.style.width = "auto";
            } else {
                c.style.height = "auto";
                c.style.width = "100%";
            }
        }
        goog$dom$classes$add(f, "video-thumbnail");
        a.af = f;
        a.Fa.appendChild(a.af);
        a.ob = true;
        a.pubsub.c("internalstatechange", 5);
    };
    var $n = function (a) {
        if (a.af) {
            goog$dom$removeNode(a.af);
            a.af = null;
        }
        a.ob = false;
    };
    var Yn = function (a) {
        if (ao(a)) {
            a.pubsub.c("nothtml5servable");
        } else {
            a.pubsub.c("initializingmode");
            a.k("initializing playback");
            $n(a);
            if (a.f) {
                goog$dom$removeNode(a.f);
                yt$player$utils$VideoTagPool$instance_.releaseTag(a.f);
            }
            a.ka.Eg();
            Jn(a, yt$player$utils$VideoTagPool$instance_.getTag());
            a.pubsub.c("internalstatechange", 3);
            if (bo(a)) {
                if (Kn(a).length) {
                    Qn(a);
                } else {
                    yg(a.a, hh(a.b, a.a));
                }
            }
        }
    };
    var ao = function (a) {
        var b = a.a.Vl && !a.b.Je;
        if (b) {
            a.k("Has unsupported ad content");
        }
        return b;
    };
    yt$player$VideoPlayer.prototype.wq = function () {
        this.ze += 45;
        this.Ue.style.MozTransform = "rotate(" + this.ze + "deg)";
        this.Ue.style.WebkitTransform = "rotate(" + this.ze + "deg)";
        this.Ue.style.OTransform = "rotate(" + this.ze + "deg)";
        this.Ue.style.msTransform = "rotate(" + this.ze + "deg)";
    };
    var On = function (a) {
        a.k("In loadVideo");
        if (a.Ne.length == 0) {
            a.qa.Eg();
            a.playVideo();
        } else {
            a.pubsub.c("internalstatechange", 2);
            a.pauseVideo();
        }
    };
    var Xn = function (a, b) {
        return function () {
            var c = Array.prototype.slice.call(arguments);
            Vd(function () {
                a.apply(b || this, c);
            });
        };
    };
    yt$player$VideoPlayer.prototype.Gp = function () {
        this.pubsub.c("command_ad_break_started");
    };
    yt$player$VideoPlayer.prototype.Fp = function () {
        this.pubsub.c("command_ad_break_ended");
    };
    yt$player$VideoPlayer.prototype.Cp = function () {
        var a = goog$dom$getElementsByClass("html5-popup-dialog", this.z);
        goog$array$forEach(
            a,
            function (a) {
                yt$style$hide(a);
            },
            this
        );
    };
    yt$player$VideoPlayer.prototype.Ec = function (a, b) {
        b.event = a;
        this.ka.Ec(b);
    };
    yt$player$VideoPlayer.prototype.Kp = function () {
        this.pubsub.c("SHARE_CLICKED", this.a.m, this.a.Ib);
    };
    var In = function (a) {
        "loadstart,loadeddata,loadedmetadata,play,playing,pause,ended,suspend,progress,seeking,seeked,timeupdate,durationchange,error,stalled,waiting"
            .split(",")
            .forEach(function (a) {
                this.Ga.G(this.f, a, this.hs);
            }, a);
    };
    yt$player$VideoPlayer.prototype.hs = function (a) {
        var b = a.target;
        if (b.hasSrc()) {
            var c;
            var d = "internalstatechange";
            switch (a.type) {
                case "durationchange":
                    this.a.Ba = b.getDuration();
                    this.pubsub.c("internalvideodatachange", "videoinfo");
                    break;
                case "ended":
                    a.target.pauseVideo();
                    this.pubsub.c(d, 2);
                    if (this.qd) {
                        co(this, false);
                    }
                    c = 0;
                    break;
                case "error":
                    b = {
                        event: "streamingerror"
                    };
                    a = a.target.error;
                    b.ec = 107;
                    if (a && a.code) {
                        if (a.code == a.MEDIA_ERR_ABORTED) {
                            b.ec = 200;
                        } else if (a.code == a.MEDIA_ERR_NETWORK) {
                            b.ec = 201;
                        } else if (a.code == a.MEDIA_ERR_DECODE) {
                            b.ec = 202;
                        } else if (a.code == a.MEDIA_ERR_SRC_NOT_SUPPORTED) {
                            b.ec = 203;
                        }
                    }
                    this.ka.Ec(b);
                    break;
                case "loadeddata":
                    yt$clearInterval(this.rg);
                    if (this.Ig) {
                        window.clearTimeout(this.Ig);
                    }
                    eo(this);
                    break;
                case "loadedmetadata":
                    yt$timing.mb("fvb");
                    if (this.a.R) {
                        this.f.currentTime = this.a.R;
                    }
                    break;
                case "loadstart":
                    yt$timing.mb("gv");
                    if (this.Bc) {
                        yt$clearInterval(this.Bc);
                    }
                    this.Bc = yt$setInterval(goog$bind(this.fm, this), 100);
                    break;
                case "pause":
                    this.g.He(false);
                    if (!this.f.ended) {
                        c = 2;
                    }
                    break;
                case "play":
                    this.g.He(true);
                    c = 1;
                    break;
                case "playing":
                    if (this.qd) {
                        co(this, true);
                    }
                    c = 1;
                    if (this.Bc) {
                        yt$timing.mb("plev");
                        this.fm();
                    }
                    break;
                case "suspend":
                case "progress":
                    this.Ie();
                    d = "onLoadProgress";
                    c = this.getLoadProgressFraction();
                    break;
                case "seeking":
                    if (b.inUnbufferedArea()) {
                        c = 3;
                    }
                    break;
                case "seeked":
                    c = this.getCurrentTime();
                    this.g.Ei.innerHTML = yt$player$utils$Controls$formatTime(c);
                    c = this.g;
                    var a = this.getCurrentTime();
                    var f = this.getDuration();
                    c.Sl.innerHTML =
                        parseInt(c.Fe * 100, 10) + "% at " + parseInt(a, 10) + " of " + parseInt(f, 10) + " seconds";
                    b = this.Hg || !b.paused;
                    this.g.He(b);
                    c = b ? 1 : 2;
                    break;
                case "stalled":
                    this.ka.Ec({
                        event: "streamingerror",
                        ec: 300
                    });
                    break;
                case "timeupdate":
                    this.Ie();
                    d = "onVideoProgress";
                    c = b.currentTime;
                    break;
                case "waiting":
                    if (!b.ended) {
                        c = 3;
                    }
            }
            if (c != undefined) {
                this.pubsub.c(d, c);
            }
        }
    };
    var fo = function (a, b, c) {
        if (b == null) {
            a.k("setCurrentFormat_(null) called. Ignoring.");
        } else {
            a.k("Setting current format to: " + b.toString());
            a.a.format = b;
            var b = a.g;
            var d = a.a.format.Nc;
            b.k("setting quality to: " + d);
            yt$dom$datasets$set(b.vd, "value", d);
            b.vd.setAttribute("aria-label", d + " " + yt$getMsg("HTML5_QUALITY_SETTING"));
            var f = goog$dom$getElementByClass("yt-uix-button-menu-item.active", b.Se);
            if (f) {
                goog$dom$classes$remove(f, "active");
            }
            b = b.Se.querySelector(".yt-uix-button-menu-item" + ('[data-value="' + d + '"]'));
            goog$dom$classes$add(b, "active");
            if (!a.ob && !c) {
                a.k("Loading video");
                On(a);
            }
            a.pubsub.c("onPlaybackQualityChange", a.Xi());
        }
    };
    yt$player$VideoPlayer.prototype.toggleThreeD = function () {
        this.a.Kc = !this.a.Kc;
        this.preparePlayerThreeD();
        this.a.R = this.f.currentTime;
        this.Va = Kn(this);
        fo(this, ng(this.b.Lb, this.Va));
        if (this.g) {
            mi(this.g, this.Va);
            qi(this.g, this.a.Kc);
        }
    };
    var Kn = function (a) {
        return mg(a.a.Ae, !!a.a.Pe || a.a.Kc);
    };
    var Nn = function (a) {
        if (a.Va.length == 0) {
            a.k("setFormatForPlayerSize_ called when there are no supportedFormats_.", goog$debug$Logger$Level$SEVERE);
        } else {
            fo(a, ng(a.b.Lb, a.Va), true);
        }
    };
    yt$player$VideoPlayer.prototype.Xg = ["hd1080", "hd720", "large", "medium", "small"];
    yt$player$VideoPlayer.prototype.Mk = 1000;
    yt$player$VideoPlayer.prototype.Xi = function () {
        return Mn(this) || this.a.Mi || this.b.ng;
    };
    var Mn = function (a) {
        if (a.a.format) {
            return a.a.format.Hd;
        }
    };
    yt$player$VideoPlayer.prototype.kq = function (a) {
        this.a.R = this.f.currentTime;
        Ln(this, a);
    };
    var Ln = function (a, b) {
        if (!a.a.format || a.a.format.Hd != b) {
            var c;
            c = null;
            var d = a.Xg.indexOf(b);
            if (d < 0) {
                c = ng(a.b.Lb, a.Va);
            } else {
                for (var f = a.Xg.length; d < f && !(c = a.Sm(a.Xg[d])); d++);
            }
            if (c && c != a.a.format) {
                fo(a, c);
            }
        }
    };
    yt$player$VideoPlayer.prototype.Rt = function (a) {
        a = yt$uri$parseQueryData(a.responseText);
        if (a.status == "fail") {
            this.jn(0, a);
        } else {
            yt$net$ajax$tokenMap_.addto_ajax = a.addto_ajax_token;
            go(this);
        }
    };
    var go = function (a) {
        var b = a.mr;
        var c = a.jn;
        var d = {
            video_ids: a.a.m,
            playlist_id: "",
            new_playlist_name: "",
            session_token: yt$net$ajax$tokenMap_.addto_ajax
        };
        var f = {};
        var g = "";
        switch ("WL") {
            case "PL":
                g = "action_add_to_playlist";
                break;
            case "FL":
                g = "action_add_to_favorites";
                break;
            case "WL":
                g = "action_add_to_watch_later_list";
        }
        f[g] = 1;
        yt$net$ajax$send("/addto_ajax", {
            jr: true,
            format: "XML",
            method: "POST",
            Mg: f,
            Ym: d,
            lf: a,
            qf: c,
            Rb: b
        });
    };
    yt$player$VideoPlayer.prototype.mr = function () {
        Rh(this.g.Dc, "html5-async-success");
    };
    yt$player$VideoPlayer.prototype.jn = function (a, b) {
        Sh(this.g.Dc, b && b.error_message);
    };
    yt$player$VideoPlayer.prototype.bq = function () {
        return this.Xg.filter(this.Sm, this);
    };
    yt$player$VideoPlayer.prototype.dq = function () {
        var a = this.getLoadProgressFraction();
        return Math.floor(a * this.Mk);
    };
    yt$player$VideoPlayer.prototype.fq = function () {
        var a = 0;
        if (this.getDuration()) {
            a = this.f.startTime / this.getDuration();
        }
        return Math.floor(a * this.Mk);
    };
    yt$player$VideoPlayer.prototype.eq = function () {
        return this.Mk;
    };
    yt$player$VideoPlayer.prototype.ud = function (a) {
        this.k("decorate called");
        if (this.b.jg) {
            goog$dom$classes$add(a, this.b.jg + "-theme");
        }
        goog$dom$classes$add(a, "el-" + this.b.eventLabel);
        if (this.b.lg) {
            goog$dom$classes$add(a, "modest-branding");
        }
        if (this.b.Wi) {
            goog$dom$classes$add(a, "html5-hide-share");
        }
        var b = document.createElement("video");
        var c = b.muted;
        b.muted = !c;
        if (b.muted == c) {
            goog$dom$classes$add(a, "html5-hide-volume");
        }
        a.style.display = "";
        this.Fa = goog$dom$getElementByClass("video-container", a);
        this.pg = goog$dom$getElementByClass("video-content", a);
        this.Ke = goog$dom$getElementByClass("video-controls", a);
        this.yg = goog$dom$getElementByClass("video-fallback", a);
        this.cj = goog$dom$getElementByClass("video-fallback-content", this.yg);
        this.Ue = goog$dom$getElementByClass("html5-video-loader", this.Fa);
        this.Ea = goog$dom$getElementByClass("html5-context-menu", this.Fa);
        this.rd = goog$dom$getElementByClass("html5-info-bar", this.Fa);
        this.zl = goog$dom$getElementByClass("html5-title", this.rd);
        this.eg = goog$dom$getElementByClass("html5-author", this.rd);
        this.mg = new xn(this.z);
        if (this.b.Vi) {
            this.qd = goog$dom$classes$add(a, "html5-autohide");
        }
        if (this.b.vg) {
            this.vg();
        }
        if (this.b.Fb) {
            goog$dom$classes$add(a, "html5-tablet");
            goog$dom$classes$add(document.body, "html5-tablet-body");
        }
        if (this.b.Zb || !this.b.Ua) {
            goog$dom$classes$add(a, "html5-native-controls");
        }
        this.g = new ki();
        this.g.ud(this.Ke);
        mi(this.g, this.Va);
        this.g.pubsub.e("playpausetoggled", goog$bind(this.Vp, this));
        this.g.pubsub.e("seekto", goog$bind(this.Yp, this));
        this.g.pubsub.e("mutetoggled", goog$bind(this.Up, this));
        this.g.pubsub.e("volumechanged", goog$bind(this.fj, this));
        this.g.pubsub.e("speedchanged", goog$bind(this.Zp, this));
        this.g.pubsub.e("sizechangerequested", goog$bind(this.Wp, this));
        this.g.pubsub.e("fullscreentoggled", goog$bind(this.Tp, this));
        this.g.pubsub.e("qualitychanged", goog$bind(this.Xp, this));
        this.g.pubsub.e("beginseeking", goog$bind(this.Rp, this));
        this.g.pubsub.e("endseeking", goog$bind(this.Sp, this));
        this.g.pubsub.e("watchlater", goog$bind(this.$p, this));
        this.g.pubsub.e("watchonyoutube", goog$bind(this.aq, this));
        if (document.createElement("video").defaultPlaybackRate && !goog$userAgent$OPERA) {
            this.g.zd.style.display = "block";
        }
        if (this.b.xg) {
            b = this.g;
            yt$style$show(b.og);
            yt$style$show(b.Ui);
            ho(this);
        }
        if (!this.b.wg) {
            yt$style$hide(this.g.dg);
        }
        b = goog$dom$getElementByClass("html5-storyboard", a);
        new nn(this).ud(b);
        a = goog$dom$getElementByClass("html5-show-video-info-template", a);
        this.xp = yt$templates$fromElement(
            a,
            "videoId,videoWidth,videoHeight,volume,streamType,decodedFrames,droppedFrames,parsedFrames,presentedFrames,videoBytesDecoded,audioBytesDecoded,paintedFrames,paintDelay".split(
                ","
            )
        );
    };
    yt$player$VideoPlayer.prototype.vg = function () {
        if (this.b.Fb) {
            var a = goog$bind(function (a) {
                return io(a) || goog$dom$classes$has(a.target, "html5-draggable");
            }, this);
            new Uh(
                this.z,
                goog$bind(function (a) {
                    if (this.ob) {
                        if (this.ob && yt$player$utils$VideoTagPool$instance_.hasTags(undefined)) {
                            this.$m(a);
                        }
                    } else if (io(a)) {
                        if (goog$dom$classes$has(this.z, "hide-controls")) {
                            this.Ua();
                        } else {
                            this.Nj();
                        }
                        a = bi.getInstance();
                        if (a.Pd) {
                            gi(a, a.Pd);
                        }
                    }
                }, this),
                false,
                a
            );
            yt$events$listen(this.z, "gesturechange", goog$bind(this.gr, this));
            yt$events$listen(this.z, "gestureend", goog$bind(this.hr, this));
        } else {
            yt$events$listen(this.z, "click", goog$bind(this.$m, this));
            yt$events$listen(this.z, "dblclick", goog$bind(this.fr, this));
            yt$events$listen(this.z, "click", goog$bind(this.Ua, this));
            we(this.z, "move", goog$bind(this.Ua, this));
            we(this.z, "out", goog$bind(this.Nj, this));
        }
        var b = goog$bind(function () {
            yt$player$utils$VideoTagPool$instance_.fillPool(4);
            if (this.b.Fb) {
                Xh();
            }
            this.z.removeEventListener("click", b, true);
        }, this);
        this.z.addEventListener("click", b, true);
        goog$dom$removeNode(this.Ea);
        document.body.appendChild(this.Ea);
        yt$events$listen(this.z, "keypress", goog$bind(this.Fj, this));
        yt$events$listen(this.z, "keydown", goog$bind(this.er, this));
        jo(this);
        Ce(goog$bind(this.dr, this));
        yt$events$listen(window, "resize", goog$bind(this.pb, this));
        var a = goog$dom$getElementByClass("html5-watermark", this.Ke);
        var c = goog$bind(this.ir, this);
        yt$events$listen(a, "click", c);
        Pn(this);
        if (this.b.eventLabel == "embedded") {
            yt$events$listen(this.rd, "click", c);
        }
    };
    var jo = function (a) {
        goog$dom$removeNode(a.Ea);
        document.body.appendChild(a.Ea);
        yt$events$listen(a.z, "contextmenu", goog$bind(a.Js, a));
        var b = {
            vs: a.Ds,
            ws: a.Es,
            xs: goog$bind(function () {
                ko(this);
            }, a),
            ys: goog$bind(function () {
                ko(this, true);
            }, a),
            zs: a.Fs,
            As: a.Gs,
            Bs: a.Hs,
            Cs: a.Is
        };
        var c;
        for (c in b) {
            lo(a, c, b[c]);
        }
        a = goog$dom$getElementByClass("html5-context-menu-pop-out", a.Ea);
        yt$style$setDisplayed(a, window.opener == null);
    };
    var lo = function (a, b, c) {
        b = goog$dom$getElementByClass(kh[b], a.Ea);
        yt$events$listen(
            b,
            "click",
            goog$bind(
                function (a, b) {
                    this.Pf();
                    a.call(this, b);
                    b.stopPropagation();
                },
                a,
                c
            )
        );
    };
    var ko = function (a, b) {
        mo(a, a.getVideoUrl() + (b ? "#t=" + Math.floor(a.f.currentTime) + "s" : ""), "URL");
    };
    yt$player$VideoPlayer.prototype.Es = function () {
        var a = zh("EMBED_HTML_TEMPLATE");
        var b = zh("EMBED_HTML_URL");
        var c = this.b.td();
        var b = b.replace(/__videoid__/g, this.a.m);
        var a = a.replace(/__url__/g, goog$string$htmlEscape(b));
        var a = a.replace(/__width__/g, c.width);
        var a = a.replace(/__height__/g, c.height);
        mo(this, a, "Text");
    };
    var mo = function (a, b, c) {
        var d = false;
        if (window.clipboardData) {
            d = window.clipboardData.setData(c, b);
        }
        if (!d) {
            a = a.mg;
            yn(a, "html5-modal-panel-clipboard-substitute");
            a.Nf.value = b;
            a.Nf.focus();
            yt$setTimeout(goog$bind(a.io, a), 100);
        }
    };
    yt$player$VideoPlayer.prototype.Is = function () {
        this.stopVideo();
    };
    yt$player$VideoPlayer.prototype.Gs = function () {
        var a = {
            cr: this.b.region,
            csipt: this.a.gg,
            ec: 108,
            event: "streamingerror",
            feature: this.b.Yb,
            h: this.f.clientHeight,
            hl: this.b.Eb,
            playerh: this.z.clientHeight,
            playerw: this.z.clientWidth,
            ptk: this.a.Ac,
            referrer: this.b.referrer,
            screenh: window.screen.height,
            screenw: window.screen.width,
            sdetail: this.a.yp,
            shost: yt$uri$getDomain(wg(this.a)),
            sourceid: this.a.zp,
            vid: this.b.pd,
            vq: this.b.ng,
            w: this.f.clientWidth
        };
        w(a, this.sg());
        if (a.videoId) {
            a.v = a.videoId;
            delete a.videoId;
        }
        if (this.b.Je) {
            a.mobile = "1";
        }
        this.ka.Ec(a);
        window.open(ih(this.a));
    };
    yt$player$VideoPlayer.prototype.getDebugText = function (a) {
        var b = {};
        if (a) {
            b = wn(this.ka);
        }
        b.debug_videoId = this.a.m;
        b.debug_playbackQuality = this.Xi();
        b.debug_date = new Date().toString();
        return JSON.stringify(b);
    };
    yt$player$VideoPlayer.prototype.Ds = function () {
        mo(this, this.getDebugText(true), "Text");
    };
    yt$player$VideoPlayer.prototype.cq = function () {
        return this.getDebugText();
    };
    yt$player$VideoPlayer.prototype.Hs = function () {
        if (!this.wl) {
            this.wl = yt$setInterval(goog$bind(this.rp, this), 500);
        }
        this.rp();
        Ul(
            goog$bind(function () {
                yt$clearInterval(this.wl);
            }, this)
        );
    };
    yt$player$VideoPlayer.prototype.rp = function () {
        var a = this.f;
        var b = "-";
        var c = "-";
        var d = "-";
        var f = "-";
        var g = "-";
        var i = "-";
        var m = "-";
        var p = "-";
        if (a.webkitDecodedFrameCount) {
            b = a.webkitDecodedFrameCount;
            c = a.webkitDroppedFrameCount;
            g = a.webkitVideoDecodedByteCount;
            i = a.webkitAudioDecodedByteCount;
        }
        if (a.mozParsedFrames) {
            d = a.mozParsedFrames;
            b = a.mozDecodedFrames;
            f = a.mozPresentedFrames;
            m = a.mozPaintedFrames;
            p = a.mozPaintDelay;
        }
        var s = jh(this.b);
        var a = this.mg;
        var b = this.xp.Kd({
            videoId: this.a.m,
            videoWidth: s.width,
            videoHeight: s.height,
            volume: Math.round(this.getVolume()),
            streamType: this.b.protocol,
            decodedFrames: b,
            droppedFrames: c,
            parsedFrames: d,
            presentedFrames: f,
            videoBytesDecoded: g,
            audioBytesDecoded: i,
            paintedFrames: m,
            paintDelay: p
        });
        yn(a, "html5-modal-panel-infobox");
        a.jm.innerHTML = b;
    };
    yt$player$VideoPlayer.prototype.preparePlayerThreeD = function (a) {
        if (this.a.Ag && this.g) {
            qi(this.g, this.a.Kc);
        }
        if ((a = !!this.a.Pe || !!this.a.Kc || !a)) {
            this.f.setAttribute("mozStereoMode", "1");
        }
        if (Ym()) {
            this.f.setAttribute("mozStereoMode", a ? "1" : "0");
            var a = Nf[a ? this.a.Lp : 0];
            var b = document.createElement("NvStereoExtDataElement");
            b.setAttribute("stereoMode", a);
            goog$dom$append(document.documentElement, b);
            Be(b, "3DModeEvent");
        }
    };
    yt$player$VideoPlayer.prototype.getCurrentTime = function () {
        return this.f.getCurrentTime();
    };
    yt$player$VideoPlayer.prototype.getPlayerState = function () {
        return this.nb;
    };
    yt$player$VideoPlayer.prototype.kg = function () {
        if (this.nb == -1 || this.nb == 5) {
            return Xf;
        } else if (this.nb == 0) {
            return Uf;
        } else if (this.nb == 2) {
            return Vf;
        } else {
            return Wf;
        }
    };
    yt$player$VideoPlayer.prototype.qq = function (a) {
        if (a !== this.nb) {
            ec(this.z, lh[this.nb], lh[a]);
            if (a == 3) {
                yt$clearInterval(this.rg);
                this.rg = yt$setInterval(goog$bind(this.wq, this), 125);
            }
            this.nb = a;
            if (this.Hc != Yf) {
                no(this, this.kg());
            }
            if (this.Hc == Xf) {
                this.g.He(false);
            }
            this.pubsub.c("onStateChange", a);
            if (this.Hc == Uf) {
                if (this.b.eventLabel == "embedded" && gh(this.b)) {
                    this.k("Playing the next video in the playlist.");
                    this.nextVideo();
                }
                this.Ua();
            }
        }
    };
    yt$player$VideoPlayer.prototype.sq = function (a) {
        if (a == "newdata") {
            jn(this.Ca);
            Rh(this.g.Dc);
        }
        if (this.b.eventLabel == "embedded" && this.b.hg) {
            if (this.a.title) {
                yt$style$show(this.rd);
                this.zl.innerHTML = this.a.title;
                if (this.a.author) {
                    yt$style$show(this.eg);
                    qe("span", this.eg).innerHTML = this.a.author;
                } else {
                    yt$style$hide(this.eg);
                }
            } else {
                yt$style$hide(this.rd);
            }
        }
        this.Cl = Math.min(this.a.Ba * 0.8, 180);
        var b = this.g;
        var c = this.a.Ba;
        b.k("Setting duration to: " + c.toString());
        b.Hl.innerHTML = yt$player$utils$Controls$formatTime(c);
        var d = goog$dom$getElementByClass("yt-uix-range-tooltip", b.yd);
        if (!d) {
            d = b.yd;
        }
        yt$dom$datasets$set(d, "range-max", c);
        yt$style$setDisplayed(this.g.vd, !!this.a.Ae.length);
        this.S.volume = (this.S.nonNormalized || this.S.volume) * this.a.Gi;
        if (this.a.Hi) {
            this.f.setVolume(0, true);
            this.g.setVolume(0, true);
            this.g.disable(["audio"]);
        } else if (this.g.Kb("audio")) {
            this.g.enable(["audio"]);
            this.Ee(this.S);
        }
        this.f.setAttribute("data-youtube-id", this.a.m);
        if (this.a.Fi) {
            b = this.a.Ba * 1000;
            oo(this, "part2viewed", 0, b);
            oo(this, "videoplaytime25", b * 0.25, b);
            oo(this, "videoplaytime50", b * 0.5, b);
            oo(this, "videoplaytime75", b * 0.75, b);
            oo(this, "videoplaytime100", b, 2147483647);
        }
        this.pubsub.c("onVideoDataChange", a, this.a);
    };
    yt$player$VideoPlayer.prototype.mq = function () {
        if (this.b.o) {
            var a = this.b.o;
            var b = goog$bind(this.Dr, this);
            a.Xj = b;
            if (a.Ob) {
                a.Xj();
            }
        }
    };
    var oo = function (a, b, c, d) {
        if (!(b in a.aj)) {
            c = new Ef(c, d, {
                id: b,
                priority: 0
            });
            c.pubsub.e("onEnter", a.eo, a);
            c.pubsub.e("onExit", a.eo, a);
            a.qa.addCueRange(c);
            a.aj[b] = c;
        }
    };
    yt$player$VideoPlayer.prototype.eo = function (a) {
        var b = a.getId();
        if (b == "part2viewed") {
            po(this);
            if (this.a.Fi) {
                qf(this.a.Fi);
            }
            if (this.a.$l) {
                qf(this.a.$l);
            }
        } else if (b != "videoplaytime100") {
            tn(this.ka);
        }
        if (this.a.am) {
            b = a.getId();
            b = yt$uri$setQueryData(this.a.am, {
                label: b
            });
            qf(b);
        }
        this.qa.removeCueRange(a);
    };
    var po = function (a) {
        if (a.a.gm) {
            Mj("view", a.a.gj);
            a.a.gm = false;
        }
    };
    var no = function (a, b) {
        var c = b || a.kg();
        if (c !== a.Hc) {
            var d = a.Hc;
            a.Hc = c;
            c = new Sf(c, d);
            d = a.qa;
            if (d.bh && !d.ub) {
                If(d);
                if (c.state.Jj) {
                    d.Ud = null;
                    var f = [];
                    for (var g = 0; g < d.wb.length; g++) {
                        var i = d.wb[g];
                        if (i.Jg && i.end < 2147483647) {
                            f.push(i);
                            d.wb.splice(g--, 1);
                        }
                    }
                    g = [];
                    if (f.length) {
                        for (i = 0; i < f.length; i++) {
                            g.push(["onExit", f[i]]);
                        }
                    }
                    d = g.concat(Jf(d, yf(d.Sb, d.Y)));
                    for (g = 0; g < d.length; g++) {
                        f = d[g];
                        i = f[1];
                        i.pubsub.c.apply(i.pubsub, f);
                    }
                } else if (c.state.Oj) {
                    d.Y = d.Jb() * 1000;
                    d.fh.stop();
                    d.fh.start();
                    d.eb();
                } else {
                    d.fh.stop();
                    if (c.Zm.Oj) {
                        if (c.state.pf && !d.Wm() && sf(d.Sb, Math.max(d.Y - 2000, 0))) {
                            d.rf = Vd(goog$bind(d.eb, d));
                        }
                    } else {
                        d.eb();
                    }
                }
            }
            qo(a, "onStateChange", c);
        }
    };
    yt$player$VideoPlayer.prototype.Mn = function () {
        return this.f.isPaused();
    };
    yt$player$VideoPlayer.prototype.seekTo = function (a) {
        a = a || 0;
        if (this.ob) {
            this.a.R = a;
            Yn(this);
        } else {
            this.f.seekTo(a);
        }
    };
    yt$player$VideoPlayer.prototype.getDuration = function () {
        return (this.a && this.a.Ba) || 0;
    };
    yt$player$VideoPlayer.prototype.getPlayProgressFraction = function () {
        var a = 0;
        if (this.getDuration()) {
            a = this.getCurrentTime() / this.getDuration();
        }
        return a;
    };
    yt$player$VideoPlayer.prototype.getLoadProgressFraction = function () {
        if (this.getDuration() && this.f.buffered && this.f.buffered.length > 0) {
            return this.f.buffered.end(this.f.getBufferedTimeRangeIndex()) / this.getDuration();
        } else {
            return 0;
        }
    };
    yt$player$VideoPlayer.prototype.getVolume = function () {
        return this.S.volume;
    };
    yt$player$VideoPlayer.prototype.setVolume = function (a) {
        this.S.volume = a;
        this.pubsub.c("internalvolumechange", this.S);
    };
    yt$player$VideoPlayer.prototype.fj = function (a) {
        this.S = a;
        this.pubsub.c("internalvolumechange", this.S);
    };
    yt$player$VideoPlayer.prototype.isMuted = function () {
        return this.S.muted;
    };
    yt$player$VideoPlayer.prototype.mute = function () {
        this.S.muted = true;
        this.pubsub.c("internalvolumechange", this.S);
    };
    yt$player$VideoPlayer.prototype.unMute = function () {
        this.S.muted = false;
        this.pubsub.c("internalvolumechange", this.S);
    };
    yt$player$VideoPlayer.prototype.loadVideoById = function (a, b, c) {
        var d = {
            list: this.list
        };
        if (typeof a == "object") {
            w(d, a);
        } else {
            w(d, {
                start: b,
                video_id: a,
                vq: c
            });
        }
        return this.loadVideoByPlayerVars(d);
    };
    yt$player$VideoPlayer.prototype.loadVideoByPlayerVars = function (a) {
        this.stopVideo();
        Sn(this, a);
        if (!bo(this)) {
            return false;
        }
        Yn(this);
        return true;
    };
    yt$player$VideoPlayer.prototype.Re = function (a, b, c) {
        if (this.loadVideoById(a, b, c)) {
            this.a.lb = true;
        }
    };
    yt$player$VideoPlayer.prototype.cueVideoById = function (a, b, c) {
        var d = {
            list: this.list
        };
        if (typeof a == "object") {
            w(d, a);
        } else {
            w(d, {
                start: b,
                video_id: a,
                vq: c
            });
        }
        return this.cueVideoByPlayerVars(d);
    };
    yt$player$VideoPlayer.prototype.cueVideoByPlayerVars = function (a) {
        this.stopVideo();
        Sn(this, a);
        if (bo(this)) {
            Zn(this);
        }
    };
    yt$player$VideoPlayer.prototype.watchVideoById = function (a, b) {
        if (this.a.m == a) {
            this.seekTo(0, true);
        } else if (!this.ea && this.b.eventLabel == "detailpage") {
            var c = {};
            if (b) {
                c.feature = b;
            }
            window.location.href = ro(this, a, c);
        } else {
            this.loadVideoById(a);
        }
    };
    yt$player$VideoPlayer.prototype.cuePlaylist = function (a, b, c, d) {
        this.Td = true;
        so(this, a, b, c, d);
    };
    yt$player$VideoPlayer.prototype.loadPlaylist = function (a, b, c, d) {
        this.Td = false;
        so(this, a, b, c, d);
    };
    var so = function (a, b, c, d, f) {
        var g = b;
        if (typeof b == "string" || b instanceof Array) {
            g = {
                api: b,
                index: c,
                startSeconds: d,
                suggestedQuality: f
            };
        }
        a.b.Id(g);
        a.pubsub.c("internalenvironmentdatachange");
    };
    yt$player$VideoPlayer.prototype.Dr = function () {
        if (this.Td) {
            this.cueVideoById(Hg(this.b.o).m, this.b.o.R, this.b.o.Rm);
        } else {
            this.Re(Hg(this.b.o).m, this.b.o.R, this.b.o.Rm);
        }
    };
    yt$player$VideoPlayer.prototype.nextVideo = function () {
        if (this.b.o) {
            if (this.b.o.Ob) {
                if (this.b.o.loop || this.b.o.ba + 1 < this.b.o.na.length) {
                    this.Re(this.b.o.Tb().m);
                }
            } else {
                this.b.o.Tb();
                this.Td = false;
            }
        }
    };
    yt$player$VideoPlayer.prototype.previousVideo = function () {
        if (this.b.o) {
            if (this.b.o.Ob) {
                if (this.b.o.loop || this.b.o.ba - 1 >= 0) {
                    this.Re(Ig(this.b.o).m);
                }
            } else {
                Ig(this.b.o);
                this.Td = false;
            }
        }
    };
    yt$player$VideoPlayer.prototype.playVideoAt = function (a) {
        if (this.b.o) {
            if (this.b.o.Ob) {
                this.Re(Hg(this.b.o, a).m);
            } else {
                Gg(this.b.o, a);
                this.Td = false;
            }
        }
    };
    yt$player$VideoPlayer.prototype.getPlaylist = function () {
        if (!this.b.o) {
            return null;
        }
        var a = [];
        for (var b = 0; b < this.b.o.getLength(); b++) {
            a[b] = Hg(this.b.o, b).m;
        }
        return a;
    };
    yt$player$VideoPlayer.prototype.getPlaylistId = function () {
        if (!this.b.o || !this.b.o.Xd) {
            return null;
        } else {
            return this.b.o.Xd.toString();
        }
    };
    yt$player$VideoPlayer.prototype.getPlaylistIndex = function () {
        if (this.b.o) {
            return this.b.o.ba;
        } else {
            return null;
        }
    };
    yt$player$VideoPlayer.prototype.setShuffle = function (a) {
        if (this.b.o) {
            this.b.o.setShuffle(a);
        }
    };
    yt$player$VideoPlayer.prototype.setLoop = function (a) {
        if (this.b.o) {
            this.b.o.loop = a;
        }
    };
    var bo = function (a) {
        if (a.a.m) {
            return true;
        }
        a.pubsub.c("unabletoplay", 2);
        return false;
    };
    yt$player$VideoPlayer.prototype.getVideoUrl = function () {
        return ro(this, this.a.m);
    };
    var ro = function (a, b, c) {
        b = {
            list: a.a.Ib,
            v: b
        };
        if (a.b.eventLabel) {
            b.feature = "player_" + a.b.eventLabel;
        }
        if (c) {
            w(b, c);
        }
        return yt$uri$appendQueryData(
            a.b.protocol +
                "://" +
                (window.location.host == "www.youtube-nocookie.com" ? "www.youtube.com" : window.location.host) +
                "/watch",
            b
        );
    };
    yt$player$VideoPlayer.prototype.addCueRange = function () {};
    yt$player$VideoPlayer.prototype.Bp = function (a) {
        var b = this.a.Ba;
        if (b > 0) {
            a.forEach(function (a) {
                if (a.visible) {
                    this.g.La(a.start / (b * 1000));
                }
            }, this);
        }
        this.qa.addCueRange.apply(this.qa, a);
    };
    yt$player$VideoPlayer.prototype.Ip = function (a) {
        var b = this.a.Ba;
        if (b > 0) {
            a.forEach(function (a) {
                if (a.visible) {
                    this.g.nf(a.start / (b * 1000));
                }
            }, this);
        }
        this.qa.removeCueRange.apply(this.qa, a);
    };
    yt$player$VideoPlayer.prototype.Jp = function (a) {
        var b = this.qa;
        for (var c = b.fb.length - 1; c >= 0; c--) {
            if (b.fb[c].Mj == a) {
                Hf(b, c);
            }
        }
        b.eb();
    };
    yt$player$VideoPlayer.prototype.Ep = function (a) {
        a = this.Ne.indexOf(a);
        if (a >= 0) {
            this.Ne.splice(a, 1);
        }
        if (this.Ne.length == 0) {
            this.qa.Eg();
            if (!(xf(this.qa.Sb, -2147483648).length > 0)) {
                this.playVideo();
            }
        } else {
            this.pauseVideo();
        }
    };
    yt$player$VideoPlayer.prototype.addEventListener = function (a, b) {
        var c = b;
        if (typeof b == "string") {
            c = function () {
                goog$getObjectByName(b).apply(window, arguments);
            };
        }
        this.pubsub.e(a, c);
    };
    var Wn = function (a, b) {
        a.We = {
            addEventListener: goog$bind(a.addEventListener, a),
            getCurrentTime: goog$bind(a.getCurrentTime, a),
            getPlayerState: goog$bind(a.getPlayerState, a),
            seekTo: goog$bind(a.jq, a),
            getDuration: goog$bind(a.getDuration, a),
            getVolume: goog$bind(a.getVolume, a),
            setVolume: goog$bind(a.setVolume, a),
            isMuted: goog$bind(a.isMuted, a),
            mute: goog$bind(a.mute, a),
            unMute: goog$bind(a.unMute, a),
            playVideo: goog$bind(a.iq, a),
            pauseVideo: goog$bind(a.bm, a),
            stopVideo: goog$bind(a.hq, a),
            getPlaybackQuality: goog$bind(a.Xi, a),
            setPlaybackQuality: goog$bind(a.kq, a),
            getAvailableQualityLevels: goog$bind(a.bq, a),
            getVideoBytesLoaded: goog$bind(a.dq, a),
            getVideoBytesTotal: goog$bind(a.eq, a),
            getVideoStartBytes: goog$bind(a.fq, a),
            setSize: goog$bind(a.setSize, a),
            loadModule: goog$bind(a.Ca.gq, a.Ca),
            unloadModule: goog$bind(a.Ca.lq, a.Ca),
            loadVideoById: goog$bind(a.Re, a),
            cueVideoById: goog$bind(a.cueVideoById, a),
            getVideoUrl: goog$bind(a.getVideoUrl, a),
            getDebugText: goog$bind(a.cq, a),
            addCueRange: goog$bind(a.addCueRange, a),
            loadPlaylist: goog$bind(a.loadPlaylist, a),
            cuePlaylist: goog$bind(a.cuePlaylist, a),
            nextVideo: goog$bind(a.nextVideo, a),
            previousVideo: goog$bind(a.previousVideo, a),
            playVideoAt: goog$bind(a.playVideoAt, a),
            setLoop: goog$bind(a.setLoop, a),
            setShuffle: goog$bind(a.setShuffle, a),
            getPlaylist: goog$bind(a.getPlaylist, a),
            getPlaylistId: goog$bind(a.getPlaylistId, a),
            getPlaylistIndex: goog$bind(a.getPlaylistIndex, a),
            getApiInterface: goog$bind(function () {
                var a = [];
                var b;
                for (b in this.We) {
                    a.push(b);
                }
                return a;
            }, a),
            getVideoData: goog$bind(function () {
                return {
                    video_id: this.a.m,
                    author: this.a.author,
                    title: this.a.title
                };
            }, a),
            destroy: function () {}
        };
        if (a.b.eventLabel == "embedded" ? Qf(a.b.kb, Of) : 1) {
            w(a.We, {
                loadVideoByPlayerVars: goog$bind(a.loadVideoByPlayerVars, a),
                cueVideoByPlayerVars: goog$bind(a.cueVideoByPlayerVars, a)
            });
        }
        a.Oi = goog$object$clone(a.We);
        var c = {
            loadVideoById: goog$bind(a.loadVideoById, a),
            loadVideoByPlayerVars: goog$bind(a.loadVideoByPlayerVars, a),
            cueVideoByPlayerVars: goog$bind(a.cueVideoByPlayerVars, a),
            watchVideoById: goog$bind(a.watchVideoById, a),
            playVideo: goog$bind(a.Yl, a),
            seekTo: goog$bind(a.Qe, a),
            appendToVideoContent: goog$bind(a.appendToVideoContent, a),
            appendAboveVideoControls: goog$bind(a.appendAboveVideoControls, a),
            preparePlayerThreeD: goog$bind(a.preparePlayerThreeD, a),
            toggleThreeD: goog$bind(a.toggleThreeD, a),
            getRootNode: goog$bind(function () {
                return this.z;
            }, a),
            getEnvironmentData: goog$bind(a.getEnvironmentData, a),
            getVideoData: goog$bind(a.getVideoData, a),
            isFullscreen: goog$bind(function () {
                return this.ea;
            }, a),
            Kb: goog$bind(a.g.Kb, a.g)
        };
        w(a.Oi, c);
        w(b, a.We);
        to(a);
    };
    var to = function (a) {
        if (a.la.args.jsapicallback) {
            var b = a.la.args.jsapicallback;
            if ((b = goog$getObjectByName(b))) {
                b(a.b.Sg);
            }
        }
        if (window.onYouTubePlayerReady) {
            onYouTubePlayerReady(a.b.Sg);
        }
    };
    yt$player$VideoPlayer.prototype.Zp = function (a) {
        this.k("Setting playback to: " + a);
        this.f.setPlaybackRate(parseFloat(a));
    };
    yt$player$VideoPlayer.prototype.kr = function () {
        this.ka.Ec({
            event: "streamingerror",
            ec: 102
        });
    };
    yt$player$VideoPlayer.prototype.Up = function () {
        if (this.isMuted()) {
            this.unMute();
        } else {
            this.mute();
        }
    };
    yt$player$VideoPlayer.prototype.Vp = function () {
        this.k("Play/pause toggled.");
        uo(this);
        no(this);
    };
    yt$player$VideoPlayer.prototype.fm = function () {
        if (this.f.currentTime > 0 && !this.Ol) {
            yt$clearInterval(this.Bc);
            if (this.a.m) {
                yt$timing.info("docid", this.a.m);
            }
            if (this.a.pa) {
                yt$timing.info("plid", this.a.pa);
            }
            if (this.a.Gb) {
                yt$timing.info("hbid", this.a.Gb);
            }
            if (this.a.R > 0) {
                yt$timing.info("start", this.a.R.toString());
            }
            yt$timing.info("fmt", this.a.format.zc.toString());
            yt$timing.info("tds", Math.round(this.getLoadProgressFraction() * this.getDuration()).toString());
            yt$timing.mb("aft");
            if (this.b.eventLabel == "detailpage") {
                var a = this.Ca.Cd;
                var b;
                for (b in a) {
                    yt$timing.mb(b, a[b]);
                }
                var a = this.Ca.Ri;
                var c;
                for (c in a) {
                    yt$timing.info(c, a[c]);
                }
                yt$timing.ug();
            }
            this.Ol = true;
            c = this.ka;
            if (c.Ce) {
                c.k("Attempted to start sending initial pings twice.");
            } else {
                a = wn(c);
                a.Ji = true;
                c.Y = c.Jb();
                c.Me = c.Y;
                a.De = [c.Y];
                a.Ii = a.De;
                c.Si = (goog$now() - c.Le) / 1000;
                a.send();
                if (c.a.fg) {
                    if (c.tg) {
                        c.k("Do not call startSendingDetailedPings_ twice");
                    } else {
                        un(c);
                        c.tg = yt$setInterval(goog$bind(c.Nl, c), 10000);
                    }
                }
                if (c.b.Ge) {
                    if (c.Ce) {
                        R(
                            goog$debug$Logger$Level$WARNING,
                            "yt.tracking.VideoStats",
                            "Tried to logUserWatch inappropriately.",
                            undefined
                        );
                    } else {
                        a = c.b;
                        b = c.a;
                        a = {
                            noflv: "1",
                            html5: "1",
                            video_id: b.m,
                            plid: b.pa,
                            referrer: a.referrer,
                            eurl: a.kb,
                            framer: a.yc,
                            feature: a.Yb,
                            fmt: b.format ? b.format.zc : 0,
                            ptk: b.Ac
                        };
                        w(a, c.Da());
                        a = yt$uri$appendQueryData(c.b.Db + "user_watch", a);
                        qf(a);
                    }
                }
                if (c.a.Ac && c.a.ig) {
                    qf(
                        yt$uri$appendQueryData(c.b.Db + "ptracking", {
                            html5: "1",
                            video_id: c.a.m,
                            plid: c.a.pa,
                            ptk: c.a.Ac,
                            oid: c.a.Al,
                            ptchn: c.a.ig,
                            pltype: c.a.Bl
                        })
                    );
                }
                if (c.a.Dl) {
                    if (c.Ce) {
                        R(
                            goog$debug$Logger$Level$WARNING,
                            "yt.tracking.VideoStats",
                            "Tried to logGetVideo inappropriately.",
                            undefined
                        );
                    } else {
                        a = c.b;
                        b = c.a;
                        var d = {
                            noflv: 1,
                            video_id: b.m,
                            el: a.eventLabel,
                            ps: a.Ta,
                            referrer: a.referrer,
                            eurl: a.kb,
                            framer: a.yc,
                            fmt: b.format ? b.format.zc : 0,
                            ptk: b.Ac,
                            subscribed: b.Hb,
                            t: b.yl
                        };
                        if (a.autoplay) {
                            d.autoplay = "1";
                        }
                        if (b.lb) {
                            d.splay = "1";
                        }
                        if (b.R > 0) {
                            d.start = b.R * 1000;
                        }
                        if (b.El) {
                            d.tmi = "1";
                        }
                        a = yt$uri$appendQueryData(c.Ll, d);
                        qf(a);
                    }
                }
                c.Ce = true;
            }
            po(this);
        }
    };
    yt$player$VideoPlayer.prototype.Ee = function (a) {
        a.volume = Oc(a.volume, 0, 100);
        a.nonNormalized = a.volume / this.a.Gi;
        if (this.b.Ua) {
            var b = this.xd;
            if (b.Gd) {
                var c = {};
                c.volume = isNaN(a.volume) ? b.getVolume().volume : Oc(a.volume, 0, 100);
                c.nonNormalized = a.nonNormalized;
                c.muted = a.muted == undefined ? b.getVolume().muted : a.muted;
                try {
                    b.Gd.set("yt-player-volume", c);
                } catch (d) {}
            }
        }
        if (!this.g.Kb("audio")) {
            this.g.setVolume(a.volume, a.muted);
            this.f.setVolume(a.volume, a.muted);
            this.pubsub.c("onVolumeChange", a);
        }
    };
    yt$player$VideoPlayer.prototype.Ie = function () {
        this.$b = this.f.currentTime;
        if (
            this.nb == 1 &&
            this.Ni &&
            (this.zg > 0 && this.$b > this.zg && (this.$i += this.$b - this.zg),
            this.a.Ba && !this.a.Ul && this.$i >= this.Cl)
        ) {
            var a;
            a = this.b;
            var b = this.a;
            var c = Oc(this.$b / b.Ba, 0, 1);
            var c = {
                html5: "1",
                video_id: b.m,
                eurl: a.kb,
                framer: a.yc,
                referrer: a.referrer,
                feature: a.Yb,
                ps: a.Ta,
                el: a.eventLabel,
                hl: a.Eb,
                list: b.Ib,
                w: c,
                l: b.Ba,
                plid: b.pa,
                t: b.yl
            };
            if (a.autoplay) {
                c.autoplay = "1";
            }
            if (b.lb) {
                c.splay = "1";
            }
            if (b.Hb) {
                c.subscribed = b.Hb;
            }
            if (b.Gb) {
                c.hbid = b.Gb;
            }
            a = yt$uri$appendQueryData(a.Db + "set_awesome", c);
            qf(a);
            this.a.Ul = true;
        }
        if (
            this.a.Fl &&
            ((a = this.a.Yi), (a == 1 && this.$b > 0) || (a == 2 && this.$b >= 20) || (a == 3 && this.$b >= 30))
        ) {
            a = this.ka;
            if (a.Ce) {
                b = a.b;
                c = a.a;
                a = {
                    ns: "yt",
                    html5: "1",
                    docid: c.m,
                    plid: c.pa,
                    fmt: c.format ? c.format.zc : 0,
                    el: b.eventLabel,
                    ps: b.Ta,
                    subscribed: c.Hb,
                    yttk: "1",
                    st: a.Jb(),
                    et: a.Jb(),
                    ctp: c.Yi,
                    vid: b.pd
                };
                a = yt$uri$appendQueryData("//s2.youtube.com/s", a);
                qf(a);
            }
            this.a.Yi++;
        }
        this.zg = this.$b;
        this.g.Ei.innerHTML = yt$player$utils$Controls$formatTime(this.f.currentTime);
        a = this.getPlayProgressFraction();
        if (this.f.buffered && this.f.buffered.length > 0) {
            b = this.getLoadProgressFraction();
            c = this.g;
            c.Fe = a;
            c.Ql = b;
            oi(c);
            a = this.f.getBufferedTimeRangeIndex();
            if (!yt$timing.timer.l2s && this.f.buffered.end(a) > 2) {
                yt$timing.mb("l2s");
            }
            this.f.buffered.end(a);
        } else {
            b = this.g;
            if (!b.Ki) {
                b.Fe = a;
                oi(b);
            }
        }
        this.getDuration();
        if (!this.Ap) {
            if (this.Zi) {
                window.clearTimeout(this.Zi);
            }
            if (!this.f.isPaused()) {
                this.Zi =
                    this.f.played && this.f.played.length == 0
                        ? window.setTimeout(goog$bind(this.Ie, this), 100)
                        : window.setTimeout(goog$bind(this.Ie, this), 500);
            }
        }
    };
    yt$player$VideoPlayer.prototype.Rp = function () {
        no(this, Yf);
        this.Hg = !this.f.paused;
        if (!this.f.paused) {
            this.f.pause();
        }
        this.pubsub.c("beginseeking");
        qo(this, "beginseeking");
    };
    yt$player$VideoPlayer.prototype.Sp = function () {
        no(this);
        qo(this, "endseeking");
        this.pubsub.c("endseeking");
        if (this.Hg) {
            this.Hg = false;
            this.f.playVideo();
        }
        this.Ua();
    };
    yt$player$VideoPlayer.prototype.Yp = function (a) {
        this.Qe(a * this.getDuration(), true);
        this.Ni = false;
        this.Ie();
        this.Ni = true;
        this.pubsub.c("seekto", a);
        qo(this, "seekto", a);
    };
    yt$player$VideoPlayer.prototype.Wp = function (a) {
        if (this.ea) {
            vo(this, false);
        }
        if (a != this.b.Ed) {
            this.b.Ed = a;
            this.pubsub.c("SIZE_CLICKED", a);
            ho(this);
            a = goog$dom$getElement("watch-player");
            this.Nd.G(a, "transitionend", goog$bind(this.pb, this));
            this.Nd.G(a, "MSTransitionEnd", goog$bind(this.pb, this));
            this.Nd.G(a, "oTransitionEnd", goog$bind(this.pb, this));
            this.Nd.G(a, "webkitTransitionEnd", goog$bind(this.pb, this));
            yt$setTimeout(goog$bind(this.pb, this), 1000);
        }
    };
    yt$player$VideoPlayer.prototype.Tp = function () {
        vo(this, !this.ea);
    };
    yt$player$VideoPlayer.prototype.Xp = function (a) {
        a = wo(this, a);
        this.a.R = this.f.currentTime;
        if (a && a != this.a.format) {
            fo(this, a);
        }
    };
    yt$player$VideoPlayer.prototype.$p = function () {
        if (yt$net$ajax$tokenMap_.addto_ajax) {
            go(this);
        } else {
            var a = goog$uri$utils$split(document.location.href);
            var b = a[1];
            var c = a[2];
            var d = a[3];
            var a = a[4];
            var f = [];
            if (b) {
                f.push(b, ":");
            }
            if (d) {
                f.push("//");
                if (c) {
                    f.push(c, "@");
                }
                f.push(d);
                if (a) {
                    f.push(":", a);
                }
            }
            yt$net$ajax$send(f.join("") + "/token_ajax", {
                format: "RAW",
                method: "GET",
                Mg: {
                    action_get_wl_token: 1
                },
                lf: this,
                Rb: this.Rt
            });
        }
    };
    yt$player$VideoPlayer.prototype.aq = function () {
        xo(this, this.getVideoUrl());
    };
    yt$player$VideoPlayer.prototype.dr = function () {
        var a = se("fullScreen", document);
        if (a == null) {
            a = !this.ea;
        }
        yo(this, a);
    };
    var yo = function (a, b) {
        if (!b && a.b.eventLabel == "detailpage") {
            var c = goog$getObjectByName("checkCurrentVideo");
            if (c && zh("VIDEO_ID") != a.a.m) {
                var d = a.xd;
                try {
                    var f = {};
                    f[a.a.m] = a.f.currentTime;
                    d.Bd.set("yt-player-restore-playhead", f);
                } catch (g) {}
                c(a.a.m);
                a.pubsub.c("openingpage");
            }
        }
        a.ea = b;
        if (!b && !a.qd) {
            co(a, false);
        } else {
            co(a, true);
        }
        ho(a);
        ni(a.g.dg, b);
        eo(a);
        if (b && a.b.Li) {
            Nn(a);
        }
        qo(a, "onResize");
    };
    var ho = function (a) {
        var b = "small";
        if (a.ea) {
            b = "fullscreen";
        } else if (a.b.Ed) {
            b = "large";
        }
        yt$dom$datasets$set(document.body, "player-size", b);
    };
    yt$player$VideoPlayer.prototype.Fj = function (a) {
        var b = a.keyCode;
        if (b == 179 || b == 178) {
            if (b == 179) {
                uo(this, true);
                a.preventDefault();
            }
            if (b == 178) {
                this.bm();
                a.preventDefault();
            }
        }
        if (b == 98) {
            qo(this, "onToggleBackground");
        }
        if (b == 187 || b == 43) {
            qo(this, "onFontSizeIncrease");
        }
        if (b == 189 || b == 45) {
            qo(this, "onFontSizeDecrease");
        }
        if (b == 32 && io(a)) {
            uo(this, true);
            a.preventDefault();
        }
    };
    yt$player$VideoPlayer.prototype.er = function (a) {
        var b = a.keyCode;
        if (b == 38 || b == 40 || b == 37 || b == 39) {
            if (b == 38) {
                this.fj({
                    volume: this.S.volume + 5,
                    muted: false
                });
            } else if (b == 40) {
                this.fj({
                    volume: this.S.volume - 5,
                    muted: false
                });
            } else if (b == 37) {
                this.Qe(this.getCurrentTime() - 20, true);
            } else if (b == 39) {
                this.Qe(this.getCurrentTime() + 20, true);
            }
            a.preventDefault();
        }
        if (b == 27 && this.ea) {
            vo(this, false);
            a.preventDefault();
        }
    };
    yt$player$VideoPlayer.prototype.pb = function () {
        this.Nd.Wa();
        if (this.Fa.clientWidth != 0 || this.Fa.clientHeight != 0) {
            eo(this);
            qo(this, "onResize");
        }
    };
    var qo = function (a, b, c) {
        if (a.Ca) {
            kn(a.Ca, b, c);
        }
    };
    var wo = function (a, b) {
        var c;
        a.Va.some(function (a) {
            if (a.Nc == b) {
                c = a;
                return true;
            }
        });
        return c;
    };
    yt$player$VideoPlayer.prototype.Sm = function (a) {
        var b;
        this.Va.some(function (c) {
            if (c.Hd == a) {
                b = c;
                return true;
            }
        });
        return b;
    };
    yt$player$VideoPlayer.prototype.Bg = function (a) {
        if (this.ob) {
            Yn(this);
        } else {
            this.f.togglePlayPause();
            if (a) {
                zo(this);
            }
        }
    };
    yt$player$VideoPlayer.prototype.playVideo = function () {
        if (this.ob) {
            Yn(this);
        } else {
            if (this.f.getSrc() != wg(this.a)) {
                this.f.activate(wg(this.a));
                if (this.Ig) {
                    window.clearTimeout(this.Ig);
                }
                this.Ig = yt$setTimeout(goog$bind(this.kr, this), 15000);
            }
            yt$setTimeout(
                goog$bind(function () {
                    this.f.playVideo();
                }, this),
                0
            );
        }
    };
    yt$player$VideoPlayer.prototype.pauseVideo = function () {
        this.f.pauseVideo();
    };
    yt$player$VideoPlayer.prototype.stopVideo = function () {
        if (this.kg() != Xf) {
            var a = this.ka;
            tn(a);
            a.r();
            this.pauseVideo();
            this.a.R = this.f.currentTime;
            this.f.stopVideo();
            this.pubsub.c("internalstatechange", -1);
        }
    };
    var zo = function (a) {
        var b = document.createElement("div");
        goog$dom$classes$add(b, "html5-bezel", "html5-center-overlay");
        var c = document.createElement("div");
        if (a.Mn()) {
            goog$dom$classes$add(c, "html5-bezel-pause");
        } else {
            goog$dom$classes$add(c, "html5-bezel-play");
        }
        b.appendChild(c);
        a.Fa.appendChild(b);
        yt$setTimeout(function () {
            goog$dom$classes$add(b, "html5-bezel-fade");
        }, 0);
        yt$setTimeout(function () {
            goog$dom$removeNode(b);
        }, 300);
    };
    yt$player$VideoPlayer.prototype.iq = function () {
        this.a.lb = true;
        this.Yl();
    };
    yt$player$VideoPlayer.prototype.Yl = function () {
        if (!this.g.Kb("play_pause")) {
            var a = li(this.g);
            if (a) {
                a.kh("control_play");
            } else {
                this.playVideo();
            }
        }
    };
    yt$player$VideoPlayer.prototype.bm = function () {
        if (!this.g.Kb("play_pause")) {
            var a = li(this.g);
            if (a) {
                a.kh("control_pause");
            } else {
                this.pauseVideo();
            }
        }
    };
    var uo = function (a, b) {
        if (
            !a.g.Kb("play_pause") &&
            (!a.b.Fb || !a.ob || !!yt$player$utils$VideoTagPool$instance_.hasTags(undefined))
        ) {
            var c = li(a.g);
            if (c) {
                c.kh("control_toggle_play_pause");
            } else {
                a.Bg(b);
            }
        }
    };
    yt$player$VideoPlayer.prototype.hq = function () {
        if (!this.g.Kb("play_pause")) {
            this.stopVideo();
        }
    };
    yt$player$VideoPlayer.prototype.jq = function (a, b) {
        this.a.lb = true;
        this.Qe(a, b);
    };
    yt$player$VideoPlayer.prototype.Qe = function (a, b) {
        if (!this.g.Kb("seek")) {
            this.seekTo(a, b);
        }
    };
    var vo = function (a, b) {
        if (De()) {
            if (b) {
                var c = a.z;
                var d = se("requestFullScreen", c);
                if (d) {
                    d.apply(c);
                }
            } else if ((c = se("cancelFullScreen", document))) {
                c.call(document);
            }
        } else {
            yo(a, b);
        }
    };
    yt$player$VideoPlayer.prototype.$m = function (a) {
        if (io(a)) {
            this.z.focus();
            if (this.getPlayerState() == 5 || !this.b.Zb) {
                uo(this, true);
            }
        }
    };
    yt$player$VideoPlayer.prototype.fr = function (a) {
        if (io(a)) {
            vo(this, !this.ea);
        }
    };
    yt$player$VideoPlayer.prototype.gr = function (a) {
        if (a.scale * (this.ea ? -1 : 1) > (this.ea ? -0.7 : 1.3)) {
            vo(this, !this.ea);
        }
        a.preventDefault();
    };
    yt$player$VideoPlayer.prototype.hr = function (a) {
        if (a.scale * (this.ea ? -1 : 1) > (this.ea ? -0.9 : 1.1)) {
            vo(this, !this.ea);
        }
    };
    var io = function (a) {
        return !Lc(a.target, "html5-stop-propagation");
    };
    yt$player$VideoPlayer.prototype.ir = function (a) {
        if (this.a && this.a.Fn) {
            xo(this, this.a.Fn);
        } else {
            xo(this, this.getVideoUrl());
        }
        a.stopPropagation();
    };
    var xo = function (a, b) {
        if (a.ea) {
            vo(a, false);
        }
        a.pubsub.c("openingpage");
        Ql(b);
    };
    yt$player$VideoPlayer.prototype.Fs = function () {
        var a = {
            eurl: this.b.kb,
            html5: 1
        };
        if (!this.ob) {
            a.autoplay = 1;
            a.vq = this.a.format.Hd;
        }
        var b = Math.round(this.z.getCurrentTime());
        if (b > 10) {
            a.start = b;
        }
        b = "/embed/" + this.a.m;
        b = yt$uri$appendQueryData(b, a);
        a = this.b.td();
        a = {
            top: 0,
            left: 0,
            width: a.width,
            height: a.height,
            resizable: true
        };
        this.pubsub.c("openingpage");
        yt$window$popup(b, a);
    };
    yt$player$VideoPlayer.prototype.Np = function (a) {
        this.k("Handling get_video_info response");
        fh(this.b, a);
        this.pubsub.c("internalvideodatachange", "videoinfo");
        if (ao(this)) {
            this.pubsub.c("nothtml5servable", a);
        } else if (Kn(this).length) {
            Qn(this);
        } else {
            this.k("No available formats");
            this.pubsub.c("nothtml5servable", a);
        }
    };
    yt$player$VideoPlayer.prototype.Op = function (a) {
        this.pubsub.c("unabletoplay", a.errorcode, unescape(a.reason));
    };
    yt$player$VideoPlayer.prototype.oq = function (a) {
        if (this.la.fallback) {
            this.k("Calling fallback");
            var b = this.la;
            if (this.a) {
                b.args.video_id = this.a.m;
                b.args.start = this.a.R;
            }
            b.args.html5_unavailable = "1";
            w(b, a || {});
            var c = this.z.parentNode;
            b.fallbackMessage = goog$bind(function () {
                c.appendChild(this.z);
                this.pubsub.c("unabletoplay", 5);
            }, this);
            this.la.fallback(b);
        } else {
            this.pubsub.c("unabletoplay", 5);
        }
    };
    yt$player$VideoPlayer.prototype.rq = function (a, b) {
        yt$clearInterval(this.Bc);
        yt$clearInterval(this.rg);
        $n(this);
        if (this.cj) {
            this.cj.innerHTML = b ? b : yt$getMsg("HTML5_DEFAULT_FALLBACK");
            md(this.yg, true);
        } else if (this.la.fallbackMessage) {
            this.la.fallbackMessage();
        }
        this.pubsub.c("internalstatechange", -1);
        this.pubsub.c("onError", a);
    };
    yt$player$VideoPlayer.prototype.pq = function () {
        this.pauseVideo();
    };
    var co = function (a, b) {
        goog$dom$classes$enable(a.z, "html5-autohide", b);
        a.Ua();
    };
    yt$player$VideoPlayer.prototype.Ua = function () {
        goog$dom$classes$enable(this.z, "hide-controls", false);
        window.clearTimeout(this.Gj);
        if (this.nb != 0) {
            Ao(this);
        }
        if (this.qd) {
            qo(this, "showcontrols");
        }
    };
    var Ao = function (a) {
        var b = a.b.Fb ? 4000 : 3000;
        a.Gj = yt$setTimeout(goog$bind(a.Nj, a), b);
    };
    yt$player$VideoPlayer.prototype.setSize = function () {
        eo(this);
        qo(this, "onResize");
    };
    yt$player$VideoPlayer.prototype.Nj = function () {
        var a;
        if (!(a = this.Hc != Wf)) {
            a = this.g;
            var b = bi.getInstance();
            a = !!b.Pd && pe(b.Pd, a.C);
        }
        if (a) {
            window.clearTimeout(this.Gj);
            Ao(this);
        } else {
            goog$dom$classes$enable(this.z, "hide-controls", true);
            if (this.qd) {
                qo(this, "hidecontrols");
            }
        }
    };
    yt$player$VideoPlayer.prototype.Js = function (a) {
        a.preventDefault();
        if (!yt$style$isDisplayed(this.mg.Ab)) {
            if (yt$style$isDisplayed(this.Ea)) {
                a.stopPropagation();
            }
            qn(this.Ea, a);
            yt$style$show(this.Ea);
            if (!this.Aa) {
                this.Aa = new Ge();
            }
            this.Aa.G(this.Ea, "contextmenu", function (a) {
                a.preventDefault();
            });
            a = goog$bind(function () {
                this.Aa.G(document, "click", goog$bind(this.Pf, this));
                this.Aa.G(document, "contextmenu", goog$bind(this.Pf, this));
                this.Aa.G(window, "blur", goog$bind(this.Pf, this));
            }, this);
            yt$setTimeout(a, 0);
            this.Aa.G(document, "keydown", goog$bind(this.Ts, this));
        }
    };
    yt$player$VideoPlayer.prototype.Ts = function (a) {
        if (a.keyCode == 27) {
            this.Pf();
        }
    };
    yt$player$VideoPlayer.prototype.Pf = function () {
        yt$style$hide(this.Ea);
        this.Aa.Wa();
    };
    var Vn = function (a) {
        a.b.Lb = new goog$math$Size(a.Fa.clientWidth, a.Fa.clientHeight);
        if (!a.fk || !jc(a.fk, a.b.Lb)) {
            a.fk = a.b.Lb;
            var b = a.b.Lb.width;
            var c = a.b.Lb.height;
            var d = 0;
            var f = 0;
            if (b / c > 480 / 360) {
                d = c;
                f = 360;
            } else {
                d = b;
                f = 480;
            }
            b = Oc(d / f, 0.53, 1);
            a.Qr = Fe(
                ".html5-scalable-icon",
                [
                    "transform: scale(" + b + ") !important",
                    "-webkit-transform: scale(" + b + ") !important",
                    "-moz-transform: scale(" + b + ") !important",
                    "-o-transform: scale(" + b + ") !important",
                    "-ms-transform: scale(" + b + ") !important"
                ],
                {
                    Sc: a.Qr,
                    reset: true
                }
            );
        }
    };
    var eo = function (a) {
        Vn(a);
        var b = a.f.videoWidth;
        var c = a.f.videoHeight;
        if (a.f.readyState != 0) {
            a.a.Oe = new goog$math$Size(b, c);
        }
        if (!a.b.Zb && b * c != 0) {
            var b = a.Fa.clientHeight;
            var c = a.Fa.clientWidth;
            var d = a.f.videoWidth;
            var f = a.f.videoHeight;
            var g = Math.min(b / f, c / d);
            var d = d * g;
            var f = f * g;
            var b = new goog$math$Rect((c - d) / 2, (b - f) / 2, d, f);
            a.b.Gc = new goog$math$Rect(0, 0, b.width, b.height);
            hd(a.pg, b.width, b.height);
            Zc(a.pg, b.left, b.top);
        }
    };
    yt$player$VideoPlayer.prototype.appendToVideoContent = function (a) {
        this.pg.appendChild(a);
    };
    yt$player$VideoPlayer.prototype.appendAboveVideoControls = function (a) {
        var b = this.Ke;
        b.insertBefore(a, b.childNodes[0] || null);
    };
    goog$exportSymbol("yt.player.VideoPlayer", yt$player$VideoPlayer);
    goog$exportSymbol("yt.player.utils.Controls.formatTime", yt$player$utils$Controls$formatTime);
})();
