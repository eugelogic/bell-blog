import React from "react"
import { graphql } from 'gatsby'
import Header from './components/header'

const Layout = ({data}) => {
    const { edges } = data.allMarkdownRemark
    return (
        <div>
            <Header />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontFamily: 'avenir'
            }}>
                {edges.map(edge => {
                    const { frontmatter } = edge.node
                    return (
                        <div
                            key={frontmatter.path}
                            style={{ marginBottom: '20px' }}
                        >
                            {frontmatter.title}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Layout

export const query = graphql`
    query BlogsListQuery {
        allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
            edges {
                node {
                    frontmatter {
                        title
                        date(formatString: "dddd DD MMMM YYYY")
                        path
                    }
                }
            }
        }
    }
`
