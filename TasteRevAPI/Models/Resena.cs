using System.ComponentModel.DataAnnotations;

namespace TasteRevAPI.Models
{
    public class Resena
    {
        public int Id { get; set; }

        [Range(1, 10, ErrorMessage = "La calificación debe estar entre 1 y 10.")]
        public int Calificacion { get; set; }

        public string Comentario { get; set; } = string.Empty;

        //Relacion con el Usuario
        public int UsuarioId { get; set; }
        public Usuario? Usuario { get; set; }

        //Relacion con la Serie
        public int SerieId { get; set; }
        public Serie? Serie { get; set; }
    }
}
