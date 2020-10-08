# `<ElapBars />` PROPS

<br>

## Component `props`

| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
| <span style="color: #31a148">data *</span> | `array` |  | list of **data objects** |
| className | `string` |  | **class** name of main element of component |
| style | `object` |  | **style** of main element of component |
| title | `string` \| `element` |  | **main title** - it can be a text or an arbitrary react element  |
| keyOptions | `object` |  | options for **key** part of displaying data |
| dateOptions | `object` |  | options for **date** part of displaying data |
| valueOptions | `object` |  | options for **value** part of displaying data |
| barOptions | `object` |  | options for **bar** part of displaying data |
| pure | `bool` | false | if `true` => disables react-spring animations for having better performance and less cpu usage |
| run | `bool` | false | set `true` if you want to start/resume the elapsing bars. it will pause the run if you set **run**=`false` while **run** is `true` |
| restart | `number` | null | each time you assign a number for this variable, the run process will restart itself. you can get this **restart number** as the first parameter of `onRestart` callback function |
| loop | `bool` | false | if `true` => the process will **repeat** itself after ending |
| delay | `number` | 1000 | **start delay** in *milliseconds*. if loop=`true` then each time it start repeating the process, it will perform the delay |
| interval | `number` | 700 | the **interval** time between each **date** changing in *milliseconds* |
| onStart | `function` | () => { } | **start** callback |
| onRestart | `function` | (n) => { } | **restart** callback - first parameter is the `restart` number |
| onPause | `function` | () => { } | **pause** callback |
| onResume | `function` | () => { } | **resume** callback |
| onEnd | `function` | () => { } | **end** callback  |

----

## Props of `data` objects

| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
| key * | `object` |  | **key** variable is the primary key for each row of the elapsing chart |
| key.text * | `string` |  | required **text subject** for the key |
| key.icon | `node` |  | optional react node for displaying extra graphics like **images** or **icons** |
| value * | `number` |  | **value** variable is the countable value for each row of the elapsing chart |
| date * | `string` |  | **date** string is another key that takes part in elapsing animation in each interval - `date` should have a JS `Date` format |
| barColor | `string` |  | each data object can have an **inline color** - it can overwrite the default bar color |

----

## Props of `keyOptions` objects

| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
| title | `string` |  | title of the primary keys column |
| display | `object` |  | key column displaying options  |
| display.‌xs | 'both' \| 'icon' \| 'text' | 'icon' | in **extra small** displays: if `both` => both of icons and text will be displayed, if `icon` => just the icon will be shown and if `text` => just the text will be shown |
| display.‌sm | 'both' \| 'icon' \| 'text' | 'both' | in **small** displays:  if `both` => both of icons and text will be displayed, if `icon` => just the icon will be shown and if `text` => just the text will be shown |
| display.‌md | 'both' \| 'icon' \| 'text' | 'both' | in **medium** displays:  if `both` => both of icons and text will be displayed, if `icon` => just the icon will be shown and if `text` => just the text will be shown |
| display.‌lg | 'both' \| 'icon' \| 'text' | 'both' | in **large** displays:  if `both` => both of icons and text will be displayed, if `icon` => just the icon will be shown and if `text` => just the text will be shown |
| display.‌xl | 'both' \| 'icon' \| 'text' | 'both' | in **extra large** displays:  if `both` => both of icons and text will be displayed, if `icon` => just the icon will be shown and if `text` => just the text will be shown |

----

## Props of `dateOptions` objects

| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
| titleVariant | 'default' \| 'full' \| 'full-date' \| 'year' \| 'month-digit' \| 'month-text' \| 'month-text-abbr' \| 'day-digit' \| 'day-text' \| 'day-text-abbr' \| 'hour' \| 'hour:min' \| 'hour:min:sec' \| 'min' \| 'min:sec' \| 'sec' \| `string` | 'default' | **date title** type - you can also pass a date-format string that `moment.js` supports |
| order | 'asc' \| 'desc' | 'asc' | the sorting order could be **ascending** or **descending** - the elapsing order by date |

----

## Props of `valueOptions` objects

| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
| title | `string` |  | title of the values column |
| order | 'asc' \| 'desc' | 'asc' | the sorting order could be **ascending** or **descending** - order of rows |
| digitsCommaSeparation | `bool` | true | if `true` => the values will be get 3-digits comma-separated in display |

----

## Props of `barOptions` objects

| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|
| colorVariant | 'primary' \| 'secondary' \| 'random' | 'primary' | if `random` => the color of bars will be random, if `primary` => the color of all bars will be Material-UI styled **primary** color and if `secondary` => the color of all bars will be Material-UI styled **secondary** color. in all of these cases, the `barColor` of each data object will overwrite the color (if not null) |
| n | number | `undefined` | the number of rows should be displayed - `n` must be a positive integer. if `n > data.length` => the number of displayed rows will be equal to the size of the data |
