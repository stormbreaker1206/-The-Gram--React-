import * as firebase from "firebase";
import {getCurrentTime} from "./userUtilis";

export const snapshotToArray = snapshot => {
  let returnArr = [];
  

  snapshot.forEach(child => {
    let item = child.val();
    item.key = child.key;
    returnArr.push(item);


  });

  return returnArr;
 
};



export const getName = async  (id) =>{
    if(id === null || id === undefined){

    }else {
        let results = '';
        try {
            const currentUser = await  firebase.database().ref('users')
                .child(id).once('value', (snapshot)=>{
                    if(snapshot.exists()) {
                        results = snapshot
                    }
                })
        }catch (e) {
            console.log(e)
        }
        return results;
    }


}

export const getUserPost = async (id) =>{
    let results = []
    try {
        const posts = await firebase
            .database()
            .ref('posts').orderByChild('id').equalTo(id);
             posts.on('value',  (snapshot) => {

            snapshot.forEach(child => {
                let item = child.val();
                item.key = child.key;
                results.push(item);


            });


        });
    }catch (e) {
        console.log(e)
    }
    return results;
}

export const updateLike = async (item, id) =>{
 
  try{

      const  ref =  await firebase.database().ref('posts').child(item.key).child('likes');
      await ref.orderByChild('userId').equalTo(id)
      .once('value', function(snapshot) {

              if(snapshot.exists()){

              snapshot.forEach(function(snapshot1) {
                      //console.log(snapshot1.key); 
                      // e.g. "h
                      firebase.database().ref('posts').child(item.key).child('likes').
                      child(snapshot1.key).remove();

                      //ref.child(snapshot1.key).remove()
                  })

                
              }else{
                  const changeStatus =  firebase
                  .database()
                  .ref('posts').child(item.key).child('likes')
                  .push({ userId: id});
              }
         
              
  });

            

  }catch (e){
      console.log(e)
  }


}


export const isRumour = async (item, id) =>{

    try{

        const  ref =  await firebase.database().ref('posts').child(item.key).child('rumour');
        await ref.orderByChild('userId').equalTo(id)
            .once('value', function(snapshot) {

                if(snapshot.exists()){

                    snapshot.forEach(function(snapshot1) {
                        //console.log(snapshot1.key);
                        // e.g. "h
                        firebase.database().ref('posts').child(item.key).child('rumour').
                        child(snapshot1.key).remove();

                        //ref.child(snapshot1.key).remove()
                    })


                }else{
                    const changeStatus =  firebase
                        .database()
                        .ref('posts').child(item.key).child('rumour')
                        .push({ userId: id});
                }


            });



    }catch (e){
        console.log(e)
    }


}
export const isAuthentic = async (item, id) =>{

    try{

        const  ref =  await firebase.database().ref('posts').child(item.key).child('authentic');
        await ref.orderByChild('userId').equalTo(id)
            .once('value', function(snapshot) {

                if(snapshot.exists()){

                    snapshot.forEach(function(snapshot1) {
                        //console.log(snapshot1.key);
                        // e.g. "h
                        firebase.database().ref('posts').child(item.key).child('authentic').
                        child(snapshot1.key).remove();

                        //ref.child(snapshot1.key).remove()
                    })


                }else{
                    const changeStatus =  firebase
                        .database()
                        .ref('posts').child(item.key).child('authentic')
                        .push({ userId: id});
                }


            });



    }catch (e){
        console.log(e)
    }


}

export const commentOnPost = async (postId, comments, uid, userImage, handle) =>{

    try {

       const comment = await firebase
            .database()
            .ref('comment')
            .push({ postId: postId, userId: uid, comments: comments, timePosted: Date.now(), userImage: userImage, handle: handle});
        // await  this.setState({isLoading: false})

    }catch (e) {
        console.log(e)
    }
}

export const updateComment = async (postId, id) =>{

    try{

        const  ref =  await firebase.database().ref('posts').child(postId).child('comments')
            .push({userId: id});

    }catch (e){
        console.log(e)
    }


}

export const oneToOneChat = async (receiver, sender, messages) =>{


    try{

        for(let i = 0; i < messages.length; i++){

         const  ref =  await firebase.database().ref('messages').child(receiver).child(sender)
              .push({_id: messages[i]._id, text: messages[i].text, createdAt: Date.now(), user: messages[i].user});

        }

    }catch (e){
        console.log(e)
    }


}

export const oneToOneSender = async (sender,receiver, messages) =>{

    try{

        for(let i = 0; i < messages.length; i++){

            const  ref =  await firebase.database().ref('messages').child(sender).child(receiver)
                .push({_id: messages[i]._id, text: messages[i].text, createdAt: Date.now(), user: messages[i].user});

        }

    }catch (e){
        console.log(e)
    }


}


export const getNumberOfPosts = async (id) =>{
    let results = ""
    try {

        const posts = await firebase
            .database()
            .ref('posts').orderByChild('id').equalTo(id);
        posts.on('value',  (snapshot) => {

            results = snapshot.numChildren()
        });
    }catch (e) {
        console.log(e)
    }

return results
}

