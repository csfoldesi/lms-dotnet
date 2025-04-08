using Application.Common;
using Application.Common.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Chapters;

public class Publish
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
                .Chapters.Include(chapter => chapter.Video)
                .Include(chapter => chapter.Course)
                .SingleOrDefaultAsync(
                    chapter => chapter.Id == request.Id,
                    cancellationToken: cancellationToken
                );

            Helper.AssertIsNotNull(chapter, "Chapter not found");
            Helper.AssertIsOwner(chapter!.Course, _user.Id!);

            if (
                string.IsNullOrEmpty(chapter!.Title)
                || string.IsNullOrEmpty(chapter.Description)
                || string.IsNullOrEmpty(chapter.Video?.Url)
            )
            {
                return Result<ChapterDto>.Failure("Missing required fields");
            }

            chapter.IsPublished = true;

            try
            {
                await _dataContext.SaveChangesAsync(cancellationToken);
                return Result<ChapterDto>.Success(_mapper.Map<ChapterDto>(chapter));
            }
            catch (Exception)
            {
                return Result<ChapterDto>.Failure("Unable to publish the Chapter");
            }
        }
    }
}
