using Host.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Host.Controllers
{
    [Route("api/profiles")]
    public class ProfileController : Controller
    {
        [HttpGet]
        [Authorize]
        public IActionResult GetUserInfo()
        {
            var profile = new Profile
            {
                Name = User.Identity.Name ?? "No name"
            };
            return Ok(profile);
        }
    }
}
