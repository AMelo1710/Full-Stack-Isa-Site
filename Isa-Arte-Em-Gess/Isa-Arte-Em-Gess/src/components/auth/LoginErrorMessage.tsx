
import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface LoginErrorMessageProps {
  visible: boolean;
  message: string;
}

const LoginErrorMessage: React.FC<LoginErrorMessageProps> = ({ visible, message }) => {
  if (!visible) return null;
  
  return (
    <Alert variant="destructive" className="mt-2">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default LoginErrorMessage;
