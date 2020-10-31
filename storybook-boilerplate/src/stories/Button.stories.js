import React from 'react';

import { Button } from './Button';

export default {
  // use slash to organize stories like file directory
  // e.g. title: 'My Group / My Sub Group /Button story',
  title: 'Example/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => <Button {...args} />;

// each template export is a story, separted function object created by .bind()
// all stories of this component will be gathered in "Docs" page
// ℹ️ FIRST export story will has prop control UIs
export const Primary = Template.bind({});
Primary.args = {
  // default props for a story
  primary: true,
  label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};

// variable name should be camal case for story title
export const TestSmallButtonStory = Template.bind({});
TestSmallButtonStory.args = {
  size: 'small',
  label: 'Button',
};
