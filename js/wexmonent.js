function require(t) {
    var e = require.modules[t];
    if (!e) throw new Error('failed to require "' + t + '"');
    return "exports" in e || "function" != typeof e.definition || (e.client = e.component = !0, e.definition.call(this, e.exports = {}, e), delete e.definition), e.exports
}
require.loader = "component", require.helper = {}, require.helper.semVerSort = function(t, e) {
    for (var n = t.version.split("."), r = e.version.split("."), i = 0; i < n.length; ++i) {
        var o = parseInt(n[i], 10),
            a = parseInt(r[i], 10);
        if (o !== a) return o > a ? 1 : -1;
        var s = n[i].substr(("" + o).length),
            u = r[i].substr(("" + a).length);
        if ("" === s && "" !== u) return 1;
        if ("" !== s && "" === u) return -1;
        if ("" !== s && "" !== u) return s > u ? 1 : -1
    }
    return 0
}, require.latest = function(t, e) {
    function n(t) {
        throw new Error('failed to find latest module of "' + t + '"')
    }
    var r = /(.*)~(.*)@v?(\d+\.\d+\.\d+[^\/]*)$/,
        i = /(.*)~(.*)/;
    i.test(t) || n(t);
    for (var o = Object.keys(require.modules), a = [], s = [], u = 0; u < o.length; u++) {
        var c = o[u];
        if (new RegExp(t + "@").test(c)) {
            var l = c.substr(t.length + 1),
                f = r.exec(c);
            null != f ? a.push({
                version: l,
                name: c
            }) : s.push({
                version: l,
                name: c
            })
        }
    }
    if (0 === a.concat(s).length && n(t), a.length > 0) {
        var h = a.sort(require.helper.semVerSort).pop().name;
        return e === !0 ? h : require(h)
    }
    var h = s.sort(function(t, e) {
        return t.name > e.name
    })[0].name;
    return e === !0 ? h : require(h)
}, require.modules = {}, require.register = function(t, e) {
    require.modules[t] = {
        definition: e
    }
}, require.define = function(t, e) {
    require.modules[t] = {
        exports: e
    }
}, require.register("./lib/underscore", function(t, e) {
    (function() {
        var n = this,
            r = n._,
            i = Array.prototype,
            o = Object.prototype,
            a = Function.prototype,
            s = i.push,
            u = i.slice,
            c = i.concat,
            l = o.toString,
            f = o.hasOwnProperty,
            h = Array.isArray,
            p = Object.keys,
            d = a.bind,
            g = function(t) {
                return t instanceof g ? t : this instanceof g ? void(this._wrapped = t) : new g(t)
            };
        "undefined" != typeof t ? ("undefined" != typeof e && e.exports && (t = e.exports = g), t._ = g) : n._ = g, g.VERSION = "1.7.0";
        var m = function(t, e, n) {
            if (void 0 === e) return t;
            switch (null == n ? 3 : n) {
                case 1:
                    return function(n) {
                        return t.call(e, n)
                    };
                case 2:
                    return function(n, r) {
                        return t.call(e, n, r)
                    };
                case 3:
                    return function(n, r, i) {
                        return t.call(e, n, r, i)
                    };
                case 4:
                    return function(n, r, i, o) {
                        return t.call(e, n, r, i, o)
                    }
            }
            return function() {
                return t.apply(e, arguments)
            }
        };
        g.iteratee = function(t, e, n) {
            return null == t ? g.identity : g.isFunction(t) ? m(t, e, n) : g.isObject(t) ? g.matches(t) : g.property(t)
        }, g.each = g.forEach = function(t, e, n) {
            if (null == t) return t;
            e = m(e, n);
            var r, i = t.length;
            if (i === +i) for (r = 0; i > r; r++) e(t[r], r, t);
            else {
                var o = g.keys(t);
                for (r = 0, i = o.length; i > r; r++) e(t[o[r]], o[r], t)
            }
            return t
        }, g.map = g.collect = function(t, e, n) {
            if (null == t) return [];
            e = g.iteratee(e, n);
            for (var r, i = t.length !== +t.length && g.keys(t), o = (i || t).length, a = Array(o), s = 0; o > s; s++) r = i ? i[s] : s, a[s] = e(t[r], r, t);
            return a
        };
        var v = "Reduce of empty array with no initial value";
        g.reduce = g.foldl = g.inject = function(t, e, n, r) {
            null == t && (t = []), e = m(e, r, 4);
            var i, o = t.length !== +t.length && g.keys(t),
                a = (o || t).length,
                s = 0;
            if (arguments.length < 3) {
                if (!a) throw new TypeError(v);
                n = t[o ? o[s++] : s++]
            }
            for (; a > s; s++) i = o ? o[s] : s, n = e(n, t[i], i, t);
            return n
        }, g.reduceRight = g.foldr = function(t, e, n, r) {
            null == t && (t = []), e = m(e, r, 4);
            var i, o = t.length !== +t.length && g.keys(t),
                a = (o || t).length;
            if (arguments.length < 3) {
                if (!a) throw new TypeError(v);
                n = t[o ? o[--a] : --a]
            }
            for (; a--;) i = o ? o[a] : a, n = e(n, t[i], i, t);
            return n
        }, g.find = g.detect = function(t, e, n) {
            var r;
            return e = g.iteratee(e, n), g.some(t, function(t, n, i) {
                return e(t, n, i) ? (r = t, !0) : void 0
            }), r
        }, g.filter = g.select = function(t, e, n) {
            var r = [];
            return null == t ? r : (e = g.iteratee(e, n), g.each(t, function(t, n, i) {
                e(t, n, i) && r.push(t)
            }), r)
        }, g.reject = function(t, e, n) {
            return g.filter(t, g.negate(g.iteratee(e)), n)
        }, g.every = g.all = function(t, e, n) {
            if (null == t) return !0;
            e = g.iteratee(e, n);
            var r, i, o = t.length !== +t.length && g.keys(t),
                a = (o || t).length;
            for (r = 0; a > r; r++) if (i = o ? o[r] : r, !e(t[i], i, t)) return !1;
            return !0
        }, g.some = g.any = function(t, e, n) {
            if (null == t) return !1;
            e = g.iteratee(e, n);
            var r, i, o = t.length !== +t.length && g.keys(t),
                a = (o || t).length;
            for (r = 0; a > r; r++) if (i = o ? o[r] : r, e(t[i], i, t)) return !0;
            return !1
        }, g.contains = g.include = function(t, e) {
            return null == t ? !1 : (t.length !== +t.length && (t = g.values(t)), g.indexOf(t, e) >= 0)
        }, g.invoke = function(t, e) {
            var n = u.call(arguments, 2),
                r = g.isFunction(e);
            return g.map(t, function(t) {
                return (r ? e : t[e]).apply(t, n)
            })
        }, g.pluck = function(t, e) {
            return g.map(t, g.property(e))
        }, g.where = function(t, e) {
            return g.filter(t, g.matches(e))
        }, g.findWhere = function(t, e) {
            return g.find(t, g.matches(e))
        }, g.max = function(t, e, n) {
            var r, i, o = -(1 / 0),
                a = -(1 / 0);
            if (null == e && null != t) {
                t = t.length === +t.length ? t : g.values(t);
                for (var s = 0, u = t.length; u > s; s++) r = t[s], r > o && (o = r)
            } else e = g.iteratee(e, n), g.each(t, function(t, n, r) {
                i = e(t, n, r), (i > a || i === -(1 / 0) && o === -(1 / 0)) && (o = t, a = i)
            });
            return o
        }, g.min = function(t, e, n) {
            var r, i, o = 1 / 0,
                a = 1 / 0;
            if (null == e && null != t) {
                t = t.length === +t.length ? t : g.values(t);
                for (var s = 0, u = t.length; u > s; s++) r = t[s], o > r && (o = r)
            } else e = g.iteratee(e, n), g.each(t, function(t, n, r) {
                i = e(t, n, r), (a > i || i === 1 / 0 && o === 1 / 0) && (o = t, a = i)
            });
            return o
        }, g.shuffle = function(t) {
            for (var e, n = t && t.length === +t.length ? t : g.values(t), r = n.length, i = Array(r), o = 0; r > o; o++) e = g.random(0, o), e !== o && (i[o] = i[e]), i[e] = n[o];
            return i
        }, g.sample = function(t, e, n) {
            return null == e || n ? (t.length !== +t.length && (t = g.values(t)), t[g.random(t.length - 1)]) : g.shuffle(t).slice(0, Math.max(0, e))
        }, g.sortBy = function(t, e, n) {
            return e = g.iteratee(e, n), g.pluck(g.map(t, function(t, n, r) {
                return {
                    value: t,
                    index: n,
                    criteria: e(t, n, r)
                }
            }).sort(function(t, e) {
                var n = t.criteria,
                    r = e.criteria;
                if (n !== r) {
                    if (n > r || void 0 === n) return 1;
                    if (r > n || void 0 === r) return -1
                }
                return t.index - e.index
            }), "value")
        };
        var y = function(t) {
            return function(e, n, r) {
                var i = {};
                return n = g.iteratee(n, r), g.each(e, function(r, o) {
                    var a = n(r, o, e);
                    t(i, r, a)
                }), i
            }
        };
        g.groupBy = y(function(t, e, n) {
            g.has(t, n) ? t[n].push(e) : t[n] = [e]
        }), g.indexBy = y(function(t, e, n) {
            t[n] = e
        }), g.countBy = y(function(t, e, n) {
            g.has(t, n) ? t[n]++ : t[n] = 1
        }), g.sortedIndex = function(t, e, n, r) {
            n = g.iteratee(n, r, 1);
            for (var i = n(e), o = 0, a = t.length; a > o;) {
                var s = o + a >>> 1;
                n(t[s]) < i ? o = s + 1 : a = s
            }
            return o
        }, g.toArray = function(t) {
            return t ? g.isArray(t) ? u.call(t) : t.length === +t.length ? g.map(t, g.identity) : g.values(t) : []
        }, g.size = function(t) {
            return null == t ? 0 : t.length === +t.length ? t.length : g.keys(t).length
        }, g.partition = function(t, e, n) {
            e = g.iteratee(e, n);
            var r = [],
                i = [];
            return g.each(t, function(t, n, o) {
                (e(t, n, o) ? r : i).push(t)
            }), [r, i]
        }, g.first = g.head = g.take = function(t, e, n) {
            return null == t ? void 0 : null == e || n ? t[0] : 0 > e ? [] : u.call(t, 0, e)
        }, g.initial = function(t, e, n) {
            return u.call(t, 0, Math.max(0, t.length - (null == e || n ? 1 : e)))
        }, g.last = function(t, e, n) {
            return null == t ? void 0 : null == e || n ? t[t.length - 1] : u.call(t, Math.max(t.length - e, 0))
        }, g.rest = g.tail = g.drop = function(t, e, n) {
            return u.call(t, null == e || n ? 1 : e)
        }, g.compact = function(t) {
            return g.filter(t, g.identity)
        };
        var w = function(t, e, n, r) {
            if (e && g.every(t, g.isArray)) return c.apply(r, t);
            for (var i = 0, o = t.length; o > i; i++) {
                var a = t[i];
                g.isArray(a) || g.isArguments(a) ? e ? s.apply(r, a) : w(a, e, n, r) : n || r.push(a)
            }
            return r
        };
        g.flatten = function(t, e) {
            return w(t, e, !1, [])
        }, g.without = function(t) {
            return g.difference(t, u.call(arguments, 1))
        }, g.uniq = g.unique = function(t, e, n, r) {
            if (null == t) return [];
            g.isBoolean(e) || (r = n, n = e, e = !1), null != n && (n = g.iteratee(n, r));
            for (var i = [], o = [], a = 0, s = t.length; s > a; a++) {
                var u = t[a];
                if (e) a && o === u || i.push(u), o = u;
                else if (n) {
                    var c = n(u, a, t);
                    g.indexOf(o, c) < 0 && (o.push(c), i.push(u))
                } else g.indexOf(i, u) < 0 && i.push(u)
            }
            return i
        }, g.union = function() {
            return g.uniq(w(arguments, !0, !0, []))
        }, g.intersection = function(t) {
            if (null == t) return [];
            for (var e = [], n = arguments.length, r = 0, i = t.length; i > r; r++) {
                var o = t[r];
                if (!g.contains(e, o)) {
                    for (var a = 1; n > a && g.contains(arguments[a], o); a++);
                    a === n && e.push(o)
                }
            }
            return e
        }, g.difference = function(t) {
            var e = w(u.call(arguments, 1), !0, !0, []);
            return g.filter(t, function(t) {
                return !g.contains(e, t)
            })
        }, g.zip = function(t) {
            if (null == t) return [];
            for (var e = g.max(arguments, "length").length, n = Array(e), r = 0; e > r; r++) n[r] = g.pluck(arguments, r);
            return n
        }, g.object = function(t, e) {
            if (null == t) return {};
            for (var n = {}, r = 0, i = t.length; i > r; r++) e ? n[t[r]] = e[r] : n[t[r][0]] = t[r][1];
            return n
        }, g.indexOf = function(t, e, n) {
            if (null == t) return -1;
            var r = 0,
                i = t.length;
            if (n) {
                if ("number" != typeof n) return r = g.sortedIndex(t, e), t[r] === e ? r : -1;
                r = 0 > n ? Math.max(0, i + n) : n
            }
            for (; i > r; r++) if (t[r] === e) return r;
            return -1
        }, g.lastIndexOf = function(t, e, n) {
            if (null == t) return -1;
            var r = t.length;
            for ("number" == typeof n && (r = 0 > n ? r + n + 1 : Math.min(r, n + 1)); --r >= 0;) if (t[r] === e) return r;
            return -1
        }, g.range = function(t, e, n) {
            arguments.length <= 1 && (e = t || 0, t = 0), n = n || 1;
            for (var r = Math.max(Math.ceil((e - t) / n), 0), i = Array(r), o = 0; r > o; o++, t += n) i[o] = t;
            return i
        };
        var b = function() {};
        g.bind = function(t, e) {
            var n, r;
            if (d && t.bind === d) return d.apply(t, u.call(arguments, 1));
            if (!g.isFunction(t)) throw new TypeError("Bind must be called on a function");
            return n = u.call(arguments, 2), r = function() {
                if (!(this instanceof r)) return t.apply(e, n.concat(u.call(arguments)));
                b.prototype = t.prototype;
                var i = new b;
                b.prototype = null;
                var o = t.apply(i, n.concat(u.call(arguments)));
                return g.isObject(o) ? o : i
            }
        }, g.partial = function(t) {
            var e = u.call(arguments, 1);
            return function() {
                for (var n = 0, r = e.slice(), i = 0, o = r.length; o > i; i++) r[i] === g && (r[i] = arguments[n++]);
                for (; n < arguments.length;) r.push(arguments[n++]);
                return t.apply(this, r)
            }
        }, g.bindAll = function(t) {
            var e, n, r = arguments.length;
            if (1 >= r) throw new Error("bindAll must be passed function names");
            for (e = 1; r > e; e++) n = arguments[e], t[n] = g.bind(t[n], t);
            return t
        }, g.memoize = function(t, e) {
            var n = function(r) {
                var i = n.cache,
                    o = e ? e.apply(this, arguments) : r;
                return g.has(i, o) || (i[o] = t.apply(this, arguments)), i[o]
            };
            return n.cache = {}, n
        }, g.delay = function(t, e) {
            var n = u.call(arguments, 2);
            return setTimeout(function() {
                return t.apply(null, n)
            }, e)
        }, g.defer = function(t) {
            return g.delay.apply(g, [t, 1].concat(u.call(arguments, 1)))
        }, g.throttle = function(t, e, n) {
            var r, i, o, a = null,
                s = 0;
            n || (n = {});
            var u = function() {
                s = n.leading === !1 ? 0 : g.now(), a = null, o = t.apply(r, i), a || (r = i = null)
            };
            return function() {
                var c = g.now();
                s || n.leading !== !1 || (s = c);
                var l = e - (c - s);
                return r = this, i = arguments, 0 >= l || l > e ? (clearTimeout(a), a = null, s = c, o = t.apply(r, i), a || (r = i = null)) : a || n.trailing === !1 || (a = setTimeout(u, l)), o
            }
        }, g.debounce = function(t, e, n) {
            var r, i, o, a, s, u = function() {
                var c = g.now() - a;
                e > c && c > 0 ? r = setTimeout(u, e - c) : (r = null, n || (s = t.apply(o, i), r || (o = i = null)))
            };
            return function() {
                o = this, i = arguments, a = g.now();
                var c = n && !r;
                return r || (r = setTimeout(u, e)), c && (s = t.apply(o, i), o = i = null), s
            }
        }, g.wrap = function(t, e) {
            return g.partial(e, t)
        }, g.negate = function(t) {
            return function() {
                return !t.apply(this, arguments)
            }
        }, g.compose = function() {
            var t = arguments,
                e = t.length - 1;
            return function() {
                for (var n = e, r = t[e].apply(this, arguments); n--;) r = t[n].call(this, r);
                return r
            }
        }, g.after = function(t, e) {
            return function() {
                return --t < 1 ? e.apply(this, arguments) : void 0
            }
        }, g.before = function(t, e) {
            var n;
            return function() {
                return --t > 0 ? n = e.apply(this, arguments) : e = null, n
            }
        }, g.once = g.partial(g.before, 2), g.keys = function(t) {
            if (!g.isObject(t)) return [];
            if (p) return p(t);
            var e = [];
            for (var n in t) g.has(t, n) && e.push(n);
            return e
        }, g.values = function(t) {
            for (var e = g.keys(t), n = e.length, r = Array(n), i = 0; n > i; i++) r[i] = t[e[i]];
            return r
        }, g.pairs = function(t) {
            for (var e = g.keys(t), n = e.length, r = Array(n), i = 0; n > i; i++) r[i] = [e[i], t[e[i]]];
            return r
        }, g.invert = function(t) {
            for (var e = {}, n = g.keys(t), r = 0, i = n.length; i > r; r++) e[t[n[r]]] = n[r];
            return e
        }, g.functions = g.methods = function(t) {
            var e = [];
            for (var n in t) g.isFunction(t[n]) && e.push(n);
            return e.sort()
        }, g.extend = function(t) {
            if (!g.isObject(t)) return t;
            for (var e, n, r = 1, i = arguments.length; i > r; r++) {
                e = arguments[r];
                for (n in e) f.call(e, n) && (t[n] = e[n])
            }
            return t
        }, g.pick = function(t, e, n) {
            var r, i = {};
            if (null == t) return i;
            if (g.isFunction(e)) {
                e = m(e, n);
                for (r in t) {
                    var o = t[r];
                    e(o, r, t) && (i[r] = o)
                }
            } else {
                var a = c.apply([], u.call(arguments, 1));
                t = new Object(t);
                for (var s = 0, l = a.length; l > s; s++) r = a[s], r in t && (i[r] = t[r])
            }
            return i
        }, g.omit = function(t, e, n) {
            if (g.isFunction(e)) e = g.negate(e);
            else {
                var r = g.map(c.apply([], u.call(arguments, 1)), String);
                e = function(t, e) {
                    return !g.contains(r, e)
                }
            }
            return g.pick(t, e, n)
        }, g.defaults = function(t) {
            if (!g.isObject(t)) return t;
            for (var e = 1, n = arguments.length; n > e; e++) {
                var r = arguments[e];
                for (var i in r) void 0 === t[i] && (t[i] = r[i])
            }
            return t
        }, g.clone = function(t) {
            return g.isObject(t) ? g.isArray(t) ? t.slice() : g.extend({}, t) : t
        }, g.tap = function(t, e) {
            return e(t), t
        };
        var x = function(t, e, n, r) {
            if (t === e) return 0 !== t || 1 / t === 1 / e;
            if (null == t || null == e) return t === e;
            t instanceof g && (t = t._wrapped), e instanceof g && (e = e._wrapped);
            var i = l.call(t);
            if (i !== l.call(e)) return !1;
            switch (i) {
                case "[object RegExp]":
                case "[object String]":
                    return "" + t == "" + e;
                case "[object Number]":
                    return +t !== +t ? +e !== +e : 0 === +t ? 1 / +t === 1 / e : +t === +e;
                case "[object Date]":
                case "[object Boolean]":
                    return +t === +e
            }
            if ("object" != typeof t || "object" != typeof e) return !1;
            for (var o = n.length; o--;) if (n[o] === t) return r[o] === e;
            var a = t.constructor,
                s = e.constructor;
            if (a !== s && "constructor" in t && "constructor" in e && !(g.isFunction(a) && a instanceof a && g.isFunction(s) && s instanceof s)) return !1;
            n.push(t), r.push(e);
            var u, c;
            if ("[object Array]" === i) {
                if (u = t.length, c = u === e.length) for (; u-- && (c = x(t[u], e[u], n, r)););
            } else {
                var f, h = g.keys(t);
                if (u = h.length, c = g.keys(e).length === u) for (; u-- && (f = h[u], c = g.has(e, f) && x(t[f], e[f], n, r)););
            }
            return n.pop(), r.pop(), c
        };
        g.isEqual = function(t, e) {
            return x(t, e, [], [])
        }, g.isEmpty = function(t) {
            if (null == t) return !0;
            if (g.isArray(t) || g.isString(t) || g.isArguments(t)) return 0 === t.length;
            for (var e in t) if (g.has(t, e)) return !1;
            return !0
        }, g.isElement = function(t) {
            return !(!t || 1 !== t.nodeType)
        }, g.isArray = h ||
        function(t) {
            return "[object Array]" === l.call(t)
        }, g.isObject = function(t) {
            var e = typeof t;
            return "function" === e || "object" === e && !! t
        }, g.each(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(t) {
            g["is" + t] = function(e) {
                return l.call(e) === "[object " + t + "]"
            }
        }), g.isArguments(arguments) || (g.isArguments = function(t) {
            return g.has(t, "callee")
        }), "function" != typeof / . / && (g.isFunction = function(t) {
            return "function" == typeof t || !1
        }), g.isFinite = function(t) {
            return isFinite(t) && !isNaN(parseFloat(t))
        }, g.isNaN = function(t) {
            return g.isNumber(t) && t !== +t
        }, g.isBoolean = function(t) {
            return t === !0 || t === !1 || "[object Boolean]" === l.call(t)
        }, g.isNull = function(t) {
            return null === t
        }, g.isUndefined = function(t) {
            return void 0 === t
        }, g.has = function(t, e) {
            return null != t && f.call(t, e)
        }, g.noConflict = function() {
            return n._ = r, this
        }, g.identity = function(t) {
            return t
        }, g.constant = function(t) {
            return function() {
                return t
            }
        }, g.noop = function() {}, g.property = function(t) {
            return function(e) {
                return e[t]
            }
        }, g.matches = function(t) {
            var e = g.pairs(t),
                n = e.length;
            return function(t) {
                if (null == t) return !n;
                t = new Object(t);
                for (var r = 0; n > r; r++) {
                    var i = e[r],
                        o = i[0];
                    if (i[1] !== t[o] || !(o in t)) return !1
                }
                return !0
            }
        }, g.times = function(t, e, n) {
            var r = Array(Math.max(0, t));
            e = m(e, n, 1);
            for (var i = 0; t > i; i++) r[i] = e(i);
            return r
        }, g.random = function(t, e) {
            return null == e && (e = t, t = 0), t + Math.floor(Math.random() * (e - t + 1))
        }, g.now = Date.now ||
        function() {
            return (new Date).getTime()
        };
        var E = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "`": "&#x60;"
            },
            T = g.invert(E),
            A = function(t) {
                var e = function(e) {
                        return t[e]
                    },
                    n = "(?:" + g.keys(t).join("|") + ")",
                    r = RegExp(n),
                    i = RegExp(n, "g");
                return function(t) {
                    return t = null == t ? "" : "" + t, r.test(t) ? t.replace(i, e) : t
                }
            };
        g.escape = A(E), g.unescape = A(T), g.result = function(t, e) {
            if (null == t) return void 0;
            var n = t[e];
            return g.isFunction(n) ? t[e]() : n
        };
        var j = 0;
        g.uniqueId = function(t) {
            var e = ++j + "";
            return t ? t + e : e
        }, g.templateSettings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
        };
        var S = /(.)^/,
            k = {
                "'": "'",
                "\\": "\\",
                "\r": "r",
                "\n": "n",
                " ": "u2028",
                " ": "u2029"
            },
            C = /\\|'|\r|\n| | /g,
            _ = function(t) {
                return "\\" + k[t]
            };
        g.template = function(t, e, n) {
            !e && n && (e = n), e = g.defaults({}, e, g.templateSettings);
            var r = RegExp([(e.escape || S).source, (e.interpolate || S).source, (e.evaluate || S).source].join("|") + "|$", "g"),
                i = 0,
                o = "__p+='";
            t.replace(r, function(e, n, r, a, s) {
                return o += t.slice(i, s).replace(C, _), i = s + e.length, n ? o += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'" : r ? o += "'+\n((__t=(" + r + "))==null?'':__t)+\n'" : a && (o += "';\n" + a + "\n__p+='"), e
            }), o += "';\n", e.variable || (o = "with(obj||{}){\n" + o + "}\n"), o = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + o + "return __p;\n";
            try {
                var a = new Function(e.variable || "obj", "_", o)
            } catch (s) {
                throw s.source = o, s
            }
            var u = function(t) {
                    return a.call(this, t, g)
                },
                c = e.variable || "obj";
            return u.source = "function(" + c + "){\n" + o + "}", u
        }, g.chain = function(t) {
            var e = g(t);
            return e._chain = !0, e
        };
        var N = function(t) {
            return this._chain ? g(t).chain() : t
        };
        g.mixin = function(t) {
            g.each(g.functions(t), function(e) {
                var n = g[e] = t[e];
                g.prototype[e] = function() {
                    var t = [this._wrapped];
                    return s.apply(t, arguments), N.call(this, n.apply(g, t))
                }
            })
        }, g.mixin(g), g.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(t) {
            var e = i[t];
            g.prototype[t] = function() {
                var n = this._wrapped;
                return e.apply(n, arguments), "shift" !== t && "splice" !== t || 0 !== n.length || delete n[0], N.call(this, n)
            }
        }), g.each(["concat", "join", "slice"], function(t) {
            var e = i[t];
            g.prototype[t] = function() {
                return N.call(this, e.apply(this._wrapped, arguments))
            }
        }), g.prototype.value = function() {
            return this._wrapped
        }, "function" == typeof define && define.amd && define("underscore", [], function() {
            return g
        })
    }).call(this)
}), require.register("./lib/zepto", function(t, e) {
    var n = require("./lib/zepto/touch.js"),
        r = function() {
            function t(t) {
                return null == t ? String(t) : W[X.call(t)] || "object"
            }
            function e(e) {
                return "function" == t(e)
            }
            function n(t) {
                return null != t && t == t.window
            }
            function r(t) {
                return null != t && t.nodeType == t.DOCUMENT_NODE
            }
            function i(e) {
                return "object" == t(e)
            }
            function o(t) {
                return i(t) && !n(t) && Object.getPrototypeOf(t) == Object.prototype
            }
            function a(t) {
                return "number" == typeof t.length
            }
            function s(t) {
                return _.call(t, function(t) {
                    return null != t
                })
            }
            function u(t) {
                return t.length > 0 ? T.fn.concat.apply([], t) : t
            }
            function c(t) {
                return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
            }
            function l(t) {
                return t in M ? M[t] : M[t] = new RegExp("(^|\\s)" + t + "(\\s|$)")
            }
            function f(t, e) {
                return "number" != typeof e || q[c(t)] ? e : e + "px"
            }
            function h(t) {
                var e, n;
                return O[t] || (e = N.createElement(t), N.body.appendChild(e), n = getComputedStyle(e, "").getPropertyValue("display"), e.parentNode.removeChild(e), "none" == n && (n = "block"), O[t] = n), O[t]
            }
            function p(t) {
                return "children" in t ? C.call(t.children) : T.map(t.childNodes, function(t) {
                    return 1 == t.nodeType ? t : void 0
                })
            }
            function d(t, e, n) {
                for (E in e) n && (o(e[E]) || $(e[E])) ? (o(e[E]) && !o(t[E]) && (t[E] = {}), $(e[E]) && !$(t[E]) && (t[E] = []), d(t[E], e[E], n)) : e[E] !== x && (t[E] = e[E])
            }
            function g(t, e) {
                return null == e ? T(t) : T(t).filter(e)
            }
            function m(t, n, r, i) {
                return e(n) ? n.call(t, r, i) : n
            }
            function v(t, e, n) {
                null == n ? t.removeAttribute(e) : t.setAttribute(e, n)
            }
            function y(t, e) {
                var n = t.className || "",
                    r = n && n.baseVal !== x;
                return e === x ? r ? n.baseVal : n : void(r ? n.baseVal = e : t.className = e)
            }
            function w(t) {
                try {
                    return t ? "true" == t || ("false" == t ? !1 : "null" == t ? null : +t + "" == t ? +t : /^[\[\{]/.test(t) ? T.parseJSON(t) : t) : t
                } catch (e) {
                    return t
                }
            }
            function b(t, e) {
                e(t);
                for (var n = 0, r = t.childNodes.length; r > n; n++) b(t.childNodes[n], e)
            }
            var x, E, T, A, j, S, k = [],
                C = k.slice,
                _ = k.filter,
                N = window.document,
                O = {},
                M = {},
                q = {
                    "column-count": 1,
                    columns: 1,
                    "font-weight": 1,
                    "line-height": 1,
                    opacity: 1,
                    "z-index": 1,
                    zoom: 1
                },
                L = /^\s*<(\w+|!)[^>]*>/,
                D = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
                P = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
                R = /^(?:body|html)$/i,
                I = /([A-Z])/g,
                B = ["val", "css", "html", "text", "data", "width", "height", "offset"],
                F = ["after", "prepend", "before", "append"],
                H = N.createElement("table"),
                U = N.createElement("tr"),
                z = {
                    tr: N.createElement("tbody"),
                    tbody: H,
                    thead: H,
                    tfoot: H,
                    td: U,
                    th: U,
                    "*": N.createElement("div")
                },
                G = /complete|loaded|interactive/,
                J = /^[\w-]*$/,
                W = {},
                X = W.toString,
                Y = {},
                V = N.createElement("div"),
                Z = {
                    tabindex: "tabIndex",
                    readonly: "readOnly",
                    "for": "htmlFor",
                    "class": "className",
                    maxlength: "maxLength",
                    cellspacing: "cellSpacing",
                    cellpadding: "cellPadding",
                    rowspan: "rowSpan",
                    colspan: "colSpan",
                    usemap: "useMap",
                    frameborder: "frameBorder",
                    contenteditable: "contentEditable"
                },
                $ = Array.isArray ||
                    function(t) {
                        return t instanceof Array
                    };
            return Y.matches = function(t, e) {
                if (!e || !t || 1 !== t.nodeType) return !1;
                var n = t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;
                if (n) return n.call(t, e);
                var r, i = t.parentNode,
                    o = !i;
                return o && (i = V).appendChild(t), r = ~Y.qsa(i, e).indexOf(t), o && V.removeChild(t), r
            }, j = function(t) {
                return t.replace(/-+(.)?/g, function(t, e) {
                    return e ? e.toUpperCase() : ""
                })
            }, S = function(t) {
                return _.call(t, function(e, n) {
                    return t.indexOf(e) == n
                })
            }, Y.fragment = function(t, e, n) {
                var r, i, a;
                return D.test(t) && (r = T(N.createElement(RegExp.$1))), r || (t.replace && (t = t.replace(P, "<$1></$2>")), e === x && (e = L.test(t) && RegExp.$1), e in z || (e = "*"), a = z[e], a.innerHTML = "" + t, r = T.each(C.call(a.childNodes), function() {
                    a.removeChild(this)
                })), o(n) && (i = T(r), T.each(n, function(t, e) {
                    B.indexOf(t) > -1 ? i[t](e) : i.attr(t, e)
                })), r
            }, Y.Z = function(t, e) {
                return t = t || [], t.__proto__ = T.fn, t.selector = e || "", t
            }, Y.isZ = function(t) {
                return t instanceof Y.Z
            }, Y.init = function(t, n) {
                var r;
                if (!t) return Y.Z();
                if ("string" == typeof t) if (t = t.trim(), "<" == t[0] && L.test(t)) r = Y.fragment(t, RegExp.$1, n), t = null;
                else {
                    if (n !== x) return T(n).find(t);
                    r = Y.qsa(N, t)
                } else {
                    if (e(t)) return T(N).ready(t);
                    if (Y.isZ(t)) return t;
                    if ($(t)) r = s(t);
                    else if (i(t)) r = [t], t = null;
                    else if (L.test(t)) r = Y.fragment(t.trim(), RegExp.$1, n), t = null;
                    else {
                        if (n !== x) return T(n).find(t);
                        r = Y.qsa(N, t)
                    }
                }
                return Y.Z(r, t)
            }, T = function(t, e) {
                return Y.init(t, e)
            }, T.extend = function(t) {
                var e, n = C.call(arguments, 1);
                return "boolean" == typeof t && (e = t, t = n.shift()), n.forEach(function(n) {
                    d(t, n, e)
                }), t
            }, Y.qsa = function(t, e) {
                var n, i = "#" == e[0],
                    o = !i && "." == e[0],
                    a = i || o ? e.slice(1) : e,
                    s = J.test(a);
                return r(t) && s && i ? (n = t.getElementById(a)) ? [n] : [] : 1 !== t.nodeType && 9 !== t.nodeType ? [] : C.call(s && !i ? o ? t.getElementsByClassName(a) : t.getElementsByTagName(e) : t.querySelectorAll(e))
            }, T.contains = N.documentElement.contains ?
                function(t, e) {
                    return t !== e && t.contains(e)
                } : function(t, e) {
                for (; e && (e = e.parentNode);) if (e === t) return !0;
                return !1
            }, T.type = t, T.isFunction = e, T.isWindow = n, T.isArray = $, T.isPlainObject = o, T.isEmptyObject = function(t) {
                var e;
                for (e in t) return !1;
                return !0
            }, T.inArray = function(t, e, n) {
                return k.indexOf.call(e, t, n)
            }, T.camelCase = j, T.trim = function(t) {
                return null == t ? "" : String.prototype.trim.call(t)
            }, T.uuid = 0, T.support = {}, T.expr = {}, T.map = function(t, e) {
                var n, r, i, o = [];
                if (a(t)) for (r = 0; r < t.length; r++) n = e(t[r], r), null != n && o.push(n);
                else for (i in t) n = e(t[i], i), null != n && o.push(n);
                return u(o)
            }, T.each = function(t, e) {
                var n, r;
                if (a(t)) {
                    for (n = 0; n < t.length; n++) if (e.call(t[n], n, t[n]) === !1) return t
                } else for (r in t) if (e.call(t[r], r, t[r]) === !1) return t;
                return t
            }, T.grep = function(t, e) {
                return _.call(t, e)
            }, window.JSON && (T.parseJSON = JSON.parse), T.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, e) {
                W["[object " + e + "]"] = e.toLowerCase()
            }), T.fn = {
                forEach: k.forEach,
                reduce: k.reduce,
                push: k.push,
                sort: k.sort,
                indexOf: k.indexOf,
                concat: k.concat,
                map: function(t) {
                    return T(T.map(this, function(e, n) {
                        return t.call(e, n, e)
                    }))
                },
                slice: function() {
                    return T(C.apply(this, arguments))
                },
                ready: function(t) {
                    return G.test(N.readyState) && N.body ? t(T) : N.addEventListener("DOMContentLoaded", function() {
                        t(T)
                    }, !1), this
                },
                get: function(t) {
                    return t === x ? C.call(this) : this[t >= 0 ? t : t + this.length]
                },
                toArray: function() {
                    return this.get()
                },
                size: function() {
                    return this.length
                },
                remove: function() {
                    return this.each(function() {
                        null != this.parentNode && this.parentNode.removeChild(this)
                    })
                },
                each: function(t) {
                    return k.every.call(this, function(e, n) {
                        return t.call(e, n, e) !== !1
                    }), this
                },
                filter: function(t) {
                    return e(t) ? this.not(this.not(t)) : T(_.call(this, function(e) {
                        return Y.matches(e, t)
                    }))
                },
                add: function(t, e) {
                    return T(S(this.concat(T(t, e))))
                },
                is: function(t) {
                    return this.length > 0 && Y.matches(this[0], t)
                },
                not: function(t) {
                    var n = [];
                    if (e(t) && t.call !== x) this.each(function(e) {
                        t.call(this, e) || n.push(this)
                    });
                    else {
                        var r = "string" == typeof t ? this.filter(t) : a(t) && e(t.item) ? C.call(t) : T(t);
                        this.forEach(function(t) {
                            r.indexOf(t) < 0 && n.push(t)
                        })
                    }
                    return T(n)
                },
                has: function(t) {
                    return this.filter(function() {
                        return i(t) ? T.contains(this, t) : T(this).find(t).size()
                    })
                },
                eq: function(t) {
                    return -1 === t ? this.slice(t) : this.slice(t, +t + 1)
                },
                first: function() {
                    var t = this[0];
                    return t && !i(t) ? t : T(t)
                },
                last: function() {
                    var t = this[this.length - 1];
                    return t && !i(t) ? t : T(t)
                },
                find: function(t) {
                    var e, n = this;
                    return e = t ? "object" == typeof t ? T(t).filter(function() {
                        var t = this;
                        return k.some.call(n, function(e) {
                            return T.contains(e, t)
                        })
                    }) : 1 == this.length ? T(Y.qsa(this[0], t)) : this.map(function() {
                        return Y.qsa(this, t)
                    }) : T()
                },
                closest: function(t, e) {
                    var n = this[0],
                        i = !1;
                    for ("object" == typeof t && (i = T(t)); n && !(i ? i.indexOf(n) >= 0 : Y.matches(n, t));) n = n !== e && !r(n) && n.parentNode;
                    return T(n)
                },
                parents: function(t) {
                    for (var e = [], n = this; n.length > 0;) n = T.map(n, function(t) {
                        return (t = t.parentNode) && !r(t) && e.indexOf(t) < 0 ? (e.push(t), t) : void 0
                    });
                    return g(e, t)
                },
                parent: function(t) {
                    return g(S(this.pluck("parentNode")), t)
                },
                children: function(t) {
                    return g(this.map(function() {
                        return p(this)
                    }), t)
                },
                contents: function() {
                    return this.map(function() {
                        return C.call(this.childNodes)
                    })
                },
                siblings: function(t) {
                    return g(this.map(function(t, e) {
                        return _.call(p(e.parentNode), function(t) {
                            return t !== e
                        })
                    }), t)
                },
                empty: function() {
                    return this.each(function() {
                        this.innerHTML = ""
                    })
                },
                pluck: function(t) {
                    return T.map(this, function(e) {
                        return e[t]
                    })
                },
                show: function() {
                    return this.each(function() {
                        "none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = h(this.nodeName))
                    })
                },
                replaceWith: function(t) {
                    return this.before(t).remove()
                },
                wrap: function(t) {
                    var n = e(t);
                    if (this[0] && !n) var r = T(t).get(0),
                        i = r.parentNode || this.length > 1;
                    return this.each(function(e) {
                        T(this).wrapAll(n ? t.call(this, e) : i ? r.cloneNode(!0) : r)
                    })
                },
                wrapAll: function(t) {
                    if (this[0]) {
                        T(this[0]).before(t = T(t));
                        for (var e;
                             (e = t.children()).length;) t = e.first();
                        T(t).append(this)
                    }
                    return this
                },
                wrapInner: function(t) {
                    var n = e(t);
                    return this.each(function(e) {
                        var r = T(this),
                            i = r.contents(),
                            o = n ? t.call(this, e) : t;
                        i.length ? i.wrapAll(o) : r.append(o)
                    })
                },
                unwrap: function() {
                    return this.parent().each(function() {
                        T(this).replaceWith(T(this).children())
                    }), this
                },
                clone: function() {
                    return this.map(function() {
                        return this.cloneNode(!0)
                    })
                },
                hide: function() {
                    return this.css("display", "none")
                },
                toggle: function(t) {
                    return this.each(function() {
                        var e = T(this);
                        (t === x ? "none" == e.css("display") : t) ? e.show() : e.hide()
                    })
                },
                prev: function(t) {
                    return T(this.pluck("previousElementSibling")).filter(t || "*")
                },
                next: function(t) {
                    return T(this.pluck("nextElementSibling")).filter(t || "*")
                },
                html: function(t) {
                    return 0 in arguments ? this.each(function(e) {
                        var n = this.innerHTML;
                        T(this).empty().append(m(this, t, e, n))
                    }) : 0 in this ? this[0].innerHTML : null
                },
                text: function(t) {
                    return 0 in arguments ? this.each(function(e) {
                        var n = m(this, t, e, this.textContent);
                        this.textContent = null == n ? "" : "" + n
                    }) : 0 in this ? this[0].textContent : null
                },
                attr: function(t, e) {
                    var n;
                    return "string" != typeof t || 1 in arguments ? this.each(function(n) {
                        if (1 === this.nodeType) if (i(t)) for (E in t) v(this, E, t[E]);
                        else v(this, t, m(this, e, n, this.getAttribute(t)))
                    }) : this.length && 1 === this[0].nodeType ? !(n = this[0].getAttribute(t)) && t in this[0] ? this[0][t] : n : x
                },
                removeAttr: function(t) {
                    return this.each(function() {
                        1 === this.nodeType && t.split(" ").forEach(function(t) {
                            v(this, t)
                        }, this)
                    })
                },
                prop: function(t, e) {
                    return t = Z[t] || t, 1 in arguments ? this.each(function(n) {
                        this[t] = m(this, e, n, this[t])
                    }) : this[0] && this[0][t]
                },
                data: function(t, e) {
                    var n = "data-" + t.replace(I, "-$1").toLowerCase(),
                        r = 1 in arguments ? this.attr(n, e) : this.attr(n);
                    return null !== r ? w(r) : x
                },
                val: function(t) {
                    return 0 in arguments ? this.each(function(e) {
                        this.value = m(this, t, e, this.value)
                    }) : this[0] && (this[0].multiple ? T(this[0]).find("option").filter(function() {
                        return this.selected
                    }).pluck("value") : this[0].value)
                },
                offset: function(t) {
                    if (t) return this.each(function(e) {
                        var n = T(this),
                            r = m(this, t, e, n.offset()),
                            i = n.offsetParent().offset(),
                            o = {
                                top: r.top - i.top,
                                left: r.left - i.left
                            };
                        "static" == n.css("position") && (o.position = "relative"), n.css(o)
                    });
                    if (!this.length) return null;
                    var e = this[0].getBoundingClientRect();
                    return {
                        left: e.left + window.pageXOffset,
                        top: e.top + window.pageYOffset,
                        width: Math.round(e.width),
                        height: Math.round(e.height)
                    }
                },
                css: function(e, n) {
                    if (arguments.length < 2) {
                        var r, i = this[0];
                        if (!i) return;
                        if (r = getComputedStyle(i, ""), "string" == typeof e) return i.style[j(e)] || r.getPropertyValue(e);
                        if ($(e)) {
                            var o = {};
                            return T.each(e, function(t, e) {
                                o[e] = i.style[j(e)] || r.getPropertyValue(e)
                            }), o
                        }
                    }
                    var a = "";
                    if ("string" == t(e)) n || 0 === n ? a = c(e) + ":" + f(e, n) : this.each(function() {
                        this.style.removeProperty(c(e))
                    });
                    else for (E in e) e[E] || 0 === e[E] ? a += c(E) + ":" + f(E, e[E]) + ";" : this.each(function() {
                        this.style.removeProperty(c(E))
                    });
                    return this.each(function() {
                        this.style.cssText += ";" + a
                    })
                },
                index: function(t) {
                    return t ? this.indexOf(T(t)[0]) : this.parent().children().indexOf(this[0])
                },
                hasClass: function(t) {
                    return t ? k.some.call(this, function(t) {
                        return this.test(y(t))
                    }, l(t)) : !1
                },
                addClass: function(t) {
                    return t ? this.each(function(e) {
                        if ("className" in this) {
                            A = [];
                            var n = y(this),
                                r = m(this, t, e, n);
                            r.split(/\s+/g).forEach(function(t) {
                                T(this).hasClass(t) || A.push(t)
                            }, this), A.length && y(this, n + (n ? " " : "") + A.join(" "))
                        }
                    }) : this
                },
                removeClass: function(t) {
                    return this.each(function(e) {
                        if ("className" in this) {
                            if (t === x) return y(this, "");
                            A = y(this), m(this, t, e, A).split(/\s+/g).forEach(function(t) {
                                A = A.replace(l(t), " ")
                            }), y(this, A.trim())
                        }
                    })
                },
                toggleClass: function(t, e) {
                    return t ? this.each(function(n) {
                        var r = T(this),
                            i = m(this, t, n, y(this));
                        i.split(/\s+/g).forEach(function(t) {
                            (e === x ? !r.hasClass(t) : e) ? r.addClass(t) : r.removeClass(t)
                        })
                    }) : this
                },
                scrollTop: function(t) {
                    if (this.length) {
                        var e = "scrollTop" in this[0];
                        return t === x ? e ? this[0].scrollTop : this[0].pageYOffset : this.each(e ?
                            function() {
                                this.scrollTop = t
                            } : function() {
                            this.scrollTo(this.scrollX, t)
                        })
                    }
                },
                scrollLeft: function(t) {
                    if (this.length) {
                        var e = "scrollLeft" in this[0];
                        return t === x ? e ? this[0].scrollLeft : this[0].pageXOffset : this.each(e ?
                            function() {
                                this.scrollLeft = t
                            } : function() {
                            this.scrollTo(t, this.scrollY)
                        })
                    }
                },
                position: function() {
                    if (this.length) {
                        var t = this[0],
                            e = this.offsetParent(),
                            n = this.offset(),
                            r = R.test(e[0].nodeName) ? {
                                top: 0,
                                left: 0
                            } : e.offset();
                        return n.top -= parseFloat(T(t).css("margin-top")) || 0, n.left -= parseFloat(T(t).css("margin-left")) || 0, r.top += parseFloat(T(e[0]).css("border-top-width")) || 0, r.left += parseFloat(T(e[0]).css("border-left-width")) || 0, {
                            top: n.top - r.top,
                            left: n.left - r.left
                        }
                    }
                },
                offsetParent: function() {
                    return this.map(function() {
                        for (var t = this.offsetParent || N.body; t && !R.test(t.nodeName) && "static" == T(t).css("position");) t = t.offsetParent;
                        return t
                    })
                }
            }, T.fn.detach = T.fn.remove, ["width", "height"].forEach(function(t) {
                var e = t.replace(/./, function(t) {
                    return t[0].toUpperCase()
                });
                T.fn[t] = function(i) {
                    var o, a = this[0];
                    return i === x ? n(a) ? a["inner" + e] : r(a) ? a.documentElement["scroll" + e] : (o = this.offset()) && o[t] : this.each(function(e) {
                        a = T(this), a.css(t, m(this, i, e, a[t]()))
                    })
                }
            }), F.forEach(function(e, n) {
                var r = n % 2;
                T.fn[e] = function() {
                    var e, i, o = T.map(arguments, function(n) {
                            return e = t(n), "object" == e || "array" == e || null == n ? n : Y.fragment(n)
                        }),
                        a = this.length > 1;
                    return o.length < 1 ? this : this.each(function(t, e) {
                        i = r ? e : e.parentNode, e = 0 == n ? e.nextSibling : 1 == n ? e.firstChild : 2 == n ? e : null;
                        var s = T.contains(N.documentElement, i);
                        o.forEach(function(t) {
                            if (a) t = t.cloneNode(!0);
                            else if (!i) return T(t).remove();
                            i.insertBefore(t, e), s && b(t, function(t) {
                                null == t.nodeName || "SCRIPT" !== t.nodeName.toUpperCase() || t.type && "text/javascript" !== t.type || t.src || window.eval.call(window, t.innerHTML)
                            })
                        })
                    })
                }, T.fn[r ? e + "To" : "insert" + (n ? "Before" : "After")] = function(t) {
                    return T(t)[e](this), this
                }
            }), Y.Z.prototype = T.fn, Y.uniq = S, Y.deserializeValue = w, T.zepto = Y, T
        }();
    window.Zepto = r, e.exports = void 0 === window.$ && (window.$ = r), function(t) {
        function e(t) {
            return t._zid || (t._zid = h++)
        }
        function n(t, n, o, a) {
            if (n = r(n), n.ns) var s = i(n.ns);
            return (m[e(t)] || []).filter(function(t) {
                return !(!t || n.e && t.e != n.e || n.ns && !s.test(t.ns) || o && e(t.fn) !== e(o) || a && t.sel != a)
            })
        }
        function r(t) {
            var e = ("" + t).split(".");
            return {
                e: e[0],
                ns: e.slice(1).sort().join(" ")
            }
        }
        function i(t) {
            return new RegExp("(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)")
        }
        function o(t, e) {
            return t.del && !y && t.e in w || !! e
        }
        function a(t) {
            return b[t] || y && w[t] || t
        }
        function s(n, i, s, u, l, h, p) {
            var d = e(n),
                g = m[d] || (m[d] = []);
            i.split(/\s/).forEach(function(e) {
                if ("ready" == e) return t(document).ready(s);
                var i = r(e);
                i.fn = s, i.sel = l, i.e in b && (s = function(e) {
                    var n = e.relatedTarget;
                    return !n || n !== this && !t.contains(this, n) ? i.fn.apply(this, arguments) : void 0
                }), i.del = h;
                var d = h || s;
                i.proxy = function(t) {
                    if (t = c(t), !t.isImmediatePropagationStopped()) {
                        t.data = u;
                        var e = d.apply(n, t._args == f ? [t] : [t].concat(t._args));
                        return e === !1 && (t.preventDefault(), t.stopPropagation()), e
                    }
                }, i.i = g.length, g.push(i), "addEventListener" in n && n.addEventListener(a(i.e), i.proxy, o(i, p));

            })
        }
        function u(t, r, i, s, u) {
            var c = e(t);
            (r || "").split(/\s/).forEach(function(e) {
                n(t, e, i, s).forEach(function(e) {
                    delete m[c][e.i], "removeEventListener" in t && t.removeEventListener(a(e.e), e.proxy, o(e, u))
                })
            })
        }
        function c(e, n) {
            return (n || !e.isDefaultPrevented) && (n || (n = e), t.each(A, function(t, r) {
                var i = n[t];
                e[t] = function() {
                    return this[r] = x, i && i.apply(n, arguments)
                }, e[r] = E
            }), (n.defaultPrevented !== f ? n.defaultPrevented : "returnValue" in n ? n.returnValue === !1 : n.getPreventDefault && n.getPreventDefault()) && (e.isDefaultPrevented = x)), e
        }
        function l(t) {
            var e, n = {
                originalEvent: t
            };
            for (e in t) T.test(e) || t[e] === f || (n[e] = t[e]);
            return c(n, t)
        }
        var f, h = 1,
            p = Array.prototype.slice,
            d = t.isFunction,
            g = function(t) {
                return "string" == typeof t
            },
            m = {},
            v = {},
            y = "onfocusin" in window,
            w = {
                focus: "focusin",
                blur: "focusout"
            },
            b = {
                mouseenter: "mouseover",
                mouseleave: "mouseout"
            };
        v.click = v.mousedown = v.mouseup = v.mousemove = "MouseEvents", t.event = {
            add: s,
            remove: u
        }, t.proxy = function(n, r) {
            var i = 2 in arguments && p.call(arguments, 2);
            if (d(n)) {
                var o = function() {
                    return n.apply(r, i ? i.concat(p.call(arguments)) : arguments)
                };
                return o._zid = e(n), o
            }
            if (g(r)) return i ? (i.unshift(n[r], n), t.proxy.apply(null, i)) : t.proxy(n[r], n);
            throw new TypeError("expected function")
        }, t.fn.bind = function(t, e, n) {
            return this.on(t, e, n)
        }, t.fn.unbind = function(t, e) {
            return this.off(t, e)
        }, t.fn.one = function(t, e, n, r) {
            return this.on(t, e, n, r, 1)
        };
        var x = function() {
                return !0
            },
            E = function() {
                return !1
            },
            T = /^([A-Z]|returnValue$|layer[XY]$)/,
            A = {
                preventDefault: "isDefaultPrevented",
                stopImmediatePropagation: "isImmediatePropagationStopped",
                stopPropagation: "isPropagationStopped"
            };
        t.fn.delegate = function(t, e, n) {
            return this.on(e, t, n)
        }, t.fn.undelegate = function(t, e, n) {
            return this.off(e, t, n)
        }, t.fn.live = function(e, n) {
            return t(document.body).delegate(this.selector, e, n), this
        }, t.fn.die = function(e, n) {
            return t(document.body).undelegate(this.selector, e, n), this
        }, t.fn.on = function(e, n, r, i, o) {
            var a, c, h = this;
            return e && !g(e) ? (t.each(e, function(t, e) {
                h.on(t, n, r, e, o)
            }), h) : (g(n) || d(i) || i === !1 || (i = r, r = n, n = f), (d(r) || r === !1) && (i = r, r = f), i === !1 && (i = E), h.each(function(f, h) {
                o && (a = function(t) {
                    return u(h, t.type, i), i.apply(this, arguments)
                }), n && (c = function(e) {
                    var r, o = t(e.target).closest(n, h).get(0);
                    return o && o !== h ? (r = t.extend(l(e), {
                        currentTarget: o,
                        liveFired: h
                    }), (a || i).apply(o, [r].concat(p.call(arguments, 1)))) : void 0
                }), s(h, e, i, r, n, c || a)
            }))
        }, t.fn.off = function(e, n, r) {
            var i = this;
            return e && !g(e) ? (t.each(e, function(t, e) {
                i.off(t, n, e)
            }), i) : (g(n) || d(r) || r === !1 || (r = n, n = f), r === !1 && (r = E), i.each(function() {
                u(this, e, r, n)
            }))
        }, t.fn.trigger = function(e, n) {
            return e = g(e) || t.isPlainObject(e) ? t.Event(e) : c(e), e._args = n, this.each(function() {
                e.type in w && "function" == typeof this[e.type] ? this[e.type]() : "dispatchEvent" in this ? this.dispatchEvent(e) : t(this).triggerHandler(e, n)
            })
        }, t.fn.triggerHandler = function(e, r) {
            var i, o;
            return this.each(function(a, s) {
                i = l(g(e) ? t.Event(e) : e), i._args = r, i.target = s, t.each(n(s, e.type || e), function(t, e) {
                    return o = e.proxy(i), i.isImmediatePropagationStopped() ? !1 : void 0
                })
            }), o
        }, "focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e) {
            t.fn[e] = function(t) {
                return 0 in arguments ? this.bind(e, t) : this.trigger(e)
            }
        }), t.Event = function(t, e) {
            g(t) || (e = t, t = e.type);
            var n = document.createEvent(v[t] || "Events"),
                r = !0;
            if (e) for (var i in e)"bubbles" == i ? r = !! e[i] : n[i] = e[i];
            return n.initEvent(t, r, !0), c(n)
        }
    }(r), function(t) {
        function e(e, n, r) {
            var i = t.Event(n);
            return t(e).trigger(i, r), !i.isDefaultPrevented()
        }
        function n(t, n, r, i) {
            return t.global ? e(n || y, r, i) : void 0
        }
        function r(e) {
            e.global && 0 === t.active++ && n(e, null, "ajaxStart")
        }
        function i(e) {
            e.global && !--t.active && n(e, null, "ajaxStop")
        }
        function o(t, e) {
            var r = e.context;
            return e.beforeSend.call(r, t, e) === !1 || n(e, r, "ajaxBeforeSend", [t, e]) === !1 ? !1 : void n(e, r, "ajaxSend", [t, e])
        }
        function a(t, e, r, i) {
            var o = r.context,
                a = "success";
            r.success.call(o, t, a, e), i && i.resolveWith(o, [t, a, e]), n(r, o, "ajaxSuccess", [e, r, t]), u(a, e, r)
        }
        function s(t, e, r, i, o) {
            var a = i.context;
            i.error.call(a, r, e, t), o && o.rejectWith(a, [r, e, t]), n(i, a, "ajaxError", [r, i, t || e]), u(e, r, i)
        }
        function u(t, e, r) {
            var o = r.context;
            r.complete.call(o, e, t), n(r, o, "ajaxComplete", [e, r]), i(r)
        }
        function c() {}
        function l(t) {
            return t && (t = t.split(";", 2)[0]), t && (t == T ? "html" : t == E ? "json" : b.test(t) ? "script" : x.test(t) && "xml") || "text"
        }
        function f(t, e) {
            return "" == e ? t : (t + "&" + e).replace(/[&?]{1,2}/, "?")
        }
        function h(e) {
            e.processData && e.data && "string" != t.type(e.data) && (e.data = t.param(e.data, e.traditional)), !e.data || e.type && "GET" != e.type.toUpperCase() || (e.url = f(e.url, e.data), e.data = void 0)
        }
        function p(e, n, r, i) {
            return t.isFunction(n) && (i = r, r = n, n = void 0), t.isFunction(r) || (i = r, r = void 0), {
                url: e,
                data: n,
                success: r,
                dataType: i
            }
        }
        function d(e, n, r, i) {
            var o, a = t.isArray(n),
                s = t.isPlainObject(n);
            t.each(n, function(n, u) {
                o = t.type(u), i && (n = r ? i : i + "[" + (s || "object" == o || "array" == o ? n : "") + "]"), !i && a ? e.add(u.name, u.value) : "array" == o || !r && "object" == o ? d(e, u, r, n) : e.add(n, u)
            })
        }
        var g, m, v = 0,
            y = window.document,
            w = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
            b = /^(?:text|application)\/javascript/i,
            x = /^(?:text|application)\/xml/i,
            E = "application/json",
            T = "text/html",
            A = /^\s*$/,
            j = y.createElement("a");
        j.href = window.location.href, t.active = 0, t.ajaxJSONP = function(e, n) {
            if (!("type" in e)) return t.ajax(e);
            var r, i, u = e.jsonpCallback,
                c = (t.isFunction(u) ? u() : u) || "jsonp" + ++v,
                l = y.createElement("script"),
                f = window[c],
                h = function(e) {
                    t(l).triggerHandler("error", e || "abort")
                },
                p = {
                    abort: h
                };
            return n && n.promise(p), t(l).on("load error", function(o, u) {
                clearTimeout(i), t(l).off().remove(), "error" != o.type && r ? a(r[0], p, e, n) : s(null, u || "error", p, e, n), window[c] = f, r && t.isFunction(f) && f(r[0]), f = r = void 0
            }), o(p, e) === !1 ? (h("abort"), p) : (window[c] = function() {
                r = arguments
            }, l.src = e.url.replace(/\?(.+)=\?/, "?$1=" + c), y.head.appendChild(l), e.timeout > 0 && (i = setTimeout(function() {
                h("timeout")
            }, e.timeout)), p)
        }, t.ajaxSettings = {
            type: "GET",
            beforeSend: c,
            success: c,
            error: c,
            complete: c,
            context: null,
            global: !0,
            xhr: function() {
                return new window.XMLHttpRequest
            },
            accepts: {
                script: "text/javascript, application/javascript, application/x-javascript",
                json: E,
                xml: "application/xml, text/xml",
                html: T,
                text: "text/plain"
            },
            crossDomain: !1,
            timeout: 0,
            processData: !0,
            cache: !0
        }, t.ajax = function(e) {
            var n, i = t.extend({}, e || {}),
                u = t.Deferred && t.Deferred();
            for (g in t.ajaxSettings) void 0 === i[g] && (i[g] = t.ajaxSettings[g]);
            r(i), i.crossDomain || (n = y.createElement("a"), n.href = i.url, n.href = n.href, i.crossDomain = j.protocol + "//" + j.host != n.protocol + "//" + n.host), i.url || (i.url = window.location.toString()), h(i);
            var p = i.dataType,
                d = /\?.+=\?/.test(i.url);
            if (d && (p = "jsonp"), i.cache !== !1 && (e && e.cache === !0 || "script" != p && "jsonp" != p) || (i.url = f(i.url, "_=" + Date.now())), "jsonp" == p) return d || (i.url = f(i.url, i.jsonp ? i.jsonp + "=?" : i.jsonp === !1 ? "" : "callback=?")), t.ajaxJSONP(i, u);
            var v, w = i.accepts[p],
                b = {},
                x = function(t, e) {
                    b[t.toLowerCase()] = [t, e]
                },
                E = /^([\w-]+:)\/\//.test(i.url) ? RegExp.$1 : window.location.protocol,
                T = i.xhr(),
                S = T.setRequestHeader;
            if (u && u.promise(T), i.crossDomain || x("X-Requested-With", "XMLHttpRequest"), x("Accept", w || "*/*"), (w = i.mimeType || w) && (w.indexOf(",") > -1 && (w = w.split(",", 2)[0]), T.overrideMimeType && T.overrideMimeType(w)), (i.contentType || i.contentType !== !1 && i.data && "GET" != i.type.toUpperCase()) && x("Content-Type", i.contentType || "application/x-www-form-urlencoded"), i.headers) for (m in i.headers) x(m, i.headers[m]);
            if (T.setRequestHeader = x, T.onreadystatechange = function() {
                    if (4 == T.readyState) {
                        T.onreadystatechange = c, clearTimeout(v);
                        var e, n = !1;
                        if (T.status >= 200 && T.status < 300 || 304 == T.status || 0 == T.status && "file:" == E) {
                            p = p || l(i.mimeType || T.getResponseHeader("content-type")), e = T.responseText;
                            try {
                                "script" == p ? (1, eval)(e) : "xml" == p ? e = T.responseXML : "json" == p && (e = A.test(e) ? null : t.parseJSON(e))
                            } catch (r) {
                                n = r
                            }
                            n ? s(n, "parsererror", T, i, u) : a(e, T, i, u)
                        } else s(T.statusText || null, T.status ? "error" : "abort", T, i, u)
                    }
                }, o(T, i) === !1) return T.abort(), s(null, "abort", T, i, u), T;
            if (i.xhrFields) for (m in i.xhrFields) T[m] = i.xhrFields[m];
            var k = "async" in i ? i.async : !0;
            T.open(i.type, i.url, k, i.username, i.password);
            for (m in b) S.apply(T, b[m]);
            return i.timeout > 0 && (v = setTimeout(function() {
                T.onreadystatechange = c, T.abort(), s(null, "timeout", T, i, u)
            }, i.timeout)), T.send(i.data ? i.data : null), T
        }, t.get = function() {
            return t.ajax(p.apply(null, arguments))
        }, t.post = function() {
            var e = p.apply(null, arguments);
            return e.type = "POST", t.ajax(e)
        }, t.getJSON = function() {
            var e = p.apply(null, arguments);
            return e.dataType = "json", t.ajax(e)
        }, t.fn.load = function(e, n, r) {
            if (!this.length) return this;
            var i, o = this,
                a = e.split(/\s/),
                s = p(e, n, r),
                u = s.success;
            return a.length > 1 && (s.url = a[0], i = a[1]), s.success = function(e) {
                o.html(i ? t("<div>").html(e.replace(w, "")).find(i) : e), u && u.apply(o, arguments)
            }, t.ajax(s), this
        };
        var S = encodeURIComponent;
        t.param = function(e, n) {
            var r = [];
            return r.add = function(e, n) {
                t.isFunction(n) && (n = n()), null == n && (n = ""), this.push(S(e) + "=" + S(n))
            }, d(r, e, n), r.join("&").replace(/%20/g, "+")
        }
    }(r), function(t) {
        t.fn.serializeArray = function() {
            var e, n, r = [],
                i = function(t) {
                    return t.forEach ? t.forEach(i) : void r.push({
                        name: e,
                        value: t
                    })
                };
            return this[0] && t.each(this[0].elements, function(r, o) {
                n = o.type, e = o.name, e && "fieldset" != o.nodeName.toLowerCase() && !o.disabled && "submit" != n && "reset" != n && "button" != n && "file" != n && ("radio" != n && "checkbox" != n || o.checked) && i(t(o).val())
            }), r
        }, t.fn.serialize = function() {
            var t = [];
            return this.serializeArray().forEach(function(e) {
                t.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value))
            }), t.join("&")
        }, t.fn.submit = function(e) {
            if (0 in arguments) this.bind("submit", e);
            else if (this.length) {
                var n = t.Event("submit");
                this.eq(0).trigger(n), n.isDefaultPrevented() || this.get(0).submit()
            }
            return this
        }
    }(r), function(t) {
        "__proto__" in {} || t.extend(t.zepto, {
            Z: function(e, n) {
                return e = e || [], t.extend(e, t.fn), e.selector = n || "", e.__Z = !0, e
            },
            isZ: function(e) {
                return "array" === t.type(e) && "__Z" in e
            }
        });
        try {
            getComputedStyle(void 0)
        } catch (e) {
            var n = getComputedStyle;
            window.getComputedStyle = function(t) {
                try {
                    return n(t)
                } catch (e) {
                    return null
                }
            }
        }
    }(r), n(r)
}), require.register("./lib/zepto/touch.js", function(t, e) {
    e.exports = function(t) {
        function e(t, e, n, r) {
            return Math.abs(t - e) >= Math.abs(n - r) ? t - e > 0 ? "Left" : "Right" : n - r > 0 ? "Up" : "Down"
        }
        function n() {
            l = null, h.last && (h.el.trigger("longTap"), h = {})
        }
        function r() {
            l && clearTimeout(l), l = null
        }
        function i() {
            s && clearTimeout(s), u && clearTimeout(u), c && clearTimeout(c), l && clearTimeout(l), s = u = c = l = null, h = {}
        }
        function o(t) {
            return ("touch" == t.pointerType || t.pointerType == t.MSPOINTER_TYPE_TOUCH) && t.isPrimary
        }
        function a(t, e) {
            return t.type == "pointer" + e || t.type.toLowerCase() == "mspointer" + e
        }
        var s, u, c, l, f, h = {},
            p = 750;
        t(document).ready(function() {
            var d, g, m, v, y = 0,
                w = 0;
            "MSGesture" in window && (f = new MSGesture, f.target = document.body), t(document).bind("MSGestureEnd", function(t) {
                var e = t.velocityX > 1 ? "Right" : t.velocityX < -1 ? "Left" : t.velocityY > 1 ? "Down" : t.velocityY < -1 ? "Up" : null;
                e && (h.el.trigger("swipe"), h.el.trigger("swipe" + e))
            }).on("touchstart MSPointerDown pointerdown", function(e) {
                (!(v = a(e, "down")) || o(e)) && (m = v ? e : e.touches[0], e.touches && 1 === e.touches.length && h.x2 && (h.x2 = void 0, h.y2 = void 0), d = Date.now(), g = d - (h.last || d), h.el = t("tagName" in m.target ? m.target : m.target.parentNode), s && clearTimeout(s), h.x1 = m.pageX, h.y1 = m.pageY, g > 0 && 250 >= g && (h.isDoubleTap = !0), h.last = d, l = setTimeout(n, p), f && v && f.addPointer(e.pointerId))
            }).on("touchmove MSPointerMove pointermove", function(t) {
                (!(v = a(t, "move")) || o(t)) && (m = v ? t : t.touches[0], r(), h.x2 = m.pageX, h.y2 = m.pageY, y += Math.abs(h.x1 - h.x2), w += Math.abs(h.y1 - h.y2))
            }).on("touchend MSPointerUp pointerup", function(n) {
                (!(v = a(n, "up")) || o(n)) && (r(), h.x2 && Math.abs(h.x1 - h.x2) > 30 || h.y2 && Math.abs(h.y1 - h.y2) > 30 ? c = setTimeout(function() {
                    h.el.trigger("swipe"), h.el.trigger("swipe" + e(h.x1, h.x2, h.y1, h.y2)), h = {}
                }, 0) : "last" in h && (30 > y && 30 > w ? u = setTimeout(function() {
                    var e = t.Event("tap");
                    e.cancelTouch = i, h.el.trigger(e), h.isDoubleTap ? (h.el && h.el.trigger("doubleTap"), h = {}) : s = setTimeout(function() {
                        s = null, h.el && h.el.trigger("singleTap"), h = {}
                    }, 250)
                }, 0) : h = {}), y = w = 0)
            }).on("touchcancel MSPointerCancel pointercancel", i), t(window).on("scroll", i)
        }), ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function(e) {
            t.fn[e] = function(t) {
                return this.on(e, t)
            }
        })
    }
}), require.register("./lib/analytics", function(t, e) {
    function n(t) {
        this.config = t;
        var e = document.getElementsByTagName("head")[0] || document.documentElement,
            n = document.createElement("script");
        n.async = "true", n.src = "http://pingjs.qq.com/ping.js";
        var r = !1;
        n.onload = n.onreadystatechange = function() {
            if (!(r || this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState)) {
                r = !0;
                try {
                    pgvMain()
                } catch (t) {}
                n.onload = n.onreadystatechange = null
            }
        }, e.insertBefore(n, e.firstChild)
    }
    n.prototype.sendEvent = function(t, e) {
        "function" == typeof pgvSendClick && "" !== t && "" !== e && pgvSendClick({
            hottag: "WXM." + this.config.projectName + "." + t + "." + e
        })
    }, e.exports = n
}), require.register("./lib/loader", function(t, e) {
    function n(t) {
        t = t || {}, this.settings = t, null == t.statusInterval && (t.statusInterval = 5e3), null == t.loggingDelay && (t.loggingDelay = 2e4), null == t.noProgressTimeout && (t.noProgressTimeout = 1 / 0);
        var e, n = [],
            i = [],
            o = Date.now(),
            a = {
                QUEUED: 0,
                WAITING: 1,
                LOADED: 2,
                ERROR: 3,
                TIMEOUT: 4
            },
            s = function(t) {
                return null == t ? [] : Array.isArray(t) ? t : [t]
            };
        this.add = function(t) {
            t.tags = new r(t.tags), null == t.priority && (t.priority = 1 / 0), n.push({
                resource: t,
                status: a.QUEUED
            })
        }, this.addProgressListener = function(t, e) {
            i.push({
                callback: t,
                tags: new r(e)
            })
        }, this.addCompletionListener = function(t, e) {
            i.push({
                tags: new r(e),
                callback: function(e) {
                    e.completedCount === e.totalCount && t(e)
                }
            })
        };
        var u = function(t) {
            t = s(t);
            var e = function(e) {
                for (var n = e.resource, r = 1 / 0, i = 0; i < n.tags.length; i++) for (var o = 0; o < Math.min(t.length, r) && !(n.tags.all[i] === t[o] && r > o && (r = o, 0 === r)) && 0 !== r; o++);
                return r
            };
            return function(t, n) {
                var r = e(t),
                    i = e(n);
                return i > r ? -1 : r > i ? 1 : t.priority < n.priority ? -1 : t.priority > n.priority ? 1 : 0
            }
        };
        this.start = function(t) {
            e = Date.now();
            var r = u(t);
            n.sort(r);
            for (var i = 0, o = n.length; o > i; i++) {
                var s = n[i];
                s.status = a.WAITING, s.resource.start(this)
            }
            setTimeout(c, 100)
        };
        var c = function() {
            for (var e = !1, r = Date.now() - o, i = r >= t.noProgressTimeout, s = r >= t.loggingDelay, u = 0, l = n.length; l > u; u++) {
                var f = n[u];
                f.status === a.WAITING && (f.resource.checkStatus && f.resource.checkStatus(), f.status === a.WAITING && (i ? f.resource.onTimeout() : e = !0))
            }
            s && e && h(), e && setTimeout(c, t.statusInterval)
        };
        this.isBusy = function() {
            for (var t = 0, e = n.length; e > t; t++) if (n[t].status === a.QUEUED || n[t].status === a.WAITING) return !0;
            return !1
        };
        var l = function(t, e) {
            var r, s, u, c, l, h = null;
            for (r = 0, s = n.length; s > r; r++) if (n[r].resource === t) {
                h = n[r];
                break
            }
            if (null != h && h.status === a.WAITING) for (h.status = e, o = Date.now(), u = t.tags.length, r = 0, s = i.length; s > r; r++) c = i[r], l = 0 === c.tags.length ? !0 : t.tags.intersects(c.tags), l && f(h, c)
        };
        this.onLoad = function(t) {
            l(t, a.LOADED)
        }, this.onError = function(t) {
            l(t, a.ERROR)
        }, this.onTimeout = function(t) {
            l(t, a.TIMEOUT)
        };
        var f = function(t, e) {
                var r, i, o, s, u = 0,
                    c = 0;
                for (r = 0, i = n.length; i > r; r++) o = n[r], s = !1, s = 0 === e.tags.length ? !0 : o.resource.tags.intersects(e.tags), s && (c++, (o.status === a.LOADED || o.status === a.ERROR || o.status === a.TIMEOUT) && u++);
                e.callback({
                    resource: t.resource,
                    loaded: t.status === a.LOADED,
                    error: t.status === a.ERROR,
                    timeout: t.status === a.TIMEOUT,
                    completedCount: u,
                    totalCount: c
                })
            },
            h = this.log = function(t) {
                if (window.console) {
                    var r = Math.round((Date.now() - e) / 1e3);
                    window.console.log("PxLoader elapsed: " + r + " sec");
                    for (var i = 0, o = n.length; o > i; i++) {
                        var s = n[i];
                        if (t || s.status === a.WAITING) {
                            var u = "PxLoader: #" + i + " " + s.resource.getName();
                            switch (s.status) {
                                case a.QUEUED:
                                    u += " (Not Started)";
                                    break;
                                case a.WAITING:
                                    u += " (Waiting)";
                                    break;
                                case a.LOADED:
                                    u += " (Loaded)";
                                    break;
                                case a.ERROR:
                                    u += " (Error)";
                                    break;
                                case a.TIMEOUT:
                                    u += " (Timeout)"
                            }
                            s.resource.tags.length > 0 && (u += " Tags: [" + s.resource.tags.all.join(",") + "]"), window.console.log(u)
                        }
                    }
                }
            }
    }
    function r(t) {
        if (this.all = [], this.first = null, this.length = 0, this.lookup = {}, t) {
            if (Array.isArray(t)) this.all = t.slice(0);
            else if ("object" == typeof t) for (var e in t) t.hasOwnProperty(e) && this.all.push(e);
            else this.all.push(t);
            this.length = this.all.length, this.length > 0 && (this.first = this.all[0]);
            for (var n = 0; n < this.length; n++) this.lookup[this.all[n]] = !0
        }
    }
    var i = require("./lib/loader/PxLoaderImage.js");
    r.prototype.intersects = function(t) {
        if (0 === this.length || 0 === t.length) return !1;
        if (1 === this.length && 1 === t.length) return this.first === t.first;
        if (t.length < this.length) return t.intersects(this);
        for (var e in this.lookup) if (t.lookup[e]) return !0;
        return !1
    }, "function" == typeof define && define.amd && define("PxLoader", [], function() {
        return n
    }), n.prototype.addImage = function(t, e, n, r) {
        var o = new i(t, e, n, r);
        return this.add(o), o.img
    }, e.exports = n
}), require.register("./lib/loader/PxLoaderImage.js", function(t, e) {
    function n(t, e, n, r) {
        var i = this,
            o = null;
        this.img = new Image, void 0 !== r && (this.img.crossOrigin = r), this.tags = e, this.priority = n;
        var a = function() {
                "complete" === i.img.readyState && (c(), o.onLoad(i))
            },
            s = function() {
                c(), o.onLoad(i)
            },
            u = function() {
                c(), o.onError(i)
            },
            c = function() {
                i.unbind("load", s), i.unbind("readystatechange", a), i.unbind("error", u)
            };
        this.start = function(e) {
            o = e, i.bind("load", s), i.bind("readystatechange", a), i.bind("error", u), i.img.src = t
        }, this.checkStatus = function() {
            i.img.complete && (c(), o.onLoad(i))
        }, this.onTimeout = function() {
            c(), i.img.complete ? o.onLoad(i) : o.onTimeout(i)
        }, this.getName = function() {
            return t
        }, this.bind = function(t, e) {
            i.img.addEventListener ? i.img.addEventListener(t, e, !1) : i.img.attachEvent && i.img.attachEvent("on" + t, e)
        }, this.unbind = function(t, e) {
            i.img.removeEventListener ? i.img.removeEventListener(t, e, !1) : i.img.detachEvent && i.img.detachEvent("on" + t, e)
        }
    }
    e.exports = n
}), require.register("./lib/orientation-tip", function(t, e) {
    var n = require("./lib/zepto"),
        r = require("./lib/orientation-tip/template.html");
    e.exports = function() {
        n("body").append(r)
    }
}), require.define("./lib/orientation-tip/template.html", '<style type="text/css">\n@-webkit-keyframes rotation {\n    10% {\n        transform: rotate(90deg);\n        -webkit-transform: rotate(90deg)\n    }\n    50%, 60% {\n        transform: rotate(0deg);\n        -webkit-transform: rotate(0deg)\n    }\n    90% {\n        transform: rotate(90deg);\n        -webkit-transform: rotate(90deg)\n    }\n    100% {\n        transform: rotate(90deg);\n        -webkit-transform: rotate(90deg)\n    }\n}\n\n@keyframes rotation {\n    10% {\n        transform: rotate(90deg);\n        -webkit-transform: rotate(90deg)\n    }\n    50%, 60% {\n        transform: rotate(0deg);\n        -webkit-transform: rotate(0deg)\n    }\n    90% {\n        transform: rotate(90deg);\n        -webkit-transform: rotate(90deg)\n    }\n    100% {\n        transform: rotate(90deg);\n        -webkit-transform: rotate(90deg)\n    }\n}\n\n#orientLayer {\n    display: none;\n}\n\n@media screen and (min-aspect-ratio: 13/8) {\n    #orientLayer {\n        display: block;\n    }\n}\n\n.mod-orient-layer {\n    display: none;\n    position: fixed;\n    height: 100%;\n    width: 100%;\n    left: 0;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    background: #000;\n    z-index: 9997\n}\n\n.mod-orient-layer__content {\n    position: absolute;\n    width: 100%;\n    top: 45%;\n    margin-top: -75px;\n    text-align: center\n}\n\n.mod-orient-layer__icon-orient {\n    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIYAAADaCAMAAABU68ovAAAAXVBMVEUAAAD29vb////x8fH////////x8fH5+fn29vby8vL////5+fn39/f6+vr////x8fH////////+/v7////09PT////x8fH39/f////////////////////x8fH///+WLTLGAAAAHXRSTlMAIpML+gb4ZhHWn1c2gvHBvq1uKJcC6k8b187lQ9yhhboAAAQYSURBVHja7d3blpowFIDhTUIAOchZDkre/zE7ycySrbUUpsRN2/1fzO18KzEqxEVgTiZNfgmmtxRc8iaR8HNe8x4BtjQePKayYCIoyBSgvNNE1AkNSHqZyLqk97EgUCCHBzZ5mkg7ScvIJuIyOyXBRFxgpqWZyGsAZLB1KjsJi8nutHU4JCRbFRH8tmirI9k8Jx2sqNs8K/m0LQkrktO2crgcgXGB4AiTEsB0hJfo9MGgX7CGcYiYwQxmMOOvZwRhBG8tCoMXjBDeXvWCEcHbi14wgCBmMIMZzGAGM5jxETNwzMAxA8cMHDNwzMAxA8cMHDNwzMAxA8cMHDNwzMAxY6E2rUQxnH2tz9cirlJFwFBJedaPnUv0M7++egPDE8iAJcIDmxwH5wwv9vUviw2kLbVO3TJU5uul/EyB0FoLp4x60PdGUd3qPurrWyjGGTc05u+1dcgI7/+tCCPARWGhH7o5Y7RCf+bH9ctXLp6v2BVDxfqz0oPXeSVaNtINo/1SXDv4dck8IIkbhtC2ol+iouEonTBCbYvVMnXOjxww6s/RFrBUpXHh/gw1rHj5d/qhYn9Gpk2FWh6xRBRX5Oj3Znh2Sq49/L6+y8pB26q9GbE2dbA2mVbx6I+7MfBglLCttm73ZQi7AD3iL4HqjFYJHSPRppqaUaJ3ATpGa+ckpGak2hRRMyqjGMkvl+xyFeSMwjAqcsZgGDdyhl0oNTnDN4yenJGZFGxNChP5/Y3efh6SM2rDOJMzboYxkDMqwyjIGcIw6F+io2FU1IxIm1JqRmgXSkvNKNCXeTpGrU0JNSO2c6LIGPgCS8AuDHz9ta0SXWDtxoDRH+MqlbC2Dt2G2JFRadtQZt2qq/orGowdGb2euxYiqWEpVWhTBnszoNAPdStuQwxqf0aocdWKW4Z+DfszIh8pxJqbuCE4YAC+4bm0evtipjpgJHeFnyyt1Ku2xa0bhjxr27p75rECNwyI9ZwvXkHq+7aTaMEV44YYy/spfgjgjNHaWW+GeUhGEX7tLlVinIFDDSgnOwhi1V6bU0b6tVS9eAERe863g4dRrtiHdc6o+nn5vtyVVgR79Cqt4uL6gfHPQyGqtP2vf7HADGbcYwaOGThm4JiBYwaOGThm4JiBYwaOGThm4JiBYwaOGThm4JiBYwaOGThm4JjhtOM+J/AgT008yDMkN/dPP9hzS8zAMQN3OEYeekp5YU7KOKXwVXqiY+QS7smcinGKABWdiBgpPJTSMHJ4KidhhPBUSMLw4CmPhKHgKUXCkHsygum71ftNSgCX6bsl8FQyfbcL5EdYsDk0R3j7aiA5wpt5AjKg/2gLJEBD/0Hf2OOf/vRrj6z/7GtP4B3nMKyjHA12kIPSjnJs3FEO0TvKkYJHOWCR+rjJH0Vn6fI5PjNbAAAAAElFTkSuQmCC");\n    display: inline-block;\n    width: 67px;\n    height: 109px;\n    transform: rotate(90deg);\n    -webkit-transform: rotate(90deg);\n    -webkit-animation: rotation infinite 1.5s ease-in-out;\n    animation: rotation infinite 1.5s ease-in-out;\n    -webkit-background-size: 67px;\n    background-size: 67px\n}\n\n.mod-orient-layer__desc {\n    margin-top: 20px;\n    font-size: 15px;\n    color: #fff\n} </style>\n<div id="orientLayer" class="mod-orient-layer">\n    <div class="mod-orient-layer__content"><i class="icon mod-orient-layer__icon-orient"></i>\n\n        <div class="mod-orient-layer__desc">ä¸ºäº†æ›´å¥½çš„ä½“éªŒï¼Œè¯·ä½¿ç”¨ç«–å±æµè§ˆ</div>\n    </div>\n</div>'), require.register("./lib/page-slider", function(t, e) {
    function n(t) {
        this.pages = t.pages, this.length = this.pages.length, this.length <= 1 || (this.toggleClass = t.toggleClass || "current", this.swipe = t.swipe ? t.swipe.toUpperCase() : "Y", this.animateFn = t.animateFn || "ease-in-out", this.speed = t.speed ? t.speed / 1e3 : .5, this.control = t.control || !1, this.controlClass = t.controlClass || "page-control", this.bubble = t.bubble || !1, this.preLoad = t.preLoad || !1, this.loading = t.loading, this.onComplete = t.onComplete ||
        function() {}, this.onBefore = t.onBefore ||
        function() {}, this.index = 0, this.curPage = this.pages[this.index], this.wraper = this.curPage.parentNode, this.width = document.documentElement.clientWidth, this.height = document.documentElement.clientHeight, this.flag = null, this._swipe = "up", this.controls = null, this._init())
    }
    var r = {
        addClass: function(t, e) {
            var n = new RegExp("(^| )" + e + "( |$)");
            n.test(t.className) || (t.className = t.className.split(/\s+/).concat(e).join(" "))
        },
        removeClass: function(t, e) {
            var n = new RegExp("(^|\\s)" + e + "(\\s|$)", "g");
            t.className = t.className.replace(n, "")
        }
    };
    n.prototype = {
        _init: function() {
            var t = this;
            this.wraper.style.webkitTransition = "-webkit-transform " + this.speed + "s " + this.animateFn;
            for (var e = 0; e < this.length; e++)"X" === this.swipe && (this.pages[e].style["float"] = "left");
            this.control && this._control(), this.resizeSet(), window.addEventListener("resize", function() {
                t.width = document.documentElement.clientWidth, t.height = document.documentElement.clientHeight, t.resizeSet()
            }, !1), this.wraper.addEventListener("touchstart", function(e) {
                t._startHandle(e)
            }, !1), this.wraper.addEventListener("touchmove", function(e) {
                t._moveHandle(e)
            }, !1), this.wraper.addEventListener("touchend", function(e) {
                t._endHandle(e)
            }, !1), this.run(this.index)
        },
        _control: function() {
            for (var t = this.wraper.parentNode, e = document.createElement("div"), n = "", r = 0; r < this.length; r++) n += "<span>" + (r + 1) + "</span>";
            e.innerHTML = n, e.className = this.controlClass, e.style.zIndex = 9999, t.appendChild(e), this.controls = t.getElementsByTagName("span")
        },
        _startHandle: function(t) {
            var e = t.touches[0];
            this.bubble && t.stopPropagation(), this.startX = e.clientX, this.startY = e.clientY
        },
        _moveHandle: function(t) {
            t.preventDefault()
        },
        _endHandle: function(t) {
            var e = t.changedTouches[0],
                n = e.clientX - this.startX,
                r = e.clientY - this.startY;
            this.flag = Math.abs(n) > Math.abs(r) ? "X" : "Y", this.flag === this.swipe && ("X" === this.swipe ? n > 20 ? this.prev() : -20 > n && this.next() : "Y" === this.swipe && (r > 20 ? this.prev() : -20 > r && this.next()))
        },
        prev: function() {
            this.run(this.index - 1)
        },
        next: function() {
            this.run(this.index + 1)
        },
        run: function(t) {
            var e;
            if (!(t >= this.length || 0 > t)) {
                this.onBefore && this.onBefore.call(this), "X" === this.swipe ? (e = -this.width * t + "px", this.wraper.style.webkitTransform = "translate(" + e + ", 0)") : "Y" === this.swipe && (e = -this.height * t + "px", this.wraper.style.webkitTransform = "translate(0, " + e + ")"), this._toggleClassFn(this.pages, this.index, t), this.control && this._toggleClassFn(this.controls, this.index, t), this.index = t, this.onComplete && this.onComplete.call(this);
                var n = this.pages[this.index];
                this.preLoad && n && !n.parsed && this._preLoadFn(n)
            }
        },
        _toggleClassFn: function(t, e, n) {
            var i = t[e],
                o = t[n],
                a = this;
            setTimeout(function() {
                i && r.removeClass(i, a.toggleClass), o && r.addClass(o, a.toggleClass)
            }, 500)
        },
        _preLoadFn: function(t) {
            var e = t.getElementsByTagName("textarea")[0];
            e && (t.innerHTML = e.value, t.parsed = !0)
        },
        resizeSet: function() {
            "X" === this.swipe && (this.wraper.style.width = this.width * this.length + "px", this.wraper.style.height = this.height + "px"), "Y" === this.swipe && (this.wraper.style.width = this.width + "px", this.wraper.style.height = this.height * this.length + "px");
            for (var t = 0; t < this.length; t++) this.pages[t].style.width = this.width + "px", this.pages[t].style.height = this.height + "px";
            this.run(this.index)
        }
    }, e.exports = n
}), require.register("./lib/share", function(t, e) {
    function n(t) {
        this.init(t)
    }
    function r(t) {
        return 1 == document.getElementsByName("wxm:" + t).length ? document.getElementsByName("wxm:" + t)[0].getAttribute("content") : "undefined"
    }
    var i = require("./lib/underscore");
    n.prototype.init = function(t) {
        this.config = {
            timeline: {
                title: r("timeline_title"),
                desc: r("timeline_title")
            },
            appmessage: {
                title: r("appmessage_title"),
                desc: r("appmessage_desc")
            },
            global: {
                img_url: r("img_url"),
                link: r("link")
            }
        }, this.config = i.extend({}, t, this.config), this.config.timeline = i.extend({}, this.config.global, this.config.timeline), this.config.appmessage = i.extend({}, this.config.global, this.config.appmessage);
        var e = this,
            n = function() {
                WeixinJSBridge.on("menu:share:appmessage", function() {
                    WeixinJSBridge.invoke("sendAppMessage", e.config.appmessage, function(t) {
                        "send_app_msg:cancel" !== t.err_msg && i.isFunction(e.config.appmessage.success) ? e.config.appmessage.success() : i.isFunction(e.config.appmessage.cancel) && e.config.appmessage.success()
                    })
                }), WeixinJSBridge.on("menu:share:timeline", function() {
                    WeixinJSBridge.invoke("shareTimeline", e.config.timeline, function(t) {
                        "share_timeline:cancel" !== t.err_msg && i.isFunction(e.config.timeline.success) ? e.config.timeline.success() : i.isFunction(__this._this.config.timeline.success) && e.config.timeline.success()
                    })
                })
            };
        "undefined" == typeof window.WeixinJSBridge ? document.addEventListener ? document.addEventListener("WeixinJSBridgeReady", n, !1) : document.attachEvent && (document.attachEvent("WeixinJSBridgeReady", n), document.attachEvent("onWeixinJSBridgeReady", n)) : n()
    }, n.prototype.set = function() {
        3 === arguments.length && i.isString(arguments[0]) && i.isString(arguments[1]) ? this.config[arguments[0]][arguments[1]] = arguments[2] : console.log("[WxMoment Share] set å‡½æ•°å‚æ•°é”™è¯¯")
    }, e.exports = n
}), require.register("./lib/video", function(t, e) {
    function n(t, e) {
        return s = u.extend({
            vid: null,
            width: "100%",
            height: "100%",
            modId: "WxMomentVideo",
            isHtml5ControlAlwaysShow: !1,
            isHtml5UseUI: !0,
            html5LiveUIFeature: !1,
            isHtml5UseFakeFullScreen: !0,
            playerType: "html5",
            noLimitBtn: !0,
            isiPhoneShowPosterOnPause: !1,
            vodFlashExtVars: {
                share: 0,
                follow: 0,
                showlogo: 0,
                clientbar: 0
            },
            plugins: {
                AppBanner: 0,
                AppRecommend: 0
            },
            autoplay: !1,
            oninited: function() {},
            onplaying: function() {},
            onpause: function() {},
            onresume: function() {},
            onallended: function() {},
            onfullscreen: function(t) {}
        }, t), s.vid ? (r(), a) : void console.log("è¯·è®¾ç½®è§†é¢‘ vid")
    }
    function r() {
        var t = document.getElementsByTagName("head")[0] || document.documentElement,
            e = document.createElement("script");
        e.async = "true", e.src = "http://imgcache.gtimg.cn/tencentvideo_v1/tvp/js/tvp.player_v2_zepto.js";
        var n = !1;
        e.onload = e.onreadystatechange = function() {
            if (!(n || this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState)) {
                n = !0;
                try {
                    i()
                } catch (t) {}
                e.onload = e.onreadystatechange = null
            }
        }, t.insertBefore(e, t.firstChild)
    }
    function i() {
        o = new tvp.VideoInfo, a = new tvp.Player, o.setVid(s.vid), s.video = o, a.create(s)
    }
    var o, a, s, u = require("./lib/underscore");
    n.prototype.getPlayer = function() {
        return a.getPlayer()
    }, e.exports = n
}), require.register("./lib/wxmoment", function(t, e) {
    "use strict";
    var n = require("./lib/underscore"),
        r = require("./lib/analytics"),
        i = require("./lib/loader"),
        o = require("./lib/orientation-tip"),
        a = require("./lib/page-slider"),
        s = require("./lib/share"),
        u = require("./lib/video"),
        c = function(t) {
            this.version = "0.0.1", this.options = {}, this.options = n.extend(this.options, t), this.Loader = i, this.Analytics = r, this.PageSlider = a, this.Share = s, this.OrientationTip = o, this.Video = u
        };
    Date.now || (Date.now = function() {
        return (new Date).getTime()
    }), Array.isArray || (Array.isArray = function(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    }), e.exports = window.WxMoment = new c
}), require("./lib/wxmoment");