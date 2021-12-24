import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

// config viewports
const viewports = {
  // breakpoints from theme
  sm_359: {
    name: 'V2: sm_360 -1px',
    styles: {
      height: '640px',
      width: '359px',
    },
    type: 'mobile',
  },
  sm_360: {
    name: 'V2: sm_360',
    styles: {
      height: '640px',
      width: '360px',
    },
    type: 'mobile',
  },
  sm_767: {
    name: 'V2: sm_768 -1px',
    styles: {
      height: '1112px',
      width: '767px',
    },
    type: 'mobile',
  },
  sm_768: {
    name: 'V2: sm_768',
    styles: {
      height: '1112px',
      width: '768px',
    },
    type: 'tablet',
  },
  md_1020: {
    name: 'V2: md_1020',
    styles: {
      height: '1112px',
      width: '1020px',
    },
    type: 'tablet',
  },
  lg_1375: {
    name: 'V2: lg_1375',
    styles: {
      height: '1112px',
      width: '1375px',
    },
    type: 'desktop',
  },
  lg_1680: {
    name: 'V2: lg_1680',
    styles: {
      height: '1112px',
      width: '1680px',
    },
    type: 'desktop',
  },
  // https://github.com/storybookjs/storybook/blob/next/addons/viewport/src/defaults.ts
  ...INITIAL_VIEWPORTS,
}

export default viewports
