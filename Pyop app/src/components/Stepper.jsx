import { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CheckCircle } from "lucide-react";
import { makeRequest } from "../services/generalFunctions";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setFilterData } from "../redux/actions";

export default function StepperForm({ steps }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({
    eventType: "",
    eventName: "",
    // guests_control: [],
    no_of_guests: null,
    venue: "",
    location: "",
    music: "",
    decoration: "",
    scheduledTime: "",
    invitationDesign: "",
    catering: "",
    photography: false,
    video: false,
    gaming: false,
    transportation: false,
  });

  const updateUserData = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    console.log("Form submitted:", userData);
    const payload = { ...userData, event: userData.eventName };
    delete payload.eventType;
    delete payload.eventName;
    console.log("Form submitted:21313", payload);
    try {
      const res = await makeRequest("post", "/create-party", payload);
      if (res.status) {
        toast.success("Enquiry Submitted Successfully");
        const saveFilter = await makeRequest("post", "/save-preferences", {
          location: userData.location,
          eventType: userData.eventName,
          music: userData.music,
          venue: userData.venue,
          video: userData.video,
          photography: userData.photography,
          transportation: userData.transportation,
          gaming: userData.gaming,
          catering: userData.catering,
          decoration: userData.decoration,
          invitationDesign: userData.invitationDesign,
          no_of_guests: userData.no_of_guests,
        });
        console.log(saveFilter);
        dispatch(
          setFilterData({
            location: userData.location,
            eventType: userData.eventName,
            music: userData.music,
            venue: userData.venue,
            video: userData.video,
            photography: userData.photography,
            transportation: userData.transportation,
            gaming: userData.gaming,
            catering: userData.catering,
            decoration: userData.decoration,
            invitationDesign: userData.invitationDesign,
            no_of_guests: userData.no_of_guests,
          })
        );
        navigate("/customer/dashboard");
      } else {
        toast.error("Missing required fields");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const isStep1Valid =
    userData.eventName &&
    // userData.guests_control.length > 0 &&
    userData.no_of_guests > 0 &&
    userData.venue &&
    userData.scheduledTime;
  const isStep2Valid = userData.decoration && userData.invitationDesign;

  const current = steps.find((step) => step.id === currentStep);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      {/* Stepper Header */}
      <div className="flex flex-row justify-between p-[1rem] items-center gap-6 bg-gray-900 rounded-lg">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;

          return (
            <div key={step.id} className="">
              <div className=" relative z-10">
                <div
                  className={`w-16 h-16 rounded-full transition-colors flex justify-center items-center ${
                    isCompleted || isCurrent
                      ? "bg-gradient-to-r from-pink-600 to-red-500 text-white"
                      : "bg-gray-700 text-gray-400"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-8 h-8" />
                  ) : (
                    <Icon className="w-8 h-8" />
                  )}
                </div>
                <div className="mt-3 text-center">
                  <p
                    className={`text-sm font-medium ${
                      isCurrent ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className="flex-1 h-1 bg-gray-700 mx-2 relative top-1.5"
                  style={{
                    background:
                      currentStep > step.id
                        ? "linear-gradient(to right, #e11d48, #be123c)"
                        : "rgba(75, 85, 99, 1)",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Form Content */}
      <Card className="bg-gray-800 text-white border-gray-700">
        <div className="font-semibold">
          Step {currentStep} of {steps.length} — {current?.description}
        </div>

        <CardContent className="space-y-6">
          {/* Inject component with props */}
          {current?.component({ userData, updateUserData })}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-4">
        <Button
          variant="outlined"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="w-24 cursor-pointer disabled:cursor-not-allowed"
        >
          Previous
        </Button>

        <div className="">
          {currentStep < steps.length ? (
            <Button
              onClick={nextStep}
              disabled={currentStep === 1 ? !isStep1Valid : !isStep2Valid}
              className="w-24 cursor-pointer disabled:cursor-not-allowed"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!isStep1Valid || !isStep2Valid}
              className="bg-green-600 hover:bg-green-700 text-white cursor-pointer disabled:cursor-not-allowed"
            >
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
