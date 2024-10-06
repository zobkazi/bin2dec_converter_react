import { useState, useRef } from 'react';

const MicrophoneTest = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audioUrl, setAudioUrl] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioElementRef = useRef(null);

  const requestMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setPermissionGranted(true);
      return stream;
    } catch (error) {
      console.error('Microphone permission denied:', error);
      alert('Microphone permission denied. Please enable it in your browser settings.');
      setPermissionGranted(false);
      return null;
    }
  };

  const startRecording = async () => {
    const stream = await requestMicrophonePermission();
    if (stream) {
      setIsRecording(true);
      setAudioChunks([]);
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        setAudioChunks((prev) => [...prev, event.data]);
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      };
      
      mediaRecorderRef.current.start();
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    mediaRecorderRef.current.stop();
  };

  const handlePlayAudio = () => {
    if (audioElementRef.current) {
      audioElementRef.current.play();
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
      <h1 className="text-2xl font-bold mb-4">Microphone Test</h1>
      
      {permissionGranted ? (
        <>
          {isRecording ? (
            <div>
              <p className="text-xl">Recording...</p>
              <button 
                onClick={stopRecording} 
                className="bg-red-500 text-white p-4 rounded mt-4"
              >
                Stop Recording
              </button>
            </div>
          ) : (
            <div>
              <p className="text-xl">Press the button to start recording!</p>
              <button 
                onClick={startRecording} 
                className="bg-green-500 text-white p-4 rounded mt-4"
              >
                Start Recording
              </button>
            </div>
          )}

          {audioUrl && (
            <div className="mt-4">
              <p className="text-xl">Recording complete!</p>
              <audio 
                ref={audioElementRef} 
                src={audioUrl} 
                controls 
                className="mt-2"
              />
              <button 
                onClick={handlePlayAudio} 
                className="bg-blue-500 text-white p-2 rounded mt-2"
              >
                Play Audio
              </button>
            </div>
          )}
        </>
      ) : (
        <div>
          <p className="text-xl">Please grant microphone access.</p>
          <button 
            onClick={startRecording} 
            className="bg-yellow-500 text-white p-4 rounded mt-4"
          >
            Request Microphone Access
          </button>
        </div>
      )}
    </div>
  );
};

export default MicrophoneTest;
