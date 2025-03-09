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

        public Handler(IDataContext dataContext, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
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
            if (course == null)
            {
                return Result<CourseDto>.NotFound("Course not found");
            }

            int positionIndex = 0;
            request.ChapterIdList.ForEach(chapterId =>
            {
                var chapter = course.Chapters.SingleOrDefault(chapter => chapter.Id == chapterId);
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
