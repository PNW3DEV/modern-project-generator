import { graphql, useStaticQuery } from 'gatsby'

export default () => {
  const data = useStaticQuery(graphql`
    query PageQuery {
      allContentfulPage(filter: {slug: {eq: "/"}}) {
        edges {
          node {
            id
            heroImages {
              fluid(
                maxWidth: 1180
                maxHeight: 480,
                resizingBehavior: SCALE
                background: "rgb:000000"
              ) {
                ...GatsbyContentfulFluid_tracedSVG
              }
            }
            content {
              id
              content
              childMarkdownRemark {
                html
              }
            }
          }
        }
      }
    }
  `)

  const pageText = data.allContentfulPage?.edges?.[0]?.node?.content?.content
  const heroData = { name: '', heroImage: data.allContentfulPage?.edges[0]?.node?.heroImages?.[1] }

  return {
    pageText,
    heroData
  }
}
