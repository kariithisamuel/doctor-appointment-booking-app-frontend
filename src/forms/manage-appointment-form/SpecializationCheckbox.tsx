import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
  Specialization: string;
  field: ControllerRenderProps<FieldValues, "Specializations">;
};

const SpecializationCheckbox = ({ Specialization, field }: Props) => {
  const isChecked = Array.isArray(field.value) && field.value.includes(Specialization);

  const handleCheckedChange = (checked: boolean) => {
    if (checked) {
      field.onChange([...(field.value || []), Specialization]);
    } else {
      field.onChange((field.value || []).filter((value: string) => value !== Specialization));
    }
  };

  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        <Checkbox
          className="bg-white"
          checked={isChecked}
          onCheckedChange={handleCheckedChange}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal">{Specialization}</FormLabel>
    </FormItem>
  );
};

export default SpecializationCheckbox;
