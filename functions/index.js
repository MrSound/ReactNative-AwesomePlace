const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const fs = require("fs");
const UUID = require("uuid-v4");

const gcconfig = {// gear in firebase
    projectId: "awesome-place-1516267937295",
    keyFilename: "awesome-places.json"
};
const gcs = require("@google-cloud/storage")(gcconfig);

exports.storeImage = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const body = JSON.parse(request.body);
        fs.writeFileSync("/tmp/uploaded-image.jpg", body.image, "base64", err => {
            console.log(err);
            return response.status(500).json({ error: err });
        });
        const bucket = gcs.bucket("awesome-place-1516267937295.appspot.com"); // ชื่อของ Storage ใน Firebase
        const uuid = UUID();
        bucket.upload("/tmp/uploaded-image.jpg", {
            uploadType: "media",
            destination: "/places/" + uuid + ".jpg",
            metadata: {
                metadata: {
                    contentType: "image/jpeg",
                    firebaseStorageDownloadTokens: uuid // สำหรับการ Download Link สำหรับ firebase
                }
            }
        }, (err, file) => {
            if (!err) {
                response.status(201).json({
                    imageUrl: "https://firebasestorage.googleapis.com/v0/b/" +
                        bucket.name +
                        "/o/" +
                        encodeURIComponent(file.name) +
                        "?alt=media&token=" +
                        uuid
                });
            } else {
                console.log(err);
                response.status(500).json({ error: err });
            }
        });
    });
});
