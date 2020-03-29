import React from 'react'
import { graphql } from 'gatsby'

const AllTagsIndexTemplate = (data, pageContext) => {
    console.log(pageContext)
    return (
        <div>
            <h2><em>List of all tags</em></h2>
        </div>
    )
}

export default AllTagsIndexTemplate