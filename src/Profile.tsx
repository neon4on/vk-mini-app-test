import React from 'react';
import { UserInfo } from '@vkontakte/vk-bridge';
import { Group, Avatar, Text, PanelHeader, PanelHeaderButton, Div } from '@vkontakte/vkui';
import {
  Icon28MoonOutline,
  Icon28SunOutline,
  Icon20PlaceOutline,
  Icon20UserOutline,
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
  if (!user) return null;

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
      <Group>
        <Div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}>
          <Avatar src={user.photo_200} size={100} style={{ marginBottom: 20 }} />
          <Text weight="1" style={{ marginBottom: 8, fontSize: '20px' }}>
            {`${user.first_name} ${user.last_name}`}
          </Text>
          {user.city && (
            <Text
              style={{
                marginBottom: 8,
                color: 'var(--vkui--color_text_secondary)',
                display: 'flex',
                alignItems: 'center',
              }}>
              <Icon20PlaceOutline style={{ marginRight: 4 }} />
              {user.city.title}
            </Text>
          )}
          <Text
            onClick={onOpenProfile}
            style={{
              color: 'var(--vkui--color_accent_blue)',
              cursor: 'pointer',
              marginTop: 8,
              display: 'flex',
              alignItems: 'center',
            }}>
            <Icon20UserOutline style={{ marginRight: 4 }} />
            Открыть профиль
          </Text>
        </Div>
      </Group>
    </>
  );
};

export default Profile;
