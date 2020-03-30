import React from 'react'
import { Link, graphql } from 'gatsby'
import Header from '../components/header'
var slugify = require('slugify')

const BlogPostTemplate = ({ data, pageContext }) => {
    const { prev, next } = pageContext
    const { markdownRemark } = data
    return (
        <>
            <Header />
            <div style={{ fontFamily: 'avenir' }}>
                {markdownRemark.frontmatter.tags && markdownRemark.frontmatter.tags.length ? (
                    <ul style={{
                        listStyle: 'none',
                        display: 'flex'
                    }}>
                        {markdownRemark.frontmatter.tags.map((tag, index) => {
                            return (
                                <li key={index} style={{ marginRight: '20px' }}>
                                    <Link to={`/tags/${slugify(tag, {lower: true})}`}>
                                        {tag}
                                    </Link>
                                </li>
                            )})
                        }
                    </ul>
                ) : null }
                <h1>{markdownRemark.frontmatter.title}</h1>
                <div>
                    <ul style={{
                        display: 'flex',
                        listStyle: 'none'
                    }}>
                        {prev && <li style={{marginRight: '40px'}}><Link style={{textDecoration: 'none'}} to={prev.frontmatter.path}>PREV</Link></li>}
                        {next && <li><Link style={{textDecoration: 'none'}} to={next.frontmatter.path}>NEXT</Link></li>}
                    </ul>
                </div>
                <time>{markdownRemark.frontmatter.date}</time>
                <div
                    className="blog-post-template"
                    dangerouslySetInnerHTML={{__html: markdownRemark.html}}
                >
                </div>
            </div>
        </>
    )
}

export default BlogPostTemplate

export const query = graphql`
    query ($pathSlug: String!) {
        markdownRemark(frontmatter: { path: { eq: $pathSlug } } ) {
            id
            frontmatter {
                title
                path
                date(formatString: "dddd DD MMMM YYYY")
                tags
            }
            html
        }
    }
`