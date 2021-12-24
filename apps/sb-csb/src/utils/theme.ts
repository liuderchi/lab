import { css } from 'styled-components'

// ========= media query related ==========
export const BREAKPOINT_ZERO = 'xs_0'
export const BREAKPOINT_MOBILE_S = 'xs_321'
export const BREAKPOINT_MOBILE_L = 'xs_488'
export const BREAKPOINT_TABLET_S = 'sm_768'
export const BREAKPOINT_TABLET_M = 'md_836'
export const BREAKPOINT_DESKTOP_S = 'md_1050'
export const BREAKPOINT_DESKTOP_L = 'lg_1264'

// ========= media query related V2 ==========
export const BREAKPOINT_MOBILE_S_V2 = 'sm_360'
export const BREAKPOINT_MOBILE_L_V2 = 'sm_768'
export const BREAKPOINT_TABLET_V2 = 'md_1020'
export const BREAKPOINT_DESKTOP_V2 = 'lg_1375'
export const BREAKPOINT_DESKTOP_L_V2 = 'lg_1680'

// ========= media query related V2 for Grid Gutter and Layout ==========
export const GUTTER_X_BREAKPOINTS_V2 = {
  [BREAKPOINT_ZERO]: 16,
  [BREAKPOINT_MOBILE_S_V2]: 20,
  [BREAKPOINT_TABLET_V2]: 32,
}
export const GUTTER_Y_BREAKPOINTS_V2 = {
  [BREAKPOINT_ZERO]: 20,
  [BREAKPOINT_MOBILE_L_V2]: 32,
  [BREAKPOINT_TABLET_V2]: 40,
}
export const GRID_COLUMN_LAYOUTS_V2 = {
  cellPerRow: {
    [BREAKPOINT_ZERO]: 2,
    [BREAKPOINT_MOBILE_L_V2]: 4,
  },
  gutterX: GUTTER_X_BREAKPOINTS_V2,
  gutterY: GUTTER_Y_BREAKPOINTS_V2,
}

export const SRP_GRID_COLUMN_LAYOUTS_V2 = {
  cellPerRow: {
    [BREAKPOINT_ZERO]: 2,
    [BREAKPOINT_MOBILE_L_V2]: 3,
    [BREAKPOINT_TABLET_V2]: 4,
  },
  gutterX: GUTTER_X_BREAKPOINTS_V2,
  gutterY: GUTTER_Y_BREAKPOINTS_V2,
}

const baseTheme = {
  colors: {
    main: '#7759ff',
    bg: '#f7f8ff',
    // new colors schema referencing material-ui
    // https://material-ui.com/customization/default-theme/#default-theme
    text: {
      light: '#828c93',
      main: '#232a31',
      dark: '#1d2228',
    },
    border: {
      main: '#e0e4e9',
    },
    grey: {
      light: '#f1f1f5',
      main: '#979ea8',
      dark: '#5b636a',
    },
    info: '#007aff',
    success: '#1ac567',
    warning: '#ffa700',
    error: '#ff4d52',
    radio: {
      bg: '#007aff',
    },
    button: {
      primary: {
        default: {
          bg: '#ffbc4b',
        },
        disabled: {
          bg: '#f0f3f5',
          text: '#c7cdd2',
        },
        hover: {
          bg: '#ffa748',
        },
      },
      secondary: {
        default: {
          border: '#ffbc4b',
        },
        disabled: {
          border: '#c7cdd2',
          text: '#c7cdd2',
        },
        hover: {
          bg: '#f4bc4b',
        },
      },
      pills: {
        default: {
          bg: '#cdf567',
        },
      },
    },
  },
  button: {
    height: {
      lg: 46,
      default: 36,
      sm: 28,
    },
    fontSize: {
      lg: 16,
      default: 14,
      sm: 12,
    },
  },
  breakpoints: {
    // ========= V1 ==========
    [BREAKPOINT_ZERO]: 0,
    [BREAKPOINT_MOBILE_S]: 321,
    [BREAKPOINT_MOBILE_L]: 488,
    [BREAKPOINT_TABLET_S]: 768,
    [BREAKPOINT_TABLET_M]: 836,
    [BREAKPOINT_DESKTOP_S]: 1050,
    [BREAKPOINT_DESKTOP_L]: 1264,
    // ========= V2 ==========
    [BREAKPOINT_MOBILE_S_V2]: 360,
    [BREAKPOINT_MOBILE_L_V2]: 768,
    [BREAKPOINT_TABLET_V2]: 1020,
    [BREAKPOINT_DESKTOP_V2]: 1375,
    [BREAKPOINT_DESKTOP_L_V2]: 1680,
  },
  zIndex: {
    TOAST: 5000,
    MODAL: 4000,
    DIALOG: 3000,
    MENU: 2100,
    MASK: 995,
    UH: 1000,
    STICKYNAV: 990,
    SCROLLTOTOP: 500,
    RIBBON: 400,
  },
}

