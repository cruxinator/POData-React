'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var isFunction = exports.isFunction = function isFunction(value) {
    return typeof value === 'function';
};
var isEmpty = exports.isEmpty = function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
};