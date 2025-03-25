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
                x => x.Category,
                ex => ex.MapFrom(c => c.Category != null ? c.Category.Name : null)
            )
            .ForMember(x => x.IsPurchased, ex => ex.MapFrom(c => c.Purchases.Count > 0))
            .ForMember(
                x => x.UserProgress,
                ex =>
                    ex.MapFrom(c =>
                        Math.Ceiling(
                            (float)c.Chapters.Count(ch => ch.UserProgresses.Any(u => u.IsCompleted))
                                * 100
                                / c.Chapters.Count
                        )
                    )
            );

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
                x => x.IsCompleted,
                ex => ex.MapFrom(c => c.UserProgresses.Any(u => u.IsCompleted))
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
}
