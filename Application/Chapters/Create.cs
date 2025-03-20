using Application.Common;
using Application.Common.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Chapters;

public class Create
{
    public class Command : IRequest<Result<ChapterDto>>
    {
        public required Guid CourseId { get; set; }
        public required string Title { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<ChapterDto>>
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

        public async Task<Result<ChapterDto>> Handle(
            Command request,
            CancellationToken cancellationToken
        )
        {
            var course = await _dataContext
                .Courses.Include(course => course.Chapters)
                .SingleOrDefaultAsync(
                    course => course.Id == request.CourseId,
                    cancellationToken: cancellationToken
                );

            Helper.AssertIsNotNull(course, "Course not found");
            Helper.AssertIsOwner(course!, _user.Id!);

            var chaptersCount = course!.Chapters.Count;

            var chapter = new Chapter
            {
                Id = Guid.NewGuid(),
                Title = request.Title,
                Position = chaptersCount,
                Course = course,
            };
            _dataContext.Chapters.Add(chapter);

            try
            {
                await _dataContext.SaveChangesAsync(cancellationToken);
                return Result<ChapterDto>.Success(_mapper.Map<ChapterDto>(chapter));
            }
            catch (Exception)
            {
                return Result<ChapterDto>.Failure("Unable to create the Chapter");
            }
        }
    }
}
