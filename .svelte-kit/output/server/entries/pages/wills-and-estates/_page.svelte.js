import { c as create_ssr_component, k as add_attribute } from "../../../chunks/index.js";
const banner2 = "/_app/immutable/assets/wills-banner2-24712ced.webp";
const banner1 = "/_app/immutable/assets/wills-banner1-8bc55968.webp";
const bannerFull = "/_app/immutable/assets/wills-banner-7654023b.jpg";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: '@charset "UTF-8";@media(min-width: 800px){h1.svelte-4d743p.svelte-4d743p.svelte-4d743p{white-space:nowrap}}section.svelte-4d743p>.gutters.svelte-4d743p.svelte-4d743p{display:flex;flex-direction:column;align-items:center;padding-bottom:2em}section.svelte-4d743p>.gutters h2.svelte-4d743p.svelte-4d743p{text-align:center;margin-top:40px;margin-bottom:1em}section.svelte-4d743p>.gutters p.svelte-4d743p.svelte-4d743p{margin:0 auto 2em;max-width:850px;text-align:center}section.svelte-4d743p>.gutters p.svelte-4d743p>a.svelte-4d743p{color:black;text-decoration:none}section.svelte-4d743p>.gutters p a.svelte-4d743p.svelte-4d743p:hover{text-decoration:underline}section.svelte-4d743p>.gutters ul.svelte-4d743p.svelte-4d743p{padding:0 2em;max-width:600px}section.svelte-4d743p>.gutters ul.svelte-4d743p>li.svelte-4d743p{list-style-type:"✓";padding-left:10px;margin-bottom:2em}',
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<section id="${"wills-and-estates"}" class="${"svelte-4d743p"}"><div class="${"hero"}"><picture><source type="${"image/webp"}"${add_attribute("srcset", banner1, 0)} media="${"(max-width: 1200px)"}">
      <source type="${"image/webp"}"${add_attribute("srcset", banner2, 0)} media="${"(min-resolution: 50dpi)"}">
      <source type="${"image/webp"}"${add_attribute("srcset", banner1, 0)}>

      <img${add_attribute("src", bannerFull, 0)} alt="${"A pen on paper"}"></picture>
    <h1 class="${"mdc-typography--headline1 svelte-4d743p"}">Wills and Estates</h1></div>

  <div class="${"gutters svelte-4d743p"}"><h2 class="${"mdc-typography--headline2 svelte-4d743p"}">Wills and Estates</h2>
    <p class="${"svelte-4d743p"}">Talking about death is never easy. Having a propely drafted and legally
      binding will ensures that after your death, your wishes will be carried
      out and your estate (made up of your assets) will be left to the people
      you intend.
    </p>

    <h2 class="${"mdc-typography--headline2 svelte-4d743p"}">Our Services</h2>
    <p class="${"svelte-4d743p"}">Whether you are planning for the future, or need assistance with the
      administration of a deceased estate, Randall &amp; Associates offer a variety
      of services to assist you, including:
    </p>

    <ul class="${"svelte-4d743p"}"><li class="${"svelte-4d743p"}"><b>Wills and testamentary trusts</b></li>
      <li class="${"svelte-4d743p"}"><b>Power of Attorney and Guardianship documents</b><br> Allow your trusted
        friends or family members to assist you with the ongoing management of your
        affairs in the circumstances that you are no longer able to manage them yourself
      </li>
      <li class="${"svelte-4d743p"}"><b>Applications for Probate and Letters of Administration</b><br> Applications
        of probate which require a will, and letters of administration which do not
        are required for the administration of an estate
      </li>
      <li class="${"svelte-4d743p"}"><b>Contested Estates</b><br> Not every will is legally binding, and in
        certain cases a will can be contested
      </li></ul>

    <p class="${"svelte-4d743p"}">If you would like us to review the circumstances surrounding your injury
      for a free no obligation check of your potential entitlements, contact us
      on <a href="${"phone:0283787698"}" class="${"svelte-4d743p"}">(02) 8378 7698</a> or
      <a href="${"mailto:mail@randallandassoc.com"}" class="${"svelte-4d743p"}">mail@randallandassoc.com</a></p></div>
</section>`;
});
export {
  Page as default
};
