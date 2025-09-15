"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ParamProps } from "@/modules/workflows/interfaces";
import React, { useId, useState } from "react";

const BrowserInstanceParam = ({ input }: ParamProps) => {
  // const [internalValue, setInternalValue] = useState(value ?? "");
  // const id = useId();

  return (
    // <div className="w-full p-1 space-y-1">
    //   <Label htmlFor={id}>
    //     {input.name}
    //     {input.required && <span className="text-red-500">*</span>}
    //   </Label>

    //   <Input
    //     placeholder="Enter value here"
    //     className="bg-background  text-xs mb-1"
    //     id={id}
    //     value={internalValue}
    //     onChange={(e) => setInternalValue(e.target.value)}
    //     onBlur={(e) => updateNodeParamValue(e.target.value)}
    //   />

    //   {input.helperText && (
    //     <p className="text-muted-foreground px-2">{input.helperText}</p>
    //   )}
    // </div>
    <p className="text-xs">{input.name}</p>
  );
};

export default BrowserInstanceParam;
