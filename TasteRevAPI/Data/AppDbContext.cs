using Microsoft.EntityFrameworkCore;
using TasteRevAPI.Models;

namespace TasteRevAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Serie> Series { get; set; }
        public DbSet<Resena> Resenas { get; set; }
    }
}
