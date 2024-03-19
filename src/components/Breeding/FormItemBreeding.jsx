import React from 'react'
import { Form } from 'react-bootstrap'
import { useTranslations } from '../../context/TranslationsContext'
import { Typography } from '../Atoms'

export function FormItemBreeding({ id, ivCount, defaultValue, ...props }) {
    const { t } = useTranslations();
    return (
        <Form.Group controlId={id} {...props} style={{ flexGrow: 1 }}>
            <Form.Text className="text-muted">
                <Typography className='fw-bold fs-5 d-inline-block me-2 mb-0'>{ivCount}</Typography>
                {t('1x31 IV in...')}
            </Form.Text>
            <Form.Select defaultValue={defaultValue} disabled={!ivCount}>
                <option value="hp">{t('HP')}</option>
                <option value="atk">{t('Attack')}</option>
                <option value="def">{t('Defense')}</option>
                <option value="spatk">{t('Sp. Attack')}</option>
                <option value="spdef">{t('Sp. Defense')}</option>
                <option value="spe">{t('Speed')}</option>
            </Form.Select>
        </Form.Group>
    )
}
