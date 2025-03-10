
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "./FormField";

interface DescriptionFieldProps {
  description: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const DescriptionField = ({ description, error, onChange }: DescriptionFieldProps) => {
  return (
    <FormField id="description" label="Description" error={error}>
      <Textarea
        id="description"
        name="description"
        value={description || ''}
        onChange={onChange}
        rows={4}
        placeholder="Description détaillée du véhicule..."
        className={error ? "border-red-500" : ""}
      />
    </FormField>
  );
};
