import { Link } from 'gatsby';
import React from 'react';
import { Stack } from 'react-bootstrap';
import { DEFAULT_CLOTHES, getCosmeticInfo, getCosmeticSetupImage } from '../../utils/items';
import { Button, Card, Typography } from '../Atoms';
import { AvatarList } from '../Cosmetics/AvatarList';

export const ItemCosmetic = ({ id }) => {
    const cosmeticInfo = getCosmeticInfo(id);
    const clothesWithSelectedCosmetic = {
        ...DEFAULT_CLOTHES,
        [cosmeticInfo.slot]: id
    }
    const clothes = getCosmeticSetupImage(clothesWithSelectedCosmetic)
    return (
        <>
            <Card>
                <Stack direction='horizontal' className="justify-content-between align-items-center">
                    <Typography as="h4">Cosmetic preview</Typography>
                    <Button as={Link} to="/tools/cosmetics/" size="sm" variant="info">Cosmetics Helper</Button>
                </Stack>
                <AvatarList images={clothes} />
            </Card>
        </>
    )
}
