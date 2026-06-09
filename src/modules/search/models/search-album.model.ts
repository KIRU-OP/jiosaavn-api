import { z } from 'zod'
import { RawArtistMapGroupModel } from '#modules/artists/models/artist-map.model'

export const SearchAlbumAPIResponseModel = z.object({
  total: z.number(),
  start: z.number(),
  results: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      subtitle: z.string(),
      header_desc: z.string(),
      type: z.string(),
      perma_url: z.string(),
      image: z.string(),
      language: z.string(),
      year: z.string(),
      play_count: z.string(),
      explicit_content: z.string(),
      list_count: z.string(),
      list_type: z.string(),
      list: z.string(),
      more_info: z.object({
        query: z.string(),
        text: z.string(),
        music: z.string(),
        song_count: z.string(),
        artistMap: RawArtistMapGroupModel.nullish()
      })
    })
  )
})
