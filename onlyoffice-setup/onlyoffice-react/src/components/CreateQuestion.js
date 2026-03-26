// // import React, { useState, useRef, useEffect } from 'react';
// // import { DocumentEditor } from '@onlyoffice/document-editor-react';

// // /* ─── helpers ─────────────────────────────────────────────── */
// // const uid = () => `key-${Date.now()}-${Math.random().toString(36).slice(2)}`;

// // const SUBJECTS     = ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English', 'History'];
// // const Q_TYPES      = ['Multiple Choice (MCQ)', 'True / False', 'Short Answer', 'Essay'];
// // const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];
// // const OPTIONS_META = [
// //   { id: 'A', label: 'Option A' },
// //   { id: 'B', label: 'Option B' },
// //   { id: 'C', label: 'Option C' },
// //   { id: 'D', label: 'Option D' },
// // ];

// // /* ─── styles ──────────────────────────────────────────────── */
// // const injectStyles = () => {
// //   if (document.getElementById('cq-styles')) return;
// //   const s = document.createElement('style');
// //   s.id = 'cq-styles';
// //   s.textContent = `
// //     @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

// //     :root {
// //       --cq-bg:      #f4f3ef;
// //       --cq-surface: #ffffff;
// //       --cq-border:  #ddd9d0;
// //       --cq-accent:  #3d35c9;
// //       --cq-text:    #1a1a2e;
// //       --cq-muted:   #888070;
// //       --cq-radius:  12px;
// //       --cq-mono:    'JetBrains Mono', monospace;
// //       --cq-sans:    'Sora', sans-serif;
// //     }

// //     .cq-wrap {
// //       font-family: var(--cq-sans);
// //       background: var(--cq-bg);
// //       min-height: 100vh;
// //       padding: 48px 32px 80px;
// //       color: var(--cq-text);
// //     }
// //     .cq-header {
// //       display: flex; align-items: flex-end; gap: 14px; margin-bottom: 36px;
// //     }
// //     .cq-header h1 {
// //       font-size: 2rem; font-weight: 700; letter-spacing: -0.03em;
// //       line-height: 1; margin: 0;
// //     }
// //     .cq-header-tag {
// //       font-family: var(--cq-mono); font-size: 0.7rem;
// //       background: var(--cq-accent); color: #fff;
// //       border-radius: 4px; padding: 3px 8px; margin-bottom: 3px;
// //     }
// //     .cq-card {
// //       background: var(--cq-surface); border: 1px solid var(--cq-border);
// //       border-radius: 20px; padding: 40px; max-width: 900px;
// //     }
// //     .cq-row {
// //       display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 28px;
// //     }
// //     .cq-row.single { grid-template-columns: 1fr; }
// //     .cq-field { display: flex; flex-direction: column; gap: 6px; }
// //     .cq-label {
// //       font-size: 0.72rem; font-weight: 600; letter-spacing: 0.07em;
// //       text-transform: uppercase; color: var(--cq-muted);
// //     }
// //     .cq-select {
// //       appearance: none;
// //       border: 1.5px solid var(--cq-border); border-radius: var(--cq-radius);
// //       padding: 12px 40px 12px 16px;
// //       font-family: var(--cq-sans); font-size: 0.95rem; color: var(--cq-text);
// //       background: var(--cq-surface) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888070' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E") no-repeat right 14px center;
// //       cursor: pointer; transition: border-color .2s;
// //     }
// //     .cq-select:focus { outline: none; border-color: var(--cq-accent); }
// //     .cq-input {
// //       border: 1.5px solid var(--cq-border); border-radius: var(--cq-radius);
// //       padding: 12px 16px; font-family: var(--cq-sans); font-size: 0.95rem;
// //       color: var(--cq-text); background: var(--cq-surface);
// //       transition: border-color .2s; width: 100%; box-sizing: border-box;
// //     }
// //     .cq-input:focus { outline: none; border-color: var(--cq-accent); }

// //     /* doc trigger */
// //     .cq-doc-trigger {
// //       display: flex; align-items: center; gap: 10px;
// //       border: 1.5px dashed var(--cq-border); border-radius: var(--cq-radius);
// //       padding: 14px 18px;
// //       font-family: var(--cq-sans); font-size: 0.9rem; color: var(--cq-muted);
// //       background: #fafaf8; cursor: pointer;
// //       transition: border-color .2s, color .2s, background .2s; text-align: left;
// //       width: 100%;
// //     }
// //     .cq-doc-trigger:hover {
// //       border-color: var(--cq-accent); color: var(--cq-accent); background: #f0effd;
// //     }
// //     .cq-doc-trigger.filled {
// //       border-style: solid; border-color: var(--cq-accent);
// //       color: var(--cq-text); background: #f7f6ff;
// //     }
// //     .cq-doc-trigger-icon {
// //       width: 32px; height: 32px; border-radius: 8px;
// //       background: var(--cq-accent); color: #fff;
// //       display: flex; align-items: center; justify-content: center; flex-shrink: 0;
// //     }
// //     .cq-doc-trigger-icon svg { width: 16px; height: 16px; }
// //     .cq-doc-trigger-text { flex: 1; }
// //     .cq-doc-trigger-main { font-weight: 500; font-size: 0.9rem; }
// //     .cq-doc-trigger-sub  { font-size: 0.75rem; color: var(--cq-muted); margin-top: 2px; }
// //     .cq-doc-trigger-edit {
// //       font-family: var(--cq-mono); font-size: 0.68rem;
// //       padding: 3px 8px; border-radius: 4px;
// //       background: var(--cq-accent); color: #fff;
// //     }

// //     .cq-section-title {
// //       font-size: 1.1rem; font-weight: 700; letter-spacing: -0.02em; margin: 0 0 16px;
// //     }
// //     .cq-options-grid {
// //       display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px;
// //     }
// //     .cq-option-item  { display: flex; flex-direction: column; gap: 6px; }
// //     .cq-option-label { font-family: var(--cq-mono); font-size: 0.72rem; font-weight: 500; color: var(--cq-muted); }

// //     .cq-bottom-row {
// //       display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 28px;
// //     }
// //     .cq-actions {
// //       display: flex; justify-content: flex-end; gap: 12px;
// //       margin-top: 36px; padding-top: 28px; border-top: 1px solid var(--cq-border);
// //     }
// //     .cq-btn {
// //       font-family: var(--cq-sans); font-size: 0.88rem; font-weight: 600;
// //       padding: 11px 24px; border-radius: 10px; cursor: pointer; border: none;
// //       transition: all .2s; display: inline-flex; align-items: center; gap: 6px;
// //     }
// //     .cq-btn-ghost   { background: none; color: var(--cq-muted); }
// //     .cq-btn-ghost:hover { color: var(--cq-text); }
// //     .cq-btn-outline { background: none; border: 1.5px solid var(--cq-border); color: var(--cq-text); }
// //     .cq-btn-outline:hover { border-color: var(--cq-text); }
// //     .cq-btn-primary { background: var(--cq-accent); color: #fff; }
// //     .cq-btn-primary:hover { background: #2e28a8; }
// //     .cq-btn-preview { background: var(--cq-text); color: #fff; }
// //     .cq-btn-preview:hover { background: #2e2e4a; }
// //     .cq-btn:disabled { opacity: 0.5; cursor: not-allowed; }

// //     /* modal */
// //     .cq-modal-overlay {
// //       position: fixed; inset: 0;
// //       background: rgba(10,10,20,0.65); backdrop-filter: blur(4px);
// //       z-index: 1000; display: flex; align-items: center; justify-content: center;
// //       padding: 24px; animation: cqFadeIn .18s ease;
// //     }
// //     @keyframes cqFadeIn { from { opacity:0 } to { opacity:1 } }
// //     .cq-modal {
// //       background: var(--cq-surface); border-radius: 20px;
// //       width: 100%; max-width: 960px; height: 82vh;
// //       display: flex; flex-direction: column; overflow: hidden;
// //       box-shadow: 0 32px 80px rgba(0,0,0,.28);
// //       animation: cqSlideUp .22s ease;
// //     }
// //     @keyframes cqSlideUp { from { transform:translateY(20px);opacity:0 } to { transform:translateY(0);opacity:1 } }
// //     .cq-modal-header {
// //       display: flex; align-items: center; justify-content: space-between;
// //       padding: 18px 24px; border-bottom: 1px solid var(--cq-border); flex-shrink: 0;
// //     }
// //     .cq-modal-title {
// //       font-size: 0.95rem; font-weight: 700;
// //       display: flex; align-items: center; gap: 8px;
// //     }
// //     .cq-modal-badge {
// //       font-family: var(--cq-mono); font-size: 0.65rem;
// //       padding: 2px 7px; border-radius: 4px;
// //       background: #f0effd; color: var(--cq-accent);
// //     }
// //     .cq-modal-actions { display: flex; gap: 10px; }
// //     .cq-modal-body    { flex: 1; position: relative; overflow: hidden; }
// //     .cq-modal-loading {
// //       position: absolute; inset: 0;
// //       display: flex; flex-direction: column; align-items: center; justify-content: center;
// //       gap: 12px; background: var(--cq-surface); z-index: 2; transition: opacity .3s;
// //     }
// //     .cq-modal-loading.hidden { opacity: 0; pointer-events: none; }
// //     .cq-spin {
// //       width: 28px; height: 28px;
// //       border: 3px solid var(--cq-border); border-top-color: var(--cq-accent);
// //       border-radius: 50%; animation: cqSpin .7s linear infinite;
// //     }
// //     @keyframes cqSpin { to { transform: rotate(360deg) } }

// //     /* preview */
// //     .cq-preview-wrap {
// //       font-family: var(--cq-sans); background: var(--cq-bg);
// //       min-height: 100vh; padding: 48px 32px 80px; color: var(--cq-text);
// //     }
// //     .cq-preview-header {
// //       display: flex; align-items: center; gap: 16px; margin-bottom: 36px;
// //     }
// //     .cq-preview-header h1 {
// //       font-size: 1.8rem; font-weight: 700; letter-spacing: -0.03em; margin: 0;
// //     }
// //     .cq-preview-card {
// //       background: var(--cq-surface); border: 1px solid var(--cq-border);
// //       border-radius: 20px; padding: 40px; max-width: 900px;
// //     }
// //     .cq-preview-meta { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 32px; }
// //     .cq-chip {
// //       font-family: var(--cq-mono); font-size: 0.72rem;
// //       padding: 5px 12px; border-radius: 20px;
// //       background: #f0effd; color: var(--cq-accent); font-weight: 500;
// //     }
// //     .cq-chip.green  { background: #edfaf0; color: #1a7a3a; }
// //     .cq-chip.orange { background: #fff3e8; color: #b05a00; }
// //     .cq-chip.red    { background: #fdedf0; color: #b0001a; }
// //     .cq-preview-section { margin-bottom: 32px; }
// //     .cq-preview-section-label {
// //       font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em;
// //       text-transform: uppercase; color: var(--cq-muted); margin-bottom: 12px;
// //     }
// //     .cq-preview-html-box {
// //       border: 1px solid var(--cq-border); border-radius: var(--cq-radius);
// //       padding: 20px 24px; background: #fafaf8;
// //       font-size: 0.95rem; line-height: 1.7; min-height: 60px;
// //     }
// //     .cq-options-preview { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
// //     .cq-option-preview-item {
// //       border: 1.5px solid var(--cq-border); border-radius: var(--cq-radius);
// //       padding: 14px 18px; background: #fafaf8;
// //     }
// //     .cq-option-preview-item.correct { border-color: #1a7a3a; background: #edfaf0; }
// //     .cq-option-key {
// //       font-family: var(--cq-mono); font-size: 0.68rem; font-weight: 700;
// //       color: var(--cq-muted); margin-bottom: 8px;
// //       display: flex; align-items: center; gap: 6px;
// //     }
// //     .cq-correct-badge {
// //       font-family: var(--cq-mono); font-size: 0.6rem;
// //       background: #1a7a3a; color: #fff; padding: 1px 6px; border-radius: 3px;
// //     }
// //     .cq-preview-actions {
// //       display: flex; gap: 12px; justify-content: flex-end;
// //       margin-top: 36px; padding-top: 28px; border-top: 1px solid var(--cq-border);
// //     }
// //   `;
// //   document.head.appendChild(s);
// // };

