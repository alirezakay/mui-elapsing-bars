/**
 * @function cleanAndSortByDate
 * Convert array to an acceptable format and sort by date Asc or Desc
 * 
 * @param {Array} data data array
 * @param {Boolean} dateDescending if true => sorts descending else => sorts ascending
 */
export const cleanAndSortByDate = (data, dateDescending) => {
  return data.filter((d) => {
    return (d.value !== undefined) && (d.key.text !== undefined);
  }).map((d) => {
    return ({
      ...d,
      value: parseFloat(d.value),
      date: new Date(d.date),
    });
  }).sort((a, b) => {
    return dateDescending ? (b.date.getTime() - a.date.getTime()) : (a.date.getTime() - b.date.getTime());
  });
}

/**
 * @function sortDates
 * Sort dates array Asc or Desc
 * 
 * @param {Array} data data array
 * @param {Boolean} desc if true => sorts descending else => sorts ascending
 */
export const sortDates = (data, desc) => {
  return data.sort((a, b) => {
    return desc ? (b.getTime() - a.getTime()) : (a.getTime() - b.getTime());
  });
}

/**
 * @function cleanAndSortByValue
 * Retains the current data of array which has the same date and
 * sorts by value and returns the intended number of elements
 * 
 * @param {Array} data data array
 * @param {Object} d0 first element of data array 
 * @param {Boolean} valueDescending if true => sorts descending else => sorts ascending
 * @param {Number} retElementNums indicates how many elements should be returned
 */
export const cleanAndSortByValue = (data, d0, valueDescending, retElementNums) => {
  return data.filter((d) => {
    return (d.date.getTime() === d0.date.getTime());
  }).sort((a, b) => {
    return valueDescending ? (b.value - a.value) : (a.value - b.value);
  }).slice(0, retElementNums ? retElementNums : undefined)
}

const __getNextData = (data, date, valueDescending, retElementNums) => {
  return data.filter((d) => {
    return (d.date.getTime() === date.getTime());
  }).sort((a, b) => {
    return valueDescending ? (b.value - a.value) : (a.value - b.value);
  }).slice(0, retElementNums ? retElementNums : undefined)
}

/**
 * @function elapsingInterval
 * Main animating function
 * 
 * @param {Object} param0 {interval, run, loop}
 * @param {Object} param1 {uniqueDates, data, valueDescending, retElementNums}
 * @param {Object} param2 {setCurrData, setMaxValue}
 * @param {Object} param3 {onPause, onResume, onEnd, onStart}
 */
export const elapsingInterval = (
  { interval, run, loop, },
  { uniqueDates, data, valueDescending, displayBarsNumbers: retElementNums, },
  { setCurrData, setMaxValue },
  { onPause, onResume, onEnd, onStart, }
) => {
  let currIdx = 0;
  let paused = false;
  // const uniqueDatesTime = uniqueDates.map((d) => d.getTime());
  const intervalHandle = setInterval(() => {
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
        clearInterval(intervalHandle)
      }
      else {
        currIdx = 0;
        const currData = __getNextData(data, uniqueDates[currIdx], valueDescending, retElementNums);
        setCurrData(currData);
        setMaxValue(Math.max(...(currData.map((d) => d.value))));
      }
    }
    else {
      currIdx++;
      const currData = __getNextData(data, uniqueDates[currIdx], valueDescending, retElementNums);
      setCurrData(currData);
      setMaxValue(Math.max(...(currData.map((d) => d.value))));
    }
  }, interval);
  return intervalHandle;
}
