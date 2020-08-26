import { graphql, useStaticQuery } from 'gatsby';

import { SignInPageQueryQuery } from '../../graphql-types';
import { useSiteMetadata } from './useSiteMetadata';

export default () => {
  const siteData = useSiteMetadata()
  const data: SignInPageQueryQuery = useStaticQuery(graphql`
    query SignInPageQuery {
      allContentfulPage(filter: {slug: {eq: "sign-in"}}) {
        edges {
          node {
            appBarTitle
            additionalProperties {
              backgroundImageUrl
            }
            title
            heroImages {
              title
            }
          }
        }
      }
    }
  `)

  return {
    siteTitle: siteData?.site?.siteMetadata?.title,
    appBarTitle: data.allContentfulPage?.edges?.[0]?.node?.appBarTitle,
    // @ts-ignore
    headerLabel: data.allContentfulPage?.edges?.[0]?.node?.additionalProperties?.headerLabel,
    // @ts-ignore
    contentBodyLabel: data.allContentfulPage?.edges?.[0]?.node?.additionalProperties?.contentBodyLabel,
    data: data.allContentfulPage?.edges?.[0]?.node
  }
}
