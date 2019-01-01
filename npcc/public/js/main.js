
function auth(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    let errorCode = error.code;
    let errorMessage = error.message;
    console.log('Error ' + errorCode + ':' + errorMessage);
  });
}

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
  } else {
    console.log('You are loged out!');
  }
});

function logOut() {
  firebase.auth().signOut().then(function () {
    console.log('signout was sucsesful!');
  }).catch(function (error) {
    console.log('signout was not sucsesful...');
  });
}

let posts = firebase.database().ref('posts')
//
function addPost(title,discription,link,imageURL) {
  if (firebase.auth().currentUser != null) {
    posts.push({
      title:title,
      discription:discription,
      link:link,
      imageURL:imageURL
    });
  }
}

function get(element,snapshot) {
  return snapshot.child(element).val()
}

