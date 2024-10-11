import React, { useState } from 'react';
import { uploadVideoToVimeo } from '../VimeoApi';  

const VideoUpload = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
    setProgress(0);  
    setUploadStatus('');  
  };

  const handleUpload = async () => {
    if (!videoFile) {
      alert('Please select a video file to upload.');
      return;
    }

    try {
      await uploadVideoToVimeo(videoFile, setProgress);
      setUploadStatus('Upload successful!');
    } catch (error) {
      console.error('Error uploading video:', error);
      setUploadStatus('Upload failed. Please try again.');
    }
  };

  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Upload Video to Vimeo</h2>
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                   file:rounded file:border-0 file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-4"
      />
      <button
        onClick={handleUpload}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Upload Video
      </button>

      {progress > 0 && (
        <div className="mt-4">
          <div className="text-center mb-1">Uploading: {progress}%</div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-600 h-4 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {uploadStatus && (
        <div className="mt-4 text-center text-lg font-medium">
          {uploadStatus}
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
