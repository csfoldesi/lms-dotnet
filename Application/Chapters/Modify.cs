using Application.Common;
using Application.Common.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Chapters;

public class Modify
{
    public class Command : IRequest<Result<ChapterDto>>
    {
        public required Guid Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? VideoUrl { get; set; }
        public bool? IsFree { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<ChapterDto>>
    {
        private readonly IDataContext _dataContext;
        private readonly IMapper _mapper;

        public Handler(IDataContext dataContext, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }

        public async Task<Result<ChapterDto>> Handle(
            Command request,
            CancellationToken cancellationToken
        )
        {
            var chapter = await _dataContext.Chapters.SingleOrDefaultAsync(
                chapter => chapter.Id == request.Id,
                cancellationToken: cancellationToken
            );

            Helper.AssertIsNotNull(chapter, "Chapter not found");

            _mapper.Map(request, chapter);
            // TODO: this is a just quick and dirty fix
            if (request.IsFree.HasValue)
            {
                chapter!.IsFree = request.IsFree.Value;
            }

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
