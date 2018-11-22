const pad = (num, size) => {
  let s = String(num);
  while (s.length < (size || 2)) s = '0' + s;
  return s;
};

const capitalizeAllWords = str =>
  str
    .split(' ')
    .map(w => `${w[0].toUpperCase()}${w.slice(1)}`)
    .join(' ');

const camalCase = str =>
  str
    .split(' ')
    .map(
      (w, i) =>
        `${i === 0 ? w[0].toLowerCase() : w[0].toUpperCase()}${w.slice(1)}`
    )
    .join('');

module.exports = { pad, capitalizeAllWords, camalCase };
