import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
  isLoading: false,
  error: false,
};
export const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    getEmployee: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    getEmployeeSuccess: (state, action) => {
      state.employees = action.payload;
      state.isLoading = false;
      state.error = false;
    },
    addEmployeeSuccess: (state, action) => {
      state.employees.push(action.payload);
      state.isLoading = false;
      state.error = false;
    },
    getEmployeeFailure: (state) => {
      state.error = true;
      state.isLoading = false;
    },
    deleteEmployeeStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    deleteEmployeeSuccess: (state, action) => {
      state.isLoading = false;
      const userId = action.payload;
      const deleted = state.employees.filter(
        (user: { _id: string }) => user._id !== userId
      );
      state.employees = deleted;
    },
    deleteEmployeeFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    giveAdminPrivilege: (state, action) => {
      const otherEmployees = state.employees.filter(
        (employee) => employee._id !== action.payload
      );
      const updateEmployee = state.employees.find(
        (employee: { _id: string }) => employee._id === action.payload
      );

      if (updateEmployee) {
        updateEmployee.isAdmin = true;
      }
      [...otherEmployees, updateEmployee];
    },
    removeAdminPrivilege: (state, action) => {
      const otherEmployees = state.employees.filter(
        (employee) => employee._id !== action.payload
      );
      const updateEmployee = state.employees.find(
        (employee: { _id: string }) => employee._id === action.payload
      );
      if (updateEmployee) {
        updateEmployee.isAdmin = false;
      }
      [...otherEmployees, updateEmployee];
    },
  },
});

export const {
  deleteEmployeeStart,
  deleteEmployeeSuccess,
  deleteEmployeeFailure,
  getEmployee,
  getEmployeeSuccess,
  getEmployeeFailure,
  addEmployeeSuccess,
  giveAdminPrivilege,
  removeAdminPrivilege,
} = employeeSlice.actions;
export default employeeSlice.reducer;
