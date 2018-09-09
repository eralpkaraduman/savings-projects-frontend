import moment from 'moment';

const unknownValue = 'Unknown';
const emptyValue = '';
const truncateMaxChars = 30;
const dateFormat = 'DD.MM.YYYY';
const addDecimalSeperators = /(\d)(?=(\d{3})+(?!\d))/g

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
  value = renderNumber(value);
  value = value.toFixed(2);
  return value.toString().replace(addDecimalSeperators, '$1,');
}

export function renderDate(value) {
  return moment(value).format(dateFormat);
}

export function renderNumber(value) {
  if (isNaN(value)) {
    return undefined;
  }
  return Number(value);
}