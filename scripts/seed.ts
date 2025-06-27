import db from '@/db';
import { team } from '@/db/schema/team';
import { category } from '@/db/schema/options';

async function seed() {
  try {
    console.log('🌱 Seeding database...');

    // Insert sample teams
    const teams = await db.insert(team).values([
      { name: 'Dev Builds' },
    ]).returning();

    console.log('✅ Teams seeded:', teams.length);

    // Insert sample categories
    const categories = await db.insert(category).values([
      { name: 'Opening Ceremony & Kickoff' },
      { name: 'Workshops & Tech Talks' },
      { name: 'Team Formation & Brainstorming' },
      { name: 'Hacking in Progress' },
      { name: 'Swag & Merchandise' },
      { name: 'Food & Chill Zones' },
      { name: 'Mentorship & Guidance' },
      { name: 'Midnight Vibes & All-Nighters' },
      { name: 'Judging & Demos' },
      { name: 'Group Photos & Closing Moments' },
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