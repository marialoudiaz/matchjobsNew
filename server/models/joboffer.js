const mongoose = require("mongoose");
const Schema = mongoose.Schema

const jobOfferSchema = new mongoose.Schema({
    companyName:{type:String,required:true,unique:false},
    jobTitle: {type:String,required:false,unique:false},
    remote:{type:Boolean,required:true,unique:false},
    onSite:{type:Boolean,required:true,unique:false},
    flexible:{type:Boolean,unique:false},
    minPrice:{type:Number,unique:false},
    maxPrice:{type:Number,unique:false},
    location:{type:String,unique:false},
    jobDescription:{type:String,unique:false},
    softSkills:[{type:String,required:true,unique:false}],
    hardSkills:[{type:String,required:true,unique:false}],
    jobFields:[{type:String,required:true,unique:false}],
    languagesSpoken:[{type:String,unique:false}],
    likedBy:[{applicant_id: {type:mongoose.Schema.Types.ObjectId,ref:'applicants',},_id: false,}],
    recruitersId:{
        type: Schema.Types.ObjectId,
        required:true,
        ref:'recruiters',
    },
    matchWith:[{applicant_id: {type:mongoose.Schema.Types.ObjectId,ref:'applicants',},_id: false,}],
    active:{type:Boolean,required:false,unique:false}
    
  
},
{strictQuery: false});

module.exports = mongoose.model("jobOffers", jobOfferSchema);
