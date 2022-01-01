using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WolfDen.Models;

namespace WolfDen.Services
{
    public class AccountService : IAccountService
    {
        private UserManager<ApplicationUser> _userManager;
        private readonly ILogger<AccountService> _logger;

        public AccountService(UserManager<ApplicationUser> userManager, ILogger<AccountService> logger)
        {
            _userManager = userManager;
            _logger = logger;
        }

        public async Task DeleteInactiveUserData()
        {
            var dayAgo = DateTimeOffset.UtcNow.AddDays(-1);
            var inactiveGuests = _userManager.Users.Where(u => u.Guest && u.LastLoginDate < dayAgo);
            var yearAgo = DateTimeOffset.UtcNow.AddYears(-1);
            var inactiveUsers = _userManager.Users.Where(u => !u.Guest && u.LastLoginDate < yearAgo);
            var toBeDeletedUsers = inactiveGuests.Concat(inactiveUsers).ToList();
            _logger.LogInformation("Deleting inactive accounts, count: " + toBeDeletedUsers.Count);
            foreach (var user in toBeDeletedUsers)
            {
                _logger.LogInformation("Deleting user " + user.UserName + " for inactivity.");
                await _userManager.DeleteAsync(user);
            }
        }
    }
}
