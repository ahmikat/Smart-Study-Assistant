import { useState } from "react";
import { explainTopic } from "../api";
import ReactMarkdown from "react-markdown";

const TopicExplanation = () => {
  const [topic, setTopic] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleExplain = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic.");
      return;
    }

    setError("");
    setLoading(true);
    setExplanation("");

    try {
      const response = await explainTopic(topic);
      setExplanation(response.explanation);
    } catch (err) {
      setError("Failed to fetch explanation.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="my-5">
      <div className="row justify-content-center w-100">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-body bg-transparent">
              <h2 className="card-title text-center text-primary mb-4">
                Topic Explanation
              </h2>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter a topic..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
              <button
                onClick={handleExplain}
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? (
                  <span>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>
                    Explaining...
                  </span>
                ) : (
                  "Get Explanation"
                )}
              </button>
              {error && (
                <div className="alert alert-danger mt-3" role="alert">
                  {error}
                </div>
              )}
              {explanation && (
                <div className="alert mt-4">
                  <h5 className="text-success">Explanation:</h5>
                  <ReactMarkdown>{explanation}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicExplanation; 