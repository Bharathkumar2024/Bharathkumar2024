import React from 'react';
import { Button, Stack } from '@mui/material';
import jsPDF from 'jspdf';

export default function ExportButtons({ record }) {
  function exportCSV() {
    const csv = `id,hospitalId,hospitalName,bloodTypes,dispatchedAt,transport,staff,status\n${record.id},${record.hospitalId},${record.hospitalName},"${record.bloodTypes.map(bt => `${bt.type}:${bt.units}`).join(';')}",${record.dispatchedAt},${record.transport},${record.staff},${record.status}`;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `send-record-${record.id}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function exportPDF() {
    const doc = new jsPDF();
    doc.text(`Send Record ${record.id}`, 10, 10);
    doc.text(`Hospital: ${record.hospitalName} (${record.hospitalId})`, 10, 20);
    doc.text(`Dispatched: ${record.dispatchedAt}`, 10, 30);
    doc.text(`Transport: ${record.transport}`, 10, 40);
    doc.text(`Staff: ${record.staff}`, 10, 50);
    doc.text(`Blood Types: ${record.bloodTypes.map(bt => `${bt.type}:${bt.units}`).join(', ')}`, 10, 60);
    doc.save(`send-record-${record.id}.pdf`);
  }

  return (
    <Stack direction="row" spacing={1}>
      <Button size="small" variant="outlined" color="inherit" onClick={exportCSV}>Export CSV</Button>
      <Button size="small" variant="outlined" color="inherit" onClick={exportPDF}>Export PDF</Button>
    </Stack>
  );
}
