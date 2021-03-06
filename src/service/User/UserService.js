import GraphQLService from "../GraphQLService";
import gql from 'graphql-tag';

// User service used to fetch user data (lists)
export default class UserService extends GraphQLService {

    // Fetch complete user data (email,.. + lists names and ids)
    fetchCompleteUser = (userId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const query = gql`
                    query user($id: Int!) {
                        app_user(where: {app_user_id: {_eq: $id}}) {
                            app_user_id
                            email
                            username
                            lists {
                                list_id
                                created_at
                                is_archived
                                name
                            }
                        }
                    }
                `;
                const { data } = await this._client.query({ query, fetchPolicy: 'no-cache', variables: { id: userId } }); // Fetch data
                if (data.app_user && data.app_user.length > 0) {
                    resolve(data.app_user[0]);
                } else {
                    reject("No data found");
                }
            } catch (err) {
                reject(err);
            }
        })
    }

    // Fetch all users but not the authentified one
    fetchAllWithout = (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const query = gql`
                    query users($id: Int!) {
                        app_user(where: {app_user_id: {_neq: $id}}) {
                            app_user_id
                            email
                            username
                        }
                    }
                `;
                const { data } = await this._client.query({ query, fetchPolicy: 'no-cache', variables: { id } }); // Fetch data
                resolve(data.app_user); // Resolve array of users
            } catch (err) {
                reject(err);
            }
        });
    }
};