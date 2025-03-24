﻿using Application.Common;
using Application.Common.Interfaces;
using AutoMapper;
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
        private readonly IUser _user;

        public Handler(IDataContext dataContext, IMapper mapper, IUser user)
        {
            _dataContext = dataContext;
            _mapper = mapper;
            _user = user;
        }

        public async Task<Result<CourseDto>> Handle(
            Query request,
            CancellationToken cancellationToken
        )
        {
            var course = await _dataContext
                .Courses.Include(course =>
                    course.Chapters.Where(c => c.IsPublished).OrderBy(chapter => chapter.Position)
                )
                .Include(course => course.Attachments.OrderBy(a => a.Name))
                .AsSingleQuery()
                .SingleOrDefaultAsync(
                    c => c.Id == request.Id && c.IsPublished,
                    cancellationToken: cancellationToken
                );

            Helper.AssertIsNotNull(course, "Course not found");

            var result = _mapper.Map<CourseDto>(course);

            if (_user != null)
            {
                result.IsPurchased = await _dataContext.Purchases.AnyAsync(
                    p => p.CourseId == course!.Id && p.UserId == _user.Id,
                    cancellationToken: cancellationToken
                );
            }

            return Result<CourseDto>.Success(result);
        }
    }
}
