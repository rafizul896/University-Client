import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam, TResponseRedux, TStudent } from "@/types";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addAStudent: builder.mutation({
      query: (data) => {
        return {
          url: "/users/create-student",
          method: "POST",
          body: data,
        };
      },
    }),
    getAllStudents: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/students",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
  }),
});

export const { useAddAStudentMutation, useGetAllStudentsQuery } =
  userManagementApi;
