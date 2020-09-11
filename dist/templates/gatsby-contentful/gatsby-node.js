/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require("path")

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      alias: {
        src: path.resolve(__dirname, "src"),
        components: path.resolve(__dirname, "components"),
        hooks: path.resolve(__dirname, "hooks"),
        providers: path.resolve(__dirname, "providers"),
        styles: path.resolve(__dirname, "styles"),
        themes: path.resolve(__dirname, "themes"),
        util: path.resolve(__dirname, "util"),
      },
    },
  })
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
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve("./src/templates/news-post.tsx")
    resolve(
      graphql(
        `
          {
            allContentfulBlogPost {
              edges {
                node {
                  title
                  slug
                  contentful_id
                  url
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.error(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulBlogPost.edges
        posts.forEach(post => {
          createPage({
            path: `${post.node.url}/`,
            component: blogPost,
            context: {
              slug: post.node.slug,
              contentful_id: post.node.contentful_id,
            },
          })
        })
      })
    )
  })
}
