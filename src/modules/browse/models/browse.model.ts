import { z } from 'zod'
import {
  AlbumSummaryModel,
  ArtistSummaryModel,
  EntityCardModel,
  PlaylistSummaryModel,
  RadioStationSummaryModel
} from '#common/models'

// ---------------- Upstream (raw JioSaavn feed item) ----------------

export const FeedItemAPIResponseModel = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string().nullish(),
  type: z.string(),
  image: z.string(),
  perma_url: z.string(),
  explicit_content: z.string().nullish(),
  count: z.number().nullish(),
  more_info: z
    .object({
      year: z.string(),
      song_count: z.string(),
      language: z.string(),
      music: z.string(),
      firstname: z.string(),
      follower_count: z.string(),
      album: z.string(),
      primary_artists: z.string(),
      singers: z.string()
    })
    .partial()
    .nullish()
})

export const FeedListAPIResponseModel = z.array(FeedItemAPIResponseModel)

export const LaunchDataAPIResponseModel = z.object({
  new_trending: z.array(FeedItemAPIResponseModel).nullish(),
  new_albums: z.array(FeedItemAPIResponseModel).nullish(),
  top_playlists: z.array(FeedItemAPIResponseModel).nullish(),
  charts: z.array(FeedItemAPIResponseModel).nullish(),
  radio: z.array(FeedItemAPIResponseModel).nullish(),
  artist_recos: z.array(FeedItemAPIResponseModel).nullish()
})

export const FeaturedPlaylistsAPIResponseModel = z.object({
  data: z.array(FeedItemAPIResponseModel),
  count: z.number().nullish(),
  last_page: z.boolean().nullish()
})

// ---------------- Public (home feed) ----------------

export const ModulesModel = z.object({
  trending: z.array(EntityCardModel),
  albums: z.array(AlbumSummaryModel),
  playlists: z.array(PlaylistSummaryModel),
  charts: z.array(PlaylistSummaryModel),
  radioStations: z.array(RadioStationSummaryModel),
  artistRecommendations: z.array(ArtistSummaryModel)
})

export type FeedItem = z.infer<typeof FeedItemAPIResponseModel>
