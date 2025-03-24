using Application.Common;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Chapters;

public class ToggleProgress
{
    public class Command : IRequest<Result<bool>>
    {
        public required Guid ChapterId { get; set; }
        public bool IsCompleted { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<bool>>
    {
        private readonly IDataContext _dataContext;
        private readonly IUser _user;

        public Handler(IDataContext dataContext, IUser user)
        {
            _dataContext = dataContext;
            _user = user;
        }

        public async Task<Result<bool>> Handle(Command request, CancellationToken cancellationToken)
        {
            var chapter = await _dataContext
                .Chapters.Where(c => c.Id == request.ChapterId)
                .FirstOrDefaultAsync(cancellationToken: cancellationToken);

            Helper.AssertIsNotNull(chapter);

            var userProgress = await _dataContext
                .UserProgresses.Where(u => u.ChapterId == request.ChapterId && u.UserId == _user.Id)
                .FirstOrDefaultAsync(cancellationToken: cancellationToken);

            if (userProgress == null)
            {
                userProgress = new Domain.UserProgress
                {
                    Id = Guid.NewGuid(),
                    Chapter = chapter!,
                    UserId = _user.Id!,
                };
                _dataContext.UserProgresses.Add(userProgress);
            }
            userProgress!.IsCompleted = request.IsCompleted;

            try
            {
                await _dataContext.SaveChangesAsync(cancellationToken);
                return Result<bool>.Success(request.IsCompleted);
            }
            catch (Exception)
            {
                return Result<bool>.Failure("Unable to update progress");
            }
        }
    }
}
