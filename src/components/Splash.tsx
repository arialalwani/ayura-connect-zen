import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserCog, User } from "lucide-react";
import ayuracarelogo from "@/assets/ayuracare-logo.png";

interface SplashProps {
  onUserTypeSelect: (userType: 'doctor' | 'patient') => void;
}

const Splash = ({ onUserTypeSelect }: SplashProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center shadow-lg border-0 bg-card">
        <div className="mb-8 flex justify-center">
          <img 
            src={ayuracarelogo} 
            alt="AyuraCare Logo" 
            className="w-24 h-24 float-animation"
          />
        </div>
        
        <h1 className="text-3xl font-bold text-foreground mb-2">
          AyuraCare
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Personalized Ayurvedic wellness at your fingertips
        </p>
        
        <div className="space-y-4">
          <Button 
            onClick={() => onUserTypeSelect('doctor')}
            className="w-full h-14 bg-primary hover:bg-primary-hover text-primary-foreground font-medium text-lg wellness-transition group"
          >
            <UserCog className="mr-3 h-5 w-5 group-hover:scale-110 wellness-transition" />
            I am a Doctor
          </Button>
          
          <Button 
            onClick={() => onUserTypeSelect('patient')}
            variant="outline"
            className="w-full h-14 border-primary text-primary hover:bg-primary-light font-medium text-lg wellness-transition group"
          >
            <User className="mr-3 h-5 w-5 group-hover:scale-110 wellness-transition" />
            I am a Patient
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground mt-8">
          Ancient wisdom, modern care
        </p>
      </Card>
    </div>
  );
};

export default Splash;