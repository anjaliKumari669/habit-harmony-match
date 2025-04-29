
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { RoommatePreferences } from "@/data/mockData";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

interface PreferencesSurveyProps {
  initialPreferences?: Partial<RoommatePreferences>;
  onSubmit: (preferences: RoommatePreferences) => void;
}

const defaultPreferences: RoommatePreferences = {
  sleepSchedule: "normal",
  cleanliness: "moderate",
  noise: "moderate",
  cooking: "occasional",
  social: "balanced",
  studyWork: "flexible",
  pets: false,
  smoking: false,
  drinking: false,
  guests: "occasionally",
  roomType: "private"
};

const PreferencesSurvey: React.FC<PreferencesSurveyProps> = ({
  initialPreferences = {},
  onSubmit,
}) => {
  const [preferences, setPreferences] = useState<RoommatePreferences>({
    ...defaultPreferences,
    ...initialPreferences,
  });
  
  const [step, setStep] = useState(0);
  
  const handleChange = <K extends keyof RoommatePreferences>(
    key: K,
    value: RoommatePreferences[K]
  ) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };
  
  const nextStep = () => {
    if (step < surveySteps.length - 1) {
      setStep(step + 1);
    }
  };
  
  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    toast.success("Preferences saved successfully!");
    onSubmit(preferences);
  };
  
  const surveySteps = [
    {
      title: "Sleep & Noise",
      description: "Tell us about your sleep schedule and noise tolerance",
      fields: (
        <div className="space-y-6">
          <div>
            <Label className="text-base font-medium">What's your sleep schedule like?</Label>
            <CardDescription className="mt-1 mb-3">
              This helps match you with roommates who have similar sleeping habits.
            </CardDescription>
            <RadioGroup
              value={preferences.sleepSchedule}
              onValueChange={(value) => handleChange("sleepSchedule", value)}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50">
                <RadioGroupItem value="early" id="sleep-early" />
                <div>
                  <Label htmlFor="sleep-early" className="font-medium cursor-pointer">Early Riser</Label>
                  <p className="text-sm text-muted-foreground">I go to bed early and wake up early</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50">
                <RadioGroupItem value="normal" id="sleep-normal" />
                <div>
                  <Label htmlFor="sleep-normal" className="font-medium cursor-pointer">Regular Hours</Label>
                  <p className="text-sm text-muted-foreground">I follow typical sleep hours</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50">
                <RadioGroupItem value="late" id="sleep-late" />
                <div>
                  <Label htmlFor="sleep-late" className="font-medium cursor-pointer">Night Owl</Label>
                  <p className="text-sm text-muted-foreground">I stay up late and sleep in</p>
                </div>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <Label className="text-base font-medium">What's your noise preference?</Label>
            <CardDescription className="mt-1 mb-3">
              How quiet or noisy do you prefer your living environment?
            </CardDescription>
            <RadioGroup
              value={preferences.noise}
              onValueChange={(value) => handleChange("noise", value)}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50">
                <RadioGroupItem value="quiet" id="noise-quiet" />
                <div>
                  <Label htmlFor="noise-quiet" className="font-medium cursor-pointer">Very Quiet</Label>
                  <p className="text-sm text-muted-foreground">I prefer minimal noise and disturbance</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50">
                <RadioGroupItem value="moderate" id="noise-moderate" />
                <div>
                  <Label htmlFor="noise-moderate" className="font-medium cursor-pointer">Moderate</Label>
                  <p className="text-sm text-muted-foreground">Some noise is fine during the day</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50">
                <RadioGroupItem value="loud" id="noise-loud" />
                <div>
                  <Label htmlFor="noise-loud" className="font-medium cursor-pointer">Lively</Label>
                  <p className="text-sm text-muted-foreground">I don't mind noise and activity</p>
                </div>
              </div>
            </RadioGroup>
          </div>
        </div>
      ),
    },
    {
      title: "Cleanliness & Cooking",
      description: "Let's talk about your cleaning and cooking habits",
      fields: (
        <div className="space-y-6">
          <div>
            <Label className="text-base font-medium">How would you describe your cleanliness?</Label>
            <CardDescription className="mt-1 mb-3">
              This helps match you with roommates who have similar cleaning standards.
            </CardDescription>
            <RadioGroup
              value={preferences.cleanliness}
              onValueChange={(value) => handleChange("cleanliness", value)}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50">
                <RadioGroupItem value="neat" id="clean-neat" />
                <div>
                  <Label htmlFor="clean-neat" className="font-medium cursor-pointer">Very Neat</Label>
                  <p className="text-sm text-muted-foreground">I keep everything clean and organized</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50">
                <RadioGroupItem value="moderate" id="clean-moderate" />
                <div>
                  <Label htmlFor="clean-moderate" className="font-medium cursor-pointer">Moderately Clean</Label>
                  <p className="text-sm text-muted-foreground">I clean regularly but not obsessively</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50">
                <RadioGroupItem value="messy" id="clean-messy" />
                <div>
                  <Label htmlFor="clean-messy" className="font-medium cursor-pointer">Relaxed</Label>
                  <p className="text-sm text-muted-foreground">I don't mind some clutter</p>
                </div>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <Label className="text-base font-medium">How often do you cook?</Label>
            <CardDescription className="mt-1 mb-3">
              Your cooking habits impact shared kitchen use.
            </CardDescription>
            <RadioGroup
              value={preferences.cooking}
              onValueChange={(value) => handleChange("cooking", value)}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50">
                <RadioGroupItem value="frequent" id="cook-frequent" />
                <div>
                  <Label htmlFor="cook-frequent" className="font-medium cursor-pointer">Frequent Cook</Label>
                  <p className="text-sm text-muted-foreground">I cook most of my meals</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50">
                <RadioGroupItem value="occasional" id="cook-occasional" />
                <div>
                  <Label htmlFor="cook-occasional" className="font-medium cursor-pointer">Occasional Cook</Label>
                  <p className="text-sm text-muted-foreground">I cook a few times a week</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50">
                <RadioGroupItem value="none" id="cook-none" />
                <div>
                  <Label htmlFor="cook-none" className="font-medium cursor-pointer">Rarely Cook</Label>
                  <p className="text-sm text-muted-foreground">I usually eat out or order in</p>
                </div>
              </div>
            </RadioGroup>
          </div>
        </div>
      ),
    },
    {
      title: "Social & Study Habits",
      description: "Tell us about your social preferences and work habits",
      fields: (
        <div className="space-y-6">
          <div>
            <Label className="text-base font-medium">How would you describe your social style?</Label>
            <CardDescription className="mt-1 mb-3">
              This helps match you with roommates who have compatible social styles.
            </CardDescription>
            <RadioGroup
              value={preferences.social}
              onValueChange={(value) => handleChange("social", value)}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50">
                <RadioGroupItem value="introvert" id="social-introvert" />
                <div>
                  <Label htmlFor="social-introvert" className="font-medium cursor-pointer">Introvert</Label>
                  <p className="text-sm text-muted-foreground">I prefer quiet time and privacy</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50">
                <RadioGroupItem value="balanced" id="social-balanced" />
                <div>
                  <Label htmlFor="social-balanced" className="font-medium cursor-pointer">Balanced</Label>
                  <p className="text-sm text-muted-foreground">I enjoy socializing and alone time</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50">
                <RadioGroupItem value="extrovert" id="social-extrovert" />
                <div>
                  <Label htmlFor="social-extrovert" className="font-medium cursor-pointer">Extrovert</Label>
                  <p className="text-sm text-muted-foreground">I'm very social and outgoing</p>
                </div>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <Label className="text-base font-medium">How would you describe your study/work habits?</Label>
            <CardDescription className="mt-1 mb-3">
              This helps match you with roommates who have compatible work/study environments.
            </CardDescription>
            <RadioGroup
              value={preferences.studyWork}
              onValueChange={(value) => handleChange("studyWork", value)}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50">
                <RadioGroupItem value="focused" id="study-focused" />
                <div>
                  <Label htmlFor="study-focused" className="font-medium cursor-pointer">Highly Focused</Label>
                  <p className="text-sm text-muted-foreground">I need strict quiet to work/study</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50">
                <RadioGroupItem value="relaxed" id="study-relaxed" />
                <div>
                  <Label htmlFor="study-relaxed" className="font-medium cursor-pointer">Relaxed</Label>
                  <p className="text-sm text-muted-foreground">I can work with some background noise</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50">
                <RadioGroupItem value="flexible" id="study-flexible" />
                <div>
                  <Label htmlFor="study-flexible" className="font-medium cursor-pointer">Flexible</Label>
                  <p className="text-sm text-muted-foreground">I can work anywhere, anytime</p>
                </div>
              </div>
            </RadioGroup>
          </div>
        </div>
      ),
    },
    {
      title: "Lifestyle Preferences",
      description: "Share a few more details about your lifestyle",
      fields: (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Pet Friendly</Label>
                <p className="text-sm text-muted-foreground">Are you comfortable living with pets?</p>
              </div>
              <Switch
                checked={preferences.pets}
                onCheckedChange={(checked) => handleChange("pets", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Smoking</Label>
                <p className="text-sm text-muted-foreground">Do you smoke or are you comfortable with smoking?</p>
              </div>
              <Switch
                checked={preferences.smoking}
                onCheckedChange={(checked) => handleChange("smoking", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Drinking</Label>
                <p className="text-sm text-muted-foreground">Do you drink or are you comfortable with drinking?</p>
              </div>
              <Switch
                checked={preferences.drinking}
                onCheckedChange={(checked) => handleChange("drinking", checked)}
              />
            </div>
          </div>
          
          <div>
            <Label className="text-base font-medium">How often do you have guests over?</Label>
            <CardDescription className="mt-1 mb-3">
              This helps match you with roommates who have similar preferences about guests.
            </CardDescription>
            <RadioGroup
              value={preferences.guests}
              onValueChange={(value) => handleChange("guests", value)}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50">
                <RadioGroupItem value="rarely" id="guests-rarely" />
                <div>
                  <Label htmlFor="guests-rarely" className="font-medium cursor-pointer">Rarely</Label>
                  <p className="text-sm text-muted-foreground">Almost never have guests over</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50">
                <RadioGroupItem value="occasionally" id="guests-occasionally" />
                <div>
                  <Label htmlFor="guests-occasionally" className="font-medium cursor-pointer">Occasionally</Label>
                  <p className="text-sm text-muted-foreground">Have guests over sometimes</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50">
                <RadioGroupItem value="frequently" id="guests-frequently" />
                <div>
                  <Label htmlFor="guests-frequently" className="font-medium cursor-pointer">Frequently</Label>
                  <p className="text-sm text-muted-foreground">Often have friends or family over</p>
                </div>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <Label className="text-base font-medium">Room Type Preference</Label>
            <CardDescription className="mt-1 mb-3">
              What type of room arrangement are you looking for?
            </CardDescription>
            <RadioGroup
              value={preferences.roomType}
              onValueChange={(value) => handleChange("roomType", value)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50">
                <RadioGroupItem value="private" id="room-private" />
                <div>
                  <Label htmlFor="room-private" className="font-medium cursor-pointer">Private Room</Label>
                  <p className="text-sm text-muted-foreground">I want my own bedroom</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-muted/50">
                <RadioGroupItem value="shared" id="room-shared" />
                <div>
                  <Label htmlFor="room-shared" className="font-medium cursor-pointer">Shared Room</Label>
                  <p className="text-sm text-muted-foreground">I'm open to sharing a bedroom</p>
                </div>
              </div>
            </RadioGroup>
          </div>
        </div>
      ),
    },
    {
      title: "Additional Information",
      description: "Share anything else potential roommates should know",
      fields: (
        <div className="space-y-6">
          <div>
            <Label className="text-base font-medium">Additional Information</Label>
            <CardDescription className="mt-1 mb-3">
              Is there anything else potential roommates should know about you?
            </CardDescription>
            <Textarea
              placeholder="Share any additional preferences, requirements, or information about yourself..."
              className="h-32"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">{surveySteps[step].title}</CardTitle>
        <CardDescription>{surveySteps[step].description}</CardDescription>
      </CardHeader>
      <CardContent>{surveySteps[step].fields}</CardContent>
      <CardFooter className="flex justify-between pt-4 border-t">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={step === 0}
        >
          Previous
        </Button>
        
        <div className="text-sm text-muted-foreground">
          Step {step + 1} of {surveySteps.length}
        </div>
        
        {step === surveySteps.length - 1 ? (
          <Button onClick={handleSubmit}>Complete</Button>
        ) : (
          <Button onClick={nextStep}>Next</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PreferencesSurvey;
