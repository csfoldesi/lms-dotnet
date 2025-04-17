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
                .Purchases.Where(p => p.UserId == _user.Id)
                .Include(p => p.Course)
                .ThenInclude(c => c.Chapters.Where(ch => ch.IsPublished))
                .ThenInclude(ch => ch.UserProgresses.Where(p => p.UserId == _user.Id))
                .Select(x => x.Course)
                .OrderBy(course => course.Title)
                .ToListAsync(cancellationToken: cancellationToken);

            return Result<List<CourseDto>>.Success(_mapper.Map<List<CourseDto>>(courses));
        }
    }
}
