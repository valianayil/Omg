import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

// Hard-coded list of Bible verses with text
const verses = [
  {
    id: 'JER.29.11',
    reference: 'Jeremiah 29:11',
    text: '"For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."'
  },
  {
    id: 'JHN.3.16',
    reference: 'John 3:16',
    text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.'
  },
  {
    id: 'PHP.4.13',
    reference: 'Philippians 4:13',
    text: 'I can do all things through Christ who strengthens me.'
  },
  {
    id: 'PSA.23.1',
    reference: 'Psalm 23:1',
    text: 'The Lord is my shepherd, I lack nothing.'
  },
  {
    id: 'ROM.8.28',
    reference: 'Romans 8:28',
    text: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.'
  },
  {
    id: 'MAT.11.28',
    reference: 'Matthew 11:28',
    text: 'Come to me, all you who are weary and burdened, and I will give you rest.'
  },
  {
    id: 'PRO.3.5',
    reference: 'Proverbs 3:5-6',
    text: 'Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.'
  },
  {
    id: 'ISA.41.10',
    reference: 'Isaiah 41:10',
    text: 'So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.'
  },
  {
    id: 'GAL.5.22',
    reference: 'Galatians 5:22-23',
    text: 'But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control. Against such things there is no law.'
  },
  {
    id: '2TI.1.7',
    reference: '2 Timothy 1:7',
    text: 'For God has not given us a spirit of fear, but of power and of love and of a sound mind.'
  }
];

// Path to the daily verse JSON file
const dataFilePath = path.join(process.cwd(), 'src/data/dailyVerse.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get a random verse from our local collection
    const randomIndex = Math.floor(Math.random() * verses.length);
    const randomVerse = verses[randomIndex];
    
    // If the force parameter is provided, update the stored verse
    if (req.query.force === 'true') {
      const verseData = {
        reference: randomVerse.reference,
        text: randomVerse.text,
        lastUpdated: new Date().toISOString()
      };
      
      // Save to file
      try {
        fs.writeFileSync(dataFilePath, JSON.stringify(verseData, null, 2));
        console.log('Daily verse updated successfully with local data');
      } catch (err) {
        console.error('Error saving verse to file:', err);
      }
    }
    
    // Return the verse
    return res.status(200).json({
      reference: randomVerse.reference,
      text: randomVerse.text,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in Bible alternative API:', error);
    return res.status(500).json({ message: 'Error processing request' });
  }
} 