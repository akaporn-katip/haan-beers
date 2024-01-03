/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
const {initializeApp} = require("firebase-admin/app");
const {onRequest} = functions.region("asia-east1").https;
const cors = require("cors")({origin: true});
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

initializeApp({
  serviceAccountId: process.env["SERVICE_ACCOUNT_ID"],
});

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.createCustomtoken = onRequest((request, response) => {
  cors(request, response, async () => {
    const headers = new Headers();
    headers.set("content-type", "application/x-www-form-urlencoded");

    logger.info(request.body.data, {structuredData: true});
    const requestToken = await fetch("https://api.line.me/oauth2/v2.1/token", {
      method: "POST",
      headers,
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: request.body.data["code"],
        redirect_uri: encodeURI(process.env["LINE_REDIRECT_URI"]),
        client_id: process.env["LINE_CLIENT_ID"],
        client_secret: process.env["LINE_CLIENT_SECRET"],
      }),
    });

    const tokenInfo = await requestToken.json();

    const verifyResponse = await fetch(
        "https://api.line.me/oauth2/v2.1/verify",
        {
          method: "POST",
          headers,
          body: new URLSearchParams({
            id_token: tokenInfo.id_token,
            client_id: process.env["LINE_CLIENT_ID"],
          }),
        });

    const userInfomation = await verifyResponse.json();

    if (verifyResponse.status !== 200) {
      return response.status(401).send();
    }

    const found = await admin
        .auth()
        .getUser(userInfomation.sub)
        .catch(() => null);

    if (!found) {
      await admin.auth().createUser({
        uid: userInfomation.sub,
        displayName: userInfomation.name,
        photoURL: userInfomation.picture,
        email: userInfomation.email,
      });
    }

    const customToken = await admin
        .auth()
        .createCustomToken(userInfomation.sub);

    return response.status(200).send({data: {customToken}});
  });
});
