import React from 'react';
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
  keyTitle: "Country",
  valueTitle: "Deaths",
  dateDescending: false,
  displayBarsNumbers: undefined,
  interval: 300,
  delay: 500,
  run: true,
  onStart: () => {console.log("START")},
  onPause: () => {console.log("PAUSE")},
  onResume: () => {console.log("RESUME")},
  onEnd: () => {console.log("END")},
};

function Covid19({ classes }) {
  return (
    <div>
      <ElapBars
        {...setting}
      />
    </div>
  );
}

export default Covid19;