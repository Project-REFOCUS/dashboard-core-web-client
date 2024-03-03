import React, { useState, useEffect } from 'react';
import { AutocompleteChangeReason, Box, Card, Stack, Typography } from '@mui/material';
import MultiInput from '../components/MultiInput';
import { fetchSubGeographies } from '../common/services';
import FilterCard from '../components/FilterCard';
import { Geography } from '../common/types';
import { GeographyEnum } from '../common/enum';

import '../styles/stateSection/sidebarFilter.scss';
import { observer } from 'mobx-react';
import AppStore from '../stores/AppStore';

interface Props {
    state: Geography;
    handleGeoOnChange: (geographies: Geography[], removedIndex: number, reason: AutocompleteChangeReason) => void;
    handleFilterOnChange: (filters: GeographyEnum[], index: number) => void;
}

const SidebarFilter = observer(({state, handleGeoOnChange, handleFilterOnChange} : Props) => {

    const [ itemList, setItemList ] = useState<Geography[]>([]);
    const [ selectedItems, setSelectedItems ] = useState<Geography[]>([]);

    const [ subFiltersArray, setSubFiltersArray ] = useState<GeographyEnum[][]>([]);

    useEffect(() => {
        fetchSubGeographies(
            AppStore.category ? AppStore.category.id : null, 
            state.id, 
            GeographyEnum.COUNTY
        ).then(counties => setItemList(counties));
    }, []);

    const countyOnChange = (values: Geography[], removedIndex: number, reason: AutocompleteChangeReason) => {
        setSelectedItems([...values]);

        if(reason == "removeOption" && removedIndex !== -1){
            if(subFiltersArray[removedIndex]?.length > 0){
                setSubFiltersArray((prevFiltersArray) => {
                    prevFiltersArray[removedIndex].splice(removedIndex, 1);
                    return [...prevFiltersArray];
                });
            }
        }else if(reason == "clear"){
            setSubFiltersArray([]);
        }

        handleGeoOnChange(values, removedIndex, reason);
    }

    const handleSubFilterChange = (values: GeographyEnum[], index: number) => {
        setSubFiltersArray((prevFiltersArray) => {
            prevFiltersArray[index] = values;
            return [...prevFiltersArray];
        });
        handleFilterOnChange(values, index);
    }

    const filterCards = selectedItems.map((county, index) => 
        <FilterCard geography={county} color="#DA5FB0" key={county.id} handleOnChange={(values)=> handleSubFilterChange(values, index)} selectedItems={subFiltersArray[index]}/>
    );

    return (
        <Box className="sidebar-panel">
            <Card elevation={0}>
                <Stack spacing={1}>
                    <Typography id="state-section-header">{state.name}</Typography>
                    <Box>
                        <MultiInput title={GeographyEnum.COUNTY} itemList={itemList} handleOnChange={countyOnChange}/>
                    </Box>
                    {filterCards}
                </Stack>
            </Card>
        </Box>
    )
});

export default SidebarFilter