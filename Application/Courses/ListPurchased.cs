using Application.Common;
using Application.Common.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Courses;

public class ListPurchased
{
    public class Query : IRequest<Result<List<CourseDto>>> { }

    public class Handler : IRequestHandler<Query, Result<List<CourseDto>>>
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

        public async Task<Result<List<CourseDto>>> Handle(
            Query request,
            CancellationToken cancellationToken
        )
        {
            var courses = await _dataContext
                .Courses.Where(course => course.IsPublished)
                .Include(course =>
                    course.Chapters.Where(c => c.IsPublished).OrderBy(c => c.Position)
                )
                .ThenInclude(chapter => chapter.UserProgresses.Where(u => u.UserId == _user.Id))
                .Include(course => course.Attachments.OrderBy(a => a.Name))
                .Include(course => course.Category)
                .Include(course => course.Purchases.Where(p => p.UserId == _user.Id))
                .Where(c => c.Purchases.Any())
                .AsSingleQuery()
                .OrderBy(course => course.Title)
                .ToListAsync(cancellationToken: cancellationToken);

            return Result<List<CourseDto>>.Success(_mapper.Map<List<CourseDto>>(courses));
        }
    }
}
