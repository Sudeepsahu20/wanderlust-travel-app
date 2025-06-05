const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

main().then((res)=>{
  console.log("connected to database");
}).catch((err)=>{
    console.log("Error",err);
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initDB = async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({
        ...obj,
        owner:"68330fb1286daa7b689a848d",
    }))
    await Listing.insertMany(initData.data);
    console.log("data was initialised");
}

initDB();