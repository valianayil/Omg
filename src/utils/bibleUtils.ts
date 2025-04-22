import fs from 'fs';
import path from 'path';

const API_KEY = 'f09feecfc988b7a65debeb7223d8c15c';
const BIBLE_ID = '61fd76eafa1577c2-02';

// List of Bible verses to pick from
const VERSES = [
  'JER.29.11',
  'PSA.23',
  '1COR.4.4-8',
  'PHP.4.13',
  'JHN.3.16',
  'ROM.8.28',
  'ISA.41.10',
  'PSA.46.1',
  'GAL.5.22-23',
  'HEB.11.1',
  '2TI.1.7',
  '1COR.10.13',
  'PRO.22.6',
  'ISA.40.31',
  'JOS.1.9',
  'HEB.12.2',
  'MAT.11.28',
  'ROM.10.9-10',
  'PHP.2.3-4',
  'MAT.5.43-44',
];

// Path to the daily verse JSON file
const dataFilePath = path.join(process.cwd(), 'src/data/dailyVerse.json');

// Interface for verse data
export interface DailyVerse {
  reference: string;
  text: string;
  lastUpdated: string;
}

// Get a random verse ID from the list
export function getRandomVerseId(): string {
  const verseIndex = Math.floor(Math.random() * VERSES.length);
  return VERSES[verseIndex];
}

// Format Bible reference from API format to readable format
export function formatBibleReference(reference: string): string {
  // Example: "JER.29.11" -> "Jeremiah 29:11"
  const bookNames: Record<string, string> = {
    'GEN': 'Genesis',
    'EXO': 'Exodus',
    'LEV': 'Leviticus',
    'NUM': 'Numbers',
    'DEU': 'Deuteronomy',
    'JOS': 'Joshua',
    'JDG': 'Judges',
    'RUT': 'Ruth',
    '1SA': '1 Samuel',
    '2SA': '2 Samuel',
    '1KI': '1 Kings',
    '2KI': '2 Kings',
    '1CH': '1 Chronicles',
    '2CH': '2 Chronicles',
    'EZR': 'Ezra',
    'NEH': 'Nehemiah',
    'EST': 'Esther',
    'JOB': 'Job',
    'PSA': 'Psalm',
    'PRO': 'Proverbs',
    'ECC': 'Ecclesiastes',
    'SNG': 'Song of Solomon',
    'ISA': 'Isaiah',
    'JER': 'Jeremiah',
    'LAM': 'Lamentations',
    'EZK': 'Ezekiel',
    'DAN': 'Daniel',
    'HOS': 'Hosea',
    'JOL': 'Joel',
    'AMO': 'Amos',
    'OBA': 'Obadiah',
    'JON': 'Jonah',
    'MIC': 'Micah',
    'NAM': 'Nahum',
    'HAB': 'Habakkuk',
    'ZEP': 'Zephaniah',
    'HAG': 'Haggai',
    'ZEC': 'Zechariah',
    'MAL': 'Malachi',
    'MAT': 'Matthew',
    'MRK': 'Mark',
    'LUK': 'Luke',
    'JHN': 'John',
    'ACT': 'Acts',
    'ROM': 'Romans',
    '1CO': '1 Corinthians',
    '1COR': '1 Corinthians',
    '2CO': '2 Corinthians',
    '2COR': '2 Corinthians',
    'GAL': 'Galatians',
    'EPH': 'Ephesians',
    'PHP': 'Philippians',
    'COL': 'Colossians',
    '1TH': '1 Thessalonians',
    '2TH': '2 Thessalonians',
    '1TI': '1 Timothy',
    '2TI': '2 Timothy',
    'TIT': 'Titus',
    'PHM': 'Philemon',
    'HEB': 'Hebrews',
    'JAS': 'James',
    '1PE': '1 Peter',
    '2PE': '2 Peter',
    '1JN': '1 John',
    '2JN': '2 John',
    '3JN': '3 John',
    'JUD': 'Jude',
    'REV': 'Revelation',
  };

  const parts = reference.split('.');
  if (parts.length < 2) return reference;

  const bookCode = parts[0];
  const chapter = parts[1];
  const verse = parts[2]?.replace('-', ':') || '';

  const bookName = bookNames[bookCode] || bookCode;
  return `${bookName} ${chapter}${verse ? ':' + verse : ''}`;
}

// Fetch a Bible verse from the API
export async function fetchBibleVerse(verseId: string): Promise<DailyVerse | null> {
  try {
    const response = await fetch(
      `https://api.scripture.api.bible/v1/bibles/${BIBLE_ID}/search?query=${verseId}`,
      {
        headers: {
          'api-key': API_KEY
        }
      }
    );

    if (!response.ok) {
      throw new Error(`API response error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.data.passages || data.data.passages.length === 0) {
      throw new Error('No passages found');
    }

    const passage = data.data.passages[0];
    const formattedReference = formatBibleReference(verseId);

    return {
      reference: passage.reference || formattedReference,
      text: passage.content.replace(/<[^>]*>/g, '').trim(), // Strip HTML tags
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching Bible verse:', error);
    return null;
  }
}

// Save the verse data to the JSON file
export function saveDailyVerse(verseData: DailyVerse): void {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(verseData, null, 2));
    console.log('Daily verse updated successfully');
  } catch (error) {
    console.error('Error saving daily verse:', error);
  }
}

// Read the current daily verse from the JSON file
export function getDailyVerse(): DailyVerse {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileContents) as DailyVerse;
  } catch (error) {
    console.error('Error reading daily verse:', error);
    // Return default verse if file can't be read
    return {
      reference: 'Jeremiah 29:11',
      text: '"For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."',
      lastUpdated: new Date().toISOString()
    };
  }
}

// Check if the verse needs to be updated (if it's a new day)
export function shouldUpdateVerse(): boolean {
  try {
    const currentVerse = getDailyVerse();
    const lastUpdated = new Date(currentVerse.lastUpdated);
    const now = new Date();

    // Check if it's a different day (UTC)
    return (
      lastUpdated.getUTCFullYear() !== now.getUTCFullYear() ||
      lastUpdated.getUTCMonth() !== now.getUTCMonth() ||
      lastUpdated.getUTCDate() !== now.getUTCDate()
    );
  } catch (error) {
    console.error('Error checking if verse should be updated:', error);
    return true; // Update if there's an error
  }
} 