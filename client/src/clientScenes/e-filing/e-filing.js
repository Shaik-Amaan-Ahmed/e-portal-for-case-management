import "./e-filing.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PlaintForm from "../../Components/Forms/plaint-form/plaint-form";
import PetitionerForm from "../../Components/Forms/petitioner-form/petitioner-form";
import RespondantForm from "../../Components/Forms/respondent-form/respondent-form";

const steps = [
  "Enter plaint details",
  "Petitioner details",
  "Respondent details",
  "Upload documents",
  "Preview",
  "Payment",
];

const Efiling = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  return (
    <div className="e-filing-main">
      <Box width="100%">
        {/* stepper */}
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton
                sx={{
                  color: activeStep === index ? "green !important" : "inherit",
                  fontWeight: "bold",
                }}
                onClick={handleStep(index)}
              >
                <Typography variant="h5" fontWeight={activeStep === index ? "bold" : "none" } color={activeStep === index ? "orange" : "inherit"}>{label}</Typography>
              </StepButton>
            </Step>
          ))}
        </Stepper>

        <div className="div-forms">
          {allStepsCompleted() ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1, py: 1 }} variant="h4">
                Step {activeStep + 1}
              </Typography>
              {/* making forms */}
              
              {activeStep === 0 && (<PlaintForm />)}
              {activeStep === 1 && (<PetitionerForm activeStep={activeStep}/>)}
              {activeStep === 2 && (<RespondantForm activeStep={activeStep}/>)}
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleNext} sx={{ mr: 1, color: "inherit" }}>
                  Next
                </Button>
                {activeStep !== steps.length &&
                  (completed[activeStep] ? (
                    <Typography
                      variant="caption"
                      sx={{ display: "inline-block" }}
                    >
                      Step {activeStep + 1} already completed
                    </Typography>
                  ) : (
                    <Button onClick={handleComplete} color="inherit">
                      {completedSteps() === totalSteps() - 1
                        ? "Finish"
                        : "Complete Step"}
                    </Button>
                  ))}
              </Box>
            </React.Fragment>
          )}
        </div>
      </Box>
    </div>
  );
};

export default Efiling;
