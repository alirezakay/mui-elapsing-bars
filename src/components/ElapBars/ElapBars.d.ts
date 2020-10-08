import * as React from "react";

declare const ElapBars: React.FC<{
  data: {
    key: {
      text: string;
      icon?: Node;
    };
    value: number;
    date: string;
    barColor?: string;
  }[];
  className?: string;
  style?: React.CSSProperties;
  title?: string | Element;
  keyOptions?: {
    title?: string;
    display?: {
      xs?: "both" | "icon" | "text";
      sm?: "both" | "icon" | "text";
      md?: "both" | "icon" | "text";
      lg?: "both" | "icon" | "text";
      xl?: "both" | "icon" | "text";
    };
  };
  dateOptions?: {
    titleVariant?:
      | "default"
      | "full"
      | "full-date"
      | "year"
      | "month-digit"
      | "month-text"
      | "month-text-abbr"
      | "day-digit"
      | "day-text"
      | "day-text-abbr"
      | "hour"
      | "hour:min"
      | "hour:min:sec"
      | "min"
      | "min:sec"
      | "sec";
    order?: "asc" | "desc";
  };
  valueOptions?: {
    title?: string;
    order?: "asc" | "desc";
    digitsCommaSeparation: boolean;
  };
  barOptions?: {
    colorVariant?: "primary" | "secondary" | "random";
    n?: undefined | number;
  };
  pure: boolean;
  run: boolean;
  restart: number;
  loop: boolean;
  delay: number;
  interval: number;
  onStart: () => void;
  onRestart: (n: number) => void;
  onPause: () => void;
  onResume: () => void;
  onEnd: () => void;
}>;

export { ElapBars };