// // /* ─── DocEditorModal ──────────────────────────────────────── */
// // function DocEditorModal({ localIp, title, docKey, onDone, onClose }) {
// //   const [isReady, setIsReady] = useState(false);
// //   const [saving,  setSaving]  = useState(false);
// //   const timerRef = useRef(null);

// //   useEffect(() => {
// //     timerRef.current = setTimeout(() => setIsReady(true), 6000);
// //     return () => clearTimeout(timerRef.current);
// //   }, []);

// //   const config = localIp ? {
// //     document: {
// //       fileType: 'docx',
// //       key:       docKey,
// //       title:     `${title}.docx`,
// //       url:       `http://${localIp}:3000/templates/new.docx`
// //     },
// //     documentType: 'word',
// //     editorConfig: {
// //       mode: 'edit',
// //       callbackUrl: `http://${localIp}:8000/callback`,
// //       customization: { forcesave: true, compatibilityMode: true }
// //     },
// //     height: '100%',
// //     width:  '100%'
// //   } : null;

// //   const handleDone = async () => {
// //     if (!localIp) return;
// //     setSaving(true);
// //     try {
// //       // forcesave the doc
// //       await fetch(`http://${localIp}:8000/forcesave`, {
// //         method:  'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body:    JSON.stringify({ key: docKey })
// //       });
// //       // wait for callback to fire
// //       await new Promise(r => setTimeout(r, 2000));
// //       // get HTML content
// //       const res  = await fetch(`http://${localIp}:8000/preview`, {
// //         method:  'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body:    JSON.stringify({ key: docKey })
// //       });
// //       const data = await res.json();
// //       onDone(data.html_content || '');
// //     } catch {
// //       onDone('');
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   return (
// //     <div className="cq-modal-overlay">
// //       <div className="cq-modal">

// //         <div className="cq-modal-header">
// //           <div className="cq-modal-title">
// //             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //               <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
// //               <polyline points="14,2 14,8 20,8"/>
// //             </svg>
// //             {title}
// //             <span className="cq-modal-badge">Document Editor</span>
// //           </div>
// //           <div className="cq-modal-actions">
// //             <button className="cq-btn cq-btn-ghost" onClick={onClose} disabled={saving}>
// //               Cancel
// //             </button>
// //             <button
// //               className="cq-btn cq-btn-primary"
// //               onClick={handleDone}
// //               disabled={!isReady || saving}
// //             >
// //               {saving ? 'Saving…' : 'Done'}
// //             </button>
// //           </div>
// //         </div>

// //         <div className="cq-modal-body">
// //           <div className={`cq-modal-loading ${isReady ? 'hidden' : ''}`}>
// //             <div className="cq-spin" />
// //             <span style={{ fontSize: '0.85rem', color: 'var(--cq-muted)' }}>
// //               Loading editor…
// //             </span>
// //           </div>
// //           {config && (
// //             <DocumentEditor
// //               id={`doc-${docKey}`}
// //               documentServerUrl="http://localhost:8080"
// //               config={config}
// //               events={{
// //                 onDocumentReady: () => { clearTimeout(timerRef.current); setIsReady(true); },
// //                 onError: (e) => console.error('Editor error:', e)
// //               }}
// //             />
// //           )}
// //         </div>

// //       </div>
// //     </div>
// //   );
// // }

// // /* ─── DocTriggerButton ────────────────────────────────────── */
// // function DocTriggerButton({ label, filled, onClick }) {
// //   return (
// //     <button
// //       className={`cq-doc-trigger ${filled ? 'filled' : ''}`}
// //       onClick={onClick}
// //     >
// //       <div className="cq-doc-trigger-icon">
// //         {filled ? (
// //           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
// //             <polyline points="20 6 9 17 4 12"/>
// //           </svg>
// //         ) : (
// //           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //             <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
// //             <polyline points="14,2 14,8 20,8"/>
// //           </svg>
// //         )}
// //       </div>
// //       <div className="cq-doc-trigger-text">
// //         <div className="cq-doc-trigger-main">
// //           {filled ? 'Content saved' : `Click to write ${label}`}
// //         </div>
// //         <div className="cq-doc-trigger-sub">
// //           {filled ? 'Click to edit in document editor' : 'Opens document editor'}
// //         </div>
// //       </div>
// //       {filled && <span className="cq-doc-trigger-edit">Edit</span>}
// //     </button>
// //   );
// // }

// // /* ─── PreviewPage ─────────────────────────────────────────── */
// // function PreviewPage({ data, onBack, onSubmit, onSaveDraft }) {
// //   const diffClass = { Easy: 'green', Medium: 'orange', Hard: 'red' }[data.difficulty] || '';

// //   return (
// //     <div className="cq-preview-wrap">
// //       <div className="cq-preview-header">
// //         <button className="cq-btn cq-btn-outline" onClick={onBack}>← Back</button>
// //         <h1>Preview</h1>
// //         <span className="cq-chip">Review before submitting</span>
// //       </div>

// //       <div className="cq-preview-card">

// //         {/* meta chips */}
// //         <div className="cq-preview-meta">
// //           {data.subject      && <span className="cq-chip">{data.subject}</span>}
// //           {data.questionType && <span className="cq-chip">{data.questionType}</span>}
// //           {data.difficulty   && <span className={`cq-chip ${diffClass}`}>{data.difficulty}</span>}
// //           {data.marks        && <span className="cq-chip">{data.marks} marks</span>}
// //         </div>

// //         {/* question content */}
// //         <div className="cq-preview-section">
// //           <div className="cq-preview-section-label">Question Content</div>
// //           <div
// //             className="cq-preview-html-box"
// //             dangerouslySetInnerHTML={{
// //               __html: data.questionHtml || '<em style="color:#aaa">No content written</em>'
// //             }}
// //           />
// //         </div>

// //         {/* options */}
// //         <div className="cq-preview-section">
// //           <div className="cq-preview-section-label">Options</div>
// //           <div className="cq-options-preview">
// //             {OPTIONS_META.map(opt => {
// //               const isCorrect = data.correctOption === `Option ${opt.id}`;
// //               return (
// //                 <div key={opt.id} className={`cq-option-preview-item ${isCorrect ? 'correct' : ''}`}>
// //                   <div className="cq-option-key">
// //                     {opt.id}
// //                     {isCorrect && <span className="cq-correct-badge">✓ Correct</span>}
// //                   </div>
// //                   <div
// //                     dangerouslySetInnerHTML={{
// //                       __html: data.optionsHtml[opt.id] || '<em style="color:#aaa">Empty</em>'
// //                     }}
// //                   />
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         </div>

// //         <div className="cq-preview-actions">
// //           <button className="cq-btn cq-btn-ghost"    onClick={onBack}>Cancel</button>
// //           <button className="cq-btn cq-btn-outline"  onClick={onSaveDraft}>Save as Draft</button>
// //           <button className="cq-btn cq-btn-primary"  onClick={onSubmit}>Submit for Review</button>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // }

// // /* ─── CreateQuestion ──────────────────────────────────────── */
// // export default function CreateQuestion() {
// //   injectStyles();

// //   const [localIp,       setLocalIp]       = useState(null);
// //   const [subject,       setSubject]       = useState('');
// //   const [questionType,  setQuestionType]  = useState('');
// //   const [marks,         setMarks]         = useState('5');
// //   const [difficulty,    setDifficulty]    = useState('Medium');
// //   const [correctOption, setCorrectOption] = useState('Option A');
// //   const [questionHtml,  setQuestionHtml]  = useState('');
// //   const [optionsHtml,   setOptionsHtml]   = useState({ A: '', B: '', C: '', D: '' });

// //   // stable doc keys per field for this session
// //   const [questionKey] = useState(uid);
// //   const [optionKeys]  = useState({ A: uid(), B: uid(), C: uid(), D: uid() });

// //   // which modal is open: 'question' | 'A'|'B'|'C'|'D' | null
// //   const [openModal, setOpenModal] = useState(null);
// //   const [view,      setView]      = useState('form'); // 'form' | 'preview'

// //   /* fetch server IP on mount */
// //   useEffect(() => {
// //     fetch('http://localhost:8000/my-ip')
// //       .then(r => r.json())
// //       .then(d => setLocalIp(d.ip))
// //       .catch(() => setLocalIp('localhost'));
// //   }, []);

// //   const registerKey = (key, filename) =>
// //     fetch('http://localhost:8000/register-key', {
// //       method:  'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body:    JSON.stringify({ key, filename })
// //     }).catch(() => {});

// //   const handleOpen = (field) => {
// //     const key = field === 'question' ? questionKey : optionKeys[field];
// //     registerKey(key, `${field}.docx`);
// //     setOpenModal(field);
// //   };

// //   const handleDone = (field, html) => {
// //     if (field === 'question') setQuestionHtml(html);
// //     else setOptionsHtml(prev => ({ ...prev, [field]: html }));
// //     setOpenModal(null);
// //   };

// //   /* derived modal props */
// //   const activeKey   = openModal === 'question' ? questionKey : (openModal ? optionKeys[openModal] : null);
// //   const activeTitle = openModal === 'question' ? 'Question Content'
// //                     : openModal               ? `Option ${openModal}`
// //                     : '';

// //   if (view === 'preview') {
// //     return (
// //       <PreviewPage
// //         data={{ subject, questionType, marks, difficulty, correctOption, questionHtml, optionsHtml }}
// //         onBack={() => setView('form')}
// //         onSubmit={() => alert('✅ Submitted for review!')}
// //         onSaveDraft={() => alert('💾 Saved as draft!')}
// //       />
// //     );
// //   }

// //   return (
// //     <>
// //       {/* doc editor modal */}
// //       {openModal && (
// //         <DocEditorModal
// //           localIp={localIp}
// //           title={activeTitle}
// //           docKey={activeKey}
// //           onDone={(html) => handleDone(openModal, html)}
// //           onClose={() => setOpenModal(null)}
// //         />
// //       )}

// //       <div className="cq-wrap">
// //         <div className="cq-header">
// //           <h1>Create Question</h1>
// //           <span className="cq-header-tag">MCQ Builder</span>
// //         </div>

// //         <div className="cq-card">

// //           {/* subject + type */}
// //           <div className="cq-row">
// //             <div className="cq-field">
// //               <label className="cq-label">Subject</label>
// //               <select className="cq-select" value={subject} onChange={e => setSubject(e.target.value)}>
// //                 <option value="">Select subject…</option>
// //                 {SUBJECTS.map(s => <option key={s}>{s}</option>)}
// //               </select>
// //             </div>
// //             <div className="cq-field">
// //               <label className="cq-label">Question Type</label>
// //               <select className="cq-select" value={questionType} onChange={e => setQuestionType(e.target.value)}>
// //                 <option value="">Select type…</option>
// //                 {Q_TYPES.map(t => <option key={t}>{t}</option>)}
// //               </select>
// //             </div>
// //           </div>

// //           {/* question content */}
// //           <div className="cq-row single" style={{ marginBottom: 32 }}>
// //             <div className="cq-field">
// //               <label className="cq-label">Question Content</label>
// //               <DocTriggerButton
// //                 label="question content"
// //                 filled={!!questionHtml}
// //                 onClick={() => handleOpen('question')}
// //               />
// //             </div>
// //           </div>

// //           {/* options */}
// //           <p className="cq-section-title">Options</p>
// //           <div className="cq-options-grid">
// //             {OPTIONS_META.map(opt => (
// //               <div key={opt.id} className="cq-option-item">
// //                 <span className="cq-option-label">{opt.label}</span>
// //                 <DocTriggerButton
// //                   label={opt.label}
// //                   filled={!!optionsHtml[opt.id]}
// //                   onClick={() => handleOpen(opt.id)}
// //                 />
// //               </div>
// //             ))}
// //           </div>

// //           {/* correct option */}
// //           <div className="cq-row" style={{ marginTop: 8 }}>
// //             <div className="cq-field">
// //               <label className="cq-label">Correct Option</label>
// //               <select className="cq-select" value={correctOption} onChange={e => setCorrectOption(e.target.value)}>
// //                 {OPTIONS_META.map(o => (
// //                   <option key={o.id}>{`Option ${o.id}`}</option>
// //                 ))}
// //               </select>
// //             </div>
// //           </div>

// //           {/* marks + difficulty */}
// //           <div className="cq-bottom-row">
// //             <div className="cq-field">
// //               <label className="cq-label">Marks</label>
// //               <input
// //                 type="number" min={1}
// //                 className="cq-input"
// //                 value={marks}
// //                 onChange={e => setMarks(e.target.value)}
// //               />
// //             </div>
// //             <div className="cq-field">
// //               <label className="cq-label">Difficulty</label>
// //               <select className="cq-select" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
// //                 {DIFFICULTIES.map(d => <option key={d}>{d}</option>)}
// //               </select>
// //             </div>
// //           </div>

// //           {/* actions */}
// //           <div className="cq-actions">
// //             <button className="cq-btn cq-btn-ghost">Cancel</button>
// //             <button className="cq-btn cq-btn-outline" onClick={() => alert('💾 Saved as draft!')}>
// //               Save as Draft
// //             </button>
// //             <button className="cq-btn cq-btn-preview" onClick={() => setView('preview')}>
// //               <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                 <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
// //                 <circle cx="12" cy="12" r="3"/>
// //               </svg>
// //               Preview
// //             </button>
// //             <button className="cq-btn cq-btn-primary" onClick={() => alert('✅ Submitted for review!')}>
// //               Submit for Review
// //             </button>
// //           </div>

// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// import React, { useState, useRef, useEffect } from 'react';
// import { DocumentEditor } from '@onlyoffice/document-editor-react';

// /* ─── helpers ─────────────────────────────────────────────── */
// const uid = () => `key-${Date.now()}-${Math.random().toString(36).slice(2)}`;

// const SUBJECTS     = ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English', 'History'];
// const Q_TYPES      = ['Multiple Choice (MCQ)', 'True / False', 'Short Answer', 'Essay'];
// const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];
// const OPTIONS_META = [
//   { id: 'A', label: 'Option A' },
//   { id: 'B', label: 'Option B' },
//   { id: 'C', label: 'Option C' },
//   { id: 'D', label: 'Option D' },
// ];

// /* ─── styles ──────────────────────────────────────────────── */
// const injectStyles = () => {
//   if (document.getElementById('cq-styles')) return;
//   const s = document.createElement('style');
//   s.id = 'cq-styles';
//   s.textContent = `
//     @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

//     :root {
//       --cq-bg:      #f4f3ef;
//       --cq-surface: #ffffff;
//       --cq-border:  #ddd9d0;
//       --cq-accent:  #3d35c9;
//       --cq-text:    #1a1a2e;
//       --cq-muted:   #888070;
//       --cq-radius:  12px;
//       --cq-mono:    'JetBrains Mono', monospace;
//       --cq-sans:    'Sora', sans-serif;
//     }

//     .cq-wrap {
//       font-family: var(--cq-sans);
//       background: var(--cq-bg);
//       min-height: 100vh;
//       padding: 48px 32px 80px;
//       color: var(--cq-text);
//     }
//     .cq-header {
//       display: flex; align-items: flex-end; gap: 14px; margin-bottom: 36px;
//     }
//     .cq-header h1 {
//       font-size: 2rem; font-weight: 700; letter-spacing: -0.03em;
//       line-height: 1; margin: 0;
//     }
//     .cq-header-tag {
//       font-family: var(--cq-mono); font-size: 0.7rem;
//       background: var(--cq-accent); color: #fff;
//       border-radius: 4px; padding: 3px 8px; margin-bottom: 3px;
//     }
//     .cq-card {
//       background: var(--cq-surface); border: 1px solid var(--cq-border);
//       border-radius: 20px; padding: 40px; max-width: 900px;
//     }
//     .cq-row {
//       display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 28px;
//     }
//     .cq-row.single { grid-template-columns: 1fr; }
//     .cq-field { display: flex; flex-direction: column; gap: 6px; }
//     .cq-label {
//       font-size: 0.72rem; font-weight: 600; letter-spacing: 0.07em;
//       text-transform: uppercase; color: var(--cq-muted);
//     }
//     .cq-select {
//       appearance: none;
//       border: 1.5px solid var(--cq-border); border-radius: var(--cq-radius);
//       padding: 12px 40px 12px 16px;
//       font-family: var(--cq-sans); font-size: 0.95rem; color: var(--cq-text);
//       background: var(--cq-surface) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888070' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E") no-repeat right 14px center;
//       cursor: pointer; transition: border-color .2s;
//     }
//     .cq-select:focus { outline: none; border-color: var(--cq-accent); }
//     .cq-input {
//       border: 1.5px solid var(--cq-border); border-radius: var(--cq-radius);
//       padding: 12px 16px; font-family: var(--cq-sans); font-size: 0.95rem;
//       color: var(--cq-text); background: var(--cq-surface);
//       transition: border-color .2s; width: 100%; box-sizing: border-box;
//     }
//     .cq-input:focus { outline: none; border-color: var(--cq-accent); }

//     /* doc trigger */
//     .cq-doc-trigger {
//       display: flex; align-items: center; gap: 10px;
//       border: 1.5px dashed var(--cq-border); border-radius: var(--cq-radius);
//       padding: 14px 18px;
//       font-family: var(--cq-sans); font-size: 0.9rem; color: var(--cq-muted);
//       background: #fafaf8; cursor: pointer;
//       transition: border-color .2s, color .2s, background .2s; text-align: left;
//       width: 100%;
//     }
//     .cq-doc-trigger:hover {
//       border-color: var(--cq-accent); color: var(--cq-accent); background: #f0effd;
//     }
//     .cq-doc-trigger.filled {
//       border-style: solid; border-color: var(--cq-accent);
//       color: var(--cq-text); background: #f7f6ff;
//     }
//     .cq-doc-trigger-icon {
//       width: 32px; height: 32px; border-radius: 8px;
//       background: var(--cq-accent); color: #fff;
//       display: flex; align-items: center; justify-content: center; flex-shrink: 0;
//     }
//     .cq-doc-trigger-icon svg { width: 16px; height: 16px; }
//     .cq-doc-trigger-text { flex: 1; }
//     .cq-doc-trigger-main { font-weight: 500; font-size: 0.9rem; }
//     .cq-doc-trigger-sub  { font-size: 0.75rem; color: var(--cq-muted); margin-top: 2px; }
//     .cq-doc-trigger-edit {
//       font-family: var(--cq-mono); font-size: 0.68rem;
//       padding: 3px 8px; border-radius: 4px;
//       background: var(--cq-accent); color: #fff;
//     }

//     .cq-section-title {
//       font-size: 1.1rem; font-weight: 700; letter-spacing: -0.02em; margin: 0 0 16px;
//     }
//     .cq-options-grid {
//       display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px;
//     }
//     .cq-option-item  { display: flex; flex-direction: column; gap: 6px; }
//     .cq-option-label { font-family: var(--cq-mono); font-size: 0.72rem; font-weight: 500; color: var(--cq-muted); }

//     .cq-bottom-row {
//       display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 28px;
//     }
//     .cq-actions {
//       display: flex; justify-content: flex-end; gap: 12px;
//       margin-top: 36px; padding-top: 28px; border-top: 1px solid var(--cq-border);
//     }
//     .cq-btn {
//       font-family: var(--cq-sans); font-size: 0.88rem; font-weight: 600;
//       padding: 11px 24px; border-radius: 10px; cursor: pointer; border: none;
//       transition: all .2s; display: inline-flex; align-items: center; gap: 6px;
//     }
//     .cq-btn-ghost   { background: none; color: var(--cq-muted); }
//     .cq-btn-ghost:hover { color: var(--cq-text); }
//     .cq-btn-outline { background: none; border: 1.5px solid var(--cq-border); color: var(--cq-text); }
//     .cq-btn-outline:hover { border-color: var(--cq-text); }
//     .cq-btn-primary { background: var(--cq-accent); color: #fff; }
//     .cq-btn-primary:hover { background: #2e28a8; }
//     .cq-btn-preview { background: var(--cq-text); color: #fff; }
//     .cq-btn-preview:hover { background: #2e2e4a; }
//     .cq-btn:disabled { opacity: 0.5; cursor: not-allowed; }

//     /* modal */
//     .cq-modal-overlay {
//       position: fixed; inset: 0;
//       background: rgba(10,10,20,0.65); backdrop-filter: blur(4px);
//       z-index: 1000; display: flex; align-items: center; justify-content: center;
//       padding: 24px; animation: cqFadeIn .18s ease;
//     }
//     @keyframes cqFadeIn { from { opacity:0 } to { opacity:1 } }
//     .cq-modal {
//       background: var(--cq-surface); border-radius: 20px;
//       width: 100%; max-width: 960px; height: 82vh;
//       display: flex; flex-direction: column; overflow: hidden;
//       box-shadow: 0 32px 80px rgba(0,0,0,.28);
//       animation: cqSlideUp .22s ease;
//     }
//     @keyframes cqSlideUp { from { transform:translateY(20px);opacity:0 } to { transform:translateY(0);opacity:1 } }
//     .cq-modal-header {
//       display: flex; align-items: center; justify-content: space-between;
//       padding: 18px 24px; border-bottom: 1px solid var(--cq-border); flex-shrink: 0;
//     }
//     .cq-modal-title {
//       font-size: 0.95rem; font-weight: 700;
//       display: flex; align-items: center; gap: 8px;
//     }
//     .cq-modal-badge {
//       font-family: var(--cq-mono); font-size: 0.65rem;
//       padding: 2px 7px; border-radius: 4px;
//       background: #f0effd; color: var(--cq-accent);
//     }
//     .cq-modal-actions { display: flex; gap: 10px; }
//     .cq-modal-body    { flex: 1; position: relative; overflow: hidden; }
//     .cq-modal-loading {
//       position: absolute; inset: 0;
//       display: flex; flex-direction: column; align-items: center; justify-content: center;
//       gap: 12px; background: var(--cq-surface); z-index: 2; transition: opacity .3s;
//     }
//     .cq-modal-loading.hidden { opacity: 0; pointer-events: none; }
//     .cq-spin {
//       width: 28px; height: 28px;
//       border: 3px solid var(--cq-border); border-top-color: var(--cq-accent);
//       border-radius: 50%; animation: cqSpin .7s linear infinite;
//     }
//     @keyframes cqSpin { to { transform: rotate(360deg) } }

//     /* preview */
//     .cq-preview-wrap {
//       font-family: var(--cq-sans); background: var(--cq-bg);
//       min-height: 100vh; padding: 48px 32px 80px; color: var(--cq-text);
//     }
//     .cq-preview-header {
//       display: flex; align-items: center; gap: 16px; margin-bottom: 36px;
//     }
//     .cq-preview-header h1 {
//       font-size: 1.8rem; font-weight: 700; letter-spacing: -0.03em; margin: 0;
//     }
//     .cq-preview-card {
//       background: var(--cq-surface); border: 1px solid var(--cq-border);
//       border-radius: 20px; padding: 40px; max-width: 900px;
//     }
//     .cq-preview-meta { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 32px; }
//     .cq-chip {
//       font-family: var(--cq-mono); font-size: 0.72rem;
//       padding: 5px 12px; border-radius: 20px;
//       background: #f0effd; color: var(--cq-accent); font-weight: 500;
//     }
//     .cq-chip.green  { background: #edfaf0; color: #1a7a3a; }
//     .cq-chip.orange { background: #fff3e8; color: #b05a00; }
//     .cq-chip.red    { background: #fdedf0; color: #b0001a; }
//     .cq-preview-section { margin-bottom: 32px; }
//     .cq-preview-section-label {
//       font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em;
//       text-transform: uppercase; color: var(--cq-muted); margin-bottom: 12px;
//     }
//     .cq-preview-html-box {
//       border: 1px solid var(--cq-border); border-radius: var(--cq-radius);
//       padding: 20px 24px; background: #fafaf8;
//       font-size: 0.95rem; line-height: 1.7; min-height: 60px;
//     }
//     .cq-options-preview { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
//     .cq-option-preview-item {
//       border: 1.5px solid var(--cq-border); border-radius: var(--cq-radius);
//       padding: 14px 18px; background: #fafaf8;
//     }
//     .cq-option-preview-item.correct { border-color: #1a7a3a; background: #edfaf0; }
//     .cq-option-key {
//       font-family: var(--cq-mono); font-size: 0.68rem; font-weight: 700;
//       color: var(--cq-muted); margin-bottom: 8px;
//       display: flex; align-items: center; gap: 6px;
//     }
//     .cq-correct-badge {
//       font-family: var(--cq-mono); font-size: 0.6rem;
//       background: #1a7a3a; color: #fff; padding: 1px 6px; border-radius: 3px;
//     }
//     .cq-preview-actions {
//       display: flex; gap: 12px; justify-content: flex-end;
//       margin-top: 36px; padding-top: 28px; border-top: 1px solid var(--cq-border);
//     }
//   `;
//   document.head.appendChild(s);
// };

// /* ─── DocEditorModal ──────────────────────────────────────── */
// function DocEditorModal({ localIp, title, docKey, onDone, onClose }) {
//   const [isReady, setIsReady] = useState(false);
//   const [saving,  setSaving]  = useState(false);
//   const timerRef = useRef(null);

//   useEffect(() => {
//     timerRef.current = setTimeout(() => setIsReady(true), 6000);
//     return () => clearTimeout(timerRef.current);
//   }, []);

//   const config = localIp ? {
//     document: {
//       fileType: 'docx',
//       key:       docKey,
//       title:     `${title}.docx`,
//       url:       `http://${localIp}:3000/templates/new.docx`
//     },
//     documentType: 'word',
//     editorConfig: {
//       mode: 'edit',
//       callbackUrl: `http://${localIp}:8000/callback`,
//       customization: { forcesave: true, compatibilityMode: true }
//     },
//     height: '100%',
//     width:  '100%'
//   } : null;

//   const handleDone = async () => {
//     if (!localIp) return;
//     setSaving(true);
//     try {
//       // forcesave the doc
//       await fetch(`http://${localIp}:8000/forcesave`, {
//         method:  'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body:    JSON.stringify({ key: docKey })
//       });
//       // wait for callback to fire
//       await new Promise(r => setTimeout(r, 2000));
//       // get HTML content
//       const res  = await fetch(`http://${localIp}:8000/preview`, {
//         method:  'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body:    JSON.stringify({ key: docKey })
//       });
//       const data = await res.json();
//       onDone(data.html_content || '');
//     } catch {
//       onDone('');
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="cq-modal-overlay">
//       <div className="cq-modal">

//         <div className="cq-modal-header">
//           <div className="cq-modal-title">
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//               <polyline points="14,2 14,8 20,8"/>
//             </svg>
//             {title}
//             <span className="cq-modal-badge">Document Editor</span>
//           </div>
//           <div className="cq-modal-actions">
//             <button className="cq-btn cq-btn-ghost" onClick={onClose} disabled={saving}>
//               Cancel
//             </button>
//             <button
//               className="cq-btn cq-btn-primary"
//               onClick={handleDone}
//               disabled={!isReady || saving}
//             >
//               {saving ? 'Saving…' : 'Done'}
//             </button>
//           </div>
//         </div>

//         <div className="cq-modal-body">
//           <div className={`cq-modal-loading ${isReady ? 'hidden' : ''}`}>
//             <div className="cq-spin" />
//             <span style={{ fontSize: '0.85rem', color: 'var(--cq-muted)' }}>
//               Loading editor…
//             </span>
//           </div>
//           {config && (
//             <DocumentEditor
//               id={`doc-${docKey}`}
//               documentServerUrl="http://localhost:8080"
//               config={config}
//               events={{
//                 onDocumentReady: () => { clearTimeout(timerRef.current); setIsReady(true); },
//                 onError: (e) => console.error('Editor error:', e)
//               }}
//             />
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }

