﻿using Application.Common;
using Application.Common.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Chapters;

public class AddVideo
{
    public class Command : IRequest<Result<ChapterDto>>
    {
        public required Guid Id { get; set; }
        public required string FileName { get; set; }
        public required byte[] Content { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<ChapterDto>>
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

        public async Task<Result<ChapterDto>> Handle(
            Command request,
            CancellationToken cancellationToken
        )
        {
            var chapter = await _dataContext
                .Chapters.Include(chapter => chapter.Course)
                .SingleOrDefaultAsync(
                    chapter => chapter.Id == request.Id,
                    cancellationToken: cancellationToken
                );

            Helper.AssertIsNotNull(chapter, "Chapter not found");
            Helper.AssertIsOwner(chapter!.Course, _user.Id!);

            var uploadResult = await _storageService.AddAsync(request.FileName, request.Content);
            if (uploadResult == null)
            {
                return Result<ChapterDto>.Failure("Error during uploading video");
            }

            if (!string.IsNullOrEmpty(chapter!.VideoPublicId))
            {
                await _storageService.DeleteAsync(chapter.VideoPublicId);
            }

            chapter.VideoUrl = uploadResult.URI;
            chapter.VideoPublicId = uploadResult.PublicId;

            try
            {
                await _dataContext.SaveChangesAsync(cancellationToken);
                return Result<ChapterDto>.Success(_mapper.Map<ChapterDto>(chapter));
            }
            catch (Exception)
            {
                return Result<ChapterDto>.Failure("Unable to update the Chapter");
            }
        }
    }
}
