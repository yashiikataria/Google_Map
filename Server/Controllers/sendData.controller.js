const getService=require('../Services/sendData.services')

async function getData(req,res)
{   
    try {
       const value=await getService.getData(req.params.continent);
        res.send(value)
      } catch {
        return 'error'
      }
}

async function getDatacountry(req,res)
{   
    try {
      // console.log(req.params.country)
       const value=await getService.getDatacountry(req.params.country);
        res.send(value)
      } catch {
        return 'error'
      }
}

async function Data(req,res)
{   
    try {
       const value=await getService.Data();
        res.send(value)
      } catch {
        return 'error'
      }
}

module.exports={getData,getDatacountry,Data}