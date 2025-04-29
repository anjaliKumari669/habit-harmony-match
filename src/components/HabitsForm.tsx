
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface HabitsFormProps {
  existingHabits: string[];
  onSave: (habits: string[]) => void;
}

const HabitsForm: React.FC<HabitsFormProps> = ({ existingHabits = [], onSave }) => {
  const [habits, setHabits] = useState<string[]>(existingHabits);
  const [newHabit, setNewHabit] = useState("");
  
  // Common habits suggestions
  const commonHabits = [
    "Early riser",
    "Night owl",
    "Clean and tidy",
    "Relaxed about cleaning",
    "Non-smoker",
    "Smoker",
    "Vegetarian",
    "Vegan",
    "Likes quiet",
    "Enjoys music",
    "Frequent guests",
    "Limited guests",
    "Pet owner",
    "Works from home",
    "Student"
  ];
  
  const addHabit = (habit: string) => {
    const trimmedHabit = habit.trim();
    if (trimmedHabit && !habits.includes(trimmedHabit)) {
      setHabits([...habits, trimmedHabit]);
      setNewHabit("");
    }
  };
  
  const removeHabit = (habitToRemove: string) => {
    setHabits(habits.filter(habit => habit !== habitToRemove));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newHabit.trim()) {
      addHabit(newHabit);
    }
  };
  
  const handleSuggestionClick = (habit: string) => {
    addHabit(habit);
  };
  
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-1">Your Habits & Lifestyle</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Add habits and lifestyle preferences to help find compatible roommates
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1">
          <Input
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            placeholder="Add a habit or lifestyle trait"
          />
        </div>
        <Button type="submit">Add</Button>
      </form>
      
      <div className="mt-2">
        <Label className="text-sm">Suggestions</Label>
        <div className="mt-1 flex flex-wrap gap-2">
          {commonHabits
            .filter(habit => !habits.includes(habit))
            .slice(0, 6)
            .map(habit => (
              <Badge 
                key={habit}
                variant="outline"
                className="cursor-pointer hover:bg-primary/10"
                onClick={() => handleSuggestionClick(habit)}
              >
                {habit}
              </Badge>
            ))}
        </div>
      </div>
      
      <div className="mt-4">
        <Label className="text-sm">Your Habits</Label>
        <div className="mt-2 p-3 border rounded-md min-h-20">
          {habits.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {habits.map(habit => (
                <Badge 
                  key={habit} 
                  variant="secondary"
                  className="flex items-center gap-1 pl-3"
                >
                  {habit}
                  <X
                    className="h-3 w-3 ml-1 cursor-pointer"
                    onClick={() => removeHabit(habit)}
                  />
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No habits added yet. Add some to improve your matching!
            </p>
          )}
        </div>
      </div>
      
      <div className="mt-4 flex justify-end">
        <Button onClick={() => onSave(habits)}>Save Habits</Button>
      </div>
    </div>
  );
};

export default HabitsForm;
