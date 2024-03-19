import React, { useEffect, useState } from 'react'
import { Form, Spinner } from 'react-bootstrap'
import { usePokedex } from '../../context/PokedexContext'
import { useTranslations } from '../../context/TranslationsContext'
import { useDelay } from '../../hooks/useDelay'
import { getEncounterTriggers, getEncounterType, getRegions, getTypes, getRoute } from '../../utils/location'
import { getEggGroups } from '../../utils/pokemon'
import { Button } from '../Atoms'
import { ActionToggler } from './ActionToggler'
import { FilterSelect } from './FilterSelect'

const ACTIONS = {
    REGIONS: "region",
    ROUTE: "route",
    EGG_GROUP: "eggGroup",
    ENCOUNTER_TRIGGER: 'encounterTrigger',
    ENCOUNTER_TYPE: 'encounterType',
    TYPE: 'type'
}

export const PokedexFilters = ({ prefilter }) => {
    const { filters, setFilters, resetFilters, setActiveTab, TABS } = usePokedex()
    const [name, setName] = useState(prefilter)
    const [isSearching, doneSearching] = useDelay(150)
    const { t } = useTranslations();

    const regions = getRegions();
    const routes = getRoute(filters.region)
    const eggGroups = getEggGroups()
    const encounterTriggers = getEncounterTriggers()
    const encounterType = getEncounterType()
    const types = getTypes()

    function translateArrayLabel(array) {
        for (let i = 0; i < array.length; i++) {
            array[i].label = t(array[i].label)
        }
    }

    translateArrayLabel(regions)
    translateArrayLabel(routes)
    translateArrayLabel(eggGroups)
    translateArrayLabel(encounterTriggers)
    translateArrayLabel(encounterType)
    translateArrayLabel(types)

    routes.sort((a, b) => a.label.localeCompare(b.label))

    useEffect(() => {
        doneSearching(() => setFilters(prev => ({ ...prev, name })));
    }, [name])

    useEffect(() => {
        setFilters(prev => ({ ...prev, route: false }))
    }, [filters.region])

    if (!filters) return;

    const updateFilters = (action, value) => {
        setFilters(prev => (
            {
                ...prev,
                [action]: value !== 'false' ? value : false
            }
        ))
    }

    return (
        <div className='mb-5'>
            <Form className="mb-1" onSubmit={e => e.preventDefault()}>
                <div className="d-flex mb-2 flex-wrap" style={{ gap: '.5rem' }}>
                    <Form.Group controlId='region' className="position-relative">
                        <Form.Text>
                            {t("Name")}
                        </Form.Text>
                        <Form.Control
                            value={name}
                            type="text"
                            placeholder={t("Pokemon Name")}
                            onChange={({ target }) => setName(target.value)}
                        />
                        <div className="position-absolute" style={{ right: 10, bottom: 6, display: isSearching ? 'initial' : 'none' }} >
                            <Spinner animation="border" role="status" variant="info" size="sm">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    </Form.Group>
                    <FilterSelect
                        value={filters.region}
                        onChange={({ target }) => updateFilters(ACTIONS.REGIONS, target.value)}
                        data={regions}
                        placeholder={"Select a region"}
                        title={"Region"}
                    />
                    {
                        filters.region
                            ?
                            <>
                                <FilterSelect
                                    value={filters.route}
                                    onChange={({ target }) => updateFilters(ACTIONS.ROUTE, target.value)}
                                    data={routes}
                                    placeholder={"Select a route"}
                                    title={"Routes"}
                                />
                            </>
                            : false
                    }
                    <FilterSelect
                        value={filters.eggGroup}
                        onChange={({ target }) => updateFilters(ACTIONS.EGG_GROUP, target.value)}
                        data={eggGroups}
                        placeholder={"Select an Egg Group"}
                        title={"Egg Group"}
                    />
                    <FilterSelect
                        value={filters.encounterTrigger}
                        onChange={({ target }) => updateFilters(ACTIONS.ENCOUNTER_TRIGGER, target.value)}
                        data={encounterTriggers}
                        placeholder="Select an encounter trigger"
                        title="Filter by encounter trigger"
                    />
                    <FilterSelect
                        value={filters.encounterType}
                        onChange={({ target }) => updateFilters(ACTIONS.ENCOUNTER_TYPE, target.value)}
                        data={encounterType}
                        placeholder="Select an encounter type"
                        title="Filter by encounter type"
                    />
                    <FilterSelect
                        value={filters.type}
                        onChange={({ target }) => updateFilters(ACTIONS.TYPE, target.value)}
                        data={types}
                        placeholder="Select a pokemon type"
                        title="Filter by pokemon type"
                    />
                </div>
            </Form>
            <div className="d-flex mt-3 flex-wrap" style={{ gap: '.5rem' }}>
                <ActionToggler
                    size="md"
                    title={t("locations")}
                    onClick={() => setActiveTab(prev => prev !== TABS.LOCATION ? TABS.LOCATION : false)}
                />
                <ActionToggler
                    size="md"
                    title={t("catch rates")}
                    onClick={() => setActiveTab(prev => prev !== TABS.CATCH_RATE ? TABS.CATCH_RATE : false)}
                />
                <ActionToggler
                    size="md"
                    title={t("stats")}
                    onClick={() => setActiveTab(prev => prev !== TABS.STATS ? TABS.STATS : false)}
                />
                <Button variant="outline-danger" onClick={resetFilters}>{t("Clear")}</Button>
            </div>
        </div>
    )
}