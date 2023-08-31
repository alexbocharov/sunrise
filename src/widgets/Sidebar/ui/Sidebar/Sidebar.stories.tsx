import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Sidebar } from './Sidebar';

export default {
  title: 'widgets/Sidebar',
  component: Sidebar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => <Sidebar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};
Primary.decorators = [StoreDecorator(
  {
    user: {
      authData: {
        id: '1',
        username: 'admin',
      },
    },
  },
)];

export const Dark = Template.bind({});
Dark.args = {
};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator(
  {
    user: {
      authData: {
        id: '1',
        username: 'admin',
      },
    },
  },
)];

export const NoAuth = Template.bind({});
NoAuth.args = {
};
NoAuth.decorators = [StoreDecorator(
  {
    user: {
      authData: undefined,
    },
  },
)];
