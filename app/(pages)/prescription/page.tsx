"use client";
import { MicButton } from "@/app/(compponents)/mic-button";
import { MonitorCog, View } from "lucide-react";
import OpenAI from "openai";
import { useCallback, useEffect, useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "regenerator-runtime/runtime";

import Loader from "@/app/(compponents)/loader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import { useReactToPrint } from "react-to-print";
import PreviewPrescription from "./preview-prescription";
const defaultValue = JSON.parse(localStorage.getItem("text") ?? "{}");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function Page() {
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  console.log(Object.keys(defaultValue).length === 0 ? null : defaultValue);

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [formatedText, setFormatedText] = useState(defaultValue);
  const [warning, setWarning] = useState("");
  // Update the text when the transcript changes
  useEffect(() => {
    if (transcript) setText(transcript);
  }, [transcript]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // if (event.code === "Space" && !event.repeat) {
    //   SpeechRecognition.startListening({ continuous: true });
    // }
  }, []);

  //   const handleKeyUp = useCallback((event: KeyboardEvent) => {
  //     if (event.code === "Space") {
  //       SpeechRecognition.stopListening();
  //     }
  //   }, []);

  // Add/remove keydown and keyup listeners
  useEffect(() => {
    // window.addEventListener("keydown", handleKeyDown);
    // window.addEventListener("keyup", handleKeyUp);

    return () => {
      // window.removeEventListener("keydown", handleKeyDown);
      //   window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleMicClick = useCallback(async () => {
    if (text.length < 30) {
      return setWarning(
        "Prescription description must be at least 30 characters"
      );
    }
    try {
      setLoading(true);
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `you are a doctor,give a medical prescription based on provided input. Format the output as a JSON object exactly as shown below:
            {
              "symptoms": [
                "symptoms 1",
              ],
              "observation": "Write observations here. ",
              "test": [
                "test 1",
              ],
              "medicine": [
                {
                  "name": "medicine 1",
                  "dosage": "Dosage details like '1 + 0 + 1 (Morning and Night)'",
                  "instructions": "Instructions like 'After meal'",
                  "duration": "Duration like '15 Days'"
                }
              ],
              "followUp": "Write followUp date here or 'None'"
            }
      
            **Guidelines**:
            1. If any section (e.g., "test" , "medicine", "followUp","observation","symptoms") is not provided by input don't write anything from you, replace it with "None" or an empty array [].
            2. Translate the content into Bangladeshi language without medicine name.
            3. Do not generate extra text or commentary. Only return the JSON object.`,
          },
          {
            role: "user",
            content: `doctor input is: ${text}`,
          },
        ],
        max_tokens: 300,
        temperature: 0.2,
      });
      //   {
      //     "name": "Medicine 2",
      //     "dosage": "Dosage details like '0 + 0 + 1 (Night)'",
      //     "instructions": "Instructions like 'Before meal'",
      //     "duration": "Additional notes like 'Continue'"
      //   }
      if (completion.choices && completion.choices.length > 0) {
        let content = completion.choices[0].message?.content;
        if (content) {
          content = content.replace(/```json|```/g, "").trim();
          try {
            const response = JSON.parse(content);
            console.log(content);
            console.log(response);

            setFormatedText(response);
            localStorage.setItem("text", content);
            setLoading(false);
          } catch (error) {
            setLoading(false);
            console.error("Error parsing response as JSON:", error);
          }
        } else {
          setLoading(false);
          console.error("No content returned in the completion message.");
        }
      } else {
        setLoading(false);
        console.error("No choices returned in the completion.");
      }
    } catch (error) {
      setLoading(false);
    }
  }, [text]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);
    },
    []
  );

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  //   const [editorState, setEditorState] = useState(() =>
  //     EditorState.createEmpty()
  //   );

  const contentRef = useRef<HTMLElement>(null);

  // Function to handle printing
  const handlePrint = useReactToPrint({
    contentRef: contentRef,
    onAfterPrint: () => localStorage.removeItem("text"),
  });

  // Function to convert Draft.js content to HTML
  //   const getHTMLContent = () => {
  //     const contentState = editorState.getCurrentContent();
  //     const rawContent = convertToRaW(contentState);

  //     return rawContent.blocks
  //       .map((block) => (!block.text.trim() && "\n") || block.text)
  //       .join("\n");
  //   };

  return (
    <div className="h-screen dark:bg-slate-900 flex items-center">
      <div className="container max-w-[70%]">
        <div>
          <h1 className="md:text-7xl text-3xl lg:text-5xl font-bold text-center dark:text-slate-400 relative z-20">
            Voice Prescription
          </h1>
          <p className="text-sm text-center dark:text-slate-400 font-normal mx-auto mt-3 max-w-[400px]">
            {" "}
            Just press the space button and start speaking. The AI will generate
            a prescription based on your voice.
          </p>

          <textarea
            placeholder="Describe your patient present condition."
            onChange={handleChange}
            value={text}
            className="h-[350px]  focus:outline-none border-[1px] rounded-xl text-[20px] p-4 mt-10 w-full dark:bg-slate-950/50"
          ></textarea>
          <div className="dark:bg-slate-950 p-2 relative border-[1px] h-[60px] max-w-[500px] mx-auto rounded-full flex justify-between mt-10">
            <button
              className="px-8 py-2 disabled:bg-slate-600 disabled:select-none rounded-full relative bg-slate-900 text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200"
              onClick={handleMicClick}
              disabled={listening}
            >
              <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
              <span className="relative min-w-[100px] z-20 flex gap-1 items-center overflow-hidden">
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    <MonitorCog className=" mr-2" />
                    Generate
                  </>
                )}
              </span>
            </button>

            <div
              className={`${
                listening ? "scale-90" : ""
              } w-[100px] border-[1px] flex justify-center items-center h-[100px] bg-slate-900 -translate-x-1/2 -translate-y-1/2 shadow-2xl absolute top-1/2 left-1/2 rounded-full`}
            >
              <MicButton
                isRecording={listening}
                startListening={() =>
                  SpeechRecognition.startListening({ continuous: true })
                }
                SpeechRecognition={SpeechRecognition}
              />
            </div>

            <Modal>
              <ModalTrigger
                // disable={!formatedText || loading}
                className="px-8 items-center disabled:bg-slate-500 rounded-full relative bg-slate-900 text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200  flex justify-center group/modal-btn"
              >
                <span className="group-hover/modal-btn:translate-x-40 flex items-center gap-1 text-center transition duration-500">
                  <View /> Preview
                </span>
                <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                  ✈️
                </div>
              </ModalTrigger>
              <ModalBody className="p-0">
                <ModalContent className="overflow-auto p-0">
                  {/* <textarea
                    ref={contentRef}
                    name=""
                    id=""
                    value={localStorage.getItem("text") || ""}
                    className=" h-screen text-gray-800 p-6"
                  ></textarea> */}
                  <PreviewPrescription
                    formatedPrescription={formatedText}
                    prescriptionRef={contentRef}
                  />
                </ModalContent>
                <ModalFooter className="gap-4">
                  <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
                    Cancel
                  </button>
                  <button
                    onClick={() => handlePrint()}
                    className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28"
                  >
                    Print
                  </button>
                </ModalFooter>
              </ModalBody>
            </Modal>
          </div>
        </div>
      </div>
      <div className=" fixed bottom-10 right-10">
        {warning && (
          <Alert className=" bg-yellow-400 text-yellow-950">
            <AlertTitle> Warning </AlertTitle>
            <AlertDescription>{warning}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
