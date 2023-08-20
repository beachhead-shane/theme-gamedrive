!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : ((t =
        "undefined" != typeof globalThis ? globalThis : t || self).RevealMath =
        e());
})(this, function () {
  "use strict";
  const t = () => {
      let t,
        e = {
          messageStyle: "none",
          tex2jax: {
            inlineMath: [
              ["$", "$"],
              ["\\(", "\\)"],
            ],
            skipTags: ["script", "noscript", "style", "textarea", "pre"],
          },
          skipStartupTypeset: !0,
        };
      return {
        id: "mathjax2",
        init: function (n) {
          t = n;
          let a = t.getConfig().mathjax2 || t.getConfig().math || {},
            i = { ...e, ...a },
            s =
              (i.mathjax ||
                "https://cdn.jsdelivr.net/npm/mathjax@2/MathJax.js") +
              "?config=" +
              (i.config || "TeX-AMS_HTML-full");
          (i.tex2jax = { ...e.tex2jax, ...a.tex2jax }),
            (i.mathjax = i.config = null),
            (function (t, e) {
              let n = document.querySelector("head"),
                a = document.createElement("script");
              (a.type = "text/javascript"), (a.src = t);
              let i = () => {
                "function" == typeof e && (e.call(), (e = null));
              };
              (a.onload = i),
                (a.onreadystatechange = () => {
                  "loaded" === this.readyState && i();
                }),
                n.appendChild(a);
            })(s, function () {
              MathJax.Hub.Config(i),
                MathJax.Hub.Queue([
                  "Typeset",
                  MathJax.Hub,
                  t.getRevealElement(),
                ]),
                MathJax.Hub.Queue(t.layout),
                t.on("slidechanged", function (t) {
                  MathJax.Hub.Queue(["Typeset", MathJax.Hub, t.currentSlide]);
                });
            });
        },
      };
    },
    e = t;
  return (Plugin = Object.assign(e(), {
    KaTeX: () => {
      let t,
        e = {
          version: "latest",
          delimiters: [
            { left: "$$", right: "$$", display: !0 },
            { left: "$", right: "$", display: !1 },
            { left: "\\(", right: "\\)", display: !1 },
            { left: "\\[", right: "\\]", display: !0 },
          ],
          ignoredTags: ["script", "noscript", "style", "textarea", "pre"],
        };
      const n = (t) =>
        new Promise((e, n) => {
          const a = document.createElement("script");
          (a.type = "text/javascript"),
            (a.onload = e),
            (a.onerror = n),
            (a.src = t),
            document.head.append(a);
        });
      return {
        id: "katex",
        init: function (a) {
          t = a;
          let i = t.getConfig().katex || {},
            s = { ...e, ...i };
          const { local: o, version: l, extensions: r, ...c } = s;
          let d = s.local || "https://cdn.jsdelivr.net/npm/katex",
            u = s.local ? "" : "@" + s.version,
            p = d + u + "/dist/katex.min.css",
            h = d + u + "/dist/contrib/mhchem.min.js",
            x = d + u + "/dist/contrib/auto-render.min.js",
            m = [d + u + "/dist/katex.min.js"];
          s.extensions && s.extensions.includes("mhchem") && m.push(h),
            m.push(x);
          const f = () => {
            renderMathInElement(a.getSlidesElement(), c), t.layout();
          };
          ((t) => {
            let e = document.createElement("link");
            (e.rel = "stylesheet"), (e.href = t), document.head.appendChild(e);
          })(p),
            (async function (t) {
              for (const e of t) await n(e);
            })(m).then(() => {
              t.isReady() ? f() : t.on("ready", f.bind(this));
            });
        },
      };
    },
    MathJax2: t,
    MathJax3: () => {
      let t,
        e = {
          tex: {
            inlineMath: [
              ["$", "$"],
              ["\\(", "\\)"],
            ],
          },
          options: {
            skipHtmlTags: ["script", "noscript", "style", "textarea", "pre"],
          },
          startup: {
            ready: () => {
              MathJax.startup.defaultReady(),
                MathJax.startup.promise.then(() => {
                  Reveal.layout();
                });
            },
          },
        };
      return {
        id: "mathjax3",
        init: function (n) {
          t = n;
          let a = t.getConfig().mathjax3 || {},
            i = { ...e, ...a };
          (i.tex = { ...e.tex, ...a.tex }),
            (i.options = { ...e.options, ...a.options }),
            (i.startup = { ...e.startup, ...a.startup });
          let s =
            i.mathjax ||
            "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
          (i.mathjax = null),
            (window.MathJax = i),
            (function (t, e) {
              let n = document.createElement("script");
              (n.type = "text/javascript"),
                (n.id = "MathJax-script"),
                (n.src = t),
                (n.async = !0),
                (n.onload = () => {
                  "function" == typeof e && (e.call(), (e = null));
                }),
                document.head.appendChild(n);
            })(s, function () {
              Reveal.addEventListener("slidechanged", function (t) {
                MathJax.typeset();
              });
            });
        },
      };
    },
  }));
});
