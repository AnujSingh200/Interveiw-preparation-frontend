import { useState } from "react";
import ReactMarkdown from "react-markdown";

const QAItem = ({ item, onPin, onNoteUpdate }) => {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState(item.note || "");
  const [editingNote, setEditingNote] = useState(false);

  const handleNoteSave = () => {
    onNoteUpdate?.(item._id, note);
    setEditingNote(false);
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border p-5 transition hover:shadow-md ${item.isPinned ? "border-indigo-300 bg-indigo-50/30" : "border-slate-200"}`}>

      {/* Question Header */}
      <div className="flex justify-between items-start gap-3">
        <h3
          className="font-medium text-slate-800 cursor-pointer flex-1"
          onClick={() => setOpen(!open)}
        >
          {item.isPinned && <span className="text-indigo-500 mr-1">📌</span>}
          {item.question}
        </h3>

        {/* Pin Button */}
        <button
          onClick={() => onPin?.(item._id)}
          className="text-lg shrink-0 hover:scale-110 transition"
          title={item.isPinned ? "Unpin" : "Pin"}
        >
          {item.isPinned ? "📌" : "📍"}
        </button>
      </div>

      {/* Answer */}
      {open && (
        <div className="mt-4">
          <div className="text-gray-700 prose prose-sm max-w-none">
            <ReactMarkdown>{item.answer}</ReactMarkdown>
          </div>

          {/* Note Section */}
          <div className="mt-4 border-t border-slate-100 pt-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                📝 My Note
              </p>
              {!editingNote && (
                <button
                  onClick={() => setEditingNote(true)}
                  className="text-xs text-indigo-500 hover:underline"
                >
                  {note ? "Edit" : "+ Add Note"}
                </button>
              )}
            </div>

            {editingNote ? (
              <div className="space-y-2">
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Write your note here..."
                  className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
                  rows={3}
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleNoteSave}
                    className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingNote(false)}
                    className="text-xs text-slate-500 hover:text-slate-700 px-3 py-1.5 rounded-lg border transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              note && (
                <p className="text-sm text-slate-600 bg-slate-50 rounded-lg p-3">
                  {note}
                </p>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QAItem;