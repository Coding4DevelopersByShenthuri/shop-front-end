import React, { useState, useEffect, useRef } from 'react';
import './Uploads.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Uploads = () => {
  const [recentFiles, setRecentFiles] = useState([
    { name: 'Staff images', type: 'folder', location: 'Images' },
    { name: 'Products images', type: 'folder', location: 'Images' },
    { name: 'Attendance pdf', type: 'folder', location: 'Reports' },
  ]);

  const [allFiles, setAllFiles] = useState([
    { name: 'Monthly Report.pdf', date: '2024-10-01', time: '10:30 AM' },
    { name: 'Sales Data.csv', date: '2024-10-02', time: '11:00 AM' },
    { name: 'Inventory.xlsx', date: '2024-10-03', time: '1:15 PM' },
  ]);

  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [showRenamePopup, setShowRenamePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [fileIndexToRename, setFileIndexToRename] = useState(null);
  const [fileIndexToDelete, setFileIndexToDelete] = useState(null);
  const [newFileName, setNewFileName] = useState('');
  const fileInputRef = useRef(null);

  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest('.file-preview') && !event.target.closest('.file-options')) {
      setOpenMenuIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleRename = (index) => {
    setFileIndexToRename(index);
    setNewFileName(recentFiles[index].name);
    setShowRenamePopup(true);
    setOpenMenuIndex(null);
  };

  const handleDelete = (index) => {
    setFileIndexToDelete(index);
    setShowDeletePopup(true);
    setOpenMenuIndex(null);
  };

  const handleUpload = () => {
    fileInputRef.current.click();
  };

  const confirmDelete = async () => {
    const filePath = `{recentFiles[fileIndexToDelete].name}`; 

    try {
      const response = await fetch('${import.meta.env.VITE_API_BASE_URL}/files/delete-file', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filePath }),
      });
      if (response.ok) {
        setRecentFiles((prevFiles) => prevFiles.filter((_, index) => index !== fileIndexToDelete));
        setShowDeletePopup(false);
        alert('File deleted successfully');
      } else {
        alert('Failed to delete file');
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('An error occurred while deleting the file');
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      alert(`File uploaded: ${file.name}`);
    }
    setOpenMenuIndex(null);
  };

  const handleRenameSubmit = () => {
    if (newFileName.trim()) {
      setRecentFiles((prevFiles) => {
        const updatedFiles = [...prevFiles];
        updatedFiles[fileIndexToRename].name = newFileName;
        return updatedFiles;
      });
      setShowRenamePopup(false);
    } else {
      alert('File name cannot be empty');
    }
  };

  return (
    <div className="uploads">
      <h2 className="mt-6 py-8">Recently used</h2>
      <div className="recent-files">
        {recentFiles.map((file, index) => (
          <div key={index} className="file-preview">
            <i className="fas fa-folder file-icon"></i>
            <span>{file.name}</span>
            <div className="file-options" onClick={() => toggleMenu(index)}>⋮</div>
            
            {openMenuIndex === index && (
              <div className="dropdown-menu">
                <div className="menu-item" onClick={() => handleRename(index)}>Rename</div>
                <div className="menu-item" onClick={() => handleUpload()}>Upload</div>
                <div className="menu-item" onClick={() => handleDelete(index)}>Delete</div>
              </div>
            )}
          </div>
        ))}
      </div>

      <h2>All files</h2>
      <table className="file-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Last modified</th>
          </tr>
        </thead>
        <tbody>
          {allFiles.map((file, index) => (
            <tr key={index}>
              <td>{file.name}</td>
              <td>{`${file.date} ${file.time}`}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {/* Rename Popup */}
      {showRenamePopup && (
        <div className="popup-overlay" onClick={() => setShowRenamePopup(false)}>
          <div className="popup rename-popup centered-popup" onClick={(e) => e.stopPropagation()}>
            <h3>Rename File</h3>
            <input
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
            />
            <button onClick={handleRenameSubmit}>Rename</button>
            <button onClick={() => setShowRenamePopup(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {showDeletePopup && (
        <div className="popup-overlay" onClick={() => setShowDeletePopup(false)}>
          <div className="popup delete-popup centered-popup" onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete "{recentFiles[fileIndexToDelete]?.name}"?</p>
            <button onClick={confirmDelete}>Yes</button>
            <button onClick={() => setShowDeletePopup(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Uploads;
