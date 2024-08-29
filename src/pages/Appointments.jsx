import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { appointments } from '../data/dummyData';

const Appointments = () => {
  const location = useLocation();
  const from = location.state?.from || 'menu';
  const [todaysAppointments, setTodaysAppointments] = useState([]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const filtered = appointments.filter(appointment => appointment.date === today);
    setTodaysAppointments(filtered);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Today's Appointments</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">S.No</TableHead>
            <TableHead>Patient Name</TableHead>
            <TableHead>Patient ID</TableHead>
            <TableHead>Time of Appointment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todaysAppointments.map((appointment, index) => (
            <TableRow key={appointment.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{appointment.patientName}</TableCell>
              <TableCell>{appointment.patientId}</TableCell>
              <TableCell>{appointment.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Appointments;
