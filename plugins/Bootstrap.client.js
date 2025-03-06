import * as bootstrap from "bootstrap";
const { Modal, Collapse, Dropdown } = bootstrap;

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      bootstrap: {
        Modal: (element) => new Modal(element),
        Collapse: (element) =>
          new Collapse(element, {
            toggle: false, // 禜用自動開關
          }),
      },
    },
  };
});
