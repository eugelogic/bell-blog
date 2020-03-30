import React from 'react'
import { Link } from 'gatsby'
import Header from '../components/header'
var slugify = require('slugify')

const AllTagsIndexTemplate = ({ pageContext }) => {
    const { tags } = pageContext
    return (
        <>
            <Header />
            <div style={{ fontFamily: 'avenir' }}>
                <h2><em>List of all tags</em></h2>
                <ul>
                    {tags.map((tagName, index) => {
                        return (
                            <li key={index}>
                                <Link style={{textDecoration: 'none'}} to={`/tags/${slugify(tagName, {lower: true})}`}>
                                    <h3>{tagName}</h3>
                                </Link>
                            </li>
                        )})
                    }
                </ul>
            </div>
        </>
    )
}

export default AllTagsIndexTemplate