import { FC, PropsWithChildren } from 'react';

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <header>En-tête de l'application</header>
      <nav>Navigation</nav>
      <main>{children}</main>
      <footer>Pied de page</footer>
    </div>
  );
};
