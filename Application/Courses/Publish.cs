using Application.Common;
using Application.Common.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Courses;

public class Publish
{
    public class Command : IRequest<Result<CourseDto>>
    {
        public required Guid Id { get; set; }
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
            var course = await _dataContext
                .Courses.Include(course => course.Chapters)
                .SingleOrDefaultAsync(
                    course => course.Id == request.Id,
                    cancellationToken: cancellationToken
                );

            Helper.AssertIsNotNull(course, "Course not found");
            Helper.AssertIsOwner(course!, _user.Id!);

            var publishedChaptersFound = course!.Chapters.Any(c => c.IsPublished);
            if (!publishedChaptersFound)
            {
                return Result<CourseDto>.Failure("No published chapter found");
            }

            if (
                string.IsNullOrEmpty(course.Title)
                || string.IsNullOrEmpty(course.Description)
                || string.IsNullOrEmpty(course.ImageUrl)
                || course.Price == null
                || course.CategoryId == null
            )
            {
                return Result<CourseDto>.Failure("Missing required fields");
            }

            course.IsPublished = true;

            try
            {
                await _dataContext.SaveChangesAsync(cancellationToken);
                return Result<CourseDto>.Success(_mapper.Map<Course, CourseDto>(course));
            }
            catch (Exception)
            {
                return Result<CourseDto>.Failure("Unable to publish the Course");
            }
        }
    }
}
