import { z } from 'zod'
import { DownloadLinkModel } from '#common/models'

export const RawArtistMapModel = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  type: z.string(),
  image: z.string().nullish(),
  perma_url: z.string()
})

export const RawArtistMapGroupModel = z.object({
  primary_artists: z.array(RawArtistMapModel).nullish(),
  featured_artists: z.array(RawArtistMapModel).nullish(),
  artists: z.array(RawArtistMapModel).nullish()
})

export const ArtistMapModel = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  type: z.string(),
  image: z.array(DownloadLinkModel),
  url: z.string()
})

export const ArtistMapGroupModel = z.object({
  primary: z.array(ArtistMapModel),
  featured: z.array(ArtistMapModel),
  all: z.array(ArtistMapModel)
})
