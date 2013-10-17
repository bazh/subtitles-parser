subtitles-parser
===============
Simple module written in javascript, which provides SubRip subtitles parsing methods


### Installation:

NodeJS:

    npm install subtitle-parser

or [download](https://github.com/bazh/subtitle-parser/raw/master/index.js) minified version of subtitle-parser to use module in a browser


### Example

Let's say we have my.srt SubRip subtitles file:

    1
    00:00:02,000 --> 00:00:06,000
    Subtitle 1.1
    Subtitle 1.2

    2
    00:00:28,967 --> 01:30:30,958
    Subtitle 2.1
    Subtitle 2.2


1. Load file into data variable

```js   
var fs = require('fs');
var srt = fs.readFileSync('my.srt');

var data = parser.fromSrt(srt);
```

data object will look like:

    [{
        id: '1',
        startTime: '00:00:02,000',
        endTime: '00:00:06,000',
        text: 'Subtitle 1.1\nSubtitle 1.2' 
    },
    {
        id: '2',
        startTime: '00:00:28,967',
        endTime: '01:30:30,958',
        text: 'Subtitle 2.1\nSubtitle 2.2'
    }]

if you will pass `true` flag to `fromSrt` function:

```js
var dataMs = parser.fromSrt(srt, true);
```

then it will convert startTime and endTime properties into millisecods:

    [{
        id: '1',
        startTime: 2000,
        endTime: 6000,
        text: 'Subtitle 1.1\nSubtitle 1.2' 
    },
    {
        id: '2',
        startTime: 28967,
        endTime: 5430958,
        text: 'Subtitle 2.1\nSubtitle 2.2'
    }]


`parser.toSrt()` will convert object back to SubRip subtitles format.
