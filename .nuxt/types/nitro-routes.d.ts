// Generated by nitro
import type { Serialize, Simplify } from 'nitropack'
declare module 'nitropack' {
  type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T
  interface InternalApi {
    '/:region/summoner/:name': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/routes/[region]/summoner/[name]').default>>>>
    }
    '/:region/summoner/match/:id': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/routes/[region]/summoner/match/[id]').default>>>>
    }
    '/:region/summoner/match/history/:puuid': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/routes/[region]/summoner/match/history/[puuid]').default>>>>
    }
    '/__nuxt_error': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/nuxt/dist/core/runtime/nitro/renderer').default>>>>
    }
    '/_ipx/**': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/@nuxt/image/dist/runtime/ipx').default>>>>
    }
  }
}
export {}