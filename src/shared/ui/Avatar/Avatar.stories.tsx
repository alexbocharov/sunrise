import { ComponentStory, ComponentMeta } from '@storybook/react';

import AvatarImg from 'shared/assets/tests/avatar.jpg';
import { Avatar } from './Avatar';

export default {
  title: 'shared/Avatar',
  component: Avatar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  src: AvatarImg,
  alt: 'avatar',
  size: 150,
};

export const Small = Template.bind({});
Small.args = {
  src: AvatarImg,
  alt: 'avatar',
  size: 50,
};
