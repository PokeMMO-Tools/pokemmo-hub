import React from 'react'
import { Page } from '../../components/Page'
import { PageTitle } from '../../components/PageTitle'
import { Seo } from '../../components/SEO'
import { Card, Typography } from '../../components/Atoms'
import { GithubButton, PokeMMOButton } from '../../components/Atoms/Button'
import { useTranslations } from '../../context/TranslationsContext'
import archetypeAssets from '../../assets/archetype'
import { Image } from 'react-bootstrap'

const ArchetypeCounter = ({ pageContext }) => {
    const { t } = useTranslations();
    const PAGE_TITLE = t("archetype.title")
    return (
        <Page breadcrumbs={pageContext.breadcrumb} label={PAGE_TITLE}>
            <PageTitle credits={t("archetype.subtitle")}>{PAGE_TITLE}</PageTitle>
            <Card>
                <Typography as="h2">{t("archetype.about.title")}</Typography>
                <Typography>
                    {
                        t("archetype.about.text").split("\n").map((line, i) => (<a key={i}>{line}<br /></a>))
                    }
                </Typography>
                <div className='d-flex justify-content-start w-100 align-items-center my-3' style={{ gap: '.5rem' }}>
                    <GithubButton link="https://github.com/ssjshields/archetype-counter" />
                    <PokeMMOButton link="https://forums.pokemmo.com/index.php?/topic/149495-tool-archetype-counter-automatically-track-encounters-eggs-fossils-v3300-cjk-support/" />
                </div>
                <Typography as="h2">Features</Typography>
                <UList>
                    <UListItem icon="🚀" title={t("archetype.feature.1.title")} text={t("archetype.feature.1.text")} />
                    <UListItem icon="📝" title={t("archetype.feature.2.title")} text={t("archetype.feature.2.text")} />
                    <UListItem icon="🎨" title={t("archetype.feature.3.title")} text={t("archetype.feature.3.text")} />
                    <UListItem icon="🗳️" title={t("archetype.feature.4.title")} text={t("archetype.feature.4.text")} />
                </UList>
                <Typography as="h2">Compatibility</Typography>
                <UList>
                    <UListItem icon="" title={t("archetype.compatibility.1.title")} text={t("archetype.compatibility.1.text")} />
                    <UListItem icon="" title={t("archetype.compatibility.2.title")} text={t("archetype.compatibility.2.text")} />
                    <UListItem icon="" title={t("archetype.compatibility.3.title")} text={t("archetype.compatibility.3.text")} />
                </UList>
                <Typography as="h2">Showcase</Typography>
                <div className="d-flex flex-md-row flex-column align-items-center justify-content-evenly">
                    <ShowcaseImage src={archetypeAssets.contextMenu} alt={t("archetype.showcase.alt")} />
                    <div className="d-flex flex-column align-items-md-start align-items-center justify-content-evenly">
                        <ShowcaseImage src={archetypeAssets.counterExtended} alt={t("archetype.showcase.alt")} />
                        <ShowcaseImage src={archetypeAssets.counter} alt={t("archetype.showcase.alt")}/>
                    </div>
                </div>
            </Card>
        </Page>
    )
}

const UList = ({ children }) => <ul className='list-none'>{children}</ul>
const UListItem = ({ icon, title, text }) => {
    const { t } = useTranslations();
    return (<li className='list-disc my-4'>{icon} <strong>{t(title)}</strong>: <br />{t(text)}</li>)
}

const ShowcaseImage = ({ src, alt, as="" }) => <Image className={"rounded img-fluid my-2 " + as} src={src} alt={alt} />

const description = "The ultimate encounter, egg and fossil counter for PokeMMO. Automatically keep track of your encounters, eggs and fossils."
export const Head = () => <Seo title="Archetype Counter" description={description}></Seo>

export default ArchetypeCounter