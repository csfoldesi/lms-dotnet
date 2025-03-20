using Application.Common;
using Application.Common.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Courses
{
    public class Modify
    {
        public class Command : IRequest<Result<CourseDto>>
        {
            public required Guid Id { get; set; }
            public string? UserId { get; set; }
            public string? Title { get; set; }
            public string? Description { get; set; }
            public string? ImageUrl { get; set; }
            public float? Price { get; set; }
            public Guid? CategoryId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<CourseDto>>
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
                Command request,
                CancellationToken cancellationToken
            )
            {
                var course = await _dataContext.Courses.SingleOrDefaultAsync(
                    course => course.Id == request.Id,
                    cancellationToken: cancellationToken
                );

                Helper.AssertIsNotNull(course, "Course not found");
                Helper.AssertIsOwner(course!, _user.Id!);

                _mapper.Map(request, course);

                try
                {
                    await _dataContext.SaveChangesAsync(cancellationToken);
                    return Result<CourseDto>.Success(_mapper.Map<Course, CourseDto>(course!));
                }
                catch (Exception)
                {
                    return Result<CourseDto>.Failure("Unable to update the Course");
                }
            }
        }
    }
}
