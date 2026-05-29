namespace TasteRevAPI.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public string NombreUsuario { get; set; } = string.Empty;
        public string Correo { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string FotoPerfilUrl { get; set; } = string.Empty;

        //Un usuario puede tener muchas reseñas
        public List<Resena> Resenas { get; set; } = new List<Resena>();
    }
}
