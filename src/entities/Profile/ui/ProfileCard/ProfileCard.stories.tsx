import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { ProfileCard } from './ProfileCard';

export default {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  data: {
    firstname: 'Ivan',
    lastname: 'Ivanov',
    age: 32,
    city: 'Moscow',
    username: 'admin',
    avatar: '',
  },
};

export const WithError = Template.bind({});
WithError.args = {
  error: 'Error',
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};

export const Dark = Template.bind({});
Dark.args = {
  data: {
    firstname: 'Ivan',
    lastname: 'Ivanov',
    age: 32,
    city: 'Moscow',
    username: 'admin',
    avatar: '',
  },
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
