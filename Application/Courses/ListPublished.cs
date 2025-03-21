using Application.Common;
using Application.Common.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Courses;

public class ListPublished
{
    public class Query : IRequest<Result<List<CourseDto>>>
    {
        public Guid? CategoryId { get; set; }
        public string? Title { get; set; }
    }

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
            var query = _dataContext
                .Courses.Where(course => course.IsPublished)
                .Include(course => course.Chapters.OrderBy(chapter => chapter.Position))
                .ThenInclude(chapter => chapter.UserProgresses.Where(u => u.UserId == _user.Id))
                .Include(course => course.Attachments.OrderBy(a => a.Name))
                .Include(course => course.Category)
                .Include(course => course.Purchases.Where(p => p.UserId == _user.Id))
                .AsSingleQuery()
                .OrderBy(course => course.Title);
            if (request.CategoryId != null)
            {
                query =
                    (IOrderedQueryable<Domain.Course>)
                        query.Where(c => c.CategoryId == request.CategoryId);
            }
            if (request.Title != null)
            {
                query =
                    (IOrderedQueryable<Domain.Course>)
                        query.Where(c => c.Title.Contains(request.Title));
            }

            var courses = await query.ToListAsync(cancellationToken: cancellationToken);

            return Result<List<CourseDto>>.Success(_mapper.Map<List<CourseDto>>(courses));
        }
    }
}
