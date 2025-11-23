"use client";

import { useState } from "react";
import { Button } from "@/shared/ui";
import { X, Upload, AlertCircle } from "lucide-react";

interface JsonImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (data: any) => void;
}

export function JsonImportModal({
  isOpen,
  onClose,
  onImport,
}: JsonImportModalProps) {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleImport = () => {
    setError(null);
    try {
      const parsedData = JSON.parse(jsonInput);
      onImport(parsedData);
      onClose();
      setJsonInput(""); // Reset input after successful import
    } catch (err) {
      setError("Invalid JSON format. Please check your input.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-background w-full max-w-2xl rounded-lg shadow-lg border border-border flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold">Import Product from JSON</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          <p className="text-sm text-muted-foreground mb-4">
            Paste the JSON output from the AI content generator here.
          </p>

          {error && (
            <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-md flex items-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='{
  "name": "Product Name",
  "category": "Category",
  ...
}'
            className="w-full h-96 font-mono text-sm p-4 bg-muted/50 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
        </div>

        <div className="p-6 border-t border-border flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleImport} disabled={!jsonInput.trim()}>
            <Upload className="w-4 h-4 mr-2" />
            Import Data
          </Button>
        </div>
      </div>
    </div>
  );
}
