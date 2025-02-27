import { FC } from 'react'

interface JapaneseTextProps {
  text: string
  furigana: string
  meaning: string
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"
}

export const JapaneseText: FC<JapaneseTextProps> = ({
  text,
  furigana,
  meaning,
  size = "md",
}) => {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative inline-block">
        <ruby className={`${sizeClasses[size]} leading-loose`}>
          {text}
          <rt className={`text-[0.6em] text-muted-foreground leading-none`}>
            {furigana}
          </rt>
        </ruby>
      </div>
      <div className={`text-muted-foreground ${
        size === "2xl" || size === "3xl" ? "text-lg" : "text-sm"
      }`}>
        {meaning}
      </div>
    </div>
  )
}

