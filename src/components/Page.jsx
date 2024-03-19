import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslations } from '../context/TranslationsContext';
import ADS_TYPE from '../data/ads.json';
import { Adsense, Announcement, Breadcrumbs } from './Atoms';
import { Announcements } from './Atoms/Announcement'


export function Page({ children, breadcrumbs, label }) {
    const { t } = useTranslations()
    return (
        <>

            <Container className="pb-5">
                <Announcements show={false} />
                <Row>
                    <Col>
                        {
                            breadcrumbs
                                ? <Breadcrumbs breadcrumbs={breadcrumbs} label={t(label)} />
                                : false
                        }
                        {children}
                    </Col>
                </Row>
            </Container>
        </>
    )
}
