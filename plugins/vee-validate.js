import { defineRule, configure } from "vee-validate";
import { required, email, confirmed } from "@vee-validate/rules";

import { localize, setLocale } from "@vee-validate/i18n";
import zhTW from "@vee-validate/i18n/dist/locale/zh_TW.json";

export default defineNuxtPlugin((nuxtApp) => {
  defineRule("required", required);
  defineRule("email", email);
  defineRule("confirmed", confirmed);
  // 自訂密碼規則：至少 8 碼以上，並英數混合
  defineRule("password", (value) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(value) || "密碼 需至少 8 碼以上，並英數混合";
  });
  defineRule("phone", (value) => {
    const regex = /^09\d{8}$/;
    return regex.test(value) || "手機號碼 需為 10 位的數字，並且是 09 開頭";
  });

  configure({
    generateMessage: localize({ zh_TW: zhTW }),
    validateOnInput: true,
  });
  setLocale("zh_TW");
});
