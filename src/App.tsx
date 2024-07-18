import React, { useState, useEffect } from 'react';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import {
  View,
  Panel,
  PanelHeader,
  Group,
  Cell,
  Avatar,
  Button,
  Div,
  Text,
  PanelHeaderButton,
  ScreenSpinner,
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  SplitLayout,
  SplitCol,
  useAdaptivity,
  ViewWidth,
} from '@vkontakte/vkui';
import {
  Icon28MoonOutline,
  Icon28SunOutline,
  Icon28LogoVkColor,
  Icon28LogoVkOutline,
} from '@vkontakte/icons';
import '@vkontakte/vkui/dist/vkui.css';

const App: React.FC = () => {
  const [activePanel, setActivePanel] = useState('home');
  const [fetchedUser, setUser] = useState<UserInfo | null>(null);
  const [popout, setPopout] = useState<React.ReactNode | null>(<ScreenSpinner size="large" />);
  const [theme, setTheme] = useState('light');
  const { viewWidth } = useAdaptivity();

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await bridge.send('VKWebAppGetUserInfo');
        setUser(user);
        setPopout(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setPopout(null);
      }
    }
    fetchData();
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const openProfile = () => {
    if (fetchedUser) {
      bridge
        .send('VKWebAppOpenProfile', { user_id: fetchedUser.id })
        .then(() => console.log('Profile opened successfully'))
        .catch((error) => console.error('Failed to open profile:', error));
    }
  };

  return (
    <ConfigProvider appearance={theme}>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout popout={popout}>
            <SplitCol>
              <View activePanel={activePanel}>
                <Panel id="home">
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
                  {fetchedUser && (
                    <Group>
                      <Div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          textAlign: 'center',
                        }}>
                        <Avatar
                          src={fetchedUser.photo_200}
                          size={100}
                          style={{ marginBottom: 20 }}
                        />
                        <Text weight="medium" style={{ marginBottom: 8 }}>
                          {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
                        </Text>
                        {fetchedUser.city && (
                          <Text style={{ marginBottom: 8 }}>{fetchedUser.city.title}</Text>
                        )}
                        <Button onClick={openProfile} size="m">
                          Перейти в профиль
                        </Button>
                      </Div>
                    </Group>
                  )}
                </Panel>
              </View>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default App;
