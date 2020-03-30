import React from 'react'
import { Link, graphql } from 'gatsby'
import Header from '../components/header'
import { MDXRenderer } from 'gatsby-plugin-mdx'
var slugify = require('slugify')

const BlogPostTemplate = ({ data, pageContext }) => {
    const { prev, next } = pageContext
    const { mdx } = data
    return (
        <>
            <Header />
            <div style={{ fontFamily: 'avenir' }}>
                {mdx.frontmatter.tags && mdx.frontmatter.tags.length ? (
                    <ul style={{
                        listStyle: 'none',
                        display: 'flex'
                    }}>
                        {mdx.frontmatter.tags.map((tag, index) => {
                            return (
                                <li key={index} style={{ marginRight: '20px' }}>
                                    <Link to={`/blog/tags/${slugify(tag, {lower: true})}`}>
                                        {tag}
                                    </Link>
                                </li>
                            )})
                        }
                    </ul>
                ) : null }
                <h1>{mdx.frontmatter.title}</h1>
                <div>
                    <ul style={{
                        display: 'flex',
                        listStyle: 'none'
                    }}>
                        {prev && <li style={{marginRight: '40px'}}><Link style={{textDecoration: 'none'}} to={`/blog/${prev.frontmatter.path}`}>PREV</Link></li>}
                        {next && <li><Link style={{textDecoration: 'none'}} to={`/blog/${next.frontmatter.path}`}>NEXT</Link></li>}
                    </ul>
                </div>
                <time>{mdx.frontmatter.date}</time>
                <MDXRenderer>{mdx.body}</MDXRenderer>
            </div>
        </>
    )
}

export default BlogPostTemplate

export const query = graphql`
    query ($pathSlug: String!) {
        mdx(frontmatter: { path: { eq: $pathSlug } } ) {
            id
            frontmatter {
                title
                path
                date(formatString: "dddd DD MMMM YYYY")
                tags
            }
            body
        }
    }
`