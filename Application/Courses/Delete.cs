using Application.Common;
using Application.Common.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Courses;

public class Delete
{
    public class Command : IRequest<Result<CourseDto>>
    {
        public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<CourseDto>>
    {
        private readonly IDataContext _dataContext;
        private readonly IMapper _mapper;
        private readonly IStorageService _storageService;

        public Handler(IDataContext dataContext, IMapper mapper, IStorageService storageService)
        {
            _dataContext = dataContext;
            _mapper = mapper;
            _storageService = storageService;
        }

        public async Task<Result<CourseDto>> Handle(
            Command request,
            CancellationToken cancellationToken
        )
        {
            var course = await _dataContext
                .Courses.Include(course => course.Attachments)
                .Include(course => course.Chapters)
                .AsSingleQuery()
                .SingleOrDefaultAsync(
                    course => course.Id == request.Id,
                    cancellationToken: cancellationToken
                );

            Helper.AssertIsNotNull(course, "Course not found");

            // Delete resources from Storage
            List<string> publicIdsToDelete = [];
            if (!string.IsNullOrEmpty(course!.ImagePublicId))
            {
                publicIdsToDelete.Add(course.ImagePublicId);
            }
            publicIdsToDelete.AddRange(
                course
                    .Attachments.Where(a => !string.IsNullOrEmpty(a.PublicId))
                    .Select(a => a.PublicId!)
            );
            publicIdsToDelete.AddRange(
                course
                    .Chapters.Where(c => !string.IsNullOrEmpty(c.VideoPublicId))
                    .Select(c => c.VideoPublicId!)
            );
            if (publicIdsToDelete.Count > 0)
            {
                await _storageService.DeleteListAsync(publicIdsToDelete);
            }

            _dataContext.Courses.Remove(course);

            try
            {
                await _dataContext.SaveChangesAsync(cancellationToken);
                return Result<CourseDto>.Success(_mapper.Map<Course, CourseDto>(course));
            }
            catch (Exception)
            {
                return Result<CourseDto>.Failure("Unable to delete the Course");
            }
        }
    }
}
