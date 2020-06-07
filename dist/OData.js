'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.QueryBuilder = exports.useOData = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactFetchComponent = require('react-fetch-component');

var _odataQueryBuilder = require('odata-query-builder');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function buildUrl(baseUrl, query) {
    return query !== false && baseUrl + ((0, _utils.isEmpty)(query) ? '' : query.toQuery());
}

function useOData(_ref) {
    var baseUrl = _ref.baseUrl,
        defaultQuery = _ref.defaultQuery,
        query = _ref.query,
        props = _objectWithoutProperties(_ref, ['baseUrl', 'defaultQuery', 'query']);

    var _useState = (0, _react.useState)({
        query: defaultQuery
    }),
        _useState2 = _slicedToArray(_useState, 2),
        state = _useState2[0],
        setState = _useState2[1];

    state.setQuery = function (updater, cb) {
        return setState(function (prevState) {
            return {
                query: _extends({}, prevState.query, (0, _utils.isFunction)(updater) ? updater(prevState.query) : updater)
            };
        }, cb);
    };

    var fetchState = (0, _reactFetchComponent.useFetch)(_extends({
        url: query !== false && buildUrl(baseUrl, _extends({}, query, state.query)),
        fetchFunction: function fetchFunction(url, options, updateOptions) {
            url = typeof url === 'string' ? url : buildUrl(baseUrl, url);
            options = {
                headers: {
                    Accept: 'application/json'
                }
            };
            return fetch(url, options, updateOptions);
        }
    }, props));

    return _extends({}, fetchState, state);
}

var POData = function POData(_ref2) {
    var children = _ref2.children,
        props = _objectWithoutProperties(_ref2, ['children']);

    var state = useOData(props);
    return _react2.default.createElement(
        _reactFetchComponent.FetchContext.Provider,
        { value: state },
        (0, _utils.isFunction)(children) ? _react2.default.createElement(
            _reactFetchComponent.FetchContext.Consumer,
            null,
            children
        ) : children
    );
};
POData.Consumer = _reactFetchComponent.FetchContext.Consumer;

exports.useOData = useOData;
exports.QueryBuilder = _odataQueryBuilder.QueryBuilder;
exports.default = POData;