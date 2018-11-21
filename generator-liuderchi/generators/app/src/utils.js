const pad = (num, size) => {
  let s = String(num);
  while (s.length < (size || 2)) s = '0' + s;
  return s;
};

module.exports = { pad };
