import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
  singleEmployee: [],
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
    addEmployeeStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    addEmployeeSuccess: (state, action) => {
      state.employees.push(action.payload);
      state.isLoading = false;
      state.error = false;
    },
    addEmployeeFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    getSingleEmployee: (state, action) => {
      state.singleEmployee = action.payload;
      state.isLoading = false;
      state.error = false;
    },

    disableEmployee: (state, action) => {
      state.isLoading = false;
      const userId = action.payload;
      const disbaled = state.employees.filter(
        (user: { _id: string }) => user._id !== userId
      );
      state.employees = disbaled;
    },

    // giveModeratorPrivilege: (state, action) => {
    //   const otherEmployees = state.employees.filter(
    //     (employee) => employee._id !== action.payload
    //   );
    //   const updateEmployee = state.employees.find(
    //     (employee: { _id: string }) => employee._id === action.payload
    //   );

    //   if (updateEmployee) {
    //     updateEmployee.role = "moderator";
    //   }
    //   [...otherEmployees, updateEmployee];
    // },
    // removeModeratorPrivilege: (state, action) => {
    //   const otherEmployees = state.employees.filter(
    //     (employee) => employee._id !== action.payload
    //   );
    //   const updateEmployee = state.employees.find(
    //     (employee: { _id: string }) => employee._id === action.payload
    //   );
    //   if (updateEmployee) {
    //     updateEmployee.role = "staff";
    //   }
    //   [...otherEmployees, updateEmployee];
    // },
  },
});

export const {
  disableEmployee,
  getEmployee,
  getSingleEmployee,
  getEmployeeSuccess,
  addEmployeeSuccess,
  addEmployeeStart,
  addEmployeeFailure,
} = employeeSlice.actions;
export default employeeSlice.reducer;
