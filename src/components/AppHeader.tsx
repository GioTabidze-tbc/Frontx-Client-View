import { useState } from 'react';
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderMenuButton,
  SideNav,
  SideNavItems,
  SideNavMenu,
  SideNavMenuItem,
  SideNavLink,
  SkipToContent,
} from '@carbon/react';
import { Search, Notification, UserAvatar } from '@carbon/icons-react';

const AppHeader = () => {
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);

  const onClickSideNavExpand = () => {
    setIsSideNavExpanded((prev) => !prev);
  };

  return (
    <Header aria-label="TBC Platform">
      <SkipToContent />
      <HeaderMenuButton
        aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
        onClick={onClickSideNavExpand}
        isActive={isSideNavExpanded}
      />
      <HeaderName href="/" prefix="IBM">
        TBC Platform
      </HeaderName>
      <HeaderNavigation aria-label="Main navigation">
        <HeaderMenuItem href="/dashboard">Dashboard</HeaderMenuItem>
        <HeaderMenuItem href="/resources">Resources</HeaderMenuItem>
        <HeaderMenuItem href="/docs">Documentation</HeaderMenuItem>
      </HeaderNavigation>
      <HeaderGlobalBar>
        <HeaderGlobalAction aria-label="Search" onClick={() => {}}>
          <Search size={20} />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="Notifications" onClick={() => {}}>
          <Notification size={20} />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="User profile" onClick={() => {}}>
          <UserAvatar size={20} />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
      <SideNav
        aria-label="Side navigation"
        expanded={isSideNavExpanded}
        onSideNavBlur={onClickSideNavExpand}
        href="#main-content"
        onOverlayClick={onClickSideNavExpand}
      >
        <SideNavItems>
          <SideNavLink href="/dashboard">Overview</SideNavLink>
          <SideNavLink href="/analytics">Analytics</SideNavLink>
          <SideNavMenu title="Management">
            <SideNavMenuItem href="/users">Users</SideNavMenuItem>
            <SideNavMenuItem href="/teams">Teams</SideNavMenuItem>
            <SideNavMenuItem href="/roles">Roles</SideNavMenuItem>
          </SideNavMenu>
          <SideNavMenu title="Configuration">
            <SideNavMenuItem href="/settings">Settings</SideNavMenuItem>
            <SideNavMenuItem href="/integrations">Integrations</SideNavMenuItem>
          </SideNavMenu>
          <SideNavLink href="/support">Support</SideNavLink>
        </SideNavItems>
      </SideNav>
    </Header>
  );
};

export default AppHeader;
