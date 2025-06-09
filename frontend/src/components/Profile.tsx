import React, { FormEvent, useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import axios from "axios";

const Profile: React.FC = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [university, setUniversity] = useState("");
  const [isFirstTime, setIsFirstTime] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser) return;
      setLoading(true);
      const token = await currentUser.getIdToken();
      try {
        const res = await axios.get("http://127.0.0.1:5000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { name, university, email } = res.data;
        setName(name || "");
        setUniversity(university || "");
        setEmail(email || "");
        setIsFirstTime(!(name && university));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

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
    console.log("token:", token);
    console.log("Updating profile with:", { name, university });

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

  if (loading) return <div className="text-center mt-5">Loading profile...</div>;

  return (
    <div className="container mt-5">
      <h3 className="mb-4">👤 User Profile</h3>
      {isFirstTime ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>Name</label>
            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group mb-3">
            <label>University</label>
            <input type="text" className="form-control" value={university} onChange={(e) => setUniversity(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-success">Submit</button>
        </form>
      ) : (
        <div>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>University:</strong> {university}</p>
          <p><strong>Email:</strong> {email}</p>
        </div>
      )}
      <button className="btn btn-danger mt-3" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
