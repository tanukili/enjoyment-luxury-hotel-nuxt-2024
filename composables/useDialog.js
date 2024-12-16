const dialogRef = ref(null);

// reactive(物件)
export const dialogData = reactive({
  icon: "",
  title: "",
  content: "",
  confirm: {
    btnName: "確認",
    onComplete: () => {},
  },
  cancel: {
    btnName: "關閉",
    onComplete: () => {},
    needShow: false,
  },
});

export const useDialog = () => {
  onMounted(() => {
    dialogRef.value = document.querySelector("#dialog");
  });

  const open = (option) => {
    if (option) {
      dialogData.icon = option.icon || "loading";
      dialogData.title = option.title || "預設 title";
      dialogData.content = option.content || "";
    }
    if (option.cancel) {
      Object.keys(option.cancel).forEach((key) => {
        dialogData.cancel[key] = option.cancel[key];
      });
    }
    if (option.confirm) {
      Object.keys(option.confirm).forEach((key) => {
        dialogData.confirm[key] = option.confirm[key];
      });
    }
    dialogRef.value.showModal();
  };

  const close = (type) => {
    if (dialogData[type].onComplete) {
      dialogData[type].onComplete();
    }
    dialogRef.value.close();
  };

  return { open, close };
};
