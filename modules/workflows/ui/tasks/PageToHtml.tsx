import { CodeIcon, LucideProps } from "lucide-react";
import { TaskType, TaskTypesParams } from "../../types";

export const PageToHtmlTask = {
  type: TaskType.PAGE_TO_HTML,
  label: "Get html from page",
  icon: (props: LucideProps) => (
    <CodeIcon className="stroke-rose-400" {...props} />
  ),
  isEntryPoint: false,
  inputs: [
    {
      name: "Web page",
      type: TaskTypesParams.BROWSER_INSTANCE,
      required: true,
    },
  ],
  outputs: [
    {
      name: "Html",
      type: TaskTypesParams.STRING,
    },
    {
      name: "web page",
      type: TaskTypesParams.BROWSER_INSTANCE,
    },
  ],
};
