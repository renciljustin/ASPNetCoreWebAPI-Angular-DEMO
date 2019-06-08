using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Data.Dtos;
using API.Shared;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route(RouteText.API)]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        public UsersController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var usersDb = await _context.Users.ToListAsync();

            var userList = _mapper.Map<List<UserListDto>>(usersDb);

            return Ok(userList);
        }

        [Authorize(Policy=PolicyText.RequiresAdmin)]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(string id)
        {
            var userDb = await _context.Users.FindAsync(id);

            if (userDb == null)
                return NotFound("User not exists.");

            var userDetail = _mapper.Map<UserDetailDto>(userDb);

            return Ok(userDetail);
        }

        [Authorize(Policy=PolicyText.RequiresAdmin)]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(string id, UserUpdateDto model)
        {
            var userDb = await _context.Users.FindAsync(id);

            if (userDb == null)
                return BadRequest("User not exists.");

            userDb = _mapper.Map(model, userDb);

            await _context.SaveChangesAsync();

            var userDetail = _mapper.Map<UserDetailDto>(userDb);

            return Ok(userDetail);
        }

        [Authorize(Policy=PolicyText.RequiresAdmin)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var userDb = await _context.Users.FindAsync(id);

            if (userDb == null)
                return BadRequest("User not exists.");

            _context.Users.Remove(userDb);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}