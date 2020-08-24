import { graphql, useStaticQuery } from 'gatsby'

import { LandingPageQueryQuery } from '../../graphql-types'

export default () => {
  const data: LandingPageQueryQuery = useStaticQuery(graphql`
    query LandingPageQuery {
      allContentfulPage(filter: {slug: {eq: "/"}}) {
        edges {
          node {
            title
            slug
            additionalProperties {
              headerLabel
              headerLine2Label
              heroCopy
              subHeaderLabel
            }
            headerCtAs {
              isExternalLink
              label
              url
            }
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
  const node = data.allContentfulPage?.edges[0]?.node
  const heroData = { name: '', ...node, heroImage: data.allContentfulPage?.edges[0]?.node?.heroImages?.[1] }

  return {
    pageText,
    heroData,
    data: node,
  }
}
