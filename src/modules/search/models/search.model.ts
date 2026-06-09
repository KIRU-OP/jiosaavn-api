import { z } from 'zod'
import {
  AlbumSummaryModel,
  ArtistSummaryModel,
  EntityCardModel,
  PaginationQuery,
  PlaylistSummaryModel,
  SongSummaryModel
} from '#common/models'

export const SearchAPIResponseModel = z.object({
  albums: z.object({
    data: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        subtitle: z.string(),
        type: z.string(),
        image: z.string(),
        perma_url: z.string(),
        more_info: z.object({
          music: z.string(),
          ctr: z.number(),
          year: z.string(),
          is_movie: z.string(),
          language: z.string(),
          song_pids: z.string()
        }),
        explicit_content: z.string(),
        mini_obj: z.boolean(),
        description: z.string()
      })
    ),
    position: z.number()
  }),
  songs: z.object({
    data: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        subtitle: z.string(),
        type: z.string(),
        image: z.string(),
        perma_url: z.string(),
        more_info: z.object({
          album: z.string(),
          ctr: z.number(),
          score: z.string().nullish(),
          vcode: z.string(),
          vlink: z.string().nullish(),
          primary_artists: z.string(),
          singers: z.string(),
          video_available: z.boolean().nullable(),
          triller_available: z.boolean(),
          language: z.string()
        }),
        explicit_content: z.string(),
        mini_obj: z.boolean(),
        description: z.string()
      })
    ),
    position: z.number()
  }),
  playlists: z.object({
    data: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        subtitle: z.string(),
        type: z.string(),
        image: z.string(),
        perma_url: z.string(),
        more_info: z.object({
          firstname: z.string(),
          artist_name: z.array(z.string()),
          entity_type: z.string(),
          entity_sub_type: z.string(),
          video_available: z.boolean().nullable(),
          is_dolby_content: z.boolean(),
          sub_types: z.any(),
          images: z.any(),
          lastname: z.string(),
          language: z.string()
        }),
        explicit_content: z.string(),
        mini_obj: z.boolean(),
        description: z.string()
      })
    ),
    position: z.number()
  }),
  artists: z.object({
    data: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        image: z.string(),
        extra: z.string(),
        type: z.string(),
        mini_obj: z.boolean(),
        isRadioPresent: z.boolean(),
        ctr: z.number(),
        entity: z.number(),
        description: z.string(),
        position: z.number()
      })
    ),
    position: z.number()
  }),
  topquery: z.object({
    data: z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        subtitle: z.string().nullish(),
        type: z.string(),
        image: z.string(),
        perma_url: z.string().nullish(),
        more_info: z
          .object({
            album: z.string(),
            ctr: z.number(),
            score: z.string().nullish(),
            vcode: z.string(),
            vlink: z.string(),
            primary_artists: z.string(),
            singers: z.string(),
            video_available: z.boolean().nullable(),
            triller_available: z.boolean(),
            language: z.string()
          })
          .nullish(),
        explicit_content: z.string().nullish(),
        mini_obj: z.boolean(),
        description: z.string()
      })
    ),
    position: z.number()
  })
})

/** Envelope-free global search result — grouped cards/summaries. */
export const SearchResultModel = z.object({
  topQuery: z.array(EntityCardModel),
  songs: z.array(SongSummaryModel),
  albums: z.array(AlbumSummaryModel),
  artists: z.array(ArtistSummaryModel),
  playlists: z.array(PlaylistSummaryModel)
})

/** Shared query for the per-type search endpoints (search term + pagination). */
export const SearchQuery = PaginationQuery.extend({
  query: z.string().min(1)
})

export type SearchArgs = z.infer<typeof SearchQuery>
