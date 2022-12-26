import { g as get_store_value, o as onDestroy, c as create_ssr_component, d as add_styles, e as escape, v as validate_component, m as missing_component, f as spread, h as escape_object, j as merge_ssr_styles, k as add_attribute, b as subscribe, l as each, p as compute_rest_props, q as get_current_component } from "../../chunks/index.js";
import { d as derived, w as writable } from "../../chunks/index2.js";
import { l as logo, I as IconButton, C as CommonIcon, D as Drawer, a as Content } from "../../chunks/Subtitle.js";
import { p as page } from "../../chunks/stores.js";
import { f as forwardEventsBuilder, c as classMap, S as SmuiElement } from "../../chunks/classAdderBuilder.js";
function writableDerived(origins, derive, reflect, initial) {
  var childDerivedSetter, originValues, blockNextDerive = false;
  var reflectOldValues = "withOld" in reflect;
  var wrappedDerive = (got, set) => {
    childDerivedSetter = set;
    if (reflectOldValues) {
      originValues = got;
    }
    if (!blockNextDerive) {
      let returned = derive(got, set);
      if (derive.length < 2) {
        set(returned);
      } else {
        return returned;
      }
    }
    blockNextDerive = false;
  };
  var childDerived = derived(origins, wrappedDerive, initial);
  var singleOrigin = !Array.isArray(origins);
  var sendUpstream = (setWith) => {
    if (singleOrigin) {
      blockNextDerive = true;
      origins.set(setWith);
    } else {
      setWith.forEach((value, i) => {
        blockNextDerive = true;
        origins[i].set(value);
      });
    }
    blockNextDerive = false;
  };
  if (reflectOldValues) {
    reflect = reflect.withOld;
  }
  var reflectIsAsync = reflect.length >= (reflectOldValues ? 3 : 2);
  var cleanup = null;
  function doReflect(reflecting) {
    if (cleanup) {
      cleanup();
      cleanup = null;
    }
    if (reflectOldValues) {
      var returned = reflect(reflecting, originValues, sendUpstream);
    } else {
      var returned = reflect(reflecting, sendUpstream);
    }
    if (reflectIsAsync) {
      if (typeof returned == "function") {
        cleanup = returned;
      }
    } else {
      sendUpstream(returned);
    }
  }
  var tryingSet = false;
  function update2(fn) {
    var isUpdated, mutatedBySubscriptions, oldValue, newValue;
    if (tryingSet) {
      newValue = fn(get_store_value(childDerived));
      childDerivedSetter(newValue);
      return;
    }
    var unsubscribe = childDerived.subscribe((value) => {
      if (!tryingSet) {
        oldValue = value;
      } else if (!isUpdated) {
        isUpdated = true;
      } else {
        mutatedBySubscriptions = true;
      }
    });
    newValue = fn(oldValue);
    tryingSet = true;
    childDerivedSetter(newValue);
    unsubscribe();
    tryingSet = false;
    if (mutatedBySubscriptions) {
      newValue = get_store_value(childDerived);
    }
    if (isUpdated) {
      doReflect(newValue);
    }
  }
  return {
    subscribe: childDerived.subscribe,
    set(value) {
      update2(() => value);
    },
    update: update2
  };
}
const TOAST_LIMIT = 20;
const toasts = writable([]);
const pausedAt = writable(null);
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    remove(toastId);
  }, 1e3);
  toastTimeouts.set(toastId, timeout);
};
const clearFromRemoveQueue = (toastId) => {
  const timeout = toastTimeouts.get(toastId);
  if (timeout) {
    clearTimeout(timeout);
  }
};
function update(toast2) {
  if (toast2.id) {
    clearFromRemoveQueue(toast2.id);
  }
  toasts.update(($toasts) => $toasts.map((t) => t.id === toast2.id ? { ...t, ...toast2 } : t));
}
function add(toast2) {
  toasts.update(($toasts) => [toast2, ...$toasts].slice(0, TOAST_LIMIT));
}
function upsert(toast2) {
  if (get_store_value(toasts).find((t) => t.id === toast2.id)) {
    update(toast2);
  } else {
    add(toast2);
  }
}
function dismiss(toastId) {
  toasts.update(($toasts) => {
    if (toastId) {
      addToRemoveQueue(toastId);
    } else {
      $toasts.forEach((toast2) => {
        addToRemoveQueue(toast2.id);
      });
    }
    return $toasts.map((t) => t.id === toastId || toastId === void 0 ? { ...t, visible: false } : t);
  });
}
function remove(toastId) {
  toasts.update(($toasts) => {
    if (toastId === void 0) {
      return [];
    }
    return $toasts.filter((t) => t.id !== toastId);
  });
}
function startPause(time) {
  pausedAt.set(time);
}
function endPause(time) {
  let diff;
  pausedAt.update(($pausedAt) => {
    diff = time - ($pausedAt || 0);
    return null;
  });
  toasts.update(($toasts) => $toasts.map((t) => ({
    ...t,
    pauseDuration: t.pauseDuration + diff
  })));
}
const defaultTimeouts = {
  blank: 4e3,
  error: 4e3,
  success: 2e3,
  loading: Infinity,
  custom: 4e3
};
function useToasterStore(toastOptions = {}) {
  const mergedToasts = writableDerived(toasts, ($toasts) => $toasts.map((t) => ({
    ...toastOptions,
    ...toastOptions[t.type],
    ...t,
    duration: t.duration || toastOptions[t.type]?.duration || toastOptions?.duration || defaultTimeouts[t.type],
    style: [toastOptions.style, toastOptions[t.type]?.style, t.style].join(";")
  })), ($toasts) => $toasts);
  return {
    toasts: mergedToasts,
    pausedAt
  };
}
const isFunction = (valOrFunction) => typeof valOrFunction === "function";
const resolveValue = (valOrFunction, arg) => isFunction(valOrFunction) ? valOrFunction(arg) : valOrFunction;
const genId = (() => {
  let count = 0;
  return () => {
    count += 1;
    return count.toString();
  };
})();
const prefersReducedMotion = (() => {
  let shouldReduceMotion;
  return () => {
    if (shouldReduceMotion === void 0 && typeof window !== "undefined") {
      const mediaQuery = matchMedia("(prefers-reduced-motion: reduce)");
      shouldReduceMotion = !mediaQuery || mediaQuery.matches;
    }
    return shouldReduceMotion;
  };
})();
const createToast = (message, type = "blank", opts) => ({
  createdAt: Date.now(),
  visible: true,
  type,
  ariaProps: {
    role: "status",
    "aria-live": "polite"
  },
  message,
  pauseDuration: 0,
  ...opts,
  id: opts?.id || genId()
});
const createHandler = (type) => (message, options) => {
  const toast2 = createToast(message, type, options);
  upsert(toast2);
  return toast2.id;
};
const toast = (message, opts) => createHandler("blank")(message, opts);
toast.error = createHandler("error");
toast.success = createHandler("success");
toast.loading = createHandler("loading");
toast.custom = createHandler("custom");
toast.dismiss = (toastId) => {
  dismiss(toastId);
};
toast.remove = (toastId) => remove(toastId);
toast.promise = (promise, msgs, opts) => {
  const id = toast.loading(msgs.loading, { ...opts, ...opts?.loading });
  promise.then((p) => {
    toast.success(resolveValue(msgs.success, p), {
      id,
      ...opts,
      ...opts?.success
    });
    return p;
  }).catch((e) => {
    toast.error(resolveValue(msgs.error, e), {
      id,
      ...opts,
      ...opts?.error
    });
  });
  return promise;
};
const toast$1 = toast;
function calculateOffset(toast2, $toasts, opts) {
  const { reverseOrder, gutter = 8, defaultPosition } = opts || {};
  const relevantToasts = $toasts.filter((t) => (t.position || defaultPosition) === (toast2.position || defaultPosition) && t.height);
  const toastIndex = relevantToasts.findIndex((t) => t.id === toast2.id);
  const toastsBefore = relevantToasts.filter((toast3, i) => i < toastIndex && toast3.visible).length;
  const offset = relevantToasts.filter((t) => t.visible).slice(...reverseOrder ? [toastsBefore + 1] : [0, toastsBefore]).reduce((acc, t) => acc + (t.height || 0) + gutter, 0);
  return offset;
}
const handlers = {
  startPause() {
    startPause(Date.now());
  },
  endPause() {
    endPause(Date.now());
  },
  updateHeight: (toastId, height) => {
    update({ id: toastId, height });
  },
  calculateOffset
};
function useToaster(toastOptions) {
  const { toasts: toasts2, pausedAt: pausedAt2 } = useToasterStore(toastOptions);
  const timeouts = /* @__PURE__ */ new Map();
  let _pausedAt;
  const unsubscribes = [
    pausedAt2.subscribe(($pausedAt) => {
      if ($pausedAt) {
        for (const [, timeoutId] of timeouts) {
          clearTimeout(timeoutId);
        }
        timeouts.clear();
      }
      _pausedAt = $pausedAt;
    }),
    toasts2.subscribe(($toasts) => {
      if (_pausedAt) {
        return;
      }
      const now = Date.now();
      for (const t of $toasts) {
        if (timeouts.has(t.id)) {
          continue;
        }
        if (t.duration === Infinity) {
          continue;
        }
        const durationLeft = (t.duration || 0) + t.pauseDuration - (now - t.createdAt);
        if (durationLeft < 0) {
          if (t.visible) {
            toast$1.dismiss(t.id);
          }
          return null;
        }
        timeouts.set(t.id, setTimeout(() => toast$1.dismiss(t.id), durationLeft));
      }
    })
  ];
  onDestroy(() => {
    for (const unsubscribe of unsubscribes) {
      unsubscribe();
    }
  });
  return { toasts: toasts2, handlers };
}
const CheckmarkIcon_svelte_svelte_type_style_lang = "";
const css$a = {
  code: "div.svelte-1vib967{width:20px;opacity:0;height:20px;border-radius:10px;background:var(--primary, #61d345);position:relative;transform:rotate(45deg);-webkit-animation:svelte-1vib967-circleAnimation 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;animation:svelte-1vib967-circleAnimation 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;-webkit-animation-delay:100ms;animation-delay:100ms}div.svelte-1vib967::after{content:'';box-sizing:border-box;-webkit-animation:svelte-1vib967-checkmarkAnimation 0.2s ease-out forwards;animation:svelte-1vib967-checkmarkAnimation 0.2s ease-out forwards;opacity:0;-webkit-animation-delay:200ms;animation-delay:200ms;position:absolute;border-right:2px solid;border-bottom:2px solid;border-color:var(--secondary, #fff);bottom:6px;left:6px;height:10px;width:6px}@-webkit-keyframes svelte-1vib967-circleAnimation{from{transform:scale(0) rotate(45deg);opacity:0}to{transform:scale(1) rotate(45deg);opacity:1}}@keyframes svelte-1vib967-circleAnimation{from{transform:scale(0) rotate(45deg);opacity:0}to{transform:scale(1) rotate(45deg);opacity:1}}@-webkit-keyframes svelte-1vib967-checkmarkAnimation{0%{height:0;width:0;opacity:0}40%{height:0;width:6px;opacity:1}100%{opacity:1;height:10px}}@keyframes svelte-1vib967-checkmarkAnimation{0%{height:0;width:0;opacity:0}40%{height:0;width:6px;opacity:1}100%{opacity:1;height:10px}}",
  map: null
};
const CheckmarkIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { primary = "#61d345" } = $$props;
  let { secondary = "#fff" } = $$props;
  if ($$props.primary === void 0 && $$bindings.primary && primary !== void 0)
    $$bindings.primary(primary);
  if ($$props.secondary === void 0 && $$bindings.secondary && secondary !== void 0)
    $$bindings.secondary(secondary);
  $$result.css.add(css$a);
  return `


<div class="${"svelte-1vib967"}"${add_styles({
    "--primary": primary,
    "--secondary": secondary
  })}></div>`;
});
const CheckmarkIcon$1 = CheckmarkIcon;
const ErrorIcon_svelte_svelte_type_style_lang = "";
const css$9 = {
  code: "div.svelte-14jc2sj{width:20px;opacity:0;height:20px;border-radius:10px;background:var(--primary, #ff4b4b);position:relative;transform:rotate(45deg);-webkit-animation:svelte-14jc2sj-circleAnimation 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;animation:svelte-14jc2sj-circleAnimation 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;-webkit-animation-delay:100ms;animation-delay:100ms}div.svelte-14jc2sj::after,div.svelte-14jc2sj::before{content:'';-webkit-animation:svelte-14jc2sj-firstLineAnimation 0.15s ease-out forwards;animation:svelte-14jc2sj-firstLineAnimation 0.15s ease-out forwards;-webkit-animation-delay:150ms;animation-delay:150ms;position:absolute;border-radius:3px;opacity:0;background:var(--secondary, #fff);bottom:9px;left:4px;height:2px;width:12px}div.svelte-14jc2sj:before{-webkit-animation:svelte-14jc2sj-secondLineAnimation 0.15s ease-out forwards;animation:svelte-14jc2sj-secondLineAnimation 0.15s ease-out forwards;-webkit-animation-delay:180ms;animation-delay:180ms;transform:rotate(90deg)}@-webkit-keyframes svelte-14jc2sj-circleAnimation{from{transform:scale(0) rotate(45deg);opacity:0}to{transform:scale(1) rotate(45deg);opacity:1}}@keyframes svelte-14jc2sj-circleAnimation{from{transform:scale(0) rotate(45deg);opacity:0}to{transform:scale(1) rotate(45deg);opacity:1}}@-webkit-keyframes svelte-14jc2sj-firstLineAnimation{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}@keyframes svelte-14jc2sj-firstLineAnimation{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}@-webkit-keyframes svelte-14jc2sj-secondLineAnimation{from{transform:scale(0) rotate(90deg);opacity:0}to{transform:scale(1) rotate(90deg);opacity:1}}@keyframes svelte-14jc2sj-secondLineAnimation{from{transform:scale(0) rotate(90deg);opacity:0}to{transform:scale(1) rotate(90deg);opacity:1}}",
  map: null
};
const ErrorIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { primary = "#ff4b4b" } = $$props;
  let { secondary = "#fff" } = $$props;
  if ($$props.primary === void 0 && $$bindings.primary && primary !== void 0)
    $$bindings.primary(primary);
  if ($$props.secondary === void 0 && $$bindings.secondary && secondary !== void 0)
    $$bindings.secondary(secondary);
  $$result.css.add(css$9);
  return `


<div class="${"svelte-14jc2sj"}"${add_styles({
    "--primary": primary,
    "--secondary": secondary
  })}></div>`;
});
const ErrorIcon$1 = ErrorIcon;
const LoaderIcon_svelte_svelte_type_style_lang = "";
const css$8 = {
  code: "div.svelte-el8rh1{width:12px;height:12px;box-sizing:border-box;border:2px solid;border-radius:100%;border-color:var(--secondary, #e0e0e0);border-right-color:var(--primary, #616161);-webkit-animation:svelte-el8rh1-rotate 1s linear infinite;animation:svelte-el8rh1-rotate 1s linear infinite}@-webkit-keyframes svelte-el8rh1-rotate{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes svelte-el8rh1-rotate{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}",
  map: null
};
const LoaderIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { primary = "#616161" } = $$props;
  let { secondary = "#e0e0e0" } = $$props;
  if ($$props.primary === void 0 && $$bindings.primary && primary !== void 0)
    $$bindings.primary(primary);
  if ($$props.secondary === void 0 && $$bindings.secondary && secondary !== void 0)
    $$bindings.secondary(secondary);
  $$result.css.add(css$8);
  return `


<div class="${"svelte-el8rh1"}"${add_styles({
    "--primary": primary,
    "--secondary": secondary
  })}></div>`;
});
const LoaderIcon$1 = LoaderIcon;
const ToastIcon_svelte_svelte_type_style_lang = "";
const css$7 = {
  code: ".indicator.svelte-1yutmpl{position:relative;display:flex;justify-content:center;align-items:center;min-width:20px;min-height:20px}.status.svelte-1yutmpl{position:absolute}.animated.svelte-1yutmpl{position:relative;transform:scale(0.6);opacity:0.4;min-width:20px;-webkit-animation:svelte-1yutmpl-enter 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;animation:svelte-1yutmpl-enter 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards}@-webkit-keyframes svelte-1yutmpl-enter{from{transform:scale(0.6);opacity:0.4}to{transform:scale(1);opacity:1}}@keyframes svelte-1yutmpl-enter{from{transform:scale(0.6);opacity:0.4}to{transform:scale(1);opacity:1}}",
  map: null
};
const ToastIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let type;
  let icon;
  let iconTheme;
  let { toast: toast2 } = $$props;
  if ($$props.toast === void 0 && $$bindings.toast && toast2 !== void 0)
    $$bindings.toast(toast2);
  $$result.css.add(css$7);
  ({ type, icon, iconTheme } = toast2);
  return `${typeof icon === "string" ? `<div class="${"animated svelte-1yutmpl"}">${escape(icon)}</div>` : `${typeof icon !== "undefined" ? `${validate_component(icon || missing_component, "svelte:component").$$render($$result, {}, {}, {})}` : `${type !== "blank" ? `<div class="${"indicator svelte-1yutmpl"}">${validate_component(LoaderIcon$1, "LoaderIcon").$$render($$result, Object.assign(iconTheme), {}, {})}
		${type !== "loading" ? `<div class="${"status svelte-1yutmpl"}">${type === "error" ? `${validate_component(ErrorIcon$1, "ErrorIcon").$$render($$result, Object.assign(iconTheme), {}, {})}` : `${validate_component(CheckmarkIcon$1, "CheckmarkIcon").$$render($$result, Object.assign(iconTheme), {}, {})}`}</div>` : ``}</div>` : ``}`}`}`;
});
const ToastIcon$1 = ToastIcon;
const ToastMessage_svelte_svelte_type_style_lang = "";
const css$6 = {
  code: ".message.svelte-o805t1{display:flex;justify-content:center;margin:4px 10px;color:inherit;flex:1 1 auto;white-space:pre-line}",
  map: null
};
const ToastMessage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { toast: toast2 } = $$props;
  if ($$props.toast === void 0 && $$bindings.toast && toast2 !== void 0)
    $$bindings.toast(toast2);
  $$result.css.add(css$6);
  return `<div${spread([{ class: "message" }, escape_object(toast2.ariaProps)], { classes: "svelte-o805t1" })}>${typeof toast2.message === "string" ? `${escape(toast2.message)}` : `${validate_component(toast2.message || missing_component, "svelte:component").$$render($$result, { toast: toast2 }, {}, {})}`}
</div>`;
});
const ToastMessage$1 = ToastMessage;
const ToastBar_svelte_svelte_type_style_lang = "";
const css$5 = {
  code: "@-webkit-keyframes svelte-jj17sd-enterAnimation{0%{transform:translate3d(0, calc(var(--factor) * -200%), 0) scale(0.6);opacity:0.5}100%{transform:translate3d(0, 0, 0) scale(1);opacity:1}}@keyframes svelte-jj17sd-enterAnimation{0%{transform:translate3d(0, calc(var(--factor) * -200%), 0) scale(0.6);opacity:0.5}100%{transform:translate3d(0, 0, 0) scale(1);opacity:1}}@-webkit-keyframes svelte-jj17sd-exitAnimation{0%{transform:translate3d(0, 0, -1px) scale(1);opacity:1}100%{transform:translate3d(0, calc(var(--factor) * -150%), -1px) scale(0.6);opacity:0}}@keyframes svelte-jj17sd-exitAnimation{0%{transform:translate3d(0, 0, -1px) scale(1);opacity:1}100%{transform:translate3d(0, calc(var(--factor) * -150%), -1px) scale(0.6);opacity:0}}@-webkit-keyframes svelte-jj17sd-fadeInAnimation{0%{opacity:0}100%{opacity:1}}@keyframes svelte-jj17sd-fadeInAnimation{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes svelte-jj17sd-fadeOutAnimation{0%{opacity:1}100%{opacity:0}}@keyframes svelte-jj17sd-fadeOutAnimation{0%{opacity:1}100%{opacity:0}}.base.svelte-jj17sd{display:flex;align-items:center;background:#fff;color:#363636;line-height:1.3;will-change:transform;box-shadow:0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);max-width:350px;pointer-events:auto;padding:8px 10px;border-radius:8px}.transparent.svelte-jj17sd{opacity:0}.enter.svelte-jj17sd{-webkit-animation:svelte-jj17sd-enterAnimation 0.35s cubic-bezier(0.21, 1.02, 0.73, 1) forwards;animation:svelte-jj17sd-enterAnimation 0.35s cubic-bezier(0.21, 1.02, 0.73, 1) forwards}.exit.svelte-jj17sd{-webkit-animation:svelte-jj17sd-exitAnimation 0.4s cubic-bezier(0.06, 0.71, 0.55, 1) forwards;animation:svelte-jj17sd-exitAnimation 0.4s cubic-bezier(0.06, 0.71, 0.55, 1) forwards}.fadeIn.svelte-jj17sd{-webkit-animation:svelte-jj17sd-fadeInAnimation 0.35s cubic-bezier(0.21, 1.02, 0.73, 1) forwards;animation:svelte-jj17sd-fadeInAnimation 0.35s cubic-bezier(0.21, 1.02, 0.73, 1) forwards}.fadeOut.svelte-jj17sd{-webkit-animation:svelte-jj17sd-fadeOutAnimation 0.4s cubic-bezier(0.06, 0.71, 0.55, 1) forwards;animation:svelte-jj17sd-fadeOutAnimation 0.4s cubic-bezier(0.06, 0.71, 0.55, 1) forwards}",
  map: null
};
const ToastBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { toast: toast2 } = $$props;
  let { position = void 0 } = $$props;
  let { style = "" } = $$props;
  let { Component = void 0 } = $$props;
  let factor;
  let animation;
  if ($$props.toast === void 0 && $$bindings.toast && toast2 !== void 0)
    $$bindings.toast(toast2);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0)
    $$bindings.position(position);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.Component === void 0 && $$bindings.Component && Component !== void 0)
    $$bindings.Component(Component);
  $$result.css.add(css$5);
  {
    {
      const top = (toast2.position || position || "top-center").includes("top");
      factor = top ? 1 : -1;
      const [enter, exit] = prefersReducedMotion() ? ["fadeIn", "fadeOut"] : ["enter", "exit"];
      animation = toast2.visible ? enter : exit;
    }
  }
  return `<div class="${"base " + escape(toast2.height ? animation : "transparent", true) + " " + escape(toast2.className || "", true) + " svelte-jj17sd"}"${add_styles(merge_ssr_styles(escape(style, true) + "; " + escape(toast2.style, true), { "--factor": factor }))}>${Component ? `${validate_component(Component || missing_component, "svelte:component").$$render($$result, {}, {}, {
    message: () => {
      return `${validate_component(ToastMessage$1, "ToastMessage").$$render($$result, { toast: toast2, slot: "message" }, {}, {})}`;
    },
    icon: () => {
      return `${validate_component(ToastIcon$1, "ToastIcon").$$render($$result, { toast: toast2, slot: "icon" }, {}, {})}`;
    }
  })}` : `${slots.default ? slots.default({ ToastIcon: ToastIcon$1, ToastMessage: ToastMessage$1, toast: toast2 }) : `
			${validate_component(ToastIcon$1, "ToastIcon").$$render($$result, { toast: toast2 }, {}, {})}
			${validate_component(ToastMessage$1, "ToastMessage").$$render($$result, { toast: toast2 }, {}, {})}
		`}`}
</div>`;
});
const ToastBar$1 = ToastBar;
const ToastWrapper_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: ".wrapper.svelte-1pakgpd{left:0;right:0;display:flex;position:absolute;transform:translateY(calc(var(--offset, 16px) * var(--factor) * 1px))}.transition.svelte-1pakgpd{transition:all 230ms cubic-bezier(0.21, 1.02, 0.73, 1)}.active.svelte-1pakgpd{z-index:9999}.active.svelte-1pakgpd>*{pointer-events:auto}",
  map: null
};
const ToastWrapper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let top;
  let bottom;
  let factor;
  let justifyContent;
  let { toast: toast2 } = $$props;
  let { setHeight } = $$props;
  let wrapperEl;
  if ($$props.toast === void 0 && $$bindings.toast && toast2 !== void 0)
    $$bindings.toast(toast2);
  if ($$props.setHeight === void 0 && $$bindings.setHeight && setHeight !== void 0)
    $$bindings.setHeight(setHeight);
  $$result.css.add(css$4);
  top = toast2.position?.includes("top") ? 0 : null;
  bottom = toast2.position?.includes("bottom") ? 0 : null;
  factor = toast2.position?.includes("top") ? 1 : -1;
  justifyContent = toast2.position?.includes("center") && "center" || toast2.position?.includes("right") && "flex-end" || null;
  return `<div class="${[
    "wrapper svelte-1pakgpd",
    (toast2.visible ? "active" : "") + " " + (!prefersReducedMotion() ? "transition" : "")
  ].join(" ").trim()}"${add_styles({
    "--factor": factor,
    "--offset": toast2.offset,
    top,
    bottom,
    "justify-content": justifyContent
  })}${add_attribute("this", wrapperEl, 0)}>${toast2.type === "custom" ? `${validate_component(ToastMessage$1, "ToastMessage").$$render($$result, { toast: toast2 }, {}, {})}` : `${slots.default ? slots.default({ toast: toast2 }) : `
			${validate_component(ToastBar$1, "ToastBar").$$render($$result, { toast: toast2, position: toast2.position }, {}, {})}
		`}`}
</div>`;
});
const ToastWrapper$1 = ToastWrapper;
const Toaster_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: ".toaster.svelte-jyff3d{--default-offset:16px;position:fixed;z-index:9999;top:var(--default-offset);left:var(--default-offset);right:var(--default-offset);bottom:var(--default-offset);pointer-events:none}",
  map: null
};
const Toaster = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $toasts, $$unsubscribe_toasts;
  let { reverseOrder = false } = $$props;
  let { position = "top-center" } = $$props;
  let { toastOptions = void 0 } = $$props;
  let { gutter = 8 } = $$props;
  let { containerStyle = void 0 } = $$props;
  let { containerClassName = void 0 } = $$props;
  const { toasts: toasts2, handlers: handlers2 } = useToaster(toastOptions);
  $$unsubscribe_toasts = subscribe(toasts2, (value) => $toasts = value);
  let _toasts;
  if ($$props.reverseOrder === void 0 && $$bindings.reverseOrder && reverseOrder !== void 0)
    $$bindings.reverseOrder(reverseOrder);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0)
    $$bindings.position(position);
  if ($$props.toastOptions === void 0 && $$bindings.toastOptions && toastOptions !== void 0)
    $$bindings.toastOptions(toastOptions);
  if ($$props.gutter === void 0 && $$bindings.gutter && gutter !== void 0)
    $$bindings.gutter(gutter);
  if ($$props.containerStyle === void 0 && $$bindings.containerStyle && containerStyle !== void 0)
    $$bindings.containerStyle(containerStyle);
  if ($$props.containerClassName === void 0 && $$bindings.containerClassName && containerClassName !== void 0)
    $$bindings.containerClassName(containerClassName);
  $$result.css.add(css$3);
  _toasts = $toasts.map((toast2) => ({
    ...toast2,
    position: toast2.position || position,
    offset: handlers2.calculateOffset(toast2, $toasts, {
      reverseOrder,
      gutter,
      defaultPosition: position
    })
  }));
  $$unsubscribe_toasts();
  return `<div class="${"toaster " + escape(containerClassName || "", true) + " svelte-jyff3d"}"${add_attribute("style", containerStyle, 0)}>${each(_toasts, (toast2) => {
    return `${validate_component(ToastWrapper$1, "ToastWrapper").$$render(
      $$result,
      {
        toast: toast2,
        setHeight: (height) => handlers2.updateHeight(toast2.id, height)
      },
      {},
      {}
    )}`;
  })}
</div>`;
});
const Toaster$1 = Toaster;
const Footer_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: '.footer-main.svelte-12t2pus.svelte-12t2pus.svelte-12t2pus.svelte-12t2pus{background-color:#484c5a}@media(max-width: 550px){.footer-main.svelte-12t2pus.svelte-12t2pus.svelte-12t2pus.svelte-12t2pus{padding-bottom:2em}}.footer-list.svelte-12t2pus.svelte-12t2pus.svelte-12t2pus.svelte-12t2pus{display:flex;justify-content:space-around;padding-left:0;list-style-type:none;color:white}.footer-list.svelte-12t2pus>li.svelte-12t2pus.svelte-12t2pus.svelte-12t2pus{flex:1}@media(min-width: 551px){.footer-list.svelte-12t2pus>li.svelte-12t2pus.svelte-12t2pus.svelte-12t2pus{min-height:216px}.footer-list.svelte-12t2pus>li.svelte-12t2pus.svelte-12t2pus.svelte-12t2pus:not(:first-child):not(:last-child){margin-left:2.4rem}}.footer-list.svelte-12t2pus>li.svelte-12t2pus>img.svelte-12t2pus.svelte-12t2pus{height:180px;margin:15px 0}.footer-list.svelte-12t2pus>li.svelte-12t2pus>h6.svelte-12t2pus.svelte-12t2pus{margin-top:35px;margin-bottom:10px}.footer-list.svelte-12t2pus>li a.svelte-12t2pus.svelte-12t2pus.svelte-12t2pus{display:block;font-size:15px;font-family:"Roboto";margin:6px 0;color:white;text-decoration:none}.footer-list.svelte-12t2pus>li a.svelte-12t2pus.svelte-12t2pus.svelte-12t2pus:hover{text-decoration:underline}@media(max-width: 900px) and (min-width: 551px){.footer-list.svelte-12t2pus.svelte-12t2pus.svelte-12t2pus.svelte-12t2pus{display:grid;grid-template-columns:repeat(2, 1fr);gap:1em;grid-auto-rows:minmax(100px, auto)}.footer-list.svelte-12t2pus>li.svelte-12t2pus.svelte-12t2pus.svelte-12t2pus:nth-child(1){grid-column:1/2;grid-row:1/2}.footer-list.svelte-12t2pus>li.svelte-12t2pus.svelte-12t2pus.svelte-12t2pus:nth-child(2){grid-column:1/2;grid-row:2/3}.footer-list.svelte-12t2pus>li.svelte-12t2pus.svelte-12t2pus.svelte-12t2pus:nth-child(3){grid-column:2/3;grid-row:1/2}.footer-list.svelte-12t2pus>li.svelte-12t2pus.svelte-12t2pus.svelte-12t2pus:nth-child(4){grid-column:2/3;grid-row:2/3}}@media(max-width: 550px){.footer-list.svelte-12t2pus.svelte-12t2pus.svelte-12t2pus.svelte-12t2pus{flex-direction:column;max-width:400px;margin:auto}.footer-list.svelte-12t2pus li.svelte-12t2pus>img.svelte-12t2pus.svelte-12t2pus{height:auto;width:100%}}#footers-foot.svelte-12t2pus.svelte-12t2pus.svelte-12t2pus.svelte-12t2pus{height:60px;background-color:#282d3d}#footers-foot.svelte-12t2pus>div.svelte-12t2pus.svelte-12t2pus.svelte-12t2pus{display:flex;align-items:center;justify-content:space-between;color:white}@media(max-width: 724px){#footers-foot.svelte-12t2pus>div.svelte-12t2pus.svelte-12t2pus.svelte-12t2pus{justify-content:center}}#footers-foot.svelte-12t2pus>div.svelte-12t2pus>p.svelte-12t2pus.svelte-12t2pus{font-size:15px}@media(max-width: 724px){#footers-foot.svelte-12t2pus>div.svelte-12t2pus>p.svelte-12t2pus.svelte-12t2pus{text-align:center;font-size:12px}}@media(max-width: 724px){#footers-foot.svelte-12t2pus>div.svelte-12t2pus>ul.svelte-12t2pus.svelte-12t2pus{padding:0}}#footers-foot.svelte-12t2pus>div.svelte-12t2pus>ul.svelte-12t2pus>a.svelte-12t2pus{padding:15px 15px;font-size:15px;color:white;text-decoration:none;white-space:nowrap}@media(max-width: 724px){#footers-foot.svelte-12t2pus>div.svelte-12t2pus>ul.svelte-12t2pus>a.svelte-12t2pus{display:none}}#footers-foot.svelte-12t2pus>div.svelte-12t2pus>ul.svelte-12t2pus>a.svelte-12t2pus:hover{text-decoration:underline}',
  map: null
};
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$2);
  return `<section class="${"footer-main svelte-12t2pus"}"><div class="${"gutters"}"><ul class="${"footer-list svelte-12t2pus"}"><li class="${"svelte-12t2pus"}"><img${add_attribute("src", logo, 0)} alt="${"logo"}" class="${"svelte-12t2pus"}"></li>
      <li class="${"svelte-12t2pus"}"><h6 class="${"svelte-12t2pus"}">Contact Information</h6>
        <a href="${"/contact"}" class="${"svelte-12t2pus"}">(02) 8378 7698</a>
        <a href="${"mailto:mail@randallandassoc.com"}" class="${"svelte-12t2pus"}">mail@randallandassoc.com</a>
        <a href="${"/contact"}" class="${"svelte-12t2pus"}">Video appointments available on request</a></li>
      <li class="${"svelte-12t2pus"}"><h6 class="${"svelte-12t2pus"}">Practice Areas</h6>
        <a href="${"/property-and-conveyancing"}" class="${"svelte-12t2pus"}">Property &amp; Conveyancing</a>
        <a href="${"/personal-injury"}" class="${"svelte-12t2pus"}">Personal Injury</a>
        <a href="${"/wills-and-estates"}" class="${"svelte-12t2pus"}">Wills &amp; Estates</a></li>
      <li class="${"svelte-12t2pus"}"><h6 class="${"svelte-12t2pus"}">Terms &amp; Conditions</h6>
        <a href="${"/terms-and-conditions"}" class="${"svelte-12t2pus"}">T &amp; C&#39;s</a></li></ul></div></section>
<section id="${"footers-foot"}" class="${"svelte-12t2pus"}"><div class="${"gutters svelte-12t2pus"}"><p class="${"svelte-12t2pus"}">Copyright © Randall &amp; Associates Pty Ltd, 2022. All rights reserved.</p>
    <ul class="${"svelte-12t2pus"}"><a href="${"/"}" class="${"svelte-12t2pus"}">Home</a>
      <a href="${"/contact"}" class="${"svelte-12t2pus"}">Contact us</a></ul></div>
</section>`;
});
const Scrim = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["use", "class", "fixed", "component", "tag", "getElement"]);
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let { fixed = true } = $$props;
  let element;
  let { component = SmuiElement } = $$props;
  let { tag = component === SmuiElement ? "div" : void 0 } = $$props;
  function getElement() {
    return element.getElement();
  }
  if ($$props.use === void 0 && $$bindings.use && use !== void 0)
    $$bindings.use(use);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.fixed === void 0 && $$bindings.fixed && fixed !== void 0)
    $$bindings.fixed(fixed);
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
            "mdc-drawer-scrim": true,
            "smui-drawer-scrim__absolute": !fixed
          })
        },
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
const Header_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "header.svelte-1e53vh1.svelte-1e53vh1.svelte-1e53vh1{background:#282e3c}header.svelte-1e53vh1 nav.svelte-1e53vh1.svelte-1e53vh1{display:flex;align-items:center;width:100%}header.svelte-1e53vh1 nav ul.svelte-1e53vh1.svelte-1e53vh1{position:relative;padding:0;margin:0;height:8em;width:100%;display:flex;align-items:center;list-style:none;background-size:contain}@media(max-width: 1000px){header.svelte-1e53vh1 nav ul.svelte-1e53vh1.svelte-1e53vh1{display:none}}header.svelte-1e53vh1 nav ul.svelte-1e53vh1 li.svelte-1e53vh1{position:relative;height:100%;margin-left:1em}header.svelte-1e53vh1 nav ul.svelte-1e53vh1 li[aria-current=page].svelte-1e53vh1{background-color:var(--color-theme-2)}header.svelte-1e53vh1 nav #hamburger.svelte-1e53vh1.svelte-1e53vh1{margin-left:auto}@media(min-width: 1001px){header.svelte-1e53vh1 nav #hamburger.svelte-1e53vh1.svelte-1e53vh1{display:none}}header.svelte-1e53vh1 nav a.svelte-1e53vh1.svelte-1e53vh1{display:flex;height:100%;align-items:center;padding:0 0.5rem;font-weight:700;font-size:0.8rem;text-transform:uppercase;letter-spacing:0.1em;text-decoration:none;transition:color 0.2s linear;color:white}header.svelte-1e53vh1 nav a.logo.svelte-1e53vh1.svelte-1e53vh1{width:240px;height:8em;position:relative;overflow:hidden}@media(max-width: 420px){header.svelte-1e53vh1 nav a.logo.svelte-1e53vh1.svelte-1e53vh1{width:180px;height:7em}}header.svelte-1e53vh1 nav a.svelte-1e53vh1>img.svelte-1e53vh1{position:absolute;top:46%;left:50%;transform:translate(-50%, -50%);width:auto;height:190px}@media(max-width: 420px){header.svelte-1e53vh1 nav a.svelte-1e53vh1>img.svelte-1e53vh1{height:160px}}header.svelte-1e53vh1 nav a.svelte-1e53vh1.svelte-1e53vh1:hover{color:var(--color-theme-1);color:gray}ul.mobile-nav.svelte-1e53vh1.svelte-1e53vh1.svelte-1e53vh1{display:flex;flex-direction:column;padding:3em}ul.mobile-nav.svelte-1e53vh1 li.svelte-1e53vh1.svelte-1e53vh1{list-style:none}ul.mobile-nav.svelte-1e53vh1 li.svelte-1e53vh1 h2 a.svelte-1e53vh1,ul.mobile-nav.svelte-1e53vh1 li.svelte-1e53vh1 h2 a.svelte-1e53vh1:link,ul.mobile-nav.svelte-1e53vh1 li.svelte-1e53vh1 h2 a.svelte-1e53vh1:visited{color:white;text-decoration:none}ul.mobile-nav.svelte-1e53vh1 li.svelte-1e53vh1 h2 a.svelte-1e53vh1:hover,ul.mobile-nav.svelte-1e53vh1 li.svelte-1e53vh1 h2 a.svelte-1e53vh1:link:hover,ul.mobile-nav.svelte-1e53vh1 li.svelte-1e53vh1 h2 a.svelte-1e53vh1:visited:hover{text-decoration:underline}ul.mobile-nav.svelte-1e53vh1 li[aria-current=page].svelte-1e53vh1 h2 a.svelte-1e53vh1{text-decoration:underline}",
  map: null
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let open = false;
  $$result.css.add(css$1);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(Scrim, "Scrim").$$render($$result, { fixed: false }, {}, {})}
