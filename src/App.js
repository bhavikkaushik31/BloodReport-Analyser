import React, { useRef, useEffect,useState } from 'react'; 
import './style.css';
/*import Header from './Header';
import Footer from './Footer';*/
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
  if (!question) {
    alert('Please enter a question');
    return;
  }

  if (!originalText || !analysisText) {
    alert("Please analyze a report first.");
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

    if (uploadBoxRef.current) {
      const dropZone = document.getElementById('drop-zone');
      const fileInput = document.getElementById('file'); 
      const fileLabel = document.getElementById('file-label');
      const clearBtn = document.getElementById('clear-file');
      const dropText = document.getElementById('drop-text');
      const uploadButton = document.getElementById('btn1');
      const resultText = document.getElementById('result-text');
      const uploadIcon = document.getElementById('uploadIcon');
      const loader = document.getElementById('loader'); 

      if (dropZone && fileInput && fileLabel && clearBtn && dropText && uploadButton && uploadIcon && resultText && loader) {

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

         
          fileInput.addEventListener('change', updateFileName);

        

          dropZone.addEventListener('dragover', (e) => {
              e.preventDefault();
              dropZone.classList.add('dragover');
          });

          dropZone.addEventListener('dragleave', () => {
              dropZone.classList.remove('dragover');
          });

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

          const handleSubmit = async (e) => {
              e.preventDefault(); 
              if (fileInput.files.length > 0) {
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

                      if (data.error) {
                          alert(data.error);
                          return;
                      }
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
              } else {
                  alert("Please select a file.");
              }
          };

          uploadButton.addEventListener('click', handleSubmit);

          return () => {
              fileInput.removeEventListener('change', updateFileName);
              dropZone.removeEventListener('dragover', (e) => e.preventDefault());
              dropZone.removeEventListener('dragleave', () => {});
              dropZone.removeEventListener('drop', (e) => { e.preventDefault(); /* ... */ });
              clearBtn.removeEventListener('click', (e) => e.stopPropagation());
              uploadButton.removeEventListener('click', handleSubmit);
          };
      }
    }
  }, []); 


  return (
    <>
      <div className="heading" style={{ textAlign: 'center' }}></div>

      <div className="bloodtesttube">
  <img src="/static/blood-test.front.png" alt="Blood Test" />
  <div className="bloodtext">
    <h2>
      Your Blood Insights, <span className="highlightword">Simplified</span>.
    </h2>
  </div>
</div>


      {/* How It Works Section */}
      <section className="how-it-works-box">
        <section className="how-it-works">
          <h2>How It Works</h2>
          <p>
            Unlock insights from your blood tests in three easy steps: upload, analyze, and understand.
          </p>

          <div className="steps-container">
            <div className="step-box">
              <h5>01</h5>
              <img src="/static/bloodtube.png" height="100" alt="Step 1" />
              <h4>Upload Your Blood Report</h4>
              <p>
                Upload your blood report to our platform. It's quick and easy, with support for multiple file formats.
              </p>
            </div>

            <div className="step-box">
              <h5>02</h5>
              <img src="/static/AiRObot.png" height="100" alt="Step 2" />
              <h4>Analysis by AI</h4>
              <p>
                Our advanced AI immediately analyzes your results, focusing on critical health indicators.
              </p>
            </div>

            <div className="step-box">
              <h5>03</h5>
              <img src="/static/report-icon.png" height="100" alt="Step 3" />
              <h4>Receive Your Report</h4>
              <p>
               Receive a detailed blood test report with clear insights and tailored recommendations, along with the option to ask follow-up questions for further clarification.
              </p>
            </div>
          </div>
        </section>
      </section>

      <section className="UploadBox" ref={uploadBoxRef}> 
        <div className="Upload">
          <h2>Upload Blood Report Here</h2>
        </div>
        <form id="upload-form" encType="multipart/form-data">
          <div id="drop-zone">
            <label htmlFor="file">
              <img id="uploadIcon" src="/static/upload.png" height="40" alt="Upload" style={{
    cursor: 'pointer'
  }}
/>

            </label>
            <input type="file" id="file" name="file" style={{ display: 'none' }} />
            <p id="drop-text">Drag or Click to Select Your File</p>
            <p id="file-name">
              <span id="file-label"></span>
              <span id="clear-file" title="Remove file">
                &times;
              </span>
            </p>
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
    <p
      className="follow-up-answer"
      dangerouslySetInnerHTML={{ __html: followUpAnswer }}
    ></p>
  </div>
)}

  </div>
</section>

      </section>
    </>
  );
};

export default App;
