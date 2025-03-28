using Application.Categories;
using Application.Chapters;
using Application.Courses;
using Domain;

namespace Application.Common;

public class MappingProfiles : AutoMapper.Profile
{
    public MappingProfiles()
    {
        CreateMap<Course, CourseDto>()
            .ForMember(
                dest => dest.Category,
                opt => opt.MapFrom(src => src.Category != null ? src.Category.Name : null)
            )
            .ForMember(dest => dest.IsPurchased, opt => opt.MapFrom(src => src.Purchases.Count > 0))
            .AfterMap((src, dest) => MapUserProgress(src, dest));

        CreateMap<Courses.Modify.Command, Course>()
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

        CreateMap<Chapter, ChapterDto>()
            .ForMember(
                dest => dest.IsCompleted,
                opt => opt.MapFrom(src => src.UserProgresses.Any(u => u.IsCompleted))
            );

        CreateMap<Attachment, AttachmentDto>();

        CreateMap<Chapters.Modify.Command, Chapter>()
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
    }

    private static void MapUserProgress(Course course, CourseDto dto)
    {
        if (course.Chapters.Count == 0)
        {
            dto.UserProgress = 0;
        }
        else
        {
            int completedChapters = course.Chapters.Count(ch =>
                ch.UserProgresses.Any(u => u.IsCompleted)
            );
            dto.UserProgress = (int)
                Math.Ceiling((float)completedChapters * 100 / course.Chapters.Count);
        }
    }
}
