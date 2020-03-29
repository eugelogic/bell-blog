const path = require(`path`)

exports.createPages = (({ graphql, actions}) => {
    const { createPage } = actions
    return new Promise((resolve, reject) => {
        const blogPostTemaplate = path.resolve(`src/templates/blogPost.js`)
        resolve(graphql(`
            query {
                allMarkdownRemark {
                    edges {
                        node {
                            frontmatter {
                                path
                            }
                        }
                    }
                }
            }
        `).then(result => {
            result.data.allMarkdownRemark.edges.forEach(({node}) => {
                const path = node.frontmatter.path
                    createPage({
                        path,
                        component: blogPostTemaplate,
                        context: {
                            pathSlug: path
                        }
                    })
                resolve()
                })
            })
        )
    })
})