const admin = require("firebase-admin");
const csv = require("csv-writer").createObjectCsvWriter;
const certificate = require("./certificate");

admin.initializeApp({
    credential : admin.credential.cert(certificate)
});

csvWriter = csv({
    path : "./ca.csv",
    header : [
        {id : "name", title : "Name"},
        {id : "email", title : "email"},
        {id : "college", title : "College"},
        {id : "sem", title : "Semester"},
        {id : "phone", title : "Phone no."},
        {id : "exp", title : "Exp"},
        {id : "why", title : "Why should I be selected?"},
    ]
});

const db = admin.firestore();

var records = []; // hold all documents

db.collection("ca").get().then(function(snap) {
    snap.forEach(function(doc) {
        if (doc.exists) records.push(doc.data());
        else console.log("No document found");
    });
    csvWriter.writeRecords(records).then(function() {
        console.log("Done...");
    });
}).catch(function(err) {
    console.log(err);
});