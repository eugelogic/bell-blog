import React from "react"
import { Link, StaticQuery, graphql } from 'gatsby'

export const TitleAndDescription = ({ data }) => {
    const title = data.site.siteMetadata.title
    const description = data.site.siteMetadata.description
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontFamily: 'avenir'
        }}>
            <h1 style={{marginBottom: 0}}>
                <Link to={`/`} style={{ textDecoration: 'none' }}>
                    {title}
                </Link>
            </h1>
            <p style={{
                marginTop: 0,
                opacity: 0.5
            }}>
                {description}
            </p>
            <h3 style={{ marginTop: '0' }}>
                <Link
                to={`/blog/tags/`}
                style={{
                    textDecoration: 'none',
                    textTransform: 'uppercase'
                    }}>
                    See all tags
                </Link>
                </h3>
        </div>
    )
}

const Header = () => {
    return (
        <StaticQuery
            query={graphql`
                query {
                    site {
                        siteMetadata {
                            title
                            description
                        }
                    }
                }
            `}
            render={data => <TitleAndDescription data={data} />
            }
        />
    )
}

export default Header
