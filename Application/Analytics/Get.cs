using Application.Common;
using Application.Common.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Analytics;

public class Get
{
    public class Query : IRequest<Result<AnalyticsDto>> { }

    public class Handler : IRequestHandler<Query, Result<AnalyticsDto>>
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

        public async Task<Result<AnalyticsDto>> Handle(
            Query request,
            CancellationToken cancellationToken
        )
        {
            var data = await _dataContext
                .Courses.Where(c => c.UserId == _user.Id)
                .Select(c => new
                {
                    c.Id,
                    c.Title,
                    Price = c.Price ?? 0,
                    Sales = c.Purchases.Count,
                })
                .Where(d => d.Sales > 0)
                .ToListAsync(cancellationToken: cancellationToken);

            var totalSales = data.Select(d => d.Sales).Sum();
            float totalRevenue = data.Select(d => d.Price * d.Sales).Sum();

            var result = new AnalyticsDto
            {
                TotalSales = totalSales,
                TotalRevenue = totalRevenue,
                ChartData =
                [
                    .. data.Select(d => new AnalyticsChartItem
                    {
                        Id = d.Id,
                        Name = d.Title,
                        Total = d.Sales * d.Price,
                    }),
                ],
            };

            return Result<AnalyticsDto>.Success(result);
        }
    }
}
