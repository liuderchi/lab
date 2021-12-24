import { addons } from '@storybook/addons'
import { create } from '@storybook/theming/create'

const theme = create({
  base: 'light',
  brandTitle: '💅 sb-csb',
  brandUrl: 'https://github.com/liuderchi/lab/tree/chore/monorepo-sb-csb/apps/sb-csb',
})

addons.setConfig({ theme })
