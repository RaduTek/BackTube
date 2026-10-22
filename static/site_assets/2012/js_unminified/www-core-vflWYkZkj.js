(function () {
    function h(a) {
        throw a;
    }
    var i = undefined;
    var k = true;
    var l = null;
    var m = false;
    var n;
    var p = this;
    var q = function (a) {
        for (var a = a.split("."), b = p, c; (c = a.shift());) {
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
            return a.Mi || (a.Mi = new a());
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
    var da = function (a) {
        return ba(a) == "array";
    };
    var ea = function (a) {
        var b = ba(a);
        return b == "array" || (b == "object" && typeof a.length == "number");
    };
    var fa = function (a) {
        return typeof a == "string";
    };
    var ga = function (a) {
        var b = typeof a;
        return (b == "object" && a != l) || b == "function";
    };
    var ja = function (a) {
        return a[ha] || (a[ha] = ++ia);
    };
    var ha = "closure_uid_" + Math.floor(Math.random() * 2147483648).toString(36);
    var ia = 0;
    var la = function (a, b, c) {
        return a.call.apply(a.bind, arguments);
    };
    var ma = function (a, b, c) {
        if (!a) {
            h(Error());
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
    var r = function (a, b, c) {
        r = Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? la : ma;
        return r.apply(l, arguments);
    };
    var na = function (a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function () {
            var b = Array.prototype.slice.call(arguments);
            b.unshift.apply(b, c);
            return a.apply(this, b);
        };
    };
    var oa =
        Date.now ||
        function () {
            return +new Date();
        };
    var s = function (a, b) {
        var c = a.split(".");
        var d = p;
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
    var t = function (a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.Ue = b.prototype;
        a.prototype = new c();
    };
    Function.prototype.bind =
        Function.prototype.bind ||
        function (a, b) {
            if (arguments.length > 1) {
                var c = Array.prototype.slice.call(arguments, 1);
                c.unshift(this, a);
                return r.apply(l, c);
            }
            return r(this, a);
        };
    var pa = function (a) {
        this.stack = Error().stack || "";
        if (a) {
            this.message = "" + a;
        }
    };
    t(pa, Error);
    pa.prototype.name = "CustomError";
    var qa = function (a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = ("" + arguments[c]).replace(/\$/g, "$$$$");
            var a = a.replace(/\%s/, d);
        }
        return a;
    };
    var ra = function (a) {
        return /^[\s\xa0]*$/.test(a);
    };
    var sa = function (a) {
        return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
    };
    var ta = /^[a-zA-Z0-9\-_.!~*'()]*$/;
    var ua = function (a) {
        a = "" + a;
        if (!ta.test(a)) {
            return encodeURIComponent(a);
        } else {
            return a;
        }
    };
    var Aa = function (a) {
        if (!va.test(a)) {
            return a;
        }
        if (a.indexOf("&") != -1) {
            a = a.replace(wa, "&amp;");
        }
        if (a.indexOf("<") != -1) {
            a = a.replace(xa, "&lt;");
        }
        if (a.indexOf(">") != -1) {
            a = a.replace(ya, "&gt;");
        }
        if (a.indexOf('"') != -1) {
            a = a.replace(za, "&quot;");
        }
        return a;
    };
    var wa = /&/g;
    var xa = /</g;
    var ya = />/g;
    var za = /\"/g;
    var va = /[&<>\"]/;
    var Da = function (a) {
        if (a.indexOf("&") != -1) {
            if ("document" in p) {
                return Ba(a);
            } else {
                return Ca(a);
            }
        } else {
            return a;
        }
    };
    var Ba = function (a) {
        var b = {
            "&amp;": "&",
            "&lt;": "<",
            "&gt;": ">",
            "&quot;": '"'
        };
        var c = document.createElement("div");
        return a.replace(Ea, function (a, e) {
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
    var Ca = function (a) {
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
    var Ea = /&([^;\s<&]+);?/g;
    var Fa = function (a, b) {
        if (a.length > b) {
            a = a.substring(0, b - 3) + "...";
        }
        return a;
    };
    var Ga = {
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
    var Ha = {
        "'": "\\'"
    };
    var Ia = function (a) {
        var b = [];
        for (var c = 0; c < a.length; c++) {
            var d = b;
            var e = c;
            var f;
            f = a.charAt(c);
            if (f in Ha) {
                f = Ha[f];
            } else if (f in Ga) {
                f = Ha[f] = Ga[f];
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
                f = Ha[f] = g;
            }
            d[e] = f;
        }
        return b.join("");
    };
    var Ja = function (a, b) {
        for (
            var c = 0, d = sa("" + a).split("."), e = sa("" + b).split("."), f = Math.max(d.length, e.length), g = 0;
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
    var Ka = function (a) {
        var b = 0;
        for (var c = 0; c < a.length; ++c) {
            b = b * 31 + a.charCodeAt(c);
            b %= 4294967296;
        }
        return b;
    };
    var La = {};
    var Ma = function (a) {
        return (
            La[a] ||
            (La[a] = ("" + a).replace(/\-([a-z])/g, function (a, c) {
                return c.toUpperCase();
            }))
        );
    };
    var Na = function (a, b) {
        b.unshift(a);
        pa.call(this, qa.apply(l, b));
        b.shift();
    };
    t(Na, pa);
    Na.prototype.name = "AssertionError";
    var Oa = function (a, b, c, d) {
        var e = "Assertion failed";
        if (c) {
            var e = e + (": " + c);
            var f = d;
        } else if (a) {
            e += ": " + a;
            f = b;
        }
        h(new Na("" + e, f || []));
    };
    var Pa = function (a, b, c) {
        if (!a) {
            Oa("", l, b, Array.prototype.slice.call(arguments, 2));
        }
    };
    var Qa = function (a, b) {
        h(new Na("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1)));
    };
    var Ra = function (a, b, c) {
        if (!fa(a)) {
            Oa("Expected string but got %s: %s.", [ba(a), a], b, Array.prototype.slice.call(arguments, 2));
        }
        return a;
    };
    var Sa = Array.prototype;
    var Ta = Sa.indexOf
        ? function (a, b, c) {
              Pa(a.length != l);
              return Sa.indexOf.call(a, b, c);
          }
        : function (a, b, c) {
              c = c == l ? 0 : c < 0 ? Math.max(0, a.length + c) : c;
              if (fa(a)) {
                  if (!fa(b) || b.length != 1) {
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
    var u = Sa.forEach
        ? function (a, b, c) {
              Pa(a.length != l);
              Sa.forEach.call(a, b, c);
          }
        : function (a, b, c) {
              for (var d = a.length, e = fa(a) ? a.split("") : a, f = 0; f < d; f++) {
                  if (f in e) {
                      b.call(c, e[f], f, a);
                  }
              }
          };
    var Ua = Sa.filter
        ? function (a, b, c) {
              Pa(a.length != l);
              return Sa.filter.call(a, b, c);
          }
        : function (a, b, c) {
              for (var d = a.length, e = [], f = 0, g = fa(a) ? a.split("") : a, j = 0; j < d; j++) {
                  if (j in g) {
                      var o = g[j];
                      if (b.call(c, o, j, a)) {
                          e[f++] = o;
                      }
                  }
              }
              return e;
          };
    var Va = Sa.map
        ? function (a, b, c) {
              Pa(a.length != l);
              return Sa.map.call(a, b, c);
          }
        : function (a, b, c) {
              for (var d = a.length, e = Array(d), f = fa(a) ? a.split("") : a, g = 0; g < d; g++) {
                  if (g in f) {
                      e[g] = b.call(c, f[g], g, a);
                  }
              }
              return e;
          };
    var Wa = Sa.some
        ? function (a, b, c) {
              Pa(a.length != l);
              return Sa.some.call(a, b, c);
          }
        : function (a, b, c) {
              for (var d = a.length, e = fa(a) ? a.split("") : a, f = 0; f < d; f++) {
                  if (f in e && b.call(c, e[f], f, a)) {
                      return k;
                  }
              }
              return m;
          };
    var Za = function (a, b) {
        var c = Xa(a, b, i);
        if (c < 0) {
            return l;
        } else if (fa(a)) {
            return a.charAt(c);
        } else {
            return a[c];
        }
    };
    var Xa = function (a, b, c) {
        for (var d = a.length, e = fa(a) ? a.split("") : a, f = 0; f < d; f++) {
            if (f in e && b.call(c, e[f], f, a)) {
                return f;
            }
        }
        return -1;
    };
    var $a = function (a, b) {
        var c = fa(a) ? a.split("") : a;
        for (var d = a.length - 1; d >= 0; d--) {
            if (d in c && b.call(i, c[d], d, a)) {
                return d;
            }
        }
        return -1;
    };
    var ab = function (a, b) {
        return Ta(a, b) >= 0;
    };
    var bb = function (a) {
        if (!da(a)) {
            for (var b = a.length - 1; b >= 0; b--) {
                delete a[b];
            }
        }
        a.length = 0;
    };
    var cb = function (a, b) {
        Pa(a.length != l);
        Sa.splice.call(a, b, 1);
    };
    var db = function (a) {
        return Sa.concat.apply(Sa, arguments);
    };
    var eb = function (a) {
        if (da(a)) {
            return db(a);
        }
        var b = [];
        for (var c = 0, d = a.length; c < d; c++) {
            b[c] = a[c];
        }
        return b;
    };
    var fb = function (a) {
        if (da(a)) {
            return db(a);
        } else {
            return eb(a);
        }
    };
    var gb = function (a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            var e;
            if (da(d) || ((e = ea(d)) && d.hasOwnProperty("callee"))) {
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
    var ib = function (a, b, c, d) {
        Pa(a.length != l);
        Sa.splice.apply(a, hb(arguments, 1));
    };
    var hb = function (a, b, c) {
        Pa(a.length != l);
        if (arguments.length <= 2) {
            return Sa.slice.call(a, b);
        } else {
            return Sa.slice.call(a, b, c);
        }
    };
    var kb = function (a, b) {
        Pa(a.length != l);
        Sa.sort.call(a, b || jb);
    };
    var lb = function (a) {
        var b = jb;
        kb(a, function (a, d) {
            return b(a.key, d.key);
        });
    };
    var jb = function (a, b) {
        if (a > b) {
            return 1;
        } else if (a < b) {
            return -1;
        } else {
            return 0;
        }
    };
    var mb;
    var nb = function (a) {
        a = a.className;
        return (fa(a) && a.match(/\S+/g)) || [];
    };
    var v = function (a, b) {
        var c = nb(a);
        var d = hb(arguments, 1);
        var e = c.length + d.length;
        ob(c, d);
        a.className = c.join(" ");
        return c.length == e;
    };
    var w = function (a, b) {
        var c = nb(a);
        var d = hb(arguments, 1);
        var e = pb(c, d);
        a.className = e.join(" ");
        return e.length == c.length - d.length;
    };
    var ob = function (a, b) {
        for (var c = 0; c < b.length; c++) {
            if (!ab(a, b[c])) {
                a.push(b[c]);
            }
        }
    };
    var pb = function (a, b) {
        return Ua(a, function (a) {
            return !ab(b, a);
        });
    };
    var qb = function (a, b, c) {
        for (var d = nb(a), e = m, f = 0; f < d.length; f++) {
            if (d[f] == b) {
                ib(d, f--, 1);
                e = k;
            }
        }
        if (e) {
            d.push(c);
            a.className = d.join(" ");
        }
    };
    var y = function (a, b, c) {
        var d = nb(a);
        if (fa(b)) {
            var e = d;
            var b = Ta(e, b);
            if (b >= 0) {
                cb(e, b);
            }
        } else if (da(b)) {
            d = pb(d, b);
        }
        if (fa(c) && !ab(d, c)) {
            d.push(c);
        } else if (da(c)) {
            ob(d, c);
        }
        a.className = d.join(" ");
    };
    var z = function (a, b) {
        return ab(nb(a), b);
    };
    var A = function (a, b, c) {
        if (c) {
            v(a, b);
        } else {
            w(a, b);
        }
    };
    var rb = function (a, b) {
        var c = !z(a, b);
        A(a, b, c);
        return c;
    };
    var B = function (a, b) {
        this.x = ca(a) ? a : 0;
        this.y = ca(b) ? b : 0;
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
        for (var c in a) {
            b.call(i, a[c], c, a);
        }
    };
    var vb = function (a) {
        for (var b in a) {
            return a[b];
        }
    };
    var wb = function (a) {
        var b = [];
        var c = 0;
        var d;
        for (d in a) {
            b[c++] = d;
        }
        return b;
    };
    var xb = function (a, b, c) {
        for (var d in a) {
            if (b.call(c, a[d], d, a)) {
                return d;
            }
        }
    };
    var yb = function (a, b) {
        var c = xb(a, b, i);
        return c && a[c];
    };
    var zb = function (a) {
        var b = {};
        var c;
        for (c in a) {
            b[c] = a[c];
        }
        return b;
    };
    var Ab = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
    var Bb = function (a, b) {
        var c;
        var d;
        for (var e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d) {
                a[c] = d[c];
            }
            for (var f = 0; f < Ab.length; f++) {
                c = Ab[f];
                if (Object.prototype.hasOwnProperty.call(d, c)) {
                    a[c] = d[c];
                }
            }
        }
    };
    var Cb;
    var Db;
    var Eb;
    var Fb;
    var Gb;
    var Hb;
    var Ib;
    var Jb = function () {
        if (p.navigator) {
            return p.navigator.userAgent;
        } else {
            return l;
        }
    };
    var Kb = function () {
        return p.navigator;
    };
    Gb = Fb = Eb = Db = Cb = m;
    var Lb;
    if ((Lb = Jb())) {
        var Mb = Kb();
        Cb = Lb.indexOf("Opera") == 0;
        Db = !Cb && Lb.indexOf("MSIE") != -1;
        Fb = (Eb = !Cb && Lb.indexOf("WebKit") != -1) && Lb.indexOf("Mobile") != -1;
        Gb = !Cb && !Eb && Mb.product == "Gecko";
    }
    var Nb = Cb;
    var D = Db;
    var Ob = Gb;
    var Pb = Eb;
    var Qb = Fb;
    var Rb = Kb();
    var Sb = (Rb && Rb.platform) || "";
    Hb = Sb.indexOf("Mac") != -1;
    Ib = Sb.indexOf("Win") != -1;
    var Tb = !!Kb() && (Kb().appVersion || "").indexOf("X11") != -1;
    var Ub;
    a: {
        var Vb = "";
        var Wb;
        if (Nb && p.opera) {
            var Xb = p.opera.version;
            var Vb = typeof Xb == "function" ? Xb() : Xb;
        } else {
            if (Ob) {
                Wb = /rv\:([^\);]+)(\)|;)/;
            } else if (D) {
                Wb = /MSIE\s+([^\);]+)(\)|;)/;
            } else if (Pb) {
                Wb = /WebKit\/(\S+)/;
            }
            if (Wb) {
                var Yb = Wb.exec(Jb());
                var Vb = Yb ? Yb[1] : "";
            }
        }
        if (D) {
            var Zb;
            var $b = p.document;
            Zb = $b ? $b.documentMode : i;
            if (Zb > parseFloat(Vb)) {
                Ub = "" + Zb;
                break a;
            }
        }
        Ub = Vb;
    }
    var ac = Ub;
    var bc = {};
    var E = function (a) {
        return bc[a] || (bc[a] = Ja(ac, a) >= 0);
    };
    var cc = {};
    var dc = function (a) {
        return cc[a] || (cc[a] = D && !!document.documentMode && document.documentMode >= a);
    };
    var ec = !D || dc(9);
    if ((!!Ob || !!D) && (!D || !dc(9))) {
        if (Ob) {
            E("1.9.1");
        }
    }
    var fc = D && !E("9");
    var ic = function (a) {
        if (a) {
            return new gc(hc(a));
        } else {
            return mb || (mb = new gc());
        }
    };
    var G = function (a) {
        if (fa(a)) {
            return document.getElementById(a);
        } else {
            return a;
        }
    };
    var kc = function (a, b) {
        var c = b || document;
        if (jc(c)) {
            return c.querySelectorAll("." + a);
        } else if (c.getElementsByClassName) {
            return c.getElementsByClassName(a);
        } else {
            return H("*", a, b);
        }
    };
    var J = function (a, b) {
        var c = b || document;
        var d = l;
        return (d = jc(c) ? c.querySelector("." + a) : kc(a, b)[0]) || l;
    };
    var jc = function (a) {
        return a.querySelectorAll && a.querySelector && (!Pb || lc(document) || E("528"));
    };
    var H = function (a, b, c) {
        c = c || document;
        a = a && a != "*" ? a.toUpperCase() : "";
        if (jc(c) && (a || b)) {
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
                if (typeof a.split == "function" && ab(a.split(/\s+/), b)) {
                    d[e++] = g;
                }
            }
            d.length = e;
            return d;
        }
        return c;
    };
    var nc = function (a, b) {
        ub(b, function (b, d) {
            if (d == "style") {
                a.style.cssText = b;
            } else if (d == "class") {
                a.className = b;
            } else if (d == "for") {
                a.htmlFor = b;
            } else if (d in mc) {
                a.setAttribute(mc[d], b);
            } else if (d.lastIndexOf("aria-", 0) == 0) {
                a.setAttribute(d, b);
            } else {
                a[d] = b;
            }
        });
    };
    var mc = {
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
    var oc = function (a) {
        var b = a.document;
        if (Pb && !E("500") && !Qb) {
            if (typeof a.innerHeight == "undefined") {
                a = window;
            }
            var b = a.innerHeight;
            var c = a.document.documentElement.scrollHeight;
            if (a == a.top && c < b) {
                b -= 15;
            }
            return new tb(a.innerWidth, b);
        }
        a = lc(b) ? b.documentElement : b.body;
        return new tb(a.clientWidth, a.clientHeight);
    };
    var pc = function () {
        var a = window;
        var b = a.document;
        var c = 0;
        if (b) {
            var a = oc(a).height;
            var c = b.body;
            var d = b.documentElement;
            if (lc(b) && d.scrollHeight) {
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
    var qc = function (a) {
        var b = !Pb && lc(a) ? a.documentElement : a.body;
        var a = a.parentWindow || a.defaultView;
        return new B(a.pageXOffset || b.scrollLeft, a.pageYOffset || b.scrollTop);
    };
    var sc = function (a, b, c) {
        return rc(document, arguments);
    };
    var rc = function (a, b) {
        var c = b[0];
        var d = b[1];
        if (!ec && d && (d.name || d.type)) {
            c = ["<", c];
            if (d.name) {
                c.push(' name="', Aa(d.name), '"');
            }
            if (d.type) {
                c.push(' type="', Aa(d.type), '"');
                var e = {};
                Bb(e, d);
                d = e;
                delete d.type;
            }
            c.push(">");
            c = c.join("");
        }
        c = a.createElement(c);
        if (d) {
            if (fa(d)) {
                c.className = d;
            } else if (da(d)) {
                v.apply(l, [c].concat(d));
            } else {
                nc(c, d);
            }
        }
        if (b.length > 2) {
            tc(a, c, b, 2);
        }
        return c;
    };
    var tc = function (a, b, c, d) {
        function e(c) {
            if (c) {
                b.appendChild(fa(c) ? a.createTextNode(c) : c);
            }
        }
        for (; d < c.length; d++) {
            var f = c[d];
            if (ea(f) && (!ga(f) || !(f.nodeType > 0))) {
                u(uc(f) ? eb(f) : f, e);
            } else {
                e(f);
            }
        }
    };
    var vc = function (a) {
        return document.createTextNode(a);
    };
    var wc = function (a) {
        var b = document;
        var c = b.createElement("div");
        if (D) {
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
    var lc = function (a) {
        return a.compatMode == "CSS1Compat";
    };
    var xc = function (a, b) {
        tc(hc(a), a, arguments, 1);
    };
    var yc = function (a) {
        for (var b; (b = a.firstChild);) {
            a.removeChild(b);
        }
    };
    var zc = function (a) {
        if (a && a.parentNode) {
            a.parentNode.removeChild(a);
        }
    };
    var Bc = function (a) {
        if (a.firstElementChild != i) {
            return a.firstElementChild;
        } else {
            return Ac(a.firstChild);
        }
    };
    var Ac = function (a) {
        while (a && a.nodeType != 1) {
            a = a.nextSibling;
        }
        return a;
    };
    var Cc = function (a, b) {
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
    var hc = function (a) {
        if (a.nodeType == 9) {
            return a;
        } else {
            return a.ownerDocument || a.document;
        }
    };
    var Dc = function (a, b) {
        if ("textContent" in a) {
            a.textContent = b;
        } else if (a.firstChild && a.firstChild.nodeType == 3) {
            while (a.lastChild != a.firstChild) {
                a.removeChild(a.lastChild);
            }
            a.firstChild.data = b;
        } else {
            yc(a);
            a.appendChild(hc(a).createTextNode(b));
        }
    };
    var Fc = function (a, b) {
        var c = [];
        if (Ec(a, b, c, k)) {
            return c[0];
        } else {
            return i;
        }
    };
    var Ec = function (a, b, c, d) {
        if (a != l) {
            for (a = a.firstChild; a;) {
                if ((b(a) && (c.push(a), d)) || Ec(a, b, c, d)) {
                    return k;
                }
                a = a.nextSibling;
            }
        }
        return m;
    };
    var Gc = {
        SCRIPT: 1,
        STYLE: 1,
        HEAD: 1,
        IFRAME: 1,
        OBJECT: 1
    };
    var Hc = {
        IMG: " ",
        BR: "\n"
    };
    var Jc = function (a) {
        if (fc && "innerText" in a) {
            a = a.innerText.replace(/(\r\n|\r|\n)/g, "\n");
        } else {
            var b = [];
            Ic(a, b, k);
            a = b.join("");
        }
        a = a.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
        a = a.replace(/\u200B/g, "");
        if (!fc) {
            a = a.replace(/ +/g, " ");
        }
        if (a != " ") {
            a = a.replace(/^\s*/, "");
        }
        return a;
    };
    var Ic = function (a, b, c) {
        if (!(a.nodeName in Gc)) {
            if (a.nodeType == 3) {
                if (c) {
                    b.push(("" + a.nodeValue).replace(/(\r\n|\r|\n)/g, ""));
                } else {
                    b.push(a.nodeValue);
                }
            } else if (a.nodeName in Hc) {
                b.push(Hc[a.nodeName]);
            } else {
                for (a = a.firstChild; a;) {
                    Ic(a, b, c);
                    a = a.nextSibling;
                }
            }
        }
    };
    var uc = function (a) {
        if (a && typeof a.length == "number") {
            if (ga(a)) {
                return typeof a.item == "function" || typeof a.item == "string";
            }
            if (ba(a) == "function") {
                return typeof a.item == "function";
            }
        }
        return m;
    };
    var K = function (a, b, c) {
        var d = b ? b.toUpperCase() : l;
        return Kc(
            a,
            function (a) {
                return (!d || a.nodeName == d) && (!c || z(a, c));
            },
            k
        );
    };
    var Kc = function (a, b, c, d) {
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
    var gc = function (a) {
        this.z = a || p.document || document;
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
    };
    var Mc = function (a) {
        return qc(a.z);
    };
    gc.prototype.appendChild = function (a, b) {
        a.appendChild(b);
    };
    gc.prototype.append = xc;
    gc.prototype.contains = Cc;
    var Nc = "StopIteration" in p ? p.StopIteration : Error("StopIteration");
    var Oc = function () {};
    Oc.prototype.next = function () {
        h(Nc);
    };
    Oc.prototype.fb = function () {
        return this;
    };
    var Pc = function (a) {
        if (a instanceof Oc) {
            return a;
        }
        if (typeof a.fb == "function") {
            return a.fb(m);
        }
        if (ea(a)) {
            var b = 0;
            var c = new Oc();
            c.next = function () {
                while (true) {
                    if (b >= a.length) {
                        h(Nc);
                    }
                    if (b in a) {
                        return a[b++];
                    }
                    b++;
                }
            };
            return c;
        }
        h(Error("Not implemented"));
    };
    var Qc = function (a, b) {
        if (ea(a)) {
            try {
                u(a, b, i);
            } catch (c) {
                if (c !== Nc) {
                    h(c);
                }
            }
        } else {
            a = Pc(a);
            try {
                while (true) {
                    b.call(i, a.next(), i, a);
                }
            } catch (d) {
                if (d !== Nc) {
                    h(d);
                }
            }
        }
    };
    var Rc = function (a) {
        if (ea(a)) {
            return fb(a);
        }
        var a = Pc(a);
        var b = [];
        Qc(a, function (a) {
            b.push(a);
        });
        return b;
    };
    var Sc = function (a, b) {
        this.U = {};
        this.C = [];
        var c = arguments.length;
        if (c > 1) {
            if (c % 2) {
                h(Error("Uneven number of arguments"));
            }
            for (var d = 0; d < c; d += 2) {
                this.set(arguments[d], arguments[d + 1]);
            }
        } else if (a) {
            if (a instanceof Sc) {
                c = a.Ve();
                d = a.We();
            } else {
                var c = wb(a);
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
    n = Sc.prototype;
    n.La = 0;
    n.Gb = 0;
    n.N = function () {
        return this.La;
    };
    n.We = function () {
        Tc(this);
        var a = [];
        for (var b = 0; b < this.C.length; b++) {
            a.push(this.U[this.C[b]]);
        }
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
        if (Uc(this.U, a)) {
            delete this.U[a];
            this.La--;
            this.Gb++;
            if (this.C.length > this.La * 2) {
                Tc(this);
            }
            return k;
        } else {
            return m;
        }
    };
    var Tc = function (a) {
        if (a.La != a.C.length) {
            for (var b = 0, c = 0; b < a.C.length;) {
                var d = a.C[b];
                if (Uc(a.U, d)) {
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
                if (!Uc(e, d)) {
                    a.C[c++] = d;
                    e[d] = 1;
                }
                b++;
            }
            a.C.length = c;
        }
    };
    Sc.prototype.get = function (a, b) {
        if (Uc(this.U, a)) {
            return this.U[a];
        } else {
            return b;
        }
    };
    Sc.prototype.set = function (a, b) {
        if (!Uc(this.U, a)) {
            this.La++;
            this.C.push(a);
            this.Gb++;
        }
        this.U[a] = b;
    };
    Sc.prototype.Qa = function () {
        return new Sc(this);
    };
    var Vc = function (a) {
        Tc(a);
        var b = {};
        for (var c = 0; c < a.C.length; c++) {
            var d = a.C[c];
            b[d] = a.U[d];
        }
        return b;
    };
    Sc.prototype.fb = function (a) {
        Tc(this);
        var b = 0;
        var c = this.C;
        var d = this.U;
        var e = this.Gb;
        var f = this;
        var g = new Oc();
        g.next = function () {
            while (true) {
                if (e != f.Gb) {
                    h(Error("The map has changed since the iterator was created"));
                }
                if (b >= c.length) {
                    h(Nc);
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
    var Uc = function (a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    };
    var Yc = function (a) {
        var b = new Sc();
        Wc(a, b, Xc);
        return b;
    };
    var $c = function (a) {
        var b = [];
        Wc(a, b, Zc);
        return b.join("&");
    };
    var Wc = function (a, b, c) {
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
                        e = ad(e);
                        if (e != l) {
                            for (var j, o = 0; (j = e[o]); o++) {
                                c(b, g, j);
                            }
                        }
                        break;
                    default:
                        j = ad(e);
                        if (j != l) {
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
    var Xc = function (a, b, c) {
        var d = a.get(b);
        if (!d) {
            d = [];
            a.set(b, d);
        }
        d.push(c);
    };
    var Zc = function (a, b, c) {
        a.push(encodeURIComponent(b) + "=" + encodeURIComponent(c));
    };
    var ad = function (a) {
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
    var bd = function (a) {
        a = a.elements.is_private;
        if (a.type) {
            return ad(a);
        }
        for (var b = 0; b < a.length; b++) {
            var c = ad(a[b]);
            if (c) {
                return c;
            }
        }
        return l;
    };
    var cd = /<[^>]*>|&[^;]+;/g;
    var dd = RegExp("^[^֑-߿יִ-﷿ﹰ-ﻼ]*[A-Za-zÀ-ÖØ-öø-ʸ̀-֐ࠀ-῿Ⰰ-﬜︀-﹯﻽-￿]");
    var ed = RegExp("^[^A-Za-zÀ-ÖØ-öø-ʸ̀-֐ࠀ-῿Ⰰ-﬜︀-﹯﻽-￿]*[֑-߿יִ-﷿ﹰ-ﻼ]");
    var fd = function (a, b) {
        return ed.test(b ? a.replace(cd, " ") : a);
    };
    var gd = (window.yt && window.yt.config_) || {};
    s("yt.config_", gd);
    var hd = (window.yt && window.yt.globals_) || {};
    s("yt.globals_", hd);
    var id = (window.yt && window.yt.msgs_) || {};
    s("yt.msgs_", id);
    var jd = (window.yt && window.yt.timeouts_) || [];
    s("yt.timeouts_", jd);
    var kd = (window.yt && window.yt.intervals_) || [];
    s("yt.intervals_", kd);
    var md = function (a) {
        ld(gd, arguments);
    };
    var L = function (a, b) {
        if (a in gd) {
            return gd[a];
        } else {
            return b;
        }
    };
    var nd = function (a) {
        for (var b = 0, c = arguments.length; b < c; ++b) {
            hd[arguments[b]] = 1;
        }
    };
    var M = function (a, b) {
        var c = window.setTimeout(a, b);
        jd.push(c);
        return c;
    };
    var od = function (a, b) {
        var c = window.setInterval(a, b);
        kd.push(c);
        return c;
    };
    var pd = function (a) {
        window.clearTimeout(a);
    };
    var qd = function (a) {
        window.clearInterval(a);
    };
    var N = function (a, b, c) {
        var d = b || {};
        if ((a = a in id ? id[a] : c)) {
            for (var e in d) {
                a = a.replace(RegExp("\\$" + e, "gi"), function () {
                    return d[e];
                });
            }
        }
        return a;
    };
    var ld = function (a, b) {
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
    var rd = !!eval("/*@cc_on!@*/false");
    var sd = {};
    var td = function (a, b, c, d) {
        if (L("EVENTS_TRACKER_INSTALLED")) {
            var e = sd[a];
            if (!e) {
                var f = window._gaq._getAsyncTracker("eventsPageTracker");
                if (!f) {
                    return;
                }
                window._gaq.push(function () {
                    e = f._createEventTracker(a);
                    sd[a] = e;
                });
            }
            var g = c || i;
            var j = d || i;
            window._gaq.push(function () {
                e._trackEvent(b, g, j);
            });
        }
    };
    var O = function (a, b, c) {
        if (a.dataset) {
            a.dataset[ud(b)] = c;
        } else {
            a.setAttribute("data-" + b, c);
        }
    };
    var P = function (a, b) {
        if (a.dataset) {
            return a.dataset[ud(b)];
        } else {
            return a.getAttribute("data-" + b);
        }
    };
    var vd = function (a, b) {
        if (a.dataset) {
            delete a.dataset[ud(b)];
        } else {
            a.removeAttribute("data-" + b);
        }
    };
    var wd = function (a, b) {
        if (a.dataset) {
            return ud(b) in a.dataset;
        } else if (a.hasAttribute) {
            return !!a.hasAttribute("data-" + b);
        } else {
            return !!a.getAttribute("data-" + b);
        }
    };
    var xd = {};
    var ud = function (a) {
        return (
            xd[a] ||
            (xd[a] = ("" + a).replace(/\-([a-z])/g, function (a, c) {
                return c.toUpperCase();
            }))
        );
    };
    var zd = function (a) {
        var b = a.__yt_uid_key;
        if (!b) {
            b = yd();
            a.__yt_uid_key = b;
        }
        return b;
    };
    var yd = q("yt.dom.getNextId_");
    if (!yd) {
        yd = function () {
            return ++Ad;
        };
        s("yt.dom.getNextId_", yd);
        var Ad = 0;
    }
    var Bd = function (a) {
        var b = a.cloneNode(m);
        if (b.tagName == "TR" || b.tagName == "SELECT") {
            u(a.childNodes, function (a) {
                b.appendChild(Bd(a));
            });
        } else {
            b.innerHTML = a.innerHTML;
        }
        return b;
    };
    var Cd = function (a) {
        a = Bd(G(a));
        a.removeAttribute("id");
        return a;
    };
    var Dd = function (a, b) {
        return K(a, l, b);
    };
    var Ed = function (a, b, c) {
        a = H(a, b, c);
        if (a.length) {
            return a[0];
        } else {
            return l;
        }
    };
    var Fd = function (a, b) {
        if ("disabled" in a) {
            a.disabled = !b;
        }
        if (a.nodeType == 1) {
            A(a, "disabled", !b);
        }
        if (a.hasChildNodes()) {
            for (var c = 0, d; (d = a.childNodes[c]); ++c) {
                Fd(d, b);
            }
        }
    };
    var Hd = function (a) {
        var b = G(a);
        var c = Bd(b);
        a.parentNode.appendChild(c);
        c.style.whiteSpace = "normal";
        c.style.lineHeight = "1.5em";
        var d = P(b, "original-html");
        if (!d) {
            d = b.innerHTML.replace(/^\s+|\s+$/, "");
            O(b, "original-html", d);
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
        var j = Gd(c);
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
        zc(c);
        return g(C);
    };
    var Gd = function (a) {
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
    var Id = function () {
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
    var Jd = function (a) {
        if ((a = a || q("window.event"))) {
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
            this.Ra = a;
        }
    };
    n = Jd.prototype;
    n.type = "";
    n.target = l;
    n.relatedTarget = l;
    n.currentTarget = l;
    n.data = l;
    n.source = l;
    n.origin = l;
    n.state = l;
    n.keyCode = 0;
    n.charCode = 0;
    n.Ra = l;
    n.clientX = 0;
    n.clientY = 0;
    n.pageX = 0;
    n.pageY = 0;
    n.touches = l;
    n.changedTouches = l;
    n.preventDefault = function () {
        this.Ra.returnValue = m;
        if (this.Ra.preventDefault) {
            this.Ra.preventDefault();
        }
    };
    n.stopPropagation = function () {
        this.Ra.cancelBubble = k;
        if (this.Ra.stopPropagation) {
            this.Ra.stopPropagation();
        }
    };
    var Kd = q("yt.events.listeners_") || {};
    s("yt.events.listeners_", Kd);
    var Ld = q("yt.events.counter_") || {
        count: 0
    };
    s("yt.events.counter_", Ld);
    var Md = function (a, b, c, d) {
        return xb(Kd, function (e) {
            return e[0] == a && e[1] == b && e[2] == c && e[4] == !!d;
        });
    };
    var Q = function (a, b, c, d) {
        if (!a || (!a.addEventListener && !a.attachEvent)) {
            return "";
        }
        var d = !!d;
        var e = Md(a, b, c, d);
        if (e) {
            return e;
        }
        var e = ++Ld.count + "";
        var f = function (b) {
            b = new Jd(b);
            b.currentTarget = a;
            return c.call(a, b);
        };
        Kd[e] = [a, b, c, f, d];
        if (a.addEventListener) {
            a.addEventListener(b, f, d);
        } else {
            a.attachEvent("on" + b, f);
        }
        return e;
    };
    var Od = function (a, b, c, d) {
        var e;
        e = Q(
            a,
            b,
            function () {
                Nd(e);
                c.apply(a, arguments);
            },
            d
        );
    };
    var Qd = function (a, b) {
        Pd(a, "click", b, function (a) {
            return a.nodeName.toLowerCase() === "li" && k;
        });
    };
    var R = function (a, b, c, d) {
        return Pd(a, b, c, function (a) {
            return z(a, d);
        });
    };
    var Pd = function (a, b, c, d) {
        var e = a || document;
        return Q(e, b, function (a) {
            var b = Kc(
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
    var Rd = function (a, b, c, d) {
        if ((a = Md(a, b, c, !!d))) {
            Nd(a);
        }
    };
    var Nd = function (a) {
        if (typeof a == "string") {
            a = [a];
        }
        u(a, function (a) {
            if (a in Kd) {
                var c = Kd[a];
                var d = c[0];
                var e = c[1];
                var f = c[3];
                var c = c[4];
                if (d.removeEventListener) {
                    d.removeEventListener(e, f, c);
                } else {
                    d.detachEvent("on" + e, f);
                }
                delete Kd[a];
            }
        });
    };
    var Sd = function (a) {
        a = a || window.event;
        a = a.target || a.srcElement;
        if (a.nodeType == 3) {
            a = a.parentNode;
        }
        return a;
    };
    var Td = function (a) {
        a = a || window.event;
        a.cancelBubble = k;
        if (a.stopPropagation) {
            a.stopPropagation();
        }
    };
    var Ud = function (a) {
        a = a || window.event;
        a.returnValue = m;
        if (a.preventDefault) {
            a.preventDefault();
        }
        return m;
    };
    var Vd = function (a) {
        if (document.createEvent) {
            var b = document.createEvent("HTMLEvents");
            b.initEvent("click", k, k);
            a.dispatchEvent(b);
        } else {
            b = document.createEventObject();
            a.fireEvent("onclick", b);
        }
    };
    var Wd = function (a) {
        this.z = a;
    };
    var Xd = /\s*;\s*/;
    n = Wd.prototype;
    n.set = function (a, b, c, d, e, f) {
        if (/[;=\s]/.test(a)) {
            h(Error('Invalid cookie name "' + a + '"'));
        }
        if (/[;\r\n]/.test(b)) {
            h(Error('Invalid cookie value "' + b + '"'));
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
                  : ";expires=" + new Date(oa() + c * 1000).toUTCString();
        this.z.cookie = a + "=" + b + e + d + c + f;
    };
    n.get = function (a, b) {
        var c = a + "=";
        for (var d = (this.z.cookie || "").split(Xd), e = 0, f; (f = d[e]); e++) {
            if (f.indexOf(c) == 0) {
                return f.substr(c.length);
            }
        }
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
        if (!this.z.cookie) {
            return 0;
        } else {
            return (this.z.cookie || "").split(Xd).length;
        }
    };
    n.zf = function (a) {
        return ca(this.get(a));
    };
    n.clear = function () {
        var a = Yd(this).keys;
        for (var b = a.length - 1; b >= 0; b--) {
            this.remove(a[b]);
        }
    };
    var Yd = function (a) {
        for (var a = (a.z.cookie || "").split(Xd), b = [], c = [], d, e, f = 0; (e = a[f]); f++) {
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
    var Zd = new Wd(document);
    Zd.Hk = 3950;
    var $d = function (a, b, c, d, e) {
        Zd.set("" + a, b, c, d || "/", e || "youtube.com");
    };
    var ae = function (a, b) {
        return Zd.get("" + a, b);
    };
    var be = function (a, b, c) {
        return Zd.remove("" + a, b || "/", c || "youtube.com");
    };
    var de = function () {
        var a = ae(this.Af);
        if (a) {
            for (var a = unescape(a).split("&"), b = 0; b < a.length; b++) {
                var c = a[b].split("=");
                var d = c[0];
                if ((c = c[1])) {
                    ce[d] = c.toString();
                }
            }
        }
    };
    aa(de);
    var ce = q("yt.prefs.UserPrefs.prefs_") || {};
    s("yt.prefs.UserPrefs.prefs_", ce);
    de.prototype.Af = "PREF";
    var ee = function (a) {
        if (/^f([1-9][0-9]*)$/.test(a)) {
            h("ExpectedRegexMatch: " + a);
        }
    };
    var fe = function (a) {
        if (!/^\w+$/.test(a)) {
            h("ExpectedRegexMismatch: " + a);
        }
    };
    var ge = function (a) {
        a = ce[a] !== i ? ce[a].toString() : l;
        if (a != l && /^[A-Fa-f0-9]+$/.test(a)) {
            return parseInt(a, 16);
        } else {
            return l;
        }
    };
    de.prototype.get = function (a, b) {
        fe(a);
        ee(a);
        var c = ce[a] !== i ? ce[a].toString() : l;
        if (c != l) {
            return c;
        } else if (b) {
            return b;
        } else {
            return "";
        }
    };
    de.prototype.set = function (a, b) {
        fe(a);
        ee(a);
        if (b == l) {
            h("ExpectedNotNull");
        }
        ce[a] = b.toString();
    };
    var he = function (a, b) {
        return !!((ge("f" + (Math.floor(b / 31) + 1)) || 0) & (1 << (b % 31)));
    };
    var ie = function (a, b) {
        var c = "f" + (Math.floor(a / 31) + 1);
        var d = 1 << (a % 31);
        var e = ge(c) || 0;
        var e = b ? e | d : e & ~d;
        if (e == 0) {
            delete ce[c];
        } else {
            d = e.toString(16);
            ce[c] = d.toString();
        }
    };
    de.prototype.remove = function (a) {
        fe(a);
        ee(a);
        delete ce[a];
    };
    de.prototype.save = function (a) {
        var a = (a || 7) * 86400;
        var b = this.Af;
        var c = [];
        var d;
        for (d in ce) {
            c.push(d + "=" + escape(ce[d]));
        }
        $d(b, c.join("&"), a);
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
        if (!this || !a) {
            return m;
        } else if (a instanceof je) {
            return a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom;
        } else {
            return a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom;
        }
    };
    je.prototype.expand = function (a, b, c, d) {
        if (ga(a)) {
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
        if (a instanceof ke) {
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
    var le = function (a, b, c) {
        a.style[Ma(c)] = b;
    };
    var me = function (a, b) {
        var c = hc(a);
        if (c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(a, l))) {
            return c[b] || c.getPropertyValue(b);
        } else {
            return "";
        }
    };
    var ne = function (a, b) {
        if (a.currentStyle) {
            return a.currentStyle[b];
        } else {
            return l;
        }
    };
    var oe = function (a, b) {
        return me(a, b) || ne(a, b) || (a.style && a.style[b]);
    };
    var pe = function (a) {
        var b = a.getBoundingClientRect();
        if (D) {
            a = a.ownerDocument;
            b.left -= a.documentElement.clientLeft + a.body.clientLeft;
            b.top -= a.documentElement.clientTop + a.body.clientTop;
        }
        return b;
    };
    var qe = function (a) {
        if (D && !dc(8)) {
            return a.offsetParent;
        }
        for (
            var b = hc(a), c = oe(a, "position"), d = c == "fixed" || c == "absolute", a = a.parentNode;
            a && a != b;
            a = a.parentNode
        ) {
            c = oe(a, "position");
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
    var te = function (a) {
        var b = new je(0, Infinity, Infinity, 0);
        var c = ic(a);
        var d = c.z.body;
        var e = c.z.documentElement;
        var f = !Pb && lc(c.z) ? c.z.documentElement : c.z.body;
        for (; (a = qe(a));) {
            if (
                (!D || a.clientWidth != 0) &&
                (!Pb || a.clientHeight != 0 || a != d) &&
                a != d &&
                a != e &&
                oe(a, "overflow") != "visible"
            ) {
                var g = re(a);
                var j;
                j = a;
                if (Ob && !E("1.9")) {
                    var o = parseFloat(me(j, "borderLeftWidth"));
                    if (se(j)) {
                        var x = j.offsetWidth - j.clientWidth - o - parseFloat(me(j, "borderRightWidth"));
                        var o = o + x;
                    }
                    j = new B(o, parseFloat(me(j, "borderTopWidth")));
                } else {
                    j = new B(j.clientLeft, j.clientTop);
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
        c = oc(c.z.parentWindow || c.z.defaultView || window);
        b.right = Math.min(b.right, d + c.width);
        b.bottom = Math.min(b.bottom, f + c.height);
        if (b.top >= 0 && b.left >= 0 && b.bottom > b.top && b.right > b.left) {
            return b;
        } else {
            return l;
        }
    };
    var re = function (a) {
        var b;
        var c = hc(a);
        var d = oe(a, "position");
        var e =
            Ob &&
            c.getBoxObjectFor &&
            !a.getBoundingClientRect &&
            d == "absolute" &&
            (b = c.getBoxObjectFor(a)) &&
            (b.screenX < 0 || b.screenY < 0);
        var f = new B(0, 0);
        var g;
        b = c ? (c.nodeType == 9 ? c : hc(c)) : document;
        g = D && !dc(9) && !Lc(ic(b)) ? b.body : b.documentElement;
        if (a == g) {
            return f;
        }
        if (a.getBoundingClientRect) {
            b = pe(a);
            a = Mc(ic(c));
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
                if (Pb && oe(b, "position") == "fixed") {
                    f.x += c.body.scrollLeft;
                    f.y += c.body.scrollTop;
                    break;
                }
                b = b.offsetParent;
            } while (b && b != a);
            if (Nb || (Pb && d == "absolute")) {
                f.y -= c.body.offsetTop;
            }
            for (b = a; (b = qe(b)) && b != c.body && b != g;) {
                f.x -= b.scrollLeft;
                if (!Nb || b.tagName != "TR") {
                    f.y -= b.scrollTop;
                }
            }
        }
        return f;
    };
    var ue = function (a) {
        var b = new B();
        if (a.nodeType == 1) {
            if (a.getBoundingClientRect) {
                a = pe(a);
                b.x = a.left;
                b.y = a.top;
            } else {
                var c = Mc(ic(a));
                var a = re(a);
                b.x = a.x - c.x;
                b.y = a.y - c.y;
            }
        } else {
            var c = ba(a.Bf) == "function";
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
    var ve = function (a, b) {
        if (typeof a == "number") {
            a = (b ? Math.round(a) : a) + "px";
        }
        return a;
    };
    var xe = function (a) {
        if (oe(a, "display") != "none") {
            return we(a);
        }
        var b = a.style;
        var c = b.display;
        var d = b.visibility;
        var e = b.position;
        b.visibility = "hidden";
        b.position = "absolute";
        b.display = "inline";
        a = we(a);
        b.display = c;
        b.position = e;
        b.visibility = d;
        return a;
    };
    var we = function (a) {
        var b = a.offsetWidth;
        var c = a.offsetHeight;
        var d = Pb && !b && !c;
        if ((!ca(b) || d) && a.getBoundingClientRect) {
            a = pe(a);
            return new tb(a.right - a.left, a.bottom - a.top);
        } else {
            return new tb(b, c);
        }
    };
    var ye = function (a) {
        var b = re(a);
        var a = xe(a);
        return new ke(b.x, b.y, a.width, a.height);
    };
    var se = function (a) {
        return oe(a, "direction") == "rtl";
    };
    var ze = function (a, b) {
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
    var Ae = {
        thin: 2,
        medium: 4,
        thick: 6
    };
    var Be = function (a, b) {
        if (ne(a, b + "Style") == "none") {
            return 0;
        }
        var c = ne(a, b + "Width");
        if (c in Ae) {
            return Ae[c];
        } else {
            return ze(a, c);
        }
    };
    var Ce = function (a, b) {
        if ((a = G(a)) && a.style) {
            a.style.display = b ? "" : "none";
            A(a, "hid", !b);
        }
    };
    var De = function (a) {
        a = G(a);
        if (!a) {
            return m;
        } else {
            return a.style.display != "none" && !z(a, "hid");
        }
    };
    var Ee = function (a) {
        if ((a = G(a))) {
            if (De(a)) {
                a.style.display = "none";
                v(a, "hid");
            } else {
                a.style.display = "";
                w(a, "hid");
            }
        }
    };
    var S = function (a) {
        u(arguments, function (a) {
            Ce(a, k);
        });
    };
    var T = function (a) {
        u(arguments, function (a) {
            Ce(a, m);
        });
    };
    var Fe = function (a) {
        u(arguments, Ee);
    };
    var Ge = function (a, b, c, d, e, f, g) {
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
    var He = RegExp(
        "^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([\\w\\d\\-\\u0100-\\uffff.%]*)(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$"
    );
    var Ke = function (a) {
        if (Ie) {
            Ie = m;
            var b = p.location;
            if (b) {
                var c = b.href;
                if (c && (c = Je(c)) && c != b.hostname) {
                    Ie = k;
                    h(Error());
                }
            }
        }
        return a.match(He);
    };
    var Ie = Pb;
    var Je = function (a) {
        return (a = Ke(a)[3] || l) && decodeURIComponent(a);
    };
    var Le = function () {
        var a = Ke(document.location.href);
        return Ge(a[1], a[2], a[3], a[4]);
    };
    var Me = function (a) {
        a = Ke(a);
        return Ge(l, l, l, l, a[5], a[6], a[7]);
    };
    var Ne = function (a, b) {
        for (var c in b) {
            var d = c;
            var e = b[c];
            var f = a;
            if (da(e)) {
                for (var g = 0; g < e.length; g++) {
                    f.push("&", d);
                    if (e[g] !== "") {
                        f.push("=", ua(e[g]));
                    }
                }
            } else if (e != l) {
                f.push("&", d);
                if (e !== "") {
                    f.push("=", ua(e));
                }
            }
        }
        return a;
    };
    var Oe = function (a) {
        a = Ne([], a);
        a[0] = "";
        return a.join("");
    };
    var Pe = function (a) {
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
                    if (da(b[f])) {
                        gb(b[f], e);
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
    var Qe = function (a) {
        if (a.indexOf("?") != -1) {
            a = (a || "").split("#")[0];
            a = a.split("?", 2);
            return Pe(a.length > 1 ? a[1] : a[0]);
        } else {
            return {};
        }
    };
    var Re = function (a) {
        if (a.charAt(0) == "#") {
            a = a.charAt(1) == "!" ? a.substr(2) : a.substr(1);
        }
        return Pe(a);
    };
    var Se = function (a, b) {
        var c = Ne([a], b);
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
                c[1] = i;
            }
        }
        return c.join("");
    };
    var Te = Je;
    var Ue = function (a, b) {
        var c = a.split("?", 2);
        var a = c[0];
        var c = Pe(c[1] || "");
        var d;
        for (d in b) {
            c[d] = b[d];
        }
        return Se(a, c);
    };
    var Ve = function (a) {
        a = Te(a);
        a = a === l ? l : a.split(".").reverse();
        return (
            (a === l ? m : a[0] == "com" && a[1].match(/^youtube(?:-nocookie)?$/) ? k : m) ||
            (a === l
                ? m
                : a[1] == "google"
                  ? k
                  : a[2] == "google"
                    ? a[0] == "au" && a[1] == "com"
                        ? k
                        : a[0] == "uk" && a[1] == "co"
                          ? k
                          : m
                    : m)
        );
    };
    var Ze = function (a) {
        a = a || {};
        this.url = a.url || this.url;
        this.urlV8 = a.url_v8 || this.urlV8;
        this.urlV9As2 = a.url_v9as2 || this.urlV9As2;
        this.minVersion = a.min_version || this.minVersion;
        this.args = a.args || zb(We);
        this.assets = a.assets || {};
        this.attrs = a.attrs || zb(Xe);
        this.params = a.params || zb(Ye);
        this.fallback = a.fallback || this.fallback;
        this.html5 = a.html5 || this.html5;
        this.disable = a.disable || {};
    };
    var We = {
        enablejsapi: 1
    };
    var Xe = {
        width: "640",
        height: "385"
    };
    var Ye = {
        allowscriptaccess: "always",
        allowfullscreen: "true",
        bgcolor: "#000000"
    };
    n = Ze.prototype;
    n.url = "";
    n.urlV8 = "";
    n.urlV9As2 = "";
    n.minVersion = "8.0.0";
    n.html5 = m;
    var af = function () {
        this.Dc = [];
        $e(this);
    };
    aa(af);
    n = af.prototype;
    n.J = 0;
    n.Pa = 0;
    n.rev = 0;
    n.zd = "";
    n.xa = 0;
    n.load = function (a) {
        if (this.xa >= 3) {
            a(this);
        } else {
            this.Dc.push(a);
        }
    };
    n.setVersion = function (a) {
        this.J = a[0];
        this.Pa = a[1];
        this.rev = a[2];
    };
    n.isSupported = function (a, b, c) {
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
    var bf = function (a) {
        if (
            (a.zd.indexOf("Gnash") > -1 && a.zd.indexOf("AVM2") == -1) ||
            (a.J == 9 && a.Pa == 1) ||
            (a.J == 9 && a.Pa == 0 && a.rev == 1)
        ) {
            return m;
        } else {
            return a.J >= 9;
        }
    };
    var cf = function (a) {
        if (navigator.userAgent.indexOf("Sony/COM2") > -1 && !a.isSupported(9, 1, 58)) {
            return m;
        } else {
            return k;
        }
    };
    var $e = function (a) {
        if (a.xa < 3) {
            if (a.xa < 1) {
                var b = q("window.navigator.plugins");
                var c = q("window.navigator.mimeTypes");
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
                    df(a);
                } else {
                    $e(a);
                }
            } else if (a.xa < 2) {
                ef(a);
            } else {
                df(a);
            }
        }
    };
    af.prototype.Cf = function (a) {
        if (a) {
            a = a.split(" ")[1].split(",");
            a = [parseInt(a[0], 10) || 0, parseInt(a[1], 10) || 0, parseInt(a[2], 10) || 0];
        } else {
            a = [0, 0, 0];
        }
        this.setVersion(a);
        this.xa = 2;
        if (this.J > 0) {
            df(this);
        } else {
            $e(this);
        }
    };
    var df = function (a) {
        if (a.xa < 3) {
            a.xa = 3;
            for (var b = 0, c = a.Dc.length; b < c; b++) {
                a.Dc[b](a);
            }
            a.Dc = [];
        }
    };
    var ef = function (a) {
        var b;
        var c;
        var d;
        var e;
        if (rd) {
            try {
                b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
            } catch (f) {
                b = l;
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
        var g = r(a.Cf, a);
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
                M(o, 10);
            }
        };
        M(o, 0);
    };
    var ff = function (a, b, c) {
        if ((a = G(a)) && b && c) {
            if (!(c instanceof Ze)) {
                c = new Ze(c);
            }
            var d = zb(c.attrs);
            var e = zb(c.params);
            e.flashvars = Oe(c.args);
            c = [];
            if (rd) {
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
    var hf = function (a, b) {
        a = G(a);
        if (!(b instanceof Ze)) {
            b = new Ze(b);
        }
        if (window != window.top) {
            var c = l;
            if (document.referrer) {
                c = document.referrer.substring(0, 128);
            }
            b.args.framer = c;
        }
        gf(function (c) {
            if (c.isSupported(b.minVersion) || L("IS_OPERA_MINI")) {
                c = (bf(c) && b.url) || (cf(c) && b.urlV9As2) || b.urlV8 || b.url;
                ff(a, c, b);
            } else if (rd && c.isSupported(6, 0, 65)) {
                c = new Ze({
                    url: "//s.ytimg.com/yt/swf/expressInstall-vflIE9HEf.swf",
                    args: {
                        MMredirectURL: window.location,
                        MMplayerType: "ActiveX",
                        MMdoctitle: document.title
                    }
                });
                ff(a, c.url, c);
            } else if (c.J == 0 && b.fallback) {
                b.fallback();
            } else if (c.J == 0 && b.fallbackMessage) {
                b.fallbackMessage();
            } else {
                a.innerHTML = '<div id="flash-upgrade">' + N("FLASH_UPGRADE") + "</div>";
            }
        });
    };
    var jf = function (a, b) {
        if (a) {
            if (!(a instanceof Ze)) {
                a = new Ze(a);
            }
            var c = !!b;
            var d = G(a.attrs.id);
            var e = d ? d.parentNode : l;
            if (!d || !e) {
                M(function () {
                    jf(a);
                }, 50);
            } else {
                if (window != window.top) {
                    var f = l;
                    if (document.referrer) {
                        var g = document.referrer.substring(0, 128);
                        if (!Ve(g)) {
                            f = g;
                        }
                    } else {
                        f = "unknown";
                    }
                    if (f) {
                        c = k;
                        a.args.framer = f;
                    }
                }
                gf(function (b) {
                    if (b.isSupported(a.minVersion)) {
                        var f = "";
                        if (!(navigator.userAgent.indexOf("Sony/COM2") > -1)) {
                            f = d.src || d.movie;
                        }
                        if (bf(b)) {
                            if (f != a.url || c) {
                                ff(e, a.url, a);
                            }
                        } else if (cf(b)) {
                            if (f != a.urlV9As2 || c) {
                                ff(e, a.urlV9As2, a);
                            }
                        } else if (f != a.urlV8 || c) {
                            ff(e, a.urlV8, a);
                            if ((b = G("flash10-promo-div"))) {
                                S(b);
                                b = de.getInstance();
                                f = parseInt(b.get("ftuc") || 0, 10) + 1;
                                b.set("ftuc", f);
                                b.save();
                            }
                        }
                    } else if (rd && b.isSupported(6, 0, 65)) {
                        b = new Ze({
                            url: "//s.ytimg.com/yt/swf/expressInstall-vflIE9HEf.swf",
                            args: {
                                MMredirectURL: window.location,
                                MMplayerType: "ActiveX",
                                MMdoctitle: document.title
                            }
                        });
                        ff(e, b.url, b);
                    } else if (b.J == 0 && a.fallback) {
                        a.fallback();
                    } else if (b.J == 0 && a.fallbackMessage) {
                        a.fallbackMessage();
                    } else {
                        e.innerHTML = '<div id="flash-upgrade">' + N("FLASH_UPGRADE") + "</div>";
                    }
                });
            }
        }
    };
    var gf = function (a) {
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
    t(lf, kf);
    n = lf.prototype;
    n.lf = 1;
    n.qc = 0;
    n.gc = function (a, b, c) {
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
    n.yd = function (a) {
        if (this.qc != 0) {
            if (!this.pc) {
                this.pc = [];
            }
            this.pc.push(a);
            return m;
        }
        var b = this.ea[a];
        if (b) {
            var c = this.da[b];
            if (c) {
                var d = Ta(c, a);
                if (d >= 0) {
                    cb(c, d);
                }
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
            var d = hb(arguments, 1);
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
        return m;
    };
    n.clear = function (a) {
        if (a) {
            var b = this.da[a];
            if (b) {
                u(b, this.yd, this);
                delete this.da[a];
            }
        } else {
            this.ea.length = 0;
            this.da = {};
        }
    };
    n.N = function (a) {
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
    var mf = q("yt.pubsub.instance_") || new lf();
    lf.prototype.subscribe = lf.prototype.gc;
    lf.prototype.unsubscribeByKey = lf.prototype.yd;
    lf.prototype.publish = lf.prototype.xc;
    lf.prototype.clear = lf.prototype.clear;
    s("yt.pubsub.instance_", mf);
    var nf = function (a, b, c) {
        var d = q("yt.pubsub.instance_");
        if (d) {
            return d.subscribe(
                a,
                function () {
                    var a = arguments;
                    M(function () {
                        b.apply(c || p, a);
                    }, 0);
                },
                c
            );
        } else {
            return 0;
        }
    };
    var of = function (a, b) {
        var c = q("yt.pubsub.instance_");
        if (c) {
            return c.publish.apply(c, arguments);
        } else {
            return m;
        }
    };
    var pf;
    var rf = function (a, b, c) {
        this.la = a;
        if (qf) {
            this.A = b;
        }
        this.Ya = c || window;
        this.ta = this.Ya.location;
        this.wh = this.ta.href.split("#")[0];
        this.Ge = r(this.xh, this);
    };
    var sf = (D && document.documentMode >= 8) || (Ob && E("1.9.2")) || (Pb && E("532.1"));
    var qf = D && !sf;
    rf.prototype.Qd = function (a, b) {
        if (this.sd) {
            Nd(this.sd);
            delete this.sd;
        }
        if (this.$a) {
            qd(this.$a);
            delete this.$a;
        }
        if (a) {
            this.ca = tf(this);
            if (qf) {
                var c = this.A.contentWindow.document.body;
                if (!c || !c.innerHTML) {
                    uf(this, this.ca);
                }
            }
            if (!b) {
                this.la(this.ca);
            }
            if (sf) {
                this.sd = Q(this.Ya, "hashchange", this.Ge);
            } else {
                this.$a = od(this.Ge, 200);
            }
        }
    };
    rf.prototype.xh = function () {
        if (qf) {
            var a;
            a = (a = this.A.contentWindow.document.body)
                ? decodeURIComponent(a.innerHTML.substring(1).replace(/\+/g, " "))
                : "";
            if (a != this.ca) {
                this.ca = a;
                vf(this, a);
                this.la(a);
            } else {
                a = tf(this);
                if (a != this.ca) {
                    this.ca = a;
                    uf(this, a);
                    this.la(a);
                }
            }
        } else {
            a = tf(this);
            if (a != this.ca) {
                this.ca = a;
                this.la(a);
            }
        }
    };
    var tf = function (a) {
        var a = a.ta.href;
        var b = a.indexOf("#");
        if (b < 0) {
            return "";
        } else {
            return a.substring(b + 1);
        }
    };
    var vf = function (a, b) {
        var c = a.wh + "#" + b;
        var d = a.ta.href;
        if (d != c && d + "#" != c) {
            a.ta.href = c;
        }
    };
    var uf = function (a, b) {
        var c = a.A.contentWindow.document;
        var d = c.body ? c.body.innerHTML : "";
        var e = "#" + ua(b);
        if (d != e) {
            d = ["<title>", Aa(window.document.title || ""), "</title><body>", e, "</body>"];
            c.open("text/html");
            c.write(d.join(""));
            c.close();
        }
    };
    rf.prototype.add = function (a, b, c) {
        this.ca = "" + a;
        if (qf) {
            uf(this, a);
        }
        vf(this, a);
        if (!c) {
            this.la(this.ca);
        }
    };
    var wf = function () {
        this.Ff = oa();
    };
    var xf = new wf();
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
    n.Pe = k;
    n.Fh = k;
    n.Eh = k;
    n.rd = m;
    n.Gh = m;
    var zf = function (a) {
        if (a < 10) {
            return "0" + a;
        } else {
            return "" + a;
        }
    };
    var Af = function (a, b) {
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
    var Cf = function (a) {
        yf.call(this, a);
    };
    t(Cf, yf);
    var Ef = function (a) {
        return Df(a || arguments.callee.caller, []);
    };
    var Df = function (a, b) {
        var c = [];
        if (ab(b, a)) {
            c.push("[...circular reference...]");
        } else if (a && b.length < 50) {
            c.push(Ff(a) + "(");
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
                        f = (f = Ff(f)) ? f : "[fn]";
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
                c.push(Df(a.caller, b));
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
    var Ff = function (a) {
        if (Gf[a]) {
            return Gf[a];
        }
        a = "" + a;
        if (!Gf[a]) {
            var b = /function ([^\(]+)/.exec(a);
            Gf[a] = b ? b[1] : "[Anonymous]";
        }
        return Gf[a];
    };
    var Gf = {};
    var Hf = function (a, b, c, d, e) {
        this.reset(a, b, c, d, e);
    };
    Hf.prototype.qd = l;
    Hf.prototype.pd = l;
    var If = 0;
    Hf.prototype.reset = function (a, b, c, d, e) {
        if (typeof e != "number") {
            If++;
        }
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
    Jf.prototype.Ac = l;
    Jf.prototype.Oa = l;
    Jf.prototype.Pd = l;
    Jf.prototype.Nb = l;
    var Kf = function (a, b) {
        this.name = a;
        this.value = b;
    };
    Kf.prototype.toString = function () {
        return this.name;
    };
    var Lf = new Kf("SHOUT", 1200);
    var Mf = new Kf("SEVERE", 1000);
    var Nf = new Kf("WARNING", 900);
    var Of = new Kf("INFO", 800);
    var Pf = new Kf("CONFIG", 700);
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
        if (a.Oa) {
            return a.Oa;
        }
        if (a.Ac) {
            return Qf(a.Ac);
        }
        Qa("Root logger has no level set.");
        return l;
    };
    Jf.prototype.log = function (a, b, c) {
        if (a.value >= Qf(this).value) {
            a = this.Bi(a, b, c);
            b = "log:" + a.getMessage();
            if (p.console) {
                if (p.console.timeStamp) {
                    p.console.timeStamp(b);
                } else if (p.console.markTimeline) {
                    p.console.markTimeline(b);
                }
            }
            if (p.msWriteProfilerMark) {
                p.msWriteProfilerMark(b);
            }
            for (b = this; b;) {
                var c = b;
                var d = a;
                if (c.Nb) {
                    for (var e = 0, f = i; (f = c.Nb[e]); e++) {
                        f(d);
                    }
                }
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
                var j = q("window.location.href");
                if (fa(c)) {
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
                    var C = m;
                    try {
                        o = c.lineNumber || c.Si || "Not available";
                    } catch (F) {
                        o = "Not available";
                        C = k;
                    }
                    try {
                        x = c.fileName || c.filename || c.sourceURL || j;
                    } catch (I) {
                        x = "Not available";
                        C = k;
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
                    Aa(g.message) +
                    '\nUrl: <a href="view-source:' +
                    g.fileName +
                    '" target="_new">' +
                    g.fileName +
                    "</a>\nLine: " +
                    g.lineNumber +
                    "\n\nBrowser stack:\n" +
                    Aa(g.stack + "-> ") +
                    "[end]\n\nJS stack traversal:\n" +
                    Aa(Ef(f) + "-> ");
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
    var Rf = {};
    var Sf = l;
    var Tf = function () {
        if (!Sf) {
            Sf = new Jf("");
            Rf[""] = Sf;
            Sf.Cc(Pf);
        }
    };
    var Uf = function (a) {
        Tf();
        var b;
        if (!(b = Rf[a])) {
            b = new Jf(a);
            var c = a.lastIndexOf(".");
            var d = a.substr(c + 1);
            var c = Uf(a.substr(0, c));
            if (!c.Pd) {
                c.Pd = {};
            }
            c.Pd[d] = b;
            b.Ac = c;
            Rf[a] = b;
        }
        return b;
    };
    var Vf = function () {
        this.Uh = r(this.Zh, this);
        this.hc = new Cf();
        this.hc.Pe = m;
        this.Ze = this.hc.rd = m;
        this.Oe = "";
        this.qh = {};
    };
    var Xf = function () {
        var a = Wf;
        if (k != a.Ze) {
            Tf();
            var b = Sf;
            var c = a.Uh;
            if (!b.Nb) {
                b.Nb = [];
            }
            b.Nb.push(c);
            a.Ze = k;
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
                    zf(d.getFullYear() - 2000) +
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
            if (b.Fh) {
                c.push("[", Af(a, b.Dh.get()), "s] ");
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
            if (Yf && Yf.firebug) {
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
            } else if (Yf) {
                Yf.log(b);
            } else if (window.opera) {
                window.opera.postError(b);
            } else {
                this.Oe += b;
            }
        }
    };
    var Wf = l;
    var Yf = window.console;
    var Zf = function () {
        if (!Wf) {
            Wf = new Vf();
        }
        if (window.location.href.indexOf("Debug=true") != -1) {
            Xf();
        }
    };
    var $f = l;
    var ag = function (a) {
        if (!$f) {
            Zf();
            Xf();
            Wf.hc.rd = k;
            $f = Uf("yt.debug");
            $f.Cc(Of);
        }
        $f.log(Of, "yt.history.StateMonitor: " + a, i);
    };
    var bg = function (a, b) {
        this.la = a;
        this.Ya = b || window;
        this.ta = this.Ya.location;
        this.zh = r(this.Wh, this);
    };
    var cg = !!window.history.pushState && (!Pb || (Pb && E("534.11")));
    bg.prototype.Qd = function (a, b) {
        ag("setEnabled " + a);
        if (this.vd) {
            Nd(this.vd);
            delete this.vd;
        }
        if (this.$a) {
            qd(this.$a);
            delete this.$a;
        }
        if (!a || !cg) {
            ag("disabling (supported = " + cg + ")");
        } else {
            ag("enabling");
            this.jc = this.ta.href;
            if (!b) {
                this.la(this.jc);
            }
            this.vd = Q(this.Ya, "popstate", this.zh);
        }
    };
    bg.prototype.Wh = function (a) {
        var b = this.ta.href;
        var a = a.state;
        ag("handlePopState_ " + b + " " + a);
        if (a || b != this.jc) {
            ag("handlePopState_ navCallback");
            this.jc = b;
            this.la(b, a);
        }
    };
    bg.prototype.add = function (a, b, c) {
        if (a || b) {
            a = a || this.ta.href;
            this.Ya.history.pushState(b, "", a);
            this.jc = a;
            if (!c) {
                this.la(a, b);
            }
        }
    };
    var eg = function (a) {
        var a = a || "hash";
        var b = q("yt.history.instance_");
        if (!b) {
            if (a == "state") {
                b = new bg(dg);
                bg.prototype.setEnabled = bg.prototype.Qd;
                bg.prototype.add = bg.prototype.add;
            } else {
                b = new rf(dg, G("legacy-history-iframe"));
                rf.prototype.setEnabled = rf.prototype.Qd;
                rf.prototype.add = rf.prototype.add;
            }
            pf = b;
            s("yt.history.instance_", pf);
        }
        return b;
    };
    var dg = function (a, b) {
        of("navigate", a, b);
    };
    var fg = {
        GOOGLE_IMA: "//www.google.com/jsapi",
        GOOGLE_MAPS_API: "//maps.google.com/maps/api/js?sensor=false",
        GOOGLE_LANGUAGE_API_VIRTUAL_KEYBOARD: "//www.google.com/jsapi?key=youtube-internal-vk",
        GOOGLE_LANGUAGE_API_INPUT_TOOLS: "//www.google.com/jsapi?key=youtube-internal-it"
    };
    var gg = {};
    var hg = {};
    var ig = {};
    var kg = function (a) {
        s("yt.net.apiloader.onApiLoaded_" + a, function () {
            jg(a);
        });
    };
    var jg = function (a) {
        hg[a] = k;
        u(ig[a], function (a) {
            a.call();
        });
        delete ig[a];
    };
    var lg = function (a, b) {
        var c = fg[a];
        if (c) {
            if (hg[a]) {
                b.call();
            } else {
                if (!ig[a]) {
                    ig[a] = [];
                }
                ig[a].push(b);
                if (!gg[a]) {
                    kg(a);
                    var c = Se(c, {
                        callback: "yt.net.apiloader.onApiLoaded_" + a
                    });
                    var d = document.createElement("script");
                    d.src = c;
                    document.body.appendChild(d);
                    gg[a] = k;
                }
            }
        }
    };
    var mg;
    var ng;
    var og = l;
    var pg = m;
    var qg = "";
    var rg;
    var sg;
    var tg = m;
    var ug = "";
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
        ) {
            try {
                return eval("(" + a + ")");
            } catch (b) {}
        }
        h(Error("Invalid JSON string: " + a));
    };
    var wg = function (a) {
        return eval("(" + a + ")");
    };
    var xg = function (a) {
        this.Fc = a;
    };
    var zg = function (a, b) {
        var c = [];
        yg(a, b, c);
        return c.join("");
    };
    var yg = function (a, b, c) {
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
                if (b == l) {
                    c.push("null");
                    break;
                }
                if (da(b)) {
                    var d = b.length;
                    c.push("[");
                    var e = "";
                    for (var f = 0; f < d; f++) {
                        c.push(e);
                        e = b[f];
                        yg(a, a.Fc ? a.Fc.call(b, "" + f, e) : e, c);
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
                            Ag(f, c);
                            c.push(":");
                            yg(a, a.Fc ? a.Fc.call(b, f, e) : e, c);
                            d = ",";
                        }
                    }
                }
                c.push("}");
                break;
            case "function":
                break;
            default:
                h(Error("Unknown type: " + typeof b));
        }
    };
    var Bg = {
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
    var Cg = /\uffff/.test("￿") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;
    var Ag = function (a, b) {
        b.push(
            '"',
            a.replace(Cg, function (a) {
                if (a in Bg) {
                    return Bg[a];
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
                return (Bg[a] = e + b.toString(16));
            }),
            '"'
        );
    };
    var Dg = l;
    if (typeof XMLHttpRequest != "undefined") {
        Dg = function () {
            return new XMLHttpRequest();
        };
    } else if (typeof ActiveXObject != "undefined") {
        Dg = function () {
            return new ActiveXObject("Microsoft.XMLHTTP");
        };
    }
    var Eg = function (a) {
        switch (a && "status" in a ? a.status : -1) {
            case 0:
            case 200:
            case 204:
            case 304:
                return k;
            default:
                return m;
        }
    };
    var Fg = function (a, b, c, d, e) {
        var f = Dg && Dg();
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
                for (var g in e) {
                    f.setRequestHeader(g, e[g]);
                    if (g.toLowerCase() == "content-type") {
                        a = m;
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
    var U = function (a, b) {
        var c = b.format || "JSON";
        if (b.kb) {
            a = document.location.protocol + "//" + document.location.hostname + a;
        }
        var d = b.g;
        if (d) {
            a = Ue(a, d);
        }
        var e = b.za || "";
        if ((d = b.n)) {
            e = Pe(e);
            Bb(e, d);
            e = Oe(e);
        }
        Fg(
            a,
            function (a) {
                var d = Eg(a);
                var e = l;
                if (d || (a.status >= 400 && a.status < 500)) {
                    e = Gg(c, a);
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
                var o = b.j || p;
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
    var Hg = function (a, b) {
        var c = b || {};
        c.method = a.method.toUpperCase();
        if (c.method == "POST") {
            c.za = $c(a);
        } else {
            var d = Vc(Yc(a));
            var e = c.g || {};
            Bb(e, d);
            c.g = e;
        }
        U(a.action, c);
    };
    var Gg = function (a, b) {
        var c = l;
        switch (a) {
            case "JSON":
                var d = b.responseText;
                var e = b.getResponseHeader("Content-Type") || "";
                if (d && e.indexOf("json") >= 0) {
                    c = wg(d);
                }
                break;
            case "XML":
                if ((d = (d = b.responseXML) ? Ig(d) : l)) {
                    c = {};
                    u(d.getElementsByTagName("*"), function (a) {
                        c[a.tagName] = Jg(a);
                    });
                }
        }
        return c;
    };
    var Lg = function (a, b) {
        var c = b.onComplete || l;
        var d = b.onException || l;
        var e = b.onError || l;
        var f = b.update || l;
        var g = b.json || m;
        return Fg(
            a,
            function (a) {
                if (Eg(a)) {
                    var b = a.responseXML;
                    var x = b ? Ig(b) : l;
                    var b = !!b && !!x;
                    var C;
                    var F;
                    if (b && ((C = Kg(x, "return_code")), (F = Kg(x, "html_content")), C == 0)) {
                        if (f && F) {
                            G(f).innerHTML = F;
                        }
                        var I = Kg(x, "js_content");
                        if (I) {
                            var ka = document.createElement("script");
                            ka.text = I;
                            document.getElementsByTagName("head")[0].appendChild(ka);
                        }
                    }
                    if (c) {
                        if (b) {
                            b = Kg(x, "redirect_on_success");
                            if (C && b) {
                                window.location = b;
                            } else {
                                if ((x = Kg(x, C == 0 ? "success_message" : "error_message"))) {
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
            b.postBody || l,
            b.headers || l
        );
    };
    var Ig = function (a) {
        if (!a) {
            return l;
        } else if ((a = ("responseXML" in a ? a.responseXML : a).getElementsByTagName("root")) && a.length > 0) {
            return a[0];
        } else {
            return l;
        }
    };
    var Kg = function (a, b) {
        if (!a) {
            return l;
        }
        var c = a.getElementsByTagName(b);
        if (c && c.length > 0) {
            return Jg(c[0]);
        } else {
            return l;
        }
    };
    var Jg = function (a) {
        var b = "";
        u(a.childNodes, function (a) {
            b += a.nodeValue;
        });
        return b;
    };
    var V = q("yt.net.ajax.tokenMap_") || {};
    s("yt.net.ajax.tokenMap_", V);
    var Mg = function (a, b) {
        V[a] = b;
    };
    var Ng = {};
    var Og = {};
    var Pg = function (a, b, c) {
        a = G(a);
        c = c || ja(a);
        if (!(c in Ng)) {
            Ng[c] = [];
        }
        Ng[c].push([a, b]);
        Og[c] = m;
        return c;
    };
    var Qg = function (a, b) {
        var a = G(a);
        var c = b || ja(a);
        var d = Ng[c];
        if (d) {
            Ng[c] = Ua(d, function (b) {
                return b[0] != a;
            });
        }
    };
    var Rg = function (a) {
        if (a in Ng && !Og[a]) {
            u(Ng[a], function (a) {
                var c = a[0];
                var a = a[1];
                if (c && c.tagName == "IMG") {
                    c.onload = "";
                    c.src = a;
                }
            });
            Ng[a] = [];
            Og[a] = k;
        }
    };
    var Tg = function (a, b, c) {
        var d = "scriptload-" + Ka(a);
        var e = document.getElementById(d);
        var f = e && P(e, "loaded");
        var g = e && !f;
        if (f && !c) {
            if (b) {
                b();
            }
            return e;
        }
        if (g && !c) {
            if (b) {
                nf(d, b);
            }
            return e;
        }
        if (e) {
            d =
                "scriptload-" +
                (Math.floor(Math.random() * 2147483648).toString(36) +
                    Math.abs(Math.floor(Math.random() * 2147483648) ^ oa()).toString(36));
        }
        if (b) {
            nf(d, b);
        }
        var j = Sg(a, d, function () {
            if (!P(j, "loaded")) {
                O(j, "loaded", "true");
                of(d);
                var a = d;
                var b = q("yt.pubsub.instance_");
                if (b) {
                    b.clear(a);
                }
            }
        });
        return j;
    };
    var Sg = function (a, b, c) {
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
    var Ug = {};
    var Vg = 0;
    var Wg = function (a, b) {
        var c = new Image();
        var d = "" + Vg++;
        Ug[d] = c;
        c.onload = c.onerror = function () {
            if (b && Ug[d]) {
                b();
            }
            delete Ug[d];
        };
        c.src = a;
        c = eval("null");
    };
    var Xg = function (a, b, c) {
        td(a, b || "null");
        a = "a=" + a + (b ? "&" + b : "").replace(/\//g, "&");
        Wg("/gen_204?" + a, c);
    };
    var Yg = function (a, b, c, d) {
        a = Se("/sharing_services", {
            name: a,
            v: b,
            locale: c,
            feature: d
        });
        Wg(a);
    };
    var $g = function (a, b, c, d, e, f, g) {
        var j;
        var o = c.offsetParent;
        if (o) {
            var x = o.tagName == "HTML" || o.tagName == "BODY";
            if (!x || oe(o, "position") != "static") {
                j = re(o);
                if (!x) {
                    j = sb(j, new B(o.scrollLeft, o.scrollTop));
                }
            }
        }
        o = ye(a);
        if ((x = te(a))) {
            var C = new ke(x.left, x.top, x.right - x.left, x.bottom - x.top);
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
        x = ic(a);
        I = ic(c);
        if (x.z != I.z) {
            var F = x.z.body;
            var I = I.z.parentWindow || I.z.defaultView;
            var C = new B(0, 0);
            var ka = hc(F) ? hc(F).parentWindow || hc(F).defaultView : window;
            var Bf = F;
            do {
                var qi = ka == I ? re(Bf) : ue(Bf);
                C.x += qi.x;
                C.y += qi.y;
            } while (ka && ka != I && (Bf = ka.frameElement) && (ka = ka.parent));
            F = sb(C, re(F));
            if (D && !Lc(x)) {
                F = sb(F, Mc(x));
            }
            o.left += F.x;
            o.top += F.y;
        }
        a = (b & 4 && se(a) ? b ^ 2 : b) & -5;
        b = new B(a & 2 ? o.left + o.width : o.left, a & 1 ? o.top + o.height : o.top);
        if (j) {
            b = sb(b, j);
        }
        if (e) {
            b.x += (a & 2 ? -1 : 1) * e.x;
            b.y += (a & 1 ? -1 : 1) * e.y;
        }
        var Ya;
        if (g && (Ya = te(c)) && j) {
            Ya.top -= j.y;
            Ya.right -= j.x;
            Ya.bottom -= j.y;
            Ya.left -= j.x;
        }
        return Zg(b, c, d, f, Ya, g, i);
    };
    var Zg = function (a, b, c, d, e, f, g) {
        var a = a.Qa();
        var j = 0;
        var o = (c & 4 && se(b) ? c ^ 2 : c) & -5;
        var c = xe(b);
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
        e = Ob && (Hb || Tb) && E("1.9");
        if (f instanceof B) {
            a = f.x;
            f = f.y;
        } else {
            a = f;
            f = i;
        }
        b.style.left = ve(a, e);
        b.style.top = ve(f, e);
        if (c != g && !(!c || !g ? 0 : c.width == g.width && c.height == g.height)) {
            a = Lc(ic(hc(b)));
            if (D && (!a || !E("8"))) {
                c = b.style;
                if (a) {
                    if (D) {
                        a = ze(b, ne(b, "paddingLeft"));
                        e = ze(b, ne(b, "paddingRight"));
                        f = ze(b, ne(b, "paddingTop"));
                        d = ze(b, ne(b, "paddingBottom"));
                        a = new je(f, e, d, a);
                    } else {
                        a = me(b, "paddingLeft");
                        e = me(b, "paddingRight");
                        f = me(b, "paddingTop");
                        d = me(b, "paddingBottom");
                        a = new je(parseFloat(f), parseFloat(e), parseFloat(d), parseFloat(a));
                    }
                    if (D) {
                        e = Be(b, "borderLeft");
                        f = Be(b, "borderRight");
                        d = Be(b, "borderTop");
                        b = Be(b, "borderBottom");
                        b = new je(d, f, b, e);
                    } else {
                        e = me(b, "borderLeftWidth");
                        f = me(b, "borderRightWidth");
                        d = me(b, "borderTopWidth");
                        b = me(b, "borderBottomWidth");
                        b = new je(parseFloat(d), parseFloat(f), parseFloat(b), parseFloat(e));
                    }
                    c.pixelWidth = g.width - b.left - a.left - a.right - b.right;
                    c.pixelHeight = g.height - b.top - a.top - a.bottom - b.bottom;
                } else {
                    c.pixelWidth = g.width;
                    c.pixelHeight = g.height;
                }
            } else {
                b = b.style;
                if (Ob) {
                    b.MozBoxSizing = "border-box";
                } else if (Pb) {
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
    var ah = {};
    var bh = "ontouchstart" in document;
    var ch = function (a, b, c, d, e) {
        if (!(b in ah)) {
            ah[b] = new lf();
            ah[b].maxNumParents = {};
            ah[b].checkRelatedTarget = {};
        }
        b = ah[b];
        b.gc(a, c);
        b.maxNumParents[a] = d;
        b.checkRelatedTarget[a] = e;
    };
    var dh = function (a, b) {
        var c = ah[a].maxNumParents[b];
        var d;
        if (c > 0) {
            d = c;
        } else if (a.indexOf("mouse") != -1) {
            d = 2;
        }
        return d;
    };
    var eh = function (a, b, c) {
        return (
            Kc(
                b,
                function (b) {
                    return z(b, a);
                },
                k,
                c
            ) || l
        );
    };
    var fh = function (a) {
        if (a.target.tagName != "HTML" && a.type in ah) {
            var b = ah[a.type];
            var c;
            for (c in b.da) {
                var d = dh(a.type, c);
                var e = eh(c, a.target, d);
                if (e) {
                    var f = k;
                    if (
                        b.checkRelatedTarget[c] &&
                        a.relatedTarget &&
                        Kc(
                            a.relatedTarget,
                            function (a) {
                                return a == e;
                            },
                            k,
                            d
                        )
                    ) {
                        f = m;
                    }
                    if (f) {
                        b.xc(c, e, a.type, a);
                    }
                }
            }
        }
    };
    Q(document, "blur", fh, k);
    Q(document, "change", fh, k);
    Q(document, "click", fh);
    Q(document, "focus", fh, k);
    Q(document, "mouseover", fh);
    Q(document, "mouseout", fh);
    Q(document, "keydown", fh);
    Q(document, "keyup", fh);
    Q(document, "keypress", fh);
    Q(document, "cut", fh);
    Q(document, "paste", fh);
    if (bh) {
        Q(document, "touchstart", fh);
        Q(document, "touchend", fh);
        Q(document, "touchcancel", fh);
    }
    var gh = (window.yt && window.yt.uix && window.yt.uix.widgets_) || {};
    s("yt.uix.widgets_", gh);
    var hh = function (a) {
        var a = a.getInstance();
        var b = W(a);
        if (!(b in gh) && a.Kd()) {
            a.M();
            gh[b] = a;
        }
    };
    var ih = function () {
        this.L = {};
    };
    n = ih.prototype;
    n.Ld = !!eval("/*@cc_on!@*/false");
    n.Kd = function () {
        return k;
    };
    n.addBehavior = function (a, b, c, d, e) {
        var c = W(this, c);
        var f = r(b, this);
        ch(c, a, f, d, e);
        this.L[b] = f;
    };
    n.wa = function (a, b, c) {
        var d = this.getData(a, b);
        if (d && (d = q(d))) {
            var e = hb(arguments, 2);
            ib(e, 0, 0, a);
            d.apply(l, e);
        }
    };
    n.getData = function (a, b) {
        return P(a, b);
    };
    n.setData = function (a, b, c) {
        O(a, b, c);
    };
    var jh = function (a, b) {
        return Dd(b, W(a));
    };
    var W = function (a, b) {
        return "yt-uix" + (a.K ? "-" + a.K : "") + (b ? "-" + b : "");
    };
    var X = function () {
        this.L = {};
    };
    t(X, ih);
    aa(X);
    X.prototype.K = "button";
    X.prototype.M = function () {
        this.addBehavior("click", this.ma);
        this.addBehavior("keydown", this.oc);
        this.addBehavior("keypress", this.Id);
    };
    X.prototype.ma = function (a) {
        if (a && !a.disabled) {
            if (this.getData(a, "button-toggle")) {
                var b = Dd(a, W(this, "group"));
                if (b && this.getData(b, "button-toggle-group")) {
                    var b = kc(W(this), b);
                    var c = W(this, "toggled");
                    u(b, function (b) {
                        if (b != a) {
                            w(b, c);
                        } else {
                            v(a, c);
                        }
                    });
                } else {
                    rb(a, W(this, "toggled"));
                }
            }
            if (kh(this, a)) {
                lh(this, a);
                a.focus();
            }
            this.wa(a, "button-action");
        }
    };
    X.prototype.oc = function (a, b, c) {
        if ((b = kh(this, a))) {
            var d = function (a) {
                var b = "";
                if (a.tagName) {
                    b = a.tagName.toLowerCase();
                }
                return b == "ul" || b == "table";
            };
            if ((d = d(b) ? b : Fc(b, d))) {
                var d = d.tagName.toLowerCase();
                var e;
                if (d == "ul") {
                    e = this.Hi;
                } else if (d == "table") {
                    e = this.Gi;
                }
                if (e) {
                    mh(this, a, b, c, r(e, this));
                }
            }
        }
    };
    var mh = function (a, b, c, d, e) {
        var f = De(c);
        var g = d.keyCode == 9;
        if (g || d.keyCode == 32 || d.keyCode == 13) {
            if ((d = nh(a, c))) {
                b = Bc(d);
                if (b.tagName.toLowerCase() == "a") {
                    window.location = b.href;
                } else {
                    Vd(b);
                }
            } else if (g) {
                oh(a, b);
            }
        } else if (f) {
            if (d.keyCode == 27) {
                nh(a, c);
                oh(a, b);
            } else {
                e(b, c, d);
            }
        } else {
            a = z(b, W(a, "reverse")) ? 38 : 40;
            if (d.keyCode == a) {
                Vd(b);
                d.preventDefault();
            }
        }
    };
    X.prototype.Id = function (a, b, c) {
        a = kh(this, a);
        if (De(a)) {
            c.preventDefault();
        }
    };
    var nh = function (a, b) {
        var c = W(a, "menu-item-highlight");
        var d = J(c, b);
        if (d) {
            w(d, c);
        }
        return d;
    };
    var ph = function (a, b, c) {
        v(c, W(a, "menu-item-highlight"));
        b.setAttribute("aria-activedescendant", c.getAttribute("id"));
    };
    X.prototype.Gi = function (a, b, c) {
        var d = nh(this, b);
        var b = Ed("table", l, b);
        var e = Ed("tr", l, b);
        var e = H("td", l, e).length;
        var b = H("td", l, b);
        var d = qh(d, b, e, c);
        if (d != -1) {
            ph(this, a, b[d]);
            c.preventDefault();
        }
    };
    X.prototype.Hi = function (a, b, c) {
        if (c.keyCode == 40 || c.keyCode == 38) {
            var d = nh(this, b);
            var b = H("li", l, b);
            var d = qh(d, b, 1, c);
            ph(this, a, b[d]);
            c.preventDefault();
        }
    };
    var qh = function (a, b, c, d) {
        var e = b.length;
        var a = Ta(b, a);
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
    var lh = function (a, b) {
        var c = kh(a, b);
        var d = rh(a, c);
        if (d && d != b) {
            oh(a, d);
            M(r(a.Rd, a, b), 1);
        } else if (De(c)) {
            oh(a, b);
        } else {
            a.Rd(b);
        }
    };
    X.prototype.Kb = function (a) {
        if (!Ib || !z(a, W(this, "masked"))) {
            return l;
        }
        var b = a.iframeMask;
        if (!b) {
            b = document.createElement("iframe");
            b.src = 'javascript:""';
            b.className = W(this, "menu-mask");
            a.iframeMask = b;
        }
        return b;
    };
    var sh = function (a, b, c) {
        var d = Dd(b, W(a, "group"));
        var e = !!a.getData(b, "button-menu-ignore-group");
        var d = d && !e ? d : b;
        var e = 5;
        var f = 4;
        if (z(b, W(a, "reverse"))) {
            e = 4;
            f = 5;
        }
        if (z(b, "flip")) {
            if (z(b, W(a, "reverse"))) {
                e = 6;
                f = 7;
            } else {
                e = 7;
                f = 6;
            }
        }
        var g;
        if (a.getData(b, "button-has-sibling-menu")) {
            var j = qe(d);
            if (D && !E("8")) {
                j = l;
            }
            if (j) {
                g = ye(j);
                g = new je(-g.top, g.left, g.top, -g.left);
            }
        }
        j = new B(0, 1);
        if ((a = a.Kb(b))) {
            b = xe(c);
            a.style.width = b.width + "px";
            a.style.height = b.height + "px";
            $g(d, e, a, f, j, g);
        }
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
                if (this.getData(a, "button-has-sibling-menu")) {
                    a.parentNode.appendChild(b);
                } else {
                    document.body.appendChild(b);
                }
                var c = Dd(a, W(this, "group"));
                var d = !!this.getData(a, "button-menu-ignore-group");
                b.style.minWidth = (c && !d ? c.offsetWidth - 2 : a.offsetWidth - 2) + "px";
                if ((d = this.Kb(a))) {
                    document.body.appendChild(d);
                }
                sh(this, a, b);
                S(b);
                this.wa(a, "button-menu-action", k);
                v(a, W(this, "active"));
                if (c) {
                    v(c, W(this, "group-active"));
                }
                c = r(this.ki, this, a);
                b = Q(document, "click", c);
                c = Q(document, "contextmenu", c);
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
                T(c);
                a.wa(b, "button-menu-action", m);
                var d = a.Kb(b);
                M(function () {
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
            var e = Dd(b, W(a, "group"));
            w(b, W(a, "active"));
            if (e) {
                w(e, W(a, "group-active"));
            }
            if ((e = a.getData(b, "button-listener"))) {
                Nd(e);
                vd(b, "button-listener");
            }
            if ((e = a.getData(b, "button-context-menu-listener"))) {
                Nd(e);
                vd(b, "button-context-menu-listener");
            }
        }
    };
    X.prototype.getContent = function (a) {
        return J(W(this, "content"), a);
    };
    var rh = function (a, b) {
        return Dd(b.activeButtonNode || b.parentNode, W(a));
    };
    X.prototype.ki = function (a, b) {
        var c = Sd(b);
        var d = Dd(c, W(this));
        if (d) {
            var d = kh(this, d);
            var e = kh(this, a);
            if (d == e) {
                return;
            }
        }
        if (!Dd(c, W(this, "menu")) || z(c, W(this, "menu-item")) || z(c, W(this, "menu-close"))) {
            oh(this, a);
            if ((d = Dd(c, W(this, "menu"))) && this.getData(a, "button-menu-indicate-selected")) {
                e = J(W(this, "content"), a);
                Dc(e, Jc(c));
                e = W(this, "menu-item-selected");
                if ((d = J(e, d))) {
                    w(d, e);
                }
                v(c.parentNode, e);
            }
        }
    };
    var kh = function (a, b) {
        if (!b.widgetMenu) {
            var c = a.getData(b, "button-menu-id");
            var c = c && G(c);
            var d = W(a, "menu");
            if (c) {
                v(c, d);
            } else {
                c = J(d, b);
            }
            b.widgetMenu = c;
        }
        return b.widgetMenu;
    };
    var th = function () {
        this.L = {};
    };
    t(th, ih);
    aa(th);
    th.prototype.K = "expander";
    th.prototype.M = function () {
        this.addBehavior("click", this.ma, "head");
        this.addBehavior("keypress", this.Id, "head");
    };
    th.prototype.ma = function (a) {
        uh(this, a);
    };
    th.prototype.Id = function (a, b, c) {
        if (c && c.keyCode == 13) {
            uh(this, a);
        }
    };
    var uh = function (a, b) {
        var c = jh(a, b);
        if (c) {
            rb(c, W(a, "collapsed"));
            a.wa(c, "expander-action");
        }
    };
    th.prototype.collapse = function (a) {
        if ((a = jh(this, a))) {
            v(a, W(this, "collapsed"));
            this.wa(a, "expander-action");
        }
    };
    th.prototype.expand = function (a) {
        if ((a = jh(this, a))) {
            w(a, W(this, "collapsed"));
            this.wa(a, "expander-action");
        }
    };
    th.prototype.Ma = function (a) {
        return J(W(this, "body"), a);
    };
    if (D) {
        dc(9);
    }
    if (D) {
        dc(9);
    }
    if (D) {
        E("8");
    }
    if (Pb) {
        E("528");
    }
    if ((!Ob || !E("1.9b")) && (!D || !E("8")) && (!Nb || !E("9.5"))) {
        if (Pb) {
            E("528");
        }
    }
    if (!Ob || !!E("8")) {
        if (D) {
            E("9");
        }
    }
    var vh = p.window;
    var wh = function (a, b) {
        if (ba(a) == "function") {
            if (b) {
                a = r(a, b);
            }
        } else if (a && typeof a.handleEvent == "function") {
            a = r(a.handleEvent, a);
        } else {
            h(Error("Invalid listener argument"));
        }
        vh.setTimeout(a, 200);
    };
    var xh = function () {
        this.L = {};
    };
    t(xh, ih);
    aa(xh);
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
    n.Kd = function () {
        return !this.Ld || ac.indexOf("6") != 0;
    };
    n.cb = function (a) {
        if (!this.yc || !(oa() - this.yc < 1000)) {
            var b = parseInt(this.getData(a, "tooltip-hide-timer"), 10);
            if (b) {
                vd(a, "tooltip-hide-timer");
                pd(b);
            }
            var b = r(function () {
                yh(this, a);
                vd(a, "tooltip-show-timer");
            }, this);
            var c = parseInt(this.getData(a, "tooltip-show-delay"), 10) || 0;
            var b = M(b, c);
            this.setData(a, "tooltip-show-timer", b.toString());
            if (a.title) {
                this.setData(a, "tooltip-text", a.title);
                a.title = "";
            }
        }
    };
    n.Lb = function (a) {
        var b = parseInt(this.getData(a, "tooltip-show-timer"), 10);
        if (b) {
            pd(b);
            vd(a, "tooltip-show-timer");
        }
        b = r(function () {
            zh(this, a);
            vd(a, "tooltip-hide-timer");
        }, this);
        b = M(b, 50);
        this.setData(a, "tooltip-hide-timer", b.toString());
        if ((b = this.getData(a, "tooltip-text"))) {
            a.title = b;
        }
    };
    n.Cd = function (a, b, c) {
        this.yc = 0;
        this.cb(eh(W(this), c.changedTouches[0].target, dh(b, W(this))), b);
    };
    n.tc = function (a, b, c) {
        this.yc = oa();
        this.Lb(eh(W(this), c.changedTouches[0].target, dh(b, W(this))), b);
    };
    var Ah = function (a, b, c, d) {
        a.setData(b, "tooltip-text", c);
        var e = a.getData(b, "content-id");
        if ((e = G(e))) {
            e.innerHTML = c;
            if (d) {
                zh(a, b);
            }
        }
    };
    xh.prototype.Ab = function (a) {
        return this.getData(a, "tooltip-text") || a.title;
    };
    var yh = function (a, b) {
        if (b) {
            var c = a.Ab(b);
            if (c) {
                var d = G(Bh(a, b));
                if (!d) {
                    d = document.createElement("div");
                    d.id = Bh(a, b);
                    d.className = W(a, "tip");
                    var e = document.createElement("div");
                    e.className = W(a, "tip-body");
                    var f = document.createElement("div");
                    f.className = W(a, "tip-arrow");
                    var g = document.createElement("div");
                    g.className = W(a, "tip-content");
                    var j = a.Kb(b);
                    var o = Bh(a, b, "content");
                    g.id = o;
                    a.setData(b, "content-id", o);
                    e.appendChild(g);
                    if (j) {
                        d.appendChild(j);
                    }
                    d.appendChild(e);
                    d.appendChild(f);
                    (Id() || document.body).appendChild(d);
                    Ah(a, b, c);
                    if ((c = parseInt(a.getData(b, "tooltip-max-width"), 10)) && e.offsetWidth > c) {
                        e.style.width = c + "px";
                        v(g, W(a, "normal-wrap"));
                    }
                    g = z(b, W(a, "reverse"));
                    if (!a.Md(b, d, e, j, f, g)) {
                        a.Md(b, d, e, j, f, !g);
                    }
                    var x = W(a, "tip-visible");
                    M(function () {
                        v(d, x);
                    }, 0);
                }
            }
        }
    };
    xh.prototype.Md = function (a, b, c, d, e, f) {
        A(b, W(this, "tip-reverse"), f);
        var g = 0;
        if (f) {
            g = 1;
        }
        var e = xe(a);
        var f = new B((e.width - 10) / 2, f ? e.height : 0);
        var j = re(a);
        Zg(new B(j.x + f.x, j.y + f.y), b, g);
        var g = oc(window);
        var j = ue(b);
        var b = xe(c);
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
    var zh = function (a, b) {
        if (b) {
            var c = G(Bh(a, b));
            if (c) {
                Ch(c);
                zc(c);
                vd(b, "content-id");
            }
        }
    };
    var Bh = function (a, b, c) {
        a = W(a) + zd(b);
        if (c) {
            a += "-" + c;
        }
        return a;
    };
    xh.prototype.Kb = function (a) {
        var b = l;
        if (Ib && z(a, W(this, "masked"))) {
            if ((b = G("yt-uix-tooltip-shared-mask"))) {
                b.parentNode.removeChild(b);
                S(b);
            } else {
                b = document.createElement("iframe");
                b.src = 'javascript:""';
                b.id = "yt-uix-tooltip-shared-mask";
                b.className = W(this, "tip-mask");
            }
        }
        return b;
    };
    var Ch = function (a) {
        var b = G("yt-uix-tooltip-shared-mask");
        var c =
            b &&
            Kc(
                b,
                function (b) {
                    return b == a;
                },
                m,
                2
            );
        if (b && c) {
            b.parentNode.removeChild(b);
            T(b);
            document.body.appendChild(b);
        }
    };
    var Dh = function () {
        this.L = {};
    };
    t(Dh, xh);
    aa(Dh);
    n = Dh.prototype;
    n.K = "range-tooltip";
    n.Ib = l;
    n.format = l;
    n.max = 0;
    n.df = 0;
    n.cf = 0;
    n.sc = l;
    n.Ab = function () {
        return " ";
    };
    n.Md = function (a, b) {
        this.Ib = b;
        var c = this.getData(a, this.K + "-format");
        if (c) {
            this.format = q(c);
        }
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
        if (!this.rf) {
            xh.prototype.cb.call(this, a, b);
            Q(document, "mousemove", fh);
        }
    };
    n.Lb = function (a, b) {
        xh.prototype.Lb.call(this, a, b);
        Rd(document, "mousemove", fh);
    };
    n.Cd = function (a, b, c) {
        if (!this.sc) {
            this.sc = c.changedTouches[0].identifier;
            xh.prototype.Cd.call(this, a, b, c);
            Q(document, "touchmove", fh);
            this.bf(0, b, c);
        }
    };
    n.tc = function (a, b, c) {
        xh.prototype.tc.call(this, a, b, c);
        Rd(document, "touchmove", fh);
        this.rf = k;
        wh(function () {
            this.rf = m;
        }, this);
        this.sc = l;
    };
    n.af = function (a, b, c) {
        if (this.Ib) {
            b = (c.pageX - this.df) / this.cf;
            b = Math.min(Math.max(b, 0), 1);
            b *= this.max;
            if (this.format) {
                b = this.format(b);
            }
            Ah(this, a, b);
            var b = J(W(this, "tip-body"), this.Ib);
            var d = this.Ib;
            var e = new B(-5, 0);
            var a = re(a);
            Zg(new B(c.pageX + e.x, a.y + e.y), d, 0);
            c = (xe(b).width + 3) / -2 - -5;
            b.style.left = c + "px";
        }
    };
    n.bf = function (a, b, c) {
        if (this.Ib) {
            for (a = 0; a < c.changedTouches.length; a++) {
                var d = c.changedTouches[a];
                if (d.identifier == this.sc) {
                    c.pageX = d.pageX;
                    c.pageY = d.pageY;
                    this.af(eh(W(this), d.target, dh(b, W(this))), 0, c);
                    break;
                }
            }
        }
    };
    var Eh = function (a, b, c) {
        window.location = Se(a, b || {}) + (c || "");
    };
    var Fh = function (a, b) {
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
                if (D && c.indexOf(";") != -1) {
                    c = "'" + c.replace(/'/g, "%27") + "'";
                }
                d.opener = l;
                if (Pb) {
                    d.location.href = c;
                } else {
                    c = Aa(c);
                    d.document.write('<META HTTP-EQUIV="refresh" content="0; url=' + c + '">');
                    d.document.close();
                }
            }
        } else {
            d = e.open(c, f, j);
        }
        c = d;
        if (!c) {
            return k;
        }
        if (!c.opener) {
            c.opener = window;
        }
        c.focus();
        return m;
    };
    var Gh = function () {
        this.L = {};
    };
    t(Gh, ih);
    aa(Gh);
    n = Gh.prototype;
    n.K = "overlay";
    n.M = function () {
        this.addBehavior("click", this.vf, "target");
        this.addBehavior("click", this.uc, "close");
    };
    n.vf = function (a) {
        if ((a = jh(this, a))) {
            var b = W(this, "fg");
            var c = G(b);
            if (!c) {
                var d = this.rb(a);
                if (d) {
                    c = document.createElement("div");
                    c.id = b;
                    c.className = b;
                    b = this.getData(a, "overlay-class") || "";
                    v(c, b);
                    var e = document.createElement("div");
                    e.className = W(this, "fg-content");
                    var b = document.createElement("div");
                    var f = W(this, "base");
                    b.id = f;
                    v(b, f);
                    var g = W(this, "bg");
                    var f = document.createElement("div");
                    f.id = g;
                    f.className = g;
                    f.style.height = pc() + "px";
                    g = document.createElement("span");
                    v(g, W(this, "align"));
                    b.appendChild(g);
                    e.innerHTML = d.innerHTML;
                    d = H("iframe", l, e);
                    u(
                        d,
                        function (a) {
                            var b = this.getData(a, "onload");
                            if (b) {
                                if ((b = q(b))) {
                                    Q(a, "load", b);
                                }
                                a.src = this.getData(a, "src") || a.src;
                            }
                        },
                        this
                    );
                    c.appendChild(e);
                    d = document.getElementsByTagName("embed");
                    e = document.getElementsByTagName("object");
                    g = r(function (a) {
                        var b = a.style.visibility;
                        if (b != "hidden") {
                            this.setData(a, "overlay-hidden", "true");
                            if (b) {
                                this.setData(a, "overlay-visibility-value", b);
                            }
                            a.style.visibility = "hidden";
                        }
                    }, this);
                    u(d, g);
                    u(e, g);
                    b.appendChild(c);
                    document.body.appendChild(f);
                    document.body.appendChild(b);
                    if (!this.getData(a, "disable-shortcuts")) {
                        c = r(function (a) {
                            if (z(a.target, W(this, "base"))) {
                                this.uc();
                            }
                        }, this);
                        Q(b, "click", c);
                        Q(document, "keydown", r(this.oc, this));
                    }
                    this.wa(a, "overlay-shown");
                }
            }
        }
    };
    n.uc = function () {
        var a = W(this, "bg");
        var b = G(W(this, "fg"));
        if (b) {
            if (z(b, W(this, "unclosable"))) {
                return;
            }
            T(b);
            document.body.removeChild(b.parentNode);
        }
        if ((a = G(a))) {
            document.body.removeChild(a);
        }
        var a = document.getElementsByTagName("embed");
        var b = document.getElementsByTagName("object");
        var c = r(function (a) {
            if (this.getData(a, "overlay-hidden")) {
                vd(a, "overlay-hidden");
                var b = this.getData(a, "overlay-visibility-value");
                a.style.visibility = b ? b : l;
            }
        }, this);
        u(a, c);
        u(b, c);
        Rd(document, "keydown", r(this.oc, this));
    };
    n.oc = function (a) {
        if (a.keyCode == 27) {
            this.uc();
        }
    };
    n.rb = function (a) {
        return J(W(this, "content"), a);
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
    var Ih = ["FL", "LL", "QL", "SV", "WL"];
    var Jh = function () {
        return parseInt(L("SHUFFLE_VALUE"), 10) || 0;
    };
    var Kh = function () {
        var a = ae("watch_queue_new");
        if (a) {
            return a.split(",");
        } else {
            return [];
        }
    };
    var Lh = function (a) {
        a = hb(a, 0, 100);
        if ((a = a.join(","))) {
            $d("watch_queue_new", a);
        } else {
            be("watch_queue_new");
        }
    };
    var Mh = function (a) {
        var b = Kh();
        gb(b, a);
        Lh(b);
    };
    var Nh = function (a, b) {
        if (a.length) {
            U("/video_info_ajax", {
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
    var Oh = function (a) {
        var b = Jh();
        var c = function (a) {
            var c = 1;
            var d = [];
            for (var a = a.split(""); a.length;) {
                var c = (b + c) % a.length;
                var e = a[c];
                cb(a, c);
                d.push(e);
            }
            return d.join("");
        };
        var d = [];
        u(a, function (a, b) {
            d.push({
                id: a,
                key: c(a),
                index: b
            });
        });
        lb(d);
        var e = b >> 8;
        Xa(d, function (a) {
            return e == a.index;
        });
        a = hb(d, e).concat(hb(d, 0, e));
        return Va(a, function (a) {
            return {
                id: a.id,
                od: a.index
            };
        });
    };
    var Y = function (a, b, c) {
        this.ia = a;
        this.G = b;
        this.ha = this.Rb = m;
        this.Oc = new lf();
        this.D = c || [];
        this.lb = {};
        this.Qb = !c;
        this.jb = "";
        this.F = -1;
        this.nb = 1;
        this.Pb = this.ja = 0;
        this.hb = this.ib = "";
        this.Ga = this.Sa = this.ya = l;
    };
    var Ph = function (a) {
        a.Oc.xc("LIST_UPDATED");
    };
    Y.prototype.isEqual = function (a) {
        if (this.ia != a.ia) {
            return m;
        } else {
            return this.Ba() == a.Ba();
        }
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
                u(this.sa(), function (b) {
                    a[b] = (a[b] || 0) + 1;
                });
                return a;
            })[b] || 0
        );
    };
    var Th = function (a) {
        if (a.Y()) {
            return Sh(a);
        } else {
            return a.sa();
        }
    };
    Y.prototype.td = function (a) {
        var b = Th(this);
        if (!b.length) {
            return "";
        }
        a = this.X() + a;
        if (a >= b.length) {
            a %= b.length;
        }
        return b[a];
    };
    var Uh = function (a, b) {
        var c = Th(a);
        return Va(b, function (a) {
            return $a(c, function (b) {
                return b == a;
            });
        });
    };
    Y.prototype.sa = function () {
        return eb(this.D);
    };
    var Sh = function (a) {
        return Qh(a, "shuffled_ids", function () {
            return Va(Vh(this), function (a) {
                return a.id;
            });
        });
    };
    var Vh = function (a) {
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
        if (this.Y()) {
            return Xa(
                Vh(this),
                function (a) {
                    return a.od == this.F;
                },
                this
            );
        } else {
            return this.F;
        }
    };
    n.Y = function () {
        return this.ja > 0;
    };
    n.pa = function () {
        return this.F >= 0;
    };
    n.mb = function () {
        return !!this.Rb;
    };
    n.Sc = function () {
        return !!L("LIST_COPY_ON_EDIT_ENABLED");
    };
    n.Va = function () {
        return m;
    };
    var Wh = function (a) {
        a.ya = l;
        a.Sa = l;
    };
    var Yh = function (a, b) {
        var c = a.X() - 1;
        if (c < 0) {
            c = a.N() - 1;
        }
        return Xh(a, c, m, b);
    };
    var Xh = function (a, b, c, d) {
        var e = Th(a)[b];
        if (!e) {
            return l;
        }
        var f = {
            v: e
        };
        if (Rh(a, e) > 1) {
            e = b + 1 + a.Pb;
            if (a.Y()) {
                e = Vh(a)[b].od + 1;
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
        return Ue(a.jb, f);
    };
    Y.prototype.clear = function () {
        this.yf();
        Ph(this);
    };
    Y.prototype.removeItem = function (a) {
        if (this.Y()) {
            a = Vh(this)[a].od;
        }
        var b = this.sa()[a];
        this.Re(a);
        if (this.F > a) {
            this.F -= 1;
        } else if (this.F == a) {
            this.F = -1;
        }
        Ph(this);
        return b;
    };
    Y.prototype.Re = function (a) {
        var b = this.D[a];
        cb(this.D, a);
        U(this.ac(), {
            format: "XML",
            method: "POST",
            n: {
                video_ids: b,
                session_token: V.addto_ajax || "",
                playlist_id: this.G || "",
                index: a
            },
            f: function (a, b) {
                this.ya = b.html_content;
            },
            B: function (a, b) {
                this.Sa = b.error_message || N("ERROR_OCCURRED");
            },
            ga: function () {
                Ph(this);
            },
            j: this
        });
    };
    Y.prototype.load = function (a) {
        if (this.Qb && !this.Rb) {
            Zh(this, a);
        } else if (a) {
            Ph(this);
            a();
        }
        $h(this);
    };
    var $h = function (a) {
        var b = Th(a);
        var b = Ua(
            b,
            function (a) {
                return !(a in this.lb);
            },
            a
        );
        u(
            b,
            function (a) {
                this.lb[a] = {};
            },
            a
        );
        Nh(
            b,
            r(function (a) {
                for (var b in a) {
                    this.lb[b] = a[b];
                }
                Ph(this);
            }, a)
        );
    };
    var Zh = function (a, b, c) {
        a.Rb = k;
        a.Qb = m;
        var d = {
            style: "bottomfeedr_json",
            action_get_list: 1,
            list: a.Ba()
        };
        if (c) {
            Bb(d, c);
        }
        U("/list_ajax", {
            g: d,
            f: function (a, b) {
                var c = b.data;
                this.D = eb(c.videos);
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
                this.Rb = m;
                $h(this);
                Ph(this);
                if (b) {
                    b();
                }
            },
            j: a
        });
    };
    var ai = function (a, b, c) {
        a.Ga = {};
        try {
            b.call(c);
        } finally {
            a.Ga = l;
        }
    };
    var Qh = function (a, b, c) {
        if (a.Ga && b in a.Ga) {
            return a.Ga[b];
        }
        c = c.call(a);
        if (a.Ga) {
            a.Ga[b] = c;
        }
        return c;
    };
    var bi = function (a, b) {
        Y.call(this, "FL", a, b);
    };
    t(bi, Y);
    bi.prototype.ac = function () {
        return "/addto_ajax?action_delete_from_favorites=1";
    };
    var ci = function (a, b) {
        Y.call(this, "LL", a, b);
    };
    t(ci, Y);
    ci.prototype.ac = function () {
        return "/addto_ajax?action_delete_from_liked=1";
    };
    var di = function (a, b) {
        Y.call(this, "ML", a, b);
    };
    t(di, Y);
    di.prototype.Sc = function () {
        return !!this.ha;
    };
    di.prototype.Va = function () {
        return !!this.ha;
    };
    var ei = function (a, b, c) {
        Y.call(this, a, b, c);
    };
    t(ei, Y);
    n = ei.prototype;
    n.Wc = function (a) {
        gb(this.D, a);
        U("/addto_ajax", {
            format: "XML",
            method: "POST",
            g: {
                action_add_to_playlist: 1
            },
            n: {
                playlist_id: this.G,
                video_ids: a.join(","),
                session_token: V.addto_ajax
            },
            B: function () {
                this.Sa = N("ERROR_OCCURRED");
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
        bb(this.D);
        U("/addto_ajax", {
            format: "XML",
            method: "POST",
            g: {
                action_clear_playlist: 1,
                list_length: a,
                type: this.ia
            },
            n: {
                playlist_id: this.G,
                session_token: V.addto_ajax
            },
            B: function () {
                this.Sa = N("ERROR_OCCURRED");
                Ph(this);
            },
            j: this
        });
    };
    n.ye = function (a, b) {
        var c = this.D[a];
        cb(this.D, a);
        ib(this.D, b, 0, c);
        var d = eb(this.D);
        U("/addto_ajax?action_move_playlist_video=1", {
            format: "XML",
            method: "POST",
            n: {
                video_ids: c,
                playlist_id: this.G,
                source_index: a,
                target_index: b,
                session_token: V.addto_ajax
            },
            B: function () {
                var e;
                e = this.D;
                a: if (!ea(e) || !ea(d) || e.length != d.length) {
                    e = m;
                } else {
                    for (var f = e.length, g = 0; g < f; g++) {
                        if (e[g] !== d[g]) {
                            e = m;
                            break a;
                        }
                    }
                    e = k;
                }
                if (e) {
                    cb(this.D, b);
                    ib(this.D, a, 0, c);
                }
                this.Sa = N("ERROR_OCCURRED");
                Ph(this);
            },
            j: this
        });
    };
    n.Va = function () {
        return !!this.ha;
    };
    var fi = function (a) {
        Y.call(this, "QL", l);
        this.ha = k;
        this.Qb = !a;
    };
    t(fi, Y);
    n = fi.prototype;
    n.ld = function (a) {
        fi.Ue.ld.call(this, a);
        this.Qb = m;
    };
    n.sa = function () {
        return Kh();
    };
    n.Wc = function (a) {
        Mh(a);
    };
    n.Re = function (a) {
        var b = Th(this)[a];
        var a = Kh();
        var b = Ta(a, b);
        if (b >= 0) {
            cb(a, b);
            Lh(a);
        }
    };
    n.yf = function () {
        Lh([]);
    };
    n.ye = function (a, b) {
        var c = Kh();
        var d = c[a];
        cb(c, a);
        ib(c, b, 0, d);
        Lh(c);
    };
    n.Va = function () {
        return !!this.ha;
    };
    var gi = function (a, b) {
        Y.call(this, "SV", a, b);
        this.ha = k;
    };
    t(gi, Y);
    gi.prototype.load = function (a) {
        gi.Ue.load.call(this, a);
        if (!this.mb() && this.pa()) {
            a = Th(this);
            if (this.X() >= a.length - 1) {
                Zh(this, l, {
                    load_more: "1"
                });
            }
        }
    };
    gi.prototype.ac = function () {
        return "/addto_ajax?action_delete_from_station=1";
    };
    var hi = function (a, b, c) {
        var d = l;
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
    var ii = 0;
    var ji = 0;
    var ki = 0;
    var li = 0;
    var mi = m;
    var ni = function () {
        var a = oc(window);
        return qc(document).y + a.height + ji;
    };
    var pi = function () {
        var a = ni();
        var b = ki;
        li = a;
        var c = Math.abs(b - a);
        if (!b || c >= 400) {
            c = oi(a);
            for (b = oi(b); b < c;) {
                Rg("thumb-group-" + c);
                c--;
            }
            ki = a;
        }
    };
    var ri = function () {
        for (var a = oi(li); a >= 0; a--) {
            Rg("thumb-group-" + a);
        }
    };
    var ti = function (a) {
        si(function (a, c) {
            var d = P(a, "group-key");
            if (d) {
                Qg(a, d);
                vd(a, "group-key");
            }
            a.src = c;
        }, a);
    };
    var ui = function (a, b) {
        if (mi) {
            si(function (a, d) {
                var e = P(a, "group-key");
                if (!P(a, "thumb-manual") && (!e || !!b)) {
                    if (e) {
                        Qg(a, e);
                    }
                    if ((e = G(a))) {
                        var f = 0;
                        var g = 0;
                        if (e.offsetParent) {
                            do {
                                f += e.offsetLeft;
                                g += e.offsetTop;
                            } while ((e = e.offsetParent));
                        }
                        e = new B(f, g);
                    } else {
                        e = l;
                    }
                    e = "thumb-group-" + oi(e.y);
                    Pg(a, d, e);
                    O(a, "group-key", e);
                }
            }, a);
        }
    };
    var si = function (a, b) {
        var c = H("img", l, b);
        u(c, function (b) {
            var c = P(b, "thumb");
            if (c) {
                a.call(p, b, c);
            }
        });
    };
    var oi = function (a) {
        return Math.ceil(Math.max(0, a - ii) / 400);
    };
    if (!D) {
        if (Ob) {
            E("1.9.3");
        }
    }
    new lf();
    var wi = function (a, b) {
        this.wf = a;
        var c = b || l;
        if (!c) {
            c = vi(this.wf);
        }
        c = qa("__%s__", "(" + c.join("|") + ")");
        this.Di = RegExp(c, "g");
    };
    var xi = /__([a-z]+(?:_[a-z]+)*)__/g;
    var yi = function (a, b) {
        var c = G(a).innerHTML;
        var c = c.replace(/^\s*(<\!--\s*)?/, "");
        var c = c.replace(/(\s*--\>)?\s*$/, "");
        return new wi(c, b);
    };
    var vi = function (a) {
        var b = [];
        var c = {};
        a.replace(xi, function (a, e) {
            if (!(e in c)) {
                c[e] = k;
                b.push(e);
            }
        });
        return b;
    };
    wi.prototype.qb = function (a, b, c) {
        return this.wf.replace(
            this.Di,
            r(function (d, e) {
                if (b) {
                    e = b(e);
                }
                if (c) {
                    return a[e] || "";
                } else {
                    return Aa(a[e] || "");
                }
            }, this)
        );
    };
    var zi = function () {
        this.L = {};
    };
    t(zi, ih);
    aa(zi);
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
            var b = jh(this, a);
            var a = parseInt(this.getData(a, "slider-num"), 10);
            if (isNaN(a) || a < 0) {
                a = 0;
            }
            this.zc(b, a);
        }
    };
    n.si = function (a, b, c) {
        if (a) {
            a = jh(this, a);
            if (z(a, W(this, "fluid"))) {
                if (a) {
                    var d = this.Ma(a);
                    var e = Ai(this, Bi(this, d));
                    var f = e.length > 0;
                    var b = parseInt(this.getData(a, "scroll-offset"), 10);
                    if (isNaN(b) || b > 0) {
                        b = 0;
                    }
                    var g = d.offsetWidth;
                    if (f) {
                        d = Ci(e);
                        g = Math.floor(g / d);
                        b = Math.abs(Math.floor(b / d)) - 1;
                        Di(this, a, (b >= 0 ? b : 0) + g);
                    } else {
                        if (this.Ld && document.documentMode < 8) {
                            if (Math.abs(b - g) < d.scrollWidth) {
                                b -= g;
                            }
                        } else if (d.offsetWidth < d.scrollWidth) {
                            b -= g;
                        }
                        Ei(this, a, b);
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
    n.ui = function (a, b, c) {
        if (a) {
            a = jh(this, a);
            if (z(a, W(this, "fluid"))) {
                if (a) {
                    var d = this.Ma(a);
                    var e = Ai(this, Bi(this, d));
                    var f = e.length > 0;
                    var b = parseInt(this.getData(a, "scroll-offset"), 10);
                    if (isNaN(b) || b > 0) {
                        b = 0;
                    }
                    d = d.offsetWidth;
                    if (f) {
                        e = Ci(e);
                        f = Math.floor(d / e);
                        b = Math.abs(Math.floor(b / e)) - 1;
                        Di(this, a, (b >= 0 ? b : 0) - f);
                    } else {
                        b += d;
                        if (b > 0) {
                            b = 0;
                        }
                        Ei(this, a, b);
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
    n.cb = function (a) {
        if ((a = jh(this, a))) {
            var b = W(this, "ajax-trigger");
            var c = kc(b, a);
            u(c, function (a) {
                w(a, b);
            });
            Fi(this, a);
        }
    };
    var Fi = function (a, b, c) {
        var d = a.getData(b, "slider-ajax-url");
        if (d && !a.getData(b, "slider-loaded")) {
            a.setData(b, "slider-loaded", "true");
            U(d, {
                j: a,
                f: function (a, d) {
                    var g = wc(d.slides_html);
                    var j = J(W(this, "slides"), b);
                    if (j && g) {
                        xc(j, g);
                    }
                    if (c) {
                        c();
                    }
                }
            });
        }
    };
    zi.prototype.zc = function (a, b) {
        if (a) {
            if (this.getData(a, "slider-ajax-url") && !this.getData(a, "slider-loaded")) {
                Fi(this, a, r(this.zc, this, a, b));
            } else {
                Gi(this, a, b);
            }
        }
    };
    var Gi = function (a, b, c) {
        var d = H(l, W(a, "num"), b);
        var e = W(a, "num-current");
        var f;
        u(
            d,
            function (a) {
                f = this.getData(a, "slider-num") == c;
                A(a, e, f);
                A(a, "yt-uix-pager-selected", f);
                if (z(a, "yt-uix-button")) {
                    A(a, "yt-uix-button-toggled", f);
                }
            },
            a
        );
        if ((d = J(W(a, "slides"), b))) {
            var g = Bi(a, d);
            if (g) {
                var j = c * -1 * g.offsetWidth + "px";
                if (se(g)) {
                    d.style.right = j;
                } else {
                    d.style.left = j;
                }
            }
        }
        if ((d = J("yt-uix-pager-current-page", b))) {
            d.innerHTML = c + 1;
        }
        a.setData(b, "slider-current", c + "");
        Hi(a, b);
    };
    var Hi = function (a, b) {
        if (b) {
            var c = parseInt(a.getData(b, "slider-current"), 10);
            var d = parseInt(a.getData(b, "slider-slides"), 10);
            var e = kc(W(a, "next"), b);
            var f = kc(W(a, "prev"), b);
            u(e, function (a) {
                a.disabled = m;
            });
            u(f, function (a) {
                a.disabled = m;
            });
            if (c == 0) {
                u(f, function (a) {
                    a.disabled = k;
                });
            }
            if (c == d - 1) {
                u(e, function (a) {
                    a.disabled = k;
                });
            }
        }
    };
    var Di = function (a, b, c) {
        if (b) {
            var d = a.Ma(b);
            var e = Ai(a, Bi(a, d));
            if (!(e.length <= 0)) {
                if (c >= e.length) {
                    c = e.length - 1;
                }
                var f = parseInt(a.getData(b, "scroll-offset"), 10);
                if (isNaN(f) || f > 0) {
                    f = 0;
                }
                var d = d.offsetWidth;
                var g = Ci(e);
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
                f = se(b) ? c.offsetLeft - d + g + 10 : (c.offsetLeft - 10) * -1;
                Ei(a, b, f);
            }
        }
    };
    var Ei = function (a, b, c) {
        if (b) {
            if (isNaN(c)) {
                c = 0;
            }
            var d = a.Ma(b);
            var e = Bi(a, d);
            var f = H(l, W(a, "title"), e);
            var g = z(b, W(a, "scroll"));
            var j = se(b);
            if (g) {
                d.scrollLeft = j ? (Ob ? c : d.scrollWidth - d.offsetWidth + c) : -c;
            } else {
                var o = j ? "right" : "left";
                e.style[o] = c + "px";
                u(f, function (a) {
                    a.style[o] = c * -1 + "px";
                });
            }
            a.setData(b, "scroll-offset", c + "");
        }
    };
    zi.prototype.Ma = function (a) {
        return J(W(this, "body"), a);
    };
    var Bi = function (a, b) {
        return J(W(a, "slide"), b);
    };
    var Ai = function (a, b) {
        return H(l, W(a, "slide-unit"), b);
    };
    var Ci = function (a) {
        if (a.length == 0) {
            return 0;
        }
        var b = a[0];
        var c = b.offsetWidth;
        if (a.length > 1) {
            a = a[1];
            c = se(b) ? b.offsetLeft - a.offsetLeft : a.offsetLeft - b.offsetLeft;
        }
        return c;
    };
    var Ii = function (a, b) {
        var c = a.Ma(b);
        var d = Ai(a, Bi(a, c));
        if (!d.length) {
            return [];
        }
        var e = parseInt(a.getData(b, "scroll-offset"), 10);
        if (isNaN(e) || e > 0) {
            e = 0;
        }
        var f = c.offsetWidth;
        var g = Ci(d);
        var c = Math.floor(-e / g);
        var c = Math.max(0, c);
        var e = Math.ceil((-e + f) / g);
        var e = Math.min(e, d.length);
        return hb(fb(d), c, e);
    };
    var Ki = function (a, b) {
        this.V = !!b;
        this.r = a;
        this.Ka = this.V ? G("watch-tray-playlist-slider") : G("playlist-bar-tray");
        this.W = Ed("ol", l, this.Ka);
        this.ah = G("playlist-bar-title");
        this.Zg = G("playlist-bar-extras-menu");
        var c = wb(Ji);
        var d = G("playlist-bar-template");
        if (this.V) {
            d = G("watch-tray-playlist-item-template");
        }
        this.hh = yi(d, c);
        d = P(d, "video-thumb-url") || "";
        this.ih = new wi(d, c);
        R(
            this.Ka,
            "click",
            r(function () {
                M(r(this.He, this), 0);
            }, this),
            "playlist-bar-tray-button"
        );
    };
    var Ji = {
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
        if (f) {
            this.ah.innerHTML = f;
            this.Zg.innerHTML = c.hb;
        }
        var g = [];
        u(
            a,
            function (a, d) {
                var f = d == b;
                var C = c.getVideoData(a);
                C.id = a;
                C.url = Xh(c, d);
                g.push(Li(this, C, d + 1 + e, f));
            },
            this
        );
        this.W.innerHTML = g.join("");
        if (d) {
            this.scroll(3);
        } else if (!this.V) {
            this.scroll(5);
        }
        d = kc("item-count", this.r);
        u(d, function (b) {
            b.innerHTML = a.length;
        });
        d = kc("playing-index", this.r);
        u(d, function (a) {
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
    Ki.prototype.He = function () {
        var a = Ii(zi.getInstance(), this.Ka);
        u(a, function (a) {
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
                        var f = Ai(c, Bi(c, c.Ma(e)));
                        var d = Ta(f, d);
                        if (d >= 0) {
                            Di(c, e, d);
                        }
                    }
                } else {
                    Di(c, this.Ka, 0);
                }
                break;
            case 4:
                if (b) {
                    Di(c, this.Ka, b);
                }
                break;
            case 5:
                e = this.Ka;
                d = c.getData(e, "scroll-offset");
                Ei(c, e, parseInt(d, 10) || 0);
        }
        this.He();
    };
    Ki.prototype.cc = function (a) {
        var b = 0;
        var c = r(function () {
            var d = H("li", "playlist-bar-item", this.W);
            var e = !(b % 2);
            u(a, function (a) {
                A(d[a], "playlist-bar-item-highlight", e);
            });
            b++;
            if (b < 6) {
                M(c, 150);
            }
        }, this);
        c();
    };
    var Z = function (a, b, c) {
        this.r = a;
        this.V = !!c;
        this.Ta = new Ki(this.r, this.V);
        this.pb = b;
        this.Ic = this.be = m;
        this.Rf = G("playlist-bar-bar");
        Q(this.Rf, "click", r(this.Tf, this));
        this.cg = G("playlist-bar-play-button");
        Q(this.cg, "click", r(this.Zf, this));
        if (this.V) {
            this.ge = G("watch-prev");
            this.Mc = G("watch-next");
        } else {
            this.ge = G("playlist-bar-prev-button");
            this.Mc = G("playlist-bar-next-button");
        }
        Q(this.ge, "click", r(this.$f, this));
        Q(this.Mc, "click", r(this.Xf, this));
        this.Lc = G("playlist-bar-autoplay-button");
        Q(this.Lc, "click", r(this.Sf, this));
        this.Vd = G("playlist-bar-shuffle-button");
        Q(this.Vd, "click", r(this.ag, this));
        this.Wd = G("playlist-bar-toggle-button");
        Q(this.Wd, "click", r(this.bg, this));
        this.Jc = G("playlist-bar-options-menu");
        R(this.Jc, "click", r(this.Yf, this), "yt-uix-button-menu-item");
        this.W = G("playlist-bar-tray-content");
        if (this.V) {
            this.W = G("watch-tray-playlist-content");
        }
        R(this.W, "click", r(this.Uf, this), "delete");
        R(this.W, "click", r(this.Vf, this), "load-lists");
        R(this.W, "click", r(this.Wf, this), "load-more");
        this.Hf = yi(G("playlist-bar-next-up-template"), ["video_encrypted_id"]);
        Mi(this, b);
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
    var Mi = function (a, b, c, d) {
        if (a.b && (a.b.Oc.clear("LIST_UPDATED"), a.pb.isEqual(b) || d)) {
            b.ld(a.pb);
            a.pb = b;
        }
        a.b = b;
        a.b.Oc.gc("LIST_UPDATED", a.Ua, a);
        a.b.load(c);
        a.Ua(k);
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
        return a.pa() && z(a.r, "autoplay-on");
    };
    var Oi = function (a, b) {
        if (b) {
            y(a.r, "autoplay-off", "autoplay-on");
        } else {
            y(a.r, "autoplay-on", "autoplay-off");
        }
        var c = de.getInstance();
        ie(Hh.$h, !b);
        c.save();
        md("LIST_AUTO_PLAY_ON", b);
    };
    Z.prototype.Y = function () {
        return z(this.r, "shuffle-on");
    };
    Z.prototype.mb = function () {
        return z(this.r, "loading");
    };
    Z.prototype.show = function () {
        if (he(de.getInstance(), Hh.ef)) {
            Pi(this);
        } else {
            Qi(this);
        }
    };
    Z.prototype.Z = function () {
        y(this.r, ["min", "max"], "hid");
    };
    var Pi = function (a) {
        y(a.r, ["hid", "max"], "min");
        Ri(a, k);
    };
    var Qi = function (a) {
        y(a.r, ["hid", "min"], "max");
        Ri(a, k);
    };
    n = Z.prototype;
    n.toggle = function () {
        var a;
        if (z(this.r, "min")) {
            Qi(this);
            a = m;
        } else {
            Pi(this);
            a = k;
        }
        Xg("bf", "toggleBar=1&collapsed=" + a, i);
        var b = de.getInstance();
        ie(Hh.ef, a);
        b.save();
        Si(this, k);
    };
    n.Tf = function (a) {
        if (
            !Kc(
                a.target,
                function (a) {
                    a = a.tagName && a.tagName.toLowerCase();
                    return a == "a" || a == "button";
                },
                k
            )
        ) {
            this.toggle();
        }
    };
    n.Yf = function (a) {
        a.stopPropagation();
        switch (P(a.currentTarget, "action")) {
            case "clear":
                this.clear();
                break;
            case "load-lists":
                Ti(this);
                break;
            case "show-active":
                if (this.pb) {
                    Mi(this, this.pb);
                }
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
        var a = !this.Y();
        var b = 0;
        md("SHUFFLE_ENABLED", a);
        if (a) {
            md("SHUFFLE_VALUE", Math.max(1, Math.random() * 1000000));
        }
        if (a) {
            y(this.r, "shuffle-off", "shuffle-on");
            b = Jh();
        } else {
            y(this.r, "shuffle-on", "shuffle-off");
        }
        this.b.ja = b;
        this.Ua();
        this.Ta.scroll(3);
    };
    n.Zf = function () {
        this.next(k, "bf_play");
    };
    n.$f = function () {
        var a = Yh(this.b, "bf_prev");
        if (a) {
            Eh(a);
        }
    };
    n.Xf = function () {
        this.next(k, "bf_next");
    };
    n.Uf = function (a) {
        a.preventDefault();
        a.stopPropagation();
        var b = this.V ? "watch-tray-playlist-item" : "playlist-bar-item";
        var c = H("li", b, this.W);
        var a = K(a.currentTarget, "li", b);
        var c = Ta(c, a);
        if (this.b.Sc()) {
            a = this.b.qa();
            Vi(this);
            Xg("bf", "copyFrom=1&action=delete&list_type=" + a, i);
        }
        var d = this.b.qa();
        var e = Th(this.b)[c];
        this.b.removeItem(c);
        Wi(this, N("PLAYLIST_VIDEO_DELETED"), m, m, function () {
            this.b.Wc([e]);
            this.Ua();
            var a = this.b.N() - 1;
            this.Ta.scroll(4, a);
            this.Ta.cc([a]);
            Xg("bf", "undo_delete=1&list_type=" + d, i);
        });
        Xg("bf", "delete=1&list_type=" + d, i);
    };
    var Xi = function (a) {
        if (!a.be) {
            a.be = k;
            Tg(
                (L("DRAGDROP_BINARY_URL") || "") + "",
                r(function () {
                    Q(
                        this.W,
                        "mouseover",
                        r(function () {
                            if (!this.Ic) {
                                this.Ic = k;
                                if (this.b.Va() && !this.b.Y()) {
                                    q("yt.www.lists.dragdrop").createDraggables();
                                }
                            }
                        }, this)
                    );
                    var a = this.V ? "watch-tray-playlist-item" : "playlist-bar-item";
                    var c = q("yt.www.lists.dragdrop");
                    c.init(this.W, a);
                    c.subscribe("DROPPED_AT_INDEX", this.Mg, this);
                }, a)
            );
        }
    };
    Z.prototype.Mg = function (a) {
        var b = a.sourceIndex;
        var a = a.targetIndex;
        if (b != a && !(b < 0) && !(a < 0)) {
            if (this.b.Sc()) {
                var c = this.b.qa();
                Vi(this);
                Xg("bf", "copyFrom=1&action=drag&list_type=" + c, i);
            }
            c = this.b;
            if (!c.Y() && c.Va()) {
                var d = Th(c);
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
                Ph(c);
            }
            b = Oe({
                moved_item_delta: Math.abs(a - b),
                list_type: this.b.qa()
            });
            Xg("bf", b, i);
        }
    };
    Z.prototype.next = function (a, b) {
        if (!a) {
            Xg("bf", "autoplay=1&playcount=" + this.b.nb, i);
        }
        var c;
        c = this.b;
        var d = c.X() + 1;
        if (d >= c.N()) {
            d = 0;
        }
        if ((c = Xh(c, d, !a, b))) {
            Eh(c);
        }
    };
    var Yi = function (a, b) {
        if (!(b < 1) && !(b > 5)) {
            Xg("bf", "delayedautoplay=" + b, i);
            yh(xh.getInstance(), a.Lc);
            var c = N("AUTOPLAY_WARNING" + b);
            if (c) {
                Wi(a, c, m, k);
            }
        }
    };
    Z.prototype.clear = function () {
        var a = this.b.sa();
        this.b.clear();
        Wi(this, N("LIST_CLEARED"), m, m, function () {
            this.b.Wc(a);
            this.Ua();
            Xg("bf", "undo_clear=1&list_type=" + b, i);
        });
        var b = this.b.qa();
        Xg("bf", "clear=1&list_type=" + b, i);
    };
    Z.prototype.td = function (a) {
        return this.b.td(a);
    };
    Z.prototype.Ua = function (a) {
        var b = this.b.mb();
        var c = !b && !!this.b.ha;
        var d = !this.b.N();
        var e = this.b.pa();
        if (e) {
            y(this.Jc, "passive", "active");
        } else {
            y(this.Jc, "active", "passive");
        }
        var f = [];
        var g = [];
        (e ? g : f).push("active");
        (!e ? g : f).push("passive");
        (b ? g : f).push("loading");
        (c ? g : f).push("editable");
        (d ? g : f).push("empty");
        y(this.r, f, g);
        if (!b) {
            ai(
                this.b,
                function () {
                    var b = Th(this.b);
                    var c = this.b.X();
                    this.Ta.qb(b, c, this.b, !!a, this.b.Pb);
                    this.Ic = m;
                },
                this
            );
        }
        b = this.b.Sa;
        c = this.b.ya;
        if (b) {
            Wi(this, b, k, m);
        } else if (c) {
            Wi(this, c, m, k);
        }
        Wh(this.b);
        Ri(this);
        if (this.b.Va() && this.b.N()) {
            Xi(this);
        }
    };
    var Ri = function (a, b) {
        if (!a.V) {
            var c = N("AUTOPLAY_OFF_TOOLTIP");
            if (Ni(a)) {
                c = N("AUTOPLAY_ON_TOOLTIP");
            }
            var d = N("SHUFFLE_OFF_TOOLTIP");
            if (a.Y()) {
                d = N("SHUFFLE_ON_TOOLTIP");
            }
            var e = N("NEXT_VIDEO_NOTHUMB_TOOLTIP");
            if (a.b.pa()) {
                var f = Th(a.b);
                var g = a.b.X();
                if ((f = (g = f[f.length == g + 1 ? 0 : g + 1]) && a.b.getVideoData(g)) && f.title) {
                    e = a.Hf.qb({
                        video_encrypted_id: g
                    });
                    e =
                        N("NEXT_VIDEO_TOOLTIP", {
                            "{next_video_title}": f.title
                        }) +
                        " " +
                        e;
                }
            }
            f = "";
            f = z(a.r, "min") ? N("SHOW_PLAYLIST_TOOLTIP") : N("HIDE_PLAYLIST_TOOLTIP");
            g = xh.getInstance();
            Ah(g, a.Mc, e);
            Ah(g, a.Lc, c);
            Ah(g, a.Vd, d);
            Ah(g, a.Wd, f, b);
        }
    };
    Z.prototype.Jb = l;
    Z.prototype.rc = l;
    var Zi = function (a) {
        if (a.Jb) {
            pd(a.Jb);
            a.Jb = l;
        }
    };
    var Wi = function (a, b, c, d, e) {
        if (b) {
            if (!a.Na) {
                a.Na = a.V ? G("watch-bar-notifications") : G("playlist-bar-notifications");
                R(a.Na, "click", r(a.Vh, a), "playlist-bar-undo");
            }
            a.rc = e || l;
            if (a.rc) {
                b += ' <a class="playlist-bar-undo">' + N("UNDO_LINK") + "</a>";
            }
            J("yt-alert-content", a.Na).innerHTML = b;
            A(a.Na, "yt-alert-error", !!c);
            A(a.Na, "yt-alert-success", !c);
            S(a.Na);
            Zi(a);
            if (d) {
                b = r(function () {
                    Si(this);
                }, a);
                a.Jb = M(b, 10000);
            }
        }
    };
    Z.prototype.showError = function (a, b) {
        Wi(this, a, k, b);
    };
    var Si = function (a, b) {
        var c = !!a.Jb;
        if (!b || !c) {
            T(a.Na);
            a.rc = l;
            Zi(a);
        }
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
        if (a.length) {
            this.Ta.cc(a);
            this.Ta.scroll(4, a[0]);
        }
    };
    var Ui = function (a) {
        if (!a.mb()) {
            Qi(a);
            $i(a, {
                g: {
                    action_get_save_playlist_form: 1
                },
                f: function (a, c) {
                    y(this.r, "lists", "save");
                    var d = c.html;
                    this.ke = G("playlist-bar-save");
                    this.ke.innerHTML = d;
                    d = G("playlist-bar-title-edit");
                    d.focus();
                    d.select();
                    Q(G("playlist-bar-save-cancel"), "click", r(this.Kg, this));
                    Q(G("playlist-bar-save-form"), "submit", r(this.Lg, this));
                }
            });
        }
    };
    Z.prototype.Kg = function (a) {
        a.preventDefault();
        w(this.r, "save");
    };
    Z.prototype.Lg = function (a) {
        a.preventDefault();
        var b = Th(this.b).join(",");
        if (b) {
            Si(this);
            a = $c(a.target);
            $i(this, {
                g: {
                    action_save_playlist: 1
                },
                method: "POST",
                za: a + ("&video_ids=" + b),
                f: function (a, b) {
                    this.ke.innerHTML = "";
                    w(this.r, "save");
                    Mi(this, hi("PL", b.list_id), l, k);
                    Wi(this, N("PLAYLIST_BAR_PLAYLIST_SAVED"), m, k);
                }
            });
        }
    };
    Z.prototype.Vf = function (a) {
        a.preventDefault();
        Ti(this);
    };
    Z.prototype.Wf = function () {
        var a = this.b;
        Zh(a, l, {
            load_more: "1"
        });
        Ph(a);
    };
    var Ti = function (a) {
        if (!a.mb()) {
            Qi(a);
            $i(a, {
                g: {
                    action_get_playlists: 1
                },
                f: function (a, c) {
                    y(this.r, "save", "lists");
                    this.Bg = G("playlist-bar-lists-back");
                    this.ng = Q(this.Bg, "click", r(this.Cg, this));
                    var d = c.html;
                    this.yb = G("playlist-bar-lists");
                    this.yb.innerHTML = d;
                    ti(this.yb);
                    this.og = R(this.yb, "click", r(this.Dg, this), "playlist-bar-playlist-item");
                }
            });
        }
    };
    Z.prototype.Dg = function (a) {
        a.preventDefault();
        var b = a.currentTarget;
        if (b) {
            aj(this);
            a = P(b, "list-type") || "";
            b = P(b, "list-id") || "";
            Mi(this, hi(a, b));
        }
    };
    Z.prototype.Cg = function (a) {
        a.preventDefault();
        aj(this);
    };
    var aj = function (a) {
        w(a.r, "lists");
        if (a.yb) {
            a.yb.innerHTML = "";
        }
        Nd(a.og);
        Nd(a.ng);
    };
    var $i = function (a, b) {
        v(a.r, "loading");
        Bb(b, {
            format: "JSON",
            B: function (a, b) {
                var e = N("ERROR_OCCURRED");
                if (b && b.errors) {
                    e = b.errors[0];
                }
                this.showError(e, k);
            },
            ga: function () {
                w(this.r, "loading");
            },
            j: a
        });
        U("/playlist_bar_ajax", b);
    };
    var cj = function () {
        var a = bj();
        var b = Th(a.b);
        var c = {};
        u(
            b,
            function (a) {
                c[a] = this.b.getVideoData(a);
            },
            a
        );
        var d = a.X();
        var e = Ni(a);
        var a = a.Y() ? a.b.ja : 0;
        return {
            autoPlay: e,
            index: d,
            shuffle: a,
            videoData: c,
            videoIds: b || []
        };
    };
    Z.prototype.X = function () {
        return this.b.X();
    };
    var Vi = function (a) {
        var b = a.b.sa();
        Lh([]);
        Mh(b);
        var b = new fi();
        var c = a.b.X();
        b.F = c;
        b.ja = a.b.ja;
        Mi(a, b);
    };
    var dj = l;
    var ej = m;
    var bj = function () {
        if (!dj) {
            var a = G("playlist-bar");
            var b = m;
            if (!a && L("ENABLE_WATCH6")) {
                a = G("watch-tray-playlist");
                b = k;
            }
            if (a) {
                var c = a;
                var d;
                if (z(c, "active")) {
                    d = P(c, "list-type") || "";
                    if (d == "QL") {
                        d = new fi(k);
                    } else {
                        var e = P(c, "list-id") || "";
                        var f = (P(c, "video-ids") || "").split(",");
                        d = hi(d, e, f);
                    }
                    e = parseInt(P(c, "index-offset"), 10) || 0;
                    d.Pb = e;
                    d.F = parseInt(L("PLAYLIST_BAR_PLAYING_INDEX"), 10) || 0;
                    d.nb = parseInt(L("LIST_AUTO_PLAY_VALUE"), 10) || 0;
                    e = 0;
                    if (L("SHUFFLE_ENABLED")) {
                        e = Jh();
                    }
                    d.ja = e;
                } else {
                    d = new fi(k);
                }
                e = P(c, "video-url");
                d.jb = e || "";
                c = z(c, "editable");
                d.ha = c;
                d.ib = G("playlist-bar-title").innerHTML;
                d.hb = G("playlist-bar-extras-menu").innerHTML;
                dj = new Z(a, d, b);
            }
        }
        return dj;
    };
    var fj = function (a) {
        var b = bj();
        if (Ni(b)) {
            if (a > 0) {
                Yi(b, a);
                M(function () {
                    fj(a - 1);
                }, 1000);
            } else {
                b.next(m, "mr_meh");
            }
        }
    };
    var gj = function (a, b, c, d) {
        if (ej) {
            var e = bj();
            if (e) {
                a = hi(a, b);
                b = k;
                if (e.pa()) {
                    b = e.b.isEqual(a);
                }
                if (b) {
                    Mi(e, a, function () {
                        e.cc(c);
                        Wi(e, d, m, k);
                    });
                    e.show();
                } else {
                    Wi(e, d, m, k);
                }
            }
        }
    };
    var hj = function (a) {
        var b = a.getDuration();
        for (var c = 5; c > 0; c--) {
            a.addCueRange("NEAR_END" + c, b - c, b - c + 1);
        }
        a.addEventListener("onCueRangeEnter", "yt.www.lists.handleNearPlaybackEnd");
    };
    var ij = function () {
        if (!ej || !bj().pa()) {
            return m;
        }
        var a = bj().qa();
        return !ab(Ih, a);
    };
    var jj = -1;
    var lj = function (a) {
        var a = !!a;
        var b = G("page");
        var c = G("watch-sidebar");
        var d = G("baseDiv");
        var e = L("WIDE_PLAYER_STYLES");
        var f = 0;
        if ("webkitTransition" in c.style) {
            f = document.defaultView.getComputedStyle(c, l);
            f = parseFloat(f["-webkit-transition-duration"]) * 1000;
        } else if ("MozTransition" in c.style) {
            f = document.defaultView.getComputedStyle(c, l);
            f = parseFloat(f.getPropertyValue("-moz-transition-duration")) * 1000;
        } else if ("OTransition" in c.style) {
            f = document.defaultView.getComputedStyle(c, l);
            f = parseFloat(f.getPropertyValue("-o-transition-duration")) * 1000;
        }
        if (a) {
            v(b, "watch-wide");
            M(function () {
                kj();
                for (var a = 0; a < e.length; ++a) {
                    v(d, e[a]);
                }
            }, f);
        } else {
            f /= 2;
            kj("small");
            for (var g = 0; g < e.length; ++g) {
                w(d, e[g]);
            }
            M(function () {
                w(b, "watch-wide");
            }, f);
            ti(c);
        }
        Ce("masthead-utility-menulink-short", a);
        Ce("masthead-utility-menulink-long", !a);
    };
    var kj = function (a) {
        var b = G("watch-video");
        if (!z(G("page"), "watch-wide") || a == "small") {
            w(b, "medium", "large");
        } else {
            var c = !!L("ENABLE_AUTO_LARGE");
            var d = oc(window);
            var d = !!(d.width >= 1400) && !!(d.height >= 1040);
            if (c && (d || a == "large")) {
                y(b, "medium", "large");
            } else {
                y(b, "large", "medium");
            }
        }
    };
    var mj = function () {
        return L("PLAYER_REFERENCE");
    };
    var nj = function (a) {
        if (!K(a.target, "BUTTON")) {
            a.currentTarget.click();
        }
    };
    var pj = function (a, b, c, d) {
        this.c = a;
        this.Kc = m;
        a = Le() + "/share_ajax";
        U(a, {
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
                    oj(this, d, c.contacts, b);
                }
            },
            j: this
        });
    };
    pj.prototype.Aa = function () {
        this.i = this.c.getElementsByTagName("form")[0];
        Q(this.i, "submit", r(this.Tc, this));
        J("share-email-send", this.i);
        this.ya = J("share-email-success", this.c);
        this.Og = J("share-email-remail", this.ya);
        Q(
            this.Og,
            "click",
            r(function () {
                qj(this);
                this.focus();
            }, this)
        );
        this.bd = J("share-email-recipients", this.c);
        this.ad = J("share-email-note", this.c);
        this.ve = J("share-email-preview-note", this.c);
        Q(this.ad, "keyup", r(this.Ng, this));
    };
    var oj = function (a, b, c, d) {
        Tg(
            b,
            r(function () {
                var a = q("yt.sharing.ContactTools");
                if (a) {
                    a.createContactTools(this.bd, l, c, d);
                }
            }, a)
        );
    };
    pj.prototype.na = function () {
        if (this.i) {
            if (this.Kc) {
                qj(this);
            }
            this.focus();
        }
    };
    pj.prototype.focus = function () {
        this.bd.focus();
    };
    var qj = function (a) {
        a.Kc = m;
        a.bd.value = "";
        a.ad.value = "";
        a.ve.innerHTML = "";
        T(a.ya);
        S(a.i);
    };
    pj.prototype.Ng = function () {
        var a = this.ad.value;
        var a = a.substring(0, 300);
        var a = Aa(a);
        var a = a.replace(/\n/g, "<br>");
        this.ve.innerHTML = a;
    };
    pj.prototype.Tc = function (a) {
        a.preventDefault();
        var b = H("button", l, this.i)[0];
        b.disabled = k;
        var c = J("share-email-captcha", this.c);
        var d = J("share-email-error", this.c);
        var e = J("yt-alert-content", d);
        var a = Le() + Me(this.i.action);
        U(a, {
            format: "JSON",
            method: "POST",
            za: $c(this.i),
            f: function () {
                this.Kc = k;
                S(this.ya);
                T(this.i);
                T(d);
                T(c);
            },
            B: function (a, b) {
                if (b.captcha_html) {
                    c.innerHTML = b.captcha_html;
                    S(c);
                }
                if (b.errors) {
                    e.innerHTML = b.errors.join("<br>");
                    S(d);
                }
            },
            ga: function () {
                b.disabled = m;
            },
            j: this
        });
    };
    var sj = function (a, b, c) {
        this.c = a;
        a = Le() + "/share_ajax";
        U(a, {
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
                var c = de.getInstance();
                if (this.Ea) {
                    this.Ea.checked = !he(0, Hh.de);
                }
                this.Ub.checked = he(0, Hh.ce);
                if (this.Da) {
                    this.Da.checked = he(0, Hh.ee);
                }
                c = c.get("ems");
                (c in this.$ ? this.$[c] : vb(this.$)).select();
                rj(this);
                this.na();
            },
            j: this
        });
    };
    sj.prototype.Aa = function () {
        this.Za = J("share-embed-code", this.c);
        Q(this.Za, "click", r(this.yh, this));
        tj(this);
        uj(this);
    };
    var tj = function (a) {
        var b = J("share-embed-size-list", a.c);
        var c = kc("share-embed-size-radio", b);
        a.$ = {};
        u(
            c,
            function (a) {
                if (!z(a, "share-embed-size-radio-custom")) {
                    a = new vj(a);
                    this.$[a.name] = a;
                }
            },
            a
        );
        var c = vb(a.$).width / (vb(a.$).height - 30);
        var d = J("share-embed-size-radio-custom", b);
        var c = new wj(d, c);
        a.$[c.name] = c;
        a.mh = c;
        R(b, "click", r(a.nh, a), "share-embed-size");
        b = J("share-embed-customize", b);
        Q(b, "keyup", r(a.oh, a));
    };
    var uj = function (a) {
        var b = {};
        var c = kc("share-embed-option", a.c);
        u(c, function (a) {
            b[a.name] = a;
        });
        a.Ea = b["show-related"];
        if (a.Ea) {
            Q(a.Ea, "click", r(a.eh, a));
        }
        a.Ub = b["delayed-cookies"];
        Q(a.Ub, "click", r(a.dh, a));
        a.xe = b["use-https"];
        Q(a.xe, "click", r(a.gh, a));
        a.Da = b["use-flash-code"] || l;
        if (a.Da) {
            Q(a.Da, "click", r(a.fh, a));
        }
    };
    sj.prototype.na = function () {
        this.focus();
    };
    sj.prototype.focus = function () {
        if (this.Za) {
            this.Za.focus();
            this.Za.select();
        }
    };
    var rj = function (a) {
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
        c = Ue(c, d);
        d = xj(a);
        if (!d.width || d.width < 200) {
            d = vb(a.$);
        }
        b = b.replace(/__url__/g, Aa(c));
        b = b.replace(/__width__/g, d.width + "");
        b = b.replace(/__height__/g, d.height + "");
        b = Aa(b);
        if (b != a.Za.innerHTML) {
            a.Za.innerHTML = b;
        }
    };
    var xj = function (a) {
        return (
            yb(a.$, function (a) {
                return a.Mb.checked;
            }) || l
        );
    };
    n = sj.prototype;
    n.eh = function () {
        var a = this.Ea.checked;
        var b = de.getInstance();
        ie(Hh.de, !a);
        b.save();
        rj(this);
    };
    n.dh = function () {
        var a = this.Ub.checked;
        var b = de.getInstance();
        ie(Hh.ce, a);
        b.save();
        rj(this);
    };
    n.gh = function () {
        rj(this);
    };
    n.fh = function () {
        var a = this.Da.checked;
        var b = de.getInstance();
        ie(Hh.ee, a);
        b.save();
        rj(this);
    };
    n.yh = function () {
        this.focus();
    };
    n.nh = function (a) {
        a = this.$[J("share-embed-size-radio", a.currentTarget).value];
        a.select();
        var b = de.getInstance();
        b.set("ems", a.name);
        b.save();
        rj(this);
        if (a != this.mh) {
            this.focus();
        }
    };
    n.oh = function () {
        rj(this);
    };
    var vj = function (a) {
        this.name = a.value;
        this.Mb = a;
        this.width = parseInt(P(this.Mb, "width"), 10);
        this.height = parseInt(P(this.Mb, "height"), 10);
    };
    vj.prototype.select = function () {
        this.Mb.checked = k;
        var a = K(this.Mb, "li");
        var b = K(a, "ul");
        var b = H("li", "selected", b);
        u(b, function (a) {
            w(a, "selected");
        });
        v(a, "selected");
    };
    var wj = function (a, b) {
        vj.call(this, a);
        this.of = b;
        var c = K(a, "li");
        this.Fd = J("share-embed-size-custom-width", c);
        this.Ed = J("share-embed-size-custom-height", c);
        Q(this.Fd, "keyup", r(this.mi, this));
        Q(this.Ed, "keyup", r(this.li, this));
    };
    t(wj, vj);
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
        this.Ca = l;
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
    yj.prototype.xb = function () {
        Tg("https://apis.google.com/js/plusone.js", r(this.Ni, this));
    };
    yj.prototype.Ni = function () {
        var a = q("gapi.plusone.render");
        if (a) {
            var b = Math.floor(Math.random() * 10000);
            var c = "__PLUS_ONE_CALLBACK_" + b;
            var d = this.c.id;
            if (!d) {
                d = "plusone-button-" + b;
                this.c.id = d;
            }
            window[c] = r(this.sh, this);
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
            Bb(b, this.Yg);
            S(this.c);
            a(d, b);
        }
    };
    yj.prototype.sh = function (a) {
        if (a.state != "off") {
            Yg("PLUS_ONE", this.bh + "");
            if (this.De) {
                Fh(
                    Se("https://plusone.google.com/_/+1/confirm", {
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
    var zj = function (a, b, c, d, e, f) {
        this.c = a;
        this.H = b || l;
        this.G = c || l;
        this.we = m;
        this.Jf = e || l;
        this.Kf = f || m;
        this.xb(d);
    };
    var Aj = function (a) {
        var b = ["h", "m", "s"];
        var c = eb(b);
        c.reverse();
        var d = {};
        var a = a.toLowerCase().match(/\d+\s*[hms]?/g) || [];
        var a = Ua(a, function (a) {
            var b = (a.match(/[hms]/) || [""])[0];
            if (b) {
                d[b] = parseInt(a.match(/\d+/)[0], 10);
                return m;
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
        u(b, function (a) {
            if (d[a]) {
                f += d[a] + a;
            }
        });
        return f || l;
    };
    zj.prototype.xb = function (a) {
        var b = Le() + "/share_ajax";
        U(b, {
            format: "JSON",
            g: {
                action_get_share_box: 1,
                video_id: this.H,
                list: this.G,
                new_share_layout: k
            },
            f: function (b, d) {
                this.c.innerHTML = d.share_html;
                this.Gf = d.url_short;
                this.Ud = d.url_long;
                this.Tb = d.lang;
                this.Ca = l;
                if ("session_index" in d) {
                    this.Ca = d.session_index;
                }
                this.Aa();
                var e = J("share-panel-services-dynamic", this.c);
                if (e) {
                    new yj(e, (this.H || this.G) + "", this.Ud, this.Tb, this.Ca, this.Jf, this.Kf);
                }
                if (a) {
                    a();
                }
                this.na();
            },
            j: this
        });
    };
    zj.prototype.Aa = function () {
        var a = J("share-panel-show-url-options");
        Q(a, "click", r(this.yg, this));
        a = J("share-panel-show-more");
        Q(a, "click", r(this.vg, this));
        a = J("share-panel-embed", this.c);
        Q(a, "click", r(this.tg, this));
        a = J("share-panel-email", this.c);
        Q(a, "click", r(this.sg, this));
        if ((a = J("share-panel-hangout", this.c))) {
            Q(a, "click", r(this.ug, this));
        }
        this.P = J("share-panel-url", this.c);
        Q(this.P, "click", r(this.zg, this));
        Q(
            this.P,
            "focus",
            r(function () {
                v(this.P, "focused");
            }, this)
        );
        Q(
            this.P,
            "blur",
            r(function () {
                w(this.P, "focused");
            }, this)
        );
        this.hg = J("share-panel-long-url", this.c);
        this.Vc = J("share-panel-start-at", this.c);
        this.T = J("share-panel-start-at-time", this.c);
        Q(this.T, "keyup", r(this.Ag, this));
        Q(this.T, "click", r(this.xg, this));
        Q(
            this.T,
            "focus",
            r(function () {
                v(this.T, "focused");
            }, this)
        );
        Q(
            this.T,
            "blur",
            r(function () {
                w(this.T, "focused");
            }, this)
        );
        this.me = J("share-panel-hd", this.c);
        this.ne = J("share-panel-include-list", this.c);
        this.Wb = J("share-panel-url-options", this.c);
        Q(this.Wb, "click", r(this.Xc, this));
        this.Rc = J("share-panel-services", this.c);
        this.fe = J("share-panel-buttons", this.c);
        a = J("share-panel-show-more", this.c);
        Q(a, "click", r(this.wg, this));
    };
    zj.prototype.na = function () {
        if (this.P && !z(this.P, "focused")) {
            this.P.focus();
            this.P.select();
        }
    };
    var Cj = function (a) {
        var b = Bj;
        if (b.T && !z(b.T, "focused") && !b.we) {
            b.T.value = a;
            b.Xc();
        }
    };
    n = zj.prototype;
    n.Xc = function () {
        if (!z(this.P, "focused")) {
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
            var c = this.Vc.checked && Aj(this.T.value);
            if (c) {
                b.t = c;
            }
            a = Se(a, b);
            if (this.P.value != a) {
                this.P.value = a;
            }
        }
    };
    n.Ag = function () {
        this.we = k;
        this.Vc.checked = k;
        this.Xc();
    };
    n.xg = function () {
        this.Vc.checked = k;
        if (!this.T.value.match(/[1-9]/)) {
            this.T.value = "";
        }
    };
    n.zg = function () {
        this.P.select();
    };
    n.sg = function () {
        var a = th.getInstance();
        a.collapse(this.fe);
        a.collapse(this.Wb);
        a.collapse(this.Rc);
        if (this.S) {
            T(this.S);
        }
        if (!this.R) {
            this.R = J("share-panel-email-container", this.c);
        }
        Ee(this.R);
        if (!P(this.R, "disabled") && De(this.R)) {
            if (this.pe) {
                this.pe.na();
            } else {
                this.pe = new pj(this.R, this.Ca, this.H, this.G);
            }
        }
    };
    n.ug = function () {
        var a = mj();
        if (a && a.pauseVideo) {
            a.pauseVideo();
        }
        var a = Se("https://talkgadget.google.com/hangouts", {
            hl: this.Tb,
            authuser: this.Ca,
            gid: "youtube",
            gd: this.H
        });
        var b = window.screen.height;
        var c = Math.min(window.screen.width * 0.9, 1000);
        var b = Math.min(b * 0.9, 800);
        Yg("HANGOUT", this.H + "");
        Fh(a, {
            width: c,
            height: b
        });
    };
    n.tg = function () {
        var a = th.getInstance();
        a.collapse(this.fe);
        a.collapse(this.Wb);
        a.collapse(this.Rc);
        if (this.R) {
            T(this.R);
        }
        if (!this.S) {
            this.S = J("share-panel-embed-container", this.c);
        }
        Ee(this.S);
        if (!P(this.S, "disabled") && De(this.S)) {
            if (this.re) {
                this.re.na();
            } else {
                this.re = new sj(this.S, this.H, this.G);
            }
        }
    };
    n.yg = function () {
        th.getInstance().collapse(this.Rc);
        if (this.R) {
            T(this.R);
        }
        if (this.S) {
            T(this.S);
        }
    };
    n.vg = function () {
        th.getInstance().collapse(this.Wb);
        if (this.R) {
            T(this.R);
        }
        if (this.S) {
            T(this.S);
        }
    };
    n.wg = function () {
        if (this.R) {
            T(this.R);
        }
        if (this.S) {
            T(this.S);
        }
    };
    var Dj = function () {};
    n = Dj.prototype;
    n.jf = m;
    n.Hb = l;
    n.kc = l;
    n.Yh = function () {
        if (!this.jf) {
            this.jf = k;
            this.Hb = J("player-root", i);
            this.kc = J("player-actions-container", this.Hb);
            var a = J("player-actions-close", this.kc);
            Q(a, "click", r(this.Z, this));
        }
    };
    n.Z = function () {
        A(this.Hb, "actions-mode", m);
    };
    n.Xh = function () {
        if (this.Hb.clientWidth < 600) {
            v(this.kc, "small-view");
        }
    };
    n.Dd = l;
    n.Oi = function (a, b) {
        this.Yh();
        A(this.Hb, "actions-mode", k);
        if (this.Dd) {
            this.Dd.na();
        } else {
            var c = J("player-actions-share", this.kc);
            this.Dd = new zj(c, a, b, r(this.Xh, this), {
                db: 1
            });
        }
    };
    Zf();
    var Ej = Uf("yt.player.logger");
    Ej.Cc(Of);
    var Fj = function () {
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
    var Gj = q("yt.playerConfig") || {};
    s("yt.playerConfig", Gj);
    var Hj = q("yt.player.playerReferences_") || {};
    s("yt.player.playerReferences_", Hj);
    var Pj = function (a, b, c) {
        var d = G(a);
        if (d) {
            var e;
            e = b instanceof Ze ? b : new Ze(b);
            var b = !!e.disable.html5;
            var a = !!e.disable.flash;
            var f = Fj() && (q("yt.player.VideoPlayer") || e.assets.js);
            if (!e.args.eurl) {
                e.args.eurl = Ij();
            }
            e.args.enablejsapi = "1";
            var g = m;
            if (e.html5) {
                g = k;
            }
            if (g && !f) {
                e.args.html5_unavailable = "1";
            }
            var j = {
                pubsub: new lf(),
                subscribedEvents: {}
            };
            var o = d;
            if (!c) {
                Jj(d);
                o = J("player-container", d);
            }
            var d = "player" + ja(o);
            var x = !e.args.jsapicallback;
            var C = {
                target: o,
                playerId: d,
                playerapiid: e.args.playerapiid,
                jsapicallback: Kj(e.args.jsapicallback),
                elementId: e.attrs.id,
                api: j,
                onReadyCalled: m,
                eventLabel: e.args.el,
                actions: new Dj()
            };
            e.args.playerapiid = d;
            e.args.jsapicallback = "ytPlayerOnYouTubePlayerReady";
            var F;
            var I;
            var ka = !c ? Lj : jf;
            if (g && f) {
                F = Mj;
                if (!a) {
                    I = ka;
                }
            } else {
                F = ka;
                if (f && !b) {
                    I = Mj;
                }
            }
            if (I) {
                e.fallback = function (a) {
                    a = a || e;
                    if (!(a instanceof Ze)) {
                        a = new Ze(a);
                    }
                    delete a.fallback;
                    if (g) {
                        a.args.autoplay = 1;
                    } else {
                        U("/html5", {
                            kb: k,
                            method: "POST",
                            n: {
                                prefer_html5: k,
                                session_token: V.html5_ajax
                            }
                        });
                    }
                    a.attrs.id = C.elementId;
                    I(o, a);
                };
            }
            e.fallbackMessage = Nj(o);
            Hj[d] = C;
            M(function () {
                if (c) {
                    var a = G(e.attrs.id);
                    var b = m;
                    try {
                        a.getApiInterface();
                        b = k;
                    } catch (d) {}
                    if (x) {
                        window.onYouTubePlayerReady = function () {
                            Oj(C.playerId);
                        };
                    }
                    F(e, c.force);
                    if (b) {
                        Oj(C.playerId);
                    }
                } else {
                    F(o, e);
                }
            }, 0);
            return j;
        }
    };
    var Nj = function (a) {
        return function () {
            var b = N(
                "PLAYER_FALLBACK",
                i,
                'The Adobe Flash Player or an HTML5 supported browser is required for video playback. <br> <a href="http://get.adobe.com/flashplayer/">Get the latest Flash Player</a> <br> <a href="/html5">Learn more about upgrading to an HTML5 browser</a>'
            );
            var c = navigator.userAgent.match(/Version\/(\d).*Safari/);
            if (c && parseInt(c[1], 10) >= 5) {
                b = N(
                    "QUICKTIME_FALLBACK",
                    i,
                    'The Adobe Flash Player or QuickTime is required for video playback. <br> <a href="http://get.adobe.com/flashplayer/">Get the latest Flash Player</a> <br> <a href="http://www.apple.com/quicktime/download/">Get the latest version of QuickTime</a>'
                );
            }
            a.innerHTML = '<div class="fallback-message">' + b + "</div>";
        };
    };
    var Jj = function (a) {
        v(a, "player-root");
        if (fa("overflow")) {
            le(a, "hidden", "overflow");
        } else {
            ub("overflow", na(le, a));
        }
        var b = sc("div", "player-container");
        var c = sc(
            "div",
            "player-actions-container",
            sc("div", "player-actions-share"),
            sc("div", "player-actions-close", sc("div", "player-actions-close-button"))
        );
        xc(a, b, c);
    };
    var Mj = function (a, b) {
        Qj(a);
        b.attrs.id += "-html5";
        var c = q("yt.player.VideoPlayer");
        if (c) {
            new c(a, b);
        } else {
            Tg(b.assets.js, function () {
                new (q("yt.player.VideoPlayer"))(a, b);
            });
        }
    };
    var Lj = function (a, b) {
        Qj(a);
        b.attrs.id += "-flash";
        hf(a, b);
    };
    var Qj = function (a) {
        a = G(a);
        yc(a);
    };
    var Ij = function () {
        var a = "unknown";
        if (document.referrer) {
            a = document.referrer.substring(0, 128);
        }
        return a;
    };
    var Oj = function (a) {
        var b = Hj[a];
        var c = Bc(G(b.target));
        var a = c.getApiInterface();
        u(a, function (a) {
            b.api[a] = r(c[a], c);
        });
        b.api.nativeAddEventListener = r(b.api.addEventListener, c);
        for (var d in b.api.subscribedEvents) {
            b.api.nativeAddEventListener(d, Rj(b.api, d));
        }
        b.api.addEventListener = Sj;
        if (b.eventLabel === "embedded") {
            b.api.addEventListener("SHARE_CLICKED", r(b.actions.Oi, b.actions));
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
    var Rj = function (a, b) {
        var c = "ytPlayer" + (b + ja(a));
        var d = r(function (a) {
            this.pubsub.publish(b, a);
        }, a);
        s(c, d);
        return c;
    };
    var Sj = function (a, b) {
        var c = Kj(b);
        if (!this.subscribedEvents[a]) {
            this.nativeAddEventListener(a, Rj(this, a));
        }
        this.subscribedEvents[a] = 1;
        this.pubsub.subscribe(a, c);
    };
    var Kj = function (a) {
        var b = a;
        if (typeof a == "string") {
            b = function () {
                q(a).apply(window, arguments);
            };
        }
        if (!b) {
            b = q("onYouTubePlayerReady");
        }
        return b;
    };
    if (!q("ytPlayerOnYouTubePlayerReady")) {
        s("ytPlayerOnYouTubePlayerReady", Oj);
    }
    s("yt.net.ajax.setToken", Mg);
    s("yt.tracking.share", Yg);
    s("yt.window.popup", Fh);
    hh(X);
    hh(th);
    hh(xh);
    hh(Dh);
    Zf();
    var $ = q("yt.timing") || {};
    s("yt.timing", $);
    $.vi = 0;
    $.tf = 0;
    $.Bc = function (a, b) {
        var c = $.timer || {};
        c[a] = b ? b : oa();
        $.timer = c;
    };
    $.info = function (a, b) {
        var c = $.info_args || {};
        c[a] = b;
        $.info_args = c;
    };
    $.Gc = function (a) {
        var a = a || L("TIMING_ACTION");
        var b = $.timer || {};
        var c = $.info_args || {};
        var d = b.start;
        var e = "";
        var f = [];
        var g = [];
        delete b.start;
        if ($.srt) {
            e = "&srt=" + $.srt;
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
        Wg(
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
    $.Od = function () {
        var a = L("TIMING_ACTION");
        var b = $.timer || {};
        if (a && b.start) {
            if ($.wff && a.indexOf("ajax") != -1 && b.vr && b.cl) {
                $.Gc();
            } else if ($.wff && a.indexOf("ajax") == -1 && b.vr) {
                $.Gc();
            } else if (!$.wff && (b.ol || b.aft)) {
                $.Gc();
            }
        }
    };
    $.Df = function () {
        $.Bc("ol");
        $.Od();
    };
    $.Li = function (a) {
        var b = ++$.vi;
        if (typeof a != "undefined" && a < 4) {
            $.tf++;
        }
        if ($.tf == 4) {
            $.Bc("tn_c4");
        }
        if (b == 1 || b == 5 || b == 10 || b == 20 || b == 30) {
            $.Bc("tn" + b);
        }
    };
    var Tj = function () {
        this.L = {};
    };
    t(Tj, ih);
    aa(Tj);
    Tj.prototype.K = "char-counter";
    Tj.prototype.M = function () {
        this.addBehavior("keydown", this.Sd, "input");
        this.addBehavior("paste", this.Sd, "input");
        this.addBehavior("cut", this.Sd, "input");
    };
    Tj.prototype.Sd = function (a) {
        var b = jh(this, a);
        if (b) {
            var c = this.getData(b, "count-char-by-size") == "true";
            var d = parseInt(this.getData(b, "char-limit"), 10);
            if (!isNaN(d) && !(d <= 0)) {
                M(
                    r(function () {
                        var e = parseInt(a.getAttribute("maxlength"), 10);
                        if (!isNaN(e)) {
                            var f = Uj(a, c);
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
                        j = d - Uj(a, c);
                        A(b, W(this, "maxed-out"), j < g);
                        J(W(this, "remaining"), b).innerHTML = j;
                    }, this),
                    0
                );
            }
        }
    };
    var Uj = function (a, b) {
        var c = a.value;
        if (b) {
            return unescape(encodeURIComponent(c)).length;
        } else {
            return c.length;
        }
    };
    var Vj = function () {
        this.L = {};
    };
    t(Vj, ih);
    Vj.prototype.Kd = function () {
        if (this.Ld && ac.indexOf("6") == 0) {
            return m;
        } else {
            return k;
        }
    };
    Vj.prototype.show = function (a) {
        var b = jh(this, a);
        if (b) {
            v(b, W(this, "active"));
            var c = Wj(this, a, b);
            if (c) {
                c.cardTargetNode = a;
                c.cardRootNode = b;
                Xj(this, a, c);
                var d = W(this, "card-visible");
                M(function () {
                    S(c);
                    v(c, d);
                }, 10);
                this.wa(b, "card-action", a);
            }
        }
    };
    var Wj = function (a, b, c) {
        var d = W(a, "card");
        var e = d + zd(c);
        var f = G(e);
        if (f) {
            return f;
        }
        var g = a.rb(c);
        if (!g) {
            return l;
        }
        f = document.createElement("div");
        f.id = e;
        f.className = d;
        if ((c = P(c, "card-class"))) {
            v(f, c);
        }
        c = document.createElement("div");
        c.className = W(a, "card-border");
        b = a.getData(b, "orientation") || "horizontal";
        d = document.createElement("div");
        d.className = "yt-uix-card-border-arrow yt-uix-card-border-arrow-" + b;
        e = document.createElement("div");
        e.className = W(a, "card-body");
        a = document.createElement("div");
        a.className = "yt-uix-card-body-arrow yt-uix-card-body-arrow-" + b;
        zc(g);
        e.appendChild(g);
        c.appendChild(a);
        c.appendChild(e);
        f.appendChild(d);
        f.appendChild(c);
        document.body.appendChild(f);
        return f;
    };
    var Xj = function (a, b, c) {
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
        var x = se(document.body);
        var C = se(b);
        if (x != C) {
            o ^= 2;
        }
        var F;
        if (d) {
            C = b.offsetHeight / 2 - 24;
            F = new B(-12, b.offsetHeight + 6);
        } else {
            C = b.offsetWidth / 2 - 12;
            F = new B(b.offsetWidth + 6, -12);
        }
        var I = l;
        if (!f) {
            I = 10;
        }
        var ka = W(a, "card-flip");
        var a = W(a, "card-reverse");
        A(c, ka, e);
        A(c, a, g);
        I = $g(b, o, c, j, F, l, I);
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
            A(c, ka, e);
            A(c, a, g);
            $g(b, o, c, j, F);
        }
        b = J("yt-uix-card-body-arrow", c);
        f = J("yt-uix-card-border-arrow", c);
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
        if (b && (a = Wj(this, a, b))) {
            w(b, W(this, "active"));
            w(a, W(this, "card-visible"));
            T(a);
            a.cardTargetNode = l;
            a.cardRootNode = l;
        }
    };
    var Yj = function (a, b) {
        var c = jh(a, b);
        if (!c) {
            return m;
        } else {
            return z(c, W(a, "active"));
        }
    };
    Vj.prototype.rb = function (a) {
        var b = a.cardContentNode;
        if (!b) {
            var c = W(this, "content");
            var d = W(this, "card-content");
            var b = J(c, a);
            y(b, c, d);
            a.cardContentNode = b;
        }
        return b;
    };
    Vj.prototype.nf = {
        ji: 200,
        Ai: 200
    };
    var Zj = function () {
        this.L = {};
    };
    t(Zj, Vj);
    aa(Zj);
    Zj.prototype.K = "clickcard";
    Zj.prototype.M = function () {
        this.addBehavior("click", this.Fi, "target");
        this.addBehavior("click", this.Ei, "close");
    };
    Zj.prototype.Fi = function (a) {
        var b = jh(this, a);
        if (z(b, W(this, "active"))) {
            this.Z(a);
            w(b, W(this, "active"));
        } else {
            this.show(a);
            v(b, W(this, "active"));
        }
    };
    Zj.prototype.Ei = function (a) {
        if ((a = Dd(a, W(this, "card")))) {
            this.Z(a.cardTargetNode);
        }
    };
    var $j = function () {
        this.L = {};
    };
    t($j, ih);
    aa($j);
    n = $j.prototype;
    n.K = "form-input";
    n.M = function () {
        if (D && !E(9)) {
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
    n.pf = function (a) {
        var b = K(a, l, W(this, "checkbox-container"));
        A(b, "checked", a.checked);
    };
    n.qf = function () {
        var a = kc(W(this, "radio"));
        var b = W(this, "radio-container");
        u(a, function (a) {
            var d = K(a, l, b);
            if (d) {
                A(d, "checked", a.checked);
            }
        });
    };
    n.Gd = function (a) {
        var b = a.value;
        var c = "";
        if (fd(b)) {
            c = "rtl";
        } else if (dd.test(b)) {
            c = "ltr";
        }
        a.dir = c;
    };
    n.ii = function (a) {
        a = K(a, l, W(this, "select"));
        v(a, "focused");
    };
    n.hi = function (a) {
        a = K(a, l, W(this, "select"));
        w(a, "focused");
    };
    n.Hd = function (a) {
        var b = K(a, l, W(this, "select"));
        var b = J(W(this, "select-value"), b);
        var a = a.options[a.selectedIndex];
        b.innerHTML = a.text ? a.text : a.value;
    };
    var ak = function () {
        this.L = {};
    };
    t(ak, Vj);
    aa(ak);
    n = ak.prototype;
    n.K = "hovercard";
    n.M = function () {
        this.addBehavior("mouseover", this.yi, "target", 5, k);
        this.addBehavior("mouseout", this.wi, "target", 5, k);
        this.addBehavior("mouseover", this.zi, "card", 100);
        this.addBehavior("mouseout", this.xi, "card", 100);
    };
    n.yi = function (a) {
        if (bk != a) {
            if (bk) {
                this.Z(bk);
                bk = l;
            }
            var b = r(this.show, this, a);
            var c = parseInt(this.getData(a, "delay-show"), 10);
            var b = M(b, c > -1 ? c : this.nf.ji);
            this.setData(a, "card-timer", b.toString());
            bk = a;
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
    n.wi = function (a) {
        var b = parseInt(this.getData(a, "card-timer"), 10);
        pd(b);
        jh(this, a).isCardHidable = k;
        b = parseInt(this.getData(a, "delay-hide"), 10);
        b = b > -1 ? b : this.nf.Ai;
        M(r(this.Ci, this, a), b);
        if ((b = this.getData(a, "card-alt"))) {
            a.alt = b;
        }
        if ((b = this.getData(a, "card-title"))) {
            a.title = b;
        }
    };
    n.Ci = function (a) {
        if (jh(this, a).isCardHidable) {
            this.Z(a);
            bk = l;
        }
    };
    n.zi = function (a) {
        if (a) {
            a.cardRootNode.isCardHidable = m;
        }
    };
    n.xi = function (a, b, c) {
        if (a) {
            b = a.cardTargetNode;
            if (!Cc(a, c.relatedTarget)) {
                this.Z(b);
            }
        }
    };
    var bk = l;
    var ck = function () {
        this.L = {};
    };
    t(ck, ih);
    aa(ck);
    ck.prototype.K = "redirect-link";
    ck.prototype.M = function () {
        this.addBehavior("click", this.ma);
    };
    ck.prototype.ma = function (a) {
        if (!P(a, "redirect-href-updated")) {
            O(a, "redirect-href-updated", "true");
            var b = L("XSRF_REDIRECT_TOKEN");
            var c = L("XSRF_FIELD_NAME");
            if (b && c) {
                var d = {};
                d.q = a.href;
                d[c] = b;
                a.href = Se("/redirect", d);
            }
        }
    };
    var dk = function () {
        this.L = {};
    };
    t(dk, ih);
    aa(dk);
    dk.prototype.K = "sessionlink";
    dk.prototype.M = function () {
        this.addBehavior("click", this.ma);
    };
    dk.prototype.ma = function (a) {
        var b = P(a, "sessionlink-target") || a.href;
        if (b) {
            var c = Je(b);
            if (c == window.location.host || (!c && b.lastIndexOf("/", 0) == 0)) {
                b = Me(b);
                c = b.indexOf("#");
                if ((b = c < 0 ? b : b.substr(0, c))) {
                    a = P(a, "sessionlink") || "";
                    a = Pe(a);
                    b = "s_tempdata-" + Ka(b);
                    a = a ? Oe(a) : "";
                    $d(b, a, 5);
                }
            }
        }
    };
    var ek = function () {
        this.L = {};
    };
    t(ek, ih);
    aa(ek);
    ek.prototype.K = "tile";
    ek.prototype.M = function () {
        this.addBehavior("click", this.ma);
    };
    ek.prototype.ma = function (a, b, c) {
        if (!K(c.target, "a") && !K(c.target, "button") && (a = J(W(this, "link"), a))) {
            if (D && !E(9)) {
                a.click();
            } else {
                Eh(a.href);
            }
        }
    };
    var fk = function (a, b, c) {
        this.oi = b;
        this.qi = c;
        this.ri = "ad_creative_" + a;
        this.pi = "ad_creative_expand_btn_" + a;
        this.ni = "ad_creative_collapse_btn_" + a;
    };
    fk.prototype.collapse = function () {
        T(this.ri);
        ui(G("page"), k);
        ri();
        if (!this.qi) {
            T(this.ni);
        }
        S(this.pi);
        var a = de.getInstance();
        a.set("HIDDEN_MASTHEAD_ID", this.oi);
        a.save();
        Xg("homepage_collapse_masthead_ad", i, i);
    };
    fk.prototype.expand = function () {
        var a = de.getInstance();
        a.set("HIDDEN_MASTHEAD_ID", m);
        a.save();
        Xg("homepage_expand_masthead_ad", i, i);
        Eh(document.location.href);
    };
    var gk = function (a) {
        var b;
        switch (a) {
            case "PENDING":
                b = N("COMMENT_PENDING");
                break;
            case "BLOCKED":
                b = N("COMMENT_BLOCKED");
                break;
            case "EMAIL":
                b = N("COMMENT_ERROR_EMAIL");
                break;
            case "INLINE_CAPTCHAFAIL":
                b = N("COMMENT_CAPTCHAFAIL");
        }
        return b || l;
    };
    var hk = function (a, b) {
        this.i = a;
        this.oa = Ed("button", l, a);
        this.aa = Ed("textarea", l, a);
        this.Fa = l;
        this.md = J("comments-remaining-count", this.i);
        this.Pg = parseInt(this.md.innerHTML, 10);
        this.Wa = J("comments-post-message", this.i);
        this.ae = J("yt-alert-content", this.Wa);
        Q(this.aa, "focus", r(this.Ce, this));
        Q(this.aa, "blur", r(this.Wg, this));
        Q(this.i, "submit", r(this.Tc, this));
        var c = r(this.Xg, this);
        Q(this.aa, "change", c);
        Q(this.aa, "keyup", c);
        if (b) {
            this.Ce();
        }
    };
    hk.prototype.reset = function () {
        ik(this);
        this.aa.blur();
        w(this.i, "has-focus");
        this.oa.disabled = m;
        this.setValue("");
    };
    hk.prototype.focus = function () {
        this.aa.focus();
    };
    hk.prototype.setValue = function (a) {
        this.aa.value = a;
        var b = this.aa;
        var a = a.length;
        var c;
        try {
            c = typeof b.selectionStart == "number";
        } catch (d) {
            c = m;
        }
        if (c) {
            b.selectionStart = a;
            b.selectionEnd = a;
        } else if (D) {
            if (b.type == "textarea") {
                a = b.value.substring(0, a).replace(/(\r\n|\r|\n)/g, "\n").length;
            }
            b = b.createTextRange();
            b.collapse(k);
            b.move("character", a);
            b.select();
        }
        jk(this);
    };
    var ik = function (a) {
        if (a.Fa) {
            a.Fa.innerHTML = "";
        }
    };
    var jk = function (a) {
        var b = a.Pg - a.aa.value.length;
        a.md.innerHTML = b + "";
        b = b < 0;
        A(a.md, "too-many", b);
        a.oa.disabled = b;
    };
    hk.prototype.Xg = function () {
        jk(this);
    };
    hk.prototype.Ce = function () {
        if (!z(this.i, "has-focus")) {
            T(this.Wa);
        }
        v(this.i, "has-focus");
        of("comments-focus", this.i);
    };
    hk.prototype.Wg = function () {
        of("comments-blur", this.i);
    };
    hk.prototype.Tc = function (a) {
        a.preventDefault();
        if (!this.oa.disabled) {
            this.oa.disabled = k;
            a = Pe($c(this.i));
            a.screen = Oe({
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
            U(this.i.action, {
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
                            e = Bc(e);
                            if (this.i.reply_parent_id.value) {
                                var f = K(this.i, l, "comments-post-container");
                                var g = K(f, l, "comment");
                                zc(f);
                                y(g, "replying", "has-child");
                                v(e, "child");
                                A(e, "last", !(g.nextElementSibling != i ? g.nextElementSibling : Ac(g.nextSibling)));
                                if (g.parentNode) {
                                    g.parentNode.insertBefore(e, g.nextSibling);
                                }
                            } else {
                                f = K(this.i, l, "comments-section");
                                f = J("comment-list", f);
                                f.insertBefore(e, f.childNodes[0] || l);
                                this.reset();
                            }
                            ti(e);
                            break;
                        case "PENDING":
                            ik(this);
                            this.ae.innerHTML = N("COMMENT_PENDING");
                            y(this.Wa, "yt-alert-error", "yt-alert-info");
                            S(this.Wa);
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
        a.ae.innerHTML = gk(b) || N("COMMENT_ERROR");
        y(a.Wa, "yt-alert-info", "yt-alert-error");
        S(a.Wa);
        switch (b) {
            case "INLINE_CAPTCHA":
            case "INLINE_CAPTCHAFAIL":
                U("/comment_servlet?gimme_captcha=1", {
                    format: "XML",
                    method: "POST",
                    n: {
                        session_token: V.comment_servlet
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
                        this.oa.disabled = m;
                    },
                    j: a
                });
                break;
            default:
                a.oa.disabled = m;
                ik(a);
        }
    };
    var lk = function (a) {
        this.c = a;
        this.Eb = J("watch-more-comments-button");
        this.gg = !!L("ENABLE_LIVE_COMMENTS");
        this.cd();
    };
    lk.prototype.cd = function () {
        var a = J("comments-pagination", this.c);
        if (a && P(a, "ajax-enabled")) {
            R(this.c, "click", r(this.th, this), "yt-uix-pager-button");
        }
        Q(this.Eb, "click", r(this.vh, this));
        R(this.c, "click", r(this.uh, this), "comments-section-pop-out");
    };
    lk.prototype.th = function (a) {
        a.preventDefault();
        a = a.currentTarget;
        if (!z(a, "yt-uix-button-toggled")) {
            var b = parseInt(P(a, "page"), 10);
            S("comments-loading");
            of("comments-page-changing");
            mk(this, b, function (a) {
                if (a) {
                    this.c.innerHTML = a;
                    ti(this.c);
                    var a = J("comment-list", this.c);
                    var d = J("live-comments-setting", this.c);
                    if (a) {
                        of("comments-page-changed", a, d, b);
                    }
                }
                T("comments-loading");
            });
        }
    };
    lk.prototype.vh = function () {
        T(this.Eb);
        S("watch-more-comments", "watch-more-comments-loading");
        var a = parseInt(P(this.Eb, "page"), 10);
        mk(this, a, function (b) {
            var c = G("watch-more-comments");
            c.innerHTML += b;
            ti(c);
            O(this.Eb, "page", a + 1);
            S(this.Eb);
            T("watch-more-comments-loading");
        });
    };
    lk.prototype.uh = function () {
        Fh(L("COMMENTS_POPUP_URL"), {
            width: 350,
            height: 500,
            resizable: k
        });
    };
    var mk = function (a, b, c) {
        O(a.c, "type", "everything");
        U("/watch_ajax?action_get_comments=1", {
            format: "XML",
            g: {
                v: L("VIDEO_ID"),
                p: b,
                commentthreshold: L("COMMENTS_THRESHHOLD"),
                commenttype: "everything",
                enable_live_comments: a.gg ? "yes" : l,
                page_size: L("COMMENTS_PAGE_SIZE"),
                source: L("COMMENT_SOURCE")
            },
            f: function (a, b) {
                c.call(this, b.html_content);
            },
            j: a
        });
    };
    var wk = function (a) {
        var b = a.currentTarget;
        var a = K(b, l, "comment");
        switch (P(b, "action")) {
            case "approve":
                nk(a);
                break;
            case "block":
                if (confirm(N("BLOCK_USER"))) {
                    ok(a, k);
                    v(a, "blocked");
                }
                break;
            case "unblock":
                ok(a, m);
                w(a, "blocked");
                break;
            case "flag":
                pk(a);
                break;
            case "unflag":
                a = P(a, "id");
                U("/comment_servlet", {
                    format: "XML",
                    method: "POST",
                    n: {
                        unmark_comment_as_spam: a,
                        entity_id: L("VIDEO_ID"),
                        session_token: V.comment_servlet
                    }
                });
                break;
            case "hide":
                v(a, "hidden");
                break;
            case "show":
                w(a, "hidden");
                break;
            case "remove":
                qk(a);
                break;
            case "reply":
                if (rk()) {
                    if (z(a, "replying")) {
                        sk(a);
                    } else {
                        v(a, "replying");
                        tk(a);
                        var b = J("comments-post", G("comments-view"));
                        var b = Cd(b);
                        var c = document.createElement("div");
                        c.className = "comments-post-container";
                        a.appendChild(c);
                        c.appendChild(b);
                        b = new hk(b);
                        b.reset();
                        c = P(a, "id");
                        if (wd(a, "author")) {
                            b.setValue("@" + P(a, "author") + " ");
                        }
                        b.i.reply_parent_id.value = c;
                        b.focus();
                    }
                }
                break;
            case "share":
                uk(a);
                break;
            case "close-share":
                tk(a);
                break;
            case "vote-up":
                vk(a, k);
                break;
            case "vote-down":
                vk(a, m);
        }
    };
    var rk = function () {
        if (L("COMMENTS_SIGNIN_URL")) {
            Eh(L("COMMENTS_SIGNIN_URL"));
            return m;
        } else if (!L("COMMENTS_YPC_CAN_POST_OR_REACT_TO_COMMENT")) {
            return m;
        } else {
            return k;
        }
    };
    var nk = function (a) {
        var b = P(a, "id");
        var c = L("VIDEO_ID");
        w(a, "pending");
        U("/comment_servlet?field_approve_comment=1", {
            format: "XML",
            method: "POST",
            n: {
                comment_id: b,
                entity_id: c,
                session_token: V.comment_servlet
            },
            Le: function () {
                v(a, "pending");
            }
        });
    };
    var ok = function (a, b) {
        var c = {};
        c[(b ? "" : "un") + "block_user"] = 1;
        var d = P(a, "author");
        U("/link_servlet", {
            format: "XML",
            method: "POST",
            g: c,
            n: {
                session_token: V.link_servlet,
                friend_username: d
            }
        });
    };
    var pk = function (a) {
        if (rk()) {
            var b = P(a, "id");
            var c = L("VIDEO_ID");
            T(a);
            v(a, "flagged");
            U("/comment_servlet", {
                format: "XML",
                method: "POST",
                g: {
                    mark_comment_as_spam: b,
                    entity_id: c
                },
                n: {
                    session_token: V.comment_servlet
                },
                Le: function () {
                    S(a);
                    w(a, "flagged");
                }
            });
        }
    };
    var qk = function (a) {
        var b = P(a, "id");
        var c = L("VIDEO_ID");
        T(a);
        U("/comment_servlet?remove_comment=1", {
            format: "XML",
            method: "POST",
            n: {
                comment_id: b,
                entity_id: c,
                session_token: V.comment_servlet
            },
            Le: function () {
                S(a);
            }
        });
    };
    var sk = function (a) {
        if (z(a, "replying")) {
            w(a, "replying");
            a = J("comments-post-container", a);
            zc(a);
        }
    };
    var uk = function (a) {
        if (!z(a, "sharing")) {
            v(a, "sharing");
            sk(a);
            var b = Cd(G("comment-share-area"));
            var c = document.createElement("div");
            c.className = "comments-post-container";
            a.appendChild(c);
            c.appendChild(b);
            var d = P(a, "id");
            var c = L("COMMENT_SHARE_URL");
            var c = c.replace("_COMMENT_ID_", d);
            J("comment-share-url", b).value = c;
            var a = J("comment-text", a);
            var e = Ia(Jc(Bc(a)));
            var a = kc("icon-comment-share", b);
            u(a, function (a) {
                var b = a.getAttribute("action");
                var b = b.replace("_COMMENT_ID_", d);
                var c;
                c = b.indexOf("twitter") != -1 ? Fa(e, 80) : Fa(e, 150);
                b = b.replace("_COMMENT_TEXT_", c);
                Q(
                    a,
                    "click",
                    r(
                        function (a) {
                            eval(a);
                        },
                        p,
                        b
                    )
                );
            });
            S(b);
        }
    };
    var tk = function (a) {
        if (z(a, "sharing")) {
            w(a, "sharing");
            a = J("comments-post-container", a);
            zc(a);
        }
    };
    var vk = function (a, b) {
        if (rk() && !P(a, "voted")) {
            var c = P(a, "id");
            var d = L("VIDEO_ID");
            var e = P(a, "score");
            var f = b ? 1 : -1;
            O(a, "voted", f + "");
            if (b) {
                y(a, "voted-down", "voted-up");
            } else {
                y(a, "voted-up", "voted-down");
            }
            c = {
                a: f,
                id: c,
                video_id: d,
                old_vote: e
            };
            if ((d = P(a, "tag"))) {
                c.tag = d;
            }
            U("/comment_voting", {
                format: "XML",
                method: "POST",
                g: c,
                n: {
                    session_token: V.comment_voting
                }
            });
        }
    };
    var xk = m;
    var yk = m;
    var Ak = function (a, b, c) {
        zk({
            Yd: a,
            Xd: "WL",
            Nc: b,
            f: c,
            B: i,
            j: i
        });
    };
    var zk = function (a) {
        var b = {
            video_ids: a.Yd,
            playlist_id: a.If || "",
            new_playlist_name: a.$d || "",
            session_token: V.addto_ajax
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
        U("/addto_ajax", {
            kb: k,
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
        return Se(b.baseUrl, e);
    };
    var Ck = function (a) {
        var b = L("CONVERSION_CONFIG_DICT");
        if (b && (a = Bk(a, b))) {
            Wg(a);
        }
    };
    var Dk = function (a, b) {
        this.O = a;
        this.H = b;
        U("/playlist_ajax", {
            g: {
                action_get_addto_panel: 1,
                video_id: this.H
            },
            f: this.ig,
            j: this
        });
    };
    Dk.prototype.ig = function (a, b) {
        this.O.innerHTML = b.html;
        this.Th = J("added-to-message", this.O);
        this.Sh = J("added-to-message-title", this.O);
        this.kg = J("note-added-message", this.O);
        this.jg = J("note-added-message-title", this.O);
        this.Qc();
    };
    Dk.prototype.Qc = function () {
        var a = J("create-playlist", this.O);
        Q(a, "submit", r(this.fi, this));
        R(this.O, "click", r(this.ci, this), "playlist-item-favorite");
        R(this.O, "click", r(this.di, this), "playlist-item");
        R(this.O, "submit", r(this.ei, this), "playlist-note-form");
        R(this.O, "click", r(this.bi, this), "cancel-note");
    };
    Dk.prototype.fi = function (a) {
        a.preventDefault();
        Ek(this, J("create-playlist", this.O));
    };
    var Ek = function (a, b) {
        v(b, "loading");
        Hg(b, {
            j: a,
            f: function (a, d) {
                w(b, "loading");
                this.O.innerHTML = d.html;
            }
        });
    };
    Dk.prototype.ci = function (a) {
        a.stopPropagation();
        Fk(this, a.currentTarget);
    };
    var Fk = function (a, b) {
        v(b, "loading");
        U("/addto_ajax", {
            method: "POST",
            format: "XML",
            g: {
                action_add_to_favorites: 1
            },
            n: {
                video_ids: a.H,
                session_token: V.addto_ajax
            },
            j: a,
            f: function () {
                w(b, "loading");
                Gk(this, b);
            }
        });
    };
    Dk.prototype.di = function (a) {
        var b = a.currentTarget;
        if (!z(b, "selected")) {
            a.stopPropagation();
            Hk(this);
            Ik(this, b);
        }
    };
    var Ik = function (a, b) {
        var c = P(b, "playlist-id");
        v(b, "loading");
        U("/addto_ajax", {
            method: "POST",
            format: "XML",
            g: {
                action_add_to_playlist: 1
            },
            n: {
                playlist_id: c,
                video_ids: a.H,
                session_token: V.addto_ajax
            },
            j: a,
            f: function (a, c) {
                this.le = c.setvideo_id;
                w(b, "loading");
                v(b, "selected");
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
        v(b, "loading");
        Hg(b, {
            n: {
                session_token: V.playlist_bar_ajax,
                setvideo_id: a.le
            },
            j: a,
            f: function () {
                Hk(this);
                w(b, "loading");
                this.jg.innerHTML = J("playlist-name", b).value;
                var a = this.kg;
                if (this.zb) {
                    T(this.zb);
                }
                this.zb = a;
                S(a);
            }
        });
    };
    var Hk = function (a) {
        var b = J("selected", a.O);
        if (b) {
            w(b, "selected");
            a.le = l;
        }
    };
    var Gk = function (a, b) {
        a.Sh.innerHTML = J("playlist-title", b).innerHTML;
        var c = a.Th;
        if (a.zb) {
            T(a.zb);
        }
        a.zb = c;
        S(c);
    };
    var Kk = function (a, b) {
        var c = L("VIDEO_ID");
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
            screen: Oe({
                h: screen.height,
                w: screen.width,
                d: screen.colorDepth
            }),
            session_token: V.watch_actions_ajax
        };
        if (b.qe) {
            c.station_id = b.qe;
        }
        U("/watch_actions_ajax", {
            format: "XML",
            method: "POST",
            g: d,
            n: c,
            f: b.f,
            B: b.B
        });
        Ck(a ? "like" : "dislike");
    };
    var Mk = function (a, b) {
        this.start = a;
        this.end = b;
        Lk++;
    };
    var Lk = 0;
    Mk.prototype.contains = function (a, b) {
        return a >= this.start && a < this.end && (b == l || (a < b && b <= this.end));
    };
    new Mk(0, 0);
    var Nk = ["left", "right", "center"];
    var Ok = {
        id: 0,
        kf: 0,
        Qg: 7,
        Tg: 50,
        Jk: 80,
        Vg: 95,
        Ug: 15,
        Rg: 100,
        isVisible: k,
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
    t(Qk, Pk);
    n = Qk.prototype;
    n.mc = "";
    n.ff = m;
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
            b.params.append = k;
        }
        return new Qk(b);
    };
    var Sk = function (a) {
        Pk.call(this, a);
        this.id = a.$c || this.id;
        this.params = a.params;
    };
    t(Sk, Pk);
    Sk.prototype.id = 0;
    Sk.prototype.params = l;
    Sk.prototype.Ae = "";
    var Tk = function () {
        return new Sk({
            fd: -2147483648,
            ba: 4294967295,
            params: Ok
        });
    };
    var Uk = function (a) {
        this.Bb = [];
        this.nd = [];
        this.Db = {};
        if (a) {
            var b;
            if (typeof DOMParser != "undefined") {
                b = new DOMParser().parseFromString(a, "application/xml");
            } else if (typeof ActiveXObject != "undefined") {
                if ((b = new ActiveXObject("MSXML2.DOMDocument"))) {
                    b.resolveExternals = m;
                    b.validateOnParse = m;
                    try {
                        b.setProperty("ProhibitDTD", k);
                        b.setProperty("MaxXMLSize", 2048);
                        b.setProperty("MaxElementDepth", 256);
                    } catch (c) {}
                }
                b.loadXML(a);
            } else {
                h(Error("Your browser does not support loading xml documents"));
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
                                    var g = i;
                                    a: {
                                        var j = this.Db[f];
                                        if (!e.getAttribute("t") && !e.getAttribute("start")) {
                                            g = l;
                                        } else {
                                            g = parseInt(e.getAttribute("t"), 10);
                                            if (e.getAttribute("start")) {
                                                g = parseFloat(e.getAttribute("start")) * 1000;
                                            }
                                            if (j) {
                                                if (j.Ha + j.ba >= g) {
                                                    j.ba = g;
                                                } else {
                                                    j = l;
                                                }
                                            }
                                            switch (e.getAttribute("op")) {
                                                case "kill":
                                                    g = l;
                                                    break a;
                                                case "define":
                                                    j = l;
                                            }
                                            if (j) {
                                                j.Pi = k;
                                            } else {
                                                j = Tk();
                                            }
                                            var o = {};
                                            var j = j ? j.params : Ok;
                                            var x = i;
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
                                                o.textAlign = Nk[parseInt(e.getAttribute("ju"), 10)];
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
                                            g = new Sk(e);
                                        }
                                    }
                                    this.Db[f] = g;
                                    this.nd.push(g);
                                    break;
                                case "text":
                                    f = Rk(a[b]);
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
                        this.nd.push(Tk());
                        a = this.Ia.firstChild.childNodes;
                        b = 0;
                        for (d = a.length; b < d; b++) {
                            this.Bb.push(Rk(a[b]));
                        }
                }
            }
        }
    };
    Uk.prototype.Bb = l;
    Uk.prototype.nd = l;
    Uk.prototype.Db = l;
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
    n.Se = l;
    n.Ja = l;
    n.ua = l;
    n.ic = m;
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
            var c = a.Ja == "asr" ? N("HTML5_SUBS_TRANSCRIBED") : a.Ja;
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
    Vk.prototype.toString = function () {
        var a = [this.Ie, ": ", this.ua, " (", this.Ja, ")"];
        if (this.Fb) {
            a.push(" >> ", this.Fb.ud);
        }
        return a.join("");
    };
    var Xk = function (a) {
        this.Qe = a.languageCode;
        this.ud = a.languageName;
        this.id = a.id;
        this.ic = a.is_default;
    };
    Xk.prototype.Qe = l;
    Xk.prototype.ud = l;
    Xk.prototype.id = l;
    Xk.prototype.ic = m;
    var Yk = function (a) {
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
                    new Vk({
                        format: d,
                        languageCode: e,
                        languageName: f,
                        name: g,
                        kind: j,
                        id: o,
                        is_servable: k,
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
                    new Xk({
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
    n = Yk.prototype;
    n.Ia = l;
    n.Te = l;
    n.mf = l;
    n.nc = l;
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
                if (a.ic || this.vc < 0) {
                    this.vc = this.nc.length;
                }
                this.nc.push(a);
        }
    };
    var Zk = function (a, b, c, d) {
        this.va = a;
        if (c) {
            this.va = Ue(this.va, {
                hl: c
            });
        } else {
            a = Qe(this.va).hl || "";
            a = a.split("_").join("-");
            this.va = Ue(this.va, {
                hl: a
            });
        }
        this.H = b;
        this.Ye = !!d;
    };
    n = Zk.prototype;
    n.va = "";
    n.H = l;
    n.Ye = m;
    n.vc = 0;
    n.ab = l;
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
        var b = $k;
        var c = a.ab.Jd();
        if (!(c < 0)) {
            al(a, a.ab.bb()[c], b);
        }
    };
    var al = function (a, b, c) {
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
        d = Ue(d, e);
        Ej.info("Loading caption track from: " + d);
        a = r(function (a) {
            a = new Uk(a.responseText);
            c(a, b);
        }, a);
        Fg(d, a);
    };
    var cl = function (a, b) {
        var c = a.va;
        var d = {
            type: "list",
            tlangs: 1,
            v: a.H,
            fmts: Number(m)
        };
        if (a.Ye) {
            d.asrs = 1;
        }
        c = Ue(c, d);
        Ej.info("Getting track list from: " + c);
        d = r(function (a) {
            this.ab = new Yk(a.responseXML);
            b();
        }, a);
        Fg(c, d);
    };
    var dl = l;
    var el = l;
    var fl = -1;
    var gl = m;
    var hl = 0;
    var il = 0;
    var kl = function (a) {
        if (dl) {
            a();
        } else if (P(G("watch-captions-container"), "disabled") != "true") {
            var b = new Zk(L("TTS_URL"), L("VIDEO_ID"));
            cl(b, function () {
                jl();
                a();
            });
            dl = b;
        }
    };
    var jl = function () {
        var a = dl;
        var b = dl.bb();
        var c = b.length;
        if (c <= 0) {
            S("watch-captions-not-found");
        } else {
            var d = G("watch-captions-container");
            if (c > 1) {
                var e = document.createElement("select");
                e.id = "watch-captions-track-selector";
                for (var f = 0; f < c; ++f) {
                    var g = b[f];
                    var j = document.createElement("option");
                    var g = vc(Wk(g));
                    j.appendChild(g);
                    j.value = f;
                    e.appendChild(j);
                }
                Q(e, "change", function () {
                    al(dl, dl.bb()[this.value], $k);
                });
                d.appendChild(e);
            }
            b = document.createElement("div");
            b.id = "captions-scrollbox";
            Q(b, "mouseover", function () {
                gl = k;
            });
            Q(b, "mouseout", function () {
                gl = m;
            });
            d.appendChild(b);
            bl(a);
        }
    };
    var $k = function (a, b) {
        var c = a.Bb;
        fl = -1;
        el = a;
        qd(hl);
        var d = G("captions-scrollbox");
        d.innerHTML = "";
        var e = G("watch-captions-track-selector");
        if (e) {
            var f = dl.bb();
            for (var g = 0, j = f.length; g < j; ++g) {
                if (f[g] == b) {
                    e.options[g].selected = k;
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
            O(f, "time", o + "");
            f.onmousedown = function (a) {
                mj().seekTo(parseInt(P(this, "time"), 10), k);
                return Ud(a);
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
        hl = od(ll, 500);
    };
    var ll = function () {
        var a = mj().getCurrentTime();
        var b = el.Bb;
        var c = fl;
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
                a = G("cp-" + c);
                w(a, "cpline-highlight");
            }
            if (d >= 0) {
                a = G("cp-" + d);
                v(a, "cpline-highlight");
            }
            fl = d;
            if (!gl) {
                ml(G("cp-" + (d >= 3 ? d - 3 : 0)));
            }
        }
    };
    var ml = function (a) {
        qd(il);
        var b = G("captions-scrollbox");
        var c = Math.min(a.offsetTop - b.offsetTop, b.scrollHeight - b.offsetHeight);
        var d = 0;
        il = od(function () {
            var a = c - b.scrollTop;
            var f = Math.round((a * 100) / (1000 - d * 50));
            if (Math.abs(a) <= Math.abs(f) || d > 20) {
                b.scrollTop = c;
                qd(il);
            } else {
                b.scrollTop += f;
                d++;
            }
        }, 50);
    };
    var ol = function (a, b) {
        var c = G("flag-video-form");
        var d = G("flag-video-menu");
        if (c && d) {
            new nl(c, d, a, b);
        }
    };
    var nl = function (a, b, c, d) {
        this.i = a;
        this.k = b;
        Q(this.i, "submit", r(this.lh, this));
        Qd(this.k, r(this.kh, this));
        Q(G("flag-video-cancel"), "click", function (a) {
            a.preventDefault();
            c();
        });
        this.bc = d;
    };
    nl.prototype.kh = function (a) {
        var b;
        b = a.currentTarget;
        var c = pl(this, b);
        var a = P(b, "show-textbox-with-label");
        var d = !!P(b, "include-time");
        var e = !!P(b, "show-hate-group");
        var f = P(b, "popup-url");
        var g = P(b, "result-message") || "default";
        b = !!P(b, "no-post");
        var j = c.ph;
        this.i.reason.value = c.reason;
        this.i.sub_reason.value = j;
        c = G("flag-video-more-info-comment");
        if (a) {
            G("flag-video-more-info-textarea-label").innerHTML = a;
        }
        Ce(c, !!a);
        Ce(G("flag-video-more-info-time"), d);
        Ce(G("flag-video-more-info-hate-group"), e);
        if (f) {
            Fh(f, {
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
            T(this.i);
            ql(g);
        } else {
            O(this.i, "result-message", g);
            S(this.i);
        }
    };
    var pl = function (a, b) {
        var c = X.getInstance();
        var d = rh(c, a.k);
        oh(c, d);
        c = c.getContent(d);
        d = J("label", b);
        c.innerHTML = Jc(d);
        c = kc("selected", a.k);
        u(c, function (a) {
            w(a, "selected", "child-selected");
        });
        v(b, "selected");
        c = "";
        if ((d = P(b, "subreason") || "")) {
            var e = K(b.parentNode, "li");
            var c = P(e, "reason") || "";
            v(e, "selected", "child-selected");
        } else {
            c = P(b, "reason") || "";
        }
        return {
            reason: c,
            ph: d
        };
    };
    nl.prototype.lh = function (a) {
        a.preventDefault();
        var b = G("flag-video-submit");
        b.disabled = k;
        var c = P(this.i, "result-message");
        U(this.i.action, {
            format: "XML",
            method: "POST",
            za: $c(this.i),
            f: function () {
                ql(c);
                this.bc.call(p);
            },
            B: function (a, c) {
                rl();
                var f = G("flag-video-error");
                if (c && c.error_message) {
                    J("yt-alert-content", f).innerHTML = c.error_message;
                }
                S(f);
                b.disabled = m;
            },
            j: this
        });
    };
    var ql = function (a) {
        rl();
        T("flag-video-form-container");
        S("flag-video-result-" + a);
    };
    var rl = function () {
        var a = kc("flag-video-result", G("flag-video-results-container"));
        u(a, function (a) {
            T(a);
        });
    };
    var Bj;
    var yl = function (a) {
        if (L("ALLOW_RATINGS")) {
            var b;
            if ((b = !sl())) {
                if (L("YPC_CAN_RATE_VIDEO")) {
                    b = m;
                } else {
                    tl("watch-actions-rental-required");
                    b = k;
                }
                b = !b;
            }
            if (b) {
                if (L("YPC_SHOW_VPPA_CONFIRM_RATING") && !confirm(N("VPPA_CONFIRM"))) {
                    ul();
                } else {
                    vl();
                    Kk(a, {
                        lg: L("PLAYBACK_ID"),
                        qe: L("STATION_ID"),
                        f: function (b, d) {
                            y(G("watch-like-unlike"), a ? "unliked" : "liked", a ? "liked" : "unliked");
                            wl(d.html_content);
                            var e = G("watch-like-share-plusone");
                            if (e) {
                                new yj(e, d.video_id, d.video_url, d.lang, d.session_index);
                            }
                            ti(G("watch-actions-ajax"));
                        },
                        B: xl
                    });
                }
            }
        } else {
            tl("watch-actions-ratings-disabled");
        }
    };
    var Al = function (a, b) {
        var c = a || G("watch-flag");
        if (zl(c) && !sl()) {
            vl();
            var d = 0;
            var e = mj();
            if (e && e.pauseVideo) {
                e.pauseVideo();
                d = e.getCurrentTime();
            }
            d = Math.floor(d);
            e = Math.floor(d / 60);
            d = {
                action_get_flag_video_component: 1,
                video_id: L("VIDEO_ID"),
                t_mins: e,
                t_secs: d - e * 60
            };
            if (b) {
                d.from_dislike = 1;
            }
            U("/watch_ajax", {
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
                            c.disabled = k;
                        }
                    );
                },
                B: xl
            });
        }
    };
    var Cl = function (a, b) {
        if (zl(a)) {
            var c = Bl("watch-actions-share");
            if (Bj) {
                tl("watch-actions-share");
                Bj.na();
            } else {
                var d = L("VIDEO_ID");
                var e = l;
                if (ij()) {
                    e = ej ? bj().Ba() : l;
                }
                vl();
                Bj = new zj(c, d, e, function () {
                    tl("watch-actions-share");
                });
            }
            if (b) {
                Xg("shareOpenedFromFlash", i, i);
            } else {
                Xg("shareOpenedFromActionBar", i, i);
            }
            var f = mj();
            var g = od(function () {
                var b = z(a, "active");
                if (!f || !b) {
                    qd(g);
                } else {
                    var b = [];
                    for (var c = Math.floor(f.getCurrentTime()); c > 0;) {
                        b.unshift(c % 60);
                        c = Math.floor(c / 60);
                    }
                    while (b.length < 2) {
                        b.unshift(0);
                    }
                    b = Va(b, function (a, b) {
                        if (b > 0 && a < 10) {
                            return "0" + a;
                        } else {
                            return a;
                        }
                    });
                    Cj(b.join(":"));
                }
            }, 1000);
            Ck("share");
        }
    };
    var zl = function (a) {
        var b = !z(a, "active");
        ul();
        if (b) {
            v(a, "active");
            zh(xh.getInstance(), a);
        }
        return b;
    };
    var vl = function () {
        tl("watch-actions-loading");
    };
    var wl = function (a) {
        Bl("watch-actions-ajax").innerHTML = a;
        tl("watch-actions-ajax");
    };
    var xl = function (a, b) {
        var c = b && b.error_message;
        if (!c) {
            c = N("WATCH_ERROR_MESSAGE");
        }
        Bl("watch-error-string").innerHTML = c;
        tl("watch-actions-error");
    };
    var Dl = {};
    var Bl = function (a) {
        if (!(a in Dl)) {
            Dl[a] = G(a);
        }
        return Dl[a];
    };
    var tl = function (a) {
        var b = Bl("watch-actions-area-container");
        var a = Bl(a);
        var c = Bl("watch-actions-loading");
        var d = Bl("watch-actions-area");
        if (!De(b)) {
            b.style.height = "0px";
            S(b);
        }
        T(c);
        S(a);
        v(b, "transitioning");
        var e = d.offsetHeight + "px";
        M(function () {
            b.style.height = e;
        }, 0);
        M(function () {
            if (b.style.height == e) {
                w(b, "transitioning");
                b.style.height = "auto";
            }
        }, 500);
    };
    var ul = function () {
        var a = Bl("watch-actions-area-container");
        T(a);
        a = kc("watch-actions-panel", a);
        u(a, function (a) {
            T(a);
        });
        Bl("watch-actions-ajax").innerHTML = "";
        var a = Bl("watch-actions");
        var b = Bl("watch-subactions");
        var a = H("button", l, a);
        if (b) {
            b = H("button", l, b);
            gb(fb(a), fb(b));
        }
        u(a, function (a) {
            w(a, "active");
        });
    };
    var sl = function () {
        if (!L("LOGGED_IN")) {
            tl("watch-actions-logged-out");
            return k;
        } else {
            return m;
        }
    };
    var El;
    var Fl = l;
    var Gl = l;
    var Hl = function (a) {
        var b = Bd(a);
        qb(b, "addto-button-collapsed", "addto-button-expanded");
        document.body.appendChild(b);
        $g(a, 0, b, 0, new B(0, -4));
    };
    var Il = function (a) {
        zc(a);
    };
    var Jl = function (a, b) {
        this.k = a;
        this.dg = J("tags-menu-list", a);
        this.H = b;
        this.jd();
    };
    n = Jl.prototype;
    n.jd = function () {
        v(this.k, "loading");
        U("/pebbles_ajax", {
            method: "POST",
            j: this,
            g: {
                action_get_all_user_pebbles: 1,
                video_id: this.H
            },
            n: {
                session_token: V.pebbles_ajax
            },
            f: function (a, b) {
                this.dg.innerHTML = b.html;
                this.Xb = J("add-pebble-form", this.k);
                this.he = J("video-id", this.Xb);
                this.Zb = J("pebble-input", this.Xb);
                this.oa = J("pebble-submit-button", this.Xb);
                this.Qc();
                w(this.k, "loading");
            }
        });
    };
    n.Qc = function () {
        if (Fl && Gl) {
            Nd([Fl, Gl]);
        }
        Fl = R(this.k, "click", r(this.Nh, this), "pebble");
        Gl = Q(this.Xb, "submit", r(this.Ph, this));
        R(this.k, "click", r(this.Mh, this), "close-tags-menu");
        R(this.k, "keyup", r(this.Oh, this), "pebble-input");
    };
    n.Nh = function (a) {
        Kl(this, a.currentTarget);
    };
    n.Oh = function () {
        this.oa.disabled = ra(this.Zb.value);
    };
    n.Ph = function (a) {
        a.preventDefault();
        if (!ra(this.Zb.value)) {
            var b = a.currentTarget;
            var a = J("pebble-list", this.k);
            var b = b.pebble.value;
            var c = b.toLowerCase();
            var d = l;
            Wa(a.children, function (a) {
                var b = P(a, "pebble-name");
                if (b && b.toLowerCase() == c) {
                    d = a;
                    return k;
                } else {
                    return m;
                }
            });
            if (d) {
                if (!z(d, "selected")) {
                    Kl(this, d, k);
                }
            } else {
                Ll(this, b);
            }
            this.Zb.focus();
            this.Zb.value = "";
        }
    };
    var Kl = function (a, b, c) {
        var d = P(b, "pebble-name");
        var e = z(b, "selected");
        U("/pebbles_ajax", {
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
                session_token: V.pebbles_ajax
            }
        });
        var f = e ? -1 : 1;
        rb(b, "selected");
        d = J("pebble-count", b);
        f = parseInt(d.innerHTML, 10) + f;
        d.innerHTML = f;
        if (f == 0) {
            v(d, "unused");
        } else {
            w(d, "unused");
        }
        if (!e && c) {
            a = J("pebble-list", a.k);
            a.removeChild(b);
            a.insertBefore(b, a.children[0]);
            a.scrollTop = 0;
        }
    };
    var Ll = function (a, b) {
        U("/pebbles_ajax", {
            g: {
                action_add_pebble_to_video: 1
            },
            method: "POST",
            n: {
                video_id: a.he.value,
                pebble: b,
                session_token: V.pebbles_ajax
            }
        });
        var c = J("pebble-list", a.k);
        var d = J("pebble-template", c).cloneNode(k);
        var e = J("pebble-name", d);
        var f = J("pebble-count", d);
        O(d, "pebble-name", b);
        w(d, "pebble-template");
        v(d, "selected");
        e.innerHTML = b;
        f.innerHTML = "1";
        c.insertBefore(d, c.children[0]);
        c.scrollTop = 0;
    };
    Jl.prototype.Mh = function () {
        var a = X.getInstance();
        var b = rh(a, this.k);
        oh(a, b);
        zc(b);
    };
    var Ml;
    var Nl;
    var Ol;
    var Pl = function (a, b) {
        this.ob = a;
        this.k = G("shared-addto-menu");
        this.Sb = P(this.ob, "feature") || "";
        this.je = z(this.ob, "watch");
        this.tb = P(this.ob, "video-ids") || "";
        this.D = this.tb.split(",");
        if (!ca(Ol)) {
            Ol = z(this.k, "lightweight-panel");
        }
        var c = J("sign-in", this.k);
        if (c) {
            Q(c, "click", r(this.jh, this));
        } else if (b) {
            new Jl(this.k, this.tb);
        } else {
            this.jd();
        }
    };
    Pl.prototype.jd = function () {
        var a = {
            action_get_dropdown: "1"
        };
        if (this.Sb) {
            a.feature = this.Sb;
        }
        U("/addto_ajax", {
            kb: k,
            format: "XML",
            method: "GET",
            j: this,
            g: a,
            f: function (a, c) {
                this.k.innerHTML = c.html_content || "";
                A(this.k, "ie", D);
                this.Aa();
                Ql(this);
            }
        });
    };
    Pl.prototype.Aa = function () {
        this.e = {};
        this.e.list = G("addto-list-panel");
        this.e.Uc = G("addto-list-saved-panel");
        this.e.dc = G("addto-list-error-panel");
        this.e.ra = G("addto-note-input-panel");
        this.e.Td = G("addto-note-saving-panel");
        this.e.se = G("addto-note-saved-panel");
        this.e.Yc = G("addto-note-error-panel");
        this.e.ka = G("addto-create-panel");
        this.ec = this.e.list;
        R(this.e.list, "click", r(this.qg, this), "yt-uix-button-menu-item");
        this.$b = J("playlist-save-note", this.e.ra);
        Q(this.$b, "click", r(this.rg, this));
        var a = J("close-button", this.k);
        Q(a, "click", r(this.pg, this));
    };
    var Ql = function (a) {
        a = kc("playlist-name", a.e.list);
        u(a, function (a) {
            var c = G(a);
            var d = Hd(c);
            var e = c.innerHTML != d;
            c.innerHTML = d;
            if (e) {
                a = Dd(a, "yt-uix-button-menu-item");
                a.title = P(a, "possible-tooltip");
            }
        });
    };
    Pl.prototype.qg = function (a) {
        a.stopPropagation();
        var b = a.currentTarget;
        zh(xh.getInstance(), b);
        this.oe = m;
        var c = (a = l);
        var d = "";
        var e = P(b, "list-action");
        if (e) {
            if (e == "create-playlist") {
                Rl(this);
            } else {
                if (e == "favorites") {
                    this.oe = k;
                    c = "FL";
                    d = b.innerHTML;
                } else if (e == "watch-later") {
                    c = "WL";
                    d = b.innerHTML;
                } else {
                    c = "PL";
                    a = e;
                    b = J("playlist-name", b);
                    d = P(b, "original-html");
                }
                Sl(this, c, a);
                if (e == "watch-later" || e == "favorites" || this.D.length > 1) {
                    J("addto-title", this.e.Uc).innerHTML = d;
                    w(this.k, "lightweight-panel");
                    Tl(this, this.e.Uc, k);
                    a = J("close-note", this.k);
                    S(a);
                } else {
                    Ul(this, d);
                }
            }
        }
    };
    var Ul = function (a, b) {
        J("addto-title", a.e.ra).innerHTML = Aa(b);
        Tl(a, a.e.ra, k);
        var c = J("close-note", a.k);
        S(c);
        var d = G("addto-note");
        Q(d, "keydown", r(a.Fe, a));
        Q(d, "paste", r(a.Fe, a));
        Vl(a.e.ra, function () {
            d.focus();
        });
    };
    var Vl = function (a, b) {
        if (b) {
            var c = Pb ? "webkitTransitionEnd" : Nb ? "oTransitionEnd" : Ob ? "transitionend" : l;
            if (c) {
                Od(a, c, function () {
                    b();
                });
            } else {
                b();
            }
        }
    };
    Pl.prototype.Fe = function (a) {
        var b = a.target;
        var c = J("addto-note-label", this.e.ra);
        M(
            r(function () {
                var a = ra(b.value);
                if (a) {
                    S(c);
                } else {
                    T(c);
                }
                if (!a && this.G && this.Hc) {
                    Fd(this.$b, k);
                } else {
                    Fd(this.$b, m);
                }
            }, this),
            0
        );
    };
    var Tl = function (a, b, c) {
        var c = c ? "slide" : "fade";
        var d = ["fade", "slide"];
        y(a.ec, d, c);
        y(b, d, c);
        if (Ol && b == a.e.list) {
            v(a.k, "lightweight-panel");
        }
        if (z(b, "dismissed-panel")) {
            w(b, "dismissed-panel");
            w(a.ec, "active-panel");
        } else {
            qb(a.ec, "active-panel", "dismissed-panel");
        }
        v(b, "active-panel");
        a.ec = b;
    };
    var Rl = function (a) {
        Tl(a, a.e.ka, k);
        Wl(a);
        vd(a.k, "video-ids");
        var b = G("addto-create-playlist");
        Q(b, "keydown", r(a.ed, a));
        Q(b, "paste", r(a.ed, a));
        Vl(a.e.ka, function () {
            b.focus();
        });
        var c = J("addto-create-cancel-button", a.e.ka);
        Q(
            c,
            "click",
            r(function () {
                Xl(this);
            }, a)
        );
        c = J("create-playlist-button", a.e.ka);
        Q(c, "click", r(a.$g, a));
    };
    var Wl = function (a) {
        a.ze = J("addto-create-playlist", a.e.ka);
        a.Ke = J("addto-create-playlist-label", a.e.ka);
        a.Je = J("create-playlist-button", a.e.ka);
        a.kd = J("privacy-form", a.e.ka);
        R(a.kd, "click", r(a.ed, a), "playlist-privacy-option");
    };
    Pl.prototype.$g = function () {
        var a = this.ze.value;
        this.mg = k;
        var b = parseInt(bd(this.kd), 10);
        Sl(this, "PL", l, a, b);
        if (this.D.length > 1) {
            Xl(this);
        } else {
            Ul(this, a);
        }
    };
    Pl.prototype.ed = function () {
        M(
            r(function () {
                var a = ra(this.ze.value);
                if (a) {
                    S(this.Ke);
                } else {
                    T(this.Ke);
                }
                var b = bd(this.kd);
                if (a || !b) {
                    Fd(this.Je, m);
                } else {
                    Fd(this.Je, k);
                }
            }, this),
            0
        );
    };
    Pl.prototype.pg = function () {
        Xl(this);
    };
    var Xl = function (a) {
        var b = X.getInstance();
        var c = rh(b, a.k);
        if (c && P(c, "video-ids") == a.tb) {
            oh(b, c);
        }
    };
    var Sl = function (a, b, c, d, e) {
        a.ia = b;
        zk({
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
        vd(a.k, "video-ids");
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
        if ((a = K(a.ob, "a", l)) && a.href) {
            a = Qe(a.href);
            d.link_feature = a.feature || "";
        }
        a = Oe(d);
        Xg("addto", a, i);
    };
    n = Pl.prototype;
    n.fg = function (a, b) {
        this.G = b.list_id || "";
        this.Hc = b.setvideo_id || "";
        var c = b.html_content || "";
        var d = b.list_url || "";
        if (this.G && this.Hc) {
            var e = J("addto-title", this.k);
            var f = document.createElement("a");
            f.href = d;
            f.innerHTML = e.innerHTML;
            yc(e);
            e.appendChild(f);
            if (!ra(G("addto-note").value)) {
                Fd(this.$b, k);
            }
        }
        if (!this.je && (d = Dd(this.ob, "ux-thumb-wrap"))) {
            if ((e = J("video-in-quicklist", d))) {
                zc(e);
            }
            e = document.createElement("span");
            e.className = "video-in-quicklist";
            e.innerHTML = c;
            d.appendChild(e);
        }
        c = N("PLAYLIST_BAR_ADDED_TO_PLAYLIST");
        if (this.oe) {
            c = N("PLAYLIST_BAR_ADDED_TO_FAVORITES");
        }
        gj(this.ia, this.G, this.D, c);
    };
    n.eg = function (a, b) {
        var c = b && b.error_message;
        if (c) {
            J("error-details", this.e.dc).innerHTML = c;
            var c = J("show-menu-link", this.e.dc);
            var d = Q(
                c,
                "click",
                r(function (a) {
                    a.preventDefault();
                    Nd(d);
                    w(this.e.ra, "dismissed-panel", "fade", "slide");
                    w(this.e.Uc, "dismissed-panel", "fade", "slide");
                    a = J("close-note", this.k);
                    T(a);
                    if (this.mg) {
                        Tl(this, this.e.ka, k);
                    } else {
                        Tl(this, this.e.list, k);
                    }
                }, this)
            );
            if ((c = G("addto-create-name"))) {
                c.disabled = m;
            }
            w(this.e.dc, "dismissed-panel", "fade", "slide");
            Tl(this, this.e.dc);
        } else {
            Xl(this);
        }
        if (this.je) {
            xl(0, b);
        }
    };
    n.rg = function () {
        U("/playlist_bar_ajax", {
            method: "POST",
            kb: k,
            g: {
                action_set_playlist_item_annotation: 1
            },
            n: {
                annotation: G("addto-note").value,
                playlist_id: this.G,
                setvideo_id: this.Hc,
                session_token: V.playlist_bar_ajax
            },
            f: this.Qf,
            B: this.Pf,
            j: this
        });
        Tl(this, this.e.Td);
    };
    n.Qf = function () {
        var a = J("addto-title", this.e.ra);
        var b = Bd(a);
        v(b, "yt-uix-tooltip-reverse");
        J("panel-content", this.e.se).appendChild(b);
        Tl(this, this.e.se);
        M(
            r(function () {
                zh(xh.getInstance(), b);
                Xl(this);
            }, this),
            3000
        );
    };
    n.Pf = function (a, b) {
        var c = b && b.errors;
        if (c) {
            var d = J("error-details", this.e.Yc);
            yc(d);
            u(c, function (a) {
                var b = document.createElement("li");
                b.innerHTML = a;
                d.appendChild(b);
            });
            var c = J("add-note-link", this.e.Yc);
            var e = Q(
                c,
                "click",
                r(function (a) {
                    a.preventDefault();
                    Nd(e);
                    w(this.e.Td, "dismissed-panel");
                    Tl(this, this.e.ra);
                }, this)
            );
            Tl(this, this.e.Yc);
        } else {
            Xl(this);
        }
    };
    n.jh = function () {
        var a = Ue("/addto_ajax", {
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
        a.value = V.addto_ajax_logged_out;
        b.appendChild(a);
        document.body.appendChild(b);
        b.submit();
    };
    var Yl = function (a) {
        a = K(a.currentTarget, "FORM");
        Hg(a, {
            method: "POST",
            n: {
                session_token: V.pebbles_ajax
            }
        });
    };
    var Zl = function (a) {
        a = K(a.currentTarget, "FORM");
        Hg(a, {
            method: "POST",
            n: {
                session_token: V.pebbles_ajax
            }
        });
    };
    var $l = m;
    window.gapi = window.gapi || {};
    var am = /^(https?:)?\/\/([^/:@]*)(:[0-9]+)?(\/[\w.,:!=/-]*)(\?[^#]*)?(#.*)?$/;
    var bm = /^[?#]([^&]*&)*jsh=([^&]*)/;
    var cm = function (a) {
        var b = window.console;
        if (b) {
            b.warn("gapi.load: " + a);
        }
    };
    var dm = function (a) {
        var b = window.location.search;
        var c = window.location.hash;
        var a = a.h;
        if ((b = (b && bm.exec(b)) || (c && bm.exec(c)))) {
            try {
                a = decodeURIComponent(b[2]);
            } catch (d) {
                cm("Invalid hint " + b[2]);
            }
        }
        return a;
    };
    var em = function (a) {
        a.sort();
        for (var b = 0; b < a.length;) {
            if (!a[b] || (b && a[b] == a[b - 1])) {
                a.splice(b, 1);
            } else {
                ++b;
            }
        }
    };
    var fm = function (a, b) {
        var c = {};
        for (var d = 0; d < b.length; d++) {
            c[b[d]] = k;
        }
        for (d = 0; d < a.length; d++) {
            if (!c.hasOwnProperty(a[d])) {
                return m;
            }
        }
        return k;
    };
    var gm = function (a) {
        if (document.readyState != "loading") {
            return m;
        }
        if (typeof window.___gapisync != "undefined") {
            return window.___gapisync;
        }
        if (a && ((a = a.sync), typeof a != "undefined")) {
            return a;
        }
        for (var a = document.getElementsByTagName("meta"), b = 0, c; (c = a[b]); ++b) {
            if (c.getAttribute("name") == "generator" && c.getAttribute("content") == "blogger") {
                return k;
            }
        }
        return m;
    };
    var hm = function (a, b) {
        if (gm(a)) {
            document.write('<script src="' + encodeURI(b) + '"></script>');
        } else {
            var c = document.createElement("script");
            c.setAttribute("src", b);
            c.async = k;
            var d = document.getElementsByTagName("script")[0];
            d.parentNode.insertBefore(c, d);
        }
    };
    var im = function (a, b, c, d, e, f) {
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
            cm("Unknown hint type " + g);
            return "";
        }
        if (!j) {
            return "";
        }
        e = j + e;
        f = am.exec(e);
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
                            d = m;
                            break a;
                        }
                        d = d.split(",");
                        g = 0;
                        for (j = d.length; g < j; ++g) {
                            a = d[g];
                            b = f.lastIndexOf(a);
                            if ((b == 0 || a.charAt(0) == "." || f.charAt(b - 1) == ".") && f.length - a.length == b) {
                                d = k;
                                break a;
                            }
                        }
                    }
                    d = m;
                }
                j = !d;
            }
        }
        if (j) {
            h("gapi.load: Invalid URI" + (e && " " + e));
        }
        return e;
    };
    var jm = function (a, b, c) {
        if (c) {
            (a[b] = a[b] || []).push(c);
        }
    };
    var lm = function (a) {
        if (a.q && a.q.length > 0) {
            (window.gapi.load || km).apply(l, a.q.shift());
        }
    };
    var mm = function (a) {
        if (a) {
            try {
                a();
            } catch (b) {
                return b;
            }
        }
        return l;
    };
    var nm = window.gapi;
    var om = function () {
        if (nm._) {
            return nm._;
        }
        var a;
        if ((a = Object.create) && /\[native code\]/.test(a)) {
            a = a(l);
        } else {
            a = {};
            for (var b in a) {
                a[b] = i;
            }
        }
        return (nm._ = a);
    };
    var qm = function (a, b, c, d, e) {
        var f = (e.Q = e.Q || []);
        var g = (e.lc = e.lc || {});
        f.push([a, b, d]);
        nm[c] = function (b) {
            nm[c] = i;
            if (!g[a]) {
                g[a] = b;
                var d;
                for (; f[0] && g[f[0][0]];) {
                    b = f.shift();
                    pm(b[2], e);
                    g[b[0]].call(window, om());
                    g[b[0]] = k;
                    if ((b = mm(b[1])) && !d) {
                        d = b;
                    }
                }
                e.p = i;
                lm(e);
                if (d) {
                    h(d);
                }
            }
        };
    };
    var pm = function (a, b) {
        jm(b, "ci", a._ci);
        var c = a.config;
        if (nm.config) {
            nm.config.update(c);
        } else {
            jm(b, "cu", c);
        }
    };
    var rm = function (a) {
        if (!a.I) {
            a.I = 0;
        }
        return "loaded" + a.I++;
    };
    var km = function (a, b) {
        var c;
        var d = {};
        if (typeof b !== "function") {
            d = b || {};
            c = d.callback;
        } else {
            c = b;
        }
        var e = (window.___jsl = window.___jsl || {});
        var f = dm(e);
        var g = f && !!f.match(/\/gapi\/|ms=gapi/);
        if (e.p) {
            jm(e, "q", [a, b]);
        } else {
            if (!f) {
                h("gapi.load: No hint present");
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
                    em(f);
                }
                x = e.l = e.l || [];
                em(x);
            }
            if (g) {
                if (!fm(f, x) && ((g = rm(e)), (j = im(f, x, j, e, d, g)))) {
                    e.p = f;
                    qm(j, c, g, d, e);
                    x.push.apply(x, f);
                    hm(d, j);
                    return;
                }
                pm(d, e);
                if (c) {
                    var C = mm(c);
                }
            } else {
                pm(d, e);
                if (!fm(f, x)) {
                    var F = o ? "cm" : "c";
                    if ((j = im(f, x, j, e, d, l))) {
                        e.p = f;
                        e.o = 1;
                        e[F] = function () {
                            e.p = i;
                            e[F] = i;
                            var a = mm(c);
                            lm(e);
                            if (a) {
                                h(a);
                            }
                        };
                        x.push.apply(x, f);
                        hm(d, j);
                        return;
                    }
                }
                C = mm(c);
            }
            lm(e);
            if (C) {
                h(C);
            }
        }
    };
    var sm = -1;
    var vm = function () {
        if (sm == -1) {
            sm = parseInt(ae("ACTIVITY", "0"), 10);
            Q(document, "keypress", tm);
            Q(document, "click", um);
        }
    };
    var tm = function () {
        wm();
    };
    var um = function () {
        wm();
    };
    var wm = function () {
        var a = oa();
        if (!(a - sm < 1000)) {
            sm = a;
            $d("ACTIVITY", "" + a);
        }
    };
    var xm = function () {
        return oa() - sm;
    };
    var ym = function (a, b, c, d, e) {
        this.A = l;
        this.Lh = c;
        this.Ah = a;
        this.Bh = b;
        this.Ih = d;
        this.Kh = L("GOOGLEPLUS_HOST") + (e != l ? "/u/" + e : "") + "/_/notifications/frame#pid=36";
        this.Jh = G(a);
        this.ub = G(b);
    };
    var zm = function (a, b, c, d) {
        return {
            onOpen: r(function (a) {
                return a.openInto(c);
            }, a),
            onReady: r(function () {
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
    var Am = function (a, b, c) {
        if (typeof c === "undefined") {
            a[b]();
        } else {
            a[b](c);
        }
    };
    n = ym.prototype;
    n.xb = function (a) {
        var b = {
            setNotificationWidgetHeight: r(function (a) {
                this.Jh.style.height = a;
            }, this),
            setNotificationText: r(function (a) {
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
    n.load = function (a) {
        iframes.setHandler("iframe-style", zm(this, a, this.Ah, m));
        iframes.setHandler("onepick", zm(this, a, this.Bh, k));
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
        if (a.indexOf("/watch?") != -1) {
            Am(this.A, "setPrefill", {
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
        Am(this.A, "onShowShareboxOnly", {});
    };
    var Bm = function (a, b) {
        if (b) {
            Am(a.A, "onActive");
        } else {
            Am(a.A, "onIdle");
        }
    };
    var Cm = function (a, b) {
        this.wb = this.vb = m;
        this.Zc = 0;
        this.c = G("sb-container");
        this.fc = G("sb-button-notify");
        this.Eg = Ed("SPAN", "yt-uix-button-content", G("sb-button-notify"));
        this.ub = G("sb-onepick-target");
        this.A = new ym("sb-target", "sb-onepick-target", r(this.Jg, this), a, b);
        this.A.load({
            hideNotificationWidget: r(this.te, this),
            showOnepick: r(this.Ig, this),
            hideOnepick: r(this.Hg, this)
        });
        this.Fg = xe(this.ub);
        this.ue();
        Q(window, "resize", r(this.ue, this));
        Q(window, "click", r(this.te, this));
        vm();
        od(r(this.Gg, this), 120000);
    };
    Cm.prototype.Ii = function (a) {
        if (this.vb) {
            Dm(this);
            Bm(this.A, k);
        } else {
            if (this.wb) {
                Em(this);
            }
            this.wd();
            Bm(this.A, m);
        }
        Td(a);
    };
    Cm.prototype.Ji = function (a) {
        if (this.wb) {
            Em(this);
        } else {
            if (this.vb) {
                Dm(this);
            }
            this.xd();
        }
        Td(a);
    };
    Cm.prototype.wd = function () {
        this.A.close();
        Fm(this, k, "notif");
        v(this.fc, "sb-notif-clicked");
        this.A.wd();
        this.vb = k;
    };
    Cm.prototype.xd = function () {
        this.A.close();
        Fm(this, k, "sharebox");
        this.A.xd();
        this.wb = k;
    };
    var Fm = function (a, b, c) {
        c = "sb-card-" + c;
        if (b) {
            y(a.c, "sb-off", "sb-on");
            v(a.c, c);
        } else {
            y(a.c, "sb-on", "sb-off");
            w(a.c, c);
        }
    };
    var Em = function (a) {
        Fm(a, m, "sharebox");
        a.wb = m;
    };
    var Dm = function (a) {
        Fm(a, m, "notif");
        a.vb = m;
        w(a.fc, "sb-notif-clicked");
    };
    Cm.prototype.te = function () {
        if (this.vb || this.wb) {
            this.A.close();
            Dm(this);
            Em(this);
            Gm(this);
        }
    };
    Cm.prototype.Jg = function (a) {
        this.Zc = a;
        Gm(this);
    };
    var Gm = function (a) {
        Dc(a.Eg, a.Zc + "");
        if (a.Zc == 0) {
            y(a.fc, "sb-notif-on", "sb-notif-off");
        } else {
            y(a.fc, "sb-notif-off", "sb-notif-on");
        }
    };
    Cm.prototype.Ig = function () {
        y(this.ub, "sb-off", "sb-on");
    };
    Cm.prototype.Hg = function () {
        y(this.ub, "sb-on", "sb-off");
    };
    Cm.prototype.ue = function () {
        var a = Math.max((oc(window).height - this.Fg.height) / 2, 0);
        var b = this.ub;
        if (fa("top")) {
            le(b, a + "px", "top");
        } else {
            ub("top", na(le, b));
        }
    };
    Cm.prototype.Gg = function () {
        if (xm() > 600000) {
            Bm(this.A, m);
        } else {
            Bm(this.A, k);
        }
    };
    var Hm = function (a) {
        for (var b = Bc(G("picker-container")); b;) {
            if (a && a != b.id) {
                T(b);
            }
            b = b.nextElementSibling != i ? b.nextElementSibling : Ac(b.nextSibling);
        }
    };
    var Im;
    var Jm;
    var Km = function (a, b) {
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
    t(Lm, Km);
    Lm.prototype.Cb = "/subscription_ajax";
    Lm.prototype.gb = {};
    var Mm = function (a, b) {
        a.Cb = Se(a.Cb, b);
    };
    Lm.prototype.sf = function () {
        return this.gb;
    };
    Lm.prototype.Ef = function (a) {
        var b = l;
        var c = [N("SUBSCRIBE_SERVER_ERROR")];
        try {
            b = vg(a.responseText);
        } catch (d) {}
        if ((a = b && b.response)) {
            this.bc(this, a);
        } else {
            this.Ec(this, c);
        }
    };
    Lm.prototype.Nd = function (a, b) {
        var c = b ? [b] : [N("SUBSCRIBE_SERVER_ERROR")];
        try {
            var d = vg(a.responseText);
        } catch (e) {
            this.Ec(this, c);
            return;
        }
        this.Ec(this, d.errors);
    };
    var Nm = function (a) {
        Im = Lg;
        Jm = a;
    };
    var Om = l;
    var Pm = [];
    var Rm = function (a) {
        Pm.push(a);
        if (!Om) {
            Qm();
        }
    };
    var Qm = function () {
        if (Pm.length && !Om) {
            var a = Pm.shift();
            if (a) {
                var b = a.sf();
                if (!b) {
                    b = {};
                }
                b.session_token = Jm;
                try {
                    var c = {
                        method: "POST",
                        postBody: Oe(b),
                        onComplete: Sm,
                        onException: Tm,
                        onError: Tm
                    };
                } catch (d) {
                    a.Nd({}, N("SUBSCRIBE_JS_ERROR"));
                    return;
                }
                Om = a;
                Im(a.Cb, c);
            }
        }
    };
    var Sm = function (a) {
        var b = Om;
        Om = l;
        Qm();
        if (b) {
            b.Ef(a);
        }
    };
    var Tm = function (a) {
        var b = Om;
        Om = l;
        Qm();
        if (b) {
            b.Nd(a);
        }
    };
    var Wm = function (a) {
        var b = Um(a);
        if (P(b, "subscription-menu-type") == "button") {
            b = X.getInstance();
            b = kh(b, a);
            if (J("subscription-menu-loader", b)) {
                a.loader = b.innerHTML;
            }
            Vm(a);
        } else {
            b = Um(a);
            b = G(P(b, "subscription-expandable-id"));
            if (De(b)) {
                T(b);
                v(a, "yt-uix-expander-collapsed");
            } else {
                Vm(a);
                S(b);
                w(a, "yt-uix-expander-collapsed");
            }
        }
    };
    var Vm = function (a) {
        if (!P(a, "loaded")) {
            var b = Um(a);
            var c = P(b, "subscription-type");
            var d = P(b, "subscription-xsrf") || "";
            var e = P(b, "subscription-menu-type");
            var f = {};
            var g = P(b, "subscription-value");
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
            Nm(d);
            d = new Lm(Xm, function () {
                Ym(b, k);
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
    };
    var Um = function (a) {
        return K(a, l, "subscription-container");
    };
    var Zm = function (a) {
        var b = K(a, l, "subscription-menu-expandable");
        if (b) {
            return b.expandableMenuSubscription;
        }
        a = K(a, l, "yt-uix-button-menu");
        b = X.getInstance();
        a = rh(b, a);
        return Um(a);
    };
    var $m = function (a) {
        var b = kc("subscription-container");
        var c = P(a, "subscription-type");
        var d = P(a, "subscription-value");
        return (b = Ua(b, function (a) {
            if (P(a, "subscription-type") == c && P(a, "subscription-value") == d) {
                return k;
            }
        }));
    };
    var Ym = function (a, b) {
        var c = P(a, "subscription-id");
        var d = $m(a);
        u(d, function (a) {
            if (b) {
                if (P(a, "subscription-menu-type") == "button") {
                    an(a);
                } else {
                    bn(a, k);
                }
                var d = Ed(l, "subscription-subscribed-container", a);
                var g = Ed(l, "subscribe-button", a);
                var j = Ed(l, "subscription-options-button", a);
                vd(a, "subscription-id");
                T(d);
                S(g);
                vd(j, "loaded");
            } else {
                d = Ed(l, "subscription-subscribed-container", a);
                g = Ed(l, "subscribe-button", a);
                O(a, "subscription-id", c);
                T(g);
                S(d);
            }
        });
    };
    var cn = function (a, b) {
        if (P(a, "subscription-menu-type") == "button") {
            var c = J("subscription-options-button", a);
            var d = X.getInstance();
            var e = kh(d, c);
            if (e) {
                e.innerHTML = b;
                sh(d, c, e);
            }
        } else {
            c = G(P(a, "subscription-expandable-id"));
            d = J("subscription-menu-loader", c);
            e = J("subscription-menu-body", c);
            e.innerHTML = b;
            c.expandableMenuSubscription = a;
            T(d);
            S(e);
        }
    };
    var an = function (a) {
        var a = J("subscription-options-button", a);
        var b = X.getInstance();
        kh(b, a);
        oh(b, a);
        if (a.loader) {
            var c = a.loader;
            var d = kh(b, a);
            if (d) {
                d.innerHTML = c;
                sh(b, a, d);
            }
        }
        vd(a, "loaded");
    };
    var bn = function (a, b) {
        var c = th.getInstance();
        var d = J("yt-uix-expander", a);
        var e = G(P(a, "subscription-expandable-id"));
        if (b) {
            var f = J("subscription-menu-loader", e);
            var g = J("subscription-menu-body", e);
            vd(d, "loaded");
            S(f);
            T(g);
            g.innerHTML = "";
        }
        if (De(e)) {
            c.collapse(d);
        }
    };
    var dn = function (a, b) {
        var c = a.userData.subscription;
        var d = b.html_content;
        a.userData.eventTrigger.disabled = m;
        O(c, "subscription-id", b.id);
        Ym(c, m);
        if (d) {
            cn(c, d);
            d = J("subscription-options-button", c);
            O(d, "loaded", "true");
            Wm(d);
            if (P(c, "subscription-menu-type") == "button") {
                X.getInstance().Rd(d);
            }
        }
    };
    var en = function (a) {
        zc(a.userData.collection);
    };
    var fn = function (a) {
        Ym(a.userData.subscription, k);
    };
    var Xm = function (a, b) {
        var c = a.userData.eventTrigger;
        var d = a.userData.subscription;
        var e = b.html_content;
        O(d, "subscription-id", b.id);
        cn(d, e);
        O(c, "loaded", "true");
    };
    var gn = function (a) {
        var b = a.userData.subscription;
        a.userData.eventTrigger.disabled = m;
        a = $m(b);
        u(a, function (a) {
            if (P(a, "subscription-menu-type") == "button") {
                an(a);
            } else {
                bn(a, k);
            }
        });
    };
    var hn = function (a) {
        if ((a = a.userData.eventTrigger)) {
            a.disabled = m;
        }
    };
    var jn = function (a, b) {
        this.u = a;
        this.Yb = b || l;
        this.Xa = P(a, "subscription-type") || "user";
        this.Pc = P(a, "subscription-value") || "";
        this.rh = !!P(a, "enable-tooltip");
        this.Vb = !!P(a, "enable-hovercard");
        this.sb = m;
        this.cd();
    };
    jn.prototype.getId = function () {
        return P(this.u, "subscription-id") || l;
    };
    var ln = function (a, b) {
        if (b) {
            O(a.u, "subscription-id", b);
        } else {
            vd(a.u, "subscription-id");
        }
        kn(a);
    };
    jn.prototype.getValue = function () {
        return this.Pc;
    };
    jn.prototype.getType = function () {
        return this.Xa;
    };
    var kn = function (a) {
        A(a.u, "subscribed", !!a.getId());
        var b = W(ak.getInstance(), "target");
        A(a.u, b, !!a.getId() && a.Vb);
        if (a.rh) {
            b = (a.getId() ? "un" : "") + "subscribe-tooltip";
            b = P(a.u, b) || "";
            Ah(xh.getInstance(), a.u, b);
        }
    };
    jn.prototype.cd = function () {
        Q(this.u, "click", r(this.Qh, this));
        nf("SUBSCRIBE", this.Xe, this);
        nf("UNSUBSCRIBE", this.Xe, this);
        if (this.Vb) {
            Q(this.u, "mouseover", r(this.Rh, this));
        }
        kn(this);
    };
    jn.prototype.Xe = function (a, b, c, d) {
        if (c != this.getId() && this.getValue() == a && this.getType() == b) {
            ln(this, c);
        }
        if (d != this.u && this.Vb) {
            ak.getInstance().Z(this.u);
        }
    };
    jn.prototype.Qh = function () {
        if (this.sb) {
            return m;
        }
        zh(xh.getInstance(), this.u);
        if (this.getId()) {
            mn(this);
        } else {
            nn(this);
        }
    };
    jn.prototype.Rh = function () {
        if (this.getId()) {
            M(
                r(function () {
                    on(this);
                }, this),
                350
            );
        }
    };
    var on = function (a) {
        var b = ak.getInstance();
        if (!a.ie && Yj(b, a.u)) {
            a.ie = k;
            var c = {
                hovercard: 1
            };
            c["action_get_subscription_form_for_" + a.Xa] = 1;
            var d = {
                session_token: V.subscription_ajax
            };
            d[pn(a)] = a.Pc;
            U("/subscription_ajax", {
                method: "POST",
                g: c,
                n: d,
                j: a,
                f: function (a, c) {
                    var d = this.u;
                    var j = c.response.html_content;
                    var o = jh(b, d);
                    if (o) {
                        var x = b.rb(o);
                        if (x) {
                            x.innerHTML = j;
                            if (z(o, W(b, "active"))) {
                                j = Wj(b, d, o);
                                Xj(b, d, j);
                            }
                        }
                    }
                    qn(this);
                },
                B: function () {
                    this.ie = m;
                }
            });
        }
    };
    var qn = function (a) {
        var b = ak.getInstance();
        var c = jh(b, a.u);
        var d = b.rb(c);
        u(
            d.getElementsByTagName("input"),
            function (a) {
                Q(
                    a,
                    "change",
                    r(function () {
                        var a = d.getElementsByTagName("form")[0];
                        var b = a.action || document.location.href;
                        var c = a.method.toUpperCase() || "GET";
                        var a = $c(a);
                        Fg(b, i, c, a, i);
                    }, this)
                );
            },
            a
        );
    };
    var nn = function (a) {
        if (L("LOGGED_IN")) {
            var b = pn(a);
            var c = {};
            c["action_create_subscription_to_" + a.Xa] = 1;
            var d = P(a.u, "subscription-feature");
            if (d) {
                c.feature = d;
            }
            d = {
                session_token: V.subscription_ajax
            };
            d[b] = a.Pc;
            a.sb = k;
            a.u.disabled = k;
            U("/subscription_ajax", {
                method: "POST",
                j: a,
                g: c,
                n: d,
                f: function (a, b) {
                    ln(this, b.response.id);
                    of("SUBSCRIBE", this.getValue(), this.getType(), this.getId(), this.u);
                    if (this.Vb) {
                        ak.getInstance().show(this.u);
                        on(this);
                    }
                    if (this.Yb) {
                        this.Yb(this.u, k);
                    }
                },
                ga: function () {
                    this.sb = m;
                    this.u.disabled = m;
                }
            });
            Ck("subscribe");
        }
    };
    var mn = function (a) {
        var b = {
            s: a.getId(),
            session_token: V.subscription_ajax
        };
        var c = {
            action_remove_subscriptions: 1
        };
        var d = P(a.u, "subscription-feature");
        if (d) {
            c.feature = d;
        }
        a.sb = k;
        a.u.disabled = k;
        U("/subscription_ajax", {
            method: "POST",
            j: a,
            g: c,
            n: b,
            f: function () {
                ln(this, l);
                of("UNSUBSCRIBE", this.getValue(), this.getType(), l, l);
                if (this.Yb) {
                    this.Yb(this.u, m);
                }
            },
            ga: function () {
                this.sb = m;
                this.u.disabled = m;
            }
        });
        Ck("unsubscribe");
    };
    var pn = function (a) {
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
    var rn = function () {};
    var sn = function () {};
    t(sn, rn);
    sn.prototype.N = function () {
        var a = 0;
        Qc(this.fb(k), function (b) {
            Ra(b);
            a++;
        });
        return a;
    };
    sn.prototype.clear = function () {
        var a = Rc(this.fb(k));
        var b = this;
        u(a, function (a) {
            b.remove(a);
        });
    };
    var tn = function (a) {
        this.fa = a;
    };
    t(tn, sn);
    n = tn.prototype;
    n.set = function (a, b) {
        try {
            this.fa.setItem(a, b);
        } catch (c) {
            h("Storage mechanism: Quota exceeded");
        }
    };
    n.get = function (a) {
        a = this.fa.getItem(a);
        if (fa(a) || a === l) {
            return a;
        }
        h("Storage mechanism: Invalid value was encountered");
    };
    n.remove = function (a) {
        this.fa.removeItem(a);
    };
    n.N = function () {
        return this.fa.length;
    };
    n.fb = function (a) {
        var b = 0;
        var c = new Oc();
        var d = this;
        c.next = function () {
            if (b >= d.N()) {
                h(Nc);
            }
            var c = Ra(d.fa.key(b++));
            if (a) {
                return c;
            }
            c = d.fa.getItem(c);
            if (fa(c)) {
                return c;
            }
            h("Storage mechanism: Invalid value was encountered");
        };
        return c;
    };
    n.clear = function () {
        this.fa.clear();
    };
    var un = function () {
        var a = l;
        try {
            a = window.localStorage || l;
        } catch (b) {}
        this.fa = a;
    };
    t(un, tn);
    var vn = function (a) {
        this.Ob = a;
        this.uf = new xg();
    };
    n = vn.prototype;
    n.Ob = l;
    n.uf = l;
    n.set = function (a, b) {
        if (ca(b)) {
            this.Ob.set(a, zg(this.uf, b));
        } else {
            this.Ob.remove(a);
        }
    };
    n.get = function (a) {
        a = this.Ob.get(a);
        if (a !== l) {
            try {
                return vg(a);
            } catch (b) {
                h("Storage: Invalid value was encountered");
            }
        }
    };
    n.remove = function (a) {
        this.Ob.remove(a);
    };
    var wn = function () {
        var a = new un();
        var b;
        if ((b = a)) {
            a: {
                try {
                    b = !!a.fa && !!a.fa.getItem;
                    break a;
                } catch (c) {}
                b = m;
            }
        }
        if (b) {
            this.eb = new vn(a);
        }
    };
    wn.prototype.eb = l;
    wn.prototype.getVolume = function () {
        var a = {
            volume: 100,
            muted: m,
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
            a.muted = b.muted == i ? m : b.muted;
        }
        return a;
    };
    if (!document.getElementById && document.all) {
        document.getElementById = function (a) {
            return document.all[a];
        };
    }
    var xn = m;
    var yn = -1;
    var zn = "";
    var An = {};
    var Bn = new lf();
    var Cn = l;
    var Dn = function () {
        return L("RESUME_COOKIE_NAME");
    };
    var En = function (a, b) {
        var c = Dn();
        if (c) {
            var d = ae(c, "").split(",");
            var d = Ua(d, function (b) {
                return b.indexOf(a) != 0 && b.length;
            });
            if (d.length >= 4) {
                d.shift();
            }
            d.push(a + ":" + b);
            $d(c, d.join(","), 1814400);
        }
    };
    var Fn = function (a) {
        var b = Dn();
        if (b) {
            var c = ae(b, "").split(",");
            var c = Ua(c, function (b) {
                return b.indexOf(a) != 0;
            });
            if (c.length == 0) {
                be(b);
            } else {
                $d(b, c.join(","), 1814400);
            }
        }
    };
    var Gn = function () {
        var a = mj();
        var b = a.getDuration();
        var a = Math.floor(a.getCurrentTime());
        var c = L("VIDEO_ID");
        if (a <= 120 || a + 120 >= b) {
            Fn(c);
        } else {
            En(c, Math.floor(a));
        }
    };
    var Hn = function (a, b) {
        if (rd && !a.addEventListener) {
            var c = b ? b * 2 : 50;
            M(function () {
                Hn(a, c);
            }, c);
        } else {
            if (b) {
                Xg("ael_delayed", "delay=" + b, i);
            }
            In(a);
            Bn.xc("READY_STATE_TOPIC", a);
        }
    };
    var In = function (a) {
        a.addEventListener("onStateChange", Jn);
        a.addEventListener("NEXT_CLICKED", Kn);
        a.addEventListener("SIZE_CLICKED", Ln);
        a.addEventListener("onVolumeChange", Mn);
        a.addEventListener("SHARE_CLICKED", Nn);
        if (Dn()) {
            Q(window, "beforeunload", Gn);
        }
        if (Re(window.location.hash).q && L("WIDE_PLAYER_STYLES")) {
            lj(m);
        }
        var b = G("watch-player");
        if (b) {
            b.style.background = "transparent";
        }
        hj(a);
        Cn = new wn();
    };
    var Jn = function (a) {
        yn = a;
        switch (a) {
            case 0:
                if (Ni(bj())) {
                    bj().next(m, "autoplay");
                }
        }
    };
    var Mn = function (a) {
        var b = Cn;
        if (b.eb) {
            var c = {};
            c.volume = isNaN(a.volume) ? b.getVolume().volume : Math.min(Math.max(a.volume, 0), 100);
            c.nonNormalized = a.nonNormalized;
            c.muted = a.muted == i ? b.getVolume().muted : a.muted;
            try {
                b.eb.set("yt-player-volume", c);
            } catch (d) {}
        }
    };
    var Kn = function () {
        bj().next(k, i);
    };
    var Ln = function (a) {
        if (L("FULLSCREEN_EXPAND")) {
            A(document.body, "fullscreen", a);
        } else {
            if (a) {
                $d("wide", "1");
            } else {
                $d("wide", "0");
            }
            lj(a);
        }
    };
    var Nn = function () {
        Cl(G("watch-share"), k);
    };
    var On = function (a, b) {
        var c = b != l ? b : k;
        var d = mj();
        d.seekTo(a, k);
        if (c) {
            if (G("watch-video-container")) {
                window.scroll(0, 0);
            } else {
                window.location.href = "#movie_player";
            }
        }
        d.playVideo();
    };
    var Qn = function () {
        if (xn) {
            var a = window.location.hash;
            if (a != zn) {
                zn = a;
                a = Re(a);
                if ("t" in a && a.t != An.t) {
                    On(Pn(a.t), m);
                }
                An = a;
            }
        }
    };
    var Pn = function (a) {
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
    var Rn = m;
    var Sn = l;
    var Tn = l;
    var Un = l;
    var Vn = l;
    var Yn = function (a) {
        a.addEventListener("onStateChange", Wn);
        a.addEventListener("onError", Xn);
    };
    var Zn = function (a) {
        var b = Vn;
        var a = {
            event: a,
            aplid: Sn,
            abt: Tn,
            evtm: Math.round(oa() - b)
        };
        if ((b = L("PLAYER_CONFIG")) && b.args && b.args.plid) {
            a.plid = b.args.plid;
        }
        if (b && b.args && b.args.video_id) {
            a.v = b.args.video_id;
        }
        Wg("/player_204?" + Oe(a));
    };
    var Wn = function (a) {
        if (Un) {
            switch (a) {
                case 1:
                    Zn("play");
                    pd(Un);
                    Un = l;
                    Rn = m;
                    break;
                case 0:
                    Zn("ended");
                    pd(Un);
                    Un = l;
                    Rn = m;
            }
        }
    };
    var Xn = function () {
        if (Un) {
            Zn("error");
            pd(Un);
            Un = l;
            Rn = m;
        }
    };
    var $n = function () {
        if (Un) {
            Zn("userwaiting");
        }
        Un = l;
    };
    var ao = function () {
        if (Rn) {
            Zn("unload");
        }
    };
    var bo = function () {
        var a = G("watch-video-annotation-editable");
        var b = sa(G("watch-video-annotation-content").innerHTML);
        if (b) {
            y(a, ["unannotated", "editing"], ["annotated", "not-editing"]);
        } else {
            y(a, ["annotated", "not-editing"], ["unannotated", "editing"]);
        }
        G("watch-video-annotation-textarea").value = b;
    };
    var co = function (a) {
        if (!P(a, "saving")) {
            O(a, "saving", "true");
            var b = G("watch-video-annotation-content");
            var c = G("watch-video-annotation-textarea");
            var d = sa(c.value);
            var e = {};
            if (!d) {
                e.delete = 1;
            }
            U(a.action, {
                format: "JSON",
                method: "POST",
                g: e,
                za: $c(a),
                f: function () {
                    b.innerHTML = Aa(d);
                },
                B: function () {
                    c.value = b.innerHTML;
                },
                ga: function () {
                    vd(a, "saving");
                    bo();
                }
            });
        }
    };
    var eo = function (a) {
        var b = a.target;
        if (b.tagName != "INPUT" && b.tagName != "TEXTAREA" && b.tagName != "SELECT") {
            switch (a.keyCode) {
                case 110:
                    bj().next(k, "keys");
                    break;
                case 112:
                    a = bj();
                    if ((a = Yh(a.b, "keys"))) {
                        Eh(a);
                    }
                    break;
                case 106:
                    if ((a = mj())) {
                        b = a.getCurrentTime();
                        a.seekTo(b - 10);
                    }
                    break;
                case 108:
                    if ((a = mj())) {
                        b = a.getCurrentTime();
                        a.seekTo(b + 10);
                    }
                    break;
                case 107:
                    if ((a = mj())) {
                        if (yn == 2) {
                            a.playVideo();
                        } else {
                            a.pauseVideo();
                        }
                    }
            }
        }
    };
    var fo = function () {
        var a = de.getInstance();
        ie(Hh.xf, k);
        a.save();
        T("watch_page_survey");
    };
    var go = function (a, b, c) {
        var d = a.serverUri || "//www.google.com/tools/feedback";
        var e = p.GOOGLE_FEEDBACK_START;
        if (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent)) {
            a.mobileWindow = window.open("");
        }
        p.GOOGLE_FEEDBACK_START_ARGUMENTS = arguments;
        if (e) {
            e.apply(p, arguments);
        } else {
            e = document.createElement("script");
            e.src = d + "/load.js";
            document.body.appendChild(e);
        }
    };
    var ho = m;
    var io = "";
    var jo = function (a) {
        a = a.match(/[\d]+/g);
        a.length = 3;
        return a.join(".");
    };
    if (navigator.plugins && navigator.plugins.length) {
        var ko = navigator.plugins["Shockwave Flash"];
        if (ko) {
            ho = k;
            if (ko.description) {
                io = jo(ko.description);
            }
        }
        if (navigator.plugins["Shockwave Flash 2.0"]) {
            ho = k;
            io = "2.0.0.11";
        }
    } else if (navigator.mimeTypes && navigator.mimeTypes.length) {
        var lo = navigator.mimeTypes["application/x-shockwave-flash"];
        if ((ho = lo && lo.enabledPlugin)) {
            io = jo(lo.enabledPlugin.description);
        }
    } else {
        try {
            var mo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
            var ho = k;
            var io = jo(mo.GetVariable("$version"));
        } catch (no) {
            try {
                mo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
                ho = k;
                io = "6.0.21";
            } catch (oo) {
                try {
                    mo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                    ho = k;
                    io = jo(mo.GetVariable("$version"));
                } catch (po) {}
            }
        }
    }
    var qo = io;
    var ro;
    var so;
    var to;
    var uo;
    var vo;
    var wo;
    var xo;
    xo = wo = vo = uo = to = so = ro = m;
    var yo = Jb();
    if (yo) {
        if (yo.indexOf("Firefox") != -1) {
            ro = k;
        } else if (yo.indexOf("Camino") != -1) {
            so = k;
        } else if (yo.indexOf("iPhone") != -1 || yo.indexOf("iPod") != -1) {
            to = k;
        } else if (yo.indexOf("iPad") != -1) {
            uo = k;
        } else if (yo.indexOf("Android") != -1) {
            vo = k;
        } else if (yo.indexOf("Chrome") != -1) {
            wo = k;
        } else if (yo.indexOf("Safari") != -1) {
            xo = k;
        }
    }
    var zo = ro;
    var Ao = so;
    var Bo = to;
    var Co = uo;
    var Do = vo;
    var Eo = wo;
    var Fo = xo;
    var Go = function (a) {
        if ((a = a.exec(Jb()))) {
            return a[1];
        } else {
            return "";
        }
    };
    var Ho = (function () {
        if (zo) {
            return Go(/Firefox\/([0-9.]+)/);
        }
        if (D || Nb) {
            return ac;
        }
        if (Eo) {
            return Go(/Chrome\/([0-9.]+)/);
        }
        if (Fo) {
            return Go(/Version\/([0-9.]+)/);
        }
        if (Bo || Co) {
            var a = /Version\/(\S+).*Mobile\/(\S+)/.exec(Jb());
            if (a) {
                return a[1] + "." + a[2];
            }
        } else {
            if (Do) {
                if ((a = Go(/Android\s+([0-9.]+)/))) {
                    return a;
                } else {
                    return Go(/Version\/([0-9.]+)/);
                }
            }
            if (Ao) {
                return Go(/Camino\/([0-9.]+)/);
            }
        }
        return "";
    })();
    var Io = function () {
        if (!(D ? Ja(Ho, "7") >= 0 && Ja(qo, "9") >= 0 : zo ? Ja(Ho, "3.5") >= 0 : Fo ? Ja(Ho, "5") >= 0 : Eo)) {
            T("reportbug");
        }
    };
    var Ko = function () {
        Od(G("help-button"), "click", Jo, k);
    };
    var Jo = function () {
        var a = G("help-button");
        if (a) {
            var b = P(a, "iph-topic-id");
            var c = L("LOCALE");
            var d = P(a, "iph-title-text");
            var e = P(a, "iph-search-button-text");
            var f = P(a, "iph-anchor-text");
            var g = document.location.protocol + P(a, "iph-js-url");
            var j = document.location.protocol + P(a, "iph-css-url");
            if (g && j) {
                j = sc("link", {
                    href: j,
                    rel: "stylesheet"
                });
                document.getElementsByTagName("head")[0].appendChild(j);
                Tg(g, function () {
                    var g = q("yt.www.help.init");
                    var j = q("yt.www.help.onButtonClick");
                    g(b, "http://www.google.com", "/support/youtube", c, d, e, f);
                    Q(a, "click", j);
                    j();
                });
            }
        }
    };
    var Lo = function () {
        (function () {
            try {
                for (var a = this; a.parent != a;) {
                    if (a.frameElement.src == "$") {
                        h("odd");
                    }
                    a = a.parent;
                }
                if (a.frameElement != l) {
                    h("busted");
                }
            } catch (b) {
                document.write("--><plaintext style=display:none><!--");
                window.open("/", "_top");
                top.location = "/";
            }
        })();
    };
    var Mo = function (a) {
        if (a.responseText == "block") {
            Lo();
        }
    };
    if (window != window.top) {
        var No = document.referrer;
        if (window.parent != window.top) {
            Lo();
        } else if (!Ve(No)) {
            Lg(
                "/roger_rabbit?" +
                    ("location=" + encodeURIComponent(No) + "&self=" + encodeURIComponent(window.location.href)),
                {
                    onComplete: Mo
                }
            );
        }
    }
    var Oo = m;
    var Po = function () {
        of("init");
    };
    var Qo = function () {
        of("dispose");
    };
    var So = function (a, b, c) {
        var d = G("www-core-js");
        if (!Oo && d && d.src.indexOf("/debug-") != -1) {
            c = Ro(c);
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
                i
            );
            Oo = k;
        }
    };
    var Ro = function (a) {
        if (Ob) {
            try {
                eval("(0)()");
            } catch (b) {
                return b.stack.replace(/(.*):/g, "").replace(/\n/g, ",");
            }
        } else {
            return a;
        }
    };
    var To = [];
    var Uo = function (a, b, c, d) {
        window.google_ad_client = a;
        window.google_ad_channel = b;
        window.google_max_num_ads = 1;
        window.google_ad_output = "js";
        window.google_ad_type = "text";
        window.google_only_pyv_ads = k;
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
    var Vo = function () {
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
    var Wo = function () {
        T("ad_creative_2");
        T("pyv-placeholder");
        if (G("ppv-placeholder")) {
            S("ppv-placeholder");
        } else {
            T("homepage-sidebar-ads");
        }
    };
    var Xo = function (a, b, c, d, e) {
        var f = Za(b.media_template_data, function (a) {
            return !!a.imageUrl;
        });
        if (f) {
            a = {
                video_id: f.videoId,
                ad_type: a,
                headline: Da(b.line1),
                image_url: f.imageUrl,
                description1: Da(b.line2),
                description2: Da(b.line3),
                channel_title: f.channelName,
                test_mode: (!!e).toString(),
                destination_url: Da(b.url)
            };
            Lg("/pyv?" + Oe(a), {
                method: "GET",
                update: c,
                onComplete: d
            });
        }
    };
    var Yo = function () {
        var a = G("ppv-container");
        if (a) {
            S(a);
        }
    };
    var $o = function () {
        T("ad_creative_2");
        if (L("PYV_IS_ALLOWED")) {
            Uo("ca-youtube-homepage", L("PYV_AD_CHANNEL") || "", L("PYV_KW") || "", Zo);
        } else {
            Wo();
        }
    };
    var Zo = function (a) {
        var b = G("pyv-placeholder");
        if (a.length == 0 || !b) {
            Wo();
        } else {
            Xo("homepage", a[0], b, function () {
                T("ad_creative_2");
            });
        }
    };
    var bp = function () {
        if (L("PYV_IS_ALLOWED")) {
            var a = "pyvOnBrowse";
            if (L("PYV_CATEGORY")) {
                a += " pyvBrowse_" + L("PYV_CATEGORY");
            }
            Uo("ca-youtube-browse", a, "", ap);
        } else {
            Vo();
        }
    };
    var ap = function (a) {
        var b = G("pyv-placeholder");
        if (a.length == 0 || !b) {
            Vo();
        } else {
            Xo(L("PYV_NEW_BROWSE") ? "new_browse" : "browse", a[0], b, function () {
                T("ad_creative_1");
            });
        }
    };
    var cp = function (a, b) {
        var c = G(a);
        if (c) {
            c = H("li", "video-list-item", c);
            u(c, function (a, c) {
                var f = H("a", l, a);
                u(f, function (a) {
                    var d = a.getAttribute("href");
                    if (d && unescape(d).match(/\/watch(\?|#!)v=/)) {
                        a.href = b ? a.href + ("&pvpos=" + c) : a.href + ("&pvnpos=" + c);
                    }
                });
            });
        }
    };
    var ep = function (a) {
        a = a.replace(";dc_seed=", ";kmyd=watch-channel-brand-div;dc_seed=");
        T("instream_google_companion_ad_div");
        T("google_companion_ad_div");
        S("ad300x250");
        S("watch-channel-brand-div");
        var b = G("ad300x250");
        if (b !== l) {
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
        dp();
    };
    var fp = function (a) {
        a = a.replace(";dc_seed=", ";kmyd=watch-longform-ad;dc_seed=");
        T("instream_google_companion_ad_div");
        S("watch-longform-ad");
        S("watch-longform-text");
        S("watch-longform-ad-placeholder");
        var b = G("watch-longform-ad-placeholder");
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
        dp();
    };
    var gp = function (a) {
        var b = G("watch-longform-ad-placeholder");
        if (a) {
            T("instream_google_companion_ad_div");
            S("watch-longform-ad");
            S("watch-longform-text");
            S("watch-longform-ad-placeholder");
            b.innerHTML = a;
        } else {
            T("watch-longform-ad");
        }
        dp();
    };
    var hp = function (a, b) {
        var c = "watch-channel-brand-div";
        var d = "ad300x250";
        var e = 300;
        var f = 250;
        if (a == "video") {
            c = "watch-longform-ad";
            d = "watch-longform-ad-placeholder";
            e = 300;
            f = 60;
            T("instream_google_companion_ad_div");
        }
        var g = decodeURIComponent(b);
        G(d).innerHTML = [
            '<iframe name="fw_ad" id="fw_ad" ',
            'width="' + e + '" height="' + f + '" ',
            'marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"></iframe>'
        ].join("");
        var j = G("fw_ad");
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
            M(function () {
                j.document.close();
            }, 7500);
        } else {
            j.document.close();
        }
        S(c);
        dp();
    };
    var ip = function () {
        S("watch-channel-brand-div");
        T("ad300x250");
        G("google_companion_ad_div").style.height = "250px";
        dp();
    };
    var jp = function () {
        T("watch-longform-ad");
        dp();
    };
    var kp = function () {
        T("watch-channel-brand-div");
        dp();
    };
    var dp = function () {
        var a = q("yt.www.watch.ads.handleAdLoaded");
        if (a) {
            a.call();
        }
    };
    var lp = function (a) {
        md("POPOUT_AD_SLOTS", a);
    };
    var mp = function () {
        var a = G("watch-longform-popup");
        if (a) {
            a.disabled = k;
        }
    };
    var np = function (a) {
        var b = G("watch-longform-popup");
        if (b) {
            b.disabled = m;
        }
        lp(a);
    };
    var op = function (a) {
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
    var pp = function (a) {
        if (a) {
            T("watch-longform-ad-placeholder");
            T("watch-channel-brand-div");
            S("watch-longform-text");
            S("watch-longform-ad");
            S("instream_google_companion_ad_div");
        } else {
            T("ad300x250");
            T("watch-longform-ad");
            S("google_companion_ad_div");
            S("watch-channel-brand-div");
        }
        dp();
    };
    var qp = function () {
        T("instream_google_companion_ad_div");
        T("watch-longform-text");
        T("watch-longform-ad-placeholder");
        dp();
    };
    s("yt.www.watch.ads.showForcedMpu", function (a) {
        G("ad300x250").innerHTML = [
            '<iframe src="',
            a,
            '" name="ifr_300x250ad" id="ifr_300x250ad" width="300" height="250" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"></iframe>'
        ].join("");
        S("ad300x250");
    });
    s("yt.www.watch.ads.handleMoveGutCompanion", function (a) {
        var a = a ? G("instream_google_companion_ad_div") : G("google_companion_ad_div");
        var b = G("yt-gut-content");
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
        dp();
    });
    s("yt.www.watch.ads.setGutSlotSizes", function (a, b) {
        var c = L("gut_slot");
        if (c) {
            c = c.getSizes();
            bb(c);
            if (b) {
                c.push(L("yt_gut_invideo_size"));
            }
            if (a) {
                c.push(L("yt_gut_instream_size"));
            }
        }
    });
    s("yt.www.watch.ads.handleSetCompanion", ep);
    s("yt.www.watch.ads.handleSetCompanionForInstream", fp);
    s("yt.www.watch.ads.handleSetCompanionForLongform", gp);
    s("yt.www.watch.ads.handleSetCompanionForFreewheel", hp);
    s("yt.www.watch.ads.handleHideCompanion", ip);
    s("yt.www.watch.ads.handleHideCompanionForInstream", jp);
    s("yt.www.watch.ads.disablePopoutButton", mp);
    s("yt.www.watch.ads.enablePopoutButton", np);
    s("yt.www.watch.ads.handleCloseMpuCompanion", kp);
    s("yt.www.watch.ads.updatePopoutAds", lp);
    s("yt.www.watch.ads.handleSetAfvCompanionVars", op);
    s("yt.www.watch.ads.handleShowAfvCompanionAdDiv", pp);
    s("yt.www.watch.ads.handleHideAfvInstreamCompanionAdDiv", qp);
    s("yt.www.ads.pyv.pyvWatchAfcCallback", function (a) {
        if (a.length == 0) {
            Yo();
            if (L("PYV_TRACK_RELATED_CTR")) {
                cp("watch-related-grid", m);
                cp("watch-related", m);
                cp("watch-channel-videos-panel", m);
            }
        } else {
            var b = G("watch-channel-videos-panel");
            if (b && !L("IS_BRANDED_WATCH")) {
                v(b, "yt-uix-expander-collapsed");
            }
            Xo(
                "watch_related",
                a[0],
                l,
                function (a) {
                    var a = Kg(Ig(a.responseXML), "html_content") || "";
                    var b = G(window.pyv_related_box_id || "watch-related");
                    if (b && b.innerHTML.indexOf(a) != 0) {
                        b.insertBefore(wc(a), b.firstChild);
                        if (L("PYV_TRACK_RELATED_CTR")) {
                            cp("watch-related", k);
                            cp("watch-channel-videos-panel", k);
                        }
                    }
                    if ((b = G("watch-related-grid")) && b.innerHTML.indexOf(a) != 0) {
                        b.insertBefore(wc(a), b.firstChild);
                        if (L("PYV_TRACK_RELATED_CTR")) {
                            cp("watch-related-grid", k);
                        }
                    }
                },
                window.google_adtest && window.google_adtest == "on"
            );
        }
    });
    s("yt.www.ads.pyv.pyvSearchAfcCallback", function (a) {
        var b = G("pyv-ads");
        if (a.length != 0 && b) {
            u(a, function (a) {
                var b = a.media_template_data[0];
                a.line1 = Da(a.line1);
                a.line2 = Da(a.line2);
                a.line3 = Da(a.line3);
                a.url = Da(a.url);
                b.imageUrl = Da(b.imageUrl);
                b.channelName = Da(b.channelName);
            });
            a = {
                pyv_ads: zg(new xg(i), a),
                ad_type: "search"
            };
            Lg("/pyv", {
                method: "POST",
                postBody: Oe(a),
                update: b
            });
        }
    });
    s("yt.www.ads.pyv.pyvHomeAfcCallback", Zo);
    s("yt.www.ads.pyv.showPpvAdInYvaSpot", Wo);
    s("yt.www.ads.pyv.pyvHomeRequestAds", $o);
    s("yt.www.ads.pyv.pyvBrowseRequestAds", bp);
    s("yt.www.ads.pyv.showPpvOnWatch", Yo);
    s("yt.www.ads.pyv.loadPyvIframe", function (a) {
        var b = window.location.href;
        if (b.indexOf("#") == b.length - 1 && Pb) {
            window.location.hash = "#!";
        }
        var b = document.body;
        var c = ic(b);
        var d = [];
        d.push("<!DOCTYPE html>");
        d.push("<html><head>", a, "</head><body>", i, "</body></html>");
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
    s("yt.www.ads.pyv.loadPyvAfsScript", function (a) {
        Tg("/pyv_afs_ads?query=" + a);
    });
    nd("pyv_related_box_id");
    s("setCompanion", ep);
    s("setInstreamCompanion", fp);
    s("setLongformCompanion", gp);
    s("setFreewheelCompanion", hp);
    s("closeInPageAdIframe", ip);
    s("hideInstreamCompanion", jp);
    s("disablePopout", mp);
    s("enablePopout", np);
    s("closeMpuCompanion", kp);
    s("updatePopAds", lp);
    s("setAfvCompanionVars", op);
    s("showAfvCompanionAdDiv", pp);
    s("hideAfvInstreamCompanionAdDiv", qp);
    s("show_ppv_in_yva_spot", Wo);
    s("requestPyvAds", $o);
    s("pyvHomeRequestAds", $o);
    s("pyvBrowseRequestAds", bp);
    window.yt = window.yt || {};
    s("_gel", G);
    s("_hasclass", z);
    s("_addclass", v);
    s("_removeclass", w);
    s("_toggleclass", rb);
    s("_showdiv", S);
    s("_hidediv", T);
    s("_ajax", Fg);
    s("goog.bind", r);
    s("goog.dom.getElementsByTagNameAndClass", function (a, b, c) {
        return H(a, b, c);
    });
    s("goog.dom.getFirstElementChild", Bc);
    s("goog.array.forEach", u);
    s("goog.array.indexOf", Ta);
    s("goog.array.contains", ab);
    s("yt.dom.hasAncestor", function (a, b, c) {
        a = G(a);
        b = G(b);
        return !!Kc(
            a,
            function (a) {
                return a === b;
            },
            k,
            c
        );
    });
    s("yt.setConfig", md);
    s("yt.getConfig", L);
    s("yt.registerGlobal", nd);
    s("yt.setTimeout", M);
    s("yt.setInterval", od);
    s("yt.clearTimeout", pd);
    s("yt.clearInterval", qd);
    s("yt.setMsg", function (a) {
        ld(id, arguments);
    });
    s("yt.getMsg", N);
    s("yt.events.listen", Q);
    s("yt.events.unlisten", Rd);
    s("yt.events.stopPropagation", Td);
    s("yt.events.preventDefault", Ud);
    s("yt.events.getTarget", Sd);
    s("yt.events.clear", function () {
        for (var a in Kd) {
            Nd(a);
        }
    });
    s("yt.events.Event", Jd);
    Jd.prototype.preventDefault = Jd.prototype.preventDefault;
    Jd.prototype.stopPropagation = Jd.prototype.stopPropagation;
    s("yt.pubsub.subscribe", nf);
    s("yt.pubsub.unsubscribeByKey", function (a) {
        var b = q("yt.pubsub.instance_");
        if (b) {
            return b.unsubscribeByKey(a);
        } else {
            return m;
        }
    });
    s("yt.pubsub.publish", of);
    s("yt.www.init", Po);
    s("yt.www.dispose", Qo);
    Q(window, "load", Po);
    Q(window, "unload", Qo);
    s("yt.www.logError", So);
    window.onerror = So;
    s("yt.uix.FormInput.selectOnChangeActionIE", function (a) {
        $j.getInstance().Hd(a);
    });
    nf("init", function () {
        var a = $j.getInstance();
        var b = kc(W(a, "select-element"));
        u(b, function (b) {
            a.Hd(b);
        });
    });
    s("goog.i18n.bidi.isRtlText", fd);
    s("goog.i18n.bidi.setDirAttribute", function (a, b) {
        var c = b.value;
        var d = "";
        if (fd(c)) {
            d = "rtl";
        } else if (!fd(c)) {
            d = "ltr";
        }
        b.dir = d;
    });
    s("yt.i18n.virtualkeyboard.toggle", function (a, b) {
        if (a) {
            sg = a;
            lg("GOOGLE_LANGUAGE_API_VIRTUAL_KEYBOARD", function () {
                if (rg) {
                    var a = rg;
                    if (a.isVisible()) {
                        a.setVisible(m);
                    } else {
                        a.setVisible(k);
                    }
                } else if (!tg) {
                    tg = k;
                    ug = b;
                    google.load("elements", "1", {
                        packages: "keyboard",
                        callback: "yt.i18n.virtualkeyboard.finishLoading"
                    });
                }
            });
        }
    });
    s("yt.i18n.virtualkeyboard.finishLoading", function () {
        google.elements.keyboard.setAutoHide(m);
        google.elements.keyboard.setSendShiftKeyUpEventUponInput(k);
        google.elements.keyboard.enableMinMaxMode(m);
        google.elements.keyboard.enableGoogleLogo(m);
        google.elements.keyboard.enableKeyCodeScheme(m);
        google.elements.keyboard.helpLink(
            ["//support.google.com/youtube/bin/answer.py?answer=1047939&hl=", ug].join("")
        );
        rg = new google.elements.keyboard.Keyboard(sg, ["masthead-search-term"]);
        tg = m;
    });
    s("yt.i18n.inputtools.loadInputTools", function (a, b, c) {
        if (a && b) {
            mg = a;
            lg("GOOGLE_LANGUAGE_API_INPUT_TOOLS", function () {
                if (!og && !pg) {
                    pg = k;
                    ng = b;
                    qg = c;
                    google.load("elements", "1", {
                        packages: "inputtools",
                        callback: "yt.i18n.inputtools.finishLoading"
                    });
                }
            });
        }
    });
    s("yt.i18n.inputtools.finishLoading", function () {
        og = new google.elements.inputtools.InputToolsController();
        ub(ng, function (a, c) {
            og.addPageElements([c]);
        });
        og.addInputTools(mg);
        if (qg && qg.indexOf("hi") != -1) {
            og.setCurrentInputTool("im_t13n_hi");
        }
        ub(ng, function (a) {
            if (a) {
                og.showControl(a);
            }
        });
        var a = m;
        u(mg, function (b) {
            if (b.lastIndexOf("vdk", 0) == 0) {
                a = k;
            }
        });
        if (a) {
            google.elements.keyboard.helpLink(
                ["//support.google.com/youtube/bin/answer.py?answer=1047939&hl=", qg].join("")
            );
        }
        og.setApplicationName("youtube");
        pg = m;
    });
    s("yt.style.toggle", Fe);
    s("yt.style.setDisplayed", Ce);
    s("yt.style.isDisplayed", De);
    s("yt.style.setVisible", function (a, b) {
        if ((a = G(a))) {
            a.style.visibility = b ? "visible" : "hidden";
        }
    });
    s("yt.net.ajax.sendRequest", Lg);
    s("yt.net.ajax.getRootNode", Ig);
    s("yt.net.ajax.getNodeValue", Kg);
    s("yt.net.ajax.setToken", Mg);
    s("yt.net.delayed.register", Pg);
    s("yt.net.delayed.load", Rg);
    s("yt.net.delayed.markAsLoaded", function (a) {
        if (a in Ng) {
            Og[a] = k;
        }
    });
    s("yt.net.scriptloader.load", Tg);
    s("goog.dom.forms.getFormDataString", $c);
    s("yt.uri.buildQueryData", Oe);
    s("yt.uri.appendQueryData", Se);
    s("yt.www.feedback.start", function (a, b, c, d) {
        try {
            var c = (c || "59") + "";
            var b = b || {};
            var e = L("SESSION_INDEX");
            try {
                var f = mj();
                if (f) {
                    f.pauseVideo();
                }
                var g = af.getInstance();
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
            go(a, b);
            return m;
        } catch (o) {
            return k;
        }
    });
    s("yt.www.feedback.displayLink", Io);
    nf("init", Io);
    s("yt.www.help.bootstrap.init", Ko);
    nf("init", Ko);
    s("yt.net.cookies.set", $d);
    s("yt.net.cookies.get", ae);
    s("yt.net.cookies.remove", be);
    s("yt.window.redirect", Eh);
    s("yt.window.popup", Fh);
    hh(X);
    hh(Tj);
    hh(Zj);
    hh($j);
    hh(th);
    hh(ak);
    hh(Gh);
    hh(ck);
    hh(dk);
    hh(zi);
    hh(ek);
    hh(xh);
    s("yt.player.update", function (a, b, c) {
        return Pj(a, b, {
            force: c
        });
    });
    s("yt.player.embed", Pj);
    s("yt.flash.embed", hf);
    s("onYouTubePlayerReady", function () {
        xn = k;
        var a = mj();
        if (a) {
            Hn(a);
        }
    });
    s("yt.www.watch.activity.getTimeSinceActive", xm);
    s("yt.www.watch.activity.setTimestamp", wm);
    s("yt.www.watch.player.handleEndPreview", function (a) {
        var b = mj();
        if (b && b.stopVideo) {
            b.stopVideo();
        }
        if ((b = G("watch-checkout-offers"))) {
            of("checkout-init-purchase", a, b);
        }
    });
    s("yt.www.watch.player.openPopup", function (a, b, c) {
        var d = l;
        var e = mj();
        var a = "/watch_popup?v=" + a;
        if (e) {
            a += "&vq=" + e.getPlaybackQuality();
            d = Math.round(e.getCurrentTime());
            e.stopVideo();
        }
        if (L("POPOUT_AD_SLOTS")) {
            a += "&pop_ads=" + L("POPOUT_AD_SLOTS");
        }
        if (d && d > 10) {
            a += "#t=" + d;
        }
        Fh(a, {
            width: b,
            height: c,
            resizable: k,
            location: m,
            statusbar: m,
            menubar: m,
            scrollbars: m,
            toolbar: m
        });
    });
    s("yt.www.watch.activity.init", vm);
    s("yt.www.watch.player.updateConfig", function (a) {
        var a = a instanceof Ze ? a.args : a.args;
        var b;
        var c = Re(window.location.hash);
        if ((b = c.t || c.at)) {
            An.t = c.t;
            An.at = c.at;
            c = window.location.hash.replace(/\bat=[^&]*&?/, "");
            window.location.hash = c && c != "#" ? c : "#!";
            b = Pn(b);
        } else {
            b = 0;
        }
        if (b) {
            a.start = b;
            return k;
        } else {
            return m;
        }
    });
    s("yt.www.watch.player.init", function () {
        Qn();
        od(Qn, 1000);
    });
    s("yt.www.watch.player.seekTo", On);
    s("openFull", function () {
        Fh("/watch_popup?v=" + L("VIDEO_ID"), {
            target: "FullScreenVideo",
            width: screen.availWidth,
            height: screen.availHeight,
            resizable: k,
            fullscreen: k
        });
    });
    s("checkCurrentVideo", function (a, b, c) {
        var d = L("VIDEO_ID");
        var e = d == a;
        var f = ej ? bj().Ba() : l;
        var b = !b || b == f;
        if (d && (!e || !b)) {
            d = l;
            if (b) {
                d = bj();
                e = Uh(d.b, [a])[0];
                d = e === i ? "" : Xh(d.b, e);
            }
            if (!d) {
                d = c
                    ? c
                    : Ue(window.location.href, {
                          v: a,
                          feature: l
                      });
            }
            if (d) {
                Eh(d);
            }
        }
    });
    s("trackAnnotationsEvent", function (a, b, c) {
        var d = L("ANALYTICS_ANNOTATIONS_TRACKER");
        window._gaq.push(function () {
            d._trackEvent(a, b, c);
        });
    });
    s("reportFlashTiming", function () {});
    s("reportTimingMaps", function (a, b) {
        for (var c in a) {
            $.Bc(c, a[c]);
        }
        for (var d in b) {
            $.info(d, b[d]);
        }
        $.Od();
    });
    s("yt.www.watch.playlists.editAnnotation", function () {
        y(G("watch-video-annotation-editable"), "not-editing", "editing");
        G("watch-video-annotation-textarea").focus();
        var a = G("watch-video-annotation-form");
        if (!P(a, "setup")) {
            O(a, "setup", "true");
            a = J("cancel-button", a);
            Q(a, "click", function (a) {
                a.preventDefault();
                bo();
            });
        }
    });
    s("yt.www.watch.playlists.removeAnnotation", function () {
        var a = G("watch-video-annotation-form");
        G("watch-video-annotation-textarea").value = "";
        co(a);
    });
    s("yt.www.watch.playlists.submitForm", function (a) {
        co(a);
    });
    s("yt.www.watch.abandonment.init", function (a, b) {
        Sn = a;
        Tn = b;
        var c = L("PLAYER_CONFIG");
        var c = new Ze(c);
        gf(function (a) {
            var e = $.timer || {};
            if (e.start && a.isSupported(c.minVersion)) {
                Vn = e.start;
                if (xn) {
                    Yn(mj());
                } else {
                    Bn.gc("READY_STATE_TOPIC", Yn);
                }
                Q(window, "beforeunload", ao);
                a = oa() - Vn;
                a = b - a;
                if (a >= 0) {
                    Un = M($n, a);
                    Zn("attempt");
                }
            }
            Rn = k;
        });
    });
    s("yt.history.enable", function (a, b) {
        var c = eg(b);
        c.setEnabled.call(c, k, a);
    });
    s("yt.history.disable", function () {
        var a = eg();
        a.setEnabled.call(a, m);
    });
    s("yt.www.lists.addto.toggleMenu", function (a, b, c) {
        var d = xh.getInstance();
        var e = W(d);
        var f = G("shared-addto-menu");
        if (b) {
            b = J("addto-menu", f);
            zh(d, a);
            Nl = w(a, e);
            if (!Ml) {
                Ml = b.innerHTML;
            }
            d = P(f, "video-ids");
            e = P(a, "video-ids");
            if (Ol) {
                v(f, "lightweight-panel");
            }
            if (z(a, "flip")) {
                v(f, "flip");
            }
            if (e && d != e) {
                O(f, "video-ids", e);
                b.innerHTML = Ml;
                f = !!L("DISPLAY_FLINTSTONE_PROTOTYPE");
                if (ca(c)) {
                    f = c;
                }
                new Pl(a, f);
            }
        } else {
            if (Nl) {
                v(a, e);
            }
            w(f, "flip");
        }
    });
    s("yt.www.lists.data.addto.saveToWatchLater", function (a, b) {
        Ak(a, b, function (b, d) {
            var e = d.list_id || "";
            var f = [a];
            var g = N("PLAYLIST_BAR_ADDED_TO_PLAYLIST");
            gj("WL", e, f, g);
        });
    });
    s("yt.www.lists.addtomenupebbles.toggleMenu", function (a, b) {
        if (b) {
            var c = G("shared-tags-menu");
            if (!El) {
                El = c.innerHTML;
            }
            var d = P(a, "video-ids");
            var e = P(c, "video-ids");
            if (d && e != d) {
                c.innerHTML = El;
                O(c, "video-ids", d);
                new Jl(c, d);
            }
        }
    });
    s("yt.www.lists.addtomenupebbles.init", function () {
        ch("addto-button-collapsed", "mouseover", Hl, 2, k);
        ch("addto-button-expanded", "mouseout", Il, 2, k);
    });
    s("yt.www.watch.watch5.enableWide", lj);
    s("yt.www.watch.watch5.handleResize", function () {
        pd(jj);
        jj = M(kj, 200);
    });
    s("yt.www.watch.watch5.updatePlayerSize", kj);
    s("yt.www.watch.watch5.handleLoadMoreRelated", function () {
        T("watch-more-related-button");
        S("watch-more-related", "watch-more-related-loading");
        U("/related_ajax", {
            g: {
                video_id: L("VIDEO_ID"),
                action_more_related_videos: 1
            },
            f: function (a, b) {
                var c = G("watch-more-related");
                c.innerHTML = b.html;
                ti(c);
            }
        });
    });
    s("yt.www.watch.watch5.handleYouTubeVJ", function () {
        G("youtube-vj-button").disabled = k;
        U("/music_ajax", {
            g: {
                video_id: L("VIDEO_ID"),
                action_get_vj: 1
            },
            f: function (a, b) {
                if (b.video_list.length) {
                    b.video_list.unshift(L("VIDEO_ID"));
                    var c = bj();
                    Lh([]);
                    Mh(b.video_list);
                    var d = new fi();
                    Mi(c, d);
                    d.F = 0;
                    c.Ua(k);
                    Oi(c, k);
                }
            }
        });
    });
    s("yt.www.watch.watch5.handleToggleMoreFromUser", function (a) {
        var b = G("watch-mft-button");
        if (b) {
            A(b, "yt-uix-expander-collapsed", k);
            A(b, "yt-uix-button-toggled", m);
        }
        if ((b = G("watch-more-from-topic"))) {
            A(b, "collapsed", k);
        }
        var b = z(a, "yt-uix-expander-collapsed");
        var c = G("watch-more-from-user");
        if (!b && P(c, "loaded") != "true") {
            a = {
                user_id: P(a, "video-user-id"),
                video_id: P(a, "video-id"),
                action_channel_videos: "1"
            };
            U("/watch_ajax", {
                format: "XML",
                method: "GET",
                g: a,
                f: function (a, b) {
                    c.innerHTML = b.html_content;
                    O(c, "loaded", "true");
                    ti(c);
                    var f = parseInt(P(G("watch-channel-discoverbox"), "slider-slide-selected"), 10);
                    H("button", "yt-uix-slider-num", i)[f].click();
                }
            });
        }
        A(c, "collapsed", b);
    });
    s("yt.www.watch.watch5.handleToggleMoreFromTopic", function (a) {
        var b = G("watch-mfu-button");
        if (b) {
            A(b, "yt-uix-expander-collapsed", k);
            A(b, "yt-uix-button-toggled", m);
        }
        if ((b = G("watch-more-from-user"))) {
            A(b, "collapsed", k);
        }
        var b = z(a, "yt-uix-expander-collapsed");
        var c = G("watch-more-from-topic");
        if (!b && P(c, "loaded") != "true") {
            a = {
                topic_id: P(a, "topic-id"),
                action_topic_videos: "1"
            };
            U("/watch_ajax", {
                format: "XML",
                method: "GET",
                g: a,
                f: function (a, b) {
                    c.innerHTML = b.html_content;
                    O(c, "loaded", "true");
                    ti(c);
                    var f = parseInt(P(G("watch-channel-discoverbox"), "slider-slide-selected"), 10);
                    H("button", "yt-uix-slider-num", i)[f].click();
                }
            });
        }
        A(c, "collapsed", b);
    });
    s("yt.www.watch.watch5.handleToggleDescription", function (a) {
        if (z(a, "yt-uix-expander-collapsed")) {
            Xg("descriptionClosed", i, i);
        } else {
            if ((a = G("watch-source-videos-list")) && P(a, "loaded") != "true") {
                O(a, "loaded", "true");
                var b = Se("/watch_ajax", {
                    action_get_video_attributions_component: 1,
                    v: L("VIDEO_ID")
                });
                Lg(b, {
                    method: "GET",
                    update: a
                });
            }
            Xg("descriptionOpened", i, i);
        }
    });
    s("yt.www.watch.watch5.purchaseComplete", function () {
        S(G("watch-player-rental-play-button"));
        var a = G("watch-player-rental-still-frame");
        T(G("watch-player"));
        S(a);
    });
    s("yt.www.watch.actions.init", function () {
        var a = Re(window.location.hash);
        var b = a.action;
        if (b) {
            switch (b) {
                case "flag":
                    Al();
            }
            M(function () {
                Bl("watch-actions-area-container").scrollIntoView();
            }, 0);
            delete a.action;
            a = Oe(a) || "#!";
            window.location.hash = a;
        }
    });
    s("yt.www.watch.actions.loadPlusoneLike", function (a, b, c, d, e) {
        new yj(G(a), b, c, d, e, {
            size: "standard",
            source: "google:youtube:watch_exp"
        });
    });
    s("yt.www.watch.shortcuts.init", function () {
        Q(document, "keypress", eo);
    });
    s("yt.www.watch.actions.captions", function (a) {
        if (zl(a)) {
            vl();
            kl(function () {
                T("watch-actions-loading");
                tl("watch-actions-captions");
            });
        }
    });
    s("yt.www.watch.actions.flag", Al);
    s("yt.www.watch.actions.hide", function () {
        ul();
    });
    s("yt.www.watch.actions.like", function (a) {
        if (zl(a)) {
            yl(k);
        }
    });
    s("yt.www.watch.actions.share", Cl);
    s("yt.www.watch.actions.addto", function () {
        tl("watch-actions-addto");
        new Dk(G("watch-actions-addto"), L("VIDEO_ID"));
    });
    s("yt.www.watch.actions.showSigninOrCreateChannelWarning", function (a) {
        if (zl(a)) {
            tl("watch-actions-logged-out");
        }
    });
    s("yt.www.watch.actions.stats", function (a) {
        if (zl(a)) {
            vl();
            U("/insight_ajax", {
                format: "XML",
                method: "GET",
                g: {
                    action_get_statistics_and_data: 1,
                    v: L("VIDEO_ID")
                },
                f: function (a, c) {
                    wl(c.html_content);
                },
                B: xl
            });
        }
    });
    s("yt.www.watch.actions.unlike", function (a) {
        if (zl(a)) {
            yl(m);
        }
    });
    s("yt.www.watch.watch5.showIE9WebMPromo", function (a) {
        var b = document.createElement("video");
        if (b.canPlayType && !b.canPlayType("video/webm")) {
            S(a);
        }
    });
    s("yt.www.comments.init", function () {
        var a = G("comments-view");
        new lk(a);
        R(a, "click", wk, "comment-action");
    });
    s("yt.www.comments.initForm", function (a, b) {
        var c = K(a, "form");
        if (!wd(c, "initialized")) {
            O(c, "initialized", "true");
            c = new hk(c, !b);
            if (b) {
                c.focus();
            }
        }
    });
    s("yt.www.lists.init", function () {
        if (parseInt(L("PLAYLIST_BAR_PLAYING_INDEX"), 10) > -1) {
            bj();
            var a = L("AUTOPLAY_DELAY");
            if (a) {
                fj(a);
            }
        }
        ej = k;
    });
    s("yt.www.lists.getState", function () {
        var a = cj();
        a.autoPlayMax = L("PLAY_ALL_MAX");
        return a;
    });
    s("yt.www.lists.registerNearEndEventsWithPlayer", hj);
    s("yt.www.lists.handleNearPlaybackEnd", function (a) {
        if (ej && Ni(bj()) && a.slice(0, -1) == "NEAR_END") {
            a = parseInt(a.slice(-1), 10);
            Yi(bj(), a);
        }
    });
    s("yt.www.lists.pebblesmigration.initPebblesMigration", function () {
        var a = G("flintstone-migration");
        R(a, "click", Zl, "library-wipe-btn");
        R(a, "click", Yl, "library-import-btn");
    });
    s("yt.dom.datasets.get", P);
    s("yt.dom.datasets.set", O);
    nd(
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
    s("yt.www.search.init", function () {
        R(G("search-footer-box"), "mouseover", function () {}, "yt-uix-pager-page-num");
    });
    s("yt.www.search.legos.toggleExpandedRefinements", function () {
        Ee(G("search-lego-refinements"));
        return m;
    });
    s("yt.www.search.toggleToolbelt", function () {
        var a = G("toolbelt-top");
        var b = G("search-option-expander");
        var c = !z(b, "expanded");
        A(b, "expanded", c);
        if (c) {
            S(a);
            a.style.height = G("toolbelt-container").offsetHeight + "px";
        } else {
            a.style.height = 0;
            M(function () {
                T(a);
            }, 300);
        }
        return m;
    });
    s("yt.www.thumbnaildelayload.init", function (a) {
        ji = a || 0;
        ii = ni();
        mi = k;
        ui(i, i);
        ri();
        Q(window, "scroll", pi);
        Q(window, "resize", pi);
    });
    s("yt.www.xsrf.populateSessionToken", function () {
        for (var a = 0; a < document.forms.length; a++) {
            var b = m;
            for (var c = 0; c < To.length; c++) {
                if (document.forms[a].name == To[c]) {
                    b = k;
                }
            }
            c = document.forms[a];
            if (c.method.toLowerCase() == "post" && b == m) {
                var b = m;
                for (var d = 0; d < c.elements.length; d++) {
                    if (c.elements[d].name == L("XSRF_FIELD_NAME")) {
                        b = k;
                    }
                }
                if (!b) {
                    b = i;
                    b = L("XSRF_TOKEN");
                    d = document.createElement("input");
                    d.setAttribute("name", L("XSRF_FIELD_NAME"));
                    d.setAttribute("type", "hidden");
                    d.setAttribute("value", b);
                    c.appendChild(d);
                }
            }
        }
    });
    s("yt.www.masthead.performSearch", function (a, b) {
        var c = G("masthead-search");
        var d = P(b, a) || "";
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
            var e = G("search-btn");
            var f = e.innerHTML;
            var g = P(e, a) || "";
            e.innerHTML = c;
            O(e, a, d);
            b.innerHTML = f;
            O(b, a, g);
        }
        return m;
    });
    s("yt.www.masthead.loadPicker", function (a, b, c) {
        var d = G(a);
        if (d) {
            if (c) {
                S(d);
            } else {
                Fe(d);
            }
        } else {
            d = document.createElement("div");
            d.id = a;
            T(d);
            G("picker-container").appendChild(d);
            c = "/masthead_ajax?action_get_" + a.replace("-", "_") + "=1";
            if (b) {
                c = b + c;
            }
            Lg(c, {
                method: "GET",
                update: a,
                onComplete: function () {
                    T("picker-loading");
                    S(a);
                    G(a).scrollIntoView();
                }
            });
            S("picker-loading");
        }
        v(d, "yt-tile-static");
        Hm(a);
        G(a).scrollIntoView();
    });
    s("yt.www.masthead.dismissGAPlusMessage", function () {
        var a = ae("FML", "").split(",");
        var b = new Date();
        var b = Math.round(b.getTime() / 1000);
        var c = "";
        var c = a.length != 2 ? "1," + b : parseInt(a[0], 10) + 1 + "," + b;
        $d("FML", c, 315360000);
    });
    s("yt.www.masthead.dismissPostLinkingMessage", function () {
        be("FML");
    });
    s("yt.www.masthead.toggleExpandedMasthead", function () {
        var a = G("masthead-expanded");
        Ee(a);
        Ce("masthead-expanded-menu", k);
        Ce("masthead-expanded-acct-sw-container", m);
        if (!$l) {
            w(G("masthead-expanded-container"), "accountswitch");
        }
        if (!P(a, "loaded")) {
            var b = G("masthead-expanded-menu-gaia-photo");
            if (b && !b.src) {
                b.src = P(b, "src");
            }
            U("/playlist_bar_ajax", {
                g: {
                    action_get_playlists_masthead: 1,
                    feature: "mhee",
                    new_slider: 1
                },
                format: "JSON",
                kb: k,
                f: function (b, d) {
                    G("masthead-expanded-lists-container").innerHTML = d.html;
                    O(a, "loaded", "true");
                }
            });
        }
    });
    s("yt.www.masthead.accountswitch.init", function (a) {
        $l = a;
    });
    s("yt.www.masthead.accountswitch.toggle", function () {
        Ee("masthead-expanded-acct-sw-container");
        var a = G("masthead-expanded-container");
        var b = G("masthead-expanded-acct-sw-container");
        if (De(b)) {
            b.style.top = a.offsetTop + "px";
            b = G("masthead-expanded-menu-acct-sw-list");
            if (b.offsetHeight < a.offsetHeight) {
                b.style.height = a.offsetHeight - 11 + "px";
            }
            var c = G("masthead-expanded-acct-sw-iframe");
            if (!c) {
                var d = G("masthead-expanded-menu-acct-sw-list");
                var c = sc("iframe", {
                    id: "masthead-expanded-acct-sw-iframe",
                    frameborder: 0,
                    src: 'javascript:""'
                });
                if (d.parentNode) {
                    d.parentNode.insertBefore(c, d);
                }
            }
            c.style.height = b.offsetHeight - 11 + "px";
            if (!$l) {
                v(a, "accountswitch");
            }
        } else if (!$l) {
            w(a, "accountswitch");
        }
    });
    s("yt.www.masthead.initSandbar", function (a, b) {
        window.___jsl = {
            h: L("GAPI_HINT_PARAMS")
        };
        km("iframes", {
            callback: function () {
                var c = G("sb-button-notify");
                var d = G("sb-button-share");
                var e = new Cm(a, b);
                Q(c, "click", r(e.Ii, e));
                Q(d, "click", r(e.Ji, e));
                of("sandbar-init");
            }
        });
    });
    s("yt.www.ads.MastheadAd", fk);
    fk.prototype.collapse_ad = fk.prototype.collapse;
    fk.prototype.expand_ad = fk.prototype.expand;
    s("yt.www.home.ads.workaroundIE", function (a) {
        if (!yk && xk) {
            yk = k;
            M(function () {
                a.focus();
            }, 0);
        }
    });
    s("yt.www.home.ads.workaroundLoad", function () {
        xk = k;
    });
    s("yt.www.home.ads.workaroundReset", function () {
        yk = m;
    });
    s("yt.www.home.ads.writeAdsContentToIframe", function (a, b) {
        var c = G(a).contentDocument || G(a).contentWindow.document;
        c.open();
        c.write("<!DOCTYPE html><html><head></head><body>" + b + "</body></html>");
        if (!D) {
            c.close();
        }
    });
    s("yt.www.home.ads.yvaCollapse", function () {
        var a = G("yva-bin");
        if (a) {
            var b = G("yva-bg");
            if (b) {
                y(b, "yva-360-bg", "yva-250-bg");
            }
            y(a, "yva-expanded", "yva-collapsed");
        }
    });
    s("yt.www.home.ads.yvaExpand", function () {
        var a = G("yva-bin");
        if (a) {
            y(a, "yva-collapsed", "yva-expanded");
        }
    });
    s("yt.tracking.doubleclick.trackActivity", function (a, b, c) {
        a =
            (document.location.protocol == "https:" ? "https://" : "http://") +
            "fls.doubleclick.net/activityi;src=" +
            ua(L("DBLCLK_ADVERTISER_ID")) +
            ";type=" +
            ua(a) +
            ";cat=" +
            ua(b);
        if (c && !c.ord) {
            a += ";ord=1";
        }
        for (var d in c) {
            a += ";" + ua(d) + "=" + ua(c[d]);
        }
        a += ";num=" + oa();
        c = document.createElement("iframe");
        c.src = a;
        c.style.display = "none";
        document.body.appendChild(c);
    });
    s("yt.tracking.track", function (a, b, c) {
        Xg(a, b, c);
    });
    s("yt.tracking.resolution", function () {
        Wg(
            "/mac_204?" +
                ("action_scr2=1&height=" + screen.height + "&width=" + screen.width + "&depth=" + screen.colorDepth),
            i
        );
    });
    s("yt.tracking.share", Yg);
    s("yt.analytics.urchinTracker", function () {});
    s("yt.analytics.trackEvent", td);
    s("yt.www.privacynotice.dismiss", function () {
        $d("prnfy", "-1", 5184000);
        Wg("/gen_204?typ=i&ct=pp_tos&cd=dismiss&source=yt", i);
    });
    s("yt.www.privacynotice.learnMore", function () {
        Wg("/gen_204?typ=i&ct=pp_tos&cd=tellmore&source=yt", i);
    });
    s("yt.timing.report", $.Gc);
    s("yt.timing.maybeReport", $.Od);
    s("yt.timing.handlePageLoad", $.Df);
    s("yt.timing.handleThumbnailLoad", $.Li);
    nf("init", $.Df);
    if (rd && (!document.documentMode || document.documentMode < 8)) {
        R(G("ie"), "click", nj, "video-thumb");
    }
    s("yt.www.subscriptions.edit.onUpdateSubscription", function (a, b, c, d) {
        var c = c || "";
        var e = m;
        if ((b = G("subscription_level_unsubscribe")) && b.checked) {
            e = k;
        }
        b = $c(G("subscription_level_uploads" + c).form);
        Lg("/ajax_subscriptions?" + b, {
            postBody: "session_token=" + a,
            onComplete: function (a) {
                G("subscribeMessage" + c).innerHTML = Kg(Ig(a), "html_content");
                T("edit_subscription_wrapper" + c);
                T("edit_subscription_arrow" + c);
                S("subscribeMessage" + c);
                if (c) {
                    G("edit_subscription_opener" + c).style.visibility = "";
                    M(function () {
                        T("subscribeMessage" + c);
                    }, 5000);
                }
                if (e) {
                    var b = G("channel-body");
                    var a = H("div", "subscribe-div", b);
                    var b = H("div", "unsubscribe-div", b);
                    u(a, function (a) {
                        Fe(a);
                    });
                    u(b, function (a) {
                        Fe(a);
                    });
                    d();
                }
            }
        });
    });
    s("yt.www.subscriptions.edit.onCancelUpdateSubscription", function (a) {
        a = a || "";
        T("edit_subscription_wrapper" + a);
        T("edit_subscription_arrow" + a);
        if (a) {
            G("edit_subscription_opener" + a).style.visibility = "";
        }
        T("alerts");
    });
    s("yt.www.subscriptions.edit.onEditSubscriptionFromRecentActivity", function (a, b, c, d) {
        if (window["edit_subscription_download_" + c]) {
            T("subscribeMessage" + c);
            Fe("edit_subscription_wrapper" + c);
            Fe("edit_subscription_arrow" + c);
            a = G("edit_subscription_opener" + c);
            a.style.visibility = a.style.visibility == "visible" ? "" : "visible";
        } else {
            window["edit_subscription_download_" + c] = k;
            Lg("/ajax_subscriptions?get_edit_subscription_form=" + b + "&i=" + c, {
                postBody: "session_token=" + a,
                onComplete: function (a) {
                    G("edit_subscription_opener" + c).style.visibility = "visible";
                    var b = document.createElement("div");
                    b.innerHTML = Kg(a.responseXML, "html_content");
                    d.parentNode.insertBefore(b, d);
                    S("edit_subscription_wrapper" + c);
                    S("edit_subscription_arrow" + c);
                }
            });
        }
    });
    s("yt.www.subscriptions.SubscriptionButton.init", function (a, b) {
        var c = kc("yt-subscription-button-js-default", a);
        u(c, function (a) {
            if (!P(a, "subscription-initialized")) {
                new jn(a, b);
                O(a, "subscription-initialized", "true");
            }
        });
    });
    s("yt.www.subscriptions.button.subscribe", function (a) {
        var b = Um(a);
        var c = P(b, "subscription-type");
        var d = P(b, "subscription-xsrf") || "";
        var e = P(b, "subscription-menu-type");
        var f = P(b, "subscription-channels-container");
        var g = P(b, "subscription-feature");
        var j = P(b, "subscription-value");
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
        a.disabled = k;
        Nm(d);
        d = new Lm(dn, hn);
        Mm(d, o);
        o = {};
        o[c] = j;
        o.menu_type = e;
        if ((e = L("PLAYBACK_ID"))) {
            o.plid = e;
        }
        if (f) {
            o.show_channels = k;
        }
        d.gb = o || {};
        d.userData.eventTrigger = a;
        d.userData.subscription = b;
        Rm(d);
        Ck("subscribe");
    });
    s("yt.www.subscriptions.button.subscribeToCollection", function (a) {
        var b = Zm(a);
        var c = K(a, l, "subscription-recommendations");
        var d = P(b, "subscription-xsrf") || "";
        var e = [];
        for (var f = H("input", "username", c), g = 0; g < f.length; g++) {
            if (f[g].checked) {
                e.push(f[g].value);
            }
        }
        if (e.length == 0) {
            zc(c);
        } else {
            a.disabled = k;
            Nm(d);
            d = new Lm(en, hn);
            Mm(d, {
                action_create_subscription_to_users: 1
            });
            f = {};
            f.usernames = e.join(",");
            d.gb = f || {};
            d.userData.eventTrigger = a;
            d.userData.subscription = b;
            d.userData.collection = c;
            Rm(d);
        }
    });
    s("yt.www.subscriptions.button.unsubscribe", function (a) {
        var b = Zm(a);
        var c = P(b, "subscription-id");
        var d = P(b, "subscription-xsrf") || "";
        var e = P(b, "subscription-feature");
        if (!a.disabled) {
            a.disabled = k;
            Nm(d);
            var d = new Lm(fn, hn);
            var f = {
                action_remove_subscription: 1
            };
            if (e) {
                f.feature = e;
            }
            Mm(d, f);
            e = {};
            e.subscription_id = c;
            if ((c = L("PLAYBACK_ID"))) {
                e.plid = c;
            }
            d.gb = e || {};
            d.userData.eventTrigger = a;
            d.userData.subscription = b;
            Rm(d);
            Ck("unsubscribe");
        }
    });
    s("yt.www.subscriptions.button.update", function (a) {
        var b = Zm(a);
        var c = P(b, "subscription-id");
        var d = P(b, "subscription-xsrf") || "";
        a.disabled = k;
        Nm(d);
        var d = new Lm(gn, hn);
        var e = K(a, l, "subscription-menu-form");
        var e = Vc(Yc(e));
        if (!e.email_on_upload) {
            e.email_on_upload = m;
        }
        e.action_update_subscription_preferences = 1;
        Mm(d, e);
        d.gb = {
            subscription_id: c
        };
        d.userData.eventTrigger = a;
        d.userData.subscription = b;
        Rm(d);
    });
    s("yt.www.subscriptions.button.toggleMenu", Wm);
    s("yt.www.subscriptions.button.closeMenu", function (a) {
        a = Zm(a);
        if (P(a, "subscription-menu-type") == "button") {
            an(a);
        } else {
            bn(a);
        }
    });
    nd("yt", "goog", "_gel", "googleapisv0", "_hasclass", "_addclass", "_removeclass", "_showdiv", "_hidediv", "_ajax");
    s("yt.www.masthead.extended.redirectWithNewParam", function (a, b) {
        var c;
        var d;
        var e;
        c = window.location.href;
        c = c.split("#");
        d = c.length == 2 ? "#" + c[1] : "";
        c = c[0];
        e = Qe(c);
        e[b] = a;
        e["persist_" + b] = "1";
        c = c.split("?");
        c = c[0];
        Eh(c, e, d);
    });
    s("yt.www.watch.stats.extended.setInsightOptOut", function (a) {
        if (a) {
            v(G("insight-private"), "selected");
            w(G("insight-public"), "selected");
        } else {
            v(G("insight-public"), "selected");
            w(G("insight-private"), "selected");
        }
        var b = G("insight-optout-form");
        if (b) {
            a = Se(b.action, {
                opt_out: a
            });
            b = $c(b);
            Lg(a, {
                postBody: b,
                onComplete: function () {}
            });
        }
        return m;
    });
    s("yt.www.watch.stats.extended.toggleReferrer", function (a) {
        Fe(a);
        return m;
    });
    s("yt.www.watch.survey.takeWatchPageSurvey", function () {
        fo();
        window
            .open(
                "/watch_page_survey?r2=" +
                    L("SURVEY_REFERER") +
                    "&r1=" +
                    L("SURVEY_SERVLET_NAME") +
                    "&name=" +
                    L("SURVEY_TYPE"),
                "YouTube_User_Happiness_Survey",
                "toolbar=no,width=800,height=768,status=no,resizable=yes,fullscreen=no,scrollbars=yes"
            )
            .focus();
    });
    s("yt.www.watch.survey.watchPageSurveyGoAway", fo);
    s("yt.www.watch.survey.checkSurveyCompletedAndShow", function () {
        if (!he(de.getInstance(), Hh.xf)) {
            S("watch_page_survey");
        }
    });
    s("yt.www.watch.user.unblockUserLinkByUsername", function (a, b) {
        if (!confirm(N("UNBLOCK_USER"))) {
            return m;
        }
        var c = {
            postBody: "unblock_user=0&" + L("BLOCK_USER_XSRF") + "&friend_username=" + a
        };
        if (b) {
            c.onComplete = function () {
                window.location.reload();
            };
        }
        Lg("/link_servlet", c);
        return m;
    });
    s("yt.www.watch.user.blockUserLinkByUsername", function (a, b) {
        if (!confirm(N("BLOCK_USER"))) {
            return m;
        }
        var c = {
            postBody: "block_user=1&" + L("BLOCK_USER_XSRF") + "&friend_username=" + a
        };
        if (b) {
            c.onComplete = function () {
                window.location.reload();
            };
        }
        Lg("/link_servlet", c);
        return m;
    });
    s("yt.www.watch.user.unblockUserLinkByExternalId", function (a, b) {
        if (confirm(N("UNBLOCK_USER"))) {
            U("/link_ajax?action_unblock_user=1", {
                format: "XML",
                method: "POST",
                za: L("BLOCK_USER_AJAX_XSRF") + "&uid=" + a,
                f: function () {
                    if (b) {
                        window.location.reload();
                    }
                }
            });
        }
    });
    s("yt.www.watch.user.blockUserLinkByExternalId", function (a, b) {
        if (confirm(N("BLOCK_USER"))) {
            U("/link_ajax?action_block_user=1", {
                format: "XML",
                method: "POST",
                za: L("BLOCK_USER_AJAX_XSRF") + "&uid=" + a,
                f: function () {
                    if (b) {
                        window.location.reload();
                    }
                }
            });
        }
    });
    s("getNextVideoId", function (a) {
        var b = bj();
        var c = Ni(b);
        var d = a <= L("PLAY_ALL_MAX");
        if (c && d) {
            return b.td(a);
        } else {
            return "";
        }
    });
    nd("getNextVideoId");
})();
