'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderTitle = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _core = require('@material-ui/core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renderTitle = function renderTitle(classes, title) {
  if (title) {
    return _react2.default.createElement(
      'div',
      { className: classes.title + ' eb-title' },
      typeof title === 'string' && _react2.default.createElement(
        _core.Typography,
        { variant: 'h1', component: 'div' },
        title
      ),
      (0, _react.isValidElement)(title) && title
    );
  }
};

exports.renderTitle = renderTitle;