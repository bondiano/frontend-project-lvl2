/* eslint-disable import/prefer-default-export */

export const sortByKeys = (ast) => [...ast].sort(({ key: keyA }, { key: keyB }) => {
  if (keyA === keyB) {
    return 0;
  }

  if (keyA < keyB) {
    return -1;
  }

  return 1;
});
