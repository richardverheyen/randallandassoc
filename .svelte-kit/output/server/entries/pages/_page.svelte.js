import { c as create_ssr_component, p as compute_rest_props, q as get_current_component, t as getContext, v as validate_component, m as missing_component, C as now, D as loop, b as subscribe, l as each, e as escape, f as spread, w as escape_attribute_value, h as escape_object, k as add_attribute } from "../../chunks/index.js";
import { D as Drawer, a as Content$1, A as AppContent, C as CommonIcon, I as IconButton, l as logo } from "../../chunks/Subtitle.js";
import { L as List, I as Item, G as Graphic, T as Text, P as PrimaryText, S as SecondaryText, B as Button } from "../../chunks/Button.js";
import { w as writable } from "../../chunks/index2.js";
import { f as forwardEventsBuilder, c as classMap, S as SmuiElement, a as classAdderBuilder } from "../../chunks/classAdderBuilder.js";
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
const avatar1 = "data:image/webp;base64,UklGRtAOAABXRUJQVlA4WAoAAAAcAAAAdwAAdwAAQUxQSKECAAABkKNs25xqD4FUZ8oOrFyAtVi6jx9rwTI7cAESbM/UTeks3YF7EOEMclIF4gQf7/sPDsn3vQ9/GxETAP/b6cvio9w7EVURty8/Fi9pG7ZfjeaF05pdMR9dGdXJf0Qblp+8Y04rL9XTMm9ZMlyJeiyroRHxpFLvq0kcXpQdNMhDFgWW7jTYXRpSb61Br3uhxDPRwGUWB9Gv1MCqH8CTqIny5FuyVDOXiVfdrRq67Xo0cGqq++XNWNRYGXsyVYOnXjyoyfceTNXorLGxmj1uaCB2yaCRrlPDXbeBZKumb5P6lmr8srZnNf+5pr7YJ/1a4koJVnEdM6U4q6EnHKR32VpJri9KlWZ6QbTjsYvOy5RodlZ8YHKIz5ko1ck5FZfqjKGSHZ5asVmdaAkbaR3LlW5+rORTHuko4c4/OaP8n4JRAeBKGMkVMFLKI2DOaQ4UnArAcXJoK+l2yip9YfWyYLX4YPVRsir3rPaOlRNWwkv/u4WV8HKs3J7VvmRVfrD6WLBavLB6SVmlbVZtOE4OKDgVwJzTHBhxGgFXwkiuABSMfgAgZ5T/02HU+QclnxJHcz75sZawkdYxrNiscHLIZngKFZcKZ064TM6JD0wO0TnImGQ4O9rx2EXnIeWR4tI1izUu7gkH6V2GGYcZaowrBlVcB/pin/RR77N9T6h7ad0StSdb27ZJfeg6y1wXTQ7ELhmg2bFdYzQ9tWqK5h9suoePU4um8HMs1sgYvg6cLW4Af7tbS7Zd+Jws7Vgm8PxZbJBn+N+vLKj6CDGeSWgyixFobx3WuoeA0104uxRhR9khjEMWIfh4UvlXTWLYOFyJT7IawtBWXvpS5i1Y28kLaUqKvAObr0bzwtXlivnoCra305fFR7l3Iqoibl9+LF7SNvwHAFZQOCCECQAAMC8AnQEqeAB4AD6FOJZHpSOiITD1PzCgEIllAM1AwgwCAC2W+zT/PeHPm7+TyyKd/G3wp4AT3Ny7nTq8Brvly1EFRnJk/9tBZmfTN/xEHBBWW1FMt/lpn3K4vWqpPi7bg7aJqi8/ynv+p+EjrMhBWlYbQZOponDULk4Tegtr+9hofZQpdMMpWum2L460hv7HFG8r/1AfpZ4NApj3e8bbS9V+gWDtoqAxvHxbYfDYxtz9Wu//2RpR+a0N8A2yBs+2QGIsntSjPQrK14+joD8OIQD5Lz7yeMf9ISfVZPzQD02qu8jgcm2ONu5jF+zjZjKaq0TsPaPFJ9WnHILb3MTxmKwIOdFNKShcp2tD3/Ne49eBiB4GWLUB6WYzAe7flIuufSLXMJaKMC0KU52xQjVdDD4/xDJWJrj0ZfNC3dBuQ1fpdBP7hAs8FvuD3V/3rI0KYYBx2ll6kZHDSepPObRRmtQEfOgEkQXb+1Re0gIQ6wEIpUjP/+I9XLHpVQmqDm0wewAA/vytMSxNJg2yHm5WjScgOtmK475Bu3O9QodX0YuZxhYC40ckmH21jsDWqz0nqfvi7JlR3/UC95+4xM+q+WgQQ5jtAq9BZVId7DAekm/3xrZKjTPSk+hp30wEF7WJSBkeP9KHAXjD5mE1c/VL9dLFwVv1xm/ij5b+V/scF4onjpEDhNv9vtal6Nb2RB1rcetzhZ0R40JfN+Kd/+PAMEKPGkepiRSAgerkqbQhrMdcOSaray/s05hG5XxqRm3H1Iv4AT7QBPXHO5o2dSOe5gHzNQkE2sknsHHT5488Toat6SY9MdbvRfo/dtft8uPHdaeJRoyWRaN0hVpcsNJzoWguMBpKshVlEsjtEqkCX2ntP2XeU8RXTxrsmNimYxURk101K5tIk18AuAP0D3U4DInxDVIkNs8k9silcSN3XtbBVc175kKSxZS2/ib1FqPTfmDpw/pech4XNpAN9oQsW1enth1qwyNFNzLhetRAaDNLpQV9fu2nacO7dWokS1XUwL1NWqZwgvTo2TP3akfN3ugJX1u5H6MZgEn8a7jomz7D16Cf//yqqnUNvcMuBYfmBi5OxTauwZfoSrg2SHMtnUAD3dqqnnLT99UwQdsP6neyTHK+ctyAxOqn/cUvPG8sNA4EloAPoOVQUC1c83mYW4aRpY4hzrT6meV3kgaY3KSdGQD36LBDhx9x3wOr/dsYJ9HPtyCWm88+xQ6ZkwzR6HhabciPgGOOSHwHsvpT1DQoBSHqXYFtaU1VHWPKbGHum1dndmvERaNxQrEGKpTwAuvX86x+0wwqbigs8S29GLq9otDHhVfmj87m3syYDdXEQ8tU0W0FH2SGcmGaXrgKVinr6ql3husN8cZz+f2zhI0eOBU0g52xtu/eP98oAnucXMKY3EEDl7AQuMryoRUUrfv00KzQAEuVZWEvS5aBgXFOFzBNqKtJ6Tz9M1XW0iiHlERh/Kvq8ecWEweuCe+wAe3N6ahCfOzpRnc46bBSwu0N4Klr/vJ9Ueieg3PgT75WRbYttEVrF/UiSaVUR2culV+6hvEmaUXvC6vz8KPfhFcH5QPhaALtDj41oh+Hc8BVyCT0qQuIevXi9UUvFAC2qetdXASHkj4MFRg04X01/9qNzWTLzwjFyXT/3xXTZUVJUfbGhDeL/wy9K6q1dcuKVYWEwBN0kImPl7Nvmjp/kiJFc90KeXdj1/Z27+4YNDrHqTyFaxWP+fdmuvSG/u2Wiv0/lpN8FTO0HVnG1UlEZKgZgJrQpKNaRdFnzIDXRhW2VeHCyfrFun1FoG3hDaasILL3Py+J/tozmWYf+FQ1PoQYfRDdE1AT3oN2gcuWT3hAIWDodhyKliY3Ehix215v7G9JQj0yRCh5ff5ZYHG552vWuSvv1az7yyuDgL01xMOto1Q+NcfGqty+//QMlJaY2tn9XNapylM8KUiXI16fwzZ7aeRd+L/5YEuQsiLQk0PK17vD3rpxRJ0b7eQ+OTwe9atnFclucs7J09FbBwDuvD0/srpg4BHj6Bh/LeZxKDFjOP5KbYxlMtlKudBLR72pX25GOLTmNzSXEUiRyqmC3HXu9jmVCl+hB1VksAMBV5f7zdw6fLZztOsHMf2WLSrVaeVXtrIDUxocPXWK11WFV5h4nNKWQ1KVVLeLdjP52PgiREkDTP4iQMXlH2Nha1mfFWnoHzlk5zkxxw3OF3xw119bcC5fOHPw+Rjgx039wKJy0Th6K2VUUutHxwJDeusXKKttoH8QCmzBppksj5L1ytShfxCTSGGQV3KG3RyjA5ooGXVRfq92V/hfryb8IxeTZpOlyrw5zhfeSy4VGj6r7vRo4m4HhSc7iITpH3c0GDYAVDID9q7bDk/EEOvWmssUW5yjjF5M+w86yaH8D3AoDJsBLvo5aISy17GXZMaSI0U5A4F6J6frEgirZ432VMwWk8Da+sSM94bG9mvQsvW+MO3ES7Fs1Qkb3q1cin/ufgWhU/QoreuXrNeWHTrtwXhtr3kK3lLucNfm09ZKh58q3fg6SZfxNtjEmOnhaGCgVxYxXMReYc24glvBkn7Z+/biPAqhXhTkvUYjM7tQdQ/I51WyOMiNGWKbhbBK0zY57LZCBvgVuICz9/TTEw0VneLsgjUkoI9tQSs4tMp4Oy/VWsJp86pUbKgt5D7zbEs1kk93gkgEjnPNAURnoRyX1Tb32/V+puxtXUnS1UdCzUS4Qmh+gHLPSAiOodr9K2CZiTsvyOXWb1sxMx0Fq+mBPAkbFe7oEFBccbIeGfYG2izDa8fAQoFOGo/qFuhFRY6oRR4OWF85PDjO2aaTxg8ReeeJhVIDgq3WvwIsbMY4PDeaamI4EaLg4cAgE8qu9i8p8aogP7Q4yOq2ASmGuOfT0PEsHx1x8V/BmI63UUh6yhEOhloJm6w+ARNhnWnlNQOnOb7KO/hJQzV7IjZGqAGllw+a3IaPOzBz+15B2WxMwz0R1NdI2sFcLGdKts3ySQiZ+Uk67w0Z8Vqrb6S7aS0U0l/jO/CBc/+QWaK7Mavq3sgIhydwoHUlEeDsoM6/nXiI9uWCffZdY/cNIQBMYb8qzVv0ueO5O+onA/5Wgo9UQL2ynoYtMFCAs3nZoMEhga5+kGHMX37QmyRmZWzf8Kwt43lXL5NIg4MQZeVIqhDl+QyWgs9F33vHi4+dBt6RZyjRITQv7kUAn7NtO4AKFEzk1nzMVEG0mJOz0YzlOuQHwD/0JdzIAAAARVhJRqQAAABNTQAqAAAACAAFARIAAwAAAAEAAQAAARoABQAAAAEAAABKARsABQAAAAEAAABSASgAAwAAAAEAAgAAh2kABAAAAAEAAABaAAAAAAAAAEgAAAABAAAASAAAAAEABJADAAIAAAAUAAAAkKABAAMAAAABAAEAAKACAAQAAAABAAAAeKADAAQAAAABAAAAeAAAAAAyMDE5OjA4OjA5IDE3OjQzOjIxAFhNUCDQAQAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNi4wLjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIj4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHBob3Rvc2hvcDpEYXRlQ3JlYXRlZD4yMDE5LTA4LTA5VDE3OjQzOjIxPC9waG90b3Nob3A6RGF0ZUNyZWF0ZWQ+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo=";
const avatar1alt = "/_app/immutable/assets/avatar1-da6b6c39.png";
const avatar3 = "/_app/immutable/assets/avatar3-de829bc4.webp";
const avatar3alt = "/_app/immutable/assets/avatar3-f1ade0b7.png";
const Testimonials_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "section.svelte-711foc.svelte-711foc{margin:4em 0}h2.svelte-711foc.svelte-711foc{text-align:center}.testimonials.svelte-711foc.svelte-711foc{position:relative;display:flex;justify-content:center;overflow:hidden;z-index:0}@media(max-width: 750px){.testimonials.svelte-711foc .desktop-navigation.svelte-711foc{display:none}}.testimonials.svelte-711foc .main-content.svelte-711foc{height:100%;box-sizing:border-box;width:100%;min-width:500px;overflow:hidden;text-align:center;position:relative;padding:0 3em;height:300px}@media(max-width: 850px) and (min-width: 751px){.testimonials.svelte-711foc .main-content.svelte-711foc{min-width:400px}}@media(min-width: 751px){.testimonials.svelte-711foc .main-content.svelte-711foc{height:350px;mask-image:linear-gradient(rgba(0, 0, 0, 0), rgb(0, 0, 0) 8%, rgb(0, 0, 0) 92%, rgba(0, 0, 0, 0));-webkit-mask-image:linear-gradient(rgba(0, 0, 0, 0), rgb(0, 0, 0) 8%, rgb(0, 0, 0) 92%, rgba(0, 0, 0, 0))}}@media(max-width: 750px){.testimonials.svelte-711foc .main-content.svelte-711foc{min-width:calc(100vw - 1em)}}@media(max-width: 500px){.testimonials.svelte-711foc .main-content.svelte-711foc{height:420px}}.testimonials.svelte-711foc .main-content .testimonial-display.svelte-711foc{width:100%;height:100%;margin-left:-2em;width:calc(100% + 4em)}@media(min-width: 751px){.testimonials.svelte-711foc .carousel-icons.svelte-711foc{display:none}}.testimonials.svelte-711foc article.svelte-711foc{position:absolute;display:flex;flex-direction:column;width:100%;height:100%;color:var(--color-theme-1);align-items:center;justify-content:center;padding:0 2em;box-sizing:border-box}.testimonials.svelte-711foc article .stars.svelte-711foc{margin-top:10px}@media(min-width: 751px){.testimonials.svelte-711foc article p.name.svelte-711foc{display:none}}.testimonials.svelte-711foc .hidden.svelte-711foc{top:100%;left:0%;user-select:none}@media(max-width: 750px){.testimonials.svelte-711foc .hidden.svelte-711foc{left:100%;top:0%}}",
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
      name: "Kiran Grewal",
      company: "Legal Client",
      avatar: avatar3,
      avatarFallback: avatar3alt,
      rating: ["star", "star", "star", "star", "star"],
      text: '"Highly recommend Randall and Associates. Josh Randall is an extremely knowledgeable, professional and responsive lawyer. Will continue to use their services."'
    },
    {
      name: "Sue-Ellen Hemphill",
      company: "Property Client",
      avatar: "https://place-hold.it/40x40?text=SH&fontsize=16",
      avatarFallback: "https://place-hold.it/40x40?text=SH&fontsize=16",
      rating: ["star", "star", "star", "star", "star"],
      text: '"Highly recommend Randall & Associates. Josh provided excellent service and communication, ensuring the sale of our property was seamless. Josh is extremely knowledgeable in uncommon conveyancing matters."'
    },
    {
      name: "Richard Verheyen",
      company: "Legal Client",
      avatar: avatar1,
      avatarFallback: avatar1alt,
      rating: ["star", "star", "star", "star", "star"],
      text: `"Josh was quick to respond and knew his stuff, I'll use him again in the future."`
    }
  ];
  $$result.css.add(css$1);
  {
    displayed_count.set(count);
  }
  offset = modulo($displayed_count, 1);
  $$unsubscribe_displayed_count();
  return `

<section id="${"testimonials"}" class="${"svelte-711foc"}"><div class="${"gutters"}"><h2 class="${"mdc-typography--headline2 svelte-711foc"}">Feedback from our clients</h2></div>
  <div class="${"testimonials svelte-711foc"}"><div class="${"desktop-navigation svelte-711foc"}">${validate_component(Drawer, "Drawer").$$render(
    $$result,
    {
      style: "border-right: 0; background: none; width: 350px"
    },
    {},
    {
      default: () => {
        return `${validate_component(Content$1, "Content").$$render($$result, { style: "display: flex;" }, {}, {
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
                              style: "background-image: url(" + item.avatar + ");background-size: 40px;border-radius:50%"
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
      return `<main class="${"main-content svelte-711foc"}">
        
        
        <div class="${"testimonial-display svelte-711foc"}" style="${"transform: translate(" + escape(0, true) + "%, " + escape(0, true) + "%)"}"><article class="${"hidden svelte-711foc"}" aria-hidden="${"true"}" style="${"opacity: " + escape(offset, true) + ";"}">${``}
            <div class="${"stars svelte-711foc"}">${each(reviews[Math.floor($displayed_count + 1)]?.rating || [], (icon) => {
        return `${validate_component(CommonIcon, "Icon").$$render($$result, { class: "material-icons" }, {}, {
          default: () => {
            return `${escape(icon)}`;
          }
        })}`;
      })}</div>
            <p>${escape(reviews[Math.floor($displayed_count + 1)]?.text)}</p>
            <p class="${"name svelte-711foc"}">${escape(reviews[Math.floor($displayed_count + 1)]?.name)} - ${escape(reviews[Math.floor($displayed_count + 1)]?.company)}</p></article>
          <article style="${"opacity: " + escape(1 - offset, true) + ";"}" class="${"svelte-711foc"}">${``}
            <div class="${"stars svelte-711foc"}">${each(reviews[Math.floor($displayed_count)]?.rating || [], (icon) => {
        return `${validate_component(CommonIcon, "Icon").$$render($$result, { class: "material-icons" }, {}, {
          default: () => {
            return `${escape(icon)}`;
          }
        })}`;
      })}</div>
            <p>${escape(reviews[Math.floor($displayed_count)]?.text)}</p>
            <p class="${"name svelte-711foc"}">${escape(reviews[Math.floor($displayed_count)]?.name)} - ${escape(reviews[Math.floor($displayed_count)]?.company)}</p></article></div>

        <div class="${"carousel-icons svelte-711foc"}">${validate_component(IconButton, "IconButton").$$render(
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
const Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["use", "class", "variant", "padded", "getElement"]);
  forwardEventsBuilder(get_current_component());
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let { variant = "raised" } = $$props;
  let { padded = false } = $$props;
  let element;
  function getElement() {
    return element;
  }
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0)
    $$bindings.variant(variant);
  if ($$props.padded === void 0 && $$bindings.padded && padded !== void 0)
    $$bindings.padded(padded);
  if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
    $$bindings.getElement(getElement);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(classMap({
          [className]: true,
          "mdc-card": true,
          "mdc-card--outlined": variant === "outlined",
          "smui-card--padded": padded
        }))
      },
      escape_object($$restProps)
    ],
    {}
  )}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}
</div>`;
});
const Content = classAdderBuilder({
  class: "smui-card__content",
  tag: "div"
});
const PrimaryAction = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["use", "class", "style", "ripple", "color", "padded", "tabindex", "getElement"]);
  forwardEventsBuilder(get_current_component());
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let { style = "" } = $$props;
  let { ripple = true } = $$props;
  let { color = void 0 } = $$props;
  let { padded = false } = $$props;
  let { tabindex = 0 } = $$props;
  let element;
  let internalClasses = {};
  let internalStyles = {};
  function getElement() {
    return element;
  }
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.ripple === void 0 && $$bindings.ripple && ripple !== void 0)
    $$bindings.ripple(ripple);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.padded === void 0 && $$bindings.padded && padded !== void 0)
    $$bindings.padded(padded);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
    $$bindings.getElement(getElement);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(classMap({
          [className]: true,
          "mdc-card__primary-action": true,
          "smui-card__primary-action--padded": padded,
          ...internalClasses
        }))
      },
      {
        style: escape_attribute_value(Object.entries(internalStyles).map(([name, value]) => `${name}: ${value};`).concat([style]).join(" "))
      },
      {
        tabindex: escape_attribute_value(tabindex)
      },
      escape_object($$restProps)
    ],
    {}
  )}${add_attribute("this", element, 0)}><div class="${"mdc-card__ripple"}"></div>
  ${slots.default ? slots.default({}) : ``}
