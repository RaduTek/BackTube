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
            return a.instance_ || (a.instance_ = new a());
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
        a.superClass_ = b.prototype;
        a.prototype = new c();
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
    var goog$string$isEmpty = function (a) {
        return /^[\s\xa0]*$/.test(a);
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
    var goog$string$unescapeEntities = function (a) {
        if (a.indexOf("&") != -1) {
            if ("document" in goog$global) {
                return goog$string$unescapeEntitiesUsingDom_(a);
            } else {
                return goog$string$unescapePureXmlEntities_(a);
            }
        } else {
            return a;
        }
    };
    var goog$string$unescapeEntitiesUsingDom_ = function (a) {
        var b = {
            "&amp;": "&",
            "&lt;": "<",
            "&gt;": ">",
            "&quot;": '"'
        };
        var c = document.createElement("div");
        return a.replace(goog$string$HTML_ENTITY_PATTERN_, function (a, e) {
            var f = b[a];
            if (f) {
                return f;
            }
            if (e.charAt(0) == "#") {
                var g = Number("0" + e.substr(1));
                if (!isNaN(g)) {
                    f = String.fromCharCode(g);
                }
            }
            if (!f) {
                c.innerHTML = a + " ";
                f = c.firstChild.nodeValue.slice(0, -1);
            }
            return (b[a] = f);
        });
    };
    var goog$string$unescapePureXmlEntities_ = function (a) {
        return a.replace(/&([^;]+);/g, function (a, c) {
            switch (c) {
                case "amp":
                    return "&";
                case "lt":
                    return "<";
                case "gt":
                    return ">";
                case "quot":
                    return '"';
                default:
                    if (c.charAt(0) == "#") {
                        var d = Number("0" + c.substr(1));
                        if (!isNaN(d)) {
                            return String.fromCharCode(d);
                        }
                    }
                    return a;
            }
        });
    };
    var goog$string$HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
    var goog$string$truncate = function (a, b) {
        if (a.length > b) {
            a = a.substring(0, b - 3) + "...";
        }
        return a;
    };
    var goog$string$specialEscapeChars_ = {
        "\0": "\\0",
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "\t": "\\t",
        "": "\\x0B",
        '"': '\\"',
        "\\": "\\\\"
    };
    var goog$string$jsEscapeCache_ = {
        "'": "\\'"
    };
    var goog$string$escapeString = function (a) {
        var b = [];
        for (var c = 0; c < a.length; c++) {
            var d = b;
            var e = c;
            var f;
            f = a.charAt(c);
            if (f in goog$string$jsEscapeCache_) {
                f = goog$string$jsEscapeCache_[f];
            } else if (f in goog$string$specialEscapeChars_) {
                f = goog$string$jsEscapeCache_[f] = goog$string$specialEscapeChars_[f];
            } else {
                var g = f;
                var j = f.charCodeAt(0);
                if (j > 31 && j < 127) {
                    g = f;
                } else {
                    if (j < 256) {
                        g = "\\x";
                        if (j < 16 || j > 256) {
                            g += "0";
                        }
                    } else {
                        g = "\\u";
                        if (j < 4096) {
                            g += "0";
                        }
                    }
                    g += j.toString(16).toUpperCase();
                }
                f = goog$string$jsEscapeCache_[f] = g;
            }
            d[e] = f;
        }
        return b.join("");
    };
    var goog$string$compareVersions = function (a, b) {
        for (
            var c = 0,
                d = goog$string$trim("" + a).split("."),
                e = goog$string$trim("" + b).split("."),
                f = Math.max(d.length, e.length),
                g = 0;
            c == 0 && g < f;
            g++
        ) {
            var j = d[g] || "";
            var o = e[g] || "";
            var x = RegExp("(\\d*)(\\D*)", "g");
            var C = RegExp("(\\d*)(\\D*)", "g");
            do {
                var F = x.exec(j) || ["", "", ""];
                var I = C.exec(o) || ["", "", ""];
                if (F[0].length == 0 && I[0].length == 0) {
                    break;
                }
                c =
                    ((F[1].length == 0 ? 0 : parseInt(F[1], 10)) < (I[1].length == 0 ? 0 : parseInt(I[1], 10))
                        ? -1
                        : (F[1].length == 0 ? 0 : parseInt(F[1], 10)) > (I[1].length == 0 ? 0 : parseInt(I[1], 10))
                          ? 1
                          : 0) ||
                    ((F[2].length == 0) < (I[2].length == 0) ? -1 : (F[2].length == 0) > (I[2].length == 0) ? 1 : 0) ||
                    (F[2] < I[2] ? -1 : F[2] > I[2] ? 1 : 0);
            } while (c == 0);
        }
        return c;
    };
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
    var goog$asserts$doAssertFailure_ = function (a, b, c, d) {
        var e = "Assertion failed";
        if (c) {
            var e = e + (": " + c);
            var f = d;
        } else if (a) {
            e += ": " + a;
            f = b;
        }
        throw new goog$asserts$AssertionError("" + e, f || []);
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
              for (var d = a.length, e = [], f = 0, g = goog$isString(a) ? a.split("") : a, j = 0; j < d; j++) {
                  if (j in g) {
                      var o = g[j];
                      if (b.call(c, o, j, a)) {
                          e[f++] = o;
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
              for (var d = a.length, e = Array(d), f = goog$isString(a) ? a.split("") : a, g = 0; g < d; g++) {
                  if (g in f) {
                      e[g] = b.call(c, f[g], g, a);
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
    var goog$array$find = function (a, b) {
        var c = goog$array$findIndex(a, b, undefined);
        if (c < 0) {
            return null;
        } else if (goog$isString(a)) {
            return a.charAt(c);
        } else {
            return a[c];
        }
    };
    var goog$array$findIndex = function (a, b, c) {
        for (var d = a.length, e = goog$isString(a) ? a.split("") : a, f = 0; f < d; f++) {
            if (f in e && b.call(c, e[f], f, a)) {
                return f;
            }
        }
        return -1;
    };
    var goog$array$findIndexRight = function (a, b) {
        var c = goog$isString(a) ? a.split("") : a;
        for (var d = a.length - 1; d >= 0; d--) {
            if (d in c && b.call(undefined, c[d], d, a)) {
                return d;
            }
        }
        return -1;
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
    var goog$array$removeAt = function (a, b) {
        goog$asserts$assert(a.length != null);
        goog$array$ARRAY_PROTOTYPE_.splice.call(a, b, 1);
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
                for (var g = d.length, j = 0; j < g; j++) {
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
    var goog$array$sort = function (a, b) {
        goog$asserts$assert(a.length != null);
        goog$array$ARRAY_PROTOTYPE_.sort.call(a, b || goog$array$defaultCompare);
    };
    var goog$array$sortObjectsByKey = function (a) {
        var b = goog$array$defaultCompare;
        goog$array$sort(a, function (a, d) {
            return b(a.key, d.key);
        });
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
    var goog$dom$classes$swap = function (a, b, c) {
        for (var d = goog$dom$classes$get(a), e = false, f = 0; f < d.length; f++) {
            if (d[f] == b) {
                goog$array$splice(d, f--, 1);
                e = true;
            }
        }
        if (e) {
            d.push(c);
            a.className = d.join(" ");
        }
    };
    var goog$dom$classes$addRemove = function (a, b, c) {
        var d = goog$dom$classes$get(a);
        if (goog$isString(b)) {
            var e = d;
            var b = goog$array$indexOf(e, b);
            if (b >= 0) {
                goog$array$removeAt(e, b);
            }
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
    var goog$dom$classes$toggle = function (a, b) {
        var c = !goog$dom$classes$has(a, b);
        goog$dom$classes$enable(a, b, c);
        return c;
    };
    var goog$math$Coordinate = function (a, b) {
        this.x = goog$isDef(a) ? a : 0;
        this.y = goog$isDef(b) ? b : 0;
    };
    goog$math$Coordinate.prototype.Qa = function () {
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
    goog$math$Size.prototype.Qa = function () {
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
    var goog$object$getAnyValue = function (a) {
        for (var b in a) {
            return a[b];
        }
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
    var goog$userAgent$detectedMac_;
    var goog$userAgent$detectedWindows_;
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
    var goog$userAgent$init_$ua;
    if ((goog$userAgent$init_$ua = goog$userAgent$getUserAgentString())) {
        var goog$userAgent$init_$navigator = goog$userAgent$getNavigator();
        goog$userAgent$detectedOpera_ = goog$userAgent$init_$ua.indexOf("Opera") == 0;
        goog$userAgent$detectedIe_ = !goog$userAgent$detectedOpera_ && goog$userAgent$init_$ua.indexOf("MSIE") != -1;
        goog$userAgent$detectedMobile_ =
            (goog$userAgent$detectedWebkit_ =
                !goog$userAgent$detectedOpera_ && goog$userAgent$init_$ua.indexOf("WebKit") != -1) &&
            goog$userAgent$init_$ua.indexOf("Mobile") != -1;
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
    goog$userAgent$detectedMac_ = goog$userAgent$PLATFORM.indexOf("Mac") != -1;
    goog$userAgent$detectedWindows_ = goog$userAgent$PLATFORM.indexOf("Win") != -1;
    var goog$userAgent$detectedX11_ =
        !!goog$userAgent$getNavigator() && (goog$userAgent$getNavigator().appVersion || "").indexOf("X11") != -1;
    var goog$userAgent$determineVersion_$result;
    a: {
        var goog$userAgent$determineVersion_$version = "";
        var goog$userAgent$determineVersion_$re;
        if (goog$userAgent$OPERA && goog$global.opera) {
            var goog$userAgent$determineVersion_$operaVersion = goog$global.opera.version;
            var goog$userAgent$determineVersion_$version =
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
                var goog$userAgent$determineVersion_$version = goog$userAgent$determineVersion_$arr
                    ? goog$userAgent$determineVersion_$arr[1]
                    : "";
            }
        }
        if (goog$userAgent$IE) {
            var goog$userAgent$determineVersion_$docMode;
            var goog$userAgent$getDocumentMode_$doc = goog$global.document;
            goog$userAgent$determineVersion_$docMode = goog$userAgent$getDocumentMode_$doc
                ? goog$userAgent$getDocumentMode_$doc.documentMode
                : undefined;
            if (goog$userAgent$determineVersion_$docMode > parseFloat(goog$userAgent$determineVersion_$version)) {
                goog$userAgent$determineVersion_$result = "" + goog$userAgent$determineVersion_$docMode;
                break a;
            }
        }
        goog$userAgent$determineVersion_$result = goog$userAgent$determineVersion_$version;
    }
    var goog$userAgent$VERSION = goog$userAgent$determineVersion_$result;
    var goog$userAgent$isVersionCache_ = {};
    var goog$userAgent$isVersion = function (a) {
        return (
            goog$userAgent$isVersionCache_[a] ||
            (goog$userAgent$isVersionCache_[a] = goog$string$compareVersions(goog$userAgent$VERSION, a) >= 0)
        );
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
                var e = 0;
                for (var f = 0, g; (g = c[f]); f++) {
                    if (a == g.nodeName) {
                        d[e++] = g;
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
            for (f = e = 0; (g = c[f]); f++) {
                a = g.className;
                if (typeof a.split == "function" && goog$array$contains(a.split(/\s+/), b)) {
                    d[e++] = g;
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
    var goog$dom$getDocumentHeight = function () {
        var a = window;
        var b = a.document;
        var c = 0;
        if (b) {
            var a = goog$dom$getViewportSize_(a).height;
            var c = b.body;
            var d = b.documentElement;
            if (goog$dom$isCss1CompatMode_(b) && d.scrollHeight) {
                c = d.scrollHeight != a ? d.scrollHeight : d.offsetHeight;
            } else {
                var b = d.scrollHeight;
                var e = d.offsetHeight;
                if (d.clientHeight != e) {
                    b = c.scrollHeight;
                    e = c.offsetHeight;
                }
                c = b > a ? (b > e ? b : e) : b < e ? b : e;
            }
        }
        return c;
    };
    var goog$dom$getDocumentScroll_ = function (a) {
        var b = !goog$userAgent$WEBKIT && goog$dom$isCss1CompatMode_(a) ? a.documentElement : a.body;
        var a = a.parentWindow || a.defaultView;
        return new goog$math$Coordinate(a.pageXOffset || b.scrollLeft, a.pageYOffset || b.scrollTop);
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
    var goog$dom$createTextNode = function (a) {
        return document.createTextNode(a);
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
            a.parentNode.removeChild(a);
        }
    };
    var goog$dom$getFirstElementChild = function (a) {
        if (a.firstElementChild != undefined) {
            return a.firstElementChild;
        } else {
            return goog$dom$getNextElementNode_(a.firstChild);
        }
    };
    var goog$dom$getNextElementNode_ = function (a) {
        while (a && a.nodeType != 1) {
            a = a.nextSibling;
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
    var goog$dom$getTextContent = function (a) {
        if (goog$dom$BrowserFeature$CAN_USE_INNER_TEXT && "innerText" in a) {
            a = a.innerText.replace(/(\r\n|\r|\n)/g, "\n");
        } else {
            var b = [];
            goog$dom$getTextContent_(a, b, true);
            a = b.join("");
        }
        a = a.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
        a = a.replace(/\u200B/g, "");
        if (!goog$dom$BrowserFeature$CAN_USE_INNER_TEXT) {
            a = a.replace(/ +/g, " ");
        }
        if (a != " ") {
            a = a.replace(/^\s*/, "");
        }
        return a;
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
            if (goog$typeOf(a) == "function") {
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
        this.z = a || goog$global.document || document;
    };
    goog$dom$DomHelper.prototype.Ki = function (a, b, c) {
        return goog$dom$createDom_(this.z, arguments);
    };
    goog$dom$DomHelper.prototype.createElement = function (a) {
        return this.z.createElement(a);
    };
    goog$dom$DomHelper.prototype.createTextNode = function (a) {
        return this.z.createTextNode(a);
    };
    var goog$dom$DomHelper$isCss1CompatMode = function (a) {
        return goog$dom$isCss1CompatMode_(a.z);
    };
    var goog$dom$DomHelper$getDocumentScroll = function (a) {
        return goog$dom$getDocumentScroll_(a.z);
    };
    goog$dom$DomHelper.prototype.appendChild = function (a, b) {
        a.appendChild(b);
    };
    goog$dom$DomHelper.prototype.append = goog$dom$append;
    goog$dom$DomHelper.prototype.contains = goog$dom$contains;
    var goog$iter$StopIteration = "StopIteration" in goog$global ? goog$global.StopIteration : Error("StopIteration");
    var goog$iter$Iterator = function () {};
    goog$iter$Iterator.prototype.next = function () {
        throw goog$iter$StopIteration;
    };
    goog$iter$Iterator.prototype.fb = function () {
        return this;
    };
    var goog$iter$toIterator = function (a) {
        if (a instanceof goog$iter$Iterator) {
            return a;
        }
        if (typeof a.fb == "function") {
            return a.fb(false);
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
    var goog$structs$Map = function (a, b) {
        this.U = {};
        this.C = [];
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
                c = a.Ve();
                d = a.We();
            } else {
                var c = goog$object$getKeys(a);
                var e = [];
                var f = 0;
                for (d in a) {
                    e[f++] = a[d];
                }
                d = e;
            }
            for (e = 0; e < c.length; e++) {
                this.set(c[e], d[e]);
            }
        }
    };
    goog$structs$Map.prototype.La = 0;
    goog$structs$Map.prototype.Gb = 0;
    goog$structs$Map.prototype.N = function () {
        return this.La;
    };
    goog$structs$Map.prototype.We = function () {
        goog$structs$Map$cleanupKeysArray_(this);
        var a = [];
        for (var b = 0; b < this.C.length; b++) {
            a.push(this.U[this.C[b]]);
        }
        return a;
    };
    goog$structs$Map.prototype.Ve = function () {
        goog$structs$Map$cleanupKeysArray_(this);
        return this.C.concat();
    };
    goog$structs$Map.prototype.zf = function (a) {
        return goog$structs$Map$hasKey_(this.U, a);
    };
    goog$structs$Map.prototype.clear = function () {
        this.U = {};
        this.Gb = this.La = this.C.length = 0;
    };
    goog$structs$Map.prototype.remove = function (a) {
        if (goog$structs$Map$hasKey_(this.U, a)) {
            delete this.U[a];
            this.La--;
            this.Gb++;
            if (this.C.length > this.La * 2) {
                goog$structs$Map$cleanupKeysArray_(this);
            }
            return true;
        } else {
            return false;
        }
    };
    var goog$structs$Map$cleanupKeysArray_ = function (a) {
        if (a.La != a.C.length) {
            for (var b = 0, c = 0; b < a.C.length;) {
                var d = a.C[b];
                if (goog$structs$Map$hasKey_(a.U, d)) {
                    a.C[c++] = d;
                }
                b++;
            }
            a.C.length = c;
        }
        if (a.La != a.C.length) {
            var e = {};
            var c = (b = 0);
            for (; b < a.C.length;) {
                d = a.C[b];
                if (!goog$structs$Map$hasKey_(e, d)) {
                    a.C[c++] = d;
                    e[d] = 1;
                }
                b++;
            }
            a.C.length = c;
        }
    };
    goog$structs$Map.prototype.get = function (a, b) {
        if (goog$structs$Map$hasKey_(this.U, a)) {
            return this.U[a];
        } else {
            return b;
        }
    };
    goog$structs$Map.prototype.set = function (a, b) {
        if (!goog$structs$Map$hasKey_(this.U, a)) {
            this.La++;
            this.C.push(a);
            this.Gb++;
        }
        this.U[a] = b;
    };
    goog$structs$Map.prototype.Qa = function () {
        return new goog$structs$Map(this);
    };
    var goog$structs$Map$toObject = function (a) {
        goog$structs$Map$cleanupKeysArray_(a);
        var b = {};
        for (var c = 0; c < a.C.length; c++) {
            var d = a.C[c];
            b[d] = a.U[d];
        }
        return b;
    };
    goog$structs$Map.prototype.fb = function (a) {
        goog$structs$Map$cleanupKeysArray_(this);
        var b = 0;
        var c = this.C;
        var d = this.U;
        var e = this.Gb;
        var f = this;
        var g = new goog$iter$Iterator();
        g.next = function () {
            while (true) {
                if (e != f.Gb) {
                    throw Error("The map has changed since the iterator was created");
                }
                if (b >= c.length) {
                    throw goog$iter$StopIteration;
                }
                var g = c[b++];
                if (a) {
                    return g;
                } else {
                    return d[g];
                }
            }
        };
        return g;
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
                var g = e.name;
                switch (e.type.toLowerCase()) {
                    case "file":
                    case "submit":
                    case "reset":
                    case "button":
                        break;
                    case "select-multiple":
                        e = goog$dom$forms$getValue(e);
                        if (e != null) {
                            for (var j, o = 0; (j = e[o]); o++) {
                                c(b, g, j);
                            }
                        }
                        break;
                    default:
                        j = goog$dom$forms$getValue(e);
                        if (j != null) {
                            c(b, g, j);
                        }
                }
            }
        }
        d = a.getElementsByTagName("input");
        for (f = 0; (e = d[f]); f++) {
            if (e.form == a && e.type.toLowerCase() == "image") {
                g = e.name;
                c(b, g, e.value);
                c(b, g + ".x", "0");
                c(b, g + ".y", "0");
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
    var goog$dom$forms$getValueByName_isPrivate = function (a) {
        a = a.elements.is_private;
        if (a.type) {
            return goog$dom$forms$getValue(a);
        }
        for (var b = 0; b < a.length; b++) {
            var c = goog$dom$forms$getValue(a[b]);
            if (c) {
                return c;
            }
        }
        return null;
    };
    var goog$i18n$bidi$htmlSkipReg_ = /<[^>]*>|&[^;]+;/g;
    var goog$i18n$bidi$ltrDirCheckRe_ = RegExp("^[^֑-߿יִ-﷿ﹰ-ﻼ]*[A-Za-zÀ-ÖØ-öø-ʸ̀-֐ࠀ-῿Ⰰ-﬜︀-﹯﻽-￿]");
    var goog$i18n$bidi$rtlDirCheckRe_ = RegExp("^[^A-Za-zÀ-ÖØ-öø-ʸ̀-֐ࠀ-῿Ⰰ-﬜︀-﹯﻽-￿]*[֑-߿יִ-﷿ﹰ-ﻼ]");
    var goog$i18n$bidi$isRtlText = function (a, b) {
        return goog$i18n$bidi$rtlDirCheckRe_.test(b ? a.replace(goog$i18n$bidi$htmlSkipReg_, " ") : a);
    };
    var yt$config_ = (window.yt && window.yt.config_) || {};
    goog$exportSymbol("yt.config_", yt$config_);
    var yt$globals_ = (window.yt && window.yt.globals_) || {};
    goog$exportSymbol("yt.globals_", yt$globals_);
    var yt$msgs_ = (window.yt && window.yt.msgs_) || {};
    goog$exportSymbol("yt.msgs_", yt$msgs_);
    var yt$timeouts_ = (window.yt && window.yt.timeouts_) || [];
    goog$exportSymbol("yt.timeouts_", yt$timeouts_);
    var yt$intervals_ = (window.yt && window.yt.intervals_) || [];
    goog$exportSymbol("yt.intervals_", yt$intervals_);
    var yt$setConfig = function (a) {
        yt$setConfigValues_(yt$config_, arguments);
    };
    var yt$getConfig = function (a, b) {
        if (a in yt$config_) {
            return yt$config_[a];
        } else {
            return b;
        }
    };
    var yt$registerGlobal = function (a) {
        for (var b = 0, c = arguments.length; b < c; ++b) {
            yt$globals_[arguments[b]] = 1;
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
    var yt$clearTimeout = function (a) {
        window.clearTimeout(a);
    };
    var yt$clearInterval = function (a) {
        window.clearInterval(a);
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
    var yt$setConfigValues_ = function (a, b) {
        if (b.length > 1) {
            var c = b[0];
            a[c] = b[1];
        } else {
            var d = b[0];
            for (c in d) {
                a[c] = d[c];
            }
        }
    };
    var yt$IS_JSCRIPT_ = !!eval("/*@cc_on!@*/false");
    var yt$analytics$eventTrackers_ = {};
    var yt$analytics$trackEvent = function (a, b, c, d) {
        if (yt$getConfig("EVENTS_TRACKER_INSTALLED")) {
            var e = yt$analytics$eventTrackers_[a];
            if (!e) {
                var f = window._gaq._getAsyncTracker("eventsPageTracker");
                if (!f) {
                    return;
                }
                window._gaq.push(function () {
                    e = f._createEventTracker(a);
                    yt$analytics$eventTrackers_[a] = e;
                });
            }
            var g = c || undefined;
            var j = d || undefined;
            window._gaq.push(function () {
                e._trackEvent(b, g, j);
            });
        }
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
    var yt$dom$datasets$has = function (a, b) {
        if (a.dataset) {
            return yt$dom$datasets$toCamelCase_(b) in a.dataset;
        } else if (a.hasAttribute) {
            return !!a.hasAttribute("data-" + b);
        } else {
            return !!a.getAttribute("data-" + b);
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
            return ++yt$dom$idCounter_;
        };
        goog$exportSymbol("yt.dom.getNextId_", yt$dom$getNextId_);
        var yt$dom$idCounter_ = 0;
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
    var yt$dom$cloneElementWithoutId = function (a) {
        a = yt$dom$cloneNode_(goog$dom$getElement(a));
        a.removeAttribute("id");
        return a;
    };
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
    var yt$dom$setEnabled = function (a, b) {
        if ("disabled" in a) {
            a.disabled = !b;
        }
        if (a.nodeType == 1) {
            goog$dom$classes$enable(a, "disabled", !b);
        }
        if (a.hasChildNodes()) {
            for (var c = 0, d; (d = a.childNodes[c]); ++c) {
                yt$dom$setEnabled(d, b);
            }
        }
    };
    var yt$dom$getEllipsizedHtml = function (a) {
        var b = goog$dom$getElement(a);
        var c = yt$dom$cloneNode_(b);
        a.parentNode.appendChild(c);
        c.style.whiteSpace = "normal";
        c.style.lineHeight = "1.5em";
        var d = yt$dom$datasets$get(b, "original-html");
        if (!d) {
            d = b.innerHTML.replace(/^\s+|\s+$/, "");
            yt$dom$datasets$set(b, "original-html", d);
        }
        var a = /<[^>]+>/g;
        var e = d.match(a) || [];
        var f = d.replace(a, "<wbr>").split("<wbr>");
        var g = function (a) {
            var b = [];
            var c;
            for (c = 0; c < a.length; c++) {
                b.push(a[c]);
                if (e[c]) {
                    b.push(e[c]);
                }
            }
            if (e[c] && e[c].match(/^<\s*\//)) {
                b.push(e[c]);
            }
            b = b.join("");
            if (b.length < d.length) {
                return b + "&hellip;";
            } else {
                return b;
            }
        };
        var j = yt$dom$getSingleLineHeight_(c);
        var a = function (a) {
            c.innerHTML = g(a);
            a = (c.clientHeight || c.offsetHeight) <= j;
            c.innerHTML = "";
            return a;
        };
        for (
            var b = function (a) {
                    var b = [];
                    for (var c = 0, d = f.length; c < d && a > 0; c++) {
                        var e = f[c];
                        b.push(e.substring(0, a));
                        a -= e.length;
                    }
                    return b;
                },
                o = 0,
                x = f.join("").length + 1,
                C = [];
            o < x;
        ) {
            var F = o + Math.round((x - o) / 2);
            var I = b(F);
            if (a(I)) {
                C = I;
                o = F + 1;
            } else {
                x = F - 1;
            }
        }
        goog$dom$removeNode(c);
        return g(C);
    };
    var yt$dom$getSingleLineHeight_ = function (a) {
        var b = a.innerHTML;
        var c = "";
        for (var d = 0; d < 1; d++) {
            c += "&nbsp;<br>";
        }
        a.innerHTML = c;
        c = a.clientHeight || a.offsetHeight;
        a.innerHTML = b;
        return c;
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
            this.Ra = a;
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
    yt$events$Event.prototype.Ra = null;
    yt$events$Event.prototype.clientX = 0;
    yt$events$Event.prototype.clientY = 0;
    yt$events$Event.prototype.pageX = 0;
    yt$events$Event.prototype.pageY = 0;
    yt$events$Event.prototype.touches = null;
    yt$events$Event.prototype.changedTouches = null;
    yt$events$Event.prototype.preventDefault = function () {
        this.Ra.returnValue = false;
        if (this.Ra.preventDefault) {
            this.Ra.preventDefault();
        }
    };
    yt$events$Event.prototype.stopPropagation = function () {
        this.Ra.cancelBubble = true;
        if (this.Ra.stopPropagation) {
            this.Ra.stopPropagation();
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
    var yt$events$listenOnce = function (a, b, c, d) {
        var e;
        e = yt$events$listen(
            a,
            b,
            function () {
                yt$events$unlistenByKey(e);
                c.apply(a, arguments);
            },
            d
        );
    };
    var yt$events$delegateListItemClick = function (a, b) {
        yt$events$delegate(a, "click", b, function (a) {
            return a.nodeName.toLowerCase() === "li" && true;
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
    var yt$events$unlisten = function (a, b, c, d) {
        if ((a = yt$events$findListenerKey_(a, b, c, !!d))) {
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
    var yt$events$getTarget = function (a) {
        a = a || window.event;
        a = a.target || a.srcElement;
        if (a.nodeType == 3) {
            a = a.parentNode;
        }
        return a;
    };
    var yt$events$stopPropagation = function (a) {
        a = a || window.event;
        a.cancelBubble = true;
        if (a.stopPropagation) {
            a.stopPropagation();
        }
    };
    var yt$events$preventDefault = function (a) {
        a = a || window.event;
        a.returnValue = false;
        if (a.preventDefault) {
            a.preventDefault();
        }
        return false;
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
    var goog$net$Cookies = function (a) {
        this.z = a;
    };
    var goog$net$Cookies$SPLIT_RE_ = /\s*;\s*/;
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
        this.z.cookie = a + "=" + b + e + d + c + f;
    };
    goog$net$Cookies.prototype.get = function (a, b) {
        var c = a + "=";
        for (var d = (this.z.cookie || "").split(goog$net$Cookies$SPLIT_RE_), e = 0, f; (f = d[e]); e++) {
            if (f.indexOf(c) == 0) {
                return f.substr(c.length);
            }
        }
        return b;
    };
    goog$net$Cookies.prototype.remove = function (a, b, c) {
        var d = this.zf(a);
        this.set(a, "", 0, b, c);
        return d;
    };
    goog$net$Cookies.prototype.Ve = function () {
        return goog$net$Cookies$getKeyValues_(this).keys;
    };
    goog$net$Cookies.prototype.We = function () {
        return goog$net$Cookies$getKeyValues_(this).gi;
    };
    goog$net$Cookies.prototype.N = function () {
        if (!this.z.cookie) {
            return 0;
        } else {
            return (this.z.cookie || "").split(goog$net$Cookies$SPLIT_RE_).length;
        }
    };
    goog$net$Cookies.prototype.zf = function (a) {
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
            var a = (a.z.cookie || "").split(goog$net$Cookies$SPLIT_RE_), b = [], c = [], d, e, f = 0;
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
            gi: c
        };
    };
    var goog$net$cookies = new goog$net$Cookies(document);
    goog$net$cookies.Hk = 3950;
    var yt$net$cookies$set = function (a, b, c, d, e) {
        goog$net$cookies.set("" + a, b, c, d || "/", e || "youtube.com");
    };
    var yt$net$cookies$get = function (a, b) {
        return goog$net$cookies.get("" + a, b);
    };
    var yt$net$cookies$remove = function (a, b, c) {
        return goog$net$cookies.remove("" + a, b || "/", c || "youtube.com");
    };
    var yt$prefs$UserPrefs = function () {
        var a = yt$net$cookies$get(this.Af);
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
    yt$prefs$UserPrefs.prototype.Af = "PREF";
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
    var yt$prefs$UserPrefs$getFlag = function (a, b) {
        return !!((yt$prefs$UserPrefs$getFlagValue_("f" + (Math.floor(b / 31) + 1)) || 0) & (1 << (b % 31)));
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
        var b = this.Af;
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
    var goog$math$Box = function (a, b, c, d) {
        this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d;
    };
    goog$math$Box.prototype.Qa = function () {
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
    goog$math$Box.prototype.expand = function (a, b, c, d) {
        if (goog$isObject(a)) {
            this.top -= a.top;
            this.right += a.right;
            this.bottom += a.bottom;
            this.left -= a.left;
        } else {
            this.top -= a;
            this.right += b;
            this.bottom += c;
            this.left -= d;
        }
        return this;
    };
    var goog$math$Rect = function (a, b, c, d) {
        this.left = a;
        this.top = b;
        this.width = c;
        this.height = d;
    };
    goog$math$Rect.prototype.Qa = function () {
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
        var d = c.z.body;
        var e = c.z.documentElement;
        var f = !goog$userAgent$WEBKIT && goog$dom$isCss1CompatMode_(c.z) ? c.z.documentElement : c.z.body;
        for (; (a = goog$style$getOffsetParent(a));) {
            if (
                (!goog$userAgent$IE || a.clientWidth != 0) &&
                (!goog$userAgent$WEBKIT || a.clientHeight != 0 || a != d) &&
                a != d &&
                a != e &&
                goog$style$getStyle_(a, "overflow") != "visible"
            ) {
                var g = goog$style$getPageOffset(a);
                var j;
                j = a;
                if (goog$userAgent$GECKO && !goog$userAgent$isVersion("1.9")) {
                    var o = parseFloat(goog$style$getComputedStyle(j, "borderLeftWidth"));
                    if (goog$style$isRightToLeft(j)) {
                        var x =
                            j.offsetWidth -
                            j.clientWidth -
                            o -
                            parseFloat(goog$style$getComputedStyle(j, "borderRightWidth"));
                        var o = o + x;
                    }
                    j = new goog$math$Coordinate(o, parseFloat(goog$style$getComputedStyle(j, "borderTopWidth")));
                } else {
                    j = new goog$math$Coordinate(j.clientLeft, j.clientTop);
                }
                g.x += j.x;
                g.y += j.y;
                b.top = Math.max(b.top, g.y);
                b.right = Math.min(b.right, g.x + a.clientWidth);
                b.bottom = Math.min(b.bottom, g.y + a.clientHeight);
                b.left = Math.max(b.left, g.x);
            }
        }
        d = f.scrollLeft;
        f = f.scrollTop;
        b.left = Math.max(b.left, d);
        b.top = Math.max(b.top, f);
        c = goog$dom$getViewportSize_(c.z.parentWindow || c.z.defaultView || window);
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
        var g;
        b = c ? (c.nodeType == 9 ? c : goog$dom$getOwnerDocument(c)) : document;
        g =
            goog$userAgent$IE &&
            !goog$userAgent$isDocumentMode(9) &&
            !goog$dom$DomHelper$isCss1CompatMode(goog$dom$getDomHelper(b))
                ? b.body
                : b.documentElement;
        if (a == g) {
            return f;
        }
        if (a.getBoundingClientRect) {
            b = goog$style$getBoundingClientRect_(a);
            a = goog$dom$DomHelper$getDocumentScroll(goog$dom$getDomHelper(c));
            f.x = b.left + a.x;
            f.y = b.top + a.y;
        } else if (c.getBoxObjectFor && !e) {
            b = c.getBoxObjectFor(a);
            a = c.getBoxObjectFor(g);
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
            for (b = a; (b = goog$style$getOffsetParent(b)) && b != c.body && b != g;) {
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
            var c = goog$typeOf(a.Bf) == "function";
            var d = a;
            if (a.targetTouches) {
                d = a.targetTouches[0];
            } else if (c && a.Bf().targetTouches) {
                d = a.Bf().targetTouches[0];
            }
            b.x = d.clientX;
            b.y = d.clientY;
        }
        return b;
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
    var goog$style$isRightToLeft = function (a) {
        return goog$style$getStyle_(a, "direction") == "rtl";
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
            a.style.display = b ? "" : "none";
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
    var yt$style$toggleOne_ = function (a) {
        if ((a = goog$dom$getElement(a))) {
            if (yt$style$isDisplayed(a)) {
                a.style.display = "none";
                goog$dom$classes$add(a, "hid");
            } else {
                a.style.display = "";
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
    var yt$style$toggle = function (a) {
        goog$array$forEach(arguments, yt$style$toggleOne_);
    };
    var goog$uri$utils$buildFromEncodedParts = function (a, b, c, d, e, f, g) {
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
        if (g) {
            j.push("#", g);
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
    var goog$uri$utils$getHost = function () {
        var a = goog$uri$utils$split(document.location.href);
        return goog$uri$utils$buildFromEncodedParts(a[1], a[2], a[3], a[4]);
    };
    var goog$uri$utils$getPathAndAfter = function (a) {
        a = goog$uri$utils$split(a);
        return goog$uri$utils$buildFromEncodedParts(null, null, null, null, a[5], a[6], a[7]);
    };
    var goog$uri$utils$buildQueryDataBufferFromMap_ = function (a, b) {
        for (var c in b) {
            var d = c;
            var e = b[c];
            var f = a;
            if (goog$isArray(e)) {
                for (var g = 0; g < e.length; g++) {
                    f.push("&", d);
                    if (e[g] !== "") {
                        f.push("=", goog$string$urlEncode(e[g]));
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
    var yt$uri$buildQueryData = function (a) {
        a = goog$uri$utils$buildQueryDataBufferFromMap_([], a);
        a[0] = "";
        return a.join("");
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
    var yt$uri$getQueryData = function (a) {
        if (a.indexOf("?") != -1) {
            a = (a || "").split("#")[0];
            a = a.split("?", 2);
            return yt$uri$parseQueryData(a.length > 1 ? a[1] : a[0]);
        } else {
            return {};
        }
    };
    var yt$uri$getHashData = function (a) {
        if (a.charAt(0) == "#") {
            a = a.charAt(1) == "!" ? a.substr(2) : a.substr(1);
        }
        return yt$uri$parseQueryData(a);
    };
    var yt$uri$appendQueryData = function (a, b) {
        var c = goog$uri$utils$buildQueryDataBufferFromMap_([a], b);
        if (c[1]) {
            var d = c[0];
            var e = d.indexOf("#");
            if (e >= 0) {
                c.push(d.substr(e));
                c[0] = d = d.substr(0, e);
            }
            e = d.indexOf("?");
            if (e < 0) {
                c[1] = "?";
            } else if (e == d.length - 1) {
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
    var yt$uri$isYouTubeOrGoogleUrl = function (a) {
        a = yt$uri$getDomain(a);
        a = a === null ? null : a.split(".").reverse();
        return (
            (a === null ? false : a[0] == "com" && a[1].match(/^youtube(?:-nocookie)?$/) ? true : false) ||
            (a === null
                ? false
                : a[1] == "google"
                  ? true
                  : a[2] == "google"
                    ? a[0] == "au" && a[1] == "com"
                        ? true
                        : a[0] == "uk" && a[1] == "co"
                          ? true
                          : false
                    : false)
        );
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
        this.Dc = [];
        yt$flash$FlashDetector$detect_(this);
    };
    goog$addSingletonGetter(yt$flash$FlashDetector);
    yt$flash$FlashDetector.prototype.J = 0;
    yt$flash$FlashDetector.prototype.Pa = 0;
    yt$flash$FlashDetector.prototype.rev = 0;
    yt$flash$FlashDetector.prototype.zd = "";
    yt$flash$FlashDetector.prototype.xa = 0;
    yt$flash$FlashDetector.prototype.load = function (a) {
        if (this.xa >= 3) {
            a(this);
        } else {
            this.Dc.push(a);
        }
    };
    yt$flash$FlashDetector.prototype.setVersion = function (a) {
        this.J = a[0];
        this.Pa = a[1];
        this.rev = a[2];
    };
    yt$flash$FlashDetector.prototype.isSupported = function (a, b, c) {
        a = typeof a == "string" ? a.split(".") : [a, b, c];
        a[0] = parseInt(a[0], 10) || 0;
        a[1] = parseInt(a[1], 10) || 0;
        a[2] = parseInt(a[2], 10) || 0;
        return (
            this.J > a[0] ||
            (this.J == a[0] && this.Pa > a[1]) ||
            (this.J == a[0] && this.Pa == a[1] && this.rev >= a[2])
        );
    };
    var yt$flash$FlashDetector$isAs3Capable_ = function (a) {
        if (
            (a.zd.indexOf("Gnash") > -1 && a.zd.indexOf("AVM2") == -1) ||
            (a.J == 9 && a.Pa == 1) ||
            (a.J == 9 && a.Pa == 0 && a.rev == 1)
        ) {
            return false;
        } else {
            return a.J >= 9;
        }
    };
    var yt$flash$FlashDetector$isDeviceSupported_ = function (a) {
        if (navigator.userAgent.indexOf("Sony/COM2") > -1 && !a.isSupported(9, 1, 58)) {
            return false;
        } else {
            return true;
        }
    };
    var yt$flash$FlashDetector$detect_ = function (a) {
        if (a.xa < 3) {
            if (a.xa < 1) {
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
                    for (var f = 0, g = d.length; f < g; f++) {
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
                a.zd = c;
                a.setVersion(b);
                a.xa = 1;
                if (a.J > 0) {
                    yt$flash$FlashDetector$fireCallbacks_(a);
                } else {
                    yt$flash$FlashDetector$detect_(a);
                }
            } else if (a.xa < 2) {
                yt$flash$FlashDetector$detectWithPluginObject_(a);
            } else {
                yt$flash$FlashDetector$fireCallbacks_(a);
            }
        }
    };
    yt$flash$FlashDetector.prototype.Cf = function (a) {
        if (a) {
            a = a.split(" ")[1].split(",");
            a = [parseInt(a[0], 10) || 0, parseInt(a[1], 10) || 0, parseInt(a[2], 10) || 0];
        } else {
            a = [0, 0, 0];
        }
        this.setVersion(a);
        this.xa = 2;
        if (this.J > 0) {
            yt$flash$FlashDetector$fireCallbacks_(this);
        } else {
            yt$flash$FlashDetector$detect_(this);
        }
    };
    var yt$flash$FlashDetector$fireCallbacks_ = function (a) {
        if (a.xa < 3) {
            a.xa = 3;
            for (var b = 0, c = a.Dc.length; b < c; b++) {
                a.Dc[b](a);
            }
            a.Dc = [];
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
                a.Cf("");
            }
        } else {
            d = document.getElementsByTagName("body")[0];
            e = document.createElement("object");
            e.setAttribute("type", "application/x-shockwave-flash");
            b = d.appendChild(e);
        }
        var g = goog$bind(a.Cf, a);
        var j = 0;
        var o = function () {
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
                g(c || "");
            } else {
                j++;
                yt$setTimeout(o, 10);
            }
        };
        yt$setTimeout(o, 0);
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
                    (yt$flash$FlashDetector$isAs3Capable_(c) && b.url) ||
                    (yt$flash$FlashDetector$isDeviceSupported_(c) && b.urlV9As2) ||
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
            } else if (c.J == 0 && b.fallback) {
                b.fallback();
            } else if (c.J == 0 && b.fallbackMessage) {
                b.fallbackMessage();
            } else {
                a.innerHTML = '<div id="flash-upgrade">' + yt$getMsg("FLASH_UPGRADE") + "</div>";
            }
        });
    };
    var yt$flash$update = function (a, b) {
        if (a) {
            if (!(a instanceof yt$player$Config)) {
                a = new yt$player$Config(a);
            }
            var c = !!b;
            var d = goog$dom$getElement(a.attrs.id);
            var e = d ? d.parentNode : null;
            if (!d || !e) {
                yt$setTimeout(function () {
                    yt$flash$update(a);
                }, 50);
            } else {
                if (window != window.top) {
                    var f = null;
                    if (document.referrer) {
                        var g = document.referrer.substring(0, 128);
                        if (!yt$uri$isYouTubeOrGoogleUrl(g)) {
                            f = g;
                        }
                    } else {
                        f = "unknown";
                    }
                    if (f) {
                        c = true;
                        a.args.framer = f;
                    }
                }
                yt$flash$detectVersion_(function (b) {
                    if (b.isSupported(a.minVersion)) {
                        var f = "";
                        if (!(navigator.userAgent.indexOf("Sony/COM2") > -1)) {
                            f = d.src || d.movie;
                        }
                        if (yt$flash$FlashDetector$isAs3Capable_(b)) {
                            if (f != a.url || c) {
                                yt$flash$writeEmbedHtml_(e, a.url, a);
                            }
                        } else if (yt$flash$FlashDetector$isDeviceSupported_(b)) {
                            if (f != a.urlV9As2 || c) {
                                yt$flash$writeEmbedHtml_(e, a.urlV9As2, a);
                            }
                        } else if (f != a.urlV8 || c) {
                            yt$flash$writeEmbedHtml_(e, a.urlV8, a);
                            if ((b = goog$dom$getElement("flash10-promo-div"))) {
                                yt$style$show(b);
                                b = yt$prefs$UserPrefs.getInstance();
                                f = parseInt(b.get("ftuc") || 0, 10) + 1;
                                b.set("ftuc", f);
                                b.save();
                            }
                        }
                    } else if (yt$IS_JSCRIPT_ && b.isSupported(6, 0, 65)) {
                        b = new yt$player$Config({
                            url: "//s.ytimg.com/yt/swf/expressInstall-vflIE9HEf.swf",
                            args: {
                                MMredirectURL: window.location,
                                MMplayerType: "ActiveX",
                                MMdoctitle: document.title
                            }
                        });
                        yt$flash$writeEmbedHtml_(e, b.url, b);
                    } else if (b.J == 0 && a.fallback) {
                        a.fallback();
                    } else if (b.J == 0 && a.fallbackMessage) {
                        a.fallbackMessage();
                    } else {
                        e.innerHTML = '<div id="flash-upgrade">' + yt$getMsg("FLASH_UPGRADE") + "</div>";
                    }
                });
            }
        }
    };
    var yt$flash$detectVersion_ = function (a) {
        yt$flash$FlashDetector.getInstance().load(function (b) {
            var c = yt$prefs$UserPrefs.getInstance();
            c.set("fv", [b.J, b.Pa, b.rev].join("."));
            c.save();
            a(b);
        });
    };
    var goog$Disposable = function () {};
    var goog$pubsub$PubSub = function () {
        this.ea = [];
        this.da = {};
    };
    goog$inherits(goog$pubsub$PubSub, goog$Disposable);
    goog$pubsub$PubSub.prototype.lf = 1;
    goog$pubsub$PubSub.prototype.qc = 0;
    goog$pubsub$PubSub.prototype.gc = function (a, b, c) {
        var d = this.da[a];
        if (!d) {
            d = this.da[a] = [];
        }
        var e = this.lf;
        this.ea[e] = a;
        this.ea[e + 1] = b;
        this.ea[e + 2] = c;
        this.lf = e + 3;
        d.push(e);
        return e;
    };
    goog$pubsub$PubSub.prototype.yd = function (a) {
        if (this.qc != 0) {
            if (!this.pc) {
                this.pc = [];
            }
            this.pc.push(a);
            return false;
        }
        var b = this.ea[a];
        if (b) {
            var c = this.da[b];
            if (c) {
                var d = goog$array$indexOf(c, a);
                if (d >= 0) {
                    goog$array$removeAt(c, d);
                }
            }
            delete this.ea[a];
            delete this.ea[a + 1];
            delete this.ea[a + 2];
        }
        return !!b;
    };
    goog$pubsub$PubSub.prototype.xc = function (a, b) {
        var c = this.da[a];
        if (c) {
            this.qc++;
            var d = goog$array$slice(arguments, 1);
            for (var e = 0, f = c.length; e < f; e++) {
                var g = c[e];
                this.ea[g + 1].apply(this.ea[g + 2], d);
            }
            this.qc--;
            if (this.pc && this.qc == 0) {
                while ((c = this.pc.pop())) {
                    this.yd(c);
                }
            }
            return e != 0;
        }
        return false;
    };
    goog$pubsub$PubSub.prototype.clear = function (a) {
        if (a) {
            var b = this.da[a];
            if (b) {
                goog$array$forEach(b, this.yd, this);
                delete this.da[a];
            }
        } else {
            this.ea.length = 0;
            this.da = {};
        }
    };
    goog$pubsub$PubSub.prototype.N = function (a) {
        if (a) {
            var b = this.da[a];
            if (b) {
                return b.length;
            } else {
                return 0;
            }
        }
        a = 0;
        for (b in this.da) {
            a += this.N(b);
        }
        return a;
    };
    var yt$pubsub$instance_ = goog$getObjectByName("yt.pubsub.instance_") || new goog$pubsub$PubSub();
    goog$pubsub$PubSub.prototype.subscribe = goog$pubsub$PubSub.prototype.gc;
    goog$pubsub$PubSub.prototype.unsubscribeByKey = goog$pubsub$PubSub.prototype.yd;
    goog$pubsub$PubSub.prototype.publish = goog$pubsub$PubSub.prototype.xc;
    goog$pubsub$PubSub.prototype.clear = goog$pubsub$PubSub.prototype.clear;
    goog$exportSymbol("yt.pubsub.instance_", yt$pubsub$instance_);
    var yt$pubsub$subscribe = function (a, b, c) {
        var d = goog$getObjectByName("yt.pubsub.instance_");
        if (d) {
            return d.subscribe(
                a,
                function () {
                    var a = arguments;
                    yt$setTimeout(function () {
                        b.apply(c || goog$global, a);
                    }, 0);
                },
                c
            );
        } else {
            return 0;
        }
    };
    var yt$pubsub$publish = function (a, b) {
        var c = goog$getObjectByName("yt.pubsub.instance_");
        if (c) {
            return c.publish.apply(c, arguments);
        } else {
            return false;
        }
    };
    var yt$history$instance_;
    var yt$history$History = function (a, b, c) {
        this.la = a;
        if (yt$history$History$USE_IFRAME_) {
            this.A = b;
        }
        this.Ya = c || window;
        this.ta = this.Ya.location;
        this.wh = this.ta.href.split("#")[0];
        this.Ge = goog$bind(this.xh, this);
    };
    var yt$history$History$HASHCHANGE_SUPPORTED_ =
        (goog$userAgent$IE && document.documentMode >= 8) ||
        (goog$userAgent$GECKO && goog$userAgent$isVersion("1.9.2")) ||
        (goog$userAgent$WEBKIT && goog$userAgent$isVersion("532.1"));
    var yt$history$History$USE_IFRAME_ = goog$userAgent$IE && !yt$history$History$HASHCHANGE_SUPPORTED_;
    yt$history$History.prototype.Qd = function (a, b) {
        if (this.sd) {
            yt$events$unlistenByKey(this.sd);
            delete this.sd;
        }
        if (this.$a) {
            yt$clearInterval(this.$a);
            delete this.$a;
        }
        if (a) {
            this.ca = yt$history$History$getLocationHash_(this);
            if (yt$history$History$USE_IFRAME_) {
                var c = this.A.contentWindow.document.body;
                if (!c || !c.innerHTML) {
                    yt$history$History$setIframeHash_(this, this.ca);
                }
            }
            if (!b) {
                this.la(this.ca);
            }
            if (yt$history$History$HASHCHANGE_SUPPORTED_) {
                this.sd = yt$events$listen(this.Ya, "hashchange", this.Ge);
            } else {
                this.$a = yt$setInterval(this.Ge, 200);
            }
        }
    };
    yt$history$History.prototype.xh = function () {
        if (yt$history$History$USE_IFRAME_) {
            var a;
            a = (a = this.A.contentWindow.document.body)
                ? decodeURIComponent(a.innerHTML.substring(1).replace(/\+/g, " "))
                : "";
            if (a != this.ca) {
                this.ca = a;
                yt$history$History$setLocationHash_(this, a);
                this.la(a);
            } else {
                a = yt$history$History$getLocationHash_(this);
                if (a != this.ca) {
                    this.ca = a;
                    yt$history$History$setIframeHash_(this, a);
                    this.la(a);
                }
            }
        } else {
            a = yt$history$History$getLocationHash_(this);
            if (a != this.ca) {
                this.ca = a;
                this.la(a);
            }
        }
    };
    var yt$history$History$getLocationHash_ = function (a) {
        var a = a.ta.href;
        var b = a.indexOf("#");
        if (b < 0) {
            return "";
        } else {
            return a.substring(b + 1);
        }
    };
    var yt$history$History$setLocationHash_ = function (a, b) {
        var c = a.wh + "#" + b;
        var d = a.ta.href;
        if (d != c && d + "#" != c) {
            a.ta.href = c;
        }
    };
    var yt$history$History$setIframeHash_ = function (a, b) {
        var c = a.A.contentWindow.document;
        var d = c.body ? c.body.innerHTML : "";
        var e = "#" + goog$string$urlEncode(b);
        if (d != e) {
            d = ["<title>", goog$string$htmlEscape(window.document.title || ""), "</title><body>", e, "</body>"];
            c.open("text/html");
            c.write(d.join(""));
            c.close();
        }
    };
    yt$history$History.prototype.add = function (a, b, c) {
        this.ca = "" + a;
        if (yt$history$History$USE_IFRAME_) {
            yt$history$History$setIframeHash_(this, a);
        }
        yt$history$History$setLocationHash_(this, a);
        if (!c) {
            this.la(this.ca);
        }
    };
    var goog$debug$RelativeTimeProvider = function () {
        this.Ff = goog$now();
    };
    var goog$debug$RelativeTimeProvider$defaultInstance_ = new goog$debug$RelativeTimeProvider();
    goog$debug$RelativeTimeProvider.prototype.set = function (a) {
        this.Ff = a;
    };
    goog$debug$RelativeTimeProvider.prototype.reset = function () {
        this.set(goog$now());
    };
    goog$debug$RelativeTimeProvider.prototype.get = function () {
        return this.Ff;
    };
    var goog$debug$Formatter = function (a) {
        this.Ch = a || "";
        this.Dh = goog$debug$RelativeTimeProvider$defaultInstance_;
    };
    goog$debug$Formatter.prototype.Pe = true;
    goog$debug$Formatter.prototype.Fh = true;
    goog$debug$Formatter.prototype.Eh = true;
    goog$debug$Formatter.prototype.rd = false;
    goog$debug$Formatter.prototype.Gh = false;
    var goog$debug$Formatter$getTwoDigitString_ = function (a) {
        if (a < 10) {
            return "0" + a;
        } else {
            return "" + a;
        }
    };
    var goog$debug$Formatter$getRelativeTime_ = function (a, b) {
        var c = (a.Ne - b) / 1000;
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
            } catch (g) {
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
    goog$debug$LogRecord.prototype.qd = null;
    goog$debug$LogRecord.prototype.pd = null;
    var goog$debug$LogRecord$nextSequenceNumber_ = 0;
    goog$debug$LogRecord.prototype.reset = function (a, b, c, d, e) {
        if (typeof e != "number") {
            goog$debug$LogRecord$nextSequenceNumber_++;
        }
        this.Ne = d || goog$now();
        this.Oa = a;
        this.ai = b;
        this.Me = c;
        delete this.qd;
        delete this.pd;
    };
    goog$debug$LogRecord.prototype.getLevel = function () {
        return this.Oa;
    };
    goog$debug$LogRecord.prototype.Cc = function (a) {
        this.Oa = a;
    };
    goog$debug$LogRecord.prototype.getMessage = function () {
        return this.ai;
    };
    var goog$debug$Logger = function (a) {
        this.ua = a;
    };
    goog$debug$Logger.prototype.Ac = null;
    goog$debug$Logger.prototype.Oa = null;
    goog$debug$Logger.prototype.Pd = null;
    goog$debug$Logger.prototype.Nb = null;
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
        return this.ua;
    };
    goog$debug$Logger.prototype.getParent = function () {
        return this.Ac;
    };
    goog$debug$Logger.prototype.Cc = function (a) {
        this.Oa = a;
    };
    goog$debug$Logger.prototype.getLevel = function () {
        return this.Oa;
    };
    var goog$debug$Logger$getEffectiveLevel = function (a) {
        if (a.Oa) {
            return a.Oa;
        }
        if (a.Ac) {
            return goog$debug$Logger$getEffectiveLevel(a.Ac);
        }
        goog$asserts$fail("Root logger has no level set.");
        return null;
    };
    goog$debug$Logger.prototype.log = function (a, b, c) {
        if (a.value >= goog$debug$Logger$getEffectiveLevel(this).value) {
            a = this.Bi(a, b, c);
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
                if (c.Nb) {
                    for (var e = 0, f = undefined; (f = c.Nb[e]); e++) {
                        f(d);
                    }
                }
                b = b.getParent();
            }
        }
    };
    goog$debug$Logger.prototype.Bi = function (a, b, c) {
        var d = new goog$debug$LogRecord(a, "" + b, this.ua);
        if (c) {
            d.qd = c;
            var e;
            var f = arguments.callee.caller;
            try {
                var g;
                var j = goog$getObjectByName("window.location.href");
                if (goog$isString(c)) {
                    g = {
                        message: c,
                        name: "Unknown error",
                        lineNumber: "Not available",
                        fileName: j,
                        stack: "Not available"
                    };
                } else {
                    var o;
                    var x;
                    var C = false;
                    try {
                        o = c.lineNumber || c.Si || "Not available";
                    } catch (F) {
                        o = "Not available";
                        C = true;
                    }
                    try {
                        x = c.fileName || c.filename || c.sourceURL || j;
                    } catch (I) {
                        x = "Not available";
                        C = true;
                    }
                    g =
                        C || !c.lineNumber || !c.fileName || !c.stack
                            ? {
                                  message: c.message,
                                  name: c.name,
                                  lineNumber: o,
                                  fileName: x,
                                  stack: c.stack || "Not available"
                              }
                            : c;
                }
                e =
                    "Message: " +
                    goog$string$htmlEscape(g.message) +
                    '\nUrl: <a href="view-source:' +
                    g.fileName +
                    '" target="_new">' +
                    g.fileName +
                    "</a>\nLine: " +
                    g.lineNumber +
                    "\n\nBrowser stack:\n" +
                    goog$string$htmlEscape(g.stack + "-> ") +
                    "[end]\n\nJS stack traversal:\n" +
                    goog$string$htmlEscape(goog$debug$getStacktrace(f) + "-> ");
            } catch (ka) {
                e = "Exception trying to expose exception! You win, we lose. " + ka;
            }
            d.pd = e;
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
            goog$debug$LogManager$rootLogger_.Cc(goog$debug$Logger$Level$CONFIG);
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
            if (!c.Pd) {
                c.Pd = {};
            }
            c.Pd[d] = b;
            b.Ac = c;
            goog$debug$LogManager$loggers_[a] = b;
        }
        return b;
    };
    var goog$debug$Console = function () {
        this.Uh = goog$bind(this.Zh, this);
        this.hc = new goog$debug$TextFormatter();
        this.hc.Pe = false;
        this.Ze = this.hc.rd = false;
        this.Oe = "";
        this.qh = {};
    };
    var goog$debug$Console$startCapturing_ = function () {
        var a = goog$debug$Console$instance;
        if (true != a.Ze) {
            goog$debug$LogManager$initialize();
            var b = goog$debug$LogManager$rootLogger_;
            var c = a.Uh;
            if (!b.Nb) {
                b.Nb = [];
            }
            b.Nb.push(c);
            a.Ze = true;
        }
    };
    goog$debug$Console.prototype.Zh = function (a) {
        if (!this.qh[a.Me]) {
            var b;
            b = this.hc;
            var c = [];
            c.push(b.Ch, " ");
            if (b.Pe) {
                var d = new Date(a.Ne);
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
            if (b.Fh) {
                c.push("[", goog$debug$Formatter$getRelativeTime_(a, b.Dh.get()), "s] ");
            }
            if (b.Eh) {
                c.push("[", a.Me, "] ");
            }
            if (b.Gh) {
                c.push("[", a.getLevel().name, "] ");
            }
            c.push(a.getMessage(), "\n");
            if (b.rd && a.qd) {
                c.push(a.pd, "\n");
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
                this.Oe += b;
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
    var yt$history$StateMonitor$logger_ = null;
    var yt$history$StateMonitor$log_ = function (a) {
        if (!yt$history$StateMonitor$logger_) {
            goog$debug$Console$autoInstall();
            goog$debug$Console$startCapturing_();
            goog$debug$Console$instance.hc.rd = true;
            yt$history$StateMonitor$logger_ = goog$debug$LogManager$getLogger("yt.debug");
            yt$history$StateMonitor$logger_.Cc(goog$debug$Logger$Level$INFO);
        }
        yt$history$StateMonitor$logger_.log(goog$debug$Logger$Level$INFO, "yt.history.StateMonitor: " + a, undefined);
    };
    var yt$history$StateMonitor = function (a, b) {
        this.la = a;
        this.Ya = b || window;
        this.ta = this.Ya.location;
        this.zh = goog$bind(this.Wh, this);
    };
    var yt$history$StateMonitor$SUPPORTED_ =
        !!window.history.pushState &&
        (!goog$userAgent$WEBKIT || (goog$userAgent$WEBKIT && goog$userAgent$isVersion("534.11")));
    yt$history$StateMonitor.prototype.Qd = function (a, b) {
        yt$history$StateMonitor$log_("setEnabled " + a);
        if (this.vd) {
            yt$events$unlistenByKey(this.vd);
            delete this.vd;
        }
        if (this.$a) {
            yt$clearInterval(this.$a);
            delete this.$a;
        }
        if (!a || !yt$history$StateMonitor$SUPPORTED_) {
            yt$history$StateMonitor$log_("disabling (supported = " + yt$history$StateMonitor$SUPPORTED_ + ")");
        } else {
            yt$history$StateMonitor$log_("enabling");
            this.jc = this.ta.href;
            if (!b) {
                this.la(this.jc);
            }
            this.vd = yt$events$listen(this.Ya, "popstate", this.zh);
        }
    };
    yt$history$StateMonitor.prototype.Wh = function (a) {
        var b = this.ta.href;
        var a = a.state;
        yt$history$StateMonitor$log_("handlePopState_ " + b + " " + a);
        if (a || b != this.jc) {
            yt$history$StateMonitor$log_("handlePopState_ navCallback");
            this.jc = b;
            this.la(b, a);
        }
    };
    yt$history$StateMonitor.prototype.add = function (a, b, c) {
        if (a || b) {
            a = a || this.ta.href;
            this.Ya.history.pushState(b, "", a);
            this.jc = a;
            if (!c) {
                this.la(a, b);
            }
        }
    };
    var yt$history$getInstance = function (a) {
        var a = a || "hash";
        var b = goog$getObjectByName("yt.history.instance_");
        if (!b) {
            if (a == "state") {
                b = new yt$history$StateMonitor(yt$history$publishNavigate_);
                yt$history$StateMonitor.prototype.setEnabled = yt$history$StateMonitor.prototype.Qd;
                yt$history$StateMonitor.prototype.add = yt$history$StateMonitor.prototype.add;
            } else {
                b = new yt$history$History(yt$history$publishNavigate_, goog$dom$getElement("legacy-history-iframe"));
                yt$history$History.prototype.setEnabled = yt$history$History.prototype.Qd;
                yt$history$History.prototype.add = yt$history$History.prototype.add;
            }
            yt$history$instance_ = b;
            goog$exportSymbol("yt.history.instance_", yt$history$instance_);
        }
        return b;
    };
    var yt$history$publishNavigate_ = function (a, b) {
        yt$pubsub$publish("navigate", a, b);
    };
    var yt$net$apiloader$API_URLS_ = {
        GOOGLE_IMA: "//www.google.com/jsapi",
        GOOGLE_MAPS_API: "//maps.google.com/maps/api/js?sensor=false",
        GOOGLE_LANGUAGE_API_VIRTUAL_KEYBOARD: "//www.google.com/jsapi?key=youtube-internal-vk",
        GOOGLE_LANGUAGE_API_INPUT_TOOLS: "//www.google.com/jsapi?key=youtube-internal-it"
    };
    var yt$net$apiloader$requested_ = {};
    var yt$net$apiloader$loaded_ = {};
    var yt$net$apiloader$callbacks_ = {};
    var yt$net$apiloader$exportLoadedCallback_ = function (a) {
        goog$exportSymbol("yt.net.apiloader.onApiLoaded_" + a, function () {
            yt$net$apiloader$onApiLoaded_(a);
        });
    };
    var yt$net$apiloader$onApiLoaded_ = function (a) {
        yt$net$apiloader$loaded_[a] = true;
        goog$array$forEach(yt$net$apiloader$callbacks_[a], function (a) {
            a.call();
        });
        delete yt$net$apiloader$callbacks_[a];
    };
    var yt$net$apiloader$load = function (a, b) {
        var c = yt$net$apiloader$API_URLS_[a];
        if (c) {
            if (yt$net$apiloader$loaded_[a]) {
                b.call();
            } else {
                if (!yt$net$apiloader$callbacks_[a]) {
                    yt$net$apiloader$callbacks_[a] = [];
                }
                yt$net$apiloader$callbacks_[a].push(b);
                if (!yt$net$apiloader$requested_[a]) {
                    yt$net$apiloader$exportLoadedCallback_(a);
                    var c = yt$uri$appendQueryData(c, {
                        callback: "yt.net.apiloader.onApiLoaded_" + a
                    });
                    var d = document.createElement("script");
                    d.src = c;
                    document.body.appendChild(d);
                    yt$net$apiloader$requested_[a] = true;
                }
            }
        }
    };
    var yt$i18n$inputtools$inputTools_;
    var yt$i18n$inputtools$elements_;
    var yt$i18n$inputtools$controller_ = null;
    var yt$i18n$inputtools$loading_ = false;
    var yt$i18n$inputtools$language_ = "";
    var yt$i18n$virtualkeyboard$keyboard_;
    var yt$i18n$virtualkeyboard$layout_;
    var yt$i18n$virtualkeyboard$loading_ = false;
    var yt$i18n$virtualkeyboard$language_ = "";
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
    var goog$json$Serializer = function (a) {
        this.Fc = a;
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
                    var e = "";
                    for (var f = 0; f < d; f++) {
                        c.push(e);
                        e = b[f];
                        goog$json$Serializer$serialize_(a, a.Fc ? a.Fc.call(b, "" + f, e) : e, c);
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
                            goog$json$Serializer$serialize_(a, a.Fc ? a.Fc.call(b, f, e) : e, c);
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
    var yt$net$ajax$createXhr_ = null;
    if (typeof XMLHttpRequest != "undefined") {
        yt$net$ajax$createXhr_ = function () {
            return new XMLHttpRequest();
        };
    } else if (typeof ActiveXObject != "undefined") {
        yt$net$ajax$createXhr_ = function () {
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
    var yt$net$ajax$send_ = function (a, b, c, d, e) {
        var f = yt$net$ajax$createXhr_ && yt$net$ajax$createXhr_();
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
                for (var g in e) {
                    f.setRequestHeader(g, e[g]);
                    if (g.toLowerCase() == "content-type") {
                        a = false;
                    }
                }
            }
            if (a) {
                f.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }
            f.send(d);
            return f;
        }
    };
    var yt$net$ajax$send = function (a, b) {
        var c = b.format || "JSON";
        if (b.kb) {
            a = document.location.protocol + "//" + document.location.hostname + a;
        }
        var d = b.g;
        if (d) {
            a = yt$uri$setQueryData(a, d);
        }
        var e = b.za || "";
        if ((d = b.n)) {
            e = yt$uri$parseQueryData(e);
            goog$object$extend(e, d);
            e = yt$uri$buildQueryData(e);
        }
        yt$net$ajax$send_(
            a,
            function (a) {
                var d = yt$net$ajax$isSuccess_(a);
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
                var o = b.j || goog$global;
                if (d) {
                    if (b.f) {
                        b.f.call(o, a, e);
                    }
                } else if (b.B) {
                    b.B.call(o, a, e);
                }
                if (b.ga) {
                    b.ga.call(o, a, e);
                }
            },
            b.method,
            e,
            b.headers
        );
    };
    var yt$net$ajax$sendForm = function (a, b) {
        var c = b || {};
        c.method = a.method.toUpperCase();
        if (c.method == "POST") {
            c.za = goog$dom$forms$getFormDataString(a);
        } else {
            var d = goog$structs$Map$toObject(goog$dom$forms$getFormDataMap(a));
            var e = c.g || {};
            goog$object$extend(e, d);
            c.g = e;
        }
        yt$net$ajax$send(a.action, c);
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
    var yt$net$ajax$sendRequest = function (a, b) {
        var c = b.onComplete || null;
        var d = b.onException || null;
        var e = b.onError || null;
        var f = b.update || null;
        var g = b.json || false;
        return yt$net$ajax$send_(
            a,
            function (a) {
                if (yt$net$ajax$isSuccess_(a)) {
                    var b = a.responseXML;
                    var x = b ? yt$net$ajax$getRootNode(b) : null;
                    var b = !!b && !!x;
                    var C;
                    var F;
                    if (
                        b &&
                        ((C = yt$net$ajax$getNodeValue(x, "return_code")),
                        (F = yt$net$ajax$getNodeValue(x, "html_content")),
                        C == 0)
                    ) {
                        if (f && F) {
                            goog$dom$getElement(f).innerHTML = F;
                        }
                        var I = yt$net$ajax$getNodeValue(x, "js_content");
                        if (I) {
                            var ka = document.createElement("script");
                            ka.text = I;
                            document.getElementsByTagName("head")[0].appendChild(ka);
                        }
                    }
                    if (c) {
                        if (b) {
                            b = yt$net$ajax$getNodeValue(x, "redirect_on_success");
                            if (C && b) {
                                window.location = b;
                            } else {
                                if ((x = yt$net$ajax$getNodeValue(x, C == 0 ? "success_message" : "error_message"))) {
                                    alert(x);
                                }
                                a = g ? eval("(" + F + ")") : a;
                                if (C == 0) {
                                    c(a);
                                } else if (d) {
                                    d(a);
                                }
                            }
                        } else if (a.responseText) {
                            c(a);
                        }
                    }
                } else if (e) {
                    e(a);
                }
            },
            b.method || "POST",
            b.postBody || null,
            b.headers || null
        );
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
    var yt$net$ajax$getNodeValue = function (a, b) {
        if (!a) {
            return null;
        }
        var c = a.getElementsByTagName(b);
        if (c && c.length > 0) {
            return yt$net$ajax$getTextContent_(c[0]);
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
    var yt$net$ajax$setToken = function (a, b) {
        yt$net$ajax$tokenMap_[a] = b;
    };
    var yt$net$delayed$registry_ = {};
    var yt$net$delayed$loaded_ = {};
    var yt$net$delayed$register = function (a, b, c) {
        a = goog$dom$getElement(a);
        c = c || goog$getUid(a);
        if (!(c in yt$net$delayed$registry_)) {
            yt$net$delayed$registry_[c] = [];
        }
        yt$net$delayed$registry_[c].push([a, b]);
        yt$net$delayed$loaded_[c] = false;
        return c;
    };
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
    var yt$net$scriptloader$load = function (a, b, c) {
        var d = "scriptload-" + goog$string$hashCode(a);
        var e = document.getElementById(d);
        var f = e && yt$dom$datasets$get(e, "loaded");
        var g = e && !f;
        if (f && !c) {
            if (b) {
                b();
            }
            return e;
        }
        if (g && !c) {
            if (b) {
                yt$pubsub$subscribe(d, b);
            }
            return e;
        }
        if (e) {
            d =
                "scriptload-" +
                (Math.floor(Math.random() * 2147483648).toString(36) +
                    Math.abs(Math.floor(Math.random() * 2147483648) ^ goog$now()).toString(36));
        }
        if (b) {
            yt$pubsub$subscribe(d, b);
        }
        var j = yt$net$scriptloader$createScript_(a, d, function () {
            if (!yt$dom$datasets$get(j, "loaded")) {
                yt$dom$datasets$set(j, "loaded", "true");
                yt$pubsub$publish(d);
                var a = d;
                var b = goog$getObjectByName("yt.pubsub.instance_");
                if (b) {
                    b.clear(a);
                }
            }
        });
        return j;
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
    var yt$tracking$track = function (a, b, c) {
        yt$analytics$trackEvent(a, b || "null");
        a = "a=" + a + (b ? "&" + b : "").replace(/\//g, "&");
        yt$net$ping$send("/gen_204?" + a, c);
    };
    var yt$tracking$share = function (a, b, c, d) {
        a = yt$uri$appendQueryData("/sharing_services", {
            name: a,
            v: b,
            locale: c,
            feature: d
        });
        yt$net$ping$send(a);
    };
    var goog$positioning$positionAtAnchor = function (a, b, c, d, e, f, g) {
        var j;
        var o = c.offsetParent;
        if (o) {
            var x = o.tagName == "HTML" || o.tagName == "BODY";
            if (!x || goog$style$getStyle_(o, "position") != "static") {
                j = goog$style$getPageOffset(o);
                if (!x) {
                    j = goog$math$Coordinate$difference(j, new goog$math$Coordinate(o.scrollLeft, o.scrollTop));
                }
            }
        }
        o = goog$style$getBounds(a);
        if ((x = goog$style$getVisibleRectForElement(a))) {
            var C = new goog$math$Rect(x.left, x.top, x.right - x.left, x.bottom - x.top);
            var x = Math.max(o.left, C.left);
            var F = Math.min(o.left + o.width, C.left + C.width);
            if (x <= F) {
                var I = Math.max(o.top, C.top);
                var C = Math.min(o.top + o.height, C.top + C.height);
                if (I <= C) {
                    o.left = x;
                    o.top = I;
                    o.width = F - x;
                    o.height = C - I;
                }
            }
        }
        x = goog$dom$getDomHelper(a);
        I = goog$dom$getDomHelper(c);
        if (x.z != I.z) {
            var F = x.z.body;
            var I = I.z.parentWindow || I.z.defaultView;
            var C = new goog$math$Coordinate(0, 0);
            var ka = goog$dom$getOwnerDocument(F)
                ? goog$dom$getOwnerDocument(F).parentWindow || goog$dom$getOwnerDocument(F).defaultView
                : window;
            var Bf = F;
            do {
                var qi = ka == I ? goog$style$getPageOffset(Bf) : goog$style$getClientPosition(Bf);
                C.x += qi.x;
                C.y += qi.y;
            } while (ka && ka != I && (Bf = ka.frameElement) && (ka = ka.parent));
            F = goog$math$Coordinate$difference(C, goog$style$getPageOffset(F));
            if (goog$userAgent$IE && !goog$dom$DomHelper$isCss1CompatMode(x)) {
                F = goog$math$Coordinate$difference(F, goog$dom$DomHelper$getDocumentScroll(x));
            }
            o.left += F.x;
            o.top += F.y;
        }
        a = (b & 4 && goog$style$isRightToLeft(a) ? b ^ 2 : b) & -5;
        b = new goog$math$Coordinate(a & 2 ? o.left + o.width : o.left, a & 1 ? o.top + o.height : o.top);
        if (j) {
            b = goog$math$Coordinate$difference(b, j);
        }
        if (e) {
            b.x += (a & 2 ? -1 : 1) * e.x;
            b.y += (a & 1 ? -1 : 1) * e.y;
        }
        var Ya;
        if (g && (Ya = goog$style$getVisibleRectForElement(c)) && j) {
            Ya.top -= j.y;
            Ya.right -= j.x;
            Ya.bottom -= j.y;
            Ya.left -= j.x;
        }
        return goog$positioning$positionAtCoordinate(b, c, d, f, Ya, g, undefined);
    };
    var goog$positioning$positionAtCoordinate = function (a, b, c, d, e, f, g) {
        var a = a.Qa();
        var j = 0;
        var o = (c & 4 && goog$style$isRightToLeft(b) ? c ^ 2 : c) & -5;
        var c = goog$style$getSize(b);
        var g = g ? g.Qa() : c.Qa();
        if (d || o != 0) {
            if (o & 2) {
                a.x -= g.width + (d ? d.right : 0);
            } else if (d) {
                a.x += d.left;
            }
            if (o & 1) {
                a.y -= g.height + (d ? d.bottom : 0);
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
                if (j.x < e.left && j.x + g.width > e.right && f & 16) {
                    g.width = Math.max(g.width - (j.x + g.width - e.right), 0);
                    d |= 4;
                }
                if (j.x + g.width > e.right && f & 1) {
                    j.x = Math.max(e.right - g.width, e.left);
                    d |= 1;
                }
                if (f & 2) {
                    d |= (j.x < e.left ? 16 : 0) | (j.x + g.width > e.right ? 32 : 0);
                }
                if (j.y < e.top && f & 4) {
                    j.y = e.top;
                    d |= 2;
                }
                if (j.y >= e.top && j.y + g.height > e.bottom && f & 32) {
                    g.height = Math.max(g.height - (j.y + g.height - e.bottom), 0);
                    d |= 8;
                }
                if (j.y + g.height > e.bottom && f & 4) {
                    j.y = Math.max(e.bottom - g.height, e.top);
                    d |= 2;
                }
                if (f & 8) {
                    d |= (j.y < e.top ? 64 : 0) | (j.y + g.height > e.bottom ? 128 : 0);
                }
                j = d;
            } else {
                j = 256;
            }
            if (j & 496) {
                return j;
            }
        }
        f = a;
        e =
            goog$userAgent$GECKO &&
            (goog$userAgent$detectedMac_ || goog$userAgent$detectedX11_) &&
            goog$userAgent$isVersion("1.9");
        if (f instanceof goog$math$Coordinate) {
            a = f.x;
            f = f.y;
        } else {
            a = f;
            f = undefined;
        }
        b.style.left = goog$style$getPixelStyleValue_(a, e);
        b.style.top = goog$style$getPixelStyleValue_(f, e);
        if (c != g && !(!c || !g ? 0 : c.width == g.width && c.height == g.height)) {
            a = goog$dom$DomHelper$isCss1CompatMode(goog$dom$getDomHelper(goog$dom$getOwnerDocument(b)));
            if (goog$userAgent$IE && (!a || !goog$userAgent$isVersion("8"))) {
                c = b.style;
                if (a) {
                    if (goog$userAgent$IE) {
                        a = goog$style$getIePixelValue_(b, goog$style$getCascadedStyle(b, "paddingLeft"));
                        e = goog$style$getIePixelValue_(b, goog$style$getCascadedStyle(b, "paddingRight"));
                        f = goog$style$getIePixelValue_(b, goog$style$getCascadedStyle(b, "paddingTop"));
                        d = goog$style$getIePixelValue_(b, goog$style$getCascadedStyle(b, "paddingBottom"));
                        a = new goog$math$Box(f, e, d, a);
                    } else {
                        a = goog$style$getComputedStyle(b, "paddingLeft");
                        e = goog$style$getComputedStyle(b, "paddingRight");
                        f = goog$style$getComputedStyle(b, "paddingTop");
                        d = goog$style$getComputedStyle(b, "paddingBottom");
                        a = new goog$math$Box(parseFloat(f), parseFloat(e), parseFloat(d), parseFloat(a));
                    }
                    if (goog$userAgent$IE) {
                        e = goog$style$getIePixelBorder_(b, "borderLeft");
                        f = goog$style$getIePixelBorder_(b, "borderRight");
                        d = goog$style$getIePixelBorder_(b, "borderTop");
                        b = goog$style$getIePixelBorder_(b, "borderBottom");
                        b = new goog$math$Box(d, f, b, e);
                    } else {
                        e = goog$style$getComputedStyle(b, "borderLeftWidth");
                        f = goog$style$getComputedStyle(b, "borderRightWidth");
                        d = goog$style$getComputedStyle(b, "borderTopWidth");
                        b = goog$style$getComputedStyle(b, "borderBottomWidth");
                        b = new goog$math$Box(parseFloat(d), parseFloat(f), parseFloat(b), parseFloat(e));
                    }
                    c.pixelWidth = g.width - b.left - a.left - a.right - b.right;
                    c.pixelHeight = g.height - b.top - a.top - a.bottom - b.bottom;
                } else {
                    c.pixelWidth = g.width;
                    c.pixelHeight = g.height;
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
                b.width = Math.max(g.width, 0) + "px";
                b.height = Math.max(g.height, 0) + "px";
            }
        }
        return j;
    };
    var yt$uix$eventPubSubs_ = {};
    var yt$uix$TOUCH_SUPPORTED_ = "ontouchstart" in document;
    var yt$uix$registerHandler_ = function (a, b, c, d, e) {
        if (!(b in yt$uix$eventPubSubs_)) {
            yt$uix$eventPubSubs_[b] = new goog$pubsub$PubSub();
            yt$uix$eventPubSubs_[b].maxNumParents = {};
            yt$uix$eventPubSubs_[b].checkRelatedTarget = {};
        }
        b = yt$uix$eventPubSubs_[b];
        b.gc(a, c);
        b.maxNumParents[a] = d;
        b.checkRelatedTarget[a] = e;
    };
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
            for (c in b.da) {
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
                        b.xc(c, e, a.type, a);
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
        if (!(b in yt$uix$widgets_) && a.Kd()) {
            a.M();
            yt$uix$widgets_[b] = a;
        }
    };
    var yt$uix$BaseWidget = function () {
        this.L = {};
    };
    yt$uix$BaseWidget.prototype.Ld = !!eval("/*@cc_on!@*/false");
    yt$uix$BaseWidget.prototype.Kd = function () {
        return true;
    };
    yt$uix$BaseWidget.prototype.addBehavior = function (a, b, c, d, e) {
        var c = yt$uix$BaseWidget$getCssClass(this, c);
        var f = goog$bind(b, this);
        yt$uix$registerHandler_(c, a, f, d, e);
        this.L[b] = f;
    };
    yt$uix$BaseWidget.prototype.wa = function (a, b, c) {
        var d = this.getData(a, b);
        if (d && (d = goog$getObjectByName(d))) {
            var e = goog$array$slice(arguments, 2);
            goog$array$splice(e, 0, 0, a);
            d.apply(null, e);
        }
    };
    yt$uix$BaseWidget.prototype.getData = function (a, b) {
        return yt$dom$datasets$get(a, b);
    };
    yt$uix$BaseWidget.prototype.setData = function (a, b, c) {
        yt$dom$datasets$set(a, b, c);
    };
    var yt$uix$BaseWidget$findWidgetElement_ = function (a, b) {
        return yt$dom$getAncestorByClass(b, yt$uix$BaseWidget$getCssClass(a));
    };
    var yt$uix$BaseWidget$getCssClass = function (a, b) {
        return "yt-uix" + (a.K ? "-" + a.K : "") + (b ? "-" + b : "");
    };
    var yt$uix$Button = function () {
        this.L = {};
    };
    goog$inherits(yt$uix$Button, yt$uix$BaseWidget);
    goog$addSingletonGetter(yt$uix$Button);
    yt$uix$Button.prototype.K = "button";
    yt$uix$Button.prototype.M = function () {
        this.addBehavior("click", this.ma);
        this.addBehavior("keydown", this.oc);
        this.addBehavior("keypress", this.Id);
    };
    yt$uix$Button.prototype.ma = function (a) {
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
                yt$uix$Button$toggleMenu_(this, a);
                a.focus();
            }
            this.wa(a, "button-action");
        }
    };
    yt$uix$Button.prototype.oc = function (a, b, c) {
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
                    e = this.Hi;
                } else if (d == "table") {
                    e = this.Gi;
                }
                if (e) {
                    yt$uix$Button$handleMenuKeyDown_(this, a, b, c, goog$bind(e, this));
                }
            }
        }
    };
    var yt$uix$Button$handleMenuKeyDown_ = function (a, b, c, d, e) {
        var f = yt$style$isDisplayed(c);
        var g = d.keyCode == 9;
        if (g || d.keyCode == 32 || d.keyCode == 13) {
            if ((d = yt$uix$Button$clearMenuHighlight_(a, c))) {
                b = goog$dom$getFirstElementChild(d);
                if (b.tagName.toLowerCase() == "a") {
                    window.location = b.href;
                } else {
                    yt$events$simulateClick(b);
                }
            } else if (g) {
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
    yt$uix$Button.prototype.Id = function (a, b, c) {
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
    yt$uix$Button.prototype.Gi = function (a, b, c) {
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
    yt$uix$Button.prototype.Hi = function (a, b, c) {
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
    var yt$uix$Button$toggleMenu_ = function (a, b) {
        var c = yt$uix$Button$getMenu_(a, b);
        var d = yt$uix$Button$getMenuButton_(a, c);
        if (d && d != b) {
            yt$uix$Button$hideMenu_(a, d);
            yt$setTimeout(goog$bind(a.Rd, a, b), 1);
        } else if (yt$style$isDisplayed(c)) {
            yt$uix$Button$hideMenu_(a, b);
        } else {
            a.Rd(b);
        }
    };
    yt$uix$Button.prototype.Kb = function (a) {
        if (
            !goog$userAgent$detectedWindows_ ||
            !goog$dom$classes$has(a, yt$uix$BaseWidget$getCssClass(this, "masked"))
        ) {
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
    var yt$uix$Button$positionMenu_ = function (a, b, c) {
        var d = yt$dom$getAncestorByClass(b, yt$uix$BaseWidget$getCssClass(a, "group"));
        var e = !!a.getData(b, "button-menu-ignore-group");
        var d = d && !e ? d : b;
        var e = 5;
        var f = 4;
        if (goog$dom$classes$has(b, yt$uix$BaseWidget$getCssClass(a, "reverse"))) {
            e = 4;
            f = 5;
        }
        if (goog$dom$classes$has(b, "flip")) {
            if (goog$dom$classes$has(b, yt$uix$BaseWidget$getCssClass(a, "reverse"))) {
                e = 6;
                f = 7;
            } else {
                e = 7;
                f = 6;
            }
        }
        var g;
        if (a.getData(b, "button-has-sibling-menu")) {
            var j = goog$style$getOffsetParent(d);
            if (goog$userAgent$IE && !goog$userAgent$isVersion("8")) {
                j = null;
            }
            if (j) {
                g = goog$style$getBounds(j);
                g = new goog$math$Box(-g.top, g.left, g.top, -g.left);
            }
        }
        j = new goog$math$Coordinate(0, 1);
        if ((a = a.Kb(b))) {
            b = goog$style$getSize(c);
            a.style.width = b.width + "px";
            a.style.height = b.height + "px";
            goog$positioning$positionAtAnchor(d, e, a, f, j, g);
        }
        goog$positioning$positionAtAnchor(d, e, c, f, j, g);
    };
    yt$uix$Button.prototype.Rd = function (a) {
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
                if ((d = this.Kb(a))) {
                    document.body.appendChild(d);
                }
                yt$uix$Button$positionMenu_(this, a, b);
                yt$style$show(b);
                this.wa(a, "button-menu-action", true);
                goog$dom$classes$add(a, yt$uix$BaseWidget$getCssClass(this, "active"));
                if (c) {
                    goog$dom$classes$add(c, yt$uix$BaseWidget$getCssClass(this, "group-active"));
                }
                c = goog$bind(this.ki, this, a);
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
                a.wa(b, "button-menu-action", false);
                var d = a.Kb(b);
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
    yt$uix$Button.prototype.getContent = function (a) {
        return goog$dom$getElementByClass(yt$uix$BaseWidget$getCssClass(this, "content"), a);
    };
    var yt$uix$Button$getMenuButton_ = function (a, b) {
        return yt$dom$getAncestorByClass(b.activeButtonNode || b.parentNode, yt$uix$BaseWidget$getCssClass(a));
    };
    yt$uix$Button.prototype.ki = function (a, b) {
        var c = yt$events$getTarget(b);
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
                e = goog$dom$getElementByClass(yt$uix$BaseWidget$getCssClass(this, "content"), a);
                goog$dom$setTextContent(e, goog$dom$getTextContent(c));
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
    var yt$uix$Expander = function () {
        this.L = {};
    };
    goog$inherits(yt$uix$Expander, yt$uix$BaseWidget);
    goog$addSingletonGetter(yt$uix$Expander);
    yt$uix$Expander.prototype.K = "expander";
    yt$uix$Expander.prototype.M = function () {
        this.addBehavior("click", this.ma, "head");
        this.addBehavior("keypress", this.Id, "head");
    };
    yt$uix$Expander.prototype.ma = function (a) {
        yt$uix$Expander$toggle_(this, a);
    };
    yt$uix$Expander.prototype.Id = function (a, b, c) {
        if (c && c.keyCode == 13) {
            yt$uix$Expander$toggle_(this, a);
        }
    };
    var yt$uix$Expander$toggle_ = function (a, b) {
        var c = yt$uix$BaseWidget$findWidgetElement_(a, b);
        if (c) {
            goog$dom$classes$toggle(c, yt$uix$BaseWidget$getCssClass(a, "collapsed"));
            a.wa(c, "expander-action");
        }
    };
    yt$uix$Expander.prototype.collapse = function (a) {
        if ((a = yt$uix$BaseWidget$findWidgetElement_(this, a))) {
            goog$dom$classes$add(a, yt$uix$BaseWidget$getCssClass(this, "collapsed"));
            this.wa(a, "expander-action");
        }
    };
    yt$uix$Expander.prototype.expand = function (a) {
        if ((a = yt$uix$BaseWidget$findWidgetElement_(this, a))) {
            goog$dom$classes$remove(a, yt$uix$BaseWidget$getCssClass(this, "collapsed"));
            this.wa(a, "expander-action");
        }
    };
    yt$uix$Expander.prototype.Ma = function (a) {
        return goog$dom$getElementByClass(yt$uix$BaseWidget$getCssClass(this, "body"), a);
    };
    if (goog$userAgent$IE) {
        goog$userAgent$isDocumentMode(9);
    }
    if (goog$userAgent$IE) {
        goog$userAgent$isDocumentMode(9);
    }
    if (goog$userAgent$IE) {
        goog$userAgent$isVersion("8");
    }
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
    var goog$Timer$defaultTimerObject = goog$global.window;
    var goog$Timer$callOnce = function (a, b) {
        if (goog$typeOf(a) == "function") {
            if (b) {
                a = goog$bind(a, b);
            }
        } else if (a && typeof a.handleEvent == "function") {
            a = goog$bind(a.handleEvent, a);
        } else {
            throw Error("Invalid listener argument");
        }
        goog$Timer$defaultTimerObject.setTimeout(a, 200);
    };
    var yt$uix$Tooltip = function () {
        this.L = {};
    };
    goog$inherits(yt$uix$Tooltip, yt$uix$BaseWidget);
    goog$addSingletonGetter(yt$uix$Tooltip);
    yt$uix$Tooltip.prototype.K = "tooltip";
    yt$uix$Tooltip.prototype.yc = 0;
    yt$uix$Tooltip.prototype.M = function () {
        this.addBehavior("mouseover", this.cb);
        this.addBehavior("mouseout", this.Lb);
        this.addBehavior("click", this.Lb);
        this.addBehavior("touchstart", this.Cd);
        this.addBehavior("touchend", this.tc);
        this.addBehavior("touchcancel", this.tc);
    };
    yt$uix$Tooltip.prototype.Kd = function () {
        return !this.Ld || goog$userAgent$VERSION.indexOf("6") != 0;
    };
    yt$uix$Tooltip.prototype.cb = function (a) {
        if (!this.yc || !(goog$now() - this.yc < 1000)) {
            var b = parseInt(this.getData(a, "tooltip-hide-timer"), 10);
            if (b) {
                yt$dom$datasets$remove(a, "tooltip-hide-timer");
                yt$clearTimeout(b);
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
    yt$uix$Tooltip.prototype.Lb = function (a) {
        var b = parseInt(this.getData(a, "tooltip-show-timer"), 10);
        if (b) {
            yt$clearTimeout(b);
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
    yt$uix$Tooltip.prototype.Cd = function (a, b, c) {
        this.yc = 0;
        this.cb(
            yt$uix$findAncestorWithClass_(
                yt$uix$BaseWidget$getCssClass(this),
                c.changedTouches[0].target,
                yt$uix$getMaxNumParents_(b, yt$uix$BaseWidget$getCssClass(this))
            ),
            b
        );
    };
    yt$uix$Tooltip.prototype.tc = function (a, b, c) {
        this.yc = goog$now();
        this.Lb(
            yt$uix$findAncestorWithClass_(
                yt$uix$BaseWidget$getCssClass(this),
                c.changedTouches[0].target,
                yt$uix$getMaxNumParents_(b, yt$uix$BaseWidget$getCssClass(this))
            ),
            b
        );
    };
    var yt$uix$Tooltip$setTooltipText_ = function (a, b, c, d) {
        a.setData(b, "tooltip-text", c);
        var e = a.getData(b, "content-id");
        if ((e = goog$dom$getElement(e))) {
            e.innerHTML = c;
            if (d) {
                yt$uix$Tooltip$hideTip_(a, b);
            }
        }
    };
    yt$uix$Tooltip.prototype.Ab = function (a) {
        return this.getData(a, "tooltip-text") || a.title;
    };
    var yt$uix$Tooltip$showTip_ = function (a, b) {
        if (b) {
            var c = a.Ab(b);
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
                    var g = document.createElement("div");
                    g.className = yt$uix$BaseWidget$getCssClass(a, "tip-content");
                    var j = a.Kb(b);
                    var o = yt$uix$Tooltip$getTipId_(a, b, "content");
                    g.id = o;
                    a.setData(b, "content-id", o);
                    e.appendChild(g);
                    if (j) {
                        d.appendChild(j);
                    }
                    d.appendChild(e);
                    d.appendChild(f);
                    (yt$dom$getFullScreenElement() || document.body).appendChild(d);
                    yt$uix$Tooltip$setTooltipText_(a, b, c);
                    if ((c = parseInt(a.getData(b, "tooltip-max-width"), 10)) && e.offsetWidth > c) {
                        e.style.width = c + "px";
                        goog$dom$classes$add(g, yt$uix$BaseWidget$getCssClass(a, "normal-wrap"));
                    }
                    g = goog$dom$classes$has(b, yt$uix$BaseWidget$getCssClass(a, "reverse"));
                    if (!a.Md(b, d, e, j, f, g)) {
                        a.Md(b, d, e, j, f, !g);
                    }
                    var x = yt$uix$BaseWidget$getCssClass(a, "tip-visible");
                    yt$setTimeout(function () {
                        goog$dom$classes$add(d, x);
                    }, 0);
                }
            }
        }
    };
    yt$uix$Tooltip.prototype.Md = function (a, b, c, d, e, f) {
        goog$dom$classes$enable(b, yt$uix$BaseWidget$getCssClass(this, "tip-reverse"), f);
        var g = 0;
        if (f) {
            g = 1;
        }
        var e = goog$style$getSize(a);
        var f = new goog$math$Coordinate((e.width - 10) / 2, f ? e.height : 0);
        var j = goog$style$getPageOffset(a);
        goog$positioning$positionAtCoordinate(new goog$math$Coordinate(j.x + f.x, j.y + f.y), b, g);
        var g = goog$dom$getViewportSize_(window);
        var j = goog$style$getClientPosition(b);
        var b = goog$style$getSize(c);
        var o = b.width / 2;
        if (d) {
            d.style.left = "3px";
            d.style.height = b.height + "px";
            d.style.width = b.width + "px";
        }
        d = !!(g.height < j.y + e.height);
        e = !!(j.y < e.height);
        f = !!(j.x < o);
        g = !!(g.width < j.x + o);
        j = (b.width + 3) / -2 - -5;
        a = this.getData(a, "force-tooltip-direction");
        if (a == "left" || f) {
            j = -5;
        } else if (a == "right" || g) {
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
    yt$uix$Tooltip.prototype.Kb = function (a) {
        var b = null;
        if (goog$userAgent$detectedWindows_ && goog$dom$classes$has(a, yt$uix$BaseWidget$getCssClass(this, "masked"))) {
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
    var yt$uix$RangeTooltip = function () {
        this.L = {};
    };
    goog$inherits(yt$uix$RangeTooltip, yt$uix$Tooltip);
    goog$addSingletonGetter(yt$uix$RangeTooltip);
    yt$uix$RangeTooltip.prototype.K = "range-tooltip";
    yt$uix$RangeTooltip.prototype.Ib = null;
    yt$uix$RangeTooltip.prototype.format = null;
    yt$uix$RangeTooltip.prototype.max = 0;
    yt$uix$RangeTooltip.prototype.df = 0;
    yt$uix$RangeTooltip.prototype.cf = 0;
    yt$uix$RangeTooltip.prototype.sc = null;
    yt$uix$RangeTooltip.prototype.Ab = function () {
        return " ";
    };
    yt$uix$RangeTooltip.prototype.Md = function (a, b) {
        this.Ib = b;
        var c = this.getData(a, this.K + "-format");
        if (c) {
            this.format = goog$getObjectByName(c);
        }
        this.max = parseInt(this.getData(a, "range-max"), 10);
        this.df = goog$style$getPageOffset(a).x;
        this.cf = goog$style$getSize(a).width;
    };
    yt$uix$RangeTooltip.prototype.M = function () {
        yt$uix$Tooltip.prototype.M.call(this);
        this.addBehavior("mousemove", this.af);
        this.addBehavior("touchmove", this.bf);
    };
    yt$uix$RangeTooltip.prototype.cb = function (a, b) {
        if (!this.rf) {
            yt$uix$Tooltip.prototype.cb.call(this, a, b);
            yt$events$listen(document, "mousemove", yt$uix$dispatchEvent_);
        }
    };
    yt$uix$RangeTooltip.prototype.Lb = function (a, b) {
        yt$uix$Tooltip.prototype.Lb.call(this, a, b);
        yt$events$unlisten(document, "mousemove", yt$uix$dispatchEvent_);
    };
    yt$uix$RangeTooltip.prototype.Cd = function (a, b, c) {
        if (!this.sc) {
            this.sc = c.changedTouches[0].identifier;
            yt$uix$Tooltip.prototype.Cd.call(this, a, b, c);
            yt$events$listen(document, "touchmove", yt$uix$dispatchEvent_);
            this.bf(0, b, c);
        }
    };
    yt$uix$RangeTooltip.prototype.tc = function (a, b, c) {
        yt$uix$Tooltip.prototype.tc.call(this, a, b, c);
        yt$events$unlisten(document, "touchmove", yt$uix$dispatchEvent_);
        this.rf = true;
        goog$Timer$callOnce(function () {
            this.rf = false;
        }, this);
        this.sc = null;
    };
    yt$uix$RangeTooltip.prototype.af = function (a, b, c) {
        if (this.Ib) {
            b = (c.pageX - this.df) / this.cf;
            b = Math.min(Math.max(b, 0), 1);
            b *= this.max;
            if (this.format) {
                b = this.format(b);
            }
            yt$uix$Tooltip$setTooltipText_(this, a, b);
            var b = goog$dom$getElementByClass(yt$uix$BaseWidget$getCssClass(this, "tip-body"), this.Ib);
            var d = this.Ib;
            var e = new goog$math$Coordinate(-5, 0);
            var a = goog$style$getPageOffset(a);
            goog$positioning$positionAtCoordinate(new goog$math$Coordinate(c.pageX + e.x, a.y + e.y), d, 0);
            c = (goog$style$getSize(b).width + 3) / -2 - -5;
            b.style.left = c + "px";
        }
    };
    yt$uix$RangeTooltip.prototype.bf = function (a, b, c) {
        if (this.Ib) {
            for (a = 0; a < c.changedTouches.length; a++) {
                var d = c.changedTouches[a];
                if (d.identifier == this.sc) {
                    c.pageX = d.pageX;
                    c.pageY = d.pageY;
                    this.af(
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
    var yt$window$redirect = function (a, b, c) {
        window.location = yt$uri$appendQueryData(a, b || {}) + (c || "");
    };
    var yt$window$popup = function (a, b) {
        var c = b || {};
        c.target = c.target || a.target || "YouTube";
        c.width = c.width || 600;
        c.height = c.height || 600;
        var d = c;
        if (!d) {
            d = {};
        }
        var e = window;
        var c = typeof a.href != "undefined" ? a.href : "" + a;
        var f = d.target || a.target;
        var g = [];
        var j;
        for (j in d) {
            switch (j) {
                case "width":
                case "height":
                case "top":
                case "left":
                    g.push(j + "=" + d[j]);
                    break;
                case "target":
                case "noreferrer":
                    break;
                default:
                    g.push(j + "=" + (d[j] ? 1 : 0));
            }
        }
        j = g.join(",");
        if (d.noreferrer) {
            if ((d = e.open("", f, j))) {
                if (goog$userAgent$IE && c.indexOf(";") != -1) {
                    c = "'" + c.replace(/'/g, "%27") + "'";
                }
                d.opener = null;
                if (goog$userAgent$WEBKIT) {
                    d.location.href = c;
                } else {
                    c = goog$string$htmlEscape(c);
                    d.document.write('<META HTTP-EQUIV="refresh" content="0; url=' + c + '">');
                    d.document.close();
                }
            }
        } else {
            d = e.open(c, f, j);
        }
        c = d;
        if (!c) {
            return true;
        }
        if (!c.opener) {
            c.opener = window;
        }
        c.focus();
        return false;
    };
    var yt$uix$Overlay = function () {
        this.L = {};
    };
    goog$inherits(yt$uix$Overlay, yt$uix$BaseWidget);
    goog$addSingletonGetter(yt$uix$Overlay);
    yt$uix$Overlay.prototype.K = "overlay";
    yt$uix$Overlay.prototype.M = function () {
        this.addBehavior("click", this.vf, "target");
        this.addBehavior("click", this.uc, "close");
    };
    yt$uix$Overlay.prototype.vf = function (a) {
        if ((a = yt$uix$BaseWidget$findWidgetElement_(this, a))) {
            var b = yt$uix$BaseWidget$getCssClass(this, "fg");
            var c = goog$dom$getElement(b);
            if (!c) {
                var d = this.rb(a);
                if (d) {
                    c = document.createElement("div");
                    c.id = b;
                    c.className = b;
                    b = this.getData(a, "overlay-class") || "";
                    goog$dom$classes$add(c, b);
                    var e = document.createElement("div");
                    e.className = yt$uix$BaseWidget$getCssClass(this, "fg-content");
                    var b = document.createElement("div");
                    var f = yt$uix$BaseWidget$getCssClass(this, "base");
                    b.id = f;
                    goog$dom$classes$add(b, f);
                    var g = yt$uix$BaseWidget$getCssClass(this, "bg");
                    var f = document.createElement("div");
                    f.id = g;
                    f.className = g;
                    f.style.height = goog$dom$getDocumentHeight() + "px";
                    g = document.createElement("span");
                    goog$dom$classes$add(g, yt$uix$BaseWidget$getCssClass(this, "align"));
                    b.appendChild(g);
                    e.innerHTML = d.innerHTML;
                    d = goog$dom$getElementsByTagNameAndClass("iframe", null, e);
                    goog$array$forEach(
                        d,
                        function (a) {
                            var b = this.getData(a, "onload");
                            if (b) {
                                if ((b = goog$getObjectByName(b))) {
                                    yt$events$listen(a, "load", b);
                                }
                                a.src = this.getData(a, "src") || a.src;
                            }
                        },
                        this
                    );
                    c.appendChild(e);
                    d = document.getElementsByTagName("embed");
                    e = document.getElementsByTagName("object");
                    g = goog$bind(function (a) {
                        var b = a.style.visibility;
                        if (b != "hidden") {
                            this.setData(a, "overlay-hidden", "true");
                            if (b) {
                                this.setData(a, "overlay-visibility-value", b);
                            }
                            a.style.visibility = "hidden";
                        }
                    }, this);
                    goog$array$forEach(d, g);
                    goog$array$forEach(e, g);
                    b.appendChild(c);
                    document.body.appendChild(f);
                    document.body.appendChild(b);
                    if (!this.getData(a, "disable-shortcuts")) {
                        c = goog$bind(function (a) {
                            if (goog$dom$classes$has(a.target, yt$uix$BaseWidget$getCssClass(this, "base"))) {
                                this.uc();
                            }
                        }, this);
                        yt$events$listen(b, "click", c);
                        yt$events$listen(document, "keydown", goog$bind(this.oc, this));
                    }
                    this.wa(a, "overlay-shown");
                }
            }
        }
    };
    yt$uix$Overlay.prototype.uc = function () {
        var a = yt$uix$BaseWidget$getCssClass(this, "bg");
        var b = goog$dom$getElement(yt$uix$BaseWidget$getCssClass(this, "fg"));
        if (b) {
            if (goog$dom$classes$has(b, yt$uix$BaseWidget$getCssClass(this, "unclosable"))) {
                return;
            }
            yt$style$hide(b);
            document.body.removeChild(b.parentNode);
        }
        if ((a = goog$dom$getElement(a))) {
            document.body.removeChild(a);
        }
        var a = document.getElementsByTagName("embed");
        var b = document.getElementsByTagName("object");
        var c = goog$bind(function (a) {
            if (this.getData(a, "overlay-hidden")) {
                yt$dom$datasets$remove(a, "overlay-hidden");
                var b = this.getData(a, "overlay-visibility-value");
                a.style.visibility = b ? b : null;
            }
        }, this);
        goog$array$forEach(a, c);
        goog$array$forEach(b, c);
        yt$events$unlisten(document, "keydown", goog$bind(this.oc, this));
    };
    yt$uix$Overlay.prototype.oc = function (a) {
        if (a.keyCode == 27) {
            this.uc();
        }
    };
    yt$uix$Overlay.prototype.rb = function (a) {
        return goog$dom$getElementByClass(yt$uix$BaseWidget$getCssClass(this, "content"), a);
    };
    yt$uix$Overlay.prototype.Z = function () {
        this.uc();
    };
    yt$uix$Overlay.prototype.show = function (a) {
        this.vf(a);
    };
    var yt$prefs$BitFlags = {
        ck: 0,
        gj: 1,
        de: 2,
        Ij: 3,
        hj: 4,
        Ak: 5,
        Ck: 6,
        zk: 7,
        xk: 8,
        yk: 9,
        Bk: 10,
        wk: 11,
        jk: 12,
        ik: 13,
        hk: 14,
        xj: 15,
        Uj: 16,
        Xj: 17,
        Yj: 18,
        Wj: 19,
        Vj: 20,
        kk: 21,
        kj: 22,
        vk: 23,
        jj: 24,
        Ui: 25,
        lj: 26,
        vj: 27,
        fk: 28,
        ij: 29,
        ek: 30,
        rk: 31,
        qk: 32,
        sj: 33,
        ok: 34,
        lk: 35,
        mk: 36,
        nk: 37,
        pk: 38,
        Jj: 39,
        $j: 40,
        Vi: 41,
        Zj: 42,
        Xi: 43,
        ce: 44,
        mj: 45,
        Rj: 46,
        sk: 47,
        Dk: 48,
        Ek: 49,
        Gk: 50,
        gk: 51,
        bj: 52,
        dj: 53,
        Sj: 54,
        Ej: 55,
        xf: 56,
        dk: 57,
        ak: 58,
        uj: 59,
        Oj: 60,
        Fj: 61,
        Kj: 62,
        Wi: 63,
        uk: 64,
        Zi: 65,
        Yi: 66,
        Lj: 67,
        fj: 68,
        oj: 69,
        yj: 70,
        Pj: 71,
        wj: 72,
        bk: 73,
        Mj: 74,
        ee: 75,
        $h: 76,
        ef: 77,
        pj: 78,
        tk: 79,
        Gj: 80,
        cj: 81,
        Nj: 82,
        zj: 83,
        Bj: 84,
        Aj: 85,
        Cj: 86,
        Dj: 87,
        $i: 88,
        Ti: 89,
        aj: 90,
        Tj: 91,
        Qj: 92,
        ej: 93,
        Fk: 94,
        rj: 95,
        qj: 96,
        tj: 97,
        Hj: 98,
        nj: 99
    };
    var yt$www$lists$SPECIAL_LIST_TYPES_ = ["FL", "LL", "QL", "SV", "WL"];
    var yt$www$lists$getShuffleValue_ = function () {
        return parseInt(yt$getConfig("SHUFFLE_VALUE"), 10) || 0;
    };
    var yt$www$lists$getQueueVideoIds_ = function () {
        var a = yt$net$cookies$get("watch_queue_new");
        if (a) {
            return a.split(",");
        } else {
            return [];
        }
    };
    var yt$www$lists$setQueueVideoIds_ = function (a) {
        a = goog$array$slice(a, 0, 100);
        if ((a = a.join(","))) {
            yt$net$cookies$set("watch_queue_new", a);
        } else {
            yt$net$cookies$remove("watch_queue_new");
        }
    };
    var yt$www$lists$addToQueueCookie_ = function (a) {
        var b = yt$www$lists$getQueueVideoIds_();
        goog$array$extend(b, a);
        yt$www$lists$setQueueVideoIds_(b);
    };
    var yt$www$lists$fetchVideosData_ = function (a, b) {
        if (a.length) {
            yt$net$ajax$send("/video_info_ajax", {
                method: "POST",
                g: {
                    action_get_videos_data: 1,
                    count: a.length
                },
                n: {
                    video_ids: a.join(",")
                },
                f: function (a, d) {
                    if (d.data) {
                        b(d.data);
                    }
                }
            });
        }
    };
    var yt$www$lists$shuffle_ = function (a) {
        var b = yt$www$lists$getShuffleValue_();
        var c = function (a) {
            var c = 1;
            var d = [];
            for (var a = a.split(""); a.length;) {
                var c = (b + c) % a.length;
                var e = a[c];
                goog$array$removeAt(a, c);
                d.push(e);
            }
            return d.join("");
        };
        var d = [];
        goog$array$forEach(a, function (a, b) {
            d.push({
                id: a,
                key: c(a),
                index: b
            });
        });
        goog$array$sortObjectsByKey(d);
        var e = b >> 8;
        goog$array$findIndex(d, function (a) {
            return e == a.index;
        });
        a = goog$array$slice(d, e).concat(goog$array$slice(d, 0, e));
        return goog$array$map(a, function (a) {
            return {
                id: a.id,
                od: a.index
            };
        });
    };
    var yt$www$lists$List = function (a, b, c) {
        this.ia = a;
        this.G = b;
        this.ha = this.Rb = false;
        this.Oc = new goog$pubsub$PubSub();
        this.D = c || [];
        this.lb = {};
        this.Qb = !c;
        this.jb = "";
        this.F = -1;
        this.nb = 1;
        this.Pb = this.ja = 0;
        this.hb = this.ib = "";
        this.Ga = this.Sa = this.ya = null;
    };
    var yt$www$lists$List$publishUpdated_ = function (a) {
        a.Oc.xc("LIST_UPDATED");
    };
    yt$www$lists$List.prototype.isEqual = function (a) {
        if (this.ia != a.ia) {
            return false;
        } else {
            return this.Ba() == a.Ba();
        }
    };
    yt$www$lists$List.prototype.ld = function (a) {
        this.jb = a.jb || "";
        this.F = a.X();
        this.ja = a.ja;
        this.nb = a.nb;
        this.ib = a.ib;
        this.hb = a.hb;
    };
    yt$www$lists$List.prototype.qa = function () {
        return this.ia;
    };
    yt$www$lists$List.prototype.Ba = function () {
        return this.ia + (this.G || "");
    };
    var yt$www$lists$List$countOccurrences_ = function (a, b) {
        return (
            yt$www$lists$List$getCached_(a, "occurrences", function () {
                var a = {};
                goog$array$forEach(this.sa(), function (b) {
                    a[b] = (a[b] || 0) + 1;
                });
                return a;
            })[b] || 0
        );
    };
    var yt$www$lists$List$getPlayOrderIds_ = function (a) {
        if (a.Y()) {
            return yt$www$lists$List$getShuffledIds_(a);
        } else {
            return a.sa();
        }
    };
    yt$www$lists$List.prototype.td = function (a) {
        var b = yt$www$lists$List$getPlayOrderIds_(this);
        if (!b.length) {
            return "";
        }
        a = this.X() + a;
        if (a >= b.length) {
            a %= b.length;
        }
        return b[a];
    };
    var yt$www$lists$List$getIndicesOf_ = function (a, b) {
        var c = yt$www$lists$List$getPlayOrderIds_(a);
        return goog$array$map(b, function (a) {
            return goog$array$findIndexRight(c, function (b) {
                return b == a;
            });
        });
    };
    yt$www$lists$List.prototype.sa = function () {
        return goog$array$toArray(this.D);
    };
    var yt$www$lists$List$getShuffledIds_ = function (a) {
        return yt$www$lists$List$getCached_(a, "shuffled_ids", function () {
            return goog$array$map(yt$www$lists$List$getShuffledVideos_(this), function (a) {
                return a.id;
            });
        });
    };
    var yt$www$lists$List$getShuffledVideos_ = function (a) {
        return yt$www$lists$List$getCached_(a, "shuffled_videos", function () {
            var a = this.sa();
            return yt$www$lists$shuffle_(a);
        });
    };
    yt$www$lists$List.prototype.getVideoData = function (a) {
        return this.lb[a] || {};
    };
    yt$www$lists$List.prototype.N = function () {
        return this.sa().length;
    };
    yt$www$lists$List.prototype.X = function () {
        if (this.Y()) {
            return goog$array$findIndex(
                yt$www$lists$List$getShuffledVideos_(this),
                function (a) {
                    return a.od == this.F;
                },
                this
            );
        } else {
            return this.F;
        }
    };
    yt$www$lists$List.prototype.Y = function () {
        return this.ja > 0;
    };
    yt$www$lists$List.prototype.pa = function () {
        return this.F >= 0;
    };
    yt$www$lists$List.prototype.mb = function () {
        return !!this.Rb;
    };
    yt$www$lists$List.prototype.Sc = function () {
        return !!yt$getConfig("LIST_COPY_ON_EDIT_ENABLED");
    };
    yt$www$lists$List.prototype.Va = function () {
        return false;
    };
    var yt$www$lists$List$clearMessages_ = function (a) {
        a.ya = null;
        a.Sa = null;
    };
    var yt$www$lists$List$getPreviousVideoUrl = function (a, b) {
        var c = a.X() - 1;
        if (c < 0) {
            c = a.N() - 1;
        }
        return yt$www$lists$List$getVideoUrl_(a, c, false, b);
    };
    var yt$www$lists$List$getVideoUrl_ = function (a, b, c, d) {
        var e = yt$www$lists$List$getPlayOrderIds_(a)[b];
        if (!e) {
            return null;
        }
        var f = {
            v: e
        };
        if (yt$www$lists$List$countOccurrences_(a, e) > 1) {
            e = b + 1 + a.Pb;
            if (a.Y()) {
                e = yt$www$lists$List$getShuffledVideos_(a)[b].od + 1;
            }
            f.index = e;
        }
        if (c) {
            f.playnext = a.nb;
        }
        if (a.Y()) {
            f.shuffle = a.ja;
        }
        if (d) {
            f.feature = d;
        }
        return yt$uri$setQueryData(a.jb, f);
    };
    yt$www$lists$List.prototype.clear = function () {
        this.yf();
        yt$www$lists$List$publishUpdated_(this);
    };
    yt$www$lists$List.prototype.removeItem = function (a) {
        if (this.Y()) {
            a = yt$www$lists$List$getShuffledVideos_(this)[a].od;
        }
        var b = this.sa()[a];
        this.Re(a);
        if (this.F > a) {
            this.F -= 1;
        } else if (this.F == a) {
            this.F = -1;
        }
        yt$www$lists$List$publishUpdated_(this);
        return b;
    };
    yt$www$lists$List.prototype.Re = function (a) {
        var b = this.D[a];
        goog$array$removeAt(this.D, a);
        yt$net$ajax$send(this.ac(), {
            format: "XML",
            method: "POST",
            n: {
                video_ids: b,
                session_token: yt$net$ajax$tokenMap_.addto_ajax || "",
                playlist_id: this.G || "",
                index: a
            },
            f: function (a, b) {
                this.ya = b.html_content;
            },
            B: function (a, b) {
                this.Sa = b.error_message || yt$getMsg("ERROR_OCCURRED");
            },
            ga: function () {
                yt$www$lists$List$publishUpdated_(this);
            },
            j: this
        });
    };
    yt$www$lists$List.prototype.load = function (a) {
        if (this.Qb && !this.Rb) {
            yt$www$lists$List$fetch_(this, a);
        } else if (a) {
            yt$www$lists$List$publishUpdated_(this);
            a();
        }
        yt$www$lists$List$loadVideoData_(this);
    };
    var yt$www$lists$List$loadVideoData_ = function (a) {
        var b = yt$www$lists$List$getPlayOrderIds_(a);
        var b = goog$array$filter(
            b,
            function (a) {
                return !(a in this.lb);
            },
            a
        );
        goog$array$forEach(
            b,
            function (a) {
                this.lb[a] = {};
            },
            a
        );
        yt$www$lists$fetchVideosData_(
            b,
            goog$bind(function (a) {
                for (var b in a) {
                    this.lb[b] = a[b];
                }
                yt$www$lists$List$publishUpdated_(this);
            }, a)
        );
    };
    var yt$www$lists$List$fetch_ = function (a, b, c) {
        a.Rb = true;
        a.Qb = false;
        var d = {
            style: "bottomfeedr_json",
            action_get_list: 1,
            list: a.Ba()
        };
        if (c) {
            goog$object$extend(d, c);
        }
        yt$net$ajax$send("/list_ajax", {
            g: d,
            f: function (a, b) {
                var c = b.data;
                this.D = goog$array$toArray(c.videos);
                this.G = c.list_id;
                this.ha = !!c.editable;
                this.jb = c.video_url || "";
                this.ib = c.menu_title_html;
                this.hb = c.menu_html;
                this.Pb = c.index_offset;
                var c = c.video_data;
                var d;
                for (d in c) {
                    this.lb[d] = c[d];
                }
            },
            B: function () {},
            ga: function () {
                this.Rb = false;
                yt$www$lists$List$loadVideoData_(this);
                yt$www$lists$List$publishUpdated_(this);
                if (b) {
                    b();
                }
            },
            j: a
        });
    };
    var yt$www$lists$List$withCache_ = function (a, b, c) {
        a.Ga = {};
        try {
            b.call(c);
        } finally {
            a.Ga = null;
        }
    };
    var yt$www$lists$List$getCached_ = function (a, b, c) {
        if (a.Ga && b in a.Ga) {
            return a.Ga[b];
        }
        c = c.call(a);
        if (a.Ga) {
            a.Ga[b] = c;
        }
        return c;
    };
    var yt$www$lists$FavoritesList = function (a, b) {
        yt$www$lists$List.call(this, "FL", a, b);
    };
    goog$inherits(yt$www$lists$FavoritesList, yt$www$lists$List);
    yt$www$lists$FavoritesList.prototype.ac = function () {
        return "/addto_ajax?action_delete_from_favorites=1";
    };
    var yt$www$lists$LikedList = function (a, b) {
        yt$www$lists$List.call(this, "LL", a, b);
    };
    goog$inherits(yt$www$lists$LikedList, yt$www$lists$List);
    yt$www$lists$LikedList.prototype.ac = function () {
        return "/addto_ajax?action_delete_from_liked=1";
    };
    var yt$www$lists$MlList = function (a, b) {
        yt$www$lists$List.call(this, "ML", a, b);
    };
    goog$inherits(yt$www$lists$MlList, yt$www$lists$List);
    yt$www$lists$MlList.prototype.Sc = function () {
        return !!this.ha;
    };
    yt$www$lists$MlList.prototype.Va = function () {
        return !!this.ha;
    };
    var yt$www$lists$Playlist = function (a, b, c) {
        yt$www$lists$List.call(this, a, b, c);
    };
    goog$inherits(yt$www$lists$Playlist, yt$www$lists$List);
    yt$www$lists$Playlist.prototype.Wc = function (a) {
        goog$array$extend(this.D, a);
        yt$net$ajax$send("/addto_ajax", {
            format: "XML",
            method: "POST",
            g: {
                action_add_to_playlist: 1
            },
            n: {
                playlist_id: this.G,
                video_ids: a.join(","),
                session_token: yt$net$ajax$tokenMap_.addto_ajax
            },
            B: function () {
                this.Sa = yt$getMsg("ERROR_OCCURRED");
                yt$www$lists$List$publishUpdated_(this);
            },
            j: this
        });
    };
    yt$www$lists$Playlist.prototype.ac = function () {
        return "/addto_ajax?action_delete_from_playlist=1";
    };
    yt$www$lists$Playlist.prototype.yf = function () {
        var a = this.D.length;
        goog$array$clear(this.D);
        yt$net$ajax$send("/addto_ajax", {
            format: "XML",
            method: "POST",
            g: {
                action_clear_playlist: 1,
                list_length: a,
                type: this.ia
            },
            n: {
                playlist_id: this.G,
                session_token: yt$net$ajax$tokenMap_.addto_ajax
            },
            B: function () {
                this.Sa = yt$getMsg("ERROR_OCCURRED");
                yt$www$lists$List$publishUpdated_(this);
            },
            j: this
        });
    };
    yt$www$lists$Playlist.prototype.ye = function (a, b) {
        var c = this.D[a];
        goog$array$removeAt(this.D, a);
        goog$array$splice(this.D, b, 0, c);
        var d = goog$array$toArray(this.D);
        yt$net$ajax$send("/addto_ajax?action_move_playlist_video=1", {
            format: "XML",
            method: "POST",
            n: {
                video_ids: c,
                playlist_id: this.G,
                source_index: a,
                target_index: b,
                session_token: yt$net$ajax$tokenMap_.addto_ajax
            },
            B: function () {
                var e;
                e = this.D;
                a: if (!goog$isArrayLike(e) || !goog$isArrayLike(d) || e.length != d.length) {
                    e = false;
                } else {
                    for (var f = e.length, g = 0; g < f; g++) {
                        if (e[g] !== d[g]) {
                            e = false;
                            break a;
                        }
                    }
                    e = true;
                }
                if (e) {
                    goog$array$removeAt(this.D, b);
                    goog$array$splice(this.D, a, 0, c);
                }
                this.Sa = yt$getMsg("ERROR_OCCURRED");
                yt$www$lists$List$publishUpdated_(this);
            },
            j: this
        });
    };
    yt$www$lists$Playlist.prototype.Va = function () {
        return !!this.ha;
    };
    var yt$www$lists$QueueList = function (a) {
        yt$www$lists$List.call(this, "QL", null);
        this.ha = true;
        this.Qb = !a;
    };
    goog$inherits(yt$www$lists$QueueList, yt$www$lists$List);
    yt$www$lists$QueueList.prototype.ld = function (a) {
        yt$www$lists$QueueList.superClass_.ld.call(this, a);
        this.Qb = false;
    };
    yt$www$lists$QueueList.prototype.sa = function () {
        return yt$www$lists$getQueueVideoIds_();
    };
    yt$www$lists$QueueList.prototype.Wc = function (a) {
        yt$www$lists$addToQueueCookie_(a);
    };
    yt$www$lists$QueueList.prototype.Re = function (a) {
        var b = yt$www$lists$List$getPlayOrderIds_(this)[a];
        var a = yt$www$lists$getQueueVideoIds_();
        var b = goog$array$indexOf(a, b);
        if (b >= 0) {
            goog$array$removeAt(a, b);
            yt$www$lists$setQueueVideoIds_(a);
        }
    };
    yt$www$lists$QueueList.prototype.yf = function () {
        yt$www$lists$setQueueVideoIds_([]);
    };
    yt$www$lists$QueueList.prototype.ye = function (a, b) {
        var c = yt$www$lists$getQueueVideoIds_();
        var d = c[a];
        goog$array$removeAt(c, a);
        goog$array$splice(c, b, 0, d);
        yt$www$lists$setQueueVideoIds_(c);
    };
    yt$www$lists$QueueList.prototype.Va = function () {
        return !!this.ha;
    };
    var yt$www$lists$StationList = function (a, b) {
        yt$www$lists$List.call(this, "SV", a, b);
        this.ha = true;
    };
    goog$inherits(yt$www$lists$StationList, yt$www$lists$List);
    yt$www$lists$StationList.prototype.load = function (a) {
        yt$www$lists$StationList.superClass_.load.call(this, a);
        if (!this.mb() && this.pa()) {
            a = yt$www$lists$List$getPlayOrderIds_(this);
            if (this.X() >= a.length - 1) {
                yt$www$lists$List$fetch_(this, null, {
                    load_more: "1"
                });
            }
        }
    };
    yt$www$lists$StationList.prototype.ac = function () {
        return "/addto_ajax?action_delete_from_station=1";
    };
    var yt$www$lists$createList = function (a, b, c) {
        var d = null;
        switch (a) {
            case "PL":
            case "SP":
            case "BP":
            case "WL":
                d = new yt$www$lists$Playlist(a, b, c);
                break;
            case "FL":
                d = new yt$www$lists$FavoritesList(b, c);
                break;
            case "LL":
                d = new yt$www$lists$LikedList(b, c);
                break;
            case "AV":
            case "BB":
            case "ML":
            case "MC":
                d = new yt$www$lists$MlList(b, c);
                break;
            case "QL":
                d = new yt$www$lists$QueueList();
                break;
            case "SV":
                d = new yt$www$lists$StationList(b, c);
                break;
            default:
                d = new yt$www$lists$List(a, b, c);
        }
        return d;
    };
    var yt$www$thumbnaildelayload$topOffset_ = 0;
    var yt$www$thumbnaildelayload$preloadMargin_ = 0;
    var yt$www$thumbnaildelayload$lastLoadedBottom_ = 0;
    var yt$www$thumbnaildelayload$currentBottom_ = 0;
    var yt$www$thumbnaildelayload$delayLoadEnabled_ = false;
    var yt$www$thumbnaildelayload$getVisibleBottom_ = function () {
        var a = goog$dom$getViewportSize_(window);
        return goog$dom$getDocumentScroll_(document).y + a.height + yt$www$thumbnaildelayload$preloadMargin_;
    };
    var yt$www$thumbnaildelayload$loadVisible_ = function () {
        var a = yt$www$thumbnaildelayload$getVisibleBottom_();
        var b = yt$www$thumbnaildelayload$lastLoadedBottom_;
        yt$www$thumbnaildelayload$currentBottom_ = a;
        var c = Math.abs(b - a);
        if (!b || c >= 400) {
            c = yt$www$thumbnaildelayload$getGroupIndex_(a);
            for (b = yt$www$thumbnaildelayload$getGroupIndex_(b); b < c;) {
                yt$net$delayed$load("thumb-group-" + c);
                c--;
            }
            yt$www$thumbnaildelayload$lastLoadedBottom_ = a;
        }
    };
    var yt$www$thumbnaildelayload$loadAllAbove_ = function () {
        for (var a = yt$www$thumbnaildelayload$getGroupIndex_(yt$www$thumbnaildelayload$currentBottom_); a >= 0; a--) {
            yt$net$delayed$load("thumb-group-" + a);
        }
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
    var yt$www$thumbnaildelayload$registerDelayLoad = function (a, b) {
        if (yt$www$thumbnaildelayload$delayLoadEnabled_) {
            yt$www$thumbnaildelayload$forEachThumb_(function (a, d) {
                var e = yt$dom$datasets$get(a, "group-key");
                if (!yt$dom$datasets$get(a, "thumb-manual") && (!e || !!b)) {
                    if (e) {
                        yt$net$delayed$unregister(a, e);
                    }
                    if ((e = goog$dom$getElement(a))) {
                        var f = 0;
                        var g = 0;
                        if (e.offsetParent) {
                            do {
                                f += e.offsetLeft;
                                g += e.offsetTop;
                            } while ((e = e.offsetParent));
                        }
                        e = new goog$math$Coordinate(f, g);
                    } else {
                        e = null;
                    }
                    e = "thumb-group-" + yt$www$thumbnaildelayload$getGroupIndex_(e.y);
                    yt$net$delayed$register(a, d, e);
                    yt$dom$datasets$set(a, "group-key", e);
                }
            }, a);
        }
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
    var yt$www$thumbnaildelayload$getGroupIndex_ = function (a) {
        return Math.ceil(Math.max(0, a - yt$www$thumbnaildelayload$topOffset_) / 400);
    };
    if (!goog$userAgent$IE) {
        if (goog$userAgent$GECKO) {
            goog$userAgent$isVersion("1.9.3");
        }
    }
    new goog$pubsub$PubSub();
    var yt$templates$Template = function (a, b) {
        this.wf = a;
        var c = b || null;
        if (!c) {
            c = yt$templates$extractPlaceholders_(this.wf);
        }
        c = goog$string$subs("__%s__", "(" + c.join("|") + ")");
        this.Di = RegExp(c, "g");
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
    yt$templates$Template.prototype.qb = function (a, b, c) {
        return this.wf.replace(
            this.Di,
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
    var yt$uix$Slider = function () {
        this.L = {};
    };
    goog$inherits(yt$uix$Slider, yt$uix$BaseWidget);
    goog$addSingletonGetter(yt$uix$Slider);
    yt$uix$Slider.prototype.K = "slider";
    yt$uix$Slider.prototype.M = function () {
        this.addBehavior("click", this.ti, "num");
        this.addBehavior("click", this.ui, "prev");
        this.addBehavior("click", this.si, "next");
        this.addBehavior("mouseover", this.cb, "ajax-trigger");
    };
    yt$uix$Slider.prototype.ti = function (a) {
        if (a) {
            var b = yt$uix$BaseWidget$findWidgetElement_(this, a);
            var a = parseInt(this.getData(a, "slider-num"), 10);
            if (isNaN(a) || a < 0) {
                a = 0;
            }
            this.zc(b, a);
        }
    };
    yt$uix$Slider.prototype.si = function (a, b, c) {
        if (a) {
            a = yt$uix$BaseWidget$findWidgetElement_(this, a);
            if (goog$dom$classes$has(a, yt$uix$BaseWidget$getCssClass(this, "fluid"))) {
                if (a) {
                    var d = this.Ma(a);
                    var e = yt$uix$Slider$getSlideUnits_(this, yt$uix$Slider$getSlide_(this, d));
                    var f = e.length > 0;
                    var b = parseInt(this.getData(a, "scroll-offset"), 10);
                    if (isNaN(b) || b > 0) {
                        b = 0;
                    }
                    var g = d.offsetWidth;
                    if (f) {
                        d = yt$uix$Slider$getUnitWidth_(e);
                        g = Math.floor(g / d);
                        b = Math.abs(Math.floor(b / d)) - 1;
                        yt$uix$Slider$scrollToUnit_(this, a, (b >= 0 ? b : 0) + g);
                    } else {
                        if (this.Ld && document.documentMode < 8) {
                            if (Math.abs(b - g) < d.scrollWidth) {
                                b -= g;
                            }
                        } else if (d.offsetWidth < d.scrollWidth) {
                            b -= g;
                        }
                        yt$uix$Slider$setScrollOffset_(this, a, b);
                    }
                }
            } else if (a) {
                b = parseInt(this.getData(a, "slider-current"), 10);
                if (isNaN(b) || b < 0) {
                    b = 0;
                }
                g = parseInt(this.getData(a, "slider-slides"), 10);
                if (isNaN(g) || g < 0) {
                    g = 0;
                }
                b = Math.min(b + 1, g - 1);
                this.zc(a, b);
            }
            c.preventDefault();
        }
    };
    yt$uix$Slider.prototype.ui = function (a, b, c) {
        if (a) {
            a = yt$uix$BaseWidget$findWidgetElement_(this, a);
            if (goog$dom$classes$has(a, yt$uix$BaseWidget$getCssClass(this, "fluid"))) {
                if (a) {
                    var d = this.Ma(a);
                    var e = yt$uix$Slider$getSlideUnits_(this, yt$uix$Slider$getSlide_(this, d));
                    var f = e.length > 0;
                    var b = parseInt(this.getData(a, "scroll-offset"), 10);
                    if (isNaN(b) || b > 0) {
                        b = 0;
                    }
                    d = d.offsetWidth;
                    if (f) {
                        e = yt$uix$Slider$getUnitWidth_(e);
                        f = Math.floor(d / e);
                        b = Math.abs(Math.floor(b / e)) - 1;
                        yt$uix$Slider$scrollToUnit_(this, a, (b >= 0 ? b : 0) - f);
                    } else {
                        b += d;
                        if (b > 0) {
                            b = 0;
                        }
                        yt$uix$Slider$setScrollOffset_(this, a, b);
                    }
                }
            } else if (a) {
                b = parseInt(this.getData(a, "slider-current"), 10);
                if (isNaN(b) || b < 0) {
                    b = 0;
                }
                b = Math.max(b - 1, 0);
                this.zc(a, b);
            }
            c.preventDefault();
        }
    };
    yt$uix$Slider.prototype.cb = function (a) {
        if ((a = yt$uix$BaseWidget$findWidgetElement_(this, a))) {
            var b = yt$uix$BaseWidget$getCssClass(this, "ajax-trigger");
            var c = goog$dom$getElementsByClass(b, a);
            goog$array$forEach(c, function (a) {
                goog$dom$classes$remove(a, b);
            });
            yt$uix$Slider$loadSlides_(this, a);
        }
    };
    var yt$uix$Slider$loadSlides_ = function (a, b, c) {
        var d = a.getData(b, "slider-ajax-url");
        if (d && !a.getData(b, "slider-loaded")) {
            a.setData(b, "slider-loaded", "true");
            yt$net$ajax$send(d, {
                j: a,
                f: function (a, d) {
                    var g = goog$dom$htmlToDocumentFragment(d.slides_html);
                    var j = goog$dom$getElementByClass(yt$uix$BaseWidget$getCssClass(this, "slides"), b);
                    if (j && g) {
                        goog$dom$append(j, g);
                    }
                    if (c) {
                        c();
                    }
                }
            });
        }
    };
    yt$uix$Slider.prototype.zc = function (a, b) {
        if (a) {
            if (this.getData(a, "slider-ajax-url") && !this.getData(a, "slider-loaded")) {
                yt$uix$Slider$loadSlides_(this, a, goog$bind(this.zc, this, a, b));
            } else {
                yt$uix$Slider$showSlide_(this, a, b);
            }
        }
    };
    var yt$uix$Slider$showSlide_ = function (a, b, c) {
        var d = goog$dom$getElementsByTagNameAndClass(null, yt$uix$BaseWidget$getCssClass(a, "num"), b);
        var e = yt$uix$BaseWidget$getCssClass(a, "num-current");
        var f;
        goog$array$forEach(
            d,
            function (a) {
                f = this.getData(a, "slider-num") == c;
                goog$dom$classes$enable(a, e, f);
                goog$dom$classes$enable(a, "yt-uix-pager-selected", f);
                if (goog$dom$classes$has(a, "yt-uix-button")) {
                    goog$dom$classes$enable(a, "yt-uix-button-toggled", f);
                }
            },
            a
        );
        if ((d = goog$dom$getElementByClass(yt$uix$BaseWidget$getCssClass(a, "slides"), b))) {
            var g = yt$uix$Slider$getSlide_(a, d);
            if (g) {
                var j = c * -1 * g.offsetWidth + "px";
                if (goog$style$isRightToLeft(g)) {
                    d.style.right = j;
                } else {
                    d.style.left = j;
                }
            }
        }
        if ((d = goog$dom$getElementByClass("yt-uix-pager-current-page", b))) {
            d.innerHTML = c + 1;
        }
        a.setData(b, "slider-current", c + "");
        yt$uix$Slider$updateButtons_(a, b);
    };
    var yt$uix$Slider$updateButtons_ = function (a, b) {
        if (b) {
            var c = parseInt(a.getData(b, "slider-current"), 10);
            var d = parseInt(a.getData(b, "slider-slides"), 10);
            var e = goog$dom$getElementsByClass(yt$uix$BaseWidget$getCssClass(a, "next"), b);
            var f = goog$dom$getElementsByClass(yt$uix$BaseWidget$getCssClass(a, "prev"), b);
            goog$array$forEach(e, function (a) {
                a.disabled = false;
            });
            goog$array$forEach(f, function (a) {
                a.disabled = false;
            });
            if (c == 0) {
                goog$array$forEach(f, function (a) {
                    a.disabled = true;
                });
            }
            if (c == d - 1) {
                goog$array$forEach(e, function (a) {
                    a.disabled = true;
                });
            }
        }
    };
    var yt$uix$Slider$scrollToUnit_ = function (a, b, c) {
        if (b) {
            var d = a.Ma(b);
            var e = yt$uix$Slider$getSlideUnits_(a, yt$uix$Slider$getSlide_(a, d));
            if (!(e.length <= 0)) {
                if (c >= e.length) {
                    c = e.length - 1;
                }
                var f = parseInt(a.getData(b, "scroll-offset"), 10);
                if (isNaN(f) || f > 0) {
                    f = 0;
                }
                var d = d.offsetWidth;
                var g = yt$uix$Slider$getUnitWidth_(e);
                var f = Math.abs(Math.floor(f / g)) - 1;
                if (c > (f >= 0 ? f : 0)) {
                    var f = Math.floor(d / g);
                    var j = e.length;
                    if (c + f > j) {
                        c = j - f + 1;
                    }
                }
                if (c < 0) {
                    c = 0;
                }
                c = e[c];
                f = goog$style$isRightToLeft(b) ? c.offsetLeft - d + g + 10 : (c.offsetLeft - 10) * -1;
                yt$uix$Slider$setScrollOffset_(a, b, f);
            }
        }
    };
    var yt$uix$Slider$setScrollOffset_ = function (a, b, c) {
        if (b) {
            if (isNaN(c)) {
                c = 0;
            }
            var d = a.Ma(b);
            var e = yt$uix$Slider$getSlide_(a, d);
            var f = goog$dom$getElementsByTagNameAndClass(null, yt$uix$BaseWidget$getCssClass(a, "title"), e);
            var g = goog$dom$classes$has(b, yt$uix$BaseWidget$getCssClass(a, "scroll"));
            var j = goog$style$isRightToLeft(b);
            if (g) {
                d.scrollLeft = j ? (goog$userAgent$GECKO ? c : d.scrollWidth - d.offsetWidth + c) : -c;
            } else {
                var o = j ? "right" : "left";
                e.style[o] = c + "px";
                goog$array$forEach(f, function (a) {
                    a.style[o] = c * -1 + "px";
                });
            }
            a.setData(b, "scroll-offset", c + "");
        }
    };
    yt$uix$Slider.prototype.Ma = function (a) {
        return goog$dom$getElementByClass(yt$uix$BaseWidget$getCssClass(this, "body"), a);
    };
    var yt$uix$Slider$getSlide_ = function (a, b) {
        return goog$dom$getElementByClass(yt$uix$BaseWidget$getCssClass(a, "slide"), b);
    };
    var yt$uix$Slider$getSlideUnits_ = function (a, b) {
        return goog$dom$getElementsByTagNameAndClass(null, yt$uix$BaseWidget$getCssClass(a, "slide-unit"), b);
    };
    var yt$uix$Slider$getUnitWidth_ = function (a) {
        if (a.length == 0) {
            return 0;
        }
        var b = a[0];
        var c = b.offsetWidth;
        if (a.length > 1) {
            a = a[1];
            c = goog$style$isRightToLeft(b) ? b.offsetLeft - a.offsetLeft : a.offsetLeft - b.offsetLeft;
        }
        return c;
    };
    var yt$uix$Slider$getVisibleUnits_ = function (a, b) {
        var c = a.Ma(b);
        var d = yt$uix$Slider$getSlideUnits_(a, yt$uix$Slider$getSlide_(a, c));
        if (!d.length) {
            return [];
        }
        var e = parseInt(a.getData(b, "scroll-offset"), 10);
        if (isNaN(e) || e > 0) {
            e = 0;
        }
        var f = c.offsetWidth;
        var g = yt$uix$Slider$getUnitWidth_(d);
        var c = Math.floor(-e / g);
        var c = Math.max(0, c);
        var e = Math.ceil((-e + f) / g);
        var e = Math.min(e, d.length);
        return goog$array$slice(goog$array$clone(d), c, e);
    };
    var yt$www$lists$PlaylistBarTray = function (a, b) {
        this.V = !!b;
        this.r = a;
        this.Ka = this.V ? goog$dom$getElement("watch-tray-playlist-slider") : goog$dom$getElement("playlist-bar-tray");
        this.W = yt$dom$getFirstElementByTagNameAndClass("ol", null, this.Ka);
        this.ah = goog$dom$getElement("playlist-bar-title");
        this.Zg = goog$dom$getElement("playlist-bar-extras-menu");
        var c = goog$object$getKeys(yt$www$lists$PlaylistBarTray$TEMPLATE_KEYS_);
        var d = goog$dom$getElement("playlist-bar-template");
        if (this.V) {
            d = goog$dom$getElement("watch-tray-playlist-item-template");
        }
        this.hh = yt$templates$fromElement(d, c);
        d = yt$dom$datasets$get(d, "video-thumb-url") || "";
        this.ih = new yt$templates$Template(d, c);
        yt$events$delegateByClass(
            this.Ka,
            "click",
            goog$bind(function () {
                yt$setTimeout(goog$bind(this.He, this), 0);
            }, this),
            "playlist-bar-tray-button"
        );
    };
    var yt$www$lists$PlaylistBarTray$TEMPLATE_KEYS_ = {
        classes: "classes",
        list_position: "index",
        video_encrypted_id: "id",
        video_title: "title",
        video_url: "url",
        video_display_name: "display_name",
        video_thumb_url: "thumb_url"
    };
    yt$www$lists$PlaylistBarTray.prototype.qb = function (a, b, c, d, e) {
        var f = c.ib;
        if (f) {
            this.ah.innerHTML = f;
            this.Zg.innerHTML = c.hb;
        }
        var g = [];
        goog$array$forEach(
            a,
            function (a, d) {
                var f = d == b;
                var C = c.getVideoData(a);
                C.id = a;
                C.url = yt$www$lists$List$getVideoUrl_(c, d);
                g.push(yt$www$lists$PlaylistBarTray$renderItem_(this, C, d + 1 + e, f));
            },
            this
        );
        this.W.innerHTML = g.join("");
        if (d) {
            this.scroll(3);
        } else if (!this.V) {
            this.scroll(5);
        }
        d = goog$dom$getElementsByClass("item-count", this.r);
        goog$array$forEach(d, function (b) {
            b.innerHTML = a.length;
        });
        d = goog$dom$getElementsByClass("playing-index", this.r);
        goog$array$forEach(d, function (a) {
            a.innerHTML = b + 1;
        });
    };
    var yt$www$lists$PlaylistBarTray$renderItem_ = function (a, b, c, d) {
        var e = function (a) {
            return yt$www$lists$PlaylistBarTray$TEMPLATE_KEYS_[a];
        };
        b.index = c;
        b.thumb_url = a.ih.qb(b, e);
        c = [];
        if (b.unviewable) {
            c.push("playlist-bar-item-unviewable");
        } else if (!b.title) {
            c.push("loading");
        }
        if (d) {
            c.push("playlist-bar-item-playing");
        }
        b.classes = c.join(" ");
        return a.hh.qb(b, e);
    };
    yt$www$lists$PlaylistBarTray.prototype.He = function () {
        var a = yt$uix$Slider$getVisibleUnits_(yt$uix$Slider.getInstance(), this.Ka);
        goog$array$forEach(a, function (a) {
            yt$www$thumbnaildelayload$loadImmediately(a);
        });
    };
    yt$www$lists$PlaylistBarTray.prototype.scroll = function (a, b) {
        var c = yt$uix$Slider.getInstance();
        switch (a) {
            case 3:
                var d = yt$dom$getFirstElementByTagNameAndClass("li", "playlist-bar-item-playing", this.W);
                if (d) {
                    var e = this.Ka;
                    if (e) {
                        var f = yt$uix$Slider$getSlideUnits_(c, yt$uix$Slider$getSlide_(c, c.Ma(e)));
                        var d = goog$array$indexOf(f, d);
                        if (d >= 0) {
                            yt$uix$Slider$scrollToUnit_(c, e, d);
                        }
                    }
                } else {
                    yt$uix$Slider$scrollToUnit_(c, this.Ka, 0);
                }
                break;
            case 4:
                if (b) {
                    yt$uix$Slider$scrollToUnit_(c, this.Ka, b);
                }
                break;
            case 5:
                e = this.Ka;
                d = c.getData(e, "scroll-offset");
                yt$uix$Slider$setScrollOffset_(c, e, parseInt(d, 10) || 0);
        }
        this.He();
    };
    yt$www$lists$PlaylistBarTray.prototype.cc = function (a) {
        var b = 0;
        var c = goog$bind(function () {
            var d = goog$dom$getElementsByTagNameAndClass("li", "playlist-bar-item", this.W);
            var e = !(b % 2);
            goog$array$forEach(a, function (a) {
                goog$dom$classes$enable(d[a], "playlist-bar-item-highlight", e);
            });
            b++;
            if (b < 6) {
                yt$setTimeout(c, 150);
            }
        }, this);
        c();
    };
    var yt$www$lists$PlaylistBar = function (a, b, c) {
        this.r = a;
        this.V = !!c;
        this.Ta = new yt$www$lists$PlaylistBarTray(this.r, this.V);
        this.pb = b;
        this.Ic = this.be = false;
        this.Rf = goog$dom$getElement("playlist-bar-bar");
        yt$events$listen(this.Rf, "click", goog$bind(this.Tf, this));
        this.cg = goog$dom$getElement("playlist-bar-play-button");
        yt$events$listen(this.cg, "click", goog$bind(this.Zf, this));
        if (this.V) {
            this.ge = goog$dom$getElement("watch-prev");
            this.Mc = goog$dom$getElement("watch-next");
        } else {
            this.ge = goog$dom$getElement("playlist-bar-prev-button");
            this.Mc = goog$dom$getElement("playlist-bar-next-button");
        }
        yt$events$listen(this.ge, "click", goog$bind(this.$f, this));
        yt$events$listen(this.Mc, "click", goog$bind(this.Xf, this));
        this.Lc = goog$dom$getElement("playlist-bar-autoplay-button");
        yt$events$listen(this.Lc, "click", goog$bind(this.Sf, this));
        this.Vd = goog$dom$getElement("playlist-bar-shuffle-button");
        yt$events$listen(this.Vd, "click", goog$bind(this.ag, this));
        this.Wd = goog$dom$getElement("playlist-bar-toggle-button");
        yt$events$listen(this.Wd, "click", goog$bind(this.bg, this));
        this.Jc = goog$dom$getElement("playlist-bar-options-menu");
        yt$events$delegateByClass(this.Jc, "click", goog$bind(this.Yf, this), "yt-uix-button-menu-item");
        this.W = goog$dom$getElement("playlist-bar-tray-content");
        if (this.V) {
            this.W = goog$dom$getElement("watch-tray-playlist-content");
        }
        yt$events$delegateByClass(this.W, "click", goog$bind(this.Uf, this), "delete");
        yt$events$delegateByClass(this.W, "click", goog$bind(this.Vf, this), "load-lists");
        yt$events$delegateByClass(this.W, "click", goog$bind(this.Wf, this), "load-more");
        this.Hf = yt$templates$fromElement(goog$dom$getElement("playlist-bar-next-up-template"), [
            "video_encrypted_id"
        ]);
        yt$www$lists$PlaylistBar$setList_(this, b);
        if (this.b.N()) {
            this.show();
        } else {
            this.Z();
        }
        a = document.createElement("iframe");
        a.id = "playlist-bar-mask";
        a.frameBorder = "0";
        a.src = 'javascript:""';
        this.r.insertBefore(a, this.r.firstChild);
    };
    var yt$www$lists$PlaylistBar$setList_ = function (a, b, c, d) {
        if (a.b && (a.b.Oc.clear("LIST_UPDATED"), a.pb.isEqual(b) || d)) {
            b.ld(a.pb);
            a.pb = b;
        }
        a.b = b;
        a.b.Oc.gc("LIST_UPDATED", a.Ua, a);
        a.b.load(c);
        a.Ua(true);
    };
    yt$www$lists$PlaylistBar.prototype.qa = function () {
        return this.b.qa();
    };
    yt$www$lists$PlaylistBar.prototype.Ba = function () {
        return this.b.Ba();
    };
    yt$www$lists$PlaylistBar.prototype.pa = function () {
        return this.b.pa();
    };
    var yt$www$lists$PlaylistBar$isAutoplayOn_ = function (a) {
        return a.pa() && goog$dom$classes$has(a.r, "autoplay-on");
    };
    var yt$www$lists$PlaylistBar$setAutoplay_ = function (a, b) {
        if (b) {
            goog$dom$classes$addRemove(a.r, "autoplay-off", "autoplay-on");
        } else {
            goog$dom$classes$addRemove(a.r, "autoplay-on", "autoplay-off");
        }
        var c = yt$prefs$UserPrefs.getInstance();
        yt$prefs$UserPrefs$setFlag(yt$prefs$BitFlags.$h, !b);
        c.save();
        yt$setConfig("LIST_AUTO_PLAY_ON", b);
    };
    yt$www$lists$PlaylistBar.prototype.Y = function () {
        return goog$dom$classes$has(this.r, "shuffle-on");
    };
    yt$www$lists$PlaylistBar.prototype.mb = function () {
        return goog$dom$classes$has(this.r, "loading");
    };
    yt$www$lists$PlaylistBar.prototype.show = function () {
        if (yt$prefs$UserPrefs$getFlag(yt$prefs$UserPrefs.getInstance(), yt$prefs$BitFlags.ef)) {
            yt$www$lists$PlaylistBar$collapse_(this);
        } else {
            yt$www$lists$PlaylistBar$expand_(this);
        }
    };
    yt$www$lists$PlaylistBar.prototype.Z = function () {
        goog$dom$classes$addRemove(this.r, ["min", "max"], "hid");
    };
    var yt$www$lists$PlaylistBar$collapse_ = function (a) {
        goog$dom$classes$addRemove(a.r, ["hid", "max"], "min");
        yt$www$lists$PlaylistBar$updateTooltips_(a, true);
    };
    var yt$www$lists$PlaylistBar$expand_ = function (a) {
        goog$dom$classes$addRemove(a.r, ["hid", "min"], "max");
        yt$www$lists$PlaylistBar$updateTooltips_(a, true);
    };
    yt$www$lists$PlaylistBar.prototype.toggle = function () {
        var a;
        if (goog$dom$classes$has(this.r, "min")) {
            yt$www$lists$PlaylistBar$expand_(this);
            a = false;
        } else {
            yt$www$lists$PlaylistBar$collapse_(this);
            a = true;
        }
        yt$tracking$track("bf", "toggleBar=1&collapsed=" + a, undefined);
        var b = yt$prefs$UserPrefs.getInstance();
        yt$prefs$UserPrefs$setFlag(yt$prefs$BitFlags.ef, a);
        b.save();
        yt$www$lists$PlaylistBar$hideNotification_(this, true);
    };
    yt$www$lists$PlaylistBar.prototype.Tf = function (a) {
        if (
            !goog$dom$getAncestor(
                a.target,
                function (a) {
                    a = a.tagName && a.tagName.toLowerCase();
                    return a == "a" || a == "button";
                },
                true
            )
        ) {
            this.toggle();
        }
    };
    yt$www$lists$PlaylistBar.prototype.Yf = function (a) {
        a.stopPropagation();
        switch (yt$dom$datasets$get(a.currentTarget, "action")) {
            case "clear":
                this.clear();
                break;
            case "load-lists":
                yt$www$lists$PlaylistBar$showLists_(this);
                break;
            case "show-active":
                if (this.pb) {
                    yt$www$lists$PlaylistBar$setList_(this, this.pb);
                }
                break;
            case "save":
                yt$www$lists$PlaylistBar$showSaveForm_(this);
        }
    };
    yt$www$lists$PlaylistBar.prototype.bg = function () {
        this.toggle();
    };
    yt$www$lists$PlaylistBar.prototype.Sf = function () {
        yt$www$lists$PlaylistBar$setAutoplay_(this, !yt$www$lists$PlaylistBar$isAutoplayOn_(this));
        yt$www$lists$PlaylistBar$updateTooltips_(this);
    };
    yt$www$lists$PlaylistBar.prototype.ag = function () {
        var a = !this.Y();
        var b = 0;
        yt$setConfig("SHUFFLE_ENABLED", a);
        if (a) {
            yt$setConfig("SHUFFLE_VALUE", Math.max(1, Math.random() * 1000000));
        }
        if (a) {
            goog$dom$classes$addRemove(this.r, "shuffle-off", "shuffle-on");
            b = yt$www$lists$getShuffleValue_();
        } else {
            goog$dom$classes$addRemove(this.r, "shuffle-on", "shuffle-off");
        }
        this.b.ja = b;
        this.Ua();
        this.Ta.scroll(3);
    };
    yt$www$lists$PlaylistBar.prototype.Zf = function () {
        this.next(true, "bf_play");
    };
    yt$www$lists$PlaylistBar.prototype.$f = function () {
        var a = yt$www$lists$List$getPreviousVideoUrl(this.b, "bf_prev");
        if (a) {
            yt$window$redirect(a);
        }
    };
    yt$www$lists$PlaylistBar.prototype.Xf = function () {
        this.next(true, "bf_next");
    };
    yt$www$lists$PlaylistBar.prototype.Uf = function (a) {
        a.preventDefault();
        a.stopPropagation();
        var b = this.V ? "watch-tray-playlist-item" : "playlist-bar-item";
        var c = goog$dom$getElementsByTagNameAndClass("li", b, this.W);
        var a = goog$dom$getAncestorByTagNameAndClass(a.currentTarget, "li", b);
        var c = goog$array$indexOf(c, a);
        if (this.b.Sc()) {
            a = this.b.qa();
            yt$www$lists$PlaylistBar$copyToQueue_(this);
            yt$tracking$track("bf", "copyFrom=1&action=delete&list_type=" + a, undefined);
        }
        var d = this.b.qa();
        var e = yt$www$lists$List$getPlayOrderIds_(this.b)[c];
        this.b.removeItem(c);
        yt$www$lists$PlaylistBar$showNotification_(
            this,
            yt$getMsg("PLAYLIST_VIDEO_DELETED"),
            false,
            false,
            function () {
                this.b.Wc([e]);
                this.Ua();
                var a = this.b.N() - 1;
                this.Ta.scroll(4, a);
                this.Ta.cc([a]);
                yt$tracking$track("bf", "undo_delete=1&list_type=" + d, undefined);
            }
        );
        yt$tracking$track("bf", "delete=1&list_type=" + d, undefined);
    };
    var yt$www$lists$PlaylistBar$initDragDrop_ = function (a) {
        if (!a.be) {
            a.be = true;
            yt$net$scriptloader$load(
                (yt$getConfig("DRAGDROP_BINARY_URL") || "") + "",
                goog$bind(function () {
                    yt$events$listen(
                        this.W,
                        "mouseover",
                        goog$bind(function () {
                            if (!this.Ic) {
                                this.Ic = true;
                                if (this.b.Va() && !this.b.Y()) {
                                    goog$getObjectByName("yt.www.lists.dragdrop").createDraggables();
                                }
                            }
                        }, this)
                    );
                    var a = this.V ? "watch-tray-playlist-item" : "playlist-bar-item";
                    var c = goog$getObjectByName("yt.www.lists.dragdrop");
                    c.init(this.W, a);
                    c.subscribe("DROPPED_AT_INDEX", this.Mg, this);
                }, a)
            );
        }
    };
    yt$www$lists$PlaylistBar.prototype.Mg = function (a) {
        var b = a.sourceIndex;
        var a = a.targetIndex;
        if (b != a && !(b < 0) && !(a < 0)) {
            if (this.b.Sc()) {
                var c = this.b.qa();
                yt$www$lists$PlaylistBar$copyToQueue_(this);
                yt$tracking$track("bf", "copyFrom=1&action=drag&list_type=" + c, undefined);
            }
            c = this.b;
            if (!c.Y() && c.Va()) {
                var d = yt$www$lists$List$getPlayOrderIds_(c);
                if (d[b] && d[a]) {
                    c.ye(b, a);
                    d = c.F;
                    if (d == b) {
                        c.F = a;
                    } else if (d > b && d <= a) {
                        c.F -= 1;
                    } else if (d < b && d >= a) {
                        c.F += 1;
                    }
                }
                yt$www$lists$List$publishUpdated_(c);
            }
            b = yt$uri$buildQueryData({
                moved_item_delta: Math.abs(a - b),
                list_type: this.b.qa()
            });
            yt$tracking$track("bf", b, undefined);
        }
    };
    yt$www$lists$PlaylistBar.prototype.next = function (a, b) {
        if (!a) {
            yt$tracking$track("bf", "autoplay=1&playcount=" + this.b.nb, undefined);
        }
        var c;
        c = this.b;
        var d = c.X() + 1;
        if (d >= c.N()) {
            d = 0;
        }
        if ((c = yt$www$lists$List$getVideoUrl_(c, d, !a, b))) {
            yt$window$redirect(c);
        }
    };
    var yt$www$lists$PlaylistBar$showAutoplayWarning_ = function (a, b) {
        if (!(b < 1) && !(b > 5)) {
            yt$tracking$track("bf", "delayedautoplay=" + b, undefined);
            yt$uix$Tooltip$showTip_(yt$uix$Tooltip.getInstance(), a.Lc);
            var c = yt$getMsg("AUTOPLAY_WARNING" + b);
            if (c) {
                yt$www$lists$PlaylistBar$showNotification_(a, c, false, true);
            }
        }
    };
    yt$www$lists$PlaylistBar.prototype.clear = function () {
        var a = this.b.sa();
        this.b.clear();
        yt$www$lists$PlaylistBar$showNotification_(this, yt$getMsg("LIST_CLEARED"), false, false, function () {
            this.b.Wc(a);
            this.Ua();
            yt$tracking$track("bf", "undo_clear=1&list_type=" + b, undefined);
        });
        var b = this.b.qa();
        yt$tracking$track("bf", "clear=1&list_type=" + b, undefined);
    };
    yt$www$lists$PlaylistBar.prototype.td = function (a) {
        return this.b.td(a);
    };
    yt$www$lists$PlaylistBar.prototype.Ua = function (a) {
        var b = this.b.mb();
        var c = !b && !!this.b.ha;
        var d = !this.b.N();
        var e = this.b.pa();
        if (e) {
            goog$dom$classes$addRemove(this.Jc, "passive", "active");
        } else {
            goog$dom$classes$addRemove(this.Jc, "active", "passive");
        }
        var f = [];
        var g = [];
        (e ? g : f).push("active");
        (!e ? g : f).push("passive");
        (b ? g : f).push("loading");
        (c ? g : f).push("editable");
        (d ? g : f).push("empty");
        goog$dom$classes$addRemove(this.r, f, g);
        if (!b) {
            yt$www$lists$List$withCache_(
                this.b,
                function () {
                    var b = yt$www$lists$List$getPlayOrderIds_(this.b);
                    var c = this.b.X();
                    this.Ta.qb(b, c, this.b, !!a, this.b.Pb);
                    this.Ic = false;
                },
                this
            );
        }
        b = this.b.Sa;
        c = this.b.ya;
        if (b) {
            yt$www$lists$PlaylistBar$showNotification_(this, b, true, false);
        } else if (c) {
            yt$www$lists$PlaylistBar$showNotification_(this, c, false, true);
        }
        yt$www$lists$List$clearMessages_(this.b);
        yt$www$lists$PlaylistBar$updateTooltips_(this);
        if (this.b.Va() && this.b.N()) {
            yt$www$lists$PlaylistBar$initDragDrop_(this);
        }
    };
    var yt$www$lists$PlaylistBar$updateTooltips_ = function (a, b) {
        if (!a.V) {
            var c = yt$getMsg("AUTOPLAY_OFF_TOOLTIP");
            if (yt$www$lists$PlaylistBar$isAutoplayOn_(a)) {
                c = yt$getMsg("AUTOPLAY_ON_TOOLTIP");
            }
            var d = yt$getMsg("SHUFFLE_OFF_TOOLTIP");
            if (a.Y()) {
                d = yt$getMsg("SHUFFLE_ON_TOOLTIP");
            }
            var e = yt$getMsg("NEXT_VIDEO_NOTHUMB_TOOLTIP");
            if (a.b.pa()) {
                var f = yt$www$lists$List$getPlayOrderIds_(a.b);
                var g = a.b.X();
                if ((f = (g = f[f.length == g + 1 ? 0 : g + 1]) && a.b.getVideoData(g)) && f.title) {
                    e = a.Hf.qb({
                        video_encrypted_id: g
                    });
                    e =
                        yt$getMsg("NEXT_VIDEO_TOOLTIP", {
                            "{next_video_title}": f.title
                        }) +
                        " " +
                        e;
                }
            }
            f = "";
            f = goog$dom$classes$has(a.r, "min")
                ? yt$getMsg("SHOW_PLAYLIST_TOOLTIP")
                : yt$getMsg("HIDE_PLAYLIST_TOOLTIP");
            g = yt$uix$Tooltip.getInstance();
            yt$uix$Tooltip$setTooltipText_(g, a.Mc, e);
            yt$uix$Tooltip$setTooltipText_(g, a.Lc, c);
            yt$uix$Tooltip$setTooltipText_(g, a.Vd, d);
            yt$uix$Tooltip$setTooltipText_(g, a.Wd, f, b);
        }
    };
    yt$www$lists$PlaylistBar.prototype.Jb = null;
    yt$www$lists$PlaylistBar.prototype.rc = null;
    var yt$www$lists$PlaylistBar$clearNotificationTimer_ = function (a) {
        if (a.Jb) {
            yt$clearTimeout(a.Jb);
            a.Jb = null;
        }
    };
    var yt$www$lists$PlaylistBar$showNotification_ = function (a, b, c, d, e) {
        if (b) {
            if (!a.Na) {
                a.Na = a.V
                    ? goog$dom$getElement("watch-bar-notifications")
                    : goog$dom$getElement("playlist-bar-notifications");
                yt$events$delegateByClass(a.Na, "click", goog$bind(a.Vh, a), "playlist-bar-undo");
            }
            a.rc = e || null;
            if (a.rc) {
                b += ' <a class="playlist-bar-undo">' + yt$getMsg("UNDO_LINK") + "</a>";
            }
            goog$dom$getElementByClass("yt-alert-content", a.Na).innerHTML = b;
            goog$dom$classes$enable(a.Na, "yt-alert-error", !!c);
            goog$dom$classes$enable(a.Na, "yt-alert-success", !c);
            yt$style$show(a.Na);
            yt$www$lists$PlaylistBar$clearNotificationTimer_(a);
            if (d) {
                b = goog$bind(function () {
                    yt$www$lists$PlaylistBar$hideNotification_(this);
                }, a);
                a.Jb = yt$setTimeout(b, 10000);
            }
        }
    };
    yt$www$lists$PlaylistBar.prototype.showError = function (a, b) {
        yt$www$lists$PlaylistBar$showNotification_(this, a, true, b);
    };
    var yt$www$lists$PlaylistBar$hideNotification_ = function (a, b) {
        var c = !!a.Jb;
        if (!b || !c) {
            yt$style$hide(a.Na);
            a.rc = null;
            yt$www$lists$PlaylistBar$clearNotificationTimer_(a);
        }
    };
    yt$www$lists$PlaylistBar.prototype.Vh = function (a) {
        a.stopPropagation();
        a.preventDefault();
        a = this.rc;
        yt$www$lists$PlaylistBar$hideNotification_(this);
        a.call(this);
    };
    yt$www$lists$PlaylistBar.prototype.cc = function (a) {
        a = yt$www$lists$List$getIndicesOf_(this.b, a);
        if (a.length) {
            this.Ta.cc(a);
            this.Ta.scroll(4, a[0]);
        }
    };
    var yt$www$lists$PlaylistBar$showSaveForm_ = function (a) {
        if (!a.mb()) {
            yt$www$lists$PlaylistBar$expand_(a);
            yt$www$lists$PlaylistBar$sendAjax_(a, {
                g: {
                    action_get_save_playlist_form: 1
                },
                f: function (a, c) {
                    goog$dom$classes$addRemove(this.r, "lists", "save");
                    var d = c.html;
                    this.ke = goog$dom$getElement("playlist-bar-save");
                    this.ke.innerHTML = d;
                    d = goog$dom$getElement("playlist-bar-title-edit");
                    d.focus();
                    d.select();
                    yt$events$listen(
                        goog$dom$getElement("playlist-bar-save-cancel"),
                        "click",
                        goog$bind(this.Kg, this)
                    );
                    yt$events$listen(goog$dom$getElement("playlist-bar-save-form"), "submit", goog$bind(this.Lg, this));
                }
            });
        }
    };
    yt$www$lists$PlaylistBar.prototype.Kg = function (a) {
        a.preventDefault();
        goog$dom$classes$remove(this.r, "save");
    };
    yt$www$lists$PlaylistBar.prototype.Lg = function (a) {
        a.preventDefault();
        var b = yt$www$lists$List$getPlayOrderIds_(this.b).join(",");
        if (b) {
            yt$www$lists$PlaylistBar$hideNotification_(this);
            a = goog$dom$forms$getFormDataString(a.target);
            yt$www$lists$PlaylistBar$sendAjax_(this, {
                g: {
                    action_save_playlist: 1
                },
                method: "POST",
                za: a + ("&video_ids=" + b),
                f: function (a, b) {
                    this.ke.innerHTML = "";
                    goog$dom$classes$remove(this.r, "save");
                    yt$www$lists$PlaylistBar$setList_(this, yt$www$lists$createList("PL", b.list_id), null, true);
                    yt$www$lists$PlaylistBar$showNotification_(
                        this,
                        yt$getMsg("PLAYLIST_BAR_PLAYLIST_SAVED"),
                        false,
                        true
                    );
                }
            });
        }
    };
    yt$www$lists$PlaylistBar.prototype.Vf = function (a) {
        a.preventDefault();
        yt$www$lists$PlaylistBar$showLists_(this);
    };
    yt$www$lists$PlaylistBar.prototype.Wf = function () {
        var a = this.b;
        yt$www$lists$List$fetch_(a, null, {
            load_more: "1"
        });
        yt$www$lists$List$publishUpdated_(a);
    };
    var yt$www$lists$PlaylistBar$showLists_ = function (a) {
        if (!a.mb()) {
            yt$www$lists$PlaylistBar$expand_(a);
            yt$www$lists$PlaylistBar$sendAjax_(a, {
                g: {
                    action_get_playlists: 1
                },
                f: function (a, c) {
                    goog$dom$classes$addRemove(this.r, "save", "lists");
                    this.Bg = goog$dom$getElement("playlist-bar-lists-back");
                    this.ng = yt$events$listen(this.Bg, "click", goog$bind(this.Cg, this));
                    var d = c.html;
                    this.yb = goog$dom$getElement("playlist-bar-lists");
                    this.yb.innerHTML = d;
                    yt$www$thumbnaildelayload$loadImmediately(this.yb);
                    this.og = yt$events$delegateByClass(
                        this.yb,
                        "click",
                        goog$bind(this.Dg, this),
                        "playlist-bar-playlist-item"
                    );
                }
            });
        }
    };
    yt$www$lists$PlaylistBar.prototype.Dg = function (a) {
        a.preventDefault();
        var b = a.currentTarget;
        if (b) {
            yt$www$lists$PlaylistBar$hideLists_(this);
            a = yt$dom$datasets$get(b, "list-type") || "";
            b = yt$dom$datasets$get(b, "list-id") || "";
            yt$www$lists$PlaylistBar$setList_(this, yt$www$lists$createList(a, b));
        }
    };
    yt$www$lists$PlaylistBar.prototype.Cg = function (a) {
        a.preventDefault();
        yt$www$lists$PlaylistBar$hideLists_(this);
    };
    var yt$www$lists$PlaylistBar$hideLists_ = function (a) {
        goog$dom$classes$remove(a.r, "lists");
        if (a.yb) {
            a.yb.innerHTML = "";
        }
        yt$events$unlistenByKey(a.og);
        yt$events$unlistenByKey(a.ng);
    };
    var yt$www$lists$PlaylistBar$sendAjax_ = function (a, b) {
        goog$dom$classes$add(a.r, "loading");
        goog$object$extend(b, {
            format: "JSON",
            B: function (a, b) {
                var e = yt$getMsg("ERROR_OCCURRED");
                if (b && b.errors) {
                    e = b.errors[0];
                }
                this.showError(e, true);
            },
            ga: function () {
                goog$dom$classes$remove(this.r, "loading");
            },
            j: a
        });
        yt$net$ajax$send("/playlist_bar_ajax", b);
    };
    var yt$www$lists$getPlayerListData = function () {
        var a = yt$www$lists$getPlaylistBar();
        var b = yt$www$lists$List$getPlayOrderIds_(a.b);
        var c = {};
        goog$array$forEach(
            b,
            function (a) {
                c[a] = this.b.getVideoData(a);
            },
            a
        );
        var d = a.X();
        var e = yt$www$lists$PlaylistBar$isAutoplayOn_(a);
        var a = a.Y() ? a.b.ja : 0;
        return {
            autoPlay: e,
            index: d,
            shuffle: a,
            videoData: c,
            videoIds: b || []
        };
    };
    yt$www$lists$PlaylistBar.prototype.X = function () {
        return this.b.X();
    };
    var yt$www$lists$PlaylistBar$copyToQueue_ = function (a) {
        var b = a.b.sa();
        yt$www$lists$setQueueVideoIds_([]);
        yt$www$lists$addToQueueCookie_(b);
        var b = new yt$www$lists$QueueList();
        var c = a.b.X();
        b.F = c;
        b.ja = a.b.ja;
        yt$www$lists$PlaylistBar$setList_(a, b);
    };
    var yt$www$lists$playlistBar_ = null;
    var yt$www$lists$initialized_ = false;
    var yt$www$lists$getPlaylistBar = function () {
        if (!yt$www$lists$playlistBar_) {
            var a = goog$dom$getElement("playlist-bar");
            var b = false;
            if (!a && yt$getConfig("ENABLE_WATCH6")) {
                a = goog$dom$getElement("watch-tray-playlist");
                b = true;
            }
            if (a) {
                var c = a;
                var d;
                if (goog$dom$classes$has(c, "active")) {
                    d = yt$dom$datasets$get(c, "list-type") || "";
                    if (d == "QL") {
                        d = new yt$www$lists$QueueList(true);
                    } else {
                        var e = yt$dom$datasets$get(c, "list-id") || "";
                        var f = (yt$dom$datasets$get(c, "video-ids") || "").split(",");
                        d = yt$www$lists$createList(d, e, f);
                    }
                    e = parseInt(yt$dom$datasets$get(c, "index-offset"), 10) || 0;
                    d.Pb = e;
                    d.F = parseInt(yt$getConfig("PLAYLIST_BAR_PLAYING_INDEX"), 10) || 0;
                    d.nb = parseInt(yt$getConfig("LIST_AUTO_PLAY_VALUE"), 10) || 0;
                    e = 0;
                    if (yt$getConfig("SHUFFLE_ENABLED")) {
                        e = yt$www$lists$getShuffleValue_();
                    }
                    d.ja = e;
                } else {
                    d = new yt$www$lists$QueueList(true);
                }
                e = yt$dom$datasets$get(c, "video-url");
                d.jb = e || "";
                c = goog$dom$classes$has(c, "editable");
                d.ha = c;
                d.ib = goog$dom$getElement("playlist-bar-title").innerHTML;
                d.hb = goog$dom$getElement("playlist-bar-extras-menu").innerHTML;
                yt$www$lists$playlistBar_ = new yt$www$lists$PlaylistBar(a, d, b);
            }
        }
        return yt$www$lists$playlistBar_;
    };
    var yt$www$lists$autoplayCountdown_ = function (a) {
        var b = yt$www$lists$getPlaylistBar();
        if (yt$www$lists$PlaylistBar$isAutoplayOn_(b)) {
            if (a > 0) {
                yt$www$lists$PlaylistBar$showAutoplayWarning_(b, a);
                yt$setTimeout(function () {
                    yt$www$lists$autoplayCountdown_(a - 1);
                }, 1000);
            } else {
                b.next(false, "mr_meh");
            }
        }
    };
    var yt$www$lists$onVideosAdded = function (a, b, c, d) {
        if (yt$www$lists$initialized_) {
            var e = yt$www$lists$getPlaylistBar();
            if (e) {
                a = yt$www$lists$createList(a, b);
                b = true;
                if (e.pa()) {
                    b = e.b.isEqual(a);
                }
                if (b) {
                    yt$www$lists$PlaylistBar$setList_(e, a, function () {
                        e.cc(c);
                        yt$www$lists$PlaylistBar$showNotification_(e, d, false, true);
                    });
                    e.show();
                } else {
                    yt$www$lists$PlaylistBar$showNotification_(e, d, false, true);
                }
            }
        }
    };
    var yt$www$lists$registerNearEndEventsWithPlayer = function (a) {
        var b = a.getDuration();
        for (var c = 5; c > 0; c--) {
            a.addCueRange("NEAR_END" + c, b - c, b - c + 1);
        }
        a.addEventListener("onCueRangeEnter", "yt.www.lists.handleNearPlaybackEnd");
    };
    var yt$www$lists$isPlayingUserList = function () {
        if (!yt$www$lists$initialized_ || !yt$www$lists$getPlaylistBar().pa()) {
            return false;
        }
        var a = yt$www$lists$getPlaylistBar().qa();
        return !goog$array$contains(yt$www$lists$SPECIAL_LIST_TYPES_, a);
    };
    var yt$www$watch$watch5$resizeTimer_ = -1;
    var yt$www$watch$watch5$enableWide = function (a) {
        var a = !!a;
        var b = goog$dom$getElement("page");
        var c = goog$dom$getElement("watch-sidebar");
        var d = goog$dom$getElement("baseDiv");
        var e = yt$getConfig("WIDE_PLAYER_STYLES");
        var f = 0;
        if ("webkitTransition" in c.style) {
            f = document.defaultView.getComputedStyle(c, null);
            f = parseFloat(f["-webkit-transition-duration"]) * 1000;
        } else if ("MozTransition" in c.style) {
            f = document.defaultView.getComputedStyle(c, null);
            f = parseFloat(f.getPropertyValue("-moz-transition-duration")) * 1000;
        } else if ("OTransition" in c.style) {
            f = document.defaultView.getComputedStyle(c, null);
            f = parseFloat(f.getPropertyValue("-o-transition-duration")) * 1000;
        }
        if (a) {
            goog$dom$classes$add(b, "watch-wide");
            yt$setTimeout(function () {
                yt$www$watch$watch5$updatePlayerSize();
                for (var a = 0; a < e.length; ++a) {
                    goog$dom$classes$add(d, e[a]);
                }
            }, f);
        } else {
            f /= 2;
            yt$www$watch$watch5$updatePlayerSize("small");
            for (var g = 0; g < e.length; ++g) {
                goog$dom$classes$remove(d, e[g]);
            }
            yt$setTimeout(function () {
                goog$dom$classes$remove(b, "watch-wide");
            }, f);
            yt$www$thumbnaildelayload$loadImmediately(c);
        }
        yt$style$setDisplayed("masthead-utility-menulink-short", a);
        yt$style$setDisplayed("masthead-utility-menulink-long", !a);
    };
    var yt$www$watch$watch5$updatePlayerSize = function (a) {
        var b = goog$dom$getElement("watch-video");
        if (!goog$dom$classes$has(goog$dom$getElement("page"), "watch-wide") || a == "small") {
            goog$dom$classes$remove(b, "medium", "large");
        } else {
            var c = !!yt$getConfig("ENABLE_AUTO_LARGE");
            var d = goog$dom$getViewportSize_(window);
            var d = !!(d.width >= 1400) && !!(d.height >= 1040);
            if (c && (d || a == "large")) {
                goog$dom$classes$addRemove(b, "medium", "large");
            } else {
                goog$dom$classes$addRemove(b, "large", "medium");
            }
        }
    };
    var yt$www$watch$getPlayerReference_ = function () {
        return yt$getConfig("PLAYER_REFERENCE");
    };
    var yt$www$watch$forwardClick_ = function (a) {
        if (!goog$dom$getAncestorByTagNameAndClass(a.target, "BUTTON")) {
            a.currentTarget.click();
        }
    };
    var yt$sharing$EmailShare = function (a, b, c, d) {
        this.c = a;
        this.Kc = false;
        a = goog$uri$utils$getHost() + "/share_ajax";
        yt$net$ajax$send(a, {
            format: "JSON",
            g: {
                action_get_email: 1,
                video_id: c,
                list: d
            },
            f: function (a, c) {
                this.c.innerHTML = c.email_html;
                this.Aa();
                this.focus();
                var d = c.sharing_binary_url;
                if (d) {
                    yt$sharing$EmailShare$loadContactTools_(this, d, c.contacts, b);
                }
            },
            j: this
        });
    };
    yt$sharing$EmailShare.prototype.Aa = function () {
        this.i = this.c.getElementsByTagName("form")[0];
        yt$events$listen(this.i, "submit", goog$bind(this.Tc, this));
        goog$dom$getElementByClass("share-email-send", this.i);
        this.ya = goog$dom$getElementByClass("share-email-success", this.c);
        this.Og = goog$dom$getElementByClass("share-email-remail", this.ya);
        yt$events$listen(
            this.Og,
            "click",
            goog$bind(function () {
                yt$sharing$EmailShare$reset_(this);
                this.focus();
            }, this)
        );
        this.bd = goog$dom$getElementByClass("share-email-recipients", this.c);
        this.ad = goog$dom$getElementByClass("share-email-note", this.c);
        this.ve = goog$dom$getElementByClass("share-email-preview-note", this.c);
        yt$events$listen(this.ad, "keyup", goog$bind(this.Ng, this));
    };
    var yt$sharing$EmailShare$loadContactTools_ = function (a, b, c, d) {
        yt$net$scriptloader$load(
            b,
            goog$bind(function () {
                var a = goog$getObjectByName("yt.sharing.ContactTools");
                if (a) {
                    a.createContactTools(this.bd, null, c, d);
                }
            }, a)
        );
    };
    yt$sharing$EmailShare.prototype.na = function () {
        if (this.i) {
            if (this.Kc) {
                yt$sharing$EmailShare$reset_(this);
            }
            this.focus();
        }
    };
    yt$sharing$EmailShare.prototype.focus = function () {
        this.bd.focus();
    };
    var yt$sharing$EmailShare$reset_ = function (a) {
        a.Kc = false;
        a.bd.value = "";
        a.ad.value = "";
        a.ve.innerHTML = "";
        yt$style$hide(a.ya);
        yt$style$show(a.i);
    };
    yt$sharing$EmailShare.prototype.Ng = function () {
        var a = this.ad.value;
        var a = a.substring(0, 300);
        var a = goog$string$htmlEscape(a);
        var a = a.replace(/\n/g, "<br>");
        this.ve.innerHTML = a;
    };
    yt$sharing$EmailShare.prototype.Tc = function (a) {
        a.preventDefault();
        var b = goog$dom$getElementsByTagNameAndClass("button", null, this.i)[0];
        b.disabled = true;
        var c = goog$dom$getElementByClass("share-email-captcha", this.c);
        var d = goog$dom$getElementByClass("share-email-error", this.c);
        var e = goog$dom$getElementByClass("yt-alert-content", d);
        var a = goog$uri$utils$getHost() + goog$uri$utils$getPathAndAfter(this.i.action);
        yt$net$ajax$send(a, {
            format: "JSON",
            method: "POST",
            za: goog$dom$forms$getFormDataString(this.i),
            f: function () {
                this.Kc = true;
                yt$style$show(this.ya);
                yt$style$hide(this.i);
                yt$style$hide(d);
                yt$style$hide(c);
            },
            B: function (a, b) {
                if (b.captcha_html) {
                    c.innerHTML = b.captcha_html;
                    yt$style$show(c);
                }
                if (b.errors) {
                    e.innerHTML = b.errors.join("<br>");
                    yt$style$show(d);
                }
            },
            ga: function () {
                b.disabled = false;
            },
            j: this
        });
    };
    var yt$sharing$EmbedShare = function (a, b, c) {
        this.c = a;
        a = goog$uri$utils$getHost() + "/share_ajax";
        yt$net$ajax$send(a, {
            format: "JSON",
            g: {
                action_get_embed: 1,
                video_id: b,
                list: c
            },
            f: function (a, b) {
                this.c.innerHTML = b.embed_html;
                this.Of = b.legacy_url;
                this.Nf = b.legacy_code;
                this.Mf = b.iframe_url;
                this.Lf = b.iframe_code;
                this.Aa();
                var c = yt$prefs$UserPrefs.getInstance();
                if (this.Ea) {
                    this.Ea.checked = !yt$prefs$UserPrefs$getFlag(0, yt$prefs$BitFlags.de);
                }
                this.Ub.checked = yt$prefs$UserPrefs$getFlag(0, yt$prefs$BitFlags.ce);
                if (this.Da) {
                    this.Da.checked = yt$prefs$UserPrefs$getFlag(0, yt$prefs$BitFlags.ee);
                }
                c = c.get("ems");
                (c in this.$ ? this.$[c] : goog$object$getAnyValue(this.$)).select();
                yt$sharing$EmbedShare$updateEmbedCode_(this);
                this.na();
            },
            j: this
        });
    };
    yt$sharing$EmbedShare.prototype.Aa = function () {
        this.Za = goog$dom$getElementByClass("share-embed-code", this.c);
        yt$events$listen(this.Za, "click", goog$bind(this.yh, this));
        yt$sharing$EmbedShare$initSizes_(this);
        yt$sharing$EmbedShare$initOptions_(this);
    };
    var yt$sharing$EmbedShare$initSizes_ = function (a) {
        var b = goog$dom$getElementByClass("share-embed-size-list", a.c);
        var c = goog$dom$getElementsByClass("share-embed-size-radio", b);
        a.$ = {};
        goog$array$forEach(
            c,
            function (a) {
                if (!goog$dom$classes$has(a, "share-embed-size-radio-custom")) {
                    a = new yt$sharing$EmbedSize(a);
                    this.$[a.name] = a;
                }
            },
            a
        );
        var c = goog$object$getAnyValue(a.$).width / (goog$object$getAnyValue(a.$).height - 30);
        var d = goog$dom$getElementByClass("share-embed-size-radio-custom", b);
        var c = new yt$sharing$CustomEmbedSize(d, c);
        a.$[c.name] = c;
        a.mh = c;
        yt$events$delegateByClass(b, "click", goog$bind(a.nh, a), "share-embed-size");
        b = goog$dom$getElementByClass("share-embed-customize", b);
        yt$events$listen(b, "keyup", goog$bind(a.oh, a));
    };
    var yt$sharing$EmbedShare$initOptions_ = function (a) {
        var b = {};
        var c = goog$dom$getElementsByClass("share-embed-option", a.c);
        goog$array$forEach(c, function (a) {
            b[a.name] = a;
        });
        a.Ea = b["show-related"];
        if (a.Ea) {
            yt$events$listen(a.Ea, "click", goog$bind(a.eh, a));
        }
        a.Ub = b["delayed-cookies"];
        yt$events$listen(a.Ub, "click", goog$bind(a.dh, a));
        a.xe = b["use-https"];
        yt$events$listen(a.xe, "click", goog$bind(a.gh, a));
        a.Da = b["use-flash-code"] || null;
        if (a.Da) {
            yt$events$listen(a.Da, "click", goog$bind(a.fh, a));
        }
    };
    yt$sharing$EmbedShare.prototype.na = function () {
        this.focus();
    };
    yt$sharing$EmbedShare.prototype.focus = function () {
        if (this.Za) {
            this.Za.focus();
            this.Za.select();
        }
    };
    var yt$sharing$EmbedShare$updateEmbedCode_ = function (a) {
        var b = a.Lf;
        var c = a.Mf;
        if (a.Da && a.Da.checked) {
            b = a.Nf;
            c = a.Of;
        }
        if (a.Ub.checked) {
            c = c.replace("youtube.com", "youtube-nocookie.com");
        }
        if (a.xe.checked) {
            c = c.split("//");
            c[0] = "https:";
            c = c.join("//");
        }
        var d = {};
        if (a.Ea && !a.Ea.checked) {
            d.rel = 0;
        }
        c = yt$uri$setQueryData(c, d);
        d = yt$sharing$EmbedShare$getSelectedSize_(a);
        if (!d.width || d.width < 200) {
            d = goog$object$getAnyValue(a.$);
        }
        b = b.replace(/__url__/g, goog$string$htmlEscape(c));
        b = b.replace(/__width__/g, d.width + "");
        b = b.replace(/__height__/g, d.height + "");
        b = goog$string$htmlEscape(b);
        if (b != a.Za.innerHTML) {
            a.Za.innerHTML = b;
        }
    };
    var yt$sharing$EmbedShare$getSelectedSize_ = function (a) {
        return (
            goog$object$findValue(a.$, function (a) {
                return a.Mb.checked;
            }) || null
        );
    };
    yt$sharing$EmbedShare.prototype.eh = function () {
        var a = this.Ea.checked;
        var b = yt$prefs$UserPrefs.getInstance();
        yt$prefs$UserPrefs$setFlag(yt$prefs$BitFlags.de, !a);
        b.save();
        yt$sharing$EmbedShare$updateEmbedCode_(this);
    };
    yt$sharing$EmbedShare.prototype.dh = function () {
        var a = this.Ub.checked;
        var b = yt$prefs$UserPrefs.getInstance();
        yt$prefs$UserPrefs$setFlag(yt$prefs$BitFlags.ce, a);
        b.save();
        yt$sharing$EmbedShare$updateEmbedCode_(this);
    };
    yt$sharing$EmbedShare.prototype.gh = function () {
        yt$sharing$EmbedShare$updateEmbedCode_(this);
    };
    yt$sharing$EmbedShare.prototype.fh = function () {
        var a = this.Da.checked;
        var b = yt$prefs$UserPrefs.getInstance();
        yt$prefs$UserPrefs$setFlag(yt$prefs$BitFlags.ee, a);
        b.save();
        yt$sharing$EmbedShare$updateEmbedCode_(this);
    };
    yt$sharing$EmbedShare.prototype.yh = function () {
        this.focus();
    };
    yt$sharing$EmbedShare.prototype.nh = function (a) {
        a = this.$[goog$dom$getElementByClass("share-embed-size-radio", a.currentTarget).value];
        a.select();
        var b = yt$prefs$UserPrefs.getInstance();
        b.set("ems", a.name);
        b.save();
        yt$sharing$EmbedShare$updateEmbedCode_(this);
        if (a != this.mh) {
            this.focus();
        }
    };
    yt$sharing$EmbedShare.prototype.oh = function () {
        yt$sharing$EmbedShare$updateEmbedCode_(this);
    };
    var yt$sharing$EmbedSize = function (a) {
        this.name = a.value;
        this.Mb = a;
        this.width = parseInt(yt$dom$datasets$get(this.Mb, "width"), 10);
        this.height = parseInt(yt$dom$datasets$get(this.Mb, "height"), 10);
    };
    yt$sharing$EmbedSize.prototype.select = function () {
        this.Mb.checked = true;
        var a = goog$dom$getAncestorByTagNameAndClass(this.Mb, "li");
        var b = goog$dom$getAncestorByTagNameAndClass(a, "ul");
        var b = goog$dom$getElementsByTagNameAndClass("li", "selected", b);
        goog$array$forEach(b, function (a) {
            goog$dom$classes$remove(a, "selected");
        });
        goog$dom$classes$add(a, "selected");
    };
    var yt$sharing$CustomEmbedSize = function (a, b) {
        yt$sharing$EmbedSize.call(this, a);
        this.of = b;
        var c = goog$dom$getAncestorByTagNameAndClass(a, "li");
        this.Fd = goog$dom$getElementByClass("share-embed-size-custom-width", c);
        this.Ed = goog$dom$getElementByClass("share-embed-size-custom-height", c);
        yt$events$listen(this.Fd, "keyup", goog$bind(this.mi, this));
        yt$events$listen(this.Ed, "keyup", goog$bind(this.li, this));
    };
    goog$inherits(yt$sharing$CustomEmbedSize, yt$sharing$EmbedSize);
    yt$sharing$CustomEmbedSize.prototype.mi = function () {
        this.width = parseInt(this.Fd.value, 10);
        this.height = (Math.floor(this.width / this.of) || 0) + 30;
        this.Ed.value = this.height + "";
    };
    yt$sharing$CustomEmbedSize.prototype.li = function () {
        this.height = parseInt(this.Ed.value, 10) - 30;
        this.width = Math.ceil(this.height * this.of) || 0;
        this.Fd.value = this.width + "";
    };
    var yt$sharing$PlusOneButton = function (a, b, c, d, e, f, g) {
        this.c = a;
        this.bh = b;
        this.Cb = c;
        this.Tb = d;
        this.Ee = !isNaN(parseInt(e, 10));
        this.Ca = null;
        if (this.Ee) {
            this.Ca = e;
        }
        this.Yg = f || {};
        this.De = !!g;
        window.__GOOGLEAPIS = window.__GOOGLEAPIS || {};
        window.__GOOGLEAPIS.gwidget = window.__GOOGLEAPIS.gwidget || {};
        window.__GOOGLEAPIS.gwidget.lang = this.Tb;
        if (this.Ee) {
            window.__GOOGLEAPIS["googleapis.config"] = window.__GOOGLEAPIS["googleapis.config"] || {};
            window.__GOOGLEAPIS["googleapis.config"].sessionIndex = this.Ca;
        }
        this.xb();
    };
    yt$sharing$PlusOneButton.prototype.xb = function () {
        yt$net$scriptloader$load("https://apis.google.com/js/plusone.js", goog$bind(this.Ni, this));
    };
    yt$sharing$PlusOneButton.prototype.Ni = function () {
        var a = goog$getObjectByName("gapi.plusone.render");
        if (a) {
            var b = Math.floor(Math.random() * 10000);
            var c = "__PLUS_ONE_CALLBACK_" + b;
            var d = this.c.id;
            if (!d) {
                d = "plusone-button-" + b;
                this.c.id = d;
            }
            window[c] = goog$bind(this.sh, this);
            b = {
                callbackName: c,
                count: "false",
                href: this.Cb,
                size: "medium",
                source: "google:youtube"
            };
            if (this.De) {
                b.db = 1;
            }
            goog$object$extend(b, this.Yg);
            yt$style$show(this.c);
            a(d, b);
        }
    };
    yt$sharing$PlusOneButton.prototype.sh = function (a) {
        if (a.state != "off") {
            yt$tracking$share("PLUS_ONE", this.bh + "");
            if (this.De) {
                yt$window$popup(
                    yt$uri$appendQueryData("https://plusone.google.com/_/+1/confirm", {
                        url: a.url,
                        source: "google:youtube"
                    }),
                    {
                        width: 480,
                        height: 550
                    }
                );
            }
        }
    };
    var yt$sharing$SharePanel = function (a, b, c, d, e, f) {
        this.c = a;
        this.H = b || null;
        this.G = c || null;
        this.we = false;
        this.Jf = e || null;
        this.Kf = f || false;
        this.xb(d);
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
    yt$sharing$SharePanel.prototype.xb = function (a) {
        var b = goog$uri$utils$getHost() + "/share_ajax";
        yt$net$ajax$send(b, {
            format: "JSON",
            g: {
                action_get_share_box: 1,
                video_id: this.H,
                list: this.G,
                new_share_layout: true
            },
            f: function (b, d) {
                this.c.innerHTML = d.share_html;
                this.Gf = d.url_short;
                this.Ud = d.url_long;
                this.Tb = d.lang;
                this.Ca = null;
                if ("session_index" in d) {
                    this.Ca = d.session_index;
                }
                this.Aa();
                var e = goog$dom$getElementByClass("share-panel-services-dynamic", this.c);
                if (e) {
                    new yt$sharing$PlusOneButton(
                        e,
                        (this.H || this.G) + "",
                        this.Ud,
                        this.Tb,
                        this.Ca,
                        this.Jf,
                        this.Kf
                    );
                }
                if (a) {
                    a();
                }
                this.na();
            },
            j: this
        });
    };
    yt$sharing$SharePanel.prototype.Aa = function () {
        var a = goog$dom$getElementByClass("share-panel-show-url-options");
        yt$events$listen(a, "click", goog$bind(this.yg, this));
        a = goog$dom$getElementByClass("share-panel-show-more");
        yt$events$listen(a, "click", goog$bind(this.vg, this));
        a = goog$dom$getElementByClass("share-panel-embed", this.c);
        yt$events$listen(a, "click", goog$bind(this.tg, this));
        a = goog$dom$getElementByClass("share-panel-email", this.c);
        yt$events$listen(a, "click", goog$bind(this.sg, this));
        if ((a = goog$dom$getElementByClass("share-panel-hangout", this.c))) {
            yt$events$listen(a, "click", goog$bind(this.ug, this));
        }
        this.P = goog$dom$getElementByClass("share-panel-url", this.c);
        yt$events$listen(this.P, "click", goog$bind(this.zg, this));
        yt$events$listen(
            this.P,
            "focus",
            goog$bind(function () {
                goog$dom$classes$add(this.P, "focused");
            }, this)
        );
        yt$events$listen(
            this.P,
            "blur",
            goog$bind(function () {
                goog$dom$classes$remove(this.P, "focused");
            }, this)
        );
        this.hg = goog$dom$getElementByClass("share-panel-long-url", this.c);
        this.Vc = goog$dom$getElementByClass("share-panel-start-at", this.c);
        this.T = goog$dom$getElementByClass("share-panel-start-at-time", this.c);
        yt$events$listen(this.T, "keyup", goog$bind(this.Ag, this));
        yt$events$listen(this.T, "click", goog$bind(this.xg, this));
        yt$events$listen(
            this.T,
            "focus",
            goog$bind(function () {
                goog$dom$classes$add(this.T, "focused");
            }, this)
        );
        yt$events$listen(
            this.T,
            "blur",
            goog$bind(function () {
                goog$dom$classes$remove(this.T, "focused");
            }, this)
        );
        this.me = goog$dom$getElementByClass("share-panel-hd", this.c);
        this.ne = goog$dom$getElementByClass("share-panel-include-list", this.c);
        this.Wb = goog$dom$getElementByClass("share-panel-url-options", this.c);
        yt$events$listen(this.Wb, "click", goog$bind(this.Xc, this));
        this.Rc = goog$dom$getElementByClass("share-panel-services", this.c);
        this.fe = goog$dom$getElementByClass("share-panel-buttons", this.c);
        a = goog$dom$getElementByClass("share-panel-show-more", this.c);
        yt$events$listen(a, "click", goog$bind(this.wg, this));
    };
    yt$sharing$SharePanel.prototype.na = function () {
        if (this.P && !goog$dom$classes$has(this.P, "focused")) {
            this.P.focus();
            this.P.select();
        }
    };
    var yt$sharing$setStartTime = function (a) {
        var b = yt$sharing$sharePanel_;
        if (b.T && !goog$dom$classes$has(b.T, "focused") && !b.we) {
            b.T.value = a;
            b.Xc();
        }
    };
    yt$sharing$SharePanel.prototype.Xc = function () {
        if (!goog$dom$classes$has(this.P, "focused")) {
            var a = this.Gf;
            if (this.hg.checked) {
                a = this.Ud;
            }
            var b = {};
            if (this.me && this.me.checked) {
                b.hd = 1;
            }
            if (this.ne && this.ne.checked) {
                b.list = this.G;
            }
            var c = this.Vc.checked && yt$sharing$SharePanel$parseStartTime_(this.T.value);
            if (c) {
                b.t = c;
            }
            a = yt$uri$appendQueryData(a, b);
            if (this.P.value != a) {
                this.P.value = a;
            }
        }
    };
    yt$sharing$SharePanel.prototype.Ag = function () {
        this.we = true;
        this.Vc.checked = true;
        this.Xc();
    };
    yt$sharing$SharePanel.prototype.xg = function () {
        this.Vc.checked = true;
        if (!this.T.value.match(/[1-9]/)) {
            this.T.value = "";
        }
    };
    yt$sharing$SharePanel.prototype.zg = function () {
        this.P.select();
    };
    yt$sharing$SharePanel.prototype.sg = function () {
        var a = yt$uix$Expander.getInstance();
        a.collapse(this.fe);
        a.collapse(this.Wb);
        a.collapse(this.Rc);
        if (this.S) {
            yt$style$hide(this.S);
        }
        if (!this.R) {
            this.R = goog$dom$getElementByClass("share-panel-email-container", this.c);
        }
        yt$style$toggleOne_(this.R);
        if (!yt$dom$datasets$get(this.R, "disabled") && yt$style$isDisplayed(this.R)) {
            if (this.pe) {
                this.pe.na();
            } else {
                this.pe = new yt$sharing$EmailShare(this.R, this.Ca, this.H, this.G);
            }
        }
    };
    yt$sharing$SharePanel.prototype.ug = function () {
        var a = yt$www$watch$getPlayerReference_();
        if (a && a.pauseVideo) {
            a.pauseVideo();
        }
        var a = yt$uri$appendQueryData("https://talkgadget.google.com/hangouts", {
            hl: this.Tb,
            authuser: this.Ca,
            gid: "youtube",
            gd: this.H
        });
        var b = window.screen.height;
        var c = Math.min(window.screen.width * 0.9, 1000);
        var b = Math.min(b * 0.9, 800);
        yt$tracking$share("HANGOUT", this.H + "");
        yt$window$popup(a, {
            width: c,
            height: b
        });
    };
    yt$sharing$SharePanel.prototype.tg = function () {
        var a = yt$uix$Expander.getInstance();
        a.collapse(this.fe);
        a.collapse(this.Wb);
        a.collapse(this.Rc);
        if (this.R) {
            yt$style$hide(this.R);
        }
        if (!this.S) {
            this.S = goog$dom$getElementByClass("share-panel-embed-container", this.c);
        }
        yt$style$toggleOne_(this.S);
        if (!yt$dom$datasets$get(this.S, "disabled") && yt$style$isDisplayed(this.S)) {
            if (this.re) {
                this.re.na();
            } else {
                this.re = new yt$sharing$EmbedShare(this.S, this.H, this.G);
            }
        }
    };
    yt$sharing$SharePanel.prototype.yg = function () {
        yt$uix$Expander.getInstance().collapse(this.Rc);
        if (this.R) {
            yt$style$hide(this.R);
        }
        if (this.S) {
            yt$style$hide(this.S);
        }
    };
    yt$sharing$SharePanel.prototype.vg = function () {
        yt$uix$Expander.getInstance().collapse(this.Wb);
        if (this.R) {
            yt$style$hide(this.R);
        }
        if (this.S) {
            yt$style$hide(this.S);
        }
    };
    yt$sharing$SharePanel.prototype.wg = function () {
        if (this.R) {
            yt$style$hide(this.R);
        }
        if (this.S) {
            yt$style$hide(this.S);
        }
    };
    var yt$player$PlayerActions = function () {};
    yt$player$PlayerActions.prototype.jf = false;
    yt$player$PlayerActions.prototype.Hb = null;
    yt$player$PlayerActions.prototype.kc = null;
    yt$player$PlayerActions.prototype.Yh = function () {
        if (!this.jf) {
            this.jf = true;
            this.Hb = goog$dom$getElementByClass("player-root", undefined);
            this.kc = goog$dom$getElementByClass("player-actions-container", this.Hb);
            var a = goog$dom$getElementByClass("player-actions-close", this.kc);
            yt$events$listen(a, "click", goog$bind(this.Z, this));
        }
    };
    yt$player$PlayerActions.prototype.Z = function () {
        goog$dom$classes$enable(this.Hb, "actions-mode", false);
    };
    yt$player$PlayerActions.prototype.Xh = function () {
        if (this.Hb.clientWidth < 600) {
            goog$dom$classes$add(this.kc, "small-view");
        }
    };
    yt$player$PlayerActions.prototype.Dd = null;
    yt$player$PlayerActions.prototype.Oi = function (a, b) {
        this.Yh();
        goog$dom$classes$enable(this.Hb, "actions-mode", true);
        if (this.Dd) {
            this.Dd.na();
        } else {
            var c = goog$dom$getElementByClass("player-actions-share", this.kc);
            this.Dd = new yt$sharing$SharePanel(c, a, b, goog$bind(this.Xh, this), {
                db: 1
            });
        }
    };
    goog$debug$Console$autoInstall();
    var yt$player$logger = goog$debug$LogManager$getLogger("yt.player.logger");
    yt$player$logger.Cc(goog$debug$Logger$Level$INFO);
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
    var yt$player$embed = function (a, b, c) {
        var d = goog$dom$getElement(a);
        if (d) {
            var e;
            e = b instanceof yt$player$Config ? b : new yt$player$Config(b);
            var b = !!e.disable.html5;
            var a = !!e.disable.flash;
            var f = yt$player$canPlayHtml5_() && (goog$getObjectByName("yt.player.VideoPlayer") || e.assets.js);
            if (!e.args.eurl) {
                e.args.eurl = yt$player$getEmbedReferrer_();
            }
            e.args.enablejsapi = "1";
            var g = false;
            if (e.html5) {
                g = true;
            }
            if (g && !f) {
                e.args.html5_unavailable = "1";
            }
            var j = {
                pubsub: new goog$pubsub$PubSub(),
                subscribedEvents: {}
            };
            var o = d;
            if (!c) {
                yt$player$prepareContainer_(d);
                o = goog$dom$getElementByClass("player-container", d);
            }
            var d = "player" + goog$getUid(o);
            var x = !e.args.jsapicallback;
            var C = {
                target: o,
                playerId: d,
                playerapiid: e.args.playerapiid,
                jsapicallback: yt$player$resolveCallback_(e.args.jsapicallback),
                elementId: e.attrs.id,
                api: j,
                onReadyCalled: false,
                eventLabel: e.args.el,
                actions: new yt$player$PlayerActions()
            };
            e.args.playerapiid = d;
            e.args.jsapicallback = "ytPlayerOnYouTubePlayerReady";
            var F;
            var I;
            var ka = !c ? yt$player$embedFlash_ : yt$flash$update;
            if (g && f) {
                F = yt$player$embedHtml5_;
                if (!a) {
                    I = ka;
                }
            } else {
                F = ka;
                if (f && !b) {
                    I = yt$player$embedHtml5_;
                }
            }
            if (I) {
                e.fallback = function (a) {
                    a = a || e;
                    if (!(a instanceof yt$player$Config)) {
                        a = new yt$player$Config(a);
                    }
                    delete a.fallback;
                    if (g) {
                        a.args.autoplay = 1;
                    } else {
                        yt$net$ajax$send("/html5", {
                            kb: true,
                            method: "POST",
                            n: {
                                prefer_html5: true,
                                session_token: yt$net$ajax$tokenMap_.html5_ajax
                            }
                        });
                    }
                    a.attrs.id = C.elementId;
                    I(o, a);
                };
            }
            e.fallbackMessage = yt$player$createFallbackMessage_(o);
            yt$player$playerReferences_[d] = C;
            yt$setTimeout(function () {
                if (c) {
                    var a = goog$dom$getElement(e.attrs.id);
                    var b = false;
                    try {
                        a.getApiInterface();
                        b = true;
                    } catch (d) {}
                    if (x) {
                        window.onYouTubePlayerReady = function () {
                            ytPlayerOnYouTubePlayerReady(C.playerId);
                        };
                    }
                    F(e, c.force);
                    if (b) {
                        ytPlayerOnYouTubePlayerReady(C.playerId);
                    }
                } else {
                    F(o, e);
                }
            }, 0);
            return j;
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
    var yt$player$prepareContainer_ = function (a) {
        goog$dom$classes$add(a, "player-root");
        if (goog$isString("overflow")) {
            goog$style$setStyle_(a, "hidden", "overflow");
        } else {
            goog$object$forEach("overflow", goog$partial(goog$style$setStyle_, a));
        }
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
            b.api.addEventListener("SHARE_CLICKED", goog$bind(b.actions.Oi, b.actions));
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
    goog$exportSymbol("yt.net.ajax.setToken", yt$net$ajax$setToken);
    goog$exportSymbol("yt.tracking.share", yt$tracking$share);
    goog$exportSymbol("yt.window.popup", yt$window$popup);
    yt$uix$initWidget(yt$uix$Button);
    yt$uix$initWidget(yt$uix$Expander);
    yt$uix$initWidget(yt$uix$Tooltip);
    yt$uix$initWidget(yt$uix$RangeTooltip);
    goog$debug$Console$autoInstall();
    var yt$timing = goog$getObjectByName("yt.timing") || {};
    goog$exportSymbol("yt.timing", yt$timing);
    yt$timing.vi = 0;
    yt$timing.tf = 0;
    yt$timing.Bc = function (a, b) {
        var c = yt$timing.timer || {};
        c[a] = b ? b : goog$now();
        yt$timing.timer = c;
    };
    yt$timing.info = function (a, b) {
        var c = yt$timing.info_args || {};
        c[a] = b;
        yt$timing.info_args = c;
    };
    yt$timing.Gc = function (a) {
        var a = a || yt$getConfig("TIMING_ACTION");
        var b = yt$timing.timer || {};
        var c = yt$timing.info_args || {};
        var d = b.start;
        var e = "";
        var f = [];
        var g = [];
        delete b.start;
        if (yt$timing.srt) {
            e = "&srt=" + yt$timing.srt;
        }
        if (b.aft && b.plev) {
            b.aft = Math.min(b.aft, b.plev);
        }
        for (var j in b) {
            f.push(j + "." + Math.round(b[j] - d));
        }
        for (j in c) {
            g.push(j + "=" + c[j]);
        }
        if (b.vr && b.gv) {
            f.push("vl." + Math.round(b.vr - b.gv));
        }
        if (!b.aft && b.vr && b.cl) {
            if (b.cl > b.vr) {
                f.push("aft." + Math.round(b.cl - d));
            } else {
                f.push("aft." + Math.round(b.vr - d));
            }
        } else if (!b.aft && b.vr) {
            f.push("aft." + Math.round(b.vr - d));
        } else if (!b.aft) {
            f.push("aft." + Math.round(b.ol - d));
        }
        yt$net$ping$send(
            [
                window.location.protocol == "https:" ? "https://gg.google.com/csi" : "http://csi.gstatic.com/csi",
                "?v=2&s=youtube&action=",
                a,
                e,
                "&",
                g.join("&"),
                "&rt=",
                f.join(",")
            ].join("")
        );
    };
    yt$timing.Od = function () {
        var a = yt$getConfig("TIMING_ACTION");
        var b = yt$timing.timer || {};
        if (a && b.start) {
            if (yt$timing.wff && a.indexOf("ajax") != -1 && b.vr && b.cl) {
                yt$timing.Gc();
            } else if (yt$timing.wff && a.indexOf("ajax") == -1 && b.vr) {
                yt$timing.Gc();
            } else if (!yt$timing.wff && (b.ol || b.aft)) {
                yt$timing.Gc();
            }
        }
    };
    yt$timing.Df = function () {
        yt$timing.Bc("ol");
        yt$timing.Od();
    };
    yt$timing.Li = function (a) {
        var b = ++yt$timing.vi;
        if (typeof a != "undefined" && a < 4) {
            yt$timing.tf++;
        }
        if (yt$timing.tf == 4) {
            yt$timing.Bc("tn_c4");
        }
        if (b == 1 || b == 5 || b == 10 || b == 20 || b == 30) {
            yt$timing.Bc("tn" + b);
        }
    };
    var yt$uix$CharCounter = function () {
        this.L = {};
    };
    goog$inherits(yt$uix$CharCounter, yt$uix$BaseWidget);
    goog$addSingletonGetter(yt$uix$CharCounter);
    yt$uix$CharCounter.prototype.K = "char-counter";
    yt$uix$CharCounter.prototype.M = function () {
        this.addBehavior("keydown", this.Sd, "input");
        this.addBehavior("paste", this.Sd, "input");
        this.addBehavior("cut", this.Sd, "input");
    };
    yt$uix$CharCounter.prototype.Sd = function (a) {
        var b = yt$uix$BaseWidget$findWidgetElement_(this, a);
        if (b) {
            var c = this.getData(b, "count-char-by-size") == "true";
            var d = parseInt(this.getData(b, "char-limit"), 10);
            if (!isNaN(d) && !(d <= 0)) {
                yt$setTimeout(
                    goog$bind(function () {
                        var e = parseInt(a.getAttribute("maxlength"), 10);
                        if (!isNaN(e)) {
                            var f = yt$uix$CharCounter$getLength_(a, c);
                            if (c) {
                                if (f > e) {
                                    var g = a.value;
                                    var j = g.length;
                                    var o = 0;
                                    var e = f - e;
                                    var f = "";
                                    var x = 0;
                                    do {
                                        f += g[j - o];
                                        x = unescape(encodeURIComponent(f)).length;
                                        o++;
                                    } while (x < e);
                                    a.value = a.value.substring(0, j - o);
                                }
                            } else if (f > e) {
                                a.value = a.value.substring(0, e);
                            }
                        }
                        g = parseInt(this.getData(b, "warn-at-chars-remaining"), 10);
                        if (isNaN(g)) {
                            g = 0;
                        }
                        j = d - yt$uix$CharCounter$getLength_(a, c);
                        goog$dom$classes$enable(b, yt$uix$BaseWidget$getCssClass(this, "maxed-out"), j < g);
                        goog$dom$getElementByClass(yt$uix$BaseWidget$getCssClass(this, "remaining"), b).innerHTML = j;
                    }, this),
                    0
                );
            }
        }
    };
    var yt$uix$CharCounter$getLength_ = function (a, b) {
        var c = a.value;
        if (b) {
            return unescape(encodeURIComponent(c)).length;
        } else {
            return c.length;
        }
    };
    var yt$uix$Card = function () {
        this.L = {};
    };
    goog$inherits(yt$uix$Card, yt$uix$BaseWidget);
    yt$uix$Card.prototype.Kd = function () {
        if (this.Ld && goog$userAgent$VERSION.indexOf("6") == 0) {
            return false;
        } else {
            return true;
        }
    };
    yt$uix$Card.prototype.show = function (a) {
        var b = yt$uix$BaseWidget$findWidgetElement_(this, a);
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
                this.wa(b, "card-action", a);
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
        var g = a.rb(c);
        if (!g) {
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
        goog$dom$removeNode(g);
        e.appendChild(g);
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
        var g = e == "bottomright" || e == "bottomleft";
        var e = e == "topright" || e == "bottomright";
        var j;
        var o;
        if (e && g) {
            o = 7;
            j = 4;
        } else if (e && !g) {
            o = 6;
            j = 5;
        } else if (!e && g) {
            o = 5;
            j = 6;
        } else {
            o = 4;
            j = 7;
        }
        var x = goog$style$isRightToLeft(document.body);
        var C = goog$style$isRightToLeft(b);
        if (x != C) {
            o ^= 2;
        }
        var F;
        if (d) {
            C = b.offsetHeight / 2 - 24;
            F = new goog$math$Coordinate(-12, b.offsetHeight + 6);
        } else {
            C = b.offsetWidth / 2 - 12;
            F = new goog$math$Coordinate(b.offsetWidth + 6, -12);
        }
        var I = null;
        if (!f) {
            I = 10;
        }
        var ka = yt$uix$BaseWidget$getCssClass(a, "card-flip");
        var a = yt$uix$BaseWidget$getCssClass(a, "card-reverse");
        goog$dom$classes$enable(c, ka, e);
        goog$dom$classes$enable(c, a, g);
        I = goog$positioning$positionAtAnchor(b, o, c, j, F, null, I);
        if (!f && I) {
            if (I & 48) {
                e = !e;
                o ^= 2;
                j ^= 2;
            }
            if (I & 192) {
                g = !g;
                o ^= 1;
                j ^= 1;
            }
            goog$dom$classes$enable(c, ka, e);
            goog$dom$classes$enable(c, a, g);
            goog$positioning$positionAtAnchor(b, o, c, j, F);
        }
        b = goog$dom$getElementByClass("yt-uix-card-body-arrow", c);
        f = goog$dom$getElementByClass("yt-uix-card-border-arrow", c);
        c = goog$style$getSize(c);
        C = Math.max(6, Math.min(C, (d ? c.height : c.width) - 24 - 6));
        c = d ? (g ? "top" : "bottom") : (!x && e) || (x && !e) ? "left" : "right";
        b.setAttribute("style", "");
        f.setAttribute("style", "");
        b.style[c] = C + "px";
        f.style[c] = C + "px";
    };
    yt$uix$Card.prototype.Z = function (a) {
        var b = yt$uix$BaseWidget$findWidgetElement_(this, a);
        if (b && (a = yt$uix$Card$getCard_(this, a, b))) {
            goog$dom$classes$remove(b, yt$uix$BaseWidget$getCssClass(this, "active"));
            goog$dom$classes$remove(a, yt$uix$BaseWidget$getCssClass(this, "card-visible"));
            yt$style$hide(a);
            a.cardTargetNode = null;
            a.cardRootNode = null;
        }
    };
    var yt$uix$Card$isActive = function (a, b) {
        var c = yt$uix$BaseWidget$findWidgetElement_(a, b);
        if (!c) {
            return false;
        } else {
            return goog$dom$classes$has(c, yt$uix$BaseWidget$getCssClass(a, "active"));
        }
    };
    yt$uix$Card.prototype.rb = function (a) {
        var b = a.cardContentNode;
        if (!b) {
            var c = yt$uix$BaseWidget$getCssClass(this, "content");
            var d = yt$uix$BaseWidget$getCssClass(this, "card-content");
            var b = goog$dom$getElementByClass(c, a);
            goog$dom$classes$addRemove(b, c, d);
            a.cardContentNode = b;
        }
        return b;
    };
    yt$uix$Card.prototype.nf = {
        ji: 200,
        Ai: 200
    };
    var yt$uix$Clickcard = function () {
        this.L = {};
    };
    goog$inherits(yt$uix$Clickcard, yt$uix$Card);
    goog$addSingletonGetter(yt$uix$Clickcard);
    yt$uix$Clickcard.prototype.K = "clickcard";
    yt$uix$Clickcard.prototype.M = function () {
        this.addBehavior("click", this.Fi, "target");
        this.addBehavior("click", this.Ei, "close");
    };
    yt$uix$Clickcard.prototype.Fi = function (a) {
        var b = yt$uix$BaseWidget$findWidgetElement_(this, a);
        if (goog$dom$classes$has(b, yt$uix$BaseWidget$getCssClass(this, "active"))) {
            this.Z(a);
            goog$dom$classes$remove(b, yt$uix$BaseWidget$getCssClass(this, "active"));
        } else {
            this.show(a);
            goog$dom$classes$add(b, yt$uix$BaseWidget$getCssClass(this, "active"));
        }
    };
    yt$uix$Clickcard.prototype.Ei = function (a) {
        if ((a = yt$dom$getAncestorByClass(a, yt$uix$BaseWidget$getCssClass(this, "card")))) {
            this.Z(a.cardTargetNode);
        }
    };
    var yt$uix$FormInput = function () {
        this.L = {};
    };
    goog$inherits(yt$uix$FormInput, yt$uix$BaseWidget);
    goog$addSingletonGetter(yt$uix$FormInput);
    yt$uix$FormInput.prototype.K = "form-input";
    yt$uix$FormInput.prototype.M = function () {
        if (goog$userAgent$IE && !goog$userAgent$isVersion(9)) {
            this.addBehavior("click", this.pf, "checkbox");
            this.addBehavior("keypressed", this.pf, "checkbox");
            this.addBehavior("click", this.qf, "radio");
            this.addBehavior("keypressed", this.qf, "radio");
        }
        this.addBehavior("blur", this.hi, "select-element");
        this.addBehavior("change", this.Hd, "select-element");
        this.addBehavior("focus", this.ii, "select-element");
        this.addBehavior("keyup", this.Gd, "text");
        this.addBehavior("keyup", this.Gd, "textarea");
        this.addBehavior("keyup", this.Gd, "bidi");
    };
    yt$uix$FormInput.prototype.pf = function (a) {
        var b = goog$dom$getAncestorByTagNameAndClass(
            a,
            null,
            yt$uix$BaseWidget$getCssClass(this, "checkbox-container")
        );
        goog$dom$classes$enable(b, "checked", a.checked);
    };
    yt$uix$FormInput.prototype.qf = function () {
        var a = goog$dom$getElementsByClass(yt$uix$BaseWidget$getCssClass(this, "radio"));
        var b = yt$uix$BaseWidget$getCssClass(this, "radio-container");
        goog$array$forEach(a, function (a) {
            var d = goog$dom$getAncestorByTagNameAndClass(a, null, b);
            if (d) {
                goog$dom$classes$enable(d, "checked", a.checked);
            }
        });
    };
    yt$uix$FormInput.prototype.Gd = function (a) {
        var b = a.value;
        var c = "";
        if (goog$i18n$bidi$isRtlText(b)) {
            c = "rtl";
        } else if (goog$i18n$bidi$ltrDirCheckRe_.test(b)) {
            c = "ltr";
        }
        a.dir = c;
    };
    yt$uix$FormInput.prototype.ii = function (a) {
        a = goog$dom$getAncestorByTagNameAndClass(a, null, yt$uix$BaseWidget$getCssClass(this, "select"));
        goog$dom$classes$add(a, "focused");
    };
    yt$uix$FormInput.prototype.hi = function (a) {
        a = goog$dom$getAncestorByTagNameAndClass(a, null, yt$uix$BaseWidget$getCssClass(this, "select"));
        goog$dom$classes$remove(a, "focused");
    };
    yt$uix$FormInput.prototype.Hd = function (a) {
        var b = goog$dom$getAncestorByTagNameAndClass(a, null, yt$uix$BaseWidget$getCssClass(this, "select"));
        var b = goog$dom$getElementByClass(yt$uix$BaseWidget$getCssClass(this, "select-value"), b);
        var a = a.options[a.selectedIndex];
        b.innerHTML = a.text ? a.text : a.value;
    };
    var yt$uix$Hovercard = function () {
        this.L = {};
    };
    goog$inherits(yt$uix$Hovercard, yt$uix$Card);
    goog$addSingletonGetter(yt$uix$Hovercard);
    yt$uix$Hovercard.prototype.K = "hovercard";
    yt$uix$Hovercard.prototype.M = function () {
        this.addBehavior("mouseover", this.yi, "target", 5, true);
        this.addBehavior("mouseout", this.wi, "target", 5, true);
        this.addBehavior("mouseover", this.zi, "card", 100);
        this.addBehavior("mouseout", this.xi, "card", 100);
    };
    yt$uix$Hovercard.prototype.yi = function (a) {
        if (yt$uix$Hovercard$activeTarget_ != a) {
            if (yt$uix$Hovercard$activeTarget_) {
                this.Z(yt$uix$Hovercard$activeTarget_);
                yt$uix$Hovercard$activeTarget_ = null;
            }
            var b = goog$bind(this.show, this, a);
            var c = parseInt(this.getData(a, "delay-show"), 10);
            var b = yt$setTimeout(b, c > -1 ? c : this.nf.ji);
            this.setData(a, "card-timer", b.toString());
            yt$uix$Hovercard$activeTarget_ = a;
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
    yt$uix$Hovercard.prototype.wi = function (a) {
        var b = parseInt(this.getData(a, "card-timer"), 10);
        yt$clearTimeout(b);
        yt$uix$BaseWidget$findWidgetElement_(this, a).isCardHidable = true;
        b = parseInt(this.getData(a, "delay-hide"), 10);
        b = b > -1 ? b : this.nf.Ai;
        yt$setTimeout(goog$bind(this.Ci, this, a), b);
        if ((b = this.getData(a, "card-alt"))) {
            a.alt = b;
        }
        if ((b = this.getData(a, "card-title"))) {
            a.title = b;
        }
    };
    yt$uix$Hovercard.prototype.Ci = function (a) {
        if (yt$uix$BaseWidget$findWidgetElement_(this, a).isCardHidable) {
            this.Z(a);
            yt$uix$Hovercard$activeTarget_ = null;
        }
    };
    yt$uix$Hovercard.prototype.zi = function (a) {
        if (a) {
            a.cardRootNode.isCardHidable = false;
        }
    };
    yt$uix$Hovercard.prototype.xi = function (a, b, c) {
        if (a) {
            b = a.cardTargetNode;
            if (!goog$dom$contains(a, c.relatedTarget)) {
                this.Z(b);
            }
        }
    };
    var yt$uix$Hovercard$activeTarget_ = null;
    var yt$uix$RedirectLink = function () {
        this.L = {};
    };
    goog$inherits(yt$uix$RedirectLink, yt$uix$BaseWidget);
    goog$addSingletonGetter(yt$uix$RedirectLink);
    yt$uix$RedirectLink.prototype.K = "redirect-link";
    yt$uix$RedirectLink.prototype.M = function () {
        this.addBehavior("click", this.ma);
    };
    yt$uix$RedirectLink.prototype.ma = function (a) {
        if (!yt$dom$datasets$get(a, "redirect-href-updated")) {
            yt$dom$datasets$set(a, "redirect-href-updated", "true");
            var b = yt$getConfig("XSRF_REDIRECT_TOKEN");
            var c = yt$getConfig("XSRF_FIELD_NAME");
            if (b && c) {
                var d = {};
                d.q = a.href;
                d[c] = b;
                a.href = yt$uri$appendQueryData("/redirect", d);
            }
        }
    };
    var yt$uix$Sessionlink = function () {
        this.L = {};
    };
    goog$inherits(yt$uix$Sessionlink, yt$uix$BaseWidget);
    goog$addSingletonGetter(yt$uix$Sessionlink);
    yt$uix$Sessionlink.prototype.K = "sessionlink";
    yt$uix$Sessionlink.prototype.M = function () {
        this.addBehavior("click", this.ma);
    };
    yt$uix$Sessionlink.prototype.ma = function (a) {
        var b = yt$dom$datasets$get(a, "sessionlink-target") || a.href;
        if (b) {
            var c = goog$uri$utils$getDomain(b);
            if (c == window.location.host || (!c && b.lastIndexOf("/", 0) == 0)) {
                b = goog$uri$utils$getPathAndAfter(b);
                c = b.indexOf("#");
                if ((b = c < 0 ? b : b.substr(0, c))) {
                    a = yt$dom$datasets$get(a, "sessionlink") || "";
                    a = yt$uri$parseQueryData(a);
                    b = "s_tempdata-" + goog$string$hashCode(b);
                    a = a ? yt$uri$buildQueryData(a) : "";
                    yt$net$cookies$set(b, a, 5);
                }
            }
        }
    };
    var yt$uix$Tile = function () {
        this.L = {};
    };
    goog$inherits(yt$uix$Tile, yt$uix$BaseWidget);
    goog$addSingletonGetter(yt$uix$Tile);
    yt$uix$Tile.prototype.K = "tile";
    yt$uix$Tile.prototype.M = function () {
        this.addBehavior("click", this.ma);
    };
    yt$uix$Tile.prototype.ma = function (a, b, c) {
        if (
            !goog$dom$getAncestorByTagNameAndClass(c.target, "a") &&
            !goog$dom$getAncestorByTagNameAndClass(c.target, "button") &&
            (a = goog$dom$getElementByClass(yt$uix$BaseWidget$getCssClass(this, "link"), a))
        ) {
            if (goog$userAgent$IE && !goog$userAgent$isVersion(9)) {
                a.click();
            } else {
                yt$window$redirect(a.href);
            }
        }
    };
    var yt$www$ads$MastheadAd = function (a, b, c) {
        this.oi = b;
        this.qi = c;
        this.ri = "ad_creative_" + a;
        this.pi = "ad_creative_expand_btn_" + a;
        this.ni = "ad_creative_collapse_btn_" + a;
    };
    yt$www$ads$MastheadAd.prototype.collapse = function () {
        yt$style$hide(this.ri);
        yt$www$thumbnaildelayload$registerDelayLoad(goog$dom$getElement("page"), true);
        yt$www$thumbnaildelayload$loadAllAbove_();
        if (!this.qi) {
            yt$style$hide(this.ni);
        }
        yt$style$show(this.pi);
        var a = yt$prefs$UserPrefs.getInstance();
        a.set("HIDDEN_MASTHEAD_ID", this.oi);
        a.save();
        yt$tracking$track("homepage_collapse_masthead_ad", undefined, undefined);
    };
    yt$www$ads$MastheadAd.prototype.expand = function () {
        var a = yt$prefs$UserPrefs.getInstance();
        a.set("HIDDEN_MASTHEAD_ID", false);
        a.save();
        yt$tracking$track("homepage_expand_masthead_ad", undefined, undefined);
        yt$window$redirect(document.location.href);
    };
    var yt$www$comments$getErrorMessage_ = function (a) {
        var b;
        switch (a) {
            case "PENDING":
                b = yt$getMsg("COMMENT_PENDING");
                break;
            case "BLOCKED":
                b = yt$getMsg("COMMENT_BLOCKED");
                break;
            case "EMAIL":
                b = yt$getMsg("COMMENT_ERROR_EMAIL");
                break;
            case "INLINE_CAPTCHAFAIL":
                b = yt$getMsg("COMMENT_CAPTCHAFAIL");
        }
        return b || null;
    };
    var yt$www$comments$PostForm = function (a, b) {
        this.i = a;
        this.oa = yt$dom$getFirstElementByTagNameAndClass("button", null, a);
        this.aa = yt$dom$getFirstElementByTagNameAndClass("textarea", null, a);
        this.Fa = null;
        this.md = goog$dom$getElementByClass("comments-remaining-count", this.i);
        this.Pg = parseInt(this.md.innerHTML, 10);
        this.Wa = goog$dom$getElementByClass("comments-post-message", this.i);
        this.ae = goog$dom$getElementByClass("yt-alert-content", this.Wa);
        yt$events$listen(this.aa, "focus", goog$bind(this.Ce, this));
        yt$events$listen(this.aa, "blur", goog$bind(this.Wg, this));
        yt$events$listen(this.i, "submit", goog$bind(this.Tc, this));
        var c = goog$bind(this.Xg, this);
        yt$events$listen(this.aa, "change", c);
        yt$events$listen(this.aa, "keyup", c);
        if (b) {
            this.Ce();
        }
    };
    yt$www$comments$PostForm.prototype.reset = function () {
        yt$www$comments$PostForm$clearCaptcha_(this);
        this.aa.blur();
        goog$dom$classes$remove(this.i, "has-focus");
        this.oa.disabled = false;
        this.setValue("");
    };
    yt$www$comments$PostForm.prototype.focus = function () {
        this.aa.focus();
    };
    yt$www$comments$PostForm.prototype.setValue = function (a) {
        this.aa.value = a;
        var b = this.aa;
        var a = a.length;
        var c;
        try {
            c = typeof b.selectionStart == "number";
        } catch (d) {
            c = false;
        }
        if (c) {
            b.selectionStart = a;
            b.selectionEnd = a;
        } else if (goog$userAgent$IE) {
            if (b.type == "textarea") {
                a = b.value.substring(0, a).replace(/(\r\n|\r|\n)/g, "\n").length;
            }
            b = b.createTextRange();
            b.collapse(true);
            b.move("character", a);
            b.select();
        }
        yt$www$comments$PostForm$updateRemainingCount_(this);
    };
    var yt$www$comments$PostForm$clearCaptcha_ = function (a) {
        if (a.Fa) {
            a.Fa.innerHTML = "";
        }
    };
    var yt$www$comments$PostForm$updateRemainingCount_ = function (a) {
        var b = a.Pg - a.aa.value.length;
        a.md.innerHTML = b + "";
        b = b < 0;
        goog$dom$classes$enable(a.md, "too-many", b);
        a.oa.disabled = b;
    };
    yt$www$comments$PostForm.prototype.Xg = function () {
        yt$www$comments$PostForm$updateRemainingCount_(this);
    };
    yt$www$comments$PostForm.prototype.Ce = function () {
        if (!goog$dom$classes$has(this.i, "has-focus")) {
            yt$style$hide(this.Wa);
        }
        goog$dom$classes$add(this.i, "has-focus");
        yt$pubsub$publish("comments-focus", this.i);
    };
    yt$www$comments$PostForm.prototype.Wg = function () {
        yt$pubsub$publish("comments-blur", this.i);
    };
    yt$www$comments$PostForm.prototype.Tc = function (a) {
        a.preventDefault();
        if (!this.oa.disabled) {
            this.oa.disabled = true;
            a = yt$uri$parseQueryData(goog$dom$forms$getFormDataString(this.i));
            a.screen = yt$uri$buildQueryData({
                h: window.screen.height,
                w: window.screen.width,
                d: window.screen.colorDepth
            });
            var b = a.comment;
            var b = {
                return_ajax: "true",
                len: b.length,
                wc: b.split(/\s+/).length
            };
            if (this.i.reply_parent_id.value) {
                b.reply = 1;
            }
            yt$net$ajax$send(this.i.action, {
                format: "XML",
                method: "POST",
                g: b,
                n: a,
                ga: function (a, b) {
                    var e = b.str_code;
                    switch (e) {
                        case "OK":
                            e = document.createElement("ul");
                            e.innerHTML = b.html_content;
                            e = goog$dom$getFirstElementChild(e);
                            if (this.i.reply_parent_id.value) {
                                var f = goog$dom$getAncestorByTagNameAndClass(this.i, null, "comments-post-container");
                                var g = goog$dom$getAncestorByTagNameAndClass(f, null, "comment");
                                goog$dom$removeNode(f);
                                goog$dom$classes$addRemove(g, "replying", "has-child");
                                goog$dom$classes$add(e, "child");
                                goog$dom$classes$enable(
                                    e,
                                    "last",
                                    !(g.nextElementSibling != undefined
                                        ? g.nextElementSibling
                                        : goog$dom$getNextElementNode_(g.nextSibling))
                                );
                                if (g.parentNode) {
                                    g.parentNode.insertBefore(e, g.nextSibling);
                                }
                            } else {
                                f = goog$dom$getAncestorByTagNameAndClass(this.i, null, "comments-section");
                                f = goog$dom$getElementByClass("comment-list", f);
                                f.insertBefore(e, f.childNodes[0] || null);
                                this.reset();
                            }
                            yt$www$thumbnaildelayload$loadImmediately(e);
                            break;
                        case "PENDING":
                            yt$www$comments$PostForm$clearCaptcha_(this);
                            this.ae.innerHTML = yt$getMsg("COMMENT_PENDING");
                            goog$dom$classes$addRemove(this.Wa, "yt-alert-error", "yt-alert-info");
                            yt$style$show(this.Wa);
                            break;
                        default:
                            yt$www$comments$PostForm$handleError_(this, e);
                    }
                },
                j: this
            });
        }
    };
    var yt$www$comments$PostForm$handleError_ = function (a, b) {
        a.ae.innerHTML = yt$www$comments$getErrorMessage_(b) || yt$getMsg("COMMENT_ERROR");
        goog$dom$classes$addRemove(a.Wa, "yt-alert-info", "yt-alert-error");
        yt$style$show(a.Wa);
        switch (b) {
            case "INLINE_CAPTCHA":
            case "INLINE_CAPTCHAFAIL":
                yt$net$ajax$send("/comment_servlet?gimme_captcha=1", {
                    format: "XML",
                    method: "POST",
                    n: {
                        session_token: yt$net$ajax$tokenMap_.comment_servlet
                    },
                    f: function (a, b) {
                        if (!this.Fa) {
                            this.Fa = document.createElement("div");
                            this.Fa.className = "comment-captcha";
                            var e = this.aa;
                            if (e.parentNode) {
                                e.parentNode.insertBefore(this.Fa, e.nextSibling);
                            }
                        }
                        this.Fa.innerHTML = b.html_content;
                        this.oa.disabled = false;
                    },
                    j: a
                });
                break;
            default:
                a.oa.disabled = false;
                yt$www$comments$PostForm$clearCaptcha_(a);
        }
    };
    var yt$www$comments$CommentsSection = function (a) {
        this.c = a;
        this.Eb = goog$dom$getElementByClass("watch-more-comments-button");
        this.gg = !!yt$getConfig("ENABLE_LIVE_COMMENTS");
        this.cd();
    };
    yt$www$comments$CommentsSection.prototype.cd = function () {
        var a = goog$dom$getElementByClass("comments-pagination", this.c);
        if (a && yt$dom$datasets$get(a, "ajax-enabled")) {
            yt$events$delegateByClass(this.c, "click", goog$bind(this.th, this), "yt-uix-pager-button");
        }
        yt$events$listen(this.Eb, "click", goog$bind(this.vh, this));
        yt$events$delegateByClass(this.c, "click", goog$bind(this.uh, this), "comments-section-pop-out");
    };
    yt$www$comments$CommentsSection.prototype.th = function (a) {
        a.preventDefault();
        a = a.currentTarget;
        if (!goog$dom$classes$has(a, "yt-uix-button-toggled")) {
            var b = parseInt(yt$dom$datasets$get(a, "page"), 10);
            yt$style$show("comments-loading");
            yt$pubsub$publish("comments-page-changing");
            yt$www$comments$CommentsSection$fetchPage_(this, b, function (a) {
                if (a) {
                    this.c.innerHTML = a;
                    yt$www$thumbnaildelayload$loadImmediately(this.c);
                    var a = goog$dom$getElementByClass("comment-list", this.c);
                    var d = goog$dom$getElementByClass("live-comments-setting", this.c);
                    if (a) {
                        yt$pubsub$publish("comments-page-changed", a, d, b);
                    }
                }
                yt$style$hide("comments-loading");
            });
        }
    };
    yt$www$comments$CommentsSection.prototype.vh = function () {
        yt$style$hide(this.Eb);
        yt$style$show("watch-more-comments", "watch-more-comments-loading");
        var a = parseInt(yt$dom$datasets$get(this.Eb, "page"), 10);
        yt$www$comments$CommentsSection$fetchPage_(this, a, function (b) {
            var c = goog$dom$getElement("watch-more-comments");
            c.innerHTML += b;
            yt$www$thumbnaildelayload$loadImmediately(c);
            yt$dom$datasets$set(this.Eb, "page", a + 1);
            yt$style$show(this.Eb);
            yt$style$hide("watch-more-comments-loading");
        });
    };
    yt$www$comments$CommentsSection.prototype.uh = function () {
        yt$window$popup(yt$getConfig("COMMENTS_POPUP_URL"), {
            width: 350,
            height: 500,
            resizable: true
        });
    };
    var yt$www$comments$CommentsSection$fetchPage_ = function (a, b, c) {
        yt$dom$datasets$set(a.c, "type", "everything");
        yt$net$ajax$send("/watch_ajax?action_get_comments=1", {
            format: "XML",
            g: {
                v: yt$getConfig("VIDEO_ID"),
                p: b,
                commentthreshold: yt$getConfig("COMMENTS_THRESHHOLD"),
                commenttype: "everything",
                enable_live_comments: a.gg ? "yes" : null,
                page_size: yt$getConfig("COMMENTS_PAGE_SIZE"),
                source: yt$getConfig("COMMENT_SOURCE")
            },
            f: function (a, b) {
                c.call(this, b.html_content);
            },
            j: a
        });
    };
    var yt$www$comments$handleAction_ = function (a) {
        var b = a.currentTarget;
        var a = goog$dom$getAncestorByTagNameAndClass(b, null, "comment");
        switch (yt$dom$datasets$get(b, "action")) {
            case "approve":
                yt$www$comments$approve_(a);
                break;
            case "block":
                if (confirm(yt$getMsg("BLOCK_USER"))) {
                    yt$www$comments$setUserBlocked_(a, true);
                    goog$dom$classes$add(a, "blocked");
                }
                break;
            case "unblock":
                yt$www$comments$setUserBlocked_(a, false);
                goog$dom$classes$remove(a, "blocked");
                break;
            case "flag":
                yt$www$comments$flag_(a);
                break;
            case "unflag":
                a = yt$dom$datasets$get(a, "id");
                yt$net$ajax$send("/comment_servlet", {
                    format: "XML",
                    method: "POST",
                    n: {
                        unmark_comment_as_spam: a,
                        entity_id: yt$getConfig("VIDEO_ID"),
                        session_token: yt$net$ajax$tokenMap_.comment_servlet
                    }
                });
                break;
            case "hide":
                goog$dom$classes$add(a, "hidden");
                break;
            case "show":
                goog$dom$classes$remove(a, "hidden");
                break;
            case "remove":
                yt$www$comments$remove_(a);
                break;
            case "reply":
                if (yt$www$comments$checkCanPost_()) {
                    if (goog$dom$classes$has(a, "replying")) {
                        yt$www$comments$closeReply_(a);
                    } else {
                        goog$dom$classes$add(a, "replying");
                        yt$www$comments$closeShare_(a);
                        var b = goog$dom$getElementByClass("comments-post", goog$dom$getElement("comments-view"));
                        var b = yt$dom$cloneElementWithoutId(b);
                        var c = document.createElement("div");
                        c.className = "comments-post-container";
                        a.appendChild(c);
                        c.appendChild(b);
                        b = new yt$www$comments$PostForm(b);
                        b.reset();
                        c = yt$dom$datasets$get(a, "id");
                        if (yt$dom$datasets$has(a, "author")) {
                            b.setValue("@" + yt$dom$datasets$get(a, "author") + " ");
                        }
                        b.i.reply_parent_id.value = c;
                        b.focus();
                    }
                }
                break;
            case "share":
                yt$www$comments$openShare_(a);
                break;
            case "close-share":
                yt$www$comments$closeShare_(a);
                break;
            case "vote-up":
                yt$www$comments$vote_(a, true);
                break;
            case "vote-down":
                yt$www$comments$vote_(a, false);
        }
    };
    var yt$www$comments$checkCanPost_ = function () {
        if (yt$getConfig("COMMENTS_SIGNIN_URL")) {
            yt$window$redirect(yt$getConfig("COMMENTS_SIGNIN_URL"));
            return false;
        } else if (!yt$getConfig("COMMENTS_YPC_CAN_POST_OR_REACT_TO_COMMENT")) {
            return false;
        } else {
            return true;
        }
    };
    var yt$www$comments$approve_ = function (a) {
        var b = yt$dom$datasets$get(a, "id");
        var c = yt$getConfig("VIDEO_ID");
        goog$dom$classes$remove(a, "pending");
        yt$net$ajax$send("/comment_servlet?field_approve_comment=1", {
            format: "XML",
            method: "POST",
            n: {
                comment_id: b,
                entity_id: c,
                session_token: yt$net$ajax$tokenMap_.comment_servlet
            },
            Le: function () {
                goog$dom$classes$add(a, "pending");
            }
        });
    };
    var yt$www$comments$setUserBlocked_ = function (a, b) {
        var c = {};
        c[(b ? "" : "un") + "block_user"] = 1;
        var d = yt$dom$datasets$get(a, "author");
        yt$net$ajax$send("/link_servlet", {
            format: "XML",
            method: "POST",
            g: c,
            n: {
                session_token: yt$net$ajax$tokenMap_.link_servlet,
                friend_username: d
            }
        });
    };
    var yt$www$comments$flag_ = function (a) {
        if (yt$www$comments$checkCanPost_()) {
            var b = yt$dom$datasets$get(a, "id");
            var c = yt$getConfig("VIDEO_ID");
            yt$style$hide(a);
            goog$dom$classes$add(a, "flagged");
            yt$net$ajax$send("/comment_servlet", {
                format: "XML",
                method: "POST",
                g: {
                    mark_comment_as_spam: b,
                    entity_id: c
                },
                n: {
                    session_token: yt$net$ajax$tokenMap_.comment_servlet
                },
                Le: function () {
                    yt$style$show(a);
                    goog$dom$classes$remove(a, "flagged");
                }
            });
        }
    };
    var yt$www$comments$remove_ = function (a) {
        var b = yt$dom$datasets$get(a, "id");
        var c = yt$getConfig("VIDEO_ID");
        yt$style$hide(a);
        yt$net$ajax$send("/comment_servlet?remove_comment=1", {
            format: "XML",
            method: "POST",
            n: {
                comment_id: b,
                entity_id: c,
                session_token: yt$net$ajax$tokenMap_.comment_servlet
            },
            Le: function () {
                yt$style$show(a);
            }
        });
    };
    var yt$www$comments$closeReply_ = function (a) {
        if (goog$dom$classes$has(a, "replying")) {
            goog$dom$classes$remove(a, "replying");
            a = goog$dom$getElementByClass("comments-post-container", a);
            goog$dom$removeNode(a);
        }
    };
    var yt$www$comments$openShare_ = function (a) {
        if (!goog$dom$classes$has(a, "sharing")) {
            goog$dom$classes$add(a, "sharing");
            yt$www$comments$closeReply_(a);
            var b = yt$dom$cloneElementWithoutId(goog$dom$getElement("comment-share-area"));
            var c = document.createElement("div");
            c.className = "comments-post-container";
            a.appendChild(c);
            c.appendChild(b);
            var d = yt$dom$datasets$get(a, "id");
            var c = yt$getConfig("COMMENT_SHARE_URL");
            var c = c.replace("_COMMENT_ID_", d);
            goog$dom$getElementByClass("comment-share-url", b).value = c;
            var a = goog$dom$getElementByClass("comment-text", a);
            var e = goog$string$escapeString(goog$dom$getTextContent(goog$dom$getFirstElementChild(a)));
            var a = goog$dom$getElementsByClass("icon-comment-share", b);
            goog$array$forEach(a, function (a) {
                var b = a.getAttribute("action");
                var b = b.replace("_COMMENT_ID_", d);
                var c;
                c = b.indexOf("twitter") != -1 ? goog$string$truncate(e, 80) : goog$string$truncate(e, 150);
                b = b.replace("_COMMENT_TEXT_", c);
                yt$events$listen(
                    a,
                    "click",
                    goog$bind(
                        function (a) {
                            eval(a);
                        },
                        goog$global,
                        b
                    )
                );
            });
            yt$style$show(b);
        }
    };
    var yt$www$comments$closeShare_ = function (a) {
        if (goog$dom$classes$has(a, "sharing")) {
            goog$dom$classes$remove(a, "sharing");
            a = goog$dom$getElementByClass("comments-post-container", a);
            goog$dom$removeNode(a);
        }
    };
    var yt$www$comments$vote_ = function (a, b) {
        if (yt$www$comments$checkCanPost_() && !yt$dom$datasets$get(a, "voted")) {
            var c = yt$dom$datasets$get(a, "id");
            var d = yt$getConfig("VIDEO_ID");
            var e = yt$dom$datasets$get(a, "score");
            var f = b ? 1 : -1;
            yt$dom$datasets$set(a, "voted", f + "");
            if (b) {
                goog$dom$classes$addRemove(a, "voted-down", "voted-up");
            } else {
                goog$dom$classes$addRemove(a, "voted-up", "voted-down");
            }
            c = {
                a: f,
                id: c,
                video_id: d,
                old_vote: e
            };
            if ((d = yt$dom$datasets$get(a, "tag"))) {
                c.tag = d;
            }
            yt$net$ajax$send("/comment_voting", {
                format: "XML",
                method: "POST",
                g: c,
                n: {
                    session_token: yt$net$ajax$tokenMap_.comment_voting
                }
            });
        }
    };
    var yt$www$home$ads$adLoaded_ = false;
    var yt$www$home$ads$ieFocusApplied_ = false;
    var yt$www$addto$addToWatchLater = function (a, b, c) {
        yt$www$addto$addTo({
            Yd: a,
            Xd: "WL",
            Nc: b,
            f: c,
            B: undefined,
            j: undefined
        });
    };
    var yt$www$addto$addTo = function (a) {
        var b = {
            video_ids: a.Yd,
            playlist_id: a.If || "",
            new_playlist_name: a.$d || "",
            session_token: yt$net$ajax$tokenMap_.addto_ajax
        };
        var c = {};
        if (a.Zd) {
            c.private = a.Zd;
        }
        if (a.Nc) {
            c.feature = a.Nc;
        }
        var d = "";
        switch (a.Xd) {
            case "PL":
                d = a.$d ? "action_add_to_new_playlist" : "action_add_to_playlist";
                break;
            case "FL":
                d = "action_add_to_favorites";
                break;
            case "WL":
                d = "action_add_to_watch_later_list";
        }
        c[d] = 1;
        yt$net$ajax$send("/addto_ajax", {
            kb: true,
            format: "XML",
            method: "POST",
            g: c,
            n: b,
            j: a.j,
            B: a.B,
            f: a.f
        });
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
            if (b.Ik) {
                c.ps = b.playerStyle;
            }
            var f = [];
            var g;
            for (g in c) {
                f.push(encodeURIComponent(g) + "=" + encodeURIComponent(c[g]));
            }
            e.data = f.join(";");
        }
        if (d) {
            e.foc_id = b.uid;
        }
        return yt$uri$appendQueryData(b.baseUrl, e);
    };
    var yt$tracking$conversion$ping = function (a) {
        var b = yt$getConfig("CONVERSION_CONFIG_DICT");
        if (b && (a = yt$tracking$conversion$getPingUrl_(a, b))) {
            yt$net$ping$send(a);
        }
    };
    var yt$www$watch$AddToPanel = function (a, b) {
        this.O = a;
        this.H = b;
        yt$net$ajax$send("/playlist_ajax", {
            g: {
                action_get_addto_panel: 1,
                video_id: this.H
            },
            f: this.ig,
            j: this
        });
    };
    yt$www$watch$AddToPanel.prototype.ig = function (a, b) {
        this.O.innerHTML = b.html;
        this.Th = goog$dom$getElementByClass("added-to-message", this.O);
        this.Sh = goog$dom$getElementByClass("added-to-message-title", this.O);
        this.kg = goog$dom$getElementByClass("note-added-message", this.O);
        this.jg = goog$dom$getElementByClass("note-added-message-title", this.O);
        this.Qc();
    };
    yt$www$watch$AddToPanel.prototype.Qc = function () {
        var a = goog$dom$getElementByClass("create-playlist", this.O);
        yt$events$listen(a, "submit", goog$bind(this.fi, this));
        yt$events$delegateByClass(this.O, "click", goog$bind(this.ci, this), "playlist-item-favorite");
        yt$events$delegateByClass(this.O, "click", goog$bind(this.di, this), "playlist-item");
        yt$events$delegateByClass(this.O, "submit", goog$bind(this.ei, this), "playlist-note-form");
        yt$events$delegateByClass(this.O, "click", goog$bind(this.bi, this), "cancel-note");
    };
    yt$www$watch$AddToPanel.prototype.fi = function (a) {
        a.preventDefault();
        yt$www$watch$AddToPanel$createPlaylist_(this, goog$dom$getElementByClass("create-playlist", this.O));
    };
    var yt$www$watch$AddToPanel$createPlaylist_ = function (a, b) {
        goog$dom$classes$add(b, "loading");
        yt$net$ajax$sendForm(b, {
            j: a,
            f: function (a, d) {
                goog$dom$classes$remove(b, "loading");
                this.O.innerHTML = d.html;
            }
        });
    };
    yt$www$watch$AddToPanel.prototype.ci = function (a) {
        a.stopPropagation();
        yt$www$watch$AddToPanel$addToFavorites_(this, a.currentTarget);
    };
    var yt$www$watch$AddToPanel$addToFavorites_ = function (a, b) {
        goog$dom$classes$add(b, "loading");
        yt$net$ajax$send("/addto_ajax", {
            method: "POST",
            format: "XML",
            g: {
                action_add_to_favorites: 1
            },
            n: {
                video_ids: a.H,
                session_token: yt$net$ajax$tokenMap_.addto_ajax
            },
            j: a,
            f: function () {
                goog$dom$classes$remove(b, "loading");
                yt$www$watch$AddToPanel$showAddedMessage_(this, b);
            }
        });
    };
    yt$www$watch$AddToPanel.prototype.di = function (a) {
        var b = a.currentTarget;
        if (!goog$dom$classes$has(b, "selected")) {
            a.stopPropagation();
            yt$www$watch$AddToPanel$clearSelection_(this);
            yt$www$watch$AddToPanel$addToPlaylist_(this, b);
        }
    };
    var yt$www$watch$AddToPanel$addToPlaylist_ = function (a, b) {
        var c = yt$dom$datasets$get(b, "playlist-id");
        goog$dom$classes$add(b, "loading");
        yt$net$ajax$send("/addto_ajax", {
            method: "POST",
            format: "XML",
            g: {
                action_add_to_playlist: 1
            },
            n: {
                playlist_id: c,
                video_ids: a.H,
                session_token: yt$net$ajax$tokenMap_.addto_ajax
            },
            j: a,
            f: function (a, c) {
                this.le = c.setvideo_id;
                goog$dom$classes$remove(b, "loading");
                goog$dom$classes$add(b, "selected");
                yt$www$watch$AddToPanel$showAddedMessage_(this, b);
            }
        });
    };
    yt$www$watch$AddToPanel.prototype.ei = function (a) {
        a.preventDefault();
        yt$www$watch$AddToPanel$saveNote_(this, a.currentTarget);
    };
    yt$www$watch$AddToPanel.prototype.bi = function () {
        yt$www$watch$AddToPanel$clearSelection_(this);
    };
    var yt$www$watch$AddToPanel$saveNote_ = function (a, b) {
        goog$dom$classes$add(b, "loading");
        yt$net$ajax$sendForm(b, {
            n: {
                session_token: yt$net$ajax$tokenMap_.playlist_bar_ajax,
                setvideo_id: a.le
            },
            j: a,
            f: function () {
                yt$www$watch$AddToPanel$clearSelection_(this);
                goog$dom$classes$remove(b, "loading");
                this.jg.innerHTML = goog$dom$getElementByClass("playlist-name", b).value;
                var a = this.kg;
                if (this.zb) {
                    yt$style$hide(this.zb);
                }
                this.zb = a;
                yt$style$show(a);
            }
        });
    };
    var yt$www$watch$AddToPanel$clearSelection_ = function (a) {
        var b = goog$dom$getElementByClass("selected", a.O);
        if (b) {
            goog$dom$classes$remove(b, "selected");
            a.le = null;
        }
    };
    var yt$www$watch$AddToPanel$showAddedMessage_ = function (a, b) {
        a.Sh.innerHTML = goog$dom$getElementByClass("playlist-title", b).innerHTML;
        var c = a.Th;
        if (a.zb) {
            yt$style$hide(a.zb);
        }
        a.zb = c;
        yt$style$show(c);
    };
    var yt$www$watch$actions$rate = function (a, b) {
        var c = yt$getConfig("VIDEO_ID");
        var d = {};
        if (a) {
            d.action_like_video = 1;
        } else {
            d.action_dislike_video = 1;
        }
        b = b || {};
        d.video_id = c;
        d.plid = b.lg;
        c = {
            screen: yt$uri$buildQueryData({
                h: screen.height,
                w: screen.width,
                d: screen.colorDepth
            }),
            session_token: yt$net$ajax$tokenMap_.watch_actions_ajax
        };
        if (b.qe) {
            c.station_id = b.qe;
        }
        yt$net$ajax$send("/watch_actions_ajax", {
            format: "XML",
            method: "POST",
            g: d,
            n: c,
            f: b.f,
            B: b.B
        });
        yt$tracking$conversion$ping(a ? "like" : "dislike");
    };
    var yt$captions$TimeRange = function (a, b) {
        this.start = a;
        this.end = b;
        yt$captions$TimeRange$counter_++;
    };
    var yt$captions$TimeRange$counter_ = 0;
    yt$captions$TimeRange.prototype.contains = function (a, b) {
        return a >= this.start && a < this.end && (b == null || (a < b && b <= this.end));
    };
    new yt$captions$TimeRange(0, 0);
    var yt$captions$TEXT_ALIGNMENTS_ = ["left", "right", "center"];
    var yt$captions$DEFAULT_WINDOW_PARAMS_ = {
        id: 0,
        kf: 0,
        Qg: 7,
        Tg: 50,
        Jk: 80,
        Vg: 95,
        Ug: 15,
        Rg: 100,
        isVisible: true,
        textAlign: yt$captions$TEXT_ALIGNMENTS_[2],
        Be: 0,
        backgroundColor: "#080808",
        Sg: "#fff",
        opacity: 0.8
    };
    var yt$captions$Event = function (a) {
        this.Ha = a.fd;
        this.ba = a.ba || this.ba;
    };
    yt$captions$Event.prototype.Ha = 0;
    yt$captions$Event.prototype.ba = 0;
    yt$captions$Event.prototype.toString = function () {
        return this.Ha + ", " + this.ba;
    };
    var yt$captions$CaptionEvent = function (a) {
        yt$captions$Event.call(this, a);
        this.mc = a.text || this.mc;
        this.dd = a.$c || this.dd;
        this.ff = a.params.append || this.ff;
        this.hf = a.params.row || this.hf;
        this.gf = a.params.Hh || this.gf;
    };
    goog$inherits(yt$captions$CaptionEvent, yt$captions$Event);
    yt$captions$CaptionEvent.prototype.mc = "";
    yt$captions$CaptionEvent.prototype.ff = false;
    yt$captions$CaptionEvent.prototype.hf = 0;
    yt$captions$CaptionEvent.prototype.gf = 0;
    yt$captions$CaptionEvent.prototype.dd = 0;
    yt$captions$CaptionEvent.prototype.Ab = function () {
        return this.mc;
    };
    yt$captions$CaptionEvent.prototype.toString = function () {
        return this.Ha + ", " + this.ba + ": " + this.mc;
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
        var e = parseInt(a.getAttribute("w"), 10) || 0;
        var b = {
            fd: c,
            ba: d,
            text: b,
            $c: e,
            kf: 5,
            params: {}
        };
        if (a.getAttribute("r")) {
            b.params.row = parseInt(a.getAttribute("r"), 10);
        }
        if (a.getAttribute("c")) {
            b.params.Hh = parseInt(a.getAttribute("c"), 10);
        }
        if (a.getAttribute("append")) {
            b.kf = 6;
            b.params.append = true;
        }
        return new yt$captions$CaptionEvent(b);
    };
    var yt$captions$WindowEvent = function (a) {
        yt$captions$Event.call(this, a);
        this.id = a.$c || this.id;
        this.params = a.params;
    };
    goog$inherits(yt$captions$WindowEvent, yt$captions$Event);
    yt$captions$WindowEvent.prototype.id = 0;
    yt$captions$WindowEvent.prototype.params = null;
    yt$captions$WindowEvent.prototype.Ae = "";
    var yt$captions$createDefaultWindow_ = function () {
        return new yt$captions$WindowEvent({
            fd: -2147483648,
            ba: 4294967295,
            params: yt$captions$DEFAULT_WINDOW_PARAMS_
        });
    };
    var yt$captions$CaptionTrack = function (a) {
        this.Bb = [];
        this.nd = [];
        this.Db = {};
        if (a) {
            var b;
            if (typeof DOMParser != "undefined") {
                b = new DOMParser().parseFromString(a, "application/xml");
            } else if (typeof ActiveXObject != "undefined") {
                if ((b = new ActiveXObject("MSXML2.DOMDocument"))) {
                    b.resolveExternals = false;
                    b.validateOnParse = false;
                    try {
                        b.setProperty("ProhibitDTD", true);
                        b.setProperty("MaxXMLSize", 2048);
                        b.setProperty("MaxElementDepth", 256);
                    } catch (c) {}
                }
                b.loadXML(a);
            } else {
                throw Error("Your browser does not support loading xml documents");
            }
            if (b && b.firstChild) {
                this.Ia = b;
                switch (this.Ia.firstChild.tagName) {
                    case "timedtext":
                        a = this.Ia.firstChild.childNodes;
                        b = 0;
                        for (var d = a.length; b < d; b++) {
                            switch (a[b].tagName) {
                                case "window":
                                    var e = a[b];
                                    var f = parseInt(e.getAttribute("id"), 10);
                                    var g = undefined;
                                    a: {
                                        var j = this.Db[f];
                                        if (!e.getAttribute("t") && !e.getAttribute("start")) {
                                            g = null;
                                        } else {
                                            g = parseInt(e.getAttribute("t"), 10);
                                            if (e.getAttribute("start")) {
                                                g = parseFloat(e.getAttribute("start")) * 1000;
                                            }
                                            if (j) {
                                                if (j.Ha + j.ba >= g) {
                                                    j.ba = g;
                                                } else {
                                                    j = null;
                                                }
                                            }
                                            switch (e.getAttribute("op")) {
                                                case "kill":
                                                    g = null;
                                                    break a;
                                                case "define":
                                                    j = null;
                                            }
                                            if (j) {
                                                j.Pi = true;
                                            } else {
                                                j = yt$captions$createDefaultWindow_();
                                            }
                                            var o = {};
                                            var j = j ? j.params : yt$captions$DEFAULT_WINDOW_PARAMS_;
                                            var x = undefined;
                                            for (x in j) {
                                                o[x] = j[x];
                                            }
                                            if (e.getAttribute("id")) {
                                                o.id = e.getAttribute("id");
                                            }
                                            if (e.getAttribute("op")) {
                                                o.Qi = e.getAttribute("op");
                                            }
                                            if (e.getAttribute("rc")) {
                                                o.Ug = parseInt(e.getAttribute("rc"), 10);
                                            }
                                            if (e.getAttribute("cc")) {
                                                o.Rg = parseInt(e.getAttribute("cc"), 10);
                                            }
                                            if (e.getAttribute("ap")) {
                                                j = parseInt(e.getAttribute("ap"), 10);
                                                o.Qg = j < 0 || j > 8 ? 7 : j;
                                            }
                                            if (e.getAttribute("ah")) {
                                                o.Tg = parseInt(e.getAttribute("ah"), 10);
                                            }
                                            if (e.getAttribute("av")) {
                                                o.Vg = parseInt(e.getAttribute("av"), 10);
                                            }
                                            if (e.getAttribute("id")) {
                                                o.id = parseInt(e.getAttribute("id"), 10) || 0;
                                            }
                                            if (e.getAttribute("vs")) {
                                                o.isVisible = Boolean(e.getAttribute("vs"));
                                            }
                                            if (e.getAttribute("ju")) {
                                                o.textAlign =
                                                    yt$captions$TEXT_ALIGNMENTS_[parseInt(e.getAttribute("ju"), 10)];
                                            }
                                            if (e.getAttribute("pd")) {
                                                o.Be = 1;
                                                if (parseInt(e.getAttribute("pd"), 10) == 0) {
                                                    o.Be = 0;
                                                }
                                            }
                                            if (e.getAttribute("bc")) {
                                                o.backgroundColor = parseInt(e.getAttribute("bc"), 16);
                                            }
                                            if (e.getAttribute("bo")) {
                                                o.opacity = parseInt(e.getAttribute("bo"), 10) / 100;
                                            }
                                            if (e.getAttribute("fc")) {
                                                o.Sg = parseInt(e.getAttribute("fc"), 16);
                                            }
                                            if (e.getAttribute("sd")) {
                                                o.Ri = parseInt(e.getAttribute("sd"), 10);
                                            }
                                            j =
                                                parseInt(e.getAttribute("d"), 10) ||
                                                parseFloat(e.getAttribute("dur")) * 1000 ||
                                                2147483647;
                                            e = {
                                                fd: g,
                                                ba: j,
                                                params: o,
                                                $c: parseInt(e.getAttribute("id"), 10)
                                            };
                                            g = new yt$captions$WindowEvent(e);
                                        }
                                    }
                                    this.Db[f] = g;
                                    this.nd.push(g);
                                    break;
                                case "text":
                                    f = yt$captions$parseCaptionElement_(a[b]);
                                    this.Bb.push(f);
                                    e = f.dd;
                                    if (this.Db[e]) {
                                        e = this.Db[e];
                                        f = f.Ab();
                                        e.Ae += f;
                                    }
                            }
                        }
                        break;
                    default:
                        this.nd.push(yt$captions$createDefaultWindow_());
                        a = this.Ia.firstChild.childNodes;
                        b = 0;
                        for (d = a.length; b < d; b++) {
                            this.Bb.push(yt$captions$parseCaptionElement_(a[b]));
                        }
                }
            }
        }
    };
    yt$captions$CaptionTrack.prototype.Bb = null;
    yt$captions$CaptionTrack.prototype.nd = null;
    yt$captions$CaptionTrack.prototype.Db = null;
    var yt$captions$Track = function (a) {
        a = a || {};
        this.$e = a.format;
        this.Ie = a.languageCode || "";
        this.Se = a.languageName;
        this.Ja = a.kind;
        this.ua = a.name;
        this.ic = a.is_default;
    };
    yt$captions$Track.prototype.Se = null;
    yt$captions$Track.prototype.Ja = null;
    yt$captions$Track.prototype.ua = null;
    yt$captions$Track.prototype.ic = false;
    yt$captions$Track.prototype.$e = 1;
    yt$captions$Track.prototype.getName = function () {
        return this.ua;
    };
    yt$captions$Track.prototype.getFormat = function () {
        return this.$e;
    };
    var yt$captions$Track$getDisplayName_ = function (a) {
        var b = [a.Se];
        if (a.Ja) {
            var c = a.Ja == "asr" ? yt$getMsg("HTML5_SUBS_TRANSCRIBED") : a.Ja;
            b.push(" (", c, ")");
        }
        if (a.ua) {
            b.push(" - ", a.ua);
        }
        if (a.Fb) {
            b.push(" >> ", a.Fb.ud);
        }
        return b.join("");
    };
    yt$captions$Track.prototype.toString = function () {
        var a = [this.Ie, ": ", this.ua, " (", this.Ja, ")"];
        if (this.Fb) {
            a.push(" >> ", this.Fb.ud);
        }
        return a.join("");
    };
    var yt$captions$TranslationLanguage = function (a) {
        this.Qe = a.languageCode;
        this.ud = a.languageName;
        this.id = a.id;
        this.ic = a.is_default;
    };
    yt$captions$TranslationLanguage.prototype.Qe = null;
    yt$captions$TranslationLanguage.prototype.ud = null;
    yt$captions$TranslationLanguage.prototype.id = null;
    yt$captions$TranslationLanguage.prototype.ic = false;
    var yt$captions$TrackList = function (a) {
        this.Te = [];
        this.mf = [];
        this.nc = [];
        if (a && a.firstChild) {
            this.Ia = a;
            var a = this.Ia.getElementsByTagName("track");
            for (var b = a.length, c = 0; c < b; c++) {
                var d = parseInt(a[c].getAttribute("formats"), 10) || 1;
                var e = a[c].getAttribute("lang_code");
                var f = a[c].getAttribute("lang_translated");
                var g = a[c].getAttribute("name");
                var j = a[c].getAttribute("kind") || "";
                var o = a[c].getAttribute("id");
                var x = a[c].getAttribute("lang_default") == "true";
                var C = a[c].getAttribute("cantran") == "true";
                this.Bd(
                    new yt$captions$Track({
                        format: d,
                        languageCode: e,
                        languageName: f,
                        name: g,
                        kind: j,
                        id: o,
                        is_servable: true,
                        is_default: x,
                        is_translateable: C
                    })
                );
            }
            a = this.Ia.getElementsByTagName("target");
            b = a.length;
            for (c = 0; c < b; c++) {
                d = a[c].getAttribute("lang_code");
                e = a[c].getAttribute("lang_translated");
                f = a[c].getAttribute("lang_original");
                g = a[c].getAttribute("id");
                j = a[c].getAttribute("lang_default") == "true";
                this.mf.push(
                    new yt$captions$TranslationLanguage({
                        languageCode: d,
                        languageName: e,
                        languageOriginal: f,
                        id: g,
                        is_default: j
                    })
                );
            }
        }
    };
    yt$captions$TrackList.prototype.Ia = null;
    yt$captions$TrackList.prototype.Te = null;
    yt$captions$TrackList.prototype.mf = null;
    yt$captions$TrackList.prototype.nc = null;
    yt$captions$TrackList.prototype.vc = -1;
    yt$captions$TrackList.prototype.bb = function () {
        return this.nc;
    };
    yt$captions$TrackList.prototype.Jd = function () {
        return this.vc;
    };
    yt$captions$TrackList.prototype.Bd = function (a) {
        switch (a.Ja) {
            case "asr":
                this.Te.push(a);
                break;
            default:
                if (a.ic || this.vc < 0) {
                    this.vc = this.nc.length;
                }
                this.nc.push(a);
        }
    };
    var yt$captions$CaptionsLoader = function (a, b, c, d) {
        this.va = a;
        if (c) {
            this.va = yt$uri$setQueryData(this.va, {
                hl: c
            });
        } else {
            a = yt$uri$getQueryData(this.va).hl || "";
            a = a.split("_").join("-");
            this.va = yt$uri$setQueryData(this.va, {
                hl: a
            });
        }
        this.H = b;
        this.Ye = !!d;
    };
    yt$captions$CaptionsLoader.prototype.va = "";
    yt$captions$CaptionsLoader.prototype.H = null;
    yt$captions$CaptionsLoader.prototype.Ye = false;
    yt$captions$CaptionsLoader.prototype.vc = 0;
    yt$captions$CaptionsLoader.prototype.ab = null;
    yt$captions$CaptionsLoader.prototype.bb = function () {
        return this.ab.bb();
    };
    yt$captions$CaptionsLoader.prototype.Jd = function () {
        return this.ab.Jd();
    };
    yt$captions$CaptionsLoader.prototype.Bd = function (a) {
        this.ab.Bd(a);
    };
    var yt$captions$CaptionsLoader$loadDefaultTrack_ = function (a) {
        var b = yt$www$watch$transcript$onTrackLoaded_;
        var c = a.ab.Jd();
        if (!(c < 0)) {
            yt$captions$CaptionsLoader$loadTrack_(a, a.ab.bb()[c], b);
        }
    };
    var yt$captions$CaptionsLoader$loadTrack_ = function (a, b, c) {
        var d = a.va;
        var e = {
            v: a.H,
            type: "track",
            lang: b.Ie,
            name: b.getName(),
            kind: b.Ja,
            fmt: b.getFormat()
        };
        if (b.Fb) {
            e.tlang = b.Fb.Qe;
        }
        d = yt$uri$setQueryData(d, e);
        yt$player$logger.info("Loading caption track from: " + d);
        a = goog$bind(function (a) {
            a = new yt$captions$CaptionTrack(a.responseText);
            c(a, b);
        }, a);
        yt$net$ajax$send_(d, a);
    };
    var yt$captions$CaptionsLoader$loadTrackList_ = function (a, b) {
        var c = a.va;
        var d = {
            type: "list",
            tlangs: 1,
            v: a.H,
            fmts: Number(false)
        };
        if (a.Ye) {
            d.asrs = 1;
        }
        c = yt$uri$setQueryData(c, d);
        yt$player$logger.info("Getting track list from: " + c);
        d = goog$bind(function (a) {
            this.ab = new yt$captions$TrackList(a.responseXML);
            b();
        }, a);
        yt$net$ajax$send_(c, d);
    };
    var yt$www$watch$transcript$loader_ = null;
    var yt$www$watch$transcript$track_ = null;
    var yt$www$watch$transcript$currentLine_ = -1;
    var yt$www$watch$transcript$mouseOver_ = false;
    var yt$www$watch$transcript$syncInterval_ = 0;
    var yt$www$watch$transcript$scrollInterval_ = 0;
    var yt$www$watch$transcript$load = function (a) {
        if (yt$www$watch$transcript$loader_) {
            a();
        } else if (yt$dom$datasets$get(goog$dom$getElement("watch-captions-container"), "disabled") != "true") {
            var b = new yt$captions$CaptionsLoader(yt$getConfig("TTS_URL"), yt$getConfig("VIDEO_ID"));
            yt$captions$CaptionsLoader$loadTrackList_(b, function () {
                yt$www$watch$transcript$render_();
                a();
            });
            yt$www$watch$transcript$loader_ = b;
        }
    };
    var yt$www$watch$transcript$render_ = function () {
        var a = yt$www$watch$transcript$loader_;
        var b = yt$www$watch$transcript$loader_.bb();
        var c = b.length;
        if (c <= 0) {
            yt$style$show("watch-captions-not-found");
        } else {
            var d = goog$dom$getElement("watch-captions-container");
            if (c > 1) {
                var e = document.createElement("select");
                e.id = "watch-captions-track-selector";
                for (var f = 0; f < c; ++f) {
                    var g = b[f];
                    var j = document.createElement("option");
                    var g = goog$dom$createTextNode(yt$captions$Track$getDisplayName_(g));
                    j.appendChild(g);
                    j.value = f;
                    e.appendChild(j);
                }
                yt$events$listen(e, "change", function () {
                    yt$captions$CaptionsLoader$loadTrack_(
                        yt$www$watch$transcript$loader_,
                        yt$www$watch$transcript$loader_.bb()[this.value],
                        yt$www$watch$transcript$onTrackLoaded_
                    );
                });
                d.appendChild(e);
            }
            b = document.createElement("div");
            b.id = "captions-scrollbox";
            yt$events$listen(b, "mouseover", function () {
                yt$www$watch$transcript$mouseOver_ = true;
            });
            yt$events$listen(b, "mouseout", function () {
                yt$www$watch$transcript$mouseOver_ = false;
            });
            d.appendChild(b);
            yt$captions$CaptionsLoader$loadDefaultTrack_(a);
        }
    };
    var yt$www$watch$transcript$onTrackLoaded_ = function (a, b) {
        var c = a.Bb;
        yt$www$watch$transcript$currentLine_ = -1;
        yt$www$watch$transcript$track_ = a;
        yt$clearInterval(yt$www$watch$transcript$syncInterval_);
        var d = goog$dom$getElement("captions-scrollbox");
        d.innerHTML = "";
        var e = goog$dom$getElement("watch-captions-track-selector");
        if (e) {
            var f = yt$www$watch$transcript$loader_.bb();
            for (var g = 0, j = f.length; g < j; ++g) {
                if (f[g] == b) {
                    e.options[g].selected = true;
                    break;
                }
            }
        }
        g = 0;
        for (j = c.length; g < j; ++g) {
            var e = c[g];
            var f = document.createElement("div");
            var o = e.Ha / 1000;
            f.id = "cp-" + g;
            f.className = "cpline";
            yt$dom$datasets$set(f, "time", o + "");
            f.onmousedown = function (a) {
                yt$www$watch$getPlayerReference_().seekTo(parseInt(yt$dom$datasets$get(this, "time"), 10), true);
                return yt$events$preventDefault(a);
            };
            d.appendChild(f);
            var x = document.createElement("div");
            x.className = "cptime";
            x.innerHTML = Math.floor(o / 60) + ":" + (o % 60 < 10 ? "0" : "") + Math.floor(o % 60);
            f.appendChild(x);
            o = document.createElement("div");
            o.className = "cptext";
            o.innerHTML = e.Ab();
            f.appendChild(o);
        }
        yt$www$watch$transcript$syncInterval_ = yt$setInterval(yt$www$watch$transcript$sync_, 500);
    };
    var yt$www$watch$transcript$sync_ = function () {
        var a = yt$www$watch$getPlayerReference_().getCurrentTime();
        var b = yt$www$watch$transcript$track_.Bb;
        var c = yt$www$watch$transcript$currentLine_;
        var d = c;
        while (true) {
            var e = d >= 0 ? b[d].Ha / 1000 : -1;
            if (a + 0.5 < e) {
                d -= 1;
            } else {
                e = d + 1 < b.length ? b[d + 1].Ha / 1000 : 1000000;
                if (a + 0.5 > e) {
                    d += 1;
                } else {
                    break;
                }
            }
        }
        if (d != c) {
            if (c >= 0) {
                a = goog$dom$getElement("cp-" + c);
                goog$dom$classes$remove(a, "cpline-highlight");
            }
            if (d >= 0) {
                a = goog$dom$getElement("cp-" + d);
                goog$dom$classes$add(a, "cpline-highlight");
            }
            yt$www$watch$transcript$currentLine_ = d;
            if (!yt$www$watch$transcript$mouseOver_) {
                yt$www$watch$transcript$scrollTo_(goog$dom$getElement("cp-" + (d >= 3 ? d - 3 : 0)));
            }
        }
    };
    var yt$www$watch$transcript$scrollTo_ = function (a) {
        yt$clearInterval(yt$www$watch$transcript$scrollInterval_);
        var b = goog$dom$getElement("captions-scrollbox");
        var c = Math.min(a.offsetTop - b.offsetTop, b.scrollHeight - b.offsetHeight);
        var d = 0;
        yt$www$watch$transcript$scrollInterval_ = yt$setInterval(function () {
            var a = c - b.scrollTop;
            var f = Math.round((a * 100) / (1000 - d * 50));
            if (Math.abs(a) <= Math.abs(f) || d > 20) {
                b.scrollTop = c;
                yt$clearInterval(yt$www$watch$transcript$scrollInterval_);
            } else {
                b.scrollTop += f;
                d++;
            }
        }, 50);
    };
    var yt$www$watch$flag$initForm_ = function (a, b) {
        var c = goog$dom$getElement("flag-video-form");
        var d = goog$dom$getElement("flag-video-menu");
        if (c && d) {
            new yt$www$watch$flag$FlagForm(c, d, a, b);
        }
    };
    var yt$www$watch$flag$FlagForm = function (a, b, c, d) {
        this.i = a;
        this.k = b;
        yt$events$listen(this.i, "submit", goog$bind(this.lh, this));
        yt$events$delegateListItemClick(this.k, goog$bind(this.kh, this));
        yt$events$listen(goog$dom$getElement("flag-video-cancel"), "click", function (a) {
            a.preventDefault();
            c();
        });
        this.bc = d;
    };
    yt$www$watch$flag$FlagForm.prototype.kh = function (a) {
        var b;
        b = a.currentTarget;
        var c = yt$www$watch$flag$FlagForm$selectReason_(this, b);
        var a = yt$dom$datasets$get(b, "show-textbox-with-label");
        var d = !!yt$dom$datasets$get(b, "include-time");
        var e = !!yt$dom$datasets$get(b, "show-hate-group");
        var f = yt$dom$datasets$get(b, "popup-url");
        var g = yt$dom$datasets$get(b, "result-message") || "default";
        b = !!yt$dom$datasets$get(b, "no-post");
        var j = c.ph;
        this.i.reason.value = c.reason;
        this.i.sub_reason.value = j;
        c = goog$dom$getElement("flag-video-more-info-comment");
        if (a) {
            goog$dom$getElement("flag-video-more-info-textarea-label").innerHTML = a;
        }
        yt$style$setDisplayed(c, !!a);
        yt$style$setDisplayed(goog$dom$getElement("flag-video-more-info-time"), d);
        yt$style$setDisplayed(goog$dom$getElement("flag-video-more-info-hate-group"), e);
        if (f) {
            yt$window$popup(f, {
                target: "atmfc",
                width: 900,
                height: 700,
                left: 0,
                top: 0,
                status: "yes",
                toolbar: "no",
                menubar: "no",
                location: "no"
            });
        }
        if (b) {
            yt$style$hide(this.i);
            yt$www$watch$flag$showResult_(g);
        } else {
            yt$dom$datasets$set(this.i, "result-message", g);
            yt$style$show(this.i);
        }
    };
    var yt$www$watch$flag$FlagForm$selectReason_ = function (a, b) {
        var c = yt$uix$Button.getInstance();
        var d = yt$uix$Button$getMenuButton_(c, a.k);
        yt$uix$Button$hideMenu_(c, d);
        c = c.getContent(d);
        d = goog$dom$getElementByClass("label", b);
        c.innerHTML = goog$dom$getTextContent(d);
        c = goog$dom$getElementsByClass("selected", a.k);
        goog$array$forEach(c, function (a) {
            goog$dom$classes$remove(a, "selected", "child-selected");
        });
        goog$dom$classes$add(b, "selected");
        c = "";
        if ((d = yt$dom$datasets$get(b, "subreason") || "")) {
            var e = goog$dom$getAncestorByTagNameAndClass(b.parentNode, "li");
            var c = yt$dom$datasets$get(e, "reason") || "";
            goog$dom$classes$add(e, "selected", "child-selected");
        } else {
            c = yt$dom$datasets$get(b, "reason") || "";
        }
        return {
            reason: c,
            ph: d
        };
    };
    yt$www$watch$flag$FlagForm.prototype.lh = function (a) {
        a.preventDefault();
        var b = goog$dom$getElement("flag-video-submit");
        b.disabled = true;
        var c = yt$dom$datasets$get(this.i, "result-message");
        yt$net$ajax$send(this.i.action, {
            format: "XML",
            method: "POST",
            za: goog$dom$forms$getFormDataString(this.i),
            f: function () {
                yt$www$watch$flag$showResult_(c);
                this.bc.call(goog$global);
            },
            B: function (a, c) {
                yt$www$watch$flag$hideResults_();
                var f = goog$dom$getElement("flag-video-error");
                if (c && c.error_message) {
                    goog$dom$getElementByClass("yt-alert-content", f).innerHTML = c.error_message;
                }
                yt$style$show(f);
                b.disabled = false;
            },
            j: this
        });
    };
    var yt$www$watch$flag$showResult_ = function (a) {
        yt$www$watch$flag$hideResults_();
        yt$style$hide("flag-video-form-container");
        yt$style$show("flag-video-result-" + a);
    };
    var yt$www$watch$flag$hideResults_ = function () {
        var a = goog$dom$getElementsByClass("flag-video-result", goog$dom$getElement("flag-video-results-container"));
        goog$array$forEach(a, function (a) {
            yt$style$hide(a);
        });
    };
    var yt$sharing$sharePanel_;
    var yt$www$watch$actions$like_ = function (a) {
        if (yt$getConfig("ALLOW_RATINGS")) {
            var b;
            if ((b = !yt$www$watch$actions$checkLoggedOut_())) {
                if (yt$getConfig("YPC_CAN_RATE_VIDEO")) {
                    b = false;
                } else {
                    yt$www$watch$actions$showPanel_("watch-actions-rental-required");
                    b = true;
                }
                b = !b;
            }
            if (b) {
                if (yt$getConfig("YPC_SHOW_VPPA_CONFIRM_RATING") && !confirm(yt$getMsg("VPPA_CONFIRM"))) {
                    yt$www$watch$actions$hidePanels_();
                } else {
                    yt$www$watch$actions$showLoading_();
                    yt$www$watch$actions$rate(a, {
                        lg: yt$getConfig("PLAYBACK_ID"),
                        qe: yt$getConfig("STATION_ID"),
                        f: function (b, d) {
                            goog$dom$classes$addRemove(
                                goog$dom$getElement("watch-like-unlike"),
                                a ? "unliked" : "liked",
                                a ? "liked" : "unliked"
                            );
                            yt$www$watch$actions$showAjaxContent_(d.html_content);
                            var e = goog$dom$getElement("watch-like-share-plusone");
                            if (e) {
                                new yt$sharing$PlusOneButton(e, d.video_id, d.video_url, d.lang, d.session_index);
                            }
                            yt$www$thumbnaildelayload$loadImmediately(goog$dom$getElement("watch-actions-ajax"));
                        },
                        B: yt$www$watch$actions$showError_
                    });
                }
            }
        } else {
            yt$www$watch$actions$showPanel_("watch-actions-ratings-disabled");
        }
    };
    var yt$www$watch$actions$flag = function (a, b) {
        var c = a || goog$dom$getElement("watch-flag");
        if (yt$www$watch$actions$activateButton_(c) && !yt$www$watch$actions$checkLoggedOut_()) {
            yt$www$watch$actions$showLoading_();
            var d = 0;
            var e = yt$www$watch$getPlayerReference_();
            if (e && e.pauseVideo) {
                e.pauseVideo();
                d = e.getCurrentTime();
            }
            d = Math.floor(d);
            e = Math.floor(d / 60);
            d = {
                action_get_flag_video_component: 1,
                video_id: yt$getConfig("VIDEO_ID"),
                t_mins: e,
                t_secs: d - e * 60
            };
            if (b) {
                d.from_dislike = 1;
            }
            yt$net$ajax$send("/watch_ajax", {
                format: "XML",
                method: "GET",
                g: d,
                f: function (a, b) {
                    yt$www$watch$actions$showAjaxContent_(b.html_content);
                    yt$www$watch$flag$initForm_(
                        function () {
                            yt$www$watch$actions$hidePanels_();
                        },
                        function () {
                            c.disabled = true;
                        }
                    );
                },
                B: yt$www$watch$actions$showError_
            });
        }
    };
    var yt$www$watch$actions$share = function (a, b) {
        if (yt$www$watch$actions$activateButton_(a)) {
            var c = yt$www$watch$actions$getElement_("watch-actions-share");
            if (yt$sharing$sharePanel_) {
                yt$www$watch$actions$showPanel_("watch-actions-share");
                yt$sharing$sharePanel_.na();
            } else {
                var d = yt$getConfig("VIDEO_ID");
                var e = null;
                if (yt$www$lists$isPlayingUserList()) {
                    e = yt$www$lists$initialized_ ? yt$www$lists$getPlaylistBar().Ba() : null;
                }
                yt$www$watch$actions$showLoading_();
                yt$sharing$sharePanel_ = new yt$sharing$SharePanel(c, d, e, function () {
                    yt$www$watch$actions$showPanel_("watch-actions-share");
                });
            }
            if (b) {
                yt$tracking$track("shareOpenedFromFlash", undefined, undefined);
            } else {
                yt$tracking$track("shareOpenedFromActionBar", undefined, undefined);
            }
            var f = yt$www$watch$getPlayerReference_();
            var g = yt$setInterval(function () {
                var b = goog$dom$classes$has(a, "active");
                if (!f || !b) {
                    yt$clearInterval(g);
                } else {
                    var b = [];
                    for (var c = Math.floor(f.getCurrentTime()); c > 0;) {
                        b.unshift(c % 60);
                        c = Math.floor(c / 60);
                    }
                    while (b.length < 2) {
                        b.unshift(0);
                    }
                    b = goog$array$map(b, function (a, b) {
                        if (b > 0 && a < 10) {
                            return "0" + a;
                        } else {
                            return a;
                        }
                    });
                    yt$sharing$setStartTime(b.join(":"));
                }
            }, 1000);
            yt$tracking$conversion$ping("share");
        }
    };
    var yt$www$watch$actions$activateButton_ = function (a) {
        var b = !goog$dom$classes$has(a, "active");
        yt$www$watch$actions$hidePanels_();
        if (b) {
            goog$dom$classes$add(a, "active");
            yt$uix$Tooltip$hideTip_(yt$uix$Tooltip.getInstance(), a);
        }
        return b;
    };
    var yt$www$watch$actions$showLoading_ = function () {
        yt$www$watch$actions$showPanel_("watch-actions-loading");
    };
    var yt$www$watch$actions$showAjaxContent_ = function (a) {
        yt$www$watch$actions$getElement_("watch-actions-ajax").innerHTML = a;
        yt$www$watch$actions$showPanel_("watch-actions-ajax");
    };
    var yt$www$watch$actions$showError_ = function (a, b) {
        var c = b && b.error_message;
        if (!c) {
            c = yt$getMsg("WATCH_ERROR_MESSAGE");
        }
        yt$www$watch$actions$getElement_("watch-error-string").innerHTML = c;
        yt$www$watch$actions$showPanel_("watch-actions-error");
    };
    var yt$www$watch$actions$elementCache_ = {};
    var yt$www$watch$actions$getElement_ = function (a) {
        if (!(a in yt$www$watch$actions$elementCache_)) {
            yt$www$watch$actions$elementCache_[a] = goog$dom$getElement(a);
        }
        return yt$www$watch$actions$elementCache_[a];
    };
    var yt$www$watch$actions$showPanel_ = function (a) {
        var b = yt$www$watch$actions$getElement_("watch-actions-area-container");
        var a = yt$www$watch$actions$getElement_(a);
        var c = yt$www$watch$actions$getElement_("watch-actions-loading");
        var d = yt$www$watch$actions$getElement_("watch-actions-area");
        if (!yt$style$isDisplayed(b)) {
            b.style.height = "0px";
            yt$style$show(b);
        }
        yt$style$hide(c);
        yt$style$show(a);
        goog$dom$classes$add(b, "transitioning");
        var e = d.offsetHeight + "px";
        yt$setTimeout(function () {
            b.style.height = e;
        }, 0);
        yt$setTimeout(function () {
            if (b.style.height == e) {
                goog$dom$classes$remove(b, "transitioning");
                b.style.height = "auto";
            }
        }, 500);
    };
    var yt$www$watch$actions$hidePanels_ = function () {
        var a = yt$www$watch$actions$getElement_("watch-actions-area-container");
        yt$style$hide(a);
        a = goog$dom$getElementsByClass("watch-actions-panel", a);
        goog$array$forEach(a, function (a) {
            yt$style$hide(a);
        });
        yt$www$watch$actions$getElement_("watch-actions-ajax").innerHTML = "";
        var a = yt$www$watch$actions$getElement_("watch-actions");
        var b = yt$www$watch$actions$getElement_("watch-subactions");
        var a = goog$dom$getElementsByTagNameAndClass("button", null, a);
        if (b) {
            b = goog$dom$getElementsByTagNameAndClass("button", null, b);
            goog$array$extend(goog$array$clone(a), goog$array$clone(b));
        }
        goog$array$forEach(a, function (a) {
            goog$dom$classes$remove(a, "active");
        });
    };
    var yt$www$watch$actions$checkLoggedOut_ = function () {
        if (!yt$getConfig("LOGGED_IN")) {
            yt$www$watch$actions$showPanel_("watch-actions-logged-out");
            return true;
        } else {
            return false;
        }
    };
    var yt$www$lists$addtomenupebbles$menuTemplateHtml_;
    var yt$www$lists$addtomenupebbles$clickListenerKey_ = null;
    var yt$www$lists$addtomenupebbles$submitListenerKey_ = null;
    var yt$www$lists$addtomenupebbles$expandButton_ = function (a) {
        var b = yt$dom$cloneNode_(a);
        goog$dom$classes$swap(b, "addto-button-collapsed", "addto-button-expanded");
        document.body.appendChild(b);
        goog$positioning$positionAtAnchor(a, 0, b, 0, new goog$math$Coordinate(0, -4));
    };
    var yt$www$lists$addtomenupebbles$collapseButton_ = function (a) {
        goog$dom$removeNode(a);
    };
    var yt$www$lists$addtomenupebbles$TagsMenu = function (a, b) {
        this.k = a;
        this.dg = goog$dom$getElementByClass("tags-menu-list", a);
        this.H = b;
        this.jd();
    };
    yt$www$lists$addtomenupebbles$TagsMenu.prototype.jd = function () {
        goog$dom$classes$add(this.k, "loading");
        yt$net$ajax$send("/pebbles_ajax", {
            method: "POST",
            j: this,
            g: {
                action_get_all_user_pebbles: 1,
                video_id: this.H
            },
            n: {
                session_token: yt$net$ajax$tokenMap_.pebbles_ajax
            },
            f: function (a, b) {
                this.dg.innerHTML = b.html;
                this.Xb = goog$dom$getElementByClass("add-pebble-form", this.k);
                this.he = goog$dom$getElementByClass("video-id", this.Xb);
                this.Zb = goog$dom$getElementByClass("pebble-input", this.Xb);
                this.oa = goog$dom$getElementByClass("pebble-submit-button", this.Xb);
                this.Qc();
                goog$dom$classes$remove(this.k, "loading");
            }
        });
    };
    yt$www$lists$addtomenupebbles$TagsMenu.prototype.Qc = function () {
        if (yt$www$lists$addtomenupebbles$clickListenerKey_ && yt$www$lists$addtomenupebbles$submitListenerKey_) {
            yt$events$unlistenByKey([
                yt$www$lists$addtomenupebbles$clickListenerKey_,
                yt$www$lists$addtomenupebbles$submitListenerKey_
            ]);
        }
        yt$www$lists$addtomenupebbles$clickListenerKey_ = yt$events$delegateByClass(
            this.k,
            "click",
            goog$bind(this.Nh, this),
            "pebble"
        );
        yt$www$lists$addtomenupebbles$submitListenerKey_ = yt$events$listen(
            this.Xb,
            "submit",
            goog$bind(this.Ph, this)
        );
        yt$events$delegateByClass(this.k, "click", goog$bind(this.Mh, this), "close-tags-menu");
        yt$events$delegateByClass(this.k, "keyup", goog$bind(this.Oh, this), "pebble-input");
    };
    yt$www$lists$addtomenupebbles$TagsMenu.prototype.Nh = function (a) {
        yt$www$lists$addtomenupebbles$TagsMenu$togglePebble_(this, a.currentTarget);
    };
    yt$www$lists$addtomenupebbles$TagsMenu.prototype.Oh = function () {
        this.oa.disabled = goog$string$isEmpty(this.Zb.value);
    };
    yt$www$lists$addtomenupebbles$TagsMenu.prototype.Ph = function (a) {
        a.preventDefault();
        if (!goog$string$isEmpty(this.Zb.value)) {
            var b = a.currentTarget;
            var a = goog$dom$getElementByClass("pebble-list", this.k);
            var b = b.pebble.value;
            var c = b.toLowerCase();
            var d = null;
            goog$array$some(a.children, function (a) {
                var b = yt$dom$datasets$get(a, "pebble-name");
                if (b && b.toLowerCase() == c) {
                    d = a;
                    return true;
                } else {
                    return false;
                }
            });
            if (d) {
                if (!goog$dom$classes$has(d, "selected")) {
                    yt$www$lists$addtomenupebbles$TagsMenu$togglePebble_(this, d, true);
                }
            } else {
                yt$www$lists$addtomenupebbles$TagsMenu$addNewPebble_(this, b);
            }
            this.Zb.focus();
            this.Zb.value = "";
        }
    };
    var yt$www$lists$addtomenupebbles$TagsMenu$togglePebble_ = function (a, b, c) {
        var d = yt$dom$datasets$get(b, "pebble-name");
        var e = goog$dom$classes$has(b, "selected");
        yt$net$ajax$send("/pebbles_ajax", {
            g: e
                ? {
                      action_delete_pebble_from_video: 1
                  }
                : {
                      action_add_pebble_to_video: 1
                  },
            method: "POST",
            n: {
                video_id: a.he.value,
                pebble: d,
                session_token: yt$net$ajax$tokenMap_.pebbles_ajax
            }
        });
        var f = e ? -1 : 1;
        goog$dom$classes$toggle(b, "selected");
        d = goog$dom$getElementByClass("pebble-count", b);
        f = parseInt(d.innerHTML, 10) + f;
        d.innerHTML = f;
        if (f == 0) {
            goog$dom$classes$add(d, "unused");
        } else {
            goog$dom$classes$remove(d, "unused");
        }
        if (!e && c) {
            a = goog$dom$getElementByClass("pebble-list", a.k);
            a.removeChild(b);
            a.insertBefore(b, a.children[0]);
            a.scrollTop = 0;
        }
    };
    var yt$www$lists$addtomenupebbles$TagsMenu$addNewPebble_ = function (a, b) {
        yt$net$ajax$send("/pebbles_ajax", {
            g: {
                action_add_pebble_to_video: 1
            },
            method: "POST",
            n: {
                video_id: a.he.value,
                pebble: b,
                session_token: yt$net$ajax$tokenMap_.pebbles_ajax
            }
        });
        var c = goog$dom$getElementByClass("pebble-list", a.k);
        var d = goog$dom$getElementByClass("pebble-template", c).cloneNode(true);
        var e = goog$dom$getElementByClass("pebble-name", d);
        var f = goog$dom$getElementByClass("pebble-count", d);
        yt$dom$datasets$set(d, "pebble-name", b);
        goog$dom$classes$remove(d, "pebble-template");
        goog$dom$classes$add(d, "selected");
        e.innerHTML = b;
        f.innerHTML = "1";
        c.insertBefore(d, c.children[0]);
        c.scrollTop = 0;
    };
    yt$www$lists$addtomenupebbles$TagsMenu.prototype.Mh = function () {
        var a = yt$uix$Button.getInstance();
        var b = yt$uix$Button$getMenuButton_(a, this.k);
        yt$uix$Button$hideMenu_(a, b);
        goog$dom$removeNode(b);
    };
    var yt$www$lists$addto$menuTemplateHtml_;
    var yt$www$lists$addto$hadTooltipClass_;
    var yt$www$lists$addto$lightweightPanel_;
    var yt$www$lists$addto$AddToMenu = function (a, b) {
        this.ob = a;
        this.k = goog$dom$getElement("shared-addto-menu");
        this.Sb = yt$dom$datasets$get(this.ob, "feature") || "";
        this.je = goog$dom$classes$has(this.ob, "watch");
        this.tb = yt$dom$datasets$get(this.ob, "video-ids") || "";
        this.D = this.tb.split(",");
        if (!goog$isDef(yt$www$lists$addto$lightweightPanel_)) {
            yt$www$lists$addto$lightweightPanel_ = goog$dom$classes$has(this.k, "lightweight-panel");
        }
        var c = goog$dom$getElementByClass("sign-in", this.k);
        if (c) {
            yt$events$listen(c, "click", goog$bind(this.jh, this));
        } else if (b) {
            new yt$www$lists$addtomenupebbles$TagsMenu(this.k, this.tb);
        } else {
            this.jd();
        }
    };
    yt$www$lists$addto$AddToMenu.prototype.jd = function () {
        var a = {
            action_get_dropdown: "1"
        };
        if (this.Sb) {
            a.feature = this.Sb;
        }
        yt$net$ajax$send("/addto_ajax", {
            kb: true,
            format: "XML",
            method: "GET",
            j: this,
            g: a,
            f: function (a, c) {
                this.k.innerHTML = c.html_content || "";
                goog$dom$classes$enable(this.k, "ie", goog$userAgent$IE);
                this.Aa();
                yt$www$lists$addto$AddToMenu$ellipsizeNames_(this);
            }
        });
    };
    yt$www$lists$addto$AddToMenu.prototype.Aa = function () {
        this.e = {};
        this.e.list = goog$dom$getElement("addto-list-panel");
        this.e.Uc = goog$dom$getElement("addto-list-saved-panel");
        this.e.dc = goog$dom$getElement("addto-list-error-panel");
        this.e.ra = goog$dom$getElement("addto-note-input-panel");
        this.e.Td = goog$dom$getElement("addto-note-saving-panel");
        this.e.se = goog$dom$getElement("addto-note-saved-panel");
        this.e.Yc = goog$dom$getElement("addto-note-error-panel");
        this.e.ka = goog$dom$getElement("addto-create-panel");
        this.ec = this.e.list;
        yt$events$delegateByClass(this.e.list, "click", goog$bind(this.qg, this), "yt-uix-button-menu-item");
        this.$b = goog$dom$getElementByClass("playlist-save-note", this.e.ra);
        yt$events$listen(this.$b, "click", goog$bind(this.rg, this));
        var a = goog$dom$getElementByClass("close-button", this.k);
        yt$events$listen(a, "click", goog$bind(this.pg, this));
    };
    var yt$www$lists$addto$AddToMenu$ellipsizeNames_ = function (a) {
        a = goog$dom$getElementsByClass("playlist-name", a.e.list);
        goog$array$forEach(a, function (a) {
            var c = goog$dom$getElement(a);
            var d = yt$dom$getEllipsizedHtml(c);
            var e = c.innerHTML != d;
            c.innerHTML = d;
            if (e) {
                a = yt$dom$getAncestorByClass(a, "yt-uix-button-menu-item");
                a.title = yt$dom$datasets$get(a, "possible-tooltip");
            }
        });
    };
    yt$www$lists$addto$AddToMenu.prototype.qg = function (a) {
        a.stopPropagation();
        var b = a.currentTarget;
        yt$uix$Tooltip$hideTip_(yt$uix$Tooltip.getInstance(), b);
        this.oe = false;
        var c = (a = null);
        var d = "";
        var e = yt$dom$datasets$get(b, "list-action");
        if (e) {
            if (e == "create-playlist") {
                yt$www$lists$addto$AddToMenu$showCreatePanel_(this);
            } else {
                if (e == "favorites") {
                    this.oe = true;
                    c = "FL";
                    d = b.innerHTML;
                } else if (e == "watch-later") {
                    c = "WL";
                    d = b.innerHTML;
                } else {
                    c = "PL";
                    a = e;
                    b = goog$dom$getElementByClass("playlist-name", b);
                    d = yt$dom$datasets$get(b, "original-html");
                }
                yt$www$lists$addto$AddToMenu$addTo_(this, c, a);
                if (e == "watch-later" || e == "favorites" || this.D.length > 1) {
                    goog$dom$getElementByClass("addto-title", this.e.Uc).innerHTML = d;
                    goog$dom$classes$remove(this.k, "lightweight-panel");
                    yt$www$lists$addto$AddToMenu$switchPanel_(this, this.e.Uc, true);
                    a = goog$dom$getElementByClass("close-note", this.k);
                    yt$style$show(a);
                } else {
                    yt$www$lists$addto$AddToMenu$showNoteInput_(this, d);
                }
            }
        }
    };
    var yt$www$lists$addto$AddToMenu$showNoteInput_ = function (a, b) {
        goog$dom$getElementByClass("addto-title", a.e.ra).innerHTML = goog$string$htmlEscape(b);
        yt$www$lists$addto$AddToMenu$switchPanel_(a, a.e.ra, true);
        var c = goog$dom$getElementByClass("close-note", a.k);
        yt$style$show(c);
        var d = goog$dom$getElement("addto-note");
        yt$events$listen(d, "keydown", goog$bind(a.Fe, a));
        yt$events$listen(d, "paste", goog$bind(a.Fe, a));
        yt$www$lists$addto$onTransitionEnd_(a.e.ra, function () {
            d.focus();
        });
    };
    var yt$www$lists$addto$onTransitionEnd_ = function (a, b) {
        if (b) {
            var c = goog$userAgent$WEBKIT
                ? "webkitTransitionEnd"
                : goog$userAgent$OPERA
                  ? "oTransitionEnd"
                  : goog$userAgent$GECKO
                    ? "transitionend"
                    : null;
            if (c) {
                yt$events$listenOnce(a, c, function () {
                    b();
                });
            } else {
                b();
            }
        }
    };
    yt$www$lists$addto$AddToMenu.prototype.Fe = function (a) {
        var b = a.target;
        var c = goog$dom$getElementByClass("addto-note-label", this.e.ra);
        yt$setTimeout(
            goog$bind(function () {
                var a = goog$string$isEmpty(b.value);
                if (a) {
                    yt$style$show(c);
                } else {
                    yt$style$hide(c);
                }
                if (!a && this.G && this.Hc) {
                    yt$dom$setEnabled(this.$b, true);
                } else {
                    yt$dom$setEnabled(this.$b, false);
                }
            }, this),
            0
        );
    };
    var yt$www$lists$addto$AddToMenu$switchPanel_ = function (a, b, c) {
        var c = c ? "slide" : "fade";
        var d = ["fade", "slide"];
        goog$dom$classes$addRemove(a.ec, d, c);
        goog$dom$classes$addRemove(b, d, c);
        if (yt$www$lists$addto$lightweightPanel_ && b == a.e.list) {
            goog$dom$classes$add(a.k, "lightweight-panel");
        }
        if (goog$dom$classes$has(b, "dismissed-panel")) {
            goog$dom$classes$remove(b, "dismissed-panel");
            goog$dom$classes$remove(a.ec, "active-panel");
        } else {
            goog$dom$classes$swap(a.ec, "active-panel", "dismissed-panel");
        }
        goog$dom$classes$add(b, "active-panel");
        a.ec = b;
    };
    var yt$www$lists$addto$AddToMenu$showCreatePanel_ = function (a) {
        yt$www$lists$addto$AddToMenu$switchPanel_(a, a.e.ka, true);
        yt$www$lists$addto$AddToMenu$initCreatePanel_(a);
        yt$dom$datasets$remove(a.k, "video-ids");
        var b = goog$dom$getElement("addto-create-playlist");
        yt$events$listen(b, "keydown", goog$bind(a.ed, a));
        yt$events$listen(b, "paste", goog$bind(a.ed, a));
        yt$www$lists$addto$onTransitionEnd_(a.e.ka, function () {
            b.focus();
        });
        var c = goog$dom$getElementByClass("addto-create-cancel-button", a.e.ka);
        yt$events$listen(
            c,
            "click",
            goog$bind(function () {
                yt$www$lists$addto$AddToMenu$hide_(this);
            }, a)
        );
        c = goog$dom$getElementByClass("create-playlist-button", a.e.ka);
        yt$events$listen(c, "click", goog$bind(a.$g, a));
    };
    var yt$www$lists$addto$AddToMenu$initCreatePanel_ = function (a) {
        a.ze = goog$dom$getElementByClass("addto-create-playlist", a.e.ka);
        a.Ke = goog$dom$getElementByClass("addto-create-playlist-label", a.e.ka);
        a.Je = goog$dom$getElementByClass("create-playlist-button", a.e.ka);
        a.kd = goog$dom$getElementByClass("privacy-form", a.e.ka);
        yt$events$delegateByClass(a.kd, "click", goog$bind(a.ed, a), "playlist-privacy-option");
    };
    yt$www$lists$addto$AddToMenu.prototype.$g = function () {
        var a = this.ze.value;
        this.mg = true;
        var b = parseInt(goog$dom$forms$getValueByName_isPrivate(this.kd), 10);
        yt$www$lists$addto$AddToMenu$addTo_(this, "PL", null, a, b);
        if (this.D.length > 1) {
            yt$www$lists$addto$AddToMenu$hide_(this);
        } else {
            yt$www$lists$addto$AddToMenu$showNoteInput_(this, a);
        }
    };
    yt$www$lists$addto$AddToMenu.prototype.ed = function () {
        yt$setTimeout(
            goog$bind(function () {
                var a = goog$string$isEmpty(this.ze.value);
                if (a) {
                    yt$style$show(this.Ke);
                } else {
                    yt$style$hide(this.Ke);
                }
                var b = goog$dom$forms$getValueByName_isPrivate(this.kd);
                if (a || !b) {
                    yt$dom$setEnabled(this.Je, false);
                } else {
                    yt$dom$setEnabled(this.Je, true);
                }
            }, this),
            0
        );
    };
    yt$www$lists$addto$AddToMenu.prototype.pg = function () {
        yt$www$lists$addto$AddToMenu$hide_(this);
    };
    var yt$www$lists$addto$AddToMenu$hide_ = function (a) {
        var b = yt$uix$Button.getInstance();
        var c = yt$uix$Button$getMenuButton_(b, a.k);
        if (c && yt$dom$datasets$get(c, "video-ids") == a.tb) {
            yt$uix$Button$hideMenu_(b, c);
        }
    };
    var yt$www$lists$addto$AddToMenu$addTo_ = function (a, b, c, d, e) {
        a.ia = b;
        yt$www$addto$addTo({
            Yd: a.tb,
            Xd: a.ia,
            If: c,
            $d: d,
            Zd: e,
            Nc: a.Sb,
            f: a.fg,
            B: a.eg,
            j: a
        });
        yt$dom$datasets$remove(a.k, "video-ids");
        b = "";
        switch (a.ia) {
            case "PL":
                b = d ? "new_pl" : "pl";
                break;
            case "FL":
                b = "fav";
                break;
            case "WL":
                b = "wl";
        }
        d = {
            list: b,
            feature: a.Sb
        };
        if ((a = goog$dom$getAncestorByTagNameAndClass(a.ob, "a", null)) && a.href) {
            a = yt$uri$getQueryData(a.href);
            d.link_feature = a.feature || "";
        }
        a = yt$uri$buildQueryData(d);
        yt$tracking$track("addto", a, undefined);
    };
    yt$www$lists$addto$AddToMenu.prototype.fg = function (a, b) {
        this.G = b.list_id || "";
        this.Hc = b.setvideo_id || "";
        var c = b.html_content || "";
        var d = b.list_url || "";
        if (this.G && this.Hc) {
            var e = goog$dom$getElementByClass("addto-title", this.k);
            var f = document.createElement("a");
            f.href = d;
            f.innerHTML = e.innerHTML;
            goog$dom$removeChildren(e);
            e.appendChild(f);
            if (!goog$string$isEmpty(goog$dom$getElement("addto-note").value)) {
                yt$dom$setEnabled(this.$b, true);
            }
        }
        if (!this.je && (d = yt$dom$getAncestorByClass(this.ob, "ux-thumb-wrap"))) {
            if ((e = goog$dom$getElementByClass("video-in-quicklist", d))) {
                goog$dom$removeNode(e);
            }
            e = document.createElement("span");
            e.className = "video-in-quicklist";
            e.innerHTML = c;
            d.appendChild(e);
        }
        c = yt$getMsg("PLAYLIST_BAR_ADDED_TO_PLAYLIST");
        if (this.oe) {
            c = yt$getMsg("PLAYLIST_BAR_ADDED_TO_FAVORITES");
        }
        yt$www$lists$onVideosAdded(this.ia, this.G, this.D, c);
    };
    yt$www$lists$addto$AddToMenu.prototype.eg = function (a, b) {
        var c = b && b.error_message;
        if (c) {
            goog$dom$getElementByClass("error-details", this.e.dc).innerHTML = c;
            var c = goog$dom$getElementByClass("show-menu-link", this.e.dc);
            var d = yt$events$listen(
                c,
                "click",
                goog$bind(function (a) {
                    a.preventDefault();
                    yt$events$unlistenByKey(d);
                    goog$dom$classes$remove(this.e.ra, "dismissed-panel", "fade", "slide");
                    goog$dom$classes$remove(this.e.Uc, "dismissed-panel", "fade", "slide");
                    a = goog$dom$getElementByClass("close-note", this.k);
                    yt$style$hide(a);
                    if (this.mg) {
                        yt$www$lists$addto$AddToMenu$switchPanel_(this, this.e.ka, true);
                    } else {
                        yt$www$lists$addto$AddToMenu$switchPanel_(this, this.e.list, true);
                    }
                }, this)
            );
            if ((c = goog$dom$getElement("addto-create-name"))) {
                c.disabled = false;
            }
            goog$dom$classes$remove(this.e.dc, "dismissed-panel", "fade", "slide");
            yt$www$lists$addto$AddToMenu$switchPanel_(this, this.e.dc);
        } else {
            yt$www$lists$addto$AddToMenu$hide_(this);
        }
        if (this.je) {
            yt$www$watch$actions$showError_(0, b);
        }
    };
    yt$www$lists$addto$AddToMenu.prototype.rg = function () {
        yt$net$ajax$send("/playlist_bar_ajax", {
            method: "POST",
            kb: true,
            g: {
                action_set_playlist_item_annotation: 1
            },
            n: {
                annotation: goog$dom$getElement("addto-note").value,
                playlist_id: this.G,
                setvideo_id: this.Hc,
                session_token: yt$net$ajax$tokenMap_.playlist_bar_ajax
            },
            f: this.Qf,
            B: this.Pf,
            j: this
        });
        yt$www$lists$addto$AddToMenu$switchPanel_(this, this.e.Td);
    };
    yt$www$lists$addto$AddToMenu.prototype.Qf = function () {
        var a = goog$dom$getElementByClass("addto-title", this.e.ra);
        var b = yt$dom$cloneNode_(a);
        goog$dom$classes$add(b, "yt-uix-tooltip-reverse");
        goog$dom$getElementByClass("panel-content", this.e.se).appendChild(b);
        yt$www$lists$addto$AddToMenu$switchPanel_(this, this.e.se);
        yt$setTimeout(
            goog$bind(function () {
                yt$uix$Tooltip$hideTip_(yt$uix$Tooltip.getInstance(), b);
                yt$www$lists$addto$AddToMenu$hide_(this);
            }, this),
            3000
        );
    };
    yt$www$lists$addto$AddToMenu.prototype.Pf = function (a, b) {
        var c = b && b.errors;
        if (c) {
            var d = goog$dom$getElementByClass("error-details", this.e.Yc);
            goog$dom$removeChildren(d);
            goog$array$forEach(c, function (a) {
                var b = document.createElement("li");
                b.innerHTML = a;
                d.appendChild(b);
            });
            var c = goog$dom$getElementByClass("add-note-link", this.e.Yc);
            var e = yt$events$listen(
                c,
                "click",
                goog$bind(function (a) {
                    a.preventDefault();
                    yt$events$unlistenByKey(e);
                    goog$dom$classes$remove(this.e.Td, "dismissed-panel");
                    yt$www$lists$addto$AddToMenu$switchPanel_(this, this.e.ra);
                }, this)
            );
            yt$www$lists$addto$AddToMenu$switchPanel_(this, this.e.Yc);
        } else {
            yt$www$lists$addto$AddToMenu$hide_(this);
        }
    };
    yt$www$lists$addto$AddToMenu.prototype.jh = function () {
        var a = yt$uri$setQueryData("/addto_ajax", {
            action_redirect_to_signin_with_add: 1,
            list_type: "WL",
            video_ids: this.tb,
            next_url: document.location
        });
        var b = document.createElement("form");
        b.action = a;
        b.method = "POST";
        a = document.createElement("input");
        a.type = "hidden";
        a.name = "session_token";
        a.value = yt$net$ajax$tokenMap_.addto_ajax_logged_out;
        b.appendChild(a);
        document.body.appendChild(b);
        b.submit();
    };
    var yt$www$lists$pebblesmigration$onImportClick_ = function (a) {
        a = goog$dom$getAncestorByTagNameAndClass(a.currentTarget, "FORM");
        yt$net$ajax$sendForm(a, {
            method: "POST",
            n: {
                session_token: yt$net$ajax$tokenMap_.pebbles_ajax
            }
        });
    };
    var yt$www$lists$pebblesmigration$onWipeClick_ = function (a) {
        a = goog$dom$getAncestorByTagNameAndClass(a.currentTarget, "FORM");
        yt$net$ajax$sendForm(a, {
            method: "POST",
            n: {
                session_token: yt$net$ajax$tokenMap_.pebbles_ajax
            }
        });
    };
    var yt$www$masthead$accountswitch$enabled_ = false;
    window.gapi = window.gapi || {};
    var gapi$URI_RE_ = /^(https?:)?\/\/([^/:@]*)(:[0-9]+)?(\/[\w.,:!=/-]*)(\?[^#]*)?(#.*)?$/;
    var gapi$HINT_RE_ = /^[?#]([^&]*&)*jsh=([^&]*)/;
    var gapi$warn_ = function (a) {
        var b = window.console;
        if (b) {
            b.warn("gapi.load: " + a);
        }
    };
    var gapi$getHint_ = function (a) {
        var b = window.location.search;
        var c = window.location.hash;
        var a = a.h;
        if ((b = (b && gapi$HINT_RE_.exec(b)) || (c && gapi$HINT_RE_.exec(c)))) {
            try {
                a = decodeURIComponent(b[2]);
            } catch (d) {
                gapi$warn_("Invalid hint " + b[2]);
            }
        }
        return a;
    };
    var gapi$sortUnique_ = function (a) {
        a.sort();
        for (var b = 0; b < a.length;) {
            if (!a[b] || (b && a[b] == a[b - 1])) {
                a.splice(b, 1);
            } else {
                ++b;
            }
        }
    };
    var gapi$containsAll_ = function (a, b) {
        var c = {};
        for (var d = 0; d < b.length; d++) {
            c[b[d]] = true;
        }
        for (d = 0; d < a.length; d++) {
            if (!c.hasOwnProperty(a[d])) {
                return false;
            }
        }
        return true;
    };
    var gapi$isSync_ = function (a) {
        if (document.readyState != "loading") {
            return false;
        }
        if (typeof window.___gapisync != "undefined") {
            return window.___gapisync;
        }
        if (a && ((a = a.sync), typeof a != "undefined")) {
            return a;
        }
        for (var a = document.getElementsByTagName("meta"), b = 0, c; (c = a[b]); ++b) {
            if (c.getAttribute("name") == "generator" && c.getAttribute("content") == "blogger") {
                return true;
            }
        }
        return false;
    };
    var gapi$loadScript_ = function (a, b) {
        if (gapi$isSync_(a)) {
            document.write('<script src="' + encodeURI(b) + '"></script>');
        } else {
            var c = document.createElement("script");
            c.setAttribute("src", b);
            c.async = true;
            var d = document.getElementsByTagName("script")[0];
            d.parentNode.insertBefore(c, d);
        }
    };
    var gapi$buildUrl_ = function (a, b, c, d, e, f) {
        var g = c.shift();
        var j;
        j =
            g == "r"
                ? "https://ssl.gstatic.com"
                : g == "m"
                  ? d.ms || "https://apis.google.com"
                  : (j = c.shift()) && j.replace(/\/+$/, "");
        var o;
        if (g == "r") {
            o = c.shift();
            o = (o.indexOf("/webclient/jsx/") ? "/webclient/js/" : "") + o;
        } else {
            o = c.shift();
        }
        var x = g == "d";
        var C = (x && c.shift()) || "gcjs-3p";
        var c = x && c.shift();
        if (g == "d") {
            e = "/" + a.join(":") + (b.length ? "!" + b.join(":") : "") + ".js?container=" + C + "&c=2&jsload=0";
            if (o) {
                e += "&r=" + o;
            }
            if (c == "d") {
                e += "&debug=1";
            }
        } else if (g == "r" || g == "f") {
            e = (o.indexOf("/") ? "/" : "") + o + "/" + a.join("__") + (b.length ? "--" + b.join("__") : "") + ".js";
        } else if (g == "m" || g == "n") {
            a = a.join(",").replace(/\./g, "_").replace(/-/g, "_");
            a = (o || "").replace("__features__", a);
            a = e.nodep ? a.replace("/d=1/", "/d=0/") : a;
            if (f) {
                if (!a.match(/\/$/)) {
                    a += "/";
                }
                a += "cb=gapi." + encodeURIComponent(f);
            }
            e = a;
        } else {
            gapi$warn_("Unknown hint type " + g);
            return "";
        }
        if (!j) {
            return "";
        }
        e = j + e;
        f = gapi$URI_RE_.exec(e);
        if (!(j = !f)) {
            if (!(j = !!/\.\.|\/\//.test(f[4]))) {
                f = f[2];
                a: if (g == "r") {
                    d = e.substr(0, 23) == "https://ssl.gstatic.com";
                } else if (g == "m") {
                    d = d.ms || "https://apis.google.com";
                    d = e.substr(0, d.length) == d;
                } else {
                    d = d.m;
                    if (f && d) {
                        if (!/^[0-9a-zA-Z.-]+$/.test(f)) {
                            d = false;
                            break a;
                        }
                        d = d.split(",");
                        g = 0;
                        for (j = d.length; g < j; ++g) {
                            a = d[g];
                            b = f.lastIndexOf(a);
                            if ((b == 0 || a.charAt(0) == "." || f.charAt(b - 1) == ".") && f.length - a.length == b) {
                                d = true;
                                break a;
                            }
                        }
                    }
                    d = false;
                }
                j = !d;
            }
        }
        if (j) {
            throw "gapi.load: Invalid URI" + (e && " " + e);
        }
        return e;
    };
    var gapi$pushTo_ = function (a, b, c) {
        if (c) {
            (a[b] = a[b] || []).push(c);
        }
    };
    var gapi$processQueue_ = function (a) {
        if (a.q && a.q.length > 0) {
            (window.gapi.load || gapi$load).apply(null, a.q.shift());
        }
    };
    var gapi$safeCall_ = function (a) {
        if (a) {
            try {
                a();
            } catch (b) {
                return b;
            }
        }
        return null;
    };
    var gapi$global_ = window.gapi;
    var gapi$getPrivateNamespace_ = function () {
        if (gapi$global_._) {
            return gapi$global_._;
        }
        var a;
        if ((a = Object.create) && /\[native code\]/.test(a)) {
            a = a(null);
        } else {
            a = {};
            for (var b in a) {
                a[b] = undefined;
            }
        }
        return (gapi$global_._ = a);
    };
    var gapi$registerCallback_ = function (a, b, c, d, e) {
        var f = (e.Q = e.Q || []);
        var g = (e.lc = e.lc || {});
        f.push([a, b, d]);
        gapi$global_[c] = function (b) {
            gapi$global_[c] = undefined;
            if (!g[a]) {
                g[a] = b;
                var d;
                for (; f[0] && g[f[0][0]];) {
                    b = f.shift();
                    gapi$applyConfig_(b[2], e);
                    g[b[0]].call(window, gapi$getPrivateNamespace_());
                    g[b[0]] = true;
                    if ((b = gapi$safeCall_(b[1])) && !d) {
                        d = b;
                    }
                }
                e.p = undefined;
                gapi$processQueue_(e);
                if (d) {
                    throw d;
                }
            }
        };
    };
    var gapi$applyConfig_ = function (a, b) {
        gapi$pushTo_(b, "ci", a._ci);
        var c = a.config;
        if (gapi$global_.config) {
            gapi$global_.config.update(c);
        } else {
            gapi$pushTo_(b, "cu", c);
        }
    };
    var gapi$nextCallbackName_ = function (a) {
        if (!a.I) {
            a.I = 0;
        }
        return "loaded" + a.I++;
    };
    var gapi$load = function (a, b) {
        var c;
        var d = {};
        if (typeof b !== "function") {
            d = b || {};
            c = d.callback;
        } else {
            c = b;
        }
        var e = (window.___jsl = window.___jsl || {});
        var f = gapi$getHint_(e);
        var g = f && !!f.match(/\/gapi\/|ms=gapi/);
        if (e.p) {
            gapi$pushTo_(e, "q", [a, b]);
        } else {
            if (!f) {
                throw "gapi.load: No hint present";
            }
            var j = f.split(";");
            var o = j[0] == "m" || j[0] == "n";
            var f = [];
            var x = [];
            if (e.il && typeof e.il === "function") {
                f = e.il(a);
                d.nodep = 1;
            } else {
                f = a.split(":");
                if (!d.nodep) {
                    gapi$sortUnique_(f);
                }
                x = e.l = e.l || [];
                gapi$sortUnique_(x);
            }
            if (g) {
                if (
                    !gapi$containsAll_(f, x) &&
                    ((g = gapi$nextCallbackName_(e)), (j = gapi$buildUrl_(f, x, j, e, d, g)))
                ) {
                    e.p = f;
                    gapi$registerCallback_(j, c, g, d, e);
                    x.push.apply(x, f);
                    gapi$loadScript_(d, j);
                    return;
                }
                gapi$applyConfig_(d, e);
                if (c) {
                    var C = gapi$safeCall_(c);
                }
            } else {
                gapi$applyConfig_(d, e);
                if (!gapi$containsAll_(f, x)) {
                    var F = o ? "cm" : "c";
                    if ((j = gapi$buildUrl_(f, x, j, e, d, null))) {
                        e.p = f;
                        e.o = 1;
                        e[F] = function () {
                            e.p = undefined;
                            e[F] = undefined;
                            var a = gapi$safeCall_(c);
                            gapi$processQueue_(e);
                            if (a) {
                                throw a;
                            }
                        };
                        x.push.apply(x, f);
                        gapi$loadScript_(d, j);
                        return;
                    }
                }
                C = gapi$safeCall_(c);
            }
            gapi$processQueue_(e);
            if (C) {
                throw C;
            }
        }
    };
    var yt$www$watch$activity$lastActive_ = -1;
    var yt$www$watch$activity$init = function () {
        if (yt$www$watch$activity$lastActive_ == -1) {
            yt$www$watch$activity$lastActive_ = parseInt(yt$net$cookies$get("ACTIVITY", "0"), 10);
            yt$events$listen(document, "keypress", yt$www$watch$activity$onKeyPress_);
            yt$events$listen(document, "click", yt$www$watch$activity$onClick_);
        }
    };
    var yt$www$watch$activity$onKeyPress_ = function () {
        yt$www$watch$activity$setTimestamp();
    };
    var yt$www$watch$activity$onClick_ = function () {
        yt$www$watch$activity$setTimestamp();
    };
    var yt$www$watch$activity$setTimestamp = function () {
        var a = goog$now();
        if (!(a - yt$www$watch$activity$lastActive_ < 1000)) {
            yt$www$watch$activity$lastActive_ = a;
            yt$net$cookies$set("ACTIVITY", "" + a);
        }
    };
    var yt$www$watch$activity$getTimeSinceActive = function () {
        return goog$now() - yt$www$watch$activity$lastActive_;
    };
    var yt$www$notifications$NotificationsWidget = function (a, b, c, d, e) {
        this.A = null;
        this.Lh = c;
        this.Ah = a;
        this.Bh = b;
        this.Ih = d;
        this.Kh = yt$getConfig("GOOGLEPLUS_HOST") + (e != null ? "/u/" + e : "") + "/_/notifications/frame#pid=36";
        this.Jh = goog$dom$getElement(a);
        this.ub = goog$dom$getElement(b);
    };
    var yt$www$notifications$getOpenHandlers_ = function (a, b, c, d) {
        return {
            onOpen: goog$bind(function (a) {
                return a.openInto(c);
            }, a),
            onReady: goog$bind(function () {
                if (b.showOnepick && d) {
                    b.showOnepick();
                }
            }, a),
            onClose: function (a) {
                if (b.hideOnepick && d) {
                    b.hideOnepick();
                }
                a.remove();
            }
        };
    };
    var yt$www$notifications$callMethod_ = function (a, b, c) {
        if (typeof c === "undefined") {
            a[b]();
        } else {
            a[b](c);
        }
    };
    yt$www$notifications$NotificationsWidget.prototype.xb = function (a) {
        var b = {
            setNotificationWidgetHeight: goog$bind(function (a) {
                this.Jh.style.height = a;
            }, this),
            setNotificationText: goog$bind(function (a) {
                this.Lh(parseInt(a, 10));
            }, this),
            hideNotificationWidget: function () {
                if (a.hideNotificationWidget) {
                    a.hideNotificationWidget();
                }
            },
            openSharebox: function () {},
            onError: function () {}
        };
        this.A = iframes.open(
            this.Kh,
            {
                style: "iframe-style"
            },
            {
                origin: window.location.protocol + "//" + window.location.hostname,
                source: "yt",
                hl: this.Ih
            },
            b,
            function () {}
        );
    };
    yt$www$notifications$NotificationsWidget.prototype.load = function (a) {
        iframes.setHandler("iframe-style", yt$www$notifications$getOpenHandlers_(this, a, this.Ah, false));
        iframes.setHandler("onepick", yt$www$notifications$getOpenHandlers_(this, a, this.Bh, true));
        this.xb(a);
    };
    yt$www$notifications$NotificationsWidget.prototype.close = function () {
        yt$www$notifications$callMethod_(this.A, "onHide");
    };
    yt$www$notifications$NotificationsWidget.prototype.wd = function () {
        yt$www$notifications$callMethod_(this.A, "onShowNotificationsOnly", {});
    };
    yt$www$notifications$NotificationsWidget.prototype.xd = function () {
        var a = window.location.href;
        if (a.indexOf("/watch?") != -1) {
            yt$www$notifications$callMethod_(this.A, "setPrefill", {
                items: [
                    {
                        type: "http://schema.org/VideoObject",
                        id: a,
                        properties: {
                            url: [a]
                        }
                    }
                ]
            });
        }
        yt$www$notifications$callMethod_(this.A, "onShowShareboxOnly", {});
    };
    var yt$www$notifications$NotificationsWidget$setActive_ = function (a, b) {
        if (b) {
            yt$www$notifications$callMethod_(a.A, "onActive");
        } else {
            yt$www$notifications$callMethod_(a.A, "onIdle");
        }
    };
    var yt$www$sandbar$Sandbar = function (a, b) {
        this.wb = this.vb = false;
        this.Zc = 0;
        this.c = goog$dom$getElement("sb-container");
        this.fc = goog$dom$getElement("sb-button-notify");
        this.Eg = yt$dom$getFirstElementByTagNameAndClass(
            "SPAN",
            "yt-uix-button-content",
            goog$dom$getElement("sb-button-notify")
        );
        this.ub = goog$dom$getElement("sb-onepick-target");
        this.A = new yt$www$notifications$NotificationsWidget(
            "sb-target",
            "sb-onepick-target",
            goog$bind(this.Jg, this),
            a,
            b
        );
        this.A.load({
            hideNotificationWidget: goog$bind(this.te, this),
            showOnepick: goog$bind(this.Ig, this),
            hideOnepick: goog$bind(this.Hg, this)
        });
        this.Fg = goog$style$getSize(this.ub);
        this.ue();
        yt$events$listen(window, "resize", goog$bind(this.ue, this));
        yt$events$listen(window, "click", goog$bind(this.te, this));
        yt$www$watch$activity$init();
        yt$setInterval(goog$bind(this.Gg, this), 120000);
    };
    yt$www$sandbar$Sandbar.prototype.Ii = function (a) {
        if (this.vb) {
            yt$www$sandbar$Sandbar$hideNotifications_(this);
            yt$www$notifications$NotificationsWidget$setActive_(this.A, true);
        } else {
            if (this.wb) {
                yt$www$sandbar$Sandbar$hideSharebox_(this);
            }
            this.wd();
            yt$www$notifications$NotificationsWidget$setActive_(this.A, false);
        }
        yt$events$stopPropagation(a);
    };
    yt$www$sandbar$Sandbar.prototype.Ji = function (a) {
        if (this.wb) {
            yt$www$sandbar$Sandbar$hideSharebox_(this);
        } else {
            if (this.vb) {
                yt$www$sandbar$Sandbar$hideNotifications_(this);
            }
            this.xd();
        }
        yt$events$stopPropagation(a);
    };
    yt$www$sandbar$Sandbar.prototype.wd = function () {
        this.A.close();
        yt$www$sandbar$Sandbar$setCardVisible_(this, true, "notif");
        goog$dom$classes$add(this.fc, "sb-notif-clicked");
        this.A.wd();
        this.vb = true;
    };
    yt$www$sandbar$Sandbar.prototype.xd = function () {
        this.A.close();
        yt$www$sandbar$Sandbar$setCardVisible_(this, true, "sharebox");
        this.A.xd();
        this.wb = true;
    };
    var yt$www$sandbar$Sandbar$setCardVisible_ = function (a, b, c) {
        c = "sb-card-" + c;
        if (b) {
            goog$dom$classes$addRemove(a.c, "sb-off", "sb-on");
            goog$dom$classes$add(a.c, c);
        } else {
            goog$dom$classes$addRemove(a.c, "sb-on", "sb-off");
            goog$dom$classes$remove(a.c, c);
        }
    };
    var yt$www$sandbar$Sandbar$hideSharebox_ = function (a) {
        yt$www$sandbar$Sandbar$setCardVisible_(a, false, "sharebox");
        a.wb = false;
    };
    var yt$www$sandbar$Sandbar$hideNotifications_ = function (a) {
        yt$www$sandbar$Sandbar$setCardVisible_(a, false, "notif");
        a.vb = false;
        goog$dom$classes$remove(a.fc, "sb-notif-clicked");
    };
    yt$www$sandbar$Sandbar.prototype.te = function () {
        if (this.vb || this.wb) {
            this.A.close();
            yt$www$sandbar$Sandbar$hideNotifications_(this);
            yt$www$sandbar$Sandbar$hideSharebox_(this);
            yt$www$sandbar$Sandbar$updateCount_(this);
        }
    };
    yt$www$sandbar$Sandbar.prototype.Jg = function (a) {
        this.Zc = a;
        yt$www$sandbar$Sandbar$updateCount_(this);
    };
    var yt$www$sandbar$Sandbar$updateCount_ = function (a) {
        goog$dom$setTextContent(a.Eg, a.Zc + "");
        if (a.Zc == 0) {
            goog$dom$classes$addRemove(a.fc, "sb-notif-on", "sb-notif-off");
        } else {
            goog$dom$classes$addRemove(a.fc, "sb-notif-off", "sb-notif-on");
        }
    };
    yt$www$sandbar$Sandbar.prototype.Ig = function () {
        goog$dom$classes$addRemove(this.ub, "sb-off", "sb-on");
    };
    yt$www$sandbar$Sandbar.prototype.Hg = function () {
        goog$dom$classes$addRemove(this.ub, "sb-on", "sb-off");
    };
    yt$www$sandbar$Sandbar.prototype.ue = function () {
        var a = Math.max((goog$dom$getViewportSize_(window).height - this.Fg.height) / 2, 0);
        var b = this.ub;
        if (goog$isString("top")) {
            goog$style$setStyle_(b, a + "px", "top");
        } else {
            goog$object$forEach("top", goog$partial(goog$style$setStyle_, b));
        }
    };
    yt$www$sandbar$Sandbar.prototype.Gg = function () {
        if (yt$www$watch$activity$getTimeSinceActive() > 600000) {
            yt$www$notifications$NotificationsWidget$setActive_(this.A, false);
        } else {
            yt$www$notifications$NotificationsWidget$setActive_(this.A, true);
        }
    };
    var yt$www$picker$hideAllExcept_ = function (a) {
        for (var b = goog$dom$getFirstElementChild(goog$dom$getElement("picker-container")); b;) {
            if (a && a != b.id) {
                yt$style$hide(b);
            }
            b = b.nextElementSibling != undefined ? b.nextElementSibling : goog$dom$getNextElementNode_(b.nextSibling);
        }
    };
    var yt$www$subscriptions$sendRequest_;
    var yt$www$subscriptions$sessionToken_;
    var yt$www$subscriptions$Request = function (a, b) {
        this.bc = a;
        this.Ec = b;
        this.userData = {};
    };
    yt$www$subscriptions$Request.prototype.sf = function () {
        return {};
    };
    yt$www$subscriptions$Request.prototype.Ef = function (a) {
        this.bc(this, a);
    };
    yt$www$subscriptions$Request.prototype.Nd = function (a) {
        this.Ec(this, a);
    };
    var yt$www$subscriptions$SubscriptionRequest = function (a, b) {
        yt$www$subscriptions$Request.call(this, a, b);
    };
    goog$inherits(yt$www$subscriptions$SubscriptionRequest, yt$www$subscriptions$Request);
    yt$www$subscriptions$SubscriptionRequest.prototype.Cb = "/subscription_ajax";
    yt$www$subscriptions$SubscriptionRequest.prototype.gb = {};
    var yt$www$subscriptions$SubscriptionRequest$addUrlParams_ = function (a, b) {
        a.Cb = yt$uri$appendQueryData(a.Cb, b);
    };
    yt$www$subscriptions$SubscriptionRequest.prototype.sf = function () {
        return this.gb;
    };
    yt$www$subscriptions$SubscriptionRequest.prototype.Ef = function (a) {
        var b = null;
        var c = [yt$getMsg("SUBSCRIBE_SERVER_ERROR")];
        try {
            b = goog$json$parse(a.responseText);
        } catch (d) {}
        if ((a = b && b.response)) {
            this.bc(this, a);
        } else {
            this.Ec(this, c);
        }
    };
    yt$www$subscriptions$SubscriptionRequest.prototype.Nd = function (a, b) {
        var c = b ? [b] : [yt$getMsg("SUBSCRIBE_SERVER_ERROR")];
        try {
            var d = goog$json$parse(a.responseText);
        } catch (e) {
            this.Ec(this, c);
            return;
        }
        this.Ec(this, d.errors);
    };
    var yt$www$subscriptions$init_ = function (a) {
        yt$www$subscriptions$sendRequest_ = yt$net$ajax$sendRequest;
        yt$www$subscriptions$sessionToken_ = a;
    };
    var yt$www$subscriptions$pendingRequest_ = null;
    var yt$www$subscriptions$queue_ = [];
    var yt$www$subscriptions$enqueue_ = function (a) {
        yt$www$subscriptions$queue_.push(a);
        if (!yt$www$subscriptions$pendingRequest_) {
            yt$www$subscriptions$sendNext_();
        }
    };
    var yt$www$subscriptions$sendNext_ = function () {
        if (yt$www$subscriptions$queue_.length && !yt$www$subscriptions$pendingRequest_) {
            var a = yt$www$subscriptions$queue_.shift();
            if (a) {
                var b = a.sf();
                if (!b) {
                    b = {};
                }
                b.session_token = yt$www$subscriptions$sessionToken_;
                try {
                    var c = {
                        method: "POST",
                        postBody: yt$uri$buildQueryData(b),
                        onComplete: yt$www$subscriptions$onComplete_,
                        onException: yt$www$subscriptions$onError_,
                        onError: yt$www$subscriptions$onError_
                    };
                } catch (d) {
                    a.Nd({}, yt$getMsg("SUBSCRIBE_JS_ERROR"));
                    return;
                }
                yt$www$subscriptions$pendingRequest_ = a;
                yt$www$subscriptions$sendRequest_(a.Cb, c);
            }
        }
    };
    var yt$www$subscriptions$onComplete_ = function (a) {
        var b = yt$www$subscriptions$pendingRequest_;
        yt$www$subscriptions$pendingRequest_ = null;
        yt$www$subscriptions$sendNext_();
        if (b) {
            b.Ef(a);
        }
    };
    var yt$www$subscriptions$onError_ = function (a) {
        var b = yt$www$subscriptions$pendingRequest_;
        yt$www$subscriptions$pendingRequest_ = null;
        yt$www$subscriptions$sendNext_();
        if (b) {
            b.Nd(a);
        }
    };
    var yt$www$subscriptions$button$toggleMenu = function (a) {
        var b = yt$www$subscriptions$button$getContainer_(a);
        if (yt$dom$datasets$get(b, "subscription-menu-type") == "button") {
            b = yt$uix$Button.getInstance();
            b = yt$uix$Button$getMenu_(b, a);
            if (goog$dom$getElementByClass("subscription-menu-loader", b)) {
                a.loader = b.innerHTML;
            }
            yt$www$subscriptions$button$loadMenu_(a);
        } else {
            b = yt$www$subscriptions$button$getContainer_(a);
            b = goog$dom$getElement(yt$dom$datasets$get(b, "subscription-expandable-id"));
            if (yt$style$isDisplayed(b)) {
                yt$style$hide(b);
                goog$dom$classes$add(a, "yt-uix-expander-collapsed");
            } else {
                yt$www$subscriptions$button$loadMenu_(a);
                yt$style$show(b);
                goog$dom$classes$remove(a, "yt-uix-expander-collapsed");
            }
        }
    };
    var yt$www$subscriptions$button$loadMenu_ = function (a) {
        if (!yt$dom$datasets$get(a, "loaded")) {
            var b = yt$www$subscriptions$button$getContainer_(a);
            var c = yt$dom$datasets$get(b, "subscription-type");
            var d = yt$dom$datasets$get(b, "subscription-xsrf") || "";
            var e = yt$dom$datasets$get(b, "subscription-menu-type");
            var f = {};
            var g = yt$dom$datasets$get(b, "subscription-value");
            if (c == "playlist") {
                f.action_get_subscription_form_for_playlist = 1;
                c = "p";
            } else if (c == "blog") {
                f.action_get_subscription_form_for_blog = 1;
                c = "b";
            } else if (c == "topic") {
                f.action_get_subscription_form_for_topic = 1;
                c = "l";
            } else {
                f.action_get_subscription_form_for_user = 1;
                c = "u";
            }
            yt$www$subscriptions$init_(d);
            d = new yt$www$subscriptions$SubscriptionRequest(yt$www$subscriptions$button$onMenuLoaded_, function () {
                yt$www$subscriptions$button$updateState_(b, true);
            });
            yt$www$subscriptions$SubscriptionRequest$addUrlParams_(d, f);
            f = {};
            f[c] = g;
            f.menu_type = e;
            d.gb = f || {};
            d.userData.eventTrigger = a;
            d.userData.subscription = b;
            yt$www$subscriptions$enqueue_(d);
        }
    };
    var yt$www$subscriptions$button$getContainer_ = function (a) {
        return goog$dom$getAncestorByTagNameAndClass(a, null, "subscription-container");
    };
    var yt$www$subscriptions$button$getContainerFromMenu_ = function (a) {
        var b = goog$dom$getAncestorByTagNameAndClass(a, null, "subscription-menu-expandable");
        if (b) {
            return b.expandableMenuSubscription;
        }
        a = goog$dom$getAncestorByTagNameAndClass(a, null, "yt-uix-button-menu");
        b = yt$uix$Button.getInstance();
        a = yt$uix$Button$getMenuButton_(b, a);
        return yt$www$subscriptions$button$getContainer_(a);
    };
    var yt$www$subscriptions$button$getMatchingContainers_ = function (a) {
        var b = goog$dom$getElementsByClass("subscription-container");
        var c = yt$dom$datasets$get(a, "subscription-type");
        var d = yt$dom$datasets$get(a, "subscription-value");
        return (b = goog$array$filter(b, function (a) {
            if (yt$dom$datasets$get(a, "subscription-type") == c && yt$dom$datasets$get(a, "subscription-value") == d) {
                return true;
            }
        }));
    };
    var yt$www$subscriptions$button$updateState_ = function (a, b) {
        var c = yt$dom$datasets$get(a, "subscription-id");
        var d = yt$www$subscriptions$button$getMatchingContainers_(a);
        goog$array$forEach(d, function (a) {
            if (b) {
                if (yt$dom$datasets$get(a, "subscription-menu-type") == "button") {
                    yt$www$subscriptions$button$resetButtonMenu_(a);
                } else {
                    yt$www$subscriptions$button$resetExpandableMenu_(a, true);
                }
                var d = yt$dom$getFirstElementByTagNameAndClass(null, "subscription-subscribed-container", a);
                var g = yt$dom$getFirstElementByTagNameAndClass(null, "subscribe-button", a);
                var j = yt$dom$getFirstElementByTagNameAndClass(null, "subscription-options-button", a);
                yt$dom$datasets$remove(a, "subscription-id");
                yt$style$hide(d);
                yt$style$show(g);
                yt$dom$datasets$remove(j, "loaded");
            } else {
                d = yt$dom$getFirstElementByTagNameAndClass(null, "subscription-subscribed-container", a);
                g = yt$dom$getFirstElementByTagNameAndClass(null, "subscribe-button", a);
                yt$dom$datasets$set(a, "subscription-id", c);
                yt$style$hide(g);
                yt$style$show(d);
            }
        });
    };
    var yt$www$subscriptions$button$setMenuContent_ = function (a, b) {
        if (yt$dom$datasets$get(a, "subscription-menu-type") == "button") {
            var c = goog$dom$getElementByClass("subscription-options-button", a);
            var d = yt$uix$Button.getInstance();
            var e = yt$uix$Button$getMenu_(d, c);
            if (e) {
                e.innerHTML = b;
                yt$uix$Button$positionMenu_(d, c, e);
            }
        } else {
            c = goog$dom$getElement(yt$dom$datasets$get(a, "subscription-expandable-id"));
            d = goog$dom$getElementByClass("subscription-menu-loader", c);
            e = goog$dom$getElementByClass("subscription-menu-body", c);
            e.innerHTML = b;
            c.expandableMenuSubscription = a;
            yt$style$hide(d);
            yt$style$show(e);
        }
    };
    var yt$www$subscriptions$button$resetButtonMenu_ = function (a) {
        var a = goog$dom$getElementByClass("subscription-options-button", a);
        var b = yt$uix$Button.getInstance();
        yt$uix$Button$getMenu_(b, a);
        yt$uix$Button$hideMenu_(b, a);
        if (a.loader) {
            var c = a.loader;
            var d = yt$uix$Button$getMenu_(b, a);
            if (d) {
                d.innerHTML = c;
                yt$uix$Button$positionMenu_(b, a, d);
            }
        }
        yt$dom$datasets$remove(a, "loaded");
    };
    var yt$www$subscriptions$button$resetExpandableMenu_ = function (a, b) {
        var c = yt$uix$Expander.getInstance();
        var d = goog$dom$getElementByClass("yt-uix-expander", a);
        var e = goog$dom$getElement(yt$dom$datasets$get(a, "subscription-expandable-id"));
        if (b) {
            var f = goog$dom$getElementByClass("subscription-menu-loader", e);
            var g = goog$dom$getElementByClass("subscription-menu-body", e);
            yt$dom$datasets$remove(d, "loaded");
            yt$style$show(f);
            yt$style$hide(g);
            g.innerHTML = "";
        }
        if (yt$style$isDisplayed(e)) {
            c.collapse(d);
        }
    };
    var yt$www$subscriptions$button$onSubscribed_ = function (a, b) {
        var c = a.userData.subscription;
        var d = b.html_content;
        a.userData.eventTrigger.disabled = false;
        yt$dom$datasets$set(c, "subscription-id", b.id);
        yt$www$subscriptions$button$updateState_(c, false);
        if (d) {
            yt$www$subscriptions$button$setMenuContent_(c, d);
            d = goog$dom$getElementByClass("subscription-options-button", c);
            yt$dom$datasets$set(d, "loaded", "true");
            yt$www$subscriptions$button$toggleMenu(d);
            if (yt$dom$datasets$get(c, "subscription-menu-type") == "button") {
                yt$uix$Button.getInstance().Rd(d);
            }
        }
    };
    var yt$www$subscriptions$button$removeCollection_ = function (a) {
        goog$dom$removeNode(a.userData.collection);
    };
    var yt$www$subscriptions$button$onUnsubscribed_ = function (a) {
        yt$www$subscriptions$button$updateState_(a.userData.subscription, true);
    };
    var yt$www$subscriptions$button$onMenuLoaded_ = function (a, b) {
        var c = a.userData.eventTrigger;
        var d = a.userData.subscription;
        var e = b.html_content;
        yt$dom$datasets$set(d, "subscription-id", b.id);
        yt$www$subscriptions$button$setMenuContent_(d, e);
        yt$dom$datasets$set(c, "loaded", "true");
    };
    var yt$www$subscriptions$button$onUnsubscribeSuccess_ = function (a) {
        var b = a.userData.subscription;
        a.userData.eventTrigger.disabled = false;
        a = yt$www$subscriptions$button$getMatchingContainers_(b);
        goog$array$forEach(a, function (a) {
            if (yt$dom$datasets$get(a, "subscription-menu-type") == "button") {
                yt$www$subscriptions$button$resetButtonMenu_(a);
            } else {
                yt$www$subscriptions$button$resetExpandableMenu_(a, true);
            }
        });
    };
    var yt$www$subscriptions$button$onRequestFailed_ = function (a) {
        if ((a = a.userData.eventTrigger)) {
            a.disabled = false;
        }
    };
    var yt$www$subscriptions$SubscriptionButton = function (a, b) {
        this.u = a;
        this.Yb = b || null;
        this.Xa = yt$dom$datasets$get(a, "subscription-type") || "user";
        this.Pc = yt$dom$datasets$get(a, "subscription-value") || "";
        this.rh = !!yt$dom$datasets$get(a, "enable-tooltip");
        this.Vb = !!yt$dom$datasets$get(a, "enable-hovercard");
        this.sb = false;
        this.cd();
    };
    yt$www$subscriptions$SubscriptionButton.prototype.getId = function () {
        return yt$dom$datasets$get(this.u, "subscription-id") || null;
    };
    var yt$www$subscriptions$SubscriptionButton$setId_ = function (a, b) {
        if (b) {
            yt$dom$datasets$set(a.u, "subscription-id", b);
        } else {
            yt$dom$datasets$remove(a.u, "subscription-id");
        }
        yt$www$subscriptions$SubscriptionButton$updateUi_(a);
    };
    yt$www$subscriptions$SubscriptionButton.prototype.getValue = function () {
        return this.Pc;
    };
    yt$www$subscriptions$SubscriptionButton.prototype.getType = function () {
        return this.Xa;
    };
    var yt$www$subscriptions$SubscriptionButton$updateUi_ = function (a) {
        goog$dom$classes$enable(a.u, "subscribed", !!a.getId());
        var b = yt$uix$BaseWidget$getCssClass(yt$uix$Hovercard.getInstance(), "target");
        goog$dom$classes$enable(a.u, b, !!a.getId() && a.Vb);
        if (a.rh) {
            b = (a.getId() ? "un" : "") + "subscribe-tooltip";
            b = yt$dom$datasets$get(a.u, b) || "";
            yt$uix$Tooltip$setTooltipText_(yt$uix$Tooltip.getInstance(), a.u, b);
        }
    };
    yt$www$subscriptions$SubscriptionButton.prototype.cd = function () {
        yt$events$listen(this.u, "click", goog$bind(this.Qh, this));
        yt$pubsub$subscribe("SUBSCRIBE", this.Xe, this);
        yt$pubsub$subscribe("UNSUBSCRIBE", this.Xe, this);
        if (this.Vb) {
            yt$events$listen(this.u, "mouseover", goog$bind(this.Rh, this));
        }
        yt$www$subscriptions$SubscriptionButton$updateUi_(this);
    };
    yt$www$subscriptions$SubscriptionButton.prototype.Xe = function (a, b, c, d) {
        if (c != this.getId() && this.getValue() == a && this.getType() == b) {
            yt$www$subscriptions$SubscriptionButton$setId_(this, c);
        }
        if (d != this.u && this.Vb) {
            yt$uix$Hovercard.getInstance().Z(this.u);
        }
    };
    yt$www$subscriptions$SubscriptionButton.prototype.Qh = function () {
        if (this.sb) {
            return false;
        }
        yt$uix$Tooltip$hideTip_(yt$uix$Tooltip.getInstance(), this.u);
        if (this.getId()) {
            yt$www$subscriptions$SubscriptionButton$unsubscribe_(this);
        } else {
            yt$www$subscriptions$SubscriptionButton$subscribe_(this);
        }
    };
    yt$www$subscriptions$SubscriptionButton.prototype.Rh = function () {
        if (this.getId()) {
            yt$setTimeout(
                goog$bind(function () {
                    yt$www$subscriptions$SubscriptionButton$loadHovercard_(this);
                }, this),
                350
            );
        }
    };
    var yt$www$subscriptions$SubscriptionButton$loadHovercard_ = function (a) {
        var b = yt$uix$Hovercard.getInstance();
        if (!a.ie && yt$uix$Card$isActive(b, a.u)) {
            a.ie = true;
            var c = {
                hovercard: 1
            };
            c["action_get_subscription_form_for_" + a.Xa] = 1;
            var d = {
                session_token: yt$net$ajax$tokenMap_.subscription_ajax
            };
            d[yt$www$subscriptions$SubscriptionButton$getTypeParam_(a)] = a.Pc;
            yt$net$ajax$send("/subscription_ajax", {
                method: "POST",
                g: c,
                n: d,
                j: a,
                f: function (a, c) {
                    var d = this.u;
                    var j = c.response.html_content;
                    var o = yt$uix$BaseWidget$findWidgetElement_(b, d);
                    if (o) {
                        var x = b.rb(o);
                        if (x) {
                            x.innerHTML = j;
                            if (goog$dom$classes$has(o, yt$uix$BaseWidget$getCssClass(b, "active"))) {
                                j = yt$uix$Card$getCard_(b, d, o);
                                yt$uix$Card$positionCard_(b, d, j);
                            }
                        }
                    }
                    yt$www$subscriptions$SubscriptionButton$bindHovercardForm_(this);
                },
                B: function () {
                    this.ie = false;
                }
            });
        }
    };
    var yt$www$subscriptions$SubscriptionButton$bindHovercardForm_ = function (a) {
        var b = yt$uix$Hovercard.getInstance();
        var c = yt$uix$BaseWidget$findWidgetElement_(b, a.u);
        var d = b.rb(c);
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
                        yt$net$ajax$send_(b, undefined, c, a, undefined);
                    }, this)
                );
            },
            a
        );
    };
    var yt$www$subscriptions$SubscriptionButton$subscribe_ = function (a) {
        if (yt$getConfig("LOGGED_IN")) {
            var b = yt$www$subscriptions$SubscriptionButton$getTypeParam_(a);
            var c = {};
            c["action_create_subscription_to_" + a.Xa] = 1;
            var d = yt$dom$datasets$get(a.u, "subscription-feature");
            if (d) {
                c.feature = d;
            }
            d = {
                session_token: yt$net$ajax$tokenMap_.subscription_ajax
            };
            d[b] = a.Pc;
            a.sb = true;
            a.u.disabled = true;
            yt$net$ajax$send("/subscription_ajax", {
                method: "POST",
                j: a,
                g: c,
                n: d,
                f: function (a, b) {
                    yt$www$subscriptions$SubscriptionButton$setId_(this, b.response.id);
                    yt$pubsub$publish("SUBSCRIBE", this.getValue(), this.getType(), this.getId(), this.u);
                    if (this.Vb) {
                        yt$uix$Hovercard.getInstance().show(this.u);
                        yt$www$subscriptions$SubscriptionButton$loadHovercard_(this);
                    }
                    if (this.Yb) {
                        this.Yb(this.u, true);
                    }
                },
                ga: function () {
                    this.sb = false;
                    this.u.disabled = false;
                }
            });
            yt$tracking$conversion$ping("subscribe");
        }
    };
    var yt$www$subscriptions$SubscriptionButton$unsubscribe_ = function (a) {
        var b = {
            s: a.getId(),
            session_token: yt$net$ajax$tokenMap_.subscription_ajax
        };
        var c = {
            action_remove_subscriptions: 1
        };
        var d = yt$dom$datasets$get(a.u, "subscription-feature");
        if (d) {
            c.feature = d;
        }
        a.sb = true;
        a.u.disabled = true;
        yt$net$ajax$send("/subscription_ajax", {
            method: "POST",
            j: a,
            g: c,
            n: b,
            f: function () {
                yt$www$subscriptions$SubscriptionButton$setId_(this, null);
                yt$pubsub$publish("UNSUBSCRIBE", this.getValue(), this.getType(), null, null);
                if (this.Yb) {
                    this.Yb(this.u, false);
                }
            },
            ga: function () {
                this.sb = false;
                this.u.disabled = false;
            }
        });
        yt$tracking$conversion$ping("unsubscribe");
    };
    var yt$www$subscriptions$SubscriptionButton$getTypeParam_ = function (a) {
        if (a.Xa == "playlist") {
            return "p";
        } else if (a.Xa == "blog") {
            return "b";
        } else if (a.Xa == "topic") {
            return "l";
        } else {
            return "u";
        }
    };
    var goog$storage$mechanism$Mechanism = function () {};
    var goog$storage$mechanism$IterableMechanism = function () {};
    goog$inherits(goog$storage$mechanism$IterableMechanism, goog$storage$mechanism$Mechanism);
    goog$storage$mechanism$IterableMechanism.prototype.N = function () {
        var a = 0;
        goog$iter$forEach(this.fb(true), function (b) {
            goog$asserts$assertString(b);
            a++;
        });
        return a;
    };
    goog$storage$mechanism$IterableMechanism.prototype.clear = function () {
        var a = goog$iter$toArray(this.fb(true));
        var b = this;
        goog$array$forEach(a, function (a) {
            b.remove(a);
        });
    };
    var goog$storage$mechanism$HTML5WebStorage = function (a) {
        this.fa = a;
    };
    goog$inherits(goog$storage$mechanism$HTML5WebStorage, goog$storage$mechanism$IterableMechanism);
    goog$storage$mechanism$HTML5WebStorage.prototype.set = function (a, b) {
        try {
            this.fa.setItem(a, b);
        } catch (c) {
            throw "Storage mechanism: Quota exceeded";
        }
    };
    goog$storage$mechanism$HTML5WebStorage.prototype.get = function (a) {
        a = this.fa.getItem(a);
        if (goog$isString(a) || a === null) {
            return a;
        }
        throw "Storage mechanism: Invalid value was encountered";
    };
    goog$storage$mechanism$HTML5WebStorage.prototype.remove = function (a) {
        this.fa.removeItem(a);
    };
    goog$storage$mechanism$HTML5WebStorage.prototype.N = function () {
        return this.fa.length;
    };
    goog$storage$mechanism$HTML5WebStorage.prototype.fb = function (a) {
        var b = 0;
        var c = new goog$iter$Iterator();
        var d = this;
        c.next = function () {
            if (b >= d.N()) {
                throw goog$iter$StopIteration;
            }
            var c = goog$asserts$assertString(d.fa.key(b++));
            if (a) {
                return c;
            }
            c = d.fa.getItem(c);
            if (goog$isString(c)) {
                return c;
            }
            throw "Storage mechanism: Invalid value was encountered";
        };
        return c;
    };
    goog$storage$mechanism$HTML5WebStorage.prototype.clear = function () {
        this.fa.clear();
    };
    var goog$storage$mechanism$HTML5LocalStorage = function () {
        var a = null;
        try {
            a = window.localStorage || null;
        } catch (b) {}
        this.fa = a;
    };
    goog$inherits(goog$storage$mechanism$HTML5LocalStorage, goog$storage$mechanism$HTML5WebStorage);
    var goog$storage$Storage = function (a) {
        this.Ob = a;
        this.uf = new goog$json$Serializer();
    };
    goog$storage$Storage.prototype.Ob = null;
    goog$storage$Storage.prototype.uf = null;
    goog$storage$Storage.prototype.set = function (a, b) {
        if (goog$isDef(b)) {
            this.Ob.set(a, goog$json$Serializer$serialize(this.uf, b));
        } else {
            this.Ob.remove(a);
        }
    };
    goog$storage$Storage.prototype.get = function (a) {
        a = this.Ob.get(a);
        if (a !== null) {
            try {
                return goog$json$parse(a);
            } catch (b) {
                throw "Storage: Invalid value was encountered";
            }
        }
    };
    goog$storage$Storage.prototype.remove = function (a) {
        this.Ob.remove(a);
    };
    var yt$player$LocalSettings = function () {
        var a = new goog$storage$mechanism$HTML5LocalStorage();
        var b;
        if ((b = a)) {
            a: {
                try {
                    b = !!a.fa && !!a.fa.getItem;
                    break a;
                } catch (c) {}
                b = false;
            }
        }
        if (b) {
            this.eb = new goog$storage$Storage(a);
        }
    };
    yt$player$LocalSettings.prototype.eb = null;
    yt$player$LocalSettings.prototype.getVolume = function () {
        var a = {
            volume: 100,
            muted: false,
            nonNormalized: 100
        };
        if (this.eb) {
            var b = {};
            try {
                b = this.eb.get("yt-player-volume") || {};
            } catch (c) {
                this.eb.remove("yt-player-volume");
            }
            a.volume = isNaN(b.volume) ? 100 : Math.min(Math.max(b.volume, 0), 100);
            a.nonNormalized = isNaN(b.nonNormalized) ? a.volume : b.nonNormalized;
            a.muted = b.muted == undefined ? false : b.muted;
        }
        return a;
    };
    if (!document.getElementById && document.all) {
        document.getElementById = function (a) {
            return document.all[a];
        };
    }
    var yt$www$watch$player$hashMonitorEnabled_ = false;
    var yt$www$watch$player$playerState_ = -1;
    var yt$www$watch$player$lastHash_ = "";
    var yt$www$watch$player$lastHashData_ = {};
    var yt$www$watch$player$readyPubSub_ = new goog$pubsub$PubSub();
    var yt$www$watch$player$localSettings_ = null;
    var yt$www$watch$player$getResumeCookieName_ = function () {
        return yt$getConfig("RESUME_COOKIE_NAME");
    };
    var yt$www$watch$player$saveResumeTime_ = function (a, b) {
        var c = yt$www$watch$player$getResumeCookieName_();
        if (c) {
            var d = yt$net$cookies$get(c, "").split(",");
            var d = goog$array$filter(d, function (b) {
                return b.indexOf(a) != 0 && b.length;
            });
            if (d.length >= 4) {
                d.shift();
            }
            d.push(a + ":" + b);
            yt$net$cookies$set(c, d.join(","), 1814400);
        }
    };
    var yt$www$watch$player$clearResumeTime_ = function (a) {
        var b = yt$www$watch$player$getResumeCookieName_();
        if (b) {
            var c = yt$net$cookies$get(b, "").split(",");
            var c = goog$array$filter(c, function (b) {
                return b.indexOf(a) != 0;
            });
            if (c.length == 0) {
                yt$net$cookies$remove(b);
            } else {
                yt$net$cookies$set(b, c.join(","), 1814400);
            }
        }
    };
    var yt$www$watch$player$saveResumeOnUnload_ = function () {
        var a = yt$www$watch$getPlayerReference_();
        var b = a.getDuration();
        var a = Math.floor(a.getCurrentTime());
        var c = yt$getConfig("VIDEO_ID");
        if (a <= 120 || a + 120 >= b) {
            yt$www$watch$player$clearResumeTime_(c);
        } else {
            yt$www$watch$player$saveResumeTime_(c, Math.floor(a));
        }
    };
    var yt$www$watch$player$waitForPlayerApi_ = function (a, b) {
        if (yt$IS_JSCRIPT_ && !a.addEventListener) {
            var c = b ? b * 2 : 50;
            yt$setTimeout(function () {
                yt$www$watch$player$waitForPlayerApi_(a, c);
            }, c);
        } else {
            if (b) {
                yt$tracking$track("ael_delayed", "delay=" + b, undefined);
            }
            yt$www$watch$player$onPlayerReady_(a);
            yt$www$watch$player$readyPubSub_.xc("READY_STATE_TOPIC", a);
        }
    };
    var yt$www$watch$player$onPlayerReady_ = function (a) {
        a.addEventListener("onStateChange", yt$www$watch$player$onStateChange_);
        a.addEventListener("NEXT_CLICKED", yt$www$watch$player$onNextClicked_);
        a.addEventListener("SIZE_CLICKED", yt$www$watch$player$onSizeClicked_);
        a.addEventListener("onVolumeChange", yt$www$watch$player$onVolumeChange_);
        a.addEventListener("SHARE_CLICKED", yt$www$watch$player$onShareClicked_);
        if (yt$www$watch$player$getResumeCookieName_()) {
            yt$events$listen(window, "beforeunload", yt$www$watch$player$saveResumeOnUnload_);
        }
        if (yt$uri$getHashData(window.location.hash).q && yt$getConfig("WIDE_PLAYER_STYLES")) {
            yt$www$watch$watch5$enableWide(false);
        }
        var b = goog$dom$getElement("watch-player");
        if (b) {
            b.style.background = "transparent";
        }
        yt$www$lists$registerNearEndEventsWithPlayer(a);
        yt$www$watch$player$localSettings_ = new yt$player$LocalSettings();
    };
    var yt$www$watch$player$onStateChange_ = function (a) {
        yt$www$watch$player$playerState_ = a;
        switch (a) {
            case 0:
                if (yt$www$lists$PlaylistBar$isAutoplayOn_(yt$www$lists$getPlaylistBar())) {
                    yt$www$lists$getPlaylistBar().next(false, "autoplay");
                }
        }
    };
    var yt$www$watch$player$onVolumeChange_ = function (a) {
        var b = yt$www$watch$player$localSettings_;
        if (b.eb) {
            var c = {};
            c.volume = isNaN(a.volume) ? b.getVolume().volume : Math.min(Math.max(a.volume, 0), 100);
            c.nonNormalized = a.nonNormalized;
            c.muted = a.muted == undefined ? b.getVolume().muted : a.muted;
            try {
                b.eb.set("yt-player-volume", c);
            } catch (d) {}
        }
    };
    var yt$www$watch$player$onNextClicked_ = function () {
        yt$www$lists$getPlaylistBar().next(true, undefined);
    };
    var yt$www$watch$player$onSizeClicked_ = function (a) {
        if (yt$getConfig("FULLSCREEN_EXPAND")) {
            goog$dom$classes$enable(document.body, "fullscreen", a);
        } else {
            if (a) {
                yt$net$cookies$set("wide", "1");
            } else {
                yt$net$cookies$set("wide", "0");
            }
            yt$www$watch$watch5$enableWide(a);
        }
    };
    var yt$www$watch$player$onShareClicked_ = function () {
        yt$www$watch$actions$share(goog$dom$getElement("watch-share"), true);
    };
    var yt$www$watch$player$seekTo = function (a, b) {
        var c = b != null ? b : true;
        var d = yt$www$watch$getPlayerReference_();
        d.seekTo(a, true);
        if (c) {
            if (goog$dom$getElement("watch-video-container")) {
                window.scroll(0, 0);
            } else {
                window.location.href = "#movie_player";
            }
        }
        d.playVideo();
    };
    var yt$www$watch$player$checkHash_ = function () {
        if (yt$www$watch$player$hashMonitorEnabled_) {
            var a = window.location.hash;
            if (a != yt$www$watch$player$lastHash_) {
                yt$www$watch$player$lastHash_ = a;
                a = yt$uri$getHashData(a);
                if ("t" in a && a.t != yt$www$watch$player$lastHashData_.t) {
                    yt$www$watch$player$seekTo(yt$www$watch$player$parseTimeParam_(a.t), false);
                }
                yt$www$watch$player$lastHashData_ = a;
            }
        }
    };
    var yt$www$watch$player$parseTimeParam_ = function (a) {
        var b = 0;
        if (a.indexOf("h") != -1) {
            a = a.split("h");
            b = a[0] * 3600;
            a = a[1];
        }
        if (a.indexOf("m") != -1) {
            a = a.split("m");
            b = a[0] * 60 + b;
            a = a[1];
        }
        if (a.indexOf("s") != -1) {
            a = a.split("s");
            b = a[0] * 1 + b;
        } else {
            b = a * 1 + b;
        }
        return b;
    };
    var yt$www$watch$playerping$pending_ = false;
    var yt$www$watch$playerping$aplid_ = null;
    var yt$www$watch$playerping$abt_ = null;
    var yt$www$watch$playerping$waitTimer_ = null;
    var yt$www$watch$playerping$startTime_ = null;
    var yt$www$watch$playerping$subscribe_ = function (a) {
        a.addEventListener("onStateChange", yt$www$watch$playerping$onStateChange_);
        a.addEventListener("onError", yt$www$watch$playerping$onError_);
    };
    var yt$www$watch$playerping$ping_ = function (a) {
        var b = yt$www$watch$playerping$startTime_;
        var a = {
            event: a,
            aplid: yt$www$watch$playerping$aplid_,
            abt: yt$www$watch$playerping$abt_,
            evtm: Math.round(goog$now() - b)
        };
        if ((b = yt$getConfig("PLAYER_CONFIG")) && b.args && b.args.plid) {
            a.plid = b.args.plid;
        }
        if (b && b.args && b.args.video_id) {
            a.v = b.args.video_id;
        }
        yt$net$ping$send("/player_204?" + yt$uri$buildQueryData(a));
    };
    var yt$www$watch$playerping$onStateChange_ = function (a) {
        if (yt$www$watch$playerping$waitTimer_) {
            switch (a) {
                case 1:
                    yt$www$watch$playerping$ping_("play");
                    yt$clearTimeout(yt$www$watch$playerping$waitTimer_);
                    yt$www$watch$playerping$waitTimer_ = null;
                    yt$www$watch$playerping$pending_ = false;
                    break;
                case 0:
                    yt$www$watch$playerping$ping_("ended");
                    yt$clearTimeout(yt$www$watch$playerping$waitTimer_);
                    yt$www$watch$playerping$waitTimer_ = null;
                    yt$www$watch$playerping$pending_ = false;
            }
        }
    };
    var yt$www$watch$playerping$onError_ = function () {
        if (yt$www$watch$playerping$waitTimer_) {
            yt$www$watch$playerping$ping_("error");
            yt$clearTimeout(yt$www$watch$playerping$waitTimer_);
            yt$www$watch$playerping$waitTimer_ = null;
            yt$www$watch$playerping$pending_ = false;
        }
    };
    var yt$www$watch$playerping$onUserWaiting_ = function () {
        if (yt$www$watch$playerping$waitTimer_) {
            yt$www$watch$playerping$ping_("userwaiting");
        }
        yt$www$watch$playerping$waitTimer_ = null;
    };
    var yt$www$watch$playerping$onUnload_ = function () {
        if (yt$www$watch$playerping$pending_) {
            yt$www$watch$playerping$ping_("unload");
        }
    };
    var yt$www$watch$videoannotation$updateDisplay_ = function () {
        var a = goog$dom$getElement("watch-video-annotation-editable");
        var b = goog$string$trim(goog$dom$getElement("watch-video-annotation-content").innerHTML);
        if (b) {
            goog$dom$classes$addRemove(a, ["unannotated", "editing"], ["annotated", "not-editing"]);
        } else {
            goog$dom$classes$addRemove(a, ["annotated", "not-editing"], ["unannotated", "editing"]);
        }
        goog$dom$getElement("watch-video-annotation-textarea").value = b;
    };
    var yt$www$watch$videoannotation$save_ = function (a) {
        if (!yt$dom$datasets$get(a, "saving")) {
            yt$dom$datasets$set(a, "saving", "true");
            var b = goog$dom$getElement("watch-video-annotation-content");
            var c = goog$dom$getElement("watch-video-annotation-textarea");
            var d = goog$string$trim(c.value);
            var e = {};
            if (!d) {
                e.delete = 1;
            }
            yt$net$ajax$send(a.action, {
                format: "JSON",
                method: "POST",
                g: e,
                za: goog$dom$forms$getFormDataString(a),
                f: function () {
                    b.innerHTML = goog$string$htmlEscape(d);
                },
                B: function () {
                    c.value = b.innerHTML;
                },
                ga: function () {
                    yt$dom$datasets$remove(a, "saving");
                    yt$www$watch$videoannotation$updateDisplay_();
                }
            });
        }
    };
    var yt$www$watch$handleKeyPress_ = function (a) {
        var b = a.target;
        if (b.tagName != "INPUT" && b.tagName != "TEXTAREA" && b.tagName != "SELECT") {
            switch (a.keyCode) {
                case 110:
                    yt$www$lists$getPlaylistBar().next(true, "keys");
                    break;
                case 112:
                    a = yt$www$lists$getPlaylistBar();
                    if ((a = yt$www$lists$List$getPreviousVideoUrl(a.b, "keys"))) {
                        yt$window$redirect(a);
                    }
                    break;
                case 106:
                    if ((a = yt$www$watch$getPlayerReference_())) {
                        b = a.getCurrentTime();
                        a.seekTo(b - 10);
                    }
                    break;
                case 108:
                    if ((a = yt$www$watch$getPlayerReference_())) {
                        b = a.getCurrentTime();
                        a.seekTo(b + 10);
                    }
                    break;
                case 107:
                    if ((a = yt$www$watch$getPlayerReference_())) {
                        if (yt$www$watch$player$playerState_ == 2) {
                            a.playVideo();
                        } else {
                            a.pauseVideo();
                        }
                    }
            }
        }
    };
    var yt$www$watch$survey$watchPageSurveyGoAway = function () {
        var a = yt$prefs$UserPrefs.getInstance();
        yt$prefs$UserPrefs$setFlag(yt$prefs$BitFlags.xf, true);
        a.save();
        yt$style$hide("watch_page_survey");
    };
    var userfeedback$startFeedback_ = function (a, b, c) {
        var d = a.serverUri || "//www.google.com/tools/feedback";
        var e = goog$global.GOOGLE_FEEDBACK_START;
        if (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent)) {
            a.mobileWindow = window.open("");
        }
        goog$global.GOOGLE_FEEDBACK_START_ARGUMENTS = arguments;
        if (e) {
            e.apply(goog$global, arguments);
        } else {
            e = document.createElement("script");
            e.src = d + "/load.js";
            document.body.appendChild(e);
        }
    };
    var userfeedback$flashInstalled_ = false;
    var userfeedback$flashVersion_ = "";
    var userfeedback$parseFlashVersion_ = function (a) {
        a = a.match(/[\d]+/g);
        a.length = 3;
        return a.join(".");
    };
    if (navigator.plugins && navigator.plugins.length) {
        var userfeedback$flashPlugin_ = navigator.plugins["Shockwave Flash"];
        if (userfeedback$flashPlugin_) {
            userfeedback$flashInstalled_ = true;
            if (userfeedback$flashPlugin_.description) {
                userfeedback$flashVersion_ = userfeedback$parseFlashVersion_(userfeedback$flashPlugin_.description);
            }
        }
        if (navigator.plugins["Shockwave Flash 2.0"]) {
            userfeedback$flashInstalled_ = true;
            userfeedback$flashVersion_ = "2.0.0.11";
        }
    } else if (navigator.mimeTypes && navigator.mimeTypes.length) {
        var userfeedback$flashMimeType_ = navigator.mimeTypes["application/x-shockwave-flash"];
        if ((userfeedback$flashInstalled_ = userfeedback$flashMimeType_ && userfeedback$flashMimeType_.enabledPlugin)) {
            userfeedback$flashVersion_ = userfeedback$parseFlashVersion_(
                userfeedback$flashMimeType_.enabledPlugin.description
            );
        }
    } else {
        try {
            var userfeedback$flashActiveX_ = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
            var userfeedback$flashInstalled_ = true;
            var userfeedback$flashVersion_ = userfeedback$parseFlashVersion_(
                userfeedback$flashActiveX_.GetVariable("$version")
            );
        } catch (no) {
            try {
                userfeedback$flashActiveX_ = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
                userfeedback$flashInstalled_ = true;
                userfeedback$flashVersion_ = "6.0.21";
            } catch (oo) {
                try {
                    userfeedback$flashActiveX_ = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                    userfeedback$flashInstalled_ = true;
                    userfeedback$flashVersion_ = userfeedback$parseFlashVersion_(
                        userfeedback$flashActiveX_.GetVariable("$version")
                    );
                } catch (po) {}
            }
        }
    }
    var userfeedback$FLASH_VERSION = userfeedback$flashVersion_;
    var userfeedback$detectedFirefox_;
    var userfeedback$detectedCamino_;
    var userfeedback$detectedIphone_;
    var userfeedback$detectedIpad_;
    var userfeedback$detectedAndroid_;
    var userfeedback$detectedChrome_;
    var userfeedback$detectedSafari_;
    userfeedback$detectedSafari_ =
        userfeedback$detectedChrome_ =
        userfeedback$detectedAndroid_ =
        userfeedback$detectedIpad_ =
        userfeedback$detectedIphone_ =
        userfeedback$detectedCamino_ =
        userfeedback$detectedFirefox_ =
            false;
    var userfeedback$userAgent_ = goog$userAgent$getUserAgentString();
    if (userfeedback$userAgent_) {
        if (userfeedback$userAgent_.indexOf("Firefox") != -1) {
            userfeedback$detectedFirefox_ = true;
        } else if (userfeedback$userAgent_.indexOf("Camino") != -1) {
            userfeedback$detectedCamino_ = true;
        } else if (userfeedback$userAgent_.indexOf("iPhone") != -1 || userfeedback$userAgent_.indexOf("iPod") != -1) {
            userfeedback$detectedIphone_ = true;
        } else if (userfeedback$userAgent_.indexOf("iPad") != -1) {
            userfeedback$detectedIpad_ = true;
        } else if (userfeedback$userAgent_.indexOf("Android") != -1) {
            userfeedback$detectedAndroid_ = true;
        } else if (userfeedback$userAgent_.indexOf("Chrome") != -1) {
            userfeedback$detectedChrome_ = true;
        } else if (userfeedback$userAgent_.indexOf("Safari") != -1) {
            userfeedback$detectedSafari_ = true;
        }
    }
    var userfeedback$FIREFOX = userfeedback$detectedFirefox_;
    var userfeedback$CAMINO = userfeedback$detectedCamino_;
    var userfeedback$IPHONE = userfeedback$detectedIphone_;
    var userfeedback$IPAD = userfeedback$detectedIpad_;
    var userfeedback$ANDROID = userfeedback$detectedAndroid_;
    var userfeedback$CHROME = userfeedback$detectedChrome_;
    var userfeedback$SAFARI = userfeedback$detectedSafari_;
    var userfeedback$matchUserAgent_ = function (a) {
        if ((a = a.exec(goog$userAgent$getUserAgentString()))) {
            return a[1];
        } else {
            return "";
        }
    };
    var userfeedback$VERSION = (function () {
        if (userfeedback$FIREFOX) {
            return userfeedback$matchUserAgent_(/Firefox\/([0-9.]+)/);
        }
        if (goog$userAgent$IE || goog$userAgent$OPERA) {
            return goog$userAgent$VERSION;
        }
        if (userfeedback$CHROME) {
            return userfeedback$matchUserAgent_(/Chrome\/([0-9.]+)/);
        }
        if (userfeedback$SAFARI) {
            return userfeedback$matchUserAgent_(/Version\/([0-9.]+)/);
        }
        if (userfeedback$IPHONE || userfeedback$IPAD) {
            var a = /Version\/(\S+).*Mobile\/(\S+)/.exec(goog$userAgent$getUserAgentString());
            if (a) {
                return a[1] + "." + a[2];
            }
        } else {
            if (userfeedback$ANDROID) {
                if ((a = userfeedback$matchUserAgent_(/Android\s+([0-9.]+)/))) {
                    return a;
                } else {
                    return userfeedback$matchUserAgent_(/Version\/([0-9.]+)/);
                }
            }
            if (userfeedback$CAMINO) {
                return userfeedback$matchUserAgent_(/Camino\/([0-9.]+)/);
            }
        }
        return "";
    })();
    var yt$www$feedback$displayLink = function () {
        if (
            !(goog$userAgent$IE
                ? goog$string$compareVersions(userfeedback$VERSION, "7") >= 0 &&
                  goog$string$compareVersions(userfeedback$FLASH_VERSION, "9") >= 0
                : userfeedback$FIREFOX
                  ? goog$string$compareVersions(userfeedback$VERSION, "3.5") >= 0
                  : userfeedback$SAFARI
                    ? goog$string$compareVersions(userfeedback$VERSION, "5") >= 0
                    : userfeedback$CHROME)
        ) {
            yt$style$hide("reportbug");
        }
    };
    var yt$www$help$bootstrap$init = function () {
        yt$events$listenOnce(goog$dom$getElement("help-button"), "click", yt$www$help$bootstrap$loadHelp_, true);
    };
    var yt$www$help$bootstrap$loadHelp_ = function () {
        var a = goog$dom$getElement("help-button");
        if (a) {
            var b = yt$dom$datasets$get(a, "iph-topic-id");
            var c = yt$getConfig("LOCALE");
            var d = yt$dom$datasets$get(a, "iph-title-text");
            var e = yt$dom$datasets$get(a, "iph-search-button-text");
            var f = yt$dom$datasets$get(a, "iph-anchor-text");
            var g = document.location.protocol + yt$dom$datasets$get(a, "iph-js-url");
            var j = document.location.protocol + yt$dom$datasets$get(a, "iph-css-url");
            if (g && j) {
                j = goog$dom$createDom("link", {
                    href: j,
                    rel: "stylesheet"
                });
                document.getElementsByTagName("head")[0].appendChild(j);
                yt$net$scriptloader$load(g, function () {
                    var g = goog$getObjectByName("yt.www.help.init");
                    var j = goog$getObjectByName("yt.www.help.onButtonClick");
                    g(b, "http://www.google.com", "/support/youtube", c, d, e, f);
                    yt$events$listen(a, "click", j);
                    j();
                });
            }
        }
    };
    var yt$www$framebuster$bust_ = function () {
        (function () {
            try {
                for (var a = this; a.parent != a;) {
                    if (a.frameElement.src == "$") {
                        throw "odd";
                    }
                    a = a.parent;
                }
                if (a.frameElement != null) {
                    throw "busted";
                }
            } catch (b) {
                document.write("--><plaintext style=display:none><!--");
                window.open("/", "_top");
                top.location = "/";
            }
        })();
    };
    var yt$www$framebuster$onCheckResponse_ = function (a) {
        if (a.responseText == "block") {
            yt$www$framebuster$bust_();
        }
    };
    if (window != window.top) {
        var yt$www$framebuster$referrer_ = document.referrer;
        if (window.parent != window.top) {
            yt$www$framebuster$bust_();
        } else if (!yt$uri$isYouTubeOrGoogleUrl(yt$www$framebuster$referrer_)) {
            yt$net$ajax$sendRequest(
                "/roger_rabbit?" +
                    ("location=" +
                        encodeURIComponent(yt$www$framebuster$referrer_) +
                        "&self=" +
                        encodeURIComponent(window.location.href)),
                {
                    onComplete: yt$www$framebuster$onCheckResponse_
                }
            );
        }
    }
    var yt$www$errorLogged_ = false;
    var yt$www$init = function () {
        yt$pubsub$publish("init");
    };
    var yt$www$dispose = function () {
        yt$pubsub$publish("dispose");
    };
    var yt$www$logError = function (a, b, c) {
        var d = goog$dom$getElement("www-core-js");
        if (!yt$www$errorLogged_ && d && d.src.indexOf("/debug-") != -1) {
            c = yt$www$getErrorStack_(c);
            yt$tracking$track(
                "jserror",
                "error=" +
                    encodeURIComponent(a) +
                    "&script=" +
                    encodeURIComponent(b) +
                    "&linenumber=" +
                    encodeURIComponent(c) +
                    "&url=" +
                    encodeURIComponent(window.location.href),
                undefined
            );
            yt$www$errorLogged_ = true;
        }
    };
    var yt$www$getErrorStack_ = function (a) {
        if (goog$userAgent$GECKO) {
            try {
                eval("(0)()");
            } catch (b) {
                return b.stack.replace(/(.*):/g, "").replace(/\n/g, ",");
            }
        } else {
            return a;
        }
    };
    var yt$www$xsrf$EXCLUDED_FORM_NAMES_ = [];
    var yt$www$ads$pyv$requestAfcAds_ = function (a, b, c, d) {
        window.google_ad_client = a;
        window.google_ad_channel = b;
        window.google_max_num_ads = 1;
        window.google_ad_output = "js";
        window.google_ad_type = "text";
        window.google_only_pyv_ads = true;
        if (c) {
            window.google_kw = c;
            window.google_kw_type = "broad";
        }
        if (window.dclk_language) {
            window.google_language = window.dclk_language;
        }
        window.google_ad_request_done = d;
        document.write(
            '<script language="JavaScript" src="//pagead2.googlesyndication.com/pagead/show_ads.js"></script>'
        );
    };
    var yt$www$ads$pyv$showFallbackAd_ = function () {
        if (window.dclk_language) {
            window.google_language = window.dclk_language;
        }
        window.google_ad_client = "pub-6219811747049371";
        window.google_ad_channel = "1802068507";
        window.google_ad_format = "300x250_as";
        window.google_ad_type = "text_image";
        window.google_ad_width = 300;
        window.google_ad_height = 250;
        window.google_alternate_color = "FFFFFF";
        window.google_color_border = "FFFFFF";
        window.google_color_bg = "FFFFFF";
        window.google_color_link = "0033CC";
        window.google_color_text = "444444";
        window.google_color_url = "0033CC";
        document.write(
            '<script language="JavaScript" src="//pagead2.googlesyndication.com/pagead/show_ads.js"></script>'
        );
    };
    var yt$www$ads$pyv$showPpvAdInYvaSpot = function () {
        yt$style$hide("ad_creative_2");
        yt$style$hide("pyv-placeholder");
        if (goog$dom$getElement("ppv-placeholder")) {
            yt$style$show("ppv-placeholder");
        } else {
            yt$style$hide("homepage-sidebar-ads");
        }
    };
    var yt$www$ads$pyv$renderPyvAd_ = function (a, b, c, d, e) {
        var f = goog$array$find(b.media_template_data, function (a) {
            return !!a.imageUrl;
        });
        if (f) {
            a = {
                video_id: f.videoId,
                ad_type: a,
                headline: goog$string$unescapeEntities(b.line1),
                image_url: f.imageUrl,
                description1: goog$string$unescapeEntities(b.line2),
                description2: goog$string$unescapeEntities(b.line3),
                channel_title: f.channelName,
                test_mode: (!!e).toString(),
                destination_url: goog$string$unescapeEntities(b.url)
            };
            yt$net$ajax$sendRequest("/pyv?" + yt$uri$buildQueryData(a), {
                method: "GET",
                update: c,
                onComplete: d
            });
        }
    };
    var yt$www$ads$pyv$showPpvOnWatch = function () {
        var a = goog$dom$getElement("ppv-container");
        if (a) {
            yt$style$show(a);
        }
    };
    var yt$www$ads$pyv$pyvHomeRequestAds = function () {
        yt$style$hide("ad_creative_2");
        if (yt$getConfig("PYV_IS_ALLOWED")) {
            yt$www$ads$pyv$requestAfcAds_(
                "ca-youtube-homepage",
                yt$getConfig("PYV_AD_CHANNEL") || "",
                yt$getConfig("PYV_KW") || "",
                yt$www$ads$pyv$pyvHomeAfcCallback
            );
        } else {
            yt$www$ads$pyv$showPpvAdInYvaSpot();
        }
    };
    var yt$www$ads$pyv$pyvHomeAfcCallback = function (a) {
        var b = goog$dom$getElement("pyv-placeholder");
        if (a.length == 0 || !b) {
            yt$www$ads$pyv$showPpvAdInYvaSpot();
        } else {
            yt$www$ads$pyv$renderPyvAd_("homepage", a[0], b, function () {
                yt$style$hide("ad_creative_2");
            });
        }
    };
    var yt$www$ads$pyv$pyvBrowseRequestAds = function () {
        if (yt$getConfig("PYV_IS_ALLOWED")) {
            var a = "pyvOnBrowse";
            if (yt$getConfig("PYV_CATEGORY")) {
                a += " pyvBrowse_" + yt$getConfig("PYV_CATEGORY");
            }
            yt$www$ads$pyv$requestAfcAds_("ca-youtube-browse", a, "", yt$www$ads$pyv$pyvBrowseAfcCallback_);
        } else {
            yt$www$ads$pyv$showFallbackAd_();
        }
    };
    var yt$www$ads$pyv$pyvBrowseAfcCallback_ = function (a) {
        var b = goog$dom$getElement("pyv-placeholder");
        if (a.length == 0 || !b) {
            yt$www$ads$pyv$showFallbackAd_();
        } else {
            yt$www$ads$pyv$renderPyvAd_(yt$getConfig("PYV_NEW_BROWSE") ? "new_browse" : "browse", a[0], b, function () {
                yt$style$hide("ad_creative_1");
            });
        }
    };
    var yt$www$ads$addPositionParams_ = function (a, b) {
        var c = goog$dom$getElement(a);
        if (c) {
            c = goog$dom$getElementsByTagNameAndClass("li", "video-list-item", c);
            goog$array$forEach(c, function (a, c) {
                var f = goog$dom$getElementsByTagNameAndClass("a", null, a);
                goog$array$forEach(f, function (a) {
                    var d = a.getAttribute("href");
                    if (d && unescape(d).match(/\/watch(\?|#!)v=/)) {
                        a.href = b ? a.href + ("&pvpos=" + c) : a.href + ("&pvnpos=" + c);
                    }
                });
            });
        }
    };
    var yt$www$watch$ads$handleSetCompanion = function (a) {
        a = a.replace(";dc_seed=", ";kmyd=watch-channel-brand-div;dc_seed=");
        yt$style$hide("instream_google_companion_ad_div");
        yt$style$hide("google_companion_ad_div");
        yt$style$show("ad300x250");
        yt$style$show("watch-channel-brand-div");
        var b = goog$dom$getElement("ad300x250");
        if (b !== null) {
            var c = Math.round(Math.random() * 10000);
            b.innerHTML = [
                '<iframe src="',
                a,
                '" name="ifr_300x250ad',
                c,
                '" id="ifr_300x250ad',
                c,
                '" width="300" height="250" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"></iframe>'
            ].join("");
        }
        yt$www$watch$ads$notifyAdLoaded_();
    };
    var yt$www$watch$ads$handleSetCompanionForInstream = function (a) {
        a = a.replace(";dc_seed=", ";kmyd=watch-longform-ad;dc_seed=");
        yt$style$hide("instream_google_companion_ad_div");
        yt$style$show("watch-longform-ad");
        yt$style$show("watch-longform-text");
        yt$style$show("watch-longform-ad-placeholder");
        var b = goog$dom$getElement("watch-longform-ad-placeholder");
        var c = Math.round(Math.random() * 10000);
        b.innerHTML = [
            '<iframe src="',
            a,
            '" name="ifr_300x60ad',
            c,
            '" id="ifr_300x60ad',
            c,
            '" width="300" height="60" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"></iframe>'
        ].join("");
        yt$www$watch$ads$notifyAdLoaded_();
    };
    var yt$www$watch$ads$handleSetCompanionForLongform = function (a) {
        var b = goog$dom$getElement("watch-longform-ad-placeholder");
        if (a) {
            yt$style$hide("instream_google_companion_ad_div");
            yt$style$show("watch-longform-ad");
            yt$style$show("watch-longform-text");
            yt$style$show("watch-longform-ad-placeholder");
            b.innerHTML = a;
        } else {
            yt$style$hide("watch-longform-ad");
        }
        yt$www$watch$ads$notifyAdLoaded_();
    };
    var yt$www$watch$ads$handleSetCompanionForFreewheel = function (a, b) {
        var c = "watch-channel-brand-div";
        var d = "ad300x250";
        var e = 300;
        var f = 250;
        if (a == "video") {
            c = "watch-longform-ad";
            d = "watch-longform-ad-placeholder";
            e = 300;
            f = 60;
            yt$style$hide("instream_google_companion_ad_div");
        }
        var g = decodeURIComponent(b);
        goog$dom$getElement(d).innerHTML = [
            '<iframe name="fw_ad" id="fw_ad" ',
            'width="' + e + '" height="' + f + '" ',
            'marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"></iframe>'
        ].join("");
        var j = goog$dom$getElement("fw_ad");
        var j = j.contentWindow
            ? j.contentWindow
            : j.contentDocument.document
              ? j.contentDocument.document
              : j.contentDocument;
        var e = navigator.userAgent.toLowerCase();
        var d = e.indexOf("msie") != -1;
        var e = e.indexOf("opera") != -1;
        j.document.open();
        j.document.write(g);
        if (d || e) {
            yt$setTimeout(function () {
                j.document.close();
            }, 7500);
        } else {
            j.document.close();
        }
        yt$style$show(c);
        yt$www$watch$ads$notifyAdLoaded_();
    };
    var yt$www$watch$ads$handleHideCompanion = function () {
        yt$style$show("watch-channel-brand-div");
        yt$style$hide("ad300x250");
        goog$dom$getElement("google_companion_ad_div").style.height = "250px";
        yt$www$watch$ads$notifyAdLoaded_();
    };
    var yt$www$watch$ads$handleHideCompanionForInstream = function () {
        yt$style$hide("watch-longform-ad");
        yt$www$watch$ads$notifyAdLoaded_();
    };
    var yt$www$watch$ads$handleCloseMpuCompanion = function () {
        yt$style$hide("watch-channel-brand-div");
        yt$www$watch$ads$notifyAdLoaded_();
    };
    var yt$www$watch$ads$notifyAdLoaded_ = function () {
        var a = goog$getObjectByName("yt.www.watch.ads.handleAdLoaded");
        if (a) {
            a.call();
        }
    };
    var yt$www$watch$ads$updatePopoutAds = function (a) {
        yt$setConfig("POPOUT_AD_SLOTS", a);
    };
    var yt$www$watch$ads$disablePopoutButton = function () {
        var a = goog$dom$getElement("watch-longform-popup");
        if (a) {
            a.disabled = true;
        }
    };
    var yt$www$watch$ads$enablePopoutButton = function (a) {
        var b = goog$dom$getElement("watch-longform-popup");
        if (b) {
            b.disabled = false;
        }
        yt$www$watch$ads$updatePopoutAds(a);
    };
    var yt$www$watch$ads$handleSetAfvCompanionVars = function (a) {
        window.google_ad_output = "html";
        if (a) {
            window.google_ad_height = "60";
            window.google_ad_format = "300x60_as";
            window.google_container_id = "instream_google_companion_ad_div";
        } else {
            window.google_ad_height = "250";
            window.google_ad_format = "300x250_as";
            window.google_container_id = "google_companion_ad_div";
        }
    };
    var yt$www$watch$ads$handleShowAfvCompanionAdDiv = function (a) {
        if (a) {
            yt$style$hide("watch-longform-ad-placeholder");
            yt$style$hide("watch-channel-brand-div");
            yt$style$show("watch-longform-text");
            yt$style$show("watch-longform-ad");
            yt$style$show("instream_google_companion_ad_div");
        } else {
            yt$style$hide("ad300x250");
            yt$style$hide("watch-longform-ad");
            yt$style$show("google_companion_ad_div");
            yt$style$show("watch-channel-brand-div");
        }
        yt$www$watch$ads$notifyAdLoaded_();
    };
    var yt$www$watch$ads$handleHideAfvInstreamCompanionAdDiv = function () {
        yt$style$hide("instream_google_companion_ad_div");
        yt$style$hide("watch-longform-text");
        yt$style$hide("watch-longform-ad-placeholder");
        yt$www$watch$ads$notifyAdLoaded_();
    };
    goog$exportSymbol("yt.www.watch.ads.showForcedMpu", function (a) {
        goog$dom$getElement("ad300x250").innerHTML = [
            '<iframe src="',
            a,
            '" name="ifr_300x250ad" id="ifr_300x250ad" width="300" height="250" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"></iframe>'
        ].join("");
        yt$style$show("ad300x250");
    });
    goog$exportSymbol("yt.www.watch.ads.handleMoveGutCompanion", function (a) {
        var a = a
            ? goog$dom$getElement("instream_google_companion_ad_div")
            : goog$dom$getElement("google_companion_ad_div");
        var b = goog$dom$getElement("yt-gut-content");
        if (b) {
            b.innerHTML = "";
        } else {
            b = document.createElement("div");
            b.id = "yt-gut-content";
        }
        if (a) {
            a.innerHTML = "";
            a.appendChild(b);
        }
        yt$www$watch$ads$notifyAdLoaded_();
    });
    goog$exportSymbol("yt.www.watch.ads.setGutSlotSizes", function (a, b) {
        var c = yt$getConfig("gut_slot");
        if (c) {
            c = c.getSizes();
            goog$array$clear(c);
            if (b) {
                c.push(yt$getConfig("yt_gut_invideo_size"));
            }
            if (a) {
                c.push(yt$getConfig("yt_gut_instream_size"));
            }
        }
    });
    goog$exportSymbol("yt.www.watch.ads.handleSetCompanion", yt$www$watch$ads$handleSetCompanion);
    goog$exportSymbol("yt.www.watch.ads.handleSetCompanionForInstream", yt$www$watch$ads$handleSetCompanionForInstream);
    goog$exportSymbol("yt.www.watch.ads.handleSetCompanionForLongform", yt$www$watch$ads$handleSetCompanionForLongform);
    goog$exportSymbol(
        "yt.www.watch.ads.handleSetCompanionForFreewheel",
        yt$www$watch$ads$handleSetCompanionForFreewheel
    );
    goog$exportSymbol("yt.www.watch.ads.handleHideCompanion", yt$www$watch$ads$handleHideCompanion);
    goog$exportSymbol(
        "yt.www.watch.ads.handleHideCompanionForInstream",
        yt$www$watch$ads$handleHideCompanionForInstream
    );
    goog$exportSymbol("yt.www.watch.ads.disablePopoutButton", yt$www$watch$ads$disablePopoutButton);
    goog$exportSymbol("yt.www.watch.ads.enablePopoutButton", yt$www$watch$ads$enablePopoutButton);
    goog$exportSymbol("yt.www.watch.ads.handleCloseMpuCompanion", yt$www$watch$ads$handleCloseMpuCompanion);
    goog$exportSymbol("yt.www.watch.ads.updatePopoutAds", yt$www$watch$ads$updatePopoutAds);
    goog$exportSymbol("yt.www.watch.ads.handleSetAfvCompanionVars", yt$www$watch$ads$handleSetAfvCompanionVars);
    goog$exportSymbol("yt.www.watch.ads.handleShowAfvCompanionAdDiv", yt$www$watch$ads$handleShowAfvCompanionAdDiv);
    goog$exportSymbol(
        "yt.www.watch.ads.handleHideAfvInstreamCompanionAdDiv",
        yt$www$watch$ads$handleHideAfvInstreamCompanionAdDiv
    );
    goog$exportSymbol("yt.www.ads.pyv.pyvWatchAfcCallback", function (a) {
        if (a.length == 0) {
            yt$www$ads$pyv$showPpvOnWatch();
            if (yt$getConfig("PYV_TRACK_RELATED_CTR")) {
                yt$www$ads$addPositionParams_("watch-related-grid", false);
                yt$www$ads$addPositionParams_("watch-related", false);
                yt$www$ads$addPositionParams_("watch-channel-videos-panel", false);
            }
        } else {
            var b = goog$dom$getElement("watch-channel-videos-panel");
            if (b && !yt$getConfig("IS_BRANDED_WATCH")) {
                goog$dom$classes$add(b, "yt-uix-expander-collapsed");
            }
            yt$www$ads$pyv$renderPyvAd_(
                "watch_related",
                a[0],
                null,
                function (a) {
                    var a = yt$net$ajax$getNodeValue(yt$net$ajax$getRootNode(a.responseXML), "html_content") || "";
                    var b = goog$dom$getElement(window.pyv_related_box_id || "watch-related");
                    if (b && b.innerHTML.indexOf(a) != 0) {
                        b.insertBefore(goog$dom$htmlToDocumentFragment(a), b.firstChild);
                        if (yt$getConfig("PYV_TRACK_RELATED_CTR")) {
                            yt$www$ads$addPositionParams_("watch-related", true);
                            yt$www$ads$addPositionParams_("watch-channel-videos-panel", true);
                        }
                    }
                    if ((b = goog$dom$getElement("watch-related-grid")) && b.innerHTML.indexOf(a) != 0) {
                        b.insertBefore(goog$dom$htmlToDocumentFragment(a), b.firstChild);
                        if (yt$getConfig("PYV_TRACK_RELATED_CTR")) {
                            yt$www$ads$addPositionParams_("watch-related-grid", true);
                        }
                    }
                },
                window.google_adtest && window.google_adtest == "on"
            );
        }
    });
    goog$exportSymbol("yt.www.ads.pyv.pyvSearchAfcCallback", function (a) {
        var b = goog$dom$getElement("pyv-ads");
        if (a.length != 0 && b) {
            goog$array$forEach(a, function (a) {
                var b = a.media_template_data[0];
                a.line1 = goog$string$unescapeEntities(a.line1);
                a.line2 = goog$string$unescapeEntities(a.line2);
                a.line3 = goog$string$unescapeEntities(a.line3);
                a.url = goog$string$unescapeEntities(a.url);
                b.imageUrl = goog$string$unescapeEntities(b.imageUrl);
                b.channelName = goog$string$unescapeEntities(b.channelName);
            });
            a = {
                pyv_ads: goog$json$Serializer$serialize(new goog$json$Serializer(undefined), a),
                ad_type: "search"
            };
            yt$net$ajax$sendRequest("/pyv", {
                method: "POST",
                postBody: yt$uri$buildQueryData(a),
                update: b
            });
        }
    });
    goog$exportSymbol("yt.www.ads.pyv.pyvHomeAfcCallback", yt$www$ads$pyv$pyvHomeAfcCallback);
    goog$exportSymbol("yt.www.ads.pyv.showPpvAdInYvaSpot", yt$www$ads$pyv$showPpvAdInYvaSpot);
    goog$exportSymbol("yt.www.ads.pyv.pyvHomeRequestAds", yt$www$ads$pyv$pyvHomeRequestAds);
    goog$exportSymbol("yt.www.ads.pyv.pyvBrowseRequestAds", yt$www$ads$pyv$pyvBrowseRequestAds);
    goog$exportSymbol("yt.www.ads.pyv.showPpvOnWatch", yt$www$ads$pyv$showPpvOnWatch);
    goog$exportSymbol("yt.www.ads.pyv.loadPyvIframe", function (a) {
        var b = window.location.href;
        if (b.indexOf("#") == b.length - 1 && goog$userAgent$WEBKIT) {
            window.location.hash = "#!";
        }
        var b = document.body;
        var c = goog$dom$getDomHelper(b);
        var d = [];
        d.push("<!DOCTYPE html>");
        d.push("<html><head>", a, "</head><body>", undefined, "</body></html>");
        a = c.Ki("iframe", {
            frameborder: 0,
            style: "border:0;vertical-align:bottom;",
            src: 'javascript:""'
        });
        b.appendChild(a);
        b = d.join("");
        a = a.contentDocument || a.contentWindow.document;
        a.open();
        a.write(b);
        a.close();
    });
    goog$exportSymbol("yt.www.ads.pyv.loadPyvAfsScript", function (a) {
        yt$net$scriptloader$load("/pyv_afs_ads?query=" + a);
    });
    yt$registerGlobal("pyv_related_box_id");
    goog$exportSymbol("setCompanion", yt$www$watch$ads$handleSetCompanion);
    goog$exportSymbol("setInstreamCompanion", yt$www$watch$ads$handleSetCompanionForInstream);
    goog$exportSymbol("setLongformCompanion", yt$www$watch$ads$handleSetCompanionForLongform);
    goog$exportSymbol("setFreewheelCompanion", yt$www$watch$ads$handleSetCompanionForFreewheel);
    goog$exportSymbol("closeInPageAdIframe", yt$www$watch$ads$handleHideCompanion);
    goog$exportSymbol("hideInstreamCompanion", yt$www$watch$ads$handleHideCompanionForInstream);
    goog$exportSymbol("disablePopout", yt$www$watch$ads$disablePopoutButton);
    goog$exportSymbol("enablePopout", yt$www$watch$ads$enablePopoutButton);
    goog$exportSymbol("closeMpuCompanion", yt$www$watch$ads$handleCloseMpuCompanion);
    goog$exportSymbol("updatePopAds", yt$www$watch$ads$updatePopoutAds);
    goog$exportSymbol("setAfvCompanionVars", yt$www$watch$ads$handleSetAfvCompanionVars);
    goog$exportSymbol("showAfvCompanionAdDiv", yt$www$watch$ads$handleShowAfvCompanionAdDiv);
    goog$exportSymbol("hideAfvInstreamCompanionAdDiv", yt$www$watch$ads$handleHideAfvInstreamCompanionAdDiv);
    goog$exportSymbol("show_ppv_in_yva_spot", yt$www$ads$pyv$showPpvAdInYvaSpot);
    goog$exportSymbol("requestPyvAds", yt$www$ads$pyv$pyvHomeRequestAds);
    goog$exportSymbol("pyvHomeRequestAds", yt$www$ads$pyv$pyvHomeRequestAds);
    goog$exportSymbol("pyvBrowseRequestAds", yt$www$ads$pyv$pyvBrowseRequestAds);
    window.yt = window.yt || {};
    goog$exportSymbol("_gel", goog$dom$getElement);
    goog$exportSymbol("_hasclass", goog$dom$classes$has);
    goog$exportSymbol("_addclass", goog$dom$classes$add);
    goog$exportSymbol("_removeclass", goog$dom$classes$remove);
    goog$exportSymbol("_toggleclass", goog$dom$classes$toggle);
    goog$exportSymbol("_showdiv", yt$style$show);
    goog$exportSymbol("_hidediv", yt$style$hide);
    goog$exportSymbol("_ajax", yt$net$ajax$send_);
    goog$exportSymbol("goog.bind", goog$bind);
    goog$exportSymbol("goog.dom.getElementsByTagNameAndClass", function (a, b, c) {
        return goog$dom$getElementsByTagNameAndClass(a, b, c);
    });
    goog$exportSymbol("goog.dom.getFirstElementChild", goog$dom$getFirstElementChild);
    goog$exportSymbol("goog.array.forEach", goog$array$forEach);
    goog$exportSymbol("goog.array.indexOf", goog$array$indexOf);
    goog$exportSymbol("goog.array.contains", goog$array$contains);
    goog$exportSymbol("yt.dom.hasAncestor", function (a, b, c) {
        a = goog$dom$getElement(a);
        b = goog$dom$getElement(b);
        return !!goog$dom$getAncestor(
            a,
            function (a) {
                return a === b;
            },
            true,
            c
        );
    });
    goog$exportSymbol("yt.setConfig", yt$setConfig);
    goog$exportSymbol("yt.getConfig", yt$getConfig);
    goog$exportSymbol("yt.registerGlobal", yt$registerGlobal);
    goog$exportSymbol("yt.setTimeout", yt$setTimeout);
    goog$exportSymbol("yt.setInterval", yt$setInterval);
    goog$exportSymbol("yt.clearTimeout", yt$clearTimeout);
    goog$exportSymbol("yt.clearInterval", yt$clearInterval);
    goog$exportSymbol("yt.setMsg", function (a) {
        yt$setConfigValues_(yt$msgs_, arguments);
    });
    goog$exportSymbol("yt.getMsg", yt$getMsg);
    goog$exportSymbol("yt.events.listen", yt$events$listen);
    goog$exportSymbol("yt.events.unlisten", yt$events$unlisten);
    goog$exportSymbol("yt.events.stopPropagation", yt$events$stopPropagation);
    goog$exportSymbol("yt.events.preventDefault", yt$events$preventDefault);
    goog$exportSymbol("yt.events.getTarget", yt$events$getTarget);
    goog$exportSymbol("yt.events.clear", function () {
        for (var a in yt$events$listeners_) {
            yt$events$unlistenByKey(a);
        }
    });
    goog$exportSymbol("yt.events.Event", yt$events$Event);
    yt$events$Event.prototype.preventDefault = yt$events$Event.prototype.preventDefault;
    yt$events$Event.prototype.stopPropagation = yt$events$Event.prototype.stopPropagation;
    goog$exportSymbol("yt.pubsub.subscribe", yt$pubsub$subscribe);
    goog$exportSymbol("yt.pubsub.unsubscribeByKey", function (a) {
        var b = goog$getObjectByName("yt.pubsub.instance_");
        if (b) {
            return b.unsubscribeByKey(a);
        } else {
            return false;
        }
    });
    goog$exportSymbol("yt.pubsub.publish", yt$pubsub$publish);
    goog$exportSymbol("yt.www.init", yt$www$init);
    goog$exportSymbol("yt.www.dispose", yt$www$dispose);
    yt$events$listen(window, "load", yt$www$init);
    yt$events$listen(window, "unload", yt$www$dispose);
    goog$exportSymbol("yt.www.logError", yt$www$logError);
    window.onerror = yt$www$logError;
    goog$exportSymbol("yt.uix.FormInput.selectOnChangeActionIE", function (a) {
        yt$uix$FormInput.getInstance().Hd(a);
    });
    yt$pubsub$subscribe("init", function () {
        var a = yt$uix$FormInput.getInstance();
        var b = goog$dom$getElementsByClass(yt$uix$BaseWidget$getCssClass(a, "select-element"));
        goog$array$forEach(b, function (b) {
            a.Hd(b);
        });
    });
    goog$exportSymbol("goog.i18n.bidi.isRtlText", goog$i18n$bidi$isRtlText);
    goog$exportSymbol("goog.i18n.bidi.setDirAttribute", function (a, b) {
        var c = b.value;
        var d = "";
        if (goog$i18n$bidi$isRtlText(c)) {
            d = "rtl";
        } else if (!goog$i18n$bidi$isRtlText(c)) {
            d = "ltr";
        }
        b.dir = d;
    });
    goog$exportSymbol("yt.i18n.virtualkeyboard.toggle", function (a, b) {
        if (a) {
            yt$i18n$virtualkeyboard$layout_ = a;
            yt$net$apiloader$load("GOOGLE_LANGUAGE_API_VIRTUAL_KEYBOARD", function () {
                if (yt$i18n$virtualkeyboard$keyboard_) {
                    var a = yt$i18n$virtualkeyboard$keyboard_;
                    if (a.isVisible()) {
                        a.setVisible(false);
                    } else {
                        a.setVisible(true);
                    }
                } else if (!yt$i18n$virtualkeyboard$loading_) {
                    yt$i18n$virtualkeyboard$loading_ = true;
                    yt$i18n$virtualkeyboard$language_ = b;
                    google.load("elements", "1", {
                        packages: "keyboard",
                        callback: "yt.i18n.virtualkeyboard.finishLoading"
                    });
                }
            });
        }
    });
    goog$exportSymbol("yt.i18n.virtualkeyboard.finishLoading", function () {
        google.elements.keyboard.setAutoHide(false);
        google.elements.keyboard.setSendShiftKeyUpEventUponInput(true);
        google.elements.keyboard.enableMinMaxMode(false);
        google.elements.keyboard.enableGoogleLogo(false);
        google.elements.keyboard.enableKeyCodeScheme(false);
        google.elements.keyboard.helpLink(
            ["//support.google.com/youtube/bin/answer.py?answer=1047939&hl=", yt$i18n$virtualkeyboard$language_].join(
                ""
            )
        );
        yt$i18n$virtualkeyboard$keyboard_ = new google.elements.keyboard.Keyboard(yt$i18n$virtualkeyboard$layout_, [
            "masthead-search-term"
        ]);
        yt$i18n$virtualkeyboard$loading_ = false;
    });
    goog$exportSymbol("yt.i18n.inputtools.loadInputTools", function (a, b, c) {
        if (a && b) {
            yt$i18n$inputtools$inputTools_ = a;
            yt$net$apiloader$load("GOOGLE_LANGUAGE_API_INPUT_TOOLS", function () {
                if (!yt$i18n$inputtools$controller_ && !yt$i18n$inputtools$loading_) {
                    yt$i18n$inputtools$loading_ = true;
                    yt$i18n$inputtools$elements_ = b;
                    yt$i18n$inputtools$language_ = c;
                    google.load("elements", "1", {
                        packages: "inputtools",
                        callback: "yt.i18n.inputtools.finishLoading"
                    });
                }
            });
        }
    });
    goog$exportSymbol("yt.i18n.inputtools.finishLoading", function () {
        yt$i18n$inputtools$controller_ = new google.elements.inputtools.InputToolsController();
        goog$object$forEach(yt$i18n$inputtools$elements_, function (a, c) {
            yt$i18n$inputtools$controller_.addPageElements([c]);
        });
        yt$i18n$inputtools$controller_.addInputTools(yt$i18n$inputtools$inputTools_);
        if (yt$i18n$inputtools$language_ && yt$i18n$inputtools$language_.indexOf("hi") != -1) {
            yt$i18n$inputtools$controller_.setCurrentInputTool("im_t13n_hi");
        }
        goog$object$forEach(yt$i18n$inputtools$elements_, function (a) {
            if (a) {
                yt$i18n$inputtools$controller_.showControl(a);
            }
        });
        var a = false;
        goog$array$forEach(yt$i18n$inputtools$inputTools_, function (b) {
            if (b.lastIndexOf("vdk", 0) == 0) {
                a = true;
            }
        });
        if (a) {
            google.elements.keyboard.helpLink(
                ["//support.google.com/youtube/bin/answer.py?answer=1047939&hl=", yt$i18n$inputtools$language_].join("")
            );
        }
        yt$i18n$inputtools$controller_.setApplicationName("youtube");
        yt$i18n$inputtools$loading_ = false;
    });
    goog$exportSymbol("yt.style.toggle", yt$style$toggle);
    goog$exportSymbol("yt.style.setDisplayed", yt$style$setDisplayed);
    goog$exportSymbol("yt.style.isDisplayed", yt$style$isDisplayed);
    goog$exportSymbol("yt.style.setVisible", function (a, b) {
        if ((a = goog$dom$getElement(a))) {
            a.style.visibility = b ? "visible" : "hidden";
        }
    });
    goog$exportSymbol("yt.net.ajax.sendRequest", yt$net$ajax$sendRequest);
    goog$exportSymbol("yt.net.ajax.getRootNode", yt$net$ajax$getRootNode);
    goog$exportSymbol("yt.net.ajax.getNodeValue", yt$net$ajax$getNodeValue);
    goog$exportSymbol("yt.net.ajax.setToken", yt$net$ajax$setToken);
    goog$exportSymbol("yt.net.delayed.register", yt$net$delayed$register);
    goog$exportSymbol("yt.net.delayed.load", yt$net$delayed$load);
    goog$exportSymbol("yt.net.delayed.markAsLoaded", function (a) {
        if (a in yt$net$delayed$registry_) {
            yt$net$delayed$loaded_[a] = true;
        }
    });
    goog$exportSymbol("yt.net.scriptloader.load", yt$net$scriptloader$load);
    goog$exportSymbol("goog.dom.forms.getFormDataString", goog$dom$forms$getFormDataString);
    goog$exportSymbol("yt.uri.buildQueryData", yt$uri$buildQueryData);
    goog$exportSymbol("yt.uri.appendQueryData", yt$uri$appendQueryData);
    goog$exportSymbol("yt.www.feedback.start", function (a, b, c, d) {
        try {
            var c = (c || "59") + "";
            var b = b || {};
            var e = yt$getConfig("SESSION_INDEX");
            try {
                var f = yt$www$watch$getPlayerReference_();
                if (f) {
                    f.pauseVideo();
                }
                var g = yt$flash$FlashDetector.getInstance();
                b.flashVersion = [g.J, g.Pa, g.rev].join(".");
            } catch (j) {}
            a = {
                productId: c,
                locale: a
            };
            if (e) {
                a.authuser = e + "";
            }
            if (d) {
                a.bucket = d;
            }
            userfeedback$startFeedback_(a, b);
            return false;
        } catch (o) {
            return true;
        }
    });
    goog$exportSymbol("yt.www.feedback.displayLink", yt$www$feedback$displayLink);
    yt$pubsub$subscribe("init", yt$www$feedback$displayLink);
    goog$exportSymbol("yt.www.help.bootstrap.init", yt$www$help$bootstrap$init);
    yt$pubsub$subscribe("init", yt$www$help$bootstrap$init);
    goog$exportSymbol("yt.net.cookies.set", yt$net$cookies$set);
    goog$exportSymbol("yt.net.cookies.get", yt$net$cookies$get);
    goog$exportSymbol("yt.net.cookies.remove", yt$net$cookies$remove);
    goog$exportSymbol("yt.window.redirect", yt$window$redirect);
    goog$exportSymbol("yt.window.popup", yt$window$popup);
    yt$uix$initWidget(yt$uix$Button);
    yt$uix$initWidget(yt$uix$CharCounter);
    yt$uix$initWidget(yt$uix$Clickcard);
    yt$uix$initWidget(yt$uix$FormInput);
    yt$uix$initWidget(yt$uix$Expander);
    yt$uix$initWidget(yt$uix$Hovercard);
    yt$uix$initWidget(yt$uix$Overlay);
    yt$uix$initWidget(yt$uix$RedirectLink);
    yt$uix$initWidget(yt$uix$Sessionlink);
    yt$uix$initWidget(yt$uix$Slider);
    yt$uix$initWidget(yt$uix$Tile);
    yt$uix$initWidget(yt$uix$Tooltip);
    goog$exportSymbol("yt.player.update", function (a, b, c) {
        return yt$player$embed(a, b, {
            force: c
        });
    });
    goog$exportSymbol("yt.player.embed", yt$player$embed);
    goog$exportSymbol("yt.flash.embed", yt$flash$embed);
    goog$exportSymbol("onYouTubePlayerReady", function () {
        yt$www$watch$player$hashMonitorEnabled_ = true;
        var a = yt$www$watch$getPlayerReference_();
        if (a) {
            yt$www$watch$player$waitForPlayerApi_(a);
        }
    });
    goog$exportSymbol("yt.www.watch.activity.getTimeSinceActive", yt$www$watch$activity$getTimeSinceActive);
    goog$exportSymbol("yt.www.watch.activity.setTimestamp", yt$www$watch$activity$setTimestamp);
    goog$exportSymbol("yt.www.watch.player.handleEndPreview", function (a) {
        var b = yt$www$watch$getPlayerReference_();
        if (b && b.stopVideo) {
            b.stopVideo();
        }
        if ((b = goog$dom$getElement("watch-checkout-offers"))) {
            yt$pubsub$publish("checkout-init-purchase", a, b);
        }
    });
    goog$exportSymbol("yt.www.watch.player.openPopup", function (a, b, c) {
        var d = null;
        var e = yt$www$watch$getPlayerReference_();
        var a = "/watch_popup?v=" + a;
        if (e) {
            a += "&vq=" + e.getPlaybackQuality();
            d = Math.round(e.getCurrentTime());
            e.stopVideo();
        }
        if (yt$getConfig("POPOUT_AD_SLOTS")) {
            a += "&pop_ads=" + yt$getConfig("POPOUT_AD_SLOTS");
        }
        if (d && d > 10) {
            a += "#t=" + d;
        }
        yt$window$popup(a, {
            width: b,
            height: c,
            resizable: true,
            location: false,
            statusbar: false,
            menubar: false,
            scrollbars: false,
            toolbar: false
        });
    });
    goog$exportSymbol("yt.www.watch.activity.init", yt$www$watch$activity$init);
    goog$exportSymbol("yt.www.watch.player.updateConfig", function (a) {
        var a = a instanceof yt$player$Config ? a.args : a.args;
        var b;
        var c = yt$uri$getHashData(window.location.hash);
        if ((b = c.t || c.at)) {
            yt$www$watch$player$lastHashData_.t = c.t;
            yt$www$watch$player$lastHashData_.at = c.at;
            c = window.location.hash.replace(/\bat=[^&]*&?/, "");
            window.location.hash = c && c != "#" ? c : "#!";
            b = yt$www$watch$player$parseTimeParam_(b);
        } else {
            b = 0;
        }
        if (b) {
            a.start = b;
            return true;
        } else {
            return false;
        }
    });
    goog$exportSymbol("yt.www.watch.player.init", function () {
        yt$www$watch$player$checkHash_();
        yt$setInterval(yt$www$watch$player$checkHash_, 1000);
    });
    goog$exportSymbol("yt.www.watch.player.seekTo", yt$www$watch$player$seekTo);
    goog$exportSymbol("openFull", function () {
        yt$window$popup("/watch_popup?v=" + yt$getConfig("VIDEO_ID"), {
            target: "FullScreenVideo",
            width: screen.availWidth,
            height: screen.availHeight,
            resizable: true,
            fullscreen: true
        });
    });
    goog$exportSymbol("checkCurrentVideo", function (a, b, c) {
        var d = yt$getConfig("VIDEO_ID");
        var e = d == a;
        var f = yt$www$lists$initialized_ ? yt$www$lists$getPlaylistBar().Ba() : null;
        var b = !b || b == f;
        if (d && (!e || !b)) {
            d = null;
            if (b) {
                d = yt$www$lists$getPlaylistBar();
                e = yt$www$lists$List$getIndicesOf_(d.b, [a])[0];
                d = e === undefined ? "" : yt$www$lists$List$getVideoUrl_(d.b, e);
            }
            if (!d) {
                d = c
                    ? c
                    : yt$uri$setQueryData(window.location.href, {
                          v: a,
                          feature: null
                      });
            }
            if (d) {
                yt$window$redirect(d);
            }
        }
    });
    goog$exportSymbol("trackAnnotationsEvent", function (a, b, c) {
        var d = yt$getConfig("ANALYTICS_ANNOTATIONS_TRACKER");
        window._gaq.push(function () {
            d._trackEvent(a, b, c);
        });
    });
    goog$exportSymbol("reportFlashTiming", function () {});
    goog$exportSymbol("reportTimingMaps", function (a, b) {
        for (var c in a) {
            yt$timing.Bc(c, a[c]);
        }
        for (var d in b) {
            yt$timing.info(d, b[d]);
        }
        yt$timing.Od();
    });
    goog$exportSymbol("yt.www.watch.playlists.editAnnotation", function () {
        goog$dom$classes$addRemove(goog$dom$getElement("watch-video-annotation-editable"), "not-editing", "editing");
        goog$dom$getElement("watch-video-annotation-textarea").focus();
        var a = goog$dom$getElement("watch-video-annotation-form");
        if (!yt$dom$datasets$get(a, "setup")) {
            yt$dom$datasets$set(a, "setup", "true");
            a = goog$dom$getElementByClass("cancel-button", a);
            yt$events$listen(a, "click", function (a) {
                a.preventDefault();
                yt$www$watch$videoannotation$updateDisplay_();
            });
        }
    });
    goog$exportSymbol("yt.www.watch.playlists.removeAnnotation", function () {
        var a = goog$dom$getElement("watch-video-annotation-form");
        goog$dom$getElement("watch-video-annotation-textarea").value = "";
        yt$www$watch$videoannotation$save_(a);
    });
    goog$exportSymbol("yt.www.watch.playlists.submitForm", function (a) {
        yt$www$watch$videoannotation$save_(a);
    });
    goog$exportSymbol("yt.www.watch.abandonment.init", function (a, b) {
        yt$www$watch$playerping$aplid_ = a;
        yt$www$watch$playerping$abt_ = b;
        var c = yt$getConfig("PLAYER_CONFIG");
        var c = new yt$player$Config(c);
        yt$flash$detectVersion_(function (a) {
            var e = yt$timing.timer || {};
            if (e.start && a.isSupported(c.minVersion)) {
                yt$www$watch$playerping$startTime_ = e.start;
                if (yt$www$watch$player$hashMonitorEnabled_) {
                    yt$www$watch$playerping$subscribe_(yt$www$watch$getPlayerReference_());
                } else {
                    yt$www$watch$player$readyPubSub_.gc("READY_STATE_TOPIC", yt$www$watch$playerping$subscribe_);
                }
                yt$events$listen(window, "beforeunload", yt$www$watch$playerping$onUnload_);
                a = goog$now() - yt$www$watch$playerping$startTime_;
                a = b - a;
                if (a >= 0) {
                    yt$www$watch$playerping$waitTimer_ = yt$setTimeout(yt$www$watch$playerping$onUserWaiting_, a);
                    yt$www$watch$playerping$ping_("attempt");
                }
            }
            yt$www$watch$playerping$pending_ = true;
        });
    });
    goog$exportSymbol("yt.history.enable", function (a, b) {
        var c = yt$history$getInstance(b);
        c.setEnabled.call(c, true, a);
    });
    goog$exportSymbol("yt.history.disable", function () {
        var a = yt$history$getInstance();
        a.setEnabled.call(a, false);
    });
    goog$exportSymbol("yt.www.lists.addto.toggleMenu", function (a, b, c) {
        var d = yt$uix$Tooltip.getInstance();
        var e = yt$uix$BaseWidget$getCssClass(d);
        var f = goog$dom$getElement("shared-addto-menu");
        if (b) {
            b = goog$dom$getElementByClass("addto-menu", f);
            yt$uix$Tooltip$hideTip_(d, a);
            yt$www$lists$addto$hadTooltipClass_ = goog$dom$classes$remove(a, e);
            if (!yt$www$lists$addto$menuTemplateHtml_) {
                yt$www$lists$addto$menuTemplateHtml_ = b.innerHTML;
            }
            d = yt$dom$datasets$get(f, "video-ids");
            e = yt$dom$datasets$get(a, "video-ids");
            if (yt$www$lists$addto$lightweightPanel_) {
                goog$dom$classes$add(f, "lightweight-panel");
            }
            if (goog$dom$classes$has(a, "flip")) {
                goog$dom$classes$add(f, "flip");
            }
            if (e && d != e) {
                yt$dom$datasets$set(f, "video-ids", e);
                b.innerHTML = yt$www$lists$addto$menuTemplateHtml_;
                f = !!yt$getConfig("DISPLAY_FLINTSTONE_PROTOTYPE");
                if (goog$isDef(c)) {
                    f = c;
                }
                new yt$www$lists$addto$AddToMenu(a, f);
            }
        } else {
            if (yt$www$lists$addto$hadTooltipClass_) {
                goog$dom$classes$add(a, e);
            }
            goog$dom$classes$remove(f, "flip");
        }
    });
    goog$exportSymbol("yt.www.lists.data.addto.saveToWatchLater", function (a, b) {
        yt$www$addto$addToWatchLater(a, b, function (b, d) {
            var e = d.list_id || "";
            var f = [a];
            var g = yt$getMsg("PLAYLIST_BAR_ADDED_TO_PLAYLIST");
            yt$www$lists$onVideosAdded("WL", e, f, g);
        });
    });
    goog$exportSymbol("yt.www.lists.addtomenupebbles.toggleMenu", function (a, b) {
        if (b) {
            var c = goog$dom$getElement("shared-tags-menu");
            if (!yt$www$lists$addtomenupebbles$menuTemplateHtml_) {
                yt$www$lists$addtomenupebbles$menuTemplateHtml_ = c.innerHTML;
            }
            var d = yt$dom$datasets$get(a, "video-ids");
            var e = yt$dom$datasets$get(c, "video-ids");
            if (d && e != d) {
                c.innerHTML = yt$www$lists$addtomenupebbles$menuTemplateHtml_;
                yt$dom$datasets$set(c, "video-ids", d);
                new yt$www$lists$addtomenupebbles$TagsMenu(c, d);
            }
        }
    });
    goog$exportSymbol("yt.www.lists.addtomenupebbles.init", function () {
        yt$uix$registerHandler_(
            "addto-button-collapsed",
            "mouseover",
            yt$www$lists$addtomenupebbles$expandButton_,
            2,
            true
        );
        yt$uix$registerHandler_(
            "addto-button-expanded",
            "mouseout",
            yt$www$lists$addtomenupebbles$collapseButton_,
            2,
            true
        );
    });
    goog$exportSymbol("yt.www.watch.watch5.enableWide", yt$www$watch$watch5$enableWide);
    goog$exportSymbol("yt.www.watch.watch5.handleResize", function () {
        yt$clearTimeout(yt$www$watch$watch5$resizeTimer_);
        yt$www$watch$watch5$resizeTimer_ = yt$setTimeout(yt$www$watch$watch5$updatePlayerSize, 200);
    });
    goog$exportSymbol("yt.www.watch.watch5.updatePlayerSize", yt$www$watch$watch5$updatePlayerSize);
    goog$exportSymbol("yt.www.watch.watch5.handleLoadMoreRelated", function () {
        yt$style$hide("watch-more-related-button");
        yt$style$show("watch-more-related", "watch-more-related-loading");
        yt$net$ajax$send("/related_ajax", {
            g: {
                video_id: yt$getConfig("VIDEO_ID"),
                action_more_related_videos: 1
            },
            f: function (a, b) {
                var c = goog$dom$getElement("watch-more-related");
                c.innerHTML = b.html;
                yt$www$thumbnaildelayload$loadImmediately(c);
            }
        });
    });
    goog$exportSymbol("yt.www.watch.watch5.handleYouTubeVJ", function () {
        goog$dom$getElement("youtube-vj-button").disabled = true;
        yt$net$ajax$send("/music_ajax", {
            g: {
                video_id: yt$getConfig("VIDEO_ID"),
                action_get_vj: 1
            },
            f: function (a, b) {
                if (b.video_list.length) {
                    b.video_list.unshift(yt$getConfig("VIDEO_ID"));
                    var c = yt$www$lists$getPlaylistBar();
                    yt$www$lists$setQueueVideoIds_([]);
                    yt$www$lists$addToQueueCookie_(b.video_list);
                    var d = new yt$www$lists$QueueList();
                    yt$www$lists$PlaylistBar$setList_(c, d);
                    d.F = 0;
                    c.Ua(true);
                    yt$www$lists$PlaylistBar$setAutoplay_(c, true);
                }
            }
        });
    });
    goog$exportSymbol("yt.www.watch.watch5.handleToggleMoreFromUser", function (a) {
        var b = goog$dom$getElement("watch-mft-button");
        if (b) {
            goog$dom$classes$enable(b, "yt-uix-expander-collapsed", true);
            goog$dom$classes$enable(b, "yt-uix-button-toggled", false);
        }
        if ((b = goog$dom$getElement("watch-more-from-topic"))) {
            goog$dom$classes$enable(b, "collapsed", true);
        }
        var b = goog$dom$classes$has(a, "yt-uix-expander-collapsed");
        var c = goog$dom$getElement("watch-more-from-user");
        if (!b && yt$dom$datasets$get(c, "loaded") != "true") {
            a = {
                user_id: yt$dom$datasets$get(a, "video-user-id"),
                video_id: yt$dom$datasets$get(a, "video-id"),
                action_channel_videos: "1"
            };
            yt$net$ajax$send("/watch_ajax", {
                format: "XML",
                method: "GET",
                g: a,
                f: function (a, b) {
                    c.innerHTML = b.html_content;
                    yt$dom$datasets$set(c, "loaded", "true");
                    yt$www$thumbnaildelayload$loadImmediately(c);
                    var f = parseInt(
                        yt$dom$datasets$get(goog$dom$getElement("watch-channel-discoverbox"), "slider-slide-selected"),
                        10
                    );
                    goog$dom$getElementsByTagNameAndClass("button", "yt-uix-slider-num", undefined)[f].click();
                }
            });
        }
        goog$dom$classes$enable(c, "collapsed", b);
    });
    goog$exportSymbol("yt.www.watch.watch5.handleToggleMoreFromTopic", function (a) {
        var b = goog$dom$getElement("watch-mfu-button");
        if (b) {
            goog$dom$classes$enable(b, "yt-uix-expander-collapsed", true);
            goog$dom$classes$enable(b, "yt-uix-button-toggled", false);
        }
        if ((b = goog$dom$getElement("watch-more-from-user"))) {
            goog$dom$classes$enable(b, "collapsed", true);
        }
        var b = goog$dom$classes$has(a, "yt-uix-expander-collapsed");
        var c = goog$dom$getElement("watch-more-from-topic");
        if (!b && yt$dom$datasets$get(c, "loaded") != "true") {
            a = {
                topic_id: yt$dom$datasets$get(a, "topic-id"),
                action_topic_videos: "1"
            };
            yt$net$ajax$send("/watch_ajax", {
                format: "XML",
                method: "GET",
                g: a,
                f: function (a, b) {
                    c.innerHTML = b.html_content;
                    yt$dom$datasets$set(c, "loaded", "true");
                    yt$www$thumbnaildelayload$loadImmediately(c);
                    var f = parseInt(
                        yt$dom$datasets$get(goog$dom$getElement("watch-channel-discoverbox"), "slider-slide-selected"),
                        10
                    );
                    goog$dom$getElementsByTagNameAndClass("button", "yt-uix-slider-num", undefined)[f].click();
                }
            });
        }
        goog$dom$classes$enable(c, "collapsed", b);
    });
    goog$exportSymbol("yt.www.watch.watch5.handleToggleDescription", function (a) {
        if (goog$dom$classes$has(a, "yt-uix-expander-collapsed")) {
            yt$tracking$track("descriptionClosed", undefined, undefined);
        } else {
            if ((a = goog$dom$getElement("watch-source-videos-list")) && yt$dom$datasets$get(a, "loaded") != "true") {
                yt$dom$datasets$set(a, "loaded", "true");
                var b = yt$uri$appendQueryData("/watch_ajax", {
                    action_get_video_attributions_component: 1,
                    v: yt$getConfig("VIDEO_ID")
                });
                yt$net$ajax$sendRequest(b, {
                    method: "GET",
                    update: a
                });
            }
            yt$tracking$track("descriptionOpened", undefined, undefined);
        }
    });
    goog$exportSymbol("yt.www.watch.watch5.purchaseComplete", function () {
        yt$style$show(goog$dom$getElement("watch-player-rental-play-button"));
        var a = goog$dom$getElement("watch-player-rental-still-frame");
        yt$style$hide(goog$dom$getElement("watch-player"));
        yt$style$show(a);
    });
    goog$exportSymbol("yt.www.watch.actions.init", function () {
        var a = yt$uri$getHashData(window.location.hash);
        var b = a.action;
        if (b) {
            switch (b) {
                case "flag":
                    yt$www$watch$actions$flag();
            }
            yt$setTimeout(function () {
                yt$www$watch$actions$getElement_("watch-actions-area-container").scrollIntoView();
            }, 0);
            delete a.action;
            a = yt$uri$buildQueryData(a) || "#!";
            window.location.hash = a;
        }
    });
    goog$exportSymbol("yt.www.watch.actions.loadPlusoneLike", function (a, b, c, d, e) {
        new yt$sharing$PlusOneButton(goog$dom$getElement(a), b, c, d, e, {
            size: "standard",
            source: "google:youtube:watch_exp"
        });
    });
    goog$exportSymbol("yt.www.watch.shortcuts.init", function () {
        yt$events$listen(document, "keypress", yt$www$watch$handleKeyPress_);
    });
    goog$exportSymbol("yt.www.watch.actions.captions", function (a) {
        if (yt$www$watch$actions$activateButton_(a)) {
            yt$www$watch$actions$showLoading_();
            yt$www$watch$transcript$load(function () {
                yt$style$hide("watch-actions-loading");
                yt$www$watch$actions$showPanel_("watch-actions-captions");
            });
        }
    });
    goog$exportSymbol("yt.www.watch.actions.flag", yt$www$watch$actions$flag);
    goog$exportSymbol("yt.www.watch.actions.hide", function () {
        yt$www$watch$actions$hidePanels_();
    });
    goog$exportSymbol("yt.www.watch.actions.like", function (a) {
        if (yt$www$watch$actions$activateButton_(a)) {
            yt$www$watch$actions$like_(true);
        }
    });
    goog$exportSymbol("yt.www.watch.actions.share", yt$www$watch$actions$share);
    goog$exportSymbol("yt.www.watch.actions.addto", function () {
        yt$www$watch$actions$showPanel_("watch-actions-addto");
        new yt$www$watch$AddToPanel(goog$dom$getElement("watch-actions-addto"), yt$getConfig("VIDEO_ID"));
    });
    goog$exportSymbol("yt.www.watch.actions.showSigninOrCreateChannelWarning", function (a) {
        if (yt$www$watch$actions$activateButton_(a)) {
            yt$www$watch$actions$showPanel_("watch-actions-logged-out");
        }
    });
    goog$exportSymbol("yt.www.watch.actions.stats", function (a) {
        if (yt$www$watch$actions$activateButton_(a)) {
            yt$www$watch$actions$showLoading_();
            yt$net$ajax$send("/insight_ajax", {
                format: "XML",
                method: "GET",
                g: {
                    action_get_statistics_and_data: 1,
                    v: yt$getConfig("VIDEO_ID")
                },
                f: function (a, c) {
                    yt$www$watch$actions$showAjaxContent_(c.html_content);
                },
                B: yt$www$watch$actions$showError_
            });
        }
    });
    goog$exportSymbol("yt.www.watch.actions.unlike", function (a) {
        if (yt$www$watch$actions$activateButton_(a)) {
            yt$www$watch$actions$like_(false);
        }
    });
    goog$exportSymbol("yt.www.watch.watch5.showIE9WebMPromo", function (a) {
        var b = document.createElement("video");
        if (b.canPlayType && !b.canPlayType("video/webm")) {
            yt$style$show(a);
        }
    });
    goog$exportSymbol("yt.www.comments.init", function () {
        var a = goog$dom$getElement("comments-view");
        new yt$www$comments$CommentsSection(a);
        yt$events$delegateByClass(a, "click", yt$www$comments$handleAction_, "comment-action");
    });
    goog$exportSymbol("yt.www.comments.initForm", function (a, b) {
        var c = goog$dom$getAncestorByTagNameAndClass(a, "form");
        if (!yt$dom$datasets$has(c, "initialized")) {
            yt$dom$datasets$set(c, "initialized", "true");
            c = new yt$www$comments$PostForm(c, !b);
            if (b) {
                c.focus();
            }
        }
    });
    goog$exportSymbol("yt.www.lists.init", function () {
        if (parseInt(yt$getConfig("PLAYLIST_BAR_PLAYING_INDEX"), 10) > -1) {
            yt$www$lists$getPlaylistBar();
            var a = yt$getConfig("AUTOPLAY_DELAY");
            if (a) {
                yt$www$lists$autoplayCountdown_(a);
            }
        }
        yt$www$lists$initialized_ = true;
    });
    goog$exportSymbol("yt.www.lists.getState", function () {
        var a = yt$www$lists$getPlayerListData();
        a.autoPlayMax = yt$getConfig("PLAY_ALL_MAX");
        return a;
    });
    goog$exportSymbol("yt.www.lists.registerNearEndEventsWithPlayer", yt$www$lists$registerNearEndEventsWithPlayer);
    goog$exportSymbol("yt.www.lists.handleNearPlaybackEnd", function (a) {
        if (
            yt$www$lists$initialized_ &&
            yt$www$lists$PlaylistBar$isAutoplayOn_(yt$www$lists$getPlaylistBar()) &&
            a.slice(0, -1) == "NEAR_END"
        ) {
            a = parseInt(a.slice(-1), 10);
            yt$www$lists$PlaylistBar$showAutoplayWarning_(yt$www$lists$getPlaylistBar(), a);
        }
    });
    goog$exportSymbol("yt.www.lists.pebblesmigration.initPebblesMigration", function () {
        var a = goog$dom$getElement("flintstone-migration");
        yt$events$delegateByClass(a, "click", yt$www$lists$pebblesmigration$onWipeClick_, "library-wipe-btn");
        yt$events$delegateByClass(a, "click", yt$www$lists$pebblesmigration$onImportClick_, "library-import-btn");
    });
    goog$exportSymbol("yt.dom.datasets.get", yt$dom$datasets$get);
    goog$exportSymbol("yt.dom.datasets.set", yt$dom$datasets$set);
    yt$registerGlobal(
        "openFull",
        "checkCurrentVideo",
        "trackAnnotationsEvent",
        "reportFlashTiming",
        "shareVideoFromFlash",
        "setCompanion",
        "setInstreamCompanion",
        "setLongformCompanion",
        "setFreewheelCompanion",
        "closeInPageAdIframe",
        "hideInstreamCompanion",
        "disablePopout",
        "enablePopout",
        "closeMpuCompanion",
        "updatePopAds",
        "setAfvCompanionVars",
        "showAfvCompanionAdDiv",
        "hideAfvInstreamCompanionAdDiv",
        "show_ppv_in_yva_spot",
        "requestPyvAds",
        "pyvHomeRequestAds",
        "pyvBrowseRequestAds",
        "showGutCompanion"
    );
    goog$exportSymbol("yt.www.search.init", function () {
        yt$events$delegateByClass(
            goog$dom$getElement("search-footer-box"),
            "mouseover",
            function () {},
            "yt-uix-pager-page-num"
        );
    });
    goog$exportSymbol("yt.www.search.legos.toggleExpandedRefinements", function () {
        yt$style$toggleOne_(goog$dom$getElement("search-lego-refinements"));
        return false;
    });
    goog$exportSymbol("yt.www.search.toggleToolbelt", function () {
        var a = goog$dom$getElement("toolbelt-top");
        var b = goog$dom$getElement("search-option-expander");
        var c = !goog$dom$classes$has(b, "expanded");
        goog$dom$classes$enable(b, "expanded", c);
        if (c) {
            yt$style$show(a);
            a.style.height = goog$dom$getElement("toolbelt-container").offsetHeight + "px";
        } else {
            a.style.height = 0;
            yt$setTimeout(function () {
                yt$style$hide(a);
            }, 300);
        }
        return false;
    });
    goog$exportSymbol("yt.www.thumbnaildelayload.init", function (a) {
        yt$www$thumbnaildelayload$preloadMargin_ = a || 0;
        yt$www$thumbnaildelayload$topOffset_ = yt$www$thumbnaildelayload$getVisibleBottom_();
        yt$www$thumbnaildelayload$delayLoadEnabled_ = true;
        yt$www$thumbnaildelayload$registerDelayLoad(undefined, undefined);
        yt$www$thumbnaildelayload$loadAllAbove_();
        yt$events$listen(window, "scroll", yt$www$thumbnaildelayload$loadVisible_);
        yt$events$listen(window, "resize", yt$www$thumbnaildelayload$loadVisible_);
    });
    goog$exportSymbol("yt.www.xsrf.populateSessionToken", function () {
        for (var a = 0; a < document.forms.length; a++) {
            var b = false;
            for (var c = 0; c < yt$www$xsrf$EXCLUDED_FORM_NAMES_.length; c++) {
                if (document.forms[a].name == yt$www$xsrf$EXCLUDED_FORM_NAMES_[c]) {
                    b = true;
                }
            }
            c = document.forms[a];
            if (c.method.toLowerCase() == "post" && b == false) {
                var b = false;
                for (var d = 0; d < c.elements.length; d++) {
                    if (c.elements[d].name == yt$getConfig("XSRF_FIELD_NAME")) {
                        b = true;
                    }
                }
                if (!b) {
                    b = undefined;
                    b = yt$getConfig("XSRF_TOKEN");
                    d = document.createElement("input");
                    d.setAttribute("name", yt$getConfig("XSRF_FIELD_NAME"));
                    d.setAttribute("type", "hidden");
                    d.setAttribute("value", b);
                    c.appendChild(d);
                }
            }
        }
    });
    goog$exportSymbol("yt.www.masthead.performSearch", function (a, b) {
        var c = goog$dom$getElement("masthead-search");
        var d = yt$dom$datasets$get(b, a) || "";
        if (d == "rentals") {
            c.rental.value = 1;
            c.search_type.value = "";
        } else {
            c.search_type.value = d;
            c.rental.value = 0;
        }
        if (c.search_query.value) {
            c.submit();
        } else {
            var c = b.innerHTML;
            var e = goog$dom$getElement("search-btn");
            var f = e.innerHTML;
            var g = yt$dom$datasets$get(e, a) || "";
            e.innerHTML = c;
            yt$dom$datasets$set(e, a, d);
            b.innerHTML = f;
            yt$dom$datasets$set(b, a, g);
        }
        return false;
    });
    goog$exportSymbol("yt.www.masthead.loadPicker", function (a, b, c) {
        var d = goog$dom$getElement(a);
        if (d) {
            if (c) {
                yt$style$show(d);
            } else {
                yt$style$toggle(d);
            }
        } else {
            d = document.createElement("div");
            d.id = a;
            yt$style$hide(d);
            goog$dom$getElement("picker-container").appendChild(d);
            c = "/masthead_ajax?action_get_" + a.replace("-", "_") + "=1";
            if (b) {
                c = b + c;
            }
            yt$net$ajax$sendRequest(c, {
                method: "GET",
                update: a,
                onComplete: function () {
                    yt$style$hide("picker-loading");
                    yt$style$show(a);
                    goog$dom$getElement(a).scrollIntoView();
                }
            });
            yt$style$show("picker-loading");
        }
        goog$dom$classes$add(d, "yt-tile-static");
        yt$www$picker$hideAllExcept_(a);
        goog$dom$getElement(a).scrollIntoView();
    });
    goog$exportSymbol("yt.www.masthead.dismissGAPlusMessage", function () {
        var a = yt$net$cookies$get("FML", "").split(",");
        var b = new Date();
        var b = Math.round(b.getTime() / 1000);
        var c = "";
        var c = a.length != 2 ? "1," + b : parseInt(a[0], 10) + 1 + "," + b;
        yt$net$cookies$set("FML", c, 315360000);
    });
    goog$exportSymbol("yt.www.masthead.dismissPostLinkingMessage", function () {
        yt$net$cookies$remove("FML");
    });
    goog$exportSymbol("yt.www.masthead.toggleExpandedMasthead", function () {
        var a = goog$dom$getElement("masthead-expanded");
        yt$style$toggleOne_(a);
        yt$style$setDisplayed("masthead-expanded-menu", true);
        yt$style$setDisplayed("masthead-expanded-acct-sw-container", false);
        if (!yt$www$masthead$accountswitch$enabled_) {
            goog$dom$classes$remove(goog$dom$getElement("masthead-expanded-container"), "accountswitch");
        }
        if (!yt$dom$datasets$get(a, "loaded")) {
            var b = goog$dom$getElement("masthead-expanded-menu-gaia-photo");
            if (b && !b.src) {
                b.src = yt$dom$datasets$get(b, "src");
            }
            yt$net$ajax$send("/playlist_bar_ajax", {
                g: {
                    action_get_playlists_masthead: 1,
                    feature: "mhee",
                    new_slider: 1
                },
                format: "JSON",
                kb: true,
                f: function (b, d) {
                    goog$dom$getElement("masthead-expanded-lists-container").innerHTML = d.html;
                    yt$dom$datasets$set(a, "loaded", "true");
                }
            });
        }
    });
    goog$exportSymbol("yt.www.masthead.accountswitch.init", function (a) {
        yt$www$masthead$accountswitch$enabled_ = a;
    });
    goog$exportSymbol("yt.www.masthead.accountswitch.toggle", function () {
        yt$style$toggleOne_("masthead-expanded-acct-sw-container");
        var a = goog$dom$getElement("masthead-expanded-container");
        var b = goog$dom$getElement("masthead-expanded-acct-sw-container");
        if (yt$style$isDisplayed(b)) {
            b.style.top = a.offsetTop + "px";
            b = goog$dom$getElement("masthead-expanded-menu-acct-sw-list");
            if (b.offsetHeight < a.offsetHeight) {
                b.style.height = a.offsetHeight - 11 + "px";
            }
            var c = goog$dom$getElement("masthead-expanded-acct-sw-iframe");
            if (!c) {
                var d = goog$dom$getElement("masthead-expanded-menu-acct-sw-list");
                var c = goog$dom$createDom("iframe", {
                    id: "masthead-expanded-acct-sw-iframe",
                    frameborder: 0,
                    src: 'javascript:""'
                });
                if (d.parentNode) {
                    d.parentNode.insertBefore(c, d);
                }
            }
            c.style.height = b.offsetHeight - 11 + "px";
            if (!yt$www$masthead$accountswitch$enabled_) {
                goog$dom$classes$add(a, "accountswitch");
            }
        } else if (!yt$www$masthead$accountswitch$enabled_) {
            goog$dom$classes$remove(a, "accountswitch");
        }
    });
    goog$exportSymbol("yt.www.masthead.initSandbar", function (a, b) {
        window.___jsl = {
            h: yt$getConfig("GAPI_HINT_PARAMS")
        };
        gapi$load("iframes", {
            callback: function () {
                var c = goog$dom$getElement("sb-button-notify");
                var d = goog$dom$getElement("sb-button-share");
                var e = new yt$www$sandbar$Sandbar(a, b);
                yt$events$listen(c, "click", goog$bind(e.Ii, e));
                yt$events$listen(d, "click", goog$bind(e.Ji, e));
                yt$pubsub$publish("sandbar-init");
            }
        });
    });
    goog$exportSymbol("yt.www.ads.MastheadAd", yt$www$ads$MastheadAd);
    yt$www$ads$MastheadAd.prototype.collapse_ad = yt$www$ads$MastheadAd.prototype.collapse;
    yt$www$ads$MastheadAd.prototype.expand_ad = yt$www$ads$MastheadAd.prototype.expand;
    goog$exportSymbol("yt.www.home.ads.workaroundIE", function (a) {
        if (!yt$www$home$ads$ieFocusApplied_ && yt$www$home$ads$adLoaded_) {
            yt$www$home$ads$ieFocusApplied_ = true;
            yt$setTimeout(function () {
                a.focus();
            }, 0);
        }
    });
    goog$exportSymbol("yt.www.home.ads.workaroundLoad", function () {
        yt$www$home$ads$adLoaded_ = true;
    });
    goog$exportSymbol("yt.www.home.ads.workaroundReset", function () {
        yt$www$home$ads$ieFocusApplied_ = false;
    });
    goog$exportSymbol("yt.www.home.ads.writeAdsContentToIframe", function (a, b) {
        var c = goog$dom$getElement(a).contentDocument || goog$dom$getElement(a).contentWindow.document;
        c.open();
        c.write("<!DOCTYPE html><html><head></head><body>" + b + "</body></html>");
        if (!goog$userAgent$IE) {
            c.close();
        }
    });
    goog$exportSymbol("yt.www.home.ads.yvaCollapse", function () {
        var a = goog$dom$getElement("yva-bin");
        if (a) {
            var b = goog$dom$getElement("yva-bg");
            if (b) {
                goog$dom$classes$addRemove(b, "yva-360-bg", "yva-250-bg");
            }
            goog$dom$classes$addRemove(a, "yva-expanded", "yva-collapsed");
        }
    });
    goog$exportSymbol("yt.www.home.ads.yvaExpand", function () {
        var a = goog$dom$getElement("yva-bin");
        if (a) {
            goog$dom$classes$addRemove(a, "yva-collapsed", "yva-expanded");
        }
    });
    goog$exportSymbol("yt.tracking.doubleclick.trackActivity", function (a, b, c) {
        a =
            (document.location.protocol == "https:" ? "https://" : "http://") +
            "fls.doubleclick.net/activityi;src=" +
            goog$string$urlEncode(yt$getConfig("DBLCLK_ADVERTISER_ID")) +
            ";type=" +
            goog$string$urlEncode(a) +
            ";cat=" +
            goog$string$urlEncode(b);
        if (c && !c.ord) {
            a += ";ord=1";
        }
        for (var d in c) {
            a += ";" + goog$string$urlEncode(d) + "=" + goog$string$urlEncode(c[d]);
        }
        a += ";num=" + goog$now();
        c = document.createElement("iframe");
        c.src = a;
        c.style.display = "none";
        document.body.appendChild(c);
    });
    goog$exportSymbol("yt.tracking.track", function (a, b, c) {
        yt$tracking$track(a, b, c);
    });
    goog$exportSymbol("yt.tracking.resolution", function () {
        yt$net$ping$send(
            "/mac_204?" +
                ("action_scr2=1&height=" + screen.height + "&width=" + screen.width + "&depth=" + screen.colorDepth),
            undefined
        );
    });
    goog$exportSymbol("yt.tracking.share", yt$tracking$share);
    goog$exportSymbol("yt.analytics.urchinTracker", function () {});
    goog$exportSymbol("yt.analytics.trackEvent", yt$analytics$trackEvent);
    goog$exportSymbol("yt.www.privacynotice.dismiss", function () {
        yt$net$cookies$set("prnfy", "-1", 5184000);
        yt$net$ping$send("/gen_204?typ=i&ct=pp_tos&cd=dismiss&source=yt", undefined);
    });
    goog$exportSymbol("yt.www.privacynotice.learnMore", function () {
        yt$net$ping$send("/gen_204?typ=i&ct=pp_tos&cd=tellmore&source=yt", undefined);
    });
    goog$exportSymbol("yt.timing.report", yt$timing.Gc);
    goog$exportSymbol("yt.timing.maybeReport", yt$timing.Od);
    goog$exportSymbol("yt.timing.handlePageLoad", yt$timing.Df);
    goog$exportSymbol("yt.timing.handleThumbnailLoad", yt$timing.Li);
    yt$pubsub$subscribe("init", yt$timing.Df);
    if (yt$IS_JSCRIPT_ && (!document.documentMode || document.documentMode < 8)) {
        yt$events$delegateByClass(goog$dom$getElement("ie"), "click", yt$www$watch$forwardClick_, "video-thumb");
    }
    goog$exportSymbol("yt.www.subscriptions.edit.onUpdateSubscription", function (a, b, c, d) {
        var c = c || "";
        var e = false;
        if ((b = goog$dom$getElement("subscription_level_unsubscribe")) && b.checked) {
            e = true;
        }
        b = goog$dom$forms$getFormDataString(goog$dom$getElement("subscription_level_uploads" + c).form);
        yt$net$ajax$sendRequest("/ajax_subscriptions?" + b, {
            postBody: "session_token=" + a,
            onComplete: function (a) {
                goog$dom$getElement("subscribeMessage" + c).innerHTML = yt$net$ajax$getNodeValue(
                    yt$net$ajax$getRootNode(a),
                    "html_content"
                );
                yt$style$hide("edit_subscription_wrapper" + c);
                yt$style$hide("edit_subscription_arrow" + c);
                yt$style$show("subscribeMessage" + c);
                if (c) {
                    goog$dom$getElement("edit_subscription_opener" + c).style.visibility = "";
                    yt$setTimeout(function () {
                        yt$style$hide("subscribeMessage" + c);
                    }, 5000);
                }
                if (e) {
                    var b = goog$dom$getElement("channel-body");
                    var a = goog$dom$getElementsByTagNameAndClass("div", "subscribe-div", b);
                    var b = goog$dom$getElementsByTagNameAndClass("div", "unsubscribe-div", b);
                    goog$array$forEach(a, function (a) {
                        yt$style$toggle(a);
                    });
                    goog$array$forEach(b, function (a) {
                        yt$style$toggle(a);
                    });
                    d();
                }
            }
        });
    });
    goog$exportSymbol("yt.www.subscriptions.edit.onCancelUpdateSubscription", function (a) {
        a = a || "";
        yt$style$hide("edit_subscription_wrapper" + a);
        yt$style$hide("edit_subscription_arrow" + a);
        if (a) {
            goog$dom$getElement("edit_subscription_opener" + a).style.visibility = "";
        }
        yt$style$hide("alerts");
    });
    goog$exportSymbol("yt.www.subscriptions.edit.onEditSubscriptionFromRecentActivity", function (a, b, c, d) {
        if (window["edit_subscription_download_" + c]) {
            yt$style$hide("subscribeMessage" + c);
            yt$style$toggle("edit_subscription_wrapper" + c);
            yt$style$toggle("edit_subscription_arrow" + c);
            a = goog$dom$getElement("edit_subscription_opener" + c);
            a.style.visibility = a.style.visibility == "visible" ? "" : "visible";
        } else {
            window["edit_subscription_download_" + c] = true;
            yt$net$ajax$sendRequest("/ajax_subscriptions?get_edit_subscription_form=" + b + "&i=" + c, {
                postBody: "session_token=" + a,
                onComplete: function (a) {
                    goog$dom$getElement("edit_subscription_opener" + c).style.visibility = "visible";
                    var b = document.createElement("div");
                    b.innerHTML = yt$net$ajax$getNodeValue(a.responseXML, "html_content");
                    d.parentNode.insertBefore(b, d);
                    yt$style$show("edit_subscription_wrapper" + c);
                    yt$style$show("edit_subscription_arrow" + c);
                }
            });
        }
    });
    goog$exportSymbol("yt.www.subscriptions.SubscriptionButton.init", function (a, b) {
        var c = goog$dom$getElementsByClass("yt-subscription-button-js-default", a);
        goog$array$forEach(c, function (a) {
            if (!yt$dom$datasets$get(a, "subscription-initialized")) {
                new yt$www$subscriptions$SubscriptionButton(a, b);
                yt$dom$datasets$set(a, "subscription-initialized", "true");
            }
        });
    });
    goog$exportSymbol("yt.www.subscriptions.button.subscribe", function (a) {
        var b = yt$www$subscriptions$button$getContainer_(a);
        var c = yt$dom$datasets$get(b, "subscription-type");
        var d = yt$dom$datasets$get(b, "subscription-xsrf") || "";
        var e = yt$dom$datasets$get(b, "subscription-menu-type");
        var f = yt$dom$datasets$get(b, "subscription-channels-container");
        var g = yt$dom$datasets$get(b, "subscription-feature");
        var j = yt$dom$datasets$get(b, "subscription-value");
        var o = {};
        if (c == "playlist") {
            o.action_create_subscription_to_playlist = 1;
            c = "p";
        } else if (c == "blog") {
            o.action_create_subscription_to_blog = 1;
            c = "b";
        } else if (c == "topic") {
            o.action_create_subscription_to_topic = 1;
            c = "l";
        } else {
            o.action_create_subscription_to_user = 1;
            c = "u";
        }
        if (g) {
            o.feature = g;
        }
        a.disabled = true;
        yt$www$subscriptions$init_(d);
        d = new yt$www$subscriptions$SubscriptionRequest(
            yt$www$subscriptions$button$onSubscribed_,
            yt$www$subscriptions$button$onRequestFailed_
        );
        yt$www$subscriptions$SubscriptionRequest$addUrlParams_(d, o);
        o = {};
        o[c] = j;
        o.menu_type = e;
        if ((e = yt$getConfig("PLAYBACK_ID"))) {
            o.plid = e;
        }
        if (f) {
            o.show_channels = true;
        }
        d.gb = o || {};
        d.userData.eventTrigger = a;
        d.userData.subscription = b;
        yt$www$subscriptions$enqueue_(d);
        yt$tracking$conversion$ping("subscribe");
    });
    goog$exportSymbol("yt.www.subscriptions.button.subscribeToCollection", function (a) {
        var b = yt$www$subscriptions$button$getContainerFromMenu_(a);
        var c = goog$dom$getAncestorByTagNameAndClass(a, null, "subscription-recommendations");
        var d = yt$dom$datasets$get(b, "subscription-xsrf") || "";
        var e = [];
        for (var f = goog$dom$getElementsByTagNameAndClass("input", "username", c), g = 0; g < f.length; g++) {
            if (f[g].checked) {
                e.push(f[g].value);
            }
        }
        if (e.length == 0) {
            goog$dom$removeNode(c);
        } else {
            a.disabled = true;
            yt$www$subscriptions$init_(d);
            d = new yt$www$subscriptions$SubscriptionRequest(
                yt$www$subscriptions$button$removeCollection_,
                yt$www$subscriptions$button$onRequestFailed_
            );
            yt$www$subscriptions$SubscriptionRequest$addUrlParams_(d, {
                action_create_subscription_to_users: 1
            });
            f = {};
            f.usernames = e.join(",");
            d.gb = f || {};
            d.userData.eventTrigger = a;
            d.userData.subscription = b;
            d.userData.collection = c;
            yt$www$subscriptions$enqueue_(d);
        }
    });
    goog$exportSymbol("yt.www.subscriptions.button.unsubscribe", function (a) {
        var b = yt$www$subscriptions$button$getContainerFromMenu_(a);
        var c = yt$dom$datasets$get(b, "subscription-id");
        var d = yt$dom$datasets$get(b, "subscription-xsrf") || "";
        var e = yt$dom$datasets$get(b, "subscription-feature");
        if (!a.disabled) {
            a.disabled = true;
            yt$www$subscriptions$init_(d);
            var d = new yt$www$subscriptions$SubscriptionRequest(
                yt$www$subscriptions$button$onUnsubscribed_,
                yt$www$subscriptions$button$onRequestFailed_
            );
            var f = {
                action_remove_subscription: 1
            };
            if (e) {
                f.feature = e;
            }
            yt$www$subscriptions$SubscriptionRequest$addUrlParams_(d, f);
            e = {};
            e.subscription_id = c;
            if ((c = yt$getConfig("PLAYBACK_ID"))) {
                e.plid = c;
            }
            d.gb = e || {};
            d.userData.eventTrigger = a;
            d.userData.subscription = b;
            yt$www$subscriptions$enqueue_(d);
            yt$tracking$conversion$ping("unsubscribe");
        }
    });
    goog$exportSymbol("yt.www.subscriptions.button.update", function (a) {
        var b = yt$www$subscriptions$button$getContainerFromMenu_(a);
        var c = yt$dom$datasets$get(b, "subscription-id");
        var d = yt$dom$datasets$get(b, "subscription-xsrf") || "";
        a.disabled = true;
        yt$www$subscriptions$init_(d);
        var d = new yt$www$subscriptions$SubscriptionRequest(
            yt$www$subscriptions$button$onUnsubscribeSuccess_,
            yt$www$subscriptions$button$onRequestFailed_
        );
        var e = goog$dom$getAncestorByTagNameAndClass(a, null, "subscription-menu-form");
        var e = goog$structs$Map$toObject(goog$dom$forms$getFormDataMap(e));
        if (!e.email_on_upload) {
            e.email_on_upload = false;
        }
        e.action_update_subscription_preferences = 1;
        yt$www$subscriptions$SubscriptionRequest$addUrlParams_(d, e);
        d.gb = {
            subscription_id: c
        };
        d.userData.eventTrigger = a;
        d.userData.subscription = b;
        yt$www$subscriptions$enqueue_(d);
    });
    goog$exportSymbol("yt.www.subscriptions.button.toggleMenu", yt$www$subscriptions$button$toggleMenu);
    goog$exportSymbol("yt.www.subscriptions.button.closeMenu", function (a) {
        a = yt$www$subscriptions$button$getContainerFromMenu_(a);
        if (yt$dom$datasets$get(a, "subscription-menu-type") == "button") {
            yt$www$subscriptions$button$resetButtonMenu_(a);
        } else {
            yt$www$subscriptions$button$resetExpandableMenu_(a);
        }
    });
    yt$registerGlobal(
        "yt",
        "goog",
        "_gel",
        "googleapisv0",
        "_hasclass",
        "_addclass",
        "_removeclass",
        "_showdiv",
        "_hidediv",
        "_ajax"
    );
    goog$exportSymbol("yt.www.masthead.extended.redirectWithNewParam", function (a, b) {
        var c;
        var d;
        var e;
        c = window.location.href;
        c = c.split("#");
        d = c.length == 2 ? "#" + c[1] : "";
        c = c[0];
        e = yt$uri$getQueryData(c);
        e[b] = a;
        e["persist_" + b] = "1";
        c = c.split("?");
        c = c[0];
        yt$window$redirect(c, e, d);
    });
    goog$exportSymbol("yt.www.watch.stats.extended.setInsightOptOut", function (a) {
        if (a) {
            goog$dom$classes$add(goog$dom$getElement("insight-private"), "selected");
            goog$dom$classes$remove(goog$dom$getElement("insight-public"), "selected");
        } else {
            goog$dom$classes$add(goog$dom$getElement("insight-public"), "selected");
            goog$dom$classes$remove(goog$dom$getElement("insight-private"), "selected");
        }
        var b = goog$dom$getElement("insight-optout-form");
        if (b) {
            a = yt$uri$appendQueryData(b.action, {
                opt_out: a
            });
            b = goog$dom$forms$getFormDataString(b);
            yt$net$ajax$sendRequest(a, {
                postBody: b,
                onComplete: function () {}
            });
        }
        return false;
    });
    goog$exportSymbol("yt.www.watch.stats.extended.toggleReferrer", function (a) {
        yt$style$toggle(a);
        return false;
    });
    goog$exportSymbol("yt.www.watch.survey.takeWatchPageSurvey", function () {
        yt$www$watch$survey$watchPageSurveyGoAway();
        window
            .open(
                "/watch_page_survey?r2=" +
                    yt$getConfig("SURVEY_REFERER") +
                    "&r1=" +
                    yt$getConfig("SURVEY_SERVLET_NAME") +
                    "&name=" +
                    yt$getConfig("SURVEY_TYPE"),
                "YouTube_User_Happiness_Survey",
                "toolbar=no,width=800,height=768,status=no,resizable=yes,fullscreen=no,scrollbars=yes"
            )
            .focus();
    });
    goog$exportSymbol("yt.www.watch.survey.watchPageSurveyGoAway", yt$www$watch$survey$watchPageSurveyGoAway);
    goog$exportSymbol("yt.www.watch.survey.checkSurveyCompletedAndShow", function () {
        if (!yt$prefs$UserPrefs$getFlag(yt$prefs$UserPrefs.getInstance(), yt$prefs$BitFlags.xf)) {
            yt$style$show("watch_page_survey");
        }
    });
    goog$exportSymbol("yt.www.watch.user.unblockUserLinkByUsername", function (a, b) {
        if (!confirm(yt$getMsg("UNBLOCK_USER"))) {
            return false;
        }
        var c = {
            postBody: "unblock_user=0&" + yt$getConfig("BLOCK_USER_XSRF") + "&friend_username=" + a
        };
        if (b) {
            c.onComplete = function () {
                window.location.reload();
            };
        }
        yt$net$ajax$sendRequest("/link_servlet", c);
        return false;
    });
    goog$exportSymbol("yt.www.watch.user.blockUserLinkByUsername", function (a, b) {
        if (!confirm(yt$getMsg("BLOCK_USER"))) {
            return false;
        }
        var c = {
            postBody: "block_user=1&" + yt$getConfig("BLOCK_USER_XSRF") + "&friend_username=" + a
        };
        if (b) {
            c.onComplete = function () {
                window.location.reload();
            };
        }
        yt$net$ajax$sendRequest("/link_servlet", c);
        return false;
    });
    goog$exportSymbol("yt.www.watch.user.unblockUserLinkByExternalId", function (a, b) {
        if (confirm(yt$getMsg("UNBLOCK_USER"))) {
            yt$net$ajax$send("/link_ajax?action_unblock_user=1", {
                format: "XML",
                method: "POST",
                za: yt$getConfig("BLOCK_USER_AJAX_XSRF") + "&uid=" + a,
                f: function () {
                    if (b) {
                        window.location.reload();
                    }
                }
            });
        }
    });
    goog$exportSymbol("yt.www.watch.user.blockUserLinkByExternalId", function (a, b) {
        if (confirm(yt$getMsg("BLOCK_USER"))) {
            yt$net$ajax$send("/link_ajax?action_block_user=1", {
                format: "XML",
                method: "POST",
                za: yt$getConfig("BLOCK_USER_AJAX_XSRF") + "&uid=" + a,
                f: function () {
                    if (b) {
                        window.location.reload();
                    }
                }
            });
        }
    });
    goog$exportSymbol("getNextVideoId", function (a) {
        var b = yt$www$lists$getPlaylistBar();
        var c = yt$www$lists$PlaylistBar$isAutoplayOn_(b);
        var d = a <= yt$getConfig("PLAY_ALL_MAX");
        if (c && d) {
            return b.td(a);
        } else {
            return "";
        }
    });
    yt$registerGlobal("getNextVideoId");
})();
