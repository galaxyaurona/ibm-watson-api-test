var express = require('express');
var router = express.Router();
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var tone_analyzer = new ToneAnalyzerV3({
    username: '9b865ad7-1061-4a82-9a50-2ca775357dd0',
    password: 'fuxIBv1Lb44i',
    version_date: '2016-05-19'
});


/* GET home page. */
router.post('/tone-analyzer', function (req, res, next) {
    msg = req.body.msg;
    console.log("Tone analyzer", msg)
    if (msg) {
        tone_analyzer.tone({ text: msg },
            function (err, tone) {
                if (err) {
                    //console.log(err);
                    res.json({ success: false, err: err })
                }

                else {
                    res.json({ success: true, tone: tone ,text:msg})
                    //console.log(JSON.stringify(tone, null, 2));
                }
            });
    } else {

        res.json({ success: false, err: "msg is emtpty" })

    }

});
router.get('/tone-analyzer', function (req, res, next) {
    msg = req.body.msg || req.query.msg;
    console.log("Tone analyzer", msg)
    if (msg) {
        tone_analyzer.tone({ text: msg },
            function (err, tone) {
                if (err) {
                    //console.log(err);
                    res.json({ success: false, err: err })
                }

                else {
                    res.json({ success: true, tone: tone })
                    //console.log(JSON.stringify(tone, null, 2));
                }
            });
    } else {

        res.json({ success: false, err: "msg is emtpty" })

    }

});

module.exports = router;
