using Application.Common;
using Application.Common.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Courses;

public class AddImage
{
    public class Command : IRequest<Result<CourseDto>>
    {
        public required Guid Id { get; set; }
        public required string FileName { get; set; }
        public required byte[] Content { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<CourseDto>>
    {
        private readonly IStorageService _storageService;
        private readonly IDataContext _dataContext;
        private readonly IMapper _mapper;
        private readonly IUser _user;

        public Handler(
            IStorageService storageService,
            IDataContext dataContext,
            IMapper mapper,
            IUser user
        )
        {
            _storageService = storageService;
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

            var uploadResult = await _storageService.AddAsync(request.FileName, request.Content);
            Helper.AssertIsNotNull(uploadResult, "Error during uploading image");

            if (!string.IsNullOrEmpty(course!.ImagePublicId))
            {
                await _storageService.DeleteAsync(course.ImagePublicId);
            }

            course.ImageUrl = uploadResult!.URI;
            course.ImagePublicId = uploadResult.PublicId;

            try
            {
                await _dataContext.SaveChangesAsync(cancellationToken);
                return Result<CourseDto>.Success(_mapper.Map<CourseDto>(course));
            }
            catch (Exception)
            {
                return Result<CourseDto>.Failure("Unable to update the Course");
            }
        }
    }
}
