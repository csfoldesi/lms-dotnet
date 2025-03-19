using Application.Common;
using Application.Common.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Courses;

public class Unpublish
{
    public class Command : IRequest<Result<CourseDto>>
    {
        public required Guid Id { get; set; }
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
            var course = await _dataContext.Courses.SingleOrDefaultAsync(
                course => course.Id == request.Id,
                cancellationToken: cancellationToken
            );

            Helper.AssertIsNotNull(course, "Course not found");

            // TODO: handle existing purchases

            course!.IsPublished = false;

            try
            {
                await _dataContext.SaveChangesAsync(cancellationToken);
                return Result<CourseDto>.Success(_mapper.Map<Course, CourseDto>(course));
            }
            catch (Exception)
            {
                return Result<CourseDto>.Failure("Unable to unpublish the Course");
            }
        }
    }
}
