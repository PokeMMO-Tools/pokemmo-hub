import React, { useRef, useState } from 'react'
import { ButtonGroup, Form, Toast as ToastBS } from 'react-bootstrap'
import { Button, Card, Toast, Typography } from '../../components/Atoms'
import { BreedingList } from '../../components/Breeding/BreedingList'
import { FormItemBreeding } from '../../components/Breeding/FormItemBreeding'
import { Information } from '../../components/Information'
import { Page } from '../../components/Page'
import { PageTitle } from '../../components/PageTitle'
import { Seo } from '../../components/SEO'
import { useBreeding } from '../../context/BreedingContext'
import { useTranslations } from '../../context/TranslationsContext'

const Breeding = ({ pageContext }) => {
    const form = useRef()
    const [isError, setIsError] = useState(false);
    const { breedingConfig, setBreedingConfig, clearBreeding, BREEDING_FORM_VALUES } = useBreeding();
    const { t } = useTranslations()
    const PAGE_TITLE = "Breeding simulator"
    if (!breedingConfig) return;

    const startBreeding = () => {
        const ivs = (({ iv1, iv2, iv3, iv4, iv5 }) => ({ iv1, iv2, iv3, iv4, iv5 }))(form.current);
        if (!isStatsUniq(ivs))
            return setIsError(true);

        const { iv1, iv2, iv3, iv4, iv5 } = ivs

        setBreedingConfig({
            isBreeding: true,
            iv: {
                1: !iv1.disabled ? iv1.value : false,
                2: !iv2.disabled ? iv2.value : false,
                3: !iv3.disabled ? iv3.value : false,
                4: !iv4.disabled ? iv4.value : false,
                5: !iv5.disabled ? iv5.value : false,
            }
        });
    }

    const onClear = () => {
        clearBreeding();
        form.current.iv1.value = 'hp'
        form.current.iv2.value = 'atk'
        form.current.iv3.value = 'def'
        form.current.iv4.value = 'spdef'
        form.current.iv5.value = 'spe'
    }

    const isStatsUniq = (ivs) => {
        let values = [];
        for (const key in ivs) {
            if (Object.hasOwnProperty.call(ivs, key)) {
                if (!ivs[key].disabled) {
                    values.push(ivs[key].value)
                }
            }
        }
        return !values
            .some((value, index, values) => values.indexOf(value) !== index);

    }

    const updateIVsCount = count => {
        setBreedingConfig({ ivsCount: count, isBreeding: false })
    }

    const breedingIVsRequested = breedingConfig.nature
        ? BREEDING_FORM_VALUES.nature.iv[breedingConfig.ivsCount]
        : BREEDING_FORM_VALUES.random.iv[breedingConfig.ivsCount]

    const totalPokemonReq = breedingIVsRequested.reduce((total, curr) => total + curr, 0)
    const costsTable = {
        nature: {
            iv: {
                2: 75000,
                3: 170000,
                4: 355000,
                5: 715000
            }
        },
        random: {
            iv: {
                2: 20000,
                3: 65000,
                4: 155000,
                5: 340000
            }
        }
    }
    const expectedPrice = breedingConfig.nature
        ? costsTable.nature.iv[breedingConfig.ivsCount]
        : costsTable.random.iv[breedingConfig.ivsCount]


    return (
        <Page breadcrumbs={pageContext.breadcrumb} label={PAGE_TITLE}>
            <PageTitle>{t(PAGE_TITLE)}</PageTitle>
            <Information title={t("How to use the breeding tool")}>
                {t("breedingToolExplanationModal")}
            </Information>
            <Form ref={form} className="d-flex mb-3 flex-column" style={{ gap: '.5rem' }}>
                <div className='d-flex' style={{ gap: '1rem' }}>
                    <div className='d-flex flex-column' style={{ gap: '.3rem' }}>
                        <Form.Text className="text-muted">{t("How many IVs do you want?")}</Form.Text>
                        <ButtonGroup aria-label="Basic example">
                            <Button disabled={breedingConfig.ivsCount === 2} onClick={() => updateIVsCount(2)}>2</Button>
                            <Button disabled={breedingConfig.ivsCount === 3} onClick={() => updateIVsCount(3)}>3</Button>
                            <Button disabled={breedingConfig.ivsCount === 4} onClick={() => updateIVsCount(4)}>4</Button>
                            <Button disabled={breedingConfig.ivsCount === 5} onClick={() => updateIVsCount(5)}>5</Button>
                        </ButtonGroup>
                    </div>
                    <div className="d-flex flex-column" style={{ gap: '.3rem' }}>
                        <Form.Text className='text-muted'>{t("Consider nature in breeding project?")}</Form.Text>
                        <Form.Check
                            key="natureSwitch"
                            type="switch"
                            id="nature"
                            checked={breedingConfig.nature}
                            onChange={
                                () => setBreedingConfig({ nature: !breedingConfig.nature })
                            }
                        />
                    </div>
                </div>
                <div className='d-flex flex-wrap' style={{ gap: '1.5rem' }}>
                    {
                        breedingIVsRequested.map((count, i) => {
                            let index = i + 1;
                            return (
                                <FormItemBreeding
                                    key={i}
                                    id={`iv${index}`}
                                    defaultValue={
                                        breedingConfig.iv[index] || 'hp'
                                    }
                                    ivCount={count}
                                    className={count === 0 ? 'd-none' : null}
                                />
                            )
                        })
                    }
                </div>
            </Form>
            <Card body className="my-3">
                {t(
                    'breedingExplanation',
                    null,
                    <Typography highlight>{expectedPrice}$</Typography>,
                    <Typography highlight>{totalPokemonReq}</Typography>
                )}
                <Typography className='mb-0'>
                    {t('breedingExplanation2')}
                </Typography>
            </Card>
            <div className='d-flex' style={{ gap: '1rem' }}>
                <Button onClick={startBreeding}>{t("Start breeding")}</Button>
                <Button variant='outline-danger' onClick={onClear}>{t("Clear")}</Button>
            </div>
            {
                breedingConfig.isBreeding ? <BreedingList></BreedingList> : null
            }
            <Toast bg="danger" show={isError} onClose={() => setIsError(false)} delay={3000} autohide style={{ position: 'fixed', bottom: 25, left: 25 }}>
                <ToastBS.Body>{t("You can't have the same stats in multiple IVs field.")}</ToastBS.Body>
            </Toast>
        </Page>
    )
}

export default Breeding


const description = "A guide for breeding in PokeMMO. The calculator will show you a pattern easy to follow. Select how many IVs do you need and enjoy the solution."
export const Head = () => <Seo title="Breeding Guide Simulator" description={description}></Seo>
