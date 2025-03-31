using Domain;
using Microsoft.EntityFrameworkCore;

namespace Application.Common.Interfaces
{
    public interface IDataContext
    {
        public DbSet<Attachment> Attachments { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Chapter> Chapters { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Purchase> Purchases { get; set; }
        public DbSet<StripeCustomer> StripeCustomers { get; set; }
        public DbSet<UserProgress> UserProgresses { get; set; }
        public DbSet<Video> Videos { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
