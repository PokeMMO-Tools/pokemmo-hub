import React from 'react';
import { useTranslations } from '../context/TranslationsContext';
import { Typography } from './Atoms';

export function PageTitle({ credits, children, className = 'mb-3 mt-2', callToAction = false }) {
    const { t } = useTranslations();
    return (
        <div className={className}>
            {
                typeof children === "string"
                    ? <Typography as="h1">{t(children)}</Typography>
                    : children
            }
            {
                credits
                    ? <div className="justify-content-between d-flex flex-wrap mb-3" style={{ gap: ".5rem" }}>
                        <Typography className='text-muted mb-0'>{t(credits)}</Typography>
                        {
                            callToAction ? callToAction : false
                        }
                    </div>
                    : false
            }


        </div>
    )
}