export default class GraphQLService {
    _client; // GraphQL client like Apollo

    constructor(client) {
        this._client = client;
    };
}