import React from 'react'
import { useState } from 'react';
import { GithubPicker } from 'react-color'
import { useDarkMode } from '../../context/DarkModeContext';
import { InterfaceItems } from '../../interface/items';
import { Button } from '../Atoms';

export const SwatchColorPicker = ({ onUpdateClothesColor }) => {
    const [togglePicker, setTogglePicker] = useState(false);
    const [color, setColor] = useState('rgb(252,252,252)');
    const { isDark } = useDarkMode();

    const { dyeColors } = InterfaceItems

    const onChangeColor = color => {
        const { r, g, b } = color.rgb
        const { id } = getSelectedColor([r, g, b])
        setColor(color.hex)
        onUpdateClothesColor(id)
    }

    const getSelectedColor = rgb => dyeColors.find(color => color.rgb.join() === rgb.join());

    return (
        <Button className="position-relative p-0" variant="link" onClick={() => setTogglePicker(!togglePicker)} style={{ zIndex: togglePicker ? 9 : 1 }}>
            <div style={{ backgroundColor: color, width: '1.8rem', height: '1.8rem', borderRadius: '5px', border: `3px solid ${isDark ? 'white' : 'black'}` }}></div>
            {
                togglePicker
                    ? <div className="position-absolute" style={{ zIndex: 9, right: 0, top: 36 }}>
                        <GithubPicker
                            width='235px'
                            triangle='top-right'
                            colors={dyeColors.map(item => `rgb(${item.rgb.join(',')})`)}
                            onChangeComplete={onChangeColor}
                        />
                    </div>
                    : false
            }
        </Button>
    )
}
