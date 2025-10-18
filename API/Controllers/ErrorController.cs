using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class ErrorController : ControllerBase
{
    [HttpGet("not-found")]
    public IActionResult ErrorNotFound()
    {
        return NotFound(); //404    
    }

    [HttpGet("bad-request")]
    public IActionResult ErrorBadRequest()
    {
        return BadRequest(); //400  
    }
    [HttpGet("unauthorized")]
    public IActionResult ErrorUnauthorized()
    {
        return Unauthorized(); //401 
    }
    [HttpGet("server-error")]
    public IActionResult ErrorServer()
    {
        throw new Exception("server error");     //500  
    }
    [HttpGet("validation-error")]
    public IActionResult ErrorValidation()
    {
        ModelState.AddModelError("validation error 1", "validation error details");
        ModelState.AddModelError("validation error 2", "validation error details");
        return ValidationProblem();
    }
}