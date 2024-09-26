import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  installModule,
  addComponentsDir,
} from '@nuxt/kit'
import { addAliases } from './tools/links'

// Module options TypeScript interface definition
export interface ModuleOptions {
  theme: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'shadcn-test',
    configKey: 'shadcn-test',
    // Add compatibility information
    compatibility: {
      nuxt: '^3.0.0',
    },
  },
  // Default configuration options of the Nuxt module
  defaults: {
    // Add default theme option
    theme: 'light',
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))

    nuxt.options.css.push(resolver.resolve('./runtime/assets/css/tailwind.css'))

    installModule('@nuxtjs/tailwindcss', {
      configPath: resolver.resolve('./runtime/tailwind.config.js'),
      exposeConfig: true,
      config: {
        content: [
          resolver.resolve('./runtime/components/**/*.{js,vue,ts}'),
          resolver.resolve('./runtime/lib/**/*.{js,ts}'),
        ],
      },
    })

    installModule('shadcn-nuxt', {
      componentDir: resolver.resolve('./runtime/components/ui'),
    })

    addComponentsDir({
      path: resolver.resolve('./runtime/components/ui'),
      extensions: ['.vue'],
      prefix: 'ui',
      global: true,
    })

    addAliases(nuxt, [
      {
        alias: '@shad',
        resolvesTo: resolver.resolve('./runtime/components'),
      },
      {
        alias: '@shadlib',
        resolvesTo: resolver.resolve('./runtime/lib'),
      },
      {
        alias: '@shadlib/utils',
        resolvesTo: resolver.resolve('./runtime/lib/utils'),
      },
    ])

    // Use options.theme if needed
    if (options.theme === 'dark') {
      // Apply dark theme settings
    }
  },
})
