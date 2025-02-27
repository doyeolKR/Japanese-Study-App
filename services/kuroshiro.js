import Kuroshiro from "kuroshiro";
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";

const kuroshiro = new Kuroshiro();
let isInitialized = false; // 초기화 여부 플래그 추가

export const initializeKuroshiro = async () => {
  if (!isInitialized) {
    await kuroshiro.init(
      new KuromojiAnalyzer({ dictPath: "node_modules/kuromoji/dict/" })
    );
    isInitialized = true; // 초기화 완료 표시
  }
  return kuroshiro;
};

export const convertToFurigana = async (text) => {
  const instance = await initializeKuroshiro();
  return await instance.convert(text, { mode: "furigana" });
};
