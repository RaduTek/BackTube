(function () {
    var goog$global = this;
    function goog$getObjectByName(a) {
        for (var a = a.split("."), b = goog$global, c; (c = a.shift());) {
            if (b[c] != null) {
                b = b[c];
            } else {
                return null;
            }
        }
        return b;
    }
    function ba() {}
    function ca(a) {
        a.getInstance = function () {
            if (a.Eb) {
                return a.Eb;
            } else {
                return (a.Eb = new a());
            }
        };
    }
    function goog$typeOf(a) {
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
    }
    function goog$isDef(a) {
        return a !== undefined;
    }
    function goog$isArray(a) {
        return goog$typeOf(a) == "array";
    }
    function goog$isArrayLike(a) {
        var b = goog$typeOf(a);
        return b == "array" || (b == "object" && typeof a.length == "number");
    }
    function goog$isString(a) {
        return typeof a == "string";
    }
    function ha(a) {
        return goog$typeOf(a) == "function";
    }
    function goog$isObject(a) {
        var b = typeof a;
        return (b == "object" && a != null) || b == "function";
    }
    function goog$getUid(a) {
        return a[goog$UID_PROPERTY_] || (a[goog$UID_PROPERTY_] = ++goog$uidCounter_);
    }
    var goog$UID_PROPERTY_ = "closure_uid_" + Math.floor(Math.random() * 2147483648).toString(36);
    var goog$uidCounter_ = 0;
    function goog$bindNative_(a, b, c) {
        return a.call.apply(a.bind, arguments);
    }
    function goog$bindJs_(a, b, c) {
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
    }
    function goog$bind(a, b, c) {
        goog$bind =
            Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1
                ? goog$bindNative_
                : goog$bindJs_;
        return goog$bind.apply(null, arguments);
    }
    function goog$partial(a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function () {
            var b = Array.prototype.slice.call(arguments);
            b.unshift.apply(b, c);
            return a.apply(this, b);
        };
    }
    var goog$now =
        Date.now ||
        function () {
            return +new Date();
        };
    function y(a, b) {
        var c = b || {};
        var d;
        for (d in c) {
            var f = ("" + c[d]).replace(/\$/g, "$$$$");
            var a = a.replace(RegExp("\\{\\$" + d + "\\}", "gi"), f);
        }
        return a;
    }
    function goog$exportSymbol(a, b) {
        var c = a.split(".");
        var d = goog$global;
        if (!(c[0] in d) && d.execScript) {
            d.execScript("var " + c[0]);
        }
        for (var f; c.length && (f = c.shift());) {
            if (!c.length && goog$isDef(b)) {
                d[f] = b;
            } else {
                d = d[f] ? d[f] : (d[f] = {});
            }
        }
    }
    function A(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.B = b.prototype;
        a.prototype = new c();
        a.prototype.constructor = a;
    }
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
    function ra(a) {
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ra);
        } else {
            this.stack = Error().stack || "";
        }
        if (a) {
            this.message = String(a);
        }
    }
    A(ra, Error);
    ra.prototype.name = "CustomError";
    function goog$string$htmlEscape(a) {
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
    }
    var goog$string$amperRe_ = /&/g;
    var goog$string$ltRe_ = /</g;
    var goog$string$gtRe_ = />/g;
    var goog$string$quotRe_ = /\"/g;
    var goog$string$allRe_ = /[&<>\"]/;
    var goog$array$ARRAY_PROTOTYPE_ = Array.prototype;
    var goog$array$indexOf = goog$array$ARRAY_PROTOTYPE_.indexOf
        ? function (a, b, c) {
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
    var za = goog$array$ARRAY_PROTOTYPE_.forEach
        ? function (a, b, c) {
              goog$array$ARRAY_PROTOTYPE_.forEach.call(a, b, c);
          }
        : function (a, b, c) {
              for (var d = a.length, f = goog$isString(a) ? a.split("") : a, e = 0; e < d; e++) {
                  if (e in f) {
                      b.call(c, f[e], e, a);
                  }
              }
          };
    var goog$array$filter = goog$array$ARRAY_PROTOTYPE_.filter
        ? function (a, b, c) {
              return goog$array$ARRAY_PROTOTYPE_.filter.call(a, b, c);
          }
        : function (a, b, c) {
              for (var d = a.length, f = [], e = 0, g = goog$isString(a) ? a.split("") : a, h = 0; h < d; h++) {
                  if (h in g) {
                      var j = g[h];
                      if (b.call(c, j, h, a)) {
                          f[e++] = j;
                      }
                  }
              }
              return f;
          };
    var Ba = goog$array$ARRAY_PROTOTYPE_.some
        ? function (a, b, c) {
              return goog$array$ARRAY_PROTOTYPE_.some.call(a, b, c);
          }
        : function (a, b, c) {
              for (var d = a.length, f = goog$isString(a) ? a.split("") : a, e = 0; e < d; e++) {
                  if (e in f && b.call(c, f[e], e, a)) {
                      return true;
                  }
              }
              return false;
          };
    function goog$array$contains(a, b) {
        return goog$array$indexOf(a, b) >= 0;
    }
    function Da(a, b) {
        var c = goog$array$indexOf(a, b);
        if (c >= 0) {
            goog$array$ARRAY_PROTOTYPE_.splice.call(a, c, 1);
        }
    }
    function goog$array$concat(a) {
        return goog$array$ARRAY_PROTOTYPE_.concat.apply(goog$array$ARRAY_PROTOTYPE_, arguments);
    }
    function Fa(a) {
        var b = a.length;
        if (b > 0) {
            var c = Array(b);
            for (var d = 0; d < b; d++) {
                c[d] = a[d];
            }
            return c;
        }
        return [];
    }
    function goog$array$extend(a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            var f;
            if (goog$isArray(d) || ((f = goog$isArrayLike(d)) && d.hasOwnProperty("callee"))) {
                a.push.apply(a, d);
            } else if (f) {
                var e = a.length;
                for (var g = d.length, h = 0; h < g; h++) {
                    a[e + h] = d[h];
                }
            } else {
                a.push(d);
            }
        }
    }
    function Ha(a, b, c, d) {
        goog$array$ARRAY_PROTOTYPE_.splice.apply(a, goog$array$slice(arguments, 1));
    }
    function goog$array$slice(a, b, c) {
        if (arguments.length <= 2) {
            return goog$array$ARRAY_PROTOTYPE_.slice.call(a, b);
        } else {
            return goog$array$ARRAY_PROTOTYPE_.slice.call(a, b, c);
        }
    }
    function Ja(a, b) {
        var c = Ka || goog$array$defaultCompare;
        for (var d = 0, f = a.length, e; d < f;) {
            var g = (d + f) >> 1;
            var h;
            h = c(b, a[g]);
            if (h > 0) {
                d = g + 1;
            } else {
                f = g;
                e = !h;
            }
        }
        if (e) {
            return d;
        } else {
            return ~d;
        }
    }
    function goog$array$defaultCompare(a, b) {
        if (a > b) {
            return 1;
        } else if (a < b) {
            return -1;
        } else {
            return 0;
        }
    }
    function Ma(a) {
        var b = Na;
        var c = Ja(b, a);
        if (c < 0) {
            Ha(b, -(c + 1), 0, a);
            return true;
        } else {
            return false;
        }
    }
    function goog$math$Coordinate(a, b) {
        this.x = goog$isDef(a) ? a : 0;
        this.y = goog$isDef(b) ? b : 0;
    }
    goog$math$Coordinate.prototype.k = function () {
        return new goog$math$Coordinate(this.x, this.y);
    };
    function goog$math$Coordinate$difference(a, b) {
        return new goog$math$Coordinate(a.x - b.x, a.y - b.y);
    }
    function goog$math$Size(a, b) {
        this.width = a;
        this.height = b;
    }
    goog$math$Size.prototype.k = function () {
        return new goog$math$Size(this.width, this.height);
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
    function goog$object$forEach(a, b) {
        for (var c in a) {
            b.call(undefined, a[c], c, a);
        }
    }
    function Ra(a) {
        var b = [];
        var c = 0;
        var d;
        for (d in a) {
            b[c++] = a[d];
        }
        return b;
    }
    function goog$object$getKeys(a) {
        var b = [];
        var c = 0;
        var d;
        for (d in a) {
            b[c++] = d;
        }
        return b;
    }
    var goog$object$PROTOTYPE_FIELDS_ =
        "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
    function goog$object$extend(a, b) {
        var c;
        var d;
        for (var f = 1; f < arguments.length; f++) {
            d = arguments[f];
            for (c in d) {
                a[c] = d[c];
            }
            for (var e = 0; e < goog$object$PROTOTYPE_FIELDS_.length; e++) {
                c = goog$object$PROTOTYPE_FIELDS_[e];
                if (Object.prototype.hasOwnProperty.call(d, c)) {
                    a[c] = d[c];
                }
            }
        }
    }
    var Va;
    var goog$userAgent$detectedIe_;
    var goog$userAgent$detectedWebkit_;
    var Ya;
    var goog$userAgent$detectedGecko_;
    var goog$userAgent$detectedMac_;
    function goog$userAgent$getUserAgentString() {
        if (goog$global.navigator) {
            return goog$global.navigator.userAgent;
        } else {
            return null;
        }
    }
    function goog$userAgent$getNavigator() {
        return goog$global.navigator;
    }
    goog$userAgent$detectedGecko_ = Ya = goog$userAgent$detectedWebkit_ = goog$userAgent$detectedIe_ = Va = false;
    var cb;
    if ((cb = goog$userAgent$getUserAgentString())) {
        var db = goog$userAgent$getNavigator();
        Va = cb.indexOf("Opera") == 0;
        goog$userAgent$detectedIe_ = !Va && cb.indexOf("MSIE") != -1;
        Ya = (goog$userAgent$detectedWebkit_ = !Va && cb.indexOf("WebKit") != -1) && cb.indexOf("Mobile") != -1;
        goog$userAgent$detectedGecko_ = !Va && !goog$userAgent$detectedWebkit_ && db.product == "Gecko";
    }
    var eb = Va;
    var goog$userAgent$IE = goog$userAgent$detectedIe_;
    var goog$userAgent$GECKO = goog$userAgent$detectedGecko_;
    var goog$userAgent$WEBKIT = goog$userAgent$detectedWebkit_;
    var fb = Ya;
    var gb = goog$userAgent$getNavigator();
    goog$userAgent$detectedMac_ = ((gb && gb.platform) || "").indexOf("Mac") != -1;
    var goog$userAgent$detectedX11_ =
        !!goog$userAgent$getNavigator() && (goog$userAgent$getNavigator().appVersion || "").indexOf("X11") != -1;
    var ib;
    a: {
        var jb = "";
        var goog$userAgent$determineVersion_$re;
        if (eb && goog$global.opera) {
            var goog$userAgent$determineVersion_$operaVersion = goog$global.opera.version;
            var jb =
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
                var jb = goog$userAgent$determineVersion_$arr ? goog$userAgent$determineVersion_$arr[1] : "";
            }
        }
        if (goog$userAgent$IE) {
            var nb;
            var goog$userAgent$getDocumentMode_$doc = goog$global.document;
            nb = goog$userAgent$getDocumentMode_$doc ? goog$userAgent$getDocumentMode_$doc.documentMode : undefined;
            if (nb > parseFloat(jb)) {
                ib = String(nb);
                break a;
            }
        }
        ib = jb;
    }
    var pb = ib;
    var qb = {};
    function goog$userAgent$isVersion(a) {
        var b;
        if (!(b = qb[a])) {
            b = 0;
            var c = String(pb)
                .replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
                .split(".");
            var d = String(a)
                .replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
                .split(".");
            for (var f = Math.max(c.length, d.length), e = 0; b == 0 && e < f; e++) {
                var g = c[e] || "";
                var h = d[e] || "";
                var j = RegExp("(\\d*)(\\D*)", "g");
                var m = RegExp("(\\d*)(\\D*)", "g");
                do {
                    var p = j.exec(g) || ["", "", ""];
                    var q = m.exec(h) || ["", "", ""];
                    if (p[0].length == 0 && q[0].length == 0) {
                        break;
                    }
                    b =
                        ((p[1].length == 0 ? 0 : parseInt(p[1], 10)) < (q[1].length == 0 ? 0 : parseInt(q[1], 10))
                            ? -1
                            : (p[1].length == 0 ? 0 : parseInt(p[1], 10)) > (q[1].length == 0 ? 0 : parseInt(q[1], 10))
                              ? 1
                              : 0) ||
                        ((p[2].length == 0) < (q[2].length == 0)
                            ? -1
                            : (p[2].length == 0) > (q[2].length == 0)
                              ? 1
                              : 0) ||
                        (p[2] < q[2] ? -1 : p[2] > q[2] ? 1 : 0);
                } while (b == 0);
            }
            b = qb[a] = b >= 0;
        }
        return b;
    }
    var goog$userAgent$isDocumentModeCache_ = {};
    function goog$userAgent$isDocumentMode(a) {
        return (
            goog$userAgent$isDocumentModeCache_[a] ||
            (goog$userAgent$isDocumentModeCache_[a] =
                goog$userAgent$IE && !!document.documentMode && document.documentMode >= a)
        );
    }
    var goog$dom$defaultDomHelper_;
    var goog$dom$BrowserFeature$CAN_ADD_NAME_OR_TYPE_ATTRIBUTES =
        !goog$userAgent$IE || goog$userAgent$isDocumentMode(9);
    if ((!!goog$userAgent$GECKO || !!goog$userAgent$IE) && (!goog$userAgent$IE || !goog$userAgent$isDocumentMode(9))) {
        if (goog$userAgent$GECKO) {
            goog$userAgent$isVersion("1.9.1");
        }
    }
    if (goog$userAgent$IE) {
        goog$userAgent$isVersion("9");
    }
    function goog$dom$classes$get(a) {
        a = a.className;
        return (goog$isString(a) && a.match(/\S+/g)) || [];
    }
    function goog$dom$classes$add(a, b) {
        var c = goog$dom$classes$get(a);
        var d = goog$array$slice(arguments, 1);
        var f = c.length + d.length;
        goog$dom$classes$add_(c, d);
        a.className = c.join(" ");
        return c.length == f;
    }
    function goog$dom$classes$remove(a, b) {
        var c = goog$dom$classes$get(a);
        var d = goog$array$slice(arguments, 1);
        var c = goog$dom$classes$getDifference_(c, d);
        a.className = c.join(" ");
    }
    function goog$dom$classes$add_(a, b) {
        for (var c = 0; c < b.length; c++) {
            if (!goog$array$contains(a, b[c])) {
                a.push(b[c]);
            }
        }
    }
    function goog$dom$classes$getDifference_(a, b) {
        return goog$array$filter(a, function (a) {
            return !goog$array$contains(b, a);
        });
    }
    function goog$dom$classes$enable(a, b, c) {
        if (c) {
            goog$dom$classes$add(a, b);
        } else {
            goog$dom$classes$remove(a, b);
        }
    }
    function goog$dom$getDomHelper(a) {
        if (a) {
            return new goog$dom$DomHelper(goog$dom$getOwnerDocument(a));
        } else {
            return goog$dom$defaultDomHelper_ || (goog$dom$defaultDomHelper_ = new goog$dom$DomHelper());
        }
    }
    function goog$dom$getElement(a) {
        if (goog$isString(a)) {
            return document.getElementById(a);
        } else {
            return a;
        }
    }
    function Eb(a, b) {
        var c = b || document;
        if (c.querySelectorAll && c.querySelector) {
            c = c.querySelector("." + a);
        } else {
            c = b || document;
            c = (
                c.querySelectorAll && c.querySelector
                    ? c.querySelectorAll("." + a)
                    : c.getElementsByClassName
                      ? c.getElementsByClassName(a)
                      : Fb(a, b)
            )[0];
        }
        return c || null;
    }
    function Fb(a, b) {
        var c;
        var d;
        var f;
        var e;
        c = document;
        c = b || c;
        if (c.querySelectorAll && c.querySelector && a) {
            return c.querySelectorAll("" + (a ? "." + a : ""));
        }
        if (a && c.getElementsByClassName) {
            var g = c.getElementsByClassName(a);
            return g;
        }
        g = c.getElementsByTagName("*");
        if (a) {
            e = {};
            for (d = f = 0; (c = g[d]); d++) {
                var h = c.className;
                if (typeof h.split == "function" && goog$array$contains(h.split(/\s+/), a)) {
                    e[f++] = c;
                }
            }
            e.length = f;
            return e;
        }
        return g;
    }
    function goog$dom$setProperties(a, b) {
        goog$object$forEach(b, function (b, d) {
            if (d == "style") {
                a.style.cssText = b;
            } else if (d == "class") {
                a.className = b;
            } else if (d == "for") {
                a.htmlFor = b;
            } else if (d in Hb) {
                a.setAttribute(Hb[d], b);
            } else if (d.lastIndexOf("aria-", 0) == 0 || d.lastIndexOf("data-", 0) == 0) {
                a.setAttribute(d, b);
            } else {
                a[d] = b;
            }
        });
    }
    var Hb = {
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        colspan: "colSpan",
        frameborder: "frameBorder",
        height: "height",
        maxlength: "maxLength",
        role: "role",
        rowspan: "rowSpan",
        type: "type",
        usemap: "useMap",
        valign: "vAlign",
        width: "width"
    };
    function Ib(a) {
        a = a.document;
        a = a.compatMode == "CSS1Compat" ? a.documentElement : a.body;
        return new goog$math$Size(a.clientWidth, a.clientHeight);
    }
    function goog$dom$createDom(a, b, c) {
        return goog$dom$createDom_(document, arguments);
    }
    function goog$dom$createDom_(a, b) {
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
    }
    function goog$dom$append_(a, b, c, d) {
        function f(c) {
            if (c) {
                b.appendChild(goog$isString(c) ? a.createTextNode(c) : c);
            }
        }
        for (; d < c.length; d++) {
            var e = c[d];
            if (goog$isArrayLike(e) && (!goog$isObject(e) || !(e.nodeType > 0))) {
                var g = za;
                var h;
                a: {
                    if ((h = e) && typeof h.length == "number") {
                        if (goog$isObject(h)) {
                            h = typeof h.item == "function" || typeof h.item == "string";
                            break a;
                        }
                        if (ha(h)) {
                            h = typeof h.item == "function";
                            break a;
                        }
                    }
                    h = false;
                }
                g(h ? Fa(e) : e, f);
            } else {
                f(e);
            }
        }
    }
    function goog$dom$append(a, b) {
        goog$dom$append_(goog$dom$getOwnerDocument(a), a, arguments, 1);
    }
    function goog$dom$removeChildren(a) {
        for (var b; (b = a.firstChild);) {
            a.removeChild(b);
        }
    }
    function goog$dom$removeNode(a) {
        if (a && a.parentNode) {
            a.parentNode.removeChild(a);
        }
    }
    function goog$dom$contains(a, b) {
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
    }
    function goog$dom$getOwnerDocument(a) {
        if (a.nodeType == 9) {
            return a;
        } else {
            return a.ownerDocument || a.document;
        }
    }
    function Pb(a, b) {
        if (!b) {
            return null;
        } else {
            return Qb(a, function (a) {
                return !b || goog$array$contains(goog$dom$classes$get(a), b);
            });
        }
    }
    function Qb(a, b, c) {
        for (var d = c == null, f = 0; a && (d || f <= c);) {
            if (b(a)) {
                return a;
            }
            a = a.parentNode;
            f++;
        }
        return null;
    }
    function goog$dom$DomHelper(a) {
        this.a = a || goog$global.document || document;
    }
    goog$dom$DomHelper.prototype.o = function (a) {
        if (goog$isString(a)) {
            return this.a.getElementById(a);
        } else {
            return a;
        }
    };
    goog$dom$DomHelper.prototype.b = function (a, b, c) {
        return goog$dom$createDom_(this.a, arguments);
    };
    function goog$dom$DomHelper$isCss1CompatMode(a) {
        return a.a.compatMode == "CSS1Compat";
    }
    function Sb(a) {
        var b = a.a;
        var a = !goog$userAgent$WEBKIT && b.compatMode == "CSS1Compat" ? b.documentElement : b.body;
        var b = b.parentWindow || b.defaultView;
        return new goog$math$Coordinate(b.pageXOffset || a.scrollLeft, b.pageYOffset || a.scrollTop);
    }
    goog$dom$DomHelper.prototype.appendChild = function (a, b) {
        a.appendChild(b);
    };
    goog$dom$DomHelper.prototype.contains = goog$dom$contains;
    var goog$iter$StopIteration = "StopIteration" in goog$global ? goog$global.StopIteration : Error("StopIteration");
    function Ub() {}
    Ub.prototype.a = function () {
        throw goog$iter$StopIteration;
    };
    Ub.prototype.Wa = function () {
        return this;
    };
    function Vb(a) {
        if (typeof a.v == "function") {
            return a.v();
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
        return Ra(a);
    }
    function Wb(a, b) {
        this.b = {};
        this.a = [];
        var c = arguments.length;
        if (c > 1) {
            if (c % 2) {
                throw Error("Uneven number of arguments");
            }
            for (var d = 0; d < c; d += 2) {
                Xb(this, arguments[d], arguments[d + 1]);
            }
        } else if (a) {
            if (a instanceof Wb) {
                c = a.S();
                d = a.v();
            } else {
                c = goog$object$getKeys(a);
                d = Ra(a);
            }
            for (var f = 0; f < c.length; f++) {
                Xb(this, c[f], d[f]);
            }
        }
    }
    Wb.prototype.f = 0;
    Wb.prototype.va = 0;
    Wb.prototype.v = function () {
        goog$structs$Map$cleanupKeysArray_(this);
        var a = [];
        for (var b = 0; b < this.a.length; b++) {
            a.push(this.b[this.a[b]]);
        }
        return a;
    };
    Wb.prototype.S = function () {
        goog$structs$Map$cleanupKeysArray_(this);
        return this.a.concat();
    };
    function goog$structs$Map$cleanupKeysArray_(a) {
        if (a.f != a.a.length) {
            for (var b = 0, c = 0; b < a.a.length;) {
                var d = a.a[b];
                if (goog$structs$Map$hasKey_(a.b, d)) {
                    a.a[c++] = d;
                }
                b++;
            }
            a.a.length = c;
        }
        if (a.f != a.a.length) {
            var f = {};
            var c = (b = 0);
            for (; b < a.a.length;) {
                d = a.a[b];
                if (!goog$structs$Map$hasKey_(f, d)) {
                    a.a[c++] = d;
                    f[d] = 1;
                }
                b++;
            }
            a.a.length = c;
        }
    }
    function $b(a, b) {
        if (goog$structs$Map$hasKey_(a.b, b)) {
            return a.b[b];
        } else {
            return undefined;
        }
    }
    function Xb(a, b, c) {
        if (!goog$structs$Map$hasKey_(a.b, b)) {
            a.f++;
            a.a.push(b);
            a.va++;
        }
        a.b[b] = c;
    }
    Wb.prototype.k = function () {
        return new Wb(this);
    };
    Wb.prototype.Wa = function (a) {
        goog$structs$Map$cleanupKeysArray_(this);
        var b = 0;
        var c = this.a;
        var d = this.b;
        var f = this.va;
        var e = this;
        var g = new Ub();
        g.a = function () {
            while (true) {
                if (f != e.va) {
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
    function goog$structs$Map$hasKey_(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }
    var goog$uri$utils$splitRe_ = RegExp(
        "^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([\\w\\d\\-\\u0100-\\uffff.%]*)(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$"
    );
    function bc(a) {
        if (goog$uri$utils$needsPhishingProtection_) {
            goog$uri$utils$needsPhishingProtection_ = false;
            var b = goog$global.location;
            if (b) {
                var c = b.href;
                if (c && (c = (c = bc(c)[3] || null) && decodeURIComponent(c)) && c != b.hostname) {
                    goog$uri$utils$needsPhishingProtection_ = true;
                    throw Error();
                }
            }
        }
        return a.match(goog$uri$utils$splitRe_);
    }
    var goog$uri$utils$needsPhishingProtection_ = goog$userAgent$WEBKIT;
    function dc(a, b) {
        var c;
        if (a instanceof dc) {
            this.P = goog$isDef(b) ? b : a.P;
            ec(this, a.da);
            this.Aa = a.Aa;
            this.na = a.na;
            fc(this, a.ja);
            this.za = a.za;
            gc(this, a.a.k());
            this.ya = a.ya;
        } else if (a && (c = bc(String(a)))) {
            this.P = !!b;
            ec(this, c[1] || "", true);
            var d = c[2] || "";
            this.Aa = d ? decodeURIComponent(d) : "";
            this.na = (d = c[3] || "") ? decodeURIComponent(d) : "";
            fc(this, c[4]);
            this.za = (d = c[5] || "") ? decodeURIComponent(d) : "";
            gc(this, c[6] || "", true);
            this.ya = (c = c[7] || "") ? decodeURIComponent(c) : "";
        } else {
            this.P = !!b;
            this.a = new hc(null, 0, this.P);
        }
    }
    dc.prototype.da = "";
    dc.prototype.Aa = "";
    dc.prototype.na = "";
    dc.prototype.ja = null;
    dc.prototype.za = "";
    dc.prototype.ya = "";
    dc.prototype.P = false;
    dc.prototype.toString = function () {
        var a = [];
        var b = this.da;
        if (b) {
            a.push(ic(b, jc), ":");
        }
        if ((b = this.na)) {
            a.push("//");
            var c = this.Aa;
            if (c) {
                a.push(ic(c, jc), "@");
            }
            a.push(encodeURIComponent(String(b)));
            b = this.ja;
            if (b != null) {
                a.push(":", String(b));
            }
        }
        if ((b = this.za)) {
            if (this.na && b.charAt(0) != "/") {
                a.push("/");
            }
            a.push(ic(b, b.charAt(0) == "/" ? kc : lc));
        }
        if ((b = this.a.toString())) {
            a.push("?", b);
        }
        if ((b = this.ya)) {
            a.push("#", ic(b, mc));
        }
        return a.join("");
    };
    dc.prototype.k = function () {
        return new dc(this);
    };
    function ec(a, b, c) {
        a.da = c ? (b ? decodeURIComponent(b) : "") : b;
        if (a.da) {
            a.da = a.da.replace(/:$/, "");
        }
    }
    function fc(a, b) {
        if (b) {
            b = Number(b);
            if (isNaN(b) || b < 0) {
                throw Error("Bad port number " + b);
            }
            a.ja = b;
        } else {
            a.ja = null;
        }
    }
    function gc(a, b, c) {
        if (b instanceof hc) {
            a.a = b;
            b = a.a;
            if ((a = a.P) && !b.b) {
                nc(b);
                b.a = null;
                var d = b.i;
                var c = function (a, b) {
                    var c = b.toLowerCase();
                    if (b != c) {
                        oc(this, b);
                        pc(this, c, a);
                    }
                };
                if (typeof d.forEach == "function") {
                    d.forEach(c, b);
                } else if (goog$isArrayLike(d) || goog$isString(d)) {
                    za(d, c, b);
                } else {
                    var f;
                    if (typeof d.S == "function") {
                        f = d.S();
                    } else if (typeof d.v != "function") {
                        if (goog$isArrayLike(d) || goog$isString(d)) {
                            f = [];
                            for (var e = d.length, g = 0; g < e; g++) {
                                f.push(g);
                            }
                        } else {
                            f = goog$object$getKeys(d);
                        }
                    } else {
                        f = undefined;
                    }
                    d = Vb(d);
                    e = d.length;
                    for (g = 0; g < e; g++) {
                        c.call(b, d[g], f && f[g]);
                    }
                }
            }
            b.b = a;
        } else {
            if (!c) {
                b = ic(b, qc);
            }
            a.a = new hc(b, 0, a.P);
        }
    }
    function rc(a) {
        if (a instanceof dc) {
            return a.k();
        } else {
            return new dc(a, undefined);
        }
    }
    function ic(a, b) {
        if (goog$isString(a)) {
            return encodeURI(a).replace(b, sc);
        } else {
            return null;
        }
    }
    function sc(a) {
        a = a.charCodeAt(0);
        return "%" + ((a >> 4) & 15).toString(16) + (a & 15).toString(16);
    }
    var jc = /[#\/\?@]/g;
    var lc = /[\#\?:]/g;
    var kc = /[\#\?]/g;
    var qc = /[\#\?@]/g;
    var mc = /#/g;
    function hc(a, b, c) {
        this.a = a || null;
        this.b = !!c;
    }
    function nc(a) {
        if (!a.i && ((a.i = new Wb()), (a.f = 0), a.a)) {
            for (var b = a.a.split("&"), c = 0; c < b.length; c++) {
                var d = b[c].indexOf("=");
                var f = null;
                var e = null;
                if (d >= 0) {
                    f = b[c].substring(0, d);
                    e = b[c].substring(d + 1);
                } else {
                    f = b[c];
                }
                f = decodeURIComponent(f.replace(/\+/g, " "));
                f = tc(a, f);
                d = a;
                e = e ? decodeURIComponent(e.replace(/\+/g, " ")) : "";
                nc(d);
                d.a = null;
                var f = tc(d, f);
                var g = $b(d.i, f);
                if (!g) {
                    Xb(d.i, f, (g = []));
                }
                g.push(e);
                d.f++;
            }
        }
    }
    hc.prototype.i = null;
    hc.prototype.f = null;
    function oc(a, b) {
        nc(a);
        b = tc(a, b);
        if (goog$structs$Map$hasKey_(a.i.b, b)) {
            a.a = null;
            a.f -= $b(a.i, b).length;
            var c = a.i;
            if (goog$structs$Map$hasKey_(c.b, b)) {
                delete c.b[b];
                c.f--;
                c.va++;
                if (c.a.length > c.f * 2) {
                    goog$structs$Map$cleanupKeysArray_(c);
                }
            }
        }
    }
    function uc(a, b) {
        nc(a);
        b = tc(a, b);
        return goog$structs$Map$hasKey_(a.i.b, b);
    }
    hc.prototype.S = function () {
        nc(this);
        var a = this.i.v();
        for (var b = this.i.S(), c = [], d = 0; d < b.length; d++) {
            for (var f = a[d], e = 0; e < f.length; e++) {
                c.push(b[d]);
            }
        }
        return c;
    };
    hc.prototype.v = function (a) {
        nc(this);
        var b = [];
        if (a) {
            if (uc(this, a)) {
                b = goog$array$concat(b, $b(this.i, tc(this, a)));
            }
        } else {
            for (var a = this.i.v(), c = 0; c < a.length; c++) {
                b = goog$array$concat(b, a[c]);
            }
        }
        return b;
    };
    function vc(a, b) {
        var c = b ? a.v(b) : [];
        if (c.length > 0) {
            return String(c[0]);
        } else {
            return undefined;
        }
    }
    function pc(a, b, c) {
        oc(a, b);
        if (c.length > 0) {
            a.a = null;
            Xb(a.i, tc(a, b), Fa(c));
            a.f += c.length;
        }
    }
    hc.prototype.toString = function () {
        if (this.a) {
            return this.a;
        }
        if (!this.i) {
            return "";
        }
        var a = [];
        for (var b = this.i.S(), c = 0; c < b.length; c++) {
            for (var d = b[c], f = encodeURIComponent(String(d)), d = this.v(d), e = 0; e < d.length; e++) {
                var g = f;
                if (d[e] !== "") {
                    g += "=" + encodeURIComponent(String(d[e]));
                }
                a.push(g);
            }
        }
        return (this.a = a.join("&"));
    };
    hc.prototype.k = function () {
        var a = new hc();
        a.a = this.a;
        if (this.i) {
            a.i = this.i.k();
        }
        return a;
    };
    function tc(a, b) {
        var c = String(b);
        if (a.b) {
            c = c.toLowerCase();
        }
        return c;
    } /*
    Portions of this code are from MochiKit, received by
    The Closure Authors under the MIT license. All other code is Copyright
    2005-2009 The Closure Authors. All Rights Reserved.
    */
    function wc(a, b) {
        this.a = [];
        this.j = b || null;
    }
    wc.prototype.Y = false;
    wc.prototype.ka = false;
    wc.prototype.la = 0;
    wc.prototype.Db = false;
    wc.prototype.Hb = false;
    wc.prototype.Gb = 0;
    wc.prototype.ob = function (a, b) {
        xc(this, a, b);
        this.la--;
        if (this.la == 0 && this.Y) {
            yc(this);
        }
    };
    function xc(a, b, c) {
        a.Y = true;
        a.b = c;
        a.ka = !b;
        yc(a);
    }
    function zc(a) {
        if (a.Y) {
            if (!a.Db) {
                throw new Ac();
            }
            a.Db = false;
        }
    }
    function Bc(a) {
        return Ba(a.a, function (a) {
            return ha(a[1]);
        });
    }
    function yc(a) {
        if (a.d && a.Y && Bc(a)) {
            goog$global.clearTimeout(a.d);
            delete a.d;
        }
        if (a.e) {
            a.e.Gb--;
            delete a.e;
        }
        var b = a.b;
        var c = false;
        for (var d = false; a.a.length && a.la == 0;) {
            var f = a.a.shift();
            var e = f[0];
            var g = f[1];
            var f = f[2];
            if ((e = a.ka ? g : e)) {
                try {
                    var h = e.call(f || a.j, b);
                    if (goog$isDef(h)) {
                        a.ka = a.ka && (h == b || h instanceof Error);
                        a.b = b = h;
                    }
                    if (b instanceof wc) {
                        d = true;
                        a.la++;
                    }
                } catch (j) {
                    b = j;
                    a.ka = true;
                    if (!Bc(a)) {
                        c = true;
                    }
                }
            }
        }
        a.b = b;
        if (d && a.la) {
            d = b;
            h = goog$bind(a.ob, a, true);
            e = goog$bind(a.ob, a, false);
            d.a.push([h, e, undefined]);
            if (d.Y) {
                yc(d);
            }
            b.Hb = true;
        }
        if (c) {
            a.d = goog$global.setTimeout(function () {
                throw b;
            }, 0);
        }
    }
    function Ac() {
        ra.call(this);
    }
    A(Ac, ra);
    Ac.prototype.message = "Deferred has already fired";
    Ac.prototype.name = "AlreadyCalledError";
    function Cc(a, b, c) {
        if (c != null) {
            goog$global.clearTimeout(c);
        }
        a.onload = ba;
        a.onerror = ba;
        a.onreadystatechange = ba;
        if (b) {
            window.setTimeout(function () {
                goog$dom$removeNode(a);
            }, 0);
        }
    }
    function Dc(a, b) {
        var c = "Jsloader error (code #" + a + ")";
        if (b) {
            c += ": " + b;
        }
        ra.call(this, c);
    }
    A(Dc, ra);
    function Ec(a) {
        this.a = new dc(a);
        this.T = 5000;
    }
    var Fc = 0;
    function Gc(a, b, c, d) {
        var f = b || null;
        var e = "_" + (Fc++).toString(36) + goog$now().toString(36);
        if (!goog$global._callbacks_) {
            goog$global._callbacks_ = {};
        }
        b = a.a.k();
        if (f) {
            for (var g in f) {
                if (!f.hasOwnProperty || f.hasOwnProperty(g)) {
                    var h = b;
                    var j = g;
                    var m = f[g];
                    if (!goog$isArray(m)) {
                        m = [String(m)];
                    }
                    pc(h.a, j, m);
                }
            }
        }
        if (c) {
            goog$global._callbacks_[e] = function (a) {
                Hc(e, true);
                c.apply(undefined, arguments);
            };
            g = "_callbacks_." + e;
            if (!goog$isArray(g)) {
                g = [String(g)];
            }
            pc(b.a, "callback", g);
        }
        var p = b.toString();
        var q = {
            timeout: a.T,
            Lb: true
        };
        var a = q.document || document;
        var v = document.createElement("SCRIPT");
        var b = {
            a: v,
            T: undefined
        };
        var t = new wc(0, b);
        var I = null;
        g = q.timeout != null ? q.timeout : 5000;
        if (g > 0) {
            I = window.setTimeout(function () {
                Cc(v, true);
                var a = new Dc(1, "Timeout reached for loading script " + p);
                zc(t);
                xc(t, false, a);
            }, g);
            b.T = I;
        }
        v.onload = v.onreadystatechange = function () {
            if (!v.readyState || v.readyState == "loaded" || v.readyState == "complete") {
                Cc(v, q.Lb || false, I);
                zc(t);
                xc(t, true, null);
            }
        };
        v.onerror = function () {
            Cc(v, true, I);
            var a = new Dc(0, "Error while loading script " + p);
            zc(t);
            xc(t, false, a);
        };
        goog$dom$setProperties(v, {
            type: "text/javascript",
            charset: "UTF-8",
            src: p
        });
        b = a.getElementsByTagName("HEAD");
        (!b || b.length == 0 ? a.documentElement : b[0]).appendChild(v);
        t.a.push([
            null,
            function () {
                Hc(e, false);
                if (d) {
                    d(f);
                }
            },
            undefined
        ]);
        if (t.Y) {
            yc(t);
        }
    }
    function Hc(a, b) {
        if (goog$global._callbacks_[a]) {
            if (b) {
                delete goog$global._callbacks_[a];
            } else {
                goog$global._callbacks_[a] = ba;
            }
        }
    }
    new (function () {
        goog$now();
    })();
    function Ic(a) {
        this.a = new Wb();
        if (a) {
            var a = Vb(a);
            for (var b = a.length, c = 0; c < b; c++) {
                var d = a[c];
                Xb(this.a, Jc(d), d);
            }
        }
    }
    function Jc(a) {
        var b = typeof a;
        if ((b == "object" && a) || b == "function") {
            return "o" + goog$getUid(a);
        } else {
            return b.substr(0, 1) + a;
        }
    }
    Ic.prototype.contains = function (a) {
        a = Jc(a);
        return goog$structs$Map$hasKey_(this.a.b, a);
    };
    Ic.prototype.v = function () {
        return this.a.v();
    };
    Ic.prototype.k = function () {
        return new Ic(this);
    };
    Ic.prototype.Wa = function () {
        return this.a.Wa(false);
    };
    function goog$debug$getStacktrace(a) {
        return goog$debug$getStacktraceHelper_(a || arguments.callee.caller, []);
    }
    function goog$debug$getStacktraceHelper_(a, b) {
        var c = [];
        if (goog$array$contains(b, a)) {
            c.push("[...circular reference...]");
        } else if (a && b.length < 50) {
            c.push(Mc(a) + "(");
            for (var d = a.arguments, f = 0; f < d.length; f++) {
                if (f > 0) {
                    c.push(", ");
                }
                var e;
                e = d[f];
                switch (typeof e) {
                    case "object":
                        e = e ? "object" : "null";
                        break;
                    case "string":
                        break;
                    case "number":
                        e = String(e);
                        break;
                    case "boolean":
                        e = e ? "true" : "false";
                        break;
                    case "function":
                        e = (e = Mc(e)) ? e : "[fn]";
                        break;
                    default:
                        e = typeof e;
                }
                if (e.length > 40) {
                    e = e.substr(0, 40) + "...";
                }
                c.push(e);
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
    }
    function Mc(a) {
        if (Nc[a]) {
            return Nc[a];
        }
        a = String(a);
        if (!Nc[a]) {
            var b = /function ([^\(]+)/.exec(a);
            Nc[a] = b ? b[1] : "[Anonymous]";
        }
        return Nc[a];
    }
    var Nc = {};
    function Oc(a, b, c, d, f) {
        if (typeof f != "number") {
            Pc++;
        }
        if (!d) {
            goog$now();
        }
        this.d = b;
        delete this.b;
        delete this.a;
    }
    Oc.prototype.b = null;
    Oc.prototype.a = null;
    var Pc = 0;
    function Qc() {}
    Qc.prototype.b = null;
    Qc.prototype.a = null;
    Qc.prototype.d = null;
    function goog$debug$Logger$Level(a, b) {
        this.name = a;
        this.value = b;
    }
    goog$debug$Logger$Level.prototype.toString = function () {
        return this.name;
    };
    var goog$debug$Logger$Level$SEVERE = new goog$debug$Logger$Level("SEVERE", 1000);
    var goog$debug$Logger$Level$INFO = new goog$debug$Logger$Level("INFO", 800);
    var goog$debug$Logger$Level$CONFIG = new goog$debug$Logger$Level("CONFIG", 700);
    function Vc(a) {
        if (a.a) {
            return a.a;
        } else if (a.b) {
            return Vc(a.b);
        } else {
            return null;
        }
    }
    Qc.prototype.log = function (a, b, c) {
        if (a.value >= Vc(this).value) {
            a = "log:" + this.e(a, b, c).d;
            if (goog$global.console) {
                if (goog$global.console.timeStamp) {
                    goog$global.console.timeStamp(a);
                } else if (goog$global.console.markTimeline) {
                    goog$global.console.markTimeline(a);
                }
            }
            if (goog$global.msWriteProfilerMark) {
                goog$global.msWriteProfilerMark(a);
            }
            for (a = this; a;) {
                a = a.b;
            }
        }
    };
    Qc.prototype.e = function (a, b, c) {
        var d = new Oc(0, String(b));
        if (c) {
            d.b = c;
            var f;
            var e = arguments.callee.caller;
            try {
                var g;
                var h = goog$getObjectByName("window.location.href");
                if (goog$isString(c)) {
                    g = {
                        message: c,
                        name: "Unknown error",
                        lineNumber: "Not available",
                        fileName: h,
                        stack: "Not available"
                    };
                } else {
                    var j;
                    var m;
                    var p = false;
                    try {
                        j = c.lineNumber || c.Lc || "Not available";
                    } catch (q) {
                        j = "Not available";
                        p = true;
                    }
                    try {
                        m = c.fileName || c.filename || c.sourceURL || h;
                    } catch (v) {
                        m = "Not available";
                        p = true;
                    }
                    g =
                        p || !c.lineNumber || !c.fileName || !c.stack
                            ? {
                                  message: c.message,
                                  name: c.name,
                                  lineNumber: j,
                                  fileName: m,
                                  stack: c.stack || "Not available"
                              }
                            : c;
                }
                f =
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
                    goog$string$htmlEscape(goog$debug$getStacktrace(e) + "-> ");
            } catch (t) {
                f = "Exception trying to expose exception! You win, we lose. " + t;
            }
            d.a = f;
        }
        return d;
    };
    function K(a, b) {
        Wc.log(goog$debug$Logger$Level$SEVERE, a, b);
    }
    function Xc(a) {
        Wc.log(goog$debug$Logger$Level$INFO, a, undefined);
    }
    var Yc = {};
    var Zc = null;
    function $c(a) {
        if (!Zc) {
            Zc = new Qc();
            Yc[""] = Zc;
            Zc.a = goog$debug$Logger$Level$CONFIG;
        }
        var b;
        if (!(b = Yc[a])) {
            b = new Qc();
            var c = a.lastIndexOf(".");
            var d = a.substr(c + 1);
            var c = $c(a.substr(0, c));
            if (!c.d) {
                c.d = {};
            }
            c.d[d] = b;
            b.b = c;
            Yc[a] = b;
        }
        return b;
    }
    var Wc = $c("help");
    Wc.a = goog$debug$Logger$Level$INFO;
    function ad(a, b) {
        if (!b) {
            a = a.answer;
        }
        var c = a.answer;
        if (c) {
            this.answerContent = c;
        }
        if ((c = a.answer_id)) {
            try {
                this.answerId = parseInt(c, 10);
            } catch (d) {
                K("Invalid answer id " + c, d);
            }
        }
        if ((c = a.guidedhelp)) {
            this.guidedHelp = c;
        }
        if ((c = a.inproduct)) {
            this.inproduct = c;
        }
        if ((c = a.inproduct_target)) {
            this.inproductTarget = c;
        }
        if ((c = a.name)) {
            this.name = c;
        }
        if ((c = a.question)) {
            this.question = c;
        }
        if ((c = a.tooltip)) {
            this.tooltip = c;
        }
    }
    function bd(a) {
        if (a.question) {
            return a.question;
        } else if (a.name) {
            return a.name;
        } else {
            return null;
        }
    }
    function cd(a, b) {
        if (b == null) {
            window.open(
                a,
                "help_panel_popup",
                "width=800,height=600,toolbar=1,scrollbars=1,location=0,statusbar=1,menubar=0,resizable=1"
            );
        } else if (b == "") {
            window.open(a, "help_panel_popup");
        } else {
            window.open(a, "help_panel_popup", b);
        }
    }
    function dd(a) {
        return goog$bind(function (b) {
            if (b.type == "click") {
                var c = b.target;
                if (c && c.tagName && c.tagName.toLowerCase() == "a") {
                    b.stopPropagation();
                    b.preventDefault();
                    b = new dc(c.getAttribute("href"));
                    if (a && !vc(b.a, "hl")) {
                        var c = b.a;
                        var d = "hl";
                        nc(c);
                        c.a = null;
                        d = tc(c, d);
                        if (uc(c, d)) {
                            c.f -= $b(c.i, d).length;
                        }
                        Xb(c.i, d, [a]);
                        c.f++;
                    }
                    cd(b.toString());
                }
            }
        }, null);
    }
    function ed(a, b, c) {
        if (b && b.length > 0) {
            if (!c) {
                a.push("&");
            }
            a.push("aattrs=");
            for (c = 0; c < b.length; ++c) {
                a.push(b[c]);
                a.push("|");
            }
        }
    }
    function fd(a, b, c) {
        if (b) {
            if (!c) {
                a.push("&");
            }
            a.push("hl=");
            a.push(b);
            return true;
        } else {
            return false;
        }
    }
    function gd(a, b) {
        var c = [];
        c.push(a);
        c.push(b);
        return c.join("");
    }
    function hd(a, b, c, d, f) {
        var d = d || "";
        var e = d.lastIndexOf("#", 0) == 0;
        var g = [];
        g.push(gd(a, b));
        if (d && !e) {
            g.push(d);
        }
        if (!(a = d.indexOf("?") != -1)) {
            g.push("?");
        }
        a = fd(g, c, !a) || a;
        if (f) {
            if (a) {
                g.push("&");
            }
            g.push("usrctx=");
            g.push(f);
        }
        if (e) {
            g.push(d);
        }
        return g.join("");
    }
    function id(a, b, c) {
        var d = [];
        d.push(gd(a, b));
        d.push("/api/metrics?");
        fd(d, c, true);
        return d.join("");
    }
    function hcm$MetricsData(a, b) {
        this.b = a;
        this.a = b;
    }
    var jd = true;
    function hcm$recordMetrics(a, b) {
        var c = [];
        c.push("[");
        for (var d = 0; d < b.length; ++d) {
            var f = b[d];
            c.push("{actiontype:");
            c.push(f.b);
            if (f.a != null) {
                c.push(',actionvalue:"');
                c.push(f.a);
                c.push('"');
            }
            c.push("},");
        }
        c.push("]");
        c = c.join("");
        d = [];
        if (jd) {
            Gc(new Ec(a), {
                mtrcs: c
            });
            d.push("Sent");
        } else {
            d.push("Metrics recording is turned off - would have sent");
        }
        d.push(" mtrcs to ");
        d.push(a);
        d.push(": ");
        d.push(c);
        Xc(d.join(""));
        return c;
    }
    goog$exportSymbol("hcm.MetricsData", hcm$MetricsData);
    goog$exportSymbol("hcm.setRecordMetricsEnabled", function (a) {
        jd = a;
    });
    goog$exportSymbol("hcm.getMetricsUrl", function (a, b, c) {
        return id(a, b, c);
    });
    goog$exportSymbol("hcm.recordMetrics", hcm$recordMetrics);
    goog$exportSymbol("hcm.trackConversion", function (a, b, c) {
        var d = [];
        if (c) {
            d.push(c.toString());
            d.push(" | ");
        }
        d.push(b);
        b = [];
        b.push(new hcm$MetricsData("IP_CONVERSION_TRACKING", d.join("")));
        return hcm$recordMetrics(a, b);
    });
    function ld() {}
    function md(a, b, c, d) {
        if (c.length) {
            if (d) {
                return function (b) {
                    var d = this.a[c[0]];
                    if (d) {
                        return d[a].apply(this.a[c[0]], arguments);
                    } else {
                        return this.C[c[0]].prototype[a].apply(this, arguments);
                    }
                };
            } else if (b[a].Ob) {
                return function (b) {
                    var d;
                    a: {
                        d = Array.prototype.slice.call(arguments, 0);
                        for (var g = 0; g < c.length; ++g) {
                            var h = this.a[c[g]];
                            if ((h = h ? h[a].apply(h, d) : this.C[c[g]].prototype[a].apply(this, d))) {
                                d = h;
                                break a;
                            }
                        }
                        d = false;
                    }
                    return d;
                };
            } else if (b[a].Nb) {
                return function (b) {
                    var d;
                    a: {
                        d = Array.prototype.slice.call(arguments, 0);
                        for (var g = 0; g < c.length; ++g) {
                            var h = this.a[c[g]];
                            var h = h ? h[a].apply(h, d) : this.C[c[g]].prototype[a].apply(this, d);
                            if (h != null) {
                                d = h;
                                break a;
                            }
                        }
                        d = undefined;
                    }
                    return d;
                };
            } else if (b[a].Pb) {
                return function (b) {
                    var d = Array.prototype.slice.call(arguments, 0);
                    for (var g = 0; g < c.length; ++g) {
                        var h = this.a[c[g]];
                        if (h) {
                            h[a].apply(h, d);
                        } else {
                            this.C[c[g]].prototype[a].apply(this, d);
                        }
                    }
                };
            } else {
                return function (b) {
                    var d = Array.prototype.slice.call(arguments, 0);
                    var g = [];
                    for (var h = 0; h < c.length; ++h) {
                        var j = this.a[c[h]];
                        g.push(j ? j[a].apply(j, d) : this.C[c[h]].prototype[a].apply(this, d));
                    }
                    return g;
                };
            }
        } else if (!d && !b[a].Ob && !b[a].Nb && !b[a].Pb) {
            return nd;
        } else {
            return null;
        }
    }
    function nd() {
        return [];
    }
    ld.prototype.b = function (a) {
        if (this.a) {
            for (var b = 0; b < this.a.length; ++b) {
                if (this.a[b] instanceof a) {
                    return this.a[b];
                }
            }
        }
        return null;
    };
    function od(a) {
        return this.La.b(a);
    }
    function goog$net$Cookies(a) {
        this.a = a;
    }
    var goog$net$Cookies$SPLIT_RE_ = /\s*;\s*/;
    function rd() {
        var a = goog$net$cookies;
        var b = td;
        var c = ud;
        var d = 0;
        if (/[;=\s]/.test("GuidedHelpResume")) {
            throw Error('Invalid cookie name "GuidedHelpResume"');
        }
        if (/[;\r\n]/.test("")) {
            throw Error('Invalid cookie value ""');
        }
        if (!goog$isDef(d)) {
            d = -1;
        }
        c = c ? ";domain=" + c : "";
        b = b ? ";path=" + b : "";
        d =
            d < 0
                ? ""
                : d == 0
                  ? ";expires=" + new Date(1970, 1, 1).toUTCString()
                  : ";expires=" + new Date(goog$now() + d * 1000).toUTCString();
        a.a.cookie = "GuidedHelpResume=" + c + b + d + "";
    }
    function vd(a, b, c) {
        var d = b + "=";
        for (var a = (a.a.cookie || "").split(goog$net$Cookies$SPLIT_RE_), f = 0, e; (e = a[f]); f++) {
            if (e.indexOf(d) == 0) {
                return e.substr(d.length);
            }
            if (e == b) {
                return "";
            }
        }
        return c;
    }
    goog$net$Cookies.prototype.S = function () {
        return goog$net$Cookies$getKeyValues_(this).keys;
    };
    goog$net$Cookies.prototype.v = function () {
        return goog$net$Cookies$getKeyValues_(this).Qb;
    };
    function goog$net$Cookies$getKeyValues_(a) {
        for (
            var a = (a.a.cookie || "").split(goog$net$Cookies$SPLIT_RE_), b = [], c = [], d, f, e = 0;
            (f = a[e]);
            e++
        ) {
            d = f.indexOf("=");
            if (d == -1) {
                b.push("");
                c.push(f);
            } else {
                b.push(f.substring(0, d));
                c.push(f.substring(d + 1));
            }
        }
        return {
            keys: b,
            Qb: c
        };
    }
    var goog$net$cookies = new goog$net$Cookies(document);
    goog$net$cookies.b = 3950;
    function xd() {}
    A(xd, ld);
    xd.prototype.d = function (a) {
        return a;
    };
    var yd = xd.prototype.d;
    (yd ? yd : function () {}).mb = true;
    xd.prototype.e = function () {
        return true;
    };
    var zd = xd.prototype.e;
    (zd ? zd : function () {}).mb = true;
    function Ad() {}
    Ad.prototype.toString = function () {
        return this.a.toString();
    };
    function Bd(a) {
        var b = a;
        var a = [];
        if (!b) {
            b = [];
        }
        this.a = b;
        if (a) {
            for (b = 0; b < a.length; b++) {
                this.a[a[b]] = this.a[a[b]] || [];
            }
        }
    }
    A(Bd, Ad);
    function Cd() {}
    function Dd(a, b) {
        this.type = a;
        this.currentTarget = this.target = b;
    }
    Dd.prototype.a = false;
    Dd.prototype.b = true;
    Dd.prototype.stopPropagation = function () {
        this.a = true;
    };
    Dd.prototype.preventDefault = function () {
        this.b = false;
    };
    function Ed(a) {
        Ed[" "](a);
        return a;
    }
    Ed[" "] = ba;
    if (goog$userAgent$IE) {
        goog$userAgent$isDocumentMode(9);
    }
    var Fd = !goog$userAgent$IE || goog$userAgent$isDocumentMode(9);
    var Gd = goog$userAgent$IE && !goog$userAgent$isVersion("8");
    if (goog$userAgent$WEBKIT) {
        goog$userAgent$isVersion("528");
    }
    if (
        (!goog$userAgent$GECKO || !goog$userAgent$isVersion("1.9b")) &&
        (!goog$userAgent$IE || !goog$userAgent$isVersion("8")) &&
        (!eb || !goog$userAgent$isVersion("9.5"))
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
    function Hd(a, b) {
        if (a) {
            this.init(a, b);
        }
    }
    A(Hd, Dd);
    Hd.prototype.target = null;
    Hd.prototype.relatedTarget = null;
    Hd.prototype.clientX = 0;
    Hd.prototype.clientY = 0;
    Hd.prototype.keyCode = 0;
    Hd.prototype.charCode = 0;
    Hd.prototype.ctrlKey = false;
    Hd.prototype.altKey = false;
    Hd.prototype.shiftKey = false;
    Hd.prototype.G = null;
    Hd.prototype.init = function (a, b) {
        var c = (this.type = a.type);
        Dd.call(this, c);
        this.target = a.target || a.srcElement;
        this.currentTarget = b;
        var d = a.relatedTarget;
        if (d) {
            if (goog$userAgent$GECKO) {
                var f;
                a: {
                    try {
                        Ed(d.nodeName);
                        f = true;
                        break a;
                    } catch (e) {}
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
        this.clientX = a.clientX !== undefined ? a.clientX : a.pageX;
        this.clientY = a.clientY !== undefined ? a.clientY : a.pageY;
        this.keyCode = a.keyCode || 0;
        this.charCode = a.charCode || (c == "keypress" ? a.keyCode : 0);
        this.ctrlKey = a.ctrlKey;
        this.altKey = a.altKey;
        this.shiftKey = a.shiftKey;
        this.G = a;
        if (a.defaultPrevented) {
            this.preventDefault();
        }
        delete this.a;
    };
    Hd.prototype.stopPropagation = function () {
        Hd.B.stopPropagation.call(this);
        if (this.G.stopPropagation) {
            this.G.stopPropagation();
        } else {
            this.G.cancelBubble = true;
        }
    };
    Hd.prototype.preventDefault = function () {
        Hd.B.preventDefault.call(this);
        var a = this.G;
        if (a.preventDefault) {
            a.preventDefault();
        } else {
            a.returnValue = false;
            if (Gd) {
                try {
                    if (a.ctrlKey || (a.keyCode >= 112 && a.keyCode <= 123)) {
                        a.keyCode = -1;
                    }
                } catch (b) {}
            }
        }
    };
    Hd.prototype.Sb = function () {
        return this.G;
    };
    function Id() {}
    var Jd = 0;
    Id.prototype.key = 0;
    Id.prototype.Q = false;
    Id.prototype.Pa = false;
    Id.prototype.init = function (a, b, c, d, f, e) {
        if (ha(a)) {
            this.a = true;
        } else if (a && a.handleEvent && ha(a.handleEvent)) {
            this.a = false;
        } else {
            throw Error("Invalid listener argument");
        }
        this.$ = a;
        this.b = b;
        this.src = c;
        this.type = d;
        this.capture = !!f;
        this.ua = e;
        this.Pa = false;
        this.key = ++Jd;
        this.Q = false;
    };
    Id.prototype.handleEvent = function (a) {
        if (this.a) {
            return this.$.call(this.ua || this.src, a);
        } else {
            return this.$.handleEvent.call(this.$, a);
        }
    };
    var Kd = {};
    var M = {};
    var Ld = {};
    var Md = {};
    function N(a, b, c, d, f) {
        if (b) {
            if (goog$isArray(b)) {
                for (var e = 0; e < b.length; e++) {
                    N(a, b[e], c, d, f);
                }
                return null;
            }
            var d = !!d;
            var g = M;
            if (!(b in g)) {
                g[b] = {
                    f: 0,
                    u: 0
                };
            }
            g = g[b];
            if (!(d in g)) {
                g[d] = {
                    f: 0,
                    u: 0
                };
                g.f++;
            }
            var g = g[d];
            var h = goog$getUid(a);
            var j;
            g.u++;
            if (g[h]) {
                j = g[h];
                for (e = 0; e < j.length; e++) {
                    g = j[e];
                    if (g.$ == c && g.ua == f) {
                        if (g.Q) {
                            break;
                        }
                        return j[e].key;
                    }
                }
            } else {
                j = g[h] = [];
                g.f++;
            }
            var m = Nd;
            var p = Fd
                ? function (a) {
                      return m.call(p.src, p.key, a);
                  }
                : function (a) {
                      a = m.call(p.src, p.key, a);
                      if (!a) {
                          return a;
                      }
                  };
            var e = p;
            e.src = a;
            g = new Id();
            g.init(c, e, a, b, d, f);
            c = g.key;
            e.key = c;
            j.push(g);
            Kd[c] = g;
            if (!Ld[h]) {
                Ld[h] = [];
            }
            Ld[h].push(g);
            if (a.addEventListener) {
                if (a == goog$global || !a.vb) {
                    a.addEventListener(b, e, d);
                }
            } else {
                a.attachEvent(b in Md ? Md[b] : (Md[b] = "on" + b), e);
            }
            return c;
        }
        throw Error("Invalid event type");
    }
    function Od(a, b, c, d, f) {
        if (goog$isArray(b)) {
            for (var e = 0; e < b.length; e++) {
                Od(a, b[e], c, d, f);
            }
        } else {
            a = N(a, b, c, d, f);
            Kd[a].Pa = true;
        }
    }
    function Pd(a, b, c, d, f) {
        if (goog$isArray(b)) {
            for (var e = 0; e < b.length; e++) {
                Pd(a, b[e], c, d, f);
            }
        } else {
            d = !!d;
            if ((a = Qd(a, b, d))) {
                for (e = 0; e < a.length; e++) {
                    if (a[e].$ == c && a[e].capture == d && a[e].ua == f) {
                        Rd(a[e].key);
                        break;
                    }
                }
            }
        }
    }
    function Rd(a) {
        if (!Kd[a]) {
            return false;
        }
        var b = Kd[a];
        if (b.Q) {
            return false;
        }
        var c = b.src;
        var d = b.type;
        var f = b.b;
        var e = b.capture;
        if (c.removeEventListener) {
            if (c == goog$global || !c.vb) {
                c.removeEventListener(d, f, e);
            }
        } else if (c.detachEvent) {
            c.detachEvent(d in Md ? Md[d] : (Md[d] = "on" + d), f);
        }
        c = goog$getUid(c);
        if (Ld[c]) {
            f = Ld[c];
            Da(f, b);
            if (f.length == 0) {
                delete Ld[c];
            }
        }
        b.Q = true;
        if ((b = M[d][e][c])) {
            b.wb = true;
            Sd(d, e, c, b);
        }
        delete Kd[a];
        return true;
    }
    function Sd(a, b, c, d) {
        if (!d.Fa && d.wb) {
            for (var f = 0, e = 0; f < d.length; f++) {
                if (d[f].Q) {
                    d[f].b.src = null;
                } else {
                    if (f != e) {
                        d[e] = d[f];
                    }
                    e++;
                }
            }
            d.length = e;
            d.wb = false;
            if (e == 0) {
                delete M[a][b][c];
                M[a][b].f--;
                if (M[a][b].f == 0) {
                    delete M[a][b];
                    M[a].f--;
                }
                if (M[a].f == 0) {
                    delete M[a];
                }
            }
        }
    }
    function Qd(a, b, c) {
        var d = M;
        if (b in d && ((d = d[b]), c in d && ((d = d[c]), (a = goog$getUid(a)), d[a]))) {
            return d[a];
        } else {
            return null;
        }
    }
    function Td(a, b, c, d, f) {
        var e = 1;
        var b = goog$getUid(b);
        if (a[b]) {
            a.u--;
            a = a[b];
            if (a.Fa) {
                a.Fa++;
            } else {
                a.Fa = 1;
            }
            try {
                for (var g = a.length, h = 0; h < g; h++) {
                    var j = a[h];
                    if (j && !j.Q) {
                        e &= Ud(j, f) !== false;
                    }
                }
            } finally {
                a.Fa--;
                Sd(c, d, b, a);
            }
        }
        return Boolean(e);
    }
    function Ud(a, b) {
        if (a.Pa) {
            Rd(a.key);
        }
        return a.handleEvent(b);
    }
    function Nd(a, b) {
        if (!Kd[a]) {
            return true;
        }
        var c = Kd[a];
        var d = c.type;
        var f = M;
        if (!(d in f)) {
            return true;
        }
        var f = f[d];
        var e;
        var g;
        if (!Fd) {
            e = b || goog$getObjectByName("window.event");
            var h = true in f;
            var j = false in f;
            if (h) {
                if (e.keyCode < 0 || e.returnValue != undefined) {
                    return true;
                }
                a: {
                    var m = false;
                    if (e.keyCode == 0) {
                        try {
                            e.keyCode = -1;
                            break a;
                        } catch (p) {
                            m = true;
                        }
                    }
                    if (m || e.returnValue == undefined) {
                        e.returnValue = true;
                    }
                }
            }
            m = new Hd();
            m.init(e, this);
            e = true;
            try {
                if (h) {
                    var q = [];
                    for (var v = m.currentTarget; v; v = v.parentNode) {
                        q.push(v);
                    }
                    g = f[true];
                    g.u = g.f;
                    for (var t = q.length - 1; !m.a && t >= 0 && g.u; t--) {
                        m.currentTarget = q[t];
                        e &= Td(g, q[t], d, true, m);
                    }
                    if (j) {
                        g = f[false];
                        g.u = g.f;
                        for (t = 0; !m.a && t < q.length && g.u; t++) {
                            m.currentTarget = q[t];
                            e &= Td(g, q[t], d, false, m);
                        }
                    }
                } else {
                    e = Ud(c, m);
                }
            } finally {
                if (q) {
                    q.length = 0;
                }
            }
            return e;
        }
        d = new Hd(b, this);
        return (e = Ud(c, d));
    }
    var Vd = 0;
    y("Displays the keyboard shortcut help dialog.");
    y("Sets focus to the contact search input field in the roster.");
    y("Sets focus to the chat widget to the left of the currently focused one.");
    y("Sets focus to the chat widget to the right of the currently focused one.");
    y("Returns focus to the last element that had focus on the parent page.");
    y("Brings the roster and any chat windows to the foreground.");
    function Wd(a, b) {
        var c = new Bd();
        c.a[0] = b;
        c.a[1] = a;
        return c;
    }
    var Xd = Wd("?", 0);
    var Yd = Wd("q", 1);
    var Zd = Wd("<", 2);
    var $d = Wd(">", 3);
    var ae = Wd("~", 4);
    var be = Wd("s", 5);
    var ce = {
        b: Xd,
        n: Yd,
        e: Zd,
        j: $d,
        d: ae,
        t: be
    };
    Vd++;
    function de(a) {
        if (!this.La) {
            for (var b = this.constructor; b && !b.Z;) {
                b = b.B && b.B.constructor;
            }
            if (!b.Z.nb) {
                var c = b.Z;
                var d = b;
                var f = function (a) {
                    arguments.callee.B.constructor.call(this, a);
                    var b = this.C.length;
                    this.a = [];
                    for (var c = 0; c < b; ++c) {
                        if (!this.C[c].Ic) {
                            this.a[c] = new this.C[c](a);
                        }
                    }
                };
                var e = d.Z;
                A(f, e);
                var g = [];
                for (; d;) {
                    if ((e = d.Z)) {
                        if (e.C) {
                            goog$array$extend(g, e.C);
                        }
                        var e = e.prototype;
                        var h;
                        for (h in e) {
                            if (e.hasOwnProperty(h) && ha(e[h]) && e[h] !== d) {
                                var j = !!e[h].mb;
                                for (
                                    var m = h, p = e, q = g, v = j, t = [], I = 0;
                                    I < q.length && (q[I].prototype[m] === p[m] || !(t.push(I), v));
                                    ++I
                                );
                                if ((j = md(h, e, t, j))) {
                                    f.prototype[h] = j;
                                }
                            }
                        }
                    }
                    d = d.B && d.B.constructor;
                }
                f.prototype.C = g;
                c.nb = f;
            }
            this.La = new b.Z.nb(this);
            if (!this.b) {
                this.b = od;
            }
        }
        this.a = this.La.d(a.clientBaseUrl || "http://talkgadget.google.com/talkgadget/");
        b = vd(new goog$net$Cookies(window.document), "WCSDBG", "");
        if (b.length > 0) {
            b = b.split(";")[0];
            b = rc("https://" + b + "/talkgadget/");
            if (b.ja != null) {
                ec(b, "http");
            }
            this.a = b.toString();
        }
        this.helpLink = a.helpLink;
        this.j = a.rosterId || "talk_roster";
        if (a.rosterFrameId) {
            a.rosterFrameId.match(/[\w-]/);
        }
        this.e = a.isRtl || false;
        if (!a.keyboardShortcuts) {
            var b = [];
            var oa;
            for (oa in ce) {
                b.push(ce[oa].a);
            }
        }
        this.d = a.entityId;
    }
    if (!xd.B) {
        A(xd, ld);
    }
    de.Z = xd;
    xd.a = de;
    y("Google Talk");
    function cs$Config(a) {
        var a = a || {};
        var b = new de(a);
        this.clientBaseUrl = b.a;
        this.rosterId = b.j;
        this.entityId = b.d;
        this.feedbackId = a.feedbackId || 74772;
        this.alphaTestMode = a.alphaTestMode || false;
        this.stagingMode = a.stagingMode || false;
        this.isRtl = b.e;
        this.moleFocusCallback = a.moleFocusCallback;
        this.agentNotificationCallback = a.agentNotificationCallback;
        this.requestChatAvailabilityCallback = a.requestChatAvailabilityCallback;
        this.receiveChatAvailableCallback = a.receiveChatAvailableCallback;
        this.receiveChatNotAvailableCallback = a.receiveChatNotAvailableCallback;
        this.surveySubmittedCallback = a.surveySubmittedCallback;
        this.chatAvailabilityCallback = a.chatAvailabilityCallback;
        this.helpHost = a.helpHost;
        this.helpCenterName = a.helpCenterName;
        this.helpCenterUri = a.helpCenterUri;
        this.localeName = a.localeName;
        this.timeoutMs = a.timeoutMs;
        this.operatorDeferredUrl =
            a.operatorDeferredUrl || "//ssl.gstatic.com/inproduct_help/chatsupport/chatsupport_operatordeferred2.js";
    }
    goog$exportSymbol("cs.Config", cs$Config);
    function fe(a) {
        this.Ma = {};
        for (var b = 0; b < a.length; b++) {
            var c = a[b];
            this.Ma[c.a] = c;
        }
    }
    function ge(a, b) {
        this.a = a;
        this.d = !!b.L;
        this.b = b.c;
    }
    function O() {
        this.z = {};
        this.oa = this.constructor.oa;
        this.a = this.oa.Ma;
        this.D = null;
    }
    O.prototype.pb = function () {
        return this.oa;
    };
    function he(a, b) {
        var c = Ra(a.pb().Ma);
        goog$array$ARRAY_PROTOTYPE_.sort.call(
            c,
            function (a, b) {
                return a.a - b.a;
            } || goog$array$defaultCompare
        );
        for (var d = 0; d < c.length; d++) {
            var f = c[d];
            var e = b;
            var g = f;
            if (g.a in e.z && goog$isDef(e.z[g.a]) && e.z[g.a] !== null) {
                if (a.D) {
                    delete a.D[f.a];
                }
                e = f.b == 11 || f.b == 10;
                if (f.d) {
                    g = b;
                    g = ie(g, g.a[f.a]);
                    if (g != null) {
                        goog$isArray(g);
                    }
                    for (var g = g || [], h = 0; h < g.length; h++) {
                        var j = a;
                        var m = f;
                        var p = e ? g[h].k() : g[h];
                        var m = m.a;
                        if (!j.z[m]) {
                            j.z[m] = [];
                        }
                        j.z[m].push(p);
                        if (j.D) {
                            delete j.D[m];
                        }
                    }
                } else {
                    g = ie(b, f);
                    if (e) {
                        if ((e = ie(a, f))) {
                            he(e, g);
                        } else {
                            e = a;
                            g = g.k();
                            f = f.a;
                            e.z[f] = g;
                            if (e.D) {
                                e.D[f] = g;
                            }
                        }
                    } else {
                        e = a;
                        f = f.a;
                        e.z[f] = g;
                        if (e.D) {
                            e.D[f] = g;
                        }
                    }
                }
            }
        }
    }
    O.prototype.k = function () {
        var a = new this.constructor();
        a.z = {};
        if (a.D) {
            a.D = {};
        }
        he(a, this);
        return a;
    };
    function ie(a, b) {
        var c = b.a;
        if ((!c) in a.z) {
            return null;
        }
        c = a.z[c];
        if (c == null) {
            return null;
        } else {
            return c;
        }
    }
    function P(a, b) {
        var c = [];
        var d;
        for (d in b) {
            if (b.hasOwnProperty(d)) {
                if (d != 0) {
                    c.push(new ge(d, b[d]));
                }
            }
        }
        a.oa = new fe(c);
        a.pb = function () {
            return a.oa;
        };
    }
    function je() {
        O.apply(this);
    }
    A(je, O);
    function ke() {
        O.apply(this);
    }
    A(ke, O);
    function le() {
        O.apply(this);
    }
    A(le, O);
    function me() {
        O.apply(this);
    }
    A(me, O);
    function ne() {
        O.apply(this);
    }
    A(ne, O);
    function oe() {
        O.apply(this);
    }
    A(oe, O);
    function pe() {
        O.apply(this);
    }
    A(pe, O);
    function qe() {
        O.apply(this);
    }
    A(qe, O);
    function re() {
        O.apply(this);
    }
    A(re, O);
    function se() {
        O.apply(this);
    }
    A(se, O);
    function te() {
        O.apply(this);
    }
    A(te, O);
    function ue() {
        O.apply(this);
    }
    A(ue, O);
    function ve() {
        O.apply(this);
    }
    A(ve, O);
    function we() {
        O.apply(this);
    }
    A(we, O);
    function xe() {
        O.apply(this);
    }
    A(xe, O);
    function ye() {
        O.apply(this);
    }
    A(ye, O);
    function ze() {
        O.apply(this);
    }
    A(ze, O);
    function Ae() {
        O.apply(this);
    }
    A(Ae, O);
    function Be() {
        O.apply(this);
    }
    A(Be, O);
    P(je, {
        0: {
            name: "ChatSession",
            l: "cases_resources.ChatSession"
        },
        1: {
            name: "room_jid",
            required: true,
            c: 9,
            type: String
        },
        2: {
            name: "agent_jid",
            required: true,
            c: 9,
            type: String
        },
        3: {
            name: "customer_jid",
            required: true,
            c: 9,
            type: String
        },
        6: {
            name: "pool_id",
            required: true,
            c: 9,
            type: String
        },
        7: {
            name: "ended",
            c: 8,
            type: Boolean
        }
    });
    P(ke, {
        0: {
            name: "Agent",
            l: "cases_resources.Agent"
        },
        1: {
            name: "jid",
            required: true,
            c: 9,
            type: String
        },
        2: {
            name: "state",
            required: true,
            c: 11,
            type: le
        },
        3: {
            name: "full_jid",
            L: true,
            c: 9,
            type: String
        },
        4: {
            name: "pool_id",
            L: true,
            c: 9,
            type: String
        },
        5: {
            name: "chat_session",
            L: true,
            c: 11,
            type: je
        },
        6: {
            name: "last_connection_timestamp",
            c: 3,
            type: String
        },
        7: {
            name: "obfuscated_gaia_id",
            c: 3,
            type: String
        },
        8: {
            name: "display_name",
            c: 9,
            type: String
        },
        9: {
            name: "email",
            c: 9,
            type: String
        }
    });
    P(le, {
        0: {
            name: "State",
            F: ke,
            l: "cases_resources.Agent.State"
        },
        1: {
            name: "status",
            required: true,
            c: 14,
            defaultValue: 0,
            type: {
                Oc: 0,
                Pc: 1,
                IDLE: 2,
                Uc: 3
            }
        },
        2: {
            name: "max_chat_sessions",
            required: true,
            c: 5,
            type: Number
        }
    });
    P(me, {
        0: {
            name: "Customer",
            l: "cases_resources.Customer"
        },
        1: {
            name: "jid",
            required: true,
            c: 9,
            type: String
        },
        2: {
            name: "full_jid",
            L: true,
            c: 9,
            type: String
        },
        3: {
            name: "case_info",
            required: true,
            c: 11,
            type: ne
        },
        4: {
            name: "survey_attribute",
            L: true,
            c: 11,
            type: oe
        },
        5: {
            name: "pool_id",
            required: true,
            c: 9,
            type: String
        },
        6: {
            name: "agent_connected_to",
            c: 9,
            type: String
        },
        7: {
            name: "support_request_timestamp",
            c: 3,
            type: String
        },
        8: {
            name: "chat_session_room_jid",
            c: 9,
            type: String
        },
        9: {
            name: "obfuscated_gaia_id",
            c: 3,
            type: String
        }
    });
    P(ne, {
        0: {
            name: "CaseInfo",
            F: me,
            l: "cases_resources.Customer.CaseInfo"
        },
        1: {
            name: "case_id",
            required: true,
            c: 9,
            type: String
        },
        2: {
            name: "deprecated_document_id",
            c: 3,
            type: String
        },
        3: {
            name: "message_id",
            c: 9,
            type: String
        }
    });
    P(oe, {
        0: {
            name: "SurveyAttribute",
            F: me,
            l: "cases_resources.Customer.SurveyAttribute"
        },
        1: {
            name: "name",
            required: true,
            c: 9,
            type: String
        },
        2: {
            name: "value",
            required: true,
            c: 9,
            type: String
        }
    });
    P(pe, {
        0: {
            name: "Resources",
            l: "cases_resources.Resources"
        },
        1: {
            name: "resources_id",
            required: true,
            c: 11,
            type: qe
        },
        2: {
            name: "agent",
            L: true,
            c: 11,
            type: ke
        },
        3: {
            name: "customer",
            L: true,
            c: 11,
            type: me
        }
    });
    P(qe, {
        0: {
            name: "ResourcesId",
            F: pe,
            l: "cases_resources.Resources.ResourcesId"
        },
        1: {
            name: "agent_source_id",
            required: true,
            c: 3,
            type: String
        },
        2: {
            name: "customer_source_id",
            required: true,
            c: 3,
            type: String
        }
    });
    P(re, {
        0: {
            name: "Control",
            l: "cases_resources.Control"
        },
        1: {
            name: "type",
            required: true,
            c: 14,
            defaultValue: 0,
            type: {
                Tc: 0,
                Qc: 1
            }
        },
        2: {
            name: "push_params",
            c: 11,
            type: se
        },
        3: {
            name: "connect_params",
            c: 11,
            type: te
        }
    });
    P(se, {
        0: {
            name: "PushParams",
            F: re,
            l: "cases_resources.Control.PushParams"
        },
        1: {
            name: "resources_id",
            required: true,
            c: 11,
            type: qe
        }
    });
    P(te, {
        0: {
            name: "ConnectParams",
            F: re,
            l: "cases_resources.Control.ConnectParams"
        },
        1: {
            name: "connected_pair",
            L: true,
            c: 11,
            type: ue
        }
    });
    P(ue, {
        0: {
            name: "ConnectedPair",
            F: te,
            l: "cases_resources.Control.ConnectParams.ConnectedPair"
        },
        1: {
            name: "agent",
            required: true,
            c: 11,
            type: ke
        },
        2: {
            name: "customer",
            required: true,
            c: 11,
            type: me
        }
    });
    P(ve, {
        0: {
            name: "ActiveResourceChange",
            l: "cases_resources.ActiveResourceChange"
        },
        1: {
            name: "agent_id",
            c: 9,
            type: String
        },
        2: {
            name: "customer_id",
            c: 9,
            type: String
        },
        3: {
            name: "insert_timestamp",
            c: 3,
            type: String
        }
    });
    P(we, {
        0: {
            name: "ActiveResourceEntityId",
            l: "cases_resources.ActiveResourceEntityId"
        },
        1: {
            name: "resource_type",
            required: true,
            c: 14,
            defaultValue: 0,
            type: {
                Mc: 0,
                Rc: 1
            }
        },
        2: {
            name: "resource_id",
            required: true,
            c: 9,
            type: String
        }
    });
    P(xe, {
        0: {
            name: "PoolConfig",
            l: "cases_resources.PoolConfig"
        },
        1: {
            name: "pool_id",
            required: true,
            c: 11,
            type: ye
        },
        2: {
            name: "max_waiting_customers",
            c: 5,
            defaultValue: -1,
            type: Number
        },
        3: {
            name: "pool_multiplier",
            c: 5,
            defaultValue: -1,
            type: Number
        },
        4: {
            name: "direct_ping_config",
            c: 11,
            type: Ae
        },
        5: {
            name: "start_message",
            c: 11,
            type: ze
        },
        6: {
            name: "end_message",
            c: 11,
            type: ze
        },
        7: {
            name: "end_message_no_survey",
            c: 11,
            type: ze
        },
        8: {
            name: "guts_queue",
            c: 11,
            type: Be
        }
    });
    P(ye, {
        0: {
            name: "PoolId",
            F: xe,
            l: "cases_resources.PoolConfig.PoolId"
        },
        1: {
            name: "product",
            required: true,
            c: 9,
            type: String
        },
        2: {
            name: "locale",
            required: true,
            c: 9,
            type: String
        },
        3: {
            name: "subcategory",
            c: 9,
            defaultValue: "",
            type: String
        }
    });
    P(ze, {
        0: {
            name: "MessageTemplate",
            F: xe,
            l: "cases_resources.PoolConfig.MessageTemplate"
        },
        1: {
            name: "type",
            required: true,
            c: 14,
            defaultValue: 0,
            type: {
                Sc: 0,
                Nc: 1
            }
        },
        2: {
            name: "value",
            required: true,
            c: 9,
            type: String
        }
    });
    P(Ae, {
        0: {
            name: "DirectPingConfig",
            F: xe,
            l: "cases_resources.PoolConfig.DirectPingConfig"
        },
        1: {
            name: "base_bot_jid",
            required: true,
            c: 9,
            type: String
        },
        2: {
            name: "unavailable_message",
            required: true,
            c: 11,
            type: ze
        }
    });
    P(Be, {
        0: {
            name: "GutsQueue",
            F: xe,
            l: "cases_resources.PoolConfig.GutsQueue"
        },
        1: {
            name: "email_address",
            required: true,
            c: 9,
            type: String
        },
        2: {
            name: "assignee_group",
            required: true,
            c: 9,
            type: String
        }
    });
    function Ce(a, b) {
        this.j = a;
        this.d = b;
        this.b = false;
        this.a = [];
    }
    function De(a) {
        for (var b = 0; b < a.a.length; b++) {
            a.a[b]();
        }
        a = a.a;
        if (!goog$isArray(a)) {
            for (b = a.length - 1; b >= 0; b--) {
                delete a[b];
            }
        }
        a.length = 0;
    }
    Ce.prototype.e = function () {
        De(this);
    };
    function Q(a, b) {
        a.a.push(b);
        if (a.d()) {
            De(a);
        } else if (!a.b) {
            var c = goog$bind(a.e, a);
            var d = goog$dom$createDom("script", {
                type: "text/javascript",
                src: a.j,
                onload: c,
                onreadystatechange: function () {
                    if (d.readyState == "complete" || d.readyState == "loaded") {
                        c();
                        d.onreadystatechange = null;
                    }
                }
            });
            var f = document;
            var e = f.getElementsByTagName("head");
            (e.length > 0 ? e[0] : f.body).appendChild(d);
            a.b = true;
        }
    }
    function cs$Operator(a) {
        this.b = a instanceof cs$Config ? a : new cs$Config(a);
        this.a = new Ce(this.b.operatorDeferredUrl, Ee);
        Q(
            this.a,
            goog$bind(
                function (a) {
                    this.p = new window.cs.OperatorDeferred(a);
                },
                this,
                this.b
            )
        );
    }
    function Ee() {
        return Boolean(window.cs && window.cs.OperatorDeferred);
    }
    cs$Operator.prototype.ac = function () {
        Q(
            this.a,
            goog$bind(function () {
                this.p.ensureChatLoaded();
            }, this)
        );
    };
    cs$Operator.prototype.Gc = function (a) {
        Q(
            this.a,
            goog$bind(
                function (a) {
                    this.p.subscribeToMoleEvents(a);
                },
                this,
                a
            )
        );
    };
    cs$Operator.prototype.mc = function (a, b, c) {
        Q(
            this.a,
            goog$bind(
                function (a, b, c) {
                    this.p.logIn(a, b, c);
                },
                this,
                a,
                b,
                c
            )
        );
    };
    cs$Operator.prototype.nc = function () {
        Q(
            this.a,
            goog$bind(function () {
                this.p.logOut();
            }, this)
        );
    };
    cs$Operator.prototype.Xb = function (a, b, c) {
        Q(
            this.a,
            goog$bind(
                function (a, b, c) {
                    this.p.resolve(a, b, c);
                },
                this,
                a,
                b,
                c
            )
        );
    };
    cs$Operator.prototype.Yb = function (a) {
        Q(
            this.a,
            goog$bind(
                function (a) {
                    this.p.connect(a);
                },
                this,
                a
            )
        );
    };
    cs$Operator.prototype.pc = function () {
        Q(
            this.a,
            goog$bind(function () {
                this.p.reconnect();
            }, this)
        );
    };
    cs$Operator.prototype.Hc = function (a, b) {
        Q(
            this.a,
            goog$bind(
                function (a, b) {
                    this.p.updateState(a, b);
                },
                this,
                a,
                b
            )
        );
    };
    cs$Operator.prototype.sc = function (a) {
        Q(
            this.a,
            goog$bind(
                function (a) {
                    this.p.retrieveChatAvailability(a);
                },
                this,
                a
            )
        );
    };
    cs$Operator.prototype.qc = function (a) {
        Q(
            this.a,
            goog$bind(
                function (a) {
                    this.p.requestScreenshot(a);
                },
                this,
                a
            )
        );
    };
    cs$Operator.prototype.Cc = function (a, b) {
        Q(
            this.a,
            goog$bind(
                function (a, b) {
                    this.p.setUserInputText(a, b);
                },
                this,
                a,
                b
            )
        );
    };
    cs$Operator.prototype.Ua = function (a, b) {
        Q(
            this.a,
            goog$bind(
                function (a, b) {
                    this.p.beginSupportRequestByElement(a, b);
                },
                this,
                a,
                b
            )
        );
    };
    cs$Operator.prototype.Cb = function (a, b) {
        Q(
            this.a,
            goog$bind(
                function (a, b) {
                    this.p.beginSupportRequestByAnswerId(a, b);
                },
                this,
                a,
                b
            )
        );
    };
    cs$Operator.prototype.rc = function (a, b) {
        Q(
            this.a,
            goog$bind(
                function (a, b) {
                    this.p.requestSupport(a, b);
                },
                this,
                a,
                b
            )
        );
    };
    goog$exportSymbol("cs.Operator", cs$Operator);
    cs$Operator.prototype.ensureChatLoaded = cs$Operator.prototype.ac;
    cs$Operator.prototype.subscribeToMoleEvents = cs$Operator.prototype.Gc;
    cs$Operator.prototype.logIn = cs$Operator.prototype.mc;
    cs$Operator.prototype.logOut = cs$Operator.prototype.nc;
    cs$Operator.prototype.resolve = cs$Operator.prototype.Xb;
    cs$Operator.prototype.connect = cs$Operator.prototype.Yb;
    cs$Operator.prototype.reconnect = cs$Operator.prototype.pc;
    cs$Operator.prototype.updateState = cs$Operator.prototype.Hc;
    cs$Operator.prototype.retrieveChatAvailability = cs$Operator.prototype.sc;
    cs$Operator.prototype.requestScreenshot = cs$Operator.prototype.qc;
    cs$Operator.prototype.setUserInputText = cs$Operator.prototype.Cc;
    cs$Operator.prototype.beginSupportRequestByElement = cs$Operator.prototype.Ua;
    cs$Operator.prototype.beginSupportRequestByAnswerId = cs$Operator.prototype.Cb;
    cs$Operator.prototype.requestSupport = cs$Operator.prototype.rc;
    function Fe(a) {
        var b = a.answer_id;
        if (b) {
            try {
                this.answerId = parseInt(b, 10);
            } catch (c) {
                K("Invalid answer id " + b, c);
            }
        }
        if ((b = a.snippet)) {
            this.snippet = b;
        }
        if ((b = a.title)) {
            this.title = b;
        }
        if ((b = a.topic_id)) {
            try {
                this.topicId = parseInt(b, 10);
            } catch (d) {
                K("Invalid topic id " + b, d);
            }
        }
        if ((a = a.url)) {
            this.url = a;
        }
    }
    function Ge(a, b) {
        this.answersArr = [];
        this.topicsArr = [];
        if (!b) {
            a = a.topic;
        }
        var c = a.answers;
        if (c && c.length) {
            for (var d = 0; d < c.length; d++) {
                this.answersArr.push(new ad(c[d], true));
            }
        }
        if ((d = a.topic_id)) {
            try {
                this.topicId = parseInt(d, 10);
            } catch (f) {
                K("Invalid topic id " + d, f);
            }
        }
        if ((c = a.topics) && c.length) {
            for (d = 0; d < c.length; d++) {
                this.topicsArr.push(new Ge(c[d], true));
            }
        }
    }
    function He(a, b) {
        this.a = a;
        this.b = b;
    }
    function Ka(a, b) {
        if (a.a < b.a) {
            return -1;
        } else if (a.a > b.a) {
            return 1;
        } else {
            return 0;
        }
    }
    var Na = [];
    function hchas$getAnswerById(a, b, c, d, f, e, g, h) {
        var j;
        var m = [];
        m.push(gd(b, c));
        m.push("/api/answer/");
        m.push(a);
        m.push("/json?");
        a = fd(m, f, true);
        ed(m, e, !a);
        j = m.join("");
        e = Ja(Na, new He(j, {}));
        if (e >= 0) {
            Xc("Using cached answer for " + j);
            d(Na[e].b, true);
        } else {
            e = new Ec(j);
            if (h) {
                e.T = h;
            }
            Gc(
                e,
                {},
                function (a) {
                    a = new ad(a);
                    if (Ma(new He(j, a))) {
                        Xc("Cached new answer for " + j);
                    }
                    d(a, false);
                },
                g
                    ? function (a) {
                          g(a, j);
                      }
                    : null
            );
        }
    }
    function hchas$getAnswersByUserContext(a, b, c, d, f, e, g, h) {
        var j;
        var m = [];
        m.push(gd(b, c));
        m.push("/api/answer/usercontext/json?usrctx=");
        if (a) {
            m.push(a);
        }
        fd(m, f);
        ed(m, e);
        j = m.join("");
        a = Ja(Na, new He(j, {}));
        if (a >= 0) {
            Xc("Using cached list of answers for " + j);
            d(Na[a].b, true);
        } else {
            a = new Ec(j);
            if (h) {
                a.T = h;
            }
            Gc(
                a,
                {},
                function (a) {
                    a = new Ge(a, true).answersArr;
                    if (Ma(new He(j, a))) {
                        Xc("Cached new list of answers for " + j);
                    }
                    d(a, false);
                },
                g
                    ? function (a) {
                          g(a, j);
                      }
                    : null
            );
        }
    }
    function hchas$getMatchesBySearchQuery(a, b, c, d, f, e, g, h) {
        var j;
        var m = [];
        m.push(gd(b, c));
        m.push("/bin/search.py?ctx=searchbox&output=json&query=");
        m.push(a);
        fd(m, f);
        if (e) {
            m.push("&usrctx=");
            m.push(e);
        }
        j = m.join("");
        a = Ja(Na, new He(j, {}));
        if (a >= 0) {
            Xc("Using cached list of matches for " + j);
            d(Na[a].b, true);
        } else {
            a = new Ec(j);
            if (h) {
                a.T = h;
            }
            Gc(
                a,
                {},
                function (a) {
                    var b = [];
                    if ((a = a.matches)) {
                        for (var c = 0; c < a.length; c++) {
                            b.push(new Fe(a[c]));
                        }
                    }
                    if (Ma(new He(j, b))) {
                        Xc("Cached list of matches for " + j);
                    }
                    d(b, false);
                },
                g
                    ? function (a) {
                          g(a, j);
                      }
                    : null
            );
        }
    }
    function hchas$getTopicById(a, b, c, d, f, e, g, h) {
        var j;
        var m = [];
        m.push(gd(b, c));
        m.push("/api/topic/");
        m.push(a);
        m.push("/inproduct?");
        a = fd(m, f, true);
        ed(m, e, !a);
        j = m.join("");
        e = Ja(Na, new He(j, {}));
        if (e >= 0) {
            Xc("Using cached topic for " + j);
            d(Na[e].b, true);
        } else {
            e = new Ec(j);
            if (h) {
                e.T = h;
            }
            Gc(
                e,
                {},
                function (a) {
                    a = new Ge(a);
                    if (Ma(new He(j, a))) {
                        Xc("Cached new topic for " + j);
                    }
                    d(a, false);
                },
                g
                    ? function (a) {
                          g(a, j);
                      }
                    : null
            );
        }
    }
    goog$exportSymbol("hchas.getAnswerById", hchas$getAnswerById);
    goog$exportSymbol("hchas.getAnswersByUserContext", hchas$getAnswersByUserContext);
    goog$exportSymbol("hchas.getMatchesBySearchQuery", hchas$getMatchesBySearchQuery);
    goog$exportSymbol("hchas.getTopicById", hchas$getTopicById);
    var Me = [];
    var td = "/";
    var ud = "";
    function Ne(a) {
        var b = [];
        b.push(a ? "guide_debug.js" : "guide_inproduct.js");
        if (a) {
            b.push("?v=");
            b.push(new Date().getTime());
        }
        return b.join("");
    }
    function Oe() {
        var a = [];
        a.push("//ssl.gstatic.com/inproduct_help/guide/");
        a.push(Ne());
        return a.join("");
    }
    function Pe(a, b) {
        var c = [];
        c.push(a);
        c.push("/support/gh/js/");
        c.push(Ne(b));
        return c.join("");
    }
    function Qe(a, b, c, d, f, e, g, h) {
        if (window.b && window.b.loaded) {
            if (h) {
                h();
            }
        } else {
            if (h) {
                Me.push(h);
            }
            window.b = window.b || {};
            window.b.Jc = function () {
                window.a.ma.Kc(e ? !e : true);
                window.a.ma.init(a + b, c || "", d, g);
                for (var f = 0; f < Me.length; f++) {
                    Me[f]();
                }
                Me.length = 0;
            };
            var h = window.document;
            var j = h.getElementsByTagName("head");
            var j = j.length > 0 ? j[0] : h.body;
            var h = h.createElement("script");
            h.setAttribute("type", "text/javascript");
            h.setAttribute("src", e ? Pe(a, f) : Oe());
            j.appendChild(h);
        }
    }
    function hgb$loadFlow(a, b, c, d, f, e, g, h, j, m) {
        Qe(b, c, d, f, e, g, m, function () {
            window.a.ma.Va(a, h, null, j);
        });
    }
    function Te(a, b, c, d, f, e) {
        return goog$bind(function (g) {
            if (g.type == "click") {
                var h = g.target;
                if (h && h.getAttribute) {
                    var j = h.getAttribute("guidedhelpflowid");
                    if (j) {
                        try {
                            j = parseInt(j, 10);
                            g.stopPropagation();
                            g.preventDefault();
                            Qe(a, b, c, d, f, e, undefined, function () {
                                window.a.ma.Va(j);
                            });
                        } catch (m) {}
                    }
                }
            }
        }, null);
    }
    goog$exportSymbol("hgb.loadFlow", hgb$loadFlow);
    goog$exportSymbol("hgb.resumeCookiedFlow", function (a, b, c, d, f, e, g) {
        var h;
        var j = vd(goog$net$cookies, "GuidedHelpResume");
        if ((h = j ? Number(j.substring(0, j.indexOf(":"))) : null)) {
            var m;
            m = (j = vd(goog$net$cookies, "GuidedHelpResume")) ? j.substring(j.indexOf(":") + 1) : null;
            rd();
            Qe(a, b, c, d, f, e, g, function () {
                window.a.ma.Va(h, m, false);
            });
            return true;
        }
        return false;
    });
    goog$exportSymbol("hgb.setResumeCookieProperties", function (a, b) {
        ud = a || "";
        td = b || "";
    });
    goog$exportSymbol("hgb.startFlowFromUrl", function (a, b, c, d, f, e, g) {
        var h = goog$dom$getDomHelper(g || window.top);
        var h = rc((h.a.parentWindow || h.a.defaultView).location);
        var j = vc(h.a, "ghstartflowid");
        if (j) {
            try {
                var j = parseInt(j, 10);
                var m = vc(h.a, "ghstartstepid");
                rd();
                Qe(a, b, c, d, f, e, g, function () {
                    window.a.ma.Va(j, m);
                });
                return true;
            } catch (p) {}
        }
        return false;
    });
    function Ue(a) {
        this.b = a;
        this.a = [];
    }
    A(Ue, Cd);
    var Ve = [];
    function S(a, b, c, d, f) {
        if (!goog$isArray(c)) {
            Ve[0] = c;
            c = Ve;
        }
        for (var e = 0; e < c.length; e++) {
            var g = N(b, c[e], d || a, f || false, a.b || a);
            a.a.push(g);
        }
    }
    function We(a, b, c, d, f, e) {
        if (goog$isArray(c)) {
            for (var g = 0; g < c.length; g++) {
                We(a, b, c[g], d, f, e);
            }
        } else {
            a: {
                d = d || a;
                e = e || a.b || a;
                f = !!f;
                if ((b = Qd(b, c, f))) {
                    for (c = 0; c < b.length; c++) {
                        if (!b[c].Q && b[c].$ == d && b[c].capture == f && b[c].ua == e) {
                            b = b[c];
                            break a;
                        }
                    }
                }
                b = null;
            }
            if (b) {
                b = b.key;
                Rd(b);
                Da(a.a, b);
            }
        }
    }
    Ue.prototype.handleEvent = function () {
        throw Error("EventHandler.handleEvent not implemented");
    };
    function Xe() {}
    A(Xe, Cd);
    Xe.prototype.vb = true;
    Xe.prototype.addEventListener = function (a, b, c, d) {
        N(this, a, b, c, d);
    };
    Xe.prototype.removeEventListener = function (a, b, c, d) {
        Pd(this, a, b, c, d);
    };
    Xe.prototype.dispatchEvent = function (a) {
        var b = a.type || a;
        var c = M;
        if (b in c) {
            if (goog$isString(a)) {
                a = new Dd(a, this);
            } else if (a instanceof Dd) {
                a.target = a.target || this;
            } else {
                var d = a;
                var a = new Dd(b, this);
                goog$object$extend(a, d);
            }
            var d = 1;
            var f;
            var c = c[b];
            var b = true in c;
            var e;
            if (b) {
                f = [];
                for (e = this; e; e = null) {
                    f.push(e);
                }
                e = c[true];
                e.u = e.f;
                for (var g = f.length - 1; !a.a && g >= 0 && e.u; g--) {
                    a.currentTarget = f[g];
                    d &= Td(e, f[g], a.type, true, a) && a.b != false;
                }
            }
            if (false in c) {
                e = c[false];
                e.u = e.f;
                if (b) {
                    for (g = 0; !a.a && g < f.length && e.u; g++) {
                        a.currentTarget = f[g];
                        d &= Td(e, f[g], a.type, false, a) && a.b != false;
                    }
                } else {
                    for (f = this; !a.a && f && e.u; f = null) {
                        a.currentTarget = f;
                        d &= Td(e, f, a.type, false, a) && a.b != false;
                    }
                }
            }
            a = Boolean(d);
        } else {
            a = true;
        }
        return a;
    };
    function Ye(a, b, c, d, f) {
        if (!goog$userAgent$IE && (!goog$userAgent$WEBKIT || !goog$userAgent$isVersion("525"))) {
            return true;
        }
        if (goog$userAgent$detectedMac_ && f) {
            return Ze(a);
        }
        if ((f && !d) || (!c && (b == 17 || b == 18)) || (goog$userAgent$IE && d && b == a)) {
            return false;
        }
        switch (a) {
            case 13:
                return !goog$userAgent$IE || !goog$userAgent$isDocumentMode(9);
            case 27:
                return !goog$userAgent$WEBKIT;
        }
        return Ze(a);
    }
    function Ze(a) {
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
    }
    function $e(a) {
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
    }
    function af(a, b) {
        if (a) {
            if (this.xa) {
                if (this.wa) {
                    Rd(this.wa);
                    Rd(this.Na);
                    Rd(this.xa);
                    this.xa = this.Na = this.wa = null;
                }
                this.ba = null;
                this.M = this.R = -1;
            }
            this.ba = a;
            this.wa = N(this.ba, "keypress", this, b);
            this.Na = N(this.ba, "keydown", this.a, b, this);
            this.xa = N(this.ba, "keyup", this.b, b, this);
        }
    }
    A(af, Xe);
    af.prototype.ba = null;
    af.prototype.wa = null;
    af.prototype.Na = null;
    af.prototype.xa = null;
    af.prototype.R = -1;
    af.prototype.M = -1;
    af.prototype.Za = false;
    var bf = {
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
    var cf = {
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
    var df = goog$userAgent$IE || (goog$userAgent$WEBKIT && goog$userAgent$isVersion("525"));
    var ef = goog$userAgent$detectedMac_ && goog$userAgent$GECKO;
    af.prototype.a = function (a) {
        if (goog$userAgent$WEBKIT && ((this.R == 17 && !a.ctrlKey) || (this.R == 18 && !a.altKey))) {
            this.M = this.R = -1;
        }
        if (df && !Ye(a.keyCode, this.R, a.shiftKey, a.ctrlKey, a.altKey)) {
            this.handleEvent(a);
        } else {
            this.M = goog$userAgent$GECKO ? $e(a.keyCode) : a.keyCode;
            if (ef) {
                this.Za = a.altKey;
            }
        }
    };
    af.prototype.b = function (a) {
        this.M = this.R = -1;
        this.Za = a.altKey;
    };
    af.prototype.handleEvent = function (a) {
        var b = a.G;
        var c;
        var d;
        var f = b.altKey;
        if (goog$userAgent$IE && a.type == "keypress") {
            c = this.M;
            d = c != 13 && c != 27 ? b.keyCode : 0;
        } else if (goog$userAgent$WEBKIT && a.type == "keypress") {
            c = this.M;
            d = b.charCode >= 0 && b.charCode < 63232 && Ze(c) ? b.charCode : 0;
        } else if (eb) {
            c = this.M;
            d = Ze(c) ? b.keyCode : 0;
        } else {
            c = b.keyCode || this.M;
            d = b.charCode || 0;
            if (ef) {
                f = this.Za;
            }
            if (goog$userAgent$detectedMac_ && d == 63 && c == 224) {
                c = 191;
            }
        }
        var e = c;
        var g = b.keyIdentifier;
        if (c) {
            if (c >= 63232 && c in bf) {
                e = bf[c];
            } else if (c == 25 && a.shiftKey) {
                e = 9;
            }
        } else if (g && g in cf) {
            e = cf[g];
        }
        this.R = e;
        a = new ff(e, d, 0, b);
        a.altKey = f;
        this.dispatchEvent(a);
    };
    af.prototype.o = function () {
        return this.ba;
    };
    function ff(a, b, c, d) {
        if (d) {
            this.init(d, undefined);
        }
        this.type = "key";
        this.keyCode = a;
        this.charCode = b;
    }
    A(ff, Hd);
    var gf = RegExp(
        "^(ar|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Arab|Hebr|Thaa|Nkoo|Tfng))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)",
        "i"
    );
    function goog$math$Box(a, b, c, d) {
        this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d;
    }
    goog$math$Box.prototype.k = function () {
        return new goog$math$Box(this.top, this.right, this.bottom, this.left);
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
    function jf(a, b, c, d) {
        this.left = a;
        this.top = b;
        this.width = c;
        this.height = d;
    }
    jf.prototype.k = function () {
        return new jf(this.left, this.top, this.width, this.height);
    };
    jf.prototype.contains = function (a) {
        if (a instanceof jf) {
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
    function kf(a, b, c) {
        if (goog$isString(b)) {
            lf(a, c, b);
        } else {
            goog$object$forEach(b, goog$partial(lf, a));
        }
    }
    function lf(a, b, c) {
        a.style[
            String(c).replace(/\-([a-z])/g, function (a, b) {
                return b.toUpperCase();
            })
        ] = b;
    }
    function goog$style$getComputedStyle(a, b) {
        var c = goog$dom$getOwnerDocument(a);
        if (c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(a, null))) {
            return c[b] || c.getPropertyValue(b) || "";
        } else {
            return "";
        }
    }
    function goog$style$getCascadedStyle(a, b) {
        if (a.currentStyle) {
            return a.currentStyle[b];
        } else {
            return null;
        }
    }
    function goog$style$getStyle_(a, b) {
        return goog$style$getComputedStyle(a, b) || goog$style$getCascadedStyle(a, b) || (a.style && a.style[b]);
    }
    function of(a) {
        a = a ? goog$dom$getOwnerDocument(a) : document;
        if (
            goog$userAgent$IE &&
            !goog$userAgent$isDocumentMode(9) &&
            !goog$dom$DomHelper$isCss1CompatMode(goog$dom$getDomHelper(a))
        ) {
            return a.body;
        } else {
            return a.documentElement;
        }
    }
    function pf(a) {
        if (fb && goog$userAgent$WEBKIT) {
            var b = a.ownerDocument.defaultView;
            if (b != b.top) {
                return false;
            }
        }
        return !!a.getBoundingClientRect;
    }
    function goog$style$getBoundingClientRect_(a) {
        var b = a.getBoundingClientRect();
        if (goog$userAgent$IE) {
            a = a.ownerDocument;
            b.left -= a.documentElement.clientLeft + a.body.clientLeft;
            b.top -= a.documentElement.clientTop + a.body.clientTop;
        }
        return b;
    }
    function goog$style$getOffsetParent(a) {
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
    }
    function sf(a) {
        var b = new goog$math$Box(0, Infinity, Infinity, 0);
        var c = goog$dom$getDomHelper(a);
        var d = c.a.body;
        var f = c.a.documentElement;
        var e = !goog$userAgent$WEBKIT && c.a.compatMode == "CSS1Compat" ? c.a.documentElement : c.a.body;
        for (; (a = goog$style$getOffsetParent(a));) {
            if (
                (!goog$userAgent$IE || a.clientWidth != 0) &&
                (!goog$userAgent$WEBKIT || a.clientHeight != 0 || a != d) &&
                a != d &&
                a != f &&
                goog$style$getStyle_(a, "overflow") != "visible"
            ) {
                var g = tf(a);
                var h;
                h = a;
                if (goog$userAgent$GECKO && !goog$userAgent$isVersion("1.9")) {
                    var j = parseFloat(goog$style$getComputedStyle(h, "borderLeftWidth"));
                    if (goog$style$isRightToLeft(h)) {
                        var m =
                            h.offsetWidth -
                            h.clientWidth -
                            j -
                            parseFloat(goog$style$getComputedStyle(h, "borderRightWidth"));
                        var j = j + m;
                    }
                    h = new goog$math$Coordinate(j, parseFloat(goog$style$getComputedStyle(h, "borderTopWidth")));
                } else {
                    h = new goog$math$Coordinate(h.clientLeft, h.clientTop);
                }
                g.x += h.x;
                g.y += h.y;
                b.top = Math.max(b.top, g.y);
                b.right = Math.min(b.right, g.x + a.clientWidth);
                b.bottom = Math.min(b.bottom, g.y + a.clientHeight);
                b.left = Math.max(b.left, g.x);
            }
        }
        d = e.scrollLeft;
        e = e.scrollTop;
        b.left = Math.max(b.left, d);
        b.top = Math.max(b.top, e);
        c = Ib(c.a.parentWindow || c.a.defaultView || window);
        b.right = Math.min(b.right, d + c.width);
        b.bottom = Math.min(b.bottom, e + c.height);
        if (b.top >= 0 && b.left >= 0 && b.bottom > b.top && b.right > b.left) {
            return b;
        } else {
            return null;
        }
    }
    function tf(a) {
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
        var e = new goog$math$Coordinate(0, 0);
        var g = of(c);
        if (a == g) {
            return e;
        }
        if (pf(a)) {
            b = goog$style$getBoundingClientRect_(a);
            a = Sb(goog$dom$getDomHelper(c));
            e.x = b.left + a.x;
            e.y = b.top + a.y;
        } else if (c.getBoxObjectFor && !f) {
            b = c.getBoxObjectFor(a);
            a = c.getBoxObjectFor(g);
            e.x = b.screenX - a.screenX;
            e.y = b.screenY - a.screenY;
        } else {
            b = a;
            do {
                e.x += b.offsetLeft;
                e.y += b.offsetTop;
                if (b != a) {
                    e.x += b.clientLeft || 0;
                    e.y += b.clientTop || 0;
                }
                if (goog$userAgent$WEBKIT && goog$style$getStyle_(b, "position") == "fixed") {
                    e.x += c.body.scrollLeft;
                    e.y += c.body.scrollTop;
                    break;
                }
                b = b.offsetParent;
            } while (b && b != a);
            if (eb || (goog$userAgent$WEBKIT && d == "absolute")) {
                e.y -= c.body.offsetTop;
            }
            for (b = a; (b = goog$style$getOffsetParent(b)) && b != c.body && b != g;) {
                e.x -= b.scrollLeft;
                if (!eb || b.tagName != "TR") {
                    e.y -= b.scrollTop;
                }
            }
        }
        return e;
    }
    function vf(a) {
        var b = new goog$math$Coordinate();
        if (a.nodeType == 1) {
            if (pf(a)) {
                var c = goog$style$getBoundingClientRect_(a);
                b.x = c.left;
                b.y = c.top;
            } else {
                var c = Sb(goog$dom$getDomHelper(a));
                var d = tf(a);
                b.x = d.x - c.x;
                b.y = d.y - c.y;
            }
            if (goog$userAgent$GECKO && !goog$userAgent$isVersion(12)) {
                var f;
                if (goog$userAgent$IE) {
                    f = "-ms-transform";
                } else if (goog$userAgent$WEBKIT) {
                    f = "-webkit-transform";
                } else if (eb) {
                    f = "-o-transform";
                } else if (goog$userAgent$GECKO) {
                    f = "-moz-transform";
                }
                var e;
                if (f) {
                    e = goog$style$getStyle_(a, f);
                }
                if (!e) {
                    e = goog$style$getStyle_(a, "transform");
                }
                if (e) {
                    a = e.match(wf);
                    a = !a
                        ? new goog$math$Coordinate(0, 0)
                        : new goog$math$Coordinate(parseFloat(a[1]), parseFloat(a[2]));
                } else {
                    a = new goog$math$Coordinate(0, 0);
                }
                b = new goog$math$Coordinate(b.x + a.x, b.y + a.y);
            }
        } else {
            f = ha(a.Sb);
            e = a;
            if (a.targetTouches) {
                e = a.targetTouches[0];
            } else if (f && a.G.targetTouches) {
                e = a.G.targetTouches[0];
            }
            b.x = e.clientX;
            b.y = e.clientY;
        }
        return b;
    }
    function goog$style$getPixelStyleValue_(a, b) {
        if (typeof a == "number") {
            a = (b ? Math.round(a) : a) + "px";
        }
        return a;
    }
    function goog$style$getSize(a) {
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
    }
    function goog$style$getSizeWithDisplay_(a) {
        var b = a.offsetWidth;
        var c = a.offsetHeight;
        var d = goog$userAgent$WEBKIT && !b && !c;
        if ((!goog$isDef(b) || d) && a.getBoundingClientRect) {
            a = goog$style$getBoundingClientRect_(a);
            return new goog$math$Size(a.right - a.left, a.bottom - a.top);
        } else {
            return new goog$math$Size(b, c);
        }
    }
    function U(a, b) {
        a.style.display = b ? "" : "none";
    }
    function Af(a) {
        return a.style.display != "none";
    }
    function goog$style$isRightToLeft(a) {
        return goog$style$getStyle_(a, "direction") == "rtl";
    }
    function goog$style$getIePixelValue_(a, b) {
        if (/^\d+px?$/.test(b)) {
            return parseInt(b, 10);
        }
        var c = a.style.left;
        var d = a.runtimeStyle.left;
        a.runtimeStyle.left = a.currentStyle.left;
        a.style.left = b;
        var f = a.style.pixelLeft;
        a.style.left = c;
        a.runtimeStyle.left = d;
        return f;
    }
    var goog$style$ieBorderWidthKeywords_ = {
        thin: 2,
        medium: 4,
        thick: 6
    };
    function goog$style$getIePixelBorder_(a, b) {
        if (goog$style$getCascadedStyle(a, b + "Style") == "none") {
            return 0;
        }
        var c = goog$style$getCascadedStyle(a, b + "Width");
        if (c in goog$style$ieBorderWidthKeywords_) {
            return goog$style$ieBorderWidthKeywords_[c];
        } else {
            return goog$style$getIePixelValue_(a, c);
        }
    }
    var wf = /matrix\([0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, ([0-9\.\-]+)p?x?, ([0-9\.\-]+)p?x?\)/;
    function Ef() {}
    ca(Ef);
    Ef.getInstance();
    function Ff(a, b, c, d, f, e, g, h) {
        var j;
        var m;
        if ((j = c.offsetParent)) {
            var p = j.tagName == "HTML" || j.tagName == "BODY";
            if (!p || goog$style$getStyle_(j, "position") != "static") {
                m = tf(j);
                if (!p) {
                    p =
                        (p = goog$style$isRightToLeft(j)) && goog$userAgent$GECKO
                            ? -j.scrollLeft
                            : p && (!goog$userAgent$IE || !goog$userAgent$isVersion("8"))
                              ? j.scrollWidth - j.clientWidth - j.scrollLeft
                              : j.scrollLeft;
                    m = goog$math$Coordinate$difference(m, new goog$math$Coordinate(p, j.scrollTop));
                }
            }
        }
        j = m || new goog$math$Coordinate();
        m = tf(a);
        p = goog$style$getSize(a);
        m = new jf(m.x, m.y, p.width, p.height);
        if ((p = sf(a))) {
            var q = new jf(p.left, p.top, p.right - p.left, p.bottom - p.top);
            var p = Math.max(m.left, q.left);
            var v = Math.min(m.left + m.width, q.left + q.width);
            if (p <= v) {
                var t = Math.max(m.top, q.top);
                var q = Math.min(m.top + m.height, q.top + q.height);
                if (t <= q) {
                    m.left = p;
                    m.top = t;
                    m.width = v - p;
                    m.height = q - t;
                }
            }
        }
        p = goog$dom$getDomHelper(a);
        t = goog$dom$getDomHelper(c);
        if (p.a != t.a) {
            var v = p.a.body;
            var t = t.a.parentWindow || t.a.defaultView;
            var q = new goog$math$Coordinate(0, 0);
            var I = goog$dom$getOwnerDocument(v)
                ? goog$dom$getOwnerDocument(v).parentWindow || goog$dom$getOwnerDocument(v).defaultView
                : window;
            var oa = v;
            do {
                var Se = I == t ? tf(oa) : vf(oa);
                q.x += Se.x;
                q.y += Se.y;
            } while (I && I != t && (oa = I.frameElement) && (I = I.parent));
            v = goog$math$Coordinate$difference(q, tf(v));
            if (goog$userAgent$IE && !goog$dom$DomHelper$isCss1CompatMode(p)) {
                v = goog$math$Coordinate$difference(v, Sb(p));
            }
            m.left += v.x;
            m.top += v.y;
        }
        a = (b & 4 && goog$style$isRightToLeft(a) ? b ^ 2 : b) & -5;
        b = new goog$math$Coordinate(a & 2 ? m.left + m.width : m.left, a & 1 ? m.top + m.height : m.top);
        b = goog$math$Coordinate$difference(b, j);
        if (f) {
            b.x += (a & 2 ? -1 : 1) * f.x;
            b.y += (a & 1 ? -1 : 1) * f.y;
        }
        var da;
        if (g && (da = sf(c))) {
            da.top -= j.y;
            da.right -= j.x;
            da.bottom -= j.y;
            da.left -= j.x;
        }
        return goog$positioning$positionAtCoordinate(b, c, d, e, da, g, h);
    }
    function goog$positioning$positionAtCoordinate(a, b, c, d, f, e, g) {
        var a = a.k();
        var h = 0;
        var j = (c & 4 && goog$style$isRightToLeft(b) ? c ^ 2 : c) & -5;
        var c = goog$style$getSize(b);
        var g = g ? g.k() : c.k();
        if (d || j != 0) {
            if (j & 2) {
                a.x -= g.width + (d ? d.right : 0);
            } else if (d) {
                a.x += d.left;
            }
            if (j & 1) {
                a.y -= g.height + (d ? d.bottom : 0);
            } else if (d) {
                a.y += d.top;
            }
        }
        if (e) {
            if (f) {
                h = a;
                d = 0;
                if ((e & 65) == 65 && (h.x < f.left || h.x >= f.right)) {
                    e &= -2;
                }
                if ((e & 132) == 132 && (h.y < f.top || h.y >= f.bottom)) {
                    e &= -5;
                }
                if (h.x < f.left && e & 1) {
                    h.x = f.left;
                    d |= 1;
                }
                if (h.x < f.left && h.x + g.width > f.right && e & 16) {
                    g.width = Math.max(g.width - (h.x + g.width - f.right), 0);
                    d |= 4;
                }
                if (h.x + g.width > f.right && e & 1) {
                    h.x = Math.max(f.right - g.width, f.left);
                    d |= 1;
                }
                if (e & 2) {
                    d |= (h.x < f.left ? 16 : 0) | (h.x + g.width > f.right ? 32 : 0);
                }
                if (h.y < f.top && e & 4) {
                    h.y = f.top;
                    d |= 2;
                }
                if (h.y >= f.top && h.y + g.height > f.bottom && e & 32) {
                    g.height = Math.max(g.height - (h.y + g.height - f.bottom), 0);
                    d |= 8;
                }
                if (h.y + g.height > f.bottom && e & 4) {
                    h.y = Math.max(f.bottom - g.height, f.top);
                    d |= 2;
                }
                if (e & 8) {
                    d |= (h.y < f.top ? 64 : 0) | (h.y + g.height > f.bottom ? 128 : 0);
                }
                h = d;
            } else {
                h = 256;
            }
            if (h & 496) {
                return h;
            }
        }
        e = a;
        f =
            goog$userAgent$GECKO &&
            (goog$userAgent$detectedMac_ || goog$userAgent$detectedX11_) &&
            goog$userAgent$isVersion("1.9");
        if (e instanceof goog$math$Coordinate) {
            a = e.x;
            e = e.y;
        } else {
            a = e;
            e = undefined;
        }
        b.style.left = goog$style$getPixelStyleValue_(a, f);
        b.style.top = goog$style$getPixelStyleValue_(e, f);
        if (c != g && !(!c || !g ? 0 : c.width == g.width && c.height == g.height)) {
            a = goog$dom$DomHelper$isCss1CompatMode(goog$dom$getDomHelper(goog$dom$getOwnerDocument(b)));
            if (goog$userAgent$IE && (!a || !goog$userAgent$isVersion("8"))) {
                c = b.style;
                if (a) {
                    if (goog$userAgent$IE) {
                        a = goog$style$getIePixelValue_(b, goog$style$getCascadedStyle(b, "paddingLeft"));
                        f = goog$style$getIePixelValue_(b, goog$style$getCascadedStyle(b, "paddingRight"));
                        e = goog$style$getIePixelValue_(b, goog$style$getCascadedStyle(b, "paddingTop"));
                        d = goog$style$getIePixelValue_(b, goog$style$getCascadedStyle(b, "paddingBottom"));
                        a = new goog$math$Box(e, f, d, a);
                    } else {
                        a = goog$style$getComputedStyle(b, "paddingLeft");
                        f = goog$style$getComputedStyle(b, "paddingRight");
                        e = goog$style$getComputedStyle(b, "paddingTop");
                        d = goog$style$getComputedStyle(b, "paddingBottom");
                        a = new goog$math$Box(parseFloat(e), parseFloat(f), parseFloat(d), parseFloat(a));
                    }
                    if (goog$userAgent$IE) {
                        f = goog$style$getIePixelBorder_(b, "borderLeft");
                        e = goog$style$getIePixelBorder_(b, "borderRight");
                        d = goog$style$getIePixelBorder_(b, "borderTop");
                        b = goog$style$getIePixelBorder_(b, "borderBottom");
                        b = new goog$math$Box(d, e, b, f);
                    } else {
                        f = goog$style$getComputedStyle(b, "borderLeftWidth");
                        e = goog$style$getComputedStyle(b, "borderRightWidth");
                        d = goog$style$getComputedStyle(b, "borderTopWidth");
                        b = goog$style$getComputedStyle(b, "borderBottomWidth");
                        b = new goog$math$Box(parseFloat(d), parseFloat(e), parseFloat(b), parseFloat(f));
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
        return h;
    }
    function Hf() {}
    Hf.prototype.a = function () {};
    function If(a, b, c) {
        this.b = a;
        this.d = b;
        this.e = c;
    }
    A(If, Hf);
    If.prototype.a = function (a, b, c) {
        Ff(this.b, this.d, a, b, undefined, c, this.e);
    };
    function Jf(a, b) {
        this.b = a instanceof goog$math$Coordinate ? a : new goog$math$Coordinate(a, b);
    }
    A(Jf, Hf);
    Jf.prototype.a = function (a, b, c, d) {
        Ff(of(a), 0, a, b, this.b, c, null, d);
    };
    var goog$Timer$defaultTimerObject = goog$global.window;
    function Lf(a, b) {
        if (!ha(a)) {
            if (a && typeof a.handleEvent == "function") {
                a = goog$bind(a.handleEvent, a);
            } else {
                throw Error("Invalid listener argument");
            }
        }
        if (b > 2147483647) {
            return -1;
        } else {
            return goog$Timer$defaultTimerObject.setTimeout(a, b || 0);
        }
    }
    function Mf(a, b) {
        this.d = new Ue(this);
        this.Qa(a || null);
        if (b) {
            this.aa = b;
        }
    }
    A(Mf, Xe);
    Mf.prototype.w = null;
    Mf.prototype.ca = false;
    Mf.prototype.$a = -1;
    Mf.prototype.aa = "toggle_display";
    Mf.prototype.o = function () {
        return this.w;
    };
    Mf.prototype.Qa = function (a) {
        if (this.ca) {
            throw Error("Can not change this state of the popup while showing.");
        }
        this.w = a;
    };
    Mf.prototype.isVisible = function () {
        return this.ca;
    };
    Mf.prototype.setVisible = function (a) {
        if (this.A) {
            this.A.stop();
        }
        if (this.n) {
            this.n.stop();
        }
        if (a) {
            if (!this.ca && this.Oa()) {
                if (!this.w) {
                    throw Error("Caller must call setElement before trying to show the popup");
                }
                this.ta();
                a = goog$dom$getOwnerDocument(this.w);
                S(this.d, a, "mousedown", this.Ab, true);
                if (goog$userAgent$IE) {
                    var b;
                    try {
                        b = a.activeElement;
                    } catch (c) {}
                    while (b && b.nodeName == "IFRAME") {
                        try {
                            var d = b.contentDocument || b.contentWindow.document;
                        } catch (f) {
                            break;
                        }
                        a = d;
                        b = a.activeElement;
                    }
                    S(this.d, a, "mousedown", this.Ab, true);
                    S(this.d, a, "deactivate", this.zb);
                } else {
                    S(this.d, a, "blur", this.zb);
                }
                if (this.aa == "toggle_display") {
                    this.w.style.visibility = "visible";
                    U(this.w, true);
                } else if (this.aa == "move_offscreen") {
                    this.ta();
                }
                this.ca = true;
                if (this.A) {
                    Od(this.A, "end", this.Bb, false, this);
                    this.A.play();
                } else {
                    this.Bb();
                }
            }
        } else {
            Nf(this);
        }
    };
    Mf.prototype.ta = ba;
    function Nf(a, b) {
        if (
            a.ca &&
            a.dispatchEvent({
                type: "beforehide",
                target: b
            })
        ) {
            if (a.d) {
                var c = a.d;
                za(c.a, Rd);
                c.a.length = 0;
            }
            a.ca = false;
            goog$now();
            if (a.n) {
                Od(a.n, "end", goog$partial(a.sb, b), false, a);
                a.n.play();
            } else {
                a.sb(b);
            }
        }
    }
    Mf.prototype.sb = function (a) {
        if (this.aa == "toggle_display") {
            this.Rb();
        } else if (this.aa == "move_offscreen") {
            this.w.style.top = "-10000px";
        }
        this.Ta(a);
    };
    Mf.prototype.Rb = function () {
        this.w.style.visibility = "hidden";
        U(this.w, false);
    };
    Mf.prototype.Oa = function () {
        return this.dispatchEvent("beforeshow");
    };
    Mf.prototype.Bb = function () {
        this.$a = goog$now();
        this.dispatchEvent("show");
    };
    Mf.prototype.Ta = function (a) {
        this.dispatchEvent({
            type: "hide",
            target: a
        });
    };
    Mf.prototype.Ab = function (a) {
        a = a.target;
        if (!goog$dom$contains(this.w, a) && !(goog$now() - this.$a < 150)) {
            Nf(this, a);
        }
    };
    Mf.prototype.zb = function (a) {
        var b = goog$dom$getOwnerDocument(this.w);
        if (goog$userAgent$IE || eb) {
            a = b.activeElement;
            if (!a || goog$dom$contains(this.w, a) || a.tagName == "BODY") {
                return;
            }
        } else if (a.target != b) {
            return;
        }
        if (!(goog$now() - this.$a < 150)) {
            Nf(this);
        }
    };
    function Of(a, b) {
        this.N = b || undefined;
        Mf.call(this, a);
    }
    A(Of, Mf);
    Of.prototype.ta = function () {
        if (this.N) {
            var a = !this.isVisible() && this.aa != "move_offscreen";
            var b = this.o();
            if (a) {
                b.style.visibility = "hidden";
                U(b, true);
            }
            this.N.a(b, 4, this.qa);
            if (a) {
                U(b, false);
            }
        }
    };
    function Pf(a, b, c) {
        this.K = c || (a ? goog$dom$getDomHelper(goog$dom$getElement(a)) : goog$dom$getDomHelper());
        Of.call(
            this,
            this.K.b("div", {
                style: "position:absolute;display:none;"
            })
        );
        this.H = new goog$math$Coordinate(1, 1);
        this.j = new Ic();
        if (a) {
            c = a = goog$dom$getElement(a);
            Xb(this.j.a, Jc(c), c);
            N(a, "mouseover", this.Kb, false, this);
            N(a, "mouseout", this.qb, false, this);
            N(a, "mousemove", this.Jb, false, this);
            N(a, "focus", this.Ib, false, this);
            N(a, "blur", this.qb, false, this);
        }
        if (b != null) {
            a = this.o();
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
        }
    }
    A(Pf, Of);
    var Qf = [];
    Pf.prototype.s = null;
    Pf.prototype.className = "goog-tooltip";
    Pf.prototype.Qa = function (a) {
        var b = this.o();
        if (b) {
            goog$dom$removeNode(b);
        }
        Pf.B.Qa.call(this, a);
        if (a) {
            b = this.K.a.body;
            b.insertBefore(a, b.lastChild);
        }
    };
    function Rf(a) {
        if (a.b) {
            if (a.isVisible()) {
                return 4;
            } else {
                return 1;
            }
        } else if (a.e) {
            return 3;
        } else if (a.isVisible()) {
            return 2;
        } else {
            return 0;
        }
    }
    Pf.prototype.Oa = function () {
        if (!Mf.prototype.Oa.call(this)) {
            return false;
        }
        if (this.a) {
            for (var a, b = 0; (a = Qf[b]); b++) {
                if (!goog$dom$contains(a.o(), this.a)) {
                    a.setVisible(false);
                }
            }
        }
        if (!goog$array$contains(Qf, this)) {
            Qf.push(this);
        }
        a = this.o();
        a.className = this.className;
        Sf(this);
        N(a, "mouseover", this.ub, false, this);
        N(a, "mouseout", this.tb, false, this);
        Tf(this);
        return true;
    };
    Pf.prototype.Ta = function () {
        Da(Qf, this);
        var a = this.o();
        for (var b, c = 0; (b = Qf[c]); c++) {
            if (b.a && goog$dom$contains(a, b.a)) {
                b.setVisible(false);
            }
        }
        if (this.V) {
            Uf(this.V);
        }
        Pd(a, "mouseover", this.ub, false, this);
        Pd(a, "mouseout", this.tb, false, this);
        this.a = undefined;
        if (Rf(this) == 0) {
            this.t = false;
        }
        Mf.prototype.Ta.call(this);
    };
    Pf.prototype.rb = function (a, b) {
        if (this.a == a && this.j.contains(this.a)) {
            if (this.t || !this.ra) {
                this.setVisible(false);
                if (!this.isVisible()) {
                    this.a = a;
                    this.N = b || Vf(this, 0) || undefined;
                    if (this.isVisible()) {
                        this.ta();
                    }
                    this.setVisible(true);
                }
            } else {
                this.a = undefined;
            }
        }
        this.b = undefined;
    };
    Pf.prototype.Mb = function (a) {
        this.e = undefined;
        if (
            a == this.a &&
            (this.s == null || (this.s != this.o() && !this.j.contains(this.s))) &&
            (!this.W || !this.W.s)
        ) {
            this.setVisible(false);
        }
    };
    function Wf(a, b) {
        var c = Sb(a.K);
        a.H.x = b.clientX + c.x;
        a.H.y = b.clientY + c.y;
    }
    Pf.prototype.Kb = function (a) {
        var b = Xf(this, a.target);
        this.s = b;
        Sf(this);
        if (b != this.a) {
            this.a = b;
            if (!this.b) {
                this.b = Lf(goog$bind(this.rb, this, b, undefined), 500);
            }
            Yf(this);
            Wf(this, a);
        }
    };
    function Xf(a, b) {
        try {
            while (b && !a.j.contains(b)) {
                b = b.parentNode;
            }
            return b;
        } catch (c) {
            return null;
        }
    }
    Pf.prototype.Jb = function (a) {
        Wf(this, a);
        this.t = true;
    };
    Pf.prototype.Ib = function (a) {
        this.s = a = Xf(this, a.target);
        this.t = true;
        if (this.a != a) {
            this.a = a;
            var b = Vf(this, 1);
            Sf(this);
            if (!this.b) {
                this.b = Lf(goog$bind(this.rb, this, a, b), 500);
            }
            Yf(this);
        }
    };
    function Vf(a, b) {
        if (b == 0) {
            var c = a.H.k();
            return new Zf(c);
        }
        return new $f(a.s);
    }
    function Yf(a) {
        if (a.a) {
            for (var b, c = 0; (b = Qf[c]); c++) {
                if (goog$dom$contains(b.o(), a.a)) {
                    b.W = a;
                    a.V = b;
                }
            }
        }
    }
    Pf.prototype.qb = function (a) {
        var b = Xf(this, a.target);
        var c = Xf(this, a.relatedTarget);
        if (b != c) {
            if (b == this.s) {
                this.s = null;
            }
            Tf(this);
            this.t = false;
            if (this.isVisible() && (!a.relatedTarget || !goog$dom$contains(this.o(), a.relatedTarget))) {
                Uf(this);
            } else {
                this.a = undefined;
            }
        }
    };
    Pf.prototype.ub = function () {
        var a = this.o();
        if (this.s != a) {
            Sf(this);
            this.s = a;
        }
    };
    Pf.prototype.tb = function (a) {
        var b = this.o();
        if (this.s == b && (!a.relatedTarget || !goog$dom$contains(b, a.relatedTarget))) {
            this.s = null;
            Uf(this);
        }
    };
    function Tf(a) {
        if (a.b) {
            goog$Timer$defaultTimerObject.clearTimeout(a.b);
            a.b = undefined;
        }
    }
    function Uf(a) {
        if (Rf(a) == 2) {
            a.e = Lf(goog$bind(a.Mb, a, a.a), 0);
        }
    }
    function Sf(a) {
        if (a.e) {
            goog$Timer$defaultTimerObject.clearTimeout(a.e);
            a.e = undefined;
        }
    }
    function Zf(a, b) {
        Jf.call(this, a, b);
    }
    A(Zf, Jf);
    Zf.prototype.a = function (a, b, c) {
        b = of(a);
        b = sf(b);
        c = c ? new goog$math$Box(c.top + 10, c.right, c.bottom, c.left + 10) : new goog$math$Box(10, 0, 0, 10);
        if (goog$positioning$positionAtCoordinate(this.b, a, 4, c, b, 9) & 496) {
            goog$positioning$positionAtCoordinate(this.b, a, 4, c, b, 5);
        }
    };
    function $f(a) {
        If.call(this, a, 3);
    }
    A($f, If);
    $f.prototype.a = function (a, b, c) {
        var d = new goog$math$Coordinate(10, 0);
        if (Ff(this.b, this.d, a, b, d, c, 9) & 496) {
            Ff(this.b, 2, a, 1, d, c, 5);
        }
    };
    var ag = y("&#0171; Back");
    var bg = y("Help center");
    var cg = y("Go");
    var dg = y("Search help center");
    var eg = y("Help");
    y("Error.");
    function hhw$HelpPanel(a, b, c, d, f) {
        function e(a) {
            a.stopPropagation();
            a.preventDefault();
            W(this, "matchanchors");
            this.dispatchEvent(new X("backanchorclick", this, {}));
            a = [];
            a.push(new hcm$MetricsData("IP_HP_BACK_CLICKED"));
            fg(this, a);
        }
        function g(a) {
            a.stopPropagation();
            a.preventDefault();
            W(this, "inproductanchors");
            this.dispatchEvent(new X("backanchorclick", this, {}));
            a = [];
            a.push(new hcm$MetricsData("IP_HP_BACK_CLICKED"));
            fg(this, a);
        }
        this.N = [];
        this.jb(a);
        this.ib(b);
        this.kb(c || "");
        this.g = new Ue(this);
        this.N.push(this.g);
        this.Fb = goog$dom$createDom("div", "help-Helpwidgets-HelpPanel-Title-Spacer");
        this.d = goog$dom$createDom("div");
        S(this.g, this.d, "click", function () {
            this.sa(!Af(this.J));
        });
        U(this.d, false);
        this.eb = goog$dom$createDom("div", "help-Helpwidgets-HelpPanel-Expand-Collapse-Container", this.d);
        this.ra = goog$dom$createDom("div", "help-Helpwidgets-HelpPanel-Title");
        this.ha(eg);
        this.gb = goog$dom$createDom("div", "help-Helpwidgets-HelpPanel-Title-Section", this.eb, this.ra);
        this.bb = goog$dom$createDom("div", "help-Helpwidgets-HelpPanel-Loading-Section");
        this.m = goog$dom$createDom("div", "help-Helpwidgets-HelpPanel-Inproduct-Anchors-Section");
        this.e = goog$dom$createDom("div", "help-Helpwidgets-HelpPanel-Match-Anchors-Section");
        this.I = goog$dom$createDom("div", "help-Helpwidgets-HelpPanel-Inproduct-Content-Section");
        this.V = goog$dom$createDom("div", "help-Helpwidgets-HelpPanel-Match-Content-Section");
        this.J = goog$dom$createDom(
            "div",
            "help-Helpwidgets-HelpPanel-Expand-Collapse-Section",
            this.bb,
            this.m,
            this.e,
            this.I,
            this.V
        );
        this.qa = goog$dom$createDom("div", "help-Helpwidgets-HelpPanel-Scroll-Section", this.J);
        this.t = goog$dom$createDom("div", "help-Helpwidgets-HelpPanel-Lower-Content-Section");
        this.H = goog$dom$createDom("a", {
            className: gg(),
            href: "#"
        });
        S(this.g, this.H, "click", g);
        this.A = goog$dom$createDom("a", {
            className: gg(),
            href: "#"
        });
        S(this.g, this.A, "click", g);
        this.Ha = goog$dom$createDom("a", {
            className: gg(),
            href: "#"
        });
        S(this.g, this.Ha, "click", e);
        this.pa = goog$dom$createDom("a", {
            className: gg(),
            href: "#"
        });
        S(this.g, this.pa, "click", e);
        this.hb(ag);
        this.W = goog$dom$createDom("a", {
            className: "help-Helpwidgets-HelpPanel-Help-Center-Anchor",
            href: "#"
        });
        this.Ia(bg);
        S(this.g, this.W, "click", function (a) {
            a.stopPropagation();
            a.preventDefault();
            cd(hd(this.r, this.q, this.h, null, this.ab), this.ga);
            this.dispatchEvent(new X("helpcenteranchorclick", this, {}));
            a = [];
            a.push(new hcm$MetricsData("IP_HP_HELP_CENTER_CLICKED"));
            fg(this, a);
            hg(this, "IP_HP_HELP_CENTER_CLICKED");
        });
        this.n = goog$dom$createDom("div", ig(), this.W);
        this.j = goog$dom$createDom("div", "help-Helpwidgets-HelpPanel-Bottom-Content-Section");
        this.a = goog$dom$createDom("input", {
            type: "text"
        });
        this.lb(15);
        this.Ka(dg);
        jg(this, false);
        S(this.g, this.a, "blur", function () {
            jg(this, false);
        });
        S(this.g, this.a, "focus", function () {
            jg(this, true);
        });
        a = new af(this.a);
        this.N.push(a);
        S(this.g, a, "key", function (a) {
            if (a.keyCode == 13) {
                a.stopPropagation();
                a.preventDefault();
                this.ia.click();
            }
        });
        this.ia = goog$dom$createDom("input", {
            className: "help-Helpwidgets-HelpPanel-Search-Button",
            type: "button"
        });
        this.Ja(cg);
        S(this.g, this.ia, "click", this.cb);
        this.fb = goog$dom$createDom("div", "help-Helpwidgets-HelpPanel-Search-Section", this.a, this.ia);
        this.b = d || goog$dom$createDom("div");
        this.b.className = "help-Helpwidgets-HelpPanel";
        if (this.h && gf.test(this.h)) {
            this.b.setAttribute("dir", "rtl");
            kf(this.b, {
                "text-align": "right"
            });
            this.eb.style[goog$userAgent$IE ? "styleFloat" : "cssFloat"] = "left";
        }
        if (f) {
            f.appendChild(this.b);
        }
        W(this, "none");
        this.sa(true);
        this.b.appendChild(this.Fb);
        this.b.appendChild(this.gb);
        this.b.appendChild(this.qa);
        this.b.appendChild(this.t);
        this.b.appendChild(this.n);
        this.b.appendChild(this.j);
        this.b.appendChild(this.fb);
        S(this.g, window, "resize", this.X);
    }
    A(hhw$HelpPanel, Xe);
    var kg = ["answer_id", "guidedhelp", "inproduct_target", "name", "question"];
    var lg = ["answer", "answer_id", "inproduct", "name", "question"];
    hhw$HelpPanel.prototype.r = "";
    hhw$HelpPanel.prototype.q = "";
    hhw$HelpPanel.prototype.h = null;
    hhw$HelpPanel.prototype.Da = null;
    hhw$HelpPanel.prototype.Ba = false;
    hhw$HelpPanel.prototype.Ca = false;
    hhw$HelpPanel.prototype.O = 10000;
    hhw$HelpPanel.prototype.Ra = true;
    hhw$HelpPanel.prototype.Ga = 800;
    hhw$HelpPanel.prototype.Sa = -1;
    hhw$HelpPanel.prototype.yb = true;
    hhw$HelpPanel.prototype.Ya = false;
    hhw$HelpPanel.prototype.fa = null;
    hhw$HelpPanel.prototype.ea = null;
    hhw$HelpPanel.prototype.ga = null;
    function mg() {
        return "help-Helpwidgets-HelpPanel-Inproduct-Content";
    }
    function ng() {
        return "help-Helpwidgets-HelpPanel-Back-Anchor-Section";
    }
    function gg() {
        return "help-Helpwidgets-HelpPanel-Back-Anchor";
    }
    function ig() {
        return "help-Helpwidgets-HelpPanel-Help-Center-Anchor-Section";
    }
    function og() {
        return "help-Helpwidgets-HelpPanel-Help-Center-Anchor-Section-Border";
    }
    function pg() {
        return "help-Helpwidgets-HelpPanel-Search-Text-Box-Active";
    }
    function fg(a, b) {
        var c = id(a.r, a.q, a.h);
        a.dispatchEvent(
            new X("beforerecordmetrics", a, {
                metricsUrl: c
            })
        );
        var d = hcm$recordMetrics(c, b);
        a.dispatchEvent(
            new X("recordmetricssuccess", a, {
                metricsUrl: c,
                mtrcs: d
            })
        );
    }
    function hg(a, b, c) {
        var d = [];
        d.push(b);
        if (c) {
            d.push("_");
            d.push(c);
        }
        a.ab = d.join("");
    }
    function W(a, b) {
        U(a.m, b == "inproductanchors");
        U(a.e, b == "matchanchors");
        U(a.I, b == "inproductcontent");
        U(a.V, b == "matchcontent");
        U(a.bb, b == "loading");
        if (b == "none") {
            a.n.className = ig();
        } else if (Af(a.J)) {
            a.n.className = og();
        }
        a.X();
    }
    function qg(a, b, c, d, f) {
        if (d) {
            goog$dom$removeChildren(b);
        }
        var d = f || null;
        for (var f = a.Sa, f = f < 0 || f >= c.length ? c.length : f, e = 0; e < f; ++e) {
            var g = c[e];
            if (bd(g)) {
                if (g.inproduct) {
                    var h = goog$dom$createDom("div", {
                        className: mg(),
                        innerHTML: g.inproduct
                    });
                    S(a.g, h, "click", Te(a.r, a.q, a.h, a.Da, a.Ba, a.Ca));
                    S(a.g, h, "click", dd(a.h));
                    if (a.fa && a.ea != null) {
                        a.fa.Ua(a.ea, h);
                    }
                    b.appendChild(h);
                    if (d) {
                        d.push(new hcm$MetricsData("IP_HP_INPRODUCT_HTML_VIEWED", g.answerId.toString()));
                    }
                } else {
                    h = goog$dom$createDom("a", {
                        className: "help-Helpwidgets-HelpPanel-Inproduct-Anchor",
                        href: "#",
                        innerHTML: bd(g)
                    });
                    if (g.inproductTarget) {
                        rg(a, h, g);
                    } else if (g.guidedHelp) {
                        sg(a, h, g);
                    } else {
                        tg(a, h, g, a.H, a.A);
                    }
                    h = goog$dom$createDom(
                        "div",
                        a.t == b
                            ? "help-Helpwidgets-HelpPanel-Lower-Content-Anchor-Section"
                            : a.j == b
                              ? "help-Helpwidgets-HelpPanel-Bottom-Content-Anchor-Section"
                              : "help-Helpwidgets-HelpPanel-Inproduct-Anchor-Section",
                        h
                    );
                    if (g.inproductTarget) {
                        var j = goog$dom$createDom("span", {
                            innerHTML: "&nbsp;"
                        });
                        h.appendChild(j);
                        j = goog$dom$createDom("span", {
                            className: "help-Helpwidgets-HelpPanel-New-Window",
                            innerHTML: "&nbsp;"
                        });
                        h.appendChild(j);
                    } else if (g.guidedHelp) {
                        j = goog$dom$createDom("span", {
                            innerHTML: "&nbsp;"
                        });
                        h.appendChild(j);
                        j = goog$dom$createDom("span", {
                            className: "help-Helpwidgets-HelpPanel-Guided-Help-Teaser",
                            innerHTML: "&nbsp;"
                        });
                        h.appendChild(j);
                    }
                    b.appendChild(h);
                }
                if (d) {
                    d.push(new hcm$MetricsData("IP_HP_ANSWER_LOADED", g.answerId.toString()));
                }
            } else {
                K("Answer " + g.answerId + " has invalid question text: " + bd(g));
            }
        }
        if (a.m == b) {
            if (a.m.firstChild) {
                W(a, "inproductanchors");
                U(a.d, a.Ra);
            } else {
                W(a, "none");
                U(a.d, false);
            }
        }
        if (d && d.length > 0) {
            fg(a, d);
        }
    }
    function rg(a, b, c) {
        var d = c.inproductTarget || "";
        if (d.indexOf("/") == 0) {
            d = hd(a.r, a.q, a.h, c.inproductTarget);
        } else if (a.h) {
            var f = "?";
            if (d.indexOf("?") >= 0) {
                f = "&";
            }
            d = [d, f, "hl=", a.h].join("");
        }
        S(a.g, b, "click", function (a) {
            a.stopPropagation();
            a.preventDefault();
            cd(d, this.ga);
            this.dispatchEvent(
                new X("inproducttargetclick", this, {
                    answerId: c.answerId
                })
            );
            a = [];
            a.push(new hcm$MetricsData("IP_HP_INPRODUCT_TARGET_CLICKED", c.answerId.toString()));
            fg(this, a);
            hg(this, "IP_HP_INPRODUCT_TARGET_CLICKED", c.answerId.toString());
        });
    }
    function sg(a, b, c) {
        S(a.g, b, "click", function (a) {
            a.stopPropagation();
            a.preventDefault();
            hgb$loadFlow(c.answerId, this.r, this.q, this.h, this.Da, this.Ba, this.Ca, null);
            this.dispatchEvent(
                new X("guidedhelpanchorclick", this, {
                    answerId: c.answerId
                })
            );
            hg(this, "IP_HP_GUIDED_HELP_CLICKED", c.answerId.toString());
        });
    }
    function tg(a, b, c, d, f) {
        S(a.g, b, "click", function (a) {
            a.stopPropagation();
            a.preventDefault();
            W(this, "loading");
            goog$dom$removeChildren(this.I);
            a = goog$dom$createDom(
                "div",
                {
                    className: ng()
                },
                d
            );
            this.I.appendChild(a);
            this.dispatchEvent(
                new X("beforeanswerload", this, {
                    answerId: c.answerId
                })
            );
            hchas$getAnswerById(
                c.answerId,
                this.r,
                this.q,
                goog$bind(function (a, b) {
                    this.dispatchEvent(
                        new X("answerloadsuccess", this, {
                            answerId: a.answerId,
                            fromCache: b
                        })
                    );
                    if (this.yb) {
                        var c = bd(a);
                        if (c) {
                            c = goog$dom$createDom("div", {
                                className: "help-Helpwidgets-HelpPanel-Inproduct-Question",
                                innerHTML: c
                            });
                            this.I.appendChild(c);
                        } else {
                            K("Answer " + a.answerId + " has invalid question text: " + c);
                        }
                    }
                    c = goog$dom$createDom("div", {
                        className: mg(),
                        innerHTML: a.inproduct || a.answerContent || ""
                    });
                    this.I.appendChild(c);
                    S(this.g, c, "click", Te(this.r, this.q, this.h, this.Da, this.Ba, this.Ca));
                    S(this.g, c, "click", dd(this.h));
                    if (this.fa && this.ea != null) {
                        this.fa.Ua(this.ea, c);
                    }
                    c = goog$dom$createDom(
                        "div",
                        {
                            className: ng()
                        },
                        f
                    );
                    this.I.appendChild(c);
                    W(this, "inproductcontent");
                    if (!b) {
                        c = [];
                        c.push(new hcm$MetricsData("IP_HP_INPRODUCT_HTML_VIEWED", a.answerId.toString()));
                        fg(this, c);
                    }
                    hg(this, "IP_HP_INPRODUCT_HTML_VIEWED", a.answerId.toString());
                }, this),
                this.h,
                lg,
                goog$bind(function (a, b) {
                    var d = "Timed out while calling " + b;
                    K(d);
                    this.dispatchEvent(
                        new X("answerloadfailed", this, {
                            answerId: c.answerId,
                            error: d
                        })
                    );
                    W(this, "inproductcontent");
                }, this),
                this.O
            );
            this.dispatchEvent(
                new X("inproductanchorclick", this, {
                    answerId: c.answerId
                })
            );
        });
    }
    function ug(a, b, c) {
        goog$dom$removeChildren(a.e);
        c = c || null;
        if (a.m.firstChild) {
            var d = goog$dom$createDom(
                "div",
                {
                    className: ng()
                },
                a.H
            );
            a.e.appendChild(d);
        }
        for (var d = a.Sa, d = d < 0 || d >= b.length ? b.length : d, f = 0; f < d; ++f) {
            var e = b[f];
            if (e.title) {
                var g = goog$dom$createDom("a", {
                    className: "help-Helpwidgets-HelpPanel-Match-Anchor",
                    href: "#",
                    innerHTML: e.title
                });
                if (e.snippet && e.url) {
                    var h = new Pf(g);
                    a.N.push(h);
                    var j = h.o();
                    if (j) {
                        goog$dom$append(
                            j,
                            goog$dom$createDom("div", {
                                className: "help-Helpwidgets-HelpPanel-Match-Tooltip-content-html",
                                innerHTML: e.snippet.replace(/< *\/* *br *\/* *>/gi, " ")
                            })
                        );
                        if (a.h && gf.test(a.h)) {
                            j.setAttribute("dir", "rtl");
                            kf(j, {
                                "text-align": "right"
                            });
                        }
                        S(a.g, g, "click", function () {
                            h.setVisible(false);
                        });
                    }
                }
                vg(a, g, e);
                g = goog$dom$createDom("div", "help-Helpwidgets-HelpPanel-Match-Anchor-Section", g);
                a.e.appendChild(g);
                if (c) {
                    if (e.answerId) {
                        c.push(new hcm$MetricsData("IP_HP_ANSWER_LOADED", e.answerId.toString()));
                    } else if (e.topicId) {
                        c.push(new hcm$MetricsData("IP_HP_TOPIC_LOADED", e.topicId.toString()));
                    }
                }
            } else {
                K("Match has invalid title text: " + e.title);
            }
        }
        if (a.m.firstChild) {
            b = goog$dom$createDom(
                "div",
                {
                    className: ng()
                },
                a.A
            );
            a.e.appendChild(b);
        }
        if (a.e.firstChild) {
            W(a, "matchanchors");
            U(a.d, a.Ra);
        } else {
            W(a, "none");
            U(a.d, false);
        }
        if (c && c.length > 0) {
            fg(a, c);
        }
    }
    function vg(a, b, c) {
        if (!a.Ya && c.answerId) {
            var d = function (a) {
                a.stopPropagation();
                a.preventDefault();
                cd(c.url, this.ga);
            };
            S(a.g, b, "click", d);
            hchas$getAnswerById(
                c.answerId,
                a.r,
                a.q,
                goog$bind(function (a) {
                    if (a.inproduct) {
                        We(this.g, b, "click", d);
                        tg(this, b, a, this.Ha, this.pa);
                    }
                }, a),
                a.h,
                lg,
                goog$bind(function (a, b) {
                    K("Timed out while calling " + b);
                }, a),
                a.O
            );
        } else {
            S(a.g, b, "click", function (a) {
                a.stopPropagation();
                a.preventDefault();
                if (!this.Ya && c.topicId) {
                    this.Ea(c.topicId, true, true);
                } else {
                    cd(c.url, this.ga);
                }
            });
        }
    }
    function jg(a, b) {
        var c = a.a.value;
        if (b) {
            a.a.className = pg();
            if (c == a.K) {
                a.a.value = "";
            }
        } else if (!c || c == a.K) {
            a.a.className = "help-Helpwidgets-HelpPanel-Search-Text-Box";
            a.a.value = a.K;
        } else {
            a.a.className = pg();
        }
    }
    function wg(a, b, c, d, f) {
        if (c && a.m == f) {
            W(a, "loading");
        }
        a.dispatchEvent(
            new X("beforeanswerload", a, {
                answerId: b
            })
        );
        hchas$getAnswerById(
            b,
            a.r,
            a.q,
            goog$bind(function (a, g) {
                this.dispatchEvent(
                    new X("answerloadsuccess", this, {
                        answerId: b,
                        fromCache: g
                    })
                );
                if (c) {
                    qg(this, f, [a], c && d, g ? null : []);
                    hg(this, "IP_HP_ANSWER_LOADED", b.toString());
                }
            }, a),
            a.h,
            kg,
            goog$bind(function (a, d) {
                var h = "Timed out while calling " + d;
                K(h);
                this.dispatchEvent(
                    new X("answerloadfailed", this, {
                        answerId: b,
                        error: h
                    })
                );
                if (c && this.m == f) {
                    W(this, "none");
                }
            }, a),
            a.O
        );
    }
    function xg(a, b, c, d, f) {
        if (c && a.m == f) {
            W(a, "loading");
        }
        a.dispatchEvent(
            new X("beforetopicload", a, {
                topicId: b
            })
        );
        hchas$getTopicById(
            b,
            a.r,
            a.q,
            goog$bind(function (a, g) {
                this.dispatchEvent(
                    new X("topicloadsuccess", this, {
                        topicId: b,
                        fromCache: g
                    })
                );
                if (c) {
                    var h = g ? null : [];
                    if (h) {
                        h.push(new hcm$MetricsData("IP_HP_TOPIC_LOADED", b.toString()));
                    }
                    qg(this, f, a.answersArr, c && d, h);
                    hg(this, "IP_HP_TOPIC_LOADED", b.toString());
                }
            }, a),
            a.h,
            kg,
            goog$bind(function (a, d) {
                var h = "Timed out while calling " + d;
                K(h);
                this.dispatchEvent(
                    new X("topicloadfailed", this, {
                        topicId: b,
                        error: h
                    })
                );
                if (c && this.m == f) {
                    W(this, "none");
                }
            }, a),
            a.O
        );
    }
    function yg(a, b, c, d, f) {
        if (c && a.m == f) {
            W(a, "loading");
        }
        a.dispatchEvent(
            new X("beforeusercontextload", a, {
                userContext: b
            })
        );
        hchas$getAnswersByUserContext(
            b,
            a.r,
            a.q,
            goog$bind(function (a, g) {
                this.dispatchEvent(
                    new X("usercontextloadsuccess", this, {
                        userContext: b,
                        fromCache: g
                    })
                );
                if (c) {
                    var h = g ? null : [];
                    if (h) {
                        h.push(new hcm$MetricsData("IP_HP_USER_CONTEXT_LOADED", b));
                    }
                    qg(this, f, a, c && d, h);
                    hg(this, "IP_HP_USER_CONTEXT_LOADED", b);
                }
            }, a),
            a.h,
            kg,
            goog$bind(function (a, d) {
                var h = "Timed out while calling " + d;
                K(h);
                this.dispatchEvent(
                    new X("usercontextloadfailed", this, {
                        userContext: b,
                        error: h
                    })
                );
                if (c && this.m == f) {
                    W(this, "none");
                }
            }, a),
            a.O
        );
    }
    hhw$HelpPanel.prototype.Xa = function (a, b) {
        S(this.g, this, a, function (a) {
            b(a);
        });
    };
    hhw$HelpPanel.prototype.jb = function (a) {
        this.r = a;
    };
    hhw$HelpPanel.prototype.ib = function (a) {
        this.q = a;
    };
    hhw$HelpPanel.prototype.kb = function (a) {
        this.h = a;
    };
    hhw$HelpPanel.prototype.vc = function (a) {
        this.Da = a;
    };
    hhw$HelpPanel.prototype.tc = function (a) {
        this.Ba = a;
    };
    hhw$HelpPanel.prototype.uc = function (a) {
        this.Ca = a;
    };
    hhw$HelpPanel.prototype.Bc = function (a) {
        U(this.gb, a);
    };
    hhw$HelpPanel.prototype.ha = function (a) {
        this.ra.innerHTML = a;
    };
    hhw$HelpPanel.prototype.sa = function (a) {
        U(this.J, a);
        if (a) {
            this.d.className = "help-Helpwidgets-HelpPanel-Collapse";
            if (this.J.offsetHeight > 0) {
                this.n.className = og();
            }
        } else {
            this.d.className = "help-Helpwidgets-HelpPanel-Expand";
            this.n.className = ig();
        }
        this.dispatchEvent(
            new X("expandcollapseclick", this, {
                expanded: a
            })
        );
        this.X();
    };
    hhw$HelpPanel.prototype.hb = function (a) {
        this.H.innerHTML = a;
        this.A.innerHTML = a;
        this.Ha.innerHTML = a;
        this.pa.innerHTML = a;
    };
    hhw$HelpPanel.prototype.Wb = function (a) {
        this.t.appendChild(a);
    };
    hhw$HelpPanel.prototype.wc = function (a) {
        U(this.n, a);
    };
    hhw$HelpPanel.prototype.Ia = function (a) {
        this.W.innerHTML = a;
    };
    hhw$HelpPanel.prototype.xb = function (a) {
        this.ga = a;
    };
    hhw$HelpPanel.prototype.Vb = function (a) {
        this.j.appendChild(a);
    };
    hhw$HelpPanel.prototype.zc = function (a) {
        U(this.fb, a);
    };
    hhw$HelpPanel.prototype.lb = function (a) {
        this.a.size = a;
    };
    hhw$HelpPanel.prototype.Ka = function (a) {
        this.K = a;
        this.a.value = a;
    };
    hhw$HelpPanel.prototype.Ja = function (a) {
        this.ia.value = a;
    };
    hhw$HelpPanel.prototype.bc = function () {
        return this.b;
    };
    hhw$HelpPanel.prototype.dc = function () {
        return this.a;
    };
    hhw$HelpPanel.prototype.cc = function () {
        return this.ia;
    };
    hhw$HelpPanel.prototype.Ac = function (a) {
        this.O = a;
    };
    hhw$HelpPanel.prototype.X = function () {
        kf(this.qa, "maxHeight", this.Ga + "px");
        var a = Ib(window).height;
        var a = this.Ga > 5 ? Math.min(this.Ga - 5, a) : a;
        var a = Math.min(a, Af(this.J) && (Af(this.I) || Af(this.V)) ? this.J.offsetHeight + 20 : this.J.offsetHeight);
        var a = a + vf(this.qa).y + 20;
        var b = this.A;
        U(b, true);
        U(b, a < vf(b).y);
        b = this.pa;
        U(b, true);
        U(b, a < vf(b).y);
    };
    hhw$HelpPanel.prototype.$b = function () {
        S(this.g, window, "scroll", this.X);
    };
    hhw$HelpPanel.prototype.Dc = function (a) {
        this.Ra = a;
        U(this.d, a && this.m.firstChild);
    };
    hhw$HelpPanel.prototype.yc = function (a) {
        this.Ga = a;
        this.X();
    };
    hhw$HelpPanel.prototype.xc = function (a) {
        this.Sa = a;
    };
    hhw$HelpPanel.prototype.Fc = function (a) {
        this.yb = a;
    };
    hhw$HelpPanel.prototype.Ec = function (a) {
        var b = kg[kg.length - 1] == "inproduct";
        if (a && !b) {
            kg.push("inproduct");
        } else if (!a && b) {
            kg.length -= 1;
        }
    };
    hhw$HelpPanel.prototype.oc = function (a) {
        this.Ya = a;
    };
    hhw$HelpPanel.prototype.Zb = function (a, b, c) {
        this.ea = a;
        this.fa = new cs$Operator(b);
        if (c) {
            this.fa.Cb(this.ea, c);
        }
    };
    hhw$HelpPanel.prototype.hc = function (a, b, c) {
        wg(this, a, b, c, this.m);
    };
    hhw$HelpPanel.prototype.jc = function (a, b, c) {
        wg(this, a, b, c, this.t);
    };
    hhw$HelpPanel.prototype.ec = function (a, b, c) {
        wg(this, a, b, c, this.j);
    };
    hhw$HelpPanel.prototype.Ea = function (a, b, c) {
        xg(this, a, b, c, this.m);
    };
    hhw$HelpPanel.prototype.kc = function (a, b, c) {
        xg(this, a, b, c, this.t);
    };
    hhw$HelpPanel.prototype.fc = function (a, b, c) {
        xg(this, a, b, c, this.j);
    };
    hhw$HelpPanel.prototype.ic = function (a, b, c) {
        yg(this, a, b, c, this.m);
    };
    hhw$HelpPanel.prototype.lc = function (a, b, c) {
        yg(this, a, b, c, this.t);
    };
    hhw$HelpPanel.prototype.gc = function (a, b, c) {
        yg(this, a, b, c, this.j);
    };
    hhw$HelpPanel.prototype.cb = function () {
        var a = this.a.value;
        if (a == this.K) {
            a = "";
        }
        W(this, "loading");
        this.dispatchEvent(
            new X("beforematchesload", this, {
                searchQuery: a
            })
        );
        this.sa(true);
        hchas$getMatchesBySearchQuery(
            a,
            this.r,
            this.q,
            goog$bind(function (b, c) {
                this.dispatchEvent(
                    new X("matchesloadsuccess", this, {
                        searchQuery: a,
                        fromCache: c
                    })
                );
                var d = c ? null : [];
                if (!c) {
                    d.push(new hcm$MetricsData("IP_HP_HELP_QUERY", a));
                }
                ug(this, b, d);
            }, this),
            this.h,
            this.ab,
            goog$bind(function (b, c) {
                var d = "Timed out while calling " + c;
                K(d);
                this.dispatchEvent(
                    new X("matchesloadfailed", this, {
                        searchQuery: a,
                        error: d
                    })
                );
                ug(this, []);
            }, this),
            this.O
        );
    };
    function X(a, b, c) {
        Dd.call(this, a, b);
        this.data = c;
    }
    A(X, Dd);
    goog$exportSymbol("hhw.HelpPanel", hhw$HelpPanel);
    hhw$HelpPanel.prototype.addHelpPanelEventListener = hhw$HelpPanel.prototype.Xa;
    hhw$HelpPanel.prototype.setHelpHost = hhw$HelpPanel.prototype.jb;
    hhw$HelpPanel.prototype.setHelpCenterUri = hhw$HelpPanel.prototype.ib;
    hhw$HelpPanel.prototype.setLocaleName = hhw$HelpPanel.prototype.kb;
    hhw$HelpPanel.prototype.setGuidedHelpProduct = hhw$HelpPanel.prototype.vc;
    hhw$HelpPanel.prototype.setGuidedHelpDebug = hhw$HelpPanel.prototype.tc;
    hhw$HelpPanel.prototype.setGuidedHelpDontUseLocal = hhw$HelpPanel.prototype.uc;
    hhw$HelpPanel.prototype.setTitleSectionDisplay = hhw$HelpPanel.prototype.Bc;
    hhw$HelpPanel.prototype.setTitleText = hhw$HelpPanel.prototype.ha;
    hhw$HelpPanel.prototype.expandContent = hhw$HelpPanel.prototype.sa;
    hhw$HelpPanel.prototype.setBackAnchorText = hhw$HelpPanel.prototype.hb;
    hhw$HelpPanel.prototype.addLowerContentSectionElement = hhw$HelpPanel.prototype.Wb;
    hhw$HelpPanel.prototype.setHelpCenterAnchorSectionDisplay = hhw$HelpPanel.prototype.wc;
    hhw$HelpPanel.prototype.setHelpCenterAnchorText = hhw$HelpPanel.prototype.Ia;
    hhw$HelpPanel.prototype.setHelpCenterAnchorWindowOptions = hhw$HelpPanel.prototype.xb;
    hhw$HelpPanel.prototype.addBottomContentSectionElement = hhw$HelpPanel.prototype.Vb;
    hhw$HelpPanel.prototype.setSearchSectionDisplay = hhw$HelpPanel.prototype.zc;
    hhw$HelpPanel.prototype.setSearchTextBoxSize = hhw$HelpPanel.prototype.lb;
    hhw$HelpPanel.prototype.setSearchTextBoxInactiveText = hhw$HelpPanel.prototype.Ka;
    hhw$HelpPanel.prototype.setSearchButtonText = hhw$HelpPanel.prototype.Ja;
    hhw$HelpPanel.prototype.getHelpPanelElement = hhw$HelpPanel.prototype.bc;
    hhw$HelpPanel.prototype.getSearchTextBoxElement = hhw$HelpPanel.prototype.dc;
    hhw$HelpPanel.prototype.getSearchButtonElement = hhw$HelpPanel.prototype.cc;
    hhw$HelpPanel.prototype.setTimeoutMs = hhw$HelpPanel.prototype.Ac;
    hhw$HelpPanel.prototype.updateLayout = hhw$HelpPanel.prototype.X;
    hhw$HelpPanel.prototype.enableUpdateLayoutOnScroll = hhw$HelpPanel.prototype.$b;
    hhw$HelpPanel.prototype.showExpandCollapseElement = hhw$HelpPanel.prototype.Dc;
    hhw$HelpPanel.prototype.setMaxScrollHeight = hhw$HelpPanel.prototype.yc;
    hhw$HelpPanel.prototype.setMaxInproductAnchors = hhw$HelpPanel.prototype.xc;
    hhw$HelpPanel.prototype.showQuestionWithInproductContent = hhw$HelpPanel.prototype.Fc;
    hhw$HelpPanel.prototype.showInproductContentDirectly = hhw$HelpPanel.prototype.Ec;
    hhw$HelpPanel.prototype.openMatchesInNewWindow = hhw$HelpPanel.prototype.oc;
    hhw$HelpPanel.prototype.enableChatSupport = hhw$HelpPanel.prototype.Zb;
    hhw$HelpPanel.prototype.loadByAnswerId = hhw$HelpPanel.prototype.hc;
    hhw$HelpPanel.prototype.loadLowerContentSectionByAnswerId = hhw$HelpPanel.prototype.jc;
    hhw$HelpPanel.prototype.loadBottomContentSectionByAnswerId = hhw$HelpPanel.prototype.ec;
    hhw$HelpPanel.prototype.loadByTopicId = hhw$HelpPanel.prototype.Ea;
    hhw$HelpPanel.prototype.loadLowerContentSectionByTopicId = hhw$HelpPanel.prototype.kc;
    hhw$HelpPanel.prototype.loadBottomContentSectionByTopicId = hhw$HelpPanel.prototype.fc;
    hhw$HelpPanel.prototype.loadByUserContext = hhw$HelpPanel.prototype.ic;
    hhw$HelpPanel.prototype.loadLowerContentSectionByUserContext = hhw$HelpPanel.prototype.lc;
    hhw$HelpPanel.prototype.loadBottomContentSectionByUserContext = hhw$HelpPanel.prototype.gc;
    hhw$HelpPanel.prototype.doSearch = hhw$HelpPanel.prototype.cb;
    function zg(a, b) {
        if (a.dataset) {
            return a.dataset[
                Ag[b] ||
                    (Ag[b] = String(b).replace(/\-([a-z])/g, function (a, b) {
                        return b.toUpperCase();
                    }))
            ];
        } else {
            return a.getAttribute("data-" + b);
        }
    }
    var Ag = {};
    var yt$dom$getNextId_ = goog$getObjectByName("yt.dom.getNextId_");
    if (!yt$dom$getNextId_) {
        yt$dom$getNextId_ = function () {
            return ++Cg;
        };
        goog$exportSymbol("yt.dom.getNextId_", yt$dom$getNextId_);
        var Cg = 0;
    }
    function Dg(a) {
        if ((a = a || window.event)) {
            for (var b in a) {
                if (!(b in Eg)) {
                    this[b] = a[b];
                }
            }
            this.U = a;
            if ((b = a.target || a.srcElement) && b.nodeType == 3) {
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
            this.clientX = a.clientX != undefined ? a.clientX : a.pageX;
            this.clientY = a.clientY != undefined ? a.clientY : a.pageY;
            if (document.body && document.documentElement) {
                b = document.body.scrollLeft + document.documentElement.scrollLeft;
                var d = document.body.scrollTop + document.documentElement.scrollTop;
                this.pageX = a.pageX != undefined ? a.pageX : a.clientX + b;
                this.pageY = a.pageY != undefined ? a.pageY : a.clientY + d;
            }
            this.keyCode = a.keyCode ? a.keyCode : a.which;
            this.charCode = a.charCode || (this.type == "keypress" ? this.keyCode : 0);
            this.altKey = a.altKey;
            this.ctrlKey = a.ctrlKey;
            this.shiftKey = a.shiftKey;
            if (this.type == "MozMousePixelScroll") {
                this.wheelDeltaX = a.axis == a.HORIZONTAL_AXIS ? a.detail : 0;
                this.wheelDeltaY = a.axis == a.HORIZONTAL_AXIS ? 0 : a.detail;
            } else if (window.opera) {
                this.wheelDeltaX = 0;
                this.wheelDeltaY = a.detail;
            } else if (a.wheelDelta % 120 == 0) {
                if ("WebkitTransform" in document.documentElement.style) {
                    if (window.d && navigator.platform.indexOf("Mac") == 0) {
                        this.wheelDeltaX = a.wheelDeltaX / -30;
                        this.wheelDeltaY = a.wheelDeltaY / -30;
                    } else {
                        this.wheelDeltaX = a.wheelDeltaX / -1.2;
                        this.wheelDeltaY = a.wheelDeltaY / -1.2;
                    }
                } else {
                    this.wheelDeltaX = 0;
                    this.wheelDeltaY = a.wheelDelta / -1.6;
                }
            } else {
                this.wheelDeltaX = a.wheelDeltaX / -3;
                this.wheelDeltaY = a.wheelDeltaY / -3;
            }
        }
    }
    Dg.prototype.U = null;
    Dg.prototype.type = "";
    Dg.prototype.target = null;
    Dg.prototype.relatedTarget = null;
    Dg.prototype.currentTarget = null;
    Dg.prototype.data = null;
    Dg.prototype.keyCode = 0;
    Dg.prototype.charCode = 0;
    Dg.prototype.altKey = false;
    Dg.prototype.ctrlKey = false;
    Dg.prototype.shiftKey = false;
    Dg.prototype.clientX = 0;
    Dg.prototype.clientY = 0;
    Dg.prototype.pageX = 0;
    Dg.prototype.pageY = 0;
    Dg.prototype.wheelDeltaX = 0;
    Dg.prototype.wheelDeltaY = 0;
    Dg.prototype.preventDefault = function () {
        this.U.returnValue = false;
        if (this.U.preventDefault) {
            this.U.preventDefault();
        }
    };
    Dg.prototype.stopPropagation = function () {
        this.U.cancelBubble = true;
        if (this.U.stopPropagation) {
            this.U.stopPropagation();
        }
    };
    var Eg = {
        stopPropagation: 1,
        preventMouseEvent: 1,
        preventManipulation: 1,
        preventDefault: 1,
        layerX: 1,
        layerY: 1
    };
    var yt$events$listeners_ = goog$getObjectByName("yt.events.listeners_") || {};
    goog$exportSymbol("yt.events.listeners_", yt$events$listeners_);
    var yt$events$counter_ = goog$getObjectByName("yt.events.counter_") || {
        count: 0
    };
    goog$exportSymbol("yt.events.counter_", yt$events$counter_);
    function Y(a, b, c, d) {
        if (!a || (!a.addEventListener && !a.attachEvent)) {
            return "";
        }
        var f = !!d;
        var e;
        a: {
            d = function (d) {
                return d[0] == a && d[1] == b && d[2] == c && d[4] == !!f;
            };
            for (e in yt$events$listeners_) {
                if (d.call(undefined, yt$events$listeners_[e])) {
                    break a;
                }
            }
            e = undefined;
        }
        if (e) {
            return e;
        }
        e = ++yt$events$counter_.count + "";
        var d = (b == "mouseenter" || b == "mouseleave") && !!a.addEventListener && !("onmouseenter" in document);
        var g;
        g = d
            ? function (d) {
                  d = new Dg(d);
                  if (
                      !Qb(d.relatedTarget, function (b) {
                          return b == a;
                      })
                  ) {
                      d.currentTarget = a;
                      d.type = b;
                      return c.call(a, d);
                  }
              }
            : function (b) {
                  b = new Dg(b);
                  b.currentTarget = a;
                  return c.call(a, b);
              };
        yt$events$listeners_[e] = [a, b, c, g, f];
        if (a.addEventListener) {
            if (b == "mouseenter" && d) {
                a.addEventListener("mouseover", g, f);
            } else if (b == "mouseleave" && d) {
                a.addEventListener("mouseout", g, f);
            } else if (b == "mousewheel" && "MozBoxSizing" in document.documentElement.style) {
                a.addEventListener("MozMousePixelScroll", g, f);
            } else {
                a.addEventListener(b, g, f);
            }
        } else {
            a.attachEvent("on" + b, g);
        }
        return e;
    }
    function Hg(a, b) {
        if ((a = goog$dom$getElement(a)) && a.style) {
            U(a, b);
            goog$dom$classes$enable(a, "hid", !b);
        }
    }
    function Ig(a) {
        za(arguments, function (a) {
            Hg(a, true);
        });
    }
    function Jg(a) {
        za(arguments, function (a) {
            Hg(a, false);
        });
    }
    var yt$config_ = (window.yt && window.yt.config_) || {};
    goog$exportSymbol("yt.config_", yt$config_);
    goog$exportSymbol("yt.tokens_", (window.yt && window.yt.tokens_) || {});
    goog$exportSymbol("yt.globals_", (window.yt && window.yt.globals_) || {});
    var yt$msgs_ = (window.yt && window.yt.msgs_) || {};
    goog$exportSymbol("yt.msgs_", yt$msgs_);
    var yt$timeouts_ = (window.yt && window.yt.timeouts_) || [];
    goog$exportSymbol("yt.timeouts_", yt$timeouts_);
    goog$exportSymbol("yt.intervals_", (window.yt && window.yt.intervals_) || []);
    y = function (a, b) {
        var c = b || {};
        var d = a in yt$msgs_ ? yt$msgs_[a] : a;
        if (d) {
            for (var f in c) {
                var e = ("" + c[f]).replace(/\$/g, "$$$$");
                var d = d.replace(RegExp("\\{\\$" + f + "\\}", "gi"), e);
                var d = d.replace(RegExp("\\$" + f, "gi"), e);
            }
        }
        return d;
    };
    eval("/*@cc_on!@*/false");
    var Ng = {};
    var Og = {};
    var Pg = 0;
    function Qg(a) {
        var b = new Image();
        var c = "" + Pg++;
        Og[c] = b;
        b.onload = b.onerror = function () {
            delete Og[c];
        };
        b.src = a;
        b = eval("null");
    }
    var Rg = {};
    var yt$uix$TOUCH_SUPPORTED_ = "ontouchstart" in document;
    function Tg(a, b, c) {
        var d;
        switch (a) {
            case "mouseover":
            case "mouseout":
                d = 3;
                break;
            case "mouseenter":
            case "mouseleave":
                d = 9;
        }
        return Qb(
            c,
            function (a) {
                return goog$array$contains(goog$dom$classes$get(a), b);
            },
            d
        );
    }
    function Z(a) {
        if (a.target.tagName != "HTML" && a.type in Rg) {
            if ((a.type == "mouseover" && "mouseenter" in Rg) || (a.type == "mouseout" && "mouseleave" in Rg)) {
                var b = a.type == "mouseover" ? "mouseenter" : "mouseleave";
                var c = Rg[b];
                var d;
                for (d in c.Ub) {
                    var f = Tg(b, d, a.target);
                    if (
                        f &&
                        !Qb(a.relatedTarget, function (a) {
                            return a == f;
                        })
                    ) {
                        c.Tb(d, f, b, a);
                    }
                }
            }
            b = Rg[a.type];
            for (d in b.Ub) {
                if ((f = Tg(a.type, d, a.target))) {
                    b.Tb(d, f, a.type, a);
                }
            }
        }
    }
    Y(document, "blur", Z, true);
    Y(document, "change", Z, true);
    Y(document, "click", Z);
    Y(document, "focus", Z, true);
    Y(document, "mouseover", Z);
    Y(document, "mouseout", Z);
    Y(document, "mousedown", Z);
    Y(document, "keydown", Z);
    Y(document, "keyup", Z);
    Y(document, "keypress", Z);
    Y(document, "cut", Z);
    Y(document, "paste", Z);
    if (yt$uix$TOUCH_SUPPORTED_) {
        Y(document, "touchstart", Z);
        Y(document, "touchend", Z);
        Y(document, "touchcancel", Z);
    }
    goog$exportSymbol("yt.uix.widgets_", (window.yt && window.yt.uix && window.yt.uix.widgets_) || {});
    function Ug() {}
    Ug.prototype.e = function (a, b, c) {
        var d = zg(a, b);
        if (d && (d = goog$getObjectByName(d))) {
            var f = goog$array$slice(arguments, 2);
            Ha(f, 0, 0, a);
            d.apply(null, f);
        }
    };
    function yt$uix$BaseWidget$getCssClass(a, b) {
        return "yt-uix" + (a.d ? "-" + a.d : "") + (b ? "-" + b : "");
    }
    function Vg() {}
    A(Vg, Ug);
    Vg.prototype.b = function (a) {
        var b = Pb(a, yt$uix$BaseWidget$getCssClass(this));
        if (b) {
            goog$dom$classes$add(b, yt$uix$BaseWidget$getCssClass(this, "active"));
            var c = Wg(this, a, b);
            if (c) {
                c.cardTargetNode = a;
                c.cardRootNode = b;
                var d = zg(a, "orientation") || "horizontal";
                var f = zg(a, "position");
                var e = !!zg(a, "force-position");
                var d = d == "horizontal";
                var g = f == "bottomright" || f == "bottomleft";
                var f = f == "topright" || f == "bottomright";
                var h;
                var j;
                if (f && g) {
                    j = 7;
                    h = 4;
                } else if (f && !g) {
                    j = 6;
                    h = 5;
                } else if (!f && g) {
                    j = 5;
                    h = 6;
                } else {
                    j = 4;
                    h = 7;
                }
                var m = goog$style$isRightToLeft(document.body);
                var p = goog$style$isRightToLeft(a);
                if (m != p) {
                    j ^= 2;
                }
                var q;
                if (d) {
                    p = a.offsetHeight / 2 - 12;
                    q = new goog$math$Coordinate(-12, a.offsetHeight + 6);
                } else {
                    p = a.offsetWidth / 2 - 6;
                    q = new goog$math$Coordinate(a.offsetWidth + 6, -12);
                }
                var v = goog$style$getSize(c);
                var p = Math.min(p, (d ? v.height : v.width) - 24 - 6);
                if (p < 6) {
                    p = 6;
                    if (d) {
                        q.y += 12 - a.offsetHeight / 2;
                    } else {
                        q.x += 12 - a.offsetWidth / 2;
                    }
                }
                var t = null;
                if (!e) {
                    t = 10;
                }
                var v = yt$uix$BaseWidget$getCssClass(this, "card-flip");
                var I = yt$uix$BaseWidget$getCssClass(this, "card-reverse");
                goog$dom$classes$enable(c, v, f);
                goog$dom$classes$enable(c, I, g);
                t = Ff(a, j, c, h, q, null, t);
                if (!e && t) {
                    if (t & 48) {
                        f = !f;
                        j ^= 2;
                        h ^= 2;
                    }
                    if (t & 192) {
                        g = !g;
                        j ^= 1;
                        h ^= 1;
                    }
                    goog$dom$classes$enable(c, v, f);
                    goog$dom$classes$enable(c, I, g);
                    Ff(a, j, c, h, q);
                }
                e = Eb("yt-uix-card-body-arrow", c);
                h = Eb("yt-uix-card-border-arrow", c);
                d = d ? (g ? "top" : "bottom") : (!m && f) || (m && !f) ? "left" : "right";
                e.setAttribute("style", "");
                h.setAttribute("style", "");
                e.style[d] = p + "px";
                h.style[d] = p + "px";
                var oa = yt$uix$BaseWidget$getCssClass(this, "card-visible");
                var d = window.setTimeout(function () {
                    Ig(c);
                    goog$dom$classes$add(c, oa);
                }, 10);
                yt$timeouts_.push(d);
                this.e(b, "card-action", a);
            }
        }
    };
    function Wg(a, b, c) {
        var d = yt$uix$BaseWidget$getCssClass(a, "card");
        var f = c.__yt_uid_key;
        if (!f) {
            f = yt$dom$getNextId_();
            c.__yt_uid_key = f;
        }
        var e = d + f;
        if ((f = goog$dom$getElement(e))) {
            return f;
        }
        var g;
        var f = c.cardContentNode;
        if (!f) {
            g = yt$uix$BaseWidget$getCssClass(a, "content");
            var h = yt$uix$BaseWidget$getCssClass(a, "card-content");
            var j = (f = Eb(g, c));
            var m = goog$dom$classes$get(j);
            if (goog$isString(g)) {
                Da(m, g);
            } else if (goog$isArray(g)) {
                m = goog$dom$classes$getDifference_(m, g);
            }
            if (goog$isString(h) && !goog$array$contains(m, h)) {
                m.push(h);
            } else if (goog$isArray(h)) {
                goog$dom$classes$add_(m, h);
            }
            j.className = m.join(" ");
            c.cardContentNode = f;
        }
        g = f;
        if (!g) {
            return null;
        }
        f = document.createElement("div");
        f.id = e;
        f.className = d;
        if ((c = zg(c, "card-class"))) {
            goog$dom$classes$add(f, c);
        }
        c = document.createElement("div");
        c.className = yt$uix$BaseWidget$getCssClass(a, "card-border");
        b = zg(b, "orientation") || "horizontal";
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
    }
    function Xg() {}
    A(Xg, Vg);
    ca(Xg);
    Xg.prototype.d = "clickcard";
    Xg.prototype.b = function (a) {
        Xg.B.b.call(this, a);
        var b = Pb(a, yt$uix$BaseWidget$getCssClass(this));
        Yg(this);
        if (zg(b, "click-outside-closes")) {
            this.a = a;
            this.j = Y(document, "click", goog$bind(this.n, this));
        }
    };
    Xg.prototype.n = function (a) {
        if (!Pb(a.target, "yt-uix-clickcard-card")) {
            Yg(this);
        }
    };
    function Yg(a) {
        if (a.a) {
            var b = a.a;
            var c = Pb(b, yt$uix$BaseWidget$getCssClass(a));
            if (c && (b = Wg(a, b, c))) {
                goog$dom$classes$remove(c, yt$uix$BaseWidget$getCssClass(a, "active"));
                goog$dom$classes$remove(b, yt$uix$BaseWidget$getCssClass(a, "card-visible"));
                Jg(b);
                b.cardTargetNode = null;
                b.cardRootNode = null;
            }
            a.a = null;
            a = a.j;
            if (typeof a == "string") {
                a = [a];
            }
            za(a, function (a) {
                if (a in yt$events$listeners_) {
                    var b = yt$events$listeners_[a];
                    var c = b[0];
                    var g = b[1];
                    var h = b[3];
                    var b = b[4];
                    if (c.removeEventListener) {
                        c.removeEventListener(g, h, b);
                    } else {
                        c.detachEvent("on" + g, h);
                    }
                    delete yt$events$listeners_[a];
                }
            });
        }
    }
    var Zg;
    var $g;
    var ah;
    var bh;
    function yt$www$help$onClose_() {
        goog$dom$classes$remove(goog$dom$getElement("help-button"), "yt-uix-button-active");
        hcm$recordMetrics(bh, [new hcm$MetricsData("IP_HP_CLOSED")]);
        Zg.Ea($g, true, true);
    }
    goog$exportSymbol("yt.www.help.init", function (a, b, c, d, f, e, g, h) {
        if (!Zg) {
            var j = (Zg = new hhw$HelpPanel(b, c, d));
            j.Ea(a, true, true);
            j.Ja(g);
            j.Ia(h);
            j.ha(f);
            j.Ka(e);
            j.xb("");
            j.Xa("inproductanchorclick", function () {
                Zg.ha("");
            });
            j.Xa("backanchorclick", function () {
                Zg.ha(ah);
            });
            $g = a;
            ah = j.ra.innerHTML;
            a = goog$dom$getElement("help-target");
            f = Eb("loading-spinner", a);
            Jg(f);
            j = j.b;
            f = goog$dom$getElement("help-button");
            e = Xg.getInstance();
            goog$dom$getElement("help-target").appendChild(j);
            e.b(f);
            a = Pb(a, "yt-uix-clickcard-card");
            goog$dom$classes$add(a, "iph-clickcard");
            j = Eb("help-Helpwidgets-HelpPanel-Expand-Collapse-Container", j);
            a = goog$dom$createDom(
                "div",
                {
                    className: "yt-uix-clickcard-close"
                },
                ""
            );
            Y(a, "click", yt$www$help$onClose_);
            if ((f = j.parentNode)) {
                f.replaceChild(a, j);
            }
            bh = id(b, c, d);
        }
    });
    goog$exportSymbol("yt.www.help.onButtonClick", function () {
        var a = goog$dom$getElement("help-button");
        if (goog$array$contains(goog$dom$classes$get(a), "yt-uix-button-active")) {
            yt$www$help$onClose_();
        } else {
            goog$dom$classes$add(a, "yt-uix-button-active");
            var b = zg(a, "iph-tracking") || "";
            hcm$recordMetrics(bh, [new hcm$MetricsData("IP_HP_OPENED")]);
            a: if ("EVENTS_TRACKER_INSTALLED" in yt$config_ && yt$config_.EVENTS_TRACKER_INSTALLED) {
                var c = Ng[b];
                if (!c) {
                    var d = window._gaq._getAsyncTracker("eventsPageTracker");
                    if (!d) {
                        break a;
                    }
                    window._gaq.push(function () {
                        c = d._createEventTracker(b);
                        Ng[b] = c;
                    });
                }
                window._gaq.push(function () {
                    c._trackEvent("null", undefined, undefined);
                });
            }
            a = "a=" + b + "".replace(/\//g, "&");
            Qg("/gen_204?" + a);
        }
    });
    goog$exportSymbol("yt.www.help.onClose_", yt$www$help$onClose_);
})();
