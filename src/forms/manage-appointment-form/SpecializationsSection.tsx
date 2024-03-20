import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { specializationList } from "@/config/appointment-options-config";
import { useFormContext } from "react-hook-form";
import SpecializationCheckbox from "./SpecializationCheckbox";

const SpecializationsSection = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Specializations</h2>
        <FormDescription>
        select your medical specialization
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="Specializations"
        render={({ field }) => (
          <FormItem>
            <div className="grid md:grid-cols-5 gap-1">
              {specializationList.map((specializationItem) => (
                <SpecializationCheckbox Specialization={specializationItem} field={field} />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default SpecializationsSection;
