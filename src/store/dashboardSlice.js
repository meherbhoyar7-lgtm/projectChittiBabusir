import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: 120,
  cpu: 45,
  errors: 3,
  memory: 50,
  network: 30,
  history: [],   
  theme: "light"
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    updateMetrics: (state) => {
      state.users = Math.floor(Math.random() * 1000);
      state.cpu = Math.floor(Math.random() * 100);
      state.errors = Math.floor(Math.random() * 10);
      state.memory = Math.floor(Math.random() * 100);
      state.network = Math.floor(Math.random() * 100);

      state.history.push({
        timestamp: Date.now(),   
        users: state.users,
        cpu: state.cpu,
        memory: state.memory,
        network: state.network,
        errors: state.errors,    
      });

      
      if (state.history.length > 20) {
        state.history.shift();
      }
    },

    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { updateMetrics, toggleTheme } = dashboardSlice.actions;
export default dashboardSlice.reducer;