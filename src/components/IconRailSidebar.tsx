import { Home, ContainerSoftware, FeaturePicker, Product, Folders, User, SettingsServices } from '@carbon/icons-react';
import type { ComponentType } from 'react';

interface NavItem {
  icon: ComponentType<{ size?: number }>;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: ContainerSoftware, label: 'Container Software', href: '/container' },
  { icon: FeaturePicker, label: 'Features', href: '/features' },
  { icon: Product, label: 'Products', href: '/products' },
  { icon: Folders, label: 'Folders', href: '/folders' },
  { icon: User, label: 'Users', href: '/users' },
  { icon: SettingsServices, label: 'Settings', href: '/settings' },
];

const IconRailSidebar = () => {
  return (
    <nav aria-label="Primary navigation" className="icon-rail-sidebar">
      <ul className="icon-rail-list">
        {navItems.map(({ icon: Icon, label, href }) => (
          <li key={href}>
            <a href={href} className="icon-rail-link" aria-label={label} title={label}>
              <Icon size={20} />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default IconRailSidebar;
