import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateAppointment } from './CreateAppointment';
import { appointments } from '../data/dummyData';

const CalendarPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(location.state?.selectedDate || new Date());
  const [showCreateAppointment, setShowCreateAppointment] = useState(false);
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  useEffect(() => {
    const filtered = appointments.filter(appointment => 
      appointment.date === selectedDate.toISOString().split('T')[0]
    );
    setFilteredAppointments(filtered);
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAppointmentCreated = (newAppointment) => {
    setFilteredAppointments([...filteredAppointments, newAppointment]);
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
            {filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="mb-4 p-4 border rounded-md">
                <p className="font-bold">{appointment.patientName}</p>
                <p>{appointment.time}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      {showCreateAppointment && (
        <CreateAppointment
          selectedDate={selectedDate}
          onClose={() => setShowCreateAppointment(false)}
          onAppointmentCreated={handleAppointmentCreated}
        />
      )}
    </div>
  );
};

export default CalendarPage;
