import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../main';

const ReportView = () => {
    // const {user} = useContext(Context);
  const { reportId } = useParams();
  const [report, setReport] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (!reportId) return;
  setLoading(true);
  fetchReport(reportId);
}, [reportId]);


  const fetchReport = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/v1/report/getreport/${id}`,
      { withCredentials: true }
    );
    setReport(response.data.report[0]);
  } catch (error) {
    console.error("Error fetching report:", error);
  } finally {
    setLoading(false);
  }
};


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-lg">Loading report...</div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-lg text-red-600">Report not found</div>
      </div>
    );
  }

  console.log('Report on the view Page: ',report)

  return (
    <div className="min-h-screen bg-gray-100 py-8 pt-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Header */}
          <div className="border-b border-gray-200 pb-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{report.reportName}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span>Report Date: {new Date(report.createdAt).toLocaleDateString()}</span>
              <span>Follow-up Date: {new Date(report.followUpDate).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Patient & Doctor Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Patient Information</h3>
              <p className="text-blue-800">{report.patientId?.firstName} {report.patientId?.lastName}</p>
              <p className="text-blue-700 text-sm">{report.patientId?.email}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Doctor Information</h3>
              <p className="text-green-800">Dr. {report.doctorId?.firstName} {report.doctorId?.lastName}</p>
              <p className="text-green-700 text-sm">{report.doctorId?.doctorDepartment}</p>
            </div>
          </div>

          {/* Medical Details */}
          <div className="space-y-6">
            {/* Diagnosis */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Diagnosis</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-800">{report.diagnosis}</p>
              </div>
            </div>

            {/* Symptoms */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Symptoms</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                {report.symptoms && report.symptoms.length > 0 ? (
                  <ul className="list-disc list-inside space-y-1">
                    {report.symptoms.map((symptom, index) => (
                      <li key={index} className="text-gray-800">{symptom}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic">No symptoms recorded</p>
                )}
              </div>
            </div>

            {/* Observations */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Clinical Observations</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-800">{report.observations}</p>
              </div>
            </div>

            {/* Remarks */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Remarks & Recommendations</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-800">{report.remarks}</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Generated on: {new Date(report.createdAt).toLocaleString()}
              </div>
              <button 
                onClick={() => window.print()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                Print Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportView;