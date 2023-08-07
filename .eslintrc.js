// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  extends: ["mykit"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
  env: {
    node: true,
  },
};
