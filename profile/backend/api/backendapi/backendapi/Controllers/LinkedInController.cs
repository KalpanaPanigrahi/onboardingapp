
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using backendapi.Data;
using backendapi.Models;
using Newtonsoft.Json;
using Microsoft.SqlServer.Server;

[ApiController]
[Route("api/[controller]")]
public class LinkedInController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IHttpClientFactory _clientFactory;

    public LinkedInController(ApplicationDbContext context, IHttpClientFactory clientFactory)
    {
        _context = context;
        _clientFactory = clientFactory;
    }

    [HttpPost("submitFormData")]
    public async Task<IActionResult> SubmitFormData([FromBody] User formData)
    {
        try
        {
            // Save formData to database
            var user = new User
            {
                Email = formData.Email,
                Password = formData.Password,
                Username = formData.Username,
                PhoneNumber = formData.PhoneNumber,
                LinkedinUN = formData.LinkedinUN,
                ResumeLink = formData.ResumeLink
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Pass LinkedinUN to Flask API for profile fetching and file saving
            var flaskUrl = "http://127.0.0.1:5000/fetch_profile";
            var content = new StringContent(JsonConvert.SerializeObject(new { username = formData.LinkedinUN }), System.Text.Encoding.UTF8, "application/json");

            var response = await _clientFactory.CreateClient().PostAsync(flaskUrl, content);
            var responseContent = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, responseContent);
            }

            return Ok("Form data submitted and profile fetched successfully.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}
