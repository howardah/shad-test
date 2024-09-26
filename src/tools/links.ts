import type { Nuxt } from '@nuxt/schema'

interface AliasLink {
  alias: string
  resolvesTo: string
}

export function addAlias(nuxt: Nuxt, { alias, resolvesTo }: AliasLink) {
  // Add alias for @common
  nuxt.options.alias[alias] = resolvesTo

  // Ensure the alias is also available for TypeScript
  nuxt.hook('prepare:types', ({ tsConfig }) => {
    tsConfig.compilerOptions = tsConfig.compilerOptions || {}
    tsConfig.compilerOptions.paths = tsConfig.compilerOptions.paths || {}
    tsConfig.compilerOptions.paths[alias] = [resolvesTo]
  })
}

export function addAliases(nuxt: Nuxt, aliases: AliasLink[]) {
  for (const alias of aliases) {
    console.log(`Adding alias ${alias.alias} to resolve to ${alias.resolvesTo}`)
    addAlias(nuxt, alias)
  }
}
