(function () {
    function throwEx(obj) {
        throw obj;
    }
    var undefinedVar = void 0,
        trueVar = !0,
        nullVar = null,
        falseVar = !1,
        n,
        thisVar = this,
        getProp = function (path) {
            for (var path = path.split("."), currentRef = thisVar, pathCurrent; (pathCurrent = path.shift()); )
                if (currentRef[pathCurrent] != nullVar) 
                    currentRef = currentRef[pathCurrent];
                else return nullVar;
            return currentRef;
        },
        createSingleton = function (cls) {
            cls.getInstance = function () {
                return cls.Mi || (cls.Mi = new cls());
            };
        },
        getTypeof = function (obj) {
            var assumedType = typeof obj;
            if ("object" == assumedType)
                if (obj) {
                    if (obj instanceof Array) return "array";
                    if (obj instanceof Object) return assumedType;
                    var c = Object.prototype.toString.call(obj);
                    if ("[object Window]" == c) return "object";
                    if (
                        "[object Array]" == c ||
                        ("number" == typeof obj.length &&
                            "undefined" != typeof obj.splice &&
                            "undefined" != typeof obj.propertyIsEnumerable &&
                            !obj.propertyIsEnumerable("splice"))
                    )
                        return "array";
                    if (
                        "[object Function]" == c ||
                        ("undefined" != typeof obj.call &&
                            "undefined" != typeof obj.propertyIsEnumerable &&
                            !obj.propertyIsEnumerable("call"))
                    )
                        return "function";
                } else return "null";
            else if ("function" == assumedType && "undefined" == typeof obj.call) return "object";
            return assumedType;
        },
        isDefined = function (a) {
            return a !== undefinedVar;
        },
        isArray = function (a) {
            return "array" == getTypeof(a);
        },
        isArrayLike = function (a) {
            var b = getTypeof(a);
            return "array" == b || ("object" == b && "number" == typeof a.length);
        },
        isString = function (a) {
            return "string" == typeof a;
        },
        isObject = function (a) {
            var typeof_a = typeof a;
            return ("object" == typeof_a && a != nullVar) || "function" == typeof_a;
        },
        getUid = function (a) {
            return a[uidPropertyName] || (a[uidPropertyName] = ++uidCounter);
        },
        uidPropertyName = "closure_uid_" + Math.floor(2147483648 * Math.random()).toString(36),
        uidCounter = 0,
        bindFunc = function (fn, b, c) {
            return fn.call.apply(fn.bind, arguments);
        },
        bindPolyfill = function (fn, b, c) {
            fn || throwEx(Error());
            if (2 < arguments.length) {
                var d = Array.prototype.slice.call(arguments, 2);
                return function () {
                    var c = Array.prototype.slice.call(arguments);
                    Array.prototype.unshift.apply(c, d);
                    return fn.apply(b, c);
                };
            }
            return function () {
                return fn.apply(b, arguments);
            };
        },
        goog_bind = function (a, b, c) {
            goog_bind =
                Function.prototype.bind &&
                -1 != Function.prototype.bind.toString().indexOf("native code")
                    ? bindFunc
                    : bindPolyfill;
            return goog_bind.apply(nullVar, arguments);
        },
        partialApply = function (fn, b) {
            var c = Array.prototype.slice.call(arguments, 1);
            return function () {
                var b = Array.prototype.slice.call(arguments);
                b.unshift.apply(b, c);
                return fn.apply(this, b);
            };
        },
        oa =
            Date.now ||
            function () {
                return +new Date();
            };
        
    var exportSymbol = function (path, value) {
        var parts = path.split(".");
        var current = this;

        // ensure root symbol exists
        !(parts[0] in current) && current.execScript && current.execScript("var " + parts[0]);

        for (var part; parts.length && (part = parts.shift()); )
            !parts.length && isDefined(value) ? (current[part] = value) : (current = current[part] ? current[part] : (current[part] = {}));
    };
    
    var inherits = function (childCtor, parentCtor) {
        function tempConstructor() {}
        tempConstructor.prototype = parentCtor.prototype;
        childCtor.Ue = parentCtor.prototype;
        childCtor.prototype = new tempConstructor();
    };

    // bind polyfill
    Function.prototype.bind =
        Function.prototype.bind ||
        function (a, b) {
            if (1 < arguments.length) {
                var c = Array.prototype.slice.call(arguments, 1);
                c.unshift(this, a);
                return goog_bind.apply(nullVar, c);
            }
            return goog_bind(this, a);
        };
    
    var CustomError_ = function (a) {
        this.stack = Error().stack || "";
        a && (this.message = "" + a);
    };
    inherits(CustomError_, Error);
    CustomError_.prototype.name = "CustomError";

    var fstring = function (fmt, b) {
            for (var c = 1; c < arguments.length; c++)
                var d = ("" + arguments[c]).replace(/\$/g, "$$$$"), fmt = fmt.replace(/\%s/, d);
            return fmt;
        },

        isEmptyString = function (a) {
            return /^[\s\xa0]*$/.test(a);
        },
        trimWhitespace = function (a) {
            return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
        },
        uriAllowedChars = /^[a-zA-Z0-9\-_.!~*'()]*$/,
        uriSanitize = function (str) {
            str = "" + str;
            return !uriAllowedChars.test(str) ? encodeURIComponent(str) : str;
        },
        xmlEscape = function (a) {
            if (!escapedCharRegex.test(a)) return a;
            -1 != a.indexOf("&") && (a = a.replace(ampRegex, "&amp;"));
            -1 != a.indexOf("<") && (a = a.replace(ltRegex, "&lt;"));
            -1 != a.indexOf(">") && (a = a.replace(gtRegex, "&gt;"));
            -1 != a.indexOf('"') && (a = a.replace(quoteRegex, "&quot;"));
            return a;
        },
        ampRegex = /&/g,
        ltRegex = /</g,
        gtRegex = />/g,
        quoteRegex = /\"/g,
        escapedCharRegex = /[&<>\"]/,

        Da = function (a) {
            return -1 != a.indexOf("&") ? ("document" in thisVar ? Ba(a) : Ca(a)) : a;
        },
        
        Ba = function (a) {
            var b = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"' },
                c = document.createElement("div");
            return a.replace(Ea, function (a, e) {
                var f = b[a];
                if (f) return f;
                if ("#" == e.charAt(0)) {
                    var g = Number("0" + e.substr(1));
                    isNaN(g) || (f = String.fromCharCode(g));
                }
                f || ((c.innerHTML = a + " "), (f = c.firstChild.nodeValue.slice(0, -1)));
                return (b[a] = f);
            });
        },

        Ca = function (a) {
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
                        if ("#" == c.charAt(0)) {
                            var d = Number("0" + c.substr(1));
                            if (!isNaN(d)) return String.fromCharCode(d);
                        }
                        return a;
                }
            });
        },

        Ea = /&([^;\s<&]+);?/g,
        
        Fa = function (a, b) {
            a.length > b && (a = a.substring(0, b - 3) + "...");
            return a;
        },
        
        Ga = {
            "\x00": "\\0",
            "\u0008": "\\b",
            "\u000c": "\\f",
            "\n": "\\n",
            "\r": "\\r",
            "\t": "\\t",
            "\x0B": "\\x0B",
            '"': '\\"',
            "\\": "\\\\"
        },

        Ha = { "'": "\\'" },

        Ia = function (a) {
            for (var b = [], c = 0; c < a.length; c++) {
                var d = b,
                    e = c,
                    f;
                f = a.charAt(c);
                if (f in Ha) f = Ha[f];
                else if (f in Ga) f = Ha[f] = Ga[f];
                else {
                    var g = f,
                        j = f.charCodeAt(0);
                    if (31 < j && 127 > j) g = f;
                    else {
                        if (256 > j) {
                            if (((g = "\\x"), 16 > j || 256 < j)) g += "0";
                        } else ((g = "\\u"), 4096 > j && (g += "0"));
                        g += j.toString(16).toUpperCase();
                    }
                    f = Ha[f] = g;
                }
                d[e] = f;
            }
            return b.join("");
        },

        compareVersionStr = function (a, b) {
            for (
                var c = 0,
                    d = trimWhitespace("" + a).split("."),
                    e = trimWhitespace("" + b).split("."),
                    f = Math.max(d.length, e.length),
                    g = 0;
                0 == c && g < f;
                g++
            ) {
                var j = d[g] || "",
                    o = e[g] || "",
                    x = RegExp("(\\d*)(\\D*)", "g"),
                    C = RegExp("(\\d*)(\\D*)", "g");
                do {
                    var F = x.exec(j) || ["", "", ""],
                        I = C.exec(o) || ["", "", ""];
                    if (0 == F[0].length && 0 == I[0].length) break;
                    c =
                        ((0 == F[1].length ? 0 : parseInt(F[1], 10)) <
                        (0 == I[1].length ? 0 : parseInt(I[1], 10))
                            ? -1
                            : (0 == F[1].length ? 0 : parseInt(F[1], 10)) >
                                (0 == I[1].length ? 0 : parseInt(I[1], 10))
                              ? 1
                              : 0) ||
                        ((0 == F[2].length) < (0 == I[2].length)
                            ? -1
                            : (0 == F[2].length) > (0 == I[2].length)
                              ? 1
                              : 0) ||
                        (F[2] < I[2] ? -1 : F[2] > I[2] ? 1 : 0);
                } while (0 == c);
            }
            return c;
        },

        hashString = function (s) {
            var hash = 0
            for (var c = 0; c < s.length; ++c) {
                hash = 31 * hash + s.charCodeAt(c);
                hash %= 4294967296;
            }
            return hash;
        },

        La = {},

        Ma = function (a) {
            return (
                La[a] ||
                (La[a] = ("" + a).replace(/\-([a-z])/g, function (a, c) {
                    return c.toUpperCase();
                }))
            );
        };

    var AssertionError_ = function (a, b) {
        b.unshift(a);
        CustomError_.call(this, fstring.apply(nullVar, b));
        b.shift();
    };
    inherits(AssertionError_, CustomError_);
    AssertionError_.prototype.name = "AssertionError";

    var assert = function (condition, message, args, details) {
            var e = "Assertion failed";
            if (args)
                var e = e + (": " + args),
                    f = details;
            else condition && ((e += ": " + condition), (f = message));
            throwEx(new AssertionError_("" + e, f || []));
        },
        assertCondition = function (condition, message, details) {
            !condition && assert("", nullVar, message, Array.prototype.slice.call(arguments, 2));
        },
        fail = function (message, details) {
            throwEx(new AssertionError_("Failure" + (message ? ": " + message : ""), Array.prototype.slice.call(arguments, 1)));
        },
        assertString = function (value, message, details) {
            !isString(value) &&
                assert(
                    "Expected string but got %s: %s.",
                    [getTypeof(value), value],
                    message,
                    Array.prototype.slice.call(arguments, 2)
                );
            return value;
        };
    var Array_prototype = Array.prototype,
        Array_indexOf = Array_prototype.indexOf
            ? function (a, b, c) {
                  assertCondition(a.length != nullVar);
                  return Array_prototype.indexOf.call(a, b, c);
              }
            : function (a, b, c) {
                  c = c == nullVar ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
                  if (isString(a)) return !isString(b) || 1 != b.length ? -1 : a.indexOf(b, c);
                  for (; c < a.length; c++) if (c in a && a[c] === b) return c;
                  return -1;
              },
        Array_forEach = Array_prototype.forEach
            ? function (a, b, c) {
                  assertCondition(a.length != nullVar);
                  Array_prototype.forEach.call(a, b, c);
              }
            : function (a, b, c) {
                  for (var d = a.length, e = isString(a) ? a.split("") : a, f = 0; f < d; f++)
                      f in e && b.call(c, e[f], f, a);
              },
        Array_filter = Array_prototype.filter
            ? function (a, b, c) {
                  assertCondition(a.length != nullVar);
                  return Array_prototype.filter.call(a, b, c);
              }
            : function (a, b, c) {
                  for (
                      var d = a.length, e = [], f = 0, g = isString(a) ? a.split("") : a, j = 0;
                      j < d;
                      j++
                  )
                      if (j in g) {
                          var o = g[j];
                          b.call(c, o, j, a) && (e[f++] = o);
                      }
                  return e;
              },
        Array_map = Array_prototype.map
            ? function (a, b, c) {
                  assertCondition(a.length != nullVar);
                  return Array_prototype.map.call(a, b, c);
              }
            : function (a, b, c) {
                  for (
                      var d = a.length, e = Array(d), f = isString(a) ? a.split("") : a, g = 0;
                      g < d;
                      g++
                  )
                      g in f && (e[g] = b.call(c, f[g], g, a));
                  return e;
              },
        Array_some = Array_prototype.some
            ? function (a, b, c) {
                  assertCondition(a.length != nullVar);
                  return Array_prototype.some.call(a, b, c);
              }
            : function (a, b, c) {
                  for (var d = a.length, e = isString(a) ? a.split("") : a, f = 0; f < d; f++)
                      if (f in e && b.call(c, e[f], f, a)) return trueVar;
                  return falseVar;
              },
        Array_findIndex = function (a, b) {
            var c = Array_find(a, b, undefinedVar);
            return 0 > c ? nullVar : isString(a) ? a.charAt(c) : a[c];
        },
        Array_find = function (a, b, c) {
            for (var d = a.length, e = isString(a) ? a.split("") : a, f = 0; f < d; f++)
                if (f in e && b.call(c, e[f], f, a)) return f;
            return -1;
        },
        Array_findIndexRight = function (a, b) {
            for (var c = isString(a) ? a.split("") : a, d = a.length - 1; 0 <= d; d--)
                if (d in c && b.call(undefinedVar, c[d], d, a)) return d;
            return -1;
        },
        Array_contains = function (a, b) {
            return 0 <= Array_indexOf(a, b);
        },
        Array_clear = function (a) {
            if (!isArray(a)) for (var b = a.length - 1; 0 <= b; b--) delete a[b];
            a.length = 0;
        },
        Array_removeAt = function (a, b) {
            assertCondition(a.length != nullVar);
            Array_prototype.splice.call(a, b, 1);
        },
        Array_concat = function (a) {
            return Array_prototype.concat.apply(Array_prototype, arguments);
        },
        Array_clone = function (a) {
            if (isArray(a)) return Array_concat(a);
            for (var b = [], c = 0, d = a.length; c < d; c++) b[c] = a[c];
            return b;
        },
        Array_cloneArray = function (a) {
            return isArray(a) ? Array_concat(a) : Array_clone(a);
        },
        Array_extend = function (a, b) {
            for (var c = 1; c < arguments.length; c++) {
                var d = arguments[c],
                    e;
                if (isArray(d) || ((e = isArrayLike(d)) && d.hasOwnProperty("callee"))) a.push.apply(a, d);
                else if (e) for (var f = a.length, g = d.length, j = 0; j < g; j++) a[f + j] = d[j];
                else a.push(d);
            }
        },
        Array_splice = function (a, b, c, d) {
            assertCondition(a.length != nullVar);
            Array_prototype.splice.apply(a, Array_slice(arguments, 1));
        },
        Array_slice = function (a, b, c) {
            assertCondition(a.length != nullVar);
            return 2 >= arguments.length ? Array_prototype.slice.call(a, b) : Array_prototype.slice.call(a, b, c);
        },
        Array_sort = function (a, b) {
            assertCondition(a.length != nullVar);
            Array_prototype.sort.call(a, b || Array_defaultCompareFn);
        },
        Array_sortObjectsByKey = function (a) {
            var b = Array_defaultCompareFn;
            Array_sort(a, function (a, d) {
                return b(a.key, d.key);
            });
        },
        Array_defaultCompareFn = function (a, b) {
            return a > b ? 1 : a < b ? -1 : 0;
        };
    var mb,
        nb = function (a) {
            a = a.className;
            return (isString(a) && a.match(/\S+/g)) || [];
        },
        _addclass = function (a, b) {
            var c = nb(a),
                d = Array_slice(arguments, 1),
                e = c.length + d.length;
            ob(c, d);
            a.className = c.join(" ");
            return c.length == e;
        },
        _removeclass = function (a, b) {
            var c = nb(a),
                d = Array_slice(arguments, 1),
                e = pb(c, d);
            a.className = e.join(" ");
            return e.length == c.length - d.length;
        },
        ob = function (a, b) {
            for (var c = 0; c < b.length; c++) Array_contains(a, b[c]) || a.push(b[c]);
        },
        pb = function (a, b) {
            return Array_filter(a, function (a) {
                return !Array_contains(b, a);
            });
        },
        qb = function (a, b, c) {
            for (var d = nb(a), e = falseVar, f = 0; f < d.length; f++)
                d[f] == b && (Array_splice(d, f--, 1), (e = trueVar));
            e && (d.push(c), (a.className = d.join(" ")));
        },
        y = function (a, b, c) {
            var d = nb(a);
            if (isString(b)) {
                var e = d,
                    b = Array_indexOf(e, b);
                0 <= b && Array_removeAt(e, b);
            } else isArray(b) && (d = pb(d, b));
            isString(c) && !Array_contains(d, c) ? d.push(c) : isArray(c) && ob(d, c);
            a.className = d.join(" ");
        },
        _hasclass = function (a, b) {
            return Array_contains(nb(a), b);
        },
        A = function (a, b, c) {
            c ? _addclass(a, b) : _removeclass(a, b);
        },
        _toggleclass = function (a, b) {
            var c = !_hasclass(a, b);
            A(a, b, c);
            return c;
        };
    var B = function (a, b) {
        this.x = isDefined(a) ? a : 0;
        this.y = isDefined(b) ? b : 0;
    };
    B.prototype.Qa = function () {
        return new B(this.x, this.y);
    };
    B.prototype.toString = function () {
        return "(" + this.x + ", " + this.y + ")";
    };
    var sb = function (a, b) {
        return new B(a.x - b.x, a.y - b.y);
    };
    var tb = function (a, b) {
        this.width = a;
        this.height = b;
    };
    n = tb.prototype;
    n.Qa = function () {
        return new tb(this.width, this.height);
    };
    n.toString = function () {
        return "(" + this.width + " x " + this.height + ")";
    };
    n.ceil = function () {
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this;
    };
    n.floor = function () {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this;
    };
    n.round = function () {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this;
    };
    n.scale = function (a) {
        this.width *= a;
        this.height *= a;
        return this;
    };
    var ub = function (a, b) {
            for (var c in a) b.call(undefinedVar, a[c], c, a);
        },
        vb = function (a) {
            for (var b in a) return a[b];
        },
        wb = function (a) {
            var b = [],
                c = 0,
                d;
            for (d in a) b[c++] = d;
            return b;
        },
        xb = function (a, b, c) {
            for (var d in a) if (b.call(c, a[d], d, a)) return d;
        },
        yb = function (a, b) {
            var c = xb(a, b, undefinedVar);
            return c && a[c];
        },
        cloneObj = function (obj) {
            var newObj = {}, key;
            for (key in obj) newObj[key] = obj[key];
            return newObj;
        },
        Ab =
            "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(
                ","
            ),
        Bb = function (a, b) {
            for (var c, d, e = 1; e < arguments.length; e++) {
                d = arguments[e];
                for (c in d) a[c] = d[c];
                for (var f = 0; f < Ab.length; f++)
                    ((c = Ab[f]), Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]));
            }
        };
    var isOpera,
        isIE,
        isWebKit,
        isSafariMobile,
        isFirefox,
        isMac,
        isWin,
        getUA = function () {
            return thisVar.navigator ? thisVar.navigator.userAgent : nullVar;
        },
        getNavigator = function () {
            return thisVar.navigator;
        };
    isFirefox = isSafariMobile = isWebKit = isIE = isOpera = falseVar;
    var userAgentVal;
    if ((userAgentVal = getUA())) {
        var Mb = getNavigator();
        isOpera = 0 == userAgentVal.indexOf("Opera");
        isIE = !isOpera && -1 != userAgentVal.indexOf("MSIE");
        isSafariMobile = (isWebKit = !isOpera && -1 != userAgentVal.indexOf("WebKit")) && -1 != userAgentVal.indexOf("Mobile");
        isFirefox = !isOpera && !isWebKit && "Gecko" == Mb.product;
    }
    var isOperaBrowser = isOpera,
        isIEBrowser = isIE,
        isFirefoxBrowser = isFirefox,
        isWebKitBrowser = isWebKit,
        isSafariMobileBrowser = isSafariMobile,
        theNavigator = getNavigator(),
        navigatorPlatform = (theNavigator && theNavigator.platform) || "";
    isMac = -1 != navigatorPlatform.indexOf("Mac");
    isWin = -1 != navigatorPlatform.indexOf("Win");
    var isX11 = !!getNavigator() && -1 != (getNavigator().appVersion || "").indexOf("X11"),
        browserVersion;
    a: {
        var detectedVersion = "",
            versionRegex;
        if (isOperaBrowser && thisVar.opera)
            var getOperaVersion = thisVar.opera.version,
                detectedVersion = "function" == typeof getOperaVersion ? getOperaVersion() : getOperaVersion;
        else if (
            (isFirefoxBrowser
                ? (versionRegex = /rv\:([^\);]+)(\)|;)/)
                : isIEBrowser
                  ? (versionRegex = /MSIE\s+([^\);]+)(\)|;)/)
                  : isWebKitBrowser && (versionRegex = /WebKit\/(\S+)/),
            versionRegex)
        )
            var Yb = versionRegex.exec(getUA()),
                detectedVersion = Yb ? Yb[1] : "";
        if (isIEBrowser) {
            var documentMode,
                thisDocument = thisVar.document;
            documentMode = thisDocument ? thisDocument.documentMode : undefinedVar;
            if (documentMode > parseFloat(detectedVersion)) {
                browserVersion = "" + documentMode;
                break a;
            }
        }
        browserVersion = detectedVersion;
    }
    var browserVersionStr = browserVersion,
        browserVersionBelowCache = {},
        isBrowserVersionBelow = function (a) {
            return browserVersionBelowCache[a] || (browserVersionBelowCache[a] = 0 <= compareVersionStr(browserVersionStr, a));
        },
        IEBrowserVerGreaterOrEqCache = {},
        isIEBrowserVerGreaterOrEq = function (a) {
            return IEBrowserVerGreaterOrEqCache[a] || (IEBrowserVerGreaterOrEqCache[a] = isIEBrowser && !!document.documentMode && document.documentMode >= a);
        };
    
    var isNotLegacyIE = !isIEBrowser || isIEBrowserVerGreaterOrEq(9);

    (!isFirefoxBrowser && !isIEBrowser) || (isIEBrowser && isIEBrowserVerGreaterOrEq(9)) || (isFirefoxBrowser && isBrowserVersionBelow("1.9.1"));
    var fc = isIEBrowser && !isBrowserVersionBelow("9");
    var ic = function (a) {
            return a ? new gc(hc(a)) : mb || (mb = new gc());
        },
        _gel = function (a) {
            return isString(a) ? document.getElementById(a) : a;
        },
        kc = function (a, b) {
            var c = b || document;
            return jc(c)
                ? c.querySelectorAll("." + a)
                : c.getElementsByClassName
                  ? c.getElementsByClassName(a)
                  : H("*", a, b);
        },
        querySelectorHlp = function (a, b) {
            var c = b || document,
                d = nullVar;
            return (d = jc(c) ? c.querySelector("." + a) : kc(a, b)[0]) || nullVar;
        },
        jc = function (a) {
            return a.querySelectorAll && a.querySelector && (!isWebKitBrowser || lc(document) || isBrowserVersionBelow("528"));
        },
        H = function (a, b, c) {
            c = c || document;
            a = a && "*" != a ? a.toUpperCase() : "";
            if (jc(c) && (a || b)) return c.querySelectorAll(a + (b ? "." + b : ""));
            if (b && c.getElementsByClassName) {
                c = c.getElementsByClassName(b);
                if (a) {
                    for (var d = {}, e = 0, f = 0, g; (g = c[f]); f++)
                        a == g.nodeName && (d[e++] = g);
                    d.length = e;
                    return d;
                }
                return c;
            }
            c = c.getElementsByTagName(a || "*");
            if (b) {
                d = {};
                for (f = e = 0; (g = c[f]); f++)
                    ((a = g.className),
                        "function" == typeof a.split && Array_contains(a.split(/\s+/), b) && (d[e++] = g));
                d.length = e;
                return d;
            }
            return c;
        },
        nc = function (a, b) {
            ub(b, function (b, d) {
                "style" == d
                    ? (a.style.cssText = b)
                    : "class" == d
                      ? (a.className = b)
                      : "for" == d
                        ? (a.htmlFor = b)
                        : d in mc
                          ? a.setAttribute(mc[d], b)
                          : 0 == d.lastIndexOf("aria-", 0)
                            ? a.setAttribute(d, b)
                            : (a[d] = b);
            });
        },
        mc = {
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
        },
        oc = function (a) {
            var b = a.document;
            if (isWebKitBrowser && !isBrowserVersionBelow("500") && !isSafariMobileBrowser) {
                "undefined" == typeof a.innerHeight && (a = window);
                var b = a.innerHeight,
                    c = a.document.documentElement.scrollHeight;
                a == a.top && c < b && (b -= 15);
                return new tb(a.innerWidth, b);
            }
            a = lc(b) ? b.documentElement : b.body;
            return new tb(a.clientWidth, a.clientHeight);
        },
        pc = function () {
            var a = window,
                b = a.document,
                c = 0;
            if (b) {
                var a = oc(a).height,
                    c = b.body,
                    d = b.documentElement;
                if (lc(b) && d.scrollHeight)
                    c = d.scrollHeight != a ? d.scrollHeight : d.offsetHeight;
                else {
                    var b = d.scrollHeight,
                        e = d.offsetHeight;
                    d.clientHeight != e && ((b = c.scrollHeight), (e = c.offsetHeight));
                    c = b > a ? (b > e ? b : e) : b < e ? b : e;
                }
            }
            return c;
        },
        qc = function (a) {
            var b = !isWebKitBrowser && lc(a) ? a.documentElement : a.body,
                a = a.parentWindow || a.defaultView;
            return new B(a.pageXOffset || b.scrollLeft, a.pageYOffset || b.scrollTop);
        },
        sc = function (a, b, c) {
            return rc(document, arguments);
        },
        rc = function (a, b) {
            var c = b[0],
                d = b[1];
            if (!isNotLegacyIE && d && (d.name || d.type)) {
                c = ["<", c];
                d.name && c.push(' name="', xmlEscape(d.name), '"');
                if (d.type) {
                    c.push(' type="', xmlEscape(d.type), '"');
                    var e = {};
                    Bb(e, d);
                    d = e;
                    delete d.type;
                }
                c.push(">");
                c = c.join("");
            }
            c = a.createElement(c);
            d && (isString(d) ? (c.className = d) : isArray(d) ? _addclass.apply(nullVar, [c].concat(d)) : nc(c, d));
            2 < b.length && tc(a, c, b, 2);
            return c;
        },
        tc = function (a, b, c, d) {
            function e(c) {
                c && b.appendChild(isString(c) ? a.createTextNode(c) : c);
            }
            for (; d < c.length; d++) {
                var f = c[d];
                isArrayLike(f) && !(isObject(f) && 0 < f.nodeType) ? Array_forEach(uc(f) ? Array_clone(f) : f, e) : e(f);
            }
        },
        vc = function (a) {
            return document.createTextNode(a);
        },
        wc = function (a) {
            var b = document,
                c = b.createElement("div");
            isIEBrowser ? ((c.innerHTML = "<br>" + a), c.removeChild(c.firstChild)) : (c.innerHTML = a);
            if (1 == c.childNodes.length) return c.removeChild(c.firstChild);
            for (a = b.createDocumentFragment(); c.firstChild; ) a.appendChild(c.firstChild);
            return a;
        },
        lc = function (a) {
            return "CSS1Compat" == a.compatMode;
        },
        xc = function (a, b) {
            tc(hc(a), a, arguments, 1);
        },
        removeAllChildren = function (node) {
            for (var child; (child = node.firstChild); ) node.removeChild(child);
        },
        zc = function (a) {
            a && a.parentNode && a.parentNode.removeChild(a);
        },
        goog_dom_getFirstElementChild = function (a) {
            return a.firstElementChild != undefinedVar ? a.firstElementChild : Ac(a.firstChild);
        },
        Ac = function (a) {
            for (; a && 1 != a.nodeType; ) a = a.nextSibling;
            return a;
        },
        Cc = function (a, b) {
            if (a.contains && 1 == b.nodeType) return a == b || a.contains(b);
            if ("undefined" != typeof a.compareDocumentPosition)
                return a == b || Boolean(a.compareDocumentPosition(b) & 16);
            for (; b && a != b; ) b = b.parentNode;
            return b == a;
        },
        hc = function (a) {
            return 9 == a.nodeType ? a : a.ownerDocument || a.document;
        },
        Dc = function (a, b) {
            if ("textContent" in a) a.textContent = b;
            else if (a.firstChild && 3 == a.firstChild.nodeType) {
                for (; a.lastChild != a.firstChild; ) a.removeChild(a.lastChild);
                a.firstChild.data = b;
            } else (removeAllChildren(a), a.appendChild(hc(a).createTextNode(b)));
        },
        Fc = function (a, b) {
            var c = [];
            return Ec(a, b, c, trueVar) ? c[0] : undefinedVar;
        },
        Ec = function (a, b, c, d) {
            if (a != nullVar)
                for (a = a.firstChild; a; ) {
                    if ((b(a) && (c.push(a), d)) || Ec(a, b, c, d)) return trueVar;
                    a = a.nextSibling;
                }
            return falseVar;
        },
        Gc = { SCRIPT: 1, STYLE: 1, HEAD: 1, IFRAME: 1, OBJECT: 1 },
        Hc = { IMG: " ", BR: "\n" },
        Jc = function (a) {
            if (fc && "innerText" in a) a = a.innerText.replace(/(\r\n|\r|\n)/g, "\n");
            else {
                var b = [];
                Ic(a, b, trueVar);
                a = b.join("");
            }
            a = a.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
            a = a.replace(/\u200B/g, "");
            fc || (a = a.replace(/ +/g, " "));
            " " != a && (a = a.replace(/^\s*/, ""));
            return a;
        },
        Ic = function (a, b, c) {
            if (!(a.nodeName in Gc))
                if (3 == a.nodeType)
                    c
                        ? b.push(("" + a.nodeValue).replace(/(\r\n|\r|\n)/g, ""))
                        : b.push(a.nodeValue);
                else if (a.nodeName in Hc) b.push(Hc[a.nodeName]);
                else for (a = a.firstChild; a; ) (Ic(a, b, c), (a = a.nextSibling));
        },
        uc = function (a) {
            if (a && "number" == typeof a.length) {
                if (isObject(a)) return "function" == typeof a.item || "string" == typeof a.item;
                if ("function" == getTypeof(a)) return "function" == typeof a.item;
            }
            return falseVar;
        },
        K = function (a, b, c) {
            var d = b ? b.toUpperCase() : nullVar;
            return findAncestor(
                a,
                function (a) {
                    return (!d || a.nodeName == d) && (!c || _hasclass(a, c));
                },
                trueVar
            );
        },
        findAncestor = function (element, predicate, includeSelf, maxDepth) {
            includeSelf || (element = element.parentNode);
            for (var includeSelf = maxDepth == nullVar, e = 0; element && (includeSelf || e <= maxDepth); ) {
                if (predicate(element)) return element;
                element = element.parentNode;
                e++;
            }
            return nullVar;
        },
        gc = function (a) {
            this.z = a || thisVar.document || document;
        };
    gc.prototype.Ki = function (a, b, c) {
        return rc(this.z, arguments);
    };
    gc.prototype.createElement = function (a) {
        return this.z.createElement(a);
    };
    gc.prototype.createTextNode = function (a) {
        return this.z.createTextNode(a);
    };
    var Lc = function (a) {
            return lc(a.z);
        },
        Mc = function (a) {
            return qc(a.z);
        };
    gc.prototype.appendChild = function (a, b) {
        a.appendChild(b);
    };
    gc.prototype.append = xc;
    gc.prototype.contains = Cc;
    var Nc = "StopIteration" in thisVar ? thisVar.StopIteration : Error("StopIteration"),
        Oc = function () {};
    Oc.prototype.next = function () {
        throwEx(Nc);
    };
    Oc.prototype.fb = function () {
        return this;
    };
    var Pc = function (a) {
            if (a instanceof Oc) return a;
            if ("function" == typeof a.fb) return a.fb(falseVar);
            if (isArrayLike(a)) {
                var b = 0,
                    c = new Oc();
                c.next = function () {
                    for (;;) {
                        b >= a.length && throwEx(Nc);
                        if (b in a) return a[b++];
                        b++;
                    }
                };
                return c;
            }
            throwEx(Error("Not implemented"));
        },
        Qc = function (a, b) {
            if (isArrayLike(a))
                try {
                    Array_forEach(a, b, undefinedVar);
                } catch (c) {
                    c !== Nc && throwEx(c);
                }
            else {
                a = Pc(a);
                try {
                    for (;;) b.call(undefinedVar, a.next(), undefinedVar, a);
                } catch (d) {
                    d !== Nc && throwEx(d);
                }
            }
        },
        Rc = function (a) {
            if (isArrayLike(a)) return Array_cloneArray(a);
            var a = Pc(a),
                b = [];
            Qc(a, function (a) {
                b.push(a);
            });
            return b;
        };
    var Sc = function (a, b) {
        this.U = {};
        this.C = [];
        var c = arguments.length;
        if (1 < c) {
            c % 2 && throwEx(Error("Uneven number of arguments"));
            for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1]);
        } else if (a) {
            if (a instanceof Sc) ((c = a.Ve()), (d = a.We()));
            else {
                var c = wb(a),
                    e = [],
                    f = 0;
                for (d in a) e[f++] = a[d];
                d = e;
            }
            for (e = 0; e < c.length; e++) this.set(c[e], d[e]);
        }
    };
    n = Sc.prototype;
    n.La = 0;
    n.Gb = 0;
    n.N = function () {
        return this.La;
    };
    n.We = function () {
        Tc(this);
        for (var a = [], b = 0; b < this.C.length; b++) a.push(this.U[this.C[b]]);
        return a;
    };
    n.Ve = function () {
        Tc(this);
        return this.C.concat();
    };
    n.zf = function (a) {
        return Uc(this.U, a);
    };
    n.clear = function () {
        this.U = {};
        this.Gb = this.La = this.C.length = 0;
    };
    n.remove = function (a) {
        return Uc(this.U, a)
            ? (delete this.U[a], this.La--, this.Gb++, this.C.length > 2 * this.La && Tc(this), trueVar)
            : falseVar;
    };
    var Tc = function (a) {
        if (a.La != a.C.length) {
            for (var b = 0, c = 0; b < a.C.length; ) {
                var d = a.C[b];
                Uc(a.U, d) && (a.C[c++] = d);
                b++;
            }
            a.C.length = c;
        }
        if (a.La != a.C.length) {
            for (var e = {}, c = (b = 0); b < a.C.length; )
                ((d = a.C[b]), Uc(e, d) || ((a.C[c++] = d), (e[d] = 1)), b++);
            a.C.length = c;
        }
    };
    Sc.prototype.get = function (a, b) {
        return Uc(this.U, a) ? this.U[a] : b;
    };
    Sc.prototype.set = function (a, b) {
        Uc(this.U, a) || (this.La++, this.C.push(a), this.Gb++);
        this.U[a] = b;
    };
    Sc.prototype.Qa = function () {
        return new Sc(this);
    };
    var Vc = function (a) {
        Tc(a);
        for (var b = {}, c = 0; c < a.C.length; c++) {
            var d = a.C[c];
            b[d] = a.U[d];
        }
        return b;
    };
    Sc.prototype.fb = function (a) {
        Tc(this);
        var b = 0,
            c = this.C,
            d = this.U,
            e = this.Gb,
            f = this,
            g = new Oc();
        g.next = function () {
            for (;;) {
                e != f.Gb && throwEx(Error("The map has changed since the iterator was created"));
                b >= c.length && throwEx(Nc);
                var g = c[b++];
                return a ? g : d[g];
            }
        };
        return g;
    };
    var Uc = function (a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    };
    var Yc = function (a) {
            var b = new Sc();
            Wc(a, b, Xc);
            return b;
        },
        goog_dom_forms_getFormDataString = function (a) {
            var b = [];
            Wc(a, b, Zc);
            return b.join("&");
        },
        Wc = function (a, b, c) {
            for (var d = a.elements, e, f = 0; (e = d[f]); f++)
                if (!(e.disabled || "fieldset" == e.tagName.toLowerCase())) {
                    var g = e.name;
                    switch (e.type.toLowerCase()) {
                        case "file":
                        case "submit":
                        case "reset":
                        case "button":
                            break;
                        case "select-multiple":
                            e = ad(e);
                            if (e != nullVar) for (var j, o = 0; (j = e[o]); o++) c(b, g, j);
                            break;
                        default:
                            ((j = ad(e)), j != nullVar && c(b, g, j));
                    }
                }
            d = a.getElementsByTagName("input");
            for (f = 0; (e = d[f]); f++)
                e.form == a &&
                    "image" == e.type.toLowerCase() &&
                    ((g = e.name), c(b, g, e.value), c(b, g + ".x", "0"), c(b, g + ".y", "0"));
        },
        Xc = function (a, b, c) {
            var d = a.get(b);
            d || ((d = []), a.set(b, d));
            d.push(c);
        },
        Zc = function (a, b, c) {
            a.push(encodeURIComponent(b) + "=" + encodeURIComponent(c));
        },
        ad = function (a) {
            var b = a.type;
            if (!isDefined(b)) return nullVar;
            switch (b.toLowerCase()) {
                case "checkbox":
                case "radio":
                    return a.checked ? a.value : nullVar;
                case "select-one":
                    return ((b = a.selectedIndex), 0 <= b ? a.options[b].value : nullVar);
                case "select-multiple":
                    for (var b = [], c, d = 0; (c = a.options[d]); d++)
                        c.selected && b.push(c.value);
                    return b.length ? b : nullVar;
                default:
                    return isDefined(a.value) ? a.value : nullVar;
            }
        },
        bd = function (a) {
            a = a.elements.is_private;
            if (a.type) return ad(a);
            for (var b = 0; b < a.length; b++) {
                var c = ad(a[b]);
                if (c) return c;
            }
            return nullVar;
        };
    var cd = /<[^>]*>|&[^;]+;/g,
        dd = RegExp(
            "^[^\u0591-\u07ff\ufb1d-\ufdff\ufe70-\ufefc]*[A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0800-\u1fff\u2c00-\ufb1c\ufe00-\ufe6f\ufefd-\uffff]"
        ),
        ed = RegExp(
            "^[^A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0800-\u1fff\u2c00-\ufb1c\ufe00-\ufe6f\ufefd-\uffff]*[\u0591-\u07ff\ufb1d-\ufdff\ufe70-\ufefc]"
        ),
        goog_i18n_bidi_isRtlText = function (a, b) {
            return ed.test(b ? a.replace(cd, " ") : a);
        };
    
    var ytConfig_ = (window.yt && window.yt.config_) || {};
    exportSymbol("yt.config_", ytConfig_);

    var ytGlobals_ = (window.yt && window.yt.globals_) || {};
    exportSymbol("yt.globals_", ytGlobals_);

    var ytMsgs_ = (window.yt && window.yt.msgs_) || {};
    exportSymbol("yt.msgs_", ytMsgs_);

    var ytTimeouts_ = (window.yt && window.yt.timeouts_) || [];
    exportSymbol("yt.timeouts_", ytTimeouts_);

    var ytIntervals_ = (window.yt && window.yt.intervals_) || [];
    exportSymbol("yt.intervals_", ytIntervals_);

    var yt_setConfig = function (a) {
            assignProps(ytConfig_, arguments);
        },

        yt_getConfig = function (key, default_) {
            return key in ytConfig_ ? ytConfig_[key] : default_;
        },

        yt_registerGlobal = function (a) {
            for (var argIndex = 0, argCount = arguments.length; argIndex < argCount; ++argIndex) 
                ytGlobals_[arguments[argIndex]] = 1;
        },

        yt_setTimeout = function (handler, timeout) {
            var timeoutId = window.setTimeout(handler, timeout);
            ytTimeouts_.push(timeoutId);
            return timeoutId;
        },

        yt_setInterval = function (handler, interval) {
            var intervalId = window.setInterval(handler, interval);
            ytIntervals_.push(intervalId);
            return intervalId;
        },

        yt_clearTimeout = function (a) {
            window.clearTimeout(a);
        },

        yt_clearInterval = function (a) {
            window.clearInterval(a);
        },
        
        yt_getMsg = function (str, values_, default_) {
            var values = values_ || {};
            if ((str = str in ytMsgs_ ? ytMsgs_[str] : default_))
                for (var i in values)
                    str = str.replace(RegExp("\\$" + i, "gi"), function () {
                        return values[i];
                    });
            return str;
        },

        assignProps = function (target, args) {
            if (1 < args.length) {
                var key = args[0];
                target[key] = args[1];
            } else {
                var source = args[0];
                for (key in source) 
                    target[key] = source[key];
            }
        },
        isJscriptIE = !!eval("/*@cc_on!@*/false");
    var sd = {},
        yt_analytics_trackEvent = function (a, b, c, d) {
            if (yt_getConfig("EVENTS_TRACKER_INSTALLED")) {
                var e = sd[a];
                if (!e) {
                    var f = window._gaq._getAsyncTracker("eventsPageTracker");
                    if (!f) return;
                    window._gaq.push(function () {
                        e = f._createEventTracker(a);
                        sd[a] = e;
                    });
                }
                var g = c || undefinedVar,
                    j = d || undefinedVar;
                window._gaq.push(function () {
                    e._trackEvent(b, g, j);
                });
            }
        };
    var setDataAttr = function (element, key, value) {
            element.dataset ? (element.dataset[toCamelCase(key)] = value) : element.setAttribute("data-" + key, value);
        },
        getDataAttr = function (element, key) {
            return element.dataset ? element.dataset[toCamelCase(key)] : element.getAttribute("data-" + key);
        },
        removeDataAttr = function (element, key) {
            element.dataset ? delete element.dataset[toCamelCase(key)] : element.removeAttribute("data-" + key);
        },
        
        isDataAttrSet = function (element, key) {
            return element.dataset ? toCamelCase(key) in element.dataset
                : element.hasAttribute
                  ? !!element.hasAttribute("data-" + key)
                  : !!element.getAttribute("data-" + key);
        },
        toCamelCaseCache = {},
        toCamelCase = function (s) {
            return (
                toCamelCaseCache[s] ||
                (toCamelCaseCache[s] = ("" + s).replace(/\-([a-z])/g, function (a, c) {
                    return c.toUpperCase();
                }))
            );
        };
    var getElementUid = function (el) {
            var uid = el.__yt_uid_key;
            uid || ((uid = yd()), (el.__yt_uid_key = uid));
            return uid;
        },

        yd = getProp("yt.dom.getNextId_");
    if (!yd) {
        yd = function () {
            return ++Ad;
        };
        exportSymbol("yt.dom.getNextId_", yd);
        var Ad = 0;
    }

    var Bd = function (a) {
            var b = a.cloneNode(falseVar);
            "TR" == b.tagName || "SELECT" == b.tagName
                ? Array_forEach(a.childNodes, function (a) {
                      b.appendChild(Bd(a));
                  })
                : (b.innerHTML = a.innerHTML);
            return b;
        },
        Cd = function (a) {
            a = Bd(_gel(a));
            a.removeAttribute("id");
            return a;
        },
        Dd = function (a, b) {
            return K(a, nullVar, b);
        },
        Ed = function (a, b, c) {
            a = H(a, b, c);
            return a.length ? a[0] : nullVar;
        },
        Fd = function (a, b) {
            "disabled" in a && (a.disabled = !b);
            1 == a.nodeType && A(a, "disabled", !b);
            if (a.hasChildNodes()) for (var c = 0, d; (d = a.childNodes[c]); ++c) Fd(d, b);
        },
        Hd = function (a) {
            var b = _gel(a),
                c = Bd(b);
            a.parentNode.appendChild(c);
            c.style.whiteSpace = "normal";
            c.style.lineHeight = "1.5em";
            var d = getDataAttr(b, "original-html");
            d || ((d = b.innerHTML.replace(/^\s+|\s+$/, "")), setDataAttr(b, "original-html", d));
            for (
                var a = /<[^>]+>/g,
                    e = d.match(a) || [],
                    f = d.replace(a, "<wbr>").split("<wbr>"),
                    g = function (a) {
                        var b = [],
                            c;
                        for (c = 0; c < a.length; c++) (b.push(a[c]), e[c] && b.push(e[c]));
                        e[c] && e[c].match(/^<\s*\//) && b.push(e[c]);
                        b = b.join("");
                        return b.length < d.length ? b + "&hellip;" : b;
                    },
                    j = Gd(c),
                    a = function (a) {
                        c.innerHTML = g(a);
                        a = (c.clientHeight || c.offsetHeight) <= j;
                        c.innerHTML = "";
                        return a;
                    },
                    b = function (a) {
                        for (var b = [], c = 0, d = f.length; c < d && 0 < a; c++) {
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
                var F = o + Math.round((x - o) / 2),
                    I = b(F);
                a(I) ? ((C = I), (o = F + 1)) : (x = F - 1);
            }
            zc(c);
            return g(C);
        },
        Gd = function (a) {
            for (var b = a.innerHTML, c = "", d = 0; 1 > d; d++) c += "&nbsp;<br>";
            a.innerHTML = c;
            c = a.clientHeight || a.offsetHeight;
            a.innerHTML = b;
            return c;
        },
        Id = function () {
            var a = document;
            if ("fullScreenElement" in a) return a.fullScreenElement;
            if ("mozFullScreenElement" in a) return a.mozFullScreenElement;
            if ("msFullScreenElement" in a) return a.msFullScreenElement;
            if ("oFullScreenElement" in a) return a.oFullScreenElement;
            if ("webkitFullScreenElement" in a) return a.webkitFullScreenElement;
        };
    var yt_events_Event = function (a) {
        if ((a = a || getProp("window.event"))) {
            this.type = a.type;
            var b = a.target || a.srcElement;
            b && 3 == b.nodeType && (b = b.parentNode);
            this.target = b;
            if ((b = a.relatedTarget))
                try {
                    b = b.nodeName && b;
                } catch (c) {
                    b = nullVar;
                }
            else
                "mouseover" == this.type
                    ? (b = a.fromElement)
                    : "mouseout" == this.type && (b = a.toElement);
            this.relatedTarget = b;
            this.data = a.data;
            this.source = a.source;
            this.origin = a.origin;
            this.state = a.state;
            this.clientX = a.clientX !== undefinedVar ? a.clientX : a.pageX;
            this.clientY = a.clientY !== undefinedVar ? a.clientY : a.pageY;
            if (a.pageX || a.pageY) ((this.pageX = a.pageX), (this.pageY = a.pageY));
            else if ((a.clientX || a.clientY) && document.body && document.documentElement)
                ((this.pageX =
                    a.clientX + document.body.scrollLeft + document.documentElement.scrollLeft),
                    (this.pageY =
                        a.clientY + document.body.scrollTop + document.documentElement.scrollTop));
            this.keyCode = a.keyCode ? a.keyCode : a.which;
            this.charCode = a.charCode || ("keypress" == this.type ? this.keyCode : 0);
            0 == this.type.indexOf("touch") &&
                ((this.touches = a.touches), (this.changedTouches = a.changedTouches));
            0 == this.type.indexOf("gesture") &&
                ((this.scale = a.scale), (this.rotation = a.rotation));
            this.Ra = a;
        }
    };
    n = yt_events_Event.prototype;
    n.type = "";
    n.target = nullVar;
    n.relatedTarget = nullVar;
    n.currentTarget = nullVar;
    n.data = nullVar;
    n.source = nullVar;
    n.origin = nullVar;
    n.state = nullVar;
    n.keyCode = 0;
    n.charCode = 0;
    n.Ra = nullVar;
    n.clientX = 0;
    n.clientY = 0;
    n.pageX = 0;
    n.pageY = 0;
    n.touches = nullVar;
    n.changedTouches = nullVar;
    n.preventDefault = function () {
        this.Ra.returnValue = falseVar;
        this.Ra.preventDefault && this.Ra.preventDefault();
    };
    n.stopPropagation = function () {
        this.Ra.cancelBubble = trueVar;
        this.Ra.stopPropagation && this.Ra.stopPropagation();
    };
    var yt_events_listeners_ = getProp("yt.events.listeners_") || {};
    exportSymbol("yt.events.listeners_", yt_events_listeners_);
    var Ld = getProp("yt.events.counter_") || { count: 0 };
    exportSymbol("yt.events.counter_", Ld);
    var Md = function (a, b, c, d) {
            return xb(yt_events_listeners_, function (e) {
                return e[0] == a && e[1] == b && e[2] == c && e[4] == !!d;
            });
        },
        yt_events_listen = function (a, b, c, d) {
            if (!a || (!a.addEventListener && !a.attachEvent)) return "";
            var d = !!d,
                e = Md(a, b, c, d);
            if (e) return e;
            var e = ++Ld.count + "",
                f = function (b) {
                    b = new yt_events_Event(b);
                    b.currentTarget = a;
                    return c.call(a, b);
                };
            yt_events_listeners_[e] = [a, b, c, f, d];
            a.addEventListener ? a.addEventListener(b, f, d) : a.attachEvent("on" + b, f);
            return e;
        },
        Od = function (a, b, c, d) {
            var e;
            e = yt_events_listen(
                a,
                b,
                function () {
                    yt_removeEventListeners(e);
                    c.apply(a, arguments);
                },
                d
            );
        },
        Qd = function (a, b) {
            Pd(a, "click", b, function (a) {
                return "li" === a.nodeName.toLowerCase() && trueVar;
            });
        },
        R = function (a, b, c, d) {
            return Pd(a, b, c, function (a) {
                return _hasclass(a, d);
            });
        },
        Pd = function (a, b, c, d) {
            var e = a || document;
            return yt_events_listen(e, b, function (a) {
                var b = findAncestor(
                    a.target,
                    function (a) {
                        return a === e || d(a);
                    },
                    trueVar
                );
                b && b !== e && ((a.currentTarget = b), c.call(b, a));
            });
        },
        yt_events_unlisten = function (a, b, c, d) {
            (a = Md(a, b, c, !!d)) && yt_removeEventListeners(a);
        },
        yt_removeEventListeners = function (a) {
            "string" == typeof a && (a = [a]);
            Array_forEach(a, function (a) {
                if (a in yt_events_listeners_) {
                    var c = yt_events_listeners_[a],
                        d = c[0],
                        e = c[1],
                        f = c[3],
                        c = c[4];
                    d.removeEventListener
                        ? d.removeEventListener(e, f, c)
                        : d.detachEvent("on" + e, f);
                    delete yt_events_listeners_[a];
                }
            });
        },
        yt_events_getTarget = function (a) {
            a = a || window.event;
            a = a.target || a.srcElement;
            3 == a.nodeType && (a = a.parentNode);
            return a;
        },
        yt_events_stopPropagation = function (a) {
            a = a || window.event;
            a.cancelBubble = trueVar;
            a.stopPropagation && a.stopPropagation();
        },
        yt_events_preventDefault = function (a) {
            a = a || window.event;
            a.returnValue = falseVar;
            a.preventDefault && a.preventDefault();
            return falseVar;
        },
        Vd = function (a) {
            if (document.createEvent) {
                var b = document.createEvent("HTMLEvents");
                b.initEvent("click", trueVar, trueVar);
                a.dispatchEvent(b);
            } else ((b = document.createEventObject()), a.fireEvent("onclick", b));
        };
    var Wd = function (a) {
            this.z = a;
        },
        Xd = /\s*;\s*/;
    n = Wd.prototype;
    n.set = function (a, b, c, d, e, f) {
        /[;=\s]/.test(a) && throwEx(Error('Invalid cookie name "' + a + '"'));
        /[;\r\n]/.test(b) && throwEx(Error('Invalid cookie value "' + b + '"'));
        isDefined(c) || (c = -1);
        e = e ? ";domain=" + e : "";
        d = d ? ";path=" + d : "";
        f = f ? ";secure" : "";
        c =
            0 > c
                ? ""
                : 0 == c
                  ? ";expires=" + new Date(1970, 1, 1).toUTCString()
                  : ";expires=" + new Date(oa() + 1e3 * c).toUTCString();
        this.z.cookie = a + "=" + b + e + d + c + f;
    };
    n.get = function (a, b) {
        for (var c = a + "=", d = (this.z.cookie || "").split(Xd), e = 0, f; (f = d[e]); e++)
            if (0 == f.indexOf(c)) return f.substr(c.length);
        return b;
    };
    n.remove = function (a, b, c) {
        var d = this.zf(a);
        this.set(a, "", 0, b, c);
        return d;
    };
    n.Ve = function () {
        return Yd(this).keys;
    };
    n.We = function () {
        return Yd(this).gi;
    };
    n.N = function () {
        return !this.z.cookie ? 0 : (this.z.cookie || "").split(Xd).length;
    };
    n.zf = function (a) {
        return isDefined(this.get(a));
    };
    n.clear = function () {
        for (var a = Yd(this).keys, b = a.length - 1; 0 <= b; b--) this.remove(a[b]);
    };
    var Yd = function (a) {
            for (var a = (a.z.cookie || "").split(Xd), b = [], c = [], d, e, f = 0; (e = a[f]); f++)
                ((d = e.indexOf("=")),
                    -1 == d
                        ? (b.push(""), c.push(e))
                        : (b.push(e.substring(0, d)), c.push(e.substring(d + 1))));
            return { keys: b, gi: c };
        },
        Zd = new Wd(document);
    Zd.Hk = 3950;
    var yt_net_cookies_set = function (a, b, c, d, e) {
            Zd.set("" + a, b, c, d || "/", e || "youtube.com");
        },
        yt_net_cookies_get = function (a, b) {
            return Zd.get("" + a, b);
        },
        yt_net_cookies_remove = function (a, b, c) {
            return Zd.remove("" + a, b || "/", c || "youtube.com");
        };
    var de = function () {
        var a = yt_net_cookies_get(this.Af);
        if (a)
            for (var a = unescape(a).split("&"), b = 0; b < a.length; b++) {
                var c = a[b].split("="),
                    d = c[0];
                (c = c[1]) && (ce[d] = c.toString());
            }
    };
    createSingleton(de);
    var ce = getProp("yt.prefs.UserPrefs.prefs_") || {};
    exportSymbol("yt.prefs.UserPrefs.prefs_", ce);
    de.prototype.Af = "PREF";
    var ee = function (a) {
            /^f([1-9][0-9]*)$/.test(a) && throwEx("ExpectedRegexMatch: " + a);
        },
        fe = function (a) {
            /^\w+$/.test(a) || throwEx("ExpectedRegexMismatch: " + a);
        },
        ge = function (a) {
            a = ce[a] !== undefinedVar ? ce[a].toString() : nullVar;
            return a != nullVar && /^[A-Fa-f0-9]+$/.test(a) ? parseInt(a, 16) : nullVar;
        };
    de.prototype.get = function (a, b) {
        fe(a);
        ee(a);
        var c = ce[a] !== undefinedVar ? ce[a].toString() : nullVar;
        return c != nullVar ? c : b ? b : "";
    };
    de.prototype.set = function (a, b) {
        fe(a);
        ee(a);
        b == nullVar && throwEx("ExpectedNotNull");
        ce[a] = b.toString();
    };
    var he = function (a, b) {
            return !!((ge("f" + (Math.floor(b / 31) + 1)) || 0) & (1 << (b % 31)));
        },
        ie = function (a, b) {
            var c = "f" + (Math.floor(a / 31) + 1),
                d = 1 << (a % 31),
                e = ge(c) || 0,
                e = b ? e | d : e & ~d;
            0 == e ? delete ce[c] : ((d = e.toString(16)), (ce[c] = d.toString()));
        };
    de.prototype.remove = function (a) {
        fe(a);
        ee(a);
        delete ce[a];
    };
    de.prototype.save = function (a) {
        var a = 86400 * (a || 7),
            b = this.Af,
            c = [],
            d;
        for (d in ce) c.push(d + "=" + escape(ce[d]));
        yt_net_cookies_set(b, c.join("&"), a);
    };
    de.prototype.clear = function () {
        ce = {};
    };
    var je = function (a, b, c, d) {
        this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d;
    };
    je.prototype.Qa = function () {
        return new je(this.top, this.right, this.bottom, this.left);
    };
    je.prototype.toString = function () {
        return "(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)";
    };
    je.prototype.contains = function (a) {
        return !this || !a
            ? falseVar
            : a instanceof je
              ? a.left >= this.left &&
                a.right <= this.right &&
                a.top >= this.top &&
                a.bottom <= this.bottom
              : a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom;
    };
    je.prototype.expand = function (a, b, c, d) {
        isObject(a)
            ? ((this.top -= a.top),
              (this.right += a.right),
              (this.bottom += a.bottom),
              (this.left -= a.left))
            : ((this.top -= a), (this.right += b), (this.bottom += c), (this.left -= d));
        return this;
    };
    var ke = function (a, b, c, d) {
        this.left = a;
        this.top = b;
        this.width = c;
        this.height = d;
    };
    ke.prototype.Qa = function () {
        return new ke(this.left, this.top, this.width, this.height);
    };
    ke.prototype.toString = function () {
        return "(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)";
    };
    ke.prototype.contains = function (a) {
        return a instanceof ke
            ? this.left <= a.left &&
                  this.left + this.width >= a.left + a.width &&
                  this.top <= a.top &&
                  this.top + this.height >= a.top + a.height
            : a.x >= this.left &&
                  a.x <= this.left + this.width &&
                  a.y >= this.top &&
                  a.y <= this.top + this.height;
    };
    var le = function (a, b, c) {
            a.style[Ma(c)] = b;
        },
        me = function (a, b) {
            var c = hc(a);
            return c.defaultView &&
                c.defaultView.getComputedStyle &&
                (c = c.defaultView.getComputedStyle(a, nullVar))
                ? c[b] || c.getPropertyValue(b)
                : "";
        },
        ne = function (a, b) {
            return a.currentStyle ? a.currentStyle[b] : nullVar;
        },
        oe = function (a, b) {
            return me(a, b) || ne(a, b) || (a.style && a.style[b]);
        },
        pe = function (a) {
            var b = a.getBoundingClientRect();
            isIEBrowser &&
                ((a = a.ownerDocument),
                (b.left -= a.documentElement.clientLeft + a.body.clientLeft),
                (b.top -= a.documentElement.clientTop + a.body.clientTop));
            return b;
        },
        qe = function (a) {
            if (isIEBrowser && !isIEBrowserVerGreaterOrEq(8)) return a.offsetParent;
            for (
                var b = hc(a),
                    c = oe(a, "position"),
                    d = "fixed" == c || "absolute" == c,
                    a = a.parentNode;
                a && a != b;
                a = a.parentNode
            )
                if (
                    ((c = oe(a, "position")),
                    (d = d && "static" == c && a != b.documentElement && a != b.body),
                    !d &&
                        (a.scrollWidth > a.clientWidth ||
                            a.scrollHeight > a.clientHeight ||
                            "fixed" == c ||
                            "absolute" == c ||
                            "relative" == c))
                )
                    return a;
            return nullVar;
        },
        te = function (a) {
            for (
                var b = new je(0, Infinity, Infinity, 0),
                    c = ic(a),
                    d = c.z.body,
                    e = c.z.documentElement,
                    f = !isWebKitBrowser && lc(c.z) ? c.z.documentElement : c.z.body;
                (a = qe(a));
            )
                if (
                    (!isIEBrowser || 0 != a.clientWidth) &&
                    (!isWebKitBrowser || 0 != a.clientHeight || a != d) &&
                    a != d &&
                    a != e &&
                    "visible" != oe(a, "overflow")
                ) {
                    var g = re(a),
                        j;
                    j = a;
                    if (isFirefoxBrowser && !isBrowserVersionBelow("1.9")) {
                        var o = parseFloat(me(j, "borderLeftWidth"));
                        if (se(j))
                            var x =
                                    j.offsetWidth -
                                    j.clientWidth -
                                    o -
                                    parseFloat(me(j, "borderRightWidth")),
                                o = o + x;
                        j = new B(o, parseFloat(me(j, "borderTopWidth")));
                    } else j = new B(j.clientLeft, j.clientTop);
                    g.x += j.x;
                    g.y += j.y;
                    b.top = Math.max(b.top, g.y);
                    b.right = Math.min(b.right, g.x + a.clientWidth);
                    b.bottom = Math.min(b.bottom, g.y + a.clientHeight);
                    b.left = Math.max(b.left, g.x);
                }
            d = f.scrollLeft;
            f = f.scrollTop;
            b.left = Math.max(b.left, d);
            b.top = Math.max(b.top, f);
            c = oc(c.z.parentWindow || c.z.defaultView || window);
            b.right = Math.min(b.right, d + c.width);
            b.bottom = Math.min(b.bottom, f + c.height);
            return 0 <= b.top && 0 <= b.left && b.bottom > b.top && b.right > b.left ? b : nullVar;
        },
        re = function (a) {
            var b,
                c = hc(a),
                d = oe(a, "position"),
                e =
                    isFirefoxBrowser &&
                    c.getBoxObjectFor &&
                    !a.getBoundingClientRect &&
                    "absolute" == d &&
                    (b = c.getBoxObjectFor(a)) &&
                    (0 > b.screenX || 0 > b.screenY),
                f = new B(0, 0),
                g;
            b = c ? (9 == c.nodeType ? c : hc(c)) : document;
            g = isIEBrowser && !isIEBrowserVerGreaterOrEq(9) && !Lc(ic(b)) ? b.body : b.documentElement;
            if (a == g) return f;
            if (a.getBoundingClientRect)
                ((b = pe(a)), (a = Mc(ic(c))), (f.x = b.left + a.x), (f.y = b.top + a.y));
            else if (c.getBoxObjectFor && !e)
                ((b = c.getBoxObjectFor(a)),
                    (a = c.getBoxObjectFor(g)),
                    (f.x = b.screenX - a.screenX),
                    (f.y = b.screenY - a.screenY));
            else {
                b = a;
                do {
                    f.x += b.offsetLeft;
                    f.y += b.offsetTop;
                    b != a && ((f.x += b.clientLeft || 0), (f.y += b.clientTop || 0));
                    if (isWebKitBrowser && "fixed" == oe(b, "position")) {
                        f.x += c.body.scrollLeft;
                        f.y += c.body.scrollTop;
                        break;
                    }
                    b = b.offsetParent;
                } while (b && b != a);
                if (isOperaBrowser || (isWebKitBrowser && "absolute" == d)) f.y -= c.body.offsetTop;
                for (b = a; (b = qe(b)) && b != c.body && b != g; )
                    if (((f.x -= b.scrollLeft), !isOperaBrowser || "TR" != b.tagName)) f.y -= b.scrollTop;
            }
            return f;
        },
        ue = function (a) {
            var b = new B();
            if (1 == a.nodeType)
                if (a.getBoundingClientRect) ((a = pe(a)), (b.x = a.left), (b.y = a.top));
                else {
                    var c = Mc(ic(a)),
                        a = re(a);
                    b.x = a.x - c.x;
                    b.y = a.y - c.y;
                }
            else {
                var c = "function" == getTypeof(a.Bf),
                    d = a;
                a.targetTouches
                    ? (d = a.targetTouches[0])
                    : c && a.Bf().targetTouches && (d = a.Bf().targetTouches[0]);
                b.x = d.clientX;
                b.y = d.clientY;
            }
            return b;
        },
        ve = function (a, b) {
            "number" == typeof a && (a = (b ? Math.round(a) : a) + "px");
            return a;
        },
        xe = function (a) {
            if ("none" != oe(a, "display")) return we(a);
            var b = a.style,
                c = b.display,
                d = b.visibility,
                e = b.position;
            b.visibility = "hidden";
            b.position = "absolute";
            b.display = "inline";
            a = we(a);
            b.display = c;
            b.position = e;
            b.visibility = d;
            return a;
        },
        we = function (a) {
            var b = a.offsetWidth,
                c = a.offsetHeight,
                d = isWebKitBrowser && !b && !c;
            return (!isDefined(b) || d) && a.getBoundingClientRect
                ? ((a = pe(a)), new tb(a.right - a.left, a.bottom - a.top))
                : new tb(b, c);
        },
        ye = function (a) {
            var b = re(a),
                a = xe(a);
            return new ke(b.x, b.y, a.width, a.height);
        },
        se = function (a) {
            return "rtl" == oe(a, "direction");
        },
        ze = function (a, b) {
            if (/^\d+px?$/.test(b)) return parseInt(b, 10);
            var c = a.style.left,
                d = a.runtimeStyle.left;
            a.runtimeStyle.left = a.currentStyle.left;
            a.style.left = b;
            var e = a.style.pixelLeft;
            a.style.left = c;
            a.runtimeStyle.left = d;
            return e;
        },
        Ae = { thin: 2, medium: 4, thick: 6 },
        Be = function (a, b) {
            if ("none" == ne(a, b + "Style")) return 0;
            var c = ne(a, b + "Width");
            return c in Ae ? Ae[c] : ze(a, c);
        };
    var yt_style_setDisplayed = function (a, b) {
            if ((a = _gel(a)) && a.style) ((a.style.display = b ? "" : "none"), A(a, "hid", !b));
        },
        yt_style_isDisplayed = function (a) {
            a = _gel(a);
            return !a ? falseVar : !("none" == a.style.display || _hasclass(a, "hid"));
        },
        Ee = function (a) {
            if ((a = _gel(a)))
                yt_style_isDisplayed(a)
                    ? ((a.style.display = "none"), _addclass(a, "hid"))
                    : ((a.style.display = ""), _removeclass(a, "hid"));
        },
        _showdiv = function (a) {
            Array_forEach(arguments, function (a) {
                yt_style_setDisplayed(a, trueVar);
            });
        },
        _hidediv = function (a) {
            Array_forEach(arguments, function (a) {
                yt_style_setDisplayed(a, falseVar);
            });
        },
        yt_style_toggle = function (a) {
            Array_forEach(arguments, Ee);
        };
    var buildUrl = function (scheme, userInfo, host, port, path, query, fragment) {
            var urlBuilder = [];
            scheme && urlBuilder.push(scheme, ":");
            host && (urlBuilder.push("//"), userInfo && urlBuilder.push(userInfo, "@"), urlBuilder.push(host), port && urlBuilder.push(":", port));
            path && urlBuilder.push(path);
            query && urlBuilder.push("?", query);
            fragment && urlBuilder.push("#", fragment);
            return urlBuilder.join("");
        },
        urlParserRegex = RegExp(
            "^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([\\w\\d\\-\\u0100-\\uffff.%]*)(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$"
        ),
        parseUrl = function (url) {
            if (hasCheckedLocation) {
                hasCheckedLocation = falseVar;

                var windowLocationObj = thisVar.location;
                
                if (windowLocationObj) {
                    var currentHref = windowLocationObj.href;
                    if (currentHref && (currentHref = getHostname(currentHref)) && currentHref != windowLocationObj.hostname) {
                        hasCheckedLocation = trueVar;
                        throwEx(Error());
                    }
                }
            }
            return url.match(urlParserRegex);
        },
        hasCheckedLocation = isWebKitBrowser,
        getHostname = function (url) {
            return (url = parseUrl(url)[3] || nullVar) && decodeURIComponent(url);
        },
        getCurrentOrigin = function () {
            var a = parseUrl(document.location.href);
            return buildUrl(a[1], a[2], a[3], a[4]);
        },
        getUrlPathAndQuery = function (url) {
            url = parseUrl(url);
            return buildUrl(nullVar, nullVar, nullVar, nullVar, url[5], url[6], url[7]);
        },
        appendQueryParams = function (parts, params) {
            for (var i in params) {
                var index = i,
                    value = params[i],
                    f = parts;
                if (isArray(value))
                    for (var g = 0; g < value.length; g++)
                        (f.push("&", index), "" !== value[g] && f.push("=", uriSanitize(value[g])));
                else value != nullVar && (f.push("&", index), "" !== value && f.push("=", uriSanitize(value)));
            }
            return parts;
        },
        yt_uri_buildQueryData = function (a) {
            a = appendQueryParams([], a);
            a[0] = "";
            return a.join("");
        };
    var Pe = function (a) {
            "?" == a.charAt(0) && (a = a.substr(1));
            for (var a = a.split("&"), b = {}, c = 0, d = a.length; c < d; c++) {
                var e = a[c].split("=");
                if ((1 == e.length && e[0]) || 2 == e.length) {
                    var f = e[0],
                        e = decodeURIComponent((e[1] || "").replace(/\+/g, " "));
                    f in b ? (isArray(b[f]) ? Array_extend(b[f], e) : (b[f] = [b[f], e])) : (b[f] = e);
                }
            }
            return b;
        },
        Qe = function (a) {
            return -1 != a.indexOf("?")
                ? ((a = (a || "").split("#")[0]),
                  (a = a.split("?", 2)),
                  Pe(1 < a.length ? a[1] : a[0]))
                : {};
        },
        Re = function (a) {
            "#" == a.charAt(0) && (a = "!" == a.charAt(1) ? a.substr(2) : a.substr(1));
            return Pe(a);
        },
        yt_uri_appendQueryData = function (a, b) {
            var c = appendQueryParams([a], b);
            if (c[1]) {
                var d = c[0],
                    e = d.indexOf("#");
                0 <= e && (c.push(d.substr(e)), (c[0] = d = d.substr(0, e)));
                e = d.indexOf("?");
                0 > e ? (c[1] = "?") : e == d.length - 1 && (c[1] = undefinedVar);
            }
            return c.join("");
        },
        Te = getHostname,
        Ue = function (a, b) {
            var c = a.split("?", 2),
                a = c[0],
                c = Pe(c[1] || ""),
                d;
            for (d in b) c[d] = b[d];
            return yt_uri_appendQueryData(a, c);
        },
        isTrustedDomain = function (url) {
            url = getHostname(url);

            url = url === nullVar ? nullVar : url.split(".").reverse();
            
            return (
                (url === nullVar ? falseVar : "com" == url[0] && url[1].match(/^youtube(?:-nocookie)?$/) ? trueVar : falseVar) ||
                (url === nullVar
                    ? falseVar
                    : "google" == url[1]
                      ? trueVar
                      : "google" == url[2]
                        ? "au" == url[0] && "com" == url[1]
                            ? trueVar
                            : "uk" == url[0] && "co" == url[1]
                              ? trueVar
                              : falseVar
                        : falseVar)
            );
        };
    
    var YtPlayerConfig = function (config) {
            config = config || {};
            this.url = config.url || this.url;
            this.urlV8 = config.url_v8 || this.urlV8;
            this.urlV9As2 = config.url_v9as2 || this.urlV9As2;
            this.minVersion = config.min_version || this.minVersion;
            this.args = config.args || cloneObj(YtPlayerConfig_default_args);
            this.assets = config.assets || {};
            this.attrs = config.attrs || cloneObj(YtPlayerConfig_default_attrs);
            this.params = config.params || cloneObj(YtPlayerConfig_default_params);
            this.fallback = config.fallback || this.fallback;
            this.html5 = config.html5 || this.html5;
            this.disable = config.disable || {};
        },
        YtPlayerConfig_default_args = { enablejsapi: 1 },
        YtPlayerConfig_default_attrs = { width: "640", height: "385" },
        YtPlayerConfig_default_params = { allowscriptaccess: "always", allowfullscreen: "true", bgcolor: "#000000" };
    n = YtPlayerConfig.prototype;
    n.url = "";
    n.urlV8 = "";
    n.urlV9As2 = "";
    n.minVersion = "8.0.0";
    // n.html5 = falseVar;
    n.html5 = true;

    console.log('n = YtPlayerConfig.prototype', n);

    var af = function () {
        this.Dc = [];
        $e(this);
    };
    createSingleton(af);
    n = af.prototype;
    console.log('n = af.prototype', n);
    n.J = 0;
    n.Pa = 0;
    n.rev = 0;
    n.zd = "";
    n.xa = 0;
    n.load = function (a) {
        3 <= this.xa ? a(this) : this.Dc.push(a);
    };
    n.setVersion = function (a) {
        this.J = a[0];
        this.Pa = a[1];
        this.rev = a[2];
    };
    n.isSupported = function (a, b, c) {
        a = "string" == typeof a ? a.split(".") : [a, b, c];
        a[0] = parseInt(a[0], 10) || 0;
        a[1] = parseInt(a[1], 10) || 0;
        a[2] = parseInt(a[2], 10) || 0;
        return (
            this.J > a[0] ||
            (this.J == a[0] && this.Pa > a[1]) ||
            (this.J == a[0] && this.Pa == a[1] && this.rev >= a[2])
        );
    };
    var bf = function (a) {
            return (-1 < a.zd.indexOf("Gnash") && -1 == a.zd.indexOf("AVM2")) ||
                (9 == a.J && 1 == a.Pa) ||
                (9 == a.J && 0 == a.Pa && 1 == a.rev)
                ? falseVar
                : 9 <= a.J;
        },
        cf = function (a) {
            return -1 < navigator.userAgent.indexOf("Sony/COM2") && !a.isSupported(9, 1, 58)
                ? falseVar
                : trueVar;
        },
        $e = function (a) {
            if (3 > a.xa)
                if (1 > a.xa) {
                    var b = getProp("window.navigator.plugins"),
                        c = getProp("window.navigator.mimeTypes"),
                        b = b && b["Shockwave Flash"],
                        c = c && c["application/x-shockwave-flash"],
                        c = (b && c && c.enabledPlugin && b.description) || "";
                    if ((b = c)) {
                        var d = b.indexOf("Shockwave Flash");
                        0 <= d && (b = b.substr(d + 15));
                        for (var d = b.split(" "), e = "", b = "", f = 0, g = d.length; f < g; f++)
                            if (e)
                                if (b) break;
                                else b = d[f];
                            else e = d[f];
                        e = e.split(".");
                        d = parseInt(e[0], 10) || 0;
                        e = parseInt(e[1], 10) || 0;
                        f = 0;
                        if ("r" == b.charAt(0) || "d" == b.charAt(0))
                            f = parseInt(b.substr(1), 10) || 0;
                        b = [d, e, f];
                    } else b = [0, 0, 0];
                    a.zd = c;
                    a.setVersion(b);
                    a.xa = 1;
                    0 < a.J ? df(a) : $e(a);
                } else 2 > a.xa ? ef(a) : df(a);
        };
    af.prototype.Cf = function (a) {
        a
            ? ((a = a.split(" ")[1].split(",")),
              (a = [parseInt(a[0], 10) || 0, parseInt(a[1], 10) || 0, parseInt(a[2], 10) || 0]))
            : (a = [0, 0, 0]);
        this.setVersion(a);
        this.xa = 2;
        0 < this.J ? df(this) : $e(this);
    };
    var df = function (a) {
            if (3 > a.xa) {
                a.xa = 3;
                for (var b = 0, c = a.Dc.length; b < c; b++) a.Dc[b](a);
                a.Dc = [];
            }
        },
        ef = function (a) {
            var b, c, d, e;
            if (isJscriptIE) {
                try {
                    b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                } catch (f) {
                    b = nullVar;
                }
                b || a.Cf("");
            } else
                ((d = document.getElementsByTagName("body")[0]),
                    (e = document.createElement("object")),
                    e.setAttribute("type", "application/x-shockwave-flash"),
                    (b = d.appendChild(e)));
            var g = goog_bind(a.Cf, a),
                j = 0,
                o = function () {
                    if (b && "GetVariable" in b)
                        try {
                            c = b.GetVariable("$version");
                        } catch (a) {
                            c = "";
                        }
                    c || 10 <= j ? (d && e && d.removeChild(e), g(c || "")) : (j++, yt_setTimeout(o, 10));
                };
            yt_setTimeout(o, 0);
        };
    var ff = function (a, b, c) {
            if ((a = _gel(a)) && b && c) {
                c instanceof YtPlayerConfig || (c = new YtPlayerConfig(c));
                var d = cloneObj(c.attrs),
                    e = cloneObj(c.params);
                e.flashvars = yt_uri_buildQueryData(c.args);
                c = [];
                if (isJscriptIE) {
                    d.classid = "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000";
                    e.movie = b;
                    c.push("<object ");
                    for (var f in d) c.push(f, '="', d[f], '"');
                    c.push(">");
                    for (f in e) c.push('<param name="', f, '" value="', e[f], '">');
                    c.push("</object>");
                } else {
                    d.type = "application/x-shockwave-flash";
                    d.src = b;
                    c.push("<embed ");
                    for (f in d) c.push(f, '="', d[f], '"');
                    for (f in e) c.push(f, '="', e[f], '"');
                    c.push(" />");
                }
                a.innerHTML = c.join("");
            }
        },
        yt_flash_embed = function (a, b) {
            a = _gel(a);
            b instanceof YtPlayerConfig || (b = new YtPlayerConfig(b));
            if (window != window.top) {
                var c = nullVar;
                document.referrer && (c = document.referrer.substring(0, 128));
                b.args.framer = c;
            }
            gf(function (c) {
                c.isSupported(b.minVersion) || yt_getConfig("IS_OPERA_MINI")
                    ? ((c = (bf(c) && b.url) || (cf(c) && b.urlV9As2) || b.urlV8 || b.url),
                      ff(a, c, b))
                    : isJscriptIE && c.isSupported(6, 0, 65)
                      ? ((c = new YtPlayerConfig({
                            url: "//s.ytimg.com/yt/swf/expressInstall-vflIE9HEf.swf",
                            args: {
                                MMredirectURL: window.location,
                                MMplayerType: "ActiveX",
                                MMdoctitle: document.title
                            }
                        })),
                        ff(a, c.url, c))
                      : 0 == c.J && b.fallback
                        ? b.fallback()
                        : 0 == c.J && b.fallbackMessage
                          ? b.fallbackMessage()
                          : (a.innerHTML =
                                '<div id="flash-upgrade">' + yt_getMsg("FLASH_UPGRADE") + "</div>");
            });
        },
        initFlashPlayer = function (playerConfig, forceReload) {
            if (playerConfig) {
                playerConfig instanceof YtPlayerConfig || (playerConfig = new YtPlayerConfig(playerConfig));

                var forceReloadBool = !!forceReload;
                var playerEl = _gel(playerConfig.attrs.id);
                var playerContainerEl = playerEl ? playerEl.parentNode : null;

                if (!playerEl || !playerContainerEl)
                    // wait for DOM elements to load before initializing the flash player
                    yt_setTimeout(function () {
                        initFlashPlayer(playerConfig);
                    }, 50);
                
                else {
                    if (window != window.top) {
                        var f = null;
                        
                        if (document.referrer) {
                            var g = document.referrer.substring(0, 128);
                            isTrustedDomain(g) || (f = g);
                        } else f = "unknown";

                        f && ((forceReloadBool = trueVar), (playerConfig.args.framer = f));
                    }
                    gf(function (b) {
                        if (b.isSupported(playerConfig.minVersion)) {
                            var f = "";
                            -1 < navigator.userAgent.indexOf("Sony/COM2") || (f = playerEl.src || playerEl.movie);
                            if (bf(b)) (f != playerConfig.url || forceReloadBool) && ff(playerContainerEl, playerConfig.url, playerConfig);
                            else if (cf(b)) (f != playerConfig.urlV9As2 || forceReloadBool) && ff(playerContainerEl, playerConfig.urlV9As2, playerConfig);
                            else if (f != playerConfig.urlV8 || forceReloadBool)
                                if ((ff(playerContainerEl, playerConfig.urlV8, playerConfig), (b = _gel("flash10-promo-div"))))
                                    (_showdiv(b),
                                        (b = de.getInstance()),
                                        (f = parseInt(b.get("ftuc") || 0, 10) + 1),
                                        b.set("ftuc", f),
                                        b.save());
                        } else
                            isJscriptIE && b.isSupported(6, 0, 65)
                                ? ((b = new YtPlayerConfig({
                                      url: "//s.ytimg.com/yt/swf/expressInstall-vflIE9HEf.swf",
                                      args: {
                                          MMredirectURL: window.location,
                                          MMplayerType: "ActiveX",
                                          MMdoctitle: document.title
                                      }
                                  })),
                                  ff(playerContainerEl, b.url, b))
                                : 0 == b.J && playerConfig.fallback
                                  ? playerConfig.fallback()
                                  : 0 == b.J && playerConfig.fallbackMessage
                                    ? playerConfig.fallbackMessage()
                                    : (playerContainerEl.innerHTML =
                                          '<div id="flash-upgrade">' +
                                          yt_getMsg("FLASH_UPGRADE") +
                                          "</div>");
                    });
                }
            }
        },
        gf = function (a) {
            af.getInstance().load(function (b) {
                var c = de.getInstance();
                c.set("fv", [b.J, b.Pa, b.rev].join("."));
                c.save();
                a(b);
            });
        };
    var kf = function () {};
    var lf = function () {
        this.ea = [];
        this.da = {};
    };
    inherits(lf, kf);
    n = lf.prototype;
    n.lf = 1;
    n.qc = 0;
    n.gc = function (a, b, c) {
        var d = this.da[a];
        d || (d = this.da[a] = []);
        var e = this.lf;
        this.ea[e] = a;
        this.ea[e + 1] = b;
        this.ea[e + 2] = c;
        this.lf = e + 3;
        d.push(e);
        return e;
    };
    n.yd = function (a) {
        if (0 != this.qc) return (this.pc || (this.pc = []), this.pc.push(a), falseVar);
        var b = this.ea[a];
        if (b) {
            var c = this.da[b];
            if (c) {
                var d = Array_indexOf(c, a);
                0 <= d && Array_removeAt(c, d);
            }
            delete this.ea[a];
            delete this.ea[a + 1];
            delete this.ea[a + 2];
        }
        return !!b;
    };
    n.xc = function (a, b) {
        var c = this.da[a];
        if (c) {
            this.qc++;
            for (var d = Array_slice(arguments, 1), e = 0, f = c.length; e < f; e++) {
                var g = c[e];
                this.ea[g + 1].apply(this.ea[g + 2], d);
            }
            this.qc--;
            if (this.pc && 0 == this.qc) for (; (c = this.pc.pop()); ) this.yd(c);
            return 0 != e;
        }
        return falseVar;
    };
    n.clear = function (a) {
        if (a) {
            var b = this.da[a];
            b && (Array_forEach(b, this.yd, this), delete this.da[a]);
        } else ((this.ea.length = 0), (this.da = {}));
    };
    n.N = function (a) {
        if (a) {
            var b = this.da[a];
            return b ? b.length : 0;
        }
        a = 0;
        for (b in this.da) a += this.N(b);
        return a;
    };
    var mf = getProp("yt.pubsub.instance_") || new lf();
    lf.prototype.subscribe = lf.prototype.gc;
    lf.prototype.unsubscribeByKey = lf.prototype.yd;
    lf.prototype.publish = lf.prototype.xc;
    lf.prototype.clear = lf.prototype.clear;
    exportSymbol("yt.pubsub.instance_", mf);
    var yt_pubsub_subscribe = function (a, b, c) {
            var d = getProp("yt.pubsub.instance_");
            return d
                ? d.subscribe(
                      a,
                      function () {
                          var a = arguments;
                          yt_setTimeout(function () {
                              b.apply(c || thisVar, a);
                          }, 0);
                      },
                      c
                  )
                : 0;
        },
        yt_pubsub_publish = function (a, b) {
            var c = getProp("yt.pubsub.instance_");
            return c ? c.publish.apply(c, arguments) : falseVar;
        };
    var pf,
        rf = function (a, b, c) {
            this.la = a;
            qf && (this.A = b);
            this.Ya = c || window;
            this.ta = this.Ya.location;
            this.wh = this.ta.href.split("#")[0];
            this.Ge = goog_bind(this.xh, this);
        },
        sf = (isIEBrowser && 8 <= document.documentMode) || (isFirefoxBrowser && isBrowserVersionBelow("1.9.2")) || (isWebKitBrowser && isBrowserVersionBelow("532.1")),
        qf = isIEBrowser && !sf;
    rf.prototype.Qd = function (a, b) {
        this.sd && (yt_removeEventListeners(this.sd), delete this.sd);
        this.$a && (yt_clearInterval(this.$a), delete this.$a);
        if (a) {
            this.ca = tf(this);
            if (qf) {
                var c = this.A.contentWindow.document.body;
                (!c || !c.innerHTML) && uf(this, this.ca);
            }
            b || this.la(this.ca);
            sf ? (this.sd = yt_events_listen(this.Ya, "hashchange", this.Ge)) : (this.$a = od(this.Ge, 200));
        }
    };
    rf.prototype.xh = function () {
        if (qf) {
            var a;
            a = (a = this.A.contentWindow.document.body)
                ? decodeURIComponent(a.innerHTML.substring(1).replace(/\+/g, " "))
                : "";
            a != this.ca
                ? ((this.ca = a), vf(this, a), this.la(a))
                : ((a = tf(this)), a != this.ca && ((this.ca = a), uf(this, a), this.la(a)));
        } else ((a = tf(this)), a != this.ca && ((this.ca = a), this.la(a)));
    };
    var tf = function (a) {
            var a = a.ta.href,
                b = a.indexOf("#");
            return 0 > b ? "" : a.substring(b + 1);
        },
        vf = function (a, b) {
            var c = a.wh + "#" + b,
                d = a.ta.href;
            d == c || d + "#" == c || (a.ta.href = c);
        },
        uf = function (a, b) {
            var c = a.A.contentWindow.document,
                d = c.body ? c.body.innerHTML : "",
                e = "#" + uriSanitize(b);
            d != e &&
                ((d = ["<title>", xmlEscape(window.document.title || ""), "</title><body>", e, "</body>"]),
                c.open("text/html"),
                c.write(d.join("")),
                c.close());
        };
    rf.prototype.add = function (a, b, c) {
        this.ca = "" + a;
        qf && uf(this, a);
        vf(this, a);
        c || this.la(this.ca);
    };
    var wf = function () {
            this.Ff = oa();
        },
        xf = new wf();
    wf.prototype.set = function (a) {
        this.Ff = a;
    };
    wf.prototype.reset = function () {
        this.set(oa());
    };
    wf.prototype.get = function () {
        return this.Ff;
    };
    var yf = function (a) {
        this.Ch = a || "";
        this.Dh = xf;
    };
    n = yf.prototype;
    n.Pe = trueVar;
    n.Fh = trueVar;
    n.Eh = trueVar;
    n.rd = falseVar;
    n.Gh = falseVar;
    var zf = function (a) {
            return 10 > a ? "0" + a : "" + a;
        },
        Af = function (a, b) {
            var c = (a.Ne - b) / 1e3,
                d = c.toFixed(3),
                e = 0;
            if (1 > c) e = 2;
            else for (; 100 > c; ) (e++, (c *= 10));
            for (; 0 < e--; ) d = " " + d;
            return d;
        },
        Cf = function (a) {
            yf.call(this, a);
        };
    inherits(Cf, yf);
    var Ef = function (a) {
            return Df(a || arguments.callee.caller, []);
        },
        Df = function (a, b) {
            var c = [];
            if (Array_contains(b, a)) c.push("[...circular reference...]");
            else if (a && 50 > b.length) {
                c.push(Ff(a) + "(");
                for (var d = a.arguments, e = 0; e < d.length; e++) {
                    0 < e && c.push(", ");
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
                            f = (f = Ff(f)) ? f : "[fn]";
                            break;
                        default:
                            f = typeof f;
                    }
                    40 < f.length && (f = f.substr(0, 40) + "...");
                    c.push(f);
                }
                b.push(a);
                c.push(")\n");
                try {
                    c.push(Df(a.caller, b));
                } catch (g) {
                    c.push("[exception trying to get caller]\n");
                }
            } else a ? c.push("[...long stack...]") : c.push("[end]");
            return c.join("");
        },
        Ff = function (a) {
            if (Gf[a]) return Gf[a];
            a = "" + a;
            if (!Gf[a]) {
                var b = /function ([^\(]+)/.exec(a);
                Gf[a] = b ? b[1] : "[Anonymous]";
            }
            return Gf[a];
        },
        Gf = {};
    var Hf = function (a, b, c, d, e) {
        this.reset(a, b, c, d, e);
    };
    Hf.prototype.qd = nullVar;
    Hf.prototype.pd = nullVar;
    var If = 0;
    Hf.prototype.reset = function (a, b, c, d, e) {
        "number" == typeof e || If++;
        this.Ne = d || oa();
        this.Oa = a;
        this.ai = b;
        this.Me = c;
        delete this.qd;
        delete this.pd;
    };
    Hf.prototype.getLevel = function () {
        return this.Oa;
    };
    Hf.prototype.Cc = function (a) {
        this.Oa = a;
    };
    Hf.prototype.getMessage = function () {
        return this.ai;
    };
    var Jf = function (a) {
        this.ua = a;
    };
    Jf.prototype.Ac = nullVar;
    Jf.prototype.Oa = nullVar;
    Jf.prototype.Pd = nullVar;
    Jf.prototype.Nb = nullVar;
    var Kf = function (a, b) {
        this.name = a;
        this.value = b;
    };
    Kf.prototype.toString = function () {
        return this.name;
    };
    var Lf = new Kf("SHOUT", 1200),
        Mf = new Kf("SEVERE", 1e3),
        Nf = new Kf("WARNING", 900),
        Of = new Kf("INFO", 800),
        Pf = new Kf("CONFIG", 700);
    Jf.prototype.getName = function () {
        return this.ua;
    };
    Jf.prototype.getParent = function () {
        return this.Ac;
    };
    Jf.prototype.Cc = function (a) {
        this.Oa = a;
    };
    Jf.prototype.getLevel = function () {
        return this.Oa;
    };
    var Qf = function (a) {
        if (a.Oa) return a.Oa;
        if (a.Ac) return Qf(a.Ac);
        fail("Root logger has no level set.");
        return nullVar;
    };
    Jf.prototype.log = function (a, b, c) {
        if (a.value >= Qf(this).value) {
            a = this.Bi(a, b, c);
            b = "log:" + a.getMessage();
            thisVar.console &&
                (thisVar.console.timeStamp
                    ? thisVar.console.timeStamp(b)
                    : thisVar.console.markTimeline && thisVar.console.markTimeline(b));
            thisVar.msWriteProfilerMark && thisVar.msWriteProfilerMark(b);
            for (b = this; b; ) {
                var c = b,
                    d = a;
                if (c.Nb) for (var e = 0, f = undefinedVar; (f = c.Nb[e]); e++) f(d);
                b = b.getParent();
            }
        }
    };
    Jf.prototype.Bi = function (a, b, c) {
        var d = new Hf(a, "" + b, this.ua);
        if (c) {
            d.qd = c;
            var e;
            var f = arguments.callee.caller;
            try {
                var g;
                var j = getProp("window.location.href");
                if (isString(c))
                    g = {
                        message: c,
                        name: "Unknown error",
                        lineNumber: "Not available",
                        fileName: j,
                        stack: "Not available"
                    };
                else {
                    var o,
                        x,
                        C = falseVar;
                    try {
                        o = c.lineNumber || c.Si || "Not available";
                    } catch (F) {
                        ((o = "Not available"), (C = trueVar));
                    }
                    try {
                        x = c.fileName || c.filename || c.sourceURL || j;
                    } catch (I) {
                        ((x = "Not available"), (C = trueVar));
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
                    xmlEscape(g.message) +
                    '\nUrl: <a href="view-source:' +
                    g.fileName +
                    '" target="_new">' +
                    g.fileName +
                    "</a>\nLine: " +
                    g.lineNumber +
                    "\n\nBrowser stack:\n" +
                    xmlEscape(g.stack + "-> ") +
                    "[end]\n\nJS stack traversal:\n" +
                    xmlEscape(Ef(f) + "-> ");
            } catch (ka) {
                e = "Exception trying to expose exception! You win, we lose. " + ka;
            }
            d.pd = e;
        }
        return d;
    };
    Jf.prototype.info = function (a, b) {
        this.log(Of, a, b);
    };
    var namespaceRegistry = {},
        Sf = nullVar,
        Tf = function () {
            Sf || ((Sf = new Jf("")), (namespaceRegistry[""] = Sf), Sf.Cc(Pf));
        },
        Uf = function (a) {
            Tf();
            var b;
            if (!(b = namespaceRegistry[a])) {
                b = new Jf(a);
                var c = a.lastIndexOf("."),
                    d = a.substr(c + 1),
                    c = Uf(a.substr(0, c));
                c.Pd || (c.Pd = {});
                c.Pd[d] = b;
                b.Ac = c;
                namespaceRegistry[a] = b;
            }
            return b;
        };
    var Vf = function () {
            this.Uh = goog_bind(this.Zh, this);
            this.hc = new Cf();
            this.hc.Pe = falseVar;
            this.Ze = this.hc.rd = falseVar;
            this.Oe = "";
            this.qh = {};
        },
        Xf = function () {
            var a = Wf;
            if (trueVar != a.Ze) {
                Tf();
                var b = Sf,
                    c = a.Uh;
                b.Nb || (b.Nb = []);
                b.Nb.push(c);
                a.Ze = trueVar;
            }
        };
    Vf.prototype.Zh = function (a) {
        if (!this.qh[a.Me]) {
            var b;
            b = this.hc;
            var c = [];
            c.push(b.Ch, " ");
            if (b.Pe) {
                var d = new Date(a.Ne);
                c.push(
                    "[",
                    zf(d.getFullYear() - 2e3) +
                        zf(d.getMonth() + 1) +
                        zf(d.getDate()) +
                        " " +
                        zf(d.getHours()) +
                        ":" +
                        zf(d.getMinutes()) +
                        ":" +
                        zf(d.getSeconds()) +
                        "." +
                        zf(Math.floor(d.getMilliseconds() / 10)),
                    "] "
                );
            }
            b.Fh && c.push("[", Af(a, b.Dh.get()), "s] ");
            b.Eh && c.push("[", a.Me, "] ");
            b.Gh && c.push("[", a.getLevel().name, "] ");
            c.push(a.getMessage(), "\n");
            b.rd && a.qd && c.push(a.pd, "\n");
            b = c.join("");
            if (Yf && Yf.firebug)
                switch (a.getLevel()) {
                    case Lf:
                        Yf.info(b);
                        break;
                    case Mf:
                        Yf.error(b);
                        break;
                    case Nf:
                        Yf.warn(b);
                        break;
                    default:
                        Yf.debug(b);
                }
            else Yf ? Yf.log(b) : window.opera ? window.opera.postError(b) : (this.Oe += b);
        }
    };
    var Wf = nullVar,
        Yf = window.console,
        Zf = function () {
            Wf || (Wf = new Vf());
            -1 != window.location.href.indexOf("Debug=true") && Xf();
        };
    var $f = nullVar,
        ag = function (a) {
            $f || (Zf(), Xf(), (Wf.hc.rd = trueVar), ($f = Uf("yt.debug")), $f.Cc(Of));
            $f.log(Of, "yt.history.StateMonitor: " + a, undefinedVar);
        };
    var bg = function (a, b) {
            this.la = a;
            this.Ya = b || window;
            this.ta = this.Ya.location;
            this.zh = goog_bind(this.Wh, this);
        },
        cg = !!window.history.pushState && (!isWebKitBrowser || (isWebKitBrowser && isBrowserVersionBelow("534.11")));
    bg.prototype.Qd = function (a, b) {
        ag("setEnabled " + a);
        this.vd && (yt_removeEventListeners(this.vd), delete this.vd);
        this.$a && (yt_clearInterval(this.$a), delete this.$a);
        !a || !cg
            ? ag("disabling (supported = " + cg + ")")
            : (ag("enabling"),
              (this.jc = this.ta.href),
              b || this.la(this.jc),
              (this.vd = yt_events_listen(this.Ya, "popstate", this.zh)));
    };
    bg.prototype.Wh = function (a) {
        var b = this.ta.href,
            a = a.state;
        ag("handlePopState_ " + b + " " + a);
        if (a || b != this.jc) (ag("handlePopState_ navCallback"), (this.jc = b), this.la(b, a));
    };
    bg.prototype.add = function (a, b, c) {
        if (a || b)
            ((a = a || this.ta.href),
                this.Ya.history.pushState(b, "", a),
                (this.jc = a),
                c || this.la(a, b));
    };
    var eg = function (a) {
            var a = a || "hash",
                b = getProp("yt.history.instance_");
            b ||
                ("state" == a
                    ? ((b = new bg(dg)),
                      (bg.prototype.setEnabled = bg.prototype.Qd),
                      (bg.prototype.add = bg.prototype.add))
                    : ((b = new rf(dg, _gel("legacy-history-iframe"))),
                      (rf.prototype.setEnabled = rf.prototype.Qd),
                      (rf.prototype.add = rf.prototype.add)),
                (pf = b),
                exportSymbol("yt.history.instance_", pf));
            return b;
        },
        dg = function (a, b) {
            yt_pubsub_publish("navigate", a, b);
        };
    var fg = {
            GOOGLE_IMA: "//www.google.com/jsapi",
            GOOGLE_MAPS_API: "//maps.google.com/maps/api/js?sensor=false",
            GOOGLE_LANGUAGE_API_VIRTUAL_KEYBOARD: "//www.google.com/jsapi?key=youtube-internal-vk",
            GOOGLE_LANGUAGE_API_INPUT_TOOLS: "//www.google.com/jsapi?key=youtube-internal-it"
        },
        gg = {},
        hg = {},
        ig = {},
        kg = function (a) {
            exportSymbol("yt.net.apiloader.onApiLoaded_" + a, function () {
                jg(a);
            });
        },
        jg = function (a) {
            hg[a] = trueVar;
            Array_forEach(ig[a], function (a) {
                a.call();
            });
            delete ig[a];
        },
        lg = function (a, b) {
            var c = fg[a];
            if (c)
                if (hg[a]) b.call();
                else if ((ig[a] || (ig[a] = []), ig[a].push(b), !gg[a])) {
                    kg(a);
                    var c = yt_uri_appendQueryData(c, { callback: "yt.net.apiloader.onApiLoaded_" + a }),
                        d = document.createElement("script");
                    d.src = c;
                    document.body.appendChild(d);
                    gg[a] = trueVar;
                }
        };
    var mg,
        ng,
        og = nullVar,
        pg = falseVar,
        qg = "";
    var rg,
        sg,
        tg = falseVar,
        ug = "";
    var vg = function (a) {
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
            )
                try {
                    return eval("(" + a + ")");
                } catch (b) {}
            throwEx(Error("Invalid JSON string: " + a));
        },
        decodeJson = function (json) {
            return eval("(" + json + ")");
        },
        xg = function (a) {
            this.Fc = a;
        },
        zg = function (a, b) {
            var c = [];
            yg(a, b, c);
            return c.join("");
        },
        yg = function (a, b, c) {
            switch (typeof b) {
                case "string":
                    Ag(b, c);
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
                    if (b == nullVar) {
                        c.push("null");
                        break;
                    }
                    if (isArray(b)) {
                        var d = b.length;
                        c.push("[");
                        for (var e = "", f = 0; f < d; f++)
                            (c.push(e),
                                (e = b[f]),
                                yg(a, a.Fc ? a.Fc.call(b, "" + f, e) : e, c),
                                (e = ","));
                        c.push("]");
                        break;
                    }
                    c.push("{");
                    d = "";
                    for (f in b)
                        Object.prototype.hasOwnProperty.call(b, f) &&
                            ((e = b[f]),
                            "function" != typeof e &&
                                (c.push(d),
                                Ag(f, c),
                                c.push(":"),
                                yg(a, a.Fc ? a.Fc.call(b, f, e) : e, c),
                                (d = ",")));
                    c.push("}");
                    break;
                case "function":
                    break;
                default:
                    throwEx(Error("Unknown type: " + typeof b));
            }
        },
        Bg = {
            '"': '\\"',
            "\\": "\\\\",
            "/": "\\/",
            "\u0008": "\\b",
            "\u000c": "\\f",
            "\n": "\\n",
            "\r": "\\r",
            "\t": "\\t",
            "\x0B": "\\u000b"
        },
        Cg = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g,
        Ag = function (a, b) {
            b.push(
                '"',
                a.replace(Cg, function (a) {
                    if (a in Bg) return Bg[a];
                    var b = a.charCodeAt(0),
                        e = "\\u";
                    16 > b ? (e += "000") : 256 > b ? (e += "00") : 4096 > b && (e += "0");
                    return (Bg[a] = e + b.toString(16));
                }),
                '"'
            );
        };
    var Dg = nullVar;
    "undefined" != typeof XMLHttpRequest
        ? (Dg = function () {
              return new XMLHttpRequest();
          })
        : "undefined" != typeof ActiveXObject &&
          (Dg = function () {
              return new ActiveXObject("Microsoft.XMLHTTP");
          });
    var isXhrSuccessful = function (xhr) {
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
    var _ajax = function (a, b, c, d, e) {
            var f = Dg && Dg();
            if ("open" in f) {
                f.onreadystatechange = function () {
                    4 == (f && "readyState" in f ? f.readyState : 0) && b && b(f);
                };
                c = (c || "GET").toUpperCase();
                d = d || "";
                f.open(c, a, trueVar);
                a = "POST" == c;
                if (e)
                    for (var g in e)
                        (f.setRequestHeader(g, e[g]), "content-type" == g.toLowerCase() && (a = falseVar));
                a && f.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                f.send(d);
                return f;
            }
        },
        ajaxRequest = function (url, options) {
            var responseFormat = options.format || "JSON";
            options.kb && (url = document.location.protocol + "//" + document.location.hostname + url);
            
            var params = options.g;
            params && (url = Ue(url, params));
            
            var requestBody = options.za || "";
            if (params = options.n) {
                requestBody = Pe(requestBody);
                Bb(requestBody, params);
                requestBody = yt_uri_buildQueryData(requestBody);
            }

            _ajax(
                url,
                function (xhr) {
                    var success = isXhrSuccessful(xhr),
                        response = nullVar;

                    if (success || (400 <= xhr.status && 500 > xhr.status)) 
                        response = xhrDecodeResponse(responseFormat, xhr);

                    if (success)
                        a: {
                            switch (responseFormat) {
                                case "XML":
                                    success = 0 == parseInt(response && response.return_code, 10);
                                    break a;
                                case "RAW":
                                    success = trueVar;
                                    break a;
                            }
                            success = !!response;
                        }
                    var response = response || {},
                        callbackContext = options.j || thisVar;
                    
                    success ? options.f && options.f.call(callbackContext, xhr, response) : options.B && options.B.call(callbackContext, xhr, response);
                    options.ga && options.ga.call(callbackContext, xhr, response);
                },
                options.method,
                requestBody,
                options.headers
            );
        },
        Hg = function (a, b) {
            var c = b || {};
            c.method = a.method.toUpperCase();
            if ("POST" == c.method) c.za = goog_dom_forms_getFormDataString(a);
            else {
                var d = Vc(Yc(a)),
                    e = c.g || {};
                Bb(e, d);
                c.g = e;
            }
            ajaxRequest(a.action, c);
        },
        xhrDecodeResponse = function (format, xhr) {
            var data = nullVar;
            switch (format) {
                case "JSON":
                    var responseText = xhr.responseText,
                        header = xhr.getResponseHeader("Content-Type") || "";
                    responseText && 0 <= header.indexOf("json") && (data = decodeJson(responseText));
                    break;
                case "XML":
                    if ((responseText = (responseText = xhr.responseXML) ? yt_net_ajax_getRootNode(responseText) : nullVar))
                        ((data = {}),
                            Array_forEach(responseText.getElementsByTagName("*"), function (a) {
                                data[a.tagName] = Jg(a);
                            }));
            }
            return data;
        },
        yt_net_ajax_sendRequest = function (a, b) {
            var c = b.onComplete || nullVar,
                d = b.onException || nullVar,
                e = b.onError || nullVar,
                f = b.update || nullVar,
                g = b.json || falseVar;
            return _ajax(
                a,
                function (a) {
                    if (isXhrSuccessful(a)) {
                        var b = a.responseXML,
                            x = b ? yt_net_ajax_getRootNode(b) : nullVar,
                            b = !(!b || !x),
                            C,
                            F;
                        if (
                            b &&
                            ((C = yt_net_ajax_getNodeValue(x, "return_code")), (F = yt_net_ajax_getNodeValue(x, "html_content")), 0 == C)
                        ) {
                            f && F && (_gel(f).innerHTML = F);
                            var I = yt_net_ajax_getNodeValue(x, "js_content");
                            if (I) {
                                var ka = document.createElement("script");
                                ka.text = I;
                                document.getElementsByTagName("head")[0].appendChild(ka);
                            }
                        }
                        c &&
                            (b
                                ? ((b = yt_net_ajax_getNodeValue(x, "redirect_on_success")),
                                  C && b
                                      ? (window.location = b)
                                      : ((x = yt_net_ajax_getNodeValue(
                                            x,
                                            0 == C ? "success_message" : "error_message"
                                        )) && alert(x),
                                        (a = g ? eval("(" + F + ")") : a),
                                        0 == C ? c(a) : d && d(a)))
                                : a.responseText && c(a));
                    } else e && e(a);
                },
                b.method || "POST",
                b.postBody || nullVar,
                b.headers || nullVar
            );
        },
        yt_net_ajax_getRootNode = function (a) {
            return !a
                ? nullVar
                : (a = ("responseXML" in a ? a.responseXML : a).getElementsByTagName("root")) &&
                    0 < a.length
                  ? a[0]
                  : nullVar;
        },
        yt_net_ajax_getNodeValue = function (a, b) {
            if (!a) return nullVar;
            var c = a.getElementsByTagName(b);
            return c && 0 < c.length ? Jg(c[0]) : nullVar;
        },
        Jg = function (a) {
            var b = "";
            Array_forEach(a.childNodes, function (a) {
                b += a.nodeValue;
            });
            return b;
        },
        yt_net_ajax_tokenMap_ = getProp("yt.net.ajax.tokenMap_") || {};
    exportSymbol("yt.net.ajax.tokenMap_", yt_net_ajax_tokenMap_);
    var yt_net_ajax_setToken = function (a, b) {
        yt_net_ajax_tokenMap_[a] = b;
    };
    var Ng = {},
        Og = {},
        yt_net_delayed_register = function (a, b, c) {
            a = _gel(a);
            c = c || getUid(a);
            c in Ng || (Ng[c] = []);
            Ng[c].push([a, b]);
            Og[c] = falseVar;
            return c;
        },
        Qg = function (a, b) {
            var a = _gel(a),
                c = b || getUid(a),
                d = Ng[c];
            d &&
                (Ng[c] = Array_filter(d, function (b) {
                    return b[0] != a;
                }));
        },
        yt_net_delayed_load = function (a) {
            a in Ng &&
                !Og[a] &&
                (Array_forEach(Ng[a], function (a) {
                    var c = a[0],
                        a = a[1];
                    c && "IMG" == c.tagName && ((c.onload = ""), (c.src = a));
                }),
                (Ng[a] = []),
                (Og[a] = trueVar));
        };
    var yt_net_scriptloader_load = function (scriptUrl, callback, force) {
            var scriptTagId = "scriptload-" + hashString(scriptUrl),
                scriptElement = document.getElementById(scriptTagId),
                f = scriptElement && getDataAttr(scriptElement, "loaded"),
                g = scriptElement && !f;
            if (f && !force) return (callback && callback(), scriptElement);
            if (g && !force) return (callback && yt_pubsub_subscribe(scriptTagId, callback), scriptElement);
            scriptElement &&
                (scriptTagId =
                    "scriptload-" +
                    (Math.floor(2147483648 * Math.random()).toString(36) +
                        Math.abs(Math.floor(2147483648 * Math.random()) ^ oa()).toString(36)));
            callback && yt_pubsub_subscribe(scriptTagId, callback);
            var j = Sg(scriptUrl, scriptTagId, function () {
                if (!getDataAttr(j, "loaded")) {
                    setDataAttr(j, "loaded", "true");
                    yt_pubsub_publish(scriptTagId);
                    var a = scriptTagId,
                        b = getProp("yt.pubsub.instance_");
                    b && b.clear(a);
                }
            });
            return j;
        },
        Sg = function (a, b, c) {
            var d = document.createElement("script");
            d.id = b;
            d.onload = c;
            d.onreadystatechange = function () {
                if ("loaded" == d.readyState || "complete" == d.readyState) d.onload();
            };
            d.src = a;
            a = document.getElementsByTagName("head")[0];
            a.insertBefore(d, a.firstChild);
            return d;
        };
    
    var tracker_pendingImageRequests = {},
        tracker_imageRequestCounter = 0,
        tracker_sendImageBeacon = function (url, callback) {
            var image = new Image(),
                reqId = "" + tracker_imageRequestCounter++;
            tracker_pendingImageRequests[reqId] = image;
            image.onload = image.onerror = function () {
                callback && tracker_pendingImageRequests[reqId] && callback();
                delete tracker_pendingImageRequests[reqId];
            };
            image.src = url;
            image = eval("null");
        };
    
    var Xg = function (a, b, c) {
            yt_analytics_trackEvent(a, b || "null");
            a = "a=" + a + (b ? "&" + b : "").replace(/\//g, "&");
            tracker_sendImageBeacon("/gen_204?" + a, c);
        },

        yt_tracking_share = function (a, b, c, d) {
            a = yt_uri_appendQueryData("/sharing_services", { name: a, v: b, locale: c, feature: d });
            tracker_sendImageBeacon(a);
        };

    var $g = function (a, b, c, d, e, f, g) {
            var j,
                o = c.offsetParent;
            if (o) {
                var x = "HTML" == o.tagName || "BODY" == o.tagName;
                if (!x || "static" != oe(o, "position"))
                    ((j = re(o)), x || (j = sb(j, new B(o.scrollLeft, o.scrollTop))));
            }
            o = ye(a);
            if ((x = te(a))) {
                var C = new ke(x.left, x.top, x.right - x.left, x.bottom - x.top),
                    x = Math.max(o.left, C.left),
                    F = Math.min(o.left + o.width, C.left + C.width);
                if (x <= F) {
                    var I = Math.max(o.top, C.top),
                        C = Math.min(o.top + o.height, C.top + C.height);
                    I <= C && ((o.left = x), (o.top = I), (o.width = F - x), (o.height = C - I));
                }
            }
            x = ic(a);
            I = ic(c);
            if (x.z != I.z) {
                var F = x.z.body,
                    I = I.z.parentWindow || I.z.defaultView,
                    C = new B(0, 0),
                    ka = hc(F) ? hc(F).parentWindow || hc(F).defaultView : window,
                    Bf = F;
                do {
                    var qi = ka == I ? re(Bf) : ue(Bf);
                    C.x += qi.x;
                    C.y += qi.y;
                } while (ka && ka != I && (Bf = ka.frameElement) && (ka = ka.parent));
                F = sb(C, re(F));
                isIEBrowser && !Lc(x) && (F = sb(F, Mc(x)));
                o.left += F.x;
                o.top += F.y;
            }
            a = (b & 4 && se(a) ? b ^ 2 : b) & -5;
            b = new B(a & 2 ? o.left + o.width : o.left, a & 1 ? o.top + o.height : o.top);
            j && (b = sb(b, j));
            e && ((b.x += (a & 2 ? -1 : 1) * e.x), (b.y += (a & 1 ? -1 : 1) * e.y));
            var Ya;
            if (g && (Ya = te(c)) && j)
                ((Ya.top -= j.y), (Ya.right -= j.x), (Ya.bottom -= j.y), (Ya.left -= j.x));
            return Zg(b, c, d, f, Ya, g, undefinedVar);
        },

        Zg = function (a, b, c, d, e, f, g) {
            var a = a.Qa(),
                j = 0,
                o = (c & 4 && se(b) ? c ^ 2 : c) & -5,
                c = xe(b),
                g = g ? g.Qa() : c.Qa();
            if (d || 0 != o)
                (o & 2 ? (a.x -= g.width + (d ? d.right : 0)) : d && (a.x += d.left),
                    o & 1 ? (a.y -= g.height + (d ? d.bottom : 0)) : d && (a.y += d.top));
            if (f) {
                if (e) {
                    j = a;
                    d = 0;
                    if (65 == (f & 65) && (j.x < e.left || j.x >= e.right)) f &= -2;
                    if (132 == (f & 132) && (j.y < e.top || j.y >= e.bottom)) f &= -5;
                    j.x < e.left && f & 1 && ((j.x = e.left), (d |= 1));
                    j.x < e.left &&
                        j.x + g.width > e.right &&
                        f & 16 &&
                        ((g.width = Math.max(g.width - (j.x + g.width - e.right), 0)), (d |= 4));
                    j.x + g.width > e.right &&
                        f & 1 &&
                        ((j.x = Math.max(e.right - g.width, e.left)), (d |= 1));
                    f & 2 && (d |= (j.x < e.left ? 16 : 0) | (j.x + g.width > e.right ? 32 : 0));
                    j.y < e.top && f & 4 && ((j.y = e.top), (d |= 2));
                    j.y >= e.top &&
                        j.y + g.height > e.bottom &&
                        f & 32 &&
                        ((g.height = Math.max(g.height - (j.y + g.height - e.bottom), 0)),
                        (d |= 8));
                    j.y + g.height > e.bottom &&
                        f & 4 &&
                        ((j.y = Math.max(e.bottom - g.height, e.top)), (d |= 2));
                    f & 8 && (d |= (j.y < e.top ? 64 : 0) | (j.y + g.height > e.bottom ? 128 : 0));
                    j = d;
                } else j = 256;
                if (j & 496) return j;
            }
            f = a;
            e = isFirefoxBrowser && (isMac || isX11) && isBrowserVersionBelow("1.9");
            f instanceof B ? ((a = f.x), (f = f.y)) : ((a = f), (f = undefinedVar));
            b.style.left = ve(a, e);
            b.style.top = ve(f, e);
            if (!(c == g || (!c || !g ? 0 : c.width == g.width && c.height == g.height)))
                ((a = Lc(ic(hc(b)))),
                    isIEBrowser && (!a || !isBrowserVersionBelow("8"))
                        ? ((c = b.style),
                          a
                              ? (isIEBrowser
                                    ? ((a = ze(b, ne(b, "paddingLeft"))),
                                      (e = ze(b, ne(b, "paddingRight"))),
                                      (f = ze(b, ne(b, "paddingTop"))),
                                      (d = ze(b, ne(b, "paddingBottom"))),
                                      (a = new je(f, e, d, a)))
                                    : ((a = me(b, "paddingLeft")),
                                      (e = me(b, "paddingRight")),
                                      (f = me(b, "paddingTop")),
                                      (d = me(b, "paddingBottom")),
                                      (a = new je(
                                          parseFloat(f),
                                          parseFloat(e),
                                          parseFloat(d),
                                          parseFloat(a)
                                      ))),
                                isIEBrowser
                                    ? ((e = Be(b, "borderLeft")),
                                      (f = Be(b, "borderRight")),
                                      (d = Be(b, "borderTop")),
                                      (b = Be(b, "borderBottom")),
                                      (b = new je(d, f, b, e)))
                                    : ((e = me(b, "borderLeftWidth")),
                                      (f = me(b, "borderRightWidth")),
                                      (d = me(b, "borderTopWidth")),
                                      (b = me(b, "borderBottomWidth")),
                                      (b = new je(
                                          parseFloat(d),
                                          parseFloat(f),
                                          parseFloat(b),
                                          parseFloat(e)
                                      ))),
                                (c.pixelWidth = g.width - b.left - a.left - a.right - b.right),
                                (c.pixelHeight = g.height - b.top - a.top - a.bottom - b.bottom))
                              : ((c.pixelWidth = g.width), (c.pixelHeight = g.height)))
                        : ((b = b.style),
                          isFirefoxBrowser
                              ? (b.MozBoxSizing = "border-box")
                              : isWebKitBrowser
                                ? (b.WebkitBoxSizing = "border-box")
                                : (b.boxSizing = "border-box"),
                          (b.width = Math.max(g.width, 0) + "px"),
                          (b.height = Math.max(g.height, 0) + "px")));
            return j;
        };

    var delegatedEventRegistry = {},
        supportsTouchEvents = "ontouchstart" in document,
        registerDelegatedHandler = function (eventClass, eventType, callback, maxParents, checkRelatedTarget) {
            eventType in delegatedEventRegistry ||
                ((delegatedEventRegistry[eventType] = new lf()), (delegatedEventRegistry[eventType].maxNumParents = {}), (delegatedEventRegistry[eventType].checkRelatedTarget = {}));
            eventType = delegatedEventRegistry[eventType];
            eventType.gc(eventClass, callback);
            eventType.maxNumParents[eventClass] = maxParents;
            eventType.checkRelatedTarget[eventClass] = checkRelatedTarget;
        },
        getDelegationDepth = function (eventType, className) {
            var c = delegatedEventRegistry[eventType].maxNumParents[className],
                d;
            0 < c ? (d = c) : -1 != eventType.indexOf("mouse") && (d = 2);
            return d;
        },
        findDelegatedTarget = function (className, element, maxDepth) {
            return (
                findAncestor(
                    element,
                    function (el) {
                        return _hasclass(el, className);
                    },
                    trueVar,
                    maxDepth
                ) || nullVar
            );
        },
        handleDelegatedEvent = function (ev) {
            if ("HTML" != ev.target.tagName && ev.type in delegatedEventRegistry) {
                var b = delegatedEventRegistry[ev.type],
                    c;
                for (c in b.da) {
                    var maxDepth = getDelegationDepth(ev.type, c),
                        e = findDelegatedTarget(c, ev.target, maxDepth);
                    if (e) {
                        var f = trueVar;
                        b.checkRelatedTarget[c] &&
                            ev.relatedTarget &&
                            findAncestor(
                                ev.relatedTarget,
                                function (el) {
                                    return el == e;
                                },
                                trueVar,
                                maxDepth
                            ) &&
                            (f = falseVar);
                        f && b.xc(c, e, ev.type, ev);
                    }
                }
            }
        };
    yt_events_listen(document, "blur", handleDelegatedEvent, trueVar);
    yt_events_listen(document, "change", handleDelegatedEvent, trueVar);
    yt_events_listen(document, "click", handleDelegatedEvent);
    yt_events_listen(document, "focus", handleDelegatedEvent, trueVar);
    yt_events_listen(document, "mouseover", handleDelegatedEvent);
    yt_events_listen(document, "mouseout", handleDelegatedEvent);
    yt_events_listen(document, "keydown", handleDelegatedEvent);
    yt_events_listen(document, "keyup", handleDelegatedEvent);
    yt_events_listen(document, "keypress", handleDelegatedEvent);
    yt_events_listen(document, "cut", handleDelegatedEvent);
    yt_events_listen(document, "paste", handleDelegatedEvent);
    supportsTouchEvents &&
        (yt_events_listen(document, "touchstart", handleDelegatedEvent),
        yt_events_listen(document, "touchend", handleDelegatedEvent),
        yt_events_listen(document, "touchcancel", handleDelegatedEvent));

    var yt_uix_widgets_ = (window.yt && window.yt.uix && window.yt.uix.widgets_) || {};
    exportSymbol("yt.uix.widgets_", yt_uix_widgets_);

    var yt_uix_registerWidget = function (widgetClass) {
        var widgetClass = widgetClass.getInstance(),
            widgetName = yt_uix_getWidgetName(widgetClass);
        
        if (!(widgetName in yt_uix_widgets_) && widgetClass.isNotIE6()) {
            widgetClass.M();
            yt_uix_widgets_[widgetName] = widgetClass;
        }
        
    };

    var ih = function () {
        this.L = {};
    };
    n = ih.prototype;
    n.isJscriptIE = !!eval("/*@cc_on!@*/false");
    n.isNotIE6 = function () {
        return trueVar;
    };
    n.addBehavior = function (a, b, c, d, e) {
        var c = yt_uix_getWidgetName(this, c),
            f = goog_bind(b, this);
        registerDelegatedHandler(c, a, f, d, e);
        this.L[b] = f;
    };
    n.wa = function (a, b, c) {
        var d = this.getData(a, b);
        if (d && (d = getProp(d))) {
            var e = Array_slice(arguments, 2);
            Array_splice(e, 0, 0, a);
            d.apply(nullVar, e);
        }
    };
    n.getData = function (a, b) {
        return getDataAttr(a, b);
    };
    n.setData = function (a, b, c) {
        setDataAttr(a, b, c);
    };
    var jh = function (a, b) {
            return Dd(b, yt_uix_getWidgetName(a));
        },
        yt_uix_getWidgetName = function (a, b) {
            return "yt-uix" + (a.K ? "-" + a.K : "") + (b ? "-" + b : "");
        };
    var X = function () {
        this.L = {};
    };
    inherits(X, ih);
    createSingleton(X);
    X.prototype.K = "button";
    X.prototype.M = function () {
        this.addBehavior("click", this.ma);
        this.addBehavior("keydown", this.oc);
        this.addBehavior("keypress", this.Id);
    };
    X.prototype.ma = function (a) {
        if (a && !a.disabled) {
            if (this.getData(a, "button-toggle")) {
                var b = Dd(a, yt_uix_getWidgetName(this, "group"));
                if (b && this.getData(b, "button-toggle-group")) {
                    var b = kc(yt_uix_getWidgetName(this), b),
                        c = yt_uix_getWidgetName(this, "toggled");
                    Array_forEach(b, function (b) {
                        b != a ? _removeclass(b, c) : _addclass(a, c);
                    });
                } else _toggleclass(a, yt_uix_getWidgetName(this, "toggled"));
            }
            kh(this, a) && (lh(this, a), a.focus());
            this.wa(a, "button-action");
        }
    };
    X.prototype.oc = function (a, b, c) {
        if ((b = kh(this, a))) {
            var d = function (a) {
                var b = "";
                a.tagName && (b = a.tagName.toLowerCase());
                return "ul" == b || "table" == b;
            };
            if ((d = d(b) ? b : Fc(b, d))) {
                var d = d.tagName.toLowerCase(),
                    e;
                "ul" == d ? (e = this.Hi) : "table" == d && (e = this.Gi);
                e && mh(this, a, b, c, goog_bind(e, this));
            }
        }
    };
    var mh = function (a, b, c, d, e) {
        var f = yt_style_isDisplayed(c),
            g = 9 == d.keyCode;
        g || 32 == d.keyCode || 13 == d.keyCode
            ? (d = nh(a, c))
                ? ((b = goog_dom_getFirstElementChild(d)), "a" == b.tagName.toLowerCase() ? (window.location = b.href) : Vd(b))
                : g && oh(a, b)
            : f
              ? 27 == d.keyCode
                  ? (nh(a, c), oh(a, b))
                  : e(b, c, d)
              : ((a = _hasclass(b, yt_uix_getWidgetName(a, "reverse")) ? 38 : 40),
                d.keyCode == a && (Vd(b), d.preventDefault()));
    };
    X.prototype.Id = function (a, b, c) {
        a = kh(this, a);
        yt_style_isDisplayed(a) && c.preventDefault();
    };
    var nh = function (a, b) {
            var c = yt_uix_getWidgetName(a, "menu-item-highlight"),
                d = querySelectorHlp(c, b);
            d && _removeclass(d, c);
            return d;
        },
        ph = function (a, b, c) {
            _addclass(c, yt_uix_getWidgetName(a, "menu-item-highlight"));
            b.setAttribute("aria-activedescendant", c.getAttribute("id"));
        };
    X.prototype.Gi = function (a, b, c) {
        var d = nh(this, b),
            b = Ed("table", nullVar, b),
            e = Ed("tr", nullVar, b),
            e = H("td", nullVar, e).length,
            b = H("td", nullVar, b),
            d = qh(d, b, e, c);
        -1 != d && (ph(this, a, b[d]), c.preventDefault());
    };
    X.prototype.Hi = function (a, b, c) {
        if (40 == c.keyCode || 38 == c.keyCode) {
            var d = nh(this, b),
                b = H("li", nullVar, b),
                d = qh(d, b, 1, c);
            ph(this, a, b[d]);
            c.preventDefault();
        }
    };
    var qh = function (a, b, c, d) {
            var e = b.length,
                a = Array_indexOf(b, a);
            if (-1 == a)
                if (38 == d.keyCode) a = e - c;
                else {
                    if (37 == d.keyCode || 38 == d.keyCode || 40 == d.keyCode) a = 0;
                }
            else
                39 == d.keyCode
                    ? (a % c == c - 1 && (a -= c), (a += 1))
                    : 37 == d.keyCode
                      ? (0 == a % c && (a += c), (a -= 1))
                      : 38 == d.keyCode
                        ? (a < c && (a += e), (a -= c))
                        : 40 == d.keyCode && (a >= e - c && (a -= e), (a += c));
            return a;
        },
        lh = function (a, b) {
            var c = kh(a, b),
                d = rh(a, c);
            d && d != b ? (oh(a, d), yt_setTimeout(goog_bind(a.Rd, a, b), 1)) : yt_style_isDisplayed(c) ? oh(a, b) : a.Rd(b);
        };
    X.prototype.Kb = function (a) {
        if (!isWin || !_hasclass(a, yt_uix_getWidgetName(this, "masked"))) return nullVar;
        var b = a.iframeMask;
        b ||
            ((b = document.createElement("iframe")),
            (b.src = 'javascript:""'),
            (b.className = yt_uix_getWidgetName(this, "menu-mask")),
            (a.iframeMask = b));
        return b;
    };
    var sh = function (a, b, c) {
        var d = Dd(b, yt_uix_getWidgetName(a, "group")),
            e = !!a.getData(b, "button-menu-ignore-group"),
            d = d && !e ? d : b,
            e = 5,
            f = 4;
        _hasclass(b, yt_uix_getWidgetName(a, "reverse")) && ((e = 4), (f = 5));
        _hasclass(b, "flip") && (_hasclass(b, yt_uix_getWidgetName(a, "reverse")) ? ((e = 6), (f = 7)) : ((e = 7), (f = 6)));
        var g;
        if (a.getData(b, "button-has-sibling-menu")) {
            var j = qe(d);
            isIEBrowser && !isBrowserVersionBelow("8") && (j = nullVar);
            j && ((g = ye(j)), (g = new je(-g.top, g.left, g.top, -g.left)));
        }
        j = new B(0, 1);
        if ((a = a.Kb(b)))
            ((b = xe(c)),
                (a.style.width = b.width + "px"),
                (a.style.height = b.height + "px"),
                $g(d, e, a, f, j, g));
        $g(d, e, c, f, j, g);
    };
    X.prototype.Rd = function (a) {
        if (a) {
            var b = kh(this, a);
            if (b) {
                a.setAttribute("aria-pressed", "true");
                a.setAttribute("aria-expanded", "true");
                b.originalParentNode = b.parentNode;
                b.activeButtonNode = a;
                b.parentNode.removeChild(b);
                this.getData(a, "button-has-sibling-menu")
                    ? a.parentNode.appendChild(b)
                    : document.body.appendChild(b);
                var c = Dd(a, yt_uix_getWidgetName(this, "group")),
                    d = !!this.getData(a, "button-menu-ignore-group");
                b.style.minWidth = (c && !d ? c.offsetWidth - 2 : a.offsetWidth - 2) + "px";
                (d = this.Kb(a)) && document.body.appendChild(d);
                sh(this, a, b);
                _showdiv(b);
                this.wa(a, "button-menu-action", trueVar);
                _addclass(a, yt_uix_getWidgetName(this, "active"));
                c && _addclass(c, yt_uix_getWidgetName(this, "group-active"));
                c = goog_bind(this.ki, this, a);
                b = yt_events_listen(document, "click", c);
                c = yt_events_listen(document, "contextmenu", c);
                this.setData(a, "button-listener", b);
                this.setData(a, "button-context-menu-listener", c);
            }
        }
    };
    var oh = function (a, b) {
        if (b) {
            var c = kh(a, b);
            if (c) {
                b.setAttribute("aria-pressed", "false");
                b.setAttribute("aria-expanded", "false");
                _hidediv(c);
                a.wa(b, "button-menu-action", falseVar);
                var d = a.Kb(b);
                yt_setTimeout(function () {
                    d && d.parentNode && d.parentNode.removeChild(d);
                    c.originalParentNode &&
                        (c.parentNode.removeChild(c),
                        c.originalParentNode.appendChild(c),
                        (c.originalParentNode = nullVar),
                        (c.activeButtonNode = nullVar));
                }, 1);
            }
            var e = Dd(b, yt_uix_getWidgetName(a, "group"));
            _removeclass(b, yt_uix_getWidgetName(a, "active"));
            e && _removeclass(e, yt_uix_getWidgetName(a, "group-active"));
            if ((e = a.getData(b, "button-listener"))) (yt_removeEventListeners(e), removeDataAttr(b, "button-listener"));
            if ((e = a.getData(b, "button-context-menu-listener")))
                (yt_removeEventListeners(e), removeDataAttr(b, "button-context-menu-listener"));
        }
    };
    X.prototype.getContent = function (a) {
        return querySelectorHlp(yt_uix_getWidgetName(this, "content"), a);
    };
    var rh = function (a, b) {
        return Dd(b.activeButtonNode || b.parentNode, yt_uix_getWidgetName(a));
    };
    X.prototype.ki = function (a, b) {
        var c = yt_events_getTarget(b),
            d = Dd(c, yt_uix_getWidgetName(this));
        if (d) {
            var d = kh(this, d),
                e = kh(this, a);
            if (d == e) return;
        }
        if (!Dd(c, yt_uix_getWidgetName(this, "menu")) || _hasclass(c, yt_uix_getWidgetName(this, "menu-item")) || _hasclass(c, yt_uix_getWidgetName(this, "menu-close")))
            if (
                (oh(this, a),
                (d = Dd(c, yt_uix_getWidgetName(this, "menu"))) && this.getData(a, "button-menu-indicate-selected"))
            )
                ((e = querySelectorHlp(yt_uix_getWidgetName(this, "content"), a)),
                    Dc(e, Jc(c)),
                    (e = yt_uix_getWidgetName(this, "menu-item-selected")),
                    (d = querySelectorHlp(e, d)) && _removeclass(d, e),
                    _addclass(c.parentNode, e));
    };
    var kh = function (a, b) {
        if (!b.widgetMenu) {
            var c = a.getData(b, "button-menu-id"),
                c = c && _gel(c),
                d = yt_uix_getWidgetName(a, "menu");
            c ? _addclass(c, d) : (c = querySelectorHlp(d, b));
            b.widgetMenu = c;
        }
        return b.widgetMenu;
    };
    var th = function () {
        this.L = {};
    };
    inherits(th, ih);
    createSingleton(th);
    th.prototype.K = "expander";
    th.prototype.M = function () {
        this.addBehavior("click", this.ma, "head");
        this.addBehavior("keypress", this.Id, "head");
    };
    th.prototype.ma = function (a) {
        uh(this, a);
    };
    th.prototype.Id = function (a, b, c) {
        c && 13 == c.keyCode && uh(this, a);
    };
    var uh = function (a, b) {
        var c = jh(a, b);
        c && (_toggleclass(c, yt_uix_getWidgetName(a, "collapsed")), a.wa(c, "expander-action"));
    };
    th.prototype.collapse = function (a) {
        if ((a = jh(this, a))) (_addclass(a, yt_uix_getWidgetName(this, "collapsed")), this.wa(a, "expander-action"));
    };
    th.prototype.expand = function (a) {
        if ((a = jh(this, a))) (_removeclass(a, yt_uix_getWidgetName(this, "collapsed")), this.wa(a, "expander-action"));
    };
    th.prototype.Ma = function (a) {
        return querySelectorHlp(yt_uix_getWidgetName(this, "body"), a);
    };
    !isIEBrowser || isIEBrowserVerGreaterOrEq(9);
    !isIEBrowser || isIEBrowserVerGreaterOrEq(9);
    isIEBrowser && isBrowserVersionBelow("8");
    !isWebKitBrowser || isBrowserVersionBelow("528");
    (isFirefoxBrowser && isBrowserVersionBelow("1.9b")) || (isIEBrowser && isBrowserVersionBelow("8")) || (isOperaBrowser && isBrowserVersionBelow("9.5")) || (isWebKitBrowser && isBrowserVersionBelow("528"));
    (isFirefoxBrowser && !isBrowserVersionBelow("8")) || (isIEBrowser && isBrowserVersionBelow("9"));
    var vh = thisVar.window,
        wh = function (a, b) {
            "function" == getTypeof(a)
                ? b && (a = goog_bind(a, b))
                : a && "function" == typeof a.handleEvent
                  ? (a = goog_bind(a.handleEvent, a))
                  : throwEx(Error("Invalid listener argument"));
            vh.setTimeout(a, 200);
        };
    var xh = function () {
        this.L = {};
    };
    inherits(xh, ih);
    createSingleton(xh);
    n = xh.prototype;
    n.K = "tooltip";
    n.yc = 0;
    n.M = function () {
        this.addBehavior("mouseover", this.cb);
        this.addBehavior("mouseout", this.Lb);
        this.addBehavior("click", this.Lb);
        this.addBehavior("touchstart", this.Cd);
        this.addBehavior("touchend", this.tc);
        this.addBehavior("touchcancel", this.tc);
    };
    n.isNotIE6 = function () {
        return !(this.isJscriptIE && 0 == browserVersionStr.indexOf("6"));
    };
    n.cb = function (a) {
        if (!(this.yc && 1e3 > oa() - this.yc)) {
            var b = parseInt(this.getData(a, "tooltip-hide-timer"), 10);
            b && (removeDataAttr(a, "tooltip-hide-timer"), yt_clearTimeout(b));
            var b = goog_bind(function () {
                    yh(this, a);
                    removeDataAttr(a, "tooltip-show-timer");
                }, this),
                c = parseInt(this.getData(a, "tooltip-show-delay"), 10) || 0,
                b = yt_setTimeout(b, c);
            this.setData(a, "tooltip-show-timer", b.toString());
            a.title && (this.setData(a, "tooltip-text", a.title), (a.title = ""));
        }
    };
    n.Lb = function (a) {
        var b = parseInt(this.getData(a, "tooltip-show-timer"), 10);
        b && (yt_clearTimeout(b), removeDataAttr(a, "tooltip-show-timer"));
        b = goog_bind(function () {
            zh(this, a);
            removeDataAttr(a, "tooltip-hide-timer");
        }, this);
        b = yt_setTimeout(b, 50);
        this.setData(a, "tooltip-hide-timer", b.toString());
        if ((b = this.getData(a, "tooltip-text"))) a.title = b;
    };
    n.Cd = function (a, b, c) {
        this.yc = 0;
        this.cb(findDelegatedTarget(yt_uix_getWidgetName(this), c.changedTouches[0].target, getDelegationDepth(b, yt_uix_getWidgetName(this))), b);
    };
    n.tc = function (a, b, c) {
        this.yc = oa();
        this.Lb(findDelegatedTarget(yt_uix_getWidgetName(this), c.changedTouches[0].target, getDelegationDepth(b, yt_uix_getWidgetName(this))), b);
    };
    var Ah = function (a, b, c, d) {
        a.setData(b, "tooltip-text", c);
        var e = a.getData(b, "content-id");
        if ((e = _gel(e))) ((e.innerHTML = c), d && zh(a, b));
    };
    xh.prototype.Ab = function (a) {
        return this.getData(a, "tooltip-text") || a.title;
    };
    var yh = function (a, b) {
        if (b) {
            var c = a.Ab(b);
            if (c) {
                var d = _gel(Bh(a, b));
                if (!d) {
                    d = document.createElement("div");
                    d.id = Bh(a, b);
                    d.className = yt_uix_getWidgetName(a, "tip");
                    var e = document.createElement("div");
                    e.className = yt_uix_getWidgetName(a, "tip-body");
                    var f = document.createElement("div");
                    f.className = yt_uix_getWidgetName(a, "tip-arrow");
                    var g = document.createElement("div");
                    g.className = yt_uix_getWidgetName(a, "tip-content");
                    var j = a.Kb(b),
                        o = Bh(a, b, "content");
                    g.id = o;
                    a.setData(b, "content-id", o);
                    e.appendChild(g);
                    j && d.appendChild(j);
                    d.appendChild(e);
                    d.appendChild(f);
                    (Id() || document.body).appendChild(d);
                    Ah(a, b, c);
                    if ((c = parseInt(a.getData(b, "tooltip-max-width"), 10)) && e.offsetWidth > c)
                        ((e.style.width = c + "px"), _addclass(g, yt_uix_getWidgetName(a, "normal-wrap")));
                    g = _hasclass(b, yt_uix_getWidgetName(a, "reverse"));
                    a.Md(b, d, e, j, f, g) || a.Md(b, d, e, j, f, !g);
                    var x = yt_uix_getWidgetName(a, "tip-visible");
                    yt_setTimeout(function () {
                        _addclass(d, x);
                    }, 0);
                }
            }
        }
    };
    xh.prototype.Md = function (a, b, c, d, e, f) {
        A(b, yt_uix_getWidgetName(this, "tip-reverse"), f);
        var g = 0;
        f && (g = 1);
        var e = xe(a),
            f = new B((e.width - 10) / 2, f ? e.height : 0),
            j = re(a);
        Zg(new B(j.x + f.x, j.y + f.y), b, g);
        var g = oc(window),
            j = ue(b),
            b = xe(c),
            o = b.width / 2;
        d &&
            ((d.style.left = "3px"),
            (d.style.height = b.height + "px"),
            (d.style.width = b.width + "px"));
        d = !!(g.height < j.y + e.height);
        e = !!(j.y < e.height);
        f = !!(j.x < o);
        g = !!(g.width < j.x + o);
        j = (b.width + 3) / -2 - -5;
        a = this.getData(a, "force-tooltip-direction");
        if ("left" == a || f) j = -5;
        else if ("right" == a || g) j = 20 - b.width - 3;
        c.style.left = j + "px";
        return !(d || e);
    };
    var zh = function (a, b) {
            if (b) {
                var c = _gel(Bh(a, b));
                c && (Ch(c), zc(c), removeDataAttr(b, "content-id"));
            }
        },
        Bh = function (a, b, c) {
            a = yt_uix_getWidgetName(a) + getElementUid(b);
            c && (a += "-" + c);
            return a;
        };
    xh.prototype.Kb = function (a) {
        var b = nullVar;
        isWin &&
            _hasclass(a, yt_uix_getWidgetName(this, "masked")) &&
            ((b = _gel("yt-uix-tooltip-shared-mask"))
                ? (b.parentNode.removeChild(b), _showdiv(b))
                : ((b = document.createElement("iframe")),
                  (b.src = 'javascript:""'),
                  (b.id = "yt-uix-tooltip-shared-mask"),
                  (b.className = yt_uix_getWidgetName(this, "tip-mask"))));
        return b;
    };
    var Ch = function (a) {
        var b = _gel("yt-uix-tooltip-shared-mask"),
            c =
                b &&
                findAncestor(
                    b,
                    function (b) {
                        return b == a;
                    },
                    falseVar,
                    2
                );
        b && c && (b.parentNode.removeChild(b), _hidediv(b), document.body.appendChild(b));
    };
    var Dh = function () {
        this.L = {};
    };
    inherits(Dh, xh);
    createSingleton(Dh);
    n = Dh.prototype;
    n.K = "range-tooltip";
    n.Ib = nullVar;
    n.format = nullVar;
    n.max = 0;
    n.df = 0;
    n.cf = 0;
    n.sc = nullVar;
    n.Ab = function () {
        return " ";
    };
    n.Md = function (a, b) {
        this.Ib = b;
        var c = this.getData(a, this.K + "-format");
        c && (this.format = getProp(c));
        this.max = parseInt(this.getData(a, "range-max"), 10);
        this.df = re(a).x;
        this.cf = xe(a).width;
    };
    n.M = function () {
        xh.prototype.M.call(this);
        this.addBehavior("mousemove", this.af);
        this.addBehavior("touchmove", this.bf);
    };
    n.cb = function (a, b) {
        this.rf || (xh.prototype.cb.call(this, a, b), yt_events_listen(document, "mousemove", handleDelegatedEvent));
    };
    n.Lb = function (a, b) {
        xh.prototype.Lb.call(this, a, b);
        yt_events_unlisten(document, "mousemove", handleDelegatedEvent);
    };
    n.Cd = function (a, b, c) {
        this.sc ||
            ((this.sc = c.changedTouches[0].identifier),
            xh.prototype.Cd.call(this, a, b, c),
            yt_events_listen(document, "touchmove", handleDelegatedEvent),
            this.bf(0, b, c));
    };
    n.tc = function (a, b, c) {
        xh.prototype.tc.call(this, a, b, c);
        yt_events_unlisten(document, "touchmove", handleDelegatedEvent);
        this.rf = trueVar;
        wh(function () {
            this.rf = falseVar;
        }, this);
        this.sc = nullVar;
    };
    n.af = function (a, b, c) {
        if (this.Ib) {
            b = (c.pageX - this.df) / this.cf;
            b = Math.min(Math.max(b, 0), 1);
            b *= this.max;
            this.format && (b = this.format(b));
            Ah(this, a, b);
            var b = querySelectorHlp(yt_uix_getWidgetName(this, "tip-body"), this.Ib),
                d = this.Ib,
                e = new B(-5, 0),
                a = re(a);
            Zg(new B(c.pageX + e.x, a.y + e.y), d, 0);
            c = (xe(b).width + 3) / -2 - -5;
            b.style.left = c + "px";
        }
    };
    n.bf = function (a, b, c) {
        if (this.Ib)
            for (a = 0; a < c.changedTouches.length; a++) {
                var d = c.changedTouches[a];
                if (d.identifier == this.sc) {
                    c.pageX = d.pageX;
                    c.pageY = d.pageY;
                    this.af(findDelegatedTarget(yt_uix_getWidgetName(this), d.target, getDelegationDepth(b, yt_uix_getWidgetName(this))), 0, c);
                    break;
                }
            }
    };
    var yt_window_redirect = function (a, b, c) {
            window.location = yt_uri_appendQueryData(a, b || {}) + (c || "");
        },
        yt_window_popup = function (a, b) {
            var c = b || {};
            c.target = c.target || a.target || "YouTube";
            c.width = c.width || 600;
            c.height = c.height || 600;
            var d = c;
            d || (d = {});
            var e = window,
                c = "undefined" != typeof a.href ? a.href : "" + a,
                f = d.target || a.target,
                g = [],
                j;
            for (j in d)
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
            j = g.join(",");
            if (d.noreferrer) {
                if ((d = e.open("", f, j)))
                    (isIEBrowser && -1 != c.indexOf(";") && (c = "'" + c.replace(/'/g, "%27") + "'"),
                        (d.opener = nullVar),
                        isWebKitBrowser
                            ? (d.location.href = c)
                            : ((c = xmlEscape(c)),
                              d.document.write(
                                  '<META HTTP-EQUIV="refresh" content="0; url=' + c + '">'
                              ),
                              d.document.close()));
            } else d = e.open(c, f, j);
            c = d;
            if (!c) return trueVar;
            c.opener || (c.opener = window);
            c.focus();
            return falseVar;
        };
    var Gh = function () {
        this.L = {};
    };
    inherits(Gh, ih);
    createSingleton(Gh);
    n = Gh.prototype;
    n.K = "overlay";
    n.M = function () {
        this.addBehavior("click", this.vf, "target");
        this.addBehavior("click", this.uc, "close");
    };
    n.vf = function (a) {
        if ((a = jh(this, a))) {
            var b = yt_uix_getWidgetName(this, "fg"),
                c = _gel(b);
            if (!c) {
                var d = this.rb(a);
                if (d) {
                    c = document.createElement("div");
                    c.id = b;
                    c.className = b;
                    b = this.getData(a, "overlay-class") || "";
                    _addclass(c, b);
                    var e = document.createElement("div");
                    e.className = yt_uix_getWidgetName(this, "fg-content");
                    var b = document.createElement("div"),
                        f = yt_uix_getWidgetName(this, "base");
                    b.id = f;
                    _addclass(b, f);
                    var g = yt_uix_getWidgetName(this, "bg"),
                        f = document.createElement("div");
                    f.id = g;
                    f.className = g;
                    f.style.height = pc() + "px";
                    g = document.createElement("span");
                    _addclass(g, yt_uix_getWidgetName(this, "align"));
                    b.appendChild(g);
                    e.innerHTML = d.innerHTML;
                    d = H("iframe", nullVar, e);
                    Array_forEach(
                        d,
                        function (a) {
                            var b = this.getData(a, "onload");
                            b &&
                                ((b = getProp(b)) && yt_events_listen(a, "load", b),
                                (a.src = this.getData(a, "src") || a.src));
                        },
                        this
                    );
                    c.appendChild(e);
                    d = document.getElementsByTagName("embed");
                    e = document.getElementsByTagName("object");
                    g = goog_bind(function (a) {
                        var b = a.style.visibility;
                        "hidden" != b &&
                            (this.setData(a, "overlay-hidden", "true"),
                            b && this.setData(a, "overlay-visibility-value", b),
                            (a.style.visibility = "hidden"));
                    }, this);
                    Array_forEach(d, g);
                    Array_forEach(e, g);
                    b.appendChild(c);
                    document.body.appendChild(f);
                    document.body.appendChild(b);
                    this.getData(a, "disable-shortcuts") ||
                        ((c = goog_bind(function (a) {
                            _hasclass(a.target, yt_uix_getWidgetName(this, "base")) && this.uc();
                        }, this)),
                        yt_events_listen(b, "click", c),
                        yt_events_listen(document, "keydown", goog_bind(this.oc, this)));
                    this.wa(a, "overlay-shown");
                }
            }
        }
    };
    n.uc = function () {
        var a = yt_uix_getWidgetName(this, "bg"),
            b = _gel(yt_uix_getWidgetName(this, "fg"));
        if (b) {
            if (_hasclass(b, yt_uix_getWidgetName(this, "unclosable"))) return;
            _hidediv(b);
            document.body.removeChild(b.parentNode);
        }
        (a = _gel(a)) && document.body.removeChild(a);
        var a = document.getElementsByTagName("embed"),
            b = document.getElementsByTagName("object"),
            c = goog_bind(function (a) {
                if (this.getData(a, "overlay-hidden")) {
                    removeDataAttr(a, "overlay-hidden");
                    var b = this.getData(a, "overlay-visibility-value");
                    a.style.visibility = b ? b : nullVar;
                }
            }, this);
        Array_forEach(a, c);
        Array_forEach(b, c);
        yt_events_unlisten(document, "keydown", goog_bind(this.oc, this));
    };
    n.oc = function (a) {
        27 == a.keyCode && this.uc();
    };
    n.rb = function (a) {
        return querySelectorHlp(yt_uix_getWidgetName(this, "content"), a);
    };
    n.Z = function () {
        this.uc();
    };
    n.show = function (a) {
        this.vf(a);
    };
    var Hh = {
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
    var Ih = ["FL", "LL", "QL", "SV", "WL"],
        Jh = function () {
            return parseInt(yt_getConfig("SHUFFLE_VALUE"), 10) || 0;
        };
    var Kh = function () {
            var a = yt_net_cookies_get("watch_queue_new");
            return a ? a.split(",") : [];
        },
        Lh = function (a) {
            a = Array_slice(a, 0, 100);
            (a = a.join(",")) ? yt_net_cookies_set("watch_queue_new", a) : yt_net_cookies_remove("watch_queue_new");
        },
        Mh = function (a) {
            var b = Kh();
            Array_extend(b, a);
            Lh(b);
        };
    var Nh = function (a, b) {
        a.length &&
            ajaxRequest("/video_info_ajax", {
                method: "POST",
                g: { action_get_videos_data: 1, count: a.length },
                n: { video_ids: a.join(",") },
                f: function (a, d) {
                    d.data && b(d.data);
                }
            });
    };
    var Oh = function (a) {
        var b = Jh(),
            c = function (a) {
                for (var c = 1, d = [], a = a.split(""); a.length; ) {
                    var c = (b + c) % a.length,
                        e = a[c];
                    Array_removeAt(a, c);
                    d.push(e);
                }
                return d.join("");
            },
            d = [];
        Array_forEach(a, function (a, b) {
            d.push({ id: a, key: c(a), index: b });
        });
        Array_sortObjectsByKey(d);
        var e = b >> 8;
        Array_find(d, function (a) {
            return e == a.index;
        });
        a = Array_slice(d, e).concat(Array_slice(d, 0, e));
        return Array_map(a, function (a) {
            return { id: a.id, od: a.index };
        });
    };
    var Y = function (a, b, c) {
            this.ia = a;
            this.G = b;
            this.ha = this.Rb = falseVar;
            this.Oc = new lf();
            this.D = c || [];
            this.lb = {};
            this.Qb = !c;
            this.jb = "";
            this.F = -1;
            this.nb = 1;
            this.Pb = this.ja = 0;
            this.hb = this.ib = "";
            this.Ga = this.Sa = this.ya = nullVar;
        },
        Ph = function (a) {
            a.Oc.xc("LIST_UPDATED");
        };
    Y.prototype.isEqual = function (a) {
        return this.ia != a.ia ? falseVar : this.Ba() == a.Ba();
    };
    Y.prototype.ld = function (a) {
        this.jb = a.jb || "";
        this.F = a.X();
        this.ja = a.ja;
        this.nb = a.nb;
        this.ib = a.ib;
        this.hb = a.hb;
    };
    Y.prototype.qa = function () {
        return this.ia;
    };
    Y.prototype.Ba = function () {
        return this.ia + (this.G || "");
    };
    var Rh = function (a, b) {
            return (
                Qh(a, "occurrences", function () {
                    var a = {};
                    Array_forEach(this.sa(), function (b) {
                        a[b] = (a[b] || 0) + 1;
                    });
                    return a;
                })[b] || 0
            );
        },
        Th = function (a) {
            return a.Y() ? Sh(a) : a.sa();
        };
    Y.prototype.td = function (a) {
        var b = Th(this);
        if (!b.length) return "";
        a = this.X() + a;
        a >= b.length && (a %= b.length);
        return b[a];
    };
    var Uh = function (a, b) {
        var c = Th(a);
        return Array_map(b, function (a) {
            return Array_findIndexRight(c, function (b) {
                return b == a;
            });
        });
    };
    Y.prototype.sa = function () {
        return Array_clone(this.D);
    };
    var Sh = function (a) {
            return Qh(a, "shuffled_ids", function () {
                return Array_map(Vh(this), function (a) {
                    return a.id;
                });
            });
        },
        Vh = function (a) {
            return Qh(a, "shuffled_videos", function () {
                var a = this.sa();
                return Oh(a);
            });
        };
    n = Y.prototype;
    n.getVideoData = function (a) {
        return this.lb[a] || {};
    };
    n.N = function () {
        return this.sa().length;
    };
    n.X = function () {
        return this.Y()
            ? Array_find(
                  Vh(this),
                  function (a) {
                      return a.od == this.F;
                  },
                  this
              )
            : this.F;
    };
    n.Y = function () {
        return 0 < this.ja;
    };
    n.pa = function () {
        return 0 <= this.F;
    };
    n.mb = function () {
        return !!this.Rb;
    };
    n.Sc = function () {
        return !!yt_getConfig("LIST_COPY_ON_EDIT_ENABLED");
    };
    n.Va = function () {
        return falseVar;
    };
    var Wh = function (a) {
            a.ya = nullVar;
            a.Sa = nullVar;
        },
        Yh = function (a, b) {
            var c = a.X() - 1;
            0 > c && (c = a.N() - 1);
            return Xh(a, c, falseVar, b);
        },
        Xh = function (a, b, c, d) {
            var e = Th(a)[b];
            if (!e) return nullVar;
            var f = { v: e };
            1 < Rh(a, e) && ((e = b + 1 + a.Pb), a.Y() && (e = Vh(a)[b].od + 1), (f.index = e));
            c && (f.playnext = a.nb);
            a.Y() && (f.shuffle = a.ja);
            d && (f.feature = d);
            return Ue(a.jb, f);
        };
    Y.prototype.clear = function () {
        this.yf();
        Ph(this);
    };
    Y.prototype.removeItem = function (a) {
        this.Y() && (a = Vh(this)[a].od);
        var b = this.sa()[a];
        this.Re(a);
        this.F > a ? (this.F -= 1) : this.F == a && (this.F = -1);
        Ph(this);
        return b;
    };
    Y.prototype.Re = function (a) {
        var b = this.D[a];
        Array_removeAt(this.D, a);
        ajaxRequest(this.ac(), {
            format: "XML",
            method: "POST",
            n: {
                video_ids: b,
                session_token: yt_net_ajax_tokenMap_.addto_ajax || "",
                playlist_id: this.G || "",
                index: a
            },
            f: function (a, b) {
                this.ya = b.html_content;
            },
            B: function (a, b) {
                this.Sa = b.error_message || yt_getMsg("ERROR_OCCURRED");
            },
            ga: function () {
                Ph(this);
            },
            j: this
        });
    };
    Y.prototype.load = function (a) {
        this.Qb && !this.Rb ? Zh(this, a) : a && (Ph(this), a());
        $h(this);
    };
    var $h = function (a) {
            var b = Th(a),
                b = Array_filter(
                    b,
                    function (a) {
                        return !(a in this.lb);
                    },
                    a
                );
            Array_forEach(
                b,
                function (a) {
                    this.lb[a] = {};
                },
                a
            );
            Nh(
                b,
                goog_bind(function (a) {
                    for (var b in a) this.lb[b] = a[b];
                    Ph(this);
                }, a)
            );
        },
        Zh = function (a, b, c) {
            a.Rb = trueVar;
            a.Qb = falseVar;
            var d = { style: "bottomfeedr_json", action_get_list: 1, list: a.Ba() };
            c && Bb(d, c);
            ajaxRequest("/list_ajax", {
                g: d,
                f: function (a, b) {
                    var c = b.data;
                    this.D = Array_clone(c.videos);
                    this.G = c.list_id;
                    this.ha = !!c.editable;
                    this.jb = c.video_url || "";
                    this.ib = c.menu_title_html;
                    this.hb = c.menu_html;
                    this.Pb = c.index_offset;
                    var c = c.video_data,
                        d;
                    for (d in c) this.lb[d] = c[d];
                },
                B: function () {},
                ga: function () {
                    this.Rb = falseVar;
                    $h(this);
                    Ph(this);
                    b && b();
                },
                j: a
            });
        },
        ai = function (a, b, c) {
            a.Ga = {};
            try {
                b.call(c);
            } finally {
                a.Ga = nullVar;
            }
        },
        Qh = function (a, b, c) {
            if (a.Ga && b in a.Ga) return a.Ga[b];
            c = c.call(a);
            a.Ga && (a.Ga[b] = c);
            return c;
        };
    var bi = function (a, b) {
        Y.call(this, "FL", a, b);
    };
    inherits(bi, Y);
    bi.prototype.ac = function () {
        return "/addto_ajax?action_delete_from_favorites=1";
    };
    var ci = function (a, b) {
        Y.call(this, "LL", a, b);
    };
    inherits(ci, Y);
    ci.prototype.ac = function () {
        return "/addto_ajax?action_delete_from_liked=1";
    };
    var di = function (a, b) {
        Y.call(this, "ML", a, b);
    };
    inherits(di, Y);
    di.prototype.Sc = function () {
        return !!this.ha;
    };
    di.prototype.Va = function () {
        return !!this.ha;
    };
    var ei = function (a, b, c) {
        Y.call(this, a, b, c);
    };
    inherits(ei, Y);
    n = ei.prototype;
    n.Wc = function (a) {
        Array_extend(this.D, a);
        ajaxRequest("/addto_ajax", {
            format: "XML",
            method: "POST",
            g: { action_add_to_playlist: 1 },
            n: { playlist_id: this.G, video_ids: a.join(","), session_token: yt_net_ajax_tokenMap_.addto_ajax },
            B: function () {
                this.Sa = yt_getMsg("ERROR_OCCURRED");
                Ph(this);
            },
            j: this
        });
    };
    n.ac = function () {
        return "/addto_ajax?action_delete_from_playlist=1";
    };
    n.yf = function () {
        var a = this.D.length;
        Array_clear(this.D);
        ajaxRequest("/addto_ajax", {
            format: "XML",
            method: "POST",
            g: { action_clear_playlist: 1, list_length: a, type: this.ia },
            n: { playlist_id: this.G, session_token: yt_net_ajax_tokenMap_.addto_ajax },
            B: function () {
                this.Sa = yt_getMsg("ERROR_OCCURRED");
                Ph(this);
            },
            j: this
        });
    };
    n.ye = function (a, b) {
        var c = this.D[a];
        Array_removeAt(this.D, a);
        Array_splice(this.D, b, 0, c);
        var d = Array_clone(this.D);
        ajaxRequest("/addto_ajax?action_move_playlist_video=1", {
            format: "XML",
            method: "POST",
            n: {
                video_ids: c,
                playlist_id: this.G,
                source_index: a,
                target_index: b,
                session_token: yt_net_ajax_tokenMap_.addto_ajax
            },
            B: function () {
                var e;
                a: if (((e = this.D), !isArrayLike(e) || !isArrayLike(d) || e.length != d.length)) e = falseVar;
                else {
                    for (var f = e.length, g = 0; g < f; g++)
                        if (e[g] !== d[g]) {
                            e = falseVar;
                            break a;
                        }
                    e = trueVar;
                }
                e && (Array_removeAt(this.D, b), Array_splice(this.D, a, 0, c));
                this.Sa = yt_getMsg("ERROR_OCCURRED");
                Ph(this);
            },
            j: this
        });
    };
    n.Va = function () {
        return !!this.ha;
    };
    var fi = function (a) {
        Y.call(this, "QL", nullVar);
        this.ha = trueVar;
        this.Qb = !a;
    };
    inherits(fi, Y);
    n = fi.prototype;
    n.ld = function (a) {
        fi.Ue.ld.call(this, a);
        this.Qb = falseVar;
    };
    n.sa = function () {
        return Kh();
    };
    n.Wc = function (a) {
        Mh(a);
    };
    n.Re = function (a) {
        var b = Th(this)[a],
            a = Kh(),
            b = Array_indexOf(a, b);
        0 <= b && (Array_removeAt(a, b), Lh(a));
    };
    n.yf = function () {
        Lh([]);
    };
    n.ye = function (a, b) {
        var c = Kh(),
            d = c[a];
        Array_removeAt(c, a);
        Array_splice(c, b, 0, d);
        Lh(c);
    };
    n.Va = function () {
        return !!this.ha;
    };
    var gi = function (a, b) {
        Y.call(this, "SV", a, b);
        this.ha = trueVar;
    };
    inherits(gi, Y);
    gi.prototype.load = function (a) {
        gi.Ue.load.call(this, a);
        !this.mb() &&
            this.pa() &&
            ((a = Th(this)), this.X() >= a.length - 1 && Zh(this, nullVar, { load_more: "1" }));
    };
    gi.prototype.ac = function () {
        return "/addto_ajax?action_delete_from_station=1";
    };
    var hi = function (a, b, c) {
        var d = nullVar;
        switch (a) {
            case "PL":
            case "SP":
            case "BP":
            case "WL":
                d = new ei(a, b, c);
                break;
            case "FL":
                d = new bi(b, c);
                break;
            case "LL":
                d = new ci(b, c);
                break;
            case "AV":
            case "BB":
            case "ML":
            case "MC":
                d = new di(b, c);
                break;
            case "QL":
                d = new fi();
                break;
            case "SV":
                d = new gi(b, c);
                break;
            default:
                d = new Y(a, b, c);
        }
        return d;
    };
    var ii = 0,
        ji = 0,
        ki = 0,
        li = 0,
        mi = falseVar,
        ni = function () {
            var a = oc(window);
            return qc(document).y + a.height + ji;
        },
        pi = function () {
            var a = ni(),
                b = ki;
            li = a;
            var c = Math.abs(b - a);
            if (!b || 400 <= c) {
                c = oi(a);
                for (b = oi(b); b < c; ) (yt_net_delayed_load("thumb-group-" + c), c--);
                ki = a;
            }
        },
        ri = function () {
            for (var a = oi(li); 0 <= a; a--) yt_net_delayed_load("thumb-group-" + a);
        },
        ti = function (a) {
            si(function (a, c) {
                var d = getDataAttr(a, "group-key");
                d && (Qg(a, d), removeDataAttr(a, "group-key"));
                a.src = c;
            }, a);
        },
        ui = function (a, b) {
            mi &&
                si(function (a, d) {
                    var e = getDataAttr(a, "group-key");
                    if (!(getDataAttr(a, "thumb-manual") || (e && !b))) {
                        e && Qg(a, e);
                        if ((e = _gel(a))) {
                            var f = 0,
                                g = 0;
                            if (e.offsetParent) {
                                do ((f += e.offsetLeft), (g += e.offsetTop));
                                while ((e = e.offsetParent));
                            }
                            e = new B(f, g);
                        } else e = nullVar;
                        e = "thumb-group-" + oi(e.y);
                        yt_net_delayed_register(a, d, e);
                        setDataAttr(a, "group-key", e);
                    }
                }, a);
        },
        si = function (a, b) {
            var c = H("img", nullVar, b);
            Array_forEach(c, function (b) {
                var c = getDataAttr(b, "thumb");
                c && a.call(thisVar, b, c);
            });
        },
        oi = function (a) {
            return Math.ceil(Math.max(0, a - ii) / 400);
        };
    isIEBrowser || (isFirefoxBrowser && isBrowserVersionBelow("1.9.3"));
    new lf();
    var wi = function (a, b) {
            this.wf = a;
            var c = b || nullVar;
            c || (c = vi(this.wf));
            c = fstring("__%s__", "(" + c.join("|") + ")");
            this.Di = RegExp(c, "g");
        },
        xi = /__([a-z]+(?:_[a-z]+)*)__/g,
        yi = function (a, b) {
            var c = _gel(a).innerHTML,
                c = c.replace(/^\s*(<\!--\s*)?/, ""),
                c = c.replace(/(\s*--\>)?\s*$/, "");
            return new wi(c, b);
        },
        vi = function (a) {
            var b = [],
                c = {};
            a.replace(xi, function (a, e) {
                e in c || ((c[e] = trueVar), b.push(e));
            });
            return b;
        };
    wi.prototype.qb = function (a, b, c) {
        return this.wf.replace(
            this.Di,
            goog_bind(function (d, e) {
                b && (e = b(e));
                return c ? a[e] || "" : xmlEscape(a[e] || "");
            }, this)
        );
    };
    var zi = function () {
        this.L = {};
    };
    inherits(zi, ih);
    createSingleton(zi);
    n = zi.prototype;
    n.K = "slider";
    n.M = function () {
        this.addBehavior("click", this.ti, "num");
        this.addBehavior("click", this.ui, "prev");
        this.addBehavior("click", this.si, "next");
        this.addBehavior("mouseover", this.cb, "ajax-trigger");
    };
    n.ti = function (a) {
        if (a) {
            var b = jh(this, a),
                a = parseInt(this.getData(a, "slider-num"), 10);
            if (isNaN(a) || 0 > a) a = 0;
            this.zc(b, a);
        }
    };
    n.si = function (a, b, c) {
        if (a) {
            a = jh(this, a);
            if (_hasclass(a, yt_uix_getWidgetName(this, "fluid"))) {
                if (a) {
                    var d = this.Ma(a),
                        e = Ai(this, Bi(this, d)),
                        f = 0 < e.length,
                        b = parseInt(this.getData(a, "scroll-offset"), 10);
                    if (isNaN(b) || 0 < b) b = 0;
                    var g = d.offsetWidth;
                    f
                        ? ((d = Ci(e)),
                          (g = Math.floor(g / d)),
                          (b = Math.abs(Math.floor(b / d)) - 1),
                          Di(this, a, (0 <= b ? b : 0) + g))
                        : (this.isJscriptIE && 8 > document.documentMode
                              ? Math.abs(b - g) < d.scrollWidth && (b -= g)
                              : d.offsetWidth < d.scrollWidth && (b -= g),
                          Ei(this, a, b));
                }
            } else if (a) {
                b = parseInt(this.getData(a, "slider-current"), 10);
                if (isNaN(b) || 0 > b) b = 0;
                g = parseInt(this.getData(a, "slider-slides"), 10);
                if (isNaN(g) || 0 > g) g = 0;
                b = Math.min(b + 1, g - 1);
                this.zc(a, b);
            }
            c.preventDefault();
        }
    };
    n.ui = function (a, b, c) {
        if (a) {
            a = jh(this, a);
            if (_hasclass(a, yt_uix_getWidgetName(this, "fluid"))) {
                if (a) {
                    var d = this.Ma(a),
                        e = Ai(this, Bi(this, d)),
                        f = 0 < e.length,
                        b = parseInt(this.getData(a, "scroll-offset"), 10);
                    if (isNaN(b) || 0 < b) b = 0;
                    d = d.offsetWidth;
                    f
                        ? ((e = Ci(e)),
                          (f = Math.floor(d / e)),
                          (b = Math.abs(Math.floor(b / e)) - 1),
                          Di(this, a, (0 <= b ? b : 0) - f))
                        : ((b += d), 0 < b && (b = 0), Ei(this, a, b));
                }
            } else if (a) {
                b = parseInt(this.getData(a, "slider-current"), 10);
                if (isNaN(b) || 0 > b) b = 0;
                b = Math.max(b - 1, 0);
                this.zc(a, b);
            }
            c.preventDefault();
        }
    };
    n.cb = function (a) {
        if ((a = jh(this, a))) {
            var b = yt_uix_getWidgetName(this, "ajax-trigger"),
                c = kc(b, a);
            Array_forEach(c, function (a) {
                _removeclass(a, b);
            });
            Fi(this, a);
        }
    };
    var Fi = function (a, b, c) {
        var d = a.getData(b, "slider-ajax-url");
        d &&
            !a.getData(b, "slider-loaded") &&
            (a.setData(b, "slider-loaded", "true"),
            ajaxRequest(d, {
                j: a,
                f: function (a, d) {
                    var g = wc(d.slides_html),
                        j = querySelectorHlp(yt_uix_getWidgetName(this, "slides"), b);
                    j && g && xc(j, g);
                    c && c();
                }
            }));
    };
    zi.prototype.zc = function (a, b) {
        a &&
            (this.getData(a, "slider-ajax-url") && !this.getData(a, "slider-loaded")
                ? Fi(this, a, goog_bind(this.zc, this, a, b))
                : Gi(this, a, b));
    };
    var Gi = function (a, b, c) {
            var d = H(nullVar, yt_uix_getWidgetName(a, "num"), b),
                e = yt_uix_getWidgetName(a, "num-current"),
                f;
            Array_forEach(
                d,
                function (a) {
                    f = this.getData(a, "slider-num") == c;
                    A(a, e, f);
                    A(a, "yt-uix-pager-selected", f);
                    _hasclass(a, "yt-uix-button") && A(a, "yt-uix-button-toggled", f);
                },
                a
            );
            if ((d = querySelectorHlp(yt_uix_getWidgetName(a, "slides"), b))) {
                var g = Bi(a, d);
                if (g) {
                    var j = -1 * c * g.offsetWidth + "px";
                    se(g) ? (d.style.right = j) : (d.style.left = j);
                }
            }
            if ((d = querySelectorHlp("yt-uix-pager-current-page", b))) d.innerHTML = c + 1;
            a.setData(b, "slider-current", c + "");
            Hi(a, b);
        },
        Hi = function (a, b) {
            if (b) {
                var c = parseInt(a.getData(b, "slider-current"), 10),
                    d = parseInt(a.getData(b, "slider-slides"), 10),
                    e = kc(yt_uix_getWidgetName(a, "next"), b),
                    f = kc(yt_uix_getWidgetName(a, "prev"), b);
                Array_forEach(e, function (a) {
                    a.disabled = falseVar;
                });
                Array_forEach(f, function (a) {
                    a.disabled = falseVar;
                });
                0 == c &&
                    Array_forEach(f, function (a) {
                        a.disabled = trueVar;
                    });
                c == d - 1 &&
                    Array_forEach(e, function (a) {
                        a.disabled = trueVar;
                    });
            }
        },
        Di = function (a, b, c) {
            if (b) {
                var d = a.Ma(b),
                    e = Ai(a, Bi(a, d));
                if (!(0 >= e.length)) {
                    c >= e.length && (c = e.length - 1);
                    var f = parseInt(a.getData(b, "scroll-offset"), 10);
                    if (isNaN(f) || 0 < f) f = 0;
                    var d = d.offsetWidth,
                        g = Ci(e),
                        f = Math.abs(Math.floor(f / g)) - 1;
                    if (c > (0 <= f ? f : 0)) {
                        var f = Math.floor(d / g),
                            j = e.length;
                        c + f > j && (c = j - f + 1);
                    }
                    0 > c && (c = 0);
                    c = e[c];
                    f = se(b) ? c.offsetLeft - d + g + 10 : -1 * (c.offsetLeft - 10);
                    Ei(a, b, f);
                }
            }
        },
        Ei = function (a, b, c) {
            if (b) {
                isNaN(c) && (c = 0);
                var d = a.Ma(b),
                    e = Bi(a, d),
                    f = H(nullVar, yt_uix_getWidgetName(a, "title"), e),
                    g = _hasclass(b, yt_uix_getWidgetName(a, "scroll")),
                    j = se(b);
                if (g) d.scrollLeft = j ? (isFirefoxBrowser ? c : d.scrollWidth - d.offsetWidth + c) : -c;
                else {
                    var o = j ? "right" : "left";
                    e.style[o] = c + "px";
                    Array_forEach(f, function (a) {
                        a.style[o] = -1 * c + "px";
                    });
                }
                a.setData(b, "scroll-offset", c + "");
            }
        };
    zi.prototype.Ma = function (a) {
        return querySelectorHlp(yt_uix_getWidgetName(this, "body"), a);
    };
    var Bi = function (a, b) {
            return querySelectorHlp(yt_uix_getWidgetName(a, "slide"), b);
        },
        Ai = function (a, b) {
            return H(nullVar, yt_uix_getWidgetName(a, "slide-unit"), b);
        },
        Ci = function (a) {
            if (0 == a.length) return 0;
            var b = a[0],
                c = b.offsetWidth;
            1 < a.length &&
                ((a = a[1]),
                (c = se(b) ? b.offsetLeft - a.offsetLeft : a.offsetLeft - b.offsetLeft));
            return c;
        },
        Ii = function (a, b) {
            var c = a.Ma(b),
                d = Ai(a, Bi(a, c));
            if (!d.length) return [];
            var e = parseInt(a.getData(b, "scroll-offset"), 10);
            if (isNaN(e) || 0 < e) e = 0;
            var f = c.offsetWidth,
                g = Ci(d),
                c = Math.floor(-e / g),
                c = Math.max(0, c),
                e = Math.ceil((-e + f) / g),
                e = Math.min(e, d.length);
            return Array_slice(Array_cloneArray(d), c, e);
        };
    var Ki = function (a, b) {
            this.V = !!b;
            this.r = a;
            this.Ka = this.V ? _gel("watch-tray-playlist-slider") : _gel("playlist-bar-tray");
            this.W = Ed("ol", nullVar, this.Ka);
            this.ah = _gel("playlist-bar-title");
            this.Zg = _gel("playlist-bar-extras-menu");
            var c = wb(Ji),
                d = _gel("playlist-bar-template");
            this.V && (d = _gel("watch-tray-playlist-item-template"));
            this.hh = yi(d, c);
            d = getDataAttr(d, "video-thumb-url") || "";
            this.ih = new wi(d, c);
            R(
                this.Ka,
                "click",
                goog_bind(function () {
                    yt_setTimeout(goog_bind(this.He, this), 0);
                }, this),
                "playlist-bar-tray-button"
            );
        },
        Ji = {
            classes: "classes",
            list_position: "index",
            video_encrypted_id: "id",
            video_title: "title",
            video_url: "url",
            video_display_name: "display_name",
            video_thumb_url: "thumb_url"
        };
    Ki.prototype.qb = function (a, b, c, d, e) {
        var f = c.ib;
        f && ((this.ah.innerHTML = f), (this.Zg.innerHTML = c.hb));
        var g = [];
        Array_forEach(
            a,
            function (a, d) {
                var f = d == b,
                    C = c.getVideoData(a);
                C.id = a;
                C.url = Xh(c, d);
                g.push(Li(this, C, d + 1 + e, f));
            },
            this
        );
        this.W.innerHTML = g.join("");
        d ? this.scroll(3) : this.V || this.scroll(5);
        d = kc("item-count", this.r);
        Array_forEach(d, function (b) {
            b.innerHTML = a.length;
        });
        d = kc("playing-index", this.r);
        Array_forEach(d, function (a) {
            a.innerHTML = b + 1;
        });
    };
    var Li = function (a, b, c, d) {
        var e = function (a) {
            return Ji[a];
        };
        b.index = c;
        b.thumb_url = a.ih.qb(b, e);
        c = [];
        b.unviewable ? c.push("playlist-bar-item-unviewable") : b.title || c.push("loading");
        d && c.push("playlist-bar-item-playing");
        b.classes = c.join(" ");
        return a.hh.qb(b, e);
    };
    Ki.prototype.He = function () {
        var a = Ii(zi.getInstance(), this.Ka);
        Array_forEach(a, function (a) {
            ti(a);
        });
    };
    Ki.prototype.scroll = function (a, b) {
        var c = zi.getInstance();
        switch (a) {
            case 3:
                var d = Ed("li", "playlist-bar-item-playing", this.W);
                if (d) {
                    var e = this.Ka;
                    if (e) {
                        var f = Ai(c, Bi(c, c.Ma(e))),
                            d = Array_indexOf(f, d);
                        0 <= d && Di(c, e, d);
                    }
                } else Di(c, this.Ka, 0);
                break;
            case 4:
                b && Di(c, this.Ka, b);
                break;
            case 5:
                ((e = this.Ka),
                    (d = c.getData(e, "scroll-offset")),
                    Ei(c, e, parseInt(d, 10) || 0));
        }
        this.He();
    };
    Ki.prototype.cc = function (a) {
        var b = 0,
            c = goog_bind(function () {
                var d = H("li", "playlist-bar-item", this.W),
                    e = !(b % 2);
                Array_forEach(a, function (a) {
                    A(d[a], "playlist-bar-item-highlight", e);
                });
                b++;
                6 > b && yt_setTimeout(c, 150);
            }, this);
        c();
    };
    var Z = function (a, b, c) {
            this.r = a;
            this.V = !!c;
            this.Ta = new Ki(this.r, this.V);
            this.pb = b;
            this.Ic = this.be = falseVar;
            this.Rf = _gel("playlist-bar-bar");
            yt_events_listen(this.Rf, "click", goog_bind(this.Tf, this));
            this.cg = _gel("playlist-bar-play-button");
            yt_events_listen(this.cg, "click", goog_bind(this.Zf, this));
            this.V
                ? ((this.ge = _gel("watch-prev")), (this.Mc = _gel("watch-next")))
                : ((this.ge = _gel("playlist-bar-prev-button")),
                  (this.Mc = _gel("playlist-bar-next-button")));
            yt_events_listen(this.ge, "click", goog_bind(this.$f, this));
            yt_events_listen(this.Mc, "click", goog_bind(this.Xf, this));
            this.Lc = _gel("playlist-bar-autoplay-button");
            yt_events_listen(this.Lc, "click", goog_bind(this.Sf, this));
            this.Vd = _gel("playlist-bar-shuffle-button");
            yt_events_listen(this.Vd, "click", goog_bind(this.ag, this));
            this.Wd = _gel("playlist-bar-toggle-button");
            yt_events_listen(this.Wd, "click", goog_bind(this.bg, this));
            this.Jc = _gel("playlist-bar-options-menu");
            R(this.Jc, "click", goog_bind(this.Yf, this), "yt-uix-button-menu-item");
            this.W = _gel("playlist-bar-tray-content");
            this.V && (this.W = _gel("watch-tray-playlist-content"));
            R(this.W, "click", goog_bind(this.Uf, this), "delete");
            R(this.W, "click", goog_bind(this.Vf, this), "load-lists");
            R(this.W, "click", goog_bind(this.Wf, this), "load-more");
            this.Hf = yi(_gel("playlist-bar-next-up-template"), ["video_encrypted_id"]);
            Mi(this, b);
            this.b.N() ? this.show() : this.Z();
            a = document.createElement("iframe");
            a.id = "playlist-bar-mask";
            a.frameBorder = "0";
            a.src = 'javascript:""';
            this.r.insertBefore(a, this.r.firstChild);
        },
        Mi = function (a, b, c, d) {
            if (a.b && (a.b.Oc.clear("LIST_UPDATED"), a.pb.isEqual(b) || d))
                (b.ld(a.pb), (a.pb = b));
            a.b = b;
            a.b.Oc.gc("LIST_UPDATED", a.Ua, a);
            a.b.load(c);
            a.Ua(trueVar);
        };
    Z.prototype.qa = function () {
        return this.b.qa();
    };
    Z.prototype.Ba = function () {
        return this.b.Ba();
    };
    Z.prototype.pa = function () {
        return this.b.pa();
    };
    var Ni = function (a) {
            return a.pa() && _hasclass(a.r, "autoplay-on");
        },
        Oi = function (a, b) {
            b ? y(a.r, "autoplay-off", "autoplay-on") : y(a.r, "autoplay-on", "autoplay-off");
            var c = de.getInstance();
            ie(Hh.$h, !b);
            c.save();
            yt_setConfig("LIST_AUTO_PLAY_ON", b);
        };
    Z.prototype.Y = function () {
        return _hasclass(this.r, "shuffle-on");
    };
    Z.prototype.mb = function () {
        return _hasclass(this.r, "loading");
    };
    Z.prototype.show = function () {
        he(de.getInstance(), Hh.ef) ? Pi(this) : Qi(this);
    };
    Z.prototype.Z = function () {
        y(this.r, ["min", "max"], "hid");
    };
    var Pi = function (a) {
            y(a.r, ["hid", "max"], "min");
            Ri(a, trueVar);
        },
        Qi = function (a) {
            y(a.r, ["hid", "min"], "max");
            Ri(a, trueVar);
        };
    n = Z.prototype;
    n.toggle = function () {
        var a;
        _hasclass(this.r, "min") ? (Qi(this), (a = falseVar)) : (Pi(this), (a = trueVar));
        Xg("bf", "toggleBar=1&collapsed=" + a, undefinedVar);
        var b = de.getInstance();
        ie(Hh.ef, a);
        b.save();
        Si(this, trueVar);
    };
    n.Tf = function (a) {
        findAncestor(
            a.target,
            function (a) {
                a = a.tagName && a.tagName.toLowerCase();
                return "a" == a || "button" == a;
            },
            trueVar
        ) || this.toggle();
    };
    n.Yf = function (a) {
        a.stopPropagation();
        switch (getDataAttr(a.currentTarget, "action")) {
            case "clear":
                this.clear();
                break;
            case "load-lists":
                Ti(this);
                break;
            case "show-active":
                this.pb && Mi(this, this.pb);
                break;
            case "save":
                Ui(this);
        }
    };
    n.bg = function () {
        this.toggle();
    };
    n.Sf = function () {
        Oi(this, !Ni(this));
        Ri(this);
    };
    n.ag = function () {
        var a = !this.Y(),
            b = 0;
        yt_setConfig("SHUFFLE_ENABLED", a);
        a && yt_setConfig("SHUFFLE_VALUE", Math.max(1, 1e6 * Math.random()));
        a
            ? (y(this.r, "shuffle-off", "shuffle-on"), (b = Jh()))
            : y(this.r, "shuffle-on", "shuffle-off");
        this.b.ja = b;
        this.Ua();
        this.Ta.scroll(3);
    };
    n.Zf = function () {
        this.next(trueVar, "bf_play");
    };
    n.$f = function () {
        var a = Yh(this.b, "bf_prev");
        a && yt_window_redirect(a);
    };
    n.Xf = function () {
        this.next(trueVar, "bf_next");
    };
    n.Uf = function (a) {
        a.preventDefault();
        a.stopPropagation();
        var b = this.V ? "watch-tray-playlist-item" : "playlist-bar-item",
            c = H("li", b, this.W),
            a = K(a.currentTarget, "li", b),
            c = Array_indexOf(c, a);
        this.b.Sc() &&
            ((a = this.b.qa()), Vi(this), Xg("bf", "copyFrom=1&action=delete&list_type=" + a, undefinedVar));
        var d = this.b.qa(),
            e = Th(this.b)[c];
        this.b.removeItem(c);
        Wi(this, yt_getMsg("PLAYLIST_VIDEO_DELETED"), falseVar, falseVar, function () {
            this.b.Wc([e]);
            this.Ua();
            var a = this.b.N() - 1;
            this.Ta.scroll(4, a);
            this.Ta.cc([a]);
            Xg("bf", "undo_delete=1&list_type=" + d, undefinedVar);
        });
        Xg("bf", "delete=1&list_type=" + d, undefinedVar);
    };
    var Xi = function (a) {
        a.be ||
            ((a.be = trueVar),
            yt_net_scriptloader_load(
                (yt_getConfig("DRAGDROP_BINARY_URL") || "") + "",
                goog_bind(function () {
                    yt_events_listen(
                        this.W,
                        "mouseover",
                        goog_bind(function () {
                            this.Ic ||
                                ((this.Ic = trueVar),
                                this.b.Va() &&
                                    !this.b.Y() &&
                                    getProp("yt.www.lists.dragdrop").createDraggables());
                        }, this)
                    );
                    var a = this.V ? "watch-tray-playlist-item" : "playlist-bar-item",
                        c = getProp("yt.www.lists.dragdrop");
                    c.init(this.W, a);
                    c.subscribe("DROPPED_AT_INDEX", this.Mg, this);
                }, a)
            ));
    };
    Z.prototype.Mg = function (a) {
        var b = a.sourceIndex,
            a = a.targetIndex;
        if (!(b == a || 0 > b || 0 > a)) {
            if (this.b.Sc()) {
                var c = this.b.qa();
                Vi(this);
                Xg("bf", "copyFrom=1&action=drag&list_type=" + c, undefinedVar);
            }
            c = this.b;
            if (!c.Y() && c.Va()) {
                var d = Th(c);
                d[b] &&
                    d[a] &&
                    (c.ye(b, a),
                    (d = c.F),
                    d == b
                        ? (c.F = a)
                        : d > b && d <= a
                          ? (c.F -= 1)
                          : d < b && d >= a && (c.F += 1));
                Ph(c);
            }
            b = yt_uri_buildQueryData({ moved_item_delta: Math.abs(a - b), list_type: this.b.qa() });
            Xg("bf", b, undefinedVar);
        }
    };
    Z.prototype.next = function (a, b) {
        a || Xg("bf", "autoplay=1&playcount=" + this.b.nb, undefinedVar);
        var c;
        c = this.b;
        var d = c.X() + 1;
        d >= c.N() && (d = 0);
        (c = Xh(c, d, !a, b)) && yt_window_redirect(c);
    };
    var Yi = function (a, b) {
        if (!(1 > b || 5 < b)) {
            Xg("bf", "delayedautoplay=" + b, undefinedVar);
            yh(xh.getInstance(), a.Lc);
            var c = yt_getMsg("AUTOPLAY_WARNING" + b);
            c && Wi(a, c, falseVar, trueVar);
        }
    };
    Z.prototype.clear = function () {
        var a = this.b.sa();
        this.b.clear();
        Wi(this, yt_getMsg("LIST_CLEARED"), falseVar, falseVar, function () {
            this.b.Wc(a);
            this.Ua();
            Xg("bf", "undo_clear=1&list_type=" + b, undefinedVar);
        });
        var b = this.b.qa();
        Xg("bf", "clear=1&list_type=" + b, undefinedVar);
    };
    Z.prototype.td = function (a) {
        return this.b.td(a);
    };
    Z.prototype.Ua = function (a) {
        var b = this.b.mb(),
            c = !b && !!this.b.ha,
            d = !this.b.N(),
            e = this.b.pa();
        e ? y(this.Jc, "passive", "active") : y(this.Jc, "active", "passive");
        var f = [],
            g = [];
        (e ? g : f).push("active");
        (!e ? g : f).push("passive");
        (b ? g : f).push("loading");
        (c ? g : f).push("editable");
        (d ? g : f).push("empty");
        y(this.r, f, g);
        b ||
            ai(
                this.b,
                function () {
                    var b = Th(this.b),
                        c = this.b.X();
                    this.Ta.qb(b, c, this.b, !!a, this.b.Pb);
                    this.Ic = falseVar;
                },
                this
            );
        b = this.b.Sa;
        c = this.b.ya;
        b ? Wi(this, b, trueVar, falseVar) : c && Wi(this, c, falseVar, trueVar);
        Wh(this.b);
        Ri(this);
        this.b.Va() && this.b.N() && Xi(this);
    };
    var Ri = function (a, b) {
        if (!a.V) {
            var c = yt_getMsg("AUTOPLAY_OFF_TOOLTIP");
            Ni(a) && (c = yt_getMsg("AUTOPLAY_ON_TOOLTIP"));
            var d = yt_getMsg("SHUFFLE_OFF_TOOLTIP");
            a.Y() && (d = yt_getMsg("SHUFFLE_ON_TOOLTIP"));
            var e = yt_getMsg("NEXT_VIDEO_NOTHUMB_TOOLTIP");
            if (a.b.pa()) {
                var f = Th(a.b),
                    g = a.b.X();
                if ((f = (g = f[f.length == g + 1 ? 0 : g + 1]) && a.b.getVideoData(g)) && f.title)
                    ((e = a.Hf.qb({ video_encrypted_id: g })),
                        (e = yt_getMsg("NEXT_VIDEO_TOOLTIP", { "{next_video_title}": f.title }) + " " + e));
            }
            f = "";
            f = _hasclass(a.r, "min") ? yt_getMsg("SHOW_PLAYLIST_TOOLTIP") : yt_getMsg("HIDE_PLAYLIST_TOOLTIP");
            g = xh.getInstance();
            Ah(g, a.Mc, e);
            Ah(g, a.Lc, c);
            Ah(g, a.Vd, d);
            Ah(g, a.Wd, f, b);
        }
    };
    Z.prototype.Jb = nullVar;
    Z.prototype.rc = nullVar;
    var Zi = function (a) {
            a.Jb && (yt_clearTimeout(a.Jb), (a.Jb = nullVar));
        },
        Wi = function (a, b, c, d, e) {
            b &&
                (a.Na ||
                    ((a.Na = a.V ? _gel("watch-bar-notifications") : _gel("playlist-bar-notifications")),
                    R(a.Na, "click", goog_bind(a.Vh, a), "playlist-bar-undo")),
                (a.rc = e || nullVar),
                a.rc && (b += ' <a class="playlist-bar-undo">' + yt_getMsg("UNDO_LINK") + "</a>"),
                (querySelectorHlp("yt-alert-content", a.Na).innerHTML = b),
                A(a.Na, "yt-alert-error", !!c),
                A(a.Na, "yt-alert-success", !c),
                _showdiv(a.Na),
                Zi(a),
                d &&
                    ((b = goog_bind(function () {
                        Si(this);
                    }, a)),
                    (a.Jb = yt_setTimeout(b, 1e4))));
        };
    Z.prototype.showError = function (a, b) {
        Wi(this, a, trueVar, b);
    };
    var Si = function (a, b) {
        var c = !!a.Jb;
        if (!b || !c) (_hidediv(a.Na), (a.rc = nullVar), Zi(a));
    };
    Z.prototype.Vh = function (a) {
        a.stopPropagation();
        a.preventDefault();
        a = this.rc;
        Si(this);
        a.call(this);
    };
    Z.prototype.cc = function (a) {
        a = Uh(this.b, a);
        a.length && (this.Ta.cc(a), this.Ta.scroll(4, a[0]));
    };
    var Ui = function (a) {
        a.mb() ||
            (Qi(a),
            $i(a, {
                g: { action_get_save_playlist_form: 1 },
                f: function (a, c) {
                    y(this.r, "lists", "save");
                    var d = c.html;
                    this.ke = _gel("playlist-bar-save");
                    this.ke.innerHTML = d;
                    d = _gel("playlist-bar-title-edit");
                    d.focus();
                    d.select();
                    yt_events_listen(_gel("playlist-bar-save-cancel"), "click", goog_bind(this.Kg, this));
                    yt_events_listen(_gel("playlist-bar-save-form"), "submit", goog_bind(this.Lg, this));
                }
            }));
    };
    Z.prototype.Kg = function (a) {
        a.preventDefault();
        _removeclass(this.r, "save");
    };
    Z.prototype.Lg = function (a) {
        a.preventDefault();
        var b = Th(this.b).join(",");
        b &&
            (Si(this),
            (a = goog_dom_forms_getFormDataString(a.target)),
            $i(this, {
                g: { action_save_playlist: 1 },
                method: "POST",
                za: a + ("&video_ids=" + b),
                f: function (a, b) {
                    this.ke.innerHTML = "";
                    _removeclass(this.r, "save");
                    Mi(this, hi("PL", b.list_id), nullVar, trueVar);
                    Wi(this, yt_getMsg("PLAYLIST_BAR_PLAYLIST_SAVED"), falseVar, trueVar);
                }
            }));
    };
    Z.prototype.Vf = function (a) {
        a.preventDefault();
        Ti(this);
    };
    Z.prototype.Wf = function () {
        var a = this.b;
        Zh(a, nullVar, { load_more: "1" });
        Ph(a);
    };
    var Ti = function (a) {
        a.mb() ||
            (Qi(a),
            $i(a, {
                g: { action_get_playlists: 1 },
                f: function (a, c) {
                    y(this.r, "save", "lists");
                    this.Bg = _gel("playlist-bar-lists-back");
                    this.ng = yt_events_listen(this.Bg, "click", goog_bind(this.Cg, this));
                    var d = c.html;
                    this.yb = _gel("playlist-bar-lists");
                    this.yb.innerHTML = d;
                    ti(this.yb);
                    this.og = R(this.yb, "click", goog_bind(this.Dg, this), "playlist-bar-playlist-item");
                }
            }));
    };
    Z.prototype.Dg = function (a) {
        a.preventDefault();
        var b = a.currentTarget;
        b &&
            (aj(this),
            (a = getDataAttr(b, "list-type") || ""),
            (b = getDataAttr(b, "list-id") || ""),
            Mi(this, hi(a, b)));
    };
    Z.prototype.Cg = function (a) {
        a.preventDefault();
        aj(this);
    };
    var aj = function (a) {
            _removeclass(a.r, "lists");
            a.yb && (a.yb.innerHTML = "");
            yt_removeEventListeners(a.og);
            yt_removeEventListeners(a.ng);
        },
        $i = function (a, b) {
            _addclass(a.r, "loading");
            Bb(b, {
                format: "JSON",
                B: function (a, b) {
                    var e = yt_getMsg("ERROR_OCCURRED");
                    b && b.errors && (e = b.errors[0]);
                    this.showError(e, trueVar);
                },
                ga: function () {
                    _removeclass(this.r, "loading");
                },
                j: a
            });
            ajaxRequest("/playlist_bar_ajax", b);
        },
        cj = function () {
            var a = bj(),
                b = Th(a.b),
                c = {};
            Array_forEach(
                b,
                function (a) {
                    c[a] = this.b.getVideoData(a);
                },
                a
            );
            var d = a.X(),
                e = Ni(a),
                a = a.Y() ? a.b.ja : 0;
            return { autoPlay: e, index: d, shuffle: a, videoData: c, videoIds: b || [] };
        };
    Z.prototype.X = function () {
        return this.b.X();
    };
    var Vi = function (a) {
        var b = a.b.sa();
        Lh([]);
        Mh(b);
        var b = new fi(),
            c = a.b.X();
        b.F = c;
        b.ja = a.b.ja;
        Mi(a, b);
    };
    var dj = nullVar,
        ej = falseVar,
        bj = function () {
            if (!dj) {
                var a = _gel("playlist-bar"),
                    b = falseVar;
                !a && yt_getConfig("ENABLE_WATCH6") && ((a = _gel("watch-tray-playlist")), (b = trueVar));
                if (a) {
                    var c = a,
                        d;
                    if (_hasclass(c, "active")) {
                        d = getDataAttr(c, "list-type") || "";
                        if ("QL" == d) d = new fi(trueVar);
                        else {
                            var e = getDataAttr(c, "list-id") || "",
                                f = (getDataAttr(c, "video-ids") || "").split(",");
                            d = hi(d, e, f);
                        }
                        e = parseInt(getDataAttr(c, "index-offset"), 10) || 0;
                        d.Pb = e;
                        d.F = parseInt(yt_getConfig("PLAYLIST_BAR_PLAYING_INDEX"), 10) || 0;
                        d.nb = parseInt(yt_getConfig("LIST_AUTO_PLAY_VALUE"), 10) || 0;
                        e = 0;
                        yt_getConfig("SHUFFLE_ENABLED") && (e = Jh());
                        d.ja = e;
                    } else d = new fi(trueVar);
                    e = getDataAttr(c, "video-url");
                    d.jb = e || "";
                    c = _hasclass(c, "editable");
                    d.ha = c;
                    d.ib = _gel("playlist-bar-title").innerHTML;
                    d.hb = _gel("playlist-bar-extras-menu").innerHTML;
                    dj = new Z(a, d, b);
                }
            }
            return dj;
        },
        fj = function (a) {
            var b = bj();
            Ni(b) &&
                (0 < a
                    ? (Yi(b, a),
                      yt_setTimeout(function () {
                          fj(a - 1);
                      }, 1e3))
                    : b.next(falseVar, "mr_meh"));
        },
        gj = function (a, b, c, d) {
            if (ej) {
                var e = bj();
                e &&
                    ((a = hi(a, b)),
                    (b = trueVar),
                    e.pa() && (b = e.b.isEqual(a)),
                    b
                        ? (Mi(e, a, function () {
                              e.cc(c);
                              Wi(e, d, falseVar, trueVar);
                          }),
                          e.show())
                        : Wi(e, d, falseVar, trueVar));
            }
        },
        hj = function (a) {
            for (var b = a.getDuration(), c = 5; 0 < c; c--)
                a.addCueRange("NEAR_END" + c, b - c, b - c + 1);
            a.addEventListener("onCueRangeEnter", "yt.www.lists.handleNearPlaybackEnd");
        },
        ij = function () {
            if (!ej || !bj().pa()) return falseVar;
            var a = bj().qa();
            return !Array_contains(Ih, a);
        };
    var jj = -1,
        lj = function (a) {
            var a = !!a,
                b = _gel("page"),
                c = _gel("watch-sidebar"),
                d = _gel("baseDiv"),
                e = yt_getConfig("WIDE_PLAYER_STYLES"),
                f = 0;
            "webkitTransition" in c.style
                ? ((f = document.defaultView.getComputedStyle(c, nullVar)),
                  (f = 1e3 * parseFloat(f["-webkit-transition-duration"])))
                : "MozTransition" in c.style
                  ? ((f = document.defaultView.getComputedStyle(c, nullVar)),
                    (f = 1e3 * parseFloat(f.getPropertyValue("-moz-transition-duration"))))
                  : "OTransition" in c.style &&
                    ((f = document.defaultView.getComputedStyle(c, nullVar)),
                    (f = 1e3 * parseFloat(f.getPropertyValue("-o-transition-duration"))));
            if (a)
                (_addclass(b, "watch-wide"),
                    yt_setTimeout(function () {
                        kj();
                        for (var a = 0; a < e.length; ++a) _addclass(d, e[a]);
                    }, f));
            else {
                f /= 2;
                kj("small");
                for (var g = 0; g < e.length; ++g) _removeclass(d, e[g]);
                yt_setTimeout(function () {
                    _removeclass(b, "watch-wide");
                }, f);
                ti(c);
            }
            yt_style_setDisplayed("masthead-utility-menulink-short", a);
            yt_style_setDisplayed("masthead-utility-menulink-long", !a);
        },
        kj = function (a) {
            var b = _gel("watch-video");
            if (!_hasclass(_gel("page"), "watch-wide") || "small" == a) _removeclass(b, "medium", "large");
            else {
                var c = !!yt_getConfig("ENABLE_AUTO_LARGE"),
                    d = oc(window),
                    d = !!(1400 <= d.width && 1040 <= d.height);
                c && (d || "large" == a) ? y(b, "medium", "large") : y(b, "large", "medium");
            }
        },
        mj = function () {
            return yt_getConfig("PLAYER_REFERENCE");
        },
        nj = function (a) {
            K(a.target, "BUTTON") || a.currentTarget.click();
        };
    var pj = function (a, b, c, d) {
        this.c = a;
        this.Kc = falseVar;
        a = getCurrentOrigin() + "/share_ajax";
        ajaxRequest(a, {
            format: "JSON",
            g: { action_get_email: 1, video_id: c, list: d },
            f: function (a, c) {
                this.c.innerHTML = c.email_html;
                this.Aa();
                this.focus();
                var d = c.sharing_binary_url;
                d && oj(this, d, c.contacts, b);
            },
            j: this
        });
    };
    pj.prototype.Aa = function () {
        this.i = this.c.getElementsByTagName("form")[0];
        yt_events_listen(this.i, "submit", goog_bind(this.Tc, this));
        querySelectorHlp("share-email-send", this.i);
        this.ya = querySelectorHlp("share-email-success", this.c);
        this.Og = querySelectorHlp("share-email-remail", this.ya);
        yt_events_listen(
            this.Og,
            "click",
            goog_bind(function () {
                qj(this);
                this.focus();
            }, this)
        );
        this.bd = querySelectorHlp("share-email-recipients", this.c);
        this.ad = querySelectorHlp("share-email-note", this.c);
        this.ve = querySelectorHlp("share-email-preview-note", this.c);
        yt_events_listen(this.ad, "keyup", goog_bind(this.Ng, this));
    };
    var oj = function (a, b, c, d) {
        yt_net_scriptloader_load(
            b,
            goog_bind(function () {
                var a = getProp("yt.sharing.ContactTools");
                a && a.createContactTools(this.bd, nullVar, c, d);
            }, a)
        );
    };
    pj.prototype.na = function () {
        this.i && (this.Kc && qj(this), this.focus());
    };
    pj.prototype.focus = function () {
        this.bd.focus();
    };
    var qj = function (a) {
        a.Kc = falseVar;
        a.bd.value = "";
        a.ad.value = "";
        a.ve.innerHTML = "";
        _hidediv(a.ya);
        _showdiv(a.i);
    };
    pj.prototype.Ng = function () {
        var a = this.ad.value,
            a = a.substring(0, 300),
            a = xmlEscape(a),
            a = a.replace(/\n/g, "<br>");
        this.ve.innerHTML = a;
    };
    pj.prototype.Tc = function (a) {
        a.preventDefault();
        var b = H("button", nullVar, this.i)[0];
        b.disabled = trueVar;
        var c = querySelectorHlp("share-email-captcha", this.c),
            d = querySelectorHlp("share-email-error", this.c),
            e = querySelectorHlp("yt-alert-content", d),
            a = getCurrentOrigin() + getUrlPathAndQuery(this.i.action);
        ajaxRequest(a, {
            format: "JSON",
            method: "POST",
            za: goog_dom_forms_getFormDataString(this.i),
            f: function () {
                this.Kc = trueVar;
                _showdiv(this.ya);
                _hidediv(this.i);
                _hidediv(d);
                _hidediv(c);
            },
            B: function (a, b) {
                b.captcha_html && ((c.innerHTML = b.captcha_html), _showdiv(c));
                b.errors && ((e.innerHTML = b.errors.join("<br>")), _showdiv(d));
            },
            ga: function () {
                b.disabled = falseVar;
            },
            j: this
        });
    };
    var sj = function (a, b, c) {
        this.c = a;
        a = getCurrentOrigin() + "/share_ajax";
        ajaxRequest(a, {
            format: "JSON",
            g: { action_get_embed: 1, video_id: b, list: c },
            f: function (a, b) {
                this.c.innerHTML = b.embed_html;
                this.Of = b.legacy_url;
                this.Nf = b.legacy_code;
                this.Mf = b.iframe_url;
                this.Lf = b.iframe_code;
                this.Aa();
                var c = de.getInstance();
                this.Ea && (this.Ea.checked = !he(0, Hh.de));
                this.Ub.checked = he(0, Hh.ce);
                this.Da && (this.Da.checked = he(0, Hh.ee));
                c = c.get("ems");
                (c in this.$ ? this.$[c] : vb(this.$)).select();
                rj(this);
                this.na();
            },
            j: this
        });
    };
    sj.prototype.Aa = function () {
        this.Za = querySelectorHlp("share-embed-code", this.c);
        yt_events_listen(this.Za, "click", goog_bind(this.yh, this));
        tj(this);
        uj(this);
    };
    var tj = function (a) {
            var b = querySelectorHlp("share-embed-size-list", a.c),
                c = kc("share-embed-size-radio", b);
            a.$ = {};
            Array_forEach(
                c,
                function (a) {
                    _hasclass(a, "share-embed-size-radio-custom") ||
                        ((a = new vj(a)), (this.$[a.name] = a));
                },
                a
            );
            var c = vb(a.$).width / (vb(a.$).height - 30),
                d = querySelectorHlp("share-embed-size-radio-custom", b),
                c = new wj(d, c);
            a.$[c.name] = c;
            a.mh = c;
            R(b, "click", goog_bind(a.nh, a), "share-embed-size");
            b = querySelectorHlp("share-embed-customize", b);
            yt_events_listen(b, "keyup", goog_bind(a.oh, a));
        },
        uj = function (a) {
            var b = {},
                c = kc("share-embed-option", a.c);
            Array_forEach(c, function (a) {
                b[a.name] = a;
            });
            a.Ea = b["show-related"];
            a.Ea && yt_events_listen(a.Ea, "click", goog_bind(a.eh, a));
            a.Ub = b["delayed-cookies"];
            yt_events_listen(a.Ub, "click", goog_bind(a.dh, a));
            a.xe = b["use-https"];
            yt_events_listen(a.xe, "click", goog_bind(a.gh, a));
            a.Da = b["use-flash-code"] || nullVar;
            a.Da && yt_events_listen(a.Da, "click", goog_bind(a.fh, a));
        };
    sj.prototype.na = function () {
        this.focus();
    };
    sj.prototype.focus = function () {
        this.Za && (this.Za.focus(), this.Za.select());
    };
    var rj = function (a) {
            var b = a.Lf,
                c = a.Mf;
            a.Da && a.Da.checked && ((b = a.Nf), (c = a.Of));
            a.Ub.checked && (c = c.replace("youtube.com", "youtube-nocookie.com"));
            a.xe.checked && ((c = c.split("//")), (c[0] = "https:"), (c = c.join("//")));
            var d = {};
            a.Ea && !a.Ea.checked && (d.rel = 0);
            c = Ue(c, d);
            d = xj(a);
            if (!d.width || 200 > d.width) d = vb(a.$);
            b = b.replace(/__url__/g, xmlEscape(c));
            b = b.replace(/__width__/g, d.width + "");
            b = b.replace(/__height__/g, d.height + "");
            b = xmlEscape(b);
            b != a.Za.innerHTML && (a.Za.innerHTML = b);
        },
        xj = function (a) {
            return (
                yb(a.$, function (a) {
                    return a.Mb.checked;
                }) || nullVar
            );
        };
    n = sj.prototype;
    n.eh = function () {
        var a = this.Ea.checked,
            b = de.getInstance();
        ie(Hh.de, !a);
        b.save();
        rj(this);
    };
    n.dh = function () {
        var a = this.Ub.checked,
            b = de.getInstance();
        ie(Hh.ce, a);
        b.save();
        rj(this);
    };
    n.gh = function () {
        rj(this);
    };
    n.fh = function () {
        var a = this.Da.checked,
            b = de.getInstance();
        ie(Hh.ee, a);
        b.save();
        rj(this);
    };
    n.yh = function () {
        this.focus();
    };
    n.nh = function (a) {
        a = this.$[querySelectorHlp("share-embed-size-radio", a.currentTarget).value];
        a.select();
        var b = de.getInstance();
        b.set("ems", a.name);
        b.save();
        rj(this);
        a != this.mh && this.focus();
    };
    n.oh = function () {
        rj(this);
    };
    var vj = function (a) {
        this.name = a.value;
        this.Mb = a;
        this.width = parseInt(getDataAttr(this.Mb, "width"), 10);
        this.height = parseInt(getDataAttr(this.Mb, "height"), 10);
    };
    vj.prototype.select = function () {
        this.Mb.checked = trueVar;
        var a = K(this.Mb, "li"),
            b = K(a, "ul"),
            b = H("li", "selected", b);
        Array_forEach(b, function (a) {
            _removeclass(a, "selected");
        });
        _addclass(a, "selected");
    };
    var wj = function (a, b) {
        vj.call(this, a);
        this.of = b;
        var c = K(a, "li");
        this.Fd = querySelectorHlp("share-embed-size-custom-width", c);
        this.Ed = querySelectorHlp("share-embed-size-custom-height", c);
        yt_events_listen(this.Fd, "keyup", goog_bind(this.mi, this));
        yt_events_listen(this.Ed, "keyup", goog_bind(this.li, this));
    };
    inherits(wj, vj);
    wj.prototype.mi = function () {
        this.width = parseInt(this.Fd.value, 10);
        this.height = (Math.floor(this.width / this.of) || 0) + 30;
        this.Ed.value = this.height + "";
    };
    wj.prototype.li = function () {
        this.height = parseInt(this.Ed.value, 10) - 30;
        this.width = Math.ceil(this.height * this.of) || 0;
        this.Fd.value = this.width + "";
    };
    var yj = function (a, b, c, d, e, f, g) {
        this.c = a;
        this.bh = b;
        this.Cb = c;
        this.Tb = d;
        this.Ee = !isNaN(parseInt(e, 10));
        this.Ca = nullVar;
        this.Ee && (this.Ca = e);
        this.Yg = f || {};
        this.De = !!g;
        window.__GOOGLEAPIS = window.__GOOGLEAPIS || {};
        window.__GOOGLEAPIS.gwidget = window.__GOOGLEAPIS.gwidget || {};
        window.__GOOGLEAPIS.gwidget.lang = this.Tb;
        this.Ee &&
            ((window.__GOOGLEAPIS["googleapis.config"] =
                window.__GOOGLEAPIS["googleapis.config"] || {}),
            (window.__GOOGLEAPIS["googleapis.config"].sessionIndex = this.Ca));
        this.xb();
    };
    yj.prototype.xb = function () {
        yt_net_scriptloader_load("https://apis.google.com/js/plusone.js", goog_bind(this.Ni, this));
    };
    yj.prototype.Ni = function () {
        var a = getProp("gapi.plusone.render");
        if (a) {
            var b = Math.floor(1e4 * Math.random()),
                c = "__PLUS_ONE_CALLBACK_" + b,
                d = this.c.id;
            d || ((d = "plusone-button-" + b), (this.c.id = d));
            window[c] = goog_bind(this.sh, this);
            b = {
                callbackName: c,
                count: "false",
                href: this.Cb,
                size: "medium",
                source: "google:youtube"
            };
            this.De && (b.db = 1);
            Bb(b, this.Yg);
            _showdiv(this.c);
            a(d, b);
        }
    };
    yj.prototype.sh = function (a) {
        "off" != a.state &&
            (yt_tracking_share("PLUS_ONE", this.bh + ""),
            this.De &&
                yt_window_popup(
                    yt_uri_appendQueryData("https://plusone.google.com/_/+1/confirm", {
                        url: a.url,
                        source: "google:youtube"
                    }),
                    { width: 480, height: 550 }
                ));
    };
    var zj = function (a, b, c, d, e, f) {
            this.c = a;
            this.H = b || nullVar;
            this.G = c || nullVar;
            this.we = falseVar;
            this.Jf = e || nullVar;
            this.Kf = f || falseVar;
            this.xb(d);
        },
        Aj = function (a) {
            var b = ["h", "m", "s"],
                c = Array_clone(b);
            c.reverse();
            var d = {},
                a = a.toLowerCase().match(/\d+\s*[hms]?/g) || [],
                a = Array_filter(a, function (a) {
                    var b = (a.match(/[hms]/) || [""])[0];
                    return b ? ((d[b] = parseInt(a.match(/\d+/)[0], 10)), falseVar) : trueVar;
                });
            for (a.reverse(); a.length && c.length; ) {
                var e = c.shift();
                e in d || (d[e] = parseInt(a.shift(), 10));
            }
            if (a.length || 59 < d.s || 59 < d.m || 9 < d.h) return nullVar;
            var f = "";
            Array_forEach(b, function (a) {
                d[a] && (f += d[a] + a);
            });
            return f || nullVar;
        };
    zj.prototype.xb = function (a) {
        var b = getCurrentOrigin() + "/share_ajax";
        ajaxRequest(b, {
            format: "JSON",
            g: { action_get_share_box: 1, video_id: this.H, list: this.G, new_share_layout: trueVar },
            f: function (b, d) {
                this.c.innerHTML = d.share_html;
                this.Gf = d.url_short;
                this.Ud = d.url_long;
                this.Tb = d.lang;
                this.Ca = nullVar;
                "session_index" in d && (this.Ca = d.session_index);
                this.Aa();
                var e = querySelectorHlp("share-panel-services-dynamic", this.c);
                e &&
                    new yj(e, (this.H || this.G) + "", this.Ud, this.Tb, this.Ca, this.Jf, this.Kf);
                a && a();
                this.na();
            },
            j: this
        });
    };
    zj.prototype.Aa = function () {
        var a = querySelectorHlp("share-panel-show-url-options");
        yt_events_listen(a, "click", goog_bind(this.yg, this));
        a = querySelectorHlp("share-panel-show-more");
        yt_events_listen(a, "click", goog_bind(this.vg, this));
        a = querySelectorHlp("share-panel-embed", this.c);
        yt_events_listen(a, "click", goog_bind(this.tg, this));
        a = querySelectorHlp("share-panel-email", this.c);
        yt_events_listen(a, "click", goog_bind(this.sg, this));
        (a = querySelectorHlp("share-panel-hangout", this.c)) && yt_events_listen(a, "click", goog_bind(this.ug, this));
        this.P = querySelectorHlp("share-panel-url", this.c);
        yt_events_listen(this.P, "click", goog_bind(this.zg, this));
        yt_events_listen(
            this.P,
            "focus",
            goog_bind(function () {
                _addclass(this.P, "focused");
            }, this)
        );
        yt_events_listen(
            this.P,
            "blur",
            goog_bind(function () {
                _removeclass(this.P, "focused");
            }, this)
        );
        this.hg = querySelectorHlp("share-panel-long-url", this.c);
        this.Vc = querySelectorHlp("share-panel-start-at", this.c);
        this.T = querySelectorHlp("share-panel-start-at-time", this.c);
        yt_events_listen(this.T, "keyup", goog_bind(this.Ag, this));
        yt_events_listen(this.T, "click", goog_bind(this.xg, this));
        yt_events_listen(
            this.T,
            "focus",
            goog_bind(function () {
                _addclass(this.T, "focused");
            }, this)
        );
        yt_events_listen(
            this.T,
            "blur",
            goog_bind(function () {
                _removeclass(this.T, "focused");
            }, this)
        );
        this.me = querySelectorHlp("share-panel-hd", this.c);
        this.ne = querySelectorHlp("share-panel-include-list", this.c);
        this.Wb = querySelectorHlp("share-panel-url-options", this.c);
        yt_events_listen(this.Wb, "click", goog_bind(this.Xc, this));
        this.Rc = querySelectorHlp("share-panel-services", this.c);
        this.fe = querySelectorHlp("share-panel-buttons", this.c);
        a = querySelectorHlp("share-panel-show-more", this.c);
        yt_events_listen(a, "click", goog_bind(this.wg, this));
    };
    zj.prototype.na = function () {
        this.P && !_hasclass(this.P, "focused") && (this.P.focus(), this.P.select());
    };
    var Cj = function (a) {
        var b = Bj;
        b.T && !_hasclass(b.T, "focused") && !b.we && ((b.T.value = a), b.Xc());
    };
    n = zj.prototype;
    n.Xc = function () {
        if (!_hasclass(this.P, "focused")) {
            var a = this.Gf;
            this.hg.checked && (a = this.Ud);
            var b = {};
            this.me && this.me.checked && (b.hd = 1);
            this.ne && this.ne.checked && (b.list = this.G);
            var c = this.Vc.checked && Aj(this.T.value);
            c && (b.t = c);
            a = yt_uri_appendQueryData(a, b);
            this.P.value != a && (this.P.value = a);
        }
    };
    n.Ag = function () {
        this.we = trueVar;
        this.Vc.checked = trueVar;
        this.Xc();
    };
    n.xg = function () {
        this.Vc.checked = trueVar;
        this.T.value.match(/[1-9]/) || (this.T.value = "");
    };
    n.zg = function () {
        this.P.select();
    };
    n.sg = function () {
        var a = th.getInstance();
        a.collapse(this.fe);
        a.collapse(this.Wb);
        a.collapse(this.Rc);
        this.S && _hidediv(this.S);
        this.R || (this.R = querySelectorHlp("share-panel-email-container", this.c));
        Ee(this.R);
        !getDataAttr(this.R, "disabled") &&
            yt_style_isDisplayed(this.R) &&
            (this.pe ? this.pe.na() : (this.pe = new pj(this.R, this.Ca, this.H, this.G)));
    };
    n.ug = function () {
        var a = mj();
        a && a.pauseVideo && a.pauseVideo();
        var a = yt_uri_appendQueryData("https://talkgadget.google.com/hangouts", {
                hl: this.Tb,
                authuser: this.Ca,
                gid: "youtube",
                gd: this.H
            }),
            b = window.screen.height,
            c = Math.min(0.9 * window.screen.width, 1e3),
            b = Math.min(0.9 * b, 800);
        yt_tracking_share("HANGOUT", this.H + "");
        yt_window_popup(a, { width: c, height: b });
    };
    n.tg = function () {
        var a = th.getInstance();
        a.collapse(this.fe);
        a.collapse(this.Wb);
        a.collapse(this.Rc);
        this.R && _hidediv(this.R);
        this.S || (this.S = querySelectorHlp("share-panel-embed-container", this.c));
        Ee(this.S);
        !getDataAttr(this.S, "disabled") &&
            yt_style_isDisplayed(this.S) &&
            (this.re ? this.re.na() : (this.re = new sj(this.S, this.H, this.G)));
    };
    n.yg = function () {
        th.getInstance().collapse(this.Rc);
        this.R && _hidediv(this.R);
        this.S && _hidediv(this.S);
    };
    n.vg = function () {
        th.getInstance().collapse(this.Wb);
        this.R && _hidediv(this.R);
        this.S && _hidediv(this.S);
    };
    n.wg = function () {
        this.R && _hidediv(this.R);
        this.S && _hidediv(this.S);
    };
    var Dj = function () {};
    n = Dj.prototype;
    n.jf = falseVar;
    n.Hb = nullVar;
    n.kc = nullVar;
    n.Yh = function () {
        if (!this.jf) {
            this.jf = trueVar;
            this.Hb = querySelectorHlp("player-root", undefinedVar);
            this.kc = querySelectorHlp("player-actions-container", this.Hb);
            var a = querySelectorHlp("player-actions-close", this.kc);
            yt_events_listen(a, "click", goog_bind(this.Z, this));
        }
    };
    n.Z = function () {
        A(this.Hb, "actions-mode", falseVar);
    };
    n.Xh = function () {
        600 > this.Hb.clientWidth && _addclass(this.kc, "small-view");
    };
    n.Dd = nullVar;
    n.Oi = function (a, b) {
        this.Yh();
        A(this.Hb, "actions-mode", trueVar);
        if (this.Dd) this.Dd.na();
        else {
            var c = querySelectorHlp("player-actions-share", this.kc);
            this.Dd = new zj(c, a, b, goog_bind(this.Xh, this), { db: 1 });
        }
    };
    
    Zf();

    var Ej = Uf("yt.player.logger");
    Ej.Cc(Of);

    var html5_video_canPlayLightCodecs = function () {
        if (
            navigator &&
            navigator.userAgent &&
            /android 2\.2/.test(navigator.userAgent.toLowerCase())
        )
            return trueVar;
        var videoEl = document.createElement("video");
        return (
            videoEl &&
            videoEl.canPlayType &&
            (videoEl.canPlayType('video/mp4; codecs="avc1.42001E, mp4a.40.2"') ||
                videoEl.canPlayType('video/webm; codecs="vp8.0, vorbis"'))
        );
    };

    var yt_playerConfig = getProp("yt.playerConfig") || {};
    exportSymbol("yt.playerConfig", yt_playerConfig);
    
    var yt_playerReferences = getProp("yt.player.playerReferences_") || {};
    exportSymbol("yt.player.playerReferences_", yt_playerReferences);

    var yt_player_embed = function (playerId, playerConfig, options) {
        var playerEl = _gel(playerId);
        if (playerEl) {
            var playerConfigObj = playerConfig instanceof YtPlayerConfig ? playerConfig : new YtPlayerConfig(playerConfig);

            var playerConfig = !!playerConfigObj.disable.html5,
                playerId = !!playerConfigObj.disable.flash,
                f = html5_video_canPlayLightCodecs() && (getProp("yt.player.VideoPlayer") || playerConfigObj.assets.js);
            
            playerConfigObj.args.eurl || (playerConfigObj.args.eurl = Ij());
            playerConfigObj.args.enablejsapi = "1";
            var g = falseVar;
            playerConfigObj.html5 && (g = trueVar);
            g && !f && (playerConfigObj.args.html5_unavailable = "1");
            var j = { pubsub: new lf(), subscribedEvents: {} },
                o = playerEl;
            options || (Jj(playerEl), (o = querySelectorHlp("player-container", playerEl)));
            var playerEl = "player" + getUid(o),
                x = !playerConfigObj.args.jsapicallback,
                C = {
                    target: o,
                    playerId: playerEl,
                    playerapiid: playerConfigObj.args.playerapiid,
                    jsapicallback: Kj(playerConfigObj.args.jsapicallback),
                    elementId: playerConfigObj.attrs.id,
                    api: j,
                    onReadyCalled: falseVar,
                    eventLabel: playerConfigObj.args.el,
                    actions: new Dj()
                };
            playerConfigObj.args.playerapiid = playerEl;
            playerConfigObj.args.jsapicallback = "ytPlayerOnYouTubePlayerReady";
            var F,
                I,
                ka = !options ? load_flash_player : initFlashPlayer;
            g && f ? ((F = load_html5_player_js), playerId || (I = ka)) : ((F = ka), f && !playerConfig && (I = Mj));
            I &&
                (playerConfigObj.fallback = function (a) {
                    a = a || playerConfigObj;
                    a instanceof YtPlayerConfig || (a = new YtPlayerConfig(a));
                    delete a.fallback;
                    g
                        ? (a.args.autoplay = 1)
                        : ajaxRequest("/html5", {
                                kb: trueVar,
                                method: "POST",
                                n: { prefer_html5: trueVar, session_token: yt_net_ajax_tokenMap_.html5_ajax }
                            });
                    a.attrs.id = C.elementId;
                    I(o, a);
                });
            playerConfigObj.fallbackMessage = yt_videoPlayer_fallback_message(o);
            yt_playerReferences[playerEl] = C;
            yt_setTimeout(function () {
                if (options) {
                    var a = _gel(playerConfigObj.attrs.id),
                        b = falseVar;
                    try {
                        (a.getApiInterface(), (b = trueVar));
                    } catch (d) {}
                    x &&
                        (window.onYouTubePlayerReady = function () {
                            ytPlayerOnYouTubePlayerReady(C.playerId);
                        });
                    F(playerConfigObj, options.force);
                    b && ytPlayerOnYouTubePlayerReady(C.playerId);
                } else F(o, playerConfigObj);
            }, 0);
            return j;
        }
    };

    // function yt_player_embed(containerId, configInput, embedOptions) {
    //     var containerElement = _gel(containerId);
    //     if (!containerElement) {
    //         return;
    //     }

    //     var config =
    //         configInput instanceof YtPlayerConfig
    //             ? configInput
    //             : new YtPlayerConfig(configInput);

    //     var disableHtml5 = !!config.disable.html5;
    //     var disableFlash = !!config.disable.flash;

    //     var html5Supported =
    //         html5_video_canPlayLightCodecs() &&
    //         (getProp("yt.player.VideoPlayer") || config.assets.js);
    //     var html5Requested = !!config.html5;

    //     config.args.eurl || (config.args.eurl = Ij());
    //     config.args.enablejsapi = "1";

    //     var api = {
    //         pubsub: new lf(),
    //         subscribedEvents: {}
    //     };

    //     var targetElement = containerElement;

    //     if (!embedOptions) {
    //         Jj(containerElement);
    //         targetElement = querySelectorHlp(
    //             "player-container",
    //             containerElement
    //         );
    //     }

    //     var playerApiId =
    //         "player" + getUid(targetElement);

    //     var apiContext = {
    //         target: targetElement,
    //         playerId: playerApiId,
    //         playerapiid: config.args.playerapiid,
    //         jsapicallback: Kj(config.args.jsapicallback),
    //         elementId: config.attrs.id,
    //         api: api,
    //         onReadyCalled: false,
    //         eventLabel: config.args.el,
    //         actions: new Dj()
    //     };

    //     config.args.playerapiid = playerApiId;
    //     config.args.jsapicallback =
    //         "ytPlayerOnYouTubePlayerReady";

    //     var flashLoader =
    //         embedOptions
    //             ? initFlashPlayer
    //             : load_flash_player;

    //     var primaryLoader;
    //     var fallbackLoader;

    //     if (html5Requested && html5Supported) {
    //         // Prefer HTML5
    //         primaryLoader = load_html5_player_js;
    //         if (!disableFlash) {
    //             fallbackLoader = flashLoader;
    //         }
    //     } else {
    //         // Prefer Flash
    //         primaryLoader = flashLoader;
    //         if (html5Supported && !disableHtml5) {
    //             fallbackLoader = load_html5_player_js;
    //         }
    //     }

    //     if (fallbackLoader) {
    //         config.fallback = function(fallbackConfig) {
    //             var fallback =
    //                 fallbackConfig || config;

    //             if (!(fallback instanceof YtPlayerConfig)) {
    //                 fallback = new YtPlayerConfig(fallback);
    //             }

    //             delete fallback.fallback;

    //             if (html5Requested) {
    //                 fallback.args.autoplay = 1;

    //             } else {
    //                 ajaxRequest("/html5", {
    //                     useAbsoluteUrl: true,
    //                     method: "POST",
    //                     additionalData: {
    //                         prefer_html5: true,
    //                         session_token:
    //                             yt_net_ajax_tokenMap_.html5_ajax
    //                     }
    //                 });
    //             }

    //             fallback.attrs.id =
    //                 apiContext.elementId;

    //             fallbackLoader(targetElement, fallback);
    //         };
    //     }

    //     config.fallbackMessage = yt_videoPlayer_fallback_message(targetElement);

    //     yt_playerReferences[playerApiId] =
    //         apiContext;

    //     yt_setTimeout(function() {
    //         if (embedOptions) {
    //             var existingPlayer = _gel(config.attrs.id);

    //             var hasApi = false;

    //             try {
    //                 existingPlayer.getApiInterface();
    //                 hasApi = true;
    //             }
    //             catch (_) {}

    //             if (!config.args.jsapicallback) {
    //                 window.onYouTubePlayerReady =
    //                     function() {
    //                         ytPlayerOnYouTubePlayerReady(
    //                             apiContext.playerId
    //                         );
    //                     };
    //             }

    //             primaryLoader(
    //                 targetElement,
    //                 config
    //             );

    //             if (hasApi) {
    //                 ytPlayerOnYouTubePlayerReady(
    //                     apiContext.playerId
    //                 );
    //             }
    //         } else {
    //             primaryLoader(
    //                 targetElement,
    //                 config
    //             );
    //         }
    //     }, 0);

    //     return api;
    // }

    var yt_videoPlayer_fallback_message = function (a) {
            return function () {
                var b = yt_getMsg(
                        "PLAYER_FALLBACK",
                        undefinedVar,
                        'The Adobe Flash Player or an HTML5 supported browser is required for video playback. <br> <a href="http://get.adobe.com/flashplayer/">Get the latest Flash Player</a> <br> <a href="/html5">Learn more about upgrading to an HTML5 browser</a>'
                    ),
                    c = navigator.userAgent.match(/Version\/(\d).*Safari/);
                c &&
                    5 <= parseInt(c[1], 10) &&
                    (b = yt_getMsg(
                        "QUICKTIME_FALLBACK",
                        undefinedVar,
                        'The Adobe Flash Player or QuickTime is required for video playback. <br> <a href="http://get.adobe.com/flashplayer/">Get the latest Flash Player</a> <br> <a href="http://www.apple.com/quicktime/download/">Get the latest version of QuickTime</a>'
                    ));
                a.innerHTML = '<div class="fallback-message">' + b + "</div>";
            };
        },
        Jj = function (a) {
            _addclass(a, "player-root");
            isString("overflow") ? le(a, "hidden", "overflow") : ub("overflow", partialApply(le, a));
            var b = sc("div", "player-container"),
                c = sc(
                    "div",
                    "player-actions-container",
                    sc("div", "player-actions-share"),
                    sc("div", "player-actions-close", sc("div", "player-actions-close-button"))
                );
            xc(a, b, c);
        },
        load_html5_player_js = function (a, b) {
            clearNodeChildrenById(a);
            b.attrs.id += "-html5";
            var yt_player_VideoPlayer = getProp("yt.player.VideoPlayer");
            // check if html5 player is loaded
            if (yt_player_VideoPlayer) {
                new yt_player_VideoPlayer(a, b);
            } else {
                // load, then create instance
                yt_net_scriptloader_load(b.assets.js, function () {
                    new (getProp("yt.player.VideoPlayer"))(a, b);
                });
            }
        },
        load_flash_player = function (a, b) {
            clearNodeChildrenById(a);
            b.attrs.id += "-flash";
            yt_flash_embed(a, b);
        },
        clearNodeChildrenById = function (a) {
            a = _gel(a);
            removeAllChildren(a);
        },
        Ij = function () {
            var a = "unknown";
            document.referrer && (a = document.referrer.substring(0, 128));
            return a;
        },
        ytPlayerOnYouTubePlayerReady = function (a) {
            var b = yt_playerReferences[a],
                c = goog_dom_getFirstElementChild(_gel(b.target)),
                a = c.getApiInterface();
            Array_forEach(a, function (a) {
                b.api[a] = goog_bind(c[a], c);
            });
            b.api.nativeAddEventListener = goog_bind(b.api.addEventListener, c);
            for (var d in b.api.subscribedEvents) b.api.nativeAddEventListener(d, Rj(b.api, d));
            b.api.addEventListener = Sj;
            "embedded" === b.eventLabel &&
                b.api.addEventListener("SHARE_CLICKED", goog_bind(b.actions.Oi, b.actions));
            b.onReadyCalled ||
                ((b.onReadyCalled = trueVar),
                b.jsapicallback && (d = b.jsapicallback) && d(b.playerapiid),
                window.onYouTubePlayerReady && onYouTubePlayerReady(b.playerapiid));
        },
        Rj = function (a, b) {
            var c = "ytPlayer" + (b + getUid(a)),
                d = goog_bind(function (a) {
                    this.pubsub.publish(b, a);
                }, a);
            exportSymbol(c, d);
            return c;
        },
        Sj = function (a, b) {
            var c = Kj(b);
            this.subscribedEvents[a] || this.nativeAddEventListener(a, Rj(this, a));
            this.subscribedEvents[a] = 1;
            this.pubsub.subscribe(a, c);
        },
        Kj = function (a) {
            var b = a;
            "string" == typeof a &&
                (b = function () {
                    getProp(a).apply(window, arguments);
                });
            b || (b = getProp("onYouTubePlayerReady"));
            return b;
        };
    getProp("ytPlayerOnYouTubePlayerReady") || exportSymbol("ytPlayerOnYouTubePlayerReady", ytPlayerOnYouTubePlayerReady);
    exportSymbol("yt.net.ajax.setToken", yt_net_ajax_setToken);
    exportSymbol("yt.tracking.share", yt_tracking_share);
    exportSymbol("yt.window.popup", yt_window_popup);
    yt_uix_registerWidget(X);
    yt_uix_registerWidget(th);
    yt_uix_registerWidget(xh);
    yt_uix_registerWidget(Dh);
    Zf();
    var yt_timing = getProp("yt.timing") || {};
    exportSymbol("yt.timing", yt_timing);
    yt_timing.vi = 0;
    yt_timing.tf = 0;
    yt_timing.Bc = function (a, b) {
        var c = yt_timing.timer || {};
        c[a] = b ? b : oa();
        yt_timing.timer = c;
    };
    yt_timing.info = function (a, b) {
        var c = yt_timing.info_args || {};
        c[a] = b;
        yt_timing.info_args = c;
    };
    yt_timing.report = function (a) {
        var a = a || yt_getConfig("TIMING_ACTION"),
            b = yt_timing.timer || {},
            c = yt_timing.info_args || {},
            d = b.start,
            e = "",
            f = [],
            g = [];
        delete b.start;
        yt_timing.srt && (e = "&srt=" + yt_timing.srt);
        b.aft && b.plev && (b.aft = Math.min(b.aft, b.plev));
        for (var j in b) f.push(j + "." + Math.round(b[j] - d));
        for (j in c) g.push(j + "=" + c[j]);
        b.vr && b.gv && f.push("vl." + Math.round(b.vr - b.gv));
        !b.aft && b.vr && b.cl
            ? b.cl > b.vr
                ? f.push("aft." + Math.round(b.cl - d))
                : f.push("aft." + Math.round(b.vr - d))
            : !b.aft && b.vr
              ? f.push("aft." + Math.round(b.vr - d))
              : b.aft || f.push("aft." + Math.round(b.ol - d));
        tracker_sendImageBeacon(
            [
                "https:" == window.location.protocol
                    ? "https://gg.google.com/csi"
                    : "http://csi.gstatic.com/csi",
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
    yt_timing.maybeReport = function () {
        var a = yt_getConfig("TIMING_ACTION"),
            b = yt_timing.timer || {};
        a &&
            b.start &&
            (yt_timing.wff && -1 != a.indexOf("ajax") && b.vr && b.cl
                ? yt_timing.report()
                : yt_timing.wff && -1 == a.indexOf("ajax") && b.vr
                  ? yt_timing.report()
                  : !yt_timing.wff && (b.ol || b.aft) && yt_timing.report());
    };
    yt_timing.handlePageLoad = function () {
        yt_timing.Bc("ol");
        yt_timing.maybeReport();
    };
    yt_timing.handleThumbnailLoad = function (a) {
        var b = ++yt_timing.vi;
        "undefined" != typeof a && 4 > a && yt_timing.tf++;
        4 == yt_timing.tf && yt_timing.Bc("tn_c4");
        (1 != b && 5 != b && 10 != b && 20 != b && 30 != b) || yt_timing.Bc("tn" + b);
    };
    var Tj = function () {
        this.L = {};
    };
    inherits(Tj, ih);
    createSingleton(Tj);
    Tj.prototype.K = "char-counter";
    Tj.prototype.M = function () {
        this.addBehavior("keydown", this.Sd, "input");
        this.addBehavior("paste", this.Sd, "input");
        this.addBehavior("cut", this.Sd, "input");
    };
    Tj.prototype.Sd = function (a) {
        var b = jh(this, a);
        if (b) {
            var c = "true" == this.getData(b, "count-char-by-size"),
                d = parseInt(this.getData(b, "char-limit"), 10);
            isNaN(d) ||
                0 >= d ||
                yt_setTimeout(
                    goog_bind(function () {
                        var e = parseInt(a.getAttribute("maxlength"), 10);
                        if (!isNaN(e)) {
                            var f = Uj(a, c);
                            if (c) {
                                if (f > e) {
                                    var g = a.value,
                                        j = g.length,
                                        o = 0,
                                        e = f - e,
                                        f = "",
                                        x = 0;
                                    do
                                        ((f += g[j - o]),
                                            (x = unescape(encodeURIComponent(f)).length),
                                            o++);
                                    while (x < e);
                                    a.value = a.value.substring(0, j - o);
                                }
                            } else f > e && (a.value = a.value.substring(0, e));
                        }
                        g = parseInt(this.getData(b, "warn-at-chars-remaining"), 10);
                        isNaN(g) && (g = 0);
                        j = d - Uj(a, c);
                        A(b, yt_uix_getWidgetName(this, "maxed-out"), j < g);
                        querySelectorHlp(yt_uix_getWidgetName(this, "remaining"), b).innerHTML = j;
                    }, this),
                    0
                );
        }
    };
    var Uj = function (a, b) {
        var c = a.value;
        return b ? unescape(encodeURIComponent(c)).length : c.length;
    };
    var Vj = function () {
        this.L = {};
    };
    inherits(Vj, ih);
    Vj.prototype.isNotIE6 = function () {
        return this.isJscriptIE && 0 == browserVersionStr.indexOf("6") ? falseVar : trueVar;
    };
    Vj.prototype.show = function (a) {
        var b = jh(this, a);
        if (b) {
            _addclass(b, yt_uix_getWidgetName(this, "active"));
            var c = yt_uix_createWidgetCard(this, a, b);
            if (c) {
                c.cardTargetNode = a;
                c.cardRootNode = b;
                Xj(this, a, c);
                var d = yt_uix_getWidgetName(this, "card-visible");
                yt_setTimeout(function () {
                    _showdiv(c);
                    _addclass(c, d);
                }, 10);
                this.wa(b, "card-action", a);
            }
        }
    };
    var yt_uix_createWidgetCard = function (widget, triggerElement, sourceElement) {
            var cardClass = yt_uix_getWidgetName(widget, "card"),
                cardId = cardClass + getElementUid(sourceElement),
                cardEl = _gel(cardId);

            if (cardEl) return cardEl;

            var g = widget.rb(sourceElement);
            if (!g) return nullVar;
            
            cardEl = document.createElement("div");
            cardEl.id = cardId;
            cardEl.className = cardClass;
            (sourceElement = getDataAttr(sourceElement, "card-class")) && _addclass(cardEl, sourceElement);
            sourceElement = document.createElement("div");
            sourceElement.className = yt_uix_getWidgetName(widget, "card-border");
            triggerElement = widget.getData(triggerElement, "orientation") || "horizontal";
            cardClass = document.createElement("div");
            cardClass.className = "yt-uix-card-border-arrow yt-uix-card-border-arrow-" + triggerElement;
            cardId = document.createElement("div");
            cardId.className = yt_uix_getWidgetName(widget, "card-body");
            widget = document.createElement("div");
            widget.className = "yt-uix-card-body-arrow yt-uix-card-body-arrow-" + triggerElement;
            zc(g);
            cardId.appendChild(g);
            sourceElement.appendChild(widget);
            sourceElement.appendChild(cardId);
            cardEl.appendChild(cardClass);
            cardEl.appendChild(sourceElement);
            document.body.appendChild(cardEl);
            return cardEl;
        },
        
        Xj = function (a, b, c) {
            var d = a.getData(b, "orientation") || "horizontal",
                e = a.getData(b, "position"),
                f = !!a.getData(b, "force-position"),
                d = "horizontal" == d,
                g = "bottomright" == e || "bottomleft" == e,
                e = "topright" == e || "bottomright" == e,
                j,
                o;
            e && g
                ? ((o = 7), (j = 4))
                : e && !g
                  ? ((o = 6), (j = 5))
                  : !e && g
                    ? ((o = 5), (j = 6))
                    : ((o = 4), (j = 7));
            var x = se(document.body),
                C = se(b);
            x != C && (o ^= 2);
            var F;
            d
                ? ((C = b.offsetHeight / 2 - 24), (F = new B(-12, b.offsetHeight + 6)))
                : ((C = b.offsetWidth / 2 - 12), (F = new B(b.offsetWidth + 6, -12)));
            var I = nullVar;
            f || (I = 10);
            var ka = yt_uix_getWidgetName(a, "card-flip"),
                a = yt_uix_getWidgetName(a, "card-reverse");
            A(c, ka, e);
            A(c, a, g);
            I = $g(b, o, c, j, F, nullVar, I);
            !f &&
                I &&
                (I & 48 && ((e = !e), (o ^= 2), (j ^= 2)),
                I & 192 && ((g = !g), (o ^= 1), (j ^= 1)),
                A(c, ka, e),
                A(c, a, g),
                $g(b, o, c, j, F));
            b = querySelectorHlp("yt-uix-card-body-arrow", c);
            f = querySelectorHlp("yt-uix-card-border-arrow", c);
            c = xe(c);
            C = Math.max(6, Math.min(C, (d ? c.height : c.width) - 24 - 6));
            c = d ? (g ? "top" : "bottom") : (!x && e) || (x && !e) ? "left" : "right";
            b.setAttribute("style", "");
            f.setAttribute("style", "");
            b.style[c] = C + "px";
            f.style[c] = C + "px";
        };
    Vj.prototype.Z = function (a) {
        var b = jh(this, a);
        if (b && (a = yt_uix_createWidgetCard(this, a, b)))
            (_removeclass(b, yt_uix_getWidgetName(this, "active")),
                _removeclass(a, yt_uix_getWidgetName(this, "card-visible")),
                _hidediv(a),
                (a.cardTargetNode = nullVar),
                (a.cardRootNode = nullVar));
    };
    var Yj = function (a, b) {
        var c = jh(a, b);
        return !c ? falseVar : _hasclass(c, yt_uix_getWidgetName(a, "active"));
    };
    Vj.prototype.rb = function (a) {
        var b = a.cardContentNode;
        if (!b) {
            var c = yt_uix_getWidgetName(this, "content"),
                d = yt_uix_getWidgetName(this, "card-content"),
                b = querySelectorHlp(c, a);
            y(b, c, d);
            a.cardContentNode = b;
        }
        return b;
    };
    Vj.prototype.nf = { ji: 200, Ai: 200 };
    var Zj = function () {
        this.L = {};
    };
    inherits(Zj, Vj);
    createSingleton(Zj);
    Zj.prototype.K = "clickcard";
    Zj.prototype.M = function () {
        this.addBehavior("click", this.Fi, "target");
        this.addBehavior("click", this.Ei, "close");
    };
    Zj.prototype.Fi = function (a) {
        var b = jh(this, a);
        _hasclass(b, yt_uix_getWidgetName(this, "active"))
            ? (this.Z(a), _removeclass(b, yt_uix_getWidgetName(this, "active")))
            : (this.show(a), _addclass(b, yt_uix_getWidgetName(this, "active")));
    };
    Zj.prototype.Ei = function (a) {
        (a = Dd(a, yt_uix_getWidgetName(this, "card"))) && this.Z(a.cardTargetNode);
    };
    var $j = function () {
        this.L = {};
    };
    inherits($j, ih);
    createSingleton($j);
    n = $j.prototype;
    n.K = "form-input";
    n.M = function () {
        isIEBrowser &&
            !isBrowserVersionBelow(9) &&
            (this.addBehavior("click", this.pf, "checkbox"),
            this.addBehavior("keypressed", this.pf, "checkbox"),
            this.addBehavior("click", this.qf, "radio"),
            this.addBehavior("keypressed", this.qf, "radio"));
        this.addBehavior("blur", this.hi, "select-element");
        this.addBehavior("change", this.Hd, "select-element");
        this.addBehavior("focus", this.ii, "select-element");
        this.addBehavior("keyup", this.Gd, "text");
        this.addBehavior("keyup", this.Gd, "textarea");
        this.addBehavior("keyup", this.Gd, "bidi");
    };
    n.pf = function (a) {
        var b = K(a, nullVar, yt_uix_getWidgetName(this, "checkbox-container"));
        A(b, "checked", a.checked);
    };
    n.qf = function () {
        var a = kc(yt_uix_getWidgetName(this, "radio")),
            b = yt_uix_getWidgetName(this, "radio-container");
        Array_forEach(a, function (a) {
            var d = K(a, nullVar, b);
            d && A(d, "checked", a.checked);
        });
    };
    n.Gd = function (a) {
        var b = a.value,
            c = "";
        goog_i18n_bidi_isRtlText(b) ? (c = "rtl") : dd.test(b) && (c = "ltr");
        a.dir = c;
    };
    n.ii = function (a) {
        a = K(a, nullVar, yt_uix_getWidgetName(this, "select"));
        _addclass(a, "focused");
    };
    n.hi = function (a) {
        a = K(a, nullVar, yt_uix_getWidgetName(this, "select"));
        _removeclass(a, "focused");
    };
    n.Hd = function (a) {
        var b = K(a, nullVar, yt_uix_getWidgetName(this, "select")),
            b = querySelectorHlp(yt_uix_getWidgetName(this, "select-value"), b),
            a = a.options[a.selectedIndex];
        b.innerHTML = a.text ? a.text : a.value;
    };
    var ak = function () {
        this.L = {};
    };
    inherits(ak, Vj);
    createSingleton(ak);
    n = ak.prototype;
    n.K = "hovercard";
    n.M = function () {
        this.addBehavior("mouseover", this.yi, "target", 5, trueVar);
        this.addBehavior("mouseout", this.wi, "target", 5, trueVar);
        this.addBehavior("mouseover", this.zi, "card", 100);
        this.addBehavior("mouseout", this.xi, "card", 100);
    };
    n.yi = function (a) {
        if (bk != a) {
            bk && (this.Z(bk), (bk = nullVar));
            var b = goog_bind(this.show, this, a),
                c = parseInt(this.getData(a, "delay-show"), 10),
                b = yt_setTimeout(b, -1 < c ? c : this.nf.ji);
            this.setData(a, "card-timer", b.toString());
            bk = a;
            a.alt && (this.setData(a, "card-alt", a.alt), (a.alt = ""));
            a.title && (this.setData(a, "card-title", a.title), (a.title = ""));
        }
    };
    n.wi = function (a) {
        var b = parseInt(this.getData(a, "card-timer"), 10);
        yt_clearTimeout(b);
        jh(this, a).isCardHidable = trueVar;
        b = parseInt(this.getData(a, "delay-hide"), 10);
        b = -1 < b ? b : this.nf.Ai;
        yt_setTimeout(goog_bind(this.Ci, this, a), b);
        if ((b = this.getData(a, "card-alt"))) a.alt = b;
        if ((b = this.getData(a, "card-title"))) a.title = b;
    };
    n.Ci = function (a) {
        jh(this, a).isCardHidable && (this.Z(a), (bk = nullVar));
    };
    n.zi = function (a) {
        a && (a.cardRootNode.isCardHidable = falseVar);
    };
    n.xi = function (a, b, c) {
        a && ((b = a.cardTargetNode), Cc(a, c.relatedTarget) || this.Z(b));
    };
    var bk = nullVar;
    var ck = function () {
        this.L = {};
    };
    inherits(ck, ih);
    createSingleton(ck);
    ck.prototype.K = "redirect-link";
    ck.prototype.M = function () {
        this.addBehavior("click", this.ma);
    };
    ck.prototype.ma = function (a) {
        if (!getDataAttr(a, "redirect-href-updated")) {
            setDataAttr(a, "redirect-href-updated", "true");
            var b = yt_getConfig("XSRF_REDIRECT_TOKEN"),
                c = yt_getConfig("XSRF_FIELD_NAME");
            if (b && c) {
                var d = {};
                d.q = a.href;
                d[c] = b;
                a.href = yt_uri_appendQueryData("/redirect", d);
            }
        }
    };
    var dk = function () {
        this.L = {};
    };
    inherits(dk, ih);
    createSingleton(dk);
    dk.prototype.K = "sessionlink";
    dk.prototype.M = function () {
        this.addBehavior("click", this.ma);
    };
    dk.prototype.ma = function (a) {
        var b = getDataAttr(a, "sessionlink-target") || a.href;
        if (b) {
            var c = getHostname(b);
            if (c == window.location.host || (!c && 0 == b.lastIndexOf("/", 0)))
                if (((b = getUrlPathAndQuery(b)), (c = b.indexOf("#")), (b = 0 > c ? b : b.substr(0, c))))
                    ((a = getDataAttr(a, "sessionlink") || ""),
                        (a = Pe(a)),
                        (b = "s_tempdata-" + hashString(b)),
                        (a = a ? yt_uri_buildQueryData(a) : ""),
                        yt_net_cookies_set(b, a, 5));
        }
    };
    var ek = function () {
        this.L = {};
    };
    inherits(ek, ih);
    createSingleton(ek);
    ek.prototype.K = "tile";
    ek.prototype.M = function () {
        this.addBehavior("click", this.ma);
    };
    ek.prototype.ma = function (a, b, c) {
        !K(c.target, "a") &&
            !K(c.target, "button") &&
            (a = querySelectorHlp(yt_uix_getWidgetName(this, "link"), a)) &&
            (isIEBrowser && !isBrowserVersionBelow(9) ? a.click() : yt_window_redirect(a.href));
    };
    var fk = function (a, b, c) {
        this.oi = b;
        this.qi = c;
        this.ri = "ad_creative_" + a;
        this.pi = "ad_creative_expand_btn_" + a;
        this.ni = "ad_creative_collapse_btn_" + a;
    };
    fk.prototype.collapse = function () {
        _hidediv(this.ri);
        ui(_gel("page"), trueVar);
        ri();
        this.qi || _hidediv(this.ni);
        _showdiv(this.pi);
        var a = de.getInstance();
        a.set("HIDDEN_MASTHEAD_ID", this.oi);
        a.save();
        Xg("homepage_collapse_masthead_ad", undefinedVar, undefinedVar);
    };
    fk.prototype.expand = function () {
        var a = de.getInstance();
        a.set("HIDDEN_MASTHEAD_ID", falseVar);
        a.save();
        Xg("homepage_expand_masthead_ad", undefinedVar, undefinedVar);
        yt_window_redirect(document.location.href);
    };
    var gk = function (a) {
            var b;
            switch (a) {
                case "PENDING":
                    b = yt_getMsg("COMMENT_PENDING");
                    break;
                case "BLOCKED":
                    b = yt_getMsg("COMMENT_BLOCKED");
                    break;
                case "EMAIL":
                    b = yt_getMsg("COMMENT_ERROR_EMAIL");
                    break;
                case "INLINE_CAPTCHAFAIL":
                    b = yt_getMsg("COMMENT_CAPTCHAFAIL");
            }
            return b || nullVar;
        },
        hk = function (a, b) {
            this.i = a;
            this.oa = Ed("button", nullVar, a);
            this.aa = Ed("textarea", nullVar, a);
            this.Fa = nullVar;
            this.md = querySelectorHlp("comments-remaining-count", this.i);
            this.Pg = parseInt(this.md.innerHTML, 10);
            this.Wa = querySelectorHlp("comments-post-message", this.i);
            this.ae = querySelectorHlp("yt-alert-content", this.Wa);
            yt_events_listen(this.aa, "focus", goog_bind(this.Ce, this));
            yt_events_listen(this.aa, "blur", goog_bind(this.Wg, this));
            yt_events_listen(this.i, "submit", goog_bind(this.Tc, this));
            var c = goog_bind(this.Xg, this);
            yt_events_listen(this.aa, "change", c);
            yt_events_listen(this.aa, "keyup", c);
            b && this.Ce();
        };
    hk.prototype.reset = function () {
        ik(this);
        this.aa.blur();
        _removeclass(this.i, "has-focus");
        this.oa.disabled = falseVar;
        this.setValue("");
    };
    hk.prototype.focus = function () {
        this.aa.focus();
    };
    hk.prototype.setValue = function (a) {
        this.aa.value = a;
        var b = this.aa,
            a = a.length,
            c;
        try {
            c = "number" == typeof b.selectionStart;
        } catch (d) {
            c = falseVar;
        }
        c
            ? ((b.selectionStart = a), (b.selectionEnd = a))
            : isIEBrowser &&
              ("textarea" == b.type &&
                  (a = b.value.substring(0, a).replace(/(\r\n|\r|\n)/g, "\n").length),
              (b = b.createTextRange()),
              b.collapse(trueVar),
              b.move("character", a),
              b.select());
        jk(this);
    };
    var ik = function (a) {
            a.Fa && (a.Fa.innerHTML = "");
        },
        jk = function (a) {
            var b = a.Pg - a.aa.value.length;
            a.md.innerHTML = b + "";
            b = 0 > b;
            A(a.md, "too-many", b);
            a.oa.disabled = b;
        };
    hk.prototype.Xg = function () {
        jk(this);
    };
    hk.prototype.Ce = function () {
        _hasclass(this.i, "has-focus") || _hidediv(this.Wa);
        _addclass(this.i, "has-focus");
        yt_pubsub_publish("comments-focus", this.i);
    };
    hk.prototype.Wg = function () {
        yt_pubsub_publish("comments-blur", this.i);
    };
    hk.prototype.Tc = function (a) {
        a.preventDefault();
        if (!this.oa.disabled) {
            this.oa.disabled = trueVar;
            a = Pe(goog_dom_forms_getFormDataString(this.i));
            a.screen = yt_uri_buildQueryData({
                h: window.screen.height,
                w: window.screen.width,
                d: window.screen.colorDepth
            });
            var b = a.comment,
                b = { return_ajax: "true", len: b.length, wc: b.split(/\s+/).length };
            this.i.reply_parent_id.value && (b.reply = 1);
            ajaxRequest(this.i.action, {
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
                            e = goog_dom_getFirstElementChild(e);
                            if (this.i.reply_parent_id.value) {
                                var f = K(this.i, nullVar, "comments-post-container"),
                                    g = K(f, nullVar, "comment");
                                zc(f);
                                y(g, "replying", "has-child");
                                _addclass(e, "child");
                                A(
                                    e,
                                    "last",
                                    !(g.nextElementSibling != undefinedVar
                                        ? g.nextElementSibling
                                        : Ac(g.nextSibling))
                                );
                                g.parentNode && g.parentNode.insertBefore(e, g.nextSibling);
                            } else
                                ((f = K(this.i, nullVar, "comments-section")),
                                    (f = querySelectorHlp("comment-list", f)),
                                    f.insertBefore(e, f.childNodes[0] || nullVar),
                                    this.reset());
                            ti(e);
                            break;
                        case "PENDING":
                            ik(this);
                            this.ae.innerHTML = yt_getMsg("COMMENT_PENDING");
                            y(this.Wa, "yt-alert-error", "yt-alert-info");
                            _showdiv(this.Wa);
                            break;
                        default:
                            kk(this, e);
                    }
                },
                j: this
            });
        }
    };
    var kk = function (a, b) {
        a.ae.innerHTML = gk(b) || yt_getMsg("COMMENT_ERROR");
        y(a.Wa, "yt-alert-info", "yt-alert-error");
        _showdiv(a.Wa);
        switch (b) {
            case "INLINE_CAPTCHA":
            case "INLINE_CAPTCHAFAIL":
                ajaxRequest("/comment_servlet?gimme_captcha=1", {
                    format: "XML",
                    method: "POST",
                    n: { session_token: yt_net_ajax_tokenMap_.comment_servlet },
                    f: function (a, b) {
                        if (!this.Fa) {
                            this.Fa = document.createElement("div");
                            this.Fa.className = "comment-captcha";
                            var e = this.aa;
                            e.parentNode && e.parentNode.insertBefore(this.Fa, e.nextSibling);
                        }
                        this.Fa.innerHTML = b.html_content;
                        this.oa.disabled = falseVar;
                    },
                    j: a
                });
                break;
            default:
                ((a.oa.disabled = falseVar), ik(a));
        }
    };
    var lk = function (a) {
        this.c = a;
        this.Eb = querySelectorHlp("watch-more-comments-button");
        this.gg = !!yt_getConfig("ENABLE_LIVE_COMMENTS");
        this.cd();
    };
    lk.prototype.cd = function () {
        var a = querySelectorHlp("comments-pagination", this.c);
        a && getDataAttr(a, "ajax-enabled") && R(this.c, "click", goog_bind(this.th, this), "yt-uix-pager-button");
        yt_events_listen(this.Eb, "click", goog_bind(this.vh, this));
        R(this.c, "click", goog_bind(this.uh, this), "comments-section-pop-out");
    };
    lk.prototype.th = function (a) {
        a.preventDefault();
        a = a.currentTarget;
        if (!_hasclass(a, "yt-uix-button-toggled")) {
            var b = parseInt(getDataAttr(a, "page"), 10);
            _showdiv("comments-loading");
            yt_pubsub_publish("comments-page-changing");
            mk(this, b, function (a) {
                if (a) {
                    this.c.innerHTML = a;
                    ti(this.c);
                    var a = querySelectorHlp("comment-list", this.c),
                        d = querySelectorHlp("live-comments-setting", this.c);
                    a && yt_pubsub_publish("comments-page-changed", a, d, b);
                }
                _hidediv("comments-loading");
            });
        }
    };
    lk.prototype.vh = function () {
        _hidediv(this.Eb);
        _showdiv("watch-more-comments", "watch-more-comments-loading");
        var a = parseInt(getDataAttr(this.Eb, "page"), 10);
        mk(this, a, function (b) {
            var c = _gel("watch-more-comments");
            c.innerHTML += b;
            ti(c);
            setDataAttr(this.Eb, "page", a + 1);
            _showdiv(this.Eb);
            _hidediv("watch-more-comments-loading");
        });
    };
    lk.prototype.uh = function () {
        yt_window_popup(yt_getConfig("COMMENTS_POPUP_URL"), { width: 350, height: 500, resizable: trueVar });
    };
    var mk = function (a, b, c) {
        setDataAttr(a.c, "type", "everything");
        ajaxRequest("/watch_ajax?action_get_comments=1", {
            format: "XML",
            g: {
                v: yt_getConfig("VIDEO_ID"),
                p: b,
                commentthreshold: yt_getConfig("COMMENTS_THRESHHOLD"),
                commenttype: "everything",
                enable_live_comments: a.gg ? "yes" : nullVar,
                page_size: yt_getConfig("COMMENTS_PAGE_SIZE"),
                source: yt_getConfig("COMMENT_SOURCE")
            },
            f: function (a, b) {
                c.call(this, b.html_content);
            },
            j: a
        });
    };
    var wk = function (a) {
            var b = a.currentTarget,
                a = K(b, nullVar, "comment");
            switch (getDataAttr(b, "action")) {
                case "approve":
                    nk(a);
                    break;
                case "block":
                    confirm(yt_getMsg("BLOCK_USER")) && (ok(a, trueVar), _addclass(a, "blocked"));
                    break;
                case "unblock":
                    ok(a, falseVar);
                    _removeclass(a, "blocked");
                    break;
                case "flag":
                    pk(a);
                    break;
                case "unflag":
                    a = getDataAttr(a, "id");
                    ajaxRequest("/comment_servlet", {
                        format: "XML",
                        method: "POST",
                        n: {
                            unmark_comment_as_spam: a,
                            entity_id: yt_getConfig("VIDEO_ID"),
                            session_token: yt_net_ajax_tokenMap_.comment_servlet
                        }
                    });
                    break;
                case "hide":
                    _addclass(a, "hidden");
                    break;
                case "show":
                    _removeclass(a, "hidden");
                    break;
                case "remove":
                    qk(a);
                    break;
                case "reply":
                    if (rk())
                        if (_hasclass(a, "replying")) sk(a);
                        else {
                            _addclass(a, "replying");
                            tk(a);
                            var b = querySelectorHlp("comments-post", _gel("comments-view")),
                                b = Cd(b),
                                c = document.createElement("div");
                            c.className = "comments-post-container";
                            a.appendChild(c);
                            c.appendChild(b);
                            b = new hk(b);
                            b.reset();
                            c = getDataAttr(a, "id");
                            isDataAttrSet(a, "author") && b.setValue("@" + getDataAttr(a, "author") + " ");
                            b.i.reply_parent_id.value = c;
                            b.focus();
                        }
                    break;
                case "share":
                    uk(a);
                    break;
                case "close-share":
                    tk(a);
                    break;
                case "vote-up":
                    vk(a, trueVar);
                    break;
                case "vote-down":
                    vk(a, falseVar);
            }
        },
        rk = function () {
            return yt_getConfig("COMMENTS_SIGNIN_URL")
                ? (yt_window_redirect(yt_getConfig("COMMENTS_SIGNIN_URL")), falseVar)
                : !yt_getConfig("COMMENTS_YPC_CAN_POST_OR_REACT_TO_COMMENT")
                  ? falseVar
                  : trueVar;
        },
        nk = function (a) {
            var b = getDataAttr(a, "id"),
                c = yt_getConfig("VIDEO_ID");
            _removeclass(a, "pending");
            ajaxRequest("/comment_servlet?field_approve_comment=1", {
                format: "XML",
                method: "POST",
                n: { comment_id: b, entity_id: c, session_token: yt_net_ajax_tokenMap_.comment_servlet },
                Le: function () {
                    _addclass(a, "pending");
                }
            });
        },
        ok = function (a, b) {
            var c = {};
            c[(b ? "" : "un") + "block_user"] = 1;
            var d = getDataAttr(a, "author");
            ajaxRequest("/link_servlet", {
                format: "XML",
                method: "POST",
                g: c,
                n: { session_token: yt_net_ajax_tokenMap_.link_servlet, friend_username: d }
            });
        },
        pk = function (a) {
            if (rk()) {
                var b = getDataAttr(a, "id"),
                    c = yt_getConfig("VIDEO_ID");
                _hidediv(a);
                _addclass(a, "flagged");
                ajaxRequest("/comment_servlet", {
                    format: "XML",
                    method: "POST",
                    g: { mark_comment_as_spam: b, entity_id: c },
                    n: { session_token: yt_net_ajax_tokenMap_.comment_servlet },
                    Le: function () {
                        _showdiv(a);
                        _removeclass(a, "flagged");
                    }
                });
            }
        },
        qk = function (a) {
            var b = getDataAttr(a, "id"),
                c = yt_getConfig("VIDEO_ID");
            _hidediv(a);
            ajaxRequest("/comment_servlet?remove_comment=1", {
                format: "XML",
                method: "POST",
                n: { comment_id: b, entity_id: c, session_token: yt_net_ajax_tokenMap_.comment_servlet },
                Le: function () {
                    _showdiv(a);
                }
            });
        },
        sk = function (a) {
            _hasclass(a, "replying") && (_removeclass(a, "replying"), (a = querySelectorHlp("comments-post-container", a)), zc(a));
        },
        uk = function (a) {
            if (!_hasclass(a, "sharing")) {
                _addclass(a, "sharing");
                sk(a);
                var b = Cd(_gel("comment-share-area")),
                    c = document.createElement("div");
                c.className = "comments-post-container";
                a.appendChild(c);
                c.appendChild(b);
                var d = getDataAttr(a, "id"),
                    c = yt_getConfig("COMMENT_SHARE_URL"),
                    c = c.replace("_COMMENT_ID_", d);
                querySelectorHlp("comment-share-url", b).value = c;
                var a = querySelectorHlp("comment-text", a),
                    e = Ia(Jc(goog_dom_getFirstElementChild(a))),
                    a = kc("icon-comment-share", b);
                Array_forEach(a, function (a) {
                    var b = a.getAttribute("action"),
                        b = b.replace("_COMMENT_ID_", d),
                        c;
                    c = -1 != b.indexOf("twitter") ? Fa(e, 80) : Fa(e, 150);
                    b = b.replace("_COMMENT_TEXT_", c);
                    yt_events_listen(
                        a,
                        "click",
                        goog_bind(
                            function (a) {
                                eval(a);
                            },
                            thisVar,
                            b
                        )
                    );
                });
                _showdiv(b);
            }
        },
        tk = function (a) {
            _hasclass(a, "sharing") && (_removeclass(a, "sharing"), (a = querySelectorHlp("comments-post-container", a)), zc(a));
        },
        vk = function (a, b) {
            if (rk() && !getDataAttr(a, "voted")) {
                var c = getDataAttr(a, "id"),
                    d = yt_getConfig("VIDEO_ID"),
                    e = getDataAttr(a, "score"),
                    f = b ? 1 : -1;
                setDataAttr(a, "voted", f + "");
                b ? y(a, "voted-down", "voted-up") : y(a, "voted-up", "voted-down");
                c = { a: f, id: c, video_id: d, old_vote: e };
                (d = getDataAttr(a, "tag")) && (c.tag = d);
                ajaxRequest("/comment_voting", {
                    format: "XML",
                    method: "POST",
                    g: c,
                    n: { session_token: yt_net_ajax_tokenMap_.comment_voting }
                });
            }
        };
    var xk = falseVar,
        yk = falseVar;
    var Ak = function (a, b, c) {
            zk({ Yd: a, Xd: "WL", Nc: b, f: c, B: undefinedVar, j: undefinedVar });
        },
        zk = function (a) {
            var b = {
                    video_ids: a.Yd,
                    playlist_id: a.If || "",
                    new_playlist_name: a.$d || "",
                    session_token: yt_net_ajax_tokenMap_.addto_ajax
                },
                c = {};
            a.Zd && (c["private"] = a.Zd);
            a.Nc && (c.feature = a.Nc);
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
            ajaxRequest("/addto_ajax", {
                kb: trueVar,
                format: "XML",
                method: "POST",
                g: c,
                n: b,
                j: a.j,
                B: a.B,
                f: a.f
            });
        };
    var Bk = function (a, b) {
            if ("view" == a && b.convViewUrl) return b.convViewUrl;
            if (!b.baseUrl || !b.uid) return nullVar;
            var c = b.rmktEnabled && b.vid,
                d = b.focEnabled;
            if (!c && !d) return nullVar;
            var e = { label: d ? "followon_" + a : "default" };
            if (c) {
                c = { utvid: b.vid, utuid: b.uid, type: a };
                b.eventLabel && (c.el = b.eventLabel);
                b.Ik && (c.ps = b.playerStyle);
                var f = [],
                    g;
                for (g in c) f.push(encodeURIComponent(g) + "=" + encodeURIComponent(c[g]));
                e.data = f.join(";");
            }
            d && (e.foc_id = b.uid);
            return yt_uri_appendQueryData(b.baseUrl, e);
        },
        Ck = function (a) {
            var b = yt_getConfig("CONVERSION_CONFIG_DICT");
            b && (a = Bk(a, b)) && tracker_sendImageBeacon(a);
        };
    var Dk = function (a, b) {
        this.O = a;
        this.H = b;
        ajaxRequest("/playlist_ajax", {
            g: { action_get_addto_panel: 1, video_id: this.H },
            f: this.ig,
            j: this
        });
    };
    Dk.prototype.ig = function (a, b) {
        this.O.innerHTML = b.html;
        this.Th = querySelectorHlp("added-to-message", this.O);
        this.Sh = querySelectorHlp("added-to-message-title", this.O);
        this.kg = querySelectorHlp("note-added-message", this.O);
        this.jg = querySelectorHlp("note-added-message-title", this.O);
        this.Qc();
    };
    Dk.prototype.Qc = function () {
        var a = querySelectorHlp("create-playlist", this.O);
        yt_events_listen(a, "submit", goog_bind(this.fi, this));
        R(this.O, "click", goog_bind(this.ci, this), "playlist-item-favorite");
        R(this.O, "click", goog_bind(this.di, this), "playlist-item");
        R(this.O, "submit", goog_bind(this.ei, this), "playlist-note-form");
        R(this.O, "click", goog_bind(this.bi, this), "cancel-note");
    };
    Dk.prototype.fi = function (a) {
        a.preventDefault();
        Ek(this, querySelectorHlp("create-playlist", this.O));
    };
    var Ek = function (a, b) {
        _addclass(b, "loading");
        Hg(b, {
            j: a,
            f: function (a, d) {
                _removeclass(b, "loading");
                this.O.innerHTML = d.html;
            }
        });
    };
    Dk.prototype.ci = function (a) {
        a.stopPropagation();
        Fk(this, a.currentTarget);
    };
    var Fk = function (a, b) {
        _addclass(b, "loading");
        ajaxRequest("/addto_ajax", {
            method: "POST",
            format: "XML",
            g: { action_add_to_favorites: 1 },
            n: { video_ids: a.H, session_token: yt_net_ajax_tokenMap_.addto_ajax },
            j: a,
            f: function () {
                _removeclass(b, "loading");
                Gk(this, b);
            }
        });
    };
    Dk.prototype.di = function (a) {
        var b = a.currentTarget;
        _hasclass(b, "selected") || (a.stopPropagation(), Hk(this), Ik(this, b));
    };
    var Ik = function (a, b) {
        var c = getDataAttr(b, "playlist-id");
        _addclass(b, "loading");
        ajaxRequest("/addto_ajax", {
            method: "POST",
            format: "XML",
            g: { action_add_to_playlist: 1 },
            n: { playlist_id: c, video_ids: a.H, session_token: yt_net_ajax_tokenMap_.addto_ajax },
            j: a,
            f: function (a, c) {
                this.le = c.setvideo_id;
                _removeclass(b, "loading");
                _addclass(b, "selected");
                Gk(this, b);
            }
        });
    };
    Dk.prototype.ei = function (a) {
        a.preventDefault();
        Jk(this, a.currentTarget);
    };
    Dk.prototype.bi = function () {
        Hk(this);
    };
    var Jk = function (a, b) {
            _addclass(b, "loading");
            Hg(b, {
                n: { session_token: yt_net_ajax_tokenMap_.playlist_bar_ajax, setvideo_id: a.le },
                j: a,
                f: function () {
                    Hk(this);
                    _removeclass(b, "loading");
                    this.jg.innerHTML = querySelectorHlp("playlist-name", b).value;
                    var a = this.kg;
                    this.zb && _hidediv(this.zb);
                    this.zb = a;
                    _showdiv(a);
                }
            });
        },
        Hk = function (a) {
            var b = querySelectorHlp("selected", a.O);
            b && (_removeclass(b, "selected"), (a.le = nullVar));
        },
        Gk = function (a, b) {
            a.Sh.innerHTML = querySelectorHlp("playlist-title", b).innerHTML;
            var c = a.Th;
            a.zb && _hidediv(a.zb);
            a.zb = c;
            _showdiv(c);
        };
    var Kk = function (a, b) {
        var c = yt_getConfig("VIDEO_ID"),
            d = {};
        a ? (d.action_like_video = 1) : (d.action_dislike_video = 1);
        b = b || {};
        d.video_id = c;
        d.plid = b.lg;
        c = {
            screen: yt_uri_buildQueryData({ h: screen.height, w: screen.width, d: screen.colorDepth }),
            session_token: yt_net_ajax_tokenMap_.watch_actions_ajax
        };
        b.qe && (c.station_id = b.qe);
        ajaxRequest("/watch_actions_ajax", { format: "XML", method: "POST", g: d, n: c, f: b.f, B: b.B });
        Ck(a ? "like" : "dislike");
    };
    var Mk = function (a, b) {
            this.start = a;
            this.end = b;
            Lk++;
        },
        Lk = 0;
    Mk.prototype.contains = function (a, b) {
        return a >= this.start && a < this.end && (b == nullVar || (a < b && b <= this.end));
    };
    new Mk(0, 0);
    var Nk = ["left", "right", "center"],
        Ok = {
            id: 0,
            kf: 0,
            Qg: 7,
            Tg: 50,
            Jk: 80,
            Vg: 95,
            Ug: 15,
            Rg: 100,
            isVisible: trueVar,
            textAlign: Nk[2],
            Be: 0,
            backgroundColor: "#080808",
            Sg: "#fff",
            opacity: 0.8
        };
    var Pk = function (a) {
        this.Ha = a.fd;
        this.ba = a.ba || this.ba;
    };
    Pk.prototype.Ha = 0;
    Pk.prototype.ba = 0;
    Pk.prototype.toString = function () {
        return this.Ha + ", " + this.ba;
    };
    var Qk = function (a) {
        Pk.call(this, a);
        this.mc = a.text || this.mc;
        this.dd = a.$c || this.dd;
        this.ff = a.params.append || this.ff;
        this.hf = a.params.row || this.hf;
        this.gf = a.params.Hh || this.gf;
    };
    inherits(Qk, Pk);
    n = Qk.prototype;
    n.mc = "";
    n.ff = falseVar;
    n.hf = 0;
    n.gf = 0;
    n.dd = 0;
    n.Ab = function () {
        return this.mc;
    };
    n.toString = function () {
        return this.Ha + ", " + this.ba + ": " + this.mc;
    };
    var Rk = function (a) {
            var b = (a.firstChild && a.firstChild.nodeValue) || "",
                c = 1e3 * parseFloat(a.getAttribute("start") || 0);
            a.getAttribute("t") && (c = parseInt(a.getAttribute("t"), 10));
            var d = 1e3 * parseFloat(a.getAttribute("dur") || 0);
            a.getAttribute("d") && (d = parseFloat(a.getAttribute("d")));
            var e = parseInt(a.getAttribute("w"), 10) || 0,
                b = { fd: c, ba: d, text: b, $c: e, kf: 5, params: {} };
            a.getAttribute("r") && (b.params.row = parseInt(a.getAttribute("r"), 10));
            a.getAttribute("c") && (b.params.Hh = parseInt(a.getAttribute("c"), 10));
            a.getAttribute("append") && ((b.kf = 6), (b.params.append = trueVar));
            return new Qk(b);
        },
        Sk = function (a) {
            Pk.call(this, a);
            this.id = a.$c || this.id;
            this.params = a.params;
        };
    inherits(Sk, Pk);
    Sk.prototype.id = 0;
    Sk.prototype.params = nullVar;
    Sk.prototype.Ae = "";
    var Tk = function () {
        return new Sk({ fd: -2147483648, ba: 4294967295, params: Ok });
    };
    var Uk = function (a) {
        this.Bb = [];
        this.nd = [];
        this.Db = {};
        if (a) {
            var b;
            if ("undefined" != typeof DOMParser)
                b = new DOMParser().parseFromString(a, "application/xml");
            else if ("undefined" != typeof ActiveXObject) {
                if ((b = new ActiveXObject("MSXML2.DOMDocument"))) {
                    b.resolveExternals = falseVar;
                    b.validateOnParse = falseVar;
                    try {
                        (b.setProperty("ProhibitDTD", trueVar),
                            b.setProperty("MaxXMLSize", 2048),
                            b.setProperty("MaxElementDepth", 256));
                    } catch (c) {}
                }
                b.loadXML(a);
            } else throwEx(Error("Your browser does not support loading xml documents"));
            if (b && b.firstChild)
                switch (((this.Ia = b), this.Ia.firstChild.tagName)) {
                    case "timedtext":
                        a = this.Ia.firstChild.childNodes;
                        b = 0;
                        for (var d = a.length; b < d; b++)
                            switch (a[b].tagName) {
                                case "window":
                                    var e = a[b],
                                        f = parseInt(e.getAttribute("id"), 10),
                                        g = undefinedVar;
                                    a: {
                                        var j = this.Db[f];
                                        if (!e.getAttribute("t") && !e.getAttribute("start")) g = nullVar;
                                        else {
                                            g = parseInt(e.getAttribute("t"), 10);
                                            e.getAttribute("start") &&
                                                (g = 1e3 * parseFloat(e.getAttribute("start")));
                                            j && (j.Ha + j.ba >= g ? (j.ba = g) : (j = nullVar));
                                            switch (e.getAttribute("op")) {
                                                case "kill":
                                                    g = nullVar;
                                                    break a;
                                                case "define":
                                                    j = nullVar;
                                            }
                                            j ? (j.Pi = trueVar) : (j = Tk());
                                            var o = {},
                                                j = j ? j.params : Ok,
                                                x = undefinedVar;
                                            for (x in j) o[x] = j[x];
                                            e.getAttribute("id") && (o.id = e.getAttribute("id"));
                                            e.getAttribute("op") && (o.Qi = e.getAttribute("op"));
                                            e.getAttribute("rc") &&
                                                (o.Ug = parseInt(e.getAttribute("rc"), 10));
                                            e.getAttribute("cc") &&
                                                (o.Rg = parseInt(e.getAttribute("cc"), 10));
                                            e.getAttribute("ap") &&
                                                ((j = parseInt(e.getAttribute("ap"), 10)),
                                                (o.Qg = 0 > j || 8 < j ? 7 : j));
                                            e.getAttribute("ah") &&
                                                (o.Tg = parseInt(e.getAttribute("ah"), 10));
                                            e.getAttribute("av") &&
                                                (o.Vg = parseInt(e.getAttribute("av"), 10));
                                            e.getAttribute("id") &&
                                                (o.id = parseInt(e.getAttribute("id"), 10) || 0);
                                            e.getAttribute("vs") &&
                                                (o.isVisible = Boolean(e.getAttribute("vs")));
                                            e.getAttribute("ju") &&
                                                (o.textAlign =
                                                    Nk[parseInt(e.getAttribute("ju"), 10)]);
                                            e.getAttribute("pd") &&
                                                ((o.Be = 1),
                                                0 == parseInt(e.getAttribute("pd"), 10) &&
                                                    (o.Be = 0));
                                            e.getAttribute("bc") &&
                                                (o.backgroundColor = parseInt(
                                                    e.getAttribute("bc"),
                                                    16
                                                ));
                                            e.getAttribute("bo") &&
                                                (o.opacity =
                                                    parseInt(e.getAttribute("bo"), 10) / 100);
                                            e.getAttribute("fc") &&
                                                (o.Sg = parseInt(e.getAttribute("fc"), 16));
                                            e.getAttribute("sd") &&
                                                (o.Ri = parseInt(e.getAttribute("sd"), 10));
                                            j =
                                                parseInt(e.getAttribute("d"), 10) ||
                                                1e3 * parseFloat(e.getAttribute("dur")) ||
                                                2147483647;
                                            e = {
                                                fd: g,
                                                ba: j,
                                                params: o,
                                                $c: parseInt(e.getAttribute("id"), 10)
                                            };
                                            g = new Sk(e);
                                        }
                                    }
                                    this.Db[f] = g;
                                    this.nd.push(g);
                                    break;
                                case "text":
                                    ((f = Rk(a[b])),
                                        this.Bb.push(f),
                                        (e = f.dd),
                                        this.Db[e] &&
                                            ((e = this.Db[e]), (f = f.Ab()), (e.Ae += f)));
                            }
                        break;
                    default:
                        this.nd.push(Tk());
                        a = this.Ia.firstChild.childNodes;
                        b = 0;
                        for (d = a.length; b < d; b++) this.Bb.push(Rk(a[b]));
                }
        }
    };
    Uk.prototype.Bb = nullVar;
    Uk.prototype.nd = nullVar;
    Uk.prototype.Db = nullVar;
    var Vk = function (a) {
        a = a || {};
        this.$e = a.format;
        this.Ie = a.languageCode || "";
        this.Se = a.languageName;
        this.Ja = a.kind;
        this.ua = a.name;
        this.ic = a.is_default;
    };
    n = Vk.prototype;
    n.Se = nullVar;
    n.Ja = nullVar;
    n.ua = nullVar;
    n.ic = falseVar;
    n.$e = 1;
    n.getName = function () {
        return this.ua;
    };
    n.getFormat = function () {
        return this.$e;
    };
    var Wk = function (a) {
        var b = [a.Se];
        if (a.Ja) {
            var c = "asr" == a.Ja ? yt_getMsg("HTML5_SUBS_TRANSCRIBED") : a.Ja;
            b.push(" (", c, ")");
        }
        a.ua && b.push(" - ", a.ua);
        a.Fb && b.push(" >> ", a.Fb.ud);
        return b.join("");
    };
    Vk.prototype.toString = function () {
        var a = [this.Ie, ": ", this.ua, " (", this.Ja, ")"];
        this.Fb && a.push(" >> ", this.Fb.ud);
        return a.join("");
    };
    var Xk = function (a) {
        this.Qe = a.languageCode;
        this.ud = a.languageName;
        this.id = a.id;
        this.ic = a.is_default;
    };
    Xk.prototype.Qe = nullVar;
    Xk.prototype.ud = nullVar;
    Xk.prototype.id = nullVar;
    Xk.prototype.ic = falseVar;
    var Yk = function (a) {
        this.Te = [];
        this.mf = [];
        this.nc = [];
        if (a && a.firstChild) {
            this.Ia = a;
            for (var a = this.Ia.getElementsByTagName("track"), b = a.length, c = 0; c < b; c++) {
                var d = parseInt(a[c].getAttribute("formats"), 10) || 1,
                    e = a[c].getAttribute("lang_code"),
                    f = a[c].getAttribute("lang_translated"),
                    g = a[c].getAttribute("name"),
                    j = a[c].getAttribute("kind") || "",
                    o = a[c].getAttribute("id"),
                    x = "true" == a[c].getAttribute("lang_default"),
                    C = "true" == a[c].getAttribute("cantran");
                this.Bd(
                    new Vk({
                        format: d,
                        languageCode: e,
                        languageName: f,
                        name: g,
                        kind: j,
                        id: o,
                        is_servable: trueVar,
                        is_default: x,
                        is_translateable: C
                    })
                );
            }
            a = this.Ia.getElementsByTagName("target");
            b = a.length;
            for (c = 0; c < b; c++)
                ((d = a[c].getAttribute("lang_code")),
                    (e = a[c].getAttribute("lang_translated")),
                    (f = a[c].getAttribute("lang_original")),
                    (g = a[c].getAttribute("id")),
                    (j = "true" == a[c].getAttribute("lang_default")),
                    this.mf.push(
                        new Xk({
                            languageCode: d,
                            languageName: e,
                            languageOriginal: f,
                            id: g,
                            is_default: j
                        })
                    ));
        }
    };
    n = Yk.prototype;
    n.Ia = nullVar;
    n.Te = nullVar;
    n.mf = nullVar;
    n.nc = nullVar;
    n.vc = -1;
    n.bb = function () {
        return this.nc;
    };
    n.Jd = function () {
        return this.vc;
    };
    n.Bd = function (a) {
        switch (a.Ja) {
            case "asr":
                this.Te.push(a);
                break;
            default:
                if (a.ic || 0 > this.vc) this.vc = this.nc.length;
                this.nc.push(a);
        }
    };
    var Zk = function (a, b, c, d) {
        this.va = a;
        c
            ? (this.va = Ue(this.va, { hl: c }))
            : ((a = Qe(this.va).hl || ""),
              (a = a.split("_").join("-")),
              (this.va = Ue(this.va, { hl: a })));
        this.H = b;
        this.Ye = !!d;
    };
    n = Zk.prototype;
    n.va = "";
    n.H = nullVar;
    n.Ye = falseVar;
    n.vc = 0;
    n.ab = nullVar;
    n.bb = function () {
        return this.ab.bb();
    };
    n.Jd = function () {
        return this.ab.Jd();
    };
    n.Bd = function (a) {
        this.ab.Bd(a);
    };
    var bl = function (a) {
            var b = $k,
                c = a.ab.Jd();
            0 > c || al(a, a.ab.bb()[c], b);
        },
        al = function (a, b, c) {
            var d = a.va,
                e = {
                    v: a.H,
                    type: "track",
                    lang: b.Ie,
                    name: b.getName(),
                    kind: b.Ja,
                    fmt: b.getFormat()
                };
            b.Fb && (e.tlang = b.Fb.Qe);
            d = Ue(d, e);
            Ej.info("Loading caption track from: " + d);
            a = goog_bind(function (a) {
                a = new Uk(a.responseText);
                c(a, b);
            }, a);
            _ajax(d, a);
        },
        cl = function (a, b) {
            var c = a.va,
                d = { type: "list", tlangs: 1, v: a.H, fmts: Number(falseVar) };
            a.Ye && (d.asrs = 1);
            c = Ue(c, d);
            Ej.info("Getting track list from: " + c);
            d = goog_bind(function (a) {
                this.ab = new Yk(a.responseXML);
                b();
            }, a);
            _ajax(c, d);
        };
    var dl = nullVar,
        el = nullVar,
        fl = -1,
        gl = falseVar,
        hl = 0,
        il = 0,
        kl = function (a) {
            if (dl) a();
            else if ("true" != getDataAttr(_gel("watch-captions-container"), "disabled")) {
                var b = new Zk(yt_getConfig("TTS_URL"), yt_getConfig("VIDEO_ID"));
                cl(b, function () {
                    jl();
                    a();
                });
                dl = b;
            }
        },
        jl = function () {
            var a = dl,
                b = dl.bb(),
                c = b.length;
            if (0 >= c) _showdiv("watch-captions-not-found");
            else {
                var d = _gel("watch-captions-container");
                if (1 < c) {
                    var e = document.createElement("select");
                    e.id = "watch-captions-track-selector";
                    for (var f = 0; f < c; ++f) {
                        var g = b[f],
                            j = document.createElement("option"),
                            g = vc(Wk(g));
                        j.appendChild(g);
                        j.value = f;
                        e.appendChild(j);
                    }
                    yt_events_listen(e, "change", function () {
                        al(dl, dl.bb()[this.value], $k);
                    });
                    d.appendChild(e);
                }
                b = document.createElement("div");
                b.id = "captions-scrollbox";
                yt_events_listen(b, "mouseover", function () {
                    gl = trueVar;
                });
                yt_events_listen(b, "mouseout", function () {
                    gl = falseVar;
                });
                d.appendChild(b);
                bl(a);
            }
        },
        $k = function (a, b) {
            var c = a.Bb;
            fl = -1;
            el = a;
            yt_clearInterval(hl);
            var d = _gel("captions-scrollbox");
            d.innerHTML = "";
            var e = _gel("watch-captions-track-selector");
            if (e)
                for (var f = dl.bb(), g = 0, j = f.length; g < j; ++g)
                    if (f[g] == b) {
                        e.options[g].selected = trueVar;
                        break;
                    }
            g = 0;
            for (j = c.length; g < j; ++g) {
                var e = c[g],
                    f = document.createElement("div"),
                    o = e.Ha / 1e3;
                f.id = "cp-" + g;
                f.className = "cpline";
                setDataAttr(f, "time", o + "");
                f.onmousedown = function (a) {
                    mj().seekTo(parseInt(getDataAttr(this, "time"), 10), trueVar);
                    return yt_events_preventDefault(a);
                };
                d.appendChild(f);
                var x = document.createElement("div");
                x.className = "cptime";
                x.innerHTML =
                    Math.floor(o / 60) + ":" + (10 > o % 60 ? "0" : "") + Math.floor(o % 60);
                f.appendChild(x);
                o = document.createElement("div");
                o.className = "cptext";
                o.innerHTML = e.Ab();
                f.appendChild(o);
            }
            hl = od(ll, 500);
        },
        ll = function () {
            for (var a = mj().getCurrentTime(), b = el.Bb, c = fl, d = c; ; ) {
                var e = 0 <= d ? b[d].Ha / 1e3 : -1;
                if (a + 0.5 < e) d -= 1;
                else if (((e = d + 1 < b.length ? b[d + 1].Ha / 1e3 : 1e6), a + 0.5 > e)) d += 1;
                else break;
            }
            d != c &&
                (0 <= c && ((a = _gel("cp-" + c)), _removeclass(a, "cpline-highlight")),
                0 <= d && ((a = _gel("cp-" + d)), _addclass(a, "cpline-highlight")),
                (fl = d),
                gl || ml(_gel("cp-" + (3 <= d ? d - 3 : 0))));
        },
        ml = function (a) {
            yt_clearInterval(il);
            var b = _gel("captions-scrollbox"),
                c = Math.min(a.offsetTop - b.offsetTop, b.scrollHeight - b.offsetHeight),
                d = 0;
            il = od(function () {
                var a = c - b.scrollTop,
                    f = Math.round((100 * a) / (1e3 - 50 * d));
                Math.abs(a) <= Math.abs(f) || 20 < d
                    ? ((b.scrollTop = c), yt_clearInterval(il))
                    : ((b.scrollTop += f), d++);
            }, 50);
        };
    var ol = function (a, b) {
            var c = _gel("flag-video-form"),
                d = _gel("flag-video-menu");
            c && d && new nl(c, d, a, b);
        },
        nl = function (a, b, c, d) {
            this.i = a;
            this.k = b;
            yt_events_listen(this.i, "submit", goog_bind(this.lh, this));
            Qd(this.k, goog_bind(this.kh, this));
            yt_events_listen(_gel("flag-video-cancel"), "click", function (a) {
                a.preventDefault();
                c();
            });
            this.bc = d;
        };
    nl.prototype.kh = function (a) {
        var b;
        b = a.currentTarget;
        var c = pl(this, b),
            a = getDataAttr(b, "show-textbox-with-label"),
            d = !!getDataAttr(b, "include-time"),
            e = !!getDataAttr(b, "show-hate-group"),
            f = getDataAttr(b, "popup-url"),
            g = getDataAttr(b, "result-message") || "default";
        b = !!getDataAttr(b, "no-post");
        var j = c.ph;
        this.i.reason.value = c.reason;
        this.i.sub_reason.value = j;
        c = _gel("flag-video-more-info-comment");
        a && (_gel("flag-video-more-info-textarea-label").innerHTML = a);
        yt_style_setDisplayed(c, !!a);
        yt_style_setDisplayed(_gel("flag-video-more-info-time"), d);
        yt_style_setDisplayed(_gel("flag-video-more-info-hate-group"), e);
        f &&
            yt_window_popup(f, {
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
        b ? (_hidediv(this.i), ql(g)) : (setDataAttr(this.i, "result-message", g), _showdiv(this.i));
    };
    var pl = function (a, b) {
        var c = X.getInstance(),
            d = rh(c, a.k);
        oh(c, d);
        c = c.getContent(d);
        d = querySelectorHlp("label", b);
        c.innerHTML = Jc(d);
        c = kc("selected", a.k);
        Array_forEach(c, function (a) {
            _removeclass(a, "selected", "child-selected");
        });
        _addclass(b, "selected");
        c = "";
        if ((d = getDataAttr(b, "subreason") || "")) {
            var e = K(b.parentNode, "li"),
                c = getDataAttr(e, "reason") || "";
            _addclass(e, "selected", "child-selected");
        } else c = getDataAttr(b, "reason") || "";
        return { reason: c, ph: d };
    };
    nl.prototype.lh = function (a) {
        a.preventDefault();
        var b = _gel("flag-video-submit");
        b.disabled = trueVar;
        var c = getDataAttr(this.i, "result-message");
        ajaxRequest(this.i.action, {
            format: "XML",
            method: "POST",
            za: goog_dom_forms_getFormDataString(this.i),
            f: function () {
                ql(c);
                this.bc.call(thisVar);
            },
            B: function (a, c) {
                rl();
                var f = _gel("flag-video-error");
                c && c.error_message && (querySelectorHlp("yt-alert-content", f).innerHTML = c.error_message);
                _showdiv(f);
                b.disabled = falseVar;
            },
            j: this
        });
    };
    var ql = function (a) {
            rl();
            _hidediv("flag-video-form-container");
            _showdiv("flag-video-result-" + a);
        },
        rl = function () {
            var a = kc("flag-video-result", _gel("flag-video-results-container"));
            Array_forEach(a, function (a) {
                _hidediv(a);
            });
        };
    var Bj,
        yl = function (a) {
            if (yt_getConfig("ALLOW_RATINGS")) {
                var b;
                if ((b = !sl()))
                    (yt_getConfig("YPC_CAN_RATE_VIDEO")
                        ? (b = falseVar)
                        : (tl("watch-actions-rental-required"), (b = trueVar)),
                        (b = !b));
                b &&
                    (yt_getConfig("YPC_SHOW_VPPA_CONFIRM_RATING") && !confirm(yt_getMsg("VPPA_CONFIRM"))
                        ? ul()
                        : (vl(),
                          Kk(a, {
                              lg: yt_getConfig("PLAYBACK_ID"),
                              qe: yt_getConfig("STATION_ID"),
                              f: function (b, d) {
                                  y(
                                      _gel("watch-like-unlike"),
                                      a ? "unliked" : "liked",
                                      a ? "liked" : "unliked"
                                  );
                                  wl(d.html_content);
                                  var e = _gel("watch-like-share-plusone");
                                  e && new yj(e, d.video_id, d.video_url, d.lang, d.session_index);
                                  ti(_gel("watch-actions-ajax"));
                              },
                              B: xl
                          })));
            } else tl("watch-actions-ratings-disabled");
        },
        Al = function (a, b) {
            var c = a || _gel("watch-flag");
            if (zl(c) && !sl()) {
                vl();
                var d = 0,
                    e = mj();
                e && e.pauseVideo && (e.pauseVideo(), (d = e.getCurrentTime()));
                d = Math.floor(d);
                e = Math.floor(d / 60);
                d = {
                    action_get_flag_video_component: 1,
                    video_id: yt_getConfig("VIDEO_ID"),
                    t_mins: e,
                    t_secs: d - 60 * e
                };
                b && (d.from_dislike = 1);
                ajaxRequest("/watch_ajax", {
                    format: "XML",
                    method: "GET",
                    g: d,
                    f: function (a, b) {
                        wl(b.html_content);
                        ol(
                            function () {
                                ul();
                            },
                            function () {
                                c.disabled = trueVar;
                            }
                        );
                    },
                    B: xl
                });
            }
        },
        Cl = function (a, b) {
            if (zl(a)) {
                var c = Bl("watch-actions-share");
                if (Bj) (tl("watch-actions-share"), Bj.na());
                else {
                    var d = yt_getConfig("VIDEO_ID"),
                        e = nullVar;
                    ij() && (e = ej ? bj().Ba() : nullVar);
                    vl();
                    Bj = new zj(c, d, e, function () {
                        tl("watch-actions-share");
                    });
                }
                b ? Xg("shareOpenedFromFlash", undefinedVar, undefinedVar) : Xg("shareOpenedFromActionBar", undefinedVar, undefinedVar);
                var f = mj(),
                    g = od(function () {
                        var b = _hasclass(a, "active");
                        if (!f || !b) yt_clearInterval(g);
                        else {
                            for (var b = [], c = Math.floor(f.getCurrentTime()); 0 < c; )
                                (b.unshift(c % 60), (c = Math.floor(c / 60)));
                            for (; 2 > b.length; ) b.unshift(0);
                            b = Array_map(b, function (a, b) {
                                return 0 < b && 10 > a ? "0" + a : a;
                            });
                            Cj(b.join(":"));
                        }
                    }, 1e3);
                Ck("share");
            }
        },
        zl = function (a) {
            var b = !_hasclass(a, "active");
            ul();
            b && (_addclass(a, "active"), zh(xh.getInstance(), a));
            return b;
        },
        vl = function () {
            tl("watch-actions-loading");
        },
        wl = function (a) {
            Bl("watch-actions-ajax").innerHTML = a;
            tl("watch-actions-ajax");
        },
        xl = function (a, b) {
            var c = b && b.error_message;
            c || (c = yt_getMsg("WATCH_ERROR_MESSAGE"));
            Bl("watch-error-string").innerHTML = c;
            tl("watch-actions-error");
        },
        Dl = {},
        Bl = function (a) {
            a in Dl || (Dl[a] = _gel(a));
            return Dl[a];
        },
        tl = function (a) {
            var b = Bl("watch-actions-area-container"),
                a = Bl(a),
                c = Bl("watch-actions-loading"),
                d = Bl("watch-actions-area");
            yt_style_isDisplayed(b) || ((b.style.height = "0px"), _showdiv(b));
            _hidediv(c);
            _showdiv(a);
            _addclass(b, "transitioning");
            var e = d.offsetHeight + "px";
            yt_setTimeout(function () {
                b.style.height = e;
            }, 0);
            yt_setTimeout(function () {
                b.style.height == e && (_removeclass(b, "transitioning"), (b.style.height = "auto"));
            }, 500);
        },
        ul = function () {
            var a = Bl("watch-actions-area-container");
            _hidediv(a);
            a = kc("watch-actions-panel", a);
            Array_forEach(a, function (a) {
                _hidediv(a);
            });
            Bl("watch-actions-ajax").innerHTML = "";
            var a = Bl("watch-actions"),
                b = Bl("watch-subactions"),
                a = H("button", nullVar, a);
            b && ((b = H("button", nullVar, b)), Array_extend(Array_cloneArray(a), Array_cloneArray(b)));
            Array_forEach(a, function (a) {
                _removeclass(a, "active");
            });
        },
        sl = function () {
            return !yt_getConfig("LOGGED_IN") ? (tl("watch-actions-logged-out"), trueVar) : falseVar;
        };
    var El,
        Fl = nullVar,
        Gl = nullVar,
        Hl = function (a) {
            var b = Bd(a);
            qb(b, "addto-button-collapsed", "addto-button-expanded");
            document.body.appendChild(b);
            $g(a, 0, b, 0, new B(0, -4));
        },
        Il = function (a) {
            zc(a);
        },
        Jl = function (a, b) {
            this.k = a;
            this.dg = querySelectorHlp("tags-menu-list", a);
            this.H = b;
            this.jd();
        };
    n = Jl.prototype;
    n.jd = function () {
        _addclass(this.k, "loading");
        ajaxRequest("/pebbles_ajax", {
            method: "POST",
            j: this,
            g: { action_get_all_user_pebbles: 1, video_id: this.H },
            n: { session_token: yt_net_ajax_tokenMap_.pebbles_ajax },
            f: function (a, b) {
                this.dg.innerHTML = b.html;
                this.Xb = querySelectorHlp("add-pebble-form", this.k);
                this.he = querySelectorHlp("video-id", this.Xb);
                this.Zb = querySelectorHlp("pebble-input", this.Xb);
                this.oa = querySelectorHlp("pebble-submit-button", this.Xb);
                this.Qc();
                _removeclass(this.k, "loading");
            }
        });
    };
    n.Qc = function () {
        Fl && Gl && yt_removeEventListeners([Fl, Gl]);
        Fl = R(this.k, "click", goog_bind(this.Nh, this), "pebble");
        Gl = yt_events_listen(this.Xb, "submit", goog_bind(this.Ph, this));
        R(this.k, "click", goog_bind(this.Mh, this), "close-tags-menu");
        R(this.k, "keyup", goog_bind(this.Oh, this), "pebble-input");
    };
    n.Nh = function (a) {
        Kl(this, a.currentTarget);
    };
    n.Oh = function () {
        this.oa.disabled = isEmptyString(this.Zb.value);
    };
    n.Ph = function (a) {
        a.preventDefault();
        if (!isEmptyString(this.Zb.value)) {
            var b = a.currentTarget,
                a = querySelectorHlp("pebble-list", this.k),
                b = b.pebble.value,
                c = b.toLowerCase(),
                d = nullVar;
            Array_some(a.children, function (a) {
                var b = getDataAttr(a, "pebble-name");
                return b && b.toLowerCase() == c ? ((d = a), trueVar) : falseVar;
            });
            d ? _hasclass(d, "selected") || Kl(this, d, trueVar) : Ll(this, b);
            this.Zb.focus();
            this.Zb.value = "";
        }
    };
    var Kl = function (a, b, c) {
            var d = getDataAttr(b, "pebble-name"),
                e = _hasclass(b, "selected");
            ajaxRequest("/pebbles_ajax", {
                g: e ? { action_delete_pebble_from_video: 1 } : { action_add_pebble_to_video: 1 },
                method: "POST",
                n: { video_id: a.he.value, pebble: d, session_token: yt_net_ajax_tokenMap_.pebbles_ajax }
            });
            var f = e ? -1 : 1;
            _toggleclass(b, "selected");
            d = querySelectorHlp("pebble-count", b);
            f = parseInt(d.innerHTML, 10) + f;
            d.innerHTML = f;
            0 == f ? _addclass(d, "unused") : _removeclass(d, "unused");
            !e &&
                c &&
                ((a = querySelectorHlp("pebble-list", a.k)),
                a.removeChild(b),
                a.insertBefore(b, a.children[0]),
                (a.scrollTop = 0));
        },
        Ll = function (a, b) {
            ajaxRequest("/pebbles_ajax", {
                g: { action_add_pebble_to_video: 1 },
                method: "POST",
                n: { video_id: a.he.value, pebble: b, session_token: yt_net_ajax_tokenMap_.pebbles_ajax }
            });
            var c = querySelectorHlp("pebble-list", a.k),
                d = querySelectorHlp("pebble-template", c).cloneNode(trueVar),
                e = querySelectorHlp("pebble-name", d),
                f = querySelectorHlp("pebble-count", d);
            setDataAttr(d, "pebble-name", b);
            _removeclass(d, "pebble-template");
            _addclass(d, "selected");
            e.innerHTML = b;
            f.innerHTML = "1";
            c.insertBefore(d, c.children[0]);
            c.scrollTop = 0;
        };
    Jl.prototype.Mh = function () {
        var a = X.getInstance(),
            b = rh(a, this.k);
        oh(a, b);
        zc(b);
    };
    var Ml,
        Nl,
        Ol,
        Pl = function (a, b) {
            this.ob = a;
            this.k = _gel("shared-addto-menu");
            this.Sb = getDataAttr(this.ob, "feature") || "";
            this.je = _hasclass(this.ob, "watch");
            this.tb = getDataAttr(this.ob, "video-ids") || "";
            this.D = this.tb.split(",");
            isDefined(Ol) || (Ol = _hasclass(this.k, "lightweight-panel"));
            var c = querySelectorHlp("sign-in", this.k);
            c ? yt_events_listen(c, "click", goog_bind(this.jh, this)) : b ? new Jl(this.k, this.tb) : this.jd();
        };
    Pl.prototype.jd = function () {
        var a = { action_get_dropdown: "1" };
        this.Sb && (a.feature = this.Sb);
        ajaxRequest("/addto_ajax", {
            kb: trueVar,
            format: "XML",
            method: "GET",
            j: this,
            g: a,
            f: function (a, c) {
                this.k.innerHTML = c.html_content || "";
                A(this.k, "ie", isIEBrowser);
                this.Aa();
                Ql(this);
            }
        });
    };
    Pl.prototype.Aa = function () {
        this.e = {};
        this.e.list = _gel("addto-list-panel");
        this.e.Uc = _gel("addto-list-saved-panel");
        this.e.dc = _gel("addto-list-error-panel");
        this.e.ra = _gel("addto-note-input-panel");
        this.e.Td = _gel("addto-note-saving-panel");
        this.e.se = _gel("addto-note-saved-panel");
        this.e.Yc = _gel("addto-note-error-panel");
        this.e.ka = _gel("addto-create-panel");
        this.ec = this.e.list;
        R(this.e.list, "click", goog_bind(this.qg, this), "yt-uix-button-menu-item");
        this.$b = querySelectorHlp("playlist-save-note", this.e.ra);
        yt_events_listen(this.$b, "click", goog_bind(this.rg, this));
        var a = querySelectorHlp("close-button", this.k);
        yt_events_listen(a, "click", goog_bind(this.pg, this));
    };
    var Ql = function (a) {
        a = kc("playlist-name", a.e.list);
        Array_forEach(a, function (a) {
            var c = _gel(a),
                d = Hd(c),
                e = c.innerHTML != d;
            c.innerHTML = d;
            e && ((a = Dd(a, "yt-uix-button-menu-item")), (a.title = getDataAttr(a, "possible-tooltip")));
        });
    };
    Pl.prototype.qg = function (a) {
        a.stopPropagation();
        var b = a.currentTarget;
        zh(xh.getInstance(), b);
        this.oe = falseVar;
        var c = (a = nullVar),
            d = "",
            e = getDataAttr(b, "list-action");
        e &&
            ("create-playlist" == e
                ? Rl(this)
                : ("favorites" == e
                      ? ((this.oe = trueVar), (c = "FL"), (d = b.innerHTML))
                      : "watch-later" == e
                        ? ((c = "WL"), (d = b.innerHTML))
                        : ((c = "PL"),
                          (a = e),
                          (b = querySelectorHlp("playlist-name", b)),
                          (d = getDataAttr(b, "original-html"))),
                  Sl(this, c, a),
                  "watch-later" == e || "favorites" == e || 1 < this.D.length
                      ? ((querySelectorHlp("addto-title", this.e.Uc).innerHTML = d),
                        _removeclass(this.k, "lightweight-panel"),
                        Tl(this, this.e.Uc, trueVar),
                        (a = querySelectorHlp("close-note", this.k)),
                        _showdiv(a))
                      : Ul(this, d)));
    };
    var Ul = function (a, b) {
            querySelectorHlp("addto-title", a.e.ra).innerHTML = xmlEscape(b);
            Tl(a, a.e.ra, trueVar);
            var c = querySelectorHlp("close-note", a.k);
            _showdiv(c);
            var d = _gel("addto-note");
            yt_events_listen(d, "keydown", goog_bind(a.Fe, a));
            yt_events_listen(d, "paste", goog_bind(a.Fe, a));
            Vl(a.e.ra, function () {
                d.focus();
            });
        },
        Vl = function (a, b) {
            if (b) {
                var c = isWebKitBrowser
                    ? "webkitTransitionEnd"
                    : isOperaBrowser
                      ? "oTransitionEnd"
                      : isFirefoxBrowser
                        ? "transitionend"
                        : nullVar;
                c
                    ? Od(a, c, function () {
                          b();
                      })
                    : b();
            }
        };
    Pl.prototype.Fe = function (a) {
        var b = a.target,
            c = querySelectorHlp("addto-note-label", this.e.ra);
        yt_setTimeout(
            goog_bind(function () {
                var a = isEmptyString(b.value);
                a ? _showdiv(c) : _hidediv(c);
                !a && this.G && this.Hc ? Fd(this.$b, trueVar) : Fd(this.$b, falseVar);
            }, this),
            0
        );
    };
    var Tl = function (a, b, c) {
            var c = c ? "slide" : "fade",
                d = ["fade", "slide"];
            y(a.ec, d, c);
            y(b, d, c);
            Ol && b == a.e.list && _addclass(a.k, "lightweight-panel");
            _hasclass(b, "dismissed-panel")
                ? (_removeclass(b, "dismissed-panel"), _removeclass(a.ec, "active-panel"))
                : qb(a.ec, "active-panel", "dismissed-panel");
            _addclass(b, "active-panel");
            a.ec = b;
        },
        Rl = function (a) {
            Tl(a, a.e.ka, trueVar);
            Wl(a);
            removeDataAttr(a.k, "video-ids");
            var b = _gel("addto-create-playlist");
            yt_events_listen(b, "keydown", goog_bind(a.ed, a));
            yt_events_listen(b, "paste", goog_bind(a.ed, a));
            Vl(a.e.ka, function () {
                b.focus();
            });
            var c = querySelectorHlp("addto-create-cancel-button", a.e.ka);
            yt_events_listen(
                c,
                "click",
                goog_bind(function () {
                    Xl(this);
                }, a)
            );
            c = querySelectorHlp("create-playlist-button", a.e.ka);
            yt_events_listen(c, "click", goog_bind(a.$g, a));
        },
        Wl = function (a) {
            a.ze = querySelectorHlp("addto-create-playlist", a.e.ka);
            a.Ke = querySelectorHlp("addto-create-playlist-label", a.e.ka);
            a.Je = querySelectorHlp("create-playlist-button", a.e.ka);
            a.kd = querySelectorHlp("privacy-form", a.e.ka);
            R(a.kd, "click", goog_bind(a.ed, a), "playlist-privacy-option");
        };
    Pl.prototype.$g = function () {
        var a = this.ze.value;
        this.mg = trueVar;
        var b = parseInt(bd(this.kd), 10);
        Sl(this, "PL", nullVar, a, b);
        1 < this.D.length ? Xl(this) : Ul(this, a);
    };
    Pl.prototype.ed = function () {
        yt_setTimeout(
            goog_bind(function () {
                var a = isEmptyString(this.ze.value);
                a ? _showdiv(this.Ke) : _hidediv(this.Ke);
                var b = bd(this.kd);
                a || !b ? Fd(this.Je, falseVar) : Fd(this.Je, trueVar);
            }, this),
            0
        );
    };
    Pl.prototype.pg = function () {
        Xl(this);
    };
    var Xl = function (a) {
            var b = X.getInstance(),
                c = rh(b, a.k);
            c && getDataAttr(c, "video-ids") == a.tb && oh(b, c);
        },
        Sl = function (a, b, c, d, e) {
            a.ia = b;
            zk({ Yd: a.tb, Xd: a.ia, If: c, $d: d, Zd: e, Nc: a.Sb, f: a.fg, B: a.eg, j: a });
            removeDataAttr(a.k, "video-ids");
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
            d = { list: b, feature: a.Sb };
            if ((a = K(a.ob, "a", nullVar)) && a.href)
                ((a = Qe(a.href)), (d.link_feature = a.feature || ""));
            a = yt_uri_buildQueryData(d);
            Xg("addto", a, undefinedVar);
        };
    n = Pl.prototype;
    n.fg = function (a, b) {
        this.G = b.list_id || "";
        this.Hc = b.setvideo_id || "";
        var c = b.html_content || "",
            d = b.list_url || "";
        if (this.G && this.Hc) {
            var e = querySelectorHlp("addto-title", this.k),
                f = document.createElement("a");
            f.href = d;
            f.innerHTML = e.innerHTML;
            removeAllChildren(e);
            e.appendChild(f);
            isEmptyString(_gel("addto-note").value) || Fd(this.$b, trueVar);
        }
        if (!this.je && (d = Dd(this.ob, "ux-thumb-wrap")))
            ((e = querySelectorHlp("video-in-quicklist", d)) && zc(e),
                (e = document.createElement("span")),
                (e.className = "video-in-quicklist"),
                (e.innerHTML = c),
                d.appendChild(e));
        c = yt_getMsg("PLAYLIST_BAR_ADDED_TO_PLAYLIST");
        this.oe && (c = yt_getMsg("PLAYLIST_BAR_ADDED_TO_FAVORITES"));
        gj(this.ia, this.G, this.D, c);
    };
    n.eg = function (a, b) {
        var c = b && b.error_message;
        if (c) {
            querySelectorHlp("error-details", this.e.dc).innerHTML = c;
            var c = querySelectorHlp("show-menu-link", this.e.dc),
                d = yt_events_listen(
                    c,
                    "click",
                    goog_bind(function (a) {
                        a.preventDefault();
                        yt_removeEventListeners(d);
                        _removeclass(this.e.ra, "dismissed-panel", "fade", "slide");
                        _removeclass(this.e.Uc, "dismissed-panel", "fade", "slide");
                        a = querySelectorHlp("close-note", this.k);
                        _hidediv(a);
                        this.mg ? Tl(this, this.e.ka, trueVar) : Tl(this, this.e.list, trueVar);
                    }, this)
                );
            if ((c = _gel("addto-create-name"))) c.disabled = falseVar;
            _removeclass(this.e.dc, "dismissed-panel", "fade", "slide");
            Tl(this, this.e.dc);
        } else Xl(this);
        this.je && xl(0, b);
    };
    n.rg = function () {
        ajaxRequest("/playlist_bar_ajax", {
            method: "POST",
            kb: trueVar,
            g: { action_set_playlist_item_annotation: 1 },
            n: {
                annotation: _gel("addto-note").value,
                playlist_id: this.G,
                setvideo_id: this.Hc,
                session_token: yt_net_ajax_tokenMap_.playlist_bar_ajax
            },
            f: this.Qf,
            B: this.Pf,
            j: this
        });
        Tl(this, this.e.Td);
    };
    n.Qf = function () {
        var a = querySelectorHlp("addto-title", this.e.ra),
            b = Bd(a);
        _addclass(b, "yt-uix-tooltip-reverse");
        querySelectorHlp("panel-content", this.e.se).appendChild(b);
        Tl(this, this.e.se);
        yt_setTimeout(
            goog_bind(function () {
                zh(xh.getInstance(), b);
                Xl(this);
            }, this),
            3e3
        );
    };
    n.Pf = function (a, b) {
        var c = b && b.errors;
        if (c) {
            var d = querySelectorHlp("error-details", this.e.Yc);
            removeAllChildren(d);
            Array_forEach(c, function (a) {
                var b = document.createElement("li");
                b.innerHTML = a;
                d.appendChild(b);
            });
            var c = querySelectorHlp("add-note-link", this.e.Yc),
                e = yt_events_listen(
                    c,
                    "click",
                    goog_bind(function (a) {
                        a.preventDefault();
                        yt_removeEventListeners(e);
                        _removeclass(this.e.Td, "dismissed-panel");
                        Tl(this, this.e.ra);
                    }, this)
                );
            Tl(this, this.e.Yc);
        } else Xl(this);
    };
    n.jh = function () {
        var a = Ue("/addto_ajax", {
                action_redirect_to_signin_with_add: 1,
                list_type: "WL",
                video_ids: this.tb,
                next_url: document.location
            }),
            b = document.createElement("form");
        b.action = a;
        b.method = "POST";
        a = document.createElement("input");
        a.type = "hidden";
        a.name = "session_token";
        a.value = yt_net_ajax_tokenMap_.addto_ajax_logged_out;
        b.appendChild(a);
        document.body.appendChild(b);
        b.submit();
    };
    var Yl = function (a) {
            a = K(a.currentTarget, "FORM");
            Hg(a, { method: "POST", n: { session_token: yt_net_ajax_tokenMap_.pebbles_ajax } });
        },
        Zl = function (a) {
            a = K(a.currentTarget, "FORM");
            Hg(a, { method: "POST", n: { session_token: yt_net_ajax_tokenMap_.pebbles_ajax } });
        };
    var $l = falseVar;
    window.gapi = window.gapi || {};
    var am = /^(https?:)?\/\/([^/:@]*)(:[0-9]+)?(\/[\w.,:!=/-]*)(\?[^#]*)?(#.*)?$/,
        bm = /^[?#]([^&]*&)*jsh=([^&]*)/,
        cm = function (a) {
            var b = window.console;
            b && b.warn("gapi.load: " + a);
        },
        dm = function (a) {
            var b = window.location.search,
                c = window.location.hash,
                a = a.h;
            if ((b = (b && bm.exec(b)) || (c && bm.exec(c))))
                try {
                    a = decodeURIComponent(b[2]);
                } catch (d) {
                    cm("Invalid hint " + b[2]);
                }
            return a;
        },
        em = function (a) {
            a.sort();
            for (var b = 0; b < a.length; ) !a[b] || (b && a[b] == a[b - 1]) ? a.splice(b, 1) : ++b;
        },
        fm = function (a, b) {
            for (var c = {}, d = 0; d < b.length; d++) c[b[d]] = trueVar;
            for (d = 0; d < a.length; d++) if (!c.hasOwnProperty(a[d])) return falseVar;
            return trueVar;
        },
        gm = function (a) {
            if ("loading" != document.readyState) return falseVar;
            if ("undefined" != typeof window.___gapisync) return window.___gapisync;
            if (a && ((a = a.sync), "undefined" != typeof a)) return a;
            for (var a = document.getElementsByTagName("meta"), b = 0, c; (c = a[b]); ++b)
                if ("generator" == c.getAttribute("name") && "blogger" == c.getAttribute("content"))
                    return trueVar;
            return falseVar;
        },
        hm = function (a, b) {
            if (gm(a)) document.write('<script src="' + encodeURI(b) + '"><\/script>');
            else {
                var c = document.createElement("script");
                c.setAttribute("src", b);
                c.async = trueVar;
                var d = document.getElementsByTagName("script")[0];
                d.parentNode.insertBefore(c, d);
            }
        },
        im = function (a, b, c, d, e, f) {
            var g = c.shift(),
                j;
            j =
                "r" == g
                    ? "https://ssl.gstatic.com"
                    : "m" == g
                      ? d.ms || "https://apis.google.com"
                      : (j = c.shift()) && j.replace(/\/+$/, "");
            var o;
            "r" == g
                ? ((o = c.shift()),
                  (o = (o.indexOf("/webclient/jsx/") ? "/webclient/js/" : "") + o))
                : (o = c.shift());
            var x = "d" == g,
                C = (x && c.shift()) || "gcjs-3p",
                c = x && c.shift();
            if ("d" == g)
                ((e =
                    "/" +
                    a.join(":") +
                    (b.length ? "!" + b.join(":") : "") +
                    ".js?container=" +
                    C +
                    "&c=2&jsload=0"),
                    o && (e += "&r=" + o),
                    "d" == c && (e += "&debug=1"));
            else if ("r" == g || "f" == g)
                e =
                    (o.indexOf("/") ? "/" : "") +
                    o +
                    "/" +
                    a.join("__") +
                    (b.length ? "--" + b.join("__") : "") +
                    ".js";
            else if ("m" == g || "n" == g)
                ((a = a.join(",").replace(/\./g, "_").replace(/-/g, "_")),
                    (a = (o || "").replace("__features__", a)),
                    (a = e.nodep ? a.replace("/d=1/", "/d=0/") : a),
                    f && (a.match(/\/$/) || (a += "/"), (a += "cb=gapi." + encodeURIComponent(f))),
                    (e = a));
            else return (cm("Unknown hint type " + g), "");
            if (!j) return "";
            e = j + e;
            f = am.exec(e);
            if (!(j = !f))
                if (!(j = !!/\.\.|\/\//.test(f[4]))) {
                    a: if (((f = f[2]), "r" == g)) d = "https://ssl.gstatic.com" == e.substr(0, 23);
                    else if ("m" == g)
                        ((d = d.ms || "https://apis.google.com"), (d = e.substr(0, d.length) == d));
                    else {
                        d = d.m;
                        if (f && d) {
                            if (!/^[0-9a-zA-Z.-]+$/.test(f)) {
                                d = falseVar;
                                break a;
                            }
                            d = d.split(",");
                            g = 0;
                            for (j = d.length; g < j; ++g)
                                if (
                                    ((a = d[g]),
                                    (b = f.lastIndexOf(a)),
                                    (0 == b || "." == a.charAt(0) || "." == f.charAt(b - 1)) &&
                                        f.length - a.length == b)
                                ) {
                                    d = trueVar;
                                    break a;
                                }
                        }
                        d = falseVar;
                    }
                    j = !d;
                }
            j && throwEx("gapi.load: Invalid URI" + (e && " " + e));
            return e;
        },
        jm = function (a, b, c) {
            c && (a[b] = a[b] || []).push(c);
        },
        lm = function (a) {
            a.q && 0 < a.q.length && (window.gapi.load || km).apply(nullVar, a.q.shift());
        },
        mm = function (a) {
            if (a)
                try {
                    a();
                } catch (b) {
                    return b;
                }
            return nullVar;
        },
        nm = window.gapi,
        om = function () {
            if (nm._) return nm._;
            var a;
            if ((a = Object.create) && /\[native code\]/.test(a)) a = a(nullVar);
            else {
                a = {};
                for (var b in a) a[b] = undefinedVar;
            }
            return (nm._ = a);
        },
        qm = function (a, b, c, d, e) {
            var f = (e.Q = e.Q || []),
                g = (e.lc = e.lc || {});
            f.push([a, b, d]);
            nm[c] = function (b) {
                nm[c] = undefinedVar;
                if (!g[a]) {
                    g[a] = b;
                    for (var d; f[0] && g[f[0][0]]; )
                        ((b = f.shift()),
                            pm(b[2], e),
                            g[b[0]].call(window, om()),
                            (g[b[0]] = trueVar),
                            (b = mm(b[1])) && !d && (d = b));
                    e.p = undefinedVar;
                    lm(e);
                    d && throwEx(d);
                }
            };
        },
        pm = function (a, b) {
            jm(b, "ci", a._ci);
            var c = a.config;
            nm.config ? nm.config.update(c) : jm(b, "cu", c);
        },
        rm = function (a) {
            a.I || (a.I = 0);
            return "loaded" + a.I++;
        },
        km = function (a, b) {
            var c,
                d = {};
            "function" !== typeof b ? ((d = b || {}), (c = d.callback)) : (c = b);
            var e = (window.___jsl = window.___jsl || {}),
                f = dm(e),
                g = f && !!f.match(/\/gapi\/|ms=gapi/);
            if (e.p) jm(e, "q", [a, b]);
            else {
                f || throwEx("gapi.load: No hint present");
                var j = f.split(";"),
                    o = "m" == j[0] || "n" == j[0],
                    f = [],
                    x = [];
                e.il && "function" === typeof e.il
                    ? ((f = e.il(a)), (d.nodep = 1))
                    : ((f = a.split(":")), d.nodep || em(f), (x = e.l = e.l || []), em(x));
                if (g) {
                    if (!fm(f, x) && ((g = rm(e)), (j = im(f, x, j, e, d, g)))) {
                        e.p = f;
                        qm(j, c, g, d, e);
                        x.push.apply(x, f);
                        hm(d, j);
                        return;
                    }
                    pm(d, e);
                    if (c) var C = mm(c);
                } else {
                    pm(d, e);
                    if (!fm(f, x)) {
                        var F = o ? "cm" : "c";
                        if ((j = im(f, x, j, e, d, nullVar))) {
                            e.p = f;
                            e.o = 1;
                            e[F] = function () {
                                e.p = undefinedVar;
                                e[F] = undefinedVar;
                                var a = mm(c);
                                lm(e);
                                a && throwEx(a);
                            };
                            x.push.apply(x, f);
                            hm(d, j);
                            return;
                        }
                    }
                    C = mm(c);
                }
                lm(e);
                C && throwEx(C);
            }
        };
    var sm = -1,
        vm = function () {
            -1 == sm &&
                ((sm = parseInt(yt_net_cookies_get("ACTIVITY", "0"), 10)),
                yt_events_listen(document, "keypress", tm),
                yt_events_listen(document, "click", um));
        },
        tm = function () {
            yt_www_watch_activity_setTimestamp();
        },
        um = function () {
            yt_www_watch_activity_setTimestamp();
        },
        yt_www_watch_activity_setTimestamp = function () {
            var a = oa();
            1e3 > a - sm || ((sm = a), yt_net_cookies_set("ACTIVITY", "" + a));
        },
        yt_www_watch_activity_getTimeSinceActive = function () {
            return oa() - sm;
        };
    var ym = function (a, b, c, d, e) {
            this.A = nullVar;
            this.Lh = c;
            this.Ah = a;
            this.Bh = b;
            this.Ih = d;
            this.Kh =
                yt_getConfig("GOOGLEPLUS_HOST") + (e != nullVar ? "/u/" + e : "") + "/_/notifications/frame#pid=36";
            this.Jh = _gel(a);
            this.ub = _gel(b);
        },
        zm = function (a, b, c, d) {
            return {
                onOpen: goog_bind(function (a) {
                    return a.openInto(c);
                }, a),
                onReady: goog_bind(function () {
                    b.showOnepick && d && b.showOnepick();
                }, a),
                onClose: function (a) {
                    b.hideOnepick && d && b.hideOnepick();
                    a.remove();
                }
            };
        },
        Am = function (a, b, c) {
            if ("undefined" === typeof c) a[b]();
            else a[b](c);
        };
    n = ym.prototype;
    n.xb = function (a) {
        var b = {
            setNotificationWidgetHeight: goog_bind(function (a) {
                this.Jh.style.height = a;
            }, this),
            setNotificationText: goog_bind(function (a) {
                this.Lh(parseInt(a, 10));
            }, this),
            hideNotificationWidget: function () {
                a.hideNotificationWidget && a.hideNotificationWidget();
            },
            openSharebox: function () {},
            onError: function () {}
        };
        this.A = iframes.open(
            this.Kh,
            { style: "iframe-style" },
            {
                origin: window.location.protocol + "//" + window.location.hostname,
                source: "yt",
                hl: this.Ih
            },
            b,
            function () {}
        );
    };
    n.load = function (a) {
        iframes.setHandler("iframe-style", zm(this, a, this.Ah, falseVar));
        iframes.setHandler("onepick", zm(this, a, this.Bh, trueVar));
        this.xb(a);
    };
    n.close = function () {
        Am(this.A, "onHide");
    };
    n.wd = function () {
        Am(this.A, "onShowNotificationsOnly", {});
    };
    n.xd = function () {
        var a = window.location.href;
        -1 != a.indexOf("/watch?") &&
            Am(this.A, "setPrefill", {
                items: [{ type: "http://schema.org/VideoObject", id: a, properties: { url: [a] } }]
            });
        Am(this.A, "onShowShareboxOnly", {});
    };
    var Bm = function (a, b) {
        b ? Am(a.A, "onActive") : Am(a.A, "onIdle");
    };
    var Cm = function (a, b) {
        this.wb = this.vb = falseVar;
        this.Zc = 0;
        this.c = _gel("sb-container");
        this.fc = _gel("sb-button-notify");
        this.Eg = Ed("SPAN", "yt-uix-button-content", _gel("sb-button-notify"));
        this.ub = _gel("sb-onepick-target");
        this.A = new ym("sb-target", "sb-onepick-target", goog_bind(this.Jg, this), a, b);
        this.A.load({
            hideNotificationWidget: goog_bind(this.te, this),
            showOnepick: goog_bind(this.Ig, this),
            hideOnepick: goog_bind(this.Hg, this)
        });
        this.Fg = xe(this.ub);
        this.ue();
        yt_events_listen(window, "resize", goog_bind(this.ue, this));
        yt_events_listen(window, "click", goog_bind(this.te, this));
        vm();
        od(goog_bind(this.Gg, this), 12e4);
    };
    Cm.prototype.Ii = function (a) {
        this.vb ? (Dm(this), Bm(this.A, trueVar)) : (this.wb && Em(this), this.wd(), Bm(this.A, falseVar));
        yt_events_stopPropagation(a);
    };
    Cm.prototype.Ji = function (a) {
        this.wb ? Em(this) : (this.vb && Dm(this), this.xd());
        yt_events_stopPropagation(a);
    };
    Cm.prototype.wd = function () {
        this.A.close();
        Fm(this, trueVar, "notif");
        _addclass(this.fc, "sb-notif-clicked");
        this.A.wd();
        this.vb = trueVar;
    };
    Cm.prototype.xd = function () {
        this.A.close();
        Fm(this, trueVar, "sharebox");
        this.A.xd();
        this.wb = trueVar;
    };
    var Fm = function (a, b, c) {
            c = "sb-card-" + c;
            b ? (y(a.c, "sb-off", "sb-on"), _addclass(a.c, c)) : (y(a.c, "sb-on", "sb-off"), _removeclass(a.c, c));
        },
        Em = function (a) {
            Fm(a, falseVar, "sharebox");
            a.wb = falseVar;
        },
        Dm = function (a) {
            Fm(a, falseVar, "notif");
            a.vb = falseVar;
            _removeclass(a.fc, "sb-notif-clicked");
        };
    Cm.prototype.te = function () {
        if (this.vb || this.wb) (this.A.close(), Dm(this), Em(this), Gm(this));
    };
    Cm.prototype.Jg = function (a) {
        this.Zc = a;
        Gm(this);
    };
    var Gm = function (a) {
        Dc(a.Eg, a.Zc + "");
        0 == a.Zc ? y(a.fc, "sb-notif-on", "sb-notif-off") : y(a.fc, "sb-notif-off", "sb-notif-on");
    };
    Cm.prototype.Ig = function () {
        y(this.ub, "sb-off", "sb-on");
    };
    Cm.prototype.Hg = function () {
        y(this.ub, "sb-on", "sb-off");
    };
    Cm.prototype.ue = function () {
        var a = Math.max((oc(window).height - this.Fg.height) / 2, 0),
            b = this.ub;
        isString("top") ? le(b, a + "px", "top") : ub("top", partialApply(le, b));
    };
    Cm.prototype.Gg = function () {
        6e5 < yt_www_watch_activity_getTimeSinceActive() ? Bm(this.A, falseVar) : Bm(this.A, trueVar);
    };
    var Hm = function (a) {
        for (var b = goog_dom_getFirstElementChild(_gel("picker-container")); b; )
            (a && a != b.id && _hidediv(b),
                (b = b.nextElementSibling != undefinedVar ? b.nextElementSibling : Ac(b.nextSibling)));
    };
    var Im,
        Jm,
        Km = function (a, b) {
            this.bc = a;
            this.Ec = b;
            this.userData = {};
        };
    Km.prototype.sf = function () {
        return {};
    };
    Km.prototype.Ef = function (a) {
        this.bc(this, a);
    };
    Km.prototype.Nd = function (a) {
        this.Ec(this, a);
    };
    var Lm = function (a, b) {
        Km.call(this, a, b);
    };
    inherits(Lm, Km);
    Lm.prototype.Cb = "/subscription_ajax";
    Lm.prototype.gb = {};
    var Mm = function (a, b) {
        a.Cb = yt_uri_appendQueryData(a.Cb, b);
    };
    Lm.prototype.sf = function () {
        return this.gb;
    };
    Lm.prototype.Ef = function (a) {
        var b = nullVar,
            c = [yt_getMsg("SUBSCRIBE_SERVER_ERROR")];
        try {
            b = vg(a.responseText);
        } catch (d) {}
        (a = b && b.response) ? this.bc(this, a) : this.Ec(this, c);
    };
    Lm.prototype.Nd = function (a, b) {
        var c = b ? [b] : [yt_getMsg("SUBSCRIBE_SERVER_ERROR")];
        try {
            var d = vg(a.responseText);
        } catch (e) {
            this.Ec(this, c);
            return;
        }
        this.Ec(this, d.errors);
    };
    var Nm = function (a) {
            Im = yt_net_ajax_sendRequest;
            Jm = a;
        },
        Om = nullVar,
        Pm = [],
        Rm = function (a) {
            Pm.push(a);
            Om || Qm();
        },
        Qm = function () {
            if (Pm.length && !Om) {
                var a = Pm.shift();
                if (a) {
                    var b = a.sf();
                    b || (b = {});
                    b.session_token = Jm;
                    try {
                        var c = {
                            method: "POST",
                            postBody: yt_uri_buildQueryData(b),
                            onComplete: Sm,
                            onException: Tm,
                            onError: Tm
                        };
                    } catch (d) {
                        a.Nd({}, yt_getMsg("SUBSCRIBE_JS_ERROR"));
                        return;
                    }
                    Om = a;
                    Im(a.Cb, c);
                }
            }
        },
        Sm = function (a) {
            var b = Om;
            Om = nullVar;
            Qm();
            b && b.Ef(a);
        },
        Tm = function (a) {
            var b = Om;
            Om = nullVar;
            Qm();
            b && b.Nd(a);
        };
    var yt_www_subscriptions_button_toggleMenu = function (a) {
            var b = Um(a);
            "button" == getDataAttr(b, "subscription-menu-type")
                ? ((b = X.getInstance()),
                  (b = kh(b, a)),
                  querySelectorHlp("subscription-menu-loader", b) && (a.loader = b.innerHTML),
                  Vm(a))
                : ((b = Um(a)),
                  (b = _gel(getDataAttr(b, "subscription-expandable-id"))),
                  yt_style_isDisplayed(b)
                      ? (_hidediv(b), _addclass(a, "yt-uix-expander-collapsed"))
                      : (Vm(a), _showdiv(b), _removeclass(a, "yt-uix-expander-collapsed")));
        },
        Vm = function (a) {
            if (!getDataAttr(a, "loaded")) {
                var b = Um(a),
                    c = getDataAttr(b, "subscription-type"),
                    d = getDataAttr(b, "subscription-xsrf") || "",
                    e = getDataAttr(b, "subscription-menu-type"),
                    f = {},
                    g = getDataAttr(b, "subscription-value");
                "playlist" == c
                    ? ((f.action_get_subscription_form_for_playlist = 1), (c = "p"))
                    : "blog" == c
                      ? ((f.action_get_subscription_form_for_blog = 1), (c = "b"))
                      : "topic" == c
                        ? ((f.action_get_subscription_form_for_topic = 1), (c = "l"))
                        : ((f.action_get_subscription_form_for_user = 1), (c = "u"));
                Nm(d);
                d = new Lm(Xm, function () {
                    Ym(b, trueVar);
                });
                Mm(d, f);
                f = {};
                f[c] = g;
                f.menu_type = e;
                d.gb = f || {};
                d.userData.eventTrigger = a;
                d.userData.subscription = b;
                Rm(d);
            }
        },
        Um = function (a) {
            return K(a, nullVar, "subscription-container");
        },
        Zm = function (a) {
            var b = K(a, nullVar, "subscription-menu-expandable");
            if (b) return b.expandableMenuSubscription;
            a = K(a, nullVar, "yt-uix-button-menu");
            b = X.getInstance();
            a = rh(b, a);
            return Um(a);
        },
        $m = function (a) {
            var b = kc("subscription-container"),
                c = getDataAttr(a, "subscription-type"),
                d = getDataAttr(a, "subscription-value");
            return (b = Array_filter(b, function (a) {
                if (getDataAttr(a, "subscription-type") == c && getDataAttr(a, "subscription-value") == d) return trueVar;
            }));
        },
        Ym = function (a, b) {
            var c = getDataAttr(a, "subscription-id"),
                d = $m(a);
            Array_forEach(d, function (a) {
                if (b) {
                    "button" == getDataAttr(a, "subscription-menu-type") ? an(a) : bn(a, trueVar);
                    var d = Ed(nullVar, "subscription-subscribed-container", a),
                        g = Ed(nullVar, "subscribe-button", a),
                        j = Ed(nullVar, "subscription-options-button", a);
                    removeDataAttr(a, "subscription-id");
                    _hidediv(d);
                    _showdiv(g);
                    removeDataAttr(j, "loaded");
                } else
                    ((d = Ed(nullVar, "subscription-subscribed-container", a)),
                        (g = Ed(nullVar, "subscribe-button", a)),
                        setDataAttr(a, "subscription-id", c),
                        _hidediv(g),
                        _showdiv(d));
            });
        },
        cn = function (a, b) {
            if ("button" == getDataAttr(a, "subscription-menu-type")) {
                var c = querySelectorHlp("subscription-options-button", a),
                    d = X.getInstance(),
                    e = kh(d, c);
                e && ((e.innerHTML = b), sh(d, c, e));
            } else
                ((c = _gel(getDataAttr(a, "subscription-expandable-id"))),
                    (d = querySelectorHlp("subscription-menu-loader", c)),
                    (e = querySelectorHlp("subscription-menu-body", c)),
                    (e.innerHTML = b),
                    (c.expandableMenuSubscription = a),
                    _hidediv(d),
                    _showdiv(e));
        },
        an = function (a) {
            var a = querySelectorHlp("subscription-options-button", a),
                b = X.getInstance();
            kh(b, a);
            oh(b, a);
            if (a.loader) {
                var c = a.loader,
                    d = kh(b, a);
                d && ((d.innerHTML = c), sh(b, a, d));
            }
            removeDataAttr(a, "loaded");
        },
        bn = function (a, b) {
            var c = th.getInstance(),
                d = querySelectorHlp("yt-uix-expander", a),
                e = _gel(getDataAttr(a, "subscription-expandable-id"));
            if (b) {
                var f = querySelectorHlp("subscription-menu-loader", e),
                    g = querySelectorHlp("subscription-menu-body", e);
                removeDataAttr(d, "loaded");
                _showdiv(f);
                _hidediv(g);
                g.innerHTML = "";
            }
            yt_style_isDisplayed(e) && c.collapse(d);
        },
        dn = function (a, b) {
            var c = a.userData.subscription,
                d = b.html_content;
            a.userData.eventTrigger.disabled = falseVar;
            setDataAttr(c, "subscription-id", b.id);
            Ym(c, falseVar);
            d &&
                (cn(c, d),
                (d = querySelectorHlp("subscription-options-button", c)),
                setDataAttr(d, "loaded", "true"),
                yt_www_subscriptions_button_toggleMenu(d),
                "button" == getDataAttr(c, "subscription-menu-type") && X.getInstance().Rd(d));
        },
        en = function (a) {
            zc(a.userData.collection);
        },
        fn = function (a) {
            Ym(a.userData.subscription, trueVar);
        },
        Xm = function (a, b) {
            var c = a.userData.eventTrigger,
                d = a.userData.subscription,
                e = b.html_content;
            setDataAttr(d, "subscription-id", b.id);
            cn(d, e);
            setDataAttr(c, "loaded", "true");
        },
        gn = function (a) {
            var b = a.userData.subscription;
            a.userData.eventTrigger.disabled = falseVar;
            a = $m(b);
            Array_forEach(a, function (a) {
                "button" == getDataAttr(a, "subscription-menu-type") ? an(a) : bn(a, trueVar);
            });
        },
        hn = function (a) {
            if ((a = a.userData.eventTrigger)) a.disabled = falseVar;
        };
    var jn = function (a, b) {
        this.u = a;
        this.Yb = b || nullVar;
        this.subscriptionType = getDataAttr(a, "subscription-type") || "user";
        this.subscriptionValue = getDataAttr(a, "subscription-value") || "";
        this.enableTooltip = !!getDataAttr(a, "enable-tooltip");
        this.enableHovercard = !!getDataAttr(a, "enable-hovercard");
        this.sb = falseVar;
        this.cd();
    };
    jn.prototype.getId = function () {
        return getDataAttr(this.u, "subscription-id") || nullVar;
    };
    var ln = function (a, b) {
        b ? setDataAttr(a.u, "subscription-id", b) : removeDataAttr(a.u, "subscription-id");
        kn(a);
    };
    jn.prototype.getValue = function () {
        return this.subscriptionValue;
    };
    jn.prototype.getType = function () {
        return this.subscriptionType;
    };
    var kn = function (a) {
        A(a.u, "subscribed", !!a.getId());
        var b = yt_uix_getWidgetName(ak.getInstance(), "target");
        A(a.u, b, !!a.getId() && a.enableHovercard);
        a.enableTooltip &&
            ((b = (a.getId() ? "un" : "") + "subscribe-tooltip"),
            (b = getDataAttr(a.u, b) || ""),
            Ah(xh.getInstance(), a.u, b));
    };
    jn.prototype.cd = function () {
        yt_events_listen(this.u, "click", goog_bind(this.Qh, this));
        yt_pubsub_subscribe("SUBSCRIBE", this.Xe, this);
        yt_pubsub_subscribe("UNSUBSCRIBE", this.Xe, this);
        this.enableHovercard && yt_events_listen(this.u, "mouseover", goog_bind(this.Rh, this));
        kn(this);
    };
    jn.prototype.Xe = function (a, b, c, d) {
        c != this.getId() && this.getValue() == a && this.getType() == b && ln(this, c);
        d != this.u && this.enableHovercard && ak.getInstance().Z(this.u);
    };
    jn.prototype.Qh = function () {
        if (this.sb) return falseVar;
        zh(xh.getInstance(), this.u);
        this.getId() ? mn(this) : nn(this);
    };
    jn.prototype.Rh = function () {
        this.getId() &&
            yt_setTimeout(
                goog_bind(function () {
                    on(this);
                }, this),
                350
            );
    };
    var on = function (a) {
            var b = ak.getInstance();
            if (!a.ie && Yj(b, a.u)) {
                a.ie = trueVar;
                var c = { hovercard: 1 };
                c["action_get_subscription_form_for_" + a.subscriptionType] = 1;
                var d = { session_token: yt_net_ajax_tokenMap_.subscription_ajax };
                d[pn(a)] = a.subscriptionValue;
                ajaxRequest("/subscription_ajax", {
                    method: "POST",
                    g: c,
                    n: d,
                    j: a,
                    f: function (a, c) {
                        var d = this.u,
                            j = c.response.html_content,
                            o = jh(b, d);
                        if (o) {
                            var x = b.rb(o);
                            x &&
                                ((x.innerHTML = j),
                                _hasclass(o, yt_uix_getWidgetName(b, "active")) && ((j = yt_uix_createWidgetCard(b, d, o)), Xj(b, d, j)));
                        }
                        qn(this);
                    },
                    B: function () {
                        this.ie = falseVar;
                    }
                });
            }
        },
        qn = function (a) {
            var b = ak.getInstance(),
                c = jh(b, a.u),
                d = b.rb(c);
            Array_forEach(
                d.getElementsByTagName("input"),
                function (a) {
                    yt_events_listen(
                        a,
                        "change",
                        goog_bind(function () {
                            var a = d.getElementsByTagName("form")[0],
                                b = a.action || document.location.href,
                                c = a.method.toUpperCase() || "GET",
                                a = goog_dom_forms_getFormDataString(a);
                            _ajax(b, undefinedVar, c, a, undefinedVar);
                        }, this)
                    );
                },
                a
            );
        },
        nn = function (a) {
            if (yt_getConfig("LOGGED_IN")) {
                var b = pn(a),
                    c = {};
                c["action_create_subscription_to_" + a.subscriptionType] = 1;
                var d = getDataAttr(a.u, "subscription-feature");
                d && (c.feature = d);
                d = { session_token: yt_net_ajax_tokenMap_.subscription_ajax };
                d[b] = a.subscriptionValue;
                a.sb = trueVar;
                a.u.disabled = trueVar;
                ajaxRequest("/subscription_ajax", {
                    method: "POST",
                    j: a,
                    g: c,
                    n: d,
                    f: function (a, b) {
                        ln(this, b.response.id);
                        yt_pubsub_publish("SUBSCRIBE", this.getValue(), this.getType(), this.getId(), this.u);
                        this.enableHovercard && (ak.getInstance().show(this.u), on(this));
                        this.Yb && this.Yb(this.u, trueVar);
                    },
                    ga: function () {
                        this.sb = falseVar;
                        this.u.disabled = falseVar;
                    }
                });
                Ck("subscribe");
            }
        },
        mn = function (a) {
            var b = { s: a.getId(), session_token: yt_net_ajax_tokenMap_.subscription_ajax },
                c = { action_remove_subscriptions: 1 },
                d = getDataAttr(a.u, "subscription-feature");
            d && (c.feature = d);
            a.sb = trueVar;
            a.u.disabled = trueVar;
            ajaxRequest("/subscription_ajax", {
                method: "POST",
                j: a,
                g: c,
                n: b,
                f: function () {
                    ln(this, nullVar);
                    yt_pubsub_publish("UNSUBSCRIBE", this.getValue(), this.getType(), nullVar, nullVar);
                    this.Yb && this.Yb(this.u, falseVar);
                },
                ga: function () {
                    this.sb = falseVar;
                    this.u.disabled = falseVar;
                }
            });
            Ck("unsubscribe");
        },

        pn = function (a) {
            return "playlist" == a.subscriptionType ? "p" : "blog" == a.subscriptionType ? "b" : "topic" == a.subscriptionType ? "l" : "u";
        };
    
    var rn = function () {};
    var sn = function () {};
    inherits(sn, rn);
    sn.prototype.N = function () {
        var a = 0;
        Qc(this.fb(trueVar), function (b) {
            assertString(b);
            a++;
        });
        return a;
    };
    sn.prototype.clear = function () {
        var a = Rc(this.fb(trueVar)),
            b = this;
        Array_forEach(a, function (a) {
            b.remove(a);
        });
    };
    var tn = function (a) {
        this.fa = a;
    };
    inherits(tn, sn);
    n = tn.prototype;
    n.set = function (a, b) {
        try {
            this.fa.setItem(a, b);
        } catch (c) {
            throwEx("Storage mechanism: Quota exceeded");
        }
    };
    n.get = function (a) {
        a = this.fa.getItem(a);
        if (isString(a) || a === nullVar) return a;
        throwEx("Storage mechanism: Invalid value was encountered");
    };
    n.remove = function (a) {
        this.fa.removeItem(a);
    };
    n.N = function () {
        return this.fa.length;
    };
    n.fb = function (a) {
        var b = 0,
            c = new Oc(),
            d = this;
        c.next = function () {
            b >= d.N() && throwEx(Nc);
            var c = assertString(d.fa.key(b++));
            if (a) return c;
            c = d.fa.getItem(c);
            if (isString(c)) return c;
            throwEx("Storage mechanism: Invalid value was encountered");
        };
        return c;
    };
    n.clear = function () {
        this.fa.clear();
    };
    var un = function () {
        var a = nullVar;
        try {
            a = window.localStorage || nullVar;
        } catch (b) {}
        this.fa = a;
    };
    inherits(un, tn);
    var vn = function (a) {
        this.Ob = a;
        this.uf = new xg();
    };
    n = vn.prototype;
    n.Ob = nullVar;
    n.uf = nullVar;
    n.set = function (a, b) {
        isDefined(b) ? this.Ob.set(a, zg(this.uf, b)) : this.Ob.remove(a);
    };
    n.get = function (a) {
        a = this.Ob.get(a);
        if (a !== nullVar)
            try {
                return vg(a);
            } catch (b) {
                throwEx("Storage: Invalid value was encountered");
            }
    };
    n.remove = function (a) {
        this.Ob.remove(a);
    };
    var wn = function () {
        var a = new un(),
            b;
        if ((b = a))
            a: {
                try {
                    b = !!a.fa && !!a.fa.getItem;
                    break a;
                } catch (c) {}
                b = falseVar;
            }
        b && (this.eb = new vn(a));
    };
    wn.prototype.eb = nullVar;
    wn.prototype.getVolume = function () {
        var a = { volume: 100, muted: falseVar, nonNormalized: 100 };
        if (this.eb) {
            var b = {};
            try {
                b = this.eb.get("yt-player-volume") || {};
            } catch (c) {
                this.eb.remove("yt-player-volume");
            }
            a.volume = isNaN(b.volume) ? 100 : Math.min(Math.max(b.volume, 0), 100);
            a.nonNormalized = isNaN(b.nonNormalized) ? a.volume : b.nonNormalized;
            a.muted = b.muted == undefinedVar ? falseVar : b.muted;
        }
        return a;
    };
    !document.getElementById &&
        document.all &&
        (document.getElementById = function (a) {
            return document.all[a];
        });
    var xn = falseVar,
        yn = -1,
        zn = "",
        An = {},
        Bn = new lf(),
        Cn = nullVar,
        Dn = function () {
            return yt_getConfig("RESUME_COOKIE_NAME");
        },
        En = function (a, b) {
            var c = Dn();
            if (c) {
                var d = yt_net_cookies_get(c, "").split(","),
                    d = Array_filter(d, function (b) {
                        return 0 != b.indexOf(a) && b.length;
                    });
                4 <= d.length && d.shift();
                d.push(a + ":" + b);
                yt_net_cookies_set(c, d.join(","), 1814400);
            }
        },
        Fn = function (a) {
            var b = Dn();
            if (b) {
                var c = yt_net_cookies_get(b, "").split(","),
                    c = Array_filter(c, function (b) {
                        return 0 != b.indexOf(a);
                    });
                0 == c.length ? yt_net_cookies_remove(b) : yt_net_cookies_set(b, c.join(","), 1814400);
            }
        },
        Gn = function () {
            var a = mj(),
                b = a.getDuration(),
                a = Math.floor(a.getCurrentTime()),
                c = yt_getConfig("VIDEO_ID");
            120 >= a || a + 120 >= b ? Fn(c) : En(c, Math.floor(a));
        },
        Hn = function (a, b) {
            if (isJscriptIE && !a.addEventListener) {
                var c = b ? 2 * b : 50;
                yt_setTimeout(function () {
                    Hn(a, c);
                }, c);
            } else (b && Xg("ael_delayed", "delay=" + b, undefinedVar), In(a), Bn.xc("READY_STATE_TOPIC", a));
        },
        In = function (a) {
            a.addEventListener("onStateChange", Jn);
            a.addEventListener("NEXT_CLICKED", Kn);
            a.addEventListener("SIZE_CLICKED", Ln);
            a.addEventListener("onVolumeChange", Mn);
            a.addEventListener("SHARE_CLICKED", Nn);
            Dn() && yt_events_listen(window, "beforeunload", Gn);
            Re(window.location.hash).q && yt_getConfig("WIDE_PLAYER_STYLES") && lj(falseVar);
            var b = _gel("watch-player");
            b && (b.style.background = "transparent");
            hj(a);
            Cn = new wn();
        },
        Jn = function (a) {
            yn = a;
            switch (a) {
                case 0:
                    Ni(bj()) && bj().next(falseVar, "autoplay");
            }
        },
        Mn = function (a) {
            var b = Cn;
            if (b.eb) {
                var c = {};
                c.volume = isNaN(a.volume)
                    ? b.getVolume().volume
                    : Math.min(Math.max(a.volume, 0), 100);
                c.nonNormalized = a.nonNormalized;
                c.muted = a.muted == undefinedVar ? b.getVolume().muted : a.muted;
                try {
                    b.eb.set("yt-player-volume", c);
                } catch (d) {}
            }
        },
        Kn = function () {
            bj().next(trueVar, undefinedVar);
        },
        Ln = function (a) {
            yt_getConfig("FULLSCREEN_EXPAND")
                ? A(document.body, "fullscreen", a)
                : (a ? yt_net_cookies_set("wide", "1") : yt_net_cookies_set("wide", "0"), lj(a));
        },
        Nn = function () {
            Cl(_gel("watch-share"), trueVar);
        },
        yt_www_watch_player_seekTo = function (a, b) {
            var c = b != nullVar ? b : trueVar,
                d = mj();
            d.seekTo(a, trueVar);
            c &&
                (_gel("watch-video-container")
                    ? window.scroll(0, 0)
                    : (window.location.href = "#movie_player"));
            d.playVideo();
        },
        Qn = function () {
            if (xn) {
                var a = window.location.hash;
                a != zn &&
                    ((zn = a), (a = Re(a)), "t" in a && a.t != An.t && yt_www_watch_player_seekTo(Pn(a.t), falseVar), (An = a));
            }
        },
        Pn = function (a) {
            var b = 0;
            -1 != a.indexOf("h") && ((a = a.split("h")), (b = 3600 * a[0]), (a = a[1]));
            -1 != a.indexOf("m") && ((a = a.split("m")), (b = 60 * a[0] + b), (a = a[1]));
            -1 != a.indexOf("s") ? ((a = a.split("s")), (b = 1 * a[0] + b)) : (b = 1 * a + b);
            return b;
        };
    var Rn = falseVar,
        Sn = nullVar,
        Tn = nullVar,
        Un = nullVar,
        Vn = nullVar,
        Yn = function (a) {
            a.addEventListener("onStateChange", Wn);
            a.addEventListener("onError", Xn);
        },
        Zn = function (a) {
            var b = Vn,
                a = { event: a, aplid: Sn, abt: Tn, evtm: Math.round(oa() - b) };
            (b = yt_getConfig("PLAYER_CONFIG")) && b.args && b.args.plid && (a.plid = b.args.plid);
            b && b.args && b.args.video_id && (a.v = b.args.video_id);
            tracker_sendImageBeacon("/player_204?" + yt_uri_buildQueryData(a));
        },
        Wn = function (a) {
            if (Un)
                switch (a) {
                    case 1:
                        Zn("play");
                        yt_clearTimeout(Un);
                        Un = nullVar;
                        Rn = falseVar;
                        break;
                    case 0:
                        (Zn("ended"), yt_clearTimeout(Un), (Un = nullVar), (Rn = falseVar));
                }
        },
        Xn = function () {
            Un && (Zn("error"), yt_clearTimeout(Un), (Un = nullVar), (Rn = falseVar));
        },
        $n = function () {
            Un && Zn("userwaiting");
            Un = nullVar;
        },
        ao = function () {
            Rn && Zn("unload");
        };
    var bo = function () {
            var a = _gel("watch-video-annotation-editable"),
                b = trimWhitespace(_gel("watch-video-annotation-content").innerHTML);
            b
                ? y(a, ["unannotated", "editing"], ["annotated", "not-editing"])
                : y(a, ["annotated", "not-editing"], ["unannotated", "editing"]);
            _gel("watch-video-annotation-textarea").value = b;
        },
        co = function (a) {
            if (!getDataAttr(a, "saving")) {
                setDataAttr(a, "saving", "true");
                var b = _gel("watch-video-annotation-content"),
                    c = _gel("watch-video-annotation-textarea"),
                    d = trimWhitespace(c.value),
                    e = {};
                d || (e["delete"] = 1);
                ajaxRequest(a.action, {
                    format: "JSON",
                    method: "POST",
                    g: e,
                    za: goog_dom_forms_getFormDataString(a),
                    f: function () {
                        b.innerHTML = xmlEscape(d);
                    },
                    B: function () {
                        c.value = b.innerHTML;
                    },
                    ga: function () {
                        removeDataAttr(a, "saving");
                        bo();
                    }
                });
            }
        };
    var eo = function (a) {
        var b = a.target;
        if (!("INPUT" == b.tagName || "TEXTAREA" == b.tagName || "SELECT" == b.tagName))
            switch (a.keyCode) {
                case 110:
                    bj().next(trueVar, "keys");
                    break;
                case 112:
                    a = bj();
                    (a = Yh(a.b, "keys")) && yt_window_redirect(a);
                    break;
                case 106:
                    if ((a = mj())) ((b = a.getCurrentTime()), a.seekTo(b - 10));
                    break;
                case 108:
                    if ((a = mj())) ((b = a.getCurrentTime()), a.seekTo(b + 10));
                    break;
                case 107:
                    (a = mj()) && (2 == yn ? a.playVideo() : a.pauseVideo());
            }
    };
    var yt_www_watch_survey_watchPageSurveyGoAway = function () {
        var a = de.getInstance();
        ie(Hh.xf, trueVar);
        a.save();
        _hidediv("watch_page_survey");
    };
    var go = function (a, b, c) {
        var d = a.serverUri || "//www.google.com/tools/feedback",
            e = thisVar.GOOGLE_FEEDBACK_START;
        /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent) &&
            (a.mobileWindow = window.open(""));
        thisVar.GOOGLE_FEEDBACK_START_ARGUMENTS = arguments;
        e
            ? e.apply(thisVar, arguments)
            : ((e = document.createElement("script")),
              (e.src = d + "/load.js"),
              document.body.appendChild(e));
    };
    var ho = falseVar,
        io = "",
        jo = function (a) {
            a = a.match(/[\d]+/g);
            a.length = 3;
            return a.join(".");
        };
    if (navigator.plugins && navigator.plugins.length) {
        var ko = navigator.plugins["Shockwave Flash"];
        ko && ((ho = trueVar), ko.description && (io = jo(ko.description)));
        navigator.plugins["Shockwave Flash 2.0"] && ((ho = trueVar), (io = "2.0.0.11"));
    } else if (navigator.mimeTypes && navigator.mimeTypes.length) {
        var lo = navigator.mimeTypes["application/x-shockwave-flash"];
        (ho = lo && lo.enabledPlugin) && (io = jo(lo.enabledPlugin.description));
    } else
        try {
            var mo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"),
                ho = trueVar,
                io = jo(mo.GetVariable("$version"));
        } catch (no) {
            try {
                ((mo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6")),
                    (ho = trueVar),
                    (io = "6.0.21"));
            } catch (oo) {
                try {
                    ((mo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")),
                        (ho = trueVar),
                        (io = jo(mo.GetVariable("$version"))));
                } catch (po) {}
            }
        }
    var qo = io;
    var ro, so, to, uo, vo, wo, xo;
    xo = wo = vo = uo = to = so = ro = falseVar;
    var yo = getUA();
    yo &&
        (-1 != yo.indexOf("Firefox")
            ? (ro = trueVar)
            : -1 != yo.indexOf("Camino")
              ? (so = trueVar)
              : -1 != yo.indexOf("iPhone") || -1 != yo.indexOf("iPod")
                ? (to = trueVar)
                : -1 != yo.indexOf("iPad")
                  ? (uo = trueVar)
                  : -1 != yo.indexOf("Android")
                    ? (vo = trueVar)
                    : -1 != yo.indexOf("Chrome")
                      ? (wo = trueVar)
                      : -1 != yo.indexOf("Safari") && (xo = trueVar));
    var zo = ro,
        Ao = so,
        Bo = to,
        Co = uo,
        Do = vo,
        Eo = wo,
        Fo = xo;
    var Go = function (a) {
            return (a = a.exec(getUA())) ? a[1] : "";
        },
        Ho = (function () {
            if (zo) return Go(/Firefox\/([0-9.]+)/);
            if (isIEBrowser || isOperaBrowser) return browserVersionStr;
            if (Eo) return Go(/Chrome\/([0-9.]+)/);
            if (Fo) return Go(/Version\/([0-9.]+)/);
            if (Bo || Co) {
                var a = /Version\/(\S+).*Mobile\/(\S+)/.exec(getUA());
                if (a) return a[1] + "." + a[2];
            } else {
                if (Do) return (a = Go(/Android\s+([0-9.]+)/)) ? a : Go(/Version\/([0-9.]+)/);
                if (Ao) return Go(/Camino\/([0-9.]+)/);
            }
            return "";
        })();
    var yt_www_feedback_displayLink = function () {
        (isIEBrowser
            ? 0 <= compareVersionStr(Ho, "7") && 0 <= compareVersionStr(qo, "9")
            : zo
              ? 0 <= compareVersionStr(Ho, "3.5")
              : Fo
                ? 0 <= compareVersionStr(Ho, "5")
                : Eo) || _hidediv("reportbug");
    };
    var yt_www_help_bootstrap_init = function () {
            Od(_gel("help-button"), "click", Jo, trueVar);
        },
        Jo = function () {
            var a = _gel("help-button");
            if (a) {
                var b = getDataAttr(a, "iph-topic-id"),
                    c = yt_getConfig("LOCALE"),
                    d = getDataAttr(a, "iph-title-text"),
                    e = getDataAttr(a, "iph-search-button-text"),
                    f = getDataAttr(a, "iph-anchor-text"),
                    g = document.location.protocol + getDataAttr(a, "iph-js-url"),
                    j = document.location.protocol + getDataAttr(a, "iph-css-url");
                g &&
                    j &&
                    ((j = sc("link", { href: j, rel: "stylesheet" })),
                    document.getElementsByTagName("head")[0].appendChild(j),
                    yt_net_scriptloader_load(g, function () {
                        var g = getProp("yt.www.help.init"),
                            j = getProp("yt.www.help.onButtonClick");
                        g(b, "http://www.google.com", "/support/youtube", c, d, e, f);
                        yt_events_listen(a, "click", j);
                        j();
                    }));
            }
        };
    var Lo = function () {
            (function () {
                try {
                    for (var a = this; !(a.parent == a); ) {
                        "$" == a.frameElement.src && throwEx("odd");
                        a = a.parent;
                    }
                    a.frameElement != nullVar && throwEx("busted");
                } catch (b) {
                    (document.write("--\><plaintext style=display:none><\!--"),
                        window.open("/", "_top"),
                        (top.location = "/"));
                }
            })();
        },
        Mo = function (a) {
            "block" == a.responseText && Lo();
        };
    if (window != window.top) {
        var No = document.referrer;
        window.parent != window.top
            ? Lo()
            : isTrustedDomain(No) ||
              yt_net_ajax_sendRequest(
                  "/roger_rabbit?" +
                      ("location=" +
                          encodeURIComponent(No) +
                          "&self=" +
                          encodeURIComponent(window.location.href)),
                  { onComplete: Mo }
              );
    }
    var Oo = falseVar,
        yt_www_init = function () {
            yt_pubsub_publish("init");
        },
        yt_www_dispose = function () {
            yt_pubsub_publish("dispose");
        },
        yt_www_logError = function (a, b, c) {
            var d = _gel("www-core-js");
            !Oo &&
                d &&
                -1 != d.src.indexOf("/debug-") &&
                ((c = Ro(c)),
                Xg(
                    "jserror",
                    "error=" +
                        encodeURIComponent(a) +
                        "&script=" +
                        encodeURIComponent(b) +
                        "&linenumber=" +
                        encodeURIComponent(c) +
                        "&url=" +
                        encodeURIComponent(window.location.href),
                    undefinedVar
                ),
                (Oo = trueVar));
        },
        Ro = function (a) {
            if (isFirefoxBrowser)
                try {
                    eval("(0)()");
                } catch (b) {
                    return b.stack.replace(/(.*):/g, "").replace(/\n/g, ",");
                }
            else return a;
        };
    var To = [];
    var Uo = function (a, b, c, d) {
            window.google_ad_client = a;
            window.google_ad_channel = b;
            window.google_max_num_ads = 1;
            window.google_ad_output = "js";
            window.google_ad_type = "text";
            window.google_only_pyv_ads = trueVar;
            c && ((window.google_kw = c), (window.google_kw_type = "broad"));
            window.dclk_language && (window.google_language = window.dclk_language);
            window.google_ad_request_done = d;
            document.write(
                '<script language="JavaScript" src="//pagead2.googlesyndication.com/pagead/show_ads.js"><\/script>'
            );
        },
        Vo = function () {
            window.dclk_language && (window.google_language = window.dclk_language);
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
                '<script language="JavaScript" src="//pagead2.googlesyndication.com/pagead/show_ads.js"><\/script>'
            );
        },
        yt_www_ads_pyv_showPpvAdInYvaSpot = function () {
            _hidediv("ad_creative_2");
            _hidediv("pyv-placeholder");
            _gel("ppv-placeholder") ? _showdiv("ppv-placeholder") : _hidediv("homepage-sidebar-ads");
        },
        Xo = function (a, b, c, d, e) {
            var f = Array_findIndex(b.media_template_data, function (a) {
                return !!a.imageUrl;
            });
            f &&
                ((a = {
                    video_id: f.videoId,
                    ad_type: a,
                    headline: Da(b.line1),
                    image_url: f.imageUrl,
                    description1: Da(b.line2),
                    description2: Da(b.line3),
                    channel_title: f.channelName,
                    test_mode: (!!e).toString(),
                    destination_url: Da(b.url)
                }),
                yt_net_ajax_sendRequest("/pyv?" + yt_uri_buildQueryData(a), { method: "GET", update: c, onComplete: d }));
        },
        yt_www_ads_pyv_showPpvOnWatch = function () {
            var a = _gel("ppv-container");
            a && _showdiv(a);
        },
        yt_www_ads_pyv_pyvHomeRequestAds = function () {
            _hidediv("ad_creative_2");
            yt_getConfig("PYV_IS_ALLOWED")
                ? Uo("ca-youtube-homepage", yt_getConfig("PYV_AD_CHANNEL") || "", yt_getConfig("PYV_KW") || "", yt_www_ads_pyv_pyvHomeAfcCallback)
                : yt_www_ads_pyv_showPpvAdInYvaSpot();
        },
        yt_www_ads_pyv_pyvHomeAfcCallback = function (a) {
            var b = _gel("pyv-placeholder");
            0 == a.length || !b
                ? yt_www_ads_pyv_showPpvAdInYvaSpot()
                : Xo("homepage", a[0], b, function () {
                      _hidediv("ad_creative_2");
                  });
        },
        yt_www_ads_pyv_pyvBrowseRequestAds = function () {
            if (yt_getConfig("PYV_IS_ALLOWED")) {
                var a = "pyvOnBrowse";
                yt_getConfig("PYV_CATEGORY") && (a += " pyvBrowse_" + yt_getConfig("PYV_CATEGORY"));
                Uo("ca-youtube-browse", a, "", ap);
            } else Vo();
        },
        ap = function (a) {
            var b = _gel("pyv-placeholder");
            0 == a.length || !b
                ? Vo()
                : Xo(yt_getConfig("PYV_NEW_BROWSE") ? "new_browse" : "browse", a[0], b, function () {
                      _hidediv("ad_creative_1");
                  });
        },
        cp = function (a, b) {
            var c = _gel(a);
            c &&
                ((c = H("li", "video-list-item", c)),
                Array_forEach(c, function (a, c) {
                    var f = H("a", nullVar, a);
                    Array_forEach(f, function (a) {
                        var d = a.getAttribute("href");
                        d &&
                            unescape(d).match(/\/watch(\?|#!)v=/) &&
                            (a.href = b ? a.href + ("&pvpos=" + c) : a.href + ("&pvnpos=" + c));
                    });
                }));
        };
    var yt_www_watch_ads_handleSetCompanion = function (a) {
            a = a.replace(";dc_seed=", ";kmyd=watch-channel-brand-div;dc_seed=");
            _hidediv("instream_google_companion_ad_div");
            _hidediv("google_companion_ad_div");
            _showdiv("ad300x250");
            _showdiv("watch-channel-brand-div");
            var b = _gel("ad300x250");
            if (b !== nullVar) {
                var c = Math.round(1e4 * Math.random());
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
            dp();
        },
        yt_www_watch_ads_handleSetCompanionForInstream = function (a) {
            a = a.replace(";dc_seed=", ";kmyd=watch-longform-ad;dc_seed=");
            _hidediv("instream_google_companion_ad_div");
            _showdiv("watch-longform-ad");
            _showdiv("watch-longform-text");
            _showdiv("watch-longform-ad-placeholder");
            var b = _gel("watch-longform-ad-placeholder"),
                c = Math.round(1e4 * Math.random());
            b.innerHTML = [
                '<iframe src="',
                a,
                '" name="ifr_300x60ad',
                c,
                '" id="ifr_300x60ad',
                c,
                '" width="300" height="60" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"></iframe>'
            ].join("");
            dp();
        },
        yt_www_watch_ads_handleSetCompanionForLongform = function (a) {
            var b = _gel("watch-longform-ad-placeholder");
            a
                ? (_hidediv("instream_google_companion_ad_div"),
                  _showdiv("watch-longform-ad"),
                  _showdiv("watch-longform-text"),
                  _showdiv("watch-longform-ad-placeholder"),
                  (b.innerHTML = a))
                : _hidediv("watch-longform-ad");
            dp();
        },
        yt_www_watch_ads_handleSetCompanionForFreewheel = function (a, b) {
            var c = "watch-channel-brand-div",
                d = "ad300x250",
                e = 300,
                f = 250;
            "video" == a &&
                ((c = "watch-longform-ad"),
                (d = "watch-longform-ad-placeholder"),
                (e = 300),
                (f = 60),
                _hidediv("instream_google_companion_ad_div"));
            var g = decodeURIComponent(b);
            _gel(d).innerHTML = [
                '<iframe name="fw_ad" id="fw_ad" ',
                'width="' + e + '" height="' + f + '" ',
                'marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"></iframe>'
            ].join("");
            var j = _gel("fw_ad"),
                j = j.contentWindow
                    ? j.contentWindow
                    : j.contentDocument.document
                      ? j.contentDocument.document
                      : j.contentDocument,
                e = navigator.userAgent.toLowerCase(),
                d = -1 != e.indexOf("msie"),
                e = -1 != e.indexOf("opera");
            j.document.open();
            j.document.write(g);
            d || e
                ? yt_setTimeout(function () {
                      j.document.close();
                  }, 7500)
                : j.document.close();
            _showdiv(c);
            dp();
        },
        yt_www_watch_ads_handleHideCompanion = function () {
            _showdiv("watch-channel-brand-div");
            _hidediv("ad300x250");
            _gel("google_companion_ad_div").style.height = "250px";
            dp();
        },
        yt_www_watch_ads_handleCompanionForInstream = function () {
            _hidediv("watch-longform-ad");
            dp();
        },
        yt_www_watch_ads_handleCloseMpuCompanion = function () {
            _hidediv("watch-channel-brand-div");
            dp();
        },
        dp = function () {
            var a = getProp("yt.www.watch.ads.handleAdLoaded");
            a && a.call();
        },
        yt_www_watch_ads_updatePopoutAds = function (a) {
            yt_setConfig("POPOUT_AD_SLOTS", a);
        },
        yt_www_watch_ads_disablePopoutButton = function () {
            var a = _gel("watch-longform-popup");
            a && (a.disabled = trueVar);
        },
        yt_www_watch_ads_enablePopoutButton = function (a) {
            var b = _gel("watch-longform-popup");
            b && (b.disabled = falseVar);
            yt_www_watch_ads_updatePopoutAds(a);
        },
        yt_www_watch_ads_handleSetAfvCompanionVars = function (a) {
            window.google_ad_output = "html";
            a
                ? ((window.google_ad_height = "60"),
                  (window.google_ad_format = "300x60_as"),
                  (window.google_container_id = "instream_google_companion_ad_div"))
                : ((window.google_ad_height = "250"),
                  (window.google_ad_format = "300x250_as"),
                  (window.google_container_id = "google_companion_ad_div"));
        },
        yt_www_watch_ads_handleShowAfvCompanionAdDiv = function (a) {
            a
                ? (_hidediv("watch-longform-ad-placeholder"),
                  _hidediv("watch-channel-brand-div"),
                  _showdiv("watch-longform-text"),
                  _showdiv("watch-longform-ad"),
                  _showdiv("instream_google_companion_ad_div"))
                : (_hidediv("ad300x250"),
                  _hidediv("watch-longform-ad"),
                  _showdiv("google_companion_ad_div"),
                  _showdiv("watch-channel-brand-div"));
            dp();
        },
        yt_www_watch_ads_handleHideAfvInstreamCompanionAdDiv = function () {
            _hidediv("instream_google_companion_ad_div");
            _hidediv("watch-longform-text");
            _hidediv("watch-longform-ad-placeholder");
            dp();
        };
    exportSymbol("yt.www.watch.ads.showForcedMpu", function (a) {
        _gel("ad300x250").innerHTML = [
            '<iframe src="',
            a,
            '" name="ifr_300x250ad" id="ifr_300x250ad" width="300" height="250" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"></iframe>'
        ].join("");
        _showdiv("ad300x250");
    });
    exportSymbol("yt.www.watch.ads.handleMoveGutCompanion", function (a) {
        var a = a ? _gel("instream_google_companion_ad_div") : _gel("google_companion_ad_div"),
            b = _gel("yt-gut-content");
        b ? (b.innerHTML = "") : ((b = document.createElement("div")), (b.id = "yt-gut-content"));
        a && ((a.innerHTML = ""), a.appendChild(b));
        dp();
    });
    exportSymbol("yt.www.watch.ads.setGutSlotSizes", function (a, b) {
        var c = yt_getConfig("gut_slot");
        c &&
            ((c = c.getSizes()),
            Array_clear(c),
            b && c.push(yt_getConfig("yt_gut_invideo_size")),
            a && c.push(yt_getConfig("yt_gut_instream_size")));
    });
    exportSymbol("yt.www.watch.ads.handleSetCompanion", yt_www_watch_ads_handleSetCompanion);
    exportSymbol("yt.www.watch.ads.handleSetCompanionForInstream", yt_www_watch_ads_handleSetCompanionForInstream);
    exportSymbol("yt.www.watch.ads.handleSetCompanionForLongform", yt_www_watch_ads_handleSetCompanionForLongform);
    exportSymbol("yt.www.watch.ads.handleSetCompanionForFreewheel", yt_www_watch_ads_handleSetCompanionForFreewheel);
    exportSymbol("yt.www.watch.ads.handleHideCompanion", yt_www_watch_ads_handleHideCompanion);
    exportSymbol("yt.www.watch.ads.handleHideCompanionForInstream", yt_www_watch_ads_handleCompanionForInstream);
    exportSymbol("yt.www.watch.ads.disablePopoutButton", yt_www_watch_ads_disablePopoutButton);
    exportSymbol("yt.www.watch.ads.enablePopoutButton", yt_www_watch_ads_enablePopoutButton);
    exportSymbol("yt.www.watch.ads.handleCloseMpuCompanion", yt_www_watch_ads_handleCloseMpuCompanion);
    exportSymbol("yt.www.watch.ads.updatePopoutAds", yt_www_watch_ads_updatePopoutAds);
    exportSymbol("yt.www.watch.ads.handleSetAfvCompanionVars", yt_www_watch_ads_handleSetAfvCompanionVars);
    exportSymbol("yt.www.watch.ads.handleShowAfvCompanionAdDiv", yt_www_watch_ads_handleShowAfvCompanionAdDiv);
    exportSymbol("yt.www.watch.ads.handleHideAfvInstreamCompanionAdDiv", yt_www_watch_ads_handleHideAfvInstreamCompanionAdDiv);
    exportSymbol("yt.www.ads.pyv.pyvWatchAfcCallback", function (a) {
        if (0 == a.length)
            (yt_www_ads_pyv_showPpvOnWatch(),
                yt_getConfig("PYV_TRACK_RELATED_CTR") &&
                    (cp("watch-related-grid", falseVar),
                    cp("watch-related", falseVar),
                    cp("watch-channel-videos-panel", falseVar)));
        else {
            var b = _gel("watch-channel-videos-panel");
            b && !yt_getConfig("IS_BRANDED_WATCH") && _addclass(b, "yt-uix-expander-collapsed");
            Xo(
                "watch_related",
                a[0],
                nullVar,
                function (a) {
                    var a = yt_net_ajax_getNodeValue(yt_net_ajax_getRootNode(a.responseXML), "html_content") || "",
                        b = _gel(window.pyv_related_box_id || "watch-related");
                    b &&
                        0 != b.innerHTML.indexOf(a) &&
                        (b.insertBefore(wc(a), b.firstChild),
                        yt_getConfig("PYV_TRACK_RELATED_CTR") &&
                            (cp("watch-related", trueVar), cp("watch-channel-videos-panel", trueVar)));
                    if ((b = _gel("watch-related-grid")) && 0 != b.innerHTML.indexOf(a))
                        (b.insertBefore(wc(a), b.firstChild),
                            yt_getConfig("PYV_TRACK_RELATED_CTR") && cp("watch-related-grid", trueVar));
                },
                window.google_adtest && "on" == window.google_adtest
            );
        }
    });
    exportSymbol("yt.www.ads.pyv.pyvSearchAfcCallback", function (a) {
        var b = _gel("pyv-ads");
        0 != a.length &&
            b &&
            (Array_forEach(a, function (a) {
                var b = a.media_template_data[0];
                a.line1 = Da(a.line1);
                a.line2 = Da(a.line2);
                a.line3 = Da(a.line3);
                a.url = Da(a.url);
                b.imageUrl = Da(b.imageUrl);
                b.channelName = Da(b.channelName);
            }),
            (a = { pyv_ads: zg(new xg(undefinedVar), a), ad_type: "search" }),
            yt_net_ajax_sendRequest("/pyv", { method: "POST", postBody: yt_uri_buildQueryData(a), update: b }));
    });
    exportSymbol("yt.www.ads.pyv.pyvHomeAfcCallback", yt_www_ads_pyv_pyvHomeAfcCallback);
    exportSymbol("yt.www.ads.pyv.showPpvAdInYvaSpot", yt_www_ads_pyv_showPpvAdInYvaSpot);
    exportSymbol("yt.www.ads.pyv.pyvHomeRequestAds", yt_www_ads_pyv_pyvHomeRequestAds);
    exportSymbol("yt.www.ads.pyv.pyvBrowseRequestAds", yt_www_ads_pyv_pyvBrowseRequestAds);
    exportSymbol("yt.www.ads.pyv.showPpvOnWatch", yt_www_ads_pyv_showPpvOnWatch);
    exportSymbol("yt.www.ads.pyv.loadPyvIframe", function (a) {
        var b = window.location.href;
        b.indexOf("#") == b.length - 1 && isWebKitBrowser && (window.location.hash = "#!");
        var b = document.body,
            c = ic(b),
            d = [];
        d.push("<!DOCTYPE html>");
        d.push("<html><head>", a, "</head><body>", undefinedVar, "</body></html>");
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
    exportSymbol("yt.www.ads.pyv.loadPyvAfsScript", function (a) {
        yt_net_scriptloader_load("/pyv_afs_ads?query=" + a);
    });
    yt_registerGlobal("pyv_related_box_id");
    exportSymbol("setCompanion", yt_www_watch_ads_handleSetCompanion);
    exportSymbol("setInstreamCompanion", yt_www_watch_ads_handleSetCompanionForInstream);
    exportSymbol("setLongformCompanion", yt_www_watch_ads_handleSetCompanionForLongform);
    exportSymbol("setFreewheelCompanion", yt_www_watch_ads_handleSetCompanionForFreewheel);
    exportSymbol("closeInPageAdIframe", yt_www_watch_ads_handleHideCompanion);
    exportSymbol("hideInstreamCompanion", yt_www_watch_ads_handleCompanionForInstream);
    exportSymbol("disablePopout", yt_www_watch_ads_disablePopoutButton);
    exportSymbol("enablePopout", yt_www_watch_ads_enablePopoutButton);
    exportSymbol("closeMpuCompanion", yt_www_watch_ads_handleCloseMpuCompanion);
    exportSymbol("updatePopAds", yt_www_watch_ads_updatePopoutAds);
    exportSymbol("setAfvCompanionVars", yt_www_watch_ads_handleSetAfvCompanionVars);
    exportSymbol("showAfvCompanionAdDiv", yt_www_watch_ads_handleShowAfvCompanionAdDiv);
    exportSymbol("hideAfvInstreamCompanionAdDiv", yt_www_watch_ads_handleHideAfvInstreamCompanionAdDiv);
    exportSymbol("show_ppv_in_yva_spot", yt_www_ads_pyv_showPpvAdInYvaSpot);
    exportSymbol("requestPyvAds", yt_www_ads_pyv_pyvHomeRequestAds);
    exportSymbol("pyvHomeRequestAds", yt_www_ads_pyv_pyvHomeRequestAds);
    exportSymbol("pyvBrowseRequestAds", yt_www_ads_pyv_pyvBrowseRequestAds);
    window.yt = window.yt || {};
    exportSymbol("_gel", _gel);
    exportSymbol("_hasclass", _hasclass);
    exportSymbol("_addclass", _addclass);
    exportSymbol("_removeclass", _removeclass);
    exportSymbol("_toggleclass", _toggleclass);
    exportSymbol("_showdiv", _showdiv);
    exportSymbol("_hidediv", _hidediv);
    exportSymbol("_ajax", _ajax);
    exportSymbol("goog.bind", goog_bind);
    exportSymbol("goog.dom.getElementsByTagNameAndClass", function (a, b, c) {
        return H(a, b, c);
    });
    exportSymbol("goog.dom.getFirstElementChild", goog_dom_getFirstElementChild);
    exportSymbol("goog.array.forEach", Array_forEach);
    exportSymbol("goog.array.indexOf", Array_indexOf);
    exportSymbol("goog.array.contains", Array_contains);
    exportSymbol("yt.dom.hasAncestor", function (a, b, c) {
        a = _gel(a);
        b = _gel(b);
        return !!findAncestor(
            a,
            function (a) {
                return a === b;
            },
            trueVar,
            c
        );
    });
    exportSymbol("yt.setConfig", yt_setConfig);
    exportSymbol("yt.getConfig", yt_getConfig);
    exportSymbol("yt.registerGlobal", yt_registerGlobal);
    exportSymbol("yt.setTimeout", yt_setTimeout);
    exportSymbol("yt.setInterval", yt_setInterval);
    exportSymbol("yt.clearTimeout", yt_clearTimeout);
    exportSymbol("yt.clearInterval", yt_clearInterval);
    exportSymbol("yt.setMsg", function (a) {
        assignProps(ytMsgs_, arguments);
    });
    exportSymbol("yt.getMsg", yt_getMsg);
    exportSymbol("yt.events.listen", yt_events_listen);
    exportSymbol("yt.events.unlisten", yt_events_unlisten);
    exportSymbol("yt.events.stopPropagation", yt_events_stopPropagation);
    exportSymbol("yt.events.preventDefault", yt_events_preventDefault);
    exportSymbol("yt.events.getTarget", yt_events_getTarget);
    exportSymbol("yt.events.clear", function () {
        for (var evt in yt_events_listeners_) yt_removeEventListeners(evt);
    });
    exportSymbol("yt.events.Event", yt_events_Event);
    yt_events_Event.prototype.preventDefault = yt_events_Event.prototype.preventDefault;
    yt_events_Event.prototype.stopPropagation = yt_events_Event.prototype.stopPropagation;
    exportSymbol("yt.pubsub.subscribe", yt_pubsub_subscribe);
    exportSymbol("yt.pubsub.unsubscribeByKey", function (a) {
        var b = getProp("yt.pubsub.instance_");
        return b ? b.unsubscribeByKey(a) : falseVar;
    });
    exportSymbol("yt.pubsub.publish", yt_pubsub_publish);
    exportSymbol("yt.www.init", yt_www_init);
    exportSymbol("yt.www.dispose", yt_www_dispose);
    yt_events_listen(window, "load", yt_www_init);
    yt_events_listen(window, "unload", yt_www_dispose);
    exportSymbol("yt.www.logError", yt_www_logError);
    window.onerror = yt_www_logError;
    exportSymbol("yt.uix.FormInput.selectOnChangeActionIE", function (a) {
        $j.getInstance().Hd(a);
    });
    yt_pubsub_subscribe("init", function () {
        var a = $j.getInstance(),
            b = kc(yt_uix_getWidgetName(a, "select-element"));
        Array_forEach(b, function (b) {
            a.Hd(b);
        });
    });
    exportSymbol("goog.i18n.bidi.isRtlText", goog_i18n_bidi_isRtlText);
    exportSymbol("goog.i18n.bidi.setDirAttribute", function (a, b) {
        var c = b.value,
            d = "";
        goog_i18n_bidi_isRtlText(c) ? (d = "rtl") : goog_i18n_bidi_isRtlText(c) || (d = "ltr");
        b.dir = d;
    });
    exportSymbol("yt.i18n.virtualkeyboard.toggle", function (a, b) {
        a &&
            ((sg = a),
            lg("GOOGLE_LANGUAGE_API_VIRTUAL_KEYBOARD", function () {
                if (rg) {
                    var a = rg;
                    a.isVisible() ? a.setVisible(falseVar) : a.setVisible(trueVar);
                } else
                    tg ||
                        ((tg = trueVar),
                        (ug = b),
                        google.load("elements", "1", {
                            packages: "keyboard",
                            callback: "yt.i18n.virtualkeyboard.finishLoading"
                        }));
            }));
    });
    exportSymbol("yt.i18n.virtualkeyboard.finishLoading", function () {
        google.elements.keyboard.setAutoHide(falseVar);
        google.elements.keyboard.setSendShiftKeyUpEventUponInput(trueVar);
        google.elements.keyboard.enableMinMaxMode(falseVar);
        google.elements.keyboard.enableGoogleLogo(falseVar);
        google.elements.keyboard.enableKeyCodeScheme(falseVar);
        google.elements.keyboard.helpLink(
            ["//support.google.com/youtube/bin/answer.py?answer=1047939&hl=", ug].join("")
        );
        rg = new google.elements.keyboard.Keyboard(sg, ["masthead-search-term"]);
        tg = falseVar;
    });
    exportSymbol("yt.i18n.inputtools.loadInputTools", function (a, b, c) {
        a &&
            b &&
            ((mg = a),
            lg("GOOGLE_LANGUAGE_API_INPUT_TOOLS", function () {
                !og &&
                    !pg &&
                    ((pg = trueVar),
                    (ng = b),
                    (qg = c),
                    google.load("elements", "1", {
                        packages: "inputtools",
                        callback: "yt.i18n.inputtools.finishLoading"
                    }));
            }));
    });
    exportSymbol("yt.i18n.inputtools.finishLoading", function () {
        og = new google.elements.inputtools.InputToolsController();
        ub(ng, function (a, c) {
            og.addPageElements([c]);
        });
        og.addInputTools(mg);
        qg && -1 != qg.indexOf("hi") && og.setCurrentInputTool("im_t13n_hi");
        ub(ng, function (a) {
            a && og.showControl(a);
        });
        var a = falseVar;
        Array_forEach(mg, function (b) {
            0 == b.lastIndexOf("vdk", 0) && (a = trueVar);
        });
        a &&
            google.elements.keyboard.helpLink(
                ["//support.google.com/youtube/bin/answer.py?answer=1047939&hl=", qg].join("")
            );
        og.setApplicationName("youtube");
        pg = falseVar;
    });
    exportSymbol("yt.style.toggle", yt_style_toggle);
    exportSymbol("yt.style.setDisplayed", yt_style_setDisplayed);
    exportSymbol("yt.style.isDisplayed", yt_style_isDisplayed);
    exportSymbol("yt.style.setVisible", function (a, b) {
        if ((a = _gel(a))) a.style.visibility = b ? "visible" : "hidden";
    });
    exportSymbol("yt.net.ajax.sendRequest", yt_net_ajax_sendRequest);
    exportSymbol("yt.net.ajax.getRootNode", yt_net_ajax_getRootNode);
    exportSymbol("yt.net.ajax.getNodeValue", yt_net_ajax_getNodeValue);
    exportSymbol("yt.net.ajax.setToken", yt_net_ajax_setToken);
    exportSymbol("yt.net.delayed.register", yt_net_delayed_register);
    exportSymbol("yt.net.delayed.load", yt_net_delayed_load);
    exportSymbol("yt.net.delayed.markAsLoaded", function (a) {
        a in Ng && (Og[a] = trueVar);
    });
    exportSymbol("yt.net.scriptloader.load", yt_net_scriptloader_load);
    exportSymbol("goog.dom.forms.getFormDataString", goog_dom_forms_getFormDataString);
    exportSymbol("yt.uri.buildQueryData", yt_uri_buildQueryData);
    exportSymbol("yt.uri.appendQueryData", yt_uri_appendQueryData);
    exportSymbol("yt.www.feedback.start", function (a, b, c, d) {
        try {
            var c = (c || "59") + "",
                b = b || {},
                e = yt_getConfig("SESSION_INDEX");
            try {
                var f = mj();
                f && f.pauseVideo();
                var g = af.getInstance();
                b.flashVersion = [g.J, g.Pa, g.rev].join(".");
            } catch (j) {}
            a = { productId: c, locale: a };
            e && (a.authuser = e + "");
            d && (a.bucket = d);
            go(a, b);
            return falseVar;
        } catch (o) {
            return trueVar;
        }
    });
    exportSymbol("yt.www.feedback.displayLink", yt_www_feedback_displayLink);
    yt_pubsub_subscribe("init", yt_www_feedback_displayLink);
    exportSymbol("yt.www.help.bootstrap.init", yt_www_help_bootstrap_init);
    yt_pubsub_subscribe("init", yt_www_help_bootstrap_init);
    exportSymbol("yt.net.cookies.set", yt_net_cookies_set);
    exportSymbol("yt.net.cookies.get", yt_net_cookies_get);
    exportSymbol("yt.net.cookies.remove", yt_net_cookies_remove);
    exportSymbol("yt.window.redirect", yt_window_redirect);
    exportSymbol("yt.window.popup", yt_window_popup);
    yt_uix_registerWidget(X);
    yt_uix_registerWidget(Tj);
    yt_uix_registerWidget(Zj);
    yt_uix_registerWidget($j);
    yt_uix_registerWidget(th);
    yt_uix_registerWidget(ak);
    yt_uix_registerWidget(Gh);
    yt_uix_registerWidget(ck);
    yt_uix_registerWidget(dk);
    yt_uix_registerWidget(zi);
    yt_uix_registerWidget(ek);
    yt_uix_registerWidget(xh);
    exportSymbol("yt.player.update", function (playerId, playerConfig, forceUpdate) {
        return yt_player_embed(playerId, playerConfig, { force: forceUpdate });
    });
    exportSymbol("yt.player.embed", yt_player_embed);
    exportSymbol("yt.flash.embed", yt_flash_embed);
    exportSymbol("onYouTubePlayerReady", function () {
        xn = trueVar;
        var a = mj();
        a && Hn(a);
    });
    exportSymbol("yt.www.watch.activity.getTimeSinceActive", yt_www_watch_activity_getTimeSinceActive);
    exportSymbol("yt.www.watch.activity.setTimestamp", yt_www_watch_activity_setTimestamp);
    exportSymbol("yt.www.watch.player.handleEndPreview", function (a) {
        var b = mj();
        b && b.stopVideo && b.stopVideo();
        (b = _gel("watch-checkout-offers")) && yt_pubsub_publish("checkout-init-purchase", a, b);
    });
    exportSymbol("yt.www.watch.player.openPopup", function (a, b, c) {
        var d = nullVar,
            e = mj(),
            a = "/watch_popup?v=" + a;
        e &&
            ((a += "&vq=" + e.getPlaybackQuality()),
            (d = Math.round(e.getCurrentTime())),
            e.stopVideo());
        yt_getConfig("POPOUT_AD_SLOTS") && (a += "&pop_ads=" + yt_getConfig("POPOUT_AD_SLOTS"));
        d && 10 < d && (a += "#t=" + d);
        yt_window_popup(a, {
            width: b,
            height: c,
            resizable: trueVar,
            location: falseVar,
            statusbar: falseVar,
            menubar: falseVar,
            scrollbars: falseVar,
            toolbar: falseVar
        });
    });
    exportSymbol("yt.www.watch.activity.init", vm);
    exportSymbol("yt.www.watch.player.updateConfig", function (a) {
        var a = a instanceof YtPlayerConfig ? a.args : a.args,
            b;
        var c = Re(window.location.hash);
        (b = c.t || c.at)
            ? ((An.t = c.t),
              (An.at = c.at),
              (c = window.location.hash.replace(/\bat=[^&]*&?/, "")),
              (window.location.hash = c && "#" != c ? c : "#!"),
              (b = Pn(b)))
            : (b = 0);
        return b ? ((a.start = b), trueVar) : falseVar;
    });
    exportSymbol("yt.www.watch.player.init", function () {
        Qn();
        od(Qn, 1e3);
    });
    exportSymbol("yt.www.watch.player.seekTo", yt_www_watch_player_seekTo);
    exportSymbol("openFull", function () {
        yt_window_popup("/watch_popup?v=" + yt_getConfig("VIDEO_ID"), {
            target: "FullScreenVideo",
            width: screen.availWidth,
            height: screen.availHeight,
            resizable: trueVar,
            fullscreen: trueVar
        });
    });

    var checkCurrentVideo = function (a, b, c) {
        var d = yt_getConfig("VIDEO_ID"),
            e = d == a,
            f = ej ? bj().Ba() : nullVar,
            b = !b || b == f;
        if (d && (!e || !b))
            ((d = nullVar),
                b && ((d = bj()), (e = Uh(d.b, [a])[0]), (d = e === undefinedVar ? "" : Xh(d.b, e))),
                d || (d = c ? c : Ue(window.location.href, { v: a, feature: nullVar })),
                d && yt_window_redirect(d));
    };
    exportSymbol("checkCurrentVideo", checkCurrentVideo);

    exportSymbol("trackAnnotationsEvent", function (a, b, c) {
        var d = yt_getConfig("ANALYTICS_ANNOTATIONS_TRACKER");
        window._gaq.push(function () {
            d._trackEvent(a, b, c);
        });
    });
    exportSymbol("reportFlashTiming", function () {});
    exportSymbol("reportTimingMaps", function (a, b) {
        for (var c in a) yt_timing.Bc(c, a[c]);
        for (var d in b) yt_timing.info(d, b[d]);
        yt_timing.maybeReport();
    });
    exportSymbol("yt.www.watch.playlists.editAnnotation", function () {
        y(_gel("watch-video-annotation-editable"), "not-editing", "editing");
        _gel("watch-video-annotation-textarea").focus();
        var a = _gel("watch-video-annotation-form");
        getDataAttr(a, "setup") ||
            (setDataAttr(a, "setup", "true"),
            (a = querySelectorHlp("cancel-button", a)),
            yt_events_listen(a, "click", function (a) {
                a.preventDefault();
                bo();
            }));
    });
    exportSymbol("yt.www.watch.playlists.removeAnnotation", function () {
        var a = _gel("watch-video-annotation-form");
        _gel("watch-video-annotation-textarea").value = "";
        co(a);
    });
    exportSymbol("yt.www.watch.playlists.submitForm", function (a) {
        co(a);
    });
    exportSymbol("yt.www.watch.abandonment.init", function (a, b) {
        Sn = a;
        Tn = b;
        var c = yt_getConfig("PLAYER_CONFIG"),
            c = new YtPlayerConfig(c);
        gf(function (a) {
            var e = yt_timing.timer || {};
            e.start &&
                a.isSupported(c.minVersion) &&
                ((Vn = e.start),
                xn ? Yn(mj()) : Bn.gc("READY_STATE_TOPIC", Yn),
                yt_events_listen(window, "beforeunload", ao),
                (a = oa() - Vn),
                (a = b - a),
                0 <= a && ((Un = yt_setTimeout($n, a)), Zn("attempt")));
            Rn = trueVar;
        });
    });
    exportSymbol("yt.history.enable", function (a, b) {
        var c = eg(b);
        c.setEnabled.call(c, trueVar, a);
    });
    exportSymbol("yt.history.disable", function () {
        var a = eg();
        a.setEnabled.call(a, falseVar);
    });
    exportSymbol("yt.www.lists.addto.toggleMenu", function (a, b, c) {
        var d = xh.getInstance(),
            e = yt_uix_getWidgetName(d),
            f = _gel("shared-addto-menu");
        b
            ? ((b = querySelectorHlp("addto-menu", f)),
              zh(d, a),
              (Nl = _removeclass(a, e)),
              Ml || (Ml = b.innerHTML),
              (d = getDataAttr(f, "video-ids")),
              (e = getDataAttr(a, "video-ids")),
              Ol && _addclass(f, "lightweight-panel"),
              _hasclass(a, "flip") && _addclass(f, "flip"),
              e &&
                  d != e &&
                  (setDataAttr(f, "video-ids", e),
                  (b.innerHTML = Ml),
                  (f = !!yt_getConfig("DISPLAY_FLINTSTONE_PROTOTYPE")),
                  isDefined(c) && (f = c),
                  new Pl(a, f)))
            : (Nl && _addclass(a, e), _removeclass(f, "flip"));
    });
    exportSymbol("yt.www.lists.data.addto.saveToWatchLater", function (a, b) {
        Ak(a, b, function (b, d) {
            var e = d.list_id || "",
                f = [a],
                g = yt_getMsg("PLAYLIST_BAR_ADDED_TO_PLAYLIST");
            gj("WL", e, f, g);
        });
    });
    exportSymbol("yt.www.lists.addtomenupebbles.toggleMenu", function (a, b) {
        if (b) {
            var c = _gel("shared-tags-menu");
            El || (El = c.innerHTML);
            var d = getDataAttr(a, "video-ids"),
                e = getDataAttr(c, "video-ids");
            d && e != d && ((c.innerHTML = El), setDataAttr(c, "video-ids", d), new Jl(c, d));
        }
    });
    exportSymbol("yt.www.lists.addtomenupebbles.init", function () {
        registerDelegatedHandler("addto-button-collapsed", "mouseover", Hl, 2, trueVar);
        registerDelegatedHandler("addto-button-expanded", "mouseout", Il, 2, trueVar);
    });
    exportSymbol("yt.www.watch.watch5.enableWide", lj);
    exportSymbol("yt.www.watch.watch5.handleResize", function () {
        yt_clearTimeout(jj);
        jj = yt_setTimeout(kj, 200);
    });
    exportSymbol("yt.www.watch.watch5.updatePlayerSize", kj);
    exportSymbol("yt.www.watch.watch5.handleLoadMoreRelated", function () {
        _hidediv("watch-more-related-button");
        _showdiv("watch-more-related", "watch-more-related-loading");
        ajaxRequest("/related_ajax", {
            g: { video_id: yt_getConfig("VIDEO_ID"), action_more_related_videos: 1 },
            f: function (a, b) {
                var c = _gel("watch-more-related");
                c.innerHTML = b.html;
                ti(c);
            }
        });
    });
    exportSymbol("yt.www.watch.watch5.handleYouTubeVJ", function () {
        _gel("youtube-vj-button").disabled = trueVar;
        ajaxRequest("/music_ajax", {
            g: { video_id: yt_getConfig("VIDEO_ID"), action_get_vj: 1 },
            f: function (a, b) {
                if (b.video_list.length) {
                    b.video_list.unshift(yt_getConfig("VIDEO_ID"));
                    var c = bj();
                    Lh([]);
                    Mh(b.video_list);
                    var d = new fi();
                    Mi(c, d);
                    d.F = 0;
                    c.Ua(trueVar);
                    Oi(c, trueVar);
                }
            }
        });
    });
    exportSymbol("yt.www.watch.watch5.handleToggleMoreFromUser", function (a) {
        var b = _gel("watch-mft-button");
        b && (A(b, "yt-uix-expander-collapsed", trueVar), A(b, "yt-uix-button-toggled", falseVar));
        (b = _gel("watch-more-from-topic")) && A(b, "collapsed", trueVar);
        var b = _hasclass(a, "yt-uix-expander-collapsed"),
            c = _gel("watch-more-from-user");
        !b &&
            "true" != getDataAttr(c, "loaded") &&
            ((a = {
                user_id: getDataAttr(a, "video-user-id"),
                video_id: getDataAttr(a, "video-id"),
                action_channel_videos: "1"
            }),
            ajaxRequest("/watch_ajax", {
                format: "XML",
                method: "GET",
                g: a,
                f: function (a, b) {
                    c.innerHTML = b.html_content;
                    setDataAttr(c, "loaded", "true");
                    ti(c);
                    var f = parseInt(
                        getDataAttr(_gel("watch-channel-discoverbox"), "slider-slide-selected"),
                        10
                    );
                    H("button", "yt-uix-slider-num", undefinedVar)[f].click();
                }
            }));
        A(c, "collapsed", b);
    });
    exportSymbol("yt.www.watch.watch5.handleToggleMoreFromTopic", function (a) {
        var b = _gel("watch-mfu-button");
        b && (A(b, "yt-uix-expander-collapsed", trueVar), A(b, "yt-uix-button-toggled", falseVar));
        (b = _gel("watch-more-from-user")) && A(b, "collapsed", trueVar);
        var b = _hasclass(a, "yt-uix-expander-collapsed"),
            c = _gel("watch-more-from-topic");
        !b &&
            "true" != getDataAttr(c, "loaded") &&
            ((a = { topic_id: getDataAttr(a, "topic-id"), action_topic_videos: "1" }),
            ajaxRequest("/watch_ajax", {
                format: "XML",
                method: "GET",
                g: a,
                f: function (a, b) {
                    c.innerHTML = b.html_content;
                    setDataAttr(c, "loaded", "true");
                    ti(c);
                    var f = parseInt(
                        getDataAttr(_gel("watch-channel-discoverbox"), "slider-slide-selected"),
                        10
                    );
                    H("button", "yt-uix-slider-num", undefinedVar)[f].click();
                }
            }));
        A(c, "collapsed", b);
    });
    exportSymbol("yt.www.watch.watch5.handleToggleDescription", function (a) {
        if (_hasclass(a, "yt-uix-expander-collapsed")) Xg("descriptionClosed", undefinedVar, undefinedVar);
        else {
            if ((a = _gel("watch-source-videos-list")) && "true" != getDataAttr(a, "loaded")) {
                setDataAttr(a, "loaded", "true");
                var b = yt_uri_appendQueryData("/watch_ajax", {
                    action_get_video_attributions_component: 1,
                    v: yt_getConfig("VIDEO_ID")
                });
                yt_net_ajax_sendRequest(b, { method: "GET", update: a });
            }
            Xg("descriptionOpened", undefinedVar, undefinedVar);
        }
    });
    exportSymbol("yt.www.watch.watch5.purchaseComplete", function () {
        _showdiv(_gel("watch-player-rental-play-button"));
        var a = _gel("watch-player-rental-still-frame");
        _hidediv(_gel("watch-player"));
        _showdiv(a);
    });
    exportSymbol("yt.www.watch.actions.init", function () {
        var a = Re(window.location.hash),
            b = a.action;
        if (b) {
            switch (b) {
                case "flag":
                    Al();
            }
            yt_setTimeout(function () {
                Bl("watch-actions-area-container").scrollIntoView();
            }, 0);
            delete a.action;
            a = yt_uri_buildQueryData(a) || "#!";
            window.location.hash = a;
        }
    });
    exportSymbol("yt.www.watch.actions.loadPlusoneLike", function (a, b, c, d, e) {
        new yj(_gel(a), b, c, d, e, { size: "standard", source: "google:youtube:watch_exp" });
    });
    exportSymbol("yt.www.watch.shortcuts.init", function () {
        yt_events_listen(document, "keypress", eo);
    });
    exportSymbol("yt.www.watch.actions.captions", function (a) {
        zl(a) &&
            (vl(),
            kl(function () {
                _hidediv("watch-actions-loading");
                tl("watch-actions-captions");
            }));
    });
    exportSymbol("yt.www.watch.actions.flag", Al);
    exportSymbol("yt.www.watch.actions.hide", function () {
        ul();
    });
    exportSymbol("yt.www.watch.actions.like", function (a) {
        zl(a) && yl(trueVar);
    });
    exportSymbol("yt.www.watch.actions.share", Cl);
    exportSymbol("yt.www.watch.actions.addto", function () {
        tl("watch-actions-addto");
        new Dk(_gel("watch-actions-addto"), yt_getConfig("VIDEO_ID"));
    });
    exportSymbol("yt.www.watch.actions.showSigninOrCreateChannelWarning", function (a) {
        zl(a) && tl("watch-actions-logged-out");
    });
    exportSymbol("yt.www.watch.actions.stats", function (a) {
        zl(a) &&
            (vl(),
            ajaxRequest("/insight_ajax", {
                format: "XML",
                method: "GET",
                g: { action_get_statistics_and_data: 1, v: yt_getConfig("VIDEO_ID") },
                f: function (a, c) {
                    wl(c.html_content);
                },
                B: xl
            }));
    });
    exportSymbol("yt.www.watch.actions.unlike", function (a) {
        zl(a) && yl(falseVar);
    });
    exportSymbol("yt.www.watch.watch5.showIE9WebMPromo", function (a) {
        var b = document.createElement("video");
        b.canPlayType && !b.canPlayType("video/webm") && _showdiv(a);
    });
    exportSymbol("yt.www.comments.init", function () {
        var a = _gel("comments-view");
        new lk(a);
        R(a, "click", wk, "comment-action");
    });
    exportSymbol("yt.www.comments.initForm", function (a, b) {
        var c = K(a, "form");
        isDataAttrSet(c, "initialized") || (setDataAttr(c, "initialized", "true"), (c = new hk(c, !b)), b && c.focus());
    });
    exportSymbol("yt.www.lists.init", function () {
        if (-1 < parseInt(yt_getConfig("PLAYLIST_BAR_PLAYING_INDEX"), 10)) {
            bj();
            var a = yt_getConfig("AUTOPLAY_DELAY");
            a && fj(a);
        }
        ej = trueVar;
    });
    exportSymbol("yt.www.lists.getState", function () {
        var a = cj();
        a.autoPlayMax = yt_getConfig("PLAY_ALL_MAX");
        return a;
    });
    exportSymbol("yt.www.lists.registerNearEndEventsWithPlayer", hj);
    exportSymbol("yt.www.lists.handleNearPlaybackEnd", function (a) {
        ej &&
            Ni(bj()) &&
            "NEAR_END" == a.slice(0, -1) &&
            ((a = parseInt(a.slice(-1), 10)), Yi(bj(), a));
    });
    exportSymbol("yt.www.lists.pebblesmigration.initPebblesMigration", function () {
        var a = _gel("flintstone-migration");
        R(a, "click", Zl, "library-wipe-btn");
        R(a, "click", Yl, "library-import-btn");
    });
    exportSymbol("yt.dom.datasets.get", getDataAttr);
    exportSymbol("yt.dom.datasets.set", setDataAttr);
    yt_registerGlobal(
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
    exportSymbol("yt.www.search.init", function () {
        R(_gel("search-footer-box"), "mouseover", function () {}, "yt-uix-pager-page-num");
    });
    exportSymbol("yt.www.search.legos.toggleExpandedRefinements", function () {
        Ee(_gel("search-lego-refinements"));
        return falseVar;
    });
    exportSymbol("yt.www.search.toggleToolbelt", function () {
        var a = _gel("toolbelt-top"),
            b = _gel("search-option-expander"),
            c = !_hasclass(b, "expanded");
        A(b, "expanded", c);
        c
            ? (_showdiv(a), (a.style.height = _gel("toolbelt-container").offsetHeight + "px"))
            : ((a.style.height = 0),
              yt_setTimeout(function () {
                  _hidediv(a);
              }, 300));
        return falseVar;
    });
    exportSymbol("yt.www.thumbnaildelayload.init", function (a) {
        ji = a || 0;
        ii = ni();
        mi = trueVar;
        ui(undefinedVar, undefinedVar);
        ri();
        yt_events_listen(window, "scroll", pi);
        yt_events_listen(window, "resize", pi);
    });
    exportSymbol("yt.www.xsrf.populateSessionToken", function () {
        for (var a = 0; a < document.forms.length; a++) {
            for (var b = falseVar, c = 0; c < To.length; c++) document.forms[a].name == To[c] && (b = trueVar);
            c = document.forms[a];
            if ("post" == c.method.toLowerCase() && b == falseVar) {
                for (var b = falseVar, d = 0; d < c.elements.length; d++)
                    c.elements[d].name == yt_getConfig("XSRF_FIELD_NAME") && (b = trueVar);
                b ||
                    ((b = undefinedVar),
                    (b = yt_getConfig("XSRF_TOKEN")),
                    (d = document.createElement("input")),
                    d.setAttribute("name", yt_getConfig("XSRF_FIELD_NAME")),
                    d.setAttribute("type", "hidden"),
                    d.setAttribute("value", b),
                    c.appendChild(d));
            }
        }
    });
    exportSymbol("yt.www.masthead.performSearch", function (a, b) {
        var c = _gel("masthead-search"),
            d = getDataAttr(b, a) || "";
        "rentals" == d
            ? ((c.rental.value = 1), (c.search_type.value = ""))
            : ((c.search_type.value = d), (c.rental.value = 0));
        if (c.search_query.value) c.submit();
        else {
            var c = b.innerHTML,
                e = _gel("search-btn"),
                f = e.innerHTML,
                g = getDataAttr(e, a) || "";
            e.innerHTML = c;
            setDataAttr(e, a, d);
            b.innerHTML = f;
            setDataAttr(b, a, g);
        }
        return falseVar;
    });
    exportSymbol("yt.www.masthead.loadPicker", function (a, b, c) {
        var d = _gel(a);
        d
            ? c
                ? _showdiv(d)
                : yt_style_toggle(d)
            : ((d = document.createElement("div")),
              (d.id = a),
              _hidediv(d),
              _gel("picker-container").appendChild(d),
              (c = "/masthead_ajax?action_get_" + a.replace("-", "_") + "=1"),
              b && (c = b + c),
              yt_net_ajax_sendRequest(c, {
                  method: "GET",
                  update: a,
                  onComplete: function () {
                      _hidediv("picker-loading");
                      _showdiv(a);
                      _gel(a).scrollIntoView();
                  }
              }),
              _showdiv("picker-loading"));
        _addclass(d, "yt-tile-static");
        Hm(a);
        _gel(a).scrollIntoView();
    });
    exportSymbol("yt.www.masthead.dismissGAPlusMessage", function () {
        var a = yt_net_cookies_get("FML", "").split(","),
            b = new Date(),
            b = Math.round(b.getTime() / 1e3),
            c = "",
            c = 2 != a.length ? "1," + b : parseInt(a[0], 10) + 1 + "," + b;
        yt_net_cookies_set("FML", c, 31536e4);
    });
    exportSymbol("yt.www.masthead.dismissPostLinkingMessage", function () {
        yt_net_cookies_remove("FML");
    });
    exportSymbol("yt.www.masthead.toggleExpandedMasthead", function () {
        var a = _gel("masthead-expanded");
        Ee(a);
        yt_style_setDisplayed("masthead-expanded-menu", trueVar);
        yt_style_setDisplayed("masthead-expanded-acct-sw-container", falseVar);
        $l || _removeclass(_gel("masthead-expanded-container"), "accountswitch");
        if (!getDataAttr(a, "loaded")) {
            var b = _gel("masthead-expanded-menu-gaia-photo");
            b && !b.src && (b.src = getDataAttr(b, "src"));
            ajaxRequest("/playlist_bar_ajax", {
                g: { action_get_playlists_masthead: 1, feature: "mhee", new_slider: 1 },
                format: "JSON",
                kb: trueVar,
                f: function (b, d) {
                    _gel("masthead-expanded-lists-container").innerHTML = d.html;
                    setDataAttr(a, "loaded", "true");
                }
            });
        }
    });
    exportSymbol("yt.www.masthead.accountswitch.init", function (a) {
        $l = a;
    });
    exportSymbol("yt.www.masthead.accountswitch.toggle", function () {
        Ee("masthead-expanded-acct-sw-container");
        var a = _gel("masthead-expanded-container"),
            b = _gel("masthead-expanded-acct-sw-container");
        if (yt_style_isDisplayed(b)) {
            b.style.top = a.offsetTop + "px";
            b = _gel("masthead-expanded-menu-acct-sw-list");
            b.offsetHeight < a.offsetHeight && (b.style.height = a.offsetHeight - 11 + "px");
            var c = _gel("masthead-expanded-acct-sw-iframe");
            if (!c) {
                var d = _gel("masthead-expanded-menu-acct-sw-list"),
                    c = sc("iframe", {
                        id: "masthead-expanded-acct-sw-iframe",
                        frameborder: 0,
                        src: 'javascript:""'
                    });
                d.parentNode && d.parentNode.insertBefore(c, d);
            }
            c.style.height = b.offsetHeight - 11 + "px";
            $l || _addclass(a, "accountswitch");
        } else $l || _removeclass(a, "accountswitch");
    });
    exportSymbol("yt.www.masthead.initSandbar", function (a, b) {
        window.___jsl = { h: yt_getConfig("GAPI_HINT_PARAMS") };
        km("iframes", {
            callback: function () {
                var c = _gel("sb-button-notify"),
                    d = _gel("sb-button-share"),
                    e = new Cm(a, b);
                yt_events_listen(c, "click", goog_bind(e.Ii, e));
                yt_events_listen(d, "click", goog_bind(e.Ji, e));
                yt_pubsub_publish("sandbar-init");
            }
        });
    });
    exportSymbol("yt.www.ads.MastheadAd", fk);
    fk.prototype.collapse_ad = fk.prototype.collapse;
    fk.prototype.expand_ad = fk.prototype.expand;
    exportSymbol("yt.www.home.ads.workaroundIE", function (a) {
        !yk &&
            xk &&
            ((yk = trueVar),
            yt_setTimeout(function () {
                a.focus();
            }, 0));
    });
    exportSymbol("yt.www.home.ads.workaroundLoad", function () {
        xk = trueVar;
    });
    exportSymbol("yt.www.home.ads.workaroundReset", function () {
        yk = falseVar;
    });
    exportSymbol("yt.www.home.ads.writeAdsContentToIframe", function (a, b) {
        var c = _gel(a).contentDocument || _gel(a).contentWindow.document;
        c.open();
        c.write("<!DOCTYPE html><html><head></head><body>" + b + "</body></html>");
        isIEBrowser || c.close();
    });
    exportSymbol("yt.www.home.ads.yvaCollapse", function () {
        var a = _gel("yva-bin");
        if (a) {
            var b = _gel("yva-bg");
            b && y(b, "yva-360-bg", "yva-250-bg");
            y(a, "yva-expanded", "yva-collapsed");
        }
    });
    exportSymbol("yt.www.home.ads.yvaExpand", function () {
        var a = _gel("yva-bin");
        a && y(a, "yva-collapsed", "yva-expanded");
    });
    exportSymbol("yt.tracking.doubleclick.trackActivity", function (a, b, c) {
        a =
            ("https:" == document.location.protocol ? "https://" : "http://") +
            "fls.doubleclick.net/activityi;src=" +
            uriSanitize(yt_getConfig("DBLCLK_ADVERTISER_ID")) +
            ";type=" +
            uriSanitize(a) +
            ";cat=" +
            uriSanitize(b);
        c && !c.ord && (a += ";ord=1");
        for (var d in c) a += ";" + uriSanitize(d) + "=" + uriSanitize(c[d]);
        a += ";num=" + oa();
        c = document.createElement("iframe");
        c.src = a;
        c.style.display = "none";
        document.body.appendChild(c);
    });
    exportSymbol("yt.tracking.track", function (a, b, c) {
        Xg(a, b, c);
    });
    exportSymbol("yt.tracking.resolution", function () {
        tracker_sendImageBeacon(
            "/mac_204?" +
                ("action_scr2=1&height=" +
                    screen.height +
                    "&width=" +
                    screen.width +
                    "&depth=" +
                    screen.colorDepth),
            undefinedVar
        );
    });
    exportSymbol("yt.tracking.share", yt_tracking_share);
    exportSymbol("yt.analytics.urchinTracker", function () {});
    exportSymbol("yt.analytics.trackEvent", yt_analytics_trackEvent);
    exportSymbol("yt.www.privacynotice.dismiss", function () {
        yt_net_cookies_set("prnfy", "-1", 5184e3);
        tracker_sendImageBeacon("/gen_204?typ=i&ct=pp_tos&cd=dismiss&source=yt", undefinedVar);
    });
    exportSymbol("yt.www.privacynotice.learnMore", function () {
        tracker_sendImageBeacon("/gen_204?typ=i&ct=pp_tos&cd=tellmore&source=yt", undefinedVar);
    });
    exportSymbol("yt.timing.report", yt_timing.report);
    exportSymbol("yt.timing.maybeReport", yt_timing.maybeReport);
    exportSymbol("yt.timing.handlePageLoad", yt_timing.handlePageLoad);
    exportSymbol("yt.timing.handleThumbnailLoad", yt_timing.handleThumbnailLoad);
    yt_pubsub_subscribe("init", yt_timing.handlePageLoad);
    isJscriptIE &&
        (!document.documentMode || 8 > document.documentMode) &&
        R(_gel("ie"), "click", nj, "video-thumb");
    exportSymbol("yt.www.subscriptions.edit.onUpdateSubscription", function (a, b, c, d) {
        var c = c || "",
            e = falseVar;
        (b = _gel("subscription_level_unsubscribe")) && b.checked && (e = trueVar);
        b = goog_dom_forms_getFormDataString(_gel("subscription_level_uploads" + c).form);
        yt_net_ajax_sendRequest("/ajax_subscriptions?" + b, {
            postBody: "session_token=" + a,
            onComplete: function (a) {
                _gel("subscribeMessage" + c).innerHTML = yt_net_ajax_getNodeValue(yt_net_ajax_getRootNode(a), "html_content");
                _hidediv("edit_subscription_wrapper" + c);
                _hidediv("edit_subscription_arrow" + c);
                _showdiv("subscribeMessage" + c);
                c &&
                    ((_gel("edit_subscription_opener" + c).style.visibility = ""),
                    yt_setTimeout(function () {
                        _hidediv("subscribeMessage" + c);
                    }, 5e3));
                if (e) {
                    var b = _gel("channel-body"),
                        a = H("div", "subscribe-div", b),
                        b = H("div", "unsubscribe-div", b);
                    Array_forEach(a, function (a) {
                        yt_style_toggle(a);
                    });
                    Array_forEach(b, function (a) {
                        yt_style_toggle(a);
                    });
                    d();
                }
            }
        });
    });
    exportSymbol("yt.www.subscriptions.edit.onCancelUpdateSubscription", function (a) {
        a = a || "";
        _hidediv("edit_subscription_wrapper" + a);
        _hidediv("edit_subscription_arrow" + a);
        a && (_gel("edit_subscription_opener" + a).style.visibility = "");
        _hidediv("alerts");
    });
    exportSymbol("yt.www.subscriptions.edit.onEditSubscriptionFromRecentActivity", function (a, b, c, d) {
        window["edit_subscription_download_" + c]
            ? (_hidediv("subscribeMessage" + c),
              yt_style_toggle("edit_subscription_wrapper" + c),
              yt_style_toggle("edit_subscription_arrow" + c),
              (a = _gel("edit_subscription_opener" + c)),
              (a.style.visibility = "visible" == a.style.visibility ? "" : "visible"))
            : ((window["edit_subscription_download_" + c] = trueVar),
              yt_net_ajax_sendRequest("/ajax_subscriptions?get_edit_subscription_form=" + b + "&i=" + c, {
                  postBody: "session_token=" + a,
                  onComplete: function (a) {
                      _gel("edit_subscription_opener" + c).style.visibility = "visible";
                      var b = document.createElement("div");
                      b.innerHTML = yt_net_ajax_getNodeValue(a.responseXML, "html_content");
                      d.parentNode.insertBefore(b, d);
                      _showdiv("edit_subscription_wrapper" + c);
                      _showdiv("edit_subscription_arrow" + c);
                  }
              }));
    });
    exportSymbol("yt.www.subscriptions.SubscriptionButton.init", function (a, b) {
        var c = kc("yt-subscription-button-js-default", a);
        Array_forEach(c, function (a) {
            getDataAttr(a, "subscription-initialized") ||
                (new jn(a, b), setDataAttr(a, "subscription-initialized", "true"));
        });
    });
    exportSymbol("yt.www.subscriptions.button.subscribe", function (a) {
        var b = Um(a),
            c = getDataAttr(b, "subscription-type"),
            d = getDataAttr(b, "subscription-xsrf") || "",
            e = getDataAttr(b, "subscription-menu-type"),
            f = getDataAttr(b, "subscription-channels-container"),
            g = getDataAttr(b, "subscription-feature"),
            j = getDataAttr(b, "subscription-value"),
            o = {};
        "playlist" == c
            ? ((o.action_create_subscription_to_playlist = 1), (c = "p"))
            : "blog" == c
              ? ((o.action_create_subscription_to_blog = 1), (c = "b"))
              : "topic" == c
                ? ((o.action_create_subscription_to_topic = 1), (c = "l"))
                : ((o.action_create_subscription_to_user = 1), (c = "u"));
        g && (o.feature = g);
        a.disabled = trueVar;
        Nm(d);
        d = new Lm(dn, hn);
        Mm(d, o);
        o = {};
        o[c] = j;
        o.menu_type = e;
        (e = yt_getConfig("PLAYBACK_ID")) && (o.plid = e);
        f && (o.show_channels = trueVar);
        d.gb = o || {};
        d.userData.eventTrigger = a;
        d.userData.subscription = b;
        Rm(d);
        Ck("subscribe");
    });
    exportSymbol("yt.www.subscriptions.button.subscribeToCollection", function (a) {
        for (
            var b = Zm(a),
                c = K(a, nullVar, "subscription-recommendations"),
                d = getDataAttr(b, "subscription-xsrf") || "",
                e = [],
                f = H("input", "username", c),
                g = 0;
            g < f.length;
            g++
        )
            f[g].checked && e.push(f[g].value);
        0 == e.length
            ? zc(c)
            : ((a.disabled = trueVar),
              Nm(d),
              (d = new Lm(en, hn)),
              Mm(d, { action_create_subscription_to_users: 1 }),
              (f = {}),
              (f.usernames = e.join(",")),
              (d.gb = f || {}),
              (d.userData.eventTrigger = a),
              (d.userData.subscription = b),
              (d.userData.collection = c),
              Rm(d));
    });
    exportSymbol("yt.www.subscriptions.button.unsubscribe", function (a) {
        var b = Zm(a),
            c = getDataAttr(b, "subscription-id"),
            d = getDataAttr(b, "subscription-xsrf") || "",
            e = getDataAttr(b, "subscription-feature");
        if (!a.disabled) {
            a.disabled = trueVar;
            Nm(d);
            var d = new Lm(fn, hn),
                f = { action_remove_subscription: 1 };
            e && (f.feature = e);
            Mm(d, f);
            e = {};
            e.subscription_id = c;
            (c = yt_getConfig("PLAYBACK_ID")) && (e.plid = c);
            d.gb = e || {};
            d.userData.eventTrigger = a;
            d.userData.subscription = b;
            Rm(d);
            Ck("unsubscribe");
        }
    });
    exportSymbol("yt.www.subscriptions.button.update", function (a) {
        var b = Zm(a),
            c = getDataAttr(b, "subscription-id"),
            d = getDataAttr(b, "subscription-xsrf") || "";
        a.disabled = trueVar;
        Nm(d);
        var d = new Lm(gn, hn),
            e = K(a, nullVar, "subscription-menu-form"),
            e = Vc(Yc(e));
        e.email_on_upload || (e.email_on_upload = falseVar);
        e.action_update_subscription_preferences = 1;
        Mm(d, e);
        d.gb = { subscription_id: c };
        d.userData.eventTrigger = a;
        d.userData.subscription = b;
        Rm(d);
    });
    exportSymbol("yt.www.subscriptions.button.toggleMenu", yt_www_subscriptions_button_toggleMenu);
    exportSymbol("yt.www.subscriptions.button.closeMenu", function (a) {
        a = Zm(a);
        "button" == getDataAttr(a, "subscription-menu-type") ? an(a) : bn(a);
    });
    yt_registerGlobal(
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
    exportSymbol("yt.www.masthead.extended.redirectWithNewParam", function (a, b) {
        var c, d, e;
        c = window.location.href;
        c = c.split("#");
        d = 2 == c.length ? "#" + c[1] : "";
        c = c[0];
        e = Qe(c);
        e[b] = a;
        e["persist_" + b] = "1";
        c = c.split("?");
        c = c[0];
        yt_window_redirect(c, e, d);
    });
    exportSymbol("yt.www.watch.stats.extended.setInsightOptOut", function (a) {
        a
            ? (_addclass(_gel("insight-private"), "selected"), _removeclass(_gel("insight-public"), "selected"))
            : (_addclass(_gel("insight-public"), "selected"), _removeclass(_gel("insight-private"), "selected"));
        var b = _gel("insight-optout-form");
        b &&
            ((a = yt_uri_appendQueryData(b.action, { opt_out: a })),
            (b = goog_dom_forms_getFormDataString(b)),
            yt_net_ajax_sendRequest(a, { postBody: b, onComplete: function () {} }));
        return falseVar;
    });
    exportSymbol("yt.www.watch.stats.extended.toggleReferrer", function (a) {
        yt_style_toggle(a);
        return falseVar;
    });
    exportSymbol("yt.www.watch.survey.takeWatchPageSurvey", function () {
        yt_www_watch_survey_watchPageSurveyGoAway();
        window
            .open(
                "/watch_page_survey?r2=" +
                    yt_getConfig("SURVEY_REFERER") +
                    "&r1=" +
                    yt_getConfig("SURVEY_SERVLET_NAME") +
                    "&name=" +
                    yt_getConfig("SURVEY_TYPE"),
                "YouTube_User_Happiness_Survey",
                "toolbar=no,width=800,height=768,status=no,resizable=yes,fullscreen=no,scrollbars=yes"
            )
            .focus();
    });
    exportSymbol("yt.www.watch.survey.watchPageSurveyGoAway", yt_www_watch_survey_watchPageSurveyGoAway);
    exportSymbol("yt.www.watch.survey.checkSurveyCompletedAndShow", function () {
        he(de.getInstance(), Hh.xf) || _showdiv("watch_page_survey");
    });
    exportSymbol("yt.www.watch.user.unblockUserLinkByUsername", function (a, b) {
        if (!confirm(yt_getMsg("UNBLOCK_USER"))) return falseVar;
        var c = { postBody: "unblock_user=0&" + yt_getConfig("BLOCK_USER_XSRF") + "&friend_username=" + a };
        b &&
            (c.onComplete = function () {
                window.location.reload();
            });
        yt_net_ajax_sendRequest("/link_servlet", c);
        return falseVar;
    });
    exportSymbol("yt.www.watch.user.blockUserLinkByUsername", function (a, b) {
        if (!confirm(yt_getMsg("BLOCK_USER"))) return falseVar;
        var c = { postBody: "block_user=1&" + yt_getConfig("BLOCK_USER_XSRF") + "&friend_username=" + a };
        b &&
            (c.onComplete = function () {
                window.location.reload();
            });
        yt_net_ajax_sendRequest("/link_servlet", c);
        return falseVar;
    });
    exportSymbol("yt.www.watch.user.unblockUserLinkByExternalId", function (a, b) {
        confirm(yt_getMsg("UNBLOCK_USER")) &&
            ajaxRequest("/link_ajax?action_unblock_user=1", {
                format: "XML",
                method: "POST",
                za: yt_getConfig("BLOCK_USER_AJAX_XSRF") + "&uid=" + a,
                f: function () {
                    b && window.location.reload();
                }
            });
    });
    exportSymbol("yt.www.watch.user.blockUserLinkByExternalId", function (a, b) {
        confirm(yt_getMsg("BLOCK_USER")) &&
            ajaxRequest("/link_ajax?action_block_user=1", {
                format: "XML",
                method: "POST",
                za: yt_getConfig("BLOCK_USER_AJAX_XSRF") + "&uid=" + a,
                f: function () {
                    b && window.location.reload();
                }
            });
    });
    exportSymbol("getNextVideoId", function (a) {
        var b = bj(),
            c = Ni(b),
            d = a <= yt_getConfig("PLAY_ALL_MAX");
        return c && d ? b.td(a) : "";
    });
    yt_registerGlobal("getNextVideoId");
})();
