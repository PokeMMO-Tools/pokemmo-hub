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
            <div className="col mb-3 mt-4 d-flex flex-column align-items-start">
                <Typography as="h2" className="mb-3">{t(`Market`)}</Typography>
                <div className="d-flex justify-content-center w-100">
                    <ToolsMarket />
                </div>
            </div>

            <div className="mb-3">
                <Typography as="h2">{t(`Popular items on Market`)}</Typography>
                <MarketListing />
            </div>

            <div className="col mb-3 mt-4 d-flex flex-column align-items-start">
                <Typography as="h2" className="mb-3">{t(`Tools`)}</Typography>
                <div className="d-flex justify-content-center w-100">
                    <ToolsListing />
                </div>
            </div>
            <div className="col mb-2 mt-5 d-flex flex-column align-items-center">
                <Typography as="h2" className="mb-3">{t(`Quick Info`)}</Typography>
                <QuickInfoListing />
            </div>
        </Page>
    )
}

const description = "A website for market data, tools, and helpful information for PokeMMO. Made by PokeMMO players for PokeMMO players. "
export const Head = () => <Seo title="Homepage" description={description}></Seo>

export default IndexPage