import { c as create_ssr_component, p as compute_rest_props, q as get_current_component, t as getContext, v as validate_component, m as missing_component, C as now, D as loop, b as subscribe, l as each, e as escape, k as add_attribute } from "../../chunks/index.js";
import { D as Drawer, a as Content, A as AppContent, C as CommonIcon, I as IconButton, l as logo } from "../../chunks/Subtitle.js";
import { L as List, I as Item, G as Graphic, T as Text, P as PrimaryText, S as SecondaryText, B as Button } from "../../chunks/Button.js";
import { w as writable } from "../../chunks/index2.js";
import { f as forwardEventsBuilder, c as classMap, S as SmuiElement } from "../../chunks/classAdderBuilder.js";
const CommonLabel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["use", "class", "component", "tag", "getElement"]);
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let element;
  let { component = SmuiElement } = $$props;
  let { tag = component === SmuiElement ? "span" : void 0 } = $$props;
  const context = getContext("SMUI:label:context");
  const tabindex = getContext("SMUI:label:tabindex");
  function getElement() {
    return element.getElement();
  }
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.component === void 0 && $$bindings.component && component !== void 0)
    $$bindings.component(component);
  if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0)
    $$bindings.tag(tag);
  if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
    $$bindings.getElement(getElement);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(component || missing_component, "svelte:component").$$render(
      $$result,
      Object.assign(
        { tag },
        { use: [forwardEvents, ...use] },
        {
          class: classMap({
            [className]: true,
            "mdc-button__label": context === "button",
            "mdc-fab__label": context === "fab",
            "mdc-tab__text-label": context === "tab",
            "mdc-image-list__label": context === "image-list",
            "mdc-snackbar__label": context === "snackbar",
            "mdc-banner__text": context === "banner",
            "mdc-segmented-button__label": context === "segmented-button",
            "mdc-data-table__pagination-rows-per-page-label": context === "data-table:pagination",
            "mdc-data-table__header-cell-label": context === "data-table:sortable-header-cell"
          })
        },
        context === "snackbar" ? { "aria-atomic": "false" } : {},
        { tabindex },
        $$restProps,
        { this: element }
      ),
      {
        this: ($$value) => {
          element = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
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
const avatar1 = "/_app/immutable/assets/avatar1-1a10a024.webp";
const avatar1alt = "/_app/immutable/assets/avatar1-ef913f5d.png";
const avatar2 = "/_app/immutable/assets/avatar2-7e15bc4f.webp";
const avatar2alt = "/_app/immutable/assets/avatar2-67dae90c.png";
const avatar3 = "/_app/immutable/assets/avatar3-60f9ab82.webp";
const avatar3alt = "/_app/immutable/assets/avatar3-78282b4b.png";
const Testimonials_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "section.svelte-on72st.svelte-on72st{margin:4em 0}h2.svelte-on72st.svelte-on72st{text-align:center}.testimonials.svelte-on72st.svelte-on72st{position:relative;display:flex;justify-content:center;overflow:hidden;z-index:0}@media(max-width: 750px){.testimonials.svelte-on72st .desktop-navigation.svelte-on72st{display:none}}.testimonials.svelte-on72st .main-content.svelte-on72st{height:100%;box-sizing:border-box;width:100%;min-width:500px;overflow:hidden;text-align:center;position:relative;padding:0 3em;height:300px}@media(max-width: 850px) and (min-width: 751px){.testimonials.svelte-on72st .main-content.svelte-on72st{min-width:400px}}@media(min-width: 751px){.testimonials.svelte-on72st .main-content.svelte-on72st{height:350px;mask-image:linear-gradient(rgba(0, 0, 0, 0), rgb(0, 0, 0) 8%, rgb(0, 0, 0) 92%, rgba(0, 0, 0, 0));-webkit-mask-image:linear-gradient(rgba(0, 0, 0, 0), rgb(0, 0, 0) 8%, rgb(0, 0, 0) 92%, rgba(0, 0, 0, 0))}}@media(max-width: 750px){.testimonials.svelte-on72st .main-content.svelte-on72st{min-width:calc(100vw - 1em)}}@media(max-width: 500px){.testimonials.svelte-on72st .main-content.svelte-on72st{height:420px}}.testimonials.svelte-on72st .main-content .testimonial-display.svelte-on72st{width:100%;height:100%;margin-left:-2em;width:calc(100% + 4em)}@media(min-width: 751px){.testimonials.svelte-on72st .carousel-icons.svelte-on72st{display:none}}.testimonials.svelte-on72st article.svelte-on72st{position:absolute;display:flex;flex-direction:column;width:100%;height:100%;color:var(--color-theme-1);align-items:center;justify-content:center;padding:0 2em;box-sizing:border-box}@media(min-width: 751px){.testimonials.svelte-on72st article p.name.svelte-on72st{display:none}}.testimonials.svelte-on72st .hidden.svelte-on72st{top:100%;left:0%;user-select:none}@media(max-width: 750px){.testimonials.svelte-on72st .hidden.svelte-on72st{left:100%;top:0%}}",
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
  let reviews = [
    {
      name: "Zac Cobb",
      company: "Property Client",
      avatar: avatar1,
      avatarFallback: avatar1alt,
      jobTitle: "Property Client",
      rating: ["star", "star", "star", "star", "star"],
      text: '"Very thorough and great communication throughout the entire process from the time we made our offer on the property right up until settlement. Would definitely recommend!"'
    },
    {
      name: "Emily Johnson",
      company: "Wills and Estate Client",
      avatar: avatar2,
      avatarFallback: avatar2alt,
      jobTitle: "Wills and Estate Client",
      rating: ["star", "star", "star", "star", "star_half"],
      text: '"I recently used Randall and Associates to draft a new will and update my estate plan. The process was smooth and efficient, and the staff was knowledgeable and professional. They answered all of my questions and made sure I understood everything before moving forward. I was very satisfied with the final result and would highly recommend Joshua Randall to anyone in need of these services."'
    },
    {
      name: "Tom Davis",
      company: "Personal Injury Client",
      avatar: avatar3,
      avatarFallback: avatar3alt,
      jobTitle: "Personal Injury Client ",
      rating: ["star", "star", "star", "star", "star"],
      text: `"After my recent car accident a friend recommended Randall and Associates to me and I'm so glad I called them. I spoke to Joshua Randall and he was really understanding and helpful. The whole team at Randall and Associates was amazing and they did a great job handling my case. I'm really happy with the outcome and would definitely recommend them to anyone who needs help with a personal injury claim."`
    }
  ];
  $$result.css.add(css$1);
  {
    displayed_count.set(count);
  }
  offset = modulo($displayed_count, 1);
  $$unsubscribe_displayed_count();
  return `

<section id="${"testimonials"}" class="${"svelte-on72st"}"><div class="${"gutters"}"><h2 class="${"mdc-typography--headline2 svelte-on72st"}">Feedback from our clients</h2></div>
  <div class="${"testimonials svelte-on72st"}"><div class="${"desktop-navigation svelte-on72st"}">${validate_component(Drawer, "Drawer").$$render(
    $$result,
    {
      style: "border-right: 0; background: none; width: 350px"
    },
    {},
    {
      default: () => {
        return `${validate_component(Content, "Content").$$render($$result, { style: "display: flex;" }, {}, {
          default: () => {
            return `${validate_component(List, "List").$$render(
              $$result,
              {
                twoLine: true,
                avatarList: true,
                style: "margin: auto"
              },
              {},
              {
                default: () => {
                  return `${each(reviews, (item, index) => {
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
                              style: "background-image: url(" + item.avatar + ");background-size: 40px;"
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
              }
            )}`;
          }
        })}`;
      }
    }
  )}</div>

    ${validate_component(AppContent, "AppContent").$$render($$result, {}, {}, {
    default: () => {
      return `<main class="${"main-content svelte-on72st"}">
        
        
        <div class="${"testimonial-display svelte-on72st"}" style="${"transform: translate(" + escape(0, true) + "%, " + escape(0, true) + "%)"}"><article class="${"hidden svelte-on72st"}" aria-hidden="${"true"}" style="${"opacity: " + escape(offset, true) + ";"}"><div>${each(reviews[Math.floor($displayed_count + 1)]?.rating || [], (icon) => {
        return `${validate_component(CommonIcon, "Icon").$$render($$result, { class: "material-icons" }, {}, {
          default: () => {
            return `${escape(icon)}`;
          }
        })}`;
      })}</div>
            <p>${escape(reviews[Math.floor($displayed_count + 1)]?.text)}</p>
            <p class="${"name svelte-on72st"}">${escape(reviews[Math.floor($displayed_count + 1)]?.name)} - ${escape(reviews[Math.floor($displayed_count + 1)]?.company)}</p></article>
          <article style="${"opacity: " + escape(1 - offset, true) + ";"}" class="${"svelte-on72st"}"><div>${each(reviews[Math.floor($displayed_count)]?.rating || [], (icon) => {
        return `${validate_component(CommonIcon, "Icon").$$render($$result, { class: "material-icons" }, {}, {
          default: () => {
            return `${escape(icon)}`;
          }
        })}`;
      })}</div>
            <p>${escape(reviews[Math.floor($displayed_count)]?.text)}</p>
            <p class="${"name svelte-on72st"}">${escape(reviews[Math.floor($displayed_count)]?.name)} - ${escape(reviews[Math.floor($displayed_count)]?.company)}</p></article></div>

        <div class="${"carousel-icons svelte-on72st"}">${validate_component(IconButton, "IconButton").$$render(
        $$result,
        {
          disabled: count === 0,
          style: "position: absolute; left: 0; top: 50%; transform: translate(0, -50%);"
        },
        {},
        {
          default: () => {
            return `${validate_component(CommonIcon, "Icon").$$render($$result, { class: "material-icons" }, {}, {
              default: () => {
                return `chevron_left`;
              }
            })}`;
          }
        }
      )}
          ${validate_component(IconButton, "IconButton").$$render(
        $$result,
        {
          disabled: count === reviews.length - 1,
          style: "position: absolute; right: 0; top: 50%; transform: translate(0, -50%);"
        },
        {},
        {
          default: () => {
            return `${validate_component(CommonIcon, "Icon").$$render($$result, { class: "material-icons" }, {}, {
              default: () => {
                return `chevron_right`;
              }
            })}`;
          }
        }
      )}</div></main>`;
    }
  })}</div>
</section>`;
});
const banner2 = "/_app/immutable/assets/home-banner2-51d10a4d.webp";
const banner1 = "/_app/immutable/assets/home-banner1-acf3bc19.webp";
const bannerFull = "/_app/immutable/assets/home-banner-full-313f1baa.jpg";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".logo.svelte-6h0lrl.svelte-6h0lrl.svelte-6h0lrl{position:absolute;width:400px;max-width:calc(100vw - 2em);height:180px;max-height:calc((100vw - 2em) / 2.5);overflow:hidden}.logo.svelte-6h0lrl>img.svelte-6h0lrl.svelte-6h0lrl{position:absolute;left:50%;top:45%;transform:translate(-50%, -50%);width:125%}.about.svelte-6h0lrl.svelte-6h0lrl.svelte-6h0lrl{display:flex;justify-content:center;padding:2em 0}@media(max-width: 1000px){.about.svelte-6h0lrl.svelte-6h0lrl.svelte-6h0lrl{flex-direction:column;text-align:center;align-items:center}}.about.svelte-6h0lrl>div.svelte-6h0lrl.svelte-6h0lrl{display:flex;align-items:center;max-width:500px;padding:0 2em}.services.svelte-6h0lrl.svelte-6h0lrl.svelte-6h0lrl{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2em 0}.services.svelte-6h0lrl ul.svelte-6h0lrl.svelte-6h0lrl{padding:0;text-align:center}.services.svelte-6h0lrl ul.svelte-6h0lrl>li.svelte-6h0lrl{list-style:none}.contact-us.svelte-6h0lrl.svelte-6h0lrl.svelte-6h0lrl{display:flex;flex-direction:column;align-items:center;text-align:center;padding-bottom:6em}.contact-us.svelte-6h0lrl p.svelte-6h0lrl.svelte-6h0lrl{padding:0;margin-top:0}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-1woy9cy_START -->${$$result.title = `<title>Randall and Associates</title>`, ""}<meta name="${"Randall and Associates"}" content="${"Joshua Randall is the Director/Principal Lawyer of Randall & Associates, a law firm providing legal services focusing in Property & Conveyancing, Personal Injury, and Wills & Estate matters."}"><!-- HEAD_svelte-1woy9cy_END -->`, ""}

<section><div class="${"hero"}"><picture><source type="${"image/webp"}"${add_attribute("srcset", banner1, 0)} media="${"(max-width: 1200px)"}">
      <source type="${"image/webp"}"${add_attribute("srcset", banner2, 0)} media="${"(min-resolution: 50dpi)"}">
      <source type="${"image/webp"}"${add_attribute("srcset", banner1, 0)}>

      <img${add_attribute("src", bannerFull, 0)} alt="${"A work station with coffee"}"></picture>
    <div class="${"logo svelte-6h0lrl"}"><img${add_attribute("src", logo, 0)} alt="${"Randall and Associates"}" class="${"svelte-6h0lrl"}"></div></div></section>

<section><div class="${"gutters about svelte-6h0lrl"}"><div class="${"left svelte-6h0lrl"}"><h2 class="${"mdc-typography--heading2"}">Sydney Lawyers &amp; Conveyancers<br> you can count on.
      </h2></div>
    <div class="${"right svelte-6h0lrl"}"><p class="${"about mdc-typography--body1 svelte-6h0lrl"}">For over twenty years Joshua Randall has represented and supported the
        legal interests of a diverse range of individuals and companies
        throughout New South Wales. Putting YOU first is crucial as we develop
        realistic and sustainable legal solutions that work when you most need
        it.
      </p></div></div></section>

<section style="${"background: #E8D6B3;"}"><div class="${"gutters services svelte-6h0lrl"}"><h2 class="${"mdc-typography--headline2"}">Services we offer
    </h2>
    <ul class="${"svelte-6h0lrl"}"><li class="${"svelte-6h0lrl"}">Property and Conveyancing</li>
      <li class="${"svelte-6h0lrl"}">Personal Injury</li>
      <li class="${"svelte-6h0lrl"}">Wills and Estates</li></ul></div></section>

${validate_component(Testimonials, "Testimonials").$$render($$result, {}, {}, {})}

<section><div class="${"gutters contact-us svelte-6h0lrl"}"><h2 class="${"mdc-typography--heading2"}">Contact us.<br> Get in touch today for a fast responce within 24hrs.
    </h2>
    <p class="${"about mdc-typography--body1 svelte-6h0lrl"}">Randall and Associates are ready to assit you with your legal matters.
      Contact us for fast, easy and affordable service.
    </p>
    ${validate_component(Button, "Button").$$render(
    $$result,
    {
      variant: "unelevated",
      style: "height: 44px; min-width: 250px;"
    },
    {},
    {
      default: () => {
        return `${validate_component(CommonIcon, "Icon").$$render($$result, { class: "material-symbols-rounded" }, {}, {
          default: () => {
            return `mail`;
          }
        })}
      ${validate_component(CommonLabel, "Label").$$render($$result, {}, {}, {
          default: () => {
            return `Enquire Online`;
          }
        })}`;
      }
    }
  )}</div>
</section>`;
});
export {
  Page as default
};
