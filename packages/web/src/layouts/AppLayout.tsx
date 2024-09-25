import { FC, PropsWithChildren } from 'react';

import { Header } from '../components/Header';

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <footer>Pied de page</footer>
    </div>
  );
};
