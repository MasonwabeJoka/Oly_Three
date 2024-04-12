import {create} from 'zustand'
import styled from 'styled-components'

const TitleStyled = styled.h1`
    font-size: 3em !important;
    
    @media (max-width: 40em) {
        font-size: 2em !important;
    }
`;

type TitleStore = {
    Title: typeof TitleStyled
}

const useTitleStore = create<TitleStore>(() => ({
    Title: TitleStyled
}));

export default useTitleStore