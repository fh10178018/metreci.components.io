// .storybook/YourTheme.js

import { create } from '@storybook/theming';
import logo from './logo-large.png'

export default create({
  base: 'light',
  brandTitle: 'My custom storybook',
  brandUrl: 'https://example.com',
  brandImage: logo,
});

