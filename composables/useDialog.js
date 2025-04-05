const dialogRef = ref(null);
const initializedDialogObj = {
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
};

export const dialogObj = reactive({ ...initializedDialogObj });

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
    Object.assign(dialogObj, initializedDialogObj); // 回歸預設
  };

  return { open, close };
};
