const isUndefined = (value) => typeof value === 'undefined';
exports.isUndefined = isUndefined;

exports.isUndefined = (value) => !isUndefined(value);

const isString = (value) => typeof value === 'string';
exports.isString = isString;

exports.isStringWithValue = (value) => isString(value) && value;

const isNumber = (value) => typeof value === 'number' && !Number.isNaN(value);
exports.isNumber = isNumber;

exports.isInteger = (value) => isNumber(value) && value % 1 === 0;

exports.isBoolean = (value) => typeof value === 'boolean';

exports.isDate = (value) => value instanceof Date;

exports.isObject = (value) => value === Object(value);

exports.isArray = (value) => Array.isArray(value);

const isFunction = (value) => typeof value === 'function';
exports.isFunction = isFunction;

exports.isPromise = (value) => !!value && isFunction(value.then) && isFunction(value.catch);
