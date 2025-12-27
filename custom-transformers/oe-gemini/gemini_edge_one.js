const {
    buildRequestBody,
    transformRequestOut,
    transformResponseOut
} = require("./gemini.util.js");

class EdgeOneGeminiTransformer {
    name = "oe-gemini";
    constructor(options) {
        this.options = options;
    }
    async transformRequestIn(
        requestBody,
        provider,
        context
    ) {
        // this.logger.debug(`Transforming requestIn for ${this.name},baseUrl:${provider.baseUrl}`);
        return {
            body: buildRequestBody(requestBody),
            config: {
                url: new URL(
                    `./${requestBody.model}:${requestBody.stream ? `streamGenerateContent?alt=sse&key=${provider.apiKey}` : `generateContent?key=${provider.apiKey}`}`,
                    provider.baseUrl+"/v1beta/models/"
                ),
                headers: {
                    "OE-Key": "c754e04dfec24b79994147f40c8f0da4",
                    "OE-Gateway-Name": "ge-api",
                    "OE-AI-Provider": "gemini",
                    Authorization: undefined,
                },
            },
        };
    }
    // async transformRequestIn(
    //     requestBody,
    //     provider,
    //     context
    // ) {
    //     this.logger.debug(`Transforming requestIn for ${this.name}`);
    //     return {
    //         body: requestBody,
    //         config: {
    //             url: new URL(
    //                 `./${requestBody.model}:${requestBody.stream ? "streamGenerateContent?alt=sse" : "generateContent"}`,
    //                 provider.baseUrl
    //             ),
    //             headers: {
    //                 "x-goog-api-key": provider.apiKey,
    //                 "OE-Gateway-Version": 2,
    //                 "OE-Key": "c754e04dfec24b79994147f40c8f0da4",
    //                 "OE-Gateway-Name": "ge-api",
    //                 "OE-AI-Provider": "gemini",
    //                 Authorization: undefined,
    //             },
    //         },
    //     };
    // }

    // transformRequestOut(request) {
    //     this.logger.debug(`Transforming requestOut for ${this.name}`);
    //     const req = transformRequestOut(request, this.name, this.logger);
    //     this.logger.debug({ request: req }, `Transformed requestOut for ${this.name}`);
    //     return req;
    // }

    async transformResponseOut(response) {
        // this.logger.debug(`Transforming response for ${this.name}`);
        return transformResponseOut(response, this.name, this.logger);
    }
}
module.exports = EdgeOneGeminiTransformer;