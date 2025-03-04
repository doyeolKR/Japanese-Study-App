import { supabase } from "@/lib/supabase";
import { convertToFurigana } from "./kuroshiro";

export interface VocabularyItem {
  id: number;
  level: string;
  japanese: string;
  part_speech: string;
  example_mean: string;
  meaning: string;
  example_sentence: string;
  japaneseFurigana?: string;
  exampleSentenceFurigana?: string;
  isSentence?: boolean;
}

export const JLPT_LEVELS = ["N5", "N4", "N3", "N2", "N1"];
export const WORDS_PER_CHAPTER = 20;

export async function getTotalWordCount(level: string): Promise<number> {
  try {
    const fullLevel = level.startsWith("N") ? level : `N${level}`;

    const { count, error } = await supabase
      .from("nihongo")
      .select("*", { count: "exact", head: false })
      .eq("level", fullLevel);

    if (error) {
      console.error("Error fetching word count:", error);
      throw error;
    }

    return count || 0;
  } catch (error) {
    console.error("Error in getTotalWordCount:", error);
    throw error;
  }
}

export async function getVocabularyByLevel(
  level: string,
  chapter: number
): Promise<VocabularyItem[]> {
  try {
    const fullLevel = level.startsWith("N") ? level : `N${level}`;
    const start = (chapter - 1) * WORDS_PER_CHAPTER;

    const { data, error } = await supabase
      .from("nihongo")
      .select("*")
      .eq("level", fullLevel)
      .range(start, start + WORDS_PER_CHAPTER - 1)
      .order("priority", { ascending: false })
      .order("id", { ascending: true });

    if (error) {
      console.error("Error fetching vocabulary:", error);
      throw error;
    }

    const furiganaData = await convertAllFurigana(data);

    return furiganaData || [];
  } catch (error) {
    console.error("Error in getVocabularyByLevel:", error);
    throw error;
  }
}

const convertAllFurigana = async (vocabulary: VocabularyItem[]) => {
  return await Promise.all(
    vocabulary.map(async (word: VocabularyItem) => ({
      ...word,
      japaneseFurigana: await convertToFurigana(word.japanese),
      exampleSentenceFurigana: await convertToFurigana(word.example_sentence),
    }))
  );
};
