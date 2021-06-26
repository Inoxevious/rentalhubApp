import { createStore } from "vuex";
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { gql } from "apollo-boost";
import {
    provideApolloClient,
    useQuery,
    useResult,
} from '@vue/apollo-composable';
// HTTP connection to the API
const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: 'http://127.0.0.1:8000/graphql',
})

// Cache implementation
const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
})

provideApolloClient(apolloClient);

const ALL_PROPERTIES_QUERY = gql `
{
    allProperties {
    slug
    city
    neighborhood
    description
    shortDescription
    publishDate
    published
    image
    leaseRate
    owner {
        bio
    }
    tags {
        name
    }
    }
    }
                                        `;
// const { result, loading, error } = useQuery(
//     ALL_PROPERTIES_QUERY
// );
const { result, loading, onError, onResult } = useQuery(ALL_PROPERTIES_QUERY)

export let properties = useResult(result, [], data => data.allProperties)
console.log('properties', properties)
const store = createStore({
    state: {
        properties,
        loading,
        onError,
        onResult
    },
    mutations: {
        addProperty(state, propertyData) {
            const newProperty = {
                id: new Date().toISOString(),
                title: propertyData.title,
                streetAddress: propertyData.streetAddress,
                neighborhood: propertyData.neighborhood,

                image: propertyData.imageUrl,
                description: propertyData.description
            };

            state.properties.unshift(newProperty);
        }
    },
    actions: {
        addProperty(context, propertyData) {
            context.commit('addProperty', propertyData);
        }
    },
    getters: {
        popular({ popular }) {
            return popular;
        },
        allProducts({ allProducts }) {
            return allProducts;
        },
        properties(state) {
            console.log("res" + state.properties);
            return state.properties;
        },
        property(state) {
            return (propertySlug) => {
                return state.properties.find((property) => property.slug === propertySlug);
            };
        },
        propertiesByTag(state) {
            return (propertyTags) => {
                return state.properties.find((property) => property.tags.name === propertyTags);

            }
        },
    },
});

export default store;