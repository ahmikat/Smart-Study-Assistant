import axios from "axios";

//const API_URL = "https://web-production-5136.up.railway.app";
const API_URL = "http://127.0.0.1:5000";

// Function to extract text from PDF
export const extractText = async (file: File) => {
  const formData = new FormData();
  formData.append("pdf", file);

  try {
    const response = await axios.post(`${API_URL}/extract-text`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data.extracted_text;
  } catch (error) {
    console.error("Error extracting text", error);
    throw new Error("Failed to extract text from PDF.");
  }
};

// Function to generate questions (MCQ or Narrative)
export const generateQuestions = async ({ file, text, questionType, numQuestions, level, difficulty }: any) => {
  const formData = new FormData();

  if (file) {
    formData.append("pdf", file);
  } else {
    formData.append("text", text);
  }
  formData.append("question_type", questionType);
  formData.append("num_questions", String(numQuestions));
  formData.append("level", level);
  formData.append("difficulty", difficulty);

  try {
    const response = await axios.post(`${API_URL}/generate-questions`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("📡 API Response:", response.data);  // 🛠️ Log API response

    return response.data;
  } catch (error) {
    console.error("❌ Error generating questions:", error);
    throw new Error("Failed to generate questions.");
  }
};


export const summarizePDF = async (file: File) => {
  const formData = new FormData();
  formData.append("pdf", file);

  try {
    const response = await axios.post(`${API_URL}/summarize-pdf`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error("Error summarizing PDF", error);
    throw new Error("Failed to summarize PDF.");
  }
};

export const explainTopic = async (topic: string) => {
  try {
    const response = await axios.post(`${API_URL}/explain-topic`, { topic }, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error) {
    console.error("Error explaining topic", error);
    throw new Error("Failed to fetch explanation.");
  }
};

export const paraphraseText = async (text: string) => {
  try {
    const response = await axios.post(`${API_URL}/paraphrase`, { text }, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error) {
    console.error("Error paraphrasing text", error);
    throw new Error("Failed to paraphrase text.");
  }
};

export const generateStudyPlan = async (data: any) => {
  try {
    const response = await axios.post(`${API_URL}/generate-study-plan`, data);
    return response.data;
  } catch (error) {
    console.error("Error generating study plan", error);
    throw new Error("Failed to generate study plan.");
  }
};


export const generateLabReport = async (topic: string) => {
  try {
    const response = await axios.post(`${API_URL}/generate-lab-report`, { topic });
    
    console.log("API Response:", response); // Debugging line

    return response.data;
  } catch (error) {
    console.error("Error generating lab report:", error);
    throw new Error("Failed to generate the lab report.");
  }
};

export const downloadLabReportDocx = async (topic: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/lab-report-docx`,
      { topic },
      { responseType: "blob" } // Important: we want a blob to create a downloadable file.
    );
    return response.data;
  } catch (error) {
    console.error("Error downloading lab report DOCX:", error);
    throw new Error("Failed to download the lab report DOCX.");
  }
};

export const downloadFinalDocx = async (topic: string, coverData: any) => {
  try {
    const response = await axios.post(
      `${API_URL}/final-docx`,
      { topic, cover_data: coverData },
      { responseType: "blob" }
    );
    return response.data;
  } catch (error) {
    console.error("Error downloading final DOCX:", error);
    throw new Error("Failed to download final DOCX.");
  }
};