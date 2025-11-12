import React, { useEffect, useState} from 'react';
import './Hero.css'
import Upload from '../../Assests/upload.png';
import Download from '../../Assests/download.png'
import Share from '../../Assests/share.png';
import Delete from '../../Assests/bin.png';
import View from '../../Assests/view.png';
import Listicon from '../../Assests/list.png';
import Gridicon from '../../Assests/grid.png'; 
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Sidebar from '../Sidebar/Sidebar';

const Hero = ({ backendUrl = 'http://localhost:5000', clientOrigin = 'http://localhost:3000' }) => {
  const [files, setFiles] = useState([]);
  const [selected, setSelected] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [queryRefresh, setQueryRefresh] = useState(0);
  const [gridView, setGridView] = useState(false); // toggle state

  useEffect(() => {
    
    fetchFiles();
     // eslint-disable-next-line
  }, [queryRefresh]);

  async function fetchFiles() {
    try {
      const res = await fetch(`${backendUrl}/files`);
      const data = await res.json();
      setFiles(data);
    } catch (err) {
      console.error('Fetch files failed', err);
    }
  }

  function humanSize(bytes) {
    if (!bytes) return '0 B';
    const units = ['B','KB','MB','GB','TB'];
    let i=0; let n = bytes;
    while (n >= 1024 && i < units.length-1) { n /= 1024; i++; }
    return `${n.toFixed(2)} ${units[i]}`;
  }

  function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setProgress(0);

    const form = new FormData();
    form.append('file', file);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${backendUrl}/upload`, true);

    xhr.upload.onprogress = (ev) => {
      if (ev.lengthComputable) {
        setProgress(Math.round((ev.loaded / ev.total) * 100));
      }
    };

    xhr.onload = () => {
      setUploading(false);
      setProgress(100);
      setTimeout(() => setProgress(0), 700);
      setQueryRefresh(q => q + 1);
    };

    xhr.onerror = () => {
      setUploading(false);
      alert('Upload failed');
    };

    xhr.send(form);
  }

  function previewFile(file) {
    setSelected(file);
    setPreviewUrl(`${backendUrl}/files/${file.id}`);
  }

  async function handleDelete(file) {
    if (!window.confirm(`Delete "${file.filename}"?`)) return;
    try {
      const res = await fetch(`${backendUrl}/files/${file.id}`, { method: 'DELETE' });
      if (res.ok) {
        setQueryRefresh(q => q + 1);
      } else {
        alert('Delete failed');
      }
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  }

  function handleDownload(file) {
    const url = `${backendUrl}/files/${file.id}?download=true`;
    const a = document.createElement('a');
    a.href = url;
    a.download = file.filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  async function handleShare(file) {
    try {
      const res = await fetch(`${backendUrl}/share/${file.id}`);
      const data = await res.json();
      const shareUrl = data.shareUrl || `${clientOrigin}/preview/${file.id}`;
      await navigator.clipboard.writeText(shareUrl);
      alert('Share link copied:\n' + shareUrl);
    } catch (err) {
      const fallback = `${clientOrigin}/preview/${file.id}`;
      await navigator.clipboard.writeText(fallback);
      alert('Share link copied:\n' + fallback);
    }
  }


  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
   
  return (
    
    <div className='parent'>
    <Navbar toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      <Sidebar isOpen={isMenuOpen} />

        <div className="cloud-shell">
      <div className="cloud-card">
        <div className="header-row">
          <h2 className="cloud-title">...</h2>
          <button className="toggle-btn" onClick={() => setGridView(!gridView)}>
              {gridView ? (
                <>
                  <img src={Listicon} alt="List View" className="view-icon" />
                  List View
                </>
              ) : (
                <>
                  <img src={Gridicon} alt="Grid View" className="view-icon" />
                  Grid View
                </>
              )}
          </button>
        </div>

        <label className="upload-box">
          <input type="file" onChange={handleUpload} hidden />
          <div className='upload_container'>
           <img src={Upload} alt="Upload Logo" id="upload_logo"/>
            <div className="upload-text">
              <div className="bold">Click to upload</div>
            </div>
          </div>
        </label>

        {uploading && (
          <div className="progress">
            <div className="progress-bar" style={{ width: `${progress}%` }} />
            <div className="progress-text">{progress}%</div>
          </div>
        )}

       <div className={`list-wrap ${gridView ? 'grid' : ''}`}>
          {files.length === 0 ? (
            <div className="empty">No files yet — upload one</div>
          ) : (
            files.map(f => (
              <div className="griddiv">
              <div key={f.id} className="file-row">
                <div className="file">
                  <div className="filename">{f.filename}</div>
                  <div className="small">{f.contentType} • {humanSize(f.length)} • {new Date(f.uploadDate).toLocaleString()}</div>
                </div>
                <div className="actions">
                  <img src={View} alt="View" className='action_buttons' onClick={()=> previewFile(f)}/>
                  <img src={Download} alt="Downlaod" className='action_buttons' onClick={()=> handleDownload(f)}/>
                  <img src={Share} alt="Share" className='action_buttons' onClick={()=> handleShare(f)}/>
                  <img src={Delete} alt="Delete" className='action_buttons' onClick={()=> handleDelete(f)}/>
                </div>
              </div>
              </div>

            ))
          )}
        </div>
      </div>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <strong>{selected.filename}</strong>
              <button onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="modal-body">
              {selected.contentType?.startsWith('image') && <img src={previewUrl} alt={selected.filename} />}
              {selected.contentType?.startsWith('video') && <video controls src={previewUrl} />}
              {selected.contentType?.startsWith('audio') && <audio controls src={previewUrl} />}
              {!selected.contentType?.startsWith('image') &&
               !selected.contentType?.startsWith('video') &&
               !selected.contentType?.startsWith('audio') && (
                 <iframe title="file" src={previewUrl} />
              )}
            </div>
            <div className="modal-footer">
              <button className="primary" onClick={() => handleDownload(selected)}>Download</button>
              <button onClick={() => handleShare(selected)}>Copy / Share Link</button>
              <button className="danger" onClick={() => { handleDelete(selected); setSelected(null); }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer/>
    </div>
    
  )
 
};


export default Hero
