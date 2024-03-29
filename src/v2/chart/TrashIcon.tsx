import React, { useRef, useState } from 'react'
import { Box } from '@mui/material'
import HoverGraphic from '../components/HoverGraphic';

interface Props {
    handleOnClick: () => void;
}

function TrashIcon({handleOnClick} : Props) {

    const [ onHover, setOnHover ] = useState<boolean>(false);
    const [ mouseRef, setMouseRef ] = useState<HTMLElement | null>(null);
    const containerRef = useRef(null);

    const handleMouseOver = (event: React.MouseEvent<HTMLElement>)=> {
        setMouseRef(event.currentTarget);
        setOnHover(true);
    };

    const handleMouseLeave = () => {
        setMouseRef(null);
        setOnHover(false);
    };
    
    return (
        <Box 
            className="svg-container"
            onMouseOver={handleMouseOver} 
            onMouseLeave={handleMouseLeave}
            aria-owns={onHover ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
        >
            <svg className="svg-clickable" id="trash-icon" onClick={handleOnClick} xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
                <g clipPath="url(#clip0_2724_7305)">
                    <path d="M3.6125 2L4.49375 0.5875C4.72188 0.222031 5.12187 0 5.55312 0H8.44687C8.87812 0 9.27813 0.222031 9.50625 0.5875L10.3875 2H13.75C13.8875 2 14 2.11188 14 2.25C14 2.38812 13.8875 2.5 13.75 2.5H0.25C0.111937 2.5 0 2.38812 0 2.25C0 2.11188 0.111937 2 0.25 2H3.6125ZM4.2 2H9.8L9.08125 0.8525C8.94375 0.633125 8.70312 0.5 8.44687 0.5H5.55312C5.29688 0.5 5.05625 0.633125 4.91875 0.8525L4.2 2ZM1.25 3.5C1.38812 3.5 1.5 3.6125 1.5 3.75V13.75C1.5 14.7156 2.28344 15.5 3.25 15.5H10.75C11.7156 15.5 12.5 14.7156 12.5 13.75V3.75C12.5 3.6125 12.6125 3.5 12.75 3.5C12.8875 3.5 13 3.6125 13 3.75V13.75C13 14.9937 11.9937 16 10.75 16H3.25C2.0075 16 1 14.9937 1 13.75V3.75C1 3.6125 1.11188 3.5 1.25 3.5ZM4.25 13C4.25 13.1375 4.1375 13.25 4 13.25C3.8625 13.25 3.75 13.1375 3.75 13V5C3.75 4.8625 3.8625 4.75 4 4.75C4.1375 4.75 4.25 4.8625 4.25 5V13ZM7.25 13C7.25 13.1375 7.1375 13.25 7 13.25C6.8625 13.25 6.75 13.1375 6.75 13V5C6.75 4.8625 6.8625 4.75 7 4.75C7.1375 4.75 7.25 4.8625 7.25 5V13ZM10.25 13C10.25 13.1375 10.1375 13.25 10 13.25C9.8625 13.25 9.75 13.1375 9.75 13V5C9.75 4.8625 9.8625 4.75 10 4.75C10.1375 4.75 10.25 4.8625 10.25 5V13Z" fill="black"/>
                </g>
                <defs>
                    <clipPath id="clip0_2724_7305">
                        <rect width="14" height="16" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
            <HoverGraphic 
                visible={onHover} 
                anchorRef={mouseRef}
                handleClose={handleMouseLeave}
            >
                Remove
            </HoverGraphic>
        </Box>
    )
}

export default TrashIcon