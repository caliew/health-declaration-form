import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import HealthDeclarationForm from './HealthDeclarationForm';

describe('HealthDeclarationForm', () => {
  it('renders the Name field', () => {
    render(<HealthDeclarationForm onSubmit={() => {}} />);
    const nameField = screen.getByLabelText('Name:');
    expect(nameField).toBeInTheDocument();
  });

  it('renders the Temperature field', () => {
    render(<HealthDeclarationForm onSubmit={() => {}} />);
    const temperatureField = screen.getByLabelText('Temperature:');
    expect(temperatureField).toBeInTheDocument();
  });

  it('renders the Symptoms checkboxes', () => {
    render(<HealthDeclarationForm onSubmit={() => {}} />);
    const symptomCheckboxes = screen.getAllByRole('checkbox', { name: /Symptoms:/ });
    expect(symptomCheckboxes.length).toBeGreaterThan(0);
  });

  it('renders the Contact with Covid checkbox', () => {
    render(<HealthDeclarationForm onSubmit={() => {}} />);
    const contactWithCovidCheckbox = screen.getByLabelText(/Have you been in contact with anyone suspected to have\/have been diagnosed with Covid-19 within the last 14 days?/);
    expect(contactWithCovidCheckbox).toBeInTheDocument();
  });
  

  it('submits the form with valid data', async () => {
    const onSubmitMock = jest.fn();

    render(<HealthDeclarationForm onSubmit={onSubmitMock} />);

    // Fill out the form with valid data
    fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'Liew Choan Ann' } });
    fireEvent.change(screen.getByLabelText('Temperature:'), { target: { value: '28' } });
    fireEvent.click(screen.getByLabelText('Fever'));

    // Log the form values for debugging
    console.log('Name value:', screen.getByLabelText('Name:').getAttribute('value'));
    console.log('Temperature value:', screen.getByLabelText('Temperature:').getAttribute('value'));
    console.log('Symptoms values:', [...screen.getAllByLabelText(/^Symptoms:/)].map(checkbox => checkbox.getAttribute('value')));
    console.log('Contact with Covid value:', (screen.getByLabelText('Have you been in contact with anyone suspected to have/have been diagnosed with Covid-19 within the last 14 days?') as HTMLInputElement).checked);

    // Submit the form
    fireEvent.click(screen.getByText('Submit'));

    // Wait for the form submission to complete
    await waitFor(() => {
      // Log the number of times onSubmitMock has been called
      console.log('onSubmitMock calls:', onSubmitMock.mock.calls.length);

      // Log the form values for debugging
      console.log('Form data:', onSubmitMock.mock.calls[0][0]);
      console.log('Form data arguments:', onSubmitMock.mock.calls[0][0]);

      // Assert that the onSubmit callback was called with the expected arguments
      expect(onSubmitMock).toHaveBeenCalledWith(
        { name: 'Liew Choan Ann', temperature: '28', symptoms: ['Fever'], contactWithCovid: false },
        expect.anything()
      );
    });

  });

  // Add more tests as needed
});
