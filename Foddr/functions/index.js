const functions = require('firebase-functions');
const admin = require('firebase-admin');
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

const app = admin.initializeApp();
const firestore = app.firestore();

exports.getLikes = functions
  .region('europe-west1')
  .https.onCall(async () => {
    // const uid = data;
    if (uid) {
      response.send('Going to get all the liked recipes for the user: ');
      try {
        const data = await firestore.collection('recipes').get();
        data.forEach(item => {
          console.log(item.data());
        });
        return data;
        //   return;
      } catch (error) {
        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
      }
    }
    response.send("no user id found, strange isn't it?");

    return products.slice(startAt, endAt);
  });