<header class="${"svelte-1e53vh1"}"><nav class="${"gutters svelte-1e53vh1"}"><a href="${"/"}" class="${"logo svelte-1e53vh1"}"><img${add_attribute("src", logo, 0)} alt="${"logo"}" class="${"svelte-1e53vh1"}"></a>

    <ul class="${"svelte-1e53vh1"}"><li${add_attribute(
      "aria-current",
      $page.url.pathname === "/property-and-conveyancing" ? "page" : void 0,
      0
    )} class="${"svelte-1e53vh1"}"><a href="${"/property-and-conveyancing"}" class="${"svelte-1e53vh1"}">Property &amp; Conveyancing</a></li>
      <li${add_attribute(
      "aria-current",
      $page.url.pathname === "/personal-injury" ? "page" : void 0,
      0
    )} class="${"svelte-1e53vh1"}"><a href="${"/personal-injury"}" class="${"svelte-1e53vh1"}">Personal Injury</a></li>
      <li${add_attribute(
      "aria-current",
      $page.url.pathname === "/wills-and-estates" ? "page" : void 0,
      0
    )} class="${"svelte-1e53vh1"}"><a href="${"/wills-and-estates"}" class="${"svelte-1e53vh1"}">Wills &amp; Estates</a></li>
      <li${add_attribute("aria-current", $page.url.pathname === "/contact" ? "page" : void 0, 0)} class="${"svelte-1e53vh1"}"><a href="${"/contact"}" class="${"svelte-1e53vh1"}">Contact</a></li></ul>
    <div id="${"hamburger"}" class="${"svelte-1e53vh1"}">${validate_component(IconButton, "IconButton").$$render($$result, { ripple: false }, {}, {
      default: () => {
        return `${validate_component(CommonIcon, "Icon").$$render(
          $$result,
          {
            class: "material-icons",
            style: "color: white;"
          },
          {},
          {
            default: () => {
              return `${escape(open ? "close" : "menu")}`;
            }
          }
        )}`;
      }
    })}</div></nav></header>

