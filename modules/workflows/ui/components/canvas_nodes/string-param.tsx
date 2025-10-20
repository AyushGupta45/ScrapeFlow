"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ParamProps } from "@/modules/workflows/types";
import React, { useEffect, useId, useState } from "react";

const StringParam = ({
  input,
  value,
  updateNodeParamValue,
  disabled,
}: ParamProps) => {
  const [internalValue, setInternalValue] = useState(value ?? "");
  const id = useId();

  let Component: any = Input;

  if (input.variant === "textarea") {
    Component = Textarea;
  }

  useEffect(() => {
    setInternalValue(value ?? "");
  }, [value]);

  return (
    <div className="w-full p-1 space-y-1">
      <Label htmlFor={id}>
        {input.name}
        {input.required && <span className="text-red-500">*</span>}
      </Label>

      <Component
        placeholder="Enter value here"
        className="bg-background  text-xs mb-1"
        id={id}
        disabled={disabled}
        value={internalValue}
        onChange={(e: any) => setInternalValue(e.target.value)}
        onBlur={(e: any) => updateNodeParamValue(e.target.value)}
      />

      {input.helperText && (
        <p className="text-muted-foreground px-2">{input.helperText}</p>
      )}
    </div>
  );
};

export default StringParam;
