// import React, { useState, useRef, useEffect } from 'react';
// import { DocumentEditor } from '@onlyoffice/document-editor-react';
// import './App.css';
// import { renderAsync } from 'docx-preview';

// const formatSize = (bytes) => {
//   if (bytes < 1024) return `${bytes} B`;
//   if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
//   return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
// };

// const formatDate = (ts) => {
//   const d = new Date(ts * 1000);
//   return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
// };

// export default function App() {
//   const [fileUrl,     setFileUrl]     = useState(null);
//   const [fileName,    setFileName]    = useState('Untitled.docx');
//   const [docKey,      setDocKey]      = useState('');
//   const [editorKey,   setEditorKey]   = useState(0);
//   const [isReady,     setIsReady]     = useState(false);
//   const [error,       setError]       = useState('');
//   const [localIp,     setLocalIp]     = useState(null);
//   const [modal,       setModal]       = useState(null);
//   const [modalInput,  setModalInput]  = useState('');
//   const [savedFiles,  setSavedFiles]  = useState([]);
//   const [filesOpen,   setFilesOpen]   = useState(false);
//   const [view,        setView]        = useState('editor');
//   const [previewHtml, setPreviewHtml] = useState('');
//   const [previewing,  setPreviewing]  = useState(false);
//   const [submitting,  setSubmitting]  = useState(false);
//   const [submitted,   setSubmitted]   = useState(false);
//   const [previewBuffer, setPreviewBuffer] = useState(null);
//   const previewContainerRef = useRef(null);
//   const [previewFilename, setPreviewFilename] = useState(null);




//   const readyTimer = useRef(null);
//   const filesRef   = useRef(null);

//   useEffect(() => {
//     const handler = (e) => {
//       if (filesRef.current && !filesRef.current.contains(e.target))
//         setFilesOpen(false);
//     };
//     document.addEventListener('mousedown', handler);
//     return () => document.removeEventListener('mousedown', handler);
//   }, []);

//   const fetchSavedFiles = () => {
//     fetch('http://localhost:8000/files')
//       .then(r => r.json())
//       .then(d => setSavedFiles(d.files || []))
//       .catch(() => {});
//   };

//   const registerKey = (key, filename) => {
//     fetch('http://localhost:8000/register-key', {
//       method:  'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body:    JSON.stringify({ key, filename })
//     });
//   };

//   const loadDoc = ({ url, filename, key }) => {
//     if (!url || !filename || !key) return;
//     if (readyTimer.current) clearTimeout(readyTimer.current);
//     setIsReady(false);
//     setView('editor');
//     setPreviewHtml('');
//     setSubmitted(false);
//     setFileUrl(url);
//     setFileName(filename);
//     setDocKey(key);
//     setEditorKey(p => p + 1);
//     readyTimer.current = setTimeout(() => setIsReady(true), 6000);
//   };

//   const promptFilename = () => {
//     return new Promise((resolve) => {
//       setModalInput('Untitled.docx');
//       setModal({ resolve: (val) => { setModal(null); resolve(val); } });
//     });
//   };

//   useEffect(() => {
//     fetch('http://localhost:8000/my-ip')
//       .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
//       .then(d => {
//         const ip  = d.ip;
//         const key = `new-${Date.now()}`;
//         setLocalIp(ip);
//         fetchSavedFiles();
//         setModalInput('Untitled.docx');
//         setModal({
//           resolve: (val) => {
//             setModal(null);
//             const filename = !val || val.trim() === ''
//               ? 'Untitled.docx'
//               : val.trim().endsWith('.docx') ? val.trim() : `${val.trim()}.docx`;
//             registerKey(key, filename);
//             loadDoc({ url: `http://${ip}:3000/templates/new.docx`, filename, key });
//           }
//         });
//       })
//       .catch(err => setError(`❌ Cannot reach FastAPI: ${err.message}`));
//   }, []);

