"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

const newHabitSchema = z.object({
  name: z.string().min(3, "Habit name must be at least 3 characters long"),
  description: z.string().optional(),
  timeOfDay: z.enum(["morning", "afternoon", "evening"]),
  icon: z.string(),
  color: z
    .string()
    .regex(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/, "Invalid color format"),
});

type NewHabitFormData = z.infer<typeof newHabitSchema>;

const iconOptions = [
  { value: "run", label: "🏃‍♂️" },
  { value: "meditate", label: "🧘" },
  { value: "book", label: "📚" },
  { value: "water", label: "💧" },
];

const colorOptions = [
  { value: "red", label: "Red" },
  { value: "green", label: "Green" },
  { value: "blue", label: "Blue" },
  { value: "orange", label: "Orange" },
];

export default function NewHabitPage() {
  const { control, handleSubmit } = useForm<NewHabitFormData>({
    resolver: zodResolver(newHabitSchema),
    defaultValues: {
      name: "",
      description: "",
      timeOfDay: "morning",
      icon: iconOptions[0].value,
      color: colorOptions[0].value,
    },
  });

  const onSubmit = (data: NewHabitFormData) => {
    console.log("New Habit Data:", data);
  };

  return (
    <Card className="w-full max-w-lg mx-auto mt-20">
      <CardHeader>
        <CardTitle>Create New Habit</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="new-habit-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="habit-name">Habit Name</FieldLabel>
                  <Input
                    {...field}
                    id="habit-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g., Morning Jog"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="habit-description">
                    Description
                  </FieldLabel>
                  <Input
                    {...field}
                    id="habit-description"
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g., Jog for 30 minutes every morning"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="timeOfDay"
              control={control}
              render={({ field, fieldState }) => (
                <RadioGroup
                  {...field}
                  onValueChange={field.onChange}
                  aria-invalid={fieldState.invalid}
                  className="flex"
                >
                  <FieldLabel htmlFor="morning">
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldTitle>Morning</FieldTitle>
                      </FieldContent>
                      <RadioGroupItem value="morning" id="morning" />
                    </Field>
                  </FieldLabel>
                  <FieldLabel htmlFor="afternoon">
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldTitle>Afternoon</FieldTitle>
                      </FieldContent>
                      <RadioGroupItem value="afternoon" id="afternoon" />
                    </Field>
                  </FieldLabel>
                  <FieldLabel htmlFor="evening">
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldTitle>Evening</FieldTitle>
                      </FieldContent>
                      <RadioGroupItem value="evening" id="evening" />
                    </Field>
                  </FieldLabel>
                </RadioGroup>
              )}
            />
            <Controller
              name="icon"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Choose an Icon</FieldLabel>
                  <RadioGroup
                    {...field}
                    onValueChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                    className="flex gap-2"
                  >
                    {iconOptions.map((option) => (
                      <FieldLabel
                        key={option.value}
                        htmlFor={`icon-${option.value}`}
                      >
                        <Field orientation="horizontal">
                          <FieldContent>
                            <FieldTitle>{option.label}</FieldTitle>
                          </FieldContent>
                          <RadioGroupItem
                            value={option.value}
                            id={`icon-${option.value}`}
                          />
                        </Field>
                      </FieldLabel>
                    ))}
                  </RadioGroup>
                </Field>
              )}
            />
            <Controller
              name="color"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Choose a Color</FieldLabel>
                  <RadioGroup
                    {...field}
                    onValueChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                    className="flex gap-2"
                  >
                    {colorOptions.map((option) => (
                      <FieldLabel
                        key={option.value}
                        htmlFor={`color-${option.value}`}
                      >
                        <Field
                          orientation="horizontal"
                          className="rounded-lg border border-zinc-200 p-3 text-white shadow-sm transition focus-within:border-slate-400"
                          style={{ backgroundColor: option.value }}
                        >
                          <FieldContent>
                            <FieldTitle>{option.label}</FieldTitle>
                          </FieldContent>
                          <RadioGroupItem
                            value={option.value}
                            id={`color-${option.value}`}
                          />
                        </Field>
                      </FieldLabel>
                    ))}
                  </RadioGroup>
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" form="new-habit-form" className="w-full">
          Create Habit
        </Button>
      </CardFooter>
    </Card>
  );
}
