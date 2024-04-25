import React from 'react'
import { Button as ButtonBS } from 'react-bootstrap'
import { TbBrandDiscord, TbBrandGithub } from 'react-icons/tb'
import { useDarkMode } from '../../context/DarkModeContext'
import { useTranslations } from '../../context/TranslationsContext'

export const Button = ({ children, className = '', style, variant = 'primary', active, ...props }) => {
    const { isDark } = useDarkMode()
    const { t } = useTranslations();
    return (
        <ButtonBS
            variant={
                variant.includes('outline-primary')
                    ? isDark ? 'outline-secondary' : 'outline-primary'
                    : variant.includes('primary')
                        ? isDark ? 'secondary' : 'primary'
                        : variant
            }
            className={`d-inline-flex align-items-center ${variant === 'link' ? isDark ? 'text-light' : 'text-dark' : ''} ${className} `}
            style={{
                gap: '.25rem',
                transform: `scale(${active ? .9 : 1})`,
                transition: '.2s',
                ...style
            }}
            active={active}
            {...props}
        >
            {t(children)}
        </ButtonBS>
    )
}


export const DiscordButton = () => {
    const { t } = useTranslations()
    return (
        <Button size="sm" style={{ backgroundColor: "#5764EF", color: "white", borderColor: "#5764EF" }} as="a" href="https://bit.ly/discord-pokemmohub" target="_blank"><TbBrandDiscord />{t('Join us on Discord')}</Button>
    )
}

export const GithubButton = ({link}) => {
    return (
        <Button size="sm" style={{ backgroundColor: "#e2e2e2", color: "black", borderColor: "#333333" }} as="a" href={"https://github.com/PokeMMO-Tools/pokemmo-hub"} target="_blank"><TbBrandGithub />Opensource Github</Button>
    )
}

export const PokeMMOButton = ({link}) => {
    return (
        <Button size="sm" style={{ backgroundColor: "#ffcb05", color: "black", borderColor: "#ffcb05" }} as="a" href={link} target="_blank">PokeMMO</Button>
    )
}


export const ForumButton = () => (
    <Button size="sm" style={{ backgroundColor: "#5f5f5f", color: "white", borderColor: "#5f5f5f" }} as="a" href="https://forums.pokemmo.com/index.php?/topic/157107-website-pokemmo-hub-tools-economy-investment-cosmetics-guides/" target="_blank">Our Forum Post</Button>
)

export const HelpTranslateButton = () => {
    const { t } = useTranslations()
    return (
        <Button size="sm" style={{ backgroundColor: "#b97fc9", color: "white", borderColor: "#b97fc9" }} as="a" href="https://crowdin.com/project/pokemmohub" target="_blank">{t('help us translate')}</Button>
    )
}