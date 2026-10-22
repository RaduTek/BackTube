(function () {
    var ea = undefined;
    var p = true;
    var q = null;
    var v = false;
    Math.floor(Math.random() * 2147483648).toString(36);
    var fa;
    var la;
    var na;
    var pa;
    var ra;
    var sa;
    var xa;
    var ya;
    var za;
    var Aa;
    var Ba;
    var Ca;
    var Da;
    var Ea;
    var Ga;
    var Ha;
    var Ia;
    var Ja;
    var Ka;
    var Ma;
    var Na;
    var Oa;
    var Pa;
    var Qa;
    var Ra;
    var Sa;
    var Ta;
    var Ua;
    var Xa;
    var Ya;
    var Za;
    var $a;
    var ab;
    var bb;
    var cb;
    var db;
    var eb;
    var fb;
    var gb;
    var hb;
    var ib;
    var jb;
    var ob;
    var pb;
    var qb;
    var rb;
    var sb;
    var tb;
    var ub;
    var vb;
    var wb;
    var xb;
    var yb;
    var zb;
    var Ab;
    var Bb;
    var Cb;
    var Db = /^[6-9]$/;
    var Eb = {
        EMPTY: 0,
        lg: 1,
        we: 2
    };
    var Fb = {
        $i: 0,
        Oi: 114,
        Ke: 115,
        Le: 116,
        Wg: 117,
        Me: 118,
        Ne: 119,
        Oe: 120,
        Re: 121,
        jh: 122,
        Se: 123,
        Ue: 124,
        lh: 125,
        Ui: 230,
        Ve: 126,
        We: 127,
        Xe: 128,
        Ye: 129,
        Ni: 231,
        Sg: 130,
        Tg: 131,
        Pi: 237,
        Ri: 132,
        gh: 134,
        Si: 189,
        ih: 133,
        Vi: 184,
        qh: 173,
        Xg: 135,
        Zg: 136,
        eh: 137,
        mh: 138,
        oh: 139,
        Yg: 140,
        $g: 141,
        fh: 142,
        nh: 143,
        ph: 144,
        Ug: 145,
        Qi: 146,
        Pe: 147,
        Zi: 148,
        Mi: 150,
        Li: 191,
        Xi: 245,
        kh: 151,
        RENDERER: 152,
        Qe: 153,
        Vg: 154,
        He: 155,
        hh: 156,
        Wi: 157,
        Te: 158,
        Ge: 159,
        Ze: 160,
        Ie: 149,
        Ti: 256
    };
    var Gb = {
        Je: 161,
        $e: 162
    };
    (function () {
        function a(a) {
            var b = [];
            for (var f = 0, d; (d = a[f++]);) {
                b.push(g(d));
            }
            return b;
        }
        function c(a) {
            var b = "";
            if (a) {
                for (var f = 0, k; (k = a[f++]);) {
                    if ((k = d[k])) {
                        b += k;
                    }
                }
            }
            return b;
        }
        function j(a) {
            return a.Da() + c(a.Ta());
        }
        function g(a) {
            return (
                a.api || {
                    a: a.Kd,
                    b: a.Z,
                    c: a.Da,
                    d: a.getType,
                    e: a.Ta,
                    f: a.Ph,
                    g: a.Oh,
                    h: function () {
                        return j(a);
                    },
                    i: a.Pb,
                    j: a.Jc
                }
            );
        }
        var f = /\D+$/;
        var d = {};
        var b = {};
        (function () {
            b.a = 16;
            b.b = 8;
            b.c = 7;
            b.d = 42;
            b.e = 9;
            b.g = 12;
            b.i = 14;
            b.j = 18;
            b.l = 13;
            b.m = 5;
            b.n = 38;
            b.p = 39;
            b.q = 22;
            b.r = 4;
            b.s = 10;
            b.t = 2;
            b.u = 17;
            b.v = 15;
            b.w = 21;
            b.x = 11;
            b.y = 25;
            b.z = 3;
            b.A = 29;
            b.C = 33;
            b.D = 40;
            b.E = 36;
            b.F = 35;
            b.G = 26;
            b.I = 1;
            b.J = 37;
            b.K = 30;
            b.L = 19;
            b.N = 32;
            b.P = 20;
            b.Q = 27;
            b.R = 28;
            b.S = 24;
            b.T = 23;
            b.U = 41;
            b.V = 31;
            for (var a in b) {
                d[b[a]] = a;
            }
        })();
        fa = function (a) {
            var b = {};
            if (a) {
                for (var f = 0; f < a.length; ++f) {
                    b[a[f]] = p;
                }
            }
            return b;
        };
        la = function (b) {
            var f = a(b.ha());
            return (
                b.api || {
                    a: b.ia,
                    b: function () {
                        return f;
                    }
                }
            );
        };
        na = function (a) {
            if (a) {
                a = a.toLowerCase();
                return a == "zh-tw" || a == "zh-cn" || a == "ja" || a == "ko";
            } else {
                return v;
            }
        };
        pa = function () {
            return new Date().getTime();
        };
        ra = function (a) {
            var d = [];
            if (a) {
                if (typeof a == "string") {
                    if ((a = a.match(f))) {
                        for (var a = a[0], c = 0, k; c < a.length; c++) {
                            k = a.charAt(c);
                            d.push(b[k]);
                        }
                    }
                } else {
                    return a;
                }
            }
            return d;
        };
        sa = c;
        xa = j;
    })();
    function Hb() {
        return {
            getInstance: function () {
                return {
                    ua: "hp",
                    Vc: "google.com",
                    Bb: "",
                    wa: "en",
                    La: "",
                    Wc: "",
                    ya: "",
                    Ra: 0,
                    Cb: "",
                    Hb: v,
                    Xc: "",
                    Qa: "",
                    Pa: 0,
                    ue: q,
                    Ib: v,
                    Eb: v,
                    se: v,
                    Ma: v,
                    oa: fa([19, 5, 0]),
                    le: v,
                    ke: v,
                    Gc: p,
                    qb: 10,
                    he: p,
                    Oc: v,
                    Hc: v,
                    pb: v,
                    Wa: p,
                    hc: v,
                    oc: 500,
                    qd: p,
                    Aa: v,
                    Ba: "",
                    Fb: "//www.google.com/textinputassistant",
                    Gb: 3,
                    me: v,
                    nc: v,
                    xc: p,
                    yc: v,
                    eb: v,
                    $a: v,
                    jc: v,
                    ic: v,
                    Ea: 1,
                    Za: p,
                    Ya: p,
                    Ab: v,
                    hb: v,
                    tc: 10,
                    Ca: v,
                    ge: 0,
                    ne: v,
                    uc: p,
                    Xa: v,
                    yb: document.body,
                    Rc: p,
                    Sc: q,
                    je: {},
                    xa: {},
                    ie: {},
                    re: 0,
                    ib: v,
                    Ic: p,
                    sc: v,
                    td: 1,
                    rd: p,
                    sd: p,
                    fe: 1,
                    Qc: v,
                    spellcheck: v,
                    jb: v,
                    Ac: "Search",
                    Ka: "I'm  Feeling Lucky",
                    Bc: "",
                    zc: "Learn more",
                    wb: "Remove",
                    vb: "This search was removed from your Web History",
                    oe: "",
                    Ha: "",
                    Ja: "",
                    pe: v,
                    Oa: "absolute",
                    wc: v,
                    tb: v,
                    mb: q,
                    te: 0,
                    sb: [0, 0, 0, 0, 0, 0],
                    rb: [0],
                    nb: 0,
                    ub: v,
                    Pc: 1,
                    vc: "",
                    Dc: "",
                    Cc: "",
                    Db: q,
                    Zc: "",
                    Yc: "",
                    xb: {},
                    Ec: p
                };
            },
            normalize: function (a) {
                if (!a) {
                    return q;
                } else {
                    return {
                        a: a.ua,
                        b: a.Vc,
                        c: a.Bb,
                        d: a.wa,
                        e: a.La,
                        f: a.Wc,
                        g: a.ya,
                        h: a.Cb,
                        i: a.Pa,
                        j: a.Ib,
                        k: a.Eb,
                        l: a.oa,
                        n: a.le,
                        q: a.qb,
                        r: a.Gc,
                        s: a.he,
                        t: a.Oc,
                        u: a.pb,
                        v: a.Wa,
                        w: a.qd,
                        x: a.Aa,
                        y: a.nc,
                        z: a.eb,
                        aa: a.jc,
                        ab: a.ic,
                        ac: a.Ea,
                        ae: a.hb,
                        af: a.tc,
                        ag: a.td,
                        ah: a.rd,
                        ai: a.sd,
                        aj: a.fe,
                        ak: a.spellcheck,
                        al: a.jb,
                        am: a.Ac,
                        an: a.Ka,
                        ao: a.zc,
                        ap: a.wb,
                        aq: a.vb,
                        ar: a.Ha,
                        as: a.Ja,
                        at: a.pe,
                        av: a.tb,
                        aw: a.mb,
                        ax: a.te,
                        ay: a.ke,
                        az: a.Za,
                        ba: a.Ya,
                        bb: a.wc,
                        bc: a.sb,
                        bd: a.ue,
                        bf: a.ub,
                        bg: a.Ra,
                        bh: a.Pc,
                        bi: a.Ab,
                        bj: a.Hc,
                        bk: a.se,
                        bo: a.me,
                        bq: a.Ca,
                        br: a.Ba,
                        bs: a.vc,
                        bt: a.$a,
                        bu: a.ge,
                        bv: a.ne,
                        bx: a.uc,
                        bz: a.nb,
                        ca: a.yb,
                        cb: a.xc,
                        cc: a.yc,
                        cd: a.Bc,
                        ce: a.hc,
                        cf: a.oc,
                        cg: a.je,
                        ch: a.Xa,
                        ci: a.Sc,
                        ck: a.re,
                        cl: a.rb,
                        cm: a.Oa,
                        cn: a.Rc,
                        cp: a.ib,
                        cq: a.Xc,
                        cr: a.Ic,
                        cs: a.Fb,
                        ct: a.Hb,
                        cu: a.Ma,
                        cv: a.sc,
                        cw: a.oe,
                        cz: a.Gb,
                        da: a.Dc,
                        db: a.Cc,
                        dc: a.Qc,
                        de: a.xb,
                        df: a.Ec,
                        dg: a.xa,
                        dh: a.ie,
                        di: a.Db,
                        dj: a.Zc,
                        dk: a.Yc,
                        dl: a.Qa
                    };
                }
            },
            translate: function (a) {
                return {
                    ua: a.a,
                    Vc: a.b,
                    Bb: a.c,
                    wa: a.d,
                    La: a.e,
                    Wc: a.f,
                    ya: a.g,
                    Cb: a.h,
                    Pa: a.i,
                    Ib: a.j,
                    Eb: a.k,
                    oa: a.l,
                    le: a.n,
                    qb: a.q,
                    Gc: a.r,
                    he: a.s,
                    Oc: a.t,
                    pb: a.u,
                    Wa: a.v,
                    qd: a.w,
                    Aa: a.x,
                    nc: a.y,
                    eb: a.z,
                    jc: a.aa,
                    ic: a.ab,
                    Ea: a.ac,
                    hb: a.ae,
                    tc: a.af,
                    td: a.ag,
                    rd: a.ah,
                    sd: a.ai,
                    fe: a.aj,
                    spellcheck: a.ak,
                    jb: a.al,
                    Ac: a.am,
                    Ka: a.an,
                    zc: a.ao,
                    wb: a.ap,
                    vb: a.aq,
                    Ha: a.ar,
                    Ja: a.as,
                    pe: a.at,
                    tb: a.av,
                    mb: a.aw,
                    te: a.ax,
                    ke: a.ay,
                    Za: a.az,
                    Ya: a.ba,
                    wc: a.bb,
                    sb: a.bc,
                    ue: a.bd,
                    ub: a.bf,
                    Ra: a.bg,
                    Pc: a.bh,
                    Ab: a.bi,
                    Hc: a.bj,
                    se: a.bk,
                    me: a.bo,
                    Ca: a.bq,
                    Ba: a.br,
                    vc: a.bs,
                    $a: a.bt,
                    ge: a.bu,
                    ne: a.bv,
                    uc: a.bx,
                    nb: a.bz,
                    yb: a.ca,
                    xc: a.cb,
                    yc: a.cc,
                    Bc: a.cd,
                    hc: a.ce,
                    oc: a.cf,
                    je: a.cg,
                    Xa: a.ch,
                    Sc: a.ci,
                    re: a.ck,
                    rb: a.cl,
                    Oa: a.cm,
                    Rc: a.cn,
                    ib: a.cp,
                    Xc: a.cq,
                    Ic: a.cr,
                    Fb: a.cs,
                    Hb: a.ct,
                    Ma: a.cu,
                    sc: a.cv,
                    oe: a.cw,
                    Gb: a.cz,
                    Dc: a.da,
                    Cc: a.db,
                    Qc: a.dc,
                    xb: a.de,
                    Ec: a.df,
                    xa: a.dg,
                    ie: a.dh,
                    Db: a.di,
                    Zc: a.dj,
                    Yc: a.dk,
                    Qa: a.dl
                };
            }
        };
    }
    var Ib = /<\/?(?:b|em)>/gi;
    var Jb = {
        qg: 8,
        ye: 9,
        xe: 13,
        Cd: 27,
        Yi: 32,
        ng: 37,
        pg: 38,
        og: 39,
        mg: 40,
        rg: 46
    };
    var K = (function () {
        var a = ya;
        var c = 0;
        var j = {};
        var g = {};
        var f = {};
        var d = {};
        var b = {};
        return {
            uh: function () {
                return c++;
            },
            uf: function (a, f, d) {
                g[a] = d;
                b[a] = [f];
            },
            M: function (h, c, n) {
                var k = d[h];
                if (k) {
                    if (k != a) {
                        d[h] = a;
                    }
                } else {
                    d[h] = n;
                }
                if ((k = b[h])) {
                    k.push(c);
                } else {
                    b[h] = [c];
                }
                f[c] = n;
            },
            Kg: function () {
                return b;
            },
            getInstance: function (b, c) {
                var n = j[b];
                if (n) {
                    return n;
                }
                if ((n = g[b])) {
                    return (j[b] = n());
                }
                if (!c) {
                    n = d[b];
                    if (!n || n == a) {
                        return q;
                    } else {
                        return n();
                    }
                } else if ((n = f[c])) {
                    return n();
                } else {
                    return q;
                }
            }
        };
    })();
    function Mb(a, c, j, g, f, d, b) {
        function h() {
            if (y) {
                for (var a = 0, e; (e = w[a++]);) {
                    if (e.$) {
                        e.$();
                    }
                }
            }
        }
        function m() {
            var a = L.Kg();
            var e;
            var b;
            var l;
            var f;
            for (f in a) {
                var d = f;
                e = a[d];
                b = A[d];
                if ((l = c[d])) {
                    if (l != t.Je && b && l.length) {
                        b = c;
                        l = l.slice(0);
                        var o = [];
                        var i = {};
                        for (var k = 0, h = ea, n = ea; (n = l[k++]);) {
                            if (n instanceof Object) {
                                h = n.H();
                                if (!i[h]) {
                                    o.push(n);
                                    i[h] = 1;
                                }
                                l.splice(--k, 1);
                            }
                        }
                        k = fa(l);
                        if (k[t.$e]) {
                            k = fa(l.concat(e));
                            delete k[t.$e];
                        }
                        for (h in k) {
                            if (!i[h]) {
                                o.push(parseInt(h, 10));
                            }
                        }
                        b[d] = o;
                    }
                } else {
                    c[d] = b ? e : e[0];
                }
            }
        }
        function n(a) {
            for (var e in a) {
                var b = e;
                var l = a[b];
                if (l != t.Je) {
                    if (A[b]) {
                        var f = s[b] || [];
                        for (var d = 0, o = ea; d < l.length; ++d) {
                            if ((o = i(b, l[d]))) {
                                f.push(o);
                            }
                        }
                        s[b] = f;
                    } else {
                        k(b, l);
                    }
                }
            }
        }
        function k(a, e) {
            var b = i(a, e);
            if (b) {
                B[a] = b;
            }
        }
        function i(a, e) {
            var b;
            if (e && e instanceof Object) {
                b = e;
            } else {
                b = L.getInstance(a, e);
                if (!b) {
                    return q;
                }
                if (b.$c) {
                    var l = b.$c();
                    if (l) {
                        for (var t = 0, d, o, i; (d = l[t++]);) {
                            i = v;
                            o = d.getType();
                            if (A[o]) {
                                if ((i = C[o])) {
                                    i.push(d);
                                    continue;
                                }
                                i = p;
                            }
                            C[o] = i ? [d] : d;
                        }
                    }
                }
            }
            D.push([b, a]);
            w.push(b);
            if (b.ea) {
                b.ea(u, f);
            }
            return b;
        }
        function r(a) {
            var e = 0;
            for (var b = 0, l; (l = D[b++]);) {
                if (l[0] == a) {
                    e = l[1];
                }
            }
            return e;
        }
        function l(a, e) {
            var b = za(a.getType(), z);
            var l = za(e.getType(), z);
            if (b < 0) {
                return 1;
            } else if (l < 0) {
                return -1;
            } else {
                return b - l;
            }
        }
        function o() {
            if (j) {
                for (var a = j; (a = a.parentNode);) {
                    var e = a.dir;
                    if (e) {
                        return e;
                    }
                }
            }
            return "ltr";
        }
        var t = Gb;
        var e = Fb;
        var A = fa([e.Ge, e.He, e.Ie, e.Qe, e.Vg, e.RENDERER, e.hh, e.kh, e.Te, e.Ze]);
        var H = [
            e.Ug,
            e.Wg,
            e.Me,
            e.Ne,
            e.Ve,
            e.Ke,
            e.Le,
            e.Oe,
            e.Pe,
            e.Re,
            e.ih,
            e.jh,
            e.Se,
            e.Ue,
            e.lh,
            e.We,
            e.Xe,
            e.Ye
        ];
        var z = [
            e.We,
            e.Ie,
            e.gh,
            e.Se,
            e.Re,
            e.Ve,
            e.Me,
            e.Ke,
            e.Xe,
            e.Ze,
            e.qh,
            e.Ne,
            e.Le,
            e.RENDERER,
            e.Qe,
            e.Ye,
            e.Oe,
            e.Ue,
            e.Te,
            e.He,
            e.Tg,
            e.Sg,
            e.Pe,
            e.$g,
            e.fh,
            e.eh,
            e.nh,
            e.mh,
            e.ph,
            e.oh,
            e.Yg,
            e.Xg,
            e.Zg
        ];
        var B = {};
        var s = {};
        var C = {};
        var D = [];
        var w = [];
        var y = v;
        var L = K;
        var u;
        var M = {
            activate: function (a) {
                h();
                for (var e = 0, b; (b = w[e++]);) {
                    if (b.activate) {
                        b.activate(a);
                    }
                }
                y = p;
            },
            $: h,
            $d: function () {
                return y;
            },
            get: function (a, e) {
                var b = B[a];
                if (b) {
                    if (b.B) {
                        return b.B(r(e));
                    } else {
                        return {};
                    }
                }
            },
            ja: function (a, e) {
                var b = s[a];
                if (b) {
                    var l = [];
                    var t = r(e);
                    for (var d = 0, f; (f = b[d++]);) {
                        l.push(f.B ? f.B(t) : {});
                    }
                    return l;
                }
                return [];
            },
            ra: function () {
                return a;
            },
            fb: function () {
                return d;
            },
            ki: function (a, b) {
                var l = s[e.Ge];
                if (l) {
                    for (var t = 0, f; (f = l[t++]);) {
                        if (f.H() == a) {
                            if (f.B) {
                                return f.B(r(b));
                            } else {
                                return {};
                            }
                        }
                    }
                }
                return q;
            }
        };
        (function () {
            var a = o();
            var e = d.getId();
            var t = !!Aa("gs_id" + e);
            u = {
                Tc: function () {
                    return t;
                },
                get: function (a) {
                    return Aa(a + e);
                },
                Be: function () {
                    return g;
                },
                kb: function () {
                    return a;
                },
                Zd: function () {
                    return j;
                }
            };
            if (b.Ec) {
                m();
            }
            n(c);
            for (var f = 0, i; (i = H[f++]);) {
                if (!c[i]) {
                    k(i);
                }
            }
            n(C);
            w.sort(l);
            for (f = 0; (i = w[f++]);) {
                if (i.O) {
                    i.O(M);
                }
            }
            for (f = 0; (i = w[f++]);) {
                if (i.W) {
                    i.W(b);
                }
            }
            y = p;
        })();
        return M;
    }
    function Nb(a, c, j) {
        function g() {
            return a;
        }
        function f() {
            return o;
        }
        function d() {
            return t;
        }
        function b() {
            return c;
        }
        function h() {
            return j || "";
        }
        function m() {
            return z;
        }
        function n(a, e) {
            r(a, e);
        }
        function k(a, e) {
            r(a, e, p);
        }
        function i() {
            if (!B) {
                s = C = p;
            }
        }
        function r(a, b, l) {
            if (!B) {
                s = p;
                e[a] = b;
                if (l) {
                    A[a] = b;
                }
            }
        }
        var l = Da();
        var o;
        var t;
        var e = {};
        var A = {};
        var H;
        var z;
        var B = v;
        var s = v;
        var C = v;
        var D = v;
        var w = {
            getId: function () {
                return l;
            },
            ia: g,
            gf: f,
            ka: d,
            Ga: b,
            Kb: function () {
                return e;
            },
            hf: function () {
                return H;
            },
            Rh: h,
            getTimestamp: m,
            Wf: function () {
                return {
                    ia: g,
                    gf: f,
                    ka: d,
                    Ga: b,
                    Rh: h,
                    getTimestamp: m,
                    setParameter: n,
                    Fe: k,
                    Qh: i
                };
            },
            setParameter: n,
            Fe: k,
            Qh: i,
            Pg: function () {
                return C;
            },
            Og: function () {
                s = D = p;
            },
            Xf: function (e, b, l) {
                return !s && a == e && c.equals(b) && j == l;
            },
            Ee: function () {
                return D;
            },
            Ng: function () {
                if (!B) {
                    z = pa();
                    if (!("cp" in A)) {
                        k("cp", c.getPosition());
                    }
                    r("gs_id", l);
                    H = Ba(A) + ":" + t;
                    s = B = p;
                }
            }
        };
        o = a.toLowerCase();
        t = Ca(o);
        return w;
    }
    function Ob(a, c, j, g, f, d, b, h) {
        function m() {
            return c;
        }
        function n() {
            return j;
        }
        function k() {
            return !!j && !!j[0];
        }
        var i = p;
        var r;
        var l = {
            qa: function () {
                return a;
            },
            ia: m,
            Qd: function () {
                if (k()) {
                    return j[0];
                } else {
                    return q;
                }
            },
            ha: n,
            sa: k,
            Gi: function (a) {
                return !!g[a];
            },
            vd: function (a) {
                if (a in g) {
                    return g[a];
                } else {
                    return 0;
                }
            },
            Hi: function (a) {
                if (a in g) {
                    return g[a];
                } else {
                    return "";
                }
            },
            rh: function (a) {
                if (a in g) {
                    return g[a];
                } else {
                    return q;
                }
            },
            Gd: function () {
                var a = {};
                var b;
                for (b in g) {
                    a[b] = g[b];
                }
                return a;
            },
            ze: function () {
                return f;
            },
            Vb: function () {
                return d;
            },
            Ch: function () {
                return b;
            },
            ef: function () {
                return h;
            },
            Ae: function () {
                b = p;
            },
            getType: function () {
                return i;
            },
            ff: function () {
                if (!r) {
                    r = {
                        ia: m,
                        ha: n
                    };
                }
                return r;
            }
        };
        if (j) {
            if (j.length && j[0].getType() == 33) {
                d = i = v;
            }
        } else {
            j = [];
        }
        return l;
    }
    function Pb(a, c, j, g, f, d) {
        function b(a) {
            if (f) {
                for (var b = 0, d; (d = a[b++]);) {
                    if (za(d, f) != -1) {
                        return p;
                    }
                }
            }
            return v;
        }
        var h = v;
        var m = {
            Kd: function () {
                return a;
            },
            Z: function () {
                return c;
            },
            Da: function () {
                return j;
            },
            getType: function () {
                return g;
            },
            Ta: function () {
                return f || [];
            },
            Ph: function (a) {
                return !!f && b([a]);
            },
            Oh: b,
            Pb: function () {
                return d || [];
            },
            Jc: function () {
                return h;
            }
        };
        switch (g) {
            case 0:
            case 38:
            case 39:
            case 400:
            case 35:
            case 33:
            case 41:
            case 34:
            case 44:
            case 45:
            case 40:
                h = p;
        }
        return m;
    }
    (function () {
        var a = /\s/g;
        var c = /\u3000/g;
        var j = /^\s/;
        var g = /\s+/;
        var f = /\s+/g;
        var d = /^\s+|\s+$/g;
        var b = /^\s+$/;
        var h = /<[^>]*>/g;
        var m = /&nbsp;/g;
        var n = /&#x3000;/g;
        var k = [/&/g, /&amp;/g, /</g, /&lt;/g, />/g, /&gt;/g, /"/g, /&quot;/g, /'/g, /&#39;/g, /{/g, /&#123;/g];
        var i = document.getElementsByTagName("head")[0];
        var r = 0;
        Ga = function (a, b) {
            if (b === ea) {
                b = a;
            }
            var f = function () {
                return b;
            };
            return {
                getPosition: f,
                Th: function () {
                    return a;
                },
                Sh: f,
                Ji: function () {
                    return a < b;
                },
                equals: function (e) {
                    return e && a == e.Th() && b == e.Sh();
                }
            };
        };
        Ea = function (a, b, f, e) {
            if (b == q || b === "") {
                if (!e) {
                    return;
                }
                b = "";
            }
            f.push(a + "=" + encodeURIComponent("" + b));
        };
        Ba = function (a) {
            var b = [];
            var f;
            for (f in a) {
                Ea(f, a[f], b);
            }
            return b.join("&");
        };
        Ha = function (a) {
            return !!a && !b.test(a);
        };
        Ia = function (a) {
            for (var b = k.length, f = 0; f < b; f += 2) {
                a = a.replace(k[f], k[f + 1].source);
            }
            return a;
        };
        Ja = function (a) {
            for (var b = k.length, f = 0; f < b; f += 2) {
                a = a.replace(k[f + 1], k[f].source);
            }
            a = a.replace(m, " ");
            return a.replace(n, "\u3000");
        };
        Ka = function (a) {
            return a.replace(Ib, "");
        };
        Ma = function (a) {
            return a.replace(h, "");
        };
        Na = function (b) {
            if (b && (b.indexOf(" ") > -1 || g.test(b))) {
                b = b.replace(c, "&#x3000;");
                return b.replace(a, "&nbsp;");
            } else {
                return b;
            }
        };
        Ca = function (a, b) {
            if (a && (a.indexOf(" ") > -1 || g.test(a))) {
                a = a.replace(f, " ");
                return a.replace(b ? d : j, "");
            } else {
                return a;
            }
        };
        Oa = function (a, b, f) {
            if (f) {
                a = a.toLowerCase();
                b = b.toLowerCase();
            }
            return b.length <= a.length && a.substring(0, b.length) == b;
        };
        Pa = function (a) {
            window.clearTimeout(a);
        };
        ya = function () {};
        Qa = function () {
            return i;
        };
        Da = function () {
            return (r++).toString(36);
        };
        Ra = function (a) {
            return Db.test(a);
        };
        za = function (a, b) {
            if (b.indexOf) {
                return b.indexOf(a);
            }
            for (var f = 0, e = b.length; f < e; ++f) {
                if (b[f] === a) {
                    return f;
                }
            }
            return -1;
        };
    })();
    (function () {
        function a(a, d) {
            var b = document.createElement(a);
            if (d) {
                b.className = d;
            }
            return b;
        }
        function c(f) {
            return a("div", f);
        }
        function j(a, d) {
            var b = a.getElementsByTagName("input");
            if (b) {
                for (var h = 0, c; (c = b[h++]);) {
                    if (c.name == d && c.type.toLowerCase() != "submit") {
                        return c;
                    }
                }
            }
            return q;
        }
        function g(a) {
            if (a) {
                if (a.preventDefault) {
                    a.preventDefault();
                }
                a.returnValue = v;
            }
            return v;
        }
        Za = function (a, d) {
            if (a.setSelectionRange) {
                a.setSelectionRange(d, d);
            } else {
                var b = (a.ownerDocument || a.document).selection;
                if (b && b.createRange) {
                    b = b.createRange();
                    b.collapse(p);
                    b.moveEnd("character", d);
                    b.moveStart("character", d);
                    b.select();
                }
            }
        };
        $a = function (a) {
            try {
                var d;
                var b;
                if ("selectionStart" in a) {
                    d = a.selectionStart;
                    b = a.selectionEnd;
                } else {
                    var c = a.createTextRange();
                    var j = (a.ownerDocument || a.document).selection.createRange();
                    if (c.inRange(j)) {
                        c.setEndPoint("EndToStart", j);
                        d = c.text.length;
                        c.setEndPoint("EndToEnd", j);
                        b = c.text.length;
                    }
                }
                if (d !== ea) {
                    return Ga(d, b);
                }
            } catch (n) {}
            return q;
        };
        ab = function (a, d) {
            var b = 0;
            var c = 0;
            for (; a && (!d || a != d);) {
                b += a.offsetTop;
                c += a.offsetLeft;
                try {
                    a = a.offsetParent;
                } catch (j) {
                    a = q;
                }
            }
            return {
                Bh: b,
                zh: c
            };
        };
        bb = function (a) {
            return a == 38 || a == 40;
        };
        Aa = function (a) {
            return document.getElementById(a);
        };
        Ua = a;
        cb = function () {
            var f = a("table");
            f.cellPadding = f.cellSpacing = 0;
            f.style.width = "100%";
            return f;
        };
        db = c;
        eb = function (a, d) {
            var b = c(a);
            var h = b.style;
            h.background = "transparent";
            h.color = "#000";
            h.padding = 0;
            h.position = "absolute";
            h.top = "1px";
            if (d) {
                h.zIndex = d;
            }
            h.whiteSpace = "pre";
            return b;
        };
        fb = function (a, d) {
            if (a.innerHTML != d) {
                if (d) {
                    if (Sa) {
                        d = Na(d);
                    } else if (Ta) {
                        d = ['<pre style="font:inherit;margin:0">', d, "</pre>"].join("");
                    }
                }
                a.innerHTML = d;
            }
        };
        gb = function (f, d) {
            var b = a("span");
            b.innerHTML = f;
            d.appendChild(b);
            return b;
        };
        hb = function (f, d, b) {
            if (j(f, d)) {
                return q;
            }
            var c = a("input");
            c.type = "hidden";
            c.name = d;
            if (b) {
                c.value = b;
            }
            return f.appendChild(c);
        };
        ib = j;
        jb = function (a) {
            var d = document.createEvent("KeyboardEvent");
            d.initKeyEvent("keypress", p, p, q, v, v, p, v, 27, 0);
            a.dispatchEvent(d);
        };
        ob = g;
        pb = function (a) {
            if ((a = a || window.event)) {
                if (a.stopPropagation) {
                    a.stopPropagation();
                }
                a.cancelBubble = a.cancel = p;
            }
            return g(a);
        };
        qb = function (a, d) {
            d.parentNode.insertBefore(a, d.nextSibling);
        };
        rb = function (a) {
            var a = a.insertCell(-1);
            var d = Ua("a");
            d.href = "#ifl";
            d.className = "gssb_j gss_ifl";
            a.appendChild(d);
            return d;
        };
        sb = function (a, d) {
            var b = window.getComputedStyle ? window.getComputedStyle(a, "") : a.currentStyle;
            if (b) {
                return b[d];
            } else {
                return q;
            }
        };
        tb = function () {
            var a = window.innerWidth;
            var d = window.innerHeight;
            if (!a) {
                var b = document.documentElement;
                if (b) {
                    a = b.clientWidth;
                    d = b.clientHeight;
                }
                if (!a) {
                    a = document.body.clientWidth;
                    d = document.body.clientHeight;
                }
            }
            return {
                lf: a,
                kf: d
            };
        };
        ub = function (a) {
            a = a.style;
            a.border = "none";
            a.padding = 0;
            a.margin = 0;
            a.height = "";
            if (Xa || Ya) {
                a.paddingLeft = "3px";
                a.paddingRight = "1px";
            } else {
                a.paddingLeft = "2px";
            }
        };
        vb = function (a) {
            var d = {};
            if (a) {
                for (var b = 0, c; (c = a[b++]);) {
                    d[c.Ld()] = c;
                }
            }
            return d;
        };
    })();
    K.uf(150, 95, function () {
        function a(a, j) {
            j = Ia(Ka(j));
            a = Ia(Ca(a, p));
            if (Oa(j, a)) {
                return [a, "<b>", j.substr(a.length), "</b>"].join("");
            }
            var g = [];
            var f = [];
            var d = j.length - 1;
            for (var b = 0, h = -1, m; (m = j.charAt(b)); ++b) {
                if (m == " " || m == "\t") {
                    if (g.length) {
                        f.push({
                            tf: g.join(""),
                            Va: h,
                            Ua: b + 1
                        });
                        g = [];
                        h = -1;
                    }
                } else {
                    g.push(m);
                    if (h == -1) {
                        h = b;
                    } else if (b == d) {
                        f.push({
                            tf: g.join(""),
                            Va: h,
                            Ua: b + 1
                        });
                    }
                }
            }
            g = a.split(/\s+/);
            b = {};
            for (d = 0; (h = g[d++]);) {
                b[h] = 1;
            }
            m = -1;
            var g = [];
            var n = f.length - 1;
            for (var d = 0; (h = f[d]); ++d) {
                if (b[h.tf]) {
                    h = m == -1;
                    if (d == n) {
                        g.push({
                            Va: h ? d : m,
                            Ua: d
                        });
                    } else if (h) {
                        m = d;
                    }
                } else if (m > -1) {
                    g.push({
                        Va: m,
                        Ua: d - 1
                    });
                    m = -1;
                }
            }
            if (!g.length) {
                return ["<b>", j, "</b>"].join("");
            }
            d = [];
            for (b = h = 0; (m = g[b]); ++b) {
                if ((n = f[m.Va].Va)) {
                    d.push("<b>", j.substring(h, n - 1), "</b> ");
                }
                h = f[m.Ua].Ua;
                d.push(j.substring(n, h));
            }
            if (h < j.length) {
                d.push("<b>", j.substring(h), "</b> ");
            }
            return d.join("");
        }
        return {
            getType: function () {
                return 150;
            },
            H: function () {
                return 95;
            },
            B: function () {
                return {
                    bold: a
                };
            }
        };
    });
    K.M(146, 12, function () {
        function a(a) {
            a = c(a, i, j);
            a = c(a, r, g);
            return c(a, o, f);
        }
        function c(a, b, d) {
            for (var i, c, l = 0; (i = b.exec(a)) != q;) {
                if (!c) {
                    c = [];
                }
                if (l < i.index) {
                    c.push(a.substring(l, i.index));
                }
                c.push(d(i[0]));
                l = b.lastIndex;
            }
            if (!c) {
                return a;
            }
            if (l < a.length) {
                c.push(a.substring(l));
            }
            return c.join("");
        }
        function j(a) {
            return String.fromCharCode(a.charCodeAt(0) - 65248);
        }
        function g(a) {
            var e = a.charCodeAt(0);
            if (a.length == 1) {
                return b.charAt(e - 65377);
            } else if (a.charCodeAt(1) == 65438) {
                return h.charAt(e - 65395);
            } else {
                return m.charAt(e - 65418);
            }
        }
        function f(a) {
            var b = a.charCodeAt(0);
            if (a.charCodeAt(1) == 12443) {
                return n.charAt(b - 12454);
            } else {
                return k.charAt(b - 12495);
            }
        }
        function d(a) {
            return eval('"\\u30' + a.split(",").join("\\u30") + '"');
        }
        var b = d(
            "02,0C,0D,01,FB,F2,A1,A3,A5,A7,A9,E3,E5,E7,C3,FC,A2,A4,A6,A8,AA,AB,AD,AF,B1,B3,B5,B7,B9,BB,BD,BF,C1,C4,C6,C8,CA,CB,CC,CD,CE,CF,D2,D5,D8,DB,DE,DF,E0,E1,E2,E4,E6,E8,E9,EA,EB,EC,ED,EF,F3,9B,9C"
        );
        var h = d("F4__,AC,AE,B0,B2,B4,B6,B8,BA,BC,BE,C0,C2,C5,C7,C9_____,D0,D3,D6,D9,DC");
        var m = d("D1,D4,D7,DA,DD");
        var n = d("F4____,AC_,AE_,B0_,B2_,B4_,B6_,B8_,BA_,BC_,BE_,C0_,C2__,C5_,C7_,C9______,D0__,D3__,D6__,D9__,DC");
        var k = d("D1__,D4__,D7__,DA__,DD");
        var i = /[\uFF01-\uFF5E]/g;
        var r = RegExp("([ｳｶ-ﾄﾊ-ﾎ]ﾞ)|([ﾊ-ﾎ]ﾟ)|([｡-ﾟ])", "g");
        var l =
            "([" +
            d("A6,AB,AD,AF,B1,B3,B5,B7,B9,BB,BD,BF,C1,C4,C6,C8,CF,D2,D5,D8,DB") +
            "]゛)|([" +
            d("CF,D2,D5,D8,DB") +
            "]゜)";
        var o = RegExp(l, "g");
        return {
            getType: function () {
                return 146;
            },
            H: function () {
                return 12;
            },
            B: function () {
                return {
                    Ii: a
                };
            }
        };
    });
    function Qb(a, c) {
        function j(a, b) {
            if (c) {
                d.push(a, "{", b, "}");
            }
        }
        var g = wb ? "-moz-" : Ya ? "-ms-" : Xa ? "-o-" : xb ? "-webkit-" : "";
        var f = document.body.style.filter != ea;
        var d = [];
        var b = {
            addRule: j,
            yh: function () {
                if (c && d.length) {
                    c = v;
                    var b = Ua("style");
                    b.setAttribute("type", "text/css");
                    (a || Qa()).appendChild(b);
                    var f = d.join("");
                    d = q;
                    if (b.styleSheet) {
                        b.styleSheet.cssText = f;
                    } else {
                        b.appendChild(document.createTextNode(f));
                    }
                }
            },
            Ki: function (a) {
                if (f) {
                    return [
                        "filter:",
                        Sa ? "progid:DXImageTransform.Microsoft.Alpha(" : "alpha(",
                        "opacity=",
                        Math.floor(a * 100),
                        ");"
                    ].join("");
                } else {
                    return "opacity:" + a + ";";
                }
            },
            prefix: function (a, b) {
                var d = [a, b || ""];
                if (g) {
                    d = d.concat(b ? [a, g, b] : [g, a]);
                }
                return d.join("");
            }
        };
        j("table.gsc_a, table.gsc_a td", "border:0;padding:0");
        j(
            ".gsc_b",
            'background: url("//www.google.com/images/experiments/wavy-underline.png") repeat-x scroll 0 100% transparent;color:#fff;display:inline-block;line-height:1.05em;padding:0 0 3px'
        );
        return b;
    }
    K.M(147, 10, function () {
        function a(a) {
            var d = 0;
            if (a) {
                if (!b) {
                    j();
                }
                g();
                if (a in h) {
                    d = h[a];
                } else {
                    fb(b, Ia(a));
                    h[a] = d = b.offsetWidth;
                    fb(b, "");
                }
            }
            return d;
        }
        function c() {
            if (!b) {
                j();
            }
            g();
            if (!m) {
                fb(b, "|");
                m = b.offsetHeight;
            }
            return m;
        }
        function j() {
            b = eb(f.Ha);
            b.style.visibility = "hidden";
            d.appendChild(b);
        }
        function g() {
            var a = sb(b, "fontSize");
            if (!n || a != n) {
                h = {};
                m = q;
                n = a;
            }
        }
        var f;
        var d;
        var b;
        var h;
        var m;
        var n;
        return {
            ea: function (a) {
                d = a.Be() || document.body;
            },
            W: function (a) {
                f = a;
            },
            getType: function () {
                return 147;
            },
            H: function () {
                return 10;
            },
            B: function () {
                return {
                    getWidth: a,
                    getHeight: c
                };
            }
        };
    });
    function Rb(a) {
        var c;
        (function () {
            var j = function () {};
            if (!a) {
                a = {};
            }
            var g = function (c) {
                return a[c] || j;
            };
            c = {
                Hd: g("a"),
                search: g("b"),
                Yb: g("c"),
                Zb: g("d"),
                Xb: g("e"),
                Nb: g("f"),
                kd: g("g"),
                ld: g("h"),
                gd: g("i"),
                Jd: g("j"),
                Rb: g("k"),
                Ed: g("l"),
                jd: g("m"),
                $b: g("n"),
                nd: g("o"),
                od: g("p"),
                Wb: g("q"),
                Id: g("r"),
                rf: g("s"),
                sf: g("t"),
                hd: g("u"),
                qf: g("v"),
                pd: g("w"),
                dd: g("x"),
                fd: g("z"),
                ed: g("aa")
            };
        })();
        return {
            Hd: function () {
                return c.Hd();
            },
            search: function (a, g) {
                c.search(a, g);
            },
            Yb: function (a) {
                c.Yb(a);
            },
            Zb: function (a) {
                c.Zb(a);
            },
            Xb: function (a) {
                return c.Xb(a);
            },
            Nb: function (a) {
                c.Nb(a);
            },
            kd: function (a) {
                c.kd(a);
            },
            ld: function (a) {
                c.ld(a);
            },
            gd: function (a) {
                c.gd(a);
            },
            Jd: function (a, g) {
                c.Jd(a, g);
            },
            Rb: function (a, g) {
                c.Rb(a, g);
            },
            Ed: function () {
                c.Ed();
            },
            jd: function (a) {
                c.jd(a);
            },
            $b: function (a) {
                c.$b(a);
            },
            nd: function () {
                c.nd();
            },
            od: function () {
                c.od();
            },
            Wb: function (a) {
                c.Wb(a);
            },
            Id: function (a) {
                c.Id(a);
            },
            rf: function (a) {
                c.rf(a);
            },
            sf: function () {
                c.sf();
            },
            hd: function () {
                c.hd();
            },
            qf: function () {
                c.qf();
            },
            pd: function (a) {
                c.pd(a);
            },
            dd: function () {
                c.dd();
            },
            fd: function () {
                c.fd();
            },
            ed: function () {
                c.ed();
            }
        };
    }
    K.M(149, 6, function () {
        function a(a) {
            e = a;
            if (a.Pa == 0) {
                a = n.wh();
                i = a.protocol;
                r = a.host;
                l = a.Qa;
                o = a.xh;
                t = document.location.protocol == "https:";
                h(b);
                new Image().src = i + r + "/generate_204";
            }
        }
        function c(a, b, c, f) {
            var h = a.getId();
            var n = a.ia();
            if (!e.Hb) {
                d();
            }
            var b = [i, r, l, "?", o ? o + "&" : "", b ? b + "&" : ""].join("");
            var g = Ea;
            var a = [];
            g("q", n, a, p);
            if (!e.Ib) {
                g("callback", "google.sbox.p" + k, a);
            }
            if (t) {
                var n = [];
                for (var j = 4 + Math.floor(Math.random() * 32), z = 0, U; z < j; ++z) {
                    U =
                        Math.random() < 0.3
                            ? 48 + Math.floor(Math.random() * 10)
                            : (Math.random() > 0.5 ? 65 : 97) + Math.floor(Math.random() * 26);
                    n.push(String.fromCharCode(U));
                }
                g("gs_gbg", n.join(""), a);
            }
            g = Ua("script");
            g.src = b + a.join("&");
            A[h] = g;
            H = e.Hb ? f : c;
            m.appendChild(g);
            return p;
        }
        function j() {
            return 0;
        }
        function g() {
            return 0;
        }
        function f(a) {
            var b = A[a];
            if (b) {
                m.removeChild(b);
                delete A[a];
            }
        }
        function d() {
            for (var a in A) {
                m.removeChild(A[a]);
            }
            A = {};
            H = q;
        }
        function b(a) {
            if (H) {
                H(a, v);
            }
        }
        function h(a) {
            if (!a) {
                a = ya;
            }
            var b = window.google;
            if (e.Ib) {
                b.ac.h = a;
            } else {
                b.sbox["p" + k] = a;
            }
        }
        var m = Qa();
        var n;
        var k;
        var i;
        var r;
        var l;
        var o;
        var t;
        var e;
        var A = {};
        var H;
        var z = {
            O: function (a) {
                n = a.get(127, z);
                k = a.fb().getId();
            },
            W: a,
            activate: a,
            getType: function () {
                return 149;
            },
            H: function () {
                return 6;
            },
            B: function () {
                return {
                    Mg: c,
                    Lg: f,
                    zb: ya,
                    jf: j,
                    De: g
                };
            },
            $: function () {
                h(q);
                d();
            }
        };
        return z;
    });
    K.M(145, 1, function () {
        function a(a) {
            if (!h) {
                return p;
            }
            var b = v;
            var d = v;
            for (var c = 0, l; c < a.length; ++c) {
                l = a.charAt(c);
                if (!g.test(l) && (f.test(l) ? (d = p) : (b = p), d && b)) {
                    return p;
                }
            }
            return v;
        }
        function c(a, c, i) {
            if (!h) {
                return p;
            }
            var f = d.test(i);
            var l = b.test(c);
            if (a == "ltr") {
                return f || l || g.test(i) || g.test(c);
            } else {
                return !f || !l;
            }
        }
        function j(a) {
            var b = m;
            if (h) {
                if (f.test(a)) {
                    b = "ltr";
                } else if (!g.test(a)) {
                    b = "rtl";
                }
            }
            return b;
        }
        var g = RegExp("^[\0- !-@[-`{-¿×÷ʹ-˿\u2000-⯿]*$");
        var f = RegExp(
            "^[\0- !-@[-`{-¿×÷ʹ-˿\u2000-⯿]*(?:\\d[\0- !-@[-`{-¿×÷ʹ-˿\u2000-⯿]*$|[A-Za-zÀ-ÖØ-öø-ʸ̀-֐ࠀ-῿Ⰰ-﬜﷾-﹯﻽-￿])"
        );
        var d = RegExp("^[\0- !-@[-`{-¿×÷ʹ-˿\u2000-⯿]*(?:\\d|[A-Za-zÀ-ÖØ-öø-ʸ̀-֐ࠀ-῿Ⰰ-﬜﷾-﹯﻽-￿])");
        var b = RegExp("(?:\\d|[A-Za-zÀ-ÖØ-öø-ʸ̀-֐ࠀ-῿Ⰰ-﬜﷾-﹯﻽-￿])[\0- !-@[-`{-¿×÷ʹ-˿\u2000-⯿]*$");
        var h = f.test("x");
        var m;
        return {
            ea: function (a) {
                m = a.kb();
            },
            getType: function () {
                return 145;
            },
            H: function () {
                return 1;
            },
            B: function () {
                return {
                    Fi: a,
                    $f: c,
                    Mc: j
                };
            }
        };
    });
    K.M(117, 2, function () {
        function a(a, b, e, d, c) {
            var i = k(a);
            if (!i) {
                i = {};
                o.push({
                    element: a,
                    Kh: i
                });
            }
            var l = i[b];
            if (!l) {
                l = i[b] = [];
                i = n(b, l);
                if (typeof b != "string") {
                    a[b] = i;
                } else if (a.addEventListener) {
                    a.addEventListener(b, i, v);
                } else {
                    a["on" + b] = i;
                }
            }
            a = {
                Nd: e,
                pf: d || 0
            };
            if (c) {
                a.Mh = p;
            }
            l.push(a);
            l.sort(r);
            e.Jh = b;
        }
        function c(a, b) {
            var e = k(a);
            if (e && (e = e[b.Jh])) {
                for (var d = 0, c; (c = e[d++]);) {
                    if (c.Nd == b) {
                        c.of = p;
                        break;
                    }
                }
            }
        }
        function j(b, e, d, c) {
            a(t, b, e, d, c);
        }
        function g(a) {
            c(t, a);
        }
        function f(a, b) {
            var e = b || {};
            var d = t[a];
            if (d) {
                d(e, e.Na);
            }
        }
        function d(a, b, e) {
            if (a.addEventListener) {
                a.addEventListener(b, e, v);
            } else {
                a.attachEvent("on" + b, e);
            }
        }
        function b(a, b, e) {
            if (a.removeEventListener) {
                a.removeEventListener(b, e, v);
            } else {
                a.detachEvent("on" + b, e);
            }
        }
        function h(a) {
            if (l) {
                if (!e) {
                    e = [];
                    d(window, "message", m);
                }
                e.push(a);
                a = window.location.href;
                window.postMessage("sbox.df", /HTTPS?:\/\//i.test(a) ? a : "*");
            } else {
                window.setTimeout(a, 0);
            }
        }
        function m(a) {
            if (e && a && a.source == window && a.data == "sbox.df" && e.length) {
                e.shift()();
                if (e && e.length) {
                    window.postMessage("sbox.df", window.location.href);
                }
            }
        }
        function n(a, b) {
            return function (e, d) {
                if (b.length) {
                    var c;
                    if (!(c = e)) {
                        c = {};
                        var l = window.event;
                        if (l) {
                            if (l.keyCode) {
                                c.keyCode = l.keyCode;
                            }
                            c.Lh = p;
                        }
                    }
                    c.Na = d || a;
                    var l = c;
                    var f;
                    var t;
                    for (var k = 0, o; (o = b[k++]);) {
                        if (o.of) {
                            t = p;
                        } else if (!f) {
                            if (o.Mh) {
                                i(o, l);
                            } else {
                                f = o.Nd(l);
                            }
                        }
                    }
                    if (t) {
                        for (k = 0; (o = b[k]);) {
                            if (o.of) {
                                b.splice(k, 1);
                            } else {
                                ++k;
                            }
                        }
                    }
                    if (c.Ub) {
                        delete c.Ub;
                        if (c.Lh) {
                            c = window.event || c;
                        }
                        pb(c);
                        return (c.returnValue = v);
                    }
                }
            };
        }
        function k(a) {
            for (var b = 0, e; b < o.length; ++b) {
                e = o[b];
                if (e.element == a) {
                    return e.Kh;
                }
            }
            return q;
        }
        function i(a, b) {
            h(function () {
                a.Nd(b);
            });
        }
        function r(a, b) {
            return b.pf - a.pf;
        }
        var l = window.postMessage && !Ya && !yb && !Xa;
        var o = [];
        var t = {};
        var e;
        return {
            getType: function () {
                return 117;
            },
            H: function () {
                return 2;
            },
            B: function () {
                return {
                    ga: a,
                    gg: c,
                    Qb: j,
                    pi: g,
                    Y: f,
                    Jb: d,
                    oi: b,
                    defer: h
                };
            },
            $: function () {
                e = q;
            }
        };
    });
    K.M(118, 3, function () {
        function a(a) {
            Kb = ta.kc();
            qa = a;
            X(F.vf());
            kb = Va = v;
        }
        function c() {
            var a = {};
            Q.Y(14, a);
            if (!a.cancel && qa.Wa) {
                J.rc();
            }
        }
        function j() {
            Q.Y(13);
            oa.hd();
        }
        function g() {
            ha("rtl");
        }
        function f() {
            ha("ltr");
        }
        function d(a) {
            if (J.sa()) {
                J.If();
            } else {
                J.gb(a);
            }
        }
        function b() {
            if (qa.Ea == 0) {
                return v;
            }
            var a = Z();
            if (a) {
                switch (qa.Ea) {
                    case 1:
                        return S(a, p);
                }
            }
            return v;
        }
        function h() {
            if (qa.jc) {
                W(5);
            } else {
                if (J.isVisible()) {
                    J.rc();
                } else {
                    t();
                }
                C();
            }
        }
        function m(a) {
            if (Y && a.getPosition() == Y.length) {
                Q.Y(9);
                if (qa.ic) {
                    W(2);
                }
                oa.gd(Y);
            }
        }
        function n(a) {
            if (T && a.getPosition() == 0) {
                T.fg();
            }
        }
        function k(a, b, e, d) {
            if (qa.Xa && !a) {
                J.qc(p);
            }
            if (qa.hc && e == "mousedown" && !J.isVisible()) {
                J.gb(b);
            }
            var c;
            if (La && La.Xf(a, b, e)) {
                c = La;
            } else {
                La = c = Nb(a, b, e);
            }
            var b = v;
            var i = c.Wf();
            var l = R.Ia();
            if (ua) {
                for (var f = 0, t; (t = ua[f++]);) {
                    if (t.eg(i, l)) {
                        b = p;
                    }
                }
            }
            d = b || d;
            if (a != Y || e == "onremovechip") {
                X(a);
                Q.Y(1, {
                    Na: e,
                    ud: va
                });
                oa.Nb(a);
                b = pa();
                if (!Wa) {
                    Wa = b;
                }
                lb = b;
                if (Ha(a)) {
                    d = p;
                } else if (!d) {
                    J.clear();
                    mb.mc();
                }
            }
            if (d) {
                if (Va) {
                    c.setParameter("gs_is", 1);
                }
                oa.jd(Va);
                a = c;
                J.Jf();
                mb.Pd(a);
                F.focus();
                La = q;
            }
            Q.Y(2, {
                Na: e
            });
        }
        function i(a) {
            Va = a;
        }
        function r(a) {
            if (kb != a) {
                if ((kb = a)) {
                    oa.fd();
                } else {
                    oa.ed();
                }
            }
        }
        function l(a) {
            G(a);
        }
        function o() {
            F.focus();
        }
        function t() {
            F.blur();
        }
        function e() {
            return F.Gf();
        }
        function A(a, b) {
            if (Oa(a, Y, p)) {
                a = Y + a.substr(Y.length);
            }
            var e = Ga(a.length);
            k(a, e, "", b);
            G(a, p);
        }
        function H(a) {
            A(a, p);
            nb = pa();
        }
        function z() {
            k(Y, M(), "onremovechip");
        }
        function B(a) {
            X(a);
            F.refresh();
            Q.Y(4, {
                ud: va,
                input: a
            });
        }
        function s() {
            F.select();
        }
        function C() {
            if (Y != wa) {
                X(wa);
            }
            Q.Y(5, {
                input: wa,
                Vf: J.ha(),
                ud: va
            });
            F.refresh();
            oa.ld(wa);
        }
        function D() {
            wa = Y;
        }
        function w() {
            return F.Vd();
        }
        function y() {
            return wa;
        }
        function L() {
            return Y;
        }
        function u() {
            return va;
        }
        function M() {
            return F.Ga();
        }
        function U() {
            return F.Fc();
        }
        function P() {
            return F.getHeight();
        }
        function ia() {
            return F.getWidth();
        }
        function ba() {
            return Wa;
        }
        function ja() {
            return lb;
        }
        function N() {
            return nb;
        }
        function I() {
            return Kb != 0;
        }
        function $() {
            for (var a = 0, b; (b = Lb[a++]);) {
                if (b.isEnabled()) {
                    return p;
                }
            }
            return v;
        }
        function E(a) {
            var b = Y.length;
            var e = a.substr(0, b);
            var a = a.substr(b);
            return !!a && e == Y && Fa.$f(va, Y, a);
        }
        function V() {
            F.pc();
        }
        function W(a) {
            ga.search(Y, a);
        }
        function x(a) {
            if (Y) {
                Y = wa = "";
                F.clear();
                Q.Y(1);
                J.clear();
                oa.Nb(Y);
                if (a) {
                    oa.dd();
                }
            }
        }
        function ca() {
            nb = lb = Wa = 0;
        }
        function aa(a) {
            F.Yd(a);
        }
        function da() {
            var a = Z();
            if (a) {
                S(a);
            }
        }
        function ka(a, b) {
            return a.la() - b.la();
        }
        function ha(a) {
            var e = M().getPosition();
            if (va == a) {
                if (J.sa() && e == Y.length) {
                    if (J.Fa()) {
                        if (qa.Ya) {
                            a = J.va();
                            ga.search(a.Z(), 6);
                        }
                    } else if (qa.Za) {
                        b();
                    }
                }
            } else if (T && e == 0) {
                T.fg();
            }
        }
        function Z() {
            if (J.sa()) {
                var a = J.Fa() ? J.va() : J.Qd();
                if (a.Jc()) {
                    return a;
                }
            }
            return q;
        }
        function S(a, b) {
            var e = a.Z();
            if (wa != e) {
                D();
                if (b) {
                    A(e, p);
                } else {
                    B(e);
                }
                return p;
            } else {
                return v;
            }
        }
        function G(a, b) {
            Y = a || "";
            O();
            F.refresh();
            if (!b) {
                Q.Y(4, {
                    ud: va,
                    input: Y
                });
                oa.kd(Y);
            }
        }
        function O() {
            var a = Fa.Mc(Y);
            if (a != va) {
                F.ta(a);
                va = a;
            }
        }
        function X(a) {
            Y = wa = a || "";
            O();
        }
        var F;
        var J;
        var T;
        var Q;
        var ga;
        var R;
        var Fa;
        var ua;
        var ta;
        var oa;
        var mb;
        var Lb;
        var wa;
        var Y;
        var va;
        var Kb;
        var Wa;
        var lb;
        var nb;
        var Va;
        var kb;
        var La;
        var qa;
        var ma = {
            O: function (a) {
                T = a.get(130, ma);
                Fa = a.get(145, ma);
                Q = a.get(117, ma);
                mb = a.get(123, ma);
                ga = a.get(121, ma);
                ua = a.ja(156, ma);
                R = a.get(126, ma);
                a.get(127, ma);
                J = a.get(128, ma);
                F = a.get(119, ma);
                Lb = a.ja(160, ma);
                ta = a.fb();
                oa = a.ra();
            },
            W: function (b) {
                ua.sort(ka);
                a(b);
            },
            activate: a,
            getType: function () {
                return 118;
            },
            H: function () {
                return 3;
            },
            B: function () {
                return {
                    Wd: c,
                    Af: j,
                    Cf: g,
                    Df: f,
                    yf: d,
                    Ef: b,
                    zf: h,
                    xf: m,
                    wf: n,
                    Bf: k,
                    Hf: i,
                    Xd: r,
                    lb: l,
                    Zf: o,
                    Lc: t,
                    Pf: e,
                    Ud: A,
                    Uh: H,
                    Vh: z,
                    lc: B,
                    Td: s,
                    Rd: C,
                    Yf: D,
                    Vd: w,
                    na: y,
                    pa: L,
                    Mc: u,
                    Ga: M,
                    Fc: U,
                    getHeight: P,
                    getWidth: ia,
                    Mf: ba,
                    Nf: ja,
                    Of: N,
                    Ff: I,
                    Nc: $,
                    Wh: E,
                    pc: V,
                    search: W,
                    clear: x,
                    za: ca,
                    Yd: aa,
                    Sd: da
                };
            }
        };
        return ma;
    });
    K.M(120, 9, function () {
        function a(a) {
            n = a;
            j();
        }
        function c(a) {
            var c = f.na();
            var t = "f";
            if (b.Dd()) {
                t = "o";
            } else if (d.Fa()) {
                t = xa(d.va());
            }
            var e = "";
            var A = b.Ia();
            if (A) {
                e = A.rh("e") ? "1" : "";
            }
            A = "";
            if (a != ea) {
                A = a + "";
            }
            a = "";
            if (n.pb) {
                a = pa() - i;
                a = [
                    g(f.Mf()),
                    g(f.Nf()),
                    k,
                    a,
                    h.xg(),
                    h.wg(),
                    h.wd(),
                    h.xd(),
                    h.tg(),
                    h.vg(),
                    h.ug(),
                    h.zg(),
                    h.sg(),
                    h.yg(),
                    g(f.Of())
                ].join("l");
            }
            var r = "";
            var j = d.ha();
            if (j) {
                var r = {
                    Md: [],
                    ec: q,
                    count: 0
                };
                for (var B = j.length, s = 0, C; s < B; ++s) {
                    C = s == B - 1;
                    var D = j[s];
                    var w = r;
                    var y = m[D.getType()].Fd();
                    if ((D = sa(D.Ta()))) {
                        y += "-" + D;
                    }
                    if (y != w.ec) {
                        if (w.count) {
                            w.Md.push(w.ec, w.count);
                        }
                        w.count = 0;
                        w.ec = y;
                    }
                    ++w.count;
                    if (C && w.count) {
                        w.Md.push(w.ec, w.count);
                    }
                }
                r = r.Md.join("");
            }
            return {
                oq: c,
                aq: t,
                aqi: r,
                aql: e,
                gs_sm: A,
                gs_upl: a
            };
        }
        function j() {
            i = pa();
            ++k;
            f.za();
            h.za();
        }
        function g(a) {
            return Math.max(a - i, 0);
        }
        var f;
        var d;
        var b;
        var h;
        var m;
        var n;
        var k = -1;
        var i;
        var r = {
            O: function (a) {
                f = a.get(118, r);
                d = a.get(128, r);
                b = a.get(126, r);
                h = a.get(123, r);
                m = vb(a.ja(152, r));
            },
            W: a,
            activate: a,
            getType: function () {
                return 120;
            },
            H: function () {
                return 9;
            },
            B: function () {
                return {
                    Kb: c,
                    reset: j
                };
            }
        };
        return r;
    });
    K.M(121, 11, function () {
        function a(a, e) {
            if (Ha(a) || (b && b.ve())) {
                if (Ra(e)) {
                    if (t && !o) {
                        o = hb(t, "btnI", "1");
                    }
                } else if (o) {
                    t.removeChild(o);
                    o = q;
                }
                l.search(a, e);
                d();
                h.Y(15, {
                    query: a
                });
            }
        }
        function c(a) {
            l.Yb(a);
            d();
        }
        function j(a) {
            l.Zb(a);
            d();
        }
        function g(a) {
            l.Wb(a);
            d();
        }
        function f(a) {
            return l.Xb(a);
        }
        function d() {
            m.mc();
            m.Eg();
            k.reset();
            i.clear();
            if (n.na() != n.pa()) {
                n.Yf();
            }
            if (r) {
                r.clear();
            }
        }
        var b;
        var h;
        var m;
        var n;
        var k;
        var i;
        var r;
        var l;
        var o;
        var t;
        var e = {
            ea: function (a) {
                t = a.Be();
            },
            O: function (a) {
                b = a.get(130, e);
                h = a.get(117, e);
                m = a.get(123, e);
                n = a.get(118, e);
                k = a.get(120, e);
                i = a.get(128, e);
                r = a.get(139, e);
                l = a.ra();
            },
            getType: function () {
                return 121;
            },
            H: function () {
                return 11;
            },
            B: function () {
                return {
                    search: a,
                    Yb: c,
                    Zb: j,
                    Wb: g,
                    Xb: f
                };
            }
        };
        return e;
    });
    K.M(124, 14, function () {
        var a;
        var c;
        var j;
        var g;
        var f;
        var d;
        var b;
        function h(a) {
            k = a.oa;
            r = a.Ca;
        }
        function m(a) {
            return (a[f] || {}).j;
        }
        function n(t, e) {
            var o = t[d];
            var h = t[b];
            var n = {};
            var m = t[f];
            if (m) {
                for (var s in m) {
                    var C = m[s];
                    if (s in l) {
                        C = l[s].parse(C);
                    }
                    n[s] = C;
                }
            }
            var m = Ob;
            var D = v;
            var w = v;
            s = v;
            for (var C = 0, y; (y = h[C++]);) {
                if ((y[a] || 0) == 33) {
                    w = p;
                } else {
                    D = p;
                }
                if (w && D) {
                    s = p;
                    break;
                }
            }
            D = 0;
            w = [];
            for (C = 0; (y = h[C++]);) {
                var L = y[a] || 0;
                if (L in k && (!s || L != 33)) {
                    var u;
                    u = y[j];
                    if (r) {
                        u = i.bold(o.toLowerCase(), Ma(Ja(u)));
                    }
                    w.push(Pb(u, Ma(Ja(u)), D++, L, ra(y[c]), y[g]));
                }
            }
            return m(e, o, w, n, v, p, v, v);
        }
        d = 0;
        b = 1;
        f = 2;
        j = 0;
        a = 1;
        c = 2;
        g = 3;
        var k;
        var i;
        var r;
        var l = {};
        var o = {
            O: function (a) {
                i = a.get(150, o);
                if ((a = a.ja(158, o))) {
                    for (var b = 0, d; (d = a[b++]);) {
                        l[d.Di()] = d;
                    }
                }
            },
            W: h,
            activate: h,
            getType: function () {
                return 124;
            },
            H: function () {
                return 14;
            },
            B: function () {
                return {
                    Qg: m,
                    Rg: n
                };
            }
        };
        return o;
    });
    K.M(125, 15, function () {
        function a(a) {
            var k = c(a);
            if (k) {
                if (f && !a.ef()) {
                    a = f.ni(a);
                }
                d.Ah(a);
                var i = a;
                var g = i.qa().ia();
                var l = i.ha();
                if (b.isEnabled()) {
                    if (l.length) {
                        i = i.getType() == v;
                        b.Kc(g, l, i);
                    } else {
                        b.clear();
                    }
                }
                j.Y(3, {
                    input: g,
                    Vf: l
                });
            }
            h.Jd(a, k);
            return k;
        }
        function c(a) {
            var b = g.pa();
            var c = d.Ia();
            var b = b.toLowerCase();
            var f = a.ia().toLowerCase();
            if (b == f) {
                c = p;
            } else {
                b = Ca(b);
                a = (f = a.qa()) ? f.ka() : Ca(a.ia().toLowerCase());
                c = c ? c.qa().ka() : "";
                c = b.indexOf(a) == 0 ? (b.indexOf(c) == 0 ? a.length >= c.length : p) : v;
            }
            return c;
        }
        var j;
        var g;
        var f;
        var d;
        var b;
        var h;
        var m = {
            O: function (a) {
                j = a.get(117, m);
                g = a.get(118, m);
                f = a.get(122, m);
                d = a.get(126, m);
                b = a.get(128, m);
                h = a.ra();
            },
            getType: function () {
                return 125;
            },
            H: function () {
                return 15;
            },
            B: function () {
                return {
                    Ce: a,
                    Mb: c
                };
            }
        };
        return m;
    });
    K.M(123, 13, function () {
        function a(a) {
            ia = $.Ag();
            ga = a;
            W = {};
            O = 0;
            F = a.Hc;
            J = a.Ma;
            T = v;
            Q = ga.Gc && !!U;
        }
        function c(a, b) {
            if (!J && (!P || !P.li())) {
                a.Fe("ds", ga.La);
                a.Ng();
                var e = p;
                T = v;
                ++x;
                var c = pa();
                var i;
                for (i in W) {
                    var l = W[i].getTimestamp();
                    if (c - l > 2500) {
                        D(i);
                    }
                }
                if (Q && (c = U.get(a))) {
                    if ((e = F || a.Pg()) && ga.Ic) {
                        a.Og();
                    }
                    N.Ce(c);
                    if (c.ze()) {
                        ++da;
                    }
                    d();
                }
                if (e) {
                    V = a;
                    if (!X || b) {
                        C();
                    }
                } else {
                    ++ca;
                }
            }
        }
        function j() {
            if (aa >= 10 || ia.De() >= 3) {
                return p;
            } else {
                return v;
            }
        }
        function g() {
            T = p;
        }
        function f() {
            return T;
        }
        function d() {
            V = q;
        }
        function b() {
            return x;
        }
        function h() {
            return ca;
        }
        function m() {
            if (Q) {
                return U.wd();
            } else {
                return -1;
            }
        }
        function n() {
            if (Q) {
                return U.xd();
            } else {
                return -1;
            }
        }
        function k() {
            return da;
        }
        function i() {
            return ka;
        }
        function r() {
            return ha;
        }
        function l() {
            return Z;
        }
        function o(a) {
            a = y(a, q);
            return N.Mb(a);
        }
        function t() {
            return S;
        }
        function e() {
            var a = [];
            var b = 0;
            var e;
            for (var c = 0; c <= u; ++c) {
                e = G[c];
                if (e == 0) {
                    b++;
                } else {
                    b = b == 1 ? "0." : b > 1 ? c + "-" : "";
                    a.push(b + e);
                    b = 0;
                }
            }
            return a.join(".");
        }
        function A() {
            if (Q) {
                U.Cg();
            }
        }
        function H(a) {
            if (Q) {
                U.Dg(a);
            }
        }
        function z(a, b) {
            return y(a, b);
        }
        function B() {
            if (Q) {
                U.za();
            }
            S = Z = ha = ka = da = aa = ca = x = 0;
            G = [];
            for (var a = 0; a <= u; ++a) {
                G[a] = 0;
            }
        }
        function s(a) {
            return function (b, e) {
                w(b, e, a);
            };
        }
        function C() {
            Pa(X);
            X = q;
            if (!(ia.De() > 2) && V) {
                var a = [];
                var b = V.Kb();
                if (b) {
                    for (var e in b) {
                        Ea(e, b[e], a);
                    }
                }
                E.Ed();
                a = ia.Mg(V, a.join("&"), s(V), w);
                b = V.Ee();
                if (a && !b) {
                    a = V;
                    W[a.getId()] = a;
                    ++aa;
                    ++ca;
                }
                d();
                a = 100;
                b = (aa - 2) / 2;
                for (e = 1; e++ <= b;) {
                    a *= 2;
                }
                if (a < O) {
                    a = O;
                }
                X = window.setTimeout(C, a);
            }
        }
        function D(a) {
            ia.Lg(a);
            delete W[a];
            if (aa) {
                --aa;
            }
        }
        function w(a, b, e) {
            ++ka;
            if (!e && ((e = ja.Qg(a)), (e = W[e]), !e)) {
                return;
            }
            if (!e.Ee()) {
                a = y(a, e);
                if (I) {
                    var c = ba.pa();
                    var a = I.mi(a, c);
                }
                if (b) {
                    a.Ae();
                }
                if (Q) {
                    U.put(a);
                }
                if (!T) {
                    if (!N.Ce(a)) {
                        ++ha;
                    }
                    b = e;
                    O = a.vd("d");
                    if (b) {
                        D(b.getId());
                        b = b.getTimestamp();
                        b = pa() - b;
                        S += b;
                        Z = Math.max(b, Z);
                        ++G[b > M ? u : L[Math.floor(b / 100)]];
                    }
                }
            }
        }
        function y(a, b) {
            var e = ba.pa();
            return ja.Rg(a, b, e);
        }
        var L = [0, 1, 2, 3, 4, 5, 5, 6, 6, 6, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8];
        var u = L[L.length - 1] + 1;
        var M = L.length * 100 - 1;
        var U;
        var P;
        var ia;
        var ba;
        var ja;
        var N;
        var I;
        var $;
        var E;
        var V;
        var W;
        var x;
        var ca;
        var aa;
        var da;
        var ka;
        var ha;
        var Z;
        var S;
        var G;
        var O;
        var X;
        var F;
        var J;
        var T;
        var Q;
        var ga;
        var R = {
            O: function (a) {
                U = a.get(133, R);
                P = a.get(130, R);
                a.get(117, R);
                ba = a.get(118, R);
                ja = a.get(124, R);
                N = a.get(125, R);
                I = a.get(230, R);
                a.get(126, R);
                $ = a.get(127, R);
                a.get(128, R);
                E = a.ra();
            },
            W: a,
            activate: a,
            getType: function () {
                return 123;
            },
            H: function () {
                return 13;
            },
            B: function () {
                return {
                    Pd: c,
                    Dd: j,
                    mc: g,
                    be: f,
                    Eg: d,
                    xg: b,
                    wg: h,
                    wd: m,
                    xd: n,
                    tg: k,
                    yg: i,
                    vg: r,
                    ug: l,
                    Mb: o,
                    zg: t,
                    sg: e,
                    zb: A,
                    Jg: H,
                    ee: z,
                    za: B
                };
            },
            $: function () {
                Pa(X);
                X = q;
                d();
                W = q;
                T = p;
            }
        };
        return R;
    });
    K.M(126, 5, function () {
        function a() {
            n = m = 0;
            f();
        }
        function c() {
            return d.Dd();
        }
        function j(a) {
            h = a;
            ++m;
            if (a.Ch()) {
                ++n;
            }
            if (b.$b) {
                b.$b(n / m);
            }
        }
        function g() {
            return h;
        }
        function f() {
            h = q;
        }
        var d;
        var b;
        var h;
        var m;
        var n;
        var k = {
            O: function (a) {
                d = a.get(123, k);
                b = a.ra();
            },
            W: a,
            activate: a,
            getType: function () {
                return 126;
            },
            H: function () {
                return 5;
            },
            B: function () {
                return {
                    Dd: c,
                    Ah: j,
                    Ia: g,
                    Ei: f
                };
            }
        };
        return k;
    });
    K.M(127, 16, function () {
        function a(a) {
            var c = document.location.protocol == "https:" || a.Eb;
            var k = Ea;
            var i = [];
            k("client", a.ua, i);
            k("pq", a.Wc, i);
            k("hl", a.wa, i);
            k("gl", a.Bb, i);
            k("sugexp", a.Cb, i);
            k("gs_nf", 1, i);
            if (a.Ra) {
                k("authuser", a.Ra, i);
            }
            b = {
                protocol: "http" + (c ? "s" : "") + "://",
                host: a.Xc || "clients1." + a.Vc,
                Qa: a.Qa || "/complete/search",
                xh: i.length ? i.join("&") : ""
            };
            if (!d || d.jf() != a.Pa) {
                d = f[a.Pa];
            }
        }
        function c() {
            return d;
        }
        function j() {
            return b;
        }
        function g() {
            if (d) {
                d.zb();
            }
        }
        var f = {};
        var d;
        var b;
        var h = {
            O: function (a) {
                for (var a = a.ja(149, h), b = 0, c; (c = a[b++]);) {
                    f[c.jf()] = c;
                }
            },
            W: a,
            activate: a,
            getType: function () {
                return 127;
            },
            H: function () {
                return 16;
            },
            B: function (a) {
                return {
                    Ag: a == 123 ? c : ya,
                    wh: j,
                    vh: g
                };
            }
        };
        return h;
    });
    K.M(128, 17, function () {
        function a(a) {
            ga = a;
            O = G = q;
            X = $.EMPTY;
            F = v;
            J = p;
        }
        function c(a, b, e) {
            a = ka && ka.ei(b);
            s();
            if ((S = b) && b.length) {
                var c = b[0].Z();
                var c = V.Mc(c);
                var d = v;
                if (e) {
                    X = $.lg;
                    d = E.Sf(b, c);
                    b = b[0].Pb()[0];
                    b = Ja(b);
                    W.Tb(aa.getWidth(b));
                } else {
                    X = $.we;
                    d = E.ma(ia(), c);
                    W.Tb(0);
                }
                if (a) {
                    O = ka.$h();
                    j(ka.Zh());
                }
                W.ta(c);
                if (d) {
                    z();
                } else {
                    s();
                }
            }
        }
        function j(a) {
            I();
            if (G != a) {
                var b = G;
                G = a;
                N(b);
            }
        }
        function g() {
            if (e()) {
                if (F) {
                    var a = G;
                    if (G == S.length - 1) {
                        O = G = q;
                    } else if (G == q) {
                        G = 0;
                    } else {
                        ++G;
                    }
                    O = G;
                    ja(a, g);
                } else {
                    z();
                }
            }
        }
        function f() {
            if (e()) {
                if (F) {
                    var a = G;
                    if (!S || G == 0) {
                        O = G = q;
                    } else if (G == q) {
                        G = S.length - 1;
                    } else {
                        --G;
                    }
                    O = G;
                    ja(a, f);
                } else {
                    z();
                }
            }
        }
        function d(a) {
            var b = a ? 4 : 3;
            if (A()) {
                a = o();
                if (!E.ob(a)) {
                    ca.search(b);
                }
                b = ca.na();
                Z.Rb(b, a);
            } else {
                ca.search(b);
            }
        }
        function b(a) {
            O = G = a;
            var a = S[a];
            var b = ca.na();
            Z.Rb(b, a);
        }
        function h() {
            return F;
        }
        function m() {
            return J;
        }
        function n(a) {
            if (J && !a) {
                s();
            }
            J = a;
        }
        function k() {
            return X;
        }
        function i() {
            return S;
        }
        function r() {
            if (e()) {
                return S[0];
            } else {
                return q;
            }
        }
        function l() {
            return G;
        }
        function o() {
            if (A()) {
                return S[O];
            } else {
                return q;
            }
        }
        function t() {
            return O;
        }
        function e() {
            return !!S && !!S.length;
        }
        function A() {
            return O != q;
        }
        function H() {
            if (F && !T) {
                T = window.setTimeout(s, ga.oc);
            }
        }
        function z() {
            if (!F) {
                W.setPanel(17);
                W.show();
                F = p;
                Z.nd();
            }
        }
        function B() {
            if (F) {
                if (T) {
                    Pa(T);
                    T = q;
                }
                W.Sb();
                F = v;
                Z.od();
            }
        }
        function s() {
            B();
            S = q;
            X = $.EMPTY;
            if (G != q) {
                E.Ob(G);
            }
            O = G = q;
            E.clear();
        }
        function C() {
            x.mc();
            B();
        }
        function D() {
            if (G != q) {
                E.Ob(G);
            }
            O = G = q;
        }
        function w() {
            I();
            Q = window.setTimeout(D, 0);
        }
        function y() {
            I();
        }
        function L(a) {
            if (e()) {
                z();
            } else {
                var b = ca.na();
                if (b) {
                    a = a || ca.Ga();
                    x.Pd(Nb(b, a));
                }
            }
        }
        function u() {
            return E.fa();
        }
        function M() {
            return E.Uc();
        }
        function U() {
            E.Lb();
        }
        function P() {
            return 17;
        }
        function ia() {
            if (e() && X == $.we) {
                var a = [];
                for (var b = [], c = 0, d; (d = da[c++]) && !d.getMessage(ca.na(), S, b););
                if ((c = b ? b.length : 0)) {
                    c -= ba(b, a, 0);
                }
                for (d = 0; d < S.length; ++d) {
                    a.push(S[d]);
                }
                if (c) {
                    c -= ba(b, a, 1);
                }
                if (ga.nc) {
                    a.push(1);
                }
                if (c) {
                    ba(b, a, 2);
                }
                if (ga.eb) {
                    a.push(2);
                }
                if (ha) {
                    ha.Yh(a);
                }
                return a;
            }
            return q;
        }
        function ba(a, b, e) {
            var c = 0;
            for (var d = 0, i; d < a.length; ++d) {
                if ((i = a[d]) && i.position == e) {
                    b.push(i);
                    ++c;
                }
            }
            return c;
        }
        function ja(a, b) {
            if (G != q && !E.Sa(G)) {
                E.Ob(a);
                b();
            } else {
                N(a);
                if (G == q) {
                    ca.Rd();
                } else {
                    var e = E.md(S[G]);
                    ca.lb(e);
                    Z.pd(e);
                }
            }
        }
        function N(a) {
            I();
            if (a != q) {
                E.Ob(a);
            }
            if (G != q) {
                E.Rf(G);
            }
        }
        function I() {
            if (Q) {
                Pa(Q);
                Q = q;
            }
        }
        var $ = Eb;
        var E;
        var V;
        var W;
        var x;
        var ca;
        var aa;
        var da;
        var ka;
        var ha;
        var Z;
        var S;
        var G;
        var O;
        var X;
        var F;
        var J;
        var T;
        var Q;
        var ga;
        var R = {
            O: function (a) {
                E = a.get(129, R);
                V = a.get(145, R);
                W = a.get(115, R);
                x = a.get(123, R);
                ca = a.get(118, R);
                aa = a.get(147, R);
                da = a.ja(153, R);
                ka = a.get(184, R);
                ha = a.get(157, R);
                Z = a.ra();
            },
            W: a,
            activate: a,
            getType: function () {
                return 128;
            },
            H: function () {
                return 17;
            },
            B: function () {
                return {
                    Kc: c,
                    Uf: j,
                    If: g,
                    Kf: f,
                    ob: d,
                    Qf: b,
                    isVisible: h,
                    isEnabled: m,
                    qc: n,
                    Lf: k,
                    ha: i,
                    Qd: r,
                    hg: l,
                    va: o,
                    ig: t,
                    sa: e,
                    Fa: A,
                    Jf: H,
                    show: z,
                    Sb: B,
                    clear: s,
                    rc: C,
                    jg: D,
                    Tf: w,
                    Xh: y,
                    gb: L
                };
            },
            $c: function () {
                var a = {
                    fa: u,
                    Uc: M,
                    Lb: U,
                    kg: P
                };
                return [
                    {
                        ea: ya,
                        O: ya,
                        W: ya,
                        activate: ya,
                        getType: function () {
                            return 154;
                        },
                        H: function () {
                            return 17;
                        },
                        B: function () {
                            return a;
                        },
                        $c: ya,
                        $: ya
                    }
                ];
            },
            $: function () {
                if (T) {
                    Pa(T);
                    T = q;
                }
                S = q;
                B();
            }
        };
        return R;
    });
    K.M(115, 7, function () {
        function a() {
            n = v;
        }
        function c() {
            return n;
        }
        function j(a) {
            if (a in k && a != i) {
                h();
                m.setPanel(k[a]);
                i = a;
            }
        }
        function g() {
            if (n) {
                return m.getHeight();
            } else {
                return 0;
            }
        }
        function f(a) {
            m.Tb(a);
        }
        function d(a) {
            m.ta(a);
        }
        function b() {
            if (!n) {
                m.show();
                n = p;
            }
        }
        function h() {
            if (n) {
                m.Sb();
                n = v;
            }
        }
        var m;
        var n;
        var k = {};
        var i;
        var r = {
            O: function (a) {
                m = a.get(116, r);
                a.ra();
                if ((a = a.ja(154, r))) {
                    for (var b = 0, c; (c = a[b++]);) {
                        k[c.kg()] = c;
                    }
                }
            },
            W: a,
            activate: a,
            getType: function () {
                return 115;
            },
            H: function () {
                return 7;
            },
            B: function () {
                return {
                    isVisible: c,
                    setPanel: j,
                    getHeight: g,
                    Tb: f,
                    ta: d,
                    show: b,
                    Sb: h
                };
            },
            $: function () {
                h();
            }
        };
        return r;
    });
    K.M(119, 4, function () {
        function a(a) {
            aa = a;
            x.setAttribute("autocomplete", "off");
            x.setAttribute("spellcheck", a.spellcheck);
            x.style.outline = a.jb ? "" : "none";
            if (ka) {
                M();
            }
        }
        function c(a, b) {
            if (!b) {
                b = a;
            }
            x.parentNode.replaceChild(a, x);
            b.appendChild(x);
            if (da && aa.uc) {
                x.focus();
                if (Ya || wb) {
                    E.defer(function () {
                        Za(x, Z.getPosition());
                    });
                }
            }
        }
        function j() {
            return F;
        }
        function g(a) {
            var b = a == "rtl";
            var e = b == (Fa == "rtl");
            x.dir = a;
            if (J) {
                V.ta(a);
                var c = O.parentNode;
                c.removeChild(J);
                if (e) {
                    qb(J, O);
                } else {
                    c.insertBefore(J, O);
                }
            }
            if (F) {
                F.dir = a;
                a = F.parentNode;
                a.removeChild(F);
                if (e) {
                    a.insertBefore(F, O);
                } else {
                    qb(F, O);
                }
            }
            if (ca != 0) {
                e = x.style;
                if (b) {
                    e.left = "";
                    e.right = "2px";
                } else {
                    e.left = "0";
                    e.right = "";
                }
            }
        }
        function f() {
            return Z;
        }
        function d() {
            return ab(X);
        }
        function b() {
            return X.offsetHeight;
        }
        function h() {
            return X.offsetWidth;
        }
        function m() {
            var a = x.offsetWidth;
            if (aa.$a) {
                a -= x.offsetHeight;
            }
            return a;
        }
        function n() {
            return x.value;
        }
        function k(a) {
            x.style.background = a || "transparent";
        }
        function i() {
            G = p;
        }
        function r() {
            x.select();
            ba();
        }
        function l() {
            if (zb) {
                x.value = "";
            }
            x.value = I.pa();
            if (zb) {
                x.value = x.value;
            }
            z();
        }
        function o() {
            if (!da) {
                try {
                    x.focus();
                    da = p;
                    z();
                } catch (a) {}
            }
        }
        function t() {
            if (da) {
                x.blur();
                da = v;
            }
        }
        function e() {
            return da;
        }
        function A() {
            x.value = "";
        }
        function H() {
            var a = x.style;
            var b = ua.get("gs_id");
            if (b) {
                F = ua.get("gs_ttc");
                O = ua.get("gs_tti");
                if (I.Nc() && V) {
                    T = V.fa();
                    J = T.parentNode;
                }
                B(b);
                X = b;
            } else {
                var b = cb();
                var e = b.style;
                b.className = aa.vc || x.className;
                x.className = aa.Ha;
                e.width = a.width;
                e.height = a.height;
                var d = b.insertRow(-1).insertCell(-1);
                var e = d.style;
                e.verticalAlign = "top";
                e.padding = a.padding;
                ub(x);
                e = cb();
                e.style.width = "100%";
                var i = e.insertRow(-1);
                if (R) {
                    F = i.insertCell(-1);
                    F.style.minWidth = "1px";
                    F.style.whiteSpace = "nowrap";
                }
                O = i.insertCell(-1);
                O.className = "gsib_a";
                d.appendChild(e);
                c(b, O);
                if (I.Nc() && V) {
                    T = V.fa();
                    J = i.insertCell(-1);
                    J.appendChild(T);
                }
                a.width = "100%";
                B(d);
                X = d;
            }
        }
        function z() {
            if (da) {
                var a = x.value.length;
                Z = Ga(a);
                Za(x, a);
            }
        }
        function B(a) {
            E.ga(a, "mouseup", function () {
                x.focus();
            });
        }
        function s() {
            E.ga(x, "keydown", D);
            if (Xa || aa.sc) {
                E.ga(x, "keypress", y);
            }
            E.ga(x, "select", ba, 10);
            var a = v;
            var b = function (b) {
                E.ga(x, b, L, 10, a);
            };
            b("mousedown");
            b("keyup");
            b("keypress");
            a = p;
            b("mouseup");
            b("keydown");
            b("focus");
            b("blur");
            b("cut");
            b("paste");
            b("input");
            E.ga(x, "compositionstart", C);
            E.ga(x, "compositionend", C);
        }
        function C(a) {
            a = a.type;
            if (a == "compositionstart") {
                I.Xd(p);
            } else if (a == "compositionend") {
                I.Xd(v);
            }
        }
        function D(a) {
            var b = a.keyCode;
            S = b;
            var e = xb && bb(b) && $.sa();
            var c = b == N.xe;
            var d = b == N.Cd;
            Q = v;
            if (b == N.ye) {
                Q = I.Ef();
            }
            if (c) {
                if ((b = $.va()) && w(b)) {
                    $.ob(a.shiftKey);
                } else {
                    E.defer(function () {
                        $.ob(a.shiftKey);
                    });
                }
            }
            if (e || c || d || Q) {
                a.Ub = p;
            }
        }
        function w(a) {
            return (a = W[a.getType()].gi) && a();
        }
        function y(a) {
            var b = a.keyCode;
            var e = b == N.Cd;
            var c = b == N.ye && Q;
            if (b == N.xe || e || c) {
                a.Ub = p;
            }
        }
        function L(a) {
            if (!ga) {
                var b = a.Na;
                if (!b.indexOf("key") && !a.ctrlKey && !a.altKey && !a.shiftKey && !a.metaKey) {
                    a = a.keyCode;
                    a: if (b != "keypress") {
                        var e = bb(a);
                        var c;
                        if (b == "keydown") {
                            I.Hf(a == 229);
                            if (e) {
                                break a;
                            }
                        } else {
                            c = a != S;
                            S = -1;
                            if (!e || c) {
                                break a;
                            }
                        }
                        switch (a) {
                            case N.Cd:
                                I.zf();
                                break;
                            case N.ng:
                                I.Cf();
                                break;
                            case N.og:
                                I.Df();
                                break;
                            case N.pg:
                                $.Kf();
                                break;
                            case N.mg:
                                I.yf(Z);
                                break;
                            case N.rg:
                                I.xf(Z);
                                break;
                            case N.qg:
                                I.wf(Z);
                        }
                    }
                }
                ba();
                I.Bf(x.value, Z, b);
            }
        }
        function u() {
            E.ga(
                x,
                "focus",
                function () {
                    da = p;
                    I.Af();
                },
                99
            );
            E.ga(
                x,
                "blur",
                function () {
                    da = v;
                    I.Wd();
                },
                99
            );
        }
        function M() {
            if (!ha) {
                ha = window.setInterval(P, aa.tc || 50);
            }
        }
        function U() {
            if (ha) {
                Pa(ha);
                ha = q;
            }
        }
        function P() {
            L({
                Na: "polling"
            });
        }
        function ia() {
            if (wb) {
                jb(x);
            }
        }
        function ba() {
            if (da) {
                var a = $a(x);
                if (a) {
                    Z = a;
                }
            }
        }
        function ja() {
            var a;
            E.Jb(window, "pagehide", function () {
                ga = p;
                a = x.value;
            });
            E.Jb(window, "pageshow", function (b) {
                ga = v;
                if (b.persisted) {
                    I.lc(a);
                }
            });
        }
        var N = Jb;
        var I;
        var $;
        var E;
        var V;
        var W;
        var x;
        var ca;
        var aa;
        var da;
        var ka;
        var ha;
        var Z = Ga(0);
        var S = -1;
        var G = v;
        var O;
        var X;
        var F;
        var J;
        var T;
        var Q;
        var ga;
        var R;
        var Fa;
        var ua;
        var ta = {
            ea: function (a, b) {
                ua = a;
                x = a.Zd();
                Fa = a.kb();
                if (!a.Tc()) {
                    b.addRule(".gsib_a", "width:100%;vertical-align:top;padding:3px 3px 0");
                }
            },
            O: function (a) {
                I = a.get(118, ta);
                E = a.get(117, ta);
                $ = a.get(128, ta);
                V = a.get(173, ta);
                W = vb(a.ja(152, ta));
                ca = a.fb().kc();
            },
            W: function (b) {
                aa = b;
                da = document.activeElement == x;
                ba();
                if (Ya) {
                    E.ga(
                        x,
                        "beforedeactivate",
                        function (a) {
                            if (G) {
                                G = v;
                                a.Ub = p;
                            }
                        },
                        10
                    );
                }
                if (wb) {
                    ja();
                }
                X = x;
                R = !!b.xa[130];
                if (I.Ff() || I.Nc() || R || b.ib) {
                    H();
                }
                x.nfd = p;
                if (b.hb) {
                    E.ga(x, "blur", U, 10);
                    E.ga(x, "focus", M, 10);
                    ka = p;
                }
                E.Qb(8, ia);
                s();
                u();
                a(b);
            },
            activate: a,
            getType: function () {
                return 119;
            },
            H: function () {
                return 4;
            },
            B: function () {
                return {
                    hi: c,
                    Vd: j,
                    ta: g,
                    Ga: f,
                    Fc: d,
                    getHeight: b,
                    getWidth: h,
                    fi: m,
                    vf: n,
                    Yd: k,
                    pc: i,
                    select: r,
                    refresh: l,
                    focus: o,
                    blur: t,
                    Gf: e,
                    clear: A
                };
            },
            $: function () {
                if (ka) {
                    U();
                }
                if (aa.Wa) {
                    E.gg(x, I.Wd);
                }
            }
        };
        return ta;
    });
    K.M(129, 18, function () {
        function a(a) {
            y = a;
            var b = a.mb;
            if (b) {
                ia = Aa(b);
            }
            N.className = a.Dc || "gssb_m";
            W = a.Cc || "gssb_i";
        }
        function c(a, b) {
            if (!N) {
                return v;
            }
            ba = b;
            A();
            var e = v;
            for (var c = 0, d; (d = a[c++]);) {
                if (r(d)) {
                    e = p;
                }
            }
            return e;
        }
        function j(a) {
            return D[a.getType()].Bd(q, a, w);
        }
        function g(a) {
            var b = D[a.getType()];
            if (b && b.md) {
                var e = C.na();
                return b.md(a, e);
            }
            return a.Z();
        }
        function f(a, b) {
            if (!N) {
                return v;
            }
            ba = b;
            A();
            var e = v;
            for (var c = 0, d; (d = a[c++]);) {
                if (d == 1) {
                    if ($) {
                        I.appendChild($);
                    } else {
                        d = o();
                        var i = d.style;
                        i.textAlign = "center";
                        i.whiteSpace = "nowrap";
                        d.dir = ja;
                        i = db();
                        i.style.position = "relative";
                        E = db();
                        E.className = "gssb_g";
                        if (y.eb) {
                            E.style.paddingBottom = "1px";
                        }
                        l(y.Ac, E, 13);
                        if (y.xc) {
                            l(y.Ka, E, 8);
                        } else if (y.yc) {
                            l(y.Bc, E, 14);
                        }
                        i.appendChild(E);
                        d.appendChild(i);
                        $ = d.parentNode;
                    }
                } else if (d == 2) {
                    if (V) {
                        I.appendChild(V);
                    } else {
                        d = o();
                        i = d.style;
                        i.padding = "1px 4px 2px 0";
                        i.fontSize = "11px";
                        i.textAlign = "right";
                        i = Ua("a");
                        i.id = "gssb_b";
                        i.href = "http://www.google.com/support/websearch/bin/answer.py?hl=" + y.wa + "&answer=106230";
                        i.innerHTML = y.zc;
                        d.appendChild(i);
                        V = d.parentNode;
                    }
                } else if (d == 3) {
                    if ((d = U.pop())) {
                        I.appendChild(d);
                    } else {
                        d = N.insertRow(-1);
                        d.Bg = p;
                        d = d.insertCell(-1);
                        i = Ua("div", "gssb_l");
                        d.appendChild(i);
                    }
                } else if (r(d)) {
                    e = p;
                }
            }
            return e;
        }
        function d(a) {
            t(a, W);
            a = {
                index: a,
                ii: B.ha()[a],
                ji: P[a]
            };
            s.Y(10, a);
        }
        function b(a) {
            t(a, "");
            s.Y(11);
        }
        function h() {
            var a;
            var b;
            for (var e; (e = u.pop());) {
                a = e.getType();
                if (!(b = L[a])) {
                    b = L[a] = [];
                }
                b.push(e);
                a = e.fa();
                a.parentNode.removeChild(a);
            }
            while ((a = I.firstChild)) {
                a = I.removeChild(a);
                if (a.Bg) {
                    U.push(a);
                } else if (a != $ && a != V) {
                    M.push(a);
                }
            }
            P = [];
        }
        function m(a) {
            if ((a = P[a])) {
                return a.Sa();
            } else {
                return v;
            }
        }
        function n() {
            A();
        }
        function k() {
            return N;
        }
        function i() {
            if (ia) {
                var a = ja != ba;
                if (!ba || !a) {
                    return ia;
                }
            }
            return q;
        }
        function r(a) {
            var b = a.getType();
            var e = D[b];
            if (!e) {
                return v;
            }
            var c = (b = L[b]) && b.pop();
            if (!c) {
                c = e.yd(w);
            }
            e.ma(a, c);
            u.push(c);
            var b = c.fa();
            var d = o();
            d.className = "gssb_a " + y.Ja;
            d.appendChild(b);
            if (a.Da !== ea) {
                P.push(c);
                var c = ba;
                var i = a.Da();
                b.onmouseover = function () {
                    B.Uf(i);
                };
                b.onmouseout = function () {
                    B.Tf();
                };
                b.onclick = function (b) {
                    C.Lc();
                    if (a.Jc()) {
                        C.lb(a.Z());
                    }
                    B.Qf(i);
                    b = b || window.event;
                    e.zd(b, a, w);
                };
            } else {
                c = ja;
            }
            H(d, c);
            return p;
        }
        function l(a, b, e) {
            var c = Ua("input");
            c.type = "button";
            c.value = Ja(a);
            c.onclick = function () {
                w.search(C.pa(), e);
            };
            var d;
            if (y.wc) {
                a = "lsb";
                d = Ua("span");
                var i = Ua("span");
                d.className = "ds";
                i.className = "lsbb";
                d.appendChild(i);
                i.appendChild(c);
            } else {
                a = "gssb_h";
                d = c;
            }
            c.className = a;
            b.appendChild(d);
        }
        function o() {
            var a = M.pop();
            if (a) {
                I.appendChild(a);
                return a.firstChild;
            }
            a = N.insertRow(-1);
            a = a.insertCell(-1);
            a.className = y.Ja;
            a.onmousedown = e;
            return a;
        }
        function t(a, b) {
            var e = P[a];
            if (e && e.Sa()) {
                e.fa().parentNode.parentNode.className = b;
            }
        }
        function e(a) {
            a = a || window.event;
            if (a.stopPropagation) {
                a.stopPropagation();
            } else if (!Xa) {
                if (Ya) {
                    C.pc();
                }
            }
            return v;
        }
        function A() {
            if (E) {
                var a = y.nb ? y.nb : C.getWidth() - 3;
                if (a > 0) {
                    E.style.width = a + "px";
                }
            }
        }
        function H(a, b) {
            if (a.dir != b) {
                a.dir = b;
                a.style.textAlign = z[b];
            }
        }
        var z = {
            rtl: "right",
            ltr: "left"
        };
        var B;
        var s;
        var C;
        var D;
        var w;
        var y;
        var L = {};
        var u = [];
        var M = [];
        var U = [];
        var P = [];
        var ia;
        var ba;
        var ja;
        var N;
        var I;
        var $;
        var E;
        var V;
        var W;
        var x = {
            ea: function (a, b) {
                ja = a.kb();
                b.addRule(".gssb_a", "padding:0 7px");
                b.addRule(".gssb_a,.gssb_a td", "white-space:nowrap;overflow:hidden;line-height:22px");
                b.addRule("#gssb_b", "font-size:11px;color:#36c;text-decoration:none");
                b.addRule("#gssb_b:hover", "font-size:11px;color:#36c;text-decoration:underline");
                b.addRule(".gssb_m", "color:#000;background:#fff");
                b.addRule(".gssb_g", "text-align:center;padding:8px 0 7px;position:relative");
                b.addRule(
                    ".gssb_h",
                    ["font-size:15px;height:28px;margin:0.2em", xb ? ";-webkit-appearance:button" : ""].join("")
                );
                b.addRule(".gssb_i", "background:#eee");
                b.addRule(".gss_ifl", "visibility:hidden;padding-left:5px");
                b.addRule(".gssb_i .gss_ifl", "visibility:visible");
                b.addRule("a.gssb_j", "font-size:13px;color:#36c;text-decoration:none;line-height:100%");
                b.addRule("a.gssb_j:hover", "text-decoration:underline");
                b.addRule(".gssb_l", "height:1px;background-color:#e5e5e5");
            },
            O: function (a) {
                B = a.get(128, x);
                s = a.get(117, x);
                C = a.get(118, x);
                w = a.get(121, x);
                D = vb(a.ja(152, x));
            },
            W: function (b) {
                y = b;
                N = cb();
                var e = Ua("tbody");
                N.appendChild(e);
                I = N.getElementsByTagName("tbody")[0];
                a(b);
            },
            activate: a,
            getType: function () {
                return 129;
            },
            H: function () {
                return 18;
            },
            B: function () {
                return {
                    Sf: c,
                    md: g,
                    ob: j,
                    ma: f,
                    Rf: d,
                    Ob: b,
                    clear: h,
                    Sa: m,
                    Lb: n,
                    fa: k,
                    Uc: i
                };
            }
        };
        return x;
    });
    K.M(116, 8, function () {
        function a(a) {
            l = a;
            o.style.position = a.Oa;
        }
        function c(a) {
            if (a != C) {
                C = a;
                a = a.fa();
                if (D) {
                    if (a != D) {
                        z.replaceChild(a, D);
                    }
                } else {
                    z.appendChild(a);
                }
                D = a;
            }
        }
        function j() {
            if (!B) {
                B = z ? Math.max(z.offsetHeight, 0) : 0;
            }
            return B;
        }
        function g(a) {
            if (a != H) {
                var b = A.style;
                if (a) {
                    b.width = a + "px";
                    if (wb && a > 0) {
                        b.paddingLeft = "1px";
                    }
                    e.appendChild(A);
                    z.style.width = "";
                } else {
                    e.removeChild(A);
                    b.paddingLeft = "";
                    z.style.width = "100%";
                }
                H = a;
            }
        }
        function f(a) {
            t = a;
            var b = o;
            if (b.dir != a) {
                b.dir = a;
                b.style.textAlign = k[a];
            }
        }
        function d() {
            h();
            n(o, p);
            n(s, p);
        }
        function b() {
            B = 0;
            n(o, v);
            n(s, v);
            r.Y(12);
        }
        function h() {
            B = 0;
            m();
            if (s) {
                var a = l.rb[0];
                var b = s.style;
                if (l.Oa != "relative") {
                    b.top = o.style.top;
                    b.left = o.offsetLeft + e.offsetWidth + "px";
                }
                s.style.height = Math.max(o.offsetHeight + a, 0) + "px";
                a = z.offsetWidth;
                if (a > 0) {
                    s.style.width = a + "px";
                }
            }
            if (C) {
                C.Lb();
            }
        }
        function m() {
            var a = l.Oa == "relative";
            var b = i.Fc();
            var e = l.sb;
            var c = e[0];
            var d = w != t;
            var f = e[d ? 4 : 1];
            if (t == "rtl") {
                f += e[5];
            }
            var h = o.style;
            if (!a) {
                h.top = b.Bh + i.getHeight() + c + "px";
            }
            var k;
            var g;
            if (C) {
                g = C.Uc();
            }
            if (g) {
                b = ab(g);
                k = g.offsetWidth;
                if (Xa) {
                    ++f;
                }
            }
            if (!k) {
                k = i.getWidth();
            }
            if (!a) {
                h.left = b.zh + f + "px";
            }
            k += e[d ? 3 : 2];
            if (H) {
                h.width = "";
            } else if (k > 0) {
                o.style.width = k + "px";
            }
            if (Sa) {
                h.zoom = "normal";
                h.zoom = 1;
            }
        }
        function n(a, b) {
            if (a) {
                a.style.display = b ? "" : "none";
            }
        }
        var k = {
            rtl: "right",
            ltr: "left"
        };
        var i;
        var r;
        var l;
        var o;
        var t;
        var e;
        var A;
        var H;
        var z;
        var B;
        var s;
        var C;
        var D;
        var w;
        var y = {
            ea: function (a, b) {
                w = a.kb();
                b.addRule(".gssb_c", "border:0;position:absolute;z-index:989");
                b.addRule(
                    ".gssb_e",
                    [
                        "border:1px solid #ccc;border-top-color:#d9d9d9;",
                        b.prefix("box-shadow:0 2px 4px rgba(0,0,0,0.2);")
                    ].join("")
                );
                b.addRule(".gssb_f", "visibility:hidden;white-space:nowrap");
                b.addRule(".gssb_k", "border:0;display:block;position:absolute;top:0;z-index:988");
            },
            O: function (a) {
                a.get(115, y);
                i = a.get(118, y);
                r = a.get(117, y);
            },
            W: function (b) {
                l = b;
                H = 0;
                o = cb();
                o.className = "gssb_c";
                n(o, v);
                var c = o.insertRow(-1);
                e = c.insertCell(-1);
                e.className = "gssb_f";
                A = db();
                z = c.insertCell(-1);
                z.className = "gssb_e";
                z.style.width = "100%";
                if (l.tb) {
                    s = Ua("iframe", "gssb_k");
                    n(s, v);
                    (l.yb || document.body).appendChild(s);
                }
                m();
                (b.yb || document.body).appendChild(o);
                r.Qb(8, h);
                a(b);
            },
            activate: a,
            getType: function () {
                return 116;
            },
            H: function () {
                return 8;
            },
            B: function () {
                return {
                    setPanel: c,
                    getHeight: j,
                    Tb: g,
                    ta: f,
                    show: d,
                    Sb: b,
                    Lb: h
                };
            }
        };
        return y;
    });
    K.M(133, 21, function () {
        function a(a) {
            h(a);
            if (i) {
                for (var b = 0; b < i.length; ++b) {
                    i[b].update(a);
                }
            }
        }
        function c(a) {
            var b = k[a.hf()] || q;
            var c = v;
            if (b) {
                ++r;
                c = p;
            } else if (i) {
                for (var d = 0; d < i.length; ++d) {
                    if ((b = i[d].get(a))) {
                        h(b);
                        ++l;
                        break;
                    }
                }
            }
            if (b) {
                d = a.ia();
                if (d != b.ia()) {
                    b = Ob(a, d, b.ha(), b.Gd(), b.ze(), b.Vb(), c, b.ef());
                } else if (c) {
                    b.Ae();
                }
            }
            return b;
        }
        function j() {
            return r;
        }
        function g() {
            return l;
        }
        function f() {
            l = r = 0;
        }
        function d(a) {
            var b;
            var c;
            var d;
            var i;
            for (i in k) {
                b = k[i];
                b = b.ha();
                for (d = 0; (c = b[d++]);) {
                    if (c.getType() == a) {
                        delete k[i];
                        break;
                    }
                }
            }
            m();
        }
        function b() {
            k = {};
            m();
        }
        function h(a) {
            if (a && a.Vb()) {
                k[a.qa().hf()] = a;
            }
        }
        function m() {
            if (i) {
                for (var a = 0; a < i.length; ++a) {
                    i[a].reset();
                }
            }
        }
        function n(a, b) {
            return b.la() - a.la();
        }
        var k = {};
        var i;
        var r;
        var l;
        var o = {
            O: function (a) {
                i = a.ja(151, o);
            },
            W: function () {
                i.sort(n);
                f();
            },
            activate: function () {
                f();
            },
            getType: function () {
                return 133;
            },
            H: function () {
                return 21;
            },
            B: function () {
                return {
                    put: a,
                    get: c,
                    wd: j,
                    xd: g,
                    za: f,
                    Dg: d,
                    Cg: b
                };
            }
        };
        return o;
    });
    K.M(159, 190, function () {
        function a() {
            k = p;
            if (h && b.Pf()) {
                n.Od(h);
            }
        }
        function c() {
            if (k) {
                m.Od(h);
            }
        }
        function j() {
            if (k) {
                m.fc(h);
            }
        }
        function g() {
            if (k) {
                n.Od(h);
            }
        }
        function f() {
            if (k) {
                n.fc(h);
            }
        }
        var d;
        var b;
        var h;
        var m;
        var n;
        var k = v;
        var i = {
            ea: function (a, b) {
                var c = function (a) {
                    return ["box-shadow:", a, "-moz-box-shadow:", a, "-webkit-box-shadow:", a].join("");
                };
                b.addRule(
                    ".gsfe_a",
                    [
                        "border:1px solid #b9b9b9;border-top-color:#a0a0a0;",
                        c("inset 0px 1px 2px rgba(0,0,0,0.1);")
                    ].join("")
                );
                b.addRule(
                    ".gsfe_b",
                    ["border:1px solid #4d90fe;outline:none;", c("inset 0px 1px 2px rgba(0,0,0,0.3);")].join("")
                );
            },
            O: function (a) {
                d = a.get(117, i);
                b = a.get(118, i);
            },
            W: function (b) {
                if ((h = Aa(b.Db))) {
                    d.Qb(13, g);
                    d.Qb(14, f);
                    d.ga(h, "mouseover", c);
                    d.ga(h, "mouseout", j);
                    m = Sb(b.Zc || "gsfe_a");
                    n = Sb(b.Yc || "gsfe_b");
                }
                a();
            },
            activate: a,
            getType: function () {
                return 159;
            },
            H: function () {
                return 190;
            },
            $: function () {
                k = v;
                if (h) {
                    m.fc(h);
                    n.fc(h);
                }
            }
        };
        return i;
    });
    function Sb(a) {
        var c = RegExp("(?:^|\\s+)" + a + "(?:$|\\s+)");
        return {
            Od: function (j) {
                if (j && !c.test(j.className)) {
                    j.className += " " + a;
                }
            },
            fc: function (a) {
                if (a) {
                    a.className = a.className.replace(c, " ");
                }
            }
        };
    }
    K.uf(191, 192, function () {
        function a(a) {
            var a = g(a);
            var b = "";
            if (a) {
                for (var c = a.length, d = 0, f = 0, e = 0; c--;) {
                    f <<= 8;
                    f |= a[e++];
                    for (d += 8; d >= 6;) {
                        var k = (f >> (d - 6)) & 63;
                        var b = b + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(k);
                        var d = d - 6;
                    }
                }
                if (d) {
                    b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(
                        ((f << 8) >> (d + 8 - 6)) & 63
                    );
                }
            }
            return b;
        }
        function c(a) {
            var b = [];
            if (a) {
                var c = 0;
                var d = 0;
                for (var f = 0; f < a.length; ++f) {
                    var e = a.charCodeAt(f);
                    if (e < 32 || e > 127 || !m[e - 32]) {
                        return [];
                    }
                    c <<= 6;
                    c |= m[e - 32] - 1;
                    d += 6;
                    if (d >= 8) {
                        b.push((c >> (d - 8)) & 255);
                        d -= 8;
                    }
                }
            }
            return b;
        }
        function j(a, c) {
            var l = {};
            l.X = Array(4);
            l.buffer = Array(4);
            l.Nh = Array(4);
            l.padding = Array(64);
            l.padding[0] = 128;
            for (var k = 1; k < 64; ++k) {
                l.padding[k] = 0;
            }
            f(l);
            var k = Array(64);
            var g;
            if (c.length > 64) {
                f(l);
                b(l, c);
                g = h(l);
            } else {
                g = c;
            }
            for (var e = 0; e < g.length; ++e) {
                k[e] = g[e] ^ 92;
            }
            for (e = g.length; e < 64; ++e) {
                k[e] = 92;
            }
            f(l);
            for (e = 0; e < 64; ++e) {
                l.buffer[e] = k[e] ^ 106;
            }
            d(l, l.buffer);
            l.total = 64;
            b(l, a);
            g = h(l);
            f(l);
            d(l, k);
            l.total = 64;
            b(l, g);
            return h(l);
        }
        function g(a) {
            if (typeof a == "string") {
                var b = Array(a.length);
                for (var c = 0; c < a.length; ++c) {
                    b[c] = a.charCodeAt(c);
                }
                return b;
            }
            return a;
        }
        function f(a) {
            a.X[0] = 1732584193;
            a.X[1] = 4023233417;
            a.X[2] = 2562383102;
            a.X[3] = 271733878;
            a.gc = a.total = 0;
        }
        function d(a, b) {
            var c = a.Nh;
            for (var d = 0; d < 64; d += 4) {
                c[d / 4] = b[d] | (b[d + 1] << 8) | (b[d + 2] << 16) | (b[d + 3] << 24);
            }
            var d = a.X[0];
            var f = a.X[1];
            var e = a.X[2];
            var g = a.X[3];
            var h;
            var j;
            var m;
            for (var s = 0; s < 64; ++s) {
                if (s < 16) {
                    h = g ^ (f & (e ^ g));
                    j = s;
                } else if (s < 32) {
                    h = e ^ (g & (f ^ e));
                    j = (s * 5 + 1) & 15;
                } else if (s < 48) {
                    h = f ^ e ^ g;
                    j = (s * 3 + 5) & 15;
                } else {
                    h = e ^ (f | ~g);
                    j = (s * 7) & 15;
                }
                m = g;
                g = e;
                e = f;
                f =
                    (f +
                        (((((d + h + k[s] + c[j]) & -1) << n[s]) | (((d + h + k[s] + c[j]) & -1) >>> (32 - n[s]))) &
                            -1)) &
                    -1;
                d = m;
            }
            a.X[0] = (a.X[0] + d) & -1;
            a.X[1] = (a.X[1] + f) & -1;
            a.X[2] = (a.X[2] + e) & -1;
            a.X[3] = (a.X[3] + g) & -1;
        }
        function b(a, b, c) {
            b = g(b);
            if (!c) {
                c = b.length;
            }
            a.total += c;
            for (var f = 0; f < c; ++f) {
                a.buffer[a.gc++] = b[f];
                if (a.gc == 64) {
                    d(a, a.buffer);
                    a.gc = 0;
                }
            }
        }
        function h(a) {
            var c = Array(16);
            var f = a.total * 8;
            var k = a.gc;
            b(a, a.padding, k < 56 ? 56 - k : 64 - (k - 56));
            for (var g = 56; g < 64; ++g) {
                a.buffer[g] = f & 255;
                f >>>= 8;
            }
            d(a, a.buffer);
            for (g = k = 0; g < 4; ++g) {
                for (f = 0; f < 32; f += 8) {
                    c[k++] = (a.X[g] >> f) & 255;
                }
            }
            return c;
        }
        var m = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 63, 0, 0, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 0, 0, 0, 0, 0, 0,
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 0, 0, 0,
            0, 64, 0, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
            51, 52, 0, 0, 0, 0, 0
        ];
        var n = [
            7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9,
            14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15,
            21, 6, 10, 15, 21
        ];
        var k = [
            3614090360, 3905402710, 606105819, 3250441966, 4118548399, 1200080426, 2821735955, 4249261313, 1770035416,
            2336552879, 4294925233, 2304563134, 1804603682, 4254626195, 2792965006, 1236535329, 4129170786, 3225465664,
            643717713, 3921069994, 3593408605, 38016083, 3634488961, 3889429448, 568446438, 3275163606, 4107603335,
            1163531501, 2850285829, 4243563512, 1735328473, 2368359562, 4294588738, 2272392833, 1839030562, 4259657740,
            2763975236, 1272893353, 4139469664, 3200236656, 681279174, 3936430074, 3572445317, 76029189, 3654602809,
            3873151461, 530742520, 3299628645, 4096336452, 1126891415, 2878612391, 4237533241, 1700485571, 2399980690,
            4293915773, 2240044497, 1873313359, 4264355552, 2734768916, 1309151649, 4149444226, 3174756917, 718787259,
            3951481745
        ];
        return {
            getType: function () {
                return 191;
            },
            H: function () {
                return 192;
            },
            B: function () {
                return {
                    nf: a,
                    Hh: c,
                    Ih: j
                };
            }
        };
    });
    function Tb(a, c, j, g, f, d, b, h) {
        function m(a) {
            B = p;
            c.Dh(A, n);
            return pb(a);
        }
        function n() {
            if (B) {
                j.Jg(35);
                a.vh();
                k.onmouseover = k.onmouseout = k.onclick = q;
                i.style.display = "none";
                r.style.display = "";
                if (f.ig() == H) {
                    g.Rd();
                }
                if (f.hg() == H) {
                    f.jg();
                    g.Zf();
                }
                z = v;
            }
        }
        var k;
        var i;
        var r;
        var l;
        var o;
        var t;
        var e;
        var A;
        var H;
        var z = p;
        var B = v;
        (function () {
            k = db();
            var a = cb();
            k.appendChild(a);
            i = a.insertRow(-1);
            var c = i.insertCell(-1);
            l = Ua("span");
            c.appendChild(l);
            if (b != 0) {
                t = Ua("a");
                t.href = "#ps";
                t.className = "gspqs_a gssb_j";
                var d = i.insertCell(-1);
                d.appendChild(t);
                (b == 2 ? d : c).style.width = "100%";
                r = a.insertRow(-1);
                e = r.insertCell(-1);
                e.className = "gspqs_b";
                e.innerHTML = h;
                e.colSpan = "2";
            }
        })();
        return {
            fa: function () {
                return k;
            },
            getType: function () {
                return 35;
            },
            Sa: function () {
                return z;
            },
            ma: function (a, e, c, f, k, h) {
                B = v;
                z = p;
                A = e;
                H = c;
                i.style.display = "";
                l.innerHTML = a;
                if (k) {
                    l.style.color = "#52188c";
                }
                if (b != 0) {
                    r.style.display = "none";
                    t.innerHTML = f;
                    t.onclick = m;
                }
                if (h && !o) {
                    o = rb(i);
                    o.onclick = function (a) {
                        g.Lc();
                        g.lb(A);
                        d.search(A, 9);
                        return pb(a);
                    };
                }
                if (h) {
                    o.innerHTML = h + " &raquo;";
                    o.style.display = "";
                } else if (o) {
                    o.style.display = "none";
                }
            }
        };
    }
    K.M(152, 33, function () {
        function a(a) {
            i = a.Pc;
            r = a.wb;
            l = a.vb;
            o = a.ub;
            t = a.Ab ? a.Ka : "";
        }
        function c(a) {
            return Tb(b, h, m, n, k, a, i, l);
        }
        function j(a, b) {
            b.ma(a.Kd(), a.Z(), a.Da(), r, o, t);
        }
        function g(a, b, e) {
            e.search(b.Z(), 1);
        }
        function f() {
            return "p";
        }
        function d() {
            return 35;
        }
        var b;
        var h;
        var m;
        var n;
        var k;
        var i;
        var r;
        var l;
        var o;
        var t;
        var e = {
            ea: function (a, b) {
                b.addRule("a.gspqs_a", "padding:0 3px 0 8px");
                b.addRule(".gspqs_b", "color:#666;line-height:22px");
            },
            O: function (a) {
                m = a.get(123, e);
                n = a.get(118, e);
                h = a.get(189, e);
                b = a.get(127, e);
                k = a.get(128, e);
            },
            W: a,
            activate: a,
            getType: function () {
                return 152;
            },
            H: function () {
                return 33;
            },
            B: function () {
                return {
                    yd: c,
                    ma: j,
                    zd: g,
                    Bd: ya,
                    Fd: f,
                    Ld: d
                };
            }
        };
        return e;
    });
    K.M(189, 188, function () {
        function a(a) {
            b = document.location.protocol == "https:" || a.Eb;
            d = a.ya;
            a = !!a.oa[35];
            h = !!f && !!d && !!a;
            m = !b;
            if (h && m) {
                f.mf();
            }
        }
        function c(a) {
            var c = {};
            if (h) {
                if (b) {
                    c.tok = d;
                } else if (r && k) {
                    var e = r.nf(a);
                    var g = r.Hh(k);
                    var a = r.Ih(a, g);
                    var a = r.nf(a);
                    c.qe = e;
                    c.qesig = a;
                    c.pkc = i;
                    if (h && m && n && pa() - n > 82800000) {
                        f.mf();
                    }
                }
            }
            return c;
        }
        function j(a, b) {
            f.Eh(a, b);
        }
        function g(a) {
            k = a.websafe_signing_key;
            i = a.pkc;
            n = pa();
        }
        var f;
        var d;
        var b;
        var h;
        var m;
        var n;
        var k;
        var i;
        var r;
        var l = {
            O: function (a) {
                f = a.get(134, l);
                r = a.get(191, l);
            },
            W: a,
            activate: a,
            getType: function () {
                return 189;
            },
            H: function () {
                return 188;
            },
            B: function () {
                return {
                    Gh: c,
                    Dh: j,
                    Fh: g
                };
            }
        };
        return l;
    });
    K.M(134, 186, function () {
        function a(a) {
            k = a.ya;
            i = a.Ra;
            r = a.ua;
        }
        function c() {
            var a = [];
            Ea("callback", "google.sbox.hi" + n, a);
            g("https://clients1.google.com/complete/init?", a);
        }
        function j(a, b) {
            o[a] = b;
            var c = [];
            Ea("delq", a, c);
            Ea("client", r, c);
            Ea("callback", "google.sbox.d" + n, c);
            g("https://clients1.google.com/complete/deleteitems?", c);
        }
        function g(a, b) {
            Ea("tok", k, b);
            if (i) {
                Ea("authuser", i, b);
            }
            l = Ua("script");
            l.src = a + b.join("&");
            h.appendChild(l);
        }
        function f() {
            if (l) {
                h.removeChild(l);
                l = q;
            }
        }
        function d(a) {
            f();
            m.Fh(a);
        }
        function b(a) {
            f();
            var a = a[0];
            var b = o[a];
            if (b) {
                delete o[a];
                b();
            }
        }
        var h = Qa();
        var m;
        var n;
        var k;
        var i;
        var r;
        var l;
        var o = {};
        var t = {
            O: function (a) {
                m = a.get(189, t);
                n = a.fb().getId();
            },
            W: function (c) {
                var f = window.google.sbox;
                f["hi" + n] = d;
                f["d" + n] = b;
                a(c);
            },
            activate: a,
            getType: function () {
                return 134;
            },
            H: function () {
                return 186;
            },
            B: function () {
                return {
                    mf: c,
                    Eh: j
                };
            },
            $: function () {
                f();
            }
        };
        return t;
    });
    K.M(156, 187, function () {
        function a(a) {
            var c = j.Gh(a.ia());
            var b;
            for (b in c) {
                a.setParameter(b, c[b]);
            }
            return v;
        }
        function c() {
            return 13;
        }
        var j;
        var g = {
            O: function (a) {
                j = a.get(189, g);
            },
            getType: function () {
                return 156;
            },
            H: function () {
                return 187;
            },
            B: function () {
                return {
                    eg: a,
                    la: c
                };
            }
        };
        return g;
    });
    function Ub(a) {
        function c() {
            return Vb(g, a);
        }
        function j() {
            return 501;
        }
        var g;
        var f = {
            ea: function (a, b) {
                b.addRule(".gscl_a", "font-size:10px;color:#03c;text-decoration:underline;white-space:nowrap");
            },
            O: function (a) {
                g = a.get(128, f);
            },
            getType: function () {
                return 152;
            },
            H: function () {
                return 92;
            },
            B: function () {
                return {
                    yd: c,
                    ma: ya,
                    zd: ya,
                    Bd: ya,
                    Fd: ya,
                    Ld: j
                };
            }
        };
        return f;
    }
    function Vb(a, c) {
        var j;
        var g = {
            getType: function () {
                return 501;
            },
            fa: function () {
                return j;
            },
            ma: ya
        };
        (function () {
            var f = cb();
            var d = f.insertRow(-1);
            d.insertCell(-1).style.width = "100%";
            d = d.insertCell(-1);
            d = gb(c, d);
            d.className = "gscl_a";
            d.onclick = function () {
                a.qc(v);
            };
            j = db();
            j.appendChild(f);
        })();
        return g;
    }
    K.M(153, 91, function () {
        function a() {
            return 2;
        }
        function c(a, c, f) {
            f.push({
                getType: function () {
                    return 501;
                },
                position: 1
            });
        }
        return {
            getType: function () {
                return 153;
            },
            H: function () {
                return 91;
            },
            B: function () {
                return {
                    la: a,
                    getMessage: c
                };
            }
        };
    });
    K.M(151, 97, function () {
        function a(a) {
            l = a;
            h = !(33 in a.oa);
        }
        function c() {
            return 2;
        }
        function j(a) {
            if (h) {
                var c = a.ha();
                if (!(c.length >= l.qb)) {
                    var f = a.qa().ka();
                    if (c.length) {
                        for (var i = 0, k; (k = c[i]); ++i) {
                            if (!m[k.getType()]) {
                                return;
                            }
                            k = k.Z();
                            if (!Oa(k, f, p)) {
                                return;
                            }
                        }
                        d(a);
                    } else if (!l.Oc && !b.test(f)) {
                        d(a);
                    }
                }
            }
        }
        function g(a) {
            if (h) {
                var b;
                var c = a.ka();
                var d = Math.min(c.length, i);
                if (d >= k) {
                    var f;
                    for (; d > 0; --d) {
                        if ((b = n[d])) {
                            f = c.substring(0, d);
                            if ((b = b[f])) {
                                c = b;
                                d = c.ha();
                                if (d.length) {
                                    b = a.ia();
                                    f = b.toLowerCase();
                                    var g = a.ka();
                                    var j = c.Gd();
                                    var m = l.Ca || !c.vd("k");
                                    var o = [];
                                    for (var w = ea, y = ea, L = 0, u = 0, M = ea; (M = d[u++]);) {
                                        y = M.Z();
                                        if (Oa(y, g, p)) {
                                            w = m ? r.bold(f, y) : Ia(y);
                                            o.push(Pb(w, y, L++, M.getType(), M.Ta(), M.Pb()));
                                        }
                                    }
                                    a = Ob(a, b, o, j, p, c.Vb(), p, v);
                                } else {
                                    a = c;
                                }
                                return a;
                            }
                        }
                    }
                }
            }
            return q;
        }
        function f() {
            n = {};
            k = Number.MAX_VALUE;
            i = 0;
        }
        function d(a) {
            var b = a.qa().ka();
            var c = b.length;
            if (c < k) {
                k = c;
            }
            if (c > i) {
                i = c;
            }
            var d = n[c];
            if (!d) {
                d = n[c] = {};
            }
            d[b] = a;
        }
        var b = /^[!"#$%'()*,\/:;<=>?[\\\]^`{|}~]+$/;
        var h = p;
        var m;
        var n;
        var k;
        var i;
        var r;
        var l;
        var o = {
            O: function (a) {
                r = a.get(150, o);
            },
            W: function (b) {
                m = fa([0]);
                f();
                a(b);
            },
            activate: a,
            getType: function () {
                return 151;
            },
            H: function () {
                return 97;
            },
            B: function () {
                return {
                    la: c,
                    update: j,
                    get: g,
                    reset: f
                };
            },
            $: function () {
                h = v;
            }
        };
        return o;
    });
    K.M(151, 98, function () {
        function a(a) {
            m = a.Ca;
        }
        function c() {
            return 3;
        }
        function j(a) {
            var c = a.qa();
            var f = a.ha();
            if (f.length) {
                var g = c.ka();
                var c = Number.MAX_VALUE;
                a: for (var h, j = 0; (h = f[j++]);) {
                    if (!d[h.getType()]) {
                        c = -1;
                        break a;
                    }
                    h = h.Z();
                    c = Math.min(h.length, c);
                }
                if (c != -1) {
                    var e = f[0].Z();
                    if (Oa(e, g, p)) {
                        for (j = g.length + 1; j <= c;) {
                            g = q;
                            for (h = 0; (e = f[h++]);) {
                                e = e.Z();
                                if (j > e.length) {
                                    return;
                                }
                                e = e.substr(0, j);
                                if (g) {
                                    if (g != e) {
                                        return;
                                    }
                                } else {
                                    g = e;
                                }
                            }
                            b[g] = a;
                            ++j;
                        }
                    }
                }
            }
        }
        function g(a) {
            var c = b[a.ka()];
            if (c) {
                var d = a.gf();
                var f = a.ka();
                c.qa().ka();
                var g = c.Gd();
                var j = m || !c.vd("k");
                var e = [];
                var n;
                var H;
                for (var z = c.ha(), B = 0, s; (s = z[B++]);) {
                    H = s.Z();
                    n = j ? h.bold(d, H) : Ia(H);
                    e.push(Pb(n, H, s.Da(), s.getType(), s.Ta(), s.Pb()));
                }
                delete b[f];
                a = Ob(a, a.ia(), e, g, p, c.Vb(), p, v);
            } else {
                a = q;
            }
            return a;
        }
        function f() {
            b = {};
        }
        var d;
        var b = {};
        var h;
        var m;
        var n = {
            O: function (a) {
                h = a.get(150, n);
            },
            W: function (b) {
                d = fa([0]);
                a(b);
            },
            activate: a,
            getType: function () {
                return 151;
            },
            H: function () {
                return 98;
            },
            B: function () {
                return {
                    la: c,
                    update: j,
                    get: g,
                    reset: f
                };
            }
        };
        return n;
    });
    function Wb(a, c) {
        var j;
        var g;
        var f;
        var d;
        var b;
        (function () {
            j = db();
            j.className = "gsq_a";
            var a = cb();
            j.appendChild(a);
            g = a.insertRow(-1);
            a = g.insertCell(-1);
            a.style.width = "100%";
            f = Ua("span");
            a.appendChild(f);
        })();
        return {
            fa: function () {
                return j;
            },
            getType: function () {
                return 0;
            },
            Sa: function () {
                return p;
            },
            ma: function (h, j, n) {
                f.innerHTML = h;
                b = j;
                if (n && !d) {
                    d = rb(g);
                    d.onclick = function (d) {
                        a.Lc();
                        a.lb(b);
                        c.search(b, 9);
                        return pb(d);
                    };
                }
                if (n) {
                    d.innerHTML = n + " &raquo;";
                    d.style.display = "";
                } else if (d) {
                    d.style.display = "none";
                }
            }
        };
    }
    K.M(152, 20, function () {
        function a(a) {
            h = a.Ab ? a.Ka : "";
        }
        function c(a) {
            return Wb(b, a);
        }
        function j(a, b) {
            b.ma(a.Kd(), a.Z(), h);
        }
        function g(a, b, c) {
            c.search(b.Z(), 1);
        }
        function f() {
            return "g";
        }
        function d() {
            return 0;
        }
        var b;
        var h;
        var m = {
            ea: function (a, b) {
                b.addRule(".gsq_a", "padding:0");
            },
            O: function (a) {
                b = a.get(118, m);
            },
            W: a,
            activate: a,
            getType: function () {
                return 152;
            },
            H: function () {
                return 20;
            },
            B: function () {
                return {
                    yd: c,
                    ma: j,
                    zd: g,
                    Bd: ya,
                    Fd: f,
                    Ld: d
                };
            }
        };
        return m;
    });
    K.M(160, 78, function () {
        function a() {
            return d;
        }
        function c() {
            return 1;
        }
        function j() {
            return k;
        }
        function g() {
            var a = document.createElement("script");
            a.src = ["//www.google.com/textinputassistant/", n, "/", m, "_tia.js"].join("");
            document.body.appendChild(a);
            k.onclick = f;
        }
        function f(a) {
            if (b.onclick) {
                b.onclick(a);
            }
        }
        var d;
        var b;
        var h;
        var m;
        var n;
        var k;
        var i;
        return {
            ea: function (a, b) {
                i = a;
                if (!a.Tc()) {
                    b.addRule(
                        ".gsok_a",
                        "background:url(data:image/gif;base64,R0lGODlhEwALAKECAAAAABISEv///////yH5BAEKAAIALAAAAAATAAsAAAIdDI6pZ+suQJyy0ocV3bbm33EcCArmiUYk1qxAUAAAOw==) no-repeat center;cursor:pointer;display:inline-block;height:11px;line-height:0;margin:0 3px;width:19px"
                    );
                }
            },
            W: function (a) {
                d = !!a.Aa;
                h = a.Fb;
                m = a.Ba;
                n = a.Gb;
                if ((k = i.get("gs_ok"))) {
                    b = k.firstChild;
                } else {
                    b = Ua("img");
                    b.style.visibility = "hidden";
                    b.setAttribute("tia_field_name", i.Zd().name);
                    b.setAttribute("tia_disable_swap", p);
                    b.src = h + "/tia.png";
                    k = db("gsok_a gsst_e");
                    k.appendChild(b);
                }
                k.onclick = g;
            },
            getType: function () {
                return 160;
            },
            H: function () {
                return 78;
            },
            B: function () {
                return {
                    isEnabled: a,
                    la: c,
                    fa: j
                };
            }
        };
    });
    K.M(173, 174, function () {
        function a(a) {
            h.dir = a;
        }
        function c() {
            return h;
        }
        function j(a, b) {
            return b.la() - a.la();
        }
        function g(a, b) {
            var c = db(b);
            a.insertCell(-1).appendChild(c);
        }
        var f;
        var d;
        var b;
        var h;
        var m;
        var n = {
            ea: function (a, b) {
                m = a;
                if (!a.Tc()) {
                    b.addRule(".gsst_a", "display:block;padding-top:2px");
                    b.addRule(".gsst_a:hover", "text-decoration:none!important");
                    b.addRule(".gsst_b", "width:3px");
                    b.addRule(".gsst_c", "width:1px");
                    b.addRule(".gsst_d", "width:7px");
                    b.addRule(".gsst_e", "filter:alpha(opacity=55);opacity:0.55");
                    b.addRule(".gsst_a:hover .gsst_e", "filter:alpha(opacity=72);opacity:0.72");
                    b.addRule(".gsst_a:active .gsst_e", "filter:alpha(opacity=100);opacity:1");
                }
            },
            O: function (a) {
                f = a.get(117, n);
                d = a.get(118, n);
                b = a.ja(160, n);
            },
            W: function () {
                h = m.get("gs_st");
                if (!h) {
                    b.sort(j);
                    h = cb();
                    var a = h.insertRow(-1);
                    g(a, "gsst_b");
                    for (var c = 0, n, l = 0; (n = b[c++]);) {
                        if (n.isEnabled()) {
                            if (l++) {
                                g(a, "gsst_c");
                            }
                            var o = Ua("a", "gsst_a");
                            o.appendChild(n.fa());
                            a.insertCell(-1).appendChild(o);
                        }
                    }
                    g(a, "gsst_d");
                    f.defer(function () {
                        h.style.height = d.getHeight() + "px";
                    });
                }
            },
            getType: function () {
                return 173;
            },
            H: function () {
                return 174;
            },
            B: function () {
                return {
                    ta: a,
                    fa: c
                };
            }
        };
        return n;
    });
    Ab = function () {
        var a = window.navigator.userAgent;
        var c = function (c) {
            return a.indexOf(c) >= 0;
        };
        var j = {};
        if (window.opera) {
            j[2] = p;
        } else if (c("MSIE")) {
            j[0] = p;
        } else if (c("WebKit")) {
            j[5] = p;
            if (c("Chrome")) {
                j[3] = p;
            } else if (c("Android")) {
                j[7] = p;
            } else if (c("Safari")) {
                j[4] = p;
            }
            if (c("iPad")) {
                j[6] = p;
            }
        } else if (c("Gecko")) {
            j[1] = p;
        }
        return j;
    };
    function Xb() {
        function a(a) {
            return {
                api: a,
                Ig: a.a,
                activate: a.b,
                $: a.c,
                ui: a.d,
                Fg: a.e,
                na: a.f,
                pa: a.g,
                sa: a.h,
                Fa: a.i,
                Hg: a.j,
                wi: a.k,
                yi: a.l,
                xi: a.m,
                Gg: a.n,
                zb: a.o,
                si: a.p,
                Ud: a.q,
                ti: a.r,
                qi: a.s,
                Mb: a.t,
                Td: a.u,
                focus: a.v,
                blur: a.w,
                be: a.x,
                Ia: a.y,
                lc: a.z,
                ee: a.aa,
                za: a.ab,
                search: a.ad,
                zi: a.ae,
                Bi: a.af,
                gb: a.ag,
                va: a.ah,
                Ci: a.ai,
                Sd: a.al,
                $d: a.am,
                th: a.an,
                ve: a.ao,
                sh: a.ap,
                vi: a.aq,
                kc: a.ar,
                getId: a.as,
                ri: a.at,
                Kc: a.au,
                Ai: a.av
            };
        }
        return {
            getInstance: function (c, j, g) {
                try {
                    var f = window.google.sbox(c, j, g);
                    return a(f);
                } catch (d) {
                    return q;
                }
            },
            translate: function (c) {
                return a(c.api || c);
            }
        };
    }
    if (!window.google) {
        window.google = {};
    }
    window.google.sbox = function (a, c, j) {
        function g() {
            o.$();
        }
        function f(a) {
            B.lc(a || "");
        }
        function d() {
            return M;
        }
        function b() {
            return u;
        }
        function h() {
            return B.pa();
        }
        function m() {
            H.Y(8);
        }
        function n() {
            return !!e && e.ve();
        }
        function k(a) {
            a = t.translate(a);
            if (!a.oa[35]) {
                a.ya = "";
            }
            var b = a.Ba;
            if (b) {
                a.Ba = b.toLowerCase();
            } else {
                a.Aa = v;
            }
            if (!Bb) {
                a.$a = v;
            }
            return a;
        }
        function i() {
            var a = tb();
            H.Jb(window, "resize", function () {
                var b = tb();
                if (b.lf != a.lf || b.kf != a.kf) {
                    a = b;
                    m();
                }
            });
        }
        function r(a) {
            var b = a.xa;
            var c = b[135];
            var d = b[137];
            var e = b[138];
            if (b[139] || c || d || e) {
                a.xa[136] = p;
                a.xa[141] = p;
                if (d || e) {
                    c = na(a.wa);
                    if (a.Qc || (wb && (Cb || c)) || (Ya && c)) {
                        M = 3;
                        b[137] = v;
                        b[142] = v;
                    } else {
                        M = 2;
                    }
                } else {
                    M = 1;
                }
            } else {
                M = 0;
            }
        }
        var l;
        var o;
        var t;
        var e;
        var A;
        var H;
        var z;
        var B;
        var s;
        var C;
        var D;
        var w;
        var y;
        var L;
        var u;
        var M;
        var U = v;
        var P = {
            a: function (b) {
                if (!U) {
                    var b = k(b);
                    var d = Qb(b.Sc, b.Rc);
                    r(b);
                    o = Mb(l, b.xb || {}, a, c, d, P, b);
                    l.Id(d);
                    d.yh();
                    e = o.get(130, P);
                    A = o.get(115, P);
                    H = o.get(117, P);
                    z = o.get(123, P);
                    B = o.get(118, P);
                    s = o.get(119, P);
                    C = o.get(120, P);
                    D = o.get(126, P);
                    w = o.get(128, P);
                    y = o.get(139, P);
                    L = o.get(121, P);
                    i();
                    U = p;
                }
            },
            b: function (a) {
                g();
                a = k(a);
                r(a);
                o.activate(a);
            },
            c: g,
            d: function () {
                return c;
            },
            e: function (a, b) {
                return hb(a, b);
            },
            f: function () {
                return B.na();
            },
            g: h,
            h: function () {
                return w.sa();
            },
            i: function () {
                return w.Fa();
            },
            j: function (a) {
                return C.Kb(a);
            },
            k: function (a, b) {
                if (!a) {
                    a = C.Kb(b);
                }
                return Ba(a);
            },
            l: function () {
                return w.isVisible();
            },
            m: function () {
                return w.Lf();
            },
            n: function (a, b) {
                H.Jb(a, "click", function (a) {
                    L.search(h(), b);
                    return ob(a);
                });
            },
            o: function () {
                z.zb();
            },
            p: function () {
                w.rc();
            },
            q: function (a) {
                B.Ud(a || "");
            },
            r: function () {
                return A.getHeight();
            },
            s: function () {
                B.clear();
            },
            t: function (a) {
                return z.Mb(a);
            },
            u: function () {
                B.Td();
            },
            v: function () {
                s.focus();
            },
            w: function () {
                s.blur();
            },
            x: function () {
                return z.be();
            },
            y: function () {
                var a = D.Ia();
                if (a) {
                    return la(a.ff());
                } else {
                    return q;
                }
            },
            z: f,
            aa: function (a) {
                a = z.ee(a, q);
                return la(a.ff());
            },
            ab: function () {
                C.reset();
            },
            ad: function (a, b) {
                L.search(a, b);
            },
            ae: function () {
                if (y) {
                    y.refresh();
                }
            },
            af: function (a) {
                w.qc(a);
            },
            ag: function () {
                w.gb();
            },
            ah: function () {
                return w.va();
            },
            ai: m,
            al: function () {
                B.Sd();
            },
            am: function () {
                return o && o.$d();
            },
            an: function (a) {
                if (e) {
                    e.th(a);
                }
            },
            ao: n,
            ap: function () {
                if (n()) {
                    return e.sh();
                } else {
                    return "";
                }
            },
            aq: function (a, b) {
                return ib(a, b);
            },
            ar: d,
            as: b,
            at: function () {
                if (y) {
                    y.clear();
                }
            },
            au: function (a, b) {
                f(a);
                if (w.isEnabled()) {
                    w.Kc(a, b, v);
                }
            },
            av: function (a) {
                H.Y(16, {
                    query: a
                });
            },
            getId: b,
            kc: d
        };
        u = K.uh();
        t = Hb();
        l = Rb(j);
        (function () {
            var a = window.navigator.userAgent;
            var b = l.Hd();
            var c;
            c = (c = /Version\/(\d+)/.exec(a)) && c[1];
            if (!c) {
                c = (c = /(?:Android|Chrome|Firefox|Opera|MSIE)[\s\/](\d+)/.exec(a)) && c[1];
            }
            c = parseInt(c, 10) || 0;
            a = ((a = /(?:AppleWebKit|Gecko|Presto|Trident)\/(\d+)/.exec(a)) && parseInt(a[1], 10)) || 0;
            Sa = (Ta = (Ya = b[0]) && c <= 8 && a <= 4) && c <= 7 && a <= 3;
            wb = b[1];
            Xa = b[2];
            xb = b[5];
            yb = b[4];
            Bb = b[3];
            zb = b[7];
        })();
        Cb = /Mac/.test((navigator && (navigator.platform || navigator.appVersion)) || "");
        return P;
    };
    var Yb;
    (function () {
        var a = /MSIE\s+(\S+)/;
        var c = /Version\/(\S+)/;
        var j = /\/(movie|show)s?($|[?#/])/i;
        var g = /\/results\?(.*&)?search_type=(movies|shows)($|[&#])/i;
        var f = {
            1: "cytdh",
            2: "eytdh",
            5: "eytpf",
            6: "cytpf"
        };
        var d;
        var b;
        var h = {};
        var m;
        var n;
        var k;
        var i;
        var r;
        var l;
        var o = {
            a: function () {
                return m;
            },
            b: function (a, c) {
                var f = d.Hg(c);
                var g = function (a) {
                    if (h[a]) {
                        h[a].value = f[a];
                    }
                };
                g("oq");
                g("aq");
                g("aqi");
                g("aql");
                g("gs_upl");
                g("gs_sm");
                b.submit();
            },
            r: function (a) {
                a.addRule(".gsfi", "font-size:12px");
                a.addRule(".gsfs", "font-size:13px");
                a.addRule(".gssb_a,.gssb_a td", "line-height:17px");
                var b = m[1];
                var c = m[3];
                var d = m[4];
                var f = m[2];
                var g = document.body.dir == "rtl";
                var h = 7;
                var j = 7;
                if (k) {
                    if (c) {
                        h = 6;
                        j = g ? 8 : 7;
                    } else if (d) {
                        h = 6;
                    } else if (b) {
                        h = g ? 6 : 7;
                        j = 6;
                    } else if (f) {
                        h = g ? 6 : 7;
                        j = g ? 7 : 6;
                    }
                } else if (n) {
                    if (m[0]) {
                        if (r == 7) {
                            j = 4;
                            h = g ? 4 : 3;
                        } else if (r == 8) {
                            j = g ? 7 : 6;
                            h = 4;
                        } else if (r == 9) {
                            j = 5;
                            h = g ? 5 : 7;
                        }
                    } else if (c) {
                        h = 6;
                        j = g ? 8 : 7;
                    } else if (d || b) {
                        h = 6;
                    } else if (f) {
                        h = j = 6;
                    }
                } else if (i) {
                    if (b) {
                        h = g ? 6 : 7;
                    } else if (c) {
                        h = 5;
                        j = g ? 8 : 7;
                    } else if (f) {
                        h = j = 6;
                    }
                }
                a.addRule(".gssb_a", "padding:" + ["0 ", h, "px 0 ", j, "px"].join(""));
                a.addRule(".gssb_c", "z-index:3000001");
                a.addRule(".gssb_i td", "background:#eee");
                a.addRule(".gssb_k", "z-index:3000000");
                if (l) {
                    a.addRule(".gsib_a", "padding:0 4px");
                    a.addRule(".gsok_a", "padding:0");
                    a.addRule(".gsok_a img", "display:block");
                }
                a.addRule(
                    ".gsfe_b",
                    "border:1px solid #1c62b9;outline:none;box-shadow:inset 0px 1px 2px rgba(0,0,0,0.3);-moz-box-shadow:inset 0px 1px 2px rgba(0,0,0,0.3);-webkit-box-shadow:inset 0px 1px 2px rgba(0,0,0,0.3)"
                );
                if (m[0] && r == 7) {
                    a.addRule(".gsib_a", "padding:2px 10px 5px 2px");
                    a.addRule("body.rtl .gsib_a", "padding:2px 6px 5px");
                }
            }
        };
        (function () {
            var b = window.navigator.userAgent;
            var d = function (a) {
                if ((a = b.match(a))) {
                    return parseInt(a[1], 10);
                } else {
                    return NaN;
                }
            };
            m = Ab();
            if (m[2]) {
                r = d(c);
            } else if (m[0]) {
                r = d(a);
            }
            n = b.indexOf("Windows") >= 0;
            k = b.indexOf("Macintosh") >= 0;
            i = b.indexOf("Linux") >= 0;
        })();
        Yb = function (a, c, A, H, z, B, s, C, D, w, y, L) {
            b = a;
            var s = Xb();
            var C = Hb();
            var u = C.getInstance();
            u.ua = "youtube";
            u.La = "yt";
            u.wa = A;
            u.Bb = H;
            u.qd = v;
            u.td = 0;
            u.rd = v;
            u.sd = v;
            u.Ea = 0;
            u.Za = v;
            u.Ya = v;
            u.jb = v;
            u.Ca = p;
            u.Ha = "gsfi";
            u.Ja = "gsfs";
            u.pb = p;
            var H = u;
            var M;
            M = window.location.href;
            M = j.test(M) || g.test(M);
            H.Ma = M;
            u.Aa = l = B;
            u.Ba = A;
            u.Fb = "//www.gstatic.com/inputtools/images";
            u.Gb = 2;
            u.oa = fa([0]);
            u.Db = "masthead-search-terms";
            B = {};
            u.xb = B;
            if (L == 1) {
                u.ua = "youtube-psuggest";
                u.ub = p;
                u.ya = D;
                u.vb = w;
                u.wb = y;
                u.oa[35] = p;
            }
            if (L == 3 || L == 4) {
                u.La = "yt_mv";
                u.Ma = v;
            }
            if (L in f) {
                u.Cb = f[L];
            }
            if (!m[2]) {
                u.tb = p;
            }
            D = m[1];
            w = m[3];
            if (
                window.location.href.indexOf("/watch?") != -1 &&
                (m[2] || (n && (D || m[5])) || (k && (D || w)) || (i && w))
            ) {
                u.ua = "youtube-reduced";
                u.qb = 4;
            } else {
                B[152] = [Ub(z), 162];
                u.Xa = p;
                u.oa[501] = p;
            }
            if (m[0] && r == 7) {
                u.ib = p;
            } else {
                u.mb = "masthead-search-terms";
            }
            z = 1;
            w = D = 0;
            y = 2;
            if (n) {
                if (m[0]) {
                    if (r == 7) {
                        w = z = 2;
                        D = 0;
                    } else if (r == 8) {
                        z = 5;
                        if (u.Aa) {
                            D = z = -1;
                        }
                    } else if (r == 9) {
                        z = -1;
                    }
                } else if (m[1]) {
                    z = 2;
                    D = 1;
                    w = -1;
                    y = 1;
                }
            }
            if (m[2]) {
                D = -1;
            }
            u.sb = [z, D, w, y, D, 0];
            z = [0];
            if (m[0] && r == 8) {
                z[0] = -1;
            }
            u.rb = z;
            if (na(A)) {
                u.hb = p;
            }
            u = C.normalize(u);
            d = s.getInstance(c, a, o);
            d.Ig(u);
            if ((a = document.getElementById("search-btn"))) {
                d.Gg(a, 12);
                a.onclick = q;
            }
            a = "oq,aq,aqi,aql,gs_sm,gs_upl".split(",");
            for (c = 0; (A = a[c++]);) {
                h[A] = d.Fg(b, A);
            }
        };
        return o;
    })();
    var Zb = Yb;
    var $b = ["searchbox", "yt", "install"];
    var ac = this;
    if (!($b[0] in ac) && ac.execScript) {
        ac.execScript("var " + $b[0]);
    }
    for (var bc; $b.length && (bc = $b.shift());) {
        if (!$b.length && Zb !== ea) {
            ac[bc] = Zb;
        } else {
            ac = ac[bc] ? ac[bc] : (ac[bc] = {});
        }
    }
})();
