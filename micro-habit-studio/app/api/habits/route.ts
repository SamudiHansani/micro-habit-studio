import { Habit } from "@/types";
import { NextResponse } from "next/server";

const habitData: Habit[] = [
  {
    id: 1,
    title: "Drink 500ml Water",
    category: "Health",
    streak: 12,
    completed: true,
    time: "Morning",
  },
  {
    id: 2,
    title: "Read 2 Pages",
    category: "Mindset",
    streak: 5,
    completed: false,
    time: "Evening",
  },
  {
    id: 3,
    title: "1-Min Plank",
    category: "Fitness",
    streak: 0,
    completed: false,
    time: "Anytime",
  },
];

export async function GET() {
  return NextResponse.json(habitData);
}

export async function POST(request: Request) {
  const newHabit = await request.json();
  habitData.push(newHabit);
  return NextResponse.json(newHabit);
}

export async function PUT(request: Request) {
  const updatedHabit = await request.json();
  const index = habitData.findIndex((habit) => habit.id === updatedHabit.id);
  if (index !== -1) {
    habitData[index] = updatedHabit;
    return NextResponse.json(updatedHabit);
  }
  return NextResponse.json({ message: "Habit not found" }, { status: 404 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (id) {
    const index = habitData.findIndex((habit) => habit.id === parseInt(id));
    if (index !== -1) {
      const deletedHabit = habitData.splice(index, 1)[0];
      return NextResponse.json(deletedHabit);
    }
    return NextResponse.json({ message: "Habit not found" }, { status: 404 });
  }
}
