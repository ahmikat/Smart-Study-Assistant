import { useState } from 'react';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'
import {
  BookOpenCheck,
  Target,
  FileText,
  FileBarChart,
  FileMinus,
  AlignLeft,
  Brain,
  Repeat,
  Calendar,
  Zap,
  Clock,
  BrainCog,
  FileSearch
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoginProfileButton from './LoginProfileButton';


const features = [
  { icon: <Zap className="text-warning" />, title: "Instant Analysis", desc: "Get immediate insights from your study materials." },
  { icon: <Clock className="text-danger" />, title: "Save Time", desc: "Automate note-taking and summaries." },
  { icon: <BookOpenCheck className="text-info" />, title: "Smart Learning", desc: "Tailored interactive experiences for your materials." },
  { icon: <BrainCog className="text-success" />, title: "Better Retention", desc: "Enhance memory with quizzes and flashcards." },
  { icon: <Target className="text-primary" />, title: "Focused Learning", desc: "Focus on key concepts and core details." },
  { icon: <FileSearch className="text-secondary" />, title: "Deep Understanding", desc: "Get detailed explanations instantly." },
];

const tools = [
  { icon: <FileText size={32} className="text-primary" />, title: "MCQ & Narrative Generator" },
  { icon: <FileBarChart size={32} className="text-success" />, title: "Lab Report Generator" },
  { icon: <FileMinus size={32} className="text-warning" />, title: "Summarization Tool" },
  { icon: <AlignLeft size={32} className="text-danger" />, title: "Essay/Paragraph Generator" },
  { icon: <Brain size={32} className="text-info" />, title: "Topic Explainer" },
  { icon: <Repeat size={32} className="text-secondary" />, title: "Paraphrasing Tool" },
  { icon: <Calendar size={32} className="text-dark" />, title: "Personalized Study Plan" },
];

const MotionDiv = motion.div;

const faqs = [
  {
    q: 'How does the AI PDF chat work?',
    a: 'Our AI reads your PDF and allows you to ask questions directly related to the content, providing context-aware answers.'
  },
  {
    q: 'What types of documents can I process?',
    a: 'Currently, we support PDF and PPT files. We are working on adding support for more formats like DOCX and TXT.'
  },
  {
    q: 'Is my data secure?',
    a: 'Yes, data security is our top priority. We use industry-standard encryption and security practices to protect your documents and information.'
  },
  {
    q: 'What are the usage limits?',
    a: 'Usage limits depend on your subscription plan. Free plans have certain limitations on the number of documents or pages processed per month.'
  },
  {
    q: 'Can I use this for academic research?',
    a: 'Absolutely! BoostLearning AI can be a powerful tool for summarizing research papers, extracting key information, and understanding complex topics.'
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 }
    })
  };

  return (
    <div className="pt-2">
      
      <div className="text-center pt-4 pb-4">
      <header className="hero-section">
      <motion.h1 className="display-5 fw-bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          Supercharge Your Studies with AI <img
              src="https://media.giphy.com/media/9yRMxLuRqyQ0x3jJXD/giphy.gif?cid=790b7611zp1kyu5zszx39agwh7eb5x9am6j8b8d93rwuj4lc&ep=v1_stickers_search&rid=giphy.gif&ct=s"
              alt="ai helper"
              className="ps-4 gif-image"
            />
        </motion.h1>
          <p className="lead pe-4 ps-4">
          Unlock your academic potential with our suite of AI tools designed for faster learning, better writing, and effective study management.
          </p>
          <div className="d-flex justify-content-center gap-3 mt-4">
          <button className="btn-grad-blue fw-bold pe-4 ps-4" style={{ zIndex: 1100, minWidth: '80px', borderRadius:'45px', height:'54px', fontSize:'16px' }}  onClick={() => navigate(`/home`)}>Get Started Free</button>
          <LoginProfileButton />
        </div>
        </header>
      </div>

      <div className="container py-5">
        <h2 className="text-center mb-4 fw-bold"> 📚 Our AI Study Tools</h2>
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {tools.map((tool, idx) => (
            <MotionDiv
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              key={idx}
              className="col"
            >
              <div className="bg-white rounded-4 shadow-lg p-4 h-100 d-flex align-items-start gap-3">
                {tool.icon}
                <div>
                  <h5 className="fw-semibold mb-1">{tool.title}</h5>
                  <p className="mb-0 text-black">AI assistance for {tool.title.toLowerCase()} in minutes.</p>
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>

      {/* Why Choose */}
      <div className="container py-5">
        <h2 className="text-center mb-4 fw-bold">💡 Why Choose StudyAI?</h2>
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {features.map(({ icon, title, desc }, idx) => (
            <MotionDiv
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              key={idx}
              className="col"
            >
              <div className="bg-light rounded-4 p-4 shadow d-flex align-items-start gap-3 h-100">
                <div className="fs-4">{icon}</div>
                <div>
                  <h5 className="fw-bold">{title}</h5>
                  <p className="mb-0 text-black">{desc}</p>
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="container py-5">
        <h2 className="text-center mb-4 fw-bold">⚙️ How StudyAI Works</h2>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 text-center">
          {['Upload Your Documents', 'AI Processing', 'Generate Study Materials', 'Interactive Learning'].map((step, idx) => (
            <MotionDiv
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              key={idx}
              className="col"
            >
              <div className="p-4 bg-white rounded-4 shadow-lg h-100">
                <h1 className="display-6 fw-bold text-primary">0{idx + 1}</h1>
                <p className='text-black'>{step}</p>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>

      {/* University Badges */}
      <div className="container text-center py-5">
        <h5 className="text-muted">🎓 Used by students at leading universities</h5>
        <div className="d-flex flex-wrap justify-content-center gap-3 mt-3">
          {['RUET', 'KUET', 'CUET', 'PSTU', 'DU'].map((u, i) => (
            <span className="badge bg-primary-subtle text-dark fs-6 px-3 py-2 rounded-pill shadow-sm" key={i}>{u}</span>
          ))}
        </div>
      </div>

      <div className="container py-5">
        <h2 className="text-center mb-4">Frequently Asked Questions</h2>
        <div className="accordion text-black" id="faqAccordion">
          {faqs.map((faq, i) => (
            <div className="accordion-item" key={i}>
              <h2 className="accordion-header">
                <button
                  className={` text-black accordion-button ${activeIndex === i ? '' : 'collapsed'}`}
                  type="button"
                  onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                >
                  {faq.q}
                </button>
              </h2>
              <div className={`bg-grey accordion-collapse collapse ${activeIndex === i ? 'show' : ''}`}>
                <div className="accordion-body">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="text-center py-4 bg-dark text-light">
        <p className="mb-0">© 2025 AI Study Helper, Inc</p>
        <div className="mt-2 d-flex justify-content-center gap-4">
          <a href="#" className="text-decoration-none text-light">Home</a>
          <a href="#features" className="text-decoration-none text-light">Features</a>
          <a href="#" className="text-decoration-none text-light">Pricing</a>
          <a href="#" className="text-decoration-none text-light">FAQs</a>
          <a href="#" className="text-decoration-none text-light">About</a>
        </div>
      </footer>
    </div>
  );
}