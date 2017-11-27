var path = require('path');
var fs = require('fs');
var sharp = require('sharp');
var config = require('../config');

module.exports = {
    downloadImage: function (filename, res, size) {
        var width = 0;
        var height = 0;

        if (size > 0) {
            width = (475 / 475) * size;
            height = (475 / 475) * size;
        }

        var file = path.join(path.resolve(config.get('imagePath')), filename);
        var mimeType = 'image/png';
        var dispositionFilename = filename;

        if (!fs.existsSync(file)) {
            file = path.join(path.resolve(config.get('imagePath')), 'empty.jpg');
            mimeType = 'image/jpeg';
            dispositionFilename = 'empty.jpg';
        }

        if (size || size > 0) {
            res.set('Content-Disposition', 'inline; filename="' + dispositionFilename + '"');
            res.set('Content-Type', mimeType);
            sharp(file)
                .resize(width, height)
                .pipe(res);
        } else {
            var s = fs.createReadStream(file);
            s.on('open', function () {
                res.set('Content-Disposition', 'inline; filename="' + dispositionFilename + '"');
                res.set('Content-Type', mimeType);
                s.pipe(res);
            });
            s.on('error', function (err) {
                res.set('Content-Type', 'text/plain');
                res.status(404).send(err);
            });
        }
    }
};