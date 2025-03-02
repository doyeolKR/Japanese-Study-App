import Kuroshiro from "kuroshiro";
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";

const kuroshiro = new Kuroshiro();
let isInitialized = false; // 초기화 여부 플래그
let initializePromise = null; // 초기화 Promise 객체 저장

export const initializeKuroshiro = async () => {
  // 이미 초기화되었으면 바로 반환
  if (isInitialized) {
    return kuroshiro;
  }

  // 초기화 중이면 해당 Promise 반환
  if (initializePromise) {
    await initializePromise;
    return kuroshiro;
  }

  // 초기화 시작 - Promise 저장
  initializePromise = kuroshiro.init(
    new KuromojiAnalyzer({ dictPath: "node_modules/kuromoji/dict/" })
  );

  try {
    await initializePromise;
    isInitialized = true; // 초기화 완료 표시
    return kuroshiro;
  } catch (error) {
    console.error("Failed to initialize Kuroshiro:", error);
    initializePromise = null; // 초기화 실패 시 Promise 초기화
    throw error;
  }
};

// 변환 결과를 캐싱하는 매핑 객체
const furiganaCache = new Map();

export const convertToFurigana = async (text) => {
  // 빈 텍스트는 바로 반환
  if (!text || text.trim() === "") {
    return "";
  }

  // 캐시된 결과가 있으면 반환
  if (furiganaCache.has(text)) {
    return furiganaCache.get(text);
  }

  try {
    const instance = await initializeKuroshiro();
    const result = await instance.convert(text, { mode: "furigana" });

    // 결과 캐싱 (메모리 부하 방지를 위해 캐시 크기 제한)
    if (furiganaCache.size > 1000) {
      // 캐시가 너무 크면 오래된 항목 삭제
      const oldestKey = furiganaCache.keys().next().value;
      furiganaCache.delete(oldestKey);
    }
    furiganaCache.set(text, result);

    return result;
  } catch (error) {
    console.error("Error converting to furigana:", error);
    return text; // 오류 발생 시 원본 텍스트 반환
  }
};
