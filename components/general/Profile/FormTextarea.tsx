import React, { FC } from "react";

interface Props {
  label: string;
  className?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
  isRequierd?: boolean;
  [key: string]: any;
}

const FormTextarea: FC<Props> = ({
  label,
  value,
  onChange,
  maxLength,
  isRequired,
  ...props
}) => {
  return (
    <div className="relative">
      <label>
        <div className="pb-2 font-semibold text-[18px] text-[#333] relative">
          {label}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </div>
        <div className="border rounded-xl border-s-border w-full sm:max-w-[400px] py-2 px-4">
          <div className="flex flex-row items-center justify-between relative">
            <textarea
              className={`w-full resize-none outline-none`}
              value={value}
              maxLength={maxLength}
              required={isRequired}
              onChange={onChange}
              rows={4}
              {...props}
            />
            {maxLength && (
              <div className="absolute bottom-0 right-0">
                {value ? value?.length : 0}/{maxLength}
              </div>
            )}
          </div>
        </div>
      </label>
    </div>
  );
};

export default FormTextarea;
