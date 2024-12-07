"use client";

import { Card } from "@/components/ui/card";
import { Activity, Clock, Pill, Stethoscope } from "lucide-react";

export default function PreviewPrescription({
  prescriptionRef,
  formatedPrescription,
}: {
  prescriptionRef: any;
  formatedPrescription: any;
}) {
  return (
    <div className="min-h-screen print-content">
      <Card
        className="mx-auto max-w-[800px] print:border-none bg-white p-8 print:p-0 print:shadow-none"
        ref={prescriptionRef}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-teal-500 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-teal-700">
              Dr. Anik Rahman
            </h1>
            <p className="text-lg font-medium text-teal-600">
              MBBS, FCPS (Medicine)
            </p>
            <p className="text-md text-teal-500">Medicine Specialist</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Reg. No: 12345</p>
            <p className="text-sm text-gray-500">Contact: +880 1234567890</p>
            <p className="text-sm text-gray-500">Email: dr.anik@example.com</p>
          </div>
        </div>

        {/* Patient Info */}
        <div className="mt-3 grid grid-cols-3 gap-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">Patient Name</p>
            <p className="text-[16px] font-semibold text-gray-800">
              Mohammad Karim
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">Age/Gender</p>
            <p className="text-[16px] font-semibold text-gray-800">45/Male</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">Date</p>
            <p className="text-[16px] font-semibold text-gray-800">
              04 Dec, 2023
            </p>
          </div>
        </div>

        {/* Symptoms & Observations */}
        <div className="mt-3 grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-orange-50 p-4">
            <h3 className="flex items-center text-[16px] font-semibold text-orange-700">
              <Activity className="mr-2 h-5 w-5" />
              লক্ষণ
            </h3>
            <ul className="mt-2 list-inside flex gap-2 text-sm text-orange-800">
              {formatedPrescription?.symptoms.map((item: string, i: number) => (
                <>
                  <li>{item} </li>{" "}
                  {i < formatedPrescription?.symptoms.length - 1 && (
                    <span>+</span>
                  )}
                </>
              ))}
            </ul>
          </div>

          <div className="rounded-lg bg-blue-50 p-4">
            <h3 className="flex items-center text-[16px] font-semibold text-blue-700">
              <Stethoscope className="mr-2 h-5 w-5" />
              পর্যবেক্ষণ
            </h3>

            <p className="mt-2 text-sm text-blue-800">
              {formatedPrescription?.observation}
            </p>
          </div>

          <div className="rounded-lg bg-purple-50 p-4">
            <h3 className="flex items-center text-[16px]  font-semibold text-purple-700">
              <Activity className="mr-2 h-5 w-5" />
              পরীক্ষা
            </h3>
            {formatedPrescription?.test?.map((item: string) => (
              <p className="mt-2 text-sm text-purple-800">{item}</p>
            ))}
          </div>
        </div>

        {/* Medications */}
        <div className="mt-8">
          <h3 className="mb-4 flex items-center text-[16px] text-xl font-semibold text-gray-800">
            <Pill className="mr-2 h-6 w-6 text-teal-600" />
            ঔষধ
          </h3>
          <div className="space-y-4">
            {formatedPrescription?.medicine?.map((item: any) => (
              <div className="rounded-lg border-l-4 border-teal-500 bg-white p-4 shadow-sm">
                <h4 className="font-medium text-teal-700">{item.name}</h4>
                <p className="mt-1 text-sm text-gray-600">
                  {item.dosage} - {item.instructions} - {item.duration}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Follow Up */}
        <div className="mt-8 rounded-lg bg-teal-50 p-4">
          <h3 className="flex items-center font-semibold text-teal-700">
            <Clock className="mr-2 h-5 w-5" />
            ফলো-আপ - ১ মাস পর
          </h3>
        </div>

        {/* Footer */}
        <div className="mt-12 flex justify-end border-t pt-8">
          <div className="text-right">
            <div className="mb-2 h-12 w-40 border-b-2 border-teal-500"></div>
            <p className="text-sm font-medium text-gray-700">
              Doctor&apos;s Signature
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
