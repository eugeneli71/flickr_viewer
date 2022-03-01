const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios')
const morgan = require('morgan')
const app = express();

const port = process.env.PORT  || 8080;
const ip   = process.env.IP    || '0.0.0.0';

// express middlewares
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.get('/api/flickr',async (req,res)=>{
    const {tags} = req.query;
    try{
        // call flickr api whit param tag
        const response =  await axios.get('https://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1&safe_search=1',{params:{tags}});
        res.send(response.data);
    }catch(e){
        throw e;
    }
   

})
// handle 404
app.use(function(req,res,next)
{

    var err = new Error('Not Found');
    err.status = 404;

});

//hanlde server err 500
app.use(function(err,req,res,next){

    res.status(err.status || 500)
        .send({message: err.message})
});

app.listen(port,ip);
console.log('Server running on port: ' + port)