// /* ─── DocTriggerButton ────────────────────────────────────── */
// function DocTriggerButton({ label, filled, onClick }) {
//   return (
//     <button
//       className={`cq-doc-trigger ${filled ? 'filled' : ''}`}
//       onClick={onClick}
//     >
//       <div className="cq-doc-trigger-icon">
//         {filled ? (
//           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//             <polyline points="20 6 9 17 4 12"/>
//           </svg>
//         ) : (
//           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//             <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//             <polyline points="14,2 14,8 20,8"/>
//           </svg>
//         )}
//       </div>
//       <div className="cq-doc-trigger-text">
//         <div className="cq-doc-trigger-main">
//           {filled ? 'Content saved' : `Click to write ${label}`}
//         </div>
//         <div className="cq-doc-trigger-sub">
//           {filled ? 'Click to edit in document editor' : 'Opens document editor'}
//         </div>
//       </div>
//       {filled && <span className="cq-doc-trigger-edit">Edit</span>}
//     </button>
//   );
// }

// /* ─── PreviewPage ─────────────────────────────────────────── */
// function PreviewPage({ data, onBack, onSubmit, onSaveDraft, submitting, submitError, submitDone }) {
//   const diffClass = { Easy: 'green', Medium: 'orange', Hard: 'red' }[data.difficulty] || '';

