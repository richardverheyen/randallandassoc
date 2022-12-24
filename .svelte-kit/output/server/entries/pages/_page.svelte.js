import { c as create_ssr_component, q as compute_rest_props, t as get_current_component, s as setContext, o as onDestroy, f as spread, u as escape_attribute_value, h as escape_object, k as add_attribute, w as now, x as loop, b as subscribe, v as validate_component, l as each, e as escape } from "../../chunks/index.js";
import { MDCDismissibleDrawerFoundation, MDCModalDrawerFoundation } from "@material/drawer";
import { f as forwardEventsBuilder, c as classMap, d as dispatch, a as classAdderBuilder, L as List, I as Item, G as Graphic, T as Text, P as PrimaryText, S as SecondaryText } from "../../chunks/Subheader.js";
import { w as writable } from "../../chunks/index2.js";
const Logo_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: '.logo.svelte-10mlfiw.svelte-10mlfiw{margin:4em auto 0;display:block;border:2px solid #ae8f35;font-size:3em;font-family:"Squada One";text-transform:uppercase;line-height:80%;font-weight:900;padding:44px 36px;color:#ae8f35}.logo.svelte-10mlfiw>span.svelte-10mlfiw{font-size:0.8em}h2.tagline.svelte-10mlfiw.svelte-10mlfiw{font-size:18px;text-transform:uppercase;line-height:100%;margin-top:0.5em;font-weight:400;letter-spacing:2px;color:#ae8f35}',
  map: null
};
const Logo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$3);
  return `<h1 class="${"logo svelte-10mlfiw"}">Good Call <br>
	<span class="${"svelte-10mlfiw"}">Copywriting</span></h1>
<h2 class="${"tagline svelte-10mlfiw"}">Words that work</h2>`;
});
const Services_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: "section.svelte-167hqpe{margin:6em 0}ul.svelte-167hqpe{padding:0;margin:auto}",
  map: null
};
const Services = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$2);
  return `<section id="${"services"}" class="${"svelte-167hqpe"}"><div class="${"gutters"}"><h2 class="${"mdc-typography--headline4"}">We provide</h2>
    <ul class="${"svelte-167hqpe"}"><li>Sales Copy</li>
      <li>Email copy</li>
      <li>SEO Rich Website Copy</li>
      <li>Property Listing Copy</li></ul></div>
</section>`;
});
const Drawer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["use", "class", "variant", "open", "fixed", "setOpen", "isOpen", "getElement"]);
  forwardEventsBuilder(get_current_component());
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let { variant = void 0 } = $$props;
  let { open = false } = $$props;
  let { fixed = true } = $$props;
  let element;
  let instance = void 0;
  let internalClasses = {};
  let previousFocus = null;
  let focusTrap;
  let scrim = false;
  setContext("SMUI:list:nav", true);
  setContext("SMUI:list:item:nav", true);
  setContext("SMUI:list:wrapFocus", true);
  let oldVariant = variant;
  onDestroy(() => {
    instance && instance.destroy();
    scrim && scrim.removeEventListener("SMUIDrawerScrim:click", handleScrimClick);
  });
  function getInstance() {
    var _a, _b;
    if (scrim) {
      scrim.removeEventListener("SMUIDrawerScrim:click", handleScrimClick);
    }
    if (variant === "modal") {
      scrim = (_b = (_a = element.parentNode) === null || _a === void 0 ? void 0 : _a.querySelector(".mdc-drawer-scrim")) !== null && _b !== void 0 ? _b : false;
      if (scrim) {
        scrim.addEventListener("SMUIDrawerScrim:click", handleScrimClick);
      }
    }
    const Foundation = variant === "dismissible" ? MDCDismissibleDrawerFoundation : variant === "modal" ? MDCModalDrawerFoundation : void 0;
    return Foundation ? new Foundation({
      addClass,
      removeClass,
      hasClass,
      elementHasClass: (element2, className2) => element2.classList.contains(className2),
      saveFocus: () => previousFocus = document.activeElement,
      restoreFocus: () => {
        if (previousFocus && "focus" in previousFocus && element.contains(document.activeElement)) {
          previousFocus.focus();
        }
      },
      focusActiveNavigationItem: () => {
        const activeNavItemEl = element.querySelector(".mdc-list-item--activated,.mdc-deprecated-list-item--activated");
        if (activeNavItemEl) {
          activeNavItemEl.focus();
        }
      },
      notifyClose: () => {
        open = false;
        dispatch(element, "SMUIDrawer:closed", void 0, void 0, true);
      },
      notifyOpen: () => {
        open = true;
        dispatch(element, "SMUIDrawer:opened", void 0, void 0, true);
      },
      trapFocus: () => focusTrap.trapFocus(),
      releaseFocus: () => focusTrap.releaseFocus()
    }) : void 0;
  }
  function hasClass(className2) {
    return className2 in internalClasses ? internalClasses[className2] : getElement().classList.contains(className2);
  }
  function addClass(className2) {
    if (!internalClasses[className2]) {
      internalClasses[className2] = true;
    }
  }
  function removeClass(className2) {
    if (!(className2 in internalClasses) || internalClasses[className2]) {
      internalClasses[className2] = false;
    }
  }
  function handleScrimClick() {
    instance && "handleScrimClick" in instance && instance.handleScrimClick();
  }
  function setOpen(value) {
    open = value;
  }
  function isOpen() {
    return open;
  }
  function getElement() {
    return element;
  }
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0)
    $$bindings.variant(variant);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.fixed === void 0 && $$bindings.fixed && fixed !== void 0)
    $$bindings.fixed(fixed);
  if ($$props.setOpen === void 0 && $$bindings.setOpen && setOpen !== void 0)
    $$bindings.setOpen(setOpen);
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
    $$bindings.isOpen(isOpen);
  if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
    $$bindings.getElement(getElement);
  {
    if (oldVariant !== variant) {
      oldVariant = variant;
      instance && instance.destroy();
      internalClasses = {};
      instance = getInstance();
      instance && instance.init();
    }
  }
  {
    if (instance && instance.isOpen() !== open) {
      if (open) {
        instance.open();
      } else {
        instance.close();
      }
    }
  }
  return `<aside${spread(
    [
      {
        class: escape_attribute_value(classMap({
          [className]: true,
          "mdc-drawer": true,
          "mdc-drawer--dismissible": variant === "dismissible",
          "mdc-drawer--modal": variant === "modal",
          "smui-drawer__absolute": variant === "modal" && !fixed,
          ...internalClasses
        }))
      },
      escape_object($$restProps)
    ],
    {}
  )}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}
</aside>`;
});
const AppContent = classAdderBuilder({
  class: "mdc-drawer-app-content",
  tag: "div"
});
const Content = classAdderBuilder({
  class: "mdc-drawer__content",
  tag: "div"
});
classAdderBuilder({
  class: "mdc-drawer__header",
  tag: "div"
});
classAdderBuilder({
  class: "mdc-drawer__title",
  tag: "h1"
});
classAdderBuilder({
  class: "mdc-drawer__subtitle",
  tag: "h2"
});
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function tick_spring(ctx, last_value, current_value, target_value) {
  if (typeof current_value === "number" || is_date(current_value)) {
    const delta = target_value - current_value;
    const velocity = (current_value - last_value) / (ctx.dt || 1 / 60);
    const spring2 = ctx.opts.stiffness * delta;
    const damper = ctx.opts.damping * velocity;
    const acceleration = (spring2 - damper) * ctx.inv_mass;
    const d = (velocity + acceleration) * ctx.dt;
    if (Math.abs(d) < ctx.opts.precision && Math.abs(delta) < ctx.opts.precision) {
      return target_value;
    } else {
      ctx.settled = false;
      return is_date(current_value) ? new Date(current_value.getTime() + d) : current_value + d;
    }
  } else if (Array.isArray(current_value)) {
    return current_value.map((_, i) => tick_spring(ctx, last_value[i], current_value[i], target_value[i]));
  } else if (typeof current_value === "object") {
    const next_value = {};
    for (const k in current_value) {
      next_value[k] = tick_spring(ctx, last_value[k], current_value[k], target_value[k]);
    }
    return next_value;
  } else {
    throw new Error(`Cannot spring ${typeof current_value} values`);
  }
}
function spring(value, opts = {}) {
  const store = writable(value);
  const { stiffness = 0.15, damping = 0.8, precision = 0.01 } = opts;
  let last_time;
  let task;
  let current_token;
  let last_value = value;
  let target_value = value;
  let inv_mass = 1;
  let inv_mass_recovery_rate = 0;
  let cancel_task = false;
  function set(new_value, opts2 = {}) {
    target_value = new_value;
    const token = current_token = {};
    if (value == null || opts2.hard || spring2.stiffness >= 1 && spring2.damping >= 1) {
      cancel_task = true;
      last_time = now();
      last_value = new_value;
      store.set(value = target_value);
      return Promise.resolve();
    } else if (opts2.soft) {
      const rate = opts2.soft === true ? 0.5 : +opts2.soft;
      inv_mass_recovery_rate = 1 / (rate * 60);
      inv_mass = 0;
    }
    if (!task) {
      last_time = now();
      cancel_task = false;
      task = loop((now2) => {
        if (cancel_task) {
          cancel_task = false;
          task = null;
          return false;
        }
        inv_mass = Math.min(inv_mass + inv_mass_recovery_rate, 1);
        const ctx = {
          inv_mass,
          opts: spring2,
          settled: true,
          dt: (now2 - last_time) * 60 / 1e3
        };
        const next_value = tick_spring(ctx, last_value, value, target_value);
        last_time = now2;
        last_value = value;
        store.set(value = next_value);
        if (ctx.settled) {
          task = null;
        }
        return !ctx.settled;
      });
    }
    return new Promise((fulfil) => {
      task.promise.then(() => {
        if (token === current_token)
          fulfil();
      });
    });
  }
  const spring2 = {
    set,
    update: (fn, opts2) => set(fn(target_value, value), opts2),
    subscribe: store.subscribe,
    stiffness,
    damping,
    precision
  };
  return spring2;
}
const Testimonials_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "section.svelte-1dugae4{margin:4em 0}h2.svelte-1dugae4{text-align:center}.drawer-container.svelte-1dugae4{position:relative;display:flex;overflow:hidden;z-index:0}.main-content.svelte-1dugae4{height:100%;box-sizing:border-box;width:100%;min-width:500px;height:100%;overflow:hidden;text-align:center;position:relative}article.svelte-1dugae4{position:absolute;display:flex;width:100%;height:100%;color:var(--color-theme-1);align-items:center;justify-content:center}.testimonial-display.svelte-1dugae4{position:absolute;width:100%;height:100%}.hidden.svelte-1dugae4{top:100%;user-select:none}",
  map: null
};
function modulo(n, m) {
  return (n % m + m) % m;
}
const Testimonials = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let offset;
  let $displayed_count, $$unsubscribe_displayed_count;
  let count = 0;
  const displayed_count = spring(0, { stiffness: 0.08 });
  $$unsubscribe_displayed_count = subscribe(displayed_count, (value) => $displayed_count = value);
  let options = [
    {
      name: "Bruce Willis",
      company: "Smith Creative Solutions",
      jobTitle: "Advertising Director",
      testimonial: '"Good Call Copywriting significantly increased our website traffic and conversions with their skilled and effective copywriting. Their team truly understands our business and delivers results. Highly recommend."'
    },
    {
      name: "Peter Johnson",
      company: "Davis Public Relations",
      jobTitle: "Marketing Coordinator",
      testimonial: '"Good Call Copywriting has been an invaluable asset to our business. Their copywriting skills have contributed to a noticeable increase in website traffic and conversions. The team at Good Call takes the time to understand our unique voice and needs, leading to exceptional results. We highly recommend their services."'
    },
    {
      name: "Emily Johnson",
      company: "Brown Advertising Agency",
      jobTitle: "Branding Specialist ",
      testimonial: '"I recently worked with Nick at the copywriting business and was blown away by the speed and efficiency of his service. He was a pleasure to work with and I highly recommend him for anyone in need of top-notch copywriting assistance."'
    }
  ];
  $$result.css.add(css$1);
  {
    displayed_count.set(count);
  }
  offset = modulo($displayed_count, 1);
  $$unsubscribe_displayed_count();
  return `<section id="${"testimonials"}" class="${"svelte-1dugae4"}"><div class="${"gutters"}"><h2 class="${"mdc-typography--headline4 svelte-1dugae4"}">Testimonials</h2>
    <div class="${"drawer-container svelte-1dugae4"}">${validate_component(Drawer, "Drawer").$$render(
    $$result,
    {
      style: "border-right: 0; background: none; margin-right: 3em; width: 350px"
    },
    {},
    {
      default: () => {
        return `${validate_component(Content, "Content").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(List, "List").$$render($$result, { twoLine: true, avatarList: true }, {}, {
              default: () => {
                return `${each(options, (item, index) => {
                  return `${validate_component(Item, "Item").$$render(
                    $$result,
                    {
                      selected: index === count,
                      href: "javascript:void(0)",
                      style: "margin: 2em"
                    },
                    {},
                    {
                      default: () => {
                        return `${validate_component(Graphic, "Graphic").$$render(
                          $$result,
                          {
                            style: "background-image: url(https://place-hold.it/40x40?text=" + item.name.split(" ").map((val) => val.substring(0, 1)).join("") + "&fontsize=16);"
                          },
                          {},
                          {}
                        )}
                ${validate_component(Text, "Text").$$render($$result, {}, {}, {
                          default: () => {
                            return `${validate_component(PrimaryText, "PrimaryText").$$render($$result, {}, {}, {
                              default: () => {
                                return `${escape(item.name)}`;
                              }
                            })}
                  ${validate_component(SecondaryText, "SecondaryText").$$render($$result, {}, {}, {
                              default: () => {
                                return `${escape(item.company)}`;
                              }
                            })}
                `;
                          }
                        })}
              `;
                      }
                    }
                  )}`;
                })}`;
              }
            })}`;
          }
        })}`;
      }
    }
  )}

      ${validate_component(AppContent, "AppContent").$$render($$result, { class: "app-content" }, {}, {
    default: () => {
      return `<main class="${"main-content svelte-1dugae4"}">
          
          
          <div class="${"testimonial-display svelte-1dugae4"}" style="${"transform: translate(0, " + escape(-100 * offset, true) + "%)"}"><article class="${"hidden svelte-1dugae4"}" aria-hidden="${"true"}" style="${"opacity: " + escape(offset, true) + ";"}">${escape(options[Math.floor($displayed_count + 1)]?.testimonial)}</article>
            <article style="${"opacity: " + escape(1 - offset, true) + ";"}" class="${"svelte-1dugae4"}">${escape(options[Math.floor($displayed_count)]?.testimonial)}</article></div></main>`;
    }
  })}</div></div>
</section>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "section.svelte-1f9f1dx.svelte-1f9f1dx{display:flex;flex-direction:column;align-items:center;padding-top:40px}section.svelte-1f9f1dx .about.svelte-1f9f1dx{max-width:600px;margin:2em auto 5em}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-gaw9f2_START -->${$$result.title = `<title>Good Call 🤙</title>`, ""}<meta name="${"description"}" content="${"Words that work"}"><!-- HEAD_svelte-gaw9f2_END -->`, ""}

${validate_component(Logo, "Logo").$$render($$result, {}, {}, {})}
<section class="${"svelte-1f9f1dx"}"><div class="${"gutters"}"><p class="${"about mdc-typography--body1 svelte-1f9f1dx"}">We are a team of experienced and skilled writers dedicated to creating compelling and effective copy for our clients. Our services range from website content and product descriptions to marketing emails and social media posts. Whether you&#39;re a small business owner, a marketing manager, or a content creator, we have the expertise and creativity to elevate your brand and drive results.</p></div></section>
${validate_component(Services, "Services").$$render($$result, {}, {}, {})}
${validate_component(Testimonials, "Testimonials").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
