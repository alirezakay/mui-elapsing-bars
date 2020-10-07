import React, {useEffect, useState} from 'react';
import { ElapBars } from '../../components';
import rawData from './owid-covid-data-truncated.json';

const data = [];
Object.keys(rawData).forEach((k) => {
  const v = rawData[k];
  const ds = v.data;
  ds.forEach((d) => {
    data.push({
      key: {
        text: v.location,
        icon: (
          <img
            src={`https://flagcdn.com/w40/${k}.png`}
            width="24"
            height="16"
            alt=""
          />
        ),
      },
      value: d.total_deaths,
      date: d.date,
      barColor: "",
    })
  })
});

const setting = {
  data,
  title: "COVID19 Total Deaths By Day",
  keyOptions: {
    title: 'Country',
    display: {
      xs: 'icon',
      sm: 'text',
    },
  },
  dateOptions: {
    titleVariant: 'default',
    order: 'asc',
  },
  valueOptions: {
    title: 'Deaths',
    digitsCommaSeparation: false,
    order: 'desc',
  },
  barOptions: {
    colorVariant: 'random',
    n: undefined, // you could use a number to limit the displaying bars
  },
  interval: 2000,
  delay: 500,
  pure: false,
  run: true,
  loop: false,
  onStart: () => { console.log("START") },
  onRestart: (n) => { console.log("RESTART #" + n) },
  onPause: () => { console.log("PAUSE") },
  onResume: () => { console.log("RESUME") },
  onEnd: () => { console.log("END") },
};

function Covid19({}) {
  // you could replace restart props of ElapBars with this state variable
  // to see the changes and onRestart event  
  const [restart, setRestart] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setRestart(1)
    }, 5000);
  }, [])

  return (
    <div>
      <ElapBars
        restart={0}
        {...setting}
      />
    </div>
  );
}

export default Covid19;