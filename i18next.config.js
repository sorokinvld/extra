const path = require("path");
module.exports = {
  localePath: path.resolve("./public/locales"),
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr", "ar"],
  },
};
