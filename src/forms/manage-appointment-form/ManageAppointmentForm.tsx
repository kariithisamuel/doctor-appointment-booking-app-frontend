import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import SpecializationsSection from "./SpecializationsSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Appointment } from "@/types";
import { useEffect } from "react";
import SpecialitySection from "./SpecialitySection";

const formSchema = z
  .object({
    appointmentName: z.string({
      required_error: "appointment name is required",
    }),
    city: z.string({
      required_error: "city is required",
    }),
    country: z.string({
      required_error: "country is required",
    }),
    appointmentTime: z.coerce.number({
      required_error: "appointment time is required",
      invalid_type_error: "must be a valid number",
    }),
    appointmentfees: z.coerce.number({
      required_error: "estimated appointment time is required",
      invalid_type_error: "must be a valid number",
    }),
    specializations: z.array(z.string()).nonempty({
      message: "please select at least one item",
    }),
    specialityItems: z.array(
      z.object({
        name: z.string().min(1, "name is required"),
        price: z.coerce.number().min(1, "price is required"),
      })
    ),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "image is required" }).optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"],
  });

type AppointmentFormData = z.infer<typeof formSchema>;

type Props = {
  appointment?: Appointment;
  onSave: (appointmentFormData: FormData) => void;
  isLoading: boolean;
};

const ManageAppointmentForm = ({ onSave, isLoading, appointment }: Props) => {
  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      specializations: [],
      specialityItems: [{ name: "", price: 0 }],
    },
  });

  useEffect(() => {
    if (!appointment) {
      return;
    }

    // price lowest domination of 100 = 100pence == 1GBP
    const appointmentFeeFormatted = parseInt(
      (appointment.appointmentFee / 100).toFixed(2)
    );

    const specialityItemsFormatted = appointment.specialityItems.map((item) => ({
      ...item,
      price: parseInt((item.price / 100).toFixed(2)),
    }));

    const updatedAppointment = {
      ...appointment,
      appointmentFee: appointmentFeeFormatted,
      specialityItems: specialityItemsFormatted,
    };

    form.reset(updatedAppointment);
  }, [form, appointment]);

  const onSubmit = (formDataJson: AppointmentFormData) => {
    const formData = new FormData();

    formData.append("appointmentName", formDataJson.appointmentName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);

    formData.append(
      "appointmentFee",
      (formDataJson.appointmentfees * 100).toString()
    );
    formData.append(
      "appointmentTime",
      formDataJson.appointmentTime.toString()
    );
    formDataJson.specializations.forEach((specialization, index) => {
      formData.append(`specializations[${index}]`, specialization);
    });
    formDataJson.specialityItems.forEach((specialityItem, index) => {
      formData.append(`specialityItems[${index}][name]`, specialityItem.name);
      formData.append(
        `specialityItems[${index}][price]`,
        (specialityItem.price * 100).toString()
      );
    });

    if (formDataJson.imageFile) {
      formData.append(`imageFile`, formDataJson.imageFile);
    }

    onSave(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <SpecializationsSection/>
        <Separator />
        <SpecialitySection/>
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
};

export default ManageAppointmentForm;
