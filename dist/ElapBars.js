'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _randomMaterialColor = require('random-material-color');

var _randomMaterialColor2 = _interopRequireDefault(_randomMaterialColor);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _styles = require('@material-ui/core/styles');

var _reactSpring = require('react-spring');

var _Display = require('./views/Display');

var _Title = require('./views/Title');

var _styles2 = require('./styles');

var _styles3 = _interopRequireDefault(_styles2);

var _functions = require('./functions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var useStyles = (0, _styles.makeStyles)(_styles3.default);

var defaultProps = {
  className: '',
  style: {},
  title: null,
  keyOptions: {
    title: "",
    display: {
      xs: 'icon',
      sm: 'both',
      md: 'both',
      lg: 'both',
      xl: 'both'
    }
  },
  dateOptions: {
    titleVariant: 'default',
    order: 'asc'
  },
  valueOptions: {
    title: '',
    order: 'desc',
    digitsCommaSeparation: true
  },
  barOptions: {
    colorVariant: 'primary',
    n: undefined
  },
  pure: false,
  run: false,
  restart: null,
  loop: false,
  delay: 500,
  interval: 1000,
  onStart: function onStart() {},
  onRestart: function onRestart() {},
  onPause: function onPause() {},
  onResume: function onResume() {},
  onEnd: function onEnd() {}
};

/** 
 * @function ElapsingBars 
 * 
*/
function ElapBars(props) {
  var data = props.data;

  var keyOptions = _lodash2.default.merge(defaultProps.keyOptions, props.keyOptions);
  var dateOptions = _lodash2.default.merge(defaultProps.dateOptions, props.dateOptions);
  var valueOptions = _lodash2.default.merge(defaultProps.valueOptions, props.valueOptions);
  var barOptions = _lodash2.default.merge(defaultProps.barOptions, props.barOptions);
  var className = props.className,
      style = props.style,
      title = props.title,
      pure = props.pure,
      run = props.run,
      restart = props.restart,
      loop = props.loop,
      delay = props.delay,
      interval = props.interval,
      onStart = props.onStart,
      onRestart = props.onRestart,
      onPause = props.onPause,
      onResume = props.onResume,
      onEnd = props.onEnd;

  var classes = useStyles();

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      currData = _useState2[0],
      setCurrData = _useState2[1];

  var _useState3 = (0, _react.useState)(0),
      _useState4 = _slicedToArray(_useState3, 2),
      maxValue = _useState4[0],
      setMaxValue = _useState4[1];

  var _useState5 = (0, _react.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      uniqueKeys = _useState6[0],
      setUniqueKeys = _useState6[1];

  var _useState7 = (0, _react.useState)([]),
      _useState8 = _slicedToArray(_useState7, 2),
      uniqueDates = _useState8[0],
      setUniqueDates = _useState8[1];

  var _useState9 = (0, _react.useState)(null),
      _useState10 = _slicedToArray(_useState9, 2),
      intervalHandle = _useState10[0],
      setIntervalHandle = _useState10[1];

  var dateTransitions = (0, _reactSpring.useTransition)(currData[0] ? currData[0].date : "", function (date) {
    return date ? date.getTime() : "";
  }, interval < 1000 ? {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { tension: 500, friction: 5, duration: 0, mass: 1 }
  } : {
    from: { transform: 'scale(0.5)', opacity: 0 },
    enter: { transform: 'scale(1) ', opacity: 1 },
    leave: { transform: 'scale(0.5)', opacity: 0 },
    config: { tension: 400, friction: 5, duration: 100, mass: 1 }
  });
  var rowHeight = 30;
  var Datatransitions = (0, _reactSpring.useTransition)(currData.map(function (d, i) {
    return _extends({}, d, { height: rowHeight, y: i * rowHeight });
  }), function (d) {
    return '' + d.key.text;
  }, {
    from: { position: 'absolute', height: rowHeight, opacity: 0 },
    leave: { height: 0, opacity: 0 },
    enter: function enter(_ref) {
      var y = _ref.y,
          height = _ref.height;
      return { y: y, height: height, opacity: 1 };
    },
    update: function update(_ref2) {
      var y = _ref2.y,
          height = _ref2.height;
      return { y: y, height: height };
    },
    config: { tension: 200, friction: 25, duration: 200, mass: 1 }
  });
  if (pure) {
    dateTransitions = (currData[0] ? [currData[0].date] : []).map(function (d) {
      return {
        item: d,
        key: d.getTime(),
        props: {},
        pure: pure
      };
    });
    Datatransitions = currData.map(function (d) {
      return {
        item: d,
        key: d.key.text,
        props: {},
        pure: pure
      };
    });
  }

  (0, _react.useEffect)(function () {
    if (!data) return;
    if (restart) {
      onRestart(restart);
    }

    // clean and sort data by date
    data = (0, _functions.cleanAndSortByDate)(data || [], dateOptions.order);

    // get the first data for creating the current data i.e. data #1 (or d0)
    var d0 = data[0];
    if (d0) {
      var _currData = (0, _functions.cleanAndSortByValue)(data, d0, valueOptions.order, barOptions.n);
      setCurrData(_currData);
    }

    // find maximum value to be able to manage the bar width
    setMaxValue(Math.max.apply(Math, _toConsumableArray(currData.map(function (d) {
      return d.value;
    }))));

    // find unique keys and unique dates for the animation part and future uses
    var uKeys = new Set([]);
    var uDates = new Set([]);
    data.forEach(function (d) {
      uKeys.add(d.key.text);
      uDates.add(JSON.stringify(d.date));
    });

    // set the unique keys
    var __uniqueKeys = Array.from(uKeys).map(function (u) {
      return {
        text: u,
        color: _randomMaterialColor2.default.getColor({ shades: ['200', '300'], text: u })
      };
    });
    setUniqueKeys(__uniqueKeys);

    // set the sorted unique dates
    var __uniqueDates = Array.from(uDates).map(function (u) {
      return new Date(JSON.parse(u));
    });
    setUniqueDates((0, _functions.sortDates)(__uniqueDates, dateOptions.order));

    // create the delay
    setTimeout(function () {
      // run the animation
      if (intervalHandle) {
        clearInterval(intervalHandle);
      }
      var __intervalHandle = (0, _functions.elapsingInterval)({ interval: interval, run: run, loop: loop }, {
        uniqueDates: uniqueDates[0] ? uniqueDates : __uniqueDates,
        data: data,
        valueDescending: valueOptions.order === 'desc',
        displayBarsNumbers: barOptions.n
      }, { setCurrData: setCurrData, setMaxValue: setMaxValue }, { onPause: onPause, onResume: onResume, onEnd: onEnd, onStart: onStart });
      setIntervalHandle(__intervalHandle);
    }, delay);
  }, [data, restart]);

  return _react2.default.createElement(
    'div',
    { id: 'ElapBars', className: classes.ElapBars + ' ' + className, style: style },
    (0, _Title.renderTitle)(classes, title),
    _react2.default.createElement(
      'div',
      { className: classes.display + ' eb-display' },
      (0, _Display.renderDisplayHead)(classes, {
        dateTransitions: dateTransitions,
        keyTitle: keyOptions.title,
        dateTitleVariant: dateOptions.titleVariant,
        valueTitle: valueOptions.title
      }),
      _react2.default.createElement(
        'div',
        {
          className: classes.dataWrapper + ' eb-display-data-wrapper',
          style: {
            minHeight: rowHeight * currData.length
          }
        },
        (0, _Display.renderDisplayData)(classes, {
          Datatransitions: Datatransitions,
          currData: currData,
          uniqueKeys: uniqueKeys,
          keyDisplay: keyOptions.display,
          maxValue: maxValue,
          valueDigitsCommaSeparation: valueOptions.digitsCommaSeparation,
          barColors: barOptions.colorVariant
        })
      )
    )
  );
}

ElapBars.propTypes = {
  data: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    key: _propTypes2.default.shape({
      text: _propTypes2.default.string.isRequired,
      icon: _propTypes2.default.node
    }).isRequired,
    value: _propTypes2.default.number.isRequired,
    date: _propTypes2.default.string.isRequired,
    barColor: _propTypes2.default.string
  })).isRequired,
  className: _propTypes2.default.string,
  style: _propTypes2.default.shape({}),
  title: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
  keyOptions: _propTypes2.default.shape({
    title: _propTypes2.default.string,
    display: _propTypes2.default.shape({
      xs: _propTypes2.default.oneOf(['both', 'icon', 'text']),
      sm: _propTypes2.default.oneOf(['both', 'icon', 'text']),
      md: _propTypes2.default.oneOf(['both', 'icon', 'text']),
      lg: _propTypes2.default.oneOf(['both', 'icon', 'text']),
      xl: _propTypes2.default.oneOf(['both', 'icon', 'text'])
    })
  }),
  dateOptions: _propTypes2.default.shape({
    titleVariant: _propTypes2.default.oneOfType([_propTypes2.default.oneOf(['default', 'full', 'full-date', 'year', 'month-digit', 'month-text', 'month-text-abbr', 'day-digit', 'day-text', 'day-text-abbr', 'hour', 'hour:min', 'hour:min:sec', 'min', 'min:sec', 'sec']), _propTypes2.default.string]),
    order: _propTypes2.default.oneOf(['asc', 'desc'])
  }),
  valueOptions: _propTypes2.default.shape({
    title: _propTypes2.default.string,
    order: _propTypes2.default.oneOf(['asc', 'desc']),
    digitsCommaSeparation: _propTypes2.default.bool
  }),
  barOptions: _propTypes2.default.shape({
    colorVariant: _propTypes2.default.oneOf(['primary', 'secondary', 'random']),
    n: _propTypes2.default.number
  }),
  pure: _propTypes2.default.bool,
  run: _propTypes2.default.bool,
  restart: _propTypes2.default.number,
  loop: _propTypes2.default.bool,
  delay: _propTypes2.default.number, // in milliseconds
  interval: _propTypes2.default.number, // in milliseconds
  onStart: _propTypes2.default.func,
  onRestart: _propTypes2.default.func,
  onPause: _propTypes2.default.func,
  onResume: _propTypes2.default.func,
  onEnd: _propTypes2.default.func
};

ElapBars.defaultProps = defaultProps;

exports.default = ElapBars;