import React from 'react';
import { Form } from 'react-bootstrap';
import { useTranslations } from '../../context/TranslationsContext';
import { POKEMON } from '../../utils/pokemon';
import { Typography } from '../Atoms';
import { CosmeticList } from './CosmeticList';

export const CosmeticsFilter = ({ selectedClothes, onCosmeticSelect, cosmeticsArrays }) => {
    const { t } = useTranslations();

    return (
        <div>
            <div className='d-flex flex-wrap flex-basis-1 mb-2' style={{ gap: '.8rem' }}>
                {
                    Object.keys(cosmeticsArrays)
                        .map(slotId => {
                            return (
                                cosmeticsArrays[slotId]
                                    ? <CosmeticList cosmeticsArrays={cosmeticsArrays} key={slotId} slotId={slotId} onCosmeticSelect={onCosmeticSelect} selectedClothes={selectedClothes[slotId]} />
                                    : null

                            )
                        })
                }
                <div className='d-flex align-items-end' style={{ gap: '.5rem' }}>
                    <div>
                        <Typography as="p" className='text-muted mb-0' style={{ fontSize: '.8rem' }}>Followers</Typography>
                        <Form.Select
                            size="sm"
                            style={{ width: 'auto' }}
                            onChange={({ target }) => onCosmeticSelect('follower', target.value.toLowerCase())}
                        >
                            <option value="">---</option>
                            {
                                POKEMON
                                    .sort((a, b) => {
                                        return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
                                    })
                                    .map(({ name, id }) => (
                                        <option key={id} value={name}>{t(name)}</option>
                                    ))
                            }
                        </Form.Select>
                    </div>
                    <Form.Check
                        inline
                        name="encounter-type"
                        type='checkbox'
                        id="shiny"
                        label="Shiny"
                        onChange={event => onCosmeticSelect('shiny', event.target.checked)}
                    />
                </div>
            </div>
        </div >
    )
}
