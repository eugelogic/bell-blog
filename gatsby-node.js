const path = require(`path`)
var slugify = require('slugify')

const createTagPages = (createPage, posts) => {
    const allTagsIndexTemplate = path.resolve(`src/templates/allTagsIndex.js`)
    const singleTagIndexTemplate = path.resolve(`src/templates/singleTagIndex.js`)

    const postsByTag = {}

    posts.forEach(({node}) => {
        if (node.frontmatter.tags) {
            node.frontmatter.tags.forEach(tag => {
                if (!postsByTag[tag]) {
                    postsByTag[tag] = []
                }
                postsByTag[tag].push(node)
            })
        }
    })
    const tags = Object.keys(postsByTag)

    createPage({
        path: `/blog/tags`,
        component: allTagsIndexTemplate,
        context: {
            tags: tags.sort()
        }
    })

    tags.forEach(tagName => {
        const posts = postsByTag[tagName]

        createPage({
            path: `/blog/tags/${slugify(tagName, {lower: true})}`,
            component: singleTagIndexTemplate,
            context: {
                posts,
                tagName
            }
        })
    })
}

exports.createPages = (({ graphql, actions}) => {
    const { createPage } = actions
    return new Promise((resolve, reject) => {
        const blogPostTemaplate = path.resolve(`src/templates/blogPost.js`)
        resolve(graphql(`
            query {
                allMdx(
                    sort: { fields: frontmatter___date, order: ASC },
                    filter: { frontmatter: { draft: { eq: false } } }
                    ) {
                    edges {
                        node {
                            frontmatter {
                                title
                                path
                                tags
                            }
                        }
                    }
                }
            }
        `).then(result => {
            const posts = result.data.allMdx.edges

            createTagPages(createPage, posts)

            posts.forEach(({node}, index ) => {
                const path = node.frontmatter.path
                    createPage({
                        path: `/blog/${path}`,
                        component: blogPostTemaplate,
                        context: {
                            pathSlug: path,
                            prev: index === 0 ? null : posts[index - 1].node,
                            next: index === (posts.length - 1) ? null : posts[index + 1].node
                        }
                    })
                resolve()
                })
            })
        )
    })
})

exports.onCreateWebpackConfig = ({ actions: { setWebpackConfig } }) => {
    setWebpackConfig({
        resolve: {
            modules: [path.resolve(__dirname, "src"), "node_modules"],
        },
    })
}
