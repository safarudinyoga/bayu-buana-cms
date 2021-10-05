import useMediaQuery from '@material-ui/core/useMediaQuery';
import DekstopLayout from './dekstop';
import MobileLayout from './mobile';

function Layout({ children }) {
  const dekstop = useMediaQuery('(min-width:600px)');
  return (
    <>
      {dekstop ? (
        <DekstopLayout>{children}</DekstopLayout>
      ) : (
        <MobileLayout>{children}</MobileLayout>
      )}
    </>
  );
}

export default Layout;
