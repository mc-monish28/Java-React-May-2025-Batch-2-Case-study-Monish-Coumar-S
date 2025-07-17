import React, { useState, useRef } from "react";

const COLORS = {
  secondary: "#ff8900",
  tertiary: "#0a2c45",
  primary: "#ffffff",
  border: "#ff890033"
};

const FEEDBACK_TYPES = [
  "Bug/Issue",
  "Feature Request",
  "General Feedback",
  "Other"
];

export default function OwnerFeedbackView() {
  const [type, setType] = useState(FEEDBACK_TYPES[0]);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef();
  const maxChars = 200;

  const handleFileChange = e => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setFileName(f.name);
      setUploadProgress(100); // Simulate instant upload for UI
    }
  };

  const handleDrop = e => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) {
      setFile(f);
      setFileName(f.name);
      setUploadProgress(100);
    }
  };

  const handleDragOver = e => e.preventDefault();

  const handleRemoveFile = () => {
    setFile(null);
    setFileName("");
    setUploadProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div style={{ width: '100%', padding: '32px 0 0 0' }}>
      <div className="card shadow-sm p-4" style={{ borderRadius: 18, border: `1.5px solid ${COLORS.border}`, background: COLORS.primary, width: '100%' }}>
        <h2 className="fw-bold mb-4" style={{ color: COLORS.tertiary, fontSize: 28 }}>Feedback</h2>
        <div className="mb-3">
          <label className="form-label fw-semibold" style={{ color: COLORS.tertiary }}>Feedback Type</label>
          <select className="form-select" value={type} onChange={e => setType(e.target.value)} style={{ borderRadius: 10, border: `1.5px solid #e0e6ed`, fontSize: 16, fontWeight: 500, color: COLORS.tertiary, background: COLORS.primary }}>
            {FEEDBACK_TYPES.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold" style={{ color: COLORS.tertiary }}>Message</label>
          <textarea
            className="form-control"
            rows={4}
            maxLength={maxChars}
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Write your message...."
            style={{ borderRadius: 10, border: `1.5px solid #e0e6ed`, fontSize: 16, color: COLORS.tertiary, background: COLORS.primary }}
          />
          <div className="text-end" style={{ color: '#00b386', fontWeight: 600, fontSize: 15 }}>{message.length}/{maxChars}</div>
        </div>
        <div className="mb-4">
          <label className="form-label fw-semibold" style={{ color: COLORS.tertiary }}>Upload files</label>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="d-flex flex-column align-items-center justify-content-center mb-2"
            style={{ border: `2px dashed ${COLORS.secondary}`, borderRadius: 14, background: '#fff8f0', minHeight: 120, cursor: 'pointer', position: 'relative' }}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
          >
            <div className="py-3 text-center w-100">
              <div style={{ fontSize: 32, color: COLORS.secondary, marginBottom: 8 }}>
                <i className="bi bi-cloud-arrow-up" style={{ fontSize: 36 }}></i>
                <span style={{ fontSize: 36, verticalAlign: 'middle' }}>&#8682;</span>
              </div>
              <div style={{ color: COLORS.tertiary, fontWeight: 600, fontSize: 18 }}>Drag & drop files or <span style={{ color: COLORS.secondary, cursor: 'pointer', textDecoration: 'underline' }}>Browse</span></div>
              <div style={{ color: '#888', fontSize: 14, marginTop: 4 }}>Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT</div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
              accept=".jpeg,.jpg,.png,.gif,.mp4,.pdf,.psd,.ai,.doc,.docx,.ppt,.pptx"
            />
          </div>
          {file && (
            <div className="d-flex align-items-center mt-2">
              <input className="form-control" value={fileName} disabled style={{ background: '#fff', color: COLORS.tertiary, fontWeight: 500, borderRadius: 8, border: '1.5px solid #e0e6ed' }} />
              <button className="btn btn-link ms-2" style={{ color: '#dc3545', fontWeight: 700, fontSize: 20 }} onClick={handleRemoveFile} type="button">&times;</button>
            </div>
          )}
          {file && (
            <div className="progress mt-2" style={{ height: 6, borderRadius: 8 }}>
              <div className="progress-bar" role="progressbar" style={{ width: `${uploadProgress}%`, background: COLORS.secondary }}></div>
            </div>
          )}
        </div>
        <div className="d-flex justify-content-between gap-2">
          <button className="btn btn-outline-secondary" style={{ borderRadius: 8, fontWeight: 600, fontSize: 16, padding: '8px 28px' }}>Back</button>
          <button className="btn" style={{ background: COLORS.secondary, color: COLORS.primary, fontWeight: 700, borderRadius: 8, fontSize: 16, padding: '8px 28px' }}>Update</button>
        </div>
      </div>
    </div>
  );
} 