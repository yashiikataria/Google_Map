
const getrepo=require("../repositories/FetchingData.repository");

const getData=(continent)=>
{
    const tasks= getrepo.getData(continent);
    return tasks;
}
const Data=()=>
{
    const tasks= getrepo.Data();
    return tasks;
}
const getDatacountry=(country)=>
{
    const tasks= getrepo.getDatacountry(country);
    console.log(tasks)
    return tasks;
}

module.exports = {
    getData,getDatacountry,Data
};