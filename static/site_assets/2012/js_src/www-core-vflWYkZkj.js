(function () {
    var goog$global = this;
    var goog$getObjectByName = function (name) {
        for (var name = name.split("."), cur = goog$global, part; (part = name.shift());) {
            if (cur[part] != null) {
                cur = cur[part];
            } else {
                return null;
            }
        }
        return cur;
    };
    var goog$addSingletonGetter = function (ctor) {
        ctor.getInstance = function () {
            return ctor.instance_ || (ctor.instance_ = new ctor());
        };
    };
    var goog$typeOf = function (value) {
        var b = typeof value;
        if (b == "object") {
            if (value) {
                if (value instanceof Array) {
                    return "array";
                }
                if (value instanceof Object) {
                    return b;
                }
                var c = Object.prototype.toString.call(value);
                if (c == "[object Window]") {
                    return "object";
                }
                if (
                    c == "[object Array]" ||
                    (typeof value.length == "number" &&
                        typeof value.splice != "undefined" &&
                        typeof value.propertyIsEnumerable != "undefined" &&
                        !value.propertyIsEnumerable("splice"))
                ) {
                    return "array";
                }
                if (
                    c == "[object Function]" ||
                    (typeof value.call != "undefined" &&
                        typeof value.propertyIsEnumerable != "undefined" &&
                        !value.propertyIsEnumerable("call"))
                ) {
                    return "function";
                }
            } else {
                return "null";
            }
        } else if (b == "function" && typeof value.call == "undefined") {
            return "object";
        }
        return b;
    };
    var goog$isDef = function (val) {
        return val !== undefined;
    };
    var goog$isArray = function (val) {
        return goog$typeOf(val) == "array";
    };
    var goog$isArrayLike = function (val) {
        var b = goog$typeOf(val);
        return b == "array" || (b == "object" && typeof val.length == "number");
    };
    var goog$isString = function (val) {
        return typeof val == "string";
    };
    var goog$isObject = function (val) {
        var b = typeof val;
        return (b == "object" && val != null) || b == "function";
    };
    var goog$getUid = function (obj) {
        return obj[goog$UID_PROPERTY_] || (obj[goog$UID_PROPERTY_] = ++goog$uidCounter_);
    };
    var goog$UID_PROPERTY_ = "closure_uid_" + Math.floor(Math.random() * 2147483648).toString(36);
    var goog$uidCounter_ = 0;
    var goog$bindNative_ = function (fn, selfObj, var_args) {
        return fn.call.apply(fn.bind, arguments);
    };
    var goog$bindJs_ = function (fn, selfObj, var_args) {
        if (!fn) {
            throw Error();
        }
        if (arguments.length > 2) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function () {
                var newArgs = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(newArgs, d);
                return fn.apply(selfObj, newArgs);
            };
        }
        return function () {
            return fn.apply(selfObj, arguments);
        };
    };
    var goog$bind = function (fn, selfObj, var_args) {
        goog$bind =
            Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1
                ? goog$bindNative_
                : goog$bindJs_;
        return goog$bind.apply(null, arguments);
    };
    var goog$partial = function (fn, var_args) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function () {
            var newArgs = Array.prototype.slice.call(arguments);
            newArgs.unshift.apply(newArgs, c);
            return fn.apply(this, newArgs);
        };
    };
    var goog$now =
        Date.now ||
        function () {
            return +new Date();
        };
    var goog$exportSymbol = function (publicPath, object) {
        var parts = publicPath.split(".");
        var cur = goog$global;
        if (!(parts[0] in cur) && cur.execScript) {
            cur.execScript("var " + parts[0]);
        }
        for (var part; parts.length && (part = parts.shift());) {
            if (!parts.length && goog$isDef(object)) {
                cur[part] = object;
            } else {
                cur = cur[part] ? cur[part] : (cur[part] = {});
            }
        }
    };
    var goog$inherits = function (childCtor, parentCtor) {
        function c() {}
        c.prototype = parentCtor.prototype;
        childCtor.superClass_ = parentCtor.prototype;
        childCtor.prototype = new c();
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
    var goog$debug$Error = function (opt_msg) {
        this.stack = Error().stack || "";
        if (opt_msg) {
            this.message = "" + opt_msg;
        }
    };
    goog$inherits(goog$debug$Error, Error);
    goog$debug$Error.prototype.name = "CustomError";
    var goog$string$subs = function (str, var_args) {
        for (var c = 1; c < arguments.length; c++) {
            var d = ("" + arguments[c]).replace(/\$/g, "$$$$");
            var str = str.replace(/\%s/, d);
        }
        return str;
    };
    var goog$string$isEmpty = function (str) {
        return /^[\s\xa0]*$/.test(str);
    };
    var goog$string$trim = function (str) {
        return str.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
    };
    var goog$string$encodeUriRegExp_ = /^[a-zA-Z0-9\-_.!~*'()]*$/;
    var goog$string$urlEncode = function (str) {
        str = "" + str;
        if (!goog$string$encodeUriRegExp_.test(str)) {
            return encodeURIComponent(str);
        } else {
            return str;
        }
    };
    var goog$string$htmlEscape = function (str) {
        if (!goog$string$allRe_.test(str)) {
            return str;
        }
        if (str.indexOf("&") != -1) {
            str = str.replace(goog$string$amperRe_, "&amp;");
        }
        if (str.indexOf("<") != -1) {
            str = str.replace(goog$string$ltRe_, "&lt;");
        }
        if (str.indexOf(">") != -1) {
            str = str.replace(goog$string$gtRe_, "&gt;");
        }
        if (str.indexOf('"') != -1) {
            str = str.replace(goog$string$quotRe_, "&quot;");
        }
        return str;
    };
    var goog$string$amperRe_ = /&/g;
    var goog$string$ltRe_ = /</g;
    var goog$string$gtRe_ = />/g;
    var goog$string$quotRe_ = /\"/g;
    var goog$string$allRe_ = /[&<>\"]/;
    var goog$string$unescapeEntities = function (str) {
        if (str.indexOf("&") != -1) {
            if ("document" in goog$global) {
                return goog$string$unescapeEntitiesUsingDom_(str);
            } else {
                return goog$string$unescapePureXmlEntities_(str);
            }
        } else {
            return str;
        }
    };
    var goog$string$unescapeEntitiesUsingDom_ = function (str) {
        var b = {
            "&amp;": "&",
            "&lt;": "<",
            "&gt;": ">",
            "&quot;": '"'
        };
        var c = document.createElement("div");
        return str.replace(goog$string$HTML_ENTITY_PATTERN_, function (entity, entityName) {
            var value = b[entity];
            if (value) {
                return value;
            }
            if (entityName.charAt(0) == "#") {
                var code = Number("0" + entityName.substr(1));
                if (!isNaN(code)) {
                    value = String.fromCharCode(code);
                }
            }
            if (!value) {
                c.innerHTML = entity + " ";
                value = c.firstChild.nodeValue.slice(0, -1);
            }
            return (b[entity] = value);
        });
    };
    var goog$string$unescapePureXmlEntities_ = function (str) {
        return str.replace(/&([^;]+);/g, function (entity, entityName) {
            switch (entityName) {
                case "amp":
                    return "&";
                case "lt":
                    return "<";
                case "gt":
                    return ">";
                case "quot":
                    return '"';
                default:
                    if (entityName.charAt(0) == "#") {
                        var code = Number("0" + entityName.substr(1));
                        if (!isNaN(code)) {
                            return String.fromCharCode(code);
                        }
                    }
                    return entity;
            }
        });
    };
    var goog$string$HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
    var goog$string$truncate = function (str, chars) {
        if (str.length > chars) {
            str = str.substring(0, chars - 3) + "...";
        }
        return str;
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
    var goog$string$escapeString = function (str) {
        var b = [];
        for (var c = 0; c < str.length; c++) {
            var d = b;
            var e = c;
            var f;
            f = str.charAt(c);
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
    var goog$string$compareVersions = function (version1, version2) {
        for (
            var c = 0,
                d = goog$string$trim("" + version1).split("."),
                e = goog$string$trim("" + version2).split("."),
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
    var goog$string$hashCode = function (str) {
        var b = 0;
        for (var c = 0; c < str.length; ++c) {
            b = b * 31 + str.charCodeAt(c);
            b %= 4294967296;
        }
        return b;
    };
    var goog$string$toCamelCaseCache_ = {};
    var goog$string$toCamelCase = function (str) {
        return (
            goog$string$toCamelCaseCache_[str] ||
            (goog$string$toCamelCaseCache_[str] = ("" + str).replace(/\-([a-z])/g, function (all, match) {
                return match.toUpperCase();
            }))
        );
    };
    var goog$asserts$AssertionError = function (messagePattern, messageArgs) {
        messageArgs.unshift(messagePattern);
        goog$debug$Error.call(this, goog$string$subs.apply(null, messageArgs));
        messageArgs.shift();
    };
    goog$inherits(goog$asserts$AssertionError, goog$debug$Error);
    goog$asserts$AssertionError.prototype.name = "AssertionError";
    var goog$asserts$doAssertFailure_ = function (defaultMessage, defaultArgs, givenMessage, givenArgs) {
        var e = "Assertion failed";
        if (givenMessage) {
            var e = e + (": " + givenMessage);
            var f = givenArgs;
        } else if (defaultMessage) {
            e += ": " + defaultMessage;
            f = defaultArgs;
        }
        throw new goog$asserts$AssertionError("" + e, f || []);
    };
    var goog$asserts$assert = function (condition, opt_message, var_args) {
        if (!condition) {
            goog$asserts$doAssertFailure_("", null, opt_message, Array.prototype.slice.call(arguments, 2));
        }
    };
    var goog$asserts$fail = function (opt_message, var_args) {
        throw new goog$asserts$AssertionError(
            "Failure" + (opt_message ? ": " + opt_message : ""),
            Array.prototype.slice.call(arguments, 1)
        );
    };
    var goog$asserts$assertString = function (value, opt_message, var_args) {
        if (!goog$isString(value)) {
            goog$asserts$doAssertFailure_(
                "Expected string but got %s: %s.",
                [goog$typeOf(value), value],
                opt_message,
                Array.prototype.slice.call(arguments, 2)
            );
        }
        return value;
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
    var goog$array$find = function (arr, f) {
        var index = goog$array$findIndex(arr, f, undefined);
        if (index < 0) {
            return null;
        } else if (goog$isString(arr)) {
            return arr.charAt(index);
        } else {
            return arr[index];
        }
    };
    var goog$array$findIndex = function (arr, pred, opt_obj) {
        for (var d = arr.length, e = goog$isString(arr) ? arr.split("") : arr, f = 0; f < d; f++) {
            if (f in e && pred.call(opt_obj, e[f], f, arr)) {
                return f;
            }
        }
        return -1;
    };
    var goog$array$findIndexRight = function (arr, f) {
        var arr2 = goog$isString(arr) ? arr.split("") : arr;
        for (var i = arr.length - 1; i >= 0; i--) {
            if (i in arr2 && f.call(undefined, arr2[i], i, arr)) {
                return i;
            }
        }
        return -1;
    };
    var goog$array$contains = function (arr, obj) {
        return goog$array$indexOf(arr, obj) >= 0;
    };
    var goog$array$clear = function (arr) {
        if (!goog$isArray(arr)) {
            for (var b = arr.length - 1; b >= 0; b--) {
                delete arr[b];
            }
        }
        arr.length = 0;
    };
    var goog$array$removeAt = function (arr, i) {
        goog$asserts$assert(arr.length != null);
        goog$array$ARRAY_PROTOTYPE_.splice.call(arr, i, 1);
    };
    var goog$array$concat = function (var_args) {
        return goog$array$ARRAY_PROTOTYPE_.concat.apply(goog$array$ARRAY_PROTOTYPE_, arguments);
    };
    var goog$array$toArray = function (object) {
        if (goog$isArray(object)) {
            return goog$array$concat(object);
        }
        var b = [];
        for (var c = 0, d = object.length; c < d; c++) {
            b[c] = object[c];
        }
        return b;
    };
    var goog$array$clone = function (arr) {
        if (goog$isArray(arr)) {
            return goog$array$concat(arr);
        } else {
            return goog$array$toArray(arr);
        }
    };
    var goog$array$extend = function (arr1, var_args) {
        for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            var e;
            if (goog$isArray(d) || ((e = goog$isArrayLike(d)) && d.hasOwnProperty("callee"))) {
                arr1.push.apply(arr1, d);
            } else if (e) {
                var f = arr1.length;
                for (var g = d.length, j = 0; j < g; j++) {
                    arr1[f + j] = d[j];
                }
            } else {
                arr1.push(d);
            }
        }
    };
    var goog$array$splice = function (arr, index, howMany, var_args) {
        goog$asserts$assert(arr.length != null);
        goog$array$ARRAY_PROTOTYPE_.splice.apply(arr, goog$array$slice(arguments, 1));
    };
    var goog$array$slice = function (arr, start, opt_end) {
        goog$asserts$assert(arr.length != null);
        if (arguments.length <= 2) {
            return goog$array$ARRAY_PROTOTYPE_.slice.call(arr, start);
        } else {
            return goog$array$ARRAY_PROTOTYPE_.slice.call(arr, start, opt_end);
        }
    };
    var goog$array$sort = function (arr, opt_compareFn) {
        goog$asserts$assert(arr.length != null);
        goog$array$ARRAY_PROTOTYPE_.sort.call(arr, opt_compareFn || goog$array$defaultCompare);
    };
    var goog$array$sortObjectsByKey = function (arr) {
        var compare = goog$array$defaultCompare;
        goog$array$sort(arr, function (obj1, obj2) {
            return compare(obj1.key, obj2.key);
        });
    };
    var goog$array$defaultCompare = function (a1, b1) {
        if (a1 > b1) {
            return 1;
        } else if (a1 < b1) {
            return -1;
        } else {
            return 0;
        }
    };
    var goog$dom$defaultDomHelper_;
    var goog$dom$classes$get = function (element) {
        element = element.className;
        return (goog$isString(element) && element.match(/\S+/g)) || [];
    };
    var goog$dom$classes$add = function (element, var_args) {
        var c = goog$dom$classes$get(element);
        var d = goog$array$slice(arguments, 1);
        var e = c.length + d.length;
        goog$dom$classes$add_(c, d);
        element.className = c.join(" ");
        return c.length == e;
    };
    var goog$dom$classes$remove = function (element, var_args) {
        var c = goog$dom$classes$get(element);
        var d = goog$array$slice(arguments, 1);
        var e = goog$dom$classes$getDifference_(c, d);
        element.className = e.join(" ");
        return e.length == c.length - d.length;
    };
    var goog$dom$classes$add_ = function (classes, args) {
        for (var c = 0; c < args.length; c++) {
            if (!goog$array$contains(classes, args[c])) {
                classes.push(args[c]);
            }
        }
    };
    var goog$dom$classes$getDifference_ = function (arr1, arr2) {
        return goog$array$filter(arr1, function (item) {
            return !goog$array$contains(arr2, item);
        });
    };
    var goog$dom$classes$swap = function (element, fromClass, toClass) {
        for (var d = goog$dom$classes$get(element), e = false, f = 0; f < d.length; f++) {
            if (d[f] == fromClass) {
                goog$array$splice(d, f--, 1);
                e = true;
            }
        }
        if (e) {
            d.push(toClass);
            element.className = d.join(" ");
        }
    };
    var goog$dom$classes$addRemove = function (element, classesToRemove, classesToAdd) {
        var d = goog$dom$classes$get(element);
        if (goog$isString(classesToRemove)) {
            var e = d;
            var classesToRemove = goog$array$indexOf(e, classesToRemove);
            if (classesToRemove >= 0) {
                goog$array$removeAt(e, classesToRemove);
            }
        } else if (goog$isArray(classesToRemove)) {
            d = goog$dom$classes$getDifference_(d, classesToRemove);
        }
        if (goog$isString(classesToAdd) && !goog$array$contains(d, classesToAdd)) {
            d.push(classesToAdd);
        } else if (goog$isArray(classesToAdd)) {
            goog$dom$classes$add_(d, classesToAdd);
        }
        element.className = d.join(" ");
    };
    var goog$dom$classes$has = function (element, className) {
        return goog$array$contains(goog$dom$classes$get(element), className);
    };
    var goog$dom$classes$enable = function (element, className, enabled) {
        if (enabled) {
            goog$dom$classes$add(element, className);
        } else {
            goog$dom$classes$remove(element, className);
        }
    };
    var goog$dom$classes$toggle = function (element, className) {
        var c = !goog$dom$classes$has(element, className);
        goog$dom$classes$enable(element, className, c);
        return c;
    };
    var goog$math$Coordinate = function (opt_x, opt_y) {
        this.x = goog$isDef(opt_x) ? opt_x : 0;
        this.y = goog$isDef(opt_y) ? opt_y : 0;
    };
    goog$math$Coordinate.prototype.clone = function () {
        return new goog$math$Coordinate(this.x, this.y);
    };
    goog$math$Coordinate.prototype.toString = function () {
        return "(" + this.x + ", " + this.y + ")";
    };
    var goog$math$Coordinate$difference = function (a1, b1) {
        return new goog$math$Coordinate(a1.x - b1.x, a1.y - b1.y);
    };
    var goog$math$Size = function (width, height) {
        this.width = width;
        this.height = height;
    };
    goog$math$Size.prototype.clone = function () {
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
    goog$math$Size.prototype.scale = function (s) {
        this.width *= s;
        this.height *= s;
        return this;
    };
    var goog$object$forEach = function (obj, f) {
        for (var key in obj) {
            f.call(undefined, obj[key], key, obj);
        }
    };
    var goog$object$getAnyValue = function (obj) {
        for (var b in obj) {
            return obj[b];
        }
    };
    var goog$object$getKeys = function (obj) {
        var b = [];
        var c = 0;
        var d;
        for (d in obj) {
            b[c++] = d;
        }
        return b;
    };
    var goog$object$findKey = function (obj, f, opt_this) {
        for (var d in obj) {
            if (f.call(opt_this, obj[d], d, obj)) {
                return d;
            }
        }
    };
    var goog$object$findValue = function (obj, f) {
        var key = goog$object$findKey(obj, f, undefined);
        return key && obj[key];
    };
    var goog$object$clone = function (obj) {
        var b = {};
        var c;
        for (c in obj) {
            b[c] = obj[c];
        }
        return b;
    };
    var goog$object$PROTOTYPE_FIELDS_ =
        "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
    var goog$object$extend = function (target, var_args) {
        var c;
        var d;
        for (var e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d) {
                target[c] = d[c];
            }
            for (var f = 0; f < goog$object$PROTOTYPE_FIELDS_.length; f++) {
                c = goog$object$PROTOTYPE_FIELDS_[f];
                if (Object.prototype.hasOwnProperty.call(d, c)) {
                    target[c] = d[c];
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
    var goog$userAgent$isVersion = function (version) {
        return (
            goog$userAgent$isVersionCache_[version] ||
            (goog$userAgent$isVersionCache_[version] =
                goog$string$compareVersions(goog$userAgent$VERSION, version) >= 0)
        );
    };
    var goog$userAgent$isDocumentModeCache_ = {};
    var goog$userAgent$isDocumentMode = function (documentMode) {
        return (
            goog$userAgent$isDocumentModeCache_[documentMode] ||
            (goog$userAgent$isDocumentModeCache_[documentMode] =
                goog$userAgent$IE && !!document.documentMode && document.documentMode >= documentMode)
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
    var goog$dom$getDomHelper = function (opt_element) {
        if (opt_element) {
            return new goog$dom$DomHelper(goog$dom$getOwnerDocument(opt_element));
        } else {
            return goog$dom$defaultDomHelper_ || (goog$dom$defaultDomHelper_ = new goog$dom$DomHelper());
        }
    };
    var goog$dom$getElement = function (element) {
        if (goog$isString(element)) {
            return document.getElementById(element);
        } else {
            return element;
        }
    };
    var goog$dom$getElementsByClass = function (className, opt_el) {
        var c = opt_el || document;
        if (goog$dom$canUseQuerySelector_(c)) {
            return c.querySelectorAll("." + className);
        } else if (c.getElementsByClassName) {
            return c.getElementsByClassName(className);
        } else {
            return goog$dom$getElementsByTagNameAndClass("*", className, opt_el);
        }
    };
    var goog$dom$getElementByClass = function (className, opt_el) {
        var c = opt_el || document;
        var d = null;
        return (
            (d = goog$dom$canUseQuerySelector_(c)
                ? c.querySelector("." + className)
                : goog$dom$getElementsByClass(className, opt_el)[0]) || null
        );
    };
    var goog$dom$canUseQuerySelector_ = function (parent) {
        return (
            parent.querySelectorAll &&
            parent.querySelector &&
            (!goog$userAgent$WEBKIT || goog$dom$isCss1CompatMode_(document) || goog$userAgent$isVersion("528"))
        );
    };
    var goog$dom$getElementsByTagNameAndClass = function (opt_tag, opt_class, opt_el) {
        opt_el = opt_el || document;
        opt_tag = opt_tag && opt_tag != "*" ? opt_tag.toUpperCase() : "";
        if (goog$dom$canUseQuerySelector_(opt_el) && (opt_tag || opt_class)) {
            return opt_el.querySelectorAll(opt_tag + (opt_class ? "." + opt_class : ""));
        }
        if (opt_class && opt_el.getElementsByClassName) {
            opt_el = opt_el.getElementsByClassName(opt_class);
            if (opt_tag) {
                var d = {};
                var e = 0;
                for (var f = 0, g; (g = opt_el[f]); f++) {
                    if (opt_tag == g.nodeName) {
                        d[e++] = g;
                    }
                }
                d.length = e;
                return d;
            }
            return opt_el;
        }
        opt_el = opt_el.getElementsByTagName(opt_tag || "*");
        if (opt_class) {
            d = {};
            for (f = e = 0; (g = opt_el[f]); f++) {
                opt_tag = g.className;
                if (typeof opt_tag.split == "function" && goog$array$contains(opt_tag.split(/\s+/), opt_class)) {
                    d[e++] = g;
                }
            }
            d.length = e;
            return d;
        }
        return opt_el;
    };
    var goog$dom$setProperties = function (element, properties) {
        goog$object$forEach(properties, function (val, key) {
            if (key == "style") {
                element.style.cssText = val;
            } else if (key == "class") {
                element.className = val;
            } else if (key == "for") {
                element.htmlFor = val;
            } else if (key in goog$dom$DIRECT_ATTRIBUTE_MAP_) {
                element.setAttribute(goog$dom$DIRECT_ATTRIBUTE_MAP_[key], val);
            } else if (key.lastIndexOf("aria-", 0) == 0) {
                element.setAttribute(key, val);
            } else {
                element[key] = val;
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
    var goog$dom$getViewportSize_ = function (win) {
        var b = win.document;
        if (goog$userAgent$WEBKIT && !goog$userAgent$isVersion("500") && !goog$userAgent$MOBILE) {
            if (typeof win.innerHeight == "undefined") {
                win = window;
            }
            var b = win.innerHeight;
            var c = win.document.documentElement.scrollHeight;
            if (win == win.top && c < b) {
                b -= 15;
            }
            return new goog$math$Size(win.innerWidth, b);
        }
        win = goog$dom$isCss1CompatMode_(b) ? b.documentElement : b.body;
        return new goog$math$Size(win.clientWidth, win.clientHeight);
    };
    var goog$dom$getDocumentHeight = function () {
        var win = window;
        var doc = win.document;
        var height = 0;
        if (doc) {
            var win = goog$dom$getViewportSize_(win).height;
            var height = doc.body;
            var docEl = doc.documentElement;
            if (goog$dom$isCss1CompatMode_(doc) && docEl.scrollHeight) {
                height = docEl.scrollHeight != win ? docEl.scrollHeight : docEl.offsetHeight;
            } else {
                var doc = docEl.scrollHeight;
                var offsetHeight = docEl.offsetHeight;
                if (docEl.clientHeight != offsetHeight) {
                    doc = height.scrollHeight;
                    offsetHeight = height.offsetHeight;
                }
                height =
                    doc > win ? (doc > offsetHeight ? doc : offsetHeight) : doc < offsetHeight ? doc : offsetHeight;
            }
        }
        return height;
    };
    var goog$dom$getDocumentScroll_ = function (doc) {
        var b = !goog$userAgent$WEBKIT && goog$dom$isCss1CompatMode_(doc) ? doc.documentElement : doc.body;
        var doc = doc.parentWindow || doc.defaultView;
        return new goog$math$Coordinate(doc.pageXOffset || b.scrollLeft, doc.pageYOffset || b.scrollTop);
    };
    var goog$dom$createDom = function (tagName, opt_attributes, var_args) {
        return goog$dom$createDom_(document, arguments);
    };
    var goog$dom$createDom_ = function (doc, args) {
        var c = args[0];
        var d = args[1];
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
        c = doc.createElement(c);
        if (d) {
            if (goog$isString(d)) {
                c.className = d;
            } else if (goog$isArray(d)) {
                goog$dom$classes$add.apply(null, [c].concat(d));
            } else {
                goog$dom$setProperties(c, d);
            }
        }
        if (args.length > 2) {
            goog$dom$append_(doc, c, args, 2);
        }
        return c;
    };
    var goog$dom$append_ = function (doc, parent, args, startIndex) {
        function e(child) {
            if (child) {
                parent.appendChild(goog$isString(child) ? doc.createTextNode(child) : child);
            }
        }
        for (; startIndex < args.length; startIndex++) {
            var f = args[startIndex];
            if (goog$isArrayLike(f) && (!goog$isObject(f) || !(f.nodeType > 0))) {
                goog$array$forEach(goog$dom$isNodeList(f) ? goog$array$toArray(f) : f, e);
            } else {
                e(f);
            }
        }
    };
    var goog$dom$createTextNode = function (content) {
        return document.createTextNode(content);
    };
    var goog$dom$htmlToDocumentFragment = function (htmlString) {
        var b = document;
        var c = b.createElement("div");
        if (goog$userAgent$IE) {
            c.innerHTML = "<br>" + htmlString;
            c.removeChild(c.firstChild);
        } else {
            c.innerHTML = htmlString;
        }
        if (c.childNodes.length == 1) {
            return c.removeChild(c.firstChild);
        }
        for (htmlString = b.createDocumentFragment(); c.firstChild;) {
            htmlString.appendChild(c.firstChild);
        }
        return htmlString;
    };
    var goog$dom$isCss1CompatMode_ = function (doc) {
        return doc.compatMode == "CSS1Compat";
    };
    var goog$dom$append = function (parent, var_args) {
        goog$dom$append_(goog$dom$getOwnerDocument(parent), parent, arguments, 1);
    };
    var goog$dom$removeChildren = function (node) {
        for (var b; (b = node.firstChild);) {
            node.removeChild(b);
        }
    };
    var goog$dom$removeNode = function (node) {
        if (node && node.parentNode) {
            node.parentNode.removeChild(node);
        }
    };
    var goog$dom$getFirstElementChild = function (node) {
        if (node.firstElementChild != undefined) {
            return node.firstElementChild;
        } else {
            return goog$dom$getNextElementNode_(node.firstChild);
        }
    };
    var goog$dom$getNextElementNode_ = function (node) {
        while (node && node.nodeType != 1) {
            node = node.nextSibling;
        }
        return node;
    };
    var goog$dom$contains = function (parent, descendant) {
        if (parent.contains && descendant.nodeType == 1) {
            return parent == descendant || parent.contains(descendant);
        }
        if (typeof parent.compareDocumentPosition != "undefined") {
            return parent == descendant || Boolean(parent.compareDocumentPosition(descendant) & 16);
        }
        while (descendant && parent != descendant) {
            descendant = descendant.parentNode;
        }
        return descendant == parent;
    };
    var goog$dom$getOwnerDocument = function (node) {
        if (node.nodeType == 9) {
            return node;
        } else {
            return node.ownerDocument || node.document;
        }
    };
    var goog$dom$setTextContent = function (element, text) {
        if ("textContent" in element) {
            element.textContent = text;
        } else if (element.firstChild && element.firstChild.nodeType == 3) {
            while (element.lastChild != element.firstChild) {
                element.removeChild(element.lastChild);
            }
            element.firstChild.data = text;
        } else {
            goog$dom$removeChildren(element);
            element.appendChild(goog$dom$getOwnerDocument(element).createTextNode(text));
        }
    };
    var goog$dom$findNode = function (root, p) {
        var c = [];
        if (goog$dom$findNodes_(root, p, c, true)) {
            return c[0];
        } else {
            return undefined;
        }
    };
    var goog$dom$findNodes_ = function (root, p, rv, findOne) {
        if (root != null) {
            for (root = root.firstChild; root;) {
                if ((p(root) && (rv.push(root), findOne)) || goog$dom$findNodes_(root, p, rv, findOne)) {
                    return true;
                }
                root = root.nextSibling;
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
    var goog$dom$getTextContent = function (node) {
        if (goog$dom$BrowserFeature$CAN_USE_INNER_TEXT && "innerText" in node) {
            node = node.innerText.replace(/(\r\n|\r|\n)/g, "\n");
        } else {
            var b = [];
            goog$dom$getTextContent_(node, b, true);
            node = b.join("");
        }
        node = node.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
        node = node.replace(/\u200B/g, "");
        if (!goog$dom$BrowserFeature$CAN_USE_INNER_TEXT) {
            node = node.replace(/ +/g, " ");
        }
        if (node != " ") {
            node = node.replace(/^\s*/, "");
        }
        return node;
    };
    var goog$dom$getTextContent_ = function (node, buf, normalizeWhitespace) {
        if (!(node.nodeName in goog$dom$TAGS_TO_IGNORE_)) {
            if (node.nodeType == 3) {
                if (normalizeWhitespace) {
                    buf.push(("" + node.nodeValue).replace(/(\r\n|\r|\n)/g, ""));
                } else {
                    buf.push(node.nodeValue);
                }
            } else if (node.nodeName in goog$dom$PREDEFINED_TAG_VALUES_) {
                buf.push(goog$dom$PREDEFINED_TAG_VALUES_[node.nodeName]);
            } else {
                for (node = node.firstChild; node;) {
                    goog$dom$getTextContent_(node, buf, normalizeWhitespace);
                    node = node.nextSibling;
                }
            }
        }
    };
    var goog$dom$isNodeList = function (val) {
        if (val && typeof val.length == "number") {
            if (goog$isObject(val)) {
                return typeof val.item == "function" || typeof val.item == "string";
            }
            if (goog$typeOf(val) == "function") {
                return typeof val.item == "function";
            }
        }
        return false;
    };
    var goog$dom$getAncestorByTagNameAndClass = function (element, opt_tag, opt_class) {
        var d = opt_tag ? opt_tag.toUpperCase() : null;
        return goog$dom$getAncestor(
            element,
            function (node) {
                return (!d || node.nodeName == d) && (!opt_class || goog$dom$classes$has(node, opt_class));
            },
            true
        );
    };
    var goog$dom$getAncestor = function (element, matcher, opt_includeNode, opt_maxSearchSteps) {
        if (!opt_includeNode) {
            element = element.parentNode;
        }
        for (
            var opt_includeNode = opt_maxSearchSteps == null, e = 0;
            element && (opt_includeNode || e <= opt_maxSearchSteps);
        ) {
            if (matcher(element)) {
                return element;
            }
            element = element.parentNode;
            e++;
        }
        return null;
    };
    var goog$dom$DomHelper = function (opt_document) {
        this.document_ = opt_document || goog$global.document || document;
    };
    goog$dom$DomHelper.prototype.createDom = function (tagName, opt_attributes, var_args) {
        return goog$dom$createDom_(this.document_, arguments);
    };
    goog$dom$DomHelper.prototype.createElement = function (name) {
        return this.document_.createElement(name);
    };
    goog$dom$DomHelper.prototype.createTextNode = function (content) {
        return this.document_.createTextNode(content);
    };
    var goog$dom$DomHelper$isCss1CompatMode = function (self) {
        return goog$dom$isCss1CompatMode_(self.document_);
    };
    var goog$dom$DomHelper$getDocumentScroll = function (self) {
        return goog$dom$getDocumentScroll_(self.document_);
    };
    goog$dom$DomHelper.prototype.appendChild = function (parent, child) {
        parent.appendChild(child);
    };
    goog$dom$DomHelper.prototype.append = goog$dom$append;
    goog$dom$DomHelper.prototype.contains = goog$dom$contains;
    var goog$iter$StopIteration = "StopIteration" in goog$global ? goog$global.StopIteration : Error("StopIteration");
    var goog$iter$Iterator = function () {};
    goog$iter$Iterator.prototype.next = function () {
        throw goog$iter$StopIteration;
    };
    goog$iter$Iterator.prototype.__iterator__ = function () {
        return this;
    };
    var goog$iter$toIterator = function (iterable) {
        if (iterable instanceof goog$iter$Iterator) {
            return iterable;
        }
        if (typeof iterable.__iterator__ == "function") {
            return iterable.__iterator__(false);
        }
        if (goog$isArrayLike(iterable)) {
            var b = 0;
            var c = new goog$iter$Iterator();
            c.next = function () {
                while (true) {
                    if (b >= iterable.length) {
                        throw goog$iter$StopIteration;
                    }
                    if (b in iterable) {
                        return iterable[b++];
                    }
                    b++;
                }
            };
            return c;
        }
        throw Error("Not implemented");
    };
    var goog$iter$forEach = function (iterable, f) {
        if (goog$isArrayLike(iterable)) {
            try {
                goog$array$forEach(iterable, f, undefined);
            } catch (c) {
                if (c !== goog$iter$StopIteration) {
                    throw c;
                }
            }
        } else {
            iterable = goog$iter$toIterator(iterable);
            try {
                while (true) {
                    f.call(undefined, iterable.next(), undefined, iterable);
                }
            } catch (d) {
                if (d !== goog$iter$StopIteration) {
                    throw d;
                }
            }
        }
    };
    var goog$iter$toArray = function (iterable) {
        if (goog$isArrayLike(iterable)) {
            return goog$array$clone(iterable);
        }
        var iterable = goog$iter$toIterator(iterable);
        var b = [];
        goog$iter$forEach(iterable, function (val) {
            b.push(val);
        });
        return b;
    };
    var goog$structs$Map = function (opt_map, var_args) {
        this.map_ = {};
        this.keys_ = [];
        var c = arguments.length;
        if (c > 1) {
            if (c % 2) {
                throw Error("Uneven number of arguments");
            }
            for (var d = 0; d < c; d += 2) {
                this.set(arguments[d], arguments[d + 1]);
            }
        } else if (opt_map) {
            if (opt_map instanceof goog$structs$Map) {
                c = opt_map.getKeys();
                d = opt_map.getValues();
            } else {
                var c = goog$object$getKeys(opt_map);
                var e = [];
                var f = 0;
                for (d in opt_map) {
                    e[f++] = opt_map[d];
                }
                d = e;
            }
            for (e = 0; e < c.length; e++) {
                this.set(c[e], d[e]);
            }
        }
    };
    goog$structs$Map.prototype.count_ = 0;
    goog$structs$Map.prototype.version_ = 0;
    goog$structs$Map.prototype.getCount = function () {
        return this.count_;
    };
    goog$structs$Map.prototype.getValues = function () {
        goog$structs$Map$cleanupKeysArray_(this);
        var rv = [];
        for (var i = 0; i < this.keys_.length; i++) {
            rv.push(this.map_[this.keys_[i]]);
        }
        return rv;
    };
    goog$structs$Map.prototype.getKeys = function () {
        goog$structs$Map$cleanupKeysArray_(this);
        return this.keys_.concat();
    };
    goog$structs$Map.prototype.containsKey = function (key) {
        return goog$structs$Map$hasKey_(this.map_, key);
    };
    goog$structs$Map.prototype.clear = function () {
        this.map_ = {};
        this.version_ = this.count_ = this.keys_.length = 0;
    };
    goog$structs$Map.prototype.remove = function (key) {
        if (goog$structs$Map$hasKey_(this.map_, key)) {
            delete this.map_[key];
            this.count_--;
            this.version_++;
            if (this.keys_.length > this.count_ * 2) {
                goog$structs$Map$cleanupKeysArray_(this);
            }
            return true;
        } else {
            return false;
        }
    };
    var goog$structs$Map$cleanupKeysArray_ = function (self) {
        if (self.count_ != self.keys_.length) {
            for (var b = 0, c = 0; b < self.keys_.length;) {
                var d = self.keys_[b];
                if (goog$structs$Map$hasKey_(self.map_, d)) {
                    self.keys_[c++] = d;
                }
                b++;
            }
            self.keys_.length = c;
        }
        if (self.count_ != self.keys_.length) {
            var e = {};
            var c = (b = 0);
            for (; b < self.keys_.length;) {
                d = self.keys_[b];
                if (!goog$structs$Map$hasKey_(e, d)) {
                    self.keys_[c++] = d;
                    e[d] = 1;
                }
                b++;
            }
            self.keys_.length = c;
        }
    };
    goog$structs$Map.prototype.get = function (key, opt_val) {
        if (goog$structs$Map$hasKey_(this.map_, key)) {
            return this.map_[key];
        } else {
            return opt_val;
        }
    };
    goog$structs$Map.prototype.set = function (key, value) {
        if (!goog$structs$Map$hasKey_(this.map_, key)) {
            this.count_++;
            this.keys_.push(key);
            this.version_++;
        }
        this.map_[key] = value;
    };
    goog$structs$Map.prototype.clone = function () {
        return new goog$structs$Map(this);
    };
    var goog$structs$Map$toObject = function (self) {
        goog$structs$Map$cleanupKeysArray_(self);
        var b = {};
        for (var c = 0; c < self.keys_.length; c++) {
            var d = self.keys_[c];
            b[d] = self.map_[d];
        }
        return b;
    };
    goog$structs$Map.prototype.__iterator__ = function (opt_keys) {
        goog$structs$Map$cleanupKeysArray_(this);
        var b = 0;
        var c = this.keys_;
        var d = this.map_;
        var e = this.version_;
        var f = this;
        var g = new goog$iter$Iterator();
        g.next = function () {
            while (true) {
                if (e != f.version_) {
                    throw Error("The map has changed since the iterator was created");
                }
                if (b >= c.length) {
                    throw goog$iter$StopIteration;
                }
                var key = c[b++];
                if (opt_keys) {
                    return key;
                } else {
                    return d[key];
                }
            }
        };
        return g;
    };
    var goog$structs$Map$hasKey_ = function (obj, key) {
        return Object.prototype.hasOwnProperty.call(obj, key);
    };
    var goog$dom$forms$getFormDataMap = function (form) {
        var b = new goog$structs$Map();
        goog$dom$forms$getFormDataHelper_(form, b, goog$dom$forms$addFormDataToMap_);
        return b;
    };
    var goog$dom$forms$getFormDataString = function (form) {
        var b = [];
        goog$dom$forms$getFormDataHelper_(form, b, goog$dom$forms$addFormDataToStringBuffer_);
        return b.join("&");
    };
    var goog$dom$forms$getFormDataHelper_ = function (form, result, fnAppend) {
        for (var d = form.elements, e, f = 0; (e = d[f]); f++) {
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
                                fnAppend(result, g, j);
                            }
                        }
                        break;
                    default:
                        j = goog$dom$forms$getValue(e);
                        if (j != null) {
                            fnAppend(result, g, j);
                        }
                }
            }
        }
        d = form.getElementsByTagName("input");
        for (f = 0; (e = d[f]); f++) {
            if (e.form == form && e.type.toLowerCase() == "image") {
                g = e.name;
                fnAppend(result, g, e.value);
                fnAppend(result, g + ".x", "0");
                fnAppend(result, g + ".y", "0");
            }
        }
    };
    var goog$dom$forms$addFormDataToMap_ = function (map, name, value) {
        var d = map.get(name);
        if (!d) {
            d = [];
            map.set(name, d);
        }
        d.push(value);
    };
    var goog$dom$forms$addFormDataToStringBuffer_ = function (sb, name, value) {
        sb.push(encodeURIComponent(name) + "=" + encodeURIComponent(value));
    };
    var goog$dom$forms$getValue = function (el) {
        var b = el.type;
        if (!goog$isDef(b)) {
            return null;
        }
        switch (b.toLowerCase()) {
            case "checkbox":
            case "radio":
                if (el.checked) {
                    return el.value;
                } else {
                    return null;
                }
            case "select-one":
                b = el.selectedIndex;
                if (b >= 0) {
                    return el.options[b].value;
                } else {
                    return null;
                }
            case "select-multiple":
                var b = [];
                for (var c, d = 0; (c = el.options[d]); d++) {
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
                if (goog$isDef(el.value)) {
                    return el.value;
                } else {
                    return null;
                }
        }
    };
    var goog$dom$forms$getValueByName_isPrivate = function (form) {
        form = form.elements.is_private;
        if (form.type) {
            return goog$dom$forms$getValue(form);
        }
        for (var i = 0; i < form.length; i++) {
            var value = goog$dom$forms$getValue(form[i]);
            if (value) {
                return value;
            }
        }
        return null;
    };
    var goog$i18n$bidi$htmlSkipReg_ = /<[^>]*>|&[^;]+;/g;
    var goog$i18n$bidi$ltrDirCheckRe_ = RegExp("^[^֑-߿יִ-﷿ﹰ-ﻼ]*[A-Za-zÀ-ÖØ-öø-ʸ̀-֐ࠀ-῿Ⰰ-﬜︀-﹯﻽-￿]");
    var goog$i18n$bidi$rtlDirCheckRe_ = RegExp("^[^A-Za-zÀ-ÖØ-öø-ʸ̀-֐ࠀ-῿Ⰰ-﬜︀-﹯﻽-￿]*[֑-߿יִ-﷿ﹰ-ﻼ]");
    var goog$i18n$bidi$isRtlText = function (str, isHtml) {
        return goog$i18n$bidi$rtlDirCheckRe_.test(isHtml ? str.replace(goog$i18n$bidi$htmlSkipReg_, " ") : str);
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
    var yt$setConfig = function (keyOrMap) {
        yt$setConfigValues_(yt$config_, arguments);
    };
    var yt$getConfig = function (key, defaultValue) {
        if (key in yt$config_) {
            return yt$config_[key];
        } else {
            return defaultValue;
        }
    };
    var yt$registerGlobal = function (name) {
        for (var i = 0, n = arguments.length; i < n; ++i) {
            yt$globals_[arguments[i]] = 1;
        }
    };
    var yt$setTimeout = function (fn, delay) {
        var id = window.setTimeout(fn, delay);
        yt$timeouts_.push(id);
        return id;
    };
    var yt$setInterval = function (fn, delay) {
        var id = window.setInterval(fn, delay);
        yt$intervals_.push(id);
        return id;
    };
    var yt$clearTimeout = function (id) {
        window.clearTimeout(id);
    };
    var yt$clearInterval = function (id) {
        window.clearInterval(id);
    };
    var yt$getMsg = function (key, params, defaultMsg) {
        var values = params || {};
        if ((key = key in yt$msgs_ ? yt$msgs_[key] : defaultMsg)) {
            for (var param in values) {
                key = key.replace(RegExp("\\$" + param, "gi"), function () {
                    return values[param];
                });
            }
        }
        return key;
    };
    var yt$setConfigValues_ = function (target, args) {
        if (args.length > 1) {
            var key = args[0];
            target[key] = args[1];
        } else {
            var values = args[0];
            for (key in values) {
                target[key] = values[key];
            }
        }
    };
    var yt$IS_JSCRIPT_ = !!eval("/*@cc_on!@*/false");
    var yt$analytics$eventTrackers_ = {};
    var yt$analytics$trackEvent = function (category, action, label, value) {
        if (yt$getConfig("EVENTS_TRACKER_INSTALLED")) {
            var tracker = yt$analytics$eventTrackers_[category];
            if (!tracker) {
                var asyncTracker = window._gaq._getAsyncTracker("eventsPageTracker");
                if (!asyncTracker) {
                    return;
                }
                window._gaq.push(function () {
                    tracker = asyncTracker._createEventTracker(category);
                    yt$analytics$eventTrackers_[category] = tracker;
                });
            }
            var labelArg = label || undefined;
            var valueArg = value || undefined;
            window._gaq.push(function () {
                tracker._trackEvent(action, labelArg, valueArg);
            });
        }
    };
    var yt$dom$datasets$set = function (element, key, value) {
        if (element.dataset) {
            element.dataset[yt$dom$datasets$toCamelCase_(key)] = value;
        } else {
            element.setAttribute("data-" + key, value);
        }
    };
    var yt$dom$datasets$get = function (element, key) {
        if (element.dataset) {
            return element.dataset[yt$dom$datasets$toCamelCase_(key)];
        } else {
            return element.getAttribute("data-" + key);
        }
    };
    var yt$dom$datasets$remove = function (element, key) {
        if (element.dataset) {
            delete element.dataset[yt$dom$datasets$toCamelCase_(key)];
        } else {
            element.removeAttribute("data-" + key);
        }
    };
    var yt$dom$datasets$has = function (element, key) {
        if (element.dataset) {
            return yt$dom$datasets$toCamelCase_(key) in element.dataset;
        } else if (element.hasAttribute) {
            return !!element.hasAttribute("data-" + key);
        } else {
            return !!element.getAttribute("data-" + key);
        }
    };
    var yt$dom$datasets$camelCaseCache_ = {};
    var yt$dom$datasets$toCamelCase_ = function (key) {
        return (
            yt$dom$datasets$camelCaseCache_[key] ||
            (yt$dom$datasets$camelCaseCache_[key] = ("" + key).replace(/\-([a-z])/g, function (all, match) {
                return match.toUpperCase();
            }))
        );
    };
    var yt$dom$getUid = function (element) {
        var uid = element.__yt_uid_key;
        if (!uid) {
            uid = yt$dom$getNextId_();
            element.__yt_uid_key = uid;
        }
        return uid;
    };
    var yt$dom$getNextId_ = goog$getObjectByName("yt.dom.getNextId_");
    if (!yt$dom$getNextId_) {
        yt$dom$getNextId_ = function () {
            return ++yt$dom$idCounter_;
        };
        goog$exportSymbol("yt.dom.getNextId_", yt$dom$getNextId_);
        var yt$dom$idCounter_ = 0;
    }
    var yt$dom$cloneNode_ = function (node) {
        var clone = node.cloneNode(false);
        if (clone.tagName == "TR" || clone.tagName == "SELECT") {
            goog$array$forEach(node.childNodes, function (child) {
                clone.appendChild(yt$dom$cloneNode_(child));
            });
        } else {
            clone.innerHTML = node.innerHTML;
        }
        return clone;
    };
    var yt$dom$cloneElementWithoutId = function (element) {
        element = yt$dom$cloneNode_(goog$dom$getElement(element));
        element.removeAttribute("id");
        return element;
    };
    var yt$dom$getAncestorByClass = function (element, className) {
        return goog$dom$getAncestorByTagNameAndClass(element, null, className);
    };
    var yt$dom$getFirstElementByTagNameAndClass = function (tagName, className, root) {
        tagName = goog$dom$getElementsByTagNameAndClass(tagName, className, root);
        if (tagName.length) {
            return tagName[0];
        } else {
            return null;
        }
    };
    var yt$dom$setEnabled = function (element, enabled) {
        if ("disabled" in element) {
            element.disabled = !enabled;
        }
        if (element.nodeType == 1) {
            goog$dom$classes$enable(element, "disabled", !enabled);
        }
        if (element.hasChildNodes()) {
            for (var i = 0, child; (child = element.childNodes[i]); ++i) {
                yt$dom$setEnabled(child, enabled);
            }
        }
    };
    var yt$dom$getEllipsizedHtml = function (element) {
        var original = goog$dom$getElement(element);
        var measurer = yt$dom$cloneNode_(original);
        element.parentNode.appendChild(measurer);
        measurer.style.whiteSpace = "normal";
        measurer.style.lineHeight = "1.5em";
        var html = yt$dom$datasets$get(original, "original-html");
        if (!html) {
            html = original.innerHTML.replace(/^\s+|\s+$/, "");
            yt$dom$datasets$set(original, "original-html", html);
        }
        var element = /<[^>]+>/g;
        var tags = html.match(element) || [];
        var textParts = html.replace(element, "<wbr>").split("<wbr>");
        var rebuild = function (parts) {
            var out = [];
            var i;
            for (i = 0; i < parts.length; i++) {
                out.push(parts[i]);
                if (tags[i]) {
                    out.push(tags[i]);
                }
            }
            if (tags[i] && tags[i].match(/^<\s*\//)) {
                out.push(tags[i]);
            }
            out = out.join("");
            if (out.length < html.length) {
                return out + "&hellip;";
            } else {
                return out;
            }
        };
        var maxHeight = yt$dom$getSingleLineHeight_(measurer);
        var element = function (parts) {
            measurer.innerHTML = rebuild(parts);
            parts = (measurer.clientHeight || measurer.offsetHeight) <= maxHeight;
            measurer.innerHTML = "";
            return parts;
        };
        for (
            var original = function (length) {
                    var parts = [];
                    for (var i = 0, n = textParts.length; i < n && length > 0; i++) {
                        var part = textParts[i];
                        parts.push(part.substring(0, length));
                        length -= part.length;
                    }
                    return parts;
                },
                low = 0,
                high = textParts.join("").length + 1,
                best = [];
            low < high;
        ) {
            var mid = low + Math.round((high - low) / 2);
            var candidate = original(mid);
            if (element(candidate)) {
                best = candidate;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        goog$dom$removeNode(measurer);
        return rebuild(best);
    };
    var yt$dom$getSingleLineHeight_ = function (element) {
        var savedHtml = element.innerHTML;
        var html = "";
        for (var i = 0; i < 1; i++) {
            html += "&nbsp;<br>";
        }
        element.innerHTML = html;
        html = element.clientHeight || element.offsetHeight;
        element.innerHTML = savedHtml;
        return html;
    };
    var yt$dom$getFullScreenElement = function () {
        var doc = document;
        if ("fullScreenElement" in doc) {
            return doc.fullScreenElement;
        }
        if ("mozFullScreenElement" in doc) {
            return doc.mozFullScreenElement;
        }
        if ("msFullScreenElement" in doc) {
            return doc.msFullScreenElement;
        }
        if ("oFullScreenElement" in doc) {
            return doc.oFullScreenElement;
        }
        if ("webkitFullScreenElement" in doc) {
            return doc.webkitFullScreenElement;
        }
    };
    var yt$events$Event = function (event) {
        if ((event = event || goog$getObjectByName("window.event"))) {
            this.type = event.type;
            var target = event.target || event.srcElement;
            if (target && target.nodeType == 3) {
                target = target.parentNode;
            }
            this.target = target;
            if ((target = event.relatedTarget)) {
                try {
                    target = target.nodeName && target;
                } catch (c) {
                    target = null;
                }
            } else if (this.type == "mouseover") {
                target = event.fromElement;
            } else if (this.type == "mouseout") {
                target = event.toElement;
            }
            this.relatedTarget = target;
            this.data = event.data;
            this.source = event.source;
            this.origin = event.origin;
            this.state = event.state;
            this.clientX = event.clientX !== undefined ? event.clientX : event.pageX;
            this.clientY = event.clientY !== undefined ? event.clientY : event.pageY;
            if (event.pageX || event.pageY) {
                this.pageX = event.pageX;
                this.pageY = event.pageY;
            } else if ((event.clientX || event.clientY) && document.body && document.documentElement) {
                this.pageX = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                this.pageY = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }
            this.keyCode = event.keyCode ? event.keyCode : event.which;
            this.charCode = event.charCode || (this.type == "keypress" ? this.keyCode : 0);
            if (this.type.indexOf("touch") == 0) {
                this.touches = event.touches;
                this.changedTouches = event.changedTouches;
            }
            if (this.type.indexOf("gesture") == 0) {
                this.scale = event.scale;
                this.rotation = event.rotation;
            }
            this.event_ = event;
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
    yt$events$Event.prototype.event_ = null;
    yt$events$Event.prototype.clientX = 0;
    yt$events$Event.prototype.clientY = 0;
    yt$events$Event.prototype.pageX = 0;
    yt$events$Event.prototype.pageY = 0;
    yt$events$Event.prototype.touches = null;
    yt$events$Event.prototype.changedTouches = null;
    yt$events$Event.prototype.preventDefault = function () {
        this.event_.returnValue = false;
        if (this.event_.preventDefault) {
            this.event_.preventDefault();
        }
    };
    yt$events$Event.prototype.stopPropagation = function () {
        this.event_.cancelBubble = true;
        if (this.event_.stopPropagation) {
            this.event_.stopPropagation();
        }
    };
    var yt$events$listeners_ = goog$getObjectByName("yt.events.listeners_") || {};
    goog$exportSymbol("yt.events.listeners_", yt$events$listeners_);
    var yt$events$counter_ = goog$getObjectByName("yt.events.counter_") || {
        count: 0
    };
    goog$exportSymbol("yt.events.counter_", yt$events$counter_);
    var yt$events$findListenerKey_ = function (target, type, listener, useCapture) {
        return goog$object$findKey(yt$events$listeners_, function (entry) {
            return entry[0] == target && entry[1] == type && entry[2] == listener && entry[4] == !!useCapture;
        });
    };
    var yt$events$listen = function (target, type, listener, useCapture) {
        if (!target || (!target.addEventListener && !target.attachEvent)) {
            return "";
        }
        var useCapture = !!useCapture;
        var key = yt$events$findListenerKey_(target, type, listener, useCapture);
        if (key) {
            return key;
        }
        var key = ++yt$events$counter_.count + "";
        var wrapper = function (event) {
            event = new yt$events$Event(event);
            event.currentTarget = target;
            return listener.call(target, event);
        };
        yt$events$listeners_[key] = [target, type, listener, wrapper, useCapture];
        if (target.addEventListener) {
            target.addEventListener(type, wrapper, useCapture);
        } else {
            target.attachEvent("on" + type, wrapper);
        }
        return key;
    };
    var yt$events$listenOnce = function (target, type, listener, useCapture) {
        var key;
        key = yt$events$listen(
            target,
            type,
            function () {
                yt$events$unlistenByKey(key);
                listener.apply(target, arguments);
            },
            useCapture
        );
    };
    var yt$events$delegateListItemClick = function (root, listener) {
        yt$events$delegate(root, "click", listener, function (node) {
            return node.nodeName.toLowerCase() === "li" && true;
        });
    };
    var yt$events$delegateByClass = function (root, type, listener, className) {
        return yt$events$delegate(root, type, listener, function (node) {
            return goog$dom$classes$has(node, className);
        });
    };
    var yt$events$delegate = function (root, type, listener, matches) {
        var rootElement = root || document;
        return yt$events$listen(rootElement, type, function (event) {
            var match = goog$dom$getAncestor(
                event.target,
                function (node) {
                    return node === rootElement || matches(node);
                },
                true
            );
            if (match && match !== rootElement) {
                event.currentTarget = match;
                listener.call(match, event);
            }
        });
    };
    var yt$events$unlisten = function (target, type, listener, useCapture) {
        if ((target = yt$events$findListenerKey_(target, type, listener, !!useCapture))) {
            yt$events$unlistenByKey(target);
        }
    };
    var yt$events$unlistenByKey = function (keys) {
        if (typeof keys == "string") {
            keys = [keys];
        }
        goog$array$forEach(keys, function (key) {
            if (key in yt$events$listeners_) {
                var entry = yt$events$listeners_[key];
                var target = entry[0];
                var type = entry[1];
                var wrapper = entry[3];
                var entry = entry[4];
                if (target.removeEventListener) {
                    target.removeEventListener(type, wrapper, entry);
                } else {
                    target.detachEvent("on" + type, wrapper);
                }
                delete yt$events$listeners_[key];
            }
        });
    };
    var yt$events$getTarget = function (event) {
        event = event || window.event;
        event = event.target || event.srcElement;
        if (event.nodeType == 3) {
            event = event.parentNode;
        }
        return event;
    };
    var yt$events$stopPropagation = function (event) {
        event = event || window.event;
        event.cancelBubble = true;
        if (event.stopPropagation) {
            event.stopPropagation();
        }
    };
    var yt$events$preventDefault = function (event) {
        event = event || window.event;
        event.returnValue = false;
        if (event.preventDefault) {
            event.preventDefault();
        }
        return false;
    };
    var yt$events$simulateClick = function (element) {
        if (document.createEvent) {
            var event = document.createEvent("HTMLEvents");
            event.initEvent("click", true, true);
            element.dispatchEvent(event);
        } else {
            event = document.createEventObject();
            element.fireEvent("onclick", event);
        }
    };
    var goog$net$Cookies = function (context) {
        this.document_ = context;
    };
    var goog$net$Cookies$SPLIT_RE_ = /\s*;\s*/;
    goog$net$Cookies.prototype.set = function (name, value, opt_maxAge, opt_path, opt_domain, opt_secure) {
        if (/[;=\s]/.test(name)) {
            throw Error('Invalid cookie name "' + name + '"');
        }
        if (/[;\r\n]/.test(value)) {
            throw Error('Invalid cookie value "' + value + '"');
        }
        if (!goog$isDef(opt_maxAge)) {
            opt_maxAge = -1;
        }
        opt_domain = opt_domain ? ";domain=" + opt_domain : "";
        opt_path = opt_path ? ";path=" + opt_path : "";
        opt_secure = opt_secure ? ";secure" : "";
        opt_maxAge =
            opt_maxAge < 0
                ? ""
                : opt_maxAge == 0
                  ? ";expires=" + new Date(1970, 1, 1).toUTCString()
                  : ";expires=" + new Date(goog$now() + opt_maxAge * 1000).toUTCString();
        this.document_.cookie = name + "=" + value + opt_domain + opt_path + opt_maxAge + opt_secure;
    };
    goog$net$Cookies.prototype.get = function (name, opt_default) {
        var c = name + "=";
        for (var d = (this.document_.cookie || "").split(goog$net$Cookies$SPLIT_RE_), e = 0, f; (f = d[e]); e++) {
            if (f.indexOf(c) == 0) {
                return f.substr(c.length);
            }
        }
        return opt_default;
    };
    goog$net$Cookies.prototype.remove = function (name, opt_path, opt_domain) {
        var d = this.containsKey(name);
        this.set(name, "", 0, opt_path, opt_domain);
        return d;
    };
    goog$net$Cookies.prototype.getKeys = function () {
        return goog$net$Cookies$getKeyValues_(this).keys;
    };
    goog$net$Cookies.prototype.getValues = function () {
        return goog$net$Cookies$getKeyValues_(this).values;
    };
    goog$net$Cookies.prototype.getCount = function () {
        if (!this.document_.cookie) {
            return 0;
        } else {
            return (this.document_.cookie || "").split(goog$net$Cookies$SPLIT_RE_).length;
        }
    };
    goog$net$Cookies.prototype.containsKey = function (key) {
        return goog$isDef(this.get(key));
    };
    goog$net$Cookies.prototype.clear = function () {
        var keys = goog$net$Cookies$getKeyValues_(this).keys;
        for (var i = keys.length - 1; i >= 0; i--) {
            this.remove(keys[i]);
        }
    };
    var goog$net$Cookies$getKeyValues_ = function (self) {
        for (
            var self = (self.document_.cookie || "").split(goog$net$Cookies$SPLIT_RE_), b = [], c = [], d, e, f = 0;
            (e = self[f]);
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
            values: c
        };
    };
    var goog$net$cookies = new goog$net$Cookies(document);
    goog$net$cookies.MAX_COOKIE_LENGTH = 3950;
    var yt$net$cookies$set = function (name, value, maxAge, path, domain) {
        goog$net$cookies.set("" + name, value, maxAge, path || "/", domain || "youtube.com");
    };
    var yt$net$cookies$get = function (name, defaultValue) {
        return goog$net$cookies.get("" + name, defaultValue);
    };
    var yt$net$cookies$remove = function (name, path, domain) {
        return goog$net$cookies.remove("" + name, path || "/", domain || "youtube.com");
    };
    var yt$prefs$UserPrefs = function () {
        var cookie = yt$net$cookies$get(this.cookieName_);
        if (cookie) {
            for (var cookie = unescape(cookie).split("&"), i = 0; i < cookie.length; i++) {
                var pair = cookie[i].split("=");
                var key = pair[0];
                if ((pair = pair[1])) {
                    yt$prefs$UserPrefs$prefs_[key] = pair.toString();
                }
            }
        }
    };
    goog$addSingletonGetter(yt$prefs$UserPrefs);
    var yt$prefs$UserPrefs$prefs_ = goog$getObjectByName("yt.prefs.UserPrefs.prefs_") || {};
    goog$exportSymbol("yt.prefs.UserPrefs.prefs_", yt$prefs$UserPrefs$prefs_);
    yt$prefs$UserPrefs.prototype.cookieName_ = "PREF";
    var yt$prefs$UserPrefs$validateNotFlagName_ = function (name) {
        if (/^f([1-9][0-9]*)$/.test(name)) {
            throw "ExpectedRegexMatch: " + name;
        }
    };
    var yt$prefs$UserPrefs$validateName_ = function (name) {
        if (!/^\w+$/.test(name)) {
            throw "ExpectedRegexMismatch: " + name;
        }
    };
    var yt$prefs$UserPrefs$getFlagValue_ = function (name) {
        name = yt$prefs$UserPrefs$prefs_[name] !== undefined ? yt$prefs$UserPrefs$prefs_[name].toString() : null;
        if (name != null && /^[A-Fa-f0-9]+$/.test(name)) {
            return parseInt(name, 16);
        } else {
            return null;
        }
    };
    yt$prefs$UserPrefs.prototype.get = function (name, defaultValue) {
        yt$prefs$UserPrefs$validateName_(name);
        yt$prefs$UserPrefs$validateNotFlagName_(name);
        var value = yt$prefs$UserPrefs$prefs_[name] !== undefined ? yt$prefs$UserPrefs$prefs_[name].toString() : null;
        if (value != null) {
            return value;
        } else if (defaultValue) {
            return defaultValue;
        } else {
            return "";
        }
    };
    yt$prefs$UserPrefs.prototype.set = function (name, value) {
        yt$prefs$UserPrefs$validateName_(name);
        yt$prefs$UserPrefs$validateNotFlagName_(name);
        if (value == null) {
            throw "ExpectedNotNull";
        }
        yt$prefs$UserPrefs$prefs_[name] = value.toString();
    };
    var yt$prefs$UserPrefs$getFlag = function (prefs, flag) {
        return !!((yt$prefs$UserPrefs$getFlagValue_("f" + (Math.floor(flag / 31) + 1)) || 0) & (1 << (flag % 31)));
    };
    var yt$prefs$UserPrefs$setFlag = function (flag, enabled) {
        var name = "f" + (Math.floor(flag / 31) + 1);
        var bit = 1 << (flag % 31);
        var value = yt$prefs$UserPrefs$getFlagValue_(name) || 0;
        var value = enabled ? value | bit : value & ~bit;
        if (value == 0) {
            delete yt$prefs$UserPrefs$prefs_[name];
        } else {
            bit = value.toString(16);
            yt$prefs$UserPrefs$prefs_[name] = bit.toString();
        }
    };
    yt$prefs$UserPrefs.prototype.remove = function (name) {
        yt$prefs$UserPrefs$validateName_(name);
        yt$prefs$UserPrefs$validateNotFlagName_(name);
        delete yt$prefs$UserPrefs$prefs_[name];
    };
    yt$prefs$UserPrefs.prototype.save = function (days) {
        var days = (days || 7) * 86400;
        var cookieName = this.cookieName_;
        var parts = [];
        var key;
        for (key in yt$prefs$UserPrefs$prefs_) {
            parts.push(key + "=" + escape(yt$prefs$UserPrefs$prefs_[key]));
        }
        yt$net$cookies$set(cookieName, parts.join("&"), days);
    };
    yt$prefs$UserPrefs.prototype.clear = function () {
        yt$prefs$UserPrefs$prefs_ = {};
    };
    var goog$math$Box = function (boxTop, right, bottom, left) {
        this.top = boxTop;
        this.right = right;
        this.bottom = bottom;
        this.left = left;
    };
    goog$math$Box.prototype.clone = function () {
        return new goog$math$Box(this.top, this.right, this.bottom, this.left);
    };
    goog$math$Box.prototype.toString = function () {
        return "(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)";
    };
    goog$math$Box.prototype.contains = function (other) {
        if (!this || !other) {
            return false;
        } else if (other instanceof goog$math$Box) {
            return (
                other.left >= this.left &&
                other.right <= this.right &&
                other.top >= this.top &&
                other.bottom <= this.bottom
            );
        } else {
            return other.x >= this.left && other.x <= this.right && other.y >= this.top && other.y <= this.bottom;
        }
    };
    goog$math$Box.prototype.expand = function (topOrBox, opt_right, opt_bottom, opt_left) {
        if (goog$isObject(topOrBox)) {
            this.top -= topOrBox.top;
            this.right += topOrBox.right;
            this.bottom += topOrBox.bottom;
            this.left -= topOrBox.left;
        } else {
            this.top -= topOrBox;
            this.right += opt_right;
            this.bottom += opt_bottom;
            this.left -= opt_left;
        }
        return this;
    };
    var goog$math$Rect = function (x, y, w, h) {
        this.left = x;
        this.top = y;
        this.width = w;
        this.height = h;
    };
    goog$math$Rect.prototype.clone = function () {
        return new goog$math$Rect(this.left, this.top, this.width, this.height);
    };
    goog$math$Rect.prototype.toString = function () {
        return "(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)";
    };
    goog$math$Rect.prototype.contains = function (another) {
        if (another instanceof goog$math$Rect) {
            return (
                this.left <= another.left &&
                this.left + this.width >= another.left + another.width &&
                this.top <= another.top &&
                this.top + this.height >= another.top + another.height
            );
        } else {
            return (
                another.x >= this.left &&
                another.x <= this.left + this.width &&
                another.y >= this.top &&
                another.y <= this.top + this.height
            );
        }
    };
    var goog$style$setStyle_ = function (element, value, style) {
        element.style[goog$string$toCamelCase(style)] = value;
    };
    var goog$style$getComputedStyle = function (element, property) {
        var c = goog$dom$getOwnerDocument(element);
        if (c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(element, null))) {
            return c[property] || c.getPropertyValue(property);
        } else {
            return "";
        }
    };
    var goog$style$getCascadedStyle = function (element, style) {
        if (element.currentStyle) {
            return element.currentStyle[style];
        } else {
            return null;
        }
    };
    var goog$style$getStyle_ = function (element, style) {
        return (
            goog$style$getComputedStyle(element, style) ||
            goog$style$getCascadedStyle(element, style) ||
            (element.style && element.style[style])
        );
    };
    var goog$style$getBoundingClientRect_ = function (el) {
        var b = el.getBoundingClientRect();
        if (goog$userAgent$IE) {
            el = el.ownerDocument;
            b.left -= el.documentElement.clientLeft + el.body.clientLeft;
            b.top -= el.documentElement.clientTop + el.body.clientTop;
        }
        return b;
    };
    var goog$style$getOffsetParent = function (element) {
        if (goog$userAgent$IE && !goog$userAgent$isDocumentMode(8)) {
            return element.offsetParent;
        }
        for (
            var b = goog$dom$getOwnerDocument(element),
                c = goog$style$getStyle_(element, "position"),
                d = c == "fixed" || c == "absolute",
                element = element.parentNode;
            element && element != b;
            element = element.parentNode
        ) {
            c = goog$style$getStyle_(element, "position");
            d = d && c == "static" && element != b.documentElement && element != b.body;
            if (
                !d &&
                (element.scrollWidth > element.clientWidth ||
                    element.scrollHeight > element.clientHeight ||
                    c == "fixed" ||
                    c == "absolute" ||
                    c == "relative")
            ) {
                return element;
            }
        }
        return null;
    };
    var goog$style$getVisibleRectForElement = function (element) {
        var b = new goog$math$Box(0, Infinity, Infinity, 0);
        var c = goog$dom$getDomHelper(element);
        var d = c.document_.body;
        var e = c.document_.documentElement;
        var f =
            !goog$userAgent$WEBKIT && goog$dom$isCss1CompatMode_(c.document_)
                ? c.document_.documentElement
                : c.document_.body;
        for (; (element = goog$style$getOffsetParent(element));) {
            if (
                (!goog$userAgent$IE || element.clientWidth != 0) &&
                (!goog$userAgent$WEBKIT || element.clientHeight != 0 || element != d) &&
                element != d &&
                element != e &&
                goog$style$getStyle_(element, "overflow") != "visible"
            ) {
                var g = goog$style$getPageOffset(element);
                var j;
                j = element;
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
                b.right = Math.min(b.right, g.x + element.clientWidth);
                b.bottom = Math.min(b.bottom, g.y + element.clientHeight);
                b.left = Math.max(b.left, g.x);
            }
        }
        d = f.scrollLeft;
        f = f.scrollTop;
        b.left = Math.max(b.left, d);
        b.top = Math.max(b.top, f);
        c = goog$dom$getViewportSize_(c.document_.parentWindow || c.document_.defaultView || window);
        b.right = Math.min(b.right, d + c.width);
        b.bottom = Math.min(b.bottom, f + c.height);
        if (b.top >= 0 && b.left >= 0 && b.bottom > b.top && b.right > b.left) {
            return b;
        } else {
            return null;
        }
    };
    var goog$style$getPageOffset = function (el) {
        var b;
        var c = goog$dom$getOwnerDocument(el);
        var d = goog$style$getStyle_(el, "position");
        var e =
            goog$userAgent$GECKO &&
            c.getBoxObjectFor &&
            !el.getBoundingClientRect &&
            d == "absolute" &&
            (b = c.getBoxObjectFor(el)) &&
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
        if (el == g) {
            return f;
        }
        if (el.getBoundingClientRect) {
            b = goog$style$getBoundingClientRect_(el);
            el = goog$dom$DomHelper$getDocumentScroll(goog$dom$getDomHelper(c));
            f.x = b.left + el.x;
            f.y = b.top + el.y;
        } else if (c.getBoxObjectFor && !e) {
            b = c.getBoxObjectFor(el);
            el = c.getBoxObjectFor(g);
            f.x = b.screenX - el.screenX;
            f.y = b.screenY - el.screenY;
        } else {
            b = el;
            do {
                f.x += b.offsetLeft;
                f.y += b.offsetTop;
                if (b != el) {
                    f.x += b.clientLeft || 0;
                    f.y += b.clientTop || 0;
                }
                if (goog$userAgent$WEBKIT && goog$style$getStyle_(b, "position") == "fixed") {
                    f.x += c.body.scrollLeft;
                    f.y += c.body.scrollTop;
                    break;
                }
                b = b.offsetParent;
            } while (b && b != el);
            if (goog$userAgent$OPERA || (goog$userAgent$WEBKIT && d == "absolute")) {
                f.y -= c.body.offsetTop;
            }
            for (b = el; (b = goog$style$getOffsetParent(b)) && b != c.body && b != g;) {
                f.x -= b.scrollLeft;
                if (!goog$userAgent$OPERA || b.tagName != "TR") {
                    f.y -= b.scrollTop;
                }
            }
        }
        return f;
    };
    var goog$style$getClientPosition = function (el) {
        var b = new goog$math$Coordinate();
        if (el.nodeType == 1) {
            if (el.getBoundingClientRect) {
                el = goog$style$getBoundingClientRect_(el);
                b.x = el.left;
                b.y = el.top;
            } else {
                var c = goog$dom$DomHelper$getDocumentScroll(goog$dom$getDomHelper(el));
                var el = goog$style$getPageOffset(el);
                b.x = el.x - c.x;
                b.y = el.y - c.y;
            }
        } else {
            var c = goog$typeOf(el.getBrowserEvent) == "function";
            var d = el;
            if (el.targetTouches) {
                d = el.targetTouches[0];
            } else if (c && el.getBrowserEvent().targetTouches) {
                d = el.getBrowserEvent().targetTouches[0];
            }
            b.x = d.clientX;
            b.y = d.clientY;
        }
        return b;
    };
    var goog$style$getPixelStyleValue_ = function (value, round) {
        if (typeof value == "number") {
            value = (round ? Math.round(value) : value) + "px";
        }
        return value;
    };
    var goog$style$getSize = function (element) {
        if (goog$style$getStyle_(element, "display") != "none") {
            return goog$style$getSizeWithDisplay_(element);
        }
        var b = element.style;
        var c = b.display;
        var d = b.visibility;
        var e = b.position;
        b.visibility = "hidden";
        b.position = "absolute";
        b.display = "inline";
        element = goog$style$getSizeWithDisplay_(element);
        b.display = c;
        b.position = e;
        b.visibility = d;
        return element;
    };
    var goog$style$getSizeWithDisplay_ = function (element) {
        var b = element.offsetWidth;
        var c = element.offsetHeight;
        var d = goog$userAgent$WEBKIT && !b && !c;
        if ((!goog$isDef(b) || d) && element.getBoundingClientRect) {
            element = goog$style$getBoundingClientRect_(element);
            return new goog$math$Size(element.right - element.left, element.bottom - element.top);
        } else {
            return new goog$math$Size(b, c);
        }
    };
    var goog$style$getBounds = function (element) {
        var b = goog$style$getPageOffset(element);
        var element = goog$style$getSize(element);
        return new goog$math$Rect(b.x, b.y, element.width, element.height);
    };
    var goog$style$isRightToLeft = function (el) {
        return goog$style$getStyle_(el, "direction") == "rtl";
    };
    var goog$style$getIePixelValue_ = function (element, value) {
        if (/^\d+px?$/.test(value)) {
            return parseInt(value, 10);
        }
        var left = element.style.left;
        var runtimeLeft = element.runtimeStyle.left;
        element.runtimeStyle.left = element.currentStyle.left;
        element.style.left = value;
        var pixelLeft = element.style.pixelLeft;
        element.style.left = left;
        element.runtimeStyle.left = runtimeLeft;
        return pixelLeft;
    };
    var goog$style$ieBorderWidthKeywords_ = {
        thin: 2,
        medium: 4,
        thick: 6
    };
    var goog$style$getIePixelBorder_ = function (element, prop) {
        if (goog$style$getCascadedStyle(element, prop + "Style") == "none") {
            return 0;
        }
        var c = goog$style$getCascadedStyle(element, prop + "Width");
        if (c in goog$style$ieBorderWidthKeywords_) {
            return goog$style$ieBorderWidthKeywords_[c];
        } else {
            return goog$style$getIePixelValue_(element, c);
        }
    };
    var yt$style$setDisplayed = function (element, displayed) {
        if ((element = goog$dom$getElement(element)) && element.style) {
            element.style.display = displayed ? "" : "none";
            goog$dom$classes$enable(element, "hid", !displayed);
        }
    };
    var yt$style$isDisplayed = function (element) {
        element = goog$dom$getElement(element);
        if (!element) {
            return false;
        } else {
            return element.style.display != "none" && !goog$dom$classes$has(element, "hid");
        }
    };
    var yt$style$toggleOne_ = function (element) {
        if ((element = goog$dom$getElement(element))) {
            if (yt$style$isDisplayed(element)) {
                element.style.display = "none";
                goog$dom$classes$add(element, "hid");
            } else {
                element.style.display = "";
                goog$dom$classes$remove(element, "hid");
            }
        }
    };
    var yt$style$show = function (var_args) {
        goog$array$forEach(arguments, function (element) {
            yt$style$setDisplayed(element, true);
        });
    };
    var yt$style$hide = function (var_args) {
        goog$array$forEach(arguments, function (element) {
            yt$style$setDisplayed(element, false);
        });
    };
    var yt$style$toggle = function (var_args) {
        goog$array$forEach(arguments, yt$style$toggleOne_);
    };
    var goog$uri$utils$buildFromEncodedParts = function (
        opt_scheme,
        opt_userInfo,
        opt_domain,
        opt_port,
        opt_path,
        opt_queryData,
        opt_fragment
    ) {
        var j = [];
        if (opt_scheme) {
            j.push(opt_scheme, ":");
        }
        if (opt_domain) {
            j.push("//");
            if (opt_userInfo) {
                j.push(opt_userInfo, "@");
            }
            j.push(opt_domain);
            if (opt_port) {
                j.push(":", opt_port);
            }
        }
        if (opt_path) {
            j.push(opt_path);
        }
        if (opt_queryData) {
            j.push("?", opt_queryData);
        }
        if (opt_fragment) {
            j.push("#", opt_fragment);
        }
        return j.join("");
    };
    var goog$uri$utils$splitRe_ = RegExp(
        "^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([\\w\\d\\-\\u0100-\\uffff.%]*)(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$"
    );
    var goog$uri$utils$split = function (uri) {
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
        return uri.match(goog$uri$utils$splitRe_);
    };
    var goog$uri$utils$needsPhishingProtection_ = goog$userAgent$WEBKIT;
    var goog$uri$utils$getDomain = function (uri) {
        return (uri = goog$uri$utils$split(uri)[3] || null) && decodeURIComponent(uri);
    };
    var goog$uri$utils$getHost = function () {
        var pieces = goog$uri$utils$split(document.location.href);
        return goog$uri$utils$buildFromEncodedParts(pieces[1], pieces[2], pieces[3], pieces[4]);
    };
    var goog$uri$utils$getPathAndAfter = function (uri) {
        uri = goog$uri$utils$split(uri);
        return goog$uri$utils$buildFromEncodedParts(null, null, null, null, uri[5], uri[6], uri[7]);
    };
    var goog$uri$utils$buildQueryDataBufferFromMap_ = function (buffer, map) {
        for (var c in map) {
            var d = c;
            var e = map[c];
            var f = buffer;
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
        return buffer;
    };
    var yt$uri$buildQueryData = function (data) {
        data = goog$uri$utils$buildQueryDataBufferFromMap_([], data);
        data[0] = "";
        return data.join("");
    };
    var yt$uri$parseQueryData = function (query) {
        if (query.charAt(0) == "?") {
            query = query.substr(1);
        }
        var query = query.split("&");
        var data = {};
        for (var i = 0, n = query.length; i < n; i++) {
            var pair = query[i].split("=");
            if ((pair.length == 1 && pair[0]) || pair.length == 2) {
                var key = pair[0];
                var pair = decodeURIComponent((pair[1] || "").replace(/\+/g, " "));
                if (key in data) {
                    if (goog$isArray(data[key])) {
                        goog$array$extend(data[key], pair);
                    } else {
                        data[key] = [data[key], pair];
                    }
                } else {
                    data[key] = pair;
                }
            }
        }
        return data;
    };
    var yt$uri$getQueryData = function (url) {
        if (url.indexOf("?") != -1) {
            url = (url || "").split("#")[0];
            url = url.split("?", 2);
            return yt$uri$parseQueryData(url.length > 1 ? url[1] : url[0]);
        } else {
            return {};
        }
    };
    var yt$uri$getHashData = function (hash) {
        if (hash.charAt(0) == "#") {
            hash = hash.charAt(1) == "!" ? hash.substr(2) : hash.substr(1);
        }
        return yt$uri$parseQueryData(hash);
    };
    var yt$uri$appendQueryData = function (url, data) {
        var buffer = goog$uri$utils$buildQueryDataBufferFromMap_([url], data);
        if (buffer[1]) {
            var base = buffer[0];
            var index = base.indexOf("#");
            if (index >= 0) {
                buffer.push(base.substr(index));
                buffer[0] = base = base.substr(0, index);
            }
            index = base.indexOf("?");
            if (index < 0) {
                buffer[1] = "?";
            } else if (index == base.length - 1) {
                buffer[1] = undefined;
            }
        }
        return buffer.join("");
    };
    var yt$uri$getDomain = goog$uri$utils$getDomain;
    var yt$uri$setQueryData = function (url, data) {
        var parts = url.split("?", 2);
        var url = parts[0];
        var parts = yt$uri$parseQueryData(parts[1] || "");
        var key;
        for (key in data) {
            parts[key] = data[key];
        }
        return yt$uri$appendQueryData(url, parts);
    };
    var yt$uri$isYouTubeOrGoogleUrl = function (url) {
        url = yt$uri$getDomain(url);
        url = url === null ? null : url.split(".").reverse();
        return (
            (url === null ? false : url[0] == "com" && url[1].match(/^youtube(?:-nocookie)?$/) ? true : false) ||
            (url === null
                ? false
                : url[1] == "google"
                  ? true
                  : url[2] == "google"
                    ? url[0] == "au" && url[1] == "com"
                        ? true
                        : url[0] == "uk" && url[1] == "co"
                          ? true
                          : false
                    : false)
        );
    };
    var yt$player$Config = function (config) {
        config = config || {};
        this.url = config.url || this.url;
        this.urlV8 = config.url_v8 || this.urlV8;
        this.urlV9As2 = config.url_v9as2 || this.urlV9As2;
        this.minVersion = config.min_version || this.minVersion;
        this.args = config.args || goog$object$clone(yt$player$Config$DEFAULT_ARGS_);
        this.assets = config.assets || {};
        this.attrs = config.attrs || goog$object$clone(yt$player$Config$DEFAULT_ATTRS_);
        this.params = config.params || goog$object$clone(yt$player$Config$DEFAULT_PARAMS_);
        this.fallback = config.fallback || this.fallback;
        this.html5 = config.html5 || this.html5;
        this.disable = config.disable || {};
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
        this.loadCallbacks_ = [];
        yt$flash$FlashDetector$detect_(this);
    };
    goog$addSingletonGetter(yt$flash$FlashDetector);
    yt$flash$FlashDetector.prototype.major_ = 0;
    yt$flash$FlashDetector.prototype.minor_ = 0;
    yt$flash$FlashDetector.prototype.rev = 0;
    yt$flash$FlashDetector.prototype.description_ = "";
    yt$flash$FlashDetector.prototype.state_ = 0;
    yt$flash$FlashDetector.prototype.load = function (callback) {
        if (this.state_ >= 3) {
            callback(this);
        } else {
            this.loadCallbacks_.push(callback);
        }
    };
    yt$flash$FlashDetector.prototype.setVersion = function (version) {
        this.major_ = version[0];
        this.minor_ = version[1];
        this.rev = version[2];
    };
    yt$flash$FlashDetector.prototype.isSupported = function (major, minor, rev) {
        major = typeof major == "string" ? major.split(".") : [major, minor, rev];
        major[0] = parseInt(major[0], 10) || 0;
        major[1] = parseInt(major[1], 10) || 0;
        major[2] = parseInt(major[2], 10) || 0;
        return (
            this.major_ > major[0] ||
            (this.major_ == major[0] && this.minor_ > major[1]) ||
            (this.major_ == major[0] && this.minor_ == major[1] && this.rev >= major[2])
        );
    };
    var yt$flash$FlashDetector$isAs3Capable_ = function (detector) {
        if (
            (detector.description_.indexOf("Gnash") > -1 && detector.description_.indexOf("AVM2") == -1) ||
            (detector.major_ == 9 && detector.minor_ == 1) ||
            (detector.major_ == 9 && detector.minor_ == 0 && detector.rev == 1)
        ) {
            return false;
        } else {
            return detector.major_ >= 9;
        }
    };
    var yt$flash$FlashDetector$isDeviceSupported_ = function (detector) {
        if (navigator.userAgent.indexOf("Sony/COM2") > -1 && !detector.isSupported(9, 1, 58)) {
            return false;
        } else {
            return true;
        }
    };
    var yt$flash$FlashDetector$detect_ = function (detector) {
        if (detector.state_ < 3) {
            if (detector.state_ < 1) {
                var plugin = goog$getObjectByName("window.navigator.plugins");
                var description = goog$getObjectByName("window.navigator.mimeTypes");
                var plugin = plugin && plugin["Shockwave Flash"];
                var description = description && description["application/x-shockwave-flash"];
                var description = (plugin && description && description.enabledPlugin && plugin.description) || "";
                if ((plugin = description)) {
                    var parts = plugin.indexOf("Shockwave Flash");
                    if (parts >= 0) {
                        plugin = plugin.substr(parts + 15);
                    }
                    var parts = plugin.split(" ");
                    var versionPart = "";
                    var plugin = "";
                    for (var i = 0, n = parts.length; i < n; i++) {
                        if (versionPart) {
                            if (plugin) {
                                break;
                            } else {
                                plugin = parts[i];
                            }
                        } else {
                            versionPart = parts[i];
                        }
                    }
                    versionPart = versionPart.split(".");
                    parts = parseInt(versionPart[0], 10) || 0;
                    versionPart = parseInt(versionPart[1], 10) || 0;
                    i = 0;
                    if (plugin.charAt(0) == "r" || plugin.charAt(0) == "d") {
                        i = parseInt(plugin.substr(1), 10) || 0;
                    }
                    plugin = [parts, versionPart, i];
                } else {
                    plugin = [0, 0, 0];
                }
                detector.description_ = description;
                detector.setVersion(plugin);
                detector.state_ = 1;
                if (detector.major_ > 0) {
                    yt$flash$FlashDetector$fireCallbacks_(detector);
                } else {
                    yt$flash$FlashDetector$detect_(detector);
                }
            } else if (detector.state_ < 2) {
                yt$flash$FlashDetector$detectWithPluginObject_(detector);
            } else {
                yt$flash$FlashDetector$fireCallbacks_(detector);
            }
        }
    };
    yt$flash$FlashDetector.prototype.onActiveXVersion_ = function (versionString) {
        if (versionString) {
            versionString = versionString.split(" ")[1].split(",");
            versionString = [
                parseInt(versionString[0], 10) || 0,
                parseInt(versionString[1], 10) || 0,
                parseInt(versionString[2], 10) || 0
            ];
        } else {
            versionString = [0, 0, 0];
        }
        this.setVersion(versionString);
        this.state_ = 2;
        if (this.major_ > 0) {
            yt$flash$FlashDetector$fireCallbacks_(this);
        } else {
            yt$flash$FlashDetector$detect_(this);
        }
    };
    var yt$flash$FlashDetector$fireCallbacks_ = function (detector) {
        if (detector.state_ < 3) {
            detector.state_ = 3;
            for (var i = 0, n = detector.loadCallbacks_.length; i < n; i++) {
                detector.loadCallbacks_[i](detector);
            }
            detector.loadCallbacks_ = [];
        }
    };
    var yt$flash$FlashDetector$detectWithPluginObject_ = function (detector) {
        var plugin;
        var version;
        var body;
        var object;
        if (yt$IS_JSCRIPT_) {
            try {
                plugin = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
            } catch (f) {
                plugin = null;
            }
            if (!plugin) {
                detector.onActiveXVersion_("");
            }
        } else {
            body = document.getElementsByTagName("body")[0];
            object = document.createElement("object");
            object.setAttribute("type", "application/x-shockwave-flash");
            plugin = body.appendChild(object);
        }
        var onVersion = goog$bind(detector.onActiveXVersion_, detector);
        var attempts = 0;
        var poll = function () {
            if (plugin && "GetVariable" in plugin) {
                try {
                    version = plugin.GetVariable("$version");
                } catch (a) {
                    version = "";
                }
            }
            if (version || attempts >= 10) {
                if (body && object) {
                    body.removeChild(object);
                }
                onVersion(version || "");
            } else {
                attempts++;
                yt$setTimeout(poll, 10);
            }
        };
        yt$setTimeout(poll, 0);
    };
    var yt$flash$writeEmbedHtml_ = function (container, swfUrl, config) {
        if ((container = goog$dom$getElement(container)) && swfUrl && config) {
            if (!(config instanceof yt$player$Config)) {
                config = new yt$player$Config(config);
            }
            var attrs = goog$object$clone(config.attrs);
            var params = goog$object$clone(config.params);
            params.flashvars = yt$uri$buildQueryData(config.args);
            config = [];
            if (yt$IS_JSCRIPT_) {
                attrs.classid = "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000";
                params.movie = swfUrl;
                config.push("<object ");
                for (var key in attrs) {
                    config.push(key, '="', attrs[key], '"');
                }
                config.push(">");
                for (key in params) {
                    config.push('<param name="', key, '" value="', params[key], '">');
                }
                config.push("</object>");
            } else {
                attrs.type = "application/x-shockwave-flash";
                attrs.src = swfUrl;
                config.push("<embed ");
                for (key in attrs) {
                    config.push(key, '="', attrs[key], '"');
                }
                for (key in params) {
                    config.push(key, '="', params[key], '"');
                }
                config.push(" />");
            }
            container.innerHTML = config.join("");
        }
    };
    var yt$flash$embed = function (container, config) {
        container = goog$dom$getElement(container);
        if (!(config instanceof yt$player$Config)) {
            config = new yt$player$Config(config);
        }
        if (window != window.top) {
            var framer = null;
            if (document.referrer) {
                framer = document.referrer.substring(0, 128);
            }
            config.args.framer = framer;
        }
        yt$flash$detectVersion_(function (detector) {
            if (detector.isSupported(config.minVersion) || yt$getConfig("IS_OPERA_MINI")) {
                detector =
                    (yt$flash$FlashDetector$isAs3Capable_(detector) && config.url) ||
                    (yt$flash$FlashDetector$isDeviceSupported_(detector) && config.urlV9As2) ||
                    config.urlV8 ||
                    config.url;
                yt$flash$writeEmbedHtml_(container, detector, config);
            } else if (yt$IS_JSCRIPT_ && detector.isSupported(6, 0, 65)) {
                detector = new yt$player$Config({
                    url: "//s.ytimg.com/yt/swf/expressInstall-vflIE9HEf.swf",
                    args: {
                        MMredirectURL: window.location,
                        MMplayerType: "ActiveX",
                        MMdoctitle: document.title
                    }
                });
                yt$flash$writeEmbedHtml_(container, detector.url, detector);
            } else if (detector.major_ == 0 && config.fallback) {
                config.fallback();
            } else if (detector.major_ == 0 && config.fallbackMessage) {
                config.fallbackMessage();
            } else {
                container.innerHTML = '<div id="flash-upgrade">' + yt$getMsg("FLASH_UPGRADE") + "</div>";
            }
        });
    };
    var yt$flash$update = function (config, force) {
        if (config) {
            if (!(config instanceof yt$player$Config)) {
                config = new yt$player$Config(config);
            }
            var rewrite = !!force;
            var player = goog$dom$getElement(config.attrs.id);
            var container = player ? player.parentNode : null;
            if (!player || !container) {
                yt$setTimeout(function () {
                    yt$flash$update(config);
                }, 50);
            } else {
                if (window != window.top) {
                    var framer = null;
                    if (document.referrer) {
                        var referrer = document.referrer.substring(0, 128);
                        if (!yt$uri$isYouTubeOrGoogleUrl(referrer)) {
                            framer = referrer;
                        }
                    } else {
                        framer = "unknown";
                    }
                    if (framer) {
                        rewrite = true;
                        config.args.framer = framer;
                    }
                }
                yt$flash$detectVersion_(function (detector) {
                    if (detector.isSupported(config.minVersion)) {
                        var currentSrc = "";
                        if (!(navigator.userAgent.indexOf("Sony/COM2") > -1)) {
                            currentSrc = player.src || player.movie;
                        }
                        if (yt$flash$FlashDetector$isAs3Capable_(detector)) {
                            if (currentSrc != config.url || rewrite) {
                                yt$flash$writeEmbedHtml_(container, config.url, config);
                            }
                        } else if (yt$flash$FlashDetector$isDeviceSupported_(detector)) {
                            if (currentSrc != config.urlV9As2 || rewrite) {
                                yt$flash$writeEmbedHtml_(container, config.urlV9As2, config);
                            }
                        } else if (currentSrc != config.urlV8 || rewrite) {
                            yt$flash$writeEmbedHtml_(container, config.urlV8, config);
                            if ((detector = goog$dom$getElement("flash10-promo-div"))) {
                                yt$style$show(detector);
                                detector = yt$prefs$UserPrefs.getInstance();
                                currentSrc = parseInt(detector.get("ftuc") || 0, 10) + 1;
                                detector.set("ftuc", currentSrc);
                                detector.save();
                            }
                        }
                    } else if (yt$IS_JSCRIPT_ && detector.isSupported(6, 0, 65)) {
                        detector = new yt$player$Config({
                            url: "//s.ytimg.com/yt/swf/expressInstall-vflIE9HEf.swf",
                            args: {
                                MMredirectURL: window.location,
                                MMplayerType: "ActiveX",
                                MMdoctitle: document.title
                            }
                        });
                        yt$flash$writeEmbedHtml_(container, detector.url, detector);
                    } else if (detector.major_ == 0 && config.fallback) {
                        config.fallback();
                    } else if (detector.major_ == 0 && config.fallbackMessage) {
                        config.fallbackMessage();
                    } else {
                        container.innerHTML = '<div id="flash-upgrade">' + yt$getMsg("FLASH_UPGRADE") + "</div>";
                    }
                });
            }
        }
    };
    var yt$flash$detectVersion_ = function (callback) {
        yt$flash$FlashDetector.getInstance().load(function (detector) {
            var prefs = yt$prefs$UserPrefs.getInstance();
            prefs.set("fv", [detector.major_, detector.minor_, detector.rev].join("."));
            prefs.save();
            callback(detector);
        });
    };
    var goog$Disposable = function () {};
    var goog$pubsub$PubSub = function () {
        this.subscriptions_ = [];
        this.topics_ = {};
    };
    goog$inherits(goog$pubsub$PubSub, goog$Disposable);
    goog$pubsub$PubSub.prototype.key_ = 1;
    goog$pubsub$PubSub.prototype.publishDepth_ = 0;
    goog$pubsub$PubSub.prototype.subscribe_ = function (topic, fn, context) {
        var keys = this.topics_[topic];
        if (!keys) {
            keys = this.topics_[topic] = [];
        }
        var key = this.key_;
        this.subscriptions_[key] = topic;
        this.subscriptions_[key + 1] = fn;
        this.subscriptions_[key + 2] = context;
        this.key_ = key + 3;
        keys.push(key);
        return key;
    };
    goog$pubsub$PubSub.prototype.unsubscribeByKey_ = function (key) {
        if (this.publishDepth_ != 0) {
            if (!this.pendingKeys_) {
                this.pendingKeys_ = [];
            }
            this.pendingKeys_.push(key);
            return false;
        }
        var topic = this.subscriptions_[key];
        if (topic) {
            var keys = this.topics_[topic];
            if (keys) {
                var index = goog$array$indexOf(keys, key);
                if (index >= 0) {
                    goog$array$removeAt(keys, index);
                }
            }
            delete this.subscriptions_[key];
            delete this.subscriptions_[key + 1];
            delete this.subscriptions_[key + 2];
        }
        return !!topic;
    };
    goog$pubsub$PubSub.prototype.publish_ = function (topic, var_args) {
        var keys = this.topics_[topic];
        if (keys) {
            this.publishDepth_++;
            var args = goog$array$slice(arguments, 1);
            for (var i = 0, len = keys.length; i < len; i++) {
                var key = keys[i];
                this.subscriptions_[key + 1].apply(this.subscriptions_[key + 2], args);
            }
            this.publishDepth_--;
            if (this.pendingKeys_ && this.publishDepth_ == 0) {
                while ((keys = this.pendingKeys_.pop())) {
                    this.unsubscribeByKey_(keys);
                }
            }
            return i != 0;
        }
        return false;
    };
    goog$pubsub$PubSub.prototype.clear = function (opt_topic) {
        if (opt_topic) {
            var b = this.topics_[opt_topic];
            if (b) {
                goog$array$forEach(b, this.unsubscribeByKey_, this);
                delete this.topics_[opt_topic];
            }
        } else {
            this.subscriptions_.length = 0;
            this.topics_ = {};
        }
    };
    goog$pubsub$PubSub.prototype.getCount = function (opt_topic) {
        if (opt_topic) {
            var b = this.topics_[opt_topic];
            if (b) {
                return b.length;
            } else {
                return 0;
            }
        }
        opt_topic = 0;
        for (b in this.topics_) {
            opt_topic += this.getCount(b);
        }
        return opt_topic;
    };
    var yt$pubsub$instance_ = goog$getObjectByName("yt.pubsub.instance_") || new goog$pubsub$PubSub();
    goog$pubsub$PubSub.prototype.subscribe = goog$pubsub$PubSub.prototype.subscribe_;
    goog$pubsub$PubSub.prototype.unsubscribeByKey = goog$pubsub$PubSub.prototype.unsubscribeByKey_;
    goog$pubsub$PubSub.prototype.publish = goog$pubsub$PubSub.prototype.publish_;
    goog$pubsub$PubSub.prototype.clear = goog$pubsub$PubSub.prototype.clear;
    goog$exportSymbol("yt.pubsub.instance_", yt$pubsub$instance_);
    var yt$pubsub$subscribe = function (topic, fn, context) {
        var pubsub = goog$getObjectByName("yt.pubsub.instance_");
        if (pubsub) {
            return pubsub.subscribe(
                topic,
                function () {
                    var args = arguments;
                    yt$setTimeout(function () {
                        fn.apply(context || goog$global, args);
                    }, 0);
                },
                context
            );
        } else {
            return 0;
        }
    };
    var yt$pubsub$publish = function (topic, var_args) {
        var pubsub = goog$getObjectByName("yt.pubsub.instance_");
        if (pubsub) {
            return pubsub.publish.apply(pubsub, arguments);
        } else {
            return false;
        }
    };
    var yt$history$instance_;
    var yt$history$History = function (callback, iframe, win) {
        this.callback_ = callback;
        if (yt$history$History$USE_IFRAME_) {
            this.frame_ = iframe;
        }
        this.window_ = win || window;
        this.location_ = this.window_.location;
        this.baseUrl_noHash_ = this.location_.href.split("#")[0];
        this.checkBound_ = goog$bind(this.check_, this);
    };
    var yt$history$History$HASHCHANGE_SUPPORTED_ =
        (goog$userAgent$IE && document.documentMode >= 8) ||
        (goog$userAgent$GECKO && goog$userAgent$isVersion("1.9.2")) ||
        (goog$userAgent$WEBKIT && goog$userAgent$isVersion("532.1"));
    var yt$history$History$USE_IFRAME_ = goog$userAgent$IE && !yt$history$History$HASHCHANGE_SUPPORTED_;
    yt$history$History.prototype.setEnabled_ = function (enabled, skipInitialCallback) {
        if (this.hashchangeKey_) {
            yt$events$unlistenByKey(this.hashchangeKey_);
            delete this.hashchangeKey_;
        }
        if (this.pollInterval_) {
            yt$clearInterval(this.pollInterval_);
            delete this.pollInterval_;
        }
        if (enabled) {
            this.currentHash_ = yt$history$History$getLocationHash_(this);
            if (yt$history$History$USE_IFRAME_) {
                var iframeBody = this.frame_.contentWindow.document.body;
                if (!iframeBody || !iframeBody.innerHTML) {
                    yt$history$History$setIframeHash_(this, this.currentHash_);
                }
            }
            if (!skipInitialCallback) {
                this.callback_(this.currentHash_);
            }
            if (yt$history$History$HASHCHANGE_SUPPORTED_) {
                this.hashchangeKey_ = yt$events$listen(this.window_, "hashchange", this.checkBound_);
            } else {
                this.pollInterval_ = yt$setInterval(this.checkBound_, 200);
            }
        }
    };
    yt$history$History.prototype.check_ = function () {
        if (yt$history$History$USE_IFRAME_) {
            var hash;
            hash = (hash = this.frame_.contentWindow.document.body)
                ? decodeURIComponent(hash.innerHTML.substring(1).replace(/\+/g, " "))
                : "";
            if (hash != this.currentHash_) {
                this.currentHash_ = hash;
                yt$history$History$setLocationHash_(this, hash);
                this.callback_(hash);
            } else {
                hash = yt$history$History$getLocationHash_(this);
                if (hash != this.currentHash_) {
                    this.currentHash_ = hash;
                    yt$history$History$setIframeHash_(this, hash);
                    this.callback_(hash);
                }
            }
        } else {
            hash = yt$history$History$getLocationHash_(this);
            if (hash != this.currentHash_) {
                this.currentHash_ = hash;
                this.callback_(hash);
            }
        }
    };
    var yt$history$History$getLocationHash_ = function (self) {
        var self = self.location_.href;
        var index = self.indexOf("#");
        if (index < 0) {
            return "";
        } else {
            return self.substring(index + 1);
        }
    };
    var yt$history$History$setLocationHash_ = function (self, hash) {
        var newUrl = self.baseUrl_noHash_ + "#" + hash;
        var currentUrl = self.location_.href;
        if (currentUrl != newUrl && currentUrl + "#" != newUrl) {
            self.location_.href = newUrl;
        }
    };
    var yt$history$History$setIframeHash_ = function (self, hash) {
        var doc = self.frame_.contentWindow.document;
        var html = doc.body ? doc.body.innerHTML : "";
        var encodedHash = "#" + goog$string$urlEncode(hash);
        if (html != encodedHash) {
            html = [
                "<title>",
                goog$string$htmlEscape(window.document.title || ""),
                "</title><body>",
                encodedHash,
                "</body>"
            ];
            doc.open("text/html");
            doc.write(html.join(""));
            doc.close();
        }
    };
    yt$history$History.prototype.add = function (hash, unused, skipCallback) {
        this.currentHash_ = "" + hash;
        if (yt$history$History$USE_IFRAME_) {
            yt$history$History$setIframeHash_(this, hash);
        }
        yt$history$History$setLocationHash_(this, hash);
        if (!skipCallback) {
            this.callback_(this.currentHash_);
        }
    };
    var goog$debug$RelativeTimeProvider = function () {
        this.startTime_ = goog$now();
    };
    var goog$debug$RelativeTimeProvider$defaultInstance_ = new goog$debug$RelativeTimeProvider();
    goog$debug$RelativeTimeProvider.prototype.set = function (timeStamp) {
        this.startTime_ = timeStamp;
    };
    goog$debug$RelativeTimeProvider.prototype.reset = function () {
        this.set(goog$now());
    };
    goog$debug$RelativeTimeProvider.prototype.get = function () {
        return this.startTime_;
    };
    var goog$debug$Formatter = function (opt_prefix) {
        this.prefix_ = opt_prefix || "";
        this.startTimeProvider_ = goog$debug$RelativeTimeProvider$defaultInstance_;
    };
    goog$debug$Formatter.prototype.showAbsoluteTime = true;
    goog$debug$Formatter.prototype.showRelativeTime = true;
    goog$debug$Formatter.prototype.showLoggerName = true;
    goog$debug$Formatter.prototype.showExceptionText = false;
    goog$debug$Formatter.prototype.showSeverityLevel = false;
    var goog$debug$Formatter$getTwoDigitString_ = function (n) {
        if (n < 10) {
            return "0" + n;
        } else {
            return "" + n;
        }
    };
    var goog$debug$Formatter$getRelativeTime_ = function (logRecord, relativeTimeStart) {
        var c = (logRecord.time_ - relativeTimeStart) / 1000;
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
    var goog$debug$TextFormatter = function (opt_prefix) {
        goog$debug$Formatter.call(this, opt_prefix);
    };
    goog$inherits(goog$debug$TextFormatter, goog$debug$Formatter);
    var goog$debug$getStacktrace = function (opt_fn) {
        return goog$debug$getStacktraceHelper_(opt_fn || arguments.callee.caller, []);
    };
    var goog$debug$getStacktraceHelper_ = function (fn, visited) {
        var c = [];
        if (goog$array$contains(visited, fn)) {
            c.push("[...circular reference...]");
        } else if (fn && visited.length < 50) {
            c.push(goog$debug$getFunctionName(fn) + "(");
            for (var d = fn.arguments, e = 0; e < d.length; e++) {
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
            visited.push(fn);
            c.push(")\n");
            try {
                c.push(goog$debug$getStacktraceHelper_(fn.caller, visited));
            } catch (g) {
                c.push("[exception trying to get caller]\n");
            }
        } else if (fn) {
            c.push("[...long stack...]");
        } else {
            c.push("[end]");
        }
        return c.join("");
    };
    var goog$debug$getFunctionName = function (fn) {
        if (goog$debug$fnNameCache_[fn]) {
            return goog$debug$fnNameCache_[fn];
        }
        fn = "" + fn;
        if (!goog$debug$fnNameCache_[fn]) {
            var b = /function ([^\(]+)/.exec(fn);
            goog$debug$fnNameCache_[fn] = b ? b[1] : "[Anonymous]";
        }
        return goog$debug$fnNameCache_[fn];
    };
    var goog$debug$fnNameCache_ = {};
    var goog$debug$LogRecord = function (level, msg, loggerName, opt_time, opt_sequenceNumber) {
        this.reset(level, msg, loggerName, opt_time, opt_sequenceNumber);
    };
    goog$debug$LogRecord.prototype.exception_ = null;
    goog$debug$LogRecord.prototype.exceptionText_ = null;
    var goog$debug$LogRecord$nextSequenceNumber_ = 0;
    goog$debug$LogRecord.prototype.reset = function (level, msg, loggerName, opt_time, opt_sequenceNumber) {
        if (typeof opt_sequenceNumber != "number") {
            goog$debug$LogRecord$nextSequenceNumber_++;
        }
        this.time_ = opt_time || goog$now();
        this.level_ = level;
        this.msg_ = msg;
        this.loggerName_ = loggerName;
        delete this.exception_;
        delete this.exceptionText_;
    };
    goog$debug$LogRecord.prototype.getLevel = function () {
        return this.level_;
    };
    goog$debug$LogRecord.prototype.setLevel = function (level) {
        this.level_ = level;
    };
    goog$debug$LogRecord.prototype.getMessage = function () {
        return this.msg_;
    };
    var goog$debug$Logger = function (name) {
        this.name_ = name;
    };
    goog$debug$Logger.prototype.parent_ = null;
    goog$debug$Logger.prototype.level_ = null;
    goog$debug$Logger.prototype.children_ = null;
    goog$debug$Logger.prototype.handlers_ = null;
    var goog$debug$Logger$Level = function (name, value) {
        this.name = name;
        this.value = value;
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
        return this.name_;
    };
    goog$debug$Logger.prototype.getParent = function () {
        return this.parent_;
    };
    goog$debug$Logger.prototype.setLevel = function (level) {
        this.level_ = level;
    };
    goog$debug$Logger.prototype.getLevel = function () {
        return this.level_;
    };
    var goog$debug$Logger$getEffectiveLevel = function (self) {
        if (self.level_) {
            return self.level_;
        }
        if (self.parent_) {
            return goog$debug$Logger$getEffectiveLevel(self.parent_);
        }
        goog$asserts$fail("Root logger has no level set.");
        return null;
    };
    goog$debug$Logger.prototype.log = function (level, msg, opt_exception) {
        if (level.value >= goog$debug$Logger$getEffectiveLevel(this).value) {
            level = this.getLogRecord(level, msg, opt_exception);
            msg = "log:" + level.getMessage();
            if (goog$global.console) {
                if (goog$global.console.timeStamp) {
                    goog$global.console.timeStamp(msg);
                } else if (goog$global.console.markTimeline) {
                    goog$global.console.markTimeline(msg);
                }
            }
            if (goog$global.msWriteProfilerMark) {
                goog$global.msWriteProfilerMark(msg);
            }
            for (msg = this; msg;) {
                var opt_exception = msg;
                var d = level;
                if (opt_exception.handlers_) {
                    for (var e = 0, f = undefined; (f = opt_exception.handlers_[e]); e++) {
                        f(d);
                    }
                }
                msg = msg.getParent();
            }
        }
    };
    goog$debug$Logger.prototype.getLogRecord = function (level, msg, opt_exception) {
        var d = new goog$debug$LogRecord(level, "" + msg, this.name_);
        if (opt_exception) {
            d.exception_ = opt_exception;
            var e;
            var f = arguments.callee.caller;
            try {
                var g;
                var j = goog$getObjectByName("window.location.href");
                if (goog$isString(opt_exception)) {
                    g = {
                        message: opt_exception,
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
                        o = opt_exception.lineNumber || opt_exception.lineAlias_ || "Not available";
                    } catch (F) {
                        o = "Not available";
                        C = true;
                    }
                    try {
                        x = opt_exception.fileName || opt_exception.filename || opt_exception.sourceURL || j;
                    } catch (I) {
                        x = "Not available";
                        C = true;
                    }
                    g =
                        C || !opt_exception.lineNumber || !opt_exception.fileName || !opt_exception.stack
                            ? {
                                  message: opt_exception.message,
                                  name: opt_exception.name,
                                  lineNumber: o,
                                  fileName: x,
                                  stack: opt_exception.stack || "Not available"
                              }
                            : opt_exception;
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
            d.exceptionText_ = e;
        }
        return d;
    };
    goog$debug$Logger.prototype.info = function (msg, opt_exception) {
        this.log(goog$debug$Logger$Level$INFO, msg, opt_exception);
    };
    var goog$debug$LogManager$loggers_ = {};
    var goog$debug$LogManager$rootLogger_ = null;
    var goog$debug$LogManager$initialize = function () {
        if (!goog$debug$LogManager$rootLogger_) {
            goog$debug$LogManager$rootLogger_ = new goog$debug$Logger("");
            goog$debug$LogManager$loggers_[""] = goog$debug$LogManager$rootLogger_;
            goog$debug$LogManager$rootLogger_.setLevel(goog$debug$Logger$Level$CONFIG);
        }
    };
    var goog$debug$LogManager$getLogger = function (name) {
        goog$debug$LogManager$initialize();
        var b;
        if (!(b = goog$debug$LogManager$loggers_[name])) {
            b = new goog$debug$Logger(name);
            var c = name.lastIndexOf(".");
            var d = name.substr(c + 1);
            var c = goog$debug$LogManager$getLogger(name.substr(0, c));
            if (!c.children_) {
                c.children_ = {};
            }
            c.children_[d] = b;
            b.parent_ = c;
            goog$debug$LogManager$loggers_[name] = b;
        }
        return b;
    };
    var goog$debug$Console = function () {
        this.publishHandler_ = goog$bind(this.addLogRecord, this);
        this.formatter_ = new goog$debug$TextFormatter();
        this.formatter_.showAbsoluteTime = false;
        this.isCapturing_ = this.formatter_.showExceptionText = false;
        this.logBuffer_ = "";
        this.filteredLoggers_ = {};
    };
    var goog$debug$Console$startCapturing_ = function () {
        var console = goog$debug$Console$instance;
        if (true != console.isCapturing_) {
            goog$debug$LogManager$initialize();
            var rootLogger = goog$debug$LogManager$rootLogger_;
            var handler = console.publishHandler_;
            if (!rootLogger.handlers_) {
                rootLogger.handlers_ = [];
            }
            rootLogger.handlers_.push(handler);
            console.isCapturing_ = true;
        }
    };
    goog$debug$Console.prototype.addLogRecord = function (logRecord) {
        if (!this.filteredLoggers_[logRecord.loggerName_]) {
            var b;
            b = this.formatter_;
            var c = [];
            c.push(b.prefix_, " ");
            if (b.showAbsoluteTime) {
                var d = new Date(logRecord.time_);
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
            if (b.showRelativeTime) {
                c.push("[", goog$debug$Formatter$getRelativeTime_(logRecord, b.startTimeProvider_.get()), "s] ");
            }
            if (b.showLoggerName) {
                c.push("[", logRecord.loggerName_, "] ");
            }
            if (b.showSeverityLevel) {
                c.push("[", logRecord.getLevel().name, "] ");
            }
            c.push(logRecord.getMessage(), "\n");
            if (b.showExceptionText && logRecord.exception_) {
                c.push(logRecord.exceptionText_, "\n");
            }
            b = c.join("");
            if (goog$debug$Console$console_ && goog$debug$Console$console_.firebug) {
                switch (logRecord.getLevel()) {
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
                this.logBuffer_ += b;
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
    var yt$history$StateMonitor$log_ = function (msg) {
        if (!yt$history$StateMonitor$logger_) {
            goog$debug$Console$autoInstall();
            goog$debug$Console$startCapturing_();
            goog$debug$Console$instance.formatter_.showExceptionText = true;
            yt$history$StateMonitor$logger_ = goog$debug$LogManager$getLogger("yt.debug");
            yt$history$StateMonitor$logger_.setLevel(goog$debug$Logger$Level$INFO);
        }
        yt$history$StateMonitor$logger_.log(goog$debug$Logger$Level$INFO, "yt.history.StateMonitor: " + msg, undefined);
    };
    var yt$history$StateMonitor = function (callback, win) {
        this.callback_ = callback;
        this.window_ = win || window;
        this.location_ = this.window_.location;
        this.handlePopStateBound_ = goog$bind(this.handlePopState_, this);
    };
    var yt$history$StateMonitor$SUPPORTED_ =
        !!window.history.pushState &&
        (!goog$userAgent$WEBKIT || (goog$userAgent$WEBKIT && goog$userAgent$isVersion("534.11")));
    yt$history$StateMonitor.prototype.setEnabled_ = function (enabled, skipInitialCallback) {
        yt$history$StateMonitor$log_("setEnabled " + enabled);
        if (this.popstateKey_) {
            yt$events$unlistenByKey(this.popstateKey_);
            delete this.popstateKey_;
        }
        if (this.pollInterval_) {
            yt$clearInterval(this.pollInterval_);
            delete this.pollInterval_;
        }
        if (!enabled || !yt$history$StateMonitor$SUPPORTED_) {
            yt$history$StateMonitor$log_("disabling (supported = " + yt$history$StateMonitor$SUPPORTED_ + ")");
        } else {
            yt$history$StateMonitor$log_("enabling");
            this.currentUrl_ = this.location_.href;
            if (!skipInitialCallback) {
                this.callback_(this.currentUrl_);
            }
            this.popstateKey_ = yt$events$listen(this.window_, "popstate", this.handlePopStateBound_);
        }
    };
    yt$history$StateMonitor.prototype.handlePopState_ = function (event) {
        var url = this.location_.href;
        var event = event.state;
        yt$history$StateMonitor$log_("handlePopState_ " + url + " " + event);
        if (event || url != this.currentUrl_) {
            yt$history$StateMonitor$log_("handlePopState_ navCallback");
            this.currentUrl_ = url;
            this.callback_(url, event);
        }
    };
    yt$history$StateMonitor.prototype.add = function (url, state, skipCallback) {
        if (url || state) {
            url = url || this.location_.href;
            this.window_.history.pushState(state, "", url);
            this.currentUrl_ = url;
            if (!skipCallback) {
                this.callback_(url, state);
            }
        }
    };
    var yt$history$getInstance = function (type) {
        var type = type || "hash";
        var instance = goog$getObjectByName("yt.history.instance_");
        if (!instance) {
            if (type == "state") {
                instance = new yt$history$StateMonitor(yt$history$publishNavigate_);
                yt$history$StateMonitor.prototype.setEnabled = yt$history$StateMonitor.prototype.setEnabled_;
                yt$history$StateMonitor.prototype.add = yt$history$StateMonitor.prototype.add;
            } else {
                instance = new yt$history$History(
                    yt$history$publishNavigate_,
                    goog$dom$getElement("legacy-history-iframe")
                );
                yt$history$History.prototype.setEnabled = yt$history$History.prototype.setEnabled_;
                yt$history$History.prototype.add = yt$history$History.prototype.add;
            }
            yt$history$instance_ = instance;
            goog$exportSymbol("yt.history.instance_", yt$history$instance_);
        }
        return instance;
    };
    var yt$history$publishNavigate_ = function (url, state) {
        yt$pubsub$publish("navigate", url, state);
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
    var yt$net$apiloader$exportLoadedCallback_ = function (api) {
        goog$exportSymbol("yt.net.apiloader.onApiLoaded_" + api, function () {
            yt$net$apiloader$onApiLoaded_(api);
        });
    };
    var yt$net$apiloader$onApiLoaded_ = function (api) {
        yt$net$apiloader$loaded_[api] = true;
        goog$array$forEach(yt$net$apiloader$callbacks_[api], function (callback) {
            callback.call();
        });
        delete yt$net$apiloader$callbacks_[api];
    };
    var yt$net$apiloader$load = function (api, callback) {
        var url = yt$net$apiloader$API_URLS_[api];
        if (url) {
            if (yt$net$apiloader$loaded_[api]) {
                callback.call();
            } else {
                if (!yt$net$apiloader$callbacks_[api]) {
                    yt$net$apiloader$callbacks_[api] = [];
                }
                yt$net$apiloader$callbacks_[api].push(callback);
                if (!yt$net$apiloader$requested_[api]) {
                    yt$net$apiloader$exportLoadedCallback_(api);
                    var url = yt$uri$appendQueryData(url, {
                        callback: "yt.net.apiloader.onApiLoaded_" + api
                    });
                    var script = document.createElement("script");
                    script.src = url;
                    document.body.appendChild(script);
                    yt$net$apiloader$requested_[api] = true;
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
    var goog$json$parse = function (s) {
        s = "" + s;
        if (
            /^\s*$/.test(s)
                ? 0
                : /^[\],:{}\s\u2028\u2029]*$/.test(
                      s
                          .replace(/\\["\\\/bfnrtu]/g, "@")
                          .replace(
                              /"[^"\\\n\r\u2028\u2029\x00-\x08\x10-\x1f\x80-\x9f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                              "]"
                          )
                          .replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, "")
                  )
        ) {
            try {
                return eval("(" + s + ")");
            } catch (b) {}
        }
        throw Error("Invalid JSON string: " + s);
    };
    var goog$json$unsafeParse = function (s) {
        return eval("(" + s + ")");
    };
    var goog$json$Serializer = function (opt_replacer) {
        this.replacer_ = opt_replacer;
    };
    var goog$json$Serializer$serialize = function (self, object) {
        var c = [];
        goog$json$Serializer$serialize_(self, object, c);
        return c.join("");
    };
    var goog$json$Serializer$serialize_ = function (self, object, sb) {
        switch (typeof object) {
            case "string":
                goog$json$Serializer$serializeString_(object, sb);
                break;
            case "number":
                sb.push(isFinite(object) && !isNaN(object) ? object : "null");
                break;
            case "boolean":
                sb.push(object);
                break;
            case "undefined":
                sb.push("null");
                break;
            case "object":
                if (object == null) {
                    sb.push("null");
                    break;
                }
                if (goog$isArray(object)) {
                    var d = object.length;
                    sb.push("[");
                    var e = "";
                    for (var f = 0; f < d; f++) {
                        sb.push(e);
                        e = object[f];
                        goog$json$Serializer$serialize_(
                            self,
                            self.replacer_ ? self.replacer_.call(object, "" + f, e) : e,
                            sb
                        );
                        e = ",";
                    }
                    sb.push("]");
                    break;
                }
                sb.push("{");
                d = "";
                for (f in object) {
                    if (Object.prototype.hasOwnProperty.call(object, f)) {
                        e = object[f];
                        if (typeof e != "function") {
                            sb.push(d);
                            goog$json$Serializer$serializeString_(f, sb);
                            sb.push(":");
                            goog$json$Serializer$serialize_(
                                self,
                                self.replacer_ ? self.replacer_.call(object, f, e) : e,
                                sb
                            );
                            d = ",";
                        }
                    }
                }
                sb.push("}");
                break;
            case "function":
                break;
            default:
                throw Error("Unknown type: " + typeof object);
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
    var goog$json$Serializer$serializeString_ = function (s, sb) {
        sb.push(
            '"',
            s.replace(goog$json$Serializer$charsToReplace_, function (ch) {
                if (ch in goog$json$Serializer$charToJsonCharCache_) {
                    return goog$json$Serializer$charToJsonCharCache_[ch];
                }
                var code = ch.charCodeAt(0);
                var escaped = "\\u";
                if (code < 16) {
                    escaped += "000";
                } else if (code < 256) {
                    escaped += "00";
                } else if (code < 4096) {
                    escaped += "0";
                }
                return (goog$json$Serializer$charToJsonCharCache_[ch] = escaped + code.toString(16));
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
    var yt$net$ajax$isSuccess_ = function (xhr) {
        switch (xhr && "status" in xhr ? xhr.status : -1) {
            case 0:
            case 200:
            case 204:
            case 304:
                return true;
            default:
                return false;
        }
    };
    var yt$net$ajax$send_ = function (url, callback, method, body, headers) {
        var xhr = yt$net$ajax$createXhr_ && yt$net$ajax$createXhr_();
        if ("open" in xhr) {
            xhr.onreadystatechange = function () {
                if ((xhr && "readyState" in xhr ? xhr.readyState : 0) == 4 && callback) {
                    callback(xhr);
                }
            };
            method = (method || "GET").toUpperCase();
            body = body || "";
            xhr.open(method, url, true);
            url = method == "POST";
            if (headers) {
                for (var header in headers) {
                    xhr.setRequestHeader(header, headers[header]);
                    if (header.toLowerCase() == "content-type") {
                        url = false;
                    }
                }
            }
            if (url) {
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }
            xhr.send(body);
            return xhr;
        }
    };
    var yt$net$ajax$send = function (url, options) {
        var format = options.format || "JSON";
        if (options.absoluteUrl) {
            url = document.location.protocol + "//" + document.location.hostname + url;
        }
        var params = options.urlParams;
        if (params) {
            url = yt$uri$setQueryData(url, params);
        }
        var body = options.requestBody || "";
        if ((params = options.postParams)) {
            body = yt$uri$parseQueryData(body);
            goog$object$extend(body, params);
            body = yt$uri$buildQueryData(body);
        }
        yt$net$ajax$send_(
            url,
            function (xhr) {
                var success = yt$net$ajax$isSuccess_(xhr);
                var response = null;
                if (success || (xhr.status >= 400 && xhr.status < 500)) {
                    response = yt$net$ajax$parseResponse_(format, xhr);
                }
                if (success) {
                    a: {
                        switch (format) {
                            case "XML":
                                success = parseInt(response && response.return_code, 10) == 0;
                                break a;
                            case "RAW":
                                success = true;
                                break a;
                        }
                        success = !!response;
                    }
                }
                var response = response || {};
                var context = options.context || goog$global;
                if (success) {
                    if (options.onSuccess) {
                        options.onSuccess.call(context, xhr, response);
                    }
                } else if (options.onFail) {
                    options.onFail.call(context, xhr, response);
                }
                if (options.onFinish) {
                    options.onFinish.call(context, xhr, response);
                }
            },
            options.method,
            body,
            options.headers
        );
    };
    var yt$net$ajax$sendForm = function (form, options) {
        var opts = options || {};
        opts.method = form.method.toUpperCase();
        if (opts.method == "POST") {
            opts.requestBody = goog$dom$forms$getFormDataString(form);
        } else {
            var formData = goog$structs$Map$toObject(goog$dom$forms$getFormDataMap(form));
            var params = opts.urlParams || {};
            goog$object$extend(params, formData);
            opts.urlParams = params;
        }
        yt$net$ajax$send(form.action, opts);
    };
    var yt$net$ajax$parseResponse_ = function (format, xhr) {
        var result = null;
        switch (format) {
            case "JSON":
                var text = xhr.responseText;
                var contentType = xhr.getResponseHeader("Content-Type") || "";
                if (text && contentType.indexOf("json") >= 0) {
                    result = goog$json$unsafeParse(text);
                }
                break;
            case "XML":
                if ((text = (text = xhr.responseXML) ? yt$net$ajax$getRootNode(text) : null)) {
                    result = {};
                    goog$array$forEach(text.getElementsByTagName("*"), function (node) {
                        result[node.tagName] = yt$net$ajax$getTextContent_(node);
                    });
                }
        }
        return result;
    };
    var yt$net$ajax$sendRequest = function (url, options) {
        var onComplete = options.onComplete || null;
        var onException = options.onException || null;
        var onError = options.onError || null;
        var updateId = options.update || null;
        var isJson = options.json || false;
        return yt$net$ajax$send_(
            url,
            function (xhr) {
                if (yt$net$ajax$isSuccess_(xhr)) {
                    var hasXml = xhr.responseXML;
                    var root = hasXml ? yt$net$ajax$getRootNode(hasXml) : null;
                    var hasXml = !!hasXml && !!root;
                    var returnCode;
                    var htmlContent;
                    if (
                        hasXml &&
                        ((returnCode = yt$net$ajax$getNodeValue(root, "return_code")),
                        (htmlContent = yt$net$ajax$getNodeValue(root, "html_content")),
                        returnCode == 0)
                    ) {
                        if (updateId && htmlContent) {
                            goog$dom$getElement(updateId).innerHTML = htmlContent;
                        }
                        var jsContent = yt$net$ajax$getNodeValue(root, "js_content");
                        if (jsContent) {
                            var script = document.createElement("script");
                            script.text = jsContent;
                            document.getElementsByTagName("head")[0].appendChild(script);
                        }
                    }
                    if (onComplete) {
                        if (hasXml) {
                            hasXml = yt$net$ajax$getNodeValue(root, "redirect_on_success");
                            if (returnCode && hasXml) {
                                window.location = hasXml;
                            } else {
                                if (
                                    (root = yt$net$ajax$getNodeValue(
                                        root,
                                        returnCode == 0 ? "success_message" : "error_message"
                                    ))
                                ) {
                                    alert(root);
                                }
                                xhr = isJson ? eval("(" + htmlContent + ")") : xhr;
                                if (returnCode == 0) {
                                    onComplete(xhr);
                                } else if (onException) {
                                    onException(xhr);
                                }
                            }
                        } else if (xhr.responseText) {
                            onComplete(xhr);
                        }
                    }
                } else if (onError) {
                    onError(xhr);
                }
            },
            options.method || "POST",
            options.postBody || null,
            options.headers || null
        );
    };
    var yt$net$ajax$getRootNode = function (xhrOrDoc) {
        if (!xhrOrDoc) {
            return null;
        } else if (
            (xhrOrDoc = ("responseXML" in xhrOrDoc ? xhrOrDoc.responseXML : xhrOrDoc).getElementsByTagName("root")) &&
            xhrOrDoc.length > 0
        ) {
            return xhrOrDoc[0];
        } else {
            return null;
        }
    };
    var yt$net$ajax$getNodeValue = function (root, tagName) {
        if (!root) {
            return null;
        }
        var nodes = root.getElementsByTagName(tagName);
        if (nodes && nodes.length > 0) {
            return yt$net$ajax$getTextContent_(nodes[0]);
        } else {
            return null;
        }
    };
    var yt$net$ajax$getTextContent_ = function (node) {
        var text = "";
        goog$array$forEach(node.childNodes, function (child) {
            text += child.nodeValue;
        });
        return text;
    };
    var yt$net$ajax$tokenMap_ = goog$getObjectByName("yt.net.ajax.tokenMap_") || {};
    goog$exportSymbol("yt.net.ajax.tokenMap_", yt$net$ajax$tokenMap_);
    var yt$net$ajax$setToken = function (name, token) {
        yt$net$ajax$tokenMap_[name] = token;
    };
    var yt$net$delayed$registry_ = {};
    var yt$net$delayed$loaded_ = {};
    var yt$net$delayed$register = function (element, src, groupKey) {
        element = goog$dom$getElement(element);
        groupKey = groupKey || goog$getUid(element);
        if (!(groupKey in yt$net$delayed$registry_)) {
            yt$net$delayed$registry_[groupKey] = [];
        }
        yt$net$delayed$registry_[groupKey].push([element, src]);
        yt$net$delayed$loaded_[groupKey] = false;
        return groupKey;
    };
    var yt$net$delayed$unregister = function (element, groupKey) {
        var element = goog$dom$getElement(element);
        var key = groupKey || goog$getUid(element);
        var entries = yt$net$delayed$registry_[key];
        if (entries) {
            yt$net$delayed$registry_[key] = goog$array$filter(entries, function (entry) {
                return entry[0] != element;
            });
        }
    };
    var yt$net$delayed$load = function (groupKey) {
        if (groupKey in yt$net$delayed$registry_ && !yt$net$delayed$loaded_[groupKey]) {
            goog$array$forEach(yt$net$delayed$registry_[groupKey], function (entry) {
                var img = entry[0];
                var entry = entry[1];
                if (img && img.tagName == "IMG") {
                    img.onload = "";
                    img.src = entry;
                }
            });
            yt$net$delayed$registry_[groupKey] = [];
            yt$net$delayed$loaded_[groupKey] = true;
        }
    };
    var yt$net$scriptloader$load = function (url, callback, force) {
        var id = "scriptload-" + goog$string$hashCode(url);
        var script = document.getElementById(id);
        var loaded = script && yt$dom$datasets$get(script, "loaded");
        var loading = script && !loaded;
        if (loaded && !force) {
            if (callback) {
                callback();
            }
            return script;
        }
        if (loading && !force) {
            if (callback) {
                yt$pubsub$subscribe(id, callback);
            }
            return script;
        }
        if (script) {
            id =
                "scriptload-" +
                (Math.floor(Math.random() * 2147483648).toString(36) +
                    Math.abs(Math.floor(Math.random() * 2147483648) ^ goog$now()).toString(36));
        }
        if (callback) {
            yt$pubsub$subscribe(id, callback);
        }
        var newScript = yt$net$scriptloader$createScript_(url, id, function () {
            if (!yt$dom$datasets$get(newScript, "loaded")) {
                yt$dom$datasets$set(newScript, "loaded", "true");
                yt$pubsub$publish(id);
                var topic = id;
                var pubsub = goog$getObjectByName("yt.pubsub.instance_");
                if (pubsub) {
                    pubsub.clear(topic);
                }
            }
        });
        return newScript;
    };
    var yt$net$scriptloader$createScript_ = function (url, id, onload) {
        var script = document.createElement("script");
        script.id = id;
        script.onload = onload;
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onload();
            }
        };
        script.src = url;
        url = document.getElementsByTagName("head")[0];
        url.insertBefore(script, url.firstChild);
        return script;
    };
    var yt$net$ping$images_ = {};
    var yt$net$ping$counter_ = 0;
    var yt$net$ping$send = function (url, callback) {
        var img = new Image();
        var key = "" + yt$net$ping$counter_++;
        yt$net$ping$images_[key] = img;
        img.onload = img.onerror = function () {
            if (callback && yt$net$ping$images_[key]) {
                callback();
            }
            delete yt$net$ping$images_[key];
        };
        img.src = url;
        img = eval("null");
    };
    var yt$tracking$track = function (action, params, callback) {
        yt$analytics$trackEvent(action, params || "null");
        action = "a=" + action + (params ? "&" + params : "").replace(/\//g, "&");
        yt$net$ping$send("/gen_204?" + action, callback);
    };
    var yt$tracking$share = function (service, videoId, locale, feature) {
        service = yt$uri$appendQueryData("/sharing_services", {
            name: service,
            v: videoId,
            locale: locale,
            feature: feature
        });
        yt$net$ping$send(service);
    };
    var goog$positioning$positionAtAnchor = function (
        anchorElement,
        anchorElementCorner,
        movableElement,
        movableElementCorner,
        opt_offset,
        opt_margin,
        opt_overflow
    ) {
        var moveableParentTopLeft;
        var parent = movableElement.offsetParent;
        if (parent) {
            var isBody = parent.tagName == "HTML" || parent.tagName == "BODY";
            if (!isBody || goog$style$getStyle_(parent, "position") != "static") {
                moveableParentTopLeft = goog$style$getPageOffset(parent);
                if (!isBody) {
                    moveableParentTopLeft = goog$math$Coordinate$difference(
                        moveableParentTopLeft,
                        new goog$math$Coordinate(parent.scrollLeft, parent.scrollTop)
                    );
                }
            }
        }
        parent = goog$style$getBounds(anchorElement);
        if ((isBody = goog$style$getVisibleRectForElement(anchorElement))) {
            var visibleRect = new goog$math$Rect(
                isBody.left,
                isBody.top,
                isBody.right - isBody.left,
                isBody.bottom - isBody.top
            );
            var isBody = Math.max(parent.left, visibleRect.left);
            var frame = Math.min(parent.left + parent.width, visibleRect.left + visibleRect.width);
            if (isBody <= frame) {
                var parentWin = Math.max(parent.top, visibleRect.top);
                var visibleRect = Math.min(parent.top + parent.height, visibleRect.top + visibleRect.height);
                if (parentWin <= visibleRect) {
                    parent.left = isBody;
                    parent.top = parentWin;
                    parent.width = frame - isBody;
                    parent.height = visibleRect - parentWin;
                }
            }
        }
        isBody = goog$dom$getDomHelper(anchorElement);
        parentWin = goog$dom$getDomHelper(movableElement);
        if (isBody.document_ != parentWin.document_) {
            var frame = isBody.document_.body;
            var parentWin = parentWin.document_.parentWindow || parentWin.document_.defaultView;
            var visibleRect = new goog$math$Coordinate(0, 0);
            var win = goog$dom$getOwnerDocument(frame)
                ? goog$dom$getOwnerDocument(frame).parentWindow || goog$dom$getOwnerDocument(frame).defaultView
                : window;
            var frameEl = frame;
            do {
                var pos = win == parentWin ? goog$style$getPageOffset(frameEl) : goog$style$getClientPosition(frameEl);
                visibleRect.x += pos.x;
                visibleRect.y += pos.y;
            } while (win && win != parentWin && (frameEl = win.frameElement) && (win = win.parent));
            frame = goog$math$Coordinate$difference(visibleRect, goog$style$getPageOffset(frame));
            if (goog$userAgent$IE && !goog$dom$DomHelper$isCss1CompatMode(isBody)) {
                frame = goog$math$Coordinate$difference(frame, goog$dom$DomHelper$getDocumentScroll(isBody));
            }
            parent.left += frame.x;
            parent.top += frame.y;
        }
        anchorElement =
            (anchorElementCorner & 4 && goog$style$isRightToLeft(anchorElement)
                ? anchorElementCorner ^ 2
                : anchorElementCorner) & -5;
        anchorElementCorner = new goog$math$Coordinate(
            anchorElement & 2 ? parent.left + parent.width : parent.left,
            anchorElement & 1 ? parent.top + parent.height : parent.top
        );
        if (moveableParentTopLeft) {
            anchorElementCorner = goog$math$Coordinate$difference(anchorElementCorner, moveableParentTopLeft);
        }
        if (opt_offset) {
            anchorElementCorner.x += (anchorElement & 2 ? -1 : 1) * opt_offset.x;
            anchorElementCorner.y += (anchorElement & 1 ? -1 : 1) * opt_offset.y;
        }
        var viewport;
        if (opt_overflow && (viewport = goog$style$getVisibleRectForElement(movableElement)) && moveableParentTopLeft) {
            viewport.top -= moveableParentTopLeft.y;
            viewport.right -= moveableParentTopLeft.x;
            viewport.bottom -= moveableParentTopLeft.y;
            viewport.left -= moveableParentTopLeft.x;
        }
        return goog$positioning$positionAtCoordinate(
            anchorElementCorner,
            movableElement,
            movableElementCorner,
            opt_margin,
            viewport,
            opt_overflow,
            undefined
        );
    };
    var goog$positioning$positionAtCoordinate = function (
        absolutePos,
        movableElement,
        movableElementCorner,
        opt_margin,
        opt_viewport,
        opt_overflow,
        opt_preferredSize
    ) {
        var absolutePos = absolutePos.clone();
        var j = 0;
        var o =
            (movableElementCorner & 4 && goog$style$isRightToLeft(movableElement)
                ? movableElementCorner ^ 2
                : movableElementCorner) & -5;
        var movableElementCorner = goog$style$getSize(movableElement);
        var opt_preferredSize = opt_preferredSize ? opt_preferredSize.clone() : movableElementCorner.clone();
        if (opt_margin || o != 0) {
            if (o & 2) {
                absolutePos.x -= opt_preferredSize.width + (opt_margin ? opt_margin.right : 0);
            } else if (opt_margin) {
                absolutePos.x += opt_margin.left;
            }
            if (o & 1) {
                absolutePos.y -= opt_preferredSize.height + (opt_margin ? opt_margin.bottom : 0);
            } else if (opt_margin) {
                absolutePos.y += opt_margin.top;
            }
        }
        if (opt_overflow) {
            if (opt_viewport) {
                j = absolutePos;
                opt_margin = 0;
                if ((opt_overflow & 65) == 65 && (j.x < opt_viewport.left || j.x >= opt_viewport.right)) {
                    opt_overflow &= -2;
                }
                if ((opt_overflow & 132) == 132 && (j.y < opt_viewport.top || j.y >= opt_viewport.bottom)) {
                    opt_overflow &= -5;
                }
                if (j.x < opt_viewport.left && opt_overflow & 1) {
                    j.x = opt_viewport.left;
                    opt_margin |= 1;
                }
                if (
                    j.x < opt_viewport.left &&
                    j.x + opt_preferredSize.width > opt_viewport.right &&
                    opt_overflow & 16
                ) {
                    opt_preferredSize.width = Math.max(
                        opt_preferredSize.width - (j.x + opt_preferredSize.width - opt_viewport.right),
                        0
                    );
                    opt_margin |= 4;
                }
                if (j.x + opt_preferredSize.width > opt_viewport.right && opt_overflow & 1) {
                    j.x = Math.max(opt_viewport.right - opt_preferredSize.width, opt_viewport.left);
                    opt_margin |= 1;
                }
                if (opt_overflow & 2) {
                    opt_margin |=
                        (j.x < opt_viewport.left ? 16 : 0) |
                        (j.x + opt_preferredSize.width > opt_viewport.right ? 32 : 0);
                }
                if (j.y < opt_viewport.top && opt_overflow & 4) {
                    j.y = opt_viewport.top;
                    opt_margin |= 2;
                }
                if (
                    j.y >= opt_viewport.top &&
                    j.y + opt_preferredSize.height > opt_viewport.bottom &&
                    opt_overflow & 32
                ) {
                    opt_preferredSize.height = Math.max(
                        opt_preferredSize.height - (j.y + opt_preferredSize.height - opt_viewport.bottom),
                        0
                    );
                    opt_margin |= 8;
                }
                if (j.y + opt_preferredSize.height > opt_viewport.bottom && opt_overflow & 4) {
                    j.y = Math.max(opt_viewport.bottom - opt_preferredSize.height, opt_viewport.top);
                    opt_margin |= 2;
                }
                if (opt_overflow & 8) {
                    opt_margin |=
                        (j.y < opt_viewport.top ? 64 : 0) |
                        (j.y + opt_preferredSize.height > opt_viewport.bottom ? 128 : 0);
                }
                j = opt_margin;
            } else {
                j = 256;
            }
            if (j & 496) {
                return j;
            }
        }
        opt_overflow = absolutePos;
        opt_viewport =
            goog$userAgent$GECKO &&
            (goog$userAgent$detectedMac_ || goog$userAgent$detectedX11_) &&
            goog$userAgent$isVersion("1.9");
        if (opt_overflow instanceof goog$math$Coordinate) {
            absolutePos = opt_overflow.x;
            opt_overflow = opt_overflow.y;
        } else {
            absolutePos = opt_overflow;
            opt_overflow = undefined;
        }
        movableElement.style.left = goog$style$getPixelStyleValue_(absolutePos, opt_viewport);
        movableElement.style.top = goog$style$getPixelStyleValue_(opt_overflow, opt_viewport);
        if (
            movableElementCorner != opt_preferredSize &&
            !(!movableElementCorner || !opt_preferredSize
                ? 0
                : movableElementCorner.width == opt_preferredSize.width &&
                  movableElementCorner.height == opt_preferredSize.height)
        ) {
            absolutePos = goog$dom$DomHelper$isCss1CompatMode(
                goog$dom$getDomHelper(goog$dom$getOwnerDocument(movableElement))
            );
            if (goog$userAgent$IE && (!absolutePos || !goog$userAgent$isVersion("8"))) {
                movableElementCorner = movableElement.style;
                if (absolutePos) {
                    if (goog$userAgent$IE) {
                        absolutePos = goog$style$getIePixelValue_(
                            movableElement,
                            goog$style$getCascadedStyle(movableElement, "paddingLeft")
                        );
                        opt_viewport = goog$style$getIePixelValue_(
                            movableElement,
                            goog$style$getCascadedStyle(movableElement, "paddingRight")
                        );
                        opt_overflow = goog$style$getIePixelValue_(
                            movableElement,
                            goog$style$getCascadedStyle(movableElement, "paddingTop")
                        );
                        opt_margin = goog$style$getIePixelValue_(
                            movableElement,
                            goog$style$getCascadedStyle(movableElement, "paddingBottom")
                        );
                        absolutePos = new goog$math$Box(opt_overflow, opt_viewport, opt_margin, absolutePos);
                    } else {
                        absolutePos = goog$style$getComputedStyle(movableElement, "paddingLeft");
                        opt_viewport = goog$style$getComputedStyle(movableElement, "paddingRight");
                        opt_overflow = goog$style$getComputedStyle(movableElement, "paddingTop");
                        opt_margin = goog$style$getComputedStyle(movableElement, "paddingBottom");
                        absolutePos = new goog$math$Box(
                            parseFloat(opt_overflow),
                            parseFloat(opt_viewport),
                            parseFloat(opt_margin),
                            parseFloat(absolutePos)
                        );
                    }
                    if (goog$userAgent$IE) {
                        opt_viewport = goog$style$getIePixelBorder_(movableElement, "borderLeft");
                        opt_overflow = goog$style$getIePixelBorder_(movableElement, "borderRight");
                        opt_margin = goog$style$getIePixelBorder_(movableElement, "borderTop");
                        movableElement = goog$style$getIePixelBorder_(movableElement, "borderBottom");
                        movableElement = new goog$math$Box(opt_margin, opt_overflow, movableElement, opt_viewport);
                    } else {
                        opt_viewport = goog$style$getComputedStyle(movableElement, "borderLeftWidth");
                        opt_overflow = goog$style$getComputedStyle(movableElement, "borderRightWidth");
                        opt_margin = goog$style$getComputedStyle(movableElement, "borderTopWidth");
                        movableElement = goog$style$getComputedStyle(movableElement, "borderBottomWidth");
                        movableElement = new goog$math$Box(
                            parseFloat(opt_margin),
                            parseFloat(opt_overflow),
                            parseFloat(movableElement),
                            parseFloat(opt_viewport)
                        );
                    }
                    movableElementCorner.pixelWidth =
                        opt_preferredSize.width -
                        movableElement.left -
                        absolutePos.left -
                        absolutePos.right -
                        movableElement.right;
                    movableElementCorner.pixelHeight =
                        opt_preferredSize.height -
                        movableElement.top -
                        absolutePos.top -
                        absolutePos.bottom -
                        movableElement.bottom;
                } else {
                    movableElementCorner.pixelWidth = opt_preferredSize.width;
                    movableElementCorner.pixelHeight = opt_preferredSize.height;
                }
            } else {
                movableElement = movableElement.style;
                if (goog$userAgent$GECKO) {
                    movableElement.MozBoxSizing = "border-box";
                } else if (goog$userAgent$WEBKIT) {
                    movableElement.WebkitBoxSizing = "border-box";
                } else {
                    movableElement.boxSizing = "border-box";
                }
                movableElement.width = Math.max(opt_preferredSize.width, 0) + "px";
                movableElement.height = Math.max(opt_preferredSize.height, 0) + "px";
            }
        }
        return j;
    };
    var yt$uix$eventPubSubs_ = {};
    var yt$uix$TOUCH_SUPPORTED_ = "ontouchstart" in document;
    var yt$uix$registerHandler_ = function (cssClass, eventType, handler, maxNumParents, checkRelatedTarget) {
        if (!(eventType in yt$uix$eventPubSubs_)) {
            yt$uix$eventPubSubs_[eventType] = new goog$pubsub$PubSub();
            yt$uix$eventPubSubs_[eventType].maxNumParents = {};
            yt$uix$eventPubSubs_[eventType].checkRelatedTarget = {};
        }
        eventType = yt$uix$eventPubSubs_[eventType];
        eventType.subscribe_(cssClass, handler);
        eventType.maxNumParents[cssClass] = maxNumParents;
        eventType.checkRelatedTarget[cssClass] = checkRelatedTarget;
    };
    var yt$uix$getMaxNumParents_ = function (eventType, cssClass) {
        var configured = yt$uix$eventPubSubs_[eventType].maxNumParents[cssClass];
        var result;
        if (configured > 0) {
            result = configured;
        } else if (eventType.indexOf("mouse") != -1) {
            result = 2;
        }
        return result;
    };
    var yt$uix$findAncestorWithClass_ = function (cssClass, element, maxNumParents) {
        return (
            goog$dom$getAncestor(
                element,
                function (node) {
                    return goog$dom$classes$has(node, cssClass);
                },
                true,
                maxNumParents
            ) || null
        );
    };
    var yt$uix$dispatchEvent_ = function (event) {
        if (event.target.tagName != "HTML" && event.type in yt$uix$eventPubSubs_) {
            var pubsub = yt$uix$eventPubSubs_[event.type];
            var cssClass;
            for (cssClass in pubsub.topics_) {
                var maxNumParents = yt$uix$getMaxNumParents_(event.type, cssClass);
                var element = yt$uix$findAncestorWithClass_(cssClass, event.target, maxNumParents);
                if (element) {
                    var dispatch = true;
                    if (
                        pubsub.checkRelatedTarget[cssClass] &&
                        event.relatedTarget &&
                        goog$dom$getAncestor(
                            event.relatedTarget,
                            function (node) {
                                return node == element;
                            },
                            true,
                            maxNumParents
                        )
                    ) {
                        dispatch = false;
                    }
                    if (dispatch) {
                        pubsub.publish_(cssClass, element, event.type, event);
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
    var yt$uix$initWidget = function (widgetClass) {
        var widgetClass = widgetClass.getInstance();
        var cssClass = yt$uix$BaseWidget$getCssClass(widgetClass);
        if (!(cssClass in yt$uix$widgets_) && widgetClass.canInit()) {
            widgetClass.initWidget();
            yt$uix$widgets_[cssClass] = widgetClass;
        }
    };
    var yt$uix$BaseWidget = function () {
        this.callbacks_ = {};
    };
    yt$uix$BaseWidget.prototype.isJscript_ = !!eval("/*@cc_on!@*/false");
    yt$uix$BaseWidget.prototype.canInit = function () {
        return true;
    };
    yt$uix$BaseWidget.prototype.addBehavior = function (
        eventType,
        handler,
        cssSuffix,
        maxNumParents,
        checkRelatedTarget
    ) {
        var cssSuffix = yt$uix$BaseWidget$getCssClass(this, cssSuffix);
        var bound = goog$bind(handler, this);
        yt$uix$registerHandler_(cssSuffix, eventType, bound, maxNumParents, checkRelatedTarget);
        this.callbacks_[handler] = bound;
    };
    yt$uix$BaseWidget.prototype.callAction = function (element, dataKey, var_args) {
        var fn = this.getData(element, dataKey);
        if (fn && (fn = goog$getObjectByName(fn))) {
            var args = goog$array$slice(arguments, 2);
            goog$array$splice(args, 0, 0, element);
            fn.apply(null, args);
        }
    };
    yt$uix$BaseWidget.prototype.getData = function (element, key) {
        return yt$dom$datasets$get(element, key);
    };
    yt$uix$BaseWidget.prototype.setData = function (element, key, value) {
        yt$dom$datasets$set(element, key, value);
    };
    var yt$uix$BaseWidget$findWidgetElement_ = function (widget, element) {
        return yt$dom$getAncestorByClass(element, yt$uix$BaseWidget$getCssClass(widget));
    };
    var yt$uix$BaseWidget$getCssClass = function (widget, suffix) {
        return "yt-uix" + (widget.cssName_ ? "-" + widget.cssName_ : "") + (suffix ? "-" + suffix : "");
    };
    var yt$uix$Button = function () {
        this.callbacks_ = {};
    };
    goog$inherits(yt$uix$Button, yt$uix$BaseWidget);
    goog$addSingletonGetter(yt$uix$Button);
    yt$uix$Button.prototype.cssName_ = "button";
    yt$uix$Button.prototype.initWidget = function () {
        this.addBehavior("click", this.handleClick);
        this.addBehavior("keydown", this.handleKeyDown);
        this.addBehavior("keypress", this.handleKeyPress);
    };
    yt$uix$Button.prototype.handleClick = function (button) {
        if (button && !button.disabled) {
            if (this.getData(button, "button-toggle")) {
                var group = yt$dom$getAncestorByClass(button, yt$uix$BaseWidget$getCssClass(this, "group"));
                if (group && this.getData(group, "button-toggle-group")) {
                    var group = goog$dom$getElementsByClass(yt$uix$BaseWidget$getCssClass(this), group);
                    var toggledClass = yt$uix$BaseWidget$getCssClass(this, "toggled");
                    goog$array$forEach(group, function (other) {
                        if (other != button) {
                            goog$dom$classes$remove(other, toggledClass);
                        } else {
                            goog$dom$classes$add(button, toggledClass);
                        }
                    });
                } else {
                    goog$dom$classes$toggle(button, yt$uix$BaseWidget$getCssClass(this, "toggled"));
                }
            }
            if (yt$uix$Button$getMenu_(this, button)) {
                yt$uix$Button$toggleMenu_(this, button);
                button.focus();
            }
            this.callAction(button, "button-action");
        }
    };
    yt$uix$Button.prototype.handleKeyDown = function (button, menu, event) {
        if ((menu = yt$uix$Button$getMenu_(this, button))) {
            var menuList = function (node) {
                var tag = "";
                if (node.tagName) {
                    tag = node.tagName.toLowerCase();
                }
                return tag == "ul" || tag == "table";
            };
            if ((menuList = menuList(menu) ? menu : goog$dom$findNode(menu, menuList))) {
                var menuList = menuList.tagName.toLowerCase();
                var handler;
                if (menuList == "ul") {
                    handler = this.handleListKeyDown_;
                } else if (menuList == "table") {
                    handler = this.handleTableKeyDown_;
                }
                if (handler) {
                    yt$uix$Button$handleMenuKeyDown_(this, button, menu, event, goog$bind(handler, this));
                }
            }
        }
    };
    var yt$uix$Button$handleMenuKeyDown_ = function (widget, button, menu, event, handler) {
        var menuVisible = yt$style$isDisplayed(menu);
        var isTab = event.keyCode == 9;
        if (isTab || event.keyCode == 32 || event.keyCode == 13) {
            if ((event = yt$uix$Button$clearMenuHighlight_(widget, menu))) {
                button = goog$dom$getFirstElementChild(event);
                if (button.tagName.toLowerCase() == "a") {
                    window.location = button.href;
                } else {
                    yt$events$simulateClick(button);
                }
            } else if (isTab) {
                yt$uix$Button$hideMenu_(widget, button);
            }
        } else if (menuVisible) {
            if (event.keyCode == 27) {
                yt$uix$Button$clearMenuHighlight_(widget, menu);
                yt$uix$Button$hideMenu_(widget, button);
            } else {
                handler(button, menu, event);
            }
        } else {
            widget = goog$dom$classes$has(button, yt$uix$BaseWidget$getCssClass(widget, "reverse")) ? 38 : 40;
            if (event.keyCode == widget) {
                yt$events$simulateClick(button);
                event.preventDefault();
            }
        }
    };
    yt$uix$Button.prototype.handleKeyPress = function (button, eventType, event) {
        button = yt$uix$Button$getMenu_(this, button);
        if (yt$style$isDisplayed(button)) {
            event.preventDefault();
        }
    };
    var yt$uix$Button$clearMenuHighlight_ = function (widget, menu) {
        var highlightClass = yt$uix$BaseWidget$getCssClass(widget, "menu-item-highlight");
        var highlighted = goog$dom$getElementByClass(highlightClass, menu);
        if (highlighted) {
            goog$dom$classes$remove(highlighted, highlightClass);
        }
        return highlighted;
    };
    var yt$uix$Button$highlightMenuItem_ = function (widget, button, item) {
        goog$dom$classes$add(item, yt$uix$BaseWidget$getCssClass(widget, "menu-item-highlight"));
        button.setAttribute("aria-activedescendant", item.getAttribute("id"));
    };
    yt$uix$Button.prototype.handleTableKeyDown_ = function (button, menu, event) {
        var index = yt$uix$Button$clearMenuHighlight_(this, menu);
        var menu = yt$dom$getFirstElementByTagNameAndClass("table", null, menu);
        var columns = yt$dom$getFirstElementByTagNameAndClass("tr", null, menu);
        var columns = goog$dom$getElementsByTagNameAndClass("td", null, columns).length;
        var menu = goog$dom$getElementsByTagNameAndClass("td", null, menu);
        var index = yt$uix$Button$getNextMenuIndex_(index, menu, columns, event);
        if (index != -1) {
            yt$uix$Button$highlightMenuItem_(this, button, menu[index]);
            event.preventDefault();
        }
    };
    yt$uix$Button.prototype.handleListKeyDown_ = function (button, menu, event) {
        if (event.keyCode == 40 || event.keyCode == 38) {
            var index = yt$uix$Button$clearMenuHighlight_(this, menu);
            var menu = goog$dom$getElementsByTagNameAndClass("li", null, menu);
            var index = yt$uix$Button$getNextMenuIndex_(index, menu, 1, event);
            yt$uix$Button$highlightMenuItem_(this, button, menu[index]);
            event.preventDefault();
        }
    };
    var yt$uix$Button$getNextMenuIndex_ = function (current, items, columns, event) {
        var count = items.length;
        var current = goog$array$indexOf(items, current);
        if (current == -1) {
            if (event.keyCode == 38) {
                current = count - columns;
            } else if (event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 40) {
                current = 0;
            }
        } else if (event.keyCode == 39) {
            if (current % columns == columns - 1) {
                current -= columns;
            }
            current += 1;
        } else if (event.keyCode == 37) {
            if (current % columns == 0) {
                current += columns;
            }
            current -= 1;
        } else if (event.keyCode == 38) {
            if (current < columns) {
                current += count;
            }
            current -= columns;
        } else if (event.keyCode == 40) {
            if (current >= count - columns) {
                current -= count;
            }
            current += columns;
        }
        return current;
    };
    var yt$uix$Button$toggleMenu_ = function (widget, button) {
        var menu = yt$uix$Button$getMenu_(widget, button);
        var activeButton = yt$uix$Button$getMenuButton_(widget, menu);
        if (activeButton && activeButton != button) {
            yt$uix$Button$hideMenu_(widget, activeButton);
            yt$setTimeout(goog$bind(widget.showMenu, widget, button), 1);
        } else if (yt$style$isDisplayed(menu)) {
            yt$uix$Button$hideMenu_(widget, button);
        } else {
            widget.showMenu(button);
        }
    };
    yt$uix$Button.prototype.getMask_ = function (button) {
        if (
            !goog$userAgent$detectedWindows_ ||
            !goog$dom$classes$has(button, yt$uix$BaseWidget$getCssClass(this, "masked"))
        ) {
            return null;
        }
        var mask = button.iframeMask;
        if (!mask) {
            mask = document.createElement("iframe");
            mask.src = 'javascript:""';
            mask.className = yt$uix$BaseWidget$getCssClass(this, "menu-mask");
            button.iframeMask = mask;
        }
        return mask;
    };
    var yt$uix$Button$positionMenu_ = function (widget, button, menu) {
        var anchor = yt$dom$getAncestorByClass(button, yt$uix$BaseWidget$getCssClass(widget, "group"));
        var anchorCorner = !!widget.getData(button, "button-menu-ignore-group");
        var anchor = anchor && !anchorCorner ? anchor : button;
        var anchorCorner = 5;
        var menuCorner = 4;
        if (goog$dom$classes$has(button, yt$uix$BaseWidget$getCssClass(widget, "reverse"))) {
            anchorCorner = 4;
            menuCorner = 5;
        }
        if (goog$dom$classes$has(button, "flip")) {
            if (goog$dom$classes$has(button, yt$uix$BaseWidget$getCssClass(widget, "reverse"))) {
                anchorCorner = 6;
                menuCorner = 7;
            } else {
                anchorCorner = 7;
                menuCorner = 6;
            }
        }
        var margin;
        if (widget.getData(button, "button-has-sibling-menu")) {
            var offsetParent = goog$style$getOffsetParent(anchor);
            if (goog$userAgent$IE && !goog$userAgent$isVersion("8")) {
                offsetParent = null;
            }
            if (offsetParent) {
                margin = goog$style$getBounds(offsetParent);
                margin = new goog$math$Box(-margin.top, margin.left, margin.top, -margin.left);
            }
        }
        offsetParent = new goog$math$Coordinate(0, 1);
        if ((widget = widget.getMask_(button))) {
            button = goog$style$getSize(menu);
            widget.style.width = button.width + "px";
            widget.style.height = button.height + "px";
            goog$positioning$positionAtAnchor(anchor, anchorCorner, widget, menuCorner, offsetParent, margin);
        }
        goog$positioning$positionAtAnchor(anchor, anchorCorner, menu, menuCorner, offsetParent, margin);
    };
    yt$uix$Button.prototype.showMenu = function (button) {
        if (button) {
            var menu = yt$uix$Button$getMenu_(this, button);
            if (menu) {
                button.setAttribute("aria-pressed", "true");
                button.setAttribute("aria-expanded", "true");
                menu.originalParentNode = menu.parentNode;
                menu.activeButtonNode = button;
                menu.parentNode.removeChild(menu);
                if (this.getData(button, "button-has-sibling-menu")) {
                    button.parentNode.appendChild(menu);
                } else {
                    document.body.appendChild(menu);
                }
                var group = yt$dom$getAncestorByClass(button, yt$uix$BaseWidget$getCssClass(this, "group"));
                var mask = !!this.getData(button, "button-menu-ignore-group");
                menu.style.minWidth = (group && !mask ? group.offsetWidth - 2 : button.offsetWidth - 2) + "px";
                if ((mask = this.getMask_(button))) {
                    document.body.appendChild(mask);
                }
                yt$uix$Button$positionMenu_(this, button, menu);
                yt$style$show(menu);
                this.callAction(button, "button-menu-action", true);
                goog$dom$classes$add(button, yt$uix$BaseWidget$getCssClass(this, "active"));
                if (group) {
                    goog$dom$classes$add(group, yt$uix$BaseWidget$getCssClass(this, "group-active"));
                }
                group = goog$bind(this.handleDocumentClick_, this, button);
                menu = yt$events$listen(document, "click", group);
                group = yt$events$listen(document, "contextmenu", group);
                this.setData(button, "button-listener", menu);
                this.setData(button, "button-context-menu-listener", group);
            }
        }
    };
    var yt$uix$Button$hideMenu_ = function (widget, button) {
        if (button) {
            var menu = yt$uix$Button$getMenu_(widget, button);
            if (menu) {
                button.setAttribute("aria-pressed", "false");
                button.setAttribute("aria-expanded", "false");
                yt$style$hide(menu);
                widget.callAction(button, "button-menu-action", false);
                var mask = widget.getMask_(button);
                yt$setTimeout(function () {
                    if (mask && mask.parentNode) {
                        mask.parentNode.removeChild(mask);
                    }
                    if (menu.originalParentNode) {
                        menu.parentNode.removeChild(menu);
                        menu.originalParentNode.appendChild(menu);
                        menu.originalParentNode = null;
                        menu.activeButtonNode = null;
                    }
                }, 1);
            }
            var group = yt$dom$getAncestorByClass(button, yt$uix$BaseWidget$getCssClass(widget, "group"));
            goog$dom$classes$remove(button, yt$uix$BaseWidget$getCssClass(widget, "active"));
            if (group) {
                goog$dom$classes$remove(group, yt$uix$BaseWidget$getCssClass(widget, "group-active"));
            }
            if ((group = widget.getData(button, "button-listener"))) {
                yt$events$unlistenByKey(group);
                yt$dom$datasets$remove(button, "button-listener");
            }
            if ((group = widget.getData(button, "button-context-menu-listener"))) {
                yt$events$unlistenByKey(group);
                yt$dom$datasets$remove(button, "button-context-menu-listener");
            }
        }
    };
    yt$uix$Button.prototype.getContent = function (button) {
        return goog$dom$getElementByClass(yt$uix$BaseWidget$getCssClass(this, "content"), button);
    };
    var yt$uix$Button$getMenuButton_ = function (widget, menu) {
        return yt$dom$getAncestorByClass(
            menu.activeButtonNode || menu.parentNode,
            yt$uix$BaseWidget$getCssClass(widget)
        );
    };
    yt$uix$Button.prototype.handleDocumentClick_ = function (button, event) {
        var target = yt$events$getTarget(event);
        var clickedMenu = yt$dom$getAncestorByClass(target, yt$uix$BaseWidget$getCssClass(this));
        if (clickedMenu) {
            var clickedMenu = yt$uix$Button$getMenu_(this, clickedMenu);
            var ownMenu = yt$uix$Button$getMenu_(this, button);
            if (clickedMenu == ownMenu) {
                return;
            }
        }
        if (
            !yt$dom$getAncestorByClass(target, yt$uix$BaseWidget$getCssClass(this, "menu")) ||
            goog$dom$classes$has(target, yt$uix$BaseWidget$getCssClass(this, "menu-item")) ||
            goog$dom$classes$has(target, yt$uix$BaseWidget$getCssClass(this, "menu-close"))
        ) {
            yt$uix$Button$hideMenu_(this, button);
            if (
                (clickedMenu = yt$dom$getAncestorByClass(target, yt$uix$BaseWidget$getCssClass(this, "menu"))) &&
                this.getData(button, "button-menu-indicate-selected")
            ) {
                ownMenu = goog$dom$getElementByClass(yt$uix$BaseWidget$getCssClass(this, "content"), button);
                goog$dom$setTextContent(ownMenu, goog$dom$getTextContent(target));
                ownMenu = yt$uix$BaseWidget$getCssClass(this, "menu-item-selected");
                if ((clickedMenu = goog$dom$getElementByClass(ownMenu, clickedMenu))) {
                    goog$dom$classes$remove(clickedMenu, ownMenu);
                }
                goog$dom$classes$add(target.parentNode, ownMenu);
            }
        }
    };
    var yt$uix$Button$getMenu_ = function (widget, button) {
        if (!button.widgetMenu) {
            var menu = widget.getData(button, "button-menu-id");
            var menu = menu && goog$dom$getElement(menu);
            var menuClass = yt$uix$BaseWidget$getCssClass(widget, "menu");
            if (menu) {
                goog$dom$classes$add(menu, menuClass);
            } else {
                menu = goog$dom$getElementByClass(menuClass, button);
            }
            button.widgetMenu = menu;
        }
        return button.widgetMenu;
    };
    var yt$uix$Expander = function () {
        this.callbacks_ = {};
    };
    goog$inherits(yt$uix$Expander, yt$uix$BaseWidget);
    goog$addSingletonGetter(yt$uix$Expander);
    yt$uix$Expander.prototype.cssName_ = "expander";
    yt$uix$Expander.prototype.initWidget = function () {
        this.addBehavior("click", this.handleClick, "head");
        this.addBehavior("keypress", this.handleKeyPress, "head");
    };
    yt$uix$Expander.prototype.handleClick = function (element) {
        yt$uix$Expander$toggle_(this, element);
    };
    yt$uix$Expander.prototype.handleKeyPress = function (element, eventType, event) {
        if (event && event.keyCode == 13) {
            yt$uix$Expander$toggle_(this, element);
        }
    };
    var yt$uix$Expander$toggle_ = function (widget, element) {
        var expander = yt$uix$BaseWidget$findWidgetElement_(widget, element);
        if (expander) {
            goog$dom$classes$toggle(expander, yt$uix$BaseWidget$getCssClass(widget, "collapsed"));
            widget.callAction(expander, "expander-action");
        }
    };
    yt$uix$Expander.prototype.collapse = function (element) {
        if ((element = yt$uix$BaseWidget$findWidgetElement_(this, element))) {
            goog$dom$classes$add(element, yt$uix$BaseWidget$getCssClass(this, "collapsed"));
            this.callAction(element, "expander-action");
        }
    };
    yt$uix$Expander.prototype.expand = function (element) {
        if ((element = yt$uix$BaseWidget$findWidgetElement_(this, element))) {
            goog$dom$classes$remove(element, yt$uix$BaseWidget$getCssClass(this, "collapsed"));
            this.callAction(element, "expander-action");
        }
    };
    yt$uix$Expander.prototype.getBody = function (element) {
        return goog$dom$getElementByClass(yt$uix$BaseWidget$getCssClass(this, "body"), element);
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
    var goog$Timer$callOnce = function (listener, opt_handler) {
        if (goog$typeOf(listener) == "function") {
            if (opt_handler) {
                listener = goog$bind(listener, opt_handler);
            }
        } else if (listener && typeof listener.handleEvent == "function") {
            listener = goog$bind(listener.handleEvent, listener);
        } else {
            throw Error("Invalid listener argument");
        }
        goog$Timer$defaultTimerObject.setTimeout(listener, 200);
    };
    var yt$uix$Tooltip = function () {
        this.callbacks_ = {};
    };
    goog$inherits(yt$uix$Tooltip, yt$uix$BaseWidget);
    goog$addSingletonGetter(yt$uix$Tooltip);
    yt$uix$Tooltip.prototype.cssName_ = "tooltip";
    yt$uix$Tooltip.prototype.lastTouchEnd_ = 0;
    yt$uix$Tooltip.prototype.initWidget = function () {
        this.addBehavior("mouseover", this.handleMouseOver);
        this.addBehavior("mouseout", this.handleMouseOut);
        this.addBehavior("click", this.handleMouseOut);
        this.addBehavior("touchstart", this.handleTouchStart);
        this.addBehavior("touchend", this.handleTouchEnd);
        this.addBehavior("touchcancel", this.handleTouchEnd);
    };
    yt$uix$Tooltip.prototype.canInit = function () {
        return !this.isJscript_ || goog$userAgent$VERSION.indexOf("6") != 0;
    };
    yt$uix$Tooltip.prototype.handleMouseOver = function (element) {
        if (!this.lastTouchEnd_ || !(goog$now() - this.lastTouchEnd_ < 1000)) {
            var timer = parseInt(this.getData(element, "tooltip-hide-timer"), 10);
            if (timer) {
                yt$dom$datasets$remove(element, "tooltip-hide-timer");
                yt$clearTimeout(timer);
            }
            var timer = goog$bind(function () {
                yt$uix$Tooltip$showTip_(this, element);
                yt$dom$datasets$remove(element, "tooltip-show-timer");
            }, this);
            var delay = parseInt(this.getData(element, "tooltip-show-delay"), 10) || 0;
            var timer = yt$setTimeout(timer, delay);
            this.setData(element, "tooltip-show-timer", timer.toString());
            if (element.title) {
                this.setData(element, "tooltip-text", element.title);
                element.title = "";
            }
        }
    };
    yt$uix$Tooltip.prototype.handleMouseOut = function (element) {
        var timer = parseInt(this.getData(element, "tooltip-show-timer"), 10);
        if (timer) {
            yt$clearTimeout(timer);
            yt$dom$datasets$remove(element, "tooltip-show-timer");
        }
        timer = goog$bind(function () {
            yt$uix$Tooltip$hideTip_(this, element);
            yt$dom$datasets$remove(element, "tooltip-hide-timer");
        }, this);
        timer = yt$setTimeout(timer, 50);
        this.setData(element, "tooltip-hide-timer", timer.toString());
        if ((timer = this.getData(element, "tooltip-text"))) {
            element.title = timer;
        }
    };
    yt$uix$Tooltip.prototype.handleTouchStart = function (element, eventType, event) {
        this.lastTouchEnd_ = 0;
        this.handleMouseOver(
            yt$uix$findAncestorWithClass_(
                yt$uix$BaseWidget$getCssClass(this),
                event.changedTouches[0].target,
                yt$uix$getMaxNumParents_(eventType, yt$uix$BaseWidget$getCssClass(this))
            ),
            eventType
        );
    };
    yt$uix$Tooltip.prototype.handleTouchEnd = function (element, eventType, event) {
        this.lastTouchEnd_ = goog$now();
        this.handleMouseOut(
            yt$uix$findAncestorWithClass_(
                yt$uix$BaseWidget$getCssClass(this),
                event.changedTouches[0].target,
                yt$uix$getMaxNumParents_(eventType, yt$uix$BaseWidget$getCssClass(this))
            ),
            eventType
        );
    };
    var yt$uix$Tooltip$setTooltipText_ = function (widget, element, text, hide) {
        widget.setData(element, "tooltip-text", text);
        var content = widget.getData(element, "content-id");
        if ((content = goog$dom$getElement(content))) {
            content.innerHTML = text;
            if (hide) {
                yt$uix$Tooltip$hideTip_(widget, element);
            }
        }
    };
    yt$uix$Tooltip.prototype.getTooltipText = function (element) {
        return this.getData(element, "tooltip-text") || element.title;
    };
    var yt$uix$Tooltip$showTip_ = function (widget, element) {
        if (element) {
            var text = widget.getTooltipText(element);
            if (text) {
                var tip = goog$dom$getElement(yt$uix$Tooltip$getTipId_(widget, element));
                if (!tip) {
                    tip = document.createElement("div");
                    tip.id = yt$uix$Tooltip$getTipId_(widget, element);
                    tip.className = yt$uix$BaseWidget$getCssClass(widget, "tip");
                    var body = document.createElement("div");
                    body.className = yt$uix$BaseWidget$getCssClass(widget, "tip-body");
                    var arrow = document.createElement("div");
                    arrow.className = yt$uix$BaseWidget$getCssClass(widget, "tip-arrow");
                    var content = document.createElement("div");
                    content.className = yt$uix$BaseWidget$getCssClass(widget, "tip-content");
                    var mask = widget.getMask_(element);
                    var contentId = yt$uix$Tooltip$getTipId_(widget, element, "content");
                    content.id = contentId;
                    widget.setData(element, "content-id", contentId);
                    body.appendChild(content);
                    if (mask) {
                        tip.appendChild(mask);
                    }
                    tip.appendChild(body);
                    tip.appendChild(arrow);
                    (yt$dom$getFullScreenElement() || document.body).appendChild(tip);
                    yt$uix$Tooltip$setTooltipText_(widget, element, text);
                    if (
                        (text = parseInt(widget.getData(element, "tooltip-max-width"), 10)) &&
                        body.offsetWidth > text
                    ) {
                        body.style.width = text + "px";
                        goog$dom$classes$add(content, yt$uix$BaseWidget$getCssClass(widget, "normal-wrap"));
                    }
                    content = goog$dom$classes$has(element, yt$uix$BaseWidget$getCssClass(widget, "reverse"));
                    if (!widget.positionTip_(element, tip, body, mask, arrow, content)) {
                        widget.positionTip_(element, tip, body, mask, arrow, !content);
                    }
                    var visibleClass = yt$uix$BaseWidget$getCssClass(widget, "tip-visible");
                    yt$setTimeout(function () {
                        goog$dom$classes$add(tip, visibleClass);
                    }, 0);
                }
            }
        }
    };
    yt$uix$Tooltip.prototype.positionTip_ = function (element, tip, body, mask, arrow, reverse) {
        goog$dom$classes$enable(tip, yt$uix$BaseWidget$getCssClass(this, "tip-reverse"), reverse);
        var corner = 0;
        if (reverse) {
            corner = 1;
        }
        var arrow = goog$style$getSize(element);
        var reverse = new goog$math$Coordinate((arrow.width - 10) / 2, reverse ? arrow.height : 0);
        var position = goog$style$getPageOffset(element);
        goog$positioning$positionAtCoordinate(
            new goog$math$Coordinate(position.x + reverse.x, position.y + reverse.y),
            tip,
            corner
        );
        var corner = goog$dom$getViewportSize_(window);
        var position = goog$style$getClientPosition(tip);
        var tip = goog$style$getSize(body);
        var halfWidth = tip.width / 2;
        if (mask) {
            mask.style.left = "3px";
            mask.style.height = tip.height + "px";
            mask.style.width = tip.width + "px";
        }
        mask = !!(corner.height < position.y + arrow.height);
        arrow = !!(position.y < arrow.height);
        reverse = !!(position.x < halfWidth);
        corner = !!(corner.width < position.x + halfWidth);
        position = (tip.width + 3) / -2 - -5;
        element = this.getData(element, "force-tooltip-direction");
        if (element == "left" || reverse) {
            position = -5;
        } else if (element == "right" || corner) {
            position = 20 - tip.width - 3;
        }
        body.style.left = position + "px";
        return !mask && !arrow;
    };
    var yt$uix$Tooltip$hideTip_ = function (widget, element) {
        if (element) {
            var tip = goog$dom$getElement(yt$uix$Tooltip$getTipId_(widget, element));
            if (tip) {
                yt$uix$Tooltip$releaseSharedMask_(tip);
                goog$dom$removeNode(tip);
                yt$dom$datasets$remove(element, "content-id");
            }
        }
    };
    var yt$uix$Tooltip$getTipId_ = function (widget, element, suffix) {
        widget = yt$uix$BaseWidget$getCssClass(widget) + yt$dom$getUid(element);
        if (suffix) {
            widget += "-" + suffix;
        }
        return widget;
    };
    yt$uix$Tooltip.prototype.getMask_ = function (element) {
        var mask = null;
        if (
            goog$userAgent$detectedWindows_ &&
            goog$dom$classes$has(element, yt$uix$BaseWidget$getCssClass(this, "masked"))
        ) {
            if ((mask = goog$dom$getElement("yt-uix-tooltip-shared-mask"))) {
                mask.parentNode.removeChild(mask);
                yt$style$show(mask);
            } else {
                mask = document.createElement("iframe");
                mask.src = 'javascript:""';
                mask.id = "yt-uix-tooltip-shared-mask";
                mask.className = yt$uix$BaseWidget$getCssClass(this, "tip-mask");
            }
        }
        return mask;
    };
    var yt$uix$Tooltip$releaseSharedMask_ = function (tip) {
        var mask = goog$dom$getElement("yt-uix-tooltip-shared-mask");
        var inTip =
            mask &&
            goog$dom$getAncestor(
                mask,
                function (node) {
                    return node == tip;
                },
                false,
                2
            );
        if (mask && inTip) {
            mask.parentNode.removeChild(mask);
            yt$style$hide(mask);
            document.body.appendChild(mask);
        }
    };
    var yt$uix$RangeTooltip = function () {
        this.callbacks_ = {};
    };
    goog$inherits(yt$uix$RangeTooltip, yt$uix$Tooltip);
    goog$addSingletonGetter(yt$uix$RangeTooltip);
    yt$uix$RangeTooltip.prototype.cssName_ = "range-tooltip";
    yt$uix$RangeTooltip.prototype.tip_ = null;
    yt$uix$RangeTooltip.prototype.format = null;
    yt$uix$RangeTooltip.prototype.max = 0;
    yt$uix$RangeTooltip.prototype.targetLeft_ = 0;
    yt$uix$RangeTooltip.prototype.targetWidth_ = 0;
    yt$uix$RangeTooltip.prototype.touchId_ = null;
    yt$uix$RangeTooltip.prototype.getTooltipText = function () {
        return " ";
    };
    yt$uix$RangeTooltip.prototype.positionTip_ = function (element, tip) {
        this.tip_ = tip;
        var format = this.getData(element, this.cssName_ + "-format");
        if (format) {
            this.format = goog$getObjectByName(format);
        }
        this.max = parseInt(this.getData(element, "range-max"), 10);
        this.targetLeft_ = goog$style$getPageOffset(element).x;
        this.targetWidth_ = goog$style$getSize(element).width;
    };
    yt$uix$RangeTooltip.prototype.initWidget = function () {
        yt$uix$Tooltip.prototype.initWidget.call(this);
        this.addBehavior("mousemove", this.handleMouseMove);
        this.addBehavior("touchmove", this.handleTouchMove);
    };
    yt$uix$RangeTooltip.prototype.handleMouseOver = function (element, eventType) {
        if (!this.suppressShow_) {
            yt$uix$Tooltip.prototype.handleMouseOver.call(this, element, eventType);
            yt$events$listen(document, "mousemove", yt$uix$dispatchEvent_);
        }
    };
    yt$uix$RangeTooltip.prototype.handleMouseOut = function (element, eventType) {
        yt$uix$Tooltip.prototype.handleMouseOut.call(this, element, eventType);
        yt$events$unlisten(document, "mousemove", yt$uix$dispatchEvent_);
    };
    yt$uix$RangeTooltip.prototype.handleTouchStart = function (element, eventType, event) {
        if (!this.touchId_) {
            this.touchId_ = event.changedTouches[0].identifier;
            yt$uix$Tooltip.prototype.handleTouchStart.call(this, element, eventType, event);
            yt$events$listen(document, "touchmove", yt$uix$dispatchEvent_);
            this.handleTouchMove(0, eventType, event);
        }
    };
    yt$uix$RangeTooltip.prototype.handleTouchEnd = function (element, eventType, event) {
        yt$uix$Tooltip.prototype.handleTouchEnd.call(this, element, eventType, event);
        yt$events$unlisten(document, "touchmove", yt$uix$dispatchEvent_);
        this.suppressShow_ = true;
        goog$Timer$callOnce(function () {
            this.suppressShow_ = false;
        }, this);
        this.touchId_ = null;
    };
    yt$uix$RangeTooltip.prototype.handleMouseMove = function (element, value, event) {
        if (this.tip_) {
            value = (event.pageX - this.targetLeft_) / this.targetWidth_;
            value = Math.min(Math.max(value, 0), 1);
            value *= this.max;
            if (this.format) {
                value = this.format(value);
            }
            yt$uix$Tooltip$setTooltipText_(this, element, value);
            var value = goog$dom$getElementByClass(yt$uix$BaseWidget$getCssClass(this, "tip-body"), this.tip_);
            var tip = this.tip_;
            var offset = new goog$math$Coordinate(-5, 0);
            var element = goog$style$getPageOffset(element);
            goog$positioning$positionAtCoordinate(
                new goog$math$Coordinate(event.pageX + offset.x, element.y + offset.y),
                tip,
                0
            );
            event = (goog$style$getSize(value).width + 3) / -2 - -5;
            value.style.left = event + "px";
        }
    };
    yt$uix$RangeTooltip.prototype.handleTouchMove = function (i, eventType, event) {
        if (this.tip_) {
            for (i = 0; i < event.changedTouches.length; i++) {
                var touch = event.changedTouches[i];
                if (touch.identifier == this.touchId_) {
                    event.pageX = touch.pageX;
                    event.pageY = touch.pageY;
                    this.handleMouseMove(
                        yt$uix$findAncestorWithClass_(
                            yt$uix$BaseWidget$getCssClass(this),
                            touch.target,
                            yt$uix$getMaxNumParents_(eventType, yt$uix$BaseWidget$getCssClass(this))
                        ),
                        0,
                        event
                    );
                    break;
                }
            }
        }
    };
    var yt$window$redirect = function (url, params, hash) {
        window.location = yt$uri$appendQueryData(url, params || {}) + (hash || "");
    };
    var yt$window$popup = function (linkOrUrl, options) {
        var url = options || {};
        url.target = url.target || linkOrUrl.target || "YouTube";
        url.width = url.width || 600;
        url.height = url.height || 600;
        var opts = url;
        if (!opts) {
            opts = {};
        }
        var win = window;
        var url = typeof linkOrUrl.href != "undefined" ? linkOrUrl.href : "" + linkOrUrl;
        var target = opts.target || linkOrUrl.target;
        var features = [];
        var key;
        for (key in opts) {
            switch (key) {
                case "width":
                case "height":
                case "top":
                case "left":
                    features.push(key + "=" + opts[key]);
                    break;
                case "target":
                case "noreferrer":
                    break;
                default:
                    features.push(key + "=" + (opts[key] ? 1 : 0));
            }
        }
        key = features.join(",");
        if (opts.noreferrer) {
            if ((opts = win.open("", target, key))) {
                if (goog$userAgent$IE && url.indexOf(";") != -1) {
                    url = "'" + url.replace(/'/g, "%27") + "'";
                }
                opts.opener = null;
                if (goog$userAgent$WEBKIT) {
                    opts.location.href = url;
                } else {
                    url = goog$string$htmlEscape(url);
                    opts.document.write('<META HTTP-EQUIV="refresh" content="0; url=' + url + '">');
                    opts.document.close();
                }
            }
        } else {
            opts = win.open(url, target, key);
        }
        url = opts;
        if (!url) {
            return true;
        }
        if (!url.opener) {
            url.opener = window;
        }
        url.focus();
        return false;
    };
    var yt$uix$Overlay = function () {
        this.callbacks_ = {};
    };
    goog$inherits(yt$uix$Overlay, yt$uix$BaseWidget);
    goog$addSingletonGetter(yt$uix$Overlay);
    yt$uix$Overlay.prototype.cssName_ = "overlay";
    yt$uix$Overlay.prototype.initWidget = function () {
        this.addBehavior("click", this.showOverlay_, "target");
        this.addBehavior("click", this.hideOverlay_, "close");
    };
    yt$uix$Overlay.prototype.showOverlay_ = function (element) {
        if ((element = yt$uix$BaseWidget$findWidgetElement_(this, element))) {
            var fgId = yt$uix$BaseWidget$getCssClass(this, "fg");
            var fg = goog$dom$getElement(fgId);
            if (!fg) {
                var content = this.getContentElement(element);
                if (content) {
                    fg = document.createElement("div");
                    fg.id = fgId;
                    fg.className = fgId;
                    fgId = this.getData(element, "overlay-class") || "";
                    goog$dom$classes$add(fg, fgId);
                    var fgContent = document.createElement("div");
                    fgContent.className = yt$uix$BaseWidget$getCssClass(this, "fg-content");
                    var fgId = document.createElement("div");
                    var bg = yt$uix$BaseWidget$getCssClass(this, "base");
                    fgId.id = bg;
                    goog$dom$classes$add(fgId, bg);
                    var aligner = yt$uix$BaseWidget$getCssClass(this, "bg");
                    var bg = document.createElement("div");
                    bg.id = aligner;
                    bg.className = aligner;
                    bg.style.height = goog$dom$getDocumentHeight() + "px";
                    aligner = document.createElement("span");
                    goog$dom$classes$add(aligner, yt$uix$BaseWidget$getCssClass(this, "align"));
                    fgId.appendChild(aligner);
                    fgContent.innerHTML = content.innerHTML;
                    content = goog$dom$getElementsByTagNameAndClass("iframe", null, fgContent);
                    goog$array$forEach(
                        content,
                        function (iframe) {
                            var onload = this.getData(iframe, "onload");
                            if (onload) {
                                if ((onload = goog$getObjectByName(onload))) {
                                    yt$events$listen(iframe, "load", onload);
                                }
                                iframe.src = this.getData(iframe, "src") || iframe.src;
                            }
                        },
                        this
                    );
                    fg.appendChild(fgContent);
                    content = document.getElementsByTagName("embed");
                    fgContent = document.getElementsByTagName("object");
                    aligner = goog$bind(function (plugin) {
                        var visibility = plugin.style.visibility;
                        if (visibility != "hidden") {
                            this.setData(plugin, "overlay-hidden", "true");
                            if (visibility) {
                                this.setData(plugin, "overlay-visibility-value", visibility);
                            }
                            plugin.style.visibility = "hidden";
                        }
                    }, this);
                    goog$array$forEach(content, aligner);
                    goog$array$forEach(fgContent, aligner);
                    fgId.appendChild(fg);
                    document.body.appendChild(bg);
                    document.body.appendChild(fgId);
                    if (!this.getData(element, "disable-shortcuts")) {
                        fg = goog$bind(function (event) {
                            if (goog$dom$classes$has(event.target, yt$uix$BaseWidget$getCssClass(this, "base"))) {
                                this.hideOverlay_();
                            }
                        }, this);
                        yt$events$listen(fgId, "click", fg);
                        yt$events$listen(document, "keydown", goog$bind(this.handleKeyDown, this));
                    }
                    this.callAction(element, "overlay-shown");
                }
            }
        }
    };
    yt$uix$Overlay.prototype.hideOverlay_ = function () {
        var bg = yt$uix$BaseWidget$getCssClass(this, "bg");
        var fg = goog$dom$getElement(yt$uix$BaseWidget$getCssClass(this, "fg"));
        if (fg) {
            if (goog$dom$classes$has(fg, yt$uix$BaseWidget$getCssClass(this, "unclosable"))) {
                return;
            }
            yt$style$hide(fg);
            document.body.removeChild(fg.parentNode);
        }
        if ((bg = goog$dom$getElement(bg))) {
            document.body.removeChild(bg);
        }
        var bg = document.getElementsByTagName("embed");
        var fg = document.getElementsByTagName("object");
        var restore = goog$bind(function (plugin) {
            if (this.getData(plugin, "overlay-hidden")) {
                yt$dom$datasets$remove(plugin, "overlay-hidden");
                var visibility = this.getData(plugin, "overlay-visibility-value");
                plugin.style.visibility = visibility ? visibility : null;
            }
        }, this);
        goog$array$forEach(bg, restore);
        goog$array$forEach(fg, restore);
        yt$events$unlisten(document, "keydown", goog$bind(this.handleKeyDown, this));
    };
    yt$uix$Overlay.prototype.handleKeyDown = function (event) {
        if (event.keyCode == 27) {
            this.hideOverlay_();
        }
    };
    yt$uix$Overlay.prototype.getContentElement = function (element) {
        return goog$dom$getElementByClass(yt$uix$BaseWidget$getCssClass(this, "content"), element);
    };
    yt$uix$Overlay.prototype.hide = function () {
        this.hideOverlay_();
    };
    yt$uix$Overlay.prototype.show = function (element) {
        this.showOverlay_(element);
    };
    var yt$prefs$BitFlags = {
        ck: 0,
        gj: 1,
        EMBED_HIDE_RELATED: 2,
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
        EMBED_PRIVACY_MODE: 44,
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
        WATCH_PAGE_SURVEY_DISMISSED: 56,
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
        EMBED_USE_FLASH_CODE: 75,
        PLAYLIST_AUTOPLAY_OFF: 76,
        PLAYLIST_BAR_COLLAPSED: 77,
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
        var cookie = yt$net$cookies$get("watch_queue_new");
        if (cookie) {
            return cookie.split(",");
        } else {
            return [];
        }
    };
    var yt$www$lists$setQueueVideoIds_ = function (videoIds) {
        videoIds = goog$array$slice(videoIds, 0, 100);
        if ((videoIds = videoIds.join(","))) {
            yt$net$cookies$set("watch_queue_new", videoIds);
        } else {
            yt$net$cookies$remove("watch_queue_new");
        }
    };
    var yt$www$lists$addToQueueCookie_ = function (videoIds) {
        var ids = yt$www$lists$getQueueVideoIds_();
        goog$array$extend(ids, videoIds);
        yt$www$lists$setQueueVideoIds_(ids);
    };
    var yt$www$lists$fetchVideosData_ = function (videoIds, callback) {
        if (videoIds.length) {
            yt$net$ajax$send("/video_info_ajax", {
                method: "POST",
                urlParams: {
                    action_get_videos_data: 1,
                    count: videoIds.length
                },
                postParams: {
                    video_ids: videoIds.join(",")
                },
                onSuccess: function (xhr, response) {
                    if (response.data) {
                        callback(response.data);
                    }
                }
            });
        }
    };
    var yt$www$lists$shuffle_ = function (videoIds) {
        var seed = yt$www$lists$getShuffleValue_();
        var scramble = function (videoId) {
            var pos = 1;
            var chars = [];
            for (var videoId = videoId.split(""); videoId.length;) {
                var pos = (seed + pos) % videoId.length;
                var ch = videoId[pos];
                goog$array$removeAt(videoId, pos);
                chars.push(ch);
            }
            return chars.join("");
        };
        var entries = [];
        goog$array$forEach(videoIds, function (videoId, index) {
            entries.push({
                id: videoId,
                key: scramble(videoId),
                index: index
            });
        });
        goog$array$sortObjectsByKey(entries);
        var start = seed >> 8;
        goog$array$findIndex(entries, function (entry) {
            return start == entry.index;
        });
        videoIds = goog$array$slice(entries, start).concat(goog$array$slice(entries, 0, start));
        return goog$array$map(videoIds, function (entry) {
            return {
                id: entry.id,
                originalIndex: entry.index
            };
        });
    };
    var yt$www$lists$List = function (type, listId, videoIds) {
        this.type_ = type;
        this.listId_ = listId;
        this.editable_ = this.loading_ = false;
        this.pubsub_ = new goog$pubsub$PubSub();
        this.videoIds_ = videoIds || [];
        this.videoData_ = {};
        this.needsFetch_ = !videoIds;
        this.videoUrl_ = "";
        this.index_ = -1;
        this.autoplayCount_ = 1;
        this.indexOffset_ = this.shuffleValue_ = 0;
        this.menuHtml_ = this.menuTitleHtml_ = "";
        this.cache_ = this.errorMessage_ = this.successMessage_ = null;
    };
    var yt$www$lists$List$publishUpdated_ = function (list) {
        list.pubsub_.publish_("LIST_UPDATED");
    };
    yt$www$lists$List.prototype.isEqual = function (other) {
        if (this.type_ != other.type_) {
            return false;
        } else {
            return this.getFullId() == other.getFullId();
        }
    };
    yt$www$lists$List.prototype.copyStateFrom = function (other) {
        this.videoUrl_ = other.videoUrl_ || "";
        this.index_ = other.getIndex();
        this.shuffleValue_ = other.shuffleValue_;
        this.autoplayCount_ = other.autoplayCount_;
        this.menuTitleHtml_ = other.menuTitleHtml_;
        this.menuHtml_ = other.menuHtml_;
    };
    yt$www$lists$List.prototype.getListType = function () {
        return this.type_;
    };
    yt$www$lists$List.prototype.getFullId = function () {
        return this.type_ + (this.listId_ || "");
    };
    var yt$www$lists$List$countOccurrences_ = function (list, videoId) {
        return (
            yt$www$lists$List$getCached_(list, "occurrences", function () {
                var counts = {};
                goog$array$forEach(this.getVideoIds(), function (countedId) {
                    counts[countedId] = (counts[countedId] || 0) + 1;
                });
                return counts;
            })[videoId] || 0
        );
    };
    var yt$www$lists$List$getPlayOrderIds_ = function (list) {
        if (list.isShuffled()) {
            return yt$www$lists$List$getShuffledIds_(list);
        } else {
            return list.getVideoIds();
        }
    };
    yt$www$lists$List.prototype.getRelativeVideoId = function (offset) {
        var ids = yt$www$lists$List$getPlayOrderIds_(this);
        if (!ids.length) {
            return "";
        }
        offset = this.getIndex() + offset;
        if (offset >= ids.length) {
            offset %= ids.length;
        }
        return ids[offset];
    };
    var yt$www$lists$List$getIndicesOf_ = function (list, videoIds) {
        var ids = yt$www$lists$List$getPlayOrderIds_(list);
        return goog$array$map(videoIds, function (videoId) {
            return goog$array$findIndexRight(ids, function (id) {
                return id == videoId;
            });
        });
    };
    yt$www$lists$List.prototype.getVideoIds = function () {
        return goog$array$toArray(this.videoIds_);
    };
    var yt$www$lists$List$getShuffledIds_ = function (list) {
        return yt$www$lists$List$getCached_(list, "shuffled_ids", function () {
            return goog$array$map(yt$www$lists$List$getShuffledVideos_(this), function (entry) {
                return entry.id;
            });
        });
    };
    var yt$www$lists$List$getShuffledVideos_ = function (list) {
        return yt$www$lists$List$getCached_(list, "shuffled_videos", function () {
            var ids = this.getVideoIds();
            return yt$www$lists$shuffle_(ids);
        });
    };
    yt$www$lists$List.prototype.getVideoData = function (videoId) {
        return this.videoData_[videoId] || {};
    };
    yt$www$lists$List.prototype.getCount = function () {
        return this.getVideoIds().length;
    };
    yt$www$lists$List.prototype.getIndex = function () {
        if (this.isShuffled()) {
            return goog$array$findIndex(
                yt$www$lists$List$getShuffledVideos_(this),
                function (entry) {
                    return entry.originalIndex == this.index_;
                },
                this
            );
        } else {
            return this.index_;
        }
    };
    yt$www$lists$List.prototype.isShuffled = function () {
        return this.shuffleValue_ > 0;
    };
    yt$www$lists$List.prototype.isPlaying = function () {
        return this.index_ >= 0;
    };
    yt$www$lists$List.prototype.isLoading = function () {
        return !!this.loading_;
    };
    yt$www$lists$List.prototype.shouldCopyOnEdit = function () {
        return !!yt$getConfig("LIST_COPY_ON_EDIT_ENABLED");
    };
    yt$www$lists$List.prototype.canReorder = function () {
        return false;
    };
    var yt$www$lists$List$clearMessages_ = function (list) {
        list.successMessage_ = null;
        list.errorMessage_ = null;
    };
    var yt$www$lists$List$getPreviousVideoUrl = function (list, feature) {
        var index = list.getIndex() - 1;
        if (index < 0) {
            index = list.getCount() - 1;
        }
        return yt$www$lists$List$getVideoUrl_(list, index, false, feature);
    };
    var yt$www$lists$List$getVideoUrl_ = function (list, index, autoplay, feature) {
        var videoId = yt$www$lists$List$getPlayOrderIds_(list)[index];
        if (!videoId) {
            return null;
        }
        var params = {
            v: videoId
        };
        if (yt$www$lists$List$countOccurrences_(list, videoId) > 1) {
            videoId = index + 1 + list.indexOffset_;
            if (list.isShuffled()) {
                videoId = yt$www$lists$List$getShuffledVideos_(list)[index].originalIndex + 1;
            }
            params.index = videoId;
        }
        if (autoplay) {
            params.playnext = list.autoplayCount_;
        }
        if (list.isShuffled()) {
            params.shuffle = list.shuffleValue_;
        }
        if (feature) {
            params.feature = feature;
        }
        return yt$uri$setQueryData(list.videoUrl_, params);
    };
    yt$www$lists$List.prototype.clear = function () {
        this.clearItems_();
        yt$www$lists$List$publishUpdated_(this);
    };
    yt$www$lists$List.prototype.removeItem = function (index) {
        if (this.isShuffled()) {
            index = yt$www$lists$List$getShuffledVideos_(this)[index].originalIndex;
        }
        var videoId = this.getVideoIds()[index];
        this.removeItemAt_(index);
        if (this.index_ > index) {
            this.index_ -= 1;
        } else if (this.index_ == index) {
            this.index_ = -1;
        }
        yt$www$lists$List$publishUpdated_(this);
        return videoId;
    };
    yt$www$lists$List.prototype.removeItemAt_ = function (index) {
        var videoId = this.videoIds_[index];
        goog$array$removeAt(this.videoIds_, index);
        yt$net$ajax$send(this.getDeleteUrl(), {
            format: "XML",
            method: "POST",
            postParams: {
                video_ids: videoId,
                session_token: yt$net$ajax$tokenMap_.addto_ajax || "",
                playlist_id: this.listId_ || "",
                index: index
            },
            onSuccess: function (xhr, response) {
                this.successMessage_ = response.html_content;
            },
            onFail: function (xhr, response) {
                this.errorMessage_ = response.error_message || yt$getMsg("ERROR_OCCURRED");
            },
            onFinish: function () {
                yt$www$lists$List$publishUpdated_(this);
            },
            context: this
        });
    };
    yt$www$lists$List.prototype.load = function (callback) {
        if (this.needsFetch_ && !this.loading_) {
            yt$www$lists$List$fetch_(this, callback);
        } else if (callback) {
            yt$www$lists$List$publishUpdated_(this);
            callback();
        }
        yt$www$lists$List$loadVideoData_(this);
    };
    var yt$www$lists$List$loadVideoData_ = function (list) {
        var ids = yt$www$lists$List$getPlayOrderIds_(list);
        var ids = goog$array$filter(
            ids,
            function (videoId) {
                return !(videoId in this.videoData_);
            },
            list
        );
        goog$array$forEach(
            ids,
            function (videoId) {
                this.videoData_[videoId] = {};
            },
            list
        );
        yt$www$lists$fetchVideosData_(
            ids,
            goog$bind(function (data) {
                for (var videoId in data) {
                    this.videoData_[videoId] = data[videoId];
                }
                yt$www$lists$List$publishUpdated_(this);
            }, list)
        );
    };
    var yt$www$lists$List$fetch_ = function (list, callback, extraParams) {
        list.loading_ = true;
        list.needsFetch_ = false;
        var params = {
            style: "bottomfeedr_json",
            action_get_list: 1,
            list: list.getFullId()
        };
        if (extraParams) {
            goog$object$extend(params, extraParams);
        }
        yt$net$ajax$send("/list_ajax", {
            urlParams: params,
            onSuccess: function (xhr, response) {
                var data = response.data;
                this.videoIds_ = goog$array$toArray(data.videos);
                this.listId_ = data.list_id;
                this.editable_ = !!data.editable;
                this.videoUrl_ = data.video_url || "";
                this.menuTitleHtml_ = data.menu_title_html;
                this.menuHtml_ = data.menu_html;
                this.indexOffset_ = data.index_offset;
                var data = data.video_data;
                var videoId;
                for (videoId in data) {
                    this.videoData_[videoId] = data[videoId];
                }
            },
            onFail: function () {},
            onFinish: function () {
                this.loading_ = false;
                yt$www$lists$List$loadVideoData_(this);
                yt$www$lists$List$publishUpdated_(this);
                if (callback) {
                    callback();
                }
            },
            context: list
        });
    };
    var yt$www$lists$List$withCache_ = function (list, fn, context) {
        list.cache_ = {};
        try {
            fn.call(context);
        } finally {
            list.cache_ = null;
        }
    };
    var yt$www$lists$List$getCached_ = function (list, key, compute) {
        if (list.cache_ && key in list.cache_) {
            return list.cache_[key];
        }
        compute = compute.call(list);
        if (list.cache_) {
            list.cache_[key] = compute;
        }
        return compute;
    };
    var yt$www$lists$FavoritesList = function (listId, videoIds) {
        yt$www$lists$List.call(this, "FL", listId, videoIds);
    };
    goog$inherits(yt$www$lists$FavoritesList, yt$www$lists$List);
    yt$www$lists$FavoritesList.prototype.getDeleteUrl = function () {
        return "/addto_ajax?action_delete_from_favorites=1";
    };
    var yt$www$lists$LikedList = function (listId, videoIds) {
        yt$www$lists$List.call(this, "LL", listId, videoIds);
    };
    goog$inherits(yt$www$lists$LikedList, yt$www$lists$List);
    yt$www$lists$LikedList.prototype.getDeleteUrl = function () {
        return "/addto_ajax?action_delete_from_liked=1";
    };
    var yt$www$lists$MlList = function (listId, videoIds) {
        yt$www$lists$List.call(this, "ML", listId, videoIds);
    };
    goog$inherits(yt$www$lists$MlList, yt$www$lists$List);
    yt$www$lists$MlList.prototype.shouldCopyOnEdit = function () {
        return !!this.editable_;
    };
    yt$www$lists$MlList.prototype.canReorder = function () {
        return !!this.editable_;
    };
    var yt$www$lists$Playlist = function (type, listId, videoIds) {
        yt$www$lists$List.call(this, type, listId, videoIds);
    };
    goog$inherits(yt$www$lists$Playlist, yt$www$lists$List);
    yt$www$lists$Playlist.prototype.addVideos = function (videoIds) {
        goog$array$extend(this.videoIds_, videoIds);
        yt$net$ajax$send("/addto_ajax", {
            format: "XML",
            method: "POST",
            urlParams: {
                action_add_to_playlist: 1
            },
            postParams: {
                playlist_id: this.listId_,
                video_ids: videoIds.join(","),
                session_token: yt$net$ajax$tokenMap_.addto_ajax
            },
            onFail: function () {
                this.errorMessage_ = yt$getMsg("ERROR_OCCURRED");
                yt$www$lists$List$publishUpdated_(this);
            },
            context: this
        });
    };
    yt$www$lists$Playlist.prototype.getDeleteUrl = function () {
        return "/addto_ajax?action_delete_from_playlist=1";
    };
    yt$www$lists$Playlist.prototype.clearItems_ = function () {
        var length = this.videoIds_.length;
        goog$array$clear(this.videoIds_);
        yt$net$ajax$send("/addto_ajax", {
            format: "XML",
            method: "POST",
            urlParams: {
                action_clear_playlist: 1,
                list_length: length,
                type: this.type_
            },
            postParams: {
                playlist_id: this.listId_,
                session_token: yt$net$ajax$tokenMap_.addto_ajax
            },
            onFail: function () {
                this.errorMessage_ = yt$getMsg("ERROR_OCCURRED");
                yt$www$lists$List$publishUpdated_(this);
            },
            context: this
        });
    };
    yt$www$lists$Playlist.prototype.moveItem = function (from, to) {
        var videoId = this.videoIds_[from];
        goog$array$removeAt(this.videoIds_, from);
        goog$array$splice(this.videoIds_, to, 0, videoId);
        var snapshot = goog$array$toArray(this.videoIds_);
        yt$net$ajax$send("/addto_ajax?action_move_playlist_video=1", {
            format: "XML",
            method: "POST",
            postParams: {
                video_ids: videoId,
                playlist_id: this.listId_,
                source_index: from,
                target_index: to,
                session_token: yt$net$ajax$tokenMap_.addto_ajax
            },
            onFail: function () {
                var unchanged;
                unchanged = this.videoIds_;
                a: if (
                    !goog$isArrayLike(unchanged) ||
                    !goog$isArrayLike(snapshot) ||
                    unchanged.length != snapshot.length
                ) {
                    unchanged = false;
                } else {
                    for (var n = unchanged.length, i = 0; i < n; i++) {
                        if (unchanged[i] !== snapshot[i]) {
                            unchanged = false;
                            break a;
                        }
                    }
                    unchanged = true;
                }
                if (unchanged) {
                    goog$array$removeAt(this.videoIds_, to);
                    goog$array$splice(this.videoIds_, from, 0, videoId);
                }
                this.errorMessage_ = yt$getMsg("ERROR_OCCURRED");
                yt$www$lists$List$publishUpdated_(this);
            },
            context: this
        });
    };
    yt$www$lists$Playlist.prototype.canReorder = function () {
        return !!this.editable_;
    };
    var yt$www$lists$QueueList = function (loaded) {
        yt$www$lists$List.call(this, "QL", null);
        this.editable_ = true;
        this.needsFetch_ = !loaded;
    };
    goog$inherits(yt$www$lists$QueueList, yt$www$lists$List);
    yt$www$lists$QueueList.prototype.copyStateFrom = function (other) {
        yt$www$lists$QueueList.superClass_.copyStateFrom.call(this, other);
        this.needsFetch_ = false;
    };
    yt$www$lists$QueueList.prototype.getVideoIds = function () {
        return yt$www$lists$getQueueVideoIds_();
    };
    yt$www$lists$QueueList.prototype.addVideos = function (videoIds) {
        yt$www$lists$addToQueueCookie_(videoIds);
    };
    yt$www$lists$QueueList.prototype.removeItemAt_ = function (index) {
        var videoId = yt$www$lists$List$getPlayOrderIds_(this)[index];
        var index = yt$www$lists$getQueueVideoIds_();
        var videoId = goog$array$indexOf(index, videoId);
        if (videoId >= 0) {
            goog$array$removeAt(index, videoId);
            yt$www$lists$setQueueVideoIds_(index);
        }
    };
    yt$www$lists$QueueList.prototype.clearItems_ = function () {
        yt$www$lists$setQueueVideoIds_([]);
    };
    yt$www$lists$QueueList.prototype.moveItem = function (from, to) {
        var ids = yt$www$lists$getQueueVideoIds_();
        var videoId = ids[from];
        goog$array$removeAt(ids, from);
        goog$array$splice(ids, to, 0, videoId);
        yt$www$lists$setQueueVideoIds_(ids);
    };
    yt$www$lists$QueueList.prototype.canReorder = function () {
        return !!this.editable_;
    };
    var yt$www$lists$StationList = function (listId, videoIds) {
        yt$www$lists$List.call(this, "SV", listId, videoIds);
        this.editable_ = true;
    };
    goog$inherits(yt$www$lists$StationList, yt$www$lists$List);
    yt$www$lists$StationList.prototype.load = function (callback) {
        yt$www$lists$StationList.superClass_.load.call(this, callback);
        if (!this.isLoading() && this.isPlaying()) {
            callback = yt$www$lists$List$getPlayOrderIds_(this);
            if (this.getIndex() >= callback.length - 1) {
                yt$www$lists$List$fetch_(this, null, {
                    load_more: "1"
                });
            }
        }
    };
    yt$www$lists$StationList.prototype.getDeleteUrl = function () {
        return "/addto_ajax?action_delete_from_station=1";
    };
    var yt$www$lists$createList = function (type, listId, videoIds) {
        var list = null;
        switch (type) {
            case "PL":
            case "SP":
            case "BP":
            case "WL":
                list = new yt$www$lists$Playlist(type, listId, videoIds);
                break;
            case "FL":
                list = new yt$www$lists$FavoritesList(listId, videoIds);
                break;
            case "LL":
                list = new yt$www$lists$LikedList(listId, videoIds);
                break;
            case "AV":
            case "BB":
            case "ML":
            case "MC":
                list = new yt$www$lists$MlList(listId, videoIds);
                break;
            case "QL":
                list = new yt$www$lists$QueueList();
                break;
            case "SV":
                list = new yt$www$lists$StationList(listId, videoIds);
                break;
            default:
                list = new yt$www$lists$List(type, listId, videoIds);
        }
        return list;
    };
    var yt$www$thumbnaildelayload$topOffset_ = 0;
    var yt$www$thumbnaildelayload$preloadMargin_ = 0;
    var yt$www$thumbnaildelayload$lastLoadedBottom_ = 0;
    var yt$www$thumbnaildelayload$currentBottom_ = 0;
    var yt$www$thumbnaildelayload$delayLoadEnabled_ = false;
    var yt$www$thumbnaildelayload$getVisibleBottom_ = function () {
        var viewport = goog$dom$getViewportSize_(window);
        return goog$dom$getDocumentScroll_(document).y + viewport.height + yt$www$thumbnaildelayload$preloadMargin_;
    };
    var yt$www$thumbnaildelayload$loadVisible_ = function () {
        var bottom = yt$www$thumbnaildelayload$getVisibleBottom_();
        var lastBottom = yt$www$thumbnaildelayload$lastLoadedBottom_;
        yt$www$thumbnaildelayload$currentBottom_ = bottom;
        var delta = Math.abs(lastBottom - bottom);
        if (!lastBottom || delta >= 400) {
            delta = yt$www$thumbnaildelayload$getGroupIndex_(bottom);
            for (lastBottom = yt$www$thumbnaildelayload$getGroupIndex_(lastBottom); lastBottom < delta;) {
                yt$net$delayed$load("thumb-group-" + delta);
                delta--;
            }
            yt$www$thumbnaildelayload$lastLoadedBottom_ = bottom;
        }
    };
    var yt$www$thumbnaildelayload$loadAllAbove_ = function () {
        for (
            var group = yt$www$thumbnaildelayload$getGroupIndex_(yt$www$thumbnaildelayload$currentBottom_);
            group >= 0;
            group--
        ) {
            yt$net$delayed$load("thumb-group-" + group);
        }
    };
    var yt$www$thumbnaildelayload$loadImmediately = function (root) {
        yt$www$thumbnaildelayload$forEachThumb_(function (img, src) {
            var groupKey = yt$dom$datasets$get(img, "group-key");
            if (groupKey) {
                yt$net$delayed$unregister(img, groupKey);
                yt$dom$datasets$remove(img, "group-key");
            }
            img.src = src;
        }, root);
    };
    var yt$www$thumbnaildelayload$registerDelayLoad = function (root, force) {
        if (yt$www$thumbnaildelayload$delayLoadEnabled_) {
            yt$www$thumbnaildelayload$forEachThumb_(function (img, src) {
                var groupKey = yt$dom$datasets$get(img, "group-key");
                if (!yt$dom$datasets$get(img, "thumb-manual") && (!groupKey || !!force)) {
                    if (groupKey) {
                        yt$net$delayed$unregister(img, groupKey);
                    }
                    if ((groupKey = goog$dom$getElement(img))) {
                        var left = 0;
                        var top_ = 0;
                        if (groupKey.offsetParent) {
                            do {
                                left += groupKey.offsetLeft;
                                top_ += groupKey.offsetTop;
                            } while ((groupKey = groupKey.offsetParent));
                        }
                        groupKey = new goog$math$Coordinate(left, top_);
                    } else {
                        groupKey = null;
                    }
                    groupKey = "thumb-group-" + yt$www$thumbnaildelayload$getGroupIndex_(groupKey.y);
                    yt$net$delayed$register(img, src, groupKey);
                    yt$dom$datasets$set(img, "group-key", groupKey);
                }
            }, root);
        }
    };
    var yt$www$thumbnaildelayload$forEachThumb_ = function (callback, root) {
        var images = goog$dom$getElementsByTagNameAndClass("img", null, root);
        goog$array$forEach(images, function (img) {
            var src = yt$dom$datasets$get(img, "thumb");
            if (src) {
                callback.call(goog$global, img, src);
            }
        });
    };
    var yt$www$thumbnaildelayload$getGroupIndex_ = function (y) {
        return Math.ceil(Math.max(0, y - yt$www$thumbnaildelayload$topOffset_) / 400);
    };
    if (!goog$userAgent$IE) {
        if (goog$userAgent$GECKO) {
            goog$userAgent$isVersion("1.9.3");
        }
    }
    new goog$pubsub$PubSub();
    var yt$templates$Template = function (template, placeholders) {
        this.template_ = template;
        var names = placeholders || null;
        if (!names) {
            names = yt$templates$extractPlaceholders_(this.template_);
        }
        names = goog$string$subs("__%s__", "(" + names.join("|") + ")");
        this.placeholderRe_ = RegExp(names, "g");
    };
    var yt$templates$PLACEHOLDER_RE_ = /__([a-z]+(?:_[a-z]+)*)__/g;
    var yt$templates$fromElement = function (element, placeholders) {
        var html = goog$dom$getElement(element).innerHTML;
        var html = html.replace(/^\s*(<\!--\s*)?/, "");
        var html = html.replace(/(\s*--\>)?\s*$/, "");
        return new yt$templates$Template(html, placeholders);
    };
    var yt$templates$extractPlaceholders_ = function (template) {
        var names = [];
        var seen = {};
        template.replace(yt$templates$PLACEHOLDER_RE_, function (match, name) {
            if (!(name in seen)) {
                seen[name] = true;
                names.push(name);
            }
        });
        return names;
    };
    yt$templates$Template.prototype.render = function (values, keyMapper, raw) {
        return this.template_.replace(
            this.placeholderRe_,
            goog$bind(function (match, key) {
                if (keyMapper) {
                    key = keyMapper(key);
                }
                if (raw) {
                    return values[key] || "";
                } else {
                    return goog$string$htmlEscape(values[key] || "");
                }
            }, this)
        );
    };
    var yt$uix$Slider = function () {
        this.callbacks_ = {};
    };
    goog$inherits(yt$uix$Slider, yt$uix$BaseWidget);
    goog$addSingletonGetter(yt$uix$Slider);
    yt$uix$Slider.prototype.cssName_ = "slider";
    yt$uix$Slider.prototype.initWidget = function () {
        this.addBehavior("click", this.handleNumClick_, "num");
        this.addBehavior("click", this.handlePrevClick_, "prev");
        this.addBehavior("click", this.handleNextClick_, "next");
        this.addBehavior("mouseover", this.handleMouseOver, "ajax-trigger");
    };
    yt$uix$Slider.prototype.handleNumClick_ = function (numButton) {
        if (numButton) {
            var slider = yt$uix$BaseWidget$findWidgetElement_(this, numButton);
            var numButton = parseInt(this.getData(numButton, "slider-num"), 10);
            if (isNaN(numButton) || numButton < 0) {
                numButton = 0;
            }
            this.showSlide(slider, numButton);
        }
    };
    yt$uix$Slider.prototype.handleNextClick_ = function (slider, offset, event) {
        if (slider) {
            slider = yt$uix$BaseWidget$findWidgetElement_(this, slider);
            if (goog$dom$classes$has(slider, yt$uix$BaseWidget$getCssClass(this, "fluid"))) {
                if (slider) {
                    var body = this.getBody(slider);
                    var units = yt$uix$Slider$getSlideUnits_(this, yt$uix$Slider$getSlide_(this, body));
                    var hasUnits = units.length > 0;
                    var offset = parseInt(this.getData(slider, "scroll-offset"), 10);
                    if (isNaN(offset) || offset > 0) {
                        offset = 0;
                    }
                    var width = body.offsetWidth;
                    if (hasUnits) {
                        body = yt$uix$Slider$getUnitWidth_(units);
                        width = Math.floor(width / body);
                        offset = Math.abs(Math.floor(offset / body)) - 1;
                        yt$uix$Slider$scrollToUnit_(this, slider, (offset >= 0 ? offset : 0) + width);
                    } else {
                        if (this.isJscript_ && document.documentMode < 8) {
                            if (Math.abs(offset - width) < body.scrollWidth) {
                                offset -= width;
                            }
                        } else if (body.offsetWidth < body.scrollWidth) {
                            offset -= width;
                        }
                        yt$uix$Slider$setScrollOffset_(this, slider, offset);
                    }
                }
            } else if (slider) {
                offset = parseInt(this.getData(slider, "slider-current"), 10);
                if (isNaN(offset) || offset < 0) {
                    offset = 0;
                }
                width = parseInt(this.getData(slider, "slider-slides"), 10);
                if (isNaN(width) || width < 0) {
                    width = 0;
                }
                offset = Math.min(offset + 1, width - 1);
                this.showSlide(slider, offset);
            }
            event.preventDefault();
        }
    };
    yt$uix$Slider.prototype.handlePrevClick_ = function (slider, offset, event) {
        if (slider) {
            slider = yt$uix$BaseWidget$findWidgetElement_(this, slider);
            if (goog$dom$classes$has(slider, yt$uix$BaseWidget$getCssClass(this, "fluid"))) {
                if (slider) {
                    var body = this.getBody(slider);
                    var units = yt$uix$Slider$getSlideUnits_(this, yt$uix$Slider$getSlide_(this, body));
                    var hasUnits = units.length > 0;
                    var offset = parseInt(this.getData(slider, "scroll-offset"), 10);
                    if (isNaN(offset) || offset > 0) {
                        offset = 0;
                    }
                    body = body.offsetWidth;
                    if (hasUnits) {
                        units = yt$uix$Slider$getUnitWidth_(units);
                        hasUnits = Math.floor(body / units);
                        offset = Math.abs(Math.floor(offset / units)) - 1;
                        yt$uix$Slider$scrollToUnit_(this, slider, (offset >= 0 ? offset : 0) - hasUnits);
                    } else {
                        offset += body;
                        if (offset > 0) {
                            offset = 0;
                        }
                        yt$uix$Slider$setScrollOffset_(this, slider, offset);
                    }
                }
            } else if (slider) {
                offset = parseInt(this.getData(slider, "slider-current"), 10);
                if (isNaN(offset) || offset < 0) {
                    offset = 0;
                }
                offset = Math.max(offset - 1, 0);
                this.showSlide(slider, offset);
            }
            event.preventDefault();
        }
    };
    yt$uix$Slider.prototype.handleMouseOver = function (slider) {
        if ((slider = yt$uix$BaseWidget$findWidgetElement_(this, slider))) {
            var triggerClass = yt$uix$BaseWidget$getCssClass(this, "ajax-trigger");
            var triggers = goog$dom$getElementsByClass(triggerClass, slider);
            goog$array$forEach(triggers, function (trigger) {
                goog$dom$classes$remove(trigger, triggerClass);
            });
            yt$uix$Slider$loadSlides_(this, slider);
        }
    };
    var yt$uix$Slider$loadSlides_ = function (widget, slider, callback) {
        var url = widget.getData(slider, "slider-ajax-url");
        if (url && !widget.getData(slider, "slider-loaded")) {
            widget.setData(slider, "slider-loaded", "true");
            yt$net$ajax$send(url, {
                context: widget,
                onSuccess: function (xhr, response) {
                    var fragment = goog$dom$htmlToDocumentFragment(response.slides_html);
                    var slides = goog$dom$getElementByClass(yt$uix$BaseWidget$getCssClass(this, "slides"), slider);
                    if (slides && fragment) {
                        goog$dom$append(slides, fragment);
                    }
                    if (callback) {
                        callback();
                    }
                }
            });
        }
    };
    yt$uix$Slider.prototype.showSlide = function (slider, index) {
        if (slider) {
            if (this.getData(slider, "slider-ajax-url") && !this.getData(slider, "slider-loaded")) {
                yt$uix$Slider$loadSlides_(this, slider, goog$bind(this.showSlide, this, slider, index));
            } else {
                yt$uix$Slider$showSlide_(this, slider, index);
            }
        }
    };
    var yt$uix$Slider$showSlide_ = function (widget, slider, index) {
        var nums = goog$dom$getElementsByTagNameAndClass(null, yt$uix$BaseWidget$getCssClass(widget, "num"), slider);
        var currentClass = yt$uix$BaseWidget$getCssClass(widget, "num-current");
        var selected;
        goog$array$forEach(
            nums,
            function (num) {
                selected = this.getData(num, "slider-num") == index;
                goog$dom$classes$enable(num, currentClass, selected);
                goog$dom$classes$enable(num, "yt-uix-pager-selected", selected);
                if (goog$dom$classes$has(num, "yt-uix-button")) {
                    goog$dom$classes$enable(num, "yt-uix-button-toggled", selected);
                }
            },
            widget
        );
        if ((nums = goog$dom$getElementByClass(yt$uix$BaseWidget$getCssClass(widget, "slides"), slider))) {
            var slide = yt$uix$Slider$getSlide_(widget, nums);
            if (slide) {
                var offset = index * -1 * slide.offsetWidth + "px";
                if (goog$style$isRightToLeft(slide)) {
                    nums.style.right = offset;
                } else {
                    nums.style.left = offset;
                }
            }
        }
        if ((nums = goog$dom$getElementByClass("yt-uix-pager-current-page", slider))) {
            nums.innerHTML = index + 1;
        }
        widget.setData(slider, "slider-current", index + "");
        yt$uix$Slider$updateButtons_(widget, slider);
    };
    var yt$uix$Slider$updateButtons_ = function (widget, slider) {
        if (slider) {
            var current = parseInt(widget.getData(slider, "slider-current"), 10);
            var count = parseInt(widget.getData(slider, "slider-slides"), 10);
            var nextButtons = goog$dom$getElementsByClass(yt$uix$BaseWidget$getCssClass(widget, "next"), slider);
            var prevButtons = goog$dom$getElementsByClass(yt$uix$BaseWidget$getCssClass(widget, "prev"), slider);
            goog$array$forEach(nextButtons, function (button) {
                button.disabled = false;
            });
            goog$array$forEach(prevButtons, function (button) {
                button.disabled = false;
            });
            if (current == 0) {
                goog$array$forEach(prevButtons, function (button) {
                    button.disabled = true;
                });
            }
            if (current == count - 1) {
                goog$array$forEach(nextButtons, function (button) {
                    button.disabled = true;
                });
            }
        }
    };
    var yt$uix$Slider$scrollToUnit_ = function (widget, slider, unitIndex) {
        if (slider) {
            var body = widget.getBody(slider);
            var units = yt$uix$Slider$getSlideUnits_(widget, yt$uix$Slider$getSlide_(widget, body));
            if (!(units.length <= 0)) {
                if (unitIndex >= units.length) {
                    unitIndex = units.length - 1;
                }
                var firstVisible = parseInt(widget.getData(slider, "scroll-offset"), 10);
                if (isNaN(firstVisible) || firstVisible > 0) {
                    firstVisible = 0;
                }
                var body = body.offsetWidth;
                var unitWidth = yt$uix$Slider$getUnitWidth_(units);
                var firstVisible = Math.abs(Math.floor(firstVisible / unitWidth)) - 1;
                if (unitIndex > (firstVisible >= 0 ? firstVisible : 0)) {
                    var firstVisible = Math.floor(body / unitWidth);
                    var unitCount = units.length;
                    if (unitIndex + firstVisible > unitCount) {
                        unitIndex = unitCount - firstVisible + 1;
                    }
                }
                if (unitIndex < 0) {
                    unitIndex = 0;
                }
                unitIndex = units[unitIndex];
                firstVisible = goog$style$isRightToLeft(slider)
                    ? unitIndex.offsetLeft - body + unitWidth + 10
                    : (unitIndex.offsetLeft - 10) * -1;
                yt$uix$Slider$setScrollOffset_(widget, slider, firstVisible);
            }
        }
    };
    var yt$uix$Slider$setScrollOffset_ = function (widget, slider, offset) {
        if (slider) {
            if (isNaN(offset)) {
                offset = 0;
            }
            var body = widget.getBody(slider);
            var slide = yt$uix$Slider$getSlide_(widget, body);
            var titles = goog$dom$getElementsByTagNameAndClass(
                null,
                yt$uix$BaseWidget$getCssClass(widget, "title"),
                slide
            );
            var isScroll = goog$dom$classes$has(slider, yt$uix$BaseWidget$getCssClass(widget, "scroll"));
            var isRtl = goog$style$isRightToLeft(slider);
            if (isScroll) {
                body.scrollLeft = isRtl
                    ? goog$userAgent$GECKO
                        ? offset
                        : body.scrollWidth - body.offsetWidth + offset
                    : -offset;
            } else {
                var side = isRtl ? "right" : "left";
                slide.style[side] = offset + "px";
                goog$array$forEach(titles, function (title) {
                    title.style[side] = offset * -1 + "px";
                });
            }
            widget.setData(slider, "scroll-offset", offset + "");
        }
    };
    yt$uix$Slider.prototype.getBody = function (slider) {
        return goog$dom$getElementByClass(yt$uix$BaseWidget$getCssClass(this, "body"), slider);
    };
    var yt$uix$Slider$getSlide_ = function (widget, body) {
        return goog$dom$getElementByClass(yt$uix$BaseWidget$getCssClass(widget, "slide"), body);
    };
    var yt$uix$Slider$getSlideUnits_ = function (widget, slide) {
        return goog$dom$getElementsByTagNameAndClass(null, yt$uix$BaseWidget$getCssClass(widget, "slide-unit"), slide);
    };
    var yt$uix$Slider$getUnitWidth_ = function (units) {
        if (units.length == 0) {
            return 0;
        }
        var first = units[0];
        var width = first.offsetWidth;
        if (units.length > 1) {
            units = units[1];
            width = goog$style$isRightToLeft(first)
                ? first.offsetLeft - units.offsetLeft
                : units.offsetLeft - first.offsetLeft;
        }
        return width;
    };
    var yt$uix$Slider$getVisibleUnits_ = function (widget, slider) {
        var body = widget.getBody(slider);
        var units = yt$uix$Slider$getSlideUnits_(widget, yt$uix$Slider$getSlide_(widget, body));
        if (!units.length) {
            return [];
        }
        var offset = parseInt(widget.getData(slider, "scroll-offset"), 10);
        if (isNaN(offset) || offset > 0) {
            offset = 0;
        }
        var width = body.offsetWidth;
        var unitWidth = yt$uix$Slider$getUnitWidth_(units);
        var body = Math.floor(-offset / unitWidth);
        var body = Math.max(0, body);
        var offset = Math.ceil((-offset + width) / unitWidth);
        var offset = Math.min(offset, units.length);
        return goog$array$slice(goog$array$clone(units), body, offset);
    };
    var yt$www$lists$PlaylistBarTray = function (element, isWatchTray) {
        this.isWatchTray_ = !!isWatchTray;
        this.element_ = element;
        this.trayElement_ = this.isWatchTray_
            ? goog$dom$getElement("watch-tray-playlist-slider")
            : goog$dom$getElement("playlist-bar-tray");
        this.itemList_ = yt$dom$getFirstElementByTagNameAndClass("ol", null, this.trayElement_);
        this.titleEl_ = goog$dom$getElement("playlist-bar-title");
        this.extrasMenuEl_ = goog$dom$getElement("playlist-bar-extras-menu");
        var keys = goog$object$getKeys(yt$www$lists$PlaylistBarTray$TEMPLATE_KEYS_);
        var template = goog$dom$getElement("playlist-bar-template");
        if (this.isWatchTray_) {
            template = goog$dom$getElement("watch-tray-playlist-item-template");
        }
        this.itemTemplate_ = yt$templates$fromElement(template, keys);
        template = yt$dom$datasets$get(template, "video-thumb-url") || "";
        this.thumbTemplate_ = new yt$templates$Template(template, keys);
        yt$events$delegateByClass(
            this.trayElement_,
            "click",
            goog$bind(function () {
                yt$setTimeout(goog$bind(this.loadVisibleThumbs_, this), 0);
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
    yt$www$lists$PlaylistBarTray.prototype.render = function (
        videoIds,
        playingIndex,
        list,
        scrollToPlaying,
        indexOffset
    ) {
        var title = list.menuTitleHtml_;
        if (title) {
            this.titleEl_.innerHTML = title;
            this.extrasMenuEl_.innerHTML = list.menuHtml_;
        }
        var items = [];
        goog$array$forEach(
            videoIds,
            function (videoId, index) {
                var playing = index == playingIndex;
                var data = list.getVideoData(videoId);
                data.id = videoId;
                data.url = yt$www$lists$List$getVideoUrl_(list, index);
                items.push(yt$www$lists$PlaylistBarTray$renderItem_(this, data, index + 1 + indexOffset, playing));
            },
            this
        );
        this.itemList_.innerHTML = items.join("");
        if (scrollToPlaying) {
            this.scroll(3);
        } else if (!this.isWatchTray_) {
            this.scroll(5);
        }
        scrollToPlaying = goog$dom$getElementsByClass("item-count", this.element_);
        goog$array$forEach(scrollToPlaying, function (countEl) {
            countEl.innerHTML = videoIds.length;
        });
        scrollToPlaying = goog$dom$getElementsByClass("playing-index", this.element_);
        goog$array$forEach(scrollToPlaying, function (indexEl) {
            indexEl.innerHTML = playingIndex + 1;
        });
    };
    var yt$www$lists$PlaylistBarTray$renderItem_ = function (tray, data, position, playing) {
        var keyMapper = function (key) {
            return yt$www$lists$PlaylistBarTray$TEMPLATE_KEYS_[key];
        };
        data.index = position;
        data.thumb_url = tray.thumbTemplate_.render(data, keyMapper);
        position = [];
        if (data.unviewable) {
            position.push("playlist-bar-item-unviewable");
        } else if (!data.title) {
            position.push("loading");
        }
        if (playing) {
            position.push("playlist-bar-item-playing");
        }
        data.classes = position.join(" ");
        return tray.itemTemplate_.render(data, keyMapper);
    };
    yt$www$lists$PlaylistBarTray.prototype.loadVisibleThumbs_ = function () {
        var units = yt$uix$Slider$getVisibleUnits_(yt$uix$Slider.getInstance(), this.trayElement_);
        goog$array$forEach(units, function (unit) {
            yt$www$thumbnaildelayload$loadImmediately(unit);
        });
    };
    yt$www$lists$PlaylistBarTray.prototype.scroll = function (mode, index) {
        var slider = yt$uix$Slider.getInstance();
        switch (mode) {
            case 3:
                var playing = yt$dom$getFirstElementByTagNameAndClass(
                    "li",
                    "playlist-bar-item-playing",
                    this.itemList_
                );
                if (playing) {
                    var tray = this.trayElement_;
                    if (tray) {
                        var units = yt$uix$Slider$getSlideUnits_(
                            slider,
                            yt$uix$Slider$getSlide_(slider, slider.getBody(tray))
                        );
                        var playing = goog$array$indexOf(units, playing);
                        if (playing >= 0) {
                            yt$uix$Slider$scrollToUnit_(slider, tray, playing);
                        }
                    }
                } else {
                    yt$uix$Slider$scrollToUnit_(slider, this.trayElement_, 0);
                }
                break;
            case 4:
                if (index) {
                    yt$uix$Slider$scrollToUnit_(slider, this.trayElement_, index);
                }
                break;
            case 5:
                tray = this.trayElement_;
                playing = slider.getData(tray, "scroll-offset");
                yt$uix$Slider$setScrollOffset_(slider, tray, parseInt(playing, 10) || 0);
        }
        this.loadVisibleThumbs_();
    };
    yt$www$lists$PlaylistBarTray.prototype.highlightItems = function (indices) {
        var count = 0;
        var blink = goog$bind(function () {
            var items = goog$dom$getElementsByTagNameAndClass("li", "playlist-bar-item", this.itemList_);
            var on = !(count % 2);
            goog$array$forEach(indices, function (index) {
                goog$dom$classes$enable(items[index], "playlist-bar-item-highlight", on);
            });
            count++;
            if (count < 6) {
                yt$setTimeout(blink, 150);
            }
        }, this);
        blink();
    };
    var yt$www$lists$PlaylistBar = function (element, list, isWatchTray) {
        this.element_ = element;
        this.isWatchTray_ = !!isWatchTray;
        this.tray_ = new yt$www$lists$PlaylistBarTray(this.element_, this.isWatchTray_);
        this.activeList_ = list;
        this.draggablesCreated_ = this.dragDropLoading_ = false;
        this.barEl_ = goog$dom$getElement("playlist-bar-bar");
        yt$events$listen(this.barEl_, "click", goog$bind(this.handleBarClick_, this));
        this.playButton_ = goog$dom$getElement("playlist-bar-play-button");
        yt$events$listen(this.playButton_, "click", goog$bind(this.handlePlayClick_, this));
        if (this.isWatchTray_) {
            this.prevButton_ = goog$dom$getElement("watch-prev");
            this.nextButton_ = goog$dom$getElement("watch-next");
        } else {
            this.prevButton_ = goog$dom$getElement("playlist-bar-prev-button");
            this.nextButton_ = goog$dom$getElement("playlist-bar-next-button");
        }
        yt$events$listen(this.prevButton_, "click", goog$bind(this.handlePrevButtonClick_, this));
        yt$events$listen(this.nextButton_, "click", goog$bind(this.handleNextButtonClick_, this));
        this.autoplayButton_ = goog$dom$getElement("playlist-bar-autoplay-button");
        yt$events$listen(this.autoplayButton_, "click", goog$bind(this.handleAutoplayClick_, this));
        this.shuffleButton_ = goog$dom$getElement("playlist-bar-shuffle-button");
        yt$events$listen(this.shuffleButton_, "click", goog$bind(this.handleShuffleClick_, this));
        this.toggleButton_ = goog$dom$getElement("playlist-bar-toggle-button");
        yt$events$listen(this.toggleButton_, "click", goog$bind(this.handleToggleClick_, this));
        this.optionsMenu_ = goog$dom$getElement("playlist-bar-options-menu");
        yt$events$delegateByClass(
            this.optionsMenu_,
            "click",
            goog$bind(this.handleOptionsMenuClick_, this),
            "yt-uix-button-menu-item"
        );
        this.itemList_ = goog$dom$getElement("playlist-bar-tray-content");
        if (this.isWatchTray_) {
            this.itemList_ = goog$dom$getElement("watch-tray-playlist-content");
        }
        yt$events$delegateByClass(this.itemList_, "click", goog$bind(this.handleDeleteClick_, this), "delete");
        yt$events$delegateByClass(this.itemList_, "click", goog$bind(this.handleLoadListsClick_, this), "load-lists");
        yt$events$delegateByClass(this.itemList_, "click", goog$bind(this.handleLoadMoreClick_, this), "load-more");
        this.nextUpTemplate_ = yt$templates$fromElement(goog$dom$getElement("playlist-bar-next-up-template"), [
            "video_encrypted_id"
        ]);
        yt$www$lists$PlaylistBar$setList_(this, list);
        if (this.list_.getCount()) {
            this.show();
        } else {
            this.hide();
        }
        element = document.createElement("iframe");
        element.id = "playlist-bar-mask";
        element.frameBorder = "0";
        element.src = 'javascript:""';
        this.element_.insertBefore(element, this.element_.firstChild);
    };
    var yt$www$lists$PlaylistBar$setList_ = function (bar, list, callback, force) {
        if (bar.list_ && (bar.list_.pubsub_.clear("LIST_UPDATED"), bar.activeList_.isEqual(list) || force)) {
            list.copyStateFrom(bar.activeList_);
            bar.activeList_ = list;
        }
        bar.list_ = list;
        bar.list_.pubsub_.subscribe_("LIST_UPDATED", bar.updateDisplay, bar);
        bar.list_.load(callback);
        bar.updateDisplay(true);
    };
    yt$www$lists$PlaylistBar.prototype.getListType = function () {
        return this.list_.getListType();
    };
    yt$www$lists$PlaylistBar.prototype.getFullId = function () {
        return this.list_.getFullId();
    };
    yt$www$lists$PlaylistBar.prototype.isPlaying = function () {
        return this.list_.isPlaying();
    };
    var yt$www$lists$PlaylistBar$isAutoplayOn_ = function (bar) {
        return bar.isPlaying() && goog$dom$classes$has(bar.element_, "autoplay-on");
    };
    var yt$www$lists$PlaylistBar$setAutoplay_ = function (bar, enabled) {
        if (enabled) {
            goog$dom$classes$addRemove(bar.element_, "autoplay-off", "autoplay-on");
        } else {
            goog$dom$classes$addRemove(bar.element_, "autoplay-on", "autoplay-off");
        }
        var prefs = yt$prefs$UserPrefs.getInstance();
        yt$prefs$UserPrefs$setFlag(yt$prefs$BitFlags.PLAYLIST_AUTOPLAY_OFF, !enabled);
        prefs.save();
        yt$setConfig("LIST_AUTO_PLAY_ON", enabled);
    };
    yt$www$lists$PlaylistBar.prototype.isShuffled = function () {
        return goog$dom$classes$has(this.element_, "shuffle-on");
    };
    yt$www$lists$PlaylistBar.prototype.isLoading = function () {
        return goog$dom$classes$has(this.element_, "loading");
    };
    yt$www$lists$PlaylistBar.prototype.show = function () {
        if (yt$prefs$UserPrefs$getFlag(yt$prefs$UserPrefs.getInstance(), yt$prefs$BitFlags.PLAYLIST_BAR_COLLAPSED)) {
            yt$www$lists$PlaylistBar$collapse_(this);
        } else {
            yt$www$lists$PlaylistBar$expand_(this);
        }
    };
    yt$www$lists$PlaylistBar.prototype.hide = function () {
        goog$dom$classes$addRemove(this.element_, ["min", "max"], "hid");
    };
    var yt$www$lists$PlaylistBar$collapse_ = function (bar) {
        goog$dom$classes$addRemove(bar.element_, ["hid", "max"], "min");
        yt$www$lists$PlaylistBar$updateTooltips_(bar, true);
    };
    var yt$www$lists$PlaylistBar$expand_ = function (bar) {
        goog$dom$classes$addRemove(bar.element_, ["hid", "min"], "max");
        yt$www$lists$PlaylistBar$updateTooltips_(bar, true);
    };
    yt$www$lists$PlaylistBar.prototype.toggle = function () {
        var collapsed;
        if (goog$dom$classes$has(this.element_, "min")) {
            yt$www$lists$PlaylistBar$expand_(this);
            collapsed = false;
        } else {
            yt$www$lists$PlaylistBar$collapse_(this);
            collapsed = true;
        }
        yt$tracking$track("bf", "toggleBar=1&collapsed=" + collapsed, undefined);
        var prefs = yt$prefs$UserPrefs.getInstance();
        yt$prefs$UserPrefs$setFlag(yt$prefs$BitFlags.PLAYLIST_BAR_COLLAPSED, collapsed);
        prefs.save();
        yt$www$lists$PlaylistBar$hideNotification_(this, true);
    };
    yt$www$lists$PlaylistBar.prototype.handleBarClick_ = function (event) {
        if (
            !goog$dom$getAncestor(
                event.target,
                function (node) {
                    node = node.tagName && node.tagName.toLowerCase();
                    return node == "a" || node == "button";
                },
                true
            )
        ) {
            this.toggle();
        }
    };
    yt$www$lists$PlaylistBar.prototype.handleOptionsMenuClick_ = function (event) {
        event.stopPropagation();
        switch (yt$dom$datasets$get(event.currentTarget, "action")) {
            case "clear":
                this.clear();
                break;
            case "load-lists":
                yt$www$lists$PlaylistBar$showLists_(this);
                break;
            case "show-active":
                if (this.activeList_) {
                    yt$www$lists$PlaylistBar$setList_(this, this.activeList_);
                }
                break;
            case "save":
                yt$www$lists$PlaylistBar$showSaveForm_(this);
        }
    };
    yt$www$lists$PlaylistBar.prototype.handleToggleClick_ = function () {
        this.toggle();
    };
    yt$www$lists$PlaylistBar.prototype.handleAutoplayClick_ = function () {
        yt$www$lists$PlaylistBar$setAutoplay_(this, !yt$www$lists$PlaylistBar$isAutoplayOn_(this));
        yt$www$lists$PlaylistBar$updateTooltips_(this);
    };
    yt$www$lists$PlaylistBar.prototype.handleShuffleClick_ = function () {
        var shuffle = !this.isShuffled();
        var shuffleValue = 0;
        yt$setConfig("SHUFFLE_ENABLED", shuffle);
        if (shuffle) {
            yt$setConfig("SHUFFLE_VALUE", Math.max(1, Math.random() * 1000000));
        }
        if (shuffle) {
            goog$dom$classes$addRemove(this.element_, "shuffle-off", "shuffle-on");
            shuffleValue = yt$www$lists$getShuffleValue_();
        } else {
            goog$dom$classes$addRemove(this.element_, "shuffle-on", "shuffle-off");
        }
        this.list_.shuffleValue_ = shuffleValue;
        this.updateDisplay();
        this.tray_.scroll(3);
    };
    yt$www$lists$PlaylistBar.prototype.handlePlayClick_ = function () {
        this.next(true, "bf_play");
    };
    yt$www$lists$PlaylistBar.prototype.handlePrevButtonClick_ = function () {
        var url = yt$www$lists$List$getPreviousVideoUrl(this.list_, "bf_prev");
        if (url) {
            yt$window$redirect(url);
        }
    };
    yt$www$lists$PlaylistBar.prototype.handleNextButtonClick_ = function () {
        this.next(true, "bf_next");
    };
    yt$www$lists$PlaylistBar.prototype.handleDeleteClick_ = function (event) {
        event.preventDefault();
        event.stopPropagation();
        var itemClass = this.isWatchTray_ ? "watch-tray-playlist-item" : "playlist-bar-item";
        var index = goog$dom$getElementsByTagNameAndClass("li", itemClass, this.itemList_);
        var event = goog$dom$getAncestorByTagNameAndClass(event.currentTarget, "li", itemClass);
        var index = goog$array$indexOf(index, event);
        if (this.list_.shouldCopyOnEdit()) {
            event = this.list_.getListType();
            yt$www$lists$PlaylistBar$copyToQueue_(this);
            yt$tracking$track("bf", "copyFrom=1&action=delete&list_type=" + event, undefined);
        }
        var listType = this.list_.getListType();
        var videoId = yt$www$lists$List$getPlayOrderIds_(this.list_)[index];
        this.list_.removeItem(index);
        yt$www$lists$PlaylistBar$showNotification_(
            this,
            yt$getMsg("PLAYLIST_VIDEO_DELETED"),
            false,
            false,
            function () {
                this.list_.addVideos([videoId]);
                this.updateDisplay();
                var lastIndex = this.list_.getCount() - 1;
                this.tray_.scroll(4, lastIndex);
                this.tray_.highlightItems([lastIndex]);
                yt$tracking$track("bf", "undo_delete=1&list_type=" + listType, undefined);
            }
        );
        yt$tracking$track("bf", "delete=1&list_type=" + listType, undefined);
    };
    var yt$www$lists$PlaylistBar$initDragDrop_ = function (bar) {
        if (!bar.dragDropLoading_) {
            bar.dragDropLoading_ = true;
            yt$net$scriptloader$load(
                (yt$getConfig("DRAGDROP_BINARY_URL") || "") + "",
                goog$bind(function () {
                    yt$events$listen(
                        this.itemList_,
                        "mouseover",
                        goog$bind(function () {
                            if (!this.draggablesCreated_) {
                                this.draggablesCreated_ = true;
                                if (this.list_.canReorder() && !this.list_.isShuffled()) {
                                    goog$getObjectByName("yt.www.lists.dragdrop").createDraggables();
                                }
                            }
                        }, this)
                    );
                    var dragdrop = this.isWatchTray_ ? "watch-tray-playlist-item" : "playlist-bar-item";
                    var itemClass = goog$getObjectByName("yt.www.lists.dragdrop");
                    itemClass.init(this.itemList_, dragdrop);
                    itemClass.subscribe("DROPPED_AT_INDEX", this.handleDrop_, this);
                }, bar)
            );
        }
    };
    yt$www$lists$PlaylistBar.prototype.handleDrop_ = function (event) {
        var sourceIndex = event.sourceIndex;
        var event = event.targetIndex;
        if (sourceIndex != event && !(sourceIndex < 0) && !(event < 0)) {
            if (this.list_.shouldCopyOnEdit()) {
                var list = this.list_.getListType();
                yt$www$lists$PlaylistBar$copyToQueue_(this);
                yt$tracking$track("bf", "copyFrom=1&action=drag&list_type=" + list, undefined);
            }
            list = this.list_;
            if (!list.isShuffled() && list.canReorder()) {
                var ids = yt$www$lists$List$getPlayOrderIds_(list);
                if (ids[sourceIndex] && ids[event]) {
                    list.moveItem(sourceIndex, event);
                    ids = list.index_;
                    if (ids == sourceIndex) {
                        list.index_ = event;
                    } else if (ids > sourceIndex && ids <= event) {
                        list.index_ -= 1;
                    } else if (ids < sourceIndex && ids >= event) {
                        list.index_ += 1;
                    }
                }
                yt$www$lists$List$publishUpdated_(list);
            }
            sourceIndex = yt$uri$buildQueryData({
                moved_item_delta: Math.abs(event - sourceIndex),
                list_type: this.list_.getListType()
            });
            yt$tracking$track("bf", sourceIndex, undefined);
        }
    };
    yt$www$lists$PlaylistBar.prototype.next = function (manual, feature) {
        if (!manual) {
            yt$tracking$track("bf", "autoplay=1&playcount=" + this.list_.autoplayCount_, undefined);
        }
        var url;
        url = this.list_;
        var index = url.getIndex() + 1;
        if (index >= url.getCount()) {
            index = 0;
        }
        if ((url = yt$www$lists$List$getVideoUrl_(url, index, !manual, feature))) {
            yt$window$redirect(url);
        }
    };
    var yt$www$lists$PlaylistBar$showAutoplayWarning_ = function (bar, secondsLeft) {
        if (!(secondsLeft < 1) && !(secondsLeft > 5)) {
            yt$tracking$track("bf", "delayedautoplay=" + secondsLeft, undefined);
            yt$uix$Tooltip$showTip_(yt$uix$Tooltip.getInstance(), bar.autoplayButton_);
            var msg = yt$getMsg("AUTOPLAY_WARNING" + secondsLeft);
            if (msg) {
                yt$www$lists$PlaylistBar$showNotification_(bar, msg, false, true);
            }
        }
    };
    yt$www$lists$PlaylistBar.prototype.clear = function () {
        var videoIds = this.list_.getVideoIds();
        this.list_.clear();
        yt$www$lists$PlaylistBar$showNotification_(this, yt$getMsg("LIST_CLEARED"), false, false, function () {
            this.list_.addVideos(videoIds);
            this.updateDisplay();
            yt$tracking$track("bf", "undo_clear=1&list_type=" + listType, undefined);
        });
        var listType = this.list_.getListType();
        yt$tracking$track("bf", "clear=1&list_type=" + listType, undefined);
    };
    yt$www$lists$PlaylistBar.prototype.getRelativeVideoId = function (offset) {
        return this.list_.getRelativeVideoId(offset);
    };
    yt$www$lists$PlaylistBar.prototype.updateDisplay = function (scrollToPlaying) {
        var loading = this.list_.isLoading();
        var editable = !loading && !!this.list_.editable_;
        var empty = !this.list_.getCount();
        var playing = this.list_.isPlaying();
        if (playing) {
            goog$dom$classes$addRemove(this.optionsMenu_, "passive", "active");
        } else {
            goog$dom$classes$addRemove(this.optionsMenu_, "active", "passive");
        }
        var removeClasses = [];
        var addClasses = [];
        (playing ? addClasses : removeClasses).push("active");
        (!playing ? addClasses : removeClasses).push("passive");
        (loading ? addClasses : removeClasses).push("loading");
        (editable ? addClasses : removeClasses).push("editable");
        (empty ? addClasses : removeClasses).push("empty");
        goog$dom$classes$addRemove(this.element_, removeClasses, addClasses);
        if (!loading) {
            yt$www$lists$List$withCache_(
                this.list_,
                function () {
                    var videoIds = yt$www$lists$List$getPlayOrderIds_(this.list_);
                    var index = this.list_.getIndex();
                    this.tray_.render(videoIds, index, this.list_, !!scrollToPlaying, this.list_.indexOffset_);
                    this.draggablesCreated_ = false;
                },
                this
            );
        }
        loading = this.list_.errorMessage_;
        editable = this.list_.successMessage_;
        if (loading) {
            yt$www$lists$PlaylistBar$showNotification_(this, loading, true, false);
        } else if (editable) {
            yt$www$lists$PlaylistBar$showNotification_(this, editable, false, true);
        }
        yt$www$lists$List$clearMessages_(this.list_);
        yt$www$lists$PlaylistBar$updateTooltips_(this);
        if (this.list_.canReorder() && this.list_.getCount()) {
            yt$www$lists$PlaylistBar$initDragDrop_(this);
        }
    };
    var yt$www$lists$PlaylistBar$updateTooltips_ = function (bar, hideNow) {
        if (!bar.isWatchTray_) {
            var autoplayTip = yt$getMsg("AUTOPLAY_OFF_TOOLTIP");
            if (yt$www$lists$PlaylistBar$isAutoplayOn_(bar)) {
                autoplayTip = yt$getMsg("AUTOPLAY_ON_TOOLTIP");
            }
            var shuffleTip = yt$getMsg("SHUFFLE_OFF_TOOLTIP");
            if (bar.isShuffled()) {
                shuffleTip = yt$getMsg("SHUFFLE_ON_TOOLTIP");
            }
            var nextTip = yt$getMsg("NEXT_VIDEO_NOTHUMB_TOOLTIP");
            if (bar.list_.isPlaying()) {
                var toggleTip = yt$www$lists$List$getPlayOrderIds_(bar.list_);
                var tooltip = bar.list_.getIndex();
                if (
                    (toggleTip =
                        (tooltip = toggleTip[toggleTip.length == tooltip + 1 ? 0 : tooltip + 1]) &&
                        bar.list_.getVideoData(tooltip)) &&
                    toggleTip.title
                ) {
                    nextTip = bar.nextUpTemplate_.render({
                        video_encrypted_id: tooltip
                    });
                    nextTip =
                        yt$getMsg("NEXT_VIDEO_TOOLTIP", {
                            "{next_video_title}": toggleTip.title
                        }) +
                        " " +
                        nextTip;
                }
            }
            toggleTip = "";
            toggleTip = goog$dom$classes$has(bar.element_, "min")
                ? yt$getMsg("SHOW_PLAYLIST_TOOLTIP")
                : yt$getMsg("HIDE_PLAYLIST_TOOLTIP");
            tooltip = yt$uix$Tooltip.getInstance();
            yt$uix$Tooltip$setTooltipText_(tooltip, bar.nextButton_, nextTip);
            yt$uix$Tooltip$setTooltipText_(tooltip, bar.autoplayButton_, autoplayTip);
            yt$uix$Tooltip$setTooltipText_(tooltip, bar.shuffleButton_, shuffleTip);
            yt$uix$Tooltip$setTooltipText_(tooltip, bar.toggleButton_, toggleTip, hideNow);
        }
    };
    yt$www$lists$PlaylistBar.prototype.notificationTimer_ = null;
    yt$www$lists$PlaylistBar.prototype.undoCallback_ = null;
    var yt$www$lists$PlaylistBar$clearNotificationTimer_ = function (bar) {
        if (bar.notificationTimer_) {
            yt$clearTimeout(bar.notificationTimer_);
            bar.notificationTimer_ = null;
        }
    };
    var yt$www$lists$PlaylistBar$showNotification_ = function (bar, msg, isError, autoHide, undoCallback) {
        if (msg) {
            if (!bar.notificationsEl_) {
                bar.notificationsEl_ = bar.isWatchTray_
                    ? goog$dom$getElement("watch-bar-notifications")
                    : goog$dom$getElement("playlist-bar-notifications");
                yt$events$delegateByClass(
                    bar.notificationsEl_,
                    "click",
                    goog$bind(bar.handleUndoClick_, bar),
                    "playlist-bar-undo"
                );
            }
            bar.undoCallback_ = undoCallback || null;
            if (bar.undoCallback_) {
                msg += ' <a class="playlist-bar-undo">' + yt$getMsg("UNDO_LINK") + "</a>";
            }
            goog$dom$getElementByClass("yt-alert-content", bar.notificationsEl_).innerHTML = msg;
            goog$dom$classes$enable(bar.notificationsEl_, "yt-alert-error", !!isError);
            goog$dom$classes$enable(bar.notificationsEl_, "yt-alert-success", !isError);
            yt$style$show(bar.notificationsEl_);
            yt$www$lists$PlaylistBar$clearNotificationTimer_(bar);
            if (autoHide) {
                msg = goog$bind(function () {
                    yt$www$lists$PlaylistBar$hideNotification_(this);
                }, bar);
                bar.notificationTimer_ = yt$setTimeout(msg, 10000);
            }
        }
    };
    yt$www$lists$PlaylistBar.prototype.showError = function (msg, autoHide) {
        yt$www$lists$PlaylistBar$showNotification_(this, msg, true, autoHide);
    };
    var yt$www$lists$PlaylistBar$hideNotification_ = function (bar, onlyIfTimed) {
        var timed = !!bar.notificationTimer_;
        if (!onlyIfTimed || !timed) {
            yt$style$hide(bar.notificationsEl_);
            bar.undoCallback_ = null;
            yt$www$lists$PlaylistBar$clearNotificationTimer_(bar);
        }
    };
    yt$www$lists$PlaylistBar.prototype.handleUndoClick_ = function (event) {
        event.stopPropagation();
        event.preventDefault();
        event = this.undoCallback_;
        yt$www$lists$PlaylistBar$hideNotification_(this);
        event.call(this);
    };
    yt$www$lists$PlaylistBar.prototype.highlightItems = function (videoIds) {
        videoIds = yt$www$lists$List$getIndicesOf_(this.list_, videoIds);
        if (videoIds.length) {
            this.tray_.highlightItems(videoIds);
            this.tray_.scroll(4, videoIds[0]);
        }
    };
    var yt$www$lists$PlaylistBar$showSaveForm_ = function (bar) {
        if (!bar.isLoading()) {
            yt$www$lists$PlaylistBar$expand_(bar);
            yt$www$lists$PlaylistBar$sendAjax_(bar, {
                urlParams: {
                    action_get_save_playlist_form: 1
                },
                onSuccess: function (xhr, response) {
                    goog$dom$classes$addRemove(this.element_, "lists", "save");
                    var el = response.html;
                    this.saveFormEl_ = goog$dom$getElement("playlist-bar-save");
                    this.saveFormEl_.innerHTML = el;
                    el = goog$dom$getElement("playlist-bar-title-edit");
                    el.focus();
                    el.select();
                    yt$events$listen(
                        goog$dom$getElement("playlist-bar-save-cancel"),
                        "click",
                        goog$bind(this.handleSaveCancel_, this)
                    );
                    yt$events$listen(
                        goog$dom$getElement("playlist-bar-save-form"),
                        "submit",
                        goog$bind(this.handleSaveSubmit_, this)
                    );
                }
            });
        }
    };
    yt$www$lists$PlaylistBar.prototype.handleSaveCancel_ = function (event) {
        event.preventDefault();
        goog$dom$classes$remove(this.element_, "save");
    };
    yt$www$lists$PlaylistBar.prototype.handleSaveSubmit_ = function (event) {
        event.preventDefault();
        var videoIds = yt$www$lists$List$getPlayOrderIds_(this.list_).join(",");
        if (videoIds) {
            yt$www$lists$PlaylistBar$hideNotification_(this);
            event = goog$dom$forms$getFormDataString(event.target);
            yt$www$lists$PlaylistBar$sendAjax_(this, {
                urlParams: {
                    action_save_playlist: 1
                },
                method: "POST",
                requestBody: event + ("&video_ids=" + videoIds),
                onSuccess: function (xhr, response) {
                    this.saveFormEl_.innerHTML = "";
                    goog$dom$classes$remove(this.element_, "save");
                    yt$www$lists$PlaylistBar$setList_(
                        this,
                        yt$www$lists$createList("PL", response.list_id),
                        null,
                        true
                    );
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
    yt$www$lists$PlaylistBar.prototype.handleLoadListsClick_ = function (event) {
        event.preventDefault();
        yt$www$lists$PlaylistBar$showLists_(this);
    };
    yt$www$lists$PlaylistBar.prototype.handleLoadMoreClick_ = function () {
        var list = this.list_;
        yt$www$lists$List$fetch_(list, null, {
            load_more: "1"
        });
        yt$www$lists$List$publishUpdated_(list);
    };
    var yt$www$lists$PlaylistBar$showLists_ = function (bar) {
        if (!bar.isLoading()) {
            yt$www$lists$PlaylistBar$expand_(bar);
            yt$www$lists$PlaylistBar$sendAjax_(bar, {
                urlParams: {
                    action_get_playlists: 1
                },
                onSuccess: function (xhr, response) {
                    goog$dom$classes$addRemove(this.element_, "save", "lists");
                    this.listsBackButton_ = goog$dom$getElement("playlist-bar-lists-back");
                    this.listsBackListenerKey_ = yt$events$listen(
                        this.listsBackButton_,
                        "click",
                        goog$bind(this.handleListsBackClick_, this)
                    );
                    var html = response.html;
                    this.listsEl_ = goog$dom$getElement("playlist-bar-lists");
                    this.listsEl_.innerHTML = html;
                    yt$www$thumbnaildelayload$loadImmediately(this.listsEl_);
                    this.listsClickListenerKey_ = yt$events$delegateByClass(
                        this.listsEl_,
                        "click",
                        goog$bind(this.handleListClick_, this),
                        "playlist-bar-playlist-item"
                    );
                }
            });
        }
    };
    yt$www$lists$PlaylistBar.prototype.handleListClick_ = function (event) {
        event.preventDefault();
        var item = event.currentTarget;
        if (item) {
            yt$www$lists$PlaylistBar$hideLists_(this);
            event = yt$dom$datasets$get(item, "list-type") || "";
            item = yt$dom$datasets$get(item, "list-id") || "";
            yt$www$lists$PlaylistBar$setList_(this, yt$www$lists$createList(event, item));
        }
    };
    yt$www$lists$PlaylistBar.prototype.handleListsBackClick_ = function (event) {
        event.preventDefault();
        yt$www$lists$PlaylistBar$hideLists_(this);
    };
    var yt$www$lists$PlaylistBar$hideLists_ = function (bar) {
        goog$dom$classes$remove(bar.element_, "lists");
        if (bar.listsEl_) {
            bar.listsEl_.innerHTML = "";
        }
        yt$events$unlistenByKey(bar.listsClickListenerKey_);
        yt$events$unlistenByKey(bar.listsBackListenerKey_);
    };
    var yt$www$lists$PlaylistBar$sendAjax_ = function (bar, options) {
        goog$dom$classes$add(bar.element_, "loading");
        goog$object$extend(options, {
            format: "JSON",
            onFail: function (xhr, response) {
                var msg = yt$getMsg("ERROR_OCCURRED");
                if (response && response.errors) {
                    msg = response.errors[0];
                }
                this.showError(msg, true);
            },
            onFinish: function () {
                goog$dom$classes$remove(this.element_, "loading");
            },
            context: bar
        });
        yt$net$ajax$send("/playlist_bar_ajax", options);
    };
    var yt$www$lists$getPlayerListData = function () {
        var bar = yt$www$lists$getPlaylistBar();
        var videoIds = yt$www$lists$List$getPlayOrderIds_(bar.list_);
        var videoData = {};
        goog$array$forEach(
            videoIds,
            function (videoId) {
                videoData[videoId] = this.list_.getVideoData(videoId);
            },
            bar
        );
        var index = bar.getIndex();
        var autoplay = yt$www$lists$PlaylistBar$isAutoplayOn_(bar);
        var bar = bar.isShuffled() ? bar.list_.shuffleValue_ : 0;
        return {
            autoPlay: autoplay,
            index: index,
            shuffle: bar,
            videoData: videoData,
            videoIds: videoIds || []
        };
    };
    yt$www$lists$PlaylistBar.prototype.getIndex = function () {
        return this.list_.getIndex();
    };
    var yt$www$lists$PlaylistBar$copyToQueue_ = function (bar) {
        var queue = bar.list_.getVideoIds();
        yt$www$lists$setQueueVideoIds_([]);
        yt$www$lists$addToQueueCookie_(queue);
        var queue = new yt$www$lists$QueueList();
        var index = bar.list_.getIndex();
        queue.index_ = index;
        queue.shuffleValue_ = bar.list_.shuffleValue_;
        yt$www$lists$PlaylistBar$setList_(bar, queue);
    };
    var yt$www$lists$playlistBar_ = null;
    var yt$www$lists$initialized_ = false;
    var yt$www$lists$getPlaylistBar = function () {
        if (!yt$www$lists$playlistBar_) {
            var element = goog$dom$getElement("playlist-bar");
            var isWatchTray = false;
            if (!element && yt$getConfig("ENABLE_WATCH6")) {
                element = goog$dom$getElement("watch-tray-playlist");
                isWatchTray = true;
            }
            if (element) {
                var container = element;
                var list;
                if (goog$dom$classes$has(container, "active")) {
                    list = yt$dom$datasets$get(container, "list-type") || "";
                    if (list == "QL") {
                        list = new yt$www$lists$QueueList(true);
                    } else {
                        var value = yt$dom$datasets$get(container, "list-id") || "";
                        var videoIds = (yt$dom$datasets$get(container, "video-ids") || "").split(",");
                        list = yt$www$lists$createList(list, value, videoIds);
                    }
                    value = parseInt(yt$dom$datasets$get(container, "index-offset"), 10) || 0;
                    list.indexOffset_ = value;
                    list.index_ = parseInt(yt$getConfig("PLAYLIST_BAR_PLAYING_INDEX"), 10) || 0;
                    list.autoplayCount_ = parseInt(yt$getConfig("LIST_AUTO_PLAY_VALUE"), 10) || 0;
                    value = 0;
                    if (yt$getConfig("SHUFFLE_ENABLED")) {
                        value = yt$www$lists$getShuffleValue_();
                    }
                    list.shuffleValue_ = value;
                } else {
                    list = new yt$www$lists$QueueList(true);
                }
                value = yt$dom$datasets$get(container, "video-url");
                list.videoUrl_ = value || "";
                container = goog$dom$classes$has(container, "editable");
                list.editable_ = container;
                list.menuTitleHtml_ = goog$dom$getElement("playlist-bar-title").innerHTML;
                list.menuHtml_ = goog$dom$getElement("playlist-bar-extras-menu").innerHTML;
                yt$www$lists$playlistBar_ = new yt$www$lists$PlaylistBar(element, list, isWatchTray);
            }
        }
        return yt$www$lists$playlistBar_;
    };
    var yt$www$lists$autoplayCountdown_ = function (secondsLeft) {
        var bar = yt$www$lists$getPlaylistBar();
        if (yt$www$lists$PlaylistBar$isAutoplayOn_(bar)) {
            if (secondsLeft > 0) {
                yt$www$lists$PlaylistBar$showAutoplayWarning_(bar, secondsLeft);
                yt$setTimeout(function () {
                    yt$www$lists$autoplayCountdown_(secondsLeft - 1);
                }, 1000);
            } else {
                bar.next(false, "mr_meh");
            }
        }
    };
    var yt$www$lists$onVideosAdded = function (listType, listId, videoIds, msg) {
        if (yt$www$lists$initialized_) {
            var bar = yt$www$lists$getPlaylistBar();
            if (bar) {
                listType = yt$www$lists$createList(listType, listId);
                listId = true;
                if (bar.isPlaying()) {
                    listId = bar.list_.isEqual(listType);
                }
                if (listId) {
                    yt$www$lists$PlaylistBar$setList_(bar, listType, function () {
                        bar.highlightItems(videoIds);
                        yt$www$lists$PlaylistBar$showNotification_(bar, msg, false, true);
                    });
                    bar.show();
                } else {
                    yt$www$lists$PlaylistBar$showNotification_(bar, msg, false, true);
                }
            }
        }
    };
    var yt$www$lists$registerNearEndEventsWithPlayer = function (player) {
        var duration = player.getDuration();
        for (var i = 5; i > 0; i--) {
            player.addCueRange("NEAR_END" + i, duration - i, duration - i + 1);
        }
        player.addEventListener("onCueRangeEnter", "yt.www.lists.handleNearPlaybackEnd");
    };
    var yt$www$lists$isPlayingUserList = function () {
        if (!yt$www$lists$initialized_ || !yt$www$lists$getPlaylistBar().isPlaying()) {
            return false;
        }
        var listType = yt$www$lists$getPlaylistBar().getListType();
        return !goog$array$contains(yt$www$lists$SPECIAL_LIST_TYPES_, listType);
    };
    var yt$www$watch$watch5$resizeTimer_ = -1;
    var yt$www$watch$watch5$enableWide = function (wide) {
        var wide = !!wide;
        var page = goog$dom$getElement("page");
        var sidebar = goog$dom$getElement("watch-sidebar");
        var baseDiv = goog$dom$getElement("baseDiv");
        var styles = yt$getConfig("WIDE_PLAYER_STYLES");
        var duration = 0;
        if ("webkitTransition" in sidebar.style) {
            duration = document.defaultView.getComputedStyle(sidebar, null);
            duration = parseFloat(duration["-webkit-transition-duration"]) * 1000;
        } else if ("MozTransition" in sidebar.style) {
            duration = document.defaultView.getComputedStyle(sidebar, null);
            duration = parseFloat(duration.getPropertyValue("-moz-transition-duration")) * 1000;
        } else if ("OTransition" in sidebar.style) {
            duration = document.defaultView.getComputedStyle(sidebar, null);
            duration = parseFloat(duration.getPropertyValue("-o-transition-duration")) * 1000;
        }
        if (wide) {
            goog$dom$classes$add(page, "watch-wide");
            yt$setTimeout(function () {
                yt$www$watch$watch5$updatePlayerSize();
                for (var k = 0; k < styles.length; ++k) {
                    goog$dom$classes$add(baseDiv, styles[k]);
                }
            }, duration);
        } else {
            duration /= 2;
            yt$www$watch$watch5$updatePlayerSize("small");
            for (var i = 0; i < styles.length; ++i) {
                goog$dom$classes$remove(baseDiv, styles[i]);
            }
            yt$setTimeout(function () {
                goog$dom$classes$remove(page, "watch-wide");
            }, duration);
            yt$www$thumbnaildelayload$loadImmediately(sidebar);
        }
        yt$style$setDisplayed("masthead-utility-menulink-short", wide);
        yt$style$setDisplayed("masthead-utility-menulink-long", !wide);
    };
    var yt$www$watch$watch5$updatePlayerSize = function (size) {
        var video = goog$dom$getElement("watch-video");
        if (!goog$dom$classes$has(goog$dom$getElement("page"), "watch-wide") || size == "small") {
            goog$dom$classes$remove(video, "medium", "large");
        } else {
            var autoLarge = !!yt$getConfig("ENABLE_AUTO_LARGE");
            var isLargeViewport = goog$dom$getViewportSize_(window);
            var isLargeViewport = !!(isLargeViewport.width >= 1400) && !!(isLargeViewport.height >= 1040);
            if (autoLarge && (isLargeViewport || size == "large")) {
                goog$dom$classes$addRemove(video, "medium", "large");
            } else {
                goog$dom$classes$addRemove(video, "large", "medium");
            }
        }
    };
    var yt$www$watch$getPlayerReference_ = function () {
        return yt$getConfig("PLAYER_REFERENCE");
    };
    var yt$www$watch$forwardClick_ = function (event) {
        if (!goog$dom$getAncestorByTagNameAndClass(event.target, "BUTTON")) {
            event.currentTarget.click();
        }
    };
    var yt$sharing$EmailShare = function (container, sessionIndex, videoId, listId) {
        this.container_ = container;
        this.emailSent_ = false;
        container = goog$uri$utils$getHost() + "/share_ajax";
        yt$net$ajax$send(container, {
            format: "JSON",
            urlParams: {
                action_get_email: 1,
                video_id: videoId,
                list: listId
            },
            onSuccess: function (xhr, response) {
                this.container_.innerHTML = response.email_html;
                this.decorate_();
                this.focus();
                var binaryUrl = response.sharing_binary_url;
                if (binaryUrl) {
                    yt$sharing$EmailShare$loadContactTools_(this, binaryUrl, response.contacts, sessionIndex);
                }
            },
            context: this
        });
    };
    yt$sharing$EmailShare.prototype.decorate_ = function () {
        this.form_ = this.container_.getElementsByTagName("form")[0];
        yt$events$listen(this.form_, "submit", goog$bind(this.handleSubmit_, this));
        goog$dom$getElementByClass("share-email-send", this.form_);
        this.successMessage_ = goog$dom$getElementByClass("share-email-success", this.container_);
        this.remailLink_ = goog$dom$getElementByClass("share-email-remail", this.successMessage_);
        yt$events$listen(
            this.remailLink_,
            "click",
            goog$bind(function () {
                yt$sharing$EmailShare$reset_(this);
                this.focus();
            }, this)
        );
        this.recipientsInput_ = goog$dom$getElementByClass("share-email-recipients", this.container_);
        this.noteInput_ = goog$dom$getElementByClass("share-email-note", this.container_);
        this.notePreview_ = goog$dom$getElementByClass("share-email-preview-note", this.container_);
        yt$events$listen(this.noteInput_, "keyup", goog$bind(this.handleNoteKeyUp_, this));
    };
    var yt$sharing$EmailShare$loadContactTools_ = function (share, binaryUrl, contacts, authuser) {
        yt$net$scriptloader$load(
            binaryUrl,
            goog$bind(function () {
                var contactTools = goog$getObjectByName("yt.sharing.ContactTools");
                if (contactTools) {
                    contactTools.createContactTools(this.recipientsInput_, null, contacts, authuser);
                }
            }, share)
        );
    };
    yt$sharing$EmailShare.prototype.reveal = function () {
        if (this.form_) {
            if (this.emailSent_) {
                yt$sharing$EmailShare$reset_(this);
            }
            this.focus();
        }
    };
    yt$sharing$EmailShare.prototype.focus = function () {
        this.recipientsInput_.focus();
    };
    var yt$sharing$EmailShare$reset_ = function (share) {
        share.emailSent_ = false;
        share.recipientsInput_.value = "";
        share.noteInput_.value = "";
        share.notePreview_.innerHTML = "";
        yt$style$hide(share.successMessage_);
        yt$style$show(share.form_);
    };
    yt$sharing$EmailShare.prototype.handleNoteKeyUp_ = function () {
        var note = this.noteInput_.value;
        var note = note.substring(0, 300);
        var note = goog$string$htmlEscape(note);
        var note = note.replace(/\n/g, "<br>");
        this.notePreview_.innerHTML = note;
    };
    yt$sharing$EmailShare.prototype.handleSubmit_ = function (event) {
        event.preventDefault();
        var button = goog$dom$getElementsByTagNameAndClass("button", null, this.form_)[0];
        button.disabled = true;
        var captcha = goog$dom$getElementByClass("share-email-captcha", this.container_);
        var errorEl = goog$dom$getElementByClass("share-email-error", this.container_);
        var errorContent = goog$dom$getElementByClass("yt-alert-content", errorEl);
        var event = goog$uri$utils$getHost() + goog$uri$utils$getPathAndAfter(this.form_.action);
        yt$net$ajax$send(event, {
            format: "JSON",
            method: "POST",
            requestBody: goog$dom$forms$getFormDataString(this.form_),
            onSuccess: function () {
                this.emailSent_ = true;
                yt$style$show(this.successMessage_);
                yt$style$hide(this.form_);
                yt$style$hide(errorEl);
                yt$style$hide(captcha);
            },
            onFail: function (xhr, response) {
                if (response.captcha_html) {
                    captcha.innerHTML = response.captcha_html;
                    yt$style$show(captcha);
                }
                if (response.errors) {
                    errorContent.innerHTML = response.errors.join("<br>");
                    yt$style$show(errorEl);
                }
            },
            onFinish: function () {
                button.disabled = false;
            },
            context: this
        });
    };
    var yt$sharing$EmbedShare = function (container, videoId, listId) {
        this.container_ = container;
        container = goog$uri$utils$getHost() + "/share_ajax";
        yt$net$ajax$send(container, {
            format: "JSON",
            urlParams: {
                action_get_embed: 1,
                video_id: videoId,
                list: listId
            },
            onSuccess: function (xhr, response) {
                this.container_.innerHTML = response.embed_html;
                this.legacyUrl_ = response.legacy_url;
                this.legacyCode_ = response.legacy_code;
                this.iframeUrl_ = response.iframe_url;
                this.iframeCode_ = response.iframe_code;
                this.decorate_();
                var prefs = yt$prefs$UserPrefs.getInstance();
                if (this.showRelatedCheckbox_) {
                    this.showRelatedCheckbox_.checked = !yt$prefs$UserPrefs$getFlag(
                        0,
                        yt$prefs$BitFlags.EMBED_HIDE_RELATED
                    );
                }
                this.delayedCookiesCheckbox_.checked = yt$prefs$UserPrefs$getFlag(
                    0,
                    yt$prefs$BitFlags.EMBED_PRIVACY_MODE
                );
                if (this.useFlashCheckbox_) {
                    this.useFlashCheckbox_.checked = yt$prefs$UserPrefs$getFlag(
                        0,
                        yt$prefs$BitFlags.EMBED_USE_FLASH_CODE
                    );
                }
                prefs = prefs.get("ems");
                (prefs in this.sizes_ ? this.sizes_[prefs] : goog$object$getAnyValue(this.sizes_)).select();
                yt$sharing$EmbedShare$updateEmbedCode_(this);
                this.reveal();
            },
            context: this
        });
    };
    yt$sharing$EmbedShare.prototype.decorate_ = function () {
        this.embedCodeEl_ = goog$dom$getElementByClass("share-embed-code", this.container_);
        yt$events$listen(this.embedCodeEl_, "click", goog$bind(this.handleEmbedCodeClick_, this));
        yt$sharing$EmbedShare$initSizes_(this);
        yt$sharing$EmbedShare$initOptions_(this);
    };
    var yt$sharing$EmbedShare$initSizes_ = function (share) {
        var sizeList = goog$dom$getElementByClass("share-embed-size-list", share.container_);
        var radios = goog$dom$getElementsByClass("share-embed-size-radio", sizeList);
        share.sizes_ = {};
        goog$array$forEach(
            radios,
            function (radio) {
                if (!goog$dom$classes$has(radio, "share-embed-size-radio-custom")) {
                    radio = new yt$sharing$EmbedSize(radio);
                    this.sizes_[radio.name] = radio;
                }
            },
            share
        );
        var radios = goog$object$getAnyValue(share.sizes_).width / (goog$object$getAnyValue(share.sizes_).height - 30);
        var customRadio = goog$dom$getElementByClass("share-embed-size-radio-custom", sizeList);
        var radios = new yt$sharing$CustomEmbedSize(customRadio, radios);
        share.sizes_[radios.name] = radios;
        share.customSize_ = radios;
        yt$events$delegateByClass(sizeList, "click", goog$bind(share.handleSizeClick_, share), "share-embed-size");
        sizeList = goog$dom$getElementByClass("share-embed-customize", sizeList);
        yt$events$listen(sizeList, "keyup", goog$bind(share.handleCustomSizeKeyUp_, share));
    };
    var yt$sharing$EmbedShare$initOptions_ = function (share) {
        var options = {};
        var inputs = goog$dom$getElementsByClass("share-embed-option", share.container_);
        goog$array$forEach(inputs, function (input) {
            options[input.name] = input;
        });
        share.showRelatedCheckbox_ = options["show-related"];
        if (share.showRelatedCheckbox_) {
            yt$events$listen(share.showRelatedCheckbox_, "click", goog$bind(share.handleShowRelatedClick_, share));
        }
        share.delayedCookiesCheckbox_ = options["delayed-cookies"];
        yt$events$listen(share.delayedCookiesCheckbox_, "click", goog$bind(share.handleDelayedCookiesClick_, share));
        share.useHttpsCheckbox_ = options["use-https"];
        yt$events$listen(share.useHttpsCheckbox_, "click", goog$bind(share.handleHttpsClick_, share));
        share.useFlashCheckbox_ = options["use-flash-code"] || null;
        if (share.useFlashCheckbox_) {
            yt$events$listen(share.useFlashCheckbox_, "click", goog$bind(share.handleFlashCodeClick_, share));
        }
    };
    yt$sharing$EmbedShare.prototype.reveal = function () {
        this.focus();
    };
    yt$sharing$EmbedShare.prototype.focus = function () {
        if (this.embedCodeEl_) {
            this.embedCodeEl_.focus();
            this.embedCodeEl_.select();
        }
    };
    var yt$sharing$EmbedShare$updateEmbedCode_ = function (share) {
        var code = share.iframeCode_;
        var url = share.iframeUrl_;
        if (share.useFlashCheckbox_ && share.useFlashCheckbox_.checked) {
            code = share.legacyCode_;
            url = share.legacyUrl_;
        }
        if (share.delayedCookiesCheckbox_.checked) {
            url = url.replace("youtube.com", "youtube-nocookie.com");
        }
        if (share.useHttpsCheckbox_.checked) {
            url = url.split("//");
            url[0] = "https:";
            url = url.join("//");
        }
        var params = {};
        if (share.showRelatedCheckbox_ && !share.showRelatedCheckbox_.checked) {
            params.rel = 0;
        }
        url = yt$uri$setQueryData(url, params);
        params = yt$sharing$EmbedShare$getSelectedSize_(share);
        if (!params.width || params.width < 200) {
            params = goog$object$getAnyValue(share.sizes_);
        }
        code = code.replace(/__url__/g, goog$string$htmlEscape(url));
        code = code.replace(/__width__/g, params.width + "");
        code = code.replace(/__height__/g, params.height + "");
        code = goog$string$htmlEscape(code);
        if (code != share.embedCodeEl_.innerHTML) {
            share.embedCodeEl_.innerHTML = code;
        }
    };
    var yt$sharing$EmbedShare$getSelectedSize_ = function (share) {
        return (
            goog$object$findValue(share.sizes_, function (size) {
                return size.radio_.checked;
            }) || null
        );
    };
    yt$sharing$EmbedShare.prototype.handleShowRelatedClick_ = function () {
        var showRelated = this.showRelatedCheckbox_.checked;
        var prefs = yt$prefs$UserPrefs.getInstance();
        yt$prefs$UserPrefs$setFlag(yt$prefs$BitFlags.EMBED_HIDE_RELATED, !showRelated);
        prefs.save();
        yt$sharing$EmbedShare$updateEmbedCode_(this);
    };
    yt$sharing$EmbedShare.prototype.handleDelayedCookiesClick_ = function () {
        var enabled = this.delayedCookiesCheckbox_.checked;
        var prefs = yt$prefs$UserPrefs.getInstance();
        yt$prefs$UserPrefs$setFlag(yt$prefs$BitFlags.EMBED_PRIVACY_MODE, enabled);
        prefs.save();
        yt$sharing$EmbedShare$updateEmbedCode_(this);
    };
    yt$sharing$EmbedShare.prototype.handleHttpsClick_ = function () {
        yt$sharing$EmbedShare$updateEmbedCode_(this);
    };
    yt$sharing$EmbedShare.prototype.handleFlashCodeClick_ = function () {
        var enabled = this.useFlashCheckbox_.checked;
        var prefs = yt$prefs$UserPrefs.getInstance();
        yt$prefs$UserPrefs$setFlag(yt$prefs$BitFlags.EMBED_USE_FLASH_CODE, enabled);
        prefs.save();
        yt$sharing$EmbedShare$updateEmbedCode_(this);
    };
    yt$sharing$EmbedShare.prototype.handleEmbedCodeClick_ = function () {
        this.focus();
    };
    yt$sharing$EmbedShare.prototype.handleSizeClick_ = function (size) {
        size = this.sizes_[goog$dom$getElementByClass("share-embed-size-radio", size.currentTarget).value];
        size.select();
        var prefs = yt$prefs$UserPrefs.getInstance();
        prefs.set("ems", size.name);
        prefs.save();
        yt$sharing$EmbedShare$updateEmbedCode_(this);
        if (size != this.customSize_) {
            this.focus();
        }
    };
    yt$sharing$EmbedShare.prototype.handleCustomSizeKeyUp_ = function () {
        yt$sharing$EmbedShare$updateEmbedCode_(this);
    };
    var yt$sharing$EmbedSize = function (radio) {
        this.name = radio.value;
        this.radio_ = radio;
        this.width = parseInt(yt$dom$datasets$get(this.radio_, "width"), 10);
        this.height = parseInt(yt$dom$datasets$get(this.radio_, "height"), 10);
    };
    yt$sharing$EmbedSize.prototype.select = function () {
        this.radio_.checked = true;
        var item = goog$dom$getAncestorByTagNameAndClass(this.radio_, "li");
        var selected = goog$dom$getAncestorByTagNameAndClass(item, "ul");
        var selected = goog$dom$getElementsByTagNameAndClass("li", "selected", selected);
        goog$array$forEach(selected, function (sibling) {
            goog$dom$classes$remove(sibling, "selected");
        });
        goog$dom$classes$add(item, "selected");
    };
    var yt$sharing$CustomEmbedSize = function (radio, aspectRatio) {
        yt$sharing$EmbedSize.call(this, radio);
        this.aspectRatio_ = aspectRatio;
        var item = goog$dom$getAncestorByTagNameAndClass(radio, "li");
        this.widthInput_ = goog$dom$getElementByClass("share-embed-size-custom-width", item);
        this.heightInput_ = goog$dom$getElementByClass("share-embed-size-custom-height", item);
        yt$events$listen(this.widthInput_, "keyup", goog$bind(this.handleWidthKeyUp_, this));
        yt$events$listen(this.heightInput_, "keyup", goog$bind(this.handleHeightKeyUp_, this));
    };
    goog$inherits(yt$sharing$CustomEmbedSize, yt$sharing$EmbedSize);
    yt$sharing$CustomEmbedSize.prototype.handleWidthKeyUp_ = function () {
        this.width = parseInt(this.widthInput_.value, 10);
        this.height = (Math.floor(this.width / this.aspectRatio_) || 0) + 30;
        this.heightInput_.value = this.height + "";
    };
    yt$sharing$CustomEmbedSize.prototype.handleHeightKeyUp_ = function () {
        this.height = parseInt(this.heightInput_.value, 10) - 30;
        this.width = Math.ceil(this.height * this.aspectRatio_) || 0;
        this.widthInput_.value = this.width + "";
    };
    var yt$sharing$PlusOneButton = function (container, trackingId, url, lang, sessionIndex, extraParams, showConfirm) {
        this.container_ = container;
        this.trackingId_ = trackingId;
        this.url_ = url;
        this.lang_ = lang;
        this.hasSessionIndex_ = !isNaN(parseInt(sessionIndex, 10));
        this.sessionIndex_ = null;
        if (this.hasSessionIndex_) {
            this.sessionIndex_ = sessionIndex;
        }
        this.extraParams_ = extraParams || {};
        this.showConfirm_ = !!showConfirm;
        window.__GOOGLEAPIS = window.__GOOGLEAPIS || {};
        window.__GOOGLEAPIS.gwidget = window.__GOOGLEAPIS.gwidget || {};
        window.__GOOGLEAPIS.gwidget.lang = this.lang_;
        if (this.hasSessionIndex_) {
            window.__GOOGLEAPIS["googleapis.config"] = window.__GOOGLEAPIS["googleapis.config"] || {};
            window.__GOOGLEAPIS["googleapis.config"].sessionIndex = this.sessionIndex_;
        }
        this.load_();
    };
    yt$sharing$PlusOneButton.prototype.load_ = function () {
        yt$net$scriptloader$load("https://apis.google.com/js/plusone.js", goog$bind(this.renderButton_, this));
    };
    yt$sharing$PlusOneButton.prototype.renderButton_ = function () {
        var render = goog$getObjectByName("gapi.plusone.render");
        if (render) {
            var random = Math.floor(Math.random() * 10000);
            var callbackName = "__PLUS_ONE_CALLBACK_" + random;
            var id = this.container_.id;
            if (!id) {
                id = "plusone-button-" + random;
                this.container_.id = id;
            }
            window[callbackName] = goog$bind(this.handlePlusOne_, this);
            random = {
                callbackName: callbackName,
                count: "false",
                href: this.url_,
                size: "medium",
                source: "google:youtube"
            };
            if (this.showConfirm_) {
                random.db = 1;
            }
            goog$object$extend(random, this.extraParams_);
            yt$style$show(this.container_);
            render(id, random);
        }
    };
    yt$sharing$PlusOneButton.prototype.handlePlusOne_ = function (result) {
        if (result.state != "off") {
            yt$tracking$share("PLUS_ONE", this.trackingId_ + "");
            if (this.showConfirm_) {
                yt$window$popup(
                    yt$uri$appendQueryData("https://plusone.google.com/_/+1/confirm", {
                        url: result.url,
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
    var yt$sharing$SharePanel = function (container, videoId, listId, onLoad, plusOneParams, plusOneConfirm) {
        this.container_ = container;
        this.videoId_ = videoId || null;
        this.listId_ = listId || null;
        this.startTimeEdited_ = false;
        this.plusOneParams_ = plusOneParams || null;
        this.plusOneConfirm_ = plusOneConfirm || false;
        this.load_(onLoad);
    };
    var yt$sharing$SharePanel$parseStartTime_ = function (text) {
        var units = ["h", "m", "s"];
        var remainingUnits = goog$array$toArray(units);
        remainingUnits.reverse();
        var values = {};
        var text = text.toLowerCase().match(/\d+\s*[hms]?/g) || [];
        var text = goog$array$filter(text, function (part) {
            var unitChar = (part.match(/[hms]/) || [""])[0];
            if (unitChar) {
                values[unitChar] = parseInt(part.match(/\d+/)[0], 10);
                return false;
            } else {
                return true;
            }
        });
        for (text.reverse(); text.length && remainingUnits.length;) {
            var unit = remainingUnits.shift();
            if (!(unit in values)) {
                values[unit] = parseInt(text.shift(), 10);
            }
        }
        if (text.length || values.s > 59 || values.m > 59 || values.h > 9) {
            return null;
        }
        var result = "";
        goog$array$forEach(units, function (u) {
            if (values[u]) {
                result += values[u] + u;
            }
        });
        return result || null;
    };
    yt$sharing$SharePanel.prototype.load_ = function (onLoad) {
        var url = goog$uri$utils$getHost() + "/share_ajax";
        yt$net$ajax$send(url, {
            format: "JSON",
            urlParams: {
                action_get_share_box: 1,
                video_id: this.videoId_,
                list: this.listId_,
                new_share_layout: true
            },
            onSuccess: function (xhr, response) {
                this.container_.innerHTML = response.share_html;
                this.shortUrl_ = response.url_short;
                this.longUrl_ = response.url_long;
                this.lang_ = response.lang;
                this.sessionIndex_ = null;
                if ("session_index" in response) {
                    this.sessionIndex_ = response.session_index;
                }
                this.decorate_();
                var dynamicServices = goog$dom$getElementByClass("share-panel-services-dynamic", this.container_);
                if (dynamicServices) {
                    new yt$sharing$PlusOneButton(
                        dynamicServices,
                        (this.videoId_ || this.listId_) + "",
                        this.longUrl_,
                        this.lang_,
                        this.sessionIndex_,
                        this.plusOneParams_,
                        this.plusOneConfirm_
                    );
                }
                if (onLoad) {
                    onLoad();
                }
                this.reveal();
            },
            context: this
        });
    };
    yt$sharing$SharePanel.prototype.decorate_ = function () {
        var el = goog$dom$getElementByClass("share-panel-show-url-options");
        yt$events$listen(el, "click", goog$bind(this.handleShowUrlOptions_, this));
        el = goog$dom$getElementByClass("share-panel-show-more");
        yt$events$listen(el, "click", goog$bind(this.handleShowMoreServices_, this));
        el = goog$dom$getElementByClass("share-panel-embed", this.container_);
        yt$events$listen(el, "click", goog$bind(this.handleEmbedClick_, this));
        el = goog$dom$getElementByClass("share-panel-email", this.container_);
        yt$events$listen(el, "click", goog$bind(this.handleEmailClick_, this));
        if ((el = goog$dom$getElementByClass("share-panel-hangout", this.container_))) {
            yt$events$listen(el, "click", goog$bind(this.handleHangoutClick_, this));
        }
        this.urlInput_ = goog$dom$getElementByClass("share-panel-url", this.container_);
        yt$events$listen(this.urlInput_, "click", goog$bind(this.handleUrlClick_, this));
        yt$events$listen(
            this.urlInput_,
            "focus",
            goog$bind(function () {
                goog$dom$classes$add(this.urlInput_, "focused");
            }, this)
        );
        yt$events$listen(
            this.urlInput_,
            "blur",
            goog$bind(function () {
                goog$dom$classes$remove(this.urlInput_, "focused");
            }, this)
        );
        this.longUrlCheckbox_ = goog$dom$getElementByClass("share-panel-long-url", this.container_);
        this.startAtCheckbox_ = goog$dom$getElementByClass("share-panel-start-at", this.container_);
        this.startAtInput_ = goog$dom$getElementByClass("share-panel-start-at-time", this.container_);
        yt$events$listen(this.startAtInput_, "keyup", goog$bind(this.handleStartAtKeyUp_, this));
        yt$events$listen(this.startAtInput_, "click", goog$bind(this.handleStartAtClick_, this));
        yt$events$listen(
            this.startAtInput_,
            "focus",
            goog$bind(function () {
                goog$dom$classes$add(this.startAtInput_, "focused");
            }, this)
        );
        yt$events$listen(
            this.startAtInput_,
            "blur",
            goog$bind(function () {
                goog$dom$classes$remove(this.startAtInput_, "focused");
            }, this)
        );
        this.hdCheckbox_ = goog$dom$getElementByClass("share-panel-hd", this.container_);
        this.includeListCheckbox_ = goog$dom$getElementByClass("share-panel-include-list", this.container_);
        this.urlOptionsEl_ = goog$dom$getElementByClass("share-panel-url-options", this.container_);
        yt$events$listen(this.urlOptionsEl_, "click", goog$bind(this.updateUrl, this));
        this.servicesEl_ = goog$dom$getElementByClass("share-panel-services", this.container_);
        this.buttonsEl_ = goog$dom$getElementByClass("share-panel-buttons", this.container_);
        el = goog$dom$getElementByClass("share-panel-show-more", this.container_);
        yt$events$listen(el, "click", goog$bind(this.handleShowMoreButtons_, this));
    };
    yt$sharing$SharePanel.prototype.reveal = function () {
        if (this.urlInput_ && !goog$dom$classes$has(this.urlInput_, "focused")) {
            this.urlInput_.focus();
            this.urlInput_.select();
        }
    };
    var yt$sharing$setStartTime = function (time) {
        var panel = yt$sharing$sharePanel_;
        if (panel.startAtInput_ && !goog$dom$classes$has(panel.startAtInput_, "focused") && !panel.startTimeEdited_) {
            panel.startAtInput_.value = time;
            panel.updateUrl();
        }
    };
    yt$sharing$SharePanel.prototype.updateUrl = function () {
        if (!goog$dom$classes$has(this.urlInput_, "focused")) {
            var url = this.shortUrl_;
            if (this.longUrlCheckbox_.checked) {
                url = this.longUrl_;
            }
            var params = {};
            if (this.hdCheckbox_ && this.hdCheckbox_.checked) {
                params.hd = 1;
            }
            if (this.includeListCheckbox_ && this.includeListCheckbox_.checked) {
                params.list = this.listId_;
            }
            var startTime =
                this.startAtCheckbox_.checked && yt$sharing$SharePanel$parseStartTime_(this.startAtInput_.value);
            if (startTime) {
                params.t = startTime;
            }
            url = yt$uri$appendQueryData(url, params);
            if (this.urlInput_.value != url) {
                this.urlInput_.value = url;
            }
        }
    };
    yt$sharing$SharePanel.prototype.handleStartAtKeyUp_ = function () {
        this.startTimeEdited_ = true;
        this.startAtCheckbox_.checked = true;
        this.updateUrl();
    };
    yt$sharing$SharePanel.prototype.handleStartAtClick_ = function () {
        this.startAtCheckbox_.checked = true;
        if (!this.startAtInput_.value.match(/[1-9]/)) {
            this.startAtInput_.value = "";
        }
    };
    yt$sharing$SharePanel.prototype.handleUrlClick_ = function () {
        this.urlInput_.select();
    };
    yt$sharing$SharePanel.prototype.handleEmailClick_ = function () {
        var expander = yt$uix$Expander.getInstance();
        expander.collapse(this.buttonsEl_);
        expander.collapse(this.urlOptionsEl_);
        expander.collapse(this.servicesEl_);
        if (this.embedContainer_) {
            yt$style$hide(this.embedContainer_);
        }
        if (!this.emailContainer_) {
            this.emailContainer_ = goog$dom$getElementByClass("share-panel-email-container", this.container_);
        }
        yt$style$toggleOne_(this.emailContainer_);
        if (!yt$dom$datasets$get(this.emailContainer_, "disabled") && yt$style$isDisplayed(this.emailContainer_)) {
            if (this.emailShare_) {
                this.emailShare_.reveal();
            } else {
                this.emailShare_ = new yt$sharing$EmailShare(
                    this.emailContainer_,
                    this.sessionIndex_,
                    this.videoId_,
                    this.listId_
                );
            }
        }
    };
    yt$sharing$SharePanel.prototype.handleHangoutClick_ = function () {
        var player = yt$www$watch$getPlayerReference_();
        if (player && player.pauseVideo) {
            player.pauseVideo();
        }
        var player = yt$uri$appendQueryData("https://talkgadget.google.com/hangouts", {
            hl: this.lang_,
            authuser: this.sessionIndex_,
            gid: "youtube",
            gd: this.videoId_
        });
        var height = window.screen.height;
        var width = Math.min(window.screen.width * 0.9, 1000);
        var height = Math.min(height * 0.9, 800);
        yt$tracking$share("HANGOUT", this.videoId_ + "");
        yt$window$popup(player, {
            width: width,
            height: height
        });
    };
    yt$sharing$SharePanel.prototype.handleEmbedClick_ = function () {
        var expander = yt$uix$Expander.getInstance();
        expander.collapse(this.buttonsEl_);
        expander.collapse(this.urlOptionsEl_);
        expander.collapse(this.servicesEl_);
        if (this.emailContainer_) {
            yt$style$hide(this.emailContainer_);
        }
        if (!this.embedContainer_) {
            this.embedContainer_ = goog$dom$getElementByClass("share-panel-embed-container", this.container_);
        }
        yt$style$toggleOne_(this.embedContainer_);
        if (!yt$dom$datasets$get(this.embedContainer_, "disabled") && yt$style$isDisplayed(this.embedContainer_)) {
            if (this.embedShare_) {
                this.embedShare_.reveal();
            } else {
                this.embedShare_ = new yt$sharing$EmbedShare(this.embedContainer_, this.videoId_, this.listId_);
            }
        }
    };
    yt$sharing$SharePanel.prototype.handleShowUrlOptions_ = function () {
        yt$uix$Expander.getInstance().collapse(this.servicesEl_);
        if (this.emailContainer_) {
            yt$style$hide(this.emailContainer_);
        }
        if (this.embedContainer_) {
            yt$style$hide(this.embedContainer_);
        }
    };
    yt$sharing$SharePanel.prototype.handleShowMoreServices_ = function () {
        yt$uix$Expander.getInstance().collapse(this.urlOptionsEl_);
        if (this.emailContainer_) {
            yt$style$hide(this.emailContainer_);
        }
        if (this.embedContainer_) {
            yt$style$hide(this.embedContainer_);
        }
    };
    yt$sharing$SharePanel.prototype.handleShowMoreButtons_ = function () {
        if (this.emailContainer_) {
            yt$style$hide(this.emailContainer_);
        }
        if (this.embedContainer_) {
            yt$style$hide(this.embedContainer_);
        }
    };
    var yt$player$PlayerActions = function () {};
    yt$player$PlayerActions.prototype.actionsDecorated_ = false;
    yt$player$PlayerActions.prototype.playerRoot_ = null;
    yt$player$PlayerActions.prototype.actionsContainer_ = null;
    yt$player$PlayerActions.prototype.decorateActions_ = function () {
        if (!this.actionsDecorated_) {
            this.actionsDecorated_ = true;
            this.playerRoot_ = goog$dom$getElementByClass("player-root", undefined);
            this.actionsContainer_ = goog$dom$getElementByClass("player-actions-container", this.playerRoot_);
            var closeButton = goog$dom$getElementByClass("player-actions-close", this.actionsContainer_);
            yt$events$listen(closeButton, "click", goog$bind(this.hide, this));
        }
    };
    yt$player$PlayerActions.prototype.hide = function () {
        goog$dom$classes$enable(this.playerRoot_, "actions-mode", false);
    };
    yt$player$PlayerActions.prototype.adjustForSmallView_ = function () {
        if (this.playerRoot_.clientWidth < 600) {
            goog$dom$classes$add(this.actionsContainer_, "small-view");
        }
    };
    yt$player$PlayerActions.prototype.sharePanel_ = null;
    yt$player$PlayerActions.prototype.showShare = function (videoId, listId) {
        this.decorateActions_();
        goog$dom$classes$enable(this.playerRoot_, "actions-mode", true);
        if (this.sharePanel_) {
            this.sharePanel_.reveal();
        } else {
            var container = goog$dom$getElementByClass("player-actions-share", this.actionsContainer_);
            this.sharePanel_ = new yt$sharing$SharePanel(
                container,
                videoId,
                listId,
                goog$bind(this.adjustForSmallView_, this),
                {
                    db: 1
                }
            );
        }
    };
    goog$debug$Console$autoInstall();
    var yt$player$logger = goog$debug$LogManager$getLogger("yt.player.logger");
    yt$player$logger.setLevel(goog$debug$Logger$Level$INFO);
    var yt$player$canPlayHtml5_ = function () {
        if (navigator && navigator.userAgent && /android 2\.2/.test(navigator.userAgent.toLowerCase())) {
            return true;
        }
        var video = document.createElement("video");
        return (
            video &&
            video.canPlayType &&
            (video.canPlayType('video/mp4; codecs="avc1.42001E, mp4a.40.2"') ||
                video.canPlayType('video/webm; codecs="vp8.0, vorbis"'))
        );
    };
    var yt$playerConfig = goog$getObjectByName("yt.playerConfig") || {};
    goog$exportSymbol("yt.playerConfig", yt$playerConfig);
    var yt$player$playerReferences_ = goog$getObjectByName("yt.player.playerReferences_") || {};
    goog$exportSymbol("yt.player.playerReferences_", yt$player$playerReferences_);
    var yt$player$embed = function (disableFlash, disableHtml5, replace) {
        var container = goog$dom$getElement(disableFlash);
        if (container) {
            var config;
            config = disableHtml5 instanceof yt$player$Config ? disableHtml5 : new yt$player$Config(disableHtml5);
            var disableHtml5 = !!config.disable.html5;
            var disableFlash = !!config.disable.flash;
            var html5Available =
                yt$player$canPlayHtml5_() && (goog$getObjectByName("yt.player.VideoPlayer") || config.assets.js);
            if (!config.args.eurl) {
                config.args.eurl = yt$player$getEmbedReferrer_();
            }
            config.args.enablejsapi = "1";
            var preferHtml5 = false;
            if (config.html5) {
                preferHtml5 = true;
            }
            if (preferHtml5 && !html5Available) {
                config.args.html5_unavailable = "1";
            }
            var api = {
                pubsub: new goog$pubsub$PubSub(),
                subscribedEvents: {}
            };
            var target = container;
            if (!replace) {
                yt$player$prepareContainer_(container);
                target = goog$dom$getElementByClass("player-container", container);
            }
            var container = "player" + goog$getUid(target);
            var useDefaultCallback = !config.args.jsapicallback;
            var playerRef = {
                target: target,
                playerId: container,
                playerapiid: config.args.playerapiid,
                jsapicallback: yt$player$resolveCallback_(config.args.jsapicallback),
                elementId: config.attrs.id,
                api: api,
                onReadyCalled: false,
                eventLabel: config.args.el,
                actions: new yt$player$PlayerActions()
            };
            config.args.playerapiid = container;
            config.args.jsapicallback = "ytPlayerOnYouTubePlayerReady";
            var primaryEmbed;
            var fallbackEmbed;
            var flashEmbed = !replace ? yt$player$embedFlash_ : yt$flash$update;
            if (preferHtml5 && html5Available) {
                primaryEmbed = yt$player$embedHtml5_;
                if (!disableFlash) {
                    fallbackEmbed = flashEmbed;
                }
            } else {
                primaryEmbed = flashEmbed;
                if (html5Available && !disableHtml5) {
                    fallbackEmbed = yt$player$embedHtml5_;
                }
            }
            if (fallbackEmbed) {
                config.fallback = function (fallbackConfig) {
                    fallbackConfig = fallbackConfig || config;
                    if (!(fallbackConfig instanceof yt$player$Config)) {
                        fallbackConfig = new yt$player$Config(fallbackConfig);
                    }
                    delete fallbackConfig.fallback;
                    if (preferHtml5) {
                        fallbackConfig.args.autoplay = 1;
                    } else {
                        yt$net$ajax$send("/html5", {
                            absoluteUrl: true,
                            method: "POST",
                            postParams: {
                                prefer_html5: true,
                                session_token: yt$net$ajax$tokenMap_.html5_ajax
                            }
                        });
                    }
                    fallbackConfig.attrs.id = playerRef.elementId;
                    fallbackEmbed(target, fallbackConfig);
                };
            }
            config.fallbackMessage = yt$player$createFallbackMessage_(target);
            yt$player$playerReferences_[container] = playerRef;
            yt$setTimeout(function () {
                if (replace) {
                    var player = goog$dom$getElement(config.attrs.id);
                    var hasApi = false;
                    try {
                        player.getApiInterface();
                        hasApi = true;
                    } catch (d) {}
                    if (useDefaultCallback) {
                        window.onYouTubePlayerReady = function () {
                            ytPlayerOnYouTubePlayerReady(playerRef.playerId);
                        };
                    }
                    primaryEmbed(config, replace.force);
                    if (hasApi) {
                        ytPlayerOnYouTubePlayerReady(playerRef.playerId);
                    }
                } else {
                    primaryEmbed(target, config);
                }
            }, 0);
            return api;
        }
    };
    var yt$player$createFallbackMessage_ = function (container) {
        return function () {
            var msg = yt$getMsg(
                "PLAYER_FALLBACK",
                undefined,
                'The Adobe Flash Player or an HTML5 supported browser is required for video playback. <br> <a href="http://get.adobe.com/flashplayer/">Get the latest Flash Player</a> <br> <a href="/html5">Learn more about upgrading to an HTML5 browser</a>'
            );
            var safariVersion = navigator.userAgent.match(/Version\/(\d).*Safari/);
            if (safariVersion && parseInt(safariVersion[1], 10) >= 5) {
                msg = yt$getMsg(
                    "QUICKTIME_FALLBACK",
                    undefined,
                    'The Adobe Flash Player or QuickTime is required for video playback. <br> <a href="http://get.adobe.com/flashplayer/">Get the latest Flash Player</a> <br> <a href="http://www.apple.com/quicktime/download/">Get the latest version of QuickTime</a>'
                );
            }
            container.innerHTML = '<div class="fallback-message">' + msg + "</div>";
        };
    };
    var yt$player$prepareContainer_ = function (root) {
        goog$dom$classes$add(root, "player-root");
        if (goog$isString("overflow")) {
            goog$style$setStyle_(root, "hidden", "overflow");
        } else {
            goog$object$forEach("overflow", goog$partial(goog$style$setStyle_, root));
        }
        var playerContainer = goog$dom$createDom("div", "player-container");
        var actionsContainer = goog$dom$createDom(
            "div",
            "player-actions-container",
            goog$dom$createDom("div", "player-actions-share"),
            goog$dom$createDom("div", "player-actions-close", goog$dom$createDom("div", "player-actions-close-button"))
        );
        goog$dom$append(root, playerContainer, actionsContainer);
    };
    var yt$player$embedHtml5_ = function (container, config) {
        yt$player$clearContainer_(container);
        config.attrs.id += "-html5";
        var VideoPlayer = goog$getObjectByName("yt.player.VideoPlayer");
        if (VideoPlayer) {
            new VideoPlayer(container, config);
        } else {
            yt$net$scriptloader$load(config.assets.js, function () {
                new (goog$getObjectByName("yt.player.VideoPlayer"))(container, config);
            });
        }
    };
    var yt$player$embedFlash_ = function (container, config) {
        yt$player$clearContainer_(container);
        config.attrs.id += "-flash";
        yt$flash$embed(container, config);
    };
    var yt$player$clearContainer_ = function (container) {
        container = goog$dom$getElement(container);
        goog$dom$removeChildren(container);
    };
    var yt$player$getEmbedReferrer_ = function () {
        var referrer = "unknown";
        if (document.referrer) {
            referrer = document.referrer.substring(0, 128);
        }
        return referrer;
    };
    var ytPlayerOnYouTubePlayerReady = function (playerId) {
        var playerRef = yt$player$playerReferences_[playerId];
        var player = goog$dom$getFirstElementChild(goog$dom$getElement(playerRef.target));
        var playerId = player.getApiInterface();
        goog$array$forEach(playerId, function (method) {
            playerRef.api[method] = goog$bind(player[method], player);
        });
        playerRef.api.nativeAddEventListener = goog$bind(playerRef.api.addEventListener, player);
        for (var eventName in playerRef.api.subscribedEvents) {
            playerRef.api.nativeAddEventListener(eventName, yt$player$exportEventCallback_(playerRef.api, eventName));
        }
        playerRef.api.addEventListener = yt$player$addEventListener_;
        if (playerRef.eventLabel === "embedded") {
            playerRef.api.addEventListener("SHARE_CLICKED", goog$bind(playerRef.actions.showShare, playerRef.actions));
        }
        if (!playerRef.onReadyCalled) {
            playerRef.onReadyCalled = true;
            if (playerRef.jsapicallback && (eventName = playerRef.jsapicallback)) {
                eventName(playerRef.playerapiid);
            }
            if (window.onYouTubePlayerReady) {
                onYouTubePlayerReady(playerRef.playerapiid);
            }
        }
    };
    var yt$player$exportEventCallback_ = function (api, eventName) {
        var callbackName = "ytPlayer" + (eventName + goog$getUid(api));
        var callback = goog$bind(function (arg) {
            this.pubsub.publish(eventName, arg);
        }, api);
        goog$exportSymbol(callbackName, callback);
        return callbackName;
    };
    var yt$player$addEventListener_ = function (eventName, listener) {
        var callback = yt$player$resolveCallback_(listener);
        if (!this.subscribedEvents[eventName]) {
            this.nativeAddEventListener(eventName, yt$player$exportEventCallback_(this, eventName));
        }
        this.subscribedEvents[eventName] = 1;
        this.pubsub.subscribe(eventName, callback);
    };
    var yt$player$resolveCallback_ = function (callbackOrName) {
        var callback = callbackOrName;
        if (typeof callbackOrName == "string") {
            callback = function () {
                goog$getObjectByName(callbackOrName).apply(window, arguments);
            };
        }
        if (!callback) {
            callback = goog$getObjectByName("onYouTubePlayerReady");
        }
        return callback;
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
    yt$timing.thumbnailLoadCount = 0;
    yt$timing.thumbnailCachedCount = 0;
    yt$timing.tick = function (label, time) {
        var timer = yt$timing.timer || {};
        timer[label] = time ? time : goog$now();
        yt$timing.timer = timer;
    };
    yt$timing.info = function (key, value) {
        var args = yt$timing.info_args || {};
        args[key] = value;
        yt$timing.info_args = args;
    };
    yt$timing.sendReport = function (action) {
        var action = action || yt$getConfig("TIMING_ACTION");
        var timer = yt$timing.timer || {};
        var args = yt$timing.info_args || {};
        var start = timer.start;
        var srt = "";
        var ticks = [];
        var infos = [];
        delete timer.start;
        if (yt$timing.srt) {
            srt = "&srt=" + yt$timing.srt;
        }
        if (timer.aft && timer.plev) {
            timer.aft = Math.min(timer.aft, timer.plev);
        }
        for (var key in timer) {
            ticks.push(key + "." + Math.round(timer[key] - start));
        }
        for (key in args) {
            infos.push(key + "=" + args[key]);
        }
        if (timer.vr && timer.gv) {
            ticks.push("vl." + Math.round(timer.vr - timer.gv));
        }
        if (!timer.aft && timer.vr && timer.cl) {
            if (timer.cl > timer.vr) {
                ticks.push("aft." + Math.round(timer.cl - start));
            } else {
                ticks.push("aft." + Math.round(timer.vr - start));
            }
        } else if (!timer.aft && timer.vr) {
            ticks.push("aft." + Math.round(timer.vr - start));
        } else if (!timer.aft) {
            ticks.push("aft." + Math.round(timer.ol - start));
        }
        yt$net$ping$send(
            [
                window.location.protocol == "https:" ? "https://gg.google.com/csi" : "http://csi.gstatic.com/csi",
                "?v=2&s=youtube&action=",
                action,
                srt,
                "&",
                infos.join("&"),
                "&rt=",
                ticks.join(",")
            ].join("")
        );
    };
    yt$timing.maybeSendReport = function () {
        var action = yt$getConfig("TIMING_ACTION");
        var timer = yt$timing.timer || {};
        if (action && timer.start) {
            if (yt$timing.wff && action.indexOf("ajax") != -1 && timer.vr && timer.cl) {
                yt$timing.sendReport();
            } else if (yt$timing.wff && action.indexOf("ajax") == -1 && timer.vr) {
                yt$timing.sendReport();
            } else if (!yt$timing.wff && (timer.ol || timer.aft)) {
                yt$timing.sendReport();
            }
        }
    };
    yt$timing.handleOnload = function () {
        yt$timing.tick("ol");
        yt$timing.maybeSendReport();
    };
    yt$timing.handleThumbnailLoad = function (cacheIndex) {
        var count = ++yt$timing.thumbnailLoadCount;
        if (typeof cacheIndex != "undefined" && cacheIndex < 4) {
            yt$timing.thumbnailCachedCount++;
        }
        if (yt$timing.thumbnailCachedCount == 4) {
            yt$timing.tick("tn_c4");
        }
        if (count == 1 || count == 5 || count == 10 || count == 20 || count == 30) {
            yt$timing.tick("tn" + count);
        }
    };
    var yt$uix$CharCounter = function () {
        this.callbacks_ = {};
    };
    goog$inherits(yt$uix$CharCounter, yt$uix$BaseWidget);
    goog$addSingletonGetter(yt$uix$CharCounter);
    yt$uix$CharCounter.prototype.cssName_ = "char-counter";
    yt$uix$CharCounter.prototype.initWidget = function () {
        this.addBehavior("keydown", this.handleInput_, "input");
        this.addBehavior("paste", this.handleInput_, "input");
        this.addBehavior("cut", this.handleInput_, "input");
    };
    yt$uix$CharCounter.prototype.handleInput_ = function (input) {
        var counter = yt$uix$BaseWidget$findWidgetElement_(this, input);
        if (counter) {
            var countBytes = this.getData(counter, "count-char-by-size") == "true";
            var limit = parseInt(this.getData(counter, "char-limit"), 10);
            if (!isNaN(limit) && !(limit <= 0)) {
                yt$setTimeout(
                    goog$bind(function () {
                        var maxLength = parseInt(input.getAttribute("maxlength"), 10);
                        if (!isNaN(maxLength)) {
                            var length = yt$uix$CharCounter$getLength_(input, countBytes);
                            if (countBytes) {
                                if (length > maxLength) {
                                    var value = input.value;
                                    var valueLength = value.length;
                                    var removed = 0;
                                    var maxLength = length - maxLength;
                                    var length = "";
                                    var byteLength = 0;
                                    do {
                                        length += value[valueLength - removed];
                                        byteLength = unescape(encodeURIComponent(length)).length;
                                        removed++;
                                    } while (byteLength < maxLength);
                                    input.value = input.value.substring(0, valueLength - removed);
                                }
                            } else if (length > maxLength) {
                                input.value = input.value.substring(0, maxLength);
                            }
                        }
                        value = parseInt(this.getData(counter, "warn-at-chars-remaining"), 10);
                        if (isNaN(value)) {
                            value = 0;
                        }
                        valueLength = limit - yt$uix$CharCounter$getLength_(input, countBytes);
                        goog$dom$classes$enable(
                            counter,
                            yt$uix$BaseWidget$getCssClass(this, "maxed-out"),
                            valueLength < value
                        );
                        goog$dom$getElementByClass(
                            yt$uix$BaseWidget$getCssClass(this, "remaining"),
                            counter
                        ).innerHTML = valueLength;
                    }, this),
                    0
                );
            }
        }
    };
    var yt$uix$CharCounter$getLength_ = function (input, countBytes) {
        var value = input.value;
        if (countBytes) {
            return unescape(encodeURIComponent(value)).length;
        } else {
            return value.length;
        }
    };
    var yt$uix$Card = function () {
        this.callbacks_ = {};
    };
    goog$inherits(yt$uix$Card, yt$uix$BaseWidget);
    yt$uix$Card.prototype.canInit = function () {
        if (this.isJscript_ && goog$userAgent$VERSION.indexOf("6") == 0) {
            return false;
        } else {
            return true;
        }
    };
    yt$uix$Card.prototype.show = function (target) {
        var root = yt$uix$BaseWidget$findWidgetElement_(this, target);
        if (root) {
            goog$dom$classes$add(root, yt$uix$BaseWidget$getCssClass(this, "active"));
            var card = yt$uix$Card$getCard_(this, target, root);
            if (card) {
                card.cardTargetNode = target;
                card.cardRootNode = root;
                yt$uix$Card$positionCard_(this, target, card);
                var visibleClass = yt$uix$BaseWidget$getCssClass(this, "card-visible");
                yt$setTimeout(function () {
                    yt$style$show(card);
                    goog$dom$classes$add(card, visibleClass);
                }, 10);
                this.callAction(root, "card-action", target);
            }
        }
    };
    var yt$uix$Card$getCard_ = function (widget, target, root) {
        var cardClass = yt$uix$BaseWidget$getCssClass(widget, "card");
        var cardId = cardClass + yt$dom$getUid(root);
        var card = goog$dom$getElement(cardId);
        if (card) {
            return card;
        }
        var content = widget.getContentElement(root);
        if (!content) {
            return null;
        }
        card = document.createElement("div");
        card.id = cardId;
        card.className = cardClass;
        if ((root = yt$dom$datasets$get(root, "card-class"))) {
            goog$dom$classes$add(card, root);
        }
        root = document.createElement("div");
        root.className = yt$uix$BaseWidget$getCssClass(widget, "card-border");
        target = widget.getData(target, "orientation") || "horizontal";
        cardClass = document.createElement("div");
        cardClass.className = "yt-uix-card-border-arrow yt-uix-card-border-arrow-" + target;
        cardId = document.createElement("div");
        cardId.className = yt$uix$BaseWidget$getCssClass(widget, "card-body");
        widget = document.createElement("div");
        widget.className = "yt-uix-card-body-arrow yt-uix-card-body-arrow-" + target;
        goog$dom$removeNode(content);
        cardId.appendChild(content);
        root.appendChild(widget);
        root.appendChild(cardId);
        card.appendChild(cardClass);
        card.appendChild(root);
        document.body.appendChild(card);
        return card;
    };
    var yt$uix$Card$positionCard_ = function (widget, target, card) {
        var horizontal = widget.getData(target, "orientation") || "horizontal";
        var flipX = widget.getData(target, "position");
        var forcePosition = !!widget.getData(target, "force-position");
        var horizontal = horizontal == "horizontal";
        var flipY = flipX == "bottomright" || flipX == "bottomleft";
        var flipX = flipX == "topright" || flipX == "bottomright";
        var cardCorner;
        var anchorCorner;
        if (flipX && flipY) {
            anchorCorner = 7;
            cardCorner = 4;
        } else if (flipX && !flipY) {
            anchorCorner = 6;
            cardCorner = 5;
        } else if (!flipX && flipY) {
            anchorCorner = 5;
            cardCorner = 6;
        } else {
            anchorCorner = 4;
            cardCorner = 7;
        }
        var bodyRtl = goog$style$isRightToLeft(document.body);
        var arrowOffset = goog$style$isRightToLeft(target);
        if (bodyRtl != arrowOffset) {
            anchorCorner ^= 2;
        }
        var margin;
        if (horizontal) {
            arrowOffset = target.offsetHeight / 2 - 24;
            margin = new goog$math$Coordinate(-12, target.offsetHeight + 6);
        } else {
            arrowOffset = target.offsetWidth / 2 - 12;
            margin = new goog$math$Coordinate(target.offsetWidth + 6, -12);
        }
        var overflow = null;
        if (!forcePosition) {
            overflow = 10;
        }
        var flipClass = yt$uix$BaseWidget$getCssClass(widget, "card-flip");
        var widget = yt$uix$BaseWidget$getCssClass(widget, "card-reverse");
        goog$dom$classes$enable(card, flipClass, flipX);
        goog$dom$classes$enable(card, widget, flipY);
        overflow = goog$positioning$positionAtAnchor(target, anchorCorner, card, cardCorner, margin, null, overflow);
        if (!forcePosition && overflow) {
            if (overflow & 48) {
                flipX = !flipX;
                anchorCorner ^= 2;
                cardCorner ^= 2;
            }
            if (overflow & 192) {
                flipY = !flipY;
                anchorCorner ^= 1;
                cardCorner ^= 1;
            }
            goog$dom$classes$enable(card, flipClass, flipX);
            goog$dom$classes$enable(card, widget, flipY);
            goog$positioning$positionAtAnchor(target, anchorCorner, card, cardCorner, margin);
        }
        target = goog$dom$getElementByClass("yt-uix-card-body-arrow", card);
        forcePosition = goog$dom$getElementByClass("yt-uix-card-border-arrow", card);
        card = goog$style$getSize(card);
        arrowOffset = Math.max(6, Math.min(arrowOffset, (horizontal ? card.height : card.width) - 24 - 6));
        card = horizontal ? (flipY ? "top" : "bottom") : (!bodyRtl && flipX) || (bodyRtl && !flipX) ? "left" : "right";
        target.setAttribute("style", "");
        forcePosition.setAttribute("style", "");
        target.style[card] = arrowOffset + "px";
        forcePosition.style[card] = arrowOffset + "px";
    };
    yt$uix$Card.prototype.hide = function (target) {
        var root = yt$uix$BaseWidget$findWidgetElement_(this, target);
        if (root && (target = yt$uix$Card$getCard_(this, target, root))) {
            goog$dom$classes$remove(root, yt$uix$BaseWidget$getCssClass(this, "active"));
            goog$dom$classes$remove(target, yt$uix$BaseWidget$getCssClass(this, "card-visible"));
            yt$style$hide(target);
            target.cardTargetNode = null;
            target.cardRootNode = null;
        }
    };
    var yt$uix$Card$isActive = function (widget, target) {
        var root = yt$uix$BaseWidget$findWidgetElement_(widget, target);
        if (!root) {
            return false;
        } else {
            return goog$dom$classes$has(root, yt$uix$BaseWidget$getCssClass(widget, "active"));
        }
    };
    yt$uix$Card.prototype.getContentElement = function (root) {
        var content = root.cardContentNode;
        if (!content) {
            var contentClass = yt$uix$BaseWidget$getCssClass(this, "content");
            var cardContentClass = yt$uix$BaseWidget$getCssClass(this, "card-content");
            var content = goog$dom$getElementByClass(contentClass, root);
            goog$dom$classes$addRemove(content, contentClass, cardContentClass);
            root.cardContentNode = content;
        }
        return content;
    };
    yt$uix$Card.prototype.delays_ = {
        showDelay: 200,
        hideDelay: 200
    };
    var yt$uix$Clickcard = function () {
        this.callbacks_ = {};
    };
    goog$inherits(yt$uix$Clickcard, yt$uix$Card);
    goog$addSingletonGetter(yt$uix$Clickcard);
    yt$uix$Clickcard.prototype.cssName_ = "clickcard";
    yt$uix$Clickcard.prototype.initWidget = function () {
        this.addBehavior("click", this.handleTargetClick_, "target");
        this.addBehavior("click", this.handleCloseClick_, "close");
    };
    yt$uix$Clickcard.prototype.handleTargetClick_ = function (target) {
        var root = yt$uix$BaseWidget$findWidgetElement_(this, target);
        if (goog$dom$classes$has(root, yt$uix$BaseWidget$getCssClass(this, "active"))) {
            this.hide(target);
            goog$dom$classes$remove(root, yt$uix$BaseWidget$getCssClass(this, "active"));
        } else {
            this.show(target);
            goog$dom$classes$add(root, yt$uix$BaseWidget$getCssClass(this, "active"));
        }
    };
    yt$uix$Clickcard.prototype.handleCloseClick_ = function (closeButton) {
        if ((closeButton = yt$dom$getAncestorByClass(closeButton, yt$uix$BaseWidget$getCssClass(this, "card")))) {
            this.hide(closeButton.cardTargetNode);
        }
    };
    var yt$uix$FormInput = function () {
        this.callbacks_ = {};
    };
    goog$inherits(yt$uix$FormInput, yt$uix$BaseWidget);
    goog$addSingletonGetter(yt$uix$FormInput);
    yt$uix$FormInput.prototype.cssName_ = "form-input";
    yt$uix$FormInput.prototype.initWidget = function () {
        if (goog$userAgent$IE && !goog$userAgent$isVersion(9)) {
            this.addBehavior("click", this.handleCheckboxClick_, "checkbox");
            this.addBehavior("keypressed", this.handleCheckboxClick_, "checkbox");
            this.addBehavior("click", this.handleRadioClick_, "radio");
            this.addBehavior("keypressed", this.handleRadioClick_, "radio");
        }
        this.addBehavior("blur", this.handleSelectBlur_, "select-element");
        this.addBehavior("change", this.handleSelectChange_, "select-element");
        this.addBehavior("focus", this.handleSelectFocus_, "select-element");
        this.addBehavior("keyup", this.handleTextKeyUp_, "text");
        this.addBehavior("keyup", this.handleTextKeyUp_, "textarea");
        this.addBehavior("keyup", this.handleTextKeyUp_, "bidi");
    };
    yt$uix$FormInput.prototype.handleCheckboxClick_ = function (checkbox) {
        var container = goog$dom$getAncestorByTagNameAndClass(
            checkbox,
            null,
            yt$uix$BaseWidget$getCssClass(this, "checkbox-container")
        );
        goog$dom$classes$enable(container, "checked", checkbox.checked);
    };
    yt$uix$FormInput.prototype.handleRadioClick_ = function () {
        var radios = goog$dom$getElementsByClass(yt$uix$BaseWidget$getCssClass(this, "radio"));
        var containerClass = yt$uix$BaseWidget$getCssClass(this, "radio-container");
        goog$array$forEach(radios, function (radio) {
            var container = goog$dom$getAncestorByTagNameAndClass(radio, null, containerClass);
            if (container) {
                goog$dom$classes$enable(container, "checked", radio.checked);
            }
        });
    };
    yt$uix$FormInput.prototype.handleTextKeyUp_ = function (input) {
        var value = input.value;
        var dir = "";
        if (goog$i18n$bidi$isRtlText(value)) {
            dir = "rtl";
        } else if (goog$i18n$bidi$ltrDirCheckRe_.test(value)) {
            dir = "ltr";
        }
        input.dir = dir;
    };
    yt$uix$FormInput.prototype.handleSelectFocus_ = function (select) {
        select = goog$dom$getAncestorByTagNameAndClass(select, null, yt$uix$BaseWidget$getCssClass(this, "select"));
        goog$dom$classes$add(select, "focused");
    };
    yt$uix$FormInput.prototype.handleSelectBlur_ = function (select) {
        select = goog$dom$getAncestorByTagNameAndClass(select, null, yt$uix$BaseWidget$getCssClass(this, "select"));
        goog$dom$classes$remove(select, "focused");
    };
    yt$uix$FormInput.prototype.handleSelectChange_ = function (select) {
        var valueEl = goog$dom$getAncestorByTagNameAndClass(
            select,
            null,
            yt$uix$BaseWidget$getCssClass(this, "select")
        );
        var valueEl = goog$dom$getElementByClass(yt$uix$BaseWidget$getCssClass(this, "select-value"), valueEl);
        var select = select.options[select.selectedIndex];
        valueEl.innerHTML = select.text ? select.text : select.value;
    };
    var yt$uix$Hovercard = function () {
        this.callbacks_ = {};
    };
    goog$inherits(yt$uix$Hovercard, yt$uix$Card);
    goog$addSingletonGetter(yt$uix$Hovercard);
    yt$uix$Hovercard.prototype.cssName_ = "hovercard";
    yt$uix$Hovercard.prototype.initWidget = function () {
        this.addBehavior("mouseover", this.handleTargetMouseOver_, "target", 5, true);
        this.addBehavior("mouseout", this.handleTargetMouseOut_, "target", 5, true);
        this.addBehavior("mouseover", this.handleCardMouseOver_, "card", 100);
        this.addBehavior("mouseout", this.handleCardMouseOut_, "card", 100);
    };
    yt$uix$Hovercard.prototype.handleTargetMouseOver_ = function (target) {
        if (yt$uix$Hovercard$activeTarget_ != target) {
            if (yt$uix$Hovercard$activeTarget_) {
                this.hide(yt$uix$Hovercard$activeTarget_);
                yt$uix$Hovercard$activeTarget_ = null;
            }
            var timer = goog$bind(this.show, this, target);
            var delay = parseInt(this.getData(target, "delay-show"), 10);
            var timer = yt$setTimeout(timer, delay > -1 ? delay : this.delays_.showDelay);
            this.setData(target, "card-timer", timer.toString());
            yt$uix$Hovercard$activeTarget_ = target;
            if (target.alt) {
                this.setData(target, "card-alt", target.alt);
                target.alt = "";
            }
            if (target.title) {
                this.setData(target, "card-title", target.title);
                target.title = "";
            }
        }
    };
    yt$uix$Hovercard.prototype.handleTargetMouseOut_ = function (target) {
        var value = parseInt(this.getData(target, "card-timer"), 10);
        yt$clearTimeout(value);
        yt$uix$BaseWidget$findWidgetElement_(this, target).isCardHidable = true;
        value = parseInt(this.getData(target, "delay-hide"), 10);
        value = value > -1 ? value : this.delays_.hideDelay;
        yt$setTimeout(goog$bind(this.hideIfHidable_, this, target), value);
        if ((value = this.getData(target, "card-alt"))) {
            target.alt = value;
        }
        if ((value = this.getData(target, "card-title"))) {
            target.title = value;
        }
    };
    yt$uix$Hovercard.prototype.hideIfHidable_ = function (target) {
        if (yt$uix$BaseWidget$findWidgetElement_(this, target).isCardHidable) {
            this.hide(target);
            yt$uix$Hovercard$activeTarget_ = null;
        }
    };
    yt$uix$Hovercard.prototype.handleCardMouseOver_ = function (card) {
        if (card) {
            card.cardRootNode.isCardHidable = false;
        }
    };
    yt$uix$Hovercard.prototype.handleCardMouseOut_ = function (card, target, event) {
        if (card) {
            target = card.cardTargetNode;
            if (!goog$dom$contains(card, event.relatedTarget)) {
                this.hide(target);
            }
        }
    };
    var yt$uix$Hovercard$activeTarget_ = null;
    var yt$uix$RedirectLink = function () {
        this.callbacks_ = {};
    };
    goog$inherits(yt$uix$RedirectLink, yt$uix$BaseWidget);
    goog$addSingletonGetter(yt$uix$RedirectLink);
    yt$uix$RedirectLink.prototype.cssName_ = "redirect-link";
    yt$uix$RedirectLink.prototype.initWidget = function () {
        this.addBehavior("click", this.handleClick);
    };
    yt$uix$RedirectLink.prototype.handleClick = function (link) {
        if (!yt$dom$datasets$get(link, "redirect-href-updated")) {
            yt$dom$datasets$set(link, "redirect-href-updated", "true");
            var token = yt$getConfig("XSRF_REDIRECT_TOKEN");
            var fieldName = yt$getConfig("XSRF_FIELD_NAME");
            if (token && fieldName) {
                var params = {};
                params.q = link.href;
                params[fieldName] = token;
                link.href = yt$uri$appendQueryData("/redirect", params);
            }
        }
    };
    var yt$uix$Sessionlink = function () {
        this.callbacks_ = {};
    };
    goog$inherits(yt$uix$Sessionlink, yt$uix$BaseWidget);
    goog$addSingletonGetter(yt$uix$Sessionlink);
    yt$uix$Sessionlink.prototype.cssName_ = "sessionlink";
    yt$uix$Sessionlink.prototype.initWidget = function () {
        this.addBehavior("click", this.handleClick);
    };
    yt$uix$Sessionlink.prototype.handleClick = function (link) {
        var target = yt$dom$datasets$get(link, "sessionlink-target") || link.href;
        if (target) {
            var domain = goog$uri$utils$getDomain(target);
            if (domain == window.location.host || (!domain && target.lastIndexOf("/", 0) == 0)) {
                target = goog$uri$utils$getPathAndAfter(target);
                domain = target.indexOf("#");
                if ((target = domain < 0 ? target : target.substr(0, domain))) {
                    link = yt$dom$datasets$get(link, "sessionlink") || "";
                    link = yt$uri$parseQueryData(link);
                    target = "s_tempdata-" + goog$string$hashCode(target);
                    link = link ? yt$uri$buildQueryData(link) : "";
                    yt$net$cookies$set(target, link, 5);
                }
            }
        }
    };
    var yt$uix$Tile = function () {
        this.callbacks_ = {};
    };
    goog$inherits(yt$uix$Tile, yt$uix$BaseWidget);
    goog$addSingletonGetter(yt$uix$Tile);
    yt$uix$Tile.prototype.cssName_ = "tile";
    yt$uix$Tile.prototype.initWidget = function () {
        this.addBehavior("click", this.handleClick);
    };
    yt$uix$Tile.prototype.handleClick = function (tile, eventType, event) {
        if (
            !goog$dom$getAncestorByTagNameAndClass(event.target, "a") &&
            !goog$dom$getAncestorByTagNameAndClass(event.target, "button") &&
            (tile = goog$dom$getElementByClass(yt$uix$BaseWidget$getCssClass(this, "link"), tile))
        ) {
            if (goog$userAgent$IE && !goog$userAgent$isVersion(9)) {
                tile.click();
            } else {
                yt$window$redirect(tile.href);
            }
        }
    };
    var yt$www$ads$MastheadAd = function (creativeIndex, adId, keepCollapseButton) {
        this.adId_ = adId;
        this.keepCollapseButton_ = keepCollapseButton;
        this.creativeId_ = "ad_creative_" + creativeIndex;
        this.expandButtonId_ = "ad_creative_expand_btn_" + creativeIndex;
        this.collapseButtonId_ = "ad_creative_collapse_btn_" + creativeIndex;
    };
    yt$www$ads$MastheadAd.prototype.collapse = function () {
        yt$style$hide(this.creativeId_);
        yt$www$thumbnaildelayload$registerDelayLoad(goog$dom$getElement("page"), true);
        yt$www$thumbnaildelayload$loadAllAbove_();
        if (!this.keepCollapseButton_) {
            yt$style$hide(this.collapseButtonId_);
        }
        yt$style$show(this.expandButtonId_);
        var prefs = yt$prefs$UserPrefs.getInstance();
        prefs.set("HIDDEN_MASTHEAD_ID", this.adId_);
        prefs.save();
        yt$tracking$track("homepage_collapse_masthead_ad", undefined, undefined);
    };
    yt$www$ads$MastheadAd.prototype.expand = function () {
        var prefs = yt$prefs$UserPrefs.getInstance();
        prefs.set("HIDDEN_MASTHEAD_ID", false);
        prefs.save();
        yt$tracking$track("homepage_expand_masthead_ad", undefined, undefined);
        yt$window$redirect(document.location.href);
    };
    var yt$www$comments$getErrorMessage_ = function (code) {
        var msg;
        switch (code) {
            case "PENDING":
                msg = yt$getMsg("COMMENT_PENDING");
                break;
            case "BLOCKED":
                msg = yt$getMsg("COMMENT_BLOCKED");
                break;
            case "EMAIL":
                msg = yt$getMsg("COMMENT_ERROR_EMAIL");
                break;
            case "INLINE_CAPTCHAFAIL":
                msg = yt$getMsg("COMMENT_CAPTCHAFAIL");
        }
        return msg || null;
    };
    var yt$www$comments$PostForm = function (form, focusNow) {
        this.form_ = form;
        this.submitButton_ = yt$dom$getFirstElementByTagNameAndClass("button", null, form);
        this.textarea_ = yt$dom$getFirstElementByTagNameAndClass("textarea", null, form);
        this.captchaEl_ = null;
        this.remainingCountEl_ = goog$dom$getElementByClass("comments-remaining-count", this.form_);
        this.maxLength_ = parseInt(this.remainingCountEl_.innerHTML, 10);
        this.messageEl_ = goog$dom$getElementByClass("comments-post-message", this.form_);
        this.messageContentEl_ = goog$dom$getElementByClass("yt-alert-content", this.messageEl_);
        yt$events$listen(this.textarea_, "focus", goog$bind(this.handleFocus_, this));
        yt$events$listen(this.textarea_, "blur", goog$bind(this.handleBlur_, this));
        yt$events$listen(this.form_, "submit", goog$bind(this.handleSubmit_, this));
        var onInput = goog$bind(this.handleChange_, this);
        yt$events$listen(this.textarea_, "change", onInput);
        yt$events$listen(this.textarea_, "keyup", onInput);
        if (focusNow) {
            this.handleFocus_();
        }
    };
    yt$www$comments$PostForm.prototype.reset = function () {
        yt$www$comments$PostForm$clearCaptcha_(this);
        this.textarea_.blur();
        goog$dom$classes$remove(this.form_, "has-focus");
        this.submitButton_.disabled = false;
        this.setValue("");
    };
    yt$www$comments$PostForm.prototype.focus = function () {
        this.textarea_.focus();
    };
    yt$www$comments$PostForm.prototype.setValue = function (value) {
        this.textarea_.value = value;
        var textarea = this.textarea_;
        var value = value.length;
        var hasSelectionApi;
        try {
            hasSelectionApi = typeof textarea.selectionStart == "number";
        } catch (d) {
            hasSelectionApi = false;
        }
        if (hasSelectionApi) {
            textarea.selectionStart = value;
            textarea.selectionEnd = value;
        } else if (goog$userAgent$IE) {
            if (textarea.type == "textarea") {
                value = textarea.value.substring(0, value).replace(/(\r\n|\r|\n)/g, "\n").length;
            }
            textarea = textarea.createTextRange();
            textarea.collapse(true);
            textarea.move("character", value);
            textarea.select();
        }
        yt$www$comments$PostForm$updateRemainingCount_(this);
    };
    var yt$www$comments$PostForm$clearCaptcha_ = function (form) {
        if (form.captchaEl_) {
            form.captchaEl_.innerHTML = "";
        }
    };
    var yt$www$comments$PostForm$updateRemainingCount_ = function (form) {
        var remaining = form.maxLength_ - form.textarea_.value.length;
        form.remainingCountEl_.innerHTML = remaining + "";
        remaining = remaining < 0;
        goog$dom$classes$enable(form.remainingCountEl_, "too-many", remaining);
        form.submitButton_.disabled = remaining;
    };
    yt$www$comments$PostForm.prototype.handleChange_ = function () {
        yt$www$comments$PostForm$updateRemainingCount_(this);
    };
    yt$www$comments$PostForm.prototype.handleFocus_ = function () {
        if (!goog$dom$classes$has(this.form_, "has-focus")) {
            yt$style$hide(this.messageEl_);
        }
        goog$dom$classes$add(this.form_, "has-focus");
        yt$pubsub$publish("comments-focus", this.form_);
    };
    yt$www$comments$PostForm.prototype.handleBlur_ = function () {
        yt$pubsub$publish("comments-blur", this.form_);
    };
    yt$www$comments$PostForm.prototype.handleSubmit_ = function (event) {
        event.preventDefault();
        if (!this.submitButton_.disabled) {
            this.submitButton_.disabled = true;
            event = yt$uri$parseQueryData(goog$dom$forms$getFormDataString(this.form_));
            event.screen = yt$uri$buildQueryData({
                h: window.screen.height,
                w: window.screen.width,
                d: window.screen.colorDepth
            });
            var params = event.comment;
            var params = {
                return_ajax: "true",
                len: params.length,
                wc: params.split(/\s+/).length
            };
            if (this.form_.reply_parent_id.value) {
                params.reply = 1;
            }
            yt$net$ajax$send(this.form_.action, {
                format: "XML",
                method: "POST",
                urlParams: params,
                postParams: event,
                onFinish: function (xhr, response) {
                    var code = response.str_code;
                    switch (code) {
                        case "OK":
                            code = document.createElement("ul");
                            code.innerHTML = response.html_content;
                            code = goog$dom$getFirstElementChild(code);
                            if (this.form_.reply_parent_id.value) {
                                var postContainer = goog$dom$getAncestorByTagNameAndClass(
                                    this.form_,
                                    null,
                                    "comments-post-container"
                                );
                                var parentComment = goog$dom$getAncestorByTagNameAndClass(
                                    postContainer,
                                    null,
                                    "comment"
                                );
                                goog$dom$removeNode(postContainer);
                                goog$dom$classes$addRemove(parentComment, "replying", "has-child");
                                goog$dom$classes$add(code, "child");
                                goog$dom$classes$enable(
                                    code,
                                    "last",
                                    !(parentComment.nextElementSibling != undefined
                                        ? parentComment.nextElementSibling
                                        : goog$dom$getNextElementNode_(parentComment.nextSibling))
                                );
                                if (parentComment.parentNode) {
                                    parentComment.parentNode.insertBefore(code, parentComment.nextSibling);
                                }
                            } else {
                                postContainer = goog$dom$getAncestorByTagNameAndClass(
                                    this.form_,
                                    null,
                                    "comments-section"
                                );
                                postContainer = goog$dom$getElementByClass("comment-list", postContainer);
                                postContainer.insertBefore(code, postContainer.childNodes[0] || null);
                                this.reset();
                            }
                            yt$www$thumbnaildelayload$loadImmediately(code);
                            break;
                        case "PENDING":
                            yt$www$comments$PostForm$clearCaptcha_(this);
                            this.messageContentEl_.innerHTML = yt$getMsg("COMMENT_PENDING");
                            goog$dom$classes$addRemove(this.messageEl_, "yt-alert-error", "yt-alert-info");
                            yt$style$show(this.messageEl_);
                            break;
                        default:
                            yt$www$comments$PostForm$handleError_(this, code);
                    }
                },
                context: this
            });
        }
    };
    var yt$www$comments$PostForm$handleError_ = function (form, code) {
        form.messageContentEl_.innerHTML = yt$www$comments$getErrorMessage_(code) || yt$getMsg("COMMENT_ERROR");
        goog$dom$classes$addRemove(form.messageEl_, "yt-alert-info", "yt-alert-error");
        yt$style$show(form.messageEl_);
        switch (code) {
            case "INLINE_CAPTCHA":
            case "INLINE_CAPTCHAFAIL":
                yt$net$ajax$send("/comment_servlet?gimme_captcha=1", {
                    format: "XML",
                    method: "POST",
                    postParams: {
                        session_token: yt$net$ajax$tokenMap_.comment_servlet
                    },
                    onSuccess: function (xhr, response) {
                        if (!this.captchaEl_) {
                            this.captchaEl_ = document.createElement("div");
                            this.captchaEl_.className = "comment-captcha";
                            var textarea = this.textarea_;
                            if (textarea.parentNode) {
                                textarea.parentNode.insertBefore(this.captchaEl_, textarea.nextSibling);
                            }
                        }
                        this.captchaEl_.innerHTML = response.html_content;
                        this.submitButton_.disabled = false;
                    },
                    context: form
                });
                break;
            default:
                form.submitButton_.disabled = false;
                yt$www$comments$PostForm$clearCaptcha_(form);
        }
    };
    var yt$www$comments$CommentsSection = function (container) {
        this.container_ = container;
        this.moreButton_ = goog$dom$getElementByClass("watch-more-comments-button");
        this.liveComments_ = !!yt$getConfig("ENABLE_LIVE_COMMENTS");
        this.bindEvents_();
    };
    yt$www$comments$CommentsSection.prototype.bindEvents_ = function () {
        var pagination = goog$dom$getElementByClass("comments-pagination", this.container_);
        if (pagination && yt$dom$datasets$get(pagination, "ajax-enabled")) {
            yt$events$delegateByClass(
                this.container_,
                "click",
                goog$bind(this.handlePagerClick_, this),
                "yt-uix-pager-button"
            );
        }
        yt$events$listen(this.moreButton_, "click", goog$bind(this.handleMoreClick_, this));
        yt$events$delegateByClass(
            this.container_,
            "click",
            goog$bind(this.handlePopOutClick_, this),
            "comments-section-pop-out"
        );
    };
    yt$www$comments$CommentsSection.prototype.handlePagerClick_ = function (event) {
        event.preventDefault();
        event = event.currentTarget;
        if (!goog$dom$classes$has(event, "yt-uix-button-toggled")) {
            var page = parseInt(yt$dom$datasets$get(event, "page"), 10);
            yt$style$show("comments-loading");
            yt$pubsub$publish("comments-page-changing");
            yt$www$comments$CommentsSection$fetchPage_(this, page, function (html) {
                if (html) {
                    this.container_.innerHTML = html;
                    yt$www$thumbnaildelayload$loadImmediately(this.container_);
                    var html = goog$dom$getElementByClass("comment-list", this.container_);
                    var liveSetting = goog$dom$getElementByClass("live-comments-setting", this.container_);
                    if (html) {
                        yt$pubsub$publish("comments-page-changed", html, liveSetting, page);
                    }
                }
                yt$style$hide("comments-loading");
            });
        }
    };
    yt$www$comments$CommentsSection.prototype.handleMoreClick_ = function () {
        yt$style$hide(this.moreButton_);
        yt$style$show("watch-more-comments", "watch-more-comments-loading");
        var page = parseInt(yt$dom$datasets$get(this.moreButton_, "page"), 10);
        yt$www$comments$CommentsSection$fetchPage_(this, page, function (html) {
            var container = goog$dom$getElement("watch-more-comments");
            container.innerHTML += html;
            yt$www$thumbnaildelayload$loadImmediately(container);
            yt$dom$datasets$set(this.moreButton_, "page", page + 1);
            yt$style$show(this.moreButton_);
            yt$style$hide("watch-more-comments-loading");
        });
    };
    yt$www$comments$CommentsSection.prototype.handlePopOutClick_ = function () {
        yt$window$popup(yt$getConfig("COMMENTS_POPUP_URL"), {
            width: 350,
            height: 500,
            resizable: true
        });
    };
    var yt$www$comments$CommentsSection$fetchPage_ = function (section, page, callback) {
        yt$dom$datasets$set(section.container_, "type", "everything");
        yt$net$ajax$send("/watch_ajax?action_get_comments=1", {
            format: "XML",
            urlParams: {
                v: yt$getConfig("VIDEO_ID"),
                p: page,
                commentthreshold: yt$getConfig("COMMENTS_THRESHHOLD"),
                commenttype: "everything",
                enable_live_comments: section.liveComments_ ? "yes" : null,
                page_size: yt$getConfig("COMMENTS_PAGE_SIZE"),
                source: yt$getConfig("COMMENT_SOURCE")
            },
            onSuccess: function (xhr, response) {
                callback.call(this, response.html_content);
            },
            context: section
        });
    };
    var yt$www$comments$handleAction_ = function (event) {
        var actionEl = event.currentTarget;
        var event = goog$dom$getAncestorByTagNameAndClass(actionEl, null, "comment");
        switch (yt$dom$datasets$get(actionEl, "action")) {
            case "approve":
                yt$www$comments$approve_(event);
                break;
            case "block":
                if (confirm(yt$getMsg("BLOCK_USER"))) {
                    yt$www$comments$setUserBlocked_(event, true);
                    goog$dom$classes$add(event, "blocked");
                }
                break;
            case "unblock":
                yt$www$comments$setUserBlocked_(event, false);
                goog$dom$classes$remove(event, "blocked");
                break;
            case "flag":
                yt$www$comments$flag_(event);
                break;
            case "unflag":
                event = yt$dom$datasets$get(event, "id");
                yt$net$ajax$send("/comment_servlet", {
                    format: "XML",
                    method: "POST",
                    postParams: {
                        unmark_comment_as_spam: event,
                        entity_id: yt$getConfig("VIDEO_ID"),
                        session_token: yt$net$ajax$tokenMap_.comment_servlet
                    }
                });
                break;
            case "hide":
                goog$dom$classes$add(event, "hidden");
                break;
            case "show":
                goog$dom$classes$remove(event, "hidden");
                break;
            case "remove":
                yt$www$comments$remove_(event);
                break;
            case "reply":
                if (yt$www$comments$checkCanPost_()) {
                    if (goog$dom$classes$has(event, "replying")) {
                        yt$www$comments$closeReply_(event);
                    } else {
                        goog$dom$classes$add(event, "replying");
                        yt$www$comments$closeShare_(event);
                        var actionEl = goog$dom$getElementByClass(
                            "comments-post",
                            goog$dom$getElement("comments-view")
                        );
                        var actionEl = yt$dom$cloneElementWithoutId(actionEl);
                        var postContainer = document.createElement("div");
                        postContainer.className = "comments-post-container";
                        event.appendChild(postContainer);
                        postContainer.appendChild(actionEl);
                        actionEl = new yt$www$comments$PostForm(actionEl);
                        actionEl.reset();
                        postContainer = yt$dom$datasets$get(event, "id");
                        if (yt$dom$datasets$has(event, "author")) {
                            actionEl.setValue("@" + yt$dom$datasets$get(event, "author") + " ");
                        }
                        actionEl.form_.reply_parent_id.value = postContainer;
                        actionEl.focus();
                    }
                }
                break;
            case "share":
                yt$www$comments$openShare_(event);
                break;
            case "close-share":
                yt$www$comments$closeShare_(event);
                break;
            case "vote-up":
                yt$www$comments$vote_(event, true);
                break;
            case "vote-down":
                yt$www$comments$vote_(event, false);
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
    var yt$www$comments$approve_ = function (comment) {
        var commentId = yt$dom$datasets$get(comment, "id");
        var videoId = yt$getConfig("VIDEO_ID");
        goog$dom$classes$remove(comment, "pending");
        yt$net$ajax$send("/comment_servlet?field_approve_comment=1", {
            format: "XML",
            method: "POST",
            postParams: {
                comment_id: commentId,
                entity_id: videoId,
                session_token: yt$net$ajax$tokenMap_.comment_servlet
            },
            onFailureNeverCalled: function () {
                goog$dom$classes$add(comment, "pending");
            }
        });
    };
    var yt$www$comments$setUserBlocked_ = function (comment, block) {
        var params = {};
        params[(block ? "" : "un") + "block_user"] = 1;
        var author = yt$dom$datasets$get(comment, "author");
        yt$net$ajax$send("/link_servlet", {
            format: "XML",
            method: "POST",
            urlParams: params,
            postParams: {
                session_token: yt$net$ajax$tokenMap_.link_servlet,
                friend_username: author
            }
        });
    };
    var yt$www$comments$flag_ = function (comment) {
        if (yt$www$comments$checkCanPost_()) {
            var commentId = yt$dom$datasets$get(comment, "id");
            var videoId = yt$getConfig("VIDEO_ID");
            yt$style$hide(comment);
            goog$dom$classes$add(comment, "flagged");
            yt$net$ajax$send("/comment_servlet", {
                format: "XML",
                method: "POST",
                urlParams: {
                    mark_comment_as_spam: commentId,
                    entity_id: videoId
                },
                postParams: {
                    session_token: yt$net$ajax$tokenMap_.comment_servlet
                },
                onFailureNeverCalled: function () {
                    yt$style$show(comment);
                    goog$dom$classes$remove(comment, "flagged");
                }
            });
        }
    };
    var yt$www$comments$remove_ = function (comment) {
        var commentId = yt$dom$datasets$get(comment, "id");
        var videoId = yt$getConfig("VIDEO_ID");
        yt$style$hide(comment);
        yt$net$ajax$send("/comment_servlet?remove_comment=1", {
            format: "XML",
            method: "POST",
            postParams: {
                comment_id: commentId,
                entity_id: videoId,
                session_token: yt$net$ajax$tokenMap_.comment_servlet
            },
            onFailureNeverCalled: function () {
                yt$style$show(comment);
            }
        });
    };
    var yt$www$comments$closeReply_ = function (comment) {
        if (goog$dom$classes$has(comment, "replying")) {
            goog$dom$classes$remove(comment, "replying");
            comment = goog$dom$getElementByClass("comments-post-container", comment);
            goog$dom$removeNode(comment);
        }
    };
    var yt$www$comments$openShare_ = function (comment) {
        if (!goog$dom$classes$has(comment, "sharing")) {
            goog$dom$classes$add(comment, "sharing");
            yt$www$comments$closeReply_(comment);
            var shareArea = yt$dom$cloneElementWithoutId(goog$dom$getElement("comment-share-area"));
            var container = document.createElement("div");
            container.className = "comments-post-container";
            comment.appendChild(container);
            container.appendChild(shareArea);
            var commentId = yt$dom$datasets$get(comment, "id");
            var container = yt$getConfig("COMMENT_SHARE_URL");
            var container = container.replace("_COMMENT_ID_", commentId);
            goog$dom$getElementByClass("comment-share-url", shareArea).value = container;
            var comment = goog$dom$getElementByClass("comment-text", comment);
            var commentText = goog$string$escapeString(goog$dom$getTextContent(goog$dom$getFirstElementChild(comment)));
            var comment = goog$dom$getElementsByClass("icon-comment-share", shareArea);
            goog$array$forEach(comment, function (icon) {
                var action = icon.getAttribute("action");
                var action = action.replace("_COMMENT_ID_", commentId);
                var text;
                text =
                    action.indexOf("twitter") != -1
                        ? goog$string$truncate(commentText, 80)
                        : goog$string$truncate(commentText, 150);
                action = action.replace("_COMMENT_TEXT_", text);
                yt$events$listen(
                    icon,
                    "click",
                    goog$bind(
                        function (code) {
                            eval(code);
                        },
                        goog$global,
                        action
                    )
                );
            });
            yt$style$show(shareArea);
        }
    };
    var yt$www$comments$closeShare_ = function (comment) {
        if (goog$dom$classes$has(comment, "sharing")) {
            goog$dom$classes$remove(comment, "sharing");
            comment = goog$dom$getElementByClass("comments-post-container", comment);
            goog$dom$removeNode(comment);
        }
    };
    var yt$www$comments$vote_ = function (comment, up) {
        if (yt$www$comments$checkCanPost_() && !yt$dom$datasets$get(comment, "voted")) {
            var commentId = yt$dom$datasets$get(comment, "id");
            var videoId = yt$getConfig("VIDEO_ID");
            var oldScore = yt$dom$datasets$get(comment, "score");
            var vote = up ? 1 : -1;
            yt$dom$datasets$set(comment, "voted", vote + "");
            if (up) {
                goog$dom$classes$addRemove(comment, "voted-down", "voted-up");
            } else {
                goog$dom$classes$addRemove(comment, "voted-up", "voted-down");
            }
            commentId = {
                a: vote,
                id: commentId,
                video_id: videoId,
                old_vote: oldScore
            };
            if ((videoId = yt$dom$datasets$get(comment, "tag"))) {
                commentId.tag = videoId;
            }
            yt$net$ajax$send("/comment_voting", {
                format: "XML",
                method: "POST",
                urlParams: commentId,
                postParams: {
                    session_token: yt$net$ajax$tokenMap_.comment_voting
                }
            });
        }
    };
    var yt$www$home$ads$adLoaded_ = false;
    var yt$www$home$ads$ieFocusApplied_ = false;
    var yt$www$addto$addToWatchLater = function (videoIds, feature, onSuccess) {
        yt$www$addto$addTo({
            videoIdList: videoIds,
            listType: "WL",
            trackingFeature: feature,
            onSuccess: onSuccess,
            onFail: undefined,
            context: undefined
        });
    };
    var yt$www$addto$addTo = function (options) {
        var postParams = {
            video_ids: options.videoIdList,
            playlist_id: options.playlistId || "",
            new_playlist_name: options.newPlaylistName || "",
            session_token: yt$net$ajax$tokenMap_.addto_ajax
        };
        var urlParams = {};
        if (options.privacy) {
            urlParams.private = options.privacy;
        }
        if (options.trackingFeature) {
            urlParams.feature = options.trackingFeature;
        }
        var action = "";
        switch (options.listType) {
            case "PL":
                action = options.newPlaylistName ? "action_add_to_new_playlist" : "action_add_to_playlist";
                break;
            case "FL":
                action = "action_add_to_favorites";
                break;
            case "WL":
                action = "action_add_to_watch_later_list";
        }
        urlParams[action] = 1;
        yt$net$ajax$send("/addto_ajax", {
            absoluteUrl: true,
            format: "XML",
            method: "POST",
            urlParams: urlParams,
            postParams: postParams,
            context: options.context,
            onFail: options.onFail,
            onSuccess: options.onSuccess
        });
    };
    var yt$tracking$conversion$getPingUrl_ = function (type, config) {
        if (type == "view" && config.convViewUrl) {
            return config.convViewUrl;
        }
        if (!config.baseUrl || !config.uid) {
            return null;
        }
        var remarketing = config.rmktEnabled && config.vid;
        var followOn = config.focEnabled;
        if (!remarketing && !followOn) {
            return null;
        }
        var params = {
            label: followOn ? "followon_" + type : "default"
        };
        if (remarketing) {
            remarketing = {
                utvid: config.vid,
                utuid: config.uid,
                type: type
            };
            if (config.eventLabel) {
                remarketing.el = config.eventLabel;
            }
            if (config.Ik) {
                remarketing.ps = config.playerStyle;
            }
            var pairs = [];
            var key;
            for (key in remarketing) {
                pairs.push(encodeURIComponent(key) + "=" + encodeURIComponent(remarketing[key]));
            }
            params.data = pairs.join(";");
        }
        if (followOn) {
            params.foc_id = config.uid;
        }
        return yt$uri$appendQueryData(config.baseUrl, params);
    };
    var yt$tracking$conversion$ping = function (type) {
        var config = yt$getConfig("CONVERSION_CONFIG_DICT");
        if (config && (type = yt$tracking$conversion$getPingUrl_(type, config))) {
            yt$net$ping$send(type);
        }
    };
    var yt$www$watch$AddToPanel = function (panel, videoId) {
        this.panelEl_ = panel;
        this.videoId_ = videoId;
        yt$net$ajax$send("/playlist_ajax", {
            urlParams: {
                action_get_addto_panel: 1,
                video_id: this.videoId_
            },
            onSuccess: this.handlePanelLoaded_,
            context: this
        });
    };
    yt$www$watch$AddToPanel.prototype.handlePanelLoaded_ = function (xhr, response) {
        this.panelEl_.innerHTML = response.html;
        this.addedMessage_ = goog$dom$getElementByClass("added-to-message", this.panelEl_);
        this.addedMessageTitle_ = goog$dom$getElementByClass("added-to-message-title", this.panelEl_);
        this.noteAddedMessage_ = goog$dom$getElementByClass("note-added-message", this.panelEl_);
        this.noteAddedTitle_ = goog$dom$getElementByClass("note-added-message-title", this.panelEl_);
        this.attachHandlers_();
    };
    yt$www$watch$AddToPanel.prototype.attachHandlers_ = function () {
        var form = goog$dom$getElementByClass("create-playlist", this.panelEl_);
        yt$events$listen(form, "submit", goog$bind(this.handleCreateSubmit_, this));
        yt$events$delegateByClass(
            this.panelEl_,
            "click",
            goog$bind(this.handleFavoriteClick_, this),
            "playlist-item-favorite"
        );
        yt$events$delegateByClass(this.panelEl_, "click", goog$bind(this.handlePlaylistClick_, this), "playlist-item");
        yt$events$delegateByClass(
            this.panelEl_,
            "submit",
            goog$bind(this.handleNoteSubmit_, this),
            "playlist-note-form"
        );
        yt$events$delegateByClass(this.panelEl_, "click", goog$bind(this.handleNoteCancel_, this), "cancel-note");
    };
    yt$www$watch$AddToPanel.prototype.handleCreateSubmit_ = function (event) {
        event.preventDefault();
        yt$www$watch$AddToPanel$createPlaylist_(this, goog$dom$getElementByClass("create-playlist", this.panelEl_));
    };
    var yt$www$watch$AddToPanel$createPlaylist_ = function (panel, form) {
        goog$dom$classes$add(form, "loading");
        yt$net$ajax$sendForm(form, {
            context: panel,
            onSuccess: function (xhr, response) {
                goog$dom$classes$remove(form, "loading");
                this.panelEl_.innerHTML = response.html;
            }
        });
    };
    yt$www$watch$AddToPanel.prototype.handleFavoriteClick_ = function (event) {
        event.stopPropagation();
        yt$www$watch$AddToPanel$addToFavorites_(this, event.currentTarget);
    };
    var yt$www$watch$AddToPanel$addToFavorites_ = function (panel, item) {
        goog$dom$classes$add(item, "loading");
        yt$net$ajax$send("/addto_ajax", {
            method: "POST",
            format: "XML",
            urlParams: {
                action_add_to_favorites: 1
            },
            postParams: {
                video_ids: panel.videoId_,
                session_token: yt$net$ajax$tokenMap_.addto_ajax
            },
            context: panel,
            onSuccess: function () {
                goog$dom$classes$remove(item, "loading");
                yt$www$watch$AddToPanel$showAddedMessage_(this, item);
            }
        });
    };
    yt$www$watch$AddToPanel.prototype.handlePlaylistClick_ = function (event) {
        var item = event.currentTarget;
        if (!goog$dom$classes$has(item, "selected")) {
            event.stopPropagation();
            yt$www$watch$AddToPanel$clearSelection_(this);
            yt$www$watch$AddToPanel$addToPlaylist_(this, item);
        }
    };
    var yt$www$watch$AddToPanel$addToPlaylist_ = function (panel, item) {
        var playlistId = yt$dom$datasets$get(item, "playlist-id");
        goog$dom$classes$add(item, "loading");
        yt$net$ajax$send("/addto_ajax", {
            method: "POST",
            format: "XML",
            urlParams: {
                action_add_to_playlist: 1
            },
            postParams: {
                playlist_id: playlistId,
                video_ids: panel.videoId_,
                session_token: yt$net$ajax$tokenMap_.addto_ajax
            },
            context: panel,
            onSuccess: function (xhr, response) {
                this.addedItemId_ = response.setvideo_id;
                goog$dom$classes$remove(item, "loading");
                goog$dom$classes$add(item, "selected");
                yt$www$watch$AddToPanel$showAddedMessage_(this, item);
            }
        });
    };
    yt$www$watch$AddToPanel.prototype.handleNoteSubmit_ = function (event) {
        event.preventDefault();
        yt$www$watch$AddToPanel$saveNote_(this, event.currentTarget);
    };
    yt$www$watch$AddToPanel.prototype.handleNoteCancel_ = function () {
        yt$www$watch$AddToPanel$clearSelection_(this);
    };
    var yt$www$watch$AddToPanel$saveNote_ = function (panel, form) {
        goog$dom$classes$add(form, "loading");
        yt$net$ajax$sendForm(form, {
            postParams: {
                session_token: yt$net$ajax$tokenMap_.playlist_bar_ajax,
                setvideo_id: panel.addedItemId_
            },
            context: panel,
            onSuccess: function () {
                yt$www$watch$AddToPanel$clearSelection_(this);
                goog$dom$classes$remove(form, "loading");
                this.noteAddedTitle_.innerHTML = goog$dom$getElementByClass("playlist-name", form).value;
                var message = this.noteAddedMessage_;
                if (this.visibleMessage_) {
                    yt$style$hide(this.visibleMessage_);
                }
                this.visibleMessage_ = message;
                yt$style$show(message);
            }
        });
    };
    var yt$www$watch$AddToPanel$clearSelection_ = function (panel) {
        var selected = goog$dom$getElementByClass("selected", panel.panelEl_);
        if (selected) {
            goog$dom$classes$remove(selected, "selected");
            panel.addedItemId_ = null;
        }
    };
    var yt$www$watch$AddToPanel$showAddedMessage_ = function (panel, item) {
        panel.addedMessageTitle_.innerHTML = goog$dom$getElementByClass("playlist-title", item).innerHTML;
        var message = panel.addedMessage_;
        if (panel.visibleMessage_) {
            yt$style$hide(panel.visibleMessage_);
        }
        panel.visibleMessage_ = message;
        yt$style$show(message);
    };
    var yt$www$watch$actions$rate = function (like, options) {
        var videoId = yt$getConfig("VIDEO_ID");
        var params = {};
        if (like) {
            params.action_like_video = 1;
        } else {
            params.action_dislike_video = 1;
        }
        options = options || {};
        params.video_id = videoId;
        params.plid = options.playbackId;
        videoId = {
            screen: yt$uri$buildQueryData({
                h: screen.height,
                w: screen.width,
                d: screen.colorDepth
            }),
            session_token: yt$net$ajax$tokenMap_.watch_actions_ajax
        };
        if (options.stationId) {
            videoId.station_id = options.stationId;
        }
        yt$net$ajax$send("/watch_actions_ajax", {
            format: "XML",
            method: "POST",
            urlParams: params,
            postParams: videoId,
            onSuccess: options.onSuccess,
            onFail: options.onFail
        });
        yt$tracking$conversion$ping(like ? "like" : "dislike");
    };
    var yt$captions$TimeRange = function (start, end) {
        this.start = start;
        this.end = end;
        yt$captions$TimeRange$counter_++;
    };
    var yt$captions$TimeRange$counter_ = 0;
    yt$captions$TimeRange.prototype.contains = function (start, end) {
        return start >= this.start && start < this.end && (end == null || (start < end && end <= this.end));
    };
    new yt$captions$TimeRange(0, 0);
    var yt$captions$TEXT_ALIGNMENTS_ = ["left", "right", "center"];
    var yt$captions$DEFAULT_WINDOW_PARAMS_ = {
        id: 0,
        eventType: 0,
        anchorPoint: 7,
        anchorHorizontal: 50,
        Jk: 80,
        anchorVertical: 95,
        rowCount: 15,
        columnCount: 100,
        isVisible: true,
        textAlign: yt$captions$TEXT_ALIGNMENTS_[2],
        printDirection: 0,
        backgroundColor: "#080808",
        foregroundColor: "#fff",
        opacity: 0.8
    };
    var yt$captions$Event = function (params) {
        this.startMs_ = params.startMs;
        this.durationMs = params.durationMs || this.durationMs;
    };
    yt$captions$Event.prototype.startMs_ = 0;
    yt$captions$Event.prototype.durationMs = 0;
    yt$captions$Event.prototype.toString = function () {
        return this.startMs_ + ", " + this.durationMs;
    };
    var yt$captions$CaptionEvent = function (params) {
        yt$captions$Event.call(this, params);
        this.text_ = params.text || this.text_;
        this.windowId_ = params.windowId || this.windowId_;
        this.append_ = params.params.append || this.append_;
        this.row_ = params.params.row || this.row_;
        this.column_ = params.params.column || this.column_;
    };
    goog$inherits(yt$captions$CaptionEvent, yt$captions$Event);
    yt$captions$CaptionEvent.prototype.text_ = "";
    yt$captions$CaptionEvent.prototype.append_ = false;
    yt$captions$CaptionEvent.prototype.row_ = 0;
    yt$captions$CaptionEvent.prototype.column_ = 0;
    yt$captions$CaptionEvent.prototype.windowId_ = 0;
    yt$captions$CaptionEvent.prototype.getTooltipText = function () {
        return this.text_;
    };
    yt$captions$CaptionEvent.prototype.toString = function () {
        return this.startMs_ + ", " + this.durationMs + ": " + this.text_;
    };
    var yt$captions$parseCaptionElement_ = function (node) {
        var text = (node.firstChild && node.firstChild.nodeValue) || "";
        var start = parseFloat(node.getAttribute("start") || 0) * 1000;
        if (node.getAttribute("t")) {
            start = parseInt(node.getAttribute("t"), 10);
        }
        var duration = parseFloat(node.getAttribute("dur") || 0) * 1000;
        if (node.getAttribute("d")) {
            duration = parseFloat(node.getAttribute("d"));
        }
        var windowId = parseInt(node.getAttribute("w"), 10) || 0;
        var text = {
            startMs: start,
            durationMs: duration,
            text: text,
            windowId: windowId,
            eventType: 5,
            params: {}
        };
        if (node.getAttribute("r")) {
            text.params.row = parseInt(node.getAttribute("r"), 10);
        }
        if (node.getAttribute("c")) {
            text.params.column = parseInt(node.getAttribute("c"), 10);
        }
        if (node.getAttribute("append")) {
            text.eventType = 6;
            text.params.append = true;
        }
        return new yt$captions$CaptionEvent(text);
    };
    var yt$captions$WindowEvent = function (params) {
        yt$captions$Event.call(this, params);
        this.id = params.windowId || this.id;
        this.params = params.params;
    };
    goog$inherits(yt$captions$WindowEvent, yt$captions$Event);
    yt$captions$WindowEvent.prototype.id = 0;
    yt$captions$WindowEvent.prototype.params = null;
    yt$captions$WindowEvent.prototype.accumulatedText_ = "";
    var yt$captions$createDefaultWindow_ = function () {
        return new yt$captions$WindowEvent({
            startMs: -2147483648,
            durationMs: 4294967295,
            params: yt$captions$DEFAULT_WINDOW_PARAMS_
        });
    };
    var yt$captions$CaptionTrack = function (xmlText) {
        this.captions_ = [];
        this.windows_ = [];
        this.windowsById_ = {};
        if (xmlText) {
            var doc;
            if (typeof DOMParser != "undefined") {
                doc = new DOMParser().parseFromString(xmlText, "application/xml");
            } else if (typeof ActiveXObject != "undefined") {
                if ((doc = new ActiveXObject("MSXML2.DOMDocument"))) {
                    doc.resolveExternals = false;
                    doc.validateOnParse = false;
                    try {
                        doc.setProperty("ProhibitDTD", true);
                        doc.setProperty("MaxXMLSize", 2048);
                        doc.setProperty("MaxElementDepth", 256);
                    } catch (c) {}
                }
                doc.loadXML(xmlText);
            } else {
                throw Error("Your browser does not support loading xml documents");
            }
            if (doc && doc.firstChild) {
                this.xml_ = doc;
                switch (this.xml_.firstChild.tagName) {
                    case "timedtext":
                        xmlText = this.xml_.firstChild.childNodes;
                        doc = 0;
                        for (var i = xmlText.length; doc < i; doc++) {
                            switch (xmlText[doc].tagName) {
                                case "window":
                                    var windowNode = xmlText[doc];
                                    var windowIdNum = parseInt(windowNode.getAttribute("id"), 10);
                                    var windowEvent = undefined;
                                    a: {
                                        var prevWindow = this.windowsById_[windowIdNum];
                                        if (!windowNode.getAttribute("t") && !windowNode.getAttribute("start")) {
                                            windowEvent = null;
                                        } else {
                                            windowEvent = parseInt(windowNode.getAttribute("t"), 10);
                                            if (windowNode.getAttribute("start")) {
                                                windowEvent = parseFloat(windowNode.getAttribute("start")) * 1000;
                                            }
                                            if (prevWindow) {
                                                if (prevWindow.startMs_ + prevWindow.durationMs >= windowEvent) {
                                                    prevWindow.durationMs = windowEvent;
                                                } else {
                                                    prevWindow = null;
                                                }
                                            }
                                            switch (windowNode.getAttribute("op")) {
                                                case "kill":
                                                    windowEvent = null;
                                                    break a;
                                                case "define":
                                                    prevWindow = null;
                                            }
                                            if (prevWindow) {
                                                prevWindow.redefined = true;
                                            } else {
                                                prevWindow = yt$captions$createDefaultWindow_();
                                            }
                                            var params = {};
                                            var prevWindow = prevWindow
                                                ? prevWindow.params
                                                : yt$captions$DEFAULT_WINDOW_PARAMS_;
                                            var key = undefined;
                                            for (key in prevWindow) {
                                                params[key] = prevWindow[key];
                                            }
                                            if (windowNode.getAttribute("id")) {
                                                params.id = windowNode.getAttribute("id");
                                            }
                                            if (windowNode.getAttribute("op")) {
                                                params.operation = windowNode.getAttribute("op");
                                            }
                                            if (windowNode.getAttribute("rc")) {
                                                params.rowCount = parseInt(windowNode.getAttribute("rc"), 10);
                                            }
                                            if (windowNode.getAttribute("cc")) {
                                                params.columnCount = parseInt(windowNode.getAttribute("cc"), 10);
                                            }
                                            if (windowNode.getAttribute("ap")) {
                                                prevWindow = parseInt(windowNode.getAttribute("ap"), 10);
                                                params.anchorPoint = prevWindow < 0 || prevWindow > 8 ? 7 : prevWindow;
                                            }
                                            if (windowNode.getAttribute("ah")) {
                                                params.anchorHorizontal = parseInt(windowNode.getAttribute("ah"), 10);
                                            }
                                            if (windowNode.getAttribute("av")) {
                                                params.anchorVertical = parseInt(windowNode.getAttribute("av"), 10);
                                            }
                                            if (windowNode.getAttribute("id")) {
                                                params.id = parseInt(windowNode.getAttribute("id"), 10) || 0;
                                            }
                                            if (windowNode.getAttribute("vs")) {
                                                params.isVisible = Boolean(windowNode.getAttribute("vs"));
                                            }
                                            if (windowNode.getAttribute("ju")) {
                                                params.textAlign =
                                                    yt$captions$TEXT_ALIGNMENTS_[
                                                        parseInt(windowNode.getAttribute("ju"), 10)
                                                    ];
                                            }
                                            if (windowNode.getAttribute("pd")) {
                                                params.printDirection = 1;
                                                if (parseInt(windowNode.getAttribute("pd"), 10) == 0) {
                                                    params.printDirection = 0;
                                                }
                                            }
                                            if (windowNode.getAttribute("bc")) {
                                                params.backgroundColor = parseInt(windowNode.getAttribute("bc"), 16);
                                            }
                                            if (windowNode.getAttribute("bo")) {
                                                params.opacity = parseInt(windowNode.getAttribute("bo"), 10) / 100;
                                            }
                                            if (windowNode.getAttribute("fc")) {
                                                params.foregroundColor = parseInt(windowNode.getAttribute("fc"), 16);
                                            }
                                            if (windowNode.getAttribute("sd")) {
                                                params.scrollDirection = parseInt(windowNode.getAttribute("sd"), 10);
                                            }
                                            prevWindow =
                                                parseInt(windowNode.getAttribute("d"), 10) ||
                                                parseFloat(windowNode.getAttribute("dur")) * 1000 ||
                                                2147483647;
                                            windowNode = {
                                                startMs: windowEvent,
                                                durationMs: prevWindow,
                                                params: params,
                                                windowId: parseInt(windowNode.getAttribute("id"), 10)
                                            };
                                            windowEvent = new yt$captions$WindowEvent(windowNode);
                                        }
                                    }
                                    this.windowsById_[windowIdNum] = windowEvent;
                                    this.windows_.push(windowEvent);
                                    break;
                                case "text":
                                    windowIdNum = yt$captions$parseCaptionElement_(xmlText[doc]);
                                    this.captions_.push(windowIdNum);
                                    windowNode = windowIdNum.windowId_;
                                    if (this.windowsById_[windowNode]) {
                                        windowNode = this.windowsById_[windowNode];
                                        windowIdNum = windowIdNum.getTooltipText();
                                        windowNode.accumulatedText_ += windowIdNum;
                                    }
                            }
                        }
                        break;
                    default:
                        this.windows_.push(yt$captions$createDefaultWindow_());
                        xmlText = this.xml_.firstChild.childNodes;
                        doc = 0;
                        for (i = xmlText.length; doc < i; doc++) {
                            this.captions_.push(yt$captions$parseCaptionElement_(xmlText[doc]));
                        }
                }
            }
        }
    };
    yt$captions$CaptionTrack.prototype.captions_ = null;
    yt$captions$CaptionTrack.prototype.windows_ = null;
    yt$captions$CaptionTrack.prototype.windowsById_ = null;
    var yt$captions$Track = function (data) {
        data = data || {};
        this.format_ = data.format;
        this.languageCode_ = data.languageCode || "";
        this.languageName_ = data.languageName;
        this.kind_ = data.kind;
        this.name_ = data.name;
        this.isDefault_ = data.is_default;
    };
    yt$captions$Track.prototype.languageName_ = null;
    yt$captions$Track.prototype.kind_ = null;
    yt$captions$Track.prototype.name_ = null;
    yt$captions$Track.prototype.isDefault_ = false;
    yt$captions$Track.prototype.format_ = 1;
    yt$captions$Track.prototype.getName = function () {
        return this.name_;
    };
    yt$captions$Track.prototype.getFormat = function () {
        return this.format_;
    };
    var yt$captions$Track$getDisplayName_ = function (track) {
        var parts = [track.languageName_];
        if (track.kind_) {
            var kind = track.kind_ == "asr" ? yt$getMsg("HTML5_SUBS_TRANSCRIBED") : track.kind_;
            parts.push(" (", kind, ")");
        }
        if (track.name_) {
            parts.push(" - ", track.name_);
        }
        if (track.translationLanguage_) {
            parts.push(" >> ", track.translationLanguage_.translationName_);
        }
        return parts.join("");
    };
    yt$captions$Track.prototype.toString = function () {
        var parts = [this.languageCode_, ": ", this.name_, " (", this.kind_, ")"];
        if (this.translationLanguage_) {
            parts.push(" >> ", this.translationLanguage_.translationName_);
        }
        return parts.join("");
    };
    var yt$captions$TranslationLanguage = function (data) {
        this.translationCode_ = data.languageCode;
        this.translationName_ = data.languageName;
        this.id = data.id;
        this.isDefault_ = data.is_default;
    };
    yt$captions$TranslationLanguage.prototype.translationCode_ = null;
    yt$captions$TranslationLanguage.prototype.translationName_ = null;
    yt$captions$TranslationLanguage.prototype.id = null;
    yt$captions$TranslationLanguage.prototype.isDefault_ = false;
    var yt$captions$TrackList = function (xml) {
        this.asrTracks_ = [];
        this.translationLanguages_ = [];
        this.tracks_ = [];
        if (xml && xml.firstChild) {
            this.xml_ = xml;
            var xml = this.xml_.getElementsByTagName("track");
            for (var n = xml.length, i = 0; i < n; i++) {
                var formats = parseInt(xml[i].getAttribute("formats"), 10) || 1;
                var languageCode = xml[i].getAttribute("lang_code");
                var languageName = xml[i].getAttribute("lang_translated");
                var name = xml[i].getAttribute("name");
                var kind = xml[i].getAttribute("kind") || "";
                var id = xml[i].getAttribute("id");
                var isDefault = xml[i].getAttribute("lang_default") == "true";
                var translatable = xml[i].getAttribute("cantran") == "true";
                this.addTrack(
                    new yt$captions$Track({
                        format: formats,
                        languageCode: languageCode,
                        languageName: languageName,
                        name: name,
                        kind: kind,
                        id: id,
                        is_servable: true,
                        is_default: isDefault,
                        is_translateable: translatable
                    })
                );
            }
            xml = this.xml_.getElementsByTagName("target");
            n = xml.length;
            for (i = 0; i < n; i++) {
                formats = xml[i].getAttribute("lang_code");
                languageCode = xml[i].getAttribute("lang_translated");
                languageName = xml[i].getAttribute("lang_original");
                name = xml[i].getAttribute("id");
                kind = xml[i].getAttribute("lang_default") == "true";
                this.translationLanguages_.push(
                    new yt$captions$TranslationLanguage({
                        languageCode: formats,
                        languageName: languageCode,
                        languageOriginal: languageName,
                        id: name,
                        is_default: kind
                    })
                );
            }
        }
    };
    yt$captions$TrackList.prototype.xml_ = null;
    yt$captions$TrackList.prototype.asrTracks_ = null;
    yt$captions$TrackList.prototype.translationLanguages_ = null;
    yt$captions$TrackList.prototype.tracks_ = null;
    yt$captions$TrackList.prototype.defaultTrackIndex_ = -1;
    yt$captions$TrackList.prototype.getTracks = function () {
        return this.tracks_;
    };
    yt$captions$TrackList.prototype.getDefaultTrackIndex = function () {
        return this.defaultTrackIndex_;
    };
    yt$captions$TrackList.prototype.addTrack = function (track) {
        switch (track.kind_) {
            case "asr":
                this.asrTracks_.push(track);
                break;
            default:
                if (track.isDefault_ || this.defaultTrackIndex_ < 0) {
                    this.defaultTrackIndex_ = this.tracks_.length;
                }
                this.tracks_.push(track);
        }
    };
    var yt$captions$CaptionsLoader = function (baseUrl, videoId, hl, includeAsr) {
        this.baseUrl_ = baseUrl;
        if (hl) {
            this.baseUrl_ = yt$uri$setQueryData(this.baseUrl_, {
                hl: hl
            });
        } else {
            baseUrl = yt$uri$getQueryData(this.baseUrl_).hl || "";
            baseUrl = baseUrl.split("_").join("-");
            this.baseUrl_ = yt$uri$setQueryData(this.baseUrl_, {
                hl: baseUrl
            });
        }
        this.videoId_ = videoId;
        this.includeAsr_ = !!includeAsr;
    };
    yt$captions$CaptionsLoader.prototype.baseUrl_ = "";
    yt$captions$CaptionsLoader.prototype.videoId_ = null;
    yt$captions$CaptionsLoader.prototype.includeAsr_ = false;
    yt$captions$CaptionsLoader.prototype.defaultTrackIndex_ = 0;
    yt$captions$CaptionsLoader.prototype.trackList_ = null;
    yt$captions$CaptionsLoader.prototype.getTracks = function () {
        return this.trackList_.getTracks();
    };
    yt$captions$CaptionsLoader.prototype.getDefaultTrackIndex = function () {
        return this.trackList_.getDefaultTrackIndex();
    };
    yt$captions$CaptionsLoader.prototype.addTrack = function (track) {
        this.trackList_.addTrack(track);
    };
    var yt$captions$CaptionsLoader$loadDefaultTrack_ = function (loader) {
        var callback = yt$www$watch$transcript$onTrackLoaded_;
        var index = loader.trackList_.getDefaultTrackIndex();
        if (!(index < 0)) {
            yt$captions$CaptionsLoader$loadTrack_(loader, loader.trackList_.getTracks()[index], callback);
        }
    };
    var yt$captions$CaptionsLoader$loadTrack_ = function (loader, track, callback) {
        var url = loader.baseUrl_;
        var params = {
            v: loader.videoId_,
            type: "track",
            lang: track.languageCode_,
            name: track.getName(),
            kind: track.kind_,
            fmt: track.getFormat()
        };
        if (track.translationLanguage_) {
            params.tlang = track.translationLanguage_.translationCode_;
        }
        url = yt$uri$setQueryData(url, params);
        yt$player$logger.info("Loading caption track from: " + url);
        loader = goog$bind(function (xhr) {
            xhr = new yt$captions$CaptionTrack(xhr.responseText);
            callback(xhr, track);
        }, loader);
        yt$net$ajax$send_(url, loader);
    };
    var yt$captions$CaptionsLoader$loadTrackList_ = function (loader, callback) {
        var url = loader.baseUrl_;
        var params = {
            type: "list",
            tlangs: 1,
            v: loader.videoId_,
            fmts: Number(false)
        };
        if (loader.includeAsr_) {
            params.asrs = 1;
        }
        url = yt$uri$setQueryData(url, params);
        yt$player$logger.info("Getting track list from: " + url);
        params = goog$bind(function (xhr) {
            this.trackList_ = new yt$captions$TrackList(xhr.responseXML);
            callback();
        }, loader);
        yt$net$ajax$send_(url, params);
    };
    var yt$www$watch$transcript$loader_ = null;
    var yt$www$watch$transcript$track_ = null;
    var yt$www$watch$transcript$currentLine_ = -1;
    var yt$www$watch$transcript$mouseOver_ = false;
    var yt$www$watch$transcript$syncInterval_ = 0;
    var yt$www$watch$transcript$scrollInterval_ = 0;
    var yt$www$watch$transcript$load = function (callback) {
        if (yt$www$watch$transcript$loader_) {
            callback();
        } else if (yt$dom$datasets$get(goog$dom$getElement("watch-captions-container"), "disabled") != "true") {
            var loader = new yt$captions$CaptionsLoader(yt$getConfig("TTS_URL"), yt$getConfig("VIDEO_ID"));
            yt$captions$CaptionsLoader$loadTrackList_(loader, function () {
                yt$www$watch$transcript$render_();
                callback();
            });
            yt$www$watch$transcript$loader_ = loader;
        }
    };
    var yt$www$watch$transcript$render_ = function () {
        var loader = yt$www$watch$transcript$loader_;
        var tracks = yt$www$watch$transcript$loader_.getTracks();
        var count = tracks.length;
        if (count <= 0) {
            yt$style$show("watch-captions-not-found");
        } else {
            var container = goog$dom$getElement("watch-captions-container");
            if (count > 1) {
                var selector = document.createElement("select");
                selector.id = "watch-captions-track-selector";
                for (var i = 0; i < count; ++i) {
                    var track = tracks[i];
                    var option = document.createElement("option");
                    var track = goog$dom$createTextNode(yt$captions$Track$getDisplayName_(track));
                    option.appendChild(track);
                    option.value = i;
                    selector.appendChild(option);
                }
                yt$events$listen(selector, "change", function () {
                    yt$captions$CaptionsLoader$loadTrack_(
                        yt$www$watch$transcript$loader_,
                        yt$www$watch$transcript$loader_.getTracks()[this.value],
                        yt$www$watch$transcript$onTrackLoaded_
                    );
                });
                container.appendChild(selector);
            }
            tracks = document.createElement("div");
            tracks.id = "captions-scrollbox";
            yt$events$listen(tracks, "mouseover", function () {
                yt$www$watch$transcript$mouseOver_ = true;
            });
            yt$events$listen(tracks, "mouseout", function () {
                yt$www$watch$transcript$mouseOver_ = false;
            });
            container.appendChild(tracks);
            yt$captions$CaptionsLoader$loadDefaultTrack_(loader);
        }
    };
    var yt$www$watch$transcript$onTrackLoaded_ = function (track, trackInfo) {
        var captions = track.captions_;
        yt$www$watch$transcript$currentLine_ = -1;
        yt$www$watch$transcript$track_ = track;
        yt$clearInterval(yt$www$watch$transcript$syncInterval_);
        var scrollbox = goog$dom$getElement("captions-scrollbox");
        scrollbox.innerHTML = "";
        var selector = goog$dom$getElement("watch-captions-track-selector");
        if (selector) {
            var tracks = yt$www$watch$transcript$loader_.getTracks();
            for (var i = 0, n = tracks.length; i < n; ++i) {
                if (tracks[i] == trackInfo) {
                    selector.options[i].selected = true;
                    break;
                }
            }
        }
        i = 0;
        for (n = captions.length; i < n; ++i) {
            var selector = captions[i];
            var tracks = document.createElement("div");
            var seconds = selector.startMs_ / 1000;
            tracks.id = "cp-" + i;
            tracks.className = "cpline";
            yt$dom$datasets$set(tracks, "time", seconds + "");
            tracks.onmousedown = function (event) {
                yt$www$watch$getPlayerReference_().seekTo(parseInt(yt$dom$datasets$get(this, "time"), 10), true);
                return yt$events$preventDefault(event);
            };
            scrollbox.appendChild(tracks);
            var timeEl = document.createElement("div");
            timeEl.className = "cptime";
            timeEl.innerHTML =
                Math.floor(seconds / 60) + ":" + (seconds % 60 < 10 ? "0" : "") + Math.floor(seconds % 60);
            tracks.appendChild(timeEl);
            seconds = document.createElement("div");
            seconds.className = "cptext";
            seconds.innerHTML = selector.getTooltipText();
            tracks.appendChild(seconds);
        }
        yt$www$watch$transcript$syncInterval_ = yt$setInterval(yt$www$watch$transcript$sync_, 500);
    };
    var yt$www$watch$transcript$sync_ = function () {
        var currentTime = yt$www$watch$getPlayerReference_().getCurrentTime();
        var captions = yt$www$watch$transcript$track_.captions_;
        var previous = yt$www$watch$transcript$currentLine_;
        var line = previous;
        while (true) {
            var lineStart = line >= 0 ? captions[line].startMs_ / 1000 : -1;
            if (currentTime + 0.5 < lineStart) {
                line -= 1;
            } else {
                lineStart = line + 1 < captions.length ? captions[line + 1].startMs_ / 1000 : 1000000;
                if (currentTime + 0.5 > lineStart) {
                    line += 1;
                } else {
                    break;
                }
            }
        }
        if (line != previous) {
            if (previous >= 0) {
                currentTime = goog$dom$getElement("cp-" + previous);
                goog$dom$classes$remove(currentTime, "cpline-highlight");
            }
            if (line >= 0) {
                currentTime = goog$dom$getElement("cp-" + line);
                goog$dom$classes$add(currentTime, "cpline-highlight");
            }
            yt$www$watch$transcript$currentLine_ = line;
            if (!yt$www$watch$transcript$mouseOver_) {
                yt$www$watch$transcript$scrollTo_(goog$dom$getElement("cp-" + (line >= 3 ? line - 3 : 0)));
            }
        }
    };
    var yt$www$watch$transcript$scrollTo_ = function (lineEl) {
        yt$clearInterval(yt$www$watch$transcript$scrollInterval_);
        var scrollbox = goog$dom$getElement("captions-scrollbox");
        var target = Math.min(lineEl.offsetTop - scrollbox.offsetTop, scrollbox.scrollHeight - scrollbox.offsetHeight);
        var steps = 0;
        yt$www$watch$transcript$scrollInterval_ = yt$setInterval(function () {
            var distance = target - scrollbox.scrollTop;
            var step = Math.round((distance * 100) / (1000 - steps * 50));
            if (Math.abs(distance) <= Math.abs(step) || steps > 20) {
                scrollbox.scrollTop = target;
                yt$clearInterval(yt$www$watch$transcript$scrollInterval_);
            } else {
                scrollbox.scrollTop += step;
                steps++;
            }
        }, 50);
    };
    var yt$www$watch$flag$initForm_ = function (onCancel, onSubmitted) {
        var form = goog$dom$getElement("flag-video-form");
        var menu = goog$dom$getElement("flag-video-menu");
        if (form && menu) {
            new yt$www$watch$flag$FlagForm(form, menu, onCancel, onSubmitted);
        }
    };
    var yt$www$watch$flag$FlagForm = function (form, menu, onCancel, onSubmitted) {
        this.form_ = form;
        this.menu_ = menu;
        yt$events$listen(this.form_, "submit", goog$bind(this.handleFlagSubmit_, this));
        yt$events$delegateListItemClick(this.menu_, goog$bind(this.handleReasonClick_, this));
        yt$events$listen(goog$dom$getElement("flag-video-cancel"), "click", function (event) {
            event.preventDefault();
            onCancel();
        });
        this.doneCallback_ = onSubmitted;
    };
    yt$www$watch$flag$FlagForm.prototype.handleReasonClick_ = function (textboxLabel) {
        var item;
        item = textboxLabel.currentTarget;
        var reason = yt$www$watch$flag$FlagForm$selectReason_(this, item);
        var textboxLabel = yt$dom$datasets$get(item, "show-textbox-with-label");
        var includeTime = !!yt$dom$datasets$get(item, "include-time");
        var showHateGroup = !!yt$dom$datasets$get(item, "show-hate-group");
        var popupUrl = yt$dom$datasets$get(item, "popup-url");
        var resultMessage = yt$dom$datasets$get(item, "result-message") || "default";
        item = !!yt$dom$datasets$get(item, "no-post");
        var subReason = reason.subReason;
        this.form_.reason.value = reason.reason;
        this.form_.sub_reason.value = subReason;
        reason = goog$dom$getElement("flag-video-more-info-comment");
        if (textboxLabel) {
            goog$dom$getElement("flag-video-more-info-textarea-label").innerHTML = textboxLabel;
        }
        yt$style$setDisplayed(reason, !!textboxLabel);
        yt$style$setDisplayed(goog$dom$getElement("flag-video-more-info-time"), includeTime);
        yt$style$setDisplayed(goog$dom$getElement("flag-video-more-info-hate-group"), showHateGroup);
        if (popupUrl) {
            yt$window$popup(popupUrl, {
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
        if (item) {
            yt$style$hide(this.form_);
            yt$www$watch$flag$showResult_(resultMessage);
        } else {
            yt$dom$datasets$set(this.form_, "result-message", resultMessage);
            yt$style$show(this.form_);
        }
    };
    var yt$www$watch$flag$FlagForm$selectReason_ = function (form, item) {
        var button = yt$uix$Button.getInstance();
        var menuButton = yt$uix$Button$getMenuButton_(button, form.menu_);
        yt$uix$Button$hideMenu_(button, menuButton);
        button = button.getContent(menuButton);
        menuButton = goog$dom$getElementByClass("label", item);
        button.innerHTML = goog$dom$getTextContent(menuButton);
        button = goog$dom$getElementsByClass("selected", form.menu_);
        goog$array$forEach(button, function (selectedItem) {
            goog$dom$classes$remove(selectedItem, "selected", "child-selected");
        });
        goog$dom$classes$add(item, "selected");
        button = "";
        if ((menuButton = yt$dom$datasets$get(item, "subreason") || "")) {
            var parentItem = goog$dom$getAncestorByTagNameAndClass(item.parentNode, "li");
            var button = yt$dom$datasets$get(parentItem, "reason") || "";
            goog$dom$classes$add(parentItem, "selected", "child-selected");
        } else {
            button = yt$dom$datasets$get(item, "reason") || "";
        }
        return {
            reason: button,
            subReason: menuButton
        };
    };
    yt$www$watch$flag$FlagForm.prototype.handleFlagSubmit_ = function (event) {
        event.preventDefault();
        var submitButton = goog$dom$getElement("flag-video-submit");
        submitButton.disabled = true;
        var resultMessage = yt$dom$datasets$get(this.form_, "result-message");
        yt$net$ajax$send(this.form_.action, {
            format: "XML",
            method: "POST",
            requestBody: goog$dom$forms$getFormDataString(this.form_),
            onSuccess: function () {
                yt$www$watch$flag$showResult_(resultMessage);
                this.doneCallback_.call(goog$global);
            },
            onFail: function (xhr, response) {
                yt$www$watch$flag$hideResults_();
                var errorEl = goog$dom$getElement("flag-video-error");
                if (response && response.error_message) {
                    goog$dom$getElementByClass("yt-alert-content", errorEl).innerHTML = response.error_message;
                }
                yt$style$show(errorEl);
                submitButton.disabled = false;
            },
            context: this
        });
    };
    var yt$www$watch$flag$showResult_ = function (resultName) {
        yt$www$watch$flag$hideResults_();
        yt$style$hide("flag-video-form-container");
        yt$style$show("flag-video-result-" + resultName);
    };
    var yt$www$watch$flag$hideResults_ = function () {
        var results = goog$dom$getElementsByClass(
            "flag-video-result",
            goog$dom$getElement("flag-video-results-container")
        );
        goog$array$forEach(results, function (result) {
            yt$style$hide(result);
        });
    };
    var yt$sharing$sharePanel_;
    var yt$www$watch$actions$like_ = function (like) {
        if (yt$getConfig("ALLOW_RATINGS")) {
            var allowed;
            if ((allowed = !yt$www$watch$actions$checkLoggedOut_())) {
                if (yt$getConfig("YPC_CAN_RATE_VIDEO")) {
                    allowed = false;
                } else {
                    yt$www$watch$actions$showPanel_("watch-actions-rental-required");
                    allowed = true;
                }
                allowed = !allowed;
            }
            if (allowed) {
                if (yt$getConfig("YPC_SHOW_VPPA_CONFIRM_RATING") && !confirm(yt$getMsg("VPPA_CONFIRM"))) {
                    yt$www$watch$actions$hidePanels_();
                } else {
                    yt$www$watch$actions$showLoading_();
                    yt$www$watch$actions$rate(like, {
                        playbackId: yt$getConfig("PLAYBACK_ID"),
                        stationId: yt$getConfig("STATION_ID"),
                        onSuccess: function (xhr, response) {
                            goog$dom$classes$addRemove(
                                goog$dom$getElement("watch-like-unlike"),
                                like ? "unliked" : "liked",
                                like ? "liked" : "unliked"
                            );
                            yt$www$watch$actions$showAjaxContent_(response.html_content);
                            var plusOneEl = goog$dom$getElement("watch-like-share-plusone");
                            if (plusOneEl) {
                                new yt$sharing$PlusOneButton(
                                    plusOneEl,
                                    response.video_id,
                                    response.video_url,
                                    response.lang,
                                    response.session_index
                                );
                            }
                            yt$www$thumbnaildelayload$loadImmediately(goog$dom$getElement("watch-actions-ajax"));
                        },
                        onFail: yt$www$watch$actions$showError_
                    });
                }
            }
        } else {
            yt$www$watch$actions$showPanel_("watch-actions-ratings-disabled");
        }
    };
    var yt$www$watch$actions$flag = function (button, fromDislike) {
        var flagButton = button || goog$dom$getElement("watch-flag");
        if (yt$www$watch$actions$activateButton_(flagButton) && !yt$www$watch$actions$checkLoggedOut_()) {
            yt$www$watch$actions$showLoading_();
            var seconds = 0;
            var player = yt$www$watch$getPlayerReference_();
            if (player && player.pauseVideo) {
                player.pauseVideo();
                seconds = player.getCurrentTime();
            }
            seconds = Math.floor(seconds);
            player = Math.floor(seconds / 60);
            seconds = {
                action_get_flag_video_component: 1,
                video_id: yt$getConfig("VIDEO_ID"),
                t_mins: player,
                t_secs: seconds - player * 60
            };
            if (fromDislike) {
                seconds.from_dislike = 1;
            }
            yt$net$ajax$send("/watch_ajax", {
                format: "XML",
                method: "GET",
                urlParams: seconds,
                onSuccess: function (xhr, response) {
                    yt$www$watch$actions$showAjaxContent_(response.html_content);
                    yt$www$watch$flag$initForm_(
                        function () {
                            yt$www$watch$actions$hidePanels_();
                        },
                        function () {
                            flagButton.disabled = true;
                        }
                    );
                },
                onFail: yt$www$watch$actions$showError_
            });
        }
    };
    var yt$www$watch$actions$share = function (button, fromFlash) {
        if (yt$www$watch$actions$activateButton_(button)) {
            var container = yt$www$watch$actions$getElement_("watch-actions-share");
            if (yt$sharing$sharePanel_) {
                yt$www$watch$actions$showPanel_("watch-actions-share");
                yt$sharing$sharePanel_.reveal();
            } else {
                var videoId = yt$getConfig("VIDEO_ID");
                var listId = null;
                if (yt$www$lists$isPlayingUserList()) {
                    listId = yt$www$lists$initialized_ ? yt$www$lists$getPlaylistBar().getFullId() : null;
                }
                yt$www$watch$actions$showLoading_();
                yt$sharing$sharePanel_ = new yt$sharing$SharePanel(container, videoId, listId, function () {
                    yt$www$watch$actions$showPanel_("watch-actions-share");
                });
            }
            if (fromFlash) {
                yt$tracking$track("shareOpenedFromFlash", undefined, undefined);
            } else {
                yt$tracking$track("shareOpenedFromActionBar", undefined, undefined);
            }
            var player = yt$www$watch$getPlayerReference_();
            var interval = yt$setInterval(function () {
                var parts = goog$dom$classes$has(button, "active");
                if (!player || !parts) {
                    yt$clearInterval(interval);
                } else {
                    var parts = [];
                    for (var seconds = Math.floor(player.getCurrentTime()); seconds > 0;) {
                        parts.unshift(seconds % 60);
                        seconds = Math.floor(seconds / 60);
                    }
                    while (parts.length < 2) {
                        parts.unshift(0);
                    }
                    parts = goog$array$map(parts, function (part, index) {
                        if (index > 0 && part < 10) {
                            return "0" + part;
                        } else {
                            return part;
                        }
                    });
                    yt$sharing$setStartTime(parts.join(":"));
                }
            }, 1000);
            yt$tracking$conversion$ping("share");
        }
    };
    var yt$www$watch$actions$activateButton_ = function (button) {
        var activate = !goog$dom$classes$has(button, "active");
        yt$www$watch$actions$hidePanels_();
        if (activate) {
            goog$dom$classes$add(button, "active");
            yt$uix$Tooltip$hideTip_(yt$uix$Tooltip.getInstance(), button);
        }
        return activate;
    };
    var yt$www$watch$actions$showLoading_ = function () {
        yt$www$watch$actions$showPanel_("watch-actions-loading");
    };
    var yt$www$watch$actions$showAjaxContent_ = function (html) {
        yt$www$watch$actions$getElement_("watch-actions-ajax").innerHTML = html;
        yt$www$watch$actions$showPanel_("watch-actions-ajax");
    };
    var yt$www$watch$actions$showError_ = function (xhr, response) {
        var msg = response && response.error_message;
        if (!msg) {
            msg = yt$getMsg("WATCH_ERROR_MESSAGE");
        }
        yt$www$watch$actions$getElement_("watch-error-string").innerHTML = msg;
        yt$www$watch$actions$showPanel_("watch-actions-error");
    };
    var yt$www$watch$actions$elementCache_ = {};
    var yt$www$watch$actions$getElement_ = function (id) {
        if (!(id in yt$www$watch$actions$elementCache_)) {
            yt$www$watch$actions$elementCache_[id] = goog$dom$getElement(id);
        }
        return yt$www$watch$actions$elementCache_[id];
    };
    var yt$www$watch$actions$showPanel_ = function (panel) {
        var container = yt$www$watch$actions$getElement_("watch-actions-area-container");
        var panel = yt$www$watch$actions$getElement_(panel);
        var loading = yt$www$watch$actions$getElement_("watch-actions-loading");
        var area = yt$www$watch$actions$getElement_("watch-actions-area");
        if (!yt$style$isDisplayed(container)) {
            container.style.height = "0px";
            yt$style$show(container);
        }
        yt$style$hide(loading);
        yt$style$show(panel);
        goog$dom$classes$add(container, "transitioning");
        var height = area.offsetHeight + "px";
        yt$setTimeout(function () {
            container.style.height = height;
        }, 0);
        yt$setTimeout(function () {
            if (container.style.height == height) {
                goog$dom$classes$remove(container, "transitioning");
                container.style.height = "auto";
            }
        }, 500);
    };
    var yt$www$watch$actions$hidePanels_ = function () {
        var container = yt$www$watch$actions$getElement_("watch-actions-area-container");
        yt$style$hide(container);
        container = goog$dom$getElementsByClass("watch-actions-panel", container);
        goog$array$forEach(container, function (panel) {
            yt$style$hide(panel);
        });
        yt$www$watch$actions$getElement_("watch-actions-ajax").innerHTML = "";
        var container = yt$www$watch$actions$getElement_("watch-actions");
        var subactions = yt$www$watch$actions$getElement_("watch-subactions");
        var container = goog$dom$getElementsByTagNameAndClass("button", null, container);
        if (subactions) {
            subactions = goog$dom$getElementsByTagNameAndClass("button", null, subactions);
            goog$array$extend(goog$array$clone(container), goog$array$clone(subactions));
        }
        goog$array$forEach(container, function (button) {
            goog$dom$classes$remove(button, "active");
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
    var yt$www$lists$addtomenupebbles$expandButton_ = function (button) {
        var expanded = yt$dom$cloneNode_(button);
        goog$dom$classes$swap(expanded, "addto-button-collapsed", "addto-button-expanded");
        document.body.appendChild(expanded);
        goog$positioning$positionAtAnchor(button, 0, expanded, 0, new goog$math$Coordinate(0, -4));
    };
    var yt$www$lists$addtomenupebbles$collapseButton_ = function (button) {
        goog$dom$removeNode(button);
    };
    var yt$www$lists$addtomenupebbles$TagsMenu = function (menu, videoId) {
        this.menu_ = menu;
        this.pebbleListEl_ = goog$dom$getElementByClass("tags-menu-list", menu);
        this.videoId_ = videoId;
        this.fetch_();
    };
    yt$www$lists$addtomenupebbles$TagsMenu.prototype.fetch_ = function () {
        goog$dom$classes$add(this.menu_, "loading");
        yt$net$ajax$send("/pebbles_ajax", {
            method: "POST",
            context: this,
            urlParams: {
                action_get_all_user_pebbles: 1,
                video_id: this.videoId_
            },
            postParams: {
                session_token: yt$net$ajax$tokenMap_.pebbles_ajax
            },
            onSuccess: function (xhr, response) {
                this.pebbleListEl_.innerHTML = response.html;
                this.addForm_ = goog$dom$getElementByClass("add-pebble-form", this.menu_);
                this.videoIdInput_ = goog$dom$getElementByClass("video-id", this.addForm_);
                this.pebbleInput_ = goog$dom$getElementByClass("pebble-input", this.addForm_);
                this.submitButton_ = goog$dom$getElementByClass("pebble-submit-button", this.addForm_);
                this.attachHandlers_();
                goog$dom$classes$remove(this.menu_, "loading");
            }
        });
    };
    yt$www$lists$addtomenupebbles$TagsMenu.prototype.attachHandlers_ = function () {
        if (yt$www$lists$addtomenupebbles$clickListenerKey_ && yt$www$lists$addtomenupebbles$submitListenerKey_) {
            yt$events$unlistenByKey([
                yt$www$lists$addtomenupebbles$clickListenerKey_,
                yt$www$lists$addtomenupebbles$submitListenerKey_
            ]);
        }
        yt$www$lists$addtomenupebbles$clickListenerKey_ = yt$events$delegateByClass(
            this.menu_,
            "click",
            goog$bind(this.handlePebbleClick_, this),
            "pebble"
        );
        yt$www$lists$addtomenupebbles$submitListenerKey_ = yt$events$listen(
            this.addForm_,
            "submit",
            goog$bind(this.handleAddSubmit_, this)
        );
        yt$events$delegateByClass(this.menu_, "click", goog$bind(this.handleClose_, this), "close-tags-menu");
        yt$events$delegateByClass(this.menu_, "keyup", goog$bind(this.handleInputKeyUp_, this), "pebble-input");
    };
    yt$www$lists$addtomenupebbles$TagsMenu.prototype.handlePebbleClick_ = function (event) {
        yt$www$lists$addtomenupebbles$TagsMenu$togglePebble_(this, event.currentTarget);
    };
    yt$www$lists$addtomenupebbles$TagsMenu.prototype.handleInputKeyUp_ = function () {
        this.submitButton_.disabled = goog$string$isEmpty(this.pebbleInput_.value);
    };
    yt$www$lists$addtomenupebbles$TagsMenu.prototype.handleAddSubmit_ = function (event) {
        event.preventDefault();
        if (!goog$string$isEmpty(this.pebbleInput_.value)) {
            var pebbleName = event.currentTarget;
            var event = goog$dom$getElementByClass("pebble-list", this.menu_);
            var pebbleName = pebbleName.pebble.value;
            var lowerName = pebbleName.toLowerCase();
            var existing = null;
            goog$array$some(event.children, function (pebble) {
                var name = yt$dom$datasets$get(pebble, "pebble-name");
                if (name && name.toLowerCase() == lowerName) {
                    existing = pebble;
                    return true;
                } else {
                    return false;
                }
            });
            if (existing) {
                if (!goog$dom$classes$has(existing, "selected")) {
                    yt$www$lists$addtomenupebbles$TagsMenu$togglePebble_(this, existing, true);
                }
            } else {
                yt$www$lists$addtomenupebbles$TagsMenu$addNewPebble_(this, pebbleName);
            }
            this.pebbleInput_.focus();
            this.pebbleInput_.value = "";
        }
    };
    var yt$www$lists$addtomenupebbles$TagsMenu$togglePebble_ = function (tagsMenu, pebble, moveToTop) {
        var pebbleName = yt$dom$datasets$get(pebble, "pebble-name");
        var selected = goog$dom$classes$has(pebble, "selected");
        yt$net$ajax$send("/pebbles_ajax", {
            urlParams: selected
                ? {
                      action_delete_pebble_from_video: 1
                  }
                : {
                      action_add_pebble_to_video: 1
                  },
            method: "POST",
            postParams: {
                video_id: tagsMenu.videoIdInput_.value,
                pebble: pebbleName,
                session_token: yt$net$ajax$tokenMap_.pebbles_ajax
            }
        });
        var count = selected ? -1 : 1;
        goog$dom$classes$toggle(pebble, "selected");
        pebbleName = goog$dom$getElementByClass("pebble-count", pebble);
        count = parseInt(pebbleName.innerHTML, 10) + count;
        pebbleName.innerHTML = count;
        if (count == 0) {
            goog$dom$classes$add(pebbleName, "unused");
        } else {
            goog$dom$classes$remove(pebbleName, "unused");
        }
        if (!selected && moveToTop) {
            tagsMenu = goog$dom$getElementByClass("pebble-list", tagsMenu.menu_);
            tagsMenu.removeChild(pebble);
            tagsMenu.insertBefore(pebble, tagsMenu.children[0]);
            tagsMenu.scrollTop = 0;
        }
    };
    var yt$www$lists$addtomenupebbles$TagsMenu$addNewPebble_ = function (tagsMenu, pebbleName) {
        yt$net$ajax$send("/pebbles_ajax", {
            urlParams: {
                action_add_pebble_to_video: 1
            },
            method: "POST",
            postParams: {
                video_id: tagsMenu.videoIdInput_.value,
                pebble: pebbleName,
                session_token: yt$net$ajax$tokenMap_.pebbles_ajax
            }
        });
        var list = goog$dom$getElementByClass("pebble-list", tagsMenu.menu_);
        var pebble = goog$dom$getElementByClass("pebble-template", list).cloneNode(true);
        var nameEl = goog$dom$getElementByClass("pebble-name", pebble);
        var countEl = goog$dom$getElementByClass("pebble-count", pebble);
        yt$dom$datasets$set(pebble, "pebble-name", pebbleName);
        goog$dom$classes$remove(pebble, "pebble-template");
        goog$dom$classes$add(pebble, "selected");
        nameEl.innerHTML = pebbleName;
        countEl.innerHTML = "1";
        list.insertBefore(pebble, list.children[0]);
        list.scrollTop = 0;
    };
    yt$www$lists$addtomenupebbles$TagsMenu.prototype.handleClose_ = function () {
        var buttonWidget = yt$uix$Button.getInstance();
        var button = yt$uix$Button$getMenuButton_(buttonWidget, this.menu_);
        yt$uix$Button$hideMenu_(buttonWidget, button);
        goog$dom$removeNode(button);
    };
    var yt$www$lists$addto$menuTemplateHtml_;
    var yt$www$lists$addto$hadTooltipClass_;
    var yt$www$lists$addto$lightweightPanel_;
    var yt$www$lists$addto$AddToMenu = function (button, showPebbles) {
        this.button_ = button;
        this.menu_ = goog$dom$getElement("shared-addto-menu");
        this.feature_ = yt$dom$datasets$get(this.button_, "feature") || "";
        this.isWatchPage_ = goog$dom$classes$has(this.button_, "watch");
        this.videoIdsString_ = yt$dom$datasets$get(this.button_, "video-ids") || "";
        this.videoIds_ = this.videoIdsString_.split(",");
        if (!goog$isDef(yt$www$lists$addto$lightweightPanel_)) {
            yt$www$lists$addto$lightweightPanel_ = goog$dom$classes$has(this.menu_, "lightweight-panel");
        }
        var signIn = goog$dom$getElementByClass("sign-in", this.menu_);
        if (signIn) {
            yt$events$listen(signIn, "click", goog$bind(this.handleSignInClick_, this));
        } else if (showPebbles) {
            new yt$www$lists$addtomenupebbles$TagsMenu(this.menu_, this.videoIdsString_);
        } else {
            this.fetch_();
        }
    };
    yt$www$lists$addto$AddToMenu.prototype.fetch_ = function () {
        var params = {
            action_get_dropdown: "1"
        };
        if (this.feature_) {
            params.feature = this.feature_;
        }
        yt$net$ajax$send("/addto_ajax", {
            absoluteUrl: true,
            format: "XML",
            method: "GET",
            context: this,
            urlParams: params,
            onSuccess: function (xhr, response) {
                this.menu_.innerHTML = response.html_content || "";
                goog$dom$classes$enable(this.menu_, "ie", goog$userAgent$IE);
                this.decorate_();
                yt$www$lists$addto$AddToMenu$ellipsizeNames_(this);
            }
        });
    };
    yt$www$lists$addto$AddToMenu.prototype.decorate_ = function () {
        this.panels_ = {};
        this.panels_.list = goog$dom$getElement("addto-list-panel");
        this.panels_.savedPanel = goog$dom$getElement("addto-list-saved-panel");
        this.panels_.errorPanel = goog$dom$getElement("addto-list-error-panel");
        this.panels_.noteInputPanel = goog$dom$getElement("addto-note-input-panel");
        this.panels_.noteSavingPanel = goog$dom$getElement("addto-note-saving-panel");
        this.panels_.noteSavedPanel = goog$dom$getElement("addto-note-saved-panel");
        this.panels_.noteErrorPanel = goog$dom$getElement("addto-note-error-panel");
        this.panels_.createPanel = goog$dom$getElement("addto-create-panel");
        this.activePanel_ = this.panels_.list;
        yt$events$delegateByClass(
            this.panels_.list,
            "click",
            goog$bind(this.handleItemClick_, this),
            "yt-uix-button-menu-item"
        );
        this.saveNoteButton_ = goog$dom$getElementByClass("playlist-save-note", this.panels_.noteInputPanel);
        yt$events$listen(this.saveNoteButton_, "click", goog$bind(this.handleSaveNoteClick_, this));
        var closeButton = goog$dom$getElementByClass("close-button", this.menu_);
        yt$events$listen(closeButton, "click", goog$bind(this.handleMenuClose_, this));
    };
    var yt$www$lists$addto$AddToMenu$ellipsizeNames_ = function (names) {
        names = goog$dom$getElementsByClass("playlist-name", names.panels_.list);
        goog$array$forEach(names, function (nameEl) {
            var el = goog$dom$getElement(nameEl);
            var html = yt$dom$getEllipsizedHtml(el);
            var truncated = el.innerHTML != html;
            el.innerHTML = html;
            if (truncated) {
                nameEl = yt$dom$getAncestorByClass(nameEl, "yt-uix-button-menu-item");
                nameEl.title = yt$dom$datasets$get(nameEl, "possible-tooltip");
            }
        });
    };
    yt$www$lists$addto$AddToMenu.prototype.handleItemClick_ = function (playlistId) {
        playlistId.stopPropagation();
        var item = playlistId.currentTarget;
        yt$uix$Tooltip$hideTip_(yt$uix$Tooltip.getInstance(), item);
        this.isFavorites_ = false;
        var listType = (playlistId = null);
        var title = "";
        var action = yt$dom$datasets$get(item, "list-action");
        if (action) {
            if (action == "create-playlist") {
                yt$www$lists$addto$AddToMenu$showCreatePanel_(this);
            } else {
                if (action == "favorites") {
                    this.isFavorites_ = true;
                    listType = "FL";
                    title = item.innerHTML;
                } else if (action == "watch-later") {
                    listType = "WL";
                    title = item.innerHTML;
                } else {
                    listType = "PL";
                    playlistId = action;
                    item = goog$dom$getElementByClass("playlist-name", item);
                    title = yt$dom$datasets$get(item, "original-html");
                }
                yt$www$lists$addto$AddToMenu$addTo_(this, listType, playlistId);
                if (action == "watch-later" || action == "favorites" || this.videoIds_.length > 1) {
                    goog$dom$getElementByClass("addto-title", this.panels_.savedPanel).innerHTML = title;
                    goog$dom$classes$remove(this.menu_, "lightweight-panel");
                    yt$www$lists$addto$AddToMenu$switchPanel_(this, this.panels_.savedPanel, true);
                    playlistId = goog$dom$getElementByClass("close-note", this.menu_);
                    yt$style$show(playlistId);
                } else {
                    yt$www$lists$addto$AddToMenu$showNoteInput_(this, title);
                }
            }
        }
    };
    var yt$www$lists$addto$AddToMenu$showNoteInput_ = function (menu, title) {
        goog$dom$getElementByClass("addto-title", menu.panels_.noteInputPanel).innerHTML =
            goog$string$htmlEscape(title);
        yt$www$lists$addto$AddToMenu$switchPanel_(menu, menu.panels_.noteInputPanel, true);
        var closeNote = goog$dom$getElementByClass("close-note", menu.menu_);
        yt$style$show(closeNote);
        var noteInput = goog$dom$getElement("addto-note");
        yt$events$listen(noteInput, "keydown", goog$bind(menu.handleNoteKeyDown_, menu));
        yt$events$listen(noteInput, "paste", goog$bind(menu.handleNoteKeyDown_, menu));
        yt$www$lists$addto$onTransitionEnd_(menu.panels_.noteInputPanel, function () {
            noteInput.focus();
        });
    };
    var yt$www$lists$addto$onTransitionEnd_ = function (element, callback) {
        if (callback) {
            var eventName = goog$userAgent$WEBKIT
                ? "webkitTransitionEnd"
                : goog$userAgent$OPERA
                  ? "oTransitionEnd"
                  : goog$userAgent$GECKO
                    ? "transitionend"
                    : null;
            if (eventName) {
                yt$events$listenOnce(element, eventName, function () {
                    callback();
                });
            } else {
                callback();
            }
        }
    };
    yt$www$lists$addto$AddToMenu.prototype.handleNoteKeyDown_ = function (event) {
        var input = event.target;
        var label = goog$dom$getElementByClass("addto-note-label", this.panels_.noteInputPanel);
        yt$setTimeout(
            goog$bind(function () {
                var empty = goog$string$isEmpty(input.value);
                if (empty) {
                    yt$style$show(label);
                } else {
                    yt$style$hide(label);
                }
                if (!empty && this.listId_ && this.setVideoId_) {
                    yt$dom$setEnabled(this.saveNoteButton_, true);
                } else {
                    yt$dom$setEnabled(this.saveNoteButton_, false);
                }
            }, this),
            0
        );
    };
    var yt$www$lists$addto$AddToMenu$switchPanel_ = function (menu, panel, animation) {
        var animation = animation ? "slide" : "fade";
        var animations = ["fade", "slide"];
        goog$dom$classes$addRemove(menu.activePanel_, animations, animation);
        goog$dom$classes$addRemove(panel, animations, animation);
        if (yt$www$lists$addto$lightweightPanel_ && panel == menu.panels_.list) {
            goog$dom$classes$add(menu.menu_, "lightweight-panel");
        }
        if (goog$dom$classes$has(panel, "dismissed-panel")) {
            goog$dom$classes$remove(panel, "dismissed-panel");
            goog$dom$classes$remove(menu.activePanel_, "active-panel");
        } else {
            goog$dom$classes$swap(menu.activePanel_, "active-panel", "dismissed-panel");
        }
        goog$dom$classes$add(panel, "active-panel");
        menu.activePanel_ = panel;
    };
    var yt$www$lists$addto$AddToMenu$showCreatePanel_ = function (menu) {
        yt$www$lists$addto$AddToMenu$switchPanel_(menu, menu.panels_.createPanel, true);
        yt$www$lists$addto$AddToMenu$initCreatePanel_(menu);
        yt$dom$datasets$remove(menu.menu_, "video-ids");
        var input = goog$dom$getElement("addto-create-playlist");
        yt$events$listen(input, "keydown", goog$bind(menu.handleCreateInput_, menu));
        yt$events$listen(input, "paste", goog$bind(menu.handleCreateInput_, menu));
        yt$www$lists$addto$onTransitionEnd_(menu.panels_.createPanel, function () {
            input.focus();
        });
        var button = goog$dom$getElementByClass("addto-create-cancel-button", menu.panels_.createPanel);
        yt$events$listen(
            button,
            "click",
            goog$bind(function () {
                yt$www$lists$addto$AddToMenu$hide_(this);
            }, menu)
        );
        button = goog$dom$getElementByClass("create-playlist-button", menu.panels_.createPanel);
        yt$events$listen(button, "click", goog$bind(menu.handleCreateClick_, menu));
    };
    var yt$www$lists$addto$AddToMenu$initCreatePanel_ = function (menu) {
        menu.createInput_ = goog$dom$getElementByClass("addto-create-playlist", menu.panels_.createPanel);
        menu.createLabel_ = goog$dom$getElementByClass("addto-create-playlist-label", menu.panels_.createPanel);
        menu.createButton_ = goog$dom$getElementByClass("create-playlist-button", menu.panels_.createPanel);
        menu.privacyForm_ = goog$dom$getElementByClass("privacy-form", menu.panels_.createPanel);
        yt$events$delegateByClass(
            menu.privacyForm_,
            "click",
            goog$bind(menu.handleCreateInput_, menu),
            "playlist-privacy-option"
        );
    };
    yt$www$lists$addto$AddToMenu.prototype.handleCreateClick_ = function () {
        var name = this.createInput_.value;
        this.createdNewPlaylist_ = true;
        var privacy = parseInt(goog$dom$forms$getValueByName_isPrivate(this.privacyForm_), 10);
        yt$www$lists$addto$AddToMenu$addTo_(this, "PL", null, name, privacy);
        if (this.videoIds_.length > 1) {
            yt$www$lists$addto$AddToMenu$hide_(this);
        } else {
            yt$www$lists$addto$AddToMenu$showNoteInput_(this, name);
        }
    };
    yt$www$lists$addto$AddToMenu.prototype.handleCreateInput_ = function () {
        yt$setTimeout(
            goog$bind(function () {
                var empty = goog$string$isEmpty(this.createInput_.value);
                if (empty) {
                    yt$style$show(this.createLabel_);
                } else {
                    yt$style$hide(this.createLabel_);
                }
                var privacy = goog$dom$forms$getValueByName_isPrivate(this.privacyForm_);
                if (empty || !privacy) {
                    yt$dom$setEnabled(this.createButton_, false);
                } else {
                    yt$dom$setEnabled(this.createButton_, true);
                }
            }, this),
            0
        );
    };
    yt$www$lists$addto$AddToMenu.prototype.handleMenuClose_ = function () {
        yt$www$lists$addto$AddToMenu$hide_(this);
    };
    var yt$www$lists$addto$AddToMenu$hide_ = function (menu) {
        var buttonWidget = yt$uix$Button.getInstance();
        var button = yt$uix$Button$getMenuButton_(buttonWidget, menu.menu_);
        if (button && yt$dom$datasets$get(button, "video-ids") == menu.videoIdsString_) {
            yt$uix$Button$hideMenu_(buttonWidget, button);
        }
    };
    var yt$www$lists$addto$AddToMenu$addTo_ = function (menu, listType, playlistId, newName, privacy) {
        menu.type_ = listType;
        yt$www$addto$addTo({
            videoIdList: menu.videoIdsString_,
            listType: menu.type_,
            playlistId: playlistId,
            newPlaylistName: newName,
            privacy: privacy,
            trackingFeature: menu.feature_,
            onSuccess: menu.handleAddSuccess_,
            onFail: menu.handleAddError_,
            context: menu
        });
        yt$dom$datasets$remove(menu.menu_, "video-ids");
        listType = "";
        switch (menu.type_) {
            case "PL":
                listType = newName ? "new_pl" : "pl";
                break;
            case "FL":
                listType = "fav";
                break;
            case "WL":
                listType = "wl";
        }
        newName = {
            list: listType,
            feature: menu.feature_
        };
        if ((menu = goog$dom$getAncestorByTagNameAndClass(menu.button_, "a", null)) && menu.href) {
            menu = yt$uri$getQueryData(menu.href);
            newName.link_feature = menu.feature || "";
        }
        menu = yt$uri$buildQueryData(newName);
        yt$tracking$track("addto", menu, undefined);
    };
    yt$www$lists$addto$AddToMenu.prototype.handleAddSuccess_ = function (xhr, response) {
        this.listId_ = response.list_id || "";
        this.setVideoId_ = response.setvideo_id || "";
        var html = response.html_content || "";
        var listUrl = response.list_url || "";
        if (this.listId_ && this.setVideoId_) {
            var titleEl = goog$dom$getElementByClass("addto-title", this.menu_);
            var link = document.createElement("a");
            link.href = listUrl;
            link.innerHTML = titleEl.innerHTML;
            goog$dom$removeChildren(titleEl);
            titleEl.appendChild(link);
            if (!goog$string$isEmpty(goog$dom$getElement("addto-note").value)) {
                yt$dom$setEnabled(this.saveNoteButton_, true);
            }
        }
        if (!this.isWatchPage_ && (listUrl = yt$dom$getAncestorByClass(this.button_, "ux-thumb-wrap"))) {
            if ((titleEl = goog$dom$getElementByClass("video-in-quicklist", listUrl))) {
                goog$dom$removeNode(titleEl);
            }
            titleEl = document.createElement("span");
            titleEl.className = "video-in-quicklist";
            titleEl.innerHTML = html;
            listUrl.appendChild(titleEl);
        }
        html = yt$getMsg("PLAYLIST_BAR_ADDED_TO_PLAYLIST");
        if (this.isFavorites_) {
            html = yt$getMsg("PLAYLIST_BAR_ADDED_TO_FAVORITES");
        }
        yt$www$lists$onVideosAdded(this.type_, this.listId_, this.videoIds_, html);
    };
    yt$www$lists$addto$AddToMenu.prototype.handleAddError_ = function (xhr, response) {
        var msg = response && response.error_message;
        if (msg) {
            goog$dom$getElementByClass("error-details", this.panels_.errorPanel).innerHTML = msg;
            var msg = goog$dom$getElementByClass("show-menu-link", this.panels_.errorPanel);
            var listenerKey = yt$events$listen(
                msg,
                "click",
                goog$bind(function (event) {
                    event.preventDefault();
                    yt$events$unlistenByKey(listenerKey);
                    goog$dom$classes$remove(this.panels_.noteInputPanel, "dismissed-panel", "fade", "slide");
                    goog$dom$classes$remove(this.panels_.savedPanel, "dismissed-panel", "fade", "slide");
                    event = goog$dom$getElementByClass("close-note", this.menu_);
                    yt$style$hide(event);
                    if (this.createdNewPlaylist_) {
                        yt$www$lists$addto$AddToMenu$switchPanel_(this, this.panels_.createPanel, true);
                    } else {
                        yt$www$lists$addto$AddToMenu$switchPanel_(this, this.panels_.list, true);
                    }
                }, this)
            );
            if ((msg = goog$dom$getElement("addto-create-name"))) {
                msg.disabled = false;
            }
            goog$dom$classes$remove(this.panels_.errorPanel, "dismissed-panel", "fade", "slide");
            yt$www$lists$addto$AddToMenu$switchPanel_(this, this.panels_.errorPanel);
        } else {
            yt$www$lists$addto$AddToMenu$hide_(this);
        }
        if (this.isWatchPage_) {
            yt$www$watch$actions$showError_(0, response);
        }
    };
    yt$www$lists$addto$AddToMenu.prototype.handleSaveNoteClick_ = function () {
        yt$net$ajax$send("/playlist_bar_ajax", {
            method: "POST",
            absoluteUrl: true,
            urlParams: {
                action_set_playlist_item_annotation: 1
            },
            postParams: {
                annotation: goog$dom$getElement("addto-note").value,
                playlist_id: this.listId_,
                setvideo_id: this.setVideoId_,
                session_token: yt$net$ajax$tokenMap_.playlist_bar_ajax
            },
            onSuccess: this.handleNoteSaved_,
            onFail: this.handleNoteError_,
            context: this
        });
        yt$www$lists$addto$AddToMenu$switchPanel_(this, this.panels_.noteSavingPanel);
    };
    yt$www$lists$addto$AddToMenu.prototype.handleNoteSaved_ = function () {
        var title = goog$dom$getElementByClass("addto-title", this.panels_.noteInputPanel);
        var titleCopy = yt$dom$cloneNode_(title);
        goog$dom$classes$add(titleCopy, "yt-uix-tooltip-reverse");
        goog$dom$getElementByClass("panel-content", this.panels_.noteSavedPanel).appendChild(titleCopy);
        yt$www$lists$addto$AddToMenu$switchPanel_(this, this.panels_.noteSavedPanel);
        yt$setTimeout(
            goog$bind(function () {
                yt$uix$Tooltip$hideTip_(yt$uix$Tooltip.getInstance(), titleCopy);
                yt$www$lists$addto$AddToMenu$hide_(this);
            }, this),
            3000
        );
    };
    yt$www$lists$addto$AddToMenu.prototype.handleNoteError_ = function (xhr, response) {
        var errors = response && response.errors;
        if (errors) {
            var list = goog$dom$getElementByClass("error-details", this.panels_.noteErrorPanel);
            goog$dom$removeChildren(list);
            goog$array$forEach(errors, function (error) {
                var item = document.createElement("li");
                item.innerHTML = error;
                list.appendChild(item);
            });
            var errors = goog$dom$getElementByClass("add-note-link", this.panels_.noteErrorPanel);
            var listenerKey = yt$events$listen(
                errors,
                "click",
                goog$bind(function (event) {
                    event.preventDefault();
                    yt$events$unlistenByKey(listenerKey);
                    goog$dom$classes$remove(this.panels_.noteSavingPanel, "dismissed-panel");
                    yt$www$lists$addto$AddToMenu$switchPanel_(this, this.panels_.noteInputPanel);
                }, this)
            );
            yt$www$lists$addto$AddToMenu$switchPanel_(this, this.panels_.noteErrorPanel);
        } else {
            yt$www$lists$addto$AddToMenu$hide_(this);
        }
    };
    yt$www$lists$addto$AddToMenu.prototype.handleSignInClick_ = function () {
        var url = yt$uri$setQueryData("/addto_ajax", {
            action_redirect_to_signin_with_add: 1,
            list_type: "WL",
            video_ids: this.videoIdsString_,
            next_url: document.location
        });
        var form = document.createElement("form");
        form.action = url;
        form.method = "POST";
        url = document.createElement("input");
        url.type = "hidden";
        url.name = "session_token";
        url.value = yt$net$ajax$tokenMap_.addto_ajax_logged_out;
        form.appendChild(url);
        document.body.appendChild(form);
        form.submit();
    };
    var yt$www$lists$pebblesmigration$onImportClick_ = function (event) {
        event = goog$dom$getAncestorByTagNameAndClass(event.currentTarget, "FORM");
        yt$net$ajax$sendForm(event, {
            method: "POST",
            postParams: {
                session_token: yt$net$ajax$tokenMap_.pebbles_ajax
            }
        });
    };
    var yt$www$lists$pebblesmigration$onWipeClick_ = function (event) {
        event = goog$dom$getAncestorByTagNameAndClass(event.currentTarget, "FORM");
        yt$net$ajax$sendForm(event, {
            method: "POST",
            postParams: {
                session_token: yt$net$ajax$tokenMap_.pebbles_ajax
            }
        });
    };
    var yt$www$masthead$accountswitch$enabled_ = false;
    window.gapi = window.gapi || {};
    var gapi$URI_RE_ = /^(https?:)?\/\/([^/:@]*)(:[0-9]+)?(\/[\w.,:!=/-]*)(\?[^#]*)?(#.*)?$/;
    var gapi$HINT_RE_ = /^[?#]([^&]*&)*jsh=([^&]*)/;
    var gapi$warn_ = function (msg) {
        var console = window.console;
        if (console) {
            console.warn("gapi.load: " + msg);
        }
    };
    var gapi$getHint_ = function (config) {
        var search = window.location.search;
        var hash = window.location.hash;
        var config = config.h;
        if ((search = (search && gapi$HINT_RE_.exec(search)) || (hash && gapi$HINT_RE_.exec(hash)))) {
            try {
                config = decodeURIComponent(search[2]);
            } catch (d) {
                gapi$warn_("Invalid hint " + search[2]);
            }
        }
        return config;
    };
    var gapi$sortUnique_ = function (arr) {
        arr.sort();
        for (var i = 0; i < arr.length;) {
            if (!arr[i] || (i && arr[i] == arr[i - 1])) {
                arr.splice(i, 1);
            } else {
                ++i;
            }
        }
    };
    var gapi$containsAll_ = function (needed, loaded) {
        var set = {};
        for (var i = 0; i < loaded.length; i++) {
            set[loaded[i]] = true;
        }
        for (i = 0; i < needed.length; i++) {
            if (!set.hasOwnProperty(needed[i])) {
                return false;
            }
        }
        return true;
    };
    var gapi$isSync_ = function (config) {
        if (document.readyState != "loading") {
            return false;
        }
        if (typeof window.___gapisync != "undefined") {
            return window.___gapisync;
        }
        if (config && ((config = config.sync), typeof config != "undefined")) {
            return config;
        }
        for (var config = document.getElementsByTagName("meta"), i = 0, meta; (meta = config[i]); ++i) {
            if (meta.getAttribute("name") == "generator" && meta.getAttribute("content") == "blogger") {
                return true;
            }
        }
        return false;
    };
    var gapi$loadScript_ = function (config, url) {
        if (gapi$isSync_(config)) {
            document.write('<script src="' + encodeURI(url) + '"></script>');
        } else {
            var script = document.createElement("script");
            script.setAttribute("src", url);
            script.async = true;
            var firstScript = document.getElementsByTagName("script")[0];
            firstScript.parentNode.insertBefore(script, firstScript);
        }
    };
    var gapi$buildUrl_ = function (features, loaded, hintParts, jsl, options, callbackName) {
        var type = hintParts.shift();
        var host;
        host =
            type == "r"
                ? "https://ssl.gstatic.com"
                : type == "m"
                  ? jsl.ms || "https://apis.google.com"
                  : (host = hintParts.shift()) && host.replace(/\/+$/, "");
        var path;
        if (type == "r") {
            path = hintParts.shift();
            path = (path.indexOf("/webclient/jsx/") ? "/webclient/js/" : "") + path;
        } else {
            path = hintParts.shift();
        }
        var isDynamic = type == "d";
        var container = (isDynamic && hintParts.shift()) || "gcjs-3p";
        var hintParts = isDynamic && hintParts.shift();
        if (type == "d") {
            options =
                "/" +
                features.join(":") +
                (loaded.length ? "!" + loaded.join(":") : "") +
                ".js?container=" +
                container +
                "&c=2&jsload=0";
            if (path) {
                options += "&r=" + path;
            }
            if (hintParts == "d") {
                options += "&debug=1";
            }
        } else if (type == "r" || type == "f") {
            options =
                (path.indexOf("/") ? "/" : "") +
                path +
                "/" +
                features.join("__") +
                (loaded.length ? "--" + loaded.join("__") : "") +
                ".js";
        } else if (type == "m" || type == "n") {
            features = features.join(",").replace(/\./g, "_").replace(/-/g, "_");
            features = (path || "").replace("__features__", features);
            features = options.nodep ? features.replace("/d=1/", "/d=0/") : features;
            if (callbackName) {
                if (!features.match(/\/$/)) {
                    features += "/";
                }
                features += "cb=gapi." + encodeURIComponent(callbackName);
            }
            options = features;
        } else {
            gapi$warn_("Unknown hint type " + type);
            return "";
        }
        if (!host) {
            return "";
        }
        options = host + options;
        callbackName = gapi$URI_RE_.exec(options);
        if (!(host = !callbackName)) {
            if (!(host = !!/\.\.|\/\//.test(callbackName[4]))) {
                callbackName = callbackName[2];
                a: if (type == "r") {
                    jsl = options.substr(0, 23) == "https://ssl.gstatic.com";
                } else if (type == "m") {
                    jsl = jsl.ms || "https://apis.google.com";
                    jsl = options.substr(0, jsl.length) == jsl;
                } else {
                    jsl = jsl.m;
                    if (callbackName && jsl) {
                        if (!/^[0-9a-zA-Z.-]+$/.test(callbackName)) {
                            jsl = false;
                            break a;
                        }
                        jsl = jsl.split(",");
                        type = 0;
                        for (host = jsl.length; type < host; ++type) {
                            features = jsl[type];
                            loaded = callbackName.lastIndexOf(features);
                            if (
                                (loaded == 0 || features.charAt(0) == "." || callbackName.charAt(loaded - 1) == ".") &&
                                callbackName.length - features.length == loaded
                            ) {
                                jsl = true;
                                break a;
                            }
                        }
                    }
                    jsl = false;
                }
                host = !jsl;
            }
        }
        if (host) {
            throw "gapi.load: Invalid URI" + (options && " " + options);
        }
        return options;
    };
    var gapi$pushTo_ = function (obj, key, value) {
        if (value) {
            (obj[key] = obj[key] || []).push(value);
        }
    };
    var gapi$processQueue_ = function (jsl) {
        if (jsl.q && jsl.q.length > 0) {
            (window.gapi.load || gapi$load).apply(null, jsl.q.shift());
        }
    };
    var gapi$safeCall_ = function (fn) {
        if (fn) {
            try {
                fn();
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
        var ns;
        if ((ns = Object.create) && /\[native code\]/.test(ns)) {
            ns = ns(null);
        } else {
            ns = {};
            for (var key in ns) {
                ns[key] = undefined;
            }
        }
        return (gapi$global_._ = ns);
    };
    var gapi$registerCallback_ = function (url, callback, callbackName, options, jsl) {
        var queue = (jsl.Q = jsl.Q || []);
        var loaded = (jsl.lc = jsl.lc || {});
        queue.push([url, callback, options]);
        gapi$global_[callbackName] = function (init) {
            gapi$global_[callbackName] = undefined;
            if (!loaded[url]) {
                loaded[url] = init;
                var error;
                for (; queue[0] && loaded[queue[0][0]];) {
                    init = queue.shift();
                    gapi$applyConfig_(init[2], jsl);
                    loaded[init[0]].call(window, gapi$getPrivateNamespace_());
                    loaded[init[0]] = true;
                    if ((init = gapi$safeCall_(init[1])) && !error) {
                        error = init;
                    }
                }
                jsl.p = undefined;
                gapi$processQueue_(jsl);
                if (error) {
                    throw error;
                }
            }
        };
    };
    var gapi$applyConfig_ = function (options, jsl) {
        gapi$pushTo_(jsl, "ci", options._ci);
        var config = options.config;
        if (gapi$global_.config) {
            gapi$global_.config.update(config);
        } else {
            gapi$pushTo_(jsl, "cu", config);
        }
    };
    var gapi$nextCallbackName_ = function (jsl) {
        if (!jsl.I) {
            jsl.I = 0;
        }
        return "loaded" + jsl.I++;
    };
    var gapi$load = function (features, callbackOrOptions) {
        var callback;
        var options = {};
        if (typeof callbackOrOptions !== "function") {
            options = callbackOrOptions || {};
            callback = options.callback;
        } else {
            callback = callbackOrOptions;
        }
        var jsl = (window.___jsl = window.___jsl || {});
        var hint = gapi$getHint_(jsl);
        var isGapiHint = hint && !!hint.match(/\/gapi\/|ms=gapi/);
        if (jsl.p) {
            gapi$pushTo_(jsl, "q", [features, callbackOrOptions]);
        } else {
            if (!hint) {
                throw "gapi.load: No hint present";
            }
            var hintParts = hint.split(";");
            var isModular = hintParts[0] == "m" || hintParts[0] == "n";
            var hint = [];
            var loaded = [];
            if (jsl.il && typeof jsl.il === "function") {
                hint = jsl.il(features);
                options.nodep = 1;
            } else {
                hint = features.split(":");
                if (!options.nodep) {
                    gapi$sortUnique_(hint);
                }
                loaded = jsl.l = jsl.l || [];
                gapi$sortUnique_(loaded);
            }
            if (isGapiHint) {
                if (
                    !gapi$containsAll_(hint, loaded) &&
                    ((isGapiHint = gapi$nextCallbackName_(jsl)),
                    (hintParts = gapi$buildUrl_(hint, loaded, hintParts, jsl, options, isGapiHint)))
                ) {
                    jsl.p = hint;
                    gapi$registerCallback_(hintParts, callback, isGapiHint, options, jsl);
                    loaded.push.apply(loaded, hint);
                    gapi$loadScript_(options, hintParts);
                    return;
                }
                gapi$applyConfig_(options, jsl);
                if (callback) {
                    var error = gapi$safeCall_(callback);
                }
            } else {
                gapi$applyConfig_(options, jsl);
                if (!gapi$containsAll_(hint, loaded)) {
                    var callbackKey = isModular ? "cm" : "c";
                    if ((hintParts = gapi$buildUrl_(hint, loaded, hintParts, jsl, options, null))) {
                        jsl.p = hint;
                        jsl.o = 1;
                        jsl[callbackKey] = function () {
                            jsl.p = undefined;
                            jsl[callbackKey] = undefined;
                            var err = gapi$safeCall_(callback);
                            gapi$processQueue_(jsl);
                            if (err) {
                                throw err;
                            }
                        };
                        loaded.push.apply(loaded, hint);
                        gapi$loadScript_(options, hintParts);
                        return;
                    }
                }
                error = gapi$safeCall_(callback);
            }
            gapi$processQueue_(jsl);
            if (error) {
                throw error;
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
        var now = goog$now();
        if (!(now - yt$www$watch$activity$lastActive_ < 1000)) {
            yt$www$watch$activity$lastActive_ = now;
            yt$net$cookies$set("ACTIVITY", "" + now);
        }
    };
    var yt$www$watch$activity$getTimeSinceActive = function () {
        return goog$now() - yt$www$watch$activity$lastActive_;
    };
    var yt$www$notifications$NotificationsWidget = function (
        targetId,
        onepickTargetId,
        setCountCallback,
        hl,
        authuser
    ) {
        this.frame_ = null;
        this.setCountCallback_ = setCountCallback;
        this.targetId_ = targetId;
        this.onepickTargetId_ = onepickTargetId;
        this.hl_ = hl;
        this.frameUrl_ =
            yt$getConfig("GOOGLEPLUS_HOST") +
            (authuser != null ? "/u/" + authuser : "") +
            "/_/notifications/frame#pid=36";
        this.targetEl_ = goog$dom$getElement(targetId);
        this.onepickEl_ = goog$dom$getElement(onepickTargetId);
    };
    var yt$www$notifications$getOpenHandlers_ = function (widget, handlers, targetId, isOnepick) {
        return {
            onOpen: goog$bind(function (frame) {
                return frame.openInto(targetId);
            }, widget),
            onReady: goog$bind(function () {
                if (handlers.showOnepick && isOnepick) {
                    handlers.showOnepick();
                }
            }, widget),
            onClose: function (frame) {
                if (handlers.hideOnepick && isOnepick) {
                    handlers.hideOnepick();
                }
                frame.remove();
            }
        };
    };
    var yt$www$notifications$callMethod_ = function (frame, method, arg) {
        if (typeof arg === "undefined") {
            frame[method]();
        } else {
            frame[method](arg);
        }
    };
    yt$www$notifications$NotificationsWidget.prototype.load_ = function (handlers) {
        var methods = {
            setNotificationWidgetHeight: goog$bind(function (height) {
                this.targetEl_.style.height = height;
            }, this),
            setNotificationText: goog$bind(function (count) {
                this.setCountCallback_(parseInt(count, 10));
            }, this),
            hideNotificationWidget: function () {
                if (handlers.hideNotificationWidget) {
                    handlers.hideNotificationWidget();
                }
            },
            openSharebox: function () {},
            onError: function () {}
        };
        this.frame_ = iframes.open(
            this.frameUrl_,
            {
                style: "iframe-style"
            },
            {
                origin: window.location.protocol + "//" + window.location.hostname,
                source: "yt",
                hl: this.hl_
            },
            methods,
            function () {}
        );
    };
    yt$www$notifications$NotificationsWidget.prototype.load = function (handlers) {
        iframes.setHandler(
            "iframe-style",
            yt$www$notifications$getOpenHandlers_(this, handlers, this.targetId_, false)
        );
        iframes.setHandler(
            "onepick",
            yt$www$notifications$getOpenHandlers_(this, handlers, this.onepickTargetId_, true)
        );
        this.load_(handlers);
    };
    yt$www$notifications$NotificationsWidget.prototype.close = function () {
        yt$www$notifications$callMethod_(this.frame_, "onHide");
    };
    yt$www$notifications$NotificationsWidget.prototype.showNotifications = function () {
        yt$www$notifications$callMethod_(this.frame_, "onShowNotificationsOnly", {});
    };
    yt$www$notifications$NotificationsWidget.prototype.showSharebox = function () {
        var url = window.location.href;
        if (url.indexOf("/watch?") != -1) {
            yt$www$notifications$callMethod_(this.frame_, "setPrefill", {
                items: [
                    {
                        type: "http://schema.org/VideoObject",
                        id: url,
                        properties: {
                            url: [url]
                        }
                    }
                ]
            });
        }
        yt$www$notifications$callMethod_(this.frame_, "onShowShareboxOnly", {});
    };
    var yt$www$notifications$NotificationsWidget$setActive_ = function (widget, active) {
        if (active) {
            yt$www$notifications$callMethod_(widget.frame_, "onActive");
        } else {
            yt$www$notifications$callMethod_(widget.frame_, "onIdle");
        }
    };
    var yt$www$sandbar$Sandbar = function (hl, authuser) {
        this.shareboxOpen_ = this.notificationsOpen_ = false;
        this.notificationCount_ = 0;
        this.container_ = goog$dom$getElement("sb-container");
        this.notifyButton_ = goog$dom$getElement("sb-button-notify");
        this.notifyCountEl_ = yt$dom$getFirstElementByTagNameAndClass(
            "SPAN",
            "yt-uix-button-content",
            goog$dom$getElement("sb-button-notify")
        );
        this.onepickEl_ = goog$dom$getElement("sb-onepick-target");
        this.frame_ = new yt$www$notifications$NotificationsWidget(
            "sb-target",
            "sb-onepick-target",
            goog$bind(this.setCount_, this),
            hl,
            authuser
        );
        this.frame_.load({
            hideNotificationWidget: goog$bind(this.hideAll_, this),
            showOnepick: goog$bind(this.showOnepick_, this),
            hideOnepick: goog$bind(this.hideOnepick_, this)
        });
        this.onepickSize_ = goog$style$getSize(this.onepickEl_);
        this.updatePosition_();
        yt$events$listen(window, "resize", goog$bind(this.updatePosition_, this));
        yt$events$listen(window, "click", goog$bind(this.hideAll_, this));
        yt$www$watch$activity$init();
        yt$setInterval(goog$bind(this.updateActivity_, this), 120000);
    };
    yt$www$sandbar$Sandbar.prototype.handleNotifyClick = function (event) {
        if (this.notificationsOpen_) {
            yt$www$sandbar$Sandbar$hideNotifications_(this);
            yt$www$notifications$NotificationsWidget$setActive_(this.frame_, true);
        } else {
            if (this.shareboxOpen_) {
                yt$www$sandbar$Sandbar$hideSharebox_(this);
            }
            this.showNotifications();
            yt$www$notifications$NotificationsWidget$setActive_(this.frame_, false);
        }
        yt$events$stopPropagation(event);
    };
    yt$www$sandbar$Sandbar.prototype.handleShareClick = function (event) {
        if (this.shareboxOpen_) {
            yt$www$sandbar$Sandbar$hideSharebox_(this);
        } else {
            if (this.notificationsOpen_) {
                yt$www$sandbar$Sandbar$hideNotifications_(this);
            }
            this.showSharebox();
        }
        yt$events$stopPropagation(event);
    };
    yt$www$sandbar$Sandbar.prototype.showNotifications = function () {
        this.frame_.close();
        yt$www$sandbar$Sandbar$setCardVisible_(this, true, "notif");
        goog$dom$classes$add(this.notifyButton_, "sb-notif-clicked");
        this.frame_.showNotifications();
        this.notificationsOpen_ = true;
    };
    yt$www$sandbar$Sandbar.prototype.showSharebox = function () {
        this.frame_.close();
        yt$www$sandbar$Sandbar$setCardVisible_(this, true, "sharebox");
        this.frame_.showSharebox();
        this.shareboxOpen_ = true;
    };
    var yt$www$sandbar$Sandbar$setCardVisible_ = function (sandbar, visible, card) {
        card = "sb-card-" + card;
        if (visible) {
            goog$dom$classes$addRemove(sandbar.container_, "sb-off", "sb-on");
            goog$dom$classes$add(sandbar.container_, card);
        } else {
            goog$dom$classes$addRemove(sandbar.container_, "sb-on", "sb-off");
            goog$dom$classes$remove(sandbar.container_, card);
        }
    };
    var yt$www$sandbar$Sandbar$hideSharebox_ = function (sandbar) {
        yt$www$sandbar$Sandbar$setCardVisible_(sandbar, false, "sharebox");
        sandbar.shareboxOpen_ = false;
    };
    var yt$www$sandbar$Sandbar$hideNotifications_ = function (sandbar) {
        yt$www$sandbar$Sandbar$setCardVisible_(sandbar, false, "notif");
        sandbar.notificationsOpen_ = false;
        goog$dom$classes$remove(sandbar.notifyButton_, "sb-notif-clicked");
    };
    yt$www$sandbar$Sandbar.prototype.hideAll_ = function () {
        if (this.notificationsOpen_ || this.shareboxOpen_) {
            this.frame_.close();
            yt$www$sandbar$Sandbar$hideNotifications_(this);
            yt$www$sandbar$Sandbar$hideSharebox_(this);
            yt$www$sandbar$Sandbar$updateCount_(this);
        }
    };
    yt$www$sandbar$Sandbar.prototype.setCount_ = function (count) {
        this.notificationCount_ = count;
        yt$www$sandbar$Sandbar$updateCount_(this);
    };
    var yt$www$sandbar$Sandbar$updateCount_ = function (sandbar) {
        goog$dom$setTextContent(sandbar.notifyCountEl_, sandbar.notificationCount_ + "");
        if (sandbar.notificationCount_ == 0) {
            goog$dom$classes$addRemove(sandbar.notifyButton_, "sb-notif-on", "sb-notif-off");
        } else {
            goog$dom$classes$addRemove(sandbar.notifyButton_, "sb-notif-off", "sb-notif-on");
        }
    };
    yt$www$sandbar$Sandbar.prototype.showOnepick_ = function () {
        goog$dom$classes$addRemove(this.onepickEl_, "sb-off", "sb-on");
    };
    yt$www$sandbar$Sandbar.prototype.hideOnepick_ = function () {
        goog$dom$classes$addRemove(this.onepickEl_, "sb-on", "sb-off");
    };
    yt$www$sandbar$Sandbar.prototype.updatePosition_ = function () {
        var topPx = Math.max((goog$dom$getViewportSize_(window).height - this.onepickSize_.height) / 2, 0);
        var onepick = this.onepickEl_;
        if (goog$isString("top")) {
            goog$style$setStyle_(onepick, topPx + "px", "top");
        } else {
            goog$object$forEach("top", goog$partial(goog$style$setStyle_, onepick));
        }
    };
    yt$www$sandbar$Sandbar.prototype.updateActivity_ = function () {
        if (yt$www$watch$activity$getTimeSinceActive() > 600000) {
            yt$www$notifications$NotificationsWidget$setActive_(this.frame_, false);
        } else {
            yt$www$notifications$NotificationsWidget$setActive_(this.frame_, true);
        }
    };
    var yt$www$picker$hideAllExcept_ = function (visibleId) {
        for (var picker = goog$dom$getFirstElementChild(goog$dom$getElement("picker-container")); picker;) {
            if (visibleId && visibleId != picker.id) {
                yt$style$hide(picker);
            }
            picker =
                picker.nextElementSibling != undefined
                    ? picker.nextElementSibling
                    : goog$dom$getNextElementNode_(picker.nextSibling);
        }
    };
    var yt$www$subscriptions$sendRequest_;
    var yt$www$subscriptions$sessionToken_;
    var yt$www$subscriptions$Request = function (onSuccess, onError) {
        this.doneCallback_ = onSuccess;
        this.errorCallback_ = onError;
        this.userData = {};
    };
    yt$www$subscriptions$Request.prototype.getPostData = function () {
        return {};
    };
    yt$www$subscriptions$Request.prototype.handleSuccess = function (response) {
        this.doneCallback_(this, response);
    };
    yt$www$subscriptions$Request.prototype.handleError = function (response) {
        this.errorCallback_(this, response);
    };
    var yt$www$subscriptions$SubscriptionRequest = function (onSuccess, onError) {
        yt$www$subscriptions$Request.call(this, onSuccess, onError);
    };
    goog$inherits(yt$www$subscriptions$SubscriptionRequest, yt$www$subscriptions$Request);
    yt$www$subscriptions$SubscriptionRequest.prototype.url_ = "/subscription_ajax";
    yt$www$subscriptions$SubscriptionRequest.prototype.postData_ = {};
    var yt$www$subscriptions$SubscriptionRequest$addUrlParams_ = function (request, params) {
        request.url_ = yt$uri$appendQueryData(request.url_, params);
    };
    yt$www$subscriptions$SubscriptionRequest.prototype.getPostData = function () {
        return this.postData_;
    };
    yt$www$subscriptions$SubscriptionRequest.prototype.handleSuccess = function (xhr) {
        var json = null;
        var errors = [yt$getMsg("SUBSCRIBE_SERVER_ERROR")];
        try {
            json = goog$json$parse(xhr.responseText);
        } catch (d) {}
        if ((xhr = json && json.response)) {
            this.doneCallback_(this, xhr);
        } else {
            this.errorCallback_(this, errors);
        }
    };
    yt$www$subscriptions$SubscriptionRequest.prototype.handleError = function (xhr, message) {
        var errors = message ? [message] : [yt$getMsg("SUBSCRIBE_SERVER_ERROR")];
        try {
            var json = goog$json$parse(xhr.responseText);
        } catch (e) {
            this.errorCallback_(this, errors);
            return;
        }
        this.errorCallback_(this, json.errors);
    };
    var yt$www$subscriptions$init_ = function (sessionToken) {
        yt$www$subscriptions$sendRequest_ = yt$net$ajax$sendRequest;
        yt$www$subscriptions$sessionToken_ = sessionToken;
    };
    var yt$www$subscriptions$pendingRequest_ = null;
    var yt$www$subscriptions$queue_ = [];
    var yt$www$subscriptions$enqueue_ = function (request) {
        yt$www$subscriptions$queue_.push(request);
        if (!yt$www$subscriptions$pendingRequest_) {
            yt$www$subscriptions$sendNext_();
        }
    };
    var yt$www$subscriptions$sendNext_ = function () {
        if (yt$www$subscriptions$queue_.length && !yt$www$subscriptions$pendingRequest_) {
            var request = yt$www$subscriptions$queue_.shift();
            if (request) {
                var postData = request.getPostData();
                if (!postData) {
                    postData = {};
                }
                postData.session_token = yt$www$subscriptions$sessionToken_;
                try {
                    var options = {
                        method: "POST",
                        postBody: yt$uri$buildQueryData(postData),
                        onComplete: yt$www$subscriptions$onComplete_,
                        onException: yt$www$subscriptions$onError_,
                        onError: yt$www$subscriptions$onError_
                    };
                } catch (d) {
                    request.handleError({}, yt$getMsg("SUBSCRIBE_JS_ERROR"));
                    return;
                }
                yt$www$subscriptions$pendingRequest_ = request;
                yt$www$subscriptions$sendRequest_(request.url_, options);
            }
        }
    };
    var yt$www$subscriptions$onComplete_ = function (xhr) {
        var request = yt$www$subscriptions$pendingRequest_;
        yt$www$subscriptions$pendingRequest_ = null;
        yt$www$subscriptions$sendNext_();
        if (request) {
            request.handleSuccess(xhr);
        }
    };
    var yt$www$subscriptions$onError_ = function (xhr) {
        var request = yt$www$subscriptions$pendingRequest_;
        yt$www$subscriptions$pendingRequest_ = null;
        yt$www$subscriptions$sendNext_();
        if (request) {
            request.handleError(xhr);
        }
    };
    var yt$www$subscriptions$button$toggleMenu = function (button) {
        var container = yt$www$subscriptions$button$getContainer_(button);
        if (yt$dom$datasets$get(container, "subscription-menu-type") == "button") {
            container = yt$uix$Button.getInstance();
            container = yt$uix$Button$getMenu_(container, button);
            if (goog$dom$getElementByClass("subscription-menu-loader", container)) {
                button.loader = container.innerHTML;
            }
            yt$www$subscriptions$button$loadMenu_(button);
        } else {
            container = yt$www$subscriptions$button$getContainer_(button);
            container = goog$dom$getElement(yt$dom$datasets$get(container, "subscription-expandable-id"));
            if (yt$style$isDisplayed(container)) {
                yt$style$hide(container);
                goog$dom$classes$add(button, "yt-uix-expander-collapsed");
            } else {
                yt$www$subscriptions$button$loadMenu_(button);
                yt$style$show(container);
                goog$dom$classes$remove(button, "yt-uix-expander-collapsed");
            }
        }
    };
    var yt$www$subscriptions$button$loadMenu_ = function (button) {
        if (!yt$dom$datasets$get(button, "loaded")) {
            var container = yt$www$subscriptions$button$getContainer_(button);
            var type = yt$dom$datasets$get(container, "subscription-type");
            var xsrfToken = yt$dom$datasets$get(container, "subscription-xsrf") || "";
            var menuType = yt$dom$datasets$get(container, "subscription-menu-type");
            var params = {};
            var value = yt$dom$datasets$get(container, "subscription-value");
            if (type == "playlist") {
                params.action_get_subscription_form_for_playlist = 1;
                type = "p";
            } else if (type == "blog") {
                params.action_get_subscription_form_for_blog = 1;
                type = "b";
            } else if (type == "topic") {
                params.action_get_subscription_form_for_topic = 1;
                type = "l";
            } else {
                params.action_get_subscription_form_for_user = 1;
                type = "u";
            }
            yt$www$subscriptions$init_(xsrfToken);
            xsrfToken = new yt$www$subscriptions$SubscriptionRequest(
                yt$www$subscriptions$button$onMenuLoaded_,
                function () {
                    yt$www$subscriptions$button$updateState_(container, true);
                }
            );
            yt$www$subscriptions$SubscriptionRequest$addUrlParams_(xsrfToken, params);
            params = {};
            params[type] = value;
            params.menu_type = menuType;
            xsrfToken.postData_ = params || {};
            xsrfToken.userData.eventTrigger = button;
            xsrfToken.userData.subscription = container;
            yt$www$subscriptions$enqueue_(xsrfToken);
        }
    };
    var yt$www$subscriptions$button$getContainer_ = function (element) {
        return goog$dom$getAncestorByTagNameAndClass(element, null, "subscription-container");
    };
    var yt$www$subscriptions$button$getContainerFromMenu_ = function (element) {
        var container = goog$dom$getAncestorByTagNameAndClass(element, null, "subscription-menu-expandable");
        if (container) {
            return container.expandableMenuSubscription;
        }
        element = goog$dom$getAncestorByTagNameAndClass(element, null, "yt-uix-button-menu");
        container = yt$uix$Button.getInstance();
        element = yt$uix$Button$getMenuButton_(container, element);
        return yt$www$subscriptions$button$getContainer_(element);
    };
    var yt$www$subscriptions$button$getMatchingContainers_ = function (container) {
        var all = goog$dom$getElementsByClass("subscription-container");
        var type = yt$dom$datasets$get(container, "subscription-type");
        var value = yt$dom$datasets$get(container, "subscription-value");
        return (all = goog$array$filter(all, function (other) {
            if (
                yt$dom$datasets$get(other, "subscription-type") == type &&
                yt$dom$datasets$get(other, "subscription-value") == value
            ) {
                return true;
            }
        }));
    };
    var yt$www$subscriptions$button$updateState_ = function (container, unsubscribed) {
        var subscriptionId = yt$dom$datasets$get(container, "subscription-id");
        var containers = yt$www$subscriptions$button$getMatchingContainers_(container);
        goog$array$forEach(containers, function (other) {
            if (unsubscribed) {
                if (yt$dom$datasets$get(other, "subscription-menu-type") == "button") {
                    yt$www$subscriptions$button$resetButtonMenu_(other);
                } else {
                    yt$www$subscriptions$button$resetExpandableMenu_(other, true);
                }
                var subscribedEl = yt$dom$getFirstElementByTagNameAndClass(
                    null,
                    "subscription-subscribed-container",
                    other
                );
                var subscribeButton = yt$dom$getFirstElementByTagNameAndClass(null, "subscribe-button", other);
                var optionsButton = yt$dom$getFirstElementByTagNameAndClass(null, "subscription-options-button", other);
                yt$dom$datasets$remove(other, "subscription-id");
                yt$style$hide(subscribedEl);
                yt$style$show(subscribeButton);
                yt$dom$datasets$remove(optionsButton, "loaded");
            } else {
                subscribedEl = yt$dom$getFirstElementByTagNameAndClass(
                    null,
                    "subscription-subscribed-container",
                    other
                );
                subscribeButton = yt$dom$getFirstElementByTagNameAndClass(null, "subscribe-button", other);
                yt$dom$datasets$set(other, "subscription-id", subscriptionId);
                yt$style$hide(subscribeButton);
                yt$style$show(subscribedEl);
            }
        });
    };
    var yt$www$subscriptions$button$setMenuContent_ = function (container, html) {
        if (yt$dom$datasets$get(container, "subscription-menu-type") == "button") {
            var button = goog$dom$getElementByClass("subscription-options-button", container);
            var buttonWidget = yt$uix$Button.getInstance();
            var menu = yt$uix$Button$getMenu_(buttonWidget, button);
            if (menu) {
                menu.innerHTML = html;
                yt$uix$Button$positionMenu_(buttonWidget, button, menu);
            }
        } else {
            button = goog$dom$getElement(yt$dom$datasets$get(container, "subscription-expandable-id"));
            buttonWidget = goog$dom$getElementByClass("subscription-menu-loader", button);
            menu = goog$dom$getElementByClass("subscription-menu-body", button);
            menu.innerHTML = html;
            button.expandableMenuSubscription = container;
            yt$style$hide(buttonWidget);
            yt$style$show(menu);
        }
    };
    var yt$www$subscriptions$button$resetButtonMenu_ = function (container) {
        var container = goog$dom$getElementByClass("subscription-options-button", container);
        var buttonWidget = yt$uix$Button.getInstance();
        yt$uix$Button$getMenu_(buttonWidget, container);
        yt$uix$Button$hideMenu_(buttonWidget, container);
        if (container.loader) {
            var loaderHtml = container.loader;
            var menu = yt$uix$Button$getMenu_(buttonWidget, container);
            if (menu) {
                menu.innerHTML = loaderHtml;
                yt$uix$Button$positionMenu_(buttonWidget, container, menu);
            }
        }
        yt$dom$datasets$remove(container, "loaded");
    };
    var yt$www$subscriptions$button$resetExpandableMenu_ = function (container, reset) {
        var expander = yt$uix$Expander.getInstance();
        var expanderEl = goog$dom$getElementByClass("yt-uix-expander", container);
        var menu = goog$dom$getElement(yt$dom$datasets$get(container, "subscription-expandable-id"));
        if (reset) {
            var loader = goog$dom$getElementByClass("subscription-menu-loader", menu);
            var body = goog$dom$getElementByClass("subscription-menu-body", menu);
            yt$dom$datasets$remove(expanderEl, "loaded");
            yt$style$show(loader);
            yt$style$hide(body);
            body.innerHTML = "";
        }
        if (yt$style$isDisplayed(menu)) {
            expander.collapse(expanderEl);
        }
    };
    var yt$www$subscriptions$button$onSubscribed_ = function (request, response) {
        var container = request.userData.subscription;
        var html = response.html_content;
        request.userData.eventTrigger.disabled = false;
        yt$dom$datasets$set(container, "subscription-id", response.id);
        yt$www$subscriptions$button$updateState_(container, false);
        if (html) {
            yt$www$subscriptions$button$setMenuContent_(container, html);
            html = goog$dom$getElementByClass("subscription-options-button", container);
            yt$dom$datasets$set(html, "loaded", "true");
            yt$www$subscriptions$button$toggleMenu(html);
            if (yt$dom$datasets$get(container, "subscription-menu-type") == "button") {
                yt$uix$Button.getInstance().showMenu(html);
            }
        }
    };
    var yt$www$subscriptions$button$removeCollection_ = function (request) {
        goog$dom$removeNode(request.userData.collection);
    };
    var yt$www$subscriptions$button$onUnsubscribed_ = function (request) {
        yt$www$subscriptions$button$updateState_(request.userData.subscription, true);
    };
    var yt$www$subscriptions$button$onMenuLoaded_ = function (request, response) {
        var trigger = request.userData.eventTrigger;
        var container = request.userData.subscription;
        var html = response.html_content;
        yt$dom$datasets$set(container, "subscription-id", response.id);
        yt$www$subscriptions$button$setMenuContent_(container, html);
        yt$dom$datasets$set(trigger, "loaded", "true");
    };
    var yt$www$subscriptions$button$onUnsubscribeSuccess_ = function (request) {
        var container = request.userData.subscription;
        request.userData.eventTrigger.disabled = false;
        request = yt$www$subscriptions$button$getMatchingContainers_(container);
        goog$array$forEach(request, function (other) {
            if (yt$dom$datasets$get(other, "subscription-menu-type") == "button") {
                yt$www$subscriptions$button$resetButtonMenu_(other);
            } else {
                yt$www$subscriptions$button$resetExpandableMenu_(other, true);
            }
        });
    };
    var yt$www$subscriptions$button$onRequestFailed_ = function (request) {
        if ((request = request.userData.eventTrigger)) {
            request.disabled = false;
        }
    };
    var yt$www$subscriptions$SubscriptionButton = function (button, toggleCallback) {
        this.buttonEl_ = button;
        this.toggleCallback_ = toggleCallback || null;
        this.subscriptionType_ = yt$dom$datasets$get(button, "subscription-type") || "user";
        this.value_ = yt$dom$datasets$get(button, "subscription-value") || "";
        this.tooltipEnabled_ = !!yt$dom$datasets$get(button, "enable-tooltip");
        this.hovercardEnabled_ = !!yt$dom$datasets$get(button, "enable-hovercard");
        this.pending_ = false;
        this.bindEvents_();
    };
    yt$www$subscriptions$SubscriptionButton.prototype.getId = function () {
        return yt$dom$datasets$get(this.buttonEl_, "subscription-id") || null;
    };
    var yt$www$subscriptions$SubscriptionButton$setId_ = function (button, subscriptionId) {
        if (subscriptionId) {
            yt$dom$datasets$set(button.buttonEl_, "subscription-id", subscriptionId);
        } else {
            yt$dom$datasets$remove(button.buttonEl_, "subscription-id");
        }
        yt$www$subscriptions$SubscriptionButton$updateUi_(button);
    };
    yt$www$subscriptions$SubscriptionButton.prototype.getValue = function () {
        return this.value_;
    };
    yt$www$subscriptions$SubscriptionButton.prototype.getType = function () {
        return this.subscriptionType_;
    };
    var yt$www$subscriptions$SubscriptionButton$updateUi_ = function (button) {
        goog$dom$classes$enable(button.buttonEl_, "subscribed", !!button.getId());
        var value = yt$uix$BaseWidget$getCssClass(yt$uix$Hovercard.getInstance(), "target");
        goog$dom$classes$enable(button.buttonEl_, value, !!button.getId() && button.hovercardEnabled_);
        if (button.tooltipEnabled_) {
            value = (button.getId() ? "un" : "") + "subscribe-tooltip";
            value = yt$dom$datasets$get(button.buttonEl_, value) || "";
            yt$uix$Tooltip$setTooltipText_(yt$uix$Tooltip.getInstance(), button.buttonEl_, value);
        }
    };
    yt$www$subscriptions$SubscriptionButton.prototype.bindEvents_ = function () {
        yt$events$listen(this.buttonEl_, "click", goog$bind(this.handleButtonClick_, this));
        yt$pubsub$subscribe("SUBSCRIBE", this.handleSubscriptionChange_, this);
        yt$pubsub$subscribe("UNSUBSCRIBE", this.handleSubscriptionChange_, this);
        if (this.hovercardEnabled_) {
            yt$events$listen(this.buttonEl_, "mouseover", goog$bind(this.handleButtonMouseOver_, this));
        }
        yt$www$subscriptions$SubscriptionButton$updateUi_(this);
    };
    yt$www$subscriptions$SubscriptionButton.prototype.handleSubscriptionChange_ = function (
        value,
        type,
        subscriptionId,
        source
    ) {
        if (subscriptionId != this.getId() && this.getValue() == value && this.getType() == type) {
            yt$www$subscriptions$SubscriptionButton$setId_(this, subscriptionId);
        }
        if (source != this.buttonEl_ && this.hovercardEnabled_) {
            yt$uix$Hovercard.getInstance().hide(this.buttonEl_);
        }
    };
    yt$www$subscriptions$SubscriptionButton.prototype.handleButtonClick_ = function () {
        if (this.pending_) {
            return false;
        }
        yt$uix$Tooltip$hideTip_(yt$uix$Tooltip.getInstance(), this.buttonEl_);
        if (this.getId()) {
            yt$www$subscriptions$SubscriptionButton$unsubscribe_(this);
        } else {
            yt$www$subscriptions$SubscriptionButton$subscribe_(this);
        }
    };
    yt$www$subscriptions$SubscriptionButton.prototype.handleButtonMouseOver_ = function () {
        if (this.getId()) {
            yt$setTimeout(
                goog$bind(function () {
                    yt$www$subscriptions$SubscriptionButton$loadHovercard_(this);
                }, this),
                350
            );
        }
    };
    var yt$www$subscriptions$SubscriptionButton$loadHovercard_ = function (button) {
        var hovercard = yt$uix$Hovercard.getInstance();
        if (!button.hovercardLoaded_ && yt$uix$Card$isActive(hovercard, button.buttonEl_)) {
            button.hovercardLoaded_ = true;
            var urlParams = {
                hovercard: 1
            };
            urlParams["action_get_subscription_form_for_" + button.subscriptionType_] = 1;
            var postParams = {
                session_token: yt$net$ajax$tokenMap_.subscription_ajax
            };
            postParams[yt$www$subscriptions$SubscriptionButton$getTypeParam_(button)] = button.value_;
            yt$net$ajax$send("/subscription_ajax", {
                method: "POST",
                urlParams: urlParams,
                postParams: postParams,
                context: button,
                onSuccess: function (xhr, response) {
                    var target = this.buttonEl_;
                    var html = response.response.html_content;
                    var root = yt$uix$BaseWidget$findWidgetElement_(hovercard, target);
                    if (root) {
                        var content = hovercard.getContentElement(root);
                        if (content) {
                            content.innerHTML = html;
                            if (goog$dom$classes$has(root, yt$uix$BaseWidget$getCssClass(hovercard, "active"))) {
                                html = yt$uix$Card$getCard_(hovercard, target, root);
                                yt$uix$Card$positionCard_(hovercard, target, html);
                            }
                        }
                    }
                    yt$www$subscriptions$SubscriptionButton$bindHovercardForm_(this);
                },
                onFail: function () {
                    this.hovercardLoaded_ = false;
                }
            });
        }
    };
    var yt$www$subscriptions$SubscriptionButton$bindHovercardForm_ = function (button) {
        var hovercard = yt$uix$Hovercard.getInstance();
        var root = yt$uix$BaseWidget$findWidgetElement_(hovercard, button.buttonEl_);
        var content = hovercard.getContentElement(root);
        goog$array$forEach(
            content.getElementsByTagName("input"),
            function (input) {
                yt$events$listen(
                    input,
                    "change",
                    goog$bind(function () {
                        var form = content.getElementsByTagName("form")[0];
                        var url = form.action || document.location.href;
                        var method = form.method.toUpperCase() || "GET";
                        var form = goog$dom$forms$getFormDataString(form);
                        yt$net$ajax$send_(url, undefined, method, form, undefined);
                    }, this)
                );
            },
            button
        );
    };
    var yt$www$subscriptions$SubscriptionButton$subscribe_ = function (button) {
        if (yt$getConfig("LOGGED_IN")) {
            var typeParam = yt$www$subscriptions$SubscriptionButton$getTypeParam_(button);
            var urlParams = {};
            urlParams["action_create_subscription_to_" + button.subscriptionType_] = 1;
            var postParams = yt$dom$datasets$get(button.buttonEl_, "subscription-feature");
            if (postParams) {
                urlParams.feature = postParams;
            }
            postParams = {
                session_token: yt$net$ajax$tokenMap_.subscription_ajax
            };
            postParams[typeParam] = button.value_;
            button.pending_ = true;
            button.buttonEl_.disabled = true;
            yt$net$ajax$send("/subscription_ajax", {
                method: "POST",
                context: button,
                urlParams: urlParams,
                postParams: postParams,
                onSuccess: function (xhr, response) {
                    yt$www$subscriptions$SubscriptionButton$setId_(this, response.response.id);
                    yt$pubsub$publish("SUBSCRIBE", this.getValue(), this.getType(), this.getId(), this.buttonEl_);
                    if (this.hovercardEnabled_) {
                        yt$uix$Hovercard.getInstance().show(this.buttonEl_);
                        yt$www$subscriptions$SubscriptionButton$loadHovercard_(this);
                    }
                    if (this.toggleCallback_) {
                        this.toggleCallback_(this.buttonEl_, true);
                    }
                },
                onFinish: function () {
                    this.pending_ = false;
                    this.buttonEl_.disabled = false;
                }
            });
            yt$tracking$conversion$ping("subscribe");
        }
    };
    var yt$www$subscriptions$SubscriptionButton$unsubscribe_ = function (button) {
        var postParams = {
            s: button.getId(),
            session_token: yt$net$ajax$tokenMap_.subscription_ajax
        };
        var urlParams = {
            action_remove_subscriptions: 1
        };
        var feature = yt$dom$datasets$get(button.buttonEl_, "subscription-feature");
        if (feature) {
            urlParams.feature = feature;
        }
        button.pending_ = true;
        button.buttonEl_.disabled = true;
        yt$net$ajax$send("/subscription_ajax", {
            method: "POST",
            context: button,
            urlParams: urlParams,
            postParams: postParams,
            onSuccess: function () {
                yt$www$subscriptions$SubscriptionButton$setId_(this, null);
                yt$pubsub$publish("UNSUBSCRIBE", this.getValue(), this.getType(), null, null);
                if (this.toggleCallback_) {
                    this.toggleCallback_(this.buttonEl_, false);
                }
            },
            onFinish: function () {
                this.pending_ = false;
                this.buttonEl_.disabled = false;
            }
        });
        yt$tracking$conversion$ping("unsubscribe");
    };
    var yt$www$subscriptions$SubscriptionButton$getTypeParam_ = function (button) {
        if (button.subscriptionType_ == "playlist") {
            return "p";
        } else if (button.subscriptionType_ == "blog") {
            return "b";
        } else if (button.subscriptionType_ == "topic") {
            return "l";
        } else {
            return "u";
        }
    };
    var goog$storage$mechanism$Mechanism = function () {};
    var goog$storage$mechanism$IterableMechanism = function () {};
    goog$inherits(goog$storage$mechanism$IterableMechanism, goog$storage$mechanism$Mechanism);
    goog$storage$mechanism$IterableMechanism.prototype.getCount = function () {
        var count = 0;
        goog$iter$forEach(this.__iterator__(true), function (key) {
            goog$asserts$assertString(key);
            count++;
        });
        return count;
    };
    goog$storage$mechanism$IterableMechanism.prototype.clear = function () {
        var keys = goog$iter$toArray(this.__iterator__(true));
        var self = this;
        goog$array$forEach(keys, function (key) {
            self.remove(key);
        });
    };
    var goog$storage$mechanism$HTML5WebStorage = function (storage) {
        this.storage_ = storage;
    };
    goog$inherits(goog$storage$mechanism$HTML5WebStorage, goog$storage$mechanism$IterableMechanism);
    goog$storage$mechanism$HTML5WebStorage.prototype.set = function (key, value) {
        try {
            this.storage_.setItem(key, value);
        } catch (c) {
            throw "Storage mechanism: Quota exceeded";
        }
    };
    goog$storage$mechanism$HTML5WebStorage.prototype.get = function (key) {
        key = this.storage_.getItem(key);
        if (goog$isString(key) || key === null) {
            return key;
        }
        throw "Storage mechanism: Invalid value was encountered";
    };
    goog$storage$mechanism$HTML5WebStorage.prototype.remove = function (key) {
        this.storage_.removeItem(key);
    };
    goog$storage$mechanism$HTML5WebStorage.prototype.getCount = function () {
        return this.storage_.length;
    };
    goog$storage$mechanism$HTML5WebStorage.prototype.__iterator__ = function (opt_keys) {
        var b = 0;
        var c = new goog$iter$Iterator();
        var d = this;
        c.next = function () {
            if (b >= d.getCount()) {
                throw goog$iter$StopIteration;
            }
            var key = goog$asserts$assertString(d.storage_.key(b++));
            if (opt_keys) {
                return key;
            }
            key = d.storage_.getItem(key);
            if (goog$isString(key)) {
                return key;
            }
            throw "Storage mechanism: Invalid value was encountered";
        };
        return c;
    };
    goog$storage$mechanism$HTML5WebStorage.prototype.clear = function () {
        this.storage_.clear();
    };
    var goog$storage$mechanism$HTML5LocalStorage = function () {
        var storage = null;
        try {
            storage = window.localStorage || null;
        } catch (b) {}
        this.storage_ = storage;
    };
    goog$inherits(goog$storage$mechanism$HTML5LocalStorage, goog$storage$mechanism$HTML5WebStorage);
    var goog$storage$Storage = function (mechanism) {
        this.mechanism = mechanism;
        this.serializer_ = new goog$json$Serializer();
    };
    goog$storage$Storage.prototype.mechanism = null;
    goog$storage$Storage.prototype.serializer_ = null;
    goog$storage$Storage.prototype.set = function (key, value) {
        if (goog$isDef(value)) {
            this.mechanism.set(key, goog$json$Serializer$serialize(this.serializer_, value));
        } else {
            this.mechanism.remove(key);
        }
    };
    goog$storage$Storage.prototype.get = function (key) {
        key = this.mechanism.get(key);
        if (key !== null) {
            try {
                return goog$json$parse(key);
            } catch (b) {
                throw "Storage: Invalid value was encountered";
            }
        }
    };
    goog$storage$Storage.prototype.remove = function (key) {
        this.mechanism.remove(key);
    };
    var yt$player$LocalSettings = function () {
        var localStorage = new goog$storage$mechanism$HTML5LocalStorage();
        var available;
        if ((available = localStorage)) {
            a: {
                try {
                    available = !!localStorage.storage_ && !!localStorage.storage_.getItem;
                    break a;
                } catch (c) {}
                available = false;
            }
        }
        if (available) {
            this.settingsStorage_ = new goog$storage$Storage(localStorage);
        }
    };
    yt$player$LocalSettings.prototype.settingsStorage_ = null;
    yt$player$LocalSettings.prototype.getVolume = function () {
        var result = {
            volume: 100,
            muted: false,
            nonNormalized: 100
        };
        if (this.settingsStorage_) {
            var stored = {};
            try {
                stored = this.settingsStorage_.get("yt-player-volume") || {};
            } catch (c) {
                this.settingsStorage_.remove("yt-player-volume");
            }
            result.volume = isNaN(stored.volume) ? 100 : Math.min(Math.max(stored.volume, 0), 100);
            result.nonNormalized = isNaN(stored.nonNormalized) ? result.volume : stored.nonNormalized;
            result.muted = stored.muted == undefined ? false : stored.muted;
        }
        return result;
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
    var yt$www$watch$player$saveResumeTime_ = function (videoId, seconds) {
        var cookieName = yt$www$watch$player$getResumeCookieName_();
        if (cookieName) {
            var entries = yt$net$cookies$get(cookieName, "").split(",");
            var entries = goog$array$filter(entries, function (entry) {
                return entry.indexOf(videoId) != 0 && entry.length;
            });
            if (entries.length >= 4) {
                entries.shift();
            }
            entries.push(videoId + ":" + seconds);
            yt$net$cookies$set(cookieName, entries.join(","), 1814400);
        }
    };
    var yt$www$watch$player$clearResumeTime_ = function (videoId) {
        var cookieName = yt$www$watch$player$getResumeCookieName_();
        if (cookieName) {
            var entries = yt$net$cookies$get(cookieName, "").split(",");
            var entries = goog$array$filter(entries, function (entry) {
                return entry.indexOf(videoId) != 0;
            });
            if (entries.length == 0) {
                yt$net$cookies$remove(cookieName);
            } else {
                yt$net$cookies$set(cookieName, entries.join(","), 1814400);
            }
        }
    };
    var yt$www$watch$player$saveResumeOnUnload_ = function () {
        var player = yt$www$watch$getPlayerReference_();
        var duration = player.getDuration();
        var player = Math.floor(player.getCurrentTime());
        var videoId = yt$getConfig("VIDEO_ID");
        if (player <= 120 || player + 120 >= duration) {
            yt$www$watch$player$clearResumeTime_(videoId);
        } else {
            yt$www$watch$player$saveResumeTime_(videoId, Math.floor(player));
        }
    };
    var yt$www$watch$player$waitForPlayerApi_ = function (player, delay) {
        if (yt$IS_JSCRIPT_ && !player.addEventListener) {
            var nextDelay = delay ? delay * 2 : 50;
            yt$setTimeout(function () {
                yt$www$watch$player$waitForPlayerApi_(player, nextDelay);
            }, nextDelay);
        } else {
            if (delay) {
                yt$tracking$track("ael_delayed", "delay=" + delay, undefined);
            }
            yt$www$watch$player$onPlayerReady_(player);
            yt$www$watch$player$readyPubSub_.publish_("READY_STATE_TOPIC", player);
        }
    };
    var yt$www$watch$player$onPlayerReady_ = function (player) {
        player.addEventListener("onStateChange", yt$www$watch$player$onStateChange_);
        player.addEventListener("NEXT_CLICKED", yt$www$watch$player$onNextClicked_);
        player.addEventListener("SIZE_CLICKED", yt$www$watch$player$onSizeClicked_);
        player.addEventListener("onVolumeChange", yt$www$watch$player$onVolumeChange_);
        player.addEventListener("SHARE_CLICKED", yt$www$watch$player$onShareClicked_);
        if (yt$www$watch$player$getResumeCookieName_()) {
            yt$events$listen(window, "beforeunload", yt$www$watch$player$saveResumeOnUnload_);
        }
        if (yt$uri$getHashData(window.location.hash).q && yt$getConfig("WIDE_PLAYER_STYLES")) {
            yt$www$watch$watch5$enableWide(false);
        }
        var playerEl = goog$dom$getElement("watch-player");
        if (playerEl) {
            playerEl.style.background = "transparent";
        }
        yt$www$lists$registerNearEndEventsWithPlayer(player);
        yt$www$watch$player$localSettings_ = new yt$player$LocalSettings();
    };
    var yt$www$watch$player$onStateChange_ = function (state) {
        yt$www$watch$player$playerState_ = state;
        switch (state) {
            case 0:
                if (yt$www$lists$PlaylistBar$isAutoplayOn_(yt$www$lists$getPlaylistBar())) {
                    yt$www$lists$getPlaylistBar().next(false, "autoplay");
                }
        }
    };
    var yt$www$watch$player$onVolumeChange_ = function (volume) {
        var settings = yt$www$watch$player$localSettings_;
        if (settings.settingsStorage_) {
            var stored = {};
            stored.volume = isNaN(volume.volume)
                ? settings.getVolume().volume
                : Math.min(Math.max(volume.volume, 0), 100);
            stored.nonNormalized = volume.nonNormalized;
            stored.muted = volume.muted == undefined ? settings.getVolume().muted : volume.muted;
            try {
                settings.settingsStorage_.set("yt-player-volume", stored);
            } catch (d) {}
        }
    };
    var yt$www$watch$player$onNextClicked_ = function () {
        yt$www$lists$getPlaylistBar().next(true, undefined);
    };
    var yt$www$watch$player$onSizeClicked_ = function (wide) {
        if (yt$getConfig("FULLSCREEN_EXPAND")) {
            goog$dom$classes$enable(document.body, "fullscreen", wide);
        } else {
            if (wide) {
                yt$net$cookies$set("wide", "1");
            } else {
                yt$net$cookies$set("wide", "0");
            }
            yt$www$watch$watch5$enableWide(wide);
        }
    };
    var yt$www$watch$player$onShareClicked_ = function () {
        yt$www$watch$actions$share(goog$dom$getElement("watch-share"), true);
    };
    var yt$www$watch$player$seekTo = function (seconds, scroll) {
        var scrollToPlayer = scroll != null ? scroll : true;
        var player = yt$www$watch$getPlayerReference_();
        player.seekTo(seconds, true);
        if (scrollToPlayer) {
            if (goog$dom$getElement("watch-video-container")) {
                window.scroll(0, 0);
            } else {
                window.location.href = "#movie_player";
            }
        }
        player.playVideo();
    };
    var yt$www$watch$player$checkHash_ = function () {
        if (yt$www$watch$player$hashMonitorEnabled_) {
            var hash = window.location.hash;
            if (hash != yt$www$watch$player$lastHash_) {
                yt$www$watch$player$lastHash_ = hash;
                hash = yt$uri$getHashData(hash);
                if ("t" in hash && hash.t != yt$www$watch$player$lastHashData_.t) {
                    yt$www$watch$player$seekTo(yt$www$watch$player$parseTimeParam_(hash.t), false);
                }
                yt$www$watch$player$lastHashData_ = hash;
            }
        }
    };
    var yt$www$watch$player$parseTimeParam_ = function (time) {
        var seconds = 0;
        if (time.indexOf("h") != -1) {
            time = time.split("h");
            seconds = time[0] * 3600;
            time = time[1];
        }
        if (time.indexOf("m") != -1) {
            time = time.split("m");
            seconds = time[0] * 60 + seconds;
            time = time[1];
        }
        if (time.indexOf("s") != -1) {
            time = time.split("s");
            seconds = time[0] * 1 + seconds;
        } else {
            seconds = time * 1 + seconds;
        }
        return seconds;
    };
    var yt$www$watch$playerping$pending_ = false;
    var yt$www$watch$playerping$aplid_ = null;
    var yt$www$watch$playerping$abt_ = null;
    var yt$www$watch$playerping$waitTimer_ = null;
    var yt$www$watch$playerping$startTime_ = null;
    var yt$www$watch$playerping$subscribe_ = function (player) {
        player.addEventListener("onStateChange", yt$www$watch$playerping$onStateChange_);
        player.addEventListener("onError", yt$www$watch$playerping$onError_);
    };
    var yt$www$watch$playerping$ping_ = function (event) {
        var config = yt$www$watch$playerping$startTime_;
        var event = {
            event: event,
            aplid: yt$www$watch$playerping$aplid_,
            abt: yt$www$watch$playerping$abt_,
            evtm: Math.round(goog$now() - config)
        };
        if ((config = yt$getConfig("PLAYER_CONFIG")) && config.args && config.args.plid) {
            event.plid = config.args.plid;
        }
        if (config && config.args && config.args.video_id) {
            event.v = config.args.video_id;
        }
        yt$net$ping$send("/player_204?" + yt$uri$buildQueryData(event));
    };
    var yt$www$watch$playerping$onStateChange_ = function (state) {
        if (yt$www$watch$playerping$waitTimer_) {
            switch (state) {
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
        var editable = goog$dom$getElement("watch-video-annotation-editable");
        var content = goog$string$trim(goog$dom$getElement("watch-video-annotation-content").innerHTML);
        if (content) {
            goog$dom$classes$addRemove(editable, ["unannotated", "editing"], ["annotated", "not-editing"]);
        } else {
            goog$dom$classes$addRemove(editable, ["annotated", "not-editing"], ["unannotated", "editing"]);
        }
        goog$dom$getElement("watch-video-annotation-textarea").value = content;
    };
    var yt$www$watch$videoannotation$save_ = function (form) {
        if (!yt$dom$datasets$get(form, "saving")) {
            yt$dom$datasets$set(form, "saving", "true");
            var contentEl = goog$dom$getElement("watch-video-annotation-content");
            var textarea = goog$dom$getElement("watch-video-annotation-textarea");
            var text = goog$string$trim(textarea.value);
            var params = {};
            if (!text) {
                params.delete = 1;
            }
            yt$net$ajax$send(form.action, {
                format: "JSON",
                method: "POST",
                urlParams: params,
                requestBody: goog$dom$forms$getFormDataString(form),
                onSuccess: function () {
                    contentEl.innerHTML = goog$string$htmlEscape(text);
                },
                onFail: function () {
                    textarea.value = contentEl.innerHTML;
                },
                onFinish: function () {
                    yt$dom$datasets$remove(form, "saving");
                    yt$www$watch$videoannotation$updateDisplay_();
                }
            });
        }
    };
    var yt$www$watch$handleKeyPress_ = function (event) {
        var target = event.target;
        if (target.tagName != "INPUT" && target.tagName != "TEXTAREA" && target.tagName != "SELECT") {
            switch (event.keyCode) {
                case 110:
                    yt$www$lists$getPlaylistBar().next(true, "keys");
                    break;
                case 112:
                    event = yt$www$lists$getPlaylistBar();
                    if ((event = yt$www$lists$List$getPreviousVideoUrl(event.list_, "keys"))) {
                        yt$window$redirect(event);
                    }
                    break;
                case 106:
                    if ((event = yt$www$watch$getPlayerReference_())) {
                        target = event.getCurrentTime();
                        event.seekTo(target - 10);
                    }
                    break;
                case 108:
                    if ((event = yt$www$watch$getPlayerReference_())) {
                        target = event.getCurrentTime();
                        event.seekTo(target + 10);
                    }
                    break;
                case 107:
                    if ((event = yt$www$watch$getPlayerReference_())) {
                        if (yt$www$watch$player$playerState_ == 2) {
                            event.playVideo();
                        } else {
                            event.pauseVideo();
                        }
                    }
            }
        }
    };
    var yt$www$watch$survey$watchPageSurveyGoAway = function () {
        var prefs = yt$prefs$UserPrefs.getInstance();
        yt$prefs$UserPrefs$setFlag(yt$prefs$BitFlags.WATCH_PAGE_SURVEY_DISMISSED, true);
        prefs.save();
        yt$style$hide("watch_page_survey");
    };
    var userfeedback$startFeedback_ = function (config, productData, callback) {
        var serverUri = config.serverUri || "//www.google.com/tools/feedback";
        var startFeedback = goog$global.GOOGLE_FEEDBACK_START;
        if (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent)) {
            config.mobileWindow = window.open("");
        }
        goog$global.GOOGLE_FEEDBACK_START_ARGUMENTS = arguments;
        if (startFeedback) {
            startFeedback.apply(goog$global, arguments);
        } else {
            startFeedback = document.createElement("script");
            startFeedback.src = serverUri + "/load.js";
            document.body.appendChild(startFeedback);
        }
    };
    var userfeedback$flashInstalled_ = false;
    var userfeedback$flashVersion_ = "";
    var userfeedback$parseFlashVersion_ = function (description) {
        description = description.match(/[\d]+/g);
        description.length = 3;
        return description.join(".");
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
    var userfeedback$matchUserAgent_ = function (re) {
        if ((re = re.exec(goog$userAgent$getUserAgentString()))) {
            return re[1];
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
        var button = goog$dom$getElement("help-button");
        if (button) {
            var topicId = yt$dom$datasets$get(button, "iph-topic-id");
            var locale = yt$getConfig("LOCALE");
            var title = yt$dom$datasets$get(button, "iph-title-text");
            var searchButtonText = yt$dom$datasets$get(button, "iph-search-button-text");
            var anchorText = yt$dom$datasets$get(button, "iph-anchor-text");
            var jsUrl = document.location.protocol + yt$dom$datasets$get(button, "iph-js-url");
            var cssUrl = document.location.protocol + yt$dom$datasets$get(button, "iph-css-url");
            if (jsUrl && cssUrl) {
                cssUrl = goog$dom$createDom("link", {
                    href: cssUrl,
                    rel: "stylesheet"
                });
                document.getElementsByTagName("head")[0].appendChild(cssUrl);
                yt$net$scriptloader$load(jsUrl, function () {
                    var init = goog$getObjectByName("yt.www.help.init");
                    var onButtonClick = goog$getObjectByName("yt.www.help.onButtonClick");
                    init(
                        topicId,
                        "http://www.google.com",
                        "/support/youtube",
                        locale,
                        title,
                        searchButtonText,
                        anchorText
                    );
                    yt$events$listen(button, "click", onButtonClick);
                    onButtonClick();
                });
            }
        }
    };
    var yt$www$framebuster$bust_ = function () {
        (function () {
            try {
                for (var win = this; win.parent != win;) {
                    if (win.frameElement.src == "$") {
                        throw "odd";
                    }
                    win = win.parent;
                }
                if (win.frameElement != null) {
                    throw "busted";
                }
            } catch (b) {
                document.write("--><plaintext style=display:none><!--");
                window.open("/", "_top");
                top.location = "/";
            }
        })();
    };
    var yt$www$framebuster$onCheckResponse_ = function (xhr) {
        if (xhr.responseText == "block") {
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
    var yt$www$logError = function (msg, script, lineNumber) {
        var coreScript = goog$dom$getElement("www-core-js");
        if (!yt$www$errorLogged_ && coreScript && coreScript.src.indexOf("/debug-") != -1) {
            lineNumber = yt$www$getErrorStack_(lineNumber);
            yt$tracking$track(
                "jserror",
                "error=" +
                    encodeURIComponent(msg) +
                    "&script=" +
                    encodeURIComponent(script) +
                    "&linenumber=" +
                    encodeURIComponent(lineNumber) +
                    "&url=" +
                    encodeURIComponent(window.location.href),
                undefined
            );
            yt$www$errorLogged_ = true;
        }
    };
    var yt$www$getErrorStack_ = function (lineNumber) {
        if (goog$userAgent$GECKO) {
            try {
                eval("(0)()");
            } catch (b) {
                return b.stack.replace(/(.*):/g, "").replace(/\n/g, ",");
            }
        } else {
            return lineNumber;
        }
    };
    var yt$www$xsrf$EXCLUDED_FORM_NAMES_ = [];
    var yt$www$ads$pyv$requestAfcAds_ = function (client, channel, keywords, callback) {
        window.google_ad_client = client;
        window.google_ad_channel = channel;
        window.google_max_num_ads = 1;
        window.google_ad_output = "js";
        window.google_ad_type = "text";
        window.google_only_pyv_ads = true;
        if (keywords) {
            window.google_kw = keywords;
            window.google_kw_type = "broad";
        }
        if (window.dclk_language) {
            window.google_language = window.dclk_language;
        }
        window.google_ad_request_done = callback;
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
    var yt$www$ads$pyv$renderPyvAd_ = function (adType, ad, container, onComplete, testMode) {
        var media = goog$array$find(ad.media_template_data, function (m) {
            return !!m.imageUrl;
        });
        if (media) {
            adType = {
                video_id: media.videoId,
                ad_type: adType,
                headline: goog$string$unescapeEntities(ad.line1),
                image_url: media.imageUrl,
                description1: goog$string$unescapeEntities(ad.line2),
                description2: goog$string$unescapeEntities(ad.line3),
                channel_title: media.channelName,
                test_mode: (!!testMode).toString(),
                destination_url: goog$string$unescapeEntities(ad.url)
            };
            yt$net$ajax$sendRequest("/pyv?" + yt$uri$buildQueryData(adType), {
                method: "GET",
                update: container,
                onComplete: onComplete
            });
        }
    };
    var yt$www$ads$pyv$showPpvOnWatch = function () {
        var container = goog$dom$getElement("ppv-container");
        if (container) {
            yt$style$show(container);
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
    var yt$www$ads$pyv$pyvHomeAfcCallback = function (ads) {
        var placeholder = goog$dom$getElement("pyv-placeholder");
        if (ads.length == 0 || !placeholder) {
            yt$www$ads$pyv$showPpvAdInYvaSpot();
        } else {
            yt$www$ads$pyv$renderPyvAd_("homepage", ads[0], placeholder, function () {
                yt$style$hide("ad_creative_2");
            });
        }
    };
    var yt$www$ads$pyv$pyvBrowseRequestAds = function () {
        if (yt$getConfig("PYV_IS_ALLOWED")) {
            var channel = "pyvOnBrowse";
            if (yt$getConfig("PYV_CATEGORY")) {
                channel += " pyvBrowse_" + yt$getConfig("PYV_CATEGORY");
            }
            yt$www$ads$pyv$requestAfcAds_("ca-youtube-browse", channel, "", yt$www$ads$pyv$pyvBrowseAfcCallback_);
        } else {
            yt$www$ads$pyv$showFallbackAd_();
        }
    };
    var yt$www$ads$pyv$pyvBrowseAfcCallback_ = function (ads) {
        var placeholder = goog$dom$getElement("pyv-placeholder");
        if (ads.length == 0 || !placeholder) {
            yt$www$ads$pyv$showFallbackAd_();
        } else {
            yt$www$ads$pyv$renderPyvAd_(
                yt$getConfig("PYV_NEW_BROWSE") ? "new_browse" : "browse",
                ads[0],
                placeholder,
                function () {
                    yt$style$hide("ad_creative_1");
                }
            );
        }
    };
    var yt$www$ads$addPositionParams_ = function (containerId, isPromoted) {
        var items = goog$dom$getElement(containerId);
        if (items) {
            items = goog$dom$getElementsByTagNameAndClass("li", "video-list-item", items);
            goog$array$forEach(items, function (item, position) {
                var links = goog$dom$getElementsByTagNameAndClass("a", null, item);
                goog$array$forEach(links, function (link) {
                    var href = link.getAttribute("href");
                    if (href && unescape(href).match(/\/watch(\?|#!)v=/)) {
                        link.href = isPromoted
                            ? link.href + ("&pvpos=" + position)
                            : link.href + ("&pvnpos=" + position);
                    }
                });
            });
        }
    };
    var yt$www$watch$ads$handleSetCompanion = function (adUrl) {
        adUrl = adUrl.replace(";dc_seed=", ";kmyd=watch-channel-brand-div;dc_seed=");
        yt$style$hide("instream_google_companion_ad_div");
        yt$style$hide("google_companion_ad_div");
        yt$style$show("ad300x250");
        yt$style$show("watch-channel-brand-div");
        var container = goog$dom$getElement("ad300x250");
        if (container !== null) {
            var random = Math.round(Math.random() * 10000);
            container.innerHTML = [
                '<iframe src="',
                adUrl,
                '" name="ifr_300x250ad',
                random,
                '" id="ifr_300x250ad',
                random,
                '" width="300" height="250" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"></iframe>'
            ].join("");
        }
        yt$www$watch$ads$notifyAdLoaded_();
    };
    var yt$www$watch$ads$handleSetCompanionForInstream = function (adUrl) {
        adUrl = adUrl.replace(";dc_seed=", ";kmyd=watch-longform-ad;dc_seed=");
        yt$style$hide("instream_google_companion_ad_div");
        yt$style$show("watch-longform-ad");
        yt$style$show("watch-longform-text");
        yt$style$show("watch-longform-ad-placeholder");
        var container = goog$dom$getElement("watch-longform-ad-placeholder");
        var random = Math.round(Math.random() * 10000);
        container.innerHTML = [
            '<iframe src="',
            adUrl,
            '" name="ifr_300x60ad',
            random,
            '" id="ifr_300x60ad',
            random,
            '" width="300" height="60" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"></iframe>'
        ].join("");
        yt$www$watch$ads$notifyAdLoaded_();
    };
    var yt$www$watch$ads$handleSetCompanionForLongform = function (html) {
        var container = goog$dom$getElement("watch-longform-ad-placeholder");
        if (html) {
            yt$style$hide("instream_google_companion_ad_div");
            yt$style$show("watch-longform-ad");
            yt$style$show("watch-longform-text");
            yt$style$show("watch-longform-ad-placeholder");
            container.innerHTML = html;
        } else {
            yt$style$hide("watch-longform-ad");
        }
        yt$www$watch$ads$notifyAdLoaded_();
    };
    var yt$www$watch$ads$handleSetCompanionForFreewheel = function (adType, encodedHtml) {
        var showId = "watch-channel-brand-div";
        var containerId = "ad300x250";
        var width = 300;
        var height = 250;
        if (adType == "video") {
            showId = "watch-longform-ad";
            containerId = "watch-longform-ad-placeholder";
            width = 300;
            height = 60;
            yt$style$hide("instream_google_companion_ad_div");
        }
        var html = decodeURIComponent(encodedHtml);
        goog$dom$getElement(containerId).innerHTML = [
            '<iframe name="fw_ad" id="fw_ad" ',
            'width="' + width + '" height="' + height + '" ',
            'marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"></iframe>'
        ].join("");
        var frameWin = goog$dom$getElement("fw_ad");
        var frameWin = frameWin.contentWindow
            ? frameWin.contentWindow
            : frameWin.contentDocument.document
              ? frameWin.contentDocument.document
              : frameWin.contentDocument;
        var width = navigator.userAgent.toLowerCase();
        var containerId = width.indexOf("msie") != -1;
        var width = width.indexOf("opera") != -1;
        frameWin.document.open();
        frameWin.document.write(html);
        if (containerId || width) {
            yt$setTimeout(function () {
                frameWin.document.close();
            }, 7500);
        } else {
            frameWin.document.close();
        }
        yt$style$show(showId);
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
        var callback = goog$getObjectByName("yt.www.watch.ads.handleAdLoaded");
        if (callback) {
            callback.call();
        }
    };
    var yt$www$watch$ads$updatePopoutAds = function (slots) {
        yt$setConfig("POPOUT_AD_SLOTS", slots);
    };
    var yt$www$watch$ads$disablePopoutButton = function () {
        var button = goog$dom$getElement("watch-longform-popup");
        if (button) {
            button.disabled = true;
        }
    };
    var yt$www$watch$ads$enablePopoutButton = function (slots) {
        var button = goog$dom$getElement("watch-longform-popup");
        if (button) {
            button.disabled = false;
        }
        yt$www$watch$ads$updatePopoutAds(slots);
    };
    var yt$www$watch$ads$handleSetAfvCompanionVars = function (isInstream) {
        window.google_ad_output = "html";
        if (isInstream) {
            window.google_ad_height = "60";
            window.google_ad_format = "300x60_as";
            window.google_container_id = "instream_google_companion_ad_div";
        } else {
            window.google_ad_height = "250";
            window.google_ad_format = "300x250_as";
            window.google_container_id = "google_companion_ad_div";
        }
    };
    var yt$www$watch$ads$handleShowAfvCompanionAdDiv = function (isInstream) {
        if (isInstream) {
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
    goog$exportSymbol("yt.www.watch.ads.showForcedMpu", function (adUrl) {
        goog$dom$getElement("ad300x250").innerHTML = [
            '<iframe src="',
            adUrl,
            '" name="ifr_300x250ad" id="ifr_300x250ad" width="300" height="250" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"></iframe>'
        ].join("");
        yt$style$show("ad300x250");
    });
    goog$exportSymbol("yt.www.watch.ads.handleMoveGutCompanion", function (isInstream) {
        var isInstream = isInstream
            ? goog$dom$getElement("instream_google_companion_ad_div")
            : goog$dom$getElement("google_companion_ad_div");
        var gutContent = goog$dom$getElement("yt-gut-content");
        if (gutContent) {
            gutContent.innerHTML = "";
        } else {
            gutContent = document.createElement("div");
            gutContent.id = "yt-gut-content";
        }
        if (isInstream) {
            isInstream.innerHTML = "";
            isInstream.appendChild(gutContent);
        }
        yt$www$watch$ads$notifyAdLoaded_();
    });
    goog$exportSymbol("yt.www.watch.ads.setGutSlotSizes", function (instream, invideo) {
        var sizes = yt$getConfig("gut_slot");
        if (sizes) {
            sizes = sizes.getSizes();
            goog$array$clear(sizes);
            if (invideo) {
                sizes.push(yt$getConfig("yt_gut_invideo_size"));
            }
            if (instream) {
                sizes.push(yt$getConfig("yt_gut_instream_size"));
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
    goog$exportSymbol("yt.www.ads.pyv.pyvWatchAfcCallback", function (ads) {
        if (ads.length == 0) {
            yt$www$ads$pyv$showPpvOnWatch();
            if (yt$getConfig("PYV_TRACK_RELATED_CTR")) {
                yt$www$ads$addPositionParams_("watch-related-grid", false);
                yt$www$ads$addPositionParams_("watch-related", false);
                yt$www$ads$addPositionParams_("watch-channel-videos-panel", false);
            }
        } else {
            var container = goog$dom$getElement("watch-channel-videos-panel");
            if (container && !yt$getConfig("IS_BRANDED_WATCH")) {
                goog$dom$classes$add(container, "yt-uix-expander-collapsed");
            }
            yt$www$ads$pyv$renderPyvAd_(
                "watch_related",
                ads[0],
                null,
                function (xhr) {
                    var xhr = yt$net$ajax$getNodeValue(yt$net$ajax$getRootNode(xhr.responseXML), "html_content") || "";
                    var related = goog$dom$getElement(window.pyv_related_box_id || "watch-related");
                    if (related && related.innerHTML.indexOf(xhr) != 0) {
                        related.insertBefore(goog$dom$htmlToDocumentFragment(xhr), related.firstChild);
                        if (yt$getConfig("PYV_TRACK_RELATED_CTR")) {
                            yt$www$ads$addPositionParams_("watch-related", true);
                            yt$www$ads$addPositionParams_("watch-channel-videos-panel", true);
                        }
                    }
                    if ((related = goog$dom$getElement("watch-related-grid")) && related.innerHTML.indexOf(xhr) != 0) {
                        related.insertBefore(goog$dom$htmlToDocumentFragment(xhr), related.firstChild);
                        if (yt$getConfig("PYV_TRACK_RELATED_CTR")) {
                            yt$www$ads$addPositionParams_("watch-related-grid", true);
                        }
                    }
                },
                window.google_adtest && window.google_adtest == "on"
            );
        }
    });
    goog$exportSymbol("yt.www.ads.pyv.pyvSearchAfcCallback", function (ads) {
        var container = goog$dom$getElement("pyv-ads");
        if (ads.length != 0 && container) {
            goog$array$forEach(ads, function (ad) {
                var media = ad.media_template_data[0];
                ad.line1 = goog$string$unescapeEntities(ad.line1);
                ad.line2 = goog$string$unescapeEntities(ad.line2);
                ad.line3 = goog$string$unescapeEntities(ad.line3);
                ad.url = goog$string$unescapeEntities(ad.url);
                media.imageUrl = goog$string$unescapeEntities(media.imageUrl);
                media.channelName = goog$string$unescapeEntities(media.channelName);
            });
            ads = {
                pyv_ads: goog$json$Serializer$serialize(new goog$json$Serializer(undefined), ads),
                ad_type: "search"
            };
            yt$net$ajax$sendRequest("/pyv", {
                method: "POST",
                postBody: yt$uri$buildQueryData(ads),
                update: container
            });
        }
    });
    goog$exportSymbol("yt.www.ads.pyv.pyvHomeAfcCallback", yt$www$ads$pyv$pyvHomeAfcCallback);
    goog$exportSymbol("yt.www.ads.pyv.showPpvAdInYvaSpot", yt$www$ads$pyv$showPpvAdInYvaSpot);
    goog$exportSymbol("yt.www.ads.pyv.pyvHomeRequestAds", yt$www$ads$pyv$pyvHomeRequestAds);
    goog$exportSymbol("yt.www.ads.pyv.pyvBrowseRequestAds", yt$www$ads$pyv$pyvBrowseRequestAds);
    goog$exportSymbol("yt.www.ads.pyv.showPpvOnWatch", yt$www$ads$pyv$showPpvOnWatch);
    goog$exportSymbol("yt.www.ads.pyv.loadPyvIframe", function (headHtml) {
        var body = window.location.href;
        if (body.indexOf("#") == body.length - 1 && goog$userAgent$WEBKIT) {
            window.location.hash = "#!";
        }
        var body = document.body;
        var domHelper = goog$dom$getDomHelper(body);
        var html = [];
        html.push("<!DOCTYPE html>");
        html.push("<html><head>", headHtml, "</head><body>", undefined, "</body></html>");
        headHtml = domHelper.createDom("iframe", {
            frameborder: 0,
            style: "border:0;vertical-align:bottom;",
            src: 'javascript:""'
        });
        body.appendChild(headHtml);
        body = html.join("");
        headHtml = headHtml.contentDocument || headHtml.contentWindow.document;
        headHtml.open();
        headHtml.write(body);
        headHtml.close();
    });
    goog$exportSymbol("yt.www.ads.pyv.loadPyvAfsScript", function (query) {
        yt$net$scriptloader$load("/pyv_afs_ads?query=" + query);
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
    goog$exportSymbol("goog.dom.getElementsByTagNameAndClass", function (tagName, className, root) {
        return goog$dom$getElementsByTagNameAndClass(tagName, className, root);
    });
    goog$exportSymbol("goog.dom.getFirstElementChild", goog$dom$getFirstElementChild);
    goog$exportSymbol("goog.array.forEach", goog$array$forEach);
    goog$exportSymbol("goog.array.indexOf", goog$array$indexOf);
    goog$exportSymbol("goog.array.contains", goog$array$contains);
    goog$exportSymbol("yt.dom.hasAncestor", function (element, ancestor, maxSearchSteps) {
        element = goog$dom$getElement(element);
        ancestor = goog$dom$getElement(ancestor);
        return !!goog$dom$getAncestor(
            element,
            function (node) {
                return node === ancestor;
            },
            true,
            maxSearchSteps
        );
    });
    goog$exportSymbol("yt.setConfig", yt$setConfig);
    goog$exportSymbol("yt.getConfig", yt$getConfig);
    goog$exportSymbol("yt.registerGlobal", yt$registerGlobal);
    goog$exportSymbol("yt.setTimeout", yt$setTimeout);
    goog$exportSymbol("yt.setInterval", yt$setInterval);
    goog$exportSymbol("yt.clearTimeout", yt$clearTimeout);
    goog$exportSymbol("yt.clearInterval", yt$clearInterval);
    goog$exportSymbol("yt.setMsg", function (keyOrMap) {
        yt$setConfigValues_(yt$msgs_, arguments);
    });
    goog$exportSymbol("yt.getMsg", yt$getMsg);
    goog$exportSymbol("yt.events.listen", yt$events$listen);
    goog$exportSymbol("yt.events.unlisten", yt$events$unlisten);
    goog$exportSymbol("yt.events.stopPropagation", yt$events$stopPropagation);
    goog$exportSymbol("yt.events.preventDefault", yt$events$preventDefault);
    goog$exportSymbol("yt.events.getTarget", yt$events$getTarget);
    goog$exportSymbol("yt.events.clear", function () {
        for (var key in yt$events$listeners_) {
            yt$events$unlistenByKey(key);
        }
    });
    goog$exportSymbol("yt.events.Event", yt$events$Event);
    yt$events$Event.prototype.preventDefault = yt$events$Event.prototype.preventDefault;
    yt$events$Event.prototype.stopPropagation = yt$events$Event.prototype.stopPropagation;
    goog$exportSymbol("yt.pubsub.subscribe", yt$pubsub$subscribe);
    goog$exportSymbol("yt.pubsub.unsubscribeByKey", function (key) {
        var pubsub = goog$getObjectByName("yt.pubsub.instance_");
        if (pubsub) {
            return pubsub.unsubscribeByKey(key);
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
    goog$exportSymbol("yt.uix.FormInput.selectOnChangeActionIE", function (select) {
        yt$uix$FormInput.getInstance().handleSelectChange_(select);
    });
    yt$pubsub$subscribe("init", function () {
        var formInput = yt$uix$FormInput.getInstance();
        var selects = goog$dom$getElementsByClass(yt$uix$BaseWidget$getCssClass(formInput, "select-element"));
        goog$array$forEach(selects, function (select) {
            formInput.handleSelectChange_(select);
        });
    });
    goog$exportSymbol("goog.i18n.bidi.isRtlText", goog$i18n$bidi$isRtlText);
    goog$exportSymbol("goog.i18n.bidi.setDirAttribute", function (event, input) {
        var value = input.value;
        var dir = "";
        if (goog$i18n$bidi$isRtlText(value)) {
            dir = "rtl";
        } else if (!goog$i18n$bidi$isRtlText(value)) {
            dir = "ltr";
        }
        input.dir = dir;
    });
    goog$exportSymbol("yt.i18n.virtualkeyboard.toggle", function (layout, language) {
        if (layout) {
            yt$i18n$virtualkeyboard$layout_ = layout;
            yt$net$apiloader$load("GOOGLE_LANGUAGE_API_VIRTUAL_KEYBOARD", function () {
                if (yt$i18n$virtualkeyboard$keyboard_) {
                    var keyboard = yt$i18n$virtualkeyboard$keyboard_;
                    if (keyboard.isVisible()) {
                        keyboard.setVisible(false);
                    } else {
                        keyboard.setVisible(true);
                    }
                } else if (!yt$i18n$virtualkeyboard$loading_) {
                    yt$i18n$virtualkeyboard$loading_ = true;
                    yt$i18n$virtualkeyboard$language_ = language;
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
    goog$exportSymbol("yt.i18n.inputtools.loadInputTools", function (inputTools, elements, language) {
        if (inputTools && elements) {
            yt$i18n$inputtools$inputTools_ = inputTools;
            yt$net$apiloader$load("GOOGLE_LANGUAGE_API_INPUT_TOOLS", function () {
                if (!yt$i18n$inputtools$controller_ && !yt$i18n$inputtools$loading_) {
                    yt$i18n$inputtools$loading_ = true;
                    yt$i18n$inputtools$elements_ = elements;
                    yt$i18n$inputtools$language_ = language;
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
        goog$object$forEach(yt$i18n$inputtools$elements_, function (value, elementId) {
            yt$i18n$inputtools$controller_.addPageElements([elementId]);
        });
        yt$i18n$inputtools$controller_.addInputTools(yt$i18n$inputtools$inputTools_);
        if (yt$i18n$inputtools$language_ && yt$i18n$inputtools$language_.indexOf("hi") != -1) {
            yt$i18n$inputtools$controller_.setCurrentInputTool("im_t13n_hi");
        }
        goog$object$forEach(yt$i18n$inputtools$elements_, function (elementId) {
            if (elementId) {
                yt$i18n$inputtools$controller_.showControl(elementId);
            }
        });
        var hasVirtualKeyboard = false;
        goog$array$forEach(yt$i18n$inputtools$inputTools_, function (tool) {
            if (tool.lastIndexOf("vdk", 0) == 0) {
                hasVirtualKeyboard = true;
            }
        });
        if (hasVirtualKeyboard) {
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
    goog$exportSymbol("yt.style.setVisible", function (element, visible) {
        if ((element = goog$dom$getElement(element))) {
            element.style.visibility = visible ? "visible" : "hidden";
        }
    });
    goog$exportSymbol("yt.net.ajax.sendRequest", yt$net$ajax$sendRequest);
    goog$exportSymbol("yt.net.ajax.getRootNode", yt$net$ajax$getRootNode);
    goog$exportSymbol("yt.net.ajax.getNodeValue", yt$net$ajax$getNodeValue);
    goog$exportSymbol("yt.net.ajax.setToken", yt$net$ajax$setToken);
    goog$exportSymbol("yt.net.delayed.register", yt$net$delayed$register);
    goog$exportSymbol("yt.net.delayed.load", yt$net$delayed$load);
    goog$exportSymbol("yt.net.delayed.markAsLoaded", function (groupKey) {
        if (groupKey in yt$net$delayed$registry_) {
            yt$net$delayed$loaded_[groupKey] = true;
        }
    });
    goog$exportSymbol("yt.net.scriptloader.load", yt$net$scriptloader$load);
    goog$exportSymbol("goog.dom.forms.getFormDataString", goog$dom$forms$getFormDataString);
    goog$exportSymbol("yt.uri.buildQueryData", yt$uri$buildQueryData);
    goog$exportSymbol("yt.uri.appendQueryData", yt$uri$appendQueryData);
    goog$exportSymbol("yt.www.feedback.start", function (locale, productData, productId, bucket) {
        try {
            var productId = (productId || "59") + "";
            var productData = productData || {};
            var sessionIndex = yt$getConfig("SESSION_INDEX");
            try {
                var player = yt$www$watch$getPlayerReference_();
                if (player) {
                    player.pauseVideo();
                }
                var flash = yt$flash$FlashDetector.getInstance();
                productData.flashVersion = [flash.major_, flash.minor_, flash.rev].join(".");
            } catch (j) {}
            locale = {
                productId: productId,
                locale: locale
            };
            if (sessionIndex) {
                locale.authuser = sessionIndex + "";
            }
            if (bucket) {
                locale.bucket = bucket;
            }
            userfeedback$startFeedback_(locale, productData);
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
    goog$exportSymbol("yt.player.update", function (container, config, force) {
        return yt$player$embed(container, config, {
            force: force
        });
    });
    goog$exportSymbol("yt.player.embed", yt$player$embed);
    goog$exportSymbol("yt.flash.embed", yt$flash$embed);
    goog$exportSymbol("onYouTubePlayerReady", function () {
        yt$www$watch$player$hashMonitorEnabled_ = true;
        var player = yt$www$watch$getPlayerReference_();
        if (player) {
            yt$www$watch$player$waitForPlayerApi_(player);
        }
    });
    goog$exportSymbol("yt.www.watch.activity.getTimeSinceActive", yt$www$watch$activity$getTimeSinceActive);
    goog$exportSymbol("yt.www.watch.activity.setTimestamp", yt$www$watch$activity$setTimestamp);
    goog$exportSymbol("yt.www.watch.player.handleEndPreview", function (offerId) {
        var player = yt$www$watch$getPlayerReference_();
        if (player && player.stopVideo) {
            player.stopVideo();
        }
        if ((player = goog$dom$getElement("watch-checkout-offers"))) {
            yt$pubsub$publish("checkout-init-purchase", offerId, player);
        }
    });
    goog$exportSymbol("yt.www.watch.player.openPopup", function (videoId, width, height) {
        var seconds = null;
        var player = yt$www$watch$getPlayerReference_();
        var videoId = "/watch_popup?v=" + videoId;
        if (player) {
            videoId += "&vq=" + player.getPlaybackQuality();
            seconds = Math.round(player.getCurrentTime());
            player.stopVideo();
        }
        if (yt$getConfig("POPOUT_AD_SLOTS")) {
            videoId += "&pop_ads=" + yt$getConfig("POPOUT_AD_SLOTS");
        }
        if (seconds && seconds > 10) {
            videoId += "#t=" + seconds;
        }
        yt$window$popup(videoId, {
            width: width,
            height: height,
            resizable: true,
            location: false,
            statusbar: false,
            menubar: false,
            scrollbars: false,
            toolbar: false
        });
    });
    goog$exportSymbol("yt.www.watch.activity.init", yt$www$watch$activity$init);
    goog$exportSymbol("yt.www.watch.player.updateConfig", function (args) {
        var args = args instanceof yt$player$Config ? args.args : args.args;
        var time;
        var hashData = yt$uri$getHashData(window.location.hash);
        if ((time = hashData.t || hashData.at)) {
            yt$www$watch$player$lastHashData_.t = hashData.t;
            yt$www$watch$player$lastHashData_.at = hashData.at;
            hashData = window.location.hash.replace(/\bat=[^&]*&?/, "");
            window.location.hash = hashData && hashData != "#" ? hashData : "#!";
            time = yt$www$watch$player$parseTimeParam_(time);
        } else {
            time = 0;
        }
        if (time) {
            args.start = time;
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
    goog$exportSymbol("checkCurrentVideo", function (videoId, listId, feature) {
        var currentVideoId = yt$getConfig("VIDEO_ID");
        var isCurrent = currentVideoId == videoId;
        var currentListId = yt$www$lists$initialized_ ? yt$www$lists$getPlaylistBar().getFullId() : null;
        var listId = !listId || listId == currentListId;
        if (currentVideoId && (!isCurrent || !listId)) {
            currentVideoId = null;
            if (listId) {
                currentVideoId = yt$www$lists$getPlaylistBar();
                isCurrent = yt$www$lists$List$getIndicesOf_(currentVideoId.list_, [videoId])[0];
                currentVideoId =
                    isCurrent === undefined ? "" : yt$www$lists$List$getVideoUrl_(currentVideoId.list_, isCurrent);
            }
            if (!currentVideoId) {
                currentVideoId = feature
                    ? feature
                    : yt$uri$setQueryData(window.location.href, {
                          v: videoId,
                          feature: null
                      });
            }
            if (currentVideoId) {
                yt$window$redirect(currentVideoId);
            }
        }
    });
    goog$exportSymbol("trackAnnotationsEvent", function (category, action, label) {
        var tracker = yt$getConfig("ANALYTICS_ANNOTATIONS_TRACKER");
        window._gaq.push(function () {
            tracker._trackEvent(category, action, label);
        });
    });
    goog$exportSymbol("reportFlashTiming", function () {});
    goog$exportSymbol("reportTimingMaps", function (ticks, infos) {
        for (var label in ticks) {
            yt$timing.tick(label, ticks[label]);
        }
        for (var key in infos) {
            yt$timing.info(key, infos[key]);
        }
        yt$timing.maybeSendReport();
    });
    goog$exportSymbol("yt.www.watch.playlists.editAnnotation", function () {
        goog$dom$classes$addRemove(goog$dom$getElement("watch-video-annotation-editable"), "not-editing", "editing");
        goog$dom$getElement("watch-video-annotation-textarea").focus();
        var form = goog$dom$getElement("watch-video-annotation-form");
        if (!yt$dom$datasets$get(form, "setup")) {
            yt$dom$datasets$set(form, "setup", "true");
            form = goog$dom$getElementByClass("cancel-button", form);
            yt$events$listen(form, "click", function (event) {
                event.preventDefault();
                yt$www$watch$videoannotation$updateDisplay_();
            });
        }
    });
    goog$exportSymbol("yt.www.watch.playlists.removeAnnotation", function () {
        var form = goog$dom$getElement("watch-video-annotation-form");
        goog$dom$getElement("watch-video-annotation-textarea").value = "";
        yt$www$watch$videoannotation$save_(form);
    });
    goog$exportSymbol("yt.www.watch.playlists.submitForm", function (form) {
        yt$www$watch$videoannotation$save_(form);
    });
    goog$exportSymbol("yt.www.watch.abandonment.init", function (aplid, abt) {
        yt$www$watch$playerping$aplid_ = aplid;
        yt$www$watch$playerping$abt_ = abt;
        var config = yt$getConfig("PLAYER_CONFIG");
        var config = new yt$player$Config(config);
        yt$flash$detectVersion_(function (detector) {
            var timer = yt$timing.timer || {};
            if (timer.start && detector.isSupported(config.minVersion)) {
                yt$www$watch$playerping$startTime_ = timer.start;
                if (yt$www$watch$player$hashMonitorEnabled_) {
                    yt$www$watch$playerping$subscribe_(yt$www$watch$getPlayerReference_());
                } else {
                    yt$www$watch$player$readyPubSub_.subscribe_(
                        "READY_STATE_TOPIC",
                        yt$www$watch$playerping$subscribe_
                    );
                }
                yt$events$listen(window, "beforeunload", yt$www$watch$playerping$onUnload_);
                detector = goog$now() - yt$www$watch$playerping$startTime_;
                detector = abt - detector;
                if (detector >= 0) {
                    yt$www$watch$playerping$waitTimer_ = yt$setTimeout(
                        yt$www$watch$playerping$onUserWaiting_,
                        detector
                    );
                    yt$www$watch$playerping$ping_("attempt");
                }
            }
            yt$www$watch$playerping$pending_ = true;
        });
    });
    goog$exportSymbol("yt.history.enable", function (skipInitialCallback, type) {
        var history = yt$history$getInstance(type);
        history.setEnabled.call(history, true, skipInitialCallback);
    });
    goog$exportSymbol("yt.history.disable", function () {
        var history = yt$history$getInstance();
        history.setEnabled.call(history, false);
    });
    goog$exportSymbol("yt.www.lists.addto.toggleMenu", function (button, open, showPebbles) {
        var tooltip = yt$uix$Tooltip.getInstance();
        var tooltipClass = yt$uix$BaseWidget$getCssClass(tooltip);
        var menu = goog$dom$getElement("shared-addto-menu");
        if (open) {
            open = goog$dom$getElementByClass("addto-menu", menu);
            yt$uix$Tooltip$hideTip_(tooltip, button);
            yt$www$lists$addto$hadTooltipClass_ = goog$dom$classes$remove(button, tooltipClass);
            if (!yt$www$lists$addto$menuTemplateHtml_) {
                yt$www$lists$addto$menuTemplateHtml_ = open.innerHTML;
            }
            tooltip = yt$dom$datasets$get(menu, "video-ids");
            tooltipClass = yt$dom$datasets$get(button, "video-ids");
            if (yt$www$lists$addto$lightweightPanel_) {
                goog$dom$classes$add(menu, "lightweight-panel");
            }
            if (goog$dom$classes$has(button, "flip")) {
                goog$dom$classes$add(menu, "flip");
            }
            if (tooltipClass && tooltip != tooltipClass) {
                yt$dom$datasets$set(menu, "video-ids", tooltipClass);
                open.innerHTML = yt$www$lists$addto$menuTemplateHtml_;
                menu = !!yt$getConfig("DISPLAY_FLINTSTONE_PROTOTYPE");
                if (goog$isDef(showPebbles)) {
                    menu = showPebbles;
                }
                new yt$www$lists$addto$AddToMenu(button, menu);
            }
        } else {
            if (yt$www$lists$addto$hadTooltipClass_) {
                goog$dom$classes$add(button, tooltipClass);
            }
            goog$dom$classes$remove(menu, "flip");
        }
    });
    goog$exportSymbol("yt.www.lists.data.addto.saveToWatchLater", function (videoId, feature) {
        yt$www$addto$addToWatchLater(videoId, feature, function (xhr, response) {
            var listId = response.list_id || "";
            var videoIds = [videoId];
            var msg = yt$getMsg("PLAYLIST_BAR_ADDED_TO_PLAYLIST");
            yt$www$lists$onVideosAdded("WL", listId, videoIds, msg);
        });
    });
    goog$exportSymbol("yt.www.lists.addtomenupebbles.toggleMenu", function (button, open) {
        if (open) {
            var menu = goog$dom$getElement("shared-tags-menu");
            if (!yt$www$lists$addtomenupebbles$menuTemplateHtml_) {
                yt$www$lists$addtomenupebbles$menuTemplateHtml_ = menu.innerHTML;
            }
            var videoIds = yt$dom$datasets$get(button, "video-ids");
            var menuVideoIds = yt$dom$datasets$get(menu, "video-ids");
            if (videoIds && menuVideoIds != videoIds) {
                menu.innerHTML = yt$www$lists$addtomenupebbles$menuTemplateHtml_;
                yt$dom$datasets$set(menu, "video-ids", videoIds);
                new yt$www$lists$addtomenupebbles$TagsMenu(menu, videoIds);
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
            urlParams: {
                video_id: yt$getConfig("VIDEO_ID"),
                action_more_related_videos: 1
            },
            onSuccess: function (xhr, response) {
                var container = goog$dom$getElement("watch-more-related");
                container.innerHTML = response.html;
                yt$www$thumbnaildelayload$loadImmediately(container);
            }
        });
    });
    goog$exportSymbol("yt.www.watch.watch5.handleYouTubeVJ", function () {
        goog$dom$getElement("youtube-vj-button").disabled = true;
        yt$net$ajax$send("/music_ajax", {
            urlParams: {
                video_id: yt$getConfig("VIDEO_ID"),
                action_get_vj: 1
            },
            onSuccess: function (xhr, response) {
                if (response.video_list.length) {
                    response.video_list.unshift(yt$getConfig("VIDEO_ID"));
                    var bar = yt$www$lists$getPlaylistBar();
                    yt$www$lists$setQueueVideoIds_([]);
                    yt$www$lists$addToQueueCookie_(response.video_list);
                    var queue = new yt$www$lists$QueueList();
                    yt$www$lists$PlaylistBar$setList_(bar, queue);
                    queue.index_ = 0;
                    bar.updateDisplay(true);
                    yt$www$lists$PlaylistBar$setAutoplay_(bar, true);
                }
            }
        });
    });
    goog$exportSymbol("yt.www.watch.watch5.handleToggleMoreFromUser", function (expander) {
        var other = goog$dom$getElement("watch-mft-button");
        if (other) {
            goog$dom$classes$enable(other, "yt-uix-expander-collapsed", true);
            goog$dom$classes$enable(other, "yt-uix-button-toggled", false);
        }
        if ((other = goog$dom$getElement("watch-more-from-topic"))) {
            goog$dom$classes$enable(other, "collapsed", true);
        }
        var other = goog$dom$classes$has(expander, "yt-uix-expander-collapsed");
        var list = goog$dom$getElement("watch-more-from-user");
        if (!other && yt$dom$datasets$get(list, "loaded") != "true") {
            expander = {
                user_id: yt$dom$datasets$get(expander, "video-user-id"),
                video_id: yt$dom$datasets$get(expander, "video-id"),
                action_channel_videos: "1"
            };
            yt$net$ajax$send("/watch_ajax", {
                format: "XML",
                method: "GET",
                urlParams: expander,
                onSuccess: function (xhr, response) {
                    list.innerHTML = response.html_content;
                    yt$dom$datasets$set(list, "loaded", "true");
                    yt$www$thumbnaildelayload$loadImmediately(list);
                    var slideSize = parseInt(
                        yt$dom$datasets$get(goog$dom$getElement("watch-channel-discoverbox"), "slider-slide-selected"),
                        10
                    );
                    goog$dom$getElementsByTagNameAndClass("button", "yt-uix-slider-num", undefined)[slideSize].click();
                }
            });
        }
        goog$dom$classes$enable(list, "collapsed", other);
    });
    goog$exportSymbol("yt.www.watch.watch5.handleToggleMoreFromTopic", function (expander) {
        var other = goog$dom$getElement("watch-mfu-button");
        if (other) {
            goog$dom$classes$enable(other, "yt-uix-expander-collapsed", true);
            goog$dom$classes$enable(other, "yt-uix-button-toggled", false);
        }
        if ((other = goog$dom$getElement("watch-more-from-user"))) {
            goog$dom$classes$enable(other, "collapsed", true);
        }
        var other = goog$dom$classes$has(expander, "yt-uix-expander-collapsed");
        var list = goog$dom$getElement("watch-more-from-topic");
        if (!other && yt$dom$datasets$get(list, "loaded") != "true") {
            expander = {
                topic_id: yt$dom$datasets$get(expander, "topic-id"),
                action_topic_videos: "1"
            };
            yt$net$ajax$send("/watch_ajax", {
                format: "XML",
                method: "GET",
                urlParams: expander,
                onSuccess: function (xhr, response) {
                    list.innerHTML = response.html_content;
                    yt$dom$datasets$set(list, "loaded", "true");
                    yt$www$thumbnaildelayload$loadImmediately(list);
                    var slideSize = parseInt(
                        yt$dom$datasets$get(goog$dom$getElement("watch-channel-discoverbox"), "slider-slide-selected"),
                        10
                    );
                    goog$dom$getElementsByTagNameAndClass("button", "yt-uix-slider-num", undefined)[slideSize].click();
                }
            });
        }
        goog$dom$classes$enable(list, "collapsed", other);
    });
    goog$exportSymbol("yt.www.watch.watch5.handleToggleDescription", function (expander) {
        if (goog$dom$classes$has(expander, "yt-uix-expander-collapsed")) {
            yt$tracking$track("descriptionClosed", undefined, undefined);
        } else {
            if (
                (expander = goog$dom$getElement("watch-source-videos-list")) &&
                yt$dom$datasets$get(expander, "loaded") != "true"
            ) {
                yt$dom$datasets$set(expander, "loaded", "true");
                var url = yt$uri$appendQueryData("/watch_ajax", {
                    action_get_video_attributions_component: 1,
                    v: yt$getConfig("VIDEO_ID")
                });
                yt$net$ajax$sendRequest(url, {
                    method: "GET",
                    update: expander
                });
            }
            yt$tracking$track("descriptionOpened", undefined, undefined);
        }
    });
    goog$exportSymbol("yt.www.watch.watch5.purchaseComplete", function () {
        yt$style$show(goog$dom$getElement("watch-player-rental-play-button"));
        var stillFrame = goog$dom$getElement("watch-player-rental-still-frame");
        yt$style$hide(goog$dom$getElement("watch-player"));
        yt$style$show(stillFrame);
    });
    goog$exportSymbol("yt.www.watch.actions.init", function () {
        var hashData = yt$uri$getHashData(window.location.hash);
        var action = hashData.action;
        if (action) {
            switch (action) {
                case "flag":
                    yt$www$watch$actions$flag();
            }
            yt$setTimeout(function () {
                yt$www$watch$actions$getElement_("watch-actions-area-container").scrollIntoView();
            }, 0);
            delete hashData.action;
            hashData = yt$uri$buildQueryData(hashData) || "#!";
            window.location.hash = hashData;
        }
    });
    goog$exportSymbol(
        "yt.www.watch.actions.loadPlusoneLike",
        function (containerId, trackingId, url, lang, sessionIndex) {
            new yt$sharing$PlusOneButton(goog$dom$getElement(containerId), trackingId, url, lang, sessionIndex, {
                size: "standard",
                source: "google:youtube:watch_exp"
            });
        }
    );
    goog$exportSymbol("yt.www.watch.shortcuts.init", function () {
        yt$events$listen(document, "keypress", yt$www$watch$handleKeyPress_);
    });
    goog$exportSymbol("yt.www.watch.actions.captions", function (button) {
        if (yt$www$watch$actions$activateButton_(button)) {
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
    goog$exportSymbol("yt.www.watch.actions.like", function (button) {
        if (yt$www$watch$actions$activateButton_(button)) {
            yt$www$watch$actions$like_(true);
        }
    });
    goog$exportSymbol("yt.www.watch.actions.share", yt$www$watch$actions$share);
    goog$exportSymbol("yt.www.watch.actions.addto", function () {
        yt$www$watch$actions$showPanel_("watch-actions-addto");
        new yt$www$watch$AddToPanel(goog$dom$getElement("watch-actions-addto"), yt$getConfig("VIDEO_ID"));
    });
    goog$exportSymbol("yt.www.watch.actions.showSigninOrCreateChannelWarning", function (button) {
        if (yt$www$watch$actions$activateButton_(button)) {
            yt$www$watch$actions$showPanel_("watch-actions-logged-out");
        }
    });
    goog$exportSymbol("yt.www.watch.actions.stats", function (button) {
        if (yt$www$watch$actions$activateButton_(button)) {
            yt$www$watch$actions$showLoading_();
            yt$net$ajax$send("/insight_ajax", {
                format: "XML",
                method: "GET",
                urlParams: {
                    action_get_statistics_and_data: 1,
                    v: yt$getConfig("VIDEO_ID")
                },
                onSuccess: function (xhr, response) {
                    yt$www$watch$actions$showAjaxContent_(response.html_content);
                },
                onFail: yt$www$watch$actions$showError_
            });
        }
    });
    goog$exportSymbol("yt.www.watch.actions.unlike", function (button) {
        if (yt$www$watch$actions$activateButton_(button)) {
            yt$www$watch$actions$like_(false);
        }
    });
    goog$exportSymbol("yt.www.watch.watch5.showIE9WebMPromo", function (promo) {
        var video = document.createElement("video");
        if (video.canPlayType && !video.canPlayType("video/webm")) {
            yt$style$show(promo);
        }
    });
    goog$exportSymbol("yt.www.comments.init", function () {
        var view = goog$dom$getElement("comments-view");
        new yt$www$comments$CommentsSection(view);
        yt$events$delegateByClass(view, "click", yt$www$comments$handleAction_, "comment-action");
    });
    goog$exportSymbol("yt.www.comments.initForm", function (element, focus) {
        var form = goog$dom$getAncestorByTagNameAndClass(element, "form");
        if (!yt$dom$datasets$has(form, "initialized")) {
            yt$dom$datasets$set(form, "initialized", "true");
            form = new yt$www$comments$PostForm(form, !focus);
            if (focus) {
                form.focus();
            }
        }
    });
    goog$exportSymbol("yt.www.lists.init", function () {
        if (parseInt(yt$getConfig("PLAYLIST_BAR_PLAYING_INDEX"), 10) > -1) {
            yt$www$lists$getPlaylistBar();
            var delay = yt$getConfig("AUTOPLAY_DELAY");
            if (delay) {
                yt$www$lists$autoplayCountdown_(delay);
            }
        }
        yt$www$lists$initialized_ = true;
    });
    goog$exportSymbol("yt.www.lists.getState", function () {
        var state = yt$www$lists$getPlayerListData();
        state.autoPlayMax = yt$getConfig("PLAY_ALL_MAX");
        return state;
    });
    goog$exportSymbol("yt.www.lists.registerNearEndEventsWithPlayer", yt$www$lists$registerNearEndEventsWithPlayer);
    goog$exportSymbol("yt.www.lists.handleNearPlaybackEnd", function (cueRange) {
        if (
            yt$www$lists$initialized_ &&
            yt$www$lists$PlaylistBar$isAutoplayOn_(yt$www$lists$getPlaylistBar()) &&
            cueRange.slice(0, -1) == "NEAR_END"
        ) {
            cueRange = parseInt(cueRange.slice(-1), 10);
            yt$www$lists$PlaylistBar$showAutoplayWarning_(yt$www$lists$getPlaylistBar(), cueRange);
        }
    });
    goog$exportSymbol("yt.www.lists.pebblesmigration.initPebblesMigration", function () {
        var container = goog$dom$getElement("flintstone-migration");
        yt$events$delegateByClass(container, "click", yt$www$lists$pebblesmigration$onWipeClick_, "library-wipe-btn");
        yt$events$delegateByClass(
            container,
            "click",
            yt$www$lists$pebblesmigration$onImportClick_,
            "library-import-btn"
        );
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
        var toolbelt = goog$dom$getElement("toolbelt-top");
        var expander = goog$dom$getElement("search-option-expander");
        var expand = !goog$dom$classes$has(expander, "expanded");
        goog$dom$classes$enable(expander, "expanded", expand);
        if (expand) {
            yt$style$show(toolbelt);
            toolbelt.style.height = goog$dom$getElement("toolbelt-container").offsetHeight + "px";
        } else {
            toolbelt.style.height = 0;
            yt$setTimeout(function () {
                yt$style$hide(toolbelt);
            }, 300);
        }
        return false;
    });
    goog$exportSymbol("yt.www.thumbnaildelayload.init", function (preloadMargin) {
        yt$www$thumbnaildelayload$preloadMargin_ = preloadMargin || 0;
        yt$www$thumbnaildelayload$topOffset_ = yt$www$thumbnaildelayload$getVisibleBottom_();
        yt$www$thumbnaildelayload$delayLoadEnabled_ = true;
        yt$www$thumbnaildelayload$registerDelayLoad(undefined, undefined);
        yt$www$thumbnaildelayload$loadAllAbove_();
        yt$events$listen(window, "scroll", yt$www$thumbnaildelayload$loadVisible_);
        yt$events$listen(window, "resize", yt$www$thumbnaildelayload$loadVisible_);
    });
    goog$exportSymbol("yt.www.xsrf.populateSessionToken", function () {
        for (var i = 0; i < document.forms.length; i++) {
            var skip = false;
            for (var form = 0; form < yt$www$xsrf$EXCLUDED_FORM_NAMES_.length; form++) {
                if (document.forms[i].name == yt$www$xsrf$EXCLUDED_FORM_NAMES_[form]) {
                    skip = true;
                }
            }
            form = document.forms[i];
            if (form.method.toLowerCase() == "post" && skip == false) {
                var skip = false;
                for (var j = 0; j < form.elements.length; j++) {
                    if (form.elements[j].name == yt$getConfig("XSRF_FIELD_NAME")) {
                        skip = true;
                    }
                }
                if (!skip) {
                    skip = undefined;
                    skip = yt$getConfig("XSRF_TOKEN");
                    j = document.createElement("input");
                    j.setAttribute("name", yt$getConfig("XSRF_FIELD_NAME"));
                    j.setAttribute("type", "hidden");
                    j.setAttribute("value", skip);
                    form.appendChild(j);
                }
            }
        }
    });
    goog$exportSymbol("yt.www.masthead.performSearch", function (dataKey, link) {
        var form = goog$dom$getElement("masthead-search");
        var searchType = yt$dom$datasets$get(link, dataKey) || "";
        if (searchType == "rentals") {
            form.rental.value = 1;
            form.search_type.value = "";
        } else {
            form.search_type.value = searchType;
            form.rental.value = 0;
        }
        if (form.search_query.value) {
            form.submit();
        } else {
            var form = link.innerHTML;
            var searchButton = goog$dom$getElement("search-btn");
            var buttonHtml = searchButton.innerHTML;
            var linkHtml = yt$dom$datasets$get(searchButton, dataKey) || "";
            searchButton.innerHTML = form;
            yt$dom$datasets$set(searchButton, dataKey, searchType);
            link.innerHTML = buttonHtml;
            yt$dom$datasets$set(link, dataKey, linkHtml);
        }
        return false;
    });
    goog$exportSymbol("yt.www.masthead.loadPicker", function (pickerId, baseUrl, forceShow) {
        var picker = goog$dom$getElement(pickerId);
        if (picker) {
            if (forceShow) {
                yt$style$show(picker);
            } else {
                yt$style$toggle(picker);
            }
        } else {
            picker = document.createElement("div");
            picker.id = pickerId;
            yt$style$hide(picker);
            goog$dom$getElement("picker-container").appendChild(picker);
            forceShow = "/masthead_ajax?action_get_" + pickerId.replace("-", "_") + "=1";
            if (baseUrl) {
                forceShow = baseUrl + forceShow;
            }
            yt$net$ajax$sendRequest(forceShow, {
                method: "GET",
                update: pickerId,
                onComplete: function () {
                    yt$style$hide("picker-loading");
                    yt$style$show(pickerId);
                    goog$dom$getElement(pickerId).scrollIntoView();
                }
            });
            yt$style$show("picker-loading");
        }
        goog$dom$classes$add(picker, "yt-tile-static");
        yt$www$picker$hideAllExcept_(pickerId);
        goog$dom$getElement(pickerId).scrollIntoView();
    });
    goog$exportSymbol("yt.www.masthead.dismissGAPlusMessage", function () {
        var cookie = yt$net$cookies$get("FML", "").split(",");
        var now = new Date();
        var now = Math.round(now.getTime() / 1000);
        var value = "";
        var value = cookie.length != 2 ? "1," + now : parseInt(cookie[0], 10) + 1 + "," + now;
        yt$net$cookies$set("FML", value, 315360000);
    });
    goog$exportSymbol("yt.www.masthead.dismissPostLinkingMessage", function () {
        yt$net$cookies$remove("FML");
    });
    goog$exportSymbol("yt.www.masthead.toggleExpandedMasthead", function () {
        var expanded = goog$dom$getElement("masthead-expanded");
        yt$style$toggleOne_(expanded);
        yt$style$setDisplayed("masthead-expanded-menu", true);
        yt$style$setDisplayed("masthead-expanded-acct-sw-container", false);
        if (!yt$www$masthead$accountswitch$enabled_) {
            goog$dom$classes$remove(goog$dom$getElement("masthead-expanded-container"), "accountswitch");
        }
        if (!yt$dom$datasets$get(expanded, "loaded")) {
            var photo = goog$dom$getElement("masthead-expanded-menu-gaia-photo");
            if (photo && !photo.src) {
                photo.src = yt$dom$datasets$get(photo, "src");
            }
            yt$net$ajax$send("/playlist_bar_ajax", {
                urlParams: {
                    action_get_playlists_masthead: 1,
                    feature: "mhee",
                    new_slider: 1
                },
                format: "JSON",
                absoluteUrl: true,
                onSuccess: function (xhr, response) {
                    goog$dom$getElement("masthead-expanded-lists-container").innerHTML = response.html;
                    yt$dom$datasets$set(expanded, "loaded", "true");
                }
            });
        }
    });
    goog$exportSymbol("yt.www.masthead.accountswitch.init", function (enabled) {
        yt$www$masthead$accountswitch$enabled_ = enabled;
    });
    goog$exportSymbol("yt.www.masthead.accountswitch.toggle", function () {
        yt$style$toggleOne_("masthead-expanded-acct-sw-container");
        var container = goog$dom$getElement("masthead-expanded-container");
        var switcher = goog$dom$getElement("masthead-expanded-acct-sw-container");
        if (yt$style$isDisplayed(switcher)) {
            switcher.style.top = container.offsetTop + "px";
            switcher = goog$dom$getElement("masthead-expanded-menu-acct-sw-list");
            if (switcher.offsetHeight < container.offsetHeight) {
                switcher.style.height = container.offsetHeight - 11 + "px";
            }
            var list = goog$dom$getElement("masthead-expanded-acct-sw-iframe");
            if (!list) {
                var height = goog$dom$getElement("masthead-expanded-menu-acct-sw-list");
                var list = goog$dom$createDom("iframe", {
                    id: "masthead-expanded-acct-sw-iframe",
                    frameborder: 0,
                    src: 'javascript:""'
                });
                if (height.parentNode) {
                    height.parentNode.insertBefore(list, height);
                }
            }
            list.style.height = switcher.offsetHeight - 11 + "px";
            if (!yt$www$masthead$accountswitch$enabled_) {
                goog$dom$classes$add(container, "accountswitch");
            }
        } else if (!yt$www$masthead$accountswitch$enabled_) {
            goog$dom$classes$remove(container, "accountswitch");
        }
    });
    goog$exportSymbol("yt.www.masthead.initSandbar", function (hl, authuser) {
        window.___jsl = {
            h: yt$getConfig("GAPI_HINT_PARAMS")
        };
        gapi$load("iframes", {
            callback: function () {
                var notifyButton = goog$dom$getElement("sb-button-notify");
                var shareButton = goog$dom$getElement("sb-button-share");
                var sandbar = new yt$www$sandbar$Sandbar(hl, authuser);
                yt$events$listen(notifyButton, "click", goog$bind(sandbar.handleNotifyClick, sandbar));
                yt$events$listen(shareButton, "click", goog$bind(sandbar.handleShareClick, sandbar));
                yt$pubsub$publish("sandbar-init");
            }
        });
    });
    goog$exportSymbol("yt.www.ads.MastheadAd", yt$www$ads$MastheadAd);
    yt$www$ads$MastheadAd.prototype.collapse_ad = yt$www$ads$MastheadAd.prototype.collapse;
    yt$www$ads$MastheadAd.prototype.expand_ad = yt$www$ads$MastheadAd.prototype.expand;
    goog$exportSymbol("yt.www.home.ads.workaroundIE", function (iframe) {
        if (!yt$www$home$ads$ieFocusApplied_ && yt$www$home$ads$adLoaded_) {
            yt$www$home$ads$ieFocusApplied_ = true;
            yt$setTimeout(function () {
                iframe.focus();
            }, 0);
        }
    });
    goog$exportSymbol("yt.www.home.ads.workaroundLoad", function () {
        yt$www$home$ads$adLoaded_ = true;
    });
    goog$exportSymbol("yt.www.home.ads.workaroundReset", function () {
        yt$www$home$ads$ieFocusApplied_ = false;
    });
    goog$exportSymbol("yt.www.home.ads.writeAdsContentToIframe", function (iframeId, html) {
        var doc = goog$dom$getElement(iframeId).contentDocument || goog$dom$getElement(iframeId).contentWindow.document;
        doc.open();
        doc.write("<!DOCTYPE html><html><head></head><body>" + html + "</body></html>");
        if (!goog$userAgent$IE) {
            doc.close();
        }
    });
    goog$exportSymbol("yt.www.home.ads.yvaCollapse", function () {
        var bin = goog$dom$getElement("yva-bin");
        if (bin) {
            var background = goog$dom$getElement("yva-bg");
            if (background) {
                goog$dom$classes$addRemove(background, "yva-360-bg", "yva-250-bg");
            }
            goog$dom$classes$addRemove(bin, "yva-expanded", "yva-collapsed");
        }
    });
    goog$exportSymbol("yt.www.home.ads.yvaExpand", function () {
        var bin = goog$dom$getElement("yva-bin");
        if (bin) {
            goog$dom$classes$addRemove(bin, "yva-collapsed", "yva-expanded");
        }
    });
    goog$exportSymbol("yt.tracking.doubleclick.trackActivity", function (type, category, params) {
        type =
            (document.location.protocol == "https:" ? "https://" : "http://") +
            "fls.doubleclick.net/activityi;src=" +
            goog$string$urlEncode(yt$getConfig("DBLCLK_ADVERTISER_ID")) +
            ";type=" +
            goog$string$urlEncode(type) +
            ";cat=" +
            goog$string$urlEncode(category);
        if (params && !params.ord) {
            type += ";ord=1";
        }
        for (var key in params) {
            type += ";" + goog$string$urlEncode(key) + "=" + goog$string$urlEncode(params[key]);
        }
        type += ";num=" + goog$now();
        params = document.createElement("iframe");
        params.src = type;
        params.style.display = "none";
        document.body.appendChild(params);
    });
    goog$exportSymbol("yt.tracking.track", function (action, params, callback) {
        yt$tracking$track(action, params, callback);
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
    goog$exportSymbol("yt.timing.report", yt$timing.sendReport);
    goog$exportSymbol("yt.timing.maybeReport", yt$timing.maybeSendReport);
    goog$exportSymbol("yt.timing.handlePageLoad", yt$timing.handleOnload);
    goog$exportSymbol("yt.timing.handleThumbnailLoad", yt$timing.handleThumbnailLoad);
    yt$pubsub$subscribe("init", yt$timing.handleOnload);
    if (yt$IS_JSCRIPT_ && (!document.documentMode || document.documentMode < 8)) {
        yt$events$delegateByClass(goog$dom$getElement("ie"), "click", yt$www$watch$forwardClick_, "video-thumb");
    }
    goog$exportSymbol(
        "yt.www.subscriptions.edit.onUpdateSubscription",
        function (sessionToken, input, suffix, callback) {
            var suffix = suffix || "";
            var unsubscribe = false;
            if ((input = goog$dom$getElement("subscription_level_unsubscribe")) && input.checked) {
                unsubscribe = true;
            }
            input = goog$dom$forms$getFormDataString(goog$dom$getElement("subscription_level_uploads" + suffix).form);
            yt$net$ajax$sendRequest("/ajax_subscriptions?" + input, {
                postBody: "session_token=" + sessionToken,
                onComplete: function (xhr) {
                    goog$dom$getElement("subscribeMessage" + suffix).innerHTML = yt$net$ajax$getNodeValue(
                        yt$net$ajax$getRootNode(xhr),
                        "html_content"
                    );
                    yt$style$hide("edit_subscription_wrapper" + suffix);
                    yt$style$hide("edit_subscription_arrow" + suffix);
                    yt$style$show("subscribeMessage" + suffix);
                    if (suffix) {
                        goog$dom$getElement("edit_subscription_opener" + suffix).style.visibility = "";
                        yt$setTimeout(function () {
                            yt$style$hide("subscribeMessage" + suffix);
                        }, 5000);
                    }
                    if (unsubscribe) {
                        var unused = goog$dom$getElement("channel-body");
                        var xhr = goog$dom$getElementsByTagNameAndClass("div", "subscribe-div", unused);
                        var unused = goog$dom$getElementsByTagNameAndClass("div", "unsubscribe-div", unused);
                        goog$array$forEach(xhr, function (element) {
                            yt$style$toggle(element);
                        });
                        goog$array$forEach(unused, function (element) {
                            yt$style$toggle(element);
                        });
                        callback();
                    }
                }
            });
        }
    );
    goog$exportSymbol("yt.www.subscriptions.edit.onCancelUpdateSubscription", function (suffix) {
        suffix = suffix || "";
        yt$style$hide("edit_subscription_wrapper" + suffix);
        yt$style$hide("edit_subscription_arrow" + suffix);
        if (suffix) {
            goog$dom$getElement("edit_subscription_opener" + suffix).style.visibility = "";
        }
        yt$style$hide("alerts");
    });
    goog$exportSymbol(
        "yt.www.subscriptions.edit.onEditSubscriptionFromRecentActivity",
        function (opener, username, suffix, anchorEl) {
            if (window["edit_subscription_download_" + suffix]) {
                yt$style$hide("subscribeMessage" + suffix);
                yt$style$toggle("edit_subscription_wrapper" + suffix);
                yt$style$toggle("edit_subscription_arrow" + suffix);
                opener = goog$dom$getElement("edit_subscription_opener" + suffix);
                opener.style.visibility = opener.style.visibility == "visible" ? "" : "visible";
            } else {
                window["edit_subscription_download_" + suffix] = true;
                yt$net$ajax$sendRequest("/ajax_subscriptions?get_edit_subscription_form=" + username + "&i=" + suffix, {
                    postBody: "session_token=" + opener,
                    onComplete: function (xhr) {
                        goog$dom$getElement("edit_subscription_opener" + suffix).style.visibility = "visible";
                        var wrapper = document.createElement("div");
                        wrapper.innerHTML = yt$net$ajax$getNodeValue(xhr.responseXML, "html_content");
                        anchorEl.parentNode.insertBefore(wrapper, anchorEl);
                        yt$style$show("edit_subscription_wrapper" + suffix);
                        yt$style$show("edit_subscription_arrow" + suffix);
                    }
                });
            }
        }
    );
    goog$exportSymbol("yt.www.subscriptions.SubscriptionButton.init", function (root, toggleCallback) {
        var buttons = goog$dom$getElementsByClass("yt-subscription-button-js-default", root);
        goog$array$forEach(buttons, function (button) {
            if (!yt$dom$datasets$get(button, "subscription-initialized")) {
                new yt$www$subscriptions$SubscriptionButton(button, toggleCallback);
                yt$dom$datasets$set(button, "subscription-initialized", "true");
            }
        });
    });
    goog$exportSymbol("yt.www.subscriptions.button.subscribe", function (button) {
        var container = yt$www$subscriptions$button$getContainer_(button);
        var type = yt$dom$datasets$get(container, "subscription-type");
        var xsrfToken = yt$dom$datasets$get(container, "subscription-xsrf") || "";
        var menuType = yt$dom$datasets$get(container, "subscription-menu-type");
        var channelsContainer = yt$dom$datasets$get(container, "subscription-channels-container");
        var value = yt$dom$datasets$get(container, "subscription-feature");
        var params = yt$dom$datasets$get(container, "subscription-value");
        var request = {};
        if (type == "playlist") {
            request.action_create_subscription_to_playlist = 1;
            type = "p";
        } else if (type == "blog") {
            request.action_create_subscription_to_blog = 1;
            type = "b";
        } else if (type == "topic") {
            request.action_create_subscription_to_topic = 1;
            type = "l";
        } else {
            request.action_create_subscription_to_user = 1;
            type = "u";
        }
        if (value) {
            request.feature = value;
        }
        button.disabled = true;
        yt$www$subscriptions$init_(xsrfToken);
        xsrfToken = new yt$www$subscriptions$SubscriptionRequest(
            yt$www$subscriptions$button$onSubscribed_,
            yt$www$subscriptions$button$onRequestFailed_
        );
        yt$www$subscriptions$SubscriptionRequest$addUrlParams_(xsrfToken, request);
        request = {};
        request[type] = params;
        request.menu_type = menuType;
        if ((menuType = yt$getConfig("PLAYBACK_ID"))) {
            request.plid = menuType;
        }
        if (channelsContainer) {
            request.show_channels = true;
        }
        xsrfToken.postData_ = request || {};
        xsrfToken.userData.eventTrigger = button;
        xsrfToken.userData.subscription = container;
        yt$www$subscriptions$enqueue_(xsrfToken);
        yt$tracking$conversion$ping("subscribe");
    });
    goog$exportSymbol("yt.www.subscriptions.button.subscribeToCollection", function (button) {
        var container = yt$www$subscriptions$button$getContainerFromMenu_(button);
        var recommendations = goog$dom$getAncestorByTagNameAndClass(button, null, "subscription-recommendations");
        var xsrfToken = yt$dom$datasets$get(container, "subscription-xsrf") || "";
        var usernames = [];
        for (
            var inputs = goog$dom$getElementsByTagNameAndClass("input", "username", recommendations), i = 0;
            i < inputs.length;
            i++
        ) {
            if (inputs[i].checked) {
                usernames.push(inputs[i].value);
            }
        }
        if (usernames.length == 0) {
            goog$dom$removeNode(recommendations);
        } else {
            button.disabled = true;
            yt$www$subscriptions$init_(xsrfToken);
            xsrfToken = new yt$www$subscriptions$SubscriptionRequest(
                yt$www$subscriptions$button$removeCollection_,
                yt$www$subscriptions$button$onRequestFailed_
            );
            yt$www$subscriptions$SubscriptionRequest$addUrlParams_(xsrfToken, {
                action_create_subscription_to_users: 1
            });
            inputs = {};
            inputs.usernames = usernames.join(",");
            xsrfToken.postData_ = inputs || {};
            xsrfToken.userData.eventTrigger = button;
            xsrfToken.userData.subscription = container;
            xsrfToken.userData.collection = recommendations;
            yt$www$subscriptions$enqueue_(xsrfToken);
        }
    });
    goog$exportSymbol("yt.www.subscriptions.button.unsubscribe", function (button) {
        var container = yt$www$subscriptions$button$getContainerFromMenu_(button);
        var subscriptionId = yt$dom$datasets$get(container, "subscription-id");
        var xsrfToken = yt$dom$datasets$get(container, "subscription-xsrf") || "";
        var feature = yt$dom$datasets$get(container, "subscription-feature");
        if (!button.disabled) {
            button.disabled = true;
            yt$www$subscriptions$init_(xsrfToken);
            var xsrfToken = new yt$www$subscriptions$SubscriptionRequest(
                yt$www$subscriptions$button$onUnsubscribed_,
                yt$www$subscriptions$button$onRequestFailed_
            );
            var request = {
                action_remove_subscription: 1
            };
            if (feature) {
                request.feature = feature;
            }
            yt$www$subscriptions$SubscriptionRequest$addUrlParams_(xsrfToken, request);
            feature = {};
            feature.subscription_id = subscriptionId;
            if ((subscriptionId = yt$getConfig("PLAYBACK_ID"))) {
                feature.plid = subscriptionId;
            }
            xsrfToken.postData_ = feature || {};
            xsrfToken.userData.eventTrigger = button;
            xsrfToken.userData.subscription = container;
            yt$www$subscriptions$enqueue_(xsrfToken);
            yt$tracking$conversion$ping("unsubscribe");
        }
    });
    goog$exportSymbol("yt.www.subscriptions.button.update", function (button) {
        var container = yt$www$subscriptions$button$getContainerFromMenu_(button);
        var subscriptionId = yt$dom$datasets$get(container, "subscription-id");
        var xsrfToken = yt$dom$datasets$get(container, "subscription-xsrf") || "";
        button.disabled = true;
        yt$www$subscriptions$init_(xsrfToken);
        var xsrfToken = new yt$www$subscriptions$SubscriptionRequest(
            yt$www$subscriptions$button$onUnsubscribeSuccess_,
            yt$www$subscriptions$button$onRequestFailed_
        );
        var request = goog$dom$getAncestorByTagNameAndClass(button, null, "subscription-menu-form");
        var request = goog$structs$Map$toObject(goog$dom$forms$getFormDataMap(request));
        if (!request.email_on_upload) {
            request.email_on_upload = false;
        }
        request.action_update_subscription_preferences = 1;
        yt$www$subscriptions$SubscriptionRequest$addUrlParams_(xsrfToken, request);
        xsrfToken.postData_ = {
            subscription_id: subscriptionId
        };
        xsrfToken.userData.eventTrigger = button;
        xsrfToken.userData.subscription = container;
        yt$www$subscriptions$enqueue_(xsrfToken);
    });
    goog$exportSymbol("yt.www.subscriptions.button.toggleMenu", yt$www$subscriptions$button$toggleMenu);
    goog$exportSymbol("yt.www.subscriptions.button.closeMenu", function (element) {
        element = yt$www$subscriptions$button$getContainerFromMenu_(element);
        if (yt$dom$datasets$get(element, "subscription-menu-type") == "button") {
            yt$www$subscriptions$button$resetButtonMenu_(element);
        } else {
            yt$www$subscriptions$button$resetExpandableMenu_(element);
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
    goog$exportSymbol("yt.www.masthead.extended.redirectWithNewParam", function (value, name) {
        var url;
        var hash;
        var params;
        url = window.location.href;
        url = url.split("#");
        hash = url.length == 2 ? "#" + url[1] : "";
        url = url[0];
        params = yt$uri$getQueryData(url);
        params[name] = value;
        params["persist_" + name] = "1";
        url = url.split("?");
        url = url[0];
        yt$window$redirect(url, params, hash);
    });
    goog$exportSymbol("yt.www.watch.stats.extended.setInsightOptOut", function (optOut) {
        if (optOut) {
            goog$dom$classes$add(goog$dom$getElement("insight-private"), "selected");
            goog$dom$classes$remove(goog$dom$getElement("insight-public"), "selected");
        } else {
            goog$dom$classes$add(goog$dom$getElement("insight-public"), "selected");
            goog$dom$classes$remove(goog$dom$getElement("insight-private"), "selected");
        }
        var unused = goog$dom$getElement("insight-optout-form");
        if (unused) {
            optOut = yt$uri$appendQueryData(unused.action, {
                opt_out: optOut
            });
            unused = goog$dom$forms$getFormDataString(unused);
            yt$net$ajax$sendRequest(optOut, {
                postBody: unused,
                onComplete: function () {}
            });
        }
        return false;
    });
    goog$exportSymbol("yt.www.watch.stats.extended.toggleReferrer", function (element) {
        yt$style$toggle(element);
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
        if (
            !yt$prefs$UserPrefs$getFlag(yt$prefs$UserPrefs.getInstance(), yt$prefs$BitFlags.WATCH_PAGE_SURVEY_DISMISSED)
        ) {
            yt$style$show("watch_page_survey");
        }
    });
    goog$exportSymbol("yt.www.watch.user.unblockUserLinkByUsername", function (username, reload) {
        if (!confirm(yt$getMsg("UNBLOCK_USER"))) {
            return false;
        }
        var options = {
            postBody: "unblock_user=0&" + yt$getConfig("BLOCK_USER_XSRF") + "&friend_username=" + username
        };
        if (reload) {
            options.onComplete = function () {
                window.location.reload();
            };
        }
        yt$net$ajax$sendRequest("/link_servlet", options);
        return false;
    });
    goog$exportSymbol("yt.www.watch.user.blockUserLinkByUsername", function (username, reload) {
        if (!confirm(yt$getMsg("BLOCK_USER"))) {
            return false;
        }
        var options = {
            postBody: "block_user=1&" + yt$getConfig("BLOCK_USER_XSRF") + "&friend_username=" + username
        };
        if (reload) {
            options.onComplete = function () {
                window.location.reload();
            };
        }
        yt$net$ajax$sendRequest("/link_servlet", options);
        return false;
    });
    goog$exportSymbol("yt.www.watch.user.unblockUserLinkByExternalId", function (externalId, reload) {
        if (confirm(yt$getMsg("UNBLOCK_USER"))) {
            yt$net$ajax$send("/link_ajax?action_unblock_user=1", {
                format: "XML",
                method: "POST",
                requestBody: yt$getConfig("BLOCK_USER_AJAX_XSRF") + "&uid=" + externalId,
                onSuccess: function () {
                    if (reload) {
                        window.location.reload();
                    }
                }
            });
        }
    });
    goog$exportSymbol("yt.www.watch.user.blockUserLinkByExternalId", function (externalId, reload) {
        if (confirm(yt$getMsg("BLOCK_USER"))) {
            yt$net$ajax$send("/link_ajax?action_block_user=1", {
                format: "XML",
                method: "POST",
                requestBody: yt$getConfig("BLOCK_USER_AJAX_XSRF") + "&uid=" + externalId,
                onSuccess: function () {
                    if (reload) {
                        window.location.reload();
                    }
                }
            });
        }
    });
    goog$exportSymbol("getNextVideoId", function (offset) {
        var bar = yt$www$lists$getPlaylistBar();
        var autoplay = yt$www$lists$PlaylistBar$isAutoplayOn_(bar);
        var withinMax = offset <= yt$getConfig("PLAY_ALL_MAX");
        if (autoplay && withinMax) {
            return bar.getRelativeVideoId(offset);
        } else {
            return "";
        }
    });
    yt$registerGlobal("getNextVideoId");
})();
