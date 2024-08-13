const apiKey = "6a214b79227acc4ad9a53c4ab87103019ca1f585";

const apiKeyMiddleware = (request, response, next)=>{
    const apiKeyInput = request.headers["x-api-key"];
    if(apiKeyInput && apiKeyInput === apiKey)
        next();
    else
        response.status(401).json({ message : "API KEY tidak valid" });
};

module.exports = apiKeyMiddleware;