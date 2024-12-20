import 'bootstrap/dist/css/bootstrap.min.css'
import React from "react"
import { Typography } from "../components/Atoms"
import { MarketListing } from '../components/MarketListing'
import { Page } from '../components/Page'
import { QuickInfoListing } from "../components/QuickInfo/QuickInfoListing"
import { Seo } from "../components/SEO"
import { ToolsListing } from "../components/Tools/ToolsListing"
import { ToolsMarket } from "../components/Tools/ToolsMarket"
import { useTranslations } from '../context/TranslationsContext'

const IndexPage = ({ pageContext }) => {
    const { t } = useTranslations()

    return (
        <Page breadcrumbs={pageContext.breadcrumb} label="Home">

            <div className="col mb-3 mt-2">
                <Typography as="h2" className="mb-3">{t(`Market`)}</Typography>
                <ToolsMarket />
            </div>

            <div className="col-10 mb-3 mt-2">
                <Typography as="h2" className="mb-3">{t(`Tools`)}</Typography>
                <ToolsListing />
            </div>


            <div className="mb-3">
                <Typography as="h2" className="mb-3">{t(`Quick Info`)}</Typography>
                <QuickInfoListing />
            </div>
            <div className="mb-3">
                <Typography as="h2">{t(`Popular items on Market`)}</Typography>
                <MarketListing />
            </div>
        </Page>
    )
}

const description = "A website for every tools, guides and informations about PokeMMO. Read the best way to make money and how to make competitive pokemon easy. "
export const Head = () => <Seo title="Homepage" description={description}></Seo>

export default IndexPage