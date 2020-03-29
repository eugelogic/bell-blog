import React from 'react'
import { Link, graphql } from 'gatsby'

const BlogPostTemplate = ({ data, pageContext }) => {
    const { prev, next } = pageContext
    const { markdownRemark } = data
    return (
        <div style={{ fontFamily: 'avenir' }}>
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
                excerpt
                tags
            }
            html
        }
    }
`