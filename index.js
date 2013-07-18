var timeMilliseconds = function(val) {
    var regex = /([0-9]+):([0-9]{2}):([0-9]{2}),([0-9]{3})/;
    var parts = regex.exec(val);

    if (parts === null) {
        return 0;
    }

    for (var i = 1; i < 5; i++) {
        parts[i] = parseInt(parts[i], 10);
        if (isNaN(parts[i])) parts[i] = 0;
    }

    // hours + minutes + seconds + ms
    return parts[1] * 3600000 + parts[2] * 6000 + parts[3] * 1000 + parts[4];
};

exports.fromSrt = function(data, ms) {
    var useMs = ms ? true : false;

    data = data.replace(/\r/g, '');
    var regex = /([0-9]+)\n([0-9]{2}:[0-9]{2}:[0-9]{2},[0-9]{3}) --> ([0-9]{2}:[0-9]{2}:[0-9]{2},[0-9]{3})/g;
    data = data.split(regex);
    data.shift();

    var items = [];
    for (var i = 0; i < data.length; i += 4) {
        items.push({
            id: data[i].trim(),
            startTime: useMs ? timeMilliseconds(data[i + 1].trim()) : data[i + 1].trim(),
            stopTime: useMs ? timeMilliseconds(data[i + 2].trim()) : data[i + 2].trim(),
            data: data[i + 3].trim()
        });
    }

    return items;
};

exports.toSrt = function(data) {
};