//   return (
//     <div className="cq-preview-wrap">
//       <div className="cq-preview-header">
//         <button className="cq-btn cq-btn-outline" onClick={onBack}>← Back</button>
//         <h1>Preview</h1>
//         <span className="cq-chip">Review before submitting</span>
//       </div>

//       <div className="cq-preview-card">

//         {/* meta chips */}
//         <div className="cq-preview-meta">
//           {data.subject      && <span className="cq-chip">{data.subject}</span>}
//           {data.questionType && <span className="cq-chip">{data.questionType}</span>}
//           {data.difficulty   && <span className={`cq-chip ${diffClass}`}>{data.difficulty}</span>}
//           {data.marks        && <span className="cq-chip">{data.marks} marks</span>}
//         </div>

//         {/* question content */}
//         <div className="cq-preview-section">
//           <div className="cq-preview-section-label">Question Content</div>
//           <div
//             className="cq-preview-html-box"
//             dangerouslySetInnerHTML={{
//               __html: data.questionHtml || '<em style="color:#aaa">No content written</em>'
//             }}
//           />
//         </div>

//         {/* options */}
//         <div className="cq-preview-section">
//           <div className="cq-preview-section-label">Options</div>
//           <div className="cq-options-preview">
//             {OPTIONS_META.map(opt => {
//               const isCorrect = data.correctOption === `Option ${opt.id}`;
//               return (
//                 <div key={opt.id} className={`cq-option-preview-item ${isCorrect ? 'correct' : ''}`}>
//                   <div className="cq-option-key">
//                     {opt.id}
//                     {isCorrect && <span className="cq-correct-badge">✓ Correct</span>}
//                   </div>
//                   <div
//                     dangerouslySetInnerHTML={{
//                       __html: data.optionsHtml[opt.id] || '<em style="color:#aaa">Empty</em>'
//                     }}
//                   />
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         <div className="cq-preview-actions">
//           {submitError && (
//             <span style={{ color: '#b0001a', fontSize: '0.85rem', marginRight: 'auto', fontFamily: 'var(--cq-mono)' }}>
//               {submitError}
//             </span>
//           )}
//           {submitDone && (
//             <span style={{ color: '#1a7a3a', fontSize: '0.85rem', marginRight: 'auto', fontFamily: 'var(--cq-mono)' }}>
//               ✓ Submitted for review!
//             </span>
//           )}
//           <button className="cq-btn cq-btn-ghost"   onClick={onBack} disabled={submitting}>Cancel</button>
//           <button className="cq-btn cq-btn-outline"  onClick={onSaveDraft} disabled={submitting}>Save as Draft</button>
//           <button
//             className="cq-btn cq-btn-primary"
//             onClick={onSubmit}
//             disabled={submitting || submitDone}
//           >
//             {submitting ? (
//               <><span style={{ width: 12, height: 12, border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'cqSpin .7s linear infinite', marginRight: 6 }} />Submitting…</>
//             ) : submitDone ? '✓ Submitted' : 'Submit for Review'}
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }

// /* ─── CreateQuestion ──────────────────────────────────────── */
// export default function CreateQuestion() {
//   injectStyles();

//   const [localIp,       setLocalIp]       = useState(null);
//   const [subject,       setSubject]       = useState('');
//   const [questionType,  setQuestionType]  = useState('');
//   const [marks,         setMarks]         = useState('5');
//   const [difficulty,    setDifficulty]    = useState('Medium');
//   const [correctOption, setCorrectOption] = useState('Option A');
//   const [questionHtml,  setQuestionHtml]  = useState('');
//   const [optionsHtml,   setOptionsHtml]   = useState({ A: '', B: '', C: '', D: '' });

//   // stable doc keys per field for this session
//   const [questionKey] = useState(uid);
//   const [optionKeys]  = useState({ A: uid(), B: uid(), C: uid(), D: uid() });

//   // which modal is open: 'question' | 'A'|'B'|'C'|'D' | null
//   const [openModal,    setOpenModal]    = useState(null);
//   const [view,         setView]         = useState('form'); // 'form' | 'preview'
//   const [submitting,   setSubmitting]   = useState(false);
//   const [submitError,  setSubmitError]  = useState('');
//   const [submitDone,   setSubmitDone]   = useState(false);

//   /* fetch server IP on mount */
//   useEffect(() => {
//     fetch('http://localhost:8000/my-ip')
//       .then(r => r.json())
//       .then(d => setLocalIp(d.ip))
//       .catch(() => setLocalIp('localhost'));
//   }, []);

//   const registerKey = (key, filename) =>
//     fetch('http://localhost:8000/register-key', {
//       method:  'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body:    JSON.stringify({ key, filename })
//     }).catch(() => {});

//   const handleSubmit = async () => {
//     setSubmitting(true);
//     setSubmitError('');
//     try {
//       const fd = new FormData();
//       fd.append('subject',        subject);
//       fd.append('question_type',  questionType);
//       fd.append('correct_option', correctOption);
//       fd.append('marks',          marks);
//       fd.append('difficulty',     difficulty);
//       fd.append('question_html',  questionHtml);
//       fd.append('option_a_html',  optionsHtml.A);
//       fd.append('option_b_html',  optionsHtml.B);
//       fd.append('option_c_html',  optionsHtml.C);
//       fd.append('option_d_html',  optionsHtml.D);

