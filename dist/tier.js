!(function (t, n) {
  if ("object" == typeof exports && "object" == typeof module)
    module.exports = n();
  else if ("function" == typeof define && define.amd) define([], n);
  else {
    var e = n();
    for (var r in e) ("object" == typeof exports ? exports : t)[r] = e[r];
  }
})(window, function () {
  return (function (t) {
    var n = {};
    function e(r) {
      if (n[r]) return n[r].exports;
      var i = (n[r] = { i: r, l: !1, exports: {} });
      return t[r].call(i.exports, i, i.exports, e), (i.l = !0), i.exports;
    }
    return (
      (e.m = t),
      (e.c = n),
      (e.d = function (t, n, r) {
        e.o(t, n) || Object.defineProperty(t, n, { enumerable: !0, get: r });
      }),
      (e.r = function (t) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      }),
      (e.t = function (t, n) {
        if ((1 & n && (t = e(t)), 8 & n)) return t;
        if (4 & n && "object" == typeof t && t && t.__esModule) return t;
        var r = Object.create(null);
        if (
          (e.r(r),
          Object.defineProperty(r, "default", { enumerable: !0, value: t }),
          2 & n && "string" != typeof t)
        )
          for (var i in t)
            e.d(
              r,
              i,
              function (n) {
                return t[n];
              }.bind(null, i)
            );
        return r;
      }),
      (e.n = function (t) {
        var n =
          t && t.__esModule
            ? function () {
                return t.default;
              }
            : function () {
                return t;
              };
        return e.d(n, "a", n), n;
      }),
      (e.o = function (t, n) {
        return Object.prototype.hasOwnProperty.call(t, n);
      }),
      (e.p = ""),
      e((e.s = 33))
    );
  })({
    33: function (t, n, e) {
      "use strict";
      e.r(n);
      function r() {
        return "\n      html: {\n        height: 110%;\n      }\n      body {\n        overflow: hidden !important;\n      } \n      #title_chart{\n        position:absolute; \n        margin-left: 10px; \n        margin-top: -10px;\n      }  \n      .no-content{\n        width:100%;\n        text-align:center;\n      }\n      .no-content > h5{\n        font-family: 'Quicksand', sans-serif; \n        font-weight: normal; \n        color:#ababab\n      }        \n      *::-webkit-scrollbar-thumb {\n        background-color: #ababab;\n        border-radius: 10px;\n        border: 3px solid #ffffff;\n      }\n      *::-webkit-scrollbar-track {\n        background: #ffffff;\n      }\n      table > tr {\n        cursor: point;\n        background-color: #dedede;\n      }  \n      ";
      }
      var i = { value: () => {} };
      function o() {
        for (var t, n = 0, e = arguments.length, r = {}; n < e; ++n) {
          if (!(t = arguments[n] + "") || t in r || /[\s.]/.test(t))
            throw new Error("illegal type: " + t);
          r[t] = [];
        }
        return new u(r);
      }
      function u(t) {
        this._ = t;
      }
      function a(t, n) {
        return t
          .trim()
          .split(/^|\s+/)
          .map(function (t) {
            var e = "",
              r = t.indexOf(".");
            if (
              (r >= 0 && ((e = t.slice(r + 1)), (t = t.slice(0, r))),
              t && !n.hasOwnProperty(t))
            )
              throw new Error("unknown type: " + t);
            return { type: t, name: e };
          });
      }
      function s(t, n) {
        for (var e, r = 0, i = t.length; r < i; ++r)
          if ((e = t[r]).name === n) return e.value;
      }
      function l(t, n, e) {
        for (var r = 0, o = t.length; r < o; ++r)
          if (t[r].name === n) {
            (t[r] = i), (t = t.slice(0, r).concat(t.slice(r + 1)));
            break;
          }
        return null != e && t.push({ name: n, value: e }), t;
      }
      u.prototype = o.prototype = {
        constructor: u,
        on: function (t, n) {
          var e,
            r = this._,
            i = a(t + "", r),
            o = -1,
            u = i.length;
          if (!(arguments.length < 2)) {
            if (null != n && "function" != typeof n)
              throw new Error("invalid callback: " + n);
            for (; ++o < u; )
              if ((e = (t = i[o]).type)) r[e] = l(r[e], t.name, n);
              else if (null == n) for (e in r) r[e] = l(r[e], t.name, null);
            return this;
          }
          for (; ++o < u; )
            if ((e = (t = i[o]).type) && (e = s(r[e], t.name))) return e;
        },
        copy: function () {
          var t = {},
            n = this._;
          for (var e in n) t[e] = n[e].slice();
          return new u(t);
        },
        call: function (t, n) {
          if ((e = arguments.length - 2) > 0)
            for (var e, r, i = new Array(e), o = 0; o < e; ++o)
              i[o] = arguments[o + 2];
          if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
          for (o = 0, e = (r = this._[t]).length; o < e; ++o)
            r[o].value.apply(n, i);
        },
        apply: function (t, n, e) {
          if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
          for (var r = this._[t], i = 0, o = r.length; i < o; ++i)
            r[i].value.apply(n, e);
        },
      };
      var c = o;
      function f() {}
      var h = function (t) {
        return null == t
          ? f
          : function () {
              return this.querySelector(t);
            };
      };
      function p(t) {
        return null == t ? [] : Array.isArray(t) ? t : Array.from(t);
      }
      function d() {
        return [];
      }
      function _(t) {
        return function (n) {
          return n.matches(t);
        };
      }
      var y = Array.prototype.find;
      function v() {
        return this.firstElementChild;
      }
      var g = Array.prototype.filter;
      function m() {
        return Array.from(this.children);
      }
      var w = function (t) {
        return new Array(t.length);
      };
      function b(t, n) {
        (this.ownerDocument = t.ownerDocument),
          (this.namespaceURI = t.namespaceURI),
          (this._next = null),
          (this._parent = t),
          (this.__data__ = n);
      }
      b.prototype = {
        constructor: b,
        appendChild: function (t) {
          return this._parent.insertBefore(t, this._next);
        },
        insertBefore: function (t, n) {
          return this._parent.insertBefore(t, n);
        },
        querySelector: function (t) {
          return this._parent.querySelector(t);
        },
        querySelectorAll: function (t) {
          return this._parent.querySelectorAll(t);
        },
      };
      var x = function (t) {
        return function () {
          return t;
        };
      };
      function A(t, n, e, r, i, o) {
        for (var u, a = 0, s = n.length, l = o.length; a < l; ++a)
          (u = n[a])
            ? ((u.__data__ = o[a]), (r[a] = u))
            : (e[a] = new b(t, o[a]));
        for (; a < s; ++a) (u = n[a]) && (i[a] = u);
      }
      function N(t, n, e, r, i, o, u) {
        var a,
          s,
          l,
          c = new Map(),
          f = n.length,
          h = o.length,
          p = new Array(f);
        for (a = 0; a < f; ++a)
          (s = n[a]) &&
            ((p[a] = l = u.call(s, s.__data__, a, n) + ""),
            c.has(l) ? (i[a] = s) : c.set(l, s));
        for (a = 0; a < h; ++a)
          (l = u.call(t, o[a], a, o) + ""),
            (s = c.get(l))
              ? ((r[a] = s), (s.__data__ = o[a]), c.delete(l))
              : (e[a] = new b(t, o[a]));
        for (a = 0; a < f; ++a) (s = n[a]) && c.get(p[a]) === s && (i[a] = s);
      }
      function E(t) {
        return t.__data__;
      }
      function S(t) {
        return "object" == typeof t && "length" in t ? t : Array.from(t);
      }
      function k(t, n) {
        return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
      }
      var M = "http://www.w3.org/1999/xhtml",
        C = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: M,
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
        },
        $ = function (t) {
          var n = (t += ""),
            e = n.indexOf(":");
          return (
            e >= 0 && "xmlns" !== (n = t.slice(0, e)) && (t = t.slice(e + 1)),
            C.hasOwnProperty(n) ? { space: C[n], local: t } : t
          );
        };
      function L(t) {
        return function () {
          this.removeAttribute(t);
        };
      }
      function P(t) {
        return function () {
          this.removeAttributeNS(t.space, t.local);
        };
      }
      function q(t, n) {
        return function () {
          this.setAttribute(t, n);
        };
      }
      function O(t, n) {
        return function () {
          this.setAttributeNS(t.space, t.local, n);
        };
      }
      function j(t, n) {
        return function () {
          var e = n.apply(this, arguments);
          null == e ? this.removeAttribute(t) : this.setAttribute(t, e);
        };
      }
      function T(t, n) {
        return function () {
          var e = n.apply(this, arguments);
          null == e
            ? this.removeAttributeNS(t.space, t.local)
            : this.setAttributeNS(t.space, t.local, e);
        };
      }
      var B = function (t) {
        return (
          (t.ownerDocument && t.ownerDocument.defaultView) ||
          (t.document && t) ||
          t.defaultView
        );
      };
      function D(t) {
        return function () {
          this.style.removeProperty(t);
        };
      }
      function R(t, n, e) {
        return function () {
          this.style.setProperty(t, n, e);
        };
      }
      function H(t, n, e) {
        return function () {
          var r = n.apply(this, arguments);
          null == r
            ? this.style.removeProperty(t)
            : this.style.setProperty(t, r, e);
        };
      }
      function I(t, n) {
        return (
          t.style.getPropertyValue(n) ||
          B(t).getComputedStyle(t, null).getPropertyValue(n)
        );
      }
      function X(t) {
        return function () {
          delete this[t];
        };
      }
      function V(t, n) {
        return function () {
          this[t] = n;
        };
      }
      function U(t, n) {
        return function () {
          var e = n.apply(this, arguments);
          null == e ? delete this[t] : (this[t] = e);
        };
      }
      function z(t) {
        return t.trim().split(/^|\s+/);
      }
      function Y(t) {
        return t.classList || new F(t);
      }
      function F(t) {
        (this._node = t), (this._names = z(t.getAttribute("class") || ""));
      }
      function Q(t, n) {
        for (var e = Y(t), r = -1, i = n.length; ++r < i; ) e.add(n[r]);
      }
      function W(t, n) {
        for (var e = Y(t), r = -1, i = n.length; ++r < i; ) e.remove(n[r]);
      }
      function J(t) {
        return function () {
          Q(this, t);
        };
      }
      function K(t) {
        return function () {
          W(this, t);
        };
      }
      function G(t, n) {
        return function () {
          (n.apply(this, arguments) ? Q : W)(this, t);
        };
      }
      F.prototype = {
        add: function (t) {
          this._names.indexOf(t) < 0 &&
            (this._names.push(t),
            this._node.setAttribute("class", this._names.join(" ")));
        },
        remove: function (t) {
          var n = this._names.indexOf(t);
          n >= 0 &&
            (this._names.splice(n, 1),
            this._node.setAttribute("class", this._names.join(" ")));
        },
        contains: function (t) {
          return this._names.indexOf(t) >= 0;
        },
      };
      function Z() {
        this.textContent = "";
      }
      function tt(t) {
        return function () {
          this.textContent = t;
        };
      }
      function nt(t) {
        return function () {
          var n = t.apply(this, arguments);
          this.textContent = null == n ? "" : n;
        };
      }
      function et() {
        this.innerHTML = "";
      }
      function rt(t) {
        return function () {
          this.innerHTML = t;
        };
      }
      function it(t) {
        return function () {
          var n = t.apply(this, arguments);
          this.innerHTML = null == n ? "" : n;
        };
      }
      function ot() {
        this.nextSibling && this.parentNode.appendChild(this);
      }
      function ut() {
        this.previousSibling &&
          this.parentNode.insertBefore(this, this.parentNode.firstChild);
      }
      function at(t) {
        return function () {
          var n = this.ownerDocument,
            e = this.namespaceURI;
          return e === M && n.documentElement.namespaceURI === M
            ? n.createElement(t)
            : n.createElementNS(e, t);
        };
      }
      function st(t) {
        return function () {
          return this.ownerDocument.createElementNS(t.space, t.local);
        };
      }
      var lt = function (t) {
        var n = $(t);
        return (n.local ? st : at)(n);
      };
      function ct() {
        return null;
      }
      function ft() {
        var t = this.parentNode;
        t && t.removeChild(this);
      }
      function ht() {
        var t = this.cloneNode(!1),
          n = this.parentNode;
        return n ? n.insertBefore(t, this.nextSibling) : t;
      }
      function pt() {
        var t = this.cloneNode(!0),
          n = this.parentNode;
        return n ? n.insertBefore(t, this.nextSibling) : t;
      }
      function dt(t) {
        return t
          .trim()
          .split(/^|\s+/)
          .map(function (t) {
            var n = "",
              e = t.indexOf(".");
            return (
              e >= 0 && ((n = t.slice(e + 1)), (t = t.slice(0, e))),
              { type: t, name: n }
            );
          });
      }
      function _t(t) {
        return function () {
          var n = this.__on;
          if (n) {
            for (var e, r = 0, i = -1, o = n.length; r < o; ++r)
              (e = n[r]),
                (t.type && e.type !== t.type) || e.name !== t.name
                  ? (n[++i] = e)
                  : this.removeEventListener(e.type, e.listener, e.options);
            ++i ? (n.length = i) : delete this.__on;
          }
        };
      }
      function yt(t, n, e) {
        return function () {
          var r,
            i = this.__on,
            o = (function (t) {
              return function (n) {
                t.call(this, n, this.__data__);
              };
            })(n);
          if (i)
            for (var u = 0, a = i.length; u < a; ++u)
              if ((r = i[u]).type === t.type && r.name === t.name)
                return (
                  this.removeEventListener(r.type, r.listener, r.options),
                  this.addEventListener(
                    r.type,
                    (r.listener = o),
                    (r.options = e)
                  ),
                  void (r.value = n)
                );
          this.addEventListener(t.type, o, e),
            (r = {
              type: t.type,
              name: t.name,
              value: n,
              listener: o,
              options: e,
            }),
            i ? i.push(r) : (this.__on = [r]);
        };
      }
      function vt(t, n, e) {
        var r = B(t),
          i = r.CustomEvent;
        "function" == typeof i
          ? (i = new i(n, e))
          : ((i = r.document.createEvent("Event")),
            e
              ? (i.initEvent(n, e.bubbles, e.cancelable), (i.detail = e.detail))
              : i.initEvent(n, !1, !1)),
          t.dispatchEvent(i);
      }
      function gt(t, n) {
        return function () {
          return vt(this, t, n);
        };
      }
      function mt(t, n) {
        return function () {
          return vt(this, t, n.apply(this, arguments));
        };
      }
      var wt = [null];
      function bt(t, n) {
        (this._groups = t), (this._parents = n);
      }
      function xt() {
        return new bt([[document.documentElement]], wt);
      }
      bt.prototype = xt.prototype = {
        constructor: bt,
        select: function (t) {
          "function" != typeof t && (t = h(t));
          for (
            var n = this._groups, e = n.length, r = new Array(e), i = 0;
            i < e;
            ++i
          )
            for (
              var o,
                u,
                a = n[i],
                s = a.length,
                l = (r[i] = new Array(s)),
                c = 0;
              c < s;
              ++c
            )
              (o = a[c]) &&
                (u = t.call(o, o.__data__, c, a)) &&
                ("__data__" in o && (u.__data__ = o.__data__), (l[c] = u));
          return new bt(r, this._parents);
        },
        selectAll: function (t) {
          var n;
          "function" == typeof t
            ? (t = (function (t) {
                return function () {
                  return p(t.apply(this, arguments));
                };
              })(t))
            : (t =
                null == (n = t)
                  ? d
                  : function () {
                      return this.querySelectorAll(n);
                    });
          for (
            var e = this._groups, r = e.length, i = [], o = [], u = 0;
            u < r;
            ++u
          )
            for (var a, s = e[u], l = s.length, c = 0; c < l; ++c)
              (a = s[c]) && (i.push(t.call(a, a.__data__, c, s)), o.push(a));
          return new bt(i, o);
        },
        selectChild: function (t) {
          return this.select(
            null == t
              ? v
              : (function (t) {
                  return function () {
                    return y.call(this.children, t);
                  };
                })("function" == typeof t ? t : _(t))
          );
        },
        selectChildren: function (t) {
          return this.selectAll(
            null == t
              ? m
              : (function (t) {
                  return function () {
                    return g.call(this.children, t);
                  };
                })("function" == typeof t ? t : _(t))
          );
        },
        filter: function (t) {
          var n;
          "function" != typeof t &&
            ((n = t),
            (t = function () {
              return this.matches(n);
            }));
          for (
            var e = this._groups, r = e.length, i = new Array(r), o = 0;
            o < r;
            ++o
          )
            for (
              var u, a = e[o], s = a.length, l = (i[o] = []), c = 0;
              c < s;
              ++c
            )
              (u = a[c]) && t.call(u, u.__data__, c, a) && l.push(u);
          return new bt(i, this._parents);
        },
        data: function (t, n) {
          if (!arguments.length) return Array.from(this, E);
          var e = n ? N : A,
            r = this._parents,
            i = this._groups;
          "function" != typeof t && (t = x(t));
          for (
            var o = i.length,
              u = new Array(o),
              a = new Array(o),
              s = new Array(o),
              l = 0;
            l < o;
            ++l
          ) {
            var c = r[l],
              f = i[l],
              h = f.length,
              p = S(t.call(c, c && c.__data__, l, r)),
              d = p.length,
              _ = (a[l] = new Array(d)),
              y = (u[l] = new Array(d)),
              v = (s[l] = new Array(h));
            e(c, f, _, y, v, p, n);
            for (var g, m, w = 0, b = 0; w < d; ++w)
              if ((g = _[w])) {
                for (w >= b && (b = w + 1); !(m = y[b]) && ++b < d; );
                g._next = m || null;
              }
          }
          return ((u = new bt(u, r))._enter = a), (u._exit = s), u;
        },
        enter: function () {
          return new bt(this._enter || this._groups.map(w), this._parents);
        },
        exit: function () {
          return new bt(this._exit || this._groups.map(w), this._parents);
        },
        join: function (t, n, e) {
          var r = this.enter(),
            i = this,
            o = this.exit();
          return (
            "function" == typeof t
              ? (r = t(r)) && (r = r.selection())
              : (r = r.append(t + "")),
            null != n && (i = n(i)) && (i = i.selection()),
            null == e ? o.remove() : e(o),
            r && i ? r.merge(i).order() : i
          );
        },
        merge: function (t) {
          for (
            var n = t.selection ? t.selection() : t,
              e = this._groups,
              r = n._groups,
              i = e.length,
              o = r.length,
              u = Math.min(i, o),
              a = new Array(i),
              s = 0;
            s < u;
            ++s
          )
            for (
              var l,
                c = e[s],
                f = r[s],
                h = c.length,
                p = (a[s] = new Array(h)),
                d = 0;
              d < h;
              ++d
            )
              (l = c[d] || f[d]) && (p[d] = l);
          for (; s < i; ++s) a[s] = e[s];
          return new bt(a, this._parents);
        },
        selection: function () {
          return this;
        },
        order: function () {
          for (var t = this._groups, n = -1, e = t.length; ++n < e; )
            for (var r, i = t[n], o = i.length - 1, u = i[o]; --o >= 0; )
              (r = i[o]) &&
                (u &&
                  4 ^ r.compareDocumentPosition(u) &&
                  u.parentNode.insertBefore(r, u),
                (u = r));
          return this;
        },
        sort: function (t) {
          function n(n, e) {
            return n && e ? t(n.__data__, e.__data__) : !n - !e;
          }
          t || (t = k);
          for (
            var e = this._groups, r = e.length, i = new Array(r), o = 0;
            o < r;
            ++o
          ) {
            for (
              var u, a = e[o], s = a.length, l = (i[o] = new Array(s)), c = 0;
              c < s;
              ++c
            )
              (u = a[c]) && (l[c] = u);
            l.sort(n);
          }
          return new bt(i, this._parents).order();
        },
        call: function () {
          var t = arguments[0];
          return (arguments[0] = this), t.apply(null, arguments), this;
        },
        nodes: function () {
          return Array.from(this);
        },
        node: function () {
          for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
            for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
              var u = r[i];
              if (u) return u;
            }
          return null;
        },
        size: function () {
          let t = 0;
          for (const n of this) ++t;
          return t;
        },
        empty: function () {
          return !this.node();
        },
        each: function (t) {
          for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
            for (var i, o = n[e], u = 0, a = o.length; u < a; ++u)
              (i = o[u]) && t.call(i, i.__data__, u, o);
          return this;
        },
        attr: function (t, n) {
          var e = $(t);
          if (arguments.length < 2) {
            var r = this.node();
            return e.local
              ? r.getAttributeNS(e.space, e.local)
              : r.getAttribute(e);
          }
          return this.each(
            (null == n
              ? e.local
                ? P
                : L
              : "function" == typeof n
              ? e.local
                ? T
                : j
              : e.local
              ? O
              : q)(e, n)
          );
        },
        style: function (t, n, e) {
          return arguments.length > 1
            ? this.each(
                (null == n ? D : "function" == typeof n ? H : R)(
                  t,
                  n,
                  null == e ? "" : e
                )
              )
            : I(this.node(), t);
        },
        property: function (t, n) {
          return arguments.length > 1
            ? this.each((null == n ? X : "function" == typeof n ? U : V)(t, n))
            : this.node()[t];
        },
        classed: function (t, n) {
          var e = z(t + "");
          if (arguments.length < 2) {
            for (var r = Y(this.node()), i = -1, o = e.length; ++i < o; )
              if (!r.contains(e[i])) return !1;
            return !0;
          }
          return this.each(("function" == typeof n ? G : n ? J : K)(e, n));
        },
        text: function (t) {
          return arguments.length
            ? this.each(null == t ? Z : ("function" == typeof t ? nt : tt)(t))
            : this.node().textContent;
        },
        html: function (t) {
          return arguments.length
            ? this.each(null == t ? et : ("function" == typeof t ? it : rt)(t))
            : this.node().innerHTML;
        },
        raise: function () {
          return this.each(ot);
        },
        lower: function () {
          return this.each(ut);
        },
        append: function (t) {
          var n = "function" == typeof t ? t : lt(t);
          return this.select(function () {
            return this.appendChild(n.apply(this, arguments));
          });
        },
        insert: function (t, n) {
          var e = "function" == typeof t ? t : lt(t),
            r = null == n ? ct : "function" == typeof n ? n : h(n);
          return this.select(function () {
            return this.insertBefore(
              e.apply(this, arguments),
              r.apply(this, arguments) || null
            );
          });
        },
        remove: function () {
          return this.each(ft);
        },
        clone: function (t) {
          return this.select(t ? pt : ht);
        },
        datum: function (t) {
          return arguments.length
            ? this.property("__data__", t)
            : this.node().__data__;
        },
        on: function (t, n, e) {
          var r,
            i,
            o = dt(t + ""),
            u = o.length;
          if (!(arguments.length < 2)) {
            for (a = n ? yt : _t, r = 0; r < u; ++r) this.each(a(o[r], n, e));
            return this;
          }
          var a = this.node().__on;
          if (a)
            for (var s, l = 0, c = a.length; l < c; ++l)
              for (r = 0, s = a[l]; r < u; ++r)
                if ((i = o[r]).type === s.type && i.name === s.name)
                  return s.value;
        },
        dispatch: function (t, n) {
          return this.each(("function" == typeof n ? mt : gt)(t, n));
        },
        [Symbol.iterator]: function* () {
          for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
            for (var r, i = t[n], o = 0, u = i.length; o < u; ++o)
              (r = i[o]) && (yield r);
        },
      };
      var At = function (t, n, e) {
        (t.prototype = n.prototype = e), (e.constructor = t);
      };
      function Nt(t, n) {
        var e = Object.create(t.prototype);
        for (var r in n) e[r] = n[r];
        return e;
      }
      function Et() {}
      var St = "\\s*([+-]?\\d+)\\s*",
        kt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
        Mt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
        Ct = /^#([0-9a-f]{3,8})$/,
        $t = new RegExp(`^rgb\\(${St},${St},${St}\\)$`),
        Lt = new RegExp(`^rgb\\(${Mt},${Mt},${Mt}\\)$`),
        Pt = new RegExp(`^rgba\\(${St},${St},${St},${kt}\\)$`),
        qt = new RegExp(`^rgba\\(${Mt},${Mt},${Mt},${kt}\\)$`),
        Ot = new RegExp(`^hsl\\(${kt},${Mt},${Mt}\\)$`),
        jt = new RegExp(`^hsla\\(${kt},${Mt},${Mt},${kt}\\)$`),
        Tt = {
          aliceblue: 15792383,
          antiquewhite: 16444375,
          aqua: 65535,
          aquamarine: 8388564,
          azure: 15794175,
          beige: 16119260,
          bisque: 16770244,
          black: 0,
          blanchedalmond: 16772045,
          blue: 255,
          blueviolet: 9055202,
          brown: 10824234,
          burlywood: 14596231,
          cadetblue: 6266528,
          chartreuse: 8388352,
          chocolate: 13789470,
          coral: 16744272,
          cornflowerblue: 6591981,
          cornsilk: 16775388,
          crimson: 14423100,
          cyan: 65535,
          darkblue: 139,
          darkcyan: 35723,
          darkgoldenrod: 12092939,
          darkgray: 11119017,
          darkgreen: 25600,
          darkgrey: 11119017,
          darkkhaki: 12433259,
          darkmagenta: 9109643,
          darkolivegreen: 5597999,
          darkorange: 16747520,
          darkorchid: 10040012,
          darkred: 9109504,
          darksalmon: 15308410,
          darkseagreen: 9419919,
          darkslateblue: 4734347,
          darkslategray: 3100495,
          darkslategrey: 3100495,
          darkturquoise: 52945,
          darkviolet: 9699539,
          deeppink: 16716947,
          deepskyblue: 49151,
          dimgray: 6908265,
          dimgrey: 6908265,
          dodgerblue: 2003199,
          firebrick: 11674146,
          floralwhite: 16775920,
          forestgreen: 2263842,
          fuchsia: 16711935,
          gainsboro: 14474460,
          ghostwhite: 16316671,
          gold: 16766720,
          goldenrod: 14329120,
          gray: 8421504,
          green: 32768,
          greenyellow: 11403055,
          grey: 8421504,
          honeydew: 15794160,
          hotpink: 16738740,
          indianred: 13458524,
          indigo: 4915330,
          ivory: 16777200,
          khaki: 15787660,
          lavender: 15132410,
          lavenderblush: 16773365,
          lawngreen: 8190976,
          lemonchiffon: 16775885,
          lightblue: 11393254,
          lightcoral: 15761536,
          lightcyan: 14745599,
          lightgoldenrodyellow: 16448210,
          lightgray: 13882323,
          lightgreen: 9498256,
          lightgrey: 13882323,
          lightpink: 16758465,
          lightsalmon: 16752762,
          lightseagreen: 2142890,
          lightskyblue: 8900346,
          lightslategray: 7833753,
          lightslategrey: 7833753,
          lightsteelblue: 11584734,
          lightyellow: 16777184,
          lime: 65280,
          limegreen: 3329330,
          linen: 16445670,
          magenta: 16711935,
          maroon: 8388608,
          mediumaquamarine: 6737322,
          mediumblue: 205,
          mediumorchid: 12211667,
          mediumpurple: 9662683,
          mediumseagreen: 3978097,
          mediumslateblue: 8087790,
          mediumspringgreen: 64154,
          mediumturquoise: 4772300,
          mediumvioletred: 13047173,
          midnightblue: 1644912,
          mintcream: 16121850,
          mistyrose: 16770273,
          moccasin: 16770229,
          navajowhite: 16768685,
          navy: 128,
          oldlace: 16643558,
          olive: 8421376,
          olivedrab: 7048739,
          orange: 16753920,
          orangered: 16729344,
          orchid: 14315734,
          palegoldenrod: 15657130,
          palegreen: 10025880,
          paleturquoise: 11529966,
          palevioletred: 14381203,
          papayawhip: 16773077,
          peachpuff: 16767673,
          peru: 13468991,
          pink: 16761035,
          plum: 14524637,
          powderblue: 11591910,
          purple: 8388736,
          rebeccapurple: 6697881,
          red: 16711680,
          rosybrown: 12357519,
          royalblue: 4286945,
          saddlebrown: 9127187,
          salmon: 16416882,
          sandybrown: 16032864,
          seagreen: 3050327,
          seashell: 16774638,
          sienna: 10506797,
          silver: 12632256,
          skyblue: 8900331,
          slateblue: 6970061,
          slategray: 7372944,
          slategrey: 7372944,
          snow: 16775930,
          springgreen: 65407,
          steelblue: 4620980,
          tan: 13808780,
          teal: 32896,
          thistle: 14204888,
          tomato: 16737095,
          turquoise: 4251856,
          violet: 15631086,
          wheat: 16113331,
          white: 16777215,
          whitesmoke: 16119285,
          yellow: 16776960,
          yellowgreen: 10145074,
        };
      function Bt() {
        return this.rgb().formatHex();
      }
      function Dt() {
        return this.rgb().formatRgb();
      }
      function Rt(t) {
        var n, e;
        return (
          (t = (t + "").trim().toLowerCase()),
          (n = Ct.exec(t))
            ? ((e = n[1].length),
              (n = parseInt(n[1], 16)),
              6 === e
                ? Ht(n)
                : 3 === e
                ? new Ut(
                    ((n >> 8) & 15) | ((n >> 4) & 240),
                    ((n >> 4) & 15) | (240 & n),
                    ((15 & n) << 4) | (15 & n),
                    1
                  )
                : 8 === e
                ? It(
                    (n >> 24) & 255,
                    (n >> 16) & 255,
                    (n >> 8) & 255,
                    (255 & n) / 255
                  )
                : 4 === e
                ? It(
                    ((n >> 12) & 15) | ((n >> 8) & 240),
                    ((n >> 8) & 15) | ((n >> 4) & 240),
                    ((n >> 4) & 15) | (240 & n),
                    (((15 & n) << 4) | (15 & n)) / 255
                  )
                : null)
            : (n = $t.exec(t))
            ? new Ut(n[1], n[2], n[3], 1)
            : (n = Lt.exec(t))
            ? new Ut(
                (255 * n[1]) / 100,
                (255 * n[2]) / 100,
                (255 * n[3]) / 100,
                1
              )
            : (n = Pt.exec(t))
            ? It(n[1], n[2], n[3], n[4])
            : (n = qt.exec(t))
            ? It(
                (255 * n[1]) / 100,
                (255 * n[2]) / 100,
                (255 * n[3]) / 100,
                n[4]
              )
            : (n = Ot.exec(t))
            ? Jt(n[1], n[2] / 100, n[3] / 100, 1)
            : (n = jt.exec(t))
            ? Jt(n[1], n[2] / 100, n[3] / 100, n[4])
            : Tt.hasOwnProperty(t)
            ? Ht(Tt[t])
            : "transparent" === t
            ? new Ut(NaN, NaN, NaN, 0)
            : null
        );
      }
      function Ht(t) {
        return new Ut((t >> 16) & 255, (t >> 8) & 255, 255 & t, 1);
      }
      function It(t, n, e, r) {
        return r <= 0 && (t = n = e = NaN), new Ut(t, n, e, r);
      }
      function Xt(t) {
        return (
          t instanceof Et || (t = Rt(t)),
          t ? new Ut((t = t.rgb()).r, t.g, t.b, t.opacity) : new Ut()
        );
      }
      function Vt(t, n, e, r) {
        return 1 === arguments.length
          ? Xt(t)
          : new Ut(t, n, e, null == r ? 1 : r);
      }
      function Ut(t, n, e, r) {
        (this.r = +t), (this.g = +n), (this.b = +e), (this.opacity = +r);
      }
      function zt() {
        return `#${Wt(this.r)}${Wt(this.g)}${Wt(this.b)}`;
      }
      function Yt() {
        const t = Ft(this.opacity);
        return `${1 === t ? "rgb(" : "rgba("}${Qt(this.r)}, ${Qt(this.g)}, ${Qt(
          this.b
        )}${1 === t ? ")" : `, ${t})`}`;
      }
      function Ft(t) {
        return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
      }
      function Qt(t) {
        return Math.max(0, Math.min(255, Math.round(t) || 0));
      }
      function Wt(t) {
        return ((t = Qt(t)) < 16 ? "0" : "") + t.toString(16);
      }
      function Jt(t, n, e, r) {
        return (
          r <= 0
            ? (t = n = e = NaN)
            : e <= 0 || e >= 1
            ? (t = n = NaN)
            : n <= 0 && (t = NaN),
          new Gt(t, n, e, r)
        );
      }
      function Kt(t) {
        if (t instanceof Gt) return new Gt(t.h, t.s, t.l, t.opacity);
        if ((t instanceof Et || (t = Rt(t)), !t)) return new Gt();
        if (t instanceof Gt) return t;
        var n = (t = t.rgb()).r / 255,
          e = t.g / 255,
          r = t.b / 255,
          i = Math.min(n, e, r),
          o = Math.max(n, e, r),
          u = NaN,
          a = o - i,
          s = (o + i) / 2;
        return (
          a
            ? ((u =
                n === o
                  ? (e - r) / a + 6 * (e < r)
                  : e === o
                  ? (r - n) / a + 2
                  : (n - e) / a + 4),
              (a /= s < 0.5 ? o + i : 2 - o - i),
              (u *= 60))
            : (a = s > 0 && s < 1 ? 0 : u),
          new Gt(u, a, s, t.opacity)
        );
      }
      function Gt(t, n, e, r) {
        (this.h = +t), (this.s = +n), (this.l = +e), (this.opacity = +r);
      }
      function Zt(t) {
        return (t = (t || 0) % 360) < 0 ? t + 360 : t;
      }
      function tn(t) {
        return Math.max(0, Math.min(1, t || 0));
      }
      function nn(t, n, e) {
        return (
          255 *
          (t < 60
            ? n + ((e - n) * t) / 60
            : t < 180
            ? e
            : t < 240
            ? n + ((e - n) * (240 - t)) / 60
            : n)
        );
      }
      function en(t, n, e, r, i) {
        var o = t * t,
          u = o * t;
        return (
          ((1 - 3 * t + 3 * o - u) * n +
            (4 - 6 * o + 3 * u) * e +
            (1 + 3 * t + 3 * o - 3 * u) * r +
            u * i) /
          6
        );
      }
      At(Et, Rt, {
        copy(t) {
          return Object.assign(new this.constructor(), this, t);
        },
        displayable() {
          return this.rgb().displayable();
        },
        hex: Bt,
        formatHex: Bt,
        formatHex8: function () {
          return this.rgb().formatHex8();
        },
        formatHsl: function () {
          return Kt(this).formatHsl();
        },
        formatRgb: Dt,
        toString: Dt,
      }),
        At(
          Ut,
          Vt,
          Nt(Et, {
            brighter(t) {
              return (
                (t = null == t ? 1 / 0.7 : Math.pow(1 / 0.7, t)),
                new Ut(this.r * t, this.g * t, this.b * t, this.opacity)
              );
            },
            darker(t) {
              return (
                (t = null == t ? 0.7 : Math.pow(0.7, t)),
                new Ut(this.r * t, this.g * t, this.b * t, this.opacity)
              );
            },
            rgb() {
              return this;
            },
            clamp() {
              return new Ut(
                Qt(this.r),
                Qt(this.g),
                Qt(this.b),
                Ft(this.opacity)
              );
            },
            displayable() {
              return (
                -0.5 <= this.r &&
                this.r < 255.5 &&
                -0.5 <= this.g &&
                this.g < 255.5 &&
                -0.5 <= this.b &&
                this.b < 255.5 &&
                0 <= this.opacity &&
                this.opacity <= 1
              );
            },
            hex: zt,
            formatHex: zt,
            formatHex8: function () {
              return `#${Wt(this.r)}${Wt(this.g)}${Wt(this.b)}${Wt(
                255 * (isNaN(this.opacity) ? 1 : this.opacity)
              )}`;
            },
            formatRgb: Yt,
            toString: Yt,
          })
        ),
        At(
          Gt,
          function (t, n, e, r) {
            return 1 === arguments.length
              ? Kt(t)
              : new Gt(t, n, e, null == r ? 1 : r);
          },
          Nt(Et, {
            brighter(t) {
              return (
                (t = null == t ? 1 / 0.7 : Math.pow(1 / 0.7, t)),
                new Gt(this.h, this.s, this.l * t, this.opacity)
              );
            },
            darker(t) {
              return (
                (t = null == t ? 0.7 : Math.pow(0.7, t)),
                new Gt(this.h, this.s, this.l * t, this.opacity)
              );
            },
            rgb() {
              var t = (this.h % 360) + 360 * (this.h < 0),
                n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
                e = this.l,
                r = e + (e < 0.5 ? e : 1 - e) * n,
                i = 2 * e - r;
              return new Ut(
                nn(t >= 240 ? t - 240 : t + 120, i, r),
                nn(t, i, r),
                nn(t < 120 ? t + 240 : t - 120, i, r),
                this.opacity
              );
            },
            clamp() {
              return new Gt(
                Zt(this.h),
                tn(this.s),
                tn(this.l),
                Ft(this.opacity)
              );
            },
            displayable() {
              return (
                ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
                0 <= this.l &&
                this.l <= 1 &&
                0 <= this.opacity &&
                this.opacity <= 1
              );
            },
            formatHsl() {
              const t = Ft(this.opacity);
              return `${1 === t ? "hsl(" : "hsla("}${Zt(this.h)}, ${
                100 * tn(this.s)
              }%, ${100 * tn(this.l)}%${1 === t ? ")" : `, ${t})`}`;
            },
          })
        );
      var rn = (t) => () => t;
      function on(t, n) {
        return function (e) {
          return t + e * n;
        };
      }
      function un(t) {
        return 1 == (t = +t)
          ? an
          : function (n, e) {
              return e - n
                ? (function (t, n, e) {
                    return (
                      (t = Math.pow(t, e)),
                      (n = Math.pow(n, e) - t),
                      (e = 1 / e),
                      function (r) {
                        return Math.pow(t + r * n, e);
                      }
                    );
                  })(n, e, t)
                : rn(isNaN(n) ? e : n);
            };
      }
      function an(t, n) {
        var e = n - t;
        return e ? on(t, e) : rn(isNaN(t) ? n : t);
      }
      var sn = (function t(n) {
        var e = un(n);
        function r(t, n) {
          var r = e((t = Vt(t)).r, (n = Vt(n)).r),
            i = e(t.g, n.g),
            o = e(t.b, n.b),
            u = an(t.opacity, n.opacity);
          return function (n) {
            return (
              (t.r = r(n)),
              (t.g = i(n)),
              (t.b = o(n)),
              (t.opacity = u(n)),
              t + ""
            );
          };
        }
        return (r.gamma = t), r;
      })(1);
      function ln(t) {
        return function (n) {
          var e,
            r,
            i = n.length,
            o = new Array(i),
            u = new Array(i),
            a = new Array(i);
          for (e = 0; e < i; ++e)
            (r = Vt(n[e])),
              (o[e] = r.r || 0),
              (u[e] = r.g || 0),
              (a[e] = r.b || 0);
          return (
            (o = t(o)),
            (u = t(u)),
            (a = t(a)),
            (r.opacity = 1),
            function (t) {
              return (r.r = o(t)), (r.g = u(t)), (r.b = a(t)), r + "";
            }
          );
        };
      }
      ln(function (t) {
        var n = t.length - 1;
        return function (e) {
          var r =
              e <= 0 ? (e = 0) : e >= 1 ? ((e = 1), n - 1) : Math.floor(e * n),
            i = t[r],
            o = t[r + 1],
            u = r > 0 ? t[r - 1] : 2 * i - o,
            a = r < n - 1 ? t[r + 2] : 2 * o - i;
          return en((e - r / n) * n, u, i, o, a);
        };
      }),
        ln(function (t) {
          var n = t.length;
          return function (e) {
            var r = Math.floor(((e %= 1) < 0 ? ++e : e) * n),
              i = t[(r + n - 1) % n],
              o = t[r % n],
              u = t[(r + 1) % n],
              a = t[(r + 2) % n];
            return en((e - r / n) * n, i, o, u, a);
          };
        });
      var cn = function (t, n) {
          return (
            (t = +t),
            (n = +n),
            function (e) {
              return t * (1 - e) + n * e;
            }
          );
        },
        fn = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
        hn = new RegExp(fn.source, "g");
      var pn = function (t, n) {
        var e,
          r,
          i,
          o = (fn.lastIndex = hn.lastIndex = 0),
          u = -1,
          a = [],
          s = [];
        for (t += "", n += ""; (e = fn.exec(t)) && (r = hn.exec(n)); )
          (i = r.index) > o &&
            ((i = n.slice(o, i)), a[u] ? (a[u] += i) : (a[++u] = i)),
            (e = e[0]) === (r = r[0])
              ? a[u]
                ? (a[u] += r)
                : (a[++u] = r)
              : ((a[++u] = null), s.push({ i: u, x: cn(e, r) })),
            (o = hn.lastIndex);
        return (
          o < n.length && ((i = n.slice(o)), a[u] ? (a[u] += i) : (a[++u] = i)),
          a.length < 2
            ? s[0]
              ? (function (t) {
                  return function (n) {
                    return t(n) + "";
                  };
                })(s[0].x)
              : (function (t) {
                  return function () {
                    return t;
                  };
                })(n)
            : ((n = s.length),
              function (t) {
                for (var e, r = 0; r < n; ++r) a[(e = s[r]).i] = e.x(t);
                return a.join("");
              })
        );
      };
      function dn() {}
      var _n = function (t) {
        return null == t
          ? dn
          : function () {
              return this.querySelector(t);
            };
      };
      function yn(t) {
        return null == t ? [] : Array.isArray(t) ? t : Array.from(t);
      }
      function vn() {
        return [];
      }
      function gn(t) {
        return function (n) {
          return n.matches(t);
        };
      }
      var mn = Array.prototype.find;
      function wn() {
        return this.firstElementChild;
      }
      var bn = Array.prototype.filter;
      function xn() {
        return Array.from(this.children);
      }
      var An = function (t) {
        return new Array(t.length);
      };
      function Nn(t, n) {
        (this.ownerDocument = t.ownerDocument),
          (this.namespaceURI = t.namespaceURI),
          (this._next = null),
          (this._parent = t),
          (this.__data__ = n);
      }
      Nn.prototype = {
        constructor: Nn,
        appendChild: function (t) {
          return this._parent.insertBefore(t, this._next);
        },
        insertBefore: function (t, n) {
          return this._parent.insertBefore(t, n);
        },
        querySelector: function (t) {
          return this._parent.querySelector(t);
        },
        querySelectorAll: function (t) {
          return this._parent.querySelectorAll(t);
        },
      };
      var En = function (t) {
        return function () {
          return t;
        };
      };
      function Sn(t, n, e, r, i, o) {
        for (var u, a = 0, s = n.length, l = o.length; a < l; ++a)
          (u = n[a])
            ? ((u.__data__ = o[a]), (r[a] = u))
            : (e[a] = new Nn(t, o[a]));
        for (; a < s; ++a) (u = n[a]) && (i[a] = u);
      }
      function kn(t, n, e, r, i, o, u) {
        var a,
          s,
          l,
          c = new Map(),
          f = n.length,
          h = o.length,
          p = new Array(f);
        for (a = 0; a < f; ++a)
          (s = n[a]) &&
            ((p[a] = l = u.call(s, s.__data__, a, n) + ""),
            c.has(l) ? (i[a] = s) : c.set(l, s));
        for (a = 0; a < h; ++a)
          (l = u.call(t, o[a], a, o) + ""),
            (s = c.get(l))
              ? ((r[a] = s), (s.__data__ = o[a]), c.delete(l))
              : (e[a] = new Nn(t, o[a]));
        for (a = 0; a < f; ++a) (s = n[a]) && c.get(p[a]) === s && (i[a] = s);
      }
      function Mn(t) {
        return t.__data__;
      }
      function Cn(t) {
        return "object" == typeof t && "length" in t ? t : Array.from(t);
      }
      function $n(t, n) {
        return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
      }
      var Ln = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
        },
        Pn = function (t) {
          var n = (t += ""),
            e = n.indexOf(":");
          return (
            e >= 0 && "xmlns" !== (n = t.slice(0, e)) && (t = t.slice(e + 1)),
            Ln.hasOwnProperty(n) ? { space: Ln[n], local: t } : t
          );
        };
      function qn(t) {
        return function () {
          this.removeAttribute(t);
        };
      }
      function On(t) {
        return function () {
          this.removeAttributeNS(t.space, t.local);
        };
      }
      function jn(t, n) {
        return function () {
          this.setAttribute(t, n);
        };
      }
      function Tn(t, n) {
        return function () {
          this.setAttributeNS(t.space, t.local, n);
        };
      }
      function Bn(t, n) {
        return function () {
          var e = n.apply(this, arguments);
          null == e ? this.removeAttribute(t) : this.setAttribute(t, e);
        };
      }
      function Dn(t, n) {
        return function () {
          var e = n.apply(this, arguments);
          null == e
            ? this.removeAttributeNS(t.space, t.local)
            : this.setAttributeNS(t.space, t.local, e);
        };
      }
      var Rn = function (t) {
        return (
          (t.ownerDocument && t.ownerDocument.defaultView) ||
          (t.document && t) ||
          t.defaultView
        );
      };
      function Hn(t) {
        return function () {
          this.style.removeProperty(t);
        };
      }
      function In(t, n, e) {
        return function () {
          this.style.setProperty(t, n, e);
        };
      }
      function Xn(t, n, e) {
        return function () {
          var r = n.apply(this, arguments);
          null == r
            ? this.style.removeProperty(t)
            : this.style.setProperty(t, r, e);
        };
      }
      function Vn(t, n) {
        return (
          t.style.getPropertyValue(n) ||
          Rn(t).getComputedStyle(t, null).getPropertyValue(n)
        );
      }
      function Un(t) {
        return function () {
          delete this[t];
        };
      }
      function zn(t, n) {
        return function () {
          this[t] = n;
        };
      }
      function Yn(t, n) {
        return function () {
          var e = n.apply(this, arguments);
          null == e ? delete this[t] : (this[t] = e);
        };
      }
      function Fn(t) {
        return t.trim().split(/^|\s+/);
      }
      function Qn(t) {
        return t.classList || new Wn(t);
      }
      function Wn(t) {
        (this._node = t), (this._names = Fn(t.getAttribute("class") || ""));
      }
      function Jn(t, n) {
        for (var e = Qn(t), r = -1, i = n.length; ++r < i; ) e.add(n[r]);
      }
      function Kn(t, n) {
        for (var e = Qn(t), r = -1, i = n.length; ++r < i; ) e.remove(n[r]);
      }
      function Gn(t) {
        return function () {
          Jn(this, t);
        };
      }
      function Zn(t) {
        return function () {
          Kn(this, t);
        };
      }
      function te(t, n) {
        return function () {
          (n.apply(this, arguments) ? Jn : Kn)(this, t);
        };
      }
      Wn.prototype = {
        add: function (t) {
          this._names.indexOf(t) < 0 &&
            (this._names.push(t),
            this._node.setAttribute("class", this._names.join(" ")));
        },
        remove: function (t) {
          var n = this._names.indexOf(t);
          n >= 0 &&
            (this._names.splice(n, 1),
            this._node.setAttribute("class", this._names.join(" ")));
        },
        contains: function (t) {
          return this._names.indexOf(t) >= 0;
        },
      };
      function ne() {
        this.textContent = "";
      }
      function ee(t) {
        return function () {
          this.textContent = t;
        };
      }
      function re(t) {
        return function () {
          var n = t.apply(this, arguments);
          this.textContent = null == n ? "" : n;
        };
      }
      function ie() {
        this.innerHTML = "";
      }
      function oe(t) {
        return function () {
          this.innerHTML = t;
        };
      }
      function ue(t) {
        return function () {
          var n = t.apply(this, arguments);
          this.innerHTML = null == n ? "" : n;
        };
      }
      function ae() {
        this.nextSibling && this.parentNode.appendChild(this);
      }
      function se() {
        this.previousSibling &&
          this.parentNode.insertBefore(this, this.parentNode.firstChild);
      }
      function le(t) {
        return function () {
          var n = this.ownerDocument,
            e = this.namespaceURI;
          return "http://www.w3.org/1999/xhtml" === e &&
            "http://www.w3.org/1999/xhtml" === n.documentElement.namespaceURI
            ? n.createElement(t)
            : n.createElementNS(e, t);
        };
      }
      function ce(t) {
        return function () {
          return this.ownerDocument.createElementNS(t.space, t.local);
        };
      }
      var fe = function (t) {
        var n = Pn(t);
        return (n.local ? ce : le)(n);
      };
      function he() {
        return null;
      }
      function pe() {
        var t = this.parentNode;
        t && t.removeChild(this);
      }
      function de() {
        var t = this.cloneNode(!1),
          n = this.parentNode;
        return n ? n.insertBefore(t, this.nextSibling) : t;
      }
      function _e() {
        var t = this.cloneNode(!0),
          n = this.parentNode;
        return n ? n.insertBefore(t, this.nextSibling) : t;
      }
      function ye(t) {
        return t
          .trim()
          .split(/^|\s+/)
          .map(function (t) {
            var n = "",
              e = t.indexOf(".");
            return (
              e >= 0 && ((n = t.slice(e + 1)), (t = t.slice(0, e))),
              { type: t, name: n }
            );
          });
      }
      function ve(t) {
        return function () {
          var n = this.__on;
          if (n) {
            for (var e, r = 0, i = -1, o = n.length; r < o; ++r)
              (e = n[r]),
                (t.type && e.type !== t.type) || e.name !== t.name
                  ? (n[++i] = e)
                  : this.removeEventListener(e.type, e.listener, e.options);
            ++i ? (n.length = i) : delete this.__on;
          }
        };
      }
      function ge(t, n, e) {
        return function () {
          var r,
            i = this.__on,
            o = (function (t) {
              return function (n) {
                t.call(this, n, this.__data__);
              };
            })(n);
          if (i)
            for (var u = 0, a = i.length; u < a; ++u)
              if ((r = i[u]).type === t.type && r.name === t.name)
                return (
                  this.removeEventListener(r.type, r.listener, r.options),
                  this.addEventListener(
                    r.type,
                    (r.listener = o),
                    (r.options = e)
                  ),
                  void (r.value = n)
                );
          this.addEventListener(t.type, o, e),
            (r = {
              type: t.type,
              name: t.name,
              value: n,
              listener: o,
              options: e,
            }),
            i ? i.push(r) : (this.__on = [r]);
        };
      }
      function me(t, n, e) {
        var r = Rn(t),
          i = r.CustomEvent;
        "function" == typeof i
          ? (i = new i(n, e))
          : ((i = r.document.createEvent("Event")),
            e
              ? (i.initEvent(n, e.bubbles, e.cancelable), (i.detail = e.detail))
              : i.initEvent(n, !1, !1)),
          t.dispatchEvent(i);
      }
      function we(t, n) {
        return function () {
          return me(this, t, n);
        };
      }
      function be(t, n) {
        return function () {
          return me(this, t, n.apply(this, arguments));
        };
      }
      var xe = [null];
      function Ae(t, n) {
        (this._groups = t), (this._parents = n);
      }
      function Ne() {
        return new Ae([[document.documentElement]], xe);
      }
      Ae.prototype = Ne.prototype = {
        constructor: Ae,
        select: function (t) {
          "function" != typeof t && (t = _n(t));
          for (
            var n = this._groups, e = n.length, r = new Array(e), i = 0;
            i < e;
            ++i
          )
            for (
              var o,
                u,
                a = n[i],
                s = a.length,
                l = (r[i] = new Array(s)),
                c = 0;
              c < s;
              ++c
            )
              (o = a[c]) &&
                (u = t.call(o, o.__data__, c, a)) &&
                ("__data__" in o && (u.__data__ = o.__data__), (l[c] = u));
          return new Ae(r, this._parents);
        },
        selectAll: function (t) {
          var n;
          "function" == typeof t
            ? (t = (function (t) {
                return function () {
                  return yn(t.apply(this, arguments));
                };
              })(t))
            : (t =
                null == (n = t)
                  ? vn
                  : function () {
                      return this.querySelectorAll(n);
                    });
          for (
            var e = this._groups, r = e.length, i = [], o = [], u = 0;
            u < r;
            ++u
          )
            for (var a, s = e[u], l = s.length, c = 0; c < l; ++c)
              (a = s[c]) && (i.push(t.call(a, a.__data__, c, s)), o.push(a));
          return new Ae(i, o);
        },
        selectChild: function (t) {
          return this.select(
            null == t
              ? wn
              : (function (t) {
                  return function () {
                    return mn.call(this.children, t);
                  };
                })("function" == typeof t ? t : gn(t))
          );
        },
        selectChildren: function (t) {
          return this.selectAll(
            null == t
              ? xn
              : (function (t) {
                  return function () {
                    return bn.call(this.children, t);
                  };
                })("function" == typeof t ? t : gn(t))
          );
        },
        filter: function (t) {
          var n;
          "function" != typeof t &&
            ((n = t),
            (t = function () {
              return this.matches(n);
            }));
          for (
            var e = this._groups, r = e.length, i = new Array(r), o = 0;
            o < r;
            ++o
          )
            for (
              var u, a = e[o], s = a.length, l = (i[o] = []), c = 0;
              c < s;
              ++c
            )
              (u = a[c]) && t.call(u, u.__data__, c, a) && l.push(u);
          return new Ae(i, this._parents);
        },
        data: function (t, n) {
          if (!arguments.length) return Array.from(this, Mn);
          var e = n ? kn : Sn,
            r = this._parents,
            i = this._groups;
          "function" != typeof t && (t = En(t));
          for (
            var o = i.length,
              u = new Array(o),
              a = new Array(o),
              s = new Array(o),
              l = 0;
            l < o;
            ++l
          ) {
            var c = r[l],
              f = i[l],
              h = f.length,
              p = Cn(t.call(c, c && c.__data__, l, r)),
              d = p.length,
              _ = (a[l] = new Array(d)),
              y = (u[l] = new Array(d)),
              v = (s[l] = new Array(h));
            e(c, f, _, y, v, p, n);
            for (var g, m, w = 0, b = 0; w < d; ++w)
              if ((g = _[w])) {
                for (w >= b && (b = w + 1); !(m = y[b]) && ++b < d; );
                g._next = m || null;
              }
          }
          return ((u = new Ae(u, r))._enter = a), (u._exit = s), u;
        },
        enter: function () {
          return new Ae(this._enter || this._groups.map(An), this._parents);
        },
        exit: function () {
          return new Ae(this._exit || this._groups.map(An), this._parents);
        },
        join: function (t, n, e) {
          var r = this.enter(),
            i = this,
            o = this.exit();
          return (
            "function" == typeof t
              ? (r = t(r)) && (r = r.selection())
              : (r = r.append(t + "")),
            null != n && (i = n(i)) && (i = i.selection()),
            null == e ? o.remove() : e(o),
            r && i ? r.merge(i).order() : i
          );
        },
        merge: function (t) {
          for (
            var n = t.selection ? t.selection() : t,
              e = this._groups,
              r = n._groups,
              i = e.length,
              o = r.length,
              u = Math.min(i, o),
              a = new Array(i),
              s = 0;
            s < u;
            ++s
          )
            for (
              var l,
                c = e[s],
                f = r[s],
                h = c.length,
                p = (a[s] = new Array(h)),
                d = 0;
              d < h;
              ++d
            )
              (l = c[d] || f[d]) && (p[d] = l);
          for (; s < i; ++s) a[s] = e[s];
          return new Ae(a, this._parents);
        },
        selection: function () {
          return this;
        },
        order: function () {
          for (var t = this._groups, n = -1, e = t.length; ++n < e; )
            for (var r, i = t[n], o = i.length - 1, u = i[o]; --o >= 0; )
              (r = i[o]) &&
                (u &&
                  4 ^ r.compareDocumentPosition(u) &&
                  u.parentNode.insertBefore(r, u),
                (u = r));
          return this;
        },
        sort: function (t) {
          function n(n, e) {
            return n && e ? t(n.__data__, e.__data__) : !n - !e;
          }
          t || (t = $n);
          for (
            var e = this._groups, r = e.length, i = new Array(r), o = 0;
            o < r;
            ++o
          ) {
            for (
              var u, a = e[o], s = a.length, l = (i[o] = new Array(s)), c = 0;
              c < s;
              ++c
            )
              (u = a[c]) && (l[c] = u);
            l.sort(n);
          }
          return new Ae(i, this._parents).order();
        },
        call: function () {
          var t = arguments[0];
          return (arguments[0] = this), t.apply(null, arguments), this;
        },
        nodes: function () {
          return Array.from(this);
        },
        node: function () {
          for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
            for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
              var u = r[i];
              if (u) return u;
            }
          return null;
        },
        size: function () {
          let t = 0;
          for (const n of this) ++t;
          return t;
        },
        empty: function () {
          return !this.node();
        },
        each: function (t) {
          for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
            for (var i, o = n[e], u = 0, a = o.length; u < a; ++u)
              (i = o[u]) && t.call(i, i.__data__, u, o);
          return this;
        },
        attr: function (t, n) {
          var e = Pn(t);
          if (arguments.length < 2) {
            var r = this.node();
            return e.local
              ? r.getAttributeNS(e.space, e.local)
              : r.getAttribute(e);
          }
          return this.each(
            (null == n
              ? e.local
                ? On
                : qn
              : "function" == typeof n
              ? e.local
                ? Dn
                : Bn
              : e.local
              ? Tn
              : jn)(e, n)
          );
        },
        style: function (t, n, e) {
          return arguments.length > 1
            ? this.each(
                (null == n ? Hn : "function" == typeof n ? Xn : In)(
                  t,
                  n,
                  null == e ? "" : e
                )
              )
            : Vn(this.node(), t);
        },
        property: function (t, n) {
          return arguments.length > 1
            ? this.each(
                (null == n ? Un : "function" == typeof n ? Yn : zn)(t, n)
              )
            : this.node()[t];
        },
        classed: function (t, n) {
          var e = Fn(t + "");
          if (arguments.length < 2) {
            for (var r = Qn(this.node()), i = -1, o = e.length; ++i < o; )
              if (!r.contains(e[i])) return !1;
            return !0;
          }
          return this.each(("function" == typeof n ? te : n ? Gn : Zn)(e, n));
        },
        text: function (t) {
          return arguments.length
            ? this.each(null == t ? ne : ("function" == typeof t ? re : ee)(t))
            : this.node().textContent;
        },
        html: function (t) {
          return arguments.length
            ? this.each(null == t ? ie : ("function" == typeof t ? ue : oe)(t))
            : this.node().innerHTML;
        },
        raise: function () {
          return this.each(ae);
        },
        lower: function () {
          return this.each(se);
        },
        append: function (t) {
          var n = "function" == typeof t ? t : fe(t);
          return this.select(function () {
            return this.appendChild(n.apply(this, arguments));
          });
        },
        insert: function (t, n) {
          var e = "function" == typeof t ? t : fe(t),
            r = null == n ? he : "function" == typeof n ? n : _n(n);
          return this.select(function () {
            return this.insertBefore(
              e.apply(this, arguments),
              r.apply(this, arguments) || null
            );
          });
        },
        remove: function () {
          return this.each(pe);
        },
        clone: function (t) {
          return this.select(t ? _e : de);
        },
        datum: function (t) {
          return arguments.length
            ? this.property("__data__", t)
            : this.node().__data__;
        },
        on: function (t, n, e) {
          var r,
            i,
            o = ye(t + ""),
            u = o.length;
          if (!(arguments.length < 2)) {
            for (a = n ? ge : ve, r = 0; r < u; ++r) this.each(a(o[r], n, e));
            return this;
          }
          var a = this.node().__on;
          if (a)
            for (var s, l = 0, c = a.length; l < c; ++l)
              for (r = 0, s = a[l]; r < u; ++r)
                if ((i = o[r]).type === s.type && i.name === s.name)
                  return s.value;
        },
        dispatch: function (t, n) {
          return this.each(("function" == typeof n ? be : we)(t, n));
        },
        [Symbol.iterator]: function* () {
          for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
            for (var r, i = t[n], o = 0, u = i.length; o < u; ++o)
              (r = i[o]) && (yield r);
        },
      };
      function Ee() {}
      var Se = function (t) {
          return null == t
            ? Ee
            : function () {
                return this.querySelector(t);
              };
        },
        ke = function (t) {
          return "object" == typeof t && "length" in t ? t : Array.from(t);
        };
      function Me() {
        return [];
      }
      var Ce = function (t) {
        return null == t
          ? Me
          : function () {
              return this.querySelectorAll(t);
            };
      };
      var $e = function (t) {
        return function () {
          return this.matches(t);
        };
      };
      function Le(t) {
        return function (n) {
          return n.matches(t);
        };
      }
      var Pe = Array.prototype.find;
      function qe() {
        return this.firstElementChild;
      }
      var Oe = Array.prototype.filter;
      function je() {
        return this.children;
      }
      var Te = function (t) {
        return new Array(t.length);
      };
      function Be(t, n) {
        (this.ownerDocument = t.ownerDocument),
          (this.namespaceURI = t.namespaceURI),
          (this._next = null),
          (this._parent = t),
          (this.__data__ = n);
      }
      Be.prototype = {
        constructor: Be,
        appendChild: function (t) {
          return this._parent.insertBefore(t, this._next);
        },
        insertBefore: function (t, n) {
          return this._parent.insertBefore(t, n);
        },
        querySelector: function (t) {
          return this._parent.querySelector(t);
        },
        querySelectorAll: function (t) {
          return this._parent.querySelectorAll(t);
        },
      };
      var De = function (t) {
        return function () {
          return t;
        };
      };
      function Re(t, n, e, r, i, o) {
        for (var u, a = 0, s = n.length, l = o.length; a < l; ++a)
          (u = n[a])
            ? ((u.__data__ = o[a]), (r[a] = u))
            : (e[a] = new Be(t, o[a]));
        for (; a < s; ++a) (u = n[a]) && (i[a] = u);
      }
      function He(t, n, e, r, i, o, u) {
        var a,
          s,
          l,
          c = new Map(),
          f = n.length,
          h = o.length,
          p = new Array(f);
        for (a = 0; a < f; ++a)
          (s = n[a]) &&
            ((p[a] = l = u.call(s, s.__data__, a, n) + ""),
            c.has(l) ? (i[a] = s) : c.set(l, s));
        for (a = 0; a < h; ++a)
          (l = u.call(t, o[a], a, o) + ""),
            (s = c.get(l))
              ? ((r[a] = s), (s.__data__ = o[a]), c.delete(l))
              : (e[a] = new Be(t, o[a]));
        for (a = 0; a < f; ++a) (s = n[a]) && c.get(p[a]) === s && (i[a] = s);
      }
      function Ie(t) {
        return t.__data__;
      }
      function Xe(t, n) {
        return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
      }
      var Ve = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
        },
        Ue = function (t) {
          var n = (t += ""),
            e = n.indexOf(":");
          return (
            e >= 0 && "xmlns" !== (n = t.slice(0, e)) && (t = t.slice(e + 1)),
            Ve.hasOwnProperty(n) ? { space: Ve[n], local: t } : t
          );
        };
      function ze(t) {
        return function () {
          this.removeAttribute(t);
        };
      }
      function Ye(t) {
        return function () {
          this.removeAttributeNS(t.space, t.local);
        };
      }
      function Fe(t, n) {
        return function () {
          this.setAttribute(t, n);
        };
      }
      function Qe(t, n) {
        return function () {
          this.setAttributeNS(t.space, t.local, n);
        };
      }
      function We(t, n) {
        return function () {
          var e = n.apply(this, arguments);
          null == e ? this.removeAttribute(t) : this.setAttribute(t, e);
        };
      }
      function Je(t, n) {
        return function () {
          var e = n.apply(this, arguments);
          null == e
            ? this.removeAttributeNS(t.space, t.local)
            : this.setAttributeNS(t.space, t.local, e);
        };
      }
      var Ke = function (t) {
        return (
          (t.ownerDocument && t.ownerDocument.defaultView) ||
          (t.document && t) ||
          t.defaultView
        );
      };
      function Ge(t) {
        return function () {
          this.style.removeProperty(t);
        };
      }
      function Ze(t, n, e) {
        return function () {
          this.style.setProperty(t, n, e);
        };
      }
      function tr(t, n, e) {
        return function () {
          var r = n.apply(this, arguments);
          null == r
            ? this.style.removeProperty(t)
            : this.style.setProperty(t, r, e);
        };
      }
      function nr(t, n) {
        return (
          t.style.getPropertyValue(n) ||
          Ke(t).getComputedStyle(t, null).getPropertyValue(n)
        );
      }
      function er(t) {
        return function () {
          delete this[t];
        };
      }
      function rr(t, n) {
        return function () {
          this[t] = n;
        };
      }
      function ir(t, n) {
        return function () {
          var e = n.apply(this, arguments);
          null == e ? delete this[t] : (this[t] = e);
        };
      }
      function or(t) {
        return t.trim().split(/^|\s+/);
      }
      function ur(t) {
        return t.classList || new ar(t);
      }
      function ar(t) {
        (this._node = t), (this._names = or(t.getAttribute("class") || ""));
      }
      function sr(t, n) {
        for (var e = ur(t), r = -1, i = n.length; ++r < i; ) e.add(n[r]);
      }
      function lr(t, n) {
        for (var e = ur(t), r = -1, i = n.length; ++r < i; ) e.remove(n[r]);
      }
      function cr(t) {
        return function () {
          sr(this, t);
        };
      }
      function fr(t) {
        return function () {
          lr(this, t);
        };
      }
      function hr(t, n) {
        return function () {
          (n.apply(this, arguments) ? sr : lr)(this, t);
        };
      }
      ar.prototype = {
        add: function (t) {
          this._names.indexOf(t) < 0 &&
            (this._names.push(t),
            this._node.setAttribute("class", this._names.join(" ")));
        },
        remove: function (t) {
          var n = this._names.indexOf(t);
          n >= 0 &&
            (this._names.splice(n, 1),
            this._node.setAttribute("class", this._names.join(" ")));
        },
        contains: function (t) {
          return this._names.indexOf(t) >= 0;
        },
      };
      function pr() {
        this.textContent = "";
      }
      function dr(t) {
        return function () {
          this.textContent = t;
        };
      }
      function _r(t) {
        return function () {
          var n = t.apply(this, arguments);
          this.textContent = null == n ? "" : n;
        };
      }
      function yr() {
        this.innerHTML = "";
      }
      function vr(t) {
        return function () {
          this.innerHTML = t;
        };
      }
      function gr(t) {
        return function () {
          var n = t.apply(this, arguments);
          this.innerHTML = null == n ? "" : n;
        };
      }
      function mr() {
        this.nextSibling && this.parentNode.appendChild(this);
      }
      function wr() {
        this.previousSibling &&
          this.parentNode.insertBefore(this, this.parentNode.firstChild);
      }
      function br(t) {
        return function () {
          var n = this.ownerDocument,
            e = this.namespaceURI;
          return "http://www.w3.org/1999/xhtml" === e &&
            "http://www.w3.org/1999/xhtml" === n.documentElement.namespaceURI
            ? n.createElement(t)
            : n.createElementNS(e, t);
        };
      }
      function xr(t) {
        return function () {
          return this.ownerDocument.createElementNS(t.space, t.local);
        };
      }
      var Ar = function (t) {
        var n = Ue(t);
        return (n.local ? xr : br)(n);
      };
      function Nr() {
        return null;
      }
      function Er() {
        var t = this.parentNode;
        t && t.removeChild(this);
      }
      function Sr() {
        var t = this.cloneNode(!1),
          n = this.parentNode;
        return n ? n.insertBefore(t, this.nextSibling) : t;
      }
      function kr() {
        var t = this.cloneNode(!0),
          n = this.parentNode;
        return n ? n.insertBefore(t, this.nextSibling) : t;
      }
      function Mr(t) {
        return t
          .trim()
          .split(/^|\s+/)
          .map(function (t) {
            var n = "",
              e = t.indexOf(".");
            return (
              e >= 0 && ((n = t.slice(e + 1)), (t = t.slice(0, e))),
              { type: t, name: n }
            );
          });
      }
      function Cr(t) {
        return function () {
          var n = this.__on;
          if (n) {
            for (var e, r = 0, i = -1, o = n.length; r < o; ++r)
              (e = n[r]),
                (t.type && e.type !== t.type) || e.name !== t.name
                  ? (n[++i] = e)
                  : this.removeEventListener(e.type, e.listener, e.options);
            ++i ? (n.length = i) : delete this.__on;
          }
        };
      }
      function $r(t, n, e) {
        return function () {
          var r,
            i = this.__on,
            o = (function (t) {
              return function (n) {
                t.call(this, n, this.__data__);
              };
            })(n);
          if (i)
            for (var u = 0, a = i.length; u < a; ++u)
              if ((r = i[u]).type === t.type && r.name === t.name)
                return (
                  this.removeEventListener(r.type, r.listener, r.options),
                  this.addEventListener(
                    r.type,
                    (r.listener = o),
                    (r.options = e)
                  ),
                  void (r.value = n)
                );
          this.addEventListener(t.type, o, e),
            (r = {
              type: t.type,
              name: t.name,
              value: n,
              listener: o,
              options: e,
            }),
            i ? i.push(r) : (this.__on = [r]);
        };
      }
      function Lr(t, n, e) {
        var r = Ke(t),
          i = r.CustomEvent;
        "function" == typeof i
          ? (i = new i(n, e))
          : ((i = r.document.createEvent("Event")),
            e
              ? (i.initEvent(n, e.bubbles, e.cancelable), (i.detail = e.detail))
              : i.initEvent(n, !1, !1)),
          t.dispatchEvent(i);
      }
      function Pr(t, n) {
        return function () {
          return Lr(this, t, n);
        };
      }
      function qr(t, n) {
        return function () {
          return Lr(this, t, n.apply(this, arguments));
        };
      }
      var Or = [null];
      function jr(t, n) {
        (this._groups = t), (this._parents = n);
      }
      function Tr() {
        return new jr([[document.documentElement]], Or);
      }
      jr.prototype = Tr.prototype = {
        constructor: jr,
        select: function (t) {
          "function" != typeof t && (t = Se(t));
          for (
            var n = this._groups, e = n.length, r = new Array(e), i = 0;
            i < e;
            ++i
          )
            for (
              var o,
                u,
                a = n[i],
                s = a.length,
                l = (r[i] = new Array(s)),
                c = 0;
              c < s;
              ++c
            )
              (o = a[c]) &&
                (u = t.call(o, o.__data__, c, a)) &&
                ("__data__" in o && (u.__data__ = o.__data__), (l[c] = u));
          return new jr(r, this._parents);
        },
        selectAll: function (t) {
          t =
            "function" == typeof t
              ? (function (t) {
                  return function () {
                    var n = t.apply(this, arguments);
                    return null == n ? [] : ke(n);
                  };
                })(t)
              : Ce(t);
          for (
            var n = this._groups, e = n.length, r = [], i = [], o = 0;
            o < e;
            ++o
          )
            for (var u, a = n[o], s = a.length, l = 0; l < s; ++l)
              (u = a[l]) && (r.push(t.call(u, u.__data__, l, a)), i.push(u));
          return new jr(r, i);
        },
        selectChild: function (t) {
          return this.select(
            null == t
              ? qe
              : (function (t) {
                  return function () {
                    return Pe.call(this.children, t);
                  };
                })("function" == typeof t ? t : Le(t))
          );
        },
        selectChildren: function (t) {
          return this.selectAll(
            null == t
              ? je
              : (function (t) {
                  return function () {
                    return Oe.call(this.children, t);
                  };
                })("function" == typeof t ? t : Le(t))
          );
        },
        filter: function (t) {
          "function" != typeof t && (t = $e(t));
          for (
            var n = this._groups, e = n.length, r = new Array(e), i = 0;
            i < e;
            ++i
          )
            for (
              var o, u = n[i], a = u.length, s = (r[i] = []), l = 0;
              l < a;
              ++l
            )
              (o = u[l]) && t.call(o, o.__data__, l, u) && s.push(o);
          return new jr(r, this._parents);
        },
        data: function (t, n) {
          if (!arguments.length) return Array.from(this, Ie);
          var e = n ? He : Re,
            r = this._parents,
            i = this._groups;
          "function" != typeof t && (t = De(t));
          for (
            var o = i.length,
              u = new Array(o),
              a = new Array(o),
              s = new Array(o),
              l = 0;
            l < o;
            ++l
          ) {
            var c = r[l],
              f = i[l],
              h = f.length,
              p = ke(t.call(c, c && c.__data__, l, r)),
              d = p.length,
              _ = (a[l] = new Array(d)),
              y = (u[l] = new Array(d)),
              v = (s[l] = new Array(h));
            e(c, f, _, y, v, p, n);
            for (var g, m, w = 0, b = 0; w < d; ++w)
              if ((g = _[w])) {
                for (w >= b && (b = w + 1); !(m = y[b]) && ++b < d; );
                g._next = m || null;
              }
          }
          return ((u = new jr(u, r))._enter = a), (u._exit = s), u;
        },
        enter: function () {
          return new jr(this._enter || this._groups.map(Te), this._parents);
        },
        exit: function () {
          return new jr(this._exit || this._groups.map(Te), this._parents);
        },
        join: function (t, n, e) {
          var r = this.enter(),
            i = this,
            o = this.exit();
          return (
            (r = "function" == typeof t ? t(r) : r.append(t + "")),
            null != n && (i = n(i)),
            null == e ? o.remove() : e(o),
            r && i ? r.merge(i).order() : i
          );
        },
        merge: function (t) {
          if (!(t instanceof jr)) throw new Error("invalid merge");
          for (
            var n = this._groups,
              e = t._groups,
              r = n.length,
              i = e.length,
              o = Math.min(r, i),
              u = new Array(r),
              a = 0;
            a < o;
            ++a
          )
            for (
              var s,
                l = n[a],
                c = e[a],
                f = l.length,
                h = (u[a] = new Array(f)),
                p = 0;
              p < f;
              ++p
            )
              (s = l[p] || c[p]) && (h[p] = s);
          for (; a < r; ++a) u[a] = n[a];
          return new jr(u, this._parents);
        },
        selection: function () {
          return this;
        },
        order: function () {
          for (var t = this._groups, n = -1, e = t.length; ++n < e; )
            for (var r, i = t[n], o = i.length - 1, u = i[o]; --o >= 0; )
              (r = i[o]) &&
                (u &&
                  4 ^ r.compareDocumentPosition(u) &&
                  u.parentNode.insertBefore(r, u),
                (u = r));
          return this;
        },
        sort: function (t) {
          function n(n, e) {
            return n && e ? t(n.__data__, e.__data__) : !n - !e;
          }
          t || (t = Xe);
          for (
            var e = this._groups, r = e.length, i = new Array(r), o = 0;
            o < r;
            ++o
          ) {
            for (
              var u, a = e[o], s = a.length, l = (i[o] = new Array(s)), c = 0;
              c < s;
              ++c
            )
              (u = a[c]) && (l[c] = u);
            l.sort(n);
          }
          return new jr(i, this._parents).order();
        },
        call: function () {
          var t = arguments[0];
          return (arguments[0] = this), t.apply(null, arguments), this;
        },
        nodes: function () {
          return Array.from(this);
        },
        node: function () {
          for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
            for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
              var u = r[i];
              if (u) return u;
            }
          return null;
        },
        size: function () {
          let t = 0;
          for (const n of this) ++t;
          return t;
        },
        empty: function () {
          return !this.node();
        },
        each: function (t) {
          for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
            for (var i, o = n[e], u = 0, a = o.length; u < a; ++u)
              (i = o[u]) && t.call(i, i.__data__, u, o);
          return this;
        },
        attr: function (t, n) {
          var e = Ue(t);
          if (arguments.length < 2) {
            var r = this.node();
            return e.local
              ? r.getAttributeNS(e.space, e.local)
              : r.getAttribute(e);
          }
          return this.each(
            (null == n
              ? e.local
                ? Ye
                : ze
              : "function" == typeof n
              ? e.local
                ? Je
                : We
              : e.local
              ? Qe
              : Fe)(e, n)
          );
        },
        style: function (t, n, e) {
          return arguments.length > 1
            ? this.each(
                (null == n ? Ge : "function" == typeof n ? tr : Ze)(
                  t,
                  n,
                  null == e ? "" : e
                )
              )
            : nr(this.node(), t);
        },
        property: function (t, n) {
          return arguments.length > 1
            ? this.each(
                (null == n ? er : "function" == typeof n ? ir : rr)(t, n)
              )
            : this.node()[t];
        },
        classed: function (t, n) {
          var e = or(t + "");
          if (arguments.length < 2) {
            for (var r = ur(this.node()), i = -1, o = e.length; ++i < o; )
              if (!r.contains(e[i])) return !1;
            return !0;
          }
          return this.each(("function" == typeof n ? hr : n ? cr : fr)(e, n));
        },
        text: function (t) {
          return arguments.length
            ? this.each(null == t ? pr : ("function" == typeof t ? _r : dr)(t))
            : this.node().textContent;
        },
        html: function (t) {
          return arguments.length
            ? this.each(null == t ? yr : ("function" == typeof t ? gr : vr)(t))
            : this.node().innerHTML;
        },
        raise: function () {
          return this.each(mr);
        },
        lower: function () {
          return this.each(wr);
        },
        append: function (t) {
          var n = "function" == typeof t ? t : Ar(t);
          return this.select(function () {
            return this.appendChild(n.apply(this, arguments));
          });
        },
        insert: function (t, n) {
          var e = "function" == typeof t ? t : Ar(t),
            r = null == n ? Nr : "function" == typeof n ? n : Se(n);
          return this.select(function () {
            return this.insertBefore(
              e.apply(this, arguments),
              r.apply(this, arguments) || null
            );
          });
        },
        remove: function () {
          return this.each(Er);
        },
        clone: function (t) {
          return this.select(t ? kr : Sr);
        },
        datum: function (t) {
          return arguments.length
            ? this.property("__data__", t)
            : this.node().__data__;
        },
        on: function (t, n, e) {
          var r,
            i,
            o = Mr(t + ""),
            u = o.length;
          if (!(arguments.length < 2)) {
            for (a = n ? $r : Cr, r = 0; r < u; ++r) this.each(a(o[r], n, e));
            return this;
          }
          var a = this.node().__on;
          if (a)
            for (var s, l = 0, c = a.length; l < c; ++l)
              for (r = 0, s = a[l]; r < u; ++r)
                if ((i = o[r]).type === s.type && i.name === s.name)
                  return s.value;
        },
        dispatch: function (t, n) {
          return this.each(("function" == typeof n ? qr : Pr)(t, n));
        },
        [Symbol.iterator]: function* () {
          for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
            for (var r, i = t[n], o = 0, u = i.length; o < u; ++o)
              (r = i[o]) && (yield r);
        },
      };
      var Br,
        Dr,
        Rr = Tr,
        Hr = 0,
        Ir = 0,
        Xr = 0,
        Vr = 0,
        Ur = 0,
        zr = 0,
        Yr =
          "object" == typeof performance && performance.now
            ? performance
            : Date,
        Fr =
          "object" == typeof window && window.requestAnimationFrame
            ? window.requestAnimationFrame.bind(window)
            : function (t) {
                setTimeout(t, 17);
              };
      function Qr() {
        return Ur || (Fr(Wr), (Ur = Yr.now() + zr));
      }
      function Wr() {
        Ur = 0;
      }
      function Jr() {
        this._call = this._time = this._next = null;
      }
      function Kr(t, n, e) {
        var r = new Jr();
        return r.restart(t, n, e), r;
      }
      function Gr() {
        (Ur = (Vr = Yr.now()) + zr), (Hr = Ir = 0);
        try {
          !(function () {
            Qr(), ++Hr;
            for (var t, n = Br; n; )
              (t = Ur - n._time) >= 0 && n._call.call(void 0, t), (n = n._next);
            --Hr;
          })();
        } finally {
          (Hr = 0),
            (function () {
              var t,
                n,
                e = Br,
                r = 1 / 0;
              for (; e; )
                e._call
                  ? (r > e._time && (r = e._time), (t = e), (e = e._next))
                  : ((n = e._next),
                    (e._next = null),
                    (e = t ? (t._next = n) : (Br = n)));
              (Dr = t), ti(r);
            })(),
            (Ur = 0);
        }
      }
      function Zr() {
        var t = Yr.now(),
          n = t - Vr;
        n > 1e3 && ((zr -= n), (Vr = t));
      }
      function ti(t) {
        Hr ||
          (Ir && (Ir = clearTimeout(Ir)),
          t - Ur > 24
            ? (t < 1 / 0 && (Ir = setTimeout(Gr, t - Yr.now() - zr)),
              Xr && (Xr = clearInterval(Xr)))
            : (Xr || ((Vr = Yr.now()), (Xr = setInterval(Zr, 1e3))),
              (Hr = 1),
              Fr(Gr)));
      }
      Jr.prototype = Kr.prototype = {
        constructor: Jr,
        restart: function (t, n, e) {
          if ("function" != typeof t)
            throw new TypeError("callback is not a function");
          (e = (null == e ? Qr() : +e) + (null == n ? 0 : +n)),
            this._next ||
              Dr === this ||
              (Dr ? (Dr._next = this) : (Br = this), (Dr = this)),
            (this._call = t),
            (this._time = e),
            ti();
        },
        stop: function () {
          this._call && ((this._call = null), (this._time = 1 / 0), ti());
        },
      };
      var ni = function (t, n, e) {
          var r = new Jr();
          return (
            (n = null == n ? 0 : +n),
            r.restart(
              (e) => {
                r.stop(), t(e + n);
              },
              n,
              e
            ),
            r
          );
        },
        ei = c("start", "end", "cancel", "interrupt"),
        ri = [],
        ii = function (t, n, e, r, i, o) {
          var u = t.__transition;
          if (u) {
            if (e in u) return;
          } else t.__transition = {};
          !(function (t, n, e) {
            var r,
              i = t.__transition;
            function o(s) {
              var l, c, f, h;
              if (1 !== e.state) return a();
              for (l in i)
                if ((h = i[l]).name === e.name) {
                  if (3 === h.state) return ni(o);
                  4 === h.state
                    ? ((h.state = 6),
                      h.timer.stop(),
                      h.on.call("interrupt", t, t.__data__, h.index, h.group),
                      delete i[l])
                    : +l < n &&
                      ((h.state = 6),
                      h.timer.stop(),
                      h.on.call("cancel", t, t.__data__, h.index, h.group),
                      delete i[l]);
                }
              if (
                (ni(function () {
                  3 === e.state &&
                    ((e.state = 4), e.timer.restart(u, e.delay, e.time), u(s));
                }),
                (e.state = 2),
                e.on.call("start", t, t.__data__, e.index, e.group),
                2 === e.state)
              ) {
                for (
                  e.state = 3,
                    r = new Array((f = e.tween.length)),
                    l = 0,
                    c = -1;
                  l < f;
                  ++l
                )
                  (h = e.tween[l].value.call(
                    t,
                    t.__data__,
                    e.index,
                    e.group
                  )) && (r[++c] = h);
                r.length = c + 1;
              }
            }
            function u(n) {
              for (
                var i =
                    n < e.duration
                      ? e.ease.call(null, n / e.duration)
                      : (e.timer.restart(a), (e.state = 5), 1),
                  o = -1,
                  u = r.length;
                ++o < u;

              )
                r[o].call(t, i);
              5 === e.state &&
                (e.on.call("end", t, t.__data__, e.index, e.group), a());
            }
            function a() {
              for (var r in ((e.state = 6), e.timer.stop(), delete i[n], i))
                return;
              delete t.__transition;
            }
            (i[n] = e),
              (e.timer = Kr(
                function (t) {
                  (e.state = 1),
                    e.timer.restart(o, e.delay, e.time),
                    e.delay <= t && o(t - e.delay);
                },
                0,
                e.time
              ));
          })(t, e, {
            name: n,
            index: r,
            group: i,
            on: ei,
            tween: ri,
            time: o.time,
            delay: o.delay,
            duration: o.duration,
            ease: o.ease,
            timer: null,
            state: 0,
          });
        };
      function oi(t, n) {
        var e = ai(t, n);
        if (e.state > 0) throw new Error("too late; already scheduled");
        return e;
      }
      function ui(t, n) {
        var e = ai(t, n);
        if (e.state > 3) throw new Error("too late; already running");
        return e;
      }
      function ai(t, n) {
        var e = t.__transition;
        if (!e || !(e = e[n])) throw new Error("transition not found");
        return e;
      }
      var si,
        li = function (t, n) {
          var e,
            r,
            i,
            o = t.__transition,
            u = !0;
          if (o) {
            for (i in ((n = null == n ? null : n + ""), o))
              (e = o[i]).name === n
                ? ((r = e.state > 2 && e.state < 5),
                  (e.state = 6),
                  e.timer.stop(),
                  e.on.call(
                    r ? "interrupt" : "cancel",
                    t,
                    t.__data__,
                    e.index,
                    e.group
                  ),
                  delete o[i])
                : (u = !1);
            u && delete t.__transition;
          }
        },
        ci = 180 / Math.PI,
        fi = {
          translateX: 0,
          translateY: 0,
          rotate: 0,
          skewX: 0,
          scaleX: 1,
          scaleY: 1,
        },
        hi = function (t, n, e, r, i, o) {
          var u, a, s;
          return (
            (u = Math.sqrt(t * t + n * n)) && ((t /= u), (n /= u)),
            (s = t * e + n * r) && ((e -= t * s), (r -= n * s)),
            (a = Math.sqrt(e * e + r * r)) && ((e /= a), (r /= a), (s /= a)),
            t * r < n * e && ((t = -t), (n = -n), (s = -s), (u = -u)),
            {
              translateX: i,
              translateY: o,
              rotate: Math.atan2(n, t) * ci,
              skewX: Math.atan(s) * ci,
              scaleX: u,
              scaleY: a,
            }
          );
        };
      function pi(t, n, e, r) {
        function i(t) {
          return t.length ? t.pop() + " " : "";
        }
        return function (o, u) {
          var a = [],
            s = [];
          return (
            (o = t(o)),
            (u = t(u)),
            (function (t, r, i, o, u, a) {
              if (t !== i || r !== o) {
                var s = u.push("translate(", null, n, null, e);
                a.push({ i: s - 4, x: cn(t, i) }, { i: s - 2, x: cn(r, o) });
              } else (i || o) && u.push("translate(" + i + n + o + e);
            })(o.translateX, o.translateY, u.translateX, u.translateY, a, s),
            (function (t, n, e, o) {
              t !== n
                ? (t - n > 180 ? (n += 360) : n - t > 180 && (t += 360),
                  o.push({
                    i: e.push(i(e) + "rotate(", null, r) - 2,
                    x: cn(t, n),
                  }))
                : n && e.push(i(e) + "rotate(" + n + r);
            })(o.rotate, u.rotate, a, s),
            (function (t, n, e, o) {
              t !== n
                ? o.push({
                    i: e.push(i(e) + "skewX(", null, r) - 2,
                    x: cn(t, n),
                  })
                : n && e.push(i(e) + "skewX(" + n + r);
            })(o.skewX, u.skewX, a, s),
            (function (t, n, e, r, o, u) {
              if (t !== e || n !== r) {
                var a = o.push(i(o) + "scale(", null, ",", null, ")");
                u.push({ i: a - 4, x: cn(t, e) }, { i: a - 2, x: cn(n, r) });
              } else
                (1 === e && 1 === r) ||
                  o.push(i(o) + "scale(" + e + "," + r + ")");
            })(o.scaleX, o.scaleY, u.scaleX, u.scaleY, a, s),
            (o = u = null),
            function (t) {
              for (var n, e = -1, r = s.length; ++e < r; )
                a[(n = s[e]).i] = n.x(t);
              return a.join("");
            }
          );
        };
      }
      var di = pi(
          function (t) {
            const n = new (
              "function" == typeof DOMMatrix ? DOMMatrix : WebKitCSSMatrix
            )(t + "");
            return n.isIdentity ? fi : hi(n.a, n.b, n.c, n.d, n.e, n.f);
          },
          "px, ",
          "px)",
          "deg)"
        ),
        _i = pi(
          function (t) {
            return null == t
              ? fi
              : (si ||
                  (si = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "g"
                  )),
                si.setAttribute("transform", t),
                (t = si.transform.baseVal.consolidate())
                  ? ((t = t.matrix), hi(t.a, t.b, t.c, t.d, t.e, t.f))
                  : fi);
          },
          ", ",
          ")",
          ")"
        );
      function yi(t, n) {
        var e, r;
        return function () {
          var i = ui(this, t),
            o = i.tween;
          if (o !== e)
            for (var u = 0, a = (r = e = o).length; u < a; ++u)
              if (r[u].name === n) {
                (r = r.slice()).splice(u, 1);
                break;
              }
          i.tween = r;
        };
      }
      function vi(t, n, e) {
        var r, i;
        if ("function" != typeof e) throw new Error();
        return function () {
          var o = ui(this, t),
            u = o.tween;
          if (u !== r) {
            i = (r = u).slice();
            for (var a = { name: n, value: e }, s = 0, l = i.length; s < l; ++s)
              if (i[s].name === n) {
                i[s] = a;
                break;
              }
            s === l && i.push(a);
          }
          o.tween = i;
        };
      }
      function gi(t, n, e) {
        var r = t._id;
        return (
          t.each(function () {
            var t = ui(this, r);
            (t.value || (t.value = {}))[n] = e.apply(this, arguments);
          }),
          function (t) {
            return ai(t, r).value[n];
          }
        );
      }
      var mi = function (t, n) {
        var e;
        return (
          "number" == typeof n
            ? cn
            : n instanceof Rt
            ? sn
            : (e = Rt(n))
            ? ((n = e), sn)
            : pn
        )(t, n);
      };
      function wi(t) {
        return function () {
          this.removeAttribute(t);
        };
      }
      function bi(t) {
        return function () {
          this.removeAttributeNS(t.space, t.local);
        };
      }
      function xi(t, n, e) {
        var r,
          i,
          o = e + "";
        return function () {
          var u = this.getAttribute(t);
          return u === o ? null : u === r ? i : (i = n((r = u), e));
        };
      }
      function Ai(t, n, e) {
        var r,
          i,
          o = e + "";
        return function () {
          var u = this.getAttributeNS(t.space, t.local);
          return u === o ? null : u === r ? i : (i = n((r = u), e));
        };
      }
      function Ni(t, n, e) {
        var r, i, o;
        return function () {
          var u,
            a,
            s = e(this);
          if (null != s)
            return (u = this.getAttribute(t)) === (a = s + "")
              ? null
              : u === r && a === i
              ? o
              : ((i = a), (o = n((r = u), s)));
          this.removeAttribute(t);
        };
      }
      function Ei(t, n, e) {
        var r, i, o;
        return function () {
          var u,
            a,
            s = e(this);
          if (null != s)
            return (u = this.getAttributeNS(t.space, t.local)) === (a = s + "")
              ? null
              : u === r && a === i
              ? o
              : ((i = a), (o = n((r = u), s)));
          this.removeAttributeNS(t.space, t.local);
        };
      }
      function Si(t, n) {
        return function (e) {
          this.setAttribute(t, n.call(this, e));
        };
      }
      function ki(t, n) {
        return function (e) {
          this.setAttributeNS(t.space, t.local, n.call(this, e));
        };
      }
      function Mi(t, n) {
        var e, r;
        function i() {
          var i = n.apply(this, arguments);
          return i !== r && (e = (r = i) && ki(t, i)), e;
        }
        return (i._value = n), i;
      }
      function Ci(t, n) {
        var e, r;
        function i() {
          var i = n.apply(this, arguments);
          return i !== r && (e = (r = i) && Si(t, i)), e;
        }
        return (i._value = n), i;
      }
      function $i(t, n) {
        return function () {
          oi(this, t).delay = +n.apply(this, arguments);
        };
      }
      function Li(t, n) {
        return (
          (n = +n),
          function () {
            oi(this, t).delay = n;
          }
        );
      }
      function Pi(t, n) {
        return function () {
          ui(this, t).duration = +n.apply(this, arguments);
        };
      }
      function qi(t, n) {
        return (
          (n = +n),
          function () {
            ui(this, t).duration = n;
          }
        );
      }
      function Oi(t, n) {
        if ("function" != typeof n) throw new Error();
        return function () {
          ui(this, t).ease = n;
        };
      }
      function ji(t, n, e) {
        var r,
          i,
          o = (function (t) {
            return (t + "")
              .trim()
              .split(/^|\s+/)
              .every(function (t) {
                var n = t.indexOf(".");
                return n >= 0 && (t = t.slice(0, n)), !t || "start" === t;
              });
          })(n)
            ? oi
            : ui;
        return function () {
          var u = o(this, t),
            a = u.on;
          a !== r && (i = (r = a).copy()).on(n, e), (u.on = i);
        };
      }
      var Ti = Rr.prototype.constructor;
      function Bi(t) {
        return function () {
          this.style.removeProperty(t);
        };
      }
      function Di(t, n, e) {
        return function (r) {
          this.style.setProperty(t, n.call(this, r), e);
        };
      }
      function Ri(t, n, e) {
        var r, i;
        function o() {
          var o = n.apply(this, arguments);
          return o !== i && (r = (i = o) && Di(t, o, e)), r;
        }
        return (o._value = n), o;
      }
      function Hi(t) {
        return function (n) {
          this.textContent = t.call(this, n);
        };
      }
      function Ii(t) {
        var n, e;
        function r() {
          var r = t.apply(this, arguments);
          return r !== e && (n = (e = r) && Hi(r)), n;
        }
        return (r._value = t), r;
      }
      var Xi = 0;
      function Vi(t, n, e, r) {
        (this._groups = t),
          (this._parents = n),
          (this._name = e),
          (this._id = r);
      }
      function Ui() {
        return ++Xi;
      }
      var zi = Rr.prototype;
      Vi.prototype = function (t) {
        return Rr().transition(t);
      }.prototype = {
        constructor: Vi,
        select: function (t) {
          var n = this._name,
            e = this._id;
          "function" != typeof t && (t = Se(t));
          for (
            var r = this._groups, i = r.length, o = new Array(i), u = 0;
            u < i;
            ++u
          )
            for (
              var a,
                s,
                l = r[u],
                c = l.length,
                f = (o[u] = new Array(c)),
                h = 0;
              h < c;
              ++h
            )
              (a = l[h]) &&
                (s = t.call(a, a.__data__, h, l)) &&
                ("__data__" in a && (s.__data__ = a.__data__),
                (f[h] = s),
                ii(f[h], n, e, h, f, ai(a, e)));
          return new Vi(o, this._parents, n, e);
        },
        selectAll: function (t) {
          var n = this._name,
            e = this._id;
          "function" != typeof t && (t = Ce(t));
          for (
            var r = this._groups, i = r.length, o = [], u = [], a = 0;
            a < i;
            ++a
          )
            for (var s, l = r[a], c = l.length, f = 0; f < c; ++f)
              if ((s = l[f])) {
                for (
                  var h,
                    p = t.call(s, s.__data__, f, l),
                    d = ai(s, e),
                    _ = 0,
                    y = p.length;
                  _ < y;
                  ++_
                )
                  (h = p[_]) && ii(h, n, e, _, p, d);
                o.push(p), u.push(s);
              }
          return new Vi(o, u, n, e);
        },
        selectChild: zi.selectChild,
        selectChildren: zi.selectChildren,
        filter: function (t) {
          "function" != typeof t && (t = $e(t));
          for (
            var n = this._groups, e = n.length, r = new Array(e), i = 0;
            i < e;
            ++i
          )
            for (
              var o, u = n[i], a = u.length, s = (r[i] = []), l = 0;
              l < a;
              ++l
            )
              (o = u[l]) && t.call(o, o.__data__, l, u) && s.push(o);
          return new Vi(r, this._parents, this._name, this._id);
        },
        merge: function (t) {
          if (t._id !== this._id) throw new Error();
          for (
            var n = this._groups,
              e = t._groups,
              r = n.length,
              i = e.length,
              o = Math.min(r, i),
              u = new Array(r),
              a = 0;
            a < o;
            ++a
          )
            for (
              var s,
                l = n[a],
                c = e[a],
                f = l.length,
                h = (u[a] = new Array(f)),
                p = 0;
              p < f;
              ++p
            )
              (s = l[p] || c[p]) && (h[p] = s);
          for (; a < r; ++a) u[a] = n[a];
          return new Vi(u, this._parents, this._name, this._id);
        },
        selection: function () {
          return new Ti(this._groups, this._parents);
        },
        transition: function () {
          for (
            var t = this._name,
              n = this._id,
              e = Ui(),
              r = this._groups,
              i = r.length,
              o = 0;
            o < i;
            ++o
          )
            for (var u, a = r[o], s = a.length, l = 0; l < s; ++l)
              if ((u = a[l])) {
                var c = ai(u, n);
                ii(u, t, e, l, a, {
                  time: c.time + c.delay + c.duration,
                  delay: 0,
                  duration: c.duration,
                  ease: c.ease,
                });
              }
          return new Vi(r, this._parents, t, e);
        },
        call: zi.call,
        nodes: zi.nodes,
        node: zi.node,
        size: zi.size,
        empty: zi.empty,
        each: zi.each,
        on: function (t, n) {
          var e = this._id;
          return arguments.length < 2
            ? ai(this.node(), e).on.on(t)
            : this.each(ji(e, t, n));
        },
        attr: function (t, n) {
          var e = Ue(t),
            r = "transform" === e ? _i : mi;
          return this.attrTween(
            t,
            "function" == typeof n
              ? (e.local ? Ei : Ni)(e, r, gi(this, "attr." + t, n))
              : null == n
              ? (e.local ? bi : wi)(e)
              : (e.local ? Ai : xi)(e, r, n)
          );
        },
        attrTween: function (t, n) {
          var e = "attr." + t;
          if (arguments.length < 2) return (e = this.tween(e)) && e._value;
          if (null == n) return this.tween(e, null);
          if ("function" != typeof n) throw new Error();
          var r = Ue(t);
          return this.tween(e, (r.local ? Mi : Ci)(r, n));
        },
        style: function (t, n, e) {
          var r = "transform" == (t += "") ? di : mi;
          return null == n
            ? this.styleTween(
                t,
                (function (t, n) {
                  var e, r, i;
                  return function () {
                    var o = nr(this, t),
                      u = (this.style.removeProperty(t), nr(this, t));
                    return o === u
                      ? null
                      : o === e && u === r
                      ? i
                      : (i = n((e = o), (r = u)));
                  };
                })(t, r)
              ).on("end.style." + t, Bi(t))
            : "function" == typeof n
            ? this.styleTween(
                t,
                (function (t, n, e) {
                  var r, i, o;
                  return function () {
                    var u = nr(this, t),
                      a = e(this),
                      s = a + "";
                    return (
                      null == a &&
                        (this.style.removeProperty(t), (s = a = nr(this, t))),
                      u === s
                        ? null
                        : u === r && s === i
                        ? o
                        : ((i = s), (o = n((r = u), a)))
                    );
                  };
                })(t, r, gi(this, "style." + t, n))
              ).each(
                (function (t, n) {
                  var e,
                    r,
                    i,
                    o,
                    u = "style." + n,
                    a = "end." + u;
                  return function () {
                    var s = ui(this, t),
                      l = s.on,
                      c = null == s.value[u] ? o || (o = Bi(n)) : void 0;
                    (l === e && i === c) || (r = (e = l).copy()).on(a, (i = c)),
                      (s.on = r);
                  };
                })(this._id, t)
              )
            : this.styleTween(
                t,
                (function (t, n, e) {
                  var r,
                    i,
                    o = e + "";
                  return function () {
                    var u = nr(this, t);
                    return u === o ? null : u === r ? i : (i = n((r = u), e));
                  };
                })(t, r, n),
                e
              ).on("end.style." + t, null);
        },
        styleTween: function (t, n, e) {
          var r = "style." + (t += "");
          if (arguments.length < 2) return (r = this.tween(r)) && r._value;
          if (null == n) return this.tween(r, null);
          if ("function" != typeof n) throw new Error();
          return this.tween(r, Ri(t, n, null == e ? "" : e));
        },
        text: function (t) {
          return this.tween(
            "text",
            "function" == typeof t
              ? (function (t) {
                  return function () {
                    var n = t(this);
                    this.textContent = null == n ? "" : n;
                  };
                })(gi(this, "text", t))
              : (function (t) {
                  return function () {
                    this.textContent = t;
                  };
                })(null == t ? "" : t + "")
          );
        },
        textTween: function (t) {
          var n = "text";
          if (arguments.length < 1) return (n = this.tween(n)) && n._value;
          if (null == t) return this.tween(n, null);
          if ("function" != typeof t) throw new Error();
          return this.tween(n, Ii(t));
        },
        remove: function () {
          return this.on(
            "end.remove",
            ((t = this._id),
            function () {
              var n = this.parentNode;
              for (var e in this.__transition) if (+e !== t) return;
              n && n.removeChild(this);
            })
          );
          var t;
        },
        tween: function (t, n) {
          var e = this._id;
          if (((t += ""), arguments.length < 2)) {
            for (
              var r, i = ai(this.node(), e).tween, o = 0, u = i.length;
              o < u;
              ++o
            )
              if ((r = i[o]).name === t) return r.value;
            return null;
          }
          return this.each((null == n ? yi : vi)(e, t, n));
        },
        delay: function (t) {
          var n = this._id;
          return arguments.length
            ? this.each(("function" == typeof t ? $i : Li)(n, t))
            : ai(this.node(), n).delay;
        },
        duration: function (t) {
          var n = this._id;
          return arguments.length
            ? this.each(("function" == typeof t ? Pi : qi)(n, t))
            : ai(this.node(), n).duration;
        },
        ease: function (t) {
          var n = this._id;
          return arguments.length
            ? this.each(Oi(n, t))
            : ai(this.node(), n).ease;
        },
        easeVarying: function (t) {
          if ("function" != typeof t) throw new Error();
          return this.each(
            (function (t, n) {
              return function () {
                var e = n.apply(this, arguments);
                if ("function" != typeof e) throw new Error();
                ui(this, t).ease = e;
              };
            })(this._id, t)
          );
        },
        end: function () {
          var t,
            n,
            e = this,
            r = e._id,
            i = e.size();
          return new Promise(function (o, u) {
            var a = { value: u },
              s = {
                value: function () {
                  0 == --i && o();
                },
              };
            e.each(function () {
              var e = ui(this, r),
                i = e.on;
              i !== t &&
                ((n = (t = i).copy())._.cancel.push(a),
                n._.interrupt.push(a),
                n._.end.push(s)),
                (e.on = n);
            }),
              0 === i && o();
          });
        },
        [Symbol.iterator]: zi[Symbol.iterator],
      };
      var Yi = {
        time: null,
        delay: 0,
        duration: 250,
        ease: function (t) {
          return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
        },
      };
      function Fi(t, n) {
        for (var e; !(e = t.__transition) || !(e = e[n]); )
          if (!(t = t.parentNode)) throw new Error(`transition ${n} not found`);
        return e;
      }
      (Rr.prototype.interrupt = function (t) {
        return this.each(function () {
          li(this, t);
        });
      }),
        (Rr.prototype.transition = function (t) {
          var n, e;
          t instanceof Vi
            ? ((n = t._id), (t = t._name))
            : ((n = Ui()),
              ((e = Yi).time = Qr()),
              (t = null == t ? null : t + ""));
          for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
            for (var u, a = r[o], s = a.length, l = 0; l < s; ++l)
              (u = a[l]) && ii(u, t, n, l, a, e || Fi(u, n));
          return new Vi(r, this._parents, t, n);
        });
      const { abs: Qi, max: Wi, min: Ji } = Math;
      function Ki(t) {
        return [+t[0], +t[1]];
      }
      function Gi(t) {
        return [Ki(t[0]), Ki(t[1])];
      }
      ["w", "e"].map(Zi),
        ["n", "s"].map(Zi),
        ["n", "w", "e", "s", "nw", "ne", "sw", "se"].map(Zi);
      function Zi(t) {
        return { type: t };
      }
      function to() {}
      var no = function (t) {
        return null == t
          ? to
          : function () {
              return this.querySelector(t);
            };
      };
      function eo(t) {
        return null == t ? [] : Array.isArray(t) ? t : Array.from(t);
      }
      function ro() {
        return [];
      }
      function io(t) {
        return function (n) {
          return n.matches(t);
        };
      }
      var oo = Array.prototype.find;
      function uo() {
        return this.firstElementChild;
      }
      var ao = Array.prototype.filter;
      function so() {
        return Array.from(this.children);
      }
      var lo = function (t) {
        return new Array(t.length);
      };
      function co(t, n) {
        (this.ownerDocument = t.ownerDocument),
          (this.namespaceURI = t.namespaceURI),
          (this._next = null),
          (this._parent = t),
          (this.__data__ = n);
      }
      co.prototype = {
        constructor: co,
        appendChild: function (t) {
          return this._parent.insertBefore(t, this._next);
        },
        insertBefore: function (t, n) {
          return this._parent.insertBefore(t, n);
        },
        querySelector: function (t) {
          return this._parent.querySelector(t);
        },
        querySelectorAll: function (t) {
          return this._parent.querySelectorAll(t);
        },
      };
      var fo = function (t) {
        return function () {
          return t;
        };
      };
      function ho(t, n, e, r, i, o) {
        for (var u, a = 0, s = n.length, l = o.length; a < l; ++a)
          (u = n[a])
            ? ((u.__data__ = o[a]), (r[a] = u))
            : (e[a] = new co(t, o[a]));
        for (; a < s; ++a) (u = n[a]) && (i[a] = u);
      }
      function po(t, n, e, r, i, o, u) {
        var a,
          s,
          l,
          c = new Map(),
          f = n.length,
          h = o.length,
          p = new Array(f);
        for (a = 0; a < f; ++a)
          (s = n[a]) &&
            ((p[a] = l = u.call(s, s.__data__, a, n) + ""),
            c.has(l) ? (i[a] = s) : c.set(l, s));
        for (a = 0; a < h; ++a)
          (l = u.call(t, o[a], a, o) + ""),
            (s = c.get(l))
              ? ((r[a] = s), (s.__data__ = o[a]), c.delete(l))
              : (e[a] = new co(t, o[a]));
        for (a = 0; a < f; ++a) (s = n[a]) && c.get(p[a]) === s && (i[a] = s);
      }
      function _o(t) {
        return t.__data__;
      }
      function yo(t) {
        return "object" == typeof t && "length" in t ? t : Array.from(t);
      }
      function vo(t, n) {
        return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
      }
      var go = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
        },
        mo = function (t) {
          var n = (t += ""),
            e = n.indexOf(":");
          return (
            e >= 0 && "xmlns" !== (n = t.slice(0, e)) && (t = t.slice(e + 1)),
            go.hasOwnProperty(n) ? { space: go[n], local: t } : t
          );
        };
      function wo(t) {
        return function () {
          this.removeAttribute(t);
        };
      }
      function bo(t) {
        return function () {
          this.removeAttributeNS(t.space, t.local);
        };
      }
      function xo(t, n) {
        return function () {
          this.setAttribute(t, n);
        };
      }
      function Ao(t, n) {
        return function () {
          this.setAttributeNS(t.space, t.local, n);
        };
      }
      function No(t, n) {
        return function () {
          var e = n.apply(this, arguments);
          null == e ? this.removeAttribute(t) : this.setAttribute(t, e);
        };
      }
      function Eo(t, n) {
        return function () {
          var e = n.apply(this, arguments);
          null == e
            ? this.removeAttributeNS(t.space, t.local)
            : this.setAttributeNS(t.space, t.local, e);
        };
      }
      var So = function (t) {
        return (
          (t.ownerDocument && t.ownerDocument.defaultView) ||
          (t.document && t) ||
          t.defaultView
        );
      };
      function ko(t) {
        return function () {
          this.style.removeProperty(t);
        };
      }
      function Mo(t, n, e) {
        return function () {
          this.style.setProperty(t, n, e);
        };
      }
      function Co(t, n, e) {
        return function () {
          var r = n.apply(this, arguments);
          null == r
            ? this.style.removeProperty(t)
            : this.style.setProperty(t, r, e);
        };
      }
      function $o(t, n) {
        return (
          t.style.getPropertyValue(n) ||
          So(t).getComputedStyle(t, null).getPropertyValue(n)
        );
      }
      function Lo(t) {
        return function () {
          delete this[t];
        };
      }
      function Po(t, n) {
        return function () {
          this[t] = n;
        };
      }
      function qo(t, n) {
        return function () {
          var e = n.apply(this, arguments);
          null == e ? delete this[t] : (this[t] = e);
        };
      }
      function Oo(t) {
        return t.trim().split(/^|\s+/);
      }
      function jo(t) {
        return t.classList || new To(t);
      }
      function To(t) {
        (this._node = t), (this._names = Oo(t.getAttribute("class") || ""));
      }
      function Bo(t, n) {
        for (var e = jo(t), r = -1, i = n.length; ++r < i; ) e.add(n[r]);
      }
      function Do(t, n) {
        for (var e = jo(t), r = -1, i = n.length; ++r < i; ) e.remove(n[r]);
      }
      function Ro(t) {
        return function () {
          Bo(this, t);
        };
      }
      function Ho(t) {
        return function () {
          Do(this, t);
        };
      }
      function Io(t, n) {
        return function () {
          (n.apply(this, arguments) ? Bo : Do)(this, t);
        };
      }
      To.prototype = {
        add: function (t) {
          this._names.indexOf(t) < 0 &&
            (this._names.push(t),
            this._node.setAttribute("class", this._names.join(" ")));
        },
        remove: function (t) {
          var n = this._names.indexOf(t);
          n >= 0 &&
            (this._names.splice(n, 1),
            this._node.setAttribute("class", this._names.join(" ")));
        },
        contains: function (t) {
          return this._names.indexOf(t) >= 0;
        },
      };
      function Xo() {
        this.textContent = "";
      }
      function Vo(t) {
        return function () {
          this.textContent = t;
        };
      }
      function Uo(t) {
        return function () {
          var n = t.apply(this, arguments);
          this.textContent = null == n ? "" : n;
        };
      }
      function zo() {
        this.innerHTML = "";
      }
      function Yo(t) {
        return function () {
          this.innerHTML = t;
        };
      }
      function Fo(t) {
        return function () {
          var n = t.apply(this, arguments);
          this.innerHTML = null == n ? "" : n;
        };
      }
      function Qo() {
        this.nextSibling && this.parentNode.appendChild(this);
      }
      function Wo() {
        this.previousSibling &&
          this.parentNode.insertBefore(this, this.parentNode.firstChild);
      }
      function Jo(t) {
        return function () {
          var n = this.ownerDocument,
            e = this.namespaceURI;
          return "http://www.w3.org/1999/xhtml" === e &&
            "http://www.w3.org/1999/xhtml" === n.documentElement.namespaceURI
            ? n.createElement(t)
            : n.createElementNS(e, t);
        };
      }
      function Ko(t) {
        return function () {
          return this.ownerDocument.createElementNS(t.space, t.local);
        };
      }
      var Go = function (t) {
        var n = mo(t);
        return (n.local ? Ko : Jo)(n);
      };
      function Zo() {
        return null;
      }
      function tu() {
        var t = this.parentNode;
        t && t.removeChild(this);
      }
      function nu() {
        var t = this.cloneNode(!1),
          n = this.parentNode;
        return n ? n.insertBefore(t, this.nextSibling) : t;
      }
      function eu() {
        var t = this.cloneNode(!0),
          n = this.parentNode;
        return n ? n.insertBefore(t, this.nextSibling) : t;
      }
      function ru(t) {
        return t
          .trim()
          .split(/^|\s+/)
          .map(function (t) {
            var n = "",
              e = t.indexOf(".");
            return (
              e >= 0 && ((n = t.slice(e + 1)), (t = t.slice(0, e))),
              { type: t, name: n }
            );
          });
      }
      function iu(t) {
        return function () {
          var n = this.__on;
          if (n) {
            for (var e, r = 0, i = -1, o = n.length; r < o; ++r)
              (e = n[r]),
                (t.type && e.type !== t.type) || e.name !== t.name
                  ? (n[++i] = e)
                  : this.removeEventListener(e.type, e.listener, e.options);
            ++i ? (n.length = i) : delete this.__on;
          }
        };
      }
      function ou(t, n, e) {
        return function () {
          var r,
            i = this.__on,
            o = (function (t) {
              return function (n) {
                t.call(this, n, this.__data__);
              };
            })(n);
          if (i)
            for (var u = 0, a = i.length; u < a; ++u)
              if ((r = i[u]).type === t.type && r.name === t.name)
                return (
                  this.removeEventListener(r.type, r.listener, r.options),
                  this.addEventListener(
                    r.type,
                    (r.listener = o),
                    (r.options = e)
                  ),
                  void (r.value = n)
                );
          this.addEventListener(t.type, o, e),
            (r = {
              type: t.type,
              name: t.name,
              value: n,
              listener: o,
              options: e,
            }),
            i ? i.push(r) : (this.__on = [r]);
        };
      }
      function uu(t, n, e) {
        var r = So(t),
          i = r.CustomEvent;
        "function" == typeof i
          ? (i = new i(n, e))
          : ((i = r.document.createEvent("Event")),
            e
              ? (i.initEvent(n, e.bubbles, e.cancelable), (i.detail = e.detail))
              : i.initEvent(n, !1, !1)),
          t.dispatchEvent(i);
      }
      function au(t, n) {
        return function () {
          return uu(this, t, n);
        };
      }
      function su(t, n) {
        return function () {
          return uu(this, t, n.apply(this, arguments));
        };
      }
      var lu = [null];
      function cu(t, n) {
        (this._groups = t), (this._parents = n);
      }
      function fu() {
        return new cu([[document.documentElement]], lu);
      }
      cu.prototype = fu.prototype = {
        constructor: cu,
        select: function (t) {
          "function" != typeof t && (t = no(t));
          for (
            var n = this._groups, e = n.length, r = new Array(e), i = 0;
            i < e;
            ++i
          )
            for (
              var o,
                u,
                a = n[i],
                s = a.length,
                l = (r[i] = new Array(s)),
                c = 0;
              c < s;
              ++c
            )
              (o = a[c]) &&
                (u = t.call(o, o.__data__, c, a)) &&
                ("__data__" in o && (u.__data__ = o.__data__), (l[c] = u));
          return new cu(r, this._parents);
        },
        selectAll: function (t) {
          var n;
          "function" == typeof t
            ? (t = (function (t) {
                return function () {
                  return eo(t.apply(this, arguments));
                };
              })(t))
            : (t =
                null == (n = t)
                  ? ro
                  : function () {
                      return this.querySelectorAll(n);
                    });
          for (
            var e = this._groups, r = e.length, i = [], o = [], u = 0;
            u < r;
            ++u
          )
            for (var a, s = e[u], l = s.length, c = 0; c < l; ++c)
              (a = s[c]) && (i.push(t.call(a, a.__data__, c, s)), o.push(a));
          return new cu(i, o);
        },
        selectChild: function (t) {
          return this.select(
            null == t
              ? uo
              : (function (t) {
                  return function () {
                    return oo.call(this.children, t);
                  };
                })("function" == typeof t ? t : io(t))
          );
        },
        selectChildren: function (t) {
          return this.selectAll(
            null == t
              ? so
              : (function (t) {
                  return function () {
                    return ao.call(this.children, t);
                  };
                })("function" == typeof t ? t : io(t))
          );
        },
        filter: function (t) {
          var n;
          "function" != typeof t &&
            ((n = t),
            (t = function () {
              return this.matches(n);
            }));
          for (
            var e = this._groups, r = e.length, i = new Array(r), o = 0;
            o < r;
            ++o
          )
            for (
              var u, a = e[o], s = a.length, l = (i[o] = []), c = 0;
              c < s;
              ++c
            )
              (u = a[c]) && t.call(u, u.__data__, c, a) && l.push(u);
          return new cu(i, this._parents);
        },
        data: function (t, n) {
          if (!arguments.length) return Array.from(this, _o);
          var e = n ? po : ho,
            r = this._parents,
            i = this._groups;
          "function" != typeof t && (t = fo(t));
          for (
            var o = i.length,
              u = new Array(o),
              a = new Array(o),
              s = new Array(o),
              l = 0;
            l < o;
            ++l
          ) {
            var c = r[l],
              f = i[l],
              h = f.length,
              p = yo(t.call(c, c && c.__data__, l, r)),
              d = p.length,
              _ = (a[l] = new Array(d)),
              y = (u[l] = new Array(d)),
              v = (s[l] = new Array(h));
            e(c, f, _, y, v, p, n);
            for (var g, m, w = 0, b = 0; w < d; ++w)
              if ((g = _[w])) {
                for (w >= b && (b = w + 1); !(m = y[b]) && ++b < d; );
                g._next = m || null;
              }
          }
          return ((u = new cu(u, r))._enter = a), (u._exit = s), u;
        },
        enter: function () {
          return new cu(this._enter || this._groups.map(lo), this._parents);
        },
        exit: function () {
          return new cu(this._exit || this._groups.map(lo), this._parents);
        },
        join: function (t, n, e) {
          var r = this.enter(),
            i = this,
            o = this.exit();
          return (
            "function" == typeof t
              ? (r = t(r)) && (r = r.selection())
              : (r = r.append(t + "")),
            null != n && (i = n(i)) && (i = i.selection()),
            null == e ? o.remove() : e(o),
            r && i ? r.merge(i).order() : i
          );
        },
        merge: function (t) {
          for (
            var n = t.selection ? t.selection() : t,
              e = this._groups,
              r = n._groups,
              i = e.length,
              o = r.length,
              u = Math.min(i, o),
              a = new Array(i),
              s = 0;
            s < u;
            ++s
          )
            for (
              var l,
                c = e[s],
                f = r[s],
                h = c.length,
                p = (a[s] = new Array(h)),
                d = 0;
              d < h;
              ++d
            )
              (l = c[d] || f[d]) && (p[d] = l);
          for (; s < i; ++s) a[s] = e[s];
          return new cu(a, this._parents);
        },
        selection: function () {
          return this;
        },
        order: function () {
          for (var t = this._groups, n = -1, e = t.length; ++n < e; )
            for (var r, i = t[n], o = i.length - 1, u = i[o]; --o >= 0; )
              (r = i[o]) &&
                (u &&
                  4 ^ r.compareDocumentPosition(u) &&
                  u.parentNode.insertBefore(r, u),
                (u = r));
          return this;
        },
        sort: function (t) {
          function n(n, e) {
            return n && e ? t(n.__data__, e.__data__) : !n - !e;
          }
          t || (t = vo);
          for (
            var e = this._groups, r = e.length, i = new Array(r), o = 0;
            o < r;
            ++o
          ) {
            for (
              var u, a = e[o], s = a.length, l = (i[o] = new Array(s)), c = 0;
              c < s;
              ++c
            )
              (u = a[c]) && (l[c] = u);
            l.sort(n);
          }
          return new cu(i, this._parents).order();
        },
        call: function () {
          var t = arguments[0];
          return (arguments[0] = this), t.apply(null, arguments), this;
        },
        nodes: function () {
          return Array.from(this);
        },
        node: function () {
          for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
            for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
              var u = r[i];
              if (u) return u;
            }
          return null;
        },
        size: function () {
          let t = 0;
          for (const n of this) ++t;
          return t;
        },
        empty: function () {
          return !this.node();
        },
        each: function (t) {
          for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
            for (var i, o = n[e], u = 0, a = o.length; u < a; ++u)
              (i = o[u]) && t.call(i, i.__data__, u, o);
          return this;
        },
        attr: function (t, n) {
          var e = mo(t);
          if (arguments.length < 2) {
            var r = this.node();
            return e.local
              ? r.getAttributeNS(e.space, e.local)
              : r.getAttribute(e);
          }
          return this.each(
            (null == n
              ? e.local
                ? bo
                : wo
              : "function" == typeof n
              ? e.local
                ? Eo
                : No
              : e.local
              ? Ao
              : xo)(e, n)
          );
        },
        style: function (t, n, e) {
          return arguments.length > 1
            ? this.each(
                (null == n ? ko : "function" == typeof n ? Co : Mo)(
                  t,
                  n,
                  null == e ? "" : e
                )
              )
            : $o(this.node(), t);
        },
        property: function (t, n) {
          return arguments.length > 1
            ? this.each(
                (null == n ? Lo : "function" == typeof n ? qo : Po)(t, n)
              )
            : this.node()[t];
        },
        classed: function (t, n) {
          var e = Oo(t + "");
          if (arguments.length < 2) {
            for (var r = jo(this.node()), i = -1, o = e.length; ++i < o; )
              if (!r.contains(e[i])) return !1;
            return !0;
          }
          return this.each(("function" == typeof n ? Io : n ? Ro : Ho)(e, n));
        },
        text: function (t) {
          return arguments.length
            ? this.each(null == t ? Xo : ("function" == typeof t ? Uo : Vo)(t))
            : this.node().textContent;
        },
        html: function (t) {
          return arguments.length
            ? this.each(null == t ? zo : ("function" == typeof t ? Fo : Yo)(t))
            : this.node().innerHTML;
        },
        raise: function () {
          return this.each(Qo);
        },
        lower: function () {
          return this.each(Wo);
        },
        append: function (t) {
          var n = "function" == typeof t ? t : Go(t);
          return this.select(function () {
            return this.appendChild(n.apply(this, arguments));
          });
        },
        insert: function (t, n) {
          var e = "function" == typeof t ? t : Go(t),
            r = null == n ? Zo : "function" == typeof n ? n : no(n);
          return this.select(function () {
            return this.insertBefore(
              e.apply(this, arguments),
              r.apply(this, arguments) || null
            );
          });
        },
        remove: function () {
          return this.each(tu);
        },
        clone: function (t) {
          return this.select(t ? eu : nu);
        },
        datum: function (t) {
          return arguments.length
            ? this.property("__data__", t)
            : this.node().__data__;
        },
        on: function (t, n, e) {
          var r,
            i,
            o = ru(t + ""),
            u = o.length;
          if (!(arguments.length < 2)) {
            for (a = n ? ou : iu, r = 0; r < u; ++r) this.each(a(o[r], n, e));
            return this;
          }
          var a = this.node().__on;
          if (a)
            for (var s, l = 0, c = a.length; l < c; ++l)
              for (r = 0, s = a[l]; r < u; ++r)
                if ((i = o[r]).type === s.type && i.name === s.name)
                  return s.value;
        },
        dispatch: function (t, n) {
          return this.each(("function" == typeof n ? su : au)(t, n));
        },
        [Symbol.iterator]: function* () {
          for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
            for (var r, i = t[n], o = 0, u = i.length; o < u; ++o)
              (r = i[o]) && (yield r);
        },
      };
      var hu = function (t) {
        return "string" == typeof t
          ? new cu([[document.querySelector(t)]], [document.documentElement])
          : new cu([[t]], lu);
      };
      function pu(t) {
        return ((t = Math.exp(t)) + 1 / t) / 2;
      }
      (function t(n, e, r) {
        function i(t, i) {
          var o,
            u,
            a = t[0],
            s = t[1],
            l = t[2],
            c = i[0],
            f = i[1],
            h = i[2],
            p = c - a,
            d = f - s,
            _ = p * p + d * d;
          if (_ < 1e-12)
            (u = Math.log(h / l) / n),
              (o = function (t) {
                return [a + t * p, s + t * d, l * Math.exp(n * t * u)];
              });
          else {
            var y = Math.sqrt(_),
              v = (h * h - l * l + r * _) / (2 * l * e * y),
              g = (h * h - l * l - r * _) / (2 * h * e * y),
              m = Math.log(Math.sqrt(v * v + 1) - v),
              w = Math.log(Math.sqrt(g * g + 1) - g);
            (u = (w - m) / n),
              (o = function (t) {
                var r,
                  i = t * u,
                  o = pu(m),
                  c =
                    (l / (e * y)) *
                    (o *
                      ((r = n * i + m), ((r = Math.exp(2 * r)) - 1) / (r + 1)) -
                      (function (t) {
                        return ((t = Math.exp(t)) - 1 / t) / 2;
                      })(m));
                return [a + c * p, s + c * d, (l * o) / pu(n * i + m)];
              });
          }
          return (o.duration = (1e3 * u * n) / Math.SQRT2), o;
        }
        return (
          (i.rho = function (n) {
            var e = Math.max(0.001, +n),
              r = e * e;
            return t(e, r, r * r);
          }),
          i
        );
      })(Math.SQRT2, 2, 4);
      function du(t, n, e) {
        (this.k = t), (this.x = n), (this.y = e);
      }
      du.prototype = {
        constructor: du,
        scale: function (t) {
          return 1 === t ? this : new du(this.k * t, this.x, this.y);
        },
        translate: function (t, n) {
          return (0 === t) & (0 === n)
            ? this
            : new du(this.k, this.x + this.k * t, this.y + this.k * n);
        },
        apply: function (t) {
          return [t[0] * this.k + this.x, t[1] * this.k + this.y];
        },
        applyX: function (t) {
          return t * this.k + this.x;
        },
        applyY: function (t) {
          return t * this.k + this.y;
        },
        invert: function (t) {
          return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
        },
        invertX: function (t) {
          return (t - this.x) / this.k;
        },
        invertY: function (t) {
          return (t - this.y) / this.k;
        },
        rescaleX: function (t) {
          return t
            .copy()
            .domain(t.range().map(this.invertX, this).map(t.invert, t));
        },
        rescaleY: function (t) {
          return t
            .copy()
            .domain(t.range().map(this.invertY, this).map(t.invert, t));
        },
        toString: function () {
          return (
            "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")"
          );
        },
      };
      new du(1, 0, 0);
      du.prototype;
      looker.plugins.visualizations.add({
        id: "dev-tier-marketplace",
        label: "tier",
        options: {
          title_graphic: {
            section: "1. Main",
            type: "string",
            label: "1 Title",
          },
          default_icon: {
            section: "1. Main",
            type: "string",
            label: "2. Title Icon <i>",
            default: "",
          },
          font_size: {
            section: "2. Layout",
            type: "string",
            label: "Font Size",
            default: "11",
          },
          font_weight: {
            section: "2. Layout",
            type: "string",
            label: "Font Weight",
            display: "select",
            values: [{ normal: "normal" }, { bold: "bold" }],
            default: "normal",
          },
          font_family: {
            section: "2. Layout",
            type: "string",
            label: "Font Family",
            display: "select",
            values: [{ "'Quicksand', sans-serif": "'Quicksand', sans-serif" }],
            default: "'Quicksand', sans-serif",
          },
          font_color: {
            section: "2. Layout",
            type: "string",
            display: "color",
            label: "Font Color",
            default: "#333333",
          },
          top_margin: {
            section: "2. Layout",
            type: "string",
            display: "select",
            label: "Top margin",
            values: [
              { 0: "0" },
              { 10: "10" },
              { 20: "20" },
              { 30: "30" },
              { 40: "40" },
              { 50: "50" },
              { 60: "60" },
              { 70: "70" },
              { 80: "80" },
              { 90: "90" },
              { 100: "100" },
              { 120: "120" },
              { 130: "130" },
              { 140: "140" },
              { 150: "150" },
              { 160: "160" },
              { 170: "170" },
              { 180: "180" },
              { 190: "190" },
              { 200: "200" },
            ],
            default: 170,
          },
          bottom_margin: {
            section: "2. Layout",
            type: "string",
            display: "select",
            label: "Bottom margin",
            values: [
              { 0: "0" },
              { 10: "10" },
              { 20: "20" },
              { 30: "30" },
              { 40: "40" },
              { 50: "50" },
              { 60: "60" },
              { 70: "70" },
              { 80: "80" },
              { 90: "90" },
              { 100: "100" },
              { 120: "120" },
              { 130: "130" },
              { 140: "140" },
              { 150: "150" },
              { 160: "160" },
              { 170: "170" },
              { 180: "180" },
              { 190: "190" },
              { 200: "200" },
            ],
            default: 10,
          },
          side_margin: {
            section: "2. Layout",
            type: "string",
            display: "select",
            label: "Side margin",
            values: [
              { 0: "0" },
              { 10: "10" },
              { 20: "20" },
              { 30: "30" },
              { 40: "40" },
              { 50: "50" },
              { 60: "60" },
              { 70: "70" },
              { 80: "80" },
              { 90: "90" },
              { 100: "100" },
              { 120: "120" },
              { 130: "130" },
              { 140: "140" },
              { 150: "150" },
              { 160: "160" },
              { 170: "170" },
              { 180: "180" },
              { 190: "190" },
              { 200: "200" },
            ],
            default: 10,
          },
        },
        create: function (t, n) {
          return (function (t, n) {
            var e = t.appendChild(document.createElement("div"));
            e.id = "chart";
            const r = document.createElement("style");
            (r.innerHTML = n), document.head.appendChild(r);
            var i = document.createElement("link");
            (i.type = "text/css"),
              (i.rel = "stylesheet"),
              (i.crossorigin = "anonymous"),
              (i.referrerpolicy = "no-referrer"),
              document.head.appendChild(i),
              (i.href =
                "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css");
            let o = document.createElement("link");
            (o.rel = "preconnect"),
              document.head.appendChild(o),
              (o.href = "https://fonts.googleapis.com");
            let u = document.createElement("link");
            (u.rel = "preconnect"),
              (u.crossorigin = "anonymous"),
              document.head.appendChild(u),
              (u.href = "https://fonts.gstatic.com");
            let a = document.createElement("link");
            (a.type = "text/css"),
              (a.rel = "stylesheet"),
              document.head.appendChild(a),
              (a.href =
                "https://fonts.googleapis.com/css2?family=Josefin+Sans&family=Quicksand:wght@300;700&family=Roboto&display=swap");
            let s = document.createElement("script");
            return (
              (s.crossorigin = "anonymous"),
              document.head.appendChild(s),
              (s.src = "https://kit.fontawesome.com/9e8face2b6.js"),
              e
            );
          })(t, r);
        },
        updateAsync: function (t, n, e, r, i, o) {
          const u = {
            vis: this,
            config: e,
            data: t,
            queryResponse: r,
            element: n,
            details: i,
            width: n.clientWidth - margin.left - margin.right,
            height: n.clientHeight - margin.top - margin.bottom,
            margin: {
              top: e.top_margin,
              right: e.side_margin,
              bottom: e.bottom_margin,
              left: e.side_margin,
            },
          };
          !(function (t) {
            hu("#chart").remove(),
              (t.element.appendChild(document.createElement("div")).id =
                "chart");
            let n = `<div id="title_chart">\n  <h3 style="\n  font-family: ${t.config.font_family};\n  color: ${t.config.font_color};\n  font-size: ${t.config.font_size}px; \n  font-weight: ${t.config.font_weight};">\n  ${t.config.default_icon} <span > ${t.config.title_graphic}\n  </span>\n  </h3>\n  </div> \n  `;
            hu("#chart").html(function () {
              return n;
            });
          })(u),
            hu("#chart")
              .append("div")
              .html(function (t, n) {
                return "<div>Chart</div>";
              }),
            o();
        },
      });
    },
  });
});
