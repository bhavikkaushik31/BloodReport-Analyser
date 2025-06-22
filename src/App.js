import React, { useRef, useEffect, useState } from 'react';
import './style.css';
import Header from './Header';
import Footer from './Footer';

const formatGeminiOutput = (text) => {
  return text
    .replace(/\*/g, '')
    .replace(/^([\w\s\-\/]+): (.+?) → (HIGH|LOW|NORMAL)/gm, (_, metric, value, level) =>
      `<strong>${metric}</strong>: ${value} → <strong>${level}</strong>`
    )
    .replace(/Explanation:\s*(.+)/g, '<strong>Explanation:</strong> $1')
    .replace(/Suggestion:\s*(.+)/g, '<strong>Suggestion:</strong> $1')
    .replace(/\n/g, '<br>');
};

const App = () => {
  const uploadBoxRef = useRef(null);
  const [followUpQuestion, setFollowUpQuestion] = useState('');
  const [followUpAnswer, setFollowUpAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [originalText, setOriginalText] = useState('');
  const [analysisText, setAnalysisText] = useState('');

  const handleFollowUp = async () => {
    const question = followUpQuestion.trim();
    if (!question || !originalText || !analysisText) {
      alert('Please analyze a report and enter a question.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/followup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalText, analysis: analysisText, question }),
      });

      const data = await response.json();
      setFollowUpAnswer(formatGeminiOutput(data.answer || 'No answer received.'));
    } catch (err) {
      alert('Failed to get answer');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!uploadBoxRef.current) return;

    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file');
    const fileLabel = document.getElementById('file-label');
    const clearBtn = document.getElementById('clear-file');
    const dropText = document.getElementById('drop-text');
    const uploadButton = document.getElementById('btn1');
    const resultText = document.getElementById('result-text');
    const uploadIcon = document.getElementById('uploadIcon');
    const loader = document.getElementById('loader');

    const updateFileName = () => {
      if (fileInput.files.length > 0) {
        dropText.style.display = 'none';
        fileLabel.textContent = `Selected file: ${fileInput.files[0].name}`;
        clearBtn.style.display = 'inline';
        uploadIcon.style.display = 'none';
      } else {
        fileLabel.textContent = '';
        clearBtn.style.display = 'none';
        dropText.style.display = 'block';
        uploadIcon.style.display = 'block';
        fileInput.disabled = false;
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (fileInput.files.length === 0) return alert("Please select a file.");

      const form = new FormData(document.getElementById('upload-form'));
      loader.style.display = 'block';
      uploadButton.disabled = true;
      uploadButton.textContent = 'Analyzing...';

      try {
        const res = await fetch('/upload', {
          method: 'POST',
          body: form
        });
        const data = await res.json();

        if (data.error) return alert(data.error);
        setOriginalText(data.text);
        setAnalysisText(data.analysis);
        resultText.innerHTML = formatGeminiOutput(data.analysis);
      } catch (err) {
        alert("Upload failed");
        console.error(err);
      } finally {
        loader.style.display = 'none';
        uploadButton.disabled = false;
        uploadButton.textContent = 'Analyze Report';
      }
    };

    fileInput.addEventListener('change', updateFileName);
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('dragover');
    });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('dragover');
      if (e.dataTransfer.files.length && !fileInput.disabled) {
        fileInput.files = e.dataTransfer.files;
        updateFileName();
      }
    });
    clearBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      fileInput.value = '';
      updateFileName();
    });
    uploadButton.addEventListener('click', handleSubmit);

    return () => {
      fileInput.removeEventListener('change', updateFileName);
      uploadButton.removeEventListener('click', handleSubmit);
    };
  }, []);

  return (
    <>
      <Header />
      <main style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="bloodtesttube">
        <img src="/static/blood-test.front.png" alt="Blood Test" />
        <div className="bloodtext">
          <h2>Your Blood Insights, <span className="highlightword">Simplified</span>.</h2>
        </div>
      </div>

      <section className="how-it-works-box">
        <section className="how-it-works">
          <h2>How It Works</h2>
          <p>Unlock insights from your blood tests in three easy steps: upload, analyze, and understand.</p>
          <div className="steps-container">
            {[
              { img: "bloodtube.png", title: "Upload Your Blood Report" },
              { img: "AiRObot.png", title: "Analysis by AI" },
              { img: "report-icon.png", title: "Receive Your Report" }
            ].map((step, i) => (
              <div className="step-box" key={i}>
                <h5>{`0${i + 1}`}</h5>
                <img src={`/static/${step.img}`} height="100" alt={`Step ${i + 1}`} />
                <h4>{step.title}</h4>
                <p>{[
                  "Upload your blood report to our platform.",
                  "Our advanced AI immediately analyzes your results.",
                  "Receive a detailed report with recommendations."
                ][i]}</p>
              </div>
            ))}
          </div>
        </section>
      </section>

      <section className="UploadBox" ref={uploadBoxRef}>
        <div className="Upload"><h2>Upload Blood Report Here</h2></div>
        <form id="upload-form" encType="multipart/form-data">
          <div id="drop-zone">
            <label htmlFor="file">
              <img id="uploadIcon" src="/static/upload.png" height="40" alt="Upload" style={{ cursor: 'pointer' }} />
            </label>
            <input type="file" id="file" name="file" style={{ display: 'none' }} />
            <p id="drop-text">Drag or Click to Select Your File</p>
            <p id="file-name"><span id="file-label"></span><span id="clear-file" title="Remove file">&times;</span></p>
          </div>
          <br />
          <button id="btn1" type="submit">Analyze Report</button>
          <div id="loader" className="loader-container" style={{ display: 'none' }}>
            <div className="spinner"></div>
          </div>
        </form>

        <section className="analysis-section">
          <div id="result-box">
            <h2>Result</h2>
            <div id="result-text" className="result-text"></div>
          </div>

          <div className="follow-up-section">
            <h3>Ask a Follow-Up Question</h3>
            <input
              id="followUpInput"
              placeholder="Ask Your Question About The Result Here"
              value={followUpQuestion}
              onChange={(e) => {
                setFollowUpQuestion(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              className="follow-up-input"
              rows={1}
            />
            <button onClick={handleFollowUp} disabled={loading} className="follow-up-button">
              {loading ? 'Asking...' : 'Ask'}
            </button>

            {followUpAnswer && (
              <div className="follow-up-answer-box">
                <h4>Answer:</h4>
                <p className="follow-up-answer" dangerouslySetInnerHTML={{ __html: followUpAnswer }}></p>
              </div>
            )}
          </div>
        </section>
      </section>
  </main>
      <Footer />
    </>
  );
};

export default App;
