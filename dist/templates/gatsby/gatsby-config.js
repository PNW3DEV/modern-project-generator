const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"
require('dotenv').config({
  path: `./.env.${activeEnv}`
})
const siteTitle = "{{name}}"
const siteDescription =
  "A Gatsby/React/Typescript App"
const siteAuthor = "IGNW"
const siteUrl = `https://${process.env.REACT_APP_PROJECT_ID}.web.app`
const siteImage = `${siteUrl}/icons/icon_512x512.png`
const siteKeywords = ["gatsby", "typescript", "starter", "javascript", "react"]
const { version } = require('./package.json')
const getCSP = require('./csp')
const cspList = getCSP(activeEnv)

module.exports = {
  siteMetadata: {
    title: siteTitle,
    description: siteDescription,
    author: siteAuthor,
    url: siteUrl,
    siteUrl,
    keywords: siteKeywords,
    image: siteImage,
    version
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
        name: "images",
      },
    },
    {
      resolve: "gatsby-plugin-material-ui",
      options: {
        stylesProvider: {
          injectFirst: true,
        },
        disableAutoprefixing: false,
        disableMinification: false,
      },
    },
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: process.env.REACT_APP_API_KEY || "",
          authDomain: process.env.REACT_APP_AUTH_DOMAIN || "",
          databaseURL: process.env.REACT_APP_DATABASE_URL || "",
          projectId: process.env.REACT_APP_PROJECT_ID || "",
          storageBucket: process.env.REACT_APP_STORAGE_BUCKET || "",
          messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID || "",
          appId: process.env.REACT_APP_APP_ID || "",
          measurementId: process.env.REACT_APP_MEASUREMENT_ID || "",
        },
      }
    },
    // {
    //   resolve: "gatsby-plugin-react-axe",
    //   options: {
    //     showInProduction: false,
    //     // Options to pass to axe-core.
    //     // See: https://github.com/dequelabs/axe-core/blob/master/doc/API.md#api-name-axeconfigure
    //     axeOptions: {
    //       // Your axe-core options.
    //     },
    //   },
    // },
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    "gatsby-plugin-react-helmet",
    `gatsby-plugin-typescript`,
    `gatsby-plugin-graphql-codegen`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: siteTitle,
        short_name: siteTitle,
        description: siteDescription,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: "src/images/icon.png",
        icons: [
          {
            src: "icons/icon_512x512.png",
            sizes: "512x512",
            types: "image/png",
          },
          {
            src: "icons/icon_192x192.png",
            sizes: "192x192",
            types: "image/png",
          },
        ],
      },
    },
    `gatsby-plugin-remove-serviceworker`,
    `gatsby-plugin-sitemap`,
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', disallow: '/' }]
      }
    },
    // {
    //   resolve: `gatsby-plugin-csp`,
    //   options: {
    //     disableOnDev: false,
    //     reportOnly: true, // Changes header to Content-Security-Policy-Report-Only for csp testing purposes
    //     mergeScriptHashes: true, // you can disable scripts sha256 hashes
    //     mergeStyleHashes: false, // you can disable styles sha256 hashes
    //     mergeDefaultDirectives: true,
    //     directives: {
    //       // "default-src": `'self' ${cspList}`,
    //       "script-src": `'self' 'unsafe-inline' www.google-analytics.com www.googletagmanager.com ${cspList}`,
    //       "style-src": `'self' 'unsafe-inline' blob: ${cspList}`,
    //       "style-src-elem": `'self' 'unsafe-inline' blob: ${cspList}`,
    //       "img-src": "'self' data: www.google-analytics.com https://firebasestorage.googleapis.com https://www.googletagmanager.com",
    //       "connect-src": `'self' data: ${cspList} https://www.googleapis.com https://securetoken.googleapis.com https://firebasestorage.googleapis.com https://ipv4.icanhazip.com https://api.ipify.org https://secure.shippingapis.com https://www.googletagmanager.com https://firebaseinstallations.googleapis.com www.google-analytics.com `
    //     }
    //   }
    // },
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {
          "/*": [
            "Cache-Control: max-age=3600",
            "X-Content-Type-Options: nosniff",
            "X-Frame-Options: DENY",
            "X-XSS-Protection: 1; mode=block",
            "Referrer-Policy: no-referrer",
            "Feature-Policy: microphone 'self'",
            // "Expect-CT: max-age=86400, report-uri='https://YOURKEY.report-uri.com/b/g/h'",
            // "Report-To: 'group':'default', 'max_age':31536000, 'endpoints':[{'url':'https://YOURKEY.report-uri.com/b/g/h'}],'include_subdomains':true'",
          ]}, // option to add more headers. `Link` headers are transformed by the below criteria
        allPageHeaders: [], // option to add headers for all pages. `Link` headers are transformed by the below criteria
        mergeSecurityHeaders: true, // boolean to turn off the default security headers
        mergeLinkHeaders: true, // boolean to turn off the default gatsby js headers
        mergeCachingHeaders: true, // boolean to turn off the default caching headers
        transformHeaders: (headers) => headers, // optional transform for manipulating headers under each path (e.g.sorting), etc.
        generateMatchPathRewrites: true, // boolean to turn off automatic creation of redirect rules for client only paths
      },
    },
    'gatsby-plugin-remove-console'
  ],
}
