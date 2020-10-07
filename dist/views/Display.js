'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderDisplayData = exports.renderDisplayHead = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /** @jsx jsx */
/* @jsxFrag React.Fragment */

var _templateObject = _taggedTemplateLiteral([''], ['']),
    _templateObject2 = _taggedTemplateLiteral(['\n                & > div{\n                  background-color: ', ';\n                }\n                '], ['\n                & > div{\n                  background-color: ', ';\n                }\n                ']),
    _templateObject3 = _taggedTemplateLiteral(['\n                        & > div{\n                          background-color: ', ';\n                        }\n                      '], ['\n                        & > div{\n                          background-color: ', ';\n                        }\n                      ']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMoment = require('react-moment');

var _reactMoment2 = _interopRequireDefault(_reactMoment);

var _reactSpring = require('react-spring');

var _core = require('@emotion/core');

var _core2 = require('@material-ui/core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var renderDisplayHead = function renderDisplayHead(classes, _ref) {
  var dateTransitions = _ref.dateTransitions,
      keyTitle = _ref.keyTitle,
      dateTitleVariant = _ref.dateTitleVariant,
      valueTitle = _ref.valueTitle;

  return (0, _core.jsx)(
    _core2.Grid,
    { container: true, className: classes.head + ' eb-display-head' },
    (0, _core.jsx)(
      _core2.Grid,
      { item: true, xs: 4, sm: 4, md: 3, lg: 2, xl: 2 },
      (0, _core.jsx)(
        _core2.Typography,
        { variant: 'subtitle1', className: classes.keyTitle + ' eb-key-title' },
        keyTitle
      )
    ),
    (0, _core.jsx)(
      _core2.Grid,
      {
        item: true,
        xs: 8,
        sm: 6,
        md: 6,
        lg: 8,
        xl: 8,
        className: classes.dateTitleAnimatedWrapper + ' eb-date-title-animated-wrapper'
      },
      dateTransitions.map(function (_ref2) {
        var item = _ref2.item,
            props = _ref2.props,
            key = _ref2.key,
            pure = _ref2.pure;
        return (0, _core.jsx)(
          _reactSpring.animated.div,
          {
            key: key,
            style: _extends({}, props, { position: pure ? 'relative' : 'absolute' })
          },
          (0, _core.jsx)(
            _core2.Typography,
            { variant: 'h2', component: 'div', className: classes.dateTitle + ' eb-date-title' },
            item && function () {
              switch (dateTitleVariant) {
                case 'default':
                  return (0, _core.jsx)(
                    _reactMoment2.default,
                    { format: 'D MMM YYYY' },
                    item
                  );
                case 'full':
                  return (0, _core.jsx)(
                    _reactMoment2.default,
                    { format: 'YYYY/MM/DD hh:mm:ss' },
                    item
                  );
                case 'full-date':
                  return (0, _core.jsx)(
                    _reactMoment2.default,
                    { format: 'YYYY/MM/DD' },
                    item
                  );
                case 'year':
                  return (0, _core.jsx)(
                    _reactMoment2.default,
                    { format: 'YYYY' },
                    item
                  );
                case 'month-digit':
                  return (0, _core.jsx)(
                    _reactMoment2.default,
                    { format: 'MM' },
                    item
                  );
                case 'month-text':
                  return (0, _core.jsx)(
                    _reactMoment2.default,
                    { format: 'MMMM' },
                    item
                  );
                case 'month-text-abbr':
                  return (0, _core.jsx)(
                    _reactMoment2.default,
                    { format: 'MMM' },
                    item
                  );
                case 'day-digit':
                  return (0, _core.jsx)(
                    _reactMoment2.default,
                    { format: 'DD' },
                    item
                  );
                case 'day-text':
                  return (0, _core.jsx)(
                    _reactMoment2.default,
                    { format: 'dddd' },
                    item
                  );
                case 'day-text-abbr':
                  return (0, _core.jsx)(
                    _reactMoment2.default,
                    { format: 'ddd' },
                    item
                  );
                case 'hour':
                  return (0, _core.jsx)(
                    _reactMoment2.default,
                    { format: 'hh' },
                    item
                  );
                case 'hour:min':
                  return (0, _core.jsx)(
                    _reactMoment2.default,
                    { format: 'hh:mm' },
                    item
                  );
                case 'hour:min:sec':
                  return (0, _core.jsx)(
                    _reactMoment2.default,
                    { format: 'hh:mm:ss' },
                    item
                  );
                case 'min':
                  return (0, _core.jsx)(
                    _reactMoment2.default,
                    { format: 'mm' },
                    item
                  );
                case 'min:sec':
                  return (0, _core.jsx)(
                    _reactMoment2.default,
                    { format: 'mm:ss' },
                    item
                  );
                case 'sec':
                  return (0, _core.jsx)(
                    _reactMoment2.default,
                    { format: 'ss' },
                    item
                  );
                default:
                  return (0, _core.jsx)(
                    _reactMoment2.default,
                    null,
                    item
                  );
              }
            }()
          )
        );
      })
    ),
    (0, _core.jsx)(
      _core2.Hidden,
      { xsDown: true, implementation: 'js' },
      (0, _core.jsx)(
        _core2.Grid,
        { item: true, sm: 2, md: 3, lg: 2, xl: 2 },
        (0, _core.jsx)(
          _core2.Typography,
          { variant: 'subtitle1', className: classes.valueTitle + ' eb-value-title' },
          valueTitle
        )
      )
    )
  );
};

var renderDisplayData = function renderDisplayData(classes, _ref3) {
  var Datatransitions = _ref3.Datatransitions,
      currData = _ref3.currData,
      uniqueKeys = _ref3.uniqueKeys,
      keyDisplay = _ref3.keyDisplay,
      maxValue = _ref3.maxValue,
      valueDigitsCommaSeparation = _ref3.valueDigitsCommaSeparation,
      barColors = _ref3.barColors;

  return Datatransitions.map(function (_ref4, idx) {
    var d = _ref4.item,
        _ref4$props = _ref4.props,
        y = _ref4$props.y,
        rest = _objectWithoutProperties(_ref4$props, ['y']),
        key = _ref4.key,
        pure = _ref4.pure;

    var barStyle = (0, _core.css)(_templateObject);
    if (d.barColor) {
      barStyle = (0, _core.css)(_templateObject2, d.barColor);
    }
    switch (barColors) {
      case 'primary':
      case 'secondary':
        break;
      case 'random':
        if (d.barColor) break;
        barStyle = (0, _core.css)(_templateObject3, uniqueKeys.filter(function (u) {
          return u.text === d.key.text;
        })[0].color);
        break;
      default:
        break;
    }
    return (0, _core.jsx)(
      _reactSpring.animated.div,
      {
        key: key,
        style: _extends({
          zIndex: pure ? 1 : currData.length - idx,
          transform: pure ? "" : y.interpolate(function (y) {
            return 'translate3d(0,' + y + 'px,0)';
          })
        }, rest),
        className: classes.dataAnimated + ' eb-display-data-animated'
      },
      (0, _core.jsx)(
        _core2.Grid,
        { container: true, className: classes.data + ' eb-display-data' },
        (0, _core.jsx)(
          _core2.Grid,
          { item: true, xs: 4, sm: 4, md: 3, lg: 2, xl: 2 },
          (0, _core.jsx)(
            'div',
            { className: classes.keyItem + ' eb-key-item' },
            Object.keys(keyDisplay).map(function (k) {
              var disp = keyDisplay[k];
              var hide = ['xs', 'sm', 'md', 'lg', 'xl'].filter(function (h) {
                return h !== k;
              });
              return (0, _core.jsx)(
                _core2.Hidden,
                { key: k, only: hide, implementation: 'js' },
                function () {
                  switch (disp) {
                    case 'both':
                      return (0, _core.jsx)(
                        _react2.default.Fragment,
                        null,
                        (0, _core.jsx)(
                          'div',
                          { className: classes.keyItemIcon + ' eb-key-item-icon' },
                          d.key.icon
                        ),
                        (0, _core.jsx)(
                          'div',
                          { className: classes.keyItemText + ' eb-key-item-text' },
                          d.key.text
                        )
                      );
                    case 'icon':
                      return (0, _core.jsx)(
                        _react2.default.Fragment,
                        null,
                        (0, _core.jsx)(
                          'div',
                          { className: classes.keyItemIcon + ' eb-key-item-icon' },
                          d.key.icon
                        )
                      );
                    case 'text':
                      return (0, _core.jsx)(
                        _react2.default.Fragment,
                        null,
                        (0, _core.jsx)(
                          'div',
                          { className: classes.keyItemText + ' eb-key-item-text' },
                          d.key.text
                        )
                      );

                    default:
                      break;
                  }
                }()
              );
            })
          )
        ),
        (0, _core.jsx)(
          _core2.Grid,
          { item: true, xs: 8, sm: 6, md: 6, lg: 8, xl: 8, className: classes.bar + ' eb-bar' },
          (0, _core.jsx)(_core2.LinearProgress, {
            variant: 'determinate',
            value: maxValue === 0 ? 0 : d.value * 100 / maxValue,
            className: classes.barLine + ' eb-bar-line',
            color: /^(primary|secondary)$/.test(barColors) ? barColors : 'primary',
            css: barStyle
          })
        ),
        (0, _core.jsx)(
          _core2.Hidden,
          { xsDown: true, implementation: 'js' },
          (0, _core.jsx)(
            _core2.Grid,
            { item: true, sm: 2, md: 3, lg: 2, xl: 2, className: classes.valueItem + ' eb-value-item' },
            valueDigitsCommaSeparation ? String(d.value).replace(/(?<=\d)(?=(\d\d\d)+(?!\d))/g, ',') : d.value
          )
        )
      )
    );
  });
};

exports.renderDisplayHead = renderDisplayHead;
exports.renderDisplayData = renderDisplayData;