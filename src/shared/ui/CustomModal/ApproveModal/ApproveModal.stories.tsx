import { ComponentStory, ComponentMeta } from '@storybook/react';
// import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
// import { Theme } from 'shared/contexts/ThemeProvider';

import { ApproveModal } from './ApproveModal';

export default {
  title: 'shared/CustomModal/ApproveModal',
  component: ApproveModal,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ApproveModal>;

const Template: ComponentStory<typeof ApproveModal> = (args) => <ApproveModal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};
// Primary.decorators = [ThemeDecorator(Theme.LIGHT)];
