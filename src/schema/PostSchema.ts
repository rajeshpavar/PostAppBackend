import  {z} from "zod";

export const postSchema=z.object({
    title:z.string(),
    content:z.string().optional()
})


export type postSchemaType=z.infer<typeof postSchema>