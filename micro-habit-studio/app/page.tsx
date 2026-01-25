import DataBox from "@/components/custom/DataBox";
import { Button } from "@/components/ui/button";
import { Check, Flame, Plus, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <section className="flex flex-col gap-8">
        <article className="flex flex-row items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              My Micro Habits
            </h1>
            <p className="text-slate-500 mt-1">Small steps, big changes</p>
          </div>
          <Button>
            <Plus size={20} />
            New Habit
          </Button>
        </article>
        <article className="flex flex-row items-center justify-between gap-8">
          <DataBox
            icon={<Flame size={18} />}
            title="Total Streak"
            value="5 days"
            color="indigo"
          />
          <DataBox
            icon={<Check size={18} />}
            title="Today"
            value="2/4"
            color="emerald"
          />
          <DataBox
            icon={<TrendingUp size={18} />}
            title="Active Habits"
            value="4"
            color="amber"
          />
        </article>
      </section>
    </main>
  );
}
