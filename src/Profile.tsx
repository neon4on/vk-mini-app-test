import React from 'react';
import { UserInfo } from '@vkontakte/vk-bridge';
import { Group, Avatar, Button, Div, Text, PanelHeader, PanelHeaderButton } from '@vkontakte/vkui';
import {
  Icon28MoonOutline,
  Icon28SunOutline,
  Icon28LogoVkColor,
  Icon28LogoVkOutline,
} from '@vkontakte/icons';

interface ProfileProps {
  user: UserInfo | null;
  onOpenProfile: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onOpenProfile, theme, toggleTheme }) => {
  return (
    <>
      <PanelHeader
        before={
          <PanelHeaderButton onClick={toggleTheme}>
            {theme === 'light' ? <Icon28MoonOutline /> : <Icon28SunOutline />}
          </PanelHeaderButton>
        }>
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
          }}>
          {theme === 'light' ? <Icon28LogoVkColor /> : <Icon28LogoVkOutline />}
          <span style={{ marginLeft: '4px' }}>UI</span>
        </div>
      </PanelHeader>
      {user && (
        <Group>
          <Div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}>
            <Avatar src={user.photo_200} size={100} style={{ marginBottom: 20 }} />
            <Text weight="medium" style={{ marginBottom: 8 }}>
              {`${user.first_name} ${user.last_name}`}
            </Text>
            {user.city && <Text style={{ marginBottom: 8 }}>{user.city.title}</Text>}
            <Button onClick={onOpenProfile} size="m">
              Перейти в профиль
            </Button>
          </Div>
        </Group>
      )}
    </>
  );
};

export default Profile;
