"use client";

export function MicButton({
  startListening,
  SpeechRecognition,
  isRecording,
}: any) {
  return (
    <button
      type="button"
      //   onTouchStart={startListening}
      onClick={startListening}
      onTouchEnd={SpeechRecognition.stopListening}
      onMouseUp={SpeechRecognition.stopListening}
      className="focus:outline-none focus:ring-0 focus:ring-none active:scale-95 focus:ring-offset-0 rounded-full"
      aria-label={isRecording ? "Stop Recording" : "Start Recording"}
    >
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="40"
          cy="40"
          r="38"
          stroke={isRecording ? "#EF4444" : "#3B82F6"}
          strokeWidth="4"
        />
        <circle
          cx="40"
          cy="40"
          r="38"
          stroke={isRecording ? "#EF4444" : "#3B82F6"}
          strokeWidth="4"
          strokeDasharray="239"
          strokeDashoffset={isRecording ? "0" : "239"}
          className="transition-all duration-1000 ease-in-out"
        />
        <path
          d="M40 20v40M30 30v20M50 30v20"
          stroke={isRecording ? "#EF4444" : "#3B82F6"}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <animate
            attributeName="d"
            dur="0.3s"
            repeatCount="indefinite"
            values="M40 20v40M30 30v20M50 30v20;
                    M40 20v40M30 25v30M50 25v30;
                    M40 20v40M30 30v20M50 30v20"
            begin="indefinite"
          />
        </path>
      </svg>
    </button>
  );
}
