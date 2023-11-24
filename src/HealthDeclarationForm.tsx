// src/HealthDeclarationForm.tsx
import React from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';

// Define the interface for form values
interface FormValues {
  name: string;
  temperature: string;
  symptoms: string[];
  contactWithCovid: boolean;
}

// Define the interface for component props
interface HealthDeclarationFormProps {
  onSubmit: (values: FormValues, helpers: FormikHelpers<FormValues>) => void;
}

const HealthDeclarationForm: React.FC<HealthDeclarationFormProps> = ({ onSubmit }) => {
  // Define initial form values
  const initialValues: FormValues = {
    name: '',
    temperature: '',
    symptoms: [],
    contactWithCovid: false,
  };

  // Define validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    temperature: Yup.string().required('Temperature is required'),
    symptoms: Yup.array().required('At least one symptom must be selected'),
  });

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <label>
          Name:
          <Field type="text" name="name" className="input-Name" />
          <ErrorMessage name="name" component="div" className="error-message" />
        </label>
        <label>
          Temperature:
          <Field
            type="text"
            name="temperature"
            className="input-Temp"
          />
          <ErrorMessage name="temperature" component="div" className="error-message" />
        </label>
        <label className="Symptoms">
          Symptoms:
          <div className="Symptoms">
            {['Cough', 'Smell/Test Impairment', 'Fever', 'Breathing Difficulties', 'Body Aches', 'Headaches', 'Fatigue', 'Sore Throat', 'Diarrhea', 'Runny Nose'].map(
              (symptom) => (
                <label className="checkbox-label" key={symptom}>
                  <Field type="checkbox" name="symptoms" className="input-Symptom" value={symptom} />
                  {symptom}
                </label>
              )
            )}
            <ErrorMessage name="symptoms" component="div" />
          </div>
        </label>
        <label>
          Have you been in contact with anyone suspected to have/have been diagnosed with Covid-19 within the last 14 days?
          <Field type="checkbox" name="contactWithCovid" className="input-Symptom" />
        </label>
        <br />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default HealthDeclarationForm;
