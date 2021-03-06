import {Platform} from 'react-native';
import * as firebase from "firebase";
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';


export const registerForPushNotification = async () =>{
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;

}

export const snapshotToArray = snapshot => {
  let returnArr = [];
  

  snapshot.forEach(child => {
    let item = child.val();
    item.key = child.key;
    returnArr.push(item);


  });

  return returnArr;
 
};


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

export const privacySettings = async (id, options)=>{
        const privacy = !options

    try{

            const  ref =  await firebase.database().ref('users').child(id)
                .update({profilePrivacy: privacy});

    }catch (e){
        console.log(e)
    }

    return privacy

}

export const DirectMessage = async (id, options)=>{
    const message = !options

    try{

        const  ref =  await firebase.database().ref('users').child(id)
            .update({directMessage: message});

    }catch (e){
        console.log(e)
    }

    return message

}

export const AllowNotification = async (id, status)=>{
    const notification = !status

    try{

        const  ref =  await firebase.database().ref('users').child(id)
            .update({notification: notification});

    }catch (e){
        console.log(e)
    }

    return notification

}

export const AutoDelete = async (id, option)=>{

    const deleteOptions = !option

    try{

        const  ref =  await firebase.database().ref('users').child(id)
            .update({autoDelete: deleteOptions});

    }catch (e){
        console.log(e)
    }

    return deleteOptions

}

export const updatePost = async (postId, comment)=>{

    try{
        const ref = await firebase.database().ref('posts').child(postId).update({
            status:  comment
        })

    }catch (e){
        console.log(e)
    }
}

export const blockUser = async (currentUserId, blockedUserId) =>{

    try{

        const  ref =  await firebase.database().ref('users').child(currentUserId).child('blockedUsers');
        await ref.orderByChild('blockedId').equalTo(blockedUserId)
            .once('value', function(snapshot) {

                if(snapshot.exists()){

                    snapshot.forEach(function(snapshot1) {
                        //console.log(snapshot1.key);
                        // e.g. "h
                        firebase.database().ref('users').child(currentUserId).child('blockedUsers').
                        child(snapshot1.key).remove();

                        //ref.child(snapshot1.key).remove()
                    })


                }else{
                    const changeStatus =  firebase
                        .database()
                        .ref('users').child(currentUserId).child('blockedUsers')
                        .push({ blockedId: blockedUserId});
                }


            });



    }catch (e){
        console.log(e)
    }


}

export const giveKudos = async (currentUserId, profileId) =>{

    try{

        const  ref =  await firebase.database().ref('users').child(profileId).child('kudos');
        await ref.orderByChild('kudosId').equalTo(currentUserId)
            .once('value', function(snapshot) {

                if(snapshot.exists()){

                    snapshot.forEach(function(snapshot1) {
                        //console.log(snapshot1.key);
                        // e.g. "h
                        firebase.database().ref('users').child(profileId).child('kudos').
                        child(snapshot1.key).remove();

                        //ref.child(snapshot1.key).remove()
                    })


                }else{
                    const changeStatus =  firebase
                        .database()
                        .ref('users').child(profileId).child('kudos')
                        .push({ kudosId: currentUserId});
                }


            });



    }catch (e){
        console.log(e)
    }


}

export const reportUser = async (currentUserId, profileId) =>{
    try {



        const reportedUser =  firebase
            .database()
            .ref('reports').child(profileId)
            .push({ ReportedById: currentUserId});


    }catch (e) {
        console.log(e)
    }
}

export const deleteMessage = async (sender,receiver) =>{

    const  ref =  await firebase.database().ref('messages').child(sender).child(receiver).once('value',
        function (snapshot) {
            if(snapshot.exists()){

                snapshot.forEach(function (snapshot1) {

                    firebase.database().ref('messages').child(sender).child(receiver).
                    child(snapshot1.key).remove()
                })
            }
    })
}

export const deletePost = async (item) =>{
    const  ref =  await firebase.database().ref('posts').child(item.key).once('value',
        function (snapshot) {
            if(snapshot.exists()){

                firebase.database().ref('posts').child(item.key).remove()
            }
        })
}

export const deleteAllPost = async (id)=>{
    const  ref =  await firebase.database().ref('posts').orderByChild('id').equalTo(id)
        .once('value', function (snapshot) {
            snapshot.forEach(function (snapshot1) {

                firebase.database().ref('posts').child(snapshot1.key).remove()
            })

    })
}
export const deleteUser = async (id) =>{
    const  ref =  await firebase.database().ref('users').child(id).once('value',
        function (snapshot) {
            if(snapshot.exists()){

                firebase.database().ref('users').child(id).remove()
            }
        })
}

export const userNotification = async (userHandle, notification, id, userImage, postId)=>{

    try{

        const notifyUser = await firebase
        .database()
        .ref('notification')
        .push({ id: id, comments: notification, fromWhom: userHandle, timePosted: Date.now(), userImage: userImage, read: false,
        postId:postId});
    // await  this.setState({isLoading: false})

    }catch(e){
        console.log(e)
    }

}

export const deleteNotification = async (id)=>{
    try{

        const  ref =  await firebase.database().ref('notification').child(id).once('value',
        function (snapshot) {
            if(snapshot.exists()){

                firebase.database().ref('notification').child(id).remove()
            }
        })

    }catch(e){
        console.log(e)
    }
}

export const deleteComment = async (id)=>{
   

    try{

        const  ref =  await firebase.database().ref('comment').child(id).once('value',
        function (snapshot) {
            if(snapshot.exists()){
                
                firebase.database().ref('comment').child(id).remove()
            }
        })

    }catch(e){
        console.log(e)
    }

}

export const viewNotification = async(key)=>{

    try{
        const  ref =  await firebase.database().ref('notification').child(key)
        .update({read: true});
        }catch (e){
    console.log(e)

}
    


}

export const deletePostCount = async (postId, id) =>{
    
    try{
        let key = ''
        let commentKey =''
        const  ref =  await firebase.database().ref('posts').child(postId).child('comments').once('value',
        function (snapshot) {
            if(snapshot.exists()){

                snapshot.forEach(function(snapshot1) {
              
                   firebase.database().ref('posts').child(postId).child('comments').
                    child(snapshot1.key).orderByChild(id).once('value', (snapshot2)=>{
                    commentKey = snapshot1.key
                    key = snapshot2.key

                    })

               
                })
                
                firebase.database().ref('posts').child(postId).child('comments').child(commentKey).remove()
            }
        })

    }catch(e){
        console.log(e)
    }
}