//   const handleNew = async () => {
//     if (!localIp) { setError('❌ Server not ready'); return; }
//     const input = await promptFilename();
//     if (input === null) return;
//     const baseName = input.trim() || 'Untitled.docx';
//     const filename = baseName.endsWith('.docx') ? baseName : `${baseName}.docx`;
//     const key      = `new-${Date.now()}`;
//     registerKey(key, filename);
//     loadDoc({ url: `http://${localIp}:3000/templates/new.docx`, filename, key });
//   };

//   const handleOpenSaved = (file) => {
//     if (!localIp) return;
//     setFilesOpen(false);
//     const key = `saved-${file.filename}`;
//     registerKey(key, file.filename);
//     loadDoc({
//       url:      `http://${localIp}:8000/saved/${file.filename}`,
//       filename: file.filename,
//       key
//     });
//   };

// const [previewPdf, setPreviewPdf] = useState(null); // ✅ PDF blob URL

// // update handlePreview

// // const handlePreview = async () => {
// //   if (!isReady || !docKey || !localIp) {
// //     setError('❌ Editor not ready');
// //     return;
// //   }
// //   setPreviewing(true);
// //   setError('');

// //   try {
// //     // ✅ Step 1 — forcesave
// //     const fsRes  = await fetch(`http://${localIp}:8000/forcesave`, {
// //       method:  'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body:    JSON.stringify({ key: docKey })
// //     });
// //     const fsData = await fsRes.json();
// //     console.log('💾 Forcesave:', fsData);

// //     // ✅ Step 2 — wait for callback to fire
// //     await new Promise(r => setTimeout(r, 2000));

// //     // ✅ Step 3 — pass key only, backend uses key_to_url[key]
// //     const response = await fetch(`http://${localIp}:8000/preview`, {
// //       method:  'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body:    JSON.stringify({ key: docKey })
// //     });
// //     if (!response.ok) throw new Error(`HTTP ${response.status}`);
// //     const data = await response.json();

// //     // ✅ Step 4 — show PDF
// //     const binary = atob(data.pdf_base64);
// //     const bytes  = new Uint8Array(binary.length);
// //     for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
// //     const blob   = new Blob([bytes], { type: 'application/pdf' });
// //     const pdfUrl = URL.createObjectURL(blob);
// //     if (previewPdf) URL.revokeObjectURL(previewPdf);
// //     setPreviewPdf(pdfUrl);
// //     setView('preview');

// //   } catch (err) {
// //     setError(`❌ Preview failed: ${err.message}`);
// //   } finally {
// //     setPreviewing(false);
// //   }
// // };


// // const handlePreview = async () => {
// //   if (!isReady || !docKey || !localIp) {
// //     setError('❌ Editor not ready');
// //     return;
// //   }
// //   setPreviewing(true);
// //   setError('');

// //   try {
// //     // Step 1 — forcesave (same)
// //     const fsRes = await fetch(`http://${localIp}:8000/forcesave`, {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify({ key: docKey })
// //     });
// //     const fsData = await fsRes.json();
// //     console.log('💾 Forcesave:', fsData);

// //     // Step 2 — wait
// //     await new Promise(r => setTimeout(r, 2000));

// //     // 🔥 Step 3 — Get DOCX bytes (NOT PDF!)
// //     // const response = await fetch(`http://${localIp}:8000/preview`, {
// //     //   method: 'POST',
// //     //   headers: { 'Content-Type': 'application/json' },
// //     //   body: JSON.stringify({ key: docKey })
// //     // });
// //     // if (!response.ok) throw new Error(`HTTP ${response.status}`);
// //     // const data = await response.json();

// //     // // 🔥 Step 4 — Store DOCX ArrayBuffer for docx-preview
// //     // setPreviewBuffer(data.docx_arraybuffer);  // Backend sends raw bytes
// //     // setView('preview');
// //     const response = await fetch(`http://${localIp}:8000/preview`, {
// //     method: 'POST',
// //     headers: { 'Content-Type': 'application/json' },
// //     body: JSON.stringify({ key: docKey })
// //   });
// //   const data = await response.json();

