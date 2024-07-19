import React, { useState, useEffect } from 'react';
import { Group, PanelHeader, SimpleCell, Text, Avatar, PanelHeaderBack } from '@vkontakte/vkui';

interface Friend {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface AllFriendsProps {
  onBack: () => void;
}

const AllFriends: React.FC<AllFriendsProps> = ({ onBack }) => {
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFriends(data);
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
    <>
      <PanelHeader before={<PanelHeaderBack onClick={onBack} />}>Друзья</PanelHeader>
      <Group>
        {friends.map((friend) => (
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
      </Group>
    </>
  );
};

export default AllFriends;
