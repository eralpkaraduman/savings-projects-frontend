import moment from 'moment';
import numeral from 'numeral';

const emptyValue = '';
const truncateMaxChars = 30;
const dateFormat = 'DD.MM.YYYY';
const currencyFormat = '0,0.00';

function isString(value) {
  return typeof value === 'string' || value instanceof String;
}

export function renderText(value) {
  if (!value) {
    return emptyValue;
  }
  if (!isString(value)) {
    return emptyValue;
  }
  if (value.toUpperCase() === 'NULL') {
    return emptyValue;
  }

  if (value.length > truncateMaxChars) {
    return `${value.trim().slice(0, truncateMaxChars)}...`;
  }

  return value;
}

export function renderCurrency(value) {
  value = parseFloat(value);
  if (isNaN(value)) {
    return emptyValue;
  }
  return numeral(value).format(currencyFormat);
}

export function renderDate(value) {
  return moment(value).format(dateFormat);
}

export function renderNumber(value) {
  if (isNaN(parseInt(value, 10))) {
    return undefined;
  }
  return numeral(value).format('0');
}

export const numberValueComparator = (prop, descending) => (a, b) => {
  const x = descending ? b : a;
  const y = descending ? a : b;
  return parseInt(x[prop], 10) - parseInt(y[prop], 10);
};

export const dateValueComparator = (prop, descending) => (a, b) => {
  const x = descending ? b : a;
  const y = descending ? a : b;
  return moment(x[prop]).diff(moment(y[prop]));
};

export function sortListByComparators(comperators = [], list) {
  return list.sort((a, b) => {
    let result = 0;
    comperators.forEach(c => result = result || c(a, b));
    return result;
  });
}
