using Domain;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Seeds
{
    public static class Categories
    {
        public static async Task SeedAsync(DataContext dbContext)
        {
            if (!await dbContext.Categories.AnyAsync())
            {
                List<Category> categories =
                [
                    new Category { Id = Guid.NewGuid(), Name = "Computer Science" },
                    new Category { Id = Guid.NewGuid(), Name = "Music" },
                    new Category { Id = Guid.NewGuid(), Name = "Fitness" },
                    new Category { Id = Guid.NewGuid(), Name = "Photography" },
                    new Category { Id = Guid.NewGuid(), Name = "Accounting" },
                    new Category { Id = Guid.NewGuid(), Name = "Engineering" },
                    new Category { Id = Guid.NewGuid(), Name = "Filming" },
                ];

                await dbContext.Categories.AddRangeAsync(categories);

                await dbContext.SaveChangesAsync();
            }
        }
    }
}
