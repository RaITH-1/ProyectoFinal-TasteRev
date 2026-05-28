namespace TasteRevAPI.Models
{
    public class Serie
    {
        public int Id { get; set; }
        public string Titulo { get; set; } = string.Empty;
        public string Sinopsis { get; set; } = string.Empty;
        public string ImagenUrl { get; set; } = string.Empty;

        //Una serie puede tener muchas reseñas
        public List<Resena> Resenas { get; set; } = new List<Resena>();
    }
}
