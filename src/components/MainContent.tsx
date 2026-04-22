import {
  Breadcrumb,
  BreadcrumbItem,
} from '@carbon/react';
import ClientProfile from './ClientProfile';

const MainContent = () => {
  return (
    <>
      <div className="breadcrumb-bar">
        <Breadcrumb noTrailingSlash aria-label="Page breadcrumb">
          <BreadcrumbItem href="/clients">კლიენტის ხედვა</BreadcrumbItem>
          <BreadcrumbItem isCurrentPage />
        </Breadcrumb>
      </div>
      <div className="content-section">
        <ClientProfile />
      </div>
    </>
  );
};

export default MainContent;
