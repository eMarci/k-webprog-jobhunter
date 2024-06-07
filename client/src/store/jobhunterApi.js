import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const filteredJobsUrl = (base, { min, max, id, company, position, type, city, homeOffice }) => {
  let url = base + '?';
  if (min !== undefined) {
    url += `salaryFrom[$gt]=${ min }&`;
  }
  if (max !== undefined) {
    url += `salaryTo[$lt]=${ max }&`;
  }
  if (id !== undefined) {
    url += `id=${ id }&`;
  }
  if (position !== undefined) {
    url += `position=${ position }&`;
  }
  if (company !== undefined) {
    url += `company=${ company }&`
  }
  if (type !== undefined) {
    url += `type=${ type }&`;
  }
  if (city !== undefined) {
    url += `city=${ city }&`;
  }
  if (homeOffice !== undefined) {
    url += `homeOffice=${ homeOffice === 1 ? 'true' : 'false' }&`
  }
  return url;
};

const baseUrl = 'http://localhost:3030';
export const jobhunterApi = createApi({
  reducerPath: 'jobhunterApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.auth?.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${ token }`);
      }
    }
  }),
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
      query: (userId) => `users/${ userId }`,
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
        url: `experiences/${ expId }`,
        method: 'PATCH',
        body: body
      }),
    }),
    delExp: builder.mutation({
      query: (expId) => ({
        url: `experiences/${ expId }`,
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
    getJobs: builder.query({
      query: ({ min, max, id, company, position, type, city, homeOffice }) =>
        filteredJobsUrl('jobs',
          { min, max, id, company, position, type, city, homeOffice })
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
        url: `jobs/${ jobId }`,
        method: 'PATCH',
        body: { company, position, description, salaryFrom, salaryTo, type, city, homeOffice },
      }),
    }),
    delJob: builder.mutation({
      query: (jobId) => ({
        url: `jobs/${ jobId }`,
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
      query: (jobId) => ({
        url: 'applicants',
        method: 'POST',
        body: { jobId },
      })
    }),
    removeFromJob: builder.mutation({
      query: (jobId) => ({
        url: `applicants?jobId=${ jobId }`,
        method: 'DELETE',
      })
    }),
    getApplicantsForJob: builder.query({
      query: (jobId) => `applicants?jobId=${ jobId }`,
    }),
    getUserApplications: builder.query({
      query: (userId) => `applicants?userId=${ userId }`,
    })
  }),
});

export const {
  useRegisterUserMutation,
  useAuthUserMutation,
  useGetUserInfoQuery,
  useGetUserExpQuery,
  useAddExpMutation,
  useAddExpsMutation,
  useModifyExpMutation,
  useDelExpMutation,
  useDelAllExpMutation,
  useGetAllJobsQuery,
  useGetJobsQuery,
  useCreateJobMutation,
  useModifyJobMutation,
  useDelJobMutation,
  useDelAllJobsMutation,
  useApplyForJobMutation,
  useRemoveFromJobMutation,
  useGetApplicantsForJobQuery,
  useGetUserApplicationsQuery,
} = jobhunterApi;