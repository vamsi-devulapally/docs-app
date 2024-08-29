import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Appointments = () => {
  // This should be fetched from an API in a real application
  const appointments = [
    { id: 1, patientName: "John Doe", date: "2024-03-15", time: "09:00 AM" },
    { id: 2, patientName: "Jane Smith", date: "2024-03-15", time: "10:30 AM" },
    { id: 3, patientName: "Alice Johnson", date: "2024-03-15", time: "02:00 PM" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Today's Appointments</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">S.No</TableHead>
            <TableHead>Patient Name</TableHead>
            <TableHead>Appointment Date</TableHead>
            <TableHead>Time of Appointment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment, index) => (
            <TableRow key={appointment.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{appointment.patientName}</TableCell>
              <TableCell>{appointment.date}</TableCell>
              <TableCell>{appointment.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Appointments;