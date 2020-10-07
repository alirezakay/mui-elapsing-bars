'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @function cleanAndSortByDate
 * Convert array to an acceptable format and sort by date Asc or Desc
 * 
 * @param {Array} data data array
 * @param {String} order asc | desc
 */
var cleanAndSortByDate = exports.cleanAndSortByDate = function cleanAndSortByDate(data, order) {
  return data.filter(function (d) {
    return d.value !== undefined && d.key.text !== undefined;
  }).map(function (d) {
    return _extends({}, d, {
      value: parseFloat(d.value),
      date: new Date(d.date)
    });
  }).sort(function (a, b) {
    return order === 'desc' ? b.date.getTime() - a.date.getTime() : a.date.getTime() - b.date.getTime();
  });
};

/**
 * @function sortDates
 * Sort dates array Asc or Desc
 * 
 * @param {Array} data data array
 * @param {String} order asc | desc
 */
var sortDates = exports.sortDates = function sortDates(data, order) {
  return data.sort(function (a, b) {
    return order === 'desc' ? b.getTime() - a.getTime() : a.getTime() - b.getTime();
  });
};

/**
 * @function cleanAndSortByValue
 * Retains the current data of array which has the same date and
 * sorts by value and returns the intended number of elements
 * 
 * @param {Array} data data array
 * @param {Object} d0 first element of data array 
 * @param {String} order asc | desc
 * @param {Number} retElementNums indicates how many elements should be returned
 */
var cleanAndSortByValue = exports.cleanAndSortByValue = function cleanAndSortByValue(data, d0, order, n) {
  return data.filter(function (d) {
    return d.date.getTime() === d0.date.getTime();
  }).sort(function (a, b) {
    return order === 'desc' ? b.value - a.value : a.value - b.value;
  }).slice(0, n ? n : undefined);
};

/**
 * 
 * @param {Array} data 
 * @param {Date} date 
 * @param {Boolean} desc 
 * @param {number} n 
 */
var __getNextData = function __getNextData(data, date, desc, n) {
  return data.filter(function (d) {
    return d.date.getTime() === date.getTime();
  }).sort(function (a, b) {
    return desc ? b.value - a.value : a.value - b.value;
  }).slice(0, n ? n : undefined);
};

/**
 * @function elapsingInterval
 * Main animating function
 * 
 * @param {Object} param0 {interval, run, loop}
 * @param {Object} param1 {uniqueDates, data, valueDescending, retElementNums}
 * @param {Object} param2 {setCurrData, setMaxValue}
 * @param {Object} param3 {onPause, onResume, onEnd, onStart}
 */
var elapsingInterval = exports.elapsingInterval = function elapsingInterval(_ref, _ref2, _ref3, _ref4) {
  var interval = _ref.interval,
      run = _ref.run,
      loop = _ref.loop;
  var uniqueDates = _ref2.uniqueDates,
      data = _ref2.data,
      valueDescending = _ref2.valueDescending,
      retElementNums = _ref2.displayBarsNumbers;
  var setCurrData = _ref3.setCurrData,
      setMaxValue = _ref3.setMaxValue;
  var onPause = _ref4.onPause,
      onResume = _ref4.onResume,
      onEnd = _ref4.onEnd,
      onStart = _ref4.onStart;

  var currIdx = 0;
  var paused = false;
  // const uniqueDatesTime = uniqueDates.map((d) => d.getTime());
  var intervalHandle = setInterval(function () {
    if (!run) {
      if (!paused) {
        onPause();
        paused = true;
      }
      return;
    }
    if (paused) {
      onResume();
      paused = false;
    }
    if (currIdx === 0) {
      onStart();
    }
    if (currIdx === uniqueDates.length - 1) {
      onEnd();
      if (!loop) {
        clearInterval(intervalHandle);
      } else {
        currIdx = 0;
        var currData = __getNextData(data, uniqueDates[currIdx], valueDescending, retElementNums);
        setCurrData(currData);
        setMaxValue(Math.max.apply(Math, _toConsumableArray(currData.map(function (d) {
          return d.value;
        }))));
      }
    } else {
      currIdx++;
      var _currData = __getNextData(data, uniqueDates[currIdx], valueDescending, retElementNums);
      setCurrData(_currData);
      setMaxValue(Math.max.apply(Math, _toConsumableArray(_currData.map(function (d) {
        return d.value;
      }))));
    }
  }, interval);
  return intervalHandle;
};