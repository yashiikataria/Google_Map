const CSVToJSON = require("csvtojson");

function clean(users,dataObj)
{
   
    dataObj['location']=[];
    dataObj['title']=[];
    dataObj['alert']=[];
    dataObj['tsunami']=[];
    for(let value of users){
          dataObj['location'].push(value.location)
          dataObj['title'].push(value.title)
          dataObj['alert'].push(value.alert)
          dataObj['tsunami'].push(value.tsunami)
      }
//  console.log(dataObj)
}

function cleancontinent(users,dataObj,continent)
{
      dataObj['continent']=continent;
      dataObj['country']=[];
      dataObj['location']=[];
      dataObj['title']=[];
      dataObj['alert']=[];
      dataObj['tsunami']=[];
      for(let value of users){
        //  console.log(value.continent,continent)
        if(value.continent.toLowerCase()===continent.toLowerCase())
        {
          // console.log(value.continent,continent)
          //  console.log("hello")
  
            dataObj['location'].push(value.location)
            dataObj['title'].push(value.title)
            dataObj['alert'].push(value.alert)
            dataObj['tsunami'].push(value.tsunami)
            dataObj['country'].push(value.country)
        }
   }
    //  console.log(dataObj)
}

function cleancountry(users,dataObj,country)
{
  dataObj['country']=country;
  dataObj['location']=[];
  dataObj['title']=[];
  dataObj['alert']=[]
  dataObj['tsunami']=[];
  for(let value of users){
   
    if(value.country===country)
    {
      // console.log(value.location,country)
      // console.log(country)
   
        dataObj['location'].push(value.location)
        dataObj['title'].push(value.title)
        dataObj['alert'].push(value.alert)
        dataObj['tsunami'].push(value.tsunami)
        //  console.log(dataObj)
    }
  }
  // console.log(dataObj)
}

async function Data() {
  try {
    const users = await CSVToJSON().fromFile("./earthquake_data.csv");
    dataObj={}
    clean(users,dataObj);
    //  console.log(dataObj)
    return JSON.stringify(dataObj);
  }
   catch (err) {
    console.log(err);
  }
}


async function getData(continent) {
  try {
    const users = await CSVToJSON().fromFile("./earthquake_data.csv");
    dataObj={}
    // dataObj2={}
    // getCountries(dataObj,continent)
    cleancontinent(users,dataObj,continent);
    //  console.log(dataObj)
    return JSON.stringify(dataObj);
  }
   catch (err) {
    console.log(err);
  }
}



async function getDatacountry(country) {
  try {
    const users = await CSVToJSON().fromFile("./earthquake_data.csv");
    console.log(country)
    dataObj={}
    cleancountry(users,dataObj,country)
   //  console.log(dataObj)
    return JSON.stringify(dataObj);
   }
   catch (err) {
    console.log(err);
  }
}


module.exports = {
    getData,getDatacountry,Data
};