function e() {
  return {
    baseUrl: null,
    breaks: !1,
    extensions: null,
    gfm: !0,
    headerIds: !0,
    headerPrefix: "",
    highlight: null,
    langPrefix: "language-",
    mangle: !0,
    pedantic: !1,
    renderer: null,
    sanitize: !1,
    sanitizer: null,
    silent: !1,
    smartLists: !1,
    smartypants: !1,
    tokenizer: null,
    walkTokens: null,
    xhtml: !1,
  };
}
let t = {
  baseUrl: null,
  breaks: !1,
  extensions: null,
  gfm: !0,
  headerIds: !0,
  headerPrefix: "",
  highlight: null,
  langPrefix: "language-",
  mangle: !0,
  pedantic: !1,
  renderer: null,
  sanitize: !1,
  sanitizer: null,
  silent: !1,
  smartLists: !1,
  smartypants: !1,
  tokenizer: null,
  walkTokens: null,
  xhtml: !1,
};
const n = /[&<>"']/,
  r = /[&<>"']/g,
  s = /[<>"']|&(?!#?\w+;)/,
  i = /[<>"']|&(?!#?\w+;)/g,
  l = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" },
  a = (e) => l[e];
function o(e, t) {
  if (t) {
    if (n.test(e)) return e.replace(r, a);
  } else if (s.test(e)) return e.replace(i, a);
  return e;
}
const c = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;
function h(e) {
  return e.replace(c, (e, t) =>
    "colon" === (t = t.toLowerCase())
      ? ":"
      : "#" === t.charAt(0)
      ? "x" === t.charAt(1)
        ? String.fromCharCode(parseInt(t.substring(2), 16))
        : String.fromCharCode(+t.substring(1))
      : ""
  );
}
const p = /(^|[^\[])\^/g;
function u(e, t) {
  (e = e.source || e), (t = t || "");
  const n = {
    replace: (t, r) => (
      (r = (r = r.source || r).replace(p, "$1")), (e = e.replace(t, r)), n
    ),
    getRegex: () => new RegExp(e, t),
  };
  return n;
}
const g = /[^\w:]/g,
  d = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
function f(e, t, n) {
  if (e) {
    let e;
    try {
      e = decodeURIComponent(h(n)).replace(g, "").toLowerCase();
    } catch (e) {
      return null;
    }
    if (
      0 === e.indexOf("javascript:") ||
      0 === e.indexOf("vbscript:") ||
      0 === e.indexOf("data:")
    )
      return null;
  }
  t &&
    !d.test(n) &&
    (n = (function (e, t) {
      k[" " + e] ||
        (x.test(e) ? (k[" " + e] = e + "/") : (k[" " + e] = z(e, "/", !0)));
      e = k[" " + e];
      const n = -1 === e.indexOf(":");
      return "//" === t.substring(0, 2)
        ? n
          ? t
          : e.replace(m, "$1") + t
        : "/" === t.charAt(0)
        ? n
          ? t
          : e.replace(b, "$1") + t
        : e + t;
    })(t, n));
  try {
    n = encodeURI(n).replace(/%25/g, "%");
  } catch (e) {
    return null;
  }
  return n;
}
const k = {},
  x = /^[^:]+:\/*[^/]*$/,
  m = /^([^:]+:)[\s\S]*$/,
  b = /^([^:]+:\/*[^/]*)[\s\S]*$/;
const w = { exec: function () {} };
function _(e) {
  let t,
    n,
    r = 1;
  for (; r < arguments.length; r++)
    for (n in ((t = arguments[r]), t))
      Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
  return e;
}
function y(e, t) {
  const n = e
    .replace(/\|/g, (e, t, n) => {
      let r = !1,
        s = t;
      for (; --s >= 0 && "\\" === n[s]; ) r = !r;
      return r ? "|" : " |";
    })
    .split(/ \|/);
  let r = 0;
  if (
    (n[0].trim() || n.shift(),
    n.length > 0 && !n[n.length - 1].trim() && n.pop(),
    n.length > t)
  )
    n.splice(t);
  else for (; n.length < t; ) n.push("");
  for (; r < n.length; r++) n[r] = n[r].trim().replace(/\\\|/g, "|");
  return n;
}
function z(e, t, n) {
  const r = e.length;
  if (0 === r) return "";
  let s = 0;
  for (; s < r; ) {
    const i = e.charAt(r - s - 1);
    if (i !== t || n) {
      if (i === t || !n) break;
      s++;
    } else s++;
  }
  return e.substr(0, r - s);
}
function S(e) {
  e &&
    e.sanitize &&
    !e.silent &&
    console.warn(
      "marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options"
    );
}
function $(e, t) {
  if (t < 1) return "";
  let n = "";
  for (; t > 1; ) 1 & t && (n += e), (t >>= 1), (e += e);
  return n + e;
}
function A(e, t, n, r) {
  const s = t.href,
    i = t.title ? o(t.title) : null,
    l = e[1].replace(/\\([\[\]])/g, "$1");
  if ("!" !== e[0].charAt(0)) {
    r.state.inLink = !0;
    const e = {
      type: "link",
      raw: n,
      href: s,
      title: i,
      text: l,
      tokens: r.inlineTokens(l, []),
    };
    return (r.state.inLink = !1), e;
  }
  return { type: "image", raw: n, href: s, title: i, text: o(l) };
}
class T {
  constructor(e) {
    this.options = e || t;
  }
  space(e) {
    const t = this.rules.block.newline.exec(e);
    if (t && t[0].length > 0) return { type: "space", raw: t[0] };
  }
  code(e) {
    const t = this.rules.block.code.exec(e);
    if (t) {
      const e = t[0].replace(/^ {1,4}/gm, "");
      return {
        type: "code",
        raw: t[0],
        codeBlockStyle: "indented",
        text: this.options.pedantic ? e : z(e, "\n"),
      };
    }
  }
  fences(e) {
    const t = this.rules.block.fences.exec(e);
    if (t) {
      const e = t[0],
        n = (function (e, t) {
          const n = e.match(/^(\s+)(?:```)/);
          if (null === n) return t;
          const r = n[1];
          return t
            .split("\n")
            .map((e) => {
              const t = e.match(/^\s+/);
              if (null === t) return e;
              const [n] = t;
              return n.length >= r.length ? e.slice(r.length) : e;
            })
            .join("\n");
        })(e, t[3] || "");
      return { type: "code", raw: e, lang: t[2] ? t[2].trim() : t[2], text: n };
    }
  }
  heading(e) {
    const t = this.rules.block.heading.exec(e);
    if (t) {
      let e = t[2].trim();
      if (/#$/.test(e)) {
        const t = z(e, "#");
        this.options.pedantic
          ? (e = t.trim())
          : (t && !/ $/.test(t)) || (e = t.trim());
      }
      const n = {
        type: "heading",
        raw: t[0],
        depth: t[1].length,
        text: e,
        tokens: [],
      };
      return this.lexer.inline(n.text, n.tokens), n;
    }
  }
  hr(e) {
    const t = this.rules.block.hr.exec(e);
    if (t) return { type: "hr", raw: t[0] };
  }
  blockquote(e) {
    const t = this.rules.block.blockquote.exec(e);
    if (t) {
      const e = t[0].replace(/^ *> ?/gm, "");
      return {
        type: "blockquote",
        raw: t[0],
        tokens: this.lexer.blockTokens(e, []),
        text: e,
      };
    }
  }
  list(e) {
    let t = this.rules.block.list.exec(e);
    if (t) {
      let n,
        r,
        s,
        i,
        l,
        a,
        o,
        c,
        h,
        p,
        u,
        g,
        d = t[1].trim();
      const f = d.length > 1,
        k = {
          type: "list",
          raw: "",
          ordered: f,
          start: f ? +d.slice(0, -1) : "",
          loose: !1,
          items: [],
        };
      (d = f ? `\\d{1,9}\\${d.slice(-1)}` : `\\${d}`),
        this.options.pedantic && (d = f ? d : "[*+-]");
      const x = new RegExp(`^( {0,3}${d})((?: [^\\n]*)?(?:\\n|$))`);
      for (
        ;
        e && ((g = !1), (t = x.exec(e))) && !this.rules.block.hr.test(e);

      ) {
        if (
          ((n = t[0]),
          (e = e.substring(n.length)),
          (c = t[2].split("\n", 1)[0]),
          (h = e.split("\n", 1)[0]),
          this.options.pedantic
            ? ((i = 2), (u = c.trimLeft()))
            : ((i = t[2].search(/[^ ]/)),
              (i = i > 4 ? 1 : i),
              (u = c.slice(i)),
              (i += t[1].length)),
          (a = !1),
          !c &&
            /^ *$/.test(h) &&
            ((n += h + "\n"), (e = e.substring(h.length + 1)), (g = !0)),
          !g)
        ) {
          const t = new RegExp(
            `^ {0,${Math.min(3, i - 1)}}(?:[*+-]|\\d{1,9}[.)])`
          );
          for (
            ;
            e &&
            ((p = e.split("\n", 1)[0]),
            (c = p),
            this.options.pedantic &&
              (c = c.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ")),
            !t.test(c));

          ) {
            if (c.search(/[^ ]/) >= i || !c.trim()) u += "\n" + c.slice(i);
            else {
              if (a) break;
              u += "\n" + c;
            }
            a || c.trim() || (a = !0),
              (n += p + "\n"),
              (e = e.substring(p.length + 1));
          }
        }
        k.loose || (o ? (k.loose = !0) : /\n *\n *$/.test(n) && (o = !0)),
          this.options.gfm &&
            ((r = /^\[[ xX]\] /.exec(u)),
            r && ((s = "[ ] " !== r[0]), (u = u.replace(/^\[[ xX]\] +/, "")))),
          k.items.push({
            type: "list_item",
            raw: n,
            task: !!r,
            checked: s,
            loose: !1,
            text: u,
          }),
          (k.raw += n);
      }
      (k.items[k.items.length - 1].raw = n.trimRight()),
        (k.items[k.items.length - 1].text = u.trimRight()),
        (k.raw = k.raw.trimRight());
      const m = k.items.length;
      for (l = 0; l < m; l++) {
        (this.lexer.state.top = !1),
          (k.items[l].tokens = this.lexer.blockTokens(k.items[l].text, []));
        const e = k.items[l].tokens.filter((e) => "space" === e.type),
          t = e.every((e) => {
            const t = e.raw.split("");
            let n = 0;
            for (const e of t) if (("\n" === e && (n += 1), n > 1)) return !0;
            return !1;
          });
        !k.loose && e.length && t && ((k.loose = !0), (k.items[l].loose = !0));
      }
      return k;
    }
  }
  html(e) {
    const t = this.rules.block.html.exec(e);
    if (t) {
      const e = {
        type: "html",
        raw: t[0],
        pre:
          !this.options.sanitizer &&
          ("pre" === t[1] || "script" === t[1] || "style" === t[1]),
        text: t[0],
      };
      return (
        this.options.sanitize &&
          ((e.type = "paragraph"),
          (e.text = this.options.sanitizer
            ? this.options.sanitizer(t[0])
            : o(t[0])),
          (e.tokens = []),
          this.lexer.inline(e.text, e.tokens)),
        e
      );
    }
  }
  def(e) {
    const t = this.rules.block.def.exec(e);
    if (t) {
      t[3] && (t[3] = t[3].substring(1, t[3].length - 1));
      return {
        type: "def",
        tag: t[1].toLowerCase().replace(/\s+/g, " "),
        raw: t[0],
        href: t[2],
        title: t[3],
      };
    }
  }
  table(e) {
    const t = this.rules.block.table.exec(e);
    if (t) {
      const e = {
        type: "table",
        header: y(t[1]).map((e) => ({ text: e })),
        align: t[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
        rows:
          t[3] && t[3].trim() ? t[3].replace(/\n[ \t]*$/, "").split("\n") : [],
      };
      if (e.header.length === e.align.length) {
        e.raw = t[0];
        let n,
          r,
          s,
          i,
          l = e.align.length;
        for (n = 0; n < l; n++)
          /^ *-+: *$/.test(e.align[n])
            ? (e.align[n] = "right")
            : /^ *:-+: *$/.test(e.align[n])
            ? (e.align[n] = "center")
            : /^ *:-+ *$/.test(e.align[n])
            ? (e.align[n] = "left")
            : (e.align[n] = null);
        for (l = e.rows.length, n = 0; n < l; n++)
          e.rows[n] = y(e.rows[n], e.header.length).map((e) => ({ text: e }));
        for (l = e.header.length, r = 0; r < l; r++)
          (e.header[r].tokens = []),
            this.lexer.inlineTokens(e.header[r].text, e.header[r].tokens);
        for (l = e.rows.length, r = 0; r < l; r++)
          for (i = e.rows[r], s = 0; s < i.length; s++)
            (i[s].tokens = []), this.lexer.inlineTokens(i[s].text, i[s].tokens);
        return e;
      }
    }
  }
  lheading(e) {
    const t = this.rules.block.lheading.exec(e);
    if (t) {
      const e = {
        type: "heading",
        raw: t[0],
        depth: "=" === t[2].charAt(0) ? 1 : 2,
        text: t[1],
        tokens: [],
      };
      return this.lexer.inline(e.text, e.tokens), e;
    }
  }
  paragraph(e) {
    const t = this.rules.block.paragraph.exec(e);
    if (t) {
      const e = {
        type: "paragraph",
        raw: t[0],
        text: "\n" === t[1].charAt(t[1].length - 1) ? t[1].slice(0, -1) : t[1],
        tokens: [],
      };
      return this.lexer.inline(e.text, e.tokens), e;
    }
  }
  text(e) {
    const t = this.rules.block.text.exec(e);
    if (t) {
      const e = { type: "text", raw: t[0], text: t[0], tokens: [] };
      return this.lexer.inline(e.text, e.tokens), e;
    }
  }
  escape(e) {
    const t = this.rules.inline.escape.exec(e);
    if (t) return { type: "escape", raw: t[0], text: o(t[1]) };
  }
  tag(e) {
    const t = this.rules.inline.tag.exec(e);
    if (t)
      return (
        !this.lexer.state.inLink && /^<a /i.test(t[0])
          ? (this.lexer.state.inLink = !0)
          : this.lexer.state.inLink &&
            /^<\/a>/i.test(t[0]) &&
            (this.lexer.state.inLink = !1),
        !this.lexer.state.inRawBlock &&
        /^<(pre|code|kbd|script)(\s|>)/i.test(t[0])
          ? (this.lexer.state.inRawBlock = !0)
          : this.lexer.state.inRawBlock &&
            /^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0]) &&
            (this.lexer.state.inRawBlock = !1),
        {
          type: this.options.sanitize ? "text" : "html",
          raw: t[0],
          inLink: this.lexer.state.inLink,
          inRawBlock: this.lexer.state.inRawBlock,
          text: this.options.sanitize
            ? this.options.sanitizer
              ? this.options.sanitizer(t[0])
              : o(t[0])
            : t[0],
        }
      );
  }
  link(e) {
    const t = this.rules.inline.link.exec(e);
    if (t) {
      const e = t[2].trim();
      if (!this.options.pedantic && /^</.test(e)) {
        if (!/>$/.test(e)) return;
        const t = z(e.slice(0, -1), "\\");
        if ((e.length - t.length) % 2 == 0) return;
      } else {
        const e = (function (e, t) {
          if (-1 === e.indexOf(t[1])) return -1;
          const n = e.length;
          let r = 0,
            s = 0;
          for (; s < n; s++)
            if ("\\" === e[s]) s++;
            else if (e[s] === t[0]) r++;
            else if (e[s] === t[1] && (r--, r < 0)) return s;
          return -1;
        })(t[2], "()");
        if (e > -1) {
          const n = (0 === t[0].indexOf("!") ? 5 : 4) + t[1].length + e;
          (t[2] = t[2].substring(0, e)),
            (t[0] = t[0].substring(0, n).trim()),
            (t[3] = "");
        }
      }
      let n = t[2],
        r = "";
      if (this.options.pedantic) {
        const e = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(n);
        e && ((n = e[1]), (r = e[3]));
      } else r = t[3] ? t[3].slice(1, -1) : "";
      return (
        (n = n.trim()),
        /^</.test(n) &&
          (n =
            this.options.pedantic && !/>$/.test(e)
              ? n.slice(1)
              : n.slice(1, -1)),
        A(
          t,
          {
            href: n ? n.replace(this.rules.inline._escapes, "$1") : n,
            title: r ? r.replace(this.rules.inline._escapes, "$1") : r,
          },
          t[0],
          this.lexer
        )
      );
    }
  }
  reflink(e, t) {
    let n;
    if (
      (n = this.rules.inline.reflink.exec(e)) ||
      (n = this.rules.inline.nolink.exec(e))
    ) {
      let e = (n[2] || n[1]).replace(/\s+/g, " ");
      if (((e = t[e.toLowerCase()]), !e || !e.href)) {
        const e = n[0].charAt(0);
        return { type: "text", raw: e, text: e };
      }
      return A(n, e, n[0], this.lexer);
    }
  }
  emStrong(e, t, n = "") {
    let r = this.rules.inline.emStrong.lDelim.exec(e);
    if (!r) return;
    if (r[3] && n.match(/[\p{L}\p{N}]/u)) return;
    const s = r[1] || r[2] || "";
    if (!s || (s && ("" === n || this.rules.inline.punctuation.exec(n)))) {
      const n = r[0].length - 1;
      let s,
        i,
        l = n,
        a = 0;
      const o =
        "*" === r[0][0]
          ? this.rules.inline.emStrong.rDelimAst
          : this.rules.inline.emStrong.rDelimUnd;
      for (
        o.lastIndex = 0, t = t.slice(-1 * e.length + n);
        null != (r = o.exec(t));

      ) {
        if (((s = r[1] || r[2] || r[3] || r[4] || r[5] || r[6]), !s)) continue;
        if (((i = s.length), r[3] || r[4])) {
          l += i;
          continue;
        }
        if ((r[5] || r[6]) && n % 3 && !((n + i) % 3)) {
          a += i;
          continue;
        }
        if (((l -= i), l > 0)) continue;
        if (((i = Math.min(i, i + l + a)), Math.min(n, i) % 2)) {
          const t = e.slice(1, n + r.index + i);
          return {
            type: "em",
            raw: e.slice(0, n + r.index + i + 1),
            text: t,
            tokens: this.lexer.inlineTokens(t, []),
          };
        }
        const t = e.slice(2, n + r.index + i - 1);
        return {
          type: "strong",
          raw: e.slice(0, n + r.index + i + 1),
          text: t,
          tokens: this.lexer.inlineTokens(t, []),
        };
      }
    }
  }
  codespan(e) {
    const t = this.rules.inline.code.exec(e);
    if (t) {
      let e = t[2].replace(/\n/g, " ");
      const n = /[^ ]/.test(e),
        r = /^ /.test(e) && / $/.test(e);
      return (
        n && r && (e = e.substring(1, e.length - 1)),
        (e = o(e, !0)),
        { type: "codespan", raw: t[0], text: e }
      );
    }
  }
  br(e) {
    const t = this.rules.inline.br.exec(e);
    if (t) return { type: "br", raw: t[0] };
  }
  del(e) {
    const t = this.rules.inline.del.exec(e);
    if (t)
      return {
        type: "del",
        raw: t[0],
        text: t[2],
        tokens: this.lexer.inlineTokens(t[2], []),
      };
  }
  autolink(e, t) {
    const n = this.rules.inline.autolink.exec(e);
    if (n) {
      let e, r;
      return (
        "@" === n[2]
          ? ((e = o(this.options.mangle ? t(n[1]) : n[1])), (r = "mailto:" + e))
          : ((e = o(n[1])), (r = e)),
        {
          type: "link",
          raw: n[0],
          text: e,
          href: r,
          tokens: [{ type: "text", raw: e, text: e }],
        }
      );
    }
  }
  url(e, t) {
    let n;
    if ((n = this.rules.inline.url.exec(e))) {
      let e, r;
      if ("@" === n[2])
        (e = o(this.options.mangle ? t(n[0]) : n[0])), (r = "mailto:" + e);
      else {
        let t;
        do {
          (t = n[0]), (n[0] = this.rules.inline._backpedal.exec(n[0])[0]);
        } while (t !== n[0]);
        (e = o(n[0])), (r = "www." === n[1] ? "http://" + e : e);
      }
      return {
        type: "link",
        raw: n[0],
        text: e,
        href: r,
        tokens: [{ type: "text", raw: e, text: e }],
      };
    }
  }
  inlineText(e, t) {
    const n = this.rules.inline.text.exec(e);
    if (n) {
      let e;
      return (
        (e = this.lexer.state.inRawBlock
          ? this.options.sanitize
            ? this.options.sanitizer
              ? this.options.sanitizer(n[0])
              : o(n[0])
            : n[0]
          : o(this.options.smartypants ? t(n[0]) : n[0])),
        { type: "text", raw: n[0], text: e }
      );
    }
  }
}
const R = {
  newline: /^(?: *(?:\n|$))+/,
  code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
  fences:
    /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
  hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
  heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
  blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
  list: /^( {0,3}bull)( [^\n]+?)?(?:\n|$)/,
  html: "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
  def: /^ {0,3}\[(label)\]: *(?:\n *)?<?([^\s>]+)>?(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
  table: w,
  lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
  _paragraph:
    /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
  text: /^[^\n]+/,
  _label: /(?!\s*\])(?:\\.|[^\[\]\\])+/,
  _title: /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/,
};
(R.def = u(R.def)
  .replace("label", R._label)
  .replace("title", R._title)
  .getRegex()),
  (R.bullet = /(?:[*+-]|\d{1,9}[.)])/),
  (R.listItemStart = u(/^( *)(bull) */)
    .replace("bull", R.bullet)
    .getRegex()),
  (R.list = u(R.list)
    .replace(/bull/g, R.bullet)
    .replace(
      "hr",
      "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))"
    )
    .replace("def", "\\n+(?=" + R.def.source + ")")
    .getRegex()),
  (R._tag =
    "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul"),
  (R._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/),
  (R.html = u(R.html, "i")
    .replace("comment", R._comment)
    .replace("tag", R._tag)
    .replace(
      "attribute",
      / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/
    )
    .getRegex()),
  (R.paragraph = u(R._paragraph)
    .replace("hr", R.hr)
    .replace("heading", " {0,3}#{1,6} ")
    .replace("|lheading", "")
    .replace("|table", "")
    .replace("blockquote", " {0,3}>")
    .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
    .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
    .replace(
      "html",
      "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)"
    )
    .replace("tag", R._tag)
    .getRegex()),
  (R.blockquote = u(R.blockquote).replace("paragraph", R.paragraph).getRegex()),
  (R.normal = _({}, R)),
  (R.gfm = _({}, R.normal, {
    table:
      "^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)",
  })),
  (R.gfm.table = u(R.gfm.table)
    .replace("hr", R.hr)
    .replace("heading", " {0,3}#{1,6} ")
    .replace("blockquote", " {0,3}>")
    .replace("code", " {4}[^\\n]")
    .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
    .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
    .replace(
      "html",
      "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)"
    )
    .replace("tag", R._tag)
    .getRegex()),
  (R.gfm.paragraph = u(R._paragraph)
    .replace("hr", R.hr)
    .replace("heading", " {0,3}#{1,6} ")
    .replace("|lheading", "")
    .replace("table", R.gfm.table)
    .replace("blockquote", " {0,3}>")
    .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
    .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
    .replace(
      "html",
      "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)"
    )
    .replace("tag", R._tag)
    .getRegex()),
  (R.pedantic = _({}, R.normal, {
    html: u(
      "^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))"
    )
      .replace("comment", R._comment)
      .replace(
        /tag/g,
        "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b"
      )
      .getRegex(),
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
    heading: /^(#{1,6})(.*)(?:\n+|$)/,
    fences: w,
    paragraph: u(R.normal._paragraph)
      .replace("hr", R.hr)
      .replace("heading", " *#{1,6} *[^\n]")
      .replace("lheading", R.lheading)
      .replace("blockquote", " {0,3}>")
      .replace("|fences", "")
      .replace("|list", "")
      .replace("|html", "")
      .getRegex(),
  }));
const v = {
  escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
  autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
  url: w,
  tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
  link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
  reflink: /^!?\[(label)\]\[(ref)\]/,
  nolink: /^!?\[(ref)\](?:\[\])?/,
  reflinkSearch: "reflink|nolink(?!\\()",
  emStrong: {
    lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
    rDelimAst:
      /^[^_*]*?\_\_[^_*]*?\*[^_*]*?(?=\_\_)|[punct_](\*+)(?=[\s]|$)|[^punct*_\s](\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|[^punct*_\s](\*+)(?=[^punct*_\s])/,
    rDelimUnd:
      /^[^_*]*?\*\*[^_*]*?\_[^_*]*?(?=\*\*)|[punct*](\_+)(?=[\s]|$)|[^punct*_\s](\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/,
  },
  code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
  br: /^( {2,}|\\)\n(?!\s*$)/,
  del: w,
  text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
  punctuation: /^([\spunctuation])/,
};
function E(e) {
  return e
    .replace(/---/g, "—")
    .replace(/--/g, "–")
    .replace(/(^|[-\u2014/(\[{"\s])'/g, "$1‘")
    .replace(/'/g, "’")
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1“")
    .replace(/"/g, "”")
    .replace(/\.{3}/g, "…");
}
function I(e) {
  let t,
    n,
    r = "";
  const s = e.length;
  for (t = 0; t < s; t++)
    (n = e.charCodeAt(t)),
      Math.random() > 0.5 && (n = "x" + n.toString(16)),
      (r += "&#" + n + ";");
  return r;
}
(v._punctuation = "!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~"),
  (v.punctuation = u(v.punctuation)
    .replace(/punctuation/g, v._punctuation)
    .getRegex()),
  (v.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g),
  (v.escapedEmSt = /\\\*|\\_/g),
  (v._comment = u(R._comment).replace("(?:--\x3e|$)", "--\x3e").getRegex()),
  (v.emStrong.lDelim = u(v.emStrong.lDelim)
    .replace(/punct/g, v._punctuation)
    .getRegex()),
  (v.emStrong.rDelimAst = u(v.emStrong.rDelimAst, "g")
    .replace(/punct/g, v._punctuation)
    .getRegex()),
  (v.emStrong.rDelimUnd = u(v.emStrong.rDelimUnd, "g")
    .replace(/punct/g, v._punctuation)
    .getRegex()),
  (v._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g),
  (v._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/),
  (v._email =
    /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/),
  (v.autolink = u(v.autolink)
    .replace("scheme", v._scheme)
    .replace("email", v._email)
    .getRegex()),
  (v._attribute =
    /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/),
  (v.tag = u(v.tag)
    .replace("comment", v._comment)
    .replace("attribute", v._attribute)
    .getRegex()),
  (v._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/),
  (v._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/),
  (v._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/),
  (v.link = u(v.link)
    .replace("label", v._label)
    .replace("href", v._href)
    .replace("title", v._title)
    .getRegex()),
  (v.reflink = u(v.reflink)
    .replace("label", v._label)
    .replace("ref", R._label)
    .getRegex()),
  (v.nolink = u(v.nolink).replace("ref", R._label).getRegex()),
  (v.reflinkSearch = u(v.reflinkSearch, "g")
    .replace("reflink", v.reflink)
    .replace("nolink", v.nolink)
    .getRegex()),
  (v.normal = _({}, v)),
  (v.pedantic = _({}, v.normal, {
    strong: {
      start: /^__|\*\*/,
      middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
      endAst: /\*\*(?!\*)/g,
      endUnd: /__(?!_)/g,
    },
    em: {
      start: /^_|\*/,
      middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
      endAst: /\*(?!\*)/g,
      endUnd: /_(?!_)/g,
    },
    link: u(/^!?\[(label)\]\((.*?)\)/)
      .replace("label", v._label)
      .getRegex(),
    reflink: u(/^!?\[(label)\]\s*\[([^\]]*)\]/)
      .replace("label", v._label)
      .getRegex(),
  })),
  (v.gfm = _({}, v.normal, {
    escape: u(v.escape).replace("])", "~|])").getRegex(),
    _extended_email:
      /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
    url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
    _backpedal:
      /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
    del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
    text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/,
  })),
  (v.gfm.url = u(v.gfm.url, "i")
    .replace("email", v.gfm._extended_email)
    .getRegex()),
  (v.breaks = _({}, v.gfm, {
    br: u(v.br).replace("{2,}", "*").getRegex(),
    text: u(v.gfm.text)
      .replace("\\b_", "\\b_| {2,}\\n")
      .replace(/\{2,\}/g, "*")
      .getRegex(),
  }));
class q {
  constructor(e) {
    (this.tokens = []),
      (this.tokens.links = Object.create(null)),
      (this.options = e || t),
      (this.options.tokenizer = this.options.tokenizer || new T()),
      (this.tokenizer = this.options.tokenizer),
      (this.tokenizer.options = this.options),
      (this.tokenizer.lexer = this),
      (this.inlineQueue = []),
      (this.state = { inLink: !1, inRawBlock: !1, top: !0 });
    const n = { block: R.normal, inline: v.normal };
    this.options.pedantic
      ? ((n.block = R.pedantic), (n.inline = v.pedantic))
      : this.options.gfm &&
        ((n.block = R.gfm),
        this.options.breaks ? (n.inline = v.breaks) : (n.inline = v.gfm)),
      (this.tokenizer.rules = n);
  }
  static get rules() {
    return { block: R, inline: v };
  }
  static lex(e, t) {
    return new q(t).lex(e);
  }
  static lexInline(e, t) {
    return new q(t).inlineTokens(e);
  }
  lex(e) {
    let t;
    for (
      e = e.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    "),
        this.blockTokens(e, this.tokens);
      (t = this.inlineQueue.shift());

    )
      this.inlineTokens(t.src, t.tokens);
    return this.tokens;
  }
  blockTokens(e, t = []) {
    let n, r, s, i;
    for (this.options.pedantic && (e = e.replace(/^ +$/gm, "")); e; )
      if (
        !(
          this.options.extensions &&
          this.options.extensions.block &&
          this.options.extensions.block.some(
            (r) =>
              !!(n = r.call({ lexer: this }, e, t)) &&
              ((e = e.substring(n.raw.length)), t.push(n), !0)
          )
        )
      )
        if ((n = this.tokenizer.space(e)))
          (e = e.substring(n.raw.length)),
            1 === n.raw.length && t.length > 0
              ? (t[t.length - 1].raw += "\n")
              : t.push(n);
        else if ((n = this.tokenizer.code(e)))
          (e = e.substring(n.raw.length)),
            (r = t[t.length - 1]),
            !r || ("paragraph" !== r.type && "text" !== r.type)
              ? t.push(n)
              : ((r.raw += "\n" + n.raw),
                (r.text += "\n" + n.text),
                (this.inlineQueue[this.inlineQueue.length - 1].src = r.text));
        else if ((n = this.tokenizer.fences(e)))
          (e = e.substring(n.raw.length)), t.push(n);
        else if ((n = this.tokenizer.heading(e)))
          (e = e.substring(n.raw.length)), t.push(n);
        else if ((n = this.tokenizer.hr(e)))
          (e = e.substring(n.raw.length)), t.push(n);
        else if ((n = this.tokenizer.blockquote(e)))
          (e = e.substring(n.raw.length)), t.push(n);
        else if ((n = this.tokenizer.list(e)))
          (e = e.substring(n.raw.length)), t.push(n);
        else if ((n = this.tokenizer.html(e)))
          (e = e.substring(n.raw.length)), t.push(n);
        else if ((n = this.tokenizer.def(e)))
          (e = e.substring(n.raw.length)),
            (r = t[t.length - 1]),
            !r || ("paragraph" !== r.type && "text" !== r.type)
              ? this.tokens.links[n.tag] ||
                (this.tokens.links[n.tag] = { href: n.href, title: n.title })
              : ((r.raw += "\n" + n.raw),
                (r.text += "\n" + n.raw),
                (this.inlineQueue[this.inlineQueue.length - 1].src = r.text));
        else if ((n = this.tokenizer.table(e)))
          (e = e.substring(n.raw.length)), t.push(n);
        else if ((n = this.tokenizer.lheading(e)))
          (e = e.substring(n.raw.length)), t.push(n);
        else {
          if (
            ((s = e),
            this.options.extensions && this.options.extensions.startBlock)
          ) {
            let t = 1 / 0;
            const n = e.slice(1);
            let r;
            this.options.extensions.startBlock.forEach(function (e) {
              (r = e.call({ lexer: this }, n)),
                "number" == typeof r && r >= 0 && (t = Math.min(t, r));
            }),
              t < 1 / 0 && t >= 0 && (s = e.substring(0, t + 1));
          }
          if (this.state.top && (n = this.tokenizer.paragraph(s)))
            (r = t[t.length - 1]),
              i && "paragraph" === r.type
                ? ((r.raw += "\n" + n.raw),
                  (r.text += "\n" + n.text),
                  this.inlineQueue.pop(),
                  (this.inlineQueue[this.inlineQueue.length - 1].src = r.text))
                : t.push(n),
              (i = s.length !== e.length),
              (e = e.substring(n.raw.length));
          else if ((n = this.tokenizer.text(e)))
            (e = e.substring(n.raw.length)),
              (r = t[t.length - 1]),
              r && "text" === r.type
                ? ((r.raw += "\n" + n.raw),
                  (r.text += "\n" + n.text),
                  this.inlineQueue.pop(),
                  (this.inlineQueue[this.inlineQueue.length - 1].src = r.text))
                : t.push(n);
          else if (e) {
            const t = "Infinite loop on byte: " + e.charCodeAt(0);
            if (this.options.silent) {
              console.error(t);
              break;
            }
            throw new Error(t);
          }
        }
    return (this.state.top = !0), t;
  }
  inline(e, t) {
    this.inlineQueue.push({ src: e, tokens: t });
  }
  inlineTokens(e, t = []) {
    let n,
      r,
      s,
      i,
      l,
      a,
      o = e;
    if (this.tokens.links) {
      const e = Object.keys(this.tokens.links);
      if (e.length > 0)
        for (
          ;
          null != (i = this.tokenizer.rules.inline.reflinkSearch.exec(o));

        )
          e.includes(i[0].slice(i[0].lastIndexOf("[") + 1, -1)) &&
            (o =
              o.slice(0, i.index) +
              "[" +
              $("a", i[0].length - 2) +
              "]" +
              o.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; null != (i = this.tokenizer.rules.inline.blockSkip.exec(o)); )
      o =
        o.slice(0, i.index) +
        "[" +
        $("a", i[0].length - 2) +
        "]" +
        o.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    for (; null != (i = this.tokenizer.rules.inline.escapedEmSt.exec(o)); )
      o =
        o.slice(0, i.index) +
        "++" +
        o.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex);
    for (; e; )
      if (
        (l || (a = ""),
        (l = !1),
        !(
          this.options.extensions &&
          this.options.extensions.inline &&
          this.options.extensions.inline.some(
            (r) =>
              !!(n = r.call({ lexer: this }, e, t)) &&
              ((e = e.substring(n.raw.length)), t.push(n), !0)
          )
        ))
      )
        if ((n = this.tokenizer.escape(e)))
          (e = e.substring(n.raw.length)), t.push(n);
        else if ((n = this.tokenizer.tag(e)))
          (e = e.substring(n.raw.length)),
            (r = t[t.length - 1]),
            r && "text" === n.type && "text" === r.type
              ? ((r.raw += n.raw), (r.text += n.text))
              : t.push(n);
        else if ((n = this.tokenizer.link(e)))
          (e = e.substring(n.raw.length)), t.push(n);
        else if ((n = this.tokenizer.reflink(e, this.tokens.links)))
          (e = e.substring(n.raw.length)),
            (r = t[t.length - 1]),
            r && "text" === n.type && "text" === r.type
              ? ((r.raw += n.raw), (r.text += n.text))
              : t.push(n);
        else if ((n = this.tokenizer.emStrong(e, o, a)))
          (e = e.substring(n.raw.length)), t.push(n);
        else if ((n = this.tokenizer.codespan(e)))
          (e = e.substring(n.raw.length)), t.push(n);
        else if ((n = this.tokenizer.br(e)))
          (e = e.substring(n.raw.length)), t.push(n);
        else if ((n = this.tokenizer.del(e)))
          (e = e.substring(n.raw.length)), t.push(n);
        else if ((n = this.tokenizer.autolink(e, I)))
          (e = e.substring(n.raw.length)), t.push(n);
        else if (this.state.inLink || !(n = this.tokenizer.url(e, I))) {
          if (
            ((s = e),
            this.options.extensions && this.options.extensions.startInline)
          ) {
            let t = 1 / 0;
            const n = e.slice(1);
            let r;
            this.options.extensions.startInline.forEach(function (e) {
              (r = e.call({ lexer: this }, n)),
                "number" == typeof r && r >= 0 && (t = Math.min(t, r));
            }),
              t < 1 / 0 && t >= 0 && (s = e.substring(0, t + 1));
          }
          if ((n = this.tokenizer.inlineText(s, E)))
            (e = e.substring(n.raw.length)),
              "_" !== n.raw.slice(-1) && (a = n.raw.slice(-1)),
              (l = !0),
              (r = t[t.length - 1]),
              r && "text" === r.type
                ? ((r.raw += n.raw), (r.text += n.text))
                : t.push(n);
          else if (e) {
            const t = "Infinite loop on byte: " + e.charCodeAt(0);
            if (this.options.silent) {
              console.error(t);
              break;
            }
            throw new Error(t);
          }
        } else (e = e.substring(n.raw.length)), t.push(n);
    return t;
  }
}
class L {
  constructor(e) {
    this.options = e || t;
  }
  code(e, t, n) {
    const r = (t || "").match(/\S*/)[0];
    if (this.options.highlight) {
      const t = this.options.highlight(e, r);
      null != t && t !== e && ((n = !0), (e = t));
    }
    return (
      (e = e.replace(/\n$/, "") + "\n"),
      r
        ? '<pre><code class="' +
          this.options.langPrefix +
          o(r, !0) +
          '">' +
          (n ? e : o(e, !0)) +
          "</code></pre>\n"
        : "<pre><code>" + (n ? e : o(e, !0)) + "</code></pre>\n"
    );
  }
  blockquote(e) {
    return "<blockquote>\n" + e + "</blockquote>\n";
  }
  html(e) {
    return e;
  }
  heading(e, t, n, r) {
    return this.options.headerIds
      ? "<h" +
          t +
          ' id="' +
          this.options.headerPrefix +
          r.slug(n) +
          '">' +
          e +
          "</h" +
          t +
          ">\n"
      : "<h" + t + ">" + e + "</h" + t + ">\n";
  }
  hr() {
    return this.options.xhtml ? "<hr/>\n" : "<hr>\n";
  }
  list(e, t, n) {
    const r = t ? "ol" : "ul";
    return (
      "<" +
      r +
      (t && 1 !== n ? ' start="' + n + '"' : "") +
      ">\n" +
      e +
      "</" +
      r +
      ">\n"
    );
  }
  listitem(e) {
    return "<li>" + e + "</li>\n";
  }
  checkbox(e) {
    return (
      "<input " +
      (e ? 'checked="" ' : "") +
      'disabled="" type="checkbox"' +
      (this.options.xhtml ? " /" : "") +
      "> "
    );
  }
  paragraph(e) {
    return "<p>" + e + "</p>\n";
  }
  table(e, t) {
    return (
      t && (t = "<tbody>" + t + "</tbody>"),
      "<table>\n<thead>\n" + e + "</thead>\n" + t + "</table>\n"
    );
  }
  tablerow(e) {
    return "<tr>\n" + e + "</tr>\n";
  }
  tablecell(e, t) {
    const n = t.header ? "th" : "td";
    return (
      (t.align ? "<" + n + ' align="' + t.align + '">' : "<" + n + ">") +
      e +
      "</" +
      n +
      ">\n"
    );
  }
  strong(e) {
    return "<strong>" + e + "</strong>";
  }
  em(e) {
    return "<em>" + e + "</em>";
  }
  codespan(e) {
    return "<code>" + e + "</code>";
  }
  br() {
    return this.options.xhtml ? "<br/>" : "<br>";
  }
  del(e) {
    return "<del>" + e + "</del>";
  }
  link(e, t, n) {
    if (null === (e = f(this.options.sanitize, this.options.baseUrl, e)))
      return n;
    let r = '<a href="' + o(e) + '"';
    return t && (r += ' title="' + t + '"'), (r += ">" + n + "</a>"), r;
  }
  image(e, t, n) {
    if (null === (e = f(this.options.sanitize, this.options.baseUrl, e)))
      return n;
    let r = '<img src="' + e + '" alt="' + n + '"';
    return (
      t && (r += ' title="' + t + '"'),
      (r += this.options.xhtml ? "/>" : ">"),
      r
    );
  }
  text(e) {
    return e;
  }
}
class C {
  strong(e) {
    return e;
  }
  em(e) {
    return e;
  }
  codespan(e) {
    return e;
  }
  del(e) {
    return e;
  }
  html(e) {
    return e;
  }
  text(e) {
    return e;
  }
  link(e, t, n) {
    return "" + n;
  }
  image(e, t, n) {
    return "" + n;
  }
  br() {
    return "";
  }
}
class Z {
  constructor() {
    this.seen = {};
  }
  serialize(e) {
    return e
      .toLowerCase()
      .trim()
      .replace(/<[!\/a-z].*?>/gi, "")
      .replace(
        /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,
        ""
      )
      .replace(/\s/g, "-");
  }
  getNextSafeSlug(e, t) {
    let n = e,
      r = 0;
    if (this.seen.hasOwnProperty(n)) {
      r = this.seen[e];
      do {
        r++, (n = e + "-" + r);
      } while (this.seen.hasOwnProperty(n));
    }
    return t || ((this.seen[e] = r), (this.seen[n] = 0)), n;
  }
  slug(e, t = {}) {
    const n = this.serialize(e);
    return this.getNextSafeSlug(n, t.dryrun);
  }
}
class O {
  constructor(e) {
    (this.options = e || t),
      (this.options.renderer = this.options.renderer || new L()),
      (this.renderer = this.options.renderer),
      (this.renderer.options = this.options),
      (this.textRenderer = new C()),
      (this.slugger = new Z());
  }
  static parse(e, t) {
    return new O(t).parse(e);
  }
  static parseInline(e, t) {
    return new O(t).parseInline(e);
  }
  parse(e, t = !0) {
    let n,
      r,
      s,
      i,
      l,
      a,
      o,
      c,
      p,
      u,
      g,
      d,
      f,
      k,
      x,
      m,
      b,
      w,
      _,
      y = "";
    const z = e.length;
    for (n = 0; n < z; n++)
      if (
        ((u = e[n]),
        this.options.extensions &&
          this.options.extensions.renderers &&
          this.options.extensions.renderers[u.type] &&
          ((_ = this.options.extensions.renderers[u.type].call(
            { parser: this },
            u
          )),
          !1 !== _ ||
            ![
              "space",
              "hr",
              "heading",
              "code",
              "table",
              "blockquote",
              "list",
              "html",
              "paragraph",
              "text",
            ].includes(u.type)))
      )
        y += _ || "";
      else
        switch (u.type) {
          case "space":
            continue;
          case "hr":
            y += this.renderer.hr();
            continue;
          case "heading":
            y += this.renderer.heading(
              this.parseInline(u.tokens),
              u.depth,
              h(this.parseInline(u.tokens, this.textRenderer)),
              this.slugger
            );
            continue;
          case "code":
            y += this.renderer.code(u.text, u.lang, u.escaped);
            continue;
          case "table":
            for (c = "", o = "", i = u.header.length, r = 0; r < i; r++)
              o += this.renderer.tablecell(
                this.parseInline(u.header[r].tokens),
                { header: !0, align: u.align[r] }
              );
            for (
              c += this.renderer.tablerow(o), p = "", i = u.rows.length, r = 0;
              r < i;
              r++
            ) {
              for (a = u.rows[r], o = "", l = a.length, s = 0; s < l; s++)
                o += this.renderer.tablecell(this.parseInline(a[s].tokens), {
                  header: !1,
                  align: u.align[s],
                });
              p += this.renderer.tablerow(o);
            }
            y += this.renderer.table(c, p);
            continue;
          case "blockquote":
            (p = this.parse(u.tokens)), (y += this.renderer.blockquote(p));
            continue;
          case "list":
            for (
              g = u.ordered,
                d = u.start,
                f = u.loose,
                i = u.items.length,
                p = "",
                r = 0;
              r < i;
              r++
            )
              (x = u.items[r]),
                (m = x.checked),
                (b = x.task),
                (k = ""),
                x.task &&
                  ((w = this.renderer.checkbox(m)),
                  f
                    ? x.tokens.length > 0 && "paragraph" === x.tokens[0].type
                      ? ((x.tokens[0].text = w + " " + x.tokens[0].text),
                        x.tokens[0].tokens &&
                          x.tokens[0].tokens.length > 0 &&
                          "text" === x.tokens[0].tokens[0].type &&
                          (x.tokens[0].tokens[0].text =
                            w + " " + x.tokens[0].tokens[0].text))
                      : x.tokens.unshift({ type: "text", text: w })
                    : (k += w)),
                (k += this.parse(x.tokens, f)),
                (p += this.renderer.listitem(k, b, m));
            y += this.renderer.list(p, g, d);
            continue;
          case "html":
            y += this.renderer.html(u.text);
            continue;
          case "paragraph":
            y += this.renderer.paragraph(this.parseInline(u.tokens));
            continue;
          case "text":
            for (
              p = u.tokens ? this.parseInline(u.tokens) : u.text;
              n + 1 < z && "text" === e[n + 1].type;

            )
              (u = e[++n]),
                (p += "\n" + (u.tokens ? this.parseInline(u.tokens) : u.text));
            y += t ? this.renderer.paragraph(p) : p;
            continue;
          default: {
            const e = 'Token with "' + u.type + '" type was not found.';
            if (this.options.silent) return void console.error(e);
            throw new Error(e);
          }
        }
    return y;
  }
  parseInline(e, t) {
    t = t || this.renderer;
    let n,
      r,
      s,
      i = "";
    const l = e.length;
    for (n = 0; n < l; n++)
      if (
        ((r = e[n]),
        this.options.extensions &&
          this.options.extensions.renderers &&
          this.options.extensions.renderers[r.type] &&
          ((s = this.options.extensions.renderers[r.type].call(
            { parser: this },
            r
          )),
          !1 !== s ||
            ![
              "escape",
              "html",
              "link",
              "image",
              "strong",
              "em",
              "codespan",
              "br",
              "del",
              "text",
            ].includes(r.type)))
      )
        i += s || "";
      else
        switch (r.type) {
          case "escape":
          case "text":
            i += t.text(r.text);
            break;
          case "html":
            i += t.html(r.text);
            break;
          case "link":
            i += t.link(r.href, r.title, this.parseInline(r.tokens, t));
            break;
          case "image":
            i += t.image(r.href, r.title, r.text);
            break;
          case "strong":
            i += t.strong(this.parseInline(r.tokens, t));
            break;
          case "em":
            i += t.em(this.parseInline(r.tokens, t));
            break;
          case "codespan":
            i += t.codespan(r.text);
            break;
          case "br":
            i += t.br();
            break;
          case "del":
            i += t.del(this.parseInline(r.tokens, t));
            break;
          default: {
            const e = 'Token with "' + r.type + '" type was not found.';
            if (this.options.silent) return void console.error(e);
            throw new Error(e);
          }
        }
    return i;
  }
}
function N(e, t, n) {
  if (null == e)
    throw new Error("marked(): input parameter is undefined or null");
  if ("string" != typeof e)
    throw new Error(
      "marked(): input parameter is of type " +
        Object.prototype.toString.call(e) +
        ", string expected"
    );
  if (
    ("function" == typeof t && ((n = t), (t = null)),
    S((t = _({}, N.defaults, t || {}))),
    n)
  ) {
    const r = t.highlight;
    let s;
    try {
      s = q.lex(e, t);
    } catch (e) {
      return n(e);
    }
    const i = function (e) {
      let i;
      if (!e)
        try {
          t.walkTokens && N.walkTokens(s, t.walkTokens), (i = O.parse(s, t));
        } catch (t) {
          e = t;
        }
      return (t.highlight = r), e ? n(e) : n(null, i);
    };
    if (!r || r.length < 3) return i();
    if ((delete t.highlight, !s.length)) return i();
    let l = 0;
    return (
      N.walkTokens(s, function (e) {
        "code" === e.type &&
          (l++,
          setTimeout(() => {
            r(e.text, e.lang, function (t, n) {
              if (t) return i(t);
              null != n && n !== e.text && ((e.text = n), (e.escaped = !0)),
                l--,
                0 === l && i();
            });
          }, 0));
      }),
      void (0 === l && i())
    );
  }
  try {
    const n = q.lex(e, t);
    return t.walkTokens && N.walkTokens(n, t.walkTokens), O.parse(n, t);
  } catch (e) {
    if (
      ((e.message +=
        "\nPlease report this to https://github.com/markedjs/marked."),
      t.silent)
    )
      return (
        "<p>An error occurred:</p><pre>" + o(e.message + "", !0) + "</pre>"
      );
    throw e;
  }
}
(N.options = N.setOptions =
  function (e) {
    var n;
    return _(N.defaults, e), (n = N.defaults), (t = n), N;
  }),
  (N.getDefaults = e),
  (N.defaults = t),
  (N.use = function (...e) {
    const t = _({}, ...e),
      n = N.defaults.extensions || { renderers: {}, childTokens: {} };
    let r;
    e.forEach((e) => {
      if (
        (e.extensions &&
          ((r = !0),
          e.extensions.forEach((e) => {
            if (!e.name) throw new Error("extension name required");
            if (e.renderer) {
              const t = n.renderers ? n.renderers[e.name] : null;
              n.renderers[e.name] = t
                ? function (...n) {
                    let r = e.renderer.apply(this, n);
                    return !1 === r && (r = t.apply(this, n)), r;
                  }
                : e.renderer;
            }
            if (e.tokenizer) {
              if (!e.level || ("block" !== e.level && "inline" !== e.level))
                throw new Error("extension level must be 'block' or 'inline'");
              n[e.level]
                ? n[e.level].unshift(e.tokenizer)
                : (n[e.level] = [e.tokenizer]),
                e.start &&
                  ("block" === e.level
                    ? n.startBlock
                      ? n.startBlock.push(e.start)
                      : (n.startBlock = [e.start])
                    : "inline" === e.level &&
                      (n.startInline
                        ? n.startInline.push(e.start)
                        : (n.startInline = [e.start])));
            }
            e.childTokens && (n.childTokens[e.name] = e.childTokens);
          })),
        e.renderer)
      ) {
        const n = N.defaults.renderer || new L();
        for (const t in e.renderer) {
          const r = n[t];
          n[t] = (...s) => {
            let i = e.renderer[t].apply(n, s);
            return !1 === i && (i = r.apply(n, s)), i;
          };
        }
        t.renderer = n;
      }
      if (e.tokenizer) {
        const n = N.defaults.tokenizer || new T();
        for (const t in e.tokenizer) {
          const r = n[t];
          n[t] = (...s) => {
            let i = e.tokenizer[t].apply(n, s);
            return !1 === i && (i = r.apply(n, s)), i;
          };
        }
        t.tokenizer = n;
      }
      if (e.walkTokens) {
        const n = N.defaults.walkTokens;
        t.walkTokens = function (t) {
          e.walkTokens.call(this, t), n && n.call(this, t);
        };
      }
      r && (t.extensions = n), N.setOptions(t);
    });
  }),
  (N.walkTokens = function (e, t) {
    for (const n of e)
      switch ((t.call(N, n), n.type)) {
        case "table":
          for (const e of n.header) N.walkTokens(e.tokens, t);
          for (const e of n.rows) for (const n of e) N.walkTokens(n.tokens, t);
          break;
        case "list":
          N.walkTokens(n.items, t);
          break;
        default:
          N.defaults.extensions &&
          N.defaults.extensions.childTokens &&
          N.defaults.extensions.childTokens[n.type]
            ? N.defaults.extensions.childTokens[n.type].forEach(function (e) {
                N.walkTokens(n[e], t);
              })
            : n.tokens && N.walkTokens(n.tokens, t);
      }
  }),
  (N.parseInline = function (e, t) {
    if (null == e)
      throw new Error(
        "marked.parseInline(): input parameter is undefined or null"
      );
    if ("string" != typeof e)
      throw new Error(
        "marked.parseInline(): input parameter is of type " +
          Object.prototype.toString.call(e) +
          ", string expected"
      );
    S((t = _({}, N.defaults, t || {})));
    try {
      const n = q.lexInline(e, t);
      return t.walkTokens && N.walkTokens(n, t.walkTokens), O.parseInline(n, t);
    } catch (e) {
      if (
        ((e.message +=
          "\nPlease report this to https://github.com/markedjs/marked."),
        t.silent)
      )
        return (
          "<p>An error occurred:</p><pre>" + o(e.message + "", !0) + "</pre>"
        );
      throw e;
    }
  }),
  (N.Parser = O),
  (N.parser = O.parse),
  (N.Renderer = L),
  (N.TextRenderer = C),
  (N.Lexer = q),
  (N.lexer = q.lex),
  (N.Tokenizer = T),
  (N.Slugger = Z),
  (N.parse = N);
/*!
 * The reveal.js markdown plugin. Handles parsing of
 * markdown inside of presentations as well as loading
 * of external markdown documents.
 */
const D = "__SCRIPT_END__",
  P = /\[\s*((\d*):)?\s*([\s\d,|-]*)\]/,
  M = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
export default () => {
  let e;
  function t(e) {
    var t = (
        e.querySelector("[data-template]") ||
        e.querySelector("script") ||
        e
      ).textContent,
      n = (t = t.replace(new RegExp(D, "g"), "</script>")).match(/^\n?(\s*)/)[1]
        .length,
      r = t.match(/^\n?(\t*)/)[1].length;
    return (
      r > 0
        ? (t = t.replace(
            new RegExp("\\n?\\t{" + r + "}(.*)", "g"),
            function (e, t) {
              return "\n" + t;
            }
          ))
        : n > 1 &&
          (t = t.replace(
            new RegExp("\\n? {" + n + "}(.*)", "g"),
            function (e, t) {
              return "\n" + t;
            }
          )),
      t
    );
  }
  function n(e) {
    for (var t = e.attributes, n = [], r = 0, s = t.length; r < s; r++) {
      var i = t[r].name,
        l = t[r].value;
      /data\-(markdown|separator|vertical|notes)/gi.test(i) ||
        (l ? n.push(i + '="' + l + '"') : n.push(i));
    }
    return n.join(" ");
  }
  function r(t) {
    const n = e.getConfig().markdown;
    return (
      ((t = t || {}).separator =
        t.separator || (null == n ? void 0 : n.separator) || "\r?\n---\r?\n"),
      (t.verticalSeparator =
        t.verticalSeparator ||
        (null == n ? void 0 : n.verticalSeparator) ||
        null),
      (t.notesSeparator =
        t.notesSeparator ||
        (null == n ? void 0 : n.notesSeparator) ||
        "^s*notes?:"),
      (t.attributes = t.attributes || ""),
      t
    );
  }
  function s(e, t) {
    t = r(t);
    var n = e.split(new RegExp(t.notesSeparator, "mgi"));
    return (
      2 === n.length &&
        (e = n[0] + '<aside class="notes">' + N(n[1].trim()) + "</aside>"),
      '<script type="text/template">' +
        (e = e.replace(/<\/script>/g, D)) +
        "</script>"
    );
  }
  function i(e, t) {
    t = r(t);
    for (
      var n,
        i,
        l,
        a = new RegExp(
          t.separator + (t.verticalSeparator ? "|" + t.verticalSeparator : ""),
          "mg"
        ),
        o = new RegExp(t.separator),
        c = 0,
        h = !0,
        p = [];
      (n = a.exec(e));

    )
      !(i = o.test(n[0])) && h && p.push([]),
        (l = e.substring(c, n.index)),
        i && h ? p.push(l) : p[p.length - 1].push(l),
        (c = a.lastIndex),
        (h = i);
    (h ? p : p[p.length - 1]).push(e.substring(c));
    for (var u = "", g = 0, d = p.length; g < d; g++)
      p[g] instanceof Array
        ? ((u += "<section " + t.attributes + ">"),
          p[g].forEach(function (e) {
            u += "<section data-markdown>" + s(e, t) + "</section>";
          }),
          (u += "</section>"))
        : (u +=
            "<section " +
            t.attributes +
            " data-markdown>" +
            s(p[g], t) +
            "</section>");
    return u;
  }
  function l(e) {
    return new Promise(function (r) {
      var s = [];
      [].slice
        .call(
          e.querySelectorAll(
            "section[data-markdown]:not([data-markdown-parsed])"
          )
        )
        .forEach(function (e, r) {
          e.getAttribute("data-markdown").length
            ? s.push(
                (function (e) {
                  return new Promise(function (t, n) {
                    var r = new XMLHttpRequest(),
                      s = e.getAttribute("data-markdown"),
                      i = e.getAttribute("data-charset");
                    null != i &&
                      "" != i &&
                      r.overrideMimeType("text/html; charset=" + i),
                      (r.onreadystatechange = function (e, r) {
                        4 === r.readyState &&
                          ((r.status >= 200 && r.status < 300) || 0 === r.status
                            ? t(r, s)
                            : n(r, s));
                      }.bind(this, e, r)),
                      r.open("GET", s, !0);
                    try {
                      r.send();
                    } catch (e) {
                      console.warn(
                        "Failed to get the Markdown file " +
                          s +
                          ". Make sure that the presentation and the file are served by a HTTP server and the file can be found there. " +
                          e
                      ),
                        t(r, s);
                    }
                  });
                })(e).then(
                  function (t, r) {
                    e.outerHTML = i(t.responseText, {
                      separator: e.getAttribute("data-separator"),
                      verticalSeparator: e.getAttribute(
                        "data-separator-vertical"
                      ),
                      notesSeparator: e.getAttribute("data-separator-notes"),
                      attributes: n(e),
                    });
                  },
                  function (t, n) {
                    e.outerHTML =
                      '<section data-state="alert">ERROR: The attempt to fetch ' +
                      n +
                      " failed with HTTP status " +
                      t.status +
                      ".Check your browser's JavaScript console for more details.<p>Remember that you need to serve the presentation HTML from a HTTP server.</p></section>";
                  }
                )
              )
            : (e.outerHTML = i(t(e), {
                separator: e.getAttribute("data-separator"),
                verticalSeparator: e.getAttribute("data-separator-vertical"),
                notesSeparator: e.getAttribute("data-separator-notes"),
                attributes: n(e),
              }));
        }),
        Promise.all(s).then(r);
    });
  }
  function a(e, t, n) {
    var r,
      s,
      i = new RegExp(n, "mg"),
      l = new RegExp('([^"= ]+?)="([^"]+?)"|(data-[^"= ]+?)(?=[" ])', "mg"),
      a = e.nodeValue;
    if ((r = i.exec(a))) {
      var o = r[1];
      for (
        a = a.substring(0, r.index) + a.substring(i.lastIndex), e.nodeValue = a;
        (s = l.exec(o));

      )
        s[2] ? t.setAttribute(s[1], s[2]) : t.setAttribute(s[3], "");
      return !0;
    }
    return !1;
  }
  function o(e, t, n, r, s) {
    if (null != t && null != t.childNodes && t.childNodes.length > 0)
      for (var i = t, l = 0; l < t.childNodes.length; l++) {
        var c = t.childNodes[l];
        if (l > 0)
          for (var h = l - 1; h >= 0; ) {
            var p = t.childNodes[h];
            if ("function" == typeof p.setAttribute && "BR" != p.tagName) {
              i = p;
              break;
            }
            h -= 1;
          }
        var u = e;
        "section" == c.nodeName && ((u = c), (i = c)),
          ("function" != typeof c.setAttribute &&
            c.nodeType != Node.COMMENT_NODE) ||
            o(u, c, i, r, s);
      }
    t.nodeType == Node.COMMENT_NODE && 0 == a(t, n, r) && a(t, e, s);
  }
  function c() {
    var n = e
      .getRevealElement()
      .querySelectorAll("[data-markdown]:not([data-markdown-parsed])");
    return (
      [].slice.call(n).forEach(function (e) {
        e.setAttribute("data-markdown-parsed", !0);
        var n = e.querySelector("aside.notes"),
          r = t(e);
        (e.innerHTML = N(r)),
          o(
            e,
            e,
            null,
            e.getAttribute("data-element-attributes") ||
              e.parentNode.getAttribute("data-element-attributes") ||
              "\\.element\\s*?(.+?)$",
            e.getAttribute("data-attributes") ||
              e.parentNode.getAttribute("data-attributes") ||
              "\\.slide:\\s*?(\\S.+?)$"
          ),
          n && e.appendChild(n);
      }),
      Promise.resolve()
    );
  }
  return {
    id: "markdown",
    init: function (t) {
      e = t;
      let { renderer: n, animateLists: r, ...s } = e.getConfig().markdown || {};
      return (
        n ||
          ((n = new N.Renderer()),
          (n.code = (e, t) => {
            let n = "",
              r = "";
            if (P.test(t)) {
              let e = t.match(P)[2];
              e && (n = `data-ln-start-from="${e.trim()}"`),
                (r = t.match(P)[3].trim()),
                (r = `data-line-numbers="${r}"`),
                (t = t.replace(P, "").trim());
            }
            return `<pre><code ${r} ${n} class="${t}">${(e = e.replace(
              /([&<>'"])/g,
              (e) => M[e]
            ))}</code></pre>`;
          })),
        !0 === r && (n.listitem = (e) => `<li class="fragment">${e}</li>`),
        N.setOptions({ renderer: n, ...s }),
        l(e.getRevealElement()).then(c)
      );
    },
    processSlides: l,
    convertSlides: c,
    slidify: i,
    marked: N,
  };
};
