import { Tooltip } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import React, { forwardRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { TbClock } from 'react-icons/tb';

const TooltipButton = forwardRef(function TooltipButton(props, ref) {
    return <Button {...props} ref={ref} size="sm" className='ms-2 py-0 px-1'>{props.children}</Button>
})

export const BerryTimeChanger = ({ label, onSelectDate, value }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [buttonAnchor, setButtonAnchor] = useState(null)

    const handleClick = (event) => {
        setIsOpen((isOpen) => !isOpen);
        setButtonAnchor(event.currentTarget);
    };

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker
                    label="Date&Time picker"
                    open={isOpen}
                    PopperProps={{
                        placement: "bottom-end",
                        anchorEl: buttonAnchor
                    }}
                    closeOnSelect={true}
                    disableFuture={true}
                    onClose={() => setIsOpen(false)}
                    onChange={({ _d }) => onSelectDate(_d.getTime())}
                    value={value}
                    renderInput={() => (
                        <Tooltip title={label}>
                            <TooltipButton onClick={handleClick}>
                                <TbClock />
                            </TooltipButton>
                        </Tooltip>
                    )}
                />
            </LocalizationProvider>
        </>
    )
}
