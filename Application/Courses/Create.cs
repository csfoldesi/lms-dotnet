using Application.Common;
using Application.Common.Interfaces;
using AutoMapper;
using Domain;
using MediatR;

namespace Application.Courses
{
    public class Create
    {
        public class Command : IRequest<Result<CourseDto>>
        {
            public required string UserId { get; set; }
            public required string Title { get; set; }
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
                var course = new Course
                {
                    Id = Guid.NewGuid(),
                    UserId = request.UserId,
                    Title = request.Title,
                };

                _dataContext.Courses.Add(course);

                try
                {
                    await _dataContext.SaveChangesAsync(cancellationToken);
                    return Result<CourseDto>.Success(_mapper.Map<Course, CourseDto>(course));
                }
                catch (Exception)
                {
                    return Result<CourseDto>.Failure("Unable to create the Message");
                }
            }
        }
    }
}
