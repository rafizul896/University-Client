import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam, TResponseRedux } from "@/types";
import {
  TAcademicDepartment,
  TAcademicFaculty,
  TAcademicSemester,
} from "@/types/academicManagement.type";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
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
    getAcademicFaculty: builder.query({
      query: () => ({
        url: "/academic-faculties",
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addAcademicFaculty: builder.mutation({
      query: (body) => ({
        url: "/academic-faculties/create-academic-faculty",
        method: "POST",
        body,
      }),
    }),
    getAcademicDepartments: builder.query({
      query: () => ({
        url: "/academic-departments",
        method: "GET",
      }),
      transformResponse: (responce: TResponseRedux<TAcademicDepartment[]>) => {
        return {
          data: responce.data,
          meta: responce.meta,
        };
      },
    }),
    addAcademicDepartment: builder.mutation({
      query: (body) => ({
        url: "/academic-departments/create-academic-department",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetAllSemestersQuery,
  useAddAcademicSemesterMutation,
  useGetAcademicFacultyQuery,
  useAddAcademicFacultyMutation,
  useGetAcademicDepartmentsQuery,
  useAddAcademicDepartmentMutation,
} = academicManagementApi;
