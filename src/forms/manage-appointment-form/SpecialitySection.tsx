import { Button } from "@/components/ui/button";
import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import SpecialityItemInput from "./SpecialityItemInput";

const SpecialitySection = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "specialityItems",
  });

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Speciality</h2>
        <FormDescription>
          Create your specialities and give each a name and a price
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="specialityItems"
        render={() => (
          <FormItem className="flex flex-col gap-2">
            {fields.map((_, index) => (
              <SpecialityItemInput
                index={index}
                removeSpecialityItem={() => remove(index)}
              />
            ))}
          </FormItem>
        )}
      />
      <Button type="button" onClick={() => append({ name: "", price: "" })}>
        Add speciality
      </Button>
    </div>
  );
};

export default SpecialitySection;
