import React from 'react'
import { Stack } from 'react-bootstrap'
import { Typography } from '../Atoms'
import { useTranslations } from '../../context/TranslationsContext'

export const BerryDetails = (berry) => {
    const { t } = useTranslations()
    return (
        <Stack>
            <Typography as="span">{t('Grow time: ')} {berry.grow_time}{t('h')}</Typography>
            <Typography as="span">{t('Return: ')}{berry.min_harvest} {t('to')} {berry.max_harvest} {t('berries')}.</Typography>
        </Stack>
    )
}
