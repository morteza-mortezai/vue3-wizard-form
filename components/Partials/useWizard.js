import { ref } from "vue";


export const useWizard = () => {
  return {
    username,
    email,
    onNext,
    onPrev,
    currentStep,
    firstStepErrors,
    secondStepErrors,
  };
};
