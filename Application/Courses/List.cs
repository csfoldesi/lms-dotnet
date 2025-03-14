using Application.Common;
using Application.Common.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Courses;

public class List
{
    public class Query : IRequest<Result<List<CourseDto>>> { }

    public class Handler : IRequestHandler<Query, Result<List<CourseDto>>>
    {
        private readonly IDataContext _dataContext;
        private readonly IMapper _mapper;

        public Handler(IDataContext dataContext, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }

        public async Task<Result<List<CourseDto>>> Handle(
            Query request,
            CancellationToken cancellationToken
        )
        {
            var courses = await _dataContext
                .Courses.Include(course => course.Chapters.OrderBy(chapter => chapter.Position))
                .Include(course => course.Attachments.OrderBy(a => a.Name))
                .Include(course => course.Category)
                .AsSingleQuery()
                .OrderBy(course => course.Title)
                .ToListAsync(cancellationToken: cancellationToken);

            return Result<List<CourseDto>>.Success(_mapper.Map<List<CourseDto>>(courses));
        }
    }
}
