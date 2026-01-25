interface DataBoxProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color: "indigo" | "emerald" | "amber";
}

export default function DataBox({ icon, title, value, color }: DataBoxProps) {
  const gradientClassVariants = {
    indigo: "bg-gradient-to-br from-indigo-50 to-indigo-100",
    emerald: "bg-gradient-to-br from-emerald-50 to-emerald-100",
    amber: "bg-gradient-to-br from-amber-50 to-amber-100",
  };
  const titleClassVariants = {
    indigo: "text-indigo-600",
    emerald: "text-emerald-600",
    amber: "text-amber-600",
  };
  const valueClassVariants = {
    indigo: "text-indigo-900",
    emerald: "text-emerald-900",
    amber: "text-amber-900",
  };

  return (
    <div
      className={`flex-1 min-w-0 ${gradientClassVariants[color]} rounded-xl p-4`}
    >
      <div
        className={`flex items-center gap-2 ${titleClassVariants[color]} mb-1`}
      >
        {icon}
        <span className="text-sm font-medium">{title}</span>
      </div>
      <div className={`text-2xl font-bold ${valueClassVariants[color]}`}>
        {value}
      </div>
    </div>
  );
}
