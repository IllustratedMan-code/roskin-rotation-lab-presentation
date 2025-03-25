import Reveal from "reveal.js";
import Markdown from "reveal.js/plugin/markdown/markdown.esm";
import Highlight from "reveal.js/plugin/highlight/highlight.esm";
import Notes from "reveal.js/plugin/notes/notes.esm";
import Math from "reveal.js/plugin/math/math.esm";
import Drawer from "./reveal.js-drawer/src/plugin.js";
import Pointer from "reveal.js-pointer/dist/pointer.esm";

window.Reveal = Reveal;

import "reveal.js-drawer/dist/drawer.css";
import "reveal.js-pointer/dist/pointer.css";
import "./styles.css";

function loadIncludes() {
  return Promise.all(
    [...document.querySelectorAll("include")].map((include) => {
      return fetch(include.getAttribute("src"))
        .then((response) => response.text())
        .then((html) => (include.outerHTML = html))
        .catch(console.err);
    })
  );
}
loadIncludes()
  .then(() => {
    Reveal.initialize({
      hash: true,
      transition: "none",
      history: "true",
      pdfSeparateFragments: false,
      plugins: [Markdown, Highlight, Drawer, Pointer, Notes, Math.KaTeX],
    });
  })
  .then(() => {
    if (/[?&]print-pdf/.test(location.search)) {
      console.log("shownotes");
      Reveal.configure({
        showNotes: true,
      });
    }
  });
