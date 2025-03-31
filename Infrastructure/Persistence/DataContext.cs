using Application.Common.Interfaces;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence
{
    public class DataContext : IdentityDbContext<User>, IDataContext
    {
        public DbSet<Attachment> Attachments { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Chapter> Chapters { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Purchase> Purchases { get; set; }
        public DbSet<StripeCustomer> StripeCustomers { get; set; }
        public DbSet<UserProgress> UserProgresses { get; set; }
        public DbSet<Video> Videos { get; set; }

        public DataContext(DbContextOptions options)
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // set IDs NOCASE
            /*builder
                .Entity<Attachment>()
                .Property(x => x.Id)
                .HasColumnType("CHAR(36) COLLATE utf8mb4_general_ci");
            builder
                .Entity<Category>()
                .Property(x => x.Id)
                .HasColumnType("CHAR(36) COLLATE utf8mb4_general_ci");
            builder
                .Entity<Chapter>()
                .Property(x => x.Id)
                .HasColumnType("CHAR(36) COLLATE utf8mb4_general_ci");
            builder
                .Entity<Course>()
                .Property(x => x.Id)
                .HasColumnType("CHAR(36) COLLATE utf8mb4_general_ci");
            builder
                .Entity<MuxData>()
                .Property(x => x.Id)
                .HasColumnType("CHAR(36) COLLATE utf8mb4_general_ci");
            builder
                .Entity<Purchase>()
                .Property(x => x.Id)
                .HasColumnType("CHAR(36) COLLATE utf8mb4_general_ci");
            builder
                .Entity<StripeCustomer>()
                .Property(x => x.Id)
                .HasColumnType("CHAR(36) COLLATE utf8mb4_general_ci");
            builder
                .Entity<UserProgress>()
                .Property(x => x.Id)
                .HasColumnType("CHAR(36) COLLATE utf8mb4_general_ci");*/

            builder
                .Entity<Course>()
                .HasOne(c => c.Category)
                .WithMany()
                .HasForeignKey(c => c.CategoryId)
                .OnDelete(DeleteBehavior.NoAction);

            builder
                .Entity<Chapter>()
                .HasOne(c => c.Course)
                .WithMany(c => c.Chapters)
                .HasForeignKey(c => c.CourseId)
                .OnDelete(DeleteBehavior.Cascade);

            builder
                .Entity<Attachment>()
                .HasOne(a => a.Course)
                .WithMany(c => c.Attachments)
                .HasForeignKey(a => a.CourseId)
                .OnDelete(DeleteBehavior.Cascade);

            builder
                .Entity<Purchase>()
                .HasOne(p => p.Course)
                .WithMany(c => c.Purchases)
                .HasForeignKey(p => p.CourseId)
                .OnDelete(DeleteBehavior.Cascade);

            builder
                .Entity<Chapter>()
                .HasOne(c => c.Video)
                .WithOne(v => v.Chapter)
                .HasForeignKey<Video>(v => v.ChapterId)
                .OnDelete(DeleteBehavior.Cascade);

            builder
                .Entity<UserProgress>()
                .HasOne(u => u.Chapter)
                .WithMany(c => c.UserProgresses)
                .HasForeignKey(u => u.ChapterId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
