using Application.Common;
using Application.Common.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Chapters;

public class Get
{
    public class Query : IRequest<Result<ChapterDto>>
    {
        public required Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<ChapterDto>>
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
            Query request,
            CancellationToken cancellationToken
        )
        {
            var chapter = await _dataContext.Chapters.SingleOrDefaultAsync(
                chapter => chapter.Id == request.Id,
                cancellationToken: cancellationToken
            );

            Helper.AssertIsNotNull(chapter, "Chapter not found");

            var result = _mapper.Map<ChapterDto>(chapter!);

            if (_user != null)
            {
                result.IsCompleted = await _dataContext.UserProgresses.AnyAsync(
                    u => u.ChapterId == chapter!.Id && u.UserId == _user.Id && u.IsCompleted,
                    cancellationToken: cancellationToken
                );

                var nextChapter = await _dataContext
                    .Chapters.Where(c =>
                        c.CourseId == chapter!.CourseId
                        && c.IsPublished
                        && c.Position > chapter!.Position
                    )
                    .OrderBy(c => c.Position)
                    .FirstOrDefaultAsync(cancellationToken: cancellationToken);
                if (nextChapter != null)
                {
                    result.NextChapterId = nextChapter.Id;
                }
            }

            return Result<ChapterDto>.Success(result);
        }
    }
}