//       const res = await fetch('http://localhost:8000/submit-question', {
//         method: 'POST',
//         body:   fd,
//       });

//       if (!res.ok) {
//         const err = await res.json().catch(() => ({}));
//         throw new Error(err.detail || err.error || `HTTP ${res.status}`);
//       }

//       setSubmitDone(true);
//     } catch (e) {
//       setSubmitError(`❌ ${e.message}`);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleOpen = (field) => {
//     const key = field === 'question' ? questionKey : optionKeys[field];
//     registerKey(key, `${field}.docx`);
//     setOpenModal(field);
//   };

//   const handleDone = (field, html) => {
//     if (field === 'question') setQuestionHtml(html);
//     else setOptionsHtml(prev => ({ ...prev, [field]: html }));
//     setOpenModal(null);
//   };

//   /* derived modal props */
//   const activeKey   = openModal === 'question' ? questionKey : (openModal ? optionKeys[openModal] : null);
//   const activeTitle = openModal === 'question' ? 'Question Content'
//                     : openModal               ? `Option ${openModal}`
//                     : '';

//   if (view === 'preview') {
//     return (
//       <PreviewPage
//         data={{ subject, questionType, marks, difficulty, correctOption, questionHtml, optionsHtml }}
//         onBack={() => { setView('form'); setSubmitError(''); setSubmitDone(false); }}
//         onSubmit={handleSubmit}
//         onSaveDraft={() => alert('💾 Saved as draft!')}
//         submitting={submitting}
//         submitError={submitError}
//         submitDone={submitDone}
//       />
//     );
//   }

//   return (
//     <>
//       {/* doc editor modal */}
//       {openModal && (
//         <DocEditorModal
//           localIp={localIp}
//           title={activeTitle}
//           docKey={activeKey}
//           onDone={(html) => handleDone(openModal, html)}
//           onClose={() => setOpenModal(null)}
//         />
//       )}

//       <div className="cq-wrap">
//         <div className="cq-header">
//           <h1>Create Question</h1>
//           <span className="cq-header-tag">MCQ Builder</span>
//         </div>

//         <div className="cq-card">

//           {/* subject + type */}
//           <div className="cq-row">
//             <div className="cq-field">
//               <label className="cq-label">Subject</label>
//               <select className="cq-select" value={subject} onChange={e => setSubject(e.target.value)}>
//                 <option value="">Select subject…</option>
//                 {SUBJECTS.map(s => <option key={s}>{s}</option>)}
//               </select>
//             </div>
//             <div className="cq-field">
//               <label className="cq-label">Question Type</label>
//               <select className="cq-select" value={questionType} onChange={e => setQuestionType(e.target.value)}>
//                 <option value="">Select type…</option>
//                 {Q_TYPES.map(t => <option key={t}>{t}</option>)}
//               </select>
//             </div>
//           </div>

//           {/* question content */}
//           <div className="cq-row single" style={{ marginBottom: 32 }}>
//             <div className="cq-field">
//               <label className="cq-label">Question Content</label>
//               <DocTriggerButton
//                 label="question content"
//                 filled={!!questionHtml}
//                 onClick={() => handleOpen('question')}
//               />
//             </div>
//           </div>

//           {/* options */}
//           <p className="cq-section-title">Options</p>
//           <div className="cq-options-grid">
//             {OPTIONS_META.map(opt => (
//               <div key={opt.id} className="cq-option-item">
//                 <span className="cq-option-label">{opt.label}</span>
//                 <DocTriggerButton
//                   label={opt.label}
//                   filled={!!optionsHtml[opt.id]}
//                   onClick={() => handleOpen(opt.id)}
//                 />
//               </div>
//             ))}
//           </div>

//           {/* correct option */}
//           <div className="cq-row" style={{ marginTop: 8 }}>
//             <div className="cq-field">
//               <label className="cq-label">Correct Option</label>
//               <select className="cq-select" value={correctOption} onChange={e => setCorrectOption(e.target.value)}>
//                 {OPTIONS_META.map(o => (
//                   <option key={o.id}>{`Option ${o.id}`}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* marks + difficulty */}
//           <div className="cq-bottom-row">
//             <div className="cq-field">
//               <label className="cq-label">Marks</label>
//               <input
//                 type="number" min={1}
//                 className="cq-input"
//                 value={marks}
//                 onChange={e => setMarks(e.target.value)}
//               />
//             </div>
//             <div className="cq-field">
//               <label className="cq-label">Difficulty</label>
//               <select className="cq-select" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
//                 {DIFFICULTIES.map(d => <option key={d}>{d}</option>)}
//               </select>
//             </div>
//           </div>

//           {/* actions */}
//           <div className="cq-actions">
//             <button className="cq-btn cq-btn-ghost">Cancel</button>
//             <button className="cq-btn cq-btn-outline" onClick={() => alert('💾 Saved as draft!')}>
//               Save as Draft
//             </button>
//             <button className="cq-btn cq-btn-preview" onClick={() => setView('preview')}>
//               <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
//                 <circle cx="12" cy="12" r="3"/>
//               </svg>
//               Preview
//             </button>
//             <button className="cq-btn cq-btn-primary" onClick={handleSubmit} disabled={submitting}>
//               {submitting ? 'Submitting…' : 'Submit for Review'}
//             </button>
//           </div>

//         </div>
//       </div>
//     </>
//   );
// }


import React, { useState, useRef, useEffect } from 'react';
import { DocumentEditor } from '@onlyoffice/document-editor-react';

/* ─── helpers ─────────────────────────────────────────────── */
const uid = () => `key-${Date.now()}-${Math.random().toString(36).slice(2)}`;

const SUBJECTS     = ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English', 'History'];
const Q_TYPES      = ['Multiple Choice (MCQ)', 'True / False', 'Short Answer', 'Essay'];
const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];
const OPTIONS_META = [
  { id: 'A', label: 'Option A' },
  { id: 'B', label: 'Option B' },
  { id: 'C', label: 'Option C' },
  { id: 'D', label: 'Option D' },
];

/* ─── styles ──────────────────────────────────────────────── */

// const injectStyles = () => {
//   if (document.getElementById('cq-styles')) return;
//   const s = document.createElement('style');
//   s.id = 'cq-styles';
//   s.textContent = `
//     @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

//     :root {
//       --cq-bg:      #f4f3ef;
//       --cq-surface: #ffffff;
//       --cq-border:  #ddd9d0;
//       --cq-accent:  #3d35c9;
//       --cq-text:    #1a1a2e;
//       --cq-muted:   #888070;
//       --cq-radius:  12px;
//       --cq-mono:    'JetBrains Mono', monospace;
//       --cq-sans:    'Sora', sans-serif;
//     }

//     .cq-wrap {
//       font-family: var(--cq-sans);
//       background: var(--cq-bg);
//       min-height: 100vh;
//       padding: 48px 32px 80px;
//       color: var(--cq-text);
//     }
//     .cq-header {
//       display: flex; align-items: flex-end; gap: 14px; margin-bottom: 36px;
//     }
//     .cq-header h1 {
//       font-size: 2rem; font-weight: 700; letter-spacing: -0.03em;
//       line-height: 1; margin: 0;
//     }
//     .cq-header-tag {
//       font-family: var(--cq-mono); font-size: 0.7rem;
//       background: var(--cq-accent); color: #fff;
//       border-radius: 4px; padding: 3px 8px; margin-bottom: 3px;
//     }
//     .cq-card {
//       background: var(--cq-surface); border: 1px solid var(--cq-border);
//       border-radius: 20px; padding: 40px; max-width: 900px;
//     }
//     .cq-row {
//       display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 28px;
//     }
//     .cq-row.single { grid-template-columns: 1fr; }
//     .cq-field { display: flex; flex-direction: column; gap: 6px; }
//     .cq-label {
//       font-size: 0.72rem; font-weight: 600; letter-spacing: 0.07em;
//       text-transform: uppercase; color: var(--cq-muted);
//     }
//     .cq-select {
//       appearance: none;
//       border: 1.5px solid var(--cq-border); border-radius: var(--cq-radius);
//       padding: 12px 40px 12px 16px;
//       font-family: var(--cq-sans); font-size: 0.95rem; color: var(--cq-text);
//       background: var(--cq-surface) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888070' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E") no-repeat right 14px center;
//       cursor: pointer; transition: border-color .2s;
//     }
//     .cq-select:focus { outline: none; border-color: var(--cq-accent); }
//     .cq-input {
//       border: 1.5px solid var(--cq-border); border-radius: var(--cq-radius);
//       padding: 12px 16px; font-family: var(--cq-sans); font-size: 0.95rem;
//       color: var(--cq-text); background: var(--cq-surface);
//       transition: border-color .2s; width: 100%; box-sizing: border-box;
//     }
//     .cq-input:focus { outline: none; border-color: var(--cq-accent); }

//     /* doc content field — empty state */
//     .cq-doc-empty {
//       display: flex; align-items: center; gap: 10px;
//       border: 1.5px dashed var(--cq-border); border-radius: var(--cq-radius);
//       padding: 14px 18px;
//       font-family: var(--cq-sans); font-size: 0.9rem; color: var(--cq-muted);
//       background: #fafaf8; cursor: pointer;
//       transition: border-color .2s, color .2s, background .2s; text-align: left;
//       width: 100%; box-sizing: border-box;
//     }
//     .cq-doc-empty:hover {
//       border-color: var(--cq-accent); color: var(--cq-accent); background: #f0effd;
//     }
//     .cq-doc-empty-icon {
//       width: 32px; height: 32px; border-radius: 8px; flex-shrink: 0;
//       background: var(--cq-accent); color: #fff;
//       display: flex; align-items: center; justify-content: center;
//     }
//     .cq-doc-empty-icon svg { width: 16px; height: 16px; }
//     .cq-doc-empty-text { flex: 1; }
//     .cq-doc-empty-main { font-weight: 500; font-size: 0.9rem; }
//     .cq-doc-empty-sub  { font-size: 0.75rem; color: var(--cq-muted); margin-top: 2px; }

//     /* doc content field — filled state */
//     .cq-doc-filled {
//       border: 1.5px solid var(--cq-accent); border-radius: var(--cq-radius);
//       background: #fafaf8; overflow: hidden;
//     }
//     .cq-doc-filled-toolbar {
//       display: flex; align-items: center; justify-content: space-between;
//       padding: 8px 14px;
//       background: #f0effd; border-bottom: 1px solid #dddaf8;
//     }
//     .cq-doc-filled-label {
//       font-family: var(--cq-mono); font-size: 0.68rem; font-weight: 600;
//       color: var(--cq-accent); display: flex; align-items: center; gap: 6px;
//     }
//     .cq-doc-filled-label svg { width: 11px; height: 11px; }
//     .cq-doc-edit-btn {
//       font-family: var(--cq-mono); font-size: 0.68rem; font-weight: 600;
//       padding: 4px 10px; border-radius: 5px; cursor: pointer;
//       border: 1.5px solid var(--cq-accent); background: #fff; color: var(--cq-accent);
//       display: inline-flex; align-items: center; gap: 4px;
//       transition: background .15s, color .15s;
//     }
//     .cq-doc-edit-btn:hover { background: var(--cq-accent); color: #fff; }
//     .cq-doc-edit-btn svg { width: 11px; height: 11px; }
//     .cq-doc-filled-content {
//       padding: 16px 20px; font-size: 0.92rem; line-height: 1.7;
//       color: var(--cq-text); min-height: 48px;
//     }
//     .cq-doc-filled-content p { margin: 0 0 6px; }
//     .cq-doc-filled-content p:last-child { margin-bottom: 0; }

