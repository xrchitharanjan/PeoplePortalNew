using System;
using PeoplePortal.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace PeoplePortal.DataAccess
{
    public partial class PeoplePortalDBContext : DbContext
    {
        public virtual DbSet<Departments> Departments { get; set; }
        public virtual DbSet<People> People { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer(@"Password=xpouser;Persist Security Info=True;User ID=xpouser;Initial Catalog=PeoplePortal;Data Source=IDDDW0413.devxpo.pvt;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Departments>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.ToTable(nameof(Departments));

                entity.Property(e => e.OrganisationId).HasColumnName("OrganisationId");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<People>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.ToTable("People");

                entity.Property(e => e.Id).HasColumnName("Id");

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.MiddleName)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.SurName)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Gender)
                    .IsRequired()
                    .HasMaxLength(6)
                    .IsUnicode(false);               
            });
        }
    }
}
