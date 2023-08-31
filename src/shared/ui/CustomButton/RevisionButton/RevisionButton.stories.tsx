import { ComponentStory, ComponentMeta } from '@storybook/react';
// import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
// import { Theme } from 'shared/contexts/ThemeProvider';

import { RevisionButton } from './RevisionButton';

export default {
  title: 'shared/CustomButton/RevisionButton',
  component: RevisionButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof RevisionButton>;

const Template: ComponentStory<typeof RevisionButton> = (args) => <RevisionButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};
// Primary.decorators = [ThemeDecorator(Theme.LIGHT)];
