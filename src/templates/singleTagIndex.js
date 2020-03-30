import React from 'react'
import { Link } from 'gatsby'
import Header from '../components/header'

const SingleTagIndexTemplate = ({ pageContext }) => {
    const { posts, tagName } = pageContext
    return (
        <>
            <Header />
            <div style={{ fontFamily: 'avenir' }}>
                <h2>Tag: {`${tagName}`}</h2>
                <ul>
                    {posts.map((post, index) => {
                        return (
                            <li key={index}>
                                <Link style={{textDecoration: 'none'}} to={`/blog/${post.frontmatter.path}`}>
                                    <h3>{post.frontmatter.title}</h3>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}

export default SingleTagIndexTemplate