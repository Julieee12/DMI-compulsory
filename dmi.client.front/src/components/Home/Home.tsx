import React, { FC } from 'react';
import { HomeWrapper } from './Home.styled';

interface HomeProps {}

class Home extends React.Component<HomeProps> {
    render = () => (
        <HomeWrapper>
            Home Component
        </HomeWrapper>
    );
}

export default Home;
