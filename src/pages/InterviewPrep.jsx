import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";

import QAItem from "../components/QAItems";
import EmptyState from "../components/EmptyState";
import ErrorBanner from "../components/ErrorBanner";
import GenerateButton from "../components/GenerateButton";
import SkeletonCard from "../components/SkeletonCard";
import { API_PATHS } from "../utils/apiPaths";
import axios from "../utils/axiosInstance";

const parseError = (err) => {
  if (err.response)
    return err.response.data?.message || `Server error: ${err.response.status}`;
  if (err.request) return "Cannot reach server.";
  return err.message || "Something went wrong.";
};

const InterviewPrep = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [search, setSearch] = useState("");           // ← Search state

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const res = await axios.get(API_PATHS.SESSION.GET_ONE(id));
      setQuestions(res.data.session.questions || []);
    } catch (err) {
      setFetchError(parseError(err));
    } finally {
      setLoading(false);
    }
  }, [id]);

  const generateQuestions = async () => {
    setGenerating(true);
    try {
      await axios.post(API_PATHS.AI.GENERATE_QUESTIONS, { sessionId: id });
      await fetchQuestions();
      toast.success("Questions generated!");
    } catch (err) {
      toast.error(parseError(err));
    } finally {
      setGenerating(false);
    }
  };

  // ← Pin/Unpin function
  const togglePin = async (questionId) => {
    try {
      const res = await axios.patch(API_PATHS.QUESTIONS.PIN(questionId));
      setQuestions((prev) =>
        prev.map((q) =>
          q._id === questionId ? { ...q, isPinned: res.data.question.isPinned } : q
        )
      );
      toast.success("Updated!");
    } catch (err) {
      toast.error(parseError(err));
    }
  };

  // ← Note update function
  const updateNote = async (questionId, note) => {
    try {
      await axios.patch(API_PATHS.QUESTIONS.NOTE(questionId), { note });
      setQuestions((prev) =>
        prev.map((q) => (q._id === questionId ? { ...q, note } : q))
      );
      toast.success("Note saved!");
    } catch (err) {
      toast.error(parseError(err));
    }
  };

  // ← Search filter
  const filteredQuestions = questions.filter((q) =>
    q.question.toLowerCase().includes(search.toLowerCase())
  );

  // ← Pinned questions upar dikhao
  const sortedQuestions = [
    ...filteredQuestions.filter((q) => q.isPinned),
    ...filteredQuestions.filter((q) => !q.isPinned),
  ];

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return (
    <div className="w-full min-h-screen bg-slate-50">
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs text-slate-400 font-medium tracking-wide uppercase mb-1">
              Session ID: {id?.slice(0, 8)}
            </p>
            <h1 className="text-2xl font-bold text-slate-800">
              Interview Questions
            </h1>
            {!loading && !fetchError && (
              <p className="text-sm text-slate-500 mt-0.5">
                {questions.length > 0
                  ? `${questions.length} question${questions.length !== 1 ? "s" : ""} ready`
                  : "No questions yet"}
              </p>
            )}
          </div>
          <GenerateButton
            onClick={generateQuestions}
            generating={generating}
            loading={loading}
          />
        </div>

        {/* ← Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
          />
        </div>

        <div className="border-t border-slate-200 mb-8" />

        {/* Content */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : fetchError ? (
          <ErrorBanner message={fetchError} onRetry={fetchQuestions} />
        ) : sortedQuestions.length === 0 ? (
          <EmptyState onGenerate={generateQuestions} generating={generating} />
        ) : (
          <AnimatePresence>
            <div className="space-y-4">
              {sortedQuestions.map((q, i) => (
                <motion.div
                  key={q._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                >
                  <QAItem
                    item={q}
                    onPin={togglePin}        // ← Pass karo
                    onNoteUpdate={updateNote} // ← Pass karo
                  />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default InterviewPrep;