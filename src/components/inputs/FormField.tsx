import * as React from "react";
import { cn } from "../../utilities/cn";
import { Label } from "./Label";

export interface FormFieldProps {
  label?: React.ReactNode;
  htmlFor?: string;
  helperText?: React.ReactNode;
  errorText?: React.ReactNode;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function FormField({
  label,
  htmlFor,
  helperText,
  errorText,
  required,
  className,
  children,
}: FormFieldProps) {
  const generatedId = React.useId();
  const fieldId = htmlFor ?? generatedId;
  const helperId = `${fieldId}-helper`;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <Label htmlFor={fieldId} required={required}>
          {label}
        </Label>
      )}
      {React.isValidElement<Record<string, unknown>>(children)
        ? React.cloneElement(children, {
            id: fieldId,
            "aria-describedby": helperText || errorText ? helperId : undefined,
            "aria-invalid": Boolean(errorText) || undefined,
          })
        : children}
      {errorText ? (
        <p id={helperId} role="alert" className="text-caption text-danger">
          {errorText}
        </p>
      ) : helperText ? (
        <p id={helperId} className="text-caption text-text-secondary">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
