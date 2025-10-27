import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";

//const API_URL = "https://web-production-5136.up.railway.app";
const API_URL = "http://127.0.0.1:5000";

const EssayGenerator: React.FC = () => {
  const [topic, setTopic] = useState<string>("");
  const [essayType, setEssayType] = useState<"essay" | "paragraph">("essay");
  const [generatedEssay, setGeneratedEssay] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/generate-essay`, {
        topic,
        essay_type: essayType,
      });

      setGeneratedEssay(response.data.essay);
    } catch (err) {
      setError("Failed to generate essay. Please try again.");
      console.error("Error generating essay:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm bg-transparent">
        <h2 className="text-center mb-4">Essay/Paragraph Generator</h2>

        <div className="form-group mb-3">
          <label htmlFor="topic" className="form-label">Topic</label>
          <input
            type="text"
            id="topic"
            className="form-control"
            placeholder="Enter a topic..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="essayType" className="form-label">Choose Essay Type</label>
          <select
            id="essayType"
            className="form-select"
            value={essayType}
            onChange={(e) => setEssayType(e.target.value as "essay" | "paragraph")}
          >
            <option value="essay">Essay</option>
            <option value="paragraph">Paragraph</option>
          </select>
        </div>

        <div className="d-flex justify-content-center">
          <button
            className="btn btn-primary"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>

        {error && <div className="alert alert-danger mt-3">{error}</div>}

        {generatedEssay && (
          <div className="mt-4">
            <h3>Generated {essayType.charAt(0).toUpperCase() + essayType.slice(1)}:</h3>
            <div className="generated-essay bg-light p-3 rounded">
              <ReactMarkdown>{generatedEssay}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EssayGenerator;
