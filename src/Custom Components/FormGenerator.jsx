import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";

export default function FormGenerator({
  handleSubmit,
  inputFields = [],
  formRef,
  isEdit = false,
  keyField,
  showValueField,
}) {
  //   const { formRef, getValues, setValues } = useFormHandler();
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  return (
    <form autoComplete="off" ref={formRef} onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 mt-2 mb-1 mx-1 lg:mx-2">
        {inputFields.map((field, index) => (
          <div key={index} className="relative flex-1">
            {/* Select Input */}
            {field.type === "select" ? (
              <>
                <select
                  required={field?.required}
                  name={field.name}
                  className="inputPeerField cursor-pointer peer border-borderColor focus:outline-none"
                >
                  <option value="" hidden>
                    Select Option
                  </option>
                  {(field?.dataOptions || []).map((option, idx) => (
                    <option
                      key={option.keyField || idx}
                      value={option[keyField]}
                    >
                      {option[showValueField]}
                    </option>
                  ))}
                </select>
                <label htmlFor={field.name} className="menuPeerLevel">
                  {field.label}
                </label>
              </>
            ) : (
              <>
                <input
                  type={field?.type}
                  name={field.name}
                  required={field?.required}
                  placeholder={field.placeholder || ""}
                  className="inputPeerField peer border-borderColor focus:outline-none"
                />
                <label htmlFor={field.name} className="menuPeerLevel">
                  {field.label}
                </label>
              </>
            )}
          </div>
        ))}

        {/* Submit Button */}
        <div className="flex gap-[0.25rem]">
          <div className="relative flex-1 flex justify-start items-center">
            <button
              type="submit"
              className="font-semibold text-xxxs h-[1.6rem] w-full rounded-md flex justify-center items-center cursor-pointer"
              style={{
                background: activeTheme?.menuColor,
                color: activeTheme?.iconColor,
              }}
            >
              {isEdit ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export const FormHeader = ({title}) => {
  const activeTheme = useSelector((state) => state.theme.activeTheme);
  return (
    <div
      className="flex justify-start items-center text-xxxs gap-1 w-full pl-2 h-5 font-semibold"
      style={{ background: activeTheme?.blockColor }}
    >
      <div>
        <FontAwesomeIcon icon="fa-solid fa-house" />
      </div>
      <div>{title}</div>
    </div>
  );
};
