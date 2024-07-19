import React from 'react';
import { Group, Cell, Switch } from '@vkontakte/vkui';
import { Icon28LightbulbOutline } from '@vkontakte/icons';

interface FlashlightProps {
  isOn: boolean;
  toggle: () => void;
}

const Flashlight: React.FC<FlashlightProps> = ({ isOn, toggle }) => {
  return (
    <Group>
      <Cell before={<Icon28LightbulbOutline />} after={<Switch checked={isOn} onChange={toggle} />}>
        Фонарик
      </Cell>
    </Group>
  );
};

export default Flashlight;
