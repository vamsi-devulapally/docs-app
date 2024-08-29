import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateAppointment } from './CreateAppointment';

const CalendarPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(location.state?.selectedDate || new Date());
  const [showCreateAppointment, setShowCreateAppointment] = useState(false);

  // Mock appointments data
  const appointments = [
    { id: 1, patientName: "John Doe", time: "09:00 AM", duration: 30 },
    { id: 2, patientName: "Jane Smith", time: "11:30 AM", duration: 45 },
    { id: 3, patientName: "Alice Johnson", time: "02:00 PM", duration: 60 },
  ];

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Here you would typically fetch appointments for the selected date
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Calendar</h1>
        <Button onClick={() => setShowCreateAppointment(true)}>Create Appointment</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateChange}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Appointments for {selectedDate.toDateString()}</CardTitle>
          </CardHeader>
          <CardContent>
            {appointments.map((appointment) => (
              <div key={appointment.id} className="mb-4 p-4 border rounded-md">
                <p className="font-bold">{appointment.patientName}</p>
                <p>{appointment.time} - Duration: {appointment.duration} minutes</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      {showCreateAppointment && (
        <CreateAppointment
          selectedDate={selectedDate}
          onClose={() => setShowCreateAppointment(false)}
        />
      )}
    </div>
  );
};

export default CalendarPage;