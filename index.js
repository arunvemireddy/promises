const axios = require('axios');
const url = `https://www.boredapi.com/api/activity`;

function fetchActivity(){
    return axios.get(url)
    .then(response=>response.data.activity)
    .catch(error =>{throw error})
}
// what you can do with promises ?

// 1 creating a function that return promise to encapsulate asynchronus operations
// start
let myPromise = new Promise((resolve,reject)=>{
    axios.get(url)
    .then(response=>{
        resolve(response.data.activity)
    })
    .catch(error=>{
        reject(error);
    })
})

myPromise.then(response=>{
    console.log(`promise wrapper success msg: ${response}`);
}).catch(error=>{
    console.log(`promise wrapper error msg: ${error}`);
}).finally(()=>{
    console.log(`promise wrapper finally msg: end`);
})
//end

// 2 incorporating delay using setTimeout
// start
function fetchActivityWithDelay(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            axios.get(url)
            .then(response=>{
                resolve(response.data.activity)
            })
            .catch(error =>{
                reject(error);
            })
        },2000);   // simulating a 2 second delay
    })
}

fetchActivityWithDelay()
    .then(activity=>{
        console.log(`setTimeout success msg : ${activity}`)
    })
    .catch(error=>{
        console.log(`setTimeout error msg : ${error}`)
})
// end

// 3 handling mutliple promises
// start
const promises = [fetchActivity(),fetchActivity(),fetchActivity()]

Promise.all(promises)
.then(activities=>{
    activities.forEach(activity=>{console.log(`promise all msg: ${activity}`)});
})
.catch(error=>{console.error(error)});
// end

// 4 chaining promise
// start
fetchActivity()
.then(activity=>{
    console.log(`Chaning First activity ${activity}`)
    return fetchActivity();
})
.then(activity=>{
    console.log(`Chaning Second activity ${activity}`)
    return fetchActivity();
})
.then(activity=>{
    console.log(`Chaning Third activity ${activity}`)
})
.catch(error=>{
    console.log(`Chaning Error fetching activities:`,error)
})



