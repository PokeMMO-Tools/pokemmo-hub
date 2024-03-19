import React from "react"
import { useSiteMetadata } from "../hooks/useSiteMetadata"

export const Seo = ({ title, description, pathname, children }) => {
    const { title: defaultTitle, description: defaultDescription, siteUrl } = useSiteMetadata()
    const seo = {
        title: `${defaultTitle} ${title ? `- ${title}` : ''}`,
        description: description || defaultDescription,
        url: `${siteUrl}${pathname || ``}`
    }
    return (
        <>
            <title>{seo.title}</title>
            <meta name="description" content={seo.description} />
            <meta name="google-site-verification" content="fpBZiBPol9ot44AVTO6VTrbM9sHeiMayGkxBKjh6xUg"
            />
            <link rel="apple-touch-icon" sizes="72x72" href="/icons/icon-72x72.png" />
            <link rel="apple-touch-icon" sizes="144x144" href="/icons/icon-144x144.png" />
            <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192x192.png" />
            <link rel="icon" type="image/png" sizes="96x96" href="/icons/icon-96x96.png" />
            {children}
        </>
    )
}