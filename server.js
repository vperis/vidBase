var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

// canned HTML generation for page with selected videotag
require('./htmlcans.js')();

var VIDEO_COLLECTION = "fbvideos";

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
    if (err) {
        console.log(err);
        console.log("Database connection failed ", process.env.MONGODB_URI);
        process.exit(1);
    }

    // Save database object from the callback for reuse.
    db = database;
    console.log("Database connection ready");

    // Initialize the app.
    var server = app.listen(process.env.PORT || 8080, function () {
        var port = server.address().port;
        console.log("App now running on port", port);
    });
});

// fbvideos API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

/*  "/api/fbvideos"
 *    GET: finds all fbvideos
 *    POST: creates a new fbvideo
 */

app.get("/api/fbvideos", function(req, res) {
    db.collection(VIDEO_COLLECTION).find({}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get videos.");
        } else {
            res.status(200).json(docs);
        }
    });
});

app.post("/api/fbvideos", function(req, res) {
    var newVideo = req.body;

    if (!req.body.vidname) {
        handleError(res, "Invalid user input", "Must provide a string.", 400);
        // TODO: need to do something more here, else this can cause a rather nasty problem
        return;
    }

    db.collection(VIDEO_COLLECTION).insertOne(newVideo, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to create new video.");
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });
});

/*  "/api/fbvideos/:id"
 *    GET: find fbvideos by id
 *    PUT: update fbvideos by id
 *    DELETE: deletes fbvideo by id
 */

app.get("/api/fbvideos/:id", function(req, res) {
    db.collection(VIDEO_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to get video");
        } else {
            res.status(200).json(doc);
        }
    });
});

app.put("/api/fbvideos/:id", function(req, res) {
    var updateDoc = req.body;
    delete updateDoc._id;

    db.collection(VIDEO_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to update video");
        } else {
            updateDoc._id = req.params.id;
            res.status(200).json(updateDoc);
        }
    });
});

app.delete("/api/fbvideos/:id", function(req, res) {
    db.collection(VIDEO_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
        if (err) {
            handleError(res, err.message, "Failed to delete video");
        } else {
            res.status(200).json(req.params.id);
        }
    });
});

/*  "/api/:tag"
 *    GET: find fbvideos by tag
 */

app.get("/tag/:tag", function(req, res) {
    db.collection(VIDEO_COLLECTION).findOne( {videotag : req.params.tag}, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to get video with tag " + req.params.tag);
        } else { 
            if (doc != null) {
                res.status(200).send(titURL(doc.vidname, doc.embedurl));
                // see htmlcans for definition of titURL
            } else {
                res.status(500)
                    .send(videoNotFound(req.params.tag));  
            }
        }
    });
});

