import { ComponentStory, ComponentMeta } from '@storybook/react';
// import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
// import { Theme } from 'shared/contexts/ThemeProvider';

import { ViewModal } from './ViewModal';

export default {
  title: 'shared/CustomModal/ViewModal',
  component: ViewModal,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ViewModal>;

const Template: ComponentStory<typeof ViewModal> = (args) => <ViewModal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};
// Primary.decorators = [ThemeDecorator(Theme.LIGHT)];
