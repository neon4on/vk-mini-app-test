import React, { useState, useEffect } from 'react';
import { Group, Cell, Switch, Text } from '@vkontakte/vkui';
import { Icon28LightbulbOutline } from '@vkontakte/icons';
import bridge from '@vkontakte/vk-bridge';

interface FlashlightProps {
  isOn: boolean;
  toggle: () => void;
}

const Flashlight: React.FC<FlashlightProps> = ({ isOn, toggle }) => {
  const [isSupported, setIsSupported] = useState<boolean>(false);

  useEffect(() => {
    async function checkFlashlightSupport() {
      try {
        const result = await bridge.send('VKWebAppFlashGetInfo');
        setIsSupported(result.is_available);
      } catch (error) {
        console.error('Failed to check flashlight support:', error);
        setIsSupported(false);
      }
    }
    checkFlashlightSupport();
  }, []);

  return (
    <Group>
      <Cell
        before={<Icon28LightbulbOutline />}
        after={<Switch disabled={!isSupported} checked={isOn} onChange={toggle} />}
        multiline>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Text weight="1">Больше света!</Text>
          <Text
            style={{
              color: 'var(--vkui--color_text_secondary)',
              fontSize: '14px',
              marginTop: '4px',
            }}>
            {isSupported ? 'На телефоне включится фонарик' : 'Функция не поддерживается'}
          </Text>
        </div>
      </Cell>
    </Group>
  );
};

export default Flashlight;
