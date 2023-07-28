export const decodeBase64 = (str) => {
    try{    
        let buff = new Buffer.from(str, "base64");
        return buff.toString("utf8");
    } catch(e){
        console.log(`Error decoding string - ${e}`);
        throw e;
    }
}