import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { generateQuestions } from "../api"; // Updated API function
import ShowQandA from "../components/ShowQandA";
import SaveText from "./SaveText";

type Option = { label: string; text: string };
type MCQ = { question: string; options: Option[]; answer: string };
type Narrative = { question: string; answer: string };

const QuestionGenerator = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [inputText, setInputText] = useState<string>("");
  const [questionType, setQuestionType] = useState<"mcq" | "narrative">("mcq");
  const [numQuestions, setNumQuestions] = useState<number>(10);
  const [level, setLevel] = useState<string>("Undergraduate");
  const [difficulty, setDifficulty] = useState<string>("Average");
  const [mcqs, setMcqs] = useState<MCQ[]>([]);
  const [narrativeQuestions, setNarrativeQuestions] = useState<Narrative[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toSave, setToSave] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setInputText(""); // Reset text input
      setError(null);
    }
  };

  const handleGenerateQuestions = async () => {
    if (!selectedFile && !inputText.trim()) {
      setError("Please provide either a PDF file or input text.");
      return;
    }

    setLoading(true);
    setMcqs([]);
    setNarrativeQuestions([]);
    setError(null);
    setToSave("");

    try {
      const data = await generateQuestions({
        file: selectedFile,
        text: inputText.trim(),
        questionType,
        numQuestions,
        level,
        difficulty,
      });

      if (questionType === "mcq") {
        setMcqs(data);
      } else {
        setNarrativeQuestions(data);
      }
      setToSave(data);
    } catch (error) {
      console.error("Error generating questions", error);
      setError("Failed to generate questions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4 mb-4 p-4 border shadow-sm">
      <h2 className="text-center mb-4">PDF/Text to Q&A Generator</h2>

      <div className="mb-3">
        <label className="form-label">Upload PDF File:</label>
        <input type="file" accept="application/pdf" className="form-control" onChange={handleFileChange} />
      </div>

      <div className="mb-3">
        <label className="form-label">Or Enter Text:</label>
        <textarea
          className="form-control"
          rows={4}
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            setSelectedFile(null); // Reset file input
          }}
          placeholder="Enter text here..."
        />
      </div>

      {/* Question Type */}
      <div className="mb-3">
        <label className="form-label">Select Question Type:</label>
        <div className="btn-group w-100">
          <button className={`btn ${questionType === "mcq" ? "btn-success" : "btn-outline-success"}`} onClick={() => setQuestionType("mcq")}>MCQs</button>
          <button className={`btn ${questionType === "narrative" ? "btn-success" : "btn-outline-success"}`} onClick={() => setQuestionType("narrative")}>Narrative</button>
        </div>
      </div>

      {/* Settings */}
      <div className="mb-3">
        <label className="form-label">Number of Questions:</label>
        <select className="form-control" value={numQuestions} onChange={(e) => setNumQuestions(Number(e.target.value))}>
          {[5, 10, 15, 20].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Level:</label>
        <select className="form-control" value={level} onChange={(e) => setLevel(e.target.value)}>
          {["School", "Higher Secondary", "Undergraduate"].map((lvl) => (
            <option key={lvl} value={lvl}>{lvl}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Difficulty:</label>
        <select className="form-control" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          {["Easy", "Average", "Hard"].map((diff) => (
            <option key={diff} value={diff}>{diff}</option>
          ))}
        </select>
      </div>

      <button onClick={handleGenerateQuestions} disabled={loading} className="btn-grad-blue  w-100">
        {loading ? (
    <div className="d-flex align-items-center  justify-content-center">
    <div className="spinner-border me-2" role="status">
      <span className="spinner"></span> 
      </div>
      Generating...
    </div>
  )  : "Generate Questions"}
      </button>

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      <ShowQandA questionType={questionType} mcqs={mcqs} narrativeQuestions={narrativeQuestions} />
      {/* only render SaveText once, passing the serialized Q&A */}
      {toSave && <SaveText textToSave={toSave} onSaved={() => setToSave("")} />}

    </div>
  );
};

export default QuestionGenerator;
