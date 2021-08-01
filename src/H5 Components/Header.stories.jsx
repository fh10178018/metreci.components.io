import React from 'react';
import base from 'paths.macro';
import { Header } from './Header';

export default {
  title: `${base.replace('/src/', '')}Header`,
  component: Header,
};

const Template = (args) => <Header {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {},
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
