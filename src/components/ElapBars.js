/** @jsx jsx */
/* @jsxFrag React.Fragment */

import React, { useState, useEffect, isValidElement } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, LinearProgress, Grid, Hidden } from '@material-ui/core';
import { jsx, css } from '@emotion/core';
import randomMC from 'random-material-color';

const useStyles = makeStyles({
  ElapBars: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
  },
  title: {
    textAlign: 'center',
    padding: '5px 2.5%',
    marginBottom: 25,
  },
  display: {
    boxSizing: 'border-box',
    width: '100%',
    padding: '0 5%',
  },
  head: {
    textAlign: 'center',
    marginBottom: 20,
  },
  data: {
    textAlign: 'center',
    marginBottom: 10,
  },
  keyTitle: {
    textAlign: 'left',
  },
  dateTitle: {
    color: "#6b6b6b",
    textShadow: "0 0 1px #ededed",
  },
  valueTitle: {
    textAlign: 'right',
  },
  keyItem: {
    boxSizing: 'border-box',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '0 5px',
  },
  keyItemIcon: {
    marginRight: 8,
  },
  keyItemText: {
    textAlign: 'left',
  },
  bar: {
    margin: 'auto 0',
  },
  barLine: {
    height: 11,
    borderRadius: 3,
    backgroundColor: 'transparent',
  },
  valueItem: {
    boxSizing: 'border-box',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

/** @function ElapsingBars 
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
    onEnd,
  } = props;
  const classes = useStyles();
  const [currData, setCurrData] = useState([]);
  const [currDateTitle, setCurrDateTitle] = useState("");
  const [maxValue, setMaxValue] = useState(0);
  const [uniqueKeys, setUniqueKeys] = useState({});

  useEffect(() => {
    data = (data || []).filter((d) => {
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

    const d0 = data[0];
    if (d0) {
      setCurrDateTitle(d0.date);
      setCurrData(
        data.filter((d) => {
          return (d.date.getTime() === d0.date.getTime());
        }).sort((a, b) => {
          return valueDescending ? (b.value - a.value) : (a.value - b.value);
        }).slice(0, displayBarsNumbers ? displayBarsNumbers : undefined)
      );
    }

    setMaxValue(Math.max(...(data.map((d) => d.value))));
    const uniq = new Set([]);
    data.forEach((d) => {
      uniq.add(d.key.text);
    });
    const uniqueKeys = Array.from(uniq).map((u) => {
      return ({
        text: u,
        color: randomMC.getColor({ shades: ['200', '300'], text: u }),
      })
    })
    setUniqueKeys(uniqueKeys);
  }, [data]);

  const renderTitle = (classes, title) => {
    if (title) {
      return (
        <div className={`${classes.title} eb-title`}>
          {
            (typeof title === 'string') &&
            (
              <Typography variant="h1" component="div">{title}</Typography>
            )
          }
          {
            (isValidElement(title)) &&
            (
              title
            )
          }
        </div>
      );
    }
  }

  const renderDisplayHead = (classes,
    {
      keyTitle,
      currDateTitle,
      dateTitleVariant,
      valueTitle
    }
  ) => {
    return (
      <Grid container className={`${classes.head} eb-display-head`}>
        <Grid item xs={4} sm={4} md={3} lg={2} xl={2}>
          <Typography variant="subtitle1" className={`${classes.keyTitle} eb-key-title`}>{keyTitle}</Typography>
        </Grid>
        <Grid item xs={8} sm={6} md={6} lg={8} xl={8}>
          <Typography variant="h2" component="div" className={`${classes.dateTitle} eb-date-title`}>
            {
              currDateTitle &&
              function () {
                switch (dateTitleVariant) {
                  case 'full':
                    return currDateTitle.toDateString().substr(4);
                  case 'year':
                    return currDateTitle.toDateString().substr(11);
                  default:
                    return "";
                }
              }()
            }
          </Typography>
        </Grid>
        <Hidden xsDown implementation='js'>
          <Grid item sm={2} md={3} lg={2} xl={2}>
            <Typography variant="subtitle1" className={`${classes.valueTitle} eb-value-title`}>{valueTitle}</Typography>
          </Grid>
        </Hidden>
      </Grid>
    );
  }

  const renderDisplayData = (classes,
    {
      xsDisplayOptions,
      maxValue,
      valueDigitsCommaSeparation,
      barColors,
    }
  ) => {
    return (
      currData.map((d) => {
        let barStyle = css``;
        switch (barColors) {
          case 'same-primary':
            break;
          case 'primary-override':
            if (d.barColor) {
              barStyle = css`
              & > div{
                background-color: ${d.barColor};
              }
              `;
            }
            break;
          case 'random':
            barStyle = css`
                  & > div{
                    background-color: ${uniqueKeys.filter((u) => u.text === d.key.text)[0].color};
                  }
                `;
            break;
          default:
            break;
        }
        return (
          <Grid key={`${d.key.text}-${d.value}`} container className={`${classes.data} eb-display-data`}>
            <Grid item xs={4} sm={4} md={3} lg={2} xl={2}>
              <div className={`${classes.keyItem} eb-key-item`}>
                {
                  function () {
                    switch (xsDisplayOptions.key) {
                      case 'all':
                        return (
                          <>
                            <div className={`${classes.keyItemIcon} eb-key-item-icon`}>{d.key.icon}</div>
                            <div className={`${classes.keyItemText} eb-key-item-text`}>{d.key.text}</div>
                          </>
                        );
                      case 'just-icon':
                        return (
                          <>
                            <div className={`${classes.keyItemIcon} eb-key-item-icon`}>{d.key.icon}</div>
                            <Hidden xsDown implementation='css'>
                              <div className={`${classes.keyItemText} eb-key-item-text`}>{d.key.text}</div>
                            </Hidden>
                          </>
                        );
                      case 'just-text':
                        return (
                          <>
                            <Hidden xsDown implementation='css'>
                              <div className={`${classes.keyItemIcon} eb-key-item-icon`}>{d.key.icon}</div>
                            </Hidden>
                            <div className={`${classes.keyItemText} eb-key-item-text`}>{d.key.text}</div>
                          </>
                        );

                      default:
                        break;
                    }
                  }()
                }
              </div>
            </Grid>
            <Grid item xs={8} sm={6} md={6} lg={8} xl={8} className={`${classes.bar} eb-bar`}>
              <LinearProgress
                variant="determinate"
                value={
                  maxValue === 0 ? 0 : d.value * 100 / maxValue
                }
                className={`${classes.barLine} eb-bar-line`}
                css={barStyle}
              />
            </Grid>
            <Hidden xsDown implementation='js'>
              <Grid item sm={2} md={3} lg={2} xl={2} className={`${classes.valueItem} eb-value-item`}>
                {
                  valueDigitsCommaSeparation ? String(d.value).replace(/(?<=\d)(?=(\d\d\d)+(?!\d))/g, ',') : d.value
                }
              </Grid>
            </Hidden>
          </Grid>
        )
      })
    );
  }

  return (
    <div className={`${classes.ElapBars} ${className}`} style={style}>
      {
        renderTitle(classes, title)
      }
      <div className={`${classes.display} eb-display`}>
        {
          renderDisplayHead(classes, {
            keyTitle,
            currDateTitle,
            dateTitleVariant,
            valueTitle
          })
        }
        {
          renderDisplayData(classes, {
            xsDisplayOptions,
            maxValue,
            valueDigitsCommaSeparation,
            barColors,
          })
        }
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
  displayBarsNumbers: null,
  valueDigitsCommaSeparation: true,
  dateDescending: false,
  valueDescending: true,
  xsDisplayOptions: {
    key: 'just-icon',
  },
  run: false,
  loop: false,
  delay: 500,
  interval: 1000,
  onStart: () => { },
  onPause: () => { },
  onEnd: () => { },
}

export default ElapBars;