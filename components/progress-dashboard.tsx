"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const mockData = {
  weeklyProgress: [
    { day: "Mon", minutes: 30 },
    { day: "Tue", minutes: 45 },
    { day: "Wed", minutes: 25 },
    { day: "Thu", minutes: 60 },
    { day: "Fri", minutes: 40 },
    { day: "Sat", minutes: 90 },
    { day: "Sun", minutes: 50 },
  ],
  stats: {
    vocabularyProgress: 65,
    grammarProgress: 45,
    conversationProgress: 30,
  },
}

export function ProgressDashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Weekly Study Time</CardTitle>
          <CardDescription>
            Minutes spent studying per day
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData.weeklyProgress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="minutes"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Learning Progress</CardTitle>
          <CardDescription>
            Progress across different areas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Vocabulary</span>
              <span>{mockData.stats.vocabularyProgress}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary"
                style={{
                  width: `${mockData.stats.vocabularyProgress}%`,
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Grammar</span>
              <span>{mockData.stats.grammarProgress}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary"
                style={{
                  width: `${mockData.stats.grammarProgress}%`,
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Conversation</span>
              <span>{mockData.stats.conversationProgress}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary"
                style={{
                  width: `${mockData.stats.conversationProgress}%`,
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

