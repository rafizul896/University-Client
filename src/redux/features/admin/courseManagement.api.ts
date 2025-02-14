import { baseApi } from "@/redux/api/baseApi";
import {  TResponseRedux, TSemester } from "@/types";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addRegisteredSemester: builder.mutation({
      query: (data) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: data,
      }),
    }),
    getAllRegisteredSemester: builder.query({
      query: () => ({
        url: "/semester-registrations",
        method: "GET",
      }),
      transformResponse: (responce: TResponseRedux<TSemester[]>) => {
        return {
          data: responce.data,
          meta: responce.meta,
        };
      },
    }),
  }),
});

export const {
  useAddRegisteredSemesterMutation,
  useGetAllRegisteredSemesterQuery,
} = courseManagementApi;
