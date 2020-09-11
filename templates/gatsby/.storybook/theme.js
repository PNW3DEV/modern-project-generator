import { create } from '@storybook/theming/create';

import logo from '../static/logo.svg'

export default create({
    base: 'light',

    brandTitle: '{{name}} Stories',
    brandUrl: `https://${process.env.PROJECT_ID}.web.app/`,
    brandImage: logo,
    // brandImage: 'https://placehold.it/350x150',

    // colorPrimary: 'hotpink',
    // colorSecondary: 'deepskyblue',

    // // UI
    // appBg: 'white',
    // appContentBg: 'silver',
    // appBorderColor: 'grey',
    // appBorderRadius: 4,
    //
    // // Typography
    // fontBase: '"Open Sans", sans-serif',
    // fontCode: 'monospace',
    //
    // // Text colors
    // textColor: 'black',
    // textInverseColor: 'rgba(255,255,255,0.9)',
    //
    // // Toolbar default and active colors
    // barTextColor: 'silver',
    // barSelectedColor: 'black',
    // barBg: 'hotpink',
    //
    // // Form colors
    // inputBg: 'white',
    // inputBorder: 'silver',
    // inputTextColor: 'black',
    // inputBorderRadius: 4,

});
