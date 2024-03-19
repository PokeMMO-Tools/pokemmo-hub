import React from 'react';
import Select from 'react-select';
import { useDarkMode } from '../../context/DarkModeContext';

export const Search = ({ items = [{ value: 0, label: 'No data loaded' }], hasEmpty = false, ...props }) => {
    const { isDark } = useDarkMode()
    return (
        <Select
            {...props}
            options={hasEmpty ? [{ value: 0, label: '---' }, ...items] : items}
            styles={{
                container: (baseStyles, state) => ({
                    ...baseStyles,
                    width: "100%"
                }),
                dropdownIndicator: (baseStyles, state) => ({
                    ...baseStyles,
                    padding: '4px'
                }),
                control: (baseStyles, state) => (
                    isDark
                        ? {
                            ...baseStyles,
                            ...baseStyle,
                            ...baseControlStyle,
                            ...darkModeStyle
                        }
                        : { ...baseStyles, ...baseControlStyle, ...baseStyle }
                ),
                input: (baseStyles) => (
                    isDark
                        ? {
                            ...baseStyles,
                            color: 'white'
                        }
                        : { ...baseStyles }
                ),
                singleValue: (baseStyles) => (
                    isDark
                        ? {
                            ...baseStyles,
                            color: 'white'
                        }
                        : { ...baseStyles }
                ),
                menu: (baseStyles) => (
                    isDark
                        ? {
                            ...baseStyles,
                            ...baseStyle,
                            ...darkModeStyle
                        }
                        : { ...baseStyles, ...baseStyle }
                ),
                option: (baseStyles, state) => (
                    isDark
                        ? {
                            ...baseStyles,
                            ...darkModeStyle,
                            fontSize: '.8rem',
                            backgroundColor: state.isFocused ? darkModeStyle.hoverBackgroundColor : null
                        }
                        : { ...baseStyles, fontSize: '.8rem' }
                ),
            }}
        />
    )
}

const baseControlStyle = {
    minHeight: 0,
    lineHeight: 1
}

const darkModeStyle = {
    backgroundColor: '#212529',
    color: '#f8f9fa',
    lineColor: '#343a40',
    hoverBackgroundColor: '#343a40'
}

const baseStyle = {
    fontSize: '1rem',
    fontWeight: 400,
    color: "#212529",
    backgroundColor: "#fff",
    border: "1px solid #ced4da",
    borderRadius: ".375rem",
    minWidth: 250
}