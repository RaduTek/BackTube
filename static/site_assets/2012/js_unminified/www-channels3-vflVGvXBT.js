(function () {
    function g(a) {
        throw a;
    }
    var i = undefined;
    var k = true;
    var l = null;
    var n = false;
    var o;
    var q = this;
    var r = function (a) {
        for (var a = a.split("."), b = q, c; (c = a.shift());) {
            if (b[c] != l) {
                b = b[c];
            } else {
                return l;
            }
        }
        return b;
    };
    var aa = function (a) {
        a.getInstance = function () {
            return a.lk || (a.lk = new a());
        };
    };
    var ba = function (a) {
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
        return a !== i;
    };
    var s = function (a) {
        return ba(a) == "array";
    };
    var da = function (a) {
        var b = ba(a);
        return b == "array" || (b == "object" && typeof a.length == "number");
    };
    var t = function (a) {
        return typeof a == "string";
    };
    var ea = function (a) {
        return ba(a) == "function";
    };
    var fa = function (a) {
        var b = typeof a;
        return (b == "object" && a != l) || b == "function";
    };
    var ia = function (a) {
        return a[ga] || (a[ga] = ++ha);
    };
    var ga = "closure_uid_" + Math.floor(Math.random() * 2147483648).toString(36);
    var ha = 0;
    var ja = function (a, b, c) {
        return a.call.apply(a.bind, arguments);
    };
    var ka = function (a, b, c) {
        if (!a) {
            g(Error());
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
    var u = function (a, b, c) {
        u = Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? ja : ka;
        return u.apply(l, arguments);
    };
    var la = function (a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function () {
            var b = Array.prototype.slice.call(arguments);
            b.unshift.apply(b, c);
            return a.apply(this, b);
        };
    };
    var ma =
        Date.now ||
        function () {
            return +new Date();
        };
    var v = function (a, b) {
        var c = a.split(".");
        var d = q;
        if (!(c[0] in d) && d.execScript) {
            d.execScript("var " + c[0]);
        }
        for (var e; c.length && (e = c.shift());) {
            if (!c.length && ca(b)) {
                d[e] = b;
            } else {
                d = d[e] ? d[e] : (d[e] = {});
            }
        }
    };
    var w = function (a, b) {
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
                return u.apply(l, c);
            }
            return u(this, a);
        };
    var na = function (a) {
        this.stack = Error().stack || "";
        if (a) {
            this.message = "" + a;
        }
    };
    w(na, Error);
    na.prototype.name = "CustomError";
    var oa = function (a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = ("" + arguments[c]).replace(/\$/g, "$$$$");
            var a = a.replace(/\%s/, d);
        }
        return a;
    };
    var pa = /^[a-zA-Z0-9\-_.!~*'()]*$/;
    var qa = function (a) {
        a = "" + a;
        if (!pa.test(a)) {
            return encodeURIComponent(a);
        } else {
            return a;
        }
    };
    var wa = function (a) {
        if (!ra.test(a)) {
            return a;
        }
        if (a.indexOf("&") != -1) {
            a = a.replace(sa, "&amp;");
        }
        if (a.indexOf("<") != -1) {
            a = a.replace(ta, "&lt;");
        }
        if (a.indexOf(">") != -1) {
            a = a.replace(ua, "&gt;");
        }
        if (a.indexOf('"') != -1) {
            a = a.replace(va, "&quot;");
        }
        return a;
    };
    var sa = /&/g;
    var ta = /</g;
    var ua = />/g;
    var va = /\"/g;
    var ra = /[&<>\"]/;
    var xa = function (a) {
        var b = 0;
        for (var c = 0; c < a.length; ++c) {
            b = b * 31 + a.charCodeAt(c);
            b %= 4294967296;
        }
        return b;
    };
    var ya = {};
    var za = function (a) {
        return (
            ya[a] ||
            (ya[a] = ("" + a).replace(/\-([a-z])/g, function (a, c) {
                return c.toUpperCase();
            }))
        );
    };
    var Aa = function (a, b) {
        b.unshift(a);
        na.call(this, oa.apply(l, b));
        b.shift();
    };
    w(Aa, na);
    Aa.prototype.name = "AssertionError";
    var Ba = function (a, b, c) {
        if (!a) {
            var d = Array.prototype.slice.call(arguments, 2);
            var e = "Assertion failed";
            if (b) {
                var e = e + (": " + b);
                var f = d;
            }
            g(new Aa("" + e, f || []));
        }
    };
    var Ca = function (a, b) {
        g(new Aa("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1)));
    };
    var x = Array.prototype;
    var Da = x.indexOf
        ? function (a, b, c) {
              Ba(a.length != l);
              return x.indexOf.call(a, b, c);
          }
        : function (a, b, c) {
              c = c == l ? 0 : c < 0 ? Math.max(0, a.length + c) : c;
              if (t(a)) {
                  if (!t(b) || b.length != 1) {
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
    var y = x.forEach
        ? function (a, b, c) {
              Ba(a.length != l);
              x.forEach.call(a, b, c);
          }
        : function (a, b, c) {
              for (var d = a.length, e = t(a) ? a.split("") : a, f = 0; f < d; f++) {
                  if (f in e) {
                      b.call(c, e[f], f, a);
                  }
              }
          };
    var Ea = x.filter
        ? function (a, b, c) {
              Ba(a.length != l);
              return x.filter.call(a, b, c);
          }
        : function (a, b, c) {
              for (var d = a.length, e = [], f = 0, h = t(a) ? a.split("") : a, j = 0; j < d; j++) {
                  if (j in h) {
                      var m = h[j];
                      if (b.call(c, m, j, a)) {
                          e[f++] = m;
                      }
                  }
              }
              return e;
          };
    var Fa = x.map
        ? function (a, b, c) {
              Ba(a.length != l);
              return x.map.call(a, b, c);
          }
        : function (a, b, c) {
              for (var d = a.length, e = Array(d), f = t(a) ? a.split("") : a, h = 0; h < d; h++) {
                  if (h in f) {
                      e[h] = b.call(c, f[h], h, a);
                  }
              }
              return e;
          };
    var Ga = x.some
        ? function (a, b, c) {
              Ba(a.length != l);
              return x.some.call(a, b, c);
          }
        : function (a, b, c) {
              for (var d = a.length, e = t(a) ? a.split("") : a, f = 0; f < d; f++) {
                  if (f in e && b.call(c, e[f], f, a)) {
                      return k;
                  }
              }
              return n;
          };
    var Ia = x.every
        ? function (a, b, c) {
              Ba(a.length != l);
              return x.every.call(a, b, c);
          }
        : function (a, b, c) {
              for (var d = a.length, e = t(a) ? a.split("") : a, f = 0; f < d; f++) {
                  if (f in e && !b.call(c, e[f], f, a)) {
                      return n;
                  }
              }
              return k;
          };
    var Ja = function (a, b) {
        return Da(a, b) >= 0;
    };
    var Ka = function (a, b) {
        var c = Da(a, b);
        if (c >= 0) {
            Ba(a.length != l);
            x.splice.call(a, c, 1);
        }
    };
    var La = function (a) {
        return x.concat.apply(x, arguments);
    };
    var Ma = function (a) {
        if (s(a)) {
            return La(a);
        }
        var b = [];
        for (var c = 0, d = a.length; c < d; c++) {
            b[c] = a[c];
        }
        return b;
    };
    var Oa = function (a) {
        if (s(a)) {
            return La(a);
        } else {
            return Ma(a);
        }
    };
    var Pa = function (a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            var e;
            if (s(d) || ((e = da(d)) && d.hasOwnProperty("callee"))) {
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
    var Ra = function (a, b, c, d) {
        Ba(a.length != l);
        x.splice.apply(a, Qa(arguments, 1));
    };
    var Qa = function (a, b, c) {
        Ba(a.length != l);
        if (arguments.length <= 2) {
            return x.slice.call(a, b);
        } else {
            return x.slice.call(a, b, c);
        }
    };
    var Sa;
    var Ta = function (a) {
        a = a.className;
        return (t(a) && a.match(/\S+/g)) || [];
    };
    var B = function (a, b) {
        var c = Ta(a);
        var d = Qa(arguments, 1);
        var e = c.length + d.length;
        Ua(c, d);
        a.className = c.join(" ");
        return c.length == e;
    };
    var C = function (a, b) {
        var c = Ta(a);
        var d = Qa(arguments, 1);
        var e = Va(c, d);
        a.className = e.join(" ");
        return e.length == c.length - d.length;
    };
    var Ua = function (a, b) {
        for (var c = 0; c < b.length; c++) {
            if (!Ja(a, b[c])) {
                a.push(b[c]);
            }
        }
    };
    var Va = function (a, b) {
        return Ea(a, function (a) {
            return !Ja(b, a);
        });
    };
    var D = function (a, b) {
        return Ja(Ta(a), b);
    };
    var Wa = function (a, b, c) {
        if (c) {
            B(a, b);
        } else {
            C(a, b);
        }
    };
    var Xa = function (a, b) {
        var c = !D(a, b);
        Wa(a, b, c);
        return c;
    };
    var E = function (a, b) {
        this.x = ca(a) ? a : 0;
        this.y = ca(b) ? b : 0;
    };
    E.prototype.S = function () {
        return new E(this.x, this.y);
    };
    E.prototype.toString = function () {
        return "(" + this.x + ", " + this.y + ")";
    };
    var Ya = function (a, b) {
        return new E(a.x - b.x, a.y - b.y);
    };
    var Za = function (a, b) {
        this.width = a;
        this.height = b;
    };
    o = Za.prototype;
    o.S = function () {
        return new Za(this.width, this.height);
    };
    o.toString = function () {
        return "(" + this.width + " x " + this.height + ")";
    };
    o.ceil = function () {
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this;
    };
    o.floor = function () {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this;
    };
    o.round = function () {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this;
    };
    o.scale = function (a) {
        this.width *= a;
        this.height *= a;
        return this;
    };
    var $a = function (a, b) {
        for (var c in a) {
            b.call(i, a[c], c, a);
        }
    };
    var ab = function () {
        var a = F("GUIDED_HELP_FLOWS");
        var b;
        for (b in a) {
            return b;
        }
    };
    var bb = function (a) {
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
    var db = function (a) {
        var b = [];
        var c = 0;
        var d;
        for (d in a) {
            b[c++] = d;
        }
        return b;
    };
    var eb = function (a, b, c) {
        for (var d in a) {
            if (b.call(c, a[d], d, a)) {
                return d;
            }
        }
    };
    var fb = function (a, b) {
        var c = eb(a, b, i);
        return c && a[c];
    };
    var gb = function (a, b, c) {
        if (b in a) {
            g(Error('The object already contains the key "' + b + '"'));
        }
        a[b] = c;
    };
    var hb = function (a) {
        var b = {};
        var c;
        for (c in a) {
            b[c] = a[c];
        }
        return b;
    };
    var ib = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
    var jb = function (a, b) {
        var c;
        var d;
        for (var e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d) {
                a[c] = d[c];
            }
            for (var f = 0; f < ib.length; f++) {
                c = ib[f];
                if (Object.prototype.hasOwnProperty.call(d, c)) {
                    a[c] = d[c];
                }
            }
        }
    };
    var kb;
    var lb;
    var mb;
    var nb;
    var ob;
    var qb;
    var rb;
    var sb = function () {
        if (q.navigator) {
            return q.navigator.userAgent;
        } else {
            return l;
        }
    };
    var tb = function () {
        return q.navigator;
    };
    ob = nb = mb = lb = kb = n;
    var ub;
    if ((ub = sb())) {
        var vb = tb();
        kb = ub.indexOf("Opera") == 0;
        lb = !kb && ub.indexOf("MSIE") != -1;
        nb = (mb = !kb && ub.indexOf("WebKit") != -1) && ub.indexOf("Mobile") != -1;
        ob = !kb && !mb && vb.product == "Gecko";
    }
    var wb = kb;
    var G = lb;
    var xb = ob;
    var I = mb;
    var yb = nb;
    var zb = tb();
    var Ab = (zb && zb.platform) || "";
    qb = Ab.indexOf("Mac") != -1;
    rb = Ab.indexOf("Win") != -1;
    var Bb = !!tb() && (tb().appVersion || "").indexOf("X11") != -1;
    var Cb;
    a: {
        var Db = "";
        var Eb;
        if (wb && q.opera) {
            var Fb = q.opera.version;
            var Db = typeof Fb == "function" ? Fb() : Fb;
        } else {
            if (xb) {
                Eb = /rv\:([^\);]+)(\)|;)/;
            } else if (G) {
                Eb = /MSIE\s+([^\);]+)(\)|;)/;
            } else if (I) {
                Eb = /WebKit\/(\S+)/;
            }
            if (Eb) {
                var Gb = Eb.exec(sb());
                var Db = Gb ? Gb[1] : "";
            }
        }
        if (G) {
            var Hb;
            var Ib = q.document;
            Hb = Ib ? Ib.documentMode : i;
            if (Hb > parseFloat(Db)) {
                Cb = "" + Hb;
                break a;
            }
        }
        Cb = Db;
    }
    var Jb = Cb;
    var Kb = {};
    var J = function (a) {
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
    var Lb = {};
    var Mb = function (a) {
        return Lb[a] || (Lb[a] = G && !!document.documentMode && document.documentMode >= a);
    };
    var Nb = !G || Mb(9);
    var Ob = (!xb && !G) || (G && Mb(9)) || (xb && J("1.9.1"));
    var Pb = G && !J("9");
    var Rb = function (a) {
        if (a) {
            return new Qb(K(a));
        } else {
            return Sa || (Sa = new Qb());
        }
    };
    var M = function (a) {
        if (t(a)) {
            return document.getElementById(a);
        } else {
            return a;
        }
    };
    var Tb = function (a, b, c) {
        return Sb(a, b, c);
    };
    var N = function (a, b) {
        var c = b || document;
        if (Ub(c)) {
            return c.querySelectorAll("." + a);
        } else if (c.getElementsByClassName) {
            return c.getElementsByClassName(a);
        } else {
            return Sb("*", a, b);
        }
    };
    var O = function (a, b) {
        var c = b || document;
        var d = l;
        return (d = Ub(c) ? c.querySelector("." + a) : N(a, b)[0]) || l;
    };
    var Ub = function (a) {
        return a.querySelectorAll && a.querySelector && (!I || Vb(document) || J("528"));
    };
    var Sb = function (a, b, c) {
        c = c || document;
        a = a && a != "*" ? a.toUpperCase() : "";
        if (Ub(c) && (a || b)) {
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
                if (typeof a.split == "function" && Ja(a.split(/\s+/), b)) {
                    d[e++] = h;
                }
            }
            d.length = e;
            return d;
        }
        return c;
    };
    var Xb = function (a, b) {
        $a(b, function (b, d) {
            if (d == "style") {
                a.style.cssText = b;
            } else if (d == "class") {
                a.className = b;
            } else if (d == "for") {
                a.htmlFor = b;
            } else if (d in Wb) {
                a.setAttribute(Wb[d], b);
            } else if (d.lastIndexOf("aria-", 0) == 0) {
                a.setAttribute(d, b);
            } else {
                a[d] = b;
            }
        });
    };
    var Wb = {
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
    var Yb = function (a) {
        var b = a.document;
        if (I && !J("500") && !yb) {
            if (typeof a.innerHeight == "undefined") {
                a = window;
            }
            var b = a.innerHeight;
            var c = a.document.documentElement.scrollHeight;
            if (a == a.top && c < b) {
                b -= 15;
            }
            return new Za(a.innerWidth, b);
        }
        a = Vb(b) ? b.documentElement : b.body;
        return new Za(a.clientWidth, a.clientHeight);
    };
    var $b = function (a, b, c) {
        return Zb(document, arguments);
    };
    var Zb = function (a, b) {
        var c = b[0];
        var d = b[1];
        if (!Nb && d && (d.name || d.type)) {
            c = ["<", c];
            if (d.name) {
                c.push(' name="', wa(d.name), '"');
            }
            if (d.type) {
                c.push(' type="', wa(d.type), '"');
                var e = {};
                jb(e, d);
                d = e;
                delete d.type;
            }
            c.push(">");
            c = c.join("");
        }
        c = a.createElement(c);
        if (d) {
            if (t(d)) {
                c.className = d;
            } else if (s(d)) {
                B.apply(l, [c].concat(d));
            } else {
                Xb(c, d);
            }
        }
        if (b.length > 2) {
            ac(a, c, b, 2);
        }
        return c;
    };
    var ac = function (a, b, c, d) {
        function e(c) {
            if (c) {
                b.appendChild(t(c) ? a.createTextNode(c) : c);
            }
        }
        for (; d < c.length; d++) {
            var f = c[d];
            if (da(f) && (!fa(f) || !(f.nodeType > 0))) {
                y(bc(f) ? Ma(f) : f, e);
            } else {
                e(f);
            }
        }
    };
    var cc = function (a) {
        var b = document;
        var c = b.createElement("div");
        if (G) {
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
    var Vb = function (a) {
        return a.compatMode == "CSS1Compat";
    };
    var dc = function (a, b) {
        ac(K(a), a, arguments, 1);
    };
    var ec = function (a) {
        for (var b; (b = a.firstChild);) {
            a.removeChild(b);
        }
    };
    var fc = function (a) {
        if (a && a.parentNode) {
            return a.parentNode.removeChild(a);
        } else {
            return l;
        }
    };
    var gc = function (a) {
        if (Ob && a.children != i) {
            return a.children;
        } else {
            return Ea(a.childNodes, function (a) {
                return a.nodeType == 1;
            });
        }
    };
    var ic = function (a) {
        if (a.firstElementChild != i) {
            return a.firstElementChild;
        } else {
            return hc(a.firstChild, k);
        }
    };
    var hc = function (a, b) {
        while (a && a.nodeType != 1) {
            a = b ? a.nextSibling : a.previousSibling;
        }
        return a;
    };
    var jc = function (a, b) {
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
    var K = function (a) {
        if (a.nodeType == 9) {
            return a;
        } else {
            return a.ownerDocument || a.document;
        }
    };
    var kc = function (a, b) {
        if ("textContent" in a) {
            a.textContent = b;
        } else if (a.firstChild && a.firstChild.nodeType == 3) {
            while (a.lastChild != a.firstChild) {
                a.removeChild(a.lastChild);
            }
            a.firstChild.data = b;
        } else {
            ec(a);
            a.appendChild(K(a).createTextNode(b));
        }
    };
    var mc = function (a, b) {
        var c = [];
        if (lc(a, b, c, k)) {
            return c[0];
        } else {
            return i;
        }
    };
    var lc = function (a, b, c, d) {
        if (a != l) {
            for (a = a.firstChild; a;) {
                if ((b(a) && (c.push(a), d)) || lc(a, b, c, d)) {
                    return k;
                }
                a = a.nextSibling;
            }
        }
        return n;
    };
    var nc = {
        SCRIPT: 1,
        STYLE: 1,
        HEAD: 1,
        IFRAME: 1,
        OBJECT: 1
    };
    var oc = {
        IMG: " ",
        BR: "\n"
    };
    var pc = function (a) {
        var b = a.getAttributeNode("tabindex");
        if (b && b.specified) {
            a = a.tabIndex;
            return typeof a == "number" && a >= 0 && a < 32768;
        } else {
            return n;
        }
    };
    var qc = function (a, b, c) {
        if (!(a.nodeName in nc)) {
            if (a.nodeType == 3) {
                if (c) {
                    b.push(("" + a.nodeValue).replace(/(\r\n|\r|\n)/g, ""));
                } else {
                    b.push(a.nodeValue);
                }
            } else if (a.nodeName in oc) {
                b.push(oc[a.nodeName]);
            } else {
                for (a = a.firstChild; a;) {
                    qc(a, b, c);
                    a = a.nextSibling;
                }
            }
        }
    };
    var bc = function (a) {
        if (a && typeof a.length == "number") {
            if (fa(a)) {
                return typeof a.item == "function" || typeof a.item == "string";
            }
            if (ea(a)) {
                return typeof a.item == "function";
            }
        }
        return n;
    };
    var sc = function (a, b, c) {
        var d = b ? b.toUpperCase() : l;
        return rc(
            a,
            function (a) {
                return (!d || a.nodeName == d) && (!c || D(a, c));
            },
            k
        );
    };
    var tc = function (a, b) {
        return sc(a, l, b);
    };
    var rc = function (a, b, c, d) {
        if (!c) {
            a = a.parentNode;
        }
        for (var c = d == l, e = 0; a && (c || e <= d);) {
            if (b(a)) {
                return a;
            }
            a = a.parentNode;
            e++;
        }
        return l;
    };
    var Qb = function (a) {
        this.k = a || q.document || document;
    };
    o = Qb.prototype;
    o.da = Rb;
    o.a = function (a) {
        if (t(a)) {
            return this.k.getElementById(a);
        } else {
            return a;
        }
    };
    o.f = function (a, b) {
        return O(a, b || this.k);
    };
    o.K = function (a, b, c) {
        return Zb(this.k, arguments);
    };
    o.createElement = function (a) {
        return this.k.createElement(a);
    };
    o.createTextNode = function (a) {
        return this.k.createTextNode(a);
    };
    o.ng = function (a, b, c) {
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
    var uc = function (a) {
        return Vb(a.k);
    };
    var vc = function (a) {
        var b = a.k;
        var a = !I && Vb(b) ? b.documentElement : b.body;
        var b = b.parentWindow || b.defaultView;
        return new E(b.pageXOffset || a.scrollLeft, b.pageYOffset || a.scrollTop);
    };
    Qb.prototype.appendChild = function (a, b) {
        a.appendChild(b);
    };
    Qb.prototype.removeNode = fc;
    Qb.prototype.contains = jc;
    var wc = function () {};
    wc.prototype.ke = n;
    wc.prototype.w = function () {
        if (!this.ke) {
            this.ke = k;
            this.e();
        }
    };
    wc.prototype.e = function () {
        if (this.jk) {
            xc.apply(l, this.jk);
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
            if (da(d)) {
                xc.apply(l, d);
            } else {
                yc(d);
            }
        }
    };
    var zc = function (a, b) {
        this.type = a;
        this.currentTarget = this.target = b;
    };
    w(zc, wc);
    o = zc.prototype;
    o.e = function () {
        delete this.type;
        delete this.target;
        delete this.currentTarget;
    };
    o.Za = n;
    o.ac = k;
    o.stopPropagation = function () {
        this.Za = k;
    };
    o.preventDefault = function () {
        this.ac = n;
    };
    var Ac = function (a) {
        a.preventDefault();
    };
    var Bc = function (a) {
        Bc[" "](a);
        return a;
    };
    Bc[" "] = function () {};
    var Cc = !G || Mb(9);
    var Dc = !G || Mb(9);
    var Ec = G && !J("8");
    if (I) {
        J("528");
    }
    if ((!xb || !J("1.9b")) && (!G || !J("8")) && (!wb || !J("9.5"))) {
        if (I) {
            J("528");
        }
    }
    if (!xb || !!J("8")) {
        if (G) {
            J("9");
        }
    }
    var Fc = function (a, b) {
        if (a) {
            this.U(a, b);
        }
    };
    w(Fc, zc);
    var Gc = [1, 4, 2];
    o = Fc.prototype;
    o.target = l;
    o.relatedTarget = l;
    o.offsetX = 0;
    o.offsetY = 0;
    o.clientX = 0;
    o.clientY = 0;
    o.screenX = 0;
    o.screenY = 0;
    o.button = 0;
    o.keyCode = 0;
    o.charCode = 0;
    o.ctrlKey = n;
    o.altKey = n;
    o.shiftKey = n;
    o.metaKey = n;
    o.re = n;
    o.L = l;
    o.U = function (a, b) {
        var c = (this.type = a.type);
        zc.call(this, c);
        this.target = a.target || a.srcElement;
        this.currentTarget = b;
        var d = a.relatedTarget;
        if (d) {
            if (xb) {
                var e;
                a: {
                    try {
                        Bc(d.nodeName);
                        e = k;
                        break a;
                    } catch (f) {}
                    e = n;
                }
                if (!e) {
                    d = l;
                }
            }
        } else if (c == "mouseover") {
            d = a.fromElement;
        } else if (c == "mouseout") {
            d = a.toElement;
        }
        this.relatedTarget = d;
        this.offsetX = I || a.offsetX !== i ? a.offsetX : a.layerX;
        this.offsetY = I || a.offsetY !== i ? a.offsetY : a.layerY;
        this.clientX = a.clientX !== i ? a.clientX : a.pageX;
        this.clientY = a.clientY !== i ? a.clientY : a.pageY;
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
        return (Cc ? a.L.button == 0 : a.type == "click" ? k : !!(a.L.button & Gc[0])) && (!I || !qb || !a.ctrlKey);
    };
    Fc.prototype.stopPropagation = function () {
        Fc.b.stopPropagation.call(this);
        if (this.L.stopPropagation) {
            this.L.stopPropagation();
        } else {
            this.L.cancelBubble = k;
        }
    };
    Fc.prototype.preventDefault = function () {
        Fc.b.preventDefault.call(this);
        var a = this.L;
        if (a.preventDefault) {
            a.preventDefault();
        } else {
            a.returnValue = n;
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
        this.relatedTarget = this.currentTarget = this.target = this.L = l;
    };
    var Ic = function () {};
    var Jc = 0;
    o = Ic.prototype;
    o.key = 0;
    o.Xa = n;
    o.Ke = n;
    o.U = function (a, b, c, d, e, f) {
        if (ea(a)) {
            this.vg = k;
        } else if (a && a.handleEvent && ea(a.handleEvent)) {
            this.vg = n;
        } else {
            g(Error("Invalid listener argument"));
        }
        this.Bb = a;
        this.Xf = b;
        this.src = c;
        this.type = d;
        this.capture = !!e;
        this.Kc = f;
        this.Ke = n;
        this.key = ++Jc;
        this.Xa = n;
    };
    o.handleEvent = function (a) {
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
            if (s(b)) {
                for (var f = 0; f < b.length; f++) {
                    P(a, b[f], c, d, e);
                }
                return l;
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
            var j = ia(a);
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
                if (a == q || !a.Uf) {
                    a.addEventListener(b, f, d);
                }
            } else {
                a.attachEvent(b in Nc ? Nc[b] : (Nc[b] = "on" + b), f);
            }
            return c;
        }
        g(Error("Invalid event type"));
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
        if (s(b)) {
            for (var f = 0; f < b.length; f++) {
                Qc(a, b[f], c, d, e);
            }
            return l;
        }
        a = P(a, b, c, d, e);
        Kc[a].Ke = k;
        return a;
    };
    var Rc = function (a, b, c, d, e) {
        if (s(b)) {
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
            return n;
        }
        var b = Kc[a];
        if (b.Xa) {
            return n;
        }
        var c = b.src;
        var d = b.type;
        var e = b.Xf;
        var f = b.capture;
        if (c.removeEventListener) {
            if (c == q || !c.Uf) {
                c.removeEventListener(d, e, f);
            }
        } else if (c.detachEvent) {
            c.detachEvent(d in Nc ? Nc[d] : (Nc[d] = "on" + d), e);
        }
        c = ia(c);
        e = Lc[d][f][c];
        if (Mc[c]) {
            var h = Mc[c];
            Ka(h, b);
            if (h.length == 0) {
                delete Mc[c];
            }
        }
        b.Xa = k;
        e.fg = k;
        Uc(d, f, c, e);
        delete Kc[a];
        return k;
    };
    var Uc = function (a, b, c, d) {
        if (!d.Sc && d.fg) {
            for (var e = 0, f = 0; e < d.length; e++) {
                if (d[e].Xa) {
                    d[e].Xf.src = l;
                } else {
                    if (e != f) {
                        d[f] = d[e];
                    }
                    f++;
                }
            }
            d.length = f;
            d.fg = n;
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
        var d = b == l;
        b = !!b;
        if (a == l) {
            $a(Mc, function (a) {
                for (var e = a.length - 1; e >= 0; e--) {
                    var f = a[e];
                    if (d || b == f.capture) {
                        Tc(f.key);
                        c++;
                    }
                }
            });
        } else {
            a = ia(a);
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
        if (b in d && ((d = d[b]), c in d && ((d = d[c]), (a = ia(a)), d[a]))) {
            return d[a];
        } else {
            return l;
        }
    };
    var Xc = function (a, b, c, d, e) {
        var f = 1;
        var b = ia(b);
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
                        f &= Wc(m, e) !== n;
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
            return k;
        }
        var c = Kc[a];
        var d = c.type;
        var e = Lc;
        if (!(d in e)) {
            return k;
        }
        var e = e[d];
        var f;
        var h;
        if (!Dc) {
            f = b || r("window.event");
            var j = k in e;
            var m = n in e;
            if (j) {
                if (f.keyCode < 0 || f.returnValue != i) {
                    return k;
                }
                a: {
                    var p = n;
                    if (f.keyCode == 0) {
                        try {
                            f.keyCode = -1;
                            break a;
                        } catch (z) {
                            p = k;
                        }
                    }
                    if (p || f.returnValue == i) {
                        f.returnValue = k;
                    }
                }
            }
            p = new Fc();
            p.U(f, this);
            f = k;
            try {
                if (j) {
                    var A = [];
                    for (var H = p.currentTarget; H; H = H.parentNode) {
                        A.push(H);
                    }
                    h = e[k];
                    h.aa = h.n;
                    for (var L = A.length - 1; !p.Za && L >= 0 && h.aa; L--) {
                        p.currentTarget = A[L];
                        f &= Xc(h, A[L], d, k, p);
                    }
                    if (m) {
                        h = e[n];
                        h.aa = h.n;
                        for (L = 0; !p.Za && L < A.length && h.aa; L++) {
                            p.currentTarget = A[L];
                            f &= Xc(h, A[L], d, n, p);
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
    var Zc = function (a, b, c) {
        if (a.dataset) {
            a.dataset[Yc(b)] = c;
        } else {
            a.setAttribute("data-" + b, c);
        }
    };
    var Q = function (a, b) {
        if (a.dataset) {
            return a.dataset[Yc(b)];
        } else {
            return a.getAttribute("data-" + b);
        }
    };
    var $c = function (a, b) {
        if (a.dataset) {
            delete a.dataset[Yc(b)];
        } else {
            a.removeAttribute("data-" + b);
        }
    };
    var ad = {};
    var Yc = function (a) {
        return (
            ad[a] ||
            (ad[a] = ("" + a).replace(/\-([a-z])/g, function (a, c) {
                return c.toUpperCase();
            }))
        );
    };
    var bd = function (a) {
        if ((a = a || r("window.event"))) {
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
                    b = l;
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
            this.clientX = a.clientX !== i ? a.clientX : a.pageX;
            this.clientY = a.clientY !== i ? a.clientY : a.pageY;
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
    o = bd.prototype;
    o.type = "";
    o.target = l;
    o.relatedTarget = l;
    o.currentTarget = l;
    o.data = l;
    o.source = l;
    o.origin = l;
    o.state = l;
    o.keyCode = 0;
    o.charCode = 0;
    o.L = l;
    o.clientX = 0;
    o.clientY = 0;
    o.pageX = 0;
    o.pageY = 0;
    o.touches = l;
    o.changedTouches = l;
    o.preventDefault = function () {
        this.L.returnValue = n;
        if (this.L.preventDefault) {
            this.L.preventDefault();
        }
    };
    o.stopPropagation = function () {
        this.L.cancelBubble = k;
        if (this.L.stopPropagation) {
            this.L.stopPropagation();
        }
    };
    var dd = function (a) {
        var b = a.__yt_uid_key;
        if (!b) {
            b = cd();
            a.__yt_uid_key = b;
        }
        return b;
    };
    var cd = r("yt.dom.getNextId_");
    if (!cd) {
        cd = function () {
            return ++ed;
        };
        v("yt.dom.getNextId_", cd);
        var ed = 0;
    }
    var R = function (a, b) {
        return sc(a, l, b);
    };
    var fd = function (a, b, c) {
        a = Sb(a, b, c);
        if (a.length) {
            return a[0];
        } else {
            return l;
        }
    };
    var gd = function (a) {
        var a = cc(a);
        var b = document.createDocumentFragment();
        b.appendChild(a);
        return b;
    };
    var hd = function () {
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
    var id = r("yt.events.listeners_") || {};
    v("yt.events.listeners_", id);
    var jd = r("yt.events.counter_") || {
        count: 0
    };
    v("yt.events.counter_", jd);
    var kd = function (a, b, c, d) {
        return eb(id, function (e) {
            return e[0] == a && e[1] == b && e[2] == c && e[4] == !!d;
        });
    };
    var S = function (a, b, c, d) {
        if (!a || (!a.addEventListener && !a.attachEvent)) {
            return "";
        }
        var d = !!d;
        var e = kd(a, b, c, d);
        if (e) {
            return e;
        }
        var e = ++jd.count + "";
        var f = function (b) {
            b = new bd(b);
            b.currentTarget = a;
            return c.call(a, b);
        };
        id[e] = [a, b, c, f, d];
        if (a.addEventListener) {
            a.addEventListener(b, f, d);
        } else {
            a.attachEvent("on" + b, f);
        }
        return e;
    };
    var md = function (a, b, c, d) {
        return ld(a, "click", b, function (a) {
            return a.nodeName.toLowerCase() === c.toLowerCase() && (!d || D(a, d));
        });
    };
    var T = function (a, b, c, d) {
        return ld(a, b, c, function (a) {
            return D(a, d);
        });
    };
    var ld = function (a, b, c, d) {
        var e = a || document;
        return S(e, b, function (a) {
            var b = rc(
                a.target,
                function (a) {
                    return a === e || d(a);
                },
                k
            );
            if (b && b !== e) {
                a.currentTarget = b;
                c.call(b, a);
            }
        });
    };
    var od = function (a, b, c) {
        if ((a = kd(a, b, c, n))) {
            nd(a);
        }
    };
    var nd = function (a) {
        if (typeof a == "string") {
            a = [a];
        }
        y(a, function (a) {
            if (a in id) {
                var c = id[a];
                var d = c[0];
                var e = c[1];
                var f = c[3];
                var c = c[4];
                if (d.removeEventListener) {
                    d.removeEventListener(e, f, c);
                } else {
                    d.detachEvent("on" + e, f);
                }
                delete id[a];
            }
        });
    };
    var pd = function (a) {
        if (document.createEvent) {
            var b = document.createEvent("HTMLEvents");
            b.initEvent("click", k, k);
            a.dispatchEvent(b);
        } else {
            b = document.createEventObject();
            a.fireEvent("onclick", b);
        }
    };
    var qd = (window.yt && window.yt.config_) || {};
    v("yt.config_", qd);
    v("yt.globals_", (window.yt && window.yt.globals_) || {});
    var rd = (window.yt && window.yt.msgs_) || {};
    v("yt.msgs_", rd);
    var sd = (window.yt && window.yt.timeouts_) || [];
    v("yt.timeouts_", sd);
    var td = (window.yt && window.yt.intervals_) || [];
    v("yt.intervals_", td);
    var ud = function (a) {
        var b = arguments;
        if (b.length > 1) {
            var c = b[0];
            qd[c] = b[1];
        } else {
            b = b[0];
            for (c in b) {
                qd[c] = b[c];
            }
        }
    };
    var F = function (a) {
        if (a in qd) {
            return qd[a];
        } else {
            return i;
        }
    };
    var vd = function (a, b) {
        var c = window.setTimeout(a, b);
        sd.push(c);
        return c;
    };
    var wd = function (a, b) {
        var c = window.setInterval(a, b);
        td.push(c);
        return c;
    };
    var xd = function (a, b, c) {
        var d = b || {};
        if ((a = a in rd ? rd[a] : c)) {
            for (var e in d) {
                a = a.replace(RegExp("\\$" + e, "gi"), function () {
                    return d[e];
                });
            }
        }
        return a;
    };
    var yd = !!eval("/*@cc_on!@*/false");
    var zd = {};
    var Ad = function (a) {
        if (F("EVENTS_TRACKER_INSTALLED")) {
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
                b._trackEvent(a, i, i);
            });
        }
    };
    var Bd = {};
    var Cd = 0;
    var Dd = function (a, b) {
        var c = new Image();
        var d = "" + Cd++;
        Bd[d] = c;
        c.onload = c.onerror = function () {
            if (b && Bd[d]) {
                b();
            }
            delete Bd[d];
        };
        c.src = a;
        c = eval("null");
    };
    var Ed = function (a, b, c, d, e, f, h) {
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
    var Fd = RegExp(
        "^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([\\w\\d\\-\\u0100-\\uffff.%]*)(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$"
    );
    var Hd = function (a) {
        if (Gd) {
            Gd = n;
            var b = q.location;
            if (b) {
                var c = b.href;
                if (c && (c = (c = Hd(c)[3] || l) && decodeURIComponent(c)) && c != b.hostname) {
                    Gd = k;
                    g(Error());
                }
            }
        }
        return a.match(Fd);
    };
    var Gd = I;
    var Id = function () {
        var a = Hd(document.location.href);
        return Ed(a[1], a[2], a[3], a[4]);
    };
    var Jd = function (a) {
        a = Hd(a);
        return Ed(l, l, l, l, a[5], a[6], a[7]);
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
                a[1] = i;
            }
        }
        return a.join("");
    };
    var Ld = function (a, b) {
        for (var c in b) {
            var d = c;
            var e = b[c];
            var f = a;
            if (s(e)) {
                for (var h = 0; h < e.length; h++) {
                    f.push("&", d);
                    if (e[h] !== "") {
                        f.push("=", qa(e[h]));
                    }
                }
            } else if (e != l) {
                f.push("&", d);
                if (e !== "") {
                    f.push("=", qa(e));
                }
            }
        }
        return a;
    };
    var Md = function (a) {
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
                    if (s(b[f])) {
                        Pa(b[f], e);
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
    var Nd = function (a) {
        a = Ld([], a);
        a[0] = "";
        return a.join("");
    };
    var Od = function (a, b) {
        var c = a.split("?", 2);
        var a = c[0];
        var c = Md(c[1] || "");
        var d;
        for (d in b) {
            c[d] = b[d];
        }
        return Kd(Ld([a], c));
    };
    var Pd = function (a, b, c, d) {
        a = Kd(
            Ld(["/sharing_services"], {
                name: a,
                v: b,
                locale: c,
                feature: d
            })
        );
        Dd(a);
    };
    var Qd = "StopIteration" in q ? q.StopIteration : Error("StopIteration");
    var Rd = function () {};
    Rd.prototype.next = function () {
        g(Qd);
    };
    Rd.prototype.ik = function () {
        return this;
    };
    var Sd = function (a) {
        if (typeof a.Ka == "function") {
            return a.Ka();
        }
        if (t(a)) {
            return a.split("");
        }
        if (da(a)) {
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
        } else if (da(a) || t(a)) {
            y(a, b, c);
        } else {
            var d;
            if (typeof a.bb == "function") {
                d = a.bb();
            } else if (typeof a.Ka != "function") {
                if (da(a) || t(a)) {
                    d = [];
                    for (var e = a.length, f = 0; f < e; f++) {
                        d.push(f);
                    }
                } else {
                    d = db(a);
                }
            } else {
                d = i;
            }
            var e = Sd(a);
            for (var f = e.length, h = 0; h < f; h++) {
                b.call(c, e[h], d && d[h], a);
            }
        }
    };
    var Ud = function (a, b) {
        this.ba = {};
        this.r = [];
        var c = arguments.length;
        if (c > 1) {
            if (c % 2) {
                g(Error("Uneven number of arguments"));
            }
            for (var d = 0; d < c; d += 2) {
                this.set(arguments[d], arguments[d + 1]);
            }
        } else if (a) {
            if (a instanceof Ud) {
                c = a.bb();
                d = a.Ka();
            } else {
                c = db(a);
                d = cb(a);
            }
            for (var e = 0; e < c.length; e++) {
                this.set(c[e], d[e]);
            }
        }
    };
    o = Ud.prototype;
    o.n = 0;
    o.bc = 0;
    o.Ka = function () {
        Vd(this);
        var a = [];
        for (var b = 0; b < this.r.length; b++) {
            a.push(this.ba[this.r[b]]);
        }
        return a;
    };
    o.bb = function () {
        Vd(this);
        return this.r.concat();
    };
    o.xa = function (a) {
        return Wd(this.ba, a);
    };
    o.clear = function () {
        this.ba = {};
        this.bc = this.n = this.r.length = 0;
    };
    o.remove = function (a) {
        if (Wd(this.ba, a)) {
            delete this.ba[a];
            this.n--;
            this.bc++;
            if (this.r.length > this.n * 2) {
                Vd(this);
            }
            return k;
        } else {
            return n;
        }
    };
    var Vd = function (a) {
        if (a.n != a.r.length) {
            for (var b = 0, c = 0; b < a.r.length;) {
                var d = a.r[b];
                if (Wd(a.ba, d)) {
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
                if (!Wd(e, d)) {
                    a.r[c++] = d;
                    e[d] = 1;
                }
                b++;
            }
            a.r.length = c;
        }
    };
    Ud.prototype.get = function (a, b) {
        if (Wd(this.ba, a)) {
            return this.ba[a];
        } else {
            return b;
        }
    };
    Ud.prototype.set = function (a, b) {
        if (!Wd(this.ba, a)) {
            this.n++;
            this.r.push(a);
            this.bc++;
        }
        this.ba[a] = b;
    };
    Ud.prototype.S = function () {
        return new Ud(this);
    };
    var Xd = function (a) {
        Vd(a);
        var b = {};
        for (var c = 0; c < a.r.length; c++) {
            var d = a.r[c];
            b[d] = a.ba[d];
        }
        return b;
    };
    Ud.prototype.ik = function (a) {
        Vd(this);
        var b = 0;
        var c = this.r;
        var d = this.ba;
        var e = this.bc;
        var f = this;
        var h = new Rd();
        h.next = function () {
            while (true) {
                if (e != f.bc) {
                    g(Error("The map has changed since the iterator was created"));
                }
                if (b >= c.length) {
                    g(Qd);
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
    var Wd = function (a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    };
    var $d = function (a) {
        var b = new Ud();
        Yd(a, b, Zd);
        return b;
    };
    var be = function (a) {
        var b = [];
        Yd(a, b, ae);
        return b.join("&");
    };
    var Yd = function (a, b, c) {
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
                        e = ce(e);
                        if (e != l) {
                            for (var j, m = 0; (j = e[m]); m++) {
                                c(b, h, j);
                            }
                        }
                        break;
                    default:
                        j = ce(e);
                        if (j != l) {
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
    var Zd = function (a, b, c) {
        var d = a.get(b);
        if (!d) {
            d = [];
            a.set(b, d);
        }
        d.push(c);
    };
    var ae = function (a, b, c) {
        a.push(encodeURIComponent(b) + "=" + encodeURIComponent(c));
    };
    var ce = function (a) {
        var b = a.type;
        if (!ca(b)) {
            return l;
        }
        switch (b.toLowerCase()) {
            case "checkbox":
            case "radio":
                if (a.checked) {
                    return a.value;
                } else {
                    return l;
                }
            case "select-one":
                b = a.selectedIndex;
                if (b >= 0) {
                    return a.options[b].value;
                } else {
                    return l;
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
                    return l;
                }
            default:
                if (ca(a.value)) {
                    return a.value;
                } else {
                    return l;
                }
        }
    };
    var de = function (a) {
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
        g(Error("Invalid JSON string: " + a));
    };
    var ee = function (a) {
        return eval("(" + a + ")");
    };
    var fe = function () {
        this.nd = i;
    };
    var he = function (a, b, c) {
        switch (typeof b) {
            case "string":
                ge(b, c);
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
                if (b == l) {
                    c.push("null");
                    break;
                }
                if (s(b)) {
                    var d = b.length;
                    c.push("[");
                    var e = "";
                    for (var f = 0; f < d; f++) {
                        c.push(e);
                        e = b[f];
                        he(a, a.nd ? a.nd.call(b, "" + f, e) : e, c);
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
                            ge(f, c);
                            c.push(":");
                            he(a, a.nd ? a.nd.call(b, f, e) : e, c);
                            d = ",";
                        }
                    }
                }
                c.push("}");
                break;
            case "function":
                break;
            default:
                g(Error("Unknown type: " + typeof b));
        }
    };
    var ie = {
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
    var je = /\uffff/.test("￿") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;
    var ge = function (a, b) {
        b.push(
            '"',
            a.replace(je, function (a) {
                if (a in ie) {
                    return ie[a];
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
                return (ie[a] = e + b.toString(16));
            }),
            '"'
        );
    };
    var ke = l;
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
            f.open(c, a, k);
            a = c == "POST";
            if (e) {
                for (var h in e) {
                    f.setRequestHeader(h, e[h]);
                    if (h.toLowerCase() == "content-type") {
                        a = n;
                    }
                }
            }
            if (a) {
                f.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }
            f.send(d);
        }
    };
    var U = function (a, b) {
        var c = b.format || "JSON";
        if (b.yi) {
            a = document.location.protocol + "//" + document.location.hostname + a;
        }
        var d = b.J;
        if (d) {
            a = Od(a, d);
        }
        var e = b.of || "";
        if ((d = b.ea)) {
            e = Md(e);
            jb(e, d);
            e = Nd(e);
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
                        d = k;
                        break a;
                    default:
                        d = n;
                }
                var e = l;
                if (d || (a.status >= 400 && a.status < 500)) {
                    e = me(c, a);
                }
                if (d) {
                    a: {
                        switch (c) {
                            case "XML":
                                d = parseInt(e && e.return_code, 10) == 0;
                                break a;
                            case "RAW":
                                d = k;
                                break a;
                        }
                        d = !!e;
                    }
                }
                var e = e || {};
                var m = b.T || q;
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
    var me = function (a, b) {
        var c = l;
        switch (a) {
            case "JSON":
                var d = b.responseText;
                var e = b.getResponseHeader("Content-Type") || "";
                if (d && e.indexOf("json") >= 0) {
                    c = ee(d);
                }
                break;
            case "XML":
                if ((d = (d = b.responseXML) ? ne(d) : l)) {
                    c = {};
                    y(d.getElementsByTagName("*"), function (a) {
                        c[a.tagName] = oe(a);
                    });
                }
        }
        return c;
    };
    var ne = function (a) {
        if (!a) {
            return l;
        } else if ((a = ("responseXML" in a ? a.responseXML : a).getElementsByTagName("root")) && a.length > 0) {
            return a[0];
        } else {
            return l;
        }
    };
    var oe = function (a) {
        var b = "";
        y(a.childNodes, function (a) {
            b += a.nodeValue;
        });
        return b;
    };
    var pe = r("yt.net.ajax.tokenMap_") || {};
    v("yt.net.ajax.tokenMap_", pe);
    var qe = {};
    var re = {};
    var se = function (a, b) {
        var a = M(a);
        var c = b || ia(a);
        var d = qe[c];
        if (d) {
            qe[c] = Ea(d, function (b) {
                return b[0] != a;
            });
        }
    };
    var te = function (a) {
        if (a in qe && !re[a]) {
            y(qe[a], function (a) {
                var c = a[0];
                var a = a[1];
                if (c && c.tagName == "IMG") {
                    c.onload = "";
                    c.src = a;
                }
            });
            qe[a] = [];
            re[a] = k;
        }
    };
    var ue = function (a, b, c, d) {
        this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d;
    };
    ue.prototype.S = function () {
        return new ue(this.top, this.right, this.bottom, this.left);
    };
    ue.prototype.toString = function () {
        return "(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)";
    };
    ue.prototype.contains = function (a) {
        if (!this || !a) {
            return n;
        } else if (a instanceof ue) {
            return a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom;
        } else {
            return a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom;
        }
    };
    var ve = function (a, b, c, d) {
        this.left = a;
        this.top = b;
        this.width = c;
        this.height = d;
    };
    ve.prototype.S = function () {
        return new ve(this.left, this.top, this.width, this.height);
    };
    ve.prototype.toString = function () {
        return "(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)";
    };
    ve.prototype.contains = function (a) {
        if (a instanceof ve) {
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
    ve.prototype.Zc = function () {
        return new Za(this.width, this.height);
    };
    var xe = function (a, b, c) {
        if (t(b)) {
            we(a, c, b);
        } else {
            $a(b, la(we, a));
        }
    };
    var we = function (a, b, c) {
        a.style[za(c)] = b;
    };
    var ye = function (a, b) {
        var c = K(a);
        if (c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(a, l))) {
            return c[b] || c.getPropertyValue(b);
        } else {
            return "";
        }
    };
    var ze = function (a, b) {
        if (a.currentStyle) {
            return a.currentStyle[b];
        } else {
            return l;
        }
    };
    var Ae = function (a, b) {
        return ye(a, b) || ze(a, b) || (a.style && a.style[b]);
    };
    var Ce = function (a, b, c) {
        var d;
        var e = xb && (qb || Bb) && J("1.9");
        if (b instanceof E) {
            d = b.x;
            b = b.y;
        } else {
            d = b;
            b = c;
        }
        a.style.left = Be(d, e);
        a.style.top = Be(b, e);
    };
    var De = function (a) {
        var b = a.getBoundingClientRect();
        if (G) {
            a = a.ownerDocument;
            b.left -= a.documentElement.clientLeft + a.body.clientLeft;
            b.top -= a.documentElement.clientTop + a.body.clientTop;
        }
        return b;
    };
    var Ee = function (a) {
        if (G && !Mb(8)) {
            return a.offsetParent;
        }
        for (
            var b = K(a), c = Ae(a, "position"), d = c == "fixed" || c == "absolute", a = a.parentNode;
            a && a != b;
            a = a.parentNode
        ) {
            c = Ae(a, "position");
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
        return l;
    };
    var He = function (a) {
        var b = new ue(0, Infinity, Infinity, 0);
        var c = Rb(a);
        var d = c.k.body;
        var e = c.k.documentElement;
        var f = !I && Vb(c.k) ? c.k.documentElement : c.k.body;
        for (; (a = Ee(a));) {
            if (
                (!G || a.clientWidth != 0) &&
                (!I || a.clientHeight != 0 || a != d) &&
                a != d &&
                a != e &&
                Ae(a, "overflow") != "visible"
            ) {
                var h = Fe(a);
                var j;
                j = a;
                if (xb && !J("1.9")) {
                    var m = parseFloat(ye(j, "borderLeftWidth"));
                    if (Ge(j)) {
                        var p = j.offsetWidth - j.clientWidth - m - parseFloat(ye(j, "borderRightWidth"));
                        var m = m + p;
                    }
                    j = new E(m, parseFloat(ye(j, "borderTopWidth")));
                } else {
                    j = new E(j.clientLeft, j.clientTop);
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
        c = Yb(c.k.parentWindow || c.k.defaultView || window);
        b.right = Math.min(b.right, d + c.width);
        b.bottom = Math.min(b.bottom, f + c.height);
        if (b.top >= 0 && b.left >= 0 && b.bottom > b.top && b.right > b.left) {
            return b;
        } else {
            return l;
        }
    };
    var Fe = function (a) {
        var b;
        var c = K(a);
        var d = Ae(a, "position");
        var e =
            xb &&
            c.getBoxObjectFor &&
            !a.getBoundingClientRect &&
            d == "absolute" &&
            (b = c.getBoxObjectFor(a)) &&
            (b.screenX < 0 || b.screenY < 0);
        var f = new E(0, 0);
        var h;
        b = c ? (c.nodeType == 9 ? c : K(c)) : document;
        h = G && !Mb(9) && !uc(Rb(b)) ? b.body : b.documentElement;
        if (a == h) {
            return f;
        }
        if (a.getBoundingClientRect) {
            b = De(a);
            a = vc(Rb(c));
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
                if (I && Ae(b, "position") == "fixed") {
                    f.x += c.body.scrollLeft;
                    f.y += c.body.scrollTop;
                    break;
                }
                b = b.offsetParent;
            } while (b && b != a);
            if (wb || (I && d == "absolute")) {
                f.y -= c.body.offsetTop;
            }
            for (b = a; (b = Ee(b)) && b != c.body && b != h;) {
                f.x -= b.scrollLeft;
                if (!wb || b.tagName != "TR") {
                    f.y -= b.scrollTop;
                }
            }
        }
        return f;
    };
    var Ie = function (a) {
        var b = new E();
        if (a.nodeType == 1) {
            if (a.getBoundingClientRect) {
                a = De(a);
                b.x = a.left;
                b.y = a.top;
            } else {
                var c = vc(Rb(a));
                var a = Fe(a);
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
        var d = Fe(a);
        if (b instanceof E) {
            c = b.y;
            b = b.x;
        }
        Ce(a, a.offsetLeft + (b - d.x), a.offsetTop + (c - d.y));
    };
    var Be = function (a, b) {
        if (typeof a == "number") {
            a = (b ? Math.round(a) : a) + "px";
        }
        return a;
    };
    var Le = function (a) {
        if (Ae(a, "display") != "none") {
            return Ke(a);
        }
        var b = a.style;
        var c = b.display;
        var d = b.visibility;
        var e = b.position;
        b.visibility = "hidden";
        b.position = "absolute";
        b.display = "inline";
        a = Ke(a);
        b.display = c;
        b.position = e;
        b.visibility = d;
        return a;
    };
    var Ke = function (a) {
        var b = a.offsetWidth;
        var c = a.offsetHeight;
        var d = I && !b && !c;
        if ((!ca(b) || d) && a.getBoundingClientRect) {
            a = De(a);
            return new Za(a.right - a.left, a.bottom - a.top);
        } else {
            return new Za(b, c);
        }
    };
    var Me = function (a) {
        var b = Fe(a);
        var a = Le(a);
        return new ve(b.x, b.y, a.width, a.height);
    };
    var Ne = function (a, b) {
        a.style.display = b ? "" : "none";
    };
    var Ge = function (a) {
        return Ae(a, "direction") == "rtl";
    };
    var Oe = xb ? "MozUserSelect" : I ? "WebkitUserSelect" : l;
    var Pe = function (a, b, c) {
        c = !c ? a.getElementsByTagName("*") : l;
        if (Oe) {
            b = b ? "none" : "";
            a.style[Oe] = b;
            if (c) {
                for (var a = 0, d; (d = c[a]); a++) {
                    d.style[Oe] = b;
                }
            }
        } else if (G || wb) {
            b = b ? "on" : "";
            a.setAttribute("unselectable", b);
            if (c) {
                for (a = 0; (d = c[a]); a++) {
                    d.setAttribute("unselectable", b);
                }
            }
        }
    };
    var Qe = function (a, b) {
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
    var Re = {
        thin: 2,
        medium: 4,
        thick: 6
    };
    var Se = function (a, b) {
        if (ze(a, b + "Style") == "none") {
            return 0;
        }
        var c = ze(a, b + "Width");
        if (c in Re) {
            return Re[c];
        } else {
            return Qe(a, c);
        }
    };
    var Te = function (a, b) {
        if ((a = M(a)) && a.style) {
            Ne(a, b);
            Wa(a, "hid", !b);
        }
    };
    var Ue = function (a) {
        a = M(a);
        if (!a) {
            return n;
        } else {
            return a.style.display != "none" && !D(a, "hid");
        }
    };
    var Ve = function (a) {
        if ((a = M(a))) {
            if (Ue(a)) {
                Ne(a, n);
                B(a, "hid");
            } else {
                Ne(a, k);
                C(a, "hid");
            }
        }
    };
    var V = function (a) {
        y(arguments, function (a) {
            Te(a, k);
        });
    };
    var W = function (a) {
        y(arguments, function (a) {
            Te(a, n);
        });
    };
    var Xe = function (a) {
        We(function (a, c) {
            var d = Q(a, "group-key");
            if (d) {
                se(a, d);
                $c(a, "group-key");
            }
            a.src = c;
        }, a);
    };
    var We = function (a, b) {
        var c = Sb("img", l, b);
        y(c, function (b) {
            var c = Q(b, "thumb");
            if (c) {
                a.call(q, b, c);
            }
        });
    };
    var Ze = function (a, b) {
        T(a, "click", Ye, "feed-item-show-aggregate");
        if (b) {
            T(
                a,
                "click",
                function (a) {
                    a = tc(a.currentTarget, "feed-item") || a.currentTarget;
                    b.call(q, a);
                    var d = tc(a, "feed-item-container");
                    if (d) {
                        fc(d);
                    } else {
                        fc(a);
                    }
                },
                "feed-item-remove"
            );
        }
    };
    var Ye = function (a) {
        var a = a.currentTarget;
        var b = tc(a, "feed-item");
        if (Xa(b, "expanded")) {
            Xe(b);
            var b = Q(a, "num-aggregated-actions") || 0;
            var c = Q(a, "num-aggregated-users") || 0;
            var a = Q(a, "num-aggregated-videos") || 0;
            var a = Nd({
                actions: b,
                users: c,
                videos: a
            });
            Ad(a || "null");
            a = "a=feed_item_expanded" + (a ? "&" + a : "").replace(/\//g, "&");
            Dd("/gen_204?" + a, i);
        }
    };
    var af = function () {
        this.pg = M("activity-feeds-settings-button");
        if (!this.pg) {
            return l;
        }
        this.G = M("activity-feed-settings-form");
        if (!this.G) {
            return l;
        }
        this.lg = this.G.comment_mode;
        this.kg = {};
        $e(this);
        S(this.pg, "click", u(this.Fj, this));
        T(this.G, "click", u(this.mg, this), "cancel-edit-mode");
        T(this.G, "click", u(this.Ej, this), "apply-changes");
    };
    af.prototype.Ej = function (a) {
        a.preventDefault();
        var a = Xd($d(this.G));
        var b = this.G.getAttribute("action");
        B(this.G, "busy");
        U(b, {
            method: "POST",
            ea: a,
            z: u(this.mj, this)
        });
    };
    af.prototype.Fj = function (a) {
        a.preventDefault();
        if (Ue(this.G)) {
            this.mg();
        } else {
            V(this.G);
        }
    };
    af.prototype.mj = function () {
        window.location.reload();
    };
    var $e = function (a) {
        y(
            a.lg,
            function (a) {
                this.kg[ia(a)] = a.checked;
            },
            a
        );
    };
    var bf = function (a) {
        y(
            a.lg,
            function (a) {
                a.checked = this.kg[ia(a)];
            },
            a
        );
    };
    af.prototype.mg = function () {
        W(this.G);
        bf(this);
    };
    var cf = function (a) {
        if (a) {
            this.c = a;
            this.Qc = O("activity-feeds-container", a);
            this.cb = O("add-bulletin-form", a);
            new af();
            Ze(this.Qc, u(this.Ui, this));
            T(this.Qc, "click", u(this.Vi, this), "remove-post");
            T(this.Qc, "click", u(this.Wi, this), "report-spam");
            T(this.Qc, "click", u(this.Si, this), "approve-comment");
            if (this.cb) {
                Qc(this.cb, "click", u(this.Ri, this));
                P(this.cb, "submit", u(this.Ti, this));
            }
        }
    };
    o = cf.prototype;
    o.Ri = function () {
        B(this.cb, "activated");
    };
    o.Ti = function (a) {
        a.preventDefault();
        a = Xd($d(this.cb));
        B(this.cb, "loading");
        var b = {};
        b.SUCCESS = u(function () {
            window.location = F("RECENT_ACTIVITY_URL");
        }, this);
        b.ERROR = u(function () {
            C(this.cb, "loading");
        }, this);
        df(this, "add_bulletin", a, b);
    };
    o.Ui = function (a) {
        df(
            this,
            "remove_post",
            {
                post_id: Q(a, "external-id")
            },
            {}
        );
    };
    o.Vi = function (a) {
        var b = tc(a.currentTarget, "post-item");
        df(
            this,
            "remove_post",
            {
                post_id: Q(b, "post-id")
            },
            {
                SUCCESS: function () {
                    fc(b);
                }
            }
        );
    };
    o.Wi = function (a) {
        var b = a.currentTarget;
        var a = sc(b, "li", "post-item");
        df(
            this,
            "report_spam",
            {
                post_id: Q(a, "post-id")
            },
            {
                SUCCESS: function () {
                    B(b, "yt-uix-button-toggled");
                }
            }
        );
    };
    o.Si = function (a) {
        var a = sc(a.currentTarget, "li", "post-item");
        var b = O("comment-pending-approval", a);
        df(
            this,
            "approve_comment",
            {
                post_id: Q(a, "post-id")
            },
            {
                SUCCESS: function () {
                    fc(b);
                }
            }
        );
    };
    var df = function (a, b, c, d) {
        var e = {};
        e["action_" + b] = "1";
        c.channel_id = F("CHANNEL_ID");
        c.session_token = pe.channel_ajax;
        c.module = Q(a.c, "module-id");
        U("/channel_ajax", {
            method: "POST",
            J: e,
            ea: c,
            z: function (a, b) {
                var c = M("recent-activity-alert-container");
                c.innerHTML = "";
                var e = d[b.code];
                if (e) {
                    e(b);
                }
                if (b.errors) {
                    e = M("recent-activity-alert-template").cloneNode(k);
                    ef(b.errors[0], e, c);
                }
            }
        });
    };
    var ff = function () {
        this.ha = [];
        this.ua = {};
    };
    w(ff, wc);
    o = ff.prototype;
    o.wg = 1;
    o.bd = 0;
    o.Ig = function (a, b, c) {
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
    o.Je = function (a) {
        if (this.bd != 0) {
            if (!this.Vb) {
                this.Vb = [];
            }
            this.Vb.push(a);
            return n;
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
    o.Hg = function (a, b) {
        var c = this.ua[a];
        if (c) {
            this.bd++;
            var d = Qa(arguments, 1);
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
        return n;
    };
    o.clear = function (a) {
        if (a) {
            var b = this.ua[a];
            if (b) {
                y(b, this.Je, this);
                delete this.ua[a];
            }
        } else {
            this.ha.length = 0;
            this.ua = {};
        }
    };
    o.e = function () {
        ff.b.e.call(this);
        delete this.ha;
        delete this.ua;
        delete this.Vb;
    };
    var gf = r("yt.pubsub.instance_") || new ff();
    ff.prototype.subscribe = ff.prototype.Ig;
    ff.prototype.unsubscribeByKey = ff.prototype.Je;
    ff.prototype.publish = ff.prototype.Hg;
    ff.prototype.clear = ff.prototype.clear;
    v("yt.pubsub.instance_", gf);
    var hf = function (a, b, c) {
        var d = r("yt.pubsub.instance_");
        if (d) {
            d.subscribe(
                a,
                function () {
                    var a = arguments;
                    vd(function () {
                        b.apply(c || q, a);
                    }, 0);
                },
                c
            );
        }
    };
    var jf = function (a, b) {
        var c = r("yt.pubsub.instance_");
        if (c) {
            c.publish.apply(c, arguments);
        }
    };
    var kf = function (a, b) {
        if (a == "view" && b.convViewUrl) {
            return b.convViewUrl;
        }
        if (!b.baseUrl || !b.uid) {
            return l;
        }
        var c = b.rmktEnabled && b.vid;
        var d = b.focEnabled;
        if (!c && !d) {
            return l;
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
        return Kd(Ld([b.baseUrl], e));
    };
    var lf = function (a) {
        var b = F("CONVERSION_CONFIG_DICT");
        if (b && (a = kf(a, b))) {
            Dd(a);
        }
    };
    var nf = function (a, b, c, d, e, f, h) {
        var j;
        var m = c.offsetParent;
        if (m) {
            var p = m.tagName == "HTML" || m.tagName == "BODY";
            if (!p || Ae(m, "position") != "static") {
                j = Fe(m);
                if (!p) {
                    j = Ya(j, new E(m.scrollLeft, m.scrollTop));
                }
            }
        }
        m = Me(a);
        if ((p = He(a))) {
            var z = new ve(p.left, p.top, p.right - p.left, p.bottom - p.top);
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
        p = Rb(a);
        H = Rb(c);
        if (p.k != H.k) {
            var A = p.k.body;
            var H = H.k.parentWindow || H.k.defaultView;
            var z = new E(0, 0);
            var L = K(A) ? K(A).parentWindow || K(A).defaultView : window;
            var Ha = A;
            do {
                var pb = L == H ? Fe(Ha) : Ie(Ha);
                z.x += pb.x;
                z.y += pb.y;
            } while (L && L != H && (Ha = L.frameElement) && (L = L.parent));
            A = Ya(z, Fe(A));
            if (G && !uc(p)) {
                A = Ya(A, vc(p));
            }
            m.left += A.x;
            m.top += A.y;
        }
        a = (b & 4 && Ge(a) ? b ^ 2 : b) & -5;
        b = new E(a & 2 ? m.left + m.width : m.left, a & 1 ? m.top + m.height : m.top);
        if (j) {
            b = Ya(b, j);
        }
        if (e) {
            b.x += (a & 2 ? -1 : 1) * e.x;
            b.y += (a & 1 ? -1 : 1) * e.y;
        }
        var Na;
        if (h && (Na = He(c)) && j) {
            Na.top -= j.y;
            Na.right -= j.x;
            Na.bottom -= j.y;
            Na.left -= j.x;
        }
        return mf(b, c, d, f, Na, h, i);
    };
    var mf = function (a, b, c, d, e, f, h) {
        var a = a.S();
        var j = 0;
        var m = (c & 4 && Ge(b) ? c ^ 2 : c) & -5;
        var c = Le(b);
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
            e = uc(Rb(K(b)));
            if (G && (!e || !J("8"))) {
                a = b.style;
                if (e) {
                    if (G) {
                        e = Qe(b, ze(b, "paddingLeft"));
                        c = Qe(b, ze(b, "paddingRight"));
                        f = Qe(b, ze(b, "paddingTop"));
                        d = Qe(b, ze(b, "paddingBottom"));
                        e = new ue(f, c, d, e);
                    } else {
                        e = ye(b, "paddingLeft");
                        c = ye(b, "paddingRight");
                        f = ye(b, "paddingTop");
                        d = ye(b, "paddingBottom");
                        e = new ue(parseFloat(f), parseFloat(c), parseFloat(d), parseFloat(e));
                    }
                    if (G) {
                        c = Se(b, "borderLeft");
                        f = Se(b, "borderRight");
                        d = Se(b, "borderTop");
                        b = Se(b, "borderBottom");
                        b = new ue(d, f, b, c);
                    } else {
                        c = ye(b, "borderLeftWidth");
                        f = ye(b, "borderRightWidth");
                        d = ye(b, "borderTopWidth");
                        b = ye(b, "borderBottomWidth");
                        b = new ue(parseFloat(d), parseFloat(f), parseFloat(b), parseFloat(c));
                    }
                    a.pixelWidth = h.width - b.left - e.left - e.right - b.right;
                    a.pixelHeight = h.height - b.top - e.top - e.bottom - b.bottom;
                } else {
                    a.pixelWidth = h.width;
                    a.pixelHeight = h.height;
                }
            } else {
                b = b.style;
                if (xb) {
                    b.MozBoxSizing = "border-box";
                } else if (I) {
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
    var of = {};
    var pf = "ontouchstart" in document;
    var qf = function (a, b) {
        var c = of[a].maxNumParents[b];
        var d;
        if (c > 0) {
            d = c;
        } else if (a.indexOf("mouse") != -1) {
            d = 2;
        }
        return d;
    };
    var rf = function (a, b, c) {
        return (
            rc(
                b,
                function (b) {
                    return D(b, a);
                },
                k,
                c
            ) || l
        );
    };
    var X = function (a) {
        if (a.target.tagName != "HTML" && a.type in of) {
            var b = of[a.type];
            var c;
            for (c in b.ua) {
                var d = qf(a.type, c);
                var e = rf(c, a.target, d);
                if (e) {
                    var f = k;
                    if (
                        b.checkRelatedTarget[c] &&
                        a.relatedTarget &&
                        rc(
                            a.relatedTarget,
                            function (a) {
                                return a == e;
                            },
                            k,
                            d
                        )
                    ) {
                        f = n;
                    }
                    if (f) {
                        b.Hg(c, e, a.type, a);
                    }
                }
            }
        }
    };
    S(document, "blur", X, k);
    S(document, "change", X, k);
    S(document, "click", X);
    S(document, "focus", X, k);
    S(document, "mouseover", X);
    S(document, "mouseout", X);
    S(document, "keydown", X);
    S(document, "keyup", X);
    S(document, "keypress", X);
    S(document, "cut", X);
    S(document, "paste", X);
    if (pf) {
        S(document, "touchstart", X);
        S(document, "touchend", X);
        S(document, "touchcancel", X);
    }
    var sf = (window.yt && window.yt.uix && window.yt.uix.widgets_) || {};
    v("yt.uix.widgets_", sf);
    var tf = function (a) {
        var a = a.getInstance();
        var b = Y(a);
        if (!(b in sf) && a.Pe()) {
            a.I();
            sf[b] = a;
        }
    };
    var uf = function () {
        this.Ma = {};
    };
    o = uf.prototype;
    o.Ng = !!eval("/*@cc_on!@*/false");
    o.Pe = function () {
        return k;
    };
    o.addBehavior = function (a, b, c, d, e) {
        var c = Y(this, c);
        var f = u(b, this);
        if (!(a in of)) {
            of[a] = new ff();
            of[a].maxNumParents = {};
            of[a].checkRelatedTarget = {};
        }
        a = of[a];
        a.Ig(c, f);
        a.maxNumParents[c] = d;
        a.checkRelatedTarget[c] = e;
        this.Ma[b] = f;
    };
    o.Lb = function (a, b, c) {
        var d = this.getData(a, b);
        if (d && (d = r(d))) {
            var e = Qa(arguments, 2);
            Ra(e, 0, 0, a);
            d.apply(l, e);
        }
    };
    o.getData = function (a, b) {
        return Q(a, b);
    };
    o.setData = function (a, b, c) {
        Zc(a, b, c);
    };
    var Y = function (a, b) {
        return "yt-uix" + (a.La ? "-" + a.La : "") + (b ? "-" + b : "");
    };
    var vf = function () {
        this.Ma = {};
    };
    w(vf, uf);
    vf.prototype.Pe = function () {
        if (this.Ng && Jb.indexOf("6") == 0) {
            return n;
        } else {
            return k;
        }
    };
    vf.prototype.show = function (a) {
        var b = R(a, Y(this));
        if (b) {
            B(b, Y(this, "active"));
            var c = wf(this, a, b);
            if (c) {
                c.cardTargetNode = a;
                c.cardRootNode = b;
                xf(this, a, c);
                var d = Y(this, "card-visible");
                vd(function () {
                    V(c);
                    B(c, d);
                }, 10);
                this.Lb(b, "card-action", a);
            }
        }
    };
    var wf = function (a, b, c) {
        var d = Y(a, "card");
        var e = d + dd(c);
        var f = M(e);
        if (f) {
            return f;
        }
        var h = a.ia(c);
        if (!h) {
            return l;
        }
        f = document.createElement("div");
        f.id = e;
        f.className = d;
        if ((c = Q(c, "card-class"))) {
            B(f, c);
        }
        c = document.createElement("div");
        c.className = Y(a, "card-border");
        b = a.getData(b, "orientation") || "horizontal";
        d = document.createElement("div");
        d.className = "yt-uix-card-border-arrow yt-uix-card-border-arrow-" + b;
        e = document.createElement("div");
        e.className = Y(a, "card-body");
        a = document.createElement("div");
        a.className = "yt-uix-card-body-arrow yt-uix-card-body-arrow-" + b;
        fc(h);
        e.appendChild(h);
        c.appendChild(a);
        c.appendChild(e);
        f.appendChild(d);
        f.appendChild(c);
        document.body.appendChild(f);
        return f;
    };
    var xf = function (a, b, c) {
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
        var p = Ge(document.body);
        var z = Ge(b);
        if (p != z) {
            m ^= 2;
        }
        var A;
        if (d) {
            z = b.offsetHeight / 2 - 24;
            A = new E(-12, b.offsetHeight + 6);
        } else {
            z = b.offsetWidth / 2 - 12;
            A = new E(b.offsetWidth + 6, -12);
        }
        var H = l;
        if (!f) {
            H = 10;
        }
        var L = Y(a, "card-flip");
        var a = Y(a, "card-reverse");
        Wa(c, L, e);
        Wa(c, a, h);
        H = nf(b, m, c, j, A, l, H);
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
            Wa(c, L, e);
            Wa(c, a, h);
            nf(b, m, c, j, A);
        }
        b = O("yt-uix-card-body-arrow", c);
        f = O("yt-uix-card-border-arrow", c);
        c = Le(c);
        z = Math.max(6, Math.min(z, (d ? c.height : c.width) - 24 - 6));
        c = d ? (h ? "top" : "bottom") : (!p && e) || (p && !e) ? "left" : "right";
        b.setAttribute("style", "");
        f.setAttribute("style", "");
        b.style[c] = z + "px";
        f.style[c] = z + "px";
    };
    vf.prototype.Gb = function (a) {
        var b = R(a, Y(this));
        if (b && (a = wf(this, a, b))) {
            C(b, Y(this, "active"));
            C(a, Y(this, "card-visible"));
            W(a);
            a.cardTargetNode = l;
            a.cardRootNode = l;
        }
    };
    vf.prototype.vc = function (a) {
        a = R(a, Y(this));
        if (!a) {
            return n;
        } else {
            return D(a, Y(this, "active"));
        }
    };
    vf.prototype.ia = function (a) {
        var b = a.cardContentNode;
        if (!b) {
            var c = Y(this, "content");
            var d = Y(this, "card-content");
            var e = (b = O(c, a));
            var f = Ta(e);
            if (t(c)) {
                Ka(f, c);
            } else if (s(c)) {
                f = Va(f, c);
            }
            if (t(d) && !Ja(f, d)) {
                f.push(d);
            } else if (s(d)) {
                Ua(f, d);
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
    var yf = function () {
        this.Ma = {};
    };
    w(yf, vf);
    aa(yf);
    o = yf.prototype;
    o.La = "hovercard";
    o.I = function () {
        this.addBehavior("mouseover", this.$j, "target", 5, k);
        this.addBehavior("mouseout", this.Yj, "target", 5, k);
        this.addBehavior("mouseover", this.ak, "card", 100);
        this.addBehavior("mouseout", this.Zj, "card", 100);
    };
    o.$j = function (a) {
        if (zf != a) {
            if (zf) {
                this.Gb(zf);
                zf = l;
            }
            var b = u(this.show, this, a);
            var c = parseInt(this.getData(a, "delay-show"), 10);
            var b = vd(b, c > -1 ? c : this.Dg.Vj);
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
    o.Yj = function (a) {
        var b = parseInt(this.getData(a, "card-timer"), 10);
        window.clearTimeout(b);
        R(a, Y(this)).isCardHidable = k;
        b = parseInt(this.getData(a, "delay-hide"), 10);
        b = b > -1 ? b : this.Dg.bk;
        vd(u(this.dk, this, a), b);
        if ((b = this.getData(a, "card-alt"))) {
            a.alt = b;
        }
        if ((b = this.getData(a, "card-title"))) {
            a.title = b;
        }
    };
    o.dk = function (a) {
        if (R(a, Y(this)).isCardHidable) {
            this.Gb(a);
            zf = l;
        }
    };
    o.ak = function (a) {
        if (a) {
            a.cardRootNode.isCardHidable = n;
        }
    };
    o.Zj = function (a, b, c) {
        if (a) {
            b = a.cardTargetNode;
            if (!jc(a, c.relatedTarget)) {
                this.Gb(b);
            }
        }
    };
    var zf = l;
    var Af = function () {
        this.Ma = {};
    };
    w(Af, uf);
    aa(Af);
    o = Af.prototype;
    o.La = "tooltip";
    o.md = 0;
    o.I = function () {
        this.addBehavior("mouseover", this.ed);
        this.addBehavior("mouseout", this.hc);
        this.addBehavior("click", this.hc);
        this.addBehavior("touchstart", this.Me);
        this.addBehavior("touchend", this.jd);
        this.addBehavior("touchcancel", this.jd);
    };
    o.Pe = function () {
        return !this.Ng || Jb.indexOf("6") != 0;
    };
    o.ed = function (a) {
        if (!this.md || !(ma() - this.md < 1000)) {
            var b = parseInt(this.getData(a, "tooltip-hide-timer"), 10);
            if (b) {
                $c(a, "tooltip-hide-timer");
                window.clearTimeout(b);
            }
            var b = u(function () {
                Bf(this, a);
                $c(a, "tooltip-show-timer");
            }, this);
            var c = parseInt(this.getData(a, "tooltip-show-delay"), 10) || 0;
            var b = vd(b, c);
            this.setData(a, "tooltip-show-timer", b.toString());
            if (a.title) {
                this.setData(a, "tooltip-text", a.title);
                a.title = "";
            }
        }
    };
    o.hc = function (a) {
        var b = parseInt(this.getData(a, "tooltip-show-timer"), 10);
        if (b) {
            window.clearTimeout(b);
            $c(a, "tooltip-show-timer");
        }
        b = u(function () {
            Cf(this, a);
            $c(a, "tooltip-hide-timer");
        }, this);
        b = vd(b, 50);
        this.setData(a, "tooltip-hide-timer", b.toString());
        if ((b = this.getData(a, "tooltip-text"))) {
            a.title = b;
        }
    };
    o.Me = function (a, b, c) {
        this.md = 0;
        this.ed(rf(Y(this), c.changedTouches[0].target, qf(b, Y(this))), b);
    };
    o.jd = function (a, b, c) {
        this.md = ma();
        this.hc(rf(Y(this), c.changedTouches[0].target, qf(b, Y(this))), b);
    };
    var Df = function (a, b, c) {
        a.setData(b, "tooltip-text", c);
        a = a.getData(b, "content-id");
        if ((a = M(a))) {
            a.innerHTML = c;
        }
    };
    Af.prototype.Gg = function (a) {
        return this.getData(a, "tooltip-text") || a.title;
    };
    var Bf = function (a, b) {
        if (b) {
            var c = a.Gg(b);
            if (c) {
                var d = M(Ef(a, b));
                if (!d) {
                    d = document.createElement("div");
                    d.id = Ef(a, b);
                    d.className = Y(a, "tip");
                    var e = document.createElement("div");
                    e.className = Y(a, "tip-body");
                    var f = document.createElement("div");
                    f.className = Y(a, "tip-arrow");
                    var h = document.createElement("div");
                    h.className = Y(a, "tip-content");
                    var j = a.ic(b);
                    var m = Ef(a, b, "content");
                    h.id = m;
                    a.setData(b, "content-id", m);
                    e.appendChild(h);
                    if (j) {
                        d.appendChild(j);
                    }
                    d.appendChild(e);
                    d.appendChild(f);
                    (hd() || document.body).appendChild(d);
                    Df(a, b, c);
                    if ((c = parseInt(a.getData(b, "tooltip-max-width"), 10)) && e.offsetWidth > c) {
                        e.style.width = c + "px";
                        B(h, Y(a, "normal-wrap"));
                    }
                    h = D(b, Y(a, "reverse"));
                    if (!a.Te(b, d, e, j, f, h)) {
                        a.Te(b, d, e, j, f, !h);
                    }
                    var p = Y(a, "tip-visible");
                    vd(function () {
                        B(d, p);
                    }, 0);
                }
            }
        }
    };
    Af.prototype.Te = function (a, b, c, d, e, f) {
        Wa(b, Y(this, "tip-reverse"), f);
        var h = 0;
        if (f) {
            h = 1;
        }
        var e = Le(a);
        var f = new E((e.width - 10) / 2, f ? e.height : 0);
        var j = Fe(a);
        mf(new E(j.x + f.x, j.y + f.y), b, h);
        var h = Yb(window);
        var j = Ie(b);
        var b = Le(c);
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
    var Cf = function (a, b) {
        if (b) {
            var c = M(Ef(a, b));
            if (c) {
                Ff(c);
                fc(c);
                $c(b, "content-id");
            }
        }
    };
    var Ef = function (a, b, c) {
        a = Y(a) + dd(b);
        if (c) {
            a += "-" + c;
        }
        return a;
    };
    Af.prototype.ic = function (a) {
        var b = l;
        if (rb && D(a, Y(this, "masked"))) {
            if ((b = M("yt-uix-tooltip-shared-mask"))) {
                b.parentNode.removeChild(b);
                V(b);
            } else {
                b = document.createElement("iframe");
                b.src = 'javascript:""';
                b.id = "yt-uix-tooltip-shared-mask";
                b.className = Y(this, "tip-mask");
            }
        }
        return b;
    };
    var Ff = function (a) {
        var b = M("yt-uix-tooltip-shared-mask");
        var c =
            b &&
            rc(
                b,
                function (b) {
                    return b == a;
                },
                n,
                2
            );
        if (b && c) {
            b.parentNode.removeChild(b);
            W(b);
            document.body.appendChild(b);
        }
    };
    var Gf = function (a, b) {
        this.l = a;
        this.Fc = b || l;
        this.sb = Q(a, "subscription-type") || "user";
        this.yc = Q(a, "subscription-value") || "";
        this.Xi = !!Q(a, "enable-tooltip");
        this.Dc = !!Q(a, "enable-hovercard");
        this.Wa = n;
        this.ub();
    };
    var Hf = function (a, b) {
        var c = N("yt-subscription-button-js-default", a);
        y(c, function (a) {
            if (!Q(a, "subscription-initialized")) {
                new Gf(a, b);
                Zc(a, "subscription-initialized", "true");
            }
        });
    };
    Gf.prototype.getId = function () {
        return Q(this.l, "subscription-id") || l;
    };
    Gf.prototype.qb = function (a) {
        if (a) {
            Zc(this.l, "subscription-id", a);
        } else {
            $c(this.l, "subscription-id");
        }
        If(this);
    };
    Gf.prototype.getValue = function () {
        return this.yc;
    };
    Gf.prototype.getType = function () {
        return this.sb;
    };
    var If = function (a) {
        Wa(a.l, "subscribed", !!a.getId());
        var b = Y(yf.getInstance(), "target");
        Wa(a.l, b, !!a.getId() && a.Dc);
        if (a.Xi) {
            b = (a.getId() ? "un" : "") + "subscribe-tooltip";
            b = Q(a.l, b) || "";
            Df(Af.getInstance(), a.l, b);
        }
    };
    Gf.prototype.ub = function () {
        S(this.l, "click", u(this.Kd, this));
        hf("SUBSCRIBE", this.hg, this);
        hf("UNSUBSCRIBE", this.hg, this);
        if (this.Dc) {
            S(this.l, "mouseover", u(this.zj, this));
        }
        If(this);
    };
    Gf.prototype.hg = function (a, b, c, d) {
        if (c != this.getId() && this.getValue() == a && this.getType() == b) {
            this.qb(c);
        }
        if (d != this.l && this.Dc) {
            yf.getInstance().Gb(this.l);
        }
    };
    Gf.prototype.Kd = function () {
        if (this.Wa) {
            return n;
        }
        Cf(Af.getInstance(), this.l);
        if (this.getId()) {
            Jf(this);
        } else {
            this.jg();
        }
    };
    Gf.prototype.zj = function () {
        if (this.getId()) {
            vd(
                u(function () {
                    Kf(this);
                }, this),
                350
            );
        }
    };
    var Kf = function (a) {
        var b = yf.getInstance();
        if (!a.xf && b.vc(a.l)) {
            a.xf = k;
            var c = {
                hovercard: 1
            };
            c["action_get_subscription_form_for_" + a.sb] = 1;
            var d = {
                session_token: pe.subscription_ajax
            };
            d[Lf(a)] = a.yc;
            U("/subscription_ajax", {
                method: "POST",
                J: c,
                ea: d,
                T: a,
                z: function (a, c) {
                    var d = this.l;
                    var j = c.response.html_content;
                    var m = R(d, Y(b));
                    if (m) {
                        var p = b.ia(m);
                        if (p) {
                            p.innerHTML = j;
                            if (D(m, Y(b, "active"))) {
                                j = wf(b, d, m);
                                xf(b, d, j);
                            }
                        }
                    }
                    Mf(this);
                },
                ka: function () {
                    this.xf = n;
                }
            });
        }
    };
    var Mf = function (a) {
        var b = yf.getInstance();
        var c = R(a.l, Y(b));
        var d = b.ia(c);
        y(
            d.getElementsByTagName("input"),
            function (a) {
                S(
                    a,
                    "change",
                    u(function () {
                        var a = d.getElementsByTagName("form")[0];
                        var b = a.action || document.location.href;
                        var c = a.method.toUpperCase() || "GET";
                        var a = be(a);
                        le(b, i, c, a, i);
                    }, this)
                );
            },
            a
        );
    };
    Gf.prototype.jg = function () {
        if (F("LOGGED_IN")) {
            var a = Lf(this);
            var b = {};
            b["action_create_subscription_to_" + this.sb] = 1;
            var c = Q(this.l, "subscription-feature");
            if (c) {
                b.feature = c;
            }
            c = {
                session_token: Nf()
            };
            c[a] = this.yc;
            this.Wa = k;
            this.l.disabled = k;
            U("/subscription_ajax", {
                method: "POST",
                T: this,
                J: b,
                ea: c,
                z: function (a, b) {
                    this.qb(b.response.id);
                    jf("SUBSCRIBE", this.getValue(), this.getType(), this.getId(), this.l);
                    if (this.Dc) {
                        yf.getInstance().show(this.l);
                        Kf(this);
                    }
                    if (this.Fc) {
                        this.Fc(this.l, k);
                    }
                },
                ra: function () {
                    this.Wa = n;
                    this.l.disabled = n;
                }
            });
            lf("subscribe");
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
        var d = Q(a.l, "subscription-feature");
        if (d) {
            c.feature = d;
        }
        a.Wa = k;
        a.l.disabled = k;
        U("/subscription_ajax", {
            method: "POST",
            T: a,
            J: c,
            ea: b,
            z: function () {
                this.qb(l);
                jf("UNSUBSCRIBE", this.getValue(), this.getType(), l, l);
                if (this.Fc) {
                    this.Fc(this.l, n);
                }
            },
            ra: function () {
                this.Wa = n;
                this.l.disabled = n;
            }
        });
        lf("unsubscribe");
    };
    var Lf = function (a) {
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
        return pe.subscription_ajax;
    };
    var Of = function (a) {
        Gf.call(this, a);
    };
    w(Of, Gf);
    Of.prototype.jg = function () {
        if (F("LOGGED_IN")) {
            var a = {
                session_token: Nf(),
                u: this.yc
            };
            this.Wa = k;
            this.l.disabled = k;
            U("/subscription_ajax?action_create_subscription_to_user_channels3=1&feature=channels3", {
                method: "POST",
                T: this,
                ea: a,
                z: function (a, c) {
                    this.qb(c.response.id);
                    var d = c.response.html_content;
                    var e = M("recommended-channels-list");
                    if (e && d) {
                        e.innerHTML = d;
                        Hf();
                        V(e.parentNode);
                    }
                },
                ra: function () {
                    this.Wa = n;
                    this.l.disabled = n;
                }
            });
        }
    };
    var Pf = function (a) {
        this.Ae = a;
        this.r = [];
    };
    w(Pf, wc);
    var Qf = [];
    var Z = function (a, b, c, d, e, f) {
        if (!s(c)) {
            Qf[0] = c;
            c = Qf;
        }
        for (var h = 0; h < c.length; h++) {
            a.r.push(P(b, c[h], d || a, e || n, f || a.Ae || a));
        }
        return a;
    };
    var Rf = function (a, b, c, d, e, f) {
        if (s(c)) {
            for (var h = 0; h < c.length; h++) {
                Rf(a, b, c[h], d, e, f);
            }
        } else {
            a.r.push(Qc(b, c, d || a, e, f || a.Ae || a));
        }
    };
    var Sf = function (a, b, c, d, e, f) {
        if (s(c)) {
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
                b = l;
            }
            if (b) {
                b = b.key;
                Tc(b);
                Ka(a.r, b);
            }
        }
    };
    var Tf = function (a) {
        y(a.r, Tc);
        a.r.length = 0;
    };
    Pf.prototype.e = function () {
        Pf.b.e.call(this);
        Tf(this);
    };
    Pf.prototype.handleEvent = function () {
        g(Error("EventHandler.handleEvent not implemented"));
    };
    var Uf = function () {};
    w(Uf, wc);
    o = Uf.prototype;
    o.Uf = k;
    o.Ic = l;
    o.de = function (a) {
        this.Ic = a;
    };
    o.addEventListener = function (a, b, c, d) {
        P(this, a, b, c, d);
    };
    o.removeEventListener = function (a, b, c, d) {
        Rc(this, a, b, c, d);
    };
    o.dispatchEvent = function (a) {
        var b = a.type || a;
        var c = Lc;
        if (b in c) {
            if (t(a)) {
                a = new zc(a, this);
            } else if (a instanceof zc) {
                a.target = a.target || this;
            } else {
                var d = a;
                var a = new zc(b, this);
                jb(a, d);
            }
            var d = 1;
            var e;
            var c = c[b];
            var b = k in c;
            var f;
            if (b) {
                e = [];
                for (f = this; f; f = f.Ic) {
                    e.push(f);
                }
                f = c[k];
                f.aa = f.n;
                for (var h = e.length - 1; !a.Za && h >= 0 && f.aa; h--) {
                    a.currentTarget = e[h];
                    d &= Xc(f, e[h], a.type, k, a) && a.ac != n;
                }
            }
            if (n in c) {
                f = c[n];
                f.aa = f.n;
                if (b) {
                    for (h = 0; !a.Za && h < e.length && f.aa; h++) {
                        a.currentTarget = e[h];
                        d &= Xc(f, e[h], a.type, n, a) && a.ac != n;
                    }
                } else {
                    for (e = this; !a.Za && e && f.aa; e = e.Ic) {
                        a.currentTarget = e;
                        d &= Xc(f, e, a.type, n, a) && a.ac != n;
                    }
                }
            }
            a = Boolean(d);
        } else {
            a = k;
        }
        return a;
    };
    o.e = function () {
        Uf.b.e.call(this);
        Vc(this);
        this.Ic = l;
    };
    var Vf = function () {};
    aa(Vf);
    Vf.prototype.gg = 0;
    Vf.getInstance();
    var $ = function (a) {
        this.ya = a || Rb();
        this.Nb = Wf;
    };
    w($, Uf);
    $.prototype.Uj = Vf.getInstance();
    var Wf = l;
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
        g(Error("Invalid component state"));
    };
    o = $.prototype;
    o.Ha = l;
    o.H = n;
    o.c = l;
    o.Nb = l;
    o.D = l;
    o.M = l;
    o.O = l;
    o.$e = n;
    o.getId = function () {
        return this.Ha || (this.Ha = ":" + (this.Uj.gg++).toString(36));
    };
    o.qb = function (a) {
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
    o.a = function () {
        return this.c;
    };
    o.f = function (a) {
        if (this.c) {
            return this.ya.f(a, this.c);
        } else {
            return l;
        }
    };
    o.getHandler = function () {
        return this.pb || (this.pb = new Pf(this));
    };
    var Yf = function (a, b) {
        if (a == b) {
            g(Error("Unable to set parent component"));
        }
        if (b && a.D && a.Ha && a.D.O && a.Ha && a.Ha in a.D.O && a.D.O[a.Ha] && a.D != b) {
            g(Error("Unable to set parent component"));
        }
        a.D = b;
        $.b.de.call(a, b);
    };
    o = $.prototype;
    o.getParent = function () {
        return this.D;
    };
    o.de = function (a) {
        if (this.D && this.D != a) {
            g(Error("Method not supported"));
        }
        $.b.de.call(this, a);
    };
    o.da = function () {
        return this.ya;
    };
    o.K = function () {
        this.c = this.ya.createElement("div");
    };
    o.Oa = function (a) {
        if (this.H) {
            g(Error("Component already rendered"));
        }
        if (!this.c) {
            this.K();
        }
        if (a) {
            a.insertBefore(this.c, l);
        } else {
            this.ya.k.body.appendChild(this.c);
        }
        if (!this.D || this.D.H) {
            this.d();
        }
    };
    o.R = function (a) {
        if (this.H) {
            g(Error("Component already rendered"));
        }
        if (a && this.vb(a)) {
            this.$e = k;
            if (!this.ya || this.ya.k != K(a)) {
                this.ya = Rb(a);
            }
            this.la(a);
            this.d();
        } else {
            g(Error("Invalid element to decorate"));
        }
    };
    o.vb = function () {
        return k;
    };
    o.la = function (a) {
        this.c = a;
    };
    o.d = function () {
        this.H = k;
        Zf(this, function (a) {
            if (!a.H && a.a()) {
                a.d();
            }
        });
    };
    o.ja = function () {
        Zf(this, function (a) {
            if (a.H) {
                a.ja();
            }
        });
        if (this.pb) {
            Tf(this.pb);
        }
        this.H = n;
    };
    o.e = function () {
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
            fc(this.c);
        }
        this.D = this.c = this.O = this.M = l;
    };
    o.ia = function () {
        return this.c;
    };
    o.Mb = function (a) {
        if (this.H) {
            g(Error("Component already rendered"));
        }
        this.Nb = a;
    };
    var Zf = function (a, b) {
        if (a.M) {
            y(a.M, b, i);
        }
    };
    $.prototype.removeChild = function (a, b) {
        if (a) {
            var c = t(a) ? a : a.getId();
            var a = this.O && c ? (c in this.O ? this.O[c] : i) || l : l;
            if (c && a) {
                var d = this.O;
                if (c in d) {
                    delete d[c];
                }
                Ka(this.M, a);
                if (b) {
                    a.ja();
                    if (a.c) {
                        fc(a.c);
                    }
                }
                Yf(a, l);
            }
        }
        if (!a) {
            g(Error("Child is not in parent component"));
        }
        return a;
    };
    var $f = function (a) {
        $.call(this, l);
        this.type = a;
        this.A = [];
    };
    w($f, $);
    var bg = function (a) {
        B(ag(a), "edit-mode");
    };
    var ag = function (a) {
        return tc(a.a(), "channel-module");
    };
    $f.prototype.ja = function () {
        for (var a = this.A.length, b = 0; b < a; b++) {
            nd(this.A[b]);
        }
        $f.b.ja.call(this);
    };
    var cg = function () {
        this.ad = {};
        this.He = {};
        this.Ib = {};
    };
    aa(cg);
    cg.prototype.I = function (a, b, c) {
        if (!(c in this.Ib)) {
            this.Ib[c] = {};
        }
        this.Ib[c][b] = a;
    };
    var eg = function (a) {
        var b = M("branded-page-body");
        if ("channel_page_modules" in a.ad) {
            g("module_set_already_initialized");
        }
        b = N("channel-module", b);
        y(
            b,
            function (a) {
                dg(this, 1, a);
                dg(this, 2, a);
                Zc(a, "module-loader-set-id", "channel_page_modules");
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
        d = d && b in a.Ib && d in a.Ib[b] ? a.Ib[b][d] : i;
        if (d) {
            d = new d(b);
            c = O(d.og, c);
            d.R(c);
            if (!("channel_page_modules" in a.ad)) {
                a.ad.channel_page_modules = [];
            }
            a.ad.channel_page_modules.push(d);
            c = ag(d);
            if (!(b in a.He)) {
                a.He[b] = {};
            }
            var e = Q(c, "module-loader-lookup-id");
            if (!e) {
                e = ":" + (Vf.getInstance().gg++).toString(36);
                Zc(c, "module-loader-lookup-id", e);
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
                if (G && d.indexOf(";") != -1) {
                    d = "'" + d.replace(/'/g, "%27") + "'";
                }
                c.opener = l;
                if (I) {
                    c.location.href = d;
                } else {
                    d = wa(d);
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
        window.location = Kd(Ld([a], {})) + "";
    };
    var hg = function (a, b) {
        var c = b || {};
        c.target = c.target || a.target || "YouTube";
        c.width = c.width || 600;
        c.height = c.height || 600;
        c = fg(a, c);
        if (!c) {
            return k;
        }
        if (!c.opener) {
            c.opener = window;
        }
        c.focus();
        return n;
    };
    var ig = function () {
        this.Og = ma();
    };
    var jg = new ig();
    ig.prototype.set = function (a) {
        this.Og = a;
    };
    ig.prototype.reset = function () {
        this.set(ma());
    };
    ig.prototype.get = function () {
        return this.Og;
    };
    var kg = function (a) {
        this.uj = a || "";
        this.vj = jg;
    };
    o = kg.prototype;
    o.dg = k;
    o.xj = k;
    o.wj = k;
    o.eg = n;
    o.yj = n;
    var lg = function (a) {
        if (a < 10) {
            return "0" + a;
        } else {
            return "" + a;
        }
    };
    var mg = function (a, b) {
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
    var ng = function (a) {
        kg.call(this, a);
    };
    w(ng, kg);
    var pg = function (a) {
        return og(a || arguments.callee.caller, []);
    };
    var og = function (a, b) {
        var c = [];
        if (Ja(b, a)) {
            c.push("[...circular reference...]");
        } else if (a && b.length < 50) {
            c.push(qg(a) + "(");
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
                        f = (f = qg(f)) ? f : "[fn]";
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
                c.push(og(a.caller, b));
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
    var qg = function (a) {
        if (rg[a]) {
            return rg[a];
        }
        a = "" + a;
        if (!rg[a]) {
            var b = /function ([^\(]+)/.exec(a);
            rg[a] = b ? b[1] : "[Anonymous]";
        }
        return rg[a];
    };
    var rg = {};
    var sg = function (a, b, c, d, e) {
        this.reset(a, b, c, d, e);
    };
    sg.prototype.ue = l;
    sg.prototype.te = l;
    var tg = 0;
    sg.prototype.reset = function (a, b, c, d, e) {
        if (typeof e != "number") {
            tg++;
        }
        this.bg = d || ma();
        this.hb = a;
        this.Mj = b;
        this.ag = c;
        delete this.ue;
        delete this.te;
    };
    sg.prototype.getLevel = function () {
        return this.hb;
    };
    sg.prototype.Xe = function (a) {
        this.hb = a;
    };
    sg.prototype.getMessage = function () {
        return this.Mj;
    };
    var ug = function (a) {
        this.Wj = a;
    };
    ug.prototype.D = l;
    ug.prototype.hb = l;
    ug.prototype.M = l;
    ug.prototype.jc = l;
    var vg = function (a, b) {
        this.name = a;
        this.value = b;
    };
    vg.prototype.toString = function () {
        return this.name;
    };
    var wg = new vg("SHOUT", 1200);
    var xg = new vg("SEVERE", 1000);
    var yg = new vg("WARNING", 900);
    var zg = new vg("INFO", 800);
    var Ag = new vg("CONFIG", 700);
    ug.prototype.getParent = function () {
        return this.D;
    };
    ug.prototype.Xe = function (a) {
        this.hb = a;
    };
    ug.prototype.getLevel = function () {
        return this.hb;
    };
    var Bg = function (a) {
        if (a.hb) {
            return a.hb;
        }
        if (a.D) {
            return Bg(a.D);
        }
        Ca("Root logger has no level set.");
        return l;
    };
    ug.prototype.log = function (a, b, c) {
        if (a.value >= Bg(this).value) {
            a = this.ck(a, b, c);
            b = "log:" + a.getMessage();
            if (q.console) {
                if (q.console.timeStamp) {
                    q.console.timeStamp(b);
                } else if (q.console.markTimeline) {
                    q.console.markTimeline(b);
                }
            }
            if (q.msWriteProfilerMark) {
                q.msWriteProfilerMark(b);
            }
            for (b = this; b;) {
                var c = b;
                var d = a;
                if (c.jc) {
                    for (var e = 0, f = i; (f = c.jc[e]); e++) {
                        f(d);
                    }
                }
                b = b.getParent();
            }
        }
    };
    ug.prototype.ck = function (a, b, c) {
        var d = new sg(a, "" + b, this.Wj);
        if (c) {
            d.ue = c;
            var e;
            var f = arguments.callee.caller;
            try {
                var h;
                var j = r("window.location.href");
                if (t(c)) {
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
                    var z = n;
                    try {
                        m = c.lineNumber || c.qk || "Not available";
                    } catch (A) {
                        m = "Not available";
                        z = k;
                    }
                    try {
                        p = c.fileName || c.filename || c.sourceURL || j;
                    } catch (H) {
                        p = "Not available";
                        z = k;
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
                    wa(h.message) +
                    '\nUrl: <a href="view-source:' +
                    h.fileName +
                    '" target="_new">' +
                    h.fileName +
                    "</a>\nLine: " +
                    h.lineNumber +
                    "\n\nBrowser stack:\n" +
                    wa(h.stack + "-> ") +
                    "[end]\n\nJS stack traversal:\n" +
                    wa(pg(f) + "-> ");
            } catch (L) {
                e = "Exception trying to expose exception! You win, we lose. " + L;
            }
            d.te = e;
        }
        return d;
    };
    var Cg = {};
    var Dg = l;
    var Eg = function () {
        if (!Dg) {
            Dg = new ug("");
            Cg[""] = Dg;
            Dg.Xe(Ag);
        }
    };
    var Fg = function (a) {
        Eg();
        var b;
        if (!(b = Cg[a])) {
            b = new ug(a);
            var c = a.lastIndexOf(".");
            var d = a.substr(c + 1);
            var c = Fg(a.substr(0, c));
            if (!c.M) {
                c.M = {};
            }
            c.M[d] = b;
            b.D = c;
            Cg[a] = b;
        }
        return b;
    };
    var Gg = function () {
        this.Gj = u(this.Lj, this);
        this.we = new ng();
        this.we.dg = n;
        this.ug = this.we.eg = n;
        this.cg = "";
        this.jj = {};
    };
    Gg.prototype.Lj = function (a) {
        if (!this.jj[a.ag]) {
            var b;
            b = this.we;
            var c = [];
            c.push(b.uj, " ");
            if (b.dg) {
                var d = new Date(a.bg);
                c.push(
                    "[",
                    lg(d.getFullYear() - 2000) +
                        lg(d.getMonth() + 1) +
                        lg(d.getDate()) +
                        " " +
                        lg(d.getHours()) +
                        ":" +
                        lg(d.getMinutes()) +
                        ":" +
                        lg(d.getSeconds()) +
                        "." +
                        lg(Math.floor(d.getMilliseconds() / 10)),
                    "] "
                );
            }
            if (b.xj) {
                c.push("[", mg(a, b.vj.get()), "s] ");
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
            if (Hg && Hg.firebug) {
                switch (a.getLevel()) {
                    case wg:
                        Hg.info(b);
                        break;
                    case xg:
                        Hg.error(b);
                        break;
                    case yg:
                        Hg.warn(b);
                        break;
                    default:
                        Hg.debug(b);
                }
            } else if (Hg) {
                Hg.log(b);
            } else if (window.opera) {
                window.opera.postError(b);
            } else {
                this.cg += b;
            }
        }
    };
    var Ig = l;
    var Hg = window.console;
    var Jg = function () {
        if (!Ig) {
            Ig = new Gg();
        }
        if (window.location.href.indexOf("Debug=true") != -1) {
            var a = Ig;
            if (k != a.ug) {
                Eg();
                var b = Dg;
                var c = a.Gj;
                if (!b.jc) {
                    b.jc = [];
                }
                b.jc.push(c);
                a.ug = k;
            }
        }
    };
    var Kg = function (a) {
        this.k = a;
    };
    var Lg = /\s*;\s*/;
    o = Kg.prototype;
    o.isEnabled = function () {
        var a = navigator.cookieEnabled;
        if (a && I) {
            var b = "COOKIES_TEST_" + ma();
            Mg.set(b, "1");
            if (!this.get(b)) {
                return n;
            }
            this.remove(b);
        }
        return a;
    };
    o.set = function (a, b, c, d, e, f) {
        if (/[;=\s]/.test(a)) {
            g(Error('Invalid cookie name "' + a + '"'));
        }
        if (/[;\r\n]/.test(b)) {
            g(Error('Invalid cookie value "' + b + '"'));
        }
        if (!ca(c)) {
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
                  : ";expires=" + new Date(ma() + c * 1000).toUTCString();
        this.k.cookie = a + "=" + b + e + d + c + f;
    };
    o.get = function (a, b) {
        var c = a + "=";
        for (var d = (this.k.cookie || "").split(Lg), e = 0, f; (f = d[e]); e++) {
            if (f.indexOf(c) == 0) {
                return f.substr(c.length);
            }
        }
        return b;
    };
    o.remove = function (a, b, c) {
        var d = this.xa(a);
        this.set(a, "", 0, b, c);
        return d;
    };
    o.bb = function () {
        return Ng(this).keys;
    };
    o.Ka = function () {
        return Ng(this).Jj;
    };
    o.xa = function (a) {
        return ca(this.get(a));
    };
    o.clear = function () {
        var a = Ng(this).keys;
        for (var b = a.length - 1; b >= 0; b--) {
            this.remove(a[b]);
        }
    };
    var Ng = function (a) {
        for (var a = (a.k.cookie || "").split(Lg), b = [], c = [], d, e, f = 0; (e = a[f]); f++) {
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
    var Mg = new Kg(document);
    Mg.mm = 3950;
    var Og = function (a, b, c) {
        Mg.set("" + a, b, c, "/", "youtube.com");
    };
    var Pg = function (a) {
        return Mg.get("" + a, i);
    };
    var Rg = function () {
        var a = Pg(this.Kg);
        if (a) {
            for (var a = unescape(a).split("&"), b = 0; b < a.length; b++) {
                var c = a[b].split("=");
                var d = c[0];
                if ((c = c[1])) {
                    Qg[d] = c.toString();
                }
            }
        }
    };
    aa(Rg);
    var Qg = r("yt.prefs.UserPrefs.prefs_") || {};
    v("yt.prefs.UserPrefs.prefs_", Qg);
    Rg.prototype.Kg = "PREF";
    var Sg = function (a) {
        if (/^f([1-9][0-9]*)$/.test(a)) {
            g("ExpectedRegexMatch: " + a);
        }
    };
    var Tg = function (a) {
        if (!/^\w+$/.test(a)) {
            g("ExpectedRegexMismatch: " + a);
        }
    };
    var Ug = function (a) {
        a = Qg[a] !== i ? Qg[a].toString() : l;
        if (a != l && /^[A-Fa-f0-9]+$/.test(a)) {
            return parseInt(a, 16);
        } else {
            return l;
        }
    };
    Rg.prototype.get = function (a, b) {
        Tg(a);
        Sg(a);
        var c = Qg[a] !== i ? Qg[a].toString() : l;
        if (c != l) {
            return c;
        } else if (b) {
            return b;
        } else {
            return "";
        }
    };
    Rg.prototype.set = function (a, b) {
        Tg(a);
        Sg(a);
        if (b == l) {
            g("ExpectedNotNull");
        }
        Qg[a] = b.toString();
    };
    var Vg = function (a) {
        return !!((Ug("f" + (Math.floor(a / 31) + 1)) || 0) & (1 << (a % 31)));
    };
    var Wg = function (a, b) {
        var c = "f" + (Math.floor(a / 31) + 1);
        var d = 1 << (a % 31);
        var e = Ug(c) || 0;
        var e = b ? e | d : e & ~d;
        if (e == 0) {
            delete Qg[c];
        } else {
            d = e.toString(16);
            Qg[c] = d.toString();
        }
    };
    Rg.prototype.remove = function (a) {
        Tg(a);
        Sg(a);
        delete Qg[a];
    };
    Rg.prototype.save = function (a) {
        var a = (a || 7) * 86400;
        var b = this.Kg;
        var c = [];
        var d;
        for (d in Qg) {
            c.push(d + "=" + escape(Qg[d]));
        }
        Og(b, c.join("&"), a);
    };
    Rg.prototype.clear = function () {
        Qg = {};
    };
    var $g = function (a) {
        a = a || {};
        this.url = a.url || this.url;
        this.urlV8 = a.url_v8 || this.urlV8;
        this.urlV9As2 = a.url_v9as2 || this.urlV9As2;
        this.minVersion = a.min_version || this.minVersion;
        this.args = a.args || hb(Xg);
        this.assets = a.assets || {};
        this.attrs = a.attrs || hb(Yg);
        this.params = a.params || hb(Zg);
        this.fallback = a.fallback || this.fallback;
        this.html5 = a.html5 || this.html5;
        this.disable = a.disable || {};
    };
    var Xg = {
        enablejsapi: 1
    };
    var Yg = {
        width: "640",
        height: "385"
    };
    var Zg = {
        allowscriptaccess: "always",
        allowfullscreen: "true",
        bgcolor: "#000000"
    };
    o = $g.prototype;
    o.url = "";
    o.urlV8 = "";
    o.urlV9As2 = "";
    o.minVersion = "8.0.0";
    o.html5 = n;
    var bh = function () {
        this.dd = [];
        ah(this);
    };
    aa(bh);
    o = bh.prototype;
    o.ca = 0;
    o.Kb = 0;
    o.rev = 0;
    o.Be = "";
    o.p = 0;
    o.load = function (a) {
        if (this.p >= 3) {
            a(this);
        } else {
            this.dd.push(a);
        }
    };
    o.setVersion = function (a) {
        this.ca = a[0];
        this.Kb = a[1];
        this.rev = a[2];
    };
    o.isSupported = function (a, b, c) {
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
    var ah = function (a) {
        if (a.p < 3) {
            if (a.p < 1) {
                var b = r("window.navigator.plugins");
                var c = r("window.navigator.mimeTypes");
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
                    ch(a);
                } else {
                    ah(a);
                }
            } else if (a.p < 2) {
                dh(a);
            } else {
                ch(a);
            }
        }
    };
    bh.prototype.Mg = function (a) {
        if (a) {
            a = a.split(" ")[1].split(",");
            a = [parseInt(a[0], 10) || 0, parseInt(a[1], 10) || 0, parseInt(a[2], 10) || 0];
        } else {
            a = [0, 0, 0];
        }
        this.setVersion(a);
        this.p = 2;
        if (this.ca > 0) {
            ch(this);
        } else {
            ah(this);
        }
    };
    var ch = function (a) {
        if (a.p < 3) {
            a.p = 3;
            for (var b = 0, c = a.dd.length; b < c; b++) {
                a.dd[b](a);
            }
            a.dd = [];
        }
    };
    var dh = function (a) {
        var b;
        var c;
        var d;
        var e;
        if (yd) {
            try {
                b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
            } catch (f) {
                b = l;
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
        var h = u(a.Mg, a);
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
                vd(m, 10);
            }
        };
        vd(m, 0);
    };
    var eh = function (a, b, c) {
        if ((a = M(a)) && b && c) {
            if (!(c instanceof $g)) {
                c = new $g(c);
            }
            var d = hb(c.attrs);
            var e = hb(c.params);
            e.flashvars = Nd(c.args);
            c = [];
            if (yd) {
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
    var gh = function (a, b) {
        a = M(a);
        if (!(b instanceof $g)) {
            b = new $g(b);
        }
        if (window != window.top) {
            var c = l;
            if (document.referrer) {
                c = document.referrer.substring(0, 128);
            }
            b.args.framer = c;
        }
        fh(function (c) {
            if (c.isSupported(b.minVersion) || F("IS_OPERA_MINI")) {
                c =
                    (((c.Be.indexOf("Gnash") > -1 && c.Be.indexOf("AVM2") == -1) ||
                    (c.ca == 9 && c.Kb == 1) ||
                    (c.ca == 9 && c.Kb == 0 && c.rev == 1)
                        ? n
                        : c.ca >= 9) &&
                        b.url) ||
                    ((navigator.userAgent.indexOf("Sony/COM2") > -1 && !c.isSupported(9, 1, 58) ? n : k) &&
                        b.urlV9As2) ||
                    b.urlV8 ||
                    b.url;
                eh(a, c, b);
            } else if (yd && c.isSupported(6, 0, 65)) {
                c = new $g({
                    url: "//s.ytimg.com/yt/swf/expressInstall-vflIE9HEf.swf",
                    args: {
                        MMredirectURL: window.location,
                        MMplayerType: "ActiveX",
                        MMdoctitle: document.title
                    }
                });
                eh(a, c.url, c);
            } else if (c.ca == 0 && b.fallback) {
                b.fallback();
            } else if (c.ca == 0 && b.fallbackMessage) {
                b.fallbackMessage();
            } else {
                a.innerHTML = '<div id="flash-upgrade">' + xd("FLASH_UPGRADE") + "</div>";
            }
        });
    };
    var fh = function (a) {
        bh.getInstance().load(function (b) {
            var c = Rg.getInstance();
            c.set("fv", [b.ca, b.Kb, b.rev].join("."));
            c.save();
            a(b);
        });
    };
    var ih = function (a, b) {
        var c = "scriptload-" + xa(a);
        var d = document.getElementById(c);
        var e = d && Q(d, "loaded");
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
                        Math.abs(Math.floor(Math.random() * 2147483648) ^ ma()).toString(36));
            }
            if (b) {
                hf(c, b);
            }
            var h = hh(a, c, function () {
                if (!Q(h, "loaded")) {
                    Zc(h, "loaded", "true");
                    jf(c);
                    var a = c;
                    var b = r("yt.pubsub.instance_");
                    if (b) {
                        b.clear(a);
                    }
                }
            });
        }
    };
    var hh = function (a, b, c) {
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
            return n;
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
                return n;
            case 0:
                return !xb;
            default:
                return a.keyCode < 166 || a.keyCode > 183;
        }
    };
    var lh = function (a, b, c, d, e) {
        if (!G && (!I || !J("525"))) {
            return k;
        }
        if (qb && e) {
            return kh(a);
        }
        if ((e && !d) || (!c && (b == 17 || b == 18)) || (G && d && b == a)) {
            return n;
        }
        switch (a) {
            case 13:
                return !G || !Mb(9);
            case 27:
                return !I;
        }
        return kh(a);
    };
    var kh = function (a) {
        if ((a >= 48 && a <= 57) || (a >= 96 && a <= 106) || (a >= 65 && a <= 90) || (I && a == 0)) {
            return k;
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
                return k;
            default:
                return n;
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
    w(nh, uf);
    aa(nh);
    nh.prototype.La = "button";
    nh.prototype.I = function () {
        this.addBehavior("click", this.Ue);
        this.addBehavior("keydown", this.Xj);
        this.addBehavior("keypress", this.Ve);
    };
    nh.prototype.Ue = function (a) {
        if (a && !a.disabled) {
            if (this.getData(a, "button-toggle")) {
                var b = R(a, Y(this, "group"));
                if (b && this.getData(b, "button-toggle-group")) {
                    var b = N(Y(this), b);
                    var c = Y(this, "toggled");
                    y(b, function (b) {
                        if (b != a) {
                            C(b, c);
                        } else {
                            B(a, c);
                        }
                    });
                } else {
                    Xa(a, Y(this, "toggled"));
                }
            }
            if (oh(this, a)) {
                ph(this, a);
                a.focus();
            }
            this.Lb(a, "button-action");
        }
    };
    nh.prototype.Xj = function (a, b, c) {
        if ((b = oh(this, a))) {
            var d = function (a) {
                var b = "";
                if (a.tagName) {
                    b = a.tagName.toLowerCase();
                }
                return b == "ul" || b == "table";
            };
            if ((d = d(b) ? b : mc(b, d))) {
                var d = d.tagName.toLowerCase();
                var e;
                if (d == "ul") {
                    e = this.gk;
                } else if (d == "table") {
                    e = this.fk;
                }
                if (e) {
                    qh(this, a, b, c, u(e, this));
                }
            }
        }
    };
    var qh = function (a, b, c, d, e) {
        var f = Ue(c);
        var h = d.keyCode == 9;
        if (h || d.keyCode == 32 || d.keyCode == 13) {
            if ((d = rh(a, c))) {
                b = ic(d);
                if (b.tagName.toLowerCase() == "a") {
                    window.location = b.href;
                } else {
                    pd(b);
                }
            } else if (h) {
                sh(a, b);
            }
        } else if (f) {
            if (d.keyCode == 27) {
                rh(a, c);
                sh(a, b);
            } else {
                e(b, c, d);
            }
        } else {
            a = D(b, Y(a, "reverse")) ? 38 : 40;
            if (d.keyCode == a) {
                pd(b);
                d.preventDefault();
            }
        }
    };
    nh.prototype.Ve = function (a, b, c) {
        a = oh(this, a);
        if (Ue(a)) {
            c.preventDefault();
        }
    };
    var rh = function (a, b) {
        var c = Y(a, "menu-item-highlight");
        var d = O(c, b);
        if (d) {
            C(d, c);
        }
        return d;
    };
    var th = function (a, b, c) {
        B(c, Y(a, "menu-item-highlight"));
        b.setAttribute("aria-activedescendant", c.getAttribute("id"));
    };
    nh.prototype.fk = function (a, b, c) {
        var d = rh(this, b);
        var b = fd("table", l, b);
        var e = fd("tr", l, b);
        var e = Sb("td", l, e).length;
        var b = Sb("td", l, b);
        var d = uh(d, b, e, c);
        if (d != -1) {
            th(this, a, b[d]);
            c.preventDefault();
        }
    };
    nh.prototype.gk = function (a, b, c) {
        if (c.keyCode == 40 || c.keyCode == 38) {
            var d = rh(this, b);
            var b = Sb("li", l, b);
            var d = uh(d, b, 1, c);
            th(this, a, b[d]);
            c.preventDefault();
        }
    };
    var uh = function (a, b, c, d) {
        var e = b.length;
        var a = Da(b, a);
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
        var c = oh(a, b);
        var d = R(c.activeButtonNode || c.parentNode, Y(a));
        if (d && d != b) {
            sh(a, d);
            vd(u(a.Pg, a, b), 1);
        } else if (Ue(c)) {
            sh(a, b);
        } else {
            a.Pg(b);
        }
    };
    nh.prototype.ic = function (a) {
        if (!rb || !D(a, Y(this, "masked"))) {
            return l;
        }
        var b = a.iframeMask;
        if (!b) {
            b = document.createElement("iframe");
            b.src = 'javascript:""';
            b.className = Y(this, "menu-mask");
            a.iframeMask = b;
        }
        return b;
    };
    nh.prototype.Pg = function (a) {
        if (a) {
            var b = oh(this, a);
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
                var c = R(a, Y(this, "group"));
                var d = !!this.getData(a, "button-menu-ignore-group");
                b.style.minWidth = (c && !d ? c.offsetWidth - 2 : a.offsetWidth - 2) + "px";
                if ((d = this.ic(a))) {
                    document.body.appendChild(d);
                }
                var d = R(a, Y(this, "group"));
                var e = !!this.getData(a, "button-menu-ignore-group");
                var d = d && !e ? d : a;
                var e = 5;
                var f = 4;
                if (D(a, Y(this, "reverse"))) {
                    e = 4;
                    f = 5;
                }
                if (D(a, "flip")) {
                    if (D(a, Y(this, "reverse"))) {
                        e = 6;
                        f = 7;
                    } else {
                        e = 7;
                        f = 6;
                    }
                }
                var h;
                if (this.getData(a, "button-has-sibling-menu")) {
                    var j = Ee(d);
                    if (G && !J("8")) {
                        j = l;
                    }
                    if (j) {
                        h = Me(j);
                        h = new ue(-h.top, h.left, h.top, -h.left);
                    }
                }
                var j = new E(0, 1);
                var m = this.ic(a);
                if (m) {
                    var p = Le(b);
                    m.style.width = p.width + "px";
                    m.style.height = p.height + "px";
                    nf(d, e, m, f, j, h);
                }
                nf(d, e, b, f, j, h);
                V(b);
                this.Lb(a, "button-menu-action", k);
                B(a, Y(this, "active"));
                if (c) {
                    B(c, Y(this, "group-active"));
                }
                c = u(this.Sj, this, a);
                b = S(document, "click", c);
                c = S(document, "contextmenu", c);
                this.setData(a, "button-listener", b);
                this.setData(a, "button-context-menu-listener", c);
            }
        }
    };
    var sh = function (a, b) {
        if (b) {
            var c = oh(a, b);
            if (c) {
                b.setAttribute("aria-pressed", "false");
                b.setAttribute("aria-expanded", "false");
                W(c);
                a.Lb(b, "button-menu-action", n);
                var d = a.ic(b);
                vd(function () {
                    if (d && d.parentNode) {
                        d.parentNode.removeChild(d);
                    }
                    if (c.originalParentNode) {
                        c.parentNode.removeChild(c);
                        c.originalParentNode.appendChild(c);
                        c.originalParentNode = l;
                        c.activeButtonNode = l;
                    }
                }, 1);
            }
            var e = R(b, Y(a, "group"));
            C(b, Y(a, "active"));
            if (e) {
                C(e, Y(a, "group-active"));
            }
            if ((e = a.getData(b, "button-listener"))) {
                nd(e);
                $c(b, "button-listener");
            }
            if ((e = a.getData(b, "button-context-menu-listener"))) {
                nd(e);
                $c(b, "button-context-menu-listener");
            }
        }
    };
    nh.prototype.getContent = function (a) {
        return O(Y(this, "content"), a);
    };
    nh.prototype.Sj = function (a, b) {
        var c;
        c = b || window.event;
        c = c.target || c.srcElement;
        if (c.nodeType == 3) {
            c = c.parentNode;
        }
        var d = R(c, Y(this));
        if (d) {
            var d = oh(this, d);
            var e = oh(this, a);
            if (d == e) {
                return;
            }
        }
        if (!R(c, Y(this, "menu")) || D(c, Y(this, "menu-item")) || D(c, Y(this, "menu-close"))) {
            sh(this, a);
            if ((d = R(c, Y(this, "menu"))) && this.getData(a, "button-menu-indicate-selected")) {
                var e = O(Y(this, "content"), a);
                var f;
                if (Pb && "innerText" in c) {
                    f = c.innerText.replace(/(\r\n|\r|\n)/g, "\n");
                } else {
                    f = [];
                    qc(c, f, k);
                    f = f.join("");
                }
                f = f.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
                f = f.replace(/\u200B/g, "");
                if (!Pb) {
                    f = f.replace(/ +/g, " ");
                }
                if (f != " ") {
                    f = f.replace(/^\s*/, "");
                }
                kc(e, f);
                e = Y(this, "menu-item-selected");
                if ((d = O(e, d))) {
                    C(d, e);
                }
                B(c.parentNode, e);
            }
        }
    };
    var oh = function (a, b) {
        if (!b.widgetMenu) {
            var c = a.getData(b, "button-menu-id");
            var c = c && M(c);
            var d = Y(a, "menu");
            if (c) {
                B(c, d);
            } else {
                c = O(d, b);
            }
            b.widgetMenu = c;
        }
        return b.widgetMenu;
    };
    var vh = function () {
        this.Ma = {};
    };
    w(vh, uf);
    aa(vh);
    o = vh.prototype;
    o.La = "expander";
    o.I = function () {
        this.addBehavior("click", this.Ue, "head");
        this.addBehavior("keypress", this.Ve, "head");
    };
    o.Ue = function (a) {
        this.od(a);
    };
    o.Ve = function (a, b, c) {
        if (c && c.keyCode == 13) {
            this.od(a);
        }
    };
    o.od = function (a) {
        if ((a = R(a, Y(this)))) {
            Xa(a, Y(this, "collapsed"));
            this.Lb(a, "expander-action");
        }
    };
    o.collapse = function (a) {
        if ((a = R(a, Y(this)))) {
            B(a, Y(this, "collapsed"));
            this.Lb(a, "expander-action");
        }
    };
    var xh = function (a, b) {
        this.fb = a || 1;
        this.Ub = b || wh;
        this.De = u(this.Ge, this);
        this.Ee = ma();
    };
    w(xh, Uf);
    xh.prototype.enabled = n;
    var wh = q.window;
    o = xh.prototype;
    o.Q = l;
    o.setInterval = function (a) {
        this.fb = a;
        if (this.Q && this.enabled) {
            this.stop();
            this.start();
        } else if (this.Q) {
            this.stop();
        }
    };
    o.Ge = function () {
        if (this.enabled) {
            var a = ma() - this.Ee;
            if (a > 0 && a < this.fb * 0.8) {
                this.Q = this.Ub.setTimeout(this.De, this.fb - a);
            } else {
                this.dispatchEvent("tick");
                if (this.enabled) {
                    this.Q = this.Ub.setTimeout(this.De, this.fb);
                    this.Ee = ma();
                }
            }
        }
    };
    o.start = function () {
        this.enabled = k;
        if (!this.Q) {
            this.Q = this.Ub.setTimeout(this.De, this.fb);
            this.Ee = ma();
        }
    };
    o.stop = function () {
        this.enabled = n;
        if (this.Q) {
            this.Ub.clearTimeout(this.Q);
            this.Q = l;
        }
    };
    o.e = function () {
        xh.b.e.call(this);
        this.stop();
        delete this.Ub;
    };
    var yh = function (a, b, c) {
        if (ea(a)) {
            if (c) {
                a = u(a, c);
            }
        } else if (a && typeof a.handleEvent == "function") {
            a = u(a.handleEvent, a);
        } else {
            g(Error("Invalid listener argument"));
        }
        if (b > 2147483647) {
            return -1;
        } else {
            return wh.setTimeout(a, b || 0);
        }
    };
    var zh = function () {
        this.Ma = {};
    };
    w(zh, Af);
    aa(zh);
    o = zh.prototype;
    o.La = "range-tooltip";
    o.gc = l;
    o.format = l;
    o.max = 0;
    o.zg = 0;
    o.yg = 0;
    o.cd = l;
    o.Gg = function () {
        return " ";
    };
    o.Te = function (a, b) {
        this.gc = b;
        var c = this.getData(a, this.La + "-format");
        if (c) {
            this.format = r(c);
        }
        this.max = parseInt(this.getData(a, "range-max"), 10);
        this.zg = Fe(a).x;
        this.yg = Le(a).width;
    };
    o.I = function () {
        Af.prototype.I.call(this);
        this.addBehavior("mousemove", this.qg);
        this.addBehavior("touchmove", this.tg);
    };
    o.ed = function (a, b) {
        if (!this.Cg) {
            Af.prototype.ed.call(this, a, b);
            S(document, "mousemove", X);
        }
    };
    o.hc = function (a, b) {
        Af.prototype.hc.call(this, a, b);
        od(document, "mousemove", X);
    };
    o.Me = function (a, b, c) {
        if (!this.cd) {
            this.cd = c.changedTouches[0].identifier;
            Af.prototype.Me.call(this, a, b, c);
            S(document, "touchmove", X);
            this.tg(0, b, c);
        }
    };
    o.jd = function (a, b, c) {
        Af.prototype.jd.call(this, a, b, c);
        od(document, "touchmove", X);
        this.Cg = k;
        yh(
            function () {
                this.Cg = n;
            },
            200,
            this
        );
        this.cd = l;
    };
    o.qg = function (a, b, c) {
        if (this.gc) {
            b = (c.pageX - this.zg) / this.yg;
            b = Math.min(Math.max(b, 0), 1);
            b *= this.max;
            if (this.format) {
                b = this.format(b);
            }
            Df(this, a, b);
            var b = O(Y(this, "tip-body"), this.gc);
            var d = this.gc;
            var e = new E(-5, 0);
            var a = Fe(a);
            mf(new E(c.pageX + e.x, a.y + e.y), d, 0);
            c = (Le(b).width + 3) / -2 - -5;
            b.style.left = c + "px";
        }
    };
    o.tg = function (a, b, c) {
        if (this.gc) {
            for (a = 0; a < c.changedTouches.length; a++) {
                var d = c.changedTouches[a];
                if (d.identifier == this.cd) {
                    c.pageX = d.pageX;
                    c.pageY = d.pageY;
                    this.qg(rf(Y(this), d.target, qf(b, Y(this))), 0, c);
                    break;
                }
            }
        }
    };
    var Ah = {
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
        this.Zf = c || new ve(NaN, NaN, NaN, NaN);
        this.k = K(a);
        this.j = new Pf(this);
        P(this.handle, ["touchstart", "mousedown"], this.wd, n, this);
    };
    w(Bh, Uf);
    var Ch = G || (xb && J("1.9.3"));
    o = Bh.prototype;
    o.clientX = 0;
    o.clientY = 0;
    o.screenX = 0;
    o.screenY = 0;
    o.Cf = 0;
    o.Df = 0;
    o.zb = 0;
    o.Ab = 0;
    o.Bf = k;
    o.Da = n;
    o.$d = 0;
    o.Vh = n;
    o.getHandler = function () {
        return this.j;
    };
    o.Of = function (a) {
        this.$d = Math.pow(a, 2);
    };
    o.e = function () {
        Bh.b.e.call(this);
        Rc(this.handle, ["touchstart", "mousedown"], this.wd, n, this);
        this.j.w();
        delete this.target;
        delete this.handle;
        delete this.j;
    };
    o.wd = function (a) {
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
                c.setCapture(n);
                Z(this.j, c, "losecapture", this.Jc);
            } else {
                Z(this.j, b ? b.parentWindow || b.defaultView : window, "blur", this.Jc);
            }
            if (G && this.Vh) {
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
            this.ae = vc(Rb(this.k));
            ma();
        } else {
            this.dispatchEvent("earlycancel");
        }
    };
    var Eh = function (a, b) {
        if (a.dispatchEvent(new Fh("start", a, b.clientX, b.clientY, b)) !== n) {
            a.Da = k;
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
            this.Da = n;
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
            if (this.Da && this.dispatchEvent(new Fh("beforedrag", this, a.clientX, a.clientY, a, b, c)) !== n) {
                Jh(this, a, b, c);
                a.preventDefault();
            }
        }
    };
    var Ih = function (a, b, c) {
        var d = vc(Rb(a.k));
        var b = b + (d.x - a.ae.x);
        var c = c + (d.y - a.ae.y);
        a.ae = d;
        a.zb += b;
        a.Ab += c;
        b = Gh(a, a.zb);
        a = Hh(a, a.Ab);
        return new E(b, a);
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
        var d = !isNaN(c.left) ? c.left : l;
        var c = !isNaN(c.width) ? c.width : 0;
        return Math.min(d != l ? d + c : Infinity, Math.max(d != l ? d : -Infinity, b));
    };
    var Hh = function (a, b) {
        var c = a.Zf;
        var d = !isNaN(c.top) ? c.top : l;
        var c = !isNaN(c.height) ? c.height : 0;
        return Math.min(d != l ? d + c : Infinity, Math.max(d != l ? d : -Infinity, b));
    };
    var Fh = function (a, b, c, d, e, f, h) {
        zc.call(this, a);
        this.clientX = c;
        this.clientY = d;
        this.Ef = e;
        this.left = ca(f) ? f : b.zb;
        this.top = ca(h) ? h : b.Ab;
    };
    w(Fh, zc);
    var Kh = function (a, b, c) {
        this.$b = a;
        this.Sb = new xh(50);
        this.j = new Pf(this);
        this.Db = new E();
        this.je = Me(a);
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
    w(Kh, wc);
    o = Kh.prototype;
    o.Hj = n;
    o.Ij = k;
    o.Sa = function (a) {
        if (!a) {
            Z(this.j, K(this.$b), "mousemove", this.sj);
        }
        Z(this.j, this.Sb, "tick", this.tj);
    };
    o.tj = function () {
        this.$b.scrollTop += this.Db.y;
        this.$b.scrollLeft += this.Db.x;
    };
    o.sj = function (a) {
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
    o.Fe = function (a, b, c) {
        var d = 0;
        if (a < b) {
            d = -8;
        } else if (a > b + c) {
            d = 8;
        }
        return d;
    };
    o.e = function () {
        Kh.b.e.call(this);
        this.j.w();
        this.Sb.w();
    };
    new ff();
    var Mh = function (a, b) {
        this.Jg = a;
        var c = b || l;
        if (!c) {
            c = Lh(this.Jg);
        }
        c = oa("__%s__", "(" + c.join("|") + ")");
        this.ek = RegExp(c, "g");
    };
    var Nh = /__([a-z]+(?:_[a-z]+)*)__/g;
    var Oh = function (a, b) {
        var c = M(a).innerHTML;
        var c = c.replace(/^\s*(<\!--\s*)?/, "");
        var c = c.replace(/(\s*--\>)?\s*$/, "");
        return new Mh(c, b);
    };
    var Lh = function (a) {
        var b = [];
        var c = {};
        a.replace(Nh, function (a, e) {
            if (!(e in c)) {
                c[e] = k;
                b.push(e);
            }
        });
        return b;
    };
    Mh.prototype.Oa = function (a, b, c) {
        return this.Jg.replace(
            this.ek,
            u(function (d, e) {
                if (b) {
                    e = b(e);
                }
                if (c) {
                    return a[e] || "";
                } else {
                    return wa(a[e] || "");
                }
            }, this)
        );
    };
    var Qh = function (a, b, c, d) {
        this.i = a;
        this.Ud = n;
        a = Id() + "/share_ajax";
        U(a, {
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
                    Ph(this, d, c.contacts, b);
                }
            },
            T: this
        });
    };
    Qh.prototype.Sa = function () {
        this.G = this.i.getElementsByTagName("form")[0];
        S(this.G, "submit", u(this.Mi, this));
        O("share-email-send", this.G);
        this.Wd = O("share-email-success", this.i);
        this.Ni = O("share-email-remail", this.Wd);
        S(
            this.Ni,
            "click",
            u(function () {
                Rh(this);
                this.focus();
            }, this)
        );
        this.pe = O("share-email-recipients", this.i);
        this.me = O("share-email-note", this.i);
        this.Vf = O("share-email-preview-note", this.i);
        S(this.me, "keyup", u(this.Li, this));
    };
    var Ph = function (a, b, c, d) {
        ih(
            b,
            u(function () {
                var a = r("yt.sharing.ContactTools");
                if (a) {
                    a.createContactTools(this.pe, l, c, d);
                }
            }, a)
        );
    };
    Qh.prototype.Ra = function () {
        if (this.G) {
            if (this.Ud) {
                Rh(this);
            }
            this.focus();
        }
    };
    Qh.prototype.focus = function () {
        this.pe.focus();
    };
    var Rh = function (a) {
        a.Ud = n;
        a.pe.value = "";
        a.me.value = "";
        a.Vf.innerHTML = "";
        W(a.Wd);
        V(a.G);
    };
    Qh.prototype.Li = function () {
        var a = this.me.value;
        var a = a.substring(0, 300);
        var a = wa(a);
        var a = a.replace(/\n/g, "<br>");
        this.Vf.innerHTML = a;
    };
    Qh.prototype.Mi = function (a) {
        a.preventDefault();
        var b = Sb("button", l, this.G)[0];
        b.disabled = k;
        var c = O("share-email-captcha", this.i);
        var d = O("share-email-error", this.i);
        var e = O("yt-alert-content", d);
        var a = Id() + Jd(this.G.action);
        U(a, {
            format: "JSON",
            method: "POST",
            of: be(this.G),
            z: function () {
                this.Ud = k;
                V(this.Wd);
                W(this.G);
                W(d);
                W(c);
            },
            ka: function (a, b) {
                if (b.captcha_html) {
                    c.innerHTML = b.captcha_html;
                    V(c);
                }
                if (b.errors) {
                    e.innerHTML = b.errors.join("<br>");
                    V(d);
                }
            },
            ra: function () {
                b.disabled = n;
            },
            T: this
        });
    };
    var Th = function (a, b, c) {
        this.i = a;
        a = Id() + "/share_ajax";
        U(a, {
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
                var c = Rg.getInstance();
                if (this.Va) {
                    this.Va.checked = !Vg(Ah.uf);
                }
                this.Bc.checked = Vg(Ah.tf);
                if (this.Ua) {
                    this.Ua.checked = Vg(Ah.vf);
                }
                c = c.get("ems");
                (c in this.oa ? this.oa[c] : bb(this.oa)).select();
                Sh(this);
                this.Ra();
            },
            T: this
        });
    };
    Th.prototype.Sa = function () {
        this.Fb = O("share-embed-code", this.i);
        S(this.Fb, "click", u(this.Cj, this));
        Uh(this);
        Vh(this);
    };
    var Uh = function (a) {
        var b = O("share-embed-size-list", a.i);
        var c = N("share-embed-size-radio", b);
        a.oa = {};
        y(
            c,
            function (a) {
                if (!D(a, "share-embed-size-radio-custom")) {
                    a = new Wh(a);
                    this.oa[a.name] = a;
                }
            },
            a
        );
        var c = bb(a.oa).width / (bb(a.oa).height - 30);
        var d = O("share-embed-size-radio-custom", b);
        var c = new Xh(d, c);
        a.oa[c.name] = c;
        a.nj = c;
        T(b, "click", u(a.oj, a), "share-embed-size");
        b = O("share-embed-customize", b);
        S(b, "keyup", u(a.pj, a));
    };
    var Vh = function (a) {
        var b = {};
        var c = N("share-embed-option", a.i);
        y(c, function (a) {
            b[a.name] = a;
        });
        a.Va = b["show-related"];
        if (a.Va) {
            S(a.Va, "click", u(a.aj, a));
        }
        a.Bc = b["delayed-cookies"];
        S(a.Bc, "click", u(a.$i, a));
        a.Kf = b["use-https"];
        S(a.Kf, "click", u(a.cj, a));
        a.Ua = b["use-flash-code"] || l;
        if (a.Ua) {
            S(a.Ua, "click", u(a.bj, a));
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
    var Sh = function (a) {
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
        c = Od(c, d);
        d = Yh(a);
        if (!d.width || d.width < 200) {
            d = bb(a.oa);
        }
        b = b.replace(/__url__/g, wa(c));
        b = b.replace(/__width__/g, d.width + "");
        b = b.replace(/__height__/g, d.height + "");
        b = wa(b);
        if (b != a.Fb.innerHTML) {
            a.Fb.innerHTML = b;
        }
    };
    var Yh = function (a) {
        return (
            fb(a.oa, function (a) {
                return a.ze();
            }) || l
        );
    };
    o = Th.prototype;
    o.aj = function () {
        var a = this.Va.checked;
        var b = Rg.getInstance();
        Wg(Ah.uf, !a);
        b.save();
        Sh(this);
    };
    o.$i = function () {
        var a = this.Bc.checked;
        var b = Rg.getInstance();
        Wg(Ah.tf, a);
        b.save();
        Sh(this);
    };
    o.cj = function () {
        Sh(this);
    };
    o.bj = function () {
        var a = this.Ua.checked;
        var b = Rg.getInstance();
        Wg(Ah.vf, a);
        b.save();
        Sh(this);
    };
    o.Cj = function () {
        this.focus();
    };
    o.oj = function (a) {
        a = this.oa[O("share-embed-size-radio", a.currentTarget).value];
        a.select();
        var b = Rg.getInstance();
        b.set("ems", a.name);
        b.save();
        Sh(this);
        if (a != this.nj) {
            this.focus();
        }
    };
    o.pj = function () {
        Sh(this);
    };
    var Wh = function (a) {
        this.name = a.value;
        this.kc = a;
        this.width = parseInt(Q(this.kc, "width"), 10);
        this.height = parseInt(Q(this.kc, "height"), 10);
    };
    Wh.prototype.ze = function () {
        return this.kc.checked;
    };
    Wh.prototype.select = function () {
        this.kc.checked = k;
        var a = sc(this.kc, "li");
        var b = sc(a, "ul");
        var b = Sb("li", "selected", b);
        y(b, function (a) {
            C(a, "selected");
        });
        B(a, "selected");
    };
    var Xh = function (a, b) {
        Wh.call(this, a);
        this.Bg = b;
        var c = sc(a, "li");
        this.Re = O("share-embed-size-custom-width", c);
        this.Qe = O("share-embed-size-custom-height", c);
        S(this.Re, "keyup", u(this.Rj, this));
        S(this.Qe, "keyup", u(this.Qj, this));
    };
    w(Xh, Wh);
    Xh.prototype.Rj = function () {
        this.width = parseInt(this.Re.value, 10);
        this.height = (Math.floor(this.width / this.Bg) || 0) + 30;
        this.Qe.value = this.height + "";
    };
    Xh.prototype.Qj = function () {
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
        this.Ta = l;
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
        ih("https://apis.google.com/js/plusone.js", u(this.nk, this));
    };
    Zh.prototype.nk = function () {
        var a = r("gapi.plusone.render");
        if (a) {
            var b = Math.floor(Math.random() * 10000);
            var c = "__PLUS_ONE_CALLBACK_" + b;
            var d = this.i.id;
            if (!d) {
                d = "plusone-button-" + b;
                this.i.id = d;
            }
            window[c] = u(this.Bj, this);
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
            jb(b, this.Yi);
            V(this.i);
            a(d, b);
        }
    };
    Zh.prototype.Bj = function (a) {
        if (a.state != "off") {
            Pd("PLUS_ONE", this.dj + "");
            if (this.Yf) {
                hg(
                    Kd(
                        Ld(["https://plusone.google.com/_/+1/confirm"], {
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
    var $h = function (a, b, c, d, e, f) {
        this.i = a;
        this.rb = b || l;
        this.Rb = c || l;
        this.Jh = e || l;
        this.Kh = f || n;
        this.le(d);
    };
    var ai = function (a) {
        var b = ["h", "m", "s"];
        var c = Ma(b);
        c.reverse();
        var d = {};
        var a = a.toLowerCase().match(/\d+\s*[hms]?/g) || [];
        var a = Ea(a, function (a) {
            var b = (a.match(/[hms]/) || [""])[0];
            if (b) {
                d[b] = parseInt(a.match(/\d+/)[0], 10);
                return n;
            } else {
                return k;
            }
        });
        for (a.reverse(); a.length && c.length;) {
            var e = c.shift();
            if (!(e in d)) {
                d[e] = parseInt(a.shift(), 10);
            }
        }
        if (a.length || d.s > 59 || d.m > 59 || d.h > 9) {
            return l;
        }
        var f = "";
        y(b, function (a) {
            if (d[a]) {
                f += d[a] + a;
            }
        });
        return f || l;
    };
    o = $h.prototype;
    o.le = function (a) {
        var b = Id() + "/share_ajax";
        U(b, {
            format: "JSON",
            J: {
                action_get_share_box: 1,
                video_id: this.rb,
                list: this.Rb,
                new_share_layout: k
            },
            z: function (b, d) {
                this.i.innerHTML = d.share_html;
                this.uh = d.url_short;
                this.pf = d.url_long;
                this.Gc = d.lang;
                this.Ta = l;
                if ("session_index" in d) {
                    this.Ta = d.session_index;
                }
                this.Sa();
                var e = O("share-panel-services-dynamic", this.i);
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
    o.Sa = function () {
        var a = O("share-panel-show-url-options");
        S(a, "click", u(this.fi, this));
        a = O("share-panel-show-more");
        S(a, "click", u(this.ci, this));
        a = O("share-panel-embed", this.i);
        S(a, "click", u(this.ai, this));
        a = O("share-panel-email", this.i);
        S(a, "click", u(this.$h, this));
        if ((a = O("share-panel-hangout", this.i))) {
            S(a, "click", u(this.bi, this));
        }
        this.V = O("share-panel-url", this.i);
        S(this.V, "click", u(this.gi, this));
        S(
            this.V,
            "focus",
            u(function () {
                B(this.V, "focused");
            }, this)
        );
        S(
            this.V,
            "blur",
            u(function () {
                C(this.V, "focused");
            }, this)
        );
        this.Th = O("share-panel-long-url", this.i);
        this.Zd = O("share-panel-start-at", this.i);
        this.va = O("share-panel-start-at-time", this.i);
        S(this.va, "keyup", u(this.hi, this));
        S(this.va, "click", u(this.ei, this));
        S(
            this.va,
            "focus",
            u(function () {
                B(this.va, "focused");
            }, this)
        );
        S(
            this.va,
            "blur",
            u(function () {
                C(this.va, "focused");
            }, this)
        );
        this.zf = O("share-panel-hd", this.i);
        this.Af = O("share-panel-include-list", this.i);
        this.Cc = O("share-panel-url-options", this.i);
        S(this.Cc, "click", u(this.Hf, this));
        this.Nd = O("share-panel-services", this.i);
        this.nf = O("share-panel-buttons", this.i);
        a = O("share-panel-show-more", this.i);
        S(a, "click", u(this.di, this));
    };
    o.Ra = function () {
        if (this.V && !D(this.V, "focused")) {
            this.V.focus();
            this.V.select();
        }
    };
    o.Hf = function () {
        if (!D(this.V, "focused")) {
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
            var c = this.Zd.checked && ai(this.va.value);
            if (c) {
                b.t = c;
            }
            a = Kd(Ld([a], b));
            if (this.V.value != a) {
                this.V.value = a;
            }
        }
    };
    o.hi = function () {
        this.Zd.checked = k;
        this.Hf();
    };
    o.ei = function () {
        this.Zd.checked = k;
        if (!this.va.value.match(/[1-9]/)) {
            this.va.value = "";
        }
    };
    o.gi = function () {
        this.V.select();
    };
    o.$h = function () {
        var a = vh.getInstance();
        a.collapse(this.nf);
        a.collapse(this.Cc);
        a.collapse(this.Nd);
        if (this.X) {
            W(this.X);
        }
        if (!this.W) {
            this.W = O("share-panel-email-container", this.i);
        }
        Ve(this.W);
        if (!Q(this.W, "disabled") && Ue(this.W)) {
            if (this.If) {
                this.If.Ra();
            } else {
                this.If = new Qh(this.W, this.Ta, this.rb, this.Rb);
            }
        }
    };
    o.bi = function () {
        var a = F("PLAYER_REFERENCE");
        if (a && a.pauseVideo) {
            a.pauseVideo();
        }
        var a = Kd(
            Ld(["https://talkgadget.google.com/hangouts"], {
                hl: this.Gc,
                authuser: this.Ta,
                gid: "youtube",
                gd: this.rb
            })
        );
        var b = window.screen.height;
        var c = Math.min(window.screen.width * 0.9, 1000);
        var b = Math.min(b * 0.9, 800);
        Pd("HANGOUT", this.rb + "");
        hg(a, {
            width: c,
            height: b
        });
    };
    o.ai = function () {
        var a = vh.getInstance();
        a.collapse(this.nf);
        a.collapse(this.Cc);
        a.collapse(this.Nd);
        if (this.W) {
            W(this.W);
        }
        if (!this.X) {
            this.X = O("share-panel-embed-container", this.i);
        }
        Ve(this.X);
        if (!Q(this.X, "disabled") && Ue(this.X)) {
            if (this.Mf) {
                this.Mf.Ra();
            } else {
                this.Mf = new Th(this.X, this.rb, this.Rb);
            }
        }
    };
    o.fi = function () {
        vh.getInstance().collapse(this.Nd);
        if (this.W) {
            W(this.W);
        }
        if (this.X) {
            W(this.X);
        }
    };
    o.ci = function () {
        vh.getInstance().collapse(this.Cc);
        if (this.W) {
            W(this.W);
        }
        if (this.X) {
            W(this.X);
        }
    };
    o.di = function () {
        if (this.W) {
            W(this.W);
        }
        if (this.X) {
            W(this.X);
        }
    };
    var bi = function () {};
    o = bi.prototype;
    o.Ag = n;
    o.dc = l;
    o.$c = l;
    o.U = function () {
        if (!this.Ag) {
            this.Ag = k;
            this.dc = O("player-root", i);
            this.$c = O("player-actions-container", this.dc);
            var a = O("player-actions-close", this.$c);
            S(a, "click", u(this.Gb, this));
        }
    };
    o.Gb = function () {
        Wa(this.dc, "actions-mode", n);
    };
    o.Dj = function () {
        if (this.dc.clientWidth < 600) {
            B(this.$c, "small-view");
        }
    };
    o.Ie = l;
    o.ok = function (a, b) {
        this.U();
        Wa(this.dc, "actions-mode", k);
        if (this.Ie) {
            this.Ie.Ra();
        } else {
            var c = O("player-actions-share", this.$c);
            this.Ie = new $h(c, a, b, u(this.Dj, this), {
                db: 1
            });
        }
    };
    Jg();
    Fg("yt.player.logger").Xe(zg);
    var ci = function () {
        if (navigator && navigator.userAgent && /android 2\.2/.test(navigator.userAgent.toLowerCase())) {
            return k;
        }
        var a = document.createElement("video");
        return (
            a &&
            a.canPlayType &&
            (a.canPlayType('video/mp4; codecs="avc1.42001E, mp4a.40.2"') ||
                a.canPlayType('video/webm; codecs="vp8.0, vorbis"'))
        );
    };
    var di = r("yt.playerConfig") || {};
    v("yt.playerConfig", di);
    var ei = r("yt.player.playerReferences_") || {};
    v("yt.player.playerReferences_", ei);
    var li = function (a, b) {
        var c = M(a);
        if (c) {
            var d;
            d = b instanceof $g ? b : new $g(b);
            var e = !!d.disable.html5;
            var f = !!d.disable.flash;
            var h = ci() && (r("yt.player.VideoPlayer") || d.assets.js);
            if (!d.args.eurl) {
                d.args.eurl = fi();
            }
            d.args.enablejsapi = "1";
            var j = n;
            if (d.html5) {
                j = k;
            }
            if (j && !h) {
                d.args.html5_unavailable = "1";
            }
            var m = {
                pubsub: new ff(),
                subscribedEvents: {}
            };
            var p = c;
            gi(c);
            var p = O("player-container", c);
            var c = "player" + ia(p);
            var z = {
                target: p,
                playerId: c,
                playerapiid: d.args.playerapiid,
                jsapicallback: hi(d.args.jsapicallback),
                elementId: d.attrs.id,
                api: m,
                onReadyCalled: n,
                eventLabel: d.args.el,
                actions: new bi()
            };
            d.args.playerapiid = c;
            d.args.jsapicallback = "ytPlayerOnYouTubePlayerReady";
            var A;
            var H;
            var m = ii;
            if (j && h) {
                A = ji;
                if (!f) {
                    H = m;
                }
            } else {
                A = m;
                if (h && !e) {
                    H = ji;
                }
            }
            if (H) {
                d.fallback = function (a) {
                    a = a || d;
                    if (!(a instanceof $g)) {
                        a = new $g(a);
                    }
                    delete a.fallback;
                    if (j) {
                        a.args.autoplay = 1;
                    } else {
                        U("/html5", {
                            yi: k,
                            method: "POST",
                            ea: {
                                prefer_html5: k,
                                session_token: pe.html5_ajax
                            }
                        });
                    }
                    a.attrs.id = z.elementId;
                    H(p, a);
                };
            }
            d.fallbackMessage = ki(p);
            ei[c] = z;
            vd(function () {
                A(p, d);
            }, 0);
        }
    };
    var ki = function (a) {
        return function () {
            var b = xd(
                "PLAYER_FALLBACK",
                i,
                'The Adobe Flash Player or an HTML5 supported browser is required for video playback. <br> <a href="http://get.adobe.com/flashplayer/">Get the latest Flash Player</a> <br> <a href="/html5">Learn more about upgrading to an HTML5 browser</a>'
            );
            var c = navigator.userAgent.match(/Version\/(\d).*Safari/);
            if (c && parseInt(c[1], 10) >= 5) {
                b = xd(
                    "QUICKTIME_FALLBACK",
                    i,
                    'The Adobe Flash Player or QuickTime is required for video playback. <br> <a href="http://get.adobe.com/flashplayer/">Get the latest Flash Player</a> <br> <a href="http://www.apple.com/quicktime/download/">Get the latest version of QuickTime</a>'
                );
            }
            a.innerHTML = '<div class="fallback-message">' + b + "</div>";
        };
    };
    var gi = function (a) {
        B(a, "player-root");
        xe(a, "overflow", "hidden");
        var b = $b("div", "player-container");
        var c = $b(
            "div",
            "player-actions-container",
            $b("div", "player-actions-share"),
            $b("div", "player-actions-close", $b("div", "player-actions-close-button"))
        );
        dc(a, b, c);
    };
    var ji = function (a, b) {
        mi(a);
        b.attrs.id += "-html5";
        var c = r("yt.player.VideoPlayer");
        if (c) {
            new c(a, b);
        } else {
            ih(b.assets.js, function () {
                new (r("yt.player.VideoPlayer"))(a, b);
            });
        }
    };
    var ii = function (a, b) {
        mi(a);
        b.attrs.id += "-flash";
        gh(a, b);
    };
    var mi = function (a) {
        a = M(a);
        ec(a);
    };
    var fi = function () {
        var a = "unknown";
        if (document.referrer) {
            a = document.referrer.substring(0, 128);
        }
        return a;
    };
    var pi = function (a) {
        var b = ei[a];
        var c = ic(M(b.target));
        var a = c.getApiInterface();
        y(a, function (a) {
            b.api[a] = u(c[a], c);
        });
        b.api.nativeAddEventListener = u(b.api.addEventListener, c);
        for (var d in b.api.subscribedEvents) {
            b.api.nativeAddEventListener(d, ni(b.api, d));
        }
        b.api.addEventListener = oi;
        if (b.eventLabel === "embedded") {
            b.api.addEventListener("SHARE_CLICKED", u(b.actions.ok, b.actions));
        }
        if (!b.onReadyCalled) {
            b.onReadyCalled = k;
            if (b.jsapicallback && (d = b.jsapicallback)) {
                d(b.playerapiid);
            }
            if (window.onYouTubePlayerReady) {
                onYouTubePlayerReady(b.playerapiid);
            }
        }
    };
    var ni = function (a, b) {
        var c = "ytPlayer" + (b + ia(a));
        var d = u(function (a) {
            this.pubsub.publish(b, a);
        }, a);
        v(c, d);
        return c;
    };
    var oi = function (a, b) {
        var c = hi(b);
        if (!this.subscribedEvents[a]) {
            this.nativeAddEventListener(a, ni(this, a));
        }
        this.subscribedEvents[a] = 1;
        this.pubsub.subscribe(a, c);
    };
    var hi = function (a) {
        var b = a;
        if (typeof a == "string") {
            b = function () {
                r(a).apply(window, arguments);
            };
        }
        if (!b) {
            b = r("onYouTubePlayerReady");
        }
        return b;
    };
    if (!r("ytPlayerOnYouTubePlayerReady")) {
        v("ytPlayerOnYouTubePlayerReady", pi);
    }
    v("yt.net.ajax.setToken", function (a, b) {
        pe[a] = b;
    });
    v("yt.tracking.share", Pd);
    v("yt.window.popup", hg);
    tf(nh);
    tf(vh);
    tf(Af);
    tf(zh);
    Jg();
    var qi = function (a) {
        $f.call(this, a);
    };
    w(qi, $f);
    qi.prototype.og = "module-view";
    var ri = function (a) {
        $f.call(this, a);
    };
    w(ri, qi);
    ri.prototype.d = function () {
        ri.b.d.call(this);
        si(this);
        var a;
        a = this.f("channels-video-player");
        if ((a = !a ? l : de(Q(a, "swf-config")))) {
            li(this.f("channels-video-player"), a);
        }
    };
    var si = function (a) {
        a.A.push(
            T(
                a.a(),
                "click",
                u(function (a) {
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
    w(ti, ri);
    ti.prototype.d = function () {
        ti.b.d.call(this);
        ui(this);
    };
    var ui = function (a) {
        var b = de(Q(ag(a), "live-event-polling-config"));
        if (b) {
            var c = b.eventId;
            var d = b.userId;
            var e = b.lastEventHash;
            var b = b.pollInterval;
            if (c && d && e && !(b <= 1000)) {
                wd(
                    u(a.kk, a, d, c, function (a) {
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
        U("/livestreaming_ajax", {
            method: "GET",
            format: "XML",
            z: function (a, b) {
                c(ee(b.html_content));
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
        this.kd = l;
        this.Jb = [];
    };
    var wi = new vi(24);
    vi.prototype.Ge = function () {
        var a = ma();
        for (var b = this.Jb.length - 1; b >= 0; b--) {
            if (xi(this.Jb[b], a)) {
                yi(this, b);
            }
        }
    };
    vi.prototype.add = function (a) {
        this.Jb.push(a);
        if (!this.kd) {
            this.kd = wd(u(this.Ge, this), this.fb);
        }
    };
    vi.prototype.remove = function (a) {
        a = Da(this.Jb, a);
        if (a >= 0) {
            yi(this, a);
        }
    };
    var yi = function (a, b) {
        var c = a.Jb;
        Ba(c.length != l);
        x.splice.call(c, b, 1);
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
            return new E(a.Hb, a.Wc);
        }
        if (b == 1) {
            return new E(a.Tc, a.ye);
        }
        var c = a.Hb + b * (a.Uc - a.Hb);
        var d = a.Wc + b * (a.Xc - a.Wc);
        var e = a.Uc + b * (a.Vc - a.Uc);
        var f = a.Xc + b * (a.Yc - a.Xc);
        var h = a.Vc + b * (a.Tc - a.Vc);
        var j = a.Yc + b * (a.ye - a.Yc);
        var c = c + b * (e - c);
        var d = d + b * (f - d);
        return new E(c + b * (e + b * (h - e) - c), d + b * (f + b * (j - f) - d));
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
        this.Wf = c.ra || l;
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
    w(Oi, Ni);
    Oi.prototype.ub = function (a) {
        this.Rc = 0;
        this.Fg = a.loop || wi;
        this.hj = Mi(this.Qi);
    };
    Oi.prototype.play = function () {
        this.xe = ma();
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
            vd(u(a.Wf, q, a), 0);
        }
        return c;
    };
    var Pi = function (a, b) {
        Ni.call(this, a, b);
    };
    w(Pi, Oi);
    Pi.prototype.ub = function (a) {
        Pi.b.ub.call(this, a);
        this.Gf = a.start;
        this.Xh = a.end;
    };
    var Qi = function (a) {
        $f.call(this, a);
    };
    w(Qi, qi);
    o = Qi.prototype;
    o.tb = n;
    o.ld = n;
    o.d = function () {
        Qi.b.d.call(this);
        var a = this.f("legal-text");
        var b = {
            start: 0
        };
        b.end = a.scrollHeight - a.clientHeight;
        b.duration = b.end / 3;
        b.ih = "linear";
        this.Ec = new Pi(a, b);
        this.tb = k;
        Z(this.getHandler(), a, "click", this.Kd, n, this);
        Z(this.getHandler(), a, "mouseover", this.Ch, n, this);
        Z(this.getHandler(), a, "mouseout", this.Bh, n, this);
        Z(this.getHandler(), a, "scroll", this.xd, n, this);
    };
    o.xd = function () {
        if (!this.ld && !this.tb) {
            this.Ec.pause();
            this.ld = k;
        }
    };
    o.Kd = function () {
        this.Ec.pause();
        this.tb = n;
        this.ld = k;
    };
    o.Ch = function () {
        this.Ec.pause();
        this.tb = n;
    };
    o.Bh = function () {
        if (!this.tb && !this.ld) {
            this.Ec.play();
            this.tb = k;
        }
    };
    var Ri = function (a) {
        $f.call(this, a);
    };
    w(Ri, qi);
    Ri.prototype.d = function () {
        Ri.b.d.call(this);
        this.A.push(T(this.a(), "click", u(this.zd, this), "expand-button"));
        this.A.push(T(this.a(), "click", u(this.yd, this), "collapse-button"));
    };
    Ri.prototype.zd = function () {
        var a = O("expanded-content", this.a());
        var b = O("collapsed-content", this.a());
        if (a && b) {
            C(a, "hid");
            B(b, "hid");
        }
    };
    Ri.prototype.yd = function () {
        var a = O("expanded-content", this.a());
        var b = O("collapsed-content", this.a());
        if (a && b) {
            C(b, "hid");
            B(a, "hid");
        }
    };
    var Si = function (a) {
        $f.call(this, a);
    };
    w(Si, qi);
    Si.prototype.d = function () {
        Si.b.d.call(this);
        this.A.push(T(this.a(), "click", u(this.zd, this), "expand-button"));
        this.A.push(T(this.a(), "click", u(this.yd, this), "collapse-button"));
        this.sa = O("add-comment-form", this.a());
        this.ef = O("success", this.sa);
        this.td = O("failure", this.sa);
        this.oc = O("captcha", this.sa);
        if (this.sa) {
            Rf(this.getHandler(), this.sa, "click", this.Xg, n, this);
            Z(this.getHandler(), this.sa, "submit", this.Yg, n, this);
        }
    };
    Si.prototype.zd = function (a) {
        a = tc(a.currentTarget, "expander-container");
        B(a, "expanded");
    };
    Si.prototype.yd = function (a) {
        a = tc(a.currentTarget, "expander-container");
        C(a, "expanded");
    };
    Si.prototype.Xg = function () {
        var a = O("add-comment-form", this.a());
        C(a, "inactive");
    };
    var Ti = function () {
        var a = O("add-comment-form");
        C(a, "loading");
    };
    Si.prototype.Yg = function (a) {
        a.preventDefault();
        W(this.ef);
        W(this.td);
        W(this.oc);
        B(this.sa, "loading");
        a = {
            method: "POST",
            J: {
                action_add_comment: 1
            },
            of: be(this.sa),
            T: this,
            z: this.Fi
        };
        U("/channel_ajax", a);
    };
    Si.prototype.Fi = function (a, b) {
        C(this.sa, "loading");
        if (b.code == "SUCCESS") {
            V(this.ef);
            O("add-channel-comment-input").value = "";
            Ti();
            ec(this.oc);
        } else if (b.code == "CAPTCHA_REQUIRED") {
            this.oc.innerHTML = b.html;
            V(this.oc);
        }
        if (b.errors) {
            kc(this.td, b.errors[0]);
            V(this.td);
            Ti();
        }
    };
    var Ui = function (a) {
        $f.call(this, a);
    };
    w(Ui, qi);
    Ui.prototype.d = function () {
        Ui.b.d.call(this);
        this.A.push(T(this.a(), "click", u(this.hh, this), "more-videos"));
    };
    Ui.prototype.hh = function () {
        var a = this.f("more-videos");
        var b = a.value;
        var a = Q(a, "list_id");
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
        Vi(this, k);
        U("/channel_ajax", b);
    };
    var Vi = function (a, b) {
        a.f("more-videos").disabled = b;
        Wa(a.a(), "loading", b);
    };
    Ui.prototype.qi = function (a, b) {
        Vi(this, n);
        if (b.code == "SUCCESS") {
            var c = this.f("more-videos");
            var d = sc(c, "li");
            var c = d.parentNode;
            c.removeChild(d);
            d = gd(b.html);
            c.appendChild(d);
            for (c = Math.ceil(Math.max(0, 0) / 400); c >= 0; c--) {
                te("thumb-group-" + c);
            }
        }
    };
    Ui.prototype.pi = function () {
        Vi(this, n);
    };
    var Wi = function (a, b) {
        a.setAttribute("role", b);
        a.qm = b;
    };
    var Xi = function (a, b) {
        $.call(this, b);
        this.na = a || "";
    };
    w(Xi, $);
    Xi.prototype.Ca = l;
    var Yi = "placeholder" in document.createElement("input");
    o = Xi.prototype;
    o.Qb = n;
    o.K = function () {
        this.c = this.da().K("input", {
            type: "text"
        });
    };
    o.la = function (a) {
        Xi.b.la.call(this, a);
        if (!this.na) {
            this.na = a.getAttribute("label") || "";
        }
        var b;
        a: {
            var c = K(a);
            try {
                b = c && c.activeElement;
                break a;
            } catch (d) {}
            b = l;
        }
        if (b == a) {
            this.Qb = k;
            C(this.a(), this.xc);
        }
        if (Yi) {
            this.a().placeholder = this.na;
        } else {
            this.a().setAttribute("aria-label", this.na);
        }
    };
    o.d = function () {
        Xi.b.d.call(this);
        var a = new Pf(this);
        Z(a, this.a(), "focus", this.jf);
        Z(a, this.a(), "blur", this.dh);
        if (Yi) {
            this.j = a;
        } else {
            if (xb) {
                Z(a, this.a(), ["keypress", "keydown", "keyup"], this.eh);
            }
            Z(a, K(this.a()) ? K(this.a()).parentWindow || K(this.a()).defaultView : window, "load", this.fh);
            this.j = a;
            Zi(this);
        }
        $i(this);
        this.a().Zg = this;
    };
    o.ja = function () {
        Xi.b.ja.call(this);
        aj(this);
        this.a().Zg = l;
    };
    var Zi = function (a) {
        if (!a.Lh && a.j && a.a().form) {
            Z(a.j, a.a().form, "submit", a.Mh);
            a.Lh = k;
        }
    };
    var aj = function (a) {
        if (a.j) {
            a.j.w();
            a.j = l;
        }
    };
    o = Xi.prototype;
    o.e = function () {
        Xi.b.e.call(this);
        aj(this);
    };
    o.xc = "label-input-label";
    o.jf = function () {
        this.Qb = k;
        C(this.a(), this.xc);
        if (!Yi && !bj(this) && !this.Oh) {
            var a = this;
            var b = function () {
                a.a().value = "";
            };
            if (G) {
                yh(b, 10);
            } else {
                b();
            }
        }
    };
    o.dh = function () {
        if (!Yi) {
            Sf(this.j, this.a(), "click", this.jf);
            this.Ca = l;
        }
        this.Qb = n;
        $i(this);
    };
    o.eh = function (a) {
        if (a.keyCode == 27) {
            if (a.type == "keydown") {
                this.Ca = this.a().value;
            } else if (a.type == "keypress") {
                this.a().value = this.Ca;
            } else if (a.type == "keyup") {
                this.Ca = l;
            }
            a.preventDefault();
        }
    };
    o.Mh = function () {
        if (!bj(this)) {
            this.a().value = "";
            yh(this.ni, 10, this);
        }
    };
    o.ni = function () {
        if (!bj(this)) {
            this.a().value = this.na;
        }
    };
    o.fh = function () {
        $i(this);
    };
    var bj = function (a) {
        return !!a.a() && a.a().value != "" && a.a().value != a.na;
    };
    Xi.prototype.clear = function () {
        this.a().value = "";
        if (this.Ca != l) {
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
        if (this.Ca != l) {
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
            C(a.a(), a.xc);
        } else {
            if (!a.Oh && !a.Qb) {
                B(a.a(), a.xc);
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
        a = O("search-field", this.l);
        new Xi(a.getAttribute("placeholder")).R(a);
    };
    var dj = function (a) {
        this.c = a;
        this.qj = O("close", a);
        P(this.qj, "click", this.rj);
    };
    dj.prototype.rj = function (a) {
        a = tc(a.currentTarget, "subscription-menu-expandable");
        W(a);
    };
    var ej = function (a, b) {
        var c;
        if (a instanceof ej) {
            this.Eb(b == l ? a.pa : b);
            fj(this, a.Ga);
            gj(this, a.Zb);
            hj(this, a.$a);
            ij(this, a.Cb);
            this.setPath(a.getPath());
            jj(this, a.ga.S());
            kj(this, a.xb);
        } else if (a && (c = Hd("" + a))) {
            this.Eb(!!b);
            fj(this, c[1] || "", k);
            gj(this, c[2] || "", k);
            hj(this, c[3] || "", k);
            ij(this, c[4]);
            this.setPath(c[5] || "", k);
            jj(this, c[6] || "", k);
            kj(this, c[7] || "", k);
        } else {
            this.Eb(!!b);
            this.ga = new lj(l, this, this.pa);
        }
    };
    o = ej.prototype;
    o.Ga = "";
    o.Zb = "";
    o.$a = "";
    o.Cb = l;
    o.ab = "";
    o.xb = "";
    o.mk = n;
    o.pa = n;
    o.toString = function () {
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
            a.push(t(this.$a) ? encodeURIComponent(this.$a) : l);
            if (this.Cb != l) {
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
    o.S = function () {
        var a = this.Ga;
        var b = this.Zb;
        var c = this.$a;
        var d = this.Cb;
        var e = this.ab;
        var f = this.ga.S();
        var h = this.xb;
        var j = new ej(l, this.pa);
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
                g(Error("Bad port number " + b));
            }
            a.Cb = b;
        } else {
            a.Cb = l;
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
            g(Error("Tried to modify a read-only Uri"));
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
        var c = l;
        if (t(a)) {
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
        this.wa = a || l;
        this.ve = b || l;
        this.pa = !!c;
    };
    var wj = function (a) {
        if (!a.q && ((a.q = new Ud()), (a.n = 0), a.wa)) {
            for (var b = a.wa.split("&"), c = 0; c < b.length; c++) {
                var d = b[c].indexOf("=");
                var e = l;
                var f = l;
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
    o = lj.prototype;
    o.q = l;
    o.n = l;
    o.add = function (a, b) {
        wj(this);
        xj(this);
        a = vj(this, a);
        if (this.xa(a)) {
            var c = this.q.get(a);
            if (s(c)) {
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
    o.remove = function (a) {
        wj(this);
        a = vj(this, a);
        if (this.q.xa(a)) {
            xj(this);
            var b = this.q.get(a);
            if (s(b)) {
                this.n -= b.length;
            } else {
                this.n--;
            }
            return this.q.remove(a);
        }
        return n;
    };
    o.clear = function () {
        xj(this);
        if (this.q) {
            this.q.clear();
        }
        this.n = 0;
    };
    o.xa = function (a) {
        wj(this);
        a = vj(this, a);
        return this.q.xa(a);
    };
    o.bb = function () {
        wj(this);
        var a = this.q.Ka();
        for (var b = this.q.bb(), c = [], d = 0; d < b.length; d++) {
            var e = a[d];
            if (s(e)) {
                for (var f = 0; f < e.length; f++) {
                    c.push(b[d]);
                }
            } else {
                c.push(b[d]);
            }
        }
        return c;
    };
    o.Ka = function (a) {
        wj(this);
        if (a) {
            a = vj(this, a);
            if (this.xa(a)) {
                var b = this.q.get(a);
                if (s(b)) {
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
                if (s(d)) {
                    Pa(a, d);
                } else {
                    a.push(d);
                }
            }
        }
        return a;
    };
    o.set = function (a, b) {
        wj(this);
        xj(this);
        a = vj(this, a);
        if (this.xa(a)) {
            var c = this.q.get(a);
            if (s(c)) {
                this.n -= c.length;
            } else {
                this.n--;
            }
        }
        this.q.set(a, b);
        this.n++;
        return this;
    };
    o.get = function (a, b) {
        wj(this);
        a = vj(this, a);
        if (this.xa(a)) {
            var c = this.q.get(a);
            if (s(c)) {
                return c[0];
            } else {
                return c;
            }
        }
        return b;
    };
    o.toString = function () {
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
            var f = qa(e);
            var e = this.q.get(e);
            if (s(e)) {
                for (var h = 0; h < e.length; h++) {
                    if (b > 0) {
                        a.push("&");
                    }
                    a.push(f);
                    if (e[h] !== "") {
                        a.push("=", qa(e[h]));
                    }
                    b++;
                }
            } else {
                if (b > 0) {
                    a.push("&");
                }
                a.push(f);
                if (e !== "") {
                    a.push("=", qa(e));
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
    aa(function () {});
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
            C(b, "yt-alert-warn");
            B(b, "yt-alert-error");
            Sb("DIV", "yt-alert-content", b)[0].innerHTML = a;
            c.appendChild(b);
            V(b);
        }
    };
    var Ej = function (a, b) {
        if (!a) {
            g(Error("Invalid class name " + a));
        }
        if (!ea(b)) {
            g(Error("Invalid decorator function " + b));
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
                g(Error('"(' + e + "," + a + "," + c + '") is not a valid RGB color'));
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
        g(Error(a + " is not a valid color string"));
    };
    var Mj = /#(.)(.)(.)/;
    var Ij = function (a) {
        if (!Hj.test(a)) {
            g(Error("'" + a + "' is not a valid hex color"));
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
    w(Oj, Uf);
    o = Oj.prototype;
    o.c = l;
    o.Oc = l;
    o.oe = l;
    o.Pc = l;
    o.Ja = -1;
    o.Ia = -1;
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
    var Rj = G || (I && J("525"));
    Oj.prototype.fj = function (a) {
        if (I && ((this.Ja == 17 && !a.ctrlKey) || (this.Ja == 18 && !a.altKey))) {
            this.Ia = this.Ja = -1;
        }
        if (Rj && !lh(a.keyCode, this.Ja, a.shiftKey, a.ctrlKey, a.altKey)) {
            this.handleEvent(a);
        } else {
            this.Ia = xb ? mh(a.keyCode) : a.keyCode;
        }
    };
    Oj.prototype.gj = function () {
        this.Ia = this.Ja = -1;
    };
    Oj.prototype.handleEvent = function (a) {
        var b = a.gb();
        var c;
        var d;
        if (G && a.type == "keypress") {
            c = this.Ia;
            d = c != 13 && c != 27 ? b.keyCode : 0;
        } else if (I && a.type == "keypress") {
            c = this.Ia;
            d = b.charCode >= 0 && b.charCode < 63232 && kh(c) ? b.charCode : 0;
        } else if (wb) {
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
            this.Pc = this.oe = this.Oc = l;
        }
        this.c = l;
        this.Ia = this.Ja = -1;
    };
    Oj.prototype.e = function () {
        Oj.b.e.call(this);
        this.detach();
    };
    var Sj = function (a, b, c, d) {
        if (d) {
            this.U(d, i);
        }
        this.type = "key";
        this.keyCode = a;
        this.charCode = b;
        this.repeat = c;
    };
    w(Sj, Fc);
    var Tj = function () {};
    var Uj;
    aa(Tj);
    o = Tj.prototype;
    o.K = function (a) {
        var b = a.da().K("div", Vj(this, a).join(" "), a.getContent());
        Wj(a, b);
        return b;
    };
    o.ia = function (a) {
        return a;
    };
    o.Tb = function (a, b, c) {
        if ((a = a.a ? a.a() : a)) {
            if (G && !J("7")) {
                var d = Xj(Ta(a), b);
                d.push(b);
                la(c ? B : C, a).apply(l, d);
            } else {
                Wa(a, b, c);
            }
        }
    };
    o.vb = function () {
        return k;
    };
    o.R = function (a, b) {
        if (b.id) {
            a.qb(b.id);
        }
        var c = this.ia(b);
        if (c && c.firstChild) {
            a.ob(c.firstChild.nextSibling ? Ma(c.childNodes) : c.firstChild);
        } else {
            a.ob(l);
        }
        var d = 0;
        var e = this.F();
        var f = this.F();
        var h = n;
        var j = n;
        var c = n;
        var m = Ta(b);
        y(
            m,
            function (a) {
                if (!h && a == e) {
                    h = k;
                    if (f == e) {
                        j = k;
                    }
                } else if (!j && a == f) {
                    j = k;
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
                j = k;
            }
        }
        if (!j) {
            m.push(f);
        }
        var p = a.fa;
        if (p) {
            m.push.apply(m, p);
        }
        if (G && !J("7")) {
            var z = Xj(m);
            if (z.length > 0) {
                m.push.apply(m, z);
                c = k;
            }
        }
        if (!h || !j || p || c) {
            b.className = m.join(" ");
        }
        Wj(a, b);
        return b;
    };
    var Wj = function (a, b) {
        Ba(a);
        Ba(b);
        if (!a.isEnabled()) {
            Zj(b, 1, k);
        }
        if (a.ze()) {
            Zj(b, 8, k);
        }
        if (a.Y & 16) {
            Zj(b, 16, !!(a.p & 16));
        }
        if (a.Y & 64) {
            Zj(b, 64, !!(a.p & 64));
        }
    };
    o = Tj.prototype;
    o.uc = function (a, b) {
        Pe(a, !b, !G && !wb);
    };
    o.Mb = function (a, b) {
        this.Tb(a, this.F() + "-rtl", b);
    };
    o.ig = function (a) {
        var b;
        if (a.Y & 32 && (b = a.kb())) {
            return pc(b);
        } else {
            return n;
        }
    };
    o.lc = function (a, b) {
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
    o.setVisible = function (a, b) {
        Ne(a, b);
    };
    o.qa = function (a, b, c) {
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
        if (c && (ec(c), b)) {
            if (t(b)) {
                kc(c, b);
            } else {
                var d = function (a) {
                    if (a) {
                        var b = K(c);
                        c.appendChild(t(a) ? b.createTextNode(a) : a);
                    }
                };
                if (s(b)) {
                    y(b, d);
                } else if (da(b) && !("nodeType" in b)) {
                    y(Ma(b), d);
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
        if (G && !J("7")) {
            d.push.apply(d, Xj(d));
        }
        return d;
    };
    var Xj = function (a, b) {
        var c = [];
        if (b) {
            a = a.concat([b]);
        }
        y([], function (d) {
            if (Ia(d, la(Ja, a)) && (!b || Ja(d, b))) {
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
                d = ia(b);
                if ((d = Fj[d])) {
                    break;
                }
                b = b.b ? b.b.constructor : l;
            }
            b = d ? (ea(d.getInstance) ? d.getInstance() : new d()) : l;
        }
        this.o = b;
        this.ob(a);
    };
    w(ak, $);
    o = ak.prototype;
    o.Rd = l;
    o.p = 0;
    o.Y = 39;
    o.Tj = 255;
    o.Aj = 0;
    o.wc = k;
    o.fa = l;
    o.Sg = k;
    o.sc = n;
    o.Ff = l;
    o.kb = function () {
        return this.o.kb(this);
    };
    o.Tb = function (a, b) {
        if (b) {
            if (a) {
                if (this.fa) {
                    if (!Ja(this.fa, a)) {
                        this.fa.push(a);
                    }
                } else {
                    this.fa = [a];
                }
                this.o.Tb(this, a, k);
            }
        } else if (a && this.fa) {
            Ka(this.fa, a);
            if (this.fa.length == 0) {
                this.fa = l;
            }
            this.o.Tb(this, a, n);
        }
    };
    o.K = function () {
        var a = this.o.K(this);
        this.c = a;
        var b = this.Ff || i;
        if (b) {
            Wi(a, b);
        }
        if (!this.sc) {
            this.o.uc(a, n);
        }
        if (!this.isVisible()) {
            this.o.setVisible(a, n);
        }
    };
    o.ia = function () {
        return this.o.ia(this.a());
    };
    o.vb = function (a) {
        return this.o.vb(a);
    };
    o.la = function (a) {
        this.c = a = this.o.R(this, a);
        var b = this.Ff || i;
        if (b) {
            Wi(a, b);
        }
        if (!this.sc) {
            this.o.uc(a, n);
        }
        this.wc = a.style.display != "none";
    };
    o.d = function () {
        ak.b.d.call(this);
        var a = this.o;
        if (this.Nb == l) {
            this.Nb = Ge(this.H ? this.c : this.ya.k.body);
        }
        if (this.Nb) {
            a.Mb(this.a(), k);
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
                if (G) {
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
    o.ja = function () {
        ak.b.ja.call(this);
        if (this.jb) {
            this.jb.detach();
        }
        if (this.isVisible() && this.isEnabled()) {
            this.o.lc(this, n);
        }
    };
    o.e = function () {
        ak.b.e.call(this);
        if (this.jb) {
            this.jb.w();
            delete this.jb;
        }
        delete this.o;
        this.fa = this.Rd = l;
    };
    o.getContent = function () {
        return this.Rd;
    };
    o.setContent = function (a) {
        this.o.setContent(this.a(), a);
        this.ob(a);
    };
    o.ob = function (a) {
        this.Rd = a;
    };
    o.Mb = function (a) {
        ak.b.Mb.call(this, a);
        var b = this.a();
        if (b) {
            this.o.Mb(b, a);
        }
    };
    o.uc = function (a) {
        this.sc = a;
        var b = this.a();
        if (b) {
            this.o.uc(b, a);
        }
    };
    o.isVisible = function () {
        return this.wc;
    };
    o.setVisible = function (a, b) {
        if (b || (this.wc != a && this.dispatchEvent(a ? "show" : "hide"))) {
            var c = this.a();
            if (c) {
                this.o.setVisible(c, a);
            }
            if (this.isEnabled()) {
                this.o.lc(this, a);
            }
            this.wc = a;
            return k;
        }
        return n;
    };
    o.isEnabled = function () {
        return !(this.p & 1);
    };
    var ck = function (a, b) {
        if (bk(a, 2, b)) {
            a.qa(2, b);
        }
    };
    o = ak.prototype;
    o.vc = function () {
        return !!(this.p & 4);
    };
    o.setActive = function (a) {
        if (bk(this, 4, a)) {
            this.qa(4, a);
        }
    };
    o.ze = function () {
        return !!(this.p & 8);
    };
    o.Ce = function (a) {
        if (bk(this, 8, a)) {
            this.qa(8, a);
        }
    };
    o.qa = function (a, b) {
        if (this.Y & a && b != !!(this.p & a)) {
            this.o.qa(this, a, b);
            this.p = b ? this.p | a : this.p & ~a;
        }
    };
    var dk = function (a, b) {
        if (a.H && a.p & 32 && !b) {
            g(Error("Component already rendered"));
        }
        if (!b && a.p & 32) {
            a.qa(32, n);
        }
        a.Y = b ? a.Y | 32 : a.Y & -33;
    };
    var ek = function (a, b) {
        return !!(a.Tj & b) && !!(a.Y & b);
    };
    var bk = function (a, b, c) {
        return !!(a.Y & b) && !!(a.p & b) != c && (!(a.Aj & b) || a.dispatchEvent(Xf(b, c))) && !a.ke;
    };
    o = ak.prototype;
    o.rd = function (a) {
        if (
            (!a.relatedTarget || !jc(this.a(), a.relatedTarget)) &&
            this.dispatchEvent("enter") &&
            this.isEnabled() &&
            ek(this, 2)
        ) {
            ck(this, k);
        }
    };
    o.qd = function (a) {
        if ((!a.relatedTarget || !jc(this.a(), a.relatedTarget)) && this.dispatchEvent("leave")) {
            if (ek(this, 4)) {
                this.setActive(n);
            }
            if (ek(this, 2)) {
                ck(this, n);
            }
        }
    };
    o.pd = function (a) {
        if (this.isEnabled()) {
            if (ek(this, 2)) {
                ck(this, k);
            }
            if (Hc(a)) {
                if (ek(this, 4)) {
                    this.setActive(k);
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
    o.Tg = function (a) {
        if (this.isEnabled()) {
            if (ek(this, 2)) {
                ck(this, k);
            }
            if (this.vc() && this.fc(a) && ek(this, 4)) {
                this.setActive(n);
            }
        }
    };
    o.Qg = function (a) {
        if (this.isEnabled()) {
            this.fc(a);
        }
    };
    o.fc = function (a) {
        if (ek(this, 16)) {
            var b = !(this.p & 16);
            if (bk(this, 16, b)) {
                this.qa(16, b);
            }
        }
        if (ek(this, 8)) {
            this.Ce(k);
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
    o.Rg = function () {
        if (ek(this, 32) && bk(this, 32, k)) {
            this.qa(32, k);
        }
    };
    o.Ye = function () {
        if (ek(this, 4)) {
            this.setActive(n);
        }
        if (ek(this, 32) && bk(this, 32, n)) {
            this.qa(32, n);
        }
    };
    o.Ze = function (a) {
        if (this.isVisible() && this.isEnabled() && a.keyCode == 13 && this.fc(a)) {
            a.preventDefault();
            a.stopPropagation();
            return k;
        } else {
            return n;
        }
    };
    if (!ea(ak)) {
        g(Error("Invalid component class " + ak));
    }
    if (!ea(Tj)) {
        g(Error("Invalid renderer class " + Tj));
    }
    var fk = ia(ak);
    Fj[fk] = Tj;
    Ej("goog-control", function () {
        return new ak(l);
    });
    var gk = function () {};
    w(gk, Tj);
    aa(gk);
    var hk = 0;
    gk.prototype.K = function (a) {
        var b = Vj(this, a);
        return a.da().K("div", b ? b.join(" ") : l, ik(this, a.getContent(), a.Zc(), a.da()));
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
        return n;
    };
    gk.prototype.R = function () {
        return l;
    };
    gk.prototype.setContent = function (a, b) {
        if (a) {
            var c = Sb("tbody", this.F() + "-body", a)[0];
            if (c) {
                var d = 0;
                y(c.rows, function (a) {
                    y(a.cells, function (a) {
                        ec(a);
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
                    var f = Rb(a);
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
            Pe(a, k, xb);
        }
    };
    var kk = function (a, b, c) {
        for (b = b.a(); c && c.nodeType == 1 && c != b;) {
            if (c.tagName == "TD" && D(c, a.F() + "-cell")) {
                return c.firstChild;
            }
            c = c.parentNode;
        }
        return l;
    };
    var lk = function (a, b, c, d) {
        if (c) {
            c = c.parentNode;
            Wa(c, a.F() + "-cell-hover", d);
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
    w(nk, Uf);
    nk.prototype.Fa = l;
    nk.prototype.fe = l;
    var mk = function (a, b) {
        if (b) {
            y(
                b,
                function (a) {
                    this.Yb(a, n);
                },
                a
            );
            Pa(a.Lc, b);
        }
    };
    o = nk.prototype;
    o.Oe = function () {
        return this.Fa;
    };
    o.Se = function (a) {
        if (a != this.Fa) {
            this.Yb(this.Fa, n);
            this.Fa = a;
            this.Yb(a, k);
        }
        this.dispatchEvent("select");
    };
    o.cc = function () {
        if (this.Fa) {
            return Da(this.Lc, this.Fa);
        } else {
            return -1;
        }
    };
    o.clear = function () {
        var a = this.Lc;
        if (!s(a)) {
            for (var b = a.length - 1; b >= 0; b--) {
                delete a[b];
            }
        }
        a.length = 0;
        this.Fa = l;
    };
    o.e = function () {
        nk.b.e.call(this);
        delete this.Lc;
        this.Fa = l;
    };
    o.Yb = function (a, b) {
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
    w(ok, ak);
    o = ok.prototype;
    o.Z = l;
    o.Ya = -1;
    o.P = l;
    o.e = function () {
        ok.b.e.call(this);
        if (this.P) {
            this.P.w();
            this.P = l;
        }
        this.Z = l;
    };
    o.ob = function (a) {
        ok.b.ob.call(this, a);
        pk(this);
        if (this.P) {
            this.P.clear();
            mk(this.P, a);
        } else {
            this.P = new nk(a);
            this.P.fe = u(this.Yb, this);
            Z(this.getHandler(), this.P, "select", this.ti);
        }
        this.Ya = -1;
    };
    o.rd = function (a) {
        ok.b.rd.call(this, a);
        var b = kk(this.o, this, a.target);
        if ((!b || !a.relatedTarget || !jc(b, a.relatedTarget)) && b != qk(this)) {
            a = this.getContent();
            rk(this, a ? Da(a, b) : -1);
        }
    };
    o.qd = function (a) {
        ok.b.qd.call(this, a);
        var b = kk(this.o, this, a.target);
        if ((!b || !a.relatedTarget || !jc(b, a.relatedTarget)) && b == qk(this)) {
            lk(this.o, this, b, n);
        }
    };
    o.pd = function (a) {
        ok.b.pd.call(this, a);
        if (this.vc() && ((a = kk(this.o, this, a.target)), a != qk(this))) {
            var b = this.getContent();
            rk(this, b ? Da(b, a) : -1);
        }
    };
    o.fc = function () {
        var a = qk(this);
        if (a) {
            this.Se(a);
            return this.dispatchEvent("action");
        } else {
            return n;
        }
    };
    o.Ze = function (a) {
        var b = this.getContent();
        var b = b ? b.length : 0;
        var c = this.Z.width;
        if (b == 0 || !this.isEnabled()) {
            return n;
        }
        if (a.keyCode == 13 || a.keyCode == 32) {
            return this.fc(a);
        }
        if (a.keyCode == 36) {
            rk(this, 0);
            return k;
        }
        if (a.keyCode == 35) {
            rk(this, b - 1);
            return k;
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
                    return k;
                }
                break;
            case 39:
                if (d < b - 1) {
                    rk(this, d + 1);
                    a.preventDefault();
                    return k;
                }
                break;
            case 38:
                if (d == -1) {
                    d = b + c - 1;
                }
                if (d >= c) {
                    rk(this, d - c);
                    a.preventDefault();
                    return k;
                }
                break;
            case 40:
                if (d == -1) {
                    d = -c;
                }
                if (d < b - c) {
                    rk(this, d + c);
                    a.preventDefault();
                    return k;
                }
        }
        return n;
    };
    o.ti = function () {};
    o.Zc = function () {
        return this.Z;
    };
    o.setSize = function (a, b) {
        if (this.a()) {
            g(Error("Component already rendered"));
        }
        this.Z = typeof a == "number" ? new Za(a, b) : a;
        pk(this);
    };
    var qk = function (a) {
        var b = a.getContent();
        return b && b[a.Ya];
    };
    var rk = function (a, b) {
        if (b != a.Ya) {
            sk(a, a.Ya, n);
            a.Ya = b;
            sk(a, b, k);
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
            return l;
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
            Wa(a.parentNode, this.o.F() + "-cell-selected", b);
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
                a.Z = new Za(b, b);
            }
        } else {
            a.Z = new Za(0, 0);
        }
    };
    var tk = function (a, b, c) {
        this.qe = a || [];
        ok.call(this, l, b || gk.getInstance(), c);
        this.fd(this.qe);
    };
    w(tk, ok);
    tk.prototype.fd = function (a) {
        this.qe = a;
        this.setContent(uk(this));
    };
    tk.prototype.Od = function () {
        var a = this.Oe();
        if (a) {
            var a = a.style[za("background-color")] || "";
            var b;
            a: {
                if (a) {
                    try {
                        b = Lj(a).We;
                        break a;
                    } catch (c) {}
                }
                b = l;
            }
            return b;
        }
        return l;
    };
    var uk = function (a) {
        return Fa(
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
        this.C = b || l;
        Z(this.getHandler(), this, "action", this.Pj);
    };
    w(vk, $);
    o = vk.prototype;
    o.vd = k;
    o.fd = function (a) {
        if (this.C) {
            this.C.fd(a);
        } else {
            wk(this, a);
        }
    };
    o.setSize = function (a) {
        if (!this.C) {
            wk(this, []);
        }
        this.C.setSize(a);
    };
    o.Zc = function () {
        if (this.C) {
            return this.C.Zc();
        } else {
            return l;
        }
    };
    o.cc = function () {
        if (this.C) {
            return this.C.cc();
        } else {
            return -1;
        }
    };
    o.Od = function () {
        if (this.C) {
            return this.C.Od();
        } else {
            return l;
        }
    };
    o.ig = function () {
        return this.vd;
    };
    o.lc = function (a) {
        this.vd = a;
        if (this.C) {
            dk(this.C, a);
        }
    };
    o.vb = function () {
        return n;
    };
    o.d = function () {
        vk.b.d.call(this);
        if (this.C) {
            this.C.Oa(this.a());
        }
        this.a().unselectable = "on";
    };
    o.e = function () {
        vk.b.e.call(this);
        if (this.C) {
            this.C.w();
            this.C = l;
        }
    };
    o.focus = function () {
        if (this.C) {
            this.C.a().focus();
        }
    };
    o.Pj = function (a) {
        a.stopPropagation();
        this.dispatchEvent("change");
    };
    var wk = function (a, b) {
        var c = new tk(b, l, a.da());
        c.setSize(5);
        dk(c, a.vd);
        var d = a.M ? a.M.length : 0;
        if (c.H && !a.H) {
            g(Error("Component already rendered"));
        }
        if (d < 0 || d > (a.M ? a.M.length : 0)) {
            g(Error("Child component index out of bounds"));
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
        Ra(a.M, d, 0, c);
        if (c.H && a.H && c.getParent() == a) {
            e = a.ia();
            e.insertBefore(c.a(), e.childNodes[d] || l);
        } else if (a.H && !c.H && c.c) {
            c.d();
        }
        a.C = c;
        if (a.H) {
            a.C.Oa(a.a());
        }
    };
    var yk = function () {
        var a = new vk(i);
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
    w(zk, $);
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
        Z(a, b, "click", this.Dh, n, this);
        b = this.f("cancel-color-picker");
        Z(a, b, "click", this.Fh, n, this);
        b = this.f("set-new-bg-color");
        Z(
            a,
            b,
            "click",
            function () {
                Ak(this, this.qc.value);
            },
            n,
            this
        );
    };
    zk.prototype.Dh = function () {
        this.Lg = "";
        Bk(this, "");
    };
    var Bk = function (a, b) {
        var c = N("color-display-box", a.a());
        y(c, function (a) {
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
        this.Pf = G || (I && !J("531") && a.tagName == "TEXTAREA");
        this.j = new Pf(this);
        Z(this.j, this.c, this.Pf ? ["keydown", "paste", "cut", "drop"] : "input", this);
    };
    w(Ck, Uf);
    Ck.prototype.Q = l;
    Ck.prototype.handleEvent = function (a) {
        if (this.Pf) {
            if (a.type != "keydown" || jh(a)) {
                var b = a.type == "keydown" ? this.c.value : l;
                if (G && a.keyCode == 229) {
                    b = l;
                }
                var c = Dk(a);
                Ek(this);
                this.Q = yh(
                    function () {
                        this.Q = l;
                        if (this.c.value != b) {
                            Fk(this, c);
                        }
                    },
                    0,
                    this
                );
            }
        } else if (!wb || this.c == K(this.c).activeElement) {
            Fk(this, Dk(a));
        }
    };
    var Ek = function (a) {
        if (a.Q != l) {
            wh.clearTimeout(a.Q);
            a.Q = l;
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
        this.Eh = this.Xb = n;
        this.Ld = k;
    };
    w(Gk, Uf);
    Gk.prototype.Nf = 0;
    Gk.prototype.Of = function (a) {
        this.Nf = a;
    };
    var Hk = function (a, b, c) {
        Ba(!a.Xb);
        b.gf = c;
        b.Pa = i;
        a.N.push(b);
    };
    var Ik = function (a, b) {
        Ba(!a.Xb);
        a.Rf = b;
    };
    var Jk = function (a) {
        Ba(!a.Xb);
        a.Jf = "dragging";
    };
    Gk.prototype.U = function () {
        if (!this.Xb) {
            for (var a = 0, b = this.N.length; a < b; a++) {
                var c = gc(this.N[a]);
                for (var d = 0, e = c.length; d < e; ++d) {
                    var f = c[d];
                    var h = this.Rf(f);
                    this.sd[ia(h)] = f;
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
            this.Xb = k;
        }
    };
    Gk.prototype.e = function () {
        this.j.w();
        for (var a = 0, b = this.N.length; a < b; a++) {
            var c = this.N[a];
            c.gf = i;
            c.Pa = i;
        }
        this.N.length = 0;
        this.nb.length = 0;
        this.sd = l;
        Kk(this);
        Gk.b.e.call(this);
    };
    var Lk = function (a, b) {
        for (var c = 0, d = a.N.length; c < d; c++) {
            var e = a.N[c];
            e.wb = Me(e);
        }
        c = 0;
        for (d = a.nb.length; c < d; c++) {
            e = a.nb[c];
            if (e != b) {
                e.wb = Me(e);
            }
        }
    };
    o = Gk.prototype;
    o.Di = function (a) {
        this.g = this.sd[ia(a.currentTarget)];
        var b;
        a: {
            b = this.g;
            var c = b.cloneNode(k);
            switch (b.tagName.toLowerCase()) {
                case "tr":
                    b = $b("table", l, $b("tbody", l, c));
                    break a;
                case "td":
                case "th":
                    b = $b("table", l, $b("tbody", l, $b("tr", l, c)));
                    break a;
                default:
                    b = c;
            }
        }
        this.B = b;
        if (this.Jf) {
            B(this.B, this.Jf);
        }
        this.B.style.margin = "0";
        this.B.style.position = "absolute";
        this.B.style.visibility = "hidden";
        K(this.g).body.appendChild(this.B);
        b = Fe(this.g);
        Je(this.B, b);
        this.Ba = new Bh(this.B);
        this.Ba.Of(this.Nf);
        P(this.Ba, "start", this.xi, n, this);
        P(this.Ba, "end", this.wi, n, this);
        P(this.Ba, "earlycancel", this.Xd, n, this);
        this.Ba.wd(a);
    };
    o.xi = function (a) {
        if (this.dispatchEvent(new Mk("beforedragstart", this, a.Ef, this.g, l))) {
            this.Hc = this.g.parentNode;
            this.sf = this.Vd = this.g.nextElementSibling != i ? this.g.nextElementSibling : hc(this.g.nextSibling, k);
            this.Td = this.Hc;
            if (this.Yd) {
                B.apply(l, La(this.g, this.Yd));
            } else {
                this.g.style.visibility = "hidden";
            }
            var b = Le(this.B);
            this.B.Ih = b.width / 2;
            this.B.Hh = b.height / 2;
            this.B.style.visibility = "";
            if (this.Ld) {
                this.g.style.display = "none";
            }
            Lk(this, this.g);
            this.g.style.display = "";
            P(this.Ba, "drag", this.mi, n, this);
            this.dispatchEvent(new Mk("dragstart", this, a.Ef, this.g, this.B));
        } else {
            a.preventDefault();
            this.Xd();
        }
    };
    o.mi = function (a) {
        var b = Fe(this.B);
        var b = new E(b.x + this.B.Ih, b.y + this.B.Hh);
        var c;
        a: {
            c = l;
            if (this.g.style.display != "none") {
                c = this.g.parentNode;
                var d = Me(c);
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
            c = l;
        }
        var h;
        if (c) {
            if (c == l) {
                g(Error("getHoverNextItem_ called with null hoverList."));
            }
            var j;
            var m;
            var d = n;
            var e = i;
            switch (c.gf) {
                case 0:
                    h = b.y;
                    j = Ok;
                    m = Pk;
                    break;
                case 4:
                    d = k;
                case 2:
                    h = b.x;
                    j = Qk;
                    m = Pk;
                    break;
                case 5:
                    d = k;
                case 3:
                    h = b.x;
                    j = Rk;
                    m = Sk;
            }
            var f = l;
            var p;
            var z = gc(c);
            for (var A = 0, H = z.length; A < H; A++) {
                var L = z[A];
                if (L != this.g) {
                    var Ha = j(L.wb);
                    if (d) {
                        var pb = Tk(L, b);
                        if (!ca(e)) {
                            e = pb;
                        }
                        if (m(h, Ha) && (p == i || pb < e || (pb == e && (m(Ha, p) || Ha == p)))) {
                            f = L;
                            p = Ha;
                        }
                        if (pb < e) {
                            e = pb;
                        }
                    } else if (m(h, Ha) && (p == i || m(Ha, p))) {
                        f = L;
                        p = Ha;
                    }
                }
            }
            h = f !== l && Tk(f, b) > e ? l : f;
        } else {
            h = l;
        }
        if (!this.dispatchEvent(new Mk("beforedragmove", this, a, this.g, this.B))) {
            return n;
        }
        if (c) {
            if (this.Ld) {
                if (
                    this.g.parentNode != c ||
                    (this.g.nextElementSibling != i ? this.g.nextElementSibling : hc(this.g.nextSibling, k)) != h
                ) {
                    c.insertBefore(this.g, h);
                }
            } else if (h != l) {
                this.sf = h;
            }
            this.g.style.display = "";
            if (c.Pa) {
                B(c, c.Pa);
            }
        } else {
            if (!this.Eh) {
                this.g.style.display = "none";
            }
            h = 0;
            for (j = this.N.length; h < j; h++) {
                m = this.N[h];
                if (m.Pa) {
                    C(m, m.Pa);
                }
            }
        }
        if (c != this.Td) {
            this.Td = c;
            Lk(this, this.g);
        }
        this.dispatchEvent(new Mk("dragmove", this, a, this.g, this.B));
        return n;
    };
    o.Xd = function () {
        Kk(this);
        delete this.g;
        delete this.Td;
        delete this.Hc;
        delete this.Vd;
        delete this.B;
        delete this.Ba;
        for (var a = 0, b = this.N.length; a < b; a++) {
            this.N[a].wb = l;
        }
        a = 0;
        for (b = this.nb.length; a < b; a++) {
            this.nb[a].wb = l;
        }
    };
    o.wi = function (a) {
        if (!this.dispatchEvent(new Mk("beforedragend", this, a, this.g, this.B))) {
            return n;
        }
        if (!this.Ld) {
            this.Hc.insertBefore(this.g, this.sf);
        }
        Kk(this);
        this.dispatchEvent(new Mk("dragend", this, a, this.g, this.B));
        this.Xd();
        return k;
    };
    var Kk = function (a) {
        yc(a.Ba);
        if (a.B) {
            fc(a.B);
        }
        if (a.g && a.g.style.display == "none") {
            a.Hc.insertBefore(a.g, a.Vd);
            a.g.style.display = "";
        }
        if (a.Yd && a.g) {
            C.apply(l, La(a.g, a.Yd));
        } else if (a.g) {
            a.g.style.visibility = "visible";
        }
        for (var b = 0, c = a.N.length; b < c; b++) {
            var d = a.N[b];
            if (d.Pa) {
                C(d, d.Pa);
            }
        }
    };
    o = Gk.prototype;
    o.Rf = function (a) {
        return a;
    };
    o.Ci = function (a) {
        B.apply(l, La(a.currentTarget, this.Tf));
    };
    o.Bi = function (a) {
        C.apply(l, La(a.currentTarget, this.Tf));
    };
    o.Ai = function (a) {
        B.apply(l, La(a.currentTarget, this.Sf));
    };
    o.zi = function (a) {
        C.apply(l, La(a.currentTarget, this.Sf));
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
    w(Mk, zc);
    var Uk = function () {
        $.call(this);
    };
    w(Uk, $);
    Uk.prototype.d = function () {
        this.za = new Gk();
        Jk(this.za);
        Ik(this.za, function (a) {
            return O("yt-drag-drop-list-handle", a);
        });
        var a = Q(this.a(), "drag-drop-direction") || "down";
        Hk(this.za, this.a(), Ge(this.a()) ? Vk[a] : Wk[a]);
        Z(this.getHandler(), this.za, "dragstart", u(this.Rh, this));
        Z(this.getHandler(), this.za, "dragend", u(this.Qh, this));
        this.za.U();
    };
    Uk.prototype.e = function () {
        delete this.za;
        Uk.b.e.call(this);
    };
    Uk.prototype.Rh = function (a) {
        a.sg.style.width = ye(a.rg, "width");
        a.sg.style.height = ye(a.rg, "height");
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
    w(Yk, $);
    Yk.prototype.e = function () {
        for (var a = this.A.length, b = 0; b < a; b++) {
            nd(this.A[b]);
        }
        Yk.b.e.call(this);
    };
    var Zk = function () {
        Yk.call(this);
    };
    w(Zk, Yk);
    o = Zk.prototype;
    o.la = function (a) {
        Zk.b.la.call(this, a);
        a = this.f("custom-url-template");
        this.Nh = Oh(a, ["URL", "TITLE", "TEXT", "FAVICON_DOMAIN"]);
        this.mb = this.f("url-input-box");
        this.nc = this.f("title-input-box");
        this.mc = this.f("add-custom-external-link");
    };
    o.d = function () {
        Zk.b.d.call(this);
        $k(this);
        this.A.push(S(this.mc, "click", u(this.Ug, this)));
        var a = new Ck(this.mb);
        this.A.push(S(a, "input", u(this.Wg, this)));
        this.A.push(T(this.a(), "click", u(this.Vg, this), "remove"));
        this.bf = new Xi(this.mb.getAttribute("placeholder"));
        this.bf.R(this.mb);
        this.af = new Xi(this.nc.getAttribute("placeholder"));
        this.af.R(this.nc);
        this.mc.disabled = k;
    };
    o.e = function () {
        Zk.b.e.call(this);
        this.bf.w();
        this.af.w();
        this.ta.w();
    };
    o.Ug = function () {
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
        this.f("custom-links-preview").appendChild(cc(a));
        this.mb.value = "";
        this.nc.value = "";
        $k(this);
        this.mc.disabled = k;
    };
    o.Vg = function (a) {
        a = tc(a.currentTarget, "field-container");
        fc(a);
        $k(this);
    };
    o.Wg = function () {
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
    w(al, Yk);
    o = al.prototype;
    o.d = function () {
        this.Qd = this.f("remove-error");
        this.gh = Q(this.a(), "module-id");
        this.A.push(md(this.a(), u(this.Md, this), "button", "remove"));
    };
    o.Md = function (a) {
        a.preventDefault();
        a = {
            method: "POST",
            J: {
                channel_id: F("CHANNEL_ID"),
                session_token: pe.channel_ajax,
                module_id: this.gh,
                action_remove_featured_player: 1
            },
            z: this.Pi,
            ka: this.Oi,
            T: this
        };
        this.be();
        U("/channel_ajax", a);
    };
    o.Pi = function () {
        gg(window.location.href);
    };
    o.Oi = function (a, b) {
        var c = b.error;
        O("yt-alert-content", this.Qd).innerHTML = c;
        V(this.Qd);
    };
    o.be = function () {
        W(this.Qd);
    };
    Ej("remove-featured-player", function () {
        return new al();
    });
    var bl = function () {
        Yk.call(this);
    };
    w(bl, Yk);
    bl.prototype.d = function () {
        var a = this.f("multi-channel-select-channel-template");
        this.th = Oh(a, ["title", "subscriber_count", "name", "logo_url"]);
        fc(a);
        this.Pd = this.f("lookup-error");
        this.A.push(md(this.a(), u(this.qf, this), "button", "add"));
        this.A.push(
            S(
                this.f("channel-input"),
                "keydown",
                u(function (a) {
                    if (a.keyCode == 13) {
                        a.preventDefault();
                        this.qf.call(this, a);
                    }
                }, this)
            )
        );
        this.A.push(md(this.a(), u(this.Md, this), "button", "remove"));
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
        U("/channel_ajax", a);
    };
    bl.prototype.li = function (a, b) {
        var c = this.th.Oa(b);
        var c = cc(c);
        if (cl(this, fd("input", "other-channel-name-input", c).value)) {
            dl(this, "Sorry, this Channel is already featured.");
        } else {
            this.f("selected-list").appendChild(c);
            this.f("channel-input").value = "";
        }
    };
    var cl = function (a, b) {
        var c = Tb("input", "", a.f("selected-list"));
        return Ga(c, function (a) {
            return a.value == b;
        });
    };
    bl.prototype.ki = function (a, b) {
        dl(this, b.error);
    };
    bl.prototype.be = function () {
        W(this.Pd);
    };
    var dl = function (a, b) {
        O("yt-alert-content", a.Pd).innerHTML = b;
        V(a.Pd);
    };
    bl.prototype.Md = function (a) {
        a.preventDefault();
        a = sc(a.target, l, "channel");
        fc(a);
    };
    Ej("multi-channel-selector", function () {
        return new bl();
    });
    var el = function () {
        $.call(this);
    };
    w(el, $);
    el.prototype.d = function () {
        el.b.d.call(this);
        fl(this);
        var a = ["name", "description", "video_count", "full_list_id"];
        var b = this.f("selected-playlist-template");
        this.$g = Oh(b, a);
        b = this.f("pool-item-template");
        this.bh = Oh(b, a);
        md(this.a(), u(this.cf, this), "button", "add-selected");
        md(this.a(), u(this.df, this), "button", "remove");
        a = this.f("editor-dropdown-head");
        S(a, "click", u(this.ah, this));
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
        y(
            a,
            function (a) {
                if (O("pool-item-checkbox", a).checked) {
                    var c = Q(a, "featured-playlist");
                    var c = de(c);
                    var c = hl(this.$g, c);
                    O("selected-playlists", this.a()).appendChild(c);
                    fc(a);
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
        a.ta.R(O("selected-playlists", a.a()));
    };
    el.prototype.df = function (a) {
        a.preventDefault();
        var a = sc(a.target, l, "playlist");
        var b = Q(a, "featured-playlist");
        var b = de(b);
        var b = hl(this.bh, b);
        gl(this).appendChild(b);
        fc(a);
        fl(this);
    };
    el.prototype.ah = function () {
        var a = N("pool-item-checkbox", gl(this));
        y(a, function (a) {
            a.checked = n;
        });
    };
    var hl = function (a, b) {
        var c = a.Oa(b);
        var c = gd(c);
        var c = ic(c);
        var d = [];
        he(new fe(), b, d);
        Zc(c, "featured-playlist", d.join(""));
        return c;
    };
    var gl = function (a) {
        return O("selection-list-container", a.a());
    };
    Ej("multi-playlist-select", function () {
        return new el();
    });
    var il = function () {
        $.call(this);
    };
    w(il, $);
    o = il.prototype;
    o.pc = function () {
        C(this.a(), "has-results");
        C(this.Bd, "has-results");
        if (this.yb) {
            this.da().removeNode(this.yb);
            this.yb = l;
        }
        vd(
            u(function () {
                this.Ob.value = "";
            }, this),
            1
        );
    };
    o.setVisible = function (a) {
        if (!a) {
            this.pc();
        }
        Te(this.a(), a);
    };
    o.la = function (a) {
        il.b.la.call(this, a);
        this.Ob = this.f("search-input");
        a = Q(this.a(), "search-results-container-id");
        this.Bd = this.da().a(a);
        new Xi(this.Ob.getAttribute("placeholder")).R(this.Ob);
    };
    o.d = function () {
        il.b.d.call(this);
        Z(this.getHandler(), this.Ob, "keydown", this.Gh);
        var a = this.f("search-btn");
        Z(this.getHandler(), a, "click", this.wf);
        a = this.f("clear-search");
        Z(this.getHandler(), a, "click", this.pc);
    };
    o.Gh = function (a) {
        if (a.keyCode == 13) {
            a.preventDefault();
            this.wf();
        } else if (a.keyCode == 27) {
            this.pc();
        }
    };
    o.wf = function () {
        B(this.a(), "loading");
        C(this.a(), "has-results");
        U("/channel_ajax?action_featured_video_editor_search=1", {
            T: this,
            J: {
                playlist_id: this.kh,
                query: this.Ob.value
            },
            z: this.vh,
            ra: function () {
                C(this.a(), "loading");
            }
        });
    };
    o.vh = function (a, b) {
        if (this.yb) {
            this.da().removeNode(this.yb);
        }
        var c = b.html;
        var d = document.createElement("div");
        d.innerHTML = c;
        this.yb = ic(d);
        this.da().appendChild(this.Bd, this.yb);
        B(this.a(), "has-results");
        B(this.Bd, "has-results");
    };
    var jl = function () {
        Yk.call(this);
        this.Hd = {};
    };
    w(jl, Yk);
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
            Z(this.getHandler(), this.Qa, "change", this.vi, n, this);
            this.A.push(T(this.Aa, "click", u(this.ui, this), "selection-list-item"));
            var a = this.f("feature-first-video-checkbox");
            this.A.push(S(a, "click", u(this.Lf, this)));
            for (var b = (a = 0); b < this.Qa.options.length; ++b) {
                if (this.Qa.options[b].selected) {
                    a = b;
                }
            }
            this.ge = fd("li", "selected", this.Aa);
            this.Hd[this.Qa.options[a].value] = this.Ac;
            kl(this);
            this.Lf();
        }
    };
    jl.prototype.Lf = function () {
        var a = this.f("feature-first-video-checkbox");
        var b = Sb("input", l, a)[0].checked;
        Te(this.Aa, !b);
        a = N("radio", this.Aa);
        y(a, function (a) {
            a.disabled = b;
        });
    };
    var kl = function (a) {
        var b = a.Qa.options[a.Qa.selectedIndex];
        var c = b.value;
        var d = a.Hd[c];
        var e = Q(b, "show-search") == "true";
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
                channel_id: Q(a.a(), "channel-id")
            };
            d = {};
            d.SUCCESS = u(a.Ph, a, b.value);
            ml(c, d);
        }
    };
    jl.prototype.Ph = function (a, b) {
        this.Aa.appendChild(cc(b.html));
        var c = this.Aa.lastElementChild != i ? this.Aa.lastElementChild : hc(this.Aa.lastChild, n);
        this.Hd[a] = c;
        ll(this, c);
    };
    var ml = function (a, b) {
        a.action_get_playlist_videos = "1";
        U("/channel_ajax", {
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
            C(a.Ac, "selected");
        }
        B(b, "selected");
        a.Ac = b;
    };
    jl.prototype.vi = function () {
        kl(this);
    };
    jl.prototype.ui = function (a) {
        a = a.currentTarget;
        if (this.ge) {
            C(this.ge, "selected");
        }
        B(a, "selected");
        this.ge = a;
    };
    Ej("playlist-video-selector", function () {
        return new jl();
    });
    var nl = function (a) {
        $.call(this, a);
    };
    w(nl, $);
    nl.prototype.d = function () {
        this.Jd = O("selected", this.a());
        nl.b.d.call(this);
        md(this.a(), u(this.kf, this), "li");
    };
    nl.prototype.e = function () {
        nl.b.e.call(this);
        od(this.a(), "click", this.kf);
    };
    nl.prototype.kf = function (a) {
        a = a.currentTarget;
        if (this.Jd) {
            C(this.Jd, "selected");
        }
        B(a, "selected");
        this.Jd = a;
        fd("input", "", a).checked = k;
    };
    Ej("radio-list", function () {
        return new nl();
    });
    var ol = function () {
        Yk.call(this);
    };
    w(ol, Yk);
    ol.prototype.d = function () {
        this.Sd = this.f("selected");
        this.A.push(T(this.a(), "click", u(this.Ah, this), "select-on-click"));
    };
    ol.prototype.Ah = function (a) {
        if (this.Sd) {
            C(this.Sd, "selected");
        }
        a = sc(a.target, l, "selection-list-item");
        B(a, "selected");
        this.Sd = a;
        Sb("input", l, a)[0].checked = k;
    };
    Ej("single-playlist-selector", function () {
        return new ol();
    });
    var pl = function () {
        this.ec = {};
    };
    aa(pl);
    var ql = function (a, b) {
        var c = N("custom-form-element", b);
        y(
            c,
            function (a) {
                var b = ia(a);
                if (!this.ec[b]) {
                    var c = this.ec;
                    var h;
                    a: {
                        var j = Ta(a);
                        for (var m = 0, p = j.length; m < p; m++) {
                            if ((h = j[m] in Dj ? Dj[j[m]]() : l)) {
                                break a;
                            }
                        }
                        h = l;
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
        var c = N("custom-form-element", b);
        y(
            c,
            function (a) {
                a = ia(a);
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
    w(sl, $f);
    o = sl.prototype;
    o.jh = "enter-edit-mode";
    o.ff = "cancel-edit-mode";
    o.hk = "error-template";
    o.ii = "message-container";
    o.ji = "message-container-template";
    o.og = "module-editor";
    o.zc = "busy";
    o.R = function (a) {
        sl.b.R.call(this, a);
        this.hf = this.a().innerHTML;
        this.Pb = pl.getInstance();
        ql(this.Pb, a);
    };
    o.d = function () {
        sl.b.d.call(this);
        var a = this.getHandler();
        var b = this.a();
        this.lb = fd("FORM", l, b);
        var c = O(this.jh, ag(this));
        if (c) {
            Z(
                a,
                c,
                "click",
                function (a) {
                    a.preventDefault();
                    bg(this);
                },
                n,
                this
            );
        }
        b = O(this.ff, b);
        Z(
            a,
            b,
            "click",
            function (a) {
                a.preventDefault();
                tl(this);
                C(ag(this), "edit-mode");
            },
            n,
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
            n,
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
        var a = Xd($d(this.lb));
        var b = this.lb.getAttribute("action");
        B(this.a(), this.zc);
        U(b, {
            method: "POST",
            ea: a,
            z: u(this.Gd, this),
            ka: u(this.Fd, this),
            ra: u(function () {
                C(this.a(), this.zc);
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
                c = wa(c[0]);
            }
            vl(this, c);
        }
    };
    sl.prototype.Fd = function () {
        var a = xd("GENERIC_EDITOR_ERROR");
        vl(this, wa(a));
    };
    var vl = function (a, b) {
        var c = M(a.hk).cloneNode(k);
        var d = ul(a);
        ef(b, c, d);
    };
    var ul = function (a) {
        var b = a.a();
        var c = N(a.ii, b);
        if (c.length) {
            return c[0];
        }
        a = M(a.ji);
        if (!a) {
            return b;
        }
        a = a.cloneNode(k);
        b.insertBefore(a, b.childNodes[0] || l);
        return a;
    };
    var wl = function (a) {
        $f.call(this, a);
    };
    w(wl, qi);
    wl.prototype.d = function () {
        wl.b.d.call(this);
        this.A.push(
            T(
                this.a(),
                "click",
                u(function (a) {
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
    w(xl, uf);
    aa(xl);
    xl.prototype.La = "styleable-checkbox";
    xl.prototype.I = function () {
        this.addBehavior("click", this.od, "toggle");
    };
    xl.prototype.od = function (a) {
        var b = R(a, Y(this));
        if (!b) {
            return n;
        }
        a = O(Y(this, "checkbox"), b);
        if (!a) {
            return n;
        }
        b = Xa(b, Y(this, "checked"));
        a.checked = b;
    };
    var yl = function () {};
    aa(yl);
    yl.prototype.U = function () {
        if ((this.c = M("seymour-editor-container"))) {
            this.ie = O("channel-editor-selected-tab", this.c);
            this.he = O("channel-editor-selected-content", this.c);
            this.Ea = M("channels-page-editor-form");
            this.Yh = Q(this.Ea, "channels-update-url");
            this.mf = M("channel-editor-preview");
            this.Id = M("channel-editor-iframe");
            this.oi = Q(this.Ea, "channels-preview-url");
            this.ri = M("image-upload-form");
            this.Zh = M("image-upload-file-input");
            this.ee = M("image-upload-file-input-container");
            this.si = M("image-upload-type-input");
            this.ce = n;
            ql(pl.getInstance(), this.c);
            zl(this);
            this.Wb();
        }
    };
    var zl = function (a) {
        T(a.c, "click", u(a.Gi, a), "channel-editor-tab");
        var b = O("apply-changes", a.c);
        P(
            b,
            "click",
            function (a) {
                a.preventDefault();
                this.Ea.action = this.Yh;
                this.Ea.target = "_self";
                this.Ea.submit();
            },
            n,
            a
        );
        T(a.c, "change", u(a.Wb, a), "preview-on-change");
        T(a.c, "click", u(a.Wb, a), "preview-on-click");
        T(a.c, "mouseover", u(a.Ji, a), "upload-button");
        T(a.c, "click", u(a.Hi, a), "delete-button");
        P(a.Zh, "change", a.Ii, n, a);
        if ((b = M("dapper-opt-out-button"))) {
            P(b, "click", a.Ki, n, a);
        }
    };
    o = yl.prototype;
    o.Gi = function (a) {
        a.preventDefault();
        if (this.ie) {
            C(this.ie, "channel-editor-selected-tab");
        }
        if (this.he) {
            C(this.he, "channel-editor-selected-content");
        }
        var a = a.currentTarget;
        var b = Q(a, "editor-tab");
        var c = Q(a, "element-id");
        var c = M(c);
        B(a, "channel-editor-selected-tab");
        B(c, "channel-editor-selected-content");
        this.ie = a;
        this.he = c;
        M("editor-tab-form-field").value = b;
    };
    o.Wb = function () {
        B(this.mf, "loading");
        window.clearInterval(this.yf);
        this.yf = wd(u(this.Nj, this), 200);
        this.Ea.action = this.oi;
        this.Ea.target = this.Id.name;
        this.Ea.submit();
    };
    o.Ki = function (a) {
        a.preventDefault();
        M("dapper-opt-out-form").submit();
    };
    o.Nj = function () {
        var a = new Qb(this.Id.contentDocument || this.Id.contentWindow.document);
        var b = a.a("channels-preview-loaded");
        if (b) {
            C(this.mf, "loading");
            a.removeNode(b);
            window.clearInterval(this.yf);
        }
    };
    o.Ji = function (a) {
        var b = tc(a.currentTarget, "image-upload-field");
        if (b) {
            this.Ne = b;
            this.si.value = Q(b, "image-type");
            b = a.currentTarget;
            a = Fe(b);
            b = Le(b);
            Je(this.ee, a);
            var a = this.ee;
            var c;
            if (b instanceof Za) {
                c = b.height;
                b = b.width;
            } else {
                g(Error("missing height argument"));
            }
            a.style.width = Be(b, k);
            a.style.height = Be(c, k);
        }
    };
    o.Hi = function (a) {
        if (!this.ce && (a = tc(a.currentTarget, "image-upload-field"))) {
            O("image-id-input", a).value = "0";
            C(a, "uploaded");
            this.Wb();
        }
    };
    o.Ii = function () {
        this.ce = k;
        xe(this.ee, "left", "-9000px");
        B(this.Ne, "uploading");
        this.ri.submit();
    };
    var Al = 0;
    var Dl = function (a, b) {
        if (window.guidedhelp && window.guidedhelp.loaded) {
            Bl(a, b);
        } else {
            window.guidedhelp = window.guidedhelp || {};
            window.guidedhelp.onLoad = function () {
                var c = r("help.guide.init");
                if (c) {
                    c("http://www.google.com/support/youtube", F("GUIDED_HELP_LOCALE") || "en_US", "v2");
                    Bl(a, b);
                }
            };
            Cl();
        }
    };
    var El = function (a) {
        if (Mg.get("GuidedHelpResume")) {
            Dl(a, k);
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
        r("guidedhelp").onFlowDismiss = function () {
            var b = Fl(a);
            Gl();
            if ((b = b.dismiss_callback)) {
                b(a);
            }
        };
        if (b) {
            r("help.guide.optionallyResume")(a);
        } else {
            r("help.guide.loadFlow")(a);
        }
    };
    var Gl = function (a) {
        a = a || Al || parseInt(ab(), 10);
        W(Fl(a).alert_id);
        if ((a = Fl(a).cookie_name)) {
            Og(a, "true", 7776000);
        }
    };
    var Hl = function (a) {
        a = a || parseInt(ab(), 10);
        W(Fl(a).alert_id);
        Dl(a);
    };
    var Il = function (a, b) {
        var c = F("GUIDED_HELP_FLOWS");
        if (!c) {
            c = {};
        }
        c[a] = b;
        ud("GUIDED_HELP_FLOWS", c);
    };
    var Fl = function (a) {
        var b = F("GUIDED_HELP_FLOWS");
        return b && b[a];
    };
    v("yt.help.guide.dismissGuidedHelp", Gl);
    v("yt.help.guide.startGuidedHelp", Hl);
    v("yt.help.guide.resumeGuidedHelp", function () {
        El(parseInt(ab(), 10));
    });
    v("yt.help.guide.init", function () {
        $a(F("GUIDED_HELP_FLOWS"), function (a, b) {
            switch (a.status) {
                case "prompt":
                    V(Fl(b).alert_id);
                    break;
                case "start":
                    Hl(b);
                    break;
                case "hide":
                    Gl(b);
                    break;
                default:
                    var c;
                    var d = Fl(b).cookie_name;
                    if (d) {
                        c = !!Pg(d);
                    }
                    if (!c) {
                        V(Fl(b).alert_id);
                    }
            }
        });
    });
    v("yt.help.guide.addSettings", Il);
    var Jl = function (a) {
        U("/channel_ajax", {
            method: "POST",
            J: {
                action_dismiss_guided_help: "1"
            },
            ea: {
                session_token: pe.channel_ajax,
                channel_id: F("CHANNEL_ID"),
                flow_id: a
            }
        });
    };
    var Kl = function (a) {
        if (!a.currentTarget.disabled && (a = R(a.currentTarget, "store-display-offer-container"))) {
            if ((a = Q(a, "buy-url"))) {
                fg(a);
            }
        }
    };
    var Ll = function (a) {
        var b = {
            size: "small",
            annotation: "bubble"
        };
        y(a, function (a) {
            a.innerHTML = "";
            new Zh(a, Q(a, "buy-url"), Q(a, "buy-url"), F("FEEDBACK_LOCALE_LANGUAGE"), F("SESSION_INDEX"), b);
        });
    };
    var Ml = function (a) {
        $f.call(this, a);
    };
    w(Ml, sl);
    o = Ml.prototype;
    o.lf = "publish-store";
    o.lh = "publish-store-link";
    o.ma = [];
    o.Cd = [];
    o.ud = 0;
    o.Eg = 0;
    o.tc = n;
    o.d = function () {
        Ml.b.d.call(this);
        this.lb = fd("FORM", l, this.a());
        this.ud = M("store_category_id").value;
        var a = M("store_save_product_ids").value;
        this.Cd = this.ma = a = a.length > 0 ? a.split(",") : [];
        this.Dd();
    };
    o.Dd = function () {
        var a = this.getHandler();
        var b = this.a();
        var c = O(this.lf, b);
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
                n,
                this
            );
        }
        if ((c = O(this.lh, l))) {
            Z(
                a,
                c,
                "click",
                function (a) {
                    a.preventDefault();
                    a = Xd($d(this.lb));
                    a.publish = k;
                    U("/channel_ajax?action_publish_store=1", {
                        method: "POST",
                        ea: a,
                        z: u(this.Gd, this),
                        ka: u(this.Fd, this)
                    });
                },
                n,
                this
            );
        }
        b = O(this.ff, b);
        Vc(b);
        Z(
            a,
            b,
            "click",
            function (a) {
                a.preventDefault();
                gg(Q(a.currentTarget, "refresh-url"));
            },
            n,
            this
        );
        this.tc = n;
        T(
            M("store-editor"),
            "click",
            u(function () {
                this.tc = n;
            }, this),
            "apply-changes"
        );
        a = O("store-setup-search-query-container", l);
        T(a, "click", u(this.ph, this), "search-button");
        a = O("store-editor-actions-container", i);
        T(a, "click", u(this.nh, this), "category-edit-button");
        T(l, "click", u(this.mh, this), "vendor-menu-option");
        T(M("store-setup-search-results-container"), "click", u(this.sh, this), "store-search-result-add");
        if ((a = M("store-offers-preview-container"))) {
            T(a, "click", u(this.rh, this), "store-display-offer-remove-button");
            T(a, "click", Kl, "store-display-offer-buy");
            T(a, "click", Kl, "store-display-offer-title");
            b = Oa(N("plus-one", a));
            Ll(b);
            T(a, "click", u(this.qh, this), "move-to-top-link");
        }
        window.onbeforeunload = u(this.oh, this);
    };
    var Nl = function (a) {
        ul(a).innerHTML = "";
        var b = O(a.lf, a.a());
        var b = Q(b, "published") == "True";
        var c = Xd($d(a.lb));
        c.publish = !b;
        B(a.a(), a.zc);
        U("/channel_ajax?action_publish_store=1", {
            method: "POST",
            ea: c,
            z: u(a.Gd, a),
            ka: u(a.Fd, a),
            ra: u(function () {
                C(this.a(), this.zc);
            }, a)
        });
    };
    o = Ml.prototype;
    o.Ed = function () {
        var a = M("store-description");
        var b = M("store_save_description");
        if (a && b) {
            b.value = a.value;
        }
        M("store_save_product_ids").value = this.ma.join(",");
        Ml.b.Ed.call(this);
    };
    o.mh = function (a) {
        Xa(a.currentTarget, "selected");
        return n;
    };
    o.ph = function (a) {
        a.preventDefault();
        var b = [];
        var a = N("vendor-menu-option");
        y(a, function (a) {
            if (D(a, "selected")) {
                b.push(Q(a, "id"));
            }
        });
        if (b.length == 0) {
            alert(xd("NO_AFFILIATES_SELECTED_MSG"));
        } else {
            a = M("store-setup-search-results-container");
            C(a, "error");
            B(a, "searching");
            a = M("store_search_term").value;
            M("store_save_search_term").value = a;
            M("store_save_vendor_ids").value = b.join(",");
            a = {
                method: "GET",
                J: {
                    action_lookup_offers: "1",
                    search_term: a,
                    vendor_ids: b.join(","),
                    category: this.ud
                },
                z: u(this.kj, this),
                ka: u(this.lj, this)
            };
            U("/channel_ajax", a);
        }
    };
    o.kj = function (a, b) {
        var c = M("store-setup-search-results-container");
        C(c, "searching");
        if (b.success) {
            c.innerHTML = b.search_results_html;
            Ol(this);
        } else if (b.errors) {
            alert("errors: " + b.errors.join("<br>"));
        }
    };
    o.lj = function () {
        var a = M("store-setup-search-results-container");
        C(a, "searching");
        B(a, "error");
    };
    o.nh = function (a) {
        window.location = Q(a.currentTarget, "category-edit-url");
    };
    o.sh = function (a) {
        var b = R(a.currentTarget, "store-search-list-row");
        if (b) {
            this.ma.push(Q(b, "product-id"));
            Pl(a.currentTarget).innerHTML = F("LOADING_IMG");
            Ql(this);
        }
    };
    o.rh = function (a) {
        if ((a = R(a.currentTarget, "store-display-offer-container"))) {
            a = Q(a, "product-id");
            Ka(this.ma, a);
            Ql(this);
        }
    };
    o.ij = function (a, b) {
        if (b.success) {
            var c;
            c = Number(b.ts);
            if (c > this.Eg) {
                this.Eg = c;
                c = k;
            } else {
                c = n;
            }
            if (c) {
                M("store-offers-preview-container").innerHTML = b.offers_html;
                this.Cd = this.ma;
                c = Oa(N("plus-one"));
                Ll(c);
            }
        } else if (b.errors) {
            alert("errors: " + b.errors.join("<br>"));
            this.ma = this.Cd;
        }
        Ol(this);
    };
    var Ql = function (a) {
        a.tc = k;
        a = {
            method: "GET",
            J: {
                action_retrieve_offers: "1",
                product_ids: a.ma.join(","),
                channel_id: F("CHANNEL_ID"),
                category: a.ud
            },
            z: u(a.ij, a)
        };
        U("/channel_ajax", a);
    };
    var Ol = function (a) {
        var b = N("store-search-result-add");
        var c = a.ma;
        y(b, function (a) {
            var b = R(a, "store-search-list-row");
            if (b) {
                var b = Q(b, "product-id");
                var f = Pl(a);
                if (Ja(c, b)) {
                    a.disabled = k;
                    f.innerHTML = xd("ADD_BUTTON_DISABLED");
                } else {
                    f.innerHTML = xd("ADD_BUTTON_ENABLED");
                    a.disabled = n;
                }
            }
        });
    };
    var Pl = function (a) {
        var b = O("yt-uix-button-content", a);
        if (!b) {
            b = a;
        }
        return b;
    };
    Ml.prototype.qh = function (a) {
        if ((a = R(a.currentTarget, "store-display-offer-container"))) {
            a = Q(a, "product-id");
            Ka(this.ma, a);
            Ra(this.ma, 0, 0, a);
            Ql(this);
        }
    };
    Ml.prototype.oh = function () {
        if (this.tc) {
            var a = xd("UNSAVED_CHANGES_WARNING");
            if (a) {
                return a;
            }
        }
        return l;
    };
    var Rl = function (a) {
        $f.call(this, a);
    };
    w(Rl, qi);
    Rl.prototype.d = function () {
        Rl.b.d.call(this);
        this.Dd();
    };
    Rl.prototype.Dd = function () {
        var a = O("channel-store-filtered-content");
        T(a, "click", Kl, "store-display-offer-buy");
        T(a, "click", Kl, "store-display-offer-title");
        a = Oa(N("plus-one", a));
        Ll(a);
    };
    v("yt.www.channels3.channel.init", function () {
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
        if ((b = M("channel-search"))) {
            new cj(b);
        }
        new dj(O("subscription-menu-expandable-channels3"));
        if ((b = O("subscription-button-with-recommended-channels"))) {
            new Of(b);
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
    v("yt.www.channels3.feed.init", function () {
        new cf(O("channel-activity-feeds"));
    });
    v("yt.www.channels3.channelEditing.init", function () {
        tf(xl);
        yl.getInstance().U();
        var a = cg.getInstance();
        a.I(sl, "general-editor", 1);
        a.I(wl, "placeholder", 2);
    });
    v("yt.www.channels3.storeSetup.init", function () {
        var a = cg.getInstance();
        a.I(Ml, "store-editor", 1);
        a.I(Rl, "store-view", 2);
        eg(a);
    });
    v("yt.www.channels3.constants.ChannelAjaxResult", {
        rk: "ACCOUNT_NOT_CONFIRMED",
        sk: "CAPTCHA_REQUIRED",
        ERROR: "ERROR",
        nm: "NOT_IMPLEMENTED",
        om: "SUCCESS"
    });
    v("yt.www.channels3.guidedHelp.init", function (a, b) {
        Il(a, {
            dismiss_callback: Jl
        });
        if (b) {
            El(a);
        } else {
            Dl(a);
        }
    });
    v("yt.www.channels3.modules.SubscriptionButtonWithRecommendedChannels", Of);
    v("yt.www.subscriptions.SubscriptionButton.init", Hf);
    v("yt.www.channels3.PageEditor.notifyImageUploadComplete", function (a) {
        var b = yl.getInstance();
        var c = b.Ne;
        b.Ne = l;
        b.ce = n;
        if (c) {
            C(c, "uploading");
            if (a.errors) {
                alert(a.errors);
            } else if (a.photo_id) {
                O("image-id-input", c).value = "" + a.photo_id;
                B(c, "uploaded");
                b.Wb();
            }
        }
    });
})();