// //   // Convert base64 → ArrayBuffer for docx-preview
// //   const binaryString = atob(data.docx_arraybuffer);
// //   const bytes = new Uint8Array(binaryString.length);
// //   for (let i = 0; i < binaryString.length; i++) {
// //     bytes[i] = binaryString.charCodeAt(i);
// //   }
// //   setPreviewBuffer(bytes.buffer);  // Your existing state!
// //   setView('preview');
// //     console.log('✅ DOCX preview ready');

// //   } catch (err) {
// //     setError(`❌ Preview failed: ${err.message}`);
// //   } finally {
// //     setPreviewing(false);
// //   }
// // };

// const handlePreview = async () => {
//   if (!isReady || !docKey || !localIp) {
//     setError('❌ Editor not ready');
//     return;
//   }
  
//   setPreviewing(true);
//   setError('');

//   try {
//     // ✅ Step 1 — forcesave (same as before)
//     const fsRes = await fetch(`http://${localIp}:8000/forcesave`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ key: docKey })
//     });
//     const fsData = await fsRes.json();
//     console.log('💾 Forcesave:', fsData);

//     // ✅ Step 2 — wait for callback to fire
//     await new Promise(r => setTimeout(r, 2000));

//     // ✅ Step 3 — get HTML preview
//     const response = await fetch(`http://${localIp}:8000/preview`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ key: docKey })
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.error || `HTTP ${response.status}`);
//     }

//     const data = await response.json();
//     console.log('📄 HTML Preview:', data.filename);

//     // 🔥 Step 4 — set HTML content (NO PDF conversion!)
//     setPreviewHtml(data.html_content);
//     setPreviewFilename(data.filename);
//     setView('preview');

//   } catch (err) {
//     console.error('❌ Preview error:', err);
//     setError(`❌ Preview failed: ${err.message}`);
//   } finally {
//     setPreviewing(false);
//   }
// };


// // ✅ render docx when view changes to preview
// // useEffect(() => {
// //   if (view === 'preview' && previewBuffer && previewContainerRef.current) {
// //     previewContainerRef.current.innerHTML = '';
// //     renderAsync(previewBuffer, previewContainerRef.current, null, {
// //       className:          'docx-preview',
// //       inWrapper:          true,
// //       ignoreWidth:        false,
// //       ignoreHeight:       false,
// //       ignoreFonts:        false,
// //       breakPages:         true,
// //       ignoreLastRenderedPageBreak: true,
// //       experimental:       true,
// //       trimXmlDeclaration: true,
// //       debug:              false,
// //     }).catch(err => setError(`❌ Render failed: ${err.message}`));
// //   }
// // }, [view, previewBuffer]);

// useEffect(() => {
//   if (view === 'preview' && previewBuffer && previewContainerRef.current) {
//     previewContainerRef.current.innerHTML = '';
//     renderAsync(previewBuffer, previewContainerRef.current, null, {
//       className: 'docx-preview',
//       inWrapper: true,
//       ignoreWidth: false,
//       ignoreHeight: false,
//       breakPages: true,
//       experimental: true,
//     });
//   }
// }, [view, previewBuffer]);


//   // ✅ edit — just show editor, nothing re-mounts
//   const handleEdit = () => {
//     setView('editor');
//     setSubmitted(false);
//   };

//   // ✅ submit — save to disk only now
//   const handleSubmit = async () => {
//     if (!localIp) return;
//     setSubmitting(true);
//     setError('');
//     try {
//       const res  = await fetch(`http://${localIp}:8000/submit`, {
//         method:  'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body:    JSON.stringify({ filename: fileName, key: docKey })
//       });
//       const data = await res.json();
//       if (data.ok) {
//         setSubmitted(true);
//         fetchSavedFiles();
//       } else {
//         throw new Error(data.error || 'Submit failed');
//       }
//     } catch (err) {
//       setError(`❌ Submit failed: ${err.message}`);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const config = (localIp && fileUrl && docKey && fileName) ? {
//     document: {
//       fileType: 'docx',
//       key:      docKey,
//       title:    fileName,
//       url:      fileUrl
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

