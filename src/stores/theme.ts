import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", {
  state: () => ({ theme: localStorage.getItem("bs-theme") || "dark" }),
  actions: {
    change() {
      this.theme = this.theme === "dark" ? "light" : "dark";
      localStorage.setItem("bs-theme", this.theme);
    },
  },
});
