var parser = require('../');
var fs = require('fs');

var srt = fs.readFileSync('./test/test.srt', { encoding: 'utf-8' });
var srt2 = fs.readFileSync('./test/test2.srt', { encoding: 'utf-8' });

describe('subtitles-parser', function() {

    describe('testing SubRip part', function() {
        var data;

        it('parser.fromSrt() should execute without crashes', function() {
             data = parser.fromSrt(srt);
        });

        it('parser.fromSrt() should return array', function() {
            data.should.be.an.instanceOf(Array);
        });

        it('parser.fromSrt() should contain valid subtitle objects', function() {
            for (var i in data) {
                var s = data[i];

                s.should.have.property('id');
                s.should.have.property('startTime');
                s.should.have.property('endTime');
                s.should.have.property('text');
            }
        });

        var originalData;
        it('parser.toSrt() should execute without crashes', function() {
             originalData = parser.toSrt(data);
        });

        it('parser.toSrt() should convert object back as it was before without changes', function() {
            (srt.trim() === originalData.trim()).should.be.ok;
        });

        var dataMs;
        it('parser.fromSrt() should successfully convert time to ms', function() {
            dataMs = parser.fromSrt(srt, true);
        });

        var originalDataMs;
        it('parser.toSrt() should execute without crashes when using ms', function() {
             originalDataMs = parser.toSrt(data);
        });

        it('parser.fromSrt() should convert object with ms back as it was before without changes', function() {
            (srt.trim() === originalDataMs.trim()).should.be.ok;
        });

        var data2 = parser.fromSrt(srt2, true);
        it('parser.fromSrt() should handle dots as ms separators', function() {
            data2.length.should.equal(2);
            data2[0].startTime.should.equal(1000);
            data2[0].endTime.should.equal(2000);
            data2[1].startTime.should.equal(3456);
            data2[1].endTime.should.equal(4567);
        });

        it('parser.toSrt() should save as comma', function() {
            (srt2.replace(/\./g, ',').trim() === parser.toSrt(data2)).should.be.ok;
        });
    });
});