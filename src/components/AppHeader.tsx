import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderMenuButton,
  HeaderSideNavItems,
  SideNav,
  SideNavItems,
  SideNavLink,
  SkipToContent,
} from '@carbon/react';
import {
  Review,
  CollapseAll,
  Notification,
  UserProfile,
  Home,
  ContainerSoftware,
  FeaturePicker,
  Product,
  Folders,
  User,
  SettingsServices,
} from '@carbon/icons-react';
import logo from '../assets/logo.svg';

const AppHeader = () => {
  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <Header aria-label="TBC Platform">
          <SkipToContent />
          <HeaderMenuButton
            aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
            aria-expanded={isSideNavExpanded}
          />
          <HeaderName href="/" prefix="">
            <img src={logo} alt="frontx" style={{ height: '46px' }} />
          </HeaderName>
          <HeaderGlobalBar>
            <HeaderGlobalAction aria-label="Review" onClick={() => {}}>
              <Review size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction aria-label="Collapse all" onClick={() => {}}>
              <span className="header-icon-badge-wrapper">
                <CollapseAll size={20} />
                <span className="header-badge" />
              </span>
            </HeaderGlobalAction>
            <HeaderGlobalAction aria-label="Notifications — 7 unread" onClick={() => {}}>
              <span className="header-icon-badge-wrapper">
                <Notification size={20} />
                <span className="header-badge header-badge--count" aria-hidden="true">7</span>
              </span>
            </HeaderGlobalAction>
            <HeaderGlobalAction aria-label="User profile" onClick={() => {}}>
              <UserProfile size={20} />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
          <SideNav
            aria-label="Side navigation"
            expanded={isSideNavExpanded}
            onSideNavBlur={onClickSideNavExpand}
            href="#main-content"
            onOverlayClick={onClickSideNavExpand}
            isRail
          >
            <SideNavItems>
              {isSideNavExpanded && (
                <HeaderSideNavItems hasDivider={true} />
              )}
              <SideNavLink renderIcon={Home} href="/">
                Home
              </SideNavLink>
              <SideNavLink renderIcon={ContainerSoftware} href="/container">
                Container Software
              </SideNavLink>
              <SideNavLink renderIcon={FeaturePicker} href="/features">
                Features
              </SideNavLink>
              <SideNavLink renderIcon={Product} href="/products">
                Products
              </SideNavLink>
              <SideNavLink renderIcon={Folders} href="/folders">
                Folders
              </SideNavLink>
              <SideNavLink renderIcon={User} href="/users">
                Users
              </SideNavLink>
              <SideNavLink renderIcon={SettingsServices} href="/settings">
                Settings
              </SideNavLink>
            </SideNavItems>
          </SideNav>
        </Header>
      )}
    />
  );
};

export default AppHeader;
