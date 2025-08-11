"use client";
import { useForm, Controller } from "react-hook-form";
import type { Control } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

const inputClass =
  "w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500";

type FormValues = {
  idNumber: string;
  school: string;
  degree: string;
  country: string;
  codeforces: string;
  leetcode: string;
  github: string;
  essay1: string;
  essay2: string;
  resume: FileList;
};

const PersonalInfo = ({ control }: { control: Control<FormValues> }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-4">
      {/* ID Number */}
      <Controller
        name="idNumber"
        control={control}
        rules={{ required: "ID Number is required" }}
        render={({ field, fieldState }) => (
          <div>
            <input {...field} placeholder="ID Number" className={inputClass} />
            {fieldState.error && (
              <p className="text-red-500 text-sm">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      {/* School */}
      <Controller
        name="school"
        control={control}
        rules={{ required: "School is required" }}
        render={({ field, fieldState }) => (
          <div>
            <input
              {...field}
              placeholder="School / University"
              className={inputClass}
            />
            {fieldState.error && (
              <p className="text-red-500 text-sm">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />
    </div>

    {/* Degree */}
    <Controller
      name="degree"
      control={control}
      rules={{ required: "Degree Program is required" }}
      render={({ field, fieldState }) => (
        <div>
          <input
            {...field}
            placeholder="Degree Program"
            className={inputClass}
          />
          {fieldState.error && (
            <p className="text-red-500 text-sm">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />

    {/* Country Dropdown */}
    <Controller
      name="country"
      control={control}
      rules={{ required: "Country is required" }}
      render={({ field, fieldState }) => (
        <div>
          <select {...field} className={inputClass}>
            <option value="">Select your country</option>
            <option value="Ethiopia">Ethiopia</option>
            <option value="Rwanda">Rwanda</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Ghana">Ghana</option>
            <option value="Other">Other</option>
          </select>
          {fieldState.error && (
            <p className="text-red-500 text-sm">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  </div>
);

const CodingProfiles = ({ control }: { control: Control<FormValues> }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-4">
      <Controller
        name="codeforces"
        control={control}
        render={({ field }) => (
          <input {...field} placeholder="Codeforces" className={inputClass} />
        )}
      />
      <Controller
        name="leetcode"
        control={control}
        render={({ field }) => (
          <input {...field} placeholder="LeetCode" className={inputClass} />
        )}
      />
    </div>
    <Controller
      name="github"
      control={control}
      render={({ field }) => (
        <input {...field} placeholder="GitHub" className={inputClass} />
      )}
    />
  </div>
);

const EssayAndResume = ({ control }: { control: Control<FormValues> }) => (
  <div className="space-y-6">
    <Controller
      name="essay1"
      control={control}
      rules={{ required: "This essay is required" }}
      render={({ field, fieldState }) => (
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Tell us about yourself
          </label>
          <textarea {...field} rows={4} className={inputClass} />
          {fieldState.error && (
            <p className="text-red-500 text-sm">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
    <Controller
      name="essay2"
      control={control}
      rules={{ required: "This essay is required" }}
      render={({ field, fieldState }) => (
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Why do you want to join us?
          </label>
          <textarea {...field} rows={4} className={inputClass} />
          {fieldState.error && (
            <p className="text-red-500 text-sm">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
    <Controller
      name="resume"
      control={control}
      rules={{ required: "Resume file is required" }}
      render={({ field, fieldState }) => (
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Upload Resume
          </label>
          <input
            type="file"
            onChange={(e) => field.onChange(e.target.files)}
            className="block w-full text-sm text-gray-500
							file:mr-4 file:py-2 file:px-4
							file:rounded file:border-0
							file:text-sm file:font-semibold
							file:bg-gray-50 file:text-gray-700
							hover:file:bg-gray-100"
          />
          <div className="text-sm text-gray-500 mt-1 italic">
            {field.value?.[0]?.name || "No file chosen"}
          </div>
          {fieldState.error && (
            <p className="text-red-500 text-sm">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  </div>
);

// Header Step
const HeaderComponent = ({
  index,
  title,
  isActive,
}: {
  index: number;
  title: string;
  isActive: boolean;
}) => (
  <div className="flex gap-2 items-center">
    <div
      className={`w-7 h-7 flex items-center justify-center rounded-full ${
        isActive ? "bg-indigo-600 text-white" : "bg-gray-300 text-white"
      }`}
    >
      {index + 1}
    </div>
    <p
      className={`${
        isActive ? "text-indigo-600 font-medium" : "text-gray-500"
      }`}
    >
      {title}
    </p>
  </div>
);

const ApplicantFormPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const { control, handleSubmit, trigger, getValues } = useForm<FormValues>({
    defaultValues: {
      idNumber: "",
      school: "",
      degree: "",
      country: "",
      codeforces: "",
      leetcode: "",
      github: "",
      essay1: "",
      essay2: "",
      resume: undefined,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const formData = new FormData();

      formData.append("student_id", data.idNumber);
      formData.append("school", data.school);
      formData.append("degree", data.degree);
      formData.append("country", data.country);
      formData.append("codeforces_handle", data.codeforces);
      formData.append("leetcode_handle", data.leetcode);
      formData.append("essay_about_you", data.essay1);
      formData.append("essay_why_a2sv", data.essay2);

      if (data.resume && data.resume[0]) {
        formData.append("resume", data.resume[0]);
      }

      const response = await fetch(
        "https://a2sv-application-platform-backend-team3.onrender.com/applications",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Validation error:", errorData);
        alert("Submission failed. Please check your inputs.");
        return;
      }

      const result = await response.json();
      console.log("Success:", result);
      alert("Application submitted successfully!");
      router.push("auth/signup/applicant");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Submission error:", error.message);
        alert(`An unexpected error occurred: ${error.message}`);
      } else {
        console.error("Submission error:", error);
        alert("An unexpected error occurred.");
      }
    }
  };

  const goNext = async () => {
    const valid = await trigger();
    if (valid) setStep((prev) => prev + 1);
  };

  const goBack = () => setStep((prev) => Math.max(0, prev - 1));

  return (
    <main className="flex flex-col bg-gray-100 items-center min-h-screen p-4">
      <section className="bg-white w-full max-w-2xl rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center">Application Form</h1>

        {/* Progress Bar */}
        <div className="w-full my-6 bg-indigo-100 h-2 rounded-lg">
          <div
            style={{ width: `${((step + 1) * 100) / 3}%` }}
            className="bg-indigo-600 h-full rounded-lg transition-all duration-300"
          />
        </div>

        {/* Headers */}
        <div className="flex justify-between mb-6">
          <HeaderComponent
            index={0}
            title="Personal Info"
            isActive={step === 0}
          />
          <HeaderComponent
            index={1}
            title="Coding Profiles"
            isActive={step === 1}
          />
          <HeaderComponent
            index={2}
            title="Essays & Resume"
            isActive={step === 2}
          />
        </div>

        <hr className="mb-6" />

        {/* Active Step Component */}
        {step === 0 && <PersonalInfo control={control} />}
        {step === 1 && <CodingProfiles control={control} />}
        {step === 2 && <EssayAndResume control={control} />}

        {/* Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={goBack}
            disabled={step === 0}
            className="px-5 py-2 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 disabled:opacity-50"
          >
            Back
          </button>
          {step < 2 ? (
            <button
              onClick={goNext}
              className="px-5 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              {step === 0 ? "Next: Coding Profiles" : "Next: Essay and Resume"}
            </button>
          ) : (
            <button
              onClick={handleSubmit(onSubmit)}
              className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Submit
            </button>
          )}
        </div>
      </section>
    </main>
  );
};

export default ApplicantFormPage;
