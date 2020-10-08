import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import randomMC from 'random-material-color';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { useTransition } from 'react-spring'
import { renderDisplayData, renderDisplayHead } from './views/Display';
import { renderTitle } from './views/Title';
import styles from './styles';

import { cleanAndSortByDate, cleanAndSortByValue, sortDates, elapsingInterval } from './functions';

const useStyles = makeStyles(styles);

const defaultProps = {
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
      xl: 'both',
    },
  },
  dateOptions: {
    titleVariant: 'default',
    order: 'asc',
  },
  valueOptions: {
    title: '',
    order: 'desc',
    digitsCommaSeparation: true,
  },
  barOptions: {
    colorVariant: 'primary',
    n: undefined,
  },
  pure: false,
  run: false,
  restart: null,
  loop: false,
  delay: 1000,
  interval: 700,
  onStart: () => { },
  onRestart: () => { },
  onPause: () => { },
  onResume: () => { },
  onEnd: () => { },
};

/** 
 * @function ElapsingBars 
 * 
*/
function ElapBars(props) {
  let { data } = props;
  const keyOptions = _.merge(defaultProps.keyOptions, props.keyOptions);
  const dateOptions = _.merge(defaultProps.dateOptions, props.dateOptions);
  const valueOptions = _.merge(defaultProps.valueOptions, props.valueOptions);
  const barOptions = _.merge(defaultProps.barOptions, props.barOptions);
  const {
    className,
    style,
    title,
    pure,
    run,
    restart,
    loop,
    delay,
    interval,
    onStart,
    onRestart,
    onPause,
    onResume,
    onEnd,
  } = props;
  const classes = useStyles();
  const [currData, setCurrData] = useState([]);
  const [maxValue, setMaxValue] = useState(0);
  const [uniqueKeys, setUniqueKeys] = useState([]);
  const [uniqueDates, setUniqueDates] = useState([]);
  const [intervalHandle, setIntervalHandle] = useState(null);
  let dateTransitions = useTransition(currData[0] ? currData[0].date : "",
    date => date ? date.getTime() : "",
    interval < 700 ? {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
      config: { tension: 500, friction: 5, duration: 0, mass: 1 },
    } : {
        from: { transform: 'scale(0.25)', opacity: 0 },
        enter: { transform: 'scale(1) ', opacity: 1 },
        leave: { transform: 'scale(0.25)', opacity: 0 },
        config: { tension: 400, friction: 5, duration: 100, mass: 1 },
      });
  const rowHeight = 30;
  let Datatransitions = useTransition(
    currData.map((d, i) => ({ ...d, height: rowHeight, y: i * rowHeight })),
    d => `${d.key.text}`,
    {
      from: { position: 'absolute', height: rowHeight, opacity: 0 },
      leave: { height: 0, opacity: 0 },
      enter: ({ y, height }) => ({ y, height, opacity: 1 }),
      update: ({ y, height }) => ({ y, height }),
      config: { tension: 200, friction: 25, duration: 200, mass: 1 },
    }
  );
  if (pure) {
    dateTransitions = (currData[0] ? [currData[0].date] : []).map((d) => ({
      item: d,
      key: d.getTime(),
      props: {},
      pure
    }));
    Datatransitions = currData.map((d) => ({
      item: d,
      key: d.key.text,
      props: {},
      pure
    }));
  }

  useEffect(() => {
    if (!data) return;
    if (restart) {
      onRestart(restart);
    }

    // clean and sort data by date
    data = cleanAndSortByDate(data || [], dateOptions.order);

    // get the first data for creating the current data i.e. data #1 (or d0)
    const d0 = data[0];
    if (d0) {
      const currData = cleanAndSortByValue(data, d0, valueOptions.order, barOptions.n);
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
    const __uniqueKeys = Array.from(uKeys).map((u) => {
      return ({
        text: u,
        color: randomMC.getColor({ shades: ['200', '300'], text: u }),
      })
    });
    setUniqueKeys(__uniqueKeys);

    // set the sorted unique dates
    const __uniqueDates = Array.from(uDates).map((u) => {
      return new Date(JSON.parse(u));
    });
    setUniqueDates(sortDates(__uniqueDates, dateOptions.order));

    // create the delay
    setTimeout(() => {
      // run the animation
      if (intervalHandle) {
        clearInterval(intervalHandle);
      }
      const __intervalHandle = elapsingInterval(
        { interval, run, loop },
        {
          uniqueDates: uniqueDates[0] ? uniqueDates : __uniqueDates,
          data,
          valueDescending: valueOptions.order === 'desc',
          displayBarsNumbers: barOptions.n
        },
        { setCurrData, setMaxValue },
        { onPause, onResume, onEnd, onStart }
      );
      setIntervalHandle(__intervalHandle);
    }, delay);

  }, [data, restart]);

  return (
    <div id="ElapBars" className={`${classes.ElapBars} ${className}`} style={style}>
      {
        renderTitle(classes, title)
      }
      <div className={`${classes.display} eb-display`}>
        {
          renderDisplayHead(classes, {
            dateTransitions,
            keyTitle: keyOptions.title,
            dateTitleVariant: dateOptions.titleVariant,
            valueTitle: valueOptions.title,
          })
        }
        <div
          className={`${classes.dataWrapper} eb-display-data-wrapper`}
          style={{
            minHeight: rowHeight * currData.length,
          }}
        >
          {
            renderDisplayData(classes, {
              Datatransitions,
              currData,
              uniqueKeys,
              keyDisplay: keyOptions.display,
              maxValue,
              valueDigitsCommaSeparation: valueOptions.digitsCommaSeparation,
              barColors: barOptions.colorVariant,
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
      value: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      barColor: PropTypes.string,
    }),
  ).isRequired,
  className: PropTypes.string,
  style: PropTypes.shape({}),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  keyOptions: PropTypes.shape({
    title: PropTypes.string,
    display: PropTypes.shape({
      xs: PropTypes.oneOf(['both', 'icon', 'text']),
      sm: PropTypes.oneOf(['both', 'icon', 'text']),
      md: PropTypes.oneOf(['both', 'icon', 'text']),
      lg: PropTypes.oneOf(['both', 'icon', 'text']),
      xl: PropTypes.oneOf(['both', 'icon', 'text']),
    })
  }),
  dateOptions: PropTypes.shape({
    titleVariant: PropTypes.oneOfType([
      PropTypes.oneOf(
        [
          'default',
          'full',
          'full-date',
          'year',
          'month-digit', 'month-text', 'month-text-abbr',
          'day-digit', 'day-text', 'day-text-abbr',
          'hour', 'hour:min', 'hour:min:sec',
          'min', 'min:sec',
          'sec',
        ]
      ),
      PropTypes.string,
    ]),
    order: PropTypes.oneOf(['asc', 'desc']),
  }),
  valueOptions: PropTypes.shape({
    title: PropTypes.string,
    order: PropTypes.oneOf(['asc', 'desc']),
    digitsCommaSeparation: PropTypes.bool,
  }),
  barOptions: PropTypes.shape({
    colorVariant: PropTypes.oneOf(
      ['primary', 'secondary', 'random']
    ),
    n: PropTypes.number,
  }),
  pure: PropTypes.bool,
  run: PropTypes.bool,
  restart: PropTypes.number,
  loop: PropTypes.bool,
  delay: PropTypes.number, // in milliseconds
  interval: PropTypes.number, // in milliseconds
  onStart: PropTypes.func,
  onRestart: PropTypes.func,
  onPause: PropTypes.func,
  onResume: PropTypes.func,
  onEnd: PropTypes.func,
}

ElapBars.defaultProps = defaultProps;

export default ElapBars;