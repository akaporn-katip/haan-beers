/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
const {initializeApp} = require("firebase-admin/app");
const {setGlobalOptions} = require("firebase-functions/v2"); // v2
const {onRequest} = require("firebase-functions/v2/https"); // v2

initializeApp({
  serviceAccountId: process.env["SERVICE_ACCOUNT_ID"],
});

setGlobalOptions({maxInstances: 5}); // v2

const headers = new Headers();
headers.set("content-type", "application/x-www-form-urlencoded");

/**
 *
 * @param {*} response
 * @return {*} response
 */
function isOk(response) {
  if (response.status !== 200) throw Error("Response is not OK");
  return response;
}

/**
 *
 * @param {String} code The Line code
 * @return {Promise<String>} Token id token
 */
async function getToken(code) {
  return fetch("https://api.line.me/oauth2/v2.1/token", {
    method: "POST",
    headers,
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: encodeURI(process.env["LINE_REDIRECT_URI"]),
      client_id: process.env["LINE_CLIENT_ID"],
      client_secret: process.env["LINE_CLIENT_SECRET"],
    }),
  })
      .then(isOk)
      .then((response) => response.json())
      .then((json) => json.id_token)
      .catch(() => {
        throw Error("Get Request Token");
      });
}

/**
 *
 * @param {String} idToken id token from getToken
 * @return {Object} userInfomation The Line user info
 */
async function verifyToken(idToken) {
  return fetch("https://api.line.me/oauth2/v2.1/verify", {
    method: "POST",
    headers,
    body: new URLSearchParams({
      id_token: idToken,
      client_id: process.env["LINE_CLIENT_ID"],
    }),
  })
      .then(isOk)
      .then((response) => response.json())
      .catch(() => {
        throw Error("Get UserInfomation");
      });
}

/**
 *
 * @param {Object} userInfomation userInfo
 * @return {Promise<UserRecord>} user firebase user
 */
function createUser(userInfomation) {
  return admin.auth().createUser({
    uid: userInfomation.sub,
    displayName: userInfomation.name,
    photoURL: userInfomation.picture,
    email: userInfomation.email,
  });
}

/**
 *
 * @param {Object} userInfomation userInfo
 * @return {Promise<UserRecord>} user firebase user
 */
async function getOrCreateUser(userInfomation) {
  const found = await admin.auth().getUser(userInfomation.sub);
  if (found) return found;
  else return await createUser(userInfomation);
}

/**
 *
 * @param {UserRecord} userRecord userRecord
 * @return {Promise<String>} customToken
 */
async function createCustomToken(userRecord) {
  return admin.auth().createCustomToken(userRecord.uid);
}
/**
 *
 * @param {String} code
 * @return {String} customToken
 */
function createCustomTokenService(code) {
  return getToken(code)
      .then(verifyToken)
      .then(getOrCreateUser)
      .then(createCustomToken);
}

const cors = true;
// v2
exports.createCustomtoken = onRequest(
    {cors, region: ["asia-east1"]},
    (request, response) => {
      if (request.body.data === null) response.status(400);
      const code = request.body.data["code"];
      createCustomTokenService(code)
          .then((customToken) => {
            response.status(200).send({data: {customToken}});
          })
          .catch((error) => {
            logger.error(error.message, error);
            response.status(401).send({data: {message: error.message}});
          });
    },
);
