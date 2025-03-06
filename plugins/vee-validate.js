import { defineRule, configure } from "vee-validate";
import { required, email, confirmed } from "@vee-validate/rules";

import { localize, setLocale } from "@vee-validate/i18n";
import zhTW from "@vee-validate/i18n/dist/locale/zh_TW.json";

export default defineNuxtPlugin((nuxtApp) => {
  defineRule("required", required);
  defineRule("email", email);
  defineRule("confirmed", confirmed);

  configure({
    generateMessage: localize({ zh_TW: zhTW }),
    validateOnInput: true,
  });
  setLocale("zh_TW");
});
