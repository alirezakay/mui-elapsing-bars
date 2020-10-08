import React, { useEffect, useState } from 'react';
import { ElapBars } from '../../components'; // importing from unbuilt component 
import rawData from './wpby-truncated.json';

const listOfCountries = [
  'Afghanistan', 'Iran (Islamic Republic of)', 'United States of America',
  'Finland', 'Denmark', 'Sweden', 'United Kingdom', 'Ireland', 'Canada',
  'Netherlands', 'Greece', 'Germany', 'Austria', 'Brazil', 'Argentina',
  'South Africa', 'Cameroon', 'Russian Federation', 'Romania',
  'Spain', 'France', 'Saudi Arabia', 'Australia',
]

const data = rawData.filter((d) => listOfCountries.includes(d['Location'])).map((d) => ({
  key: {
    text: d['Location'],
  },
  value: parseInt(d['PopTotal'], 10),
  date: String(d['Time']),
}));

const setting = {
  data,
  title: "World Population By Year",
  keyOptions: {
    title: 'Country',
    display: {
      xs: 'icon',
      sm: 'text',
    },
  },
  dateOptions: {
    titleVariant: 'year',
    order: 'asc',
  },
  valueOptions: {
    title: 'Population',
    digitsCommaSeparation: true,
    order: 'desc',
  },
  barOptions: {
    colorVariant: 'primary',
    n: 15,
  },
  interval: 700,
  delay: 1000,
  pure: false,
  run: true,
  loop: true,
  onStart: () => { console.log("START") },
  onRestart: (n) => { console.log("RESTART #" + n) },
  onPause: () => { console.log("PAUSE") },
  onResume: () => { console.log("RESUME") },
  onEnd: () => { console.log("END") },
};

function Population({ }) {
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

export default Population;