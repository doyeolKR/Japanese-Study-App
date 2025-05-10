import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Star,
  MessageCircle,
  Book,
  GraduationCap,
  Headphones,
  Award,
  Globe,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-gray-800 dark:to-gray-900 text-white py-20 md:py-32">
        {/* Background Image */}
        {/* <div className="absolute inset-0">
          <Image
            src="/images/hero.png"
            alt="Japanese Learning Background"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div> */}
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 right-0 h-40 bg-[linear-gradient(to_right,#ffffff33_1px,transparent_1px),linear-gradient(to_bottom,#ffffff33_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>
        {/* 다크 모드를 위한 반투명 오버레이 */}
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40 pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-8">
              <Badge className="bg-white/20 text-white hover:bg-white/30 transition-colors mb-4 py-1.5 px-4 text-sm">
                JLPT N5 부터 N1까지 완벽 대비
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight dark:text-gray-600">
                AI와 함께하는
                <br />
                <span className="text-yellow-300 dark:text-gray-300">
                  스마트 일본어
                </span>{" "}
                학습
              </h1>

              <p className="text-lg md:text-xl text-blue-100 dark:text-gray-300 md:pr-12 leading-relaxed">
                회화, 듣기, 독해, 단어 학습을 하나의 플랫폼에서 경험하세요. 개인
                맞춤형 AI 피드백으로 일본어 실력이 빠르게 향상됩니다.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-blue-700 hover:bg-blue-600/20 hover:text-white dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
                >
                  <Link href="/study" className="flex items-center gap-2">
                    무료로 시작하기 <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-blue-700 hover:bg-blue-600/20 hover:text-white dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
                >
                  <Link href="/study">학습 둘러보기</Link>
                </Button>
              </div>

              {/* Social Proof */}
              <div className="pt-6 pb-4">
                <div className="flex items-center gap-2 text-sm text-blue-100 dark:text-gray-300">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400 dark:fill-yellow-300 dark:text-yellow-300"
                      />
                    ))}
                  </div>
                  <span>
                    <strong>4.9/5</strong> 평점 • <strong>10만 명</strong>{" "}
                    사용자 선택
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 80"
            className="w-full h-auto fill-background dark:fill-gray-950"
          >
            <path d="M0,64L80,58.7C160,53,320,43,480,42.7C640,43,800,53,960,58.7C1120,64,1280,64,1360,64L1440,64L1440,80L1360,80C1280,80,1120,80,960,80C800,80,640,80,480,80C320,80,160,80,80,80L0,80Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200">
              학습 기능
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white">
              언어 습득에 최적화된 학습 경험
            </h2>
            <p className="text-xl text-muted-foreground dark:text-gray-400">
              과학적으로 검증된 학습 방법론을 기반으로 일본어 실력을 빠르게
              향상시키는 다양한 학습 도구를 제공합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Book className="h-10 w-10 text-blue-600" />}
              title="스마트 단어장"
              description="간격 반복과 개인화된 알고리즘으로 단어를 효율적으로 암기하세요. JLPT 수준별 필수 단어 학습이 가능합니다."
              linkText="단어 학습하기"
              linkHref="/vocabulary"
              available={true}
            />

            <FeatureCard
              icon={<MessageCircle className="h-10 w-10 text-purple-600" />}
              title="AI 회화 연습"
              description="실제 상황을 기반으로 한 대화 시나리오로 회화 능력을 향상시키세요. AI가 발음과 표현을 즉시 교정해 드립니다."
              linkText="회화 연습하기"
              linkHref="/conversation"
              available={true}
            />

            <FeatureCard
              icon={<GraduationCap className="h-10 w-10 text-green-600" />}
              title="문법 마스터"
              description="체계적인 설명과 다양한 예문으로 일본어 문법을 쉽게 이해하고 활용하세요. 수준별 문법 패턴을 제공합니다."
              linkText="문법 학습하기"
              linkHref="/grammar"
              available={false}
            />

            <FeatureCard
              icon={<Headphones className="h-10 w-10 text-amber-600" />}
              title="청취력 강화"
              description="일본인 원어민 발음의 오디오와 함께 듣기 능력을 향상시키세요. 속도 조절 기능으로 단계별 학습이 가능합니다."
              linkText="듣기 연습하기"
              linkHref="/listening"
              available={false}
            />

            <FeatureCard
              icon={<Award className="h-10 w-10 text-rose-600" />}
              title="JLPT 시험 대비"
              description="실전과 동일한 형식의 모의고사와 문제 은행으로 JLPT 시험에 완벽히 대비하세요. 취약점 분석도 제공합니다."
              linkText="시험 대비하기"
              linkHref="/jlpt"
              available={false}
            />

            <FeatureCard
              icon={<Globe className="h-10 w-10 text-teal-600" />}
              title="일본 문화 이해"
              description="언어 학습과 함께 일본 문화, 관습, 에티켓을 배워 실제 상황에서 자연스러운 의사소통이 가능하도록 돕습니다."
              linkText="문화 학습하기"
              linkHref="/culture"
              available={false}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 dark:bg-gray-700 dark:text-gray-300">
              사용자 후기
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white">
              학습자들의 성공 스토리
            </h2>
            <p className="text-xl text-muted-foreground dark:text-gray-400">
              다양한 목표를 가진 학습자들이 저희 플랫폼과 함께 일본어 능력을
              어떻게 향상시켰는지 확인해보세요.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="6개월 동안 꾸준히 학습한 결과, JLPT N2에 합격했어요! 특히 AI 회화 연습이 실전 회화 능력 향상에 큰 도움이 되었습니다."
              name="김지현"
              title="JLPT N2 합격자"
              avatarUrl="https://randomuser.me/api/portraits/women/45.jpg"
            />

            <TestimonialCard
              quote="일본 출장이 잦은 회사원입니다. 이 앱으로 비즈니스 일본어를 학습한 덕분에 현지 미팅에서 자신감 있게 의사소통할 수 있게 되었어요."
              name="박성민"
              title="글로벌 기업 매니저"
              avatarUrl="https://randomuser.me/api/portraits/men/32.jpg"
            />

            <TestimonialCard
              quote="히라가나, 카타카나부터 시작해서 지금은 간단한 소설도 읽을 수 있게 되었어요. 체계적인 커리큘럼이 정말 좋습니다!"
              name="이수진"
              title="일본어 학습 1년차"
              avatarUrl="https://randomuser.me/api/portraits/women/68.jpg"
            />
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <StatCard number="100,000+" label="월간 활성 사용자" />
            <StatCard number="1,000+" label="일본어 학습 콘텐츠" />
            <StatCard number="92%" label="사용자 만족도" />
            <StatCard number="80%" label="JLPT 합격률" />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 dark:bg-gray-700 dark:text-gray-300">
              요금제
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white">
              당신에게 맞는 학습 플랜을 선택하세요
            </h2>
            <p className="text-xl text-muted-foreground dark:text-gray-400">
              모든 플랜은 주요 학습 기능을 포함하며, 7일간의 무료 체험을
              제공합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              title="무료 플랜"
              price="₩0"
              period=""
              description="일본어 학습을 시작하는 분들을 위한 기본 플랜"
              features={[
                "기본 단어장 (300단어)",
                "초급 문법 학습",
                "기초 회화 연습",
                "히라가나/카타카나 학습",
              ]}
              buttonText="무료로 시작하기"
              buttonHref="/register"
              popular={false}
            />

            <PricingCard
              title="프리미엄"
              price="₩9,900"
              period="월"
              description="체계적인 학습을 원하는 분들을 위한 추천 플랜"
              features={[
                "전체 단어장 (5,000+ 단어)",
                "모든 레벨 문법 학습",
                "무제한 AI 회화 연습",
                "JLPT 모의고사",
                "개인별 맞춤 학습 계획",
                "진도 및 성취도 분석",
              ]}
              buttonText="7일 무료 체험하기"
              buttonHref="/premium"
              popular={true}
            />

            <PricingCard
              title="비즈니스"
              price="₩19,900"
              period="월"
              description="비즈니스 일본어와 고급 학습을 위한 플랜"
              features={[
                "프리미엄 플랜 모든 기능",
                "비즈니스 일본어 콘텐츠",
                "전문 분야별 용어집",
                "원어민 첨삭 피드백 (월 5회)",
                "실시간 화상 레슨 (월 2회)",
                "취업 인터뷰 대비 과정",
              ]}
              buttonText="비즈니스 플랜 시작하기"
              buttonHref="/business"
              popular={false}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 dark:bg-gray-700 dark:text-gray-300">
              자주 묻는 질문
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white">
              궁금한 점이 있으신가요?
            </h2>
            <p className="text-xl text-muted-foreground dark:text-gray-400">
              학습자들이 자주 묻는 질문들에 대한 답변을 확인하세요.
            </p>
          </div>

          <div className="max-w-3xl mx-auto divide-y">
            <FaqItem
              question="일본어를 처음 배우는데도 이용할 수 있나요?"
              answer="네, 물론입니다! 저희 플랫폼은 히라가나/카타카나부터 시작하는 완전 초보자를 위한 과정부터 고급 레벨까지 모든 수준의 학습자를 위한 콘텐츠를 제공하고 있습니다. 레벨 테스트를 통해 최적의 시작점을 추천해 드립니다."
            />
            <FaqItem
              question="하루에 얼마나 학습해야 효과가 있나요?"
              answer="꾸준함이 가장 중요합니다. 하루 15-30분이라도 매일 학습하는 것이 효과적입니다. 저희 앱은 짧은 학습 세션으로 구성되어 있어 바쁜 일상 속에서도 쉽게 공부할 수 있습니다."
            />
            <FaqItem
              question="JLPT 시험 준비에 도움이 되나요?"
              answer="네, 저희 플랫폼은 JLPT N5부터 N1까지 모든 레벨의 시험 준비를 지원합니다. 실제 시험과 유사한 형식의 문제와 모의고사, 그리고 취약 영역 분석을 통해 효율적인 시험 대비가 가능합니다."
            />
            <FaqItem
              question="무료 체험 후 자동 결제되나요?"
              answer="걱정하지 마세요. 7일 무료 체험 기간이 끝나기 전에 알림을 보내드리며, 직접 구독을 계속하기로 결정하지 않으시면 자동 결제되지 않습니다. 언제든지 해지 가능합니다."
            />
            <FaqItem
              question="오프라인 모드에서도 학습할 수 있나요?"
              answer="네, 주요 학습 콘텐츠는 앱에 다운로드하여 인터넷 연결 없이도 학습할 수 있습니다. 단, AI 회화 연습 등 일부 기능은 온라인 연결이 필요합니다."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-gray-950 dark:to-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            오늘부터 일본어 학습을 시작하세요
          </h2>
          <p className="text-xl text-blue-100 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            전 세계 10만 명 이상의 학습자들과 함께 일본어를 배우고, 새로운
            기회의 세계를 열어보세요.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-blue-700 hover:bg-blue-600/20 hover:text-white dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
            >
              <Link href="/register">무료로 시작하기</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-blue-700 hover:bg-blue-600/20 hover:text-white dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
            >
              <Link href="/demo">데모 보기</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

