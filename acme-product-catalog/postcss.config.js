import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import prefixer from "postcss-prefix-selector";

export default {
  plugins: [
    tailwindcss,
    prefixer({
      prefix: ".\\@acme\\/acme-product-catalog",
      transform: (prefix, selector, prefixedSelector, file) => {
        return file.endsWith("module.css")
          ? `:global(${prefix}) ${selector}`
          : prefixedSelector;
      },
    }),
    autoprefixer,
  ],
};
