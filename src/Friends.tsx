import React, { useState, useEffect } from 'react';
import { Group, Header, SimpleCell, Text, Avatar, Div, Footer } from '@vkontakte/vkui';
import { Icon24Add } from '@vkontakte/icons';

interface Friend {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface FriendsProps {
  onShowAllFriends: () => void;
}

const Friends: React.FC<FriendsProps> = ({ onShowAllFriends }) => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [totalFriends, setTotalFriends] = useState<number>(0);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFriends(data);
        setTotalFriends(data.length);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchFriends();
  }, []);

  const getGradientColor = (id: number): string => {
    const colors = ['red', 'orange', 'yellow', 'green', 'l-blue', 'violet'];
    return colors[id % 6];
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Group header={<Header mode="secondary">Друзья {totalFriends}</Header>}>
      {friends.slice(0, 4).map((friend) => (
        <SimpleCell
          key={friend.id}
          before={
            <Avatar
              size={48}
              src="#"
              initials={getInitials(friend.name)}
              gradientColor={getGradientColor(friend.id)}
            />
          }
          subtitle={
            <>
              <Text style={{ color: 'var(--vkui--color_text_secondary)' }}>{friend.email}</Text>
              <Text style={{ color: 'var(--vkui--color_text_secondary)' }}>{friend.phone}</Text>
            </>
          }
          multiline>
          <Text style={{ fontWeight: 'bold', color: 'var(--vkui--color_text_primary)' }}>
            {friend.name}
          </Text>
        </SimpleCell>
      ))}
      <Footer>
        <Text
          onClick={onShowAllFriends}
          style={{
            color: 'var(--vkui--color_accent_blue)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon24Add style={{ marginRight: 8 }} />
          Показать всех друзей
        </Text>
      </Footer>
    </Group>
  );
};

export default Friends;
