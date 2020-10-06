export default ({
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
  dataWrapper:{
    position: 'relative',
    width: '100%',
  },
  dataAnimated: {
    top: 0,
    left: 0,
    width: '100%',
  },
  data: {
    textAlign: 'center',
    marginBottom: 10,
  },
  keyTitle: {
    textAlign: 'left',
  },
  dateTitleAnimatedWrapper: {
    display: 'flex',
    justifyContent: 'center',
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
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '0 5px',
    overflow: 'hidden',
  },
  keyItemIcon: {
    marginRight: 8,
  },
  keyItemText: {
    textAlign: 'left',
    textOverflow: 'ellipsis',
    wordBreak: 'keep-all',
    maxWidth: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  bar: {
    margin: 'auto 0',
  },
  barLine: {
    height: 13,
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