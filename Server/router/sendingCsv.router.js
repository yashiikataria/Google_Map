const  controller=require('../Controllers/sendData.controller');
const express=require('express')
const app = express();

const router1=express.Router();
// console.log(getData)
router1.get("/",controller.Data);
router1.get("/:continent",controller.getData);
router1.get("/country/:country",controller.getDatacountry);

module.exports={router1}