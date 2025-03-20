using Application.Common;
using Application.Common.Interfaces;
using Application.Courses;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Chapters;

public class Reorder
{
    public class Command : IRequest<Result<CourseDto>>
    {
        public required Guid CourseID { get; set; }
        public required List<Guid> ChapterIdList { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<CourseDto>>
    {
        private readonly IDataContext _dataContext;
        private readonly IMapper _mapper;
        private readonly IUser _user;

        public Handler(IDataContext dataContext, IMapper mapper, IUser user)
        {
            _dataContext = dataContext;
            _mapper = mapper;
            _user = user;
        }

        public async Task<Result<CourseDto>> Handle(
            Command request,
            CancellationToken cancellationToken
        )
        {
            var course = await _dataContext
                .Courses.Include(course => course.Chapters)
                .SingleOrDefaultAsync(
                    course => course.Id == request.CourseID,
                    cancellationToken: cancellationToken
                );

            Helper.AssertIsNotNull(course, "Course not found");
            Helper.AssertIsOwner(course!, _user.Id!);

            int positionIndex = 0;
            request.ChapterIdList.ForEach(chapterId =>
            {
                var chapter = course!.Chapters.SingleOrDefault(chapter => chapter.Id == chapterId);
                if (chapter != null)
                {
                    chapter.Position = positionIndex;
                    positionIndex++;
                }
            });

            try
            {
                await _dataContext.SaveChangesAsync(cancellationToken);
                return Result<CourseDto>.Success(_mapper.Map<CourseDto>(course));
            }
            catch (Exception)
            {
                return Result<CourseDto>.Failure("Unable to reorder Chapters");
            }
        }
    }
}
