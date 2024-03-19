import React from 'react';
import { Image } from 'react-bootstrap';
import { DEFAULT_CLOTHES, getCosmeticInfo, getCosmeticSetupImage } from '../../utils/items';

const getAvatarImage = (id) => {
    const cosmeticInfo = getCosmeticInfo(id);
    const clothesWithSelectedCosmetic = {
        ...DEFAULT_CLOTHES,
        [cosmeticInfo.slot]: id
    }
    const clothes = getCosmeticSetupImage(clothesWithSelectedCosmetic)
    // Is cosmetic for back
    if (cosmeticInfo.slot === 6)
        return clothes.find(({ name }) => name === "Back").url

    return clothes.find(({ name }) => name === 'Front').url;
}

export const ItemImage = ({ category, id, tradeListing }) => {

    return (
        category === 6 && tradeListing                                  //cosmetic image
            ? <div className='cosmetic-image-cropper' style={{ height: "35px", width: "40px" }}>
                <Image src={getAvatarImage(id)} style={{ height: "60px", width: "60px" }} ></Image>
            </div>
            :
            tradeListing && id == 9999                                  //money image
                ?
                <Image src={`/item/${id}.png`} style={{ height: "30px", width: "30px" }}></Image>
                :
                tradeListing                                               //any other image in trade ad listings
                    ?
                    <Image src={`/item/${id}.png`} style={{ height: "30px", width: "30px", marginRight: '10px' }}></Image>
                    :
                    category === 6                                          //normal cosmetic image for other pages
                        ?
                        <div className='cosmetic-image-cropper' style={{ height: "24px", width: "24px" }}>
                            <Image src={getAvatarImage(id)}></Image>
                        </div>
                        :                                                   //normal item image for other pages
                        <Image src={`/item/${id}.png`}></Image>

    )
}
