import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { useTranslations } from '../context/TranslationsContext'
import { Button, Modal, Typography } from './Atoms'
import { DiscordButton, ForumButton, HelpTranslateButton, GithubButton } from './Atoms/Button'
import { LanguageSwitcher } from './LanguageSwitcher'



export const Footer = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { t } = useTranslations();

    const toggleModal = () => setIsOpen(prev => !prev);

    return (
        <>
            <Container><Typography className="text-muted mb-0">By Cosmin, Fiereu, SquickGianno</Typography></Container>
            <Container className="mt-auto border-top py-2">

                <Modal
                    show={isOpen}
                    onHide={toggleModal}
                    title="PokeMMO Hub Team"
                    footer={<><GithubButton /> <DiscordButton /> <ForumButton /></>}
                >

                    <Typography>
                        we are a team of passionate pokemmo players, just like you, who have come together to create pokemmo hub! we aim to provide useful features and information for your daily pokemmo needs.
                    </Typography>
                    <Typography>
                        Developers: squickGianno, Fiereu, ColesNightfill
                    </Typography>
                    &#8203;
                    <Typography>
                        Opensource credits:
                    </Typography>
                    <Typography>
                        Thanks to boebie for developing the Multi Graph tool.
                    </Typography>
                    <Typography>
                        {t('thanks to xlirate for making significant contributions to the optimisation of our tools.')} <a href="https://github.com/xlirate" target="_blank">{t('github')}</a>
                    </Typography>
                    <Typography>
                        {t('thanks to bunga for our logo.')} <a href="https://www.instagram.com/brianmaiello_design/" target="_blank">{t('check out all his projects.')}</a>
                    </Typography>
                </Modal>
                <div className='d-flex flex-wrap align-items-center justify-content-between' style={{ gap: '.5rem' }}>
                    <div className="d-flex flex-wrap" style={{ gap: '.5rem' }}>
                        <Button size="sm" variant="success" onClick={toggleModal}>Who we are</Button>
                        <DiscordButton />
                        <ForumButton />
                    </div>
                    <div className="d-flex flex-wrap" style={{ gap: '.5rem' }}>
                        <GithubButton link="https://github.com/PokeMMO-Tools/pokemmo-hub" />
                        <HelpTranslateButton />
                        <LanguageSwitcher />
                    </div>
                </div>

            </Container>
        </>
    )
}