// Feature Card Component
function FeatureCard({
  icon,
  title,
  description,
  linkText,
  linkHref,
  available = true,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
  available?: boolean;
}) {
  return (
    <Card
      className={`group h-full transition-all shadow-md hover:shadow-lg ${
        available ? "hover:border-blue-500" : "opacity-70 cursor-not-allowed"
      }`}
    >
      <CardContent className="p-6 flex flex-col h-full">
        <div
          className={`rounded-full p-3 w-fit mb-5 bg-muted ${
            available ? "group-hover:bg-blue-50" : ""
          }`}
        >
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3">
          {title}
          {!available && <Badge className="ml-2 bg-gray-400">준비 중</Badge>}
        </h3>
        <p className="text-muted-foreground mb-5 flex-grow">{description}</p>
        {available ? (
          <Link
            href={linkHref}
            className="text-blue-600 font-medium inline-flex items-center gap-1 hover:underline mt-auto"
          >
            {linkText} <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <span className="text-gray-400 font-medium inline-flex items-center gap-1 mt-auto cursor-not-allowed">
            {linkText} <ChevronRight className="h-4 w-4" />
          </span>
        )}
      </CardContent>
    </Card>
  );
}

// Testimonial Card Component
function TestimonialCard({
  quote,
  name,
  title,
  avatarUrl,
}: {
  quote: string;
  name: string;
  title: string;
  avatarUrl: string;
}) {
  return (
    <Card className="h-full dark:bg-gray-800 dark:border-gray-700">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="mb-6">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="inline-block h-4 w-4 fill-yellow-400 text-yellow-400 mr-1 dark:fill-yellow-300 dark:text-yellow-300"
            />
          ))}
        </div>
        <p className="italic text-muted-foreground dark:text-gray-400 mb-6 flex-grow">
          "{quote}"
        </p>
        <div className="flex items-center gap-3 mt-auto">
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            <Image src={avatarUrl} alt={name} fill className="object-cover" />
          </div>
          <div>
            <div className="font-semibold dark:text-white">{name}</div>
            <div className="text-sm text-muted-foreground dark:text-gray-400">
              {title}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Stat Card Component
