/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
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