//     .cq-section-title {
//       font-size: 1.1rem; font-weight: 700; letter-spacing: -0.02em; margin: 0 0 16px;
//     }
//     .cq-options-grid {
//       display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px;
//     }
//     .cq-option-item  { display: flex; flex-direction: column; gap: 6px; }
//     .cq-option-label { font-family: var(--cq-mono); font-size: 0.72rem; font-weight: 500; color: var(--cq-muted); }

//     .cq-bottom-row {
//       display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 28px;
//     }
//     .cq-actions {
//       display: flex; justify-content: flex-end; gap: 12px;
//       margin-top: 36px; padding-top: 28px; border-top: 1px solid var(--cq-border);
//     }
//     .cq-btn {
//       font-family: var(--cq-sans); font-size: 0.88rem; font-weight: 600;
//       padding: 11px 24px; border-radius: 10px; cursor: pointer; border: none;
//       transition: all .2s; display: inline-flex; align-items: center; gap: 6px;
//     }
//     .cq-btn-ghost   { background: none; color: var(--cq-muted); }
//     .cq-btn-ghost:hover { color: var(--cq-text); }
//     .cq-btn-outline { background: none; border: 1.5px solid var(--cq-border); color: var(--cq-text); }
//     .cq-btn-outline:hover { border-color: var(--cq-text); }
//     .cq-btn-primary { background: var(--cq-accent); color: #fff; }
//     .cq-btn-primary:hover { background: #2e28a8; }
//     .cq-btn-preview { background: var(--cq-text); color: #fff; }
//     .cq-btn-preview:hover { background: #2e2e4a; }
//     .cq-btn:disabled { opacity: 0.5; cursor: not-allowed; }

//     /* modal */
//     .cq-modal-overlay {
//       position: fixed; inset: 0;
//       background: rgba(10,10,20,0.65); backdrop-filter: blur(4px);
//       z-index: 1000; display: flex; align-items: center; justify-content: center;
//       padding: 24px; animation: cqFadeIn .18s ease;
//     }
//     @keyframes cqFadeIn { from { opacity:0 } to { opacity:1 } }
//     .cq-modal {
//       background: var(--cq-surface); border-radius: 20px;
//       width: 100%; max-width: 960px; height: 82vh;
//       display: flex; flex-direction: column; overflow: hidden;
//       box-shadow: 0 32px 80px rgba(0,0,0,.28);
//       animation: cqSlideUp .22s ease;
//     }
//     @keyframes cqSlideUp { from { transform:translateY(20px);opacity:0 } to { transform:translateY(0);opacity:1 } }
//     .cq-modal-header {
//       display: flex; align-items: center; justify-content: space-between;
//       padding: 18px 24px; border-bottom: 1px solid var(--cq-border); flex-shrink: 0;
//     }
//     .cq-modal-title {
//       font-size: 0.95rem; font-weight: 700;
//       display: flex; align-items: center; gap: 8px;
//     }
//     .cq-modal-badge {
//       font-family: var(--cq-mono); font-size: 0.65rem;
//       padding: 2px 7px; border-radius: 4px;
//       background: #f0effd; color: var(--cq-accent);
//     }
//     .cq-modal-actions { display: flex; gap: 10px; }
//     .cq-modal-body    { flex: 1; position: relative; overflow: hidden; }
//     .cq-modal-loading {
//       position: absolute; inset: 0;
//       display: flex; flex-direction: column; align-items: center; justify-content: center;
//       gap: 12px; background: var(--cq-surface); z-index: 2; transition: opacity .3s;
//     }
//     .cq-modal-loading.hidden { opacity: 0; pointer-events: none; }
//     .cq-spin {
//       width: 28px; height: 28px;
//       border: 3px solid var(--cq-border); border-top-color: var(--cq-accent);
//       border-radius: 50%; animation: cqSpin .7s linear infinite;
//     }
//     @keyframes cqSpin { to { transform: rotate(360deg) } }

//     /* preview */
//     .cq-preview-wrap {
//       font-family: var(--cq-sans); background: var(--cq-bg);
//       min-height: 100vh; padding: 48px 32px 80px; color: var(--cq-text);
//     }
//     .cq-preview-header {
//       display: flex; align-items: center; gap: 16px; margin-bottom: 36px;
//     }
//     .cq-preview-header h1 {
//       font-size: 1.8rem; font-weight: 700; letter-spacing: -0.03em; margin: 0;
//     }
//     .cq-preview-card {
//       background: var(--cq-surface); border: 1px solid var(--cq-border);
//       border-radius: 20px; padding: 40px; max-width: 900px;
//     }
//     .cq-preview-meta { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 32px; }
//     .cq-chip {
//       font-family: var(--cq-mono); font-size: 0.72rem;
//       padding: 5px 12px; border-radius: 20px;
//       background: #f0effd; color: var(--cq-accent); font-weight: 500;
//     }
//     .cq-chip.green  { background: #edfaf0; color: #1a7a3a; }
//     .cq-chip.orange { background: #fff3e8; color: #b05a00; }
//     .cq-chip.red    { background: #fdedf0; color: #b0001a; }
//     .cq-preview-section { margin-bottom: 32px; }
//     .cq-preview-section-label {
//       font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em;
//       text-transform: uppercase; color: var(--cq-muted); margin-bottom: 12px;
//     }
//     .cq-preview-html-box {
//       border: 1px solid var(--cq-border); border-radius: var(--cq-radius);
//       padding: 20px 24px; background: #fafaf8;
//       font-size: 0.95rem; line-height: 1.7; min-height: 60px;
//     }
//     .cq-options-preview { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
//     .cq-option-preview-item {
//       border: 1.5px solid var(--cq-border); border-radius: var(--cq-radius);
//       padding: 14px 18px; background: #fafaf8;
//     }
//     .cq-option-preview-item.correct { border-color: #1a7a3a; background: #edfaf0; }
//     .cq-option-key {
//       font-family: var(--cq-mono); font-size: 0.68rem; font-weight: 700;
//       color: var(--cq-muted); margin-bottom: 8px;
//       display: flex; align-items: center; gap: 6px;
//     }
//     .cq-correct-badge {
//       font-family: var(--cq-mono); font-size: 0.6rem;
//       background: #1a7a3a; color: #fff; padding: 1px 6px; border-radius: 3px;
//     }
//     .cq-preview-actions {
//       display: flex; gap: 12px; justify-content: flex-end;
//       margin-top: 36px; padding-top: 28px; border-top: 1px solid var(--cq-border);
//     }
//   `;
//   document.head.appendChild(s);
// };