${validate_component(Drawer, "Drawer").$$render(
      $$result,
      {
        variant: "modal",
        fixed: false,
        style: "background: #282d3c; width: 500px; max-width: calc(100vw - 80px)",
        open
      },
      {
        open: ($$value) => {
          open = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(Content, "Content").$$render(
            $$result,
            {
              style: "width: 500px; max-width: calc(100vw - 80px)"
            },
            {},
            {
              default: () => {
                return `<ul class="${"mobile-nav svelte-1e53vh1"}">
      <li${add_attribute("aria-current", $page.url.pathname === "/" ? "page" : void 0, 0)} class="${"svelte-1e53vh1"}"><h2 class="${"mdc-typography--heading2"}"><a href="${"/"}" class="${"svelte-1e53vh1"}">Home</a></h2></li>
      
      <li${add_attribute(
                  "aria-current",
                  $page.url.pathname === "/property-and-conveyancing" ? "page" : void 0,
                  0
                )} class="${"svelte-1e53vh1"}"><h2 class="${"mdc-typography--heading2"}"><a href="${"/property-and-conveyancing"}" class="${"svelte-1e53vh1"}">Property &amp; Conveyancing</a></h2></li>
      
      <li${add_attribute(
                  "aria-current",
                  $page.url.pathname === "/personal-injury" ? "page" : void 0,
                  0
                )} class="${"svelte-1e53vh1"}"><h2 class="${"mdc-typography--heading2"}"><a href="${"/personal-injury"}" class="${"svelte-1e53vh1"}">Personal Injury</a></h2></li>
      
      <li${add_attribute(
                  "aria-current",
                  $page.url.pathname === "/wills-and-estates" ? "page" : void 0,
                  0
                )} class="${"svelte-1e53vh1"}"><h2 class="${"mdc-typography--heading2"}"><a href="${"/wills-and-estates"}" class="${"svelte-1e53vh1"}">Wills &amp; Estates</a></h2></li>
      
      <li${add_attribute("aria-current", $page.url.pathname === "/contact" ? "page" : void 0, 0)} class="${"svelte-1e53vh1"}"><h2 class="${"mdc-typography--heading2"}"><a href="${"/contact"}" class="${"svelte-1e53vh1"}">Contact</a></h2></li></ul>

    <a href="${"/"}" class="${"logo"}"><img${add_attribute("src", logo, 0)} alt="${"logo"}"></a>`;
              }
            }
          )}`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_page();
  return $$rendered;
});
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: ".app.svelte-1dkad02{display:flex;flex-direction:column;min-height:100vh}main.svelte-1dkad02{flex:1;display:flex;flex-direction:column;align-items:center}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="${"app svelte-1dkad02"}">${validate_component(Header, "Header").$$render($$result, {}, {}, {})}
  <main class="${"svelte-1dkad02"}">${slots.default ? slots.default({}) : ``}</main>
  ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}
  ${validate_component(Toaster$1, "Toaster").$$render($$result, {}, {}, {})}
</div>`;
});
export {
  Layout as default
};
