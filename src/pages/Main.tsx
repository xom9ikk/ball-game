import React, { FC } from 'react';
import { Header } from '../components/Header';
import { GameField } from '../components/GameField';

export const Main: FC = () => (
  <main>
    <Header
      title="Amaze Ball game"
      subtitle="Swipe the ball to fill all the cells with color"
    />
    <GameField />
  </main>
);
