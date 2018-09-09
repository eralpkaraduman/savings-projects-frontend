
const unknownValue = 'Unknown';

function isString(value) {
  return typeof value === 'string' || value instanceof String;
}

export function renderCurrency(currencyString) {
  if (!currencyString) {
    return unknownValue;
  }
  if (!isString(currencyString)) {
    return unknownValue;
  }
  if (currencyString.toUpperCase() === 'NULL') {
    return unknownValue;
  }
  return currencyString;
}