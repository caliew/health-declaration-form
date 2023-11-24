import React from 'react';
import { connect } from 'react-redux';
import HealthDeclarationForm from './HealthDeclarationForm';
import HealthDeclarationTable from './HealthDeclarationTable';
import { addFormData } from './redux/actions';
import './App.css';

const App = ({ formDataList, addFormData }) => {
  return (
    <div className='form-container'>
      <h1>My Health Declaration App</h1>
      <HealthDeclarationForm onSubmit={addFormData} />
      <HealthDeclarationTable data={formDataList} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  formDataList: state.formDataList,
});

const mapDispatchToProps = {
  addFormData,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
