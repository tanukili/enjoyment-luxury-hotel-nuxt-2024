export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("priceformat", {
    mounted(el, binging) {
      // \B 匹配非單詞邊界；(?=) 正像查詢；(\d{3}+) 3 個連續數字並匹配多次；(?!\d) 負向查詢，沒有數字
      const priceWithThousands = el.textContent.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ","
      );
      const currency = binging.arg === "full" ? "ＮＴ" : "NT";
      el.textContent = `${currency}$ ${priceWithThousands}`;
    },
  });
});
