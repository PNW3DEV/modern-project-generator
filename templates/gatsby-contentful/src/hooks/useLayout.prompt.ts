import { graphql, useStaticQuery } from "gatsby"

import useVersion from "./useVersion"

export default () => {
  useVersion()
  const data = useStaticQuery(graphql`
    query NavQuery {
      file(relativePath: { eq: "icon.png" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          fixed(width: 58, height: 38) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      allContentfulNavigationListSortOrder {
        edges {
          node {
            id
            title
            signInButtonLabel
            signOutButtonLabel
            sortOrder {
              label
              slug
              url
              menuItems: subMenuLinks {
                ... on ContentfulBlogPost {
                  slug
                  label: title
                }
                ... on ContentfulLink {
                  slug
                  url
                  label
                }
              }
            }
          }
        }
      }
    }
  `)

  const {
    sortOrder: menus,
    signInButtonLabel,
    signOutButtonLabel
  } = data.allContentfulNavigationListSortOrder?.edges?.[0]?.node

  return {
    menus,
    file: data.file,
    signInButtonLabel,
    signOutButtonLabel,
  }
}
