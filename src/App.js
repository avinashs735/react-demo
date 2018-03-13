import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo'

class App extends Component {
   static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      shop: PropTypes.object,
    }).isRequired,
  }
  render() {
    if (this.props.data.loading) {
      return <p>Loading ...</p>;
    }
    if (this.props.data.error) {
      return <p>{this.props.data.error.message}</p>;
    }
    return (
      <div className="App">
        <header className="App-header" style={{position:`relative`,zIndex:1000}}>
          <img src={logo} className="App-logo" alt="logo" />
         
        </header>
        


<div className="App__title">
  
            <h1>Welcome to {this.props.data.shop.name}</h1>
            <h2>{this.props.data.shop.description}</h2>
            <h2>{this.props.data.shop.moneyFormat}</h2>
            <h3>{this.props.data.shop.primaryDomain.url}</h3>
            <h3>{this.props.data.shop.primaryDomain.host}</h3>

          
              <blog>
                <h2>BLOG SECTION</h2>
                {this.props.data.shop.blogs.edges.map(
                  blog=>
                  <div id={blog.node.id}>
                   <a href={blog.node.url}> {blog.node.title}</a>
                  {blog.node.articles.edges.map(article=>
                  <p>
                    {article.node.title}<br/>
                    {article.node.id}<br/>
                    {article.node.publishedAt}<br/>
                    {article.node.content}<br/>
                    {article.node.comments.edges.map(comment=>
                    <p>
                      comments on post: <br/>
                      {comment.node.content} by . 
                      {comment.node.author.name}
                      ( {comment.node.author.email} )
                    </p>
                    )}
                    </p>)}
                  </div>
                  
                )}
              </blog>

         <collection>
          <h2>{this.props.data.shop.collections.edges[1].node.title}<br/>
           {this.props.data.shop.collections.edges[1].node.description}
            </h2>
         </collection>
         
          </div>

          <termsofService id={this.props.data.shop.termsOfService.id}>
          <a href={this.props.data.shop.termsOfService.url}> <b> {this.props.data.shop.termsOfService.title}</b></a><br/>
            <br/>
            <br/>
      
          </termsofService><br/><br/>
          <products>
            <p>
              pageInfo :
              {this.props.data.shop.products.pageInfo.hasNextPage.toString()} &nbsp; {this.props.data.shop.products.pageInfo.hasPreviousPage.toString()}
            </p>
            {this.props.data.shop.products.edges.map(product=>
          <index>
            <div className="Product" id={product.node.id}>
                <h3>id :</h3>  {product.node.id}<br/>
                <h3>vendor :</h3>  {product.node.vendor}<br/>
                 <h3>tag :</h3> {product.node.tags}<br/>
                 <h3>created At :</h3> {product.node.createdAt}<br/>
                 <h3>Published At :</h3> {product.node.publishedAt}<br/>
                 <h3>Description :</h3> {product.node.description}<br/>
                  
                <h3> Handle :</h3>  {product.node.handle}<br/>
                <h3>Product Options :</h3>({product.node.options.map(opt=>
                    <p>{opt.id} {opt.name} {opt.values}</p>
                )}
                <h3> Image :</h3>
                {product.node.images.edges.map(image=>
                <div>
                  <img id={image.node.id} src={image.node.transformedSrc} width="50px" height="50px"/>
                </div>

                )}
                <h3>Collections :</h3>{product.node.collections.edges.map(collection=>
                <div>{collection.node.id}
                  </div>)}
                  </div><br/>
          </index>
          )}
          </products>

          <div>
           <h2>Country Code :</h2> {this.props.data.shop.paymentSettings.countryCode}<br/>
           <h2>Card Vault URL :</h2> {this.props.data.shop.paymentSettings.cardVaultUrl}<br/>
           <h2>Shopify Account :</h2> {this.props.data.shop.paymentSettings.shopifyPaymentsAccountId}<br/>
            <h2>Currency Code :</h2>{this.props.data.shop.paymentSettings.currencyCode}<br/>
           <h2>Card Types</h2> {this.props.data.shop.paymentSettings.acceptedCardBrands}
          </div>
          
      </div>
    );
  }
}



const  query = gql`
query query{
shop{
    name
    description
    moneyFormat
    primaryDomain{
      url
      host
    }
      blogs(first: 3){
    edges{
      node{
        id
        title
        url
        articles(first:3){
          edges{
            node{
              id
              title
              publishedAt
              content
              comments(first:4){
                edges{node{
                  content
                  id
                  author{
                    email
                    name
                    
                  }
                }
                }
              }
            }
          }
        }
      }
    }
  }
    paymentSettings{
      shopifyPaymentsAccountId
      acceptedCardBrands
      countryCode
      cardVaultUrl
      currencyCode
    }
  collections(first: 2){
      edges{
        node{
          title
          description
        }
      }
    }
  termsOfService{
    id
    body
    title
    url
  }
  refundPolicy{
    id
    title
    body
  }
  privacyPolicy{
    id
    title
    url
    body
  }
products(first: 2){
  pageInfo{
      hasNextPage
      hasPreviousPage
    }
    edges{
      node{
        id
        vendor
        tags
        createdAt
        description
        publishedAt
        options{
            id
            name
            values
          	
          }
        handle
         images(first:5){
            pageInfo{
              hasNextPage
              hasPreviousPage
            }
            edges{
              node{
                id
                altText
                transformedSrc
              }
            }
          }
        collections(first: 2) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  }

  }
}`;

const AppWithDataAndMutation = compose(
  graphql(query),
  )(App);

export default AppWithDataAndMutation;