import { LucideProps, TextIcon } from "lucide-react";
import { TaskType, TaskTypesParams } from "../../types";

export const ExtractTextFromElement = {
  type: TaskType.EXTRACT_TEXT_FROM_ELEMENT,
  label: "Extract text from element",
  icon: (props: LucideProps) => (
    <TextIcon className="stroke-rose-400" {...props} />
  ),
  isEntryPoint: false,
  inputs: [
    {
      name: "Html",
      type: TaskTypesParams.STRING,
      required: true,
      variant: "textarea",
    },
    {
      name: "Selector",
      type: TaskTypesParams.STRING,
      required: true,
    },
  ],
  outputs: [
    {
      name: "Extracted text",
      type: TaskTypesParams.STRING,
    },
  ],
};
