import { GlobeIcon, LucideProps } from "lucide-react";
import { TaskType, TaskTypesParams } from "../../interfaces";

export const LaunchBrowserTask = {
  type: TaskType.LAUNCH_BROWSER,
  label: "Launch broswer",
  icon: (props: LucideProps) => (
    <GlobeIcon className="stroke-pink-400" {...props} />
  ),
  isEntryPoint: true,
  inputs: [
    {
      name: "Website Url",
      type: TaskTypesParams.STRING,
      helperText: "eg: https://www.google.com",
      required: true,
      hideHandler: true,
    },
  ],
  outputs: [
    {
      name: "Web page",
      type: TaskTypesParams.BROWSER_INSTANCE,
    },
  ],
};
