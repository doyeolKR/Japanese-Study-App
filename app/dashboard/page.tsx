import { ProgressDashboard } from "@/components/progress-dashboard"

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">
        Learning Dashboard
      </h1>
      <ProgressDashboard />
    </div>
  )
}

