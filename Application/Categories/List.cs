using Application.Common;
using Application.Common.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Categories;

public class List
{
    public class Query : IRequest<Result<List<CategoryDto>>> { }

    public class Handler : IRequestHandler<Query, Result<List<CategoryDto>>>
    {
        private readonly IDataContext _dataContext;
        private readonly IMapper _mapper;

        public Handler(IDataContext dataContext, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }

        public async Task<Result<List<CategoryDto>>> Handle(
            Query request,
            CancellationToken cancellationToken
        )
        {
            var result = await _dataContext
                .Categories.OrderBy(category => category.Name)
                .ToListAsync(cancellationToken: cancellationToken);

            return Result<List<CategoryDto>>.Success(_mapper.Map<List<CategoryDto>>(result));
        }
    }
}
