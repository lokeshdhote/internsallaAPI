var ImageKit = require("imagekit");


    
exports.initImagekit = ()=>{
    var imagekit = new ImageKit(
        {
        publicKey :process.env.PUBLC_KEY,
        privateKey :process.env.PRIVATE_KEY,
        urlEndpoint :process.env.URL_ENDPOINT,
        });
    
    return imagekit
}
