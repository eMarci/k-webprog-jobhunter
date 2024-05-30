import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = 'http://localhost:3030';
export const jobhunterApi = createApi({
  reducerPath: 'jobhunterApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: ({ email, password, fullname, role }) => ({
        url: 'users',
        method: 'POST',
        body: { email, password, fullname, role },
      }),
    }),
    authUser: builder.mutation({
      query: ({ email, password }) => ({
        url: 'authentication',
        method: 'POST',
        body: { email, password, strategy: 'local' },
      }),
    }),
    getUserInfo: builder.query({
      query: (userId) => `users/${userId}`,
    }),
    getUserExp: builder.query({
      query: () => 'experiences',
    }),
    addExp: builder.mutation({
      query: ({ company, title, interval }) => ({
        url: 'experiences',
        method: 'POST',
        body: { company, title, interval },
      }),
    }),
    addExps: builder.mutation({
      query: (exps) => ({
        url: 'experiences',
        method: 'POST',
        body: exps,
      }),
    }),
    modifyExp: builder.mutation({
      query: ({ expId, body }) => ({
        url: `experiences/${expId}`,
        method: 'PATCH',
        body: body
      }),
    }),
    delExp: builder.mutation({
      query: (expId) => ({
        url: `experiences/${expId}`,
        method: 'DELETE',
      }),
    }),
    delAllExp: builder.mutation({
      query: () => ({
        url: 'experiences',
        method: 'DELETE',
      })
    }),
    getAllJobs: builder.query({
      query: () => 'jobs',
    }),
    createJob: builder.mutation({
      query: ({ company, position, description, salaryFrom, salaryTo, type, city, homeOffice }) => ({
        url: `jobs/0`,
        method: 'POST',
        body: { company, position, description, salaryFrom, salaryTo, type, city, homeOffice },
      }),
    }),
    modifyJob: builder.mutation({
      query: ({ jobId, company, position, description, salaryFrom, salaryTo, type, city, homeOffice }) => ({
        url: `jobs/${jobId}`,
        method: 'PATCH',
        body: { company, position, description, salaryFrom, salaryTo, type, city, homeOffice },
      }),
    }),
    delJob: builder.mutation({
      query: (jobId) => ({
        url: `jobs/${jobId}`,
        method: 'DELETE',
      })
    }),
    delAllJobs: builder.mutation({
      query: () => ({
        url: `jobs`,
        method: 'DELETE',
      })
    }),
    applyForJob: builder.mutation({
      query: (jobId ) => ({
        url: 'applicants',
        method: 'POST',
        body: { jobId },
      })
    }),
    removeFromJob: builder.mutation({
      query: (jobId) => ({
        url: `applicants?jobId=${jobId}`,
        method: 'DELETE',
      })
    }),
    getApplicantsForJob: builder.query({
      query: (jobId) => `applicants?jobId=${jobId}`,
    }),
    getUserApplications: builder.query({
      query: (userId) => `applicants?userId=${userId}`,
    })
  }),
});
