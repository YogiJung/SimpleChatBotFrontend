export type DiagnosticContextType = {
    currentStep: number;
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

export type accessResponseType =  {
    "technicians": [string],
    "integrated_factors": [string]
}

export type answerType = { [key: number]: string };
export type errorType = { [key: number]: string | undefined };