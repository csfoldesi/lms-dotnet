﻿using Application.Common;
using Application.Common.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Chapters;

public class Unpublish
{
    public class Command : IRequest<Result<ChapterDto>>
    {
        public required Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<ChapterDto>>
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

        public async Task<Result<ChapterDto>> Handle(
            Command request,
            CancellationToken cancellationToken
        )
        {
            var chapter = await _dataContext
                .Chapters.Include(c => c.Course)
                .SingleOrDefaultAsync(
                    chapter => chapter.Id == request.Id,
                    cancellationToken: cancellationToken
                );

            Helper.AssertIsNotNull(chapter, "Chapter not found");
            Helper.AssertIsOwner(chapter!.Course, _user.Id!);

            chapter!.IsPublished = false;

            var remainingPublishedChaptersFound = await _dataContext.Chapters.AnyAsync(
                c => c.CourseId == chapter.CourseId && c.Id != chapter.Id && c.IsPublished,
                cancellationToken: cancellationToken
            );
            if (!remainingPublishedChaptersFound)
            {
                chapter.Course.IsPublished = false;
            }

            try
            {
                await _dataContext.SaveChangesAsync(cancellationToken);
                return Result<ChapterDto>.Success(_mapper.Map<ChapterDto>(chapter));
            }
            catch (Exception)
            {
                return Result<ChapterDto>.Failure("Unable to unpublish the Chapter");
            }
        }
    }
}
