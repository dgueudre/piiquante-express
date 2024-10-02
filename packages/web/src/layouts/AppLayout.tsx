import { FC, PropsWithChildren } from 'react';

import { Header } from '../components/Header';
import './AppLayout.css';

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <footer>Pied de page</footer>
    </div>
  );
};
