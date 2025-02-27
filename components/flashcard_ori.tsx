"use client";

import { useState } from "react";
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

  const currentWord = vocabulary[currentIndex];

  const playAudio = async (text: string) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "ja-JP";
    window.speechSynthesis.speak(speech);
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
      setShowExample(false); // 목록보기로 전환 시 예문 버튼 OFF
    }
    setShowExampleCards({}); // 개별 카드 토글 상태 초기화
  };

  if (!currentWord) {
    return null;
  }

  // 카드가 예문 카드인지 여부를 판별하는 함수
  const isExampleCard = (index: number): boolean => {
    // 예문 버튼이 켜져 있으면 기본적으로 모든 카드가 예문 카드
    // 하지만 개별 토글 상태가 true일 경우 해당 카드는 단어 카드로 표시
    if (showExample) {
      return !showExampleCards[index]; // 토글된 카드는 단어 카드
    }
    // 예문 버튼이 꺼져 있으면 개별 토글 상태에 따라 예문 카드 여부 결정
    return showExampleCards[index] ?? false;
  };

  // 음성 재생 함수 수정
  const handlePlayAudio = (index: number, word: VocabularyItem) => {
    const textToRead = isExampleCard(index)
      ? word.example_sentence
      : word.japanese;
    playAudio(textToRead);
  };

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
          )}
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
          )}
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
              <Maximize2 className="h-4 w-4" />
              카드보기
            </>
          ) : (
            <>
              <LayoutGrid className="h-4 w-4" />
              목록보기
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
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayAudio(index, word); // 수정된 음성 재생 함수 호출
                  }}
                  className="absolute top-2 right-2"
                >
                  <Volume2 className="h-6 w-6" />
                </Button>
                <div className="flex-1 flex flex-col items-center justify-center">
                  {(!showExample && !showExampleCards[index]) ||
                  (showExample && showExampleCards[index]) ? (
                    <>
                      {/* <div className="text-2xl mb-2">{word.japanese}</div> */}
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
                      {/* <div className="text-lg mb-4 text-center">
                        {word.example_sentence}
                      </div> */}
                      <div
                        className="text-lg mb-4 text-center"
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
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        // 카드 보기
        <>
          {/* 단어 카드 */}
          <Card className="mb-4 shadow-lg">
            <CardContent className="p-6 min-h-[300px] flex flex-col relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => playAudio(currentWord.japanese)}
                className="absolute top-2 right-2 cursor-pointer"
              >
                <Volume2 className="h-6 w-6" />
              </Button>
              <div className="flex-1 flex flex-col items-center justify-center gap-4">
                <div
                  className="text-4xl mb-2"
                  dangerouslySetInnerHTML={{
                    __html: currentWord?.japaneseFurigana || "",
                  }}
                ></div>
                {/* <div className="text-4xl mb-2">{currentWord.japanese}</div> */}
                {showMeaning && (
                  <div className="space-y-2 text-center">
                    <div className="text-sm text-muted-foreground">
                      {currentWord.part_speech}
                    </div>
                    <div className="text-xl">{currentWord.meaning}</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 예문 카드 */}
          {showExample && (
            <Card className="mb-4 shadow-lg">
              <CardContent className="p-6 min-h-[200px] flex flex-col items-center justify-center relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => playAudio(currentWord.example_sentence)}
                  className="absolute top-2 right-2 cursor-pointer"
                >
                  <Volume2 className="h-6 w-6" />
                </Button>
                <div
                  className="text-xl mb-2"
                  dangerouslySetInnerHTML={{
                    __html: currentWord?.exampleSentenceFurigana || "",
                  }}
                ></div>
                {/* <div className="text-xl mb-4">
                  {currentWord.example_sentence}
                </div> */}
                {showMeaning && (
                  <div className="text-muted-foreground">
                    {currentWord.example_mean}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

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
