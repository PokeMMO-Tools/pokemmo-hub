import React from 'react'
import { Form } from 'react-bootstrap'
import { useTranslations } from '../../context/TranslationsContext'

export const FilterCheck = ({ value, onChange, data, title, id }) => {
    const { t } = useTranslations()
    return (
        <Form.Group>
            <div>
                <Form.Text>{t("Filter by encounter type")}</Form.Text>
            </div>
            <Form.Check
                inline
                name={id}
                type='radio'
                id="0"
                label={t("All")}
                value={false}
                checked={!value}
                onChange={({ target }) => onChange(target.id)}
            />
            {
                data.map(({ key, label }) => (
                    <Form.Check
                        inline
                        key={key}
                        name={id}
                        type='radio'
                        id={key}
                        label={t(label)}
                        checked={value === parseInt(key)}
                        onChange={({ target }) => onChange(target.id)}
                    />
                ))
            }
        </Form.Group>
    )
}
