import db from '@/db';
import { team } from '@/db/schema/team';
import { category } from '@/db/schema/options';

async function seed() {
  try {
    console.log('🌱 Seeding database...');

    // Insert sample teams
    const teams = await db.insert(team).values([
      { name: 'Aceso' },
      { name: 'AIVerse' },
      { name: 'Binary Avengers' },
      { name: 'Bit Script' },
      { name: 'Bit-Wizards' },
      { name: 'Bolts' },
      { name: 'BongoBoltu' },
      { name: 'Bruhs' },
      { name: 'Bug Busters' },
      { name: 'Burn knuckles' },
      { name: 'Cheap Codderz' },
      { name: 'Code Crazy' },
      { name: 'Code for Change' },
      { name: 'CodeByte' },
      { name: 'CODEKSHETRA' },
      { name: 'CodeNix' },
      { name: 'CodeNova Squad' },
      { name: 'DevBuilds' },
      { name: 'Dragon' },
      { name: 'ELECTROCODERS' },
      { name: 'ERROR503' },
      { name: 'fox and friends' },
      { name: 'FrostByte' },
      { name: 'Galaxy of Knights' },
      { name: 'GenZcoders' },
      { name: 'Hackanesh' },
      { name: 'HACKAUT' },
      { name: 'Hackers Hub' },
      { name: 'Hackomon' },
      { name: 'HardCode' },
      { name: 'Infinity_loop' },
      { name: 'Ingenico' },
      { name: 'Innovatio' },
      { name: 'innovation avengers' },
      { name: 'Innovation Engine' },
      { name: 'Innovisions' },
      { name: 'Karnaughmappers' },
      { name: 'LAGAN' },
      { name: 'Lakshya' },
      { name: 'Manja' },
      { name: 'Manotaurs' },
      { name: 'Mind_Matrix' },
      { name: 'ML_BLASTERS' },
      { name: 'Nclave' },
      { name: 'Neural Nexus' },
      { name: 'Nexor' },
      { name: 'NeXperts' },
      { name: 'Null Pointers' },
      { name: 'PIKACHU' },
      { name: 'PixelPros' },
      { name: 'POPS' },
      { name: 'Quantum Rebels' },
      { name: 'QUARD CRYPT' },
      { name: 'Rebase' },
      { name: 'Springtrap' },
      { name: 'Steadystride' },
      { name: 'Targaryen' },
      { name: 'Team Code Catalyst' },
      { name: 'Team fuku-rai' },
      { name: 'TEAM GRINDER' },
      { name: 'Team Pookies' },
      { name: 'Team Squad' },
      { name: 'Tripton' },
      { name: 'Tesseract' },
      { name: 'Topse_inTech' },
      { name: 'We Tried' },
    ]).returning().onConflictDoNothing();

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
    ]).returning().onConflictDoNothing();

    console.log('✅ Categories seeded:', categories.length);

    console.log('🎉 Database seeding completed!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    process.exit(0);
  }
}

seed();