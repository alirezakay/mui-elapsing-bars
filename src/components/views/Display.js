/** @jsx jsx */
/* @jsxFrag React.Fragment */

import React from 'react';
import Moment from 'react-moment';
import { animated } from 'react-spring'
import { jsx, css } from '@emotion/core';
import { Typography, LinearProgress, Grid, Hidden } from '@material-ui/core';


const renderDisplayHead = (classes,
  {
    dateTransitions,
    keyTitle,
    dateTitleVariant,
    valueTitle
  }
) => {
  return (
    <Grid container className={`${classes.head} eb-display-head`}>
      <Grid item xs={4} sm={4} md={3} lg={2} xl={2}>
        <Typography variant="subtitle1" className={`${classes.keyTitle} eb-key-title`}>{keyTitle}</Typography>
      </Grid>
      <Grid
        item
        xs={8}
        sm={6}
        md={6}
        lg={8}
        xl={8}
        className={`${classes.dateTitleAnimatedWrapper} eb-date-title-animated-wrapper`}
      >
        {
          dateTransitions.map(({ item, props, key, pure }) => (
            <animated.div
              key={key}
              style={{ ...props, position: pure?'relative':'absolute' }}
            >
              <Typography variant="h2" component="div" className={`${classes.dateTitle} eb-date-title`}>
                {
                  item &&
                  function () {
                    switch (dateTitleVariant) {
                      case 'default':
                        return <Moment format="D MMM YYYY">{item}</Moment>
                      case 'full':
                        return <Moment format="YYYY/MM/DD hh:mm:ss">{item}</Moment>
                      case 'full-date':
                        return <Moment format="YYYY/MM/DD">{item}</Moment>
                      case 'year':
                        return <Moment format="YYYY">{item}</Moment>
                      case 'month-digit':
                        return <Moment format="MM">{item}</Moment>
                      case 'month-text':
                        return <Moment format="MMMM">{item}</Moment>
                      case 'month-text-abbr':
                        return <Moment format="MMM">{item}</Moment>
                      case 'day-digit':
                        return <Moment format="DD">{item}</Moment>
                      case 'day-text':
                        return <Moment format="dddd">{item}</Moment>
                      case 'day-text-abbr':
                        return <Moment format="ddd">{item}</Moment>
                      case 'hour':
                        return <Moment format="hh">{item}</Moment>
                      case 'hour:min':
                        return <Moment format="hh:mm">{item}</Moment>
                      case 'hour:min:sec':
                        return <Moment format="hh:mm:ss">{item}</Moment>
                      case 'min':
                        return <Moment format="mm">{item}</Moment>
                      case 'min:sec':
                        return <Moment format="mm:ss">{item}</Moment>
                      case 'sec':
                        return <Moment format="ss">{item}</Moment>
                      default:
                        return <Moment>{item}</Moment>;
                    }
                  }()
                }
              </Typography>
            </animated.div>
          ))
        }
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
    Datatransitions,
    currData,
    uniqueKeys,
    keyDisplay,
    maxValue,
    valueDigitsCommaSeparation,
    barColors,
  }
) => {
  return (
    Datatransitions.map(({ item: d, props: { y, ...rest }, key, pure }, idx) => {
      let barStyle = css``;
      if (d.barColor) {
        barStyle = css`
                & > div{
                  background-color: ${d.barColor};
                }
                `;
      }
      switch (barColors) {
        case 'primary':
        case 'secondary':
          break;
        case 'random':
          if (d.barColor) break;
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
        <animated.div
          key={key}
          style={{
            zIndex: pure?1:(currData.length - idx),
            transform: pure?"":y.interpolate(y => `translate3d(0,${y}px,0)`),
            ...rest
          }}
          className={`${classes.dataAnimated} eb-display-data-animated`}
        >
          <Grid container className={`${classes.data} eb-display-data`}>
            <Grid item xs={4} sm={4} md={3} lg={2} xl={2}>
              <div className={`${classes.keyItem} eb-key-item`}>
                {
                  Object.keys(keyDisplay).map((k) => {
                    const disp = keyDisplay[k];
                    const hide = ['xs', 'sm', 'md', 'lg', 'xl'].filter((h) => h !== k);
                    return (
                      <Hidden key={k} only={hide} implementation='js'>
                        {
                          function () {
                            switch (disp) {
                              case 'both':
                                return (
                                  <>
                                    <div className={`${classes.keyItemIcon} eb-key-item-icon`}>{d.key.icon}</div>
                                    <div className={`${classes.keyItemText} eb-key-item-text`}>{d.key.text}</div>
                                  </>
                                );
                              case 'icon':
                                return (
                                  <>
                                    <div className={`${classes.keyItemIcon} eb-key-item-icon`}>{d.key.icon}</div>
                                  </>
                                );
                              case 'text':
                                return (
                                  <>
                                    <div className={`${classes.keyItemText} eb-key-item-text`}>{d.key.text}</div>
                                  </>
                                );

                              default:
                                break;
                            }
                          }()
                        }
                      </Hidden>
                    )
                  })
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
                color={/^(primary|secondary)$/.test(barColors) ? barColors : 'primary'}
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
        </animated.div>
      )
    })
  );
}


export { renderDisplayHead, renderDisplayData };
