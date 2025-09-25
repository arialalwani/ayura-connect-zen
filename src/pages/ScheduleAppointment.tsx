import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, ArrowLeft, Clock } from "lucide-react";
import { format, addMinutes } from "date-fns";
import { cn } from "@/lib/utils";
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

interface Appointment {
  id: string;
  date: Date;
  time: string;
  duration: number;
  patientName: string;
  type: string;
}

const timeSlots = [
  "09:00", "09:45", "10:30", "11:15", "12:00", "12:45",
  "14:00", "14:45", "15:30", "16:15", "17:00", "17:45"
];

const ScheduleAppointment = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [consultationType, setConsultationType] = useState<string>("");

  const handleSchedule = () => {
    if (!selectedDate || !selectedTime || !consultationType) {
      toast.error("Please fill in all fields");
      return;
    }

    const appointment: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      date: selectedDate,
      time: selectedTime,
      duration: 45,
      patientName: "John Doe", // In real app, this would come from auth
      type: consultationType
    };

    // Store in localStorage temporarily
    const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    existingAppointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(existingAppointments));

    toast.success("Appointment scheduled successfully!");
    navigate('/');
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const getEndTime = (startTime: string) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const startDate = new Date();
    startDate.setHours(hours, minutes, 0, 0);
    const endDate = addMinutes(startDate, 45);
    return format(endDate, 'HH:mm');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light/20 to-accent-light/20 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-foreground mb-2">Schedule Appointment</h1>
          <p className="text-muted-foreground">Book your consultation with our Ayurveda experts</p>
        </div>

        <Card className="p-8 shadow-lg border-0 bg-card">
          <div className="space-y-6">
            {/* Consultation Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Consultation Type</label>
              <Select value={consultationType} onValueChange={setConsultationType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select consultation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="initial-consultation">Initial Consultation</SelectItem>
                  <SelectItem value="follow-up">Follow-up Visit</SelectItem>
                  <SelectItem value="dosha-assessment">Dosha Assessment</SelectItem>
                  <SelectItem value="lifestyle-counseling">Lifestyle Counseling</SelectItem>
                  <SelectItem value="herbal-medicine">Herbal Medicine Consultation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Select Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={isDateDisabled}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Time Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Select Time</label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    className="justify-center"
                    onClick={() => setSelectedTime(time)}
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    {time}
                  </Button>
                ))}
              </div>
              {selectedTime && (
                <p className="text-sm text-muted-foreground mt-2">
                  Session duration: {selectedTime} - {getEndTime(selectedTime)} (45 minutes)
                </p>
              )}
            </div>

            {/* Summary */}
            {selectedDate && selectedTime && consultationType && (
              <div className="bg-primary-light/10 p-4 rounded-lg border border-primary-light/20">
                <h3 className="font-medium text-foreground mb-2">Appointment Summary</h3>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Type:</span> {consultationType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                  <p><span className="font-medium">Date:</span> {format(selectedDate, "PPPP")}</p>
                  <p><span className="font-medium">Time:</span> {selectedTime} - {getEndTime(selectedTime)}</p>
                  <p><span className="font-medium">Duration:</span> 45 minutes</p>
                </div>
              </div>
            )}

            <Button 
              onClick={handleSchedule}
              className="w-full"
              disabled={!selectedDate || !selectedTime || !consultationType}
            >
              Schedule Appointment
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ScheduleAppointment;