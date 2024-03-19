import React, { useEffect } from 'react'

const ListingItem = () => (
    <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-format="fluid"
        data-ad-layout-key="-he-f+1u-2k+2c"
        data-ad-client="ca-pub-8441432984375470"
        data-ad-slot="1024887928"
    ></ins>
)

const PokedexItem = () => (
    <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-format="fluid"
        data-ad-layout-key="-gq-r+m-8m+n0"
        data-ad-client="ca-pub-8441432984375470"
        data-ad-slot="6319385123"
    ></ins>
)

const HeaderItem = () => (
    <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-format="fluid"
        data-ad-layout-key="-gq-r+m-8m+n0"
        data-ad-client="ca-pub-8441432984375470"
        data-ad-slot="6675177532"
        data-full-width-responsive="true"
    ></ins>
)

const FooterItem = () => (
    <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-format="autorelaxed"
        data-ad-layout-key="-gq-r+m-8m+n0"
        data-ad-client="ca-pub-8441432984375470"
        data-ad-slot="4346497287"
    ></ins>
)

const GymCalculatorItem = () => (
    <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-format="auto"
        data-ad-layout-key="-gq-r+m-8m+n0"
        data-ad-client="ca-pub-8441432984375470"
        data-ad-slot="6314185076"
        data-full-width-responsive="true"
    ></ins>
)

const ADS_TYPE = {
    LISTING_ITEM: <ListingItem />,
    POKEDEX_ITEM: <PokedexItem />,
    HEADER_ITEM: <HeaderItem />,
    FOOTER_ITEM: <FooterItem />,
    GYM_CALCULATOR_ITEM: <GymCalculatorItem />
}

export const Adsense = ({ ad }) => {
    useEffect(() => {
        try {
            const adsbygoogle = window.adsbygoogle || []
            adsbygoogle.push({})
        } catch (e) {
            console.error(e)
        }
    }, [])

    return (
        <div style={{ ...adsenseStyles }}>
            {ADS_TYPE[ad]}
        </div>
    )
}

const adsenseStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    marginTop: '1rem',
    marginBottom: '1rem'
}