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
                .Courses.Where(c => c.Id == request.Id && c.IsPublished)
                .Include(c => c.Chapters.Where(ch => ch.IsPublished).OrderBy(ch => ch.Position))
                .ThenInclude(ch => ch.Video)
                .Include(c => c.Chapters.Where(ch => ch.IsPublished).OrderBy(ch => ch.Position))
                .ThenInclude(ch => ch.UserProgresses.Where(up => up.UserId == _user.Id))
                .Include(c => c.Attachments.OrderBy(a => a.Name))
                .Include(c => c.Purchases.Where(p => p.UserId == _user.Id))
                .AsSplitQuery()
                .SingleOrDefaultAsync(cancellationToken: cancellationToken);

            Helper.AssertIsNotNull(course, "Course not found");

            return Result<CourseDto>.Success(_mapper.Map<CourseDto>(course));
        }
    }
}
