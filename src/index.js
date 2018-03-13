import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ApolloClient, { createNetworkInterface } from 'apollo-client';

import { ApolloProvider } from 'react-apollo';


const networkInterface= createNetworkInterface({uri:'https://avi-shop-easy-shopping.myshopify.com/api/graphql'})

networkInterface.use([{
    applyMiddleware(req,next){
        if(!req.options.headers){
            req.options.headers={};
        }
        req.options.headers['X-Shopify-Storefront-Access-Token'] = 'c5a309acd174a3624e7f50eebee41b3b'
        next();
}
}]);
const client= new ApolloClient({
    networkInterface,
});



ReactDOM.render(
(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
), document.getElementById('root'));

