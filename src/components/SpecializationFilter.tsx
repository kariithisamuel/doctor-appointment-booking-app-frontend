import { specializationList } from "@/config/appointment-options-config";
import { Label } from "./ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";

type Props = {
  onChange: (specializations: string[]) => void;
  selectedSpecializations: string[];
  isExpanded: boolean;
  onExpandedClick: () => void;
};

const specializationFilter = ({
  onChange,
  selectedSpecializations,
  isExpanded,
  onExpandedClick,
}: Props) => {
  const handleCuisinesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clickedSpecialization = event.target.value;
    const isChecked = event.target.checked;

    const newSpecializationsList = isChecked
      ? [...selectedSpecializations, clickedSpecialization]
      : selectedSpecializations.filter((specialization) => specialization !== clickedSpecialization);

    onChange(newSpecializationsList);
  };

  const handleSpecializationsReset = () => onChange([]);

  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">Filter By Specializations</div>
        <div
          onClick={handleSpecializationsReset}
          className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500"
        >
          Reset Filters
        </div>
      </div>

      <div className="space-y-2 flex flex-col">
        {specializationList
          .slice(0, isExpanded ? specializationList.length : 7)
          .map((specialization) => {
            const isSelected = selectedSpecializations.includes(specialization);
            return (
              <div className="flex">
                <input
                  id={`cuisine_${specialization}`}
                  type="checkbox"
                  className="hidden"
                  value={specialization}
                  checked={isSelected}
                  onChange={handleCuisinesChange}
                />
                <Label
                  htmlFor={`cuisine_${specialization}`}
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                    isSelected
                      ? "border border-green-600 text-green-600"
                      : "border border-slate-300"
                  }`}
                >
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {specialization}
                </Label>
              </div>
            );
          })}

        <Button
          onClick={onExpandedClick}
          variant="link"
          className="mt-4 flex-1"
        >
          {isExpanded ? (
            <span className="flex flex-row items-center">
              View Less <ChevronUp />
            </span>
          ) : (
            <span className="flex flex-row items-center">
              View More <ChevronDown />
            </span>
          )}
        </Button>
      </div>
    </>
  );
};

export default specializationFilter;
