using Application.Common;
using Application.Common.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Courses;

public class Get
{
    public class Query : IRequest<Result<CourseDto>>
    {
        public required Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<CourseDto>>
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
            Query request,
            CancellationToken cancellationToken
        )
        {
            var course = await _dataContext
                .Courses.Include(course =>
                    course.Chapters.Where(c => c.IsPublished).OrderBy(chapter => chapter.Position)
                )
                .ThenInclude(chapter => chapter.UserProgresses.Where(u => u.UserId == _user.Id))
                .Include(course => course.Attachments.OrderBy(a => a.Name))
                .Include(course => course.Purchases.Where(p => p.UserId == _user.Id))
                .AsSingleQuery()
                .SingleOrDefaultAsync(
                    c => c.Id == request.Id && c.IsPublished,
                    cancellationToken: cancellationToken
                );

            Helper.AssertIsNotNull(course, "Course not found");

            return Result<CourseDto>.Success(_mapper.Map<CourseDto>(course));
        }
    }
}
