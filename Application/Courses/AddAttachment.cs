﻿using Application.Common;
using Application.Common.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Courses;

public class AddAttachment
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

        public Handler(IStorageService storageService, IDataContext dataContext, IMapper mapper)
        {
            _storageService = storageService;
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

            var uploadResult = await _storageService.AddAsync(request.FileName, request.Content);
            if (uploadResult == null)
            {
                return Result<CourseDto>.Failure("Error during uploading image");
            }

            var attachment = new Attachment
            {
                Id = Guid.NewGuid(),
                Url = uploadResult.URI,
                Name = request.FileName,
                PublicId = uploadResult.PublicId,
                Course = course!,
            };

            _dataContext.Attachments.Add(attachment);

            try
            {
                await _dataContext.SaveChangesAsync(cancellationToken);
                return Result<CourseDto>.Success(_mapper.Map<Course, CourseDto>(course!));
            }
            catch (Exception)
            {
                return Result<CourseDto>.Failure("Unable to delete the Course");
            }
        }
    }
}
