import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBWIs4Lehe5FzvBjoR6-NG1FxSR2YnEZ08",
    authDomain: "test-note-app.firebaseapp.com",
    databaseURL: "https://test-note-app.firebaseio.com",
    projectId: "test-note-app",
    storageBucket: "test-note-app.appspot.com",
    messagingSenderId: "163757101333"
  };
  firebase.initializeApp(config);

export default firebase;