</div>`;
});
const Media = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["use", "class", "aspectRatio", "getElement"]);
  forwardEventsBuilder(get_current_component());
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let { aspectRatio = void 0 } = $$props;
  let element;
  function getElement() {
    return element;
  }
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.aspectRatio === void 0 && $$bindings.aspectRatio && aspectRatio !== void 0)
    $$bindings.aspectRatio(aspectRatio);
  if ($$props.getElement === void 0 && $$bindings.getElement && getElement !== void 0)
    $$bindings.getElement(getElement);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(classMap({
          [className]: true,
          "mdc-card__media": true,
          "mdc-card__media--square": aspectRatio === "square",
          "mdc-card__media--16-9": aspectRatio === "16x9"
        }))
      },
      escape_object($$restProps)
    ],
    {}
  )}${add_attribute("this", element, 0)}>${slots.default ? slots.default({}) : ``}
</div>`;
});
classAdderBuilder({
  class: "mdc-card__media-content",
  tag: "div"
});
classAdderBuilder({
  class: "mdc-card__action-buttons",
  tag: "div"
});
classAdderBuilder({
  class: "mdc-card__action-icons",
  tag: "div"
});
const banner2 = "/_app/immutable/assets/home-banner2-51d10a4d.webp";
const banner1 = "/_app/immutable/assets/home-banner1-acf3bc19.webp";
const bannerFull = "/_app/immutable/assets/home-banner-full-313f1baa.jpg";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".logo.svelte-1kodxm6.svelte-1kodxm6.svelte-1kodxm6{position:absolute;width:400px;max-width:calc(100vw - 2em);height:180px;max-height:calc((100vw - 2em) / 2.5);overflow:hidden}.logo.svelte-1kodxm6>img.svelte-1kodxm6.svelte-1kodxm6{position:absolute;left:50%;top:45%;transform:translate(-50%, -50%);width:125%}.about.svelte-1kodxm6.svelte-1kodxm6.svelte-1kodxm6{display:flex;justify-content:center;padding:2em 0}@media(max-width: 1000px){.about.svelte-1kodxm6.svelte-1kodxm6.svelte-1kodxm6{flex-direction:column;text-align:center;align-items:center}}.about.svelte-1kodxm6>div.svelte-1kodxm6.svelte-1kodxm6{display:flex;align-items:center;max-width:500px;padding:0 2em}.services.svelte-1kodxm6.svelte-1kodxm6.svelte-1kodxm6{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2em 0}.services.svelte-1kodxm6 ul.svelte-1kodxm6.svelte-1kodxm6{padding:0;text-align:center}.services.svelte-1kodxm6 ul.svelte-1kodxm6>li.svelte-1kodxm6{list-style:none;margin:50px 50px}@media(max-width: 1170px){.services.svelte-1kodxm6 ul.svelte-1kodxm6>li.svelte-1kodxm6{margin:25px 25px}}@media(max-width: 1025px){.services.svelte-1kodxm6 ul.svelte-1kodxm6>li.svelte-1kodxm6{margin:10px 10px}}.card-container.svelte-1kodxm6.svelte-1kodxm6.svelte-1kodxm6{display:flex}@media(max-width: 925px){.card-container.svelte-1kodxm6.svelte-1kodxm6.svelte-1kodxm6{flex-direction:column}}.card-container.svelte-1kodxm6>li.svelte-1kodxm6.svelte-1kodxm6{margin:10px 10px;min-width:290px}.card-container.svelte-1kodxm6>li a.svelte-1kodxm6.svelte-1kodxm6{text-decoration:none;color:black}.card-container.svelte-1kodxm6>li a.svelte-1kodxm6.svelte-1kodxm6:hover{text-decoration:underline}.card-container.svelte-1kodxm6>li .card-media-16x9 .icon.svelte-1kodxm6.svelte-1kodxm6{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);font-size:80px;color:rgba(255, 255, 255, 0.6)}#contact-us.svelte-1kodxm6.svelte-1kodxm6.svelte-1kodxm6{background-image:url({banner2})}#contact-us.svelte-1kodxm6>div.svelte-1kodxm6.svelte-1kodxm6{display:flex;flex-direction:column;align-items:center;text-align:center;padding:1.5em 0}@media(max-width: 920px){#contact-us.svelte-1kodxm6>div.svelte-1kodxm6.svelte-1kodxm6{background-color:#e8d6b3;padding:45px 45px}}#contact-us.svelte-1kodxm6>div.svelte-1kodxm6 p.svelte-1kodxm6{padding:0;margin-top:0}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let vars = `background-image: url(${banner2});`;
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-1woy9cy_START -->${$$result.title = `<title>Randall and Associates</title>`, ""}<meta name="${"Randall and Associates"}" content="${"Joshua Randall is the Director/Principal Lawyer of Randall & Associates, a law firm providing legal services focusing in Property & Conveyancing, Personal Injury, and Wills & Estate matters."}"><!-- HEAD_svelte-1woy9cy_END -->`, ""}

<section><div class="${"hero"}"><picture><source type="${"image/webp"}"${add_attribute("srcset", banner1, 0)} media="${"(max-width: 1200px)"}">
      <source type="${"image/webp"}"${add_attribute("srcset", banner2, 0)} media="${"(min-resolution: 50dpi)"}">
      <source type="${"image/webp"}"${add_attribute("srcset", banner1, 0)}>

      <img${add_attribute("src", bannerFull, 0)} alt="${"A city scape"}"></picture>
    <div class="${"logo svelte-1kodxm6"}"><img${add_attribute("src", logo, 0)} alt="${"Randall and Associates"}" class="${"svelte-1kodxm6"}"></div></div></section>

<section><div class="${"gutters about svelte-1kodxm6"}"><div class="${"left svelte-1kodxm6"}"><h2 class="${"mdc-typography--heading2"}">Sydney Lawyers &amp; Conveyancers<br> you can count on.
      </h2></div>
    <div class="${"right svelte-1kodxm6"}"><p class="${"about mdc-typography--body1 svelte-1kodxm6"}">For over twenty years Joshua Randall has represented and supported the
        legal interests of a diverse range of individuals and companies
        throughout New South Wales. Putting YOU first is crucial as we develop
        realistic and sustainable legal solutions that work when you need it
        most.
      </p></div></div></section>

<section style="${"background: #E8D6B3;"}"><div class="${"gutters services svelte-1kodxm6"}">
    <ul class="${"card-container svelte-1kodxm6"}"><li class="${"svelte-1kodxm6"}"><a href="${"/property-and-conveyancing"}" style="${"text-decoration: none;"}" class="${"svelte-1kodxm6"}">${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(PrimaryAction, "PrimaryAction").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Media, "Media").$$render(
            $$result,
            {
              class: "card-media-16x9",
              aspectRatio: "16x9",
              style: "background: #484c5a;position: relative"
            },
            {},
            {
              default: () => {
                return `<span class="${"material-symbols-outlined icon svelte-1kodxm6"}">real_estate_agent
                </span>`;
              }
            }
          )}
              ${validate_component(Content, "Content").$$render($$result, {}, {}, {
            default: () => {
              return `Property and Conveyancing`;
            }
          })}`;
        }
      })}`;
    }
  })}</a></li>
      <li class="${"svelte-1kodxm6"}"><a href="${"/personal-injury"}" style="${"text-decoration: none;"}" class="${"svelte-1kodxm6"}">${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(PrimaryAction, "PrimaryAction").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Media, "Media").$$render(
            $$result,
            {
              class: "card-media-16x9",
              aspectRatio: "16x9",
              style: "background: #484c5a;position: relative"
            },
            {},
            {
              default: () => {
                return `<span class="${"material-symbols-outlined icon svelte-1kodxm6"}">personal_injury
                </span>`;
              }
            }
          )}
              ${validate_component(Content, "Content").$$render($$result, {}, {}, {
            default: () => {
              return `Personal Injury`;
            }
          })}`;
        }
      })}`;
    }
  })}</a></li>
      <li class="${"svelte-1kodxm6"}"><a href="${"/wills-and-estates"}" style="${"text-decoration: none;"}" class="${"svelte-1kodxm6"}">${validate_component(Card, "Card").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(PrimaryAction, "PrimaryAction").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Media, "Media").$$render(
            $$result,
            {
              class: "card-media-16x9",
              aspectRatio: "16x9",
              style: "background: #484c5a;position: relative"
            },
            {},
            {
              default: () => {
                return `<span class="${"material-symbols-outlined icon svelte-1kodxm6"}">history_edu
                </span>`;
              }
            }
          )}
              ${validate_component(Content, "Content").$$render($$result, {}, {}, {
            default: () => {
              return `Wills and Estates`;
            }
          })}`;
        }
      })}`;
    }
  })}</a></li></ul></div></section>

${validate_component(Testimonials, "Testimonials").$$render($$result, {}, {}, {})}

<section id="${"contact-us"}"${add_attribute("style", vars, 0)} class="${"svelte-1kodxm6"}"><div class="${"gutters svelte-1kodxm6"}"><h2 class="${"mdc-typography--heading2"}">Contact us.<br> Get in touch today for a fast responce within 24hrs.
    </h2>
    <p class="${"about mdc-typography--body1 svelte-1kodxm6"}">Randall and Associates are ready to assit you with your legal matters.<br>
      Contact us for fast, easy and affordable service.
    </p>
    <div>
      ${validate_component(Button, "Button").$$render(
    $$result,
    {
      variant: "unelevated",
      style: "height: 44px; min-width: 250px; margin-bottom: 10px;"
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
  )}</div></div>
</section>`;
});
export {
  Page as default
};
