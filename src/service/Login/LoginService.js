import GraphQLService from "../GraphQLService";
import gql from 'graphql-tag';

export default class LoginService extends GraphQLService {

    // Log user in using is email/username and password
    login = ({ passwd, email }) => {
        return new Promise(async (resolve, reject) => {
            try {
                const query = gql`
                query login($email: String!, $passwd: String!) {
                    app_user(where: {email: {_eq: $email}, _and: {passwd: {_eq: $passwd}}}) {
                        username
                        email
                        passwd
                        app_user_id
                }
            }`;
                const data = await this._client.query({ query, fetchPolicy: 'no-cache', variables: { passwd, email } }); // Query
                resolve(data);
            } catch (err) {
                reject(err); // Error while fetching user for authentication
            }
        });
    }
}