function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2 dark:text-blue-400">
        {number}
      </div>
      <div className="text-muted-foreground dark:text-gray-400">{label}</div>
    </div>
  );
}

// Pricing Card Component
function PricingCard({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  buttonHref,
  popular = false,
}: {
  title: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonHref: string;
  popular?: boolean;
}) {
  return (
    <Card
      className={`relative h-full transition-all border ${
        popular ? "border-blue-500 shadow-lg" : ""
      } dark:bg-gray-800 dark:border-gray-700`}
    >
      {popular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Badge className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
            인기 플랜
          </Badge>
        </div>
      )}
      <CardContent className="p-6 pt-8 flex flex-col h-full">
        <div className="mb-6 text-center">
          <h3 className="text-xl font-semibold mb-4 dark:text-white">
            {title}
          </h3>
          <div className="mb-2">
            <span className="text-3xl font-bold dark:text-white">{price}</span>
            {period && (
              <span className="text-muted-foreground dark:text-gray-400">
                /{period}
              </span>
            )}
          </div>
          <p className="text-muted-foreground text-sm dark:text-gray-400">
            {description}
          </p>
        </div>

        <ul className="space-y-3 mb-8 flex-grow">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
              <span className="dark:text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          className={`mt-auto w-full ${
            popular
              ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
              : ""
          }`}
          variant={popular ? "default" : "outline"}
        >
          <Link href={buttonHref}>{buttonText}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

// FAQ Item Component
function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="py-5">
      <h3 className="text-lg font-semibold mb-3 dark:text-white">{question}</h3>
      <p className="text-muted-foreground dark:text-gray-400">{answer}</p>
    </div>
  );
}
