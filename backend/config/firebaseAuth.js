// firebaseAdmin.js
const admin = require("firebase-admin");
const serviceAccount = require("../secret/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;