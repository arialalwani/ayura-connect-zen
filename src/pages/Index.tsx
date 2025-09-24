import { useState } from "react";
import Splash from "@/components/Splash";
import LoginForm from "@/components/LoginForm";
import DoctorDashboard from "@/components/DoctorDashboard";
import PatientDashboard from "@/components/PatientDashboard";
import PatientProfile from "@/components/PatientProfile";
import DoshaAssessment from "@/components/DoshaAssessment";
import DoshaResults from "@/components/DoshaResults";
import WellnessQuiz from "@/components/WellnessQuiz";
import WellnessResults from "@/components/WellnessResults";

type UserType = 'doctor' | 'patient' | null;
type Screen = 'splash' | 'login' | 'doctor-dashboard' | 'patient-dashboard' | 'patient-profile' | 'diet-plan-creator' | 'reports' | 'tracker' | 'chat' | 'dosha-assessment' | 'dosha-results' | 'wellness-quiz' | 'wellness-results';

const Index = () => {
  const [userType, setUserType] = useState<UserType>(null);
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [assessmentResults, setAssessmentResults] = useState<Record<string, string>>({});
  const [wellnessScore, setWellnessScore] = useState<number>(0);

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
    setCurrentScreen('login');
  };

  const handleLogin = () => {
    if (userType === 'doctor') {
      setCurrentScreen('doctor-dashboard');
    } else {
      setCurrentScreen('patient-dashboard');
    }
  };

  const handleNavigation = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  const handleBack = () => {
    if (currentScreen === 'login') {
      setCurrentScreen('splash');
      setUserType(null);
    } else if (currentScreen === 'patient-profile') {
      setCurrentScreen('doctor-dashboard');
    } else {
      // Handle other back navigations
      if (userType === 'doctor') {
        setCurrentScreen('doctor-dashboard');
      } else {
        setCurrentScreen('patient-dashboard');
      }
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <Splash onUserTypeSelect={handleUserTypeSelect} />;
      case 'login':
        return (
          <LoginForm 
            userType={userType!} 
            onBack={handleBack} 
            onLogin={handleLogin}
            onPatientSignup={() => setCurrentScreen('dosha-assessment')}
          />
        );
      case 'doctor-dashboard':
        return <DoctorDashboard onNavigate={handleNavigation} />;
      case 'patient-dashboard':
        return <PatientDashboard onNavigate={handleNavigation} />;
      case 'patient-profile':
        return <PatientProfile onBack={handleBack} onNavigate={handleNavigation} />;
      case 'dosha-assessment':
        return <DoshaAssessment 
          onBack={handleBack} 
          onComplete={(results) => {
            setAssessmentResults(results);
            setCurrentScreen('dosha-results');
          }} 
        />;
      case 'dosha-results':
        return <DoshaResults 
          onContinue={() => {
            if (userType === 'doctor') {
              setCurrentScreen('doctor-dashboard');
            } else {
              setCurrentScreen('patient-dashboard');
            }
          }}
          assessmentResults={assessmentResults}
        />;
      case 'wellness-quiz':
        return <WellnessQuiz 
          onBack={handleBack}
          onComplete={(score) => {
            setWellnessScore(score);
            setCurrentScreen('wellness-results');
          }}
        />;
      case 'wellness-results':
        return <WellnessResults 
          score={wellnessScore}
          onContinue={() => {
            if (userType === 'doctor') {
              setCurrentScreen('doctor-dashboard');
            } else {
              setCurrentScreen('patient-dashboard');
            }
          }}
        />;
      default:
        return (
          <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {currentScreen.split('-').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </h2>
              <p className="text-muted-foreground mb-6">This screen is coming soon!</p>
              <button 
                onClick={handleBack}
                className="text-primary hover:underline"
              >
                ← Go Back
              </button>
            </div>
          </div>
        );
    }
  };

  return renderScreen();
};

export default Index;
