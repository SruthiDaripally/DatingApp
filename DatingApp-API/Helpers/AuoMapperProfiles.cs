using System.Linq;
using AutoMapper;
using DatingApp_API.DTOs;
using DatingApp_API.Models;

namespace DatingApp_API.Helpers
{
    public class AuoMapperProfiles : Profile
    {
        public AuoMapperProfiles()
        {
           CreateMap<User,UserForListDTO>()
           .ForMember(dest => dest.PhotoUrl,
           opt => opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
            .ForMember(dest => dest.Age ,opt =>
            opt.MapFrom(src => src.DateOfBirth.CalculateAge()));

           CreateMap<User,UserForDetailesDTO>()
           .ForMember(dest => dest.PhotoUrl , opt =>
           opt.MapFrom(src => src.Photos.FirstOrDefault(p =>p.IsMain).Url))
           .ForMember(dest => dest.Age ,opt =>
           opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
           
           CreateMap<Photo,PhotoForDetailedDTO>();

           CreateMap<UserForUpdateDTO,User>();

           CreateMap<Photo,PhotoForReturnDTO>();

           CreateMap<PhotoForCreationDTO,Photo>();

           CreateMap<UserForRegisterDto,User>();
        }
    }
}