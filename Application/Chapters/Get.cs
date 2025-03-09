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

        public Handler(IDataContext dataContext, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
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

            if (chapter == null)
            {
                return Result<ChapterDto>.NotFound();
            }

            return Result<ChapterDto>.Success(_mapper.Map<ChapterDto>(chapter));
        }
    }
}
