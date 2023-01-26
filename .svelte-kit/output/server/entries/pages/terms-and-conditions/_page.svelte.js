import { c as create_ssr_component, k as add_attribute } from "../../../chunks/index.js";
import { b as banner1, a as banner2, c as bannerFull } from "../../../chunks/contact-banner.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "#terms-and-conditions.svelte-173i5ib>.gutters.svelte-173i5ib{display:flex;flex-direction:column;align-items:center;padding-bottom:2em}#terms-and-conditions.svelte-173i5ib>.gutters h2.svelte-173i5ib{text-align:center;margin-top:3em;margin-bottom:1em}#terms-and-conditions.svelte-173i5ib>.gutters p.svelte-173i5ib{margin-bottom:2em;max-width:850px;text-align:center}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<section id="${"terms-and-conditions"}" class="${"svelte-173i5ib"}"><div class="${"hero"}"><picture><source type="${"image/webp"}"${add_attribute("srcset", banner1, 0)} media="${"(max-width: 1200px)"}">
      <source type="${"image/webp"}"${add_attribute("srcset", banner2, 0)} media="${"(min-resolution: 50dpi)"}">
      <source type="${"image/webp"}"${add_attribute("srcset", banner1, 0)}>

      <img${add_attribute("src", bannerFull, 0)} alt="${"A lawyer writing"}"></picture>
    <h1 class="${"mdc-typography--headline4"}">Terms and Conditions
    </h1></div>

  <div class="${"gutters svelte-173i5ib"}"><h2 class="${"mdc-typography--headline2 svelte-173i5ib"}">Terms and Conditions
    </h2>
    <p class="${"svelte-173i5ib"}">The information and material on Randall &amp; Associates&#39; website is intended and provided as a general guide only and is not a substitute for legal advice. The use of this website and communication of information via the website does not give rise to a Lawyer/Client relationship between you, Randall &amp; Associates or anyone else.</p>
    <p class="${"svelte-173i5ib"}">Randall &amp; Associates makes every effort to keep the website up-to-date, however, we will not be responsible for any incorrect information contained on the website.</p>
    <p class="${"svelte-173i5ib"}">By using this website you agree that Randall &amp; Associates will not be held liable for any damages (including direct, indirect, consequential, incidental and exemplary) in the event that this site is unavailable to users (by virtue of interruption, suspension or termination) for any reason and we will be under no liability to users in respect of any loss or damage (including consequential loss or damage) which may be suffered or incurred or which may arise directly or indirectly by the use of this site.</p>
    <p class="${"svelte-173i5ib"}">In respect of links to other websites contained on our website (if any), Randall &amp; Associates do not make any representation or warranty as to the information contained on those sites, including the accuracy of that information.</p></div>
</section>`;
});
export {
  Page as default
};
