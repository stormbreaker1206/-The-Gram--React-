export const randomName = (length) => {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

export const getCurrentTime = ()=>{
    let time = []

    time  = new Date(Date.now());

    return time;
}

export const guidGenerator = () => {
    let S4 = function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
export const checkLikes = (item, id) =>{
    let likes = [];
    
    if (item.hasOwnProperty('likes')) {
        Object.keys(item["likes"]).forEach(function(key) {
            let like = item["likes"][key].userId;

            if(like === id){
                likes.push(like)
            }

            
         });
    }
   
 
    
    return likes;
}

export const checkBlock = (item, id) =>{
    let blocked = [];

    if (item.hasOwnProperty('blockedUsers')) {
        Object.keys(item["blockedUsers"]).forEach(function(key) {
            let block = item["blockedUsers"][key].blockedId;

            if(block === id){
                blocked.push(block)
            }


        });
    }



    return blocked;
}


export const checkAuthenticCount = (item) =>{
    let result = 0
    if (item.hasOwnProperty('authentic')) {
       Object.keys(item["authentic"]).forEach(function(key) {

           result++

       })
    }

    return result;
}

export const checkKudosCount = (item) =>{
    let result = 0
    if (item.hasOwnProperty('kudos')) {
        Object.keys(item["kudos"]).forEach(function(key) {

            result++

        })
    }

    return result;
}

export const checkRumourCount = (item) =>{
    let result = 0
    if (item.hasOwnProperty('rumour')) {
        Object.keys(item["rumour"]).forEach(function(key) {

            result++

        })
    }

    return result;
}

export const checkLikesCount = (item) =>{
    let result = 0
    if (item.hasOwnProperty('likes')) {
        Object.keys(item["likes"]).forEach(function(key) {

            result++

        })
    }

    return result;
}

export const checkCommentsCount = (item) =>{
    let result = 0
    if (item.hasOwnProperty('comments')) {
        Object.keys(item["comments"]).forEach(function(key) {

            result++

        })
    }

    return result;
}

export const checkBlockCount = (item) =>{
    let result = 0
    if (item.hasOwnProperty('blockedUsers')) {
        Object.keys(item["blockedUsers"]).forEach(function(key) {

            result++

        })
    }

    return result;
}

export const getBlockedUsers = (item) =>{
    let blocked = [];

    if (item.hasOwnProperty('blockedUsers')) {
        Object.keys(item["blockedUsers"]).forEach(function (key) {
            let block = item["blockedUsers"][key].blockedId;
            blocked.push(block)

        });
    }
        return blocked
}

export const ifRumourExist = (item, id) =>{
    let result = "Mark as Rumour"
    if (item.hasOwnProperty('rumour')) {
        Object.keys(item["rumour"]).forEach(function(key) {
            let rumour = item["rumour"][key].userId;

            if(rumour === id){
                result = 'Un-Mark Rumour'
            }


        });
    }


    return result;
}

export const ifBlockExist = (item, id) =>{
    let result = "Block"
    if (item.hasOwnProperty('blockedUsers')) {
        Object.keys(item["blockedUsers"]).forEach(function(key) {
            let rumour = item["blockedUsers"][key].blockedId;

            if(rumour === id){
                result = 'Un-Block'
            }


        });
    }


    return result;
}
export const ifKudosExist = (item, id) =>{
    let result = "Give a Kudos"
    if (item.hasOwnProperty('kudos')) {
        Object.keys(item["kudos"]).forEach(function(key) {
            let rumour = item["kudos"][key].kudosId;

            if(rumour === id){
                result = 'Remove Kudos'
            }


        });
    }


    return result;
}

export const ifAuthenticExist = (item, id) =>{
    let result = "Mark as Authentic"
    if (item.hasOwnProperty('authentic')) {
        Object.keys(item["authentic"]).forEach(function(key) {
            let rumour = item["authentic"][key].userId;

            if(rumour === id){
                result = 'Un-Mark Authentic'
            }


        });
    }


    return result;
}



export const hoursAgo = date => {
    let seconds = Math.floor((new Date() - date) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";

}

export const timeDifference = (current, previous) => {

    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;

    let elapsed = current - previous;

    if (elapsed < msPerMinute) {
        return Math.round(elapsed/1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
        return Math.round(elapsed/msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay ) {
        return Math.round(elapsed/msPerHour ) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';
    }

    else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';
    }
}

export const time2TimeAgo = (ts) => {
    // This function computes the delta between the
    // provided timestamp and the current time, then test
    // the delta for predefined ranges.

    let d=new Date();  // Gets the current time
    let nowTs = Math.floor(d.getTime()/1000); // getTime() returns milliseconds, and we need seconds, hence the Math.floor and division by 1000
    let seconds = nowTs-ts;

    // more that two days
    if (seconds > 2*24*3600) {
        return "a few days ago";
    }
    // a day
    if (seconds > 24*3600) {
        return "yesterday";
    }

    if (seconds > 3600) {
        return "a few hours ago";
    }
    if (seconds > 1800) {
        return "30 min ago";
    }
    if (seconds > 60) {
        return Math.floor(seconds/60) + " minutes ago";
    }
}