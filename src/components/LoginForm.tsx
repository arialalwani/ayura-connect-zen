import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Mail, Lock, User, Phone } from "lucide-react";

interface LoginFormProps {
  userType: 'doctor' | 'patient';
  onBack: () => void;
  onLogin: () => void;
}

const LoginForm = ({ userType, onBack, onLogin }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-0 bg-card">
        <div className="p-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-4 text-muted-foreground hover:text-foreground wellness-transition"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              Welcome {userType === 'doctor' ? 'Doctor' : 'Patient'}
            </h2>
            <p className="text-muted-foreground mt-2">
              Sign in to your AyuraCare account
            </p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-secondary">
              <TabsTrigger value="login" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Sign Up
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4 mt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email"
                      className="pl-10 h-12 border-border focus:ring-primary"
                      required 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Enter your password"
                      className="pl-10 h-12 border-border focus:ring-primary"
                      required 
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-primary hover:bg-primary-hover text-primary-foreground font-medium wellness-transition"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Login'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4 mt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullname">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="fullname" 
                      type="text" 
                      placeholder="Enter your full name"
                      className="pl-10 h-12 border-border focus:ring-primary"
                      required 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="signup-email" 
                      type="email" 
                      placeholder="Enter your email"
                      className="pl-10 h-12 border-border focus:ring-primary"
                      required 
                    />
                  </div>
                </div>
                
                {userType === 'doctor' && (
                  <div className="space-y-2">
                    <Label htmlFor="license">License Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="license" 
                        type="text" 
                        placeholder="Medical license number"
                        className="pl-10 h-12 border-border focus:ring-primary"
                        required 
                      />
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="signup-password" 
                      type="password" 
                      placeholder="Create a password"
                      className="pl-10 h-12 border-border focus:ring-primary"
                      required 
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-primary hover:bg-primary-hover text-primary-foreground font-medium wellness-transition"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating account...' : 'Sign Up'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;