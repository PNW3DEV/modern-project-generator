/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')
// const _ = require(`lodash`)
// const { slash } = require(`gatsby-core-utils`)

// Disable
/*
exports.onCreateBabelConfig = ({ actions, stage }) => {
  if (stage === 'develop') {
    actions.setBabelPlugin({
      name: `babel-plugin-istanbul`,
    })
  }
}
*/

exports.onCreateWebpackConfig = function onCreateWebpackConfig({ actions, stage, loaders, getConfig }) {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /firebase/, // required to fix third party window not defined errors during gatsby build - https://www.gatsbyjs.org/docs/debugging-html-builds/#fixing-third-party-modules
            use: loaders.null(),
          },
        ],
      },
    })
  }
  if (stage === 'develop') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-hot-loader/,
            use: [
              loaders.js()
            ]
          },
          // {
          //   test: /\.ts|.tsx$/,
          //   enforce: 'post', // needed if you're using Babel
          //   include: path.resolve(`src/`), // instrument only sources with Istanbul
          //   exclude: [/node_modules/],
          //   loader: 'istanbul-instrumenter-loader',
          //   options: {
          //     debug: true,
          //     esModules: true // needed if you're using Babel
          //   }
          // }
        ]
      }
    })
  }

  const config = getConfig();

  /*
  This is updating the Gatsy CoreJS for polyfills.
  Enabling URLSearchParams for IE11
  Gastby is till using CoreJS 2 where CoreJS 3 is the current version.
  https://github.com/gatsbyjs/gatsby/issues/17136
  https://github.com/gatsbyjs/gatsby/issues/15601
   */
  const coreJs2config = config.resolve.alias['core-js'];
  delete config.resolve.alias['core-js']
  config.resolve.alias[`core-js/modules`] = `${coreJs2config}/modules`
  try {
    config.resolve.alias[`core-js/es`] = path.dirname(require.resolve('core-js/es'));
  } catch (err) { }
  actions.replaceWebpackConfig(config);
}

// const documents = {}
// exports.onPreExtractQueries = ({ store }) => {
//   store.subscribe(async () => {
//     const lastAction = store.getState().lastAction
//     const { componentPath } = lastAction.payload
//     console.log(componentPath)
//     if (componentPath) {
//       documents[componentPath] = parseGraphQLSDL(componentPath, readFileSync(componentPath), { noLocation: true })
//     }
//   })
// }

exports.onPostBootstrap = async ({ store }) => {
  // only do this if we just need to generate types for tests. otherwise we need the build to continue.
  if (process.env.CI_TEST) {
      console.log('Exiting early for CI pipeline, no bundles needed')
      process.exit(0)
  }
}

/**
 * Create the dynamic pages from Contentful
 * @param graphql
 * @param actions
 */
exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions
    return graphql(`
      query buildDynamicPages {
        allContentfulPage(filter: {slug: {ne: null}}) {
          nodes {
            node_locale
            contentful_id
            slug
            title
            browserTitle
            template
            menu: shortcutsMenu {
              label: menuLabel
              links {
                ... on ContentfulPage {
                  id
                  title
                  slug
                }
                ... on ContentfulApplicationPage {
                  id
                  title
                  slug: url
                }
              }
            }
            entries {
              ... on ContentfulPageMarkupContentBlock {
                content {
                  id
                  json
                }
              }
              ... on ContentfulLandingHeroHeader {
                heading
                subheading
                ctaLink
                ctaText
                image {
                  file {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `)
    .then(result => {
      if (result.errors) {
        throw result.errors
      }

      // create a map of nodes by slug and locale since we will get a flat list of all nodes back.
      const pageContextMap = {}
      for (const page of result.data.allContentfulPage.nodes) {
        const route = page.slug && page.slug.substring(0, 1) !== '/'
          ? `/${page.slug}`
          : page.slug;

        if (!pageContextMap[route]) {
          pageContextMap[route] = {}
        }
        pageContextMap[route][page.node_locale] = page
      }

      Object.entries(pageContextMap).forEach(([route, pages]) => {
        const template = path.resolve(
          `./src/templates/${pages.en.template || 'default'}.tsx`
        )
        createPage({
          path: route || '404',
          component: template,
          context: {
            en: pages.en,
            es: pages.es
          },
        })
    })
  })
}
