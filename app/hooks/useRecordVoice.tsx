import { useState, useCallback, useEffect, useRef, useContext } from "react";
import { useAppContext } from "../store/store";

export function useRecordVoice() {
  const [transcript, setTranscript] = useState("");
  const [formatedPrescription, setFormatedPrescription] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTranscript(e.target.value);
  };

  const generatePrescription = () => {};

  return {
    handleChange,
    transcript,
    generatePrescription,
    formatedPrescription,
  };
}
// declare global {
//   interface Window {
//     SpeechRecognition: typeof SpeechRecognition;
//     webkitSpeechRecognition: typeof SpeechRecognition;
//     // SpeechGrammarList: typeof SpeechGrammarList;
//     // webkitSpeechGrammarList: typeof SpeechGrammarList;
//   }
// }
// const SpeechGrammarList =
//   window.SpeechGrammarList || window.webkitSpeechGrammarList;
// useEffect(() => {
//     if (animationRef.current) {
//       if (isRecording) {
//         animationRef.current.beginElement();
//       } else {
//         animationRef.current.endElement();
//       }
//     }
//   }, [isRecording]);
//   useEffect(() => {
//     if (!SpeechRecognition) {
//       console.error("Speech Recognition API is not supported in this browser.");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.continuous = true;
//     recognition.interimResults = true;
//     recognition.lang = "en-US";

//     if (SpeechGrammarList) {
//       const grammarList = new SpeechGrammarList();
//       const grammar =
//         "#JSGF V1.0; grammar colors; public <color> = red | blue | green | yellow | black | white ;";
//       grammarList.addFromString(grammar, 1);
//       recognition.grammars = grammarList;
//     }

//     recognition.onresult = (event: any) => {
//       let interimTranscript = "";
//       for (let i = event.resultIndex; i < event.results.length; i++) {
//         if (event.results[i].isFinal) {
//           setTranscript((prev) => prev + event.results[i][0].transcript);
//           updateState(event.results[i][0].transcript);
//         } else {
//           interimTranscript += event.results[i][0].transcript;
//         }
//       }
//     };

//     recognition.onerror = (event: any) => {
//       console.error("Speech recognition error: ", event.error);
//     };

//     // recognizRef.current = recognition;

//     return () => {
//       recognition.stop();
//     };
//   }, []);
