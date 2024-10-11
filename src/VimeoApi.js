import axios from 'axios';

export const uploadVideoToVimeo = async (file, onUploadProgress) => {

  const vimeoAccessToken = 'a368ca8fbaae277fb9f2a72190e0a620';  

try {
  const createRes = await axios({
    method: 'post',
    url: 'https://api.vimeo.com/me/videos',
    headers: {
      Authorization: `Bearer ${vimeoAccessToken}`,  
      'Content-Type': 'application/json',
    },
    data: {
      upload: {
        approach: 'tus',  
        size: file.size,
      },
    },
  });

  const uploadLink = createRes.data.upload.upload_link;


  await axios.patch(uploadLink, file, {
    headers: {
      'Tus-Resumable': '1.0.0',
      'Upload-Offset': '0',
      'Content-Type': 'application/offset+octet-stream',
    },
    onUploadProgress: (event) => {
      const percentCompleted = Math.round((event.loaded * 100) / event.total);
      onUploadProgress(percentCompleted);
    },
  });

  console.log('Video upload successful');
} catch (error) {
  console.error('Error uploading video:', error.response ? error.response.data : error);
  throw error;
}}