//   return (
//     <>
//       {/* Filename modal */}
//       {modal && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <h3>📄 New Document</h3>
//             <input
//               className="modal-input"
//               value={modalInput}
//               onChange={e => setModalInput(e.target.value)}
//               onKeyDown={e => {
//                 if (e.key === 'Enter')  modal.resolve(modalInput);
//                 if (e.key === 'Escape') modal.resolve(null);
//               }}
//               placeholder="Untitled.docx"
//               autoFocus
//             />
//             <div className="modal-actions">
//               <button className="tb-btn" onClick={() => modal.resolve(null)}>Cancel</button>
//               <button className="tb-btn accent" onClick={() => modal.resolve(modalInput)}>Create</button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="App">
//         <div className="toolbar">

//           {/* Brand */}
//           <div className="toolbar-brand">
//             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//               <polyline points="14,2 14,8 20,8"/>
//               <line x1="16" y1="13" x2="8" y2="13"/>
//               <line x1="16" y1="17" x2="8" y2="17"/>
//             </svg>
//             <span>Docs</span>
//           </div>

//           {/* Editor toolbar items */}
//           {view === 'editor' && (
//             <>
//               <button className="tb-btn accent" onClick={handleNew}>
//                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//                   <line x1="12" y1="5" x2="12" y2="19"/>
//                   <line x1="5" y1="12" x2="19" y2="12"/>
//                 </svg>
//                 New
//               </button>

//               {/* <div className="dropdown" ref={filesRef}>
//                 <button className="tb-btn" onClick={() => { fetchSavedFiles(); setFilesOpen(p => !p); }}>
//                   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
//                   </svg>
//                   Open Saved
//                   <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
//                     style={{ marginLeft: 2, transform: filesOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
//                     <polyline points="6 9 12 15 18 9"/>
//                   </svg>
//                 </button>
//                 {filesOpen && (
//                   <div className="dropdown-menu files-menu" style={{ display: 'flex' }}>
//                     {savedFiles.length === 0 ? (
//                       <div className="dropdown-empty">No saved files yet</div>
//                     ) : (
//                       savedFiles.map(file => (
//                         <button key={file.filename} className="dropdown-item file-item"
//                           onClick={() => handleOpenSaved(file)}>
//                           <span className="dropdown-item-icon">📄</span>
//                           <span className="file-item-info">
//                             <span className="file-item-name">{file.filename}</span>
//                             <span className="file-item-meta">{formatSize(file.size)} · {formatDate(file.modified)}</span>
//                           </span>
//                         </button>
//                       ))
//                     )}
//                   </div>
//                 )}
//               </div> */}
//             </>
//           )}

//           {/* Preview mode badge */}
//           {view === 'preview' && (
//             <span className="preview-badge">👁 Preview Mode</span>
//           )}

//           <div className="toolbar-divider" />

//           {/* Current file name */}
//           <div className="file-pill">
//             <span className="file-pill-dot" />
//             {fileName}
//           </div>

//           <div className="toolbar-spacer" />

//           {/* Preview button — editor only */}
//           {view === 'editor' && isReady && (
//             <button
//               className="tb-btn preview-btn"
//               onClick={handlePreview}
//               disabled={previewing}
//             >
//               {previewing ? (
//                 <><div className="btn-spinner" /> Generating…</>
//               ) : (
//                 <>
//                   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
//                     <circle cx="12" cy="12" r="3"/>
//                   </svg>
//                   Preview
//                 </>
//               )}
//             </button>
//           )}

//           {/* Edit + Submit — preview only */}
//           {view === 'preview' && (
//             <>
//               <button className="tb-btn" onClick={handleEdit}>
//                 <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
//                   <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
//                 </svg>
//                 Edit
//               </button>

