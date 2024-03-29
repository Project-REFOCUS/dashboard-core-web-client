import React, { useState, useEffect } from 'react'
import { 
    Autocomplete,
    AutocompleteChangeReason,
    Box,
    Button,
    Popper
} from '@mui/material'
import { DownArrow } from './CustomIcons';
import '../styles/components/multiButton.scss';

interface Props<T> {
    value: T[];
    itemList: T[];
    handleOnChange: (event: React.SyntheticEvent<Element, Event>, values: T[], reason: AutocompleteChangeReason) => void;
}

function MultiButton<T>({itemList, handleOnChange, value} : Props<T>){

    const [ isLoading, setIsLoading ] = useState<boolean>(true);

    useEffect(()=>{
        if(itemList && itemList.length > 0) {
            setIsLoading(false);
        }
    },[itemList]);

    return (
        <Autocomplete
            className={isLoading? "input-loading" : ""}
            multiple
            options={itemList}
            filterSelectedOptions
            disableListWrap
            onChange={(event, values, reason) => handleOnChange(event, values as T[], reason)}
            value={value}
            renderInput={(params) => (
                <Box ref={params.InputProps.ref}>
                    {/* @ts-ignore */}
                    <Button 
                        {...params.inputProps}
                        variant="contained"
                        endIcon={<DownArrow />}
                        sx={{background: 'var(--blue-2, #00AEEF)'}}
                        color='primary'
                        size="small"
                        href=""
                        disabled={itemList.length === 0}
                    >
                    Add
                    </Button>
                    {/*Prevents a revealing console log error expecting an input element*/}
                    <input {...params.inputProps} style={{ display: 'none' }} />
                </Box>
            )}
            PopperComponent={(props) => (
                <Popper {...props} style={{ zIndex: 9999}}>
                  {props.children}
                </Popper>
              )}
        />
    )
}

export default MultiButton