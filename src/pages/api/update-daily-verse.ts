import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// Use a pre-selected list of Bible verses for reliability
const bibleVerses = [
  { reference: "John 3:16", text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." },
  { reference: "Philippians 4:13", text: "I can do all things through Christ who strengthens me." },
  { reference: "Psalm 23:1", text: "The Lord is my shepherd; I shall not want." },
  { reference: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose." },
  { reference: "Jeremiah 29:11", text: "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future." },
  { reference: "Proverbs 3:5-6", text: "Trust in the LORD with all your heart and lean not on your understanding; in all your ways submit to him, and he will make your paths straight." },
  { reference: "Isaiah 41:10", text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand." },
  { reference: "Matthew 11:28", text: "Come to me, all you who are weary and burdened, and I will give you rest." },
  { reference: "Romans 12:2", text: "Do not conform to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God's will is—his good, pleasing and perfect will." },
  { reference: "Psalm 46:1", text: "God is our refuge and strength, an ever-present help in trouble." },
  { reference: "Galatians 5:22-23", text: "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control. Against such things there is no law." },
  { reference: "2 Corinthians 5:17", text: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!" },
  { reference: "Romans 5:8", text: "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us." },
  { reference: "Joshua 1:9", text: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go." },
  { reference: "Philippians 4:6-7", text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus." },
];

// Path to the daily verse JSON file
const dailyVersePath = path.join(process.cwd(), 'src/data/dailyVerse.json');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Read the current daily verse from the JSON file
    let currentVerse;
    try {
      const fileContent = await readFile(dailyVersePath, 'utf8');
      currentVerse = JSON.parse(fileContent);
    } catch (error) {
      // If the file doesn't exist or is invalid, create a new one
      currentVerse = {
        reference: "",
        text: "",
        lastUpdated: new Date(0).toISOString() // Set to earliest date
      };
    }

    // Check if we need to update (force parameter or new day)
    const forceUpdate = req.query.force === 'true';
    const lastUpdated = new Date(currentVerse.lastUpdated);
    const today = new Date();
    
    // Get today's date without time
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    const lastUpdatedDate = new Date(lastUpdated.getFullYear(), lastUpdated.getMonth(), lastUpdated.getDate()).getTime();
    
    const needsUpdate = forceUpdate || todayDate > lastUpdatedDate;
    
    if (needsUpdate) {
      // Select a random verse that's different from the current one
      let newVerse;
      let attempts = 0;
      const maxAttempts = 5; // Prevent infinite loop
      
      do {
        const randomIndex = Math.floor(Math.random() * bibleVerses.length);
        newVerse = bibleVerses[randomIndex];
        attempts++;
      } while (
        newVerse.reference === currentVerse.reference && 
        attempts < maxAttempts
      );
      
      // Create the updated verse data
      const updatedVerse = {
        reference: newVerse.reference,
        text: newVerse.text,
        lastUpdated: today.toISOString()
      };
      
      // Write to the JSON file
      await writeFile(dailyVersePath, JSON.stringify(updatedVerse, null, 2), 'utf8');
      
      return res.status(200).json({ 
        success: true, 
        message: 'Daily verse updated successfully',
        previousVerse: currentVerse,
        currentVerse: updatedVerse
      });
    }
    
    // No update needed
    return res.status(200).json({ 
      success: true, 
      message: 'Daily verse is up to date', 
      currentVerse
    });
    
  } catch (error) {
    console.error('Error updating daily verse:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to update daily verse'
    });
  }
} 