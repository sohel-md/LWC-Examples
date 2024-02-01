//LwcGraphQL.js
import { LightningElement, wire } from "lwc";
import { gql, graphql } from "lightning/uiGraphQLApi";
export default class LwcGraphQL extends LightningElement {
  results;
  errors;

  @wire(graphql, {
    query: gql`
      query ContactRecords {
        uiapi {
          query {
            Contact(first: 5) {
              edges {
                node {
                  Id
                  FirstName {
                    value
                  }
                  LastName {
                    value
                  }
                }
              }
            }
          }
        }
      }
    `,
  })
  graphqlQueryResult({ data, errors }) {
    if (data) {
      this.results = data.uiapi.query.Contact.edges.map((edge) => edge.node);
    }
    this.errors = errors;
  }
}