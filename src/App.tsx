import React, { useState, useEffect } from 'react';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import {
  View,
  Panel,
  ScreenSpinner,
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  SplitLayout,
  SplitCol,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Profile from './Profile';
import Flashlight from './Flashlight';

const App: React.FC = () => {
  const [activePanel, setActivePanel] = useState<string>('home');
  const [fetchedUser, setUser] = useState<UserInfo | null>(null);
  const [popout, setPopout] = useState<React.ReactNode | null>(<ScreenSpinner size="large" />);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isFlashlightOn, setIsFlashlightOn] = useState<boolean>(false);

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

  const toggleTheme = (): void => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const openProfile = (): void => {
    if (fetchedUser) {
      bridge
        .send('VKWebAppOpenProfile', { user_id: fetchedUser.id })
        .then(() => console.log('Profile opened successfully'))
        .catch((error) => console.error('Failed to open profile:', error));
    }
  };

  const toggleFlashlight = async (): Promise<void> => {
    try {
      await bridge.send('VKWebAppFlashSetLevel', { level: isFlashlightOn ? 0 : 1 });
      setIsFlashlightOn((prevState) => !prevState);
    } catch (error) {
      console.error('Failed to toggle flashlight:', error);
    }
  };

  return (
    <ConfigProvider appearance={theme}>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout popout={popout}>
            <SplitCol>
              <View activePanel={activePanel}>
                <Panel id="home" separator={false}>
                  <Profile
                    user={fetchedUser}
                    onOpenProfile={openProfile}
                    theme={theme}
                    toggleTheme={toggleTheme}
                  />
                  <Flashlight isOn={isFlashlightOn} toggle={toggleFlashlight} />
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
