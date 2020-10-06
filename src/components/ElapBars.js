import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import randomMC from 'random-material-color';
import { makeStyles } from '@material-ui/core/styles';
import { useTransition } from 'react-spring'
import { renderDisplayData, renderDisplayHead } from './views/Display';
import { renderTitle } from './views/Title';
import styles from './styles';

import { cleanAndSortByDate, cleanAndSortByValue, sortDates, elapsingInterval } from './functions';

const useStyles = makeStyles(styles);

/** 
 * @function ElapsingBars 
 * 
*/
function ElapBars(props) {
  let { data } = props;
  const {
    className,
    style,
    barColors,
    displayBarsNumbers,
    valueDigitsCommaSeparation,
    dateDescending,
    valueDescending,
    xsDisplayOptions,
    title,
    keyTitle,
    dateTitleVariant,
    valueTitle,
    run,
    loop,
    delay,
    interval,
    onStart,
    onPause,
    onResume,
    onEnd,
  } = props;
  const classes = useStyles();
  const [currData, setCurrData] = useState([]);
  const [maxValue, setMaxValue] = useState(0);
  const [uniqueKeys, setUniqueKeys] = useState([]);
  const [uniqueDates, setUniqueDates] = useState([]);
  const [intervalHandle, setIntervalHandle] = useState([]);
  const dateTransitions = useTransition(currData[0] ? currData[0].date : "", date => date ? date.getTime() : "",
    interval < 1000 ? {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
      config: { tension: 500, friction: 5, duration: 0, mass: 1 },
    } : {
        from: { transform: 'scale(0.5)', opacity: 0 },
        enter: { transform: 'scale(1) ', opacity: 1 },
        leave: { transform: 'scale(0.5)', opacity: 0 },
        config: { tension: 400, friction: 5, duration: 100, mass: 1 },
      });

  const height = 30;
  const Datatransitions = useTransition(
    currData.map((d, i) => ({ ...d, height, y: i * height })),
    d => `${d.key.text}`,
    {
      from: { position: 'absolute', height: height, opacity: 0 },
      leave: { height: 0, opacity: 0 },
      enter: ({ y, height }) => ({ y, height, opacity: 1 }),
      update: ({ y, height }) => ({ y, height }),
      config: { tension: 200, friction: 25, duration: 200, mass: 1 },
    }
  );

  useEffect(() => {
    // clean and sort data by date
    data = cleanAndSortByDate(data || [], dateDescending);
    // get the first data for creating the current data i.e. data #1 (or d0)
    const d0 = data[0];
    if (d0) {
      const currData = cleanAndSortByValue(data, d0, valueDescending, displayBarsNumbers);
      setCurrData(currData);
    }
    // find maximum value to be able to manage the bar width
    setMaxValue(Math.max(...(currData.map((d) => d.value))));
    // find unique keys and unique dates for the animation part and future uses
    const uKeys = new Set([]);
    const uDates = new Set([]);
    data.forEach((d) => {
      uKeys.add(d.key.text);
      uDates.add(JSON.stringify(d.date));
    });
    // set the unique keys
    const uniqueKeys = Array.from(uKeys).map((u) => {
      return ({
        text: u,
        color: randomMC.getColor({ shades: ['200', '300'], text: u }),
      })
    });
    setUniqueKeys(uniqueKeys);
    // set the sorted unique dates
    const uniqueDates = Array.from(uDates).map((u) => {
      return new Date(JSON.parse(u));
    });
    setUniqueDates(sortDates(uniqueDates, dateDescending));

    setTimeout(() => {
      // run the animation
      const intervalHandle = elapsingInterval(
        { interval, run, loop },
        { uniqueDates, data, valueDescending, displayBarsNumbers },
        { setCurrData, setMaxValue },
        { onPause, onResume, onEnd, onStart }
      );
      setIntervalHandle(intervalHandle);
    }, delay);
  }, []);

  return (
    <div className={`${classes.ElapBars} ${className}`} style={style}>
      {
        renderTitle(classes, title)
      }
      <div className={`${classes.display} eb-display`}>
        {
          renderDisplayHead(classes, {
            dateTransitions,
            keyTitle,
            dateTitleVariant,
            valueTitle
          })
        }
        <div className={`${classes.dataWrapper} eb-display-data-wrapper`}>
          {
            renderDisplayData(classes, {
              Datatransitions,
              currData,
              uniqueKeys,
              xsDisplayOptions,
              maxValue,
              valueDigitsCommaSeparation,
              barColors,
            })
          }
        </div>
      </div>
    </div>
  )
}

ElapBars.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.shape({
        text: PropTypes.string.isRequired,
        icon: PropTypes.node,
      }).isRequired,
      keyIcon: PropTypes.node,
      value: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      barColor: PropTypes.string,
    }),
  ).isRequired,
  className: PropTypes.string,
  style: PropTypes.shape({}),
  barColors: PropTypes.oneOf(['same-primary', 'primary-override', 'random']),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  keyTitle: PropTypes.string,
  dateTitleVariant: PropTypes.oneOf(['full', 'year']),
  valueTitle: PropTypes.string,
  displayBarsNumbers: PropTypes.number,
  valueDigitsCommaSeparation: PropTypes.bool,
  dateDescending: PropTypes.bool,
  valueDescending: PropTypes.bool,
  xsDisplayOptions: PropTypes.shape({
    key: PropTypes.oneOf(['all', 'just-icon', 'just-text']),
  }),
  run: PropTypes.bool,
  loop: PropTypes.bool,
  delay: PropTypes.number, // in milliseconds
  interval: PropTypes.number, // in milliseconds
  onStart: PropTypes.func,
  onPause: PropTypes.func,
  onResume: PropTypes.func,
  onEnd: PropTypes.func,
}

ElapBars.defaultProps = {
  className: '',
  style: {},
  barColors: 'same-primary',
  title: null,
  keyTitle: null,
  dateTitleVariant: 'full',
  valueTitle: null,
  displayBarsNumbers: undefined,
  valueDigitsCommaSeparation: true,
  dateDescending: false,
  valueDescending: true,
  xsDisplayOptions: {
    key: 'just-text',
  },
  run: false,
  loop: false,
  delay: 500,
  interval: 1000,
  onStart: () => { },
  onPause: () => { },
  onResume: () => { },
  onEnd: () => { },
}

export default ElapBars;