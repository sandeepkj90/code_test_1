const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.post('/replaceData',(req,res)=>{
    let data = req.body;
    let payload = data.payload;
    payload.value.forEach(function replaceData(item,index,array){
    if(typeof item.value == 'string' ){
        if(item.value.indexOf('{')!=-1){
       let substr = item.value.slice(item.value.indexOf('{'),item.value.indexOf('}') +1); // re
       item.value = item.value.replace(substr,data.referenceData[substr.replace(/[{}]/g,'')]);
        }
    }
    if(Array.isArray(item.value)){
        item.value.forEach(replaceData)
    }
})
res.send(data);
})


app.listen(4000,()=>{
    console.log('Listening t the port 4000')
})