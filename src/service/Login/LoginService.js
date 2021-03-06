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
                        app_user_id
                }
            }`;
                const { data } = await this._client.query({ query, fetchPolicy: 'no-cache', variables: { passwd, email } }); // Query
                if (data["app_user"].length > 0) {
                    resolve({ auth: true, user: data["app_user"][0] }); // Resolve user data                    
                } else {
                    resolve({ auth: false }); // resolve false (not logged in)
                }
            } catch (err) {
                reject(err); // Error while fetching user for authentication
            }
        });
    }
}