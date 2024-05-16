import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import scopify from "postcss-scopify";

export default {
  plugins: [scopify(".\\@acme\\/acme-clients"), tailwindcss, autoprefixer],
};
