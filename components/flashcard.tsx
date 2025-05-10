"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Volume2,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  LayoutGrid,
  Maximize2,
} from "lucide-react";
import { VocabularyItem } from "@/services/vocabulary";
import "../styles/flashcard.css";

interface FlashcardProps {
  vocabulary: VocabularyItem[];
}

export function Flashcard({ vocabulary }: FlashcardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(true);
  const [showExample, setShowExample] = useState(true);
  const [isListView, setIsListView] = useState(false);
  const [showExampleCards, setShowExampleCards] = useState<
    Record<number, boolean>
  >({});

  // 스와이프 관련 상태
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50; // 최소 스와이프 거리 (픽셀)
  const cardRef = useRef<HTMLDivElement>(null);

  const currentWord = vocabulary[currentIndex];

  const isExampleCard = (index: number): boolean => {
    return showExample
      ? !showExampleCards[index]
      : showExampleCards[index] ?? false;
  };

  const handlePlayAudio = async (
    word: VocabularyItem,
    isSentence: boolean,
    index?: number
  ) => {
    try {
      if (index) isSentence = isExampleCard(index);

      // 서버로 보낼 객체에 isSentence 플래그를 포함시킵니다.
      const requestBody = { ...word, isSentence };

      const response = await fetch("/api/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        console.error(
          "오디오 파일을 가져오지 못했습니다:",
          response.statusText
        );
        return;
      }

      // 서버 응답 처리
      const data = await response.json();

      // publicUrl이 있으면 그대로 사용 (캐시된 경우)
      // audioData가 있으면 base64 데이터를 사용 (새로 생성된 경우)
      const audioSource = data.publicUrl || data.audioData;

      // Audio 객체를 통해 음성 파일 재생
      const audio = new Audio(audioSource);
      audio.play();
    } catch (error) {
      console.error("음성 재생 중 오류 발생:", error);
    }
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? vocabulary.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === vocabulary.length - 1 ? 0 : prev + 1));
  };

  const toggleExampleCard = (index: number) => {
    setShowExampleCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleViewModeChange = () => {
    setIsListView(!isListView);
    if (!isListView) {
      setShowExample(false); // 목록 보기 전환 시 예문 비활성화
    }
    setShowExampleCards({}); // 토글 상태 초기화
  };

  // 스와이프 이벤트 핸들러
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchEndX.current - touchStartX.current;
    const isSwipe = Math.abs(distance) > minSwipeDistance;

    if (isSwipe) {
      if (distance > 0) {
        // 오른쪽으로 스와이프 - 이전 카드
        goToPrevious();
      } else {
        // 왼쪽으로 스와이프 - 다음 카드
        goToNext();
      }
    }

    // 터치 상태 초기화
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // 스와이프 애니메이션 효과
  useEffect(() => {
    const cardElement = cardRef.current;
    if (!cardElement || isListView) return;

    const handleTransitionEnd = () => {
      cardElement.classList.remove("card-swipe-left", "card-swipe-right");
    };

    cardElement.addEventListener("transitionend", handleTransitionEnd);

    return () => {
      cardElement.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, [isListView]);

  if (!currentWord) return null;

  return (
    <div className={`w-full ${isListView ? "max-w-6xl" : "max-w-2xl"} mx-auto`}>
      {/* 상단 버튼 영역 */}
      <div className="flex justify-end items-center mb-4 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowMeaning(!showMeaning)}
          className="flex items-center gap-2"
        >
          {showMeaning ? (
            <Eye className="h-4 w-4" />
          ) : (
            <EyeOff className="h-4 w-4" />
          )}{" "}
          의미
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowExample(!showExample)}
          className="flex items-center gap-2"
        >
          {showExample ? (
            <Eye className="h-4 w-4" />
          ) : (
            <EyeOff className="h-4 w-4" />
          )}{" "}
          예문
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleViewModeChange}
          className="flex items-center gap-2"
        >
          {isListView ? (
            <>
              <Maximize2 className="h-4 w-4" /> 카드보기
            </>
          ) : (
            <>
              <LayoutGrid className="h-4 w-4" /> 목록보기
            </>
          )}
        </Button>
      </div>

      {isListView ? (
        // 목록 보기
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vocabulary.map((word, index) => (
            <Card
              key={index}
              className="shadow-lg cursor-pointer"
              onClick={() => toggleExampleCard(index)}
            >
              <CardContent className="p-6 min-h-[200px] flex flex-col relative">
                <div className="flex-1 flex flex-col items-center justify-center gap-2">
                  {(!showExample && !showExampleCards[index]) ||
                  (showExample && showExampleCards[index]) ? (
                    <>
                      <div
                        className="text-2xl mb-2"
                        dangerouslySetInnerHTML={{
                          __html: word?.japaneseFurigana || "",
                        }}
                      ></div>
                      {showMeaning && (
                        <div className="space-y-2 text-center">
                          <div className="text-sm text-muted-foreground">
                            {word.part_speech}
                          </div>
                          <div className="text-lg">{word.meaning}</div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div
                        className="list-view-content text-lg mb-4 text-center"
                        dangerouslySetInnerHTML={{
                          __html: word?.exampleSentenceFurigana || "",
                        }}
                      ></div>
                      {showMeaning && (
                        <div className="text-muted-foreground text-center">
                          {word.example_mean}
                        </div>
                      )}
                    </>
                  )}
                </div>
                {/* 음성 출력 버튼 (오른쪽 하단) */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayAudio(word, true, index);
                  }}
                  className="absolute bottom-2 right-2"
                >
                  <Volume2 className="h-6 w-6" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        // 카드 보기
        <>
          {/* 단어 카드 - 스와이프 기능 추가 */}
          <div
            className="card-container mb-4"
            ref={cardRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <Card className="mb-4 shadow-lg">
              <CardContent className="p-6 min-h-[250px] md:min-h-[300px] flex flex-col relative">
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div
                    className="text-5xl mb-2 large-text-ruby"
                    dangerouslySetInnerHTML={{
                      __html: currentWord?.japaneseFurigana || "",
                    }}
                  ></div>
                  {showMeaning && (
                    <div className="space-y-2 text-center">
                      <div className="text-sm text-muted-foreground">
                        {currentWord.part_speech}
                      </div>
                      <div className="text-xl">{currentWord.meaning}</div>
                    </div>
                  )}
                </div>
                {/* 음성 출력 버튼 (오른쪽 하단) */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handlePlayAudio(currentWord, false)}
                  className="absolute bottom-2 right-2"
                >
                  <Volume2 className="h-6 w-6" />
                </Button>
              </CardContent>
            </Card>

            {/* 예문 카드 */}
            {showExample && (
              <Card className="mb-2 shadow-lg">
                <CardContent className="p-6 min-h-[200px] flex flex-col items-center justify-center relative">
                  <div
                    className="text-xl mb-2 text-center w-full"
                    dangerouslySetInnerHTML={{
                      __html: currentWord?.exampleSentenceFurigana || "",
                    }}
                  ></div>
                  {showMeaning && (
                    <div className="text-muted-foreground text-center w-full">
                      {currentWord.example_mean}
                    </div>
                  )}
                  {/* 음성 출력 버튼 (오른쪽 하단) */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handlePlayAudio(currentWord, true)}
                    className="absolute bottom-2 right-2"
                  >
                    <Volume2 className="h-6 w-6" />
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* 이전/다음 버튼 */}
          <div className="flex items-center justify-between mt-4">
            <Button variant="outline" size="icon" onClick={goToPrevious}>
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} / {vocabulary.length}
            </span>
            <Button variant="outline" size="icon" onClick={goToNext}>
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
