import { ResolverFunction } from "vite";

export const getRandomInt = (max: number) => Math.floor(Math.random() * max);

export const diff = (a: number, b: number) => (Math.abs(a - b) / a) * 100;

export const diff_percent = (a: number, b: number) =>
  (Math.abs(a - b) / a) * 100;

export const randString = (length: number = 8) =>
  Array(length)
    .fill("")
    .map(() =>
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".charAt(
        Math.random() * 62
      )
    )
    .join("");

export const sleep = (ms: number) => {
  return new Promise((resolve: ResolverFunction) => setTimeout(resolve, ms));
};

export const switchString = (str: string) => {
  const ru = "йцукенгшщзхъфывапролджэячсмитьбю.";
  const en = "qwertyuiop[]asdfghjkl;'zxcvbnm,./";
  let rs = str
    .split("")
    .map((s) => ru.charAt(en.indexOf(s)))
    .join("");
  if (!rs) {
    rs = str
      .split("")
      .map((s) => en.charAt(ru.indexOf(s)))
      .join("");
  }
  return rs || str;
};

const highlight = (val: string, search = "") => {
  if (typeof val === "undefined" || !search) {
    return val;
  }
  let replacedString = val;
  if (search.length)
    replacedString = val.replace(
      new RegExp(search, "gi"),
      (match) => `<mark>${match}</mark>`
    );

  return replacedString;
};

export const openInNewTab = (url: string) => {
  const a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("target", "_blank");
  a.click();
};
