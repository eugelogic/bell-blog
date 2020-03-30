import React from "react"
import { Link, graphql } from 'gatsby'
import Header from '../components/header'
var slugify = require('slugify')

const Layout = ({ data, index }) => {
    const { edges } = data.allMarkdownRemark
    return (
        <div>
            <Header />
            <article
            key={index}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontFamily: 'avenir'
            }}>
                {edges.map(edge => {
                    const { frontmatter } = edge.node
                    return (
                        <>
                            {frontmatter.tags && frontmatter.tags.length ? (
                                <ul>
                                    {frontmatter.tags.map((tag, index) => {
                                        return (
                                            <li key={index}>
                                                <Link to={`/blog/tags/${slugify(tag, { lower: true })}`}>
                                                    {tag}
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            ) : null }
                            <h2
                                key={frontmatter.path}
                                style={{ marginBottom: '20px' }}
                            >
                                <Link to={`/blog/${frontmatter.path}`}>{frontmatter.title}</Link>
                            </h2>
                            <time>{frontmatter.date}</time>
                            <p>{frontmatter.excerpt}</p>
                        </>
                    )
                })}
            </article>
        </div>
    )
}

export default Layout

export const query = graphql`
    query BlogsListQuery {
        allMarkdownRemark(
            sort: { fields: frontmatter___date, order: DESC },
            filter: { frontmatter: { draft: { eq: false } } }
            ) {
            edges {
                node {
                    frontmatter {
                        title
                        date(formatString: "dddd DD MMMM YYYY")
                        path
                        excerpt
                        tags
                    }
                }
            }
        }
    }
`
