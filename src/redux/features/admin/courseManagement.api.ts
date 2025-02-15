import { baseApi } from "@/redux/api/baseApi";
import { TCourse, TResponseRedux, TSemester } from "@/types";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // semesterRegistration related
    addRegisteredSemester: builder.mutation({
      query: (data) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["semester"],
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
      providesTags: ["semester"],
    }),
    updateRegisteredSemester: builder.mutation({
      query: (args) => ({
        url: `/semester-registrations/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["semester"],
    }),
    // courses
    getAllCourses: builder.query({
      query: () => ({
        url: "/courses",
        method: "GET",
      }),
      transformResponse: (responce: TResponseRedux<TCourse[]>) => {
        return {
          data: responce.data,
          meta: responce.meta,
        };
      },
      providesTags: ["course"],
    }),
    addCourse: builder.mutation({
      query: (data) => ({
        url: "/courses/create-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["course"],
    }),
  }),
});

export const {
  useAddRegisteredSemesterMutation,
  useGetAllRegisteredSemesterQuery,
  useUpdateRegisteredSemesterMutation,
  useGetAllCoursesQuery,
  useAddCourseMutation,
} = courseManagementApi;
