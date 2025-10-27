import React, { FormEvent, useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import axios from "axios";

interface TextEntry {
  text: string;
  createdAt: string;
}

const Profile: React.FC = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingTexts, setLoadingTexts] = useState(true);
  const [name, setName] = useState("");
  const [university, setUniversity] = useState("");
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [texts, setTexts] = useState<TextEntry[]>([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser) return;
      setLoadingProfile(true);
      setLoadingTexts(true);

      const token = await currentUser.getIdToken();
      try {
        const res = await axios.get("http://127.0.0.1:5000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { name, university, email, texts } = res.data;
        setName(name || "");
        setUniversity(university || "");
        setEmail(email || "");
        setIsFirstTime(!(name && university));
        setTexts(Array.isArray(texts) ? texts : []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingProfile(false);
        setLoadingTexts(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    await signOut(auth);
    window.location.reload();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    const token = await auth.currentUser.getIdToken();
    if (!token) {
      alert("You must be logged in to update your profile.");
      return;
    }
    if (!name || !university) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.post(
        "http://127.0.0.1:5000/api/user",
        { name, university },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile.");
    }
  };

  const renderEntry = (entry: TextEntry, index: number) => {
    let parsed: any;
    try {
      parsed = JSON.parse(entry.text);
    } catch {
      parsed = null;
    }

    // Narrative Format
    if (
      Array.isArray(parsed) &&
      parsed[0]?.question &&
      typeof parsed[0]?.answer === "string" &&
      !parsed[0]?.options
    ) {
      return parsed.map((item: any, i: number) => (
        <div key={i} className="card mb-3 border-0 shadow-sm">
          <div className="card-body">
            <h6>Q-{item.number || i + 1}: {item.question}</h6>
            <p><strong>Answer:</strong> {item.answer}</p>
          </div>
        </div>
      ));
    }

    // MCQ Format
    if (
      Array.isArray(parsed) &&
      parsed[0]?.question &&
      Array.isArray(parsed[0]?.options)
    ) {
      return parsed.map((item: any, i: number) => (
        <div key={i} className="card mb-3 border-0 shadow-sm">
          <div className="card-body">
            <h6>{i + 1}. {item.question}</h6>
            {/* <ul className="list-unstyled">
              {item.options.map((opt: any, j: number) => (
                <li key={j}>
                  <strong>{opt.label})</strong> {opt.text}
                  {`${opt.label}) ${opt.text}` === item.answer && (
                    <span className="text-success ms-2">✅</span>
                  )}
                </li>
              ))}
            </ul> */}
            <p className="text-success fw-bold">
              ✅ Answer: {item.answer}
            </p>
          </div>
        </div>
      ));
    }

    // Default plain fallback
    return (
      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <pre style={{ whiteSpace: "pre-wrap" }}>{entry.text}</pre>
        </div>
      </div>
    );
  };

  if (loadingProfile) {
    return <div className="text-center mt-5">Loading profile...</div>;
  }

  return (
    <div className="container mt-5">
      <h3 className="mb-4">👤 User Profile</h3>
      {isFirstTime ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>University</label>
            <input
              type="text"
              className="form-control"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      ) : (
        <div>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>University:</strong> {university}</p>
          <p><strong>Email:</strong> {email}</p>
        </div>
      )}

      <button className="btn btn-danger mt-3" onClick={handleLogout}>
        Logout
      </button>

      {/* Saved Texts Section */}
      <div className="mt-4">
        <h5>Your Notes</h5>
        {loadingTexts ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div>
            {texts.length > 0 ? (
              texts.map((entry, idx) => (
                <div key={idx}>
                  <strong className="text-muted d-block mb-2">
                    Saved on {new Date(entry.createdAt).toLocaleString()}
                  </strong>
                  {renderEntry(entry, idx)}
                </div>
              ))
            ) : (
              <div className="alert alert-info">No notes saved yet.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
