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

const byNumberValue = (prop, projects, descending) => (a, b) => {
  a = parseInt(a[prop], 10);
  b = parseInt(b[prop], 10);
  if (descending) {
    return b - a;
  }
  else {
    return a - b;
  }
};

export function sortProjectsBy(prop, projects, descending) {
  if (prop === 'project') {
    return projects.sort(byNumberValue(prop, projects, descending));
  }
  return projects;
}