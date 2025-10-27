// src/components/SaveText.tsx
import React, { useState } from "react";
import axios from "axios";
import { auth } from "./firebase"; // ✅ make sure the path is correct

interface SaveTextProps {
  textToSave: string;
  onSaved?: () => void;
}

const SaveText: React.FC<SaveTextProps> = ({ textToSave, onSaved }) => {
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">(
    "idle"
  );

  const handleSubmit = async () => {
    if (!String(textToSave).trim()) return;

    const user = auth.currentUser; // ✅ use the imported auth object
    if (!user) {
      console.error("No user is logged in.");
      setStatus("error");
      return;
    }

    setStatus("saving");
    try {
      const token = await user.getIdToken(); // ✅ get the Firebase ID token
      await axios.post(
      "http://127.0.0.1:5000/api/user/texts",
      {
        text: typeof textToSave === "string"
          ? textToSave
          : JSON.stringify(textToSave),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
      setStatus("success");
      onSaved?.();
    } catch (err) {
      console.error("Failed to save:", err);
      setStatus("error");
    }
  };

  return (
    <div className="card p-3 mt-4 shadow-sm">
      <h5 className="mb-2">Save Generated Q&A</h5>
      <button
        className="btn btn-primary"
        onClick={handleSubmit}
        disabled={status === "saving"}
      >
        {status === "saving" ? "Saving..." : "Save to Profile"}
      </button>
      {status === "success" && (
        <div className="alert alert-success mt-2">Saved successfully!</div>
      )}
      {status === "error" && (
        <div className="alert alert-danger mt-2">Failed to save.</div>
      )}
    </div>
  );
};

export default SaveText;
