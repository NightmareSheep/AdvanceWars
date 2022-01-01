using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using WolfDen.Models;

namespace WolfDen.Services
{
    public class AccountRemovalService : IHostedService
    {
        private Timer _timer;
        public IServiceScopeFactory _serviceScopeFactory;

        public AccountRemovalService(IServiceScopeFactory serviceScopeFactory)
        {
            _serviceScopeFactory = serviceScopeFactory;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            // timer repeates call to RemoveScheduledAccounts every 24 hours.

            _timer = new Timer(
                (object state) => { RemoveInactiveAccounts().ConfigureAwait(false); },
                null,
                TimeSpan.Zero,
                TimeSpan.FromHours(24)
            );

            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }

        private async Task RemoveInactiveAccounts()
        {
            using (var scope = _serviceScopeFactory.CreateScope())
            {
                var accountServive = scope.ServiceProvider.GetService<IAccountService>();
                await accountServive.DeleteInactiveUserData();
            }
        }
    }
}
