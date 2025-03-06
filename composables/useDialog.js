const dialogRef = ref(null);

export const dialogObj = reactive({
  icon: "error",
  title: "",
  showTitleMd: true,
  content: "",
  showConfirmBtn: true,
  confirmBtnText: "確認",
  didConfirm: () => {},
  showCancelBtn: false,
  cancelBtnText: "關閉",
  didCancel: () => {},
});

export const useDialog = () => {
  onMounted(() => {
    dialogRef.value = document.querySelector("#dialog");
  });

  const open = (option) => {
    if (option) {
      Object.keys(option).forEach((key) => {
        dialogObj[key] = option[key];
      });
    }
    dialogRef.value.showModal();
  };

  const close = (type) => {
    if (dialogObj[type]) {
      const extraAction = dialogObj[type];
      extraAction();
    }
    dialogRef.value.close();
  };

  return { open, close };
};
