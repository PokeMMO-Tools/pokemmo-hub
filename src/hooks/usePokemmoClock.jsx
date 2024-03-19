import React from 'react';

function getPokeMMOTime(oraReale, minutiReale) {
    var rapporto = 4;
    var oreNostroMondo = 24;
    var hour = ((oraReale - 1) * rapporto) % 24
    var hoursInMinutes = parseInt(minutiReale / 15)
    hour = hour + hoursInMinutes
    var minutes = (minutiReale % 15) * rapporto


    console.log(hour, parseInt(minutes))
}

export const usePokemmoClock = () => {
    return (
        <div>usePokemmoClock</div>
    )
}
