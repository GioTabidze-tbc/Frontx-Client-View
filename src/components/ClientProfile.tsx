import { useState } from 'react';
import {
  ComboButton,
  MenuItem,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  IconButton,
} from '@carbon/react';
import {
  UserAccess,
  Compare,
  CollapseAll,
  DataBlob,
  DataClass,
  ChevronUp,
  ChevronDown,
  Edit,
  Information,
  User,
  Earth,
  Gift,
  Email,
  Building,
  Phone,
} from '@carbon/icons-react';

import clientPhoto from '../assets/client-photo.svg';

type RowIconProps = {
  size?: number;
};

const TbcEmployeeWarningIcon = ({ size = 16 }: RowIconProps) => (
  <svg
    width={size}
    height={(size * 15) / 16}
    viewBox="0 0 16 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    focusable="false"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden="true"
  >
    <path d="M7.15649 8.30823C7.22458 9.01684 7.26241 9.37903 6.71014 9.98529C6.13519 10.6152 4.69779 11.7726 3.23014 12.6544C2.60979 13.0323 1.77004 13.4811 1.13457 13.7173C0.66552 13.8984 0.272128 13.9693 0.075432 13.615C-0.053177 13.3867 0.00734484 13.1741 0.075432 12.993C0.589868 11.5521 2.05752 8.8515 3.01831 7.10357C3.11666 6.92248 3.22257 6.74139 3.32092 6.55243C4.8037 3.89904 6.7631 0.647273 7.14893 0.12762C7.20188 0.0488845 7.3078 -0.0377244 7.39858 0.0173904C7.47423 0.0646316 7.47423 0.159114 7.46667 0.229976C7.46667 0.237849 7.44397 0.332332 7.42884 0.3717C6.80093 3.05658 6.86901 5.68634 7.15649 8.30823Z" fill="#0AAFFF" />
    <path d="M9.15897 9.27969C8.53862 8.98049 8.21332 8.83089 7.98636 8.02779C7.75184 7.20107 7.50219 5.32717 7.50219 3.55563C7.50219 2.81551 7.54758 1.8392 7.66106 1.14633C7.75184 0.626672 7.88801 0.232995 8.28141 0.232995C8.53863 0.232995 8.68237 0.398339 8.80341 0.547937C9.74906 1.72897 11.247 4.40597 12.2305 6.15389C12.3288 6.32711 12.4272 6.5082 12.5331 6.69717C14.0007 9.35842 15.7256 12.7519 15.9677 13.3582C16.0055 13.4448 16.0282 13.5786 15.9299 13.6416C15.8542 13.681 15.7786 13.6337 15.7256 13.5944C15.718 13.5865 15.6499 13.5156 15.6273 13.492C13.7057 11.5788 11.4891 10.3269 9.15897 9.27969Z" fill="#0AAFFF" />
    <path d="M7.54714 10.6617C8.10697 10.2523 8.39445 10.0397 9.17367 10.2286C9.97558 10.4334 11.6626 11.1498 13.1379 12.0317C13.7506 12.4017 14.545 12.9371 15.067 13.3859C15.4453 13.7245 15.71 14.0394 15.5133 14.3937C15.3847 14.6221 15.1805 14.6772 14.9913 14.7087C13.5312 14.9685 10.5505 14.9843 8.61384 15C8.41715 15 8.21288 15 8.00862 15C5.05818 14.9921 1.37391 14.8504 0.745997 14.7638C0.655214 14.7559 0.53417 14.7087 0.53417 14.5906C0.53417 14.504 0.609823 14.4489 0.670345 14.4252C0.685475 14.4252 0.776258 14.3937 0.806519 14.3859C3.356 13.6143 5.5121 12.2443 7.54714 10.6617Z" fill="#0AAFFF" />
  </svg>
);

const clientData = {
  name: 'გუა ტაბიძე',
  details: {
    col1: [
      { icon: TbcEmployeeWarningIcon, label: 'თიბისის თანამშრომელი', highlight: true },
      { icon: Building, label: '57001024292' },
      { icon: Gift, label: '8 ოქტომბერი, 1993, 34 წლის' },
    ],
    col2: [
      { icon: User, label: 'მამრობითი' },
      { icon: Earth, label: 'მოქალაქეობა, საქართველო' },
      { icon: Building, label: 'მენარმე' },
    ],
    col3: [
      { icon: Phone, label: '+995 (555) 00 55 61', action: 'edit' as const },
      { icon: Email, label: 'guatabidze@gmail.com', action: 'edit' as const },
      { icon: User, label: 'ბანკირი: ანა ალადაშვილი', action: 'info' as const },
    ],
  },
};

const tabs = [
  { label: 'მთავარი', icon: UserAccess },
  { label: 'ოპერაციები', icon: Compare },
  { label: 'პროდუქტები', icon: CollapseAll },
  { label: 'სერვისები', icon: DataBlob },
  { label: 'კავშირები', icon: DataClass },
];

const ClientProfile = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="client-profile">
      <div className="client-profile__header">
        <div className="client-profile__name-row">
          <h2 className="client-profile__name">{clientData.name}</h2>
          <button
            type="button"
            className="client-profile__toggle"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? 'შეკუმშვა' : 'გაშლა'}
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
        <div className="client-profile__actions">
          <ComboButton
            className="combo-btn--secondary"
            label="კლიენტის ცვლილება"
            size="md"
            tooltipAlignment="bottom"
          >
            <MenuItem label="კლიენტის რედაქტირება" onClick={() => {}} />
            <MenuItem label="კლიენტის წაშლა" kind="danger" onClick={() => {}} />
          </ComboButton>
          <ComboButton
            label="სსგს გადამოწმება"
            size="md"
            tooltipAlignment="bottom"
          >
            <MenuItem label="ანგარიშის გახსნა" onClick={() => {}} />
            <MenuItem label="ბარათის შეკვეთა" onClick={() => {}} />
            <MenuItem label="სესხის განაცხადი" onClick={() => {}} />
          </ComboButton>
        </div>
      </div>

      <div
        className={`client-profile__details ${isExpanded ? 'client-profile__details--open' : 'client-profile__details--closed'}`}
      >
        <div className="client-profile__details-inner">
          <div className="client-profile__photo">
            <img src={clientPhoto} alt={clientData.name} />
          </div>
          <div className="client-profile__info-grid">
            <div className="client-profile__info-col">
              {clientData.details.col1.map((item, i) => (
                <div key={i} className={`client-profile__info-row ${item.highlight ? 'client-profile__info-row--highlight' : ''}`}>
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <div className="client-profile__info-col">
              {clientData.details.col2.map((item, i) => (
                <div key={i} className="client-profile__info-row">
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <div className="client-profile__info-col">
              {clientData.details.col3.map((item, i) => (
                <div key={i} className="client-profile__info-row">
                  <item.icon size={16} />
                  <span>{item.label}</span>
                  {item.action === 'edit' && (
                    <IconButton kind="ghost" size="sm" label="რედაქტირება" align="top">
                      <Edit size={16} />
                    </IconButton>
                  )}
                  {item.action === 'info' && (
                    <IconButton kind="ghost" size="sm" label="ინფორმაცია" align="top">
                      <Information size={16} />
                    </IconButton>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="client-profile__tabs">
        <Tabs>
          <TabList aria-label="კლიენტის სექციები">
            {tabs.map((tab) => (
              <Tab key={tab.label}>
                <span className="client-profile__tab-label">
                  <tab.icon size={16} />
                  <span>{tab.label}</span>
                </span>
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {tabs.map((tab) => (
              <TabPanel key={tab.label} />
            ))}
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default ClientProfile;
