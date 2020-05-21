import * as firebase from "firebase";

export const snapshotToArray = snapshot => {
  let returnArr = [];
  

  snapshot.forEach(child => {
    let item = child.val();
    item.key = child.key;
    returnArr.push(item);


  });

  return returnArr;
 
};

export const updateLike = async (item, id) =>{
 
  try{

      const  ref =  await firebase.database().ref('posts').child(item.key).child('likes');
      ref.orderByChild('userId').equalTo(id)
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


