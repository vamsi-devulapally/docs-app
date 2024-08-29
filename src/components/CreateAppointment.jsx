import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const CreateAppointment = ({ selectedDate, onClose }) => {
  const [patientName, setPatientName] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');

  // Mock available time slots
  const availableSlots = [
    { time: '09:00 AM', status: 'available' },
    { time: '10:00 AM', status: 'conflict' },
    { time: '11:00 AM', status: 'available' },
    { time: '12:00 PM', status: 'available' },
    { time: '02:00 PM', status: 'conflict' },
    { time: '03:00 PM', status: 'available' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically save the appointment
    console.log('Appointment created:', { patientName, selectedSlot, date: selectedDate });
    onClose();
  };

  return (
    <Card className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <CardContent className="bg-white p-6 rounded-lg w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Appointment</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="patientName">Patient Name</Label>
            <Input
              id="patientName"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Search patient..."
            />
          </div>
          <div>
            <Label>Select Time Slot</Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {availableSlots.map((slot) => (
                <Button
                  key={slot.time}
                  type="button"
                  onClick={() => setSelectedSlot(slot.time)}
                  className={`${
                    slot.status === 'available' ? 'bg-green-500' : 'bg-red-500'
                  } text-white ${selectedSlot === slot.time ? 'ring-2 ring-blue-500' : ''}`}
                >
                  {slot.time}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Appointment</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};