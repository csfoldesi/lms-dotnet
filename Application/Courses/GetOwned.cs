using Application.Common;
using Application.Common.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Courses;

public class GetOwned
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
                .Courses.Include(course => course.Chapters.OrderBy(chapter => chapter.Position))
                .Include(course => course.Attachments.OrderBy(a => a.Name))
                .AsSingleQuery()
                .SingleOrDefaultAsync(
                    c => c.Id == request.Id,
                    cancellationToken: cancellationToken
                );

            Helper.AssertIsNotNull(course, "Course not found");
            Helper.AssertIsOwner(course!, _user.Id!);

            return Result<CourseDto>.Success(_mapper.Map<CourseDto>(course));
        }
    }
}
