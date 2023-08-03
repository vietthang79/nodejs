const NodeCache = require('node-cache');

const cache = new NodeCache();

module.exports = duration => (req,res,next) =>{
    if(req.method !== 'GET'){
        console.error('loi')
        return next;
    }

    const key = req.originalUrl;
    const cachedrespone = cache.get(key);
    if(cachedrespone){
        console.log(`cache hit for ${key}`);
        res.send(cachedrespone);
    }else{
        console.log(`cache miss for ${key}`)
        res.originalSend = res.send;
        res.send = body =>{
            res.originalSend(body);
            cache.set(key, body , duration);
        };
        next();
    }
};