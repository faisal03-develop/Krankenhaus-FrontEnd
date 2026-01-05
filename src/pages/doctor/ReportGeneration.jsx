import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const ReportGeneration = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    reportName: '',
    diagnosis: '',
    symptoms: [''],
    observations: '',
    followUpDate: '',
    remarks: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSymptomChange = (index, value) => {
    const newSymptoms = [...formData.symptoms];
    newSymptoms[index] = value;
    setFormData({ ...formData, symptoms: newSymptoms });
  };

  const addSymptom = () => {
    setFormData({ ...formData, symptoms: [...formData.symptoms, ''] });
  };

  const removeSymptom = (index) => {
    const newSymptoms = formData.symptoms.filter((_, i) => i !== index);
    setFormData({ ...formData, symptoms: newSymptoms });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/report/createreport/${appointmentId}`,
        formData,
        { withCredentials: true }
      );
      
      toast.success('Report created successfully');
      navigate('/doctor/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 pt-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Generate Medical Report</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Name *
              </label>
              <input
                type="text"
                name="reportName"
                value={formData.reportName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter report name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Diagnosis *
              </label>
              <textarea
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleInputChange}
                required
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter diagnosis details"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Symptoms *
              </label>
              {formData.symptoms.map((symptom, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={symptom}
                    onChange={(e) => handleSymptomChange(index, e.target.value)}
                    required
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Symptom ${index + 1}`}
                  />
                  {formData.symptoms.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSymptom(index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addSymptom}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Add Symptom
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Observations *
              </label>
              <textarea
                name="observations"
                value={formData.observations}
                onChange={handleInputChange}
                required
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter clinical observations"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Follow-up Date *
              </label>
              <input
                type="date"
                name="followUpDate"
                value={formData.followUpDate}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Remarks *
              </label>
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleInputChange}
                required
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Additional remarks or recommendations"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 px-4 rounded-md font-medium transition-colors"
              >
                {loading ? 'Creating Report...' : 'Create Report'}
              </button>
              
              <button
                type="button"
                onClick={() => navigate('/doctor/dashboard')}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportGeneration;