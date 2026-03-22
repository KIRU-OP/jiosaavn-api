import { Endpoints } from '#common/constants'
import { useFetch } from '#common/helpers'
import { deduplicateResults, rankSearchResults } from '#modules/search/helpers'
import { createSongPayload } from '#modules/songs/helpers'
import type { IUseCase } from '#common/types'
import type { SearchSongAPIResponseModel, SearchSongModel } from '#modules/search/models'
import type { z } from 'zod'

export interface SearchSongsArgs {
  query: string
  page: number
  limit: number
}

export class SearchSongsUseCase implements IUseCase<SearchSongsArgs, z.infer<typeof SearchSongModel>> {
  constructor() {}

  async execute({ query, limit, page }: SearchSongsArgs): Promise<z.infer<typeof SearchSongModel>> {
    const { data } = await useFetch<z.infer<typeof SearchSongAPIResponseModel>>({
      endpoint: Endpoints.search.songs,
      params: {
        q: query,
        p: page,
        n: limit
      }
    })

    const mapped = data.results?.map(createSongPayload) || []
    const deduped = deduplicateResults(mapped)
    const ranked = rankSearchResults(deduped, query)

    return {
      total: data.total,
      start: data.start,
      results: ranked.slice(0, limit)
    }
  }
}