const injectStyles = () => {
  if (document.getElementById('cq-styles')) return;
  const s = document.createElement('style');
  s.id = 'cq-styles';
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
 
    :root {
      --cq-bg:      #f4f3ef;
      --cq-surface: #ffffff;
      --cq-border:  #ddd9d0;
      --cq-accent:  #3d35c9;
      --cq-text:    #1a1a2e;
      --cq-muted:   #888070;
      --cq-radius:  12px;
      --cq-mono:    'JetBrains Mono', monospace;
      --cq-sans:    'Sora', sans-serif;
    }
 
    .cq-wrap {
      font-family: var(--cq-sans);
      background: var(--cq-bg);
      min-height: 100vh;
      height: 100vh;
      overflow-y: auto;
      padding: 49px 32px 80px;
      color: var(--cq-text);
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .cq-header {
      width: 100%;
      max-width: 900px;
    }
    .cq-header {
      display: flex; align-items: flex-end; gap: 14px; margin-bottom: 36px;
      width: 100%; max-width: 900px;
    }
    .cq-header h1 {
      font-size: 2rem; font-weight: 700; letter-spacing: -0.03em;
      line-height: 1; margin: 0;
    }
    .cq-header-tag {
      font-family: var(--cq-mono); font-size: 0.7rem;
      background: var(--cq-accent); color: #fff;
      border-radius: 4px; padding: 3px 8px; margin-bottom: 3px;
    }
    .cq-card {
      background: var(--cq-surface); border: 1px solid var(--cq-border);
      border-radius: 20px; padding: 40px; max-width: 900px;
    }
    .cq-row {
      display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 28px;
    }
    .cq-row.single { grid-template-columns: 1fr; }
    .cq-field { display: flex; flex-direction: column; gap: 6px; }
    .cq-label {
      font-size: 0.72rem; font-weight: 600; letter-spacing: 0.07em;
      text-transform: uppercase; color: var(--cq-muted);
    }
    .cq-select {
      appearance: none;
      border: 1.5px solid var(--cq-border); border-radius: var(--cq-radius);
      padding: 12px 40px 12px 16px;
      font-family: var(--cq-sans); font-size: 0.95rem; color: var(--cq-text);
      background: var(--cq-surface) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888070' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E") no-repeat right 14px center;
      cursor: pointer; transition: border-color .2s;
    }
    .cq-select:focus { outline: none; border-color: var(--cq-accent); }
    .cq-input {
      border: 1.5px solid var(--cq-border); border-radius: var(--cq-radius);
      padding: 12px 16px; font-family: var(--cq-sans); font-size: 0.95rem;
      color: var(--cq-text); background: var(--cq-surface);
      transition: border-color .2s; width: 100%; box-sizing: border-box;
    }
    .cq-input:focus { outline: none; border-color: var(--cq-accent); }
 
    /* doc content field — empty state */
    .cq-doc-empty {
      display: flex; align-items: center; gap: 10px;
      border: 1.5px dashed var(--cq-border); border-radius: var(--cq-radius);
      padding: 14px 18px;
      font-family: var(--cq-sans); font-size: 0.9rem; color: var(--cq-muted);
      background: #fafaf8; cursor: pointer;
      transition: border-color .2s, color .2s, background .2s; text-align: left;
      width: 100%; box-sizing: border-box;
    }
    .cq-doc-empty:hover {
      border-color: var(--cq-accent); color: var(--cq-accent); background: #f0effd;
    }
    .cq-doc-empty-icon {
      width: 32px; height: 32px; border-radius: 8px; flex-shrink: 0;
      background: var(--cq-accent); color: #fff;
      display: flex; align-items: center; justify-content: center;
    }
    .cq-doc-empty-icon svg { width: 16px; height: 16px; }
    .cq-doc-empty-text { flex: 1; }
    .cq-doc-empty-main { font-weight: 500; font-size: 0.9rem; }
    .cq-doc-empty-sub  { font-size: 0.75rem; color: var(--cq-muted); margin-top: 2px; }
 
    /* doc content field — filled state */
    .cq-doc-filled {
      border: 1.5px solid var(--cq-accent); border-radius: var(--cq-radius);
      background: #fafaf8; overflow: hidden;
    }
    .cq-doc-filled-toolbar {
      display: flex; align-items: center; justify-content: space-between;
      padding: 8px 14px;
      background: #f0effd; border-bottom: 1px solid #dddaf8;
    }
    .cq-doc-filled-label {
      font-family: var(--cq-mono); font-size: 0.68rem; font-weight: 600;
      color: var(--cq-accent); display: flex; align-items: center; gap: 6px;
    }
    .cq-doc-filled-label svg { width: 11px; height: 11px; }
    .cq-doc-edit-btn {
      font-family: var(--cq-mono); font-size: 0.68rem; font-weight: 600;
      padding: 4px 10px; border-radius: 5px; cursor: pointer;
      border: 1.5px solid var(--cq-accent); background: #fff; color: var(--cq-accent);
      display: inline-flex; align-items: center; gap: 4px;
      transition: background .15s, color .15s;
    }
    .cq-doc-edit-btn:hover { background: var(--cq-accent); color: #fff; }
    .cq-doc-edit-btn svg { width: 11px; height: 11px; }
    .cq-doc-filled-content {
      padding: 16px 20px; font-size: 0.92rem; line-height: 1.7;
      color: var(--cq-text); min-height: 48px;
    }
    .cq-doc-filled-content p { margin: 0 0 6px; }
    .cq-doc-filled-content p:last-child { margin-bottom: 0; }
 
    .cq-section-title {
      font-size: 1.1rem; font-weight: 700; letter-spacing: -0.02em; margin: 0 0 16px;
    }
    .cq-options-grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px;
    }
    .cq-option-item  { display: flex; flex-direction: column; gap: 6px; }
    .cq-option-label { font-family: var(--cq-mono); font-size: 0.72rem; font-weight: 500; color: var(--cq-muted); }
 
    .cq-bottom-row {
      display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 28px;
    }
    .cq-actions {
      display: flex; justify-content: flex-end; gap: 12px;
      margin-top: 36px; padding-top: 28px; border-top: 1px solid var(--cq-border);
    }
    .cq-btn {
      font-family: var(--cq-sans); font-size: 0.88rem; font-weight: 600;
      padding: 11px 24px; border-radius: 10px; cursor: pointer; border: none;
      transition: all .2s; display: inline-flex; align-items: center; gap: 6px;
    }
    .cq-btn-ghost   { background: none; color: var(--cq-muted); }
    .cq-btn-ghost:hover { color: var(--cq-text); }
    .cq-btn-outline { background: none; border: 1.5px solid var(--cq-border); color: var(--cq-text); }
    .cq-btn-outline:hover { border-color: var(--cq-text); }
    .cq-btn-primary { background: var(--cq-accent); color: #fff; }
    .cq-btn-primary:hover { background: #2e28a8; }
    .cq-btn-preview { background: var(--cq-text); color: #fff; }
    .cq-btn-preview:hover { background: #2e2e4a; }
    .cq-btn:disabled { opacity: 0.5; cursor: not-allowed; }
 
    /* modal */
    .cq-modal-overlay {
      position: fixed; inset: 0;
      background: rgba(10,10,20,0.65); backdrop-filter: blur(4px);
      z-index: 1000; display: flex; align-items: center; justify-content: center;
      padding: 24px; animation: cqFadeIn .18s ease;
    }
    @keyframes cqFadeIn { from { opacity:0 } to { opacity:1 } }
    .cq-modal {
      background: var(--cq-surface); border-radius: 20px;
      width: 100%; max-width: 960px; height: 82vh;
      display: flex; flex-direction: column; overflow: hidden;
      box-shadow: 0 32px 80px rgba(0,0,0,.28);
      animation: cqSlideUp .22s ease;
    }
    @keyframes cqSlideUp { from { transform:translateY(20px);opacity:0 } to { transform:translateY(0);opacity:1 } }
    .cq-modal-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 18px 24px; border-bottom: 1px solid var(--cq-border); flex-shrink: 0;
    }
    .cq-modal-title {
      font-size: 0.95rem; font-weight: 700;
      display: flex; align-items: center; gap: 8px;
    }
    .cq-modal-badge {
      font-family: var(--cq-mono); font-size: 0.65rem;
      padding: 2px 7px; border-radius: 4px;
      background: #f0effd; color: var(--cq-accent);
    }
    .cq-modal-actions { display: flex; gap: 10px; }
    .cq-modal-body    { flex: 1; position: relative; overflow: hidden; }
    .cq-modal-loading {
      position: absolute; inset: 0;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      gap: 12px; background: var(--cq-surface); z-index: 2; transition: opacity .3s;
    }
    .cq-modal-loading.hidden { opacity: 0; pointer-events: none; }
    .cq-spin {
      width: 28px; height: 28px;
      border: 3px solid var(--cq-border); border-top-color: var(--cq-accent);
      border-radius: 50%; animation: cqSpin .7s linear infinite;
    }
    @keyframes cqSpin { to { transform: rotate(360deg) } }
 
    /* preview */
    .cq-preview-wrap {
      font-family: var(--cq-sans); background: var(--cq-bg);
      min-height: 100vh; padding: 48px 32px 80px; color: var(--cq-text);
    }
    .cq-preview-header {
      display: flex; align-items: center; gap: 16px; margin-bottom: 36px;
    }
    .cq-preview-header h1 {
      font-size: 1.8rem; font-weight: 700; letter-spacing: -0.03em; margin: 0;
    }
    .cq-preview-card {
      background: var(--cq-surface); border: 1px solid var(--cq-border);
      border-radius: 20px; padding: 40px; max-width: 900px;
    }
    .cq-preview-meta { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 32px; }
    .cq-chip {
      font-family: var(--cq-mono); font-size: 0.72rem;
      padding: 5px 12px; border-radius: 20px;
      background: #f0effd; color: var(--cq-accent); font-weight: 500;
    }
    .cq-chip.green  { background: #edfaf0; color: #1a7a3a; }
    .cq-chip.orange { background: #fff3e8; color: #b05a00; }
    .cq-chip.red    { background: #fdedf0; color: #b0001a; }
    .cq-preview-section { margin-bottom: 32px; }
    .cq-preview-section-label {
      font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em;
      text-transform: uppercase; color: var(--cq-muted); margin-bottom: 12px;
    }
    .cq-preview-html-box {
      border: 1px solid var(--cq-border); border-radius: var(--cq-radius);
      padding: 20px 24px; background: #fafaf8;
      font-size: 0.95rem; line-height: 1.7; min-height: 60px;
    }
    .cq-options-preview { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .cq-option-preview-item {
      border: 1.5px solid var(--cq-border); border-radius: var(--cq-radius);
      padding: 14px 18px; background: #fafaf8;
    }
    .cq-option-preview-item.correct { border-color: #1a7a3a; background: #edfaf0; }
    .cq-option-key {
      font-family: var(--cq-mono); font-size: 0.68rem; font-weight: 700;
      color: var(--cq-muted); margin-bottom: 8px;
      display: flex; align-items: center; gap: 6px;
    }
    .cq-correct-badge {
      font-family: var(--cq-mono); font-size: 0.6rem;
      background: #1a7a3a; color: #fff; padding: 1px 6px; border-radius: 3px;
    }
    .cq-preview-actions {
      display: flex; gap: 12px; justify-content: flex-end;
      margin-top: 36px; padding-top: 28px; border-top: 1px solid var(--cq-border);
    }
  `;
  document.head.appendChild(s);
};
 
/* ─── PersistentEditor ────────────────────────────────────── */
// Mounted ONCE per field and kept alive. Shown/hidden via CSS only.
// This prevents OnlyOffice "version changed" errors caused by iframe remounting.
function PersistentEditor({ localIp, field, docKey, filename, visible, onDone, onClose }) {
  const [isReady, setIsReady] = useState(false);
  const [saving,  setSaving]  = useState(false);
  const timerRef = useRef(null);
  const mountedRef = useRef(false);   // init the editor only once

  // Start ready-timer on first mount only
  useEffect(() => {
    timerRef.current = setTimeout(() => setIsReady(true), 6000);
    return () => clearTimeout(timerRef.current);
  }, []);

  const config = localIp && !mountedRef.current ? (() => {
    mountedRef.current = true;
    return {
      document: {
        fileType: 'docx',
        key:       docKey,
        title:     filename,
        url:       `http://${localIp}:3000/templates/new.docx`
      },
      documentType: 'word',
      editorConfig: {
        mode: 'edit',
        callbackUrl: `http://${localIp}:8000/callback`,
        customization: { forcesave: true, compatibilityMode: true }
      },
      height: '100%',
      width:  '100%'
    };
  })() : (mountedRef.current ? {
    document: {
      fileType: 'docx',
      key:       docKey,
      title:     filename,
      url:       `http://${localIp}:3000/templates/new.docx`
    },
    documentType: 'word',
    editorConfig: {
      mode: 'edit',
      callbackUrl: `http://${localIp}:8000/callback`,
      customization: { forcesave: true, compatibilityMode: true }
    },
    height: '100%',
    width:  '100%'
  } : null);

  const handleDone = async () => {
    if (!localIp) return;
    setSaving(true);
    try {
      await fetch(`http://${localIp}:8000/forcesave`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ key: docKey })
      });
      await new Promise(r => setTimeout(r, 2000));
      const res  = await fetch(`http://${localIp}:8000/preview`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ key: docKey })
      });
      const data = await res.json();
      onDone(field, data.html_content || '');
    } catch {
      onDone(field, '');
    } finally {
      setSaving(false);
    }
  };

  const title = field === 'question' ? 'Question Content' : `Option ${field}`;

  // Always rendered — visibility controlled by CSS display
  return (
    <div
      className="cq-modal-overlay"
      style={{ display: visible ? 'flex' : 'none' }}
    >
      <div className="cq-modal">
        <div className="cq-modal-header">
          <div className="cq-modal-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
            </svg>
            {title}
            <span className="cq-modal-badge">Document Editor</span>
          </div>
          <div className="cq-modal-actions">
            <button className="cq-btn cq-btn-ghost" onClick={onClose} disabled={saving}>
              Cancel
            </button>
            <button
              className="cq-btn cq-btn-primary"
              onClick={handleDone}
              disabled={!isReady || saving}
            >
              {saving ? 'Saving…' : 'Done'}
            </button>
          </div>
        </div>
        <div className="cq-modal-body">
          <div className={`cq-modal-loading ${isReady ? 'hidden' : ''}`}>
            <div className="cq-spin" />
            <span style={{ fontSize: '0.85rem', color: 'var(--cq-muted)' }}>
              Loading editor…
            </span>
          </div>
          {config && (
            <DocumentEditor
              id={`doc-${docKey}`}
              documentServerUrl="http://localhost:8080"
              config={config}
              events={{
                onDocumentReady: () => { clearTimeout(timerRef.current); setIsReady(true); },
                onError: (e) => console.error('Editor error:', e)
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── DocContentField ────────────────────────────────────── */
// function DocContentField({ label, html, onOpen }) {
//   if (!html) {
//     return (
//       <button className="cq-doc-empty" onClick={onOpen}>
//         <div className="cq-doc-empty-icon">
//           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//             <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//             <polyline points="14,2 14,8 20,8"/>
//             <line x1="16" y1="13" x2="8" y2="13"/>
//             <line x1="16" y1="17" x2="8" y2="17"/>
//           </svg>
//         </div>
//         <div className="cq-doc-empty-text">
//           <div className="cq-doc-empty-main">Click to write {label}</div>
//           <div className="cq-doc-empty-sub">Opens document editor</div>
//         </div>
//       </button>
//     );
//   }

//   return (
//     <div className="cq-doc-filled">
//       <div className="cq-doc-filled-toolbar">
//         <span className="cq-doc-filled-label">
//           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//             <polyline points="20 6 9 17 4 12"/>
//           </svg>
//           Saved
//         </span>
//         <button className="cq-doc-edit-btn" onClick={onOpen}>
//           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//             <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
//             <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
//           </svg>
//           Edit
//         </button>
//       </div>
//       <div
//         className="cq-doc-filled-content"
//         dangerouslySetInnerHTML={{ __html: html }}
//       />
//     </div>
//   );
// }


// function DocContentField({ label, html, onOpen }) {
//   if (!html) {
//     return (
//       <div
//         onClick={onOpen}
//         style={{
//           border: '1.5px solid var(--cq-border)',
//           borderRadius: 'var(--cq-radius)',
//           background: '#fff',
//           minHeight: '80px',
//           cursor: 'text',
//           width: '100%',
//           boxSizing: 'border-box',
//         }}
//       />
//     );
//   }
 
//   return (
//     <div className="cq-doc-filled">
//       <div className="cq-doc-filled-toolbar">
//         <span className="cq-doc-filled-label">
//           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//             <polyline points="20 6 9 17 4 12"/>
//           </svg>
//           Saved
//         </span>
//         <button className="cq-doc-edit-btn" onClick={onOpen}>
//           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//             <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
//             <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
//           </svg>
//           Edit
//         </button>
//       </div>
//       <div
//         className="cq-doc-filled-content"
//         dangerouslySetInnerHTML={{ __html: html }}
//       />
//     </div>
//   );
// }


/* ─── DocContentField ────────────────────────────────────── */
function DocContentField({ label, html, onOpen }) {
  if (!html) {
    return (
      <div
        onClick={onOpen}
        style={{
          border: '1.5px solid var(--cq-border)',
          borderRadius: 'var(--cq-radius)',
          background: '#fff',
          minHeight: '80px',
          cursor: 'text',
          width: '100%',
          boxSizing: 'border-box',
        }}
      />
    );
  }
 
  return (
    <div
      className="cq-doc-filled-content"
      onClick={onOpen}
      style={{
        border: '1.5px solid var(--cq-border)',
        borderRadius: 'var(--cq-radius)',
        background: '#fff',
        minHeight: '80px',
        cursor: 'text',
        width: '100%',
        boxSizing: 'border-box',
        padding: '16px 20px',
        fontSize: '0.92rem',
        lineHeight: '1.7',
        color: 'var(--cq-text)',
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
/* ─── PreviewPage ─────────────────────────────────────────── */
function PreviewPage({ data, onBack, onSubmit, onSaveDraft, submitting, submitError, submitDone }) {
  const diffClass = { Easy: 'green', Medium: 'orange', Hard: 'red' }[data.difficulty] || '';

  return (
    <div className="cq-preview-wrap">
      <div className="cq-preview-header">
        <button className="cq-btn cq-btn-outline" onClick={onBack}>← Back</button>
        <h1>Preview</h1>
        <span className="cq-chip">Review before submitting</span>
      </div>

      <div className="cq-preview-card">

        {/* meta chips */}
        <div className="cq-preview-meta">
          {data.subject      && <span className="cq-chip">{data.subject}</span>}
          {data.questionType && <span className="cq-chip">{data.questionType}</span>}
          {data.difficulty   && <span className={`cq-chip ${diffClass}`}>{data.difficulty}</span>}
          {data.marks        && <span className="cq-chip">{data.marks} marks</span>}
        </div>

        {/* question content */}
        <div className="cq-preview-section">
          <div className="cq-preview-section-label">Question Content</div>
          <div
            className="cq-preview-html-box"
            dangerouslySetInnerHTML={{
              __html: data.questionHtml || '<em style="color:#aaa">No content written</em>'
            }}
          />
        </div>

        {/* options */}
        <div className="cq-preview-section">
          <div className="cq-preview-section-label">Options</div>
          <div className="cq-options-preview">
            {OPTIONS_META.map(opt => {
              const isCorrect = data.correctOption === `Option ${opt.id}`;
              return (
                <div key={opt.id} className={`cq-option-preview-item ${isCorrect ? 'correct' : ''}`}>
                  <div className="cq-option-key">
                    {opt.id}
                    {isCorrect && <span className="cq-correct-badge">✓ Correct</span>}
                  </div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.optionsHtml[opt.id] || '<em style="color:#aaa">Empty</em>'
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="cq-preview-actions">
          {submitError && (
            <span style={{ color: '#b0001a', fontSize: '0.85rem', marginRight: 'auto', fontFamily: 'var(--cq-mono)' }}>
              {submitError}
            </span>
          )}
          {submitDone && (
            <span style={{ color: '#1a7a3a', fontSize: '0.85rem', marginRight: 'auto', fontFamily: 'var(--cq-mono)' }}>
              ✓ Submitted for review!
            </span>
          )}
          <button className="cq-btn cq-btn-ghost"   onClick={onBack} disabled={submitting}>Cancel</button>
          <button className="cq-btn cq-btn-outline"  onClick={onSaveDraft} disabled={submitting}>Save as Draft</button>
          <button
            className="cq-btn cq-btn-primary"
            onClick={onSubmit}
            disabled={submitting || submitDone}
          >
            {submitting ? (
              <><span style={{ width: 12, height: 12, border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'cqSpin .7s linear infinite', marginRight: 6 }} />Submitting…</>
            ) : submitDone ? '✓ Submitted' : 'Submit for Review'}
          </button>
        </div>

      </div>
    </div>
  );
}

/* ─── CreateQuestion ──────────────────────────────────────── */
export default function CreateQuestion() {
  injectStyles();

  const [localIp,       setLocalIp]       = useState(null);
  const [subject,       setSubject]       = useState('');
  const [questionType,  setQuestionType]  = useState('');
  const [marks,         setMarks]         = useState('5');
  const [difficulty,    setDifficulty]    = useState('Medium');
  const [correctOption, setCorrectOption] = useState('Option A');
  const [questionHtml,  setQuestionHtml]  = useState('');
  const [optionsHtml,   setOptionsHtml]   = useState({ A: '', B: '', C: '', D: '' });

  // stable doc keys per field for this session
  const [questionKey] = useState(uid);
  const [optionKeys]  = useState({ A: uid(), B: uid(), C: uid(), D: uid() });


  // which modal is open: 'question' | 'A'|'B'|'C'|'D' | null
  const [openModal,    setOpenModal]    = useState(null);
  const [view,         setView]         = useState('form'); // 'form' | 'preview'
  const [submitting,   setSubmitting]   = useState(false);
  const [submitError,  setSubmitError]  = useState('');
  const [submitDone,   setSubmitDone]   = useState(false);

  /* fetch server IP on mount */
  useEffect(() => {
    fetch('http://localhost:8000/my-ip')
      .then(r => r.json())
      .then(d => setLocalIp(d.ip))
      .catch(() => setLocalIp('localhost'));
  }, []);

  const registerKey = (key, filename) =>
    fetch('http://localhost:8000/register-key', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ key, filename })
    }).catch(() => {});

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError('');
    try {
      const fd = new FormData();
      fd.append('subject',        subject);
      fd.append('question_type',  questionType);
      fd.append('correct_option', correctOption);
      fd.append('marks',          marks);
      fd.append('difficulty',     difficulty);
      fd.append('question_html',  questionHtml);
      fd.append('option_a_html',  optionsHtml.A);
      fd.append('option_b_html',  optionsHtml.B);
      fd.append('option_c_html',  optionsHtml.C);
      fd.append('option_d_html',  optionsHtml.D);

      const res = await fetch('http://localhost:8000/submit-question', {
        method: 'POST',
        body:   fd,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || err.error || `HTTP ${res.status}`);
      }

      setSubmitDone(true);
    } catch (e) {
      setSubmitError(`❌ ${e.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpen = (field) => {
    const key      = field === 'question' ? questionKey : optionKeys[field];
    const subjectSlug = (subject || 'untitled').replace(/\s+/g, '_');
    const filename = field === 'question'
      ? `${subjectSlug}_question.docx`
      : `${subjectSlug}_option_${field}.docx`;
    registerKey(key, filename);
    setOpenModal(field);
  };

  const handleDone = (field, html) => {
    if (field === 'question') setQuestionHtml(html);
    else setOptionsHtml(prev => ({ ...prev, [field]: html }));
    setOpenModal(null);
  };

  /* editors are always mounted — openModal just controls visibility */

  if (view === 'preview') {
    return (
      <PreviewPage
        data={{ subject, questionType, marks, difficulty, correctOption, questionHtml, optionsHtml }}
        onBack={() => { setView('form'); setSubmitError(''); setSubmitDone(false); }}
        onSubmit={handleSubmit}
        onSaveDraft={() => alert('💾 Saved as draft!')}
        submitting={submitting}
        submitError={submitError}
        submitDone={submitDone}
      />
    );
  }

  return (
    <>
      {/* 5 persistent editors — always mounted, shown/hidden via CSS */}
      {localIp && (() => {
        const subjectSlug = (subject || 'untitled').replace(/\s+/g, '_');
        const allFields = [
          { field: 'question', key: questionKey, filename: `${subjectSlug}_question.docx` },
          { field: 'A',        key: optionKeys.A, filename: `${subjectSlug}_option_A.docx` },
          { field: 'B',        key: optionKeys.B, filename: `${subjectSlug}_option_B.docx` },
          { field: 'C',        key: optionKeys.C, filename: `${subjectSlug}_option_C.docx` },
          { field: 'D',        key: optionKeys.D, filename: `${subjectSlug}_option_D.docx` },
        ];
        return allFields.map(({ field, key, filename }) => (
          <PersistentEditor
            key={field}
            localIp={localIp}
            field={field}
            docKey={key}
            filename={filename}
            visible={openModal === field}
            onDone={handleDone}
            onClose={() => setOpenModal(null)}
          />
        ));
      })()}

      <div className="cq-wrap">
        <div className="cq-header">
          <h1>Create Question</h1>
          <span className="cq-header-tag">MCQ Builder</span>
        </div>

        <div className="cq-card">

          {/* subject + type */}
          <div className="cq-row">
            <div className="cq-field">
              <label className="cq-label">Subject</label>
              <select className="cq-select" value={subject} onChange={e => setSubject(e.target.value)}>
                <option value="">Select subject…</option>
                {SUBJECTS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="cq-field">
              <label className="cq-label">Question Type</label>
              <select className="cq-select" value={questionType} onChange={e => setQuestionType(e.target.value)}>
                <option value="">Select type…</option>
                {Q_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* question content */}
          <div className="cq-row single" style={{ marginBottom: 32 }}>
            <div className="cq-field">
              <label className="cq-label">Question Content</label>
              <DocContentField
                label="question content"
                html={questionHtml}
                onOpen={() => handleOpen('question')}
              />
            </div>
          </div>

          {/* options */}
          <p className="cq-section-title">Options</p>
          <div className="cq-options-grid">
            {OPTIONS_META.map(opt => (
              <div key={opt.id} className="cq-option-item">
                <span className="cq-option-label">{opt.label}</span>
                <DocContentField
                  label={opt.label}
                  html={optionsHtml[opt.id]}
                  onOpen={() => handleOpen(opt.id)}
                />
              </div>
            ))}
          </div>

          {/* correct option */}
          <div className="cq-row" style={{ marginTop: 8 }}>
            <div className="cq-field">
              <label className="cq-label">Correct Option</label>
              <select className="cq-select" value={correctOption} onChange={e => setCorrectOption(e.target.value)}>
                {OPTIONS_META.map(o => (
                  <option key={o.id}>{`Option ${o.id}`}</option>
                ))}
              </select>
            </div>
          </div>

          {/* marks + difficulty */}
          <div className="cq-bottom-row">
            <div className="cq-field">
              <label className="cq-label">Marks</label>
              <input
                type="number" min={1}
                className="cq-input"
                value={marks}
                onChange={e => setMarks(e.target.value)}
              />
            </div>
            <div className="cq-field">
              <label className="cq-label">Difficulty</label>
              <select className="cq-select" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                {DIFFICULTIES.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>

          {/* actions */}
          <div className="cq-actions">
            <button className="cq-btn cq-btn-ghost">Cancel</button>
           
           
                       <button
              className="cq-btn cq-btn-primary"
              onClick={handleSubmit}
              disabled={submitting || submitDone}
              style={submitDone ? { background: '#1a7a3a', cursor: 'default' } : {}}
            >
              {submitting ? 'Submitting…' : submitDone ? '✓ Submitted' : 'Submit for Review'}
            </button>
          </div>

        </div>
      </div>
    </>
  );
}