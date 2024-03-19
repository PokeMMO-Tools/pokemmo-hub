import React, { useState } from 'react';
import { ImCross } from 'react-icons/im';

export const Announcements = ({ show }) => {
    const isShow = show
    const [isToggle, setIsToggle] = useState(true)

    function toggleShow() {
        isToggle ? setIsToggle(false) : setIsToggle(true)
    }
    return (
        <>
            {
                isToggle && isShow ?
                    <div id="banner" className="p-4 mb-2" style={{
                        position: 'relative', display: 'hidden', alignItems: 'center', justifyContent: 'between', backgroundColor: '#ffbb00', borderRadius: '10px'
                    }}>
                        <span style={{
                            display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center', color: '#000000'
                        }}>
                            Pokedex, Egg Move Calculator, and Cosmetic Helper image data updated! Price graphs of new items will be available in the coming days. Thanks for your patience.
                        </span>
                        <button id="close" className="pr-3 pt-1" onClick={toggleShow} style={{
                            position: 'absolute', display: 'hidden', alignItems: 'center', background: 'rgba(255, 122, 89, 0)', borderWidth: '0px', top: '0', right: '5px'
                        }}><ImCross></ImCross></button>
                    </div >
                    :
                    <></>
            }
        </>
    )
}
