(function () {
    function i(a) {
        throw a;
    }
    var k = undefined;
    var l = true;
    var n = null;
    var o = false;
    var r;
    var s = this;
    function aa(a) {
        for (var a = a.split("."), b = s, c; (c = a.shift());) {
            if (b[c] != n) {
                b = b[c];
            } else {
                return n;
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
    function ea(a) {
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
    function fa(a) {
        return a !== k;
    }
    function u(a) {
        return ea(a) == "array";
    }
    function ga(a) {
        var b = ea(a);
        return b == "array" || (b == "object" && typeof a.length == "number");
    }
    function w(a) {
        return typeof a == "string";
    }
    function ha(a) {
        return ea(a) == "function";
    }
    function ia(a) {
        var b = typeof a;
        return (b == "object" && a != n) || b == "function";
    }
    function ja(a) {
        return a[ka] || (a[ka] = ++la);
    }
    var ka = "closure_uid_" + Math.floor(Math.random() * 2147483648).toString(36);
    var la = 0;
    function ma(a, b, c) {
        return a.call.apply(a.bind, arguments);
    }
    function na(a, b, c) {
        if (!a) {
            i(Error());
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
    function x(a, b, c) {
        x = Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? ma : na;
        return x.apply(n, arguments);
    }
    function pa(a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function () {
            var b = Array.prototype.slice.call(arguments);
            b.unshift.apply(b, c);
            return a.apply(this, b);
        };
    }
    var qa =
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
    function z(a, b) {
        var c = a.split(".");
        var d = s;
        if (!(c[0] in d) && d.execScript) {
            d.execScript("var " + c[0]);
        }
        for (var f; c.length && (f = c.shift());) {
            if (!c.length && fa(b)) {
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
                return x.apply(n, c);
            }
            return x(this, a);
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
    function sa(a) {
        if (!ta.test(a)) {
            return a;
        }
        if (a.indexOf("&") != -1) {
            a = a.replace(ua, "&amp;");
        }
        if (a.indexOf("<") != -1) {
            a = a.replace(va, "&lt;");
        }
        if (a.indexOf(">") != -1) {
            a = a.replace(wa, "&gt;");
        }
        if (a.indexOf('"') != -1) {
            a = a.replace(xa, "&quot;");
        }
        return a;
    }
    var ua = /&/g;
    var va = /</g;
    var wa = />/g;
    var xa = /\"/g;
    var ta = /[&<>\"]/;
    var B = Array.prototype;
    var ya = B.indexOf
        ? function (a, b, c) {
              return B.indexOf.call(a, b, c);
          }
        : function (a, b, c) {
              c = c == n ? 0 : c < 0 ? Math.max(0, a.length + c) : c;
              if (w(a)) {
                  if (!w(b) || b.length != 1) {
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
    var za = B.forEach
        ? function (a, b, c) {
              B.forEach.call(a, b, c);
          }
        : function (a, b, c) {
              for (var d = a.length, f = w(a) ? a.split("") : a, e = 0; e < d; e++) {
                  if (e in f) {
                      b.call(c, f[e], e, a);
                  }
              }
          };
    var Aa = B.filter
        ? function (a, b, c) {
              return B.filter.call(a, b, c);
          }
        : function (a, b, c) {
              for (var d = a.length, f = [], e = 0, g = w(a) ? a.split("") : a, h = 0; h < d; h++) {
                  if (h in g) {
                      var j = g[h];
                      if (b.call(c, j, h, a)) {
                          f[e++] = j;
                      }
                  }
              }
              return f;
          };
    var Ba = B.some
        ? function (a, b, c) {
              return B.some.call(a, b, c);
          }
        : function (a, b, c) {
              for (var d = a.length, f = w(a) ? a.split("") : a, e = 0; e < d; e++) {
                  if (e in f && b.call(c, f[e], e, a)) {
                      return l;
                  }
              }
              return o;
          };
    function Ca(a, b) {
        return ya(a, b) >= 0;
    }
    function Da(a, b) {
        var c = ya(a, b);
        if (c >= 0) {
            B.splice.call(a, c, 1);
        }
    }
    function Ea(a) {
        return B.concat.apply(B, arguments);
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
    function Ga(a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            var f;
            if (u(d) || ((f = ga(d)) && d.hasOwnProperty("callee"))) {
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
        B.splice.apply(a, Ia(arguments, 1));
    }
    function Ia(a, b, c) {
        if (arguments.length <= 2) {
            return B.slice.call(a, b);
        } else {
            return B.slice.call(a, b, c);
        }
    }
    function Ja(a, b) {
        var c = Ka || La;
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
    function La(a, b) {
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
            return l;
        } else {
            return o;
        }
    }
    function C(a, b) {
        this.x = fa(a) ? a : 0;
        this.y = fa(b) ? b : 0;
    }
    C.prototype.k = function () {
        return new C(this.x, this.y);
    };
    function Oa(a, b) {
        return new C(a.x - b.x, a.y - b.y);
    }
    function Pa(a, b) {
        this.width = a;
        this.height = b;
    }
    Pa.prototype.k = function () {
        return new Pa(this.width, this.height);
    };
    Pa.prototype.floor = function () {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this;
    };
    Pa.prototype.round = function () {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this;
    };
    function Qa(a, b) {
        for (var c in a) {
            b.call(k, a[c], c, a);
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
    function Sa(a) {
        var b = [];
        var c = 0;
        var d;
        for (d in a) {
            b[c++] = d;
        }
        return b;
    }
    var Ta = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
    function Ua(a, b) {
        var c;
        var d;
        for (var f = 1; f < arguments.length; f++) {
            d = arguments[f];
            for (c in d) {
                a[c] = d[c];
            }
            for (var e = 0; e < Ta.length; e++) {
                c = Ta[e];
                if (Object.prototype.hasOwnProperty.call(d, c)) {
                    a[c] = d[c];
                }
            }
        }
    }
    var Va;
    var Wa;
    var Xa;
    var Ya;
    var Za;
    var $a;
    function ab() {
        if (s.navigator) {
            return s.navigator.userAgent;
        } else {
            return n;
        }
    }
    function bb() {
        return s.navigator;
    }
    Za = Ya = Xa = Wa = Va = o;
    var cb;
    if ((cb = ab())) {
        var db = bb();
        Va = cb.indexOf("Opera") == 0;
        Wa = !Va && cb.indexOf("MSIE") != -1;
        Ya = (Xa = !Va && cb.indexOf("WebKit") != -1) && cb.indexOf("Mobile") != -1;
        Za = !Va && !Xa && db.product == "Gecko";
    }
    var eb = Va;
    var D = Wa;
    var E = Za;
    var F = Xa;
    var fb = Ya;
    var gb = bb();
    $a = ((gb && gb.platform) || "").indexOf("Mac") != -1;
    var hb = !!bb() && (bb().appVersion || "").indexOf("X11") != -1;
    var ib;
    a: {
        var jb = "";
        var kb;
        if (eb && s.opera) {
            var lb = s.opera.version;
            var jb = typeof lb == "function" ? lb() : lb;
        } else {
            if (E) {
                kb = /rv\:([^\);]+)(\)|;)/;
            } else if (D) {
                kb = /MSIE\s+([^\);]+)(\)|;)/;
            } else if (F) {
                kb = /WebKit\/(\S+)/;
            }
            if (kb) {
                var mb = kb.exec(ab());
                var jb = mb ? mb[1] : "";
            }
        }
        if (D) {
            var nb;
            var ob = s.document;
            nb = ob ? ob.documentMode : k;
            if (nb > parseFloat(jb)) {
                ib = String(nb);
                break a;
            }
        }
        ib = jb;
    }
    var pb = ib;
    var qb = {};
    function G(a) {
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
    var rb = {};
    function sb(a) {
        return rb[a] || (rb[a] = D && !!document.documentMode && document.documentMode >= a);
    }
    var tb;
    var ub = !D || sb(9);
    if ((!!E || !!D) && (!D || !sb(9))) {
        if (E) {
            G("1.9.1");
        }
    }
    if (D) {
        G("9");
    }
    function vb(a) {
        a = a.className;
        return (w(a) && a.match(/\S+/g)) || [];
    }
    function wb(a, b) {
        var c = vb(a);
        var d = Ia(arguments, 1);
        var f = c.length + d.length;
        xb(c, d);
        a.className = c.join(" ");
        return c.length == f;
    }
    function yb(a, b) {
        var c = vb(a);
        var d = Ia(arguments, 1);
        var c = zb(c, d);
        a.className = c.join(" ");
    }
    function xb(a, b) {
        for (var c = 0; c < b.length; c++) {
            if (!Ca(a, b[c])) {
                a.push(b[c]);
            }
        }
    }
    function zb(a, b) {
        return Aa(a, function (a) {
            return !Ca(b, a);
        });
    }
    function Ab(a, b, c) {
        if (c) {
            wb(a, b);
        } else {
            yb(a, b);
        }
    }
    function Bb(a) {
        if (a) {
            return new Cb(H(a));
        } else {
            return tb || (tb = new Cb());
        }
    }
    function Db(a) {
        if (w(a)) {
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
        return c || n;
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
                if (typeof h.split == "function" && Ca(h.split(/\s+/), a)) {
                    e[f++] = c;
                }
            }
            e.length = f;
            return e;
        }
        return g;
    }
    function Gb(a, b) {
        Qa(b, function (b, d) {
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
        return new Pa(a.clientWidth, a.clientHeight);
    }
    function J(a, b, c) {
        return Jb(document, arguments);
    }
    function Jb(a, b) {
        var c = b[0];
        var d = b[1];
        if (!ub && d && (d.name || d.type)) {
            c = ["<", c];
            if (d.name) {
                c.push(' name="', sa(d.name), '"');
            }
            if (d.type) {
                c.push(' type="', sa(d.type), '"');
                var f = {};
                Ua(f, d);
                d = f;
                delete d.type;
            }
            c.push(">");
            c = c.join("");
        }
        c = a.createElement(c);
        if (d) {
            if (w(d)) {
                c.className = d;
            } else if (u(d)) {
                wb.apply(n, [c].concat(d));
            } else {
                Gb(c, d);
            }
        }
        if (b.length > 2) {
            Kb(a, c, b, 2);
        }
        return c;
    }
    function Kb(a, b, c, d) {
        function f(c) {
            if (c) {
                b.appendChild(w(c) ? a.createTextNode(c) : c);
            }
        }
        for (; d < c.length; d++) {
            var e = c[d];
            if (ga(e) && (!ia(e) || !(e.nodeType > 0))) {
                var g = za;
                var h;
                a: {
                    if ((h = e) && typeof h.length == "number") {
                        if (ia(h)) {
                            h = typeof h.item == "function" || typeof h.item == "string";
                            break a;
                        }
                        if (ha(h)) {
                            h = typeof h.item == "function";
                            break a;
                        }
                    }
                    h = o;
                }
                g(h ? Fa(e) : e, f);
            } else {
                f(e);
            }
        }
    }
    function Lb(a, b) {
        Kb(H(a), a, arguments, 1);
    }
    function Mb(a) {
        for (var b; (b = a.firstChild);) {
            a.removeChild(b);
        }
    }
    function Nb(a) {
        if (a && a.parentNode) {
            a.parentNode.removeChild(a);
        }
    }
    function Ob(a, b) {
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
    function H(a) {
        if (a.nodeType == 9) {
            return a;
        } else {
            return a.ownerDocument || a.document;
        }
    }
    function Pb(a, b) {
        if (!b) {
            return n;
        } else {
            return Qb(a, function (a) {
                return !b || Ca(vb(a), b);
            });
        }
    }
    function Qb(a, b, c) {
        for (var d = c == n, f = 0; a && (d || f <= c);) {
            if (b(a)) {
                return a;
            }
            a = a.parentNode;
            f++;
        }
        return n;
    }
    function Cb(a) {
        this.a = a || s.document || document;
    }
    Cb.prototype.o = function (a) {
        if (w(a)) {
            return this.a.getElementById(a);
        } else {
            return a;
        }
    };
    Cb.prototype.b = function (a, b, c) {
        return Jb(this.a, arguments);
    };
    function Rb(a) {
        return a.a.compatMode == "CSS1Compat";
    }
    function Sb(a) {
        var b = a.a;
        var a = !F && b.compatMode == "CSS1Compat" ? b.documentElement : b.body;
        var b = b.parentWindow || b.defaultView;
        return new C(b.pageXOffset || a.scrollLeft, b.pageYOffset || a.scrollTop);
    }
    Cb.prototype.appendChild = function (a, b) {
        a.appendChild(b);
    };
    Cb.prototype.contains = Ob;
    var Tb = "StopIteration" in s ? s.StopIteration : Error("StopIteration");
    function Ub() {}
    Ub.prototype.a = function () {
        i(Tb);
    };
    Ub.prototype.Wa = function () {
        return this;
    };
    function Vb(a) {
        if (typeof a.v == "function") {
            return a.v();
        }
        if (w(a)) {
            return a.split("");
        }
        if (ga(a)) {
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
                i(Error("Uneven number of arguments"));
            }
            for (var d = 0; d < c; d += 2) {
                Xb(this, arguments[d], arguments[d + 1]);
            }
        } else if (a) {
            if (a instanceof Wb) {
                c = a.S();
                d = a.v();
            } else {
                c = Sa(a);
                d = Ra(a);
            }
            for (var f = 0; f < c.length; f++) {
                Xb(this, c[f], d[f]);
            }
        }
    }
    r = Wb.prototype;
    r.f = 0;
    r.va = 0;
    r.v = function () {
        Yb(this);
        var a = [];
        for (var b = 0; b < this.a.length; b++) {
            a.push(this.b[this.a[b]]);
        }
        return a;
    };
    r.S = function () {
        Yb(this);
        return this.a.concat();
    };
    function Yb(a) {
        if (a.f != a.a.length) {
            for (var b = 0, c = 0; b < a.a.length;) {
                var d = a.a[b];
                if (Zb(a.b, d)) {
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
                if (!Zb(f, d)) {
                    a.a[c++] = d;
                    f[d] = 1;
                }
                b++;
            }
            a.a.length = c;
        }
    }
    function $b(a, b) {
        if (Zb(a.b, b)) {
            return a.b[b];
        } else {
            return k;
        }
    }
    function Xb(a, b, c) {
        if (!Zb(a.b, b)) {
            a.f++;
            a.a.push(b);
            a.va++;
        }
        a.b[b] = c;
    }
    r.k = function () {
        return new Wb(this);
    };
    r.Wa = function (a) {
        Yb(this);
        var b = 0;
        var c = this.a;
        var d = this.b;
        var f = this.va;
        var e = this;
        var g = new Ub();
        g.a = function () {
            while (true) {
                if (f != e.va) {
                    i(Error("The map has changed since the iterator was created"));
                }
                if (b >= c.length) {
                    i(Tb);
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
    function Zb(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }
    var ac = RegExp(
        "^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([\\w\\d\\-\\u0100-\\uffff.%]*)(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$"
    );
    function bc(a) {
        if (cc) {
            cc = o;
            var b = s.location;
            if (b) {
                var c = b.href;
                if (c && (c = (c = bc(c)[3] || n) && decodeURIComponent(c)) && c != b.hostname) {
                    cc = l;
                    i(Error());
                }
            }
        }
        return a.match(ac);
    }
    var cc = F;
    function dc(a, b) {
        var c;
        if (a instanceof dc) {
            this.P = fa(b) ? b : a.P;
            ec(this, a.da);
            this.Aa = a.Aa;
            this.na = a.na;
            fc(this, a.ja);
            this.za = a.za;
            gc(this, a.a.k());
            this.ya = a.ya;
        } else if (a && (c = bc(String(a)))) {
            this.P = !!b;
            ec(this, c[1] || "", l);
            var d = c[2] || "";
            this.Aa = d ? decodeURIComponent(d) : "";
            this.na = (d = c[3] || "") ? decodeURIComponent(d) : "";
            fc(this, c[4]);
            this.za = (d = c[5] || "") ? decodeURIComponent(d) : "";
            gc(this, c[6] || "", l);
            this.ya = (c = c[7] || "") ? decodeURIComponent(c) : "";
        } else {
            this.P = !!b;
            this.a = new hc(n, 0, this.P);
        }
    }
    r = dc.prototype;
    r.da = "";
    r.Aa = "";
    r.na = "";
    r.ja = n;
    r.za = "";
    r.ya = "";
    r.P = o;
    r.toString = function () {
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
            if (b != n) {
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
    r.k = function () {
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
                i(Error("Bad port number " + b));
            }
            a.ja = b;
        } else {
            a.ja = n;
        }
    }
    function gc(a, b, c) {
        if (b instanceof hc) {
            a.a = b;
            b = a.a;
            if ((a = a.P) && !b.b) {
                nc(b);
                b.a = n;
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
                } else if (ga(d) || w(d)) {
                    za(d, c, b);
                } else {
                    var f;
                    if (typeof d.S == "function") {
                        f = d.S();
                    } else if (typeof d.v != "function") {
                        if (ga(d) || w(d)) {
                            f = [];
                            for (var e = d.length, g = 0; g < e; g++) {
                                f.push(g);
                            }
                        } else {
                            f = Sa(d);
                        }
                    } else {
                        f = k;
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
            return new dc(a, k);
        }
    }
    function ic(a, b) {
        if (w(a)) {
            return encodeURI(a).replace(b, sc);
        } else {
            return n;
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
        this.a = a || n;
        this.b = !!c;
    }
    function nc(a) {
        if (!a.i && ((a.i = new Wb()), (a.f = 0), a.a)) {
            for (var b = a.a.split("&"), c = 0; c < b.length; c++) {
                var d = b[c].indexOf("=");
                var f = n;
                var e = n;
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
                d.a = n;
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
    r = hc.prototype;
    r.i = n;
    r.f = n;
    function oc(a, b) {
        nc(a);
        b = tc(a, b);
        if (Zb(a.i.b, b)) {
            a.a = n;
            a.f -= $b(a.i, b).length;
            var c = a.i;
            if (Zb(c.b, b)) {
                delete c.b[b];
                c.f--;
                c.va++;
                if (c.a.length > c.f * 2) {
                    Yb(c);
                }
            }
        }
    }
    function uc(a, b) {
        nc(a);
        b = tc(a, b);
        return Zb(a.i.b, b);
    }
    r.S = function () {
        nc(this);
        var a = this.i.v();
        for (var b = this.i.S(), c = [], d = 0; d < b.length; d++) {
            for (var f = a[d], e = 0; e < f.length; e++) {
                c.push(b[d]);
            }
        }
        return c;
    };
    r.v = function (a) {
        nc(this);
        var b = [];
        if (a) {
            if (uc(this, a)) {
                b = Ea(b, $b(this.i, tc(this, a)));
            }
        } else {
            for (var a = this.i.v(), c = 0; c < a.length; c++) {
                b = Ea(b, a[c]);
            }
        }
        return b;
    };
    function vc(a, b) {
        var c = b ? a.v(b) : [];
        if (c.length > 0) {
            return String(c[0]);
        } else {
            return k;
        }
    }
    function pc(a, b, c) {
        oc(a, b);
        if (c.length > 0) {
            a.a = n;
            Xb(a.i, tc(a, b), Fa(c));
            a.f += c.length;
        }
    }
    r.toString = function () {
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
    r.k = function () {
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
        this.j = b || n;
    }
    r = wc.prototype;
    r.Y = o;
    r.ka = o;
    r.la = 0;
    r.Db = o;
    r.Hb = o;
    r.Gb = 0;
    r.ob = function (a, b) {
        xc(this, a, b);
        this.la--;
        if (this.la == 0 && this.Y) {
            yc(this);
        }
    };
    function xc(a, b, c) {
        a.Y = l;
        a.b = c;
        a.ka = !b;
        yc(a);
    }
    function zc(a) {
        if (a.Y) {
            if (!a.Db) {
                i(new Ac());
            }
            a.Db = o;
        }
    }
    function Bc(a) {
        return Ba(a.a, function (a) {
            return ha(a[1]);
        });
    }
    function yc(a) {
        if (a.d && a.Y && Bc(a)) {
            s.clearTimeout(a.d);
            delete a.d;
        }
        if (a.e) {
            a.e.Gb--;
            delete a.e;
        }
        var b = a.b;
        var c = o;
        for (var d = o; a.a.length && a.la == 0;) {
            var f = a.a.shift();
            var e = f[0];
            var g = f[1];
            var f = f[2];
            if ((e = a.ka ? g : e)) {
                try {
                    var h = e.call(f || a.j, b);
                    if (fa(h)) {
                        a.ka = a.ka && (h == b || h instanceof Error);
                        a.b = b = h;
                    }
                    if (b instanceof wc) {
                        d = l;
                        a.la++;
                    }
                } catch (j) {
                    b = j;
                    a.ka = l;
                    if (!Bc(a)) {
                        c = l;
                    }
                }
            }
        }
        a.b = b;
        if (d && a.la) {
            d = b;
            h = x(a.ob, a, l);
            e = x(a.ob, a, o);
            d.a.push([h, e, k]);
            if (d.Y) {
                yc(d);
            }
            b.Hb = l;
        }
        if (c) {
            a.d = s.setTimeout(function () {
                i(b);
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
        if (c != n) {
            s.clearTimeout(c);
        }
        a.onload = ba;
        a.onerror = ba;
        a.onreadystatechange = ba;
        if (b) {
            window.setTimeout(function () {
                Nb(a);
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
        var f = b || n;
        var e = "_" + (Fc++).toString(36) + qa().toString(36);
        if (!s._callbacks_) {
            s._callbacks_ = {};
        }
        b = a.a.k();
        if (f) {
            for (var g in f) {
                if (!f.hasOwnProperty || f.hasOwnProperty(g)) {
                    var h = b;
                    var j = g;
                    var m = f[g];
                    if (!u(m)) {
                        m = [String(m)];
                    }
                    pc(h.a, j, m);
                }
            }
        }
        if (c) {
            s._callbacks_[e] = function (a) {
                Hc(e, l);
                c.apply(k, arguments);
            };
            g = "_callbacks_." + e;
            if (!u(g)) {
                g = [String(g)];
            }
            pc(b.a, "callback", g);
        }
        var p = b.toString();
        var q = {
            timeout: a.T,
            Lb: l
        };
        var a = q.document || document;
        var v = document.createElement("SCRIPT");
        var b = {
            a: v,
            T: k
        };
        var t = new wc(0, b);
        var I = n;
        g = q.timeout != n ? q.timeout : 5000;
        if (g > 0) {
            I = window.setTimeout(function () {
                Cc(v, l);
                var a = new Dc(1, "Timeout reached for loading script " + p);
                zc(t);
                xc(t, o, a);
            }, g);
            b.T = I;
        }
        v.onload = v.onreadystatechange = function () {
            if (!v.readyState || v.readyState == "loaded" || v.readyState == "complete") {
                Cc(v, q.Lb || o, I);
                zc(t);
                xc(t, l, n);
            }
        };
        v.onerror = function () {
            Cc(v, l, I);
            var a = new Dc(0, "Error while loading script " + p);
            zc(t);
            xc(t, o, a);
        };
        Gb(v, {
            type: "text/javascript",
            charset: "UTF-8",
            src: p
        });
        b = a.getElementsByTagName("HEAD");
        (!b || b.length == 0 ? a.documentElement : b[0]).appendChild(v);
        t.a.push([
            n,
            function () {
                Hc(e, o);
                if (d) {
                    d(f);
                }
            },
            k
        ]);
        if (t.Y) {
            yc(t);
        }
    }
    function Hc(a, b) {
        if (s._callbacks_[a]) {
            if (b) {
                delete s._callbacks_[a];
            } else {
                s._callbacks_[a] = ba;
            }
        }
    }
    new (function () {
        qa();
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
            return "o" + ja(a);
        } else {
            return b.substr(0, 1) + a;
        }
    }
    Ic.prototype.contains = function (a) {
        a = Jc(a);
        return Zb(this.a.b, a);
    };
    Ic.prototype.v = function () {
        return this.a.v();
    };
    Ic.prototype.k = function () {
        return new Ic(this);
    };
    Ic.prototype.Wa = function () {
        return this.a.Wa(o);
    };
    function Kc(a) {
        return Lc(a || arguments.callee.caller, []);
    }
    function Lc(a, b) {
        var c = [];
        if (Ca(b, a)) {
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
                c.push(Lc(a.caller, b));
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
            qa();
        }
        this.d = b;
        delete this.b;
        delete this.a;
    }
    Oc.prototype.b = n;
    Oc.prototype.a = n;
    var Pc = 0;
    function Qc() {}
    Qc.prototype.b = n;
    Qc.prototype.a = n;
    Qc.prototype.d = n;
    function Rc(a, b) {
        this.name = a;
        this.value = b;
    }
    Rc.prototype.toString = function () {
        return this.name;
    };
    var Sc = new Rc("SEVERE", 1000);
    var Tc = new Rc("INFO", 800);
    var Uc = new Rc("CONFIG", 700);
    function Vc(a) {
        if (a.a) {
            return a.a;
        } else if (a.b) {
            return Vc(a.b);
        } else {
            return n;
        }
    }
    Qc.prototype.log = function (a, b, c) {
        if (a.value >= Vc(this).value) {
            a = "log:" + this.e(a, b, c).d;
            if (s.console) {
                if (s.console.timeStamp) {
                    s.console.timeStamp(a);
                } else if (s.console.markTimeline) {
                    s.console.markTimeline(a);
                }
            }
            if (s.msWriteProfilerMark) {
                s.msWriteProfilerMark(a);
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
                var h = aa("window.location.href");
                if (w(c)) {
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
                    var p = o;
                    try {
                        j = c.lineNumber || c.Lc || "Not available";
                    } catch (q) {
                        j = "Not available";
                        p = l;
                    }
                    try {
                        m = c.fileName || c.filename || c.sourceURL || h;
                    } catch (v) {
                        m = "Not available";
                        p = l;
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
                    sa(g.message) +
                    '\nUrl: <a href="view-source:' +
                    g.fileName +
                    '" target="_new">' +
                    g.fileName +
                    "</a>\nLine: " +
                    g.lineNumber +
                    "\n\nBrowser stack:\n" +
                    sa(g.stack + "-> ") +
                    "[end]\n\nJS stack traversal:\n" +
                    sa(Kc(e) + "-> ");
            } catch (t) {
                f = "Exception trying to expose exception! You win, we lose. " + t;
            }
            d.a = f;
        }
        return d;
    };
    function K(a, b) {
        Wc.log(Sc, a, b);
    }
    function Xc(a) {
        Wc.log(Tc, a, k);
    }
    var Yc = {};
    var Zc = n;
    function $c(a) {
        if (!Zc) {
            Zc = new Qc();
            Yc[""] = Zc;
            Zc.a = Uc;
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
    Wc.a = Tc;
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
            return n;
        }
    }
    function cd(a, b) {
        if (b == n) {
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
        return x(function (b) {
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
                        c.a = n;
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
        }, n);
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
            return l;
        } else {
            return o;
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
        fd(d, c, l);
        return d.join("");
    }
    function L(a, b) {
        this.b = a;
        this.a = b;
    }
    var jd = l;
    function kd(a, b) {
        var c = [];
        c.push("[");
        for (var d = 0; d < b.length; ++d) {
            var f = b[d];
            c.push("{actiontype:");
            c.push(f.b);
            if (f.a != n) {
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
    z("hcm.MetricsData", L);
    z("hcm.setRecordMetricsEnabled", function (a) {
        jd = a;
    });
    z("hcm.getMetricsUrl", function (a, b, c) {
        return id(a, b, c);
    });
    z("hcm.recordMetrics", kd);
    z("hcm.trackConversion", function (a, b, c) {
        var d = [];
        if (c) {
            d.push(c.toString());
            d.push(" | ");
        }
        d.push(b);
        b = [];
        b.push(new L("IP_CONVERSION_TRACKING", d.join("")));
        return kd(a, b);
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
                        d = o;
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
                            if (h != n) {
                                d = h;
                                break a;
                            }
                        }
                        d = k;
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
            return n;
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
        return n;
    };
    function od(a) {
        return this.La.b(a);
    }
    function pd(a) {
        this.a = a;
    }
    var qd = /\s*;\s*/;
    function rd() {
        var a = sd;
        var b = td;
        var c = ud;
        var d = 0;
        if (/[;=\s]/.test("GuidedHelpResume")) {
            i(Error('Invalid cookie name "GuidedHelpResume"'));
        }
        if (/[;\r\n]/.test("")) {
            i(Error('Invalid cookie value ""'));
        }
        if (!fa(d)) {
            d = -1;
        }
        c = c ? ";domain=" + c : "";
        b = b ? ";path=" + b : "";
        d =
            d < 0
                ? ""
                : d == 0
                  ? ";expires=" + new Date(1970, 1, 1).toUTCString()
                  : ";expires=" + new Date(qa() + d * 1000).toUTCString();
        a.a.cookie = "GuidedHelpResume=" + c + b + d + "";
    }
    function vd(a, b, c) {
        var d = b + "=";
        for (var a = (a.a.cookie || "").split(qd), f = 0, e; (e = a[f]); f++) {
            if (e.indexOf(d) == 0) {
                return e.substr(d.length);
            }
            if (e == b) {
                return "";
            }
        }
        return c;
    }
    pd.prototype.S = function () {
        return wd(this).keys;
    };
    pd.prototype.v = function () {
        return wd(this).Qb;
    };
    function wd(a) {
        for (var a = (a.a.cookie || "").split(qd), b = [], c = [], d, f, e = 0; (f = a[e]); e++) {
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
    var sd = new pd(document);
    sd.b = 3950;
    function xd() {}
    A(xd, ld);
    xd.prototype.d = function (a) {
        return a;
    };
    var yd = xd.prototype.d;
    (yd ? yd : function () {}).mb = l;
    xd.prototype.e = function () {
        return l;
    };
    var zd = xd.prototype.e;
    (zd ? zd : function () {}).mb = l;
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
    Dd.prototype.a = o;
    Dd.prototype.b = l;
    Dd.prototype.stopPropagation = function () {
        this.a = l;
    };
    Dd.prototype.preventDefault = function () {
        this.b = o;
    };
    function Ed(a) {
        Ed[" "](a);
        return a;
    }
    Ed[" "] = ba;
    if (D) {
        sb(9);
    }
    var Fd = !D || sb(9);
    var Gd = D && !G("8");
    if (F) {
        G("528");
    }
    if ((!E || !G("1.9b")) && (!D || !G("8")) && (!eb || !G("9.5"))) {
        if (F) {
            G("528");
        }
    }
    if (!E || !!G("8")) {
        if (D) {
            G("9");
        }
    }
    function Hd(a, b) {
        if (a) {
            this.init(a, b);
        }
    }
    A(Hd, Dd);
    r = Hd.prototype;
    r.target = n;
    r.relatedTarget = n;
    r.clientX = 0;
    r.clientY = 0;
    r.keyCode = 0;
    r.charCode = 0;
    r.ctrlKey = o;
    r.altKey = o;
    r.shiftKey = o;
    r.G = n;
    r.init = function (a, b) {
        var c = (this.type = a.type);
        Dd.call(this, c);
        this.target = a.target || a.srcElement;
        this.currentTarget = b;
        var d = a.relatedTarget;
        if (d) {
            if (E) {
                var f;
                a: {
                    try {
                        Ed(d.nodeName);
                        f = l;
                        break a;
                    } catch (e) {}
                    f = o;
                }
                if (!f) {
                    d = n;
                }
            }
        } else if (c == "mouseover") {
            d = a.fromElement;
        } else if (c == "mouseout") {
            d = a.toElement;
        }
        this.relatedTarget = d;
        this.clientX = a.clientX !== k ? a.clientX : a.pageX;
        this.clientY = a.clientY !== k ? a.clientY : a.pageY;
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
    r.stopPropagation = function () {
        Hd.B.stopPropagation.call(this);
        if (this.G.stopPropagation) {
            this.G.stopPropagation();
        } else {
            this.G.cancelBubble = l;
        }
    };
    r.preventDefault = function () {
        Hd.B.preventDefault.call(this);
        var a = this.G;
        if (a.preventDefault) {
            a.preventDefault();
        } else {
            a.returnValue = o;
            if (Gd) {
                try {
                    if (a.ctrlKey || (a.keyCode >= 112 && a.keyCode <= 123)) {
                        a.keyCode = -1;
                    }
                } catch (b) {}
            }
        }
    };
    r.Sb = function () {
        return this.G;
    };
    function Id() {}
    var Jd = 0;
    r = Id.prototype;
    r.key = 0;
    r.Q = o;
    r.Pa = o;
    r.init = function (a, b, c, d, f, e) {
        if (ha(a)) {
            this.a = l;
        } else if (a && a.handleEvent && ha(a.handleEvent)) {
            this.a = o;
        } else {
            i(Error("Invalid listener argument"));
        }
        this.$ = a;
        this.b = b;
        this.src = c;
        this.type = d;
        this.capture = !!f;
        this.ua = e;
        this.Pa = o;
        this.key = ++Jd;
        this.Q = o;
    };
    r.handleEvent = function (a) {
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
            if (u(b)) {
                for (var e = 0; e < b.length; e++) {
                    N(a, b[e], c, d, f);
                }
                return n;
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
            var h = ja(a);
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
                if (a == s || !a.vb) {
                    a.addEventListener(b, e, d);
                }
            } else {
                a.attachEvent(b in Md ? Md[b] : (Md[b] = "on" + b), e);
            }
            return c;
        }
        i(Error("Invalid event type"));
    }
    function Od(a, b, c, d, f) {
        if (u(b)) {
            for (var e = 0; e < b.length; e++) {
                Od(a, b[e], c, d, f);
            }
        } else {
            a = N(a, b, c, d, f);
            Kd[a].Pa = l;
        }
    }
    function Pd(a, b, c, d, f) {
        if (u(b)) {
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
            return o;
        }
        var b = Kd[a];
        if (b.Q) {
            return o;
        }
        var c = b.src;
        var d = b.type;
        var f = b.b;
        var e = b.capture;
        if (c.removeEventListener) {
            if (c == s || !c.vb) {
                c.removeEventListener(d, f, e);
            }
        } else if (c.detachEvent) {
            c.detachEvent(d in Md ? Md[d] : (Md[d] = "on" + d), f);
        }
        c = ja(c);
        if (Ld[c]) {
            f = Ld[c];
            Da(f, b);
            if (f.length == 0) {
                delete Ld[c];
            }
        }
        b.Q = l;
        if ((b = M[d][e][c])) {
            b.wb = l;
            Sd(d, e, c, b);
        }
        delete Kd[a];
        return l;
    }
    function Sd(a, b, c, d) {
        if (!d.Fa && d.wb) {
            for (var f = 0, e = 0; f < d.length; f++) {
                if (d[f].Q) {
                    d[f].b.src = n;
                } else {
                    if (f != e) {
                        d[e] = d[f];
                    }
                    e++;
                }
            }
            d.length = e;
            d.wb = o;
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
        if (b in d && ((d = d[b]), c in d && ((d = d[c]), (a = ja(a)), d[a]))) {
            return d[a];
        } else {
            return n;
        }
    }
    function Td(a, b, c, d, f) {
        var e = 1;
        var b = ja(b);
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
                        e &= Ud(j, f) !== o;
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
            return l;
        }
        var c = Kd[a];
        var d = c.type;
        var f = M;
        if (!(d in f)) {
            return l;
        }
        var f = f[d];
        var e;
        var g;
        if (!Fd) {
            e = b || aa("window.event");
            var h = l in f;
            var j = o in f;
            if (h) {
                if (e.keyCode < 0 || e.returnValue != k) {
                    return l;
                }
                a: {
                    var m = o;
                    if (e.keyCode == 0) {
                        try {
                            e.keyCode = -1;
                            break a;
                        } catch (p) {
                            m = l;
                        }
                    }
                    if (m || e.returnValue == k) {
                        e.returnValue = l;
                    }
                }
            }
            m = new Hd();
            m.init(e, this);
            e = l;
            try {
                if (h) {
                    var q = [];
                    for (var v = m.currentTarget; v; v = v.parentNode) {
                        q.push(v);
                    }
                    g = f[l];
                    g.u = g.f;
                    for (var t = q.length - 1; !m.a && t >= 0 && g.u; t--) {
                        m.currentTarget = q[t];
                        e &= Td(g, q[t], d, l, m);
                    }
                    if (j) {
                        g = f[o];
                        g.u = g.f;
                        for (t = 0; !m.a && t < q.length && g.u; t++) {
                            m.currentTarget = q[t];
                            e &= Td(g, q[t], d, o, m);
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
                            Ga(g, e.C);
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
        b = vd(new pd(window.document), "WCSDBG", "");
        if (b.length > 0) {
            b = b.split(";")[0];
            b = rc("https://" + b + "/talkgadget/");
            if (b.ja != n) {
                ec(b, "http");
            }
            this.a = b.toString();
        }
        this.helpLink = a.helpLink;
        this.j = a.rosterId || "talk_roster";
        if (a.rosterFrameId) {
            a.rosterFrameId.match(/[\w-]/);
        }
        this.e = a.isRtl || o;
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
    function ee(a) {
        var a = a || {};
        var b = new de(a);
        this.clientBaseUrl = b.a;
        this.rosterId = b.j;
        this.entityId = b.d;
        this.feedbackId = a.feedbackId || 74772;
        this.alphaTestMode = a.alphaTestMode || o;
        this.stagingMode = a.stagingMode || o;
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
    z("cs.Config", ee);
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
        this.D = n;
    }
    O.prototype.pb = function () {
        return this.oa;
    };
    function he(a, b) {
        var c = Ra(a.pb().Ma);
        B.sort.call(
            c,
            function (a, b) {
                return a.a - b.a;
            } || La
        );
        for (var d = 0; d < c.length; d++) {
            var f = c[d];
            var e = b;
            var g = f;
            if (g.a in e.z && fa(e.z[g.a]) && e.z[g.a] !== n) {
                if (a.D) {
                    delete a.D[f.a];
                }
                e = f.b == 11 || f.b == 10;
                if (f.d) {
                    g = b;
                    g = ie(g, g.a[f.a]);
                    if (g != n) {
                        u(g);
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
            return n;
        }
        c = a.z[c];
        if (c == n) {
            return n;
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
            required: l,
            c: 9,
            type: String
        },
        2: {
            name: "agent_jid",
            required: l,
            c: 9,
            type: String
        },
        3: {
            name: "customer_jid",
            required: l,
            c: 9,
            type: String
        },
        6: {
            name: "pool_id",
            required: l,
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
            required: l,
            c: 9,
            type: String
        },
        2: {
            name: "state",
            required: l,
            c: 11,
            type: le
        },
        3: {
            name: "full_jid",
            L: l,
            c: 9,
            type: String
        },
        4: {
            name: "pool_id",
            L: l,
            c: 9,
            type: String
        },
        5: {
            name: "chat_session",
            L: l,
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
            required: l,
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
            required: l,
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
            required: l,
            c: 9,
            type: String
        },
        2: {
            name: "full_jid",
            L: l,
            c: 9,
            type: String
        },
        3: {
            name: "case_info",
            required: l,
            c: 11,
            type: ne
        },
        4: {
            name: "survey_attribute",
            L: l,
            c: 11,
            type: oe
        },
        5: {
            name: "pool_id",
            required: l,
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
            required: l,
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
            required: l,
            c: 9,
            type: String
        },
        2: {
            name: "value",
            required: l,
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
            required: l,
            c: 11,
            type: qe
        },
        2: {
            name: "agent",
            L: l,
            c: 11,
            type: ke
        },
        3: {
            name: "customer",
            L: l,
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
            required: l,
            c: 3,
            type: String
        },
        2: {
            name: "customer_source_id",
            required: l,
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
            required: l,
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
            required: l,
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
            L: l,
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
            required: l,
            c: 11,
            type: ke
        },
        2: {
            name: "customer",
            required: l,
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
            required: l,
            c: 14,
            defaultValue: 0,
            type: {
                Mc: 0,
                Rc: 1
            }
        },
        2: {
            name: "resource_id",
            required: l,
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
            required: l,
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
            required: l,
            c: 9,
            type: String
        },
        2: {
            name: "locale",
            required: l,
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
            required: l,
            c: 14,
            defaultValue: 0,
            type: {
                Sc: 0,
                Nc: 1
            }
        },
        2: {
            name: "value",
            required: l,
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
            required: l,
            c: 9,
            type: String
        },
        2: {
            name: "unavailable_message",
            required: l,
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
            required: l,
            c: 9,
            type: String
        },
        2: {
            name: "assignee_group",
            required: l,
            c: 9,
            type: String
        }
    });
    function Ce(a, b) {
        this.j = a;
        this.d = b;
        this.b = o;
        this.a = [];
    }
    function De(a) {
        for (var b = 0; b < a.a.length; b++) {
            a.a[b]();
        }
        a = a.a;
        if (!u(a)) {
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
            var c = x(a.e, a);
            var d = J("script", {
                type: "text/javascript",
                src: a.j,
                onload: c,
                onreadystatechange: function () {
                    if (d.readyState == "complete" || d.readyState == "loaded") {
                        c();
                        d.onreadystatechange = n;
                    }
                }
            });
            var f = document;
            var e = f.getElementsByTagName("head");
            (e.length > 0 ? e[0] : f.body).appendChild(d);
            a.b = l;
        }
    }
    function R(a) {
        this.b = a instanceof ee ? a : new ee(a);
        this.a = new Ce(this.b.operatorDeferredUrl, Ee);
        Q(
            this.a,
            x(
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
    r = R.prototype;
    r.ac = function () {
        Q(
            this.a,
            x(function () {
                this.p.ensureChatLoaded();
            }, this)
        );
    };
    r.Gc = function (a) {
        Q(
            this.a,
            x(
                function (a) {
                    this.p.subscribeToMoleEvents(a);
                },
                this,
                a
            )
        );
    };
    r.mc = function (a, b, c) {
        Q(
            this.a,
            x(
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
    r.nc = function () {
        Q(
            this.a,
            x(function () {
                this.p.logOut();
            }, this)
        );
    };
    r.Xb = function (a, b, c) {
        Q(
            this.a,
            x(
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
    r.Yb = function (a) {
        Q(
            this.a,
            x(
                function (a) {
                    this.p.connect(a);
                },
                this,
                a
            )
        );
    };
    r.pc = function () {
        Q(
            this.a,
            x(function () {
                this.p.reconnect();
            }, this)
        );
    };
    r.Hc = function (a, b) {
        Q(
            this.a,
            x(
                function (a, b) {
                    this.p.updateState(a, b);
                },
                this,
                a,
                b
            )
        );
    };
    r.sc = function (a) {
        Q(
            this.a,
            x(
                function (a) {
                    this.p.retrieveChatAvailability(a);
                },
                this,
                a
            )
        );
    };
    r.qc = function (a) {
        Q(
            this.a,
            x(
                function (a) {
                    this.p.requestScreenshot(a);
                },
                this,
                a
            )
        );
    };
    r.Cc = function (a, b) {
        Q(
            this.a,
            x(
                function (a, b) {
                    this.p.setUserInputText(a, b);
                },
                this,
                a,
                b
            )
        );
    };
    r.Ua = function (a, b) {
        Q(
            this.a,
            x(
                function (a, b) {
                    this.p.beginSupportRequestByElement(a, b);
                },
                this,
                a,
                b
            )
        );
    };
    r.Cb = function (a, b) {
        Q(
            this.a,
            x(
                function (a, b) {
                    this.p.beginSupportRequestByAnswerId(a, b);
                },
                this,
                a,
                b
            )
        );
    };
    r.rc = function (a, b) {
        Q(
            this.a,
            x(
                function (a, b) {
                    this.p.requestSupport(a, b);
                },
                this,
                a,
                b
            )
        );
    };
    z("cs.Operator", R);
    R.prototype.ensureChatLoaded = R.prototype.ac;
    R.prototype.subscribeToMoleEvents = R.prototype.Gc;
    R.prototype.logIn = R.prototype.mc;
    R.prototype.logOut = R.prototype.nc;
    R.prototype.resolve = R.prototype.Xb;
    R.prototype.connect = R.prototype.Yb;
    R.prototype.reconnect = R.prototype.pc;
    R.prototype.updateState = R.prototype.Hc;
    R.prototype.retrieveChatAvailability = R.prototype.sc;
    R.prototype.requestScreenshot = R.prototype.qc;
    R.prototype.setUserInputText = R.prototype.Cc;
    R.prototype.beginSupportRequestByElement = R.prototype.Ua;
    R.prototype.beginSupportRequestByAnswerId = R.prototype.Cb;
    R.prototype.requestSupport = R.prototype.rc;
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
                this.answersArr.push(new ad(c[d], l));
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
                this.topicsArr.push(new Ge(c[d], l));
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
    function Ie(a, b, c, d, f, e, g, h) {
        var j;
        var m = [];
        m.push(gd(b, c));
        m.push("/api/answer/");
        m.push(a);
        m.push("/json?");
        a = fd(m, f, l);
        ed(m, e, !a);
        j = m.join("");
        e = Ja(Na, new He(j, {}));
        if (e >= 0) {
            Xc("Using cached answer for " + j);
            d(Na[e].b, l);
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
                    d(a, o);
                },
                g
                    ? function (a) {
                          g(a, j);
                      }
                    : n
            );
        }
    }
    function Je(a, b, c, d, f, e, g, h) {
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
            d(Na[a].b, l);
        } else {
            a = new Ec(j);
            if (h) {
                a.T = h;
            }
            Gc(
                a,
                {},
                function (a) {
                    a = new Ge(a, l).answersArr;
                    if (Ma(new He(j, a))) {
                        Xc("Cached new list of answers for " + j);
                    }
                    d(a, o);
                },
                g
                    ? function (a) {
                          g(a, j);
                      }
                    : n
            );
        }
    }
    function Ke(a, b, c, d, f, e, g, h) {
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
            d(Na[a].b, l);
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
                    d(b, o);
                },
                g
                    ? function (a) {
                          g(a, j);
                      }
                    : n
            );
        }
    }
    function Le(a, b, c, d, f, e, g, h) {
        var j;
        var m = [];
        m.push(gd(b, c));
        m.push("/api/topic/");
        m.push(a);
        m.push("/inproduct?");
        a = fd(m, f, l);
        ed(m, e, !a);
        j = m.join("");
        e = Ja(Na, new He(j, {}));
        if (e >= 0) {
            Xc("Using cached topic for " + j);
            d(Na[e].b, l);
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
                    d(a, o);
                },
                g
                    ? function (a) {
                          g(a, j);
                      }
                    : n
            );
        }
    }
    z("hchas.getAnswerById", Ie);
    z("hchas.getAnswersByUserContext", Je);
    z("hchas.getMatchesBySearchQuery", Ke);
    z("hchas.getTopicById", Le);
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
                window.a.ma.Kc(e ? !e : l);
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
    function Re(a, b, c, d, f, e, g, h, j, m) {
        Qe(b, c, d, f, e, g, m, function () {
            window.a.ma.Va(a, h, n, j);
        });
    }
    function Te(a, b, c, d, f, e) {
        return x(function (g) {
            if (g.type == "click") {
                var h = g.target;
                if (h && h.getAttribute) {
                    var j = h.getAttribute("guidedhelpflowid");
                    if (j) {
                        try {
                            j = parseInt(j, 10);
                            g.stopPropagation();
                            g.preventDefault();
                            Qe(a, b, c, d, f, e, k, function () {
                                window.a.ma.Va(j);
                            });
                        } catch (m) {}
                    }
                }
            }
        }, n);
    }
    z("hgb.loadFlow", Re);
    z("hgb.resumeCookiedFlow", function (a, b, c, d, f, e, g) {
        var h;
        var j = vd(sd, "GuidedHelpResume");
        if ((h = j ? Number(j.substring(0, j.indexOf(":"))) : n)) {
            var m;
            m = (j = vd(sd, "GuidedHelpResume")) ? j.substring(j.indexOf(":") + 1) : n;
            rd();
            Qe(a, b, c, d, f, e, g, function () {
                window.a.ma.Va(h, m, o);
            });
            return l;
        }
        return o;
    });
    z("hgb.setResumeCookieProperties", function (a, b) {
        ud = a || "";
        td = b || "";
    });
    z("hgb.startFlowFromUrl", function (a, b, c, d, f, e, g) {
        var h = Bb(g || window.top);
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
                return l;
            } catch (p) {}
        }
        return o;
    });
    function Ue(a) {
        this.b = a;
        this.a = [];
    }
    A(Ue, Cd);
    var Ve = [];
    function S(a, b, c, d, f) {
        if (!u(c)) {
            Ve[0] = c;
            c = Ve;
        }
        for (var e = 0; e < c.length; e++) {
            var g = N(b, c[e], d || a, f || o, a.b || a);
            a.a.push(g);
        }
    }
    function We(a, b, c, d, f, e) {
        if (u(c)) {
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
                b = n;
            }
            if (b) {
                b = b.key;
                Rd(b);
                Da(a.a, b);
            }
        }
    }
    Ue.prototype.handleEvent = function () {
        i(Error("EventHandler.handleEvent not implemented"));
    };
    function Xe() {}
    A(Xe, Cd);
    Xe.prototype.vb = l;
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
            if (w(a)) {
                a = new Dd(a, this);
            } else if (a instanceof Dd) {
                a.target = a.target || this;
            } else {
                var d = a;
                var a = new Dd(b, this);
                Ua(a, d);
            }
            var d = 1;
            var f;
            var c = c[b];
            var b = l in c;
            var e;
            if (b) {
                f = [];
                for (e = this; e; e = n) {
                    f.push(e);
                }
                e = c[l];
                e.u = e.f;
                for (var g = f.length - 1; !a.a && g >= 0 && e.u; g--) {
                    a.currentTarget = f[g];
                    d &= Td(e, f[g], a.type, l, a) && a.b != o;
                }
            }
            if (o in c) {
                e = c[o];
                e.u = e.f;
                if (b) {
                    for (g = 0; !a.a && g < f.length && e.u; g++) {
                        a.currentTarget = f[g];
                        d &= Td(e, f[g], a.type, o, a) && a.b != o;
                    }
                } else {
                    for (f = this; !a.a && f && e.u; f = n) {
                        a.currentTarget = f;
                        d &= Td(e, f, a.type, o, a) && a.b != o;
                    }
                }
            }
            a = Boolean(d);
        } else {
            a = l;
        }
        return a;
    };
    function Ye(a, b, c, d, f) {
        if (!D && (!F || !G("525"))) {
            return l;
        }
        if ($a && f) {
            return Ze(a);
        }
        if ((f && !d) || (!c && (b == 17 || b == 18)) || (D && d && b == a)) {
            return o;
        }
        switch (a) {
            case 13:
                return !D || !sb(9);
            case 27:
                return !F;
        }
        return Ze(a);
    }
    function Ze(a) {
        if ((a >= 48 && a <= 57) || (a >= 96 && a <= 106) || (a >= 65 && a <= 90) || (F && a == 0)) {
            return l;
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
                return l;
            default:
                return o;
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
                    this.xa = this.Na = this.wa = n;
                }
                this.ba = n;
                this.M = this.R = -1;
            }
            this.ba = a;
            this.wa = N(this.ba, "keypress", this, b);
            this.Na = N(this.ba, "keydown", this.a, b, this);
            this.xa = N(this.ba, "keyup", this.b, b, this);
        }
    }
    A(af, Xe);
    r = af.prototype;
    r.ba = n;
    r.wa = n;
    r.Na = n;
    r.xa = n;
    r.R = -1;
    r.M = -1;
    r.Za = o;
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
    var df = D || (F && G("525"));
    var ef = $a && E;
    af.prototype.a = function (a) {
        if (F && ((this.R == 17 && !a.ctrlKey) || (this.R == 18 && !a.altKey))) {
            this.M = this.R = -1;
        }
        if (df && !Ye(a.keyCode, this.R, a.shiftKey, a.ctrlKey, a.altKey)) {
            this.handleEvent(a);
        } else {
            this.M = E ? $e(a.keyCode) : a.keyCode;
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
        if (D && a.type == "keypress") {
            c = this.M;
            d = c != 13 && c != 27 ? b.keyCode : 0;
        } else if (F && a.type == "keypress") {
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
            if ($a && d == 63 && c == 224) {
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
            this.init(d, k);
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
    function hf(a, b, c, d) {
        this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d;
    }
    hf.prototype.k = function () {
        return new hf(this.top, this.right, this.bottom, this.left);
    };
    hf.prototype.contains = function (a) {
        if (!this || !a) {
            return o;
        } else if (a instanceof hf) {
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
        if (w(b)) {
            lf(a, c, b);
        } else {
            Qa(b, pa(lf, a));
        }
    }
    function lf(a, b, c) {
        a.style[
            String(c).replace(/\-([a-z])/g, function (a, b) {
                return b.toUpperCase();
            })
        ] = b;
    }
    function T(a, b) {
        var c = H(a);
        if (c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(a, n))) {
            return c[b] || c.getPropertyValue(b) || "";
        } else {
            return "";
        }
    }
    function mf(a, b) {
        if (a.currentStyle) {
            return a.currentStyle[b];
        } else {
            return n;
        }
    }
    function nf(a, b) {
        return T(a, b) || mf(a, b) || (a.style && a.style[b]);
    }
    function of(a) {
        a = a ? H(a) : document;
        if (D && !sb(9) && !Rb(Bb(a))) {
            return a.body;
        } else {
            return a.documentElement;
        }
    }
    function pf(a) {
        if (fb && F) {
            var b = a.ownerDocument.defaultView;
            if (b != b.top) {
                return o;
            }
        }
        return !!a.getBoundingClientRect;
    }
    function qf(a) {
        var b = a.getBoundingClientRect();
        if (D) {
            a = a.ownerDocument;
            b.left -= a.documentElement.clientLeft + a.body.clientLeft;
            b.top -= a.documentElement.clientTop + a.body.clientTop;
        }
        return b;
    }
    function rf(a) {
        if (D && !sb(8)) {
            return a.offsetParent;
        }
        for (
            var b = H(a), c = nf(a, "position"), d = c == "fixed" || c == "absolute", a = a.parentNode;
            a && a != b;
            a = a.parentNode
        ) {
            c = nf(a, "position");
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
        return n;
    }
    function sf(a) {
        var b = new hf(0, Infinity, Infinity, 0);
        var c = Bb(a);
        var d = c.a.body;
        var f = c.a.documentElement;
        var e = !F && c.a.compatMode == "CSS1Compat" ? c.a.documentElement : c.a.body;
        for (; (a = rf(a));) {
            if (
                (!D || a.clientWidth != 0) &&
                (!F || a.clientHeight != 0 || a != d) &&
                a != d &&
                a != f &&
                nf(a, "overflow") != "visible"
            ) {
                var g = tf(a);
                var h;
                h = a;
                if (E && !G("1.9")) {
                    var j = parseFloat(T(h, "borderLeftWidth"));
                    if (uf(h)) {
                        var m = h.offsetWidth - h.clientWidth - j - parseFloat(T(h, "borderRightWidth"));
                        var j = j + m;
                    }
                    h = new C(j, parseFloat(T(h, "borderTopWidth")));
                } else {
                    h = new C(h.clientLeft, h.clientTop);
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
            return n;
        }
    }
    function tf(a) {
        var b;
        var c = H(a);
        var d = nf(a, "position");
        var f =
            E &&
            c.getBoxObjectFor &&
            !a.getBoundingClientRect &&
            d == "absolute" &&
            (b = c.getBoxObjectFor(a)) &&
            (b.screenX < 0 || b.screenY < 0);
        var e = new C(0, 0);
        var g = of(c);
        if (a == g) {
            return e;
        }
        if (pf(a)) {
            b = qf(a);
            a = Sb(Bb(c));
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
                if (F && nf(b, "position") == "fixed") {
                    e.x += c.body.scrollLeft;
                    e.y += c.body.scrollTop;
                    break;
                }
                b = b.offsetParent;
            } while (b && b != a);
            if (eb || (F && d == "absolute")) {
                e.y -= c.body.offsetTop;
            }
            for (b = a; (b = rf(b)) && b != c.body && b != g;) {
                e.x -= b.scrollLeft;
                if (!eb || b.tagName != "TR") {
                    e.y -= b.scrollTop;
                }
            }
        }
        return e;
    }
    function vf(a) {
        var b = new C();
        if (a.nodeType == 1) {
            if (pf(a)) {
                var c = qf(a);
                b.x = c.left;
                b.y = c.top;
            } else {
                var c = Sb(Bb(a));
                var d = tf(a);
                b.x = d.x - c.x;
                b.y = d.y - c.y;
            }
            if (E && !G(12)) {
                var f;
                if (D) {
                    f = "-ms-transform";
                } else if (F) {
                    f = "-webkit-transform";
                } else if (eb) {
                    f = "-o-transform";
                } else if (E) {
                    f = "-moz-transform";
                }
                var e;
                if (f) {
                    e = nf(a, f);
                }
                if (!e) {
                    e = nf(a, "transform");
                }
                if (e) {
                    a = e.match(wf);
                    a = !a ? new C(0, 0) : new C(parseFloat(a[1]), parseFloat(a[2]));
                } else {
                    a = new C(0, 0);
                }
                b = new C(b.x + a.x, b.y + a.y);
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
    function xf(a, b) {
        if (typeof a == "number") {
            a = (b ? Math.round(a) : a) + "px";
        }
        return a;
    }
    function yf(a) {
        if (nf(a, "display") != "none") {
            return zf(a);
        }
        var b = a.style;
        var c = b.display;
        var d = b.visibility;
        var f = b.position;
        b.visibility = "hidden";
        b.position = "absolute";
        b.display = "inline";
        a = zf(a);
        b.display = c;
        b.position = f;
        b.visibility = d;
        return a;
    }
    function zf(a) {
        var b = a.offsetWidth;
        var c = a.offsetHeight;
        var d = F && !b && !c;
        if ((!fa(b) || d) && a.getBoundingClientRect) {
            a = qf(a);
            return new Pa(a.right - a.left, a.bottom - a.top);
        } else {
            return new Pa(b, c);
        }
    }
    function U(a, b) {
        a.style.display = b ? "" : "none";
    }
    function Af(a) {
        return a.style.display != "none";
    }
    function uf(a) {
        return nf(a, "direction") == "rtl";
    }
    function Bf(a, b) {
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
    var Cf = {
        thin: 2,
        medium: 4,
        thick: 6
    };
    function Df(a, b) {
        if (mf(a, b + "Style") == "none") {
            return 0;
        }
        var c = mf(a, b + "Width");
        if (c in Cf) {
            return Cf[c];
        } else {
            return Bf(a, c);
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
            if (!p || nf(j, "position") != "static") {
                m = tf(j);
                if (!p) {
                    p =
                        (p = uf(j)) && E
                            ? -j.scrollLeft
                            : p && (!D || !G("8"))
                              ? j.scrollWidth - j.clientWidth - j.scrollLeft
                              : j.scrollLeft;
                    m = Oa(m, new C(p, j.scrollTop));
                }
            }
        }
        j = m || new C();
        m = tf(a);
        p = yf(a);
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
        p = Bb(a);
        t = Bb(c);
        if (p.a != t.a) {
            var v = p.a.body;
            var t = t.a.parentWindow || t.a.defaultView;
            var q = new C(0, 0);
            var I = H(v) ? H(v).parentWindow || H(v).defaultView : window;
            var oa = v;
            do {
                var Se = I == t ? tf(oa) : vf(oa);
                q.x += Se.x;
                q.y += Se.y;
            } while (I && I != t && (oa = I.frameElement) && (I = I.parent));
            v = Oa(q, tf(v));
            if (D && !Rb(p)) {
                v = Oa(v, Sb(p));
            }
            m.left += v.x;
            m.top += v.y;
        }
        a = (b & 4 && uf(a) ? b ^ 2 : b) & -5;
        b = new C(a & 2 ? m.left + m.width : m.left, a & 1 ? m.top + m.height : m.top);
        b = Oa(b, j);
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
        return Gf(b, c, d, e, da, g, h);
    }
    function Gf(a, b, c, d, f, e, g) {
        var a = a.k();
        var h = 0;
        var j = (c & 4 && uf(b) ? c ^ 2 : c) & -5;
        var c = yf(b);
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
        f = E && ($a || hb) && G("1.9");
        if (e instanceof C) {
            a = e.x;
            e = e.y;
        } else {
            a = e;
            e = k;
        }
        b.style.left = xf(a, f);
        b.style.top = xf(e, f);
        if (c != g && !(!c || !g ? 0 : c.width == g.width && c.height == g.height)) {
            a = Rb(Bb(H(b)));
            if (D && (!a || !G("8"))) {
                c = b.style;
                if (a) {
                    if (D) {
                        a = Bf(b, mf(b, "paddingLeft"));
                        f = Bf(b, mf(b, "paddingRight"));
                        e = Bf(b, mf(b, "paddingTop"));
                        d = Bf(b, mf(b, "paddingBottom"));
                        a = new hf(e, f, d, a);
                    } else {
                        a = T(b, "paddingLeft");
                        f = T(b, "paddingRight");
                        e = T(b, "paddingTop");
                        d = T(b, "paddingBottom");
                        a = new hf(parseFloat(e), parseFloat(f), parseFloat(d), parseFloat(a));
                    }
                    if (D) {
                        f = Df(b, "borderLeft");
                        e = Df(b, "borderRight");
                        d = Df(b, "borderTop");
                        b = Df(b, "borderBottom");
                        b = new hf(d, e, b, f);
                    } else {
                        f = T(b, "borderLeftWidth");
                        e = T(b, "borderRightWidth");
                        d = T(b, "borderTopWidth");
                        b = T(b, "borderBottomWidth");
                        b = new hf(parseFloat(d), parseFloat(e), parseFloat(b), parseFloat(f));
                    }
                    c.pixelWidth = g.width - b.left - a.left - a.right - b.right;
                    c.pixelHeight = g.height - b.top - a.top - a.bottom - b.bottom;
                } else {
                    c.pixelWidth = g.width;
                    c.pixelHeight = g.height;
                }
            } else {
                b = b.style;
                if (E) {
                    b.MozBoxSizing = "border-box";
                } else if (F) {
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
        Ff(this.b, this.d, a, b, k, c, this.e);
    };
    function Jf(a, b) {
        this.b = a instanceof C ? a : new C(a, b);
    }
    A(Jf, Hf);
    Jf.prototype.a = function (a, b, c, d) {
        Ff(of(a), 0, a, b, this.b, c, n, d);
    };
    var Kf = s.window;
    function Lf(a, b) {
        if (!ha(a)) {
            if (a && typeof a.handleEvent == "function") {
                a = x(a.handleEvent, a);
            } else {
                i(Error("Invalid listener argument"));
            }
        }
        if (b > 2147483647) {
            return -1;
        } else {
            return Kf.setTimeout(a, b || 0);
        }
    }
    function Mf(a, b) {
        this.d = new Ue(this);
        this.Qa(a || n);
        if (b) {
            this.aa = b;
        }
    }
    A(Mf, Xe);
    r = Mf.prototype;
    r.w = n;
    r.ca = o;
    r.$a = -1;
    r.aa = "toggle_display";
    r.o = function () {
        return this.w;
    };
    r.Qa = function (a) {
        if (this.ca) {
            i(Error("Can not change this state of the popup while showing."));
        }
        this.w = a;
    };
    r.isVisible = function () {
        return this.ca;
    };
    r.setVisible = function (a) {
        if (this.A) {
            this.A.stop();
        }
        if (this.n) {
            this.n.stop();
        }
        if (a) {
            if (!this.ca && this.Oa()) {
                if (!this.w) {
                    i(Error("Caller must call setElement before trying to show the popup"));
                }
                this.ta();
                a = H(this.w);
                S(this.d, a, "mousedown", this.Ab, l);
                if (D) {
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
                    S(this.d, a, "mousedown", this.Ab, l);
                    S(this.d, a, "deactivate", this.zb);
                } else {
                    S(this.d, a, "blur", this.zb);
                }
                if (this.aa == "toggle_display") {
                    this.w.style.visibility = "visible";
                    U(this.w, l);
                } else if (this.aa == "move_offscreen") {
                    this.ta();
                }
                this.ca = l;
                if (this.A) {
                    Od(this.A, "end", this.Bb, o, this);
                    this.A.play();
                } else {
                    this.Bb();
                }
            }
        } else {
            Nf(this);
        }
    };
    r.ta = ba;
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
            a.ca = o;
            qa();
            if (a.n) {
                Od(a.n, "end", pa(a.sb, b), o, a);
                a.n.play();
            } else {
                a.sb(b);
            }
        }
    }
    r.sb = function (a) {
        if (this.aa == "toggle_display") {
            this.Rb();
        } else if (this.aa == "move_offscreen") {
            this.w.style.top = "-10000px";
        }
        this.Ta(a);
    };
    r.Rb = function () {
        this.w.style.visibility = "hidden";
        U(this.w, o);
    };
    r.Oa = function () {
        return this.dispatchEvent("beforeshow");
    };
    r.Bb = function () {
        this.$a = qa();
        this.dispatchEvent("show");
    };
    r.Ta = function (a) {
        this.dispatchEvent({
            type: "hide",
            target: a
        });
    };
    r.Ab = function (a) {
        a = a.target;
        if (!Ob(this.w, a) && !(qa() - this.$a < 150)) {
            Nf(this, a);
        }
    };
    r.zb = function (a) {
        var b = H(this.w);
        if (D || eb) {
            a = b.activeElement;
            if (!a || Ob(this.w, a) || a.tagName == "BODY") {
                return;
            }
        } else if (a.target != b) {
            return;
        }
        if (!(qa() - this.$a < 150)) {
            Nf(this);
        }
    };
    function Of(a, b) {
        this.N = b || k;
        Mf.call(this, a);
    }
    A(Of, Mf);
    Of.prototype.ta = function () {
        if (this.N) {
            var a = !this.isVisible() && this.aa != "move_offscreen";
            var b = this.o();
            if (a) {
                b.style.visibility = "hidden";
                U(b, l);
            }
            this.N.a(b, 4, this.qa);
            if (a) {
                U(b, o);
            }
        }
    };
    function Pf(a, b, c) {
        this.K = c || (a ? Bb(Db(a)) : Bb());
        Of.call(
            this,
            this.K.b("div", {
                style: "position:absolute;display:none;"
            })
        );
        this.H = new C(1, 1);
        this.j = new Ic();
        if (a) {
            c = a = Db(a);
            Xb(this.j.a, Jc(c), c);
            N(a, "mouseover", this.Kb, o, this);
            N(a, "mouseout", this.qb, o, this);
            N(a, "mousemove", this.Jb, o, this);
            N(a, "focus", this.Ib, o, this);
            N(a, "blur", this.qb, o, this);
        }
        if (b != n) {
            a = this.o();
            if ("textContent" in a) {
                a.textContent = b;
            } else if (a.firstChild && a.firstChild.nodeType == 3) {
                while (a.lastChild != a.firstChild) {
                    a.removeChild(a.lastChild);
                }
                a.firstChild.data = b;
            } else {
                Mb(a);
                a.appendChild(H(a).createTextNode(b));
            }
        }
    }
    A(Pf, Of);
    var Qf = [];
    r = Pf.prototype;
    r.s = n;
    r.className = "goog-tooltip";
    r.Qa = function (a) {
        var b = this.o();
        if (b) {
            Nb(b);
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
    r.Oa = function () {
        if (!Mf.prototype.Oa.call(this)) {
            return o;
        }
        if (this.a) {
            for (var a, b = 0; (a = Qf[b]); b++) {
                if (!Ob(a.o(), this.a)) {
                    a.setVisible(o);
                }
            }
        }
        if (!Ca(Qf, this)) {
            Qf.push(this);
        }
        a = this.o();
        a.className = this.className;
        Sf(this);
        N(a, "mouseover", this.ub, o, this);
        N(a, "mouseout", this.tb, o, this);
        Tf(this);
        return l;
    };
    r.Ta = function () {
        Da(Qf, this);
        var a = this.o();
        for (var b, c = 0; (b = Qf[c]); c++) {
            if (b.a && Ob(a, b.a)) {
                b.setVisible(o);
            }
        }
        if (this.V) {
            Uf(this.V);
        }
        Pd(a, "mouseover", this.ub, o, this);
        Pd(a, "mouseout", this.tb, o, this);
        this.a = k;
        if (Rf(this) == 0) {
            this.t = o;
        }
        Mf.prototype.Ta.call(this);
    };
    r.rb = function (a, b) {
        if (this.a == a && this.j.contains(this.a)) {
            if (this.t || !this.ra) {
                this.setVisible(o);
                if (!this.isVisible()) {
                    this.a = a;
                    this.N = b || Vf(this, 0) || k;
                    if (this.isVisible()) {
                        this.ta();
                    }
                    this.setVisible(l);
                }
            } else {
                this.a = k;
            }
        }
        this.b = k;
    };
    r.Mb = function (a) {
        this.e = k;
        if (
            a == this.a &&
            (this.s == n || (this.s != this.o() && !this.j.contains(this.s))) &&
            (!this.W || !this.W.s)
        ) {
            this.setVisible(o);
        }
    };
    function Wf(a, b) {
        var c = Sb(a.K);
        a.H.x = b.clientX + c.x;
        a.H.y = b.clientY + c.y;
    }
    r.Kb = function (a) {
        var b = Xf(this, a.target);
        this.s = b;
        Sf(this);
        if (b != this.a) {
            this.a = b;
            if (!this.b) {
                this.b = Lf(x(this.rb, this, b, k), 500);
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
            return n;
        }
    }
    r.Jb = function (a) {
        Wf(this, a);
        this.t = l;
    };
    r.Ib = function (a) {
        this.s = a = Xf(this, a.target);
        this.t = l;
        if (this.a != a) {
            this.a = a;
            var b = Vf(this, 1);
            Sf(this);
            if (!this.b) {
                this.b = Lf(x(this.rb, this, a, b), 500);
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
                if (Ob(b.o(), a.a)) {
                    b.W = a;
                    a.V = b;
                }
            }
        }
    }
    r.qb = function (a) {
        var b = Xf(this, a.target);
        var c = Xf(this, a.relatedTarget);
        if (b != c) {
            if (b == this.s) {
                this.s = n;
            }
            Tf(this);
            this.t = o;
            if (this.isVisible() && (!a.relatedTarget || !Ob(this.o(), a.relatedTarget))) {
                Uf(this);
            } else {
                this.a = k;
            }
        }
    };
    r.ub = function () {
        var a = this.o();
        if (this.s != a) {
            Sf(this);
            this.s = a;
        }
    };
    r.tb = function (a) {
        var b = this.o();
        if (this.s == b && (!a.relatedTarget || !Ob(b, a.relatedTarget))) {
            this.s = n;
            Uf(this);
        }
    };
    function Tf(a) {
        if (a.b) {
            Kf.clearTimeout(a.b);
            a.b = k;
        }
    }
    function Uf(a) {
        if (Rf(a) == 2) {
            a.e = Lf(x(a.Mb, a, a.a), 0);
        }
    }
    function Sf(a) {
        if (a.e) {
            Kf.clearTimeout(a.e);
            a.e = k;
        }
    }
    function Zf(a, b) {
        Jf.call(this, a, b);
    }
    A(Zf, Jf);
    Zf.prototype.a = function (a, b, c) {
        b = of(a);
        b = sf(b);
        c = c ? new hf(c.top + 10, c.right, c.bottom, c.left + 10) : new hf(10, 0, 0, 10);
        if (Gf(this.b, a, 4, c, b, 9) & 496) {
            Gf(this.b, a, 4, c, b, 5);
        }
    };
    function $f(a) {
        If.call(this, a, 3);
    }
    A($f, If);
    $f.prototype.a = function (a, b, c) {
        var d = new C(10, 0);
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
    function V(a, b, c, d, f) {
        function e(a) {
            a.stopPropagation();
            a.preventDefault();
            W(this, "matchanchors");
            this.dispatchEvent(new X("backanchorclick", this, {}));
            a = [];
            a.push(new L("IP_HP_BACK_CLICKED"));
            fg(this, a);
        }
        function g(a) {
            a.stopPropagation();
            a.preventDefault();
            W(this, "inproductanchors");
            this.dispatchEvent(new X("backanchorclick", this, {}));
            a = [];
            a.push(new L("IP_HP_BACK_CLICKED"));
            fg(this, a);
        }
        this.N = [];
        this.jb(a);
        this.ib(b);
        this.kb(c || "");
        this.g = new Ue(this);
        this.N.push(this.g);
        this.Fb = J("div", "help-Helpwidgets-HelpPanel-Title-Spacer");
        this.d = J("div");
        S(this.g, this.d, "click", function () {
            this.sa(!Af(this.J));
        });
        U(this.d, o);
        this.eb = J("div", "help-Helpwidgets-HelpPanel-Expand-Collapse-Container", this.d);
        this.ra = J("div", "help-Helpwidgets-HelpPanel-Title");
        this.ha(eg);
        this.gb = J("div", "help-Helpwidgets-HelpPanel-Title-Section", this.eb, this.ra);
        this.bb = J("div", "help-Helpwidgets-HelpPanel-Loading-Section");
        this.m = J("div", "help-Helpwidgets-HelpPanel-Inproduct-Anchors-Section");
        this.e = J("div", "help-Helpwidgets-HelpPanel-Match-Anchors-Section");
        this.I = J("div", "help-Helpwidgets-HelpPanel-Inproduct-Content-Section");
        this.V = J("div", "help-Helpwidgets-HelpPanel-Match-Content-Section");
        this.J = J(
            "div",
            "help-Helpwidgets-HelpPanel-Expand-Collapse-Section",
            this.bb,
            this.m,
            this.e,
            this.I,
            this.V
        );
        this.qa = J("div", "help-Helpwidgets-HelpPanel-Scroll-Section", this.J);
        this.t = J("div", "help-Helpwidgets-HelpPanel-Lower-Content-Section");
        this.H = J("a", {
            className: gg(),
            href: "#"
        });
        S(this.g, this.H, "click", g);
        this.A = J("a", {
            className: gg(),
            href: "#"
        });
        S(this.g, this.A, "click", g);
        this.Ha = J("a", {
            className: gg(),
            href: "#"
        });
        S(this.g, this.Ha, "click", e);
        this.pa = J("a", {
            className: gg(),
            href: "#"
        });
        S(this.g, this.pa, "click", e);
        this.hb(ag);
        this.W = J("a", {
            className: "help-Helpwidgets-HelpPanel-Help-Center-Anchor",
            href: "#"
        });
        this.Ia(bg);
        S(this.g, this.W, "click", function (a) {
            a.stopPropagation();
            a.preventDefault();
            cd(hd(this.r, this.q, this.h, n, this.ab), this.ga);
            this.dispatchEvent(new X("helpcenteranchorclick", this, {}));
            a = [];
            a.push(new L("IP_HP_HELP_CENTER_CLICKED"));
            fg(this, a);
            hg(this, "IP_HP_HELP_CENTER_CLICKED");
        });
        this.n = J("div", ig(), this.W);
        this.j = J("div", "help-Helpwidgets-HelpPanel-Bottom-Content-Section");
        this.a = J("input", {
            type: "text"
        });
        this.lb(15);
        this.Ka(dg);
        jg(this, o);
        S(this.g, this.a, "blur", function () {
            jg(this, o);
        });
        S(this.g, this.a, "focus", function () {
            jg(this, l);
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
        this.ia = J("input", {
            className: "help-Helpwidgets-HelpPanel-Search-Button",
            type: "button"
        });
        this.Ja(cg);
        S(this.g, this.ia, "click", this.cb);
        this.fb = J("div", "help-Helpwidgets-HelpPanel-Search-Section", this.a, this.ia);
        this.b = d || J("div");
        this.b.className = "help-Helpwidgets-HelpPanel";
        if (this.h && gf.test(this.h)) {
            this.b.setAttribute("dir", "rtl");
            kf(this.b, {
                "text-align": "right"
            });
            this.eb.style[D ? "styleFloat" : "cssFloat"] = "left";
        }
        if (f) {
            f.appendChild(this.b);
        }
        W(this, "none");
        this.sa(l);
        this.b.appendChild(this.Fb);
        this.b.appendChild(this.gb);
        this.b.appendChild(this.qa);
        this.b.appendChild(this.t);
        this.b.appendChild(this.n);
        this.b.appendChild(this.j);
        this.b.appendChild(this.fb);
        S(this.g, window, "resize", this.X);
    }
    A(V, Xe);
    var kg = ["answer_id", "guidedhelp", "inproduct_target", "name", "question"];
    var lg = ["answer", "answer_id", "inproduct", "name", "question"];
    r = V.prototype;
    r.r = "";
    r.q = "";
    r.h = n;
    r.Da = n;
    r.Ba = o;
    r.Ca = o;
    r.O = 10000;
    r.Ra = l;
    r.Ga = 800;
    r.Sa = -1;
    r.yb = l;
    r.Ya = o;
    r.fa = n;
    r.ea = n;
    r.ga = n;
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
        var d = kd(c, b);
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
            Mb(b);
        }
        var d = f || n;
        for (var f = a.Sa, f = f < 0 || f >= c.length ? c.length : f, e = 0; e < f; ++e) {
            var g = c[e];
            if (bd(g)) {
                if (g.inproduct) {
                    var h = J("div", {
                        className: mg(),
                        innerHTML: g.inproduct
                    });
                    S(a.g, h, "click", Te(a.r, a.q, a.h, a.Da, a.Ba, a.Ca));
                    S(a.g, h, "click", dd(a.h));
                    if (a.fa && a.ea != n) {
                        a.fa.Ua(a.ea, h);
                    }
                    b.appendChild(h);
                    if (d) {
                        d.push(new L("IP_HP_INPRODUCT_HTML_VIEWED", g.answerId.toString()));
                    }
                } else {
                    h = J("a", {
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
                    h = J(
                        "div",
                        a.t == b
                            ? "help-Helpwidgets-HelpPanel-Lower-Content-Anchor-Section"
                            : a.j == b
                              ? "help-Helpwidgets-HelpPanel-Bottom-Content-Anchor-Section"
                              : "help-Helpwidgets-HelpPanel-Inproduct-Anchor-Section",
                        h
                    );
                    if (g.inproductTarget) {
                        var j = J("span", {
                            innerHTML: "&nbsp;"
                        });
                        h.appendChild(j);
                        j = J("span", {
                            className: "help-Helpwidgets-HelpPanel-New-Window",
                            innerHTML: "&nbsp;"
                        });
                        h.appendChild(j);
                    } else if (g.guidedHelp) {
                        j = J("span", {
                            innerHTML: "&nbsp;"
                        });
                        h.appendChild(j);
                        j = J("span", {
                            className: "help-Helpwidgets-HelpPanel-Guided-Help-Teaser",
                            innerHTML: "&nbsp;"
                        });
                        h.appendChild(j);
                    }
                    b.appendChild(h);
                }
                if (d) {
                    d.push(new L("IP_HP_ANSWER_LOADED", g.answerId.toString()));
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
                U(a.d, o);
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
            a.push(new L("IP_HP_INPRODUCT_TARGET_CLICKED", c.answerId.toString()));
            fg(this, a);
            hg(this, "IP_HP_INPRODUCT_TARGET_CLICKED", c.answerId.toString());
        });
    }
    function sg(a, b, c) {
        S(a.g, b, "click", function (a) {
            a.stopPropagation();
            a.preventDefault();
            Re(c.answerId, this.r, this.q, this.h, this.Da, this.Ba, this.Ca, n);
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
            Mb(this.I);
            a = J(
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
            Ie(
                c.answerId,
                this.r,
                this.q,
                x(function (a, b) {
                    this.dispatchEvent(
                        new X("answerloadsuccess", this, {
                            answerId: a.answerId,
                            fromCache: b
                        })
                    );
                    if (this.yb) {
                        var c = bd(a);
                        if (c) {
                            c = J("div", {
                                className: "help-Helpwidgets-HelpPanel-Inproduct-Question",
                                innerHTML: c
                            });
                            this.I.appendChild(c);
                        } else {
                            K("Answer " + a.answerId + " has invalid question text: " + c);
                        }
                    }
                    c = J("div", {
                        className: mg(),
                        innerHTML: a.inproduct || a.answerContent || ""
                    });
                    this.I.appendChild(c);
                    S(this.g, c, "click", Te(this.r, this.q, this.h, this.Da, this.Ba, this.Ca));
                    S(this.g, c, "click", dd(this.h));
                    if (this.fa && this.ea != n) {
                        this.fa.Ua(this.ea, c);
                    }
                    c = J(
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
                        c.push(new L("IP_HP_INPRODUCT_HTML_VIEWED", a.answerId.toString()));
                        fg(this, c);
                    }
                    hg(this, "IP_HP_INPRODUCT_HTML_VIEWED", a.answerId.toString());
                }, this),
                this.h,
                lg,
                x(function (a, b) {
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
        Mb(a.e);
        c = c || n;
        if (a.m.firstChild) {
            var d = J(
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
                var g = J("a", {
                    className: "help-Helpwidgets-HelpPanel-Match-Anchor",
                    href: "#",
                    innerHTML: e.title
                });
                if (e.snippet && e.url) {
                    var h = new Pf(g);
                    a.N.push(h);
                    var j = h.o();
                    if (j) {
                        Lb(
                            j,
                            J("div", {
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
                            h.setVisible(o);
                        });
                    }
                }
                vg(a, g, e);
                g = J("div", "help-Helpwidgets-HelpPanel-Match-Anchor-Section", g);
                a.e.appendChild(g);
                if (c) {
                    if (e.answerId) {
                        c.push(new L("IP_HP_ANSWER_LOADED", e.answerId.toString()));
                    } else if (e.topicId) {
                        c.push(new L("IP_HP_TOPIC_LOADED", e.topicId.toString()));
                    }
                }
            } else {
                K("Match has invalid title text: " + e.title);
            }
        }
        if (a.m.firstChild) {
            b = J(
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
            U(a.d, o);
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
            Ie(
                c.answerId,
                a.r,
                a.q,
                x(function (a) {
                    if (a.inproduct) {
                        We(this.g, b, "click", d);
                        tg(this, b, a, this.Ha, this.pa);
                    }
                }, a),
                a.h,
                lg,
                x(function (a, b) {
                    K("Timed out while calling " + b);
                }, a),
                a.O
            );
        } else {
            S(a.g, b, "click", function (a) {
                a.stopPropagation();
                a.preventDefault();
                if (!this.Ya && c.topicId) {
                    this.Ea(c.topicId, l, l);
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
        Ie(
            b,
            a.r,
            a.q,
            x(function (a, g) {
                this.dispatchEvent(
                    new X("answerloadsuccess", this, {
                        answerId: b,
                        fromCache: g
                    })
                );
                if (c) {
                    qg(this, f, [a], c && d, g ? n : []);
                    hg(this, "IP_HP_ANSWER_LOADED", b.toString());
                }
            }, a),
            a.h,
            kg,
            x(function (a, d) {
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
        Le(
            b,
            a.r,
            a.q,
            x(function (a, g) {
                this.dispatchEvent(
                    new X("topicloadsuccess", this, {
                        topicId: b,
                        fromCache: g
                    })
                );
                if (c) {
                    var h = g ? n : [];
                    if (h) {
                        h.push(new L("IP_HP_TOPIC_LOADED", b.toString()));
                    }
                    qg(this, f, a.answersArr, c && d, h);
                    hg(this, "IP_HP_TOPIC_LOADED", b.toString());
                }
            }, a),
            a.h,
            kg,
            x(function (a, d) {
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
        Je(
            b,
            a.r,
            a.q,
            x(function (a, g) {
                this.dispatchEvent(
                    new X("usercontextloadsuccess", this, {
                        userContext: b,
                        fromCache: g
                    })
                );
                if (c) {
                    var h = g ? n : [];
                    if (h) {
                        h.push(new L("IP_HP_USER_CONTEXT_LOADED", b));
                    }
                    qg(this, f, a, c && d, h);
                    hg(this, "IP_HP_USER_CONTEXT_LOADED", b);
                }
            }, a),
            a.h,
            kg,
            x(function (a, d) {
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
    r.Xa = function (a, b) {
        S(this.g, this, a, function (a) {
            b(a);
        });
    };
    r.jb = function (a) {
        this.r = a;
    };
    r.ib = function (a) {
        this.q = a;
    };
    r.kb = function (a) {
        this.h = a;
    };
    r.vc = function (a) {
        this.Da = a;
    };
    r.tc = function (a) {
        this.Ba = a;
    };
    r.uc = function (a) {
        this.Ca = a;
    };
    r.Bc = function (a) {
        U(this.gb, a);
    };
    r.ha = function (a) {
        this.ra.innerHTML = a;
    };
    r.sa = function (a) {
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
    r.hb = function (a) {
        this.H.innerHTML = a;
        this.A.innerHTML = a;
        this.Ha.innerHTML = a;
        this.pa.innerHTML = a;
    };
    r.Wb = function (a) {
        this.t.appendChild(a);
    };
    r.wc = function (a) {
        U(this.n, a);
    };
    r.Ia = function (a) {
        this.W.innerHTML = a;
    };
    r.xb = function (a) {
        this.ga = a;
    };
    r.Vb = function (a) {
        this.j.appendChild(a);
    };
    r.zc = function (a) {
        U(this.fb, a);
    };
    r.lb = function (a) {
        this.a.size = a;
    };
    r.Ka = function (a) {
        this.K = a;
        this.a.value = a;
    };
    r.Ja = function (a) {
        this.ia.value = a;
    };
    r.bc = function () {
        return this.b;
    };
    r.dc = function () {
        return this.a;
    };
    r.cc = function () {
        return this.ia;
    };
    r.Ac = function (a) {
        this.O = a;
    };
    r.X = function () {
        kf(this.qa, "maxHeight", this.Ga + "px");
        var a = Ib(window).height;
        var a = this.Ga > 5 ? Math.min(this.Ga - 5, a) : a;
        var a = Math.min(a, Af(this.J) && (Af(this.I) || Af(this.V)) ? this.J.offsetHeight + 20 : this.J.offsetHeight);
        var a = a + vf(this.qa).y + 20;
        var b = this.A;
        U(b, l);
        U(b, a < vf(b).y);
        b = this.pa;
        U(b, l);
        U(b, a < vf(b).y);
    };
    r.$b = function () {
        S(this.g, window, "scroll", this.X);
    };
    r.Dc = function (a) {
        this.Ra = a;
        U(this.d, a && this.m.firstChild);
    };
    r.yc = function (a) {
        this.Ga = a;
        this.X();
    };
    r.xc = function (a) {
        this.Sa = a;
    };
    r.Fc = function (a) {
        this.yb = a;
    };
    r.Ec = function (a) {
        var b = kg[kg.length - 1] == "inproduct";
        if (a && !b) {
            kg.push("inproduct");
        } else if (!a && b) {
            kg.length -= 1;
        }
    };
    r.oc = function (a) {
        this.Ya = a;
    };
    r.Zb = function (a, b, c) {
        this.ea = a;
        this.fa = new R(b);
        if (c) {
            this.fa.Cb(this.ea, c);
        }
    };
    r.hc = function (a, b, c) {
        wg(this, a, b, c, this.m);
    };
    r.jc = function (a, b, c) {
        wg(this, a, b, c, this.t);
    };
    r.ec = function (a, b, c) {
        wg(this, a, b, c, this.j);
    };
    r.Ea = function (a, b, c) {
        xg(this, a, b, c, this.m);
    };
    r.kc = function (a, b, c) {
        xg(this, a, b, c, this.t);
    };
    r.fc = function (a, b, c) {
        xg(this, a, b, c, this.j);
    };
    r.ic = function (a, b, c) {
        yg(this, a, b, c, this.m);
    };
    r.lc = function (a, b, c) {
        yg(this, a, b, c, this.t);
    };
    r.gc = function (a, b, c) {
        yg(this, a, b, c, this.j);
    };
    r.cb = function () {
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
        this.sa(l);
        Ke(
            a,
            this.r,
            this.q,
            x(function (b, c) {
                this.dispatchEvent(
                    new X("matchesloadsuccess", this, {
                        searchQuery: a,
                        fromCache: c
                    })
                );
                var d = c ? n : [];
                if (!c) {
                    d.push(new L("IP_HP_HELP_QUERY", a));
                }
                ug(this, b, d);
            }, this),
            this.h,
            this.ab,
            x(function (b, c) {
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
    z("hhw.HelpPanel", V);
    V.prototype.addHelpPanelEventListener = V.prototype.Xa;
    V.prototype.setHelpHost = V.prototype.jb;
    V.prototype.setHelpCenterUri = V.prototype.ib;
    V.prototype.setLocaleName = V.prototype.kb;
    V.prototype.setGuidedHelpProduct = V.prototype.vc;
    V.prototype.setGuidedHelpDebug = V.prototype.tc;
    V.prototype.setGuidedHelpDontUseLocal = V.prototype.uc;
    V.prototype.setTitleSectionDisplay = V.prototype.Bc;
    V.prototype.setTitleText = V.prototype.ha;
    V.prototype.expandContent = V.prototype.sa;
    V.prototype.setBackAnchorText = V.prototype.hb;
    V.prototype.addLowerContentSectionElement = V.prototype.Wb;
    V.prototype.setHelpCenterAnchorSectionDisplay = V.prototype.wc;
    V.prototype.setHelpCenterAnchorText = V.prototype.Ia;
    V.prototype.setHelpCenterAnchorWindowOptions = V.prototype.xb;
    V.prototype.addBottomContentSectionElement = V.prototype.Vb;
    V.prototype.setSearchSectionDisplay = V.prototype.zc;
    V.prototype.setSearchTextBoxSize = V.prototype.lb;
    V.prototype.setSearchTextBoxInactiveText = V.prototype.Ka;
    V.prototype.setSearchButtonText = V.prototype.Ja;
    V.prototype.getHelpPanelElement = V.prototype.bc;
    V.prototype.getSearchTextBoxElement = V.prototype.dc;
    V.prototype.getSearchButtonElement = V.prototype.cc;
    V.prototype.setTimeoutMs = V.prototype.Ac;
    V.prototype.updateLayout = V.prototype.X;
    V.prototype.enableUpdateLayoutOnScroll = V.prototype.$b;
    V.prototype.showExpandCollapseElement = V.prototype.Dc;
    V.prototype.setMaxScrollHeight = V.prototype.yc;
    V.prototype.setMaxInproductAnchors = V.prototype.xc;
    V.prototype.showQuestionWithInproductContent = V.prototype.Fc;
    V.prototype.showInproductContentDirectly = V.prototype.Ec;
    V.prototype.openMatchesInNewWindow = V.prototype.oc;
    V.prototype.enableChatSupport = V.prototype.Zb;
    V.prototype.loadByAnswerId = V.prototype.hc;
    V.prototype.loadLowerContentSectionByAnswerId = V.prototype.jc;
    V.prototype.loadBottomContentSectionByAnswerId = V.prototype.ec;
    V.prototype.loadByTopicId = V.prototype.Ea;
    V.prototype.loadLowerContentSectionByTopicId = V.prototype.kc;
    V.prototype.loadBottomContentSectionByTopicId = V.prototype.fc;
    V.prototype.loadByUserContext = V.prototype.ic;
    V.prototype.loadLowerContentSectionByUserContext = V.prototype.lc;
    V.prototype.loadBottomContentSectionByUserContext = V.prototype.gc;
    V.prototype.doSearch = V.prototype.cb;
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
    var Bg = aa("yt.dom.getNextId_");
    if (!Bg) {
        Bg = function () {
            return ++Cg;
        };
        z("yt.dom.getNextId_", Bg);
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
                    b = n;
                }
            } else if (this.type == "mouseover") {
                b = a.fromElement;
            } else if (this.type == "mouseout") {
                b = a.toElement;
            }
            this.relatedTarget = b;
            this.clientX = a.clientX != k ? a.clientX : a.pageX;
            this.clientY = a.clientY != k ? a.clientY : a.pageY;
            if (document.body && document.documentElement) {
                b = document.body.scrollLeft + document.documentElement.scrollLeft;
                var d = document.body.scrollTop + document.documentElement.scrollTop;
                this.pageX = a.pageX != k ? a.pageX : a.clientX + b;
                this.pageY = a.pageY != k ? a.pageY : a.clientY + d;
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
    r = Dg.prototype;
    r.U = n;
    r.type = "";
    r.target = n;
    r.relatedTarget = n;
    r.currentTarget = n;
    r.data = n;
    r.keyCode = 0;
    r.charCode = 0;
    r.altKey = o;
    r.ctrlKey = o;
    r.shiftKey = o;
    r.clientX = 0;
    r.clientY = 0;
    r.pageX = 0;
    r.pageY = 0;
    r.wheelDeltaX = 0;
    r.wheelDeltaY = 0;
    r.preventDefault = function () {
        this.U.returnValue = o;
        if (this.U.preventDefault) {
            this.U.preventDefault();
        }
    };
    r.stopPropagation = function () {
        this.U.cancelBubble = l;
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
    var Fg = aa("yt.events.listeners_") || {};
    z("yt.events.listeners_", Fg);
    var Gg = aa("yt.events.counter_") || {
        count: 0
    };
    z("yt.events.counter_", Gg);
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
            for (e in Fg) {
                if (d.call(k, Fg[e])) {
                    break a;
                }
            }
            e = k;
        }
        if (e) {
            return e;
        }
        e = ++Gg.count + "";
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
        Fg[e] = [a, b, c, g, f];
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
        if ((a = Db(a)) && a.style) {
            U(a, b);
            Ab(a, "hid", !b);
        }
    }
    function Ig(a) {
        za(arguments, function (a) {
            Hg(a, l);
        });
    }
    function Jg(a) {
        za(arguments, function (a) {
            Hg(a, o);
        });
    }
    var Kg = (window.yt && window.yt.config_) || {};
    z("yt.config_", Kg);
    z("yt.tokens_", (window.yt && window.yt.tokens_) || {});
    z("yt.globals_", (window.yt && window.yt.globals_) || {});
    var Lg = (window.yt && window.yt.msgs_) || {};
    z("yt.msgs_", Lg);
    var Mg = (window.yt && window.yt.timeouts_) || [];
    z("yt.timeouts_", Mg);
    z("yt.intervals_", (window.yt && window.yt.intervals_) || []);
    y = function (a, b) {
        var c = b || {};
        var d = a in Lg ? Lg[a] : a;
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
    var Sg = "ontouchstart" in document;
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
                return Ca(vb(a), b);
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
    Y(document, "blur", Z, l);
    Y(document, "change", Z, l);
    Y(document, "click", Z);
    Y(document, "focus", Z, l);
    Y(document, "mouseover", Z);
    Y(document, "mouseout", Z);
    Y(document, "mousedown", Z);
    Y(document, "keydown", Z);
    Y(document, "keyup", Z);
    Y(document, "keypress", Z);
    Y(document, "cut", Z);
    Y(document, "paste", Z);
    if (Sg) {
        Y(document, "touchstart", Z);
        Y(document, "touchend", Z);
        Y(document, "touchcancel", Z);
    }
    z("yt.uix.widgets_", (window.yt && window.yt.uix && window.yt.uix.widgets_) || {});
    function Ug() {}
    Ug.prototype.e = function (a, b, c) {
        var d = zg(a, b);
        if (d && (d = aa(d))) {
            var f = Ia(arguments, 2);
            Ha(f, 0, 0, a);
            d.apply(n, f);
        }
    };
    function $(a, b) {
        return "yt-uix" + (a.d ? "-" + a.d : "") + (b ? "-" + b : "");
    }
    function Vg() {}
    A(Vg, Ug);
    Vg.prototype.b = function (a) {
        var b = Pb(a, $(this));
        if (b) {
            wb(b, $(this, "active"));
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
                var m = uf(document.body);
                var p = uf(a);
                if (m != p) {
                    j ^= 2;
                }
                var q;
                if (d) {
                    p = a.offsetHeight / 2 - 12;
                    q = new C(-12, a.offsetHeight + 6);
                } else {
                    p = a.offsetWidth / 2 - 6;
                    q = new C(a.offsetWidth + 6, -12);
                }
                var v = yf(c);
                var p = Math.min(p, (d ? v.height : v.width) - 24 - 6);
                if (p < 6) {
                    p = 6;
                    if (d) {
                        q.y += 12 - a.offsetHeight / 2;
                    } else {
                        q.x += 12 - a.offsetWidth / 2;
                    }
                }
                var t = n;
                if (!e) {
                    t = 10;
                }
                var v = $(this, "card-flip");
                var I = $(this, "card-reverse");
                Ab(c, v, f);
                Ab(c, I, g);
                t = Ff(a, j, c, h, q, n, t);
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
                    Ab(c, v, f);
                    Ab(c, I, g);
                    Ff(a, j, c, h, q);
                }
                e = Eb("yt-uix-card-body-arrow", c);
                h = Eb("yt-uix-card-border-arrow", c);
                d = d ? (g ? "top" : "bottom") : (!m && f) || (m && !f) ? "left" : "right";
                e.setAttribute("style", "");
                h.setAttribute("style", "");
                e.style[d] = p + "px";
                h.style[d] = p + "px";
                var oa = $(this, "card-visible");
                var d = window.setTimeout(function () {
                    Ig(c);
                    wb(c, oa);
                }, 10);
                Mg.push(d);
                this.e(b, "card-action", a);
            }
        }
    };
    function Wg(a, b, c) {
        var d = $(a, "card");
        var f = c.__yt_uid_key;
        if (!f) {
            f = Bg();
            c.__yt_uid_key = f;
        }
        var e = d + f;
        if ((f = Db(e))) {
            return f;
        }
        var g;
        var f = c.cardContentNode;
        if (!f) {
            g = $(a, "content");
            var h = $(a, "card-content");
            var j = (f = Eb(g, c));
            var m = vb(j);
            if (w(g)) {
                Da(m, g);
            } else if (u(g)) {
                m = zb(m, g);
            }
            if (w(h) && !Ca(m, h)) {
                m.push(h);
            } else if (u(h)) {
                xb(m, h);
            }
            j.className = m.join(" ");
            c.cardContentNode = f;
        }
        g = f;
        if (!g) {
            return n;
        }
        f = document.createElement("div");
        f.id = e;
        f.className = d;
        if ((c = zg(c, "card-class"))) {
            wb(f, c);
        }
        c = document.createElement("div");
        c.className = $(a, "card-border");
        b = zg(b, "orientation") || "horizontal";
        d = document.createElement("div");
        d.className = "yt-uix-card-border-arrow yt-uix-card-border-arrow-" + b;
        e = document.createElement("div");
        e.className = $(a, "card-body");
        a = document.createElement("div");
        a.className = "yt-uix-card-body-arrow yt-uix-card-body-arrow-" + b;
        Nb(g);
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
        var b = Pb(a, $(this));
        Yg(this);
        if (zg(b, "click-outside-closes")) {
            this.a = a;
            this.j = Y(document, "click", x(this.n, this));
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
            var c = Pb(b, $(a));
            if (c && (b = Wg(a, b, c))) {
                yb(c, $(a, "active"));
                yb(b, $(a, "card-visible"));
                Jg(b);
                b.cardTargetNode = n;
                b.cardRootNode = n;
            }
            a.a = n;
            a = a.j;
            if (typeof a == "string") {
                a = [a];
            }
            za(a, function (a) {
                if (a in Fg) {
                    var b = Fg[a];
                    var c = b[0];
                    var g = b[1];
                    var h = b[3];
                    var b = b[4];
                    if (c.removeEventListener) {
                        c.removeEventListener(g, h, b);
                    } else {
                        c.detachEvent("on" + g, h);
                    }
                    delete Fg[a];
                }
            });
        }
    }
    var Zg;
    var $g;
    var ah;
    var bh;
    function ch() {
        yb(Db("help-button"), "yt-uix-button-active");
        kd(bh, [new L("IP_HP_CLOSED")]);
        Zg.Ea($g, l, l);
    }
    z("yt.www.help.init", function (a, b, c, d, f, e, g, h) {
        if (!Zg) {
            var j = (Zg = new V(b, c, d));
            j.Ea(a, l, l);
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
            a = Db("help-target");
            f = Eb("loading-spinner", a);
            Jg(f);
            j = j.b;
            f = Db("help-button");
            e = Xg.getInstance();
            Db("help-target").appendChild(j);
            e.b(f);
            a = Pb(a, "yt-uix-clickcard-card");
            wb(a, "iph-clickcard");
            j = Eb("help-Helpwidgets-HelpPanel-Expand-Collapse-Container", j);
            a = J(
                "div",
                {
                    className: "yt-uix-clickcard-close"
                },
                ""
            );
            Y(a, "click", ch);
            if ((f = j.parentNode)) {
                f.replaceChild(a, j);
            }
            bh = id(b, c, d);
        }
    });
    z("yt.www.help.onButtonClick", function () {
        var a = Db("help-button");
        if (Ca(vb(a), "yt-uix-button-active")) {
            ch();
        } else {
            wb(a, "yt-uix-button-active");
            var b = zg(a, "iph-tracking") || "";
            kd(bh, [new L("IP_HP_OPENED")]);
            a: if ("EVENTS_TRACKER_INSTALLED" in Kg && Kg.EVENTS_TRACKER_INSTALLED) {
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
                    c._trackEvent("null", k, k);
                });
            }
            a = "a=" + b + "".replace(/\//g, "&");
            Qg("/gen_204?" + a);
        }
    });
    z("yt.www.help.onClose_", ch);
})();
