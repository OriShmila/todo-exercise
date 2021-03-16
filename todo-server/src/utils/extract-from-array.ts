export const extractFromArray = (value: object) =>
  Array.isArray(value) ? value[0] : value;
