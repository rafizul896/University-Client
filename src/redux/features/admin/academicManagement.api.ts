import { baseApi } from "@/redux/api/baseApi";
import { TResponseRedux } from "@/types";
import { TAcademicSemester } from "@/types/academicManagement.type";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if(args){
          args.forEach((item) => {
            params.append(item.name,item.value)
          })
        }
        
        return {
          url: "/academic-semesters",
          method: "GET",
          params,
        };
      },
      transformResponse: (responce: TResponseRedux<TAcademicSemester[]>) => {
        return { data: responce.data, meta: responce.meta };
      },
    }),
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllSemestersQuery, useAddAcademicSemesterMutation } =
  academicManagementApi;
