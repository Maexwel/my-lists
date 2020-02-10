import GraphQLService from "../GraphQLService";
import gql from 'graphql-tag';

// Service used to handle list items
export default class ListService extends GraphQLService {

    // Get list items by id
    fetchListById = (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const query = gql`
            query listById($id: Int!) {
                list(where: {list_id: {_eq: $id}}) {
                    list_id
                    name
                    created_at
                    list_items {
                    list_item_id
                    label
                    created_at
                    is_checked
                    item_type {
                        item_type_id
                        label
                    }
                    }
            }
        }`;
                const { data } = await this._client.query({ query, fetchPolicy: 'no-cache', variables: { list_id: id } }); // Query
                if (data.list && data.list.length > 0) {
                    resolve(data.list[0]);
                } else {
                    resolve(null); // No values
                }
            } catch (err) {
                reject(err);
            }
        });
    }

    // Create a new list
    createList = ({ name, userId }) => {
        return new Promise(async (resolve, reject) => {
            try {

            } catch (err) {
                reject(err);
            }
        })
    }

    // Delete a list with items
    deleteListById = (id) => {
        return new Promise(async (resolve, reject) => {
            try {

            } catch (err) {
                reject(err);
            }
        })
    }
}