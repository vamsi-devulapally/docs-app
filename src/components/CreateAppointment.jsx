import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { patients, appointments, addAppointment } from '../data/dummyData';

export const CreateAppointment = ({ selectedDate, onClose, onAppointmentCreated }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);

  useEffect(() => {
    const filtered = patients.filter(patient => 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPatients(filtered);
  }, [searchTerm]);

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
    if (selectedPatient && selectedSlot) {
      const newAppointment = {
        id: appointments.length + 1,
        patientId: selectedPatient.id,
        patientName: selectedPatient.name,
        date: selectedDate.toISOString().split('T')[0],
        time: selectedSlot
      };
      addAppointment(newAppointment);
      onAppointmentCreated(newAppointment);
      onClose();
    }
  };

  return (
    <Card className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <CardContent className="bg-white p-6 rounded-lg w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Appointment</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="patientSearch">Search Patient</Label>
            <Input
              id="patientSearch"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or ID..."
            />
            {filteredPatients.length > 0 && (
              <ul className="mt-2 border rounded-md max-h-40 overflow-y-auto">
                {filteredPatients.map(patient => (
                  <li
                    key={patient.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedPatient(patient);
                      setSearchTerm(patient.name);
                    }}
                  >
                    {patient.name} ({patient.id})
                  </li>
                ))}
              </ul>
            )}
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
            <Button type="submit" disabled={!selectedPatient || !selectedSlot}>Create Appointment</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
