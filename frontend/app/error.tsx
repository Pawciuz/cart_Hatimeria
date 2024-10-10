'use client';
import { AlertTriangle } from 'lucide-react';

const Error: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-red-100 text-red-800">
      <AlertTriangle className="mb-4 h-16 w-16" />
      <h1 className="text-2xl font-bold">Coś poszło nie tak!</h1>
      <p className="mt-2">Spróbuj odświeżyć stronę lub wrócić później.</p>
    </div>
  );
};

export default Error;
