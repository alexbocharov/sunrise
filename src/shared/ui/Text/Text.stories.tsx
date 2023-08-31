import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

import { Text, TextSize, TextVariant } from './Text';

export default {
  title: 'shared/Text',
  component: Text,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Title lorem lorem',
  text: 'Text lorem lorem',
};

export const Error = Template.bind({});
Error.args = {
  title: 'Title lorem lorem',
  text: 'Text lorem lorem',
  variant: TextVariant.ERROR,
};

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
  title: 'Title lorem lorem',
};

export const OnlyText = Template.bind({});
OnlyText.args = {
  text: 'Text lorem lorem',
};

export const Dark = Template.bind({});
Dark.args = {
  title: 'Title lorem lorem',
  text: 'Text lorem lorem',
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTitleDark = Template.bind({});
OnlyTitleDark.args = {
  title: 'Title lorem lorem',
};
OnlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTextDark = Template.bind({});
OnlyTextDark.args = {
  text: 'Text lorem lorem',
};
OnlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const PrimaryL = Template.bind({});
PrimaryL.args = {
  title: 'Title lorem lorem',
  text: 'Text lorem lorem',
  size: TextSize.L,
};
