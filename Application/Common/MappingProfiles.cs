using Application.Categories;
using Application.Chapters;
using Application.Courses;
using Domain;

namespace Application.Common;

public class MappingProfiles : AutoMapper.Profile
{
    public MappingProfiles()
    {
        CreateMap<Course, CourseDto>();
        CreateMap<Application.Courses.Modify.Command, Course>()
            .ForAllMembers(opts =>
                opts.Condition(
                    (src, dest, srcMember) =>
                        srcMember != null
                        && (
                            !srcMember.GetType().IsValueType
                            || !srcMember.Equals(Activator.CreateInstance(srcMember.GetType()))
                        )
                )
            );
        CreateMap<Category, CategoryDto>();
        CreateMap<Chapter, ChapterDto>();
    }
}
