const SORTED_PARAM = {
  ASC: 'asc',
  DESC: 'desc'
};

const DIACRITIC_SYMBOLS = {
  1025: 1045,
  1105: 1077
};

const CYRILLIC_SYMBOL_CODES = {
  MIN: 1025,
  MAX: 1105
};

/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = SORTED_PARAM.ASC) {
  const sortedArr = arr.filter(isNotEmptyString).sort((a, b) => {
    const idx = 0;

    const charA = a[idx];
    const charB = b[idx];

    const isSameSymbols = charA !== charB && charA.toLowerCase() === charB.toLowerCase();

    const [charCodeA, charCodeB] = [charA, charB].map(char => {
      const code = isSameSymbols
        ? convertDiacriticSymbolCode(char.charCodeAt(idx))
        : convertDiacriticSymbolCode(char.toLowerCase().charCodeAt(idx));

      return code < CYRILLIC_SYMBOL_CODES.MIN
        ? code + CYRILLIC_SYMBOL_CODES.MAX
        : code;
    });

    return charCodeA >= charCodeB ? 1 : -1;
  });

  return param === SORTED_PARAM.ASC ? sortedArr : sortedArr.reverse();
}

/**
 * isNotEmptyString - check string to be not empty
 * @param {string} [str=""] str - incoming testing string
 * @returns {boolean}
 */
function isNotEmptyString(str = '') {
  return typeof str === 'string' && str.length;
}

/**
 * convertDiacriticSymbolCode - if diacritic symbol return original symbol code
 * @param {number} [charCode] charCode - incoming testing char code
 * @returns {number}
 */
function convertDiacriticSymbolCode(charCode) {
  return DIACRITIC_SYMBOLS.hasOwnProperty(charCode) ? DIACRITIC_SYMBOLS[charCode] : charCode;
}
