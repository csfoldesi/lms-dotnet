using Application.Common;
using Application.Common.Interfaces;
using AutoMapper;
using Domain;
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

        public Handler(IDataContext dataContext, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }

        public async Task<Result<CourseDto>> Handle(
            Query request,
            CancellationToken cancellationToken
        )
        {
            var course = await _dataContext
                .Courses.Include(course => course.Chapters)
                .SingleOrDefaultAsync(
                    course => course.Id == request.Id,
                    cancellationToken: cancellationToken
                );

            if (course == null)
            {
                return Result<CourseDto>.NotFound();
            }

            return Result<CourseDto>.Success(_mapper.Map<Course, CourseDto>(course));
        }
    }
}
