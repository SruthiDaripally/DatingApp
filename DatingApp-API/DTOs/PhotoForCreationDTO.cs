using System;
using Microsoft.AspNetCore.Http;

namespace DatingApp_API.DTOs
{
    public class PhotoForCreationDTO
    {
        public string Url { get; set; }

        public IFormFile  File { get; set; }
        public string Description { get; set; }

        public DateTime DateAdded { get; set; }

        public string PublicId {get; set;}

        public PhotoForCreationDTO()
        {
            this.DateAdded= DateTime.Now;
        }
    }
}