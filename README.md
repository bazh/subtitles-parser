subtitles-parser
===============
Simple module written in javascript, which provides SubRip subtitles parsing methods


### Installation:

NodeJS:

    npm install subtitles-parser

or [download](https://raw.github.com/bazh/subtitles-parser/master/subtitles.parser.min.js) minified version of subtitle-parser to use module in a browser


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
var parser = require('subtitles-parser');

var srt = fs.readFileSync('my.srt','utf8');

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

It's possible to pass options as second parameter:

```js
var options = {
    ms: true/false,
    getHearingImpaerSubtitles: true/false
}
var dataMs = parser.fromSrt(srt, options);
```

ms will return the milliseconds and getHearingImpaerSubtitles to true will get all subtitles. If it's not defined it will not pass the hearing impaer subtitles.

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
