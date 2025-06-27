import db from "@/db";
import { photo } from "@/db/schema/photo";
import { category } from "@/db/schema/options";
import { team } from "@/db/schema/team";

export type Picture = typeof photo.$inferSelect & {
    index: number;
    team: string;
    category: string;
}

const getPictures = async (): Promise<Picture[]> => {
    const pictures = await db.select().from(photo);
    const teams = await db.select().from(team);
    const categories = await db.select().from(category);
    let index = 0;
    return pictures.map((picture) => ({
        ...picture,
        index: index++,
        team: teams.find((team) => team.id === picture.teamId)?.name || '',
        category: categories.find((category) => category.id === picture.categoryId)?.name || '',
    }));
}

export default getPictures;