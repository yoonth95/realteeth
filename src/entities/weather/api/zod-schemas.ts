import { z } from 'zod'

const kmaHeaderSchema = z.object({
  resultCode: z.string(),
  resultMsg: z.string(),
})

export const ultraSrtNcstItemSchema = z.object({
  baseDate: z.string(),
  baseTime: z.string(),
  category: z.string(),
  nx: z.number(),
  ny: z.number(),
  obsrValue: z.string(),
})

export const ultraSrtNcstResponseSchema = z.object({
  response: z.object({
    header: kmaHeaderSchema,
    body: z
      .object({
        dataType: z.string(),
        items: z.object({
          item: z.array(ultraSrtNcstItemSchema),
        }),
        pageNo: z.number(),
        numOfRows: z.number(),
        totalCount: z.number(),
      })
      .optional(),
  }),
})

export type UltraSrtNcstItem = z.infer<typeof ultraSrtNcstItemSchema>
export type UltraSrtNcstResponse = z.infer<typeof ultraSrtNcstResponseSchema>

export const vilageFcstItemSchema = z.object({
  baseDate: z.string(),
  baseTime: z.string(),
  category: z.string(),
  fcstDate: z.string(),
  fcstTime: z.string(),
  fcstValue: z.string(),
  nx: z.number(),
  ny: z.number(),
})

export const vilageFcstResponseSchema = z.object({
  response: z.object({
    header: kmaHeaderSchema,
    body: z
      .object({
        dataType: z.string(),
        items: z.object({
          item: z.array(vilageFcstItemSchema),
        }),
        pageNo: z.number(),
        numOfRows: z.number(),
        totalCount: z.number(),
      })
      .optional(),
  }),
})

export type VilageFcstItem = z.infer<typeof vilageFcstItemSchema>
export type VilageFcstResponse = z.infer<typeof vilageFcstResponseSchema>
