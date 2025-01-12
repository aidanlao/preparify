"use client";
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from "react";
import { useAuth } from "@/backend/auth/authHooks";
import { CSSTransition } from "react-transition-group";
import ReactMarkdown from "react-markdown";

type FormDataType = {
  city: string;
  country: string;
  householdSize: string;
  petsCount: number; // Changed from 'pets' (string) to 'petsCount' (number)
  babyCount: string;
  childrenCount: string;
  isElderly: boolean;
  isDisabled: boolean;
  hasSickPerson: boolean;
};

const ProfileForm = () => {
  const questions = [
    { name: "city", label: "City:", type: "text" },
    { name: "country", label: "Country:", type: "text" },
    { name: "householdSize", label: "Household Size:", type: "number" },
    { name: "petsCount", label: "Pets Count:", type: "number" }, // Updated to 'petsCount'
    { name: "babyCount", label: "Baby Count:", type: "number" },
    { name: "childrenCount", label: "Children Count:", type: "number" },
    {
      name: "isElderly",
      label: "Is Elderly or has elderly person in household",
      type: "checkbox",
    },
    {
      name: "isDisabled",
      label: "Is Disabled or has disabled person in household",
      type: "checkbox",
    },
    {
      name: "hasSickPerson",
      label: "Has sick person in family",
      type: "checkbox",
    },
  ];
  const [isSubmitLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState();
  const [formData, setFormData] = useState<FormDataType>({
    city: "",
    country: "",
    householdSize: "",
    petsCount: 0, // Initialize 'petsCount' as a number
    babyCount: "",
    childrenCount: "",
    isElderly: false,
    isDisabled: false,
    hasSickPerson: false,
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { refetchUser, user, isLoading, error } = useAuth();

  // Load user details into the form when user data is available
  useEffect(() => {
    if (!isLoading && user) {
      setFormData({
        city: user.city || "",
        country: user.country || "",
        householdSize: user.householdSize || "",
        petsCount: user.petsCount || 0, // Set petsCount properly
        babyCount: user.babyCount || "",
        childrenCount: user.childrenCount || "",
        isElderly: user.isElderly || false,
        isDisabled: user.isDisabled || false,
        hasSickPerson: user.hasSickPerson || false,
      });
    }
  }, [isLoading, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
            ? Number(value)
            : value, // Handle number conversion
    }));
  };

  const handleSubmit = async (formData: any) => {
    setIsLoading(true);
    const url = "http://localhost:4000/data";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json(); // Parse the JSON response
      console.log(responseData);
      setResult(responseData);
      console.log("Server Response:", responseData);
    } catch (error) {
      console.error("Error sending user data:", error);
    }
  };
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log("Form submitted:", formData);
      // Submit the form data to your backend or API

      handleSubmit(formData);
    }
  };

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error loading user data</p>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      {!isSubmitLoading && (
        <CSSTransition
          in={true}
          key={currentQuestionIndex} // Add a key here to trigger the transition on each question change
          appear
          timeout={300}
          classNames="form-slide"
          unmountOnExit
        >
          <form
            onSubmit={handleNext}
            className="max-w-md mx-auto p-6 shadow-md rounded-md"
          >
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                {currentQuestion.label}
              </label>
              {currentQuestion.type === "checkbox" ? (
                <input
                  type="checkbox"
                  name={currentQuestion.name}
                  checked={(formData as any)[currentQuestion.name] as boolean}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
              ) : (
                <input
                  type={currentQuestion.type}
                  name={currentQuestion.name}
                  value={(formData as any)[currentQuestion.name] as string}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
              {currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"}
            </button>
          </form>
        </CSSTransition>
      )}
      {result && (
        <div className="markdown-container">
          <ReactMarkdown>{(result as any).story}</ReactMarkdown>
        </div>
      )}
    </>
  );
};

export default ProfileForm;
