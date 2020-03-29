import React from 'react'
import { Link } from 'gatsby'

const AllTagsIndexTemplate = ({ pageContext }) => {
    const { tags } = pageContext
    return (
        <div style={{ fontFamily: 'avenir' }}>
            <h2><em>List of all tags</em></h2>
            <ul>
                {tags.map((tagName, index) => {
                    return (
                        <li key={index}>
                            <Link style={{textDecoration: 'none'}} to={`/tags/${tagName}`}>
                                <h3>{tagName}</h3>
                            </Link>
                        </li>
                    )})
                }
            </ul>
        </div>
    )
}

export default AllTagsIndexTemplate