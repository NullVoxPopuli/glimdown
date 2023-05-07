"use strict";

module.exports = {
  printWidth: 100,
  overrides: [
    {
      files: ["*.js", "*.ts"],
      options: {
        singleQuote: true,
        trailingComma: "es5",
      },
    },
    {
      files: ["*.json"],
      options: {
        singleQuote: false,
      },
    },
  ],
};
