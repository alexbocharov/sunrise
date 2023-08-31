import { ComponentStory, ComponentMeta } from '@storybook/react';
// import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
// import { Theme } from 'shared/contexts/ThemeProvider';

import { ApproveButton } from './ApproveButton';

export default {
  title: 'shared/CustomButton/ApproveButton',
  component: ApproveButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ApproveButton>;

const Template: ComponentStory<typeof ApproveButton> = (args) => <ApproveButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};
// Primary.decorators = [ThemeDecorator(Theme.LIGHT)];
