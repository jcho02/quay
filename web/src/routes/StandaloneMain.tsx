import {Banner, Flex, FlexItem, Page} from '@patternfly/react-core';

import {Navigate, Outlet, Route, Routes} from 'react-router-dom';

import {QuayHeader} from 'src/components/header/QuayHeader';
import {QuaySidebar} from 'src/components/sidebar/QuaySidebar';
import {NavigationPath} from './NavigationPath';
import OrganizationsList from './OrganizationsList/OrganizationsList';
import Organization from './OrganizationsList/Organization/Organization';
import RepositoriesList from './RepositoriesList/RepositoriesList';
import RepositoryTagRouter from './RepositoryTagRouter';

import {useEffect} from 'react';
import ErrorBoundary from 'src/components/errors/ErrorBoundary';
import {useQuayConfig} from 'src/hooks/UseQuayConfig';
import SiteUnavailableError from 'src/components/errors/SiteUnavailableError';
import NotFound from 'src/components/errors/404';
import {useCurrentUser} from 'src/hooks/UseCurrentUser';
import {InfoCircleIcon} from '@patternfly/react-icons';
import axios from 'axios';
import axiosIns from 'src/libs/axios';
import Alerts from './Alerts';

const NavigationRoutes = [
  {
    path: NavigationPath.organizationsList,
    Component: <OrganizationsList />,
  },
  {
    path: NavigationPath.organizationDetail,
    Component: <Organization />,
  },
  {
    path: NavigationPath.repositoriesList,
    Component: <RepositoriesList organizationName={null} />,
  },
  {
    path: NavigationPath.repositoryDetail,
    Component: <RepositoryTagRouter />,
  },
];

export function StandaloneMain() {
  axios.defaults.baseURL =
    process.env.REACT_QUAY_APP_API_URL ||
    `${window.location.protocol}//${window.location.host}`;
  axiosIns.defaults.baseURL = axios.defaults.baseURL;

  const quayConfig = useQuayConfig();
  const {loading, error} = useCurrentUser();


  useEffect(() => {
    if (quayConfig?.config?.REGISTRY_TITLE) {
      document.title = quayConfig.config.REGISTRY_TITLE;
    }
  }, [quayConfig]);

  if (loading) {
    return null;
  }
  return (
    <ErrorBoundary hasError={!!error} fallback={<SiteUnavailableError />}>
      <Page
        header={<QuayHeader />}
        sidebar={<QuaySidebar />}
        style={{height: '100vh'}}
        isManagedSidebar
        defaultManagedSidebarIsOpen={true}
      >
        <Banner variant="info">
          <Flex
            spaceItems={{default: 'spaceItemsSm'}}
            justifyContent={{default: 'justifyContentCenter'}}
          >
            <FlexItem>
              <InfoCircleIcon />
            </FlexItem>
            <FlexItem>
              Please use{' '}
              <a
                href={quayConfig?.config?.UI_V2_FEEDBACK_FORM}
                target="_blank"
                rel="noreferrer"
              >
                this form
              </a>{' '}
              to provide feedback on your experience
            </FlexItem>
          </Flex>
        </Banner>
        <Alerts/>
        <Routes>
          <Route index element={<Navigate to="/organization" replace />} />
          {NavigationRoutes.map(({path, Component}, key) => (
            <Route path={path} key={key} element={Component} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Outlet />
      </Page>
    </ErrorBoundary>
  );
}
