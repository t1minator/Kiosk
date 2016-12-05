! function(a, b) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) {
        if (!a.document) throw new Error("jQuery requires a window with a document");
        return b(a)
    } : b(a)
}("undefined" != typeof window ? window : this, function(a, b) {
    function c(a) {
        var b = a.length,
            c = _.type(a);
        return "function" === c || _.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
    }

    function d(a, b, c) {
        if (_.isFunction(b)) return _.grep(a, function(a, d) {
            return !!b.call(a, d, a) !== c
        });
        if (b.nodeType) return _.grep(a, function(a) {
            return a === b !== c
        });
        if ("string" == typeof b) {
            if (hb.test(b)) return _.filter(b, a, c);
            b = _.filter(b, a)
        }
        return _.grep(a, function(a) {
            return U.call(b, a) >= 0 !== c
        })
    }

    function e(a, b) {
        for (;
            (a = a[b]) && 1 !== a.nodeType;);
        return a
    }

    function f(a) {
        var b = ob[a] = {};
        return _.each(a.match(nb) || [], function(a, c) {
            b[c] = !0
        }), b
    }

    function g() {
        Z.removeEventListener("DOMContentLoaded", g, !1), a.removeEventListener("load", g, !1), _.ready()
    }

    function h() {
        Object.defineProperty(this.cache = {}, 0, {
            get: function() {
                return {}
            }
        }), this.expando = _.expando + h.uid++
    }

    function i(a, b, c) {
        var d;
        if (void 0 === c && 1 === a.nodeType)
            if (d = "data-" + b.replace(ub, "-$1").toLowerCase(), c = a.getAttribute(d), "string" == typeof c) {
                try {
                    c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : tb.test(c) ? _.parseJSON(c) : c
                } catch (e) {}
                sb.set(a, b, c)
            } else c = void 0;
        return c
    }

    function j() {
        return !0
    }

    function k() {
        return !1
    }

    function l() {
        try {
            return Z.activeElement
        } catch (a) {}
    }

    function m(a, b) {
        return _.nodeName(a, "table") && _.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function n(a) {
        return a.type = (null !== a.getAttribute("type")) + "/" + a.type, a
    }

    function o(a) {
        var b = Kb.exec(a.type);
        return b ? a.type = b[1] : a.removeAttribute("type"), a
    }

    function p(a, b) {
        for (var c = 0, d = a.length; d > c; c++) rb.set(a[c], "globalEval", !b || rb.get(b[c], "globalEval"))
    }

    function q(a, b) {
        var c, d, e, f, g, h, i, j;
        if (1 === b.nodeType) {
            if (rb.hasData(a) && (f = rb.access(a), g = rb.set(b, f), j = f.events)) {
                delete g.handle, g.events = {};
                for (e in j)
                    for (c = 0, d = j[e].length; d > c; c++) _.event.add(b, e, j[e][c])
            }
            sb.hasData(a) && (h = sb.access(a), i = _.extend({}, h), sb.set(b, i))
        }
    }

    function r(a, b) {
        var c = a.getElementsByTagName ? a.getElementsByTagName(b || "*") : a.querySelectorAll ? a.querySelectorAll(b || "*") : [];
        return void 0 === b || b && _.nodeName(a, b) ? _.merge([a], c) : c
    }

    function s(a, b) {
        var c = b.nodeName.toLowerCase();
        "input" === c && yb.test(a.type) ? b.checked = a.checked : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue)
    }

    function t(b, c) {
        var d, e = _(c.createElement(b)).appendTo(c.body),
            f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : _.css(e[0], "display");
        return e.detach(), f
    }

    function u(a) {
        var b = Z,
            c = Ob[a];
        return c || (c = t(a, b), "none" !== c && c || (Nb = (Nb || _("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = Nb[0].contentDocument, b.write(), b.close(), c = t(a, b), Nb.detach()), Ob[a] = c), c
    }

    function v(a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || Rb(a), c && (g = c.getPropertyValue(b) || c[b]), c && ("" !== g || _.contains(a.ownerDocument, a) || (g = _.style(a, b)), Qb.test(g) && Pb.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 !== g ? g + "" : g
    }

    function w(a, b) {
        return {
            get: function() {
                return a() ? void delete this.get : (this.get = b).apply(this, arguments)
            }
        }
    }

    function x(a, b) {
        if (b in a) return b;
        for (var c = b[0].toUpperCase() + b.slice(1), d = b, e = Xb.length; e--;)
            if (b = Xb[e] + c, b in a) return b;
        return d
    }

    function y(a, b, c) {
        var d = Tb.exec(b);
        return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
    }

    function z(a, b, c, d, e) {
        for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) "margin" === c && (g += _.css(a, c + wb[f], !0, e)), d ? ("content" === c && (g -= _.css(a, "padding" + wb[f], !0, e)), "margin" !== c && (g -= _.css(a, "border" + wb[f] + "Width", !0, e))) : (g += _.css(a, "padding" + wb[f], !0, e), "padding" !== c && (g += _.css(a, "border" + wb[f] + "Width", !0, e)));
        return g
    }

    function A(a, b, c) {
        var d = !0,
            e = "width" === b ? a.offsetWidth : a.offsetHeight,
            f = Rb(a),
            g = "border-box" === _.css(a, "boxSizing", !1, f);
        if (0 >= e || null == e) {
            if (e = v(a, b, f), (0 > e || null == e) && (e = a.style[b]), Qb.test(e)) return e;
            d = g && (Y.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0
        }
        return e + z(a, b, c || (g ? "border" : "content"), d, f) + "px"
    }

    function B(a, b) {
        for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g], d.style && (f[g] = rb.get(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && xb(d) && (f[g] = rb.access(d, "olddisplay", u(d.nodeName)))) : (e = xb(d), "none" === c && e || rb.set(d, "olddisplay", e ? c : _.css(d, "display"))));
        for (g = 0; h > g; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
        return a
    }

    function C(a, b, c, d, e) {
        return new C.prototype.init(a, b, c, d, e)
    }

    function D() {
        return setTimeout(function() {
            Yb = void 0
        }), Yb = _.now()
    }

    function E(a, b) {
        var c, d = 0,
            e = {
                height: a
            };
        for (b = b ? 1 : 0; 4 > d; d += 2 - b) c = wb[d], e["margin" + c] = e["padding" + c] = a;
        return b && (e.opacity = e.width = a), e
    }

    function F(a, b, c) {
        for (var d, e = (cc[b] || []).concat(cc["*"]), f = 0, g = e.length; g > f; f++)
            if (d = e[f].call(c, b, a)) return d
    }

    function G(a, b, c) {
        var d, e, f, g, h, i, j, k, l = this,
            m = {},
            n = a.style,
            o = a.nodeType && xb(a),
            p = rb.get(a, "fxshow");
        c.queue || (h = _._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function() {
            h.unqueued || i()
        }), h.unqueued++, l.always(function() {
            l.always(function() {
                h.unqueued--, _.queue(a, "fx").length || h.empty.fire()
            })
        })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [n.overflow, n.overflowX, n.overflowY], j = _.css(a, "display"), k = "none" === j ? rb.get(a, "olddisplay") || u(a.nodeName) : j, "inline" === k && "none" === _.css(a, "float") && (n.display = "inline-block")), c.overflow && (n.overflow = "hidden", l.always(function() {
            n.overflow = c.overflow[0], n.overflowX = c.overflow[1], n.overflowY = c.overflow[2]
        }));
        for (d in b)
            if (e = b[d], $b.exec(e)) {
                if (delete b[d], f = f || "toggle" === e, e === (o ? "hide" : "show")) {
                    if ("show" !== e || !p || void 0 === p[d]) continue;
                    o = !0
                }
                m[d] = p && p[d] || _.style(a, d)
            } else j = void 0;
        if (_.isEmptyObject(m)) "inline" === ("none" === j ? u(a.nodeName) : j) && (n.display = j);
        else {
            p ? "hidden" in p && (o = p.hidden) : p = rb.access(a, "fxshow", {}), f && (p.hidden = !o), o ? _(a).show() : l.done(function() {
                _(a).hide()
            }), l.done(function() {
                var b;
                rb.remove(a, "fxshow");
                for (b in m) _.style(a, b, m[b])
            });
            for (d in m) g = F(o ? p[d] : 0, d, l), d in p || (p[d] = g.start, o && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0))
        }
    }

    function H(a, b) {
        var c, d, e, f, g;
        for (c in a)
            if (d = _.camelCase(c), e = b[d], f = a[c], _.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = _.cssHooks[d], g && "expand" in g) {
                f = g.expand(f), delete a[d];
                for (c in f) c in a || (a[c] = f[c], b[c] = e)
            } else b[d] = e
    }

    function I(a, b, c) {
        var d, e, f = 0,
            g = bc.length,
            h = _.Deferred().always(function() {
                delete i.elem
            }),
            i = function() {
                if (e) return !1;
                for (var b = Yb || D(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
                return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1)
            },
            j = h.promise({
                elem: a,
                props: _.extend({}, b),
                opts: _.extend(!0, {
                    specialEasing: {}
                }, c),
                originalProperties: b,
                originalOptions: c,
                startTime: Yb || D(),
                duration: c.duration,
                tweens: [],
                createTween: function(b, c) {
                    var d = _.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                    return j.tweens.push(d), d
                },
                stop: function(b) {
                    var c = 0,
                        d = b ? j.tweens.length : 0;
                    if (e) return this;
                    for (e = !0; d > c; c++) j.tweens[c].run(1);
                    return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this
                }
            }),
            k = j.props;
        for (H(k, j.opts.specialEasing); g > f; f++)
            if (d = bc[f].call(j, a, k, j.opts)) return d;
        return _.map(k, F, j), _.isFunction(j.opts.start) && j.opts.start.call(a, j), _.fx.timer(_.extend(i, {
            elem: a,
            anim: j,
            queue: j.opts.queue
        })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
    }

    function J(a) {
        return function(b, c) {
            "string" != typeof b && (c = b, b = "*");
            var d, e = 0,
                f = b.toLowerCase().match(nb) || [];
            if (_.isFunction(c))
                for (; d = f[e++];) "+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
        }
    }

    function K(a, b, c, d) {
        function e(h) {
            var i;
            return f[h] = !0, _.each(a[h] || [], function(a, h) {
                var j = h(b, c, d);
                return "string" != typeof j || g || f[j] ? g ? !(i = j) : void 0 : (b.dataTypes.unshift(j), e(j), !1)
            }), i
        }
        var f = {},
            g = a === tc;
        return e(b.dataTypes[0]) || !f["*"] && e("*")
    }

    function L(a, b) {
        var c, d, e = _.ajaxSettings.flatOptions || {};
        for (c in b) void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]);
        return d && _.extend(!0, a, d), a
    }

    function M(a, b, c) {
        for (var d, e, f, g, h = a.contents, i = a.dataTypes;
            "*" === i[0];) i.shift(), void 0 === d && (d = a.mimeType || b.getResponseHeader("Content-Type"));
        if (d)
            for (e in h)
                if (h[e] && h[e].test(d)) {
                    i.unshift(e);
                    break
                }
        if (i[0] in c) f = i[0];
        else {
            for (e in c) {
                if (!i[0] || a.converters[e + " " + i[0]]) {
                    f = e;
                    break
                }
                g || (g = e)
            }
            f = f || g
        }
        return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0
    }

    function N(a, b, c, d) {
        var e, f, g, h, i, j = {},
            k = a.dataTypes.slice();
        if (k[1])
            for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
        for (f = k.shift(); f;)
            if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())
                if ("*" === f) f = i;
                else if ("*" !== i && i !== f) {
            if (g = j[i + " " + f] || j["* " + f], !g)
                for (e in j)
                    if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                        g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                        break
                    }
            if (g !== !0)
                if (g && a["throws"]) b = g(b);
                else try {
                    b = g(b)
                } catch (l) {
                    return {
                        state: "parsererror",
                        error: g ? l : "No conversion from " + i + " to " + f
                    }
                }
        }
        return {
            state: "success",
            data: b
        }
    }

    function O(a, b, c, d) {
        var e;
        if (_.isArray(b)) _.each(b, function(b, e) {
            c || yc.test(a) ? d(a, e) : O(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
        });
        else if (c || "object" !== _.type(b)) d(a, b);
        else
            for (e in b) O(a + "[" + e + "]", b[e], c, d)
    }

    function P(a) {
        return _.isWindow(a) ? a : 9 === a.nodeType && a.defaultView
    }
    var Q = [],
        R = Q.slice,
        S = Q.concat,
        T = Q.push,
        U = Q.indexOf,
        V = {},
        W = V.toString,
        X = V.hasOwnProperty,
        Y = {},
        Z = a.document,
        $ = "2.1.3",
        _ = function(a, b) {
            return new _.fn.init(a, b)
        },
        ab = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        bb = /^-ms-/,
        cb = /-([\da-z])/gi,
        db = function(a, b) {
            return b.toUpperCase()
        };
    _.fn = _.prototype = {
        jquery: $,
        constructor: _,
        selector: "",
        length: 0,
        toArray: function() {
            return R.call(this)
        },
        get: function(a) {
            return null != a ? 0 > a ? this[a + this.length] : this[a] : R.call(this)
        },
        pushStack: function(a) {
            var b = _.merge(this.constructor(), a);
            return b.prevObject = this, b.context = this.context, b
        },
        each: function(a, b) {
            return _.each(this, a, b)
        },
        map: function(a) {
            return this.pushStack(_.map(this, function(b, c) {
                return a.call(b, c, b)
            }))
        },
        slice: function() {
            return this.pushStack(R.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(a) {
            var b = this.length,
                c = +a + (0 > a ? b : 0);
            return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: T,
        sort: Q.sort,
        splice: Q.splice
    }, _.extend = _.fn.extend = function() {
        var a, b, c, d, e, f, g = arguments[0] || {},
            h = 1,
            i = arguments.length,
            j = !1;
        for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || _.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++)
            if (null != (a = arguments[h]))
                for (b in a) c = g[b], d = a[b], g !== d && (j && d && (_.isPlainObject(d) || (e = _.isArray(d))) ? (e ? (e = !1, f = c && _.isArray(c) ? c : []) : f = c && _.isPlainObject(c) ? c : {}, g[b] = _.extend(j, f, d)) : void 0 !== d && (g[b] = d));
        return g
    }, _.extend({
        expando: "jQuery" + ($ + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(a) {
            throw new Error(a)
        },
        noop: function() {},
        isFunction: function(a) {
            return "function" === _.type(a)
        },
        isArray: Array.isArray,
        isWindow: function(a) {
            return null != a && a === a.window
        },
        isNumeric: function(a) {
            return !_.isArray(a) && a - parseFloat(a) + 1 >= 0
        },
        isPlainObject: function(a) {
            return "object" !== _.type(a) || a.nodeType || _.isWindow(a) ? !1 : a.constructor && !X.call(a.constructor.prototype, "isPrototypeOf") ? !1 : !0
        },
        isEmptyObject: function(a) {
            var b;
            for (b in a) return !1;
            return !0
        },
        type: function(a) {
            return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? V[W.call(a)] || "object" : typeof a
        },
        globalEval: function(a) {
            var b, c = eval;
            a = _.trim(a), a && (1 === a.indexOf("use strict") ? (b = Z.createElement("script"), b.text = a, Z.head.appendChild(b).parentNode.removeChild(b)) : c(a))
        },
        camelCase: function(a) {
            return a.replace(bb, "ms-").replace(cb, db)
        },
        nodeName: function(a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
        },
        each: function(a, b, d) {
            var e, f = 0,
                g = a.length,
                h = c(a);
            if (d) {
                if (h)
                    for (; g > f && (e = b.apply(a[f], d), e !== !1); f++);
                else
                    for (f in a)
                        if (e = b.apply(a[f], d), e === !1) break
            } else if (h)
                for (; g > f && (e = b.call(a[f], f, a[f]), e !== !1); f++);
            else
                for (f in a)
                    if (e = b.call(a[f], f, a[f]), e === !1) break; return a
        },
        trim: function(a) {
            return null == a ? "" : (a + "").replace(ab, "")
        },
        makeArray: function(a, b) {
            var d = b || [];
            return null != a && (c(Object(a)) ? _.merge(d, "string" == typeof a ? [a] : a) : T.call(d, a)), d
        },
        inArray: function(a, b, c) {
            return null == b ? -1 : U.call(b, a, c)
        },
        merge: function(a, b) {
            for (var c = +b.length, d = 0, e = a.length; c > d; d++) a[e++] = b[d];
            return a.length = e, a
        },
        grep: function(a, b, c) {
            for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) d = !b(a[f], f), d !== h && e.push(a[f]);
            return e
        },
        map: function(a, b, d) {
            var e, f = 0,
                g = a.length,
                h = c(a),
                i = [];
            if (h)
                for (; g > f; f++) e = b(a[f], f, d), null != e && i.push(e);
            else
                for (f in a) e = b(a[f], f, d), null != e && i.push(e);
            return S.apply([], i)
        },
        guid: 1,
        proxy: function(a, b) {
            var c, d, e;
            return "string" == typeof b && (c = a[b], b = a, a = c), _.isFunction(a) ? (d = R.call(arguments, 2), e = function() {
                return a.apply(b || this, d.concat(R.call(arguments)))
            }, e.guid = a.guid = a.guid || _.guid++, e) : void 0
        },
        now: Date.now,
        support: Y
    }), _.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
        V["[object " + b + "]"] = b.toLowerCase()
    });
    var eb = function(a) {
        function b(a, b, c, d) {
            var e, f, g, h, i, j, l, n, o, p;
            if ((b ? b.ownerDocument || b : O) !== G && F(b), b = b || G, c = c || [], h = b.nodeType, "string" != typeof a || !a || 1 !== h && 9 !== h && 11 !== h) return c;
            if (!d && I) {
                if (11 !== h && (e = sb.exec(a)))
                    if (g = e[1]) {
                        if (9 === h) {
                            if (f = b.getElementById(g), !f || !f.parentNode) return c;
                            if (f.id === g) return c.push(f), c
                        } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && M(b, f) && f.id === g) return c.push(f), c
                    } else {
                        if (e[2]) return $.apply(c, b.getElementsByTagName(a)), c;
                        if ((g = e[3]) && v.getElementsByClassName) return $.apply(c, b.getElementsByClassName(g)), c
                    }
                if (v.qsa && (!J || !J.test(a))) {
                    if (n = l = N, o = b, p = 1 !== h && a, 1 === h && "object" !== b.nodeName.toLowerCase()) {
                        for (j = z(a), (l = b.getAttribute("id")) ? n = l.replace(ub, "\\$&") : b.setAttribute("id", n), n = "[id='" + n + "'] ", i = j.length; i--;) j[i] = n + m(j[i]);
                        o = tb.test(a) && k(b.parentNode) || b, p = j.join(",")
                    }
                    if (p) try {
                        return $.apply(c, o.querySelectorAll(p)), c
                    } catch (q) {} finally {
                        l || b.removeAttribute("id")
                    }
                }
            }
            return B(a.replace(ib, "$1"), b, c, d)
        }

        function c() {
            function a(c, d) {
                return b.push(c + " ") > w.cacheLength && delete a[b.shift()], a[c + " "] = d
            }
            var b = [];
            return a
        }

        function d(a) {
            return a[N] = !0, a
        }

        function e(a) {
            var b = G.createElement("div");
            try {
                return !!a(b)
            } catch (c) {
                return !1
            } finally {
                b.parentNode && b.parentNode.removeChild(b), b = null
            }
        }

        function f(a, b) {
            for (var c = a.split("|"), d = a.length; d--;) w.attrHandle[c[d]] = b
        }

        function g(a, b) {
            var c = b && a,
                d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || V) - (~a.sourceIndex || V);
            if (d) return d;
            if (c)
                for (; c = c.nextSibling;)
                    if (c === b) return -1;
            return a ? 1 : -1
        }

        function h(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && b.type === a
            }
        }

        function i(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return ("input" === c || "button" === c) && b.type === a
            }
        }

        function j(a) {
            return d(function(b) {
                return b = +b, d(function(c, d) {
                    for (var e, f = a([], c.length, b), g = f.length; g--;) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                })
            })
        }

        function k(a) {
            return a && "undefined" != typeof a.getElementsByTagName && a
        }

        function l() {}

        function m(a) {
            for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
            return d
        }

        function n(a, b, c) {
            var d = b.dir,
                e = c && "parentNode" === d,
                f = Q++;
            return b.first ? function(b, c, f) {
                for (; b = b[d];)
                    if (1 === b.nodeType || e) return a(b, c, f)
            } : function(b, c, g) {
                var h, i, j = [P, f];
                if (g) {
                    for (; b = b[d];)
                        if ((1 === b.nodeType || e) && a(b, c, g)) return !0
                } else
                    for (; b = b[d];)
                        if (1 === b.nodeType || e) {
                            if (i = b[N] || (b[N] = {}), (h = i[d]) && h[0] === P && h[1] === f) return j[2] = h[2];
                            if (i[d] = j, j[2] = a(b, c, g)) return !0
                        }
            }
        }

        function o(a) {
            return a.length > 1 ? function(b, c, d) {
                for (var e = a.length; e--;)
                    if (!a[e](b, c, d)) return !1;
                return !0
            } : a[0]
        }

        function p(a, c, d) {
            for (var e = 0, f = c.length; f > e; e++) b(a, c[e], d);
            return d
        }

        function q(a, b, c, d, e) {
            for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)(f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
            return g
        }

        function r(a, b, c, e, f, g) {
            return e && !e[N] && (e = r(e)), f && !f[N] && (f = r(f, g)), d(function(d, g, h, i) {
                var j, k, l, m = [],
                    n = [],
                    o = g.length,
                    r = d || p(b || "*", h.nodeType ? [h] : h, []),
                    s = !a || !d && b ? r : q(r, m, a, h, i),
                    t = c ? f || (d ? a : o || e) ? [] : g : s;
                if (c && c(s, t, h, i), e)
                    for (j = q(t, n), e(j, [], h, i), k = j.length; k--;)(l = j[k]) && (t[n[k]] = !(s[n[k]] = l));
                if (d) {
                    if (f || a) {
                        if (f) {
                            for (j = [], k = t.length; k--;)(l = t[k]) && j.push(s[k] = l);
                            f(null, t = [], j, i)
                        }
                        for (k = t.length; k--;)(l = t[k]) && (j = f ? ab(d, l) : m[k]) > -1 && (d[j] = !(g[j] = l))
                    }
                } else t = q(t === g ? t.splice(o, t.length) : t), f ? f(null, g, t, i) : $.apply(g, t)
            })
        }

        function s(a) {
            for (var b, c, d, e = a.length, f = w.relative[a[0].type], g = f || w.relative[" "], h = f ? 1 : 0, i = n(function(a) {
                    return a === b
                }, g, !0), j = n(function(a) {
                    return ab(b, a) > -1
                }, g, !0), k = [function(a, c, d) {
                    var e = !f && (d || c !== C) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d));
                    return b = null, e
                }]; e > h; h++)
                if (c = w.relative[a[h].type]) k = [n(o(k), c)];
                else {
                    if (c = w.filter[a[h].type].apply(null, a[h].matches), c[N]) {
                        for (d = ++h; e > d && !w.relative[a[d].type]; d++);
                        return r(h > 1 && o(k), h > 1 && m(a.slice(0, h - 1).concat({
                            value: " " === a[h - 2].type ? "*" : ""
                        })).replace(ib, "$1"), c, d > h && s(a.slice(h, d)), e > d && s(a = a.slice(d)), e > d && m(a))
                    }
                    k.push(c)
                }
            return o(k)
        }

        function t(a, c) {
            var e = c.length > 0,
                f = a.length > 0,
                g = function(d, g, h, i, j) {
                    var k, l, m, n = 0,
                        o = "0",
                        p = d && [],
                        r = [],
                        s = C,
                        t = d || f && w.find.TAG("*", j),
                        u = P += null == s ? 1 : Math.random() || .1,
                        v = t.length;
                    for (j && (C = g !== G && g); o !== v && null != (k = t[o]); o++) {
                        if (f && k) {
                            for (l = 0; m = a[l++];)
                                if (m(k, g, h)) {
                                    i.push(k);
                                    break
                                }
                            j && (P = u)
                        }
                        e && ((k = !m && k) && n--, d && p.push(k))
                    }
                    if (n += o, e && o !== n) {
                        for (l = 0; m = c[l++];) m(p, r, g, h);
                        if (d) {
                            if (n > 0)
                                for (; o--;) p[o] || r[o] || (r[o] = Y.call(i));
                            r = q(r)
                        }
                        $.apply(i, r), j && !d && r.length > 0 && n + c.length > 1 && b.uniqueSort(i)
                    }
                    return j && (P = u, C = s), p
                };
            return e ? d(g) : g
        }
        var u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N = "sizzle" + 1 * new Date,
            O = a.document,
            P = 0,
            Q = 0,
            R = c(),
            S = c(),
            T = c(),
            U = function(a, b) {
                return a === b && (E = !0), 0
            },
            V = 1 << 31,
            W = {}.hasOwnProperty,
            X = [],
            Y = X.pop,
            Z = X.push,
            $ = X.push,
            _ = X.slice,
            ab = function(a, b) {
                for (var c = 0, d = a.length; d > c; c++)
                    if (a[c] === b) return c;
                return -1
            },
            bb = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            cb = "[\\x20\\t\\r\\n\\f]",
            db = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            eb = db.replace("w", "w#"),
            fb = "\\[" + cb + "*(" + db + ")(?:" + cb + "*([*^$|!~]?=)" + cb + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + eb + "))|)" + cb + "*\\]",
            gb = ":(" + db + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + fb + ")*)|.*)\\)|)",
            hb = new RegExp(cb + "+", "g"),
            ib = new RegExp("^" + cb + "+|((?:^|[^\\\\])(?:\\\\.)*)" + cb + "+$", "g"),
            jb = new RegExp("^" + cb + "*," + cb + "*"),
            kb = new RegExp("^" + cb + "*([>+~]|" + cb + ")" + cb + "*"),
            lb = new RegExp("=" + cb + "*([^\\]'\"]*?)" + cb + "*\\]", "g"),
            mb = new RegExp(gb),
            nb = new RegExp("^" + eb + "$"),
            ob = {
                ID: new RegExp("^#(" + db + ")"),
                CLASS: new RegExp("^\\.(" + db + ")"),
                TAG: new RegExp("^(" + db.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + fb),
                PSEUDO: new RegExp("^" + gb),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + cb + "*(even|odd|(([+-]|)(\\d*)n|)" + cb + "*(?:([+-]|)" + cb + "*(\\d+)|))" + cb + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + bb + ")$", "i"),
                needsContext: new RegExp("^" + cb + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + cb + "*((?:-\\d)?\\d*)" + cb + "*\\)|)(?=[^-]|$)", "i")
            },
            pb = /^(?:input|select|textarea|button)$/i,
            qb = /^h\d$/i,
            rb = /^[^{]+\{\s*\[native \w/,
            sb = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            tb = /[+~]/,
            ub = /'|\\/g,
            vb = new RegExp("\\\\([\\da-f]{1,6}" + cb + "?|(" + cb + ")|.)", "ig"),
            wb = function(a, b, c) {
                var d = "0x" + b - 65536;
                return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
            },
            xb = function() {
                F()
            };
        try {
            $.apply(X = _.call(O.childNodes), O.childNodes), X[O.childNodes.length].nodeType
        } catch (yb) {
            $ = {
                apply: X.length ? function(a, b) {
                    Z.apply(a, _.call(b))
                } : function(a, b) {
                    for (var c = a.length, d = 0; a[c++] = b[d++];);
                    a.length = c - 1
                }
            }
        }
        v = b.support = {}, y = b.isXML = function(a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return b ? "HTML" !== b.nodeName : !1
        }, F = b.setDocument = function(a) {
            var b, c, d = a ? a.ownerDocument || a : O;
            return d !== G && 9 === d.nodeType && d.documentElement ? (G = d, H = d.documentElement, c = d.defaultView, c && c !== c.top && (c.addEventListener ? c.addEventListener("unload", xb, !1) : c.attachEvent && c.attachEvent("onunload", xb)), I = !y(d), v.attributes = e(function(a) {
                return a.className = "i", !a.getAttribute("className")
            }), v.getElementsByTagName = e(function(a) {
                return a.appendChild(d.createComment("")), !a.getElementsByTagName("*").length
            }), v.getElementsByClassName = rb.test(d.getElementsByClassName), v.getById = e(function(a) {
                return H.appendChild(a).id = N, !d.getElementsByName || !d.getElementsByName(N).length
            }), v.getById ? (w.find.ID = function(a, b) {
                if ("undefined" != typeof b.getElementById && I) {
                    var c = b.getElementById(a);
                    return c && c.parentNode ? [c] : []
                }
            }, w.filter.ID = function(a) {
                var b = a.replace(vb, wb);
                return function(a) {
                    return a.getAttribute("id") === b
                }
            }) : (delete w.find.ID, w.filter.ID = function(a) {
                var b = a.replace(vb, wb);
                return function(a) {
                    var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
                    return c && c.value === b
                }
            }), w.find.TAG = v.getElementsByTagName ? function(a, b) {
                return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : v.qsa ? b.querySelectorAll(a) : void 0
            } : function(a, b) {
                var c, d = [],
                    e = 0,
                    f = b.getElementsByTagName(a);
                if ("*" === a) {
                    for (; c = f[e++];) 1 === c.nodeType && d.push(c);
                    return d
                }
                return f
            }, w.find.CLASS = v.getElementsByClassName && function(a, b) {
                return I ? b.getElementsByClassName(a) : void 0
            }, K = [], J = [], (v.qsa = rb.test(d.querySelectorAll)) && (e(function(a) {
                H.appendChild(a).innerHTML = "<a id='" + N + "'></a><select id='" + N + "-\f]' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && J.push("[*^$]=" + cb + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || J.push("\\[" + cb + "*(?:value|" + bb + ")"), a.querySelectorAll("[id~=" + N + "-]").length || J.push("~="), a.querySelectorAll(":checked").length || J.push(":checked"), a.querySelectorAll("a#" + N + "+*").length || J.push(".#.+[+~]")
            }), e(function(a) {
                var b = d.createElement("input");
                b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && J.push("name" + cb + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || J.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), J.push(",.*:")
            })), (v.matchesSelector = rb.test(L = H.matches || H.webkitMatchesSelector || H.mozMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) && e(function(a) {
                v.disconnectedMatch = L.call(a, "div"), L.call(a, "[s!='']:x"), K.push("!=", gb)
            }), J = J.length && new RegExp(J.join("|")), K = K.length && new RegExp(K.join("|")), b = rb.test(H.compareDocumentPosition), M = b || rb.test(H.contains) ? function(a, b) {
                var c = 9 === a.nodeType ? a.documentElement : a,
                    d = b && b.parentNode;
                return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
            } : function(a, b) {
                if (b)
                    for (; b = b.parentNode;)
                        if (b === a) return !0;
                return !1
            }, U = b ? function(a, b) {
                if (a === b) return E = !0, 0;
                var c = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return c ? c : (c = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & c || !v.sortDetached && b.compareDocumentPosition(a) === c ? a === d || a.ownerDocument === O && M(O, a) ? -1 : b === d || b.ownerDocument === O && M(O, b) ? 1 : D ? ab(D, a) - ab(D, b) : 0 : 4 & c ? -1 : 1)
            } : function(a, b) {
                if (a === b) return E = !0, 0;
                var c, e = 0,
                    f = a.parentNode,
                    h = b.parentNode,
                    i = [a],
                    j = [b];
                if (!f || !h) return a === d ? -1 : b === d ? 1 : f ? -1 : h ? 1 : D ? ab(D, a) - ab(D, b) : 0;
                if (f === h) return g(a, b);
                for (c = a; c = c.parentNode;) i.unshift(c);
                for (c = b; c = c.parentNode;) j.unshift(c);
                for (; i[e] === j[e];) e++;
                return e ? g(i[e], j[e]) : i[e] === O ? -1 : j[e] === O ? 1 : 0
            }, d) : G
        }, b.matches = function(a, c) {
            return b(a, null, null, c)
        }, b.matchesSelector = function(a, c) {
            if ((a.ownerDocument || a) !== G && F(a), c = c.replace(lb, "='$1']"), !(!v.matchesSelector || !I || K && K.test(c) || J && J.test(c))) try {
                var d = L.call(a, c);
                if (d || v.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
            } catch (e) {}
            return b(c, G, null, [a]).length > 0
        }, b.contains = function(a, b) {
            return (a.ownerDocument || a) !== G && F(a), M(a, b)
        }, b.attr = function(a, b) {
            (a.ownerDocument || a) !== G && F(a);
            var c = w.attrHandle[b.toLowerCase()],
                d = c && W.call(w.attrHandle, b.toLowerCase()) ? c(a, b, !I) : void 0;
            return void 0 !== d ? d : v.attributes || !I ? a.getAttribute(b) : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
        }, b.error = function(a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        }, b.uniqueSort = function(a) {
            var b, c = [],
                d = 0,
                e = 0;
            if (E = !v.detectDuplicates, D = !v.sortStable && a.slice(0), a.sort(U), E) {
                for (; b = a[e++];) b === a[e] && (d = c.push(e));
                for (; d--;) a.splice(c[d], 1)
            }
            return D = null, a
        }, x = b.getText = function(a) {
            var b, c = "",
                d = 0,
                e = a.nodeType;
            if (e) {
                if (1 === e || 9 === e || 11 === e) {
                    if ("string" == typeof a.textContent) return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling) c += x(a)
                } else if (3 === e || 4 === e) return a.nodeValue
            } else
                for (; b = a[d++];) c += x(b);
            return c
        }, w = b.selectors = {
            cacheLength: 50,
            createPseudo: d,
            match: ob,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(a) {
                    return a[1] = a[1].replace(vb, wb), a[3] = (a[3] || a[4] || a[5] || "").replace(vb, wb), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                },
                CHILD: function(a) {
                    return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && b.error(a[0]), a
                },
                PSEUDO: function(a) {
                    var b, c = !a[6] && a[2];
                    return ob.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && mb.test(c) && (b = z(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
                }
            },
            filter: {
                TAG: function(a) {
                    var b = a.replace(vb, wb).toLowerCase();
                    return "*" === a ? function() {
                        return !0
                    } : function(a) {
                        return a.nodeName && a.nodeName.toLowerCase() === b
                    }
                },
                CLASS: function(a) {
                    var b = R[a + " "];
                    return b || (b = new RegExp("(^|" + cb + ")" + a + "(" + cb + "|$)")) && R(a, function(a) {
                        return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "")
                    })
                },
                ATTR: function(a, c, d) {
                    return function(e) {
                        var f = b.attr(e, a);
                        return null == f ? "!=" === c : c ? (f += "", "=" === c ? f === d : "!=" === c ? f !== d : "^=" === c ? d && 0 === f.indexOf(d) : "*=" === c ? d && f.indexOf(d) > -1 : "$=" === c ? d && f.slice(-d.length) === d : "~=" === c ? (" " + f.replace(hb, " ") + " ").indexOf(d) > -1 : "|=" === c ? f === d || f.slice(0, d.length + 1) === d + "-" : !1) : !0
                    }
                },
                CHILD: function(a, b, c, d, e) {
                    var f = "nth" !== a.slice(0, 3),
                        g = "last" !== a.slice(-4),
                        h = "of-type" === b;
                    return 1 === d && 0 === e ? function(a) {
                        return !!a.parentNode
                    } : function(b, c, i) {
                        var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling",
                            q = b.parentNode,
                            r = h && b.nodeName.toLowerCase(),
                            s = !i && !h;
                        if (q) {
                            if (f) {
                                for (; p;) {
                                    for (l = b; l = l[p];)
                                        if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;
                                    o = p = "only" === a && !o && "nextSibling"
                                }
                                return !0
                            }
                            if (o = [g ? q.firstChild : q.lastChild], g && s) {
                                for (k = q[N] || (q[N] = {}), j = k[a] || [], n = j[0] === P && j[1], m = j[0] === P && j[2], l = n && q.childNodes[n]; l = ++n && l && l[p] || (m = n = 0) || o.pop();)
                                    if (1 === l.nodeType && ++m && l === b) {
                                        k[a] = [P, n, m];
                                        break
                                    }
                            } else if (s && (j = (b[N] || (b[N] = {}))[a]) && j[0] === P) m = j[1];
                            else
                                for (;
                                    (l = ++n && l && l[p] || (m = n = 0) || o.pop()) && ((h ? l.nodeName.toLowerCase() !== r : 1 !== l.nodeType) || !++m || (s && ((l[N] || (l[N] = {}))[a] = [P, m]), l !== b)););
                            return m -= e, m === d || m % d === 0 && m / d >= 0
                        }
                    }
                },
                PSEUDO: function(a, c) {
                    var e, f = w.pseudos[a] || w.setFilters[a.toLowerCase()] || b.error("unsupported pseudo: " + a);
                    return f[N] ? f(c) : f.length > 1 ? (e = [a, a, "", c], w.setFilters.hasOwnProperty(a.toLowerCase()) ? d(function(a, b) {
                        for (var d, e = f(a, c), g = e.length; g--;) d = ab(a, e[g]), a[d] = !(b[d] = e[g])
                    }) : function(a) {
                        return f(a, 0, e)
                    }) : f
                }
            },
            pseudos: {
                not: d(function(a) {
                    var b = [],
                        c = [],
                        e = A(a.replace(ib, "$1"));
                    return e[N] ? d(function(a, b, c, d) {
                        for (var f, g = e(a, null, d, []), h = a.length; h--;)(f = g[h]) && (a[h] = !(b[h] = f))
                    }) : function(a, d, f) {
                        return b[0] = a, e(b, null, f, c), b[0] = null, !c.pop()
                    }
                }),
                has: d(function(a) {
                    return function(c) {
                        return b(a, c).length > 0
                    }
                }),
                contains: d(function(a) {
                    return a = a.replace(vb, wb),
                        function(b) {
                            return (b.textContent || b.innerText || x(b)).indexOf(a) > -1
                        }
                }),
                lang: d(function(a) {
                    return nb.test(a || "") || b.error("unsupported lang: " + a), a = a.replace(vb, wb).toLowerCase(),
                        function(b) {
                            var c;
                            do
                                if (c = I ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-");
                            while ((b = b.parentNode) && 1 === b.nodeType);
                            return !1
                        }
                }),
                target: function(b) {
                    var c = a.location && a.location.hash;
                    return c && c.slice(1) === b.id
                },
                root: function(a) {
                    return a === H
                },
                focus: function(a) {
                    return a === G.activeElement && (!G.hasFocus || G.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                },
                enabled: function(a) {
                    return a.disabled === !1
                },
                disabled: function(a) {
                    return a.disabled === !0
                },
                checked: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && !!a.checked || "option" === b && !!a.selected
                },
                selected: function(a) {
                    return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
                },
                empty: function(a) {
                    for (a = a.firstChild; a; a = a.nextSibling)
                        if (a.nodeType < 6) return !1;
                    return !0
                },
                parent: function(a) {
                    return !w.pseudos.empty(a)
                },
                header: function(a) {
                    return qb.test(a.nodeName)
                },
                input: function(a) {
                    return pb.test(a.nodeName)
                },
                button: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && "button" === a.type || "button" === b
                },
                text: function(a) {
                    var b;
                    return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
                },
                first: j(function() {
                    return [0]
                }),
                last: j(function(a, b) {
                    return [b - 1]
                }),
                eq: j(function(a, b, c) {
                    return [0 > c ? c + b : c]
                }),
                even: j(function(a, b) {
                    for (var c = 0; b > c; c += 2) a.push(c);
                    return a
                }),
                odd: j(function(a, b) {
                    for (var c = 1; b > c; c += 2) a.push(c);
                    return a
                }),
                lt: j(function(a, b, c) {
                    for (var d = 0 > c ? c + b : c; --d >= 0;) a.push(d);
                    return a
                }),
                gt: j(function(a, b, c) {
                    for (var d = 0 > c ? c + b : c; ++d < b;) a.push(d);
                    return a
                })
            }
        }, w.pseudos.nth = w.pseudos.eq;
        for (u in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) w.pseudos[u] = h(u);
        for (u in {
                submit: !0,
                reset: !0
            }) w.pseudos[u] = i(u);
        return l.prototype = w.filters = w.pseudos, w.setFilters = new l, z = b.tokenize = function(a, c) {
            var d, e, f, g, h, i, j, k = S[a + " "];
            if (k) return c ? 0 : k.slice(0);
            for (h = a, i = [], j = w.preFilter; h;) {
                (!d || (e = jb.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), d = !1, (e = kb.exec(h)) && (d = e.shift(), f.push({
                    value: d,
                    type: e[0].replace(ib, " ")
                }), h = h.slice(d.length));
                for (g in w.filter) !(e = ob[g].exec(h)) || j[g] && !(e = j[g](e)) || (d = e.shift(), f.push({
                    value: d,
                    type: g,
                    matches: e
                }), h = h.slice(d.length));
                if (!d) break
            }
            return c ? h.length : h ? b.error(a) : S(a, i).slice(0)
        }, A = b.compile = function(a, b) {
            var c, d = [],
                e = [],
                f = T[a + " "];
            if (!f) {
                for (b || (b = z(a)), c = b.length; c--;) f = s(b[c]), f[N] ? d.push(f) : e.push(f);
                f = T(a, t(e, d)), f.selector = a
            }
            return f
        }, B = b.select = function(a, b, c, d) {
            var e, f, g, h, i, j = "function" == typeof a && a,
                l = !d && z(a = j.selector || a);
            if (c = c || [], 1 === l.length) {
                if (f = l[0] = l[0].slice(0), f.length > 2 && "ID" === (g = f[0]).type && v.getById && 9 === b.nodeType && I && w.relative[f[1].type]) {
                    if (b = (w.find.ID(g.matches[0].replace(vb, wb), b) || [])[0], !b) return c;
                    j && (b = b.parentNode), a = a.slice(f.shift().value.length)
                }
                for (e = ob.needsContext.test(a) ? 0 : f.length; e-- && (g = f[e], !w.relative[h = g.type]);)
                    if ((i = w.find[h]) && (d = i(g.matches[0].replace(vb, wb), tb.test(f[0].type) && k(b.parentNode) || b))) {
                        if (f.splice(e, 1), a = d.length && m(f), !a) return $.apply(c, d), c;
                        break
                    }
            }
            return (j || A(a, l))(d, b, !I, c, tb.test(a) && k(b.parentNode) || b), c
        }, v.sortStable = N.split("").sort(U).join("") === N, v.detectDuplicates = !!E, F(), v.sortDetached = e(function(a) {
            return 1 & a.compareDocumentPosition(G.createElement("div"))
        }), e(function(a) {
            return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
        }) || f("type|href|height|width", function(a, b, c) {
            return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
        }), v.attributes && e(function(a) {
            return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
        }) || f("value", function(a, b, c) {
            return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
        }), e(function(a) {
            return null == a.getAttribute("disabled")
        }) || f(bb, function(a, b, c) {
            var d;
            return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
        }), b
    }(a);
    _.find = eb, _.expr = eb.selectors, _.expr[":"] = _.expr.pseudos, _.unique = eb.uniqueSort, _.text = eb.getText, _.isXMLDoc = eb.isXML, _.contains = eb.contains;
    var fb = _.expr.match.needsContext,
        gb = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        hb = /^.[^:#\[\.,]*$/;
    _.filter = function(a, b, c) {
        var d = b[0];
        return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? _.find.matchesSelector(d, a) ? [d] : [] : _.find.matches(a, _.grep(b, function(a) {
            return 1 === a.nodeType
        }))
    }, _.fn.extend({
        find: function(a) {
            var b, c = this.length,
                d = [],
                e = this;
            if ("string" != typeof a) return this.pushStack(_(a).filter(function() {
                for (b = 0; c > b; b++)
                    if (_.contains(e[b], this)) return !0
            }));
            for (b = 0; c > b; b++) _.find(a, e[b], d);
            return d = this.pushStack(c > 1 ? _.unique(d) : d), d.selector = this.selector ? this.selector + " " + a : a, d
        },
        filter: function(a) {
            return this.pushStack(d(this, a || [], !1))
        },
        not: function(a) {
            return this.pushStack(d(this, a || [], !0))
        },
        is: function(a) {
            return !!d(this, "string" == typeof a && fb.test(a) ? _(a) : a || [], !1).length
        }
    });
    var ib, jb = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        kb = _.fn.init = function(a, b) {
            var c, d;
            if (!a) return this;
            if ("string" == typeof a) {
                if (c = "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3 ? [null, a, null] : jb.exec(a), !c || !c[1] && b) return !b || b.jquery ? (b || ib).find(a) : this.constructor(b).find(a);
                if (c[1]) {
                    if (b = b instanceof _ ? b[0] : b, _.merge(this, _.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : Z, !0)), gb.test(c[1]) && _.isPlainObject(b))
                        for (c in b) _.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
                    return this
                }
                return d = Z.getElementById(c[2]), d && d.parentNode && (this.length = 1, this[0] = d), this.context = Z, this.selector = a, this
            }
            return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : _.isFunction(a) ? "undefined" != typeof ib.ready ? ib.ready(a) : a(_) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), _.makeArray(a, this))
        };
    kb.prototype = _.fn, ib = _(Z);
    var lb = /^(?:parents|prev(?:Until|All))/,
        mb = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    _.extend({
        dir: function(a, b, c) {
            for (var d = [], e = void 0 !== c;
                (a = a[b]) && 9 !== a.nodeType;)
                if (1 === a.nodeType) {
                    if (e && _(a).is(c)) break;
                    d.push(a)
                }
            return d
        },
        sibling: function(a, b) {
            for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
            return c
        }
    }), _.fn.extend({
        has: function(a) {
            var b = _(a, this),
                c = b.length;
            return this.filter(function() {
                for (var a = 0; c > a; a++)
                    if (_.contains(this, b[a])) return !0
            })
        },
        closest: function(a, b) {
            for (var c, d = 0, e = this.length, f = [], g = fb.test(a) || "string" != typeof a ? _(a, b || this.context) : 0; e > d; d++)
                for (c = this[d]; c && c !== b; c = c.parentNode)
                    if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && _.find.matchesSelector(c, a))) {
                        f.push(c);
                        break
                    }
            return this.pushStack(f.length > 1 ? _.unique(f) : f)
        },
        index: function(a) {
            return a ? "string" == typeof a ? U.call(_(a), this[0]) : U.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(a, b) {
            return this.pushStack(_.unique(_.merge(this.get(), _(a, b))))
        },
        addBack: function(a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
        }
    }), _.each({
        parent: function(a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null
        },
        parents: function(a) {
            return _.dir(a, "parentNode")
        },
        parentsUntil: function(a, b, c) {
            return _.dir(a, "parentNode", c)
        },
        next: function(a) {
            return e(a, "nextSibling")
        },
        prev: function(a) {
            return e(a, "previousSibling")
        },
        nextAll: function(a) {
            return _.dir(a, "nextSibling")
        },
        prevAll: function(a) {
            return _.dir(a, "previousSibling")
        },
        nextUntil: function(a, b, c) {
            return _.dir(a, "nextSibling", c)
        },
        prevUntil: function(a, b, c) {
            return _.dir(a, "previousSibling", c)
        },
        siblings: function(a) {
            return _.sibling((a.parentNode || {}).firstChild, a)
        },
        children: function(a) {
            return _.sibling(a.firstChild)
        },
        contents: function(a) {
            return a.contentDocument || _.merge([], a.childNodes)
        }
    }, function(a, b) {
        _.fn[a] = function(c, d) {
            var e = _.map(this, b, c);
            return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = _.filter(d, e)), this.length > 1 && (mb[a] || _.unique(e), lb.test(a) && e.reverse()), this.pushStack(e)
        }
    });
    var nb = /\S+/g,
        ob = {};
    _.Callbacks = function(a) {
        a = "string" == typeof a ? ob[a] || f(a) : _.extend({}, a);
        var b, c, d, e, g, h, i = [],
            j = !a.once && [],
            k = function(f) {
                for (b = a.memory && f, c = !0, h = e || 0, e = 0, g = i.length, d = !0; i && g > h; h++)
                    if (i[h].apply(f[0], f[1]) === !1 && a.stopOnFalse) {
                        b = !1;
                        break
                    }
                d = !1, i && (j ? j.length && k(j.shift()) : b ? i = [] : l.disable())
            },
            l = {
                add: function() {
                    if (i) {
                        var c = i.length;
                        ! function f(b) {
                            _.each(b, function(b, c) {
                                var d = _.type(c);
                                "function" === d ? a.unique && l.has(c) || i.push(c) : c && c.length && "string" !== d && f(c)
                            })
                        }(arguments), d ? g = i.length : b && (e = c, k(b))
                    }
                    return this
                },
                remove: function() {
                    return i && _.each(arguments, function(a, b) {
                        for (var c;
                            (c = _.inArray(b, i, c)) > -1;) i.splice(c, 1), d && (g >= c && g--, h >= c && h--)
                    }), this
                },
                has: function(a) {
                    return a ? _.inArray(a, i) > -1 : !(!i || !i.length)
                },
                empty: function() {
                    return i = [], g = 0, this
                },
                disable: function() {
                    return i = j = b = void 0, this
                },
                disabled: function() {
                    return !i
                },
                lock: function() {
                    return j = void 0, b || l.disable(), this
                },
                locked: function() {
                    return !j
                },
                fireWith: function(a, b) {
                    return !i || c && !j || (b = b || [], b = [a, b.slice ? b.slice() : b], d ? j.push(b) : k(b)), this
                },
                fire: function() {
                    return l.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!c
                }
            };
        return l
    }, _.extend({
        Deferred: function(a) {
            var b = [
                    ["resolve", "done", _.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", _.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", _.Callbacks("memory")]
                ],
                c = "pending",
                d = {
                    state: function() {
                        return c
                    },
                    always: function() {
                        return e.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var a = arguments;
                        return _.Deferred(function(c) {
                            _.each(b, function(b, f) {
                                var g = _.isFunction(a[b]) && a[b];
                                e[f[1]](function() {
                                    var a = g && g.apply(this, arguments);
                                    a && _.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
                                })
                            }), a = null
                        }).promise()
                    },
                    promise: function(a) {
                        return null != a ? _.extend(a, d) : d
                    }
                },
                e = {};
            return d.pipe = d.then, _.each(b, function(a, f) {
                var g = f[2],
                    h = f[3];
                d[f[1]] = g.add, h && g.add(function() {
                    c = h
                }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function() {
                    return e[f[0] + "With"](this === e ? d : this, arguments), this
                }, e[f[0] + "With"] = g.fireWith
            }), d.promise(e), a && a.call(e, e), e
        },
        when: function(a) {
            var b, c, d, e = 0,
                f = R.call(arguments),
                g = f.length,
                h = 1 !== g || a && _.isFunction(a.promise) ? g : 0,
                i = 1 === h ? a : _.Deferred(),
                j = function(a, c, d) {
                    return function(e) {
                        c[a] = this, d[a] = arguments.length > 1 ? R.call(arguments) : e, d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d)
                    }
                };
            if (g > 1)
                for (b = new Array(g), c = new Array(g), d = new Array(g); g > e; e++) f[e] && _.isFunction(f[e].promise) ? f[e].promise().done(j(e, d, f)).fail(i.reject).progress(j(e, c, b)) : --h;
            return h || i.resolveWith(d, f), i.promise()
        }
    });
    var pb;
    _.fn.ready = function(a) {
        return _.ready.promise().done(a), this
    }, _.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(a) {
            a ? _.readyWait++ : _.ready(!0)
        },
        ready: function(a) {
            (a === !0 ? --_.readyWait : _.isReady) || (_.isReady = !0, a !== !0 && --_.readyWait > 0 || (pb.resolveWith(Z, [_]), _.fn.triggerHandler && (_(Z).triggerHandler("ready"), _(Z).off("ready"))))
        }
    }), _.ready.promise = function(b) {
        return pb || (pb = _.Deferred(), "complete" === Z.readyState ? setTimeout(_.ready) : (Z.addEventListener("DOMContentLoaded", g, !1), a.addEventListener("load", g, !1))), pb.promise(b)
    }, _.ready.promise();
    var qb = _.access = function(a, b, c, d, e, f, g) {
        var h = 0,
            i = a.length,
            j = null == c;
        if ("object" === _.type(c)) {
            e = !0;
            for (h in c) _.access(a, b, h, c[h], !0, f, g)
        } else if (void 0 !== d && (e = !0, _.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function(a, b, c) {
                return j.call(_(a), c)
            })), b))
            for (; i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
        return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
    };
    _.acceptData = function(a) {
        return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType
    }, h.uid = 1, h.accepts = _.acceptData, h.prototype = {
        key: function(a) {
            if (!h.accepts(a)) return 0;
            var b = {},
                c = a[this.expando];
            if (!c) {
                c = h.uid++;
                try {
                    b[this.expando] = {
                        value: c
                    }, Object.defineProperties(a, b)
                } catch (d) {
                    b[this.expando] = c, _.extend(a, b)
                }
            }
            return this.cache[c] || (this.cache[c] = {}), c
        },
        set: function(a, b, c) {
            var d, e = this.key(a),
                f = this.cache[e];
            if ("string" == typeof b) f[b] = c;
            else if (_.isEmptyObject(f)) _.extend(this.cache[e], b);
            else
                for (d in b) f[d] = b[d];
            return f
        },
        get: function(a, b) {
            var c = this.cache[this.key(a)];
            return void 0 === b ? c : c[b]
        },
        access: function(a, b, c) {
            var d;
            return void 0 === b || b && "string" == typeof b && void 0 === c ? (d = this.get(a, b), void 0 !== d ? d : this.get(a, _.camelCase(b))) : (this.set(a, b, c), void 0 !== c ? c : b)
        },
        remove: function(a, b) {
            var c, d, e, f = this.key(a),
                g = this.cache[f];
            if (void 0 === b) this.cache[f] = {};
            else {
                _.isArray(b) ? d = b.concat(b.map(_.camelCase)) : (e = _.camelCase(b), b in g ? d = [b, e] : (d = e, d = d in g ? [d] : d.match(nb) || [])), c = d.length;
                for (; c--;) delete g[d[c]]
            }
        },
        hasData: function(a) {
            return !_.isEmptyObject(this.cache[a[this.expando]] || {})
        },
        discard: function(a) {
            a[this.expando] && delete this.cache[a[this.expando]]
        }
    };
    var rb = new h,
        sb = new h,
        tb = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        ub = /([A-Z])/g;
    _.extend({
        hasData: function(a) {
            return sb.hasData(a) || rb.hasData(a)
        },
        data: function(a, b, c) {
            return sb.access(a, b, c)
        },
        removeData: function(a, b) {
            sb.remove(a, b)
        },
        _data: function(a, b, c) {
            return rb.access(a, b, c)
        },
        _removeData: function(a, b) {
            rb.remove(a, b)
        }
    }), _.fn.extend({
        data: function(a, b) {
            var c, d, e, f = this[0],
                g = f && f.attributes;
            if (void 0 === a) {
                if (this.length && (e = sb.get(f), 1 === f.nodeType && !rb.get(f, "hasDataAttrs"))) {
                    for (c = g.length; c--;) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = _.camelCase(d.slice(5)), i(f, d, e[d])));
                    rb.set(f, "hasDataAttrs", !0)
                }
                return e
            }
            return "object" == typeof a ? this.each(function() {
                sb.set(this, a)
            }) : qb(this, function(b) {
                var c, d = _.camelCase(a);
                if (f && void 0 === b) {
                    if (c = sb.get(f, a), void 0 !== c) return c;
                    if (c = sb.get(f, d), void 0 !== c) return c;
                    if (c = i(f, d, void 0), void 0 !== c) return c
                } else this.each(function() {
                    var c = sb.get(this, d);
                    sb.set(this, d, b), -1 !== a.indexOf("-") && void 0 !== c && sb.set(this, a, b)
                })
            }, null, b, arguments.length > 1, null, !0)
        },
        removeData: function(a) {
            return this.each(function() {
                sb.remove(this, a)
            })
        }
    }), _.extend({
        queue: function(a, b, c) {
            var d;
            return a ? (b = (b || "fx") + "queue", d = rb.get(a, b), c && (!d || _.isArray(c) ? d = rb.access(a, b, _.makeArray(c)) : d.push(c)), d || []) : void 0
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var c = _.queue(a, b),
                d = c.length,
                e = c.shift(),
                f = _._queueHooks(a, b),
                g = function() {
                    _.dequeue(a, b)
                };
            "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
        },
        _queueHooks: function(a, b) {
            var c = b + "queueHooks";
            return rb.get(a, c) || rb.access(a, c, {
                empty: _.Callbacks("once memory").add(function() {
                    rb.remove(a, [b + "queue", c])
                })
            })
        }
    }), _.fn.extend({
        queue: function(a, b) {
            var c = 2;
            return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? _.queue(this[0], a) : void 0 === b ? this : this.each(function() {
                var c = _.queue(this, a, b);
                _._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && _.dequeue(this, a)
            })
        },
        dequeue: function(a) {
            return this.each(function() {
                _.dequeue(this, a)
            })
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", [])
        },
        promise: function(a, b) {
            var c, d = 1,
                e = _.Deferred(),
                f = this,
                g = this.length,
                h = function() {
                    --d || e.resolveWith(f, [f])
                };
            for ("string" != typeof a && (b = a, a = void 0), a = a || "fx"; g--;) c = rb.get(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
            return h(), e.promise(b)
        }
    });
    var vb = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        wb = ["Top", "Right", "Bottom", "Left"],
        xb = function(a, b) {
            return a = b || a, "none" === _.css(a, "display") || !_.contains(a.ownerDocument, a)
        },
        yb = /^(?:checkbox|radio)$/i;
    ! function() {
        var a = Z.createDocumentFragment(),
            b = a.appendChild(Z.createElement("div")),
            c = Z.createElement("input");
        c.setAttribute("type", "radio"), c.setAttribute("checked", "checked"), c.setAttribute("name", "t"), b.appendChild(c), Y.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, b.innerHTML = "<textarea>x</textarea>", Y.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue
    }();
    var zb = "undefined";
    Y.focusinBubbles = "onfocusin" in a;
    var Ab = /^key/,
        Bb = /^(?:mouse|pointer|contextmenu)|click/,
        Cb = /^(?:focusinfocus|focusoutblur)$/,
        Db = /^([^.]*)(?:\.(.+)|)$/;
    _.event = {
        global: {},
        add: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q = rb.get(a);
            if (q)
                for (c.handler && (f = c, c = f.handler, e = f.selector), c.guid || (c.guid = _.guid++), (i = q.events) || (i = q.events = {}), (g = q.handle) || (g = q.handle = function(b) {
                        return typeof _ !== zb && _.event.triggered !== b.type ? _.event.dispatch.apply(a, arguments) : void 0
                    }), b = (b || "").match(nb) || [""], j = b.length; j--;) h = Db.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n && (l = _.event.special[n] || {}, n = (e ? l.delegateType : l.bindType) || n, l = _.event.special[n] || {}, k = _.extend({
                    type: n,
                    origType: p,
                    data: d,
                    handler: c,
                    guid: c.guid,
                    selector: e,
                    needsContext: e && _.expr.match.needsContext.test(e),
                    namespace: o.join(".")
                }, f), (m = i[n]) || (m = i[n] = [], m.delegateCount = 0, l.setup && l.setup.call(a, d, o, g) !== !1 || a.addEventListener && a.addEventListener(n, g, !1)), l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, k) : m.push(k), _.event.global[n] = !0)
        },
        remove: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q = rb.hasData(a) && rb.get(a);
            if (q && (i = q.events)) {
                for (b = (b || "").match(nb) || [""], j = b.length; j--;)
                    if (h = Db.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
                        for (l = _.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = i[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = f = m.length; f--;) k = m[f], !e && p !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1), k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
                        g && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || _.removeEvent(a, n, q.handle), delete i[n])
                    } else
                        for (n in i) _.event.remove(a, n + b[j], c, d, !0);
                _.isEmptyObject(i) && (delete q.handle, rb.remove(a, "events"))
            }
        },
        trigger: function(b, c, d, e) {
            var f, g, h, i, j, k, l, m = [d || Z],
                n = X.call(b, "type") ? b.type : b,
                o = X.call(b, "namespace") ? b.namespace.split(".") : [];
            if (g = h = d = d || Z, 3 !== d.nodeType && 8 !== d.nodeType && !Cb.test(n + _.event.triggered) && (n.indexOf(".") >= 0 && (o = n.split("."), n = o.shift(), o.sort()), j = n.indexOf(":") < 0 && "on" + n, b = b[_.expando] ? b : new _.Event(n, "object" == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = o.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : _.makeArray(c, [b]), l = _.event.special[n] || {}, e || !l.trigger || l.trigger.apply(d, c) !== !1)) {
                if (!e && !l.noBubble && !_.isWindow(d)) {
                    for (i = l.delegateType || n, Cb.test(i + n) || (g = g.parentNode); g; g = g.parentNode) m.push(g), h = g;
                    h === (d.ownerDocument || Z) && m.push(h.defaultView || h.parentWindow || a)
                }
                for (f = 0;
                    (g = m[f++]) && !b.isPropagationStopped();) b.type = f > 1 ? i : l.bindType || n, k = (rb.get(g, "events") || {})[b.type] && rb.get(g, "handle"), k && k.apply(g, c), k = j && g[j], k && k.apply && _.acceptData(g) && (b.result = k.apply(g, c), b.result === !1 && b.preventDefault());
                return b.type = n, e || b.isDefaultPrevented() || l._default && l._default.apply(m.pop(), c) !== !1 || !_.acceptData(d) || j && _.isFunction(d[n]) && !_.isWindow(d) && (h = d[j], h && (d[j] = null), _.event.triggered = n, d[n](), _.event.triggered = void 0, h && (d[j] = h)), b.result
            }
        },
        dispatch: function(a) {
            a = _.event.fix(a);
            var b, c, d, e, f, g = [],
                h = R.call(arguments),
                i = (rb.get(this, "events") || {})[a.type] || [],
                j = _.event.special[a.type] || {};
            if (h[0] = a, a.delegateTarget = this, !j.preDispatch || j.preDispatch.call(this, a) !== !1) {
                for (g = _.event.handlers.call(this, a, i), b = 0;
                    (e = g[b++]) && !a.isPropagationStopped();)
                    for (a.currentTarget = e.elem, c = 0;
                        (f = e.handlers[c++]) && !a.isImmediatePropagationStopped();)(!a.namespace_re || a.namespace_re.test(f.namespace)) && (a.handleObj = f, a.data = f.data, d = ((_.event.special[f.origType] || {}).handle || f.handler).apply(e.elem, h), void 0 !== d && (a.result = d) === !1 && (a.preventDefault(), a.stopPropagation()));
                return j.postDispatch && j.postDispatch.call(this, a), a.result
            }
        },
        handlers: function(a, b) {
            var c, d, e, f, g = [],
                h = b.delegateCount,
                i = a.target;
            if (h && i.nodeType && (!a.button || "click" !== a.type))
                for (; i !== this; i = i.parentNode || this)
                    if (i.disabled !== !0 || "click" !== a.type) {
                        for (d = [], c = 0; h > c; c++) f = b[c], e = f.selector + " ", void 0 === d[e] && (d[e] = f.needsContext ? _(e, this).index(i) >= 0 : _.find(e, this, null, [i]).length), d[e] && d.push(f);
                        d.length && g.push({
                            elem: i,
                            handlers: d
                        })
                    }
            return h < b.length && g.push({
                elem: this,
                handlers: b.slice(h)
            }), g
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(a, b) {
                return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(a, b) {
                var c, d, e, f = b.button;
                return null == a.pageX && null != b.clientX && (c = a.target.ownerDocument || Z, d = c.documentElement, e = c.body, a.pageX = b.clientX + (d && d.scrollLeft || e && e.scrollLeft || 0) - (d && d.clientLeft || e && e.clientLeft || 0), a.pageY = b.clientY + (d && d.scrollTop || e && e.scrollTop || 0) - (d && d.clientTop || e && e.clientTop || 0)), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a
            }
        },
        fix: function(a) {
            if (a[_.expando]) return a;
            var b, c, d, e = a.type,
                f = a,
                g = this.fixHooks[e];
            for (g || (this.fixHooks[e] = g = Bb.test(e) ? this.mouseHooks : Ab.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new _.Event(f), b = d.length; b--;) c = d[b], a[c] = f[c];
            return a.target || (a.target = Z), 3 === a.target.nodeType && (a.target = a.target.parentNode), g.filter ? g.filter(a, f) : a
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    return this !== l() && this.focus ? (this.focus(), !1) : void 0
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === l() && this.blur ? (this.blur(), !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return "checkbox" === this.type && this.click && _.nodeName(this, "input") ? (this.click(), !1) : void 0
                },
                _default: function(a) {
                    return _.nodeName(a.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(a) {
                    void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
                }
            }
        },
        simulate: function(a, b, c, d) {
            var e = _.extend(new _.Event, c, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            d ? _.event.trigger(e, null, b) : _.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
        }
    }, _.removeEvent = function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    }, _.Event = function(a, b) {
        return this instanceof _.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? j : k) : this.type = a, b && _.extend(this, b), this.timeStamp = a && a.timeStamp || _.now(), void(this[_.expando] = !0)) : new _.Event(a, b)
    }, _.Event.prototype = {
        isDefaultPrevented: k,
        isPropagationStopped: k,
        isImmediatePropagationStopped: k,
        preventDefault: function() {
            var a = this.originalEvent;
            this.isDefaultPrevented = j, a && a.preventDefault && a.preventDefault()
        },
        stopPropagation: function() {
            var a = this.originalEvent;
            this.isPropagationStopped = j, a && a.stopPropagation && a.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var a = this.originalEvent;
            this.isImmediatePropagationStopped = j, a && a.stopImmediatePropagation && a.stopImmediatePropagation(), this.stopPropagation()
        }
    }, _.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(a, b) {
        _.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var c, d = this,
                    e = a.relatedTarget,
                    f = a.handleObj;
                return (!e || e !== d && !_.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
            }
        }
    }), Y.focusinBubbles || _.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        var c = function(a) {
            _.event.simulate(b, a.target, _.event.fix(a), !0)
        };
        _.event.special[b] = {
            setup: function() {
                var d = this.ownerDocument || this,
                    e = rb.access(d, b);
                e || d.addEventListener(a, c, !0), rb.access(d, b, (e || 0) + 1)
            },
            teardown: function() {
                var d = this.ownerDocument || this,
                    e = rb.access(d, b) - 1;
                e ? rb.access(d, b, e) : (d.removeEventListener(a, c, !0), rb.remove(d, b))
            }
        }
    }), _.fn.extend({
        on: function(a, b, c, d, e) {
            var f, g;
            if ("object" == typeof a) {
                "string" != typeof b && (c = c || b, b = void 0);
                for (g in a) this.on(g, b, c, a[g], e);
                return this
            }
            if (null == c && null == d ? (d = b, c = b = void 0) : null == d && ("string" == typeof b ? (d = c, c = void 0) : (d = c, c = b, b = void 0)), d === !1) d = k;
            else if (!d) return this;
            return 1 === e && (f = d, d = function(a) {
                return _().off(a), f.apply(this, arguments)
            }, d.guid = f.guid || (f.guid = _.guid++)), this.each(function() {
                _.event.add(this, a, d, c, b)
            })
        },
        one: function(a, b, c, d) {
            return this.on(a, b, c, d, 1)
        },
        off: function(a, b, c) {
            var d, e;
            if (a && a.preventDefault && a.handleObj) return d = a.handleObj, _(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
            if ("object" == typeof a) {
                for (e in a) this.off(e, b, a[e]);
                return this
            }
            return (b === !1 || "function" == typeof b) && (c = b, b = void 0), c === !1 && (c = k), this.each(function() {
                _.event.remove(this, a, c, b)
            })
        },
        trigger: function(a, b) {
            return this.each(function() {
                _.event.trigger(a, b, this)
            })
        },
        triggerHandler: function(a, b) {
            var c = this[0];
            return c ? _.event.trigger(a, b, c, !0) : void 0
        }
    });
    var Eb = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        Fb = /<([\w:]+)/,
        Gb = /<|&#?\w+;/,
        Hb = /<(?:script|style|link)/i,
        Ib = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Jb = /^$|\/(?:java|ecma)script/i,
        Kb = /^true\/(.*)/,
        Lb = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        Mb = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    Mb.optgroup = Mb.option, Mb.tbody = Mb.tfoot = Mb.colgroup = Mb.caption = Mb.thead, Mb.th = Mb.td, _.extend({
        clone: function(a, b, c) {
            var d, e, f, g, h = a.cloneNode(!0),
                i = _.contains(a.ownerDocument, a);
            if (!(Y.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || _.isXMLDoc(a)))
                for (g = r(h), f = r(a), d = 0, e = f.length; e > d; d++) s(f[d], g[d]);
            if (b)
                if (c)
                    for (f = f || r(a), g = g || r(h), d = 0, e = f.length; e > d; d++) q(f[d], g[d]);
                else q(a, h);
            return g = r(h, "script"), g.length > 0 && p(g, !i && r(a, "script")), h
        },
        buildFragment: function(a, b, c, d) {
            for (var e, f, g, h, i, j, k = b.createDocumentFragment(), l = [], m = 0, n = a.length; n > m; m++)
                if (e = a[m], e || 0 === e)
                    if ("object" === _.type(e)) _.merge(l, e.nodeType ? [e] : e);
                    else if (Gb.test(e)) {
                for (f = f || k.appendChild(b.createElement("div")), g = (Fb.exec(e) || ["", ""])[1].toLowerCase(), h = Mb[g] || Mb._default, f.innerHTML = h[1] + e.replace(Eb, "<$1></$2>") + h[2], j = h[0]; j--;) f = f.lastChild;
                _.merge(l, f.childNodes), f = k.firstChild, f.textContent = ""
            } else l.push(b.createTextNode(e));
            for (k.textContent = "", m = 0; e = l[m++];)
                if ((!d || -1 === _.inArray(e, d)) && (i = _.contains(e.ownerDocument, e), f = r(k.appendChild(e), "script"), i && p(f), c))
                    for (j = 0; e = f[j++];) Jb.test(e.type || "") && c.push(e);
            return k
        },
        cleanData: function(a) {
            for (var b, c, d, e, f = _.event.special, g = 0; void 0 !== (c = a[g]); g++) {
                if (_.acceptData(c) && (e = c[rb.expando], e && (b = rb.cache[e]))) {
                    if (b.events)
                        for (d in b.events) f[d] ? _.event.remove(c, d) : _.removeEvent(c, d, b.handle);
                    rb.cache[e] && delete rb.cache[e]
                }
                delete sb.cache[c[sb.expando]]
            }
        }
    }), _.fn.extend({
        text: function(a) {
            return qb(this, function(a) {
                return void 0 === a ? _.text(this) : this.empty().each(function() {
                    (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = a)
                })
            }, null, a, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = m(this, a);
                    b.appendChild(a)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = m(this, a);
                    b.insertBefore(a, b.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
            })
        },
        remove: function(a, b) {
            for (var c, d = a ? _.filter(a, this) : this, e = 0; null != (c = d[e]); e++) b || 1 !== c.nodeType || _.cleanData(r(c)), c.parentNode && (b && _.contains(c.ownerDocument, c) && p(r(c, "script")), c.parentNode.removeChild(c));
            return this
        },
        empty: function() {
            for (var a, b = 0; null != (a = this[b]); b++) 1 === a.nodeType && (_.cleanData(r(a, !1)), a.textContent = "");
            return this
        },
        clone: function(a, b) {
            return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function() {
                return _.clone(this, a, b)
            })
        },
        html: function(a) {
            return qb(this, function(a) {
                var b = this[0] || {},
                    c = 0,
                    d = this.length;
                if (void 0 === a && 1 === b.nodeType) return b.innerHTML;
                if ("string" == typeof a && !Hb.test(a) && !Mb[(Fb.exec(a) || ["", ""])[1].toLowerCase()]) {
                    a = a.replace(Eb, "<$1></$2>");
                    try {
                        for (; d > c; c++) b = this[c] || {}, 1 === b.nodeType && (_.cleanData(r(b, !1)), b.innerHTML = a);
                        b = 0
                    } catch (e) {}
                }
                b && this.empty().append(a)
            }, null, a, arguments.length)
        },
        replaceWith: function() {
            var a = arguments[0];
            return this.domManip(arguments, function(b) {
                a = this.parentNode, _.cleanData(r(this)), a && a.replaceChild(b, this)
            }), a && (a.length || a.nodeType) ? this : this.remove()
        },
        detach: function(a) {
            return this.remove(a, !0)
        },
        domManip: function(a, b) {
            a = S.apply([], a);
            var c, d, e, f, g, h, i = 0,
                j = this.length,
                k = this,
                l = j - 1,
                m = a[0],
                p = _.isFunction(m);
            if (p || j > 1 && "string" == typeof m && !Y.checkClone && Ib.test(m)) return this.each(function(c) {
                var d = k.eq(c);
                p && (a[0] = m.call(this, c, d.html())), d.domManip(a, b)
            });
            if (j && (c = _.buildFragment(a, this[0].ownerDocument, !1, this), d = c.firstChild, 1 === c.childNodes.length && (c = d), d)) {
                for (e = _.map(r(c, "script"), n), f = e.length; j > i; i++) g = c, i !== l && (g = _.clone(g, !0, !0), f && _.merge(e, r(g, "script"))), b.call(this[i], g, i);
                if (f)
                    for (h = e[e.length - 1].ownerDocument, _.map(e, o), i = 0; f > i; i++) g = e[i], Jb.test(g.type || "") && !rb.access(g, "globalEval") && _.contains(h, g) && (g.src ? _._evalUrl && _._evalUrl(g.src) : _.globalEval(g.textContent.replace(Lb, "")))
            }
            return this
        }
    }), _.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        _.fn[a] = function(a) {
            for (var c, d = [], e = _(a), f = e.length - 1, g = 0; f >= g; g++) c = g === f ? this : this.clone(!0), _(e[g])[b](c), T.apply(d, c.get());
            return this.pushStack(d)
        }
    });
    var Nb, Ob = {},
        Pb = /^margin/,
        Qb = new RegExp("^(" + vb + ")(?!px)[a-z%]+$", "i"),
        Rb = function(b) {
            return b.ownerDocument.defaultView.opener ? b.ownerDocument.defaultView.getComputedStyle(b, null) : a.getComputedStyle(b, null)
        };
    ! function() {
        function b() {
            g.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", g.innerHTML = "", e.appendChild(f);
            var b = a.getComputedStyle(g, null);
            c = "1%" !== b.top, d = "4px" === b.width, e.removeChild(f)
        }
        var c, d, e = Z.documentElement,
            f = Z.createElement("div"),
            g = Z.createElement("div");
        g.style && (g.style.backgroundClip = "content-box", g.cloneNode(!0).style.backgroundClip = "", Y.clearCloneStyle = "content-box" === g.style.backgroundClip, f.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", f.appendChild(g), a.getComputedStyle && _.extend(Y, {
            pixelPosition: function() {
                return b(), c
            },
            boxSizingReliable: function() {
                return null == d && b(), d
            },
            reliableMarginRight: function() {
                var b, c = g.appendChild(Z.createElement("div"));
                return c.style.cssText = g.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", c.style.marginRight = c.style.width = "0", g.style.width = "1px", e.appendChild(f), b = !parseFloat(a.getComputedStyle(c, null).marginRight), e.removeChild(f), g.removeChild(c), b
            }
        }))
    }(), _.swap = function(a, b, c, d) {
        var e, f, g = {};
        for (f in b) g[f] = a.style[f], a.style[f] = b[f];
        e = c.apply(a, d || []);
        for (f in b) a.style[f] = g[f];
        return e
    };
    var Sb = /^(none|table(?!-c[ea]).+)/,
        Tb = new RegExp("^(" + vb + ")(.*)$", "i"),
        Ub = new RegExp("^([+-])=(" + vb + ")", "i"),
        Vb = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        Wb = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        Xb = ["Webkit", "O", "Moz", "ms"];
    _.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = v(a, "opacity");
                        return "" === c ? "1" : c
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(a, b, c, d) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var e, f, g, h = _.camelCase(b),
                    i = a.style;
                return b = _.cssProps[h] || (_.cssProps[h] = x(i, h)), g = _.cssHooks[b] || _.cssHooks[h], void 0 === c ? g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b] : (f = typeof c, "string" === f && (e = Ub.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(_.css(a, b)), f = "number"), null != c && c === c && ("number" !== f || _.cssNumber[h] || (c += "px"), Y.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), g && "set" in g && void 0 === (c = g.set(a, c, d)) || (i[b] = c)), void 0)
            }
        },
        css: function(a, b, c, d) {
            var e, f, g, h = _.camelCase(b);
            return b = _.cssProps[h] || (_.cssProps[h] = x(a.style, h)), g = _.cssHooks[b] || _.cssHooks[h], g && "get" in g && (e = g.get(a, !0, c)), void 0 === e && (e = v(a, b, d)), "normal" === e && b in Wb && (e = Wb[b]), "" === c || c ? (f = parseFloat(e), c === !0 || _.isNumeric(f) ? f || 0 : e) : e
        }
    }), _.each(["height", "width"], function(a, b) {
        _.cssHooks[b] = {
            get: function(a, c, d) {
                return c ? Sb.test(_.css(a, "display")) && 0 === a.offsetWidth ? _.swap(a, Vb, function() {
                    return A(a, b, d)
                }) : A(a, b, d) : void 0
            },
            set: function(a, c, d) {
                var e = d && Rb(a);
                return y(a, c, d ? z(a, b, d, "border-box" === _.css(a, "boxSizing", !1, e), e) : 0)
            }
        }
    }), _.cssHooks.marginRight = w(Y.reliableMarginRight, function(a, b) {
        return b ? _.swap(a, {
            display: "inline-block"
        }, v, [a, "marginRight"]) : void 0
    }), _.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(a, b) {
        _.cssHooks[a + b] = {
            expand: function(c) {
                for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++) e[a + wb[d] + b] = f[d] || f[d - 2] || f[0];
                return e
            }
        }, Pb.test(a) || (_.cssHooks[a + b].set = y)
    }), _.fn.extend({
        css: function(a, b) {
            return qb(this, function(a, b, c) {
                var d, e, f = {},
                    g = 0;
                if (_.isArray(b)) {
                    for (d = Rb(a), e = b.length; e > g; g++) f[b[g]] = _.css(a, b[g], !1, d);
                    return f
                }
                return void 0 !== c ? _.style(a, b, c) : _.css(a, b)
            }, a, b, arguments.length > 1)
        },
        show: function() {
            return B(this, !0)
        },
        hide: function() {
            return B(this)
        },
        toggle: function(a) {
            return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
                xb(this) ? _(this).show() : _(this).hide()
            })
        }
    }), _.Tween = C, C.prototype = {
        constructor: C,
        init: function(a, b, c, d, e, f) {
            this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (_.cssNumber[c] ? "" : "px")
        },
        cur: function() {
            var a = C.propHooks[this.prop];
            return a && a.get ? a.get(this) : C.propHooks._default.get(this)
        },
        run: function(a) {
            var b, c = C.propHooks[this.prop];
            return this.pos = b = this.options.duration ? _.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : C.propHooks._default.set(this), this
        }
    }, C.prototype.init.prototype = C.prototype, C.propHooks = {
        _default: {
            get: function(a) {
                var b;
                return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = _.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop]
            },
            set: function(a) {
                _.fx.step[a.prop] ? _.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[_.cssProps[a.prop]] || _.cssHooks[a.prop]) ? _.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
            }
        }
    }, C.propHooks.scrollTop = C.propHooks.scrollLeft = {
        set: function(a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
        }
    }, _.easing = {
        linear: function(a) {
            return a
        },
        swing: function(a) {
            return .5 - Math.cos(a * Math.PI) / 2
        }
    }, _.fx = C.prototype.init, _.fx.step = {};
    var Yb, Zb, $b = /^(?:toggle|show|hide)$/,
        _b = new RegExp("^(?:([+-])=|)(" + vb + ")([a-z%]*)$", "i"),
        ac = /queueHooks$/,
        bc = [G],
        cc = {
            "*": [function(a, b) {
                var c = this.createTween(a, b),
                    d = c.cur(),
                    e = _b.exec(b),
                    f = e && e[3] || (_.cssNumber[a] ? "" : "px"),
                    g = (_.cssNumber[a] || "px" !== f && +d) && _b.exec(_.css(c.elem, a)),
                    h = 1,
                    i = 20;
                if (g && g[3] !== f) {
                    f = f || g[3], e = e || [], g = +d || 1;
                    do h = h || ".5", g /= h, _.style(c.elem, a, g + f); while (h !== (h = c.cur() / d) && 1 !== h && --i)
                }
                return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), c
            }]
        };
    _.Animation = _.extend(I, {
            tweener: function(a, b) {
                _.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
                for (var c, d = 0, e = a.length; e > d; d++) c = a[d], cc[c] = cc[c] || [], cc[c].unshift(b)
            },
            prefilter: function(a, b) {
                b ? bc.unshift(a) : bc.push(a)
            }
        }), _.speed = function(a, b, c) {
            var d = a && "object" == typeof a ? _.extend({}, a) : {
                complete: c || !c && b || _.isFunction(a) && a,
                duration: a,
                easing: c && b || b && !_.isFunction(b) && b
            };
            return d.duration = _.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in _.fx.speeds ? _.fx.speeds[d.duration] : _.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function() {
                _.isFunction(d.old) && d.old.call(this), d.queue && _.dequeue(this, d.queue)
            }, d
        }, _.fn.extend({
            fadeTo: function(a, b, c, d) {
                return this.filter(xb).css("opacity", 0).show().end().animate({
                    opacity: b
                }, a, c, d)
            },
            animate: function(a, b, c, d) {
                var e = _.isEmptyObject(a),
                    f = _.speed(b, c, d),
                    g = function() {
                        var b = I(this, _.extend({}, a), f);
                        (e || rb.get(this, "finish")) && b.stop(!0)
                    };
                return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
            },
            stop: function(a, b, c) {
                var d = function(a) {
                    var b = a.stop;
                    delete a.stop, b(c)
                };
                return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function() {
                    var b = !0,
                        e = null != a && a + "queueHooks",
                        f = _.timers,
                        g = rb.get(this);
                    if (e) g[e] && g[e].stop && d(g[e]);
                    else
                        for (e in g) g[e] && g[e].stop && ac.test(e) && d(g[e]);
                    for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
                    (b || !c) && _.dequeue(this, a)
                })
            },
            finish: function(a) {
                return a !== !1 && (a = a || "fx"), this.each(function() {
                    var b, c = rb.get(this),
                        d = c[a + "queue"],
                        e = c[a + "queueHooks"],
                        f = _.timers,
                        g = d ? d.length : 0;
                    for (c.finish = !0, _.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                    for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
                    delete c.finish
                })
            }
        }), _.each(["toggle", "show", "hide"], function(a, b) {
            var c = _.fn[b];
            _.fn[b] = function(a, d, e) {
                return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(E(b, !0), a, d, e)
            }
        }), _.each({
            slideDown: E("show"),
            slideUp: E("hide"),
            slideToggle: E("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(a, b) {
            _.fn[a] = function(a, c, d) {
                return this.animate(b, a, c, d)
            }
        }), _.timers = [], _.fx.tick = function() {
            var a, b = 0,
                c = _.timers;
            for (Yb = _.now(); b < c.length; b++) a = c[b], a() || c[b] !== a || c.splice(b--, 1);
            c.length || _.fx.stop(), Yb = void 0
        }, _.fx.timer = function(a) {
            _.timers.push(a), a() ? _.fx.start() : _.timers.pop()
        }, _.fx.interval = 13, _.fx.start = function() {
            Zb || (Zb = setInterval(_.fx.tick, _.fx.interval))
        }, _.fx.stop = function() {
            clearInterval(Zb), Zb = null
        }, _.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, _.fn.delay = function(a, b) {
            return a = _.fx ? _.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
                var d = setTimeout(b, a);
                c.stop = function() {
                    clearTimeout(d)
                }
            })
        },
        function() {
            var a = Z.createElement("input"),
                b = Z.createElement("select"),
                c = b.appendChild(Z.createElement("option"));
            a.type = "checkbox", Y.checkOn = "" !== a.value, Y.optSelected = c.selected, b.disabled = !0, Y.optDisabled = !c.disabled, a = Z.createElement("input"), a.value = "t", a.type = "radio", Y.radioValue = "t" === a.value
        }();
    var dc, ec, fc = _.expr.attrHandle;
    _.fn.extend({
        attr: function(a, b) {
            return qb(this, _.attr, a, b, arguments.length > 1)
        },
        removeAttr: function(a) {
            return this.each(function() {
                _.removeAttr(this, a)
            })
        }
    }), _.extend({
        attr: function(a, b, c) {
            var d, e, f = a.nodeType;
            if (a && 3 !== f && 8 !== f && 2 !== f) return typeof a.getAttribute === zb ? _.prop(a, b, c) : (1 === f && _.isXMLDoc(a) || (b = b.toLowerCase(), d = _.attrHooks[b] || (_.expr.match.bool.test(b) ? ec : dc)), void 0 === c ? d && "get" in d && null !== (e = d.get(a, b)) ? e : (e = _.find.attr(a, b), null == e ? void 0 : e) : null !== c ? d && "set" in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""), c) : void _.removeAttr(a, b))
        },
        removeAttr: function(a, b) {
            var c, d, e = 0,
                f = b && b.match(nb);
            if (f && 1 === a.nodeType)
                for (; c = f[e++];) d = _.propFix[c] || c, _.expr.match.bool.test(c) && (a[d] = !1), a.removeAttribute(c)
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (!Y.radioValue && "radio" === b && _.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b), c && (a.value = c), b
                    }
                }
            }
        }
    }), ec = {
        set: function(a, b, c) {
            return b === !1 ? _.removeAttr(a, c) : a.setAttribute(c, c), c
        }
    }, _.each(_.expr.match.bool.source.match(/\w+/g), function(a, b) {
        var c = fc[b] || _.find.attr;
        fc[b] = function(a, b, d) {
            var e, f;
            return d || (f = fc[b], fc[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, fc[b] = f), e
        }
    });
    var gc = /^(?:input|select|textarea|button)$/i;
    _.fn.extend({
        prop: function(a, b) {
            return qb(this, _.prop, a, b, arguments.length > 1)
        },
        removeProp: function(a) {
            return this.each(function() {
                delete this[_.propFix[a] || a]
            })
        }
    }), _.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(a, b, c) {
            var d, e, f, g = a.nodeType;
            if (a && 3 !== g && 8 !== g && 2 !== g) return f = 1 !== g || !_.isXMLDoc(a), f && (b = _.propFix[b] || b, e = _.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    return a.hasAttribute("tabindex") || gc.test(a.nodeName) || a.href ? a.tabIndex : -1
                }
            }
        }
    }), Y.optSelected || (_.propHooks.selected = {
        get: function(a) {
            var b = a.parentNode;
            return b && b.parentNode && b.parentNode.selectedIndex, null
        }
    }), _.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        _.propFix[this.toLowerCase()] = this
    });
    var hc = /[\t\r\n\f]/g;
    _.fn.extend({
        addClass: function(a) {
            var b, c, d, e, f, g, h = "string" == typeof a && a,
                i = 0,
                j = this.length;
            if (_.isFunction(a)) return this.each(function(b) {
                _(this).addClass(a.call(this, b, this.className))
            });
            if (h)
                for (b = (a || "").match(nb) || []; j > i; i++)
                    if (c = this[i], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(hc, " ") : " ")) {
                        for (f = 0; e = b[f++];) d.indexOf(" " + e + " ") < 0 && (d += e + " ");
                        g = _.trim(d), c.className !== g && (c.className = g)
                    }
            return this
        },
        removeClass: function(a) {
            var b, c, d, e, f, g, h = 0 === arguments.length || "string" == typeof a && a,
                i = 0,
                j = this.length;
            if (_.isFunction(a)) return this.each(function(b) {
                _(this).removeClass(a.call(this, b, this.className))
            });
            if (h)
                for (b = (a || "").match(nb) || []; j > i; i++)
                    if (c = this[i], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(hc, " ") : "")) {
                        for (f = 0; e = b[f++];)
                            for (; d.indexOf(" " + e + " ") >= 0;) d = d.replace(" " + e + " ", " ");
                        g = a ? _.trim(d) : "", c.className !== g && (c.className = g)
                    }
            return this
        },
        toggleClass: function(a, b) {
            var c = typeof a;
            return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(_.isFunction(a) ? function(c) {
                _(this).toggleClass(a.call(this, c, this.className, b), b)
            } : function() {
                if ("string" === c)
                    for (var b, d = 0, e = _(this), f = a.match(nb) || []; b = f[d++];) e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
                else(c === zb || "boolean" === c) && (this.className && rb.set(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : rb.get(this, "__className__") || "")
            })
        },
        hasClass: function(a) {
            for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++)
                if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(hc, " ").indexOf(b) >= 0) return !0;
            return !1
        }
    });
    var ic = /\r/g;
    _.fn.extend({
        val: function(a) {
            var b, c, d, e = this[0]; {
                if (arguments.length) return d = _.isFunction(a), this.each(function(c) {
                    var e;
                    1 === this.nodeType && (e = d ? a.call(this, c, _(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : _.isArray(e) && (e = _.map(e, function(a) {
                        return null == a ? "" : a + ""
                    })), b = _.valHooks[this.type] || _.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
                });
                if (e) return b = _.valHooks[e.type] || _.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(ic, "") : null == c ? "" : c)
            }
        }
    }), _.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = _.find.attr(a, "value");
                    return null != b ? b : _.trim(_.text(a))
                }
            },
            select: {
                get: function(a) {
                    for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)
                        if (c = d[i], !(!c.selected && i !== e || (Y.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && _.nodeName(c.parentNode, "optgroup"))) {
                            if (b = _(c).val(), f) return b;
                            g.push(b)
                        }
                    return g
                },
                set: function(a, b) {
                    for (var c, d, e = a.options, f = _.makeArray(b), g = e.length; g--;) d = e[g], (d.selected = _.inArray(d.value, f) >= 0) && (c = !0);
                    return c || (a.selectedIndex = -1), f
                }
            }
        }
    }), _.each(["radio", "checkbox"], function() {
        _.valHooks[this] = {
            set: function(a, b) {
                return _.isArray(b) ? a.checked = _.inArray(_(a).val(), b) >= 0 : void 0
            }
        }, Y.checkOn || (_.valHooks[this].get = function(a) {
            return null === a.getAttribute("value") ? "on" : a.value
        })
    }), _.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
        _.fn[b] = function(a, c) {
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }
    }), _.fn.extend({
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        },
        bind: function(a, b, c) {
            return this.on(a, null, b, c)
        },
        unbind: function(a, b) {
            return this.off(a, null, b)
        },
        delegate: function(a, b, c, d) {
            return this.on(b, a, c, d)
        },
        undelegate: function(a, b, c) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
        }
    });
    var jc = _.now(),
        kc = /\?/;
    _.parseJSON = function(a) {
        return JSON.parse(a + "")
    }, _.parseXML = function(a) {
        var b, c;
        if (!a || "string" != typeof a) return null;
        try {
            c = new DOMParser, b = c.parseFromString(a, "text/xml")
        } catch (d) {
            b = void 0
        }
        return (!b || b.getElementsByTagName("parsererror").length) && _.error("Invalid XML: " + a), b
    };
    var lc = /#.*$/,
        mc = /([?&])_=[^&]*/,
        nc = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        oc = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        pc = /^(?:GET|HEAD)$/,
        qc = /^\/\//,
        rc = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        sc = {},
        tc = {},
        uc = "*/".concat("*"),
        vc = a.location.href,
        wc = rc.exec(vc.toLowerCase()) || [];
    _.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: vc,
            type: "GET",
            isLocal: oc.test(wc[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": uc,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": _.parseJSON,
                "text xml": _.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(a, b) {
            return b ? L(L(a, _.ajaxSettings), b) : L(_.ajaxSettings, a)
        },
        ajaxPrefilter: J(sc),
        ajaxTransport: J(tc),
        ajax: function(a, b) {
            function c(a, b, c, g) {
                var i, k, r, s, u, w = b;
                2 !== t && (t = 2, h && clearTimeout(h), d = void 0, f = g || "", v.readyState = a > 0 ? 4 : 0, i = a >= 200 && 300 > a || 304 === a, c && (s = M(l, v, c)), s = N(l, s, v, i), i ? (l.ifModified && (u = v.getResponseHeader("Last-Modified"), u && (_.lastModified[e] = u), u = v.getResponseHeader("etag"), u && (_.etag[e] = u)), 204 === a || "HEAD" === l.type ? w = "nocontent" : 304 === a ? w = "notmodified" : (w = s.state, k = s.data, r = s.error, i = !r)) : (r = w, (a || !w) && (w = "error", 0 > a && (a = 0))), v.status = a, v.statusText = (b || w) + "", i ? o.resolveWith(m, [k, w, v]) : o.rejectWith(m, [v, w, r]), v.statusCode(q), q = void 0, j && n.trigger(i ? "ajaxSuccess" : "ajaxError", [v, l, i ? k : r]), p.fireWith(m, [v, w]), j && (n.trigger("ajaxComplete", [v, l]), --_.active || _.event.trigger("ajaxStop")))
            }
            "object" == typeof a && (b = a, a = void 0), b = b || {};
            var d, e, f, g, h, i, j, k, l = _.ajaxSetup({}, b),
                m = l.context || l,
                n = l.context && (m.nodeType || m.jquery) ? _(m) : _.event,
                o = _.Deferred(),
                p = _.Callbacks("once memory"),
                q = l.statusCode || {},
                r = {},
                s = {},
                t = 0,
                u = "canceled",
                v = {
                    readyState: 0,
                    getResponseHeader: function(a) {
                        var b;
                        if (2 === t) {
                            if (!g)
                                for (g = {}; b = nc.exec(f);) g[b[1].toLowerCase()] = b[2];
                            b = g[a.toLowerCase()]
                        }
                        return null == b ? null : b
                    },
                    getAllResponseHeaders: function() {
                        return 2 === t ? f : null
                    },
                    setRequestHeader: function(a, b) {
                        var c = a.toLowerCase();
                        return t || (a = s[c] = s[c] || a, r[a] = b), this
                    },
                    overrideMimeType: function(a) {
                        return t || (l.mimeType = a), this
                    },
                    statusCode: function(a) {
                        var b;
                        if (a)
                            if (2 > t)
                                for (b in a) q[b] = [q[b], a[b]];
                            else v.always(a[v.status]);
                        return this
                    },
                    abort: function(a) {
                        var b = a || u;
                        return d && d.abort(b), c(0, b), this
                    }
                };
            if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, l.url = ((a || l.url || vc) + "").replace(lc, "").replace(qc, wc[1] + "//"), l.type = b.method || b.type || l.method || l.type, l.dataTypes = _.trim(l.dataType || "*").toLowerCase().match(nb) || [""], null == l.crossDomain && (i = rc.exec(l.url.toLowerCase()), l.crossDomain = !(!i || i[1] === wc[1] && i[2] === wc[2] && (i[3] || ("http:" === i[1] ? "80" : "443")) === (wc[3] || ("http:" === wc[1] ? "80" : "443")))), l.data && l.processData && "string" != typeof l.data && (l.data = _.param(l.data, l.traditional)), K(sc, l, b, v), 2 === t) return v;
            j = _.event && l.global, j && 0 === _.active++ && _.event.trigger("ajaxStart"), l.type = l.type.toUpperCase(), l.hasContent = !pc.test(l.type), e = l.url, l.hasContent || (l.data && (e = l.url += (kc.test(e) ? "&" : "?") + l.data, delete l.data), l.cache === !1 && (l.url = mc.test(e) ? e.replace(mc, "$1_=" + jc++) : e + (kc.test(e) ? "&" : "?") + "_=" + jc++)), l.ifModified && (_.lastModified[e] && v.setRequestHeader("If-Modified-Since", _.lastModified[e]), _.etag[e] && v.setRequestHeader("If-None-Match", _.etag[e])), (l.data && l.hasContent && l.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", l.contentType), v.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + ("*" !== l.dataTypes[0] ? ", " + uc + "; q=0.01" : "") : l.accepts["*"]);
            for (k in l.headers) v.setRequestHeader(k, l.headers[k]);
            if (l.beforeSend && (l.beforeSend.call(m, v, l) === !1 || 2 === t)) return v.abort();
            u = "abort";
            for (k in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) v[k](l[k]);
            if (d = K(tc, l, b, v)) {
                v.readyState = 1, j && n.trigger("ajaxSend", [v, l]), l.async && l.timeout > 0 && (h = setTimeout(function() {
                    v.abort("timeout")
                }, l.timeout));
                try {
                    t = 1, d.send(r, c)
                } catch (w) {
                    if (!(2 > t)) throw w;
                    c(-1, w)
                }
            } else c(-1, "No Transport");
            return v
        },
        getJSON: function(a, b, c) {
            return _.get(a, b, c, "json")
        },
        getScript: function(a, b) {
            return _.get(a, void 0, b, "script")
        }
    }), _.each(["get", "post"], function(a, b) {
        _[b] = function(a, c, d, e) {
            return _.isFunction(c) && (e = e || d, d = c, c = void 0), _.ajax({
                url: a,
                type: b,
                dataType: e,
                data: c,
                success: d
            })
        }
    }), _._evalUrl = function(a) {
        return _.ajax({
            url: a,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        })
    }, _.fn.extend({
        wrapAll: function(a) {
            var b;
            return _.isFunction(a) ? this.each(function(b) {
                _(this).wrapAll(a.call(this, b))
            }) : (this[0] && (b = _(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
                for (var a = this; a.firstElementChild;) a = a.firstElementChild;
                return a
            }).append(this)), this)
        },
        wrapInner: function(a) {
            return this.each(_.isFunction(a) ? function(b) {
                _(this).wrapInner(a.call(this, b))
            } : function() {
                var b = _(this),
                    c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        },
        wrap: function(a) {
            var b = _.isFunction(a);
            return this.each(function(c) {
                _(this).wrapAll(b ? a.call(this, c) : a)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                _.nodeName(this, "body") || _(this).replaceWith(this.childNodes)
            }).end()
        }
    }), _.expr.filters.hidden = function(a) {
        return a.offsetWidth <= 0 && a.offsetHeight <= 0
    }, _.expr.filters.visible = function(a) {
        return !_.expr.filters.hidden(a)
    };
    var xc = /%20/g,
        yc = /\[\]$/,
        zc = /\r?\n/g,
        Ac = /^(?:submit|button|image|reset|file)$/i,
        Bc = /^(?:input|select|textarea|keygen)/i;
    _.param = function(a, b) {
        var c, d = [],
            e = function(a, b) {
                b = _.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
            };
        if (void 0 === b && (b = _.ajaxSettings && _.ajaxSettings.traditional), _.isArray(a) || a.jquery && !_.isPlainObject(a)) _.each(a, function() {
            e(this.name, this.value)
        });
        else
            for (c in a) O(c, a[c], b, e);
        return d.join("&").replace(xc, "+")
    }, _.fn.extend({
        serialize: function() {
            return _.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var a = _.prop(this, "elements");
                return a ? _.makeArray(a) : this
            }).filter(function() {
                var a = this.type;
                return this.name && !_(this).is(":disabled") && Bc.test(this.nodeName) && !Ac.test(a) && (this.checked || !yb.test(a))
            }).map(function(a, b) {
                var c = _(this).val();
                return null == c ? null : _.isArray(c) ? _.map(c, function(a) {
                    return {
                        name: b.name,
                        value: a.replace(zc, "\r\n")
                    }
                }) : {
                    name: b.name,
                    value: c.replace(zc, "\r\n")
                }
            }).get()
        }
    }), _.ajaxSettings.xhr = function() {
        try {
            return new XMLHttpRequest
        } catch (a) {}
    };
    var Cc = 0,
        Dc = {},
        Ec = {
            0: 200,
            1223: 204
        },
        Fc = _.ajaxSettings.xhr();
    a.attachEvent && a.attachEvent("onunload", function() {
        for (var a in Dc) Dc[a]()
    }), Y.cors = !!Fc && "withCredentials" in Fc, Y.ajax = Fc = !!Fc, _.ajaxTransport(function(a) {
        var b;
        return Y.cors || Fc && !a.crossDomain ? {
            send: function(c, d) {
                var e, f = a.xhr(),
                    g = ++Cc;
                if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields)
                    for (e in a.xhrFields) f[e] = a.xhrFields[e];
                a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
                for (e in c) f.setRequestHeader(e, c[e]);
                b = function(a) {
                    return function() {
                        b && (delete Dc[g], b = f.onload = f.onerror = null, "abort" === a ? f.abort() : "error" === a ? d(f.status, f.statusText) : d(Ec[f.status] || f.status, f.statusText, "string" == typeof f.responseText ? {
                            text: f.responseText
                        } : void 0, f.getAllResponseHeaders()))
                    }
                }, f.onload = b(), f.onerror = b("error"), b = Dc[g] = b("abort");
                try {
                    f.send(a.hasContent && a.data || null)
                } catch (h) {
                    if (b) throw h
                }
            },
            abort: function() {
                b && b()
            }
        } : void 0
    }), _.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(a) {
                return _.globalEval(a), a
            }
        }
    }), _.ajaxPrefilter("script", function(a) {
        void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET")
    }), _.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var b, c;
            return {
                send: function(d, e) {
                    b = _("<script>").prop({
                        async: !0,
                        charset: a.scriptCharset,
                        src: a.url
                    }).on("load error", c = function(a) {
                        b.remove(), c = null, a && e("error" === a.type ? 404 : 200, a.type)
                    }), Z.head.appendChild(b[0])
                },
                abort: function() {
                    c && c()
                }
            }
        }
    });
    var Gc = [],
        Hc = /(=)\?(?=&|$)|\?\?/;
    _.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var a = Gc.pop() || _.expando + "_" + jc++;
            return this[a] = !0, a
        }
    }), _.ajaxPrefilter("json jsonp", function(b, c, d) {
        var e, f, g, h = b.jsonp !== !1 && (Hc.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && Hc.test(b.data) && "data");
        return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = _.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(Hc, "$1" + e) : b.jsonp !== !1 && (b.url += (kc.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function() {
            return g || _.error(e + " was not called"), g[0]
        }, b.dataTypes[0] = "json", f = a[e], a[e] = function() {
            g = arguments
        }, d.always(function() {
            a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, Gc.push(e)), g && _.isFunction(f) && f(g[0]), g = f = void 0
        }), "script") : void 0
    }), _.parseHTML = function(a, b, c) {
        if (!a || "string" != typeof a) return null;
        "boolean" == typeof b && (c = b, b = !1), b = b || Z;
        var d = gb.exec(a),
            e = !c && [];
        return d ? [b.createElement(d[1])] : (d = _.buildFragment([a], b, e), e && e.length && _(e).remove(), _.merge([], d.childNodes))
    };
    var Ic = _.fn.load;
    _.fn.load = function(a, b, c) {
        if ("string" != typeof a && Ic) return Ic.apply(this, arguments);
        var d, e, f, g = this,
            h = a.indexOf(" ");
        return h >= 0 && (d = _.trim(a.slice(h)), a = a.slice(0, h)), _.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (e = "POST"), g.length > 0 && _.ajax({
            url: a,
            type: e,
            dataType: "html",
            data: b
        }).done(function(a) {
            f = arguments, g.html(d ? _("<div>").append(_.parseHTML(a)).find(d) : a)
        }).complete(c && function(a, b) {
            g.each(c, f || [a.responseText, b, a])
        }), this
    }, _.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(a, b) {
        _.fn[b] = function(a) {
            return this.on(b, a)
        }
    }), _.expr.filters.animated = function(a) {
        return _.grep(_.timers, function(b) {
            return a === b.elem
        }).length
    };
    var Jc = a.document.documentElement;
    _.offset = {
        setOffset: function(a, b, c) {
            var d, e, f, g, h, i, j, k = _.css(a, "position"),
                l = _(a),
                m = {};
            "static" === k && (a.style.position = "relative"), h = l.offset(), f = _.css(a, "top"), i = _.css(a, "left"), j = ("absolute" === k || "fixed" === k) && (f + i).indexOf("auto") > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), _.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m)
        }
    }, _.fn.extend({
        offset: function(a) {
            if (arguments.length) return void 0 === a ? this : this.each(function(b) {
                _.offset.setOffset(this, a, b)
            });
            var b, c, d = this[0],
                e = {
                    top: 0,
                    left: 0
                },
                f = d && d.ownerDocument;
            if (f) return b = f.documentElement, _.contains(b, d) ? (typeof d.getBoundingClientRect !== zb && (e = d.getBoundingClientRect()), c = P(f), {
                top: e.top + c.pageYOffset - b.clientTop,
                left: e.left + c.pageXOffset - b.clientLeft
            }) : e
        },
        position: function() {
            if (this[0]) {
                var a, b, c = this[0],
                    d = {
                        top: 0,
                        left: 0
                    };
                return "fixed" === _.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), _.nodeName(a[0], "html") || (d = a.offset()), d.top += _.css(a[0], "borderTopWidth", !0), d.left += _.css(a[0], "borderLeftWidth", !0)), {
                    top: b.top - d.top - _.css(c, "marginTop", !0),
                    left: b.left - d.left - _.css(c, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var a = this.offsetParent || Jc; a && !_.nodeName(a, "html") && "static" === _.css(a, "position");) a = a.offsetParent;
                return a || Jc
            })
        }
    }), _.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(b, c) {
        var d = "pageYOffset" === c;
        _.fn[b] = function(e) {
            return qb(this, function(b, e, f) {
                var g = P(b);
                return void 0 === f ? g ? g[c] : b[e] : void(g ? g.scrollTo(d ? a.pageXOffset : f, d ? f : a.pageYOffset) : b[e] = f)
            }, b, e, arguments.length, null)
        }
    }), _.each(["top", "left"], function(a, b) {
        _.cssHooks[b] = w(Y.pixelPosition, function(a, c) {
            return c ? (c = v(a, b), Qb.test(c) ? _(a).position()[b] + "px" : c) : void 0
        })
    }), _.each({
        Height: "height",
        Width: "width"
    }, function(a, b) {
        _.each({
            padding: "inner" + a,
            content: b,
            "": "outer" + a
        }, function(c, d) {
            _.fn[d] = function(d, e) {
                var f = arguments.length && (c || "boolean" != typeof d),
                    g = c || (d === !0 || e === !0 ? "margin" : "border");
                return qb(this, function(b, c, d) {
                    var e;
                    return _.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? _.css(b, c, g) : _.style(b, c, d, g)
                }, b, f ? d : void 0, f, null)
            }
        })
    }), _.fn.size = function() {
        return this.length
    }, _.fn.andSelf = _.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return _
    });
    var Kc = a.jQuery,
        Lc = a.$;
    return _.noConflict = function(b) {
        return a.$ === _ && (a.$ = Lc), b && a.jQuery === _ && (a.jQuery = Kc), _
    }, typeof b === zb && (a.jQuery = a.$ = _), _
}),
function(a, b) {
    "use strict";
    "function" == typeof define && define.amd ? define(b) : "object" == typeof exports ? module.exports = b() : a.returnExports = b()
}(this, function() {
    function a(a) {
        var b = +a;
        return b !== b ? b = 0 : 0 !== b && b !== 1 / 0 && b !== -(1 / 0) && (b = (b > 0 || -1) * Math.floor(Math.abs(b))), b
    }

    function b(a) {
        var b = typeof a;
        return null === a || "undefined" === b || "boolean" === b || "number" === b || "string" === b
    }

    function c(a) {
        var c, d, e;
        if (b(a)) return a;
        if (d = a.valueOf, o(d) && (c = d.call(a), b(c))) return c;
        if (e = a.toString, o(e) && (c = e.call(a), b(c))) return c;
        throw new TypeError
    }
    var d = Array.prototype,
        e = Object.prototype,
        f = Function.prototype,
        g = String.prototype,
        h = Number.prototype,
        i = d.slice,
        j = d.splice,
        k = d.push,
        l = d.unshift,
        m = f.call,
        n = e.toString,
        o = function(a) {
            return "[object Function]" === n.call(a)
        },
        p = function(a) {
            return "[object RegExp]" === n.call(a)
        },
        q = function(a) {
            return "[object Array]" === n.call(a)
        },
        r = function(a) {
            return "[object String]" === n.call(a)
        },
        s = function(a) {
            var b = n.call(a),
                c = "[object Arguments]" === b;
            return c || (c = !q(a) && null !== a && "object" == typeof a && "number" == typeof a.length && a.length >= 0 && o(a.callee)), c
        },
        t = function(a) {
            var b, c = Object.defineProperty && function() {
                try {
                    return Object.defineProperty({}, "x", {}), !0
                } catch (a) {
                    return !1
                }
            }();
            return b = c ? function(a, b, c, d) {
                    !d && b in a || Object.defineProperty(a, b, {
                        configurable: !0,
                        enumerable: !1,
                        writable: !0,
                        value: c
                    })
                } : function(a, b, c, d) {
                    !d && b in a || (a[b] = c)
                },
                function(c, d, e) {
                    for (var f in d) a.call(d, f) && b(c, f, d[f], e)
                }
        }(e.hasOwnProperty),
        u = {
            ToObject: function(a) {
                if (null == a) throw new TypeError("can't convert " + a + " to object");
                return Object(a)
            },
            ToUint32: function(a) {
                return a >>> 0
            }
        },
        v = function() {};
    t(f, {
        bind: function(a) {
            var b = this;
            if (!o(b)) throw new TypeError("Function.prototype.bind called on incompatible " + b);
            for (var c, d = i.call(arguments, 1), e = function() {
                    if (this instanceof c) {
                        var e = b.apply(this, d.concat(i.call(arguments)));
                        return Object(e) === e ? e : this
                    }
                    return b.apply(a, d.concat(i.call(arguments)))
                }, f = Math.max(0, b.length - d.length), g = [], h = 0; f > h; h++) g.push("$" + h);
            return c = Function("binder", "return function (" + g.join(",") + "){ return binder.apply(this, arguments); }")(e), b.prototype && (v.prototype = b.prototype, c.prototype = new v, v.prototype = null), c
        }
    });
    var w = m.bind(e.hasOwnProperty),
        x = function() {
            var a = [1, 2],
                b = a.splice();
            return 2 === a.length && q(b) && 0 === b.length
        }();
    t(d, {
        splice: function() {
            return 0 === arguments.length ? [] : j.apply(this, arguments)
        }
    }, !x);
    var y = function() {
        var a = {};
        return d.splice.call(a, 0, 0, 1), 1 === a.length
    }();
    t(d, {
        splice: function(b, c) {
            if (0 === arguments.length) return [];
            var d = arguments;
            return this.length = Math.max(a(this.length), 0), arguments.length > 0 && "number" != typeof c && (d = i.call(arguments), d.length < 2 ? d.push(this.length - b) : d[1] = a(c)), j.apply(this, d)
        }
    }, !y);
    var z = 1 !== [].unshift(0);
    t(d, {
        unshift: function() {
            return l.apply(this, arguments), this.length
        }
    }, z), t(Array, {
        isArray: q
    });
    var A = Object("a"),
        B = "a" !== A[0] || !(0 in A),
        C = function(a) {
            var b = !0,
                c = !0;
            return a && (a.call("foo", function(a, c, d) {
                "object" != typeof d && (b = !1)
            }), a.call([1], function() {
                "use strict";
                c = "string" == typeof this
            }, "x")), !!a && b && c
        };
    t(d, {
        forEach: function(a) {
            var b = u.ToObject(this),
                c = B && r(this) ? this.split("") : b,
                d = arguments[1],
                e = -1,
                f = c.length >>> 0;
            if (!o(a)) throw new TypeError;
            for (; ++e < f;) e in c && a.call(d, c[e], e, b)
        }
    }, !C(d.forEach)), t(d, {
        map: function(a) {
            var b = u.ToObject(this),
                c = B && r(this) ? this.split("") : b,
                d = c.length >>> 0,
                e = Array(d),
                f = arguments[1];
            if (!o(a)) throw new TypeError(a + " is not a function");
            for (var g = 0; d > g; g++) g in c && (e[g] = a.call(f, c[g], g, b));
            return e
        }
    }, !C(d.map)), t(d, {
        filter: function(a) {
            var b, c = u.ToObject(this),
                d = B && r(this) ? this.split("") : c,
                e = d.length >>> 0,
                f = [],
                g = arguments[1];
            if (!o(a)) throw new TypeError(a + " is not a function");
            for (var h = 0; e > h; h++) h in d && (b = d[h], a.call(g, b, h, c) && f.push(b));
            return f
        }
    }, !C(d.filter)), t(d, {
        every: function(a) {
            var b = u.ToObject(this),
                c = B && r(this) ? this.split("") : b,
                d = c.length >>> 0,
                e = arguments[1];
            if (!o(a)) throw new TypeError(a + " is not a function");
            for (var f = 0; d > f; f++)
                if (f in c && !a.call(e, c[f], f, b)) return !1;
            return !0
        }
    }, !C(d.every)), t(d, {
        some: function(a) {
            var b = u.ToObject(this),
                c = B && r(this) ? this.split("") : b,
                d = c.length >>> 0,
                e = arguments[1];
            if (!o(a)) throw new TypeError(a + " is not a function");
            for (var f = 0; d > f; f++)
                if (f in c && a.call(e, c[f], f, b)) return !0;
            return !1
        }
    }, !C(d.some));
    var D = !1;
    d.reduce && (D = "object" == typeof d.reduce.call("es5", function(a, b, c, d) {
        return d
    })), t(d, {
        reduce: function(a) {
            var b = u.ToObject(this),
                c = B && r(this) ? this.split("") : b,
                d = c.length >>> 0;
            if (!o(a)) throw new TypeError(a + " is not a function");
            if (!d && 1 === arguments.length) throw new TypeError("reduce of empty array with no initial value");
            var e, f = 0;
            if (arguments.length >= 2) e = arguments[1];
            else
                for (;;) {
                    if (f in c) {
                        e = c[f++];
                        break
                    }
                    if (++f >= d) throw new TypeError("reduce of empty array with no initial value")
                }
            for (; d > f; f++) f in c && (e = a.call(void 0, e, c[f], f, b));
            return e
        }
    }, !D);
    var E = !1;
    d.reduceRight && (E = "object" == typeof d.reduceRight.call("es5", function(a, b, c, d) {
        return d
    })), t(d, {
        reduceRight: function(a) {
            var b = u.ToObject(this),
                c = B && r(this) ? this.split("") : b,
                d = c.length >>> 0;
            if (!o(a)) throw new TypeError(a + " is not a function");
            if (!d && 1 === arguments.length) throw new TypeError("reduceRight of empty array with no initial value");
            var e, f = d - 1;
            if (arguments.length >= 2) e = arguments[1];
            else
                for (;;) {
                    if (f in c) {
                        e = c[f--];
                        break
                    }
                    if (--f < 0) throw new TypeError("reduceRight of empty array with no initial value")
                }
            if (0 > f) return e;
            do f in c && (e = a.call(void 0, e, c[f], f, b)); while (f--);
            return e
        }
    }, !E);
    var F = Array.prototype.indexOf && -1 !== [0, 1].indexOf(1, 2);
    t(d, {
        indexOf: function(b) {
            var c = B && r(this) ? this.split("") : u.ToObject(this),
                d = c.length >>> 0;
            if (!d) return -1;
            var e = 0;
            for (arguments.length > 1 && (e = a(arguments[1])), e = e >= 0 ? e : Math.max(0, d + e); d > e; e++)
                if (e in c && c[e] === b) return e;
            return -1
        }
    }, F);
    var G = Array.prototype.lastIndexOf && -1 !== [0, 1].lastIndexOf(0, -3);
    t(d, {
        lastIndexOf: function(b) {
            var c = B && r(this) ? this.split("") : u.ToObject(this),
                d = c.length >>> 0;
            if (!d) return -1;
            var e = d - 1;
            for (arguments.length > 1 && (e = Math.min(e, a(arguments[1]))), e = e >= 0 ? e : d - Math.abs(e); e >= 0; e--)
                if (e in c && b === c[e]) return e;
            return -1
        }
    }, G);
    var H = !{
            toString: null
        }.propertyIsEnumerable("toString"),
        I = function() {}.propertyIsEnumerable("prototype"),
        J = !w("x", "0"),
        K = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
        L = K.length;
    t(Object, {
        keys: function(a) {
            var b = o(a),
                c = s(a),
                d = null !== a && "object" == typeof a,
                e = d && r(a);
            if (!d && !b && !c) throw new TypeError("Object.keys called on a non-object");
            var f = [],
                g = I && b;
            if (e && J || c)
                for (var h = 0; h < a.length; ++h) f.push(String(h));
            if (!c)
                for (var i in a) g && "prototype" === i || !w(a, i) || f.push(String(i));
            if (H)
                for (var j = a.constructor, k = j && j.prototype === a, l = 0; L > l; l++) {
                    var m = K[l];
                    k && "constructor" === m || !w(a, m) || f.push(m)
                }
            return f
        }
    });
    var M = Object.keys && function() {
            return 2 === Object.keys(arguments).length
        }(1, 2),
        N = Object.keys;
    t(Object, {
        keys: function(a) {
            return N(s(a) ? d.slice.call(a) : a)
        }
    }, !M);
    var O = -621987552e5,
        P = "-000001",
        Q = Date.prototype.toISOString && -1 === new Date(O).toISOString().indexOf(P);
    t(Date.prototype, {
        toISOString: function() {
            var a, b, c, d, e;
            if (!isFinite(this)) throw new RangeError("Date.prototype.toISOString called on non-finite value.");
            for (d = this.getUTCFullYear(), e = this.getUTCMonth(), d += Math.floor(e / 12), e = (e % 12 + 12) % 12, a = [e + 1, this.getUTCDate(), this.getUTCHours(), this.getUTCMinutes(), this.getUTCSeconds()], d = (0 > d ? "-" : d > 9999 ? "+" : "") + ("00000" + Math.abs(d)).slice(d >= 0 && 9999 >= d ? -4 : -6), b = a.length; b--;) c = a[b], 10 > c && (a[b] = "0" + c);
            return d + "-" + a.slice(0, 2).join("-") + "T" + a.slice(2).join(":") + "." + ("000" + this.getUTCMilliseconds()).slice(-3) + "Z"
        }
    }, Q);
    var R = !1;
    try {
        R = Date.prototype.toJSON && null === new Date(0 / 0).toJSON() && -1 !== new Date(O).toJSON().indexOf(P) && Date.prototype.toJSON.call({
            toISOString: function() {
                return !0
            }
        })
    } catch (S) {}
    R || (Date.prototype.toJSON = function() {
        var a, b = Object(this),
            d = c(b);
        if ("number" == typeof d && !isFinite(d)) return null;
        if (a = b.toISOString, "function" != typeof a) throw new TypeError("toISOString property is not callable");
        return a.call(b)
    });
    var T = 1e15 === Date.parse("+033658-09-27T01:46:40.000Z"),
        U = !isNaN(Date.parse("2012-04-04T24:00:00.500Z")) || !isNaN(Date.parse("2012-11-31T23:59:59.000Z")),
        V = isNaN(Date.parse("2000-01-01T00:00:00.000Z"));
    (!Date.parse || V || U || !T) && (Date = function(a) {
        function b(c, d, e, f, g, h, i) {
            var j = arguments.length;
            if (this instanceof a) {
                var k = 1 === j && String(c) === c ? new a(b.parse(c)) : j >= 7 ? new a(c, d, e, f, g, h, i) : j >= 6 ? new a(c, d, e, f, g, h) : j >= 5 ? new a(c, d, e, f, g) : j >= 4 ? new a(c, d, e, f) : j >= 3 ? new a(c, d, e) : j >= 2 ? new a(c, d) : j >= 1 ? new a(c) : new a;
                return k.constructor = b, k
            }
            return a.apply(this, arguments)
        }

        function c(a, b) {
            var c = b > 1 ? 1 : 0;
            return f[b] + Math.floor((a - 1969 + c) / 4) - Math.floor((a - 1901 + c) / 100) + Math.floor((a - 1601 + c) / 400) + 365 * (a - 1970)
        }

        function d(b) {
            return Number(new a(1970, 0, 1, 0, 0, 0, b))
        }
        var e = new RegExp("^(\\d{4}|[+-]\\d{6})(?:-(\\d{2})(?:-(\\d{2})(?:T(\\d{2}):(\\d{2})(?::(\\d{2})(?:(\\.\\d{1,}))?)?(Z|(?:([-+])(\\d{2}):(\\d{2})))?)?)?)?$"),
            f = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
        for (var g in a) b[g] = a[g];
        return b.now = a.now, b.UTC = a.UTC, b.prototype = a.prototype, b.prototype.constructor = b, b.parse = function(b) {
            var f = e.exec(b);
            if (f) {
                var g, h = Number(f[1]),
                    i = Number(f[2] || 1) - 1,
                    j = Number(f[3] || 1) - 1,
                    k = Number(f[4] || 0),
                    l = Number(f[5] || 0),
                    m = Number(f[6] || 0),
                    n = Math.floor(1e3 * Number(f[7] || 0)),
                    o = Boolean(f[4] && !f[8]),
                    p = "-" === f[9] ? 1 : -1,
                    q = Number(f[10] || 0),
                    r = Number(f[11] || 0);
                return (l > 0 || m > 0 || n > 0 ? 24 : 25) > k && 60 > l && 60 > m && 1e3 > n && i > -1 && 12 > i && 24 > q && 60 > r && j > -1 && j < c(h, i + 1) - c(h, i) && (g = 60 * (24 * (c(h, i) + j) + k + q * p), g = 1e3 * (60 * (g + l + r * p) + m) + n, o && (g = d(g)), g >= -864e13 && 864e13 >= g) ? g : 0 / 0
            }
            return a.parse.apply(this, arguments)
        }, b
    }(Date)), Date.now || (Date.now = function() {
        return (new Date).getTime()
    });
    var W = h.toFixed && ("0.000" !== 8e-5.toFixed(3) || "1" !== .9. toFixed(0) || "1.25" !== 1.255.toFixed(2) || "1000000000000000128" !== 0xde0b6b3a7640080.toFixed(0)),
        X = {
            base: 1e7,
            size: 6,
            data: [0, 0, 0, 0, 0, 0],
            multiply: function(a, b) {
                for (var c = -1; ++c < X.size;) b += a * X.data[c], X.data[c] = b % X.base, b = Math.floor(b / X.base)
            },
            divide: function(a) {
                for (var b = X.size, c = 0; --b >= 0;) c += X.data[b], X.data[b] = Math.floor(c / a), c = c % a * X.base
            },
            numToString: function() {
                for (var a = X.size, b = ""; --a >= 0;)
                    if ("" !== b || 0 === a || 0 !== X.data[a]) {
                        var c = String(X.data[a]);
                        "" === b ? b = c : b += "0000000".slice(0, 7 - c.length) + c
                    }
                return b
            },
            pow: function hb(a, b, c) {
                return 0 === b ? c : b % 2 === 1 ? hb(a, b - 1, c * a) : hb(a * a, b / 2, c)
            },
            log: function(a) {
                for (var b = 0; a >= 4096;) b += 12, a /= 4096;
                for (; a >= 2;) b += 1, a /= 2;
                return b
            }
        };
    t(h, {
        toFixed: function(a) {
            var b, c, d, e, f, g, h, i;
            if (b = Number(a), b = b !== b ? 0 : Math.floor(b), 0 > b || b > 20) throw new RangeError("Number.toFixed called with invalid number of decimals");
            if (c = Number(this), c !== c) return "NaN";
            if (-1e21 >= c || c >= 1e21) return String(c);
            if (d = "", 0 > c && (d = "-", c = -c), e = "0", c > 1e-21)
                if (f = X.log(c * X.pow(2, 69, 1)) - 69, g = 0 > f ? c * X.pow(2, -f, 1) : c / X.pow(2, f, 1), g *= 4503599627370496, f = 52 - f, f > 0) {
                    for (X.multiply(0, g), h = b; h >= 7;) X.multiply(1e7, 0), h -= 7;
                    for (X.multiply(X.pow(10, h, 1), 0), h = f - 1; h >= 23;) X.divide(1 << 23), h -= 23;
                    X.divide(1 << h), X.multiply(1, 1), X.divide(2), e = X.numToString()
                } else X.multiply(0, g), X.multiply(1 << -f, 0), e = X.numToString() + "0.00000000000000000000".slice(2, 2 + b);
            return b > 0 ? (i = e.length, e = b >= i ? d + "0.0000000000000000000".slice(0, b - i + 2) + e : d + e.slice(0, i - b) + "." + e.slice(i - b)) : e = d + e, e
        }
    }, W);
    var Y = g.split;
    2 !== "ab".split(/(?:ab)*/).length || 4 !== ".".split(/(.?)(.?)/).length || "t" === "tesst".split(/(s)*/)[1] || 4 !== "test".split(/(?:)/, -1).length || "".split(/.?/).length || ".".split(/()()/).length > 1 ? ! function() {
        var a = "undefined" == typeof /()??/.exec("")[1];
        g.split = function(b, c) {
            var d = this;
            if ("undefined" == typeof b && 0 === c) return [];
            if ("[object RegExp]" !== n.call(b)) return Y.call(this, b, c);
            var e, f, g, h, i = [],
                j = (b.ignoreCase ? "i" : "") + (b.multiline ? "m" : "") + (b.extended ? "x" : "") + (b.sticky ? "y" : ""),
                l = 0;
            for (b = new RegExp(b.source, j + "g"), d += "", a || (e = new RegExp("^" + b.source + "$(?!\\s)", j)), c = "undefined" == typeof c ? -1 >>> 0 : u.ToUint32(c), f = b.exec(d); f && (g = f.index + f[0].length, !(g > l && (i.push(d.slice(l, f.index)), !a && f.length > 1 && f[0].replace(e, function() {
                    for (var a = 1; a < arguments.length - 2; a++) "undefined" == typeof arguments[a] && (f[a] = void 0)
                }), f.length > 1 && f.index < d.length && k.apply(i, f.slice(1)), h = f[0].length, l = g, i.length >= c)));) b.lastIndex === f.index && b.lastIndex++, f = b.exec(d);
            return l === d.length ? (h || !b.test("")) && i.push("") : i.push(d.slice(l)), i.length > c ? i.slice(0, c) : i
        }
    }() : "0".split(void 0, 0).length && (g.split = function(a, b) {
        return "undefined" == typeof a && 0 === b ? [] : Y.call(this, a, b)
    });
    var Z = g.replace,
        $ = function() {
            var a = [];
            return "x".replace(/x(.)?/g, function(b, c) {
                a.push(c)
            }), 1 === a.length && "undefined" == typeof a[0]
        }();
    $ || (g.replace = function(a, b) {
        var c = o(b),
            d = p(a) && /\)[*?]/.test(a.source);
        if (c && d) {
            var e = function(c) {
                var d = arguments.length,
                    e = a.lastIndex;
                a.lastIndex = 0;
                var f = a.exec(c) || [];
                return a.lastIndex = e, f.push(arguments[d - 2], arguments[d - 1]), b.apply(this, f)
            };
            return Z.call(this, a, e)
        }
        return Z.call(this, a, b)
    });
    var _ = g.substr,
        ab = "".substr && "b" !== "0b".substr(-1);
    t(g, {
        substr: function(a, b) {
            return _.call(this, 0 > a && (a = this.length + a) < 0 ? 0 : a, b)
        }
    }, ab);
    var bb = "	\n\f\r   ᠎             　\u2028\u2029﻿",
        cb = "​",
        db = "[" + bb + "]",
        eb = new RegExp("^" + db + db + "*"),
        fb = new RegExp(db + db + "*$"),
        gb = g.trim && (bb.trim() || !cb.trim());
    t(g, {
        trim: function() {
            if ("undefined" == typeof this || null === this) throw new TypeError("can't convert " + this + " to object");
            return String(this).replace(eb, "").replace(fb, "")
        }
    }, gb), (8 !== parseInt(bb + "08") || 22 !== parseInt(bb + "0x16")) && (parseInt = function(a) {
        var b = /^0[xX]/;
        return function(c, d) {
            return c = String(c).trim(), Number(d) || (d = b.test(c) ? 16 : 10), a(c, d)
        }
    }(parseInt))
}),
function(a, b, c) {
    "use strict";

    function d(a, b) {
        return b = b || Error,
            function() {
                var c, d, e = arguments[0],
                    f = "[" + (a ? a + ":" : "") + e + "] ",
                    g = arguments[1],
                    h = arguments;
                for (c = f + g.replace(/\{\d+\}/g, function(a) {
                        var b = +a.slice(1, -1);
                        return b + 2 < h.length ? mb(h[b + 2]) : a
                    }), c = c + "\nhttp://errors.angularjs.org/1.3.11/" + (a ? a + "/" : "") + e, d = 2; d < arguments.length; d++) c = c + (2 == d ? "?" : "&") + "p" + (d - 2) + "=" + encodeURIComponent(mb(arguments[d]));
                return new b(c)
            }
    }

    function e(a) {
        if (null == a || z(a)) return !1;
        var b = a.length;
        return a.nodeType === qe && b ? !0 : u(a) || je(a) || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
    }

    function f(a, b, c) {
        var d, g;
        if (a)
            if (x(a))
                for (d in a) "prototype" == d || "length" == d || "name" == d || a.hasOwnProperty && !a.hasOwnProperty(d) || b.call(c, a[d], d, a);
            else if (je(a) || e(a)) {
            var h = "object" != typeof a;
            for (d = 0, g = a.length; g > d; d++)(h || d in a) && b.call(c, a[d], d, a)
        } else if (a.forEach && a.forEach !== f) a.forEach(b, c, a);
        else
            for (d in a) a.hasOwnProperty(d) && b.call(c, a[d], d, a);
        return a
    }

    function g(a) {
        return Object.keys(a).sort()
    }

    function h(a, b, c) {
        for (var d = g(a), e = 0; e < d.length; e++) b.call(c, a[d[e]], d[e]);
        return d
    }

    function i(a) {
        return function(b, c) {
            a(c, b)
        }
    }

    function j() {
        return ++he
    }

    function k(a, b) {
        b ? a.$$hashKey = b : delete a.$$hashKey
    }

    function l(a) {
        for (var b = a.$$hashKey, c = 1, d = arguments.length; d > c; c++) {
            var e = arguments[c];
            if (e)
                for (var f = Object.keys(e), g = 0, h = f.length; h > g; g++) {
                    var i = f[g];
                    a[i] = e[i]
                }
        }
        return k(a, b), a
    }

    function m(a) {
        return parseInt(a, 10)
    }

    function n(a, b) {
        return l(Object.create(a), b)
    }

    function o() {}

    function p(a) {
        return a
    }

    function q(a) {
        return function() {
            return a
        }
    }

    function r(a) {
        return "undefined" == typeof a
    }

    function s(a) {
        return "undefined" != typeof a
    }

    function t(a) {
        return null !== a && "object" == typeof a
    }

    function u(a) {
        return "string" == typeof a
    }

    function v(a) {
        return "number" == typeof a
    }

    function w(a) {
        return "[object Date]" === ee.call(a)
    }

    function x(a) {
        return "function" == typeof a
    }

    function y(a) {
        return "[object RegExp]" === ee.call(a)
    }

    function z(a) {
        return a && a.window === a
    }

    function A(a) {
        return a && a.$evalAsync && a.$watch
    }

    function B(a) {
        return "[object File]" === ee.call(a)
    }

    function C(a) {
        return "[object FormData]" === ee.call(a)
    }

    function D(a) {
        return "[object Blob]" === ee.call(a)
    }

    function E(a) {
        return "boolean" == typeof a
    }

    function F(a) {
        return a && x(a.then)
    }

    function G(a) {
        return !(!a || !(a.nodeName || a.prop && a.attr && a.find))
    }

    function H(a) {
        var b, c = {},
            d = a.split(",");
        for (b = 0; b < d.length; b++) c[d[b]] = !0;
        return c
    }

    function I(a) {
        return Ud(a.nodeName || a[0] && a[0].nodeName)
    }

    function J(a, b) {
        var c = a.indexOf(b);
        return c >= 0 && a.splice(c, 1), b
    }

    function K(a, b, c, d) {
        if (z(a) || A(a)) throw fe("cpws", "Can't copy! Making copies of Window or Scope instances is not supported.");
        if (b) {
            if (a === b) throw fe("cpi", "Can't copy! Source and destination are identical.");
            if (c = c || [], d = d || [], t(a)) {
                var e = c.indexOf(a);
                if (-1 !== e) return d[e];
                c.push(a), d.push(b)
            }
            var g;
            if (je(a)) {
                b.length = 0;
                for (var h = 0; h < a.length; h++) g = K(a[h], null, c, d), t(a[h]) && (c.push(a[h]), d.push(g)), b.push(g)
            } else {
                var i = b.$$hashKey;
                je(b) ? b.length = 0 : f(b, function(a, c) {
                    delete b[c]
                });
                for (var j in a) a.hasOwnProperty(j) && (g = K(a[j], null, c, d), t(a[j]) && (c.push(a[j]), d.push(g)), b[j] = g);
                k(b, i)
            }
        } else if (b = a, a)
            if (je(a)) b = K(a, [], c, d);
            else if (w(a)) b = new Date(a.getTime());
        else if (y(a)) b = new RegExp(a.source, a.toString().match(/[^\/]*$/)[0]), b.lastIndex = a.lastIndex;
        else if (t(a)) {
            var l = Object.create(Object.getPrototypeOf(a));
            b = K(a, l, c, d)
        }
        return b
    }

    function L(a, b) {
        if (je(a)) {
            b = b || [];
            for (var c = 0, d = a.length; d > c; c++) b[c] = a[c]
        } else if (t(a)) {
            b = b || {};
            for (var e in a)("$" !== e.charAt(0) || "$" !== e.charAt(1)) && (b[e] = a[e])
        }
        return b || a
    }

    function M(a, b) {
        if (a === b) return !0;
        if (null === a || null === b) return !1;
        if (a !== a && b !== b) return !0;
        var d, e, f, g = typeof a,
            h = typeof b;
        if (g == h && "object" == g) {
            if (!je(a)) {
                if (w(a)) return w(b) ? M(a.getTime(), b.getTime()) : !1;
                if (y(a) && y(b)) return a.toString() == b.toString();
                if (A(a) || A(b) || z(a) || z(b) || je(b)) return !1;
                f = {};
                for (e in a)
                    if ("$" !== e.charAt(0) && !x(a[e])) {
                        if (!M(a[e], b[e])) return !1;
                        f[e] = !0
                    }
                for (e in b)
                    if (!f.hasOwnProperty(e) && "$" !== e.charAt(0) && b[e] !== c && !x(b[e])) return !1;
                return !0
            }
            if (!je(b)) return !1;
            if ((d = a.length) == b.length) {
                for (e = 0; d > e; e++)
                    if (!M(a[e], b[e])) return !1;
                return !0
            }
        }
        return !1
    }

    function N(a, b, c) {
        return a.concat(be.call(b, c))
    }

    function O(a, b) {
        return be.call(a, b || 0)
    }

    function P(a, b) {
        var c = arguments.length > 2 ? O(arguments, 2) : [];
        return !x(b) || b instanceof RegExp ? b : c.length ? function() {
            return arguments.length ? b.apply(a, N(c, arguments, 0)) : b.apply(a, c)
        } : function() {
            return arguments.length ? b.apply(a, arguments) : b.call(a)
        }
    }

    function Q(a, d) {
        var e = d;
        return "string" == typeof a && "$" === a.charAt(0) && "$" === a.charAt(1) ? e = c : z(d) ? e = "$WINDOW" : d && b === d ? e = "$DOCUMENT" : A(d) && (e = "$SCOPE"), e
    }

    function R(a, b) {
        return "undefined" == typeof a ? c : (v(b) || (b = b ? 2 : null), JSON.stringify(a, Q, b))
    }

    function S(a) {
        return u(a) ? JSON.parse(a) : a
    }

    function T(a) {
        a = $d(a).clone();
        try {
            a.empty()
        } catch (b) {}
        var c = $d("<div>").append(a).html();
        try {
            return a[0].nodeType === re ? Ud(c) : c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function(a, b) {
                return "<" + Ud(b)
            })
        } catch (b) {
            return Ud(c)
        }
    }

    function U(a) {
        try {
            return decodeURIComponent(a)
        } catch (b) {}
    }

    function V(a) {
        var b, c, d = {};
        return f((a || "").split("&"), function(a) {
            if (a && (b = a.replace(/\+/g, "%20").split("="), c = U(b[0]), s(c))) {
                var e = s(b[1]) ? U(b[1]) : !0;
                Vd.call(d, c) ? je(d[c]) ? d[c].push(e) : d[c] = [d[c], e] : d[c] = e
            }
        }), d
    }

    function W(a) {
        var b = [];
        return f(a, function(a, c) {
            je(a) ? f(a, function(a) {
                b.push(Y(c, !0) + (a === !0 ? "" : "=" + Y(a, !0)))
            }) : b.push(Y(c, !0) + (a === !0 ? "" : "=" + Y(a, !0)))
        }), b.length ? b.join("&") : ""
    }

    function X(a) {
        return Y(a, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
    }

    function Y(a, b) {
        return encodeURIComponent(a).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%20/g, b ? "%20" : "+")
    }

    function Z(a, b) {
        var c, d, e = ne.length;
        for (a = $d(a), d = 0; e > d; ++d)
            if (c = ne[d] + b, u(c = a.attr(c))) return c;
        return null
    }

    function $(a, b) {
        var c, d, e = {};
        f(ne, function(b) {
            var e = b + "app";
            !c && a.hasAttribute && a.hasAttribute(e) && (c = a, d = a.getAttribute(e))
        }), f(ne, function(b) {
            var e, f = b + "app";
            !c && (e = a.querySelector("[" + f.replace(":", "\\:") + "]")) && (c = e, d = e.getAttribute(f))
        }), c && (e.strictDi = null !== Z(c, "strict-di"), b(c, d ? [d] : [], e))
    }

    function _(c, d, e) {
        t(e) || (e = {});
        var g = {
            strictDi: !1
        };
        e = l(g, e);
        var h = function() {
                if (c = $d(c), c.injector()) {
                    var a = c[0] === b ? "document" : T(c);
                    throw fe("btstrpd", "App Already Bootstrapped with this Element '{0}'", a.replace(/</, "&lt;").replace(/>/, "&gt;"))
                }
                d = d || [], d.unshift(["$provide", function(a) {
                    a.value("$rootElement", c)
                }]), e.debugInfoEnabled && d.push(["$compileProvider", function(a) {
                    a.debugInfoEnabled(!0)
                }]), d.unshift("ng");
                var f = Sb(d, e.strictDi);
                return f.invoke(["$rootScope", "$rootElement", "$compile", "$injector", function(a, b, c, d) {
                    a.$apply(function() {
                        b.data("$injector", d), c(b)(a)
                    })
                }]), f
            },
            i = /^NG_ENABLE_DEBUG_INFO!/,
            j = /^NG_DEFER_BOOTSTRAP!/;
        return a && i.test(a.name) && (e.debugInfoEnabled = !0, a.name = a.name.replace(i, "")), a && !j.test(a.name) ? h() : (a.name = a.name.replace(j, ""), void(ge.resumeBootstrap = function(a) {
            f(a, function(a) {
                d.push(a)
            }), h()
        }))
    }

    function ab() {
        a.name = "NG_ENABLE_DEBUG_INFO!" + a.name, a.location.reload()
    }

    function bb(a) {
        var b = ge.element(a).injector();
        if (!b) throw fe("test", "no injector found for element argument to getTestability");
        return b.get("$$testability")
    }

    function cb(a, b) {
        return b = b || "_", a.replace(oe, function(a, c) {
            return (c ? b : "") + a.toLowerCase()
        })
    }

    function db() {
        var b;
        pe || (_d = a.jQuery, _d && _d.fn.on ? ($d = _d, l(_d.fn, {
            scope: Je.scope,
            isolateScope: Je.isolateScope,
            controller: Je.controller,
            injector: Je.injector,
            inheritedData: Je.inheritedData
        }), b = _d.cleanData, _d.cleanData = function(a) {
            var c;
            if (ie) ie = !1;
            else
                for (var d, e = 0; null != (d = a[e]); e++) c = _d._data(d, "events"), c && c.$destroy && _d(d).triggerHandler("$destroy");
            b(a)
        }) : $d = ub, ge.element = $d, pe = !0)
    }

    function eb(a, b, c) {
        if (!a) throw fe("areq", "Argument '{0}' is {1}", b || "?", c || "required");
        return a
    }

    function fb(a, b, c) {
        return c && je(a) && (a = a[a.length - 1]), eb(x(a), b, "not a function, got " + (a && "object" == typeof a ? a.constructor.name || "Object" : typeof a)), a
    }

    function gb(a, b) {
        if ("hasOwnProperty" === a) throw fe("badname", "hasOwnProperty is not a valid {0} name", b)
    }

    function hb(a, b, c) {
        if (!b) return a;
        for (var d, e = b.split("."), f = a, g = e.length, h = 0; g > h; h++) d = e[h], a && (a = (f = a)[d]);
        return !c && x(a) ? P(f, a) : a
    }

    function ib(a) {
        var b = a[0],
            c = a[a.length - 1],
            d = [b];
        do {
            if (b = b.nextSibling, !b) break;
            d.push(b)
        } while (b !== c);
        return $d(d)
    }

    function jb() {
        return Object.create(null)
    }

    function kb(a) {
        function b(a, b, c) {
            return a[b] || (a[b] = c())
        }
        var c = d("$injector"),
            e = d("ng"),
            f = b(a, "angular", Object);
        return f.$$minErr = f.$$minErr || d, b(f, "module", function() {
            var a = {};
            return function(d, f, g) {
                var h = function(a, b) {
                    if ("hasOwnProperty" === a) throw e("badname", "hasOwnProperty is not a valid {0} name", b)
                };
                return h(d, "module"), f && a.hasOwnProperty(d) && (a[d] = null), b(a, d, function() {
                    function a(a, c, d, e) {
                        return e || (e = b),
                            function() {
                                return e[d || "push"]([a, c, arguments]), j
                            }
                    }
                    if (!f) throw c("nomod", "Module '{0}' is not available! You either misspelled the module name or forgot to load it. If registering a module ensure that you specify the dependencies as the second argument.", d);
                    var b = [],
                        e = [],
                        h = [],
                        i = a("$injector", "invoke", "push", e),
                        j = {
                            _invokeQueue: b,
                            _configBlocks: e,
                            _runBlocks: h,
                            requires: f,
                            name: d,
                            provider: a("$provide", "provider"),
                            factory: a("$provide", "factory"),
                            service: a("$provide", "service"),
                            value: a("$provide", "value"),
                            constant: a("$provide", "constant", "unshift"),
                            animation: a("$animateProvider", "register"),
                            filter: a("$filterProvider", "register"),
                            controller: a("$controllerProvider", "register"),
                            directive: a("$compileProvider", "directive"),
                            config: i,
                            run: function(a) {
                                return h.push(a), this
                            }
                        };
                    return g && i(g), j
                })
            }
        })
    }

    function lb(a) {
        var b = [];
        return JSON.stringify(a, function(a, c) {
            if (c = Q(a, c), t(c)) {
                if (b.indexOf(c) >= 0) return "<<already seen>>";
                b.push(c)
            }
            return c
        })
    }

    function mb(a) {
        return "function" == typeof a ? a.toString().replace(/ \{[\s\S]*$/, "") : "undefined" == typeof a ? "undefined" : "string" != typeof a ? lb(a) : a
    }

    function nb(b) {
        l(b, {
            bootstrap: _,
            copy: K,
            extend: l,
            equals: M,
            element: $d,
            forEach: f,
            injector: Sb,
            noop: o,
            bind: P,
            toJson: R,
            fromJson: S,
            identity: p,
            isUndefined: r,
            isDefined: s,
            isString: u,
            isFunction: x,
            isObject: t,
            isNumber: v,
            isElement: G,
            isArray: je,
            version: ve,
            isDate: w,
            lowercase: Ud,
            uppercase: Wd,
            callbacks: {
                counter: 0
            },
            getTestability: bb,
            $$minErr: d,
            $$csp: me,
            reloadWithDebugInfo: ab
        }), ae = kb(a);
        try {
            ae("ngLocale")
        } catch (c) {
            ae("ngLocale", []).provider("$locale", qc)
        }
        ae("ng", ["ngLocale"], ["$provide", function(a) {
            a.provider({
                $$sanitizeUri: Wc
            }), a.provider("$compile", Zb).directive({
                a: Bf,
                input: Sf,
                textarea: Sf,
                form: Gf,
                script: Hg,
                select: Kg,
                style: Mg,
                option: Lg,
                ngBind: Vf,
                ngBindHtml: Xf,
                ngBindTemplate: Wf,
                ngClass: Zf,
                ngClassEven: _f,
                ngClassOdd: $f,
                ngCloak: ag,
                ngController: bg,
                ngForm: Hf,
                ngHide: Bg,
                ngIf: eg,
                ngInclude: fg,
                ngInit: hg,
                ngNonBindable: vg,
                ngPluralize: wg,
                ngRepeat: xg,
                ngShow: Ag,
                ngStyle: Cg,
                ngSwitch: Dg,
                ngSwitchWhen: Eg,
                ngSwitchDefault: Fg,
                ngOptions: Jg,
                ngTransclude: Gg,
                ngModel: sg,
                ngList: ig,
                ngChange: Yf,
                pattern: Og,
                ngPattern: Og,
                required: Ng,
                ngRequired: Ng,
                minlength: Qg,
                ngMinlength: Qg,
                maxlength: Pg,
                ngMaxlength: Pg,
                ngValue: Uf,
                ngModelOptions: ug
            }).directive({
                ngInclude: gg
            }).directive(Cf).directive(cg), a.provider({
                $anchorScroll: Tb,
                $animate: Te,
                $browser: Wb,
                $cacheFactory: Xb,
                $controller: bc,
                $document: cc,
                $exceptionHandler: dc,
                $filter: gd,
                $interpolate: oc,
                $interval: pc,
                $http: kc,
                $httpBackend: mc,
                $location: Ec,
                $log: Fc,
                $parse: Qc,
                $rootScope: Vc,
                $q: Rc,
                $$q: Sc,
                $sce: $c,
                $sceDelegate: Zc,
                $sniffer: _c,
                $templateCache: Yb,
                $templateRequest: ad,
                $$testability: bd,
                $timeout: cd,
                $window: fd,
                $$rAF: Uc,
                $$asyncCallback: Ub,
                $$jqLite: Nb
            })
        }])
    }

    function ob() {
        return ++xe
    }

    function pb(a) {
        return a.replace(Ae, function(a, b, c, d) {
            return d ? c.toUpperCase() : c
        }).replace(Be, "Moz$1")
    }

    function qb(a) {
        return !Fe.test(a)
    }

    function rb(a) {
        var b = a.nodeType;
        return b === qe || !b || b === te
    }

    function sb(a, b) {
        var c, d, e, g, h = b.createDocumentFragment(),
            i = [];
        if (qb(a)) i.push(b.createTextNode(a));
        else {
            for (c = c || h.appendChild(b.createElement("div")), d = (Ge.exec(a) || ["", ""])[1].toLowerCase(), e = Ie[d] || Ie._default, c.innerHTML = e[1] + a.replace(He, "<$1></$2>") + e[2], g = e[0]; g--;) c = c.lastChild;
            i = N(i, c.childNodes), c = h.firstChild, c.textContent = ""
        }
        return h.textContent = "", h.innerHTML = "", f(i, function(a) {
            h.appendChild(a)
        }), h
    }

    function tb(a, c) {
        c = c || b;
        var d;
        return (d = Ee.exec(a)) ? [c.createElement(d[1])] : (d = sb(a, c)) ? d.childNodes : []
    }

    function ub(a) {
        if (a instanceof ub) return a;
        var b;
        if (u(a) && (a = ke(a), b = !0), !(this instanceof ub)) {
            if (b && "<" != a.charAt(0)) throw De("nosel", "Looking up elements via selectors is not supported by jqLite! See: http://docs.angularjs.org/api/angular.element");
            return new ub(a)
        }
        b ? Eb(this, tb(a)) : Eb(this, a)
    }

    function vb(a) {
        return a.cloneNode(!0)
    }

    function wb(a, b) {
        if (b || yb(a), a.querySelectorAll)
            for (var c = a.querySelectorAll("*"), d = 0, e = c.length; e > d; d++) yb(c[d])
    }

    function xb(a, b, c, d) {
        if (s(d)) throw De("offargs", "jqLite#off() does not support the `selector` argument");
        var e = zb(a),
            g = e && e.events,
            h = e && e.handle;
        if (h)
            if (b) f(b.split(" "), function(b) {
                if (s(c)) {
                    var d = g[b];
                    if (J(d || [], c), d && d.length > 0) return
                }
                ze(a, b, h), delete g[b]
            });
            else
                for (b in g) "$destroy" !== b && ze(a, b, h), delete g[b]
    }

    function yb(a, b) {
        var d = a.ng339,
            e = d && we[d];
        if (e) {
            if (b) return void delete e.data[b];
            e.handle && (e.events.$destroy && e.handle({}, "$destroy"), xb(a)), delete we[d], a.ng339 = c
        }
    }

    function zb(a, b) {
        var d = a.ng339,
            e = d && we[d];
        return b && !e && (a.ng339 = d = ob(), e = we[d] = {
            events: {},
            data: {},
            handle: c
        }), e
    }

    function Ab(a, b, c) {
        if (rb(a)) {
            var d = s(c),
                e = !d && b && !t(b),
                f = !b,
                g = zb(a, !e),
                h = g && g.data;
            if (d) h[b] = c;
            else {
                if (f) return h;
                if (e) return h && h[b];
                l(h, b)
            }
        }
    }

    function Bb(a, b) {
        return a.getAttribute ? (" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + b + " ") > -1 : !1
    }

    function Cb(a, b) {
        b && a.setAttribute && f(b.split(" "), function(b) {
            a.setAttribute("class", ke((" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + ke(b) + " ", " ")))
        })
    }

    function Db(a, b) {
        if (b && a.setAttribute) {
            var c = (" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
            f(b.split(" "), function(a) {
                a = ke(a), -1 === c.indexOf(" " + a + " ") && (c += a + " ")
            }), a.setAttribute("class", ke(c))
        }
    }

    function Eb(a, b) {
        if (b)
            if (b.nodeType) a[a.length++] = b;
            else {
                var c = b.length;
                if ("number" == typeof c && b.window !== b) {
                    if (c)
                        for (var d = 0; c > d; d++) a[a.length++] = b[d]
                } else a[a.length++] = b
            }
    }

    function Fb(a, b) {
        return Gb(a, "$" + (b || "ngController") + "Controller")
    }

    function Gb(a, b, d) {
        a.nodeType == te && (a = a.documentElement);
        for (var e = je(b) ? b : [b]; a;) {
            for (var f = 0, g = e.length; g > f; f++)
                if ((d = $d.data(a, e[f])) !== c) return d;
            a = a.parentNode || a.nodeType === ue && a.host
        }
    }

    function Hb(a) {
        for (wb(a, !0); a.firstChild;) a.removeChild(a.firstChild)
    }

    function Ib(a, b) {
        b || wb(a);
        var c = a.parentNode;
        c && c.removeChild(a)
    }

    function Jb(b, c) {
        c = c || a, "complete" === c.document.readyState ? c.setTimeout(b) : $d(c).on("load", b)
    }

    function Kb(a, b) {
        var c = Ke[b.toLowerCase()];
        return c && Le[I(a)] && c
    }

    function Lb(a, b) {
        var c = a.nodeName;
        return ("INPUT" === c || "TEXTAREA" === c) && Me[b]
    }

    function Mb(a, b) {
        var c = function(c, d) {
            c.isDefaultPrevented = function() {
                return c.defaultPrevented
            };
            var e = b[d || c.type],
                f = e ? e.length : 0;
            if (f) {
                if (r(c.immediatePropagationStopped)) {
                    var g = c.stopImmediatePropagation;
                    c.stopImmediatePropagation = function() {
                        c.immediatePropagationStopped = !0, c.stopPropagation && c.stopPropagation(), g && g.call(c)
                    }
                }
                c.isImmediatePropagationStopped = function() {
                    return c.immediatePropagationStopped === !0
                }, f > 1 && (e = L(e));
                for (var h = 0; f > h; h++) c.isImmediatePropagationStopped() || e[h].call(a, c)
            }
        };
        return c.elem = a, c
    }

    function Nb() {
        this.$get = function() {
            return l(ub, {
                hasClass: function(a, b) {
                    return a.attr && (a = a[0]), Bb(a, b)
                },
                addClass: function(a, b) {
                    return a.attr && (a = a[0]), Db(a, b)
                },
                removeClass: function(a, b) {
                    return a.attr && (a = a[0]), Cb(a, b)
                }
            })
        }
    }

    function Ob(a, b) {
        var c = a && a.$$hashKey;
        if (c) return "function" == typeof c && (c = a.$$hashKey()), c;
        var d = typeof a;
        return c = "function" == d || "object" == d && null !== a ? a.$$hashKey = d + ":" + (b || j)() : d + ":" + a
    }

    function Pb(a, b) {
        if (b) {
            var c = 0;
            this.nextUid = function() {
                return ++c
            }
        }
        f(a, this.put, this)
    }

    function Qb(a) {
        var b = a.toString().replace(Qe, ""),
            c = b.match(Ne);
        return c ? "function(" + (c[1] || "").replace(/[\s\r\n]+/, " ") + ")" : "fn"
    }

    function Rb(a, b, c) {
        var d, e, g, h;
        if ("function" == typeof a) {
            if (!(d = a.$inject)) {
                if (d = [], a.length) {
                    if (b) throw u(c) && c || (c = a.name || Qb(a)), Re("strictdi", "{0} is not using explicit annotation and cannot be invoked in strict mode", c);
                    e = a.toString().replace(Qe, ""), g = e.match(Ne), f(g[1].split(Oe), function(a) {
                        a.replace(Pe, function(a, b, c) {
                            d.push(c)
                        })
                    })
                }
                a.$inject = d
            }
        } else je(a) ? (h = a.length - 1, fb(a[h], "fn"), d = a.slice(0, h)) : fb(a, "fn", !0);
        return d
    }

    function Sb(a, b) {
        function d(a) {
            return function(b, c) {
                return t(b) ? void f(b, i(a)) : a(b, c)
            }
        }

        function e(a, b) {
            if (gb(a, "service"), (x(b) || je(b)) && (b = A.instantiate(b)), !b.$get) throw Re("pget", "Provider '{0}' must define $get factory method.", a);
            return z[a + v] = b
        }

        function g(a, b) {
            return function() {
                var c = C.invoke(b, this);
                if (r(c)) throw Re("undef", "Provider '{0}' must return a value from $get factory method.", a);
                return c
            }
        }

        function h(a, b, c) {
            return e(a, {
                $get: c !== !1 ? g(a, b) : b
            })
        }

        function j(a, b) {
            return h(a, ["$injector", function(a) {
                return a.instantiate(b)
            }])
        }

        function k(a, b) {
            return h(a, q(b), !1)
        }

        function l(a, b) {
            gb(a, "constant"), z[a] = b, B[a] = b
        }

        function m(a, b) {
            var c = A.get(a + v),
                d = c.$get;
            c.$get = function() {
                var a = C.invoke(d, c);
                return C.invoke(b, null, {
                    $delegate: a
                })
            }
        }

        function n(a) {
            var b, c = [];
            return f(a, function(a) {
                function d(a) {
                    var b, c;
                    for (b = 0, c = a.length; c > b; b++) {
                        var d = a[b],
                            e = A.get(d[0]);
                        e[d[1]].apply(e, d[2])
                    }
                }
                if (!y.get(a)) {
                    y.put(a, !0);
                    try {
                        u(a) ? (b = ae(a), c = c.concat(n(b.requires)).concat(b._runBlocks), d(b._invokeQueue), d(b._configBlocks)) : x(a) ? c.push(A.invoke(a)) : je(a) ? c.push(A.invoke(a)) : fb(a, "module")
                    } catch (e) {
                        throw je(a) && (a = a[a.length - 1]), e.message && e.stack && -1 == e.stack.indexOf(e.message) && (e = e.message + "\n" + e.stack), Re("modulerr", "Failed to instantiate module {0} due to:\n{1}", a, e.stack || e.message || e)
                    }
                }
            }), c
        }

        function p(a, c) {
            function d(b, d) {
                if (a.hasOwnProperty(b)) {
                    if (a[b] === s) throw Re("cdep", "Circular dependency found: {0}", b + " <- " + w.join(" <- "));
                    return a[b]
                }
                try {
                    return w.unshift(b), a[b] = s, a[b] = c(b, d)
                } catch (e) {
                    throw a[b] === s && delete a[b], e
                } finally {
                    w.shift()
                }
            }

            function e(a, c, e, f) {
                "string" == typeof e && (f = e, e = null);
                var g, h, i, j = [],
                    k = Rb(a, b, f);
                for (h = 0, g = k.length; g > h; h++) {
                    if (i = k[h], "string" != typeof i) throw Re("itkn", "Incorrect injection token! Expected service name as string, got {0}", i);
                    j.push(e && e.hasOwnProperty(i) ? e[i] : d(i, f))
                }
                return je(a) && (a = a[g]), a.apply(c, j)
            }

            function f(a, b, c) {
                var d = Object.create((je(a) ? a[a.length - 1] : a).prototype || null),
                    f = e(a, d, b, c);
                return t(f) || x(f) ? f : d
            }
            return {
                invoke: e,
                instantiate: f,
                get: d,
                annotate: Rb,
                has: function(b) {
                    return z.hasOwnProperty(b + v) || a.hasOwnProperty(b)
                }
            }
        }
        b = b === !0;
        var s = {},
            v = "Provider",
            w = [],
            y = new Pb([], !0),
            z = {
                $provide: {
                    provider: d(e),
                    factory: d(h),
                    service: d(j),
                    value: d(k),
                    constant: d(l),
                    decorator: m
                }
            },
            A = z.$injector = p(z, function(a, b) {
                throw ge.isString(b) && w.push(b), Re("unpr", "Unknown provider: {0}", w.join(" <- "))
            }),
            B = {},
            C = B.$injector = p(B, function(a, b) {
                var d = A.get(a + v, b);
                return C.invoke(d.$get, d, c, a)
            });
        return f(n(a), function(a) {
            C.invoke(a || o)
        }), C
    }

    function Tb() {
        var a = !0;
        this.disableAutoScrolling = function() {
            a = !1
        }, this.$get = ["$window", "$location", "$rootScope", function(b, c, d) {
            function e(a) {
                var b = null;
                return Array.prototype.some.call(a, function(a) {
                    return "a" === I(a) ? (b = a, !0) : void 0
                }), b
            }

            function f() {
                var a = h.yOffset;
                if (x(a)) a = a();
                else if (G(a)) {
                    var c = a[0],
                        d = b.getComputedStyle(c);
                    a = "fixed" !== d.position ? 0 : c.getBoundingClientRect().bottom
                } else v(a) || (a = 0);
                return a
            }

            function g(a) {
                if (a) {
                    a.scrollIntoView();
                    var c = f();
                    if (c) {
                        var d = a.getBoundingClientRect().top;
                        b.scrollBy(0, d - c)
                    }
                } else b.scrollTo(0, 0)
            }

            function h() {
                var a, b = c.hash();
                b ? (a = i.getElementById(b)) ? g(a) : (a = e(i.getElementsByName(b))) ? g(a) : "top" === b && g(null) : g(null)
            }
            var i = b.document;
            return a && d.$watch(function() {
                return c.hash()
            }, function(a, b) {
                (a !== b || "" !== a) && Jb(function() {
                    d.$evalAsync(h)
                })
            }), h
        }]
    }

    function Ub() {
        this.$get = ["$$rAF", "$timeout", function(a, b) {
            return a.supported ? function(b) {
                return a(b)
            } : function(a) {
                return b(a, 0, !1)
            }
        }]
    }

    function Vb(a, b, d, e) {
        function g(a) {
            try {
                a.apply(null, O(arguments, 1))
            } finally {
                if (x--, 0 === x)
                    for (; y.length;) try {
                        y.pop()()
                    } catch (b) {
                        d.error(b)
                    }
            }
        }

        function h(a) {
            var b = a.indexOf("#");
            return -1 === b ? "" : a.substr(b + 1)
        }

        function i(a, b) {
            ! function c() {
                f(A, function(a) {
                    a()
                }), z = b(c, a)
            }()
        }

        function j() {
            k(), l()
        }

        function k() {
            B = a.history.state, B = r(B) ? null : B, M(B, I) && (B = I), I = B
        }

        function l() {
            (D !== n.url() || C !== B) && (D = n.url(), C = B, f(G, function(a) {
                a(n.url(), B)
            }))
        }

        function m(a) {
            try {
                return decodeURIComponent(a)
            } catch (b) {
                return a
            }
        }
        var n = this,
            p = b[0],
            q = a.location,
            s = a.history,
            t = a.setTimeout,
            v = a.clearTimeout,
            w = {};
        n.isMock = !1;
        var x = 0,
            y = [];
        n.$$completeOutstandingRequest = g, n.$$incOutstandingRequestCount = function() {
            x++
        }, n.notifyWhenNoOutstandingRequests = function(a) {
            f(A, function(a) {
                a()
            }), 0 === x ? a() : y.push(a)
        };
        var z, A = [];
        n.addPollFn = function(a) {
            return r(z) && i(100, t), A.push(a), a
        };
        var B, C, D = q.href,
            E = b.find("base"),
            F = null;
        k(), C = B, n.url = function(b, c, d) {
            if (r(d) && (d = null), q !== a.location && (q = a.location), s !== a.history && (s = a.history), b) {
                var f = C === d;
                if (D === b && (!e.history || f)) return n;
                var g = D && vc(D) === vc(b);
                return D = b, C = d, !e.history || g && f ? (g || (F = b), c ? q.replace(b) : g ? q.hash = h(b) : q.href = b) : (s[c ? "replaceState" : "pushState"](d, "", b), k(), C = B), n
            }
            return F || q.href.replace(/%27/g, "'")
        }, n.state = function() {
            return B
        };
        var G = [],
            H = !1,
            I = null;
        n.onUrlChange = function(b) {
            return H || (e.history && $d(a).on("popstate", j), $d(a).on("hashchange", j), H = !0), G.push(b), b
        }, n.$$checkUrlChange = l, n.baseHref = function() {
            var a = E.attr("href");
            return a ? a.replace(/^(https?\:)?\/\/[^\/]*/, "") : ""
        };
        var J = {},
            K = "",
            L = n.baseHref();
        n.cookies = function(a, b) {
            var e, f, g, h, i;
            if (!a) {
                if (p.cookie !== K)
                    for (K = p.cookie, f = K.split("; "), J = {}, h = 0; h < f.length; h++) g = f[h], i = g.indexOf("="), i > 0 && (a = m(g.substring(0, i)), J[a] === c && (J[a] = m(g.substring(i + 1))));
                return J
            }
            b === c ? p.cookie = encodeURIComponent(a) + "=;path=" + L + ";expires=Thu, 01 Jan 1970 00:00:00 GMT" : u(b) && (e = (p.cookie = encodeURIComponent(a) + "=" + encodeURIComponent(b) + ";path=" + L).length + 1, e > 4096 && d.warn("Cookie '" + a + "' possibly not set or overflowed because it was too large (" + e + " > 4096 bytes)!"))
        }, n.defer = function(a, b) {
            var c;
            return x++, c = t(function() {
                delete w[c], g(a)
            }, b || 0), w[c] = !0, c
        }, n.defer.cancel = function(a) {
            return w[a] ? (delete w[a], v(a), g(o), !0) : !1
        }
    }

    function Wb() {
        this.$get = ["$window", "$log", "$sniffer", "$document", function(a, b, c, d) {
            return new Vb(a, d, b, c)
        }]
    }

    function Xb() {
        this.$get = function() {
            function a(a, c) {
                function e(a) {
                    a != m && (n ? n == a && (n = a.n) : n = a, f(a.n, a.p), f(a, m), m = a, m.n = null)
                }

                function f(a, b) {
                    a != b && (a && (a.p = b), b && (b.n = a))
                }
                if (a in b) throw d("$cacheFactory")("iid", "CacheId '{0}' is already taken!", a);
                var g = 0,
                    h = l({}, c, {
                        id: a
                    }),
                    i = {},
                    j = c && c.capacity || Number.MAX_VALUE,
                    k = {},
                    m = null,
                    n = null;
                return b[a] = {
                    put: function(a, b) {
                        if (j < Number.MAX_VALUE) {
                            var c = k[a] || (k[a] = {
                                key: a
                            });
                            e(c)
                        }
                        if (!r(b)) return a in i || g++, i[a] = b, g > j && this.remove(n.key), b
                    },
                    get: function(a) {
                        if (j < Number.MAX_VALUE) {
                            var b = k[a];
                            if (!b) return;
                            e(b)
                        }
                        return i[a]
                    },
                    remove: function(a) {
                        if (j < Number.MAX_VALUE) {
                            var b = k[a];
                            if (!b) return;
                            b == m && (m = b.p), b == n && (n = b.n), f(b.n, b.p), delete k[a]
                        }
                        delete i[a], g--
                    },
                    removeAll: function() {
                        i = {}, g = 0, k = {}, m = n = null
                    },
                    destroy: function() {
                        i = null, h = null, k = null, delete b[a]
                    },
                    info: function() {
                        return l({}, h, {
                            size: g
                        })
                    }
                }
            }
            var b = {};
            return a.info = function() {
                var a = {};
                return f(b, function(b, c) {
                    a[c] = b.info()
                }), a
            }, a.get = function(a) {
                return b[a]
            }, a
        }
    }

    function Yb() {
        this.$get = ["$cacheFactory", function(a) {
            return a("templates")
        }]
    }

    function Zb(a, d) {
        function e(a, b) {
            var c = /^\s*([@&]|=(\*?))(\??)\s*(\w*)\s*$/,
                d = {};
            return f(a, function(a, e) {
                var f = a.match(c);
                if (!f) throw Ue("iscp", "Invalid isolate scope definition for directive '{0}'. Definition: {... {1}: '{2}' ...}", b, e, a);
                d[e] = {
                    mode: f[1][0],
                    collection: "*" === f[2],
                    optional: "?" === f[3],
                    attrName: f[4] || e
                }
            }), d
        }
        var g = {},
            h = "Directive",
            j = /^\s*directive\:\s*([\w\-]+)\s+(.*)$/,
            k = /(([\w\-]+)(?:\:([^;]+))?;?)/,
            m = H("ngSrc,ngSrcset,src,srcset"),
            r = /^(?:(\^\^?)?(\?)?(\^\^?)?)?/,
            v = /^(on[a-z]+|formaction)$/;
        this.directive = function y(b, c) {
            return gb(b, "directive"), u(b) ? (eb(c, "directiveFactory"), g.hasOwnProperty(b) || (g[b] = [], a.factory(b + h, ["$injector", "$exceptionHandler", function(a, c) {
                var d = [];
                return f(g[b], function(f, g) {
                    try {
                        var h = a.invoke(f);
                        x(h) ? h = {
                            compile: q(h)
                        } : !h.compile && h.link && (h.compile = q(h.link)), h.priority = h.priority || 0, h.index = g, h.name = h.name || b, h.require = h.require || h.controller && h.name, h.restrict = h.restrict || "EA", t(h.scope) && (h.$$isolateBindings = e(h.scope, h.name)), d.push(h)
                    } catch (i) {
                        c(i)
                    }
                }), d
            }])), g[b].push(c)) : f(b, i(y)), this
        }, this.aHrefSanitizationWhitelist = function(a) {
            return s(a) ? (d.aHrefSanitizationWhitelist(a), this) : d.aHrefSanitizationWhitelist()
        }, this.imgSrcSanitizationWhitelist = function(a) {
            return s(a) ? (d.imgSrcSanitizationWhitelist(a), this) : d.imgSrcSanitizationWhitelist()
        };
        var w = !0;
        this.debugInfoEnabled = function(a) {
            return s(a) ? (w = a, this) : w
        }, this.$get = ["$injector", "$interpolate", "$exceptionHandler", "$templateRequest", "$parse", "$controller", "$rootScope", "$document", "$sce", "$animate", "$$sanitizeUri", function(a, d, e, i, q, s, y, z, B, C, D) {
            function E(a, b) {
                try {
                    a.addClass(b)
                } catch (c) {}
            }

            function F(a, b, c, d, e) {
                a instanceof $d || (a = $d(a)), f(a, function(b, c) {
                    b.nodeType == re && b.nodeValue.match(/\S+/) && (a[c] = $d(b).wrap("<span></span>").parent()[0])
                });
                var g = H(a, b, a, c, d, e);
                F.$$addScopeClass(a);
                var h = null;
                return function(b, c, d) {
                    eb(b, "scope"), d = d || {};
                    var e = d.parentBoundTranscludeFn,
                        f = d.transcludeControllers,
                        i = d.futureParentElement;
                    e && e.$$boundTransclude && (e = e.$$boundTransclude), h || (h = G(i));
                    var j;
                    if (j = "html" !== h ? $d($(h, $d("<div>").append(a).html())) : c ? Je.clone.call(a) : a, f)
                        for (var k in f) j.data("$" + k + "Controller", f[k].instance);
                    return F.$$addScopeInfo(j, b), c && c(j, b), g && g(b, j, j, e), j
                }
            }

            function G(a) {
                var b = a && a[0];
                return b && "foreignobject" !== I(b) && b.toString().match(/SVG/) ? "svg" : "html"
            }

            function H(a, b, d, e, f, g) {
                function h(a, d, e, f) {
                    var g, h, i, j, k, l, m, n, q;
                    if (o) {
                        var r = d.length;
                        for (q = new Array(r), k = 0; k < p.length; k += 3) m = p[k], q[m] = d[m]
                    } else q = d;
                    for (k = 0, l = p.length; l > k;) i = q[p[k++]], g = p[k++], h = p[k++], g ? (g.scope ? (j = a.$new(), F.$$addScopeInfo($d(i), j)) : j = a, n = g.transcludeOnThisElement ? K(a, g.transclude, f, g.elementTranscludeOnThisElement) : !g.templateOnThisElement && f ? f : !f && b ? K(a, b) : null, g(h, j, i, e, n)) : h && h(a, i.childNodes, c, f)
                }
                for (var i, j, k, l, m, n, o, p = [], q = 0; q < a.length; q++) i = new gb, j = L(a[q], [], i, 0 === q ? e : c, f), k = j.length ? Q(j, a[q], i, b, d, null, [], [], g) : null, k && k.scope && F.$$addScopeClass(i.$$element), m = k && k.terminal || !(l = a[q].childNodes) || !l.length ? null : H(l, k ? (k.transcludeOnThisElement || !k.templateOnThisElement) && k.transclude : b), (k || m) && (p.push(q, k, m), n = !0, o = o || k), g = null;
                return n ? h : null
            }

            function K(a, b, c) {
                var d = function(d, e, f, g, h) {
                    return d || (d = a.$new(!1, h), d.$$transcluded = !0), b(d, e, {
                        parentBoundTranscludeFn: c,
                        transcludeControllers: f,
                        futureParentElement: g
                    })
                };
                return d
            }

            function L(a, b, c, d, e) {
                var f, g, h = a.nodeType,
                    i = c.$attr;
                switch (h) {
                    case qe:
                        S(b, $b(I(a)), "E", d, e);
                        for (var l, m, n, o, p, q, r = a.attributes, s = 0, v = r && r.length; v > s; s++) {
                            var w = !1,
                                x = !1;
                            l = r[s], m = l.name, p = ke(l.value), o = $b(m), (q = lb.test(o)) && (m = m.replace(Ve, "").substr(8).replace(/_(.)/g, function(a, b) {
                                return b.toUpperCase()
                            }));
                            var y = o.replace(/(Start|End)$/, "");
                            U(y) && o === y + "Start" && (w = m, x = m.substr(0, m.length - 5) + "end", m = m.substr(0, m.length - 6)), n = $b(m.toLowerCase()), i[n] = m, (q || !c.hasOwnProperty(n)) && (c[n] = p, Kb(a, n) && (c[n] = !0)), ab(a, b, p, n, q), S(b, n, "A", d, e, w, x)
                        }
                        if (g = a.className, t(g) && (g = g.animVal), u(g) && "" !== g)
                            for (; f = k.exec(g);) n = $b(f[2]), S(b, n, "C", d, e) && (c[n] = ke(f[3])), g = g.substr(f.index + f[0].length);
                        break;
                    case re:
                        Z(b, a.nodeValue);
                        break;
                    case se:
                        try {
                            f = j.exec(a.nodeValue), f && (n = $b(f[1]), S(b, n, "M", d, e) && (c[n] = ke(f[2])))
                        } catch (z) {}
                }
                return b.sort(X), b
            }

            function N(a, b, c) {
                var d = [],
                    e = 0;
                if (b && a.hasAttribute && a.hasAttribute(b)) {
                    do {
                        if (!a) throw Ue("uterdir", "Unterminated attribute, found '{0}' but no matching '{1}' found.", b, c);
                        a.nodeType == qe && (a.hasAttribute(b) && e++, a.hasAttribute(c) && e--), d.push(a), a = a.nextSibling
                    } while (e > 0)
                } else d.push(a);
                return $d(d)
            }

            function P(a, b, c) {
                return function(d, e, f, g, h) {
                    return e = N(e[0], b, c), a(d, e, f, g, h)
                }
            }

            function Q(a, g, h, i, j, k, l, m, n) {
                function o(a, b, c, d) {
                    a && (c && (a = P(a, c, d)), a.require = z.require, a.directiveName = B, (I === z || z.$$isolateScope) && (a = db(a, {
                        isolateScope: !0
                    })), l.push(a)), b && (c && (b = P(b, c, d)), b.require = z.require, b.directiveName = B, (I === z || z.$$isolateScope) && (b = db(b, {
                        isolateScope: !0
                    })), m.push(b))
                }

                function p(a, b, c, d) {
                    var e, g, h = "data",
                        i = !1,
                        j = c;
                    if (u(b)) {
                        if (g = b.match(r), b = b.substring(g[0].length), g[3] && (g[1] ? g[3] = null : g[1] = g[3]), "^" === g[1] ? h = "inheritedData" : "^^" === g[1] && (h = "inheritedData", j = c.parent()), "?" === g[2] && (i = !0), e = null, d && "data" === h && (e = d[b]) && (e = e.instance), e = e || j[h]("$" + b + "Controller"), !e && !i) throw Ue("ctreq", "Controller '{0}', required by directive '{1}', can't be found!", b, a);
                        return e || null
                    }
                    return je(b) && (e = [], f(b, function(b) {
                        e.push(p(a, b, c, d))
                    })), e
                }

                function v(a, b, e, i, j) {
                    function k(a, b, d) {
                        var e;
                        return A(a) || (d = b, b = a, a = c), U && (e = v), d || (d = U ? x.parent() : x), j(a, b, e, d, D)
                    }
                    var n, o, r, t, u, v, w, x, z;
                    if (g === e ? (z = h, x = h.$$element) : (x = $d(e), z = new gb(x, h)), I && (u = b.$new(!0)), j && (w = k, w.$$boundTransclude = j), H && (y = {}, v = {}, f(H, function(a) {
                            var c, d = {
                                $scope: a === I || a.$$isolateScope ? u : b,
                                $element: x,
                                $attrs: z,
                                $transclude: w
                            };
                            t = a.controller, "@" == t && (t = z[a.name]), c = s(t, d, !0, a.controllerAs), v[a.name] = c, U || x.data("$" + a.name + "Controller", c.instance), y[a.name] = c
                        })), I) {
                        F.$$addScopeInfo(x, u, !0, !(J && (J === I || J === I.$$originalDirective))), F.$$addScopeClass(x, !0);
                        var B = y && y[I.name],
                            C = u;
                        B && B.identifier && I.bindToController === !0 && (C = B.instance), f(u.$$isolateBindings = I.$$isolateBindings, function(a, c) {
                            var e, f, g, h, i = a.attrName,
                                j = a.optional,
                                k = a.mode;
                            switch (k) {
                                case "@":
                                    z.$observe(i, function(a) {
                                        C[c] = a
                                    }), z.$$observers[i].$$scope = b, z[i] && (C[c] = d(z[i])(b));
                                    break;
                                case "=":
                                    if (j && !z[i]) return;
                                    f = q(z[i]), h = f.literal ? M : function(a, b) {
                                        return a === b || a !== a && b !== b
                                    }, g = f.assign || function() {
                                        throw e = C[c] = f(b), Ue("nonassign", "Expression '{0}' used with directive '{1}' is non-assignable!", z[i], I.name)
                                    }, e = C[c] = f(b);
                                    var l = function(a) {
                                        return h(a, C[c]) || (h(a, e) ? g(b, a = C[c]) : C[c] = a), e = a
                                    };
                                    l.$stateful = !0;
                                    var m;
                                    m = a.collection ? b.$watchCollection(z[i], l) : b.$watch(q(z[i], l), null, f.literal), u.$on("$destroy", m);
                                    break;
                                case "&":
                                    f = q(z[i]), C[c] = function(a) {
                                        return f(b, a)
                                    }
                            }
                        })
                    }
                    for (y && (f(y, function(a) {
                            a()
                        }), y = null), n = 0, o = l.length; o > n; n++) r = l[n], fb(r, r.isolateScope ? u : b, x, z, r.require && p(r.directiveName, r.require, x, v), w);
                    var D = b;
                    for (I && (I.template || null === I.templateUrl) && (D = u), a && a(D, e.childNodes, c, j), n = m.length - 1; n >= 0; n--) r = m[n], fb(r, r.isolateScope ? u : b, x, z, r.require && p(r.directiveName, r.require, x, v), w)
                }
                n = n || {};
                for (var w, y, z, B, C, D, E, G = -Number.MAX_VALUE, H = n.controllerDirectives, I = n.newIsolateScopeDirective, J = n.templateDirective, K = n.nonTlbTranscludeDirective, Q = !1, S = !1, U = n.hasElementTranscludeDirective, X = h.$$element = $d(g), Z = k, _ = i, ab = 0, cb = a.length; cb > ab; ab++) {
                    z = a[ab];
                    var eb = z.$$start,
                        hb = z.$$end;
                    if (eb && (X = N(g, eb, hb)), C = c, G > z.priority) break;
                    if ((E = z.scope) && (z.templateUrl || (t(E) ? (Y("new/isolated scope", I || w, z, X), I = z) : Y("new/isolated scope", I, z, X)), w = w || z), B = z.name, !z.templateUrl && z.controller && (E = z.controller, H = H || {}, Y("'" + B + "' controller", H[B], z, X), H[B] = z), (E = z.transclude) && (Q = !0, z.$$tlb || (Y("transclusion", K, z, X), K = z), "element" == E ? (U = !0, G = z.priority, C = X, X = h.$$element = $d(b.createComment(" " + B + ": " + h[B] + " ")), g = X[0], bb(j, O(C), g), _ = F(C, i, G, Z && Z.name, {
                            nonTlbTranscludeDirective: K
                        })) : (C = $d(vb(g)).contents(), X.empty(), _ = F(C, i))), z.template)
                        if (S = !0, Y("template", J, z, X), J = z, E = x(z.template) ? z.template(X, h) : z.template, E = kb(E), z.replace) {
                            if (Z = z, C = qb(E) ? [] : ac($(z.templateNamespace, ke(E))), g = C[0], 1 != C.length || g.nodeType !== qe) throw Ue("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", B, "");
                            bb(j, X, g);
                            var ib = {
                                    $attr: {}
                                },
                                jb = L(g, [], ib),
                                lb = a.splice(ab + 1, a.length - (ab + 1));
                            I && R(jb), a = a.concat(jb).concat(lb), V(h, ib), cb = a.length
                        } else X.html(E);
                    if (z.templateUrl) S = !0, Y("template", J, z, X), J = z, z.replace && (Z = z), v = W(a.splice(ab, a.length - ab), X, h, j, Q && _, l, m, {
                        controllerDirectives: H,
                        newIsolateScopeDirective: I,
                        templateDirective: J,
                        nonTlbTranscludeDirective: K
                    }), cb = a.length;
                    else if (z.compile) try {
                        D = z.compile(X, h, _), x(D) ? o(null, D, eb, hb) : D && o(D.pre, D.post, eb, hb)
                    } catch (mb) {
                        e(mb, T(X))
                    }
                    z.terminal && (v.terminal = !0, G = Math.max(G, z.priority))
                }
                return v.scope = w && w.scope === !0, v.transcludeOnThisElement = Q, v.elementTranscludeOnThisElement = U, v.templateOnThisElement = S, v.transclude = _, n.hasElementTranscludeDirective = U, v
            }

            function R(a) {
                for (var b = 0, c = a.length; c > b; b++) a[b] = n(a[b], {
                    $$isolateScope: !0
                })
            }

            function S(b, d, f, i, j, k, l) {
                if (d === j) return null;
                var m = null;
                if (g.hasOwnProperty(d))
                    for (var o, p = a.get(d + h), q = 0, r = p.length; r > q; q++) try {
                        o = p[q], (i === c || i > o.priority) && -1 != o.restrict.indexOf(f) && (k && (o = n(o, {
                            $$start: k,
                            $$end: l
                        })), b.push(o), m = o)
                    } catch (s) {
                        e(s)
                    }
                return m
            }

            function U(b) {
                if (g.hasOwnProperty(b))
                    for (var c, d = a.get(b + h), e = 0, f = d.length; f > e; e++)
                        if (c = d[e], c.multiElement) return !0;
                return !1
            }

            function V(a, b) {
                var c = b.$attr,
                    d = a.$attr,
                    e = a.$$element;
                f(a, function(d, e) {
                    "$" != e.charAt(0) && (b[e] && b[e] !== d && (d += ("style" === e ? ";" : " ") + b[e]), a.$set(e, d, !0, c[e]))
                }), f(b, function(b, f) {
                    "class" == f ? (E(e, b), a["class"] = (a["class"] ? a["class"] + " " : "") + b) : "style" == f ? (e.attr("style", e.attr("style") + ";" + b), a.style = (a.style ? a.style + ";" : "") + b) : "$" == f.charAt(0) || a.hasOwnProperty(f) || (a[f] = b, d[f] = c[f])
                })
            }

            function W(a, b, c, d, e, g, h, j) {
                var k, m, n = [],
                    o = b[0],
                    p = a.shift(),
                    q = l({}, p, {
                        templateUrl: null,
                        transclude: null,
                        replace: null,
                        $$originalDirective: p
                    }),
                    r = x(p.templateUrl) ? p.templateUrl(b, c) : p.templateUrl,
                    s = p.templateNamespace;
                return b.empty(), i(B.getTrustedResourceUrl(r)).then(function(i) {
                        var l, u, v, w;
                        if (i = kb(i), p.replace) {
                            if (v = qb(i) ? [] : ac($(s, ke(i))), l = v[0], 1 != v.length || l.nodeType !== qe) throw Ue("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", p.name, r);
                            u = {
                                $attr: {}
                            }, bb(d, b, l);
                            var x = L(l, [], u);
                            t(p.scope) && R(x), a = x.concat(a), V(c, u)
                        } else l = o, b.html(i);
                        for (a.unshift(q), k = Q(a, l, c, e, b, p, g, h, j), f(d, function(a, c) {
                                a == l && (d[c] = b[0])
                            }), m = H(b[0].childNodes, e); n.length;) {
                            var y = n.shift(),
                                z = n.shift(),
                                A = n.shift(),
                                B = n.shift(),
                                C = b[0];
                            if (!y.$$destroyed) {
                                if (z !== o) {
                                    var D = z.className;
                                    j.hasElementTranscludeDirective && p.replace || (C = vb(l)), bb(A, $d(z), C), E($d(C), D)
                                }
                                w = k.transcludeOnThisElement ? K(y, k.transclude, B) : B, k(m, y, C, d, w)
                            }
                        }
                        n = null
                    }),
                    function(a, b, c, d, e) {
                        var f = e;
                        b.$$destroyed || (n ? n.push(b, c, d, f) : (k.transcludeOnThisElement && (f = K(b, k.transclude, e)), k(m, b, c, d, f)))
                    }
            }

            function X(a, b) {
                var c = b.priority - a.priority;
                return 0 !== c ? c : a.name !== b.name ? a.name < b.name ? -1 : 1 : a.index - b.index
            }

            function Y(a, b, c, d) {
                if (b) throw Ue("multidir", "Multiple directives [{0}, {1}] asking for {2} on: {3}", b.name, c.name, a, T(d))
            }

            function Z(a, b) {
                var c = d(b, !0);
                c && a.push({
                    priority: 0,
                    compile: function(a) {
                        var b = a.parent(),
                            d = !!b.length;
                        return d && F.$$addBindingClass(b),
                            function(a, b) {
                                var e = b.parent();
                                d || F.$$addBindingClass(e), F.$$addBindingInfo(e, c.expressions), a.$watch(c, function(a) {
                                    b[0].nodeValue = a
                                })
                            }
                    }
                })
            }

            function $(a, c) {
                switch (a = Ud(a || "html")) {
                    case "svg":
                    case "math":
                        var d = b.createElement("div");
                        return d.innerHTML = "<" + a + ">" + c + "</" + a + ">", d.childNodes[0].childNodes;
                    default:
                        return c
                }
            }

            function _(a, b) {
                if ("srcdoc" == b) return B.HTML;
                var c = I(a);
                return "xlinkHref" == b || "form" == c && "action" == b || "img" != c && ("src" == b || "ngSrc" == b) ? B.RESOURCE_URL : void 0
            }

            function ab(a, b, c, e, f) {
                var g = _(a, e);
                f = m[e] || f;
                var h = d(c, !0, g, f);
                if (h) {
                    if ("multiple" === e && "select" === I(a)) throw Ue("selmulti", "Binding to the 'multiple' attribute is not supported. Element: {0}", T(a));
                    b.push({
                        priority: 100,
                        compile: function() {
                            return {
                                pre: function(a, b, i) {
                                    var j = i.$$observers || (i.$$observers = {});
                                    if (v.test(e)) throw Ue("nodomevents", "Interpolations for HTML DOM event attributes are disallowed.  Please use the ng- versions (such as ng-click instead of onclick) instead.");
                                    var k = i[e];
                                    k !== c && (h = k && d(k, !0, g, f), c = k), h && (i[e] = h(a), (j[e] || (j[e] = [])).$$inter = !0, (i.$$observers && i.$$observers[e].$$scope || a).$watch(h, function(a, b) {
                                        "class" === e && a != b ? i.$updateClass(a, b) : i.$set(e, a)
                                    }))
                                }
                            }
                        }
                    })
                }
            }

            function bb(a, c, d) {
                var e, f, g = c[0],
                    h = c.length,
                    i = g.parentNode;
                if (a)
                    for (e = 0, f = a.length; f > e; e++)
                        if (a[e] == g) {
                            a[e++] = d;
                            for (var j = e, k = j + h - 1, l = a.length; l > j; j++, k++) l > k ? a[j] = a[k] : delete a[j];
                            a.length -= h - 1, a.context === g && (a.context = d);
                            break
                        }
                i && i.replaceChild(d, g);
                var m = b.createDocumentFragment();
                m.appendChild(g), $d(d).data($d(g).data()), _d ? (ie = !0, _d.cleanData([g])) : delete $d.cache[g[$d.expando]];
                for (var n = 1, o = c.length; o > n; n++) {
                    var p = c[n];
                    $d(p).remove(), m.appendChild(p), delete c[n]
                }
                c[0] = d, c.length = 1
            }

            function db(a, b) {
                return l(function() {
                    return a.apply(null, arguments)
                }, a, b)
            }

            function fb(a, b, c, d, f, g) {
                try {
                    a(b, c, d, f, g)
                } catch (h) {
                    e(h, T(c))
                }
            }
            var gb = function(a, b) {
                if (b) {
                    var c, d, e, f = Object.keys(b);
                    for (c = 0, d = f.length; d > c; c++) e = f[c], this[e] = b[e]
                } else this.$attr = {};
                this.$$element = a
            };
            gb.prototype = {
                $normalize: $b,
                $addClass: function(a) {
                    a && a.length > 0 && C.addClass(this.$$element, a)
                },
                $removeClass: function(a) {
                    a && a.length > 0 && C.removeClass(this.$$element, a)
                },
                $updateClass: function(a, b) {
                    var c = _b(a, b);
                    c && c.length && C.addClass(this.$$element, c);
                    var d = _b(b, a);
                    d && d.length && C.removeClass(this.$$element, d)
                },
                $set: function(a, b, d, g) {
                    var h, i = this.$$element[0],
                        j = Kb(i, a),
                        k = Lb(i, a),
                        l = a;
                    if (j ? (this.$$element.prop(a, b), g = j) : k && (this[k] = b, l = k), this[a] = b, g ? this.$attr[a] = g : (g = this.$attr[a], g || (this.$attr[a] = g = cb(a, "-"))), h = I(this.$$element), "a" === h && "href" === a || "img" === h && "src" === a) this[a] = b = D(b, "src" === a);
                    else if ("img" === h && "srcset" === a) {
                        for (var m = "", n = ke(b), o = /(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/, p = /\s/.test(n) ? o : /(,)/, q = n.split(p), r = Math.floor(q.length / 2), s = 0; r > s; s++) {
                            var t = 2 * s;
                            m += D(ke(q[t]), !0), m += " " + ke(q[t + 1])
                        }
                        var u = ke(q[2 * s]).split(/\s/);
                        m += D(ke(u[0]), !0), 2 === u.length && (m += " " + ke(u[1])), this[a] = b = m
                    }
                    d !== !1 && (null === b || b === c ? this.$$element.removeAttr(g) : this.$$element.attr(g, b));
                    var v = this.$$observers;
                    v && f(v[l], function(a) {
                        try {
                            a(b)
                        } catch (c) {
                            e(c)
                        }
                    })
                },
                $observe: function(a, b) {
                    var c = this,
                        d = c.$$observers || (c.$$observers = jb()),
                        e = d[a] || (d[a] = []);
                    return e.push(b), y.$evalAsync(function() {
                            !e.$$inter && c.hasOwnProperty(a) && b(c[a])
                        }),
                        function() {
                            J(e, b)
                        }
                }
            };
            var hb = d.startSymbol(),
                ib = d.endSymbol(),
                kb = "{{" == hb || "}}" == ib ? p : function(a) {
                    return a.replace(/\{\{/g, hb).replace(/}}/g, ib)
                },
                lb = /^ngAttr[A-Z]/;
            return F.$$addBindingInfo = w ? function(a, b) {
                var c = a.data("$binding") || [];
                je(b) ? c = c.concat(b) : c.push(b), a.data("$binding", c)
            } : o, F.$$addBindingClass = w ? function(a) {
                E(a, "ng-binding")
            } : o, F.$$addScopeInfo = w ? function(a, b, c, d) {
                var e = c ? d ? "$isolateScopeNoTemplate" : "$isolateScope" : "$scope";
                a.data(e, b)
            } : o, F.$$addScopeClass = w ? function(a, b) {
                E(a, b ? "ng-isolate-scope" : "ng-scope")
            } : o, F
        }]
    }

    function $b(a) {
        return pb(a.replace(Ve, ""))
    }

    function _b(a, b) {
        var c = "",
            d = a.split(/\s+/),
            e = b.split(/\s+/);
        a: for (var f = 0; f < d.length; f++) {
            for (var g = d[f], h = 0; h < e.length; h++)
                if (g == e[h]) continue a;
            c += (c.length > 0 ? " " : "") + g
        }
        return c
    }

    function ac(a) {
        a = $d(a);
        var b = a.length;
        if (1 >= b) return a;
        for (; b--;) {
            var c = a[b];
            c.nodeType === se && ce.call(a, b, 1)
        }
        return a
    }

    function bc() {
        var a = {},
            b = !1,
            e = /^(\S+)(\s+as\s+(\w+))?$/;
        this.register = function(b, c) {
            gb(b, "controller"), t(b) ? l(a, b) : a[b] = c
        }, this.allowGlobals = function() {
            b = !0
        }, this.$get = ["$injector", "$window", function(f, g) {
            function h(a, b, c, e) {
                if (!a || !t(a.$scope)) throw d("$controller")("noscp", "Cannot export controller '{0}' as '{1}'! No $scope object provided via `locals`.", e, b);
                a.$scope[b] = c
            }
            return function(d, i, j, k) {
                var m, n, o, p;
                if (j = j === !0, k && u(k) && (p = k), u(d) && (n = d.match(e), o = n[1], p = p || n[3], d = a.hasOwnProperty(o) ? a[o] : hb(i.$scope, o, !0) || (b ? hb(g, o, !0) : c), fb(d, o, !0)), j) {
                    var q = (je(d) ? d[d.length - 1] : d).prototype;
                    return m = Object.create(q || null), p && h(i, p, m, o || d.name), l(function() {
                        return f.invoke(d, m, i, o), m
                    }, {
                        instance: m,
                        identifier: p
                    })
                }
                return m = f.instantiate(d, i, o), p && h(i, p, m, o || d.name), m
            }
        }]
    }

    function cc() {
        this.$get = ["$window", function(a) {
            return $d(a.document)
        }]
    }

    function dc() {
        this.$get = ["$log", function(a) {
            return function() {
                a.error.apply(a, arguments)
            }
        }]
    }

    function ec(a, b) {
        if (u(a)) {
            var c = a.replace($e, "").trim();
            if (c) {
                var d = b("Content-Type");
                (d && 0 === d.indexOf(We) || fc(c)) && (a = S(c))
            }
        }
        return a
    }

    function fc(a) {
        var b = a.match(Ye);
        return b && Ze[b[0]].test(a)
    }

    function gc(a) {
        var b, c, d, e = jb();
        return a ? (f(a.split("\n"), function(a) {
            d = a.indexOf(":"), b = Ud(ke(a.substr(0, d))), c = ke(a.substr(d + 1)), b && (e[b] = e[b] ? e[b] + ", " + c : c)
        }), e) : e
    }

    function hc(a) {
        var b = t(a) ? a : c;
        return function(c) {
            if (b || (b = gc(a)), c) {
                var d = b[Ud(c)];
                return void 0 === d && (d = null), d
            }
            return b
        }
    }

    function ic(a, b, c, d) {
        return x(d) ? d(a, b, c) : (f(d, function(d) {
            a = d(a, b, c)
        }), a)
    }

    function jc(a) {
        return a >= 200 && 300 > a
    }

    function kc() {
        var a = this.defaults = {
                transformResponse: [ec],
                transformRequest: [function(a) {
                    return !t(a) || B(a) || D(a) || C(a) ? a : R(a)
                }],
                headers: {
                    common: {
                        Accept: "application/json, text/plain, */*"
                    },
                    post: L(Xe),
                    put: L(Xe),
                    patch: L(Xe)
                },
                xsrfCookieName: "XSRF-TOKEN",
                xsrfHeaderName: "X-XSRF-TOKEN"
            },
            b = !1;
        this.useApplyAsync = function(a) {
            return s(a) ? (b = !!a, this) : b
        };
        var e = this.interceptors = [];
        this.$get = ["$httpBackend", "$browser", "$cacheFactory", "$rootScope", "$q", "$injector", function(g, i, j, k, m, n) {
            function o(b) {
                function e(a) {
                    var b = l({}, a);
                    return b.data = a.data ? ic(a.data, a.headers, a.status, i.transformResponse) : a.data, jc(a.status) ? b : m.reject(b)
                }

                function g(a) {
                    var b, c = {};
                    return f(a, function(a, d) {
                        x(a) ? (b = a(), null != b && (c[d] = b)) : c[d] = a
                    }), c
                }

                function h(b) {
                    var c, d, e, f = a.headers,
                        h = l({}, b.headers);
                    f = l({}, f.common, f[Ud(b.method)]);
                    a: for (c in f) {
                        d = Ud(c);
                        for (e in h)
                            if (Ud(e) === d) continue a;
                        h[c] = f[c]
                    }
                    return g(h)
                }
                if (!ge.isObject(b)) throw d("$http")("badreq", "Http request configuration must be an object.  Received: {0}", b);
                var i = l({
                    method: "get",
                    transformRequest: a.transformRequest,
                    transformResponse: a.transformResponse
                }, b);
                i.headers = h(b), i.method = Wd(i.method);
                var j = function(b) {
                        var d = b.headers,
                            g = ic(b.data, hc(d), c, b.transformRequest);
                        return r(g) && f(d, function(a, b) {
                            "content-type" === Ud(b) && delete d[b]
                        }), r(b.withCredentials) && !r(a.withCredentials) && (b.withCredentials = a.withCredentials), v(b, g).then(e, e)
                    },
                    k = [j, c],
                    n = m.when(i);
                for (f(A, function(a) {
                        (a.request || a.requestError) && k.unshift(a.request, a.requestError), (a.response || a.responseError) && k.push(a.response, a.responseError)
                    }); k.length;) {
                    var o = k.shift(),
                        p = k.shift();
                    n = n.then(o, p)
                }
                return n.success = function(a) {
                    return n.then(function(b) {
                        a(b.data, b.status, b.headers, i)
                    }), n
                }, n.error = function(a) {
                    return n.then(null, function(b) {
                        a(b.data, b.status, b.headers, i)
                    }), n
                }, n
            }

            function p() {
                f(arguments, function(a) {
                    o[a] = function(b, c) {
                        return o(l(c || {}, {
                            method: a,
                            url: b
                        }))
                    }
                })
            }

            function q() {
                f(arguments, function(a) {
                    o[a] = function(b, c, d) {
                        return o(l(d || {}, {
                            method: a,
                            url: b,
                            data: c
                        }))
                    }
                })
            }

            function v(d, e) {
                function f(a, c, d, e) {
                    function f() {
                        h(c, a, d, e)
                    }
                    n && (jc(a) ? n.put(w, [a, c, gc(d), e]) : n.remove(w)), b ? k.$applyAsync(f) : (f(), k.$$phase || k.$apply())
                }

                function h(a, b, c, e) {
                    b = Math.max(b, 0), (jc(b) ? q.resolve : q.reject)({
                        data: a,
                        status: b,
                        headers: hc(c),
                        config: d,
                        statusText: e
                    })
                }

                function j(a) {
                    h(a.data, a.status, L(a.headers()), a.statusText)
                }

                function l() {
                    var a = o.pendingRequests.indexOf(d); - 1 !== a && o.pendingRequests.splice(a, 1)
                }
                var n, p, q = m.defer(),
                    u = q.promise,
                    v = d.headers,
                    w = y(d.url, d.params);
                if (o.pendingRequests.push(d), u.then(l, l), !d.cache && !a.cache || d.cache === !1 || "GET" !== d.method && "JSONP" !== d.method || (n = t(d.cache) ? d.cache : t(a.cache) ? a.cache : z), n && (p = n.get(w), s(p) ? F(p) ? p.then(j, j) : je(p) ? h(p[1], p[0], L(p[2]), p[3]) : h(p, 200, {}, "OK") : n.put(w, u)), r(p)) {
                    var x = ed(d.url) ? i.cookies()[d.xsrfCookieName || a.xsrfCookieName] : c;
                    x && (v[d.xsrfHeaderName || a.xsrfHeaderName] = x), g(d.method, w, e, f, v, d.timeout, d.withCredentials, d.responseType)
                }
                return u
            }

            function y(a, b) {
                if (!b) return a;
                var c = [];
                return h(b, function(a, b) {
                    null === a || r(a) || (je(a) || (a = [a]), f(a, function(a) {
                        t(a) && (a = w(a) ? a.toISOString() : R(a)), c.push(Y(b) + "=" + Y(a))
                    }))
                }), c.length > 0 && (a += (-1 == a.indexOf("?") ? "?" : "&") + c.join("&")), a
            }
            var z = j("$http"),
                A = [];
            return f(e, function(a) {
                A.unshift(u(a) ? n.get(a) : n.invoke(a))
            }), o.pendingRequests = [], p("get", "delete", "head", "jsonp"), q("post", "put", "patch"), o.defaults = a, o
        }]
    }

    function lc() {
        return new a.XMLHttpRequest
    }

    function mc() {
        this.$get = ["$browser", "$window", "$document", function(a, b, c) {
            return nc(a, lc, a.defer, b.angular.callbacks, c[0])
        }]
    }

    function nc(a, b, d, e, g) {
        function h(a, b, c) {
            var d = g.createElement("script"),
                f = null;
            return d.type = "text/javascript", d.src = a, d.async = !0, f = function(a) {
                ze(d, "load", f), ze(d, "error", f), g.body.removeChild(d), d = null;
                var h = -1,
                    i = "unknown";
                a && ("load" !== a.type || e[b].called || (a = {
                    type: "error"
                }), i = a.type, h = "error" === a.type ? 404 : 200), c && c(h, i)
            }, ye(d, "load", f), ye(d, "error", f), g.body.appendChild(d), f
        }
        return function(g, i, j, k, l, m, n, p) {
            function q() {
                u && u(), v && v.abort()
            }

            function r(b, e, f, g, h) {
                y !== c && d.cancel(y), u = v = null, b(e, f, g, h), a.$$completeOutstandingRequest(o)
            }
            if (a.$$incOutstandingRequestCount(), i = i || a.url(), "jsonp" == Ud(g)) {
                var t = "_" + (e.counter++).toString(36);
                e[t] = function(a) {
                    e[t].data = a, e[t].called = !0
                };
                var u = h(i.replace("JSON_CALLBACK", "angular.callbacks." + t), t, function(a, b) {
                    r(k, a, e[t].data, "", b), e[t] = o
                })
            } else {
                var v = b();
                v.open(g, i, !0), f(l, function(a, b) {
                    s(a) && v.setRequestHeader(b, a)
                }), v.onload = function() {
                    var a = v.statusText || "",
                        b = "response" in v ? v.response : v.responseText,
                        c = 1223 === v.status ? 204 : v.status;
                    0 === c && (c = b ? 200 : "file" == dd(i).protocol ? 404 : 0), r(k, c, b, v.getAllResponseHeaders(), a)
                };
                var w = function() {
                    r(k, -1, null, null, "")
                };
                if (v.onerror = w, v.onabort = w, n && (v.withCredentials = !0), p) try {
                    v.responseType = p
                } catch (x) {
                    if ("json" !== p) throw x
                }
                v.send(j || null)
            }
            if (m > 0) var y = d(q, m);
            else F(m) && m.then(q)
        }
    }

    function oc() {
        var a = "{{",
            b = "}}";
        this.startSymbol = function(b) {
            return b ? (a = b, this) : a
        }, this.endSymbol = function(a) {
            return a ? (b = a, this) : b
        }, this.$get = ["$parse", "$exceptionHandler", "$sce", function(c, d, e) {
            function f(a) {
                return "\\\\\\" + a
            }

            function g(f, g, m, n) {
                function o(c) {
                    return c.replace(j, a).replace(k, b)
                }

                function p(a) {
                    try {
                        return a = D(a), n && !s(a) ? a : E(a)
                    } catch (b) {
                        var c = _e("interr", "Can't interpolate: {0}\n{1}", f, b.toString());
                        d(c)
                    }
                }
                n = !!n;
                for (var q, t, u, v = 0, w = [], y = [], z = f.length, A = [], B = []; z > v;) {
                    if (-1 == (q = f.indexOf(a, v)) || -1 == (t = f.indexOf(b, q + h))) {
                        v !== z && A.push(o(f.substring(v)));
                        break
                    }
                    v !== q && A.push(o(f.substring(v, q))), u = f.substring(q + h, t), w.push(u), y.push(c(u, p)), v = t + i, B.push(A.length), A.push("")
                }
                if (m && A.length > 1) throw _e("noconcat", "Error while interpolating: {0}\nStrict Contextual Escaping disallows interpolations that concatenate multiple expressions when a trusted value is required.  See http://docs.angularjs.org/api/ng.$sce", f);
                if (!g || w.length) {
                    var C = function(a) {
                            for (var b = 0, c = w.length; c > b; b++) {
                                if (n && r(a[b])) return;
                                A[B[b]] = a[b]
                            }
                            return A.join("")
                        },
                        D = function(a) {
                            return m ? e.getTrusted(m, a) : e.valueOf(a)
                        },
                        E = function(a) {
                            if (null == a) return "";
                            switch (typeof a) {
                                case "string":
                                    break;
                                case "number":
                                    a = "" + a;
                                    break;
                                default:
                                    a = R(a)
                            }
                            return a
                        };
                    return l(function(a) {
                        var b = 0,
                            c = w.length,
                            e = new Array(c);
                        try {
                            for (; c > b; b++) e[b] = y[b](a);
                            return C(e)
                        } catch (g) {
                            var h = _e("interr", "Can't interpolate: {0}\n{1}", f, g.toString());
                            d(h)
                        }
                    }, {
                        exp: f,
                        expressions: w,
                        $$watchDelegate: function(a, b, c) {
                            var d;
                            return a.$watchGroup(y, function(c, e) {
                                var f = C(c);
                                x(b) && b.call(this, f, c !== e ? d : f, a), d = f
                            }, c)
                        }
                    })
                }
            }
            var h = a.length,
                i = b.length,
                j = new RegExp(a.replace(/./g, f), "g"),
                k = new RegExp(b.replace(/./g, f), "g");
            return g.startSymbol = function() {
                return a
            }, g.endSymbol = function() {
                return b
            }, g
        }]
    }

    function pc() {
        this.$get = ["$rootScope", "$window", "$q", "$$q", function(a, b, c, d) {
            function e(e, g, h, i) {
                var j = b.setInterval,
                    k = b.clearInterval,
                    l = 0,
                    m = s(i) && !i,
                    n = (m ? d : c).defer(),
                    o = n.promise;
                return h = s(h) ? h : 0, o.then(null, null, e), o.$$intervalId = j(function() {
                    n.notify(l++), h > 0 && l >= h && (n.resolve(l), k(o.$$intervalId), delete f[o.$$intervalId]), m || a.$apply()
                }, g), f[o.$$intervalId] = n, o
            }
            var f = {};
            return e.cancel = function(a) {
                return a && a.$$intervalId in f ? (f[a.$$intervalId].reject("canceled"), b.clearInterval(a.$$intervalId), delete f[a.$$intervalId], !0) : !1
            }, e
        }]
    }

    function qc() {
        this.$get = function() {
            return {
                id: "en-us",
                NUMBER_FORMATS: {
                    DECIMAL_SEP: ".",
                    GROUP_SEP: ",",
                    PATTERNS: [{
                        minInt: 1,
                        minFrac: 0,
                        maxFrac: 3,
                        posPre: "",
                        posSuf: "",
                        negPre: "-",
                        negSuf: "",
                        gSize: 3,
                        lgSize: 3
                    }, {
                        minInt: 1,
                        minFrac: 2,
                        maxFrac: 2,
                        posPre: "¤",
                        posSuf: "",
                        negPre: "(¤",
                        negSuf: ")",
                        gSize: 3,
                        lgSize: 3
                    }],
                    CURRENCY_SYM: "$"
                },
                DATETIME_FORMATS: {
                    MONTH: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
                    SHORTMONTH: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
                    DAY: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
                    SHORTDAY: "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),
                    AMPMS: ["AM", "PM"],
                    medium: "MMM d, y h:mm:ss a",
                    "short": "M/d/yy h:mm a",
                    fullDate: "EEEE, MMMM d, y",
                    longDate: "MMMM d, y",
                    mediumDate: "MMM d, y",
                    shortDate: "M/d/yy",
                    mediumTime: "h:mm:ss a",
                    shortTime: "h:mm a"
                },
                pluralCat: function(a) {
                    return 1 === a ? "one" : "other"
                }
            }
        }
    }

    function rc(a) {
        for (var b = a.split("/"), c = b.length; c--;) b[c] = X(b[c]);
        return b.join("/")
    }

    function sc(a, b) {
        var c = dd(a);
        b.$$protocol = c.protocol, b.$$host = c.hostname, b.$$port = m(c.port) || bf[c.protocol] || null
    }

    function tc(a, b) {
        var c = "/" !== a.charAt(0);
        c && (a = "/" + a);
        var d = dd(a);
        b.$$path = decodeURIComponent(c && "/" === d.pathname.charAt(0) ? d.pathname.substring(1) : d.pathname), b.$$search = V(d.search), b.$$hash = decodeURIComponent(d.hash), b.$$path && "/" != b.$$path.charAt(0) && (b.$$path = "/" + b.$$path)
    }

    function uc(a, b) {
        return 0 === b.indexOf(a) ? b.substr(a.length) : void 0
    }

    function vc(a) {
        var b = a.indexOf("#");
        return -1 == b ? a : a.substr(0, b)
    }

    function wc(a) {
        return a.replace(/(#.+)|#$/, "$1")
    }

    function xc(a) {
        return a.substr(0, vc(a).lastIndexOf("/") + 1)
    }

    function yc(a) {
        return a.substring(0, a.indexOf("/", a.indexOf("//") + 2))
    }

    function zc(a, b) {
        this.$$html5 = !0, b = b || "";
        var d = xc(a);
        sc(a, this), this.$$parse = function(a) {
            var b = uc(d, a);
            if (!u(b)) throw cf("ipthprfx", 'Invalid url "{0}", missing path prefix "{1}".', a, d);
            tc(b, this), this.$$path || (this.$$path = "/"), this.$$compose()
        }, this.$$compose = function() {
            var a = W(this.$$search),
                b = this.$$hash ? "#" + X(this.$$hash) : "";
            this.$$url = rc(this.$$path) + (a ? "?" + a : "") + b, this.$$absUrl = d + this.$$url.substr(1)
        }, this.$$parseLinkUrl = function(e, f) {
            if (f && "#" === f[0]) return this.hash(f.slice(1)), !0;
            var g, h, i;
            return (g = uc(a, e)) !== c ? (h = g, i = (g = uc(b, g)) !== c ? d + (uc("/", g) || g) : a + h) : (g = uc(d, e)) !== c ? i = d + g : d == e + "/" && (i = d), i && this.$$parse(i), !!i
        }
    }

    function Ac(a, b) {
        var c = xc(a);
        sc(a, this), this.$$parse = function(d) {
            function e(a, b, c) {
                var d, e = /^\/[A-Z]:(\/.*)/;
                return 0 === b.indexOf(c) && (b = b.replace(c, "")), e.exec(b) ? a : (d = e.exec(a), d ? d[1] : a)
            }
            var f, g = uc(a, d) || uc(c, d);
            "#" === g.charAt(0) ? (f = uc(b, g), r(f) && (f = g)) : f = this.$$html5 ? g : "", tc(f, this), this.$$path = e(this.$$path, f, a), this.$$compose()
        }, this.$$compose = function() {
            var c = W(this.$$search),
                d = this.$$hash ? "#" + X(this.$$hash) : "";
            this.$$url = rc(this.$$path) + (c ? "?" + c : "") + d, this.$$absUrl = a + (this.$$url ? b + this.$$url : "")
        }, this.$$parseLinkUrl = function(b) {
            return vc(a) == vc(b) ? (this.$$parse(b), !0) : !1
        }
    }

    function Bc(a, b) {
        this.$$html5 = !0, Ac.apply(this, arguments);
        var c = xc(a);
        this.$$parseLinkUrl = function(d, e) {
            if (e && "#" === e[0]) return this.hash(e.slice(1)), !0;
            var f, g;
            return a == vc(d) ? f = d : (g = uc(c, d)) ? f = a + b + g : c === d + "/" && (f = c), f && this.$$parse(f), !!f
        }, this.$$compose = function() {
            var c = W(this.$$search),
                d = this.$$hash ? "#" + X(this.$$hash) : "";
            this.$$url = rc(this.$$path) + (c ? "?" + c : "") + d, this.$$absUrl = a + b + this.$$url
        }
    }

    function Cc(a) {
        return function() {
            return this[a]
        }
    }

    function Dc(a, b) {
        return function(c) {
            return r(c) ? this[a] : (this[a] = b(c), this.$$compose(), this)
        }
    }

    function Ec() {
        var a = "",
            b = {
                enabled: !1,
                requireBase: !0,
                rewriteLinks: !0
            };
        this.hashPrefix = function(b) {
            return s(b) ? (a = b, this) : a
        }, this.html5Mode = function(a) {
            return E(a) ? (b.enabled = a, this) : t(a) ? (E(a.enabled) && (b.enabled = a.enabled), E(a.requireBase) && (b.requireBase = a.requireBase), E(a.rewriteLinks) && (b.rewriteLinks = a.rewriteLinks), this) : b
        }, this.$get = ["$rootScope", "$browser", "$sniffer", "$rootElement", "$window", function(c, d, e, f, g) {
            function h(a, b, c) {
                var e = j.url(),
                    f = j.$$state;
                try {
                    d.url(a, b, c), j.$$state = d.state()
                } catch (g) {
                    throw j.url(e), j.$$state = f, g
                }
            }

            function i(a, b) {
                c.$broadcast("$locationChangeSuccess", j.absUrl(), a, j.$$state, b)
            }
            var j, k, l, m = d.baseHref(),
                n = d.url();
            if (b.enabled) {
                if (!m && b.requireBase) throw cf("nobase", "$location in HTML5 mode requires a <base> tag to be present!");
                l = yc(n) + (m || "/"), k = e.history ? zc : Bc
            } else l = vc(n), k = Ac;
            j = new k(l, "#" + a), j.$$parseLinkUrl(n, n), j.$$state = d.state();
            var o = /^\s*(javascript|mailto):/i;
            f.on("click", function(a) {
                if (b.rewriteLinks && !a.ctrlKey && !a.metaKey && !a.shiftKey && 2 != a.which && 2 != a.button) {
                    for (var e = $d(a.target);
                        "a" !== I(e[0]);)
                        if (e[0] === f[0] || !(e = e.parent())[0]) return;
                    var h = e.prop("href"),
                        i = e.attr("href") || e.attr("xlink:href");
                    t(h) && "[object SVGAnimatedString]" === h.toString() && (h = dd(h.animVal).href), o.test(h) || !h || e.attr("target") || a.isDefaultPrevented() || j.$$parseLinkUrl(h, i) && (a.preventDefault(), j.absUrl() != d.url() && (c.$apply(), g.angular["ff-684208-preventDefault"] = !0))
                }
            }), j.absUrl() != n && d.url(j.absUrl(), !0);
            var p = !0;
            return d.onUrlChange(function(a, b) {
                c.$evalAsync(function() {
                    var d, e = j.absUrl(),
                        f = j.$$state;
                    j.$$parse(a), j.$$state = b, d = c.$broadcast("$locationChangeStart", a, e, b, f).defaultPrevented, j.absUrl() === a && (d ? (j.$$parse(e), j.$$state = f, h(e, !1, f)) : (p = !1, i(e, f)))
                }), c.$$phase || c.$digest()
            }), c.$watch(function() {
                var a = wc(d.url()),
                    b = wc(j.absUrl()),
                    f = d.state(),
                    g = j.$$replace,
                    k = a !== b || j.$$html5 && e.history && f !== j.$$state;
                (p || k) && (p = !1, c.$evalAsync(function() {
                    var b = j.absUrl(),
                        d = c.$broadcast("$locationChangeStart", b, a, j.$$state, f).defaultPrevented;
                    j.absUrl() === b && (d ? (j.$$parse(a), j.$$state = f) : (k && h(b, g, f === j.$$state ? null : j.$$state), i(a, f)))
                })), j.$$replace = !1
            }), j
        }]
    }

    function Fc() {
        var a = !0,
            b = this;
        this.debugEnabled = function(b) {
            return s(b) ? (a = b, this) : a
        }, this.$get = ["$window", function(c) {
            function d(a) {
                return a instanceof Error && (a.stack ? a = a.message && -1 === a.stack.indexOf(a.message) ? "Error: " + a.message + "\n" + a.stack : a.stack : a.sourceURL && (a = a.message + "\n" + a.sourceURL + ":" + a.line)), a
            }

            function e(a) {
                var b = c.console || {},
                    e = b[a] || b.log || o,
                    g = !1;
                try {
                    g = !!e.apply
                } catch (h) {}
                return g ? function() {
                    var a = [];
                    return f(arguments, function(b) {
                        a.push(d(b))
                    }), e.apply(b, a)
                } : function(a, b) {
                    e(a, null == b ? "" : b)
                }
            }
            return {
                log: e("log"),
                info: e("info"),
                warn: e("warn"),
                error: e("error"),
                debug: function() {
                    var c = e("debug");
                    return function() {
                        a && c.apply(b, arguments)
                    }
                }()
            }
        }]
    }

    function Gc(a, b) {
        if ("__defineGetter__" === a || "__defineSetter__" === a || "__lookupGetter__" === a || "__lookupSetter__" === a || "__proto__" === a) throw ef("isecfld", "Attempting to access a disallowed field in Angular expressions! Expression: {0}", b);
        return a
    }

    function Hc(a, b) {
        if (a) {
            if (a.constructor === a) throw ef("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", b);
            if (a.window === a) throw ef("isecwindow", "Referencing the Window in Angular expressions is disallowed! Expression: {0}", b);
            if (a.children && (a.nodeName || a.prop && a.attr && a.find)) throw ef("isecdom", "Referencing DOM nodes in Angular expressions is disallowed! Expression: {0}", b);
            if (a === Object) throw ef("isecobj", "Referencing Object in Angular expressions is disallowed! Expression: {0}", b)
        }
        return a
    }

    function Ic(a, b) {
        if (a) {
            if (a.constructor === a) throw ef("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", b);
            if (a === ff || a === gf || a === hf) throw ef("isecff", "Referencing call, apply or bind in Angular expressions is disallowed! Expression: {0}", b)
        }
    }

    function Jc(a) {
        return a.constant
    }

    function Kc(a, b, c, d, e) {
        Hc(a, e), Hc(b, e);
        for (var f, g = c.split("."), h = 0; g.length > 1; h++) {
            f = Gc(g.shift(), e);
            var i = 0 === h && b && b[f] || a[f];
            i || (i = {}, a[f] = i), a = Hc(i, e)
        }
        return f = Gc(g.shift(), e), Hc(a[f], e), a[f] = d, d
    }

    function Lc(a) {
        return "constructor" == a
    }

    function Mc(a, b, d, e, f, g, h) {
        Gc(a, g), Gc(b, g), Gc(d, g), Gc(e, g), Gc(f, g);
        var i = function(a) {
                return Hc(a, g)
            },
            j = h || Lc(a) ? i : p,
            k = h || Lc(b) ? i : p,
            l = h || Lc(d) ? i : p,
            m = h || Lc(e) ? i : p,
            n = h || Lc(f) ? i : p;
        return function(g, h) {
            var i = h && h.hasOwnProperty(a) ? h : g;
            return null == i ? i : (i = j(i[a]), b ? null == i ? c : (i = k(i[b]), d ? null == i ? c : (i = l(i[d]), e ? null == i ? c : (i = m(i[e]), f ? null == i ? c : i = n(i[f]) : i) : i) : i) : i)
        }
    }

    function Nc(a, b) {
        return function(c, d) {
            return a(c, d, Hc, b)
        }
    }

    function Oc(a, b, d) {
        var e = b.expensiveChecks,
            g = e ? pf : of,
            h = g[a];
        if (h) return h;
        var i = a.split("."),
            j = i.length;
        if (b.csp) h = 6 > j ? Mc(i[0], i[1], i[2], i[3], i[4], d, e) : function(a, b) {
            var f, g = 0;
            do f = Mc(i[g++], i[g++], i[g++], i[g++], i[g++], d, e)(a, b), b = c, a = f; while (j > g);
            return f
        };
        else {
            var k = "";
            e && (k += "s = eso(s, fe);\nl = eso(l, fe);\n");
            var l = e;
            f(i, function(a, b) {
                Gc(a, d);
                var c = (b ? "s" : '((l&&l.hasOwnProperty("' + a + '"))?l:s)') + "." + a;
                (e || Lc(a)) && (c = "eso(" + c + ", fe)", l = !0), k += "if(s == null) return undefined;\ns=" + c + ";\n"
            }), k += "return s;";
            var m = new Function("s", "l", "eso", "fe", k);
            m.toString = q(k), l && (m = Nc(m, d)), h = m
        }
        return h.sharedGetter = !0, h.assign = function(b, c, d) {
            return Kc(b, d, a, c, a)
        }, g[a] = h, h
    }

    function Pc(a) {
        return x(a.valueOf) ? a.valueOf() : qf.call(a)
    }

    function Qc() {
        var a = jb(),
            b = jb();
        this.$get = ["$filter", "$sniffer", function(c, d) {
            function e(a) {
                var b = a;
                return a.sharedGetter && (b = function(b, c) {
                    return a(b, c)
                }, b.literal = a.literal, b.constant = a.constant, b.assign = a.assign), b
            }

            function g(a, b) {
                for (var c = 0, d = a.length; d > c; c++) {
                    var e = a[c];
                    e.constant || (e.inputs ? g(e.inputs, b) : -1 === b.indexOf(e) && b.push(e))
                }
                return b
            }

            function h(a, b) {
                return null == a || null == b ? a === b : "object" == typeof a && (a = Pc(a), "object" == typeof a) ? !1 : a === b || a !== a && b !== b
            }

            function i(a, b, c, d) {
                var e, f = d.$$inputs || (d.$$inputs = g(d.inputs, []));
                if (1 === f.length) {
                    var i = h;
                    return f = f[0], a.$watch(function(a) {
                        var b = f(a);
                        return h(b, i) || (e = d(a), i = b && Pc(b)), e
                    }, b, c)
                }
                for (var j = [], k = 0, l = f.length; l > k; k++) j[k] = h;
                return a.$watch(function(a) {
                    for (var b = !1, c = 0, g = f.length; g > c; c++) {
                        var i = f[c](a);
                        (b || (b = !h(i, j[c]))) && (j[c] = i && Pc(i))
                    }
                    return b && (e = d(a)), e
                }, b, c)
            }

            function j(a, b, c, d) {
                var e, f;
                return e = a.$watch(function(a) {
                    return d(a)
                }, function(a, c, d) {
                    f = a, x(b) && b.apply(this, arguments), s(a) && d.$$postDigest(function() {
                        s(f) && e()
                    })
                }, c)
            }

            function k(a, b, c, d) {
                function e(a) {
                    var b = !0;
                    return f(a, function(a) {
                        s(a) || (b = !1)
                    }), b
                }
                var g, h;
                return g = a.$watch(function(a) {
                    return d(a)
                }, function(a, c, d) {
                    h = a, x(b) && b.call(this, a, c, d), e(a) && d.$$postDigest(function() {
                        e(h) && g()
                    })
                }, c)
            }

            function l(a, b, c, d) {
                var e;
                return e = a.$watch(function(a) {
                    return d(a)
                }, function() {
                    x(b) && b.apply(this, arguments), e()
                }, c)
            }

            function m(a, b) {
                if (!b) return a;
                var c = a.$$watchDelegate,
                    d = c !== k && c !== j,
                    e = d ? function(c, d) {
                        var e = a(c, d);
                        return b(e, c, d)
                    } : function(c, d) {
                        var e = a(c, d),
                            f = b(e, c, d);
                        return s(e) ? f : e
                    };
                return a.$$watchDelegate && a.$$watchDelegate !== i ? e.$$watchDelegate = a.$$watchDelegate : b.$stateful || (e.$$watchDelegate = i, e.inputs = [a]), e
            }
            var n = {
                    csp: d.csp,
                    expensiveChecks: !1
                },
                p = {
                    csp: d.csp,
                    expensiveChecks: !0
                };
            return function(d, f, g) {
                var h, q, r;
                switch (typeof d) {
                    case "string":
                        r = d = d.trim();
                        var s = g ? b : a;
                        if (h = s[r], !h) {
                            ":" === d.charAt(0) && ":" === d.charAt(1) && (q = !0, d = d.substring(2));
                            var t = g ? p : n,
                                u = new mf(t),
                                v = new nf(u, c, t);
                            h = v.parse(d), h.constant ? h.$$watchDelegate = l : q ? (h = e(h), h.$$watchDelegate = h.literal ? k : j) : h.inputs && (h.$$watchDelegate = i), s[r] = h
                        }
                        return m(h, f);
                    case "function":
                        return m(d, f);
                    default:
                        return m(o, f)
                }
            }
        }]
    }

    function Rc() {
        this.$get = ["$rootScope", "$exceptionHandler", function(a, b) {
            return Tc(function(b) {
                a.$evalAsync(b)
            }, b)
        }]
    }

    function Sc() {
        this.$get = ["$browser", "$exceptionHandler", function(a, b) {
            return Tc(function(b) {
                a.defer(b)
            }, b)
        }]
    }

    function Tc(a, b) {
        function e(a, b, c) {
            function d(b) {
                return function(c) {
                    e || (e = !0, b.call(a, c))
                }
            }
            var e = !1;
            return [d(b), d(c)]
        }

        function g() {
            this.$$state = {
                status: 0
            }
        }

        function h(a, b) {
            return function(c) {
                b.call(a, c)
            }
        }

        function i(a) {
            var d, e, f;
            f = a.pending, a.processScheduled = !1, a.pending = c;
            for (var g = 0, h = f.length; h > g; ++g) {
                e = f[g][0], d = f[g][a.status];
                try {
                    x(d) ? e.resolve(d(a.value)) : 1 === a.status ? e.resolve(a.value) : e.reject(a.value)
                } catch (i) {
                    e.reject(i), b(i)
                }
            }
        }

        function j(b) {
            !b.processScheduled && b.pending && (b.processScheduled = !0, a(function() {
                i(b)
            }))
        }

        function k() {
            this.promise = new g, this.resolve = h(this, this.resolve), this.reject = h(this, this.reject), this.notify = h(this, this.notify)
        }

        function l(a) {
            var b = new k,
                c = 0,
                d = je(a) ? [] : {};
            return f(a, function(a, e) {
                c++, r(a).then(function(a) {
                    d.hasOwnProperty(e) || (d[e] = a, --c || b.resolve(d))
                }, function(a) {
                    d.hasOwnProperty(e) || b.reject(a)
                })
            }), 0 === c && b.resolve(d), b.promise
        }
        var m = d("$q", TypeError),
            n = function() {
                return new k
            };
        g.prototype = {
            then: function(a, b, c) {
                var d = new k;
                return this.$$state.pending = this.$$state.pending || [], this.$$state.pending.push([d, a, b, c]), this.$$state.status > 0 && j(this.$$state), d.promise
            },
            "catch": function(a) {
                return this.then(null, a)
            },
            "finally": function(a, b) {
                return this.then(function(b) {
                    return q(b, !0, a)
                }, function(b) {
                    return q(b, !1, a)
                }, b)
            }
        }, k.prototype = {
            resolve: function(a) {
                this.promise.$$state.status || (a === this.promise ? this.$$reject(m("qcycle", "Expected promise to be resolved with value other than itself '{0}'", a)) : this.$$resolve(a))
            },
            $$resolve: function(a) {
                var c, d;
                d = e(this, this.$$resolve, this.$$reject);
                try {
                    (t(a) || x(a)) && (c = a && a.then), x(c) ? (this.promise.$$state.status = -1, c.call(a, d[0], d[1], this.notify)) : (this.promise.$$state.value = a, this.promise.$$state.status = 1, j(this.promise.$$state))
                } catch (f) {
                    d[1](f), b(f)
                }
            },
            reject: function(a) {
                this.promise.$$state.status || this.$$reject(a)
            },
            $$reject: function(a) {
                this.promise.$$state.value = a, this.promise.$$state.status = 2, j(this.promise.$$state)
            },
            notify: function(c) {
                var d = this.promise.$$state.pending;
                this.promise.$$state.status <= 0 && d && d.length && a(function() {
                    for (var a, e, f = 0, g = d.length; g > f; f++) {
                        e = d[f][0], a = d[f][3];
                        try {
                            e.notify(x(a) ? a(c) : c)
                        } catch (h) {
                            b(h)
                        }
                    }
                })
            }
        };
        var o = function(a) {
                var b = new k;
                return b.reject(a), b.promise
            },
            p = function(a, b) {
                var c = new k;
                return b ? c.resolve(a) : c.reject(a), c.promise
            },
            q = function(a, b, c) {
                var d = null;
                try {
                    x(c) && (d = c())
                } catch (e) {
                    return p(e, !1)
                }
                return F(d) ? d.then(function() {
                    return p(a, b)
                }, function(a) {
                    return p(a, !1)
                }) : p(a, b)
            },
            r = function(a, b, c, d) {
                var e = new k;
                return e.resolve(a), e.promise.then(b, c, d)
            },
            s = function u(a) {
                function b(a) {
                    d.resolve(a)
                }

                function c(a) {
                    d.reject(a)
                }
                if (!x(a)) throw m("norslvr", "Expected resolverFn, got '{0}'", a);
                if (!(this instanceof u)) return new u(a);
                var d = new k;
                return a(b, c), d.promise
            };
        return s.defer = n, s.reject = o, s.when = r, s.all = l, s
    }

    function Uc() {
        this.$get = ["$window", "$timeout", function(a, b) {
            var c = a.requestAnimationFrame || a.webkitRequestAnimationFrame,
                d = a.cancelAnimationFrame || a.webkitCancelAnimationFrame || a.webkitCancelRequestAnimationFrame,
                e = !!c,
                f = e ? function(a) {
                    var b = c(a);
                    return function() {
                        d(b)
                    }
                } : function(a) {
                    var c = b(a, 16.66, !1);
                    return function() {
                        b.cancel(c)
                    }
                };
            return f.supported = e, f
        }]
    }

    function Vc() {
        var a = 10,
            b = d("$rootScope"),
            c = null,
            g = null;
        this.digestTtl = function(b) {
            return arguments.length && (a = b), a
        }, this.$get = ["$injector", "$exceptionHandler", "$parse", "$browser", function(d, h, i, k) {
            function l() {
                this.$id = j(), this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null, this.$root = this, this.$$destroyed = !1, this.$$listeners = {}, this.$$listenerCount = {}, this.$$isolateBindings = null
            }

            function m(a) {
                if (v.$$phase) throw b("inprog", "{0} already in progress", v.$$phase);
                v.$$phase = a
            }

            function n() {
                v.$$phase = null
            }

            function p(a, b, c) {
                do a.$$listenerCount[c] -= b, 0 === a.$$listenerCount[c] && delete a.$$listenerCount[c]; while (a = a.$parent)
            }

            function q() {}

            function s() {
                for (; z.length;) try {
                    z.shift()()
                } catch (a) {
                    h(a)
                }
                g = null
            }

            function u() {
                null === g && (g = k.defer(function() {
                    v.$apply(s)
                }))
            }
            l.prototype = {
                constructor: l,
                $new: function(a, b) {
                    function c() {
                        d.$$destroyed = !0
                    }
                    var d;
                    return b = b || this, a ? (d = new l, d.$root = this.$root) : (this.$$ChildScope || (this.$$ChildScope = function() {
                        this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null, this.$$listeners = {}, this.$$listenerCount = {}, this.$id = j(), this.$$ChildScope = null
                    }, this.$$ChildScope.prototype = this), d = new this.$$ChildScope), d.$parent = b, d.$$prevSibling = b.$$childTail, b.$$childHead ? (b.$$childTail.$$nextSibling = d, b.$$childTail = d) : b.$$childHead = b.$$childTail = d, (a || b != this) && d.$on("$destroy", c), d
                },
                $watch: function(a, b, d) {
                    var e = i(a);
                    if (e.$$watchDelegate) return e.$$watchDelegate(this, b, d, e);
                    var f = this,
                        g = f.$$watchers,
                        h = {
                            fn: b,
                            last: q,
                            get: e,
                            exp: a,
                            eq: !!d
                        };
                    return c = null, x(b) || (h.fn = o), g || (g = f.$$watchers = []), g.unshift(h),
                        function() {
                            J(g, h), c = null
                        }
                },
                $watchGroup: function(a, b) {
                    function c() {
                        i = !1, j ? (j = !1, b(e, e, h)) : b(e, d, h)
                    }
                    var d = new Array(a.length),
                        e = new Array(a.length),
                        g = [],
                        h = this,
                        i = !1,
                        j = !0;
                    if (!a.length) {
                        var k = !0;
                        return h.$evalAsync(function() {
                                k && b(e, e, h)
                            }),
                            function() {
                                k = !1
                            }
                    }
                    return 1 === a.length ? this.$watch(a[0], function(a, c, f) {
                        e[0] = a, d[0] = c, b(e, a === c ? e : d, f)
                    }) : (f(a, function(a, b) {
                        var f = h.$watch(a, function(a, f) {
                            e[b] = a, d[b] = f, i || (i = !0, h.$evalAsync(c))
                        });
                        g.push(f)
                    }), function() {
                        for (; g.length;) g.shift()()
                    })
                },
                $watchCollection: function(a, b) {
                    function c(a) {
                        f = a;
                        var b, c, d, h, i;
                        if (!r(f)) {
                            if (t(f))
                                if (e(f)) {
                                    g !== n && (g = n, q = g.length = 0, l++), b = f.length, q !== b && (l++, g.length = q = b);
                                    for (var j = 0; b > j; j++) i = g[j], h = f[j], d = i !== i && h !== h, d || i === h || (l++, g[j] = h)
                                } else {
                                    g !== o && (g = o = {}, q = 0, l++), b = 0;
                                    for (c in f) f.hasOwnProperty(c) && (b++, h = f[c], i = g[c], c in g ? (d = i !== i && h !== h, d || i === h || (l++, g[c] = h)) : (q++, g[c] = h, l++));
                                    if (q > b) {
                                        l++;
                                        for (c in g) f.hasOwnProperty(c) || (q--, delete g[c])
                                    }
                                } else g !== f && (g = f, l++);
                            return l
                        }
                    }

                    function d() {
                        if (p ? (p = !1, b(f, f, j)) : b(f, h, j), k)
                            if (t(f))
                                if (e(f)) {
                                    h = new Array(f.length);
                                    for (var a = 0; a < f.length; a++) h[a] = f[a]
                                } else {
                                    h = {};
                                    for (var c in f) Vd.call(f, c) && (h[c] = f[c])
                                } else h = f
                    }
                    c.$stateful = !0;
                    var f, g, h, j = this,
                        k = b.length > 1,
                        l = 0,
                        m = i(a, c),
                        n = [],
                        o = {},
                        p = !0,
                        q = 0;
                    return this.$watch(m, d)
                },
                $digest: function() {
                    var d, e, f, i, j, l, o, p, r, t, u = a,
                        z = this,
                        A = [];
                    m("$digest"), k.$$checkUrlChange(), this === v && null !== g && (k.defer.cancel(g), s()), c = null;
                    do {
                        for (l = !1, p = z; w.length;) {
                            try {
                                t = w.shift(), t.scope.$eval(t.expression, t.locals)
                            } catch (B) {
                                h(B)
                            }
                            c = null
                        }
                        a: do {
                            if (i = p.$$watchers)
                                for (j = i.length; j--;) try {
                                    if (d = i[j])
                                        if ((e = d.get(p)) === (f = d.last) || (d.eq ? M(e, f) : "number" == typeof e && "number" == typeof f && isNaN(e) && isNaN(f))) {
                                            if (d === c) {
                                                l = !1;
                                                break a
                                            }
                                        } else l = !0, c = d, d.last = d.eq ? K(e, null) : e, d.fn(e, f === q ? e : f, p), 5 > u && (r = 4 - u, A[r] || (A[r] = []), A[r].push({
                                            msg: x(d.exp) ? "fn: " + (d.exp.name || d.exp.toString()) : d.exp,
                                            newVal: e,
                                            oldVal: f
                                        }))
                                } catch (B) {
                                    h(B)
                                }
                            if (!(o = p.$$childHead || p !== z && p.$$nextSibling))
                                for (; p !== z && !(o = p.$$nextSibling);) p = p.$parent
                        } while (p = o);
                        if ((l || w.length) && !u--) throw n(), b("infdig", "{0} $digest() iterations reached. Aborting!\nWatchers fired in the last 5 iterations: {1}", a, A)
                    } while (l || w.length);
                    for (n(); y.length;) try {
                        y.shift()()
                    } catch (B) {
                        h(B)
                    }
                },
                $destroy: function() {
                    if (!this.$$destroyed) {
                        var a = this.$parent;
                        if (this.$broadcast("$destroy"), this.$$destroyed = !0, this !== v) {
                            for (var b in this.$$listenerCount) p(this, this.$$listenerCount[b], b);
                            a.$$childHead == this && (a.$$childHead = this.$$nextSibling), a.$$childTail == this && (a.$$childTail = this.$$prevSibling), this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), this.$destroy = this.$digest = this.$apply = this.$evalAsync = this.$applyAsync = o, this.$on = this.$watch = this.$watchGroup = function() {
                                return o
                            }, this.$$listeners = {}, this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = this.$root = this.$$watchers = null
                        }
                    }
                },
                $eval: function(a, b) {
                    return i(a)(this, b)
                },
                $evalAsync: function(a, b) {
                    v.$$phase || w.length || k.defer(function() {
                        w.length && v.$digest()
                    }), w.push({
                        scope: this,
                        expression: a,
                        locals: b
                    })
                },
                $$postDigest: function(a) {
                    y.push(a)
                },
                $apply: function(a) {
                    try {
                        return m("$apply"), this.$eval(a)
                    } catch (b) {
                        h(b)
                    } finally {
                        n();
                        try {
                            v.$digest()
                        } catch (b) {
                            throw h(b), b
                        }
                    }
                },
                $applyAsync: function(a) {
                    function b() {
                        c.$eval(a)
                    }
                    var c = this;
                    a && z.push(b), u()
                },
                $on: function(a, b) {
                    var c = this.$$listeners[a];
                    c || (this.$$listeners[a] = c = []), c.push(b);
                    var d = this;
                    do d.$$listenerCount[a] || (d.$$listenerCount[a] = 0), d.$$listenerCount[a] ++; while (d = d.$parent);
                    var e = this;
                    return function() {
                        var d = c.indexOf(b); - 1 !== d && (c[d] = null, p(e, 1, a))
                    }
                },
                $emit: function(a) {
                    var b, c, d, e = [],
                        f = this,
                        g = !1,
                        i = {
                            name: a,
                            targetScope: f,
                            stopPropagation: function() {
                                g = !0
                            },
                            preventDefault: function() {
                                i.defaultPrevented = !0
                            },
                            defaultPrevented: !1
                        },
                        j = N([i], arguments, 1);
                    do {
                        for (b = f.$$listeners[a] || e, i.currentScope = f, c = 0, d = b.length; d > c; c++)
                            if (b[c]) try {
                                b[c].apply(null, j)
                            } catch (k) {
                                h(k)
                            } else b.splice(c, 1), c--, d--;
                        if (g) return i.currentScope = null, i;
                        f = f.$parent
                    } while (f);
                    return i.currentScope = null, i
                },
                $broadcast: function(a) {
                    var b = this,
                        c = b,
                        d = b,
                        e = {
                            name: a,
                            targetScope: b,
                            preventDefault: function() {
                                e.defaultPrevented = !0
                            },
                            defaultPrevented: !1
                        };
                    if (!b.$$listenerCount[a]) return e;
                    for (var f, g, i, j = N([e], arguments, 1); c = d;) {
                        for (e.currentScope = c, f = c.$$listeners[a] || [], g = 0, i = f.length; i > g; g++)
                            if (f[g]) try {
                                f[g].apply(null, j)
                            } catch (k) {
                                h(k)
                            } else f.splice(g, 1), g--, i--;
                        if (!(d = c.$$listenerCount[a] && c.$$childHead || c !== b && c.$$nextSibling))
                            for (; c !== b && !(d = c.$$nextSibling);) c = c.$parent
                    }
                    return e.currentScope = null, e
                }
            };
            var v = new l,
                w = v.$$asyncQueue = [],
                y = v.$$postDigestQueue = [],
                z = v.$$applyAsyncQueue = [];
            return v
        }]
    }

    function Wc() {
        var a = /^\s*(https?|ftp|mailto|tel|file):/,
            b = /^\s*((https?|ftp|file|blob):|data:image\/)/;
        this.aHrefSanitizationWhitelist = function(b) {
            return s(b) ? (a = b, this) : a
        }, this.imgSrcSanitizationWhitelist = function(a) {
            return s(a) ? (b = a, this) : b
        }, this.$get = function() {
            return function(c, d) {
                var e, f = d ? b : a;
                return e = dd(c).href, "" === e || e.match(f) ? c : "unsafe:" + e
            }
        }
    }

    function Xc(a) {
        if ("self" === a) return a;
        if (u(a)) {
            if (a.indexOf("***") > -1) throw rf("iwcard", "Illegal sequence *** in string matcher.  String: {0}", a);
            return a = le(a).replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*"), new RegExp("^" + a + "$")
        }
        if (y(a)) return new RegExp("^" + a.source + "$");
        throw rf("imatcher", 'Matchers may only be "self", string patterns or RegExp objects')
    }

    function Yc(a) {
        var b = [];
        return s(a) && f(a, function(a) {
            b.push(Xc(a))
        }), b
    }

    function Zc() {
        this.SCE_CONTEXTS = sf;
        var a = ["self"],
            b = [];
        this.resourceUrlWhitelist = function(b) {
            return arguments.length && (a = Yc(b)), a
        }, this.resourceUrlBlacklist = function(a) {
            return arguments.length && (b = Yc(a)), b
        }, this.$get = ["$injector", function(d) {
            function e(a, b) {
                return "self" === a ? ed(b) : !!a.exec(b.href)
            }

            function f(c) {
                var d, f, g = dd(c.toString()),
                    h = !1;
                for (d = 0, f = a.length; f > d; d++)
                    if (e(a[d], g)) {
                        h = !0;
                        break
                    }
                if (h)
                    for (d = 0, f = b.length; f > d; d++)
                        if (e(b[d], g)) {
                            h = !1;
                            break
                        }
                return h
            }

            function g(a) {
                var b = function(a) {
                    this.$$unwrapTrustedValue = function() {
                        return a
                    }
                };
                return a && (b.prototype = new a), b.prototype.valueOf = function() {
                    return this.$$unwrapTrustedValue()
                }, b.prototype.toString = function() {
                    return this.$$unwrapTrustedValue().toString()
                }, b
            }

            function h(a, b) {
                var d = m.hasOwnProperty(a) ? m[a] : null;
                if (!d) throw rf("icontext", "Attempted to trust a value in invalid context. Context: {0}; Value: {1}", a, b);
                if (null === b || b === c || "" === b) return b;
                if ("string" != typeof b) throw rf("itype", "Attempted to trust a non-string value in a content requiring a string: Context: {0}", a);
                return new d(b)
            }

            function i(a) {
                return a instanceof l ? a.$$unwrapTrustedValue() : a
            }

            function j(a, b) {
                if (null === b || b === c || "" === b) return b;
                var d = m.hasOwnProperty(a) ? m[a] : null;
                if (d && b instanceof d) return b.$$unwrapTrustedValue();
                if (a === sf.RESOURCE_URL) {
                    if (f(b)) return b;
                    throw rf("insecurl", "Blocked loading resource from url not allowed by $sceDelegate policy.  URL: {0}", b.toString())
                }
                if (a === sf.HTML) return k(b);
                throw rf("unsafe", "Attempting to use an unsafe value in a safe context.")
            }
            var k = function() {
                throw rf("unsafe", "Attempting to use an unsafe value in a safe context.")
            };
            d.has("$sanitize") && (k = d.get("$sanitize"));
            var l = g(),
                m = {};
            return m[sf.HTML] = g(l), m[sf.CSS] = g(l), m[sf.URL] = g(l), m[sf.JS] = g(l), m[sf.RESOURCE_URL] = g(m[sf.URL]), {
                trustAs: h,
                getTrusted: j,
                valueOf: i
            }
        }]
    }

    function $c() {
        var a = !0;
        this.enabled = function(b) {
            return arguments.length && (a = !!b), a
        }, this.$get = ["$parse", "$sceDelegate", function(b, c) {
            if (a && 8 > Zd) throw rf("iequirks", "Strict Contextual Escaping does not support Internet Explorer version < 11 in quirks mode.  You can fix this by adding the text <!doctype html> to the top of your HTML document.  See http://docs.angularjs.org/api/ng.$sce for more information.");
            var d = L(sf);
            d.isEnabled = function() {
                return a
            }, d.trustAs = c.trustAs, d.getTrusted = c.getTrusted, d.valueOf = c.valueOf, a || (d.trustAs = d.getTrusted = function(a, b) {
                return b
            }, d.valueOf = p), d.parseAs = function(a, c) {
                var e = b(c);
                return e.literal && e.constant ? e : b(c, function(b) {
                    return d.getTrusted(a, b)
                })
            };
            var e = d.parseAs,
                g = d.getTrusted,
                h = d.trustAs;
            return f(sf, function(a, b) {
                var c = Ud(b);
                d[pb("parse_as_" + c)] = function(b) {
                    return e(a, b)
                }, d[pb("get_trusted_" + c)] = function(b) {
                    return g(a, b)
                }, d[pb("trust_as_" + c)] = function(b) {
                    return h(a, b)
                }
            }), d
        }]
    }

    function _c() {
        this.$get = ["$window", "$document", function(a, b) {
            var c, d, e = {},
                f = m((/android (\d+)/.exec(Ud((a.navigator || {}).userAgent)) || [])[1]),
                g = /Boxee/i.test((a.navigator || {}).userAgent),
                h = b[0] || {},
                i = /^(Moz|webkit|ms)(?=[A-Z])/,
                j = h.body && h.body.style,
                k = !1,
                l = !1;
            if (j) {
                for (var n in j)
                    if (d = i.exec(n)) {
                        c = d[0], c = c.substr(0, 1).toUpperCase() + c.substr(1);
                        break
                    }
                c || (c = "WebkitOpacity" in j && "webkit"), k = !!("transition" in j || c + "Transition" in j), l = !!("animation" in j || c + "Animation" in j), !f || k && l || (k = u(h.body.style.webkitTransition), l = u(h.body.style.webkitAnimation))
            }
            return {
                history: !(!a.history || !a.history.pushState || 4 > f || g),
                hasEvent: function(a) {
                    if ("input" === a && 11 >= Zd) return !1;
                    if (r(e[a])) {
                        var b = h.createElement("div");
                        e[a] = "on" + a in b
                    }
                    return e[a]
                },
                csp: me(),
                vendorPrefix: c,
                transitions: k,
                animations: l,
                android: f
            }
        }]
    }

    function ad() {
        this.$get = ["$templateCache", "$http", "$q", function(a, b, c) {
            function d(e, f) {
                function g(a) {
                    if (!f) throw Ue("tpload", "Failed to load template: {0}", e);
                    return c.reject(a)
                }
                d.totalPendingRequests++;
                var h = b.defaults && b.defaults.transformResponse;
                je(h) ? h = h.filter(function(a) {
                    return a !== ec
                }) : h === ec && (h = null);
                var i = {
                    cache: a,
                    transformResponse: h
                };
                return b.get(e, i)["finally"](function() {
                    d.totalPendingRequests--
                }).then(function(a) {
                    return a.data
                }, g)
            }
            return d.totalPendingRequests = 0, d
        }]
    }

    function bd() {
        this.$get = ["$rootScope", "$browser", "$location", function(a, b, c) {
            var d = {};
            return d.findBindings = function(a, b, c) {
                var d = a.getElementsByClassName("ng-binding"),
                    e = [];
                return f(d, function(a) {
                    var d = ge.element(a).data("$binding");
                    d && f(d, function(d) {
                        if (c) {
                            var f = new RegExp("(^|\\s)" + le(b) + "(\\s|\\||$)");
                            f.test(d) && e.push(a)
                        } else -1 != d.indexOf(b) && e.push(a)
                    })
                }), e
            }, d.findModels = function(a, b, c) {
                for (var d = ["ng-", "data-ng-", "ng\\:"], e = 0; e < d.length; ++e) {
                    var f = c ? "=" : "*=",
                        g = "[" + d[e] + "model" + f + '"' + b + '"]',
                        h = a.querySelectorAll(g);
                    if (h.length) return h
                }
            }, d.getLocation = function() {
                return c.url()
            }, d.setLocation = function(b) {
                b !== c.url() && (c.url(b), a.$digest())
            }, d.whenStable = function(a) {
                b.notifyWhenNoOutstandingRequests(a)
            }, d
        }]
    }

    function cd() {
        this.$get = ["$rootScope", "$browser", "$q", "$$q", "$exceptionHandler", function(a, b, c, d, e) {
            function f(f, h, i) {
                var j, k = s(i) && !i,
                    l = (k ? d : c).defer(),
                    m = l.promise;
                return j = b.defer(function() {
                    try {
                        l.resolve(f())
                    } catch (b) {
                        l.reject(b), e(b)
                    } finally {
                        delete g[m.$$timeoutId]
                    }
                    k || a.$apply()
                }, h), m.$$timeoutId = j, g[j] = l, m
            }
            var g = {};
            return f.cancel = function(a) {
                return a && a.$$timeoutId in g ? (g[a.$$timeoutId].reject("canceled"), delete g[a.$$timeoutId], b.defer.cancel(a.$$timeoutId)) : !1
            }, f
        }]
    }

    function dd(a) {
        var b = a;
        return Zd && (tf.setAttribute("href", b), b = tf.href), tf.setAttribute("href", b), {
            href: tf.href,
            protocol: tf.protocol ? tf.protocol.replace(/:$/, "") : "",
            host: tf.host,
            search: tf.search ? tf.search.replace(/^\?/, "") : "",
            hash: tf.hash ? tf.hash.replace(/^#/, "") : "",
            hostname: tf.hostname,
            port: tf.port,
            pathname: "/" === tf.pathname.charAt(0) ? tf.pathname : "/" + tf.pathname
        }
    }

    function ed(a) {
        var b = u(a) ? dd(a) : a;
        return b.protocol === uf.protocol && b.host === uf.host
    }

    function fd() {
        this.$get = q(a)
    }

    function gd(a) {
        function b(d, e) {
            if (t(d)) {
                var g = {};
                return f(d, function(a, c) {
                    g[c] = b(c, a)
                }), g
            }
            return a.factory(d + c, e)
        }
        var c = "Filter";
        this.register = b, this.$get = ["$injector", function(a) {
            return function(b) {
                return a.get(b + c)
            }
        }], b("currency", kd), b("date", vd), b("filter", hd), b("json", wd), b("limitTo", xd), b("lowercase", zf), b("number", ld), b("orderBy", yd), b("uppercase", Af)
    }

    function hd() {
        return function(a, b, c) {
            if (!je(a)) return a;
            var d, e;
            switch (typeof b) {
                case "function":
                    d = b;
                    break;
                case "boolean":
                case "number":
                case "string":
                    e = !0;
                case "object":
                    d = id(b, c, e);
                    break;
                default:
                    return a
            }
            return a.filter(d)
        }
    }

    function id(a, b, c) {
        var d, e = t(a) && "$" in a;
        return b === !0 ? b = M : x(b) || (b = function(a, b) {
            return t(a) || t(b) ? !1 : (a = Ud("" + a), b = Ud("" + b), -1 !== a.indexOf(b))
        }), d = function(d) {
            return e && !t(d) ? jd(d, a.$, b, !1) : jd(d, a, b, c)
        }
    }

    function jd(a, b, c, d, e) {
        var f = typeof a,
            g = typeof b;
        if ("string" === g && "!" === b.charAt(0)) return !jd(a, b.substring(1), c, d);
        if (je(a)) return a.some(function(a) {
            return jd(a, b, c, d)
        });
        switch (f) {
            case "object":
                var h;
                if (d) {
                    for (h in a)
                        if ("$" !== h.charAt(0) && jd(a[h], b, c, !0)) return !0;
                    return e ? !1 : jd(a, b, c, !1)
                }
                if ("object" === g) {
                    for (h in b) {
                        var i = b[h];
                        if (!x(i)) {
                            var j = "$" === h,
                                k = j ? a : a[h];
                            if (!jd(k, i, c, j, j)) return !1
                        }
                    }
                    return !0
                }
                return c(a, b);
            case "function":
                return !1;
            default:
                return c(a, b)
        }
    }

    function kd(a) {
        var b = a.NUMBER_FORMATS;
        return function(a, c, d) {
            return r(c) && (c = b.CURRENCY_SYM), r(d) && (d = b.PATTERNS[1].maxFrac), null == a ? a : md(a, b.PATTERNS[1], b.GROUP_SEP, b.DECIMAL_SEP, d).replace(/\u00A4/g, c)
        }
    }

    function ld(a) {
        var b = a.NUMBER_FORMATS;
        return function(a, c) {
            return null == a ? a : md(a, b.PATTERNS[0], b.GROUP_SEP, b.DECIMAL_SEP, c)
        }
    }

    function md(a, b, c, d, e) {
        if (!isFinite(a) || t(a)) return "";
        var f = 0 > a;
        a = Math.abs(a);
        var g = a + "",
            h = "",
            i = [],
            j = !1;
        if (-1 !== g.indexOf("e")) {
            var k = g.match(/([\d\.]+)e(-?)(\d+)/);
            k && "-" == k[2] && k[3] > e + 1 ? a = 0 : (h = g, j = !0)
        }
        if (j) e > 0 && 1 > a && (h = a.toFixed(e), a = parseFloat(h));
        else {
            var l = (g.split(vf)[1] || "").length;
            r(e) && (e = Math.min(Math.max(b.minFrac, l), b.maxFrac)), a = +(Math.round(+(a.toString() + "e" + e)).toString() + "e" + -e);
            var m = ("" + a).split(vf),
                n = m[0];
            m = m[1] || "";
            var o, p = 0,
                q = b.lgSize,
                s = b.gSize;
            if (n.length >= q + s)
                for (p = n.length - q, o = 0; p > o; o++)(p - o) % s === 0 && 0 !== o && (h += c), h += n.charAt(o);
            for (o = p; o < n.length; o++)(n.length - o) % q === 0 && 0 !== o && (h += c), h += n.charAt(o);
            for (; m.length < e;) m += "0";
            e && "0" !== e && (h += d + m.substr(0, e))
        }
        return 0 === a && (f = !1), i.push(f ? b.negPre : b.posPre, h, f ? b.negSuf : b.posSuf), i.join("")
    }

    function nd(a, b, c) {
        var d = "";
        for (0 > a && (d = "-", a = -a), a = "" + a; a.length < b;) a = "0" + a;
        return c && (a = a.substr(a.length - b)), d + a
    }

    function od(a, b, c, d) {
        return c = c || 0,
            function(e) {
                var f = e["get" + a]();
                return (c > 0 || f > -c) && (f += c), 0 === f && -12 == c && (f = 12), nd(f, b, d)
            }
    }

    function pd(a, b) {
        return function(c, d) {
            var e = c["get" + a](),
                f = Wd(b ? "SHORT" + a : a);
            return d[f][e]
        }
    }

    function qd(a) {
        var b = -1 * a.getTimezoneOffset(),
            c = b >= 0 ? "+" : "";
        return c += nd(Math[b > 0 ? "floor" : "ceil"](b / 60), 2) + nd(Math.abs(b % 60), 2)
    }

    function rd(a) {
        var b = new Date(a, 0, 1).getDay();
        return new Date(a, 0, (4 >= b ? 5 : 12) - b)
    }

    function sd(a) {
        return new Date(a.getFullYear(), a.getMonth(), a.getDate() + (4 - a.getDay()))
    }

    function td(a) {
        return function(b) {
            var c = rd(b.getFullYear()),
                d = sd(b),
                e = +d - +c,
                f = 1 + Math.round(e / 6048e5);
            return nd(f, a)
        }
    }

    function ud(a, b) {
        return a.getHours() < 12 ? b.AMPMS[0] : b.AMPMS[1]
    }

    function vd(a) {
        function b(a) {
            var b;
            if (b = a.match(c)) {
                var d = new Date(0),
                    e = 0,
                    f = 0,
                    g = b[8] ? d.setUTCFullYear : d.setFullYear,
                    h = b[8] ? d.setUTCHours : d.setHours;
                b[9] && (e = m(b[9] + b[10]), f = m(b[9] + b[11])), g.call(d, m(b[1]), m(b[2]) - 1, m(b[3]));
                var i = m(b[4] || 0) - e,
                    j = m(b[5] || 0) - f,
                    k = m(b[6] || 0),
                    l = Math.round(1e3 * parseFloat("0." + (b[7] || 0)));
                return h.call(d, i, j, k, l), d
            }
            return a
        }
        var c = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
        return function(c, d, e) {
            var g, h, i = "",
                j = [];
            if (d = d || "mediumDate", d = a.DATETIME_FORMATS[d] || d, u(c) && (c = yf.test(c) ? m(c) : b(c)), v(c) && (c = new Date(c)), !w(c)) return c;
            for (; d;) h = xf.exec(d), h ? (j = N(j, h, 1), d = j.pop()) : (j.push(d), d = null);
            return e && "UTC" === e && (c = new Date(c.getTime()), c.setMinutes(c.getMinutes() + c.getTimezoneOffset())), f(j, function(b) {
                g = wf[b], i += g ? g(c, a.DATETIME_FORMATS) : b.replace(/(^'|'$)/g, "").replace(/''/g, "'")
            }), i
        }
    }

    function wd() {
        return function(a, b) {
            return r(b) && (b = 2), R(a, b)
        }
    }

    function xd() {
        return function(a, b) {
            return v(a) && (a = a.toString()), je(a) || u(a) ? (b = 1 / 0 === Math.abs(Number(b)) ? Number(b) : m(b), b ? b > 0 ? a.slice(0, b) : a.slice(b) : u(a) ? "" : []) : a
        }
    }

    function yd(a) {
        return function(b, c, d) {
            function f(a, b) {
                for (var d = 0; d < c.length; d++) {
                    var e = c[d](a, b);
                    if (0 !== e) return e
                }
                return 0
            }

            function g(a, b) {
                return b ? function(b, c) {
                    return a(c, b)
                } : a
            }

            function h(a) {
                switch (typeof a) {
                    case "number":
                    case "boolean":
                    case "string":
                        return !0;
                    default:
                        return !1
                }
            }

            function i(a) {
                return null === a ? "null" : "function" == typeof a.valueOf && (a = a.valueOf(), h(a)) ? a : "function" == typeof a.toString && (a = a.toString(), h(a)) ? a : ""
            }

            function j(a, b) {
                var c = typeof a,
                    d = typeof b;
                return c === d && "object" === c && (a = i(a), b = i(b)), c === d ? ("string" === c && (a = a.toLowerCase(), b = b.toLowerCase()), a === b ? 0 : b > a ? -1 : 1) : d > c ? -1 : 1
            }
            return e(b) ? (c = je(c) ? c : [c], 0 === c.length && (c = ["+"]), c = c.map(function(b) {
                var c = !1,
                    d = b || p;
                if (u(b)) {
                    if (("+" == b.charAt(0) || "-" == b.charAt(0)) && (c = "-" == b.charAt(0), b = b.substring(1)), "" === b) return g(j, c);
                    if (d = a(b), d.constant) {
                        var e = d();
                        return g(function(a, b) {
                            return j(a[e], b[e])
                        }, c)
                    }
                }
                return g(function(a, b) {
                    return j(d(a), d(b))
                }, c)
            }), be.call(b).sort(g(f, d))) : b
        }
    }

    function zd(a) {
        return x(a) && (a = {
            link: a
        }), a.restrict = a.restrict || "AC", q(a)
    }

    function Ad(a, b) {
        a.$name = b
    }

    function Bd(a, b, d, e, g) {
        var h = this,
            i = [],
            j = h.$$parentForm = a.parent().controller("form") || Df;
        h.$error = {}, h.$$success = {}, h.$pending = c, h.$name = g(b.name || b.ngForm || "")(d), h.$dirty = !1, h.$pristine = !0, h.$valid = !0, h.$invalid = !1, h.$submitted = !1, j.$addControl(h), h.$rollbackViewValue = function() {
            f(i, function(a) {
                a.$rollbackViewValue()
            })
        }, h.$commitViewValue = function() {
            f(i, function(a) {
                a.$commitViewValue()
            })
        }, h.$addControl = function(a) {
            gb(a.$name, "input"), i.push(a), a.$name && (h[a.$name] = a)
        }, h.$$renameControl = function(a, b) {
            var c = a.$name;
            h[c] === a && delete h[c], h[b] = a, a.$name = b
        }, h.$removeControl = function(a) {
            a.$name && h[a.$name] === a && delete h[a.$name], f(h.$pending, function(b, c) {
                h.$setValidity(c, null, a)
            }), f(h.$error, function(b, c) {
                h.$setValidity(c, null, a)
            }), f(h.$$success, function(b, c) {
                h.$setValidity(c, null, a)
            }), J(i, a)
        }, Qd({
            ctrl: this,
            $element: a,
            set: function(a, b, c) {
                var d = a[b];
                if (d) {
                    var e = d.indexOf(c); - 1 === e && d.push(c)
                } else a[b] = [c]
            },
            unset: function(a, b, c) {
                var d = a[b];
                d && (J(d, c), 0 === d.length && delete a[b])
            },
            parentForm: j,
            $animate: e
        }), h.$setDirty = function() {
            e.removeClass(a, lg), e.addClass(a, mg), h.$dirty = !0, h.$pristine = !1, j.$setDirty()
        }, h.$setPristine = function() {
            e.setClass(a, lg, mg + " " + Ef), h.$dirty = !1, h.$pristine = !0, h.$submitted = !1, f(i, function(a) {
                a.$setPristine()
            })
        }, h.$setUntouched = function() {
            f(i, function(a) {
                a.$setUntouched()
            })
        }, h.$setSubmitted = function() {
            e.addClass(a, Ef), h.$submitted = !0, j.$setSubmitted()
        }
    }

    function Cd(a) {
        a.$formatters.push(function(b) {
            return a.$isEmpty(b) ? b : b.toString()
        })
    }

    function Dd(a, b, c, d, e, f) {
        Ed(a, b, c, d, e, f), Cd(d)
    }

    function Ed(a, b, c, d, e, f) {
        var g = Ud(b[0].type);
        if (!e.android) {
            var h = !1;
            b.on("compositionstart", function() {
                h = !0
            }), b.on("compositionend", function() {
                h = !1, i()
            })
        }
        var i = function(a) {
            if (j && (f.defer.cancel(j), j = null), !h) {
                var e = b.val(),
                    i = a && a.type;
                "password" === g || c.ngTrim && "false" === c.ngTrim || (e = ke(e)), (d.$viewValue !== e || "" === e && d.$$hasNativeValidators) && d.$setViewValue(e, i)
            }
        };
        if (e.hasEvent("input")) b.on("input", i);
        else {
            var j, k = function(a, b, c) {
                j || (j = f.defer(function() {
                    j = null, b && b.value === c || i(a)
                }))
            };
            b.on("keydown", function(a) {
                var b = a.keyCode;
                91 === b || b > 15 && 19 > b || b >= 37 && 40 >= b || k(a, this, this.value)
            }), e.hasEvent("paste") && b.on("paste cut", k)
        }
        b.on("change", i), d.$render = function() {
            b.val(d.$isEmpty(d.$viewValue) ? "" : d.$viewValue)
        }
    }

    function Fd(a, b) {
        if (w(a)) return a;
        if (u(a)) {
            Of.lastIndex = 0;
            var c = Of.exec(a);
            if (c) {
                var d = +c[1],
                    e = +c[2],
                    f = 0,
                    g = 0,
                    h = 0,
                    i = 0,
                    j = rd(d),
                    k = 7 * (e - 1);
                return b && (f = b.getHours(), g = b.getMinutes(), h = b.getSeconds(), i = b.getMilliseconds()), new Date(d, 0, j.getDate() + k, f, g, h, i)
            }
        }
        return 0 / 0
    }

    function Gd(a, b) {
        return function(c, d) {
            var e, g;
            if (w(c)) return c;
            if (u(c)) {
                if ('"' == c.charAt(0) && '"' == c.charAt(c.length - 1) && (c = c.substring(1, c.length - 1)), If.test(c)) return new Date(c);
                if (a.lastIndex = 0, e = a.exec(c)) return e.shift(), g = d ? {
                    yyyy: d.getFullYear(),
                    MM: d.getMonth() + 1,
                    dd: d.getDate(),
                    HH: d.getHours(),
                    mm: d.getMinutes(),
                    ss: d.getSeconds(),
                    sss: d.getMilliseconds() / 1e3
                } : {
                    yyyy: 1970,
                    MM: 1,
                    dd: 1,
                    HH: 0,
                    mm: 0,
                    ss: 0,
                    sss: 0
                }, f(e, function(a, c) {
                    c < b.length && (g[b[c]] = +a)
                }), new Date(g.yyyy, g.MM - 1, g.dd, g.HH, g.mm, g.ss || 0, 1e3 * g.sss || 0)
            }
            return 0 / 0
        }
    }

    function Hd(a, b, d, e) {
        return function(f, g, h, i, j, k, l) {
            function m(a) {
                return a && !(a.getTime && a.getTime() !== a.getTime())
            }

            function n(a) {
                return s(a) ? w(a) ? a : d(a) : c
            }
            Id(f, g, h, i), Ed(f, g, h, i, j, k);
            var o, p = i && i.$options && i.$options.timezone;
            if (i.$$parserName = a, i.$parsers.push(function(a) {
                    if (i.$isEmpty(a)) return null;
                    if (b.test(a)) {
                        var e = d(a, o);
                        return "UTC" === p && e.setMinutes(e.getMinutes() - e.getTimezoneOffset()), e
                    }
                    return c
                }), i.$formatters.push(function(a) {
                    if (a && !w(a)) throw qg("datefmt", "Expected `{0}` to be a date", a);
                    if (m(a)) {
                        if (o = a, o && "UTC" === p) {
                            var b = 6e4 * o.getTimezoneOffset();
                            o = new Date(o.getTime() + b)
                        }
                        return l("date")(a, e, p)
                    }
                    return o = null, ""
                }), s(h.min) || h.ngMin) {
                var q;
                i.$validators.min = function(a) {
                    return !m(a) || r(q) || d(a) >= q
                }, h.$observe("min", function(a) {
                    q = n(a), i.$validate()
                })
            }
            if (s(h.max) || h.ngMax) {
                var t;
                i.$validators.max = function(a) {
                    return !m(a) || r(t) || d(a) <= t
                }, h.$observe("max", function(a) {
                    t = n(a), i.$validate()
                })
            }
        }
    }

    function Id(a, b, d, e) {
        var f = b[0],
            g = e.$$hasNativeValidators = t(f.validity);
        g && e.$parsers.push(function(a) {
            var d = b.prop(Td) || {};
            return d.badInput && !d.typeMismatch ? c : a
        })
    }

    function Jd(a, b, d, e, f, g) {
        if (Id(a, b, d, e), Ed(a, b, d, e, f, g), e.$$parserName = "number", e.$parsers.push(function(a) {
                return e.$isEmpty(a) ? null : Lf.test(a) ? parseFloat(a) : c
            }), e.$formatters.push(function(a) {
                if (!e.$isEmpty(a)) {
                    if (!v(a)) throw qg("numfmt", "Expected `{0}` to be a number", a);
                    a = a.toString()
                }
                return a
            }), d.min || d.ngMin) {
            var h;
            e.$validators.min = function(a) {
                return e.$isEmpty(a) || r(h) || a >= h
            }, d.$observe("min", function(a) {
                s(a) && !v(a) && (a = parseFloat(a, 10)), h = v(a) && !isNaN(a) ? a : c, e.$validate()
            })
        }
        if (d.max || d.ngMax) {
            var i;
            e.$validators.max = function(a) {
                return e.$isEmpty(a) || r(i) || i >= a
            }, d.$observe("max", function(a) {
                s(a) && !v(a) && (a = parseFloat(a, 10)), i = v(a) && !isNaN(a) ? a : c, e.$validate()
            })
        }
    }

    function Kd(a, b, c, d, e, f) {
        Ed(a, b, c, d, e, f), Cd(d), d.$$parserName = "url", d.$validators.url = function(a, b) {
            var c = a || b;
            return d.$isEmpty(c) || Jf.test(c)
        }
    }

    function Ld(a, b, c, d, e, f) {
        Ed(a, b, c, d, e, f), Cd(d), d.$$parserName = "email", d.$validators.email = function(a, b) {
            var c = a || b;
            return d.$isEmpty(c) || Kf.test(c)
        }
    }

    function Md(a, b, c, d) {
        r(c.name) && b.attr("name", j());
        var e = function(a) {
            b[0].checked && d.$setViewValue(c.value, a && a.type)
        };
        b.on("click", e), d.$render = function() {
            var a = c.value;
            b[0].checked = a == d.$viewValue
        }, c.$observe("value", d.$render)
    }

    function Nd(a, b, c, e, f) {
        var g;
        if (s(e)) {
            if (g = a(e), !g.constant) throw d("ngModel")("constexpr", "Expected constant expression for `{0}`, but saw `{1}`.", c, e);
            return g(b)
        }
        return f
    }

    function Od(a, b, c, d, e, f, g, h) {
        var i = Nd(h, a, "ngTrueValue", c.ngTrueValue, !0),
            j = Nd(h, a, "ngFalseValue", c.ngFalseValue, !1),
            k = function(a) {
                d.$setViewValue(b[0].checked, a && a.type)
            };
        b.on("click", k), d.$render = function() {
            b[0].checked = d.$viewValue
        }, d.$isEmpty = function(a) {
            return a === !1
        }, d.$formatters.push(function(a) {
            return M(a, i)
        }), d.$parsers.push(function(a) {
            return a ? i : j
        })
    }

    function Pd(a, b) {
        return a = "ngClass" + a, ["$animate", function(c) {
            function d(a, b) {
                var c = [];
                a: for (var d = 0; d < a.length; d++) {
                    for (var e = a[d], f = 0; f < b.length; f++)
                        if (e == b[f]) continue a;
                    c.push(e)
                }
                return c
            }

            function e(a) {
                if (je(a)) return a;
                if (u(a)) return a.split(" ");
                if (t(a)) {
                    var b = [];
                    return f(a, function(a, c) {
                        a && (b = b.concat(c.split(" ")))
                    }), b
                }
                return a
            }
            return {
                restrict: "AC",
                link: function(g, h, i) {
                    function j(a) {
                        var b = l(a, 1);
                        i.$addClass(b)
                    }

                    function k(a) {
                        var b = l(a, -1);
                        i.$removeClass(b)
                    }

                    function l(a, b) {
                        var c = h.data("$classCounts") || {},
                            d = [];
                        return f(a, function(a) {
                            (b > 0 || c[a]) && (c[a] = (c[a] || 0) + b, c[a] === +(b > 0) && d.push(a))
                        }), h.data("$classCounts", c), d.join(" ")
                    }

                    function m(a, b) {
                        var e = d(b, a),
                            f = d(a, b);
                        e = l(e, 1), f = l(f, -1), e && e.length && c.addClass(h, e), f && f.length && c.removeClass(h, f)
                    }

                    function n(a) {
                        if (b === !0 || g.$index % 2 === b) {
                            var c = e(a || []);
                            if (o) {
                                if (!M(a, o)) {
                                    var d = e(o);
                                    m(d, c)
                                }
                            } else j(c)
                        }
                        o = L(a)
                    }
                    var o;
                    g.$watch(i[a], n, !0), i.$observe("class", function() {
                        n(g.$eval(i[a]))
                    }), "ngClass" !== a && g.$watch("$index", function(c, d) {
                        var f = 1 & c;
                        if (f !== (1 & d)) {
                            var h = e(g.$eval(i[a]));
                            f === b ? j(h) : k(h)
                        }
                    })
                }
            }
        }]
    }

    function Qd(a) {
        function b(a, b, i) {
            b === c ? d("$pending", a, i) : e("$pending", a, i), E(b) ? b ? (l(h.$error, a, i), k(h.$$success, a, i)) : (k(h.$error, a, i), l(h.$$success, a, i)) : (l(h.$error, a, i), l(h.$$success, a, i)), h.$pending ? (f(pg, !0), h.$valid = h.$invalid = c, g("", null)) : (f(pg, !1), h.$valid = Rd(h.$error), h.$invalid = !h.$valid, g("", h.$valid));
            var j;
            j = h.$pending && h.$pending[a] ? c : h.$error[a] ? !1 : h.$$success[a] ? !0 : null, g(a, j), m.$setValidity(a, j, h)
        }

        function d(a, b, c) {
            h[a] || (h[a] = {}), k(h[a], b, c)
        }

        function e(a, b, d) {
            h[a] && l(h[a], b, d), Rd(h[a]) && (h[a] = c)
        }

        function f(a, b) {
            b && !j[a] ? (n.addClass(i, a), j[a] = !0) : !b && j[a] && (n.removeClass(i, a), j[a] = !1)
        }

        function g(a, b) {
            a = a ? "-" + cb(a, "-") : "", f(jg + a, b === !0), f(kg + a, b === !1)
        }
        var h = a.ctrl,
            i = a.$element,
            j = {},
            k = a.set,
            l = a.unset,
            m = a.parentForm,
            n = a.$animate;
        j[kg] = !(j[jg] = i.hasClass(jg)), h.$setValidity = b
    }

    function Rd(a) {
        if (a)
            for (var b in a) return !1;
        return !0
    }
    var Sd = /^\/(.+)\/([a-z]*)$/,
        Td = "validity",
        Ud = function(a) {
            return u(a) ? a.toLowerCase() : a
        },
        Vd = Object.prototype.hasOwnProperty,
        Wd = function(a) {
            return u(a) ? a.toUpperCase() : a
        },
        Xd = function(a) {
            return u(a) ? a.replace(/[A-Z]/g, function(a) {
                return String.fromCharCode(32 | a.charCodeAt(0))
            }) : a
        },
        Yd = function(a) {
            return u(a) ? a.replace(/[a-z]/g, function(a) {
                return String.fromCharCode(-33 & a.charCodeAt(0))
            }) : a
        };
    "i" !== "I".toLowerCase() && (Ud = Xd, Wd = Yd);
    var Zd, $d, _d, ae, be = [].slice,
        ce = [].splice,
        de = [].push,
        ee = Object.prototype.toString,
        fe = d("ng"),
        ge = a.angular || (a.angular = {}),
        he = 0;
    Zd = b.documentMode, o.$inject = [], p.$inject = [];
    var ie, je = Array.isArray,
        ke = function(a) {
            return u(a) ? a.trim() : a
        },
        le = function(a) {
            return a.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
        },
        me = function() {
            if (s(me.isActive_)) return me.isActive_;
            var a = !(!b.querySelector("[ng-csp]") && !b.querySelector("[data-ng-csp]"));
            if (!a) try {
                new Function("")
            } catch (c) {
                a = !0
            }
            return me.isActive_ = a
        },
        ne = ["ng-", "data-ng-", "ng:", "x-ng-"],
        oe = /[A-Z]/g,
        pe = !1,
        qe = 1,
        re = 3,
        se = 8,
        te = 9,
        ue = 11,
        ve = {
            full: "1.3.11",
            major: 1,
            minor: 3,
            dot: 11,
            codeName: "spiffy-manatee"
        };
    ub.expando = "ng339";
    var we = ub.cache = {},
        xe = 1,
        ye = function(a, b, c) {
            a.addEventListener(b, c, !1)
        },
        ze = function(a, b, c) {
            a.removeEventListener(b, c, !1)
        };
    ub._data = function(a) {
        return this.cache[a[this.expando]] || {}
    };
    var Ae = /([\:\-\_]+(.))/g,
        Be = /^moz([A-Z])/,
        Ce = {
            mouseleave: "mouseout",
            mouseenter: "mouseover"
        },
        De = d("jqLite"),
        Ee = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        Fe = /<|&#?\w+;/,
        Ge = /<([\w:]+)/,
        He = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        Ie = {
            option: [1, '<select multiple="multiple">', "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    Ie.optgroup = Ie.option, Ie.tbody = Ie.tfoot = Ie.colgroup = Ie.caption = Ie.thead, Ie.th = Ie.td;
    var Je = ub.prototype = {
            ready: function(c) {
                function d() {
                    e || (e = !0, c())
                }
                var e = !1;
                "complete" === b.readyState ? setTimeout(d) : (this.on("DOMContentLoaded", d), ub(a).on("load", d))
            },
            toString: function() {
                var a = [];
                return f(this, function(b) {
                    a.push("" + b)
                }), "[" + a.join(", ") + "]"
            },
            eq: function(a) {
                return $d(a >= 0 ? this[a] : this[this.length + a])
            },
            length: 0,
            push: de,
            sort: [].sort,
            splice: [].splice
        },
        Ke = {};
    f("multiple,selected,checked,disabled,readOnly,required,open".split(","), function(a) {
        Ke[Ud(a)] = a
    });
    var Le = {};
    f("input,select,option,textarea,button,form,details".split(","), function(a) {
        Le[a] = !0
    });
    var Me = {
        ngMinlength: "minlength",
        ngMaxlength: "maxlength",
        ngMin: "min",
        ngMax: "max",
        ngPattern: "pattern"
    };
    f({
        data: Ab,
        removeData: yb
    }, function(a, b) {
        ub[b] = a
    }), f({
        data: Ab,
        inheritedData: Gb,
        scope: function(a) {
            return $d.data(a, "$scope") || Gb(a.parentNode || a, ["$isolateScope", "$scope"])
        },
        isolateScope: function(a) {
            return $d.data(a, "$isolateScope") || $d.data(a, "$isolateScopeNoTemplate")
        },
        controller: Fb,
        injector: function(a) {
            return Gb(a, "$injector")
        },
        removeAttr: function(a, b) {
            a.removeAttribute(b)
        },
        hasClass: Bb,
        css: function(a, b, c) {
            return b = pb(b), s(c) ? void(a.style[b] = c) : a.style[b]
        },
        attr: function(a, b, d) {
            var e = Ud(b);
            if (Ke[e]) {
                if (!s(d)) return a[b] || (a.attributes.getNamedItem(b) || o).specified ? e : c;
                d ? (a[b] = !0, a.setAttribute(b, e)) : (a[b] = !1, a.removeAttribute(e))
            } else if (s(d)) a.setAttribute(b, d);
            else if (a.getAttribute) {
                var f = a.getAttribute(b, 2);
                return null === f ? c : f
            }
        },
        prop: function(a, b, c) {
            return s(c) ? void(a[b] = c) : a[b]
        },
        text: function() {
            function a(a, b) {
                if (r(b)) {
                    var c = a.nodeType;
                    return c === qe || c === re ? a.textContent : ""
                }
                a.textContent = b
            }
            return a.$dv = "", a
        }(),
        val: function(a, b) {
            if (r(b)) {
                if (a.multiple && "select" === I(a)) {
                    var c = [];
                    return f(a.options, function(a) {
                        a.selected && c.push(a.value || a.text)
                    }), 0 === c.length ? null : c
                }
                return a.value
            }
            a.value = b
        },
        html: function(a, b) {
            return r(b) ? a.innerHTML : (wb(a, !0), void(a.innerHTML = b))
        },
        empty: Hb
    }, function(a, b) {
        ub.prototype[b] = function(b, d) {
            var e, f, g = this.length;
            if (a !== Hb && (2 == a.length && a !== Bb && a !== Fb ? b : d) === c) {
                if (t(b)) {
                    for (e = 0; g > e; e++)
                        if (a === Ab) a(this[e], b);
                        else
                            for (f in b) a(this[e], f, b[f]);
                    return this
                }
                for (var h = a.$dv, i = h === c ? Math.min(g, 1) : g, j = 0; i > j; j++) {
                    var k = a(this[j], b, d);
                    h = h ? h + k : k
                }
                return h
            }
            for (e = 0; g > e; e++) a(this[e], b, d);
            return this
        }
    }), f({
        removeData: yb,
        on: function Rg(a, b, c, d) {
            if (s(d)) throw De("onargs", "jqLite#on() does not support the `selector` or `eventData` parameters");
            if (rb(a)) {
                var e = zb(a, !0),
                    f = e.events,
                    g = e.handle;
                g || (g = e.handle = Mb(a, f));
                for (var h = b.indexOf(" ") >= 0 ? b.split(" ") : [b], i = h.length; i--;) {
                    b = h[i];
                    var j = f[b];
                    j || (f[b] = [], "mouseenter" === b || "mouseleave" === b ? Rg(a, Ce[b], function(a) {
                        var c = this,
                            d = a.relatedTarget;
                        (!d || d !== c && !c.contains(d)) && g(a, b)
                    }) : "$destroy" !== b && ye(a, b, g), j = f[b]), j.push(c)
                }
            }
        },
        off: xb,
        one: function(a, b, c) {
            a = $d(a), a.on(b, function d() {
                a.off(b, c), a.off(b, d)
            }), a.on(b, c)
        },
        replaceWith: function(a, b) {
            var c, d = a.parentNode;
            wb(a), f(new ub(b), function(b) {
                c ? d.insertBefore(b, c.nextSibling) : d.replaceChild(b, a), c = b
            })
        },
        children: function(a) {
            var b = [];
            return f(a.childNodes, function(a) {
                a.nodeType === qe && b.push(a)
            }), b
        },
        contents: function(a) {
            return a.contentDocument || a.childNodes || []
        },
        append: function(a, b) {
            var c = a.nodeType;
            if (c === qe || c === ue) {
                b = new ub(b);
                for (var d = 0, e = b.length; e > d; d++) {
                    var f = b[d];
                    a.appendChild(f)
                }
            }
        },
        prepend: function(a, b) {
            if (a.nodeType === qe) {
                var c = a.firstChild;
                f(new ub(b), function(b) {
                    a.insertBefore(b, c)
                })
            }
        },
        wrap: function(a, b) {
            b = $d(b).eq(0).clone()[0];
            var c = a.parentNode;
            c && c.replaceChild(b, a), b.appendChild(a)
        },
        remove: Ib,
        detach: function(a) {
            Ib(a, !0)
        },
        after: function(a, b) {
            var c = a,
                d = a.parentNode;
            b = new ub(b);
            for (var e = 0, f = b.length; f > e; e++) {
                var g = b[e];
                d.insertBefore(g, c.nextSibling), c = g
            }
        },
        addClass: Db,
        removeClass: Cb,
        toggleClass: function(a, b, c) {
            b && f(b.split(" "), function(b) {
                var d = c;
                r(d) && (d = !Bb(a, b)), (d ? Db : Cb)(a, b)
            })
        },
        parent: function(a) {
            var b = a.parentNode;
            return b && b.nodeType !== ue ? b : null
        },
        next: function(a) {
            return a.nextElementSibling
        },
        find: function(a, b) {
            return a.getElementsByTagName ? a.getElementsByTagName(b) : []
        },
        clone: vb,
        triggerHandler: function(a, b, c) {
            var d, e, g, h = b.type || b,
                i = zb(a),
                j = i && i.events,
                k = j && j[h];
            k && (d = {
                preventDefault: function() {
                    this.defaultPrevented = !0
                },
                isDefaultPrevented: function() {
                    return this.defaultPrevented === !0
                },
                stopImmediatePropagation: function() {
                    this.immediatePropagationStopped = !0
                },
                isImmediatePropagationStopped: function() {
                    return this.immediatePropagationStopped === !0
                },
                stopPropagation: o,
                type: h,
                target: a
            }, b.type && (d = l(d, b)), e = L(k), g = c ? [d].concat(c) : [d], f(e, function(b) {
                d.isImmediatePropagationStopped() || b.apply(a, g)
            }))
        }
    }, function(a, b) {
        ub.prototype[b] = function(b, c, d) {
            for (var e, f = 0, g = this.length; g > f; f++) r(e) ? (e = a(this[f], b, c, d), s(e) && (e = $d(e))) : Eb(e, a(this[f], b, c, d));
            return s(e) ? e : this
        }, ub.prototype.bind = ub.prototype.on, ub.prototype.unbind = ub.prototype.off
    }), Pb.prototype = {
        put: function(a, b) {
            this[Ob(a, this.nextUid)] = b
        },
        get: function(a) {
            return this[Ob(a, this.nextUid)]
        },
        remove: function(a) {
            var b = this[a = Ob(a, this.nextUid)];
            return delete this[a], b
        }
    };
    var Ne = /^function\s*[^\(]*\(\s*([^\)]*)\)/m,
        Oe = /,/,
        Pe = /^\s*(_?)(\S+?)\1\s*$/,
        Qe = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm,
        Re = d("$injector");
    Sb.$$annotate = Rb;
    var Se = d("$animate"),
        Te = ["$provide", function(a) {
            this.$$selectors = {}, this.register = function(b, c) {
                var d = b + "-animation";
                if (b && "." != b.charAt(0)) throw Se("notcsel", "Expecting class selector starting with '.' got '{0}'.", b);
                this.$$selectors[b.substr(1)] = d, a.factory(d, c)
            }, this.classNameFilter = function(a) {
                return 1 === arguments.length && (this.$$classNameFilter = a instanceof RegExp ? a : null), this.$$classNameFilter
            }, this.$get = ["$$q", "$$asyncCallback", "$rootScope", function(a, b, c) {
                function d(b) {
                    var d, e = a.defer();
                    return e.promise.$$cancelFn = function() {
                        d && d()
                    }, c.$$postDigest(function() {
                        d = b(function() {
                            e.resolve()
                        })
                    }), e.promise
                }

                function e(a, b) {
                    var c = [],
                        d = [],
                        e = jb();
                    return f((a.attr("class") || "").split(/\s+/), function(a) {
                        e[a] = !0
                    }), f(b, function(a, b) {
                        var f = e[b];
                        a === !1 && f ? d.push(b) : a !== !0 || f || c.push(b)
                    }), c.length + d.length > 0 && [c.length ? c : null, d.length ? d : null]
                }

                function g(a, b, c) {
                    for (var d = 0, e = b.length; e > d; ++d) {
                        var f = b[d];
                        a[f] = c
                    }
                }

                function h() {
                    return j || (j = a.defer(), b(function() {
                        j.resolve(), j = null
                    })), j.promise
                }

                function i(a, b) {
                    if (ge.isObject(b)) {
                        var c = l(b.from || {}, b.to || {});
                        a.css(c)
                    }
                }
                var j;
                return {
                    animate: function(a, b, c) {
                        return i(a, {
                            from: b,
                            to: c
                        }), h()
                    },
                    enter: function(a, b, c, d) {
                        return i(a, d), c ? c.after(a) : b.prepend(a), h()
                    },
                    leave: function(a) {
                        return a.remove(), h()
                    },
                    move: function(a, b, c, d) {
                        return this.enter(a, b, c, d)
                    },
                    addClass: function(a, b, c) {
                        return this.setClass(a, b, [], c)
                    },
                    $$addClassImmediately: function(a, b, c) {
                        return a = $d(a), b = u(b) ? b : je(b) ? b.join(" ") : "", f(a, function(a) {
                            Db(a, b)
                        }), i(a, c), h()
                    },
                    removeClass: function(a, b, c) {
                        return this.setClass(a, [], b, c)
                    },
                    $$removeClassImmediately: function(a, b, c) {
                        return a = $d(a), b = u(b) ? b : je(b) ? b.join(" ") : "", f(a, function(a) {
                            Cb(a, b)
                        }), i(a, c), h()
                    },
                    setClass: function(a, b, c, f) {
                        var h = this,
                            i = "$$animateClasses",
                            j = !1;
                        a = $d(a);
                        var k = a.data(i);
                        k ? f && k.options && (k.options = ge.extend(k.options || {}, f)) : (k = {
                            classes: {},
                            options: f
                        }, j = !0);
                        var l = k.classes;
                        return b = je(b) ? b : b.split(" "), c = je(c) ? c : c.split(" "), g(l, b, !0), g(l, c, !1), j && (k.promise = d(function(b) {
                            var c = a.data(i);
                            if (a.removeData(i), c) {
                                var d = e(a, c.classes);
                                d && h.$$setClassImmediately(a, d[0], d[1], c.options)
                            }
                            b()
                        }), a.data(i, k)), k.promise
                    },
                    $$setClassImmediately: function(a, b, c, d) {
                        return b && this.$$addClassImmediately(a, b), c && this.$$removeClassImmediately(a, c), i(a, d), h()
                    },
                    enabled: o,
                    cancel: o
                }
            }]
        }],
        Ue = d("$compile");
    Zb.$inject = ["$provide", "$$sanitizeUriProvider"];
    var Ve = /^((?:x|data)[\:\-_])/i,
        We = "application/json",
        Xe = {
            "Content-Type": We + ";charset=utf-8"
        },
        Ye = /^\[|^\{(?!\{)/,
        Ze = {
            "[": /]$/,
            "{": /}$/
        },
        $e = /^\)\]\}',?\n/,
        _e = d("$interpolate"),
        af = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/,
        bf = {
            http: 80,
            https: 443,
            ftp: 21
        },
        cf = d("$location"),
        df = {
            $$html5: !1,
            $$replace: !1,
            absUrl: Cc("$$absUrl"),
            url: function(a) {
                if (r(a)) return this.$$url;
                var b = af.exec(a);
                return (b[1] || "" === a) && this.path(decodeURIComponent(b[1])), (b[2] || b[1] || "" === a) && this.search(b[3] || ""), this.hash(b[5] || ""), this
            },
            protocol: Cc("$$protocol"),
            host: Cc("$$host"),
            port: Cc("$$port"),
            path: Dc("$$path", function(a) {
                return a = null !== a ? a.toString() : "", "/" == a.charAt(0) ? a : "/" + a
            }),
            search: function(a, b) {
                switch (arguments.length) {
                    case 0:
                        return this.$$search;
                    case 1:
                        if (u(a) || v(a)) a = a.toString(), this.$$search = V(a);
                        else {
                            if (!t(a)) throw cf("isrcharg", "The first argument of the `$location#search()` call must be a string or an object.");
                            a = K(a, {}), f(a, function(b, c) {
                                null == b && delete a[c]
                            }), this.$$search = a
                        }
                        break;
                    default:
                        r(b) || null === b ? delete this.$$search[a] : this.$$search[a] = b
                }
                return this.$$compose(), this
            },
            hash: Dc("$$hash", function(a) {
                return null !== a ? a.toString() : ""
            }),
            replace: function() {
                return this.$$replace = !0, this
            }
        };
    f([Bc, Ac, zc], function(a) {
        a.prototype = Object.create(df), a.prototype.state = function(b) {
            if (!arguments.length) return this.$$state;
            if (a !== zc || !this.$$html5) throw cf("nostate", "History API state support is available only in HTML5 mode and only in browsers supporting HTML5 History API");
            return this.$$state = r(b) ? null : b, this
        }
    });
    var ef = d("$parse"),
        ff = Function.prototype.call,
        gf = Function.prototype.apply,
        hf = Function.prototype.bind,
        jf = jb();
    f({
        "null": function() {
            return null
        },
        "true": function() {
            return !0
        },
        "false": function() {
            return !1
        },
        undefined: function() {}
    }, function(a, b) {
        a.constant = a.literal = a.sharedGetter = !0, jf[b] = a
    }), jf["this"] = function(a) {
        return a
    }, jf["this"].sharedGetter = !0;
    var kf = l(jb(), {
            "+": function(a, b, d, e) {
                return d = d(a, b), e = e(a, b), s(d) ? s(e) ? d + e : d : s(e) ? e : c
            },
            "-": function(a, b, c, d) {
                return c = c(a, b), d = d(a, b), (s(c) ? c : 0) - (s(d) ? d : 0)
            },
            "*": function(a, b, c, d) {
                return c(a, b) * d(a, b)
            },
            "/": function(a, b, c, d) {
                return c(a, b) / d(a, b)
            },
            "%": function(a, b, c, d) {
                return c(a, b) % d(a, b)
            },
            "===": function(a, b, c, d) {
                return c(a, b) === d(a, b)
            },
            "!==": function(a, b, c, d) {
                return c(a, b) !== d(a, b)
            },
            "==": function(a, b, c, d) {
                return c(a, b) == d(a, b)
            },
            "!=": function(a, b, c, d) {
                return c(a, b) != d(a, b)
            },
            "<": function(a, b, c, d) {
                return c(a, b) < d(a, b)
            },
            ">": function(a, b, c, d) {
                return c(a, b) > d(a, b)
            },
            "<=": function(a, b, c, d) {
                return c(a, b) <= d(a, b)
            },
            ">=": function(a, b, c, d) {
                return c(a, b) >= d(a, b)
            },
            "&&": function(a, b, c, d) {
                return c(a, b) && d(a, b)
            },
            "||": function(a, b, c, d) {
                return c(a, b) || d(a, b)
            },
            "!": function(a, b, c) {
                return !c(a, b)
            },
            "=": !0,
            "|": !0
        }),
        lf = {
            n: "\n",
            f: "\f",
            r: "\r",
            t: "	",
            v: "",
            "'": "'",
            '"': '"'
        },
        mf = function(a) {
            this.options = a
        };
    mf.prototype = {
        constructor: mf,
        lex: function(a) {
            for (this.text = a, this.index = 0, this.tokens = []; this.index < this.text.length;) {
                var b = this.text.charAt(this.index);
                if ('"' === b || "'" === b) this.readString(b);
                else if (this.isNumber(b) || "." === b && this.isNumber(this.peek())) this.readNumber();
                else if (this.isIdent(b)) this.readIdent();
                else if (this.is(b, "(){}[].,;:?")) this.tokens.push({
                    index: this.index,
                    text: b
                }), this.index++;
                else if (this.isWhitespace(b)) this.index++;
                else {
                    var c = b + this.peek(),
                        d = c + this.peek(2),
                        e = kf[b],
                        f = kf[c],
                        g = kf[d];
                    if (e || f || g) {
                        var h = g ? d : f ? c : b;
                        this.tokens.push({
                            index: this.index,
                            text: h,
                            operator: !0
                        }), this.index += h.length
                    } else this.throwError("Unexpected next character ", this.index, this.index + 1)
                }
            }
            return this.tokens
        },
        is: function(a, b) {
            return -1 !== b.indexOf(a)
        },
        peek: function(a) {
            var b = a || 1;
            return this.index + b < this.text.length ? this.text.charAt(this.index + b) : !1
        },
        isNumber: function(a) {
            return a >= "0" && "9" >= a && "string" == typeof a
        },
        isWhitespace: function(a) {
            return " " === a || "\r" === a || "	" === a || "\n" === a || "" === a || " " === a
        },
        isIdent: function(a) {
            return a >= "a" && "z" >= a || a >= "A" && "Z" >= a || "_" === a || "$" === a
        },
        isExpOperator: function(a) {
            return "-" === a || "+" === a || this.isNumber(a)
        },
        throwError: function(a, b, c) {
            c = c || this.index;
            var d = s(b) ? "s " + b + "-" + this.index + " [" + this.text.substring(b, c) + "]" : " " + c;
            throw ef("lexerr", "Lexer Error: {0} at column{1} in expression [{2}].", a, d, this.text)
        },
        readNumber: function() {
            for (var a = "", b = this.index; this.index < this.text.length;) {
                var c = Ud(this.text.charAt(this.index));
                if ("." == c || this.isNumber(c)) a += c;
                else {
                    var d = this.peek();
                    if ("e" == c && this.isExpOperator(d)) a += c;
                    else if (this.isExpOperator(c) && d && this.isNumber(d) && "e" == a.charAt(a.length - 1)) a += c;
                    else {
                        if (!this.isExpOperator(c) || d && this.isNumber(d) || "e" != a.charAt(a.length - 1)) break;
                        this.throwError("Invalid exponent")
                    }
                }
                this.index++
            }
            this.tokens.push({
                index: b,
                text: a,
                constant: !0,
                value: Number(a)
            })
        },
        readIdent: function() {
            for (var a = this.index; this.index < this.text.length;) {
                var b = this.text.charAt(this.index);
                if (!this.isIdent(b) && !this.isNumber(b)) break;
                this.index++
            }
            this.tokens.push({
                index: a,
                text: this.text.slice(a, this.index),
                identifier: !0
            })
        },
        readString: function(a) {
            var b = this.index;
            this.index++;
            for (var c = "", d = a, e = !1; this.index < this.text.length;) {
                var f = this.text.charAt(this.index);
                if (d += f, e) {
                    if ("u" === f) {
                        var g = this.text.substring(this.index + 1, this.index + 5);
                        g.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + g + "]"), this.index += 4, c += String.fromCharCode(parseInt(g, 16))
                    } else {
                        var h = lf[f];
                        c += h || f
                    }
                    e = !1
                } else if ("\\" === f) e = !0;
                else {
                    if (f === a) return this.index++, void this.tokens.push({
                        index: b,
                        text: d,
                        constant: !0,
                        value: c
                    });
                    c += f
                }
                this.index++
            }
            this.throwError("Unterminated quote", b)
        }
    };
    var nf = function(a, b, c) {
        this.lexer = a, this.$filter = b, this.options = c
    };
    nf.ZERO = l(function() {
        return 0
    }, {
        sharedGetter: !0,
        constant: !0
    }), nf.prototype = {
        constructor: nf,
        parse: function(a) {
            this.text = a, this.tokens = this.lexer.lex(a);
            var b = this.statements();
            return 0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]), b.literal = !!b.literal, b.constant = !!b.constant, b
        },
        primary: function() {
            var a;
            this.expect("(") ? (a = this.filterChain(), this.consume(")")) : this.expect("[") ? a = this.arrayDeclaration() : this.expect("{") ? a = this.object() : this.peek().identifier && this.peek().text in jf ? a = jf[this.consume().text] : this.peek().identifier ? a = this.identifier() : this.peek().constant ? a = this.constant() : this.throwError("not a primary expression", this.peek());
            for (var b, c; b = this.expect("(", "[", ".");) "(" === b.text ? (a = this.functionCall(a, c), c = null) : "[" === b.text ? (c = a, a = this.objectIndex(a)) : "." === b.text ? (c = a, a = this.fieldAccess(a)) : this.throwError("IMPOSSIBLE");
            return a
        },
        throwError: function(a, b) {
            throw ef("syntax", "Syntax Error: Token '{0}' {1} at column {2} of the expression [{3}] starting at [{4}].", b.text, a, b.index + 1, this.text, this.text.substring(b.index))
        },
        peekToken: function() {
            if (0 === this.tokens.length) throw ef("ueoe", "Unexpected end of expression: {0}", this.text);
            return this.tokens[0]
        },
        peek: function(a, b, c, d) {
            return this.peekAhead(0, a, b, c, d)
        },
        peekAhead: function(a, b, c, d, e) {
            if (this.tokens.length > a) {
                var f = this.tokens[a],
                    g = f.text;
                if (g === b || g === c || g === d || g === e || !b && !c && !d && !e) return f
            }
            return !1
        },
        expect: function(a, b, c, d) {
            var e = this.peek(a, b, c, d);
            return e ? (this.tokens.shift(), e) : !1
        },
        consume: function(a) {
            if (0 === this.tokens.length) throw ef("ueoe", "Unexpected end of expression: {0}", this.text);
            var b = this.expect(a);
            return b || this.throwError("is unexpected, expecting [" + a + "]", this.peek()), b
        },
        unaryFn: function(a, b) {
            var c = kf[a];
            return l(function(a, d) {
                return c(a, d, b)
            }, {
                constant: b.constant,
                inputs: [b]
            })
        },
        binaryFn: function(a, b, c, d) {
            var e = kf[b];
            return l(function(b, d) {
                return e(b, d, a, c)
            }, {
                constant: a.constant && c.constant,
                inputs: !d && [a, c]
            })
        },
        identifier: function() {
            for (var a = this.consume().text; this.peek(".") && this.peekAhead(1).identifier && !this.peekAhead(2, "(");) a += this.consume().text + this.consume().text;
            return Oc(a, this.options, this.text)
        },
        constant: function() {
            var a = this.consume().value;
            return l(function() {
                return a
            }, {
                constant: !0,
                literal: !0
            })
        },
        statements: function() {
            for (var a = [];;)
                if (this.tokens.length > 0 && !this.peek("}", ")", ";", "]") && a.push(this.filterChain()), !this.expect(";")) return 1 === a.length ? a[0] : function(b, c) {
                    for (var d, e = 0, f = a.length; f > e; e++) d = a[e](b, c);
                    return d
                }
        },
        filterChain: function() {
            for (var a, b = this.expression(); a = this.expect("|");) b = this.filter(b);
            return b
        },
        filter: function(a) {
            var b, d, e = this.$filter(this.consume().text);
            if (this.peek(":"))
                for (b = [], d = []; this.expect(":");) b.push(this.expression());
            var f = [a].concat(b || []);
            return l(function(f, g) {
                var h = a(f, g);
                if (d) {
                    d[0] = h;
                    for (var i = b.length; i--;) d[i + 1] = b[i](f, g);
                    return e.apply(c, d)
                }
                return e(h)
            }, {
                constant: !e.$stateful && f.every(Jc),
                inputs: !e.$stateful && f
            })
        },
        expression: function() {
            return this.assignment()
        },
        assignment: function() {
            var a, b, c = this.ternary();
            return (b = this.expect("=")) ? (c.assign || this.throwError("implies assignment but [" + this.text.substring(0, b.index) + "] can not be assigned to", b), a = this.ternary(), l(function(b, d) {
                return c.assign(b, a(b, d), d)
            }, {
                inputs: [c, a]
            })) : c
        },
        ternary: function() {
            var a, b, c = this.logicalOR();
            if ((b = this.expect("?")) && (a = this.assignment(), this.consume(":"))) {
                var d = this.assignment();
                return l(function(b, e) {
                    return c(b, e) ? a(b, e) : d(b, e)
                }, {
                    constant: c.constant && a.constant && d.constant
                })
            }
            return c
        },
        logicalOR: function() {
            for (var a, b = this.logicalAND(); a = this.expect("||");) b = this.binaryFn(b, a.text, this.logicalAND(), !0);
            return b
        },
        logicalAND: function() {
            for (var a, b = this.equality(); a = this.expect("&&");) b = this.binaryFn(b, a.text, this.equality(), !0);
            return b
        },
        equality: function() {
            for (var a, b = this.relational(); a = this.expect("==", "!=", "===", "!==");) b = this.binaryFn(b, a.text, this.relational());
            return b
        },
        relational: function() {
            for (var a, b = this.additive(); a = this.expect("<", ">", "<=", ">=");) b = this.binaryFn(b, a.text, this.additive());
            return b
        },
        additive: function() {
            for (var a, b = this.multiplicative(); a = this.expect("+", "-");) b = this.binaryFn(b, a.text, this.multiplicative());
            return b
        },
        multiplicative: function() {
            for (var a, b = this.unary(); a = this.expect("*", "/", "%");) b = this.binaryFn(b, a.text, this.unary());
            return b
        },
        unary: function() {
            var a;
            return this.expect("+") ? this.primary() : (a = this.expect("-")) ? this.binaryFn(nf.ZERO, a.text, this.unary()) : (a = this.expect("!")) ? this.unaryFn(a.text, this.unary()) : this.primary()
        },
        fieldAccess: function(a) {
            var b = this.identifier();
            return l(function(d, e, f) {
                var g = f || a(d, e);
                return null == g ? c : b(g)
            }, {
                assign: function(c, d, e) {
                    var f = a(c, e);
                    return f || a.assign(c, f = {}, e), b.assign(f, d)
                }
            })
        },
        objectIndex: function(a) {
            var b = this.text,
                d = this.expression();
            return this.consume("]"), l(function(e, f) {
                var g, h = a(e, f),
                    i = d(e, f);
                return Gc(i, b), h ? g = Hc(h[i], b) : c
            }, {
                assign: function(c, e, f) {
                    var g = Gc(d(c, f), b),
                        h = Hc(a(c, f), b);
                    return h || a.assign(c, h = {}, f), h[g] = e
                }
            })
        },
        functionCall: function(a, b) {
            var d = [];
            if (")" !== this.peekToken().text)
                do d.push(this.expression()); while (this.expect(","));
            this.consume(")");
            var e = this.text,
                f = d.length ? [] : null;
            return function(g, h) {
                var i = b ? b(g, h) : s(b) ? c : g,
                    j = a(g, h, i) || o;
                if (f)
                    for (var k = d.length; k--;) f[k] = Hc(d[k](g, h), e);
                Hc(i, e), Ic(j, e);
                var l = j.apply ? j.apply(i, f) : j(f[0], f[1], f[2], f[3], f[4]);
                return Hc(l, e)
            }
        },
        arrayDeclaration: function() {
            var a = [];
            if ("]" !== this.peekToken().text)
                do {
                    if (this.peek("]")) break;
                    a.push(this.expression())
                } while (this.expect(","));
            return this.consume("]"), l(function(b, c) {
                for (var d = [], e = 0, f = a.length; f > e; e++) d.push(a[e](b, c));
                return d
            }, {
                literal: !0,
                constant: a.every(Jc),
                inputs: a
            })
        },
        object: function() {
            var a = [],
                b = [];
            if ("}" !== this.peekToken().text)
                do {
                    if (this.peek("}")) break;
                    var c = this.consume();
                    c.constant ? a.push(c.value) : c.identifier ? a.push(c.text) : this.throwError("invalid key", c), this.consume(":"), b.push(this.expression())
                } while (this.expect(","));
            return this.consume("}"), l(function(c, d) {
                for (var e = {}, f = 0, g = b.length; g > f; f++) e[a[f]] = b[f](c, d);
                return e
            }, {
                literal: !0,
                constant: b.every(Jc),
                inputs: b
            })
        }
    };
    var of = jb(),
        pf = jb(),
        qf = Object.prototype.valueOf,
        rf = d("$sce"),
        sf = {
            HTML: "html",
            CSS: "css",
            URL: "url",
            RESOURCE_URL: "resourceUrl",
            JS: "js"
        },
        Ue = d("$compile"),
        tf = b.createElement("a"),
        uf = dd(a.location.href);
    gd.$inject = ["$provide"], kd.$inject = ["$locale"], ld.$inject = ["$locale"];
    var vf = ".",
        wf = {
            yyyy: od("FullYear", 4),
            yy: od("FullYear", 2, 0, !0),
            y: od("FullYear", 1),
            MMMM: pd("Month"),
            MMM: pd("Month", !0),
            MM: od("Month", 2, 1),
            M: od("Month", 1, 1),
            dd: od("Date", 2),
            d: od("Date", 1),
            HH: od("Hours", 2),
            H: od("Hours", 1),
            hh: od("Hours", 2, -12),
            h: od("Hours", 1, -12),
            mm: od("Minutes", 2),
            m: od("Minutes", 1),
            ss: od("Seconds", 2),
            s: od("Seconds", 1),
            sss: od("Milliseconds", 3),
            EEEE: pd("Day"),
            EEE: pd("Day", !0),
            a: ud,
            Z: qd,
            ww: td(2),
            w: td(1)
        },
        xf = /((?:[^yMdHhmsaZEw']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|w+))(.*)/,
        yf = /^\-?\d+$/;
    vd.$inject = ["$locale"];
    var zf = q(Ud),
        Af = q(Wd);
    yd.$inject = ["$parse"];
    var Bf = q({
            restrict: "E",
            compile: function(a, b) {
                return b.href || b.xlinkHref || b.name ? void 0 : function(a, b) {
                    if ("a" === b[0].nodeName.toLowerCase()) {
                        var c = "[object SVGAnimatedString]" === ee.call(b.prop("href")) ? "xlink:href" : "href";
                        b.on("click", function(a) {
                            b.attr(c) || a.preventDefault()
                        })
                    }
                }
            }
        }),
        Cf = {};
    f(Ke, function(a, b) {
        if ("multiple" != a) {
            var c = $b("ng-" + b);
            Cf[c] = function() {
                return {
                    restrict: "A",
                    priority: 100,
                    link: function(a, d, e) {
                        a.$watch(e[c], function(a) {
                            e.$set(b, !!a)
                        })
                    }
                }
            }
        }
    }), f(Me, function(a, b) {
        Cf[b] = function() {
            return {
                priority: 100,
                link: function(a, c, d) {
                    if ("ngPattern" === b && "/" == d.ngPattern.charAt(0)) {
                        var e = d.ngPattern.match(Sd);
                        if (e) return void d.$set("ngPattern", new RegExp(e[1], e[2]))
                    }
                    a.$watch(d[b], function(a) {
                        d.$set(b, a)
                    })
                }
            }
        }
    }), f(["src", "srcset", "href"], function(a) {
        var b = $b("ng-" + a);
        Cf[b] = function() {
            return {
                priority: 99,
                link: function(c, d, e) {
                    var f = a,
                        g = a;
                    "href" === a && "[object SVGAnimatedString]" === ee.call(d.prop("href")) && (g = "xlinkHref", e.$attr[g] = "xlink:href", f = null), e.$observe(b, function(b) {
                        return b ? (e.$set(g, b), void(Zd && f && d.prop(f, e[g]))) : void("href" === a && e.$set(g, null))
                    })
                }
            }
        }
    });
    var Df = {
            $addControl: o,
            $$renameControl: Ad,
            $removeControl: o,
            $setValidity: o,
            $setDirty: o,
            $setPristine: o,
            $setSubmitted: o
        },
        Ef = "ng-submitted";
    Bd.$inject = ["$element", "$attrs", "$scope", "$animate", "$interpolate"];
    var Ff = function(a) {
            return ["$timeout", function(b) {
                var d = {
                    name: "form",
                    restrict: a ? "EAC" : "E",
                    controller: Bd,
                    compile: function(a) {
                        return a.addClass(lg).addClass(jg), {
                            pre: function(a, d, e, f) {
                                if (!("action" in e)) {
                                    var g = function(b) {
                                        a.$apply(function() {
                                            f.$commitViewValue(), f.$setSubmitted()
                                        }), b.preventDefault()
                                    };
                                    ye(d[0], "submit", g), d.on("$destroy", function() {
                                        b(function() {
                                            ze(d[0], "submit", g)
                                        }, 0, !1)
                                    })
                                }
                                var h = f.$$parentForm,
                                    i = f.$name;
                                i && (Kc(a, null, i, f, i), e.$observe(e.name ? "name" : "ngForm", function(b) {
                                    i !== b && (Kc(a, null, i, c, i), i = b, Kc(a, null, i, f, i), h.$$renameControl(f, i))
                                })), d.on("$destroy", function() {
                                    h.$removeControl(f), i && Kc(a, null, i, c, i), l(f, Df)
                                })
                            }
                        }
                    }
                };
                return d
            }]
        },
        Gf = Ff(),
        Hf = Ff(!0),
        If = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,
        Jf = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
        Kf = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
        Lf = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,
        Mf = /^(\d{4})-(\d{2})-(\d{2})$/,
        Nf = /^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,
        Of = /^(\d{4})-W(\d\d)$/,
        Pf = /^(\d{4})-(\d\d)$/,
        Qf = /^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/,
        Rf = {
            text: Dd,
            date: Hd("date", Mf, Gd(Mf, ["yyyy", "MM", "dd"]), "yyyy-MM-dd"),
            "datetime-local": Hd("datetimelocal", Nf, Gd(Nf, ["yyyy", "MM", "dd", "HH", "mm", "ss", "sss"]), "yyyy-MM-ddTHH:mm:ss.sss"),
            time: Hd("time", Qf, Gd(Qf, ["HH", "mm", "ss", "sss"]), "HH:mm:ss.sss"),
            week: Hd("week", Of, Fd, "yyyy-Www"),
            month: Hd("month", Pf, Gd(Pf, ["yyyy", "MM"]), "yyyy-MM"),
            number: Jd,
            url: Kd,
            email: Ld,
            radio: Md,
            checkbox: Od,
            hidden: o,
            button: o,
            submit: o,
            reset: o,
            file: o
        },
        Sf = ["$browser", "$sniffer", "$filter", "$parse", function(a, b, c, d) {
            return {
                restrict: "E",
                require: ["?ngModel"],
                link: {
                    pre: function(e, f, g, h) {
                        h[0] && (Rf[Ud(g.type)] || Rf.text)(e, f, g, h[0], b, a, c, d)
                    }
                }
            }
        }],
        Tf = /^(true|false|\d+)$/,
        Uf = function() {
            return {
                restrict: "A",
                priority: 100,
                compile: function(a, b) {
                    return Tf.test(b.ngValue) ? function(a, b, c) {
                        c.$set("value", a.$eval(c.ngValue))
                    } : function(a, b, c) {
                        a.$watch(c.ngValue, function(a) {
                            c.$set("value", a)
                        })
                    }
                }
            }
        },
        Vf = ["$compile", function(a) {
            return {
                restrict: "AC",
                compile: function(b) {
                    return a.$$addBindingClass(b),
                        function(b, d, e) {
                            a.$$addBindingInfo(d, e.ngBind), d = d[0], b.$watch(e.ngBind, function(a) {
                                d.textContent = a === c ? "" : a
                            })
                        }
                }
            }
        }],
        Wf = ["$interpolate", "$compile", function(a, b) {
            return {
                compile: function(d) {
                    return b.$$addBindingClass(d),
                        function(d, e, f) {
                            var g = a(e.attr(f.$attr.ngBindTemplate));
                            b.$$addBindingInfo(e, g.expressions), e = e[0], f.$observe("ngBindTemplate", function(a) {
                                e.textContent = a === c ? "" : a
                            })
                        }
                }
            }
        }],
        Xf = ["$sce", "$parse", "$compile", function(a, b, c) {
            return {
                restrict: "A",
                compile: function(d, e) {
                    var f = b(e.ngBindHtml),
                        g = b(e.ngBindHtml, function(a) {
                            return (a || "").toString()
                        });
                    return c.$$addBindingClass(d),
                        function(b, d, e) {
                            c.$$addBindingInfo(d, e.ngBindHtml), b.$watch(g, function() {
                                d.html(a.getTrustedHtml(f(b)) || "")
                            })
                        }
                }
            }
        }],
        Yf = q({
            restrict: "A",
            require: "ngModel",
            link: function(a, b, c, d) {
                d.$viewChangeListeners.push(function() {
                    a.$eval(c.ngChange)
                })
            }
        }),
        Zf = Pd("", !0),
        $f = Pd("Odd", 0),
        _f = Pd("Even", 1),
        ag = zd({
            compile: function(a, b) {
                b.$set("ngCloak", c), a.removeClass("ng-cloak")
            }
        }),
        bg = [function() {
            return {
                restrict: "A",
                scope: !0,
                controller: "@",
                priority: 500
            }
        }],
        cg = {},
        dg = {
            blur: !0,
            focus: !0
        };
    f("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function(a) {
        var b = $b("ng-" + a);
        cg[b] = ["$parse", "$rootScope", function(c, d) {
            return {
                restrict: "A",
                compile: function(e, f) {
                    var g = c(f[b], null, !0);
                    return function(b, c) {
                        c.on(a, function(c) {
                            var e = function() {
                                g(b, {
                                    $event: c
                                })
                            };
                            dg[a] && d.$$phase ? b.$evalAsync(e) : b.$apply(e)
                        })
                    }
                }
            }
        }]
    });
    var eg = ["$animate", function(a) {
            return {
                multiElement: !0,
                transclude: "element",
                priority: 600,
                terminal: !0,
                restrict: "A",
                $$tlb: !0,
                link: function(c, d, e, f, g) {
                    var h, i, j;
                    c.$watch(e.ngIf, function(c) {
                        c ? i || g(function(c, f) {
                            i = f, c[c.length++] = b.createComment(" end ngIf: " + e.ngIf + " "), h = {
                                clone: c
                            }, a.enter(c, d.parent(), d)
                        }) : (j && (j.remove(), j = null), i && (i.$destroy(), i = null), h && (j = ib(h.clone), a.leave(j).then(function() {
                            j = null
                        }), h = null))
                    })
                }
            }
        }],
        fg = ["$templateRequest", "$anchorScroll", "$animate", "$sce", function(a, b, c, d) {
            return {
                restrict: "ECA",
                priority: 400,
                terminal: !0,
                transclude: "element",
                controller: ge.noop,
                compile: function(e, f) {
                    var g = f.ngInclude || f.src,
                        h = f.onload || "",
                        i = f.autoscroll;
                    return function(e, f, j, k, l) {
                        var m, n, o, p = 0,
                            q = function() {
                                n && (n.remove(), n = null), m && (m.$destroy(), m = null), o && (c.leave(o).then(function() {
                                    n = null
                                }), n = o, o = null)
                            };
                        e.$watch(d.parseAsResourceUrl(g), function(d) {
                            var g = function() {
                                    !s(i) || i && !e.$eval(i) || b()
                                },
                                j = ++p;
                            d ? (a(d, !0).then(function(a) {
                                if (j === p) {
                                    var b = e.$new();
                                    k.template = a;
                                    var i = l(b, function(a) {
                                        q(), c.enter(a, null, f).then(g)
                                    });
                                    m = b, o = i, m.$emit("$includeContentLoaded", d), e.$eval(h)
                                }
                            }, function() {
                                j === p && (q(), e.$emit("$includeContentError", d))
                            }), e.$emit("$includeContentRequested", d)) : (q(), k.template = null)
                        })
                    }
                }
            }
        }],
        gg = ["$compile", function(a) {
            return {
                restrict: "ECA",
                priority: -400,
                require: "ngInclude",
                link: function(c, d, e, f) {
                    return /SVG/.test(d[0].toString()) ? (d.empty(), void a(sb(f.template, b).childNodes)(c, function(a) {
                        d.append(a)
                    }, {
                        futureParentElement: d
                    })) : (d.html(f.template), void a(d.contents())(c))
                }
            }
        }],
        hg = zd({
            priority: 450,
            compile: function() {
                return {
                    pre: function(a, b, c) {
                        a.$eval(c.ngInit)
                    }
                }
            }
        }),
        ig = function() {
            return {
                restrict: "A",
                priority: 100,
                require: "ngModel",
                link: function(a, b, d, e) {
                    var g = b.attr(d.$attr.ngList) || ", ",
                        h = "false" !== d.ngTrim,
                        i = h ? ke(g) : g,
                        j = function(a) {
                            if (!r(a)) {
                                var b = [];
                                return a && f(a.split(i), function(a) {
                                    a && b.push(h ? ke(a) : a)
                                }), b
                            }
                        };
                    e.$parsers.push(j), e.$formatters.push(function(a) {
                        return je(a) ? a.join(g) : c
                    }), e.$isEmpty = function(a) {
                        return !a || !a.length
                    }
                }
            }
        },
        jg = "ng-valid",
        kg = "ng-invalid",
        lg = "ng-pristine",
        mg = "ng-dirty",
        ng = "ng-untouched",
        og = "ng-touched",
        pg = "ng-pending",
        qg = new d("ngModel"),
        rg = ["$scope", "$exceptionHandler", "$attrs", "$element", "$parse", "$animate", "$timeout", "$rootScope", "$q", "$interpolate", function(a, b, d, e, g, h, i, j, k, l) {
            this.$viewValue = Number.NaN, this.$modelValue = Number.NaN, this.$$rawModelValue = c, this.$validators = {}, this.$asyncValidators = {}, this.$parsers = [], this.$formatters = [], this.$viewChangeListeners = [], this.$untouched = !0, this.$touched = !1, this.$pristine = !0, this.$dirty = !1, this.$valid = !0, this.$invalid = !1, this.$error = {}, this.$$success = {}, this.$pending = c, this.$name = l(d.name || "", !1)(a);
            var m = g(d.ngModel),
                n = m.assign,
                p = m,
                q = n,
                t = null,
                u = this;
            this.$$setOptions = function(a) {
                if (u.$options = a, a && a.getterSetter) {
                    var b = g(d.ngModel + "()"),
                        c = g(d.ngModel + "($$$p)");
                    p = function(a) {
                        var c = m(a);
                        return x(c) && (c = b(a)), c
                    }, q = function(a) {
                        x(m(a)) ? c(a, {
                            $$$p: u.$modelValue
                        }) : n(a, u.$modelValue)
                    }
                } else if (!m.assign) throw qg("nonassign", "Expression '{0}' is non-assignable. Element: {1}", d.ngModel, T(e))
            }, this.$render = o, this.$isEmpty = function(a) {
                return r(a) || "" === a || null === a || a !== a
            };
            var w = e.inheritedData("$formController") || Df,
                y = 0;
            Qd({
                ctrl: this,
                $element: e,
                set: function(a, b) {
                    a[b] = !0
                },
                unset: function(a, b) {
                    delete a[b]
                },
                parentForm: w,
                $animate: h
            }), this.$setPristine = function() {
                u.$dirty = !1, u.$pristine = !0, h.removeClass(e, mg), h.addClass(e, lg)
            }, this.$setDirty = function() {
                u.$dirty = !0, u.$pristine = !1, h.removeClass(e, lg), h.addClass(e, mg), w.$setDirty()
            }, this.$setUntouched = function() {
                u.$touched = !1, u.$untouched = !0, h.setClass(e, ng, og)
            }, this.$setTouched = function() {
                u.$touched = !0, u.$untouched = !1, h.setClass(e, og, ng)
            }, this.$rollbackViewValue = function() {
                i.cancel(t), u.$viewValue = u.$$lastCommittedViewValue, u.$render()
            }, this.$validate = function() {
                if (!v(u.$modelValue) || !isNaN(u.$modelValue)) {
                    var a = u.$$lastCommittedViewValue,
                        b = u.$$rawModelValue,
                        d = u.$$parserName || "parse",
                        e = u.$error[d] ? !1 : c,
                        f = u.$valid,
                        g = u.$modelValue,
                        h = u.$options && u.$options.allowInvalid;
                    u.$$runValidators(e, b, a, function(a) {
                        h || f === a || (u.$modelValue = a ? b : c, u.$modelValue !== g && u.$$writeModelToScope())
                    })
                }
            }, this.$$runValidators = function(a, b, d, e) {
                function g(a) {
                    var b = u.$$parserName || "parse";
                    if (a === c) j(b, null);
                    else if (j(b, a), !a) return f(u.$validators, function(a, b) {
                        j(b, null)
                    }), f(u.$asyncValidators, function(a, b) {
                        j(b, null)
                    }), !1;
                    return !0
                }

                function h() {
                    var a = !0;
                    return f(u.$validators, function(c, e) {
                        var f = c(b, d);
                        a = a && f, j(e, f)
                    }), a ? !0 : (f(u.$asyncValidators, function(a, b) {
                        j(b, null)
                    }), !1)
                }

                function i() {
                    var a = [],
                        e = !0;
                    f(u.$asyncValidators, function(f, g) {
                        var h = f(b, d);
                        if (!F(h)) throw qg("$asyncValidators", "Expected asynchronous validator to return a promise but got '{0}' instead.", h);
                        j(g, c), a.push(h.then(function() {
                            j(g, !0)
                        }, function() {
                            e = !1, j(g, !1)
                        }))
                    }), a.length ? k.all(a).then(function() {
                        l(e)
                    }, o) : l(!0)
                }

                function j(a, b) {
                    m === y && u.$setValidity(a, b)
                }

                function l(a) {
                    m === y && e(a)
                }
                y++;
                var m = y;
                return g(a) && h() ? void i() : void l(!1)
            }, this.$commitViewValue = function() {
                var a = u.$viewValue;
                i.cancel(t), (u.$$lastCommittedViewValue !== a || "" === a && u.$$hasNativeValidators) && (u.$$lastCommittedViewValue = a, u.$pristine && this.$setDirty(), this.$$parseAndValidate())
            }, this.$$parseAndValidate = function() {
                function b() {
                    u.$modelValue !== h && u.$$writeModelToScope()
                }
                var d = u.$$lastCommittedViewValue,
                    e = d,
                    f = r(e) ? c : !0;
                if (f)
                    for (var g = 0; g < u.$parsers.length; g++)
                        if (e = u.$parsers[g](e), r(e)) {
                            f = !1;
                            break
                        }
                v(u.$modelValue) && isNaN(u.$modelValue) && (u.$modelValue = p(a));
                var h = u.$modelValue,
                    i = u.$options && u.$options.allowInvalid;
                u.$$rawModelValue = e, i && (u.$modelValue = e, b()), u.$$runValidators(f, e, u.$$lastCommittedViewValue, function(a) {
                    i || (u.$modelValue = a ? e : c, b())
                })
            }, this.$$writeModelToScope = function() {
                q(a, u.$modelValue), f(u.$viewChangeListeners, function(a) {
                    try {
                        a()
                    } catch (c) {
                        b(c)
                    }
                })
            }, this.$setViewValue = function(a, b) {
                u.$viewValue = a, (!u.$options || u.$options.updateOnDefault) && u.$$debounceViewValueCommit(b)
            }, this.$$debounceViewValueCommit = function(b) {
                var c, d = 0,
                    e = u.$options;
                e && s(e.debounce) && (c = e.debounce, v(c) ? d = c : v(c[b]) ? d = c[b] : v(c["default"]) && (d = c["default"])), i.cancel(t), d ? t = i(function() {
                    u.$commitViewValue()
                }, d) : j.$$phase ? u.$commitViewValue() : a.$apply(function() {
                    u.$commitViewValue()
                })
            }, a.$watch(function() {
                var b = p(a);
                if (b !== u.$modelValue) {
                    u.$modelValue = u.$$rawModelValue = b;
                    for (var d = u.$formatters, e = d.length, f = b; e--;) f = d[e](f);
                    u.$viewValue !== f && (u.$viewValue = u.$$lastCommittedViewValue = f, u.$render(), u.$$runValidators(c, b, f, o))
                }
                return b
            })
        }],
        sg = ["$rootScope", function(a) {
            return {
                restrict: "A",
                require: ["ngModel", "^?form", "^?ngModelOptions"],
                controller: rg,
                priority: 1,
                compile: function(b) {
                    return b.addClass(lg).addClass(ng).addClass(jg), {
                        pre: function(a, b, c, d) {
                            var e = d[0],
                                f = d[1] || Df;
                            e.$$setOptions(d[2] && d[2].$options), f.$addControl(e), c.$observe("name", function(a) {
                                e.$name !== a && f.$$renameControl(e, a)
                            }), a.$on("$destroy", function() {
                                f.$removeControl(e)
                            })
                        },
                        post: function(b, c, d, e) {
                            var f = e[0];
                            f.$options && f.$options.updateOn && c.on(f.$options.updateOn, function(a) {
                                f.$$debounceViewValueCommit(a && a.type)
                            }), c.on("blur", function() {
                                f.$touched || (a.$$phase ? b.$evalAsync(f.$setTouched) : b.$apply(f.$setTouched))
                            })
                        }
                    }
                }
            }
        }],
        tg = /(\s+|^)default(\s+|$)/,
        ug = function() {
            return {
                restrict: "A",
                controller: ["$scope", "$attrs", function(a, b) {
                    var d = this;
                    this.$options = a.$eval(b.ngModelOptions), this.$options.updateOn !== c ? (this.$options.updateOnDefault = !1, this.$options.updateOn = ke(this.$options.updateOn.replace(tg, function() {
                        return d.$options.updateOnDefault = !0, " "
                    }))) : this.$options.updateOnDefault = !0
                }]
            }
        },
        vg = zd({
            terminal: !0,
            priority: 1e3
        }),
        wg = ["$locale", "$interpolate", function(a, b) {
            var c = /{}/g,
                d = /^when(Minus)?(.+)$/;
            return {
                restrict: "EA",
                link: function(e, g, h) {
                    function i(a) {
                        g.text(a || "")
                    }
                    var j, k = h.count,
                        l = h.$attr.when && g.attr(h.$attr.when),
                        m = h.offset || 0,
                        n = e.$eval(l) || {},
                        o = {},
                        p = b.startSymbol(),
                        q = b.endSymbol(),
                        r = p + k + "-" + m + q,
                        s = ge.noop;
                    f(h, function(a, b) {
                        var c = d.exec(b);
                        if (c) {
                            var e = (c[1] ? "-" : "") + Ud(c[2]);
                            n[e] = g.attr(h.$attr[b])
                        }
                    }), f(n, function(a, d) {
                        o[d] = b(a.replace(c, r))
                    }), e.$watch(k, function(b) {
                        var c = parseFloat(b),
                            d = isNaN(c);
                        d || c in n || (c = a.pluralCat(c - m)), c === j || d && isNaN(j) || (s(), s = e.$watch(o[c], i), j = c)
                    })
                }
            }
        }],
        xg = ["$parse", "$animate", function(a, g) {
            var h = "$$NG_REMOVED",
                i = d("ngRepeat"),
                j = function(a, b, c, d, e, f, g) {
                    a[c] = d, e && (a[e] = f), a.$index = b, a.$first = 0 === b, a.$last = b === g - 1, a.$middle = !(a.$first || a.$last), a.$odd = !(a.$even = 0 === (1 & b))
                },
                k = function(a) {
                    return a.clone[0]
                },
                l = function(a) {
                    return a.clone[a.clone.length - 1]
                };
            return {
                restrict: "A",
                multiElement: !0,
                transclude: "element",
                priority: 1e3,
                terminal: !0,
                $$tlb: !0,
                compile: function(d, m) {
                    var n = m.ngRepeat,
                        o = b.createComment(" end ngRepeat: " + n + " "),
                        p = n.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
                    if (!p) throw i("iexp", "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.", n);
                    var q = p[1],
                        r = p[2],
                        s = p[3],
                        t = p[4];
                    if (p = q.match(/^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/), !p) throw i("iidexp", "'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.", q);
                    var u = p[3] || p[1],
                        v = p[2];
                    if (s && (!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(s) || /^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(s))) throw i("badident", "alias '{0}' is invalid --- must be a valid JS identifier which is not a reserved name.", s);
                    var w, x, y, z, A = {
                        $id: Ob
                    };
                    return t ? w = a(t) : (y = function(a, b) {
                            return Ob(b)
                        }, z = function(a) {
                            return a
                        }),
                        function(a, b, d, m, p) {
                            w && (x = function(b, c, d) {
                                return v && (A[v] = b), A[u] = c, A.$index = d, w(a, A)
                            });
                            var q = jb();
                            a.$watchCollection(r, function(d) {
                                var m, r, t, w, A, B, C, D, E, F, G, H, I = b[0],
                                    J = jb();
                                if (s && (a[s] = d), e(d)) E = d, D = x || y;
                                else {
                                    D = x || z, E = [];
                                    for (var K in d) d.hasOwnProperty(K) && "$" != K.charAt(0) && E.push(K);
                                    E.sort()
                                }
                                for (w = E.length, G = new Array(w), m = 0; w > m; m++)
                                    if (A = d === E ? m : E[m], B = d[A], C = D(A, B, m), q[C]) F = q[C], delete q[C], J[C] = F, G[m] = F;
                                    else {
                                        if (J[C]) throw f(G, function(a) {
                                            a && a.scope && (q[a.id] = a)
                                        }), i("dupes", "Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys. Repeater: {0}, Duplicate key: {1}, Duplicate value: {2}", n, C, B);
                                        G[m] = {
                                            id: C,
                                            scope: c,
                                            clone: c
                                        }, J[C] = !0
                                    }
                                for (var L in q) {
                                    if (F = q[L], H = ib(F.clone), g.leave(H), H[0].parentNode)
                                        for (m = 0, r = H.length; r > m; m++) H[m][h] = !0;
                                    F.scope.$destroy()
                                }
                                for (m = 0; w > m; m++)
                                    if (A = d === E ? m : E[m], B = d[A], F = G[m], F.scope) {
                                        t = I;
                                        do t = t.nextSibling; while (t && t[h]);
                                        k(F) != t && g.move(ib(F.clone), null, $d(I)), I = l(F), j(F.scope, m, u, B, v, A, w)
                                    } else p(function(a, b) {
                                        F.scope = b;
                                        var c = o.cloneNode(!1);
                                        a[a.length++] = c, g.enter(a, null, $d(I)), I = c, F.clone = a, J[F.id] = F, j(F.scope, m, u, B, v, A, w)
                                    });
                                q = J
                            })
                        }
                }
            }
        }],
        yg = "ng-hide",
        zg = "ng-hide-animate",
        Ag = ["$animate", function(a) {
            return {
                restrict: "A",
                multiElement: !0,
                link: function(b, c, d) {
                    b.$watch(d.ngShow, function(b) {
                        a[b ? "removeClass" : "addClass"](c, yg, {
                            tempClasses: zg
                        })
                    })
                }
            }
        }],
        Bg = ["$animate", function(a) {
            return {
                restrict: "A",
                multiElement: !0,
                link: function(b, c, d) {
                    b.$watch(d.ngHide, function(b) {
                        a[b ? "addClass" : "removeClass"](c, yg, {
                            tempClasses: zg
                        })
                    })
                }
            }
        }],
        Cg = zd(function(a, b, c) {
            a.$watchCollection(c.ngStyle, function(a, c) {
                c && a !== c && f(c, function(a, c) {
                    b.css(c, "")
                }), a && b.css(a)
            })
        }),
        Dg = ["$animate", function(a) {
            return {
                restrict: "EA",
                require: "ngSwitch",
                controller: ["$scope", function() {
                    this.cases = {}
                }],
                link: function(c, d, e, g) {
                    var h = e.ngSwitch || e.on,
                        i = [],
                        j = [],
                        k = [],
                        l = [],
                        m = function(a, b) {
                            return function() {
                                a.splice(b, 1)
                            }
                        };
                    c.$watch(h, function(c) {
                        var d, e;
                        for (d = 0, e = k.length; e > d; ++d) a.cancel(k[d]);
                        for (k.length = 0, d = 0, e = l.length; e > d; ++d) {
                            var h = ib(j[d].clone);
                            l[d].$destroy();
                            var n = k[d] = a.leave(h);
                            n.then(m(k, d))
                        }
                        j.length = 0, l.length = 0, (i = g.cases["!" + c] || g.cases["?"]) && f(i, function(c) {
                            c.transclude(function(d, e) {
                                l.push(e);
                                var f = c.element;
                                d[d.length++] = b.createComment(" end ngSwitchWhen: ");
                                var g = {
                                    clone: d
                                };
                                j.push(g), a.enter(d, f.parent(), f)
                            })
                        })
                    })
                }
            }
        }],
        Eg = zd({
            transclude: "element",
            priority: 1200,
            require: "^ngSwitch",
            multiElement: !0,
            link: function(a, b, c, d, e) {
                d.cases["!" + c.ngSwitchWhen] = d.cases["!" + c.ngSwitchWhen] || [], d.cases["!" + c.ngSwitchWhen].push({
                    transclude: e,
                    element: b
                })
            }
        }),
        Fg = zd({
            transclude: "element",
            priority: 1200,
            require: "^ngSwitch",
            multiElement: !0,
            link: function(a, b, c, d, e) {
                d.cases["?"] = d.cases["?"] || [], d.cases["?"].push({
                    transclude: e,
                    element: b
                })
            }
        }),
        Gg = zd({
            restrict: "EAC",
            link: function(a, b, c, e, f) {
                if (!f) throw d("ngTransclude")("orphan", "Illegal use of ngTransclude directive in the template! No parent directive that requires a transclusion found. Element: {0}", T(b));
                f(function(a) {
                    b.empty(), b.append(a)
                })
            }
        }),
        Hg = ["$templateCache", function(a) {
            return {
                restrict: "E",
                terminal: !0,
                compile: function(b, c) {
                    if ("text/ng-template" == c.type) {
                        var d = c.id,
                            e = b[0].text;
                        a.put(d, e)
                    }
                }
            }
        }],
        Ig = d("ngOptions"),
        Jg = q({
            restrict: "A",
            terminal: !0
        }),
        Kg = ["$compile", "$parse", function(a, d) {
            var e = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
                h = {
                    $setViewValue: o
                };
            return {
                restrict: "E",
                require: ["select", "?ngModel"],
                controller: ["$element", "$scope", "$attrs", function(a, b, c) {
                    var d, e, f = this,
                        g = {},
                        i = h;
                    f.databound = c.ngModel, f.init = function(a, b, c) {
                        i = a, d = b, e = c
                    }, f.addOption = function(b, c) {
                        gb(b, '"option value"'), g[b] = !0, i.$viewValue == b && (a.val(b), e.parent() && e.remove()), c && c[0].hasAttribute("selected") && (c[0].selected = !0)
                    }, f.removeOption = function(a) {
                        this.hasOption(a) && (delete g[a], i.$viewValue === a && this.renderUnknownOption(a))
                    }, f.renderUnknownOption = function(b) {
                        var c = "? " + Ob(b) + " ?";
                        e.val(c), a.prepend(e), a.val(c), e.prop("selected", !0)
                    }, f.hasOption = function(a) {
                        return g.hasOwnProperty(a)
                    }, b.$on("$destroy", function() {
                        f.renderUnknownOption = o
                    })
                }],
                link: function(h, i, j, k) {
                    function l(a, b, c, d) {
                        c.$render = function() {
                            var a = c.$viewValue;
                            d.hasOption(a) ? (z.parent() && z.remove(), b.val(a), "" === a && o.prop("selected", !0)) : r(a) && o ? b.val("") : d.renderUnknownOption(a)
                        }, b.on("change", function() {
                            a.$apply(function() {
                                z.parent() && z.remove(), c.$setViewValue(b.val())
                            })
                        })
                    }

                    function m(a, b, c) {
                        var d;
                        c.$render = function() {
                            var a = new Pb(c.$viewValue);
                            f(b.find("option"), function(b) {
                                b.selected = s(a.get(b.value))
                            })
                        }, a.$watch(function() {
                            M(d, c.$viewValue) || (d = L(c.$viewValue), c.$render())
                        }), b.on("change", function() {
                            a.$apply(function() {
                                var a = [];
                                f(b.find("option"), function(b) {
                                    b.selected && a.push(b.value)
                                }), c.$setViewValue(a)
                            })
                        })
                    }

                    function n(b, h, i) {
                        function j(a, c, d) {
                            return M[B] = d, E && (M[E] = c), a(b, M)
                        }

                        function k() {
                            b.$apply(function() {
                                var a, c = H(b) || [];
                                if (t) a = [], f(h.val(), function(b) {
                                    b = J ? K[b] : b, a.push(l(b, c[b]))
                                });
                                else {
                                    var d = J ? K[h.val()] : h.val();
                                    a = l(d, c[d])
                                }
                                i.$setViewValue(a), r()
                            })
                        }

                        function l(a, b) {
                            if ("?" === a) return c;
                            if ("" === a) return null;
                            var d = D ? D : G;
                            return j(d, a, b)
                        }

                        function m() {
                            var a, c = H(b);
                            if (c && je(c)) {
                                a = new Array(c.length);
                                for (var d = 0, e = c.length; e > d; d++) a[d] = j(A, d, c[d]);
                                return a
                            }
                            if (c) {
                                a = {};
                                for (var f in c) c.hasOwnProperty(f) && (a[f] = j(A, f, c[f]))
                            }
                            return a
                        }

                        function n(a) {
                            var b;
                            if (t)
                                if (J && je(a)) {
                                    b = new Pb([]);
                                    for (var c = 0; c < a.length; c++) b.put(j(J, null, a[c]), !0)
                                } else b = new Pb(a);
                            else J && (a = j(J, null, a));
                            return function(c, d) {
                                var e;
                                return e = J ? J : D ? D : G, t ? s(b.remove(j(e, c, d))) : a === j(e, c, d)
                            }
                        }

                        function o() {
                            w || (b.$$postDigest(r), w = !0)
                        }

                        function q(a, b, c) {
                            a[b] = a[b] || 0, a[b] += c ? 1 : -1
                        }

                        function r() {
                            w = !1;
                            var a, c, d, e, k, l, m, o, r, u, z, B, C, D, G, I, N, O = {
                                    "": []
                                },
                                P = [""],
                                Q = i.$viewValue,
                                R = H(b) || [],
                                S = E ? g(R) : R,
                                T = {},
                                U = n(Q),
                                V = !1;
                            for (K = {}, B = 0; u = S.length, u > B; B++) m = B, E && (m = S[B], "$" === m.charAt(0)) || (o = R[m], a = j(F, m, o) || "", (c = O[a]) || (c = O[a] = [], P.push(a)), C = U(m, o), V = V || C, I = j(A, m, o), I = s(I) ? I : "", N = J ? J(b, M) : E ? S[B] : B, J && (K[N] = m), c.push({
                                id: N,
                                label: I,
                                selected: C
                            }));
                            for (t || (v || null === Q ? O[""].unshift({
                                    id: "",
                                    label: "",
                                    selected: !V
                                }) : V || O[""].unshift({
                                    id: "?",
                                    label: "",
                                    selected: !0
                                })), z = 0, r = P.length; r > z; z++) {
                                for (a = P[z], c = O[a], L.length <= z ? (e = {
                                        element: y.clone().attr("label", a),
                                        label: c.label
                                    }, k = [e], L.push(k), h.append(e.element)) : (k = L[z], e = k[0], e.label != a && e.element.attr("label", e.label = a)), D = null, B = 0, u = c.length; u > B; B++) d = c[B], (l = k[B + 1]) ? (D = l.element, l.label !== d.label && (q(T, l.label, !1), q(T, d.label, !0), D.text(l.label = d.label), D.prop("label", l.label)), l.id !== d.id && D.val(l.id = d.id), D[0].selected !== d.selected && (D.prop("selected", l.selected = d.selected), Zd && D.prop("selected", l.selected))) : ("" === d.id && v ? G = v : (G = x.clone()).val(d.id).prop("selected", d.selected).attr("selected", d.selected).prop("label", d.label).text(d.label), k.push(l = {
                                    element: G,
                                    label: d.label,
                                    id: d.id,
                                    selected: d.selected
                                }), q(T, d.label, !0), D ? D.after(G) : e.element.append(G), D = G);
                                for (B++; k.length > B;) d = k.pop(), q(T, d.label, !1), d.element.remove()
                            }
                            for (; L.length > z;) {
                                for (c = L.pop(), B = 1; B < c.length; ++B) q(T, c[B].label, !1);
                                c[0].element.remove()
                            }
                            f(T, function(a, b) {
                                a > 0 ? p.addOption(b) : 0 > a && p.removeOption(b)
                            })
                        }
                        var z;
                        if (!(z = u.match(e))) throw Ig("iexp", "Expected expression in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_' but got '{0}'. Element: {1}", u, T(h));
                        var A = d(z[2] || z[1]),
                            B = z[4] || z[6],
                            C = / as /.test(z[0]) && z[1],
                            D = C ? d(C) : null,
                            E = z[5],
                            F = d(z[3] || ""),
                            G = d(z[2] ? z[1] : B),
                            H = d(z[7]),
                            I = z[8],
                            J = I ? d(z[8]) : null,
                            K = {},
                            L = [
                                [{
                                    element: h,
                                    label: ""
                                }]
                            ],
                            M = {};
                        v && (a(v)(b), v.removeClass("ng-scope"), v.remove()), h.empty(), h.on("change", k), i.$render = r, b.$watchCollection(H, o), b.$watchCollection(m, o), t && b.$watchCollection(function() {
                            return i.$modelValue
                        }, o)
                    }
                    if (k[1]) {
                        for (var o, p = k[0], q = k[1], t = j.multiple, u = j.ngOptions, v = !1, w = !1, x = $d(b.createElement("option")), y = $d(b.createElement("optgroup")), z = x.clone(), A = 0, B = i.children(), C = B.length; C > A; A++)
                            if ("" === B[A].value) {
                                o = v = B.eq(A);
                                break
                            }
                        p.init(q, v, z), t && (q.$isEmpty = function(a) {
                            return !a || 0 === a.length
                        }), u ? n(h, i, q) : t ? m(h, i, q) : l(h, i, q, p)
                    }
                }
            }
        }],
        Lg = ["$interpolate", function(a) {
            var b = {
                addOption: o,
                removeOption: o
            };
            return {
                restrict: "E",
                priority: 100,
                compile: function(c, d) {
                    if (r(d.value)) {
                        var e = a(c.text(), !0);
                        e || d.$set("value", c.text())
                    }
                    return function(a, c, d) {
                        var f = "$selectController",
                            g = c.parent(),
                            h = g.data(f) || g.parent().data(f);
                        h && h.databound || (h = b), e ? a.$watch(e, function(a, b) {
                            d.$set("value", a), b !== a && h.removeOption(b), h.addOption(a, c)
                        }) : h.addOption(d.value, c), c.on("$destroy", function() {
                            h.removeOption(d.value)
                        })
                    }
                }
            }
        }],
        Mg = q({
            restrict: "E",
            terminal: !1
        }),
        Ng = function() {
            return {
                restrict: "A",
                require: "?ngModel",
                link: function(a, b, c, d) {
                    d && (c.required = !0, d.$validators.required = function(a, b) {
                        return !c.required || !d.$isEmpty(b)
                    }, c.$observe("required", function() {
                        d.$validate()
                    }))
                }
            }
        },
        Og = function() {
            return {
                restrict: "A",
                require: "?ngModel",
                link: function(a, b, e, f) {
                    if (f) {
                        var g, h = e.ngPattern || e.pattern;
                        e.$observe("pattern", function(a) {
                            if (u(a) && a.length > 0 && (a = new RegExp("^" + a + "$")), a && !a.test) throw d("ngPattern")("noregexp", "Expected {0} to be a RegExp but was {1}. Element: {2}", h, a, T(b));
                            g = a || c, f.$validate()
                        }), f.$validators.pattern = function(a) {
                            return f.$isEmpty(a) || r(g) || g.test(a)
                        }
                    }
                }
            }
        },
        Pg = function() {
            return {
                restrict: "A",
                require: "?ngModel",
                link: function(a, b, c, d) {
                    if (d) {
                        var e = -1;
                        c.$observe("maxlength", function(a) {
                            var b = m(a);
                            e = isNaN(b) ? -1 : b, d.$validate()
                        }), d.$validators.maxlength = function(a, b) {
                            return 0 > e || d.$isEmpty(a) || b.length <= e
                        }
                    }
                }
            }
        },
        Qg = function() {
            return {
                restrict: "A",
                require: "?ngModel",
                link: function(a, b, c, d) {
                    if (d) {
                        var e = 0;
                        c.$observe("minlength", function(a) {
                            e = m(a) || 0, d.$validate()
                        }), d.$validators.minlength = function(a, b) {
                            return d.$isEmpty(b) || b.length >= e
                        }
                    }
                }
            }
        };
    return a.angular.bootstrap ? void console.log("WARNING: Tried to load angular more than once.") : (db(), nb(ge), void $d(b).ready(function() {
        $(b, _)
    }))
}(window, document), !window.angular.$$csp() && window.angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}</style>'),
    function() {
        function a(b, d) {
            function f(a) {
                if (f[a] !== q) return f[a];
                var b;
                if ("bug-string-char-index" == a) b = "a" != "a" [0];
                else if ("json" == a) b = f("json-stringify") && f("json-parse");
                else {
                    var c, e = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
                    if ("json-stringify" == a) {
                        var i = d.stringify,
                            k = "function" == typeof i && t;
                        if (k) {
                            (c = function() {
                                return 1
                            }).toJSON = c;
                            try {
                                k = "0" === i(0) && "0" === i(new g) && '""' == i(new h) && i(s) === q && i(q) === q && i() === q && "1" === i(c) && "[1]" == i([c]) && "[null]" == i([q]) && "null" == i(null) && "[null,null,null]" == i([q, s, null]) && i({
                                    a: [c, !0, !1, null, "\x00\b\n\f\r	"]
                                }) == e && "1" === i(null, c) && "[\n 1,\n 2\n]" == i([1, 2], null, 1) && '"-271821-04-20T00:00:00.000Z"' == i(new j(-864e13)) && '"+275760-09-13T00:00:00.000Z"' == i(new j(864e13)) && '"-000001-01-01T00:00:00.000Z"' == i(new j(-621987552e5)) && '"1969-12-31T23:59:59.999Z"' == i(new j(-1))
                            } catch (l) {
                                k = !1
                            }
                        }
                        b = k
                    }
                    if ("json-parse" == a) {
                        var m = d.parse;
                        if ("function" == typeof m) try {
                            if (0 === m("0") && !m(!1)) {
                                c = m(e);
                                var n = 5 == c.a.length && 1 === c.a[0];
                                if (n) {
                                    try {
                                        n = !m('"	"')
                                    } catch (l) {}
                                    if (n) try {
                                        n = 1 !== m("01")
                                    } catch (l) {}
                                    if (n) try {
                                        n = 1 !== m("1.")
                                    } catch (l) {}
                                }
                            }
                        } catch (l) {
                            n = !1
                        }
                        b = n
                    }
                }
                return f[a] = !!b
            }
            b || (b = e.Object()), d || (d = e.Object());
            var g = b.Number || e.Number,
                h = b.String || e.String,
                i = b.Object || e.Object,
                j = b.Date || e.Date,
                k = b.SyntaxError || e.SyntaxError,
                l = b.TypeError || e.TypeError,
                m = b.Math || e.Math,
                n = b.JSON || e.JSON;
            "object" == typeof n && n && (d.stringify = n.stringify, d.parse = n.parse);
            var o, p, q, r = i.prototype,
                s = r.toString,
                t = new j(-0xc782b5b800cec);
            try {
                t = -109252 == t.getUTCFullYear() && 0 === t.getUTCMonth() && 1 === t.getUTCDate() && 10 == t.getUTCHours() && 37 == t.getUTCMinutes() && 6 == t.getUTCSeconds() && 708 == t.getUTCMilliseconds()
            } catch (u) {}
            if (!f("json")) {
                var v = "[object Function]",
                    w = "[object Date]",
                    x = "[object Number]",
                    y = "[object String]",
                    z = "[object Array]",
                    A = "[object Boolean]",
                    B = f("bug-string-char-index");
                if (!t) var C = m.floor,
                    D = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
                    E = function(a, b) {
                        return D[b] + 365 * (a - 1970) + C((a - 1969 + (b = +(b > 1))) / 4) - C((a - 1901 + b) / 100) + C((a - 1601 + b) / 400)
                    };
                if ((o = r.hasOwnProperty) || (o = function(a) {
                        var b, c = {};
                        return (c.__proto__ = null, c.__proto__ = {
                            toString: 1
                        }, c).toString != s ? o = function(a) {
                            var b = this.__proto__,
                                c = a in (this.__proto__ = null, this);
                            return this.__proto__ = b, c
                        } : (b = c.constructor, o = function(a) {
                            var c = (this.constructor || b).prototype;
                            return a in this && !(a in c && this[a] === c[a])
                        }), c = null, o.call(this, a)
                    }), p = function(a, b) {
                        var d, e, f, g = 0;
                        (d = function() {
                            this.valueOf = 0
                        }).prototype.valueOf = 0, e = new d;
                        for (f in e) o.call(e, f) && g++;
                        return d = e = null, g ? p = 2 == g ? function(a, b) {
                            var c, d = {},
                                e = s.call(a) == v;
                            for (c in a) e && "prototype" == c || o.call(d, c) || !(d[c] = 1) || !o.call(a, c) || b(c)
                        } : function(a, b) {
                            var c, d, e = s.call(a) == v;
                            for (c in a) e && "prototype" == c || !o.call(a, c) || (d = "constructor" === c) || b(c);
                            (d || o.call(a, c = "constructor")) && b(c)
                        } : (e = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"], p = function(a, b) {
                            var d, f, g = s.call(a) == v,
                                h = !g && "function" != typeof a.constructor && c[typeof a.hasOwnProperty] && a.hasOwnProperty || o;
                            for (d in a) g && "prototype" == d || !h.call(a, d) || b(d);
                            for (f = e.length; d = e[--f]; h.call(a, d) && b(d));
                        }), p(a, b)
                    }, !f("json-stringify")) {
                    var F = {
                            92: "\\\\",
                            34: '\\"',
                            8: "\\b",
                            12: "\\f",
                            10: "\\n",
                            13: "\\r",
                            9: "\\t"
                        },
                        G = "000000",
                        H = function(a, b) {
                            return (G + (b || 0)).slice(-a)
                        },
                        I = "\\u00",
                        J = function(a) {
                            for (var b = '"', c = 0, d = a.length, e = !B || d > 10, f = e && (B ? a.split("") : a); d > c; c++) {
                                var g = a.charCodeAt(c);
                                switch (g) {
                                    case 8:
                                    case 9:
                                    case 10:
                                    case 12:
                                    case 13:
                                    case 34:
                                    case 92:
                                        b += F[g];
                                        break;
                                    default:
                                        if (32 > g) {
                                            b += I + H(2, g.toString(16));
                                            break
                                        }
                                        b += e ? f[c] : a.charAt(c)
                                }
                            }
                            return b + '"'
                        },
                        K = function(a, b, c, d, e, f, g) {
                            var h, i, j, k, m, n, r, t, u, v, B, D, F, G, I, L;
                            try {
                                h = b[a]
                            } catch (M) {}
                            if ("object" == typeof h && h)
                                if (i = s.call(h), i != w || o.call(h, "toJSON")) "function" == typeof h.toJSON && (i != x && i != y && i != z || o.call(h, "toJSON")) && (h = h.toJSON(a));
                                else if (h > -1 / 0 && 1 / 0 > h) {
                                if (E) {
                                    for (m = C(h / 864e5), j = C(m / 365.2425) + 1970 - 1; E(j + 1, 0) <= m; j++);
                                    for (k = C((m - E(j, 0)) / 30.42); E(j, k + 1) <= m; k++);
                                    m = 1 + m - E(j, k), n = (h % 864e5 + 864e5) % 864e5, r = C(n / 36e5) % 24, t = C(n / 6e4) % 60, u = C(n / 1e3) % 60, v = n % 1e3
                                } else j = h.getUTCFullYear(), k = h.getUTCMonth(), m = h.getUTCDate(), r = h.getUTCHours(), t = h.getUTCMinutes(), u = h.getUTCSeconds(), v = h.getUTCMilliseconds();
                                h = (0 >= j || j >= 1e4 ? (0 > j ? "-" : "+") + H(6, 0 > j ? -j : j) : H(4, j)) + "-" + H(2, k + 1) + "-" + H(2, m) + "T" + H(2, r) + ":" + H(2, t) + ":" + H(2, u) + "." + H(3, v) + "Z"
                            } else h = null;
                            if (c && (h = c.call(b, a, h)), null === h) return "null";
                            if (i = s.call(h), i == A) return "" + h;
                            if (i == x) return h > -1 / 0 && 1 / 0 > h ? "" + h : "null";
                            if (i == y) return J("" + h);
                            if ("object" == typeof h) {
                                for (G = g.length; G--;)
                                    if (g[G] === h) throw l();
                                if (g.push(h), B = [], I = f, f += e, i == z) {
                                    for (F = 0, G = h.length; G > F; F++) D = K(F, h, c, d, e, f, g), B.push(D === q ? "null" : D);
                                    L = B.length ? e ? "[\n" + f + B.join(",\n" + f) + "\n" + I + "]" : "[" + B.join(",") + "]" : "[]"
                                } else p(d || h, function(a) {
                                    var b = K(a, h, c, d, e, f, g);
                                    b !== q && B.push(J(a) + ":" + (e ? " " : "") + b)
                                }), L = B.length ? e ? "{\n" + f + B.join(",\n" + f) + "\n" + I + "}" : "{" + B.join(",") + "}" : "{}";
                                return g.pop(), L
                            }
                        };
                    d.stringify = function(a, b, d) {
                        var e, f, g, h;
                        if (c[typeof b] && b)
                            if ((h = s.call(b)) == v) f = b;
                            else if (h == z) {
                            g = {};
                            for (var i, j = 0, k = b.length; k > j; i = b[j++], h = s.call(i), (h == y || h == x) && (g[i] = 1));
                        }
                        if (d)
                            if ((h = s.call(d)) == x) {
                                if ((d -= d % 1) > 0)
                                    for (e = "", d > 10 && (d = 10); e.length < d; e += " ");
                            } else h == y && (e = d.length <= 10 ? d : d.slice(0, 10));
                        return K("", (i = {}, i[""] = a, i), f, g, e, "", [])
                    }
                }
                if (!f("json-parse")) {
                    var L, M, N = h.fromCharCode,
                        O = {
                            92: "\\",
                            34: '"',
                            47: "/",
                            98: "\b",
                            116: "	",
                            110: "\n",
                            102: "\f",
                            114: "\r"
                        },
                        P = function() {
                            throw L = M = null, k()
                        },
                        Q = function() {
                            for (var a, b, c, d, e, f = M, g = f.length; g > L;) switch (e = f.charCodeAt(L)) {
                                case 9:
                                case 10:
                                case 13:
                                case 32:
                                    L++;
                                    break;
                                case 123:
                                case 125:
                                case 91:
                                case 93:
                                case 58:
                                case 44:
                                    return a = B ? f.charAt(L) : f[L], L++, a;
                                case 34:
                                    for (a = "@", L++; g > L;)
                                        if (e = f.charCodeAt(L), 32 > e) P();
                                        else if (92 == e) switch (e = f.charCodeAt(++L)) {
                                        case 92:
                                        case 34:
                                        case 47:
                                        case 98:
                                        case 116:
                                        case 110:
                                        case 102:
                                        case 114:
                                            a += O[e], L++;
                                            break;
                                        case 117:
                                            for (b = ++L, c = L + 4; c > L; L++) e = f.charCodeAt(L), e >= 48 && 57 >= e || e >= 97 && 102 >= e || e >= 65 && 70 >= e || P();
                                            a += N("0x" + f.slice(b, L));
                                            break;
                                        default:
                                            P()
                                    } else {
                                        if (34 == e) break;
                                        for (e = f.charCodeAt(L), b = L; e >= 32 && 92 != e && 34 != e;) e = f.charCodeAt(++L);
                                        a += f.slice(b, L)
                                    }
                                    if (34 == f.charCodeAt(L)) return L++, a;
                                    P();
                                default:
                                    if (b = L, 45 == e && (d = !0, e = f.charCodeAt(++L)), e >= 48 && 57 >= e) {
                                        for (48 == e && (e = f.charCodeAt(L + 1), e >= 48 && 57 >= e) && P(), d = !1; g > L && (e = f.charCodeAt(L), e >= 48 && 57 >= e); L++);
                                        if (46 == f.charCodeAt(L)) {
                                            for (c = ++L; g > c && (e = f.charCodeAt(c), e >= 48 && 57 >= e); c++);
                                            c == L && P(), L = c
                                        }
                                        if (e = f.charCodeAt(L), 101 == e || 69 == e) {
                                            for (e = f.charCodeAt(++L), (43 == e || 45 == e) && L++, c = L; g > c && (e = f.charCodeAt(c), e >= 48 && 57 >= e); c++);
                                            c == L && P(), L = c
                                        }
                                        return +f.slice(b, L)
                                    }
                                    if (d && P(), "true" == f.slice(L, L + 4)) return L += 4, !0;
                                    if ("false" == f.slice(L, L + 5)) return L += 5, !1;
                                    if ("null" == f.slice(L, L + 4)) return L += 4, null;
                                    P()
                            }
                            return "$"
                        },
                        R = function(a) {
                            var b, c;
                            if ("$" == a && P(), "string" == typeof a) {
                                if ("@" == (B ? a.charAt(0) : a[0])) return a.slice(1);
                                if ("[" == a) {
                                    for (b = []; a = Q(), "]" != a; c || (c = !0)) c && ("," == a ? (a = Q(), "]" == a && P()) : P()), "," == a && P(), b.push(R(a));
                                    return b
                                }
                                if ("{" == a) {
                                    for (b = {}; a = Q(), "}" != a; c || (c = !0)) c && ("," == a ? (a = Q(), "}" == a && P()) : P()), ("," == a || "string" != typeof a || "@" != (B ? a.charAt(0) : a[0]) || ":" != Q()) && P(), b[a.slice(1)] = R(Q());
                                    return b
                                }
                                P()
                            }
                            return a
                        },
                        S = function(a, b, c) {
                            var d = T(a, b, c);
                            d === q ? delete a[b] : a[b] = d
                        },
                        T = function(a, b, c) {
                            var d, e = a[b];
                            if ("object" == typeof e && e)
                                if (s.call(e) == z)
                                    for (d = e.length; d--;) S(e, d, c);
                                else p(e, function(a) {
                                    S(e, a, c)
                                });
                            return c.call(a, b, e)
                        };
                    d.parse = function(a, b) {
                        var c, d;
                        return L = 0, M = "" + a, c = R(Q()), "$" != Q() && P(), L = M = null, b && s.call(b) == v ? T((d = {}, d[""] = c, d), "", b) : c
                    }
                }
            }
            return d.runInContext = a, d
        }
        var b = "function" == typeof define && define.amd,
            c = {
                "function": !0,
                object: !0
            },
            d = c[typeof exports] && exports && !exports.nodeType && exports,
            e = c[typeof window] && window || this,
            f = d && c[typeof module] && module && !module.nodeType && "object" == typeof global && global;
        if (!f || f.global !== f && f.window !== f && f.self !== f || (e = f), d && !b) a(e, d);
        else {
            var g = e.JSON,
                h = e.JSON3,
                i = !1,
                j = a(e, e.JSON3 = {
                    noConflict: function() {
                        return i || (i = !0, e.JSON = g, e.JSON3 = h, g = h = null), j
                    }
                });
            e.JSON = {
                parse: j.parse,
                stringify: j.stringify
            }
        }
        b && define(function() {
            return j
        })
    }.call(this),
    function(a, b, c) {
        "use strict";
        b.module("ngAnimate", ["ng"]).directive("ngAnimateChildren", function() {
            var a = "$$ngAnimateChildren";
            return function(c, d, e) {
                var f = e.ngAnimateChildren;
                b.isString(f) && 0 === f.length ? d.data(a, !0) : c.$watch(f, function(b) {
                    d.data(a, !!b)
                })
            }
        }).factory("$$animateReflow", ["$$rAF", "$document", function(a, b) {
            var c = b[0].body;
            return function(b) {
                return a(function() {
                    c.offsetWidth + 1;
                    b()
                })
            }
        }]).config(["$provide", "$animateProvider", function(d, e) {
            function f(a) {
                for (var b = 0; b < a.length; b++) {
                    var c = a[b];
                    if (c.nodeType == q) return c
                }
            }

            function g(a) {
                return a && b.element(a)
            }

            function h(a) {
                return b.element(f(a))
            }

            function i(a, b) {
                return f(a) == f(b)
            }
            var j, k = b.noop,
                l = b.forEach,
                m = e.$$selectors,
                n = b.isArray,
                o = b.isString,
                p = b.isObject,
                q = 1,
                r = "$$ngAnimateState",
                s = "$$ngAnimateChildren",
                t = "ng-animate",
                u = {
                    running: !0
                };
            d.decorator("$animate", ["$delegate", "$$q", "$injector", "$sniffer", "$rootElement", "$$asyncCallback", "$rootScope", "$document", "$templateRequest", "$$jqLite", function(a, c, d, q, v, w, x, y, z, A) {
                function B(a, b) {
                    var c = a.data(r) || {};
                    return b && (c.running = !0, c.structural = !0, a.data(r, c)), c.disabled || c.running && c.structural
                }

                function C(a) {
                    var b, d = c.defer();
                    return d.promise.$$cancelFn = function() {
                        b && b()
                    }, x.$$postDigest(function() {
                        b = a(function() {
                            d.resolve()
                        })
                    }), d.promise
                }

                function D(a) {
                    return p(a) ? (a.tempClasses && o(a.tempClasses) && (a.tempClasses = a.tempClasses.split(/\s+/)), a) : void 0
                }

                function E(a, b, c) {
                    c = c || {};
                    var d = {};
                    l(c, function(a, b) {
                        l(b.split(" "), function(b) {
                            d[b] = a
                        })
                    });
                    var e = Object.create(null);
                    l((a.attr("class") || "").split(/\s+/), function(a) {
                        e[a] = !0
                    });
                    var f = [],
                        g = [];
                    return l(b && b.classes || [], function(a, b) {
                        var c = e[b],
                            h = d[b] || {};
                        a === !1 ? (c || "addClass" == h.event) && g.push(b) : a === !0 && (c && "removeClass" != h.event || f.push(b))
                    }), f.length + g.length > 0 && [f.join(" "), g.join(" ")]
                }

                function F(a) {
                    if (a) {
                        var b = [],
                            c = {},
                            e = a.substr(1).split(".");
                        (q.transitions || q.animations) && b.push(d.get(m[""]));
                        for (var f = 0; f < e.length; f++) {
                            var g = e[f],
                                h = m[g];
                            h && !c[g] && (b.push(d.get(h)), c[g] = !0)
                        }
                        return b
                    }
                }

                function G(a, c, d, e) {
                    function f(a, b) {
                        var c = a[b],
                            d = a["before" + b.charAt(0).toUpperCase() + b.substr(1)];
                        return c || d ? ("leave" == b && (d = c, c = null), w.push({
                            event: b,
                            fn: c
                        }), t.push({
                            event: b,
                            fn: d
                        }), !0) : void 0
                    }

                    function g(b, c, f) {
                        function g(a) {
                            if (c) {
                                if ((c[a] || k)(), ++m < h.length) return;
                                c = null
                            }
                            f()
                        }
                        var h = [];
                        l(b, function(a) {
                            a.fn && h.push(a)
                        });
                        var m = 0;
                        l(h, function(b, f) {
                            var h = function() {
                                g(f)
                            };
                            switch (b.event) {
                                case "setClass":
                                    c.push(b.fn(a, i, j, h, e));
                                    break;
                                case "animate":
                                    c.push(b.fn(a, d, e.from, e.to, h));
                                    break;
                                case "addClass":
                                    c.push(b.fn(a, i || d, h, e));
                                    break;
                                case "removeClass":
                                    c.push(b.fn(a, j || d, h, e));
                                    break;
                                default:
                                    c.push(b.fn(a, h, e))
                            }
                        }), c && 0 === c.length && f()
                    }
                    var h = a[0];
                    if (h) {
                        e && (e.to = e.to || {}, e.from = e.from || {});
                        var i, j;
                        n(d) && (i = d[0], j = d[1], i ? j ? d = i + " " + j : (d = i, c = "addClass") : (d = j, c = "removeClass"));
                        var m = "setClass" == c,
                            o = m || "addClass" == c || "removeClass" == c || "animate" == c,
                            p = a.attr("class"),
                            q = p + " " + d;
                        if (O(q)) {
                            var r = k,
                                s = [],
                                t = [],
                                u = k,
                                v = [],
                                w = [],
                                x = (" " + q).replace(/\s+/g, ".");
                            return l(F(x), function(a) {
                                var b = f(a, c);
                                !b && m && (f(a, "addClass"), f(a, "removeClass"))
                            }), {
                                node: h,
                                event: c,
                                className: d,
                                isClassBased: o,
                                isSetClassOperation: m,
                                applyStyles: function() {
                                    e && a.css(b.extend(e.from || {}, e.to || {}))
                                },
                                before: function(a) {
                                    r = a, g(t, s, function() {
                                        r = k, a()
                                    })
                                },
                                after: function(a) {
                                    u = a, g(w, v, function() {
                                        u = k, a()
                                    })
                                },
                                cancel: function() {
                                    s && (l(s, function(a) {
                                        (a || k)(!0)
                                    }), r(!0)), v && (l(v, function(a) {
                                        (a || k)(!0)
                                    }), u(!0))
                                }
                            }
                        }
                    }
                }

                function H(a, c, d, e, f, g, h, i) {
                    function m(b) {
                        var e = "$animate:" + b;
                        x && x[e] && x[e].length > 0 && w(function() {
                            d.triggerHandler(e, {
                                event: a,
                                className: c
                            })
                        })
                    }

                    function n() {
                        m("before")
                    }

                    function o() {
                        m("after")
                    }

                    function p() {
                        m("close"), i()
                    }

                    function q() {
                        q.hasBeenRun || (q.hasBeenRun = !0, g())
                    }

                    function s() {
                        if (!s.hasBeenRun) {
                            v && v.applyStyles(), s.hasBeenRun = !0, h && h.tempClasses && l(h.tempClasses, function(a) {
                                j.removeClass(d, a)
                            });
                            var b = d.data(r);
                            b && (v && v.isClassBased ? J(d, c) : (w(function() {
                                var b = d.data(r) || {};
                                H == b.index && J(d, c, a)
                            }), d.data(r, b))), p()
                        }
                    }
                    var u = k,
                        v = G(d, a, c, h);
                    if (!v) return q(), n(), o(), s(), u;
                    a = v.event, c = v.className;
                    var x = b.element._data(v.node);
                    if (x = x && x.events, e || (e = f ? f.parent() : d.parent()), K(d, e)) return q(), n(), o(), s(), u;
                    var y = d.data(r) || {},
                        z = y.active || {},
                        A = y.totalActive || 0,
                        B = y.last,
                        C = !1;
                    if (A > 0) {
                        var D = [];
                        if (v.isClassBased) {
                            if ("setClass" == B.event) D.push(B), J(d, c);
                            else if (z[c]) {
                                var E = z[c];
                                E.event == a ? C = !0 : (D.push(E), J(d, c))
                            }
                        } else if ("leave" == a && z["ng-leave"]) C = !0;
                        else {
                            for (var F in z) D.push(z[F]);
                            y = {}, J(d, !0)
                        }
                        D.length > 0 && l(D, function(a) {
                            a.cancel()
                        })
                    }
                    if (!v.isClassBased || v.isSetClassOperation || "animate" == a || C || (C = "addClass" == a == d.hasClass(c)), C) return q(), n(), o(), p(), u;
                    z = y.active || {}, A = y.totalActive || 0, "leave" == a && d.one("$destroy", function() {
                        var a = b.element(this),
                            c = a.data(r);
                        if (c) {
                            var d = c.active["ng-leave"];
                            d && (d.cancel(), J(a, "ng-leave"))
                        }
                    }), j.addClass(d, t), h && h.tempClasses && l(h.tempClasses, function(a) {
                        j.addClass(d, a)
                    });
                    var H = M++;
                    return A++, z[c] = v, d.data(r, {
                        last: v,
                        active: z,
                        index: H,
                        totalActive: A
                    }), n(), v.before(function(b) {
                        var e = d.data(r);
                        b = b || !e || !e.active[c] || v.isClassBased && e.active[c].event != a, q(), b === !0 ? s() : (o(), v.after(s))
                    }), v.cancel
                }

                function I(a) {
                    var c = f(a);
                    if (c) {
                        var d = b.isFunction(c.getElementsByClassName) ? c.getElementsByClassName(t) : c.querySelectorAll("." + t);
                        l(d, function(a) {
                            a = b.element(a);
                            var c = a.data(r);
                            c && c.active && l(c.active, function(a) {
                                a.cancel()
                            })
                        })
                    }
                }

                function J(a, b) {
                    if (i(a, v)) u.disabled || (u.running = !1, u.structural = !1);
                    else if (b) {
                        var c = a.data(r) || {},
                            d = b === !0;
                        !d && c.active && c.active[b] && (c.totalActive--, delete c.active[b]), (d || !c.totalActive) && (j.removeClass(a, t), a.removeData(r))
                    }
                }

                function K(a, c) {
                    if (u.disabled) return !0;
                    if (i(a, v)) return u.running;
                    var d, e, f;
                    do {
                        if (0 === c.length) break;
                        var g = i(c, v),
                            h = g ? u : c.data(r) || {};
                        if (h.disabled) return !0;
                        if (g && (f = !0), d !== !1) {
                            var j = c.data(s);
                            b.isDefined(j) && (d = j)
                        }
                        e = e || h.running || h.last && !h.last.isClassBased
                    } while (c = c.parent());
                    return !f || !d && e
                }
                j = A, v.data(r, u);
                var L = x.$watch(function() {
                        return z.totalPendingRequests
                    }, function(a) {
                        0 === a && (L(), x.$$postDigest(function() {
                            x.$$postDigest(function() {
                                u.running = !1
                            })
                        }))
                    }),
                    M = 0,
                    N = e.classNameFilter(),
                    O = N ? function(a) {
                        return N.test(a)
                    } : function() {
                        return !0
                    };
                return {
                    animate: function(a, b, c, d, e) {
                        return d = d || "ng-inline-animate", e = D(e) || {}, e.from = c ? b : null, e.to = c ? c : b, C(function(b) {
                            return H("animate", d, h(a), null, null, k, e, b)
                        })
                    },
                    enter: function(c, d, e, f) {
                        return f = D(f), c = b.element(c), d = g(d), e = g(e), B(c, !0), a.enter(c, d, e), C(function(a) {
                            return H("enter", "ng-enter", h(c), d, e, k, f, a)
                        })
                    },
                    leave: function(c, d) {
                        return d = D(d), c = b.element(c), I(c), B(c, !0), C(function(b) {
                            return H("leave", "ng-leave", h(c), null, null, function() {
                                a.leave(c)
                            }, d, b)
                        })
                    },
                    move: function(c, d, e, f) {
                        return f = D(f), c = b.element(c), d = g(d), e = g(e), I(c), B(c, !0), a.move(c, d, e), C(function(a) {
                            return H("move", "ng-move", h(c), d, e, k, f, a)
                        })
                    },
                    addClass: function(a, b, c) {
                        return this.setClass(a, b, [], c)
                    },
                    removeClass: function(a, b, c) {
                        return this.setClass(a, [], b, c)
                    },
                    setClass: function(c, d, e, g) {
                        g = D(g);
                        var i = "$$animateClasses";
                        if (c = b.element(c), c = h(c), B(c)) return a.$$setClassImmediately(c, d, e, g);
                        var j, k = c.data(i),
                            m = !!k;
                        return k || (k = {}, k.classes = {}), j = k.classes, d = n(d) ? d : d.split(" "), l(d, function(a) {
                            a && a.length && (j[a] = !0)
                        }), e = n(e) ? e : e.split(" "), l(e, function(a) {
                            a && a.length && (j[a] = !1)
                        }), m ? (g && k.options && (k.options = b.extend(k.options || {}, g)), k.promise) : (c.data(i, k = {
                            classes: j,
                            options: g
                        }), k.promise = C(function(b) {
                            var d = c.parent(),
                                e = f(c),
                                g = e.parentNode;
                            if (!g || g.$$NG_REMOVED || e.$$NG_REMOVED) return void b();
                            var h = c.data(i);
                            c.removeData(i);
                            var j = c.data(r) || {},
                                k = E(c, h, j.active);
                            return k ? H("setClass", k, c, d, null, function() {
                                k[0] && a.$$addClassImmediately(c, k[0]), k[1] && a.$$removeClassImmediately(c, k[1])
                            }, h.options, b) : b()
                        }))
                    },
                    cancel: function(a) {
                        a.$$cancelFn()
                    },
                    enabled: function(a, b) {
                        switch (arguments.length) {
                            case 2:
                                if (a) J(b);
                                else {
                                    var c = b.data(r) || {};
                                    c.disabled = !0, b.data(r, c)
                                }
                                break;
                            case 1:
                                u.disabled = !a;
                                break;
                            default:
                                a = !u.disabled
                        }
                        return !!a
                    }
                }
            }]), e.register("", ["$window", "$sniffer", "$timeout", "$$animateReflow", function(d, e, g, h) {
                function i() {
                    J || (J = h(function() {
                        W = [], J = null, U = {}
                    }))
                }

                function m(a, b) {
                    J && J(), W.push(b), J = h(function() {
                        l(W, function(a) {
                            a()
                        }), W = [], J = null, U = {}
                    })
                }

                function p(a, c) {
                    var d = f(a);
                    a = b.element(d), Z.push(a);
                    var e = Date.now() + c;
                    Y >= e || (g.cancel(X), Y = e, X = g(function() {
                        r(Z), Z = []
                    }, c, !1))
                }

                function r(a) {
                    l(a, function(a) {
                        var b = a.data(Q);
                        b && l(b.closeAnimationFns, function(a) {
                            a()
                        })
                    })
                }

                function s(a, b) {
                    var c = b ? U[b] : null;
                    if (!c) {
                        var e = 0,
                            f = 0,
                            g = 0,
                            h = 0;
                        l(a, function(a) {
                            if (a.nodeType == q) {
                                var b = d.getComputedStyle(a) || {},
                                    c = b[E + K];
                                e = Math.max(t(c), e);
                                var i = b[E + M];
                                f = Math.max(t(i), f); {
                                    b[G + M]
                                }
                                h = Math.max(t(b[G + M]), h);
                                var j = t(b[G + K]);
                                j > 0 && (j *= parseInt(b[G + N], 10) || 1), g = Math.max(j, g)
                            }
                        }), c = {
                            total: 0,
                            transitionDelay: f,
                            transitionDuration: e,
                            animationDelay: h,
                            animationDuration: g
                        }, b && (U[b] = c)
                    }
                    return c
                }

                function t(a) {
                    var b = 0,
                        c = o(a) ? a.split(/\s*,\s*/) : [];
                    return l(c, function(a) {
                        b = Math.max(parseFloat(a) || 0, b)
                    }), b
                }

                function u(a) {
                    var b = a.parent(),
                        c = b.data(P);
                    return c || (b.data(P, ++V), c = V), c + "-" + f(a).getAttribute("class")
                }

                function v(a, b, c, d) {
                    var e = ["ng-enter", "ng-leave", "ng-move"].indexOf(c) >= 0,
                        g = u(b),
                        h = g + " " + c,
                        i = U[h] ? ++U[h].total : 0,
                        k = {};
                    if (i > 0) {
                        var l = c + "-stagger",
                            m = g + " " + l,
                            n = !U[m];
                        n && j.addClass(b, l), k = s(b, m), n && j.removeClass(b, l)
                    }
                    j.addClass(b, c);
                    var o = b.data(Q) || {},
                        p = s(b, h),
                        q = p.transitionDuration,
                        r = p.animationDuration;
                    if (e && 0 === q && 0 === r) return j.removeClass(b, c), !1;
                    var t = d || e && q > 0,
                        v = r > 0 && k.animationDelay > 0 && 0 === k.animationDuration,
                        w = o.closeAnimationFns || [];
                    b.data(Q, {
                        stagger: k,
                        cacheKey: h,
                        running: o.running || 0,
                        itemIndex: i,
                        blockTransition: t,
                        closeAnimationFns: w
                    });
                    var z = f(b);
                    return t && (x(z, !0), d && b.css(d)), v && y(z, !0), !0
                }

                function w(a, b, c, d, e) {
                    function h() {
                        b.off(M, i), j.removeClass(b, n), j.removeClass(b, o), K && g.cancel(K), C(b, c);
                        var a = f(b);
                        for (var d in r) a.style.removeProperty(r[d])
                    }

                    function i(a) {
                        a.stopPropagation();
                        var b = a.originalEvent || a,
                            c = b.$manualTimeStamp || b.timeStamp || Date.now(),
                            e = parseFloat(b.elapsedTime.toFixed(R));
                        Math.max(c - L, 0) >= G && e >= D && d()
                    }
                    var k = f(b),
                        m = b.data(Q);
                    if (-1 == k.getAttribute("class").indexOf(c) || !m) return void d();
                    var n = "",
                        o = "";
                    l(c.split(" "), function(a, b) {
                        var c = (b > 0 ? " " : "") + a;
                        n += c + "-active", o += c + "-pending"
                    });
                    var q = "",
                        r = [],
                        t = m.itemIndex,
                        u = m.stagger,
                        v = 0;
                    if (t > 0) {
                        var w = 0;
                        u.transitionDelay > 0 && 0 === u.transitionDuration && (w = u.transitionDelay * t);
                        var z = 0;
                        u.animationDelay > 0 && 0 === u.animationDuration && (z = u.animationDelay * t, r.push(I + "animation-play-state")), v = Math.round(100 * Math.max(w, z)) / 100
                    }
                    v || (j.addClass(b, n), m.blockTransition && x(k, !1));
                    var A = m.cacheKey + " " + n,
                        B = s(b, A),
                        D = Math.max(B.transitionDuration, B.animationDuration);
                    if (0 === D) return j.removeClass(b, n), C(b, c), void d();
                    !v && e && Object.keys(e).length > 0 && (B.transitionDuration || (b.css("transition", B.animationDuration + "s linear all"), r.push("transition")), b.css(e));
                    var E = Math.max(B.transitionDelay, B.animationDelay),
                        G = E * T;
                    if (r.length > 0) {
                        var J = k.getAttribute("style") || "";
                        ";" !== J.charAt(J.length - 1) && (J += ";"), k.setAttribute("style", J + " " + q)
                    }
                    var K, L = Date.now(),
                        M = H + " " + F,
                        N = (E + D) * S,
                        O = (v + N) * T;
                    return v > 0 && (j.addClass(b, o), K = g(function() {
                        K = null, B.transitionDuration > 0 && x(k, !1), B.animationDuration > 0 && y(k, !1), j.addClass(b, n), j.removeClass(b, o), e && (0 === B.transitionDuration && b.css("transition", B.animationDuration + "s linear all"), b.css(e), r.push("transition"))
                    }, v * T, !1)), b.on(M, i), m.closeAnimationFns.push(function() {
                        h(), d()
                    }), m.running++, p(b, O), h
                }

                function x(a, b) {
                    a.style[E + L] = b ? "none" : ""
                }

                function y(a, b) {
                    a.style[G + O] = b ? "paused" : ""
                }

                function z(a, b, c, d) {
                    return v(a, b, c, d) ? function(a) {
                        a && C(b, c)
                    } : void 0
                }

                function A(a, b, c, d, e) {
                    return b.data(Q) ? w(a, b, c, d, e) : (C(b, c), void d())
                }

                function B(a, b, c, d, e) {
                    var f = z(a, b, c, e.from);
                    if (!f) return i(), void d();
                    var g = f;
                    return m(b, function() {
                            g = A(a, b, c, d, e.to)
                        }),
                        function(a) {
                            (g || k)(a)
                        }
                }

                function C(a, b) {
                    j.removeClass(a, b);
                    var c = a.data(Q);
                    c && (c.running && c.running--, c.running && 0 !== c.running || a.removeData(Q))
                }

                function D(a, b) {
                    var c = "";
                    return a = n(a) ? a : a.split(/\s+/), l(a, function(a, d) {
                        a && a.length > 0 && (c += (d > 0 ? " " : "") + a + b)
                    }), c
                }
                var E, F, G, H, I = "";
                a.ontransitionend === c && a.onwebkittransitionend !== c ? (I = "-webkit-", E = "WebkitTransition", F = "webkitTransitionEnd transitionend") : (E = "transition", F = "transitionend"), a.onanimationend === c && a.onwebkitanimationend !== c ? (I = "-webkit-", G = "WebkitAnimation", H = "webkitAnimationEnd animationend") : (G = "animation", H = "animationend");
                var J, K = "Duration",
                    L = "Property",
                    M = "Delay",
                    N = "IterationCount",
                    O = "PlayState",
                    P = "$$ngAnimateKey",
                    Q = "$$ngAnimateCSS3Data",
                    R = 3,
                    S = 1.5,
                    T = 1e3,
                    U = {},
                    V = 0,
                    W = [],
                    X = null,
                    Y = 0,
                    Z = [];
                return {
                    animate: function(a, b, c, d, e, f) {
                        return f = f || {}, f.from = c, f.to = d, B("animate", a, b, e, f)
                    },
                    enter: function(a, b, c) {
                        return c = c || {}, B("enter", a, "ng-enter", b, c)
                    },
                    leave: function(a, b, c) {
                        return c = c || {}, B("leave", a, "ng-leave", b, c)
                    },
                    move: function(a, b, c) {
                        return c = c || {}, B("move", a, "ng-move", b, c)
                    },
                    beforeSetClass: function(a, b, c, d, e) {
                        e = e || {};
                        var f = D(c, "-remove") + " " + D(b, "-add"),
                            g = z("setClass", a, f, e.from);
                        return g ? (m(a, d), g) : (i(), void d())
                    },
                    beforeAddClass: function(a, b, c, d) {
                        d = d || {};
                        var e = z("addClass", a, D(b, "-add"), d.from);
                        return e ? (m(a, c), e) : (i(), void c())
                    },
                    beforeRemoveClass: function(a, b, c, d) {
                        d = d || {};
                        var e = z("removeClass", a, D(b, "-remove"), d.from);
                        return e ? (m(a, c), e) : (i(), void c())
                    },
                    setClass: function(a, b, c, d, e) {
                        e = e || {}, c = D(c, "-remove"), b = D(b, "-add");
                        var f = c + " " + b;
                        return A("setClass", a, f, d, e.to)
                    },
                    addClass: function(a, b, c, d) {
                        return d = d || {}, A("addClass", a, D(b, "-add"), c, d.to)
                    },
                    removeClass: function(a, b, c, d) {
                        return d = d || {}, A("removeClass", a, D(b, "-remove"), c, d.to)
                    }
                }
            }])
        }])
    }(window, window.angular),
    function(a, b) {
        "use strict";
        b.module("ngMessages", []).directive("ngMessages", ["$compile", "$animate", "$templateRequest", function(a, c, d) {
            var e = "ng-active",
                f = "ng-inactive";
            return {
                restrict: "AE",
                controller: function() {
                    this.$renderNgMessageClasses = b.noop;
                    var a = [];
                    this.registerMessage = function(b, c) {
                        for (var d = 0; d < a.length; d++)
                            if (a[d].type == c.type) {
                                if (b != d) {
                                    var e = a[b];
                                    a[b] = a[d], b < a.length ? a[d] = e : a.splice(0, d)
                                }
                                return
                            }
                        a.splice(b, 0, c)
                    }, this.renderMessages = function(c, d) {
                        function e(a) {
                            return null !== a && a !== !1 && a
                        }
                        c = c || {};
                        var f;
                        b.forEach(a, function(a) {
                            f && !d || !e(c[a.type]) ? a.detach() : (a.attach(), f = !0)
                        }), this.renderElementClasses(f)
                    }
                },
                require: "ngMessages",
                link: function(g, h, i, j) {
                    j.renderElementClasses = function(a) {
                        a ? c.setClass(h, e, f) : c.setClass(h, f, e)
                    };
                    var k, l = b.isString(i.ngMessagesMultiple) || b.isString(i.multiple),
                        m = i.ngMessages || i["for"];
                    g.$watchCollection(m, function(a) {
                        k = a, j.renderMessages(a, l)
                    });
                    var n = i.ngMessagesInclude || i.include;
                    n && d(n).then(function(c) {
                        var d, e = b.element("<div/>").html(c);
                        b.forEach(e.children(), function(c) {
                            c = b.element(c), d ? d.after(c) : h.prepend(c), d = c, a(c)(g)
                        }), j.renderMessages(k, l)
                    })
                }
            }
        }]).directive("ngMessage", ["$animate", function(a) {
            var b = 8;
            return {
                require: "^ngMessages",
                transclude: "element",
                terminal: !0,
                restrict: "AE",
                link: function(c, d, e, f, g) {
                    for (var h, i, j = d[0], k = j.parentNode, l = 0, m = 0; l < k.childNodes.length; l++) {
                        var n = k.childNodes[l];
                        if (n.nodeType == b && n.nodeValue.indexOf("ngMessage") >= 0) {
                            if (n === j) {
                                h = m;
                                break
                            }
                            m++
                        }
                    }
                    f.registerMessage(h, {
                        type: e.ngMessage || e.when,
                        attach: function() {
                            i || g(c, function(b) {
                                a.enter(b, null, d), i = b
                            })
                        },
                        detach: function() {
                            i && (a.leave(i), i = null)
                        }
                    })
                }
            }
        }])
    }(window, window.angular),
    function(a, b) {
        "use strict";

        function c() {
            this.$get = ["$$sanitizeUri", function(a) {
                return function(b) {
                    var c = [];
                    return f(b, i(c, function(b, c) {
                        return !/^unsafe/.test(a(b, c))
                    })), c.join("")
                }
            }]
        }

        function d(a) {
            var c = [],
                d = i(c, b.noop);
            return d.chars(a), c.join("")
        }

        function e(a) {
            var b, c = {},
                d = a.split(",");
            for (b = 0; b < d.length; b++) c[d[b]] = !0;
            return c
        }

        function f(a, c) {
            function d(a, d, f, h) {
                if (d = b.lowercase(d), y[d])
                    for (; t.last() && z[t.last()];) e("", t.last());
                x[d] && t.last() == d && e("", d), h = u[d] || !!h, h || t.push(d);
                var i = {};
                f.replace(m, function(a, b, c, d, e) {
                    var f = c || d || e || "";
                    i[b] = g(f)
                }), c.start && c.start(d, i, h)
            }

            function e(a, d) {
                var e, f = 0;
                if (d = b.lowercase(d))
                    for (f = t.length - 1; f >= 0 && t[f] != d; f--);
                if (f >= 0) {
                    for (e = t.length - 1; e >= f; e--) c.end && c.end(t[e]);
                    t.length = f
                }
            }
            "string" != typeof a && (a = null === a || "undefined" == typeof a ? "" : "" + a);
            var f, h, i, s, t = [],
                v = a;
            for (t.last = function() {
                    return t[t.length - 1]
                }; a;) {
                if (s = "", h = !0, t.last() && B[t.last()] ? (a = a.replace(new RegExp("(.*)<\\s*\\/\\s*" + t.last() + "[^>]*>", "i"), function(a, b) {
                        return b = b.replace(p, "$1").replace(r, "$1"), c.chars && c.chars(g(b)), ""
                    }), e("", t.last())) : (0 === a.indexOf("<!--") ? (f = a.indexOf("--", 4), f >= 0 && a.lastIndexOf("-->", f) === f && (c.comment && c.comment(a.substring(4, f)), a = a.substring(f + 3), h = !1)) : q.test(a) ? (i = a.match(q), i && (a = a.replace(i[0], ""), h = !1)) : o.test(a) ? (i = a.match(l), i && (a = a.substring(i[0].length), i[0].replace(l, e), h = !1)) : n.test(a) && (i = a.match(k), i ? (i[4] && (a = a.substring(i[0].length), i[0].replace(k, d)), h = !1) : (s += "<", a = a.substring(1))), h && (f = a.indexOf("<"), s += 0 > f ? a : a.substring(0, f), a = 0 > f ? "" : a.substring(f), c.chars && c.chars(g(s)))), a == v) throw j("badparse", "The sanitizer was unable to parse the following block of html: {0}", a);
                v = a
            }
            e()
        }

        function g(a) {
            if (!a) return "";
            var b = I.exec(a),
                c = b[1],
                d = b[3],
                e = b[2];
            return e && (H.innerHTML = e.replace(/</g, "&lt;"), e = "textContent" in H ? H.textContent : H.innerText), c + e + d
        }

        function h(a) {
            return a.replace(/&/g, "&amp;").replace(s, function(a) {
                var b = a.charCodeAt(0),
                    c = a.charCodeAt(1);
                return "&#" + (1024 * (b - 55296) + (c - 56320) + 65536) + ";"
            }).replace(t, function(a) {
                return "&#" + a.charCodeAt(0) + ";"
            }).replace(/</g, "&lt;").replace(/>/g, "&gt;")
        }

        function i(a, c) {
            var d = !1,
                e = b.bind(a, a.push);
            return {
                start: function(a, f, g) {
                    a = b.lowercase(a), !d && B[a] && (d = a), d || C[a] !== !0 || (e("<"), e(a), b.forEach(f, function(d, f) {
                        var g = b.lowercase(f),
                            i = "img" === a && "src" === g || "background" === g;
                        G[g] !== !0 || D[g] === !0 && !c(d, i) || (e(" "), e(f), e('="'), e(h(d)), e('"'))
                    }), e(g ? "/>" : ">"))
                },
                end: function(a) {
                    a = b.lowercase(a), d || C[a] !== !0 || (e("</"), e(a), e(">")), a == d && (d = !1)
                },
                chars: function(a) {
                    d || e(h(a))
                }
            }
        }
        var j = b.$$minErr("$sanitize"),
            k = /^<((?:[a-zA-Z])[\w:-]*)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*(>?)/,
            l = /^<\/\s*([\w:-]+)[^>]*>/,
            m = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,
            n = /^</,
            o = /^<\//,
            p = /<!--(.*?)-->/g,
            q = /<!DOCTYPE([^>]*?)>/i,
            r = /<!\[CDATA\[(.*?)]]>/g,
            s = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
            t = /([^\#-~| |!])/g,
            u = e("area,br,col,hr,img,wbr"),
            v = e("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
            w = e("rp,rt"),
            x = b.extend({}, w, v),
            y = b.extend({}, v, e("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")),
            z = b.extend({}, w, e("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),
            A = e("animate,animateColor,animateMotion,animateTransform,circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,set,stop,svg,switch,text,title,tspan,use"),
            B = e("script,style"),
            C = b.extend({}, u, y, z, x, A),
            D = e("background,cite,href,longdesc,src,usemap,xlink:href"),
            E = e("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,target,title,type,valign,value,vspace,width"),
            F = e("accent-height,accumulate,additive,alphabetic,arabic-form,ascent,attributeName,attributeType,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan"),
            G = b.extend({}, D, F, E),
            H = document.createElement("pre"),
            I = /^(\s*)([\s\S]*?)(\s*)$/;
        b.module("ngSanitize", []).provider("$sanitize", c), b.module("ngSanitize").filter("linky", ["$sanitize", function(a) {
            var c = /((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"”’]/,
                e = /^mailto:/;
            return function(f, g) {
                function h(a) {
                    a && n.push(d(a))
                }

                function i(a, c) {
                    n.push("<a "), b.isDefined(g) && n.push('target="', g, '" '), n.push('href="', a.replace(/"/g, "&quot;"), '">'), h(c), n.push("</a>")
                }
                if (!f) return f;
                for (var j, k, l, m = f, n = []; j = m.match(c);) k = j[0], j[2] || j[4] || (k = (j[3] ? "http://" : "mailto:") + k), l = j.index, h(m.substr(0, l)), i(k, j[0].replace(e, "")), m = m.substring(l + j[0].length);
                return h(m), a(n.join(""))
            }
        }])
    }(window, window.angular),
    function(a, b) {
        "use strict";

        function c(a, c, e) {
            d.directive(a, ["$parse", "$swipe", function(d, f) {
                var g = 75,
                    h = .3,
                    i = 30;
                return function(j, k, l) {
                    function m(a) {
                        if (!n) return !1;
                        var b = Math.abs(a.y - n.y),
                            d = (a.x - n.x) * c;
                        return o && g > b && d > 0 && d > i && h > b / d
                    }
                    var n, o, p = d(l[a]),
                        q = ["touch"];
                    b.isDefined(l.ngSwipeDisableMouse) || q.push("mouse"), f.bind(k, {
                        start: function(a) {
                            n = a, o = !0
                        },
                        cancel: function() {
                            o = !1
                        },
                        end: function(a, b) {
                            m(a) && j.$apply(function() {
                                k.triggerHandler(e), p(j, {
                                    $event: b
                                })
                            })
                        }
                    }, q)
                }
            }])
        }
        var d = b.module("ngTouch", []);
        d.factory("$swipe", [function() {
            function a(a) {
                var b = a.touches && a.touches.length ? a.touches : [a],
                    c = a.changedTouches && a.changedTouches[0] || a.originalEvent && a.originalEvent.changedTouches && a.originalEvent.changedTouches[0] || b[0].originalEvent || b[0];
                return {
                    x: c.clientX,
                    y: c.clientY
                }
            }

            function c(a, c) {
                var d = [];
                return b.forEach(a, function(a) {
                    var b = e[a][c];
                    b && d.push(b)
                }), d.join(" ")
            }
            var d = 10,
                e = {
                    mouse: {
                        start: "mousedown",
                        move: "mousemove",
                        end: "mouseup"
                    },
                    touch: {
                        start: "touchstart",
                        move: "touchmove",
                        end: "touchend",
                        cancel: "touchcancel"
                    }
                };
            return {
                bind: function(b, e, f) {
                    var g, h, i, j, k = !1;
                    f = f || ["mouse", "touch"], b.on(c(f, "start"), function(b) {
                        i = a(b), k = !0, g = 0, h = 0, j = i, e.start && e.start(i, b)
                    });
                    var l = c(f, "cancel");
                    l && b.on(l, function(a) {
                        k = !1, e.cancel && e.cancel(a)
                    }), b.on(c(f, "move"), function(b) {
                        if (k && i) {
                            var c = a(b);
                            if (g += Math.abs(c.x - j.x), h += Math.abs(c.y - j.y), j = c, !(d > g && d > h)) return h > g ? (k = !1, void(e.cancel && e.cancel(b))) : (b.preventDefault(), void(e.move && e.move(c, b)))
                        }
                    }), b.on(c(f, "end"), function(b) {
                        k && (k = !1, e.end && e.end(a(b), b))
                    })
                }
            }
        }]), d.config(["$provide", function(a) {
            a.decorator("ngClickDirective", ["$delegate", function(a) {
                return a.shift(), a
            }])
        }]), d.directive("ngClick", ["$parse", "$timeout", "$rootElement", function(a, c, d) {
            function e(a, b, c, d) {
                return Math.abs(a - c) < p && Math.abs(b - d) < p
            }

            function f(a, b, c) {
                for (var d = 0; d < a.length; d += 2)
                    if (e(a[d], a[d + 1], b, c)) return a.splice(d, d + 2), !0;
                return !1
            }

            function g(a) {
                if (!(Date.now() - j > o)) {
                    var b = a.touches && a.touches.length ? a.touches : [a],
                        c = b[0].clientX,
                        d = b[0].clientY;
                    1 > c && 1 > d || l && l[0] === c && l[1] === d || (l && (l = null), "label" === a.target.tagName.toLowerCase() && (l = [c, d]), f(k, c, d) || (a.stopPropagation(), a.preventDefault(), a.target && a.target.blur()))
                }
            }

            function h(a) {
                var b = a.touches && a.touches.length ? a.touches : [a],
                    d = b[0].clientX,
                    e = b[0].clientY;
                k.push(d, e), c(function() {
                    for (var a = 0; a < k.length; a += 2)
                        if (k[a] == d && k[a + 1] == e) return void k.splice(a, a + 2)
                }, o, !1)
            }

            function i(a, b) {
                k || (d[0].addEventListener("click", g, !0), d[0].addEventListener("touchstart", h, !0), k = []), j = Date.now(), f(k, a, b)
            }
            var j, k, l, m = 750,
                n = 12,
                o = 2500,
                p = 25,
                q = "ng-click-active";
            return function(c, d, e) {
                function f() {
                    o = !1, d.removeClass(q)
                }
                var g, h, j, k, l = a(e.ngClick),
                    o = !1;
                d.on("touchstart", function(a) {
                    o = !0, g = a.target ? a.target : a.srcElement, 3 == g.nodeType && (g = g.parentNode), d.addClass(q), h = Date.now();
                    var b = a.touches && a.touches.length ? a.touches : [a],
                        c = b[0].originalEvent || b[0];
                    j = c.clientX, k = c.clientY
                }), d.on("touchmove", function() {
                    f()
                }), d.on("touchcancel", function() {
                    f()
                }), d.on("touchend", function(a) {
                    var c = Date.now() - h,
                        l = a.changedTouches && a.changedTouches.length ? a.changedTouches : a.touches && a.touches.length ? a.touches : [a],
                        p = l[0].originalEvent || l[0],
                        q = p.clientX,
                        r = p.clientY,
                        s = Math.sqrt(Math.pow(q - j, 2) + Math.pow(r - k, 2));
                    o && m > c && n > s && (i(q, r), g && g.blur(), b.isDefined(e.disabled) && e.disabled !== !1 || d.triggerHandler("click", [a])), f()
                }), d.onclick = function() {}, d.on("click", function(a, b) {
                    c.$apply(function() {
                        l(c, {
                            $event: b || a
                        })
                    })
                }), d.on("mousedown", function() {
                    d.addClass(q)
                }), d.on("mousemove mouseup", function() {
                    d.removeClass(q)
                })
            }
        }]), c("ngSwipeLeft", -1, "swipeleft"), c("ngSwipeRight", 1, "swiperight")
    }(window, window.angular), angular.module("pascalprecht.translate", ["ng"]).run(["$translate", function(a) {
        var b = a.storageKey(),
            c = a.storage(),
            d = function() {
                var d = a.preferredLanguage();
                angular.isString(d) ? a.use(d) : c.put(b, a.use())
            };
        c ? c.get(b) ? a.use(c.get(b))["catch"](d) : d() : angular.isString(a.preferredLanguage()) && a.use(a.preferredLanguage())
    }]), angular.module("pascalprecht.translate").provider("$translate", ["$STORAGE_KEY", function(a) {
        var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q = {},
            r = [],
            s = a,
            t = [],
            u = !1,
            v = "translate-cloak",
            w = !1,
            x = ".",
            y = "2.5.2",
            z = function() {
                var a, b, c = window.navigator,
                    d = ["language", "browserLanguage", "systemLanguage", "userLanguage"];
                if (angular.isArray(c.languages))
                    for (a = 0; a < c.languages.length; a++)
                        if (b = c.languages[a], b && b.length) return b;
                for (a = 0; a < d.length; a++)
                    if (b = c[d[a]], b && b.length) return b;
                return null
            };
        z.displayName = "angular-translate/service: getFirstBrowserLanguage";
        var A = function() {
            return (z() || "").split("-").join("_")
        };
        A.displayName = "angular-translate/service: getLocale";
        var B = function(a, b) {
                for (var c = 0, d = a.length; d > c; c++)
                    if (a[c] === b) return c;
                return -1
            },
            C = function() {
                return this.replace(/^\s+|\s+$/g, "")
            },
            D = function(a) {
                for (var b = [], d = angular.lowercase(a), e = 0, f = r.length; f > e; e++) b.push(angular.lowercase(r[e]));
                if (B(b, d) > -1) return a;
                if (c) {
                    var g;
                    for (var h in c) {
                        var i = !1,
                            j = Object.prototype.hasOwnProperty.call(c, h) && angular.lowercase(h) === angular.lowercase(a);
                        if ("*" === h.slice(-1) && (i = h.slice(0, -1) === a.slice(0, h.length - 1)), (j || i) && (g = c[h], B(b, angular.lowercase(g)) > -1)) return g
                    }
                }
                var k = a.split("_");
                return k.length > 1 && B(b, angular.lowercase(k[0])) > -1 ? k[0] : a
            },
            E = function(a, b) {
                if (!a && !b) return q;
                if (a && !b) {
                    if (angular.isString(a)) return q[a]
                } else angular.isObject(q[a]) || (q[a] = {}), angular.extend(q[a], F(b));
                return this
            };
        this.translations = E, this.cloakClassName = function(a) {
            return a ? (v = a, this) : v
        };
        var F = function(a, b, c, d) {
            var e, f, g, h;
            b || (b = []), c || (c = {});
            for (e in a) Object.prototype.hasOwnProperty.call(a, e) && (h = a[e], angular.isObject(h) ? F(h, b.concat(e), c, e) : (f = b.length ? "" + b.join(x) + x + e : e, b.length && e === d && (g = "" + b.join(x), c[g] = "@:" + f), c[f] = h));
            return c
        };
        this.addInterpolation = function(a) {
            return t.push(a), this
        }, this.useMessageFormatInterpolation = function() {
            return this.useInterpolation("$translateMessageFormatInterpolation")
        }, this.useInterpolation = function(a) {
            return k = a, this
        }, this.useSanitizeValueStrategy = function(a) {
            return u = a, this
        }, this.preferredLanguage = function(a) {
            return G(a), this
        };
        var G = function(a) {
            return a && (b = a), b
        };
        this.translationNotFoundIndicator = function(a) {
            return this.translationNotFoundIndicatorLeft(a), this.translationNotFoundIndicatorRight(a), this
        }, this.translationNotFoundIndicatorLeft = function(a) {
            return a ? (n = a, this) : n
        }, this.translationNotFoundIndicatorRight = function(a) {
            return a ? (o = a, this) : o
        }, this.fallbackLanguage = function(a) {
            return H(a), this
        };
        var H = function(a) {
            return a ? (angular.isString(a) ? (e = !0, d = [a]) : angular.isArray(a) && (e = !1, d = a), angular.isString(b) && B(d, b) < 0 && d.push(b), this) : e ? d[0] : d
        };
        this.use = function(a) {
            if (a) {
                if (!q[a] && !l) throw new Error("$translateProvider couldn't find translationTable for langKey: '" + a + "'");
                return f = a, this
            }
            return f
        };
        var I = function(a) {
            return a ? void(s = a) : i ? i + s : s
        };
        this.storageKey = I, this.useUrlLoader = function(a, b) {
            return this.useLoader("$translateUrlLoader", angular.extend({
                url: a
            }, b))
        }, this.useStaticFilesLoader = function(a) {
            return this.useLoader("$translateStaticFilesLoader", a)
        }, this.useLoader = function(a, b) {
            return l = a, m = b || {}, this
        }, this.useLocalStorage = function() {
            return this.useStorage("$translateLocalStorage")
        }, this.useCookieStorage = function() {
            return this.useStorage("$translateCookieStorage")
        }, this.useStorage = function(a) {
            return h = a, this
        }, this.storagePrefix = function(a) {
            return a ? (i = a, this) : a
        }, this.useMissingTranslationHandlerLog = function() {
            return this.useMissingTranslationHandler("$translateMissingTranslationHandlerLog")
        }, this.useMissingTranslationHandler = function(a) {
            return j = a, this
        }, this.usePostCompiling = function(a) {
            return w = !!a, this
        }, this.determinePreferredLanguage = function(a) {
            var c = a && angular.isFunction(a) ? a() : A();
            return b = r.length ? D(c) : c, this
        }, this.registerAvailableLanguageKeys = function(a, b) {
            return a ? (r = a, b && (c = b), this) : r
        }, this.useLoaderCache = function(a) {
            return a === !1 ? p = void 0 : a === !0 ? p = !0 : "undefined" == typeof a ? p = "$translationCache" : a && (p = a), this
        }, this.$get = ["$log", "$injector", "$rootScope", "$q", function(a, c, i, r) {
            var x, z, A, J = c.get(k || "$translateDefaultInterpolation"),
                K = !1,
                L = {},
                M = {},
                N = function(a, c, e) {
                    if (angular.isArray(a)) {
                        var g = function(a) {
                            for (var b = {}, d = [], f = function(a) {
                                    var d = r.defer(),
                                        f = function(c) {
                                            b[a] = c, d.resolve([a, c])
                                        };
                                    return N(a, c, e).then(f, f), d.promise
                                }, g = 0, h = a.length; h > g; g++) d.push(f(a[g]));
                            return r.all(d).then(function() {
                                return b
                            })
                        };
                        return g(a)
                    }
                    var i = r.defer();
                    a && (a = C.apply(a));
                    var j = function() {
                        var a = b ? M[b] : M[f];
                        if (z = 0, h && !a) {
                            var c = x.get(s);
                            if (a = M[c], d && d.length) {
                                var e = B(d, c);
                                z = 0 === e ? 1 : 0, B(d, b) < 0 && d.push(b)
                            }
                        }
                        return a
                    }();
                    return j ? j.then(function() {
                        Z(a, c, e).then(i.resolve, i.reject)
                    }, i.reject) : Z(a, c, e).then(i.resolve, i.reject), i.promise
                },
                O = function(a) {
                    return n && (a = [n, a].join(" ")), o && (a = [a, o].join(" ")), a
                },
                P = function(a) {
                    f = a, i.$emit("$translateChangeSuccess", {
                        language: a
                    }), h && x.put(N.storageKey(), f), J.setLocale(f), angular.forEach(L, function(a, b) {
                        L[b].setLocale(f)
                    }), i.$emit("$translateChangeEnd", {
                        language: a
                    })
                },
                Q = function(a) {
                    if (!a) throw "No language key specified for loading.";
                    var b = r.defer();
                    i.$emit("$translateLoadingStart", {
                        language: a
                    }), K = !0;
                    var d = p;
                    "string" == typeof d && (d = c.get(d));
                    var e = angular.extend({}, m, {
                        key: a,
                        $http: angular.extend({}, {
                            cache: d
                        }, m.$http)
                    });
                    return c.get(l)(e).then(function(c) {
                        var d = {};
                        i.$emit("$translateLoadingSuccess", {
                            language: a
                        }), angular.isArray(c) ? angular.forEach(c, function(a) {
                            angular.extend(d, F(a))
                        }) : angular.extend(d, F(c)), K = !1, b.resolve({
                            key: a,
                            table: d
                        }), i.$emit("$translateLoadingEnd", {
                            language: a
                        })
                    }, function(a) {
                        i.$emit("$translateLoadingError", {
                            language: a
                        }), b.reject(a), i.$emit("$translateLoadingEnd", {
                            language: a
                        })
                    }), b.promise
                };
            if (h && (x = c.get(h), !x.get || !x.put)) throw new Error("Couldn't use storage '" + h + "', missing get() or put() method!");
            angular.isFunction(J.useSanitizeValueStrategy) && J.useSanitizeValueStrategy(u), t.length && angular.forEach(t, function(a) {
                var d = c.get(a);
                d.setLocale(b || f), angular.isFunction(d.useSanitizeValueStrategy) && d.useSanitizeValueStrategy(u), L[d.getInterpolationIdentifier()] = d
            });
            var R = function(a) {
                    var b = r.defer();
                    return Object.prototype.hasOwnProperty.call(q, a) ? b.resolve(q[a]) : M[a] ? M[a].then(function(a) {
                        E(a.key, a.table), b.resolve(a.table)
                    }, b.reject) : b.reject(), b.promise
                },
                S = function(a, b, c, d) {
                    var e = r.defer();
                    return R(a).then(function(g) {
                        Object.prototype.hasOwnProperty.call(g, b) ? (d.setLocale(a), e.resolve(d.interpolate(g[b], c)), d.setLocale(f)) : e.reject()
                    }, e.reject), e.promise
                },
                T = function(a, b, c, d) {
                    var e, g = q[a];
                    return g && Object.prototype.hasOwnProperty.call(g, b) && (d.setLocale(a), e = d.interpolate(g[b], c), d.setLocale(f)), e
                },
                U = function(a) {
                    if (j) {
                        var b = c.get(j)(a, f);
                        return void 0 !== b ? b : a
                    }
                    return a
                },
                V = function(a, b, c, e) {
                    var f = r.defer();
                    if (a < d.length) {
                        var g = d[a];
                        S(g, b, c, e).then(f.resolve, function() {
                            V(a + 1, b, c, e).then(f.resolve)
                        })
                    } else f.resolve(U(b));
                    return f.promise
                },
                W = function(a, b, c, e) {
                    var f;
                    if (a < d.length) {
                        var g = d[a];
                        f = T(g, b, c, e), f || (f = W(a + 1, b, c, e))
                    }
                    return f
                },
                X = function(a, b, c) {
                    return V(A > 0 ? A : z, a, b, c)
                },
                Y = function(a, b, c) {
                    return W(A > 0 ? A : z, a, b, c)
                },
                Z = function(a, b, c) {
                    var e = r.defer(),
                        g = f ? q[f] : q,
                        h = c ? L[c] : J;
                    if (g && Object.prototype.hasOwnProperty.call(g, a)) {
                        var i = g[a];
                        "@:" === i.substr(0, 2) ? N(i.substr(2), b, c).then(e.resolve, e.reject) : e.resolve(h.interpolate(i, b))
                    } else {
                        var k;
                        j && !K && (k = U(a)), f && d && d.length ? X(a, b, h).then(function(a) {
                            e.resolve(a)
                        }, function(a) {
                            e.reject(O(a))
                        }) : j && !K && k ? e.resolve(k) : e.reject(O(a))
                    }
                    return e.promise
                },
                $ = function(a, b, c) {
                    var e, g = f ? q[f] : q,
                        h = c ? L[c] : J;
                    if (g && Object.prototype.hasOwnProperty.call(g, a)) {
                        var i = g[a];
                        e = "@:" === i.substr(0, 2) ? $(i.substr(2), b, c) : h.interpolate(i, b)
                    } else {
                        var k;
                        j && !K && (k = U(a)), f && d && d.length ? (z = 0, e = Y(a, b, h)) : e = j && !K && k ? k : O(a)
                    }
                    return e
                };
            if (N.preferredLanguage = function(a) {
                    return a && G(a), b
                }, N.cloakClassName = function() {
                    return v
                }, N.fallbackLanguage = function(a) {
                    if (void 0 !== a && null !== a) {
                        if (H(a), l && d && d.length)
                            for (var b = 0, c = d.length; c > b; b++) M[d[b]] || (M[d[b]] = Q(d[b]));
                        N.use(N.use())
                    }
                    return e ? d[0] : d
                }, N.useFallbackLanguage = function(a) {
                    if (void 0 !== a && null !== a)
                        if (a) {
                            var b = B(d, a);
                            b > -1 && (A = b)
                        } else A = 0
                }, N.proposedLanguage = function() {
                    return g
                }, N.storage = function() {
                    return x
                }, N.use = function(a) {
                    if (!a) return f;
                    var b = r.defer();
                    i.$emit("$translateChangeStart", {
                        language: a
                    });
                    var c = D(a);
                    return c && (a = c), q[a] || !l || M[a] ? (b.resolve(a), P(a)) : (g = a, M[a] = Q(a).then(function(c) {
                        return E(c.key, c.table), b.resolve(c.key), P(c.key), g === a && (g = void 0), c
                    }, function(a) {
                        g === a && (g = void 0), i.$emit("$translateChangeError", {
                            language: a
                        }), b.reject(a), i.$emit("$translateChangeEnd", {
                            language: a
                        })
                    })), b.promise
                }, N.storageKey = function() {
                    return I()
                }, N.isPostCompilingEnabled = function() {
                    return w
                }, N.refresh = function(a) {
                    function b() {
                        e.resolve(), i.$emit("$translateRefreshEnd", {
                            language: a
                        })
                    }

                    function c() {
                        e.reject(), i.$emit("$translateRefreshEnd", {
                            language: a
                        })
                    }
                    if (!l) throw new Error("Couldn't refresh translation table, no loader registered!");
                    var e = r.defer();
                    if (i.$emit("$translateRefreshStart", {
                            language: a
                        }), a) q[a] ? Q(a).then(function(c) {
                        E(c.key, c.table), a === f && P(f), b()
                    }, c) : c();
                    else {
                        var g = [],
                            h = {};
                        if (d && d.length)
                            for (var j = 0, k = d.length; k > j; j++) g.push(Q(d[j])), h[d[j]] = !0;
                        f && !h[f] && g.push(Q(f)), r.all(g).then(function(a) {
                            angular.forEach(a, function(a) {
                                q[a.key] && delete q[a.key], E(a.key, a.table)
                            }), f && P(f), b()
                        })
                    }
                    return e.promise
                }, N.instant = function(a, c, e) {
                    if (null === a || angular.isUndefined(a)) return a;
                    if (angular.isArray(a)) {
                        for (var g = {}, h = 0, i = a.length; i > h; h++) g[a[h]] = N.instant(a[h], c, e);
                        return g
                    }
                    if (angular.isString(a) && a.length < 1) return a;
                    a && (a = C.apply(a));
                    var k, l = [];
                    b && l.push(b), f && l.push(f), d && d.length && (l = l.concat(d));
                    for (var m = 0, n = l.length; n > m; m++) {
                        var o = l[m];
                        if (q[o] && "undefined" != typeof q[o][a] && (k = $(a, c, e)), "undefined" != typeof k) break
                    }
                    return k || "" === k || (k = J.interpolate(a, c), j && !K && (k = U(a))), k
                }, N.versionInfo = function() {
                    return y
                }, N.loaderCache = function() {
                    return p
                }, l && (angular.equals(q, {}) && N.use(N.use()), d && d.length))
                for (var _ = function(a) {
                        return E(a.key, a.table), i.$emit("$translateChangeEnd", {
                            language: a.key
                        }), a
                    }, ab = 0, bb = d.length; bb > ab; ab++) M[d[ab]] = Q(d[ab]).then(_);
            return N
        }]
    }]), angular.module("pascalprecht.translate").factory("$translateDefaultInterpolation", ["$interpolate", function(a) {
        var b, c = {},
            d = "default",
            e = null,
            f = {
                escaped: function(a) {
                    var b = {};
                    for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && (b[c] = angular.element("<div></div>").text(a[c]).html());
                    return b
                }
            },
            g = function(a) {
                var b;
                return b = angular.isFunction(f[e]) ? f[e](a) : a
            };
        return c.setLocale = function(a) {
            b = a
        }, c.getInterpolationIdentifier = function() {
            return d
        }, c.useSanitizeValueStrategy = function(a) {
            return e = a, this
        }, c.interpolate = function(b, c) {
            return e && (c = g(c)), a(b)(c || {})
        }, c
    }]), angular.module("pascalprecht.translate").constant("$STORAGE_KEY", "NG_TRANSLATE_LANG_KEY"), angular.module("pascalprecht.translate").directive("translate", ["$translate", "$q", "$interpolate", "$compile", "$parse", "$rootScope", function(a, b, c, d, e, f) {
        return {
            restrict: "AE",
            scope: !0,
            compile: function(b, g) {
                var h = g.translateValues ? g.translateValues : void 0,
                    i = g.translateInterpolation ? g.translateInterpolation : void 0,
                    j = b[0].outerHTML.match(/translate-value-+/i),
                    k = "^(.*)(" + c.startSymbol() + ".*" + c.endSymbol() + ")(.*)",
                    l = "^(.*)" + c.startSymbol() + "(.*)" + c.endSymbol() + "(.*)";
                return function(b, m, n) {
                    b.interpolateParams = {}, b.preText = "", b.postText = "";
                    var o = {},
                        p = function(a) {
                            if (angular.equals(a, "") || !angular.isDefined(a)) {
                                var d = m.text().match(k);
                                angular.isArray(d) ? (b.preText = d[1], b.postText = d[3], o.translate = c(d[2])(b.$parent), watcherMatches = m.text().match(l), angular.isArray(watcherMatches) && watcherMatches[2] && watcherMatches[2].length && b.$watch(watcherMatches[2], function(a) {
                                    o.translate = a, u()
                                })) : o.translate = m.text().replace(/^\s+|\s+$/g, "")
                            } else o.translate = a;
                            u()
                        },
                        q = function(a) {
                            n.$observe(a, function(b) {
                                o[a] = b, u()
                            })
                        };
                    n.$observe("translate", function(a) {
                        p(a)
                    });
                    for (var r in n) n.hasOwnProperty(r) && "translateAttr" === r.substr(0, 13) && q(r);
                    if (n.$observe("translateDefault", function(a) {
                            b.defaultText = a
                        }), h && n.$observe("translateValues", function(a) {
                            a && b.$parent.$watch(function() {
                                angular.extend(b.interpolateParams, e(a)(b.$parent))
                            })
                        }), j) {
                        var s = function(a) {
                            n.$observe(a, function(c) {
                                var d = angular.lowercase(a.substr(14, 1)) + a.substr(15);
                                b.interpolateParams[d] = c
                            })
                        };
                        for (var t in n) Object.prototype.hasOwnProperty.call(n, t) && "translateValue" === t.substr(0, 14) && "translateValues" !== t && s(t)
                    }
                    var u = function() {
                            for (var a in o) o.hasOwnProperty(a) && o[a] && v(a, o[a], b, b.interpolateParams)
                        },
                        v = function(b, c, d, e) {
                            a(c, e, i).then(function(a) {
                                w(a, d, !0, b)
                            }, function(a) {
                                w(a, d, !1, b)
                            })
                        },
                        w = function(b, c, e, f) {
                            if ("translate" === f) {
                                e || "undefined" == typeof c.defaultText || (b = c.defaultText), m.html(c.preText + b + c.postText);
                                var h = a.isPostCompilingEnabled(),
                                    i = "undefined" != typeof g.translateCompile,
                                    j = i && "false" !== g.translateCompile;
                                (h && !i || j) && d(m.contents())(c)
                            } else {
                                e || "undefined" == typeof c.defaultText || (b = c.defaultText);
                                var k = n.$attr[f].substr(15);
                                m.attr(k, b)
                            }
                        };
                    b.$watch("interpolateParams", u, !0);
                    var x = f.$on("$translateChangeSuccess", u);
                    m.text().length && p(""), u(), b.$on("$destroy", x)
                }
            }
        }
    }]), angular.module("pascalprecht.translate").directive("translateCloak", ["$rootScope", "$translate", function(a, b) {
        return {
            compile: function(c) {
                var d = function() {
                        c.addClass(b.cloakClassName())
                    },
                    e = function() {
                        c.removeClass(b.cloakClassName())
                    },
                    f = a.$on("$translateChangeEnd", function() {
                        e(), f(), f = null
                    });
                return d(),
                    function(a, c, f) {
                        f.translateCloak && f.translateCloak.length && f.$observe("translateCloak", function(a) {
                            b(a).then(e, d)
                        })
                    }
            }
        }
    }]), angular.module("pascalprecht.translate").filter("translate", ["$parse", "$translate", function(a, b) {
        var c = function(c, d, e) {
            return angular.isObject(d) || (d = a(d)(this)), b.instant(c, d, e)
        };
        return c.$stateful = !0, c
    }]), "undefined" != typeof module && "undefined" != typeof exports && module.exports === exports && (module.exports = "ui.router"),
    function(a, b, c) {
        "use strict";

        function d(a, b) {
            return M(new(M(function() {}, {
                prototype: a
            })), b)
        }

        function e(a) {
            return L(arguments, function(b) {
                b !== a && L(b, function(b, c) {
                    a.hasOwnProperty(c) || (a[c] = b)
                })
            }), a
        }

        function f(a, b) {
            var c = [];
            for (var d in a.path) {
                if (a.path[d] !== b.path[d]) break;
                c.push(a.path[d])
            }
            return c
        }

        function g(a) {
            if (Object.keys) return Object.keys(a);
            var c = [];
            return b.forEach(a, function(a, b) {
                c.push(b)
            }), c
        }

        function h(a, b) {
            if (Array.prototype.indexOf) return a.indexOf(b, Number(arguments[2]) || 0);
            var c = a.length >>> 0,
                d = Number(arguments[2]) || 0;
            for (d = 0 > d ? Math.ceil(d) : Math.floor(d), 0 > d && (d += c); c > d; d++)
                if (d in a && a[d] === b) return d;
            return -1
        }

        function i(a, b, c, d) {
            var e, i = f(c, d),
                j = {},
                k = [];
            for (var l in i)
                if (i[l].params && (e = g(i[l].params), e.length))
                    for (var m in e) h(k, e[m]) >= 0 || (k.push(e[m]), j[e[m]] = a[e[m]]);
            return M({}, j, b)
        }

        function j(a, b, c) {
            if (!c) {
                c = [];
                for (var d in a) c.push(d)
            }
            for (var e = 0; e < c.length; e++) {
                var f = c[e];
                if (a[f] != b[f]) return !1
            }
            return !0
        }

        function k(a, b) {
            var c = {};
            return L(a, function(a) {
                c[a] = b[a]
            }), c
        }

        function l(a) {
            var b = {},
                c = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
            for (var d in a) - 1 == h(c, d) && (b[d] = a[d]);
            return b
        }

        function m(a, b) {
            var c = K(a),
                d = c ? [] : {};
            return L(a, function(a, e) {
                b(a, e) && (d[c ? d.length : e] = a)
            }), d
        }

        function n(a, b) {
            var c = K(a) ? [] : {};
            return L(a, function(a, d) {
                c[d] = b(a, d)
            }), c
        }

        function o(a, b) {
            var d = 1,
                f = 2,
                i = {},
                j = [],
                k = i,
                m = M(a.when(i), {
                    $$promises: i,
                    $$values: i
                });
            this.study = function(i) {
                function n(a, c) {
                    if (s[c] !== f) {
                        if (r.push(c), s[c] === d) throw r.splice(0, h(r, c)), new Error("Cyclic dependency: " + r.join(" -> "));
                        if (s[c] = d, I(a)) q.push(c, [function() {
                            return b.get(a)
                        }], j);
                        else {
                            var e = b.annotate(a);
                            L(e, function(a) {
                                a !== c && i.hasOwnProperty(a) && n(i[a], a)
                            }), q.push(c, a, e)
                        }
                        r.pop(), s[c] = f
                    }
                }

                function o(a) {
                    return J(a) && a.then && a.$$promises
                }
                if (!J(i)) throw new Error("'invocables' must be an object");
                var p = g(i || {}),
                    q = [],
                    r = [],
                    s = {};
                return L(i, n), i = r = s = null,
                    function(d, f, g) {
                        function h() {
                            --u || (v || e(t, f.$$values), r.$$values = t, r.$$promises = r.$$promises || !0, delete r.$$inheritedValues, n.resolve(t))
                        }

                        function i(a) {
                            r.$$failure = a, n.reject(a)
                        }

                        function j(c, e, f) {
                            function j(a) {
                                l.reject(a), i(a)
                            }

                            function k() {
                                if (!G(r.$$failure)) try {
                                    l.resolve(b.invoke(e, g, t)), l.promise.then(function(a) {
                                        t[c] = a, h()
                                    }, j)
                                } catch (a) {
                                    j(a)
                                }
                            }
                            var l = a.defer(),
                                m = 0;
                            L(f, function(a) {
                                s.hasOwnProperty(a) && !d.hasOwnProperty(a) && (m++, s[a].then(function(b) {
                                    t[a] = b, --m || k()
                                }, j))
                            }), m || k(), s[c] = l.promise
                        }
                        if (o(d) && g === c && (g = f, f = d, d = null), d) {
                            if (!J(d)) throw new Error("'locals' must be an object")
                        } else d = k;
                        if (f) {
                            if (!o(f)) throw new Error("'parent' must be a promise returned by $resolve.resolve()")
                        } else f = m;
                        var n = a.defer(),
                            r = n.promise,
                            s = r.$$promises = {},
                            t = M({}, d),
                            u = 1 + q.length / 3,
                            v = !1;
                        if (G(f.$$failure)) return i(f.$$failure), r;
                        f.$$inheritedValues && e(t, l(f.$$inheritedValues, p)), M(s, f.$$promises), f.$$values ? (v = e(t, l(f.$$values, p)), r.$$inheritedValues = l(f.$$values, p), h()) : (f.$$inheritedValues && (r.$$inheritedValues = l(f.$$inheritedValues, p)), f.then(h, i));
                        for (var w = 0, x = q.length; x > w; w += 3) d.hasOwnProperty(q[w]) ? h() : j(q[w], q[w + 1], q[w + 2]);
                        return r
                    }
            }, this.resolve = function(a, b, c, d) {
                return this.study(a)(b, c, d)
            }
        }

        function p(a, b, c) {
            this.fromConfig = function(a, b, c) {
                return G(a.template) ? this.fromString(a.template, b) : G(a.templateUrl) ? this.fromUrl(a.templateUrl, b) : G(a.templateProvider) ? this.fromProvider(a.templateProvider, b, c) : null
            }, this.fromString = function(a, b) {
                return H(a) ? a(b) : a
            }, this.fromUrl = function(c, d) {
                return H(c) && (c = c(d)), null == c ? null : a.get(c, {
                    cache: b,
                    headers: {
                        Accept: "text/html"
                    }
                }).then(function(a) {
                    return a.data
                })
            }, this.fromProvider = function(a, b, d) {
                return c.invoke(a, null, d || {
                    params: b
                })
            }
        }

        function q(a, b, e) {
            function f(b, c, d, e) {
                if (q.push(b), o[b]) return o[b];
                if (!/^\w+(-+\w+)*(?:\[\])?$/.test(b)) throw new Error("Invalid parameter name '" + b + "' in pattern '" + a + "'");
                if (p[b]) throw new Error("Duplicate parameter name '" + b + "' in pattern '" + a + "'");
                return p[b] = new O.Param(b, c, d, e), p[b]
            }

            function g(a, b, c) {
                var d = ["", ""],
                    e = a.replace(/[\\\[\]\^$*+?.()|{}]/g, "\\$&");
                if (!b) return e;
                switch (c) {
                    case !1:
                        d = ["(", ")"];
                        break;
                    case !0:
                        d = ["?(", ")?"];
                        break;
                    default:
                        d = ["(" + c + "|", ")?"]
                }
                return e + d[0] + b + d[1]
            }

            function h(c, e) {
                var f, g, h, i, j;
                return f = c[2] || c[3], j = b.params[f], h = a.substring(m, c.index), g = e ? c[4] : c[4] || ("*" == c[1] ? ".*" : null), i = O.type(g || "string") || d(O.type("string"), {
                    pattern: new RegExp(g)
                }), {
                    id: f,
                    regexp: g,
                    segment: h,
                    type: i,
                    cfg: j
                }
            }
            b = M({
                params: {}
            }, J(b) ? b : {});
            var i, j = /([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,
                k = /([:]?)([\w\[\]-]+)|\{([\w\[\]-]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,
                l = "^",
                m = 0,
                n = this.segments = [],
                o = e ? e.params : {},
                p = this.params = e ? e.params.$$new() : new O.ParamSet,
                q = [];
            this.source = a;
            for (var r, s, t;
                (i = j.exec(a)) && (r = h(i, !1), !(r.segment.indexOf("?") >= 0));) s = f(r.id, r.type, r.cfg, "path"), l += g(r.segment, s.type.pattern.source, s.squash), n.push(r.segment), m = j.lastIndex;
            t = a.substring(m);
            var u = t.indexOf("?");
            if (u >= 0) {
                var v = this.sourceSearch = t.substring(u);
                if (t = t.substring(0, u), this.sourcePath = a.substring(0, m + u), v.length > 0)
                    for (m = 0; i = k.exec(v);) r = h(i, !0), s = f(r.id, r.type, r.cfg, "search"), m = j.lastIndex
            } else this.sourcePath = a, this.sourceSearch = "";
            l += g(t) + (b.strict === !1 ? "/?" : "") + "$", n.push(t), this.regexp = new RegExp(l, b.caseInsensitive ? "i" : c), this.prefix = n[0], this.$$paramNames = q
        }

        function r(a) {
            M(this, a)
        }

        function s() {
            function a(a) {
                return null != a ? a.toString().replace(/\//g, "%2F") : a
            }

            function e(a) {
                return null != a ? a.toString().replace(/%2F/g, "/") : a
            }

            function f(a) {
                return this.pattern.test(a)
            }

            function i() {
                return {
                    strict: t,
                    caseInsensitive: p
                }
            }

            function j(a) {
                return H(a) || K(a) && H(a[a.length - 1])
            }

            function k() {
                for (; x.length;) {
                    var a = x.shift();
                    if (a.pattern) throw new Error("You cannot override a type's .pattern at runtime.");
                    b.extend(v[a.name], o.invoke(a.def))
                }
            }

            function l(a) {
                M(this, a || {})
            }
            O = this;
            var o, p = !1,
                t = !0,
                u = !1,
                v = {},
                w = !0,
                x = [],
                y = {
                    string: {
                        encode: a,
                        decode: e,
                        is: f,
                        pattern: /[^/]*/
                    },
                    "int": {
                        encode: a,
                        decode: function(a) {
                            return parseInt(a, 10)
                        },
                        is: function(a) {
                            return G(a) && this.decode(a.toString()) === a
                        },
                        pattern: /\d+/
                    },
                    bool: {
                        encode: function(a) {
                            return a ? 1 : 0
                        },
                        decode: function(a) {
                            return 0 !== parseInt(a, 10)
                        },
                        is: function(a) {
                            return a === !0 || a === !1
                        },
                        pattern: /0|1/
                    },
                    date: {
                        encode: function(a) {
                            return this.is(a) ? [a.getFullYear(), ("0" + (a.getMonth() + 1)).slice(-2), ("0" + a.getDate()).slice(-2)].join("-") : c
                        },
                        decode: function(a) {
                            if (this.is(a)) return a;
                            var b = this.capture.exec(a);
                            return b ? new Date(b[1], b[2] - 1, b[3]) : c
                        },
                        is: function(a) {
                            return a instanceof Date && !isNaN(a.valueOf())
                        },
                        equals: function(a, b) {
                            return this.is(a) && this.is(b) && a.toISOString() === b.toISOString()
                        },
                        pattern: /[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,
                        capture: /([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/
                    },
                    json: {
                        encode: b.toJson,
                        decode: b.fromJson,
                        is: b.isObject,
                        equals: b.equals,
                        pattern: /[^/]*/
                    },
                    any: {
                        encode: b.identity,
                        decode: b.identity,
                        is: b.identity,
                        equals: b.equals,
                        pattern: /.*/
                    }
                };
            s.$$getDefaultValue = function(a) {
                if (!j(a.value)) return a.value;
                if (!o) throw new Error("Injectable functions cannot be called at configuration time");
                return o.invoke(a.value)
            }, this.caseInsensitive = function(a) {
                return G(a) && (p = a), p
            }, this.strictMode = function(a) {
                return G(a) && (t = a), t
            }, this.defaultSquashPolicy = function(a) {
                if (!G(a)) return u;
                if (a !== !0 && a !== !1 && !I(a)) throw new Error("Invalid squash policy: " + a + ". Valid policies: false, true, arbitrary-string");
                return u = a, a
            }, this.compile = function(a, b) {
                return new q(a, M(i(), b))
            }, this.isMatcher = function(a) {
                if (!J(a)) return !1;
                var b = !0;
                return L(q.prototype, function(c, d) {
                    H(c) && (b = b && G(a[d]) && H(a[d]))
                }), b
            }, this.type = function(a, b, c) {
                if (!G(b)) return v[a];
                if (v.hasOwnProperty(a)) throw new Error("A type named '" + a + "' has already been defined.");
                return v[a] = new r(M({
                    name: a
                }, b)), c && (x.push({
                    name: a,
                    def: c
                }), w || k()), this
            }, L(y, function(a, b) {
                v[b] = new r(M({
                    name: b
                }, a))
            }), v = d(v, {}), this.$get = ["$injector", function(a) {
                return o = a, w = !1, k(), L(y, function(a, b) {
                    v[b] || (v[b] = new r(a))
                }), this
            }], this.Param = function(a, b, d, e) {
                function f(a) {
                    var b = J(a) ? g(a) : [],
                        c = -1 === h(b, "value") && -1 === h(b, "type") && -1 === h(b, "squash") && -1 === h(b, "array");
                    return c && (a = {
                        value: a
                    }), a.$$fn = j(a.value) ? a.value : function() {
                        return a.value
                    }, a
                }

                function i(b, c, d) {
                    if (b.type && c) throw new Error("Param '" + a + "' has two type configurations.");
                    return c ? c : b.type ? b.type instanceof r ? b.type : new r(b.type) : "config" === d ? v.any : v.string
                }

                function k() {
                    var b = {
                            array: "search" === e ? "auto" : !1
                        },
                        c = a.match(/\[\]$/) ? {
                            array: !0
                        } : {};
                    return M(b, c, d).array
                }

                function l(a, b) {
                    var c = a.squash;
                    if (!b || c === !1) return !1;
                    if (!G(c) || null == c) return u;
                    if (c === !0 || I(c)) return c;
                    throw new Error("Invalid squash policy: '" + c + "'. Valid policies: false, true, or arbitrary string")
                }

                function p(a, b, d, e) {
                    var f, g, i = [{
                        from: "",
                        to: d || b ? c : ""
                    }, {
                        from: null,
                        to: d || b ? c : ""
                    }];
                    return f = K(a.replace) ? a.replace : [], I(e) && f.push({
                        from: e,
                        to: c
                    }), g = n(f, function(a) {
                        return a.from
                    }), m(i, function(a) {
                        return -1 === h(g, a.from)
                    }).concat(f)
                }

                function q() {
                    if (!o) throw new Error("Injectable functions cannot be called at configuration time");
                    return o.invoke(d.$$fn)
                }

                function s(a) {
                    function b(a) {
                        return function(b) {
                            return b.from === a
                        }
                    }

                    function c(a) {
                        var c = n(m(w.replace, b(a)), function(a) {
                            return a.to
                        });
                        return c.length ? c[0] : a
                    }
                    return a = c(a), G(a) ? w.type.decode(a) : q()
                }

                function t() {
                    return "{Param:" + a + " " + b + " squash: '" + z + "' optional: " + y + "}"
                }
                var w = this;
                d = f(d), b = i(d, b, e);
                var x = k();
                b = x ? b.$asArray(x, "search" === e) : b, "string" !== b.name || x || "path" !== e || d.value !== c || (d.value = "");
                var y = d.value !== c,
                    z = l(d, y),
                    A = p(d, x, y, z);
                M(this, {
                    id: a,
                    type: b,
                    location: e,
                    array: x,
                    squash: z,
                    replace: A,
                    isOptional: y,
                    value: s,
                    dynamic: c,
                    config: d,
                    toString: t
                })
            }, l.prototype = {
                $$new: function() {
                    return d(this, M(new l, {
                        $$parent: this
                    }))
                },
                $$keys: function() {
                    for (var a = [], b = [], c = this, d = g(l.prototype); c;) b.push(c), c = c.$$parent;
                    return b.reverse(), L(b, function(b) {
                        L(g(b), function(b) {
                            -1 === h(a, b) && -1 === h(d, b) && a.push(b)
                        })
                    }), a
                },
                $$values: function(a) {
                    var b = {},
                        c = this;
                    return L(c.$$keys(), function(d) {
                        b[d] = c[d].value(a && a[d])
                    }), b
                },
                $$equals: function(a, b) {
                    var c = !0,
                        d = this;
                    return L(d.$$keys(), function(e) {
                        var f = a && a[e],
                            g = b && b[e];
                        d[e].type.equals(f, g) || (c = !1)
                    }), c
                },
                $$validates: function(a) {
                    var b, c, d, e = !0,
                        f = this;
                    return L(this.$$keys(), function(g) {
                        d = f[g], c = a[g], b = !c && d.isOptional, e = e && (b || !!d.type.is(c))
                    }), e
                },
                $$parent: c
            }, this.ParamSet = l
        }

        function t(a, d) {
            function e(a) {
                var b = /^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(a.source);
                return null != b ? b[1].replace(/\\(.)/g, "$1") : ""
            }

            function f(a, b) {
                return a.replace(/\$(\$|\d{1,2})/, function(a, c) {
                    return b["$" === c ? 0 : Number(c)]
                })
            }

            function g(a, b, c) {
                if (!c) return !1;
                var d = a.invoke(b, b, {
                    $match: c
                });
                return G(d) ? d : !0
            }

            function h(d, e, f, g) {
                function h(a, b, c) {
                    return "/" === p ? a : b ? p.slice(0, -1) + a : c ? p.slice(1) + a : a
                }

                function m(a) {
                    function b(a) {
                        var b = a(f, d);
                        return b ? (I(b) && d.replace().url(b), !0) : !1
                    }
                    if (!a || !a.defaultPrevented) {
                        var e = o && d.url() === o;
                        if (o = c, e) return !0;
                        var g, h = j.length;
                        for (g = 0; h > g; g++)
                            if (b(j[g])) return;
                        k && b(k)
                    }
                }

                function n() {
                    return i = i || e.$on("$locationChangeSuccess", m)
                }
                var o, p = g.baseHref(),
                    q = d.url();
                return l || n(), {
                    sync: function() {
                        m()
                    },
                    listen: function() {
                        return n()
                    },
                    update: function(a) {
                        return a ? void(q = d.url()) : void(d.url() !== q && (d.url(q), d.replace()))
                    },
                    push: function(a, b, e) {
                        d.url(a.format(b || {})), o = e && e.$$avoidResync ? d.url() : c, e && e.replace && d.replace()
                    },
                    href: function(c, e, f) {
                        if (!c.validates(e)) return null;
                        var g = a.html5Mode();
                        b.isObject(g) && (g = g.enabled);
                        var i = c.format(e);
                        if (f = f || {}, g || null === i || (i = "#" + a.hashPrefix() + i), i = h(i, g, f.absolute), !f.absolute || !i) return i;
                        var j = !g && i ? "/" : "",
                            k = d.port();
                        return k = 80 === k || 443 === k ? "" : ":" + k, [d.protocol(), "://", d.host(), k, j, i].join("")
                    }
                }
            }
            var i, j = [],
                k = null,
                l = !1;
            this.rule = function(a) {
                if (!H(a)) throw new Error("'rule' must be a function");
                return j.push(a), this
            }, this.otherwise = function(a) {
                if (I(a)) {
                    var b = a;
                    a = function() {
                        return b
                    }
                } else if (!H(a)) throw new Error("'rule' must be a function");
                return k = a, this
            }, this.when = function(a, b) {
                var c, h = I(b);
                if (I(a) && (a = d.compile(a)), !h && !H(b) && !K(b)) throw new Error("invalid 'handler' in when()");
                var i = {
                        matcher: function(a, b) {
                            return h && (c = d.compile(b), b = ["$match", function(a) {
                                return c.format(a)
                            }]), M(function(c, d) {
                                return g(c, b, a.exec(d.path(), d.search()))
                            }, {
                                prefix: I(a.prefix) ? a.prefix : ""
                            })
                        },
                        regex: function(a, b) {
                            if (a.global || a.sticky) throw new Error("when() RegExp must not be global or sticky");
                            return h && (c = b, b = ["$match", function(a) {
                                return f(c, a)
                            }]), M(function(c, d) {
                                return g(c, b, a.exec(d.path()))
                            }, {
                                prefix: e(a)
                            })
                        }
                    },
                    j = {
                        matcher: d.isMatcher(a),
                        regex: a instanceof RegExp
                    };
                for (var k in j)
                    if (j[k]) return this.rule(i[k](a, b));
                throw new Error("invalid 'what' in when()")
            }, this.deferIntercept = function(a) {
                a === c && (a = !0), l = a
            }, this.$get = h, h.$inject = ["$location", "$rootScope", "$injector", "$browser"]
        }

        function u(a, e) {
            function f(a) {
                return 0 === a.indexOf(".") || 0 === a.indexOf("^")
            }

            function l(a, b) {
                if (!a) return c;
                var d = I(a),
                    e = d ? a : a.name,
                    g = f(e);
                if (g) {
                    if (!b) throw new Error("No reference point given for path '" + e + "'");
                    b = l(b);
                    for (var h = e.split("."), i = 0, j = h.length, k = b; j > i; i++)
                        if ("" !== h[i] || 0 !== i) {
                            if ("^" !== h[i]) break;
                            if (!k.parent) throw new Error("Path '" + e + "' not valid for state '" + b.name + "'");
                            k = k.parent
                        } else k = b;
                    h = h.slice(i).join("."), e = k.name + (k.name && h ? "." : "") + h
                }
                var m = y[e];
                return !m || !d && (d || m !== a && m.self !== a) ? c : m
            }

            function m(a, b) {
                z[a] || (z[a] = []), z[a].push(b)
            }

            function o(a) {
                for (var b = z[a] || []; b.length;) p(b.shift())
            }

            function p(b) {
                b = d(b, {
                    self: b,
                    resolve: b.resolve || {},
                    toString: function() {
                        return this.name
                    }
                });
                var c = b.name;
                if (!I(c) || c.indexOf("@") >= 0) throw new Error("State must have a valid name");
                if (y.hasOwnProperty(c)) throw new Error("State '" + c + "'' is already defined");
                var e = -1 !== c.indexOf(".") ? c.substring(0, c.lastIndexOf(".")) : I(b.parent) ? b.parent : J(b.parent) && I(b.parent.name) ? b.parent.name : "";
                if (e && !y[e]) return m(e, b.self);
                for (var f in B) H(B[f]) && (b[f] = B[f](b, B.$delegates[f]));
                return y[c] = b, !b[A] && b.url && a.when(b.url, ["$match", "$stateParams", function(a, c) {
                    x.$current.navigable == b && j(a, c) || x.transitionTo(b, a, {
                        inherit: !0,
                        location: !1
                    })
                }]), o(c), b
            }

            function q(a) {
                return a.indexOf("*") > -1
            }

            function r(a) {
                var b = a.split("."),
                    c = x.$current.name.split(".");
                if ("**" === b[0] && (c = c.slice(h(c, b[1])), c.unshift("**")), "**" === b[b.length - 1] && (c.splice(h(c, b[b.length - 2]) + 1, Number.MAX_VALUE), c.push("**")), b.length != c.length) return !1;
                for (var d = 0, e = b.length; e > d; d++) "*" === b[d] && (c[d] = "*");
                return c.join("") === b.join("")
            }

            function s(a, b) {
                return I(a) && !G(b) ? B[a] : H(b) && I(a) ? (B[a] && !B.$delegates[a] && (B.$delegates[a] = B[a]), B[a] = b, this) : this
            }

            function t(a, b) {
                return J(a) ? b = a : b.name = a, p(b), this
            }

            function u(a, e, f, h, m, o, p) {
                function s(b, c, d, f) {
                    var g = a.$broadcast("$stateNotFound", b, c, d);
                    if (g.defaultPrevented) return p.update(), B;
                    if (!g.retry) return null;
                    if (f.$retry) return p.update(), C;
                    var h = x.transition = e.when(g.retry);
                    return h.then(function() {
                        return h !== x.transition ? u : (b.options.$retry = !0, x.transitionTo(b.to, b.toParams, b.options))
                    }, function() {
                        return B
                    }), p.update(), h
                }

                function t(a, c, d, g, i, j) {
                    var l = d ? c : k(a.params.$$keys(), c),
                        n = {
                            $stateParams: l
                        };
                    i.resolve = m.resolve(a.resolve, n, i.resolve, a);
                    var o = [i.resolve.then(function(a) {
                        i.globals = a
                    })];
                    return g && o.push(g), L(a.views, function(c, d) {
                        var e = c.resolve && c.resolve !== a.resolve ? c.resolve : {};
                        e.$template = [function() {
                            return f.load(d, {
                                view: c,
                                locals: n,
                                params: l,
                                notify: j.notify
                            }) || ""
                        }], o.push(m.resolve(e, n, i.resolve, a).then(function(f) {
                            if (H(c.controllerProvider) || K(c.controllerProvider)) {
                                var g = b.extend({}, e, n);
                                f.$$controller = h.invoke(c.controllerProvider, null, g)
                            } else f.$$controller = c.controller;
                            f.$$state = a, f.$$controllerAs = c.controllerAs, i[d] = f
                        }))
                    }), e.all(o).then(function() {
                        return i
                    })
                }
                var u = e.reject(new Error("transition superseded")),
                    z = e.reject(new Error("transition prevented")),
                    B = e.reject(new Error("transition aborted")),
                    C = e.reject(new Error("transition failed"));
                return w.locals = {
                    resolve: null,
                    globals: {
                        $stateParams: {}
                    }
                }, x = {
                    params: {},
                    current: w.self,
                    $current: w,
                    transition: null
                }, x.reload = function() {
                    return x.transitionTo(x.current, o, {
                        reload: !0,
                        inherit: !1,
                        notify: !0
                    })
                }, x.go = function(a, b, c) {
                    return x.transitionTo(a, b, M({
                        inherit: !0,
                        relative: x.$current
                    }, c))
                }, x.transitionTo = function(b, c, f) {
                    c = c || {}, f = M({
                        location: !0,
                        inherit: !1,
                        relative: null,
                        notify: !0,
                        reload: !1,
                        $retry: !1
                    }, f || {});
                    var g, j = x.$current,
                        m = x.params,
                        n = j.path,
                        q = l(b, f.relative);
                    if (!G(q)) {
                        var r = {
                                to: b,
                                toParams: c,
                                options: f
                            },
                            y = s(r, j.self, m, f);
                        if (y) return y;
                        if (b = r.to, c = r.toParams, f = r.options, q = l(b, f.relative), !G(q)) {
                            if (!f.relative) throw new Error("No such state '" + b + "'");
                            throw new Error("Could not resolve '" + b + "' from state '" + f.relative + "'")
                        }
                    }
                    if (q[A]) throw new Error("Cannot transition to abstract state '" + b + "'");
                    if (f.inherit && (c = i(o, c || {}, x.$current, q)), !q.params.$$validates(c)) return C;
                    c = q.params.$$values(c), b = q;
                    var B = b.path,
                        D = 0,
                        E = B[D],
                        F = w.locals,
                        H = [];
                    if (!f.reload)
                        for (; E && E === n[D] && E.ownParams.$$equals(c, m);) F = H[D] = E.locals, D++, E = B[D];
                    if (v(b, j, F, f)) return b.self.reloadOnSearch !== !1 && p.update(), x.transition = null, e.when(x.current);
                    if (c = k(b.params.$$keys(), c || {}), f.notify && a.$broadcast("$stateChangeStart", b.self, c, j.self, m).defaultPrevented) return p.update(), z;
                    for (var I = e.when(F), J = D; J < B.length; J++, E = B[J]) F = H[J] = d(F), I = t(E, c, E === b, I, F, f);
                    var K = x.transition = I.then(function() {
                        var d, e, g;
                        if (x.transition !== K) return u;
                        for (d = n.length - 1; d >= D; d--) g = n[d], g.self.onExit && h.invoke(g.self.onExit, g.self, g.locals.globals), g.locals = null;
                        for (d = D; d < B.length; d++) e = B[d], e.locals = H[d], e.self.onEnter && h.invoke(e.self.onEnter, e.self, e.locals.globals);
                        return x.transition !== K ? u : (x.$current = b, x.current = b.self, x.params = c, N(x.params, o), x.transition = null, f.location && b.navigable && p.push(b.navigable.url, b.navigable.locals.globals.$stateParams, {
                            $$avoidResync: !0,
                            replace: "replace" === f.location
                        }), f.notify && a.$broadcast("$stateChangeSuccess", b.self, c, j.self, m), p.update(!0), x.current)
                    }, function(d) {
                        return x.transition !== K ? u : (x.transition = null, g = a.$broadcast("$stateChangeError", b.self, c, j.self, m, d), g.defaultPrevented || p.update(), e.reject(d))
                    });
                    return K
                }, x.is = function(a, b, d) {
                    d = M({
                        relative: x.$current
                    }, d || {});
                    var e = l(a, d.relative);
                    return G(e) ? x.$current !== e ? !1 : b ? j(e.params.$$values(b), o) : !0 : c
                }, x.includes = function(a, b, d) {
                    if (d = M({
                            relative: x.$current
                        }, d || {}), I(a) && q(a)) {
                        if (!r(a)) return !1;
                        a = x.$current.name
                    }
                    var e = l(a, d.relative);
                    return G(e) ? G(x.$current.includes[e.name]) ? b ? j(e.params.$$values(b), o, g(b)) : !0 : !1 : c
                }, x.href = function(a, b, d) {
                    d = M({
                        lossy: !0,
                        inherit: !0,
                        absolute: !1,
                        relative: x.$current
                    }, d || {});
                    var e = l(a, d.relative);
                    if (!G(e)) return null;
                    d.inherit && (b = i(o, b || {}, x.$current, e));
                    var f = e && d.lossy ? e.navigable : e;
                    return f && f.url !== c && null !== f.url ? p.href(f.url, k(e.params.$$keys(), b || {}), {
                        absolute: d.absolute
                    }) : null
                }, x.get = function(a, b) {
                    if (0 === arguments.length) return n(g(y), function(a) {
                        return y[a].self
                    });
                    var c = l(a, b || x.$current);
                    return c && c.self ? c.self : null
                }, x
            }

            function v(a, b, c, d) {
                return a !== b || (c !== b.locals || d.reload) && a.self.reloadOnSearch !== !1 ? void 0 : !0
            }
            var w, x, y = {},
                z = {},
                A = "abstract",
                B = {
                    parent: function(a) {
                        if (G(a.parent) && a.parent) return l(a.parent);
                        var b = /^(.+)\.[^.]+$/.exec(a.name);
                        return b ? l(b[1]) : w
                    },
                    data: function(a) {
                        return a.parent && a.parent.data && (a.data = a.self.data = M({}, a.parent.data, a.data)), a.data
                    },
                    url: function(a) {
                        var b = a.url,
                            c = {
                                params: a.params || {}
                            };
                        if (I(b)) return "^" == b.charAt(0) ? e.compile(b.substring(1), c) : (a.parent.navigable || w).url.concat(b, c);
                        if (!b || e.isMatcher(b)) return b;
                        throw new Error("Invalid url '" + b + "' in state '" + a + "'")
                    },
                    navigable: function(a) {
                        return a.url ? a : a.parent ? a.parent.navigable : null
                    },
                    ownParams: function(a) {
                        var b = a.url && a.url.params || new O.ParamSet;
                        return L(a.params || {}, function(a, c) {
                            b[c] || (b[c] = new O.Param(c, null, a, "config"))
                        }), b
                    },
                    params: function(a) {
                        return a.parent && a.parent.params ? M(a.parent.params.$$new(), a.ownParams) : new O.ParamSet
                    },
                    views: function(a) {
                        var b = {};
                        return L(G(a.views) ? a.views : {
                            "": a
                        }, function(c, d) {
                            d.indexOf("@") < 0 && (d += "@" + a.parent.name), b[d] = c
                        }), b
                    },
                    path: function(a) {
                        return a.parent ? a.parent.path.concat(a) : []
                    },
                    includes: function(a) {
                        var b = a.parent ? M({}, a.parent.includes) : {};
                        return b[a.name] = !0, b
                    },
                    $delegates: {}
                };
            w = p({
                name: "",
                url: "^",
                views: null,
                "abstract": !0
            }), w.navigable = null, this.decorator = s, this.state = t, this.$get = u, u.$inject = ["$rootScope", "$q", "$view", "$injector", "$resolve", "$stateParams", "$urlRouter", "$location", "$urlMatcherFactory"]
        }

        function v() {
            function a(a, b) {
                return {
                    load: function(c, d) {
                        var e, f = {
                            template: null,
                            controller: null,
                            view: null,
                            locals: null,
                            notify: !0,
                            async: !0,
                            params: {}
                        };
                        return d = M(f, d), d.view && (e = b.fromConfig(d.view, d.params, d.locals)), e && d.notify && a.$broadcast("$viewContentLoading", d), e
                    }
                }
            }
            this.$get = a, a.$inject = ["$rootScope", "$templateFactory"]
        }

        function w() {
            var a = !1;
            this.useAnchorScroll = function() {
                a = !0
            }, this.$get = ["$anchorScroll", "$timeout", function(b, c) {
                return a ? b : function(a) {
                    c(function() {
                        a[0].scrollIntoView()
                    }, 0, !1)
                }
            }]
        }

        function x(a, c, d, e) {
            function f() {
                return c.has ? function(a) {
                    return c.has(a) ? c.get(a) : null
                } : function(a) {
                    try {
                        return c.get(a)
                    } catch (b) {
                        return null
                    }
                }
            }

            function g(a, b) {
                var c = function() {
                    return {
                        enter: function(a, b, c) {
                            b.after(a), c()
                        },
                        leave: function(a, b) {
                            a.remove(), b()
                        }
                    }
                };
                if (j) return {
                    enter: function(a, b, c) {
                        var d = j.enter(a, null, b, c);
                        d && d.then && d.then(c)
                    },
                    leave: function(a, b) {
                        var c = j.leave(a, b);
                        c && c.then && c.then(b)
                    }
                };
                if (i) {
                    var d = i && i(b, a);
                    return {
                        enter: function(a, b, c) {
                            d.enter(a, null, b), c()
                        },
                        leave: function(a, b) {
                            d.leave(a), b()
                        }
                    }
                }
                return c()
            }
            var h = f(),
                i = h("$animator"),
                j = h("$animate"),
                k = {
                    restrict: "ECA",
                    terminal: !0,
                    priority: 400,
                    transclude: "element",
                    compile: function(c, f, h) {
                        return function(c, f, i) {
                            function j() {
                                l && (l.remove(), l = null), n && (n.$destroy(), n = null), m && (r.leave(m, function() {
                                    l = null
                                }), l = m, m = null)
                            }

                            function k(g) {
                                var k, l = z(c, i, f, e),
                                    s = l && a.$current && a.$current.locals[l];
                                if (g || s !== o) {
                                    k = c.$new(), o = a.$current.locals[l];
                                    var t = h(k, function(a) {
                                        r.enter(a, f, function() {
                                            n && n.$emit("$viewContentAnimationEnded"), (b.isDefined(q) && !q || c.$eval(q)) && d(a)
                                        }), j()
                                    });
                                    m = t, n = k, n.$emit("$viewContentLoaded"), n.$eval(p)
                                }
                            }
                            var l, m, n, o, p = i.onload || "",
                                q = i.autoscroll,
                                r = g(i, c);
                            c.$on("$stateChangeSuccess", function() {
                                k(!1)
                            }), c.$on("$viewContentLoading", function() {
                                k(!1)
                            }), k(!0)
                        }
                    }
                };
            return k
        }

        function y(a, b, c, d) {
            return {
                restrict: "ECA",
                priority: -400,
                compile: function(e) {
                    var f = e.html();
                    return function(e, g, h) {
                        var i = c.$current,
                            j = z(e, h, g, d),
                            k = i && i.locals[j];
                        if (k) {
                            g.data("$uiView", {
                                name: j,
                                state: k.$$state
                            }), g.html(k.$template ? k.$template : f);
                            var l = a(g.contents());
                            if (k.$$controller) {
                                k.$scope = e;
                                var m = b(k.$$controller, k);
                                k.$$controllerAs && (e[k.$$controllerAs] = m), g.data("$ngControllerController", m), g.children().data("$ngControllerController", m)
                            }
                            l(e)
                        }
                    }
                }
            }
        }

        function z(a, b, c, d) {
            var e = d(b.uiView || b.name || "")(a),
                f = c.inheritedData("$uiView");
            return e.indexOf("@") >= 0 ? e : e + "@" + (f ? f.state.name : "")
        }

        function A(a, b) {
            var c, d = a.match(/^\s*({[^}]*})\s*$/);
            if (d && (a = b + "(" + d[1] + ")"), c = a.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/), !c || 4 !== c.length) throw new Error("Invalid state ref '" + a + "'");
            return {
                state: c[1],
                paramExpr: c[3] || null
            }
        }

        function B(a) {
            var b = a.parent().inheritedData("$uiView");
            return b && b.state && b.state.name ? b.state : void 0
        }

        function C(a, c) {
            var d = ["location", "inherit", "reload"];
            return {
                restrict: "A",
                require: ["?^uiSrefActive", "?^uiSrefActiveEq"],
                link: function(e, f, g, h) {
                    var i = A(g.uiSref, a.current.name),
                        j = null,
                        k = B(f) || a.$current,
                        l = null,
                        m = "A" === f.prop("tagName"),
                        n = "FORM" === f[0].nodeName,
                        o = n ? "action" : "href",
                        p = !0,
                        q = {
                            relative: k,
                            inherit: !0
                        },
                        r = e.$eval(g.uiSrefOpts) || {};
                    b.forEach(d, function(a) {
                        a in r && (q[a] = r[a])
                    });
                    var s = function(c) {
                        if (c && (j = b.copy(c)), p) {
                            l = a.href(i.state, j, q);
                            var d = h[1] || h[0];
                            return d && d.$$setStateInfo(i.state, j), null === l ? (p = !1, !1) : void g.$set(o, l)
                        }
                    };
                    i.paramExpr && (e.$watch(i.paramExpr, function(a) {
                        a !== j && s(a)
                    }, !0), j = b.copy(e.$eval(i.paramExpr))), s(), n || f.bind("click", function(b) {
                        var d = b.which || b.button;
                        if (!(d > 1 || b.ctrlKey || b.metaKey || b.shiftKey || f.attr("target"))) {
                            var e = c(function() {
                                a.go(i.state, j, q)
                            });
                            b.preventDefault();
                            var g = m && !l ? 1 : 0;
                            b.preventDefault = function() {
                                g-- <= 0 && c.cancel(e)
                            }
                        }
                    })
                }
            }
        }

        function D(a, b, c) {
            return {
                restrict: "A",
                controller: ["$scope", "$element", "$attrs", function(b, d, e) {
                    function f() {
                        g() ? d.addClass(j) : d.removeClass(j)
                    }

                    function g() {
                        return "undefined" != typeof e.uiSrefActiveEq ? h && a.is(h.name, i) : h && a.includes(h.name, i)
                    }
                    var h, i, j;
                    j = c(e.uiSrefActiveEq || e.uiSrefActive || "", !1)(b), this.$$setStateInfo = function(b, c) {
                        h = a.get(b, B(d)), i = c, f()
                    }, b.$on("$stateChangeSuccess", f)
                }]
            }
        }

        function E(a) {
            var b = function(b) {
                return a.is(b)
            };
            return b.$stateful = !0, b
        }

        function F(a) {
            var b = function(b) {
                return a.includes(b)
            };
            return b.$stateful = !0, b
        }
        var G = b.isDefined,
            H = b.isFunction,
            I = b.isString,
            J = b.isObject,
            K = b.isArray,
            L = b.forEach,
            M = b.extend,
            N = b.copy;
        b.module("ui.router.util", ["ng"]), b.module("ui.router.router", ["ui.router.util"]), b.module("ui.router.state", ["ui.router.router", "ui.router.util"]), b.module("ui.router", ["ui.router.state"]), b.module("ui.router.compat", ["ui.router"]), o.$inject = ["$q", "$injector"], b.module("ui.router.util").service("$resolve", o), p.$inject = ["$http", "$templateCache", "$injector"], b.module("ui.router.util").service("$templateFactory", p);
        var O;
        q.prototype.concat = function(a, b) {
            var c = {
                caseInsensitive: O.caseInsensitive(),
                strict: O.strictMode(),
                squash: O.defaultSquashPolicy()
            };
            return new q(this.sourcePath + a + this.sourceSearch, M(c, b), this)
        }, q.prototype.toString = function() {
            return this.source
        }, q.prototype.exec = function(a, b) {
            function c(a) {
                function b(a) {
                    return a.split("").reverse().join("")
                }

                function c(a) {
                    return a.replace(/\\-/, "-")
                }
                var d = b(a).split(/-(?!\\)/),
                    e = n(d, b);
                return n(e, c).reverse()
            }
            var d = this.regexp.exec(a);
            if (!d) return null;
            b = b || {};
            var e, f, g, h = this.parameters(),
                i = h.length,
                j = this.segments.length - 1,
                k = {};
            if (j !== d.length - 1) throw new Error("Unbalanced capture group in route '" + this.source + "'");
            for (e = 0; j > e; e++) {
                g = h[e];
                var l = this.params[g],
                    m = d[e + 1];
                for (f = 0; f < l.replace; f++) l.replace[f].from === m && (m = l.replace[f].to);
                m && l.array === !0 && (m = c(m)), k[g] = l.value(m)
            }
            for (; i > e; e++) g = h[e], k[g] = this.params[g].value(b[g]);
            return k
        }, q.prototype.parameters = function(a) {
            return G(a) ? this.params[a] || null : this.$$paramNames
        }, q.prototype.validates = function(a) {
            return this.params.$$validates(a)
        }, q.prototype.format = function(a) {
            function b(a) {
                return encodeURIComponent(a).replace(/-/g, function(a) {
                    return "%5C%" + a.charCodeAt(0).toString(16).toUpperCase()
                })
            }
            a = a || {};
            var c = this.segments,
                d = this.parameters(),
                e = this.params;
            if (!this.validates(a)) return null;
            var f, g = !1,
                h = c.length - 1,
                i = d.length,
                j = c[0];
            for (f = 0; i > f; f++) {
                var k = h > f,
                    l = d[f],
                    m = e[l],
                    o = m.value(a[l]),
                    p = m.isOptional && m.type.equals(m.value(), o),
                    q = p ? m.squash : !1,
                    r = m.type.encode(o);
                if (k) {
                    var s = c[f + 1];
                    if (q === !1) null != r && (j += K(r) ? n(r, b).join("-") : encodeURIComponent(r)), j += s;
                    else if (q === !0) {
                        var t = j.match(/\/$/) ? /\/?(.*)/ : /(.*)/;
                        j += s.match(t)[1]
                    } else I(q) && (j += q + s)
                } else {
                    if (null == r || p && q !== !1) continue;
                    K(r) || (r = [r]), r = n(r, encodeURIComponent).join("&" + l + "="), j += (g ? "&" : "?") + (l + "=" + r), g = !0
                }
            }
            return j
        }, r.prototype.is = function() {
            return !0
        }, r.prototype.encode = function(a) {
            return a
        }, r.prototype.decode = function(a) {
            return a
        }, r.prototype.equals = function(a, b) {
            return a == b
        }, r.prototype.$subPattern = function() {
            var a = this.pattern.toString();
            return a.substr(1, a.length - 2)
        }, r.prototype.pattern = /.*/, r.prototype.toString = function() {
            return "{Type:" + this.name + "}"
        }, r.prototype.$asArray = function(a, b) {
            function d(a, b) {
                function d(a, b) {
                    return function() {
                        return a[b].apply(a, arguments)
                    }
                }

                function e(a) {
                    return K(a) ? a : G(a) ? [a] : []
                }

                function f(a) {
                    switch (a.length) {
                        case 0:
                            return c;
                        case 1:
                            return "auto" === b ? a[0] : a;
                        default:
                            return a
                    }
                }

                function g(a) {
                    return !a
                }

                function h(a, b) {
                    return function(c) {
                        c = e(c);
                        var d = n(c, a);
                        return b === !0 ? 0 === m(d, g).length : f(d)
                    }
                }

                function i(a) {
                    return function(b, c) {
                        var d = e(b),
                            f = e(c);
                        if (d.length !== f.length) return !1;
                        for (var g = 0; g < d.length; g++)
                            if (!a(d[g], f[g])) return !1;
                        return !0
                    }
                }
                this.encode = h(d(a, "encode")), this.decode = h(d(a, "decode")), this.is = h(d(a, "is"), !0), this.equals = i(d(a, "equals")), this.pattern = a.pattern, this.$arrayMode = b
            }
            if (!a) return this;
            if ("auto" === a && !b) throw new Error("'auto' array mode is for query parameters only");
            return new d(this, a)
        }, b.module("ui.router.util").provider("$urlMatcherFactory", s), b.module("ui.router.util").run(["$urlMatcherFactory", function() {}]), t.$inject = ["$locationProvider", "$urlMatcherFactoryProvider"], b.module("ui.router.router").provider("$urlRouter", t), u.$inject = ["$urlRouterProvider", "$urlMatcherFactoryProvider"], b.module("ui.router.state").value("$stateParams", {}).provider("$state", u), v.$inject = [], b.module("ui.router.state").provider("$view", v), b.module("ui.router.state").provider("$uiViewScroll", w), x.$inject = ["$state", "$injector", "$uiViewScroll", "$interpolate"], y.$inject = ["$compile", "$controller", "$state", "$interpolate"], b.module("ui.router.state").directive("uiView", x), b.module("ui.router.state").directive("uiView", y), C.$inject = ["$state", "$timeout"], D.$inject = ["$state", "$stateParams", "$interpolate"], b.module("ui.router.state").directive("uiSref", C).directive("uiSrefActive", D).directive("uiSrefActiveEq", D), E.$inject = ["$state"], F.$inject = ["$state"], b.module("ui.router.state").filter("isState", E).filter("includedByState", F)
    }(window, window.angular),
    function(a, b, c, d) {
        a.site = a.fn.site = function(e) {
            var f, g, h = (new Date).getTime(),
                i = [],
                j = arguments[0],
                k = "string" == typeof j,
                l = [].slice.call(arguments, 1),
                m = a.isPlainObject(e) ? a.extend(!0, {}, a.site.settings, e) : a.extend({}, a.site.settings),
                n = m.namespace,
                o = m.error,
                p = "module-" + n,
                q = a(c),
                r = q,
                s = this,
                t = r.data(p);
            return f = {
                initialize: function() {
                    f.instantiate()
                },
                instantiate: function() {
                    f.verbose("Storing instance of site", f), t = f, r.data(p, f)
                },
                normalize: function() {
                    f.fix.console(), f.fix.requestAnimationFrame()
                },
                fix: {
                    console: function() {
                        f.debug("Normalizing window.console"), (console === d || console.log === d) && (f.verbose("Console not available, normalizing events"), f.disable.console()), ("undefined" == typeof console.group || "undefined" == typeof console.groupEnd || "undefined" == typeof console.groupCollapsed) && (f.verbose("Console group not available, normalizing events"), b.console.group = function() {}, b.console.groupEnd = function() {}, b.console.groupCollapsed = function() {}), "undefined" == typeof console.markTimeline && (f.verbose("Mark timeline not available, normalizing events"), b.console.markTimeline = function() {})
                    },
                    consoleClear: function() {
                        f.debug("Disabling programmatic console clearing"), b.console.clear = function() {}
                    },
                    requestAnimationFrame: function() {
                        f.debug("Normalizing requestAnimationFrame"), b.requestAnimationFrame === d && (f.debug("RequestAnimationFrame not available, normailizing event"), b.requestAnimationFrame = b.requestAnimationFrame || b.mozRequestAnimationFrame || b.webkitRequestAnimationFrame || b.msRequestAnimationFrame || function(a) {
                            setTimeout(a, 0)
                        })
                    }
                },
                moduleExists: function(b) {
                    return a.fn[b] !== d && a.fn[b].settings !== d
                },
                enabled: {
                    modules: function(b) {
                        var c = [];
                        return b = b || m.modules, a.each(b, function(a, b) {
                            f.moduleExists(b) && c.push(b)
                        }), c
                    }
                },
                disabled: {
                    modules: function(b) {
                        var c = [];
                        return b = b || m.modules, a.each(b, function(a, b) {
                            f.moduleExists(b) || c.push(b)
                        }), c
                    }
                },
                change: {
                    setting: function(b, c, e, g) {
                        e = "string" == typeof e ? "all" === e ? m.modules : [e] : e || m.modules, g = g !== d ? g : !0, a.each(e, function(d, e) {
                            var h, i = f.moduleExists(e) ? a.fn[e].settings.namespace || !1 : !0;
                            f.moduleExists(e) && (f.verbose("Changing default setting", b, c, e), a.fn[e].settings[b] = c, g && i && (h = a(":data(module-" + i + ")"), h.length > 0 && (f.verbose("Modifying existing settings", h), h[e]("setting", b, c))))
                        })
                    },
                    settings: function(b, c, e) {
                        c = "string" == typeof c ? [c] : c || m.modules, e = e !== d ? e : !0, a.each(c, function(c, d) {
                            var g;
                            f.moduleExists(d) && (f.verbose("Changing default setting", b, d), a.extend(!0, a.fn[d].settings, b), e && n && (g = a(":data(module-" + n + ")"), g.length > 0 && (f.verbose("Modifying existing settings", g), g[d]("setting", b))))
                        })
                    }
                },
                enable: {
                    console: function() {
                        f.console(!0)
                    },
                    debug: function(a, b) {
                        a = a || m.modules, f.debug("Enabling debug for modules", a), f.change.setting("debug", !0, a, b)
                    },
                    verbose: function(a, b) {
                        a = a || m.modules, f.debug("Enabling verbose debug for modules", a), f.change.setting("verbose", !0, a, b)
                    }
                },
                disable: {
                    console: function() {
                        f.console(!1)
                    },
                    debug: function(a, b) {
                        a = a || m.modules, f.debug("Disabling debug for modules", a), f.change.setting("debug", !1, a, b)
                    },
                    verbose: function(a, b) {
                        a = a || m.modules, f.debug("Disabling verbose debug for modules", a), f.change.setting("verbose", !1, a, b)
                    }
                },
                console: function(a) {
                    if (a) {
                        if (t.cache.console === d) return void f.error(o.console);
                        f.debug("Restoring console function"), b.console = t.cache.console
                    } else f.debug("Disabling console function"), t.cache.console = b.console, b.console = {
                        clear: function() {},
                        error: function() {},
                        group: function() {},
                        groupCollapsed: function() {},
                        groupEnd: function() {},
                        info: function() {},
                        log: function() {},
                        markTimeline: function() {},
                        warn: function() {}
                    }
                },
                destroy: function() {
                    f.verbose("Destroying previous site for", r), r.removeData(p)
                },
                cache: {},
                setting: function(b, c) {
                    if (a.isPlainObject(b)) a.extend(!0, m, b);
                    else {
                        if (c === d) return m[b];
                        m[b] = c
                    }
                },
                internal: function(b, c) {
                    if (a.isPlainObject(b)) a.extend(!0, f, b);
                    else {
                        if (c === d) return f[b];
                        f[b] = c
                    }
                },
                debug: function() {
                    m.debug && (m.performance ? f.performance.log(arguments) : (f.debug = Function.prototype.bind.call(console.info, console, m.name + ":"), f.debug.apply(console, arguments)))
                },
                verbose: function() {
                    m.verbose && m.debug && (m.performance ? f.performance.log(arguments) : (f.verbose = Function.prototype.bind.call(console.info, console, m.name + ":"), f.verbose.apply(console, arguments)))
                },
                error: function() {
                    f.error = Function.prototype.bind.call(console.error, console, m.name + ":"), f.error.apply(console, arguments)
                },
                performance: {
                    log: function(a) {
                        var b, c, d;
                        m.performance && (b = (new Date).getTime(), d = h || b, c = b - d, h = b, i.push({
                            Element: s,
                            Name: a[0],
                            Arguments: [].slice.call(a, 1) || "",
                            "Execution Time": c
                        })), clearTimeout(f.performance.timer), f.performance.timer = setTimeout(f.performance.display, 100)
                    },
                    display: function() {
                        var b = m.name + ":",
                            c = 0;
                        h = !1, clearTimeout(f.performance.timer), a.each(i, function(a, b) {
                            c += b["Execution Time"]
                        }), b += " " + c + "ms", (console.group !== d || console.table !== d) && i.length > 0 && (console.groupCollapsed(b), console.table ? console.table(i) : a.each(i, function(a, b) {
                            console.log(b.Name + ": " + b["Execution Time"] + "ms")
                        }), console.groupEnd()), i = []
                    }
                },
                invoke: function(b, c, e) {
                    var h, i, j, k = t;
                    return c = c || l, e = s || e, "string" == typeof b && k !== d && (b = b.split(/[\. ]/), h = b.length - 1, a.each(b, function(c, e) {
                        var g = c != h ? e + b[c + 1].charAt(0).toUpperCase() + b[c + 1].slice(1) : b;
                        if (a.isPlainObject(k[g]) && c != h) k = k[g];
                        else {
                            if (k[g] !== d) return i = k[g], !1;
                            if (!a.isPlainObject(k[e]) || c == h) return k[e] !== d ? (i = k[e], !1) : (f.error(o.method, b), !1);
                            k = k[e]
                        }
                    })), a.isFunction(i) ? j = i.apply(e, c) : i !== d && (j = i), a.isArray(g) ? g.push(j) : g !== d ? g = [g, j] : j !== d && (g = j), i
                }
            }, k ? (t === d && f.initialize(), f.invoke(j)) : (t !== d && f.destroy(), f.initialize()), g !== d ? g : this
        }, a.site.settings = {
            name: "Site",
            namespace: "site",
            error: {
                console: "Console cannot be restored, most likely it was overwritten outside of module",
                method: "The method you called is not defined."
            },
            debug: !1,
            verbose: !0,
            performance: !0,
            modules: ["accordion", "api", "checkbox", "dimmer", "dropdown", "form", "modal", "nag", "popup", "rating", "shape", "sidebar", "state", "sticky", "tab", "transition", "video", "visit", "visibility"],
            siteNamespace: "site",
            namespaceStub: {
                cache: {},
                config: {},
                sections: {},
                section: {},
                utilities: {}
            }
        }, a.extend(a.expr[":"], {
            data: a.expr.createPseudo ? a.expr.createPseudo(function(b) {
                return function(c) {
                    return !!a.data(c, b)
                }
            }) : function(b, c, d) {
                return !!a.data(b, d[3])
            }
        })
    }(jQuery, window, document),
    function(a, b, c, d) {
        a.fn.form = function(b, e) {
            var f, g = a(this),
                h = a.extend(!0, {}, a.fn.form.settings, e),
                i = a.extend({}, a.fn.form.settings.defaults, b),
                j = h.namespace,
                k = h.metadata,
                l = h.selector,
                m = h.className,
                n = (h.error, "." + j),
                o = "module-" + j,
                p = g.selector || "",
                q = (new Date).getTime(),
                r = [],
                s = arguments[0],
                t = "string" == typeof s,
                u = [].slice.call(arguments, 1);
            return g.each(function() {
                var b, e = a(this),
                    j = a(this).find(l.field),
                    v = a(this).find(l.group),
                    w = a(this).find(l.message),
                    x = (a(this).find(l.prompt), a(this).find(l.submit)),
                    y = a(this).find(l.clear),
                    z = a(this).find(l.reset),
                    A = [],
                    B = !1,
                    C = this,
                    D = e.data(o);
                b = {
                    initialize: function() {
                        b.verbose("Initializing form validation", e, i, h), b.bindEvents(), b.set.defaults(), b.instantiate()
                    },
                    instantiate: function() {
                        b.verbose("Storing instance of module", b), D = b, e.data(o, b)
                    },
                    destroy: function() {
                        b.verbose("Destroying previous module", D), b.removeEvents(), e.removeData(o)
                    },
                    refresh: function() {
                        b.verbose("Refreshing selector cache"), j = e.find(l.field)
                    },
                    submit: function() {
                        b.verbose("Submitting form", e), e.submit()
                    },
                    attachEvents: function(c, d) {
                        d = d || "submit", a(c).on("click", function(a) {
                            b[d](), a.preventDefault()
                        })
                    },
                    bindEvents: function() {
                        h.keyboardShortcuts && j.on("keydown" + n, b.event.field.keydown), e.on("submit" + n, b.validate.form), j.on("blur" + n, b.event.field.blur), b.attachEvents(x, "submit"), b.attachEvents(z, "reset"), b.attachEvents(y, "clear"), j.each(function() {
                            var c = a(this).prop("type"),
                                d = b.get.changeEvent(c);
                            a(this).on(d + n, b.event.field.change)
                        })
                    },
                    clear: function() {
                        j.each(function() {
                            var c = a(this),
                                d = c.parent(),
                                e = c.closest(v),
                                f = e.find(l.prompt),
                                g = c.data(k.defaultValue) || "",
                                h = d.is(l.uiCheckbox),
                                i = d.is(l.uiDropdown),
                                j = e.hasClass(m.error);
                            j && (b.verbose("Resetting error on field", e), e.removeClass(m.error), f.remove()), i ? (b.verbose("Resetting dropdown value", d, g), d.dropdown("clear")) : h ? d.checkbox("uncheck") : (b.verbose("Resetting field value", c, g), c.val(""))
                        })
                    },
                    reset: function() {
                        j.each(function() {
                            var c = a(this),
                                d = c.parent(),
                                e = c.closest(v),
                                f = e.find(l.prompt),
                                g = c.data(k.defaultValue) || "",
                                h = d.is(l.uiCheckbox),
                                i = d.is(l.uiDropdown),
                                j = e.hasClass(m.error);
                            j && (b.verbose("Resetting error on field", e), e.removeClass(m.error), f.remove()), i ? (b.verbose("Resetting dropdown value", d, g), d.dropdown("restore defaults")) : h ? (b.verbose("Resetting checkbox value", d, g), d.checkbox(g === !0 ? "check" : "uncheck")) : (b.verbose("Resetting field value", c, g), c.val(g))
                        })
                    },
                    removeEvents: function() {
                        e.off(n), j.off(n), x.off(n), j.off(n)
                    },
                    event: {
                        field: {
                            keydown: function(c) {
                                var d = a(this),
                                    e = c.which,
                                    f = {
                                        enter: 13,
                                        escape: 27
                                    };
                                e == f.escape && (b.verbose("Escape key pressed blurring field"), d.blur()), !c.ctrlKey && e == f.enter && d.is(l.input) && d.not(l.checkbox).length > 0 && (x.addClass(m.pressed), B || (d.one("keyup" + n, b.event.field.keyup), b.submit(), b.debug("Enter pressed on input submitting form")), B = !0)
                            },
                            keyup: function() {
                                B = !1, x.removeClass(m.pressed)
                            },
                            blur: function() {
                                var c = a(this),
                                    d = c.closest(v);
                                d.hasClass(m.error) ? (b.debug("Revalidating field", c, b.get.validation(c)), b.validate.field(b.get.validation(c))) : ("blur" == h.on || "change" == h.on) && b.validate.field(b.get.validation(c))
                            },
                            change: function() {
                                var c = a(this),
                                    d = c.closest(v);
                                ("change" == h.on || d.hasClass(m.error) && h.revalidate) && (clearTimeout(b.timer), b.timer = setTimeout(function() {
                                    b.debug("Revalidating field", c, b.get.validation(c)), b.validate.field(b.get.validation(c))
                                }, h.delay))
                            }
                        }
                    },
                    get: {
                        changeEvent: function(a) {
                            return "checkbox" == a || "radio" == a || "hidden" == a ? "change" : b.get.inputEvent()
                        },
                        inputEvent: function() {
                            return c.createElement("input").oninput !== d ? "input" : c.createElement("input").onpropertychange !== d ? "propertychange" : "keyup"
                        },
                        field: function(c) {
                            return b.verbose("Finding field with identifier", c), j.filter("#" + c).length > 0 ? j.filter("#" + c) : j.filter('[name="' + c + '"]').length > 0 ? j.filter('[name="' + c + '"]') : j.filter('[name="' + c + '[]"]').length > 0 ? j.filter('[name="' + c + '[]"]') : j.filter("[data-" + k.validate + '="' + c + '"]').length > 0 ? j.filter("[data-" + k.validate + '="' + c + '"]') : a("<input/>")
                        },
                        fields: function(c) {
                            var d = a();
                            return a.each(c, function(a, c) {
                                d = d.add(b.get.field(c))
                            }), d
                        },
                        validation: function(c) {
                            var d;
                            return a.each(i, function(a, e) {
                                b.get.field(e.identifier).get(0) == c.get(0) && (d = e)
                            }), d || !1
                        },
                        value: function(a) {
                            var c, d = [];
                            return d.push(a), c = b.get.values.call(C, d), c[a]
                        },
                        values: function(c) {
                            var d = a.isArray(c) ? b.get.fields(c) : j,
                                e = {};
                            return d.each(function(c, d) {
                                var f = a(d),
                                    g = (f.prop("type"), f.prop("name")),
                                    h = f.val(),
                                    i = f.is(l.checkbox),
                                    j = f.is(l.radio),
                                    k = -1 !== g.indexOf("[]"),
                                    m = i ? f.is(":checked") : !1;
                                if (g)
                                    if (k)
                                        if (g = g.replace("[]", ""), e[g] || (e[g] = []), i) {
                                            if (!m) return b.debug("Omitted unchecked checkbox", f), !0;
                                            e[g].push(h)
                                        } else e[g].push(h);
                                else if (j) m && (e[g] = h);
                                else if (i) {
                                    if (!m) return b.debug("Omitted unchecked checkbox", f), !0;
                                    e[g] = !0
                                } else e[g] = h
                            }), e
                        }
                    },
                    has: {
                        field: function(a) {
                            return b.verbose("Checking for existence of a field with identifier", a), j.filter("#" + a).length > 0 ? !0 : j.filter('[name="' + a + '"]').length > 0 ? !0 : j.filter("[data-" + k.validate + '="' + a + '"]').length > 0 ? !0 : !1
                        }
                    },
                    add: {
                        prompt: function(c, f) {
                            var g = b.get.field(c),
                                i = g.closest(v),
                                j = i.children(l.prompt),
                                k = 0 !== j.length;
                            f = "string" == typeof f ? [f] : f, b.verbose("Adding field error state", c), i.addClass(m.error), h.inline && (k || (j = h.templates.prompt(f), j.appendTo(i)), j.html(f[0]), k ? b.verbose("Inline errors are disabled, no inline error added", c) : h.transition && a.fn.transition !== d && e.transition("is supported") ? (b.verbose("Displaying error with css transition", h.transition), j.transition(h.transition + " in", h.duration)) : (b.verbose("Displaying error with fallback javascript animation"), j.fadeIn(h.duration)))
                        },
                        errors: function(a) {
                            b.debug("Adding form error messages", a), w.html(h.templates.error(a))
                        }
                    },
                    remove: {
                        prompt: function(c) {
                            var f = b.get.field(c.identifier),
                                g = f.closest(v),
                                i = g.children(l.prompt);
                            g.removeClass(m.error), h.inline && i.is(":visible") && (b.verbose("Removing prompt for field", c), h.transition && a.fn.transition !== d && e.transition("is supported") ? i.transition(h.transition + " out", h.duration, function() {
                                i.remove()
                            }) : i.fadeOut(h.duration, function() {
                                i.remove()
                            }))
                        }
                    },
                    set: {
                        success: function() {
                            e.removeClass(m.error).addClass(m.success)
                        },
                        defaults: function() {
                            j.each(function() {
                                var b = a(this),
                                    c = b.filter(l.checkbox).length > 0,
                                    d = c ? b.is(":checked") : b.val();
                                b.data(k.defaultValue, d)
                            })
                        },
                        error: function() {
                            e.removeClass(m.success).addClass(m.error)
                        },
                        value: function(a, c) {
                            var d = {};
                            return d[a] = c, b.set.values.call(C, d)
                        },
                        values: function(c) {
                            a.isEmptyObject(c) || (a.each(c, function(c, d) {
                                var e, f = b.get.field(c),
                                    g = f.parent(),
                                    h = a.isArray(d),
                                    i = g.is(l.uiCheckbox),
                                    j = g.is(l.uiDropdown),
                                    k = f.is(l.radio) && i,
                                    m = f.length > 0;
                                m && (h && i ? (b.verbose("Selecting multiple", d, f), g.checkbox("uncheck"), a.each(d, function(a, b) {
                                    e = f.filter('[value="' + b + '"]'), g = e.parent(), e.length > 0 && g.checkbox("check")
                                })) : k ? (b.verbose("Selecting radio value", d, f), f.filter('[value="' + d + '"]').parent(l.uiCheckbox).checkbox("check")) : i ? (b.verbose("Setting checkbox value", d, g), g.checkbox(d === !0 ? "check" : "uncheck")) : j ? (b.verbose("Setting dropdown value", d, g), g.dropdown("set selected", d)) : (b.verbose("Setting field value", d, f), f.val(d)))
                            }), b.validate.form())
                        }
                    },
                    validate: {
                        form: function(c) {
                            var f = !0;
                            return B ? !1 : (A = [], a.each(i, function(a, c) {
                                b.validate.field(c) || (f = !1)
                            }), f ? (b.debug("Form has no validation errors, submitting"), b.set.success(), h.onSuccess.call(C, c)) : (b.debug("Form has errors"), b.set.error(), h.inline || b.add.errors(A), e.data("moduleApi") !== d && c.stopImmediatePropagation(), h.onFailure.call(C, A)))
                        },
                        field: function(c) {
                            var e = b.get.field(c.identifier),
                                f = !0,
                                g = [];
                            return e.prop("disabled") ? (b.debug("Field is disabled. Skipping", c.identifier), f = !0) : c.optional && "" === a.trim(e.val()) ? (b.debug("Field is optional and empty. Skipping", c.identifier), f = !0) : c.rules !== d && a.each(c.rules, function(a, d) {
                                b.has.field(c.identifier) && !b.validate.rule(c, d) && (b.debug("Field is invalid", c.identifier, d.type), g.push(d.prompt), f = !1)
                            }), f ? (b.remove.prompt(c, g), h.onValid.call(e), !0) : (A = A.concat(g), b.add.prompt(c.identifier, g), h.onInvalid.call(e, g), !1)
                        },
                        rule: function(c, e) {
                            var f, g, i = b.get.field(c.identifier),
                                j = e.type,
                                k = a.trim(i.val() + ""),
                                l = /\[(.*)\]/i,
                                m = l.exec(j),
                                n = !0;
                            return m !== d && null !== m ? (f = "" + m[1], g = j.replace(m[0], ""), n = h.rules[g].call(C, k, f)) : n = h.rules[j].call(i, k), n
                        }
                    },
                    setting: function(b, c) {
                        if (a.isPlainObject(b)) a.extend(!0, h, b);
                        else {
                            if (c === d) return h[b];
                            h[b] = c
                        }
                    },
                    internal: function(c, e) {
                        if (a.isPlainObject(c)) a.extend(!0, b, c);
                        else {
                            if (e === d) return b[c];
                            b[c] = e
                        }
                    },
                    debug: function() {
                        h.debug && (h.performance ? b.performance.log(arguments) : (b.debug = Function.prototype.bind.call(console.info, console, h.name + ":"), b.debug.apply(console, arguments)))
                    },
                    verbose: function() {
                        h.verbose && h.debug && (h.performance ? b.performance.log(arguments) : (b.verbose = Function.prototype.bind.call(console.info, console, h.name + ":"), b.verbose.apply(console, arguments)))
                    },
                    error: function() {
                        b.error = Function.prototype.bind.call(console.error, console, h.name + ":"), b.error.apply(console, arguments)
                    },
                    performance: {
                        log: function(a) {
                            var c, d, e;
                            h.performance && (c = (new Date).getTime(), e = q || c, d = c - e, q = c, r.push({
                                Name: a[0],
                                Arguments: [].slice.call(a, 1) || "",
                                Element: C,
                                "Execution Time": d
                            })), clearTimeout(b.performance.timer), b.performance.timer = setTimeout(b.performance.display, 100)
                        },
                        display: function() {
                            var c = h.name + ":",
                                e = 0;
                            q = !1, clearTimeout(b.performance.timer), a.each(r, function(a, b) {
                                e += b["Execution Time"]
                            }), c += " " + e + "ms", p && (c += " '" + p + "'"), g.length > 1 && (c += " (" + g.length + ")"), (console.group !== d || console.table !== d) && r.length > 0 && (console.groupCollapsed(c), console.table ? console.table(r) : a.each(r, function(a, b) {
                                console.log(b.Name + ": " + b["Execution Time"] + "ms")
                            }), console.groupEnd()), r = []
                        }
                    },
                    invoke: function(b, c, e) {
                        var g, h, i, j = D;
                        return c = c || u, e = C || e, "string" == typeof b && j !== d && (b = b.split(/[\. ]/), g = b.length - 1, a.each(b, function(c, e) {
                            var f = c != g ? e + b[c + 1].charAt(0).toUpperCase() + b[c + 1].slice(1) : b;
                            if (a.isPlainObject(j[f]) && c != g) j = j[f];
                            else {
                                if (j[f] !== d) return h = j[f], !1;
                                if (!a.isPlainObject(j[e]) || c == g) return j[e] !== d ? (h = j[e], !1) : !1;
                                j = j[e]
                            }
                        })), a.isFunction(h) ? i = h.apply(e, c) : h !== d && (i = h), a.isArray(f) ? f.push(i) : f !== d ? f = [f, i] : i !== d && (f = i), h
                    }
                }, t ? (D === d && b.initialize(), b.invoke(s)) : (D !== d && D.invoke("destroy"), b.initialize())
            }), f !== d ? f : this
        }, a.fn.form.settings = {
            name: "Form",
            namespace: "form",
            debug: !1,
            verbose: !0,
            performance: !0,
            keyboardShortcuts: !0,
            on: "submit",
            inline: !1,
            delay: 200,
            revalidate: !0,
            transition: "scale",
            duration: 200,
            onValid: function() {},
            onInvalid: function() {},
            onSuccess: function() {
                return !0
            },
            onFailure: function() {
                return !1
            },
            metadata: {
                defaultValue: "default",
                validate: "validate"
            },
            selector: {
                checkbox: 'input[type="checkbox"], input[type="radio"]',
                clear: ".clear",
                field: "input, textarea, select",
                group: ".field",
                input: "input",
                message: ".error.message",
                prompt: ".prompt.label",
                radio: 'input[type="radio"]',
                reset: ".reset",
                submit: ".submit",
                uiCheckbox: ".ui.checkbox",
                uiDropdown: ".ui.dropdown"
            },
            className: {
                error: "error",
                label: "ui prompt label",
                pressed: "down",
                success: "success"
            },
            error: {
                method: "The method you called is not defined."
            },
            templates: {
                error: function(b) {
                    var c = '<ul class="list">';
                    return a.each(b, function(a, b) {
                        c += "<li>" + b + "</li>"
                    }), c += "</ul>", a(c)
                },
                prompt: function(b) {
                    return a("<div/>").addClass("ui red pointing prompt label").html(b[0])
                }
            },
            rules: {
                checked: function() {
                    return a(this).filter(":checked").length > 0
                },
                contains: function(a, b) {
                    return b = b.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), -1 !== a.search(new RegExp(b, "i"))
                },
                containsExactly: function(a, b) {
                    return b = b.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), -1 !== a.search(new RegExp(b))
                },
                email: function(a) {
                    var b = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", "i");
                    return b.test(a)
                },
                empty: function(a) {
                    return !(a === d || "" === a)
                },
                integer: function(a, b) {
                    var c, e, f, g = /^\-?\d+$/;
                    return b === d || "" === b || ".." === b || (-1 == b.indexOf("..") ? g.test(b) && (c = e = b - 0) : (f = b.split("..", 2), g.test(f[0]) && (c = f[0] - 0), g.test(f[1]) && (e = f[1] - 0))), g.test(a) && (c === d || a >= c) && (e === d || e >= a)
                },
                is: function(a, b) {
                    return b = "string" == typeof b ? b.toLowerCase() : b, a = "string" == typeof a ? a.toLowerCase() : a, a == b
                },
                isExactly: function(a, b) {
                    return a == b
                },
                length: function(a, b) {
                    return a !== d ? a.length >= b : !1
                },
                match: function(b, c) {
                    var e, f = a(this);
                    return f.find("#" + c).length > 0 ? e = f.find("#" + c).val() : f.find('[name="' + c + '"]').length > 0 ? e = f.find('[name="' + c + '"]').val() : f.find('[data-validate="' + c + '"]').length > 0 && (e = f.find('[data-validate="' + c + '"]').val()), e !== d ? b.toString() == e.toString() : !1
                },
                maxLength: function(a, b) {
                    return a !== d ? a.length <= b : !1
                },
                not: function(a, b) {
                    return a = "string" == typeof a ? a.toLowerCase() : a, b = "string" == typeof b ? b.toLowerCase() : b, a != b
                },
                notExactly: function(a, b) {
                    return a != b
                },
                url: function(a) {
                    var b = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
                    return b.test(a)
                }
            }
        }
    }(jQuery, window, document),
    function(a, b, c, d) {
        "use strict";
        a.fn.checkbox = function(c) {
            var e, f = a(this),
                g = f.selector || "",
                h = (new Date).getTime(),
                i = [],
                j = arguments[0],
                k = "string" == typeof j,
                l = [].slice.call(arguments, 1);
            return f.each(function() {
                var f, m, n = a.extend(!0, {}, a.fn.checkbox.settings, c),
                    o = n.className,
                    p = n.namespace,
                    q = n.selector,
                    r = n.error,
                    s = "." + p,
                    t = "module-" + p,
                    u = a(this),
                    v = a(this).find(q.label).first(),
                    w = a(this).find(q.input),
                    x = u.data(t),
                    y = this;
                m = {
                    initialize: function() {
                        m.verbose("Initializing checkbox", n), m.create.label(), m.add.events(), m.is.checked() ? (m.set.checked(), n.fireOnInit && n.onChecked.call(w.get())) : (m.remove.checked(), n.fireOnInit && n.onUnchecked.call(w.get())), m.observeChanges(), m.instantiate()
                    },
                    instantiate: function() {
                        m.verbose("Storing instance of module", m), x = m, u.data(t, m)
                    },
                    destroy: function() {
                        m.verbose("Destroying module"), m.remove.events(), u.removeData(t)
                    },
                    refresh: function() {
                        u = a(this), v = a(this).find(q.label).first(), w = a(this).find(q.input)
                    },
                    observeChanges: function() {
                        "MutationObserver" in b && (f = new MutationObserver(function() {
                            m.debug("DOM tree modified, updating selector cache"), m.refresh()
                        }), f.observe(y, {
                            childList: !0,
                            subtree: !0
                        }), m.debug("Setting up mutation observer", f))
                    },
                    attachEvents: function(b, c) {
                        var d = a(b);
                        c = a.isFunction(m[c]) ? m[c] : m.toggle, d.length > 0 ? (m.debug("Attaching checkbox events to element", b, c), d.on("click" + s, c)) : m.error(r.notFound)
                    },
                    event: {
                        keydown: function(a) {
                            var b = a.which,
                                c = {
                                    enter: 13,
                                    space: 32,
                                    escape: 27
                                };
                            b == c.escape && (m.verbose("Escape key pressed blurring field"), u.blur()), a.ctrlKey || b != c.enter && b != c.space || (m.verbose("Enter key pressed, toggling checkbox"), m.toggle.call(this), a.preventDefault())
                        }
                    },
                    is: {
                        radio: function() {
                            return u.hasClass(o.radio)
                        },
                        checked: function() {
                            return w.prop("checked") !== d && w.prop("checked")
                        },
                        unchecked: function() {
                            return !m.is.checked()
                        }
                    },
                    can: {
                        change: function() {
                            return !(u.hasClass(o.disabled) || u.hasClass(o.readOnly) || w.prop("disabled"))
                        },
                        uncheck: function() {
                            return "boolean" == typeof n.uncheckable ? n.uncheckable : !m.is.radio()
                        }
                    },
                    set: {
                        checked: function() {
                            u.addClass(o.checked)
                        },
                        tab: function() {
                            w.attr("tabindex") === d && w.attr("tabindex", 0)
                        }
                    },
                    create: {
                        label: function() {
                            w.prevAll(q.label).length > 0 ? (w.prev(q.label).detach().insertAfter(w), m.debug("Moving existing label", v)) : m.has.label() || (v = a("<label>").insertAfter(w), m.debug("Creating label", v))
                        }
                    },
                    has: {
                        label: function() {
                            return v.length > 0
                        }
                    },
                    add: {
                        events: function() {
                            m.verbose("Attaching checkbox events"), u.on("click" + s, m.toggle).on("keydown" + s, q.input, m.event.keydown)
                        }
                    },
                    remove: {
                        checked: function() {
                            u.removeClass(o.checked)
                        },
                        events: function() {
                            m.debug("Removing events"), u.off(s).removeData(t), w.off(s, m.event.keydown), v.off(s)
                        }
                    },
                    enable: function() {
                        m.debug("Enabling checkbox functionality"), u.removeClass(o.disabled), w.prop("disabled", !1), n.onEnabled.call(w.get())
                    },
                    disable: function() {
                        m.debug("Disabling checkbox functionality"), u.addClass(o.disabled), w.prop("disabled", "disabled"), n.onDisabled.call(w.get())
                    },
                    check: function() {
                        m.debug("Enabling checkbox", w), w.prop("checked", !0).trigger("change"), m.set.checked(), w.trigger("blur"), n.onChange.call(w.get()), n.onChecked.call(w.get())
                    },
                    uncheck: function() {
                        m.debug("Disabling checkbox"), w.prop("checked", !1).trigger("change"), m.remove.checked(), w.trigger("blur"), n.onChange.call(w.get()), n.onUnchecked.call(w.get())
                    },
                    toggle: function() {
                        return m.can.change() ? (m.verbose("Determining new checkbox state"), void(m.is.unchecked() ? m.check() : m.is.checked() && m.can.uncheck() && m.uncheck())) : (console.log(m.can.change()), void m.debug("Checkbox is read-only or disabled, ignoring toggle"))
                    },
                    setting: function(b, c) {
                        if (m.debug("Changing setting", b, c), a.isPlainObject(b)) a.extend(!0, n, b);
                        else {
                            if (c === d) return n[b];
                            n[b] = c
                        }
                    },
                    internal: function(b, c) {
                        if (a.isPlainObject(b)) a.extend(!0, m, b);
                        else {
                            if (c === d) return m[b];
                            m[b] = c
                        }
                    },
                    debug: function() {
                        n.debug && (n.performance ? m.performance.log(arguments) : (m.debug = Function.prototype.bind.call(console.info, console, n.name + ":"), m.debug.apply(console, arguments)))
                    },
                    verbose: function() {
                        n.verbose && n.debug && (n.performance ? m.performance.log(arguments) : (m.verbose = Function.prototype.bind.call(console.info, console, n.name + ":"), m.verbose.apply(console, arguments)))
                    },
                    error: function() {
                        m.error = Function.prototype.bind.call(console.error, console, n.name + ":"), m.error.apply(console, arguments)
                    },
                    performance: {
                        log: function(a) {
                            var b, c, d;
                            n.performance && (b = (new Date).getTime(), d = h || b, c = b - d, h = b, i.push({
                                Name: a[0],
                                Arguments: [].slice.call(a, 1) || "",
                                Element: y,
                                "Execution Time": c
                            })), clearTimeout(m.performance.timer), m.performance.timer = setTimeout(m.performance.display, 100)
                        },
                        display: function() {
                            var b = n.name + ":",
                                c = 0;
                            h = !1, clearTimeout(m.performance.timer), a.each(i, function(a, b) {
                                c += b["Execution Time"]
                            }), b += " " + c + "ms", g && (b += " '" + g + "'"), (console.group !== d || console.table !== d) && i.length > 0 && (console.groupCollapsed(b), console.table ? console.table(i) : a.each(i, function(a, b) {
                                console.log(b.Name + ": " + b["Execution Time"] + "ms")
                            }), console.groupEnd()), i = []
                        }
                    },
                    invoke: function(b, c, f) {
                        var g, h, i, j = x;
                        return c = c || l, f = y || f, "string" == typeof b && j !== d && (b = b.split(/[\. ]/), g = b.length - 1, a.each(b, function(c, e) {
                            var f = c != g ? e + b[c + 1].charAt(0).toUpperCase() + b[c + 1].slice(1) : b;
                            if (a.isPlainObject(j[f]) && c != g) j = j[f];
                            else {
                                if (j[f] !== d) return h = j[f], !1;
                                if (!a.isPlainObject(j[e]) || c == g) return j[e] !== d ? (h = j[e], !1) : (m.error(r.method, b), !1);
                                j = j[e]
                            }
                        })), a.isFunction(h) ? i = h.apply(f, c) : h !== d && (i = h), a.isArray(e) ? e.push(i) : e !== d ? e = [e, i] : i !== d && (e = i), h
                    }
                }, k ? (x === d && m.initialize(), m.invoke(j)) : (x !== d && x.invoke("destroy"), m.initialize())
            }), e !== d ? e : this
        }, a.fn.checkbox.settings = {
            name: "Checkbox",
            namespace: "checkbox",
            debug: !1,
            verbose: !0,
            performance: !0,
            uncheckable: "auto",
            fireOnInit: !0,
            onChange: function() {},
            onChecked: function() {},
            onUnchecked: function() {},
            onEnabled: function() {},
            onDisabled: function() {},
            className: {
                checked: "checked",
                disabled: "disabled",
                radio: "radio",
                readOnly: "read-only"
            },
            error: {
                method: "The method you called is not defined"
            },
            selector: {
                input: 'input[type="checkbox"], input[type="radio"]',
                label: "label"
            }
        }
    }(jQuery, window, document),
    function(a, b, c, d) {
        a.fn.dimmer = function(b) {
            var e, f = a(this),
                g = (new Date).getTime(),
                h = [],
                i = arguments[0],
                j = "string" == typeof i,
                k = [].slice.call(arguments, 1);
            return f.each(function() {
                var l, m, n, o = a.isPlainObject(b) ? a.extend(!0, {}, a.fn.dimmer.settings, b) : a.extend({}, a.fn.dimmer.settings),
                    p = o.selector,
                    q = o.namespace,
                    r = o.className,
                    s = o.error,
                    t = "." + q,
                    u = "module-" + q,
                    v = f.selector || "",
                    w = "ontouchstart" in c.documentElement ? "touchstart" : "click",
                    x = a(this),
                    y = this,
                    z = x.data(u);
                n = {
                    preinitialize: function() {
                        n.is.dimmer() ? (m = x.parent(), l = x) : (m = x, l = n.has.dimmer() ? o.dimmerName ? m.children(p.dimmer).filter("." + o.dimmerName) : m.children(p.dimmer) : n.create())
                    },
                    initialize: function() {
                        n.debug("Initializing dimmer", o), "hover" == o.on ? m.on("mouseenter" + t, n.show).on("mouseleave" + t, n.hide) : "click" == o.on && m.on(w + t, n.toggle), n.is.page() && (n.debug("Setting as a page dimmer", m), n.set.pageDimmer()), n.is.closable() && (n.verbose("Adding dimmer close event", l), l.on(w + t, n.event.click)), n.set.dimmable(), n.instantiate()
                    },
                    instantiate: function() {
                        n.verbose("Storing instance of module", n), z = n, x.data(u, z)
                    },
                    destroy: function() {
                        n.verbose("Destroying previous module", l), x.removeData(u), m.off(t), l.off(t)
                    },
                    event: {
                        click: function(b) {
                            n.verbose("Determining if event occured on dimmer", b), (0 === l.find(b.target).length || a(b.target).is(p.content)) && (n.hide(), b.stopImmediatePropagation())
                        }
                    },
                    addContent: function(b) {
                        var c = a(b);
                        n.debug("Add content to dimmer", c), c.parent()[0] !== l[0] && c.detach().appendTo(l)
                    },
                    create: function() {
                        var b = a(o.template.dimmer());
                        return o.variation && (n.debug("Creating dimmer with variation", o.variation), b.addClass(r.variation)), o.dimmerName && (n.debug("Creating named dimmer", o.dimmerName), b.addClass(o.dimmerName)), b.appendTo(m), b
                    },
                    show: function(b) {
                        b = a.isFunction(b) ? b : function() {}, n.debug("Showing dimmer", l, o), n.is.dimmed() && !n.is.animating() || !n.is.enabled() ? n.debug("Dimmer is already shown or disabled") : (n.animate.show(b), o.onShow.call(y), o.onChange.call(y))
                    },
                    hide: function(b) {
                        b = a.isFunction(b) ? b : function() {}, n.is.dimmed() || n.is.animating() ? (n.debug("Hiding dimmer", l), n.animate.hide(b), o.onHide.call(y), o.onChange.call(y)) : n.debug("Dimmer is not visible")
                    },
                    toggle: function() {
                        n.verbose("Toggling dimmer visibility", l), n.is.dimmed() ? n.hide() : n.show()
                    },
                    animate: {
                        show: function(b) {
                            b = a.isFunction(b) ? b : function() {}, o.useCSS && a.fn.transition !== d && l.transition("is supported") ? l.transition({
                                animation: o.transition + " in",
                                queue: !1,
                                duration: n.get.duration(),
                                useFailSafe: !0,
                                onStart: function() {
                                    n.set.dimmed()
                                },
                                onComplete: function() {
                                    n.set.active(), b()
                                }
                            }) : (n.verbose("Showing dimmer animation with javascript"), n.set.dimmed(), l.stop().css({
                                opacity: 0,
                                width: "100%",
                                height: "100%"
                            }).fadeTo(n.get.duration(), 1, function() {
                                l.removeAttr("style"), n.set.active(), b()
                            }))
                        },
                        hide: function(b) {
                            b = a.isFunction(b) ? b : function() {}, o.useCSS && a.fn.transition !== d && l.transition("is supported") ? (n.verbose("Hiding dimmer with css"), l.transition({
                                animation: o.transition + " out",
                                queue: !1,
                                duration: n.get.duration(),
                                useFailSafe: !0,
                                onStart: function() {
                                    n.remove.dimmed()
                                },
                                onComplete: function() {
                                    n.remove.active(), b()
                                }
                            })) : (n.verbose("Hiding dimmer with javascript"), n.remove.dimmed(), l.stop().fadeOut(n.get.duration(), function() {
                                n.remove.active(), l.removeAttr("style"), b()
                            }))
                        }
                    },
                    get: {
                        dimmer: function() {
                            return l
                        },
                        duration: function() {
                            return "object" == typeof o.duration ? n.is.active() ? o.duration.hide : o.duration.show : o.duration
                        }
                    },
                    has: {
                        dimmer: function() {
                            return o.dimmerName ? x.children(p.dimmer).filter("." + o.dimmerName).length > 0 : x.children(p.dimmer).length > 0
                        }
                    },
                    is: {
                        active: function() {
                            return l.hasClass(r.active)
                        },
                        animating: function() {
                            return l.is(":animated") || l.hasClass(r.animating)
                        },
                        closable: function() {
                            return "auto" == o.closable ? "hover" == o.on ? !1 : !0 : o.closable
                        },
                        dimmer: function() {
                            return x.is(p.dimmer)
                        },
                        dimmable: function() {
                            return x.is(p.dimmable)
                        },
                        dimmed: function() {
                            return m.hasClass(r.dimmed)
                        },
                        disabled: function() {
                            return m.hasClass(r.disabled)
                        },
                        enabled: function() {
                            return !n.is.disabled()
                        },
                        page: function() {
                            return m.is("body")
                        },
                        pageDimmer: function() {
                            return l.hasClass(r.pageDimmer)
                        }
                    },
                    can: {
                        show: function() {
                            return !l.hasClass(r.disabled)
                        }
                    },
                    set: {
                        active: function() {
                            l.addClass(r.active)
                        },
                        dimmable: function() {
                            m.addClass(r.dimmable)
                        },
                        dimmed: function() {
                            m.addClass(r.dimmed)
                        },
                        pageDimmer: function() {
                            l.addClass(r.pageDimmer)
                        },
                        disabled: function() {
                            l.addClass(r.disabled)
                        }
                    },
                    remove: {
                        active: function() {
                            l.removeClass(r.active)
                        },
                        dimmed: function() {
                            m.removeClass(r.dimmed)
                        },
                        disabled: function() {
                            l.removeClass(r.disabled)
                        }
                    },
                    setting: function(b, c) {
                        if (n.debug("Changing setting", b, c), a.isPlainObject(b)) a.extend(!0, o, b);
                        else {
                            if (c === d) return o[b];
                            o[b] = c
                        }
                    },
                    internal: function(b, c) {
                        if (a.isPlainObject(b)) a.extend(!0, n, b);
                        else {
                            if (c === d) return n[b];
                            n[b] = c
                        }
                    },
                    debug: function() {
                        o.debug && (o.performance ? n.performance.log(arguments) : (n.debug = Function.prototype.bind.call(console.info, console, o.name + ":"), n.debug.apply(console, arguments)))
                    },
                    verbose: function() {
                        o.verbose && o.debug && (o.performance ? n.performance.log(arguments) : (n.verbose = Function.prototype.bind.call(console.info, console, o.name + ":"), n.verbose.apply(console, arguments)))
                    },
                    error: function() {
                        n.error = Function.prototype.bind.call(console.error, console, o.name + ":"), n.error.apply(console, arguments)
                    },
                    performance: {
                        log: function(a) {
                            var b, c, d;
                            o.performance && (b = (new Date).getTime(), d = g || b, c = b - d, g = b, h.push({
                                Name: a[0],
                                Arguments: [].slice.call(a, 1) || "",
                                Element: y,
                                "Execution Time": c
                            })), clearTimeout(n.performance.timer), n.performance.timer = setTimeout(n.performance.display, 100)
                        },
                        display: function() {
                            var b = o.name + ":",
                                c = 0;
                            g = !1, clearTimeout(n.performance.timer), a.each(h, function(a, b) {
                                c += b["Execution Time"]
                            }), b += " " + c + "ms", v && (b += " '" + v + "'"), f.length > 1 && (b += " (" + f.length + ")"), (console.group !== d || console.table !== d) && h.length > 0 && (console.groupCollapsed(b), console.table ? console.table(h) : a.each(h, function(a, b) {
                                console.log(b.Name + ": " + b["Execution Time"] + "ms")
                            }), console.groupEnd()), h = []
                        }
                    },
                    invoke: function(b, c, f) {
                        var g, h, i, j = z;
                        return c = c || k, f = y || f, "string" == typeof b && j !== d && (b = b.split(/[\. ]/), g = b.length - 1, a.each(b, function(c, e) {
                            var f = c != g ? e + b[c + 1].charAt(0).toUpperCase() + b[c + 1].slice(1) : b;
                            if (a.isPlainObject(j[f]) && c != g) j = j[f];
                            else {
                                if (j[f] !== d) return h = j[f], !1;
                                if (!a.isPlainObject(j[e]) || c == g) return j[e] !== d ? (h = j[e], !1) : (n.error(s.method, b), !1);
                                j = j[e]
                            }
                        })), a.isFunction(h) ? i = h.apply(f, c) : h !== d && (i = h), a.isArray(e) ? e.push(i) : e !== d ? e = [e, i] : i !== d && (e = i), h
                    }
                }, n.preinitialize(), j ? (z === d && n.initialize(), n.invoke(i)) : (z !== d && z.invoke("destroy"), n.initialize())
            }), e !== d ? e : this
        }, a.fn.dimmer.settings = {
            name: "Dimmer",
            namespace: "dimmer",
            debug: !1,
            verbose: !0,
            performance: !0,
            dimmerName: !1,
            variation: !1,
            closable: "auto",
            transition: "fade",
            useCSS: !0,
            on: !1,
            duration: {
                show: 500,
                hide: 500
            },
            onChange: function() {},
            onShow: function() {},
            onHide: function() {},
            error: {
                method: "The method you called is not defined."
            },
            selector: {
                dimmable: ".dimmable",
                dimmer: ".ui.dimmer",
                content: ".ui.dimmer > .content, .ui.dimmer > .content > .center"
            },
            template: {
                dimmer: function() {
                    return a("<div />").attr("class", "ui dimmer")
                }
            },
            className: {
                active: "active",
                animating: "animating",
                dimmable: "dimmable",
                dimmed: "dimmed",
                disabled: "disabled",
                hide: "hide",
                pageDimmer: "page",
                show: "show"
            }
        }
    }(jQuery, window, document),
    function(a, b, c, d) {
        "use strict";
        a.fn.dropdown = function(e) {
            var f, g = a(this),
                h = a(c),
                i = g.selector || "",
                j = "ontouchstart" in c.documentElement,
                k = (new Date).getTime(),
                l = [],
                m = arguments[0],
                n = "string" == typeof m,
                o = [].slice.call(arguments, 1);
            return g.each(function() {
                var p, q, r, s, t = a.isPlainObject(e) ? a.extend(!0, {}, a.fn.dropdown.settings, e) : a.extend({}, a.fn.dropdown.settings),
                    u = t.className,
                    v = t.metadata,
                    w = t.namespace,
                    x = t.selector,
                    y = t.error,
                    z = "." + w,
                    A = "module-" + w,
                    B = a(this),
                    C = B.find(x.text),
                    D = B.find(x.search),
                    E = B.find(x.input),
                    F = B.prev().find(x.text).length > 0 ? B.prev().find(x.text) : B.prev(),
                    G = B.children(x.menu),
                    H = G.find(x.item),
                    I = !1,
                    J = !1,
                    K = this,
                    L = B.data(A);
                s = {
                    initialize: function() {
                        s.debug("Initializing dropdown", t), s.is.alreadySetup() ? s.error(y.alreadySetup) : s.setup.layout(), s.save.defaults(), s.set.selected(), s.create.id(), j && s.bind.touchEvents(), s.bind.mouseEvents(), s.bind.keyboardEvents(), s.observeChanges(), s.instantiate()
                    },
                    instantiate: function() {
                        s.verbose("Storing instance of dropdown", s), L = s, B.data(A, s)
                    },
                    destroy: function() {
                        s.verbose("Destroying previous dropdown for", B), s.remove.tabbable(), B.off(z).removeData(A), G.off(z), h.off(p)
                    },
                    observeChanges: function() {
                        "MutationObserver" in b && (r = new MutationObserver(function(a) {
                            s.is.selectMutation(a) ? (s.debug("<select> modified, recreating menu"), s.setup.select()) : (s.debug("DOM tree modified, updating selector cache"), s.refresh())
                        }), r.observe(K, {
                            childList: !0,
                            subtree: !0
                        }), s.debug("Setting up mutation observer", r))
                    },
                    create: {
                        id: function() {
                            s.verbose("Creating unique id for element"), q = s.get.uniqueID(), p = "." + q
                        }
                    },
                    search: function() {
                        var a;
                        a = D.val(), s.verbose("Searching for query", a), s.filter(a), s.is.searchSelection() && s.can.show() && s.show()
                    },
                    setup: {
                        layout: function() {
                            B.is("select") && s.setup.select(), s.is.search() && !s.is.searchable() && (D = a("<input />").addClass(u.search).insertBefore(C)), t.allowTab && s.set.tabbable()
                        },
                        select: function() {
                            var b = s.get.selectValues();
                            s.debug("Dropdown initialized on a select", b), B.is("select") && (E = B), E.parent(x.dropdown).length > 0 ? (s.debug("UI dropdown already exists. Creating dropdown menu only"), B = E.closest(x.dropdown), G = B.children(x.menu), 0 === G.length && (G = a("<div />").addClass(u.menu).appendTo(B)), G.html(t.templates.menu(b))) : (s.debug("Creating entire dropdown from select"), B = a("<div />").attr("class", E.attr("class")).addClass(u.selection).addClass(u.dropdown).html(t.templates.dropdown(b)).insertBefore(E), E.removeAttr("class").prependTo(B)), s.refresh()
                        }
                    },
                    refresh: function() {
                        s.verbose("Refreshing selector cache"), C = B.find(x.text), D = B.find(x.search), E = B.find(x.input), F = B.prev().find(x.text).length > 0 ? B.prev().find(x.text) : B.prev(), G = B.children(x.menu), H = G.find(x.item)
                    },
                    toggle: function() {
                        s.verbose("Toggling menu visibility"), s.is.active() ? s.hide() : s.show()
                    },
                    show: function(b) {
                        b = a.isFunction(b) ? b : function() {}, s.is.searchSelection() && s.is.allFiltered() || s.can.show() && !s.is.active() && (s.debug("Showing dropdown"), s.animate.show(function() {
                            s.can.click() && s.bind.intent(), s.set.visible(), b.call(K)
                        }), t.onShow.call(K))
                    },
                    hide: function(b) {
                        b = a.isFunction(b) ? b : function() {}, s.is.active() && (s.debug("Hiding dropdown"), s.animate.hide(function() {
                            s.remove.visible(), b.call(K)
                        }), t.onHide.call(K))
                    },
                    hideOthers: function() {
                        s.verbose("Finding other dropdowns to hide"), g.not(B).has(x.menu + ":visible:not(." + u.animating + ")").dropdown("hide")
                    },
                    hideSubMenus: function() {
                        var a = G.find(x.menu);
                        a.transition("hide")
                    },
                    bind: {
                        keyboardEvents: function() {
                            s.debug("Binding keyboard events"), B.on("keydown" + z, s.event.keydown), s.is.searchable() && B.on(s.get.inputEvent(), x.search, s.event.input)
                        },
                        touchEvents: function() {
                            s.debug("Touch device detected binding additional touch events"), s.is.searchSelection() || B.on("touchstart" + z, s.event.test.toggle), G.on("touchstart" + z, x.item, s.event.item.mouseenter)
                        },
                        mouseEvents: function() {
                            s.verbose("Mouse detected binding mouse events"), s.is.searchSelection() ? B.on("mousedown" + z, x.menu, s.event.menu.activate).on("mouseup" + z, x.menu, s.event.menu.deactivate).on("click" + z, x.search, s.show).on("focus" + z, x.search, s.event.searchFocus).on("blur" + z, x.search, s.event.searchBlur).on("click" + z, x.text, s.event.searchTextFocus) : ("click" == t.on ? B.on("click" + z, s.event.test.toggle) : "hover" == t.on ? B.on("mouseenter" + z, s.delay.show).on("mouseleave" + z, s.delay.hide) : B.on(t.on + z, s.toggle), B.on("mousedown" + z, s.event.mousedown).on("mouseup" + z, s.event.mouseup).on("focus" + z, s.event.focus).on("blur" + z, s.event.blur)), G.on("mouseenter" + z, x.item, s.event.item.mouseenter).on("mouseleave" + z, x.item, s.event.item.mouseleave).on("click" + z, x.item, s.event.item.click)
                        },
                        intent: function() {
                            s.verbose("Binding hide intent event to document"), j && h.on("touchstart" + p, s.event.test.touch).on("touchmove" + p, s.event.test.touch), h.on("click" + p, s.event.test.hide)
                        }
                    },
                    unbind: {
                        intent: function() {
                            s.verbose("Removing hide intent event from document"), j && h.off("touchstart" + p).off("touchmove" + p), h.off("click" + p)
                        }
                    },
                    filter: function(b) {
                        var c = a(),
                            d = s.escape.regExp(b),
                            e = new RegExp("^" + d, "igm"),
                            f = new RegExp(d, "ig");
                        s.verbose("Searching for matching values"), H.each(function() {
                            var b = a(this),
                                d = String(s.get.choiceText(b, !1)),
                                g = String(s.get.choiceValue(b, d));
                            d.match(e) || g.match(e) ? c = c.add(b) : t.fullTextSearch && (d.match(f) || g.match(f)) && (c = c.add(b))
                        }), s.debug("Setting filter", b), s.remove.filteredItem(), H.not(c).addClass(u.filtered), s.verbose("Selecting first non-filtered element"), s.remove.selectedItem(), H.not("." + u.filtered).eq(0).addClass(u.selected), s.is.allFiltered() && (s.debug("All items filtered, hiding dropdown", b), s.is.searchSelection() && s.hide(), t.onNoResults.call(K, b))
                    },
                    focusSearch: function() {
                        s.is.search() && D.focus()
                    },
                    forceSelection: function() {
                        var a = H.not(u.filtered).filter("." + u.selected).eq(0),
                            b = H.filter("." + u.active).eq(0),
                            c = a.length > 0 ? a : b,
                            d = c.size() > 0;
                        d && s.event.item.click.call(c)
                    },
                    event: {
                        mousedown: function() {
                            I = !0
                        },
                        mouseup: function() {
                            I = !1
                        },
                        focus: function() {
                            !I && s.is.hidden() && s.show()
                        },
                        blur: function() {
                            var a = c.activeElement === this;
                            I || a || s.hide()
                        },
                        searchFocus: function() {
                            I = !0, s.show()
                        },
                        searchBlur: function() {
                            var a = c.activeElement === this;
                            J || a || (t.forceSelection ? s.forceSelection() : s.hide())
                        },
                        searchTextFocus: function() {
                            I = !0, D.focus()
                        },
                        input: function() {
                            s.is.searchSelection() && s.set.filtered(), clearTimeout(s.timer), s.timer = setTimeout(s.search, t.delay.search)
                        },
                        keydown: function(a) {
                            {
                                var b, c = H.not(u.filtered).filter("." + u.selected).eq(0),
                                    d = G.children("." + u.active).eq(0),
                                    e = c.length > 0 ? c : d,
                                    f = e.length > 0 ? e.siblings(":not(." + u.filtered + ")").andSelf() : G.children(":not(." + u.filtered + ")"),
                                    g = e.children(x.menu),
                                    h = e.closest(x.menu),
                                    i = h[0] !== G[0],
                                    j = h.is(":visible"),
                                    k = a.which,
                                    l = {
                                        enter: 13,
                                        escape: 27,
                                        leftArrow: 37,
                                        upArrow: 38,
                                        rightArrow: 39,
                                        downArrow: 40
                                    },
                                    m = g.length > 0,
                                    n = e.length > 0;
                                f.size() - 1
                            }
                            if (s.is.visible()) {
                                if (k == l.enter && n && (m && !t.allowCategorySelection ? (s.verbose("Pressed enter on unselectable category, opening sub menu"), k = l.rightArrow) : (s.verbose("Enter key pressed, choosing selected item"), s.event.item.click.call(e, a))), k == l.leftArrow && (i && (s.verbose("Left key pressed, closing sub-menu"), s.animate.hide(!1, h), e.removeClass(u.selected), h.closest(x.item).addClass(u.selected)), a.preventDefault()), k == l.rightArrow && (m && (s.verbose("Right key pressed, opening sub-menu"), s.animate.show(!1, g), e.removeClass(u.selected), g.find(x.item).eq(0).addClass(u.selected)), a.preventDefault()), k == l.upArrow) {
                                    if (b = n && j ? e.prevAll(x.item + ":not(." + u.filtered + ")").eq(0) : H.eq(0), f.index(b) < 0) return void s.verbose("Up key pressed but reached top of current menu");
                                    s.verbose("Up key pressed, changing active item"), e.removeClass(u.selected), b.addClass(u.selected), s.set.scrollPosition(b), a.preventDefault()
                                }
                                if (k == l.downArrow) {
                                    if (b = n && j ? b = e.nextAll(x.item + ":not(." + u.filtered + ")").eq(0) : H.eq(0), 0 === b.length) return void s.verbose("Down key pressed but reached bottom of current menu");
                                    s.verbose("Down key pressed, changing active item"), H.removeClass(u.selected), b.addClass(u.selected), s.set.scrollPosition(b), a.preventDefault()
                                }
                            } else k == l.enter && (s.verbose("Enter key pressed, showing dropdown"), s.show()), k == l.escape && (s.verbose("Escape key pressed, closing dropdown"), s.hide()), k == l.downArrow && (s.verbose("Down key pressed, showing dropdown"), s.show())
                        },
                        test: {
                            toggle: function(a) {
                                s.determine.eventInMenu(a, s.toggle) && a.preventDefault()
                            },
                            touch: function(a) {
                                s.determine.eventInMenu(a, function() {
                                    "touchstart" == a.type ? s.timer = setTimeout(s.hide, t.delay.touch) : "touchmove" == a.type && clearTimeout(s.timer)
                                }), a.stopPropagation()
                            },
                            hide: function(a) {
                                s.determine.eventInModule(a, s.hide)
                            }
                        },
                        menu: {
                            activate: function() {
                                J = !0
                            },
                            deactivate: function() {
                                J = !1
                            }
                        },
                        item: {
                            mouseenter: function(b) {
                                var c = a(this).children(x.menu),
                                    d = a(this).siblings(x.item).children(x.menu);
                                c.length > 0 && (clearTimeout(s.itemTimer), s.itemTimer = setTimeout(function() {
                                    s.verbose("Showing sub-menu", c), a.each(d, function() {
                                        s.animate.hide(!1, a(this))
                                    }), s.animate.show(!1, c)
                                }, t.delay.show), b.preventDefault())
                            },
                            mouseleave: function() {
                                var b = a(this).children(x.menu);
                                b.length > 0 && (clearTimeout(s.itemTimer), s.itemTimer = setTimeout(function() {
                                    s.verbose("Hiding sub-menu", b), s.animate.hide(!1, b)
                                }, t.delay.hide))
                            },
                            click: function(b) {
                                var c = a(this),
                                    d = a(b ? b.target : ""),
                                    e = c.find(x.menu),
                                    f = s.get.choiceText(c),
                                    g = s.get.choiceValue(c, f),
                                    h = function() {
                                        s.remove.searchTerm(), s.determine.selectAction(f, g)
                                    },
                                    i = e.length > 0,
                                    j = e.find(d).length > 0;
                                j || i && !t.allowCategorySelection || h()
                            }
                        },
                        resetStyle: function() {
                            a(this).removeAttr("style")
                        }
                    },
                    determine: {
                        selectAction: function(b, c) {
                            s.verbose("Determining action", t.action), a.isFunction(s.action[t.action]) ? (s.verbose("Triggering preset action", t.action, b, c), s.action[t.action](b, c)) : a.isFunction(t.action) ? (s.verbose("Triggering user action", t.action, b, c), t.action(b, c)) : s.error(y.action, t.action)
                        },
                        eventInModule: function(b, c) {
                            return c = a.isFunction(c) ? c : function() {}, 0 === a(b.target).closest(B).length ? (s.verbose("Triggering event", c), c(), !0) : (s.verbose("Event occurred in dropdown, canceling callback"), !1)
                        },
                        eventInMenu: function(b, c) {
                            return c = a.isFunction(c) ? c : function() {}, 0 === a(b.target).closest(G).length ? (s.verbose("Triggering event", c), c(), !0) : (s.verbose("Event occurred in dropdown menu, canceling callback"), !1)
                        }
                    },
                    action: {
                        nothing: function() {},
                        activate: function(a, b) {
                            b = b !== d ? b : a, s.set.selected(b), s.hide(function() {
                                s.remove.filteredItem()
                            })
                        },
                        select: function(a, b) {
                            b = b !== d ? b : a, s.set.selected(b), s.hide(function() {
                                s.remove.filteredItem()
                            })
                        },
                        combo: function(a, b) {
                            b = b !== d ? b : a, s.set.selected(b), s.hide(function() {
                                s.remove.filteredItem()
                            })
                        },
                        hide: function() {
                            s.hide(function() {
                                s.remove.filteredItem()
                            })
                        }
                    },
                    get: {
                        text: function() {
                            return C.text()
                        },
                        value: function() {
                            return E.length > 0 ? E.val() : B.data(v.value)
                        },
                        choiceText: function(a, b) {
                            return b = b !== d ? b : t.preserveHTML, a !== d ? (a.find(x.menu).length > 0 && (s.verbose("Retreiving text of element with sub-menu"), a = a.clone(), a.find(x.menu).remove(), a.find(x.menuIcon).remove()), a.data(v.text) !== d ? a.data(v.text) : b ? a.html().trim() : a.text().trim()) : void 0
                        },
                        choiceValue: function(a, b) {
                            return b = b || s.get.choiceText(a), a.data(v.value) !== d ? a.data(v.value) : "string" == typeof b ? b.toLowerCase().trim() : b.trim()
                        },
                        inputEvent: function() {
                            var a = D[0];
                            return a ? a.oninput !== d ? "input" : a.onpropertychange !== d ? "propertychange" : "keyup" : !1
                        },
                        selectValues: function() {
                            var b = {};
                            return b.values = t.sortSelect ? {} : [], B.find("option").each(function() {
                                var c = a(this).html(),
                                    e = a(this).attr("value") !== d ? a(this).attr("value") : c;
                                "" === e ? b.placeholder = c : t.sortSelect ? b.values[e] = {
                                    name: c,
                                    value: e
                                } : b.values.push({
                                    name: c,
                                    value: e
                                })
                            }), t.sortSelect ? s.debug("Retrieved and sorted values from select", b) : s.debug("Retreived values from select", b), b
                        },
                        activeItem: function() {
                            return H.filter("." + u.active)
                        },
                        item: function(b, c) {
                            var e = !1;
                            return b = b !== d ? b : s.get.value() !== d ? s.get.value() : s.get.text(), c = "" === b || 0 === b ? !0 : c || !1, b !== d ? H.each(function() {
                                var d = a(this),
                                    f = s.get.choiceText(d),
                                    g = s.get.choiceValue(d, f);
                                c ? (s.verbose("Ambiguous dropdown value using strict type check", d, b), g === b ? e = a(this) : e || f !== b || (e = a(this))) : g == b ? (s.verbose("Found select item by value", g, b), e = a(this)) : e || f != b || (s.verbose("Found select item by text", f, b), e = a(this))
                            }) : b = s.get.text(), e || !1
                        },
                        uniqueID: function() {
                            return (Math.random().toString(16) + "000000000").substr(2, 8)
                        }
                    },
                    restore: {
                        defaults: function() {
                            s.restore.defaultText(), s.restore.defaultValue()
                        },
                        defaultText: function() {
                            var a = B.data(v.defaultText);
                            s.debug("Restoring default text", a), s.set.text(a), C.addClass(u.placeholder)
                        },
                        defaultValue: function() {
                            var a = B.data(v.defaultValue);
                            a !== d && (s.debug("Restoring default value", a), a.length ? s.set.selected(a) : (s.remove.activeItem(), s.remove.selectedItem()))
                        }
                    },
                    save: {
                        defaults: function() {
                            s.save.defaultText(), s.save.placeholderText(), s.save.defaultValue()
                        },
                        defaultValue: function() {
                            B.data(v.defaultValue, s.get.value())
                        },
                        defaultText: function() {
                            B.data(v.defaultText, C.text())
                        },
                        placeholderText: function() {
                            C.hasClass(u.placeholder) && B.data(v.placeholderText, C.text())
                        }
                    },
                    clear: function() {
                        var a = B.data(v.placeholderText);
                        s.set.text(a), s.set.value(""), s.remove.activeItem(), s.remove.selectedItem(), C.addClass(u.placeholder)
                    },
                    set: {
                        filtered: function() {
                            var a = D.val(),
                                b = "string" == typeof a && a.length > 0;
                            b ? C.addClass(u.filtered) : C.removeClass(u.filtered)
                        },
                        tabbable: function() {
                            s.is.searchable() ? (s.debug("Searchable dropdown initialized"), D.val("").attr("tabindex", 0), G.attr("tabindex", "-1")) : (s.debug("Simple selection dropdown initialized"), B.attr("tabindex") || (B.attr("tabindex", 0), G.attr("tabindex", "-1")))
                        },
                        scrollPosition: function(a, b) {
                            var c, e, f, g, h, i, j, k, l, m = 5;
                            a = a || s.get.activeItem(), c = a && a.length > 0, b = b !== d ? b : !1, a && c && (G.hasClass(u.visible) || G.addClass(u.loading), j = G.height(), f = a.height(), i = G.scrollTop(), h = G.offset().top, g = a.offset().top, e = i - h + g, l = e + m > i + j, k = i > e - m, s.debug("Scrolling to active item", e), (k || l || b) && G.scrollTop(e).removeClass(u.loading))
                        },
                        text: function(a) {
                            "combo" == t.action ? (s.debug("Changing combo button text", a, F), t.preserveHTML ? F.html(a) : F.text(a)) : "select" !== t.action && (s.debug("Changing text", a, C), C.removeClass(u.filtered).removeClass(u.placeholder), t.preserveHTML ? C.html(a) : C.text(a))
                        },
                        value: function(a) {
                            s.debug("Adding selected value to hidden input", a, E), E.length > 0 ? E.val(a).trigger("change") : B.data(v.value, a)
                        },
                        active: function() {
                            B.addClass(u.active)
                        },
                        visible: function() {
                            B.addClass(u.visible)
                        },
                        selected: function(a) {
                            var b, c, d = s.get.item(a);
                            d && (s.debug("Setting selected menu item to", d), s.remove.activeItem(), s.remove.selectedItem(), d.addClass(u.active).addClass(u.selected), b = s.get.choiceText(d), c = s.get.choiceValue(d, b), s.set.text(b), s.set.value(c), t.onChange.call(K, a, b, d))
                        }
                    },
                    remove: {
                        active: function() {
                            B.removeClass(u.active)
                        },
                        visible: function() {
                            B.removeClass(u.visible)
                        },
                        activeItem: function() {
                            H.removeClass(u.active)
                        },
                        filteredItem: function() {
                            H.removeClass(u.filtered)
                        },
                        searchTerm: function() {
                            D.val("")
                        },
                        selectedItem: function() {
                            H.removeClass(u.selected)
                        },
                        tabbable: function() {
                            s.is.searchable() ? (s.debug("Searchable dropdown initialized"), D.attr("tabindex", "-1"), G.attr("tabindex", "-1")) : (s.debug("Simple selection dropdown initialized"), B.attr("tabindex", "-1"), G.attr("tabindex", "-1"))
                        }
                    },
                    is: {
                        active: function() {
                            return B.hasClass(u.active)
                        },
                        alreadySetup: function() {
                            return B.is("select") && B.parent(x.dropdown).length > 0
                        },
                        animating: function(a) {
                            return a ? a.is(":animated") || a.transition && a.transition("is animating") : G.is(":animated") || G.transition && G.transition("is animating")
                        },
                        allFiltered: function() {
                            return H.filter("." + u.filtered).length === H.length
                        },
                        hidden: function(a) {
                            return a ? a.is(":hidden") : G.is(":hidden")
                        },
                        selectMutation: function(b) {
                            var c = !1;
                            return a.each(b, function(b, d) {
                                return d.target && a(d.target).is("select") ? (c = !0, !0) : void 0
                            }), c
                        },
                        search: function() {
                            return B.hasClass(u.search)
                        },
                        searchable: function() {
                            return D.length > 0
                        },
                        searchSelection: function() {
                            return s.is.searchable() && D.parent().is(B)
                        },
                        selection: function() {
                            return B.hasClass(u.selection)
                        },
                        upward: function() {
                            return B.hasClass(u.upward)
                        },
                        visible: function(a) {
                            return a ? a.is(":visible") : G.is(":visible")
                        }
                    },
                    can: {
                        click: function() {
                            return j || "click" == t.on
                        },
                        show: function() {
                            return !B.hasClass(u.disabled)
                        }
                    },
                    animate: {
                        show: function(b, c) {
                            var e = c || G,
                                f = c ? function() {} : function() {
                                    s.hideSubMenus(), s.hideOthers(), s.set.active()
                                };
                            b = a.isFunction(b) ? b : function() {}, s.set.scrollPosition(s.get.activeItem(), !0), s.verbose("Doing menu show animation", e), (s.is.hidden(e) || s.is.animating(e)) && ("auto" == t.transition && (t.transition = s.is.upward() ? "slide up" : "slide down", s.verbose("Automatically determining animation based on animation direction", t.transition)), "none" == t.transition ? b.call(K) : a.fn.transition !== d && B.transition("is supported") ? e.transition({
                                animation: t.transition + " in",
                                debug: t.debug,
                                verbose: t.verbose,
                                duration: t.duration,
                                queue: !0,
                                onStart: f,
                                onComplete: function() {
                                    b.call(K)
                                }
                            }) : "slide down" == t.transition ? (f(), e.hide().clearQueue().children().clearQueue().css("opacity", 0).delay(50).animate({
                                opacity: 1
                            }, t.duration, "easeOutQuad", s.event.resetStyle).end().slideDown(100, "easeOutQuad", function() {
                                s.event.resetStyle.call(this), b.call(K)
                            })) : "fade" == t.transition ? (f(), e.hide().clearQueue().fadeIn(t.duration, function() {
                                s.event.resetStyle.call(this), b.call(K)
                            })) : s.error(y.transition, t.transition))
                        },
                        hide: function(b, c) {
                            var e = c || G,
                                f = (c ? .9 * t.duration : t.duration, c ? function() {} : function() {
                                    s.can.click() && s.unbind.intent(), s.focusSearch(), s.remove.active()
                                });
                            b = a.isFunction(b) ? b : function() {}, (s.is.visible(e) || s.is.animating(e)) && (s.verbose("Doing menu hide animation", e), "auto" == t.transition && (t.transition = s.is.upward() ? "slide up" : "slide down"), E.trigger("blur"), "none" == t.transition ? b.call(K) : a.fn.transition !== d && B.transition("is supported") ? e.transition({
                                animation: t.transition + " out",
                                duration: t.duration,
                                debug: t.debug,
                                verbose: t.verbose,
                                queue: !0,
                                onStart: f,
                                onComplete: function() {
                                    b.call(K)
                                }
                            }) : "slide down" == t.transition ? (f(), e.show().clearQueue().children().clearQueue().css("opacity", 1).animate({
                                opacity: 0
                            }, 100, "easeOutQuad", s.event.resetStyle).end().delay(50).slideUp(100, "easeOutQuad", function() {
                                s.event.resetStyle.call(this), b.call(K)
                            })) : "fade" == t.transition ? (f(), e.show().clearQueue().fadeOut(150, function() {
                                s.event.resetStyle.call(this), b.call(K)
                            })) : s.error(y.transition))
                        }
                    },
                    delay: {
                        show: function() {
                            s.verbose("Delaying show event to ensure user intent"), clearTimeout(s.timer), s.timer = setTimeout(s.show, t.delay.show)
                        },
                        hide: function() {
                            s.verbose("Delaying hide event to ensure user intent"), clearTimeout(s.timer), s.timer = setTimeout(s.hide, t.delay.hide)
                        }
                    },
                    escape: {
                        regExp: function(a) {
                            return a = String(a), a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
                        }
                    },
                    setting: function(b, c) {
                        if (s.debug("Changing setting", b, c), a.isPlainObject(b)) a.extend(!0, t, b);
                        else {
                            if (c === d) return t[b];
                            t[b] = c
                        }
                    },
                    internal: function(b, c) {
                        if (a.isPlainObject(b)) a.extend(!0, s, b);
                        else {
                            if (c === d) return s[b];
                            s[b] = c
                        }
                    },
                    debug: function() {
                        t.debug && (t.performance ? s.performance.log(arguments) : (s.debug = Function.prototype.bind.call(console.info, console, t.name + ":"), s.debug.apply(console, arguments)))
                    },
                    verbose: function() {
                        t.verbose && t.debug && (t.performance ? s.performance.log(arguments) : (s.verbose = Function.prototype.bind.call(console.info, console, t.name + ":"), s.verbose.apply(console, arguments)))
                    },
                    error: function() {
                        s.error = Function.prototype.bind.call(console.error, console, t.name + ":"), s.error.apply(console, arguments)
                    },
                    performance: {
                        log: function(a) {
                            var b, c, d;
                            t.performance && (b = (new Date).getTime(), d = k || b, c = b - d, k = b, l.push({
                                Name: a[0],
                                Arguments: [].slice.call(a, 1) || "",
                                Element: K,
                                "Execution Time": c
                            })), clearTimeout(s.performance.timer), s.performance.timer = setTimeout(s.performance.display, 100)
                        },
                        display: function() {
                            var b = t.name + ":",
                                c = 0;
                            k = !1, clearTimeout(s.performance.timer), a.each(l, function(a, b) {
                                c += b["Execution Time"]
                            }), b += " " + c + "ms", i && (b += " '" + i + "'"), (console.group !== d || console.table !== d) && l.length > 0 && (console.groupCollapsed(b), console.table ? console.table(l) : a.each(l, function(a, b) {
                                console.log(b.Name + ": " + b["Execution Time"] + "ms")
                            }), console.groupEnd()), l = []
                        }
                    },
                    invoke: function(b, c, e) {
                        var g, h, i, j = L;
                        return c = c || o, e = K || e, "string" == typeof b && j !== d && (b = b.split(/[\. ]/), g = b.length - 1, a.each(b, function(c, e) {
                            var f = c != g ? e + b[c + 1].charAt(0).toUpperCase() + b[c + 1].slice(1) : b;
                            if (a.isPlainObject(j[f]) && c != g) j = j[f];
                            else {
                                if (j[f] !== d) return h = j[f], !1;
                                if (!a.isPlainObject(j[e]) || c == g) return j[e] !== d ? (h = j[e], !1) : (s.error(y.method, b), !1);
                                j = j[e]
                            }
                        })), a.isFunction(h) ? i = h.apply(e, c) : h !== d && (i = h), a.isArray(f) ? f.push(i) : f !== d ? f = [f, i] : i !== d && (f = i), h
                    }
                }, n ? (L === d && s.initialize(), s.invoke(m)) : (L !== d && L.invoke("destroy"), s.initialize())
            }), f !== d ? f : this
        }, a.fn.dropdown.settings = {
            debug: !1,
            verbose: !0,
            performance: !0,
            on: "click",
            action: "activate",
            allowTab: !0,
            fullTextSearch: !1,
            preserveHTML: !0,
            sortSelect: !1,
            allowCategorySelection: !1,
            delay: {
                hide: 300,
                show: 200,
                search: 50,
                touch: 50
            },
            forceSelection: !0,
            transition: "auto",
            duration: 250,
            onNoResults: function() {},
            onChange: function() {},
            onShow: function() {},
            onHide: function() {},
            name: "Dropdown",
            namespace: "dropdown",
            error: {
                action: "You called a dropdown action that was not defined",
                alreadySetup: "Once a select has been initialized behaviors must be called on the created ui dropdown",
                method: "The method you called is not defined.",
                transition: "The requested transition was not found"
            },
            metadata: {
                defaultText: "defaultText",
                defaultValue: "defaultValue",
                placeholderText: "placeholderText",
                text: "text",
                value: "value"
            },
            selector: {
                dropdown: ".ui.dropdown",
                input: '> input[type="hidden"], > select',
                item: ".item",
                menu: ".menu",
                menuIcon: ".dropdown.icon",
                search: "> input.search, .menu > .search > input, .menu > input.search",
                text: "> .text:not(.icon)"
            },
            className: {
                active: "active",
                animating: "animating",
                disabled: "disabled",
                dropdown: "ui dropdown",
                filtered: "filtered",
                loading: "loading",
                menu: "menu",
                placeholder: "default",
                search: "search",
                selected: "selected",
                selection: "selection",
                upward: "upward",
                visible: "visible"
            }
        }, a.fn.dropdown.settings.templates = {
            menu: function(b) {
                var c = (b.placeholder || !1, b.values || {}, "");
                return a.each(b.values, function(a, b) {
                    c += '<div class="item" data-value="' + b.value + '">' + b.name + "</div>"
                }), c
            },
            dropdown: function(b) {
                var c = b.placeholder || !1,
                    d = (b.values || {}, "");
                return d += '<i class="dropdown icon"></i>', d += b.placeholder ? '<div class="default text">' + c + "</div>" : '<div class="text"></div>', d += '<div class="menu">', a.each(b.values, function(a, b) {
                    d += '<div class="item" data-value="' + b.value + '">' + b.name + "</div>"
                }), d += "</div>"
            }
        }, a.extend(a.easing, {
            easeOutQuad: function(a, b, c, d, e) {
                return -d * (b /= e) * (b - 2) + c
            }
        })
    }(jQuery, window, document),
    function(a, b, c, d) {
        "use strict";
        a.fn.modal = function(e) {
            var f, g = a(this),
                h = a(b),
                i = a(c),
                j = a("body"),
                k = g.selector || "",
                l = (new Date).getTime(),
                m = [],
                n = arguments[0],
                o = "string" == typeof n,
                p = [].slice.call(arguments, 1),
                q = b.requestAnimationFrame || b.mozRequestAnimationFrame || b.webkitRequestAnimationFrame || b.msRequestAnimationFrame || function(a) {
                    setTimeout(a, 0)
                };
            return g.each(function() {
                var g, r, s, t, u, v, w, x, y, z = a.isPlainObject(e) ? a.extend(!0, {}, a.fn.modal.settings, e) : a.extend({}, a.fn.modal.settings),
                    A = z.selector,
                    B = z.className,
                    C = z.namespace,
                    D = z.error,
                    E = "." + C,
                    F = "module-" + C,
                    G = a(this),
                    H = a(z.context),
                    I = G.find(A.close),
                    J = this,
                    K = G.data(F);
                y = {
                    initialize: function() {
                        y.verbose("Initializing dimmer", H), y.create.id(), y.create.dimmer(), y.refreshModals(), y.verbose("Attaching close events", I), y.bind.events(), y.observeChanges(), y.instantiate()
                    },
                    instantiate: function() {
                        y.verbose("Storing instance of modal"), K = y, G.data(F, K)
                    },
                    create: {
                        dimmer: function() {
                            var b = {
                                    debug: z.debug,
                                    dimmerName: "modals",
                                    duration: {
                                        show: z.duration,
                                        hide: z.duration
                                    }
                                },
                                c = a.extend(!0, b, z.dimmerSettings);
                            return a.fn.dimmer === d ? void y.error(D.dimmer) : (y.debug("Creating dimmer with settings", c), t = H.dimmer(c), z.detachable && (y.verbose("Modal is detachable, moving content into dimmer"), t.dimmer("add content", G)), void(u = t.dimmer("get dimmer")))
                        },
                        id: function() {
                            y.verbose("Creating unique id for element"), w = y.get.uniqueID(), v = "." + w
                        }
                    },
                    destroy: function() {
                        y.verbose("Destroying previous modal"), G.removeData(F).off(E), h.off(v), I.off(E), H.dimmer("destroy")
                    },
                    observeChanges: function() {
                        "MutationObserver" in b && (x = new MutationObserver(function() {
                            y.debug("DOM tree modified, refreshing"), y.refresh()
                        }), x.observe(J, {
                            childList: !0,
                            subtree: !0
                        }), y.debug("Setting up mutation observer", x))
                    },
                    refresh: function() {
                        y.remove.scrolling(), y.cacheSizes(), y.set.screenHeight(), y.set.type(), y.set.position()
                    },
                    refreshModals: function() {
                        r = G.siblings(A.modal), g = r.add(G)
                    },
                    attachEvents: function(b, c) {
                        var d = a(b);
                        c = a.isFunction(y[c]) ? y[c] : y.toggle, d.length > 0 ? (y.debug("Attaching modal events to element", b, c), d.off(E).on("click" + E, c)) : y.error(D.notFound, b)
                    },
                    bind: {
                        events: function() {
                            I.on("click" + E, y.event.close), h.on("resize" + v, y.event.resize)
                        }
                    },
                    get: {
                        uniqueID: function() {
                            return (Math.random().toString(16) + "000000000").substr(2, 8)
                        }
                    },
                    event: {
                        close: function() {
                            y.verbose("Closing element pressed"), a(this).is(A.approve) ? z.onApprove.call(J) !== !1 ? y.hide() : y.verbose("Approve callback returned false cancelling hide") : a(this).is(A.deny) ? z.onDeny.call(J) !== !1 ? y.hide() : y.verbose("Deny callback returned false cancelling hide") : y.hide()
                        },
                        click: function(b) {
                            0 === a(b.target).closest(G).length && (y.debug("Dimmer clicked, hiding all modals"), y.is.active() && (y.remove.clickaway(), z.allowMultiple ? y.hide() : y.hideAll()))
                        },
                        debounce: function(a, b) {
                            clearTimeout(y.timer), y.timer = setTimeout(a, b)
                        },
                        keyboard: function(a) {
                            var b = a.which,
                                c = 27;
                            b == c && (z.closable ? (y.debug("Escape key pressed hiding modal"), y.hide()) : y.debug("Escape key pressed, but closable is set to false"), a.preventDefault())
                        },
                        resize: function() {
                            t.dimmer("is active") && q(y.refresh)
                        }
                    },
                    toggle: function() {
                        y.is.active() || y.is.animating() ? y.hide() : y.show()
                    },
                    show: function(b) {
                        b = a.isFunction(b) ? b : function() {}, y.refreshModals(), y.showModal(b)
                    },
                    hide: function(b) {
                        b = a.isFunction(b) ? b : function() {}, y.refreshModals(), y.hideModal(b)
                    },
                    showModal: function(b) {
                        b = a.isFunction(b) ? b : function() {}, y.is.animating() || !y.is.active() ? (y.showDimmer(), y.cacheSizes(), y.set.position(), y.set.screenHeight(), y.set.type(), y.set.clickaway(), !z.allowMultiple && r.filter(":visible").length > 0 ? (y.debug("Other modals visible, queueing show animation"), y.hideOthers(y.showModal)) : (z.onShow.call(J), z.transition && a.fn.transition !== d && G.transition("is supported") ? (y.debug("Showing modal with css animations"), G.transition({
                            debug: z.debug,
                            animation: z.transition + " in",
                            queue: z.queue,
                            duration: z.duration,
                            useFailSafe: !0,
                            onComplete: function() {
                                z.onVisible.apply(J), y.add.keyboardShortcuts(), y.save.focus(), y.set.active(), y.set.autofocus(), b()
                            }
                        })) : (y.debug("Showing modal with javascript"), G.fadeIn(z.duration, z.easing, function() {
                            z.onVisible.apply(J), y.add.keyboardShortcuts(), y.save.focus(), y.set.active(), b()
                        })))) : y.debug("Modal is already visible")
                    },
                    hideModal: function(b) {
                        b = a.isFunction(b) ? b : function() {}, y.debug("Hiding modal"), z.onHide.call(J), (y.is.animating() || y.is.active()) && (z.transition && a.fn.transition !== d && G.transition("is supported") ? (y.remove.active(), G.transition({
                            debug: z.debug,
                            animation: z.transition + " out",
                            queue: z.queue,
                            duration: z.duration,
                            useFailSafe: !0,
                            onStart: function() {
                                y.othersActive() || y.hideDimmer(), y.remove.keyboardShortcuts()
                            },
                            onComplete: function() {
                                z.onHidden.call(J), y.restore.focus(), b()
                            }
                        })) : (y.remove.active(), y.othersActive() || y.hideDimmer(), y.remove.keyboardShortcuts(), G.fadeOut(z.duration, z.easing, function() {
                            z.onHidden.call(J), y.restore.focus(), b()
                        })))
                    },
                    showDimmer: function() {
                        t.dimmer("is animating") || !t.dimmer("is active") ? (y.debug("Showing dimmer"), t.dimmer("show")) : y.debug("Dimmer already visible")
                    },
                    hideDimmer: function() {
                        return t.dimmer("is animating") || t.dimmer("is active") ? void t.dimmer("hide", function() {
                            z.transition && a.fn.transition !== d && G.transition("is supported") && (y.remove.clickaway(), y.remove.screenHeight())
                        }) : void y.debug("Dimmer is not visible cannot hide")
                    },
                    hideAll: function(b) {
                        b = a.isFunction(b) ? b : function() {}, g.is(":visible") && (y.debug("Hiding all visible modals"), y.hideDimmer(), g.filter(":visible").modal("hide modal", b))
                    },
                    hideOthers: function(b) {
                        b = a.isFunction(b) ? b : function() {}, r.is(":visible") && (y.debug("Hiding other modals", r), r.filter(":visible").modal("hide modal", b))
                    },
                    othersActive: function() {
                        return r.filter("." + B.active).length > 0
                    },
                    add: {
                        keyboardShortcuts: function() {
                            y.verbose("Adding keyboard shortcuts"), i.on("keyup" + E, y.event.keyboard)
                        }
                    },
                    save: {
                        focus: function() {
                            s = a(c.activeElement).blur()
                        }
                    },
                    restore: {
                        focus: function() {
                            s && s.length > 0 && s.focus()
                        }
                    },
                    remove: {
                        active: function() {
                            G.removeClass(B.active)
                        },
                        clickaway: function() {
                            z.closable && u.off("click" + v)
                        },
                        screenHeight: function() {
                            y.cache.height > y.cache.pageHeight && (y.debug("Removing page height"), j.css("height", ""))
                        },
                        keyboardShortcuts: function() {
                            y.verbose("Removing keyboard shortcuts"), i.off("keyup" + E)
                        },
                        scrolling: function() {
                            t.removeClass(B.scrolling), G.removeClass(B.scrolling)
                        }
                    },
                    cacheSizes: function() {
                        var e = G.outerHeight();
                        (y.cache === d || 0 !== e) && (y.cache = {
                            pageHeight: a(c).outerHeight(),
                            height: e + z.offset,
                            contextHeight: "body" == z.context ? a(b).height() : t.height()
                        }), y.debug("Caching modal and container sizes", y.cache)
                    },
                    can: {
                        fit: function() {
                            return y.cache.height + 2 * z.padding < y.cache.contextHeight
                        }
                    },
                    is: {
                        active: function() {
                            return G.hasClass(B.active)
                        },
                        animating: function() {
                            return G.transition("is supported") ? G.transition("is animating") : G.is(":visible")
                        },
                        scrolling: function() {
                            return t.hasClass(B.scrolling)
                        },
                        modernBrowser: function() {
                            return !(b.ActiveXObject || "ActiveXObject" in b)
                        }
                    },
                    set: {
                        autofocus: function() {
                            if (z.autofocus) {
                                var a = G.find(":input:visible"),
                                    b = a.filter("[autofocus]"),
                                    c = b.length > 0 ? b : a;
                                c.first().focus()
                            }
                        },
                        clickaway: function() {
                            z.closable && u.on("click" + v, y.event.click)
                        },
                        screenHeight: function() {
                            y.can.fit() ? j.css("height", "") : (y.debug("Modal is taller than page content, resizing page height"), j.css("height", y.cache.height + z.padding / 2))
                        },
                        active: function() {
                            G.addClass(B.active)
                        },
                        scrolling: function() {
                            t.addClass(B.scrolling), G.addClass(B.scrolling)
                        },
                        type: function() {
                            y.can.fit() ? (y.verbose("Modal fits on screen"), y.othersActive || y.remove.scrolling()) : (y.verbose("Modal cannot fit on screen setting to scrolling"), y.set.scrolling())
                        },
                        position: function() {
                            y.verbose("Centering modal on page", y.cache), G.css(y.can.fit() ? {
                                top: "",
                                marginTop: -(y.cache.height / 2)
                            } : {
                                marginTop: "",
                                top: i.scrollTop()
                            })
                        }
                    },
                    setting: function(b, c) {
                        if (y.debug("Changing setting", b, c), a.isPlainObject(b)) a.extend(!0, z, b);
                        else {
                            if (c === d) return z[b];
                            z[b] = c
                        }
                    },
                    internal: function(b, c) {
                        if (a.isPlainObject(b)) a.extend(!0, y, b);
                        else {
                            if (c === d) return y[b];
                            y[b] = c
                        }
                    },
                    debug: function() {
                        z.debug && (z.performance ? y.performance.log(arguments) : (y.debug = Function.prototype.bind.call(console.info, console, z.name + ":"), y.debug.apply(console, arguments)))
                    },
                    verbose: function() {
                        z.verbose && z.debug && (z.performance ? y.performance.log(arguments) : (y.verbose = Function.prototype.bind.call(console.info, console, z.name + ":"), y.verbose.apply(console, arguments)))
                    },
                    error: function() {
                        y.error = Function.prototype.bind.call(console.error, console, z.name + ":"), y.error.apply(console, arguments)
                    },
                    performance: {
                        log: function(a) {
                            var b, c, d;
                            z.performance && (b = (new Date).getTime(), d = l || b, c = b - d, l = b, m.push({
                                Name: a[0],
                                Arguments: [].slice.call(a, 1) || "",
                                Element: J,
                                "Execution Time": c
                            })), clearTimeout(y.performance.timer), y.performance.timer = setTimeout(y.performance.display, 100)
                        },
                        display: function() {
                            var b = z.name + ":",
                                c = 0;
                            l = !1, clearTimeout(y.performance.timer), a.each(m, function(a, b) {
                                c += b["Execution Time"]
                            }), b += " " + c + "ms", k && (b += " '" + k + "'"), (console.group !== d || console.table !== d) && m.length > 0 && (console.groupCollapsed(b), console.table ? console.table(m) : a.each(m, function(a, b) {
                                console.log(b.Name + ": " + b["Execution Time"] + "ms")
                            }), console.groupEnd()), m = []
                        }
                    },
                    invoke: function(b, c, e) {
                        var g, h, i, j = K;
                        return c = c || p, e = J || e, "string" == typeof b && j !== d && (b = b.split(/[\. ]/), g = b.length - 1, a.each(b, function(c, e) {
                            var f = c != g ? e + b[c + 1].charAt(0).toUpperCase() + b[c + 1].slice(1) : b;
                            if (a.isPlainObject(j[f]) && c != g) j = j[f];
                            else {
                                if (j[f] !== d) return h = j[f], !1;
                                if (!a.isPlainObject(j[e]) || c == g) return j[e] !== d ? (h = j[e], !1) : !1;
                                j = j[e]
                            }
                        })), a.isFunction(h) ? i = h.apply(e, c) : h !== d && (i = h), a.isArray(f) ? f.push(i) : f !== d ? f = [f, i] : i !== d && (f = i), h
                    }
                }, o ? (K === d && y.initialize(), y.invoke(n)) : (K !== d && K.invoke("destroy"), y.initialize())
            }), f !== d ? f : this
        }, a.fn.modal.settings = {
            name: "Modal",
            namespace: "modal",
            debug: !1,
            verbose: !0,
            performance: !0,
            allowMultiple: !1,
            detachable: !0,
            closable: !0,
            autofocus: !0,
            dimmerSettings: {
                closable: !1,
                useCSS: !0
            },
            context: "body",
            queue: !1,
            duration: 500,
            easing: "easeOutExpo",
            offset: 0,
            transition: "scale",
            padding: 50,
            onShow: function() {},
            onHide: function() {},
            onVisible: function() {},
            onHidden: function() {},
            onApprove: function() {
                return !0
            },
            onDeny: function() {
                return !0
            },
            selector: {
                close: ".close, .actions .button",
                approve: ".actions .positive, .actions .approve, .actions .ok",
                deny: ".actions .negative, .actions .deny, .actions .cancel",
                modal: ".ui.modal"
            },
            error: {
                dimmer: "UI Dimmer, a required component is not included in this page",
                method: "The method you called is not defined.",
                notFound: "The element you specified could not be found"
            },
            className: {
                active: "active",
                animating: "animating",
                scrolling: "scrolling"
            }
        }
    }(jQuery, window, document),
    function(a, b, c, d) {
        "use strict";
        a.fn.popup = function(e) {
            var f, g = a(this),
                h = a(c),
                i = g.selector || "",
                j = ("ontouchstart" in c.documentElement, (new Date).getTime()),
                k = [],
                l = arguments[0],
                m = "string" == typeof l,
                n = [].slice.call(arguments, 1);
            return g.each(function() {
                var c, g, o, p = a.isPlainObject(e) ? a.extend(!0, {}, a.fn.popup.settings, e) : a.extend({}, a.fn.popup.settings),
                    q = p.selector,
                    r = p.className,
                    s = p.error,
                    t = p.metadata,
                    u = p.namespace,
                    v = "." + p.namespace,
                    w = "module-" + u,
                    x = a(this),
                    y = a(p.context),
                    z = p.target ? a(p.target) : x,
                    A = a(b),
                    B = a("body"),
                    C = 0,
                    D = !1,
                    E = this,
                    F = x.data(w);
                o = {
                    initialize: function() {
                        o.debug("Initializing module", x), "click" == p.on ? x.on("click" + v, o.toggle) : o.get.startEvent() && x.on(o.get.startEvent() + v, o.event.start).on(o.get.endEvent() + v, o.event.end), p.target && o.debug("Target set to element", z), A.on("resize" + v, o.event.resize), !o.exists() && p.preserve && o.create(), o.instantiate()
                    },
                    instantiate: function() {
                        o.verbose("Storing instance of module", o), F = o, x.data(w, F)
                    },
                    refresh: function() {
                        p.popup ? c = a(p.popup).eq(0) : p.inline && (c = z.next(q.popup).eq(0)), p.popup ? (c.addClass(r.loading), g = o.get.offsetParent(), c.removeClass(r.loading), p.movePopup && o.has.popup() && o.get.offsetParent(c)[0] !== g[0] && (o.debug("Moving popup to the same offset parent as activating element"), c.detach().appendTo(g))) : g = p.inline ? o.get.offsetParent(z) : o.has.popup() ? o.get.offsetParent(c) : B, g.is("html") && (o.debug("Setting page as offset parent"), g = B)
                    },
                    reposition: function() {
                        o.refresh(), o.set.position()
                    },
                    destroy: function() {
                        o.debug("Destroying previous module"), c && !p.preserve && o.removePopup(), clearTimeout(o.hideTimer), clearTimeout(o.showTimer), x.off(v).removeData(w)
                    },
                    event: {
                        start: function() {
                            var b = a.isPlainObject(p.delay) ? p.delay.show : p.delay;
                            clearTimeout(o.hideTimer), o.showTimer = setTimeout(function() {
                                !o.is.hidden() || o.is.active() && o.is.dropdown() || o.show()
                            }, b)
                        },
                        end: function() {
                            var b = a.isPlainObject(p.delay) ? p.delay.hide : p.delay;
                            clearTimeout(o.showTimer), o.hideTimer = setTimeout(function() {
                                o.is.visible() && o.hide()
                            }, b)
                        },
                        resize: function() {
                            o.is.visible() && o.set.position()
                        }
                    },
                    create: function() {
                        var b = x.data(t.html) || p.html,
                            d = x.data(t.variation) || p.variation,
                            e = x.data(t.title) || p.title,
                            f = x.data(t.content) || x.attr("title") || p.content;
                        b || f || e ? (o.debug("Creating pop-up html"), b || (b = p.templates.popup({
                            title: e,
                            content: f
                        })), c = a("<div/>").addClass(r.popup).addClass(d).html(b), d && c.addClass(d), p.inline ? (o.verbose("Inserting popup element inline", c), c.insertAfter(x)) : (o.verbose("Appending popup element to body", c), c.appendTo(y)), o.refresh(), p.hoverable && o.bind.popup(), p.onCreate.call(c, E)) : 0 !== z.next(q.popup).length ? (o.verbose("Pre-existing popup found"), p.inline = !0, p.popup = z.next(q.popup), o.refresh(), p.hoverable && o.bind.popup()) : p.popup ? (o.verbose("Used popup specified in settings"), o.refresh(), p.hoverable && o.bind.popup()) : o.debug("No content specified skipping display", E)
                    },
                    toggle: function() {
                        o.debug("Toggling pop-up"), o.is.hidden() ? (o.debug("Popup is hidden, showing pop-up"), o.unbind.close(), o.hideAll(), o.show()) : (o.debug("Popup is visible, hiding pop-up"), o.hide())
                    },
                    show: function(b) {
                        b = a.isFunction(b) ? b : function() {}, o.debug("Showing pop-up", p.transition), o.exists() ? p.preserve || p.popup || o.refresh() : o.create(), c && o.set.position() && (o.save.conditions(), o.animate.show(b))
                    },
                    hide: function(b) {
                        b = a.isFunction(b) ? b : function() {}, o.remove.visible(), o.unbind.close(), o.is.visible() && (o.restore.conditions(), o.animate.hide(b))
                    },
                    hideAll: function() {
                        a(q.popup).filter(":visible").transition(p.transition)
                    },
                    hideGracefully: function(b) {
                        b && 0 === a(b.target).closest(q.popup).length ? (o.debug("Click occurred outside popup hiding popup"), o.hide()) : o.debug("Click was inside popup, keeping popup open")
                    },
                    exists: function() {
                        return c ? p.inline || p.popup ? o.has.popup() : c.closest(y).length >= 1 ? !0 : !1 : !1
                    },
                    removePopup: function() {
                        o.debug("Removing popup", c), o.has.popup() && !p.popup && (c.remove(), c = d), p.onRemove.call(c, E)
                    },
                    save: {
                        conditions: function() {
                            o.cache = {
                                title: x.attr("title")
                            }, o.cache.title && x.removeAttr("title"), o.verbose("Saving original attributes", o.cache.title)
                        }
                    },
                    restore: {
                        conditions: function() {
                            return o.cache && o.cache.title && (x.attr("title", o.cache.title), o.verbose("Restoring original attributes", o.cache.title)), !0
                        }
                    },
                    animate: {
                        show: function(b) {
                            b = a.isFunction(b) ? b : function() {}, p.transition && a.fn.transition !== d && x.transition("is supported") ? (o.set.visible(), c.transition({
                                animation: p.transition + " in",
                                queue: !1,
                                debug: p.debug,
                                verbose: p.verbose,
                                duration: p.duration,
                                onComplete: function() {
                                    o.bind.close(), b.call(c, E), p.onVisible.call(c, E)
                                }
                            })) : (o.set.visible(), c.stop().fadeIn(p.duration, p.easing, function() {
                                o.bind.close(), b.call(c, E), p.onVisible.call(c, E)
                            })), p.onShow.call(c, E)
                        },
                        hide: function(b) {
                            b = a.isFunction(b) ? b : function() {}, o.debug("Hiding pop-up"), p.transition && a.fn.transition !== d && x.transition("is supported") ? c.transition({
                                animation: p.transition + " out",
                                queue: !1,
                                duration: p.duration,
                                debug: p.debug,
                                verbose: p.verbose,
                                onComplete: function() {
                                    o.reset(), b.call(c, E), p.onHidden.call(c, E)
                                }
                            }) : c.stop().fadeOut(p.duration, p.easing, function() {
                                o.reset(), b.call(c, E), p.onHidden.call(c, E)
                            }), p.onHide.call(c, E)
                        }
                    },
                    get: {
                        startEvent: function() {
                            return "hover" == p.on ? "mouseenter" : "focus" == p.on ? "focus" : !1
                        },
                        endEvent: function() {
                            return "hover" == p.on ? "mouseleave" : "focus" == p.on ? "blur" : !1
                        },
                        offsetParent: function(b) {
                            var c = b !== d ? b[0] : x[0],
                                e = c.parentNode,
                                f = a(e);
                            if (e)
                                for (var g = "none" === f.css("transform"), h = "static" === f.css("position"), i = f.is("html"); e && !i && h && g;) e = e.parentNode, f = a(e), g = "none" === f.css("transform"), h = "static" === f.css("position"), i = f.is("html");
                            return f && f.length > 0 ? f : a()
                        },
                        offstagePosition: function(d) {
                            var e = {
                                    top: a(b).scrollTop(),
                                    bottom: a(b).scrollTop() + a(b).height(),
                                    left: 0,
                                    right: a(b).width()
                                },
                                f = {
                                    width: c.width(),
                                    height: c.height(),
                                    offset: c.offset()
                                },
                                g = {},
                                h = [];
                            return d = d || !1, f.offset && d && (o.verbose("Checking if outside viewable area", f.offset), g = {
                                top: f.offset.top < e.top,
                                bottom: f.offset.top + f.height > e.bottom,
                                right: f.offset.left + f.width > e.right,
                                left: f.offset.left < e.left
                            }), a.each(g, function(a, b) {
                                b && h.push(a)
                            }), h.length > 0 ? h.join(" ") : !1
                        },
                        positions: function() {
                            return {
                                "top left": !1,
                                "top center": !1,
                                "top right": !1,
                                "bottom left": !1,
                                "bottom center": !1,
                                "bottom right": !1,
                                "left center": !1,
                                "right center": !1
                            }
                        },
                        nextPosition: function(a) {
                            var b = a.split(" "),
                                c = b[0],
                                d = b[1],
                                e = {
                                    top: "bottom",
                                    bottom: "top",
                                    left: "right",
                                    right: "left"
                                },
                                f = {
                                    left: "center",
                                    center: "right",
                                    right: "left"
                                },
                                g = {
                                    "top left": "top center",
                                    "top center": "top right",
                                    "top right": "right center",
                                    "right center": "bottom right",
                                    "bottom right": "bottom center",
                                    "bottom center": "bottom left",
                                    "bottom left": "left center",
                                    "left center": "top left"
                                },
                                h = "top" == c || "bottom" == c,
                                i = !1,
                                j = !1,
                                k = !1;
                            return D || (o.verbose("All available positions available"), D = o.get.positions()), o.debug("Recording last position tried", a), D[a] = !0, "opposite" === p.prefer && (k = [e[c], d], k = k.join(" "), i = D[k] === !0, o.debug("Trying opposite strategy", k)), "adjacent" === p.prefer && h && (k = [c, f[d]], k = k.join(" "), j = D[k] === !0, o.debug("Trying adjacent strategy", k)), (j || i) && (o.debug("Using backup position", k), k = g[a]), k
                        }
                    },
                    set: {
                        position: function(e, f) {
                            var h, i, j, k = (a(b).width(), a(b).height(), z.outerWidth()),
                                l = z.outerHeight(),
                                m = c.outerWidth(),
                                n = c.outerHeight(),
                                q = g.outerWidth(),
                                u = g.outerHeight(),
                                v = p.distanceAway,
                                w = z[0],
                                y = p.inline ? parseInt(b.getComputedStyle(w).getPropertyValue("margin-top"), 10) : 0,
                                A = p.inline ? parseInt(b.getComputedStyle(w).getPropertyValue(o.is.rtl() ? "margin-right" : "margin-left"), 10) : 0,
                                B = p.inline || p.popup ? z.position() : z.offset();
                            switch (e = e || x.data(t.position) || p.position, f = f || x.data(t.offset) || p.offset, C == p.maxSearchDepth && p.lastResort && (o.debug("Using last resort position to display", p.lastResort), e = p.lastResort), p.inline && (o.debug("Adding targets margin to calculation"), "left center" == e || "right center" == e ? (f += y, v += -A) : "top left" == e || "top center" == e || "top right" == e ? (f += A, v -= y) : (f += A, v += y)), o.debug("Calculating popup positioning", e), h = e, o.is.rtl() && (h = h.replace(/left|right/g, function(a) {
                                return "left" == a ? "right" : "left"
                            }), o.debug("RTL: Popup positioning updated", h)), h) {
                                case "top left":
                                    i = {
                                        top: "auto",
                                        bottom: u - B.top + v,
                                        left: B.left + f,
                                        right: "auto"
                                    };
                                    break;
                                case "top center":
                                    i = {
                                        bottom: u - B.top + v,
                                        left: B.left + k / 2 - m / 2 + f,
                                        top: "auto",
                                        right: "auto"
                                    };
                                    break;
                                case "top right":
                                    i = {
                                        bottom: u - B.top + v,
                                        right: q - B.left - k - f,
                                        top: "auto",
                                        left: "auto"
                                    };
                                    break;
                                case "left center":
                                    i = {
                                        top: B.top + l / 2 - n / 2 + f,
                                        right: q - B.left + v,
                                        left: "auto",
                                        bottom: "auto"
                                    };
                                    break;
                                case "right center":
                                    i = {
                                        top: B.top + l / 2 - n / 2 + f,
                                        left: B.left + k + v,
                                        bottom: "auto",
                                        right: "auto"
                                    };
                                    break;
                                case "bottom left":
                                    i = {
                                        top: B.top + l + v,
                                        left: B.left + f,
                                        bottom: "auto",
                                        right: "auto"
                                    };
                                    break;
                                case "bottom center":
                                    i = {
                                        top: B.top + l + v,
                                        left: B.left + k / 2 - m / 2 + f,
                                        bottom: "auto",
                                        right: "auto"
                                    };
                                    break;
                                case "bottom right":
                                    i = {
                                        top: B.top + l + v,
                                        right: q - B.left - k - f,
                                        left: "auto",
                                        bottom: "auto"
                                    }
                            }
                            if (i === d && o.error(s.invalidPosition, e), o.debug("Calculated popup positioning values", i), c.css(i).removeClass(r.position).addClass(e).addClass(r.loading), j = o.get.offstagePosition(e)) {
                                if (o.debug("Popup cant fit into viewport", j), C < p.maxSearchDepth) return C++, e = o.get.nextPosition(e), o.debug("Trying new position", e), c ? o.set.position(e) : !1;
                                if (!p.lastResort) return o.debug("Popup could not find a position in view", c), o.error(s.cannotPlace), o.remove.attempts(), o.remove.loading(), o.reset(), !1
                            }
                            return o.debug("Position is on stage", e), o.remove.attempts(), o.set.fluidWidth(), o.remove.loading(), !0
                        },
                        fluidWidth: function() {
                            p.setFluidWidth && c.hasClass(r.fluid) && c.css("width", g.width())
                        },
                        visible: function() {
                            x.addClass(r.visible)
                        }
                    },
                    remove: {
                        loading: function() {
                            c.removeClass(r.loading)
                        },
                        visible: function() {
                            x.removeClass(r.visible)
                        },
                        attempts: function() {
                            o.verbose("Resetting all searched positions"), C = 0, D = !1
                        }
                    },
                    bind: {
                        popup: function() {
                            o.verbose("Allowing hover events on popup to prevent closing"), c && o.has.popup() && c.on("mouseenter" + v, o.event.start).on("mouseleave" + v, o.event.end)
                        },
                        close: function() {
                            (p.hideOnScroll === !0 || "auto" == p.hideOnScroll && "click" != p.on) && (h.one("touchmove" + v, o.hideGracefully).one("scroll" + v, o.hideGracefully), y.one("touchmove" + v, o.hideGracefully).one("scroll" + v, o.hideGracefully)), "click" == p.on && p.closable && (o.verbose("Binding popup close event to document"), h.on("click" + v, function(a) {
                                o.verbose("Pop-up clickaway intent detected"), o.hideGracefully.call(E, a)
                            }))
                        }
                    },
                    unbind: {
                        close: function() {
                            (p.hideOnScroll === !0 || "auto" == p.hideOnScroll && "click" != p.on) && (h.off("scroll" + v, o.hide), y.off("scroll" + v, o.hide)), "click" == p.on && p.closable && (o.verbose("Removing close event from document"), h.off("click" + v))
                        }
                    },
                    has: {
                        popup: function() {
                            return c && c.length > 0
                        }
                    },
                    is: {
                        active: function() {
                            return x.hasClass(r.active)
                        },
                        animating: function() {
                            return c && c.is(":animated") || c.hasClass(r.animating)
                        },
                        visible: function() {
                            return c && c.is(":visible")
                        },
                        dropdown: function() {
                            return x.hasClass(r.dropdown)
                        },
                        hidden: function() {
                            return !o.is.visible()
                        },
                        rtl: function() {
                            return "rtl" == x.css("direction")
                        }
                    },
                    reset: function() {
                        o.remove.visible(), p.preserve ? a.fn.transition !== d && c.transition("remove transition") : o.removePopup()
                    },
                    setting: function(b, c) {
                        if (a.isPlainObject(b)) a.extend(!0, p, b);
                        else {
                            if (c === d) return p[b];
                            p[b] = c
                        }
                    },
                    internal: function(b, c) {
                        if (a.isPlainObject(b)) a.extend(!0, o, b);
                        else {
                            if (c === d) return o[b];
                            o[b] = c
                        }
                    },
                    debug: function() {
                        p.debug && (p.performance ? o.performance.log(arguments) : (o.debug = Function.prototype.bind.call(console.info, console, p.name + ":"), o.debug.apply(console, arguments)))
                    },
                    verbose: function() {
                        p.verbose && p.debug && (p.performance ? o.performance.log(arguments) : (o.verbose = Function.prototype.bind.call(console.info, console, p.name + ":"), o.verbose.apply(console, arguments)))
                    },
                    error: function() {
                        o.error = Function.prototype.bind.call(console.error, console, p.name + ":"), o.error.apply(console, arguments)
                    },
                    performance: {
                        log: function(a) {
                            var b, c, d;
                            p.performance && (b = (new Date).getTime(), d = j || b, c = b - d, j = b, k.push({
                                Name: a[0],
                                Arguments: [].slice.call(a, 1) || "",
                                Element: E,
                                "Execution Time": c
                            })), clearTimeout(o.performance.timer), o.performance.timer = setTimeout(o.performance.display, 100)
                        },
                        display: function() {
                            var b = p.name + ":",
                                c = 0;
                            j = !1, clearTimeout(o.performance.timer), a.each(k, function(a, b) {
                                c += b["Execution Time"]
                            }), b += " " + c + "ms", i && (b += " '" + i + "'"), (console.group !== d || console.table !== d) && k.length > 0 && (console.groupCollapsed(b), console.table ? console.table(k) : a.each(k, function(a, b) {
                                console.log(b.Name + ": " + b["Execution Time"] + "ms")
                            }), console.groupEnd()), k = []
                        }
                    },
                    invoke: function(b, c, e) {
                        var g, h, i, j = F;
                        return c = c || n, e = E || e, "string" == typeof b && j !== d && (b = b.split(/[\. ]/), g = b.length - 1, a.each(b, function(c, e) {
                            var f = c != g ? e + b[c + 1].charAt(0).toUpperCase() + b[c + 1].slice(1) : b;
                            if (a.isPlainObject(j[f]) && c != g) j = j[f];
                            else {
                                if (j[f] !== d) return h = j[f], !1;
                                if (!a.isPlainObject(j[e]) || c == g) return j[e] !== d ? (h = j[e], !1) : !1;
                                j = j[e]
                            }
                        })), a.isFunction(h) ? i = h.apply(e, c) : h !== d && (i = h), a.isArray(f) ? f.push(i) : f !== d ? f = [f, i] : i !== d && (f = i), h
                    }
                }, m ? (F === d && o.initialize(), o.invoke(l)) : (F !== d && F.invoke("destroy"), o.initialize())
            }), f !== d ? f : this
        }, a.fn.popup.settings = {
            name: "Popup",
            debug: !1,
            verbose: !0,
            performance: !0,
            namespace: "popup",
            onCreate: function() {},
            onRemove: function() {},
            onShow: function() {},
            onVisible: function() {},
            onHide: function() {},
            onHidden: function() {},
            variation: "",
            content: !1,
            html: !1,
            title: !1,
            on: "hover",
            closable: !0,
            hideOnScroll: "auto",
            context: "body",
            position: "top left",
            prefer: "opposite",
            lastResort: !1,
            delay: {
                show: 30,
                hide: 0
            },
            setFluidWidth: !0,
            movePopup: !0,
            target: !1,
            popup: !1,
            inline: !1,
            preserve: !1,
            hoverable: !1,
            duration: 200,
            easing: "easeOutQuint",
            transition: "scale",
            distanceAway: 0,
            offset: 0,
            maxSearchDepth: 20,
            error: {
                invalidPosition: "The position you specified is not a valid position",
                cannotPlace: "No visible position could be found for the popup",
                method: "The method you called is not defined."
            },
            metadata: {
                content: "content",
                html: "html",
                offset: "offset",
                position: "position",
                title: "title",
                variation: "variation"
            },
            className: {
                active: "active",
                animating: "animating",
                dropdown: "dropdown",
                fluid: "fluid",
                loading: "loading",
                popup: "ui popup",
                position: "top left center bottom right",
                visible: "visible"
            },
            selector: {
                popup: ".ui.popup"
            },
            templates: {
                escape: function(a) {
                    var b = /[&<>"'`]/g,
                        c = /[&<>"'`]/,
                        d = {
                            "&": "&amp;",
                            "<": "&lt;",
                            ">": "&gt;",
                            '"': "&quot;",
                            "'": "&#x27;",
                            "`": "&#x60;"
                        },
                        e = function(a) {
                            return d[a]
                        };
                    return c.test(a) ? a.replace(b, e) : a
                },
                popup: function(b) {
                    var c = "",
                        e = a.fn.popup.settings.templates.escape;
                    return typeof b !== d && (typeof b.title !== d && b.title && (b.title = e(b.title), c += '<div class="header">' + b.title + "</div>"), typeof b.content !== d && b.content && (b.content = e(b.content), c += '<div class="content">' + b.content + "</div>")), c
                }
            }
        }, a.extend(a.easing, {
            easeOutQuad: function(a, b, c, d, e) {
                return -d * (b /= e) * (b - 2) + c
            }
        })
    }(jQuery, window, document),
    function(a, b, c, d) {
        "use strict";
        a.fn.rating = function(b) {
            var c, e = a(this),
                f = e.selector || "",
                g = (new Date).getTime(),
                h = [],
                i = arguments[0],
                j = "string" == typeof i,
                k = [].slice.call(arguments, 1);
            return e.each(function() {
                var l, m = a.isPlainObject(b) ? a.extend(!0, {}, a.fn.rating.settings, b) : a.extend({}, a.fn.rating.settings),
                    n = m.namespace,
                    o = m.className,
                    p = m.metadata,
                    q = m.selector,
                    r = (m.error, "." + n),
                    s = "module-" + n,
                    t = this,
                    u = a(this).data(s),
                    v = a(this),
                    w = v.find(q.icon);
                l = {
                    initialize: function() {
                        l.verbose("Initializing rating module", m), 0 === w.length && l.setup.layout(), m.interactive ? l.enable() : l.disable(), m.initialRating && (l.debug("Setting initial rating"), l.setRating(m.initialRating)), v.data(p.rating) && (l.debug("Rating found in metadata"), l.setRating(v.data(p.rating))), l.instantiate()
                    },
                    instantiate: function() {
                        l.verbose("Instantiating module", m), u = l, v.data(s, l)
                    },
                    destroy: function() {
                        l.verbose("Destroying previous instance", u), v.removeData(s), w.off(r)
                    },
                    refresh: function() {
                        w = v.find(q.icon)
                    },
                    setup: {
                        layout: function() {
                            var b = v.data(p.maxRating) || m.maxRating;
                            l.debug("Generating icon html dynamically"), v.html(a.fn.rating.settings.templates.icon(b)), l.refresh()
                        }
                    },
                    event: {
                        mouseenter: function() {
                            var b = a(this);
                            b.nextAll().removeClass(o.selected), v.addClass(o.selected), b.addClass(o.selected).prevAll().addClass(o.selected)
                        },
                        mouseleave: function() {
                            v.removeClass(o.selected), w.removeClass(o.selected)
                        },
                        click: function() {
                            var b = a(this),
                                c = l.getRating(),
                                d = w.index(b) + 1,
                                e = "auto" == m.clearable ? 1 === w.length : m.clearable;
                            e && c == d ? l.clearRating() : l.setRating(d)
                        }
                    },
                    clearRating: function() {
                        l.debug("Clearing current rating"), l.setRating(0)
                    },
                    getRating: function() {
                        var a = w.filter("." + o.active).length;
                        return l.verbose("Current rating retrieved", a), a
                    },
                    enable: function() {
                        l.debug("Setting rating to interactive mode"), w.on("mouseenter" + r, l.event.mouseenter).on("mouseleave" + r, l.event.mouseleave).on("click" + r, l.event.click), v.removeClass(o.disabled)
                    },
                    disable: function() {
                        l.debug("Setting rating to read-only mode"), w.off(r), v.addClass(o.disabled)
                    },
                    setRating: function(a) {
                        var b = a - 1 >= 0 ? a - 1 : 0,
                            c = w.eq(b);
                        v.removeClass(o.selected), w.removeClass(o.selected).removeClass(o.active), a > 0 && (l.verbose("Setting current rating to", a), c.prevAll().andSelf().addClass(o.active)), m.onRate.call(t, a)
                    },
                    setting: function(b, c) {
                        if (l.debug("Changing setting", b, c), a.isPlainObject(b)) a.extend(!0, m, b);
                        else {
                            if (c === d) return m[b];
                            m[b] = c
                        }
                    },
                    internal: function(b, c) {
                        if (a.isPlainObject(b)) a.extend(!0, l, b);
                        else {
                            if (c === d) return l[b];
                            l[b] = c
                        }
                    },
                    debug: function() {
                        m.debug && (m.performance ? l.performance.log(arguments) : (l.debug = Function.prototype.bind.call(console.info, console, m.name + ":"), l.debug.apply(console, arguments)))
                    },
                    verbose: function() {
                        m.verbose && m.debug && (m.performance ? l.performance.log(arguments) : (l.verbose = Function.prototype.bind.call(console.info, console, m.name + ":"), l.verbose.apply(console, arguments)))
                    },
                    error: function() {
                        l.error = Function.prototype.bind.call(console.error, console, m.name + ":"), l.error.apply(console, arguments)
                    },
                    performance: {
                        log: function(a) {
                            var b, c, d;
                            m.performance && (b = (new Date).getTime(), d = g || b, c = b - d, g = b, h.push({
                                Name: a[0],
                                Arguments: [].slice.call(a, 1) || "",
                                Element: t,
                                "Execution Time": c
                            })), clearTimeout(l.performance.timer), l.performance.timer = setTimeout(l.performance.display, 100)
                        },
                        display: function() {
                            var b = m.name + ":",
                                c = 0;
                            g = !1, clearTimeout(l.performance.timer), a.each(h, function(a, b) {
                                c += b["Execution Time"]
                            }), b += " " + c + "ms", f && (b += " '" + f + "'"), e.length > 1 && (b += " (" + e.length + ")"), (console.group !== d || console.table !== d) && h.length > 0 && (console.groupCollapsed(b), console.table ? console.table(h) : a.each(h, function(a, b) {
                                console.log(b.Name + ": " + b["Execution Time"] + "ms")
                            }), console.groupEnd()), h = []
                        }
                    },
                    invoke: function(b, e, f) {
                        var g, h, i, j = u;
                        return e = e || k, f = t || f, "string" == typeof b && j !== d && (b = b.split(/[\. ]/), g = b.length - 1, a.each(b, function(c, e) {
                            var f = c != g ? e + b[c + 1].charAt(0).toUpperCase() + b[c + 1].slice(1) : b;
                            if (a.isPlainObject(j[f]) && c != g) j = j[f];
                            else {
                                if (j[f] !== d) return h = j[f], !1;
                                if (!a.isPlainObject(j[e]) || c == g) return j[e] !== d ? (h = j[e], !1) : !1;
                                j = j[e]
                            }
                        })), a.isFunction(h) ? i = h.apply(f, e) : h !== d && (i = h), a.isArray(c) ? c.push(i) : c !== d ? c = [c, i] : i !== d && (c = i), h
                    }
                }, j ? (u === d && l.initialize(), l.invoke(i)) : (u !== d && u.invoke("destroy"), l.initialize())
            }), c !== d ? c : this
        }, a.fn.rating.settings = {
            name: "Rating",
            namespace: "rating",
            debug: !1,
            verbose: !0,
            performance: !0,
            initialRating: 0,
            interactive: !0,
            maxRating: 4,
            clearable: "auto",
            onRate: function() {},
            error: {
                method: "The method you called is not defined",
                noMaximum: "No maximum rating specified. Cannot generate HTML automatically"
            },
            metadata: {
                rating: "rating",
                maxRating: "maxRating"
            },
            className: {
                active: "active",
                disabled: "disabled",
                selected: "selected",
                loading: "loading"
            },
            selector: {
                icon: ".icon"
            },
            templates: {
                icon: function(a) {
                    for (var b = 1, c = ""; a >= b;) c += '<i class="icon"></i>', b++;
                    return c
                }
            }
        }
    }(jQuery, window, document),
    function(a, b, c, d) {
        "use strict";
        a.fn.search = function(e) {
            var f, g = a(this),
                h = g.selector || "",
                i = (new Date).getTime(),
                j = [],
                k = arguments[0],
                l = "string" == typeof k,
                m = [].slice.call(arguments, 1);
            return a(this).each(function() {
                var n, o = a.extend(!0, {}, a.fn.search.settings, e),
                    p = o.className,
                    q = o.metadata,
                    r = o.regExp,
                    s = o.selector,
                    t = o.error,
                    u = o.namespace,
                    v = "." + u,
                    w = u + "-module",
                    x = a(this),
                    y = x.find(s.prompt),
                    z = x.find(s.searchButton),
                    A = x.find(s.results),
                    B = (x.find(s.result), x.find(s.category), this),
                    C = x.data(w);
                n = {
                    initialize: function() {
                        n.verbose("Initializing module");
                        var a = y[0],
                            b = a !== d && a.oninput !== d ? "input" : a !== d && a.onpropertychange !== d ? "propertychange" : "keyup";
                        o.automatic && y.on(b + v, n.throttle), y.on("focus" + v, n.event.focus).on("blur" + v, n.event.blur).on("keydown" + v, n.handleKeyboard), z.on("click" + v, n.query), A.on("mousedown" + v, n.event.result.mousedown).on("mouseup" + v, n.event.result.mouseup).on("click" + v, s.result, n.event.result.click), n.instantiate()
                    },
                    instantiate: function() {
                        n.verbose("Storing instance of module", n), C = n, x.data(w, n)
                    },
                    destroy: function() {
                        n.verbose("Destroying instance"), x.removeData(w), y.off(v), z.off(v), A.off(v)
                    },
                    event: {
                        focus: function() {
                            n.set.focus(), clearTimeout(n.timer), n.throttle(), n.has.minimumCharacters() && n.showResults()
                        },
                        blur: function() {
                            var a = c.activeElement === this;
                            a || n.resultsClicked || (n.cancel.query(), n.remove.focus(), n.timer = setTimeout(n.hideResults, o.hideDelay))
                        },
                        result: {
                            mousedown: function() {
                                n.resultsClicked = !0
                            },
                            mouseup: function() {
                                n.resultsClicked = !1
                            },
                            click: function(c) {
                                n.debug("Search result selected");
                                var d = a(this),
                                    e = d.find(s.title).eq(0),
                                    f = d.find("a[href]").eq(0),
                                    g = f.attr("href") || !1,
                                    h = f.attr("target") || !1,
                                    i = (e.html(), e.length > 0 ? e.text() : !1),
                                    j = n.get.results(),
                                    k = n.get.result(i, j);
                                return a.isFunction(o.onSelect) && o.onSelect.call(B, k, j) === !1 ? void n.debug("Custom onSelect callback cancelled default select action") : (n.hideResults(), i && n.set.value(i), void(g && (n.verbose("Opening search link found in result", f), "_blank" == h || c.ctrlKey ? b.open(g) : b.location.href = g)))
                            }
                        }
                    },
                    handleKeyboard: function(a) {
                        var b, c = x.find(s.result),
                            d = x.find(s.category),
                            e = c.index(c.filter("." + p.active)),
                            f = c.length,
                            g = a.which,
                            h = {
                                backspace: 8,
                                enter: 13,
                                escape: 27,
                                upArrow: 38,
                                downArrow: 40
                            };
                        if (g == h.escape && (n.verbose("Escape key pressed, blurring search field"), y.trigger("blur")), n.is.visible())
                            if (g == h.enter) {
                                if (n.verbose("Enter key pressed, selecting active result"), c.filter("." + p.active).length > 0) return n.event.result.click.call(c.filter("." + p.active), a), a.preventDefault(), !1
                            } else g == h.upArrow ? (n.verbose("Up key pressed, changing active result"), b = 0 > e - 1 ? e : e - 1, d.removeClass(p.active), c.removeClass(p.active).eq(b).addClass(p.active).closest(d).addClass(p.active), a.preventDefault()) : g == h.downArrow && (n.verbose("Down key pressed, changing active result"), b = e + 1 >= f ? e : e + 1, d.removeClass(p.active), c.removeClass(p.active).eq(b).addClass(p.active).closest(d).addClass(p.active), a.preventDefault());
                        else g == h.enter && (n.verbose("Enter key pressed, executing query"), n.query(), n.set.buttonPressed(), y.one("keyup", n.remove.buttonFocus))
                    },
                    setup: {
                        api: function() {
                            var a = {
                                on: !1,
                                action: "search",
                                onFailure: n.error
                            };
                            n.verbose("First request, initializing API"), x.api(a)
                        }
                    },
                    can: {
                        useAPI: function() {
                            return a.fn.api !== d
                        },
                        transition: function() {
                            return o.transition && a.fn.transition !== d && x.transition("is supported")
                        }
                    },
                    is: {
                        empty: function() {
                            return "" === A.html()
                        },
                        visible: function() {
                            return A.filter(":visible").length > 0
                        },
                        focused: function() {
                            return y.filter(":focus").length > 0
                        }
                    },
                    get: {
                        value: function() {
                            return y.val()
                        },
                        results: function() {
                            var a = x.data(q.results);
                            return a
                        },
                        result: function(b, c) {
                            var d = !1;
                            return b = b || n.get.value(), c = c || n.get.results(), "category" === o.type ? (n.debug("Finding result that matches", b), a.each(c, function(c, e) {
                                return a.isArray(e.results) && (d = n.search.object(b, e.results)[0], d.length > 0) ? !0 : void 0
                            })) : (n.debug("Finding result in results object", b), d = n.search.object(b, c)[0]), d
                        }
                    },
                    set: {
                        focus: function() {
                            x.addClass(p.focus)
                        },
                        loading: function() {
                            x.addClass(p.loading)
                        },
                        value: function(a) {
                            n.verbose("Setting search input value", a), y.val(a), n.query()
                        },
                        buttonPressed: function() {
                            z.addClass(p.pressed)
                        }
                    },
                    remove: {
                        loading: function() {
                            x.removeClass(p.loading)
                        },
                        focus: function() {
                            x.removeClass(p.focus)
                        },
                        buttonPressed: function() {
                            z.removeClass(p.pressed)
                        }
                    },
                    query: function() {
                        var b = n.get.value(),
                            c = n.read.cachedHTML(b);
                        c ? (n.debug("Reading result for " + b + " from cache"), n.addResults(c)) : (n.debug("Querying for " + b), a.isPlainObject(o.source) || a.isArray(o.source) ? n.search.local(b) : n.can.useAPI() ? o.apiSettings ? (n.debug("Searching with specified API settings", o.apiSettings), n.search.remote(b)) : a.api.settings.api.search !== d && (n.debug("Searching with default search API endpoint"), n.search.remote(b)) : n.error(t.source), o.onSearchQuery.call(B, b))
                    },
                    search: {
                        local: function(a) {
                            var b, c = n.search.object(a, o.content);
                            n.set.loading(), n.save.results(c), n.debug("Returned local search results", c), b = n.generateResults({
                                results: c
                            }), n.remove.loading(), n.write.cachedHTML(a, b), n.addResults(b)
                        },
                        remote: function(b) {
                            var c = {
                                onSuccess: function(a) {
                                    n.parse.response.call(B, a, b)
                                },
                                urlData: {
                                    query: b
                                }
                            };
                            x.api("get request") || n.setup.api(), a.extend(!0, c, o.apiSettings), n.debug("Executing search", c), n.cancel.query(), x.api("setting", c).api("query")
                        },
                        object: function(b, c) {
                            var e = [],
                                f = [],
                                g = a.isArray(o.searchFields) ? o.searchFields : [o.searchFields],
                                h = new RegExp(r.exact + b, "i"),
                                i = new RegExp(b, "i");
                            return c = c || o.source, c === d ? (n.error(t.source), []) : (a.each(g, function(b, d) {
                                a.each(c, function(b, c) {
                                    var g = "string" == typeof c[d],
                                        j = -1 == a.inArray(c, e) && -1 == a.inArray(c, f);
                                    g && j && (c[d].match(h) ? e.push(c) : o.searchFullText && c[d].match(i) && f.push(c))
                                })
                            }), a.merge(e, f))
                        }
                    },
                    parse: {
                        response: function(a, b) {
                            var c = n.generateResults(a);
                            n.verbose("Parsing server response", a), a !== d && (b && (n.write.cachedHTML(b, c), a.results !== d && n.save.results(a.results)), n.addResults(c))
                        }
                    },
                    throttle: function() {
                        clearTimeout(n.timer), n.has.minimumCharacters() ? n.timer = setTimeout(n.query, o.searchDelay) : n.hideResults()
                    },
                    cancel: {
                        query: function() {
                            n.can.useAPI() && x.api("abort")
                        }
                    },
                    has: {
                        minimumCharacters: function() {
                            var a = n.get.value(),
                                b = a.length;
                            return b >= o.minCharacters
                        }
                    },
                    read: {
                        cachedHTML: function(a) {
                            var b = x.data(q.cache);
                            return o.cache ? (n.verbose("Checking cache for generated html for query", a), "object" == typeof b && b[a] !== d ? b[a] : !1) : !1
                        }
                    },
                    save: {
                        results: function(a) {
                            n.verbose("Saving current search results to metadata", a), x.data(q.results, a)
                        }
                    },
                    write: {
                        cachedHTML: function(a, b) {
                            var c = x.data(q.cache) !== d ? x.data(q.cache) : {};
                            o.cache && (n.verbose("Writing generated html to cache", a, b), c[a] = b, x.data(q.cache, c))
                        }
                    },
                    addResults: function(b) {
                        return a.isFunction(o.onResultsAdd) && o.onResultsAdd.call(A, b) === !1 ? (n.debug("onResultsAdd callback cancelled default action"), !1) : (A.html(b), void n.showResults())
                    },
                    showResults: function() {
                        n.is.visible() || !n.is.focused() || n.is.empty() || (n.can.transition() ? (n.debug("Showing results with css animations"), A.transition({
                            animation: o.transition + " in",
                            duration: o.duration,
                            queue: !0
                        })) : (n.debug("Showing results with javascript"), A.stop().fadeIn(o.duration, o.easing)), o.onResultsOpen.call(A))
                    },
                    hideResults: function() {
                        n.is.visible() && (n.can.transition() ? (n.debug("Hiding results with css animations"), A.transition({
                            animation: o.transition + " out",
                            duration: o.duration,
                            queue: !0
                        })) : (n.debug("Hiding results with javascript"), A.stop().fadeOut(o.duration, o.easing)), o.onResultsClose.call(A))
                    },
                    generateResults: function(b) {
                        n.debug("Generating html from response", b);
                        var c = o.templates[o.type],
                            d = a.isPlainObject(b.results) && !a.isEmptyObject(b.results),
                            e = a.isArray(b.results) && b.results.length > 0,
                            f = "";
                        return d || e ? (o.maxResults > 0 && (d ? "standard" == o.type && n.error(t.maxResults) : b.results = b.results.slice(0, o.maxResults)), a.isFunction(c) ? f = c(b) : n.error(t.noTemplate, !1)) : f = n.displayMessage(t.noResults, "empty"), o.onResults.call(B, b), f
                    },
                    displayMessage: function(a, b) {
                        return b = b || "standard", n.debug("Displaying message", a, b), n.addResults(o.templates.message(a, b)), o.templates.message(a, b)
                    },
                    setting: function(b, c) {
                        if (a.isPlainObject(b)) a.extend(!0, o, b);
                        else {
                            if (c === d) return o[b];
                            o[b] = c
                        }
                    },
                    internal: function(b, c) {
                        if (a.isPlainObject(b)) a.extend(!0, n, b);
                        else {
                            if (c === d) return n[b];
                            n[b] = c
                        }
                    },
                    debug: function() {
                        o.debug && (o.performance ? n.performance.log(arguments) : (n.debug = Function.prototype.bind.call(console.info, console, o.name + ":"), n.debug.apply(console, arguments)))
                    },
                    verbose: function() {
                        o.verbose && o.debug && (o.performance ? n.performance.log(arguments) : (n.verbose = Function.prototype.bind.call(console.info, console, o.name + ":"), n.verbose.apply(console, arguments)))
                    },
                    error: function() {
                        n.error = Function.prototype.bind.call(console.error, console, o.name + ":"), n.error.apply(console, arguments)
                    },
                    performance: {
                        log: function(a) {
                            var b, c, d;
                            o.performance && (b = (new Date).getTime(), d = i || b, c = b - d, i = b, j.push({
                                Name: a[0],
                                Arguments: [].slice.call(a, 1) || "",
                                Element: B,
                                "Execution Time": c
                            })), clearTimeout(n.performance.timer), n.performance.timer = setTimeout(n.performance.display, 100)
                        },
                        display: function() {
                            var b = o.name + ":",
                                c = 0;
                            i = !1, clearTimeout(n.performance.timer), a.each(j, function(a, b) {
                                c += b["Execution Time"]
                            }), b += " " + c + "ms", h && (b += " '" + h + "'"), g.length > 1 && (b += " (" + g.length + ")"), (console.group !== d || console.table !== d) && j.length > 0 && (console.groupCollapsed(b), console.table ? console.table(j) : a.each(j, function(a, b) {
                                console.log(b.Name + ": " + b["Execution Time"] + "ms")
                            }), console.groupEnd()), j = []
                        }
                    },
                    invoke: function(b, c, e) {
                        var g, h, i, j = C;
                        return c = c || m, e = B || e, "string" == typeof b && j !== d && (b = b.split(/[\. ]/), g = b.length - 1, a.each(b, function(c, e) {
                            var f = c != g ? e + b[c + 1].charAt(0).toUpperCase() + b[c + 1].slice(1) : b;
                            if (a.isPlainObject(j[f]) && c != g) j = j[f];
                            else {
                                if (j[f] !== d) return h = j[f], !1;
                                if (!a.isPlainObject(j[e]) || c == g) return j[e] !== d ? (h = j[e], !1) : !1;
                                j = j[e]
                            }
                        })), a.isFunction(h) ? i = h.apply(e, c) : h !== d && (i = h), a.isArray(f) ? f.push(i) : f !== d ? f = [f, i] : i !== d && (f = i), h
                    }
                }, l ? (C === d && n.initialize(), n.invoke(k)) : (C !== d && C.invoke("destroy"), n.initialize())
            }), f !== d ? f : this
        }, a.fn.search.settings = {
            name: "Search Module",
            namespace: "search",
            debug: !1,
            verbose: !0,
            performance: !0,
            type: "standard",
            minCharacters: 1,
            apiSettings: !1,
            source: !1,
            searchFields: ["title", "description"],
            searchFullText: !0,
            automatic: "true",
            hideDelay: 0,
            searchDelay: 100,
            maxResults: 7,
            cache: !0,
            transition: "scale",
            duration: 300,
            easing: "easeOutExpo",
            onSelect: !1,
            onResultsAdd: !1,
            onSearchQuery: function() {},
            onResults: function() {},
            onResultsOpen: function() {},
            onResultsClose: function() {},
            className: {
                active: "active",
                empty: "empty",
                focus: "focus",
                loading: "loading",
                pressed: "down"
            },
            error: {
                source: "Cannot search. No source used, and Semantic API module was not included",
                noResults: "Your search returned no results",
                logging: "Error in debug logging, exiting.",
                noTemplate: "A valid template name was not specified.",
                serverError: "There was an issue with querying the server.",
                maxResults: "Results must be an array to use maxResults setting",
                method: "The method you called is not defined."
            },
            metadata: {
                cache: "cache",
                results: "results"
            },
            regExp: {
                exact: "(?:s|^)"
            },
            selector: {
                prompt: ".prompt",
                searchButton: ".search.button",
                results: ".results",
                category: ".category",
                result: ".result",
                title: ".title, .name"
            },
            templates: {
                escape: function(a) {
                    var b = /[&<>"'`]/g,
                        c = /[&<>"'`]/,
                        d = {
                            "&": "&amp;",
                            "<": "&lt;",
                            ">": "&gt;",
                            '"': "&quot;",
                            "'": "&#x27;",
                            "`": "&#x60;"
                        },
                        e = function(a) {
                            return d[a]
                        };
                    return c.test(a) ? a.replace(b, e) : a
                },
                message: function(a, b) {
                    var c = "";
                    return a !== d && b !== d && (c += '<div class="message ' + b + '">', c += "empty" == b ? '<div class="header">No Results</div class="header"><div class="description">' + a + '</div class="description">' : ' <div class="description">' + a + "</div>", c += "</div>"), c
                },
                category: function(b) {
                    var c = "",
                        e = a.fn.search.settings.templates.escape;
                    return b.results !== d ? (a.each(b.results, function(b, f) {
                        f.results !== d && f.results.length > 0 && (c += '<div class="category"><div class="name">' + f.name + "</div>", a.each(f.results, function(a, b) {
                            c += '<div class="result">', b.url && (c += '<a href="' + b.url + '"></a>'), b.image !== d && (b.image = e(b.image), c += '<div class="image"> <img src="' + b.image + '" alt=""></div>'), c += '<div class="content">', b.price !== d && (b.price = e(b.price), c += '<div class="price">' + b.price + "</div>"), b.title !== d && (b.title = e(b.title), c += '<div class="title">' + b.title + "</div>"), b.description !== d && (c += '<div class="description">' + b.description + "</div>"), c += "</div></div>"
                        }), c += "</div>")
                    }), b.action && (c += '<a href="' + b.action.url + '" class="action">' + b.action.text + "</a>"), c) : !1
                },
                standard: function(b) {
                    var c = "";
                    return b.results !== d ? (a.each(b.results, function(a, b) {
                        c += b.url ? '<a class="result" href="' + b.url + '">' : '<a class="result">', b.image !== d && (c += '<div class="image"> <img src="' + b.image + '"></div>'), c += '<div class="content">', b.price !== d && (c += '<div class="price">' + b.price + "</div>"), b.title !== d && (c += '<div class="title">' + b.title + "</div>"), b.description !== d && (c += '<div class="description">' + b.description + "</div>"), c += "</div>", c += "</a>"
                    }), b.action && (c += '<a href="' + b.action.url + '" class="action">' + b.action.text + "</a>"), c) : !1
                }
            }
        }
    }(jQuery, window, document),
    function(a, b, c, d) {
        "use strict";
        a.fn.transition = function() {
            {
                var e, f = a(this),
                    g = f.selector || "",
                    h = (new Date).getTime(),
                    i = [],
                    j = arguments,
                    k = j[0],
                    l = [].slice.call(arguments, 1),
                    m = "string" == typeof k;
                b.requestAnimationFrame || b.mozRequestAnimationFrame || b.webkitRequestAnimationFrame || b.msRequestAnimationFrame || function(a) {
                    setTimeout(a, 0)
                }
            }
            return f.each(function(b) {
                var n, o, p, q, r, s, t, u, v, w, x, y = a(this),
                    z = this;
                x = {
                    initialize: function() {
                        n = x.get.settings.apply(z, j), q = n.className, p = n.error, r = n.metadata, w = "." + n.namespace, v = "module-" + n.namespace, o = y.data(v) || x, t = x.get.animationEndEvent(), u = x.get.animationName(), s = x.get.animationStartEvent(), m && (m = x.invoke(k)), m === !1 && (x.verbose("Converted arguments into settings object", n), n.interval ? x.delay(n.animate) : x.animate(), x.instantiate())
                    },
                    instantiate: function() {
                        x.verbose("Storing instance of module", x), o = x, y.data(v, o)
                    },
                    destroy: function() {
                        x.verbose("Destroying previous module for", z), y.removeData(v)
                    },
                    refresh: function() {
                        x.verbose("Refreshing display type on next animation"), delete x.displayType
                    },
                    forceRepaint: function() {
                        x.verbose("Forcing element repaint");
                        var a = y.parent(),
                            b = y.next();
                        0 === b.length ? y.detach().appendTo(a) : y.detach().insertBefore(b)
                    },
                    repaint: function() {
                        x.verbose("Repainting element");
                        z.offsetWidth
                    },
                    delay: function(a) {
                        var c, e = n.reverse === !0,
                            g = "auto" == n.reverse && x.get.direction() == q.outward;
                        a = typeof a !== d ? a : n.interval, c = e || g ? (f.length - b) * n.interval : b * n.interval, x.debug("Delaying animation by", c), setTimeout(x.animate, c)
                    },
                    animate: function(a) {
                        if (n = a || n, !x.is.supported()) return x.error(p.support), !1;
                        if (x.debug("Preparing animation", n.animation), x.is.animating()) {
                            if (n.queue) return !n.allowRepeats && x.has.direction() && x.is.occurring() && x.queuing !== !0 ? x.debug("Animation is currently occurring, preventing queueing same animation", n.animation) : x.queue(n.animation), !1;
                            if (!n.allowRepeats && x.is.occurring()) return x.debug("Animation is already occurring, will not execute repeated animation", n.animation), !1
                        }
                        x.can.animate() ? x.set.animating(n.animation) : x.error(p.noAnimation, n.animation, z)
                    },
                    reset: function() {
                        x.debug("Resetting animation to beginning conditions"), x.remove.animationEndCallback(), x.restore.conditions(), x.remove.animating()
                    },
                    queue: function(a) {
                        x.debug("Queueing animation of", a), x.queuing = !0, y.one(t + w, function() {
                            x.queuing = !1, x.repaint(), x.animate.apply(this, n)
                        })
                    },
                    complete: function() {
                        x.verbose("CSS animation complete", n.animation), x.remove.animationEndCallback(), x.remove.failSafe(), x.is.looping() || (x.is.outward() ? (x.verbose("Animation is outward, hiding element"), x.restore.conditions(), x.hide(), n.onHide.call(this)) : x.is.inward() ? (x.verbose("Animation is outward, showing element"), x.restore.conditions(), x.show(), x.set.display(), n.onShow.call(this)) : x.restore.conditions(), x.remove.animation(), x.remove.animating()), n.onComplete.call(this)
                    },
                    has: {
                        direction: function(b) {
                            var c = !1;
                            return b = b || n.animation, "string" == typeof b && (b = b.split(" "), a.each(b, function(a, b) {
                                (b === q.inward || b === q.outward) && (c = !0)
                            })), c
                        },
                        inlineDisplay: function() {
                            var b = y.attr("style") || "";
                            return a.isArray(b.match(/display.*?;/, ""))
                        }
                    },
                    set: {
                        animating: function(a) {
                            a = a || n.animation, x.is.animating() || x.save.conditions(), x.remove.direction(), x.remove.animationEndCallback(), x.can.transition() && !x.has.direction() && x.set.direction(), x.remove.hidden(), x.set.display(), y.addClass(q.animating + " " + q.transition + " " + a).addClass(a).one(t + ".complete" + w, x.complete), n.useFailSafe && x.add.failSafe(), x.set.duration(n.duration), n.onStart.call(this), x.debug("Starting tween", a, y.attr("class"))
                        },
                        duration: function(a, b) {
                            b = b || n.duration, b = "number" == typeof b ? b + "ms" : b, x.verbose("Setting animation duration", b), (b || 0 === b) && y.css({
                                "-webkit-animation-duration": b,
                                "-moz-animation-duration": b,
                                "-ms-animation-duration": b,
                                "-o-animation-duration": b,
                                "animation-duration": b
                            })
                        },
                        display: function() {
                            var a = x.get.style(),
                                b = x.get.displayType(),
                                c = a + "display: " + b + " !important;";
                            y.css("display", ""), x.refresh(), y.css("display") !== b && (x.verbose("Setting inline visibility to", b), y.attr("style", c))
                        },
                        direction: function() {
                            y.is(":visible") && !x.is.hidden() ? (x.debug("Automatically determining the direction of animation", "Outward"), y.removeClass(q.inward).addClass(q.outward)) : (x.debug("Automatically determining the direction of animation", "Inward"), y.removeClass(q.outward).addClass(q.inward))
                        },
                        looping: function() {
                            x.debug("Transition set to loop"), y.addClass(q.looping)
                        },
                        hidden: function() {
                            x.is.hidden() || y.addClass(q.transition).addClass(q.hidden), "none" !== y.css("display") && (x.verbose("Overriding default display to hide element"), y.css("display", "none"))
                        },
                        visible: function() {
                            y.addClass(q.transition).addClass(q.visible)
                        }
                    },
                    save: {
                        displayType: function(a) {
                            y.data(r.displayType, a)
                        },
                        transitionExists: function(b, c) {
                            a.fn.transition.exists[b] = c, x.verbose("Saving existence of transition", b, c)
                        },
                        conditions: function() {
                            y.attr("class") || !1, y.attr("style") || "";
                            y.removeClass(n.animation), x.remove.direction(), x.cache = {
                                className: y.attr("class"),
                                style: x.get.style()
                            }, x.verbose("Saving original attributes", x.cache)
                        }
                    },
                    restore: {
                        conditions: function() {
                            return x.cache === d ? !1 : (x.cache.className ? y.attr("class", x.cache.className) : y.removeAttr("class"), x.cache.style && (x.verbose("Restoring original style attribute", x.cache.style), console.log("restoring cache", x.cache.style), y.attr("style", x.cache.style)), x.is.looping() && x.remove.looping(), void x.verbose("Restoring original attributes", x.cache))
                        }
                    },
                    add: {
                        failSafe: function() {
                            var a = x.get.duration();
                            x.timer = setTimeout(function() {
                                y.trigger(t)
                            }, a + n.failSafeDelay), x.verbose("Adding fail safe timer", x.timer)
                        }
                    },
                    remove: {
                        animating: function() {
                            y.removeClass(q.animating)
                        },
                        animation: function() {
                            y.css({
                                "-webkit-animation": "",
                                "-moz-animation": "",
                                "-ms-animation": "",
                                "-o-animation": "",
                                animation: ""
                            })
                        },
                        animationEndCallback: function() {
                            y.off(".complete")
                        },
                        display: function() {
                            y.css("display", "")
                        },
                        direction: function() {
                            y.removeClass(q.inward).removeClass(q.outward)
                        },
                        failSafe: function() {
                            x.verbose("Removing fail safe timer", x.timer), x.timer && clearTimeout(x.timer)
                        },
                        hidden: function() {
                            y.removeClass(q.hidden)
                        },
                        visible: function() {
                            y.removeClass(q.visible)
                        },
                        looping: function() {
                            x.debug("Transitions are no longer looping"), y.removeClass(q.looping), x.forceRepaint()
                        },
                        transition: function() {
                            y.removeClass(q.visible).removeClass(q.hidden)
                        }
                    },
                    get: {
                        settings: function(b, c, d) {
                            return "object" == typeof b ? a.extend(!0, {}, a.fn.transition.settings, b) : "function" == typeof d ? a.extend({}, a.fn.transition.settings, {
                                animation: b,
                                onComplete: d,
                                duration: c
                            }) : "string" == typeof c || "number" == typeof c ? a.extend({}, a.fn.transition.settings, {
                                animation: b,
                                duration: c
                            }) : "object" == typeof c ? a.extend({}, a.fn.transition.settings, c, {
                                animation: b
                            }) : "function" == typeof c ? a.extend({}, a.fn.transition.settings, {
                                animation: b,
                                onComplete: c
                            }) : a.extend({}, a.fn.transition.settings, {
                                animation: b
                            })
                        },
                        direction: function(b) {
                            return b = b || n.animation, "string" == typeof b && (b = b.split(" "), a.each(b, function(a, b) {
                                return b === q.inward ? q.inward : b === q.outward ? q.outward : void 0
                            })), x.can.transition() ? y.is(":visible") && !x.is.hidden() ? q.outward : q.inward : "static"
                        },
                        duration: function(a) {
                            return a = a || n.duration, a === !1 && (a = y.css("animation-duration") || 0), "string" == typeof a ? a.indexOf("ms") > -1 ? parseFloat(a) : 1e3 * parseFloat(a) : a
                        },
                        displayType: function() {
                            return n.displayType ? n.displayType : (y.data(r.displayType) === d && x.can.transition(!0), y.data(r.displayType))
                        },
                        style: function() {
                            var a = y.attr("style") || "";
                            return a.replace(/display.*?;/, "")
                        },
                        transitionExists: function(b) {
                            return a.fn.transition.exists[b]
                        },
                        animationName: function() {
                            var a, b = c.createElement("div"),
                                e = {
                                    animation: "animationName",
                                    OAnimation: "oAnimationName",
                                    MozAnimation: "mozAnimationName",
                                    WebkitAnimation: "webkitAnimationName"
                                };
                            for (a in e)
                                if (b.style[a] !== d) return e[a];
                            return !1
                        },
                        animationStartEvent: function() {
                            var a, b = c.createElement("div"),
                                e = {
                                    animation: "animationstart",
                                    OAnimation: "oAnimationStart",
                                    MozAnimation: "mozAnimationStart",
                                    WebkitAnimation: "webkitAnimationStart"
                                };
                            for (a in e)
                                if (b.style[a] !== d) return e[a];
                            return !1
                        },
                        animationEndEvent: function() {
                            var a, b = c.createElement("div"),
                                e = {
                                    animation: "animationend",
                                    OAnimation: "oAnimationEnd",
                                    MozAnimation: "mozAnimationEnd",
                                    WebkitAnimation: "webkitAnimationEnd"
                                };
                            for (a in e)
                                if (b.style[a] !== d) return e[a];
                            return !1
                        }
                    },
                    can: {
                        transition: function(b) {
                            var c, e, f, g, h, i = y.attr("class"),
                                j = y.prop("tagName"),
                                k = n.animation,
                                l = x.get.transitionExists(k);
                            if (l === d || b) {
                                if (x.verbose("Determining whether animation exists"), c = a("<" + j + " />").addClass(i).insertAfter(y), e = c.addClass(k).removeClass(q.inward).removeClass(q.outward).addClass(q.animating).addClass(q.transition).css(u), f = c.addClass(q.inward).css(u), h = c.attr("class", i).removeAttr("style").removeClass(q.hidden).removeClass(q.visible).show().css("display"), x.verbose("Determining final display state", h), c.remove(), e != f) x.debug("Direction exists for animation", k), g = !0;
                                else {
                                    if ("none" == e || !e) return void x.debug("No animation defined in css", k);
                                    x.debug("Static animation found", k, h), g = !1
                                }
                                x.save.displayType(h), x.save.transitionExists(k, g)
                            }
                            return l !== d ? l : g
                        },
                        animate: function() {
                            return x.can.transition() !== d
                        }
                    },
                    is: {
                        animating: function() {
                            return y.hasClass(q.animating)
                        },
                        inward: function() {
                            return y.hasClass(q.inward)
                        },
                        outward: function() {
                            return y.hasClass(q.outward)
                        },
                        looping: function() {
                            return y.hasClass(q.looping)
                        },
                        occurring: function(a) {
                            return a = a || n.animation, a = "." + a.replace(" ", "."), y.filter(a).length > 0
                        },
                        visible: function() {
                            return y.is(":visible")
                        },
                        hidden: function() {
                            return "hidden" === y.css("visibility")
                        },
                        supported: function() {
                            return u !== !1 && t !== !1
                        }
                    },
                    hide: function() {
                        x.verbose("Hiding element"), x.is.animating() && x.reset(), x.remove.display(), x.remove.visible(), x.set.hidden(), x.repaint()
                    },
                    show: function(a) {
                        x.verbose("Showing element", a), x.remove.hidden(), x.set.visible(), x.repaint()
                    },
                    start: function() {
                        x.verbose("Starting animation"), y.removeClass(q.disabled)
                    },
                    stop: function() {
                        x.debug("Stopping animation"), y.addClass(q.disabled)
                    },
                    toggle: function() {
                        x.debug("Toggling play status"), y.toggleClass(q.disabled)
                    },
                    setting: function(b, c) {
                        if (x.debug("Changing setting", b, c), a.isPlainObject(b)) a.extend(!0, n, b);
                        else {
                            if (c === d) return n[b];
                            n[b] = c
                        }
                    },
                    internal: function(b, c) {
                        if (a.isPlainObject(b)) a.extend(!0, x, b);
                        else {
                            if (c === d) return x[b];
                            x[b] = c
                        }
                    },
                    debug: function() {
                        n.debug && (n.performance ? x.performance.log(arguments) : (x.debug = Function.prototype.bind.call(console.info, console, n.name + ":"), x.debug.apply(console, arguments)))
                    },
                    verbose: function() {
                        n.verbose && n.debug && (n.performance ? x.performance.log(arguments) : (x.verbose = Function.prototype.bind.call(console.info, console, n.name + ":"), x.verbose.apply(console, arguments)))
                    },
                    error: function() {
                        x.error = Function.prototype.bind.call(console.error, console, n.name + ":"), x.error.apply(console, arguments)
                    },
                    performance: {
                        log: function(a) {
                            var b, c, d;
                            n.performance && (b = (new Date).getTime(), d = h || b, c = b - d, h = b, i.push({
                                Name: a[0],
                                Arguments: [].slice.call(a, 1) || "",
                                Element: z,
                                "Execution Time": c
                            })), clearTimeout(x.performance.timer), x.performance.timer = setTimeout(x.performance.display, 600)
                        },
                        display: function() {
                            var b = n.name + ":",
                                c = 0;
                            h = !1, clearTimeout(x.performance.timer), a.each(i, function(a, b) {
                                c += b["Execution Time"]
                            }), b += " " + c + "ms", g && (b += " '" + g + "'"), f.length > 1 && (b += " (" + f.length + ")"), (console.group !== d || console.table !== d) && i.length > 0 && (console.groupCollapsed(b), console.table ? console.table(i) : a.each(i, function(a, b) {
                                console.log(b.Name + ": " + b["Execution Time"] + "ms")
                            }), console.groupEnd()), i = []
                        }
                    },
                    invoke: function(b, c, f) {
                        var g, h, i, j = o;
                        return c = c || l, f = z || f, "string" == typeof b && j !== d && (b = b.split(/[\. ]/), g = b.length - 1, a.each(b, function(c, e) {
                            var f = c != g ? e + b[c + 1].charAt(0).toUpperCase() + b[c + 1].slice(1) : b;
                            if (a.isPlainObject(j[f]) && c != g) j = j[f];
                            else {
                                if (j[f] !== d) return h = j[f], !1;
                                if (!a.isPlainObject(j[e]) || c == g) return j[e] !== d ? (h = j[e], !1) : !1;
                                j = j[e]
                            }
                        })), a.isFunction(h) ? i = h.apply(f, c) : h !== d && (i = h), a.isArray(e) ? e.push(i) : e !== d ? e = [e, i] : i !== d && (e = i), h !== d ? h : !1
                    }
                }, x.initialize()
            }), e !== d ? e : this
        }, a.fn.transition.exists = {}, a.fn.transition.settings = {
            name: "Transition",
            debug: !1,
            verbose: !0,
            performance: !0,
            namespace: "transition",
            interval: 0,
            reverse: "auto",
            onStart: function() {},
            onComplete: function() {},
            onShow: function() {},
            onHide: function() {},
            useFailSafe: !0,
            failSafeDelay: 100,
            allowRepeats: !1,
            displayType: !1,
            animation: "fade",
            duration: !1,
            queue: !0,
            metadata: {
                displayType: "display"
            },
            className: {
                animating: "animating",
                disabled: "disabled",
                hidden: "hidden",
                inward: "in",
                loading: "loading",
                looping: "looping",
                outward: "out",
                transition: "transition",
                visible: "visible"
            },
            error: {
                noAnimation: "There is no css animation matching the one you specified.",
                repeated: "That animation is already occurring, cancelling repeated animation",
                method: "The method you called is not defined",
                support: "This browser does not support CSS animations"
            }
        }
    }(jQuery, window, document),
    function(a, b, c, d) {
        a.api = a.fn.api = function(c) {
            var e, f = a(a.isFunction(this) ? b : this),
                g = f.selector || "",
                h = (new Date).getTime(),
                i = [],
                j = arguments[0],
                k = "string" == typeof j,
                l = [].slice.call(arguments, 1);
            return f.each(function() {
                var b, f, m, n, o, p = a.isPlainObject(c) ? a.extend(!0, {}, a.fn.api.settings, c) : a.extend({}, a.fn.api.settings),
                    q = p.namespace,
                    r = p.metadata,
                    s = p.selector,
                    t = p.error,
                    u = p.className,
                    v = "." + q,
                    w = "module-" + q,
                    x = a(this),
                    y = x.closest(s.form),
                    z = p.stateContext ? a(p.stateContext) : x,
                    A = this,
                    B = z.get(),
                    C = x.data(w);
                o = {
                    initialize: function() {
                        var a = o.get.event();
                        k || (a ? (o.debug("Attaching API events to element", a), x.on(a + v, o.event.trigger)) : "now" == p.on && (o.debug("Querying API now", a), o.query())), o.instantiate()
                    },
                    instantiate: function() {
                        o.verbose("Storing instance of module", o), C = o, x.data(w, C)
                    },
                    destroy: function() {
                        o.verbose("Destroying previous module for", A), x.removeData(w).off(v)
                    },
                    query: function() {
                        if (o.is.disabled()) return void o.debug("Element is disabled API request aborted");
                        if (o.is.loading() && 0 === p.throttle) return void o.debug("Cancelling request, previous request is still pending");
                        if (p.defaultData && a.extend(!0, p.urlData, o.get.defaultData()), (p.serializeForm !== !1 || z.is("form")) && ("json" == p.serializeForm ? a.extend(!0, p.data, o.get.formData()) : p.data = o.get.formData()), f = o.get.settings(), f === !1) return o.cancelled = !0, void o.error(t.beforeSend);
                        if (o.cancelled = !1, p.url ? (o.debug("Using specified url", m), m = o.add.urlData(p.url)) : (m = o.add.urlData(o.get.templateURL()), o.debug("Added URL Data to url", m)), !m) {
                            if (!x.is("form")) return void o.error(t.missingURL, p.action);
                            o.debug("No url or action specified, defaulting to form action"), m = x.attr("action")
                        }
                        o.set.loading(), b = a.extend(!0, {}, p, {
                            type: p.method || p.type,
                            data: n,
                            url: p.base + m,
                            beforeSend: p.beforeXHR,
                            success: function() {},
                            failure: function() {},
                            complete: function() {}
                        }), o.debug("Querying URL", b.url), o.debug("Sending data", n, b.method), o.verbose("Using AJAX settings", b), o.is.loading() ? o.timer = setTimeout(function() {
                            o.request = o.create.request(), o.xhr = o.create.xhr(), p.onRequest.call(B, o.request, o.xhr)
                        }, p.throttle) : (o.request = o.create.request(), o.xhr = o.create.xhr(), p.onRequest.call(B, o.request, o.xhr))
                    },
                    is: {
                        disabled: function() {
                            return x.filter(p.filter).length > 0
                        },
                        loading: function() {
                            return o.request && "pending" == o.request.state()
                        }
                    },
                    was: {
                        cancelled: function() {
                            return o.cancelled || !1
                        },
                        succesful: function() {
                            return o.request && "resolved" == o.request.state()
                        },
                        failure: function() {
                            return o.request && "rejected" == o.request.state()
                        },
                        complete: function() {
                            return o.request && ("resolved" == o.request.state() || "rejected" == o.request.state())
                        }
                    },
                    add: {
                        urlData: function(b, c) {
                            var e, f;
                            return b && (e = b.match(p.regExp.required), f = b.match(p.regExp.optional), c = c || p.urlData, e && (o.debug("Looking for required URL variables", e), a.each(e, function(e, f) {
                                var g = -1 !== f.indexOf("$") ? f.substr(2, f.length - 3) : f.substr(1, f.length - 2),
                                    h = a.isPlainObject(c) && c[g] !== d ? c[g] : x.data(g) !== d ? x.data(g) : z.data(g) !== d ? z.data(g) : c[g];
                                return h === d ? (o.error(t.requiredParameter, g, b), b = !1, !1) : (o.verbose("Found required variable", g, h), void(b = b.replace(f, h)))
                            })), f && (o.debug("Looking for optional URL variables", e), a.each(f, function(e, f) {
                                var g = -1 !== f.indexOf("$") ? f.substr(3, f.length - 4) : f.substr(2, f.length - 3),
                                    h = a.isPlainObject(c) && c[g] !== d ? c[g] : x.data(g) !== d ? x.data(g) : z.data(g) !== d ? z.data(g) : c[g];
                                h !== d ? (o.verbose("Optional variable Found", g, h), b = b.replace(f, h)) : (o.verbose("Optional variable not found", g), b = -1 !== b.indexOf("/" + f) ? b.replace("/" + f, "") : b.replace(f, ""))
                            }))), b
                        }
                    },
                    event: {
                        trigger: function(a) {
                            o.query(), ("submit" == a.type || "click" == a.type) && a.preventDefault()
                        },
                        xhr: {
                            always: function() {},
                            done: function(a) {
                                var b = this,
                                    c = (new Date).getTime() - h,
                                    d = p.loadingDuration - c;
                                d = d > 0 ? d : 0, setTimeout(function() {
                                    o.request.resolveWith(b, [a])
                                }, d)
                            },
                            fail: function(a, b, c) {
                                var d = this,
                                    e = (new Date).getTime() - h,
                                    f = p.loadingDuration - e;
                                f = f > 0 ? f : 0, setTimeout(function() {
                                    "abort" !== b ? o.request.rejectWith(d, [a, b, c]) : o.reset()
                                }, f)
                            }
                        },
                        request: {
                            complete: function(a) {
                                o.remove.loading(), p.onComplete.call(B, a, x)
                            },
                            done: function(b) {
                                o.debug("API Response Received", b), "json" == p.dataType && a.isFunction(p.successTest) ? (o.debug("Checking JSON returned success", p.successTest, b), p.successTest(b) ? p.onSuccess.call(B, b, x) : (o.debug("JSON test specified by user and response failed", b), p.onFailure.call(B, b, x))) : p.onSuccess.call(B, b, x)
                            },
                            error: function(c, e, f) {
                                var g, h = p.error[e] !== d ? p.error[e] : f;
                                if (c !== d)
                                    if (c.readyState !== d && 4 == c.readyState) {
                                        if (200 != c.status && f !== d && "" !== f) o.error(t.statusMessage + f, b.url);
                                        else if ("error" == e && "json" == p.dataType) try {
                                            g = a.parseJSON(c.responseText), g && g.error !== d && (h = g.error)
                                        } catch (i) {
                                            o.error(t.JSONParse)
                                        }
                                        o.remove.loading(), o.set.error(), p.errorDuration && setTimeout(o.remove.error, p.errorDuration), o.debug("API Request error:", h), p.onError.call(B, h, x)
                                    } else p.onAbort.call(B, h, x), o.debug("Request Aborted (Most likely caused by page change or CORS Policy)", e, f)
                            }
                        }
                    },
                    create: {
                        request: function() {
                            return a.Deferred().always(o.event.request.complete).done(o.event.request.done).fail(o.event.request.error)
                        },
                        xhr: function() {
                            return a.ajax(b).always(o.event.xhr.always).done(o.event.xhr.done).fail(o.event.xhr.fail)
                        }
                    },
                    set: {
                        error: function() {
                            o.verbose("Adding error state to element", z), z.addClass(u.error)
                        },
                        loading: function() {
                            o.verbose("Adding loading state to element", z), z.addClass(u.loading)
                        }
                    },
                    remove: {
                        error: function() {
                            o.verbose("Removing error state from element", z), z.removeClass(u.error)
                        },
                        loading: function() {
                            o.verbose("Removing loading state from element", z), z.removeClass(u.loading)
                        }
                    },
                    get: {
                        request: function() {
                            return o.request || !1
                        },
                        xhr: function() {
                            return o.xhr || !1
                        },
                        settings: function() {
                            var a;
                            return a = p.beforeSend.call(x, p), a && (a.success !== d && (o.debug("Legacy success callback detected", a), o.error(t.legacyParameters, a.success), a.onSuccess = a.success), a.failure !== d && (o.debug("Legacy failure callback detected", a), o.error(t.legacyParameters, a.failure), a.onFailure = a.failure), a.complete !== d && (o.debug("Legacy complete callback detected", a), o.error(t.legacyParameters, a.complete), a.onComplete = a.complete)), a === d && o.error(t.noReturnedValue), a !== d ? a : p
                        },
                        defaultData: function() {
                            var b = {};
                            return a.isWindow(A) || (x.is("input") ? b.value = x.val() : x.is("form") || (b.text = x.text())), b
                        },
                        event: function() {
                            return a.isWindow(A) || "now" == p.on ? (o.debug("API called without element, no events attached"), !1) : "auto" == p.on ? x.is("input") ? A.oninput !== d ? "input" : A.onpropertychange !== d ? "propertychange" : "keyup" : x.is("form") ? "submit" : "click" : p.on
                        },
                        formData: function() {
                            var b;
                            return a(this).serializeObject() !== d ? b = y.serializeObject() : (o.error(t.missingSerialize), b = y.serialize()), o.debug("Retrieved form data", b), b
                        },
                        templateURL: function(a) {
                            var b;
                            return a = a || x.data(r.action) || p.action || !1, a && (o.debug("Looking up url for action", a, p.api), p.api[a] !== d ? (b = p.api[a], o.debug("Found template url", b)) : o.error(t.missingAction, p.action, p.api)), b
                        }
                    },
                    abort: function() {
                        var a = o.get.xhr();
                        a && "resolved" !== a.state() && (o.debug("Cancelling API request"), a.abort(), o.request.rejectWith(p.apiSettings))
                    },
                    reset: function() {
                        o.remove.error(), o.remove.loading()
                    },
                    setting: function(b, c) {
                        if (o.debug("Changing setting", b, c), a.isPlainObject(b)) a.extend(!0, p, b);
                        else {
                            if (c === d) return p[b];
                            p[b] = c
                        }
                    },
                    internal: function(b, c) {
                        if (a.isPlainObject(b)) a.extend(!0, o, b);
                        else {
                            if (c === d) return o[b];
                            o[b] = c
                        }
                    },
                    debug: function() {
                        p.debug && (p.performance ? o.performance.log(arguments) : (o.debug = Function.prototype.bind.call(console.info, console, p.name + ":"), o.debug.apply(console, arguments)))
                    },
                    verbose: function() {
                        p.verbose && p.debug && (p.performance ? o.performance.log(arguments) : (o.verbose = Function.prototype.bind.call(console.info, console, p.name + ":"), o.verbose.apply(console, arguments)))
                    },
                    error: function() {
                        o.error = Function.prototype.bind.call(console.error, console, p.name + ":"), o.error.apply(console, arguments)
                    },
                    performance: {
                        log: function(a) {
                            var b, c, d;
                            p.performance && (b = (new Date).getTime(), d = h || b, c = b - d, h = b, i.push({
                                Name: a[0],
                                Arguments: [].slice.call(a, 1) || "",
                                "Execution Time": c
                            })), clearTimeout(o.performance.timer), o.performance.timer = setTimeout(o.performance.display, 100)
                        },
                        display: function() {
                            var b = p.name + ":",
                                c = 0;
                            h = !1, clearTimeout(o.performance.timer), a.each(i, function(a, b) {
                                c += b["Execution Time"]
                            }), b += " " + c + "ms", g && (b += " '" + g + "'"), (console.group !== d || console.table !== d) && i.length > 0 && (console.groupCollapsed(b), console.table ? console.table(i) : a.each(i, function(a, b) {
                                console.log(b.Name + ": " + b["Execution Time"] + "ms")
                            }), console.groupEnd()), i = []
                        }
                    },
                    invoke: function(b, c, f) {
                        var g, h, i, j = C;
                        return c = c || l, f = A || f, "string" == typeof b && j !== d && (b = b.split(/[\. ]/), g = b.length - 1, a.each(b, function(c, e) {
                            var f = c != g ? e + b[c + 1].charAt(0).toUpperCase() + b[c + 1].slice(1) : b;
                            if (a.isPlainObject(j[f]) && c != g) j = j[f];
                            else {
                                if (j[f] !== d) return h = j[f], !1;
                                if (!a.isPlainObject(j[e]) || c == g) return j[e] !== d ? (h = j[e], !1) : (o.error(t.method, b), !1);
                                j = j[e]
                            }
                        })), a.isFunction(h) ? i = h.apply(f, c) : h !== d && (i = h), a.isArray(e) ? e.push(i) : e !== d ? e = [e, i] : i !== d && (e = i), h
                    }
                }, k ? (C === d && o.initialize(), o.invoke(j)) : (C !== d && C.invoke("destroy"), o.initialize())
            }), e !== d ? e : this
        }, a.api.settings = {
            name: "API",
            namespace: "api",
            debug: !0,
            verbose: !1,
            performance: !0,
            on: "auto",
            filter: ".disabled",
            stateContext: !1,
            loadingDuration: 0,
            errorDuration: 2e3,
            action: !1,
            url: !1,
            base: "",
            urlData: {},
            defaultData: !0,
            serializeForm: !1,
            throttle: 0,
            method: "get",
            data: {},
            dataType: "json",
            beforeSend: function(a) {
                return a
            },
            beforeXHR: function() {},
            onRequest: function() {},
            onSuccess: function() {},
            onComplete: function() {},
            onFailure: function() {},
            onError: function() {},
            onAbort: function() {},
            successTest: !1,
            error: {
                beforeSend: "The before send function has aborted the request",
                error: "There was an error with your request",
                exitConditions: "API Request Aborted. Exit conditions met",
                JSONParse: "JSON could not be parsed during error handling",
                legacyParameters: "You are using legacy API success callback names",
                method: "The method you called is not defined",
                missingAction: "API action used but no url was defined",
                missingSerialize: "Required dependency jquery-serialize-object missing, using basic serialize",
                missingURL: "No URL specified for api event",
                noReturnedValue: "The beforeSend callback must return a settings object, beforeSend ignored.",
                parseError: "There was an error parsing your request",
                requiredParameter: "Missing a required URL parameter: ",
                statusMessage: "Server gave an error: ",
                timeout: "Your request timed out"
            },
            regExp: {
                required: /\{\$*[A-z0-9]+\}/g,
                optional: /\{\/\$*[A-z0-9]+\}/g
            },
            className: {
                loading: "loading",
                error: "error"
            },
            selector: {
                form: "form"
            },
            metadata: {
                action: "action"
            }
        }, a.api.settings.api = {}
    }(jQuery, window, document),
    function(a, b, c, d) {
        a.fn.form = function(b, e) {
            var f, g = a(this),
                h = a.extend(!0, {}, a.fn.form.settings, e),
                i = a.extend({}, a.fn.form.settings.defaults, b),
                j = h.namespace,
                k = h.metadata,
                l = h.selector,
                m = h.className,
                n = (h.error, "." + j),
                o = "module-" + j,
                p = g.selector || "",
                q = (new Date).getTime(),
                r = [],
                s = arguments[0],
                t = "string" == typeof s,
                u = [].slice.call(arguments, 1);
            return g.each(function() {
                var b, e = a(this),
                    j = a(this).find(l.field),
                    v = a(this).find(l.group),
                    w = a(this).find(l.message),
                    x = (a(this).find(l.prompt), a(this).find(l.submit)),
                    y = a(this).find(l.clear),
                    z = a(this).find(l.reset),
                    A = [],
                    B = !1,
                    C = this,
                    D = e.data(o);
                b = {
                    initialize: function() {
                        b.verbose("Initializing form validation", e, i, h), b.bindEvents(), b.set.defaults(), b.instantiate()
                    },
                    instantiate: function() {
                        b.verbose("Storing instance of module", b), D = b, e.data(o, b)
                    },
                    destroy: function() {
                        b.verbose("Destroying previous module", D), b.removeEvents(), e.removeData(o)
                    },
                    refresh: function() {
                        b.verbose("Refreshing selector cache"), j = e.find(l.field)
                    },
                    submit: function() {
                        b.verbose("Submitting form", e), e.submit()
                    },
                    attachEvents: function(c, d) {
                        d = d || "submit", a(c).on("click", function(a) {
                            b[d](), a.preventDefault()
                        })
                    },
                    bindEvents: function() {
                        h.keyboardShortcuts && j.on("keydown" + n, b.event.field.keydown), e.on("submit" + n, b.validate.form), j.on("blur" + n, b.event.field.blur), b.attachEvents(x, "submit"), b.attachEvents(z, "reset"), b.attachEvents(y, "clear"), j.each(function() {
                            var c = a(this).prop("type"),
                                d = b.get.changeEvent(c);
                            a(this).on(d + n, b.event.field.change)
                        })
                    },
                    clear: function() {
                        j.each(function() {
                            var c = a(this),
                                d = c.parent(),
                                e = c.closest(v),
                                f = e.find(l.prompt),
                                g = c.data(k.defaultValue) || "",
                                h = d.is(l.uiCheckbox),
                                i = d.is(l.uiDropdown),
                                j = e.hasClass(m.error);
                            j && (b.verbose("Resetting error on field", e), e.removeClass(m.error), f.remove()), i ? (b.verbose("Resetting dropdown value", d, g), d.dropdown("clear")) : h ? d.checkbox("uncheck") : (b.verbose("Resetting field value", c, g), c.val(""))
                        })
                    },
                    reset: function() {
                        j.each(function() {
                            var c = a(this),
                                d = c.parent(),
                                e = c.closest(v),
                                f = e.find(l.prompt),
                                g = c.data(k.defaultValue) || "",
                                h = d.is(l.uiCheckbox),
                                i = d.is(l.uiDropdown),
                                j = e.hasClass(m.error);
                            j && (b.verbose("Resetting error on field", e), e.removeClass(m.error), f.remove()), i ? (b.verbose("Resetting dropdown value", d, g), d.dropdown("restore defaults")) : h ? (b.verbose("Resetting checkbox value", d, g), d.checkbox(g === !0 ? "check" : "uncheck")) : (b.verbose("Resetting field value", c, g), c.val(g))
                        })
                    },
                    removeEvents: function() {
                        e.off(n), j.off(n), x.off(n), j.off(n)
                    },
                    event: {
                        field: {
                            keydown: function(c) {
                                var d = a(this),
                                    e = c.which,
                                    f = {
                                        enter: 13,
                                        escape: 27
                                    };
                                e == f.escape && (b.verbose("Escape key pressed blurring field"), d.blur()), !c.ctrlKey && e == f.enter && d.is(l.input) && d.not(l.checkbox).length > 0 && (x.addClass(m.pressed), B || (d.one("keyup" + n, b.event.field.keyup), b.submit(), b.debug("Enter pressed on input submitting form")), B = !0)
                            },
                            keyup: function() {
                                B = !1, x.removeClass(m.pressed)
                            },
                            blur: function() {
                                var c = a(this),
                                    d = c.closest(v);
                                d.hasClass(m.error) ? (b.debug("Revalidating field", c, b.get.validation(c)), b.validate.field(b.get.validation(c))) : ("blur" == h.on || "change" == h.on) && b.validate.field(b.get.validation(c))
                            },
                            change: function() {
                                var c = a(this),
                                    d = c.closest(v);
                                ("change" == h.on || d.hasClass(m.error) && h.revalidate) && (clearTimeout(b.timer), b.timer = setTimeout(function() {
                                    b.debug("Revalidating field", c, b.get.validation(c)), b.validate.field(b.get.validation(c))
                                }, h.delay))
                            }
                        }
                    },
                    get: {
                        changeEvent: function(a) {
                            return "checkbox" == a || "radio" == a || "hidden" == a ? "change" : b.get.inputEvent()
                        },
                        inputEvent: function() {
                            return c.createElement("input").oninput !== d ? "input" : c.createElement("input").onpropertychange !== d ? "propertychange" : "keyup"
                        },
                        field: function(c) {
                            return b.verbose("Finding field with identifier", c), j.filter("#" + c).length > 0 ? j.filter("#" + c) : j.filter('[name="' + c + '"]').length > 0 ? j.filter('[name="' + c + '"]') : j.filter('[name="' + c + '[]"]').length > 0 ? j.filter('[name="' + c + '[]"]') : j.filter("[data-" + k.validate + '="' + c + '"]').length > 0 ? j.filter("[data-" + k.validate + '="' + c + '"]') : a("<input/>")
                        },
                        fields: function(c) {
                            var d = a();
                            return a.each(c, function(a, c) {
                                d = d.add(b.get.field(c))
                            }), d
                        },
                        validation: function(c) {
                            var d;
                            return a.each(i, function(a, e) {
                                b.get.field(e.identifier).get(0) == c.get(0) && (d = e)
                            }), d || !1
                        },
                        value: function(a) {
                            var c, d = [];
                            return d.push(a), c = b.get.values.call(C, d), c[a]
                        },
                        values: function(c) {
                            var d = a.isArray(c) ? b.get.fields(c) : j,
                                e = {};
                            return d.each(function(c, d) {
                                var f = a(d),
                                    g = (f.prop("type"), f.prop("name")),
                                    h = f.val(),
                                    i = f.is(l.checkbox),
                                    j = f.is(l.radio),
                                    k = -1 !== g.indexOf("[]"),
                                    m = i ? f.is(":checked") : !1;
                                if (g)
                                    if (k)
                                        if (g = g.replace("[]", ""), e[g] || (e[g] = []), i) {
                                            if (!m) return b.debug("Omitted unchecked checkbox", f), !0;
                                            e[g].push(h)
                                        } else e[g].push(h);
                                else if (j) m && (e[g] = h);
                                else if (i) {
                                    if (!m) return b.debug("Omitted unchecked checkbox", f), !0;
                                    e[g] = !0
                                } else e[g] = h
                            }), e
                        }
                    },
                    has: {
                        field: function(a) {
                            return b.verbose("Checking for existence of a field with identifier", a), j.filter("#" + a).length > 0 ? !0 : j.filter('[name="' + a + '"]').length > 0 ? !0 : j.filter("[data-" + k.validate + '="' + a + '"]').length > 0 ? !0 : !1
                        }
                    },
                    add: {
                        prompt: function(c, f) {
                            var g = b.get.field(c),
                                i = g.closest(v),
                                j = i.children(l.prompt),
                                k = 0 !== j.length;
                            f = "string" == typeof f ? [f] : f, b.verbose("Adding field error state", c), i.addClass(m.error), h.inline && (k || (j = h.templates.prompt(f), j.appendTo(i)), j.html(f[0]), k ? b.verbose("Inline errors are disabled, no inline error added", c) : h.transition && a.fn.transition !== d && e.transition("is supported") ? (b.verbose("Displaying error with css transition", h.transition), j.transition(h.transition + " in", h.duration)) : (b.verbose("Displaying error with fallback javascript animation"), j.fadeIn(h.duration)))
                        },
                        errors: function(a) {
                            b.debug("Adding form error messages", a), w.html(h.templates.error(a))
                        }
                    },
                    remove: {
                        prompt: function(c) {
                            var f = b.get.field(c.identifier),
                                g = f.closest(v),
                                i = g.children(l.prompt);
                            g.removeClass(m.error), h.inline && i.is(":visible") && (b.verbose("Removing prompt for field", c), h.transition && a.fn.transition !== d && e.transition("is supported") ? i.transition(h.transition + " out", h.duration, function() {
                                i.remove()
                            }) : i.fadeOut(h.duration, function() {
                                i.remove()
                            }))
                        }
                    },
                    set: {
                        success: function() {
                            e.removeClass(m.error).addClass(m.success)
                        },
                        defaults: function() {
                            j.each(function() {
                                var b = a(this),
                                    c = b.filter(l.checkbox).length > 0,
                                    d = c ? b.is(":checked") : b.val();
                                b.data(k.defaultValue, d)
                            })
                        },
                        error: function() {
                            e.removeClass(m.success).addClass(m.error)
                        },
                        value: function(a, c) {
                            var d = {};
                            return d[a] = c, b.set.values.call(C, d)
                        },
                        values: function(c) {
                            a.isEmptyObject(c) || (a.each(c, function(c, d) {
                                var e, f = b.get.field(c),
                                    g = f.parent(),
                                    h = a.isArray(d),
                                    i = g.is(l.uiCheckbox),
                                    j = g.is(l.uiDropdown),
                                    k = f.is(l.radio) && i,
                                    m = f.length > 0;
                                m && (h && i ? (b.verbose("Selecting multiple", d, f), g.checkbox("uncheck"), a.each(d, function(a, b) {
                                    e = f.filter('[value="' + b + '"]'), g = e.parent(), e.length > 0 && g.checkbox("check")
                                })) : k ? (b.verbose("Selecting radio value", d, f), f.filter('[value="' + d + '"]').parent(l.uiCheckbox).checkbox("check")) : i ? (b.verbose("Setting checkbox value", d, g), g.checkbox(d === !0 ? "check" : "uncheck")) : j ? (b.verbose("Setting dropdown value", d, g), g.dropdown("set selected", d)) : (b.verbose("Setting field value", d, f), f.val(d)))
                            }), b.validate.form())
                        }
                    },
                    validate: {
                        form: function(c) {
                            var f = !0;
                            return B ? !1 : (A = [], a.each(i, function(a, c) {
                                b.validate.field(c) || (f = !1)
                            }), f ? (b.debug("Form has no validation errors, submitting"), b.set.success(), h.onSuccess.call(C, c)) : (b.debug("Form has errors"), b.set.error(), h.inline || b.add.errors(A), e.data("moduleApi") !== d && c.stopImmediatePropagation(), h.onFailure.call(C, A)))
                        },
                        field: function(c) {
                            var e = b.get.field(c.identifier),
                                f = !0,
                                g = [];
                            return e.prop("disabled") ? (b.debug("Field is disabled. Skipping", c.identifier), f = !0) : c.optional && "" === a.trim(e.val()) ? (b.debug("Field is optional and empty. Skipping", c.identifier), f = !0) : c.rules !== d && a.each(c.rules, function(a, d) {
                                b.has.field(c.identifier) && !b.validate.rule(c, d) && (b.debug("Field is invalid", c.identifier, d.type), g.push(d.prompt), f = !1)
                            }), f ? (b.remove.prompt(c, g), h.onValid.call(e), !0) : (A = A.concat(g), b.add.prompt(c.identifier, g), h.onInvalid.call(e, g), !1)
                        },
                        rule: function(c, e) {
                            var f, g, i = b.get.field(c.identifier),
                                j = e.type,
                                k = a.trim(i.val() + ""),
                                l = /\[(.*)\]/i,
                                m = l.exec(j),
                                n = !0;
                            return m !== d && null !== m ? (f = "" + m[1], g = j.replace(m[0], ""), n = h.rules[g].call(C, k, f)) : n = h.rules[j].call(i, k), n
                        }
                    },
                    setting: function(b, c) {
                        if (a.isPlainObject(b)) a.extend(!0, h, b);
                        else {
                            if (c === d) return h[b];
                            h[b] = c
                        }
                    },
                    internal: function(c, e) {
                        if (a.isPlainObject(c)) a.extend(!0, b, c);
                        else {
                            if (e === d) return b[c];
                            b[c] = e
                        }
                    },
                    debug: function() {
                        h.debug && (h.performance ? b.performance.log(arguments) : (b.debug = Function.prototype.bind.call(console.info, console, h.name + ":"), b.debug.apply(console, arguments)))
                    },
                    verbose: function() {
                        h.verbose && h.debug && (h.performance ? b.performance.log(arguments) : (b.verbose = Function.prototype.bind.call(console.info, console, h.name + ":"), b.verbose.apply(console, arguments)))
                    },
                    error: function() {
                        b.error = Function.prototype.bind.call(console.error, console, h.name + ":"), b.error.apply(console, arguments)
                    },
                    performance: {
                        log: function(a) {
                            var c, d, e;
                            h.performance && (c = (new Date).getTime(), e = q || c, d = c - e, q = c, r.push({
                                Name: a[0],
                                Arguments: [].slice.call(a, 1) || "",
                                Element: C,
                                "Execution Time": d
                            })), clearTimeout(b.performance.timer), b.performance.timer = setTimeout(b.performance.display, 100)
                        },
                        display: function() {
                            var c = h.name + ":",
                                e = 0;
                            q = !1, clearTimeout(b.performance.timer), a.each(r, function(a, b) {
                                e += b["Execution Time"]
                            }), c += " " + e + "ms", p && (c += " '" + p + "'"), g.length > 1 && (c += " (" + g.length + ")"), (console.group !== d || console.table !== d) && r.length > 0 && (console.groupCollapsed(c), console.table ? console.table(r) : a.each(r, function(a, b) {
                                console.log(b.Name + ": " + b["Execution Time"] + "ms")
                            }), console.groupEnd()), r = []
                        }
                    },
                    invoke: function(b, c, e) {
                        var g, h, i, j = D;
                        return c = c || u, e = C || e, "string" == typeof b && j !== d && (b = b.split(/[\. ]/), g = b.length - 1, a.each(b, function(c, e) {
                            var f = c != g ? e + b[c + 1].charAt(0).toUpperCase() + b[c + 1].slice(1) : b;
                            if (a.isPlainObject(j[f]) && c != g) j = j[f];
                            else {
                                if (j[f] !== d) return h = j[f], !1;
                                if (!a.isPlainObject(j[e]) || c == g) return j[e] !== d ? (h = j[e], !1) : !1;
                                j = j[e]
                            }
                        })), a.isFunction(h) ? i = h.apply(e, c) : h !== d && (i = h), a.isArray(f) ? f.push(i) : f !== d ? f = [f, i] : i !== d && (f = i), h
                    }
                }, t ? (D === d && b.initialize(), b.invoke(s)) : (D !== d && D.invoke("destroy"), b.initialize())
            }), f !== d ? f : this
        }, a.fn.form.settings = {
            name: "Form",
            namespace: "form",
            debug: !1,
            verbose: !0,
            performance: !0,
            keyboardShortcuts: !0,
            on: "submit",
            inline: !1,
            delay: 200,
            revalidate: !0,
            transition: "scale",
            duration: 200,
            onValid: function() {},
            onInvalid: function() {},
            onSuccess: function() {
                return !0
            },
            onFailure: function() {
                return !1
            },
            metadata: {
                defaultValue: "default",
                validate: "validate"
            },
            selector: {
                checkbox: 'input[type="checkbox"], input[type="radio"]',
                clear: ".clear",
                field: "input, textarea, select",
                group: ".field",
                input: "input",
                message: ".error.message",
                prompt: ".prompt.label",
                radio: 'input[type="radio"]',
                reset: ".reset",
                submit: ".submit",
                uiCheckbox: ".ui.checkbox",
                uiDropdown: ".ui.dropdown"
            },
            className: {
                error: "error",
                label: "ui prompt label",
                pressed: "down",
                success: "success"
            },
            error: {
                method: "The method you called is not defined."
            },
            templates: {
                error: function(b) {
                    var c = '<ul class="list">';
                    return a.each(b, function(a, b) {
                        c += "<li>" + b + "</li>"
                    }), c += "</ul>", a(c)
                },
                prompt: function(b) {
                    return a("<div/>").addClass("ui red pointing prompt label").html(b[0])
                }
            },
            rules: {
                checked: function() {
                    return a(this).filter(":checked").length > 0
                },
                contains: function(a, b) {
                    return b = b.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), -1 !== a.search(new RegExp(b, "i"))
                },
                containsExactly: function(a, b) {
                    return b = b.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), -1 !== a.search(new RegExp(b))
                },
                email: function(a) {
                    var b = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", "i");
                    return b.test(a)
                },
                empty: function(a) {
                    return !(a === d || "" === a)
                },
                integer: function(a, b) {
                    var c, e, f, g = /^\-?\d+$/;
                    return b === d || "" === b || ".." === b || (-1 == b.indexOf("..") ? g.test(b) && (c = e = b - 0) : (f = b.split("..", 2), g.test(f[0]) && (c = f[0] - 0), g.test(f[1]) && (e = f[1] - 0))), g.test(a) && (c === d || a >= c) && (e === d || e >= a)
                },
                is: function(a, b) {
                    return b = "string" == typeof b ? b.toLowerCase() : b, a = "string" == typeof a ? a.toLowerCase() : a, a == b
                },
                isExactly: function(a, b) {
                    return a == b
                },
                length: function(a, b) {
                    return a !== d ? a.length >= b : !1
                },
                match: function(b, c) {
                    var e, f = a(this);
                    return f.find("#" + c).length > 0 ? e = f.find("#" + c).val() : f.find('[name="' + c + '"]').length > 0 ? e = f.find('[name="' + c + '"]').val() : f.find('[data-validate="' + c + '"]').length > 0 && (e = f.find('[data-validate="' + c + '"]').val()), e !== d ? b.toString() == e.toString() : !1
                },
                maxLength: function(a, b) {
                    return a !== d ? a.length <= b : !1
                },
                not: function(a, b) {
                    return a = "string" == typeof a ? a.toLowerCase() : a, b = "string" == typeof b ? b.toLowerCase() : b, a != b
                },
                notExactly: function(a, b) {
                    return a != b
                },
                url: function(a) {
                    var b = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
                    return b.test(a)
                }
            }
        }
    }(jQuery, window, document),
    function(a, b, c, d) {
        a.fn.state = function(b) {
            var e, f = a(this),
                g = f.selector || "",
                h = ("ontouchstart" in c.documentElement, (new Date).getTime()),
                i = [],
                j = arguments[0],
                k = "string" == typeof j,
                l = [].slice.call(arguments, 1);
            return f.each(function() {
                var c, m = a.isPlainObject(b) ? a.extend(!0, {}, a.fn.state.settings, b) : a.extend({}, a.fn.state.settings),
                    n = m.error,
                    o = m.metadata,
                    p = m.className,
                    q = m.namespace,
                    r = m.states,
                    s = m.text,
                    t = "." + q,
                    u = q + "-module",
                    v = a(this),
                    w = this,
                    x = v.data(u);
                c = {
                    initialize: function() {
                        c.verbose("Initializing module"), m.automatic && c.add.defaults(), m.context && "" !== g ? a(m.context).on(g, "mouseenter" + t, c.change.text).on(g, "mouseleave" + t, c.reset.text).on(g, "click" + t, c.toggle.state) : v.on("mouseenter" + t, c.change.text).on("mouseleave" + t, c.reset.text).on("click" + t, c.toggle.state), c.instantiate()
                    },
                    instantiate: function() {
                        c.verbose("Storing instance of module", c), x = c, v.data(u, c)
                    },
                    destroy: function() {
                        c.verbose("Destroying previous module", x), v.off(t).removeData(u)
                    },
                    refresh: function() {
                        c.verbose("Refreshing selector cache"), v = a(w)
                    },
                    add: {
                        defaults: function() {
                            var e = b && a.isPlainObject(b.states) ? b.states : {};
                            a.each(m.defaults, function(b, f) {
                                c.is[b] !== d && c.is[b]() && (c.verbose("Adding default states", b, w), a.extend(m.states, f, e))
                            })
                        }
                    },
                    is: {
                        active: function() {
                            return v.hasClass(p.active)
                        },
                        loading: function() {
                            return v.hasClass(p.loading)
                        },
                        inactive: function() {
                            return !v.hasClass(p.active)
                        },
                        state: function(a) {
                            return p[a] === d ? !1 : v.hasClass(p[a])
                        },
                        enabled: function() {
                            return !v.is(m.filter.active)
                        },
                        disabled: function() {
                            return v.is(m.filter.active)
                        },
                        textEnabled: function() {
                            return !v.is(m.filter.text)
                        },
                        button: function() {
                            return v.is(".button:not(a, .submit)")
                        },
                        input: function() {
                            return v.is("input")
                        },
                        progress: function() {
                            return v.is(".ui.progress")
                        }
                    },
                    allow: function(a) {
                        c.debug("Now allowing state", a), r[a] = !0
                    },
                    disallow: function(a) {
                        c.debug("No longer allowing", a), r[a] = !1
                    },
                    allows: function(a) {
                        return r[a] || !1
                    },
                    enable: function() {
                        v.removeClass(p.disabled)
                    },
                    disable: function() {
                        v.addClass(p.disabled)
                    },
                    setState: function(a) {
                        c.allows(a) && v.addClass(p[a])
                    },
                    removeState: function(a) {
                        c.allows(a) && v.removeClass(p[a])
                    },
                    toggle: {
                        state: function() {
                            var b, e;
                            if (c.allows("active") && c.is.enabled()) {
                                if (c.refresh(), a.fn.api !== d)
                                    if (b = v.api("get request"), e = v.api("was cancelled")) c.debug("API Request cancelled by beforesend"), m.activateTest = function() {
                                        return !1
                                    }, m.deactivateTest = function() {
                                        return !1
                                    };
                                    else if (b) return void c.listenTo(b);
                                c.change.state()
                            }
                        }
                    },
                    listenTo: function(b) {
                        c.debug("API request detected, waiting for state signal", b), b && (s.loading && c.update.text(s.loading), a.when(b).then(function() {
                            "resolved" == b.state() ? (c.debug("API request succeeded"), m.activateTest = function() {
                                return !0
                            }, m.deactivateTest = function() {
                                return !0
                            }) : (c.debug("API request failed"), m.activateTest = function() {
                                return !1
                            }, m.deactivateTest = function() {
                                return !1
                            }), c.change.state()
                        }))
                    },
                    change: {
                        state: function() {
                            c.debug("Determining state change direction"), c.is.inactive() ? c.activate() : c.deactivate(), m.sync && c.sync(), m.onChange.call(w)
                        },
                        text: function() {
                            c.is.textEnabled() && (c.is.disabled() ? (c.verbose("Changing text to disabled text", s.hover), c.update.text(s.disabled)) : c.is.active() ? s.hover ? (c.verbose("Changing text to hover text", s.hover), c.update.text(s.hover)) : s.deactivate && (c.verbose("Changing text to deactivating text", s.deactivate), c.update.text(s.deactivate)) : s.hover ? (c.verbose("Changing text to hover text", s.hover), c.update.text(s.hover)) : s.activate && (c.verbose("Changing text to activating text", s.activate), c.update.text(s.activate)))
                        }
                    },
                    activate: function() {
                        m.activateTest.call(w) && (c.debug("Setting state to active"), v.addClass(p.active), c.update.text(s.active), m.onActivate.call(w))
                    },
                    deactivate: function() {
                        m.deactivateTest.call(w) && (c.debug("Setting state to inactive"), v.removeClass(p.active), c.update.text(s.inactive), m.onDeactivate.call(w))
                    },
                    sync: function() {
                        c.verbose("Syncing other buttons to current state"), f.not(v).state(c.is.active() ? "activate" : "deactivate")
                    },
                    get: {
                        text: function() {
                            return m.selector.text ? v.find(m.selector.text).text() : v.html()
                        },
                        textFor: function(a) {
                            return s[a] || !1
                        }
                    },
                    flash: {
                        text: function(a, b, d) {
                            var e = c.get.text();
                            c.debug("Flashing text message", a, b), a = a || m.text.flash, b = b || m.flashDuration, d = d || function() {}, c.update.text(a), setTimeout(function() {
                                c.update.text(e), d.call(w)
                            }, b)
                        }
                    },
                    reset: {
                        text: function() {
                            var a = s.active || v.data(o.storedText),
                                b = s.inactive || v.data(o.storedText);
                            c.is.textEnabled() && (c.is.active() && a ? (c.verbose("Resetting active text", a), c.update.text(a)) : b && (c.verbose("Resetting inactive text", a), c.update.text(b)))
                        }
                    },
                    update: {
                        text: function(a) {
                            var b = c.get.text();
                            a && a !== b ? (c.debug("Updating text", a), m.selector.text ? v.data(o.storedText, a).find(m.selector.text).text(a) : v.data(o.storedText, a).html(a)) : c.debug("Text is already set, ignoring update", a)
                        }
                    },
                    setting: function(b, e) {
                        if (c.debug("Changing setting", b, e), a.isPlainObject(b)) a.extend(!0, m, b);
                        else {
                            if (e === d) return m[b];
                            m[b] = e
                        }
                    },
                    internal: function(b, e) {
                        if (a.isPlainObject(b)) a.extend(!0, c, b);
                        else {
                            if (e === d) return c[b];
                            c[b] = e
                        }
                    },
                    debug: function() {
                        m.debug && (m.performance ? c.performance.log(arguments) : (c.debug = Function.prototype.bind.call(console.info, console, m.name + ":"), c.debug.apply(console, arguments)))
                    },
                    verbose: function() {
                        m.verbose && m.debug && (m.performance ? c.performance.log(arguments) : (c.verbose = Function.prototype.bind.call(console.info, console, m.name + ":"), c.verbose.apply(console, arguments)))
                    },
                    error: function() {
                        c.error = Function.prototype.bind.call(console.error, console, m.name + ":"), c.error.apply(console, arguments)
                    },
                    performance: {
                        log: function(a) {
                            var b, d, e;
                            m.performance && (b = (new Date).getTime(), e = h || b, d = b - e, h = b, i.push({
                                Name: a[0],
                                Arguments: [].slice.call(a, 1) || "",
                                Element: w,
                                "Execution Time": d
                            })), clearTimeout(c.performance.timer), c.performance.timer = setTimeout(c.performance.display, 100)
                        },
                        display: function() {
                            var b = m.name + ":",
                                e = 0;
                            h = !1, clearTimeout(c.performance.timer), a.each(i, function(a, b) {
                                e += b["Execution Time"]
                            }), b += " " + e + "ms", g && (b += " '" + g + "'"), (console.group !== d || console.table !== d) && i.length > 0 && (console.groupCollapsed(b), console.table ? console.table(i) : a.each(i, function(a, b) {
                                console.log(b.Name + ": " + b["Execution Time"] + "ms")
                            }), console.groupEnd()), i = []
                        }
                    },
                    invoke: function(b, f, g) {
                        var h, i, j, k = x;
                        return f = f || l, g = w || g, "string" == typeof b && k !== d && (b = b.split(/[\. ]/), h = b.length - 1, a.each(b, function(e, f) {
                            var g = e != h ? f + b[e + 1].charAt(0).toUpperCase() + b[e + 1].slice(1) : b;
                            if (a.isPlainObject(k[g]) && e != h) k = k[g];
                            else {
                                if (k[g] !== d) return i = k[g], !1;
                                if (!a.isPlainObject(k[f]) || e == h) return k[f] !== d ? (i = k[f], !1) : (c.error(n.method, b), !1);
                                k = k[f]
                            }
                        })), a.isFunction(i) ? j = i.apply(g, f) : i !== d && (j = i), a.isArray(e) ? e.push(j) : e !== d ? e = [e, j] : j !== d && (e = j), i
                    }
                }, k ? (x === d && c.initialize(), c.invoke(j)) : (x !== d && x.invoke("destroy"), c.initialize())
            }), e !== d ? e : this
        }, a.fn.state.settings = {
            name: "State",
            debug: !1,
            verbose: !0,
            namespace: "state",
            performance: !0,
            onActivate: function() {},
            onDeactivate: function() {},
            onChange: function() {},
            activateTest: function() {
                return !0
            },
            deactivateTest: function() {
                return !0
            },
            automatic: !0,
            sync: !1,
            flashDuration: 1e3,
            filter: {
                text: ".loading, .disabled",
                active: ".disabled"
            },
            context: !1,
            error: {
                beforeSend: "The before send function has cancelled state change",
                method: "The method you called is not defined."
            },
            metadata: {
                promise: "promise",
                storedText: "stored-text"
            },
            className: {
                active: "active",
                disabled: "disabled",
                error: "error",
                loading: "loading",
                success: "success",
                warning: "warning"
            },
            selector: {
                text: !1
            },
            defaults: {
                input: {
                    disabled: !0,
                    loading: !0,
                    active: !0
                },
                button: {
                    disabled: !0,
                    loading: !0,
                    active: !0
                },
                progress: {
                    active: !0,
                    success: !0,
                    warning: !0,
                    error: !0
                }
            },
            states: {
                active: !0,
                disabled: !0,
                error: !0,
                loading: !0,
                success: !0,
                warning: !0
            },
            text: {
                disabled: !1,
                flash: !1,
                hover: !1,
                active: !1,
                inactive: !1,
                activate: !1,
                deactivate: !1
            }
        }
    }(jQuery, window, document),
    function(a, b, c, d) {
        a.fn.visibility = function(e) {
            var f, g = a(this),
                h = g.selector || "",
                i = (new Date).getTime(),
                j = [],
                k = arguments[0],
                l = "string" == typeof k,
                m = [].slice.call(arguments, 1);
            return g.each(function() {
                var g, n = a.extend(!0, {}, a.fn.visibility.settings, e),
                    o = n.className,
                    p = n.namespace,
                    q = n.error,
                    r = "." + p,
                    s = "module-" + p,
                    t = a(b),
                    u = a(this),
                    v = a(n.context),
                    w = (u.offsetParent(), u.selector || "", u.data(s)),
                    x = b.requestAnimationFrame || b.mozRequestAnimationFrame || b.webkitRequestAnimationFrame || b.msRequestAnimationFrame || function(a) {
                        setTimeout(a, 0)
                    },
                    y = this;
                g = {
                    initialize: function() {
                        g.verbose("Initializing visibility", n), g.setup.cache(), g.save.position(), g.should.trackChanges() && (g.bindEvents(), "image" == n.type && g.setup.image(), "fixed" == n.type && g.setup.fixed()), g.checkVisibility(), g.instantiate()
                    },
                    instantiate: function() {
                        g.verbose("Storing instance of module", g), w = g, u.data(s, g)
                    },
                    destroy: function() {
                        g.verbose("Destroying previous module"), u.off(r).removeData(s)
                    },
                    bindEvents: function() {
                        g.verbose("Binding visibility events to scroll and resize"), t.on("resize" + r, g.event.refresh), v.on("scroll" + r, g.event.scroll)
                    },
                    event: {
                        refresh: function() {
                            x(g.refresh)
                        },
                        scroll: function() {
                            g.verbose("Scroll position changed"), n.throttle ? (clearTimeout(g.timer), g.timer = setTimeout(g.checkVisibility, n.throttle)) : x(g.checkVisibility)
                        }
                    },
                    precache: function(b, d) {
                        b instanceof Array || (b = [b]);
                        for (var e = b.length, f = 0, g = [], h = c.createElement("img"), i = function() {
                                f++, f >= b.length && a.isFunction(d) && d()
                            }; e--;) h = c.createElement("img"), h.onload = i, h.onerror = i, h.src = b[e], g.push(h)
                    },
                    should: {
                        trackChanges: function() {
                            return l && m.length > 0 ? (g.debug("One time query, no need to bind events"), !1) : (g.debug("Query is attaching callbacks, watching for changes with scroll"), !0)
                        }
                    },
                    setup: {
                        cache: function() {
                            g.cache = {
                                occurred: {},
                                screen: {},
                                element: {}
                            }
                        },
                        image: function() {
                            var a = u.data("src");
                            a && (g.verbose("Lazy loading image", a), g.topVisible(function() {
                                g.precache(a, function() {
                                    g.set.image(a), n.onTopVisible = !1
                                })
                            }))
                        },
                        fixed: function() {
                            g.verbose("Setting up fixed on element pass"), u.visibility({
                                once: !1,
                                continuous: !1,
                                onTopPassed: function() {
                                    u.addClass(o.fixed).css({
                                        position: "fixed",
                                        top: n.offset + "px"
                                    }), n.animation && a.fn.transition !== d && u.transition(n.transition, n.duration)
                                },
                                onTopPassedReverse: function() {
                                    u.removeClass(o.fixed).css({
                                        position: "",
                                        top: ""
                                    })
                                }
                            })
                        }
                    },
                    set: {
                        image: function(b) {
                            var c = g.cache.screen.bottom < g.cache.element.top;
                            u.attr("src", b), c ? (g.verbose("Image outside browser, no show animation"), u.show()) : n.transition && a.fn.transition !== d ? u.transition(n.transition, n.duration) : u.fadeIn(n.duration)
                        }
                    },
                    refresh: function() {
                        g.debug("Refreshing constants (element width/height)"), g.reset(), g.save.position(), g.checkVisibility(), n.onRefresh.call(y)
                    },
                    reset: function() {
                        g.verbose("Reseting all cached values"), a.isPlainObject(g.cache) && (g.cache.screen = {}, g.cache.element = {})
                    },
                    checkVisibility: function() {
                        g.verbose("Checking visibility of element", g.cache.element), g.save.calculations(), g.passed(), g.passingReverse(), g.topVisibleReverse(), g.bottomVisibleReverse(), g.topPassedReverse(), g.bottomPassedReverse(), g.passing(), g.topVisible(), g.bottomVisible(), g.topPassed(), g.bottomPassed()
                    },
                    passed: function(b, c) {
                        var e = g.get.elementCalculations();
                        if (b !== d && c !== d) n.onPassed[b] = c;
                        else {
                            if (b !== d) return g.get.pixelsPassed(b) > e.pixelsPassed;
                            e.passing && a.each(n.onPassed, function(a, b) {
                                e.bottomVisible || e.pixelsPassed > g.get.pixelsPassed(a) ? g.execute(b, a) : n.once || g.remove.occurred(b)
                            })
                        }
                    },
                    passing: function(a) {
                        var b = g.get.elementCalculations(),
                            c = a || n.onPassing,
                            e = "passing";
                        return a && (g.debug("Adding callback for passing", a), n.onPassing = a), b.passing ? g.execute(c, e) : n.once || g.remove.occurred(e), a !== d ? b.passing : void 0
                    },
                    topVisible: function(a) {
                        var b = g.get.elementCalculations(),
                            c = a || n.onTopVisible,
                            e = "topVisible";
                        return a && (g.debug("Adding callback for top visible", a), n.onTopVisible = a), b.topVisible ? g.execute(c, e) : n.once || g.remove.occurred(e), a === d ? b.topVisible : void 0
                    },
                    bottomVisible: function(a) {
                        var b = g.get.elementCalculations(),
                            c = a || n.onBottomVisible,
                            e = "bottomVisible";
                        return a && (g.debug("Adding callback for bottom visible", a), n.onBottomVisible = a), b.bottomVisible ? g.execute(c, e) : n.once || g.remove.occurred(e), a === d ? b.bottomVisible : void 0
                    },
                    topPassed: function(a) {
                        var b = g.get.elementCalculations(),
                            c = a || n.onTopPassed,
                            e = "topPassed";
                        return a && (g.debug("Adding callback for top passed", a), n.onTopPassed = a), b.topPassed ? g.execute(c, e) : n.once || g.remove.occurred(e), a === d ? b.topPassed : void 0
                    },
                    bottomPassed: function(a) {
                        var b = g.get.elementCalculations(),
                            c = a || n.onBottomPassed,
                            e = "bottomPassed";
                        return a && (g.debug("Adding callback for bottom passed", a), n.onBottomPassed = a), b.bottomPassed ? g.execute(c, e) : n.once || g.remove.occurred(e), a === d ? b.bottomPassed : void 0
                    },
                    passingReverse: function(a) {
                        var b = g.get.elementCalculations(),
                            c = a || n.onPassingReverse,
                            e = "passingReverse";
                        return a && (g.debug("Adding callback for passing reverse", a), n.onPassingReverse = a), b.passing ? n.once || g.remove.occurred(e) : g.get.occurred("passing") && g.execute(c, e), a !== d ? !b.passing : void 0
                    },
                    topVisibleReverse: function(a) {
                        var b = g.get.elementCalculations(),
                            c = a || n.onTopVisibleReverse,
                            e = "topVisibleReverse";
                        return a && (g.debug("Adding callback for top visible reverse", a), n.onTopVisibleReverse = a), b.topVisible ? n.once || g.remove.occurred(e) : g.get.occurred("topVisible") && g.execute(c, e), a === d ? !b.topVisible : void 0
                    },
                    bottomVisibleReverse: function(a) {
                        var b = g.get.elementCalculations(),
                            c = a || n.onBottomVisibleReverse,
                            e = "bottomVisibleReverse";
                        return a && (g.debug("Adding callback for bottom visible reverse", a), n.onBottomVisibleReverse = a), b.bottomVisible ? n.once || g.remove.occurred(e) : g.get.occurred("bottomVisible") && g.execute(c, e), a === d ? !b.bottomVisible : void 0
                    },
                    topPassedReverse: function(a) {
                        var b = g.get.elementCalculations(),
                            c = a || n.onTopPassedReverse,
                            e = "topPassedReverse";
                        return a && (g.debug("Adding callback for top passed reverse", a), n.onTopPassedReverse = a), b.topPassed ? n.once || g.remove.occurred(e) : g.get.occurred("topPassed") && g.execute(c, e), a === d ? !b.onTopPassed : void 0
                    },
                    bottomPassedReverse: function(a) {
                        var b = g.get.elementCalculations(),
                            c = a || n.onBottomPassedReverse,
                            e = "bottomPassedReverse";
                        return a && (g.debug("Adding callback for bottom passed reverse", a), n.onBottomPassedReverse = a), b.bottomPassed ? n.once || g.remove.occurred(e) : g.get.occurred("bottomPassed") && g.execute(c, e), a === d ? !b.bottomPassed : void 0
                    },
                    execute: function(a, b) {
                        var c = g.get.elementCalculations(),
                            d = g.get.screenCalculations();
                        a = a || !1, a && (n.continuous ? (g.debug("Callback being called continuously", b, c), a.call(y, c, d)) : g.get.occurred(b) || (g.debug("Conditions met", b, c), a.call(y, c, d))), g.save.occurred(b)
                    },
                    remove: {
                        occurred: function(a) {
                            a ? g.cache.occurred[a] !== d && g.cache.occurred[a] === !0 && (g.debug("Callback can now be called again", a), g.cache.occurred[a] = !1) : g.cache.occurred = {}
                        }
                    },
                    save: {
                        calculations: function() {
                            g.verbose("Saving all calculations necessary to determine positioning"), g.save.scroll(), g.save.direction(), g.save.screenCalculations(), g.save.elementCalculations()
                        },
                        occurred: function(a) {
                            a && (g.cache.occurred[a] === d || g.cache.occurred[a] !== !0) && (g.verbose("Saving callback occurred", a), g.cache.occurred[a] = !0)
                        },
                        scroll: function() {
                            g.cache.scroll = v.scrollTop() + n.offset
                        },
                        direction: function() {
                            var a, b = g.get.scroll(),
                                c = g.get.lastScroll();
                            return a = b > c && c ? "down" : c > b && c ? "up" : "static", g.cache.direction = a, g.cache.direction
                        },
                        elementPosition: function() {
                            var b = g.get.screenSize();
                            return g.verbose("Saving element position"), a.extend(g.cache.element, {
                                margin: {
                                    top: parseInt(u.css("margin-top"), 10),
                                    bottom: parseInt(u.css("margin-bottom"), 10)
                                },
                                fits: y.height < b.height,
                                offset: u.offset(),
                                width: u.outerWidth(),
                                height: u.outerHeight()
                            }), g.cache.element
                        },
                        elementCalculations: function() {
                            var b = g.get.screenCalculations(),
                                c = g.get.elementPosition();
                            n.includeMargin ? a.extend(g.cache.element, {
                                top: c.offset.top - c.margin.top,
                                bottom: c.offset.top + c.height + c.margin.bottom
                            }) : a.extend(g.cache.element, {
                                top: c.offset.top,
                                bottom: c.offset.top + c.height
                            }), a.extend(g.cache.element, {
                                topVisible: b.bottom >= c.top,
                                topPassed: b.top >= c.top,
                                bottomVisible: b.bottom >= c.bottom,
                                bottomPassed: b.top >= c.bottom,
                                pixelsPassed: 0,
                                percentagePassed: 0
                            }), a.extend(g.cache.element, {
                                visible: g.cache.element.topVisible || g.cache.element.bottomVisible,
                                passing: g.cache.element.topPassed && !g.cache.element.bottomPassed,
                                hidden: !g.cache.element.topVisible && !g.cache.element.bottomVisible
                            }), g.cache.element.passing && (g.cache.element.pixelsPassed = b.top - c.top, g.cache.element.percentagePassed = (b.top - c.top) / c.height), g.verbose("Updated element calculations", g.cache.element)
                        },
                        screenCalculations: function() {
                            var b = v.scrollTop() + n.offset;
                            return g.cache.scroll === d && (g.cache.scroll = v.scrollTop() + n.offset), g.save.direction(), a.extend(g.cache.screen, {
                                top: b,
                                bottom: b + g.cache.screen.height
                            }), g.cache.screen
                        },
                        screenSize: function() {
                            g.verbose("Saving window position"), g.cache.screen = {
                                height: v.height()
                            }
                        },
                        position: function() {
                            g.save.screenSize(), g.save.elementPosition()
                        }
                    },
                    get: {
                        pixelsPassed: function(a) {
                            var b = g.get.elementCalculations();
                            return a.search("%") > -1 ? b.height * (parseInt(a, 10) / 100) : parseInt(a, 10)
                        },
                        occurred: function(a) {
                            return g.cache.occurred !== d ? g.cache.occurred[a] || !1 : !1
                        },
                        direction: function() {
                            return g.cache.direction === d && g.save.direction(), g.cache.direction
                        },
                        elementPosition: function() {
                            return g.cache.element === d && g.save.elementPosition(), g.cache.element
                        },
                        elementCalculations: function() {
                            return g.cache.element === d && g.save.elementCalculations(), g.cache.element
                        },
                        screenCalculations: function() {
                            return g.cache.screen === d && g.save.screenCalculations(), g.cache.screen
                        },
                        screenSize: function() {
                            return g.cache.screen === d && g.save.screenSize(), g.cache.screen
                        },
                        scroll: function() {
                            return g.cache.scroll === d && g.save.scroll(), g.cache.scroll
                        },
                        lastScroll: function() {
                            return g.cache.screen === d ? (g.debug("First scroll event, no last scroll could be found"), !1) : g.cache.screen.top
                        }
                    },
                    setting: function(b, c) {
                        if (a.isPlainObject(b)) a.extend(!0, n, b);
                        else {
                            if (c === d) return n[b];
                            n[b] = c
                        }
                    },
                    internal: function(b, c) {
                        if (a.isPlainObject(b)) a.extend(!0, g, b);
                        else {
                            if (c === d) return g[b];
                            g[b] = c
                        }
                    },
                    debug: function() {
                        n.debug && (n.performance ? g.performance.log(arguments) : (g.debug = Function.prototype.bind.call(console.info, console, n.name + ":"), g.debug.apply(console, arguments)))
                    },
                    verbose: function() {
                        n.verbose && n.debug && (n.performance ? g.performance.log(arguments) : (g.verbose = Function.prototype.bind.call(console.info, console, n.name + ":"), g.verbose.apply(console, arguments)))
                    },
                    error: function() {
                        g.error = Function.prototype.bind.call(console.error, console, n.name + ":"), g.error.apply(console, arguments)
                    },
                    performance: {
                        log: function(a) {
                            var b, c, d;
                            n.performance && (b = (new Date).getTime(), d = i || b, c = b - d, i = b, j.push({
                                Name: a[0],
                                Arguments: [].slice.call(a, 1) || "",
                                Element: y,
                                "Execution Time": c
                            })), clearTimeout(g.performance.timer), g.performance.timer = setTimeout(g.performance.display, 100)
                        },
                        display: function() {
                            var b = n.name + ":",
                                c = 0;
                            i = !1, clearTimeout(g.performance.timer), a.each(j, function(a, b) {
                                c += b["Execution Time"]
                            }), b += " " + c + "ms", h && (b += " '" + h + "'"), (console.group !== d || console.table !== d) && j.length > 0 && (console.groupCollapsed(b), console.table ? console.table(j) : a.each(j, function(a, b) {
                                console.log(b.Name + ": " + b["Execution Time"] + "ms")
                            }), console.groupEnd()), j = []
                        }
                    },
                    invoke: function(b, c, e) {
                        var h, i, j, k = w;
                        return c = c || m, e = y || e, "string" == typeof b && k !== d && (b = b.split(/[\. ]/), h = b.length - 1, a.each(b, function(c, e) {
                            var f = c != h ? e + b[c + 1].charAt(0).toUpperCase() + b[c + 1].slice(1) : b;
                            if (a.isPlainObject(k[f]) && c != h) k = k[f];
                            else {
                                if (k[f] !== d) return i = k[f], !1;
                                if (!a.isPlainObject(k[e]) || c == h) return k[e] !== d ? (i = k[e], !1) : (g.error(q.method, b), !1);
                                k = k[e]
                            }
                        })), a.isFunction(i) ? j = i.apply(e, c) : i !== d && (j = i), a.isArray(f) ? f.push(j) : f !== d ? f = [f, j] : j !== d && (f = j), i
                    }
                }, l ? (w === d && g.initialize(), g.invoke(k)) : (w !== d && w.invoke("destroy"), g.initialize())
            }), f !== d ? f : this
        }, a.fn.visibility.settings = {
            name: "Visibility",
            namespace: "visibility",
            className: {
                fixed: "fixed"
            },
            debug: !1,
            verbose: !1,
            performance: !0,
            offset: 0,
            includeMargin: !1,
            context: b,
            throttle: !1,
            type: !1,
            transition: !1,
            duration: 500,
            onPassed: {},
            onPassing: !1,
            onTopVisible: !1,
            onBottomVisible: !1,
            onTopPassed: !1,
            onBottomPassed: !1,
            onPassingReverse: !1,
            onTopVisibleReverse: !1,
            onBottomVisibleReverse: !1,
            onTopPassedReverse: !1,
            onBottomPassedReverse: !1,
            once: !0,
            continuous: !1,
            onRefresh: function() {},
            onScroll: function() {},
            error: {
                method: "The method you called is not defined."
            }
        }
    }(jQuery, window, document),
    function() {
        var a = this,
            b = a._,
            c = Array.prototype,
            d = Object.prototype,
            e = Function.prototype,
            f = c.push,
            g = c.slice,
            h = c.concat,
            i = d.toString,
            j = d.hasOwnProperty,
            k = Array.isArray,
            l = Object.keys,
            m = e.bind,
            n = function(a) {
                return a instanceof n ? a : this instanceof n ? void(this._wrapped = a) : new n(a)
            };
        "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = n), exports._ = n) : a._ = n, n.VERSION = "1.7.0";
        var o = function(a, b, c) {
            if (void 0 === b) return a;
            switch (null == c ? 3 : c) {
                case 1:
                    return function(c) {
                        return a.call(b, c)
                    };
                case 2:
                    return function(c, d) {
                        return a.call(b, c, d)
                    };
                case 3:
                    return function(c, d, e) {
                        return a.call(b, c, d, e)
                    };
                case 4:
                    return function(c, d, e, f) {
                        return a.call(b, c, d, e, f)
                    }
            }
            return function() {
                return a.apply(b, arguments)
            }
        };
        n.iteratee = function(a, b, c) {
            return null == a ? n.identity : n.isFunction(a) ? o(a, b, c) : n.isObject(a) ? n.matches(a) : n.property(a)
        }, n.each = n.forEach = function(a, b, c) {
            if (null == a) return a;
            b = o(b, c);
            var d, e = a.length;
            if (e === +e)
                for (d = 0; e > d; d++) b(a[d], d, a);
            else {
                var f = n.keys(a);
                for (d = 0, e = f.length; e > d; d++) b(a[f[d]], f[d], a)
            }
            return a
        }, n.map = n.collect = function(a, b, c) {
            if (null == a) return [];
            b = n.iteratee(b, c);
            for (var d, e = a.length !== +a.length && n.keys(a), f = (e || a).length, g = Array(f), h = 0; f > h; h++) d = e ? e[h] : h, g[h] = b(a[d], d, a);
            return g
        };
        var p = "Reduce of empty array with no initial value";
        n.reduce = n.foldl = n.inject = function(a, b, c, d) {
            null == a && (a = []), b = o(b, d, 4);
            var e, f = a.length !== +a.length && n.keys(a),
                g = (f || a).length,
                h = 0;
            if (arguments.length < 3) {
                if (!g) throw new TypeError(p);
                c = a[f ? f[h++] : h++]
            }
            for (; g > h; h++) e = f ? f[h] : h, c = b(c, a[e], e, a);
            return c
        }, n.reduceRight = n.foldr = function(a, b, c, d) {
            null == a && (a = []), b = o(b, d, 4);
            var e, f = a.length !== +a.length && n.keys(a),
                g = (f || a).length;
            if (arguments.length < 3) {
                if (!g) throw new TypeError(p);
                c = a[f ? f[--g] : --g]
            }
            for (; g--;) e = f ? f[g] : g, c = b(c, a[e], e, a);
            return c
        }, n.find = n.detect = function(a, b, c) {
            var d;
            return b = n.iteratee(b, c), n.some(a, function(a, c, e) {
                return b(a, c, e) ? (d = a, !0) : void 0
            }), d
        }, n.filter = n.select = function(a, b, c) {
            var d = [];
            return null == a ? d : (b = n.iteratee(b, c), n.each(a, function(a, c, e) {
                b(a, c, e) && d.push(a)
            }), d)
        }, n.reject = function(a, b, c) {
            return n.filter(a, n.negate(n.iteratee(b)), c)
        }, n.every = n.all = function(a, b, c) {
            if (null == a) return !0;
            b = n.iteratee(b, c);
            var d, e, f = a.length !== +a.length && n.keys(a),
                g = (f || a).length;
            for (d = 0; g > d; d++)
                if (e = f ? f[d] : d, !b(a[e], e, a)) return !1;
            return !0
        }, n.some = n.any = function(a, b, c) {
            if (null == a) return !1;
            b = n.iteratee(b, c);
            var d, e, f = a.length !== +a.length && n.keys(a),
                g = (f || a).length;
            for (d = 0; g > d; d++)
                if (e = f ? f[d] : d, b(a[e], e, a)) return !0;
            return !1
        }, n.contains = n.include = function(a, b) {
            return null == a ? !1 : (a.length !== +a.length && (a = n.values(a)), n.indexOf(a, b) >= 0)
        }, n.invoke = function(a, b) {
            var c = g.call(arguments, 2),
                d = n.isFunction(b);
            return n.map(a, function(a) {
                return (d ? b : a[b]).apply(a, c)
            })
        }, n.pluck = function(a, b) {
            return n.map(a, n.property(b))
        }, n.where = function(a, b) {
            return n.filter(a, n.matches(b))
        }, n.findWhere = function(a, b) {
            return n.find(a, n.matches(b))
        }, n.max = function(a, b, c) {
            var d, e, f = -1 / 0,
                g = -1 / 0;
            if (null == b && null != a) {
                a = a.length === +a.length ? a : n.values(a);
                for (var h = 0, i = a.length; i > h; h++) d = a[h], d > f && (f = d)
            } else b = n.iteratee(b, c), n.each(a, function(a, c, d) {
                e = b(a, c, d), (e > g || e === -1 / 0 && f === -1 / 0) && (f = a, g = e)
            });
            return f
        }, n.min = function(a, b, c) {
            var d, e, f = 1 / 0,
                g = 1 / 0;
            if (null == b && null != a) {
                a = a.length === +a.length ? a : n.values(a);
                for (var h = 0, i = a.length; i > h; h++) d = a[h], f > d && (f = d)
            } else b = n.iteratee(b, c), n.each(a, function(a, c, d) {
                e = b(a, c, d), (g > e || 1 / 0 === e && 1 / 0 === f) && (f = a, g = e)
            });
            return f
        }, n.shuffle = function(a) {
            for (var b, c = a && a.length === +a.length ? a : n.values(a), d = c.length, e = Array(d), f = 0; d > f; f++) b = n.random(0, f), b !== f && (e[f] = e[b]), e[b] = c[f];
            return e
        }, n.sample = function(a, b, c) {
            return null == b || c ? (a.length !== +a.length && (a = n.values(a)), a[n.random(a.length - 1)]) : n.shuffle(a).slice(0, Math.max(0, b))
        }, n.sortBy = function(a, b, c) {
            return b = n.iteratee(b, c), n.pluck(n.map(a, function(a, c, d) {
                return {
                    value: a,
                    index: c,
                    criteria: b(a, c, d)
                }
            }).sort(function(a, b) {
                var c = a.criteria,
                    d = b.criteria;
                if (c !== d) {
                    if (c > d || void 0 === c) return 1;
                    if (d > c || void 0 === d) return -1
                }
                return a.index - b.index
            }), "value")
        };
        var q = function(a) {
            return function(b, c, d) {
                var e = {};
                return c = n.iteratee(c, d), n.each(b, function(d, f) {
                    var g = c(d, f, b);
                    a(e, d, g)
                }), e
            }
        };
        n.groupBy = q(function(a, b, c) {
            n.has(a, c) ? a[c].push(b) : a[c] = [b]
        }), n.indexBy = q(function(a, b, c) {
            a[c] = b
        }), n.countBy = q(function(a, b, c) {
            n.has(a, c) ? a[c] ++ : a[c] = 1
        }), n.sortedIndex = function(a, b, c, d) {
            c = n.iteratee(c, d, 1);
            for (var e = c(b), f = 0, g = a.length; g > f;) {
                var h = f + g >>> 1;
                c(a[h]) < e ? f = h + 1 : g = h
            }
            return f
        }, n.toArray = function(a) {
            return a ? n.isArray(a) ? g.call(a) : a.length === +a.length ? n.map(a, n.identity) : n.values(a) : []
        }, n.size = function(a) {
            return null == a ? 0 : a.length === +a.length ? a.length : n.keys(a).length
        }, n.partition = function(a, b, c) {
            b = n.iteratee(b, c);
            var d = [],
                e = [];
            return n.each(a, function(a, c, f) {
                (b(a, c, f) ? d : e).push(a)
            }), [d, e]
        }, n.first = n.head = n.take = function(a, b, c) {
            return null == a ? void 0 : null == b || c ? a[0] : 0 > b ? [] : g.call(a, 0, b)
        }, n.initial = function(a, b, c) {
            return g.call(a, 0, Math.max(0, a.length - (null == b || c ? 1 : b)))
        }, n.last = function(a, b, c) {
            return null == a ? void 0 : null == b || c ? a[a.length - 1] : g.call(a, Math.max(a.length - b, 0))
        }, n.rest = n.tail = n.drop = function(a, b, c) {
            return g.call(a, null == b || c ? 1 : b)
        }, n.compact = function(a) {
            return n.filter(a, n.identity)
        };
        var r = function(a, b, c, d) {
            if (b && n.every(a, n.isArray)) return h.apply(d, a);
            for (var e = 0, g = a.length; g > e; e++) {
                var i = a[e];
                n.isArray(i) || n.isArguments(i) ? b ? f.apply(d, i) : r(i, b, c, d) : c || d.push(i)
            }
            return d
        };
        n.flatten = function(a, b) {
            return r(a, b, !1, [])
        }, n.without = function(a) {
            return n.difference(a, g.call(arguments, 1))
        }, n.uniq = n.unique = function(a, b, c, d) {
            if (null == a) return [];
            n.isBoolean(b) || (d = c, c = b, b = !1), null != c && (c = n.iteratee(c, d));
            for (var e = [], f = [], g = 0, h = a.length; h > g; g++) {
                var i = a[g];
                if (b) g && f === i || e.push(i), f = i;
                else if (c) {
                    var j = c(i, g, a);
                    n.indexOf(f, j) < 0 && (f.push(j), e.push(i))
                } else n.indexOf(e, i) < 0 && e.push(i)
            }
            return e
        }, n.union = function() {
            return n.uniq(r(arguments, !0, !0, []))
        }, n.intersection = function(a) {
            if (null == a) return [];
            for (var b = [], c = arguments.length, d = 0, e = a.length; e > d; d++) {
                var f = a[d];
                if (!n.contains(b, f)) {
                    for (var g = 1; c > g && n.contains(arguments[g], f); g++);
                    g === c && b.push(f)
                }
            }
            return b
        }, n.difference = function(a) {
            var b = r(g.call(arguments, 1), !0, !0, []);
            return n.filter(a, function(a) {
                return !n.contains(b, a)
            })
        }, n.zip = function(a) {
            if (null == a) return [];
            for (var b = n.max(arguments, "length").length, c = Array(b), d = 0; b > d; d++) c[d] = n.pluck(arguments, d);
            return c
        }, n.object = function(a, b) {
            if (null == a) return {};
            for (var c = {}, d = 0, e = a.length; e > d; d++) b ? c[a[d]] = b[d] : c[a[d][0]] = a[d][1];
            return c
        }, n.indexOf = function(a, b, c) {
            if (null == a) return -1;
            var d = 0,
                e = a.length;
            if (c) {
                if ("number" != typeof c) return d = n.sortedIndex(a, b), a[d] === b ? d : -1;
                d = 0 > c ? Math.max(0, e + c) : c
            }
            for (; e > d; d++)
                if (a[d] === b) return d;
            return -1
        }, n.lastIndexOf = function(a, b, c) {
            if (null == a) return -1;
            var d = a.length;
            for ("number" == typeof c && (d = 0 > c ? d + c + 1 : Math.min(d, c + 1)); --d >= 0;)
                if (a[d] === b) return d;
            return -1
        }, n.range = function(a, b, c) {
            arguments.length <= 1 && (b = a || 0, a = 0), c = c || 1;
            for (var d = Math.max(Math.ceil((b - a) / c), 0), e = Array(d), f = 0; d > f; f++, a += c) e[f] = a;
            return e
        };
        var s = function() {};
        n.bind = function(a, b) {
            var c, d;
            if (m && a.bind === m) return m.apply(a, g.call(arguments, 1));
            if (!n.isFunction(a)) throw new TypeError("Bind must be called on a function");
            return c = g.call(arguments, 2), d = function() {
                if (!(this instanceof d)) return a.apply(b, c.concat(g.call(arguments)));
                s.prototype = a.prototype;
                var e = new s;
                s.prototype = null;
                var f = a.apply(e, c.concat(g.call(arguments)));
                return n.isObject(f) ? f : e
            }
        }, n.partial = function(a) {
            var b = g.call(arguments, 1);
            return function() {
                for (var c = 0, d = b.slice(), e = 0, f = d.length; f > e; e++) d[e] === n && (d[e] = arguments[c++]);
                for (; c < arguments.length;) d.push(arguments[c++]);
                return a.apply(this, d)
            }
        }, n.bindAll = function(a) {
            var b, c, d = arguments.length;
            if (1 >= d) throw new Error("bindAll must be passed function names");
            for (b = 1; d > b; b++) c = arguments[b], a[c] = n.bind(a[c], a);
            return a
        }, n.memoize = function(a, b) {
            var c = function(d) {
                var e = c.cache,
                    f = b ? b.apply(this, arguments) : d;
                return n.has(e, f) || (e[f] = a.apply(this, arguments)), e[f]
            };
            return c.cache = {}, c
        }, n.delay = function(a, b) {
            var c = g.call(arguments, 2);
            return setTimeout(function() {
                return a.apply(null, c)
            }, b)
        }, n.defer = function(a) {
            return n.delay.apply(n, [a, 1].concat(g.call(arguments, 1)))
        }, n.throttle = function(a, b, c) {
            var d, e, f, g = null,
                h = 0;
            c || (c = {});
            var i = function() {
                h = c.leading === !1 ? 0 : n.now(), g = null, f = a.apply(d, e), g || (d = e = null)
            };
            return function() {
                var j = n.now();
                h || c.leading !== !1 || (h = j);
                var k = b - (j - h);
                return d = this, e = arguments, 0 >= k || k > b ? (clearTimeout(g), g = null, h = j, f = a.apply(d, e), g || (d = e = null)) : g || c.trailing === !1 || (g = setTimeout(i, k)), f
            }
        }, n.debounce = function(a, b, c) {
            var d, e, f, g, h, i = function() {
                var j = n.now() - g;
                b > j && j > 0 ? d = setTimeout(i, b - j) : (d = null, c || (h = a.apply(f, e), d || (f = e = null)))
            };
            return function() {
                f = this, e = arguments, g = n.now();
                var j = c && !d;
                return d || (d = setTimeout(i, b)), j && (h = a.apply(f, e), f = e = null), h
            }
        }, n.wrap = function(a, b) {
            return n.partial(b, a)
        }, n.negate = function(a) {
            return function() {
                return !a.apply(this, arguments)
            }
        }, n.compose = function() {
            var a = arguments,
                b = a.length - 1;
            return function() {
                for (var c = b, d = a[b].apply(this, arguments); c--;) d = a[c].call(this, d);
                return d
            }
        }, n.after = function(a, b) {
            return function() {
                return --a < 1 ? b.apply(this, arguments) : void 0
            }
        }, n.before = function(a, b) {
            var c;
            return function() {
                return --a > 0 ? c = b.apply(this, arguments) : b = null, c
            }
        }, n.once = n.partial(n.before, 2), n.keys = function(a) {
            if (!n.isObject(a)) return [];
            if (l) return l(a);
            var b = [];
            for (var c in a) n.has(a, c) && b.push(c);
            return b
        }, n.values = function(a) {
            for (var b = n.keys(a), c = b.length, d = Array(c), e = 0; c > e; e++) d[e] = a[b[e]];
            return d
        }, n.pairs = function(a) {
            for (var b = n.keys(a), c = b.length, d = Array(c), e = 0; c > e; e++) d[e] = [b[e], a[b[e]]];
            return d
        }, n.invert = function(a) {
            for (var b = {}, c = n.keys(a), d = 0, e = c.length; e > d; d++) b[a[c[d]]] = c[d];
            return b
        }, n.functions = n.methods = function(a) {
            var b = [];
            for (var c in a) n.isFunction(a[c]) && b.push(c);
            return b.sort()
        }, n.extend = function(a) {
            if (!n.isObject(a)) return a;
            for (var b, c, d = 1, e = arguments.length; e > d; d++) {
                b = arguments[d];
                for (c in b) j.call(b, c) && (a[c] = b[c])
            }
            return a
        }, n.pick = function(a, b, c) {
            var d, e = {};
            if (null == a) return e;
            if (n.isFunction(b)) {
                b = o(b, c);
                for (d in a) {
                    var f = a[d];
                    b(f, d, a) && (e[d] = f)
                }
            } else {
                var i = h.apply([], g.call(arguments, 1));
                a = new Object(a);
                for (var j = 0, k = i.length; k > j; j++) d = i[j], d in a && (e[d] = a[d])
            }
            return e
        }, n.omit = function(a, b, c) {
            if (n.isFunction(b)) b = n.negate(b);
            else {
                var d = n.map(h.apply([], g.call(arguments, 1)), String);
                b = function(a, b) {
                    return !n.contains(d, b)
                }
            }
            return n.pick(a, b, c)
        }, n.defaults = function(a) {
            if (!n.isObject(a)) return a;
            for (var b = 1, c = arguments.length; c > b; b++) {
                var d = arguments[b];
                for (var e in d) void 0 === a[e] && (a[e] = d[e])
            }
            return a
        }, n.clone = function(a) {
            return n.isObject(a) ? n.isArray(a) ? a.slice() : n.extend({}, a) : a
        }, n.tap = function(a, b) {
            return b(a), a
        };
        var t = function(a, b, c, d) {
            if (a === b) return 0 !== a || 1 / a === 1 / b;
            if (null == a || null == b) return a === b;
            a instanceof n && (a = a._wrapped), b instanceof n && (b = b._wrapped);
            var e = i.call(a);
            if (e !== i.call(b)) return !1;
            switch (e) {
                case "[object RegExp]":
                case "[object String]":
                    return "" + a == "" + b;
                case "[object Number]":
                    return +a !== +a ? +b !== +b : 0 === +a ? 1 / +a === 1 / b : +a === +b;
                case "[object Date]":
                case "[object Boolean]":
                    return +a === +b
            }
            if ("object" != typeof a || "object" != typeof b) return !1;
            for (var f = c.length; f--;)
                if (c[f] === a) return d[f] === b;
            var g = a.constructor,
                h = b.constructor;
            if (g !== h && "constructor" in a && "constructor" in b && !(n.isFunction(g) && g instanceof g && n.isFunction(h) && h instanceof h)) return !1;
            c.push(a), d.push(b);
            var j, k;
            if ("[object Array]" === e) {
                if (j = a.length, k = j === b.length)
                    for (; j-- && (k = t(a[j], b[j], c, d)););
            } else {
                var l, m = n.keys(a);
                if (j = m.length, k = n.keys(b).length === j)
                    for (; j-- && (l = m[j], k = n.has(b, l) && t(a[l], b[l], c, d)););
            }
            return c.pop(), d.pop(), k
        };
        n.isEqual = function(a, b) {
            return t(a, b, [], [])
        }, n.isEmpty = function(a) {
            if (null == a) return !0;
            if (n.isArray(a) || n.isString(a) || n.isArguments(a)) return 0 === a.length;
            for (var b in a)
                if (n.has(a, b)) return !1;
            return !0
        }, n.isElement = function(a) {
            return !(!a || 1 !== a.nodeType)
        }, n.isArray = k || function(a) {
            return "[object Array]" === i.call(a)
        }, n.isObject = function(a) {
            var b = typeof a;
            return "function" === b || "object" === b && !!a
        }, n.each(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(a) {
            n["is" + a] = function(b) {
                return i.call(b) === "[object " + a + "]"
            }
        }), n.isArguments(arguments) || (n.isArguments = function(a) {
            return n.has(a, "callee")
        }), "function" != typeof /./ && (n.isFunction = function(a) {
            return "function" == typeof a || !1
        }), n.isFinite = function(a) {
            return isFinite(a) && !isNaN(parseFloat(a))
        }, n.isNaN = function(a) {
            return n.isNumber(a) && a !== +a
        }, n.isBoolean = function(a) {
            return a === !0 || a === !1 || "[object Boolean]" === i.call(a)
        }, n.isNull = function(a) {
            return null === a
        }, n.isUndefined = function(a) {
            return void 0 === a
        }, n.has = function(a, b) {
            return null != a && j.call(a, b)
        }, n.noConflict = function() {
            return a._ = b, this
        }, n.identity = function(a) {
            return a
        }, n.constant = function(a) {
            return function() {
                return a
            }
        }, n.noop = function() {}, n.property = function(a) {
            return function(b) {
                return b[a]
            }
        }, n.matches = function(a) {
            var b = n.pairs(a),
                c = b.length;
            return function(a) {
                if (null == a) return !c;
                a = new Object(a);
                for (var d = 0; c > d; d++) {
                    var e = b[d],
                        f = e[0];
                    if (e[1] !== a[f] || !(f in a)) return !1
                }
                return !0
            }
        }, n.times = function(a, b, c) {
            var d = Array(Math.max(0, a));
            b = o(b, c, 1);
            for (var e = 0; a > e; e++) d[e] = b(e);
            return d
        }, n.random = function(a, b) {
            return null == b && (b = a, a = 0), a + Math.floor(Math.random() * (b - a + 1))
        }, n.now = Date.now || function() {
            return (new Date).getTime()
        };
        var u = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "`": "&#x60;"
            },
            v = n.invert(u),
            w = function(a) {
                var b = function(b) {
                        return a[b]
                    },
                    c = "(?:" + n.keys(a).join("|") + ")",
                    d = RegExp(c),
                    e = RegExp(c, "g");
                return function(a) {
                    return a = null == a ? "" : "" + a, d.test(a) ? a.replace(e, b) : a
                }
            };
        n.escape = w(u), n.unescape = w(v), n.result = function(a, b) {
            if (null == a) return void 0;
            var c = a[b];
            return n.isFunction(c) ? a[b]() : c
        };
        var x = 0;
        n.uniqueId = function(a) {
            var b = ++x + "";
            return a ? a + b : b
        }, n.templateSettings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
        };
        var y = /(.)^/,
            z = {
                "'": "'",
                "\\": "\\",
                "\r": "r",
                "\n": "n",
                "\u2028": "u2028",
                "\u2029": "u2029"
            },
            A = /\\|'|\r|\n|\u2028|\u2029/g,
            B = function(a) {
                return "\\" + z[a]
            };
        n.template = function(a, b, c) {
            !b && c && (b = c), b = n.defaults({}, b, n.templateSettings);
            var d = RegExp([(b.escape || y).source, (b.interpolate || y).source, (b.evaluate || y).source].join("|") + "|$", "g"),
                e = 0,
                f = "__p+='";
            a.replace(d, function(b, c, d, g, h) {
                return f += a.slice(e, h).replace(A, B), e = h + b.length, c ? f += "'+\n((__t=(" + c + "))==null?'':_.escape(__t))+\n'" : d ? f += "'+\n((__t=(" + d + "))==null?'':__t)+\n'" : g && (f += "';\n" + g + "\n__p+='"), b
            }), f += "';\n", b.variable || (f = "with(obj||{}){\n" + f + "}\n"), f = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + f + "return __p;\n";
            try {
                var g = new Function(b.variable || "obj", "_", f)
            } catch (h) {
                throw h.source = f, h
            }
            var i = function(a) {
                    return g.call(this, a, n)
                },
                j = b.variable || "obj";
            return i.source = "function(" + j + "){\n" + f + "}", i
        }, n.chain = function(a) {
            var b = n(a);
            return b._chain = !0, b
        };
        var C = function(a) {
            return this._chain ? n(a).chain() : a
        };
        n.mixin = function(a) {
            n.each(n.functions(a), function(b) {
                var c = n[b] = a[b];
                n.prototype[b] = function() {
                    var a = [this._wrapped];
                    return f.apply(a, arguments), C.call(this, c.apply(n, a))
                }
            })
        }, n.mixin(n), n.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(a) {
            var b = c[a];
            n.prototype[a] = function() {
                var c = this._wrapped;
                return b.apply(c, arguments), "shift" !== a && "splice" !== a || 0 !== c.length || delete c[0], C.call(this, c)
            }
        }), n.each(["concat", "join", "slice"], function(a) {
            var b = c[a];
            n.prototype[a] = function() {
                return C.call(this, b.apply(this._wrapped, arguments))
            }
        }), n.prototype.value = function() {
            return this._wrapped
        }, "function" == typeof define && define.amd && define("underscore", [], function() {
            return n
        })
    }.call(this), angular.module("pascalprecht.translate").provider("$translatePartialLoader", function() {
        function a(a) {
            this.name = a, this.isActive = !0, this.tables = {}
        }

        function b(a) {
            return Object.prototype.hasOwnProperty.call(f, a)
        }

        function c(a) {
            return angular.isString(a) && "" !== a
        }

        function d(a) {
            if (!c(a)) throw new TypeError("Invalid type of a first argument, a non-empty string expected.");
            return b(a) && f[a].isActive
        }

        function e(a, b) {
            for (var c in b) b[c] && b[c].constructor && b[c].constructor === Object ? (a[c] = a[c] || {}, e(a[c], b[c])) : a[c] = b[c];
            return a
        }
        a.prototype.parseUrl = function(a, b) {
            return a.replace(/\{part\}/g, this.name).replace(/\{lang\}/g, b)
        }, a.prototype.getTable = function(a, b, c, d, e, f) {
            var g = b.defer();
            if (this.tables[a]) g.resolve(this.tables[a]);
            else {
                var h = this;
                c(angular.extend({
                    method: "GET",
                    url: this.parseUrl(e, a)
                }, d)).success(function(b) {
                    h.tables[a] = b, g.resolve(b)
                }).error(function() {
                    f ? f(h.name, a).then(function(b) {
                        h.tables[a] = b, g.resolve(b)
                    }, function() {
                        g.reject(h.name)
                    }) : g.reject(h.name)
                })
            }
            return g.promise
        };
        var f = {};
        this.addPart = function(d) {
            if (!c(d)) throw new TypeError("Couldn't add part, part name has to be a string!");
            return b(d) || (f[d] = new a(d)), f[d].isActive = !0, this
        }, this.setPart = function(d, e, g) {
            if (!c(d)) throw new TypeError("Couldn't set part.`lang` parameter has to be a string!");
            if (!c(e)) throw new TypeError("Couldn't set part.`part` parameter has to be a string!");
            if ("object" != typeof g || null === g) throw new TypeError("Couldn't set part. `table` parameter has to be an object!");
            return b(e) || (f[e] = new a(e), f[e].isActive = !1), f[e].tables[d] = g, this
        }, this.deletePart = function(a) {
            if (!c(a)) throw new TypeError("Couldn't delete part, first arg has to be string.");
            return b(a) && (f[a].isActive = !1), this
        }, this.isPartAvailable = d, this.$get = ["$rootScope", "$injector", "$q", "$http", function(g, h, i, j) {
            var k = function(a) {
                function d(a) {
                    l.push(a)
                }
                if (!c(a.key)) throw new TypeError("Unable to load data, a key is not a non-empty string.");
                if (!c(a.urlTemplate)) throw new TypeError("Unable to load data, a urlTemplate is not a non-empty string.");
                var g = a.loadFailureHandler;
                if (void 0 !== g) {
                    if (!angular.isString(g)) throw new Error("Unable to load data, a loadFailureHandler is not a string.");
                    g = h.get(g)
                }
                var k = [],
                    l = [],
                    m = i.defer();
                for (var n in f) b(n) && f[n].isActive && (k.push(f[n].getTable(a.key, i, j, a.$http, a.urlTemplate, g).then(d)), f[n].urlTemplate = a.urlTemplate);
                return k.length ? i.all(k).then(function() {
                    for (var a = {}, b = 0; b < l.length; b++) e(a, l[b]);
                    m.resolve(a)
                }, function() {
                    m.reject(a.key)
                }) : m.resolve({}), m.promise
            };
            return k.addPart = function(d) {
                if (!c(d)) throw new TypeError("Couldn't add part, first arg has to be a string");
                return b(d) ? f[d].isActive || (f[d].isActive = !0, g.$emit("$translatePartialLoaderStructureChanged", d)) : (f[d] = new a(d), g.$emit("$translatePartialLoaderStructureChanged", d)), k
            }, k.deletePart = function(a, d) {
                if (!c(a)) throw new TypeError("Couldn't delete part, first arg has to be string");
                if (void 0 === d) d = !1;
                else if ("boolean" != typeof d) throw new TypeError("Invalid type of a second argument, a boolean expected.");
                if (b(a)) {
                    var e = f[a].isActive;
                    if (d) {
                        var i = h.get("$translate"),
                            j = i.loaderCache();
                        "string" == typeof j && (j = h.get(j)), "object" == typeof j && angular.forEach(f[a].tables, function(b, c) {
                            j.remove(f[a].parseUrl(f[a].urlTemplate, c))
                        }), delete f[a]
                    } else f[a].isActive = !1;
                    e && g.$emit("$translatePartialLoaderStructureChanged", a)
                }
                return k
            }, k.isPartAvailable = d, k
        }]
    }),
    function(a, b) {
        "use strict";
        b.module("ngIdle", ["ngIdle.keepalive", "ngIdle.idle", "ngIdle.countdown", "ngIdle.title"]), b.module("ngIdle.keepalive", []).provider("Keepalive", function() {
            var a = {
                http: null,
                interval: 600
            };
            this.http = function(c) {
                if (!c) throw new Error("Argument must be a string containing a URL, or an object containing the HTTP request configuration.");
                b.isString(c) && (c = {
                    url: c,
                    method: "GET"
                }), c.cache = !1, a.http = c
            };
            var c = this.interval = function(b) {
                if (b = parseInt(b), isNaN(b) || 0 >= b) throw new Error("Interval must be expressed in seconds and be greater than 0.");
                a.interval = b
            };
            this.$get = ["$rootScope", "$log", "$interval", "$http", function(d, e, f, g) {
                function h(a, b) {
                    d.$broadcast("KeepaliveResponse", a, b)
                }

                function i() {
                    d.$broadcast("Keepalive"), b.isObject(a.http) && g(a.http).success(h).error(h)
                }
                var j = {
                    ping: null
                };
                return {
                    _options: function() {
                        return a
                    },
                    setInterval: c,
                    start: function() {
                        return f.cancel(j.ping), j.ping = f(i, 1e3 * a.interval), j.ping
                    },
                    stop: function() {
                        f.cancel(j.ping)
                    },
                    ping: function() {
                        i()
                    }
                }
            }]
        }), b.module("ngIdle.idle", ["ngIdle.keepalive"]).provider("Idle", function() {
            var a = {
                    idle: 1200,
                    timeout: 30,
                    autoResume: !0,
                    interrupt: "mousemove keydown DOMMouseScroll mousewheel mousedown touchstart touchmove scroll",
                    keepalive: !0
                },
                c = this.timeout = function(c) {
                    if (c === !1) a.timeout = 0;
                    else {
                        if (!(b.isNumber(c) && c >= 0)) throw new Error("Timeout must be zero or false to disable the feature, or a positive integer (in seconds) to enable it.");
                        a.timeout = c
                    }
                };
            this.interrupt = function(b) {
                a.interrupt = b
            };
            var d = this.idle = function(b) {
                if (0 >= b) throw new Error("Idle must be a value in seconds, greater than 0.");
                a.idle = b
            };
            this.autoResume = function(b) {
                a.autoResume = b === !0
            }, this.keepalive = function(b) {
                a.keepalive = b === !0
            }, this.$get = ["$interval", "$log", "$rootScope", "$document", "Keepalive", function(b, e, f, g, h) {
                function i() {
                    a.keepalive && (o.running && h.ping(), h.start())
                }

                function j() {
                    a.keepalive && h.stop()
                }

                function k() {
                    o.idling = !o.idling;
                    var c = o.idling ? "Start" : "End";
                    f.$broadcast("Idle" + c), o.idling ? (j(), a.timeout && (o.countdown = a.timeout, l(), o.timeout = b(l, 1e3, a.timeout, !1))) : i(), b.cancel(o.idle)
                }

                function l() {
                    return o.countdown <= 0 ? void m() : (f.$broadcast("IdleWarn", o.countdown), void o.countdown--)
                }

                function m() {
                    j(), b.cancel(o.idle), b.cancel(o.timeout), o.idling = !0, o.running = !1, o.countdown = 0, f.$broadcast("IdleTimeout")
                }

                function n(a, b, c) {
                    var d = a.running();
                    a.unwatch(), b(c), d && a.watch()
                }
                var o = {
                        idle: null,
                        timeout: null,
                        idling: !1,
                        running: !1,
                        countdown: null
                    },
                    p = {
                        _options: function() {
                            return a
                        },
                        _getNow: function() {
                            return new Date
                        },
                        setIdle: function(a) {
                            n(this, d, a)
                        },
                        setTimeout: function(a) {
                            n(this, c, a)
                        },
                        isExpired: function() {
                            return o.expiry && o.expiry <= this._getNow()
                        },
                        running: function() {
                            return o.running
                        },
                        idling: function() {
                            return o.idling
                        },
                        watch: function() {
                            b.cancel(o.idle), b.cancel(o.timeout);
                            var c = a.timeout ? a.timeout : 0;
                            o.expiry = new Date((new Date).getTime() + 1e3 * (a.idle + c)), o.idling ? k() : o.running || i(), o.running = !0, o.idle = b(k, 1e3 * a.idle, 0, !1)
                        },
                        unwatch: function() {
                            b.cancel(o.idle), b.cancel(o.timeout), o.idling = !1, o.running = !1, o.expiry = null
                        },
                        interrupt: function() {
                            return o.running ? a.timeout && this.isExpired() ? void m() : void(a.autoResume && this.watch()) : void 0
                        }
                    };
                return g.find("body").on(a.interrupt, function() {
                    p.interrupt()
                }), p
            }]
        }), b.module("ngIdle.countdown", []).directive("idleCountdown", function() {
            return {
                restrict: "A",
                scope: {
                    value: "=idleCountdown"
                },
                link: function(a) {
                    a.$on("IdleWarn", function(b, c) {
                        a.$apply(function() {
                            a.value = c
                        })
                    }), a.$on("IdleTimeout", function() {
                        a.$apply(function() {
                            a.value = 0
                        })
                    })
                }
            }
        }), b.module("ngIdle.title", []).factory("Title", ["$document", "$interpolate", function(a, c) {
            function d(a, b, c) {
                return Array(b - String(a).length + 1).join(c || "0") + a
            }
            var e = {
                original: null,
                idle: "{{minutes}}:{{seconds}} until your session times out!",
                timedout: "Your session has expired."
            };
            return {
                original: function(a) {
                    return b.isUndefined(a) ? e.original : void(e.original = a)
                },
                store: function(a) {
                    (a || !e.original) && (e.original = this.value())
                },
                value: function(c) {
                    return b.isUndefined(c) ? a[0].title : void(a[0].title = c)
                },
                idleMessage: function(a) {
                    return b.isUndefined(a) ? e.idle : void(e.idle = a)
                },
                timedOutMessage: function(a) {
                    return b.isUndefined(a) ? e.timedout : void(e.timedout = a)
                },
                setAsIdle: function(a) {
                    this.store();
                    var b = {
                        totalSeconds: a
                    };
                    b.minutes = Math.floor(a / 60), b.seconds = d(a - 60 * b.minutes, 2), this.value(c(this.idleMessage())(b))
                },
                setAsTimedOut: function() {
                    this.store(), this.value(this.timedOutMessage())
                },
                restore: function() {
                    this.original() && this.value(this.original())
                }
            }
        }]).directive("title", ["Title", function(a) {
            return {
                link: function(b, c, d) {
                    d.idleDisabled || (a.store(!0), b.$on("IdleWarn", function(b, c) {
                        a.setAsIdle(c)
                    }), b.$on("IdleEnd", function() {
                        a.restore()
                    }), b.$on("IdleTimeout", function() {
                        a.setAsTimedOut()
                    }))
                }
            }
        }])
    }(window, window.angular),
    function() {
        "use strict";

        function a() {}

        function b(a, b) {
            for (var c = a.length; c--;)
                if (a[c].listener === b) return c;
            return -1
        }

        function c(a) {
            return function() {
                return this[a].apply(this, arguments)
            }
        }
        var d = a.prototype,
            e = this,
            f = e.EventEmitter;
        d.getListeners = function(a) {
            var b, c, d = this._getEvents();
            if (a instanceof RegExp) {
                b = {};
                for (c in d) d.hasOwnProperty(c) && a.test(c) && (b[c] = d[c])
            } else b = d[a] || (d[a] = []);
            return b
        }, d.flattenListeners = function(a) {
            var b, c = [];
            for (b = 0; b < a.length; b += 1) c.push(a[b].listener);
            return c
        }, d.getListenersAsObject = function(a) {
            var b, c = this.getListeners(a);
            return c instanceof Array && (b = {}, b[a] = c), b || c
        }, d.addListener = function(a, c) {
            var d, e = this.getListenersAsObject(a),
                f = "object" == typeof c;
            for (d in e) e.hasOwnProperty(d) && -1 === b(e[d], c) && e[d].push(f ? c : {
                listener: c,
                once: !1
            });
            return this
        }, d.on = c("addListener"), d.addOnceListener = function(a, b) {
            return this.addListener(a, {
                listener: b,
                once: !0
            })
        }, d.once = c("addOnceListener"), d.defineEvent = function(a) {
            return this.getListeners(a), this
        }, d.defineEvents = function(a) {
            for (var b = 0; b < a.length; b += 1) this.defineEvent(a[b]);
            return this
        }, d.removeListener = function(a, c) {
            var d, e, f = this.getListenersAsObject(a);
            for (e in f) f.hasOwnProperty(e) && (d = b(f[e], c), -1 !== d && f[e].splice(d, 1));
            return this
        }, d.off = c("removeListener"), d.addListeners = function(a, b) {
            return this.manipulateListeners(!1, a, b)
        }, d.removeListeners = function(a, b) {
            return this.manipulateListeners(!0, a, b)
        }, d.manipulateListeners = function(a, b, c) {
            var d, e, f = a ? this.removeListener : this.addListener,
                g = a ? this.removeListeners : this.addListeners;
            if ("object" != typeof b || b instanceof RegExp)
                for (d = c.length; d--;) f.call(this, b, c[d]);
            else
                for (d in b) b.hasOwnProperty(d) && (e = b[d]) && ("function" == typeof e ? f.call(this, d, e) : g.call(this, d, e));
            return this
        }, d.removeEvent = function(a) {
            var b, c = typeof a,
                d = this._getEvents();
            if ("string" === c) delete d[a];
            else if (a instanceof RegExp)
                for (b in d) d.hasOwnProperty(b) && a.test(b) && delete d[b];
            else delete this._events;
            return this
        }, d.removeAllListeners = c("removeEvent"), d.emitEvent = function(a, b) {
            var c, d, e, f, g = this.getListenersAsObject(a);
            for (e in g)
                if (g.hasOwnProperty(e))
                    for (d = g[e].length; d--;) c = g[e][d], c.once === !0 && this.removeListener(a, c.listener), f = c.listener.apply(this, b || []), f === this._getOnceReturnValue() && this.removeListener(a, c.listener);
            return this
        }, d.trigger = c("emitEvent"), d.emit = function(a) {
            var b = Array.prototype.slice.call(arguments, 1);
            return this.emitEvent(a, b)
        }, d.setOnceReturnValue = function(a) {
            return this._onceReturnValue = a, this
        }, d._getOnceReturnValue = function() {
            return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
        }, d._getEvents = function() {
            return this._events || (this._events = {})
        }, a.noConflict = function() {
            return e.EventEmitter = f, a
        }, "function" == typeof define && define.amd ? define(function() {
            return a
        }) : "object" == typeof module && module.exports ? module.exports = a : e.EventEmitter = a
    }.call(this);
var DDP = function(a) {
    function b(d) {
        if (c[d]) return c[d].exports;
        var e = c[d] = {
            exports: {},
            id: d,
            loaded: !1
        };
        return a[d].call(e.exports, e, e.exports, b), e.loaded = !0, e.exports
    }
    var c = {};
    return b.m = a, b.c = c, b.p = "", b(0)
}([function(a, b, c) {
    "use strict";
    var d = c(1),
        e = function(a) {
            this._endpoint = a.endpoint, this._SocketConstructor = a.SocketConstructor, this._init()
        };
    e.prototype = Object.create(d.prototype), e.prototype.constructor = e, e.prototype._init = function() {
        c(2).call(this), c(3).call(this), c(4).call(this), c(5).call(this), c(6).call(this)
    }, e.prototype.connect = function() {
        var a = c(7);
        this._socket.send({
            msg: "connect",
            version: a.DDP_VERSION,
            support: [a.DDP_VERSION]
        })
    }, e.prototype.method = function(a, b) {
        var d = c(8).uniqueId();
        return this._socket.send({
            msg: "method",
            id: d,
            method: a,
            params: b
        }), d
    }, e.prototype.ping = function() {
        var a = c(8).uniqueId();
        return this._socket.send({
            msg: "ping",
            id: a
        }), a
    }, e.prototype.pong = function(a) {
        return this._socket.send({
            msg: "pong",
            id: a
        }), a
    }, e.prototype.sub = function(a, b) {
        var d = c(8).uniqueId();
        return this._socket.send({
            msg: "sub",
            id: d,
            name: a,
            params: b
        }), d
    }, e.prototype.unsub = function(a) {
        return this._socket.send({
            msg: "unsub",
            id: a
        }), a
    }, a.exports = e
}, function(a) {
    a.exports = EventEmitter
}, function(a, b, c) {
    "use strict";
    a.exports = function() {
        var a = c(1);
        this._socket = new a, this._socket.send = function(a) {
            var b = JSON.stringify(a);
            this._rawSocket.send(b), this._socket.emit("message:out", JSON.parse(b))
        }.bind(this)
    }
}, function(a, b, c) {
    "use strict";
    a.exports = function() {
        this._socket.on("open", function() {
            this.connect()
        }.bind(this)), this._socket.on("close", function() {
            this.emit("disconnected"), setTimeout(c(6).bind(this), c(7).RECONNECT_INTERVAL)
        }.bind(this)), this._socket.on("message:in", function(a) {
            "connected" === a.msg && this.emit("connected")
        }.bind(this))
    }
}, function(a, b, c) {
    "use strict";
    a.exports = function() {
        this._socket.on("message:in", function(a) {
            var b = ["ready", "nosub", "added", "changed", "removed", "result", "updated"];
            c(8).contains(b, a.msg) && this.emit(a.msg, a)
        }.bind(this))
    }
}, function(a) {
    "use strict";
    a.exports = function() {
        this._socket.on("message:in", function(a) {
            "ping" === a.msg && this.pong(a.id)
        }.bind(this))
    }
}, function(a) {
    "use strict";
    a.exports = function() {
        this._rawSocket = new this._SocketConstructor(this._endpoint), this._rawSocket.onopen = this._socket.emit.bind(this._socket, "open"), this._rawSocket.onerror = this._socket.emit.bind(this._socket, "error"), this._rawSocket.onclose = this._socket.emit.bind(this._socket, "close"), this._rawSocket.onmessage = function(a) {
            var b;
            try {
                b = JSON.parse(a.data)
            } catch (c) {
                return
            }
            this._socket.emit("message:in", b)
        }.bind(this)
    }
}, function(a) {
    "use strict";
    a.exports = {
        DDP_VERSION: "1",
        DEFAULT_PING_INTERVAL: 1e4,
        RECONNECT_INTERVAL: 1e4
    }
}, function(a) {
    "use strict";
    var b = function() {
            var a = 0;
            return function() {
                return (a++).toString()
            }
        }(),
        c = function(a, b) {
            return -1 !== a.indexOf(b)
        };
    a.exports = {
        uniqueId: b,
        contains: c
    }
}]);
! function() {
    "use strict";

    function a(a, b, c, l) {
        function m(b, c, e) {
            e || !i(c) || j(c) || (e = c, c = void 0), this.protocols = c, this.url = b || "Missing URL", this.ssl = /(wss)/i.test(this.url), this.scope = e && e.scope || a, this.rootScopeFailover = e && e.rootScopeFailover && !0, this.useApplyAsync = e && e.useApplyAsync || !1, this._reconnectAttempts = e && e.reconnectAttempts || 0, this.initialTimeout = e && e.initialTimeout || 500, this.maxTimeout = e && e.maxTimeout || 3e5, this.sendQueue = [], this.onOpenCallbacks = [], this.onMessageCallbacks = [], this.onErrorCallbacks = [], this.onCloseCallbacks = [], d(this._readyStateConstants), b ? this._connect() : this._setInternalState(0)
        }
        return m.prototype._readyStateConstants = {
                CONNECTING: 0,
                OPEN: 1,
                CLOSING: 2,
                CLOSED: 3,
                RECONNECT_ABORTED: 4
            }, m.prototype._reconnectableStatusCodes = [4e3], m.prototype.safeDigest = function(a) {
                a && !this.scope.$$phase && this.scope.$digest()
            }, m.prototype.bindToScope = function(b) {
                var c = this;
                return b && (this.scope = b, this.rootScopeFailover && this.scope.$on("$destroy", function() {
                    c.scope = a
                })), c
            }, m.prototype._connect = function(a) {
                (a || !this.socket || this.socket.readyState !== this._readyStateConstants.OPEN) && (this.socket = l.create(this.url, this.protocols), this.socket.onmessage = this._onMessageHandler.bind(this), this.socket.onopen = this._onOpenHandler.bind(this), this.socket.onerror = this._onErrorHandler.bind(this), this.socket.onclose = this._onCloseHandler.bind(this))
            }, m.prototype.fireQueue = function() {
                for (; this.sendQueue.length && this.socket.readyState === this._readyStateConstants.OPEN;) {
                    var a = this.sendQueue.shift();
                    this.socket.send(f(a.message) ? a.message : JSON.stringify(a.message)), a.deferred.resolve()
                }
            }, m.prototype.notifyOpenCallbacks = function(a) {
                for (var b = 0; b < this.onOpenCallbacks.length; b++) this.onOpenCallbacks[b].call(this, a)
            }, m.prototype.notifyCloseCallbacks = function(a) {
                for (var b = 0; b < this.onCloseCallbacks.length; b++) this.onCloseCallbacks[b].call(this, a)
            }, m.prototype.notifyErrorCallbacks = function(a) {
                for (var b = 0; b < this.onErrorCallbacks.length; b++) this.onErrorCallbacks[b].call(this, a)
            }, m.prototype.onOpen = function(a) {
                return this.onOpenCallbacks.push(a), this
            }, m.prototype.onClose = function(a) {
                return this.onCloseCallbacks.push(a), this
            }, m.prototype.onError = function(a) {
                return this.onErrorCallbacks.push(a), this
            }, m.prototype.onMessage = function(a, b) {
                if (!g(a)) throw new Error("Callback must be a function");
                if (b && h(b.filter) && !f(b.filter) && !(b.filter instanceof RegExp)) throw new Error("Pattern must be a string or regular expression");
                return this.onMessageCallbacks.push({
                    fn: a,
                    pattern: b ? b.filter : void 0,
                    autoApply: b ? b.autoApply : !0
                }), this
            }, m.prototype._onOpenHandler = function(a) {
                this._reconnectAttempts = 0, this.notifyOpenCallbacks(a), this.fireQueue()
            }, m.prototype._onCloseHandler = function(a) {
                this.notifyCloseCallbacks(a), this._reconnectableStatusCodes.indexOf(a.code) > -1 && this.reconnect()
            }, m.prototype._onErrorHandler = function(a) {
                this.notifyErrorCallbacks(a)
            }, m.prototype._onMessageHandler = function(a) {
                function b(a, b, c) {
                    c = k.call(arguments, 2), e.useApplyAsync ? e.scope.$applyAsync(function() {
                        a.apply(e, c)
                    }) : (a.apply(e, c), e.safeDigest(b))
                }
                for (var c, d, e = this, g = 0; g < e.onMessageCallbacks.length; g++) d = e.onMessageCallbacks[g], c = d.pattern, c ? f(c) && a.data === c ? b(d.fn, d.autoApply, a) : c instanceof RegExp && c.exec(a.data) && b(d.fn, d.autoApply, a) : b(d.fn, d.autoApply, a)
            }, m.prototype.close = function(a) {
                return (a || !this.socket.bufferedAmount) && this.socket.close(), this
            }, m.prototype.send = function(a) {
                function c(a) {
                    a.cancel = d;
                    var b = a.then;
                    return a.then = function() {
                        var a = b.apply(this, arguments);
                        return c(a)
                    }, a
                }

                function d(b) {
                    return f.sendQueue.splice(f.sendQueue.indexOf(a), 1), e.reject(b), f
                }
                var e = b.defer(),
                    f = this,
                    g = c(e.promise);
                return f.readyState === f._readyStateConstants.RECONNECT_ABORTED ? e.reject("Socket connection has been closed") : (f.sendQueue.push({
                    message: a,
                    deferred: e
                }), f.fireQueue()), g
            }, m.prototype.reconnect = function() {
                return this.close(), c(this._connect.bind(this), this._getBackoffDelay(++this._reconnectAttempts)), this
            }, m.prototype._getBackoffDelay = function(a) {
                var b = Math.random() + 1,
                    c = this.initialTimeout,
                    d = 2,
                    e = a,
                    f = this.maxTimeout;
                return Math.floor(Math.min(b * c * Math.pow(d, e), f))
            }, m.prototype._setInternalState = function(a) {
                if (Math.floor(a) !== a || 0 > a || a > 4) throw new Error("state must be an integer between 0 and 4, got: " + a);
                e || (this.readyState = a || this.socket.readyState), this._internalConnectionState = a, angular.forEach(this.sendQueue, function(a) {
                    a.deferred.reject("Message cancelled due to closed socket connection")
                })
            }, e && e(m.prototype, "readyState", {
                get: function() {
                    return this._internalConnectionState || this.socket.readyState
                },
                set: function() {
                    throw new Error("The readyState property is read-only")
                }
            }),
            function(a, b) {
                return new m(a, b)
            }
    }

    function b(a, b) {
        this.create = function(b, c) {
            var d, e, f = /wss?:\/\//.exec(b);
            if (!f) throw new Error("Invalid url provided");
            if ("object" == typeof exports && require) try {
                e = require("ws"), d = e.Client || e.client || e
            } catch (g) {}
            return d = d || a.WebSocket || a.MozWebSocket, c ? new d(b, c) : new d(b)
        }, this.createWebSocketBackend = function(a, c) {
            return b.warn("Deprecated: Please use .create(url, protocols)"), this.create(a, c)
        }
    }
    var c = angular.noop,
        d = Object.freeze ? Object.freeze : c,
        e = Object.defineProperty,
        f = angular.isString,
        g = angular.isFunction,
        h = angular.isDefined,
        i = angular.isObject,
        j = angular.isArray,
        k = Array.prototype.slice;
    Array.prototype.indexOf || (Array.prototype.indexOf = function(a) {
        var b = this.length >>> 0,
            c = Number(arguments[1]) || 0;
        for (c = 0 > c ? Math.ceil(c) : Math.floor(c), 0 > c && (c += b); b > c; c++)
            if (c in this && this[c] === a) return c;
        return -1
    }), Function.prototype.bind || (Function.prototype.bind = function(a) {
        if ("function" != typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        var b = k.call(arguments, 1),
            c = this,
            d = function() {},
            e = function() {
                return c.apply(this instanceof d && a ? this : a, b.concat(k.call(arguments)))
            };
        return d.prototype = this.prototype, e.prototype = new d, e
    }), angular.module("ngWebSocket", []).factory("$websocket", ["$rootScope", "$q", "$timeout", "$websocketBackend", a]).factory("WebSocket", ["$rootScope", "$q", "$timeout", "WebsocketBackend", a]).service("$websocketBackend", ["$window", "$log", b]).service("WebSocketBackend", ["$window", "$log", b]), angular.module("angular-websocket", ["ngWebSocket"])
}(),
function() {
    var a;
    a = angular.module("ngPostMessage", ["ng"]), a.directive("html", ["$window", "$postMessage", function(a, b) {
        return {
            restrict: "E",
            controller: ["$scope", function(b) {
                return b.$on("$messageOutgoing", function(c, d, e) {
                    var f;
                    return null == e && (e = "*"), f = b.sender || a.parent, f.postMessage(d, e)
                })
            }],
            link: function(c) {
                return c.sendMessageToService = function(a) {
                    var d, e;
                    if (a = a.originalEvent || a, a && a.data) {
                        e = null, c.sender = a.source;
                        try {
                            e = angular.fromJson(a.data)
                        } catch (f) {
                            d = f, console.error("ahem", d), e = a.data
                        }
                        return c.$root.$broadcast("$messageIncoming", e), b.messages(e)
                    }
                }, angular.element(a).bind("message", c.sendMessageToService)
            }
        }
    }]), a.factory("$postMessage", ["$rootScope", function(a) {
        var b, c;
        return b = [], c = {
            messages: function(c) {
                return c && (b.push(c), a.$digest()), b
            },
            lastMessage: function() {
                return b[b.length - 1]
            },
            post: function(b, c) {
                return null == c && (c = "*"), a.$broadcast("$messageOutgoing", b, c)
            }
        }
    }])
}.call(this);