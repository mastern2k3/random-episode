var sh = require('shelljs');
var fs = require('fs');

var watchRecordFile = 'watch_record.json';

var watchRecordData = {};

if (fs.existsSync(watchRecordFile))
    watchRecordData = JSON.parse(fs.readFileSync(watchRecordFile));

var allEpisodes =
    sh.find('/media/nitzan/FEF6043CF603F425/Downloads/The Office')
        .filter(function (file) { return file.match(/\.avi$/) || file.match(/\.mp4$/); });

var randomEpisodeIndex = Math.floor(Math.random() * allEpisodes.length);

var episodeFilename = allEpisodes[randomEpisodeIndex];

if (episodeFilename in watchRecordData)
    watchRecordData[episodeFilename]++;
else
    watchRecordData[episodeFilename] = 1;

fs.writeFileSync(watchRecordFile, JSON.stringify(watchRecordData));

sh.echo('running this now: xdg-open "' + episodeFilename + '" &');
sh.exec('xdg-open "' + episodeFilename + '" &', { async: true });

