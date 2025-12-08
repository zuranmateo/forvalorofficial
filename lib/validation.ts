
import { z } from 'zod'

export const formSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(5).max(1000)
})