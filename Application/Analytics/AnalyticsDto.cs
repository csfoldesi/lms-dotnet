namespace Application.Analytics;

public class AnalyticsDto
{
    public float TotalRevenue { get; set; }
    public int TotalSales { get; set; }
    public List<AnalyticsChartItem> ChartData { get; set; } = [];
}

public class AnalyticsChartItem
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public float Total { get; set; }
}
