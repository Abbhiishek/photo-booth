import db from '@/db';
import { team } from '@/db/schema/team';
import { category } from '@/db/schema/options';

async function seed() {
  try {
    console.log('🌱 Seeding database...');

    // Insert sample teams
    const teams = await db.insert(team).values([
      { name: 'Team Alpha' },
      { name: 'Team Beta' },
      { name: 'Team Gamma' },
      { name: 'Team Delta' },
    ]).returning();

    console.log('✅ Teams seeded:', teams.length);

    // Insert sample categories
    const categories = await db.insert(category).values([
      { name: 'Nature' },
      { name: 'Urban' },
      { name: 'Portrait' },
      { name: 'Landscape' },
      { name: 'Abstract' },
      { name: 'Street Photography' },
    ]).returning();

    console.log('✅ Categories seeded:', categories.length);

    console.log('🎉 Database seeding completed!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    process.exit(0);
  }
}

seed(); 