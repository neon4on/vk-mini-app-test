import React from 'react';
import { Tabbar, TabbarItem } from '@vkontakte/vkui';
import { Icon28NewsfeedOutline, Icon28UserCircleOutline } from '@vkontakte/icons';

interface TabsProps {
  activeTab: string;
  onChange: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onChange }) => {
  return (
    <Tabbar>
      <TabbarItem
        selected={activeTab === 'placeholder'}
        onClick={() => onChange('placeholder')}
        text="Placeholder">
        <Icon28NewsfeedOutline />
      </TabbarItem>
      <TabbarItem
        selected={activeTab === 'profile'}
        onClick={() => onChange('profile')}
        text="Профиль">
        <Icon28UserCircleOutline />
      </TabbarItem>
    </Tabbar>
  );
};

export default Tabs;
