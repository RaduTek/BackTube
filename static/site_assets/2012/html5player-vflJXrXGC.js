(function () {
    function e(a) {
        throw a;
    }
    var h = void 0,
        j = !0,
        k = null,
        l = !1,
        n,
        o = this,
        q = function (a) {
            for (var a = a.split("."), b = o, c; (c = a.shift()); )
                if (b[c] != k) b = b[c];
                else return k;
            return b;
        },
        aa = function (a) {
            a.getInstance = function () {
                return a.qu || (a.qu = new a());
            };
        },
        ba = function (a) {
            var b = typeof a;
            if ("object" == b)
                if (a) {
                    if (a instanceof Array) return "array";
                    if (a instanceof Object) return b;
                    var c = Object.prototype.toString.call(a);
                    if ("[object Window]" == c) return "object";
                    if (
                        "[object Array]" == c ||
                        ("number" == typeof a.length &&
                            "undefined" != typeof a.splice &&
                            "undefined" != typeof a.propertyIsEnumerable &&
                            !a.propertyIsEnumerable("splice"))
                    )
                        return "array";
                    if (
                        "[object Function]" == c ||
                        ("undefined" != typeof a.call &&
                            "undefined" != typeof a.propertyIsEnumerable &&
                            !a.propertyIsEnumerable("call"))
                    )
                        return "function";
                } else return "null";
            else if ("function" == b && "undefined" == typeof a.call) return "object";
            return b;
        },
        ca = function (a) {
            return a === k;
        },
        r = function (a) {
            return "array" == ba(a);
        },
        da = function (a) {
            var b = ba(a);
            return "array" == b || ("object" == b && "number" == typeof a.length);
        },
        t = function (a) {
            return "string" == typeof a;
        },
        ea = function (a) {
            return "function" == ba(a);
        },
        ga = function (a) {
            var b = typeof a;
            return ("object" == b && a != k) || "function" == b;
        },
        ja = function (a) {
            return a[ha] || (a[ha] = ++ia);
        },
        ha = "closure_uid_" + Math.floor(2147483648 * Math.random()).toString(36),
        ia = 0,
        ka = function (a, b, c) {
            return a.call.apply(a.bind, arguments);
        },
        la = function (a, b, c) {
            a || e(Error());
            if (2 < arguments.length) {
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
        },
        u = function (a, b, c) {
            u =
                Function.prototype.bind &&
                -1 != Function.prototype.bind.toString().indexOf("native code")
                    ? ka
                    : la;
            return u.apply(k, arguments);
        },
        ma = function (a, b) {
            var c = Array.prototype.slice.call(arguments, 1);
            return function () {
                var b = Array.prototype.slice.call(arguments);
                b.unshift.apply(b, c);
                return a.apply(this, b);
            };
        },
        w = function (a, b) {
            for (var c in b) a[c] = b[c];
        },
        x =
            Date.now ||
            function () {
                return +new Date();
            },
        A = function (a, b) {
            var c = a.split("."),
                d = o;
            !(c[0] in d) && d.execScript && d.execScript("var " + c[0]);
            for (var f; c.length && (f = c.shift()); )
                !c.length && b !== h ? (d[f] = b) : (d = d[f] ? d[f] : (d[f] = {}));
        },
        B = function (a, b) {
            function c() {}
            c.prototype = b.prototype;
            a.j = b.prototype;
            a.prototype = new c();
            a.prototype.constructor = a;
        };
    Function.prototype.bind =
        Function.prototype.bind ||
        function (a, b) {
            if (1 < arguments.length) {
                var c = Array.prototype.slice.call(arguments, 1);
                c.unshift(this, a);
                return u.apply(k, c);
            }
            return u(this, a);
        };
    var na = function (a) {
        this.stack = Error().stack || "";
        a && (this.message = "" + a);
    };
    B(na, Error);
    na.prototype.name = "CustomError";
    var oa = function (a, b) {
            for (var c = 1; c < arguments.length; c++)
                var d = ("" + arguments[c]).replace(/\$/g, "$$$$"), a = a.replace(/\%s/, d);
            return a;
        },
        pa = function (a) {
            return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
        },
        qa = /^[a-zA-Z0-9\-_.!~*'()]*$/,
        ra = function (a) {
            a = "" + a;
            return !qa.test(a) ? encodeURIComponent(a) : a;
        },
        xa = function (a) {
            if (!sa.test(a)) return a;
            -1 != a.indexOf("&") && (a = a.replace(ta, "&amp;"));
            -1 != a.indexOf("<") && (a = a.replace(ua, "&lt;"));
            -1 != a.indexOf(">") && (a = a.replace(va, "&gt;"));
            -1 != a.indexOf('"') && (a = a.replace(wa, "&quot;"));
            return a;
        },
        ta = /&/g,
        ua = /</g,
        va = />/g,
        wa = /\"/g,
        sa = /[&<>\"]/,
        ya = function (a) {
            var b = Number(a);
            return 0 == b && /^[\s\xa0]*$/.test(a) ? NaN : b;
        },
        za = {},
        Aa = function (a) {
            return (
                za[a] ||
                (za[a] = ("" + a).replace(/\-([a-z])/g, function (a, c) {
                    return c.toUpperCase();
                }))
            );
        };
    var Ba = function (a, b) {
        b.unshift(a);
        na.call(this, oa.apply(k, b));
        b.shift();
    };
    B(Ba, na);
    Ba.prototype.name = "AssertionError";
    var Ca = function (a, b, c, d) {
            var f = "Assertion failed";
            if (c)
                var f = f + (": " + c),
                    g = d;
            else a && ((f += ": " + a), (g = b));
            e(new Ba("" + f, g || []));
        },
        Da = function (a, b, c) {
            !a && Ca("", k, b, Array.prototype.slice.call(arguments, 2));
        },
        Ea = function (a, b) {
            e(new Ba("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1)));
        },
        Fa = function (a, b, c) {
            !t(a) &&
                Ca(
                    "Expected string but got %s: %s.",
                    [ba(a), a],
                    b,
                    Array.prototype.slice.call(arguments, 2)
                );
            return a;
        },
        Ga = function (a, b, c, d) {
            !(a instanceof b) &&
                Ca("instanceof check failed.", k, c, Array.prototype.slice.call(arguments, 3));
        };
    var C = Array.prototype,
        Ha = C.indexOf
            ? function (a, b, c) {
                  Da(a.length != k);
                  return C.indexOf.call(a, b, c);
              }
            : function (a, b, c) {
                  c = c == k ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
                  if (t(a)) return !t(b) || 1 != b.length ? -1 : a.indexOf(b, c);
                  for (; c < a.length; c++) if (c in a && a[c] === b) return c;
                  return -1;
              },
        D = C.forEach
            ? function (a, b, c) {
                  Da(a.length != k);
                  C.forEach.call(a, b, c);
              }
            : function (a, b, c) {
                  for (var d = a.length, f = t(a) ? a.split("") : a, g = 0; g < d; g++)
                      g in f && b.call(c, f[g], g, a);
              },
        Ia = C.filter
            ? function (a, b, c) {
                  Da(a.length != k);
                  return C.filter.call(a, b, c);
              }
            : function (a, b, c) {
                  for (
                      var d = a.length, f = [], g = 0, i = t(a) ? a.split("") : a, m = 0;
                      m < d;
                      m++
                  )
                      if (m in i) {
                          var p = i[m];
                          b.call(c, p, m, a) && (f[g++] = p);
                      }
                  return f;
              },
        Ja = C.map
            ? function (a, b, c) {
                  Da(a.length != k);
                  return C.map.call(a, b, c);
              }
            : function (a, b, c) {
                  for (
                      var d = a.length, f = Array(d), g = t(a) ? a.split("") : a, i = 0;
                      i < d;
                      i++
                  )
                      i in g && (f[i] = b.call(c, g[i], i, a));
                  return f;
              },
        Ka = C.some
            ? function (a, b, c) {
                  Da(a.length != k);
                  return C.some.call(a, b, c);
              }
            : function (a, b, c) {
                  for (var d = a.length, f = t(a) ? a.split("") : a, g = 0; g < d; g++)
                      if (g in f && b.call(c, f[g], g, a)) return j;
                  return l;
              },
        La = function (a, b) {
            var c;
            a: {
                c = a.length;
                for (var d = t(a) ? a.split("") : a, f = 0; f < c; f++)
                    if (f in d && b.call(h, d[f], f, a)) {
                        c = f;
                        break a;
                    }
                c = -1;
            }
            return 0 > c ? k : t(a) ? a.charAt(c) : a[c];
        },
        Ma = function (a, b) {
            return 0 <= Ha(a, b);
        },
        Na = function (a) {
            if (!r(a)) for (var b = a.length - 1; 0 <= b; b--) delete a[b];
            a.length = 0;
        },
        Oa = function (a, b) {
            var c = Ha(a, b);
            0 <= c && (Da(a.length != k), C.splice.call(a, c, 1));
        },
        Pa = function (a) {
            return C.concat.apply(C, arguments);
        },
        Qa = function (a) {
            if (r(a)) return Pa(a);
            for (var b = [], c = 0, d = a.length; c < d; c++) b[c] = a[c];
            return b;
        },
        Ra = function (a) {
            return r(a) ? Pa(a) : Qa(a);
        },
        Sa = function (a, b) {
            for (var c = 1; c < arguments.length; c++) {
                var d = arguments[c],
                    f;
                if (r(d) || ((f = da(d)) && d.hasOwnProperty("callee"))) a.push.apply(a, d);
                else if (f) for (var g = a.length, i = d.length, m = 0; m < i; m++) a[g + m] = d[m];
                else a.push(d);
            }
        },
        Ua = function (a, b, c, d) {
            Da(a.length != k);
            C.splice.apply(a, Ta(arguments, 1));
        },
        Ta = function (a, b, c) {
            Da(a.length != k);
            return 2 >= arguments.length ? C.slice.call(a, b) : C.slice.call(a, b, c);
        },
        Wa = function (a, b) {
            Da(a.length != k);
            C.sort.call(a, b || Va);
        },
        Va = function (a, b) {
            return a > b ? 1 : a < b ? -1 : 0;
        };
    var Xa = "StopIteration" in o ? o.StopIteration : Error("StopIteration"),
        Ya = function () {};
    Ya.prototype.next = function () {
        e(Xa);
    };
    Ya.prototype.md = function () {
        return this;
    };
    var Za = function (a) {
            if (a instanceof Ya) return a;
            if ("function" == typeof a.md) return a.md(l);
            if (da(a)) {
                var b = 0,
                    c = new Ya();
                c.next = function () {
                    for (;;) {
                        b >= a.length && e(Xa);
                        if (b in a) return a[b++];
                        b++;
                    }
                };
                return c;
            }
            e(Error("Not implemented"));
        },
        $a = function (a, b) {
            if (da(a))
                try {
                    D(a, b, h);
                } catch (c) {
                    c !== Xa && e(c);
                }
            else {
                a = Za(a);
                try {
                    for (;;) b.call(h, a.next(), h, a);
                } catch (d) {
                    d !== Xa && e(d);
                }
            }
        },
        ab = function (a) {
            if (da(a)) return Ra(a);
            var a = Za(a),
                b = [];
            $a(a, function (a) {
                b.push(a);
            });
            return b;
        };
    var bb = function (a, b) {
            for (var c in a) b.call(h, a[c], c, a);
        },
        cb = function (a) {
            var b = [],
                c = 0,
                d;
            for (d in a) b[c++] = a[d];
            return b;
        },
        eb = function (a) {
            var b = db,
                c;
            for (c in b) if (a.call(h, b[c], c, b)) return c;
        },
        fb = function (a) {
            var b = {},
                c;
            for (c in a) b[c] = a[c];
            return b;
        },
        gb =
            "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(
                ","
            ),
        hb = function (a, b) {
            for (var c, d, f = 1; f < arguments.length; f++) {
                d = arguments[f];
                for (c in d) a[c] = d[c];
                for (var g = 0; g < gb.length; g++)
                    ((c = gb[g]), Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]));
            }
        };
    var ib,
        jb,
        kb,
        lb,
        mb,
        nb,
        ob,
        pb = function () {
            return o.navigator ? o.navigator.userAgent : k;
        },
        qb = function () {
            return o.navigator;
        };
    mb = lb = kb = jb = ib = l;
    var rb;
    if ((rb = pb())) {
        var sb = qb();
        ib = 0 == rb.indexOf("Opera");
        jb = !ib && -1 != rb.indexOf("MSIE");
        lb = (kb = !ib && -1 != rb.indexOf("WebKit")) && -1 != rb.indexOf("Mobile");
        mb = !ib && !kb && "Gecko" == sb.product;
    }
    var tb = ib,
        E = jb,
        ub = mb,
        F = kb,
        vb = lb,
        wb = qb(),
        xb = (wb && wb.platform) || "";
    nb = -1 != xb.indexOf("Mac");
    ob = -1 != xb.indexOf("Win");
    var yb = !!qb() && -1 != (qb().appVersion || "").indexOf("X11"),
        zb;
    a: {
        var Ab = "",
            Bb;
        if (tb && o.opera)
            var Cb = o.opera.version,
                Ab = "function" == typeof Cb ? Cb() : Cb;
        else if (
            (ub
                ? (Bb = /rv\:([^\);]+)(\)|;)/)
                : E
                  ? (Bb = /MSIE\s+([^\);]+)(\)|;)/)
                  : F && (Bb = /WebKit\/(\S+)/),
            Bb)
        )
            var Db = Bb.exec(pb()),
                Ab = Db ? Db[1] : "";
        if (E) {
            var Eb,
                Fb = o.document;
            Eb = Fb ? Fb.documentMode : h;
            if (Eb > parseFloat(Ab)) {
                zb = "" + Eb;
                break a;
            }
        }
        zb = Ab;
    }
    var Gb = zb,
        Hb = {},
        G = function (a) {
            var b;
            if (!(b = Hb[a])) {
                b = 0;
                for (
                    var c = pa("" + Gb).split("."),
                        d = pa("" + a).split("."),
                        f = Math.max(c.length, d.length),
                        g = 0;
                    0 == b && g < f;
                    g++
                ) {
                    var i = c[g] || "",
                        m = d[g] || "",
                        p = RegExp("(\\d*)(\\D*)", "g"),
                        s = RegExp("(\\d*)(\\D*)", "g");
                    do {
                        var y = p.exec(i) || ["", "", ""],
                            v = s.exec(m) || ["", "", ""];
                        if (0 == y[0].length && 0 == v[0].length) break;
                        b =
                            ((0 == y[1].length ? 0 : parseInt(y[1], 10)) <
                            (0 == v[1].length ? 0 : parseInt(v[1], 10))
                                ? -1
                                : (0 == y[1].length ? 0 : parseInt(y[1], 10)) >
                                    (0 == v[1].length ? 0 : parseInt(v[1], 10))
                                  ? 1
                                  : 0) ||
                            ((0 == y[2].length) < (0 == v[2].length)
                                ? -1
                                : (0 == y[2].length) > (0 == v[2].length)
                                  ? 1
                                  : 0) ||
                            (y[2] < v[2] ? -1 : y[2] > v[2] ? 1 : 0);
                    } while (0 == b);
                }
                b = Hb[a] = 0 <= b;
            }
            return b;
        },
        Ib = {},
        Jb = function (a) {
            return Ib[a] || (Ib[a] = E && !!document.documentMode && document.documentMode >= a);
        };
    var Lb = function (a) {
            return Kb(a || arguments.callee.caller, []);
        },
        Kb = function (a, b) {
            var c = [];
            if (Ma(b, a)) c.push("[...circular reference...]");
            else if (a && 50 > b.length) {
                c.push(Mb(a) + "(");
                for (var d = a.arguments, f = 0; f < d.length; f++) {
                    0 < f && c.push(", ");
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
                            g = (g = Mb(g)) ? g : "[fn]";
                            break;
                        default:
                            g = typeof g;
                    }
                    40 < g.length && (g = g.substr(0, 40) + "...");
                    c.push(g);
                }
                b.push(a);
                c.push(")\n");
                try {
                    c.push(Kb(a.caller, b));
                } catch (i) {
                    c.push("[exception trying to get caller]\n");
                }
            } else a ? c.push("[...long stack...]") : c.push("[end]");
            return c.join("");
        },
        Mb = function (a) {
            if (Nb[a]) return Nb[a];
            a = "" + a;
            if (!Nb[a]) {
                var b = /function ([^\(]+)/.exec(a);
                Nb[a] = b ? b[1] : "[Anonymous]";
            }
            return Nb[a];
        },
        Nb = {};
    var Ob = function (a, b, c, d, f) {
        this.reset(a, b, c, d, f);
    };
    Ob.prototype.Ik = k;
    Ob.prototype.Hk = k;
    var Pb = 0;
    Ob.prototype.reset = function (a, b, c, d, f) {
        "number" == typeof f || Pb++;
        this.mo = d || x();
        this.ia = a;
        this.Et = b;
        this.lo = c;
        delete this.Ik;
        delete this.Hk;
    };
    Ob.prototype.getLevel = function () {
        return this.ia;
    };
    Ob.prototype.Bi = function (a) {
        this.ia = a;
    };
    Ob.prototype.getMessage = function () {
        return this.Et;
    };
    var Qb = function (a) {
        this.ta = a;
    };
    Qb.prototype.za = k;
    Qb.prototype.ia = k;
    Qb.prototype.nc = k;
    Qb.prototype.bg = k;
    var Rb = function (a, b) {
        this.name = a;
        this.value = b;
    };
    Rb.prototype.toString = function () {
        return this.name;
    };
    var Sb = new Rb("SHOUT", 1200),
        H = new Rb("SEVERE", 1e3),
        Tb = new Rb("WARNING", 900),
        Ub = new Rb("INFO", 800),
        Vb = new Rb("CONFIG", 700);
    Qb.prototype.getName = function () {
        return this.ta;
    };
    Qb.prototype.getParent = function () {
        return this.za;
    };
    Qb.prototype.Bi = function (a) {
        this.ia = a;
    };
    Qb.prototype.getLevel = function () {
        return this.ia;
    };
    var Wb = function (a) {
        if (a.ia) return a.ia;
        if (a.za) return Wb(a.za);
        Ea("Root logger has no level set.");
        return k;
    };
    Qb.prototype.log = function (a, b, c) {
        if (a.value >= Wb(this).value) {
            a = this.du(a, b, c);
            b = "log:" + a.getMessage();
            o.console &&
                (o.console.timeStamp
                    ? o.console.timeStamp(b)
                    : o.console.markTimeline && o.console.markTimeline(b));
            o.msWriteProfilerMark && o.msWriteProfilerMark(b);
            for (b = this; b; ) {
                var c = b,
                    d = a;
                if (c.bg) for (var f = 0, g = h; (g = c.bg[f]); f++) g(d);
                b = b.getParent();
            }
        }
    };
    Qb.prototype.du = function (a, b, c) {
        var d = new Ob(a, "" + b, this.ta);
        if (c) {
            d.Ik = c;
            var f;
            var g = arguments.callee.caller;
            try {
                var i;
                var m = q("window.location.href");
                if (t(c))
                    i = {
                        message: c,
                        name: "Unknown error",
                        lineNumber: "Not available",
                        fileName: m,
                        stack: "Not available"
                    };
                else {
                    var p,
                        s,
                        y = l;
                    try {
                        p = c.lineNumber || c.zu || "Not available";
                    } catch (v) {
                        ((p = "Not available"), (y = j));
                    }
                    try {
                        s = c.fileName || c.filename || c.sourceURL || m;
                    } catch (z) {
                        ((s = "Not available"), (y = j));
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
                    xa(i.message) +
                    '\nUrl: <a href="view-source:' +
                    i.fileName +
                    '" target="_new">' +
                    i.fileName +
                    "</a>\nLine: " +
                    i.lineNumber +
                    "\n\nBrowser stack:\n" +
                    xa(i.stack + "-> ") +
                    "[end]\n\nJS stack traversal:\n" +
                    xa(Lb(g) + "-> ");
            } catch (fa) {
                f = "Exception trying to expose exception! You win, we lose. " + fa;
            }
            d.Hk = f;
        }
        return d;
    };
    Qb.prototype.info = function (a, b) {
        this.log(Ub, a, b);
    };
    var Xb = {},
        Yb = k,
        Zb = function () {
            Yb || ((Yb = new Qb("")), (Xb[""] = Yb), Yb.Bi(Vb));
        },
        $b = function (a) {
            Zb();
            var b;
            if (!(b = Xb[a])) {
                b = new Qb(a);
                var c = a.lastIndexOf("."),
                    d = a.substr(c + 1),
                    c = $b(a.substr(0, c));
                c.nc || (c.nc = {});
                c.nc[d] = b;
                b.za = c;
                Xb[a] = b;
            }
            return b;
        };
    var ac,
        bc = function (a) {
            a = a.className;
            return (t(a) && a.match(/\S+/g)) || [];
        },
        I = function (a, b) {
            var c = bc(a),
                d = Ta(arguments, 1),
                f = c.length + d.length;
            cc(c, d);
            a.className = c.join(" ");
            return c.length == f;
        },
        J = function (a, b) {
            var c = bc(a),
                d = Ta(arguments, 1),
                c = dc(c, d);
            a.className = c.join(" ");
        },
        cc = function (a, b) {
            for (var c = 0; c < b.length; c++) Ma(a, b[c]) || a.push(b[c]);
        },
        dc = function (a, b) {
            return Ia(a, function (a) {
                return !Ma(b, a);
            });
        },
        ec = function (a, b, c) {
            var d = bc(a);
            t(b) ? Oa(d, b) : r(b) && (d = dc(d, b));
            t(c) && !Ma(d, c) ? d.push(c) : r(c) && cc(d, c);
            a.className = d.join(" ");
        },
        K = function (a, b) {
            return Ma(bc(a), b);
        },
        fc = function (a, b, c) {
            c ? I(a, b) : J(a, b);
        },
        gc = function (a, b) {
            var c = !K(a, b);
            fc(a, b, c);
        };
    var L = function (a, b) {
        this.x = a !== h ? a : 0;
        this.y = b !== h ? b : 0;
    };
    L.prototype.ga = function () {
        return new L(this.x, this.y);
    };
    L.prototype.toString = function () {
        return "(" + this.x + ", " + this.y + ")";
    };
    var hc = function (a, b) {
            var c = a.x - b.x,
                d = a.y - b.y;
            return Math.sqrt(c * c + d * d);
        },
        ic = function (a, b) {
            return new L(a.x - b.x, a.y - b.y);
        };
    var M = function (a, b) {
            this.width = a;
            this.height = b;
        },
        jc = function (a, b) {
            return a == b ? j : !a || !b ? l : a.width == b.width && a.height == b.height;
        };
    n = M.prototype;
    n.ga = function () {
        return new M(this.width, this.height);
    };
    n.toString = function () {
        return "(" + this.width + " x " + this.height + ")";
    };
    n.isEmpty = function () {
        return !(this.width * this.height);
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
    var kc = !E || Jb(9);
    (!ub && !E) || (E && Jb(9)) || (ub && G("1.9.1"));
    var lc = E && !G("9");
    var oc = function (a) {
            return a ? new mc(nc(a)) : ac || (ac = new mc());
        },
        N = function (a) {
            return t(a) ? document.getElementById(a) : a;
        },
        rc = function (a, b) {
            var c = b || document;
            return pc(c)
                ? c.querySelectorAll("." + a)
                : c.getElementsByClassName
                  ? c.getElementsByClassName(a)
                  : qc("*", a, b);
        },
        O = function (a, b) {
            var c = b || document,
                d = k;
            return (d = pc(c) ? c.querySelector("." + a) : rc(a, b)[0]) || k;
        },
        pc = function (a) {
            return a.querySelectorAll && a.querySelector && (!F || sc(document) || G("528"));
        },
        qc = function (a, b, c) {
            c = c || document;
            a = a && "*" != a ? a.toUpperCase() : "";
            if (pc(c) && (a || b)) return c.querySelectorAll(a + (b ? "." + b : ""));
            if (b && c.getElementsByClassName) {
                c = c.getElementsByClassName(b);
                if (a) {
                    for (var d = {}, f = 0, g = 0, i; (i = c[g]); g++)
                        a == i.nodeName && (d[f++] = i);
                    d.length = f;
                    return d;
                }
                return c;
            }
            c = c.getElementsByTagName(a || "*");
            if (b) {
                d = {};
                for (g = f = 0; (i = c[g]); g++)
                    ((a = i.className),
                        "function" == typeof a.split && Ma(a.split(/\s+/), b) && (d[f++] = i));
                d.length = f;
                return d;
            }
            return c;
        },
        uc = function (a, b) {
            bb(b, function (b, d) {
                "style" == d
                    ? (a.style.cssText = b)
                    : "class" == d
                      ? (a.className = b)
                      : "for" == d
                        ? (a.htmlFor = b)
                        : d in tc
                          ? a.setAttribute(tc[d], b)
                          : 0 == d.lastIndexOf("aria-", 0)
                            ? a.setAttribute(d, b)
                            : (a[d] = b);
            });
        },
        tc = {
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
        vc = function (a) {
            var b = a.document;
            if (F && !G("500") && !vb) {
                "undefined" == typeof a.innerHeight && (a = window);
                var b = a.innerHeight,
                    c = a.document.documentElement.scrollHeight;
                a == a.top && c < b && (b -= 15);
                return new M(a.innerWidth, b);
            }
            a = sc(b) ? b.documentElement : b.body;
            return new M(a.clientWidth, a.clientHeight);
        },
        xc = function (a, b, c) {
            return wc(document, arguments);
        },
        wc = function (a, b) {
            var c = b[0],
                d = b[1];
            if (!kc && d && (d.name || d.type)) {
                c = ["<", c];
                d.name && c.push(' name="', xa(d.name), '"');
                if (d.type) {
                    c.push(' type="', xa(d.type), '"');
                    var f = {};
                    hb(f, d);
                    d = f;
                    delete d.type;
                }
                c.push(">");
                c = c.join("");
            }
            c = a.createElement(c);
            d && (t(d) ? (c.className = d) : r(d) ? I.apply(k, [c].concat(d)) : uc(c, d));
            2 < b.length && yc(a, c, b, 2);
            return c;
        },
        yc = function (a, b, c, d) {
            function f(c) {
                c && b.appendChild(t(c) ? a.createTextNode(c) : c);
            }
            for (; d < c.length; d++) {
                var g = c[d];
                da(g) && !(ga(g) && 0 < g.nodeType) ? D(zc(g) ? Qa(g) : g, f) : f(g);
            }
        },
        sc = function (a) {
            return "CSS1Compat" == a.compatMode;
        },
        Ac = function (a, b) {
            yc(nc(a), a, arguments, 1);
        },
        Bc = function (a) {
            for (var b; (b = a.firstChild); ) a.removeChild(b);
        },
        P = function (a) {
            a && a.parentNode && a.parentNode.removeChild(a);
        },
        Cc = function (a, b) {
            var c = b.parentNode;
            c && c.replaceChild(a, b);
        },
        Dc = function (a) {
            for (; a && 1 != a.nodeType; ) a = a.nextSibling;
            return a;
        },
        nc = function (a) {
            return 9 == a.nodeType ? a : a.ownerDocument || a.document;
        },
        Ec = function (a, b) {
            if ("textContent" in a) a.textContent = b;
            else if (a.firstChild && 3 == a.firstChild.nodeType) {
                for (; a.lastChild != a.firstChild; ) a.removeChild(a.lastChild);
                a.firstChild.data = b;
            } else (Bc(a), a.appendChild(nc(a).createTextNode(b)));
        },
        Gc = function (a, b) {
            var c = [];
            return Fc(a, b, c, j) ? c[0] : h;
        },
        Fc = function (a, b, c, d) {
            if (a != k)
                for (a = a.firstChild; a; ) {
                    if ((b(a) && (c.push(a), d)) || Fc(a, b, c, d)) return j;
                    a = a.nextSibling;
                }
            return l;
        },
        Hc = { SCRIPT: 1, STYLE: 1, HEAD: 1, IFRAME: 1, OBJECT: 1 },
        Ic = { IMG: " ", BR: "\n" },
        Jc = function (a, b, c) {
            if (!(a.nodeName in Hc))
                if (3 == a.nodeType)
                    c
                        ? b.push(("" + a.nodeValue).replace(/(\r\n|\r|\n)/g, ""))
                        : b.push(a.nodeValue);
                else if (a.nodeName in Ic) b.push(Ic[a.nodeName]);
                else for (a = a.firstChild; a; ) (Jc(a, b, c), (a = a.nextSibling));
        },
        zc = function (a) {
            if (a && "number" == typeof a.length) {
                if (ga(a)) return "function" == typeof a.item || "string" == typeof a.item;
                if (ea(a)) return "function" == typeof a.item;
            }
            return l;
        },
        Lc = function (a, b) {
            return !b
                ? k
                : Kc(
                      a,
                      function (a) {
                          return !b || K(a, b);
                      },
                      j
                  );
        },
        Kc = function (a, b, c, d) {
            c || (a = a.parentNode);
            for (var c = d == k, f = 0; a && (c || f <= d); ) {
                if (b(a)) return a;
                a = a.parentNode;
                f++;
            }
            return k;
        },
        mc = function (a) {
            this.Q = a || o.document || document;
        };
    mc.prototype.B = function (a) {
        return t(a) ? this.Q.getElementById(a) : a;
    };
    mc.prototype.ce = function (a, b, c) {
        return wc(this.Q, arguments);
    };
    mc.prototype.createElement = function (a) {
        return this.Q.createElement(a);
    };
    mc.prototype.createTextNode = function (a) {
        return this.Q.createTextNode(a);
    };
    var Mc = function (a) {
            return sc(a.Q);
        },
        Nc = function (a) {
            var b = a.Q,
                a = !F && sc(b) ? b.documentElement : b.body,
                b = b.parentWindow || b.defaultView;
            return new L(b.pageXOffset || a.scrollLeft, b.pageYOffset || a.scrollTop);
        };
    mc.prototype.appendChild = function (a, b) {
        a.appendChild(b);
    };
    mc.prototype.append = Ac;
    mc.prototype.contains = function (a, b) {
        if (a.contains && 1 == b.nodeType) return a == b || a.contains(b);
        if ("undefined" != typeof a.compareDocumentPosition)
            return a == b || Boolean(a.compareDocumentPosition(b) & 16);
        for (; b && a != b; ) b = b.parentNode;
        return b == a;
    };
    var Oc = function (a, b, c) {
        return Math.min(Math.max(a, b), c);
    };
    var Pc = function (a, b, c, d) {
        this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d;
    };
    Pc.prototype.ga = function () {
        return new Pc(this.top, this.right, this.bottom, this.left);
    };
    Pc.prototype.toString = function () {
        return "(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)";
    };
    Pc.prototype.contains = function (a) {
        return !this || !a
            ? l
            : a instanceof Pc
              ? a.left >= this.left &&
                a.right <= this.right &&
                a.top >= this.top &&
                a.bottom <= this.bottom
              : a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom;
    };
    var Qc = function (a, b, c, d) {
        this.left = a;
        this.top = b;
        this.width = c;
        this.height = d;
    };
    Qc.prototype.ga = function () {
        return new Qc(this.left, this.top, this.width, this.height);
    };
    Qc.prototype.toString = function () {
        return "(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)";
    };
    var Rc = function (a, b) {
        var c = Math.max(a.left + a.width, b.left + b.width),
            d = Math.max(a.top + a.height, b.top + b.height);
        a.left = Math.min(a.left, b.left);
        a.top = Math.min(a.top, b.top);
        a.width = c - a.left;
        a.height = d - a.top;
    };
    Qc.prototype.contains = function (a) {
        return a instanceof Qc
            ? this.left <= a.left &&
                  this.left + this.width >= a.left + a.width &&
                  this.top <= a.top &&
                  this.top + this.height >= a.top + a.height
            : a.x >= this.left &&
                  a.x <= this.left + this.width &&
                  a.y >= this.top &&
                  a.y <= this.top + this.height;
    };
    var Sc = function () {};
    Sc.prototype.Tc = l;
    Sc.prototype.Fc = function () {
        this.Tc || ((this.Tc = j), this.r());
    };
    Sc.prototype.r = function () {
        this.nu && Tc.apply(k, this.nu);
    };
    var Uc = function (a) {
            a && "function" == typeof a.Fc && a.Fc();
        },
        Tc = function (a) {
            for (var b = 0, c = arguments.length; b < c; ++b) {
                var d = arguments[b];
                da(d) ? Tc.apply(k, d) : Uc(d);
            }
        };
    var Q = function () {
        this.Ra = [];
        this.Oa = {};
    };
    B(Q, Sc);
    n = Q.prototype;
    n.Xf = 1;
    n.li = 0;
    n.e = function (a, b, c) {
        var d = this.Oa[a];
        d || (d = this.Oa[a] = []);
        var f = this.Xf;
        this.Ra[f] = a;
        this.Ra[f + 1] = b;
        this.Ra[f + 2] = c;
        this.Xf = f + 3;
        d.push(f);
        return f;
    };
    n.H = function (a, b, c) {
        if ((a = this.Oa[a])) {
            var d = this.Ra;
            if (
                (a = La(a, function (a) {
                    return d[a + 1] == b && d[a + 2] == c;
                }))
            )
                return this.ji(a);
        }
        return l;
    };
    n.ji = function (a) {
        if (0 != this.li) return (this.Jf || (this.Jf = []), this.Jf.push(a), l);
        var b = this.Ra[a];
        if (b) {
            var c = this.Oa[b];
            c && Oa(c, a);
            delete this.Ra[a];
            delete this.Ra[a + 1];
            delete this.Ra[a + 2];
        }
        return !!b;
    };
    n.c = function (a, b) {
        var c = this.Oa[a];
        if (c) {
            this.li++;
            for (var d = Ta(arguments, 1), f = 0, g = c.length; f < g; f++) {
                var i = c[f];
                this.Ra[i + 1].apply(this.Ra[i + 2], d);
            }
            this.li--;
            if (this.Jf && 0 == this.li) for (; (c = this.Jf.pop()); ) this.ji(c);
            return 0 != f;
        }
        return l;
    };
    n.clear = function (a) {
        if (a) {
            var b = this.Oa[a];
            b && (D(b, this.ji, this), delete this.Oa[a]);
        } else ((this.Ra.length = 0), (this.Oa = {}));
    };
    n.te = function (a) {
        if (a) {
            var b = this.Oa[a];
            return b ? b.length : 0;
        }
        a = 0;
        for (b in this.Oa) a += this.te(b);
        return a;
    };
    n.r = function () {
        Q.j.r.call(this);
        delete this.Ra;
        delete this.Oa;
        delete this.Jf;
    };
    var Vc = function (a, b, c) {
            a.style[Aa(c)] = b;
        },
        Wc = function (a, b) {
            var c = nc(a);
            return c.defaultView &&
                c.defaultView.getComputedStyle &&
                (c = c.defaultView.getComputedStyle(a, k))
                ? c[b] || c.getPropertyValue(b)
                : "";
        },
        Xc = function (a, b) {
            return Wc(a, b) || (a.currentStyle ? a.currentStyle[b] : k) || (a.style && a.style[b]);
        },
        Zc = function (a, b, c) {
            var d,
                f = ub && (nb || yb) && G("1.9");
            b instanceof L ? ((d = b.x), (b = b.y)) : ((d = b), (b = c));
            a.style.left = Yc(d, f);
            a.style.top = Yc(b, f);
        },
        $c = function (a) {
            var b = a.getBoundingClientRect();
            E &&
                ((a = a.ownerDocument),
                (b.left -= a.documentElement.clientLeft + a.body.clientLeft),
                (b.top -= a.documentElement.clientTop + a.body.clientTop));
            return b;
        },
        ad = function (a) {
            if (E && !Jb(8)) return a.offsetParent;
            for (
                var b = nc(a),
                    c = Xc(a, "position"),
                    d = "fixed" == c || "absolute" == c,
                    a = a.parentNode;
                a && a != b;
                a = a.parentNode
            )
                if (
                    ((c = Xc(a, "position")),
                    (d = d && "static" == c && a != b.documentElement && a != b.body),
                    !d &&
                        (a.scrollWidth > a.clientWidth ||
                            a.scrollHeight > a.clientHeight ||
                            "fixed" == c ||
                            "absolute" == c ||
                            "relative" == c))
                )
                    return a;
            return k;
        },
        dd = function (a) {
            for (
                var b = new Pc(0, Infinity, Infinity, 0),
                    c = oc(a),
                    d = c.Q.body,
                    f = c.Q.documentElement,
                    g = !F && sc(c.Q) ? c.Q.documentElement : c.Q.body;
                (a = ad(a));
            )
                if (
                    (!E || 0 != a.clientWidth) &&
                    (!F || 0 != a.clientHeight || a != d) &&
                    a != d &&
                    a != f &&
                    "visible" != Xc(a, "overflow")
                ) {
                    var i = bd(a),
                        m;
                    m = a;
                    if (ub && !G("1.9")) {
                        var p = parseFloat(Wc(m, "borderLeftWidth"));
                        if (cd(m))
                            var s =
                                    m.offsetWidth -
                                    m.clientWidth -
                                    p -
                                    parseFloat(Wc(m, "borderRightWidth")),
                                p = p + s;
                        m = new L(p, parseFloat(Wc(m, "borderTopWidth")));
                    } else m = new L(m.clientLeft, m.clientTop);
                    i.x += m.x;
                    i.y += m.y;
                    b.top = Math.max(b.top, i.y);
                    b.right = Math.min(b.right, i.x + a.clientWidth);
                    b.bottom = Math.min(b.bottom, i.y + a.clientHeight);
                    b.left = Math.max(b.left, i.x);
                }
            d = g.scrollLeft;
            g = g.scrollTop;
            b.left = Math.max(b.left, d);
            b.top = Math.max(b.top, g);
            c = vc(c.Q.parentWindow || c.Q.defaultView || window);
            b.right = Math.min(b.right, d + c.width);
            b.bottom = Math.min(b.bottom, g + c.height);
            return 0 <= b.top && 0 <= b.left && b.bottom > b.top && b.right > b.left ? b : k;
        },
        bd = function (a) {
            var b,
                c = nc(a),
                d = Xc(a, "position"),
                f =
                    ub &&
                    c.getBoxObjectFor &&
                    !a.getBoundingClientRect &&
                    "absolute" == d &&
                    (b = c.getBoxObjectFor(a)) &&
                    (0 > b.screenX || 0 > b.screenY),
                g = new L(0, 0),
                i;
            b = c ? (9 == c.nodeType ? c : nc(c)) : document;
            i = E && !Jb(9) && !Mc(oc(b)) ? b.body : b.documentElement;
            if (a == i) return g;
            if (a.getBoundingClientRect)
                ((b = $c(a)), (a = Nc(oc(c))), (g.x = b.left + a.x), (g.y = b.top + a.y));
            else if (c.getBoxObjectFor && !f)
                ((b = c.getBoxObjectFor(a)),
                    (a = c.getBoxObjectFor(i)),
                    (g.x = b.screenX - a.screenX),
                    (g.y = b.screenY - a.screenY));
            else {
                b = a;
                do {
                    g.x += b.offsetLeft;
                    g.y += b.offsetTop;
                    b != a && ((g.x += b.clientLeft || 0), (g.y += b.clientTop || 0));
                    if (F && "fixed" == Xc(b, "position")) {
                        g.x += c.body.scrollLeft;
                        g.y += c.body.scrollTop;
                        break;
                    }
                    b = b.offsetParent;
                } while (b && b != a);
                if (tb || (F && "absolute" == d)) g.y -= c.body.offsetTop;
                for (b = a; (b = ad(b)) && b != c.body && b != i; )
                    if (((g.x -= b.scrollLeft), !tb || "TR" != b.tagName)) g.y -= b.scrollTop;
            }
            return g;
        },
        fd = function (a, b) {
            var c = ed(a),
                d = ed(b);
            return new L(c.x - d.x, c.y - d.y);
        },
        ed = function (a) {
            var b = new L();
            if (1 == a.nodeType)
                if (a.getBoundingClientRect) ((a = $c(a)), (b.x = a.left), (b.y = a.top));
                else {
                    var c = Nc(oc(a)),
                        a = bd(a);
                    b.x = a.x - c.x;
                    b.y = a.y - c.y;
                }
            else {
                var c = ea(a.xl),
                    d = a;
                a.targetTouches
                    ? (d = a.targetTouches[0])
                    : c && a.xl().targetTouches && (d = a.xl().targetTouches[0]);
                b.x = d.clientX;
                b.y = d.clientY;
            }
            return b;
        },
        hd = function (a, b, c) {
            b instanceof M
                ? ((c = b.height), (b = b.width))
                : c == h && e(Error("missing height argument"));
            gd(a, b);
            a.style.height = Yc(c, j);
        },
        Yc = function (a, b) {
            "number" == typeof a && (a = (b ? Math.round(a) : a) + "px");
            return a;
        },
        gd = function (a, b) {
            a.style.width = Yc(b, j);
        },
        jd = function (a) {
            if ("none" != Xc(a, "display")) return id(a);
            var b = a.style,
                c = b.display,
                d = b.visibility,
                f = b.position;
            b.visibility = "hidden";
            b.position = "absolute";
            b.display = "inline";
            a = id(a);
            b.display = c;
            b.position = f;
            b.visibility = d;
            return a;
        },
        id = function (a) {
            var b = a.offsetWidth,
                c = a.offsetHeight,
                d = F && !b && !c;
            return (b === h || d) && a.getBoundingClientRect
                ? ((a = $c(a)), new M(a.right - a.left, a.bottom - a.top))
                : new M(b, c);
        },
        kd = function (a) {
            var b = bd(a),
                a = jd(a);
            return new Qc(b.x, b.y, a.width, a.height);
        },
        ld = function (a, b) {
            var c = a.style;
            "opacity" in c
                ? (c.opacity = b)
                : "MozOpacity" in c
                  ? (c.MozOpacity = b)
                  : "filter" in c && (c.filter = "" === b ? "" : "alpha(opacity=" + 100 * b + ")");
        },
        md = function (a, b) {
            a.style.display = b ? "" : "none";
        },
        cd = function (a) {
            return "rtl" == Xc(a, "direction");
        },
        nd = function (a, b, c, d) {
            if (/^\d+px?$/.test(b)) return parseInt(b, 10);
            var f = a.style[c],
                g = a.runtimeStyle[c];
            a.runtimeStyle[c] = a.currentStyle[c];
            a.style[c] = b;
            b = a.style[d];
            a.style[c] = f;
            a.runtimeStyle[c] = g;
            return b;
        },
        od = function (a, b) {
            return nd(a, a.currentStyle ? a.currentStyle[b] : k, "left", "pixelLeft");
        },
        pd = function (a) {
            if (E) {
                var b = od(a, "paddingLeft"),
                    c = od(a, "paddingRight"),
                    d = od(a, "paddingTop"),
                    a = od(a, "paddingBottom");
                return new Pc(d, c, a, b);
            }
            b = Wc(a, "paddingLeft");
            c = Wc(a, "paddingRight");
            d = Wc(a, "paddingTop");
            a = Wc(a, "paddingBottom");
            return new Pc(parseFloat(d), parseFloat(c), parseFloat(a), parseFloat(b));
        },
        qd = { thin: 2, medium: 4, thick: 6 },
        rd = function (a, b) {
            if ("none" == (a.currentStyle ? a.currentStyle[b + "Style"] : k)) return 0;
            var c = a.currentStyle ? a.currentStyle[b + "Width"] : k;
            return c in qd ? qd[c] : nd(a, c, "left", "pixelLeft");
        },
        sd = function (a) {
            if (E) {
                var b = rd(a, "borderLeft"),
                    c = rd(a, "borderRight"),
                    d = rd(a, "borderTop"),
                    a = rd(a, "borderBottom");
                return new Pc(d, c, a, b);
            }
            b = Wc(a, "borderLeftWidth");
            c = Wc(a, "borderRightWidth");
            d = Wc(a, "borderTopWidth");
            a = Wc(a, "borderBottomWidth");
            return new Pc(parseFloat(d), parseFloat(c), parseFloat(a), parseFloat(b));
        },
        td = /[^\d]+$/,
        ud = { cm: 1, in: 1, mm: 1, pc: 1, pt: 1 },
        vd = { em: 1, ex: 1 },
        wd = function (a) {
            var b = Xc(a, "fontSize"),
                c;
            c = ((c = b.match(td)) && c[0]) || k;
            if (b && "px" == c) return parseInt(b, 10);
            if (E) {
                if (c in ud) return nd(a, b, "left", "pixelLeft");
                if (a.parentNode && 1 == a.parentNode.nodeType && c in vd)
                    return (
                        (a = a.parentNode),
                        (c = Xc(a, "fontSize")),
                        nd(a, b == c ? "1em" : b, "left", "pixelLeft")
                    );
            }
            c = xc("span", {
                style: "visibility:hidden;position:absolute;line-height:0;padding:0;margin:0;border:0;height:1em;"
            });
            a.appendChild(c);
            b = c.offsetHeight;
            P(c);
            return b;
        };
    var xd = function (a) {
        xd[" "](a);
        return a;
    };
    xd[" "] = function () {};
    !E || Jb(9);
    var yd = !E || Jb(9),
        zd = E && !G("8");
    !F || G("528");
    (ub && G("1.9b")) || (E && G("8")) || (tb && G("9.5")) || (F && G("528"));
    (ub && !G("8")) || (E && G("9"));
    var Ad = function (a, b) {
        this.type = a;
        this.currentTarget = this.target = b;
    };
    B(Ad, Sc);
    n = Ad.prototype;
    n.r = function () {
        delete this.type;
        delete this.target;
        delete this.currentTarget;
    };
    n.jd = l;
    n.Rf = j;
    n.stopPropagation = function () {
        this.jd = j;
    };
    n.preventDefault = function () {
        this.Rf = l;
    };
    var Bd = function (a, b) {
        a && this.Vh(a, b);
    };
    B(Bd, Ad);
    n = Bd.prototype;
    n.target = k;
    n.relatedTarget = k;
    n.offsetX = 0;
    n.offsetY = 0;
    n.clientX = 0;
    n.clientY = 0;
    n.screenX = 0;
    n.screenY = 0;
    n.button = 0;
    n.keyCode = 0;
    n.charCode = 0;
    n.ctrlKey = l;
    n.altKey = l;
    n.shiftKey = l;
    n.metaKey = l;
    n.ca = k;
    n.Vh = function (a, b) {
        var c = (this.type = a.type);
        Ad.call(this, c);
        this.target = a.target || a.srcElement;
        this.currentTarget = b;
        var d = a.relatedTarget;
        if (d) {
            if (ub) {
                var f;
                a: {
                    try {
                        xd(d.nodeName);
                        f = j;
                        break a;
                    } catch (g) {}
                    f = l;
                }
                f || (d = k);
            }
        } else "mouseover" == c ? (d = a.fromElement) : "mouseout" == c && (d = a.toElement);
        this.relatedTarget = d;
        this.offsetX = F || a.offsetX !== h ? a.offsetX : a.layerX;
        this.offsetY = F || a.offsetY !== h ? a.offsetY : a.layerY;
        this.clientX = a.clientX !== h ? a.clientX : a.pageX;
        this.clientY = a.clientY !== h ? a.clientY : a.pageY;
        this.screenX = a.screenX || 0;
        this.screenY = a.screenY || 0;
        this.button = a.button;
        this.keyCode = a.keyCode || 0;
        this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
        this.ctrlKey = a.ctrlKey;
        this.altKey = a.altKey;
        this.shiftKey = a.shiftKey;
        this.metaKey = a.metaKey;
        this.state = a.state;
        this.ca = a;
        delete this.Rf;
        delete this.jd;
    };
    n.stopPropagation = function () {
        Bd.j.stopPropagation.call(this);
        this.ca.stopPropagation ? this.ca.stopPropagation() : (this.ca.cancelBubble = j);
    };
    n.preventDefault = function () {
        Bd.j.preventDefault.call(this);
        var a = this.ca;
        if (a.preventDefault) a.preventDefault();
        else if (((a.returnValue = l), zd))
            try {
                if (a.ctrlKey || (112 <= a.keyCode && 123 >= a.keyCode)) a.keyCode = -1;
            } catch (b) {}
    };
    n.xl = function () {
        return this.ca;
    };
    n.r = function () {
        Bd.j.r.call(this);
        this.relatedTarget = this.currentTarget = this.target = this.ca = k;
    };
    var Cd = function () {},
        Dd = 0;
    n = Cd.prototype;
    n.key = 0;
    n.gd = l;
    n.Xo = l;
    n.Vh = function (a, b, c, d, f, g) {
        ea(a)
            ? (this.Uo = j)
            : a && a.handleEvent && ea(a.handleEvent)
              ? (this.Uo = l)
              : e(Error("Invalid listener argument"));
        this.me = a;
        this.no = b;
        this.src = c;
        this.type = d;
        this.capture = !!f;
        this.Sh = g;
        this.Xo = l;
        this.key = ++Dd;
        this.gd = l;
    };
    n.handleEvent = function (a) {
        return this.Uo
            ? this.me.call(this.Sh || this.src, a)
            : this.me.handleEvent.call(this.me, a);
    };
    var Ed = {},
        Fd = {},
        Gd = {},
        Hd = {},
        Id = function (a, b, c, d, f) {
            if (b) {
                if (r(b)) {
                    for (var g = 0; g < b.length; g++) Id(a, b[g], c, d, f);
                    return k;
                }
                var d = !!d,
                    i = Fd;
                b in i || (i[b] = { K: 0, Sa: 0 });
                i = i[b];
                d in i || ((i[d] = { K: 0, Sa: 0 }), i.K++);
                var i = i[d],
                    m = ja(a),
                    p;
                i.Sa++;
                if (i[m]) {
                    p = i[m];
                    for (g = 0; g < p.length; g++)
                        if (((i = p[g]), i.me == c && i.Sh == f)) {
                            if (i.gd) break;
                            return p[g].key;
                        }
                } else ((p = i[m] = []), i.K++);
                g = Jd();
                g.src = a;
                i = new Cd();
                i.Vh(c, g, a, b, d, f);
                c = i.key;
                g.key = c;
                p.push(i);
                Ed[c] = i;
                Gd[m] || (Gd[m] = []);
                Gd[m].push(i);
                a.addEventListener
                    ? (a == o || !a.wk) && a.addEventListener(b, g, d)
                    : a.attachEvent(b in Hd ? Hd[b] : (Hd[b] = "on" + b), g);
                return c;
            }
            e(Error("Invalid event type"));
        },
        Jd = function () {
            var a = Kd,
                b = yd
                    ? function (c) {
                          return a.call(b.src, b.key, c);
                      }
                    : function (c) {
                          c = a.call(b.src, b.key, c);
                          if (!c) return c;
                      };
            return b;
        },
        Ld = function (a, b, c, d, f) {
            if (r(b)) for (var g = 0; g < b.length; g++) Ld(a, b[g], c, d, f);
            else if (((d = !!d), (a = Md(a, b, d))))
                for (g = 0; g < a.length; g++)
                    if (a[g].me == c && a[g].capture == d && a[g].Sh == f) {
                        Nd(a[g].key);
                        break;
                    }
        },
        Nd = function (a) {
            if (!Ed[a]) return l;
            var b = Ed[a];
            if (b.gd) return l;
            var c = b.src,
                d = b.type,
                f = b.no,
                g = b.capture;
            c.removeEventListener
                ? (c == o || !c.wk) && c.removeEventListener(d, f, g)
                : c.detachEvent && c.detachEvent(d in Hd ? Hd[d] : (Hd[d] = "on" + d), f);
            c = ja(c);
            f = Fd[d][g][c];
            if (Gd[c]) {
                var i = Gd[c];
                Oa(i, b);
                0 == i.length && delete Gd[c];
            }
            b.gd = j;
            f.zo = j;
            Od(d, g, c, f);
            delete Ed[a];
            return j;
        },
        Od = function (a, b, c, d) {
            if (!d.ub && d.zo) {
                for (var f = 0, g = 0; f < d.length; f++)
                    d[f].gd ? (d[f].no.src = k) : (f != g && (d[g] = d[f]), g++);
                d.length = g;
                d.zo = l;
                0 == g &&
                    (delete Fd[a][b][c],
                    Fd[a][b].K--,
                    0 == Fd[a][b].K && (delete Fd[a][b], Fd[a].K--),
                    0 == Fd[a].K && delete Fd[a]);
            }
        },
        Pd = function (a) {
            var b,
                c = 0,
                d = b == k;
            b = !!b;
            if (a == k)
                bb(Gd, function (a) {
                    for (var f = a.length - 1; 0 <= f; f--) {
                        var g = a[f];
                        if (d || b == g.capture) (Nd(g.key), c++);
                    }
                });
            else if (((a = ja(a)), Gd[a]))
                for (var a = Gd[a], f = a.length - 1; 0 <= f; f--) {
                    var g = a[f];
                    if (d || b == g.capture) (Nd(g.key), c++);
                }
        },
        Md = function (a, b, c) {
            var d = Fd;
            return b in d && ((d = d[b]), c in d && ((d = d[c]), (a = ja(a)), d[a])) ? d[a] : k;
        },
        Rd = function (a, b, c, d, f) {
            var g = 1,
                b = ja(b);
            if (a[b]) {
                a.Sa--;
                a = a[b];
                a.ub ? a.ub++ : (a.ub = 1);
                try {
                    for (var i = a.length, m = 0; m < i; m++) {
                        var p = a[m];
                        p && !p.gd && (g &= Qd(p, f) !== l);
                    }
                } finally {
                    (a.ub--, Od(c, d, b, a));
                }
            }
            return Boolean(g);
        },
        Qd = function (a, b) {
            var c = a.handleEvent(b);
            a.Xo && Nd(a.key);
            return c;
        },
        Kd = function (a, b) {
            if (!Ed[a]) return j;
            var c = Ed[a],
                d = c.type,
                f = Fd;
            if (!(d in f)) return j;
            var f = f[d],
                g,
                i;
            if (!yd) {
                g = b || q("window.event");
                var m = j in f,
                    p = l in f;
                if (m) {
                    if (0 > g.keyCode || g.returnValue != h) return j;
                    a: {
                        var s = l;
                        if (0 == g.keyCode)
                            try {
                                g.keyCode = -1;
                                break a;
                            } catch (y) {
                                s = j;
                            }
                        if (s || g.returnValue == h) g.returnValue = j;
                    }
                }
                s = new Bd();
                s.Vh(g, this);
                g = j;
                try {
                    if (m) {
                        for (var v = [], z = s.currentTarget; z; z = z.parentNode) v.push(z);
                        i = f[j];
                        i.Sa = i.K;
                        for (var fa = v.length - 1; !s.jd && 0 <= fa && i.Sa; fa--)
                            ((s.currentTarget = v[fa]), (g &= Rd(i, v[fa], d, j, s)));
                        if (p) {
                            i = f[l];
                            i.Sa = i.K;
                            for (fa = 0; !s.jd && fa < v.length && i.Sa; fa++)
                                ((s.currentTarget = v[fa]), (g &= Rd(i, v[fa], d, l, s)));
                        }
                    } else g = Qd(c, s);
                } finally {
                    (v && (v.length = 0), s.Fc());
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
    B(Sd, Sc);
    n = Sd.prototype;
    n.wk = j;
    n.Ih = k;
    n.Bk = function (a) {
        this.Ih = a;
    };
    n.addEventListener = function (a, b, c, d) {
        Id(this, a, b, c, d);
    };
    n.removeEventListener = function (a, b, c, d) {
        Ld(this, a, b, c, d);
    };
    n.dispatchEvent = function (a) {
        var b = a.type || a,
            c = Fd;
        if (b in c) {
            if (t(a)) a = new Ad(a, this);
            else if (a instanceof Ad) a.target = a.target || this;
            else {
                var d = a,
                    a = new Ad(b, this);
                hb(a, d);
            }
            var d = 1,
                f,
                c = c[b],
                b = j in c,
                g;
            if (b) {
                f = [];
                for (g = this; g; g = g.Ih) f.push(g);
                g = c[j];
                g.Sa = g.K;
                for (var i = f.length - 1; !a.jd && 0 <= i && g.Sa; i--)
                    ((a.currentTarget = f[i]), (d &= Rd(g, f[i], a.type, j, a) && a.Rf != l));
            }
            if (l in c)
                if (((g = c[l]), (g.Sa = g.K), b))
                    for (i = 0; !a.jd && i < f.length && g.Sa; i++)
                        ((a.currentTarget = f[i]), (d &= Rd(g, f[i], a.type, l, a) && a.Rf != l));
                else
                    for (f = this; !a.jd && f && g.Sa; f = f.Ih)
                        ((a.currentTarget = f), (d &= Rd(g, f, a.type, l, a) && a.Rf != l));
            a = Boolean(d);
        } else a = j;
        return a;
    };
    n.r = function () {
        Sd.j.r.call(this);
        Pd(this);
        this.Ih = k;
    };
    var Ud = function (a, b) {
        this.kd = a || 1;
        this.If = b || Td;
        this.Vk = u(this.Mt, this);
        this.Wk = x();
    };
    B(Ud, Sd);
    Ud.prototype.enabled = l;
    var Td = o.window;
    n = Ud.prototype;
    n.ha = k;
    n.setInterval = function (a) {
        this.kd = a;
        this.ha && this.enabled ? (this.stop(), this.start()) : this.ha && this.stop();
    };
    n.Mt = function () {
        if (this.enabled) {
            var a = x() - this.Wk;
            0 < a && a < 0.8 * this.kd
                ? (this.ha = this.If.setTimeout(this.Vk, this.kd - a))
                : (this.dispatchEvent("tick"),
                  this.enabled &&
                      ((this.ha = this.If.setTimeout(this.Vk, this.kd)), (this.Wk = x())));
        }
    };
    n.start = function () {
        this.enabled = j;
        this.ha || ((this.ha = this.If.setTimeout(this.Vk, this.kd)), (this.Wk = x()));
    };
    n.stop = function () {
        this.enabled = l;
        this.ha && (this.If.clearTimeout(this.ha), (this.ha = k));
    };
    n.r = function () {
        Ud.j.r.call(this);
        this.stop();
        delete this.If;
    };
    var Vd = function (a, b, c) {
        ea(a)
            ? c && (a = u(a, c))
            : a && "function" == typeof a.handleEvent
              ? (a = u(a.handleEvent, a))
              : e(Error("Invalid listener argument"));
        return 2147483647 < b ? -1 : Td.setTimeout(a, b || 0);
    };
    var Wd = function () {
            this.vp = x();
        },
        Xd = new Wd();
    Wd.prototype.set = function (a) {
        this.vp = a;
    };
    Wd.prototype.reset = function () {
        this.set(x());
    };
    Wd.prototype.get = function () {
        return this.vp;
    };
    var Yd = function (a) {
        this.Xb = a || "";
        this.kt = Xd;
    };
    n = Yd.prototype;
    n.to = j;
    n.nt = j;
    n.lt = j;
    n.Nk = l;
    n.qt = l;
    var Zd = function (a) {
            return 10 > a ? "0" + a : "" + a;
        },
        $d = function (a, b) {
            var c = (a.mo - b) / 1e3,
                d = c.toFixed(3),
                f = 0;
            if (1 > c) f = 2;
            else for (; 100 > c; ) (f++, (c *= 10));
            for (; 0 < f--; ) d = " " + d;
            return d;
        },
        ae = function (a) {
            Yd.call(this, a);
        };
    B(ae, Yd);
    var be = function () {
            this.Ct = u(this.Jt, this);
            this.Yh = new ae();
            this.Yh.to = l;
            this.Ro = this.Yh.Nk = l;
            this.ro = "";
            this.Ws = {};
        },
        de = function () {
            var a = ce;
            if (j != a.Ro) {
                Zb();
                var b = Yb,
                    c = a.Ct;
                b.bg || (b.bg = []);
                b.bg.push(c);
                a.Ro = j;
            }
        };
    be.prototype.Jt = function (a) {
        if (!this.Ws[a.lo]) {
            var b;
            b = this.Yh;
            var c = [];
            c.push(b.Xb, " ");
            if (b.to) {
                var d = new Date(a.mo);
                c.push(
                    "[",
                    Zd(d.getFullYear() - 2e3) +
                        Zd(d.getMonth() + 1) +
                        Zd(d.getDate()) +
                        " " +
                        Zd(d.getHours()) +
                        ":" +
                        Zd(d.getMinutes()) +
                        ":" +
                        Zd(d.getSeconds()) +
                        "." +
                        Zd(Math.floor(d.getMilliseconds() / 10)),
                    "] "
                );
            }
            b.nt && c.push("[", $d(a, b.kt.get()), "s] ");
            b.lt && c.push("[", a.lo, "] ");
            b.qt && c.push("[", a.getLevel().name, "] ");
            c.push(a.getMessage(), "\n");
            b.Nk && a.Ik && c.push(a.Hk, "\n");
            b = c.join("");
            if (ee && ee.firebug)
                switch (a.getLevel()) {
                    case Sb:
                        ee.info(b);
                        break;
                    case H:
                        ee.error(b);
                        break;
                    case Tb:
                        ee.warn(b);
                        break;
                    default:
                        ee.debug(b);
                }
            else ee ? ee.log(b) : window.opera ? window.opera.postError(b) : (this.ro += b);
        }
    };
    var ce = k,
        ee = window.console,
        fe = function () {
            ce || (ce = new be());
            -1 != window.location.href.indexOf("Debug=true") && de();
        };
    var ge = k,
        R = function (a, b, c, d) {
            ge || (fe(), de(), (ce.Yh.Nk = j), (ge = $b("yt.debug")), ge.Bi(Ub));
            ge.log(a, b + ": " + c, d);
        };
    var ie = function (a, b, c) {
            a.dataset ? (a.dataset[he(b)] = c) : a.setAttribute("data-" + b, c);
        },
        je = function (a, b) {
            return a.dataset ? a.dataset[he(b)] : a.getAttribute("data-" + b);
        },
        ke = function (a, b) {
            a.dataset ? delete a.dataset[he(b)] : a.removeAttribute("data-" + b);
        },
        le = {},
        he = function (a) {
            return (
                le[a] ||
                (le[a] = ("" + a).replace(/\-([a-z])/g, function (a, c) {
                    return c.toUpperCase();
                }))
            );
        };
    var me = q("yt.dom.getNextId_");
    if (!me) {
        me = function () {
            return ++ne;
        };
        A("yt.dom.getNextId_", me);
        var ne = 0;
    }
    var oe = function (a) {
            var b = a.cloneNode(l);
            "TR" == b.tagName || "SELECT" == b.tagName
                ? D(a.childNodes, function (a) {
                      b.appendChild(oe(a));
                  })
                : (b.innerHTML = a.innerHTML);
            return b;
        },
        pe = function (a, b) {
            a = N(a);
            b = N(b);
            return !!Kc(
                a,
                function (a) {
                    return a === b;
                },
                j,
                h
            );
        },
        qe = function (a, b) {
            var c = qc(a, k, b);
            return c.length ? c[0] : k;
        },
        re = function (a, b) {
            return O(a, b);
        },
        se = function (a, b) {
            if (a in b) return b[a];
            var c = a.charAt(0).toUpperCase() + a.substr(1);
            if ("moz" + c in b) return b["moz" + c];
            if ("ms" + c in b) return b["ms" + c];
            if ("o" + c in b) return b["o" + c];
            if ("webkit" + c in b) return b["webkit" + c];
        };
    var te = function (a) {
        if ((a = a || q("window.event"))) {
            this.type = a.type;
            var b = a.target || a.srcElement;
            b && 3 == b.nodeType && (b = b.parentNode);
            this.target = b;
            if ((b = a.relatedTarget))
                try {
                    b = b.nodeName && b;
                } catch (c) {
                    b = k;
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
            this.clientX = a.clientX !== h ? a.clientX : a.pageX;
            this.clientY = a.clientY !== h ? a.clientY : a.pageY;
            if (a.pageX || a.pageY) ((this.pageX = a.pageX), (this.pageY = a.pageY));
            else if ((a.clientX || a.clientY) && document.body && document.documentElement)
                ((this.pageX =
                    a.clientX + document.body.scrollLeft + document.documentElement.scrollLeft),
                    (this.pageY =
                        a.clientY + document.body.scrollTop + document.documentElement.scrollTop));
            this.keyCode = a.keyCode ? a.keyCode : a.which;
            this.charCode = a.charCode || ("keypress" == this.type ? this.keyCode : 0);
            this.altKey = a.altKey;
            this.ctrlKey = a.ctrlKey;
            this.shiftKey = a.shiftKey;
            0 == this.type.indexOf("touch") &&
                ((this.touches = a.touches), (this.changedTouches = a.changedTouches));
            0 == this.type.indexOf("gesture") &&
                ((this.scale = a.scale), (this.rotation = a.rotation));
            this.ca = a;
        }
    };
    n = te.prototype;
    n.type = "";
    n.target = k;
    n.relatedTarget = k;
    n.currentTarget = k;
    n.data = k;
    n.source = k;
    n.origin = k;
    n.state = k;
    n.keyCode = 0;
    n.charCode = 0;
    n.altKey = l;
    n.ctrlKey = l;
    n.shiftKey = l;
    n.ca = k;
    n.clientX = 0;
    n.clientY = 0;
    n.pageX = 0;
    n.pageY = 0;
    n.touches = k;
    n.changedTouches = k;
    n.preventDefault = function () {
        this.ca.returnValue = l;
        this.ca.preventDefault && this.ca.preventDefault();
    };
    n.th = function () {
        this.ca.th ? this.ca.th() : this.preventDefault();
    };
    n.stopPropagation = function () {
        this.ca.cancelBubble = j;
        this.ca.stopPropagation && this.ca.stopPropagation();
    };
    var db = q("yt.events.listeners_") || {};
    A("yt.events.listeners_", db);
    var ue = q("yt.events.counter_") || { count: 0 };
    A("yt.events.counter_", ue);
    var ve = function (a, b, c, d) {
            return eb(function (f) {
                return f[0] == a && f[1] == b && f[2] == c && f[4] == !!d;
            });
        },
        S = function (a, b, c, d) {
            if (!a || (!a.addEventListener && !a.attachEvent)) return "";
            var d = !!d,
                f = ve(a, b, c, d);
            if (f) return f;
            var f = ++ue.count + "",
                g = function (b) {
                    b = new te(b);
                    b.currentTarget = a;
                    return c.call(a, b);
                };
            db[f] = [a, b, c, g, d];
            a.addEventListener ? a.addEventListener(b, g, d) : a.attachEvent("on" + b, g);
            return f;
        },
        we = function (a, b, c) {
            if (se("pointerEnabled", window.navigator))
                return (
                    (b = b.charAt(0).toUpperCase() + b.substr(1).toLowerCase()),
                    S(a, "MSPointer" + b, function (a) {
                        c(a);
                    })
                );
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
            var f = l,
                g = 0;
            return [
                S(a, "touch" + d, function (a) {
                    window.clearTimeout(g);
                    f = j;
                    D(a.changedTouches, function (b) {
                        var d = new te(a);
                        w(d, b);
                        c(d);
                    });
                    g = window.setTimeout(function () {
                        f = l;
                    }, 400);
                }),
                S(a, "mouse" + b, function (a) {
                    f || c(a);
                })
            ];
        },
        ye = function (a, b, c) {
            xe(a, b, function (a) {
                return K(a, c);
            });
        },
        xe = function (a, b, c) {
            var d = a || document;
            S(d, "click", function (a) {
                var g = Kc(
                    a.target,
                    function (a) {
                        return a === d || c(a);
                    },
                    j
                );
                g && g !== d && ((a.currentTarget = g), b.call(g, a));
            });
        },
        Ae = function (a) {
            (a = ve(document, a, T, l)) && ze(a);
        },
        ze = function (a) {
            "string" == typeof a && (a = [a]);
            D(a, function (a) {
                if (a in db) {
                    var c = db[a],
                        d = c[0],
                        f = c[1],
                        g = c[3],
                        c = c[4];
                    d.removeEventListener
                        ? d.removeEventListener(f, g, c)
                        : d.detachEvent("on" + f, g);
                    delete db[a];
                }
            });
        },
        Be = function (a, b) {
            if (document.createEvent) {
                var c = document.createEvent("HTMLEvents");
                c.initEvent(b, j, j);
                a.dispatchEvent(c);
            } else ((c = document.createEventObject()), a.fireEvent("on" + b, c));
        };
    var Ce = function (a) {
            var b = document,
                c =
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
                                : k;
            c && S(b, c, a);
        },
        De = function () {
            var a = se("fullScreenEnabled", document);
            return a || (a == h && !ub && !!se("requestFullScreen", document.body));
        };
    var Fe = function (a, b, c) {
            var c = c || {},
                d = c.Sc;
            d ||
                ((d = document.createElement("style")),
                document.getElementsByTagName("head")[0].appendChild(d),
                (d = d.sheet || d.styleSheet));
            c.reset && Ee(d);
            b = b instanceof Array ? b.join(";") : b;
            d.insertRule ? d.insertRule(a + "{" + b + "}", d.cssRules.length) : d.addRule(a, b, -1);
            return d;
        },
        Ee = function (a) {
            for (var b = (a.cssRules || a.rules).length; 0 < b; b--) {
                var c = a;
                c.deleteRule ? c.deleteRule(0) : c.removeRule(0);
            }
        };
    var Ge = function (a) {
        this.rl = a || window;
        this.od = [];
    };
    Ge.prototype.rl = k;
    Ge.prototype.od = k;
    Ge.prototype.G = function (a, b, c, d) {
        c = u(c, d || this.rl);
        a = S(a, b, c);
        this.od.push(a);
        return a;
    };
    var He = function (a, b, c) {
        var d = document,
            c = u(c, a.rl),
            b = we(d, b, c);
        a.od.push(b);
    };
    Ge.prototype.Gk = function (a) {
        ze(a);
        Oa(this.od, a);
    };
    Ge.prototype.Wa = function () {
        for (var a = 0; a < this.od.length; a++) ze(this.od[a]);
        this.od = [];
    };
    var Le = function (a) {
            a = a || {};
            this.url = a.url || this.url;
            this.urlV8 = a.url_v8 || this.urlV8;
            this.urlV9As2 = a.url_v9as2 || this.urlV9As2;
            this.minVersion = a.min_version || this.minVersion;
            this.args = a.args || fb(Ie);
            this.assets = a.assets || {};
            this.attrs = a.attrs || fb(Je);
            this.params = a.params || fb(Ke);
            this.fallback = a.fallback || this.fallback;
            this.html5 = a.html5 || this.html5;
            this.disable = a.disable || {};
        },
        Ie = { enablejsapi: 1 },
        Je = { width: "640", height: "385" },
        Ke = { allowscriptaccess: "always", allowfullscreen: "true", bgcolor: "#000000" };
    n = Le.prototype;
    n.url = "";
    n.urlV8 = "";
    n.urlV9As2 = "";
    n.minVersion = "8.0.0";
    n.html5 = l;
    var Me = function (a) {
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
            e(Error("Invalid JSON string: " + a));
        },
        Ne = function (a) {
            return eval("(" + a + ")");
        },
        Oe = function () {
            this.Di = h;
        },
        Qe = function (a, b) {
            var c = [];
            Pe(a, b, c);
            return c.join("");
        },
        Pe = function (a, b, c) {
            switch (typeof b) {
                case "string":
                    Re(b, c);
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
                    if (b == k) {
                        c.push("null");
                        break;
                    }
                    if (r(b)) {
                        var d = b.length;
                        c.push("[");
                        for (var f = "", g = 0; g < d; g++)
                            (c.push(f),
                                (f = b[g]),
                                Pe(a, a.Di ? a.Di.call(b, "" + g, f) : f, c),
                                (f = ","));
                        c.push("]");
                        break;
                    }
                    c.push("{");
                    d = "";
                    for (g in b)
                        Object.prototype.hasOwnProperty.call(b, g) &&
                            ((f = b[g]),
                            "function" != typeof f &&
                                (c.push(d),
                                Re(g, c),
                                c.push(":"),
                                Pe(a, a.Di ? a.Di.call(b, g, f) : f, c),
                                (d = ",")));
                    c.push("}");
                    break;
                case "function":
                    break;
                default:
                    e(Error("Unknown type: " + typeof b));
            }
        },
        Se = {
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
        Te = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g,
        Re = function (a, b) {
            b.push(
                '"',
                a.replace(Te, function (a) {
                    if (a in Se) return Se[a];
                    var b = a.charCodeAt(0),
                        f = "\\u";
                    16 > b ? (f += "000") : 256 > b ? (f += "00") : 4096 > b && (f += "0");
                    return (Se[a] = f + b.toString(16));
                }),
                '"'
            );
        };
    var Ue = RegExp(
            "^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([\\w\\d\\-\\u0100-\\uffff.%]*)(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$"
        ),
        Xe = function (a) {
            if (Ve) {
                Ve = l;
                var b = o.location;
                if (b) {
                    var c = b.href;
                    if (c && (c = We(c)) && c != b.hostname) ((Ve = j), e(Error()));
                }
            }
            return a.match(Ue);
        },
        Ve = F,
        We = function (a) {
            return (a = Xe(a)[3] || k) && decodeURIComponent(a);
        },
        Ye = function (a, b) {
            for (var c in b) {
                var d = c,
                    f = b[c],
                    g = a;
                if (r(f))
                    for (var i = 0; i < f.length; i++)
                        (g.push("&", d), "" !== f[i] && g.push("=", ra(f[i])));
                else f != k && (g.push("&", d), "" !== f && g.push("=", ra(f)));
            }
            return a;
        };
    var Ze = function (a, b) {
            for (var c = a.split(b), d = {}, f = 0, g = c.length; f < g; f++) {
                var i = c[f].split("=");
                if ((1 == i.length && i[0]) || 2 == i.length) {
                    var m = i[0],
                        i = decodeURIComponent((i[1] || "").replace(/\+/g, " "));
                    m in d ? (r(d[m]) ? Sa(d[m], i) : (d[m] = [d[m], i])) : (d[m] = i);
                }
            }
            return d;
        },
        $e = function (a) {
            var b = [];
            bb(a, function (a, d) {
                var f = ra(d),
                    g;
                g = r(a) ? a : [a];
                D(g, function (a) {
                    "" == a ? b.push(f) : b.push(f + "=" + ra(a));
                });
            });
            return b.join(";");
        },
        af = function (a) {
            "?" == a.charAt(0) && (a = a.substr(1));
            return Ze(a, "&");
        },
        bf = function (a) {
            return -1 != a.indexOf("?")
                ? ((a = (a || "").split("#")[0]),
                  (a = a.split("?", 2)),
                  af(1 < a.length ? a[1] : a[0]))
                : {};
        },
        cf = function (a) {
            a = Ye([], a);
            a[0] = "";
            return a.join("");
        },
        U = function (a, b) {
            var c = Ye([a], b);
            if (c[1]) {
                var d = c[0],
                    f = d.indexOf("#");
                0 <= f && (c.push(d.substr(f)), (c[0] = d = d.substr(0, f)));
                f = d.indexOf("?");
                0 > f ? (c[1] = "?") : f == d.length - 1 && (c[1] = h);
            }
            return c.join("");
        },
        df = We,
        ef = function (a, b) {
            var c = a.split("?", 2),
                a = c[0],
                c = af(c[1] || ""),
                d;
            for (d in b) c[d] = b[d];
            return U(a, c);
        };
    var ff = k;
    "undefined" != typeof XMLHttpRequest
        ? (ff = function () {
              return new XMLHttpRequest();
          })
        : "undefined" != typeof ActiveXObject &&
          (ff = function () {
              return new ActiveXObject("Microsoft.XMLHTTP");
          });
    var gf = function (a) {
        switch (a && "status" in a ? a.status : -1) {
            case 0:
            case 200:
            case 204:
            case 304:
                return j;
            default:
                return l;
        }
    };
    var hf = function (a, b, c, d, f) {
            var g = ff && ff();
            if ("open" in g) {
                g.onreadystatechange = function () {
                    4 == (g && "readyState" in g ? g.readyState : 0) && b && b(g);
                };
                c = (c || "GET").toUpperCase();
                d = d || "";
                g.open(c, a, j);
                a = "POST" == c;
                if (f)
                    for (var i in f)
                        (g.setRequestHeader(i, f[i]), "content-type" == i.toLowerCase() && (a = l));
                a && g.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                g.send(d);
            }
        },
        kf = function (a, b) {
            var c = b.format || "JSON";
            b.jr && (a = document.location.protocol + "//" + document.location.hostname + a);
            var d = b.Mg;
            d && (a = ef(a, d));
            var f = b.yu || "";
            if ((d = b.Ym)) ((f = af(f)), hb(f, d), (f = cf(f)));
            hf(
                a,
                function (a) {
                    var d = gf(a),
                        f = k;
                    if (d || (400 <= a.status && 500 > a.status)) f = jf(c, a);
                    if (d)
                        a: {
                            switch (c) {
                                case "XML":
                                    d = 0 == parseInt(f && f.return_code, 10);
                                    break a;
                                case "RAW":
                                    d = j;
                                    break a;
                            }
                            d = !!f;
                        }
                    var f = f || {},
                        p = b.lf || o;
                    d ? b.Rb && b.Rb.call(p, a, f) : b.qf && b.qf.call(p, a, f);
                    b.nm && b.nm.call(p, a, f);
                },
                b.method,
                f,
                b.headers
            );
        },
        jf = function (a, b) {
            var c = k;
            switch (a) {
                case "JSON":
                    var d = b.responseText,
                        f = b.getResponseHeader("Content-Type") || "";
                    d && 0 <= f.indexOf("json") && (c = Ne(d));
                    break;
                case "XML":
                    if ((d = (d = b.responseXML) ? lf(d) : k))
                        ((c = {}),
                            D(d.getElementsByTagName("*"), function (a) {
                                c[a.tagName] = mf(a);
                            }));
            }
            return c;
        },
        lf = function (a) {
            return !a
                ? k
                : (a = ("responseXML" in a ? a.responseXML : a).getElementsByTagName("root")) &&
                    0 < a.length
                  ? a[0]
                  : k;
        },
        mf = function (a) {
            var b = "";
            D(a.childNodes, function (a) {
                b += a.nodeValue;
            });
            return b;
        },
        nf = q("yt.net.ajax.tokenMap_") || {};
    A("yt.net.ajax.tokenMap_", nf);
    var of = {},
        pf = 0,
        qf = function (a) {
            var b = new Image(),
                c = "" + pf++;
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
        this.tc = this.gl(k);
    };
    rf.prototype.find = function (a, b) {
        for (var c = this.tc, d = this.ia; 0 <= d; d--) {
            for (; c.links[d] && c.links[d].value < a; ) c = c.links[d];
            b && (b[d] = c);
        }
        return (c = c.Tb()) && c.value == a ? c : k;
    };
    var sf = function (a, b) {
        var c = [],
            d = a.find(b, c);
        return d ? d.Tb() : c[0].Tb();
    };
    n = rf.prototype;
    n.Bf = function (a) {
        var b = [],
            c = this.find(a, b);
        return c ? c : this.Zk(a, b);
    };
    n.Zk = function (a, b) {
        var c;
        for (c = 0; 0.25 > this.Ft() && c <= this.ia && 15 > c; ) c++;
        for (; this.ia < c; ) b[++this.ia] = this.tc;
        for (var d = this.gl(a), f = 0; f <= c; f++)
            ((d.links[f] = b[f].links[f]), (b[f].links[f] = d));
        return d;
    };
    n.remove = function (a) {
        var b = [];
        return (a = this.find(a, b)) ? this.Qf(a, b) : a;
    };
    n.Qf = function (a, b) {
        for (var c = 0; c <= a.getLevel(); c++) b[c].links[c] = a.links[c];
        for (; !this.tc.links[this.ia] && 0 < this.ia; ) this.ia--;
        return a;
    };
    n.gl = function (a) {
        return new tf(a);
    };
    n.getLength = function () {
        for (var a = 0, b = this.tc.Tb() || k; b != k; b = b.Tb()) a++;
        return a;
    };
    n.toString = function (a) {
        for (var a = a || 0, b = "", c = this.tc; c.links[a]; )
            ((c = c.links[a]), (b = b.concat(b.length ? "," : "", c.toString())));
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
        return this.links[0] || k;
    };
    tf.prototype.toString = function () {
        return "" + this.value;
    };
    var vf = function (a, b) {
            this.start = a;
            this.end = b;
            this.re = uf++;
        },
        uf = 0;
    vf.prototype.contains = function (a, b) {
        return a >= this.start && a < this.end && (b == k || (a < b && b <= this.end));
    };
    var wf = function (a) {
        rf.call(this, a);
    };
    wf.prototype = new rf(Math.random);
    wf.prototype.constructor = wf;
    var xf = function (a, b) {
            for (var c = [], d = a.tc, f = a.ia; 0 <= f; f--) {
                for (; d.links[f] && d.links[f].value <= b; ) d = d.links[f];
                var g = c,
                    i = d.X[f],
                    m = h;
                for (m in i) g.push(i[1 * m]);
            }
            if (d.value == b) for (var p in d.Kf) ((f = d.Kf[p]), f.start == f.end && c.push(f));
            return c;
        },
        yf = function (a, b, c) {
            for (var d = [], b = sf(a, b), a = c == k ? k : sf(a, c); b && b != a; ) {
                var c = d,
                    f = b.Kf,
                    g = h;
                for (g in f) c.push(f[1 * g]);
                b = b.Tb();
            }
            return d;
        },
        Af = function (a, b) {
            var c = a.Bf(b.start),
                d = a.Bf(b.end);
            c.Kf[b.re] = b;
            c.Zh++;
            d.Zh++;
            zf(b, c, d, function (a, c) {
                a.X[c] && a.X[c][b.re] == b && e(Error("Interval already exists: " + b));
                a.La(c, b);
            });
        };
    wf.prototype.Zk = function (a, b) {
        var c = rf.prototype.Zk.call(this, a, b),
            d,
            f,
            g,
            i = {};
        for (d = 0; d < c.getLevel() && c.links[d + 1]; d++) {
            for (f in i)
                ((g = i[f]),
                    g.contains(c.value, c.links[d + 1].value)
                        ? Bf(g, c.links[d], c.links[d + 1], d)
                        : (c.La(d, g), delete i[f]));
            for (f in b[d].X[d])
                ((g = b[d].X[d][1 * f]),
                    g.contains(c.value, c.links[d + 1].value)
                        ? (Bf(g, c.links[d], c.links[d + 1], d), (i[f] = g))
                        : c.La(d, g));
        }
        for (f in i) c.La(d, i[f]);
        for (f in b[d].X[d]) c.La(d, b[d].X[d][1 * f]);
        i = {};
        for (d = 0; d < c.getLevel() && b[d + 1] != this.tc; d++) {
            for (f in i)
                ((g = i[f]),
                    g.contains(b[d].value, c.value) && !g.contains(b[d + 1].value, c.value)
                        ? (b[d].La(d, g), delete i[f])
                        : Bf(g, b[d + 1], c, d));
            for (f in b[d].X[d])
                ((g = b[d].X[d][1 * f]),
                    g.contains(b[d + 1].value, c.value) && (Bf(g, b[d + 1], c, d), (i[f] = g)));
        }
        for (f in i) b[d].La(d, i[f]);
        return c;
    };
    var Cf = function (a, b) {
        var c = [],
            d = a.find(b.start, c),
            f = a.find(b.end);
        (!d || !f) && e(Error("Interval not found: " + b));
        zf(b, d, f, function (a, c) {
            (a.X[c] && a.X[c][b.re] == b) || e(Error("Interval not found: " + b));
            a.nf(c, b);
        });
        delete d.Kf[b.re];
        0 == --d.Zh && a.Qf(d, c);
        f = a.find(b.end, c);
        0 == --f.Zh && a.Qf(f, c);
    };
    wf.prototype.Qf = function (a, b) {
        var c,
            d,
            f,
            g = {};
        for (c = a.getLevel(); 0 <= c; c--) {
            for (d in g) {
                for (var i = (f = g[d]), m = b[c + 1], p = b[c], s = c; m && m != p; )
                    (m.La(s, i), (m = m.links[s]));
                a.links[c] &&
                    f.contains(b[c].value, a.links[c].value) &&
                    (b[c].La(c, f), delete g[d]);
            }
            for (d in b[c].X[c])
                if (
                    ((f = b[c].X[c][1 * d]),
                    !a.links[c] || !f.contains(b[c].value, a.links[c].value))
                )
                    (b[c].nf(c, f), (g[d] = f));
        }
        g = {};
        for (c = a.getLevel(); 0 <= c; c--) {
            for (d in g) {
                i = f = g[d];
                m = a.links[c];
                p = a.links[c + 1];
                for (s = c; m && m != p; ) (m.La(s, i), (m = m.links[s]));
                a.links[c] && f.contains(b[c].value, a.links[c].value) && delete g[d];
            }
            for (d in a.X[c])
                if (
                    ((f = a.X[c][1 * d]),
                    a.links[c] && (b[c] == this.tc || !f.contains(b[c].value, a.links[c].value)))
                )
                    g[d] = f;
        }
        return rf.prototype.Qf.call(this, a, b);
    };
    wf.prototype.gl = function (a) {
        return new Df(a);
    };
    var zf = function (a, b, c, d) {
            for (var f = 0; b.links[f] && a.contains(b.value, b.links[f].value); ) {
                for (
                    ;
                    f < b.getLevel() && b.links[f + 1] && a.contains(b.value, b.links[f + 1].value);
                )
                    f++;
                b.links[f] && (d(b, f), (b = b.links[f]));
            }
            for (; b != c; ) {
                for (; 0 < f && (!b.links[f] || !a.contains(b.value, b.links[f].value)); ) f--;
                d(b, f);
                b = b.links[f];
            }
        },
        Bf = function (a, b, c, d) {
            for (; b && b != c; ) (b.nf(d, a), (b = b.links[d]));
        },
        Df = function (a) {
            tf.call(this, a);
            this.Kf = {};
            this.X = [];
            this.Zh = 0;
        };
    Df.prototype = new tf(Math.random);
    Df.prototype.constructor = Df;
    Df.prototype.La = function (a, b) {
        this.X[a] || (this.X[a] = {});
        this.X[a][b.re] = b;
    };
    Df.prototype.nf = function (a, b) {
        this.X[a] && delete this.X[a][b.re];
    };
    var Ef = function (a, b, c) {
        vf.call(this, a, b);
        a = c || {};
        this.oa = a.id;
        a.priority != h && (this.Sf = a.priority);
        this.Mj = a.namespace || "";
        this.visible = a.visible || l;
        this.pubsub = new Q();
    };
    Ef.prototype = new vf(0, 0);
    n = Ef.prototype;
    n.constructor = Ef;
    n.oa = "";
    n.Sf = 10;
    n.Mo = l;
    n.Jg = j;
    n.visible = l;
    n.pubsub = k;
    n.Mj = "";
    n.getId = function () {
        return this.oa;
    };
    n.dd = function () {
        return this.Sf;
    };
    var Ff = function (a, b) {
        return a.start == b.start
            ? a.dd() == b.dd()
                ? 0
                : a.dd() < b.dd()
                  ? -1
                  : 1
            : a.start < b.start
              ? -1
              : 1;
    };
    var Gf = function (a, b, c) {
        this.Jb = a;
        this.fn = b;
        this.Wm = c;
        this.pubsub = new Q();
        this.fh = new Ud(250);
        this.fh.addEventListener("tick", u(this.eb, this));
        this.fb = [];
        this.wb = [];
        this.Sb = new wf(Math.random);
    };
    n = Gf.prototype;
    n.Uj = l;
    n.ub = l;
    n.bh = l;
    n.zt = l;
    n.Zj = l;
    n.Yj = l;
    n.rf = k;
    n.pubsub = k;
    n.addCueRange = function (a) {
        var b = Ra(arguments);
        this.eb();
        b.forEach(function (a) {
            this.fb.push(a);
            Af(this.Sb, a);
            this.pubsub.c("onAdd", a);
        }, this);
        this.Uj = j;
        this.eb();
    };
    n.removeCueRange = function (a) {
        Ra(arguments).forEach(function (a) {
            a = this.fb.indexOf(a);
            0 <= a && Hf(this, a);
        }, this);
        this.eb();
    };
    var Hf = function (a, b) {
        var c = a.fb.splice(b, 1)[0];
        Cf(a.Sb, c);
        b = a.wb.indexOf(c);
        0 <= b && a.wb.splice(b, 1);
        a.pubsub.c("onRemove", c);
    };
    Gf.prototype.Eg = function () {
        this.Y = 1e3 * this.Jb();
        this.bh = j;
        this.eb();
    };
    Gf.prototype.reset = function () {
        this.bh = this.ub = l;
        If(this);
        this.Wd();
        this.Ud = k;
    };
    Gf.prototype.Wd = function () {
        for (var a = this.fb.length - 1; 0 <= a; a--) Hf(this, a);
        this.eb();
    };
    var Jf = function (a, b) {
        var c = [];
        if (!b.length) return c;
        b.sort(Ff);
        for (var d = 0; d < b.length; d++) {
            var f = b[d];
            if (f.Jg && -1 == a.wb.indexOf(f) && (!f.Mo || a.zt))
                if ((a.wb.push(f), f.Mo)) {
                    a.ub = j;
                    a.Ud || c.push(["onLockBlockEnter", f]);
                    c.push(["onEnter", f]);
                    a.Ud = f;
                    break;
                } else c.push(["onEnter", f]);
        }
        return c;
    };
    Gf.prototype.eb = function () {
        this.Yj = j;
        if (!this.Zj)
            for (var a = 3; this.Yj && a; ) {
                this.Yj = l;
                this.Zj = j;
                if (this.bh && !this.ub) {
                    If(this);
                    for (var b = 1e3 * this.Jb(), c = [], d = 0; d < this.wb.length; d++) {
                        var f = this.wb[d];
                        f.Jg && !f.contains(b) && (c.push(["onExit", f]), this.wb.splice(d--, 1));
                    }
                    d = h;
                    this.Y < b
                        ? ((d = yf(this.Sb, this.Y, b)), this.Uj && (d = d.concat(xf(this.Sb, b))))
                        : (d = xf(this.Sb, b));
                    c = c.concat(Jf(this, d));
                    this.Y = b;
                    this.Uj = l;
                    !this.ub &&
                        this.Ud &&
                        (c.unshift(["onLockBlockExit", this.Ud]),
                        (this.Ud = k),
                        this.fn().Jj && (this.Y = 2147483647));
                    if (this.fn().pf && !this.Wm() && (b = sf(this.Sb, this.Y)))
                        this.rf = Vd(u(this.eb, this), b.value - this.Y);
                    for (d = 0; d < c.length; d++)
                        ((b = c[d]),
                            (f = b[1]),
                            "onLockBlockExit" == b[0] || "onLockBlockEnter" == b[0]
                                ? this.pubsub.c.apply(this.pubsub, b)
                                : f.pubsub.c.apply(f.pubsub, b));
                }
                this.Zj = l;
                a--;
            }
    };
    var If = function (a) {
        a.rf != k && (Td.clearTimeout(a.rf), (a.rf = k));
    };
    var Kf = function () {
        this.Ob = {};
    };
    n = Kf.prototype;
    n.Ho = k;
    n.Xk = k;
    n.Go = 0;
    n.width = 0;
    n.height = 0;
    n.fa = 0;
    n.rows = 0;
    n.frames = 0;
    n.Yk = k;
    n.ae = function (a) {
        return !!this.Ob[a];
    };
    n.getUrl = function (a) {
        var b = this.Ho,
            b = b.replace("$N", this.Xk),
            b = b.replace("$L", this.Go.toString()),
            b = b.replace("$M", a.toString());
        this.Yk && (b = U(b, { sigh: this.Yk }));
        return b;
    };
    n.kc = function (a) {
        var b = Math.floor(a / (this.fa * this.rows)),
            c = this.fa * this.rows,
            d = a % c,
            a = d % this.fa,
            d = Math.floor(d / this.fa),
            f = this.rows,
            g = this.frames - c * b;
        g < c && (f = Math.ceil(g / this.fa));
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
        for (var a = a.split("|"), b = a[0], c = 1, d, f; c < a.length; c++)
            ((d = a[c].split("#")),
                (f = new Kf()),
                (f.Go = c - 1),
                (f.width = parseInt(d[0], 10)),
                (f.height = parseInt(d[1], 10)),
                (f.frames = parseInt(d[2], 10)),
                (f.fa = parseInt(d[3], 10)),
                (f.rows = parseInt(d[4], 10)),
                (f.Ho = b),
                (f.Xk = d[6]),
                (f.Yk = d[7]),
                this.ve.push(f));
        1 < this.ve.length && -1 != this.getLevel(0).Xk.indexOf("default") && this.ve.splice(0, 1);
    };
    n = Lf.prototype;
    n.ve = k;
    n.ki = k;
    n.getUrl = function (a, b) {
        return this.getLevel(a).getUrl(b);
    };
    n.kc = function (a, b) {
        var c = this.getLevel(a);
        return c.ae(Math.floor(b / (c.fa * c.rows))) ? c.kc(b) : k;
    };
    n.getLevel = function (a) {
        return this.ve[a];
    };
    var Mf = function (a, b) {
        var c = a.ki[b];
        if (c) return c;
        for (var c = a.ve.length, d = 0; d < c; d++)
            if (a.getLevel(d).width >= b) return (a.ki[b] = d);
        a.ki[b] = c - 1;
        return c - 1;
    };
    var Nf = { 0: "MONO", 1: "LEFT_RIGHT", 2: "RIGHT_LEFT", 3: "TOP_BOTTOM", 4: "BOTTOM_TOP" };
    var Of = ["corp.google.com", "youtube.com"],
        Pf =
            "www.google.com/aclk,www.google.com/pagead/conversion,googleadservices.com/aclk,googleadservices.com/pagead/conversion,googleads.g.doubleclick.net/aclk,googleads.g.doubleclick.net/pagead/conversion".split(
                ","
            ),
        Qf = function (a, b) {
            return RegExp(
                "^https?://([a-z0-9-]{1,63}\\.)*(" +
                    b.join("|").replace(/\./g, ".") +
                    ")(:[0-9]+)?([/?#]|$)",
                "i"
            ).test(a);
        };
    var Rf = function () {
        this.ra = new Q();
    };
    B(Rf, Sc);
    Rf.prototype.e = function (a, b, c) {
        this.Tc
            ? R(H, "ObjectMixin", "Subscribing to " + a + " on a disposed object.", h)
            : this.ra.e(a, b, c);
    };
    Rf.prototype.H = function (a, b, c) {
        this.Tc
            ? R(H, "ObjectMixin", "Unsubscribing to " + a + " on a disposed object.", h)
            : this.ra.H(a, b, c);
    };
    Rf.prototype.c = function (a, b) {
        this.Tc
            ? R(H, "ObjectMixin", "Publishing " + a + " on a disposed object.", h)
            : this.ra.c.apply(this.ra, arguments);
    };
    Rf.prototype.r = function () {
        Rf.j.r.call(this);
        Uc(this.ra);
    };
    var Sf = function (a, b) {
            this.state = a;
            this.Zm = b;
        },
        Tf = function () {};
    Tf.prototype.Jj = l;
    Tf.prototype.yi = l;
    Tf.prototype.pf = l;
    Tf.prototype.Oj = l;
    var Uf = new Tf();
    Uf.Jj = j;
    Uf.pf = j;
    Uf.yi = j;
    var Vf = new Tf();
    Vf.yi = j;
    var Wf = new Tf();
    Wf.pf = j;
    var Xf = new Tf(),
        Yf = new Tf();
    Yf.Oj = j;
    var Zf = { Yv: "audio", $w: "play_pause", mx: "seek" };
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
        if (a)
            a: {
                var b, c;
                if (a instanceof ag) {
                    if (((b = a.Ht()), (c = a.It()), 0 >= a.te())) {
                        for (var a = this.Cb, d = 0; d < b.length; d++) a.push(new $f(b[d], c[d]));
                        break a;
                    }
                } else {
                    b = [];
                    c = 0;
                    for (d in a) b[c++] = d;
                    c = cb(a);
                }
                for (d = 0; d < b.length; d++) this.Bf(b[d], c[d]);
            }
    };
    n = ag.prototype;
    n.Bf = function (a, b) {
        var c = this.Cb;
        c.push(new $f(a, b));
        for (var c = c.length - 1, d = this.Cb, f = d[c]; 0 < c; ) {
            var g = (c - 1) >> 1;
            if (d[g].getKey() > f.getKey()) ((d[c] = d[g]), (c = g));
            else break;
        }
        d[c] = f;
    };
    n.remove = function () {
        var a = this.Cb,
            b = a.length,
            c = a[0];
        if (!(0 >= b)) {
            if (1 == b) Na(a);
            else {
                a[0] = a.pop();
                for (var a = 0, b = this.Cb, d = b.length, f = b[a]; a < d >> 1; ) {
                    var g = 2 * a + 1,
                        i = 2 * a + 2,
                        g = i < d && b[i].getKey() < b[g].getKey() ? i : g;
                    if (b[g].getKey() > f.getKey()) break;
                    b[a] = b[g];
                    a = g;
                }
                b[a] = f;
            }
            return c.getValue();
        }
    };
    n.It = function () {
        for (var a = this.Cb, b = [], c = a.length, d = 0; d < c; d++) b.push(a[d].getValue());
        return b;
    };
    n.Ht = function () {
        for (var a = this.Cb, b = [], c = a.length, d = 0; d < c; d++) b.push(a[d].getKey());
        return b;
    };
    n.ga = function () {
        return new ag(this);
    };
    n.te = function () {
        return this.Cb.length;
    };
    n.isEmpty = function () {
        return 0 == this.Cb.length;
    };
    n.clear = function () {
        Na(this.Cb);
    };
    var bg = function () {
        ag.call(this);
    };
    B(bg, ag);
    var cg = function (a) {
        this.Wc = a;
        this.zk = new bg();
        this.Un = {};
        this.$ = new Q();
    };
    cg.prototype.zh = l;
    cg.prototype.Qm = "l";
    cg.prototype.kc = function (a, b) {
        for (var c = Mf(this.Wc, b), d; 0 <= c; c--) if ((d = this.Wc.kc(c, a))) return d;
        return this.Wc.getLevel(0).kc(a);
    };
    var dg = function (a) {
        if (!a.zh)
            if (a.zk.isEmpty()) a.zh = l;
            else {
                a.zh = j;
                var b = a.zk.remove(),
                    c = new Image();
                c.src = a.Wc.getUrl(b.Zn, b.$n);
                c.onload = u(a.Lt, a, b.Zn, b.$n);
            }
    };
    cg.prototype.Lt = function (a, b) {
        this.zh = l;
        var c = this.Wc.getLevel(a);
        c.Ob[b] = j;
        dg(this);
        var d,
            f = c.fa * c.rows;
        d = b * f;
        c = Math.min(d + f, c.frames - 1);
        d = [d, c];
        this.$.c(this.Qm, d[0], d[1]);
    };
    fe();
    var eg = $b("yt.player.logger");
    eg.Bi(Ub);
    var hg = function (a, b, c, d, f) {
        this.ak = a;
        b = b.replace(/&quot;/g, '"');
        this.pi = unescape(b);
        a = fg[c].split("x");
        this.size = new M(parseInt(a[0], 10), parseInt(a[1], 10));
        this.Nc = gg[c];
        this.Hd = c;
        this.zc = d;
        this.Dt = !!f;
    };
    n = hg.prototype;
    n.ak = "";
    n.pi = "";
    n.Nc = "";
    n.Hd = "";
    n.size = k;
    n.toString = function () {
        return this.Nc + ": " + this.pi;
    };
    var ig = function () {
            return (
                navigator &&
                navigator.userAgent &&
                /android 2\.2/.test(navigator.userAgent.toLowerCase())
            );
        },
        jg = { 'video/mp4; codecs="avc1.42001E, mp4a.40.2"': j },
        kg = function () {
            if (ig()) return j;
            var a = document.createElement("video");
            return (
                a &&
                a.canPlayType &&
                (a.canPlayType('video/mp4; codecs="avc1.42001E, mp4a.40.2"') ||
                    a.canPlayType('video/webm; codecs="vp8.0, vorbis"'))
            );
        },
        fg = {
            light: "320x240",
            small: "320x240",
            medium: "640x360",
            large: "854x480",
            hd720: "1280x720",
            hd1080: "1920x1080",
            highres: "2048x1536"
        },
        gg = { medium: "360p", large: "480p", hd720: "720p", hd1080: "1080p", highres: "Original" },
        lg = function (a, b) {
            for (var c = [], d = 0; d < a.length; ++d) {
                var f = a[d];
                f.Dt == b && c.push(f);
            }
            return c;
        },
        mg = function (a, b) {
            for (var c = !!b, d = [], f = 0, g = a.length; f < g; ++f) {
                var i = a[f];
                d.push(new hg(i.url, i.type, i.quality, i.itag, i.stereo3d));
            }
            if (ig()) {
                c = [];
                f = 0;
                for (g = d.length; f < g; f++) jg[d[f].pi] && c.push(d[f]);
                d = c;
            } else if (((f = lg(d, c)), (d = !f.length && c ? lg(d, l) : f), kg())) {
                c = [];
                f = [];
                g = document.createElement("video");
                for (i = 0; i < d.length; i++) {
                    var m = g.canPlayType(d[i].pi);
                    eg.info("Entry in format map: " + d[i].toString() + " | CanPlay: " + m);
                    m &&
                        "no" != m &&
                        -1 == f.indexOf(d[i].Nc) &&
                        (f.push(d[i].Nc),
                        c.push(d[i]),
                        eg.info("Adding " + d[i].toString() + " to supported formats."));
                }
                d = c;
            } else d = [];
            return d;
        },
        ng = function (a, b) {
            var c = 0,
                d = 0;
            ca(a) ? eg.info("The video container size was null") : ((c = a.width), (d = a.height));
            var f = 16 / 9;
            c > Math.round(f * d) && (c = Math.round(f * d));
            for (
                var c = c * d, g = k, d = 0, f = b.length;
                d < f &&
                !((g = b[d]), g.size.width * g.size.height * ("medium" == g.Hd ? 0.26 : 0.85) < c);
                d++
            );
            return g;
        };
    var og = function (a) {
        this.ra = new Q();
        this.Ae = [];
        this.Il = [];
        this.Be = {};
        this.yj = {};
        this.Id(a);
    };
    B(og, Rf);
    var pg = { Pw: 1, Qw: 2, Rw: 3 },
        qg = /\/img\/watermark\/youtube_(hd_)?watermark(-vfl\S{6})?.png$/;
    n = og.prototype;
    n.Z = l;
    n.Gl = j;
    n.Jl = l;
    n.Kl = j;
    n.Hi = l;
    n.Gi = 1;
    n.Ul = l;
    n.Pl = l;
    n.Rl = 3;
    n.Ti = "";
    n.Vl = l;
    n.Cc = 0;
    n.lb = l;
    n.Dl = j;
    n.El = l;
    n.Ba = 0;
    n.wd = 0;
    n.Fl = l;
    n.Fd = l;
    n.fg = l;
    n.R = 0;
    n.Ag = l;
    n.Kc = l;
    n.Yi = 1;
    n.Id = function (a) {
        var b = a || {};
        this.Jl = "1" == b.iv_allow_external_links;
        this.Kl = "0" != b.iv_new_window;
        this.Hi = "1" == b.infringe || "1" == b.muted;
        this.author = b.author;
        this.Pl = "1" == b.cc_asr;
        this.Ti = b.ttsurl;
        this.gg = b.csi_page_type;
        this.Dg = b.sw;
        this.yl = b.t;
        this.Dl = "1" != b.no_get_video_log;
        this.El = "1" == b.tmi;
        this.Dp = "1" == b.iid;
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
        this.Ag = "1" == b.threed_converted;
        this.Cm = b.iurl;
        this.Fd = "1" == b.sendtmp;
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
        if (b.ad3_module || b.ad_module)
            "1" == b.allow_html5_ads
                ? ((this.Z = j), "1" == b.ad_preroll && this.Il.push("ad"))
                : "1" != b.supported_without_ads && (this.Vl = j);
        b.allow_embed && (this.Gl = "1" == b.allow_embed);
        b.cc_load_policy && (this.Rl = tg(b.cc_load_policy, 2));
        b.idpj && (this.Cc = ya(b.idpj));
        b.iv_load_policy && (this.hm = tg(b.iv_load_policy, this.hm));
        b.url_encoded_fmt_stream_map && (this.Ae = ug(b.url_encoded_fmt_stream_map));
        b.keywords && (this.yj = vg(b.keywords));
        b.length_seconds && (this.Ba = ya(b.length_seconds));
        b.ldpj && (this.wd = ya(b.ldpj));
        b.loudness &&
            ((this.zj = b.loudness),
            (this.Gi = -15 < this.zj && 0 > this.zj ? Math.pow(10, (-18 - this.zj) / 20) : 1));
        b.pyv_billable_url && Qf(b.pyv_billable_url, Pf) && (this.Fi = b.pyv_billable_url);
        b.pyv_conv_url && Qf(b.pyv_conv_url, Pf) && (this.am = b.pyv_conv_url);
        b.rvs && (this.tq = ug(b.rvs));
        b.storyboard_spec && ((this.jj = new Lf(b.storyboard_spec)), (this.dm = new cg(this.jj)));
        b.threed_module && !b.threed_converted && ((this.Pe = b.threed_module), (this.Cg = 6));
        if ("1" == b.track_embed || b.tk) this.Fl = j;
        b.watch_ajax_token && (nf.watch_actions_ajax = b.watch_ajax_token);
        this.gj = {};
        D(
            "baseUrl,vid,uid,focEnabled,rmktEnabled,playerStyle,eventLabel,convViewUrl".split(","),
            function (a) {
                this.gj[a] = b[a];
            },
            this
        );
        this.gm = j;
        this.Be = b;
    };
    var wg = function (a) {
        var b = "",
            c = {};
        a.format &&
            ((b = a.format.ak),
            a.Ac && a.ig && ((c.ptk = a.Ac), (c.oid = a.Al), (c.ptchn = a.ig), (c.pltype = a.Bl)));
        return U(b, c);
    };
    og.prototype.sg = function () {
        var a = {};
        this.format && (a.fmt = this.format.zc);
        this.Pe && (a.threed = this.Cg);
        a.plid = this.pa;
        a.list = this.Ib;
        this.m && (a.videoId = this.m);
        this.Hi && (a.infringe = 1);
        this.lb && (a.splay = 1);
        this.Gb && (a.hbid = this.Gb);
        return a;
    };
    var xg = function (a, b) {
            return !t(a.yj[b]) ? k : a.yj[b];
        },
        yg = function (a, b) {
            kf(b, { format: "RAW", method: "GET", lf: a, Rb: a.Yt });
        };
    og.prototype.Yt = function (a) {
        a = af(a.responseText);
        "fail" == a.status ? this.c("onStatusFail", a) : (this.Id(a), this.c("videoinfo", a));
    };
    var tg = function (a, b) {
            var c = parseInt(a, 10),
                d;
            a: {
                for (d in pg)
                    if (pg[d] == c) {
                        d = j;
                        break a;
                    }
                d = l;
            }
            return d ? c : b;
        },
        rg = function (a, b) {
            b = Number(b);
            return isNaN(b) ? a.R || 0 : b;
        },
        ug = function (a) {
            a = a.split(",");
            return (a = a.map(function (a) {
                return af(a);
            }));
        },
        vg = function (a) {
            var a = Ze(a, ","),
                b = {},
                c;
            for (c in a) b[c] = a[c] ? a[c] : j;
            return b;
        },
        sg = function (a, b) {
            if (b) {
                var c = b.split(",");
                2 <= c.length && ((a.Bj = c[1]), (a.Fn = c[0]));
            }
        },
        zg = function (a, b) {
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
        this.ao = "1" == a.mob;
        a.video_id && (this.na[this.ba] = new og(a));
        a.api &&
            ("string" == typeof a.api && 16 == a.api.length
                ? (a.list = "PL" + a.api)
                : (a.playlist = a.api));
        if (a.list)
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
                    ((this.Xd = new Ag(a.list.substr(0, 2), a.list.substr(2))),
                        this.Ya ||
                            Eg(this, "/list_ajax?style=json&action_get_list=1", { list: this.Xd }));
            }
        else if (a.playlist) {
            var b = a.playlist.toString().split(",");
            0 < this.ba && (this.na = []);
            D(
                b,
                function (a) {
                    a && this.na.push(new og({ video_id: a }));
                },
                this
            );
            this.yk = this.na.length;
            this.Ob = j;
        }
        this.setShuffle(!!a.shuffle);
        a.suggestedQuality && (this.Rm = a.suggestedQuality);
    };
    n = Fg.prototype;
    n.loop = l;
    n.R = 0;
    n.ap = l;
    n.ba = 0;
    n.yk = 0;
    n.ao = l;
    n.Ob = l;
    n.Ya = l;
    n.Tb = function () {
        if (++this.ba >= this.na.length)
            if (this.loop) this.ba = 0;
            else return k;
        Gg(this, this.ba);
        return Hg(this, this.ba);
    };
    var Ig = function (a) {
            if (0 > --a.ba)
                if (a.loop) a.ba = a.na.length - 1;
                else return k;
            Gg(a, a.ba);
            return Hg(a, a.ba);
        },
        Hg = function (a, b) {
            var c = b != h ? b : a.ba;
            return c in a.na ? a.na[a.Vb[c]] : k;
        };
    Fg.prototype.setShuffle = function (a) {
        this.ap = a;
        this.Vb = [];
        for (a = 0; a < this.na.length; a++) this.Vb.push(a);
        if (this.ap)
            for (a = 1; a < this.Vb.length; a++) {
                var b = Math.round(Math.random() * (this.Vb.length - 1));
                if (0 != b && b != a) {
                    var c = this.Vb[a];
                    this.Vb[a] = this.Vb[b];
                    this.Vb[b] = c;
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
            a.Ya ||
                ((a.Xd = new Ag("UU", "PLAYER_" + b)),
                Eg(a, "/list_ajax?style=json&action_get_user_uploads_by_user=1", { username: b }));
        },
        Cg = function (a, b) {
            a.Ya ||
                ((a.Xd = new Ag("FL", "PLAYER_" + b)),
                Eg(a, "/list_ajax?style=json&action_get_favorited_by_user=1", { username: b }));
        },
        Dg = function (a, b) {
            if (!a.Ya) {
                a.Xd = new Ag("SR", b);
                var c = { search_query: b };
                a.ao && (c.mob = "1");
                Eg(a, "/search_ajax?style=json&embeddable=1", c);
            }
        },
        Eg = function (a, b, c) {
            kf(U(b, c), {
                format: "JSON",
                Rb: function (a, b) {
                    b.video &&
                        b.video.length &&
                        ((this.na = []),
                        D(
                            b.video,
                            function (a) {
                                a && ((a.video_id = a.encrypted_id), this.na.push(new og(a)));
                            },
                            this
                        ),
                        (this.yk = this.na.length),
                        this.setShuffle(l),
                        (this.Ya = l),
                        (this.Ob = j),
                        this.Xj && this.Xj());
                },
                lf: a
            });
        };
    var Jg = function () {};
    var Kg = function () {};
    B(Kg, Jg);
    Kg.prototype.te = function () {
        var a = 0;
        $a(this.md(j), function (b) {
            Fa(b);
            a++;
        });
        return a;
    };
    Kg.prototype.clear = function () {
        var a = ab(this.md(j)),
            b = this;
        D(a, function (a) {
            b.remove(a);
        });
    };
    var Lg = function (a) {
        this.da = a;
    };
    B(Lg, Kg);
    var Mg = function (a) {
        try {
            return !!a.da && !!a.da.getItem;
        } catch (b) {}
        return l;
    };
    n = Lg.prototype;
    n.set = function (a, b) {
        try {
            this.da.setItem(a, b);
        } catch (c) {
            e("Storage mechanism: Quota exceeded");
        }
    };
    n.get = function (a) {
        a = this.da.getItem(a);
        if (t(a) || ca(a)) return a;
        e("Storage mechanism: Invalid value was encountered");
    };
    n.remove = function (a) {
        this.da.removeItem(a);
    };
    n.te = function () {
        return this.da.length;
    };
    n.md = function (a) {
        var b = 0,
            c = new Ya(),
            d = this;
        c.next = function () {
            b >= d.te() && e(Xa);
            var c = Fa(d.da.key(b++));
            if (a) return c;
            c = d.da.getItem(c);
            if (t(c)) return c;
            e("Storage mechanism: Invalid value was encountered");
        };
        return c;
    };
    n.clear = function () {
        this.da.clear();
    };
    var Ng = function () {
        var a = k;
        try {
            a = window.localStorage || k;
        } catch (b) {}
        this.da = a;
    };
    B(Ng, Lg);
    var Og = function (a, b) {
        this.xe = a;
        this.Xb = b + "::";
    };
    B(Og, Kg);
    n = Og.prototype;
    n.xe = k;
    n.Xb = "";
    n.set = function (a, b) {
        this.xe.set(this.Xb + a, b);
    };
    n.get = function (a) {
        return this.xe.get(this.Xb + a);
    };
    n.remove = function (a) {
        this.xe.remove(this.Xb + a);
    };
    n.md = function (a) {
        var b = this.xe.md(j),
            c = new Ya(),
            d = this;
        c.next = function () {
            for (var c = b.next(); c.substr(0, d.Xb.length) != d.Xb; ) c = b.next();
            return a ? c.substr(d.Xb.length) : d.xe.get(c);
        };
        return c;
    };
    var Pg = function (a) {
        this.cg = a;
        this.np = new Oe();
    };
    n = Pg.prototype;
    n.cg = k;
    n.np = k;
    n.set = function (a, b) {
        b !== h ? this.cg.set(a, Qe(this.np, b)) : this.cg.remove(a);
    };
    n.get = function (a) {
        a = this.cg.get(a);
        if (!ca(a))
            try {
                return Me(a);
            } catch (b) {
                e("Storage: Invalid value was encountered");
            }
    };
    n.remove = function (a) {
        this.cg.remove(a);
    };
    var V = function (a) {
        this.pubsub = new Q();
        this.s = a;
        if (this.yo) {
            var a = "yt-html5-player-modules::" + this.yo,
                b = new Ng();
            if ((a = Mg(b) ? (a ? new Og(b, a) : b) : k)) this.da = new Pg(a);
        }
    };
    n = V.prototype;
    n.pubsub = k;
    n.W = "";
    n.le = "";
    n.loaded = l;
    n.addCueRange = function (a) {
        var b = Ra(arguments),
            c = u(this.rb, this),
            d = u(this.lc, this);
        b.forEach(function (a) {
            a.Mj = this.W;
            a.pubsub.e("onEnter", c);
            a.pubsub.e("onExit", d);
        }, this);
        this.pubsub.c("command_add_cuerange", b);
    };
    n.removeCueRange = function (a) {
        this.pubsub.c("command_remove_cuerange", Ra(arguments));
    };
    n.Wd = function () {
        this.pubsub.c("command_remove_cuerange_all", this.W);
    };
    var Qg = function (a) {
        a.pubsub.c("command_preroll_ready", a.W);
    };
    V.prototype.appendToVideoContent = function (a) {
        I(a, this.W);
        this.s.appendToVideoContent(a);
    };
    V.prototype.appendAboveVideoControls = function (a) {
        I(a, this.W);
        this.s.appendAboveVideoControls(a);
    };
    var Rg = function (a) {
            a.pubsub.c("command_show_dialog_area");
        },
        Sg = function (a) {
            a.pubsub.c("command_hide_all_dialogs");
        };
    n = V.prototype;
    n.create = function () {
        I(this.s.getRootNode(), this.W + "-created");
    };
    n.destroy = function () {
        J(this.s.getRootNode(), this.W + "-created");
    };
    n.load = function () {
        I(this.s.getRootNode(), this.W + "-loaded");
    };
    n.unload = function () {
        J(this.s.getRootNode(), this.W + "-loaded");
    };
    n.rb = function () {};
    n.lc = function () {};
    n.kh = function () {};
    n.log = function (a) {
        this.pubsub.c("command_log", this.le, a);
    };
    var Tg = function (a, b, c) {
            var d = {},
                f;
            for (f in b) d[a.W + "_" + f] = b[f];
            var b = {},
                g;
            for (g in c) b[a.W + "_" + g] = c[g];
            a.pubsub.c("command_log_timing", d, b);
        },
        Ug = function (a, b) {
            if (!a.da) return k;
            var c;
            try {
                c = a.da.get(b);
            } catch (d) {
                a.da && a.da.remove(b);
            }
            return c;
        },
        Vg = function (a, b, c) {
            if (a.da)
                try {
                    a.da.set(b, c);
                } catch (d) {}
        },
        Wg = function (a) {
            a.pubsub.c("command_enable_controls", ["seek"]);
        },
        Xg = function (a) {
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
        return l;
    };
    var Zg = function () {},
        $g = new Zg(),
        ah = function () {
            var a = document.createElement("video");
            w(a, $g);
            S(a, "loadeddata", u(a.mu, a));
            return a;
        };
    n = Zg.prototype;
    n.hasSrc = function () {
        return !!this.getSrc();
    };
    n.getSrc = function () {
        return this.currentSrc;
    };
    n.activate = function (a) {
        a = a || "";
        (this.src && "" == a) || (a && (this.src = a), this.load());
    };
    n.seekTo = function (a) {
        0 != this.readyState && (this.currentTime = a);
    };
    n.getType = function () {
        return this.type;
    };
    n.getDuration = function () {
        return this.duration || 0;
    };
    n.getCurrentTime = function () {
        return this.currentTime;
    };
    n.isPaused = function () {
        return this.paused || this.ended;
    };
    n.togglePlayPause = function () {
        this.isPaused() ? this.playVideo() : this.pauseVideo();
    };
    n.playVideo = function () {
        this.ended && (this.currentTime = 0);
        if (!this.currentSrc || !this.hasAttribute("src"))
            (this.setAttribute("src", this.ul || ""), (this.ul = k), this.load());
        this.play();
    };
    n.pauseVideo = function () {
        this.pause();
    };
    n.stopVideo = function () {
        this.currentSrc &&
            ((this.ul = this.currentSrc), Bc(this), this.removeAttribute("src"), this.load());
    };
    n.setVolume = function (a, b) {
        this.volume = a / 100;
        this.muted = b;
    };
    n.getVolume = function () {
        return 100 * this.volume;
    };
    n.isMuted = function () {
        return this.muted;
    };
    n.mute = function () {
        this.muted = j;
    };
    n.unMute = function () {
        this.muted = l;
    };
    n.setPlaybackRate = function (a) {
        this.playbackRate = this.defaultPlaybackRate = a;
    };
    n.getBufferedTimeRangeIndex = function () {
        for (var a = this.buffered, b = this.getCurrentTime(), c = 0; c < a.length; c++)
            if (a.start(c) <= b && b <= a.end(c)) return c;
        return 0;
    };
    n.inUnbufferedArea = function () {
        var a = this.buffered;
        if (!a || !a.length) return j;
        var b = this.getBufferedTimeRangeIndex();
        if (0 < b) return l;
        var c = this.getCurrentTime();
        return a.start(b) > c || a.end(b) < c;
    };
    n.mu = function () {
        this.hasAttribute("controls") && this.setAttribute("controls", "true");
    };
    var bh = { detailpage: { xg: j } };
    bh.embedded = { wg: se("fullScreenEnabled", document), Cj: j };
    var ch = function (a) {
        this.Mb = [];
        this.Id(a);
    };
    n = ch.prototype;
    n.vg = j;
    n.wg = j;
    n.Vi = l;
    n.autoplay = l;
    n.Db = "/";
    n.Vj = 1;
    n.Li = l;
    n.Je = l;
    n.Ed = l;
    n.loop = l;
    n.lg = l;
    n.Sg = "";
    n.nj = l;
    n.Ge = l;
    n.Ua = j;
    n.hg = j;
    n.Lj = j;
    n.xg = l;
    n.Cj = l;
    n.Wi = l;
    n.Wj = l;
    n.Zb = l;
    n.Fb = l;
    n.Lb = k;
    n.Gc = k;
    n.Id = function (a) {
        this.eventLabel = a.el || "detailpage";
        var b = bh[this.eventLabel];
        b && w(this, b);
        this.vg = "0" != a.add_player_event_listeners;
        b = W(this.wg, a.fs);
        this.wg = "detailpage" == this.eventLabel ? b : b && De();
        this.Vi = W(this.Vi, "3" == a.autohide);
        this.autoplay = W(this.autoplay, a.autoplay);
        this.Xe = dh(this.Xe, a.content_v);
        this.Vj = a.controls == h ? this.Vj : a.controls;
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
        this.Ua = 0 != this.Vj;
        if ((b = a.BASE_YT_URL))
            Qf(b, Of)
                ? (this.Db = b)
                : R(Tb, "yt.player.EnvironmentData", "BASE_YT_URL untrusted: " + b, h);
        eh(this, a.fexp);
        fh(this, a);
        if ("detailpage" != this.eventLabel && (a.list || a.api)) this.o = new Fg(a);
        this.Tl = a;
    };
    var fh = function (a, b) {
            a.Ge = W(a.Ge, b.logwatch);
            a.jf = b.user_age == h ? a.jf : b.user_age;
            a.kf = dh(a.kf, b.user_gender);
        },
        W = function (a, b) {
            return b == h ? a : "1" == b ? j : l;
        },
        dh = function (a, b) {
            return b == h ? a : b;
        },
        eh = function (a, b) {
            b && ((a.Mb = b.split(",")), a.Mb.forEach(function () {}));
        },
        gh = function (a) {
            return !(!a.o || !(a.o.loop || a.o.ba + 1 < a.o.na.length));
        },
        hh = function (a, b) {
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
            b.Wl && (c.ypc_preview = "1");
            return U(a.Db + "get_video_info", c);
        },
        ih = function (a) {
            var b = { contact_type: "playbackissue", html5: 1, plid: a.pa, v: a.m };
            a.format && (b.fmt = a.format.zc);
            return U("//www.google.com/support/youtube/bin/request.py", b);
        };
    ch.prototype.td = function () {
        var a = this.z;
        return !a
            ? (R(
                  Tb,
                  "yt.player.EnvironmentData",
                  "getPlayerSize called before videoPlayerElement_ was set.",
                  h
              ),
              new M(Number.NaN, Number.NaN))
            : new M(a.clientWidth, a.clientHeight);
    };
    var jh = function (a) {
        return !a.f
            ? (R(
                  Tb,
                  "yt.player.EnvironmentData",
                  "getVideoElementSize called before videoElement_ was set.",
                  h
              ),
              new M(Number.NaN, Number.NaN))
            : new M(a.f.clientWidth, a.f.clientHeight);
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
        },
        lh = {
            "-1": "",
            0: "ended-mode",
            1: "playing-mode",
            2: "paused-mode",
            3: "buffering-mode",
            5: "cued-mode"
        };
    var mh = function (a) {
        var b = parseInt(a, 10),
            a = parseInt(b / 3600, 10),
            c = parseInt((b % 3600) / 60, 10),
            b = parseInt(b % 60, 10),
            d = "";
        0 < a && ((d += a.toString() + ":"), 10 > c && (d += "0"));
        d += c.toString() + ":";
        10 > b && (d += "0");
        return (d += b.toString());
    };
    var nh = function () {
        this.Gg = new Ge(this);
        this.se = [];
        this.ue = [];
    };
    aa(nh);
    var oh = q("yt.player.utils.VideoTagPool.instance_") || nh.getInstance();
    A("yt.player.utils.VideoTagPool.instance_", oh);
    nh.prototype.k = function (a, b) {
        b || (b = Tb);
        eg.log(b, a);
    };
    nh.prototype.ou = function (a) {
        if (!(this.se.length >= a))
            for (var a = a - this.se.length, b = 0; b < a; b++) this.se.push(ph(this));
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
        var a = a.target,
            b = a.volume,
            c = a.muted;
        this.ue.forEach(function (a) {
            a.volume = b;
            a.muted = c;
        }, this);
    };
    nh.prototype.getTag = function () {
        if (this.se.length) return this.se.pop();
        this.k("Ran out of video tags!");
        return ph(this);
    };
    nh.prototype.tu = function (a) {
        Ma(this.ue, a) && (a.stopVideo(), (a.ul = k), Oa(this.ue, a));
    };
    nh.prototype.pu = function (a) {
        return this.se.length >= (a || 1);
    };
    nh.prototype.fillPool = nh.prototype.ou;
    nh.prototype.getTag = nh.prototype.getTag;
    nh.prototype.releaseTag = nh.prototype.tu;
    nh.prototype.hasTags = nh.prototype.pu;
    var rh = function (a, b, c, d, f, g) {
            var i,
                m = c.offsetParent;
            if (m) {
                var p = "HTML" == m.tagName || "BODY" == m.tagName;
                if (!p || "static" != Xc(m, "position"))
                    ((i = bd(m)),
                        p ||
                            ((p =
                                (p = cd(m)) && ub
                                    ? -m.scrollLeft
                                    : p && (!E || !G("8"))
                                      ? m.scrollWidth - m.clientWidth - m.scrollLeft
                                      : m.scrollLeft),
                            (i = ic(i, new L(p, m.scrollTop)))));
            }
            m = kd(a);
            if ((p = dd(a))) {
                var s = new Qc(p.left, p.top, p.right - p.left, p.bottom - p.top),
                    p = Math.max(m.left, s.left),
                    y = Math.min(m.left + m.width, s.left + s.width);
                if (p <= y) {
                    var v = Math.max(m.top, s.top),
                        s = Math.min(m.top + m.height, s.top + s.height);
                    v <= s && ((m.left = p), (m.top = v), (m.width = y - p), (m.height = s - v));
                }
            }
            p = oc(a);
            v = oc(c);
            if (p.Q != v.Q) {
                var y = p.Q.body,
                    v = v.Q.parentWindow || v.Q.defaultView,
                    s = new L(0, 0),
                    z = nc(y) ? nc(y).parentWindow || nc(y).defaultView : window,
                    fa = y;
                do {
                    var wj = z == v ? bd(fa) : ed(fa);
                    s.x += wj.x;
                    s.y += wj.y;
                } while (z && z != v && (fa = z.frameElement) && (z = z.parent));
                y = ic(s, bd(y));
                E && !Mc(p) && (y = ic(y, Nc(p)));
                m.left += y.x;
                m.top += y.y;
            }
            a = (b & 4 && cd(a) ? b ^ 2 : b) & -5;
            b = new L(a & 2 ? m.left + m.width : m.left, a & 1 ? m.top + m.height : m.top);
            i && (b = ic(b, i));
            f && ((b.x += (a & 2 ? -1 : 1) * f.x), (b.y += (a & 1 ? -1 : 1) * f.y));
            qh(b, c, d, g, h, h, h);
        },
        qh = function (a, b, c, d, f, g, i) {
            var a = a.ga(),
                m = (c & 4 && cd(b) ? c ^ 2 : c) & -5,
                c = jd(b),
                i = i ? i.ga() : c.ga();
            if (d || 0 != m)
                (m & 2 ? (a.x -= i.width + (d ? d.right : 0)) : d && (a.x += d.left),
                    m & 1 ? (a.y -= i.height + (d ? d.bottom : 0)) : d && (a.y += d.top));
            if (g) {
                if (f) {
                    d = a;
                    m = 0;
                    if (65 == (g & 65) && (d.x < f.left || d.x >= f.right)) g &= -2;
                    if (132 == (g & 132) && (d.y < f.top || d.y >= f.bottom)) g &= -5;
                    d.x < f.left && g & 1 && ((d.x = f.left), (m |= 1));
                    d.x < f.left &&
                        d.x + i.width > f.right &&
                        g & 16 &&
                        ((i.width = Math.max(i.width - (d.x + i.width - f.right), 0)), (m |= 4));
                    d.x + i.width > f.right &&
                        g & 1 &&
                        ((d.x = Math.max(f.right - i.width, f.left)), (m |= 1));
                    g & 2 && (m |= (d.x < f.left ? 16 : 0) | (d.x + i.width > f.right ? 32 : 0));
                    d.y < f.top && g & 4 && ((d.y = f.top), (m |= 2));
                    d.y >= f.top &&
                        d.y + i.height > f.bottom &&
                        g & 32 &&
                        ((i.height = Math.max(i.height - (d.y + i.height - f.bottom), 0)),
                        (m |= 8));
                    d.y + i.height > f.bottom &&
                        g & 4 &&
                        ((d.y = Math.max(f.bottom - i.height, f.top)), (m |= 2));
                    g & 8 && (m |= (d.y < f.top ? 64 : 0) | (d.y + i.height > f.bottom ? 128 : 0));
                    f = m;
                } else f = 256;
                if (f & 496) return;
            }
            Zc(b, a);
            jc(c, i) ||
                ((f = Mc(oc(nc(b)))),
                E && (!f || !G("8"))
                    ? ((a = b.style),
                      f
                          ? ((f = pd(b)),
                            (b = sd(b)),
                            (a.pixelWidth = i.width - b.left - f.left - f.right - b.right),
                            (a.pixelHeight = i.height - b.top - f.top - f.bottom - b.bottom))
                          : ((a.pixelWidth = i.width), (a.pixelHeight = i.height)))
                    : ((b = b.style),
                      ub
                          ? (b.MozBoxSizing = "border-box")
                          : F
                            ? (b.WebkitBoxSizing = "border-box")
                            : (b.boxSizing = "border-box"),
                      (b.width = Math.max(i.width, 0) + "px"),
                      (b.height = Math.max(i.height, 0) + "px")));
        };
    var sh = function (a, b) {
            if ((a = N(a)) && a.style) (md(a, b), fc(a, "hid", !b));
        },
        th = function (a) {
            a = N(a);
            return !a ? l : !("none" == a.style.display || K(a, "hid"));
        },
        X = function (a) {
            D(arguments, function (a) {
                sh(a, j);
            });
        },
        uh = function (a) {
            D(arguments, function (a) {
                sh(a, l);
            });
        };
    var vh = (window.yt && window.yt.config_) || {};
    A("yt.config_", vh);
    A("yt.globals_", (window.yt && window.yt.globals_) || {});
    var wh = (window.yt && window.yt.msgs_) || {};
    A("yt.msgs_", wh);
    var xh = (window.yt && window.yt.timeouts_) || [];
    A("yt.timeouts_", xh);
    var yh = (window.yt && window.yt.intervals_) || [];
    A("yt.intervals_", yh);
    var zh = function (a) {
            return a in vh ? vh[a] : h;
        },
        Ah = function (a, b) {
            var c = window.setTimeout(a, b);
            xh.push(c);
            return c;
        },
        Bh = function (a, b) {
            var c = window.setInterval(a, b);
            yh.push(c);
            return c;
        },
        Ch = function (a) {
            window.clearInterval(a);
        },
        Dh = function (a) {
            var b = {};
            if ((a = a in wh ? wh[a] : h))
                for (var c in b)
                    a = a.replace(RegExp("\\$" + c, "gi"), function () {
                        return b[c];
                    });
            return a;
        };
    eval("/*@cc_on!@*/false");
    var Eh = {},
        Fh = "ontouchstart" in document,
        Gh = function (a, b) {
            var c = Eh[a].maxNumParents[b],
                d;
            0 < c ? (d = c) : -1 != a.indexOf("mouse") && (d = 2);
            return d;
        },
        Hh = function (a, b, c) {
            return (
                Kc(
                    b,
                    function (b) {
                        return K(b, a);
                    },
                    j,
                    c
                ) || k
            );
        },
        T = function (a) {
            if ("HTML" != a.target.tagName && a.type in Eh) {
                var b = Eh[a.type],
                    c;
                for (c in b.Oa) {
                    var d = Gh(a.type, c),
                        f = Hh(c, a.target, d);
                    if (f) {
                        var g = j;
                        b.checkRelatedTarget[c] &&
                            a.relatedTarget &&
                            Kc(
                                a.relatedTarget,
                                function (a) {
                                    return a == f;
                                },
                                j,
                                d
                            ) &&
                            (g = l);
                        g && b.c(c, f, a.type, a);
                    }
                }
            }
        };
    S(document, "blur", T, j);
    S(document, "change", T, j);
    S(document, "click", T);
    S(document, "focus", T, j);
    S(document, "mouseover", T);
    S(document, "mouseout", T);
    S(document, "keydown", T);
    S(document, "keyup", T);
    S(document, "keypress", T);
    S(document, "cut", T);
    S(document, "paste", T);
    Fh && (S(document, "touchstart", T), S(document, "touchend", T), S(document, "touchcancel", T));
    var Ih = (window.yt && window.yt.uix && window.yt.uix.widgets_) || {};
    A("yt.uix.widgets_", Ih);
    var Jh = function (a) {
        var a = a.getInstance(),
            b = Y(a);
        !(b in Ih) && a.pp() && (a.ag(), (Ih[b] = a));
    };
    var Kh = function () {
        this.Of = {};
    };
    n = Kh.prototype;
    n.ru = !!eval("/*@cc_on!@*/false");
    n.pp = function () {
        return j;
    };
    n.addBehavior = function (a, b, c, d, f) {
        var c = Y(this, c),
            g = u(b, this);
        a in Eh || ((Eh[a] = new Q()), (Eh[a].maxNumParents = {}), (Eh[a].checkRelatedTarget = {}));
        a = Eh[a];
        a.e(c, g);
        a.maxNumParents[c] = d;
        a.checkRelatedTarget[c] = f;
        this.Of[b] = g;
    };
    n.xi = function (a, b, c) {
        var d = this.getData(a, b);
        if (d && (d = q(d))) {
            var f = Ta(arguments, 2);
            Ua(f, 0, 0, a);
            d.apply(k, f);
        }
    };
    n.getData = function (a, b) {
        return je(a, b);
    };
    n.setData = function (a, b, c) {
        ie(a, b, c);
    };
    var Y = function (a, b) {
        return "yt-uix" + (a.ye ? "-" + a.ye : "") + (b ? "-" + b : "");
    };
    var Lh = function () {
        this.Of = {};
    };
    B(Lh, Kh);
    aa(Lh);
    n = Lh.prototype;
    n.ye = "tooltip";
    n.zi = 0;
    n.ag = function () {
        this.addBehavior("mouseover", this.ti);
        this.addBehavior("mouseout", this.Zf);
        this.addBehavior("click", this.Zf);
        this.addBehavior("touchstart", this.kl);
        this.addBehavior("touchend", this.ui);
        this.addBehavior("touchcancel", this.ui);
    };
    n.pp = function () {
        return !(this.ru && 0 == Gb.indexOf("6"));
    };
    n.ti = function (a) {
        if (!(this.zi && 1e3 > x() - this.zi)) {
            var b = parseInt(this.getData(a, "tooltip-hide-timer"), 10);
            b && (ke(a, "tooltip-hide-timer"), window.clearTimeout(b));
            var b = u(function () {
                    Mh(this, a);
                    ke(a, "tooltip-show-timer");
                }, this),
                c = parseInt(this.getData(a, "tooltip-show-delay"), 10) || 0,
                b = Ah(b, c);
            this.setData(a, "tooltip-show-timer", b.toString());
            a.title && (this.setData(a, "tooltip-text", a.title), (a.title = ""));
        }
    };
    n.Zf = function (a) {
        var b = parseInt(this.getData(a, "tooltip-show-timer"), 10);
        b && (window.clearTimeout(b), ke(a, "tooltip-show-timer"));
        b = u(function () {
            Nh(this, a);
            ke(a, "tooltip-hide-timer");
        }, this);
        b = Ah(b, 50);
        this.setData(a, "tooltip-hide-timer", b.toString());
        if ((b = this.getData(a, "tooltip-text"))) a.title = b;
    };
    n.kl = function (a, b, c) {
        this.zi = 0;
        this.ti(Hh(Y(this), c.changedTouches[0].target, Gh(b, Y(this))), b);
    };
    n.ui = function (a, b, c) {
        this.zi = x();
        this.Zf(Hh(Y(this), c.changedTouches[0].target, Gh(b, Y(this))), b);
    };
    var Oh = function (a, b, c) {
        a.setData(b, "tooltip-text", c);
        a = a.getData(b, "content-id");
        if ((a = N(a))) a.innerHTML = c;
    };
    Lh.prototype.Ub = function (a) {
        return this.getData(a, "tooltip-text") || a.title;
    };
    var Mh = function (a, b) {
        if (b) {
            var c = a.Ub(b);
            if (c) {
                var d = N(Ph(a, b));
                if (!d) {
                    d = document.createElement("div");
                    d.id = Ph(a, b);
                    d.className = Y(a, "tip");
                    var f = document.createElement("div");
                    f.className = Y(a, "tip-body");
                    var g = document.createElement("div");
                    g.className = Y(a, "tip-arrow");
                    var i = document.createElement("div");
                    i.className = Y(a, "tip-content");
                    var m = a.Wf(b),
                        p = Ph(a, b, "content");
                    i.id = p;
                    a.setData(b, "content-id", p);
                    f.appendChild(i);
                    m && d.appendChild(m);
                    d.appendChild(f);
                    d.appendChild(g);
                    (se("fullScreenElement", document) || document.body).appendChild(d);
                    Oh(a, b, c);
                    if ((c = parseInt(a.getData(b, "tooltip-max-width"), 10)) && f.offsetWidth > c)
                        ((f.style.width = c + "px"), I(i, Y(a, "normal-wrap")));
                    i = K(b, Y(a, "reverse"));
                    a.pl(b, d, f, m, g, i) || a.pl(b, d, f, m, g, !i);
                    var s = Y(a, "tip-visible");
                    Ah(function () {
                        I(d, s);
                    }, 0);
                }
            }
        }
    };
    Lh.prototype.pl = function (a, b, c, d, f, g) {
        fc(b, Y(this, "tip-reverse"), g);
        var i = 0;
        g && (i = 1);
        var f = jd(a),
            g = new L((f.width - 10) / 2, g ? f.height : 0),
            m = bd(a);
        qh(new L(m.x + g.x, m.y + g.y), b, i);
        var i = vc(window),
            m = ed(b),
            b = jd(c),
            p = b.width / 2;
        d &&
            ((d.style.left = "3px"),
            (d.style.height = b.height + "px"),
            (d.style.width = b.width + "px"));
        d = !!(i.height < m.y + f.height);
        f = !!(m.y < f.height);
        g = !!(m.x < p);
        i = !!(i.width < m.x + p);
        m = (b.width + 3) / -2 - -5;
        a = this.getData(a, "force-tooltip-direction");
        if ("left" == a || g) m = -5;
        else if ("right" == a || i) m = 20 - b.width - 3;
        c.style.left = m + "px";
        return !(d || f);
    };
    var Nh = function (a, b) {
            if (b) {
                var c = N(Ph(a, b));
                c && (Qh(c), P(c), ke(b, "content-id"));
            }
        },
        Ph = function (a, b, c) {
            var a = Y(a),
                d = b.__yt_uid_key;
            d || ((d = me()), (b.__yt_uid_key = d));
            b = a + d;
            c && (b += "-" + c);
            return b;
        };
    Lh.prototype.Wf = function (a) {
        var b = k;
        ob &&
            K(a, Y(this, "masked")) &&
            ((b = N("yt-uix-tooltip-shared-mask"))
                ? (b.parentNode.removeChild(b), X(b))
                : ((b = document.createElement("iframe")),
                  (b.src = 'javascript:""'),
                  (b.id = "yt-uix-tooltip-shared-mask"),
                  (b.className = Y(this, "tip-mask"))));
        return b;
    };
    var Qh = function (a) {
        var b = N("yt-uix-tooltip-shared-mask"),
            c =
                b &&
                Kc(
                    b,
                    function (b) {
                        return b == a;
                    },
                    l,
                    2
                );
        b && c && (b.parentNode.removeChild(b), uh(b), document.body.appendChild(b));
    };
    var Rh = function (a, b) {
            J(a, "html5-async-progress", "html5-async-success", "html5-async-error");
            b && I(a, b);
            Nh(Lh.getInstance(), a);
        },
        Sh = function (a, b) {
            Rh(a, "html5-async-error");
            if (b) {
                var c = Lh.getInstance(),
                    d = c.Ub(a);
                Oh(c, a, b);
                Mh(c, a);
                c.setData(a, "tooltip-text", d);
            }
        };
    var Uh = function (a, b, c, d) {
            if ((this.$k = !!c)) this.jl = Math.max(800, this.jl);
            this.element = a;
            this.onclick = b;
            this.Io = d;
            Th ? (a.ontouchstart = u(this.Wt, this)) : (a.onmousedown = u(this.Vt, this));
            a.onclick = u(this.Jo, this);
        },
        Th = "ontouchstart" in document,
        Vh = [],
        Wh = l,
        Xh = function () {
            Th &&
                !Wh &&
                ((Wh = j),
                document.addEventListener(
                    "click",
                    function (a) {
                        for (var b = new L(a.clientX, a.clientY), c = 0, d; (d = Vh[c]); c++)
                            if (25 > hc(d, b)) {
                                a.stopPropagation();
                                a.preventDefault();
                                Vh.splice(c, 1);
                                break;
                            }
                    },
                    j
                ));
        },
        Yh = function (a) {
            Vh.push(a);
            window.setTimeout(function () {
                var b = Vh.indexOf(a);
                -1 != b && Vh.splice(b, 1);
            }, 2500);
        };
    n = Uh.prototype;
    n.bu = 12;
    n.So = 100;
    n.jl = 500;
    n.Wt = function (a) {
        if (!(1 < a.touches.length || a._stop)) {
            this.fi = a._stop = j;
            this.$k ||
                ((this.element.ontouchend = u(this.Jo, this)),
                document.body.addEventListener("touchend", Zh(this), l));
            document.body.addEventListener("touchmove", $h(this), l);
            document.body.addEventListener("touchcancel", Zh(this), l);
            ai(this);
            this.So ? (this.At = window.setTimeout(u(this.Tf, this, j), this.So)) : this.Tf(j);
            var b = a.touches[0];
            this.dl = new L(b.clientX, b.clientY);
            !this.$k && (!this.Io || this.Io(a)) && Yh(this.dl);
        }
    };
    n.Vt = function (a) {
        a.stopPropagation();
        this.fi = j;
        ai(this);
        this.Tf(j);
    };
    n.Jo = function (a) {
        ("touchend" == a.type && !this.fi) ||
            a._stop ||
            ((a._stop = j),
            this.Tf(j),
            window.setTimeout(
                u(function () {
                    this.vi();
                    this.onclick(a);
                }, this),
                0
            ));
    };
    n.gu = function (a) {
        1 < a.touches.length
            ? this.vi()
            : ((a = a.touches[0]),
              (a = new L(a.clientX, a.clientY)),
              this.dl && hc(this.dl, a) > this.bu && this.vi());
    };
    var $h = function (a) {
        a.tp || (a.tp = u(a.gu, a));
        return a.tp;
    };
    Uh.prototype.vi = function () {
        window.clearTimeout(this.At);
        window.clearTimeout(this.Ot);
        this.Tf(l);
        this.fi = l;
        document.body.removeEventListener("touchmove", $h(this), l);
        document.body.removeEventListener("touchend", Zh(this), l);
        document.body.removeEventListener("touchcancel", Zh(this), l);
    };
    var Zh = function (a) {
        a.qp || (a.qp = u(a.vi, a));
        return a.qp;
    };
    Uh.prototype.Tf = function (a) {
        this.un && fc(this.element, this.un, a);
    };
    var ai = function (a) {
        a.$t &&
            (a.Ot = window.setTimeout(
                u(function () {
                    this.fi = l;
                    this.$t();
                }, a),
                a.jl
            ));
    };
    var bi = function () {
        this.Of = {};
    };
    B(bi, Kh);
    aa(bi);
    n = bi.prototype;
    n.ye = "button";
    n.Pd = k;
    n.ag = function () {
        this.addBehavior("click", this.sl);
        this.addBehavior("keydown", this.cu);
        this.addBehavior("keypress", this.tl);
    };
    n.sl = function (a) {
        if (a && !a.disabled) {
            if (this.getData(a, "button-toggle")) {
                var b = Lc(a, Y(this, "group"));
                if (b && this.getData(b, "button-toggle-group")) {
                    var b = rc(Y(this), b),
                        c = Y(this, "toggled");
                    D(b, function (b) {
                        b != a ? J(b, c) : I(a, c);
                    });
                } else gc(a, Y(this, "toggled"));
            }
            ci(this, a) && (di(this, a), a.focus());
            this.xi(a, "button-action");
        }
    };
    n.cu = function (a, b, c) {
        if (!c.altKey && !c.ctrlKey && !c.shiftKey && (b = ci(this, a))) {
            var d = function (a) {
                var b = "";
                a.tagName && (b = a.tagName.toLowerCase());
                return "ul" == b || "table" == b;
            };
            if ((d = d(b) ? b : Gc(b, d))) {
                var d = d.tagName.toLowerCase(),
                    f;
                "ul" == d ? (f = this.iu) : "table" == d && (f = this.hu);
                f && ei(this, a, b, c, u(f, this));
            }
        }
    };
    var ei = function (a, b, c, d, f) {
        var g = th(c),
            i = 9 == d.keyCode;
        i || 32 == d.keyCode || 13 == d.keyCode
            ? (d = fi(a, c))
                ? ((b = d.firstElementChild != h ? d.firstElementChild : Dc(d.firstChild)),
                  "a" == b.tagName.toLowerCase() ? (window.location = b.href) : Be(b, "click"))
                : i && gi(a, b)
            : g
              ? 27 == d.keyCode
                  ? (fi(a, c), gi(a, b))
                  : f(b, c, d)
              : ((a = K(b, Y(a, "reverse")) ? 38 : 40),
                d.keyCode == a && (Be(b, "click"), d.preventDefault()));
    };
    bi.prototype.tl = function (a, b, c) {
        !c.altKey && !c.ctrlKey && !c.shiftKey && ((a = ci(this, a)), th(a) && c.preventDefault());
    };
    var fi = function (a, b) {
            var c = Y(a, "menu-item-highlight"),
                d = O(c, b);
            d && J(d, c);
            return d;
        },
        hi = function (a, b, c) {
            I(c, Y(a, "menu-item-highlight"));
            b.setAttribute("aria-activedescendant", c.getAttribute("id"));
        };
    bi.prototype.hu = function (a, b, c) {
        var d = fi(this, b),
            b = qe("table", b),
            f = qe("tr", b),
            f = qc("td", k, f).length,
            b = qc("td", k, b),
            d = ii(d, b, f, c);
        -1 != d && (hi(this, a, b[d]), c.preventDefault());
    };
    bi.prototype.iu = function (a, b, c) {
        if (40 == c.keyCode || 38 == c.keyCode) {
            var d = fi(this, b),
                b = qc("li", k, b),
                d = ii(d, b, 1, c);
            hi(this, a, b[d]);
            c.preventDefault();
        }
    };
    var ii = function (a, b, c, d) {
            var f = b.length,
                a = Ha(b, a);
            if (-1 == a)
                if (38 == d.keyCode) a = f - c;
                else {
                    if (37 == d.keyCode || 38 == d.keyCode || 40 == d.keyCode) a = 0;
                }
            else
                39 == d.keyCode
                    ? (a % c == c - 1 && (a -= c), (a += 1))
                    : 37 == d.keyCode
                      ? (0 == a % c && (a += c), (a -= 1))
                      : 38 == d.keyCode
                        ? (a < c && (a += f), (a -= c))
                        : 40 == d.keyCode && (a >= f - c && (a -= f), (a += c));
            return a;
        },
        di = function (a, b) {
            var c = ci(a, b),
                d = Lc(c.activeButtonNode || c.parentNode, Y(a));
            d && d != b ? (gi(a, d), Ah(u(a.wp, a, b), 1)) : th(c) ? gi(a, b) : a.wp(b);
        };
    bi.prototype.Wf = function (a) {
        if (!ob || !K(a, Y(this, "masked"))) return k;
        var b = a.iframeMask;
        b ||
            ((b = document.createElement("iframe")),
            (b.src = 'javascript:""'),
            (b.className = Y(this, "menu-mask")),
            (a.iframeMask = b));
        return b;
    };
    bi.prototype.wp = function (a) {
        if (a) {
            var b = ci(this, a);
            if (b) {
                a.setAttribute("aria-pressed", "true");
                a.setAttribute("aria-expanded", "true");
                b.originalParentNode = b.parentNode;
                b.activeButtonNode = a;
                b.parentNode.removeChild(b);
                this.getData(a, "button-has-sibling-menu")
                    ? a.parentNode.appendChild(b)
                    : document.body.appendChild(b);
                var c = Lc(a, Y(this, "group")),
                    d = !!this.getData(a, "button-menu-ignore-group");
                b.style.minWidth = (c && !d ? c.offsetWidth - 2 : a.offsetWidth - 2) + "px";
                (d = this.Wf(a)) && document.body.appendChild(d);
                var d = Lc(a, Y(this, "group")),
                    f = !!this.getData(a, "button-menu-ignore-group"),
                    d = d && !f ? d : a,
                    f = 5,
                    g = 4;
                K(a, Y(this, "reverse")) && ((f = 4), (g = 5));
                K(a, "flip") &&
                    (K(a, Y(this, "reverse")) ? ((f = 6), (g = 7)) : ((f = 7), (g = 6)));
                var i;
                if (this.getData(a, "button-has-sibling-menu")) {
                    var m = ad(d);
                    E && !G("8") && (m = k);
                    m && ((i = kd(m)), (i = new Pc(-i.top, i.left, i.top, -i.left)));
                }
                var m = new L(0, 1),
                    p = this.Wf(a);
                if (p) {
                    var s = jd(b);
                    p.style.width = s.width + "px";
                    p.style.height = s.height + "px";
                    rh(d, f, p, g, m, i);
                }
                rh(d, f, b, g, m, i);
                X(b);
                this.xi(a, "button-menu-action", j);
                I(a, Y(this, "active"));
                c && I(c, Y(this, "group-active"));
                c = u(this.Ut, this, a);
                b = S(document, "click", c);
                c = S(document, "contextmenu", c);
                this.setData(a, "button-listener", b);
                this.setData(a, "button-context-menu-listener", c);
                this.Pd = a;
            }
        }
    };
    var gi = function (a, b) {
        if (b) {
            var c = ci(a, b);
            if (c) {
                a.Pd = k;
                b.setAttribute("aria-pressed", "false");
                b.setAttribute("aria-expanded", "false");
                uh(c);
                a.xi(b, "button-menu-action", l);
                var d = a.Wf(b);
                Ah(function () {
                    d && d.parentNode && d.parentNode.removeChild(d);
                    c.originalParentNode &&
                        (c.parentNode.removeChild(c),
                        c.originalParentNode.appendChild(c),
                        (c.originalParentNode = k),
                        (c.activeButtonNode = k));
                }, 1);
            }
            var f = Lc(b, Y(a, "group"));
            J(b, Y(a, "active"));
            f && J(f, Y(a, "group-active"));
            if ((f = a.getData(b, "button-listener"))) (ze(f), ke(b, "button-listener"));
            if ((f = a.getData(b, "button-context-menu-listener")))
                (ze(f), ke(b, "button-context-menu-listener"));
        }
    };
    bi.prototype.getContent = function (a) {
        return O(Y(this, "content"), a);
    };
    bi.prototype.Ut = function (a, b) {
        var c;
        c = b || window.event;
        c = c.target || c.srcElement;
        3 == c.nodeType && (c = c.parentNode);
        var d = Lc(c, Y(this));
        if (d) {
            var d = ci(this, d),
                f = ci(this, a);
            if (d == f) return;
        }
        if (!Lc(c, Y(this, "menu")) || K(c, Y(this, "menu-item")) || K(c, Y(this, "menu-close")))
            if (
                (gi(this, a),
                (d = Lc(c, Y(this, "menu"))) && this.getData(a, "button-menu-indicate-selected"))
            ) {
                var f = O(Y(this, "content"), a),
                    g;
                lc && "innerText" in c
                    ? (g = c.innerText.replace(/(\r\n|\r|\n)/g, "\n"))
                    : ((g = []), Jc(c, g, j), (g = g.join("")));
                g = g.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
                g = g.replace(/\u200B/g, "");
                lc || (g = g.replace(/ +/g, " "));
                " " != g && (g = g.replace(/^\s*/, ""));
                Ec(f, g);
                f = Y(this, "menu-item-selected");
                (d = O(f, d)) && J(d, f);
                I(c.parentNode, f);
            }
    };
    var ci = function (a, b) {
        if (!b.widgetMenu) {
            var c = a.getData(b, "button-menu-id"),
                c = c && N(c),
                d = Y(a, "menu");
            c ? I(c, d) : (c = O(d, b));
            b.widgetMenu = c;
        }
        return b.widgetMenu;
    };
    var ji = function () {
            this.rr = j;
        },
        ki = function (a) {
            this.nr = a || new ji();
            this.$f = {};
            this.uh = new Ge(this);
            this.sh = new Ge(this);
        };
    n = ki.prototype;
    n.C = k;
    n.zf = k;
    n.Ei = k;
    n.Hl = k;
    n.yd = k;
    n.hf = k;
    n.qn = k;
    n.Jc = k;
    n.mn = k;
    n.Ql = 0;
    n.Fe = 0;
    n.Sl = k;
    n.Tg = k;
    n.uh = k;
    n.de = k;
    n.ic = k;
    n.Pj = k;
    n.tb = k;
    n.Qj = k;
    n.sh = k;
    n.zd = k;
    n.mf = k;
    n.dg = k;
    n.og = k;
    n.Ui = k;
    n.bk = k;
    n.vd = k;
    n.Se = k;
    n.wn = k;
    n.Dc = k;
    n.pubsub = k;
    n.Ki = l;
    n.Uh = k;
    n.ud = function (a) {
        this.C = a;
        this.pubsub = new Q();
        this.zf = O("html5-play-button", a);
        new Uh(this.zf, u(this.Ar, this)).un = "html5-active";
        this.Ei = O("current-time", a);
        this.Hl = O("duration-time", a);
        this.yd = O("html5-progress-bar", a);
        this.hf = O("html5-progress-list", this.yd);
        S(this.yd, "click", u(this.tm, this));
        this.Jc = O("html5-play-progress", this.hf);
        this.mn = O("html5-load-progress", this.hf);
        this.qn = O("html5-ad-progress-list", this.yd);
        this.Tg = O("html5-scrubber-button", a);
        we(this.Tg, "down", u(this.tr, this));
        this.Sl = O("html5-progress-screenreader", a);
        this.de = O("html5-volume-control", a);
        S(this.de, "keydown", u(this.Br, this));
        this.ic = O("html5-volume-button", this.de);
        S(this.ic, "click", u(this.vn, this));
        this.Pj = O("html5-volume-panel", this.de);
        this.tb = O("html5-volume-slider", this.de);
        we(this.tb, "down", u(this.xr, this));
        this.Qj = O("html5-volume-slider-foreground", this.de);
        this.zd = O("html5-speed-button", a);
        this.mf = O("yt-uix-button-content", this.zd);
        var b = O("html5-popup-menu", this.zd);
        ye(b, u(this.ur, this), "yt-uix-button-menu-item");
        this.bk = O("html5-threed-popup-menu", a);
        this.Ui = O("html5-small-player-button", a);
        S(this.Ui, "click", u(this.tn, this));
        this.og = O("html5-large-player-button", a);
        S(this.og, "click", u(this.tn, this));
        this.dg = O("html5-fullscreen-button", a);
        S(this.dg, "click", u(this.wr, this));
        this.vd = O("html5-quality-button", a);
        this.Se = O("html5-popup-menu", this.vd);
        ye(this.Se, u(this.sr, this), "yt-uix-button-menu-item");
        this.Dc = O("html5-watch-later-button", a);
        S(this.Dc, "click", u(this.yr, this));
        this.wn = O("html5-watch-on-youtube-button", a);
        S(this.wn, "click", u(this.zr, this));
        this.nr.rr || J(O("yt-uix-range-tooltip", h), "yt-uix-range-tooltip");
    };
    n.Kb = function (a) {
        return K(this.C, "disabled-control-" + a);
    };
    n.disable = function (a) {
        var b = "";
        a.forEach(function (a) {
            b += " disabled-control-" + a;
        }, this);
        this.C.className += b;
    };
    n.enable = function (a) {
        var b = this.C.className.split(" ");
        a.forEach(function (a) {
            Oa(b, "disabled-control-" + a);
        }, this);
        this.C.className = b.join(" ");
    };
    n.Hp = function (a, b) {
        this.Uh == a && this.k("Already redirect controls to this target");
        this.Ml();
        this.Uh = a;
        b.forEach(function (a) {
            I(this.C, "redirected-control-" + a);
        }, this);
    };
    n.Ml = function () {
        this.Uh = k;
        for (var a in Zf) J(this.C, "redirected-control-" + Zf[a]);
    };
    var li = function (a) {
            return !K(a.C, "redirected-control-play_pause") ? k : a.Uh;
        },
        mi = function (a, b) {
            var c = rc("yt-uix-button-menu-item", a.Se);
            D(
                c,
                function (a) {
                    a.style.display = "none";
                    for (var c = 0, g = b.length; c < g; c++)
                        je(a, "value") == b[c].Nc && (a.style.display = "list-item");
                },
                a
            );
        };
    ki.prototype.k = function (a) {
        eg.info(a);
    };
    ki.prototype.Br = function (a) {
        var b = a.keyCode;
        if (32 == b || 13 == b) (this.vn(), a.preventDefault());
    };
    ki.prototype.setVolume = function (a, b) {
        this.k("Setting volume to: " + a + (b ? " (muted)" : ""));
        ie(
            this.ic,
            "value",
            b || 0 == a
                ? "off"
                : 20 > a
                  ? "min"
                  : 40 > a
                    ? "quiet"
                    : 60 > a
                      ? "normal"
                      : 80 > a
                        ? "loud"
                        : "max"
        );
        ie(this.ic, "volume", a);
        var c = this.tb.clientWidth - 6,
            d = this.tb.style.backgroundPosition.split(" "),
            d = 1 < d.length ? d[1] : "0px";
        if (b)
            ((this.tb.style.backgroundPosition = "-" + c + "px " + d),
                (this.Qj.style.left = "0px"));
        else {
            var f;
            0 >= a
                ? (f = 0)
                : 100 <= a
                  ? (f = c)
                  : ((f = ((c - 0) * a) / 100), (f = 0 >= f ? 0 : f >= c ? c : 0 + Math.round(f)));
            this.Qj.style.left = f + "px";
            this.tb.style.backgroundPosition = "-" + (c - f) + "px " + d;
        }
        c = Math.round(a);
        d = c + "% " + Dh("HTML5_VOLUME_SETTING") + (b ? " " + Dh("HTML5_VOLUME_MUTED") : "");
        this.Pj.setAttribute("aria-valuenow", c);
        this.Pj.setAttribute("aria-valuetext", d);
        ni(this.ic, b);
        this.ic.setAttribute(
            "aria-label",
            (b ? Dh("HTML5_VOLUME_UNMUTE") : Dh("HTML5_VOLUME_MUTE")) +
                " " +
                Dh("HTML5_CONTROL_TOGGLE")
        );
    };
    ki.prototype.vn = function () {
        this.pubsub.c("mutetoggled");
    };
    var oi = function (a) {
        var b = Math.round(1e3 * a.Fe) / 10,
            c = Math.round(1e3 * a.Ql) / 10;
        b > c && (c = b);
        a.Jc.style.width = b + "%";
        a.mn.style.width = c + "%";
        a.Tg.style.left = b + "%";
    };
    n = ki.prototype;
    n.He = function (a) {
        a
            ? ec(this.zf, "html5-play-button", "html5-pause-button")
            : ec(this.zf, "html5-pause-button", "html5-play-button");
        ni(this.zf, a);
    };
    n.Ar = function () {
        this.pubsub.c("playpausetoggled");
    };
    n.tr = function (a) {
        a.th();
        this.k("Scrubber pointer down");
        this.Ki = j;
        this.pubsub.c("beginseeking");
        He(this.uh, "move", this.tm);
        He(this.uh, "up", this.Pr);
    };
    n.Pr = function () {
        this.k("Scrubber release");
        this.Ki = l;
        this.uh.Wa();
        this.pubsub.c("endseeking");
    };
    n.tm = function (a) {
        a.th();
        this.k("Seek or Scrubber click/move:" + a.target.className);
        var b = bd(this.hf),
            b = Oc((a.clientX - b.x) / (this.hf.clientWidth - 1 - this.Tg.clientWidth / 2), 0, 1);
        this.k("seekTo " + b);
        this.Fe = b;
        oi(this);
        this.pubsub.c("seekto", b);
        a.preventDefault();
    };
    n.xr = function (a) {
        this.k("volume pointerdown");
        this.pubsub.c("beginvolume");
        I(this.ic, "changing");
        var b = this.tb.clientWidth,
            a = fd(a, this.tb);
        this.k("relative pos: x: " + a.x + " and y: " + a.y);
        pi(this, 100 * (a.x / b));
        He(this.sh, "move", this.Ir);
        He(this.sh, "up", this.Jr);
    };
    n.Ir = function (a) {
        this.k("volume pointerover");
        var b = this.tb.clientWidth,
            c = fd(a, this.tb);
        this.k("relative pos: x: " + c.x + " and y: " + c.y);
        pi(this, 100 * (c.x / b));
        a.preventDefault();
    };
    var pi = function (a, b) {
        a.pubsub.c("volumechanged", { volume: Oc(b, 0, 100), muted: l });
    };
    n = ki.prototype;
    n.Jr = function () {
        this.k("volume pointerup");
        J(this.ic, "changing");
        this.sh.Wa();
        this.pubsub.c("endvolume");
    };
    n.tn = function (a) {
        this.pubsub.c("sizechangerequested", a.currentTarget == this.og);
    };
    n.sr = function (a) {
        this.pubsub.c("qualitychanged", je(a.currentTarget, "value"));
        gi(bi.getInstance(), this.vd);
    };
    n.wr = function () {
        this.pubsub.c("fullscreentoggled");
    };
    n.ur = function (a) {
        this.pubsub.c("speedchanged", je(a.currentTarget, "value"));
        -1 != a.target.innerHTML.indexOf("Normal")
            ? ((this.mf.innerHTML = Dh("HTML5_SPEED_NORMAL")),
              this.zd.setAttribute(
                  "aria-label",
                  this.mf.innerHTML + " " + Dh("HTML5_SPEED_SETTING")
              ))
            : ((this.mf.innerHTML = a.target.innerHTML),
              this.zd.setAttribute("aria-label", this.mf.innerHTML));
    };
    var qi = function (a, b) {
        var c = O("html5-threed-conversion-on", a.bk),
            d = O("html5-threed-conversion-off", a.bk);
        sh(c, !b);
        sh(d, b);
    };
    ki.prototype.yr = function () {
        K(this.Dc, "html5-async-progress") ||
            (Rh(this.Dc, "html5-async-progress"), this.pubsub.c("watchlater"));
    };
    ki.prototype.zr = function () {
        this.pubsub.c("watchonyoutube");
    };
    var ni = function (a, b) {
        var c = je(a, "default-title"),
            d = je(a, "alt-title"),
            f = je(a, "tooltip-title");
        c || ((c = f), ie(a, "default-title", c));
        c = b ? d : c;
        a.setAttribute("title", c);
        a.setAttribute("aria-label", c);
        ie(a, "tooltip-title", c);
        ie(a, "tooltip-text", c);
    };
    ki.prototype.La = function (a) {
        a = Oc(Math.round(100 * a), 0, 100);
        if (!this.$f[a]) {
            var b = document.createElement("div");
            b.style.left = a + "%";
            I(b, "html5-ad-progress", "html5-progress-section");
            this.qn.appendChild(b);
            this.$f[a] = b;
        }
    };
    ki.prototype.nf = function (a) {
        a = Oc(Math.round(100 * a), 0, 100);
        this.$f[a] && (P(this.$f[a]), delete this.$f[a]);
    };
    var ri = function (a) {
            return a ? -1 != a.toString().search(/(?:true|1)/i) : l;
        },
        si = function (a, b) {
            if (!a) return "";
            var c = "getErrorCode" in a ? a.getErrorCode() : k,
                d = "";
            if (!ca(c)) return (b.error_code = c);
            c = a.message;
            50 < c.length && (c = c.substring(0, 47) + "...");
            d = c;
            return (b.error_message = d);
        };
    var ti = [4, 2],
        ui = function (a) {
            var b = q("yt.www.watch.ads.handleMoveGutCompanion");
            b && b(1 == a ? j : l);
        },
        vi = function (a) {
            var b = q("showAfvCompanionAdDiv");
            b && b(1 == a);
        };
    var wi = function (a, b, c) {
        this.ta = b.name || k;
        this.qe = {};
        for (a = 0; a < c.length; a++) ((b = c[a]), (this.qe[b.getTag()] = b));
    };
    wi.prototype.getName = function () {
        return this.ta;
    };
    var xi = function (a) {
        a = cb(a.qe);
        Wa(a, function (a, c) {
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
        this.qe = fb(this.Vf.qe);
        this.Uf = this.Oo = k;
    };
    n = zi.prototype;
    n.Eo = function () {
        return this.Vf;
    };
    n.get = function (a, b) {
        return Ai(this, a.getTag(), b);
    };
    n.set = function (a, b) {
        var c = a.getTag();
        this.jb[c] = b;
        this.Uf && (this.Uf[c] = b);
    };
    n.add = function (a, b) {
        var c = a.getTag();
        this.jb[c] || (this.jb[c] = []);
        this.jb[c].push(b);
    };
    n.clear = function (a) {
        delete this.jb[a.getTag()];
    };
    n.ga = function () {
        for (var a = new this.constructor(), b = xi(a.Eo()), c = 0; c < b.length; c++) {
            var d = b[c];
            delete a.jb[d.getTag()];
            var f = d.getTag();
            if (f in this.jb && this.jb[f] !== h && this.jb[f] !== k)
                if (((f = 11 == d.Sn || 10 == d.Sn), d.Rn)) {
                    var g;
                    g = d.getTag();
                    g = Bi(this, this.qe[g]);
                    g == k || r(g);
                    g = g || [];
                    for (var i = 0; i < g.length; i++) a.add(d, f ? g[i].ga() : g[i]);
                } else ((g = this.get(d)), a.set(d, f ? g.ga() : g));
        }
        return a;
    };
    var Bi = function (a, b) {
            var c = b.getTag();
            if ((!c) in a.jb) return k;
            var d = a.jb[c];
            if (d == k) return k;
            return a.Oo ? (!(c in a.Uf) ? ((d = a.Oo.Au(a, b, d)), (a.Uf[c] = d)) : a.Uf[c]) : d;
        },
        Ai = function (a, b, c) {
            b = a.qe[b];
            a = Bi(a, b);
            if (b.Rn) return (r(a), a[c || 0]);
            r(a);
            return a;
        },
        Ci = function (a, b) {
            var c = [],
                d,
                f;
            for (f in b) b.hasOwnProperty(f) && (0 == f ? (d = b[0]) : c.push(new yi(a, f, b[f])));
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
        },
        Ei = function () {
            zi.apply(this);
        };
    B(Ei, zi);
    var Fi = function () {
        zi.apply(this);
    };
    B(Fi, zi);
    var Gi = function () {
        zi.apply(this);
    };
    B(Gi, zi);
    Gi.prototype.uo = function () {
        return Ai(this, 5);
    };
    Gi.prototype.Fk = function () {
        return Ai(this, 6);
    };
    var Hi = function () {
        zi.apply(this);
    };
    B(Hi, zi);
    var Ii = function () {
        zi.apply(this);
    };
    B(Ii, zi);
    Ci(Ei, {
        0: { name: "YtAdType", Ci: "video.YtAdType" },
        1: {
            name: "ad_namespace",
            required: j,
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
            required: j,
            u: 14,
            defaultValue: 0,
            type: { Qv: 0, Mw: 1, Lw: 2, Tw: 3, yx: 4, Nw: 5 }
        },
        3: {
            name: "ad_invideo",
            u: 14,
            defaultValue: 0,
            type: { Sv: 0, mw: 1, nw: 2, ow: 3, qw: 4, lw: 5, jw: 6 }
        },
        4: { name: "invideo_autoplay", u: 14, defaultValue: 0, type: { aw: 0, cx: 1 } },
        5: { name: "ad_instream", u: 14, defaultValue: 0, type: { Rv: 0, vx: 1 } },
        6: { name: "ad_instream_long", u: 8, type: Boolean }
    });
    Ci(Fi, {
        0: { name: "YtAdEvent", Ci: "video.YtAdEvent" },
        1: {
            name: "ad_event_type",
            required: j,
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
        2: { name: "wall_time", required: j, u: 2, type: Number },
        3: { name: "media_time", required: j, u: 2, type: Number },
        4: { name: "logentry_time_usec", required: j, u: 3, type: String },
        5: { name: "ad_error_type", u: 14, defaultValue: 0, type: Di }
    });
    Ci(Gi, {
        0: { name: "YtAdSlot", Ci: "video.YtAdSlot" },
        1: { name: "slot_time", required: j, u: 2, type: Number },
        2: { name: "ad_type", required: j, u: 11, type: Ei },
        3: { name: "ad_events", pe: j, u: 11, type: Fi },
        4: { name: "ad_video_duration", u: 2, type: Number },
        5: { name: "ad_id", u: 9, type: String },
        6: { name: "slot_index", u: 5, type: Number }
    });
    Ci(Hi, {
        0: { name: "YtVideoMetadata", Ci: "video.YtVideoMetadata" },
        1: { name: "content_owner_ids", pe: j, u: 9, type: String },
        2: { name: "video_duration_seconds", u: 2, type: Number },
        3: { name: "all_content_owner_ids", u: 9, type: String }
    });
    Ci(Ii, {
        0: { name: "YtWatchAdInfo", Ci: "video.YtWatchAdInfo" },
        1: { name: "video_id", required: j, u: 9, type: String },
        2: { name: "allowed_ads", pe: j, u: 11, type: Ei },
        3: { name: "ad_slots", pe: j, u: 11, type: Gi },
        4: { name: "ps", u: 9, type: String },
        5: { name: "el", u: 9, type: String },
        6: { name: "country", u: 9, type: String },
        7: { name: "feature", u: 9, type: String },
        8: { name: "blocked", u: 8, type: Boolean },
        9: { name: "plid", u: 9, type: String },
        10: { name: "video_metadata", u: 11, type: Hi },
        11: { name: "experiment_id", pe: j, u: 3, type: String },
        12: { name: "ad_flags", u: 4, type: String },
        13: { name: "all_experiment_ids", u: 9, type: String },
        14: { name: "no_ads_returned", u: 8, type: Boolean },
        15: { name: "ad_errors", pe: j, u: 14, defaultValue: 0, type: Di },
        16: { name: "ad_slot_with_event", u: 11, type: Gi }
    });
    var Ji = function (a) {
        this.V = a;
    };
    n = Ji.prototype;
    n.Aj = NaN;
    n.hc = function (a, b) {
        this.V.c("AD_LOGGING_EVENT", a, b);
    };
    n.sb = function (a, b) {
        var c = b || {};
        c.ad_error = a;
        this.hc(7, c);
    };
    n.ck = function (a) {
        var b = this.Xa(),
            c = bd(a.target);
        b.ck_xy = a.pageX - c.x + "x" + (a.pageY - c.y);
        a = jd(a.target);
        b.ck_wh = a.width + "x" + a.height;
        this.hc(15, b);
    };
    n.Xa = function () {
        var a = {},
            b = this.V.O,
            c = this.V.Ka;
        b && 0 < b.getDuration() && (a.ad_len = b.getDuration());
        c && c.m ? (a.ad_v = c.m) : b.hasSrc() && ((b = df(b.getSrc())), (a.ad_dom = b));
        a.at = this.V.getType();
        return a;
    };
    var Ki = function (a, b) {
        this.ra = new Q();
        this.i = a;
        this.T = b;
        this.i.e("control_toggle_play_pause", this.Bg, this);
        this.i.e("control_play", this.wm, this);
        this.i.e("control_pause", this.vm, this);
        this.L = new Ji(this);
    };
    B(Ki, Rf);
    Ki.prototype.ni = k;
    Ki.prototype.show = function () {
        this.L.Aj = x();
        var a = k,
            b = "";
        try {
            ((a = this.T.getSelectedCreative()), (b = a.getMediaUrl("video/x-flv")));
        } catch (c) {
            this.Pc(c);
            return;
        }
        a = b;
        if (!(b = ca(a)))
            ((b = df(a)),
                (b = ca(b) ? k : b.split(".").reverse()),
                (b = !(ca(b) ? 0 : "com" == b[0] && b[1].match(/^youtube(?:-nocookie)?$/))));
        b
            ? (a = k)
            : ((a = bf(a)), (a = a.v || a.video_id), (a = ca(a) ? k : new og({ video_id: a })));
        (this.Ka = a)
            ? (this.Ka.e("onStatusFail", this.kn, this),
              this.Ka.e("videoinfo", this.ln, this),
              yg(this.Ka, hh(this.i.getEnvironmentData(), this.Ka)))
            : Li(this);
    };
    var Mi = function (a) {
        a.Ka && (a.Ka.H("onStatusFail", a.kn, a), a.Ka.H("videoinfo", a.ln, a));
    };
    Ki.prototype.ln = function () {
        Mi(this);
        var a = k;
        this.Ka.Ae && ((a = mg(this.Ka.Ae)), (a = ng(this.i.getEnvironmentData().Lb, a)));
        a
            ? (this.T.getSelectedCreative().setMediaUrl(a.ak), Li(this))
            : this.Pc(
                  Error(this.Ka.m + " does not have any supported video formats for this browser")
              );
    };
    var Li = function (a) {
        ui(1);
        vi(1);
        var b = a.i.getRootNode(),
            c = O("video-ads", b);
        a.Yg = b;
        a.Ga = new Ge(a);
        a.O = oh.getTag();
        b = a.O;
        a.Ga.G(b, "play", a.Mr);
        a.Ga.G(b, "pause", a.Lr);
        a.Ga.G(b, "ended", a.Kr);
        a.Ga.G(b, "error", a.qj);
        a.Ga.G(b, "timeupdate", a.Nr);
        a.Qd = document.createElement("div");
        a.Ga.G(a.Qd, "click", a.Kj);
        a.Wg = O("video-ad-time-left", c);
        var b = O("html5-ad-progress-list", c),
            d = document.createElement("div");
        I(d, "html5-ad-progress", "html5-progress-section");
        b.appendChild(d);
        a.Jc = d;
        I(a.Qd, "video-click-tracking", "ad-video");
        I(a.O, "video-stream", "ad-video");
        c.appendChild(a.Qd);
        c.appendChild(a.O);
        I(a.Yg, "ad-showing", "ad-interrupting");
        try {
            (a.T.setClickTrackingElement(a.Qd), a.T.play(a.O));
        } catch (f) {
            a.Pc(f);
        }
    };
    n = Ki.prototype;
    n.Mr = function () {
        if (!this.or) {
            this.or = j;
            var a = this.L,
                b = a.Xa();
            if (isNaN(a.Aj))
                R(H, "InstreamAdDisplayStateLogger", "The video player start time was not set.", h);
            else {
                var c = x() - a.Aj;
                b.ad_stl = c;
            }
            a.hc(4, b);
        }
        Yg(this.i, j);
        this.c("adPlay", this);
    };
    n.Lr = function () {
        Yg(this.i, l);
    };
    n.Kr = function () {
        var a = this.L,
            b = a.Xa();
        ca(a.V.O)
            ? R(H, "InstreamAdDisplayStateLogger", "The video element was not set.", h)
            : (b.ad_fmt = a.V.O.getType());
        a.hc(5, b);
        this.c("adEnd", this);
    };
    n.qj = function () {
        this.Pc(
            Error(
                "Video ad playback failed. [" +
                    this.O.error.code +
                    ":" +
                    this.O.networkState +
                    ":" +
                    this.O.readyState
            )
        );
    };
    n.Pc = function (a) {
        Mi(this);
        this.c("adError", a);
    };
    n.kn = function () {
        this.Pc(Error("Request to get video data failed."));
    };
    n.Kj = function (a) {
        this.L.ck(a);
        this.c("select");
    };
    n.Nr = function () {
        var a = this.O.getCurrentTime();
        this.Wg.innerHTML = mh(this.O.duration - a);
        ca(this.ni) && (this.ni = this.O.getDuration());
        a = this.ni ? this.O.getCurrentTime() / this.ni : 0;
        this.Jc.style.width = Math.round(1e3 * a) / 10 + "%";
    };
    n.r = function () {
        this.i.H("control_toggle_play_pause", this.Bg, this);
        this.i.H("control_play", this.wm, this);
        this.i.H("control_pause", this.vm, this);
        this.T && (this.T.unload(), (this.T = k));
        P(this.O);
        this.O = k;
        P(this.Qd);
        this.Qd = k;
        this.Ga && this.Ga.Wa();
        Mi(this);
        this.Wg && ((this.Wg.innerHTML = ""), (this.Wg = k));
        this.Jc && (P(this.Jc), (this.Jc = k));
        this.Yg && (J(this.Yg, "ad-showing", "ad-interrupting"), (this.Yg = k));
        Ki.j.r.call(this);
    };
    n.getType = function () {
        return "1_2";
    };
    n.Bg = function () {
        this.O && this.O.togglePlayPause();
    };
    n.wm = function () {
        this.O && this.O.play();
    };
    n.vm = function () {
        this.O && this.O.pause();
    };
    var Ni = function (a, b) {
        Ki.call(this, a, b);
    };
    B(Ni, Ki);
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
        this.mk = x();
        var a = this.Xa();
        if (this.Ak) {
            var b = kd(this.i.getRootNode()),
                c = this.Ak.y - b.top,
                c = Math.round(this.Ak.x - b.left) + "x" + Math.round(c);
            a.ck_xy = c;
            a.ck_wh = b.width + "x" + b.height;
        }
        this.hc(100, a);
    };
    Oi.prototype.Xa = function () {
        var a = {};
        this.qm && this.mk && (a.ot = this.mk - this.qm);
        var b;
        b = this.i.isFullscreen() ? 2 : this.i.getEnvironmentData().Ed ? 1 : 0;
        a.ad_ps = b;
        a.at = this.V.getType();
        return a;
    };
    Oi.prototype.Nb = function (a) {
        R(Ub, this.Lc, a, h);
    };
    var Pi = function (a, b) {
        this.ra = new Q();
        this.i = a;
        this.T = b;
        this.L = new Oi(this, a);
        this.Gg = new Ge(this);
    };
    B(Pi, Rf);
    n = Pi.prototype;
    n.show = function () {
        this.i.e("onResize", this.mj, this);
        var a = this.i.getRootNode();
        I(a, "ad-showing");
        a = O("video-ads", a);
        this.$a = document.createElement("div");
        I(this.$a, "ad-overlay");
        a.appendChild(this.$a);
        this.Gg.G(this.$a, "mouseup", this.Aq);
        try {
            this.T.addEventListener(google.ima.AdEvent.Type.USER_CLOSE, this.im, l, this);
            this.T.addEventListener(google.ima.AdEvent.Type.CLICK, this.Fg, l, this);
            this.mj();
            this.T.setHorizontalAlignment(google.ima.AdSlotAlignment.HorizontalAlignment.CENTER);
            this.T.setVerticalAlignment(google.ima.AdSlotAlignment.VerticalAlignment.BOTTOM);
            this.T.play(this.$a);
            var b = this.L;
            b.Nb("Overlay ad shown.");
            b.qm = x();
            b.hc(3, b.Xa());
            this.c("adEnd", this);
        } catch (c) {
            this.qj(c);
        }
    };
    n.getType = function () {
        return "2_1";
    };
    n.r = function () {
        this.i.H("onResize", this.mj, this);
        var a = this.i.getRootNode();
        J(a, "ad-showing");
        this.T &&
            (this.T.removeEventListener(google.ima.AdEvent.Type.USER_CLOSE, this.im, l, this),
            this.T.removeEventListener(google.ima.AdEvent.Type.CLICK, this.Fg, l, this),
            this.T.unload(),
            (this.T = k));
        this.Gg.Wa();
        P(this.$a);
        this.$a = k;
        Pi.j.r.call(this);
    };
    n.im = function () {
        var a = this.L;
        a.Nb("Overlay ad hidden.");
        a.mk = x();
        a.hc(6, a.Xa());
    };
    n.Fg = function () {
        this.i.pauseVideo();
        this.L.ck();
    };
    n.Aq = function (a) {
        this.L.Ak = a.target == a.currentTarget ? k : new L(a.pageX, a.pageY);
    };
    n.qj = function (a) {
        this.c("adError", a);
    };
    n.mj = function () {
        var a;
        a = this.$a;
        var b = nc(a),
            c = E && a.currentStyle;
        c && Mc(oc(b)) && "auto" != c.width && "auto" != c.height && !c.boxSizing
            ? ((b = nd(a, c.width, "width", "pixelWidth")),
              (a = nd(a, c.height, "height", "pixelHeight")),
              (a = new M(b, a)))
            : ((c = new M(a.offsetWidth, a.offsetHeight)),
              (b = pd(a)),
              (a = sd(a)),
              (a = new M(
                  c.width - a.left - b.left - b.right - a.right,
                  c.height - a.top - b.top - b.bottom - a.bottom
              )));
        this.T.setAdSlotWidth(a.width);
        this.T.setAdSlotHeight(a.height);
    };
    var Qi = function (a, b) {
        this.ra = new Q();
        this.Z = a;
        this.vb = b;
    };
    B(Qi, Rf);
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
    B(Ri, Qi);
    Ri.prototype.Nn = function () {
        var a = q("afcAdCall");
        a && a();
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
        },
        Ui = function (a, b) {
            a.P.c("AD_TRACKING_EVENT", new Si(b));
        };
    Ti.prototype.Da = function () {
        var a = {};
        a.l_ns = this.P.uk();
        a.l_state = this.P.Ha;
        a.sst = this.P.ab;
        a.sidx = this.P.Fk();
        var b = this.P.Qb();
        b && (a.at = b.getType());
        b = this.P.uo();
        isNaN(b) || (a.ad_id = b);
        return a;
    };
    Ti.prototype.Nb = function (a, b) {
        R(Ub, this.Lc, a, b);
    };
    var Vi = {
            GOOGLE_IMA: "//www.google.com/jsapi",
            GOOGLE_MAPS_API: "//maps.google.com/maps/api/js?sensor=false",
            GOOGLE_LANGUAGE_API_VIRTUAL_KEYBOARD: "//www.google.com/jsapi?key=youtube-internal-vk",
            GOOGLE_LANGUAGE_API_INPUT_TOOLS: "//www.google.com/jsapi?key=youtube-internal-it"
        },
        Wi = {},
        Xi = {},
        Yi = {},
        $i = function () {
            A("yt.net.apiloader.onApiLoaded_GOOGLE_IMA", function () {
                Zi();
            });
        },
        Zi = function () {
            Xi.GOOGLE_IMA = j;
            D(Yi.GOOGLE_IMA, function (a) {
                a.call();
            });
            delete Yi.GOOGLE_IMA;
        };
    var aj = function () {
        this.ra = new Q();
        this.he = "unloaded";
    };
    B(aj, Rf);
    aa(aj);
    n = aj.prototype;
    n.load = function () {
        "unloaded" == this.he
            ? ((this.he = "loading"), this.Kn())
            : "loaded" == this.he
              ? this.c("googleAdSdkLoaded", this)
              : "error" == this.he && this.ef();
    };
    n.Kn = function () {
        if (q("google.load")) google.load("ima", "1", { callback: u(this.eh, this) });
        else {
            var a = u(this.Kn, this),
                b = Vi.GOOGLE_IMA;
            b &&
                (Xi.GOOGLE_IMA
                    ? a.call()
                    : (Yi.GOOGLE_IMA || (Yi.GOOGLE_IMA = []),
                      Yi.GOOGLE_IMA.push(a),
                      Wi.GOOGLE_IMA ||
                          ($i(),
                          (b = U(b, { callback: "yt.net.apiloader.onApiLoaded_GOOGLE_IMA" })),
                          (a = document.createElement("script")),
                          (a.src = b),
                          document.body.appendChild(a),
                          (Wi.GOOGLE_IMA = j))));
        }
    };
    n.eh = function () {
        try {
            ((this.Hh = new google.ima.AdsLoader()),
                this.Hh.addEventListener(
                    google.ima.AdsLoadedEvent.Type.ADS_LOADED,
                    this.Zr,
                    l,
                    this
                ),
                this.Hh.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.Yr, l, this),
                (this.he = "loaded"));
        } catch (a) {
            this.Xr = a;
            this.ef();
            return;
        }
        this.c("googleAdSdkLoaded", this);
    };
    n.ef = function () {
        R(H, "GoogleAdsSdk", "SDK load failure", h);
        this.he = "error";
        this.c("googleAdSdkError", this.Xr);
    };
    n.Zr = function (a) {
        var b = a.getAdsManager(),
            a = a.getUserRequestContext();
        this.c("adLoaded", b, a);
    };
    n.Yr = function (a) {
        var b = a.getError();
        b.getType() == google.ima.AdError.Type.AD_LOAD &&
            ((a = a.getUserRequestContext()), this.c("adError", b, a));
    };
    n.requestAds = function (a, b) {
        this.Hh
            ? this.Hh.requestAds(a, b)
            : R(H, "GoogleAdsSdk", "You cannot call requestAds() without an IMA AdsLoader!", h);
    };
    var bj = function (a, b, c, d, f) {
        this.ra = new Q();
        this.ab = a;
        this.Ns = b;
        this.Os = c;
        this.Z = d;
        this.Ha = f;
        this.L = new Ti(this, d);
    };
    B(bj, Rf);
    n = bj.prototype;
    n.Od = k;
    n.vb = NaN;
    n.load = function () {
        var a = this.Z.td(),
            b = 1 == this.Ha ? 190 : 200;
        if (200 > a.width || a.height < b) {
            b = this.L;
            R(Tb, b.Lc, "The player size is too small to show an ad.", h);
            var c = b.Da();
            c.ck_wh = a.width + "x" + a.height;
            b.i.sb(14, c);
            this.cf();
        } else
            ((this.cb = aj.getInstance()),
                this.cb.e("googleAdSdkLoaded", this.eh, this),
                this.cb.e("googleAdSdkError", this.ef, this),
                this.cb.load());
    };
    n.getSlotId = function () {
        return this.Ns;
    };
    n.Fk = function () {
        return this.Os;
    };
    n.uo = function () {
        return this.vb;
    };
    n.eh = function () {
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
        var b = this.Ha,
            c = q("yt.www.watch.ads.setGutSlotSizes");
        if (c) {
            var d = 1 == b,
                b = Ma(ti, b);
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
    n.ef = function (a) {
        cj(this);
        this.dc(a, this);
    };
    var cj = function (a) {
        a.cb &&
            (a.cb.H("googleAdSdkLoaded", a.eh, a),
            a.cb.H("googleAdSdkError", a.ef, a),
            a.cb.H("adLoaded", a.of, a),
            a.cb.H("adError", a.dc, a));
    };
    n = bj.prototype;
    n.of = function (a, b) {
        if (b === this) {
            var c = a.getType(),
                d = this.L;
            d.Nb("Ad request with a type of " + c + " loaded.");
            var f = d.Da();
            f.ad_man = c;
            d.i.fc(12, f);
            d = l;
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
                    ((c = this.L),
                        R(Tb, c.Lc, "The type of ad from the SDK is not supported", h),
                        c.i.sb(33));
            }
            d ? this.c("adLoaded", this) : this.cf();
        }
    };
    n.dc = function (a, b) {
        if (b === this) {
            var c = this.L,
                d = c.Da(),
                f = "";
            a && (f = si(a, d));
            R(Tb, c.Lc, "Problem loading ad from SDK. " + f, a);
            c.i.sb(32, d);
            this.cf();
        }
    };
    n.cf = function () {
        this.c("adError", this);
    };
    n.r = function () {
        cj(this);
        bj.j.r.call(this);
    };
    n.Qb = function () {
        return this.Od;
    };
    var ej = function (a, b, c, d, f) {
        bj.call(this, a, b, c, d, f);
        (a = q("setAfvCompanionVars")) && a(1 == f);
    };
    B(ej, bj);
    n = ej.prototype;
    n.uk = function () {
        return 2;
    };
    n.gn = function () {
        var a = new google.ima.AdSenseAdsRequest(),
            b = this.Z.M,
            c = re("video-container", this.Z.getRootNode()),
            c = jd(c);
        a.adSlotHeight = c.height;
        a.adSlotWidth = c.width;
        a.adTimePosition = 0 == this.ab || -1 == this.ab ? this.ab : 1e3 * this.ab;
        isNaN(b.age) || (a.age = b.age);
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
        isNaN(b.hostTierId) || (a.hostTierId = b.hostTierId);
        a.language = this.Z.getEnvironmentData().Eb;
        a.maxTotalAdDuration = b.Vr;
        a.publisherId = b.publisherId;
        a.allowCompanionBeforeMaster = 0 == this.getSlotId();
        a.allowUnrelatedCompanion = j;
        a.allowSuperCampaigns = b.Ur;
        a.experimentId = b.Sr;
        a.previousSearchQuery = b.previousSearchQuery;
        a.previousWatchVideoId = b.previousWatchVideoId;
        return a;
    };
    n.dn = function (a) {
        this.Od = new Ni(this.Z, a);
        return j;
    };
    n.en = function (a) {
        this.Z.M.Rr || ((this.ab = 10), this.Z.fc(1));
        vi(this.Ha);
        this.Od = new Pi(this.Z, a);
        return j;
    };
    n.cn = function () {
        return l;
    };
    n.cf = function () {
        this.Z.M.Xm || 2 == this.Ha
            ? ((this.Od = new Ri(this.Z)), this.c("adLoaded", this))
            : ej.j.cf.call(this);
    };
    var fj = function (a) {
        if ("undefined" != typeof DOMParser)
            return new DOMParser().parseFromString(a, "application/xml");
        if ("undefined" != typeof ActiveXObject) {
            var b = new ActiveXObject("MSXML2.DOMDocument");
            if (b) {
                b.resolveExternals = l;
                b.validateOnParse = l;
                try {
                    (b.setProperty("ProhibitDTD", j),
                        b.setProperty("MaxXMLSize", 2048),
                        b.setProperty("MaxElementDepth", 256));
                } catch (c) {}
            }
            b.loadXML(a);
            return b;
        }
        e(Error("Your browser does not support loading xml documents"));
    };
    var gj = function (a, b, c) {
            this.vb = a;
            this.pr = b;
            this.qr = c;
        },
        hj = function (a, b) {
            var c = a.getElementsByTagName(b);
            Da(1 == c.length, "Expected to find 1 element with a tagName of " + b);
            c = c[0];
            Ga(c.firstChild, Text, "The " + b + " element should contain a text node.");
            return pa(c.firstChild.data);
        };
    var ij = function (a) {
        if (a.co) {
            var b = (this.dp = a.co),
                c = b.indexOf(";sz="),
                a = Ze(b.substring(c), ";"),
                b = b.substring(0, c).split("pfadx");
            if ((a = 2 != b.length ? k : { Nt: b[0], Pt: b[1], Qt: a }))
                ((this.qo = a.Nt), (this.so = a.Pt), (this.Xs = a.Qt));
        }
    };
    ij.prototype.dp = "";
    ij.prototype.qo = "";
    ij.prototype.Tk = "";
    ij.prototype.so = "";
    var jj = function (a, b) {
        var c = fb(a.Xs);
        b.Xc && b.Xc.length && (c.sz = b.Xc.join(","));
        b.Tj && (c.pos = b.Tj);
        b.lh && (c.dc_seed = b.lh);
        b.Zd && (c.tile = b.Zd.toString());
        b.Jk && (c.kmyd = b.Jk);
        var d;
        if (!(d = b.xu))
            (a.Tk || (a.Tk = Math.floor(999999999 * Math.random()).toString()), (d = a.Tk));
        c.ord = d;
        c = $e(c);
        return [a.qo, b.uf, a.so, ";", c, "?"].join("");
    };
    var kj = function (a, b, c) {
        Qi.call(this, a, b);
        this.su = c;
    };
    B(kj, Qi);
    kj.prototype.Nn = function () {
        var a = this.su,
            b = q("setCompanion");
        b && b(a);
    };
    kj.prototype.getType = function () {
        return "1_3";
    };
    var lj = function (a, b, c, d, f) {
        bj.call(this, a, b, c, d, f);
        this.Rj = new ij(this.Z.M);
    };
    B(lj, bj);
    n = lj.prototype;
    n.uk = function () {
        return 1;
    };
    n.gn = function () {
        var a = new google.ima.SimpleAdsRequest(),
            b;
        a: {
            b = this.Rj;
            var c = this.Fk();
            switch (this.Ha) {
                case 1:
                    b = jj(b, {
                        uf: "pfadx",
                        Xc: ["480x360"],
                        Tj: 0 == this.ab ? "pre" : -1 == this.ab ? "post" : "mid;pos=" + c,
                        Zd: c + 1,
                        Jk: "watch-longform-ad"
                    });
                    break a;
                case 4:
                    b = jj(b, { uf: "pfadx", Jk: "watch-longform-ad", Xc: ["480x70"], Zd: "1" });
                    break a;
                default:
                    b = "";
            }
        }
        a.adTagUrl = b;
        return a;
    };
    n.dn = function (a) {
        this.Od = new Ki(this.Z, a);
        return j;
    };
    n.en = function () {
        return l;
    };
    n.cn = function (a) {
        a = a.getAds()[0];
        try {
            var b,
                c = a.getContent(),
                d = fj(c),
                f = parseInt(hj(d, "adId"), 10),
                g = hj(d, "trackImp"),
                i = "true" == hj(d, "rm");
            b = new gj(f, g, i);
        } catch (m) {
            return ((b = this.L), b.Nb("Problem parsing custom content XML.", m), b.i.sb(20), l);
        }
        isNaN(b.vb) && ((c = this.L), R(Tb, c.Lc, "ID missing from ad", h), c.i.sb(41, c.Da()));
        this.vb = b.vb;
        a: switch (((c = this.Rj), (d = this.vb), this.Ha)) {
            case 1:
                c = jj(c, {
                    Tj: 0 == this.ab ? "pre" : -1 == this.ab ? "post" : "mid;pos=" + d,
                    uf: "adi",
                    lh: d,
                    Xc: ["300x60"],
                    Zd: "1"
                });
                break a;
            case 4:
                c = jj(c, { uf: "adi", lh: d, Xc: ["300x250"], Zd: "1" });
                break a;
            default:
                c = k;
        }
        d = this.L;
        f = b.pr;
        ca(f) || !f.length ? d.i.sb(40, d.Da()) : (Ui(d, f), Ui(d, d.Da()));
        4 == this.Ha &&
            Ui(this.L, jj(this.Rj, { uf: "adx", lh: this.vb, Xc: ["450x60"], Zd: "1" }));
        if (b.qr)
            return (
                1 != this.Ha && (b = q("closeInPageAdIFrame")) && b(),
                ca(c) || Ui(this.L, c),
                (b = this.L),
                b.Nb("Showing remnant."),
                b.i.sb(21, b.Da()),
                l
            );
        c && 4 == this.Ha ? (this.Od = new kj(this.Z, b.vb, c)) : c && Ui(this.L, c);
        b = this.L;
        b.Nb("Not showing remnant.");
        b.i.sb(24, b.Da());
        return j;
    };
    var mj = function (a, b, c) {
        this.ra = new Q();
        this.id = a;
        this.index = b || 0;
        this.jk = !!c;
        this.sf = [];
    };
    B(mj, Rf);
    n = mj.prototype;
    n.jk = l;
    n.In = l;
    n.P = k;
    n.V = k;
    n.load = function () {
        this.P
            ? (this.P.e("adLoaded", this.of, this),
              this.P.e("adError", this.dc, this),
              this.P.e("AD_TRACKING_EVENT", this.tf, this),
              this.P.load())
            : R(H, "AdSlot", "No Ad Loader", h);
    };
    n.of = function () {
        nj(this);
        this.P.Qb() ? ((this.V = this.P.Qb()), this.c("adLoaded", this, this.P.ab)) : this.dc();
    };
    n.dc = function () {
        nj(this);
        this.c("adError", this);
    };
    n.tf = function (a) {
        this.c("AD_TRACKING_EVENT", a);
    };
    var nj = function (a) {
        a.P.H("adLoaded", a.of, a);
        a.P.H("adError", a.dc, a);
        a.P.H("AD_TRACKING_EVENT", a.tf, a);
    };
    n = mj.prototype;
    n.Qb = function () {
        return this.V;
    };
    n.show = function () {
        this.V.e("adPlay", this.es, this);
        this.V.e("adEnd", this.ds, this);
        this.V.e("adError", this.Pc, this);
        this.V.e("AD_LOGGING_EVENT", this.gs, this);
        this.V.e("select", this.Kj, this);
        this.V.show();
    };
    n.es = function () {
        this.c("adPlay", this);
    };
    n.ds = function () {
        this.c("adEnd", this);
    };
    n.Kj = function () {
        this.In = j;
    };
    n.gs = function (a, b) {
        this.c("AD_LOGGING_EVENT", a, b);
    };
    n.Pc = function (a) {
        this.c("adError", this, a);
    };
    n.r = function () {
        mj.j.r.call(this);
        Uc(this.P);
        Uc(this.V);
    };
    var oj = function (a, b) {
        this.ra = new Q();
        this.oa = b;
        this.i = a;
        this.ee = "unloaded";
        this.sa = [];
        this.hh = [];
        this.sf = [];
        this.nn = {};
        this.Mc = [];
    };
    B(oj, Rf);
    n = oj.prototype;
    n.start = NaN;
    n.hk = j;
    n.Ze = l;
    n.isVisible = j;
    n.Yd = NaN;
    n.Jn = l;
    n.ei = NaN;
    n.Ja = function () {
        return !isNaN(this.start)
            ? 0 == this.start
                ? -2147483648
                : -1 == this.start || -2 == this.start
                  ? 2147483647
                  : 1e3 * this.start
            : k;
    };
    var pj = function (a, b) {
        a.sa.push(b);
    };
    oj.prototype.ae = function () {
        return "loaded" == this.ee || "error" == this.ee;
    };
    var qj = function (a) {
        a.ae || e(Error("Preroll status is undefined before ad load."));
        return 0 == a.start && a.Ze;
    };
    oj.prototype.Dh = function () {
        this.ee = "loading";
        var a = this.sa.length,
            b = this.sf.shift();
        !b || 0 == a
            ? ((this.ee = "error"), D(this.sa, Uc), (this.sa = []), rj(this))
            : ((this.hh = []),
              D(
                  this.sa,
                  function (a) {
                      if (!this.nn[a.id]) {
                          a.jk || (this.Jn = j);
                          var d;
                          a: {
                              d = this.start;
                              var f = a.id,
                                  g = a.index,
                                  i = this.i;
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
                                      d = k;
                              }
                          }
                          a.P = d;
                          this.hh.push(a);
                      }
                  },
                  this
              ),
              0 == this.start && dj(this.i, "nl"),
              sj(this));
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
            } else tj(a);
        },
        uj = function (a, b) {
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
        this.nn[a.id] = j;
        0 == this.oa && (this.i.Gn.at = a.Qb().getType());
        a.Qb() instanceof Ki ? (this.Ze = j) : a.Qb() instanceof Qi && (this.isVisible = l);
        sj(this);
    };
    var tj = function (a) {
            a.Jn &&
            !Ka(a.sa, function (a) {
                return a.Qb() && !a.jk;
            }) &&
            a.sf.length
                ? (pj(a, new mj(a.ei)), a.Dh())
                : ((a.ee = "loaded"), rj(a));
        },
        rj = function (a) {
            a.c("adBreakComplete", a);
        };
    n = oj.prototype;
    n.r = function () {
        oj.j.r.call(this);
        D(this.sa, Uc);
        this.sa = [];
        this.sf = this.sa = k;
    };
    n.show = function () {
        if (isNaN(this.Yd) && 0 != this.sa.length) {
            this.Yd = 0;
            var a = this.sa[this.Yd];
            a.Qb() instanceof Ki && dj(this.i, "bs");
            a.e("adEnd", this.zn, this);
            a.e("adError", this.An, this);
            a.e("AD_LOGGING_EVENT", this.yn, this);
            a.show();
        }
    };
    n.zn = function (a) {
        if (this.Ze) {
            uj(this, a);
            a = this.i;
            if ((a.s.getVideoData().Be || {}).shortform && !a.Hn)
                (qf(a.getEnvironmentData().Db + "mac_204?action_fcts=1"), (a.Hn = j));
            this.sa[this.Yd].In && (this.hk = l);
        }
        rj(this);
    };
    n.An = function (a, b) {
        if (b) {
            var c = {},
                d = si(b, c);
            R(H, "AdBreak", "Error playing ad slot. " + d, h);
            c.sst = this.start;
            c.sidx = this.Yd;
            this.i.sb(32, c);
        }
        uj(this, a);
        rj(this);
    };
    n.yn = function (a, b) {
        b.sst = this.start;
        b.sidx = this.Yd;
        this.i.fc(a, b);
    };
    var vj = function (a) {
            this.br = a;
        },
        xj = function (a) {
            try {
                var b = fj(a).getElementsByTagName("AdBreak"),
                    c = Ja(b, function (a) {
                        a = a.getAttribute("time");
                        return ya(a);
                    });
                return new vj(c);
            } catch (d) {
                return new vj([0]);
            }
        };
    var yj = function (a) {
        return Ma(a.Mb, "908301");
    };
    var zj = function (a) {
        if (a.M.Yn) {
            var b = [],
                c = a.M;
            c.Ck && (c.Qh ? b.push(3) : c.Tn && b.push(4));
            c.Oh && yj(a.getEnvironmentData()) && b.push(1);
            c.Ph && b.push(2);
        } else {
            var b = [],
                c = a.M,
                d = c.Qh;
            c.Ck && d && b.push(3);
            c.Oh && yj(a.getEnvironmentData()) && b.push(1);
        }
        return (a = b);
    };
    var Aj = function (a) {
        this.ra = new Q();
        this.i = a;
        this.Ia = [];
    };
    B(Aj, Rf);
    Aj.prototype.Us = 0;
    Aj.prototype.Vs = 0;
    var Bj = function (a, b, c) {
        var d = new oj(a.i, a.Us++);
        d.start = b;
        for (b = 0; 1 > b; b++) {
            var f = d,
                g = new mj(a.Vs++, 0, l);
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
        isNaN(b) || (this.gender = b);
        this.host = a.ad_host;
        this.hostTierId = parseInt(a.ad_host_tier, 10);
        this.Gr = 1 == a.ad_logging_flag;
        this.Oh = ri(a.aftv);
        this.Ph = ri(a.afv);
        this.Ck = ri(a.dclk);
        this.Hr = !!a.fqsf;
        this.Qh = ri(a.instream);
        this.Tn = ri(a.mpu);
        this.Yn = ri(a.sffb);
        this.Rr = a.wl_cid && a.wl_ad_slots;
        this.Ur = "1" == a.as_launched_in_country;
        b = a.ad_channel_code_instream;
        this.Tr = t(b) ? b.split(",") : [];
        this.Dn = a.sf30;
        b = parseInt(a.afv_instream_max, 10);
        this.Dn ? (b = 3e4) : isNaN(b) && (b = 15e3);
        this.Vr = b;
        b = a.ad_channel_code_overlay;
        this.Wr = t(b) ? b.split(",") : [];
        this.publisherId = a.ad_video_pub_id;
        this.previousWatchVideoId = a.p_w;
        this.Xm = this.Oh && this.Yn && !this.Ph;
        this.qs = this.Ph || this.Xm;
    };
    var Ej = function (a, b) {
        this.i = a;
        this.va = b;
        this.$r = x();
        this.M = a.M;
        this.ke = {};
        this.On = 0;
        this.ke.allowed = Dj(this);
        var c = this.M.Or;
        c && (this.ke.ex_ads = c);
        (c = this.M.Dn) && (this.ke.sf30 = c);
    };
    Ej.prototype.Do = k;
    Ej.prototype.fc = function (a, b) {
        var c = b || {},
            d = (x() - this.$r) / 1e3;
        c.art = d;
        d = this.i.getEnvironmentData();
        c.feature = d.Yb;
        c.ad_flags = this.M.Er;
        (d = this.M.Fr) && (c.cid = d);
        c.mt = this.va.getCurrentTime();
        (d = this.va.getDuration()) && (c.len = d);
        this.M.Hr && (c.fqsf = 1);
        c.ad_event = a;
        if (this.M.Gr) {
            var f;
            a: {
                var d = this.ke,
                    g = fb(c);
                for (f in d) {
                    if (f in g) {
                        f = k;
                        break a;
                    }
                    g[f] = d[f];
                }
                f = g;
            }
            ca(f) ? this.i.log(this.ke) : (c = f);
            this.i.log(c);
            this.ke = {};
        }
    };
    var Dj = function (a) {
        if (a.Do) return a.Do;
        var b = [];
        a.M.Ck && (a.M.Qh && b.push("1_2"), a.M.Tn && b.push("1_3"));
        a.M.Ph && b.push("2_1");
        a.M.Oh && a.M.Qh && b.push("2_2");
        a.M.qs && b.push("2_3");
        return b.join(",");
    };
    var Fj = function (a, b) {
        this.Ia = b;
        this.fe = [];
        this.oj = {};
        this.fb = {};
        this.i = a;
    };
    B(Fj, Sc);
    Fj.prototype.Oc = k;
    Fj.prototype.Dh = function () {
        if (!this.fe.length)
            if (
                (Wa(this.Ia, function (a, c) {
                    return a.getId() - c.getId();
                }),
                (this.fe = Ia(this.Ia, function (a) {
                    return "unloaded" == a.ee;
                })),
                0 == this.fe.length)
            )
                (R(H, "AdPlaylist", "Could not find any ad breaks to load", h), Qg(this.i));
            else {
                var a = La(this.fe, function (a) {
                    return 0 == a.start;
                });
                ca(a) && Qg(this.i);
                Gj(this);
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
        Ah(u(this.Gt, this, a), 0);
    };
    Fj.prototype.Gt = function (a) {
        var b = Ha(this.Ia, a),
            c = this.Ia[b + 1],
            b = this.Ia[b - 1],
            d = 2147483646;
        -2 == a.start || -1 == a.start
            ? (d = -2147483648)
            : c && 2147483647 != c.start && (d = c.Ja() - 1);
        0 == a.oa && (dj(this.i, "bl"), qj(a) || dj(this.i, "fb"));
        if ((c = !(a.ae() && 0 < a.sa.length))) {
            if (b && b.ae()) {
                var f = b.Ja();
                f > d && (d = f);
                Hj(this, b);
                this.Fh(b, d);
            }
        } else ((this.oj[a.getId()] = a), this.Fh(a, d));
        Qg(this.i);
        c && this.df(a);
        Gj(this);
    };
    Fj.prototype.Fh = function (a, b) {
        var c = a.Ja();
        if (c) {
            var d = {};
            d.priority = -2 != a.start ? 1 : 2;
            d.id = a.getId();
            d.visible = a.isVisible;
            c = new Ef(c, b, d);
            this.fb[a.getId()] = c;
            this.i.addCueRange(c);
        }
    };
    var Hj = function (a, b) {
        a.fb[b.getId()] && (a.i.removeCueRange(a.fb[b.getId()]), delete a.fb[b.getId()]);
    };
    Fj.prototype.df = function (a) {
        a.H("adBreakComplete", this.nk, this);
        this.Oc && a == this.Oc && (this.Oc = k);
        Hj(this, a);
        Oa(this.Ia, a);
        delete this.oj[a.getId()];
        Uc(a);
    };
    Fj.prototype.Nq = function (a) {
        this.Oc = k;
        a.Ze
            ? (-1 != a.start && a.hk
                  ? Ij(this.i)
                  : qj(a) && !a.hk
                    ? Ij(this.i)
                    : (Xg(this.i), Wg(this.i), Yg(this.i, l)),
              this.df(a))
            : a.isVisible
              ? Hj(this, a)
              : this.df(a);
    };
    Fj.prototype.r = function () {
        D(this.Ia, this.df, this);
        Fj.j.r.call(this);
    };
    var Jj = function (a, b) {
        this.Ia = b;
        this.i = a;
        D(
            b,
            function (a) {
                a.e("adBreakComplete", this.Cn, this);
            },
            this
        );
        this.Mc = {};
    };
    B(Jj, Sc);
    n = Jj.prototype;
    n.Cn = function (a) {
        a.Tc || (this.Qn(a), 0 == a.start ? D(a.Mc, this.xm, this) : this.Fh(a));
    };
    n.Fh = function (a) {
        var b = a.Ja();
        if (b) {
            var c = "ADT_" + a.getId(),
                b = new Ef(b, 2147483647, { id: c, priority: 0 });
            this.Mc[c] = a.Mc;
            this.i.addCueRange(b);
        }
    };
    n.Qn = function (a) {
        a.Tc || a.H("adBreakComplete", this.Cn, this);
    };
    n.xm = function (a) {
        t(a.po)
            ? ((a = a.getUrl()), R(Ub, "AdTrackingPlaylist", "Ping sent to " + a + ".", h), qf(a))
            : ((a = a.getUrl()),
              R(Ub, "AdTrackingPlaylist", "Sending 204 impression.", h),
              this.i.fc(13, a));
    };
    n.r = function () {
        Jj.j.r.call(this);
        D(this.Ia, this.Qn, this);
    };
    var Kj = function (a) {
        V.call(this, a);
        this.Cd = {};
        this.Gn = { at: 0 };
    };
    B(Kj, V);
    n = Kj.prototype;
    n.W = "ad";
    n.le = "ad";
    n.Rd = k;
    n.Hn = l;
    n.zb = function (a) {
        return a.getVideoData().Z;
    };
    n.create = function () {
        Kj.j.create.call(this);
        this.loaded = j;
        dj(this, "i");
        this.M = new Cj(this.s.getVideoData().Be || {});
        this.Hj = new Ej(this, this.s);
        ui();
        this.Rd = new Aj(this);
        this.Rd.e("adBreaksComplete", this.Tm, this);
        var a = this.Rd;
        try {
            var b = a.i.M,
                c;
            if (b.Pm) c = xj(b.Pm);
            else {
                var d;
                if (b.Om) {
                    var f = Ja(b.Om.split(","), ya);
                    d = new vj(f);
                } else d = new vj([0]);
                c = d;
            }
            for (var g = c.br, b = 0; b < g.length; b++) a.Ia.push(Bj(a, g[b], zj(a.i)));
            a.complete();
        } catch (i) {
            (R(H, "BaseAdBreakDefiner", "Break Definer Error", i), a.complete());
        }
        a = {};
        a.allowed = Dj(this.Hj);
        Tg(this, {}, a);
    };
    n.destroy = function () {
        this.loaded = l;
        Uc(this.Rd);
        this.Rd = k;
        Uc(this.ff);
        this.ff = k;
        Uc(this.Rg);
        this.Rg = k;
        Kj.j.destroy.call(this);
    };
    n.getVideoData = function () {
        return this.s.getVideoData();
    };
    n.getEnvironmentData = function () {
        return this.s.getEnvironmentData();
    };
    n.isFullscreen = function () {
        var a = "leanback" == this.getEnvironmentData().Ta;
        return this.s.isFullscreen() || a;
    };
    n.e = function (a, b, c) {
        this.pubsub.e(a, b, c);
    };
    n.H = function (a, b, c) {
        this.pubsub.H(a, b, c);
    };
    n.c = function (a, b) {
        this.pubsub.c.apply(this.pubsub, arguments);
    };
    n.fc = function (a, b) {
        this.Hj.fc(a, b);
    };
    n.sb = function (a, b) {
        var c = b || {};
        c.ad_error = a;
        this.fc(7, c);
    };
    n.getRootNode = function () {
        return this.s.getRootNode();
    };
    n.td = function () {
        return jd(this.getRootNode());
    };
    n.Tm = function (a) {
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
        var b = a.getId(),
            c;
        if ((c = this.Rg)) ((c = a.getId()), (c = t(c) && 0 == c.lastIndexOf("ADT_", 0)));
        if (c) {
            a.Jg = l;
            c = this.Rg;
            var d = c.Mc[b];
            d && (delete c.Mc[b], D(d, c.xm, c));
            this.removeCueRange(a);
        } else
            this.ff &&
                !isNaN(b) &&
                ((c = this.ff),
                b !== h &&
                    ((a = c.oj[b])
                        ? (c.Oc && c.df(c.Oc),
                          (c.Oc = a),
                          a.e("adBreakComplete", c.Nq, c),
                          a.Ze &&
                              ((b = c.i),
                              b.pubsub.c("command_redirect_controls", b, ["play_pause"]),
                              b.pubsub.c("command_disable_controls", ["seek"]),
                              b.pauseVideo(),
                              b.pubsub.c("command_ad_break_started")),
                          a.show())
                        : R(
                              H,
                              "AdPlaylist",
                              "Could not find loaded ad break with an ID of " + b,
                              h
                          )));
    };
    var dj = function (a, b) {
        var c = b;
        "nl" == b && ((c = a.Hj), c.On++, (c = c.On.toString()));
        a.Cd[c] = x();
        ("bs" == c || "fb" == c) && Tg(a, a.Cd, a.Gn);
    };
    Kj.prototype.kh = function (a) {
        this.pubsub.c(a);
    };
    var Lj = function (a, b) {
            if ("view" == a && b.convViewUrl) return b.convViewUrl;
            if (!b.baseUrl || !b.uid) return k;
            var c = b.rmktEnabled && b.vid,
                d = b.focEnabled;
            if (!c && !d) return k;
            var f = { label: d ? "followon_" + a : "default" };
            if (c) {
                c = { utvid: b.vid, utuid: b.uid, type: a };
                b.eventLabel && (c.el = b.eventLabel);
                b.Ta && (c.ps = b.playerStyle);
                var g = [],
                    i;
                for (i in c) g.push(encodeURIComponent(i) + "=" + encodeURIComponent(c[i]));
                f.data = g.join(";");
            }
            d && (f.foc_id = b.uid);
            return U(b.baseUrl, f);
        },
        Mj = function (a, b) {
            var c = Lj(a, b);
            c && qf(c);
        };
    var Nj = function (a, b) {
        this.$ = b;
        this.va = a;
        var c = a.getRootNode();
        this.di = O("html5-endscreen-actionbar", c);
        this.it = O("html5-replay-button", this.di);
        S(this.it, "click", u(this.gt, this));
        this.xo = O("html5-like-button", this.di);
        S(this.xo, "click", u(this.ft, this));
        this.wo = O("html5-dislike-button", this.di);
        S(this.wo, "click", u(this.dt, this));
        this.jt = O("html5-share-button", this.di);
        S(this.jt, "click", u(this.ht, this));
    };
    Nj.prototype.$ = k;
    Nj.prototype.reset = function () {
        Rh(this.wo);
        Rh(this.xo);
    };
    var Oj = function (a, b, c) {
        if (!K(c, "html5-async-progress")) {
            var d = a.va.getVideoData();
            Rh(c, "html5-async-progress");
            var f = d.m,
                a = { pa: d.pa, Rb: u(a.js, a, c), qf: u(a.is, a, c) },
                c = {};
            b ? (c.action_like_video = 1) : (c.action_dislike_video = 1);
            a = a || {};
            c.video_id = f;
            c.plid = a.pa;
            f = {
                screen: cf({ h: screen.height, w: screen.width, d: screen.colorDepth }),
                session_token: nf.watch_actions_ajax
            };
            a.ks && (f.station_id = a.ks);
            kf("/watch_actions_ajax", {
                format: "XML",
                method: "POST",
                Mg: c,
                Ym: f,
                Rb: a.Rb,
                qf: a.qf
            });
            (f = zh("CONVERSION_CONFIG_DICT")) && Mj(b ? "like" : "dislike", f);
            zh("CONVERSION_CONFIG_DICT") || Mj(b ? "like" : "dislike", d.gj);
        }
    };
    n = Nj.prototype;
    n.gt = function () {
        this.$.c("command_play");
    };
    n.ft = function (a) {
        Oj(this, j, a.currentTarget);
    };
    n.dt = function (a) {
        Oj(this, l, a.currentTarget);
    };
    n.ht = function () {
        this.$.c("command_share");
    };
    n.js = function (a) {
        Rh(a, "html5-async-success");
    };
    n.is = function (a, b, c) {
        Sh(a, c && c.error_message);
    };
    var Pj = function (a, b) {
        this.s = a;
        this.pubsub = b;
        this.Jh = re("html5-endscreen", this.s.getRootNode());
        I(this.Jh, this.Ao);
        this.qc = re("html5-endscreen-content", this.s.getRootNode());
    };
    n = Pj.prototype;
    n.Ao = "base-endscreen";
    n.Jh = k;
    n.qc = k;
    n.pubsub = k;
    n.s = k;
    n.create = function () {};
    n.destroy = function () {};
    var Qj = window.location.protocol + "//i.ytimg.com/",
        Rj = 4 / 3,
        Tj = function (a, b, c) {
            if (!c) {
                c = a.clientHeight;
                a = a.clientWidth;
                if ((900 < a || 600 < c) && b.Am) return b.Am;
                if ((430 < a || 320 < c) && b.Bm) return b.Bm;
            }
            return b.Cm ? b.Cm : b.m ? Sj(b.m) : "";
        },
        Sj = function (a, b) {
            return (Qj + "vi/" + escape(a) + "/" + escape(b || "hqdefault.jpg")).replace(
                "i.",
                "i" + ((a.charCodeAt(0) % 4) + 1) + "."
            );
        };
    var Vj = function (a, b) {
            this.sp = a;
            var c = b || k;
            c || (c = Uj(this.sp));
            c = oa("__%s__", "(" + c.join("|") + ")");
            this.eu = RegExp(c, "g");
        },
        Wj = /__([a-z]+(?:_[a-z]+)*)__/g,
        Xj = function (a, b) {
            var c = N(a).innerHTML,
                c = c.replace(/^\s*(<\!--\s*)?/, ""),
                c = c.replace(/(\s*--\>)?\s*$/, "");
            return new Vj(c, b);
        },
        Uj = function (a) {
            var b = [],
                c = {};
            a.replace(Wj, function (a, f) {
                f in c || ((c[f] = j), b.push(f));
            });
            return b;
        };
    Vj.prototype.Kd = function (a, b, c) {
        return this.sp.replace(
            this.eu,
            u(function (d, f) {
                b && (f = b(f));
                return c ? a[f] || "" : xa(a[f] || "");
            }, this)
        );
    };
    var Yj = function () {
        this.Kk = this.Uk();
    };
    Yj.prototype.Kd = function (a) {
        var b = fb(a);
        b.duration = mh(a.length_seconds);
        return this.Kk.Kd(b);
    };
    Yj.prototype.Uk = function () {
        var a = O("videowall-info-template");
        return Xj(a, ["title", "author", "duration", "view_count"]);
    };
    var Zj = function (a, b) {
        this.va = a;
        this.Ls = b ? "hqdefault.jpg" : "default.jpg";
        this.Ks = new Yj();
        this.Kk = this.Uk();
        var c = xc("a", { tabindex: "0" });
        I(c, "videowall-still");
        S(c, "click", u(this.Fg, this));
        S(c, "keypress", u(this.Fj, this));
        this.xb = c;
    };
    n = Zj.prototype;
    n.update = function (a) {
        this.oa != a.id &&
            ((this.hb = a),
            (this.oa = a.id),
            (this.xb.innerHTML = this.Kk.Kd(
                { info: this.Ks.Kd(a), thumbnail_url: Sj(this.oa, this.Ls) },
                h,
                j
            )),
            fc(this.xb, "videowall-still-featured", a.featured));
    };
    n.B = function () {
        return this.xb;
    };
    n.Uk = function () {
        var a = O("videowall-still-content-template");
        return Xj(a, ["info", "thumbnail_url"]);
    };
    n.select = function () {
        var a = "endscreen";
        if (this.hb.featured)
            switch (this.hb.feature_type) {
                case "fvwb":
                    a = "fvwpb";
                    break;
                default:
                    a = "fvwp";
            }
        else this.hb.pinned && (a = "pinned");
        this.va.watchVideoById(this.oa, a);
    };
    n.Fg = function () {
        this.select();
    };
    n.Fj = function (a) {
        switch (a.keyCode) {
            case 13:
            case 32:
                (this.select(), a.preventDefault());
        }
    };
    var $j = function (a, b) {
        Pj.call(this, a, b);
        this.qk = [];
        this.pubsub.e("onResize", u(this.pb, this));
    };
    B($j, Pj);
    n = $j.prototype;
    n.Ao = "videowall-endscreen";
    n.Lf = k;
    n.hb = k;
    n.qk = k;
    n.fo = l;
    n.Mf = 0;
    n.create = function () {
        $j.j.create.call(this);
        this.hb = this.s.getVideoData().tq;
        this.be();
    };
    n.destroy = function () {
        this.qc.innerHTML = "";
        delete this.hb;
        $j.j.destroy.call(this);
    };
    n.be = function () {
        if (this.hb && this.hb.length) {
            fc(this.Jh, "endscreen-enable-layout", j);
            this.qc.innerHTML = "";
            hd(this.qc, "", "");
            var a = jd(this.qc);
            a.height -= 30;
            var b = Math.floor(a.width / 158),
                c = Math.floor(a.height / (158 / 1.45));
            if (1 > c || 1 > b) this.Mf = 0;
            else {
                var d = this.hb.length,
                    f = l;
                this.hb[0].featured && 2 < c && 2 < b && ((f = j), (d += 3));
                fc(this.qc, "feature-video", f);
                for (
                    var g = 0, i = 0, m = a.width / a.height, p = j;
                    0 <= d && (g < b || i < c);
                ) {
                    var s = d >= i,
                        y = d >= g;
                    if ((p && y) || (!s && y)) ((d -= g), i++);
                    else if (s) ((d -= i), g++);
                    else break;
                    p = 1.45 * (g / i) > m;
                }
                this.fo = p;
                b = new M(g, i);
                this.fo
                    ? ((c = 1 / b.width), (a = a.width * c), (c = a / 1.45))
                    : ((c = 1 / b.height), (c *= a.height), (a = 1.45 * c));
                a = new M(Math.floor(a), Math.floor(c));
                this.Mf = b.width * b.height;
                f && (this.Mf -= 3);
                this.Lf && Ee(this.Lf);
                var f = ak(a),
                    c = { Sc: this.Lf },
                    v;
                this.Lf = Fe(".videowall-still", f, c);
                f = ak(a.ga().scale(2));
                c.Sc = this.Lf;
                v = ".feature-video .videowall-still:first-child";
                Fe(v, f, c);
                hd(this.qc, a.width * b.width, a.height * b.height);
            }
            v = 0;
            for (f = this.Mf; v < f; v++) this.qc.appendChild(bk(this, v).B());
            fc(this.Jh, "endscreen-enable-layout", l);
        }
    };
    var bk = function (a, b) {
            var c = a.qk[b];
            c || ((c = new Zj(a.s, 3 > b)), (a.qk[b] = c));
            c.update(a.hb[b]);
            return c;
        },
        ak = function (a) {
            return ["width:" + a.width + "px", "height:" + a.height + "px"];
        };
    $j.prototype.pb = function () {
        this.be();
    };
    var ck = function (a) {
        V.call(this, a);
        this.Ek = a.getEnvironmentData().Lj
            ? new $j(this.s, this.pubsub)
            : new Pj(this.s, this.pubsub);
        this.Xn = new Nj(this.s, this.pubsub);
    };
    B(ck, V);
    n = ck.prototype;
    n.W = "endscreen";
    n.le = "end";
    n.Xn = k;
    n.Ek = k;
    n.create = function () {
        ck.j.create.call(this);
        var a = Math.max(1e3 * (this.s.getVideoData().Ba - 10), 0),
            a = new Ef(a, 2147483646, { id: "preload" }),
            b = new Ef(2147483646, 2147483647, { id: "load", Ff: 9 });
        this.addCueRange(a, b);
    };
    n.destroy = function () {
        this.Wd();
        this.Xn.reset();
        ck.j.destroy.call(this);
    };
    n.load = function () {
        ck.j.load.call(this);
        this.loaded = j;
    };
    n.unload = function () {
        this.Ek.destroy();
        ck.j.unload.call(this);
        this.loaded = l;
    };
    n.rb = function (a) {
        ck.j.rb.call(this, a);
        "preload" == a.getId() ? this.Ek.create() : gh(this.s.getEnvironmentData()) || this.load();
    };
    n.lc = function (a) {
        "load" == a.getId() && this.unload();
        ck.j.lc.call(this, a);
    };
    n.zb = function () {
        return j;
    };
    var dk = function (a, b) {
            return b != k && !!b.match(a);
        },
        ek = function (a, b) {
            for (var c in a) if (a[c] == b) return j;
            return l;
        },
        hk = function (a, b, c, d) {
            var f = new fk();
            f.type = d;
            f.defaultValue = h;
            f.nd = ma(dk, c);
            return gk(a[b], f);
        },
        ik = function (a, b, c) {
            var d = new fk();
            d.type = "OPTIONAL";
            d.xc = function (a) {
                if (isNaN(parseInt(a, 0))) return k;
                a = parseInt(a, 0).toString(16);
                return "#" + "000000".substring(0, 6 - a.length) + a;
            };
            d.nd = function (a) {
                return !!a;
            };
            d.defaultValue = c;
            return gk(a[b], d);
        },
        jk = function (a, b, c, d) {
            var f = new fk();
            f.type = c;
            f.defaultValue = d;
            return gk(a[b], f);
        },
        kk = function (a, b, c, d, f) {
            var g = new fk();
            g.type = d;
            g.defaultValue = f;
            g.nd = ma(ek, c);
            return gk(a[b], g);
        },
        lk = function (a, b) {
            var c = new fk();
            c.type = "OPTIONAL";
            c.defaultValue = 0;
            c.xc = function (a) {
                return parseFloat(a);
            };
            return gk(a[b], c);
        },
        mk = function (a) {
            var b = new fk();
            b.type = "OPTIONAL";
            b.defaultValue = 0;
            b.xc = function (a) {
                return parseInt(a, 10);
            };
            gk(a.d, b);
        },
        nk = function (a, b, c, d, f, g, i) {
            var m = new fk();
            m.type = "OPTIONAL";
            m.xc = function (a) {
                a = 10 == c ? parseFloat(a) : parseInt(a, c);
                return g && a != k && !isNaN(a) ? Oc(a, d, f) : a;
            };
            m.defaultValue = i;
            m.nd = function (a) {
                return a != k && !isNaN(a) && a >= d && a <= f;
            };
            return gk(a[b], m);
        },
        ok = function (a, b) {
            var c = new fk();
            c.type = "OPTIONAL";
            c.defaultValue = 0;
            c.xc = function (a) {
                a = a.match(/([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})(\.[0-9])/);
                return !a
                    ? -1
                    : 3600 * parseFloat(a[1]) +
                          60 * parseFloat(a[2]) +
                          parseFloat(a[3]) +
                          parseFloat(a[4]);
            };
            return gk(a[b], c);
        },
        pk = function (a, b) {
            if (b == k) return k;
            var c = new a();
            c.Na(b);
            return c;
        },
        qk = function (a, b, c, d) {
            if (a == k || a[b] == k) return k;
            var f = new fk();
            f.type = d;
            f.defaultValue = h;
            f.nd = function (a) {
                return !!a;
            };
            f.xc = ma(pk, c);
            return gk(a[b], f);
        },
        rk = function (a) {
            function b(a) {
                return a != k && !isNaN(a);
            }
            return (a = (a = a ? (!a.padding || !a.padding.length ? a.padding : a.padding[0]) : k)
                ? new Pc(
                      parseFloat(a.top),
                      parseFloat(a.right),
                      parseFloat(a.bottom),
                      parseFloat(a.left)
                  )
                : k) &&
                b(a.top) &&
                b(a.right) &&
                b(a.bottom) &&
                b(a.left)
                ? a
                : k;
        },
        gk = function (a, b) {
            var c;
            "OPTIONAL" == b.type || "REQUIRED" == b.type
                ? ((c = a == k ? k : b.xc(r(a) && a.length ? a[0] : a)),
                  b.nd(c) ||
                      ("REQUIRED" == b.type && e("Required field missing."),
                      (c = b.defaultValue == k ? k : b.defaultValue)))
                : (c =
                      "REPEATED" == b.type
                          ? a != k
                              ? sk(r(a) ? a : [a], b)
                              : b.defaultValue != k
                                ? r(b.defaultValue)
                                    ? b.defaultValue
                                    : [b.defaultValue]
                                : []
                          : "IDLIST" == b.type
                            ? tk(a, b)
                            : k);
            return c;
        },
        tk = function (a, b) {
            function c(a) {
                return Ia(a.split(/ +/), function (a) {
                    return "" != a;
                });
            }
            return a != k
                ? sk(c(a), b)
                : b.defaultValue != k
                  ? r(b.defaultValue)
                      ? b.defaultValue
                      : [b.defaultValue]
                  : [];
        },
        sk = function (a, b) {
            for (var c = [], d = 0; d < a.length; ++d) {
                var f = b.xc(a[d]);
                b.nd(f) && c.push(f);
            }
            return c.length
                ? c
                : b.defaultValue != k
                  ? r(b.defaultValue)
                      ? b.defaultValue
                      : [b.defaultValue]
                  : [];
        },
        fk = function () {};
    fk.prototype.type = "OPTIONAL";
    fk.prototype.xc = function (a) {
        return a == k ? k : a.toString();
    };
    fk.prototype.nd = function (a) {
        return a != k;
    };
    fk.prototype.defaultValue = k;
    var uk = function () {},
        vk = { CLICK: "click", Bw: "hidden", ix: "rollOut", jx: "rollOver", nx: "shown" };
    uk.prototype.state = k;
    uk.prototype.Na = function (a) {
        hk(a, "ref", /.+/, "OPTIONAL");
        this.state = kk(a, "state", vk, "OPTIONAL");
    };
    var wk = function () {};
    wk.prototype.Na = function (a) {
        qk(a, "condition", uk, "REPEATED");
    };
    var xk = function () {},
        yk = {
            pw: "compose",
            Aw: "group",
            Hw: "hyperlink",
            Zw: "playlist",
            hx: "respUpload",
            lx: "search",
            xx: "userChannel",
            VIDEO: "video"
        },
        zk = { uw: "current", Vw: "new" };
    xk.prototype.type = k;
    xk.prototype.value = k;
    xk.prototype.target = k;
    xk.prototype.Na = function (a) {
        this.type = kk(a, "type", yk, "OPTIONAL", "hyperlink");
        this.value = jk(a, "value", "OPTIONAL");
        this.target = kk(a, "target", zk, "OPTIONAL", "current");
    };
    var Ak = function (a) {
            if (!a.type || !a.value) return k;
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
            return k;
        },
        Bk = function () {};
    Bk.prototype.value = 0;
    Bk.prototype.Na = function (a) {
        this.value = ok(a, "value");
    };
    var Ck = function () {},
        Dk = { Ww: "openUrl", lu: "pause" };
    n = Ck.prototype;
    n.type = k;
    n.trigger = k;
    n.url = k;
    n.duration = k;
    n.Na = function (a) {
        this.type = kk(a, "type", Dk, "OPTIONAL");
        this.trigger = kk(a, "trigger", vk, "OPTIONAL");
        this.url = qk(a, "url", xk, "OPTIONAL");
        this.duration = qk(a, "duration", Bk, "OPTIONAL");
    };
    var Ek = function () {
        this.cd = [];
    };
    n = Ek.prototype;
    n.fgColor = "#1A1A1A";
    n.bgColor = "#FFF";
    n.borderColor = "#000";
    n.borderWidth = 0;
    n.Jd = 0.8;
    n.Po = 0.2;
    n.Qo = 0;
    n.Dj = "#F2F2F2";
    n.xk = 3;
    n.Ej = 3.6107;
    n.fontWeight = "";
    n.padding = k;
    n.Na = function (a) {
        this.fgColor = ik(a, "fgColor", this.fgColor);
        this.bgColor = ik(a, "bgColor", this.bgColor);
        this.borderColor = ik(a, "borderColor", this.borderColor);
        this.borderWidth = nk(a, "borderWidth", 16, 1, 5, l, this.borderWidth);
        this.Jd = nk(a, "bgAlpha", 10, 0, 1, l, this.Jd);
        this.Po = nk(a, "borderAlpha", 10, 0, 1, l, this.Po);
        this.Qo = nk(a, "gloss", 16, 0, 255, l, this.Qo);
        this.Dj = ik(a, "highlightFontColor", this.Dj);
        this.xk = nk(a, "highlightWidth", 16, 1, 5, l, this.xk);
        this.Ej = nk(a, "textSize", 10, 3.3, 30.1, j, this.Ej);
        this.fontWeight = jk(a, "fontWeight", "OPTIONAL", this.fontWeight);
        this.padding = rk(a);
        this.cd = jk(a, "effects", "IDLIST");
    };
    var Fk = function () {};
    n = Fk.prototype;
    n.x = 0;
    n.y = 0;
    n.ci = 0;
    n.bi = 0;
    n.we = 0;
    n.Na = function (a) {
        this.x = lk(a, "x");
        this.y = lk(a, "y");
        this.ci = lk(a, "w");
        this.bi = lk(a, "h");
        this.we = ok(a, "t");
        mk(a);
    };
    var Gk = function () {};
    n = Gk.prototype;
    n.x = 0;
    n.y = 0;
    n.ci = 0;
    n.bi = 0;
    n.we = 0;
    n.Bo = 0;
    n.Co = 0;
    n.Na = function (a) {
        this.x = lk(a, "x");
        this.y = lk(a, "y");
        this.Bo = lk(a, "sx");
        this.Co = lk(a, "sy");
        this.ci = lk(a, "w");
        this.bi = lk(a, "h");
        this.we = ok(a, "t");
        mk(a);
    };
    var Hk = function () {},
        Ik = { ku: "anchored", gx: "rect" };
    Hk.prototype.type = "rect";
    Hk.prototype.Sk = k;
    Hk.prototype.ai = k;
    Hk.prototype.Na = function (a) {
        this.type = kk(a, "type", Ik, "OPTIONAL", "rect");
        this.Sk = qk(a, "rectRegion", Fk, "REPEATED");
        this.ai = qk(a, "anchoredRegion", Gk, "REPEATED");
    };
    var Jk = function () {};
    Jk.prototype.gc = k;
    Jk.prototype.uc = k;
    Jk.prototype.Na = function (a) {
        hk(a, "timeRelative", /.+/, "OPTIONAL");
        this.gc = hk(a, "spaceRelative", /.+/, "OPTIONAL");
        this.uc = qk(a, "movingRegion", Hk, "REPEATED");
    };
    var Kk = function (a) {
        if (!a.uc) return k;
        a = a.uc[0].Sk || a.uc[0].ai;
        if (!a || 2 > a.length) return k;
        var b = a.length - 1;
        return 0 == a[0].we && 0 == a[b] ? k : { start: a[0].we, end: a[b].we };
    };
    var Lk = function () {},
        Mk = {
            ku: "anchored",
            ww: "donation",
            Gw: "highlightText",
            Ow: "label",
            ax: "popup",
            px: "speech",
            ux: "title"
        },
        Nk = { Fw: "highlight", lu: "pause", Ug: "text", tx: "thumbnail" };
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
        this.Pb || (this.Pb = new Ek());
    };
    Lk.prototype.getUrl = function () {
        if (!this.action) return k;
        for (var a in this.action) if (this.action[a].url) return this.action[a].url;
        return k;
    };
    var Ok = function (a) {
            return !a.action
                ? l
                : a.action.some(function (a) {
                      return a.trigger && "click" == a.trigger;
                  });
        },
        Pk = function (a) {
            if (!a.ya || !a.ya.uc) return k;
            a = a.ya.uc[0];
            a = a.Sk || a.ai;
            return !a ? k : new Qc(a[0].x, a[0].y, a[0].ci, a[0].bi);
        },
        Qk = function (a) {
            return !a.ya || !a.ya.uc ? k : (a = a.ya.uc[0].ai) ? new L(a[0].Bo, a[0].Co) : k;
        },
        Rk = function (a) {
            return !a.action
                ? k
                : (a = a.action.filter(function (a) {
                        return "pause" == a.type;
                    }))
                  ? a[0]
                  : k;
        };
    var Sk = function () {
        this.ja = [];
        this.K = [];
        this.Wb = [];
    };
    Sk.prototype.oe = k;
    Sk.prototype.Bb = k;
    Sk.prototype.Wh = j;
    var Tk = [2, 2, 6, 6, 0];
    n = Sk.prototype;
    n.clear = function () {
        this.ja.length = 0;
        this.K.length = 0;
        this.Wb.length = 0;
        delete this.oe;
        delete this.Bb;
        delete this.Wh;
        return this;
    };
    n.moveTo = function (a, b) {
        0 == this.ja[this.ja.length - 1]
            ? (this.Wb.length -= 2)
            : (this.ja.push(0), this.K.push(1));
        this.Wb.push(a, b);
        this.Bb = this.oe = [a, b];
        return this;
    };
    n.lineTo = function (a) {
        var b = this.ja[this.ja.length - 1];
        b == k && e(Error("Path cannot start with lineTo"));
        1 != b && (this.ja.push(1), this.K.push(0));
        for (b = 0; b < arguments.length; b += 2) {
            var c = arguments[b],
                d = arguments[b + 1];
            this.Wb.push(c, d);
        }
        this.K[this.K.length - 1] += b / 2;
        this.Bb = [c, d];
        return this;
    };
    n.close = function () {
        var a = this.ja[this.ja.length - 1];
        a == k && e(Error("Path cannot start with close"));
        4 != a && (this.ja.push(4), this.K.push(1), (this.Bb = this.oe));
        return this;
    };
    n.arcTo = function (a, b, c, d) {
        var f =
                this.Bb[0] -
                a * Math.cos((c * Math.PI) / 180) +
                a * Math.cos(((c + d) * Math.PI) / 180),
            g =
                this.Bb[1] -
                b * Math.sin((c * Math.PI) / 180) +
                b * Math.sin(((c + d) * Math.PI) / 180);
        this.ja.push(3);
        this.K.push(1);
        this.Wb.push(a, b, c, d, f, g);
        this.Wh = l;
        this.Bb = [f, g];
        return this;
    };
    var Uk = function (a, b) {
        for (var c = a.Wb, d = 0, f = 0, g = a.ja.length; f < g; f++) {
            var i = a.ja[f],
                m = Tk[i] * a.K[f];
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
        return 0 == this.ja.length;
    };
    var Vk = function (a) {
        this.$c = a;
        this.oi = [];
    };
    B(Vk, Sc);
    var Wk = [];
    n = Vk.prototype;
    n.G = function (a, b, c, d, f) {
        r(b) || ((Wk[0] = b), (b = Wk));
        for (var g = 0; g < b.length; g++)
            this.oi.push(Id(a, b[g], c || this, d || l, f || this.$c || this));
        return this;
    };
    n.Gk = function (a, b, c, d, f) {
        if (r(b)) for (var g = 0; g < b.length; g++) this.Gk(a, b[g], c, d, f);
        else {
            a: {
                c = c || this;
                f = f || this.$c || this;
                d = !!d;
                if ((a = Md(a, b, d)))
                    for (b = 0; b < a.length; b++)
                        if (!a[b].gd && a[b].me == c && a[b].capture == d && a[b].Sh == f) {
                            a = a[b];
                            break a;
                        }
                a = k;
            }
            a && ((a = a.key), Nd(a), Oa(this.oi, a));
        }
        return this;
    };
    n.Wa = function () {
        D(this.oi, Nd);
        this.oi.length = 0;
    };
    n.r = function () {
        Vk.j.r.call(this);
        this.Wa();
    };
    n.handleEvent = function () {
        e(Error("EventHandler.handleEvent not implemented"));
    };
    var Xk = function () {};
    aa(Xk);
    Xk.prototype.kp = 0;
    Xk.getInstance();
    var Yk = function (a) {
        this.hd = a || oc();
    };
    B(Yk, Sd);
    n = Yk.prototype;
    n.Tt = Xk.getInstance();
    n.oa = k;
    n.Ma = l;
    n.C = k;
    n.za = k;
    n.nc = k;
    n.Af = k;
    n.xn = l;
    n.getId = function () {
        return this.oa || (this.oa = ":" + (this.Tt.kp++).toString(36));
    };
    n.B = function () {
        return this.C;
    };
    n.getParent = function () {
        return this.za;
    };
    n.Bk = function (a) {
        this.za && this.za != a && e(Error("Method not supported"));
        Yk.j.Bk.call(this, a);
    };
    n.ce = function () {
        this.C = this.hd.createElement("div");
    };
    n.Kd = function (a) {
        this.il(a);
    };
    n.il = function (a, b) {
        this.Ma && e(Error("Component already rendered"));
        this.C || this.ce();
        a ? a.insertBefore(this.C, b || k) : this.hd.Q.body.appendChild(this.C);
        (!this.za || this.za.Ma) && this.vf();
    };
    n.ud = function (a) {
        this.Ma && e(Error("Component already rendered"));
        if (a) {
            this.xn = j;
            if (!this.hd || this.hd.Q != nc(a)) this.hd = oc(a);
            this.C = a;
            this.vf();
        } else e(Error("Invalid element to decorate"));
    };
    n.vf = function () {
        this.Ma = j;
        Zk(this, function (a) {
            !a.Ma && a.B() && a.vf();
        });
    };
    n.yf = function () {
        Zk(this, function (a) {
            a.Ma && a.yf();
        });
        this.Bh && this.Bh.Wa();
        this.Ma = l;
    };
    n.r = function () {
        Yk.j.r.call(this);
        this.Ma && this.yf();
        this.Bh && (this.Bh.Fc(), delete this.Bh);
        Zk(this, function (a) {
            a.Fc();
        });
        !this.xn && this.C && P(this.C);
        this.za = this.C = this.Af = this.nc = k;
    };
    var Zk = function (a, b) {
        a.nc && D(a.nc, b, h);
    };
    Yk.prototype.removeChild = function (a, b) {
        if (a) {
            var c = t(a) ? a : a.getId(),
                a = this.Af && c ? (c in this.Af ? this.Af[c] : h) || k : k;
            if (c && a) {
                var d = this.Af;
                c in d && delete d[c];
                Oa(this.nc, a);
                b && (a.yf(), a.C && P(a.C));
                c = a;
                c == k && e(Error("Unable to set parent component"));
                c.za = k;
                Yk.j.Bk.call(c, k);
            }
        }
        a || e(Error("Child is not in parent component"));
        return a;
    };
    var $k = function (a, b, c, d, f) {
        this.hd = f || oc();
        this.width = a;
        this.height = b;
        this.ed = c || k;
        this.rk = d || k;
    };
    B($k, Yk);
    $k.prototype.xf = k;
    $k.prototype.Lh = 0;
    $k.prototype.Mh = 0;
    $k.prototype.ge = function () {
        return this.Ma
            ? jd(this.B())
            : "number" == typeof this.width && "number" == typeof this.height
              ? new M(this.width, this.height)
              : k;
    };
    var al = function (a) {
        var b = a.ge();
        return b ? b.width / (a.ed ? new M(a.ed, a.rk) : a.ge()).width : 0;
    };
    var bl = function () {};
    var cl = function (a, b) {
        this.vl = a;
        this.Ys = b || 1;
    };
    B(cl, bl);
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
        this.wk = l;
    };
    B(el, Sd);
    n = el.prototype;
    n.F = k;
    n.C = k;
    n.B = function () {
        return this.C;
    };
    n.addEventListener = function (a, b, c, d) {
        Id(this.C, a, b, c, d);
    };
    n.removeEventListener = function (a, b, c, d) {
        Ld(this.C, a, b, c, d);
    };
    n.r = function () {
        el.j.r.call(this);
        Pd(this.C);
    };
    var fl = function (a, b, c, d) {
        el.call(this, a, b);
        a = this.F;
        b = this.B();
        c
            ? (b.setAttribute("stroke", c.Pk()),
              (c = c.getWidth()),
              t(c) && -1 != c.indexOf("px")
                  ? b.setAttribute("stroke-width", parseFloat(c) / al(a))
                  : b.setAttribute("stroke-width", c))
            : b.setAttribute("stroke", "none");
        this.fill = d;
        c = this.B();
        d instanceof cl
            ? (c.setAttribute("fill", d.Pk()), c.setAttribute("fill-opacity", d.Ys))
            : c.setAttribute("fill", "none");
    };
    B(fl, el);
    fl.prototype.fill = k;
    var gl = function (a, b) {
        el.call(this, a, b);
    };
    B(gl, el);
    var hl = function (a, b, c, d) {
        fl.call(this, a, b, c, d);
    };
    B(hl, fl);
    var il = function (a, b) {
        el.call(this, a, b);
    };
    B(il, gl);
    il.prototype.clear = function () {
        Bc(this.B());
    };
    il.prototype.setSize = function (a, b) {
        var c = this.B(),
            d = { width: a, height: b },
            f;
        for (f in d) c.setAttribute(f, d[f]);
    };
    var jl = function (a, b, c, d) {
        fl.call(this, a, b, c, d);
    };
    B(jl, hl);
    var kl = function (a, b, c, d, f) {
            $k.call(this, a, b, c, d, f);
            this.fd = {};
            this.$j = F && !G(526);
            this.$c = new Vk(this);
        },
        ll;
    B(kl, $k);
    var ml = 0,
        nl = function (a, b, c) {
            a = a.hd.Q.createElementNS("http://www.w3.org/2000/svg", b);
            if (c) for (var d in c) a.setAttribute(d, c[d]);
            return a;
        };
    n = kl.prototype;
    n.ie = function (a, b) {
        (b || this.xf).B().appendChild(a.B());
    };
    n.ce = function () {
        var a = nl(this, "svg", { width: this.width, height: this.height, overflow: "hidden" }),
            b = nl(this, "g");
        this.yh = nl(this, "defs");
        this.xf = new il(b, this);
        a.appendChild(this.yh);
        a.appendChild(b);
        this.C = a;
        if (this.ed || this.Lh || this.Mh)
            (this.B().setAttribute("preserveAspectRatio", "none"),
                this.$j
                    ? this.wh()
                    : this.B().setAttribute(
                          "viewBox",
                          this.Lh + " " + this.Mh + " " + (this.ed ? this.ed + " " + this.rk : "")
                      ));
    };
    n.wh = function () {
        if (this.Ma && (this.ed || this.Lh || !this.Mh)) {
            var a = this.ge();
            0 == a.width
                ? (this.B().style.visibility = "hidden")
                : ((this.B().style.visibility = ""),
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
                      ));
        }
    };
    n.setSize = function (a, b) {
        hd(this.B(), a, b);
    };
    n.ge = function () {
        if (!ub) return this.Ma ? jd(this.B()) : kl.j.ge.call(this);
        var a = this.width,
            b = this.height,
            c = t(a) && -1 != a.indexOf("%"),
            d = t(b) && -1 != b.indexOf("%");
        if (!this.Ma && (c || d)) return k;
        var f, g;
        c && ((f = this.B().parentNode), (g = jd(f)), (a = (parseFloat(a) * g.width) / 100));
        d &&
            ((f = f || this.B().parentNode),
            (g = g || jd(f)),
            (b = (parseFloat(b) * g.height) / 100));
        return new M(a, b);
    };
    n.clear = function () {
        this.xf.clear();
        Bc(this.yh);
        this.fd = {};
    };
    var pl = function (a, b, c, d) {
            b = nl(a, "path", { d: ol(b) });
            c = new jl(b, a, c, d);
            a.ie(c, h);
        },
        ol = function (a) {
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
                        b.push(
                            "A",
                            d[0],
                            d[1],
                            0,
                            180 < Math.abs(f) ? 1 : 0,
                            0 < f ? 1 : 0,
                            d[4],
                            d[5]
                        );
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
        a || this.dispatchEvent("resize");
        if (this.$j) {
            var a = this.width,
                b = this.height;
            "string" == typeof a &&
                -1 != a.indexOf("%") &&
                "string" == typeof b &&
                -1 != b.indexOf("%") &&
                this.$c.G(ql(), "tick", this.wh);
            this.wh();
        }
    };
    kl.prototype.yf = function () {
        kl.j.yf.call(this);
        this.$j && this.$c.Gk(ql(), "tick", this.wh);
    };
    kl.prototype.r = function () {
        delete this.fd;
        delete this.yh;
        delete this.xf;
        kl.j.r.call(this);
    };
    var ql = function () {
        ll || ((ll = new Ud(400)), ll.start());
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
            b &&
                bb(b, function (a, b) {
                    d.setAttribute(b, a);
                });
            for (var f = 2; f < arguments.length; f++) d.appendChild(arguments[f]);
            return d;
        },
        ul = function (a, b) {
            var c;
            c = ":" + (Xk.getInstance().kp++).toString(36);
            b.setAttribute("result", c);
            a.appendChild(b);
            return c;
        };
    var vl = function (a, b) {
            var c = ul(a, tl("feGaussianBlur", { in: b, stdDeviation: "1.8" })),
                c = ul(
                    a,
                    tl(
                        "feDiffuseLighting",
                        { in: c, surfaceScale: "4", diffuseConstant: "1" },
                        tl("feDistantLight", {
                            azimuth: "270",
                            elevation: "15",
                            "lighting-color": "white"
                        })
                    )
                ),
                c = ul(a, tl("feComposite", { in: c, in2: b, operator: "in" }));
            return ul(
                a,
                tl("feComposite", { in2: c, in: b, operator: "arithmetic", k2: 1, k3: 0.5, k4: 0 })
            );
        },
        wl = function (a, b) {
            return b;
        },
        xl = function (a) {
            var b = tl("filter");
            D(a, function (a) {
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
        },
        zl = function (a) {
            Wa(a, function (a, c) {
                return (a in yl ? yl[a] : 1e3) - (c in yl ? yl[c] : 1e3);
            });
        },
        Al = function (a, b) {
            var c = "effects:" + (b ? b.join("|") : ""),
                d = c in a.fd ? a.fd[c] : k;
            if (d) return d;
            d = xl(b);
            if (0 < d.childNodes.length)
                if (c in a.fd) c = a.fd[c];
                else {
                    var f = "_svgdef_" + ml++;
                    d.setAttribute("id", f);
                    a.fd[c] = f;
                    a.yh.appendChild(d);
                    c = f;
                }
            else c = k;
            return c;
        },
        yl = { dropshadow: 1, bevel: 2, glow: 3 };
    var Bl = {
        Pg: function (a, b) {
            return new Qc(
                (a.width * b.left) / 100 + a.left,
                (a.height * b.top) / 100 + a.top,
                (a.width * b.width) / 100,
                (a.height * b.height) / 100
            );
        },
        bs: function (a, b) {
            return new L((a.width * b.x) / 100 + a.left, (a.height * b.y) / 100 + a.top);
        }
    };
    var Cl = function () {};
    Cl.prototype.hasFocus = l;
    Cl.prototype.F = k;
    Cl.prototype.B = function () {
        return this.F ? this.F.B() : k;
    };
    Cl.prototype.refresh = function () {};
    var Dl = function (a) {
        this.Qa = a;
    };
    B(Dl, Cl);
    Dl.prototype.refresh = function (a) {
        var b = El,
            c = Bl.Pg(a, Pk(this.Qa));
        this.F
            ? (this.F.setSize(c.width, c.height), this.F.clear())
            : ((this.F = new kl(c.width, c.height)), this.F.ce());
        var a = this.Qa.Pb || new Ek(),
            d = a.borderWidth,
            f = this.hasFocus && Ok(this.Qa),
            d = (d += f ? 1 : 0) ? new dl(d, f ? a.fgColor : a.borderColor) : k,
            b = new cl(a.bgColor, b(this.hasFocus, a.Jd));
        Fl(this.F, new Qc(0, 0, c.width, c.height), d, b);
        b = this.F.B();
        Gl(b, "annotation-shape");
        Gl(b, "annotation-popup-shape");
        Zc(b, c.left, c.top);
        hd(b, c.width, c.height);
        a.cd &&
            (zl(a.cd),
            (c = La(b.childNodes, function (a) {
                return "g" == a.tagName;
            })) && Hl(c, Al(this.F, a.cd)));
    };
    var Il = function (a) {
        this.Qa = a;
    };
    B(Il, Cl);
    Il.prototype.refresh = function (a) {
        var b = El,
            a = Bl.Pg(a, Pk(this.Qa));
        this.F
            ? (this.F.setSize(a.width, a.height), this.F.clear())
            : ((this.F = new kl(a.width, a.height)), this.F.ce());
        var c = this.Qa.Pb || new Ek();
        Fl(this.F, new Qc(0, 0, a.width, a.height), new dl(c.xk, c.bgColor), k);
        var d = this.F.B();
        Gl(d, "annotation-shape");
        d.style.opacity = b(this.hasFocus, c.Jd);
        Zc(d, a.left, a.top);
        hd(d, a.width, a.height);
    };
    var Jl = function (a) {
        this.Qa = a;
    };
    B(Jl, Cl);
    var Kl = { TOP: "t", LEFT: "l", BOTTOM: "b", RIGHT: "r", Xt: "i", wx: "" };
    Jl.prototype.refresh = function (a) {
        var b = El,
            c = this.Qa.Pb || new Ek(),
            d = c.borderWidth,
            f = this.hasFocus && Ok(this.Qa),
            d = (d += f ? 1 : 0) ? new dl(d, f ? c.fgColor : c.borderColor) : k,
            f = new cl(c.bgColor, b(this.hasFocus, c.Jd)),
            g = Bl.Pg(a, Pk(this.Qa)),
            i = Bl.bs(a, Qk(this.Qa)),
            b = g.ga();
        Rc(b, new Qc(i.x, i.y, 1, 1));
        this.F
            ? (this.F.setSize(b.width, b.height), this.F.clear())
            : ((this.F = new kl(b.width, b.height)), this.F.ce());
        g = new Qc(
            g.left < i.x ? 0 : g.left - i.x,
            g.top < i.y ? 0 : g.top - i.y,
            g.width,
            g.height
        );
        i = new L(i.x - b.left, i.y - b.top);
        this.Pn = (6 * a.height) / 100;
        Ll(this, this.F, g, i, d, f);
        a = this.F.B();
        Gl(a, "annotation-shape");
        Gl(a, "annotation-speech-shape");
        Zc(a, b.left, b.top);
        hd(a, b.width, b.height);
        c.cd &&
            (zl(c.cd),
            (a = La(a.childNodes, function (a) {
                return "g" == a.tagName;
            })) && Hl(a, Al(this.F, c.cd)));
    };
    var Ll = function (a, b, c, d, f, g) {
            var i = f ? f.getWidth() / 2 : 0,
                m = Ml(c, d),
                a = a.up(c, d, m),
                p = d.x,
                d = d.y,
                s = c.width,
                y = c.height,
                v = c.left,
                c = c.top,
                z = new Sk();
            z.moveTo(v + 5 + i, c + i);
            m == Kl.TOP && (z.lineTo(a.start, c + i), z.lineTo(p, d), z.lineTo(a.end, c + i));
            z.lineTo(v + s - 5 - i, c + i);
            z.arcTo(5, 5, -90, 90);
            m == Kl.LEFT &&
                (z.lineTo(v + s - i, a.start), z.lineTo(p, d), z.lineTo(v + s - i, a.end));
            z.lineTo(v + s - i, c + y - 5 - i);
            z.arcTo(5, 5, 0, 90);
            m == Kl.BOTTOM &&
                (z.lineTo(a.end, c + y - i), z.lineTo(p, d), z.lineTo(a.start, c + y - i));
            z.lineTo(v + 5 + i, c + y - i);
            z.arcTo(5, 5, 90, 90);
            m == Kl.RIGHT && (z.lineTo(v + i, a.end), z.lineTo(p, d), z.lineTo(v + i, a.start));
            z.lineTo(v + i, c + 5 + i);
            z.arcTo(5, 5, 180, 90);
            z.close();
            pl(b, z, f, g);
        },
        Ml = function (a, b) {
            var c = function (a, b) {
                    var c = (a.nl - a.gp) / (a.ml - a.fp + 1.0e-5);
                    return c * b.x + (a.nl - c * a.ml) >= b.y ? l : j;
                },
                d = b.x,
                f = b.y,
                g = a.width,
                i = a.height,
                m = a.left,
                p = a.top,
                s = new rl(m, p, m + g, p + i),
                y = new rl(m, p + i, m + g, p);
            return d >= m && d <= m + g && f >= p && f <= p + i
                ? Kl.Xt
                : c(s, b) && !c(y, b)
                  ? Kl.RIGHT
                  : !c(s, b) && !c(y, b)
                    ? Kl.TOP
                    : c(y, b) && !c(s, b)
                      ? Kl.LEFT
                      : Kl.BOTTOM;
        };
    Jl.prototype.up = function (a, b, c) {
        var d = this.Pn,
            f = 0,
            g = 0;
        if (c == Kl.TOP || c == Kl.BOTTOM) {
            if (a.width < d) return new sl(0, a.width);
            f = d;
            g = Oc(b.x - f / 2, 0, a.top + a.width - f);
        } else if (c == Kl.LEFT || c == Kl.RIGHT) {
            if (a.height < d) return new sl(0, a.height);
            f = d;
            g = Oc(b.y - f / 2, 0, a.left + a.height - f);
        }
        return new sl(g, g + f);
    };
    var Nl = function (a) {
        this.Qa = a;
    };
    B(Nl, Jl);
    Nl.prototype.up = function (a, b, c) {
        var d = this.Pn,
            f = 0,
            g = 0;
        if (c == Kl.TOP || c == Kl.BOTTOM) {
            if (a.width < d) return new sl(0, a.width);
            f = d;
            g =
                b.x <= a.top + a.width / 2
                    ? Math.max(a.top + a.width / 4 - f / 2, 0)
                    : Math.min(a.top + (3 * a.width) / 4 - f / 2, a.top + a.width - f);
        } else if (c == Kl.LEFT || c == Kl.RIGHT) {
            if (a.height < d) return new sl(0, a.height);
            f = d;
            g =
                b.y <= a.left + a.height / 2
                    ? Math.max(a.left + a.height / 4 - f / 2, 0)
                    : Math.min(a.left + (3 * a.height) / 4 - f / 2, a.left + a.height - f);
        }
        return new sl(g, g + f);
    };
    var Fl = function (a, b, c, d) {
            var f = new Sk(),
                g = c ? c.getWidth() / 2 + 1 : 0;
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
        },
        Gl = function (a, b) {
            var c = a.getAttribute("class"),
                c = c ? c.split(/\s+/) : [];
            -1 == c.indexOf(b) && (c.push(b), a.setAttribute("class", c.join(" ")));
        },
        Hl = function (a, b) {
            b && a.setAttribute("filter", "url(#" + b + ")");
        },
        El = function (a, b) {
            return a ? Math.max(b, 0.9) : b;
        };
    var Ol = function (a, b, c) {
        this.ii = a;
        this.al = 0;
        this.Yo = b;
        c && (this.No = c);
    };
    n = Ol.prototype;
    n.No = 70;
    n.bl = l;
    n.start = function (a) {
        this.Lo = x();
        this.al = a;
        this.Ko = this.Lo + this.al;
        this.bl = j;
        var a = this.ii,
            b = a.getAttribute("class"),
            b = b ? b.split(/\s+/) : [],
            c = b.indexOf("hid");
        -1 != c && (b.splice(c, 1), a.setAttribute("class", b.join(" ")));
        Ch(this.fl);
        this.fl = Bh(u(this.il, this), this.No);
    };
    n.stop = function () {
        this.bl = l;
        Gl(this.ii, "hid");
        this.fl && Ch(this.fl);
    };
    n.il = function () {
        if (this.bl) {
            var a = x(),
                b;
            b = a >= this.Ko ? 0 : 1 - (a - this.Lo) / this.al;
            var c = O("countdowntimer-diminishing-pieslice", this.ii),
                d = parseInt(this.ii.getAttribute("width"), 10),
                f = new Sk(),
                g = d / 2 - 5;
            f.moveTo(d / 2, d / 2);
            f.lineTo(d / 2, 5);
            f.arcTo(g, g, -90, 360 * -b);
            f.lineTo(d / 2, d / 2);
            f.close();
            c.setAttribute("d", ol(f));
            a >= this.Ko && (this.stop(), this.Yo && this.Yo());
        }
    };
    var Pl = function () {
        var a = new Ng();
        a && Mg(a) && ((this.Bd = new Pg(a)), (this.Gd = new Pg(a)));
    };
    Pl.prototype.Gd = k;
    Pl.prototype.Bd = k;
    Pl.prototype.getVolume = function () {
        var a = { volume: 100, muted: l, nonNormalized: 100 };
        if (this.Gd) {
            var b = {};
            try {
                b = this.Gd.get("yt-player-volume") || {};
            } catch (c) {
                this.Gd.remove("yt-player-volume");
            }
            a.volume = isNaN(b.volume) ? 100 : Oc(b.volume, 0, 100);
            a.nonNormalized = isNaN(b.nonNormalized) ? a.volume : b.nonNormalized;
            a.muted = b.muted == h ? l : b.muted;
        }
        return a;
    };
    var Z = q("yt.timing") || {};
    A("yt.timing", Z);
    Z.Zt = 0;
    Z.mp = 0;
    Z.mb = function (a, b) {
        var c = Z.timer || {};
        c[a] = b ? b : x();
        Z.timer = c;
    };
    Z.info = function (a, b) {
        var c = Z.info_args || {};
        c[a] = b;
        Z.info_args = c;
    };
    Z.ug = function () {
        var a = zh("TIMING_ACTION"),
            b = Z.timer || {},
            c = Z.info_args || {},
            d = b.start,
            f = "",
            g = [],
            i = [];
        delete b.start;
        Z.srt && (f = "&srt=" + Z.srt);
        b.aft && b.plev && (b.aft = Math.min(b.aft, b.plev));
        for (var m in b) g.push(m + "." + Math.round(b[m] - d));
        for (m in c) i.push(m + "=" + c[m]);
        b.vr && b.gv && g.push("vl." + Math.round(b.vr - b.gv));
        !b.aft && b.vr && b.cl
            ? b.cl > b.vr
                ? g.push("aft." + Math.round(b.cl - d))
                : g.push("aft." + Math.round(b.vr - d))
            : !b.aft && b.vr
              ? g.push("aft." + Math.round(b.vr - d))
              : b.aft || g.push("aft." + Math.round(b.ol - d));
        qf(
            [
                "https:" == window.location.protocol
                    ? "https://gg.google.com/csi"
                    : "http://csi.gstatic.com/csi",
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
    Z.au = function () {
        var a = zh("TIMING_ACTION"),
            b = Z.timer || {};
        a &&
            b.start &&
            (Z.wff && -1 != a.indexOf("ajax") && b.vr && b.cl
                ? Z.ug()
                : Z.wff && -1 == a.indexOf("ajax") && b.vr
                  ? Z.ug()
                  : !Z.wff && (b.ol || b.aft) && Z.ug());
    };
    Z.Kx = function () {
        Z.mb("ol");
        Z.au();
    };
    Z.Lx = function (a) {
        var b = ++Z.Zt;
        "undefined" != typeof a && 4 > a && Z.mp++;
        4 == Z.mp && Z.mb("tn_c4");
        (1 != b && 5 != b && 10 != b && 20 != b && 30 != b) || Z.mb("tn" + b);
    };
    var Ql = function (a, b) {
        b || (b = {});
        var c = window,
            d = "undefined" != typeof a.href ? a.href : "" + a,
            f = b.target || a.target,
            g = [],
            i;
        for (i in b)
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
        g = g.join(",");
        if (b.noreferrer) {
            if ((c = c.open("", f, g)))
                (E && -1 != d.indexOf(";") && (d = "'" + d.replace(/'/g, "%27") + "'"),
                    (c.opener = k),
                    F
                        ? (c.location.href = d)
                        : ((d = xa(d)),
                          c.document.write(
                              '<META HTTP-EQUIV="refresh" content="0; url=' + d + '">'
                          ),
                          c.document.close()));
        } else c = c.open(d, f, g);
        return c;
    };
    var Rl = function (a, b) {
        var c = b || {};
        c.target = c.target || a.target || "YouTube";
        c.width = c.width || 600;
        c.height = c.height || 600;
        c = Ql(a, c);
        if (!c) return j;
        c.opener || (c.opener = window);
        c.focus();
        return l;
    };
    var Sl = q("yt.prefs.UserPrefs.prefs_") || {};
    A("yt.prefs.UserPrefs.prefs_", Sl);
    var Tl = q("yt.pubsub.instance_") || new Q();
    Q.prototype.subscribe = Q.prototype.e;
    Q.prototype.unsubscribeByKey = Q.prototype.ji;
    Q.prototype.publish = Q.prototype.c;
    Q.prototype.clear = Q.prototype.clear;
    A("yt.pubsub.instance_", Tl);
    var Ul = function (a) {
            var b = q("yt.pubsub.instance_");
            b &&
                b.subscribe(
                    "panelhidden",
                    function () {
                        var b = arguments;
                        Ah(function () {
                            a.apply(o, b);
                        }, 0);
                    },
                    h
                );
        },
        Vl = function (a, b) {
            var c = q("yt.pubsub.instance_");
            c && c.publish.apply(c, arguments);
        };
    E || (ub && G("1.9.3"));
    new Q();
    !document.getElementById &&
        document.all &&
        (document.getElementById = function (a) {
            return document.all[a];
        });
    var Wl = function () {
        this.Of = {};
    };
    B(Wl, Kh);
    aa(Wl);
    Wl.prototype.ye = "expander";
    Wl.prototype.ag = function () {
        this.addBehavior("click", this.sl, "head");
        this.addBehavior("keypress", this.tl, "head");
    };
    Wl.prototype.sl = function (a) {
        Xl(this, a);
    };
    Wl.prototype.tl = function (a, b, c) {
        c && 13 == c.keyCode && Xl(this, a);
    };
    var Xl = function (a, b) {
        var c = Lc(b, Y(a));
        c && (gc(c, Y(a, "collapsed")), a.xi(c, "expander-action"));
    };
    var Yl = ["left", "right", "center"],
        Zl = {
            id: 0,
            Ff: 0,
            Ah: 7,
            Ch: 50,
            uu: 80,
            Eh: 95,
            jc: 15,
            ok: 100,
            isVisible: j,
            textAlign: Yl[2],
            Qc: 0,
            backgroundColor: "#080808",
            ph: "#fff",
            opacity: 0.8
        },
        $l = { id: 99, Ff: 1, Ah: 0, Ch: 5, Eh: 7, jc: 2, ok: 32, textAlign: Yl[0] };
    var am = function (a) {
        this.mi = a.kk;
        this.Sf = a.Ff;
        this.gb = a.gb || this.gb;
    };
    n = am.prototype;
    n.mi = 0;
    n.Sf = 0;
    n.gb = 0;
    n.Ja = function () {
        return this.mi;
    };
    n.dd = function () {
        return this.Sf;
    };
    n.toString = function () {
        return this.mi + ", " + this.gb;
    };
    var bm = function (a) {
        am.call(this, a);
        this.hi = a.text || this.hi;
        this.Zg = a.gk || this.Zg;
        this.ie = a.params.append || this.ie;
        this.Wo = a.params.row || this.Wo;
        this.Vo = a.params.tt || this.Vo;
    };
    B(bm, am);
    n = bm.prototype;
    n.hi = "";
    n.ie = l;
    n.Wo = 0;
    n.Vo = 0;
    n.Zg = 0;
    n.Ub = function () {
        return this.hi;
    };
    n.toString = function () {
        return this.mi + ", " + this.gb + ": " + this.hi;
    };
    var cm = function (a) {
            var b = (a.firstChild && a.firstChild.nodeValue) || "",
                c = 1e3 * parseFloat(a.getAttribute("start") || 0);
            a.getAttribute("t") && (c = parseInt(a.getAttribute("t"), 10));
            var d = 1e3 * parseFloat(a.getAttribute("dur") || 0);
            a.getAttribute("d") && (d = parseFloat(a.getAttribute("d")));
            var f = parseInt(a.getAttribute("w"), 10) || 0,
                b = { kk: c, gb: d, text: b, gk: f, Ff: 5, params: {} };
            a.getAttribute("r") && (b.params.row = parseInt(a.getAttribute("r"), 10));
            a.getAttribute("c") && (b.params.tt = parseInt(a.getAttribute("c"), 10));
            a.getAttribute("append") && ((b.Ff = 6), (b.params.append = j));
            return new bm(b);
        },
        dm = function (a) {
            am.call(this, a);
            this.id = a.gk || this.id;
            this.params = a.params;
        };
    B(dm, am);
    dm.prototype.id = 0;
    dm.prototype.params = k;
    dm.prototype.Rc = "";
    dm.prototype.dh = l;
    var em = function () {
        return new dm({ kk: -2147483648, gb: 4294967295, params: Zl });
    };
    var fm = function (a) {
        this.mh = [];
        this.nh = [];
        this.Gf = {};
        if (a && (a = fj(a)) && a.firstChild)
            switch (((this.ad = a), this.ad.firstChild.tagName)) {
                case "timedtext":
                    for (var a = this.ad.firstChild.childNodes, b = 0, c = a.length; b < c; b++)
                        switch (a[b].tagName) {
                            case "window":
                                var d = a[b],
                                    f = parseInt(d.getAttribute("id"), 10),
                                    g = h;
                                a: {
                                    var i = this.Gf[f];
                                    if (!d.getAttribute("t") && !d.getAttribute("start")) g = k;
                                    else {
                                        g = parseInt(d.getAttribute("t"), 10);
                                        d.getAttribute("start") &&
                                            (g = 1e3 * parseFloat(d.getAttribute("start")));
                                        i && (i.Ja() + i.gb >= g ? (i.gb = g) : (i = k));
                                        switch (d.getAttribute("op")) {
                                            case "kill":
                                                g = k;
                                                break a;
                                            case "define":
                                                i = k;
                                        }
                                        i ? (i.vu = j) : (i = em());
                                        var m = {};
                                        w(m, i ? i.params : Zl);
                                        d.getAttribute("id") && (m.id = d.getAttribute("id"));
                                        d.getAttribute("op") && (m.wu = d.getAttribute("op"));
                                        d.getAttribute("rc") &&
                                            (m.jc = parseInt(d.getAttribute("rc"), 10));
                                        d.getAttribute("cc") &&
                                            (m.ok = parseInt(d.getAttribute("cc"), 10));
                                        d.getAttribute("ap") &&
                                            ((i = parseInt(d.getAttribute("ap"), 10)),
                                            (m.Ah = 0 > i || 8 < i ? 7 : i));
                                        d.getAttribute("ah") &&
                                            (m.Ch = parseInt(d.getAttribute("ah"), 10));
                                        d.getAttribute("av") &&
                                            (m.Eh = parseInt(d.getAttribute("av"), 10));
                                        d.getAttribute("id") &&
                                            (m.id = parseInt(d.getAttribute("id"), 10) || 0);
                                        d.getAttribute("vs") &&
                                            (m.isVisible = Boolean(d.getAttribute("vs")));
                                        d.getAttribute("ju") &&
                                            (m.textAlign = Yl[parseInt(d.getAttribute("ju"), 10)]);
                                        d.getAttribute("pd") &&
                                            ((m.Qc = 1),
                                            0 == parseInt(d.getAttribute("pd"), 10) && (m.Qc = 0));
                                        d.getAttribute("bc") &&
                                            (m.backgroundColor = parseInt(
                                                d.getAttribute("bc"),
                                                16
                                            ));
                                        d.getAttribute("bo") &&
                                            (m.opacity = parseInt(d.getAttribute("bo"), 10) / 100);
                                        d.getAttribute("fc") &&
                                            (m.ph = parseInt(d.getAttribute("fc"), 16));
                                        d.getAttribute("sd") &&
                                            (m.Ij = parseInt(d.getAttribute("sd"), 10));
                                        i =
                                            parseInt(d.getAttribute("d"), 10) ||
                                            1e3 * parseFloat(d.getAttribute("dur")) ||
                                            2147483647;
                                        d = {
                                            kk: g,
                                            gb: i,
                                            params: m,
                                            gk: parseInt(d.getAttribute("id"), 10)
                                        };
                                        g = new dm(d);
                                    }
                                }
                                this.Gf[f] = g;
                                this.nh.push(g);
                                break;
                            case "text":
                                ((f = cm(a[b])),
                                    this.mh.push(f),
                                    (d = f.Zg),
                                    this.Gf[d] &&
                                        ((d = this.Gf[d]),
                                        (f = f.Ub()),
                                        "" != d.Rc && (d.dh = j),
                                        (d.Rc += f)));
                        }
                    break;
                default:
                    this.nh.push(em());
                    a = this.ad.firstChild.childNodes;
                    b = 0;
                    for (c = a.length; b < c; b++) this.mh.push(cm(a[b]));
            }
    };
    fm.prototype.mh = k;
    fm.prototype.nh = k;
    fm.prototype.Gf = k;
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
    n = gm.prototype;
    n.Gh = k;
    n.bb = k;
    n.ta = k;
    n.oa = k;
    n.En = l;
    n.Cf = l;
    n.pk = l;
    n.oo = 1;
    n.getName = function () {
        return this.ta;
    };
    n.getFormat = function () {
        return this.oo;
    };
    var hm = function (a) {
        var b = [a.Gh];
        if (a.bb) {
            var c = "asr" == a.bb ? Dh("HTML5_SUBS_TRANSCRIBED") : a.bb;
            b.push(" (", c, ")");
        }
        a.ta && b.push(" - ", a.ta);
        a.sc && b.push(" >> ", a.sc.Xh);
        return b.join("");
    };
    gm.prototype.toString = function () {
        var a = [this.Uc, ": ", this.ta, " (", this.bb, ")"];
        this.sc && a.push(" >> ", this.sc.Xh);
        return a.join("");
    };
    var im = function (a) {
        this.Ef = a.languageCode;
        this.Xh = a.languageName;
        this.cp = a.languageOriginal;
        this.id = a.id;
        this.Cf = a.is_default;
    };
    n = im.prototype;
    n.Ef = k;
    n.Xh = k;
    n.cp = k;
    n.id = k;
    n.Cf = l;
    var jm = function (a) {
        this.Rk = [];
        this.ll = [];
        this.gi = [];
        if (a && a.firstChild) {
            this.ad = a;
            for (var a = this.ad.getElementsByTagName("track"), b = a.length, c = 0; c < b; c++) {
                var d = parseInt(a[c].getAttribute("formats"), 10) || 1,
                    f = a[c].getAttribute("lang_code"),
                    g = a[c].getAttribute("lang_translated"),
                    i = a[c].getAttribute("name"),
                    m = a[c].getAttribute("kind") || "",
                    p = a[c].getAttribute("id"),
                    s = "true" == a[c].getAttribute("lang_default"),
                    y = "true" == a[c].getAttribute("cantran");
                this.Df(
                    new gm({
                        format: d,
                        languageCode: f,
                        languageName: g,
                        name: i,
                        kind: m,
                        id: p,
                        is_servable: j,
                        is_default: s,
                        is_translateable: y
                    })
                );
            }
            a = this.ad.getElementsByTagName("target");
            b = a.length;
            for (c = 0; c < b; c++)
                ((d = a[c].getAttribute("lang_code")),
                    (f = a[c].getAttribute("lang_translated")),
                    (g = a[c].getAttribute("lang_original")),
                    (i = a[c].getAttribute("id")),
                    (m = "true" == a[c].getAttribute("lang_default")),
                    this.ll.push(
                        new im({
                            languageCode: d,
                            languageName: f,
                            languageOriginal: g,
                            id: i,
                            is_default: m
                        })
                    ));
        }
    };
    n = jm.prototype;
    n.ad = k;
    n.Rk = k;
    n.ll = k;
    n.gi = k;
    n.ri = -1;
    n.Hf = function () {
        return this.gi;
    };
    n.Kh = function () {
        return this.Rk;
    };
    n.Nh = function () {
        return this.ri;
    };
    n.xh = function () {
        return this.ll;
    };
    n.Df = function (a) {
        switch (a.bb) {
            case "asr":
                this.Rk.push(a);
                break;
            default:
                if (a.Cf || 0 > this.ri) this.ri = this.gi.length;
                this.gi.push(a);
        }
    };
    var km = function (a, b, c, d) {
        this.vc = a;
        c
            ? (this.vc = ef(this.vc, { hl: c }))
            : ((a = bf(this.vc).hl || ""),
              (a = a.split("_").join("-")),
              (this.vc = ef(this.vc, { hl: a })));
        this.Qk = b;
        this.bp = !!d;
    };
    n = km.prototype;
    n.vc = "";
    n.Qk = k;
    n.bp = l;
    n.ri = 0;
    n.wc = k;
    n.Hf = function () {
        return this.wc.Hf();
    };
    n.Kh = function () {
        return this.wc.Kh();
    };
    n.xh = function () {
        return this.wc.xh();
    };
    n.Nh = function () {
        return this.wc.Nh();
    };
    n.Df = function (a) {
        this.wc.Df(a);
    };
    var mm = function (a, b) {
            var c = a.wc.Nh();
            0 > c || lm(a, a.wc.Hf()[c], b);
        },
        lm = function (a, b, c) {
            var d = a.vc,
                f = {
                    v: a.Qk,
                    type: "track",
                    lang: b.Uc,
                    name: b.getName(),
                    kind: b.bb,
                    fmt: b.getFormat()
                };
            b.sc && (f.tlang = b.sc.Ef);
            d = ef(d, f);
            eg.info("Loading caption track from: " + d);
            a = u(function (a) {
                a = new fm(a.responseText);
                c(a, b);
            }, a);
            hf(d, a);
        },
        nm = function (a, b) {
            var c = a.vc,
                d = { type: "list", tlangs: 1, v: a.Qk, fmts: Number(j) };
            a.bp && (d.asrs = 1);
            c = ef(c, d);
            eg.info("Getting track list from: " + c);
            d = u(function (a) {
                this.wc = new jm(a.responseXML);
                b();
            }, a);
            hf(c, d);
        };
    new Q();
    var om = function (a) {
            if (!a) return l;
            var a = a.replace(/https?:\/\//g, ""),
                b = a.split("/", 1);
            if (!b || 1 > b.length || !b[0]) return l;
            b = b[0].toLowerCase().split(".").reverse();
            return 2 > b.length
                ? l
                : (("com" == b[0] && "youtube" == b[1]) || ("be" == b[0] && "youtu" == b[1])) &&
                      -1 == a.indexOf("/redirect?");
        },
        pm = function (a, b) {
            if ("new" == a.target) return -1;
            var c = Ak(a);
            if (!c) return -1;
            var c = c.replace(/https?:\/\//g, ""),
                d;
            if (!(d = !om(c)))
                ((d = Xe(c)[5] || k),
                    (d = ((d && decodeURIComponent(d)) || "").split("/")),
                    (d = "/" + (1 < d.length ? d[1] : "")),
                    (d = "/watch" != d));
            if (d) return -1;
            d = bf(c);
            if (!d || d.v != b.m || d.list || d.p) return -1;
            c = c.split("#", 2);
            if (!c || 2 > c.length) return -1;
            (c = af(c[1])) && c.t
                ? ((d = c.t),
                  (c = 0),
                  -1 != d.indexOf("h") && ((d = d.split("h")), (c = 3600 * d[0]), (d = d[1])),
                  -1 != d.indexOf("m") && ((d = d.split("m")), (c = 60 * d[0] + c), (d = d[1])),
                  -1 != d.indexOf("s") ? ((d = d.split("s")), (c = 1 * d[0] + c)) : (c = 1 * d + c))
                : (c = -1);
            return c;
        };
    var qm = function (a) {
            this.$ = a;
            this.an = {};
        },
        sm = function (a, b) {
            var c = {};
            c["iv-event"] = b;
            c["a-id"] = a.id;
            c["a-type"] = rm(a);
            var d = a.getUrl();
            d && ((c["l-type"] = d.type), (c.link = escape(Ak(d))));
            return c;
        },
        rm = function (a) {
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
        this.om = k;
        this.Ve = new Ge();
        this.gc = this.U = this.A = k;
    };
    n = tm.prototype;
    n.n = k;
    n.A = k;
    n.qb = k;
    n.ma = k;
    n.b = k;
    n.$ = k;
    n.U = k;
    n.gc = k;
    n.Dq = function () {
        this.$.c("closed", this.n);
    };
    n.Cq = function () {
        this.$.c("click", this.n);
    };
    n.lj = function () {
        this.ma && X(this.ma);
        this.qb && ld(this.qb, 1);
        this.U && ((this.U.hasFocus = j), ld(this.A, um(this) ? 1 : 0), this.U.refresh(this.b.Gc));
        this.$.c("mouseover", this.n);
    };
    n.kj = function () {
        this.ma && uh(this.ma);
        this.qb && (this.qb.style.opacity = 0.6);
        this.U && ((this.U.hasFocus = l), ld(this.A, um(this) ? 1 : 0), this.U.refresh(this.b.Gc));
        this.$.c("mouseout", this.n);
    };
    var wm = function (a) {
            if (a.A || a.U) {
                var b;
                if (a.gc) {
                    b = Pk(a.gc);
                    var c = Pk(a.n);
                    !b || !c ? (b = k) : ((c.top += b.top), (c.left += b.left), (b = c));
                } else b = Pk(a.n);
                if ((c = b)) {
                    b = a.b.Gc;
                    var d = jh(a.b);
                    if (a.A) {
                        c = Bl.Pg(b, c);
                        hd(a.A, c.width, c.height);
                        Zc(a.A, c.left, c.top);
                        d = new Pc(
                            (vm(a).top * d.height) / 100,
                            (vm(a).right * d.width) / 100,
                            (vm(a).bottom * d.height) / 100,
                            (vm(a).left * d.width) / 100
                        );
                        a.qb && (d.right += (1.5 * b.height) / 100);
                        a.A.style.padding =
                            d.top + "px " + d.right + "px " + d.bottom + "px " + d.left + "px";
                        "label" == a.n.style && a.gf && (a.gf.style.padding = a.A.style.padding);
                        if (a.qb) {
                            d = (4.2 * b.height) / 100;
                            d = new M(d, d);
                            hd(a.qb, d);
                            if ("highlight" == a.n.type)
                                var f = (1.5 * b.height) / 100,
                                    d = new L(c.width - d.width - f, c.height - d.height - f);
                            else
                                d = new L(
                                    c.width - d.width - (3 * b.height) / 100,
                                    (c.height - d.height) / 2
                                );
                            Zc(a.qb, d);
                        }
                        if (a.ma) {
                            var g = (6 * b.height) / 100;
                            hd(a.ma, new M(g, g));
                            var d = a.ma,
                                f = jd(a.ma),
                                g = g / 2,
                                i = b.left + b.width - (c.left + c.width) >= g,
                                m = c.top - b.top >= g;
                            Zc(
                                d,
                                i && m
                                    ? new L(c.width - g, -g)
                                    : i
                                      ? new L(
                                            c.width - g,
                                            c.height > 3 * g + f.height ? g : c.height - g
                                        )
                                      : m
                                        ? new L(
                                              c.width > 3 * g + f.width
                                                  ? c.width - g - f.width
                                                  : -g,
                                              -g
                                          )
                                        : c.width / b.width > c.height / b.height
                                          ? new L(
                                                c.width > 3 * g + f.width
                                                    ? c.width - g - f.width
                                                    : -g,
                                                c.height - g
                                            )
                                          : new L(
                                                -g,
                                                c.height > 3 * g + f.height ? g : c.height - g
                                            )
                            );
                        }
                    }
                    a.U && a.U.refresh(b);
                    b = a.A;
                    c = a.n.Pb || new Ek();
                    d = a.b.Gc;
                    b.style.color = "highlightText" == a.n.style ? c.Dj : c.fgColor;
                    b.style.fontSize = (d.height * c.Ej) / 100 + "px";
                    if ("title" == a.n.style || "highlightText" == a.n.style)
                        b.style.textAlign = "center";
                    c.fontWeight && (b.style.fontWeight = c.fontWeight);
                    if (a.A)
                        for (b = 10; a.A.scrollHeight > a.A.offsetHeight && b; ) {
                            c = wd(a.A);
                            if (5 > c) break;
                            c--;
                            a.A.style.fontSize = c + "px";
                            b--;
                        }
                }
            }
        },
        vm = function (a) {
            var b = a.n.Pb;
            return b.padding
                ? b.padding
                : new Pc(
                      "speech" == a.n.style ? 1.6 : 0.8,
                      "speech" == a.n.style ? 1.6 : 0.8,
                      "speech" == a.n.style ? 1.6 : 0.8,
                      "speech" == a.n.style ? 1.6 : 0.8
                  );
        };
    tm.prototype.show = function () {
        if (this.b.Gc) {
            var a = this.n.Pb;
            if (
                !(
                    (a && 0 == a.Jd) ||
                    "title" == this.n.style ||
                    "highlightText" == this.n.style ||
                    "pause" == this.n.type
                ) &&
                !this.U
            )
                if ((a = this.b.Gc)) {
                    var b = k;
                    if ("popup" == this.n.style) b = new Dl(this.n);
                    else if ("anchored" == this.n.style) b = new Jl(this.n);
                    else if ("speech" == this.n.style) b = new Nl(this.n);
                    else if ("label" == this.n.style || "highlight" == this.n.type)
                        b = new Il(this.n);
                    b && (b.refresh(a), (this.U = b), (a = b.B()), uh(a), this.rm(a));
                }
            if (!this.A) {
                this.A = xc("div", ["annotation", "hid"]);
                this.n.Ug &&
                    ("label" == this.n.style
                        ? ((a = this.n.Pb || new Ek()),
                          (this.gf = xc("div", ["label-text"])),
                          (this.gf.style.backgroundColor = a.bgColor),
                          Ec(this.gf, this.n.Ug),
                          this.A.appendChild(this.gf))
                        : Ec(this.A, this.n.Ug));
                ie(this.A, "annotation_id", this.n.id);
                this.rm(this.A);
                this.Ve.G(this.A, "mouseover", u(this.lj, this));
                this.Ve.G(this.A, "mouseout", u(this.kj, this));
                this.Ve.G(this.A, "click", u(this.Cq, this));
                if (Ok(this.n)) {
                    if ((a = this.n.getUrl())) this.A.title = Ak(a);
                    this.qb = xc("span", "annotation-link-icon");
                    this.A.appendChild(this.qb);
                }
                a = O("annotation-close-button-container", h);
                a = oe(N(a));
                a.removeAttribute("id");
                this.ma = a;
                ie(this.ma, "annotation_id", this.n.id);
                this.Ve.G(this.ma, "click", u(this.Dq, this));
                this.A.appendChild(this.ma);
            }
            X(this.A);
            ld(this.A, um(this) ? 1 : 0);
            wm(this);
            this.U && X(this.U.B());
        }
    };
    tm.prototype.wi = function () {
        uh(this.A);
        this.U && uh(this.U.B());
    };
    var um = function (a) {
        return "label" != a.n.style || a.U.hasFocus;
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
        var a = a.getRootNode(),
            b = xm;
        this.om = O(b.Vq, a);
        var c = O(b.Wq, this.om);
        this.Xq = O(b.Uq, a);
        S(this.Xq, "click", u(this.$q, this));
        this.pubsub.e("onResize", u(this.sj, this));
        this.pubsub.e("onStateChange", u(this.ar, this));
        this.pubsub.e("mouseover", u(this.lj, this));
        this.pubsub.e("mouseout", u(this.kj, this));
        this.pubsub.e("click", u(this.Yq, this));
        this.pubsub.e("closed", u(this.Zq, this));
        this.ij = new Ol(c, u(this.Qi, this));
    };
    B(ym, V);
    var xm = { Uq: "html5-annotations-button", Vq: "video-annotations", Wq: "countdowntimer" };
    n = ym.prototype;
    n.W = "iv";
    n.Sj = l;
    n.bn = j;
    n.loaded = l;
    n.Ya = l;
    var zm = function (a) {
        return "leanback" == a.getEnvironmentData().eventLabel
            ? l
            : zg(a.getVideoData(), "iv3_module");
    };
    n = ym.prototype;
    n.zb = function () {
        return zm(this.s);
    };
    n.create = function () {
        ym.j.create.call(this);
        this.a = this.s.getVideoData();
        this.lr() && this.load();
    };
    n.destroy = function () {
        this.unload();
        ym.j.destroy.call(this);
    };
    n.lr = function () {
        return 1 == this.a.hm;
    };
    n.$q = function () {
        this.loaded || this.Ya ? this.unload() : this.load();
    };
    n.sj = function () {
        for (var a in this.ah) wm(this.ah[a]);
    };
    n.ar = function (a) {
        this.bn = a.state.pf ? j : l;
        a.Zm.yi && !a.state.yi && this.ij.stop();
    };
    n.load = function () {
        ym.j.load.call(this);
        var a = { format: "XML", method: "GET", Mg: { video_id: this.a.m }, nm: u(this.xq, this) };
        this.Ya = j;
        kf(this.b.Db + "annotations/read2", a);
    };
    n.unload = function () {
        this.qg.k({ "iv-event": 1 });
        this.Qi();
        this.Wd();
        for (var a in this.Za) delete this.Za[a];
        for (a in this.Ic) {
            var b = this.Ic[a];
            b.Ve.Wa();
            b.A && P(b.A);
            b.U && b.U.B() && P(b.U.B());
            delete this.Ic[a];
        }
        this.loaded = this.Ya = l;
        this.ej = {};
        this.Te = {};
        this.Ic = {};
        this.Za = {};
        ym.j.unload.call(this);
    };
    var Am = function (a, b) {
        for (var c = {}, d = 0; d < b.attributes.length; d++) {
            var f = b.attributes[d];
            c[f.name] = f.nodeValue;
        }
        for (d = 0; d < b.childNodes.length; d++)
            if (((f = b.childNodes[d]), f.tagName)) {
                var g;
                c[f.tagName] ? (g = c[f.tagName]) : ((g = []), (c[f.tagName] = g));
                f.childNodes && 1 == f.childNodes.length && 3 == f.childNodes[0].nodeType
                    ? g.push(f.childNodes[0].nodeValue)
                    : g.push(Am(a, f));
            }
        return c;
    };
    ym.prototype.xq = function (a) {
        if (this.Ya && !this.loaded) {
            this.Ya = l;
            var b = a.responseXML ? a.responseXML.getElementsByTagName("annotations") : k;
            if (!gf(a) || !b) eg.log(H, "Could not obtain annotation JSON from server.");
            else {
                a = b[0].getElementsByTagName("annotation");
                for (b = 0; b < a.length; b++) {
                    var c = Am(this, a[b]),
                        d = new Lk();
                    try {
                        d.Na(c);
                    } catch (f) {
                        eg.log(H, "Could not parse object from server.");
                        continue;
                    }
                    this.Za[d.id] = d;
                }
                for (var g in this.Za) {
                    a = this.Za[g];
                    b = a;
                    c = h;
                    b: if ("highlight" == b.type) c = j;
                    else {
                        if ("text" == b.type)
                            for (c in ((c = h), Mk))
                                if (b.style == Mk[c]) {
                                    c = j;
                                    break b;
                                }
                        c = l;
                    }
                    c
                        ? ((c = new tm(b, u(this.appendToVideoContent, this), this.b, this.pubsub)),
                          (b = this.Ic[b.id] = c))
                        : (b = k);
                    if (b && a.ya && a.ya.gc) {
                        c = a.ya.gc;
                        if ((d = this.Za[c])) b.gc = d;
                        this.Te[c] = a.id;
                    }
                }
                I(this.s.getRootNode(), this.W + "-loaded");
                this.loaded = j;
                g = [];
                for (var i in this.Za)
                    ((a = this.Za[i]),
                        a.ya &&
                            a.ya &&
                            Kk(a.ya) &&
                            ((b = Kk(a.ya)),
                            (a = 1e3 * b.start),
                            (b = 1e3 * b.end),
                            0 == a && (a++, b++),
                            a == b && b++,
                            (a = new Ef(a, b, { id: i })),
                            g.push(a)));
                this.addCueRange.apply(this, g);
            }
        }
    };
    ym.prototype.rb = function (a) {
        ym.j.rb.call(this, a);
        a = a.getId();
        if (!this.ej[a]) {
            var b = this.Za[a];
            if ("pause" == b.type) {
                if (this.bn && (a = Rk(b)) && a.duration && a.duration.value)
                    ((this.Sj = j),
                        this.pubsub.c("command_pause"),
                        this.ij.start(1e3 * a.duration.value));
            } else
                (Bm(this, a),
                    (b = this.qg),
                    (a = this.Za[a]),
                    !b.an[a.id] && a.getUrl() && ((b.an[a.id] = j), b.k(sm(a, 2))));
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
                d && Cm(a, d);
                c.wi();
                delete a.ah[b];
            }
        },
        Bm = function (a, b) {
            var c = a.Ic[b];
            c && (c.show(), (a.ah[b] = c));
        };
    n = ym.prototype;
    n.Yq = function (a) {
        if (a && a.id) {
            var b = this.qg;
            a.getUrl() && b.k(sm(a, 3));
            if ((b = a.getUrl())) {
                var c = pm(b, this.a);
                if (-1 != c) (this.pubsub.c("command_seek", c), this.Qi());
                else {
                    var c = this.a,
                        d = Ak(b);
                    d
                        ? om(d)
                            ? ((c = d.split("#", 2)),
                              (a =
                                  ef(c[0], { feature: "iv", annotation_id: a.id }) +
                                  (c[1] ? "#" + c[1] : "")))
                            : (a = c.Jl ? d : k)
                        : (a = k);
                    a &&
                        window.open(
                            a,
                            !this.a.Kl
                                ? "_top"
                                : "embedded" == this.b.eventLabel
                                  ? "_blank"
                                  : b.target
                                    ? "new" == b.target
                                        ? "_blank"
                                        : "_top"
                                    : om(Ak(b))
                                      ? "_top"
                                      : "_blank"
                        );
                }
            } else eg.log(H, "Clicked on an annotation without a url.");
        }
    };
    n.lj = function (a) {
        (a = this.Te[a.id]) && Bm(this, a);
    };
    n.kj = function (a) {
        (a = this.Te[a.id]) && Cm(this, a);
    };
    n.Zq = function (a) {
        if (a || a.id) ((this.ej[a.id] = j), Cm(this, a.id), a && this.qg.k(sm(a, 4)));
    };
    n.Qi = function () {
        this.ij.stop();
        this.Sj && ((this.Sj = l), this.pubsub.c("command_play"));
    };
    var Dm = RegExp(
        "^(ar|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Arab|Hebr|Thaa|Nkoo|Tfng))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)"
    );
    var Em = function (a) {
        a = a || Zl;
        w(this, a);
    };
    n = Em.prototype;
    n.Ah = 7;
    n.Ch = 50;
    n.Eh = 95;
    n.uu = 80;
    n.Qc = 0;
    n.textAlign = "center";
    n.backgroundColor = "#080808";
    n.ph = "#fff";
    n.opacity = 0.8;
    n.jc = 15;
    n.ok = 32;
    n.isVisible = j;
    n.fontFamily = '"Arial Unicode Ms", Arial';
    n.fontSize = "100%";
    var Fm = function (a, b) {
        this.id = a;
        this.J = new Em(b);
        var c = "caption-window";
        0 == this.id && (c = "standard-caption-window");
        this.D = xc("div", { id: "caption-window-" + this.id, class: c });
        this.ne = xc("span", { class: "captions-text", style: "visibility: hidden" });
        this.ne.innerHTML = "C";
        this.I = xc("span", { class: "captions-text", tabindex: "4", "aria-live": "assertive" });
        c = xc("div", { class: "caption-window-transform" });
        c.appendChild(this.I);
        this.D.appendChild(c);
    };
    n = Fm.prototype;
    n.id = 0;
    n.J = k;
    n.ih = "";
    n.ib = k;
    n.D = k;
    n.I = k;
    n.ne = k;
    n.type = 1;
    n.getType = function () {
        return this.type;
    };
    n.ek = function () {
        var a;
        this.ne.style.fontFamily = this.I.style.fontFamily;
        this.D.appendChild(this.ne);
        a = this.ne.offsetHeight;
        this.D.removeChild(this.ne);
        return a;
    };
    n.oh = function () {
        this.I &&
            (0 != this.id && (gd(this.D, "100%"), gd(this.D, this.I.offsetWidth)),
            Gm(this),
            sh(this.D, this.J.isVisible));
    };
    var Gm = function (a) {
        Zc(a.D, a.J.Ch + "%", a.J.Eh + "%");
        for (var b = 0; 8 >= b; b++) J(a.D, "anchor-point-" + b);
        I(a.D, "anchor-point-" + a.J.Ah);
    };
    Fm.prototype.Ln = function (a) {
        var b = [];
        a.forEach(function (a) {
            a.ie ? (b[b.length - 1] += a.Ub()) : b.push(a.Ub());
        }, this);
        Hm(this, b.join("\n"));
        this.ib = a;
    };
    Fm.prototype.$d = function (a) {
        a = xa(a);
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
        1 == this.J.Qc ? this.I.setAttribute("dir", "rtl") : this.I.removeAttribute("dir");
    };
    Fm.prototype.toString = function () {
        var a = "Caption window (" + this.id + "): " + this.ih,
            b;
        for (b in this.J) a += b + " " + this.J[b] + " | ";
        return a;
    };
    var Im = function (a) {
        for (var a = a.split("\n"), b = 0, c = a.length; b < c; b++)
            a[b] = a[b] ? "&nbsp;" + a[b] + "&nbsp;" : "";
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
    B(Jm, Fm);
    n = Jm.prototype;
    n.type = 0;
    n.Rc = "";
    n.Yc = l;
    n.mc = k;
    n.Pa = k;
    n.ek = function () {
        return this.Pa[0] ? this.Pa[0].offsetHeight : 0;
    };
    var Km = function (a) {
        return a.Pa.reduce(function (a, c) {
            return Math.max(a, c.offsetWidth);
        }, 0);
    };
    Jm.prototype.oh = function () {
        0 != this.id &&
            ((this.Yc = j),
            gd(this.D, "100%"),
            gd(this.D, this.Yc ? Km(this) : this.mc.width),
            (this.Yc = l));
        var a = Math.round(this.J.jc * this.ek()),
            b = this.D;
        t("max-height") ? Vc(b, a + "px", "max-height") : bb("max-height", ma(Vc, b));
        Gm(this);
        sh(this.D, this.J.isVisible);
    };
    Jm.prototype.$d = function (a) {
        this.Th();
        a = xa(a);
        a = Im(a);
        this.Yc || (this.ih = a);
        for (var a = a.split("<br>"), b = 0, c = a.length; b < c; b++)
            if (a[b]) {
                var d = xc("div", { class: "caption-row-holder" }),
                    f = xc("span", { class: "caption-row captions-text" });
                d.appendChild(f);
                f.innerHTML = a[b];
                this.Yc || (f.style.left = this.mc.hn[b]);
                this.I.appendChild(d);
                this.Pa.push(f);
            }
        this.Lk();
        this.oh();
    };
    Jm.prototype.Th = function () {
        for (var a = 0, b = this.Pa.length; a < b; a++) {
            var c = Lc(this.Pa[a], "caption-row-holder");
            P(c);
        }
        this.Pa = [];
    };
    Jm.prototype.Lk = function () {
        this.D.style.textAlign = this.J.textAlign;
        for (var a = 0, b = this.Pa.length; a < b; a++)
            this.Pa[a].style.backgroundColor = this.J.backgroundColor;
        this.I.style.color = this.J.ph;
        this.I.style.opacity = this.J.opacity;
        this.I.style.fontFamily = this.J.fontFamily;
        1 == this.J.Qc ? this.I.setAttribute("dir", "rtl") : this.I.removeAttribute("dir");
    };
    var Lm = function (a, b) {
        Fm.call(this, a, b);
        this.ib = [];
        this.oc = [];
        this.ua = [];
        this.je = new Ud(433);
        this.je.stop();
        S(this.je, "tick", u(this.vt, this));
    };
    B(Lm, Fm);
    n = Lm.prototype;
    n.type = 2;
    n.ua = k;
    n.rc = 0;
    n.oc = k;
    n.je = k;
    n.Ln = function (a) {
        var b = a.length;
        if (0 >= b) this.Th();
        else {
            for (var c = 0; c < b && 0 <= this.ib.indexOf(a[c]); ) c++;
            this.ib = this.ib.concat(a.slice(c));
            Mm(this);
        }
    };
    n.Th = function () {
        this.ib = [];
        this.ua = [];
        this.rc = 0;
        this.ua = [];
        this.oc = [];
        this.be();
    };
    var Mm = function (a) {
            if (!Nm(a))
                if (a.rc >= a.ib.length) a.be();
                else {
                    var b = a.ua.length - 1;
                    0 > b && (a.oc.push(0), (a.rc = 0), a.ua.push(""), (b = 0));
                    for (var c = a.ib.length, d = a.rc; d < c; d++) {
                        var f = a.ib[d];
                        if ("\n" == f.Ub()) {
                            a.rc++;
                            a.oc[b]++;
                            break;
                        }
                        if (f.ie || 0 == a.ua[b].length) ((a.ua[b] += f.Ub()), a.rc++, a.oc[b]++);
                        else break;
                    }
                    a.be();
                    d < c &&
                        !Nm(a) &&
                        ((b = a.ek()),
                        I(a.I, "caption-rollup"),
                        (a.D.style.overflow = "hidden"),
                        (a.I.style.top = -b + "px"),
                        a.je.start());
                }
        },
        Nm = function (a) {
            return a.je.enabled || K(a.I, "caption-rollup");
        };
    Lm.prototype.vt = function () {
        this.D.style.overflow = "visible";
        this.I.style.top = 0;
        this.je.stop();
        J(this.I, "caption-rollup");
        this.ua.push("");
        this.oc.push(0);
        Mm(this);
    };
    Lm.prototype.be = function () {
        if (!Nm(this)) {
            for (; this.ua.length < this.J.jc; ) (this.ua.unshift(""), this.oc.unshift(0));
            for (; this.ua.length > this.J.jc; ) {
                this.ua.shift();
                var a = this.oc.shift();
                0 < a && ((this.rc -= a), this.ib.splice(0, a));
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
        this.pj = O("captions-translation-select", b);
        this.vj = O("captions-translation-dialog", b);
        this.uj = O("captions-transcribe-dialog", b);
        this.Ld = O("captions-transcribe-menu-item", b);
        this.tj = O("captions-settings-dialog", b);
        this.Vg = O("html5-captions-button", b);
        S(this.Vg, "click", u(this.Fq, this));
        S(O("captions-translation-confirm", b), "click", u(this.Lq, this));
        S(O("captions-translation-cancel", b), "click", u(this.lm, this));
        S(O("captions-transcribe-confirm", b), "click", u(this.Kq, this));
        S(O("captions-transcribe-cancel", b), "click", u(this.sm, this));
        S(O("captions-settings-bg", b), "click", u(this.Fm, this));
        S(O("captions-settings-font-inc", b), "click", u(this.Em, this));
        S(O("captions-settings-font-dec", b), "click", u(this.Dm, this));
        S(O("captions-settings-confirm", b), "click", u(this.um, this));
        S(O("captions-settings-cancel", b), "click", u(this.Jq, this));
        a = O("captions-settings-dialog", b);
        ye(a, u(this.Gq, this), "html5-color-picker-button");
        this.rj = O("html5-captions-tracks", this.Vg);
        this.dj = O("html5-popup-menu", this.Vg);
        ye(this.dj, u(this.Eq, this), "yt-uix-button-menu-item");
        this.Md = new Ud();
        this.Md.stop();
        S(this.Md, "tick", u(this.wj, this));
        this.pubsub.e("onResize", u(this.sj, this));
        this.pubsub.e("onToggleBackground", u(this.Fm, this));
        this.pubsub.e("onFontSizeIncrease", u(this.Em, this));
        this.pubsub.e("onFontSizeDecrease", u(this.Dm, this));
        this.pubsub.e("showcontrols", u(this.Iq, this));
        this.pubsub.e("hidecontrols", u(this.Hq, this));
        "detailpage" == this.b.eventLabel && (b = O("captions-account-settings-link", b)) && X(b);
        this.Ng = new Fm(99, $l);
        this.bf = new Ud(2e3);
        this.bf.stop();
        S(this.bf, "tick", u(this.Mq, this));
    };
    B(Om, V);
    n = Om.prototype;
    n.W = "cc";
    n.le = "cc";
    n.yo = "subtitlesModuleData";
    n.a = k;
    n.b = k;
    n.Vg = k;
    n.dj = k;
    n.vj = k;
    n.uj = k;
    n.Ld = k;
    n.tj = k;
    n.rj = k;
    n.$e = k;
    n.cc = k;
    n.aa = k;
    n.ac = k;
    n.Md = k;
    n.Ng = k;
    n.bf = k;
    n.wa = k;
    n.Dd = l;
    n.Bn = 1;
    n.N = { fontFamily: '"Arial Unicode Ms", Arial', fontSizeIncrement: 0, backgroundEnabled: j };
    n.Qg = k;
    n.Vm = l;
    n.create = function () {
        Om.j.create.call(this);
        this.a = this.s.getVideoData();
        var a;
        1 == this.b.Tl.cc_load_policy || 1 == this.a.Rl || "alwayson" == xg(this.a, "yt:cc")
            ? (a = j)
            : ((a = Ug(this, "module-enabled")), (a = a != k ? !!a : "on" == xg(this.a, "yt:cc")));
        a && this.load();
    };
    n.destroy = function () {
        this.unload();
        Om.j.destroy.call(this);
    };
    n.load = function () {
        Om.j.load.call(this);
        this.Dd = "alwayson" == xg(this.a, "yt:cc");
        fc(this.dj, "captions-always-on", this.Dd);
        var a =
                this.a.Be.cc_lang_pref ||
                this.b.Tl.cc_lang_pref ||
                xg(this.a, "yt:cc_default_lang") ||
                this.b.Eb,
            a = a && a.split("_").join("-");
        this.wa = new km(this.a.Ti, this.a.m, a, this.a.Pl);
        nm(this.wa, u(this.uq, this));
        Vg(this, "module-enabled", j);
        this.N = Ug(this, "display-settings") || fb(this.N);
        Pm(this);
        this.loaded = j;
    };
    n.unload = function () {
        Qm(this);
        Sg(this);
        Vg(this, "module-enabled", l);
        this.loaded = l;
        Om.j.unload.call(this);
    };
    n.k = function (a) {
        eg.info(a);
    };
    var Rm = function (a, b) {
        Bc(a.pj);
        b.forEach(function (a) {
            var b = document.createElement("option");
            b.setAttribute("value", a.Ef);
            b.appendChild(document.createTextNode(a.Xh + " -- " + a.cp));
            this.pj.appendChild(b);
        }, a);
    };
    Om.prototype.uq = function () {
        mm(this.wa, u(this.Wn, this));
        Bc(this.rj.children[0]);
        Rm(this, this.wa.xh());
        var a = this.wa.Kh();
        a.length ? this.Dd || (J(this.Ld, "disabled"), X(this.Ld)) : uh(this.Ld);
        var b = this.wa.Hf();
        if (0 < b.length) {
            this.k("Caption track list loaded, found " + b.length + " tracks.");
            var c = this.wa.Nh();
            b.forEach(function (a, b) {
                if (a.En) {
                    var g = a.toString(),
                        i = hm(a),
                        m = l;
                    b == c && (m = j);
                    Sm(this, g, i, m);
                }
            }, this);
        } else a.length || (this.k("No captions found."), this.unload());
    };
    Om.prototype.Wn = function (a, b) {
        var c = a.nh.concat(a.mh);
        this.k("Caption track loaded with " + c.length + " events.");
        Qm(this);
        this.$e = Qa(c);
        this.Qg = b;
        this.Vm = Dm.test(b.Uc);
        var d = [];
        c.forEach(function (a, b) {
            var c = new Ef(a.Ja(), a.Ja() + a.gb, { id: b });
            d.push(c);
        }, this);
        this.addCueRange.apply(this, d);
        Tm(this, b);
        Hm(this.Ng, hm(b));
        this.appendToVideoContent(this.Ng.D);
        this.bf.start();
    };
    var Tm = function (a, b) {
        var c = { trackName: b.getName(), trackKind: b.bb };
        b.sc ? ((c.trackLangCode = b.sc.Ef), (c.fromLangCode = b.Uc)) : (c.trackLangCode = b.Uc);
        a.log(c);
    };
    Om.prototype.rb = function (a) {
        this.cc.push(this.$e[a.getId()]);
        this.Md.start();
    };
    Om.prototype.lc = function (a) {
        a = this.cc.indexOf(this.$e[a.getId()]);
        0 <= a && this.cc.splice(a, 1);
        this.Md.start();
    };
    var Um = function (a, b) {
        if (b instanceof dm) {
            var c = a.aa[b.id];
            w(b.params, a.N);
            if (c && c.getType() != (b.params.Ij ? 2 : b.dh ? 0 : 1)) (P(c.D), delete a.aa[b.id]);
            if (!a.aa[b.id]) {
                var c = a.aa,
                    d = b.id,
                    f;
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
                fc(c, "captions-asr", "asr" == a.Qg.bb);
                b.params.Qc != k && (b.params.Qc = a.Vm ? 1 : 0);
                0 == a.aa[b.id].id ? a.appendAboveVideoControls(c) : a.appendToVideoContent(c);
            }
            w(a.aa[b.id].J, b.params);
            if (0 == (b.params.Ij ? 2 : b.dh ? 0 : 1)) {
                c = a.aa[b.id];
                c.Rc = b.Rc;
                c.mc = {};
                c.Yc = j;
                c.$d(c.Rc);
                c.mc.jc = c.Pa.length;
                c.mc.width = c.D.offsetWidth;
                c.mc.hn = [];
                for (d = 0; d < c.mc.jc; d++) c.mc.hn.push(c.Pa[d].offsetLeft);
                c.Yc = l;
                c.$d(c.ih);
            }
        } else ((c = b.Zg), a.ac[c] || (a.ac[c] = []), a.ac[c].push(b));
    };
    n = Om.prototype;
    n.sj = function () {
        this.Bn = jh(this.b).height / 360;
        Vm(this);
        for (var a in this.aa) this.aa[a].oh();
    };
    n.Mq = function () {
        this.bf.stop();
        P(this.Ng.D);
    };
    n.wj = function () {
        this.Md.stop();
        Vm(this);
        var a = this.cc.length,
            b;
        for (b in this.ac) delete this.ac[b];
        this.cc.sort(function (a, b) {
            return a.Ja() == b.Ja() ? a.dd() - b.dd() : a.Ja() - b.Ja();
        });
        for (var c = 0; c < a; c++) Um(this, this.cc[c]);
        for (b in this.aa)
            this.ac[b] ? this.aa[b].Ln(this.ac[b]) : (P(this.aa[b].D), delete this.aa[b]);
        this.k("Refreshing caption display...");
    };
    n.Fm = function () {
        this.N.backgroundEnabled = !this.N.backgroundEnabled;
        Vg(this, "display-settings", this.N);
        this.N.backgroundEnabled
            ? Ee(this.To)
            : (this.To = Fe(
                  ".captions-text, .caption-row",
                  "background-color: transparent !important;text-shadow: #000 0 0 4px, #000 0 0 4px, #000 0 0 4px, #000 0 0 4px;",
                  { Sc: this.To, reset: j }
              ));
    };
    n.Iq = function () {
        var a = this.aa[0];
        a && a.D && ec(a.D, "controls-hidden", "controls-visible");
    };
    n.Hq = function () {
        var a = this.aa[0];
        if (a && a.D) {
            for (var a = a.D, b = bc(a), c = l, d = 0; d < b.length; d++)
                "controls-visible" == b[d] && (Ua(b, d--, 1), (c = j));
            c && (b.push("controls-hidden"), (a.className = b.join(" ")));
        }
    };
    n.Dm = function () {
        this.N.fontSizeIncrement -= 1;
        Vm(this);
    };
    n.Em = function () {
        this.N.fontSizeIncrement += 1;
        Vm(this);
    };
    var Vm = function (a) {
            Vg(a, "display-settings", a.N);
            var b = "font-size: " + Math.round(((a.N.fontSizeIncrement || 0) + 16) * a.Bn) + "px;";
            a.Bt = Fe(".caption-window-transform", b, { Sc: a.Bt, reset: j });
        },
        Qm = function (a) {
            a.Wd();
            a.cc = [];
            a.$e = [];
            a.Qg = k;
            a.wj();
        },
        Wm = function (a, b) {
            lm(a.wa, b, u(a.Wn, a));
        };
    n = Om.prototype;
    n.Fq = function () {
        this.loaded || this.load();
    };
    n.Eq = function (a) {
        var a = Lc(a.target, "yt-uix-button-menu-item"),
            b = je(a, "action");
        if (b)
            switch (b) {
                case "translate":
                    this.Dd || (Sg(this), Rg(this), X(this.vj));
                    break;
                case "transcribe":
                    K(this.Ld, "disabled") || (Sg(this), Rg(this), X(this.uj));
                    break;
                case "settings":
                    Sg(this);
                    Rg(this);
                    Xm(this);
                    X(this.tj);
                    break;
                case "captions-off":
                    this.unload();
            }
        else if ((a = je(a, "trackid")))
            if (((b = this.wa.Hf()), 0 < b.length)) {
                this.k("Caption track changed to " + a + ".");
                for (var c = 0; c < b.length; c++) {
                    var d = b[c];
                    d.toString() == a && Wm(this, d);
                }
            } else this.k("Caption change failed for " + a);
        else this.k("onCaptionTrackClicked_ empty, ignoring");
    };
    n.lm = function () {
        uh(this.vj);
    };
    n.Lq = function () {
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
                a = k;
            }
            a &&
                ((b = this.Qg),
                (c = new gm()),
                (c.Uc = b.Uc),
                (c.Gh = b.Gh),
                (c.ta = b.ta),
                (c.bb = b.bb),
                (c.Cf = l),
                (c.pk = b.pk),
                (c.sc = a),
                this.wa.Df(c),
                Sm(this, c.toString(), hm(c), j),
                Wm(this, c));
        }
    };
    n.sm = function () {
        uh(this.uj);
    };
    n.Kq = function () {
        if (!this.Dd) {
            this.sm();
            I(this.Ld, "disabled");
            var a = this.wa.Kh();
            a.length && ((a = a[0]), this.wa.Df(a), Sm(this, a.toString(), hm(a), j), Wm(this, a));
        }
    };
    n.um = function () {
        uh(this.tj);
    };
    n.Jq = function () {
        delete this.N;
        this.N = fb(this.N);
        Vg(this, "display-settings", this.N);
        Pm(this);
        this.wj();
        this.um();
    };
    n.Gq = function (a) {
        var b = u(function (b) {
            var d = je(a.currentTarget, b);
            d && (this.N[b] = d);
        }, this);
        b("color");
        b("background");
        Pm(this);
        Vg(this, "display-settings", this.N);
    };
    var Xm = function (a) {
            var b = { Sc: a.qi },
                c = a.N.color,
                d = a.N.background;
            c &&
                (a.qi = Fe(
                    '.html5-popup-dialog button[data-color="' + c + '"]',
                    "border: 3px solid #992121;",
                    b
                ));
            d &&
                (a.qi = Fe(
                    '.html5-popup-dialog button[data-background="' + d + '"]',
                    "border: 3px solid #992121;",
                    b
                ));
        },
        Pm = function (a) {
            var b = [],
                c = u(function (a) {
                    var c = this.N[a];
                    c && b.push(a + ": " + c + " !important");
                }, a);
            c("color");
            c("background");
            a.qi = Fe(".captions-text", b, { Sc: a.qi, reset: j });
            Xm(a);
        },
        Sm = function (a, b, c, d) {
            var a = a.rj.children[0],
                f = document.createElement("li");
            f.setAttribute("class", "yt-uix-button-menu-item");
            f.setAttribute("data-trackid", b);
            var b = "caption-track-" + b,
                g = document.createElement("input");
            g.setAttribute("type", "radio");
            g.setAttribute("name", "language");
            g.setAttribute("value", c);
            g.id = b;
            g.checked = d;
            I(g, "yt-uix-button-menu-close");
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
                if (navigator.plugins && 0 < navigator.plugins.length)
                    for (a = 0; a < navigator.plugins.length; a++)
                        if (0 <= navigator.plugins[a].name.indexOf("NVIDIA 3D Vision")) {
                            a = j;
                            break a;
                        }
                a = l;
            }
            if (a)
                a: {
                    var b = navigator.userAgent.match(/Firefox[\/\s](\d+\.\d+)/);
                    if (b && 1 < b.length && 4 <= b[1]) {
                        b = document.createElement("embed");
                        b.setAttribute("id", "NvImageDetectionFFID");
                        b.setAttribute("style", "visibility: hidden");
                        b.setAttribute("width", 25);
                        b.setAttribute("height", 25);
                        b.setAttribute("type", "image/jps");
                        Ac(document.documentElement, b);
                        b = N("NvImageDetectionFFID");
                        try {
                            if (b != k) {
                                a = 27527 <= b.NvGetDriverVersion();
                                break a;
                            }
                        } catch (c) {}
                    }
                    a = l;
                }
        }
        return a;
    };
    var an = function (a) {
        V.call(this, a);
        var b = a.getVideoData();
        b.Pe && Zm(this);
        $m(this, "html5-threed-conversion-on", u(this.us, this));
        $m(this, "html5-threed-conversion-off", u(this.ts, this));
        var c = this.s.getRootNode(),
            a = O("html5-threed-popup-menu-change-mode-link", c),
            c = O("html5-threed-dialog-change-mode-button", c),
            b = "/select_3d_mode?video_id=" + b.m;
        a.setAttribute("href", b);
        c.setAttribute("href", b);
    };
    B(an, V);
    an.prototype.ld = k;
    var $m = function (a, b, c) {
        a = a.s.getRootNode();
        b = O(b, a);
        S(b, "click", c);
    };
    n = an.prototype;
    n.W = "threed";
    n.le = "threed";
    n.create = function () {
        this.s.preparePlayerThreeD();
        an.j.create.call(this);
    };
    n.destroy = function () {
        this.s.preparePlayerThreeD(j);
        this.unload();
        an.j.destroy.call(this);
    };
    n.zb = function (a) {
        a = a.getVideoData();
        return !!a.Pe || !!a.Ag;
    };
    n.us = function () {
        bn(this, j);
    };
    n.ts = function () {
        bn(this, l);
    };
    var bn = function (a, b) {
            var c = a.s.getVideoData();
            c.Ag && c.Kc != b && (a.s.toggleThreeD(), b ? Zm(a) : Sg(a));
        },
        Zm = function (a) {
            if (!Ug(a, "warning-shown") && !Ym()) {
                var b = a.s.getRootNode();
                a.ld = O("threed-html5-warning-dialog", b);
                X(a.ld);
                Ah(
                    u(function () {
                        cn(this);
                    }, a),
                    0
                );
                S(
                    a.ld,
                    "mouseover",
                    u(function () {
                        J(this.ld, "hide-dialog");
                    }, a)
                );
                S(
                    a.ld,
                    "mouseout",
                    u(function () {
                        cn(this);
                    }, a)
                );
                $m(a, "threed-html5-warning-close", u(a.Fo, a));
            }
        },
        cn = function (a) {
            I(a.ld, "hide-dialog");
            Ah(
                u(function () {
                    K(this.ld, "hide-dialog") && this.Fo();
                }, a),
                9e3
            );
        };
    an.prototype.Fo = function () {
        Vg(this, "warning-shown", j);
        Sg(this);
    };
    var dn = function (a, b) {
        var c = O("html5-ypc-module", a.getRootNode());
        this.$a = O("html5-ypc-overlay", c);
        this.Zs = O("html5-ypc-message", c);
        this.Ok = O("html5-ypc-purchase", c);
        this.ma = O("html5-module-close", c);
        this.$h = O("html5-module-recall", c);
        a.appendAboveVideoControls(c);
        this.$ = b;
        S(this.Ok, "click", u(this.ct, this));
        S(this.ma, "click", u(this.$s, this));
        S(this.$h, "click", u(this.vo, this));
    };
    n = dn.prototype;
    n.$a = k;
    n.Ok = k;
    n.ma = k;
    n.$h = k;
    n.$ = k;
    n.update = function (a, b) {
        Ec(this.Zs, a);
        Ec(this.Ok, b);
        this.vo();
    };
    n.ct = function () {
        this.$.c("ypcContentRequest");
    };
    n.vo = function () {
        Cc(this.$a, this.$h);
    };
    n.$s = function () {
        Cc(this.$h, this.$a);
    };
    var en = function (a) {
        V.call(this, a);
        this.pubsub.e("ypcContentRequest", this.Ms, this);
        this.zm = new dn(a, this.pubsub);
        this.ym = new Ef(0, 2147483646, { priority: 1 });
    };
    B(en, V);
    n = en.prototype;
    n.W = "ypc";
    n.le = "ypc";
    n.zm = k;
    n.ym = k;
    n.zb = function () {
        return zg(this.s.getVideoData(), "ypc_module");
    };
    n.create = function () {
        en.j.create.call(this);
        this.a = this.s.getVideoData();
        this.a.Wl
            ? (this.zm.update(this.a.Pp, this.a.Qp), this.addCueRange(this.ym))
            : this.s.loadVideoByPlayerVars({
                  force_data_reload: j,
                  video_id: this.a.m,
                  ypc_preview: 1
              });
    };
    n.destroy = function () {
        this.Wd();
    };
    n.rb = function (a) {
        en.j.rb.call(this, a);
        this.load();
    };
    n.lc = function (a) {
        this.unload();
        en.j.lc.call(this, a);
    };
    n.Ms = function () {
        if (this.a.hj)
            "embedded" == this.s.getEnvironmentData().eventLabel
                ? Ql(this.a.hj)
                : (window.location = U(this.a.hj, {}) + "");
        else if (this.a.Zl) {
            var a = q("yt.www.watch.player.handleEndPreview");
            a && a(this.a.Zl);
        }
    };
    var fn = function () {
        this.Vc = [];
        this.vk = {};
        this.Ri = {};
        this.Cd = {};
    };
    n = fn.prototype;
    n.Vc = k;
    n.vk = k;
    n.Pi = k;
    n.Ri = k;
    n.Cd = k;
    n.va = k;
    var hn = function (a) {
            gn.forEach(function (a) {
                var c;
                var d = ja(a);
                c = this.vk[d];
                if (!c && (c = a(this.va))) {
                    var a = (this.vk[d] = c),
                        f;
                    for (f in this.Pi) a.pubsub.e(f, this.Pi[f]);
                    a.pubsub.e("command_log_timing", this.cs, this);
                }
                c && c.zb(this.va) && (c.create(), this.Vc.push(c));
            }, a);
        },
        jn = function (a) {
            a.Vc.forEach(function (a) {
                a.destroy();
            });
            a.Vc = [];
        };
    fn.prototype.gq = function (a) {
        this.Vc.forEach(function (b) {
            b.W == a && b.load();
        });
    };
    fn.prototype.lq = function (a) {
        this.Vc.forEach(function (b) {
            b.W == a && b.unload();
        });
    };
    var kn = function (a, b, c) {
        D(a.Vc, function (a) {
            a.pubsub.c(b, c);
        });
    };
    fn.prototype.cs = function (a, b) {
        w(this.Cd, a || k);
        w(this.Ri, b || k);
    };
    var ln = function (a, b, c) {
        this.xt = a;
        this.kd = b;
        this.$c = c;
        this.wt = u(this.St, this);
    };
    B(ln, Sc);
    n = ln.prototype;
    n.Rh = l;
    n.Dk = 0;
    n.ha = k;
    n.stop = function () {
        this.ha && (Td.clearTimeout(this.ha), (this.ha = k), (this.Rh = l));
    };
    n.pause = function () {
        this.Dk++;
    };
    n.r = function () {
        ln.j.r.call(this);
        this.stop();
    };
    n.St = function () {
        this.ha = k;
        this.Rh && !this.Dk && ((this.Rh = l), mn(this));
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
    n = nn.prototype;
    n.jh = l;
    n.Zc = 0;
    n.ik = 0;
    n.lk = 0;
    n.rs = 10;
    n.xa = 0;
    n.gh = 0;
    n.ho = 0.5625;
    n.Vn = 0;
    n.ms = function () {
        this.dk && Bc(this.yb);
        J(this.xb, "enabled");
        this.Vd = this.Sd = k;
        var a = this.va.getVideoData();
        if (!a.jj || !a.dm) this.jh = l;
        else {
            this.jh = j;
            I(this.xb, "enabled");
            this.Sd = a.jj;
            var a = (this.Vd = a.dm),
                b = u(this.on, this);
            a.$.e(a.Qm, b);
            on(this);
            for (
                var a = this.yb.cloneNode(j), b = this.Sd.getLevel(0).frames, c, d, f = 0;
                f < b;
                f++
            )
                ((d = this.dk.cloneNode(l)),
                    (c = this.Vd.kc(f, this.xa)),
                    pn(d, c, this.xa, this.gh),
                    a.appendChild(d));
            Cc(a, this.yb);
            this.yb = a;
        }
    };
    n.ud = function (a) {
        this.xb = a;
        this.yb = O("html5-storyboard-filmstrip", this.xb);
        this.bo = O("html5-storyboard-lens", this.xb);
        this.as = O("html5-storyboard-lens-inner", this.xb);
        this.dk = O("html5-storyboard-thumbnail", this.yb);
        P(this.dk);
    };
    n.on = function (a, b) {
        md(this.yb, l);
        for (var c, d, f = a; f <= b; f++)
            if ((d = this.yb.children[f]))
                ((c = this.Vd.kc(f, this.xa)), pn(d, c, this.xa, this.gh));
        md(this.yb, j);
    };
    var pn = function (a, b, c, d) {
        var f = Math.min(c / (b.$o / b.fa), d / (b.Zo / b.rows)),
            g = b.$o * f,
            f = b.Zo * f,
            g = Math.floor(g / b.fa) * b.fa,
            f = Math.floor(f / b.rows) * b.rows,
            i = g / b.fa,
            m = f / b.rows,
            p = Math.floor((c - i) / 2),
            c = Math.ceil((c - i) / 2),
            d = Math.floor((d - m) / 2),
            b = {
                width: i + "px",
                height: m + "px",
                "margin-top": d + "px",
                "margin-bottom": d + "px",
                "margin-left": p + "px",
                "margin-right": c + "px",
                "background-image": "url(" + b.url + ")",
                "background-position": -1 * b.Kt * i + "px " + -1 * b.row * m + "px",
                "background-size": g + "px " + f + "px"
            };
        t(b) ? Vc(a, h, b) : bb(b, ma(Vc, a));
    };
    nn.prototype.os = function (a) {
        if (this.jh) {
            this.ik = this.lk * a - this.Zc / 2;
            Zc(this.yb, -1 * this.ik);
            var b = this.Sd.getLevel(0).frames,
                a = Math.round(b * a),
                b = (a = Oc(a, 0, b - 1));
            b != this.Vn &&
                (pn(
                    this.as,
                    this.Vd.kc(b, 2 * this.xa),
                    Math.round(2 * this.xa),
                    Math.round(2 * this.gh)
                ),
                (this.Vn = b));
            b = this.Cr;
            !b.ha && !b.Dk ? mn(b) : (b.Rh = j);
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
            for (var c = this.Vd, d = b, f = Mf(c.Wc, 2 * this.xa), g = h, i = h; 0 <= f; f--)
                if (((g = c.Wc.getLevel(f)), (i = Math.floor(d / (g.fa * g.rows))), !g.ae(i))) {
                    var g = c,
                        m = f,
                        p = m + "-" + i;
                    g.Un[p] || ((g.Un[p] = j), g.zk.Bf(m, { Zn: m, $n: i }));
                }
            dg(c);
        }
    };
    nn.prototype.pb = function () {
        this.jh && on(this, j);
    };
    var on = function (a, b) {
        var c = a.va.getEnvironmentData().td();
        c.width !== a.Zc &&
            ((a.Zc = c.width),
            gd(a.xb, a.Zc),
            (c = a.Sd.getLevel(0).frames),
            (a.xa = Math.floor(a.Zc / a.rs)),
            (a.gh = a.xa * a.ho),
            (a.lk = a.xa * c),
            gd(a.yb, a.lk),
            (c = Math.round(2 * a.xa)),
            hd(a.bo, c, c * a.ho),
            Zc(a.bo, (a.Zc - c) / 2),
            b && a.on(0, a.Sd.getLevel(0).frames - 1));
    };
    var qn = function (a, b) {
        var c, d;
        d || (d = 0);
        c || (c = dd(document.body));
        qh(new L(b.pageX, b.pageY), a, d, k, c, 5);
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
        this.Mm = new M(window.screen.width, window.screen.height);
        this.Kg = b.Kg;
        this.jf = b.jf;
        this.kf = b.kf;
        var d,
            c = q("yt.www.watch.activity.getTimeSinceActive");
        "detailpage" == b.eventLabel && c && (d = c());
        this.Sq = d;
        this.Nm = jh(b);
        this.Ye = b.Ye;
        this.pd = b.pd;
        !a.format || !a.Oe
            ? R(
                  Tb,
                  "yt.tracking.VideoStatsPing",
                  "Attempted to construct a VideoStatsPing for a video that has no format or videoSize.",
                  h
              )
            : ((this.Dg = a.Dg),
              (this.format = a.format),
              (this.lb = a.lb),
              (this.Cc = a.Cc),
              (this.wd = a.wd),
              (this.pa = a.pa),
              (this.Gb = a.Gb),
              (this.Ib = a.Ib),
              (this.Fd = a.Fd),
              (this.Hb = a.Hb),
              (this.Cg = a.Cg),
              (this.m = a.m),
              (this.Oe = a.Oe),
              (this.gg = a.gg));
    };
    n = rn.prototype;
    n.autoplay = l;
    n.Jm = l;
    n.Ji = l;
    n.Km = l;
    n.lb = l;
    n.Tq = "yt";
    n.Fd = l;
    n.Um = l;
    n.send = function () {
        if (this.Um)
            R(
                Tb,
                "yt.tracking.VideoStatsPing",
                "send should be called only once for a given ping object.",
                h
            );
        else {
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
            this.Ji && (a.playback = "1");
            this.autoplay && (a.autoplay = "1");
            this.lb && (a.splay = "1");
            this.Fd && !this.Ji && (a.vtmp = "1");
            this.Xe && (a.content_v = this.Xe);
            this.jf != h && this.kf && (a.uga = this.kf + this.jf);
            this.Xl != h && (a.len = this.$g(this.Xl));
            0 < this.Mb.length && (a.fexp = this.Mb.toString());
            0 < this.Cc && (a.idpj = this.Cc);
            0 < this.wd && (a.ldpj = this.wd);
            this.Ye != h && (a.attrib = this.Ye);
            this.Hm && (a.bc = this.Hm);
            this.Im && ((a.bd = this.Im), (a.bt = this.Oq));
            0 < this.Gm && (a.nbe = this.Gm);
            this.webkitDecodedFrameCount != h &&
                ((a.hmewdfc = this.webkitDecodedFrameCount),
                (a.hmewdrop = this.webkitDroppedFrameCount),
                (a.hmewvdbc = this.webkitVideoDecodedByteCount),
                (a.hmewadbc = this.webkitAudioDecodedByteCount));
            this.mozParsedFrames != h &&
                ((a.hmempf = this.mozParsedFrames),
                (a.hmemdf = this.mozDecodedFrames),
                (a.hmempresented = this.mozPresentedFrames),
                (a.hmempainted = this.mozPaintedFrames),
                (a.hmempaintdelay = this.mozPaintDelay));
            0 < this.De.length &&
                ((a.st = this.De.map(this.$g).join(",")), (a.et = this.Ii.map(this.$g).join(",")));
            a = U(this.Rq, a);
            qf(a);
            this.Um = j;
        }
    };
    n.$g = function (a) {
        return (1 * a.toFixed(3)).toString();
    };
    var sn = function () {};
    B(sn, Sc);
    n = sn.prototype;
    n.xj = [10, 10, 10, 40];
    n.ql = 0;
    n.pn = 0;
    n.Xa = k;
    n.Jb = k;
    n.Ll = "";
    n.pm = l;
    n.Y = 0;
    n.Si = 0;
    n.Le = 0;
    n.wf = 0;
    n.qh = [];
    n.Me = 0;
    n.rh = [];
    n.bj = function (a, b, c, d, f, g) {
        this.a = b;
        this.b = c;
        this.Ll = this.b.Db + "get_video";
        this.Xa = d;
        this.zq = f;
        this.Jb = g;
        this.Ce = l;
        this.a.fg &&
            ((sn.prototype.xj = [10 + this.a.Cc, 10, 10, 40 + this.a.wd - this.a.Cc, 40]),
            this.Og != h && Ch(this.Og),
            (this.Og = Bh(u(this.Bq, this), 100)));
        this.a.Dp && (this.pm = j);
    };
    n.Nl = function () {
        tn(this);
        this.ql = Math.min(this.ql + 1, this.xj.length - 1);
        var a = this.xj[this.ql];
        un(this);
        this.tg = Bh(u(this.Nl, this), 1e3 * a);
    };
    var un = function (a) {
        a.tg != h && Ch(a.tg);
    };
    sn.prototype.Bq = function () {
        var a = this.Jb(),
            b = (x() - this.Le) / 1e3,
            c = a - this.Y;
        if (0 != c) {
            var d = b - this.Si;
            if (0 > c || c > d + 0.2) (vn(this), (this.Me = a));
            this.Si = b;
        }
        this.Y = a;
    };
    var vn = function (a) {
            400 < a.pn && !a.pm
                ? un(a)
                : 3 < a.Y - a.Me && ((a.rh[a.wf] = a.Me), (a.qh[a.wf] = a.Y), a.wf++, (a.Me = a.Y));
        },
        wn = function (a) {
            var b = {},
                c = a.Xa();
            w(b, c);
            b = new rn(a.a, a.b, b);
            b.Mp = (x() - a.Le) / 1e3;
            b.Xl = a.zq();
            return b;
        };
    sn.prototype.Da = function () {
        var a = this.b,
            b = this.a,
            c = {
                ns: "yt",
                html5: "1",
                el: a.eventLabel,
                ps: a.Ta,
                fexp: a.Mb.join(",") || h,
                list: b.Ib
            };
        a.autoplay && (c.autoplay = "1");
        b.Hb && (c.subscribed = b.Hb);
        return c;
    };
    sn.prototype.Eg = function () {
        this.Le = x();
    };
    var tn = function (a) {
        vn(a);
        if (0 < a.wf && a.a.fg) {
            var b = wn(a);
            a.rh.length && a.qh.length && ((b.De = a.rh), (b.Ii = a.qh));
            b.send();
            a.rh = [];
            a.qh = [];
            a.pn++;
        }
        a.wf = 0;
    };
    sn.prototype.Ec = function (a) {
        a.rt = (x() - this.Le) / 1e3;
        var b = this.Xa();
        w(a, b);
        "streamingerror" == a.event
            ? ((b = "//s.youtube.com/stream_204"), a.videoId && delete a.videoId)
            : (b = this.b.Db + "player_204");
        b = U(b, this.Da());
        b = U(b, a);
        qf(b);
    };
    sn.prototype.k = function (a, b) {
        b || (b = Ub);
        eg.log(b, a);
    };
    sn.prototype.r = function () {
        sn.j.r.call(this);
        un(this);
        this.Og != h && Ch(this.Og);
    };
    var xn = function (a) {
        this.Ab = O("html5-modal-panel", a);
        this.ko = O("html5-modal-panel-close-button", this.Ab);
        this.jo = O("html5-modal-panel-clipboard-substitute-content", this.Ab);
        this.Nf = qe("input", this.jo);
        this.jm = O("html5-modal-panel-infobox-content", this.Ab);
        this.Aa = new Ge();
        this.Aa.G(document, "keydown", u(this.Rs, this));
        this.Aa.G(this.ko, "click", u(this.Ps, this));
        this.Aa.G(this.Ab, "contextmenu", u(this.Qs, this));
        S(this.Nf, "click", u(this.io, this));
    };
    n = xn.prototype;
    n.Aa = k;
    n.jo = k;
    n.Nf = k;
    n.ko = k;
    n.Ai = k;
    n.jm = k;
    n.Ab = k;
    n.Ps = function () {
        this.wi();
    };
    n.Qs = function (a) {
        a.preventDefault();
        a.stopPropagation();
    };
    n.wi = function () {
        uh(this.Ab);
        Vl("panelhidden");
    };
    n.Rs = function (a) {
        27 == a.keyCode && this.wi();
    };
    n.io = function () {
        this.Nf.select();
    };
    var yn = function (a, b) {
        a.Ai && J(a.Ab, a.Ai);
        a.Ai = b;
        I(a.Ab, a.Ai);
        a.show();
    };
    xn.prototype.show = function () {
        X(this.Ab);
    };
    var zn = function () {
        this.Of = {};
    };
    B(zn, Lh);
    aa(zn);
    n = zn.prototype;
    n.ye = "range-tooltip";
    n.Yf = k;
    n.format = k;
    n.max = 0;
    n.jp = 0;
    n.ip = 0;
    n.si = k;
    n.Ub = function () {
        return " ";
    };
    n.pl = function (a, b) {
        this.Yf = b;
        var c = this.getData(a, this.ye + "-format");
        c && (this.format = q(c));
        this.max = parseInt(this.getData(a, "range-max"), 10);
        this.jp = bd(a).x;
        this.ip = jd(a).width;
    };
    n.ag = function () {
        Lh.prototype.ag.call(this);
        this.addBehavior("mousemove", this.ep);
        this.addBehavior("touchmove", this.hp);
    };
    n.ti = function (a, b) {
        this.lp || (Lh.prototype.ti.call(this, a, b), S(document, "mousemove", T));
    };
    n.Zf = function (a, b) {
        Lh.prototype.Zf.call(this, a, b);
        Ae("mousemove");
    };
    n.kl = function (a, b, c) {
        this.si ||
            ((this.si = c.changedTouches[0].identifier),
            Lh.prototype.kl.call(this, a, b, c),
            S(document, "touchmove", T),
            this.hp(0, b, c));
    };
    n.ui = function (a, b, c) {
        Lh.prototype.ui.call(this, a, b, c);
        Ae("touchmove");
        this.lp = j;
        Vd(
            function () {
                this.lp = l;
            },
            200,
            this
        );
        this.si = k;
    };
    n.ep = function (a, b, c) {
        if (this.Yf) {
            b = (c.pageX - this.jp) / this.ip;
            b = Oc(b, 0, 1);
            b *= this.max;
            this.format && (b = this.format(b));
            Oh(this, a, b);
            var b = O(Y(this, "tip-body"), this.Yf),
                d = this.Yf,
                f = new L(-5, 0),
                a = bd(a);
            qh(new L(c.pageX + f.x, a.y + f.y), d, 0);
            c = (jd(b).width + 3) / -2 - -5;
            b.style.left = c + "px";
        }
    };
    n.hp = function (a, b, c) {
        if (this.Yf)
            for (a = 0; a < c.changedTouches.length; a++) {
                var d = c.changedTouches[a];
                if (d.identifier == this.si) {
                    c.pageX = d.pageX;
                    c.pageY = d.pageY;
                    this.ep(Hh(Y(this), d.target, Gh(b, Y(this))), 0, c);
                    break;
                }
            }
    };
    var An = q("yt.playerConfig") || {};
    A("yt.playerConfig", An);
    var Bn = q("yt.player.playerReferences_") || {};
    A("yt.player.playerReferences_", Bn);
    var En = function (a) {
            var b = Bn[a],
                c =
                    N(b.target).firstElementChild != h
                        ? N(b.target).firstElementChild
                        : Dc(N(b.target).firstChild),
                d = c.getApiInterface();
            D(d, function (a) {
                b.api[a] = u(c[a], c);
            });
            b.api.ju = u(b.api.destroy, c);
            b.api.destroy = u(function () {
                this.ju();
                delete Bn[a];
            }, b.api);
            b.api.nativeAddEventListener = u(b.api.addEventListener, c);
            for (var f in b.api.subscribedEvents) b.api.nativeAddEventListener(f, Cn(b.api, f));
            b.api.addEventListener = Dn;
            "embedded" === b.eventLabel &&
                b.api.addEventListener("SHARE_CLICKED", u(b.actions.Bu, b.actions));
            b.onReadyCalled ||
                ((b.onReadyCalled = j),
                b.jsapicallback && (d = b.jsapicallback) && d(b.playerapiid),
                window.onYouTubePlayerReady && onYouTubePlayerReady(b.playerapiid));
        },
        Cn = function (a, b) {
            var c = "ytPlayer" + (b + ja(a)),
                d = u(function (a) {
                    this.pubsub.publish(b, a);
                }, a);
            A(c, d);
            return c;
        },
        Dn = function (a, b) {
            var c = Fn(b);
            this.subscribedEvents[a] || this.nativeAddEventListener(a, Cn(this, a));
            this.subscribedEvents[a] = 1;
            this.pubsub.subscribe(a, c);
        },
        Fn = function (a) {
            var b = a;
            "string" == typeof a &&
                (b = function () {
                    q(a).apply(window, arguments);
                });
            b || (b = q("onYouTubePlayerReady"));
            return b;
        };
    q("ytPlayerOnYouTubePlayerReady") || A("ytPlayerOnYouTubePlayerReady", En);
    A("yt.net.ajax.setToken", function (a, b) {
        nf[a] = b;
    });
    A("yt.tracking.share", function (a, b, c, d) {
        a = U("/sharing_services", { name: a, v: b, locale: c, feature: d });
        qf(a);
    });
    A("yt.window.popup", Rl);
    Jh(bi);
    Jh(Wl);
    Jh(Lh);
    Jh(zn);
    fe();
    var gn = [
            function (a) {
                return !re("video-annotations", a.getRootNode()) || !zm(a) ? k : new ym(a);
            },
            function (a) {
                return "leanback" != a.getEnvironmentData().eventLabel ? new ck(a) : k;
            },
            function (a) {
                return !Om.prototype.zb(a) ? k : new Om(a);
            },
            function (a) {
                return !Kj.prototype.zb(a) ? k : new Kj(a);
            },
            function (a) {
                return an.prototype.zb(a) ? new an(a) : k;
            },
            function (a) {
                return !zg(a.getVideoData(), "ypc_module") ? k : new en(a);
            }
        ],
        $ = function (a, b) {
            this.aj = {};
            this.Ne = [];
            this.Va = [];
            this.Lg = a;
            this.pubsub = new Q();
            this.pubsub.e("nothtml5servable", u(this.oq, this));
            this.pubsub.e("unabletoplay", u(this.rq, this));
            this.pubsub.e("openingpage", u(this.pq, this));
            this.pubsub.e("initializingmode", u(this.nq, this));
            this.pubsub.e("internalstatechange", u(this.qq, this));
            this.pubsub.e("internalenvironmentdatachange", u(this.mq, this));
            this.pubsub.e("internalvideodatachange", u(this.sq, this));
            this.pubsub.e("internalvolumechange", u(this.Ee, this));
            var c = b;
            c instanceof Le || (c = new Le(c));
            this.la = c;
            c = this.la.args;
            this.k("Setting environment data");
            this.b = new ch(c);
            this.pubsub.c("internalenvironmentdatachange", "newdata");
            this.b.Fb && (this.b.jg = "dark");
            this.bj();
            Gn(this, N(this.Lg));
            this.z || "complete" == document.readyState
                ? this.km()
                : S(document, "DOMContentLoaded", u(this.km, this));
        },
        Hn;
    n = $.prototype;
    n.Oi = k;
    n.We = k;
    n.Ga = k;
    n.Nd = k;
    n.af = k;
    n.Lg = k;
    n.list = k;
    n.Ke = k;
    n.g = k;
    n.yg = k;
    n.cj = k;
    n.Ue = k;
    n.rd = k;
    n.zl = k;
    n.eg = k;
    n.Zi = 0;
    n.Hg = l;
    n.Ap = l;
    n.ea = l;
    n.Ca = k;
    n.ob = j;
    n.Td = l;
    n.Gj = 0;
    n.qd = l;
    n.rg = 0;
    n.Bc = 0;
    n.Ol = l;
    n.ze = 0;
    n.Aa = k;
    n.pubsub = k;
    n.qa = k;
    n.la = k;
    n.nb = -1;
    n.Hc = Xf;
    n.xd = k;
    n.S = k;
    n.$b = 0;
    n.zg = 0;
    n.$i = 0;
    n.Ni = j;
    n.Cl = 0;
    n.mg = k;
    n.wl = 0;
    n.fk = k;
    var Jn = function (a, b, c) {
            a.f = b;
            a.Ga.Wa();
            In(a);
            I(a.f, "video-stream");
            a.b.Zb && a.b.Ua && a.f.setAttribute("controls", j);
            a.b.loop && a.f.setAttribute("loop", j);
            a.b.nj && a.f.setAttribute("webkit-playsinline", j);
            a.f.setAttribute("x-webkit-airplay", "allow");
            a.f.setVolume(a.S.volume, a.S.muted);
            c != l && !a.f.parentNode && a.pg.appendChild(a.f);
            a.b.f = a.f;
        },
        Gn = function (a, b) {
            b
                ? ((a.z = b), (a.b.z = b))
                : R(
                      Tb,
                      "yt.player.VideoPlayer",
                      "Attempted to set videoPlayerElement_ to null.",
                      h
                  );
        },
        Qn = function (a) {
            a.Ne = Qa(a.a.Il);
            a.Va = Kn(a);
            var b = a.a.Mi || a.b.ng;
            b && Ln(a, b);
            Mn(a) || Nn(a);
            a.g && mi(a.g, a.Va);
            On(a);
            Pn(a);
            a.pubsub.c("videoready");
            hn(a.Ca);
        },
        Pn = function (a) {
            var b = O("html5-watermark", a.Ke);
            J(b, "html5-branded-watermark");
            a.b.Cj && a.a && a.a.Bj && !qg.test(a.a.Bj)
                ? ((b.src = a.a.Bj), I(b, "html5-branded-watermark"), X(b))
                : a.b.Cj && a.b.Zb
                  ? X(b)
                  : !a.b.hg && a.b.lg
                    ? X(b)
                    : uh(b);
        },
        Rn = function (a, b) {
            a.k("Setting video data");
            a.a = new og(b);
            a.a.e("videoinfo", a.Np, a);
            a.a.e("onStatusFail", a.Op, a);
            a.pubsub.c("internalvideodatachange", "newdata");
            a.ka && (a.ka.Fc(), delete a.ka);
            a.ka = new sn();
            a.la &&
                a.ka.bj("yt", a.a, a.b, u(a.sg, a), u(a.getDuration, a), u(a.getCurrentTime, a));
            a.qa && a.qa.reset();
            a.aj = {};
            var c = O("html5-context-menu-copy-embed-html", a.Ea);
            sh(c, a.a.Gl);
        };
    n = $.prototype;
    n.getVideoData = function () {
        return this.a;
    };
    n.getEnvironmentData = function () {
        return this.b;
    };
    n.k = function (a, b) {
        b || (b = Ub);
        eg.log(b, a);
    };
    n.nq = function () {
        Ch(this.Bc);
        this.Ee(this.S);
        md(this.yg, l);
    };
    n.bj = function () {
        this.k("Initializing the player");
        this.Ga = new Ge(this);
        this.Nd = new Ge(this);
        this.qa = new Gf(u(this.getCurrentTime, this), u(this.kg, this), u(this.Mn, this));
        this.Ca = new fn();
        var a;
        if ((a = this.la.assets.css)) {
            a = xc("div", { class: "html5-player-css-loaded" });
            document.body.appendChild(a);
            var b = 300 == Wc(a, "z-index");
            P(a);
            a = !b;
        }
        if (a) {
            a = { rel: "stylesheet", type: "text/css", href: this.la.assets.css };
            b = document.getElementById("www-player-css");
            a.id = "www-player-css";
            var c = b || document.createElement("link");
            uc(c, a);
            b || document.getElementsByTagName("head")[0].appendChild(c);
        }
        this.xd = new Pl();
    };
    n.sg = function () {
        var a = {},
            a = this.a.sg();
        this.f.webkitDecodedFrameCount &&
            ((a.hmewdfc = this.f.webkitDecodedFrameCount),
            (a.hmewdrop = this.f.webkitDroppedFrameCount),
            (a.hmewvdbc = this.f.webkitVideoDecodedByteCount),
            (a.hmewadbc = this.f.webkitAudioDecodedByteCount));
        this.f.mozParsedFrames &&
            ((a.hmempf = this.f.mozParsedFrames),
            (a.hmemdf = this.f.mozDecodedFrames),
            (a.hmempresented = this.f.mozPresentedFrames),
            (a.hmempainted = this.f.mozPaintedFrames),
            (a.hmempaintdelay = this.f.mozPaintDelay));
        a.volume = this.getVolume();
        a.mos = this.isMuted() ? 1 : 0;
        return a;
    };
    var Sn = function (a, b) {
        b.video_id == a.a.m && !b.force_data_reload ? a.a.Id(b) : Rn(a, b);
    };
    $.prototype.km = function () {
        Z.mb("fs");
        var a = N(this.Lg);
        if (K(a, "html5-video-player")) Gn(this, a);
        else {
            a = N("video-player") || Hn;
            a ||
                (kf(this.la.assets.html, { format: "RAW", method: "GET", lf: this, Rb: this.ut }),
                (a = h));
            if (!a) return;
            Tn(this, a);
        }
        Un(this);
    };
    $.prototype.ut = function (a) {
        if (a.responseText) {
            var b = document.createElement("div");
            b.innerHTML = a.responseText;
            Hn = O("html5-video-player", b);
            Tn(this, Hn);
            Un(this);
        } else this.pubsub.c("nothtml5servable");
    };
    var Tn = function (a, b) {
            var c = N(a.Lg);
            Gn(a, b.cloneNode(j));
            a.z.setAttribute("id", a.la.attrs.id || "video-player");
            c.appendChild(a.z);
        },
        Un = function (a) {
            a.ud(a.z);
            a.S = a.xd.getVolume();
            Jn(a, ah(), l);
            Rn(a, a.la.args);
            if ("detailpage" == a.b.eventLabel) {
                var b;
                a: {
                    var c = a.xd;
                    b = a.a.m;
                    if (c.Bd && (c = c.Bd.get("yt-player-restore-playhead"))) {
                        b = c[b];
                        break a;
                    }
                    b = h;
                }
                b && (a.a.R = b);
            }
            b = a.xd;
            b.Bd && b.Bd.remove("yt-player-restore-playhead");
            Vn(a);
            Wn(a, a.z);
            b = a.Ca;
            c = {};
            c.command_ad_break_started = u(a.Gp, a);
            c.command_ad_break_ended = u(a.Fp, a);
            c.command_pause = Xn(a.pauseVideo, a);
            c.command_play = Xn(a.playVideo, a);
            c.command_seek = Xn(a.seekTo, a);
            c.command_disable_controls = u(a.g.disable, a.g);
            c.command_enable_controls = u(a.g.enable, a.g);
            c.command_redirect_controls = u(a.g.Hp, a.g);
            c.command_stop_redirect_controls = u(a.g.Ml, a.g);
            c.command_redirected_show_is_playing = u(a.g.He, a.g);
            c.command_add_cuerange = u(a.Bp, a);
            c.command_remove_cuerange = u(a.Ip, a);
            c.command_remove_cuerange_all = u(a.Jp, a);
            c.command_preroll_ready = u(a.Ep, a);
            c.command_hide_all_dialogs = u(a.Cp, a);
            c.command_share = u(a.Kp, a);
            c.command_log = u(a.Ec, a);
            b.Pi = c;
            b.va = a.Oi;
            kg()
                ? a.b.autoplay || ("detailpage" == a.b.eventLabel && !a.b.Fb && !a.b.Zb)
                    ? Yn(a)
                    : "leanback" != a.b.eventLabel && Zn(a)
                : a.pubsub.c("nothtml5servable");
        },
        Zn = function (a) {
            a.pubsub.c("initializingmode");
            a.k("Creating thumbnail element");
            $n(a);
            var b = a.Fa,
                c = a.a,
                d = a.b.Je,
                f = document.body;
            f.style.backgroundSize != h ||
            f.style.MozBackgroundSize != h ||
            f.style.WebkitBackgroundSize != h ||
            f.style.MsBackgroundSize != h ||
            f.style.OBackgroundSize != h
                ? ((f = document.createElement("div")),
                  (f.style.backgroundImage = "url(" + Tj(b, c, d) + ")"))
                : ((f = document.createElement("img")),
                  (f.src = Tj(b, c, d)),
                  (c = f),
                  b.clientWidth / b.clientHeight < Rj
                      ? ((c.style.height = "100%"), (c.style.width = "auto"))
                      : ((c.style.height = "auto"), (c.style.width = "100%")));
            I(f, "video-thumbnail");
            a.af = f;
            a.Fa.appendChild(a.af);
            a.ob = j;
            a.pubsub.c("internalstatechange", 5);
        },
        $n = function (a) {
            a.af && (P(a.af), (a.af = k));
            a.ob = l;
        },
        Yn = function (a) {
            ao(a)
                ? a.pubsub.c("nothtml5servable")
                : (a.pubsub.c("initializingmode"),
                  a.k("initializing playback"),
                  $n(a),
                  a.f && (P(a.f), oh.releaseTag(a.f)),
                  a.ka.Eg(),
                  Jn(a, oh.getTag()),
                  a.pubsub.c("internalstatechange", 3),
                  bo(a) && (Kn(a).length ? Qn(a) : yg(a.a, hh(a.b, a.a))));
        },
        ao = function (a) {
            var b = a.a.Vl && !a.b.Je;
            b && a.k("Has unsupported ad content");
            return b;
        };
    $.prototype.wq = function () {
        this.ze += 45;
        this.Ue.style.MozTransform = "rotate(" + this.ze + "deg)";
        this.Ue.style.WebkitTransform = "rotate(" + this.ze + "deg)";
        this.Ue.style.OTransform = "rotate(" + this.ze + "deg)";
        this.Ue.style.msTransform = "rotate(" + this.ze + "deg)";
    };
    var On = function (a) {
            a.k("In loadVideo");
            0 == a.Ne.length
                ? (a.qa.Eg(), a.playVideo())
                : (a.pubsub.c("internalstatechange", 2), a.pauseVideo());
        },
        Xn = function (a, b) {
            return function () {
                var c = Array.prototype.slice.call(arguments);
                Vd(function () {
                    a.apply(b || this, c);
                });
            };
        };
    n = $.prototype;
    n.Gp = function () {
        this.pubsub.c("command_ad_break_started");
    };
    n.Fp = function () {
        this.pubsub.c("command_ad_break_ended");
    };
    n.Cp = function () {
        var a = rc("html5-popup-dialog", this.z);
        D(
            a,
            function (a) {
                uh(a);
            },
            this
        );
    };
    n.Ec = function (a, b) {
        b.event = a;
        this.ka.Ec(b);
    };
    n.Kp = function () {
        this.pubsub.c("SHARE_CLICKED", this.a.m, this.a.Ib);
    };
    var In = function (a) {
        "loadstart,loadeddata,loadedmetadata,play,playing,pause,ended,suspend,progress,seeking,seeked,timeupdate,durationchange,error,stalled,waiting"
            .split(",")
            .forEach(function (a) {
                this.Ga.G(this.f, a, this.hs);
            }, a);
    };
    $.prototype.hs = function (a) {
        var b = a.target;
        if (b.hasSrc()) {
            var c,
                d = "internalstatechange";
            switch (a.type) {
                case "durationchange":
                    this.a.Ba = b.getDuration();
                    this.pubsub.c("internalvideodatachange", "videoinfo");
                    break;
                case "ended":
                    a.target.pauseVideo();
                    this.pubsub.c(d, 2);
                    this.qd && co(this, l);
                    c = 0;
                    break;
                case "error":
                    b = { event: "streamingerror" };
                    a = a.target.error;
                    b.ec = 107;
                    a &&
                        a.code &&
                        (a.code == a.MEDIA_ERR_ABORTED
                            ? (b.ec = 200)
                            : a.code == a.MEDIA_ERR_NETWORK
                              ? (b.ec = 201)
                              : a.code == a.MEDIA_ERR_DECODE
                                ? (b.ec = 202)
                                : a.code == a.MEDIA_ERR_SRC_NOT_SUPPORTED && (b.ec = 203));
                    this.ka.Ec(b);
                    break;
                case "loadeddata":
                    Ch(this.rg);
                    this.Ig && window.clearTimeout(this.Ig);
                    eo(this);
                    break;
                case "loadedmetadata":
                    Z.mb("fvb");
                    this.a.R && (this.f.currentTime = this.a.R);
                    break;
                case "loadstart":
                    Z.mb("gv");
                    this.Bc && Ch(this.Bc);
                    this.Bc = Bh(u(this.fm, this), 100);
                    break;
                case "pause":
                    this.g.He(l);
                    this.f.ended || (c = 2);
                    break;
                case "play":
                    this.g.He(j);
                    c = 1;
                    break;
                case "playing":
                    this.qd && co(this, j);
                    c = 1;
                    this.Bc && (Z.mb("plev"), this.fm());
                    break;
                case "suspend":
                case "progress":
                    this.Ie();
                    d = "onLoadProgress";
                    c = this.getLoadProgressFraction();
                    break;
                case "seeking":
                    b.inUnbufferedArea() && (c = 3);
                    break;
                case "seeked":
                    c = this.getCurrentTime();
                    this.g.Ei.innerHTML = mh(c);
                    c = this.g;
                    var a = this.getCurrentTime(),
                        f = this.getDuration();
                    c.Sl.innerHTML =
                        parseInt(100 * c.Fe, 10) +
                        "% at " +
                        parseInt(a, 10) +
                        " of " +
                        parseInt(f, 10) +
                        " seconds";
                    b = this.Hg || !b.paused;
                    this.g.He(b);
                    c = b ? 1 : 2;
                    break;
                case "stalled":
                    this.ka.Ec({ event: "streamingerror", ec: 300 });
                    break;
                case "timeupdate":
                    this.Ie();
                    d = "onVideoProgress";
                    c = b.currentTime;
                    break;
                case "waiting":
                    b.ended || (c = 3);
            }
            c != h && this.pubsub.c(d, c);
        }
    };
    var fo = function (a, b, c) {
        if (b == k) a.k("setCurrentFormat_(null) called. Ignoring.");
        else {
            a.k("Setting current format to: " + b.toString());
            a.a.format = b;
            var b = a.g,
                d = a.a.format.Nc;
            b.k("setting quality to: " + d);
            ie(b.vd, "value", d);
            b.vd.setAttribute("aria-label", d + " " + Dh("HTML5_QUALITY_SETTING"));
            var f = O("yt-uix-button-menu-item.active", b.Se);
            f && J(f, "active");
            b = b.Se.querySelector(".yt-uix-button-menu-item" + ('[data-value="' + d + '"]'));
            I(b, "active");
            !a.ob && !c && (a.k("Loading video"), On(a));
            a.pubsub.c("onPlaybackQualityChange", a.Xi());
        }
    };
    $.prototype.toggleThreeD = function () {
        this.a.Kc = !this.a.Kc;
        this.preparePlayerThreeD();
        this.a.R = this.f.currentTime;
        this.Va = Kn(this);
        fo(this, ng(this.b.Lb, this.Va));
        this.g && (mi(this.g, this.Va), qi(this.g, this.a.Kc));
    };
    var Kn = function (a) {
            return mg(a.a.Ae, !!a.a.Pe || a.a.Kc);
        },
        Nn = function (a) {
            0 == a.Va.length
                ? a.k("setFormatForPlayerSize_ called when there are no supportedFormats_.", H)
                : fo(a, ng(a.b.Lb, a.Va), j);
        };
    $.prototype.Xg = ["hd1080", "hd720", "large", "medium", "small"];
    $.prototype.Mk = 1e3;
    $.prototype.Xi = function () {
        return Mn(this) || this.a.Mi || this.b.ng;
    };
    var Mn = function (a) {
        if (a.a.format) return a.a.format.Hd;
    };
    $.prototype.kq = function (a) {
        this.a.R = this.f.currentTime;
        Ln(this, a);
    };
    var Ln = function (a, b) {
        if (!a.a.format || a.a.format.Hd != b) {
            var c;
            c = k;
            var d = a.Xg.indexOf(b);
            if (0 > d) c = ng(a.b.Lb, a.Va);
            else for (var f = a.Xg.length; d < f && !(c = a.Sm(a.Xg[d])); d++);
            c && c != a.a.format && fo(a, c);
        }
    };
    $.prototype.Rt = function (a) {
        a = af(a.responseText);
        "fail" == a.status ? this.jn(0, a) : ((nf.addto_ajax = a.addto_ajax_token), go(this));
    };
    var go = function (a) {
        var b = a.mr,
            c = a.jn,
            d = {
                video_ids: a.a.m,
                playlist_id: "",
                new_playlist_name: "",
                session_token: nf.addto_ajax
            },
            f = {},
            g = "";
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
        kf("/addto_ajax", {
            jr: j,
            format: "XML",
            method: "POST",
            Mg: f,
            Ym: d,
            lf: a,
            qf: c,
            Rb: b
        });
    };
    n = $.prototype;
    n.mr = function () {
        Rh(this.g.Dc, "html5-async-success");
    };
    n.jn = function (a, b) {
        Sh(this.g.Dc, b && b.error_message);
    };
    n.bq = function () {
        return this.Xg.filter(this.Sm, this);
    };
    n.dq = function () {
        var a = this.getLoadProgressFraction();
        return Math.floor(a * this.Mk);
    };
    n.fq = function () {
        var a = 0;
        this.getDuration() && (a = this.f.startTime / this.getDuration());
        return Math.floor(a * this.Mk);
    };
    n.eq = function () {
        return this.Mk;
    };
    n.ud = function (a) {
        this.k("decorate called");
        this.b.jg && I(a, this.b.jg + "-theme");
        I(a, "el-" + this.b.eventLabel);
        this.b.lg && I(a, "modest-branding");
        this.b.Wi && I(a, "html5-hide-share");
        var b = document.createElement("video"),
            c = b.muted;
        b.muted = !c;
        b.muted != c || I(a, "html5-hide-volume");
        a.style.display = "";
        this.Fa = O("video-container", a);
        this.pg = O("video-content", a);
        this.Ke = O("video-controls", a);
        this.yg = O("video-fallback", a);
        this.cj = O("video-fallback-content", this.yg);
        this.Ue = O("html5-video-loader", this.Fa);
        this.Ea = O("html5-context-menu", this.Fa);
        this.rd = O("html5-info-bar", this.Fa);
        this.zl = O("html5-title", this.rd);
        this.eg = O("html5-author", this.rd);
        this.mg = new xn(this.z);
        this.b.Vi && (this.qd = I(a, "html5-autohide"));
        this.b.vg && this.vg();
        this.b.Fb && (I(a, "html5-tablet"), I(document.body, "html5-tablet-body"));
        (this.b.Zb || !this.b.Ua) && I(a, "html5-native-controls");
        this.g = new ki();
        this.g.ud(this.Ke);
        mi(this.g, this.Va);
        this.g.pubsub.e("playpausetoggled", u(this.Vp, this));
        this.g.pubsub.e("seekto", u(this.Yp, this));
        this.g.pubsub.e("mutetoggled", u(this.Up, this));
        this.g.pubsub.e("volumechanged", u(this.fj, this));
        this.g.pubsub.e("speedchanged", u(this.Zp, this));
        this.g.pubsub.e("sizechangerequested", u(this.Wp, this));
        this.g.pubsub.e("fullscreentoggled", u(this.Tp, this));
        this.g.pubsub.e("qualitychanged", u(this.Xp, this));
        this.g.pubsub.e("beginseeking", u(this.Rp, this));
        this.g.pubsub.e("endseeking", u(this.Sp, this));
        this.g.pubsub.e("watchlater", u(this.$p, this));
        this.g.pubsub.e("watchonyoutube", u(this.aq, this));
        document.createElement("video").defaultPlaybackRate &&
            !tb &&
            (this.g.zd.style.display = "block");
        this.b.xg && ((b = this.g), X(b.og), X(b.Ui), ho(this));
        this.b.wg || uh(this.g.dg);
        b = O("html5-storyboard", a);
        new nn(this).ud(b);
        a = O("html5-show-video-info-template", a);
        this.xp = Xj(
            a,
            "videoId,videoWidth,videoHeight,volume,streamType,decodedFrames,droppedFrames,parsedFrames,presentedFrames,videoBytesDecoded,audioBytesDecoded,paintedFrames,paintDelay".split(
                ","
            )
        );
    };
    n.vg = function () {
        if (this.b.Fb) {
            var a = u(function (a) {
                return io(a) || K(a.target, "html5-draggable");
            }, this);
            new Uh(
                this.z,
                u(function (a) {
                    this.ob
                        ? this.ob && oh.hasTags(h) && this.$m(a)
                        : io(a) &&
                          (K(this.z, "hide-controls") ? this.Ua() : this.Nj(),
                          (a = bi.getInstance()),
                          a.Pd && gi(a, a.Pd));
                }, this),
                l,
                a
            );
            S(this.z, "gesturechange", u(this.gr, this));
            S(this.z, "gestureend", u(this.hr, this));
        } else
            (S(this.z, "click", u(this.$m, this)),
                S(this.z, "dblclick", u(this.fr, this)),
                S(this.z, "click", u(this.Ua, this)),
                we(this.z, "move", u(this.Ua, this)),
                we(this.z, "out", u(this.Nj, this)));
        var b = u(function () {
            oh.fillPool(4);
            this.b.Fb && Xh();
            this.z.removeEventListener("click", b, j);
        }, this);
        this.z.addEventListener("click", b, j);
        P(this.Ea);
        document.body.appendChild(this.Ea);
        S(this.z, "keypress", u(this.Fj, this));
        S(this.z, "keydown", u(this.er, this));
        jo(this);
        Ce(u(this.dr, this));
        S(window, "resize", u(this.pb, this));
        var a = O("html5-watermark", this.Ke),
            c = u(this.ir, this);
        S(a, "click", c);
        Pn(this);
        "embedded" == this.b.eventLabel && S(this.rd, "click", c);
    };
    var jo = function (a) {
            P(a.Ea);
            document.body.appendChild(a.Ea);
            S(a.z, "contextmenu", u(a.Js, a));
            var b = {
                    vs: a.Ds,
                    ws: a.Es,
                    xs: u(function () {
                        ko(this);
                    }, a),
                    ys: u(function () {
                        ko(this, j);
                    }, a),
                    zs: a.Fs,
                    As: a.Gs,
                    Bs: a.Hs,
                    Cs: a.Is
                },
                c;
            for (c in b) lo(a, c, b[c]);
            a = O("html5-context-menu-pop-out", a.Ea);
            sh(a, window.opener == k);
        },
        lo = function (a, b, c) {
            b = O(kh[b], a.Ea);
            S(
                b,
                "click",
                u(
                    function (a, b) {
                        this.Pf();
                        a.call(this, b);
                        b.stopPropagation();
                    },
                    a,
                    c
                )
            );
        },
        ko = function (a, b) {
            mo(a, a.getVideoUrl() + (b ? "#t=" + Math.floor(a.f.currentTime) + "s" : ""), "URL");
        };
    $.prototype.Es = function () {
        var a = zh("EMBED_HTML_TEMPLATE"),
            b = zh("EMBED_HTML_URL"),
            c = this.b.td(),
            b = b.replace(/__videoid__/g, this.a.m),
            a = a.replace(/__url__/g, xa(b)),
            a = a.replace(/__width__/g, c.width),
            a = a.replace(/__height__/g, c.height);
        mo(this, a, "Text");
    };
    var mo = function (a, b, c) {
        var d = l;
        window.clipboardData && (d = window.clipboardData.setData(c, b));
        d ||
            ((a = a.mg),
            yn(a, "html5-modal-panel-clipboard-substitute"),
            (a.Nf.value = b),
            a.Nf.focus(),
            Ah(u(a.io, a), 100));
    };
    n = $.prototype;
    n.Is = function () {
        this.stopVideo();
    };
    n.Gs = function () {
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
            shost: df(wg(this.a)),
            sourceid: this.a.zp,
            vid: this.b.pd,
            vq: this.b.ng,
            w: this.f.clientWidth
        };
        w(a, this.sg());
        a.videoId && ((a.v = a.videoId), delete a.videoId);
        this.b.Je && (a.mobile = "1");
        this.ka.Ec(a);
        window.open(ih(this.a));
    };
    n.getDebugText = function (a) {
        var b = {};
        a && (b = wn(this.ka));
        b.debug_videoId = this.a.m;
        b.debug_playbackQuality = this.Xi();
        b.debug_date = new Date().toString();
        return JSON.stringify(b);
    };
    n.Ds = function () {
        mo(this, this.getDebugText(j), "Text");
    };
    n.cq = function () {
        return this.getDebugText();
    };
    n.Hs = function () {
        this.wl || (this.wl = Bh(u(this.rp, this), 500));
        this.rp();
        Ul(
            u(function () {
                Ch(this.wl);
            }, this)
        );
    };
    n.rp = function () {
        var a = this.f,
            b = "-",
            c = "-",
            d = "-",
            f = "-",
            g = "-",
            i = "-",
            m = "-",
            p = "-";
        a.webkitDecodedFrameCount &&
            ((b = a.webkitDecodedFrameCount),
            (c = a.webkitDroppedFrameCount),
            (g = a.webkitVideoDecodedByteCount),
            (i = a.webkitAudioDecodedByteCount));
        a.mozParsedFrames &&
            ((d = a.mozParsedFrames),
            (b = a.mozDecodedFrames),
            (f = a.mozPresentedFrames),
            (m = a.mozPaintedFrames),
            (p = a.mozPaintDelay));
        var s = jh(this.b),
            a = this.mg,
            b = this.xp.Kd({
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
    n.preparePlayerThreeD = function (a) {
        this.a.Ag && this.g && qi(this.g, this.a.Kc);
        (a = !!this.a.Pe || !!this.a.Kc || !a) && this.f.setAttribute("mozStereoMode", "1");
        if (Ym()) {
            this.f.setAttribute("mozStereoMode", a ? "1" : "0");
            var a = Nf[a ? this.a.Lp : 0],
                b = document.createElement("NvStereoExtDataElement");
            b.setAttribute("stereoMode", a);
            Ac(document.documentElement, b);
            Be(b, "3DModeEvent");
        }
    };
    n.getCurrentTime = function () {
        return this.f.getCurrentTime();
    };
    n.getPlayerState = function () {
        return this.nb;
    };
    n.kg = function () {
        return -1 == this.nb || 5 == this.nb ? Xf : 0 == this.nb ? Uf : 2 == this.nb ? Vf : Wf;
    };
    n.qq = function (a) {
        a !== this.nb &&
            (ec(this.z, lh[this.nb], lh[a]),
            3 == a && (Ch(this.rg), (this.rg = Bh(u(this.wq, this), 125))),
            (this.nb = a),
            this.Hc != Yf && no(this, this.kg()),
            this.Hc == Xf && this.g.He(l),
            this.pubsub.c("onStateChange", a),
            this.Hc == Uf &&
                ("embedded" == this.b.eventLabel &&
                    gh(this.b) &&
                    (this.k("Playing the next video in the playlist."), this.nextVideo()),
                this.Ua()));
    };
    n.sq = function (a) {
        "newdata" == a && (jn(this.Ca), Rh(this.g.Dc));
        "embedded" == this.b.eventLabel &&
            this.b.hg &&
            (this.a.title
                ? (X(this.rd),
                  (this.zl.innerHTML = this.a.title),
                  this.a.author
                      ? (X(this.eg), (qe("span", this.eg).innerHTML = this.a.author))
                      : uh(this.eg))
                : uh(this.rd));
        this.Cl = Math.min(0.8 * this.a.Ba, 180);
        var b = this.g,
            c = this.a.Ba;
        b.k("Setting duration to: " + c.toString());
        b.Hl.innerHTML = mh(c);
        var d = O("yt-uix-range-tooltip", b.yd);
        d || (d = b.yd);
        ie(d, "range-max", c);
        sh(this.g.vd, !!this.a.Ae.length);
        this.S.volume = (this.S.nonNormalized || this.S.volume) * this.a.Gi;
        this.a.Hi
            ? (this.f.setVolume(0, j), this.g.setVolume(0, j), this.g.disable(["audio"]))
            : this.g.Kb("audio") && (this.g.enable(["audio"]), this.Ee(this.S));
        this.f.setAttribute("data-youtube-id", this.a.m);
        this.a.Fi &&
            ((b = 1e3 * this.a.Ba),
            oo(this, "part2viewed", 0, b),
            oo(this, "videoplaytime25", 0.25 * b, b),
            oo(this, "videoplaytime50", 0.5 * b, b),
            oo(this, "videoplaytime75", 0.75 * b, b),
            oo(this, "videoplaytime100", b, 2147483647));
        this.pubsub.c("onVideoDataChange", a, this.a);
    };
    n.mq = function () {
        if (this.b.o) {
            var a = this.b.o,
                b = u(this.Dr, this);
            a.Xj = b;
            a.Ob && a.Xj();
        }
    };
    var oo = function (a, b, c, d) {
        b in a.aj ||
            ((c = new Ef(c, d, { id: b, priority: 0 })),
            c.pubsub.e("onEnter", a.eo, a),
            c.pubsub.e("onExit", a.eo, a),
            a.qa.addCueRange(c),
            (a.aj[b] = c));
    };
    $.prototype.eo = function (a) {
        var b = a.getId();
        "part2viewed" == b
            ? (po(this), this.a.Fi && qf(this.a.Fi), this.a.$l && qf(this.a.$l))
            : "videoplaytime100" != b && tn(this.ka);
        this.a.am && ((b = a.getId()), (b = ef(this.a.am, { label: b })), qf(b));
        this.qa.removeCueRange(a);
    };
    var po = function (a) {
            a.a.gm && (Mj("view", a.a.gj), (a.a.gm = l));
        },
        no = function (a, b) {
            var c = b || a.kg();
            if (c !== a.Hc) {
                var d = a.Hc;
                a.Hc = c;
                c = new Sf(c, d);
                d = a.qa;
                if (d.bh && !d.ub)
                    if ((If(d), c.state.Jj)) {
                        d.Ud = k;
                        for (var f = [], g = 0; g < d.wb.length; g++) {
                            var i = d.wb[g];
                            i.Jg && 2147483647 > i.end && (f.push(i), d.wb.splice(g--, 1));
                        }
                        g = [];
                        if (f.length) for (i = 0; i < f.length; i++) g.push(["onExit", f[i]]);
                        d = g.concat(Jf(d, yf(d.Sb, d.Y)));
                        for (g = 0; g < d.length; g++)
                            ((f = d[g]), (i = f[1]), i.pubsub.c.apply(i.pubsub, f));
                    } else
                        c.state.Oj
                            ? ((d.Y = 1e3 * d.Jb()), d.fh.stop(), d.fh.start(), d.eb())
                            : (d.fh.stop(),
                              c.Zm.Oj
                                  ? c.state.pf &&
                                    !d.Wm() &&
                                    sf(d.Sb, Math.max(d.Y - 2e3, 0)) &&
                                    (d.rf = Vd(u(d.eb, d)))
                                  : d.eb());
                qo(a, "onStateChange", c);
            }
        };
    n = $.prototype;
    n.Mn = function () {
        return this.f.isPaused();
    };
    n.seekTo = function (a) {
        a = a || 0;
        this.ob ? ((this.a.R = a), Yn(this)) : this.f.seekTo(a);
    };
    n.getDuration = function () {
        return (this.a && this.a.Ba) || 0;
    };
    n.getPlayProgressFraction = function () {
        var a = 0;
        this.getDuration() && (a = this.getCurrentTime() / this.getDuration());
        return a;
    };
    n.getLoadProgressFraction = function () {
        return this.getDuration() && this.f.buffered && 0 < this.f.buffered.length
            ? this.f.buffered.end(this.f.getBufferedTimeRangeIndex()) / this.getDuration()
            : 0;
    };
    n.getVolume = function () {
        return this.S.volume;
    };
    n.setVolume = function (a) {
        this.S.volume = a;
        this.pubsub.c("internalvolumechange", this.S);
    };
    n.fj = function (a) {
        this.S = a;
        this.pubsub.c("internalvolumechange", this.S);
    };
    n.isMuted = function () {
        return this.S.muted;
    };
    n.mute = function () {
        this.S.muted = j;
        this.pubsub.c("internalvolumechange", this.S);
    };
    n.unMute = function () {
        this.S.muted = l;
        this.pubsub.c("internalvolumechange", this.S);
    };
    n.loadVideoById = function (a, b, c) {
        var d = { list: this.list };
        "object" == typeof a ? w(d, a) : w(d, { start: b, video_id: a, vq: c });
        return this.loadVideoByPlayerVars(d);
    };
    n.loadVideoByPlayerVars = function (a) {
        this.stopVideo();
        Sn(this, a);
        if (!bo(this)) return l;
        Yn(this);
        return j;
    };
    n.Re = function (a, b, c) {
        this.loadVideoById(a, b, c) && (this.a.lb = j);
    };
    n.cueVideoById = function (a, b, c) {
        var d = { list: this.list };
        "object" == typeof a ? w(d, a) : w(d, { start: b, video_id: a, vq: c });
        return this.cueVideoByPlayerVars(d);
    };
    n.cueVideoByPlayerVars = function (a) {
        this.stopVideo();
        Sn(this, a);
        bo(this) && Zn(this);
    };
    n.watchVideoById = function (a, b) {
        if (this.a.m == a) this.seekTo(0, j);
        else if (!this.ea && "detailpage" == this.b.eventLabel) {
            var c = {};
            b && (c.feature = b);
            window.location.href = ro(this, a, c);
        } else this.loadVideoById(a);
    };
    n.cuePlaylist = function (a, b, c, d) {
        this.Td = j;
        so(this, a, b, c, d);
    };
    n.loadPlaylist = function (a, b, c, d) {
        this.Td = l;
        so(this, a, b, c, d);
    };
    var so = function (a, b, c, d, f) {
        var g = b;
        if ("string" == typeof b || b instanceof Array)
            g = { api: b, index: c, startSeconds: d, suggestedQuality: f };
        a.b.Id(g);
        a.pubsub.c("internalenvironmentdatachange");
    };
    n = $.prototype;
    n.Dr = function () {
        this.Td
            ? this.cueVideoById(Hg(this.b.o).m, this.b.o.R, this.b.o.Rm)
            : this.Re(Hg(this.b.o).m, this.b.o.R, this.b.o.Rm);
    };
    n.nextVideo = function () {
        this.b.o &&
            (this.b.o.Ob
                ? (this.b.o.loop || this.b.o.ba + 1 < this.b.o.na.length) &&
                  this.Re(this.b.o.Tb().m)
                : (this.b.o.Tb(), (this.Td = l)));
    };
    n.previousVideo = function () {
        this.b.o &&
            (this.b.o.Ob
                ? (this.b.o.loop || 0 <= this.b.o.ba - 1) && this.Re(Ig(this.b.o).m)
                : (Ig(this.b.o), (this.Td = l)));
    };
    n.playVideoAt = function (a) {
        this.b.o && (this.b.o.Ob ? this.Re(Hg(this.b.o, a).m) : (Gg(this.b.o, a), (this.Td = l)));
    };
    n.getPlaylist = function () {
        if (!this.b.o) return k;
        for (var a = [], b = 0; b < this.b.o.getLength(); b++) a[b] = Hg(this.b.o, b).m;
        return a;
    };
    n.getPlaylistId = function () {
        return !this.b.o || !this.b.o.Xd ? k : this.b.o.Xd.toString();
    };
    n.getPlaylistIndex = function () {
        return this.b.o ? this.b.o.ba : k;
    };
    n.setShuffle = function (a) {
        this.b.o && this.b.o.setShuffle(a);
    };
    n.setLoop = function (a) {
        this.b.o && (this.b.o.loop = a);
    };
    var bo = function (a) {
        if (a.a.m) return j;
        a.pubsub.c("unabletoplay", 2);
        return l;
    };
    $.prototype.getVideoUrl = function () {
        return ro(this, this.a.m);
    };
    var ro = function (a, b, c) {
        b = { list: a.a.Ib, v: b };
        a.b.eventLabel && (b.feature = "player_" + a.b.eventLabel);
        c && w(b, c);
        return U(
            a.b.protocol +
                "://" +
                ("www.youtube-nocookie.com" == window.location.host
                    ? "www.youtube.com"
                    : window.location.host) +
                "/watch",
            b
        );
    };
    n = $.prototype;
    n.addCueRange = function () {};
    n.Bp = function (a) {
        var b = this.a.Ba;
        0 < b &&
            a.forEach(function (a) {
                a.visible && this.g.La(a.start / (1e3 * b));
            }, this);
        this.qa.addCueRange.apply(this.qa, a);
    };
    n.Ip = function (a) {
        var b = this.a.Ba;
        0 < b &&
            a.forEach(function (a) {
                a.visible && this.g.nf(a.start / (1e3 * b));
            }, this);
        this.qa.removeCueRange.apply(this.qa, a);
    };
    n.Jp = function (a) {
        for (var b = this.qa, c = b.fb.length - 1; 0 <= c; c--) b.fb[c].Mj == a && Hf(b, c);
        b.eb();
    };
    n.Ep = function (a) {
        a = this.Ne.indexOf(a);
        0 <= a && this.Ne.splice(a, 1);
        0 == this.Ne.length
            ? (this.qa.Eg(), 0 < xf(this.qa.Sb, -2147483648).length || this.playVideo())
            : this.pauseVideo();
    };
    n.addEventListener = function (a, b) {
        var c = b;
        "string" == typeof b &&
            (c = function () {
                q(b).apply(window, arguments);
            });
        this.pubsub.e(a, c);
    };
    var Wn = function (a, b) {
            a.We = {
                addEventListener: u(a.addEventListener, a),
                getCurrentTime: u(a.getCurrentTime, a),
                getPlayerState: u(a.getPlayerState, a),
                seekTo: u(a.jq, a),
                getDuration: u(a.getDuration, a),
                getVolume: u(a.getVolume, a),
                setVolume: u(a.setVolume, a),
                isMuted: u(a.isMuted, a),
                mute: u(a.mute, a),
                unMute: u(a.unMute, a),
                playVideo: u(a.iq, a),
                pauseVideo: u(a.bm, a),
                stopVideo: u(a.hq, a),
                getPlaybackQuality: u(a.Xi, a),
                setPlaybackQuality: u(a.kq, a),
                getAvailableQualityLevels: u(a.bq, a),
                getVideoBytesLoaded: u(a.dq, a),
                getVideoBytesTotal: u(a.eq, a),
                getVideoStartBytes: u(a.fq, a),
                setSize: u(a.setSize, a),
                loadModule: u(a.Ca.gq, a.Ca),
                unloadModule: u(a.Ca.lq, a.Ca),
                loadVideoById: u(a.Re, a),
                cueVideoById: u(a.cueVideoById, a),
                getVideoUrl: u(a.getVideoUrl, a),
                getDebugText: u(a.cq, a),
                addCueRange: u(a.addCueRange, a),
                loadPlaylist: u(a.loadPlaylist, a),
                cuePlaylist: u(a.cuePlaylist, a),
                nextVideo: u(a.nextVideo, a),
                previousVideo: u(a.previousVideo, a),
                playVideoAt: u(a.playVideoAt, a),
                setLoop: u(a.setLoop, a),
                setShuffle: u(a.setShuffle, a),
                getPlaylist: u(a.getPlaylist, a),
                getPlaylistId: u(a.getPlaylistId, a),
                getPlaylistIndex: u(a.getPlaylistIndex, a),
                getApiInterface: u(function () {
                    var a = [],
                        b;
                    for (b in this.We) a.push(b);
                    return a;
                }, a),
                getVideoData: u(function () {
                    return { video_id: this.a.m, author: this.a.author, title: this.a.title };
                }, a),
                destroy: function () {}
            };
            ("embedded" == a.b.eventLabel ? Qf(a.b.kb, Of) : 1) &&
                w(a.We, {
                    loadVideoByPlayerVars: u(a.loadVideoByPlayerVars, a),
                    cueVideoByPlayerVars: u(a.cueVideoByPlayerVars, a)
                });
            a.Oi = fb(a.We);
            var c = {
                loadVideoById: u(a.loadVideoById, a),
                loadVideoByPlayerVars: u(a.loadVideoByPlayerVars, a),
                cueVideoByPlayerVars: u(a.cueVideoByPlayerVars, a),
                watchVideoById: u(a.watchVideoById, a),
                playVideo: u(a.Yl, a),
                seekTo: u(a.Qe, a),
                appendToVideoContent: u(a.appendToVideoContent, a),
                appendAboveVideoControls: u(a.appendAboveVideoControls, a),
                preparePlayerThreeD: u(a.preparePlayerThreeD, a),
                toggleThreeD: u(a.toggleThreeD, a),
                getRootNode: u(function () {
                    return this.z;
                }, a),
                getEnvironmentData: u(a.getEnvironmentData, a),
                getVideoData: u(a.getVideoData, a),
                isFullscreen: u(function () {
                    return this.ea;
                }, a),
                Kb: u(a.g.Kb, a.g)
            };
            w(a.Oi, c);
            w(b, a.We);
            to(a);
        },
        to = function (a) {
            if (a.la.args.jsapicallback) {
                var b = a.la.args.jsapicallback;
                (b = q(b)) && b(a.b.Sg);
            }
            window.onYouTubePlayerReady && onYouTubePlayerReady(a.b.Sg);
        };
    n = $.prototype;
    n.Zp = function (a) {
        this.k("Setting playback to: " + a);
        this.f.setPlaybackRate(parseFloat(a));
    };
    n.kr = function () {
        this.ka.Ec({ event: "streamingerror", ec: 102 });
    };
    n.Up = function () {
        this.isMuted() ? this.unMute() : this.mute();
    };
    n.Vp = function () {
        this.k("Play/pause toggled.");
        uo(this);
        no(this);
    };
    n.fm = function () {
        if (0 < this.f.currentTime && !this.Ol) {
            Ch(this.Bc);
            this.a.m && Z.info("docid", this.a.m);
            this.a.pa && Z.info("plid", this.a.pa);
            this.a.Gb && Z.info("hbid", this.a.Gb);
            0 < this.a.R && Z.info("start", this.a.R.toString());
            Z.info("fmt", this.a.format.zc.toString());
            Z.info(
                "tds",
                Math.round(this.getLoadProgressFraction() * this.getDuration()).toString()
            );
            Z.mb("aft");
            if ("detailpage" == this.b.eventLabel) {
                var a = this.Ca.Cd,
                    b;
                for (b in a) Z.mb(b, a[b]);
                var a = this.Ca.Ri,
                    c;
                for (c in a) Z.info(c, a[c]);
                Z.ug();
            }
            this.Ol = j;
            c = this.ka;
            if (c.Ce) c.k("Attempted to start sending initial pings twice.");
            else {
                a = wn(c);
                a.Ji = j;
                c.Y = c.Jb();
                c.Me = c.Y;
                a.De = [c.Y];
                a.Ii = a.De;
                c.Si = (x() - c.Le) / 1e3;
                a.send();
                c.a.fg &&
                    (c.tg
                        ? c.k("Do not call startSendingDetailedPings_ twice")
                        : (un(c), (c.tg = Bh(u(c.Nl, c), 1e4))));
                c.b.Ge &&
                    (c.Ce
                        ? R(
                              Tb,
                              "yt.tracking.VideoStats",
                              "Tried to logUserWatch inappropriately.",
                              h
                          )
                        : ((a = c.b),
                          (b = c.a),
                          (a = {
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
                          }),
                          w(a, c.Da()),
                          (a = U(c.b.Db + "user_watch", a)),
                          qf(a)));
                c.a.Ac &&
                    c.a.ig &&
                    qf(
                        U(c.b.Db + "ptracking", {
                            html5: "1",
                            video_id: c.a.m,
                            plid: c.a.pa,
                            ptk: c.a.Ac,
                            oid: c.a.Al,
                            ptchn: c.a.ig,
                            pltype: c.a.Bl
                        })
                    );
                if (c.a.Dl)
                    if (c.Ce)
                        R(Tb, "yt.tracking.VideoStats", "Tried to logGetVideo inappropriately.", h);
                    else {
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
                        a.autoplay && (d.autoplay = "1");
                        b.lb && (d.splay = "1");
                        0 < b.R && (d.start = 1e3 * b.R);
                        b.El && (d.tmi = "1");
                        a = U(c.Ll, d);
                        qf(a);
                    }
                c.Ce = j;
            }
            po(this);
        }
    };
    n.Ee = function (a) {
        a.volume = Oc(a.volume, 0, 100);
        a.nonNormalized = a.volume / this.a.Gi;
        if (this.b.Ua) {
            var b = this.xd;
            if (b.Gd) {
                var c = {};
                c.volume = isNaN(a.volume) ? b.getVolume().volume : Oc(a.volume, 0, 100);
                c.nonNormalized = a.nonNormalized;
                c.muted = a.muted == h ? b.getVolume().muted : a.muted;
                try {
                    b.Gd.set("yt-player-volume", c);
                } catch (d) {}
            }
        }
        this.g.Kb("audio") ||
            (this.g.setVolume(a.volume, a.muted),
            this.f.setVolume(a.volume, a.muted),
            this.pubsub.c("onVolumeChange", a));
    };
    n.Ie = function () {
        this.$b = this.f.currentTime;
        if (
            1 == this.nb &&
            this.Ni &&
            (0 < this.zg && this.$b > this.zg && (this.$i += this.$b - this.zg),
            this.a.Ba && !this.a.Ul && this.$i >= this.Cl)
        ) {
            var a;
            a = this.b;
            var b = this.a,
                c = Oc(this.$b / b.Ba, 0, 1),
                c = {
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
            a.autoplay && (c.autoplay = "1");
            b.lb && (c.splay = "1");
            b.Hb && (c.subscribed = b.Hb);
            b.Gb && (c.hbid = b.Gb);
            a = U(a.Db + "set_awesome", c);
            qf(a);
            this.a.Ul = j;
        }
        if (
            this.a.Fl &&
            ((a = this.a.Yi),
            (1 == a && 0 < this.$b) || (2 == a && 20 <= this.$b) || (3 == a && 30 <= this.$b))
        )
            ((a = this.ka),
                a.Ce &&
                    ((b = a.b),
                    (c = a.a),
                    (a = {
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
                    }),
                    (a = U("//s2.youtube.com/s", a)),
                    qf(a)),
                this.a.Yi++);
        this.zg = this.$b;
        this.g.Ei.innerHTML = mh(this.f.currentTime);
        a = this.getPlayProgressFraction();
        this.f.buffered && 0 < this.f.buffered.length
            ? ((b = this.getLoadProgressFraction()),
              (c = this.g),
              (c.Fe = a),
              (c.Ql = b),
              oi(c),
              (a = this.f.getBufferedTimeRangeIndex()),
              !Z.timer.l2s && 2 < this.f.buffered.end(a) && Z.mb("l2s"),
              this.f.buffered.end(a))
            : ((b = this.g), b.Ki || ((b.Fe = a), oi(b)));
        this.getDuration();
        this.Ap ||
            (this.Zi && window.clearTimeout(this.Zi),
            this.f.isPaused() ||
                (this.Zi =
                    this.f.played && 0 == this.f.played.length
                        ? window.setTimeout(u(this.Ie, this), 100)
                        : window.setTimeout(u(this.Ie, this), 500)));
    };
    n.Rp = function () {
        no(this, Yf);
        this.Hg = !this.f.paused;
        this.f.paused || this.f.pause();
        this.pubsub.c("beginseeking");
        qo(this, "beginseeking");
    };
    n.Sp = function () {
        no(this);
        qo(this, "endseeking");
        this.pubsub.c("endseeking");
        this.Hg && ((this.Hg = l), this.f.playVideo());
        this.Ua();
    };
    n.Yp = function (a) {
        this.Qe(a * this.getDuration(), j);
        this.Ni = l;
        this.Ie();
        this.Ni = j;
        this.pubsub.c("seekto", a);
        qo(this, "seekto", a);
    };
    n.Wp = function (a) {
        this.ea && vo(this, l);
        a != this.b.Ed &&
            ((this.b.Ed = a),
            this.pubsub.c("SIZE_CLICKED", a),
            ho(this),
            (a = N("watch-player")),
            this.Nd.G(a, "transitionend", u(this.pb, this)),
            this.Nd.G(a, "MSTransitionEnd", u(this.pb, this)),
            this.Nd.G(a, "oTransitionEnd", u(this.pb, this)),
            this.Nd.G(a, "webkitTransitionEnd", u(this.pb, this)),
            Ah(u(this.pb, this), 1e3));
    };
    n.Tp = function () {
        vo(this, !this.ea);
    };
    n.Xp = function (a) {
        a = wo(this, a);
        this.a.R = this.f.currentTime;
        a && a != this.a.format && fo(this, a);
    };
    n.$p = function () {
        if (nf.addto_ajax) go(this);
        else {
            var a = Xe(document.location.href),
                b = a[1],
                c = a[2],
                d = a[3],
                a = a[4],
                f = [];
            b && f.push(b, ":");
            d && (f.push("//"), c && f.push(c, "@"), f.push(d), a && f.push(":", a));
            kf(f.join("") + "/token_ajax", {
                format: "RAW",
                method: "GET",
                Mg: { action_get_wl_token: 1 },
                lf: this,
                Rb: this.Rt
            });
        }
    };
    n.aq = function () {
        xo(this, this.getVideoUrl());
    };
    n.dr = function () {
        var a = se("fullScreen", document);
        a == k && (a = !this.ea);
        yo(this, a);
    };
    var yo = function (a, b) {
            if (!b && "detailpage" == a.b.eventLabel) {
                var c = q("checkCurrentVideo");
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
            !b && !a.qd ? co(a, l) : co(a, j);
            ho(a);
            ni(a.g.dg, b);
            eo(a);
            b && a.b.Li && Nn(a);
            qo(a, "onResize");
        },
        ho = function (a) {
            var b = "small";
            a.ea ? (b = "fullscreen") : a.b.Ed && (b = "large");
            ie(document.body, "player-size", b);
        };
    $.prototype.Fj = function (a) {
        var b = a.keyCode;
        if (179 == b || 178 == b)
            (179 == b && (uo(this, j), a.preventDefault()),
                178 == b && (this.bm(), a.preventDefault()));
        98 == b && qo(this, "onToggleBackground");
        (187 == b || 43 == b) && qo(this, "onFontSizeIncrease");
        (189 == b || 45 == b) && qo(this, "onFontSizeDecrease");
        32 == b && io(a) && (uo(this, j), a.preventDefault());
    };
    $.prototype.er = function (a) {
        var b = a.keyCode;
        if (38 == b || 40 == b || 37 == b || 39 == b)
            (38 == b
                ? this.fj({ volume: this.S.volume + 5, muted: l })
                : 40 == b
                  ? this.fj({ volume: this.S.volume - 5, muted: l })
                  : 37 == b
                    ? this.Qe(this.getCurrentTime() - 20, j)
                    : 39 == b && this.Qe(this.getCurrentTime() + 20, j),
                a.preventDefault());
        27 == b && this.ea && (vo(this, l), a.preventDefault());
    };
    $.prototype.pb = function () {
        this.Nd.Wa();
        (0 == this.Fa.clientWidth && 0 == this.Fa.clientHeight) || (eo(this), qo(this, "onResize"));
    };
    var qo = function (a, b, c) {
            a.Ca && kn(a.Ca, b, c);
        },
        wo = function (a, b) {
            var c;
            a.Va.some(function (a) {
                if (a.Nc == b) return ((c = a), j);
            });
            return c;
        };
    n = $.prototype;
    n.Sm = function (a) {
        var b;
        this.Va.some(function (c) {
            if (c.Hd == a) return ((b = c), j);
        });
        return b;
    };
    n.Bg = function (a) {
        this.ob ? Yn(this) : (this.f.togglePlayPause(), a && zo(this));
    };
    n.playVideo = function () {
        this.ob
            ? Yn(this)
            : (this.f.getSrc() != wg(this.a) &&
                  (this.f.activate(wg(this.a)),
                  this.Ig && window.clearTimeout(this.Ig),
                  (this.Ig = Ah(u(this.kr, this), 15e3))),
              Ah(
                  u(function () {
                      this.f.playVideo();
                  }, this),
                  0
              ));
    };
    n.pauseVideo = function () {
        this.f.pauseVideo();
    };
    n.stopVideo = function () {
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
        I(b, "html5-bezel", "html5-center-overlay");
        var c = document.createElement("div");
        a.Mn() ? I(c, "html5-bezel-pause") : I(c, "html5-bezel-play");
        b.appendChild(c);
        a.Fa.appendChild(b);
        Ah(function () {
            I(b, "html5-bezel-fade");
        }, 0);
        Ah(function () {
            P(b);
        }, 300);
    };
    $.prototype.iq = function () {
        this.a.lb = j;
        this.Yl();
    };
    $.prototype.Yl = function () {
        if (!this.g.Kb("play_pause")) {
            var a = li(this.g);
            a ? a.kh("control_play") : this.playVideo();
        }
    };
    $.prototype.bm = function () {
        if (!this.g.Kb("play_pause")) {
            var a = li(this.g);
            a ? a.kh("control_pause") : this.pauseVideo();
        }
    };
    var uo = function (a, b) {
        if (!(a.g.Kb("play_pause") || (a.b.Fb && a.ob && !oh.hasTags(h)))) {
            var c = li(a.g);
            c ? c.kh("control_toggle_play_pause") : a.Bg(b);
        }
    };
    $.prototype.hq = function () {
        this.g.Kb("play_pause") || this.stopVideo();
    };
    $.prototype.jq = function (a, b) {
        this.a.lb = j;
        this.Qe(a, b);
    };
    $.prototype.Qe = function (a, b) {
        this.g.Kb("seek") || this.seekTo(a, b);
    };
    var vo = function (a, b) {
        if (De())
            if (b) {
                var c = a.z,
                    d = se("requestFullScreen", c);
                d && d.apply(c);
            } else (c = se("cancelFullScreen", document)) && c.call(document);
        else yo(a, b);
    };
    $.prototype.$m = function (a) {
        io(a) && (this.z.focus(), (5 == this.getPlayerState() || !this.b.Zb) && uo(this, j));
    };
    $.prototype.fr = function (a) {
        io(a) && vo(this, !this.ea);
    };
    $.prototype.gr = function (a) {
        a.scale * (this.ea ? -1 : 1) > (this.ea ? -0.7 : 1.3) && vo(this, !this.ea);
        a.preventDefault();
    };
    $.prototype.hr = function (a) {
        a.scale * (this.ea ? -1 : 1) > (this.ea ? -0.9 : 1.1) && vo(this, !this.ea);
    };
    var io = function (a) {
        return !Lc(a.target, "html5-stop-propagation");
    };
    $.prototype.ir = function (a) {
        this.a && this.a.Fn ? xo(this, this.a.Fn) : xo(this, this.getVideoUrl());
        a.stopPropagation();
    };
    var xo = function (a, b) {
        a.ea && vo(a, l);
        a.pubsub.c("openingpage");
        Ql(b);
    };
    n = $.prototype;
    n.Fs = function () {
        var a = { eurl: this.b.kb, html5: 1 };
        this.ob || ((a.autoplay = 1), (a.vq = this.a.format.Hd));
        var b = Math.round(this.z.getCurrentTime());
        10 < b && (a.start = b);
        b = "/embed/" + this.a.m;
        b = U(b, a);
        a = this.b.td();
        a = { top: 0, left: 0, width: a.width, height: a.height, resizable: j };
        this.pubsub.c("openingpage");
        Rl(b, a);
    };
    n.Np = function (a) {
        this.k("Handling get_video_info response");
        fh(this.b, a);
        this.pubsub.c("internalvideodatachange", "videoinfo");
        ao(this)
            ? this.pubsub.c("nothtml5servable", a)
            : Kn(this).length
              ? Qn(this)
              : (this.k("No available formats"), this.pubsub.c("nothtml5servable", a));
    };
    n.Op = function (a) {
        this.pubsub.c("unabletoplay", a.errorcode, unescape(a.reason));
    };
    n.oq = function (a) {
        if (this.la.fallback) {
            this.k("Calling fallback");
            var b = this.la;
            this.a && ((b.args.video_id = this.a.m), (b.args.start = this.a.R));
            b.args.html5_unavailable = "1";
            w(b, a || {});
            var c = this.z.parentNode;
            b.fallbackMessage = u(function () {
                c.appendChild(this.z);
                this.pubsub.c("unabletoplay", 5);
            }, this);
            this.la.fallback(b);
        } else this.pubsub.c("unabletoplay", 5);
    };
    n.rq = function (a, b) {
        Ch(this.Bc);
        Ch(this.rg);
        $n(this);
        this.cj
            ? ((this.cj.innerHTML = b ? b : Dh("HTML5_DEFAULT_FALLBACK")), md(this.yg, j))
            : this.la.fallbackMessage && this.la.fallbackMessage();
        this.pubsub.c("internalstatechange", -1);
        this.pubsub.c("onError", a);
    };
    n.pq = function () {
        this.pauseVideo();
    };
    var co = function (a, b) {
        fc(a.z, "html5-autohide", b);
        a.Ua();
    };
    $.prototype.Ua = function () {
        fc(this.z, "hide-controls", l);
        window.clearTimeout(this.Gj);
        0 != this.nb && Ao(this);
        this.qd && qo(this, "showcontrols");
    };
    var Ao = function (a) {
        var b = a.b.Fb ? 4e3 : 3e3;
        a.Gj = Ah(u(a.Nj, a), b);
    };
    n = $.prototype;
    n.setSize = function () {
        eo(this);
        qo(this, "onResize");
    };
    n.Nj = function () {
        var a;
        if (!(a = this.Hc != Wf)) {
            a = this.g;
            var b = bi.getInstance();
            a = !!b.Pd && pe(b.Pd, a.C);
        }
        a
            ? (window.clearTimeout(this.Gj), Ao(this))
            : (fc(this.z, "hide-controls", j), this.qd && qo(this, "hidecontrols"));
    };
    n.Js = function (a) {
        a.preventDefault();
        th(this.mg.Ab) ||
            (th(this.Ea) && a.stopPropagation(),
            qn(this.Ea, a),
            X(this.Ea),
            this.Aa || (this.Aa = new Ge()),
            this.Aa.G(this.Ea, "contextmenu", function (a) {
                a.preventDefault();
            }),
            (a = u(function () {
                this.Aa.G(document, "click", u(this.Pf, this));
                this.Aa.G(document, "contextmenu", u(this.Pf, this));
                this.Aa.G(window, "blur", u(this.Pf, this));
            }, this)),
            Ah(a, 0),
            this.Aa.G(document, "keydown", u(this.Ts, this)));
    };
    n.Ts = function (a) {
        27 == a.keyCode && this.Pf();
    };
    n.Pf = function () {
        uh(this.Ea);
        this.Aa.Wa();
    };
    var Vn = function (a) {
            a.b.Lb = new M(a.Fa.clientWidth, a.Fa.clientHeight);
            if (!a.fk || !jc(a.fk, a.b.Lb)) {
                a.fk = a.b.Lb;
                var b = a.b.Lb.width,
                    c = a.b.Lb.height,
                    d = 0,
                    f = 0;
                b / c > 480 / 360 ? ((d = c), (f = 360)) : ((d = b), (f = 480));
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
                    { Sc: a.Qr, reset: j }
                );
            }
        },
        eo = function (a) {
            Vn(a);
            var b = a.f.videoWidth,
                c = a.f.videoHeight;
            0 != a.f.readyState && (a.a.Oe = new M(b, c));
            if (!(a.b.Zb || 0 == b * c)) {
                var b = a.Fa.clientHeight,
                    c = a.Fa.clientWidth,
                    d = a.f.videoWidth,
                    f = a.f.videoHeight,
                    g = Math.min(b / f, c / d),
                    d = d * g,
                    f = f * g,
                    b = new Qc((c - d) / 2, (b - f) / 2, d, f);
                a.b.Gc = new Qc(0, 0, b.width, b.height);
                hd(a.pg, b.width, b.height);
                Zc(a.pg, b.left, b.top);
            }
        };
    $.prototype.appendToVideoContent = function (a) {
        this.pg.appendChild(a);
    };
    $.prototype.appendAboveVideoControls = function (a) {
        var b = this.Ke;
        b.insertBefore(a, b.childNodes[0] || k);
    };
    A("yt.player.VideoPlayer", $);
    A("yt.player.utils.Controls.formatTime", mh);
})();