export const inTheKnowTheme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    main: '#ffbc4b',
    success: '#57ba09',
    warning: '#ffbc4b',
    error: '#ef2b22',
  },
}
export const marketplaceTheme = {
  ...baseTheme,
  colors: {
    main: '#ffa700',
    brand: '#7759FF',
    bg: '#f0f3f5',
    border: {
      main: '#e0e4e9',
    },
    text: {
      light: '#6e7780',
      main: '#232a31',
      dark: '#232a31',
    },
    grey: {
      light: '#f0f3f5',
      main: '#6e7780',
      dark: '#464e56',
    },
    input: {
      default: {
        labelColor: '#6e7780',
        border: '#828a93',
      },
      hover: {
        labelColor: '#232a31',
        border: '#0f69ff',
      },
      active: {
        labelColor: '#0f69ff',
        color: '#232a31',
        border: '#0f69ff',
      },
      filled: {
        color: '#6e7780',
      },
      disabled: {
        labelColor: '#6e7780',
        color: '#b0b9c1',
        border: '#b0b9c1',
        bg: '#f6f8fa',
      },
    },
    radio: {
      bg: '#232a31',
      border: '#828a93',
    },
    button: {
      ...baseTheme.colors.button,
      primary: {
        default: {
          bg: '#232a31',
          text: '#fff',
        },
        disabled: {
          bg: '#f0f3f5',
          text: '#b0b9c1',
        },
        hover: {
          bg: '#464e56',
        },
      },
      secondary: {
        default: {
          border: '#e0e4e9',
        },
        disabled: {
          text: '#b0b9c1',
          border: '#e0e4e9',
        },
        hover: {
          bg: '#fff',
          border: '#464e56',
        },
      },
    },
    pill: {
      default: {
        text: '#232a31',
        bg: '#f0f3f5',
        border: '#f0f3f5',
        hover: {
          border: '#232a31',
        },
      },
      selected: {
        text: '#fff',
        bg: '#232a31',
        hover: {
          bg: '#464e56',
        },
      },
    },
    info: '#007aff',
    success: '#00ab5e',
    warning: '#ff8b12',
    error: '#eb0f29',
  },
  button: {
    ...baseTheme.button,
    height: {
      lg: 44,
      default: 36,
      sm: 28,
    },
    borderRadius: {
      lg: 23,
      default: 18,
      sm: 18,
    },
  },
}

export const globalCSS = css`
  /* stylelint-disable value-no-vendor-prefix */
  /* stylelint-disable property-no-vendor-prefix */
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .ellipsis_multi_2 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .ellipsis_multi_3 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  .ellipsis_multi_4 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
  }

  .ellipsis_multi_6 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6;
  }

  .ellipsis_multi_7 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 7;
  }

  /* Fuji Elevation styles */
  .elevation-1 {
    transition: box-shadow 0.2s ease-in-out;
    &:hover {
      box-shadow: 0 1px 0 0 #e0e4e9, 0 0 1px 0 rgba(0, 0, 0, 0);
    }
  }
  .elevation-2 {
    transition: box-shadow 0.2s ease-in-out;
    &:hover {
      box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.1), 0 2px 4px 0 rgba(0, 0, 0, 0.08);
    }
  }
  .elevation-3 {
    transition: box-shadow 0.2s ease-in-out;
    &:hover {
      box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.08), 0 4px 8px 0 rgba(0, 0, 0, 0.1);
    }
  }
  .elevation-4 {
    transition: box-shadow 0.2s ease-in-out;
    &:hover {
      box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.05), 0 4px 16px 0 rgba(0, 0, 0, 0.2);
    }
  }
  .elevation-5 {
    transition: box-shadow 0.2s ease-in-out;
    &:hover {
      box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.05),
        0 32px 32px 20px rgba(0, 0, 0, 0.4);
    }
  }

  /* Safari image fix */
  .safari-crop-transform {
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
  }

  /* Zoom in image on hover */
  .image-zoom-in {
    img {
      transition: all 0.3s ease-in-out;
    }
    &:hover img {
      transform: scale(1.05);
    }
  }

  .unstyled-link,
  .unstyled-link:active {
    text-decoration: none;
  }

  .enable-focus-outline {
    button {
      :focus {
        outline: 2px solid black;
      }
    }

    a {
      :focus {
        outline: 2px solid black;
      }
    }
  }
`

export default inTheKnowTheme