//               {submitted ? (
//                 <span className="submit-success">✅ Submitted!</span>
//               ) : (
//                 <button className="tb-btn submit-btn" onClick={handleSubmit} disabled={submitting}>
//                   {submitting ? (
//                     <><div className="btn-spinner" /> Submitting…</>
//                   ) : (
//                     <>
//                       <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <polyline points="20 6 9 17 4 12"/>
//                       </svg>
//                       Submit
//                     </>
//                   )}
//                 </button>
//               )}
//             </>
//           )}

//           <a href="http://localhost:8080" target="_blank" rel="noreferrer" className="server-badge">
//             <span className="server-badge-dot" />
//             ONLYOFFICE Server
//           </a>
//         </div>

//         {error && (
//           <div className="error-bar">
//             <span>{error}</span>
//             <button onClick={() => setError('')}
//               style={{ marginLeft:'auto', background:'none', border:'none', color:'inherit', cursor:'pointer', fontSize:'1rem' }}>✕</button>
//           </div>
//         )}

//         {/* ✅ Editor — always mounted, hidden when preview */}
//         <div
//           className="editor-wrapper"
//           style={{ display: view === 'editor' ? 'flex' : 'none' }}
//         >
//           <div className={`loading-overlay ${isReady ? 'hidden' : ''}`}>
//             <div className="loading-spinner" />
//             <span className="loading-text">Loading document…</span>
//           </div>

//           {config && (
//             <div key={editorKey} style={{ height: '100%', width: '100%' }}>
//               <DocumentEditor
//                 id={`docEditor-${editorKey}`}
//                 documentServerUrl="http://localhost:8080"
//                 config={config}
//                 events={{
//                   onDocumentReady: () => {
//                     if (readyTimer.current) clearTimeout(readyTimer.current);
//                     setIsReady(true);
//                   },
//                    onDocumentStateChange: (event) => {
//     console.log('📝 Doc state changed:', event?.data);
//     // event.data = true means unsaved changes
//     // event.data = false means document is saved
//   },
//                   onError: (err) => {
//                     console.error('Editor error:', JSON.stringify(err?.data, null, 2));
//                     setError(`❌ Editor error: ${err?.data?.errorCode} — ${err?.data?.errorDescription}`);
//                   }
//                 }}
//               />
//             </div>
//           )}
//         </div>

//         {/* ✅ Preview — rendered when view = preview */}
//         {/* {view === 'preview' && (
//           <div className="preview-wrapper">
//           {previewPdf ? (
//       <iframe
//         src={previewPdf}
//         className="preview-pdf"
//         title="Document Preview"
//       />
//     ) : (
//       <div className="preview-page">
//         <p>No preview available</p>
//       </div>
//     )}
//           </div>
//         )} */}
//         {/* {view === 'preview' && (
//   <div className="preview-wrapper">
//     {previewBuffer ? (
//       // ✅ NATIVE DOCX RENDERING (not PDF!)
//       <div 
//         ref={previewContainerRef}
//         className="docx-preview-container"
//         style={{ height: '100vh', overflow: 'auto' }}
//       />
//     ) : (
//       <div className="preview-placeholder">
//         <div className="loading-spinner-large" />
//         <p>Generating preview...</p>
//       </div>
//     )}
//   </div>
// )} */}

// {view === 'preview' && (
//   <div className="preview-wrapper">
//     <div className="preview-header">
//       <button 
//         onClick={() => setView('editor')}
//         className="back-btn"
//         disabled={previewing}
//       >
//         ← Back to Editor
//       </button>
//       <h2>{previewFilename || 'Preview'}</h2>
//     </div>
    
//     {previewHtml ? (
//       <div 
//         className="html-preview-container"
//         dangerouslySetInnerHTML={{ __html: previewHtml }}
//       />
//     ) : (
//       <div className="preview-loading">
//         <div className="spinner-large" />
//         <p>Generating HTML preview...</p>
//       </div>
//     )}
//   </div>
// )}



//       </div>
//     </>
//   );
// }


import React from 'react';
import CreateQuestion from './components/CreateQuestion';
import './App.css';
 
export default function App() {
  return <CreateQuestion />;
}
 