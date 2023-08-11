export const hexToRgb = (hex: string): number[] | null => {
  try {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16),
        ]
      : null;
  } catch (e) {
    return [0, 0, 0];
  }
};

export const lightOrDark = (color: string) => {
  let rgbArray: number[] | string[] | null;
  if (color.substring(0, 1) === "#") {
    rgbArray = hexToRgb(color);
  } else {
    rgbArray = color.split(",");
  }
  if (rgbArray?.length !== 3) {
    return "light";
  }

  let r = +rgbArray[0];
  let g = +rgbArray[1];
  let b = +rgbArray[2];

  // HSP equation from http://alienryderflex.com/hsp.html
  let hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  if (hsp > 127.5) {
    return "light";
  } else {
    return "dark";
  }
};
