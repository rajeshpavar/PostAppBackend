import {PrismaPg} from "@prisma/adapter-pg"
import { PrismaClient } from "../generated/prisma/client"


    


export const getPrisma=(database_url:string)=>{
    const connectionString=`${database_url}`;
    const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

return prisma
}


